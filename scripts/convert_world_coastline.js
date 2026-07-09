const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputDir = process.env.WORLD_COASTLINE_INPUT_DIR
  ? path.resolve(root, process.env.WORLD_COASTLINE_INPUT_DIR)
  : path.join(root, "data", "raw", "10m_physical");
const shapeBasename = process.env.WORLD_COASTLINE_SHAPE_BASENAME || "ne_10m_coastline";
const outputPath = process.env.WORLD_COASTLINE_OUTPUT_PATH
  ? path.resolve(root, process.env.WORLD_COASTLINE_OUTPUT_PATH)
  : path.join(root, "web", "data", "world_coastline.geojson");
const sourceName = process.env.WORLD_COASTLINE_SOURCE_NAME || "Natural Earth 10m coastline";
const coordinatePrecision = Number(process.env.WORLD_COASTLINE_COORDINATE_PRECISION || 5);
const simplifyTolerance = Number(process.env.WORLD_COASTLINE_SIMPLIFY_TOLERANCE || 0.001);
const minLinePoints = Number(process.env.WORLD_COASTLINE_MIN_LINE_POINTS || 2);
const buildWorldMap = process.env.WORLD_COASTLINE_WORLD !== "0";
const clipBounds = {
  west: Number(process.env.WORLD_COASTLINE_WEST || 85),
  south: Number(process.env.WORLD_COASTLINE_SOUTH || 1),
  east: Number(process.env.WORLD_COASTLINE_EAST || 180),
  north: Number(process.env.WORLD_COASTLINE_NORTH || 89),
};
const clipBoundsList = splitClipBounds(clipBounds);

const shpPath = findFile(".shp");
const dbfPath = findFile(".dbf");
const records = readDbf(dbfPath);
const features = [];

