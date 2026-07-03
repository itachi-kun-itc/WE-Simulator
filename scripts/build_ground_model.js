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
const wm2020InputPath = process.env.WM2020_GROUND_CSV
  ? path.resolve(root, process.env.WM2020_GROUND_CSV)
  : "C:\\開発\\ソース\\気象・地震シミュレーション\\全国地盤データ\\Z-WM2020-JAPAN-M250\\Z-WM2020-JAPAN-M250\\Z-WM2020-JAPAN-M250.csv";
const outputPath = path.join(root, "web", "data", "ground_model.json");

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const surfaceMeshes = await readSurfaceGround(surfaceInputPath);
  const deepMeshes = await readDeepGround(deepInputPath);
  const wm2020Meshes = await readWm2020Ground(wm2020InputPath);
  const meshes = {};

  const meshCodes = new Set([...surfaceMeshes.keys(), ...wm2020Meshes.keys()]);
  for (const code of meshCodes) {
    const surface = surfaceMeshes.get(code);
    const deep = deepMeshes.get(code);
    const wm2020 = wm2020Meshes.get(code);
    meshes[code] = [
      surface ? round(surface.arvSum / surface.count, 4) : null,
      surface ? round(surface.avsSum / surface.count, 1) : null,
      deep?.s0 ?? null,
      deep?.maxDepthM ?? null,
      wm2020 ? round(wm2020.avsSum / wm2020.count, 1) : null,
      wm2020 ? getMostFrequentJcode(wm2020.jcodeCounts) : null,
    ];
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    JSON.stringify({
      type: "J-SHIS ground model 1km mesh aggregate",
      sources: {
        surface: path.relative(root, surfaceInputPath),
        deep: path.relative(root, deepInputPath),
        wm2020: path.relative(root, wm2020InputPath),
      },
      surfaceFields: {
        AVS: "Average S-wave velocity in the shallow ground model",
        ARV: "Peak velocity amplification factor from engineering bedrock to surface",
      },
      wm2020Fields: {
        JCODE: "Geomorphologic / ground classification code from Wakamatsu and Matsuoka (2020)",
        AVS: "Average S-wave velocity in the Wakamatsu and Matsuoka (2020) 250m mesh",
      },
      deepFields: {
        s0: "S0 column from D-V4-STRUCT_DEEP-LYRD",
        maxDepthM: "Maximum numeric D* column value for the mesh",
      },
      meshValueFormat: ["arv", "avs", "s0", "maxDepthM", "wm2020Avs", "wm2020Jcode"],
      count: Object.keys(meshes).length,
      meshes,
    }),
  );

  console.log(`Surface 1km meshes: ${surfaceMeshes.size}`);
  console.log(`Deep meshes: ${deepMeshes.size}`);
  console.log(`WM2020 1km meshes: ${wm2020Meshes.size}`);
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

async function readWm2020Ground(filePath) {
  const meshes = new Map();
  let lineNumber = 0;

  for await (const line of readLines(filePath)) {
    lineNumber += 1;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const [codeRaw, jcodeRaw, avsRaw] = trimmed.split(",").map((value) => value.trim());
    const code = codeRaw.slice(0, 8);
    const jcode = Number(jcodeRaw);
    const avs = Number(avsRaw);

    if (!code || !Number.isFinite(avs) || avs <= 0) {
      continue;
    }

    if (!meshes.has(code)) {
      meshes.set(code, { avsSum: 0, count: 0, jcodeCounts: new Map() });
    }

    const mesh = meshes.get(code);
    mesh.avsSum += avs;
    mesh.count += 1;
    if (Number.isInteger(jcode) && jcode > 0) {
      mesh.jcodeCounts.set(jcode, (mesh.jcodeCounts.get(jcode) ?? 0) + 1);
    }

    if (lineNumber % 1_000_000 === 0) {
      console.log(`Read ${lineNumber.toLocaleString()} WM2020 lines`);
    }
  }

  return meshes;
}

function getMostFrequentJcode(jcodeCounts) {
  let bestCode = null;
  let bestCount = -1;

  for (const [jcode, count] of jcodeCounts) {
    if (count > bestCount || (count === bestCount && jcode < bestCode)) {
      bestCode = jcode;
      bestCount = count;
    }
  }

  return bestCode;
}

function readLines(filePath) {
  return readline.createInterface({
    input: fs.createReadStream(filePath, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });
}

function round(value, digits) {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}
