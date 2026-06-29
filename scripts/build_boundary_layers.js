const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputDir = process.env.MUNICIPALITIES_INPUT_DIR
  ? path.resolve(root, process.env.MUNICIPALITIES_INPUT_DIR)
  : path.join(root, "data", "raw", "N03-20230101_GML");
const jmaLocalAreaInputDir = process.env.JMA_LOCAL_AREA_INPUT_DIR
  ? path.resolve(root, process.env.JMA_LOCAL_AREA_INPUT_DIR)
  : path.join(root, "data", "raw", "jma_earthquake_local_areas");
const outputPath = path.join(root, "web", "data", "boundary_layers.geojson");
const decoder = new TextDecoder("shift_jis");
const coordinatePrecision = Number(process.env.BOUNDARY_COORDINATE_PRECISION || 5);
const simplifyTolerance = Number(process.env.BOUNDARY_SIMPLIFY_TOLERANCE || 0.0008);
const jmaAreaSimplifyTolerance = Number(process.env.JMA_AREA_SIMPLIFY_TOLERANCE || 0.002);
const minJmaAreaRingArea = Number(process.env.MIN_JMA_AREA_RING_AREA || 0.00002);

const regionByPrefectureCode = new Map(
  [
    { name: "北海道", codes: ["01"] },
    { name: "東北", codes: ["02", "03", "04", "05", "06", "07"] },
    { name: "関東", codes: ["08", "09", "10", "11", "12", "13", "14"] },
    { name: "中部", codes: ["15", "16", "17", "18", "19", "20", "21", "22", "23"] },
    { name: "近畿", codes: ["24", "25", "26", "27", "28", "29", "30"] },
    { name: "中国", codes: ["31", "32", "33", "34", "35"] },
    { name: "四国", codes: ["36", "37", "38", "39"] },
    { name: "九州", codes: ["40", "41", "42", "43", "44", "45", "46"] },
    { name: "沖縄", codes: ["47"] },
  ].flatMap((region) => region.codes.map((code) => [code, region.name])),
);

const shpPath = findFile(".shp");
const dbfPath = findFile(".dbf");
const municipalityCodes = readMunicipalityCodes(dbfPath);
const segmentMap = new Map();

readShp(shpPath, (recordIndex, start, end) => {
  const code = municipalityCodes[recordIndex];

  if (!code) {
    return;
  }

  const prefectureCode = code.slice(0, 2);
  addSegment(segmentMap, start, end, prefectureCode, regionByPrefectureCode.get(prefectureCode) ?? "不明");
});

const prefectureSegments = [];

for (const segment of segmentMap.values()) {
  if (segment.isPrefectureBorder) {
    prefectureSegments.push(segment.coordinates);
  }
}

const prefectureLines = joinSegments(prefectureSegments)
  .map((line) => simplifyLine(line, simplifyTolerance))
  .filter((line) => line.length >= 2);
const jmaRegionLines = readAreaBoundaryLines(jmaLocalAreaInputDir);

const boundaryLayers = {
  type: "FeatureCollection",
  name: "N03-derived prefecture and JMA earthquake information region boundaries",
  sources: {
    jmaPage: "https://www.jma.go.jp/jma/kishou/know/jishin/joho/shindo-name.html",
    municipalities: path.relative(root, inputDir),
    jmaLocalAreas: path.relative(root, jmaLocalAreaInputDir),
  },
  features: [
    {
      type: "Feature",
      properties: {
        layer: "prefecture",
        name: "都道府県境界",
      },
      geometry: {
        type: "MultiLineString",
        coordinates: prefectureLines,
      },
    },
    {
      type: "Feature",
      properties: {
        layer: "jma_region",
        name: "気象庁地震情報細分区域境界",
      },
      geometry: {
        type: "MultiLineString",
        coordinates: jmaRegionLines,
      },
    },
  ],
};

fs.writeFileSync(outputPath, JSON.stringify(boundaryLayers));

console.log(`Found ${prefectureSegments.length} prefecture boundary segments`);
console.log(`Wrote ${prefectureLines.length} prefecture boundary lines`);
console.log(`Wrote ${jmaRegionLines.length} JMA local area boundary lines`);
console.log(`Wrote ${path.relative(root, outputPath)}`);

