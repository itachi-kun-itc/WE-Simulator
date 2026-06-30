const MUNICIPALITIES_URL = "./data/municipalities.geojson";
const BOUNDARY_LAYERS_URL = "./data/boundary_layers.geojson";
const JMA_LOCAL_AREAS_URL = "./data/jma_local_areas.geojson";
const SEA_EPICENTER_AREAS_URL = "./data/sea_epicenter_areas.geojson";
const SURROUNDING_LAND_URL = "./data/surrounding_land.geojson";
const GROUND_MODEL_URL = "./data/ground_model.json";
const SHINDO_STATIONS_URL = "./data/jma_shindo_stations.json";

const INITIAL_CENTER = [139.767, 35.681];
const INITIAL_ZOOM = 5.25;
const MUNICIPALITY_BOUNDARY_MIN_ZOOM = 8;
const EARTHQUAKE_MODEL = {
  pWaveVelocityKmPerSec: 6.5,
  sWaveVelocityKmPerSec: 3.8,
  eewProcessingDelaySec: 2.0,
  defaultSiteAmplification: 0,
};
const INTENSITY_CLASSES = [
  { label: "0", min: 0, color: "#f6f7f8", rank: 0 },
  { label: "1", min: 0.5, color: "#2f3e9e", rank: 1 },
  { label: "2", min: 1.5, color: "#00b7e8", rank: 2 },
  { label: "3", min: 2.5, color: "#95e600", rank: 3 },
  { label: "4", min: 3.5, color: "#fff000", rank: 4 },
  { label: "5弱", min: 4.5, color: "#ffb000", rank: 5 },
  { label: "5強", min: 5.0, color: "#f07a00", rank: 6 },
  { label: "6弱", min: 5.5, color: "#ff1f3d", rank: 7 },
  { label: "6強", min: 6.0, color: "#c0002b", rank: 8 },
  { label: "7", min: 6.5, color: "#7b003f", rank: 9 },
];

const state = {
  latitude: 35.681,
  longitude: 139.767,
  depthKm: 10,
  magnitude: 6.0,
  epicenterName: "未選択",
  municipalityName: "未選択",
  maxIntensityLabel: "未計算",
  epicenterEditEnabled: false,
  showStationLayer: false,
  showRegionLayer: true,
};

const els = {
  status: document.querySelector("#map-status"),
  epicenterRegion: document.querySelector("#epicenter-region"),
  latitude: document.querySelector("#latitude-input"),
  longitude: document.querySelector("#longitude-input"),
  depth: document.querySelector("#depth-input"),
  magnitude: document.querySelector("#magnitude-input"),
  municipalityOutput: document.querySelector("#municipality-output"),
  maxIntensityOutput: document.querySelector("#max-intensity-output"),
  epicenterEditToggle: document.querySelector("#epicenter-edit-toggle"),
  stationLayerToggle: document.querySelector("#station-layer-toggle"),
  regionLayerToggle: document.querySelector("#region-layer-toggle"),
  resetEpicenter: document.querySelector("#reset-epicenter"),
};

let map;
let epicenterMarker;
let municipalityData;
let municipalityDisplayData;
let municipalityLoadPromise;
let boundaryData;
let boundaryLoadPromise;
let localAreaData;
let localAreaLoadPromise;
let seaEpicenterData;
let seaEpicenterLoadPromise;
let surroundingLandData;
let surroundingLandLoadPromise;
let groundModelData;
let groundModelLoadPromise;
let shindoStationData;
let shindoStationLoadPromise;
let locationResolveTimer;

setupTabs();
renderDepthOptions();
bindSimulationControls();

if (window.maplibregl) {
  initEarthquakeMap();
} else {
  els.status.textContent = "MapLibre GL JSを読み込めませんでした";
}

function setupTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("panel-active"));

      tab.classList.add("active");
      document.querySelector(`#${tab.dataset.panel}`).classList.add("panel-active");

      if (tab.dataset.panel === "earthquake-panel" && map) {
        requestAnimationFrame(() => map.resize());
      }
    });
  });
}

