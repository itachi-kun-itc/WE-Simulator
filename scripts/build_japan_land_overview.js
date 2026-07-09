const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputPath = process.env.JAPAN_LAND_OVERVIEW_INPUT_PATH
  ? path.resolve(root, process.env.JAPAN_LAND_OVERVIEW_INPUT_PATH)
  : path.join(root, "web", "data", "municipalities.geojson");
const outputPath = process.env.JAPAN_LAND_OVERVIEW_OUTPUT_PATH
  ? path.resolve(root, process.env.JAPAN_LAND_OVERVIEW_OUTPUT_PATH)
  : path.join(root, "web", "data", "japan_land_overview.geojson");
const coordinatePrecision = Number(process.env.JAPAN_LAND_OVERVIEW_COORDINATE_PRECISION || 4);
const simplifyTolerance = Number(process.env.JAPAN_LAND_OVERVIEW_SIMPLIFY_TOLERANCE || 0.0014);
const minRingArea = Number(process.env.JAPAN_LAND_OVERVIEW_MIN_RING_AREA || 0.00000008);

const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const features = (source.features ?? []).flatMap(simplifyFeature);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  JSON.stringify({
    type: "FeatureCollection",
    name: "Japan land overview",
    source: path.relative(root, inputPath),
    simplifyTolerance,
    minRingArea,
    features,
  }),
);

console.log(`Wrote ${features.length} overview features to ${path.relative(root, outputPath)}`);

function simplifyFeature(feature) {
  const geometry = feature.geometry;
  if (!geometry?.coordinates) {
    return [];
  }

  const coordinates = simplifyGeometry(geometry);
  if (coordinates.length === 0) {
    return [];
  }

  return [{
    type: "Feature",
    properties: {
      code: feature.properties?.code,
      prefecture: feature.properties?.prefecture,
      municipality: feature.properties?.municipality,
      name: feature.properties?.name,
    },
    geometry: {
      type: "MultiPolygon",
      coordinates,
    },
  }];
}

function simplifyGeometry(geometry) {
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.flatMap(simplifyPolygon);
  }

  if (geometry.type === "Polygon") {
    return simplifyPolygon(geometry.coordinates);
  }

  return [];
}

function simplifyPolygon(polygon) {
  const outerRing = polygon?.[0];
  if (!Array.isArray(outerRing) || outerRing.length < 4) {
    return [];
  }

  const ring = simplifyRing(outerRing);
  if (ring.length < 4 || Math.abs(ringArea(ring)) < minRingArea) {
    return [];
  }

  return [[ring]];
}

function simplifyRing(ring) {
  const openRing = pointsEqual(ring[0], ring.at(-1)) ? ring.slice(0, -1) : ring;
  const simplified = simplifyTolerance > 0 ? douglasPeucker(openRing, simplifyTolerance) : openRing;
  const rounded = dedupeConsecutivePoints(simplified.map(roundPoint));
  if (rounded.length < 3) {
    return [];
  }

  if (!pointsEqual(rounded[0], rounded.at(-1))) {
    rounded.push([...rounded[0]]);
  }

  return rounded;
}

function roundPoint(point) {
  return [
    Number(Number(point[0]).toFixed(coordinatePrecision)),
    Number(Number(point[1]).toFixed(coordinatePrecision)),
  ];
}

function dedupeConsecutivePoints(points) {
  return points.filter((point, index) => index === 0 || !pointsEqual(point, points[index - 1]));
}

function douglasPeucker(points, tolerance) {
  if (points.length <= 2) {
    return points;
  }

  let maxDistance = 0;
  let splitIndex = 0;
  const start = points[0];
  const end = points.at(-1);

  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = perpendicularDistance(points[index], start, end);
    if (distance > maxDistance) {
      maxDistance = distance;
      splitIndex = index;
    }
  }

  if (maxDistance <= tolerance) {
    return [start, end];
  }

  return [
    ...douglasPeucker(points.slice(0, splitIndex + 1), tolerance).slice(0, -1),
    ...douglasPeucker(points.slice(splitIndex), tolerance),
  ];
}

function perpendicularDistance(point, start, end) {
  const deltaX = end[0] - start[0];
  const deltaY = end[1] - start[1];
  if (deltaX === 0 && deltaY === 0) {
    return Math.hypot(point[0] - start[0], point[1] - start[1]);
  }

  const numerator = Math.abs(deltaY * point[0] - deltaX * point[1] + end[0] * start[1] - end[1] * start[0]);
  return numerator / Math.hypot(deltaX, deltaY);
}

function ringArea(ring) {
  let sum = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}

function pointsEqual(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a[0] === b[0] && a[1] === b[1];
}
