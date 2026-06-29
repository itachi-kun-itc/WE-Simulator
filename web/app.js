const JMA_EARTHQUAKE_AREAS_URL = "./data/jma_earthquake_areas.geojson";
const MUNICIPALITIES_URL = "./data/municipalities.geojson";
const BOUNDARY_LAYERS_URL = "./data/boundary_layers.geojson";
const INITIAL_ZOOM_OFFSET = 1;
const MUNICIPALITY_BOUNDARY_MIN_ZOOM = 8;

const REGIONS = [
  { name: "北海道", color: "#62d8ff", codes: ["01"] },
  { name: "東北", color: "#5cffb1", codes: ["02", "03", "04", "05", "06", "07"] },
  { name: "関東", color: "#fff06a", codes: ["08", "09", "10", "11", "12", "13", "14"] },
  {
    name: "中部",
    color: "#ffb85c",
    codes: ["15", "16", "17", "18", "19", "20", "21", "22", "23"],
  },
  { name: "近畿", color: "#ff7f73", codes: ["24", "25", "26", "27", "28", "29", "30"] },
  { name: "中国", color: "#cfa7ff", codes: ["31", "32", "33", "34", "35"] },
  { name: "四国", color: "#78a8ff", codes: ["36", "37", "38", "39"] },
  { name: "九州", color: "#ff77c8", codes: ["40", "41", "42", "43", "44", "45", "46"] },
  { name: "沖縄", color: "#8ef6e4", codes: ["47"] },
];

const EPICENTER_GROUPS = [
  "北海道地方",
  "東北地方",
  "関東地方",
  "北陸地方",
  "東海地方",
  "近畿地方",
  "中国地方",
  "四国地方",
  "九州地方",
  "沖縄地方",
  "日本海側の海域",
  "太平洋側の海域",
  "南西諸島周辺",
  "その他の海域・国外",
];

const FALLBACK_FEATURES = {
  type: "FeatureCollection",
  features: [
    regionFeature("北海道", "01", [
      [140.2, 41.4],
      [145.9, 42.8],
      [144.5, 45.6],
      [141.1, 45.4],
      [139.4, 43.2],
      [140.2, 41.4],
    ]),
    regionFeature("東北", "02", [
      [139.4, 37.0],
      [141.8, 37.3],
      [142.1, 41.5],
      [140.0, 41.6],
      [139.4, 37.0],
    ]),
    regionFeature("関東", "08", [
      [138.3, 34.8],
      [140.9, 35.0],
      [141.0, 36.9],
      [138.9, 37.2],
      [138.3, 34.8],
    ]),
    regionFeature("中部", "15", [
      [136.0, 34.4],
      [139.2, 34.8],
      [138.9, 38.0],
      [136.2, 37.3],
      [136.0, 34.4],
    ]),
    regionFeature("近畿", "24", [
      [134.6, 33.7],
      [136.8, 33.9],
      [136.6, 35.7],
      [134.8, 35.5],
      [134.6, 33.7],
    ]),
    regionFeature("中国", "31", [
      [130.8, 33.8],
      [134.9, 33.8],
      [134.6, 35.6],
      [131.0, 35.3],
      [130.8, 33.8],
    ]),
    regionFeature("四国", "36", [
      [132.0, 32.8],
      [134.8, 33.0],
      [134.3, 34.4],
      [132.0, 34.2],
      [132.0, 32.8],
    ]),
    regionFeature("九州", "40", [
      [129.4, 30.9],
      [132.0, 31.3],
      [131.8, 34.0],
      [129.5, 33.7],
      [129.4, 30.9],
    ]),
    regionFeature("沖縄", "47", [
      [123.5, 24.0],
      [128.4, 24.0],
      [128.4, 27.2],
      [123.5, 27.2],
      [123.5, 24.0],
    ]),
  ],
};

const state = {
  latitude: 35.681,
  longitude: 139.767,
  depthKm: 30,
  magnitude: 6.0,
  magnitudeType: "Mj",
  epicenterGroup: EPICENTER_GROUPS[2],
};

