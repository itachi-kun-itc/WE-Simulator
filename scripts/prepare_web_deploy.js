const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "web");
const outputDir = path.join(root, "tmp", "deploy-web");
const excluded = new Set([
  "map/japan.pmtiles",
  "data/japan_municipalities_light.geojson",
  "data/jma_local_areas.geojson",
]);

fs.rmSync(outputDir, { recursive: true, force: true });
fs.cpSync(sourceDir, outputDir, {
  recursive: true,
  filter(source) {
    const relative = path.relative(sourceDir, source).replace(/\\/g, "/");
    return !excluded.has(relative) && relative !== "data/municipality_chunks" && !relative.startsWith("data/municipality_chunks/");
  },
});

console.log(`Prepared ${path.relative(root, outputDir)} without R2-hosted map data.`);
