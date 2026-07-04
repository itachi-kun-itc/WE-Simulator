const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputDir = process.env.NORTHERN_ISLANDS_INPUT_DIR
  ? path.resolve(root, process.env.NORTHERN_ISLANDS_INPUT_DIR)
  : path.join(root, "data", "raw", "ne_10m_admin_0_countries_jpn");
const outputPath = path.join(root, "web", "data", "northern_islands_land.geojson");
const coordinatePrecision = Number(process.env.NORTHERN_ISLANDS_COORDINATE_PRECISION || 5);
const clipBounds = {
  west: Number(process.env.NORTHERN_ISLANDS_WEST || 145.15),
  south: Number(process.env.NORTHERN_ISLANDS_SOUTH || 43.1),
  east: Number(process.env.NORTHERN_ISLANDS_EAST || 149.7),
  north: Number(process.env.NORTHERN_ISLANDS_NORTH || 46.35),
};

const shpPath = findFile(".shp");
const dbfPath = findFile(".dbf");
const records = readDbf(dbfPath);
const features = [];

readShp(shpPath, (recordIndex, rings) => {
  const record = records[recordIndex];
  const polygons = buildPolygons(rings);

  if (polygons.length === 0) {
    return;
  }

  features.push({
    type: "Feature",
    properties: {
      name: "北方領土",
      nameEn: "Northern Territories",
      sourceName: record.NAME_JA || record.NAME || record.ADMIN,
      sourceNameEn: record.NAME_EN || record.NAME || record.ADMIN,
      isoA3: record.ADM0_A3,
      source: path.relative(root, inputDir),
      mapTreatment: "northern-island-display-only",
    },
    geometry: {
      type: "MultiPolygon",
      coordinates: polygons,
    },
  });
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  `${JSON.stringify({
    type: "FeatureCollection",
    name: "Northern islands high-resolution land display",
    source: path.relative(root, inputDir),
    version: readVersion(),
    bounds: clipBounds,
    features,
  })}\n`,
  "utf8",
);

console.log(`Wrote ${features.length} northern islands features to ${path.relative(root, outputPath)}`);

function findFile(extension) {
  const fileName = fs.readdirSync(inputDir).find((name) => name.endsWith(extension));
  if (!fileName) {
    throw new Error(`No ${extension} file found in ${inputDir}`);
  }

  return path.join(inputDir, fileName);
}

function readVersion() {
  const versionPath = fs.readdirSync(inputDir).find((name) => name.endsWith(".VERSION.txt"));
  return versionPath ? fs.readFileSync(path.join(inputDir, versionPath), "utf8").trim() : "";
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

    if (shapeType !== 5) {
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

    if (!boxesIntersect(recordBox, clipBounds)) {
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
    const rings = partOffsets
      .map((start, index) => {
        const end = partOffsets[index + 1] ?? points.length;
        return closeAndRoundRing(points.slice(start, end));
      })
      .filter((ring) => ring.length >= 4 && ringCenterInBounds(ring, clipBounds));

    onRecord(recordIndex, rings);
    offset += 8 + contentLength;
    recordIndex += 1;
  }
}

function boxesIntersect(a, b) {
  return a.west <= b.east && a.east >= b.west && a.south <= b.north && a.north >= b.south;
}

function closeAndRoundRing(ring) {
  const openRing = pointsEqual(ring[0], ring.at(-1)) ? ring.slice(0, -1) : ring;
  const rounded = openRing.map(([longitude, latitude]) => [
    Number(longitude.toFixed(coordinatePrecision)),
    Number(latitude.toFixed(coordinatePrecision)),
  ]);

  if (!pointsEqual(rounded[0], rounded.at(-1))) {
    rounded.push([...rounded[0]]);
  }

  return rounded;
}

function buildPolygons(rings) {
  return rings.map((ring) => [ensureClockwise(ring)]);
}

function ensureClockwise(ring) {
  return ringArea(ring) <= 0 ? ring : [...ring].reverse();
}

function ringCenterInBounds(ring, bounds) {
  const center = ringCentroid(ring);
  return center[0] >= bounds.west && center[0] <= bounds.east && center[1] >= bounds.south && center[1] <= bounds.north;
}

function ringCentroid(ring) {
  const total = ring.reduce(
    (sum, point) => {
      sum.longitude += point[0];
      sum.latitude += point[1];
      sum.count += 1;
      return sum;
    },
    { longitude: 0, latitude: 0, count: 0 },
  );

  return [total.longitude / total.count, total.latitude / total.count];
}

function ringArea(ring) {
  return ring.reduce((sum, point, index) => {
    const next = ring[(index + 1) % ring.length];
    return sum + point[0] * next[1] - next[0] * point[1];
  }, 0) / 2;
}

function pointsEqual(a, b) {
  return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}
