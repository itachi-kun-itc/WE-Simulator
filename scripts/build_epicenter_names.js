const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourcePath =
  "C:\\開発\\ソース\\気象・地震シミュレーション\\震央名称\\震央名称.csv";
const outputPath = path.join(root, "web", "data", "epicenter_names.json");

const rows = parseCsv(fs.readFileSync(sourcePath, "utf8")).filter((row) =>
  row.some((cell) => String(cell).trim() !== ""),
);
const headerIndex = rows.findIndex(
  (row) => row[0] === "コード" && row[1] === "震央地名" && row[2] === "コード" && row[3] === "震央地名",
);

if (headerIndex < 0) {
  throw new Error("震央名称CSVの見出し行を見つけられませんでした。");
}

const eewForecastAreas = [];
const earthquakeInformationAreas = [];
let currentEewArea = null;

for (const row of rows.slice(headerIndex + 1)) {
  const [eewCode, eewName, infoCode, infoName, majorEarthquake] = row.map((cell) =>
    String(cell ?? "").trim(),
  );

  if (eewCode || eewName) {
    currentEewArea = {
      code: eewCode,
      name: eewName,
    };
    eewForecastAreas.push(currentEewArea);
  }

  if (infoCode || infoName) {
    earthquakeInformationAreas.push({
      code: infoCode,
      name: infoName,
      eewForecastAreaCode: currentEewArea?.code ?? "",
      eewForecastAreaName: currentEewArea?.name ?? "",
      majorEarthquake,
    });
  }
}

const output = {
  source: "https://ja.wikipedia.org/wiki/震央地名",
  sourceFile: sourcePath,
  generatedAt: new Date().toISOString(),
  note: "震央地名一覧。海外の震央地名も名称一覧として保持するが、このアプリの震源設定では日本周辺を主対象とする。",
  eewForecastAreas,
  earthquakeInformationAreas,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output)}\n`, "utf8");
console.log(
  `Wrote ${earthquakeInformationAreas.length} earthquake information names and ${eewForecastAreas.length} EEW areas to ${path.relative(
    root,
    outputPath,
  )}`,
);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  row.push(field);
  rows.push(row);
  return rows;
}
