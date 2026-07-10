const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourceUrl = "https://www.jma.go.jp/jma/kishou/know/jishin/joho/shindo-name.html";
const defaultCsvPath = "C:\\開発\\ソース\\気象・地震シミュレーション\\緊急地震速報（警報）\\EEW地域.csv";
const sourceCsvPath = process.env.JMA_EEW_FORECAST_AREAS_CSV
  ? path.resolve(root, process.env.JMA_EEW_FORECAST_AREAS_CSV)
  : defaultCsvPath;
const outputPath = path.join(root, "web", "data", "jma_eew_forecast_areas.json");

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  if (fs.existsSync(sourceCsvPath)) {
    const csv = fs.readFileSync(sourceCsvPath, "utf8");
    const output = buildOutputFromCsv(csv);
    fs.writeFileSync(outputPath, `${JSON.stringify(output)}\n`);
    console.log(`Wrote ${Object.keys(output.areaToForecast).length} local area mappings`);
    console.log(`Wrote ${Object.keys(output.forecastAreasByName).length} forecast areas`);
    console.log(path.relative(root, outputPath));
    return;
  }

  const html = await fetchText(sourceUrl);
  const updated = htmlToText(html).match(/（(.+?現在)）/)?.[1] ?? "";
  const rows = parseTableRows(html);
  const areaToForecast = {};
  const forecastAreas = {};

  rows.slice(1).forEach((row) => {
    const [prefecture, forecastArea, localArea, municipalities] = row;
    if (!forecastArea || !localArea) {
      return;
    }

    areaToForecast[localArea] = forecastArea;
    forecastAreas[forecastArea] ??= {
      prefecture,
      name: forecastArea,
      localAreas: [],
    };
    forecastAreas[forecastArea].localAreas.push({
      name: localArea,
      municipalities,
    });
  });

  const output = {
    source: sourceUrl,
    updated,
    areaToForecast,
    forecastAreas: Object.values(forecastAreas),
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(output)}\n`);
  console.log(`Wrote ${Object.keys(areaToForecast).length} local area mappings`);
  console.log(`Wrote ${Object.keys(forecastAreas).length} forecast areas`);
  console.log(path.relative(root, outputPath));
}

function buildOutputFromCsv(csv) {
  const rows = parseCsvRows(csv).filter((row) => row.some((cell) => String(cell ?? "").trim()));
  const updated = rows.find((row) => row.some((cell) => /現在/.test(cell)))?.find((cell) => /現在/.test(cell)) ?? "";
  const headerIndex = rows.findIndex((row) =>
    row.includes("緊急地震速報で用いる府県予報区の名称") &&
    row.includes("緊急地震速報や震度情報で用いる区域名")
  );
  if (headerIndex < 0) {
    throw new Error("EEW地域CSVの見出し行を見つけられませんでした。");
  }

  const header = rows[headerIndex].map((cell) => cell.trim());
  const prefectureIndex = header.indexOf("都道府県名");
  const forecastIndex = header.indexOf("緊急地震速報で用いる府県予報区の名称");
  const areaIndex = header.indexOf("緊急地震速報や震度情報で用いる区域名");
  const municipalitiesIndex = header.indexOf("震源・震度情報で用いる市町村名");

  const areaToForecast = {};
  const forecastAreasByName = {};
  let currentPrefecture = "";
  let currentForecastArea = "";

  for (const row of rows.slice(headerIndex + 1)) {
    const prefecture = row[prefectureIndex]?.trim() || currentPrefecture;
    const forecastArea = row[forecastIndex]?.trim() || currentForecastArea;
    const areaName = row[areaIndex]?.trim();
    const municipalities = row[municipalitiesIndex]?.trim() ?? "";

    if (prefecture) {
      currentPrefecture = prefecture;
    }
    if (forecastArea) {
      currentForecastArea = forecastArea;
    }
    if (!forecastArea || !areaName) {
      continue;
    }

    areaToForecast[areaName] = forecastArea;
    forecastAreasByName[forecastArea] ??= {
      prefecture,
      name: forecastArea,
      localAreas: [],
    };
    forecastAreasByName[forecastArea].localAreas.push({
      name: areaName,
      municipalities,
    });
  }

  return {
    source: sourceUrl,
    sourceFile: sourceCsvPath,
    updated,
    areaNameColumn: "緊急地震速報や震度情報で用いる区域名",
    forecastAreaColumn: "緊急地震速報で用いる府県予報区の名称",
    areaToForecast,
    forecastAreasByName,
    forecastAreas: Object.values(forecastAreasByName),
  };
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !inQuotes) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += character;
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} request failed: ${response.status}`);
  }

  return response.text();
}

function parseTableRows(html) {
  const table = html.match(/<table[\s\S]*?<\/table>/i)?.[0];
  if (!table) {
    throw new Error("No table found");
  }

  const pending = [];
  return [...table.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map(([rowHtml]) => {
    const cells = [...rowHtml.matchAll(/<t[hd][^>]*>[\s\S]*?<\/t[hd]>/gi)];
    const row = [];
    let cellIndex = 0;

    for (let column = 0; column < 4; column += 1) {
      if (pending[column]?.rows > 0) {
        row[column] = pending[column].value;
        pending[column].rows -= 1;
        continue;
      }

      const cellHtml = cells[cellIndex++]?.[0] ?? "";
      const value = htmlToText(cellHtml);
      const rowspan = Number(cellHtml.match(/rowspan=["']?(\d+)/i)?.[1] ?? 1);
      row[column] = value;

      if (rowspan > 1) {
        pending[column] = {
          value,
          rows: rowspan - 1,
        };
      }
    }

    return row;
  });
}

function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
