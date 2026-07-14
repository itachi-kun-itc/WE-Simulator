const SPREADSHEET_ID = "1cmR_OGml5ngLuq0zAi_gAs_qgrBNqTSlWZ5-H7tLWV0";
const FEEDBACK_SHEET_NAME = "【フィードバック】";
const MAINTENANCE_SHEET_NAME = "【メンテンナンス】";
const DATE_TIME_ZONE = "Asia/Tokyo";
const DATE_TIME_FORMAT = "yyyy年MM月dd日HH時mm分";

const FEEDBACK_HEADERS = ["受付日時", "内容", "ユーザーエージェント"];
const MAINTENANCE_HEADERS = [
  "日時",
  "メンテナンス状況",
  "メンテナンス理由",
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
