const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const inputRoot = path.join(root, "tmp", "plate_data");
const outputPath = path.join(root, "web", "data", "plate_boundaries.geojson");

const sourceUrl = "https://www.mri-jma.go.jp/Dep/sei/fhirose/plate/PlateData.html";
const sourceArchiveUrl = "https://www.mri-jma.go.jp/Dep/sei/fhirose/data/plate_data.tar.gz";

const lineSources = [
  {
    file: "mapdata/trench.dat",
    name: "Japan trench and trough line",
    kind: "trench",
    coordinateOrder: "latlon",
    citation:
      "Hirose Fuyuki, Plate geometry numerical data; regional citations include Kita et al. (2010), Nakajima and Hasegawa (2006), Nakajima et al. (2009), Baba et al. (2002), Nakajima and Hasegawa (2007), Hirose et al. (2008).",
  },
];

function readLineFile(source) {
  const filePath = path.join(inputRoot, source.file);
  const text = fs.readFileSync(filePath, "utf8");
  const segments = [];
  let current = [];

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    if (line.startsWith(">")) {
      pushSegment(segments, current);
      current = [];
      continue;
    }

    const values = line.split(/\s+/).map(Number);
    if (values.length < 2 || !Number.isFinite(values[0]) || !Number.isFinite(values[1])) {
      pushSegment(segments, current);
      current = [];
      continue;
    }

    const coordinate =
      source.coordinateOrder === "latlon" ? [values[1], values[0]] : [values[0], values[1]];

    if (isAroundJapanSeaArea(coordinate)) {
      current.push(coordinate.map((value) => Number(value.toFixed(4))));
    } else {
      pushSegment(segments, current);
      current = [];
    }
  }

  pushSegment(segments, current);
  return segments;
}

function pushSegment(segments, segment) {
  if (segment.length >= 2) {
    segments.push(segment);
  }
}

function isAroundJapanSeaArea([longitude, latitude]) {
  return longitude >= 122 && longitude <= 158 && latitude >= 22 && latitude <= 48.5;
}

function buildFeature(source, coordinates, index) {
  return {
    type: "Feature",
    properties: {
      name: source.name,
      kind: source.kind,
      citation: source.citation,
      source_file: source.file,
      segment: index + 1,
    },
    geometry: {
      type: "LineString",
      coordinates,
    },
  };
}

function main() {
  if (!fs.existsSync(inputRoot)) {
    throw new Error(`Missing input directory: ${inputRoot}`);
  }

  const features = [];
  for (const source of lineSources) {
    const segments = readLineFile(source);
    segments.forEach((segment, index) => features.push(buildFeature(source, segment, index)));
  }

  const geojson = {
    type: "FeatureCollection",
    name: "MRI/JMA plate boundary and shallow slab contours around Japan",
    source: sourceUrl,
    source_archive: sourceArchiveUrl,
    citation_note:
      "When using these data, cite the relevant source papers for the region as instructed by Hirose Fuyuki's PlateData page.",
    citations: [
      "Kita et al. (2010, EPSL)",
      "Nakajima and Hasegawa (2006, GRL)",
      "Nakajima et al. (2009, JGR)",
      "Baba et al. (2002, PEPI)",
      "Nakajima and Hasegawa (2007, JGR)",
      "Hirose et al. (2008, JGR)",
      "弘瀬・他 (2008, 地震)",
    ],
    features,
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(geojson)}\n`, "utf8");
  console.log(`Wrote ${features.length} plate boundary features to ${path.relative(root, outputPath)}`);
}

main();
