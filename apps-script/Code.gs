const SPREADSHEET_ID = "1cmR_OGml5ngLuq0zAi_gAs_qgrBNqTSlWZ5-H7tLWV0";
const FEEDBACK_SHEET_NAME = "【フィードバック】";
const MAINTENANCE_SHEET_NAME = "【メンテナンス】";
const WEATHER_QUIZ_SHEET_NAME = "【悪問報告】";
const WEATHER_QUIZ_TRUE_FALSE_LIST_SHEET_NAME = "【問題一覧／◯✕】";
const WEATHER_QUIZ_MULTIPLE_CHOICE_LIST_SHEET_NAME = "【問題一覧／4択】";
const WEATHER_QUIZ_QUESTIONS_RAW_URL = "https://raw.githubusercontent.com/Itachi-kun-ITC/WE-Simulator/{revision}/web/data/weather_forecaster_quiz_questions.json";
const WEATHER_QUIZ_SYNC_TOKEN_PROPERTY = "WEATHER_QUIZ_SYNC_TOKEN";
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
  "悪問理由",
  "問題ID",
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

    if (payload.action === "syncWeatherQuizQuestionLists") {
      verifyWeatherQuizSyncToken_(payload.syncToken);
      const result = syncWeatherQuizQuestionLists(payload.commitSha);
      return jsonResponse_({ ok: true, ...result });
    } else if (payload.action === "setMaintenance") {
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
    normalizeLineBreaks_(payload.badQuestionReason),
    normalizeLineBreaks_(payload.questionId),
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
  sheet.getRange(row, 2, 1, 10).setWrap(true);
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

  const questionId = String(payload.questionId || "");
  const isTrueFalse = /^1-/u.test(questionId);
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

  backfillWeatherQuizTrueFalseChoices_(sheet);
  migrateWeatherQuizReportColumns_(sheet);
  removeBackgrounds_(sheet);
  return sheet;
}

/** Apps Script更新後、既存の悪問報告シートをすぐ移行したい場合に一度実行します。 */
function migrateWeatherQuizReportSheet() {
  prepareWeatherQuizSheet_();
  return { ok: true, sheetName: WEATHER_QUIZ_SHEET_NAME };
}

function migrateWeatherQuizReportColumns_(sheet) {
  const currentWidth = Math.max(sheet.getLastColumn(), WEATHER_QUIZ_HEADERS.length);
  const currentHeaders = sheet.getRange(1, 1, 1, currentWidth).getValues()[0]
    .map((value) => String(value || ""));
  const alreadyCurrent = WEATHER_QUIZ_HEADERS.every((header, index) => (
    currentHeaders[index] === header
  ));
  if (alreadyCurrent) {
    return;
  }

  const rowCount = Math.max(0, sheet.getLastRow() - 1);
  const oldRows = rowCount
    ? sheet.getRange(2, 1, rowCount, currentWidth).getValues()
    : [];
  const oldColumnByHeader = new Map(currentHeaders.map((header, index) => [header, index]));
  const migratedRows = oldRows.map((oldRow) => WEATHER_QUIZ_HEADERS.map((header) => {
    // 旧データには問題IDがないため空欄にします。次回以降の報告には新IDが入ります。
    if (header === "問題ID" && !oldColumnByHeader.has(header)) {
      return "";
    }
    const oldColumn = oldColumnByHeader.get(header);
    return oldColumn === undefined ? "" : oldRow[oldColumn];
  }));

  sheet.getRange(1, 1, Math.max(1, sheet.getLastRow()), currentWidth).clearContent();
  sheet.getRange(1, 1, 1, WEATHER_QUIZ_HEADERS.length).setValues([WEATHER_QUIZ_HEADERS]);
  if (migratedRows.length) {
    sheet.getRange(2, 1, migratedRows.length, WEATHER_QUIZ_HEADERS.length).setValues(migratedRows);
  }
}

