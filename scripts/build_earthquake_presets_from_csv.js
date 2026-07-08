const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceDir = "C:\\開発\\ソース\\気象・地震シミュレーション\\主要地震";
const eewSourceDir = "C:\\開発\\ソース\\気象・地震シミュレーション\\緊急地震速報（警報）";
const outputPath = path.join(root, "web", "data", "earthquake_presets.json");

const presetFiles = [
  "関東大震災（1923）.csv",
  "兵庫県南部地震（1995）.csv",
  "新潟県中越地震（2004）.csv",
  "東北地方太平洋沖地震（2011）.csv",
  "静岡県東部の地震（2011）.csv",
  "淡路島付近の地震（2013）.csv",
  "小笠原諸島西方沖の地震（2015）.csv",
  "熊本地震 前震（2016）.csv",
  "熊本地震 本震（2016）.csv",
  "鳥取県中部の地震（2016）.csv",
  "大阪北部地震（2018）.csv",
  "北海道胆振東部地震（2018）.csv",
  "山形県沖の地震（2019）.csv",
  "福島県沖の地震（2022）.csv",
  "能登半島沖地震（2024）.csv",
  "日向灘の地震（2024）.csv",
  "青森県東方沖の地震（2025）.csv",
  "岩手県沖の地震（2026）.csv",
];

const eewForecastAreasByName = {
  "兵庫県南部地震（1995）": ["近畿"],
  "新潟県中越地震（2004）": ["新潟", "長野"],
  "東北地方太平洋沖地震（2011）": ["東北", "関東", "新潟", "長野", "静岡"],
  "静岡県東部の地震（2011）": ["関東", "静岡", "長野"],
  "熊本地震 前震（2016）": ["九州"],
  "熊本地震 本震（2016）": ["九州"],
  "鳥取県中部の地震（2016）": ["中国", "近畿", "四国"],
  "大阪北部地震（2018）": ["近畿"],
  "北海道胆振東部地震（2018）": ["北海道"],
  "山形県沖の地震（2019）": ["東北", "新潟", "北陸"],
  "福島県沖の地震（2022）": ["東北", "関東", "新潟", "北陸", "長野", "静岡"],
  "能登半島沖地震（2024）": ["北陸", "長野"],
  "日向灘の地震（2024）": ["九州", "中国", "四国"],
  "青森県東方沖の地震（2025）": ["北海道", "東北"],
  "岩手県沖の地震（2026）": ["北海道", "東北"],
};

const representativeIntensity = new Map([
  ["震度７", 6.5],
  ["震度6強", 6.0],
  ["震度６強", 6.0],
  ["震度6弱", 5.5],
  ["震度６弱", 5.5],
  ["震度6", 5.5],
  ["震度６", 5.5],
  ["震度5強", 5.0],
  ["震度５強", 5.0],
  ["震度5弱", 4.5],
  ["震度５弱", 4.5],
  ["震度5", 4.5],
  ["震度５", 4.5],
  ["震度4", 3.5],
  ["震度４", 3.5],
  ["震度3", 2.5],
  ["震度３", 2.5],
  ["震度2", 1.5],
  ["震度２", 1.5],
  ["震度1", 0.5],
  ["震度１", 0.5],
]);

const prefectureNames = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