function renderDepthOptions() {
  const shallow = document.createElement("option");
  shallow.value = "0";
  shallow.textContent = "ごく浅い";

  const depthOptions = Array.from({ length: 491 }, (_, index) => {
    const depth = index + 10;
    const option = document.createElement("option");
    option.value = String(depth);
    option.textContent = `${depth} km`;
    return option;
  });

  els.depth.replaceChildren(shallow, ...depthOptions);
}

function bindSimulationControls() {
  els.latitude.addEventListener("input", () => updateStateFromInputs({ resolveLocation: true }));
  els.longitude.addEventListener("input", () => updateStateFromInputs({ resolveLocation: true }));
  els.depth.addEventListener("input", () => updateStateFromInputs());
  els.magnitude.addEventListener("input", () => updateStateFromInputs());
  els.epicenterEditToggle.addEventListener("change", () => updateEpicenterEditMode());
  els.stationLayerToggle.addEventListener("change", () => updateDisplayMode());
  els.regionLayerToggle.addEventListener("change", () => updateDisplayMode());

  els.resetEpicenter.addEventListener("click", () => {
    state.latitude = 35.681;
    state.longitude = 139.767;
    state.depthKm = 10;
    state.magnitude = 6.0;
    state.epicenterName = "未選択";
    state.municipalityName = "未選択";
    syncInputs();
    updateEpicenter({ resolveLocation: true });
    map.easeTo({ center: INITIAL_CENTER, zoom: 6, duration: 450 });
  });

  syncInputs();
  updateDisplayMode();
}

async function initEarthquakeMap() {
  map = new maplibregl.Map({
    container: "map",
    style: {
      version: 8,
      sources: {},
      layers: [
        {
          id: "sea-background",
          type: "background",
          paint: {
            "background-color": "#061a3a",
          },
        },
      ],
    },
    center: INITIAL_CENTER,
    zoom: INITIAL_ZOOM,
    minZoom: 4,
    maxZoom: 10,
    attributionControl: false,
  });

  map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), "top-right");
  map.addControl(
    new maplibregl.AttributionControl({
      compact: true,
      customAttribution:
        '<a href="https://nlftp.mlit.go.jp/ksj/" target="_blank" rel="noreferrer">国土数値情報</a>',
    }),
  );
  updateEpicenterEditMode();

  map.on("click", (event) => {
    if (!state.epicenterEditEnabled) {
      return;
    }

    state.latitude = Number(event.lngLat.lat.toFixed(3));
    state.longitude = Number(event.lngLat.lng.toFixed(3));
    syncInputs();
    updateEpicenter({ resolveLocation: true });
  });

  try {
    await onceMapLoaded();
    await showMapLayers();
    els.status.textContent = "市町村区分地図を表示中";
  } catch (error) {
    els.status.textContent = "地図データの読み込みに失敗しました";
    console.warn(error);
  }

  updateEpicenter({ resolveLocation: true });
}

function onceMapLoaded() {
  if (map.loaded()) {
    return Promise.resolve();
  }

  return new Promise((resolve) => map.once("load", resolve));
}

async function showMapLayers() {
  const [surroundingLand, municipalities, boundaries, localAreas, shindoStations] = await Promise.all([
    loadSurroundingLand(),
    loadMunicipalities(),
    loadBoundaryLayers(),
    loadLocalAreas(),
    loadShindoStations(),
  ]);

  municipalityDisplayData = municipalityDisplayData ?? withoutInteriorRings(municipalities);

  addGeoJsonSource("surrounding-land", surroundingLand);
  addGeoJsonSource("municipalities", municipalityDisplayData);
  addGeoJsonSource("jma-local-areas", buildIntensityAreaData(localAreas));
  addGeoJsonSource("shindo-stations", buildStationIntensityData(shindoStations));
  addGeoJsonSource("boundaries", boundaries);

  addMapLayers();
  fitInitialMapBounds(getGeoJsonBounds(municipalityDisplayData));
  loadGroundModel()
    .then(() => updateIntensityLayer())
    .catch((error) => console.warn(error));
}

