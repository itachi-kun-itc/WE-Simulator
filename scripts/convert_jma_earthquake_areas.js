const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputDir = path.join(root, "data", "raw", "jma_earthquake_areas");
const outputPath = path.join(root, "web", "data", "jma_earthquake_areas.geojson");
const decoder = new TextDecoder("utf-8");
const tolerance = Number(process.env.SIMPLIFY_TOLERANCE || 0.015);
const minArea = Number(process.env.MIN_RING_AREA || 0.00008);

const shpPath = findFile(".shp");
const dbfPath = findFile(".dbf");
const properties = readDbf(dbfPath);
const features = readShp(shpPath).map((geometry, index) => ({
  type: "Feature",
  properties: {
    ...properties[index],
    source: "jma_gis_area_information_prefecture_earthquake",
  },
  geometry,
}));

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  JSON.stringify(
    {
      type: "FeatureCollection",
      name: "JMA earthquake information prefecture areas",
      source:
        "https://www.data.jma.go.jp/developer/gis/20190125_AreaInformationPrefectureEarthquake_GIS.zip",
      features,
    },
    null,
    0,
  ),
);

console.log(`Wrote ${features.length} features to ${path.relative(root, outputPath)}`);

function findFile(extension) {
  const fileName = fs.readdirSync(inputDir).find((name) => name.endsWith(extension));
  if (!fileName) {
    throw new Error(`No ${extension} file found in ${inputDir}`);
  }
  return path.join(inputDir, fileName);
}

function readDbf(filePath) {
  const buffer = fs.readFileSync(filePath);
  const recordCount = buffer.readUInt32LE(4);
  const headerLength = buffer.readUInt16LE(8);
  const recordLength = buffer.readUInt16LE(10);
  const fields = [];

  for (let offset = 32; buffer[offset] !== 0x0d; offset += 32) {
    fields.push({
      name: buffer.subarray(offset, offset + 11).toString("ascii").replace(/\0/g, ""),
      type: buffer.toString("ascii", offset + 11, offset + 12),
      length: buffer[offset + 16],
      offset: fields.reduce((sum, field) => sum + field.length, 1),
    });
  }

  return Array.from({ length: recordCount }, (_, recordIndex) => {
    const start = headerLength + recordIndex * recordLength;
    const record = {};

    for (const field of fields) {
      const raw = buffer.subarray(start + field.offset, start + field.offset + field.length);
      const value = decoder.decode(raw).trim();
      record[field.name] = field.name === "code" ? value.padStart(2, "0") : value;
    }

    return record;
  });
}

function readShp(filePath) {
  const buffer = fs.readFileSync(filePath);
  const geometries = [];
  let offset = 100;

  while (offset < buffer.length) {
    const contentLength = buffer.readInt32BE(offset + 4) * 2;
    const recordStart = offset + 8;
    const shapeType = buffer.readInt32LE(recordStart);

    if (shapeType !== 5) {
      throw new Error(`Unsupported shape type: ${shapeType}`);
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

    const polygons = partOffsets
      .map((start, index) => {
        const end = partOffsets[index + 1] ?? points.length;
        return simplifyRing(points.slice(start, end));
      })
      .filter((ring) => ring.length >= 4 && Math.abs(ringArea(ring)) >= minArea)
      .map((ring) => [ring]);

    geometries.push({
      type: "MultiPolygon",
      coordinates: polygons,
    });

    offset += 8 + contentLength;
  }

  return geometries;
}

function simplifyRing(ring) {
  const openRing = pointsEqual(ring[0], ring.at(-1)) ? ring.slice(0, -1) : ring;
  const simplified = douglasPeucker(openRing, tolerance);
  const rounded = simplified.map(([longitude, latitude]) => [
    Number(longitude.toFixed(5)),
    Number(latitude.toFixed(5)),
  ]);

  if (!pointsEqual(rounded[0], rounded.at(-1))) {
    rounded.push([...rounded[0]]);
  }

  return rounded;
}

function douglasPeucker(points, epsilon) {
  if (points.length <= 3) {
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

function ringArea(ring) {
  return ring.reduce((sum, point, index) => {
    const next = ring[(index + 1) % ring.length];
    return sum + point[0] * next[1] - next[0] * point[1];
  }, 0) / 2;
}

function pointsEqual(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
