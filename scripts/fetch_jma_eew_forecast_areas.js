const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourceUrl = "https://www.jma.go.jp/jma/kishou/know/jishin/joho/shindo-name.html";
const outputPath = path.join(root, "web", "data", "jma_eew_forecast_areas.json");

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
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