function addGeoJsonSource(id, data) {
  if (map.getSource(id)) {
    map.getSource(id).setData(data);
    return;
  }

  map.addSource(id, {
    type: "geojson",
    data,
  });
}

function addMapLayers() {
  addLayerIfMissing({
    id: "surrounding-land-fill",
    type: "fill",
    source: "surrounding-land",
    paint: {
      "fill-color": "#6f777f",
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "japan-land-fill",
    type: "fill",
    source: "municipalities",
    paint: {
      "fill-color": "#8c9298",
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "japan-land-edge-cover",
    type: "line",
    source: "municipalities",
    paint: {
      "line-color": "#8c9298",
      "line-opacity": 1,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 5.2, 7, 3.2, 10, 1.2],
    },
  });

  addLayerIfMissing({
    id: "jma-intensity-fill",
    type: "fill",
    source: "jma-local-areas",
    paint: {
      "fill-color": ["get", "intensityColor"],
      "fill-opacity": ["interpolate", ["linear"], ["get", "intensityRank"], 0, 0.36, 2, 0.72, 9, 0.94],
    },
  });
  updateLayerVisibility("jma-intensity-fill", state.showRegionLayer);

  addLayerIfMissing({
    id: "municipality-boundaries",
    type: "line",
    source: "municipalities",
    minzoom: MUNICIPALITY_BOUNDARY_MIN_ZOOM,
    paint: {
      "line-color": "#ffffff",
      "line-opacity": 0.58,
      "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.36, 10, 0.58],
    },
  });

  addLayerIfMissing({
    id: "prefecture-boundaries",
    type: "line",
    source: "boundaries",
    filter: ["==", ["get", "layer"], "prefecture"],
    paint: {
      "line-color": "#e4e9ef",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 4, 0.42, 7, 0.58, 10, 0.72],
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 7, 0.85, 10, 1.2],
    },
  });

  addLayerIfMissing({
    id: "jma-region-boundaries",
    type: "line",
    source: "boundaries",
    filter: ["==", ["get", "layer"], "jma_region"],
    paint: {
      "line-color": "#d5dee8",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 4, 0.62, 7, 0.78, 10, 0.9],
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1.05, 7, 1.7, 10, 2.45],
    },
  });

  addLayerIfMissing({
    id: "shindo-station-points",
    type: "circle",
    source: "shindo-stations",
    paint: {
      "circle-color": ["get", "intensityColor"],
      "circle-opacity": 0.94,
      "circle-radius": ["interpolate", ["linear"], ["get", "intensityRank"], 1, 4, 5, 6.5, 9, 9],
      "circle-stroke-color": "#ffffff",
      "circle-stroke-opacity": 0.9,
      "circle-stroke-width": 1.1,
    },
  });
  updateLayerVisibility("shindo-station-points", state.showStationLayer);
}

function addLayerIfMissing(layer) {
  if (!map.getLayer(layer.id)) {
    map.addLayer(layer);
  }
}

function updateLayerVisibility(layerId, visible) {
  if (map?.getLayer(layerId)) {
    map.setLayoutProperty(layerId, "visibility", visible ? "visible" : "none");
  }
}

function fitInitialMapBounds(bounds) {
  if (!bounds) {
    return;
  }

  map.fitBounds(bounds, {
    padding: 8,
    duration: 0,
  });

  map.setZoom(Math.min(map.getZoom() + 0.9, map.getMaxZoom()));
}

function scheduleLocationResolve() {
  window.clearTimeout(locationResolveTimer);
  locationResolveTimer = window.setTimeout(() => {
    updateEpicenter({ resolveLocation: true });
  }, 180);
}

