const SPREADSHEET_ID = "1cmR_OGml5ngLuq0zAi_gAs_qgrBNqTSlWZ5-H7tLWV0";
const FEEDBACK_SHEET_NAME = "【フィードバック】";
const MAINTENANCE_SHEET_NAME = "【メンテンナンス】";
const WEATHER_QUIZ_SHEET_NAME = "【気象予報士試験 対策問題集】";
const DATE_TIME_ZONE = "Asia/Tokyo";
const DATE_TIME_FORMAT = "yyyy年MM月dd日HH時mm分";

const FEEDBACK_HEADERS = ["受付日時", "内容", "ユーザーエージェント"];
const MAINTENANCE_HEADERS = [
  "日時",
  "メンテナンス状況",
  "メンテナンス理由",
  "ユーザーエージェント",
];
const WEATHER_QUIZ_HEADERS = [
  "受付日時",
  "問題形式",
  "悪問理由",
  "問題内容",
  "選択肢①",
  "選択肢②",
  "選択肢③",
  "選択肢④",
  "解答",
  "解説文",
  "ユーザーエージェント",
];

/**
 * WebサイトおよびCloudflare Workerから送られた内容を記録します。
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    const payload = parsePayload_(e);

    if (payload.action === "setMaintenance") {
      appendMaintenance_(payload);
    } else if (payload.action === "reportWeatherQuizQuestion") {
      appendWeatherQuizReport_(payload);
    } else if (!payload.action && Object.prototype.hasOwnProperty.call(payload, "message")) {
      appendFeedback_(payload);
    } else {
      return jsonResponse_({ ok: false, message: "unsupported action" });
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, message: String(error.message || error) });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function appendWeatherQuizReport_(payload) {
  const sheet = prepareWeatherQuizSheet_();
  const row = sheet.getLastRow() + 1;
  const choices = getWeatherQuizChoices_(payload);
  const values = [
    formatDateTime_(payload.createdAt),
    normalizeLineBreaks_(payload.questionType),
    normalizeLineBreaks_(payload.badQuestionReason),
    normalizeLineBreaks_(payload.question),
    choices[0],
    choices[1],
    choices[2],
    choices[3],
    normalizeLineBreaks_(payload.answer),
    normalizeLineBreaks_(payload.explanation),
    getWeatherQuizUserAgent_(payload),
  ];

  sheet.getRange(row, 1, 1, WEATHER_QUIZ_HEADERS.length).setValues([values]);
  sheet.getRange(row, 1, 1, WEATHER_QUIZ_HEADERS.length)
    .setBackground(null)
    .setVerticalAlignment("top");
  sheet.getRange(row, 3, 1, 9).setWrap(true);
  sheet.autoResizeRows(row, 1);
}

function getWeatherQuizChoices_(payload) {
  const suppliedChoices = Array.isArray(payload.choices) ? payload.choices : [];
  const choices = [
    payload.choice1 !== undefined ? payload.choice1 : suppliedChoices[0],
    payload.choice2 !== undefined ? payload.choice2 : suppliedChoices[1],
    payload.choice3 !== undefined ? payload.choice3 : suppliedChoices[2],
    payload.choice4 !== undefined ? payload.choice4 : suppliedChoices[3],
  ].map(normalizeLineBreaks_);

  const questionType = String(payload.questionType || "");
  const isTrueFalse = /[◯○][✕×]問題/u.test(questionType);
  if (isTrueFalse) {
    choices[0] = choices[0] || "◯";
    choices[1] = choices[1] || "✕";
  }

  return choices;
}

function getWeatherQuizUserAgent_(payload) {
  const userAgent = payload.userAgent || payload.user_agent || payload.ua;
  return normalizeLineBreaks_(userAgent) || "取得不可";
}

function prepareWeatherQuizSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(WEATHER_QUIZ_SHEET_NAME)
    || spreadsheet.insertSheet(WEATHER_QUIZ_SHEET_NAME);

  // 旧6列・7列版に記録済みのデータがある場合は、解答の前へ選択肢4列を挿入します。
  if (sheet.getLastColumn() >= 6) {
    const legacyAnswerHeaders = sheet.getRange(1, 5, 1, 2).getValues()[0];
    if (legacyAnswerHeaders[0] === "解答" && legacyAnswerHeaders[1] === "解説文") {
      sheet.insertColumnsBefore(5, 4);
    }
  }

  const headerWidth = Math.max(sheet.getLastColumn(), WEATHER_QUIZ_HEADERS.length);
  sheet.getRange(1, 1, 1, headerWidth).clearContent();
  sheet.getRange(1, 1, 1, WEATHER_QUIZ_HEADERS.length).setValues([WEATHER_QUIZ_HEADERS]);
  backfillWeatherQuizTrueFalseChoices_(sheet);
  removeBackgrounds_(sheet);
  return sheet;
}

function backfillWeatherQuizTrueFalseChoices_(sheet) {
  const rowCount = sheet.getLastRow() - 1;
  if (rowCount <= 0) {
    return;
  }

  const questionTypes = sheet.getRange(2, 2, rowCount, 1).getValues();
  const choices = sheet.getRange(2, 5, rowCount, 2).getValues();
  let changed = false;

  for (let index = 0; index < rowCount; index += 1) {
    if (!/[◯○][✕×]問題/u.test(String(questionTypes[index][0] || ""))) {
      continue;
    }
    if (!choices[index][0]) {
      choices[index][0] = "◯";
      changed = true;
    }
    if (!choices[index][1]) {
      choices[index][1] = "✕";
      changed = true;
    }
  }

  if (changed) {
    sheet.getRange(2, 5, rowCount, 2).setValues(choices);
  }
}

function appendFeedback_(payload) {
  const sheet = prepareSheet_(FEEDBACK_SHEET_NAME, FEEDBACK_HEADERS);
  const row = sheet.getLastRow() + 1;

  sheet.getRange(row, 1, 1, FEEDBACK_HEADERS.length).setValues([[
    formatDateTime_(payload.createdAt),
    String(payload.message || ""),
    String(payload.userAgent || ""),
  ]]);

  // セル内の改行も表示できるようにし、塗りつぶしは設定しません。
  sheet.getRange(row, 2).setWrap(true);
  removeBackgrounds_(sheet);
}

function appendMaintenance_(payload) {
  const sheet = prepareSheet_(MAINTENANCE_SHEET_NAME, MAINTENANCE_HEADERS);
  const row = sheet.getLastRow() + 1;
  const isMaintenance = parseBoolean_(payload.maintenance);
  const status = isMaintenance ? "メンテナンス：開始" : "メンテナンス：終了";
  const reason = getMaintenanceReason_(payload);

  sheet.getRange(row, 1, 1, MAINTENANCE_HEADERS.length).setValues([[
    formatDateTime_(payload.createdAt),
    status,
    reason,
    String(payload.userAgent || ""),
  ]]);

  // setValuesで改行を保持し、折り返し表示で全行を見えるようにします。
  sheet.getRange(row, 3).setWrap(true);
  sheet.autoResizeRows(row, 1);
  removeBackgrounds_(sheet);
}

function prepareSheet_(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  const headerWidth = Math.max(sheet.getLastColumn(), headers.length);

  // 既存の余分な見出しを消してから、指定された見出しだけを設定します。
  sheet.getRange(1, 1, 1, headerWidth).clearContent();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  removeBackgrounds_(sheet);

  return sheet;
}

function removeBackgrounds_(sheet) {
  // ヘッダーを含む使用範囲は、常に塗りつぶしなしに統一します。
  sheet.getDataRange().setBackground(null);
}

function formatDateTime_(value) {
  const date = value ? new Date(value) : new Date();
  const validDate = Number.isNaN(date.getTime()) ? new Date() : date;
  return Utilities.formatDate(validDate, DATE_TIME_ZONE, DATE_TIME_FORMAT);
}

function getMaintenanceReason_(payload) {
  const candidates = [
    payload.reason,
    payload.maintenanceReason,
    payload.maintenanceDetail,
    payload.details,
  ];
  const value = candidates.find((candidate) => (
    candidate !== undefined && candidate !== null && String(candidate) !== ""
  ));

  // CRLF/CRをLFへ統一しますが、入力された改行自体は削除しません。
  return value === undefined ? "" : String(value).replace(/\r\n?/g, "\n");
}

function normalizeLineBreaks_(value) {
  return value === undefined || value === null
    ? ""
    : String(value).replace(/\r\n?/g, "\n");
}

function parseBoolean_(value) {
  return value === true || value === 1 || String(value).toLowerCase() === "true";
}

function parsePayload_(e) {
  const rawBody = e && e.postData ? e.postData.contents : "";
  if (rawBody) {
    return JSON.parse(rawBody);
  }
  return (e && e.parameter) || {};
}

function jsonResponse_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
