const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const defaultSourceDir = path.join(root, "tmp", "pmtiles-source");
const defaultWorkDir = path.join(root, "tmp", "pmtiles");
const defaultOutput = path.join(root, "web", "map", "japan.pmtiles");

const args = process.argv.slice(2);

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const value = args.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

const sourceDir = path.resolve(getArg("source", defaultSourceDir));
const workDir = path.resolve(getArg("work", defaultWorkDir));
const outputPath = path.resolve(getArg("output", defaultOutput));
const tippecanoeCommand = process.env.TIPPECANOE_CMD || "";

const layers = [
  { id: "pref", file: "pref.topo.json", minzoom: 0, maxzoom: 10 },
  { id: "eq_area", file: "eq_area.topo.json", minzoom: 3, maxzoom: 11 },
  { id: "city", file: "city.topo.json", minzoom: 5, maxzoom: 14 },
];

function roundCoordinate(value) {
  return Number(value.toFixed(6));
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

function normalizeProperties(properties = {}) {
  const normalized = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value !== undefined && value !== null) {
      normalized[key] = value;
    }
  }
  return normalized;
}

function convertTopology(topology, layer) {
  const object = topology.objects?.[layer.id] ?? Object.values(topology.objects ?? {})[0];
  if (!object?.geometries) {
    throw new Error(`${layer.file}: no GeometryCollection found`);
  }

  const decodedArcs = decodeArcs(topology);
  const features = object.geometries.flatMap((geometry) => {
    const coordinates = getGeometryCoordinates(decodedArcs, geometry);
    if (!coordinates?.length) {
      return [];
    }

    return [{
      type: "Feature",
      properties: normalizeProperties(geometry.properties),
      tippecanoe: {
        minzoom: layer.minzoom,
        maxzoom: layer.maxzoom,
      },
      geometry: {
        type: geometry.type,
        coordinates,
      },
    }];
  });

  return {
    type: "FeatureCollection",
    features,
  };
}

function commandWorks(command, args) {
  try {
    childProcess.execFileSync(command, args, {
      cwd: root,
      stdio: "ignore",
    });
    return true;
  } catch (error) {
    return false;
  }
}

function toWslPath(value) {
  const normalized = path.resolve(value).replace(/\\/g, "/");
  const match = normalized.match(/^([A-Za-z]):\/(.*)$/);
  if (!match) {
    return normalized;
  }

  return `/mnt/${match[1].toLowerCase()}/${match[2]}`;
}

function run(command, args) {
  console.log([command, ...args].join(" "));
  childProcess.execFileSync(command, args, {
    cwd: root,
    stdio: "inherit",
  });
}

function runTippecanoe(nativeArgs, wslArgs) {
  if (tippecanoeCommand) {
    if (tippecanoeCommand.toLowerCase() === "wsl" || tippecanoeCommand.toLowerCase() === "wsl.exe") {
      run("wsl.exe", ["tippecanoe", ...wslArgs]);
      return;
    }

    run(tippecanoeCommand, nativeArgs);
    return;
  }

  if (commandWorks("tippecanoe", ["--version"])) {
    run("tippecanoe", nativeArgs);
    return;
  }

  if (commandWorks("wsl.exe", ["sh", "-lc", "command -v tippecanoe"])) {
    run("wsl.exe", ["tippecanoe", ...wslArgs]);
    return;
  }

  throw new Error(
    [
      "tippecanoe command was not found.",
      "Install Tippecanoe natively or install it in WSL Ubuntu, then rerun npm run build:japan-pmtiles.",
      "You can force WSL with TIPPECANOE_CMD=wsl.exe.",
    ].join(" "),
  );
}

fs.mkdirSync(workDir, { recursive: true });
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const layerArgs = [];
const wslLayerArgs = [];
for (const layer of layers) {
  const inputPath = path.join(sourceDir, layer.file);
  const outputGeoJson = path.join(workDir, `${layer.id}.geojson`);
  const topology = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const geojson = convertTopology(topology, layer);

  fs.writeFileSync(outputGeoJson, `${JSON.stringify(geojson)}\n`, "utf8");
  layerArgs.push(`-L${layer.id}:${outputGeoJson}`);
  wslLayerArgs.push(`-L${layer.id}:${toWslPath(outputGeoJson)}`);
  console.log(`${layer.id}: ${geojson.features.length} features`);
}

const tippecanoeArgs = [
  "--force",
  "--output", outputPath,
  "--minimum-zoom", "0",
  "--maximum-zoom", "14",
  "--drop-densest-as-needed",
  "--extend-zooms-if-still-dropping",
  "--detect-shared-borders",
  ...layerArgs,
];
const wslTippecanoeArgs = [
  "--force",
  "--output", toWslPath(outputPath),
  "--minimum-zoom", "0",
  "--maximum-zoom", "14",
  "--drop-densest-as-needed",
  "--extend-zooms-if-still-dropping",
  "--detect-shared-borders",
  ...wslLayerArgs,
];

runTippecanoe(tippecanoeArgs, wslTippecanoeArgs);

const bytes = fs.statSync(outputPath).size;
console.log(`${path.relative(root, outputPath)}: ${(bytes / 1024 / 1024).toFixed(2)} MB`);