function backfillWeatherQuizTrueFalseChoices_(sheet) {
  const rowCount = sheet.getLastRow() - 1;
  if (rowCount <= 0) {
    return;
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const questionTypeColumn = headers.indexOf("問題形式") + 1;
  if (!questionTypeColumn) {
    return;
  }
  const questionTypes = sheet.getRange(2, questionTypeColumn, rowCount, 1).getValues();
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

/**
 * 公開中の問題JSONから、管理用スプレッドシートの問題一覧2シートを更新します。
 * 問題データを公開した直後に手動実行するか、下のトリガー作成関数を一度実行してください。
 */
function syncWeatherQuizQuestionLists(commitSha) {
  const revision = normalizeGitRevision_(commitSha);
  const questionsUrl = WEATHER_QUIZ_QUESTIONS_RAW_URL.replace("{revision}", revision);
  const response = UrlFetchApp.fetch(questionsUrl, {
    muteHttpExceptions: true,
    headers: { "Cache-Control": "no-cache" },
  });
  const statusCode = response.getResponseCode();
  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(`問題データの取得に失敗しました: HTTP ${statusCode}`);
  }

  const questions = JSON.parse(response.getContentText("UTF-8"));
  if (!Array.isArray(questions)) {
    throw new Error("問題データが配列ではありません。");
  }

  const trueFalseRows = questions.map((item) => [
    String(item.trueFalse && item.trueFalse.id || ""),
    String(item.trueFalse && item.trueFalse.statement || ""),
    item.trueFalse && item.trueFalse.correct ? "◯" : "✕",
    String(item.trueFalse && item.trueFalse.explanation || ""),
  ]);
  const multipleChoiceRows = questions.map((item) => {
    const multipleChoice = item.multipleChoice || {};
    const choices = Array.isArray(multipleChoice.choices) ? multipleChoice.choices : [];
    const correctIndex = Number(multipleChoice.correctIndex);
    const correctChoice = choices[correctIndex] || "";
    const distractors = choices.filter((choice, index) => index !== correctIndex);
    return [
      String(multipleChoice.id || ""),
      String(multipleChoice.question || ""),
      String(correctChoice),
      String(distractors[0] || ""),
      String(distractors[1] || ""),
      String(distractors[2] || ""),
      String(multipleChoice.explanation || ""),
    ];
  });

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const trueFalseResult = syncWeatherQuizQuestionListSheet_(
    spreadsheet,
    WEATHER_QUIZ_TRUE_FALSE_LIST_SHEET_NAME,
    ["問題ID", "問題文", "解答", "解説"],
    trueFalseRows,
    [100, 420, 80, 520],
    0
  );
  const multipleChoiceResult = syncWeatherQuizQuestionListSheet_(
    spreadsheet,
    WEATHER_QUIZ_MULTIPLE_CHOICE_LIST_SHEET_NAME,
    ["問題ID", "問題文", "選択肢1（正解）", "選択肢2", "選択肢3", "選択肢4", "解説"],
    multipleChoiceRows,
    [100, 400, 300, 300, 300, 300, 500],
    3
  );
  return {
    revision,
    trueFalse: trueFalseResult,
    multipleChoice: multipleChoiceResult,
  };
}

function verifyWeatherQuizSyncToken_(suppliedToken) {
  const expectedToken = PropertiesService.getScriptProperties()
    .getProperty(WEATHER_QUIZ_SYNC_TOKEN_PROPERTY);
  if (!expectedToken || String(suppliedToken || "") !== expectedToken) {
    throw new Error("問題一覧の同期権限がありません。");
  }
}

function normalizeGitRevision_(commitSha) {
  const revision = String(commitSha || "main").trim();
  if (revision === "main" || /^[0-9a-f]{40}$/i.test(revision)) {
    return revision;
  }
  throw new Error("Gitリビジョンが不正です。");
}

/** 旧版で作成した定期同期トリガーがある場合に、一度だけ手動実行します。 */
function removeWeatherQuizQuestionListSyncTriggers() {
  const triggers = ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "syncWeatherQuizQuestionLists");
  triggers.forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  return { deletedTriggerCount: triggers.length };
}

/** IDをキーに比較し、変更セル・追加行・削除行だけを反映します。 */
function syncWeatherQuizQuestionListSheet_(
  spreadsheet,
  sheetName,
  headers,
  rows,
  columnWidths,
  correctChoiceColumn
) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  const created = !sheet;
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }

  const headerValues = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  headers.forEach((header, columnIndex) => {
    if (String(headerValues[columnIndex] || "") !== header) {
      sheet.getRange(1, columnIndex + 1).setValue(header);
    }
  });

  const desiredIds = new Set();
  rows.forEach((row) => {
    const questionId = String(row[0] || "");
    if (!questionId || desiredIds.has(questionId)) {
      throw new Error(`${sheetName}の問題IDが空または重複しています: ${questionId}`);
    }
    desiredIds.add(questionId);
  });

  let structuralChange = false;
  let changedCellCount = 0;
  let addedRowCount = 0;
  let deletedRowCount = 0;
  const existingRowCount = Math.max(0, sheet.getLastRow() - 1);
  if (existingRowCount) {
    const existingIds = sheet.getRange(2, 1, existingRowCount, 1).getValues();
    for (let index = existingIds.length - 1; index >= 0; index -= 1) {
      const existingId = String(existingIds[index][0] || "");
      if (!desiredIds.has(existingId)) {
        sheet.deleteRow(index + 2);
        structuralChange = true;
        deletedRowCount += 1;
      }
    }
  }

  const remainingRowCount = Math.max(0, sheet.getLastRow() - 1);
  const existingRows = remainingRowCount
    ? sheet.getRange(2, 1, remainingRowCount, headers.length).getValues()
    : [];
  const existingById = new Map(existingRows.map((row, index) => [
    String(row[0] || ""),
    { rowNumber: index + 2, values: row },
  ]));

  rows.forEach((desiredRow) => {
    const questionId = String(desiredRow[0]);
    const existing = existingById.get(questionId);
    if (!existing) {
      sheet.appendRow(desiredRow);
      const rowNumber = sheet.getLastRow();
      existingById.set(questionId, { rowNumber, values: desiredRow });
      sheet.getRange(rowNumber, 1, 1, headers.length).setWrap(true).setVerticalAlignment("top");
      if (correctChoiceColumn) {
        sheet.getRange(rowNumber, correctChoiceColumn).setFontColor("#ff0000");
      }
      structuralChange = true;
      addedRowCount += 1;
      return;
    }

    desiredRow.forEach((desiredValue, columnIndex) => {
      if (String(existing.values[columnIndex] ?? "") !== String(desiredValue ?? "")) {
        sheet.getRange(existing.rowNumber, columnIndex + 1).setValue(desiredValue);
        changedCellCount += 1;
      }
    });
  });

  if (created) {
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground("#e5e5e5")
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setFrozenRows(1);
    columnWidths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));
  }

  if (structuralChange || created) {
    const filter = sheet.getFilter();
    if (filter) {
      filter.remove();
    }
    sheet.getRange(1, 1, Math.max(1, sheet.getLastRow()), headers.length).createFilter();
  }
  return { changedCellCount, addedRowCount, deletedRowCount };
}
