// Reproducible numerical audit; no network calls and no observed-value override.
const fs = require("node:fs");
const path = require("node:path");
const model = require("../web/earthquake-model.js");
const root = path.resolve(__dirname, "..");
const event = JSON.parse(fs.readFileSync(path.join(root, "tests/noto_2024_intensity.json"), "utf8"));
const stations = JSON.parse(fs.readFileSync(path.join(root, "web/data/jma_shindo_stations.json"), "utf8")).stations;
const ground = JSON.parse(fs.readFileSync(path.join(root, "web/data/ground_model.json"), "utf8"));
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalize = (name) => name.replace(/[＊*]/gu, "");
const labels = ["0", "1", "2", "3", "4", "5弱", "5強", "6弱", "6強", "7"];

function meshCode(lon, lat) {
  const p = Math.floor(lat * 1.5), u = Math.floor(lon), q = Math.floor((lat - p / 1.5) * 12);
  const v = Math.floor((lon - u) * 8);
  const r = Math.floor((lat - p / 1.5 - q / 12) * 120);
  const w = Math.floor((lon - u - v / 8) * 80);
  return `${p}${u - 100}${q}${v}${r}${w}`;
}

function previousSiteCorrection(values) {
  const [arv, avs, , maxDepth, wmAvs] = values;
  const effectiveAvs = Number.isFinite(wmAvs) && wmAvs > 0 ? wmAvs : avs;
  const velocity = Number.isFinite(arv) && arv > 0 ? clamp(1.05 * Math.log10(arv), -0.35, 0.62) : 0;
  const shallow = Number.isFinite(effectiveAvs) ? clamp((420 - effectiveAvs) / 360, -0.28, 0.45) : 0;
  const basin = Number.isFinite(maxDepth) ? clamp(Math.log10(Math.max(maxDepth, 100) / 900) * 0.18, -0.08, 0.16) : 0;
  return clamp(velocity + shallow * 0.45 + basin, -0.45, 0.75);
}

const rows = event.observations.map((observation) => {
  const matches = stations.filter((station) => normalize(station.name) === observation.name);
  const active = matches.filter((station) => station.active);
  const station = active.length === 1 ? active[0] : matches.length === 1 ? matches[0] : null;
  if (!station) throw new Error(`Station missing or ambiguous: ${observation.name}`);
  const values = ground.meshes[meshCode(station.longitude, station.latitude)] ?? [];
  const site = model.siteParameters({ arv: values[0], avs: values[4] ?? values[1] });
  const eastKm = (station.longitude - event.longitude) * 111.32 * Math.cos(event.latitude * Math.PI / 180);
  const northKm = (station.latitude - event.latitude) * 110.57;
  const strike = event.strikeDegrees * Math.PI / 180;
  const alongKm = eastKm * Math.sin(strike) + northKm * Math.cos(strike);
  const acrossKm = eastKm * Math.cos(strike) - northKm * Math.sin(strike);
  const ruptureDistanceKm = model.rectangularFaultDistanceKm({ ...event, centerDepthKm: event.depthKm, alongKm, acrossKm });
  const prediction = model.predict({ ...event, ruptureDistanceKm, ...site, earthquakeType: "crustal" });
  // Previous app: centre-line samples at <=12km, depth fixed at source depth;
  // neither fault width nor dip affected the final peak intensity.
  const intervals = Math.ceil(event.lengthKm / 12);
  let oldDistance = Infinity;
  for (let index = 0; index <= intervals; index++) {
    oldDistance = Math.min(oldDistance, Math.hypot(
      alongKm - (-event.lengthKm / 2 + event.lengthKm * index / intervals), acrossKm, event.depthKm,
    ));
  }
  const previous = clamp(1.43 * event.magnitude - 0.32 * Math.max(event.magnitude - 7.4, 0) ** 2
    - 2.12 * Math.log10(oldDistance + 20) - 0.0042 * oldDistance + previousSiteCorrection(values) - 0.95, 0, 7);
  return { ...observation, siteSource: site.source, arv: site.velocityAmplification, ruptureDistanceKm,
    previous, predicted: prediction.instrumentalIntensity,
    residual: prediction.instrumentalIntensity - observation.intensity, previousResidual: previous - observation.intensity };
});
const mean = (numbers) => numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
const metrics = (key) => ({ bias: mean(rows.map((row) => row[key])),
  mae: mean(rows.map((row) => Math.abs(row[key]))), rmse: Math.sqrt(mean(rows.map((row) => row[key] ** 2))) });