function findFile(extension, directory = inputDir) {
  const fileName = fs.readdirSync(directory).find((name) => name.endsWith(extension));
  if (!fileName) {
    throw new Error(`No ${extension} file found in ${directory}`);
  }
  return path.join(directory, fileName);
}

function readMunicipalityCodes(filePath) {
  const buffer = fs.readFileSync(filePath);
  const recordCount = buffer.readUInt32LE(4);
  const headerLength = buffer.readUInt16LE(8);
  const recordLength = buffer.readUInt16LE(10);
  const fields = [];

  for (let offset = 32; buffer[offset] !== 0x0d; offset += 32) {
    fields.push({
      name: buffer.subarray(offset, offset + 11).toString("ascii").replace(/\0/g, ""),
      length: buffer[offset + 16],
      offset: fields.reduce((sum, field) => sum + field.length, 1),
    });
  }

  const codeField = fields.find((field) => field.name === "N03_007");
  if (!codeField) {
    throw new Error("No N03_007 field found in DBF");
  }

  return Array.from({ length: recordCount }, (_, recordIndex) => {
    const start = headerLength + recordIndex * recordLength;
    const raw = buffer.subarray(start + codeField.offset, start + codeField.offset + codeField.length);
    return decoder.decode(raw).trim();
  });
}

function readShp(filePath, onSegment) {
  const buffer = fs.readFileSync(filePath);
  let offset = 100;
  let recordIndex = 0;

  while (offset < buffer.length) {
    const contentLength = buffer.readInt32BE(offset + 4) * 2;
    const recordStart = offset + 8;
    const shapeType = buffer.readInt32LE(recordStart);

    if (shapeType === 5) {
      const partCount = buffer.readInt32LE(recordStart + 36);
      const pointCount = buffer.readInt32LE(recordStart + 40);
      const partOffsets = Array.from({ length: partCount }, (_, index) =>
        buffer.readInt32LE(recordStart + 44 + index * 4),
      );
      const pointStart = recordStart + 44 + partCount * 4;

      for (let partIndex = 0; partIndex < partOffsets.length; partIndex += 1) {
        const startIndex = partOffsets[partIndex];
        const endIndex = partOffsets[partIndex + 1] ?? pointCount;
        let previous = null;

        for (let pointIndex = startIndex; pointIndex < endIndex; pointIndex += 1) {
          const point = readPoint(buffer, pointStart, pointIndex);

          if (previous && !pointsEqual(previous, point)) {
            onSegment(recordIndex, previous, point);
          }

          previous = point;
        }
      }
    }

    offset += 8 + contentLength;
    recordIndex += 1;
  }
}

function readAreaBoundaryLines(directory) {
  const filePath = findFile(".shp", directory);
  const buffer = fs.readFileSync(filePath);
  const lines = [];
  let offset = 100;

  while (offset < buffer.length) {
    const contentLength = buffer.readInt32BE(offset + 4) * 2;
    const recordStart = offset + 8;
    const shapeType = buffer.readInt32LE(recordStart);

    if (shapeType === 5) {
      const partCount = buffer.readInt32LE(recordStart + 36);
      const pointCount = buffer.readInt32LE(recordStart + 40);
      const partOffsets = Array.from({ length: partCount }, (_, index) =>
        buffer.readInt32LE(recordStart + 44 + index * 4),
      );
      const pointStart = recordStart + 44 + partCount * 4;

      for (let partIndex = 0; partIndex < partOffsets.length; partIndex += 1) {
        const startIndex = partOffsets[partIndex];
        const endIndex = partOffsets[partIndex + 1] ?? pointCount;
        const ring = [];

        for (let pointIndex = startIndex; pointIndex < endIndex; pointIndex += 1) {
          ring.push(readPoint(buffer, pointStart, pointIndex));
        }

        const area = ringArea(ring);

        if (ring.length >= 4 && area <= -minJmaAreaRingArea) {
          lines.push(simplifyLine(trimClosingPoint(ring), jmaAreaSimplifyTolerance));
        }
      }
    }

    offset += 8 + contentLength;
  }

  return lines.filter((line) => line.length >= 2);
}

