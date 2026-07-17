const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(projectRoot, "web", "data", "activefault_japan_segments.geojson");
const schemaPath = path.join(projectRoot, "workers", "d1", "0005_active_fault_segments.sql");
const wranglerConfigPath = path.join(projectRoot, "workers", "wrangler.toml");
const databaseName = "we-simulator-presets";
const targetFlag = process.argv.includes("--local") ? "--local" : "--remote";
const dryRun = process.argv.includes("--dry-run");
const maxPathPoints = 180;
const batchSize = 40;

function sqlText(value) {
  return `'${String(value ?? "").replace(/\0/g, "").replace(/'/g, "''")}'`;
}

function representativePath(features) {
  const coordinateMap = new Map();
  features.forEach((feature) => {
    (feature.geometry?.coordinates || []).forEach((coordinate) => {
      const longitude = Number(coordinate?.[0]);
      const latitude = Number(coordinate?.[1]);
      if (Number.isFinite(longitude) && Number.isFinite(latitude)) {
        const point = [Number(longitude.toFixed(5)), Number(latitude.toFixed(5))];
        coordinateMap.set(`${point[0]},${point[1]}`, point);
      }
    });
  });
  const coordinates = [...coordinateMap.values()];
  if (coordinates.length < 2) {
    return coordinates;
  }
  const meanLongitude = coordinates.reduce((sum, point) => sum + point[0], 0) / coordinates.length;
  const meanLatitude = coordinates.reduce((sum, point) => sum + point[1], 0) / coordinates.length;
  const longitudeScale = Math.cos(meanLatitude * Math.PI / 180);
  let covarianceXX = 0;
  let covarianceXY = 0;
  let covarianceYY = 0;
  coordinates.forEach(([longitude, latitude]) => {
    const x = (longitude - meanLongitude) * longitudeScale;
    const y = latitude - meanLatitude;
    covarianceXX += x * x;
    covarianceXY += x * y;
    covarianceYY += y * y;
  });
  const angle = 0.5 * Math.atan2(2 * covarianceXY, covarianceXX - covarianceYY);
  const axisX = Math.cos(angle);
  const axisY = Math.sin(angle);
  coordinates.sort((left, right) => (
    ((left[0] - meanLongitude) * longitudeScale * axisX + (left[1] - meanLatitude) * axisY)
    - ((right[0] - meanLongitude) * longitudeScale * axisX + (right[1] - meanLatitude) * axisY)
  ));
  if (coordinates.length <= maxPathPoints) {
    return coordinates;
  }
  return Array.from({ length: maxPathPoints }, (_, index) => (
    coordinates[Math.round(index * (coordinates.length - 1) / (maxPathPoints - 1))]
  ));
}

function runWrangler(filePath) {
  const wranglerArguments = [
    "wrangler",
    "d1",
    "execute",
    databaseName,
    targetFlag,
    "--config",
    wranglerConfigPath,
    "--file",
    filePath,
  ];
  const executable = process.platform === "win32" ? (process.env.ComSpec || "cmd.exe") : "npx";
  const commandArguments = process.platform === "win32"
    ? ["/d", "/s", "/c", "npx.cmd", ...wranglerArguments]
    : wranglerArguments;
  const result = spawnSync(executable, commandArguments, {
    cwd: projectRoot,
    stdio: "inherit",
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`wrangler d1 execute failed for ${filePath}`);
  }
}

const data = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const groups = new Map();
(data.features || []).forEach((feature) => {
  const id = String(feature.properties?.segment_id || "").trim();
  if (!id || feature.geometry?.type !== "LineString") {
    return;
  }
  if (!groups.has(id)) {
    groups.set(id, {
      id,
      name: String(feature.properties?.segment_name || feature.properties?.name || id).trim(),
      description: String(feature.properties?.description || "").trim(),
      source: String(feature.properties?.source || "産総研 活断層データベース").trim(),
      sourceUrl: String(feature.properties?.source_url || "").trim(),
      features: [],
    });
  }
  groups.get(id).features.push(feature);
});

const updatedAt = new Date().toISOString();
const statements = [...groups.values()].map((entry) => {
  const faultPath = representativePath(entry.features);
  return `INSERT INTO active_fault_segments (
    segment_id, segment_name, description, source, source_url, path_json, point_count, updated_at
  ) VALUES (
    ${sqlText(entry.id)}, ${sqlText(entry.name)}, ${sqlText(entry.description)}, ${sqlText(entry.source)},
    ${sqlText(entry.sourceUrl)}, ${sqlText(JSON.stringify(faultPath))}, ${faultPath.length}, ${sqlText(updatedAt)}
  ) ON CONFLICT(segment_id) DO UPDATE SET
    segment_name = excluded.segment_name,
    description = excluded.description,
    source = excluded.source,
    source_url = excluded.source_url,
    path_json = excluded.path_json,
    point_count = excluded.point_count,
    updated_at = excluded.updated_at;`;
});

if (dryRun) {
  const totalPoints = [...groups.values()]
    .reduce((sum, entry) => sum + representativePath(entry.features).length, 0);
  console.log(`Prepared ${statements.length} active-fault segments with ${totalPoints} path points.`);
} else {
  const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "we-active-faults-"));
  try {
    runWrangler(schemaPath);
    for (let index = 0; index < statements.length; index += batchSize) {
      const batchPath = path.join(tempDirectory, `batch-${String(index / batchSize).padStart(3, "0")}.sql`);
      fs.writeFileSync(batchPath, `${statements.slice(index, index + batchSize).join("\n")}\n`);
      runWrangler(batchPath);
    }
    console.log(`Uploaded ${statements.length} active-fault segments to D1 (${targetFlag.slice(2)}).`);
  } finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
  }
}
