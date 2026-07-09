const fs = require("fs");
const path = require("path");

const DEFAULT_SOURCE_PATH = path.join(
  "tmp",
  "EQ-app-2026-analysis",
  "src",
  "map",
  "data",
  "japanGeoJson.js",
);
const OUTPUT_LAND_PATH = path.join("web", "data", "eq_app_japan_land.geojson");
const COORDINATE_PRECISION = 5;
const ROUND_FACTOR = 10 ** COORDINATE_PRECISION;

const sourcePath = process.argv[2] || process.env.EQ_APP_JAPAN_GEOJSON_JS || DEFAULT_SOURCE_PATH;

function roundNumber(value) {
  const rounded = Math.round(Number(value) * ROUND_FACTOR) / ROUND_FACTOR;
  return Object.is(rounded, -0) ? 0 : rounded;
}

function samePoint(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

function pointKey(point) {
  return `${point[0]},${point[1]}`;
}

function roundRing(ring) {
  const rounded = [];
  for (const point of ring) {
    const nextPoint = [roundNumber(point[0]), roundNumber(point[1])];
    const previousPoint = rounded[rounded.length - 1];
    if (!previousPoint || !samePoint(previousPoint, nextPoint)) {
      rounded.push(nextPoint);
    }
  }

  if (rounded.length < 3) {
    return null;
  }

  if (!samePoint(rounded[0], rounded[rounded.length - 1])) {
    rounded.push([...rounded[0]]);
  }

  return rounded.length >= 4 ? rounded : null;
}

function roundPolygon(polygon) {
  return polygon.map(roundRing).filter(Boolean);
}

function roundGeometry(geometry) {
  if (!geometry) {
    return null;
  }

  if (geometry.type === "Polygon") {
    const polygon = roundPolygon(geometry.coordinates);
    return polygon.length ? { type: "Polygon", coordinates: polygon } : null;
  }

  if (geometry.type === "MultiPolygon") {
    const polygons = geometry.coordinates.map(roundPolygon).filter((polygon) => polygon.length);
    return polygons.length ? { type: "MultiPolygon", coordinates: polygons } : null;
  }

  return null;
}

function extractExportedJson(source) {
  const trimmed = source.trim();
  const match = trimmed.match(/^export\s+const\s+\w+\s*=\s*([\s\S]*?);?$/);
  if (!match) {
    throw new Error(`Unsupported EQ-app Japan GeoJSON module format: ${sourcePath}`);
  }

  return JSON.parse(match[1]);
}

function normalizeFeatureCollection(sourceCollection) {
  const features = [];
  for (const [index, feature] of (sourceCollection.features ?? []).entries()) {
    const geometry = roundGeometry(feature.geometry);
    if (!geometry) {
      continue;
    }

    features.push({
      type: "Feature",
      properties: {
        id: feature.properties?.id ?? index,
      },
      geometry,
    });
  }

  return {
    type: "FeatureCollection",
    name: "eq_app_japan_land",
    source: "https://github.com/wvdtc7bjwn-bit/EQ-app-2026 src/map/data/japanGeoJson.js",
    coordinatePrecision: COORDINATE_PRECISION,
    features,
  };
}

function visitRings(geometry, callback) {
  if (geometry.type === "Polygon") {
    geometry.coordinates.forEach(callback);
    return;
  }

  if (geometry.type === "MultiPolygon") {
    geometry.coordinates.forEach((polygon) => polygon.forEach(callback));
  }
}

function collectSegments(featureCollection) {
  const segmentsByKey = new Map();

  for (const feature of featureCollection.features) {
    visitRings(feature.geometry, (ring) => {
      for (let index = 0; index < ring.length - 1; index += 1) {
        const a = ring[index];
        const b = ring[index + 1];
        if (samePoint(a, b)) {
          continue;
        }

        const aKey = pointKey(a);
        const bKey = pointKey(b);
        const segmentKey = aKey < bKey ? `${aKey}|${bKey}` : `${bKey}|${aKey}`;
        const segment = segmentsByKey.get(segmentKey);
        if (segment) {
          segment.count += 1;
        } else {
          segmentsByKey.set(segmentKey, {
            a,
            b,
            aKey,
            bKey,
            count: 1,
            used: false,
          });
        }
      }
    });
  }

  return segmentsByKey;
}

function addAdjacency(adjacency, key, segmentIndex) {
  const entries = adjacency.get(key);
  if (entries) {
    entries.push(segmentIndex);
  } else {
    adjacency.set(key, [segmentIndex]);
  }
}

function buildOutlineLines(featureCollection) {
  const exteriorSegments = Array.from(collectSegments(featureCollection).values())
    .filter((segment) => segment.count === 1);
  const adjacency = new Map();

  exteriorSegments.forEach((segment, index) => {
    addAdjacency(adjacency, segment.aKey, index);
    addAdjacency(adjacency, segment.bKey, index);
  });

  function takeNextSegment(pointKeyValue) {
    const entries = adjacency.get(pointKeyValue) ?? [];
    return entries.find((segmentIndex) => !exteriorSegments[segmentIndex].used);
  }

  function appendFrom(line, currentKey) {
    let key = currentKey;
    while (true) {
      const nextIndex = takeNextSegment(key);
      if (nextIndex === undefined) {
        return key;
      }

      const segment = exteriorSegments[nextIndex];
      segment.used = true;
      if (segment.aKey === key) {
        line.push(segment.b);
        key = segment.bKey;
      } else {
        line.push(segment.a);
        key = segment.aKey;
      }
    }
  }

  function prependFrom(line, currentKey) {
    let key = currentKey;
    while (true) {
      const nextIndex = takeNextSegment(key);
      if (nextIndex === undefined) {
        return key;
      }

      const segment = exteriorSegments[nextIndex];
      segment.used = true;
      if (segment.aKey === key) {
        line.unshift(segment.b);
        key = segment.bKey;
      } else {
        line.unshift(segment.a);
        key = segment.aKey;
      }
    }
  }

  const lines = [];
  for (const segment of exteriorSegments) {
    if (segment.used) {
      continue;
    }

    segment.used = true;
    const line = [segment.a, segment.b];
    appendFrom(line, segment.bKey);
    prependFrom(line, segment.aKey);
    if (line.length >= 2) {
      lines.push(line);
    }
  }

  return lines;
}

function countCoordinatesInGeometry(geometry) {
  let count = 0;
  visitRings(geometry, (ring) => {
    count += ring.length;
  });
  return count;
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(
      [
        `EQ-app Japan GeoJSON source not found: ${sourcePath}`,
        "Clone https://github.com/wvdtc7bjwn-bit/EQ-app-2026 to tmp/EQ-app-2026-analysis",
        "or pass the source module path as an argument.",
      ].join("\n"),
    );
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  const sourceCollection = extractExportedJson(source);
  const landCollection = normalizeFeatureCollection(sourceCollection);
  fs.writeFileSync(OUTPUT_LAND_PATH, `${JSON.stringify(landCollection)}\n`);

  const coordinateCount = landCollection.features
    .reduce((sum, feature) => sum + countCoordinatesInGeometry(feature.geometry), 0);

  console.log(`Imported ${landCollection.features.length} EQ-app Japan land features.`);
  console.log(`Land coordinates: ${coordinateCount.toLocaleString()}`);
  console.log(`Wrote ${OUTPUT_LAND_PATH}`);
}

main();