const regionByCode = new Map(
  REGIONS.flatMap((region) => region.codes.map((code) => [code, region])),
);

const els = {
  status: document.querySelector("#map-status"),
  epicenterRegion: document.querySelector("#epicenter-region"),
  latitude: document.querySelector("#latitude-input"),
  longitude: document.querySelector("#longitude-input"),
  depth: document.querySelector("#depth-input"),
  magnitude: document.querySelector("#magnitude-input"),
  magnitudeType: document.querySelector("#magnitude-type"),
  municipalityToggle: document.querySelector("#municipality-toggle"),
  municipalityOutput: document.querySelector("#municipality-output"),
  radiusOutput: document.querySelector("#radius-output"),
  resetEpicenter: document.querySelector("#reset-epicenter"),
};

let map;
let epicenterMarker;
let impactCircle;
let municipalityLayer;
let boundaryLayer;
let municipalityData;
let municipalityLoadPromise;
let boundaryData;
let boundaryLoadPromise;
let municipalityBoundariesVisible;

setupTabs();
renderEpicenterOptions();
bindSimulationControls();
initEarthquakeMap();

function setupTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("panel-active"));

      tab.classList.add("active");
      document.querySelector(`#${tab.dataset.panel}`).classList.add("panel-active");

      if (tab.dataset.panel === "earthquake-panel" && map) {
        requestAnimationFrame(() => map.invalidateSize());
      }
    });
  });
}

function renderEpicenterOptions() {
  els.epicenterRegion.replaceChildren(
    ...EPICENTER_GROUPS.map((group) => {
      const option = document.createElement("option");
      option.value = group;
      option.textContent = group;
      return option;
    }),
  );
}

function bindSimulationControls() {
  els.latitude.addEventListener("input", () => updateStateFromInputs());
  els.longitude.addEventListener("input", () => updateStateFromInputs());
  els.depth.addEventListener("input", () => updateStateFromInputs());
  els.magnitude.addEventListener("input", () => updateStateFromInputs());
  els.magnitudeType.addEventListener("change", () => updateStateFromInputs());
  els.epicenterRegion.addEventListener("change", () => updateStateFromInputs());

  els.resetEpicenter.addEventListener("click", () => {
    state.latitude = 35.681;
    state.longitude = 139.767;
    state.depthKm = 30;
    state.magnitude = 6.0;
    state.magnitudeType = "Mj";
    state.epicenterGroup = EPICENTER_GROUPS[2];
    syncInputs();
    updateEpicenter();
    map.setView([state.latitude, state.longitude], 6);
  });

  els.municipalityToggle.addEventListener("change", async () => {
    if (els.municipalityToggle.checked) {
      await showMunicipalities();
    } else if (municipalityLayer) {
      map.removeLayer(municipalityLayer);
      if (boundaryLayer) {
        map.removeLayer(boundaryLayer);
      }
    }

    updateMunicipalityOutput();
  });

  syncInputs();
}

async function initEarthquakeMap() {
  map = L.map("map", {
    attributionControl: true,
    zoomControl: true,
    scrollWheelZoom: true,
    preferCanvas: true,
    minZoom: 4,
    maxZoom: 10,
  });

  map.on("click", (event) => {
    state.latitude = Number(event.latlng.lat.toFixed(3));
    state.longitude = Number(event.latlng.lng.toFixed(3));
    syncInputs();
    updateEpicenter();
  });
  map.on("zoomend", () => {
    updateMunicipalityLayerStyle();
    keepBoundaryLayersOnTop();
  });

  els.municipalityToggle.checked = true;

  try {
    await showMunicipalities({ fitBounds: true });
    els.status.textContent = "市町村区分地図を表示中";
    map.attributionControl.addAttribution(
      '<a href="https://nlftp.mlit.go.jp/ksj/" target="_blank" rel="noreferrer">国土数値情報</a>',
    );
  } catch (error) {
    drawEarthquakeAreas(FALLBACK_FEATURES);
    els.status.textContent = "市町村地図データの読み込みに失敗。簡易地図を表示中";
    console.warn(error);
  }

  updateEpicenter();
}