function updateEpicenterEditMode() {
  state.epicenterEditEnabled = els.epicenterEditToggle.checked;

  if (map) {
    map.getCanvas().classList.toggle("epicenter-edit-enabled", state.epicenterEditEnabled);
  }

  if (epicenterMarker) {
    epicenterMarker.setDraggable(state.epicenterEditEnabled);
  }
}

function updateDisplayMode() {
  state.showStationLayer = els.stationLayerToggle.checked;
  state.showRegionLayer = els.regionLayerToggle.checked;
  updateLayerVisibility("shindo-station-points", state.showStationLayer);
  updateLayerVisibility("jma-intensity-fill", state.showRegionLayer);
}

async function loadMunicipalities() {
  if (municipalityData) {
    return municipalityData;
  }

  if (!municipalityLoadPromise) {
    municipalityLoadPromise = fetchJson(MUNICIPALITIES_URL, "Municipality GeoJSON");
  }

  municipalityData = await municipalityLoadPromise;
  return municipalityData;
}

async function loadBoundaryLayers() {
  if (boundaryData) {
    return boundaryData;
  }

  if (!boundaryLoadPromise) {
    boundaryLoadPromise = fetchJson(BOUNDARY_LAYERS_URL, "Boundary GeoJSON");
  }

  boundaryData = await boundaryLoadPromise;
  return boundaryData;
}

async function loadLocalAreas() {
  if (localAreaData) {
    return localAreaData;
  }

  if (!localAreaLoadPromise) {
    localAreaLoadPromise = fetchJson(JMA_LOCAL_AREAS_URL, "JMA local area GeoJSON");
  }

  localAreaData = await localAreaLoadPromise;
  return localAreaData;
}

async function loadSeaEpicenterAreas() {
  if (seaEpicenterData) {
    return seaEpicenterData;
  }

  if (!seaEpicenterLoadPromise) {
    seaEpicenterLoadPromise = fetchJson(SEA_EPICENTER_AREAS_URL, "Sea epicenter area GeoJSON");
  }

  seaEpicenterData = await seaEpicenterLoadPromise;
  return seaEpicenterData;
}

async function loadSurroundingLand() {
  if (surroundingLandData) {
    return surroundingLandData;
  }

  if (!surroundingLandLoadPromise) {
    surroundingLandLoadPromise = fetchJson(SURROUNDING_LAND_URL, "Surrounding land GeoJSON");
  }

  surroundingLandData = await surroundingLandLoadPromise;
  return surroundingLandData;
}

async function loadGroundModel() {
  if (groundModelData) {
    return groundModelData;
  }

  if (!groundModelLoadPromise) {
    groundModelLoadPromise = fetchJson(GROUND_MODEL_URL, "J-SHIS ground model");
  }

  groundModelData = await groundModelLoadPromise;
  return groundModelData;
}

async function loadShindoStations() {
  if (shindoStationData) {
    return shindoStationData;
  }

  if (!shindoStationLoadPromise) {
    shindoStationLoadPromise = fetchJson(SHINDO_STATIONS_URL, "JMA shindo stations");
  }

  shindoStationData = await shindoStationLoadPromise;
  return shindoStationData;
}