function readPoint(buffer, pointStart, pointIndex) {
  const pointOffset = pointStart + pointIndex * 16;
  return [
    roundCoordinate(buffer.readDoubleLE(pointOffset)),
    roundCoordinate(buffer.readDoubleLE(pointOffset + 8)),
  ];
}

function addSegment(map, start, end, prefectureCode, region) {
  if (pointsEqual(start, end)) {
    return;
  }

  const key = segmentKey(start, end);
  const segment = map.get(key);

  if (segment) {
    segment.count += 1;
    segment.isPrefectureBorder ||= segment.prefectureCode !== prefectureCode;
    segment.isRegionBorder ||= segment.region !== region;
    return;
  }

  map.set(key, {
    coordinates: [start, end],
    count: 1,
    prefectureCode,
    region,
    isPrefectureBorder: false,
    isRegionBorder: false,
  });
}

function joinSegments(segments) {
  const segmentItems = segments.map((coordinates, index) => ({
    index,
    coordinates,
    used: false,
  }));
  const byPoint = new Map();

  for (const segment of segmentItems) {
    addEndpoint(byPoint, segment.coordinates[0], segment);
    addEndpoint(byPoint, segment.coordinates[1], segment);
  }

  const lines = [];

  for (const segment of segmentItems) {
    if (segment.used) {
      continue;
    }

    segment.used = true;
    const line = [segment.coordinates[0], segment.coordinates[1]];
    extendLine(line, byPoint, false);
    extendLine(line, byPoint, true);
    lines.push(line);
  }

  return lines;
}

function addEndpoint(map, point, segment) {
  const key = pointKey(point);

  if (!map.has(key)) {
    map.set(key, []);
  }

  map.get(key).push(segment);
}

function extendLine(line, byPoint, atEnd) {
  while (true) {
    const point = atEnd ? line.at(-1) : line[0];
    const next = (byPoint.get(pointKey(point)) ?? []).find((segment) => !segment.used);

    if (!next) {
      return;
    }

    next.used = true;
    const [start, end] = next.coordinates;
    const other = pointsEqual(point, start) ? end : start;

    if (atEnd) {
      line.push(other);
    } else {
      line.unshift(other);
    }
  }
}

function simplifyLine(line, tolerance) {
  if (line.length <= 2 || tolerance <= 0) {
    return line;
  }

  return douglasPeucker(line, tolerance);
}

function trimClosingPoint(ring) {
  if (ring.length > 1 && pointsEqual(ring[0], ring.at(-1))) {
    return ring.slice(0, -1);
  }

  return ring;
}

function douglasPeucker(points, epsilon) {
  if (points.length <= 2) {
    return points;
  }

  let maxDistance = 0;
  let maxIndex = 0;

  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = perpendicularDistance(points[index], points[0], points.at(-1));
    if (distance > maxDistance) {
      maxDistance = distance;
      maxIndex = index;
    }
  }

  if (maxDistance <= epsilon) {
    return [points[0], points.at(-1)];
  }

  return [
    ...douglasPeucker(points.slice(0, maxIndex + 1), epsilon).slice(0, -1),
    ...douglasPeucker(points.slice(maxIndex), epsilon),
  ];
}

function perpendicularDistance(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];

  if (dx === 0 && dy === 0) {
    return Math.hypot(point[0] - start[0], point[1] - start[1]);
  }

  return Math.abs(dy * point[0] - dx * point[1] + end[0] * start[1] - end[1] * start[0]) /
    Math.hypot(dx, dy);
}

function segmentKey(start, end) {
  const a = pointKey(start);
  const b = pointKey(end);
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function pointKey(point) {
  return `${point[0]},${point[1]}`;
}

function roundCoordinate(value) {
  return Number(value.toFixed(coordinatePrecision));
}

function ringArea(ring) {
  return ring.reduce((sum, point, index) => {
    const next = ring[(index + 1) % ring.length];
    return sum + point[0] * next[1] - next[0] * point[1];
  }, 0) / 2;
}

function pointsEqual(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
