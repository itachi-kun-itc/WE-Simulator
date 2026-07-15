const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputPath = process.env.EARTHQUAKE_PRESETS_INPUT_PATH
  ? path.resolve(root, process.env.EARTHQUAKE_PRESETS_INPUT_PATH)
  : firstExistingFile([
      path.join(root, "data", "processed", "earthquake_presets.json"),
      path.join(root, "web", "data", "earthquake_presets.json"),
    ]);
const workerUrl = String(process.env.WE_SIMULATOR_WORKER_URL || readWorkerUrlFromConfig() || "").replace(/\/+$/, "");
const adminToken = process.env.ADMIN_NOTIFY_TOKEN || "";

if (!inputPath) {
  throw new Error("No earthquake presets JSON found.");
}
if (!workerUrl) {
  throw new Error("Set WE_SIMULATOR_WORKER_URL or web/push-config.json workerUrl.");
}
if (!adminToken) {
  throw new Error("Set ADMIN_NOTIFY_TOKEN to the same value configured in Cloudflare Worker secrets.");
}

const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const sourcePresets = Array.isArray(source.presets) ? source.presets : [];
const presets = process.env.EARTHQUAKE_PRESETS_EEW_ONLY === "1"
  ? sourcePresets.filter((preset) => Array.isArray(preset.eewReports) && preset.eewReports.length > 0)
  : sourcePresets;

uploadPresets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function uploadPresets() {
  console.log(`Uploading ${presets.length} earthquake presets from ${path.relative(root, inputPath)}`);
  for (const [index, preset] of presets.entries()) {
    const response = await fetch(`${workerUrl}/admin/earthquake-presets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(preset),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upload failed for ${preset.id || index}: ${response.status} ${text}`);
    }

    console.log(`[${index + 1}/${presets.length}] ${preset.id}`);
  }
  console.log("Upload complete.");
}

function firstExistingFile(files) {
  return files.find((file) => fs.existsSync(file));
}

function readWorkerUrlFromConfig() {
  try {
    const configPath = path.join(root, "web", "push-config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return config.workerUrl;
  } catch {
    return "";
  }
}
