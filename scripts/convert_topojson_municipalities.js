const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const defaultInput = path.join(root, "data", "raw", "ja_municipality_area_with_pref_boundary.topojson");
const defaultOutput = path.join(root, "web", "data", "japan_municipalities_light.geojson");

const inputPath = path.resolve(process.argv[2] || defaultInput);
const outputPath = path.resolve(process.argv[3] || defaultOutput);

function roundCoordinate(value) {
  return Number(value.toFixed(5));
}

function decodeArcs(topology) {
  const scale = topology.transform?.scale ?? [1, 1];
  const translate = topology.transform?.translate ?? [0, 0];
  return (topology.arcs ?? []).map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [
        roundCoordinate(x * scale[0] + translate[0]),
        roundCoordinate(y * scale[1] + translate[1]),
      ];
    });
  });
}

function getArc(decodedArcs, index) {
  const arcIndex = index < 0 ? -index - 1 : index;
  const arc = decodedArcs[arcIndex] ?? [];
  return index < 0 ? [...arc].reverse() : arc;
}

function coordinatesEqual(a, b) {
  return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}

function buildRing(decodedArcs, arcIndexes) {
  const ring = [];
  for (const arcIndex of arcIndexes ?? []) {
    const arc = getArc(decodedArcs, arcIndex);
    const points = ring.length > 0 && coordinatesEqual(ring[ring.length - 1], arc[0])
      ? arc.slice(1)
      : arc;
    ring.push(...points);
  }

  if (ring.length >= 3 && !coordinatesEqual(ring[0], ring[ring.length - 1])) {
    ring.push([...ring[0]]);
  }

  return ring;
}

function getGeometryCoordinates(decodedArcs, geometry) {
  if (geometry.type === "Polygon") {
    return (geometry.arcs ?? [])
      .map((ring) => buildRing(decodedArcs, ring))
      .filter((ring) => ring.length >= 4);
  }

  if (geometry.type === "MultiPolygon") {
    return (geometry.arcs ?? [])
      .map((polygon) =>
        polygon
          .map((ring) => buildRing(decodedArcs, ring))
          .filter((ring) => ring.length >= 4),
      )
      .filter((polygon) => polygon.length > 0);
  }

  return null;
}

function forEachCoordinate(coordinates, callback) {
  if (!Array.isArray(coordinates)) {
    return;
  }

  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
    callback(coordinates);
    return;
  }

  coordinates.forEach((child) => forEachCoordinate(child, callback));
}

function getBounds(coordinates) {
  const bounds = [Infinity, Infinity, -Infinity, -Infinity];
  forEachCoordinate(coordinates, ([longitude, latitude]) => {
    bounds[0] = Math.min(bounds[0], longitude);
    bounds[1] = Math.min(bounds[1], latitude);
    bounds[2] = Math.max(bounds[2], longitude);
    bounds[3] = Math.max(bounds[3], latitude);
  });

  return bounds.every(Number.isFinite) ? bounds.map(roundCoordinate) : undefined;
}

function normalizeProperties(properties = {}) {
  const code = String(properties.lg_code || properties.lg_code_5 || "");
  const prefecture = String(properties.prefecture_name || "");
  const municipality = String(properties.city_name || "");
  return {
    code,
    prefecture,
    municipality,
    name: `${prefecture}${municipality}`,
  };
}

function convertTopology(topology) {
  const layer = topology.objects?.layer ?? Object.values(topology.objects ?? {})[0];
  if (!layer?.geometries) {
    throw new Error("No GeometryCollection layer found in TopoJSON");
  }

  const decodedArcs = decodeArcs(topology);
  const features = layer.geometries.flatMap((geometry) => {
    const coordinates = getGeometryCoordinates(decodedArcs, geometry);
    if (!coordinates?.length) {
      return [];
    }

    const geojsonGeometry = {
      type: geometry.type,
      coordinates,
    };

    return [{
      type: "Feature",
      properties: normalizeProperties(geometry.properties),
      bbox: getBounds(coordinates),
      geometry: geojsonGeometry,
    }];
  });

  return {
    type: "FeatureCollection",
    features,
  };
}

const topology = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const geojson = convertTopology(topology);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(geojson)}\n`, "utf8");

const bytes = fs.statSync(outputPath).size;
console.log(`Converted ${geojson.features.length} municipality features`);
console.log(`${path.relative(root, outputPath)}: ${(bytes / 1024 / 1024).toFixed(2)} MB`);