const oldMetrics = metrics("previousResidual"), newMetrics = metrics("residual");
const lines = [
  "# 震度モデルの数値監査", "", "一次資料確認日: 2026-10-28。`npm run audit:earthquake` で再計算。", "",
  "## 固定条件でのM・距離と震度の関係", "",
  "断層距離モデルのMw、深さ10km、地殻内、ARV400=1。列は震央距離ではなく断層最短距離。各セルは連続震度推定値／震度階級。", "",
  "| Mw | 10km | 30km | 100km | 200km |", "| --- | --- | --- | --- | --- |",
];
for (const magnitude of [4, 5, 6, 7, 8, 8.3, 9]) {
  const cells = [10, 30, 100, 200].map((ruptureDistanceKm) => {
    const prediction = model.predict({ magnitude, depthKm: 10, ruptureDistanceKm });
    return `${prediction.instrumentalIntensity.toFixed(2)}／${labels[prediction.intensityRank]}`;
  });
  lines.push(`| ${magnitude} | ${cells.join(" | ")} |`);
}
lines.push("", "断層距離モデルのMw8.3超は振幅項を頭打ちにするため、固定断層距離では同値。通常の点震源参考計算にはこの上限を適用しない。震度4未満等は適用範囲外の外挿。", "",
  "## 通常モードの高M時の距離減衰の再確認", "",
  "Mw9、深さ10km、同一地盤ARV400=1。旧球面近似と現行の点震源参考計算を比較。値は丸め前の推定震度で、画面用の0〜7制限前。", "",
  "| 震央距離km | 旧球面距離km | 点震源距離km | 旧球面＋Mw上限 | 現行点震源 |", "| --- | --- | --- | --- | --- |",
);
for (const epicentralDistanceKm of [0, 10, 50, 100, 150, 200, 250, 300]) {
  const pointDistance = model.pointSourceDistanceKm({ epicentralDistanceKm, depthKm: 10 });
  const oldDistance = Math.max(Math.hypot(epicentralDistanceKm, 10) - 10 ** (0.5 * 9 - 1.85) / 2, 3);
  const previous = model.predict({ magnitude: 9, depthKm: 10, ruptureDistanceKm: oldDistance });
  const current = model.predict({ magnitude: 9, depthKm: 10, ruptureDistanceKm: pointDistance, sourceModel: "point" });
  lines.push(`| ${epicentralDistanceKm} | ${oldDistance.toFixed(1)} | ${pointDistance.toFixed(1)} | ${previous.instrumentalIntensity.toFixed(3)} | ${current.instrumentalIntensity.toFixed(3)} |`);
}
lines.push("", "同じ地盤では震央からの距離に応じて減衰する。異なる地盤では遠方の地点が近傍より強くなる場合があり、その差は維持する。M9の点震源は外挿による参考値で、実際の巨大地震の震源域は断層モードで表す。", "",
  "## 観測値を直接計算に使わない比較", "",
  `[気象庁の計測震度・震央距離（表3-1）](${event.observationsSource}) と [防災科研の比較用矩形モデル](${event.faultSource})を使用。`, "",
  "能登半島地震の強震12地点を選んだ診断例。現行観測点リストの座標と1km集約地盤を使用しており、当時の設置位置・観測点補正係数は再現していない。旧値も同じ矩形中心線・地盤による旧式の局所平面近似であり、過去版全体の再実行ではない。", "",
  "| 観測点 | 観測震度値 | 旧式近似 | 改訂式 | 改訂−観測 | 断層距離km | ARV400 |", "| --- | --- | --- | --- | --- | --- | --- |",
);
for (const row of rows) lines.push(`| ${row.name} | ${row.intensity.toFixed(1)} | ${row.previous.toFixed(2)} | ${row.predicted.toFixed(2)} | ${row.residual.toFixed(2)} | ${row.ruptureDistanceKm.toFixed(1)} | ${row.arv.toFixed(2)} |`);
lines.push("", "| 指標 | 旧式近似 | 改訂式 |", "| --- | --- | --- |",
  ...["bias", "mae", "rmse"].map((key) => `| ${key} | ${oldMetrics[key].toFixed(3)} | ${newMetrics[key].toFixed(3)} |`), "",
  `地盤データのある地点: ${rows.filter((row) => row.siteSource !== "engineering-bedrock-assumption").length}/${rows.length}。`, "",
  "この標本で誤差が小さくなることと、他の地震・地域での予測精度の保証は別である。係数はこの12地点に合わせて調整していない。全域の観測点・複数地震による独立検証、詳細断層面、観測点補正、2025年変更の気象庁地盤増幅度は未導入。", "",
);
const report = lines.join("\n");
const outputIndex = process.argv.indexOf("--output");
if (outputIndex >= 0) {
  const outputPath = path.resolve(root, process.argv[outputIndex + 1]);
  if (!outputPath.startsWith(root + path.sep)) throw new Error("Audit output must be inside the workspace");
  fs.writeFileSync(outputPath, report, "utf8");
  console.log(`Wrote ${path.relative(root, outputPath)}; N=${rows.length}, MAE=${newMetrics.mae.toFixed(3)}, RMSE=${newMetrics.rmse.toFixed(3)}`);
} else console.log(report);
