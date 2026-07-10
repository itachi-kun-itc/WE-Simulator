const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputPath = process.env.MUNICIPALITY_CHUNKS_INPUT_PATH
  ? path.resolve(root, process.env.MUNICIPALITY_CHUNKS_INPUT_PATH)
  : path.join(root, "data", "processed", "municipalities.geojson");
const outputDir = process.env.MUNICIPALITY_CHUNKS_OUTPUT_DIR
  ? path.resolve(root, process.env.MUNICIPALITY_CHUNKS_OUTPUT_DIR)
  : path.join(root, "web", "data", "municipality_chunks");

const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const chunks = new Map();

for (const feature of source.features ?? []) {
  const properties = feature.properties ?? {};
  const id = String(properties.prefectureCode || properties.prefecture || "unknown").padStart(2, "0");
  if (!chunks.has(id)) {
    chunks.set(id, {
      id,
      prefectureCode: properties.prefectureCode || "",
      prefecture: properties.prefecture || "",
      bounds: createEmptyBounds(),
      features: [],
    });
  }

  const chunk = chunks.get(id);
  chunk.features.push({
    type: "Feature",
    properties: compactMunicipalityProperties(properties),
    geometry: feature.geometry,
  });
  expandBounds(chunk.bounds, geometryBounds(feature.geometry));
}

fs.mkdirSync(outputDir, { recursive: true });

const index = {
  type: "municipality-prefecture-chunks",
  source: path.relative(root, inputPath).replace(/\\/g, "/"),
  chunks: [...chunks.values()]
    .sort((a, b) => a.id.localeCompare(b.id, "ja"))
    .map((chunk) => {
      const file = `${chunk.id}.geojson`;
      const outputPath = path.join(outputDir, file);
      const chunkGeoJson = {
        type: "FeatureCollection",
        name: `${chunk.prefecture || chunk.id} municipalities`,
        source: path.relative(root, inputPath).replace(/\\/g, "/"),
        prefectureCode: chunk.prefectureCode,
        prefecture: chunk.prefecture,
        bounds: roundBounds(chunk.bounds),
        features: chunk.features,
      };

      fs.writeFileSync(outputPath, JSON.stringify(chunkGeoJson));

      return {
        id: chunk.id,
        prefectureCode: chunk.prefectureCode,
        prefecture: chunk.prefecture,
        file,
        bounds: roundBounds(chunk.bounds),
        featureCount: chunk.features.length,
      };
    }),
};

fs.writeFileSync(path.join(outputDir, "index.json"), JSON.stringify(index));
console.log(`Wrote ${index.chunks.length} municipality chunks to ${path.relative(root, outputDir)}`);

function createEmptyBounds() {
  return {
    west: Infinity,
    south: Infinity,
    east: -Infinity,
    north: -Infinity,
  };
}

function expandBounds(target, next) {
  if (!next) {
    return;
  }

  target.west = Math.min(target.west, next.west);
  target.south = Math.min(target.south, next.south);
  target.east = Math.max(target.east, next.east);
  target.north = Math.max(target.north, next.north);
}

function geometryBounds(geometry) {
  if (!geometry?.coordinates) {
    return null;
  }

  const bounds = createEmptyBounds();
  visitCoordinates(geometry.coordinates, (coordinate) => {
    const [longitude, latitude] = coordinate;
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      return;
    }

    bounds.west = Math.min(bounds.west, longitude);
    bounds.south = Math.min(bounds.south, latitude);
    bounds.east = Math.max(bounds.east, longitude);
    bounds.north = Math.max(bounds.north, latitude);
  });

  return Number.isFinite(bounds.west) ? bounds : null;
}

function visitCoordinates(value, callback) {
  if (!Array.isArray(value)) {
    return;
  }

  if (typeof value[0] === "number" && typeof value[1] === "number") {
    callback(value);
    return;
  }

  for (const child of value) {
    visitCoordinates(child, callback);
  }
}

function roundBounds(bounds) {
  return [
    roundCoordinate(bounds.west),
    roundCoordinate(bounds.south),
    roundCoordinate(bounds.east),
    roundCoordinate(bounds.north),
  ];
}

function roundCoordinate(value) {
  return Number(value.toFixed(5));
}

function compactMunicipalityProperties(properties) {
  return {
    code: properties.code,
    prefecture: properties.prefecture,
    municipality: properties.municipality,
    name: properties.name,
  };
}