readShp(shpPath, (recordIndex, lines) => {
  const coordinates = lines.filter((line) => line.length >= minLinePoints);
  if (coordinates.length === 0) {
    return;
  }

  const record = records[recordIndex] ?? {};
  features.push({
    type: "Feature",
    properties: {
      scalerank: Number(record.scalerank || record.SCALERANK || 0),
      source: sourceName,
    },
    geometry: {
      type: "MultiLineString",
      coordinates,
    },
  });
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  JSON.stringify({
    type: "FeatureCollection",
    name: "Natural Earth 10m world coastline",
    source: sourceName,
    version: readVersion(),
    bounds: clipBounds,
    boundsParts: clipBoundsList,
    features,
  }),
);

console.log(`Wrote ${features.length} coastline features to ${path.relative(root, outputPath)}`);

function findFile(extension) {
  const fileName = fs.readdirSync(inputDir).find((name) => name === `${shapeBasename}${extension}`);
  if (!fileName) {
    throw new Error(`No ${shapeBasename}${extension} file found in ${inputDir}`);
  }

  return path.join(inputDir, fileName);
}

function readVersion() {
  const versionPath = fs.readdirSync(inputDir).find((name) => name === `${shapeBasename}.VERSION.txt`);
  if (!versionPath) {
    return "";
  }

  return fs.readFileSync(path.join(inputDir, versionPath), "utf8").trim();
}

function readDbf(filePath) {
  const buffer = fs.readFileSync(filePath);
  const recordCount = buffer.readUInt32LE(4);
  const headerLength = buffer.readUInt16LE(8);
  const recordLength = buffer.readUInt16LE(10);
  const fields = [];
  const decoder = new TextDecoder("utf-8");

  for (let offset = 32; buffer[offset] !== 0x0d; offset += 32) {
    fields.push({
      name: buffer.subarray(offset, offset + 11).toString("ascii").replace(/\0/g, ""),
      length: buffer[offset + 16],
      offset: fields.reduce((sum, field) => sum + field.length, 1),
    });
  }

  return Array.from({ length: recordCount }, (_, recordIndex) => {
    const start = headerLength + recordIndex * recordLength;
    const record = {};

    for (const field of fields) {
      const raw = buffer.subarray(start + field.offset, start + field.offset + field.length);
      record[field.name] = decoder.decode(raw).replace(/\0/g, "").trim();
    }

    return record;
  });
}

function readShp(filePath, onRecord) {
  const buffer = fs.readFileSync(filePath);
  let offset = 100;
  let recordIndex = 0;

  while (offset < buffer.length) {
    const contentLength = buffer.readInt32BE(offset + 4) * 2;
    const recordStart = offset + 8;
    const shapeType = buffer.readInt32LE(recordStart);

    if (shapeType !== 3) {
      offset += 8 + contentLength;
      recordIndex += 1;
      continue;
    }

    const recordBox = {
      west: buffer.readDoubleLE(recordStart + 4),
      south: buffer.readDoubleLE(recordStart + 12),
      east: buffer.readDoubleLE(recordStart + 20),
      north: buffer.readDoubleLE(recordStart + 28),
    };

    if (!boxesIntersectAny(recordBox, clipBoundsList)) {
      offset += 8 + contentLength;
      recordIndex += 1;
      continue;
    }

    const partCount = buffer.readInt32LE(recordStart + 36);
    const pointCount = buffer.readInt32LE(recordStart + 40);
    const partOffsets = Array.from({ length: partCount }, (_, index) =>
      buffer.readInt32LE(recordStart + 44 + index * 4),
    );
    const pointStart = recordStart + 44 + partCount * 4;
    const points = Array.from({ length: pointCount }, (_, index) => {
      const pointOffset = pointStart + index * 16;
      return [buffer.readDoubleLE(pointOffset), buffer.readDoubleLE(pointOffset + 8)];
    });
    const lines = partOffsets
      .flatMap((start, index) => {
        const end = partOffsets[index + 1] ?? points.length;
        return clipLineToBoundsList(simplifyLine(points.slice(start, end)), clipBoundsList);
      })
      .filter((line) => line.length >= minLinePoints);

    onRecord(recordIndex, lines);
    offset += 8 + contentLength;
    recordIndex += 1;
  }
}

function boxesIntersect(a, b) {
  return a.west <= b.east && a.east >= b.west && a.south <= b.north && a.north >= b.south;
}

function boxesIntersectAny(box, boundsList) {
  return boundsList.some((bounds) => boxesIntersect(box, bounds));
}

function splitClipBounds(bounds) {
  if (bounds.west <= bounds.east) {
    return [bounds];
  }

  return [
    { ...bounds, east: 180 },
    { ...bounds, west: -180 },
  ];
}

function clipLineToBoundsList(line, boundsList) {
  return boundsList.flatMap((bounds) => clipLineToBounds(line, bounds));
}

function clipLineToBounds(line, bounds) {
  const lines = [];
  let current = [];

  for (let index = 0; index < line.length - 1; index += 1) {
    const segment = clipSegmentToBounds(line[index], line[index + 1], bounds);

    if (!segment) {
      pushCurrentLine(lines, current);
      current = [];
      continue;
    }

    const [start, end] = segment;
    if (pointsEqual(start, end)) {
      continue;
    }

    if (current.length === 0) {
      current.push(start, end);
    } else if (pointsEqual(current.at(-1), start)) {
      current.push(end);
    } else {
      pushCurrentLine(lines, current);
      current = [start, end];
    }
  }

  pushCurrentLine(lines, current);
  return lines;
}

function pushCurrentLine(lines, line) {
  if (line.length >= minLinePoints) {
    lines.push(dedupeConsecutivePoints(line));
  }
}

function clipSegmentToBounds(start, end, bounds) {
  let t0 = 0;
  let t1 = 1;
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const checks = [
    [-dx, start[0] - bounds.west],
    [dx, bounds.east - start[0]],
    [-dy, start[1] - bounds.south],
    [dy, bounds.north - start[1]],
  ];

  for (const [p, q] of checks) {
    if (p === 0) {
      if (q < 0) {
        return null;
      }
      continue;
    }

    const r = q / p;
    if (p < 0) {
      t0 = Math.max(t0, r);
    } else {
      t1 = Math.min(t1, r);
    }

    if (t0 > t1) {
      return null;
    }
  }

  return [
    roundPoint([start[0] + t0 * dx, start[1] + t0 * dy]),
    roundPoint([start[0] + t1 * dx, start[1] + t1 * dy]),
  ];
}

function roundPoint(point) {
  return [
    Number(point[0].toFixed(coordinatePrecision)),
    Number(point[1].toFixed(coordinatePrecision)),
  ];
}

function dedupeConsecutivePoints(points) {
  return points.filter((point, index) => index === 0 || !pointsEqual(point, points[index - 1]));
}

function simplifyLine(line) {
  const simplified = simplifyTolerance > 0 ? douglasPeucker(line, simplifyTolerance) : line;
  return simplified.map(roundPoint);
}

function douglasPeucker(points, tolerance) {
  if (points.length <= 2) {
    return points;
  }

  let maxDistance = 0;
  let index = 0;
  const start = points[0];
  const end = points.at(-1);

  for (let i = 1; i < points.length - 1; i += 1) {
    const distance = perpendicularDistance(points[i], start, end);
    if (distance > maxDistance) {
      maxDistance = distance;
      index = i;
    }
  }

  if (maxDistance <= tolerance) {
    return [start, end];
  }

  return [
    ...douglasPeucker(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...douglasPeucker(points.slice(index), tolerance),
  ];
}

function perpendicularDistance(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) {
    return Math.hypot(point[0] - start[0], point[1] - start[1]);
  }

  const numerator = Math.abs(dy * point[0] - dx * point[1] + end[0] * start[1] - end[1] * start[0]);
  return numerator / Math.hypot(dx, dy);
}

function pointsEqual(a, b) {
  return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}
