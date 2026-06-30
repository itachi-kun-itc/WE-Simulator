const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const root = path.resolve(__dirname, "..");
const surfaceInputPath = process.env.JSHIS_SURFACE_GROUND_CSV
  ? path.resolve(root, process.env.JSHIS_SURFACE_GROUND_CSV)
  : "C:\\開発\\ソース\\表層地盤\\Z-V4-JAPAN-AMP-VS400_M250\\Z-V4-JAPAN-AMP-VS400_M250.csv";
const deepInputPath = process.env.JSHIS_DEEP_GROUND_CSV
  ? path.resolve(root, process.env.JSHIS_DEEP_GROUND_CSV)
  : "C:\\開発\\ソース\\深部地盤\\D-V4-STRUCT_DEEP-LYRD.csv";
const outputPath = path.join(root, "web", "data", "ground_model.json");

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const surfaceMeshes = await readSurfaceGround(surfaceInputPath);
  const deepMeshes = await readDeepGround(deepInputPath);
  const meshes = {};

  for (const [code, surface] of surfaceMeshes) {
    const deep = deepMeshes.get(code);
    const center = meshCenter(code);
    meshes[code] = {
      lat: round(center.latitude, 5),
      lon: round(center.longitude, 5),
      arv: round(surface.arvSum / surface.count, 4),
      avs: round(surface.avsSum / surface.count, 1),
      surfaceCount: surface.count,
      ...(deep ? deep : {}),
    };
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    JSON.stringify({
      type: "J-SHIS ground model 1km mesh aggregate",
      sources: {
        surface: path.relative(root, surfaceInputPath),
        deep: path.relative(root, deepInputPath),
      },
      surfaceFields: {
        AVS: "Average S-wave velocity in the shallow ground model",
        ARV: "Peak velocity amplification factor from engineering bedrock to surface",
      },
      deepFields: {
        s0: "S0 column from D-V4-STRUCT_DEEP-LYRD",
        maxDepthM: "Maximum numeric D* column value for the mesh",
      },
      count: Object.keys(meshes).length,
      meshes,
    }),
  );

  console.log(`Surface 1km meshes: ${surfaceMeshes.size}`);
  console.log(`Deep meshes: ${deepMeshes.size}`);
  console.log(`Wrote ${Object.keys(meshes).length} ground meshes to ${path.relative(root, outputPath)}`);
}

async function readSurfaceGround(filePath) {
  const meshes = new Map();
  let lineNumber = 0;

  for await (const line of readLines(filePath)) {
    lineNumber += 1;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const [codeRaw, , avsRaw, arvRaw] = trimmed.split(",").map((value) => value.trim());
    const code = codeRaw.slice(0, 8);
    const avs = Number(avsRaw);
    const arv = Number(arvRaw);

    if (!code || !Number.isFinite(avs) || !Number.isFinite(arv) || arv <= 0) {
      continue;
    }

    if (!meshes.has(code)) {
      meshes.set(code, { avsSum: 0, arvSum: 0, count: 0 });
    }

    const mesh = meshes.get(code);
    mesh.avsSum += avs;
    mesh.arvSum += arv;
    mesh.count += 1;

    if (lineNumber % 1_000_000 === 0) {
      console.log(`Read ${lineNumber.toLocaleString()} surface lines`);
    }
  }

  return meshes;
}

async function readDeepGround(filePath) {
  const meshes = new Map();
  let header = null;

  for await (const line of readLines(filePath)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("#")) {
      const fieldsLine = trimmed.replace(/^#\s*/, "");
      if (fieldsLine.startsWith("CODE,")) {
        header = fieldsLine.split(",").map((value) => value.trim());
      }
      continue;
    }

    if (!header) {
      continue;
    }

    const values = trimmed.split(",").map((value) => value.trim());
    const code = values[0];
    const s0 = Number(values[1]);
    const depths = values.slice(2).map(Number).filter(Number.isFinite);
    const maxDepthM = Math.max(...depths);

    if (!code || !Number.isFinite(maxDepthM)) {
      continue;
    }

    meshes.set(code, {
      s0: Number.isFinite(s0) ? round(s0, 1) : null,
      maxDepthM: round(maxDepthM, 1),
    });
  }

  return meshes;
}

function readLines(filePath) {
  return readline.createInterface({
    input: fs.createReadStream(filePath, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });
}

function meshCenter(code) {
  const lat1 = Number(code.slice(0, 2)) / 1.5;
  const lon1 = Number(code.slice(2, 4)) + 100;
  const lat2 = Number(code[4]) * (5 / 60);
  const lon2 = Number(code[5]) * (7.5 / 60);
  const lat3 = Number(code[6]) * (30 / 3600);
  const lon3 = Number(code[7]) * (45 / 3600);

  return {
    latitude: lat1 + lat2 + lat3 + 15 / 3600,
    longitude: lon1 + lon2 + lon3 + 22.5 / 3600,
  };
}

function round(value, digits) {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}
