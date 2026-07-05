const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourcePath =
  "C:\\開発\\ソース\\気象・地震シミュレーション\\震央名称\\震央地名.geojson";
const outputPath = path.join(root, "web", "data", "jma_epicenter_areas.geojson");

const data = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

if (data.type !== "FeatureCollection" || !Array.isArray(data.features)) {
  throw new Error("震央地名GeoJSONはFeatureCollectionではありません。");
}

const invalidFeature = data.features.find(
  (feature) =>
    !feature?.properties?.name ||
    !feature?.properties?.id ||
    feature?.geometry?.type !== "MultiPolygon",
);

if (invalidFeature) {
  throw new Error("name/id/MultiPolygonが揃っていない震央地名フィーチャがあります。");
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(data)}\n`, "utf8");
console.log(`Wrote ${data.features.length} epicenter area polygons to ${path.relative(root, outputPath)}`);