function drawEarthquakeAreas(geojson) {
  const layer = L.geoJSON(geojson, {
    style: (feature) => {
      const region = getRegion(feature);
      return {
        color: "#d7fbff",
        fillColor: region.color,
        fillOpacity: 0.42,
        opacity: 0.68,
        weight: 1,
      };
    },
    onEachFeature: (feature, layerItem) => {
      const region = getRegion(feature);
      const areaName = feature.properties.name ?? region.name;
      layerItem.bindTooltip(`${areaName} / ${region.name}`, {
        direction: "top",
        sticky: true,
      });
    },
  }).addTo(map);

  map.fitBounds(layer.getBounds(), {
    padding: [18, 18],
  });
}

async function showMunicipalities(options = {}) {
  municipalityData = await loadMunicipalities();

  if (municipalityLayer) {
    municipalityLayer.addTo(map);
    await showBoundaryLayers();
    if (options.fitBounds) {
      fitInitialMapBounds(municipalityLayer.getBounds());
    }
    return;
  }

  municipalityLayer = L.geoJSON(municipalityData, {
    style: () => municipalityStyle(),
    onEachFeature: (feature, layerItem) => {
      layerItem.bindTooltip(feature.properties.name, {
        direction: "top",
        sticky: true,
      });
    },
  }).addTo(map);

  await showBoundaryLayers();

  if (options.fitBounds) {
    fitInitialMapBounds(municipalityLayer.getBounds());
  }
}

function fitInitialMapBounds(bounds) {
  map.fitBounds(bounds, {
    padding: [8, 8],
  });

  map.setZoom(Math.min(map.getZoom() + INITIAL_ZOOM_OFFSET, map.getMaxZoom()));
}

function municipalityStyle() {
  const showBoundaries = map && map.getZoom() >= MUNICIPALITY_BOUNDARY_MIN_ZOOM;

  return {
    color: "#ffffff",
    fillColor: "#8c9298",
    fillOpacity: 0.94,
    opacity: showBoundaries ? 0.58 : 0,
    weight: showBoundaries ? 0.42 : 0,
  };
}

function updateMunicipalityLayerStyle() {
  if (!municipalityLayer) {
    return;
  }

  const shouldShow = map.getZoom() >= MUNICIPALITY_BOUNDARY_MIN_ZOOM;
  if (municipalityBoundariesVisible === shouldShow) {
    return;
  }

  municipalityBoundariesVisible = shouldShow;
  municipalityLayer.setStyle(() => municipalityStyle());
}

async function showBoundaryLayers() {
  boundaryData = await loadBoundaryLayers();

  if (boundaryLayer) {
    boundaryLayer.addTo(map);
    keepBoundaryLayersOnTop();
    return;
  }

  boundaryLayer = L.geoJSON(boundaryData, {
    style: (feature) => {
      if (feature.properties.layer === "jma_region") {
        return {
          color: "#111827",
          opacity: 0.94,
          weight: 2.6,
        };
      }

      return {
        color: "#ffffff",
        opacity: 0.92,
        weight: 1.35,
      };
    },
    interactive: false,
  }).addTo(map);
  keepBoundaryLayersOnTop();
}

function keepBoundaryLayersOnTop() {
  if (boundaryLayer) {
    boundaryLayer.bringToFront();
  }
}

async function loadMunicipalities() {
  if (municipalityData) {
    return municipalityData;
  }

  if (!municipalityLoadPromise) {
    municipalityLoadPromise = fetch(MUNICIPALITIES_URL).then((response) => {
      if (!response.ok) {
        throw new Error(`Municipality GeoJSON request failed: ${response.status}`);
      }

      return response.json();
    });
  }

  municipalityData = await municipalityLoadPromise;
  return municipalityData;
}

async function loadBoundaryLayers() {
  if (boundaryData) {
    return boundaryData;
  }

  if (!boundaryLoadPromise) {
    boundaryLoadPromise = fetch(BOUNDARY_LAYERS_URL).then((response) => {
      if (!response.ok) {
        throw new Error(`Boundary GeoJSON request failed: ${response.status}`);
      }

      return response.json();
    });
  }

  boundaryData = await boundaryLoadPromise;
  return boundaryData;
}