async function fetchJson(url, label) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${label} request failed: ${response.status}`);
  }

  return response.json();
}

function withoutInteriorRings(geojson) {
  return {
    ...geojson,
    features: geojson.features.map((feature) => ({
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates:
          feature.geometry.type === "MultiPolygon"
            ? feature.geometry.coordinates.map((polygon) => [polygon[0]])
            : [feature.geometry.coordinates[0]],
      },
    })),
  };
}

function updateStateFromInputs(options = {}) {
  state.latitude = clamp(Number(els.latitude.value), 20, 47);
  state.longitude = clamp(Number(els.longitude.value), 117, 154);
  state.depthKm = clamp(Number(els.depth.value), 0, 500);
  state.magnitude = clamp(Number(els.magnitude.value), 0, 10);
  updateEpicenter();

  if (options.resolveLocation) {
    scheduleLocationResolve();
  }
}

function syncInputs() {
  els.latitude.value = state.latitude.toFixed(3);
  els.longitude.value = state.longitude.toFixed(3);
  els.depth.value = String(state.depthKm);
  els.magnitude.value = state.magnitude.toFixed(1);
  els.epicenterRegion.value = state.epicenterName;
  els.municipalityOutput.textContent = state.municipalityName;
  els.maxIntensityOutput.textContent = state.maxIntensityLabel;
  els.stationLayerToggle.checked = state.showStationLayer;
  els.regionLayerToggle.checked = state.showRegionLayer;
}

async function updateEpicenter(options = {}) {
  if (!map) {
    return;
  }

  if (options.resolveLocation) {
    await updateLocationNames();
  }

  updateIntensityLayer();
  syncInputs();
  const lngLat = [state.longitude, state.latitude];

  if (!epicenterMarker) {
    const markerElement = document.createElement("span");
    markerElement.className = "epicenter-marker-shell";
    markerElement.innerHTML = '<span class="epicenter-marker"></span>';

    epicenterMarker = new maplibregl.Marker({
      element: markerElement,
      draggable: state.epicenterEditEnabled,
    })
      .setLngLat(lngLat)
      .addTo(map);

    epicenterMarker.on("dragend", () => {
      const markerLngLat = epicenterMarker.getLngLat();
      state.latitude = Number(markerLngLat.lat.toFixed(3));
      state.longitude = Number(markerLngLat.lng.toFixed(3));
      syncInputs();
      updateEpicenter({ resolveLocation: true });
    });
    updateEpicenterEditMode();
  }

  epicenterMarker
    .setLngLat(lngLat)
    .setPopup(
      new maplibregl.Popup({ offset: 24 }).setHTML(
        [
          `${escapeHtml(state.epicenterName)}`,
          `M ${state.magnitude.toFixed(1)}`,
          `深さ ${formatDepth(state.depthKm)}`,
          `最大震度 ${escapeHtml(state.maxIntensityLabel)}`,
          `${state.latitude.toFixed(3)}, ${state.longitude.toFixed(3)}`,
        ].join("<br>"),
      ),
    );
}

async function updateLocationNames() {
  try {
    const [municipalities, localAreas, seaAreas] = await Promise.all([
      loadMunicipalities(),
      loadLocalAreas(),
      loadSeaEpicenterAreas(),
    ]);
    const municipality = findFeatureAtPoint(municipalities, state.longitude, state.latitude);
    const localArea = municipality
      ? findFeatureAtPoint(localAreas, state.longitude, state.latitude)
      : null;
    const seaArea = municipality
      ? null
      : findFeatureAtPoint(seaAreas, state.longitude, state.latitude) ??
        findNearestSeaArea(seaAreas, state.longitude, state.latitude);

    state.municipalityName = municipality ? municipality.properties.name : "該当なし";
    state.epicenterName = localArea
      ? localArea.properties.name
      : seaArea
        ? seaArea.properties.name
        : "未判定";
  } catch (error) {
    state.municipalityName = "判定できません";
    state.epicenterName = "判定できません";
    console.warn(error);
  }

  els.epicenterRegion.value = state.epicenterName;
  els.municipalityOutput.textContent = state.municipalityName;
}

function updateIntensityLayer() {
  if (!map || !localAreaData) {
    return;
  }

  if (map.getSource("shindo-stations") && shindoStationData) {
    map.getSource("shindo-stations").setData(buildStationIntensityData(shindoStationData));
  }

  if (map.getSource("jma-local-areas")) {
    map.getSource("jma-local-areas").setData(buildIntensityAreaData(localAreaData));
  }
}

function buildIntensityAreaData(geojson) {
  const stationFeatures = shindoStationData ? buildStationIntensityFeatures(shindoStationData) : [];
  let maxClass = INTENSITY_CLASSES[0];
  let maxValue = 0;

  const features = geojson.features.map((feature) => {
    const areaStations = stationFeatures.filter((stationFeature) =>
      getFeaturePolygons(feature).some((polygon) =>
        pointInPolygon(stationFeature.geometry.coordinates, polygon),
      ),
    );
    const intensityValue =
      areaStations.length > 0
        ? Math.max(...areaStations.map((stationFeature) => stationFeature.properties.intensityValue))
        : estimateMaxIntensityForFeature(feature);
    const intensityClass = toJmaIntensityClass(intensityValue);

    if (intensityClass.rank > maxClass.rank || intensityValue > maxValue) {
      maxClass = intensityClass;
      maxValue = intensityValue;
    }

    return {
      ...feature,
      properties: {
        ...feature.properties,
        intensityValue: Number(intensityValue.toFixed(2)),
        intensityLabel: intensityClass.label,
        intensityRank: intensityClass.rank,
        intensityColor: intensityClass.color,
      },
    };
  });

  state.maxIntensityLabel = `${maxClass.label}（計測震度 ${maxValue.toFixed(1)}）`;

  return {
    ...geojson,
    name: "JMA local areas with representative maximum intensity",
    features,
  };
}

function buildStationIntensityData(data) {
  return {
    type: "FeatureCollection",
    name: "Observed JMA shindo stations with estimated intensity",
    source: data.source,
    updated: data.updated,
    features: buildStationIntensityFeatures(data).filter(
      (feature) => feature.properties.intensityRank >= 1,
    ),
  };
}

function buildStationIntensityFeatures(data) {
  return data.stations
    .filter((station) => station.active)
    .map((station) => {
      const intensityValue = estimateIntensityAtPoint(station.longitude, station.latitude);
      const intensityClass = toJmaIntensityClass(intensityValue);
      return {
        type: "Feature",
        properties: {
          id: station.id,
          name: station.name,
          areaName: station.areaName,
          address: station.address,
          intensityValue: Number(intensityValue.toFixed(2)),
          intensityLabel: intensityClass.label,
          intensityRank: intensityClass.rank,
          intensityColor: intensityClass.color,
        },
        geometry: {
          type: "Point",
          coordinates: [station.longitude, station.latitude],
        },
      };
    });
}

function estimateMaxIntensityForFeature(feature) {
  const epicenter = [state.longitude, state.latitude];
  const nearestPoint = getNearestPointOnFeature(epicenter, feature);
  return estimateIntensityAtPoint(nearestPoint.point[0], nearestPoint.point[1], nearestPoint.distanceKm);
}

function estimateIntensityAtPoint(longitude, latitude, knownEpicentralDistanceKm = null) {
  const epicenter = [state.longitude, state.latitude];
  const epicentralDistanceKm =
    knownEpicentralDistanceKm ?? haversineKilometers(epicenter, [longitude, latitude]);
  const hypocentralDistanceKm = Math.hypot(epicentralDistanceKm, state.depthKm);
  const ground = getGroundModelAt(longitude, latitude);

  return estimateInstrumentalIntensity({
    magnitude: state.magnitude,
    hypocentralDistanceKm,
    siteAmplification: ground?.intensityAmplification ?? EARTHQUAKE_MODEL.defaultSiteAmplification,
  });
}

function estimateInstrumentalIntensity({
  magnitude,
  hypocentralDistanceKm,
  siteAmplification = EARTHQUAKE_MODEL.defaultSiteAmplification,
}) {
  const distance = Math.max(hypocentralDistanceKm, 1);
  return clamp(
    1.55 * magnitude -
      2.05 * Math.log10(distance + 20) -
      0.0028 * distance +
      siteAmplification -
      1.2,
    0,
    7,
  );
}

function toJmaIntensityClass(instrumentalIntensity) {
  for (let index = INTENSITY_CLASSES.length - 1; index >= 0; index -= 1) {
    if (instrumentalIntensity >= INTENSITY_CLASSES[index].min) {
      return INTENSITY_CLASSES[index];
    }
  }

  return INTENSITY_CLASSES[0];
}

function getGroundModelAt(longitude, latitude) {
  if (!groundModelData?.meshes) {
    return null;
  }

  const code = meshCode1km(longitude, latitude);
  const values = groundModelData.meshes[code];
  if (!values) {
    return null;
  }

  const [arv, avs, s0, maxDepthM] = values;
  return {
    code,
    arv,
    avs,
    s0,
    maxDepthM,
    intensityAmplification: arvToIntensityAmplification(arv),
  };
}

function arvToIntensityAmplification(arv) {
  if (!Number.isFinite(arv) || arv <= 0) {
    return EARTHQUAKE_MODEL.defaultSiteAmplification;
  }

  // ARV is a peak velocity amplification factor. JMA instrumental intensity is
  // logarithmic, so use a modest log10 correction to avoid over-amplifying.
  return clamp(0.9 * Math.log10(arv), -0.35, 0.55);
}

function meshCode1km(longitude, latitude) {
  const latBase = Math.floor(latitude * 1.5);
  const lonBase = Math.floor(longitude) - 100;
  const latRemainder = latitude - latBase / 1.5;
  const lonRemainder = longitude - Math.floor(longitude);
  const latSecond = clamp(Math.floor(latRemainder / (5 / 60)), 0, 7);
  const lonSecond = clamp(Math.floor(lonRemainder / (7.5 / 60)), 0, 7);
  const latThirdRemainder = latRemainder - latSecond * (5 / 60);
  const lonThirdRemainder = lonRemainder - lonSecond * (7.5 / 60);
  const latThird = clamp(Math.floor(latThirdRemainder / (30 / 3600)), 0, 9);
  const lonThird = clamp(Math.floor(lonThirdRemainder / (45 / 3600)), 0, 9);

  return `${String(latBase).padStart(2, "0")}${String(lonBase).padStart(2, "0")}${latSecond}${lonSecond}${latThird}${lonThird}`;
}

function formatDepth(depthKm) {
  return depthKm === 0 ? "ごく浅い" : `${depthKm} km`;
}

function findFeatureAtPoint(geojson, longitude, latitude) {
  return geojson.features.find((feature) =>
    getFeaturePolygons(feature).some((polygon) => pointInPolygon([longitude, latitude], polygon)),
  );
}

function findNearestSeaArea(geojson, longitude, latitude) {
  const point = [longitude, latitude];
  let nearestFeature = null;
  let nearestDistance = Infinity;

  geojson.features.forEach((feature) => {
    const distance = getFeaturePolygons(feature).reduce(
      (minimum, polygon) => Math.min(minimum, distanceToPolygonKilometers(point, polygon)),
      Infinity,
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestFeature = feature;
    }
  });

  return nearestFeature;
}

function getFeaturePolygons(feature) {
  if (feature.geometry.type === "Polygon") {
    return [feature.geometry.coordinates];
  }

  if (feature.geometry.type === "MultiPolygon") {
    return feature.geometry.coordinates;
  }

  return [];
}

function pointInPolygon(point, polygon) {
  return pointInRing(point, polygon[0]) && polygon.slice(1).every((ring) => !pointInRing(point, ring));
}

function distanceToPolygonKilometers(point, polygon) {
  if (pointInPolygon(point, polygon)) {
    return 0;
  }

  return polygon.reduce(
    (minimum, ring) => Math.min(minimum, distanceToRingKilometers(point, ring)),
    Infinity,
  );
}

function getNearestPointOnFeature(point, feature) {
  let nearest = {
    point,
    distanceKm: Infinity,
  };

  for (const polygon of getFeaturePolygons(feature)) {
    const candidate = getNearestPointOnPolygon(point, polygon);
    if (candidate.distanceKm < nearest.distanceKm) {
      nearest = candidate;
    }
  }

  return nearest.distanceKm === Infinity ? { point, distanceKm: 0 } : nearest;
}

function getNearestPointOnPolygon(point, polygon) {
  if (pointInPolygon(point, polygon)) {
    return { point, distanceKm: 0 };
  }

  let nearest = {
    point,
    distanceKm: Infinity,
  };

  for (const ring of polygon) {
    for (let index = 0; index < ring.length - 1; index += 1) {
      const candidate = nearestPointOnSegmentKilometers(point, ring[index], ring[index + 1]);
      if (candidate.distanceKm < nearest.distanceKm) {
        nearest = candidate;
      }
    }
  }

  return nearest;
}

function distanceToRingKilometers(point, ring) {
  let minimum = Infinity;

  for (let index = 0; index < ring.length - 1; index += 1) {
    minimum = Math.min(
      minimum,
      distanceToSegmentKilometers(point, ring[index], ring[index + 1]),
    );
  }

  return minimum;
}

function distanceToSegmentKilometers(point, start, end) {
  return nearestPointOnSegmentKilometers(point, start, end).distanceKm;
}

function nearestPointOnSegmentKilometers(point, start, end) {
  const startPoint = toLocalKilometers(start, point);
  const endPoint = toLocalKilometers(end, point);
  const segmentX = endPoint[0] - startPoint[0];
  const segmentY = endPoint[1] - startPoint[1];
  const segmentLengthSquared = segmentX * segmentX + segmentY * segmentY;

  if (segmentLengthSquared === 0) {
    return {
      point: start,
      distanceKm: Math.hypot(startPoint[0], startPoint[1]),
    };
  }

  const t = clamp(
    -((startPoint[0] * segmentX + startPoint[1] * segmentY) / segmentLengthSquared),
    0,
    1,
  );
  const nearestPoint = [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t,
  ];

  return {
    point: nearestPoint,
    distanceKm: Math.hypot(startPoint[0] + segmentX * t, startPoint[1] + segmentY * t),
  };
}

function toLocalKilometers(coordinate, origin) {
  const latitudeScale = 110.57;
  const longitudeScale = 111.32 * Math.cos((origin[1] * Math.PI) / 180);

  return [
    (coordinate[0] - origin[0]) * longitudeScale,
    (coordinate[1] - origin[1]) * latitudeScale,
  ];
}

function haversineKilometers(start, end) {
  const earthRadiusKm = 6371;
  const startLat = toRadians(start[1]);
  const endLat = toRadians(end[1]);
  const deltaLat = toRadians(end[1] - start[1]);
  const deltaLon = toRadians(end[0] - start[0]);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(startLat) * Math.cos(endLat) * Math.sin(deltaLon / 2) ** 2;

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function pointInRing(point, ring) {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersects =
      yi > point[1] !== yj > point[1] &&
      point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

function getGeoJsonBounds(geojson) {
  const bounds = {
    west: Infinity,
    south: Infinity,
    east: -Infinity,
    north: -Infinity,
  };

  geojson.features.forEach((feature) => {
    forEachCoordinate(feature.geometry.coordinates, (coordinate) => {
      bounds.west = Math.min(bounds.west, coordinate[0]);
      bounds.south = Math.min(bounds.south, coordinate[1]);
      bounds.east = Math.max(bounds.east, coordinate[0]);
      bounds.north = Math.max(bounds.north, coordinate[1]);
    });
  });

  if (!Number.isFinite(bounds.west)) {
    return null;
  }

  return [
    [bounds.west, bounds.south],
    [bounds.east, bounds.north],
  ];
}

function forEachCoordinate(coordinates, callback) {
  if (typeof coordinates[0] === "number") {
    callback(coordinates);
    return;
  }

  coordinates.forEach((item) => forEachCoordinate(item, callback));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}