function main() {
  const presets = presetFiles.map((fileName) => parsePreset(fileName));
  const output = {
    sourceDirectory: sourceDir,
    generatedAt: new Date().toISOString(),
    note: "CSVに計測震度がない観測点は measuredIntensity: null とし、表示では '-' とする。",
    presets,
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(output)}\n`, "utf8");
  console.log(`Wrote ${presets.length} presets to ${path.relative(root, outputPath)}`);
}

function parsePreset(fileName) {
  const eventName = fileName.replace(/\.csv$/i, "");
  const filePath = path.join(sourceDir, fileName);
  const rows = parseCsv(fs.readFileSync(filePath, "utf8"))
    .map((row) => (row.length === 1 && row[0].includes(",") ? parseCsv(row[0])[0] : row))
    .filter((row) => row.some((cell) => String(cell).trim() !== ""));
  if (eventName === "関東大震災（1923）") {
    return parseKantoDaishinsaiPreset(eventName, rows);
  }
  const headers = rows[0];
  const eventRows = [];
  let index = 1;

  while (index < rows.length && rows[index][0] !== "都道府県") {
    if (rows[index].length >= headers.length) {
      eventRows.push(objectFromRow(headers, rows[index]));
    }
    index += 1;
  }

  const primaryEvent = eventRows[0];
  const observationHeader = rows[index] ?? [];
  const observations = [];
  for (index += 1; index < rows.length; index += 1) {
    const row = objectFromRow(observationHeader, rows[index]);
    const intensityLabel = normalizeIntensityLabel(row["震度"]);
    const intensityValue = getRepresentativeIntensityValue(intensityLabel);
    const stationNames = splitStationNames(row["観測点名"]);

    if (!Number.isFinite(intensityValue)) {
      continue;
    }

    stationNames.forEach((stationName) => {
      observations.push({
        prefecture: row["都道府県"] ?? "",
        stationName,
        intensityLabel,
        intensityValue,
        measuredIntensity: null,
      });
    });
  }
  const hyogoMunicipalityObservations = parseHyogoNanbuMunicipalityObservations(eventName);
  const detailedObservations = parseDetailedObservations(eventName);
  const finalObservations =
    hyogoMunicipalityObservations.length > 0
      ? hyogoMunicipalityObservations
      : detailedObservations.length > 0
      ? dedupeObservations([...detailedObservations, ...observations])
      : dedupeObservations(observations);

  return {
    id: slugify(eventName),
    label: eventName,
    date: primaryEvent["地震の発生日"] ?? "",
    time: primaryEvent["地震の発生時刻"] ?? "",
    epicenterName: primaryEvent["震央地名"] ?? eventName,
    latitude: parseCoordinate(primaryEvent["緯度"]),
    longitude: parseCoordinate(primaryEvent["経度"]),
    depthKm: parseDepth(primaryEvent["深さ"]),
    magnitude: parseMagnitude(primaryEvent["Ｍ"]),
    maxIntensity: primaryEvent["最大震度"] ?? "",
    observedStations: finalObservations,
    eewForecastAreas: eewForecastAreasByName[eventName] ?? [],
    eewReports: parseEewReports(eventName),
  };
}

function parseKantoDaishinsaiPreset(eventName, rows) {
  const getRow = (label) => rows.find((row) => String(row[0] ?? "").trim() === label) ?? [];
  const originRow = getRow("発生場所（震源位置）");
  const areaDepthRow = rows.find((row) => String(row[1] ?? "").includes("神奈川県西部")) ?? [];
  const observations = [];
  const fixedCoordinates = new Map([
    ["広島県|広島市", [132.4553, 34.3853]],
  ]);

  rows.forEach((row) => {
    const intensityLabel = normalizeIntensityLabel(row[0]);
    const intensityValue = getHyogoNanbuOldScaleIntensityValue(intensityLabel);
    if (!Number.isFinite(intensityValue)) {
      return;
    }

    splitJapaneseList(row[1]).forEach((areaName) => {
      const place = splitPrefectureAndPlace(areaName);
      if (!place.name) {
        return;
      }

      observations.push({
        prefecture: place.prefecture,
        stationName: place.name,
        intensityLabel,
        displayIntensityLabel: intensityLabel.replace(/^震度/, ""),
        displayIntensityShortLabel: intensityLabel.replace(/^震度/, ""),
        intensityValue,
        measuredIntensity: null,
        oldJmaScale: true,
        syntheticMunicipality: true,
        longitude: fixedCoordinates.get(`${place.prefecture}|${place.name}`)?.[0],
        latitude: fixedCoordinates.get(`${place.prefecture}|${place.name}`)?.[1],
      });
    });
  });

  return {
    id: slugify(eventName),
    label: eventName,
    date: "1923/09/01",
    time: "11:58",
    epicenterName: areaDepthRow[1] || "神奈川県西部",
    latitude: parseJapaneseCoordinate(originRow[1]),
    longitude: parseJapaneseCoordinate(originRow[2]),
    depthKm: parseDepth(areaDepthRow[2]),
    magnitude: parseMagnitude(getRow("規模（マグニチュード）")[1]),
    maxIntensity: `震度${getRow("最大震度")[1] ?? "6"}`,
    observedStations: dedupeObservations(observations),
    eewForecastAreas: [],
    eewReports: [],
  };
}

function parseHyogoNanbuMunicipalityObservations(eventName) {
  const filePath = path.join(sourceDir, `【詳細3】${eventName}.csv`);
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const rows = parseCsv(fs.readFileSync(filePath, "utf8"))
    .map((row) => (row.length === 1 && row[0].includes(",") ? parseCsv(row[0])[0] : row))
    .filter((row) => row.some((cell) => String(cell).trim() !== ""));
  const observations = [];

  rows.forEach((row) => {
    const intensityLabel = normalizeIntensityLabel(row[1]);
    const intensityValue = getHyogoNanbuOldScaleIntensityValue(intensityLabel);
    if (!Number.isFinite(intensityValue)) {
      return;
    }

    splitEewAreas(row[2]).forEach((areaName) => {
      const place = splitPrefectureAndPlace(areaName.replace(/（[^）]*）/g, ""));
      if (!place.name) {
        return;
      }

      observations.push({
        prefecture: place.prefecture,
        stationName: place.name,
        intensityLabel,
        displayIntensityLabel: intensityLabel.replace(/^震度/, ""),
        displayIntensityShortLabel: intensityLabel.replace(/^震度/, ""),
        intensityValue,
        measuredIntensity: null,
        oldJmaScale: true,
        syntheticMunicipality: true,
      });
    });
  });

  return dedupeObservations(observations);
}

function parseDetailedObservations(eventName) {
  const filePath = path.join(sourceDir, `【詳細1】${eventName}.csv`);
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const rows = parseCsv(fs.readFileSync(filePath, "utf8")).filter((row) =>
    row.some((cell) => String(cell).trim() !== ""),
  );
  const observations = [];
  let currentIntensityLabel = "";
  let currentIntensityValue = null;

  rows.slice(1).forEach((row) => {
    const firstCell = normalizeIntensityLabel(row[0]);
    const nextIntensityValue = getRepresentativeIntensityValue(firstCell);
    let prefecture = "";
    let stationText = "";

    if (Number.isFinite(nextIntensityValue)) {
      currentIntensityLabel = firstCell;
      currentIntensityValue = nextIntensityValue;
      prefecture = row[1] ?? "";
      stationText = row[2] ?? "";
    } else if (Number.isFinite(currentIntensityValue)) {
      prefecture = row[0] ?? "";
      stationText = row[1] ?? row[2] ?? "";
    }

    splitStationNames(stationText).forEach((stationName) => {
      observations.push({
        prefecture,
        stationName,
        intensityLabel: currentIntensityLabel,
        intensityValue: currentIntensityValue,
        measuredIntensity: null,
      });
    });
  });

  return dedupeObservations(observations);
}

function parseEewReports(eventName) {
  const filePath = path.join(eewSourceDir, `緊急地震速報 ${eventName}.csv`);
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const rows = parseCsv(fs.readFileSync(filePath, "utf8")).filter((row) =>
    row.some((cell) => String(cell).trim() !== ""),
  );
  const warningReportNumbers = parseWarningReportNumbers(rows);
  const reportRows = [];
  const detailAreasByMarker = new Map();
  let currentMarker = null;

  rows.forEach((row) => {
    const firstCell = String(row[0] ?? "").trim();
    const elapsedSec = Number(row[2]);
    const marker = String(row[7] ?? "").trim();

    if (/^\d+$/.test(firstCell) && Number.isFinite(elapsedSec)) {
      reportRows.push({
        reportNumber: Number(firstCell),
        elapsedSec,
        marker,
      });
      return;
    }

    if (/^※\d+/.test(firstCell)) {
      currentMarker = firstCell;
    }

    if (!currentMarker || !/^※\d+/.test(currentMarker)) {
      return;
    }

    const detailType = String(row[1] ?? "").trim();
    if (!isEewWarningDetailType(detailType)) {
      return;
    }

    const areaText = String(row[2] ?? "").trim();
    if (!areaText || areaText === "—" || areaText === "--") {
      return;
    }

    const areas = splitEewAreas(areaText);
    if (areas.length === 0) {
      return;
    }

    const areaSet = detailAreasByMarker.get(currentMarker) ?? new Set();
    areas.forEach((area) => areaSet.add(area));
    detailAreasByMarker.set(currentMarker, areaSet);
  });

  const firstWarningReportNumber =
    warningReportNumbers.length > 0 ? Math.min(...warningReportNumbers) : 1;
  let cumulativeAreas = new Set();

  return reportRows
    .filter((report) => report.reportNumber >= firstWarningReportNumber)
    .map((report) => {
      const areas = detailAreasByMarker.get(report.marker) ?? new Set();
      cumulativeAreas = new Set([...cumulativeAreas, ...areas]);
      return {
        reportNumber: report.reportNumber,
        elapsedSec: report.elapsedSec,
        marker: report.marker,
        areas: [...cumulativeAreas],
      };
    })
    .filter((report) => report.areas.length > 0);
}

function isEewWarningDetailType(value) {
  const detailType = String(value ?? "").normalize("NFKC").replace(/\s+/g, "");
  if (detailType.startsWith("震度")) {
    return true;
  }

  const longPeriodMatch = detailType.match(/長周期地震動階級(\d+)/);
  return longPeriodMatch ? Number(longPeriodMatch[1]) >= 3 : false;
}

function parseWarningReportNumbers(rows) {
  const text = rows.map((row) => row.join(" ")).join(" ");
  const match = text.match(/警報[^第]*\[([^\]]+)\]/);
  if (!match) {
    return [];
  }

  return [...match[1].matchAll(/第\s*(\d+)\s*報/g)].map((item) => Number(item[1]));
}

function splitEewAreas(value) {
  return String(value ?? "")
    .split(/[、,]/)
    .map((area) => area.trim())
    .filter(Boolean);
}

function splitJapaneseList(value) {
  return String(value ?? "")
    .split(/[、,]/)
    .map((area) => area.trim())
    .filter(Boolean);
}

function objectFromRow(headers, row) {
  return Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""]));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(value.trim());
      rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value.trim());
    rows.push(row);
  }

  return rows;
}

function splitStationNames(value) {
  return String(value ?? "")
    .split(/[、,・\s]+/)
    .map((stationName) => cleanStationName(stationName))
    .filter(Boolean);
}

function cleanStationName(stationName) {
  return String(stationName ?? "")
    .replace(/[＊*]/g, "")
    .replace(/（旧[^）]*）/g, "")
    .replace(/\(旧[^)]*\)/g, "")
    .trim();
}

function normalizeIntensityLabel(value) {
  return String(value ?? "").replace(/\s+/g, "");
}

function getRepresentativeIntensityValue(label) {
  const normalizedLabel = normalizeIntensityLabel(label);
  const candidates = [
    normalizedLabel,
    `震度${normalizedLabel}`,
    normalizedLabel.replace(/^震度/, ""),
  ];

  for (const candidate of candidates) {
    if (representativeIntensity.has(candidate)) {
      return representativeIntensity.get(candidate);
    }
  }

  if (/^7$|震度7/.test(normalizedLabel)) return 6.5;
  if (/^6強$|震度6強|６強/.test(normalizedLabel)) return 6.0;
  if (/^6弱$|震度6弱|６弱/.test(normalizedLabel)) return 5.5;
  if (/^6$|震度6/.test(normalizedLabel)) return 5.5;
  if (/^5強$|震度5強|５強/.test(normalizedLabel)) return 5.0;
  if (/^5弱$|震度5弱|５弱/.test(normalizedLabel)) return 4.5;
  if (/^5$|震度5/.test(normalizedLabel)) return 4.5;
  if (/^4$|震度4/.test(normalizedLabel)) return 3.5;
  if (/^3$|震度3/.test(normalizedLabel)) return 2.5;
  if (/^2$|震度2/.test(normalizedLabel)) return 1.5;
  if (/^1$|震度1/.test(normalizedLabel)) return 0.5;
  return null;
}

function getHyogoNanbuOldScaleIntensityValue(label) {
  const normalizedLabel = normalizeIntensityLabel(label).replace(/^震度/, "");
  if (normalizedLabel === "7") return 6.5;
  if (normalizedLabel === "6") return 6.0;
  if (normalizedLabel === "5") return 5.0;
  if (normalizedLabel === "4") return 3.5;
  if (normalizedLabel === "3") return 2.5;
  if (normalizedLabel === "2") return 1.5;
  if (normalizedLabel === "1") return 0.5;
  return null;
}

function splitPrefectureAndPlace(value) {
  const normalizedValue = String(value ?? "").trim();
  const prefecture = prefectureNames.find((name) => normalizedValue.startsWith(name));
  if (prefecture) {
    return {
      prefecture,
      name: cleanPrefecturePrefix(normalizedValue.slice(prefecture.length), prefecture),
    };
  }

  const match = normalizedValue.match(/^(.+?[都道府県])(.+)$/);
  if (!match) {
    return { prefecture: "", name: cleanPrefecturePrefix(normalizedValue, "") };
  }

  return {
    prefecture: match[1],
    name: cleanPrefecturePrefix(match[2], match[1]),
  };
}

function cleanPrefecturePrefix(name, prefecture) {
  let cleanedName = String(name ?? "").trim();
  const normalizedPrefecture = String(prefecture ?? "").trim();
  if (normalizedPrefecture && cleanedName.startsWith(normalizedPrefecture)) {
    cleanedName = cleanedName.slice(normalizedPrefecture.length);
  }

  const suffix = normalizedPrefecture.match(/[都道府県]$/)?.[0];
  if (suffix && cleanedName.startsWith(suffix)) {
    cleanedName = cleanedName.slice(suffix.length);
  }

  return cleanedName.replace(/^(?:都|道|府|県)(?=.+[市区町村]$)/u, "");
}

function dedupeObservations(observations) {
  const seen = new Set();
  return observations.filter((observation) => {
    const stationName = cleanStationName(observation.stationName);
    if (!stationName) {
      return false;
    }

    const key = `${observation.prefecture}|${stationName}|${observation.intensityValue}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    observation.stationName = stationName;
    return true;
  });
}

function parseCoordinate(value) {
  const match = String(value ?? "").match(/(\d+(?:\.\d+)?)°\s*(\d+(?:\.\d+)?)?′?/);
  if (!match) {
    return null;
  }

  const degrees = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  return Number((degrees + minutes / 60).toFixed(4));
}

function parseJapaneseCoordinate(value) {
  const match = String(value ?? "").match(/(\d+(?:\.\d+)?)度\s*(\d+(?:\.\d+)?)?分?/);
  if (!match) {
    return parseCoordinate(value);
  }

  const degrees = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  return Number((degrees + minutes / 60).toFixed(4));
}

function parseDepth(value) {
  if (/ごく浅い/.test(String(value ?? ""))) {
    return 0;
  }

  const match = String(value ?? "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 10;
}

function parseMagnitude(value) {
  const match = String(value ?? "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function slugify(value) {
  return String(value)
    .normalize("NFKC")
    .replace(/[（）]/g, "-")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

main();
