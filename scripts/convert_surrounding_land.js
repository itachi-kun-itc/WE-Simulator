const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputDir = process.env.SURROUNDING_LAND_INPUT_DIR
  ? path.resolve(root, process.env.SURROUNDING_LAND_INPUT_DIR)
  : path.join(root, "data", "raw", "ne_10m_admin_0_countries_jpn");
const outputPath = process.env.SURROUNDING_LAND_OUTPUT_PATH
  ? path.resolve(root, process.env.SURROUNDING_LAND_OUTPUT_PATH)
  : path.join(root, "web", "data", "surrounding_land.geojson");
const sourceName = process.env.SURROUNDING_LAND_SOURCE_NAME || path.relative(root, inputDir);
const shapeBasename = process.env.SURROUNDING_LAND_SHAPE_BASENAME || "";
const coordinatePrecision = Number(process.env.SURROUNDING_LAND_COORDINATE_PRECISION || 5);
const simplifyTolerance = Number(process.env.SURROUNDING_LAND_SIMPLIFY_TOLERANCE || 0.002);
const minRingArea = Number(process.env.SURROUNDING_LAND_MIN_RING_AREA || 0.00001);
const buildWorldMap = process.env.SURROUNDING_LAND_WORLD === "1";
const clipBounds = {
  west: Number(process.env.SURROUNDING_LAND_WEST || 85),
  south: Number(process.env.SURROUNDING_LAND_SOUTH || -25),
  east: Number(process.env.SURROUNDING_LAND_EAST || 180),
  north: Number(process.env.SURROUNDING_LAND_NORTH || 89),
};
const clipBoundsList = splitClipBounds(clipBounds);

const shpPath = findFile(".shp");
const dbfPath = findFile(".dbf");
const records = readDbf(dbfPath);
const features = [];

