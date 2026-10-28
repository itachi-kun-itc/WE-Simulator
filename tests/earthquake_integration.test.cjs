const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const model = require("../web/earthquake-model.js");
const app = fs.readFileSync(path.join(__dirname, "../web/app.js"), "utf8");
const declarations = [...app.matchAll(/^(?:async )?function (\w+)\(/gm)];
function harness(names, overrides = {}) {
  const controls = new Map();
  const state = { latitude: 35, longitude: 135, magnitude: 6, magnitudeType: "Mj", depthKm: 10,
    earthquakeType: "crustal", sourceModel: "point", faultModelId: "rectangle" };
  const context = vm.createContext({
    console, GROUND_MOTION_MODEL: model, EARTH_RADIUS_KM: 6371, state,
    EARTHQUAKE_MODEL: { defaultSiteAmplification: 0, pWaveVelocityKmPerSec: 6.5, sWaveVelocityKmPerSec: 3.8 },
    clamp: (value, min, max) => Math.min(Math.max(value, min), max),
    isFaultSimulationActive: () => state.sourceModel === "fault",
    getSelectedPreset: () => null,
    getGroundModelAt: () => model.siteParameters({ arv: 2 }),
    getFaultControlNumber: (selector, fallback) => controls.get(selector) ?? fallback,
    getResolvedFaultRuptureSettings: () => ({ origin: "center", direction: "bilateral" }),
    getActiveFaultPath: () => [[135, 34.8], [135, 35.2]],
    getSimulationScenarioControlValue: (_, fallback) => fallback,
    document: { body: { classList: { contains: () => state.sourceModel === "fault" } } }, els: {},
    INTENSITY_CLASSES: [0, ...model.THRESHOLDS].map((min, rank) => ({ min, rank })),
    ...overrides,
  });
  for (const name of names) {
    const index = declarations.findIndex((match) => match[1] === name);
    assert.ok(index >= 0, `Missing application function ${name}`);
    vm.runInContext(app.slice(declarations[index].index, declarations[index + 1]?.index ?? app.length), context);
  }
  return { context, state, controls };
}

test("point predictions use the selected magnitude scale and site ARV", () => {
  const { context: c, state } = harness(["estimateIntensityAtPoint", "isGroundMotionPredictionAvailable"]);
  const distance = model.pointSourceDistanceKm({ epicentralDistanceKm: 30, depthKm: 10 });
  assert.equal(c.estimateIntensityAtPoint(135, 35, 30), model.predict({ magnitude: 6, magnitudeType: "Mj",
    depthKm: 10, ruptureDistanceKm: distance, velocityAmplification: 2, sourceModel: "point" }).displayIntensity);
  state.depthKm = 151;
  assert.equal(c.isGroundMotionPredictionAvailable(), false);
  assert.equal(c.estimateIntensityAtPoint(135, 35, 30), 0, "Unsupported estimates must not colour the map");
});

test("fault intensity uses rupture distance, not travel-sample distance", () => {
  const { context: c, state } = harness(["estimateIntensityAtPoint", "isGroundMotionPredictionAvailable"]);
  state.sourceModel = "fault";
  assert.equal(c.estimateIntensityAtPoint(135, 35, null, { hypocentralDistanceKm: 500, ruptureDistanceKm: 3 }),
    model.predict({ magnitude: 6, magnitudeType: "Mj", depthKm: 10, ruptureDistanceKm: 3, velocityAmplification: 2 }).displayIntensity);
});

test("M9 point preview sends physical source distance and the point-source policy to the model", () => {
  const { context: c, state } = harness(["estimateIntensityAtPoint", "isGroundMotionPredictionAvailable"]);
  Object.assign(state, { magnitude: 9, magnitudeType: "Mw" });
  const near = c.estimateIntensityAtPoint(135, 35, 0);
  const far = c.estimateIntensityAtPoint(135, 35, 200);
  assert.ok(near > far);
  assert.equal(far, model.predict({ magnitude: 9, magnitudeType: "Mw", depthKm: 10,
    ruptureDistanceKm: Math.hypot(200, 10), velocityAmplification: 2, sourceModel: "point" }).displayIntensity);
});

test("rectangular geometry changes peak distances when width and dip change", () => {
  const { context: c, controls } = harness(["toRadians", "toLocalKilometers", "getFaultShakingDistanceKm"]);
  controls.set("#fault-width-input", 10);
  controls.set("#fault-dip-input", 90);
  assert.ok(Math.abs(c.getFaultShakingDistanceKm(135, 35) - 5) < 1e-10);
  controls.set("#fault-width-input", 20);
  assert.ok(c.getFaultShakingDistanceKm(135, 35) < 1e-10);
  controls.set("#fault-dip-input", 45);
  assert.ok(Math.abs(c.getFaultShakingDistanceKm(135, 35) - Math.sqrt(50)) < 1e-10);
});

test("official source lines use continuous distances between rupture samples", () => {
  const { context: c, state } = harness(["toRadians", "haversineKilometers", "toLocalKilometers",
    "nearestPointOnSegmentKilometers", "distanceToSegmentKilometers", "getPointAlongFaultPath", "getFaultShakingDistanceKm"]);
  state.faultModelId = "nankai-trough";
  assert.ok(Math.abs(c.getFaultShakingDistanceKm(135, 35) - 10) < 1e-10);
  assert.ok(c.getFaultShakingDistanceKm(135.2, 35) > 20);
});

test("shared scenarios preserve scales and source types; older scenarios receive explicit defaults", () => {
  const { context: c, state } = harness(["normalizeSimulationScenario", "captureCurrentSimulationScenario"]);
  state.magnitudeType = "Mw";
  state.earthquakeType = "intraslab";
  const snapshot = c.captureCurrentSimulationScenario();
  const restored = c.normalizeSimulationScenario(JSON.parse(JSON.stringify(snapshot)));
  assert.equal(restored.magnitudeType, "Mw");
  assert.equal(restored.earthquakeType, "intraslab");
  delete snapshot.magnitudeType;
  delete snapshot.earthquakeType;
  assert.equal(c.normalizeSimulationScenario(snapshot).magnitudeType, "Mj");
  snapshot.mode = "fault";
  snapshot.fault = { modelId: "nankai-trough" };
  assert.equal(c.normalizeSimulationScenario(snapshot).magnitudeType, "Mw");
  assert.equal(c.normalizeSimulationScenario(snapshot).earthquakeType, "interface");
});

test("regional shading uses the largest unrounded station intensity", () => {
  const { context: c } = harness(["getLocalAreaStationSnapshot"], {
    localAreaStationSnapshotCache: null, getLocalAreaStationMembership: () => [["a", "b"], ["c"]],
  });
  const features = [5.4999, 3.2, 6.1].map((value, index) => ({ properties: {
    id: ["a", "b", "c"][index], predictedIntensityValue: value, pArrivalSec: index + 1, sArrivalSec: index + 2,
  } }));
  const snapshot = c.getLocalAreaStationSnapshot({}, features);
  assert.equal(snapshot.predictedMaxValues[0], 5.4999);
  assert.equal(snapshot.predictedMaxValues[1], 6.1);
});

test("unsupported depth is labelled unavailable while observed historical data keeps its label", () => {
  const { context: c, state } = harness(["formatSetupMaxIntensityLabel", "isGroundMotionPredictionAvailable"]);
  state.depthKm = 681;
  assert.equal(c.formatSetupMaxIntensityLabel("0"), "推定対象外");
  c.getSelectedPreset = () => ({ id: "observed-deep-event" });
  assert.equal(c.formatSetupMaxIntensityLabel("5強"), "5強");
});

test("model is loaded before the application and both modes expose magnitude/source types", () => {
  const html = fs.readFileSync(path.join(__dirname, "../web/index.html"), "utf8");
  assert.ok(html.indexOf('src="./earthquake-model.js') < html.indexOf('src="./app.js'));
  assert.equal((html.match(/data-ground-motion-scale/g) ?? []).length, 2);
  assert.equal((html.match(/data-ground-motion-type/g) ?? []).length, 2);
});

test("current location shows unsupported depth without emitting a zero-intensity speech message", () => {
  const elements = { currentLocationName: {}, currentLocationIntensity: {}, currentLocationArrival: {} };
  const { context: c, state } = harness(["updateCurrentLocationForecast", "getCurrentLocationSpeechText",
    "isGroundMotionPredictionAvailable"], {
    els: elements,
    setTextContentIfChanged: (element, text) => { element.textContent = text; },
    applySimulationIntensityCard() {},
    getCurrentLocationForecast: () => ({ intensityClass: { rank: 0 } }),
  });
  Object.assign(state, { depthKm: 681, currentLocationStatus: "ready", currentLocationEnabled: true,
    currentLocation: { latitude: 35, longitude: 135 }, currentLocationName: "test site" });
  c.updateCurrentLocationForecast();
  assert.equal(elements.currentLocationIntensity.textContent, "推定対象外");
  assert.equal(c.getCurrentLocationSpeechText(), "");
});

function stationHarness(overrides = {}) {
  return harness(["buildStationIntensityFeatures", "toJmaIntensityClass", "haversineKilometers", "toRadians"], {
    stationIntensityFeatureCache: null,
    isOldJmaScaleSyntheticPreset: () => false,
    getPresetStationObservation: () => null,
    estimateIntensityAtPoint: () => 4.49999,
    getGroundRiseProfile: () => ({ durationSec: 1 }),
    getStationWaveResponseProperties: () => ({}),
    getStationDisplaySortKey: (rank) => rank,
    ...overrides,
  });
}

const stationData = { stations: [{ id: "a", name: "test", active: true, longitude: 135, latitude: 35 }] };
test("station prediction keeps a just-below-threshold value through serialisation", () => {
  const { context: c } = stationHarness();
  const properties = JSON.parse(JSON.stringify(c.buildStationIntensityFeatures(stationData)[0].properties));
  assert.equal(properties.predictedIntensityValue, 4.49999);
  assert.equal(properties.predictedIntensityRank, 4);
  assert.equal(c.toJmaIntensityClass(properties.predictedIntensityValue).rank, 4);
});

test("deep-event replay uses its observations instead of the unavailable prediction", () => {
  const { context: c, state } = stationHarness({
    getSelectedPreset: () => ({ id: "deep-event" }),
    getPresetStationObservation: () => ({ intensityValue: 5.3, stationName: "observed" }),
    estimateIntensityAtPoint: () => assert.fail("A historical observation must not be replaced by prediction"),
  });
  state.depthKm = 681;
  const properties = c.buildStationIntensityFeatures(stationData)[0].properties;
  assert.equal(properties.actualObserved, true);
  assert.equal(properties.predictedIntensityValue, 5.3);
  assert.equal(properties.predictedIntensityRank, 6);
});
