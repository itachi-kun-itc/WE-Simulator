const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const root = path.resolve(__dirname, "..");
const sourceUrl = "https://www.data.jma.go.jp/eqev/data/kyoshin/jma-shindo.html";
const outputPath = path.join(root, "web", "data", "jma_shindo_stations.json");

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const html = await fetchText(sourceUrl);
  const text = htmlToText(html);
  const updated = text.match(/気象庁震度観測点一覧表（(.+?現在)）/)?.[1] ?? "";
  const stations = parseStations(text);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      {
        source: sourceUrl,
        updated,
        count: stations.length,
        stations,
      },
      null,
      2,
    ),
  );

  console.log(`Wrote ${stations.length} JMA shindo stations to ${path.relative(root, outputPath)}`);
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Request failed: ${response.statusCode}`));
          response.resume();
          return;
        }

        response.setEncoding("utf8");
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:td|th)>/gi, " ")
    .replace(/<\/(?:p|div|li|tr|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\r/g, "");
}

function parseStations(text) {
  const stations = [];
  const lines = text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const rowPattern =
    /^(\S+)\s+(\S+)\s+(.+?)\s+(\d{1,2})\s+(\d{1,2}(?:\.\d+)?)\s+(\d{3})\s+(\d{1,2}(?:\.\d+)?)\s+(\S+)(?:\s+(\S+))?$/u;

  for (const line of lines) {
    if (
      line.includes("地域名称 震度観測点名称") ||
      line.startsWith("※") ||
      line.startsWith("気象庁震度観測点一覧表")
    ) {
      continue;
    }

    const match = line.match(rowPattern);
    if (!match) {
      continue;
    }

    const [, areaName, stationName, address, latDeg, latMin, lonDeg, lonMin, start, end = ""] =
      match;
    const latitude = Number(latDeg) + Number(latMin) / 60;
    const longitude = Number(lonDeg) + Number(lonMin) / 60;

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      continue;
    }

    stations.push({
      id: `${stations.length + 1}`.padStart(5, "0"),
      areaName,
      name: stationName,
      address,
      latitude: round(latitude, 5),
      longitude: round(longitude, 5),
      start,
      end,
      active: end === "",
    });
  }

  return stations;
}

function round(value, digits) {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}