readShp(shpPath, (recordIndex, rings) => {
  const record = records[recordIndex] ?? {};
  const polygons = buildPolygons(rings);

  if (polygons.length === 0) {
    return;
  }

  features.push({
    type: "Feature",
    properties: {
      name: record.NAME_JA || record.NAME || record.ADMIN || "世界の陸地",
      nameEn: record.NAME_EN || record.NAME || record.ADMIN || "World land",
      isoA3: record.ADM0_A3 || "",
      source: sourceName,
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
  JSON.stringify({
    type: "FeatureCollection",
    name: buildWorldMap ? "Natural Earth 10m world land" : "Natural Earth 10m surrounding land near Japan",
    source: sourceName,
    version: readVersion(),
    bounds: clipBounds,
    boundsParts: clipBoundsList,
    features,
  }),
);

console.log(`Wrote ${features.length} surrounding land features to ${path.relative(root, outputPath)}`);

function findFile(extension) {
  const fileName = fs
    .readdirSync(inputDir)
    .find((name) => name.endsWith(extension) && (!shapeBasename || name === `${shapeBasename}${extension}`));
  if (!fileName) {
    throw new Error(`No ${shapeBasename || ""}${extension} file found in ${inputDir}`);
  }

  return path.join(inputDir, fileName);
}

function readVersion() {
  const versionPath = fs
    .readdirSync(inputDir)
    .find((name) => name.endsWith(".VERSION.txt") && (!shapeBasename || name === `${shapeBasename}.VERSION.txt`));
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
      record[field.name] = cleanDbfText(decoder.decode(raw));
    }

    return record;
  });
}

function cleanDbfText(value) {
  return value.replace(/\0/g, "").trim();
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
    const rings = partOffsets
      .flatMap((start, index) => {
        const end = partOffsets[index + 1] ?? points.length;
        return clipRingToBoundsList(simplifyRing(points.slice(start, end)), clipBoundsList);
      })
      .filter((ring) => ring.length >= 4);

    onRecord(recordIndex, rings);
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

function clipRingToBoundsList(ring, boundsList) {
  return boundsList
    .map((bounds) => clipRingToBounds(ring, bounds))
    .filter((clippedRing) => clippedRing.length >= 4 && Math.abs(ringArea(clippedRing)) >= minRingArea);
}

function clipRingToBounds(ring, bounds) {
  const openRing = pointsEqual(ring[0], ring.at(-1)) ? ring.slice(0, -1) : ring;
  const clipped = [
    {
      inside: ([longitude]) => longitude >= bounds.west,
      intersect: (start, end) => intersectVertical(start, end, bounds.west),
    },
    {
      inside: ([longitude]) => longitude <= bounds.east,
      intersect: (start, end) => intersectVertical(start, end, bounds.east),
    },
    {
      inside: ([, latitude]) => latitude >= bounds.south,
      intersect: (start, end) => intersectHorizontal(start, end, bounds.south),
    },
    {
      inside: ([, latitude]) => latitude <= bounds.north,
      intersect: (start, end) => intersectHorizontal(start, end, bounds.north),
    },
  ].reduce((points, edge) => clipPolygonEdge(points, edge), openRing);

  if (clipped.length < 3) {
    return [];
  }

  const rounded = dedupeConsecutivePoints(clipped.map(roundPoint));
  if (rounded.length < 3) {
    return [];
  }

  if (!pointsEqual(rounded[0], rounded.at(-1))) {
    rounded.push([...rounded[0]]);
  }

  return rounded;
}

function clipPolygonEdge(points, edge) {
  if (points.length === 0) {
    return [];
  }

  const output = [];
  let previous = points.at(-1);
  let previousInside = edge.inside(previous);

  for (const current of points) {
    const currentInside = edge.inside(current);

    if (currentInside) {
      if (!previousInside) {
        output.push(edge.intersect(previous, current));
      }
      output.push(current);
    } else if (previousInside) {
      output.push(edge.intersect(previous, current));
    }

    previous = current;
    previousInside = currentInside;
  }

  return output;
}

function intersectVertical(start, end, longitude) {
  const ratio = (longitude - start[0]) / (end[0] - start[0] || 1);
  return [longitude, start[1] + ratio * (end[1] - start[1])];
}

function intersectHorizontal(start, end, latitude) {
  const ratio = (latitude - start[1]) / (end[1] - start[1] || 1);
  return [start[0] + ratio * (end[0] - start[0]), latitude];
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

function simplifyRing(ring) {
  const openRing = pointsEqual(ring[0], ring.at(-1)) ? ring.slice(0, -1) : ring;
  const simplified = simplifyTolerance > 0 ? douglasPeucker(openRing, simplifyTolerance) : openRing;
  const rounded = simplified.map(roundPoint);

  if (!pointsEqual(rounded[0], rounded.at(-1))) {
    rounded.push([...rounded[0]]);
  }

  return rounded;
}

function buildPolygons(rings) {
  const keptRings = rings.filter((ring) => Math.abs(ringArea(ring)) >= minRingArea);
  const outers = [];
  const holes = [];

  for (const ring of keptRings) {
    const item = { ring, area: ringArea(ring) };

    if (item.area < 0) {
      outers.push(item);
    } else {
      holes.push(item);
    }
  }

  if (outers.length === 0) {
    return keptRings.map((ring) => [ensureClockwise(ring)]);
  }

  const polygons = outers
    .sort((a, b) => Math.abs(b.area) - Math.abs(a.area))
    .map((outer) => [ensureClockwise(outer.ring)]);

  for (const hole of holes) {
    const point = hole.ring[0];
    const containerIndex = outers.findIndex((outer) => pointInRing(point, outer.ring));

    if (containerIndex >= 0) {
      polygons[containerIndex].push(ensureCounterClockwise(hole.ring));
    }
  }

  return polygons;
}

function ensureClockwise(ring) {
  return ringArea(ring) <= 0 ? ring : [...ring].reverse();
}

function ensureCounterClockwise(ring) {
  return ringArea(ring) >= 0 ? ring : [...ring].reverse();
}

function pointInRing(point, ring) {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersects =
      yi > point[1] !== yj > point[1] &&
      point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
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
