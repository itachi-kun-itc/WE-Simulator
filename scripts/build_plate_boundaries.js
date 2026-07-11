const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "tmp", "PB2002_boundaries.json");
const outputPath = path.join(root, "web", "data", "plate_boundaries.geojson");

const sourceUrl = "https://github.com/fraxen/tectonicplates";
const sourceDataUrl =
  "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
const sourcePaperUrl = "https://doi.org/10.1029/2001GC000252";
const japanBounds = {
  west: 120,
  east: 160,
  south: 20,
  north: 55,
};

function collectCoordinates(geometry) {
  if (!geometry) {
    return [];
  }

  if (geometry.type === "LineString") {
    return geometry.coordinates;
  }

  if (geometry.type === "MultiLineString") {
    return geometry.coordinates.flat();
  }

  if (geometry.type === "GeometryCollection") {
    return geometry.geometries.flatMap(collectCoordinates);
  }

  return [];
}

function isInJapanBounds([longitude, latitude]) {
  return (
    longitude >= japanBounds.west &&
    longitude <= japanBounds.east &&
    latitude >= japanBounds.south &&
    latitude <= japanBounds.north
  );
}

function normalizeFeature(feature, index) {
  const properties = feature.properties || {};
  const kind = properties.Type === "subduction" ? "subduction" : "plate_boundary";

  return {
    type: "Feature",
    properties: {
      id: index + 1,
      name: properties.Name || "",
      kind,
      plateA: properties.PlateA || "",
      plateB: properties.PlateB || "",
      source: properties.Source || "",
      dataset: "PB2002",
    },
    geometry: feature.geometry,
  };
}

function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(
      [
        `Missing input file: ${path.relative(root, inputPath)}`,
        `Download it from ${sourceDataUrl}`,
        "Then run this script and simplify the output with mapshaper if needed.",
      ].join("\n")
    );
  }

  const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const features = (source.features || [])
    .filter((feature) => collectCoordinates(feature.geometry).some(isInJapanBounds))
    .map(normalizeFeature);

  const geojson = {
    type: "FeatureCollection",
    name: "PB2002 plate boundaries around Japan",
    source: sourceUrl,
    source_data: sourceDataUrl,
    source_paper: sourcePaperUrl,
    bounds: japanBounds,
    features,
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(geojson)}\n`, "utf8");
  console.log(`Wrote ${features.length} plate boundary features to ${path.relative(root, outputPath)}`);
}

main();
