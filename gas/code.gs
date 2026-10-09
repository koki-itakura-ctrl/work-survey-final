const HEADERS = ["日時","スタッフ番号","氏名","ブランド","Q1","Q2","Q3","Q4","Q5","判定ステータス"];
const json = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
function sheetFor(name, create) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh && create) { sh = ss.insertSheet(name); sh.appendRow(HEADERS); }
  return sh;
}
function doPost(e) {
  try {
    const { adminName, row } = JSON.parse(e.postData.contents);
    if (!adminName || !row) return json({ ok: false, error: "bad request" });
    sheetFor(adminName, true).appendRow(row);
    return json({ ok: true });
  } catch (err) { return json({ ok: false, error: String(err) }); }
}
function doGet(e) {
  const sh = sheetFor((e.parameter || {}).adminName, false);
  if (!sh) return json({ ok: true, rows: [] });
  const rows = sh.getDataRange().getValues().slice(1).map((r) => { r[0] = r[0] instanceof Date ? r[0].toISOString() : r[0]; return r; });
  return json({ ok: true, rows });
}
