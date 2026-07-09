const fs = require("node:fs");
const path = require("node:path");

const args = parseArgs(process.argv.slice(2));
const inputPath = args.input || args.i;
const outputPath = args.output || args.o || inputPath;
const tolerance = Number(args.tolerance ?? args.t ?? 0.001);
const coordinatePrecision = Number(args.precision ?? args.p ?? 5);
const minRingArea = Number(args.minRingArea ?? 0);
const minLinePoints = Number(args.minLinePoints ?? 2);
const polygonizeClosedLines = Boolean(args.polygonizeClosedLines);

if (!inputPath) {
  throw new Error("Usage: node scripts/simplify_map_geojson.js --input <file> [--output <file>] --tolerance <degrees>");
}

const roundFactor = 10 ** coordinatePrecision;
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const originalStats = getCollectionStats(input);
const output = polygonizeClosedLines
  ? polygonizeClosedLineCollection(input)
  : simplifyCollection(input);
const nextStats = getCollectionStats(output);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output)}\n`);

console.log(`Simplified ${inputPath} -> ${outputPath}`);
console.log(`features: ${originalStats.features.toLocaleString()} -> ${nextStats.features.toLocaleString()}`);
console.log(`coordinates: ${originalStats.coordinates.toLocaleString()} -> ${nextStats.coordinates.toLocaleString()}`);
console.log(`bytes: ${fs.statSync(inputPath).size.toLocaleString()} -> ${fs.statSync(outputPath).size.toLocaleString()}`);

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) {
      continue;
    }

    const key = value.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}

function simplifyCollection(collection) {
  return {
    ...collection,
    simplified: {
      tolerance,
      coordinatePrecision,
      minRingArea,
      minLinePoints,
    },
    features: (collection.features ?? [])
      .map((feature) => {
        const geometry = simplifyGeometry(feature.geometry);
        if (!geometry) {
          return null;
        }
        return {
          ...feature,
          geometry,
        };
      })
      .filter(Boolean),
  };
}

function simplifyGeometry(geometry) {
  if (!geometry) {
    return null;
  }

  if (geometry.type === "Polygon") {
    const polygon = simplifyPolygon(geometry.coordinates);
    return polygon.length ? { type: "Polygon", coordinates: polygon } : null;
  }

  if (geometry.type === "MultiPolygon") {
    const polygons = geometry.coordinates.map(simplifyPolygon).filter((polygon) => polygon.length);
    return polygons.length ? { type: "MultiPolygon", coordinates: polygons } : null;
  }

  if (geometry.type === "LineString") {
    const line = simplifyLine(geometry.coordinates);
    return line.length >= minLinePoints ? { type: "LineString", coordinates: line } : null;
  }

  if (geometry.type === "MultiLineString") {
    const lines = geometry.coordinates.map(simplifyLine).filter((line) => line.length >= minLinePoints);
    return lines.length ? { type: "MultiLineString", coordinates: lines } : null;
  }

  return geometry;
}

function simplifyPolygon(polygon) {
  const rings = polygon
    .map(simplifyRing)
    .filter((ring) => ring.length >= 4 && Math.abs(ringArea(ring)) >= minRingArea);
  if (rings.length === 0) {
    return [];
  }
  return rings;
}

function simplifyRing(ring) {
  if (!Array.isArray(ring) || ring.length < 4) {
    return [];
  }

  const openRing = pointsEqual(ring[0], ring.at(-1)) ? ring.slice(0, -1) : ring;
  const simplified = tolerance > 0 ? douglasPeucker(openRing, tolerance) : openRing;
  const rounded = dedupeConsecutivePoints(simplified.map(roundPoint));
  if (rounded.length < 3) {
    return [];
  }
  if (!pointsEqual(rounded[0], rounded.at(-1))) {
    rounded.push([...rounded[0]]);
  }
  return rounded;
}

function simplifyLine(line) {
  if (!Array.isArray(line) || line.length < minLinePoints) {
    return [];
  }

  const closed = pointsEqual(line[0], line.at(-1));
  const sourceLine = closed ? line.slice(0, -1) : line;
  const simplified = tolerance > 0 ? douglasPeucker(sourceLine, tolerance) : sourceLine;
  const rounded = dedupeConsecutivePoints(simplified.map(roundPoint));
  if (closed && rounded.length >= 2 && !pointsEqual(rounded[0], rounded.at(-1))) {
    rounded.push([...rounded[0]]);
  }
  return rounded;
}

function polygonizeClosedLineCollection(collection) {
  const polygons = [];
  for (const feature of collection.features ?? []) {
    const lines = getGeometryLines(feature.geometry);
    for (const line of lines) {
      const simplified = simplifyLine(line);
      if (
        simplified.length >= 4 &&
        pointsEqual(simplified[0], simplified.at(-1)) &&
        Math.abs(ringArea(simplified)) >= minRingArea
      ) {
        polygons.push({
          type: "Feature",
          properties: {
            id: polygons.length,
            source: feature.properties?.source || feature.properties?.kind || collection.name || "",
          },
          geometry: {
            type: "Polygon",
            coordinates: [ensureClockwise(simplified)],
          },
        });
      }
    }
  }

  return {
    type: "FeatureCollection",
    name: `${collection.name || "linework"} polygons`,
    source: collection.source || "",
    simplified: {
      tolerance,
      coordinatePrecision,
      minRingArea,
      polygonizeClosedLines: true,
    },
    features: polygons,
  };
}

function getGeometryLines(geometry) {
  if (!geometry) {
    return [];
  }
  if (geometry.type === "LineString") {
    return [geometry.coordinates];
  }
  if (geometry.type === "MultiLineString") {
    return geometry.coordinates;
  }
  return [];
}

function getCollectionStats(collection) {
  let coordinates = 0;
  for (const feature of collection.features ?? []) {
    coordinates += countCoordinates(feature.geometry?.coordinates);
  }
  return {
    features: collection.features?.length ?? 0,
    coordinates,
  };
}

function countCoordinates(value) {
  if (!Array.isArray(value)) {
    return 0;
  }
  if (typeof value[0] === "number") {
    return 1;
  }
  return value.reduce((sum, item) => sum + countCoordinates(item), 0);
}

function roundPoint(point) {
  return [
    roundNumber(point[0]),
    roundNumber(point[1]),
  ];
}

function roundNumber(value) {
  const rounded = Math.round(Number(value) * roundFactor) / roundFactor;
  return Object.is(rounded, -0) ? 0 : rounded;
}

function dedupeConsecutivePoints(points) {
  return points.filter((point, index) => index === 0 || !pointsEqual(point, points[index - 1]));
}

function douglasPeucker(points, epsilon) {
  if (points.length <= 3) {
    return points;
  }

  let maxDistance = 0;
  let maxIndex = 0;
  const start = points[0];
  const end = points.at(-1);

  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = perpendicularDistance(points[index], start, end);
    if (distance > maxDistance) {
      maxDistance = distance;
      maxIndex = index;
    }
  }

  if (maxDistance <= epsilon) {
    return [start, end];
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

function ensureClockwise(ring) {
  return ringArea(ring) <= 0 ? ring : [...ring].reverse();
}

function pointsEqual(a, b) {
  return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}