function updateStateFromInputs() {
  state.latitude = clamp(Number(els.latitude.value), 20, 46);
  state.longitude = clamp(Number(els.longitude.value), 122, 154);
  state.depthKm = clamp(Number(els.depth.value), 0, 700);
  state.magnitude = clamp(Number(els.magnitude.value), 1, 9.5);
  state.magnitudeType = els.magnitudeType.value;
  state.epicenterGroup = els.epicenterRegion.value;
  updateEpicenter();
}

function syncInputs() {
  els.latitude.value = state.latitude.toFixed(3);
  els.longitude.value = state.longitude.toFixed(3);
  els.depth.value = String(state.depthKm);
  els.magnitude.value = state.magnitude.toFixed(1);
  els.magnitudeType.value = state.magnitudeType;
  els.epicenterRegion.value = state.epicenterGroup;
}

function updateEpicenter() {
  if (!map) {
    return;
  }

  const latLng = [state.latitude, state.longitude];
  const radiusMeters = estimateImpactRadiusKm(state.magnitude, state.depthKm) * 1000;
  const popupText = [
    `${state.epicenterGroup}`,
    `${state.magnitudeType} ${state.magnitude.toFixed(1)}`,
    `深さ ${state.depthKm} km`,
    `${state.latitude.toFixed(3)}, ${state.longitude.toFixed(3)}`,
  ].join("<br>");

  if (!epicenterMarker) {
    epicenterMarker = L.marker(latLng, {
      draggable: true,
      icon: L.divIcon({
        className: "",
        html: '<span class="epicenter-marker"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    }).addTo(map);

    epicenterMarker.on("dragend", () => {
      const markerLatLng = epicenterMarker.getLatLng();
      state.latitude = Number(markerLatLng.lat.toFixed(3));
      state.longitude = Number(markerLatLng.lng.toFixed(3));
      syncInputs();
      updateEpicenter();
    });
  }

  epicenterMarker.setLatLng(latLng).bindPopup(popupText);

  if (!impactCircle) {
    impactCircle = L.circle(latLng, {
      color: "#ff3b5f",
      fillColor: "#ff3b5f",
      fillOpacity: 0.12,
      opacity: 0.72,
      weight: 2,
    }).addTo(map);
  }

  impactCircle.setLatLng(latLng).setRadius(radiusMeters);
  els.radiusOutput.textContent = `${Math.round(radiusMeters / 1000)} km`;
  updateMunicipalityOutput();
}

async function updateMunicipalityOutput() {
  if (!municipalityData && !els.municipalityToggle.checked) {
    els.municipalityOutput.textContent = "市町村区分を表示すると判定します";
    return;
  }

  try {
    const data = await loadMunicipalities();
    const feature = findFeatureAtPoint(data, state.longitude, state.latitude);
    els.municipalityOutput.textContent = feature ? feature.properties.name : "海域または区域外";
  } catch (error) {
    els.municipalityOutput.textContent = "判定できません";
    console.warn(error);
  }
}

function estimateImpactRadiusKm(magnitude, depthKm) {
  const base = 10 ** (0.48 * magnitude - 1.15);
  const depthFactor = 1 + Math.min(depthKm, 300) / 450;
  return clamp(base * depthFactor, 8, 900);
}

function findFeatureAtPoint(geojson, longitude, latitude) {
  return geojson.features.find((feature) =>
    feature.geometry.coordinates.some((polygon) => pointInPolygon([longitude, latitude], polygon)),
  );
}

function pointInPolygon(point, polygon) {
  return pointInRing(point, polygon[0]) && polygon.slice(1).every((ring) => !pointInRing(point, ring));
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

function getRegion(feature) {
  return regionByCode.get(String(feature.properties.code).padStart(2, "0")) ?? REGIONS[0];
}

function regionFeature(name, code, coordinates) {
  return {
    type: "Feature",
    properties: { name, code },
    geometry: {
      type: "Polygon",
      coordinates: [coordinates],
    },
  };
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}
