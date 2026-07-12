const JMA_LOCAL_AREAS_URL = "./data/jma_local_areas_simplified_10.geojson";
const JMA_EEW_FORECAST_AREAS_URL = "./data/jma_eew_forecast_areas.json";
const JMA_EPICENTER_AREAS_URL = "./data/jma_epicenter_areas.geojson";
const PLATE_BOUNDARIES_URL = "./data/plate_boundaries.geojson";
const ACTIVE_FAULT_SEGMENTS_URL = "./data/activefault_japan_segments.geojson";
const SUBMARINE_OBSERVATION_POINTS_URL = "./data/submarine_observation_points.geojson";
const SURROUNDING_LAND_URL = "./data/surrounding_land.geojson";
const WORLD_COASTLINE_URL = "./data/world_coastline.geojson";
const JAPAN_COASTLINE_LINES_URL = "./data/japan_coastline_lines.geojson";
const MUNICIPALITY_BOUNDARIES_URL = "./data/japan_municipalities_simplified_50.geojson";
const PREFECTURE_BOUNDARY_LINES_URL = "./data/prefecture_boundaries_lines.geojson";
const JMA_LOCAL_AREA_BOUNDARY_LINES_URL = "./data/jma_local_area_boundaries_lines.geojson";
const MUNICIPALITY_BOUNDARY_LINES_URL = "./data/municipality_boundaries_lines.geojson";
const JAPAN_PMTILES_LOCAL_URL = "./map/japan.pmtiles";
const JAPAN_PMTILES_R2_URL = "https://we-simulator-push.h6fgpg2zht.workers.dev/map/japan.pmtiles";
const LOCAL_DEV_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);
const IS_LOCAL_DEV = LOCAL_DEV_HOSTNAMES.has(window.location.hostname);
const JAPAN_PMTILES_URL = IS_LOCAL_DEV
  ? JAPAN_PMTILES_LOCAL_URL
  : JAPAN_PMTILES_R2_URL;
const JAPAN_PMTILES_SOURCE_LAYER_PREF = "pref";
const JAPAN_PMTILES_SOURCE_LAYER_EQ_AREA = "eq_area";
const JAPAN_PMTILES_BYTE_SERVING_RECOVERY_KEY = "ws_pmtiles_byte_serving_recovered";
const JAPAN_PMTILES_BYTE_SERVING_PROBE_TIMEOUT_MS = 1200;
const GROUND_MODEL_URL = "./data/ground_model.json";
const SHINDO_STATIONS_URL = "./data/jma_shindo_stations.json";
const FEEDBACK_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1cmR_OGml5ngLuq0zAi_gAs_qgrBNqTSlWZ5-H7tLWV0/edit?usp=sharing";
const FEEDBACK_ENDPOINT_URL =
  "https://script.google.com/macros/s/AKfycbztrmCH_ukdLtY6xUKNSZQWShY0ziCT_8HMm7QI-qtSFRviETHw_APJJhyV50hSRvMy3A/exec";
const PUSH_CONFIG_URL = "./push-config.json";
const EARTHQUAKE_STATISTICS_FALLBACK_URL = "./data/earthquake_statistics.json";
const USGS_EARTHQUAKE_QUERY_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query";
const ADMIN_PARENT_TOKEN_KEY = "weather-earthquake-admin-parent-token";
const NOTIFICATION_HISTORY_READ_IDS_KEY = "weather-earthquake-notification-history-read-ids";
const NOTIFICATION_HISTORY_DB_NAME = "we-simulator-notification-history";
const NOTIFICATION_HISTORY_DB_VERSION = 1;
const NOTIFICATION_HISTORY_STORE_NAME = "notifications";
const NOTIFICATION_HISTORY_LIMIT = 80;
const NOTIFICATION_HISTORY_RETENTION_DAYS = 30;
const NOTIFICATION_HISTORY_BACKFILL_KEY = "weather-earthquake-notification-history-backfill-v1";
const LEGACY_NOTIFICATION_HISTORY_ITEMS = [
  {
    id: "legacy-2026-07-08-1700-feature-update",
    title: "機能更新について",
    body: "・地震プリセットを5つ追加\n・出典のリンク先を詳細に明記\n・その他細かな改善を行いました。",
    createdAt: "2026-07-08T08:00:00.000Z",
    source: "backfill",
  },
];
const MAINTENANCE_STATUS_POLL_MS = 60000;
const APPEARANCE_THEME_KEY = "weather-earthquake-appearance-theme";
const DEFAULT_APPEARANCE_THEME = "dark";
const LOCAL_PARENT_UNAVAILABLE_LABEL = "Localサーバーでは\n親端末に設定できません";

const INITIAL_CENTER = [139.767, 35.681];
const INITIAL_ZOOM = 6;
const MOBILE_INITIAL_CENTER = INITIAL_CENTER;
const MOBILE_INITIAL_ZOOM = 6;
const MAP_PAN_BOUNDS = [[85, -25], [180, 75]];
const BASE_MAP_MIN_ZOOM = 3.5;
const MAP_CONSTRAINT_TILE_SIZE = 512;
const STATION_LABEL_ALL_VISIBLE_MIN_ZOOM = 7.8;
const STATION_CANVAS_PIXEL_RATIO_LIMIT = 2.5;
const EXCLUDED_JAPAN_LAND_BOUNDS = [
  { west: 131.75, south: 37.15, east: 131.95, north: 37.35 },
  { west: 123.2, south: 25.5, east: 124.8, north: 26.3 },
];
const EXCLUDED_TERRITORY_CODES = new Set(["01695", "01696", "01697", "01698", "01699", "01700"]);
const PREFECTURE_CENTROIDS = [
  ["北海道", 43.064, 141.347], ["青森県", 40.824, 140.740], ["岩手県", 39.703, 141.152],
  ["宮城県", 38.268, 140.872], ["秋田県", 39.718, 140.103], ["山形県", 38.240, 140.363],
  ["福島県", 37.750, 140.467], ["茨城県", 36.342, 140.447], ["栃木県", 36.566, 139.884],
  ["群馬県", 36.391, 139.061], ["埼玉県", 35.857, 139.649], ["千葉県", 35.605, 140.123],
  ["東京都", 35.690, 139.692], ["神奈川県", 35.448, 139.643], ["新潟県", 37.902, 139.023],
  ["富山県", 36.695, 137.211], ["石川県", 36.594, 136.626], ["福井県", 36.066, 136.222],
  ["山梨県", 35.664, 138.568], ["長野県", 36.652, 138.181], ["岐阜県", 35.391, 136.722],
  ["静岡県", 34.977, 138.383], ["愛知県", 35.180, 136.907], ["三重県", 34.730, 136.509],
  ["滋賀県", 35.004, 135.868], ["京都府", 35.021, 135.756], ["大阪府", 34.686, 135.520],
  ["兵庫県", 34.691, 135.183], ["奈良県", 34.685, 135.833], ["和歌山県", 34.226, 135.168],
  ["鳥取県", 35.504, 134.238], ["島根県", 35.472, 133.051], ["岡山県", 34.662, 133.934],
  ["広島県", 34.396, 132.459], ["山口県", 34.186, 131.471], ["徳島県", 34.066, 134.559],
  ["香川県", 34.340, 134.043], ["愛媛県", 33.842, 132.766], ["高知県", 33.559, 133.531],
  ["福岡県", 33.607, 130.418], ["佐賀県", 33.249, 130.298], ["長崎県", 32.745, 129.874],
  ["熊本県", 32.790, 130.742], ["大分県", 33.238, 131.613], ["宮崎県", 31.911, 131.424],
  ["鹿児島県", 31.560, 130.558], ["沖縄県", 26.212, 127.681],
];
const NORTHERN_TERRITORIES_BOUNDS = [
  { west: 145.15, south: 43.1, east: 149.1, north: 45.7 },
];
const JAPAN_OUTLYING_ISLAND_WORLD_SUPPRESS_BOUNDS = [
  { west: 128.35, south: 32.35, east: 129.35, north: 33.25 },
  { west: 129, south: 33.5, east: 130, north: 34.85 },
  { west: 122.8, south: 24, east: 131.6, north: 30.9 },
  { west: 138.7, south: 32, east: 140.2, north: 34.9 },
  { west: 140.8, south: 24, east: 143.5, north: 28 },
  { west: 136, south: 20.3, east: 136.2, north: 20.6 },
  { west: 153.8, south: 24.1, east: 154.1, north: 24.5 },
];
const JAPAN_WORLD_MAP_SUPPRESS_BOUNDS = [
  { west: 139.2, south: 41.2, east: 145.4, north: 45.8 },
  { west: 130.6, south: 33.2, east: 142.2, north: 41.7 },
  { west: 129.3, south: 30.8, east: 132.2, north: 34.1 },
  { west: 132, south: 32.6, east: 134.9, north: 34.7 },
  ...JAPAN_OUTLYING_ISLAND_WORLD_SUPPRESS_BOUNDS,
  ...EXCLUDED_JAPAN_LAND_BOUNDS,
  ...NORTHERN_TERRITORIES_BOUNDS,
];
const JAPAN_WORLD_COASTLINE_SUPPRESS_BOUNDS = [
  { west: 139.2, south: 41.2, east: 145.4, north: 45.8 },
  { west: 130.6, south: 33.2, east: 142.2, north: 41.7 },
  { west: 129.3, south: 30.8, east: 132.2, north: 34.1 },
  { west: 132, south: 32.6, east: 134.9, north: 34.7 },
  ...JAPAN_OUTLYING_ISLAND_WORLD_SUPPRESS_BOUNDS,
  ...EXCLUDED_JAPAN_LAND_BOUNDS,
  ...NORTHERN_TERRITORIES_BOUNDS,
];
const EPICENTER_DEFERRED_UPDATE_DELAY_MS = 220;
const EPICENTER_DRAG_UPDATE_DELAY_MS = 320;
const INTENSITY_DISTANCE_SIMPLIFY_TOLERANCE_DEGREES = 0.008;
const INTENSITY_DISTANCE_SIMPLIFY_MIN_POINTS = 14;
const EARTH_RADIUS_KM = 6371;
const EARTHQUAKE_MODEL = {
  pWaveVelocityKmPerSec: 6.5,
  sWaveVelocityKmPerSec: 3.8,
  eewProcessingDelaySec: 2.0,
  defaultSiteAmplification: 0,
  intensityMagnitudeSlope: 1.43,
  intensityDistanceLogAttenuation: 2.12,
  intensityDistanceLinearAttenuation: 0.0042,
  intensityBaselineDamping: 0.95,
  giantMagnitudeSaturationStart: 7.4,
  giantMagnitudeSaturationFactor: 0.32,
  finiteFaultReductionBase: 0.075,
  finiteFaultReductionOffshore: 0.03,
};
const EEW_BLINK_INTERVAL_SEC = 0.7;
const EEW_BLINK_PHASES = 6;
const SIMULATION_END_GRACE_SEC = 15;
const SIMULATION_DATA_UPDATE_HZ = 3;
const GEOLOCATION_TARGET_ACCURACY_M = 35;
const GEOLOCATION_ACCEPTABLE_ACCURACY_M = 120;
const GEOLOCATION_IPAD_ACCEPTABLE_ACCURACY_M = 700;
const GEOLOCATION_FAST_SETTLE_MS = 2500;
const GEOLOCATION_MAX_WAIT_MS = 16000;
const GEOLOCATION_IPAD_MAX_WAIT_MS = 45000;
const GEOLOCATION_CACHED_MAX_AGE_MS = 15000;
const GEOLOCATION_IPAD_CACHED_MAX_AGE_MS = 300000;
const WAVE_RENDER_RADIUS_STEP_KM = 1.5;
const WAVE_CIRCLE_STEPS = 160;
const RESET_VIEW_ANIMATION_MS = 1200;
const LIGHT_DEFERRED_DATA_DELAY_MS = 700;
const SIMULATION_DEFERRED_DATA_DELAY_MS = 2400;
const STATION_DEFERRED_DATA_DELAY_MS = 3200;
const PRESET_DEFERRED_DATA_DELAY_MS = 3800;
const HEAVY_DEFERRED_DATA_DELAY_MS = 9000;
const PLATE_BOUNDARY_DEFERRED_DATA_DELAY_MS = 11000;
const EARTHQUAKE_PRESETS = [];

const INTENSITY_CLASSES = [
  { label: "0", shortLabel: "0", min: 0, color: "#d9dde3", textColor: "#1f2937", rank: 0 },
  { label: "1", shortLabel: "1", min: 0.5, color: "#ffffff", textColor: "#111827", rank: 1 },
  { label: "2", shortLabel: "2", min: 1.5, color: "#74d7ff", textColor: "#111827", rank: 2 },
  { label: "3", shortLabel: "3", min: 2.5, color: "#0068b7", textColor: "#ffffff", rank: 3 },
  { label: "4", shortLabel: "4", min: 3.5, color: "#fff2a8", textColor: "#111827", rank: 4 },
  { label: "5弱", shortLabel: "5-", min: 4.5, color: "#ffd400", textColor: "#111827", rank: 5 },
  { label: "5強", shortLabel: "5+", min: 5.0, color: "#ff8a00", textColor: "#111827", rank: 6 },
  { label: "6弱", shortLabel: "6-", min: 5.5, color: "#e60012", textColor: "#ffffff", rank: 7 },
  { label: "6強", shortLabel: "6+", min: 6.0, color: "#a50034", textColor: "#ffffff", rank: 8 },
  { label: "7", shortLabel: "7", min: 6.5, color: "#5f007e", textColor: "#ffffff", rank: 9 },
];
const INTENSITY_COLOR_SCHEMES = {
  low: {
    colors: {
      0: "#cfd4da",
      1: "#f2f4f7",
      2: "#9ed7e8",
      3: "#4f8fc1",
      4: "#eee4ad",
      "5-": "#e7cf60",
      "5+": "#d8994a",
      "6-": "#c95757",
      "6+": "#a74762",
      7: "#7c4b91",
    },
    textColors: {
      0: "#1f2937",
      1: "#111827",
      2: "#102a35",
      3: "#ffffff",
      4: "#222222",
      "5-": "#1d1d1d",
      "5+": "#171717",
      "6-": "#ffffff",
      "6+": "#ffffff",
      7: "#ffffff",
    },
  },
  normal: {
    colors: {
      0: "#d9dde3",
      1: "#ffffff",
      2: "#74d7ff",
      3: "#0068b7",
      4: "#fff2a8",
      "5-": "#ffd400",
      "5+": "#ff8a00",
      "6-": "#e60012",
      "6+": "#a50034",
      7: "#5f007e",
    },
    textColors: {
      0: "#1f2937",
      1: "#111827",
      2: "#111827",
      3: "#ffffff",
      4: "#111827",
      "5-": "#111827",
      "5+": "#111827",
      "6-": "#ffffff",
      "6+": "#ffffff",
      7: "#ffffff",
    },
  },
  high: {
    colors: {
      0: "#c4cbd3",
      1: "#ffffff",
      2: "#00c8ff",
      3: "#0047ff",
      4: "#fff000",
      "5-": "#ffd000",
      "5+": "#ff7a00",
      "6-": "#ff1a1a",
      "6+": "#b00030",
      7: "#6a00a8",
    },
    textColors: {
      0: "#111827",
      1: "#111827",
      2: "#001b2a",
      3: "#ffffff",
      4: "#111827",
      "5-": "#111827",
      "5+": "#111827",
      "6-": "#ffffff",
      "6+": "#ffffff",
      7: "#ffffff",
    },
  },
  p: {
    colors: {
      0: "#d7dce2",
      1: "#ffffff",
      2: "#8bd7ff",
      3: "#0072b2",
      4: "#f6e58d",
      "5-": "#f0c84b",
      "5+": "#d58a22",
      "6-": "#b15f9c",
      "6+": "#7b3f98",
      7: "#332288",
    },
    textColors: {
      0: "#1f2937",
      1: "#111827",
      2: "#102a35",
      3: "#ffffff",
      4: "#111827",
      "5-": "#111827",
      "5+": "#111827",
      "6-": "#ffffff",
      "6+": "#ffffff",
      7: "#ffffff",
    },
  },
  d: {
    colors: {
      0: "#d7dce2",
      1: "#ffffff",
      2: "#9bd9ff",
      3: "#006fb8",
      4: "#f4e47d",
      "5-": "#e8c13c",
      "5+": "#c8841f",
      "6-": "#b65d8d",
      "6+": "#8644a3",
      7: "#442288",
    },
    textColors: {
      0: "#1f2937",
      1: "#111827",
      2: "#102a35",
      3: "#ffffff",
      4: "#111827",
      "5-": "#111827",
      "5+": "#111827",
      "6-": "#ffffff",
      "6+": "#ffffff",
      7: "#ffffff",
    },
  },
  t: {
    colors: {
      0: "#d9dde3",
      1: "#ffffff",
      2: "#b9c8ff",
      3: "#3f5fbf",
      4: "#f2d572",
      "5-": "#d9a837",
      "5+": "#b97720",
      "6-": "#b24747",
      "6+": "#7f2d5f",
      7: "#42185f",
    },
    textColors: {
      0: "#1f2937",
      1: "#111827",
      2: "#111827",
      3: "#ffffff",
      4: "#111827",
      "5-": "#111827",
      "5+": "#ffffff",
      "6-": "#ffffff",
      "6+": "#ffffff",
      7: "#ffffff",
    },
  },
  a: {
    colors: {
      0: "#e6e8ec",
      1: "#ffffff",
      2: "#d2d6dc",
      3: "#aeb6c0",
      4: "#8f99a6",
      "5-": "#707b88",
      "5+": "#586370",
      "6-": "#404a56",
      "6+": "#2d3540",
      7: "#171d26",
    },
    textColors: {
      0: "#111827",
      1: "#111827",
      2: "#111827",
      3: "#111827",
      4: "#ffffff",
      "5-": "#ffffff",
      "5+": "#ffffff",
      "6-": "#ffffff",
      "6+": "#ffffff",
      7: "#ffffff",
    },
  },
};

function observationsFromNames(stationNames, intensityValue) {
  return stationNames.map((stationName) => ({ stationName, intensityValue }));
}

const state = {
  latitude: 35.681,
  longitude: 139.767,
  depthKm: 10,
  magnitude: 3.5,
  epicenterName: "",
  municipalityName: "",
  maxIntensityLabel: "-",
  epicenterEditEnabled: false,
  showStationLayer: false,
  showSubmarineStationLayer: false,
  showRegionLayer: false,
  showEewWarningLayer: false,
  showPlateBoundaryLayer: false,
  showFaultLayer: false,
  selectedPresetId: "",
  presetFilterText: "",
  presetSortKey: null,
  presetSortDirection: "desc",
  intensityColorScheme: "normal",
  eewWarningForecastAreas: [],
  eewWarningReportNumber: null,
  eewWarningFinalReport: false,
  eewReportAreaKeySignature: "",
  eewSyntheticReportNumber: 0,
  eewFirstReportElapsedSec: null,
  eewIssuedWarningKeys: new Set(),
  eewWarningBlinkStartedAt: {},
  eewInitialWarningKeys: new Set(),
  eewPreviousWarningKeys: new Set(),
  simulationRunning: false,
  simulationPaused: false,
  simulationCompleted: false,
  mapInteracting: false,
  currentLocationEnabled: false,
  currentLocation: null,
  currentLocationName: "-",
  currentLocationStatus: "idle",
  speechMuted: true,
  pushConfigured: false,
  pushSubscribed: false,
};

const els = {
  status: document.querySelector("#map-status"),
  epicenterRegion: document.querySelector("#epicenter-region"),
  latitude: document.querySelector("#latitude-input"),
  longitude: document.querySelector("#longitude-input"),
  depth: document.querySelector("#depth-input"),
  magnitude: document.querySelector("#magnitude-input"),
  historicalEarthquakeButton: document.querySelector("#historical-earthquake-button"),
  presetPickerOverlay: document.querySelector("#preset-picker-overlay"),
  presetPickerClose: document.querySelector("#preset-picker-close"),
  presetPickerTableWrap: document.querySelector(".preset-picker-table-wrap"),
  presetPickerList: document.querySelector("#preset-picker-list"),
  settingsMenuSheet: document.querySelector("#settings-menu-sheet"),
  settingsMenuClose: document.querySelector("#settings-menu-close"),
  settingsSourceButton: document.querySelector("#settings-source-button"),
  settingsFeedbackButton: document.querySelector("#settings-feedback-button"),
  settingsPushButton: document.querySelector("#settings-menu-sheet #settings-push-button"),
  settingsPushHistoryButton: document.querySelector("#settings-menu-sheet #settings-push-history-button"),
  settingsPushStatus: document.querySelector("#settings-push-status"),
  settingsPushToggle: document.querySelector("#settings-push-toggle"),
  settingsSourcePanel: document.querySelector("#settings-source-panel"),
  settingsFeedbackPanel: document.querySelector("#settings-feedback-panel"),
  settingsPushPanel: document.querySelector("#settings-push-panel"),
  settingsPushHistoryPanel: document.querySelector("#settings-push-history-panel"),
  settingsAppearanceButton: document.querySelector("#settings-appearance-button"),
  settingsAppearancePanel: document.querySelector("#settings-appearance-panel"),
  settingsLocationStatus: document.querySelector("#settings-location-status"),
  historyFullPanel: document.querySelector("#history-full-panel"),
  historyAreaFilter: document.querySelector("#history-area-filter"),
  historyStatsList: document.querySelector("#history-stats-list"),
  infoFullPanel: document.querySelector("#info-full-panel"),
  learningFullPanel: document.querySelector("#learning-full-panel"),
  intensityColorScheme: document.querySelector("#intensity-color-scheme"),
  municipalityOutput: document.querySelector("#municipality-output"),
  maxIntensityOutput: document.querySelector("#max-intensity-output"),
  epicenterEditToggle: document.querySelector("#epicenter-edit-toggle"),
  stationLayerToggle: document.querySelector("#station-layer-toggle"),
  submarineStationLayerToggle: document.querySelector("#submarine-station-layer-toggle"),
  regionLayerToggle: document.querySelector("#region-layer-toggle"),
  eewWarningToggle: document.querySelector("#eew-warning-toggle"),
  plateBoundaryLayerToggle: document.querySelector("#plate-boundary-layer-toggle"),
  faultLayerToggle: document.querySelector("#fault-layer-toggle"),
  simulationStationLayerToggle: document.querySelector("#simulation-station-layer-toggle"),
  simulationSubmarineStationLayerToggle: document.querySelector("#simulation-submarine-station-layer-toggle"),
  simulationRegionLayerToggle: document.querySelector("#simulation-region-layer-toggle"),
  simulationEewWarningToggle: document.querySelector("#simulation-eew-warning-toggle"),
  simulationPlateBoundaryLayerToggle: document.querySelector("#simulation-plate-boundary-layer-toggle"),
  simulationFaultLayerToggle: document.querySelector("#simulation-fault-layer-toggle"),
  resetEpicenter: document.querySelector("#reset-epicenter"),
  settingsMenuButton: document.querySelector("#settings-menu-button"),
  setupSheetToggle: document.querySelector("#setup-sheet-toggle"),
  simulationSheetToggle: document.querySelector("#simulation-sheet-toggle"),
  setupPanel: document.querySelector("#setup-panel"),
  simulationPanel: document.querySelector("#simulation-panel"),
  simulationStart: document.querySelector("#simulation-start"),
  simulationPause: document.querySelector("#simulation-pause"),
  simulationStop: document.querySelector("#simulation-stop"),
  simulationMaxIntensity: document.querySelector("#simulation-max-intensity"),
  simulationMagnitude: document.querySelector("#simulation-magnitude"),
  simulationEpicenter: document.querySelector("#simulation-epicenter"),
  simulationRegionName: document.querySelector("#simulation-region-name"),
  simulationDepth: document.querySelector("#simulation-depth"),
  simulationTime: document.querySelector("#simulation-time"),
  currentLocationToggle: document.querySelector("#current-location-toggle"),
  currentLocationName: document.querySelector("#current-location-name"),
  currentLocationIntensity: document.querySelector("#current-location-intensity"),
  currentLocationArrival: document.querySelector("#current-location-arrival"),
  maxStationList: document.querySelector("#max-station-list"),
  eewForecastPanel: document.querySelector("#eew-forecast-panel"),
  eewForecastList: document.querySelector("#eew-forecast-list"),
};

let map;
let epicenterMarker;
let municipalityDisplayData;
let oldScaleSyntheticMunicipalityHydrationPromise;
let oldScaleSyntheticMunicipalityHydratingPresetId = "";
let localAreaData;
let localAreaLoadPromise;
let eewForecastAreaData;
let eewForecastAreaLoadPromise;
let epicenterAreaData;
let epicenterAreaLoadPromise;
let plateBoundaryData;
let plateBoundaryLoadPromise;
let activeFaultData;
let activeFaultLoadPromise;
let submarineObservationPointData;
let submarineObservationPointLoadPromise;
let surroundingLandData;
let surroundingLandLoadPromise;
let worldCoastlineData;
let worldCoastlineLoadPromise;
let japanCoastlineData;
let japanCoastlineLoadPromise;
let prefectureBoundaryLineData;
let prefectureBoundaryLineLoadPromise;
let municipalityBoundaryData;
let municipalityBoundaryLoadPromise;
let municipalityBoundaryLineData;
let municipalityBoundaryLineLoadPromise;
let jmaLocalAreaBoundaryLineData;
let jmaLocalAreaBoundaryLineLoadPromise;
let groundModelData;
let groundModelLoadPromise;
let shindoStationData;
let shindoStationLoadPromise;
let remoteNotificationHistoryUnavailable = false;
let mapPanConstraintApplying = false;
let deferredEpicenterUpdateTimer = 0;
let deferredEpicenterUpdateToken = 0;
let stationIntensityFeatureCache;
let submarineObservationFeatureCache = { key: "", data: null, features: [] };
let submarineObservationIntensityCache = { key: "", features: [] };
let predictedMaximumCache;
let presetObservationLookupCache;
let presetDetailLoadingId = "";
const earthquakePresetDetailCache = new Map();
let presetPickerScrollClampFrame = 0;
let presetPickerTouchStart = null;
let sourceInfoScrollClampFrame = 0;
let sourceInfoTouchStart = null;
let hyogoNanbuSyntheticStationCache;
let stationPopup;
let stationClickPopup;
let stationHoverEventsBound = false;
let hoveredStationFeatureId = null;
let hoveredStationLngLat = null;
let clickedStationFeatureId = null;
let stationCanvasOverlay;
let stationCanvasRenderFrame = 0;
let stationCanvasFeatureCache = { data: null, features: [] };
let submarineStationCanvasFeatureCache = { data: null, features: [] };
let maintenanceReasonOverlay;
let appOverlays;
let latestMaintenanceStatus = { maintenance: false, reason: "" };
let currentLocationMarker;
let epicenterHoverPopup;
let epicenterClickPopup;
let epicenterHoverLngLat = null;
let epicenterPopupPinned = false;
let currentLocationRequestId = 0;
let currentLocationForecastCache;
let locationResolveTimer;
let simulationFrame;
let simulationCompleteAtSec = null;
let startupMapVisualReady = false;
let municipalityBoundaryVisible = false;
let startupLocationResolved = false;
let startupOverlayReleasePending = false;
let startupBackgroundDataScheduled = false;
let maintenanceStatusReady = false;
let simulationStartedAt;
let simulationPausedAt;
let simulationPreviousEpicenterEditEnabled = false;
let simulationEpicenter = [state.longitude, state.latitude];
let simulationRenderBucket = -1;
let simulationStationRenderBucket = -1;
let maxStationListRenderBucket = null;
let maxStationListRenderSignature = "";
let maxStationListRenderHandle = 0;
let maxStationListRenderHandleType = "";
let pendingMaxStationListRender = null;
let maxStationListItemCache = new Map();
let maxStationListEmptyItem = null;
let simulationTimeTextCache = "";
let eewForecastPanelRenderSignature = "";
let waveRenderRadiusCache = { p: null, s: null };
let waveCanvasRadiusState = { p: 0, s: 0 };
const waveCircleBearingCache = new Map();
const eewForecastAreaNameCache = new Map();
let resetViewAnimating = false;
let smartphoneLandscapeResetApplied = false;
let postMapInteractionRenderTimer;
let localAreaStationMembershipCache;
let localAreaStationSnapshotCache;
const intensityDistanceGeometryCache = new WeakMap();
let areaEpicentralDistanceCache = {
  key: "",
  distances: [],
};
let stationSummaryCache = { data: null, summary: null };
let pastEarthquakeAreaStatsCache = { signature: "", rows: [] };
let selectedHistoryLocalAreaName = "";
let historyMapEventsBound = false;
let earthquakeStatisticsData = null;
let earthquakeStatisticsLoadPromise = null;
let earthquakeStatisticsLoadKey = "";
let earthquakeStatisticsAbortController = null;
let earthquakeStatisticsRange = { startYear: "2026", endYear: "2026" };
let earthquakeStatisticsLoading = false;
let selectedStationInfoRegion = "";
let stationInfoAffiliationFilter = "";
let observedStationFeatureCache = { data: null, features: [] };
let speechAnnouncementState = createSpeechAnnouncementState();
let postMunicipalityDataScheduled = false;
const sourceDataRefs = new Map();
let pmtilesProtocolRegistered = false;
let japanPmtilesProtocolUrl = "";
const SOURCE_LINKS = [
  { label: "気象庁", href: "https://www.jma.go.jp/" },
  { label: "気象庁 予報区等GISデータ", href: "https://www.data.jma.go.jp/developer/gis.html" },
  { label: "気象庁 震度観測点", href: "https://www.jma.go.jp/jma/kishou/know/jishin/intens-st/index.html" },
  { label: "国土数値情報", href: "https://nlftp.mlit.go.jp/ksj/" },
  { label: "J-SHIS", href: "https://www.j-shis.bosai.go.jp/" },
  { label: "Natural Earth", href: "https://www.naturalearthdata.com/" },
  { label: "PB2002 Plate Boundaries", href: "https://github.com/fraxen/tectonicplates" },
  { label: "MeteoScope", href: "https://github.com/wvdtc7bjwn-bit/MeteoScope" },
  { label: "S-net", href: "https://www.seafloor.bosai.go.jp/outline/" },
  { label: "MapLibre GL JS", href: "https://maplibre.org/maplibre-gl-js/docs/" },
];
const SOURCE_UPDATED_AT = "2026 07 11";
const SOURCE_SECTIONS = [
  {
    title: "気象庁",
    description: "地震情報、震度観測点、緊急地震速報、震央地名、細分区域などの参考データ。",
    links: [
      { label: "気象庁", href: "https://www.jma.go.jp/" },
      {
        label: "緊急地震速報や震度情報で用いる区域の名称",
        href: "https://www.jma.go.jp/jma/kishou/know/jishin/joho/shindo-name.html",
      },
      {
        label: "地震情報で用いる震央地名",
        href: "https://www.jma.go.jp/jma/kishou/know/jishin/joho/region/index.html",
      },
      {
        label: "震度観測点",
        href: "https://www.jma.go.jp/jma/kishou/know/jishin/intens-st/index.html",
      },
      {
        label: "予報区等GISデータの一覧",
        href: "https://www.data.jma.go.jp/developer/gis.html",
      },
    ],
  },
  {
    title: "地図・地盤データ",
    description: "行政区域、海岸線、周辺陸地、地盤補正、海底観測点などの表示・計算用データ。",
    links: [
      { label: "国土数値情報", href: "https://nlftp.mlit.go.jp/ksj/" },
      { label: "J-SHIS", href: "https://www.j-shis.bosai.go.jp/" },
      { label: "Natural Earth", href: "https://www.naturalearthdata.com/" },
      { label: "S-net", href: "https://www.seafloor.bosai.go.jp/outline/" },
      { label: "MapLibre GL JS", href: "https://maplibre.org/maplibre-gl-js/docs/" },
    ],
  },
  {
    title: "プレート境界データ",
    description: "日本周辺のプレート境界表示に使用しているデータ。",
    links: [
      {
        label: "PB2002 Plate Boundaries / fraxen tectonicplates",
        href: "https://github.com/fraxen/tectonicplates",
      },
      {
        label: "Bird (2003) An updated digital model of plate boundaries",
        href: "https://doi.org/10.1029/2001GC000252",
      },
    ],
  },
  {
    title: "表示ライブラリ",
    description: "地図描画・Webアプリ表示に使用しているライブラリ。",
    links: [
      { label: "MeteoScope", href: "https://github.com/wvdtc7bjwn-bit/MeteoScope" },
      { label: "MapLibre GL JS", href: "https://maplibre.org/maplibre-gl-js/docs/" },
    ],
  },
];
let stationDataCache = {
  key: "",
  data: null,
};
let areaDataCache = {
  key: "",
  data: null,
};
let visibleAreaDataSyncBucket = null;
let lastManagedEpicenter = {
  latitude: state.latitude,
  longitude: state.longitude,
};

setupGlobalOverlays();
setupTabs();
renderDepthOptions();
renderMagnitudeOptions();
renderEarthquakePresetPicker();
renderIntensityColorSchemeOptions();
setStartupInteractionLocked(true);
setInitialSimulationStartLoadingState();
bindSimulationControls();
applyIntensityColorScheme(state.intensityColorScheme, { refreshLayers: false });
applyAppearanceTheme();
window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener?.("change", () => {
  if (getAppearanceTheme() === "system") {
    applyAppearanceTheme("system");
  }
});
setupMobileSheets();
setupTransientPanelScrollbars();
setupPanelScrollbarOffsets();
preventNonMapZoom();
setupViewportStability();
setupSmartphoneLandscapeUnsupportedReset();
setupSpeechSynthesisRecovery();
bootstrapApplication();

async function bootstrapApplication() {
  await disableLocalDevelopmentServiceWorker();
  recoverPmtilesByteServingIfNeeded().catch((error) => {
    console.warn("PMTiles byte serving recovery failed", error);
  });
  if (!IS_LOCAL_DEV) {
    setupPushNotifications();
  }
  backfillLegacyNotificationHistory();

  if (window.maplibregl) {
    initEarthquakeMap().catch((error) => {
      console.error(error);
      els.status.textContent = "Map initialization failed";
    });
  } else {
    els.status.textContent = "MapLibre GL JS was not loaded";
  }
}

async function disableLocalDevelopmentServiceWorker() {
  if (!IS_LOCAL_DEV || !("serviceWorker" in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
    if (window.caches?.keys) {
      const keys = await window.caches.keys();
      await Promise.all(keys.map((key) => window.caches.delete(key)));
    }
  } catch (error) {
    console.warn("Local development cache cleanup failed", error);
  }
}

async function recoverPmtilesByteServingIfNeeded() {
  if (!window.fetch) {
    return;
  }

  const url = new URL(JAPAN_PMTILES_URL, window.location.href).href;
  let byteServingOk = false;
  let timeoutId = 0;

  try {
    const controller = new AbortController();
    timeoutId = window.setTimeout(() => controller.abort(), JAPAN_PMTILES_BYTE_SERVING_PROBE_TIMEOUT_MS);
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Range: "bytes=0-15",
      },
    });
    byteServingOk = response.status === 206 && Number(response.headers.get("content-length")) === 16;
  } catch (error) {
    if (error?.name === "AbortError") {
      console.warn("PMTiles byte serving probe timed out");
      return;
    }
    console.warn("PMTiles byte serving probe failed", error);
  } finally {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  }

  if (byteServingOk) {
    window.sessionStorage?.removeItem(JAPAN_PMTILES_BYTE_SERVING_RECOVERY_KEY);
    return;
  }

  console.warn("PMTiles byte serving is unavailable. Recovering Service Worker and cache state.");
  if (
    !("serviceWorker" in navigator) ||
    !navigator.serviceWorker.controller ||
    window.sessionStorage?.getItem(JAPAN_PMTILES_BYTE_SERVING_RECOVERY_KEY)
  ) {
    return;
  }

  window.sessionStorage?.setItem(JAPAN_PMTILES_BYTE_SERVING_RECOVERY_KEY, "1");

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
    if (window.caches?.keys) {
      const keys = await window.caches.keys();
      await Promise.all(keys.map((key) => window.caches.delete(key)));
    }
  } catch (error) {
    console.warn("PMTiles Service Worker recovery failed", error);
  }

  window.location.reload();
  await new Promise(() => {});
}

function setInitialSimulationStartLoadingState() {
  if (!els.simulationStart) {
    return;
  }

  els.simulationStart.disabled = true;
  els.simulationStart.textContent = "メンテナンス確認中...";
  els.simulationStart.title = "メンテナンスモードの状態を確認しています";
}

function setupTabs() {
  const ensureSettingsStatusCards = () => {
    const list = els.settingsMenuSheet?.querySelector(".settings-menu-list");
    const notificationCard = els.settingsMenuSheet?.querySelector(".settings-notification-card");
    if (!list || !notificationCard) {
      return;
    }

    notificationCard.classList.add("settings-status-card");
    let group = els.settingsMenuSheet.querySelector(".settings-status-group");
    if (!group) {
      group = document.createElement("section");
      group.className = "settings-status-group";
      notificationCard.insertAdjacentElement("beforebegin", group);
      group.append(notificationCard);
    } else if (!group.contains(notificationCard)) {
      group.append(notificationCard);
    }

    notificationCard.querySelector(".settings-notification-row span")?.replaceChildren("現在の通知");
    els.settingsPushToggle?.remove();

    if (!els.settingsLocationStatus) {
      const locationCard = document.createElement("section");
      locationCard.className = "settings-notification-card settings-status-card settings-location-card";
      locationCard.setAttribute("aria-label", "位置情報");
      locationCard.innerHTML = `
        <div class="settings-notification-row">
          <span>位置情報</span>
          <strong id="settings-location-status">OFF</strong>
        </div>
      `;
      notificationCard.insertAdjacentElement("afterend", locationCard);
      els.settingsLocationStatus = locationCard.querySelector("#settings-location-status");
    }
  };

  const ensureSettingsAppearanceElements = () => {
    if (!els.settingsAppearanceButton && els.settingsPushButton) {
      els.settingsAppearanceButton = document.createElement("button");
      els.settingsAppearanceButton.className = "settings-menu-row";
      els.settingsAppearanceButton.id = "settings-appearance-button";
      els.settingsAppearanceButton.type = "button";
      els.settingsAppearanceButton.innerHTML = `<span>外観</span><span aria-hidden="true">›</span>`;
      els.settingsPushButton.insertAdjacentElement("afterend", els.settingsAppearanceButton);
    }
    if (!els.settingsAppearancePanel && els.settingsPushPanel) {
      els.settingsAppearancePanel = document.createElement("section");
      els.settingsAppearancePanel.className = "settings-inline-panel hidden";
      els.settingsAppearancePanel.id = "settings-appearance-panel";
      els.settingsAppearancePanel.setAttribute("aria-label", "外観");
      els.settingsPushPanel.insertAdjacentElement("afterend", els.settingsAppearancePanel);
    }
  };

  const ensureSettingsAppearancePanel = () => {
    ensureSettingsAppearanceElements();
    if (!els.settingsAppearancePanel || els.settingsAppearancePanel.dataset.ready === "true") {
      return;
    }

    const colorField = els.intensityColorScheme?.closest(".field");
    const colorFieldHost = document.createElement("div");
    colorFieldHost.className = "settings-appearance-color-host";
    if (colorField) {
      colorFieldHost.append(colorField);
    }

    els.settingsAppearancePanel.replaceChildren();
    els.settingsAppearancePanel.insertAdjacentHTML("beforeend", `
      <section class="settings-appearance-section">
        <h4>表示テーマ</h4>
        <div class="settings-theme-options" role="radiogroup" aria-label="表示テーマ">
          <label><input type="radio" name="appearance-theme" value="system" /> <span>システムに従う</span></label>
          <label><input type="radio" name="appearance-theme" value="light" /> <span>ライトモード</span></label>
          <label><input type="radio" name="appearance-theme" value="dark" /> <span>ダークモード</span></label>
        </div>
      </section>
      <section class="settings-appearance-section settings-appearance-color-section">
        <h4>震度配色</h4>
      </section>
    `);
    const appearanceHeadings = els.settingsAppearancePanel.querySelectorAll(".settings-appearance-section h4");
    if (appearanceHeadings[0]) {
      appearanceHeadings[0].textContent = "表示テーマ";
    }
    if (appearanceHeadings[1]) {
      appearanceHeadings[1].textContent = "震度配色";
    }
    const themeLabels = els.settingsAppearancePanel.querySelectorAll(".settings-theme-options label span");
    ["システムに従う", "ライトモード", "ダークモード"].forEach((label, index) => {
      if (themeLabels[index]) {
        themeLabels[index].textContent = label;
      }
    });
    els.settingsAppearancePanel.querySelector(".settings-appearance-color-section")?.append(colorFieldHost);
    els.settingsAppearancePanel.querySelectorAll('input[name="appearance-theme"]').forEach((input) => {
      input.checked = input.value === getAppearanceTheme();
      input.addEventListener("change", () => {
        if (input.checked) {
          setAppearanceTheme(input.value);
        }
      });
    });
    els.settingsAppearancePanel.dataset.ready = "true";
  };

  const ensureHistoryFullPanel = () => {
    if (els.historyFullPanel) {
      return els.historyFullPanel;
    }

    const panel = document.createElement("section");
    panel.className = "nerv-full-panel hidden history-full-panel";
    panel.id = "history-full-panel";
    panel.setAttribute("aria-label", "過去の地震");
    panel.innerHTML = `
      <div class="history-stats-toolbar">
        <input id="history-area-filter" type="search" inputmode="search" autocomplete="off" list="history-area-suggestions" placeholder="細分区域・震源地を検索" aria-label="過去の地震回数を検索" />
        <datalist id="history-area-suggestions"></datalist>
      </div>
      <div class="history-stats-list" id="history-stats-list" role="list"></div>
    `;
    els.settingsMenuSheet?.insertAdjacentElement("beforebegin", panel);
    els.historyFullPanel = panel;
    els.historyAreaFilter = panel.querySelector("#history-area-filter");
    els.historyStatsList = panel.querySelector("#history-stats-list");
    setupHistoryStatisticsControls(panel);
    els.historyAreaFilter?.addEventListener("input", () => renderPastEarthquakeStatsPanel());
    return panel;
  };

  const setupHistoryStatisticsControls = (panel) => {
    const toolbar = panel?.querySelector(".history-stats-toolbar");
    if (!toolbar || toolbar.querySelector(".history-stats-sort-row")) {
      return;
    }
    const row = document.createElement("div");
    row.className = "history-stats-sort-row";
    row.innerHTML = `
      <label><span>期間</span><select id="history-start-year" aria-label="開始年"></select></label>
      <span aria-hidden="true">〜</span>
      <label><select id="history-end-year" aria-label="終了年"></select></label>
      <button id="history-statistics-load" type="button">取得</button>
    `;
    toolbar.append(row);
    const startSelect = row.querySelector("#history-start-year");
    const endSelect = row.querySelector("#history-end-year");
    const currentYear = new Date().getFullYear();
    const options = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => {
      const year = currentYear - index;
      return `<option value="${year}">${year}年</option>`;
    }).join("");
    startSelect.innerHTML = options;
    endSelect.innerHTML = options;
    startSelect.value = earthquakeStatisticsRange.startYear;
    endSelect.value = earthquakeStatisticsRange.endYear;
    [startSelect, endSelect].forEach((select) => {
      select.addEventListener("change", () => {
        const nextRange = {
          startYear: startSelect.value,
          endYear: endSelect.value,
        };
        if (
          nextRange.startYear === earthquakeStatisticsRange.startYear &&
          nextRange.endYear === earthquakeStatisticsRange.endYear
        ) {
          return;
        }
        abortEarthquakeStatisticsLoad();
        earthquakeStatisticsRange = nextRange;
        earthquakeStatisticsData = null;
        earthquakeStatisticsLoadKey = "";
        selectedHistoryLocalAreaName = "";
        pastEarthquakeAreaStatsCache = { signature: "", rows: [] };
        if (map?.getSource("jma-local-areas")) {
          setGeoJsonSourceData("jma-local-areas", buildHistoryLocalAreaMapData());
        }
        renderPastEarthquakeStatsPanel();
      });
    });
    row.querySelector("#history-statistics-load")?.addEventListener("click", async () => {
      const startYear = Number(startSelect.value);
      const endYear = Number(endSelect.value);
      if (Math.abs(endYear - startYear) + 1 >= 5) {
        const confirmed = await confirmLargeStatisticsFetch(startYear, endYear);
        if (!confirmed) {
          return;
        }
      }
      earthquakeStatisticsRange = {
        startYear: startSelect.value,
        endYear: endSelect.value,
      };
      earthquakeStatisticsData = null;
      earthquakeStatisticsLoadKey = "";
      pastEarthquakeAreaStatsCache = { signature: "", rows: [] };
      earthquakeStatisticsLoading = true;
      renderPastEarthquakeStatsPanel();
      try {
        await loadEarthquakeStatistics({ force: true });
      } catch (error) {
        if (error?.name !== "AbortError") {
          throw error;
        }
      } finally {
        earthquakeStatisticsLoading = false;
        if (map?.getSource("jma-local-areas")) {
          setGeoJsonSourceData("jma-local-areas", buildHistoryLocalAreaMapData());
        }
        renderPastEarthquakeStatsPanel();
      }
    });
  };

  const confirmLargeStatisticsFetch = (startYear, endYear) => new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "statistics-confirm-overlay";
    overlay.innerHTML = `
      <section class="statistics-confirm-dialog" role="dialog" aria-modal="true" aria-label="取得確認">
        <h2>取得範囲が大きいです</h2>
        <p>${Math.min(startYear, endYear)}年〜${Math.max(startYear, endYear)}年の統計を取得します。期間が長いほど通信容量が大きくなります。</p>
        <div class="statistics-confirm-actions">
          <button type="button" data-statistics-confirm-back>戻る</button>
          <button type="button" data-statistics-confirm-continue>続行</button>
        </div>
      </section>
    `;
    const close = (value) => {
      overlay.remove();
      resolve(value);
    };
    overlay.querySelector("[data-statistics-confirm-back]")?.addEventListener("click", () => close(false));
    overlay.querySelector("[data-statistics-confirm-continue]")?.addEventListener("click", () => close(true));
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close(false);
      }
    });
    document.body.append(overlay);
    overlay.querySelector("[data-statistics-confirm-continue]")?.focus();
  });

  const ensureSimulationStartInsideSheet = () => {
    if (!els.setupPanel || !els.simulationStart) {
      return;
    }
    const colorField = els.intensityColorScheme?.closest(".field");
    if (colorField && els.setupPanel.contains(colorField)) {
      colorField.classList.add("setup-intensity-color-field");
    }

    let quickHost = els.setupPanel.querySelector(".simulation-quick-actions");
    if (!quickHost) {
      quickHost = document.createElement("div");
      quickHost.className = "simulation-quick-actions";
      const layerToggles = els.setupPanel.querySelector(".simulation-layer-toggles");
      if (layerToggles) {
        layerToggles.insertAdjacentElement("afterend", quickHost);
      } else {
        els.setupPanel.append(quickHost);
      }
    }

    if (els.historicalEarthquakeButton && !quickHost.contains(els.historicalEarthquakeButton)) {
      quickHost.append(els.historicalEarthquakeButton);
    }
    els.historicalEarthquakeButton?.querySelector("span")?.replaceChildren("プリセット地震");
    if (!quickHost.querySelector(".sheet-speech-toggle")) {
      const { speechConfirmOverlay } = setupGlobalOverlays();
      const speechButton = document.createElement("button");
      speechButton.type = "button";
      speechButton.className = `sheet-speech-toggle ${state.speechMuted ? "is-muted" : ""}`;
      speechButton.setAttribute("aria-pressed", String(state.speechMuted));
      speechButton.innerHTML = `<span aria-hidden="true">♪</span><strong>音声読み上げ</strong>`;
      speechButton.addEventListener("click", () => {
        if (speechButton.classList.contains("is-muted")) {
          showSpeechConfirmOverlay(speechConfirmOverlay, () => {
            setSpeechButtonMuted(speechButton, false);
          });
          return;
        }
        setSpeechButtonMuted(speechButton, true);
      });
      quickHost.append(speechButton);
    }
    const speechButton = quickHost.querySelector(".sheet-speech-toggle");
    speechButton?.querySelector("span")?.replaceChildren("♪");
    speechButton?.querySelector("strong")?.replaceChildren("読み上げ");

    let host = els.setupPanel.querySelector(".simulation-start-sheet-host");
    if (!host) {
      host = document.createElement("div");
      host.className = "simulation-start-sheet-host";
      els.setupPanel.append(host);
    }
    if (quickHost.nextElementSibling !== host) {
      host.insertAdjacentElement("beforebegin", quickHost);
    }
    if (!host.contains(els.simulationStart)) {
      host.append(els.simulationStart);
      els.simulationStart.classList.remove("map-simulation-start");
      els.simulationStart.classList.add("sheet-simulation-start");
    }
    if (!state.simulationRunning) {
      els.simulationStart.textContent = "シミュレーション開始";
    }
  };

  const getStationAffiliationLabel = (station) => {
    const code = String(station?.affiliationCode ?? "");
    if (code === "0") {
      return "気象庁";
    }
    if (code === "1") {
      return "地方公共団体";
    }
    if (code === "2") {
      return "防災科学技術研究所";
    }
    return station?.affiliation || "不明";
  };

  const getStationInfoRegion = (station) => {
    const latitude = Number(station?.latitude);
    const longitude = Number(station?.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return "海域";
    }
    let nearest = null;
    let nearestDistance = Infinity;
    PREFECTURE_CENTROIDS.forEach(([name, lat, lon]) => {
      const distance = haversineKilometers([longitude, latitude], [lon, lat]);
      if (distance < nearestDistance) {
        nearest = name;
        nearestDistance = distance;
      }
    });
    return nearestDistance <= 180 ? nearest : "海域";
  };

  const getStationAffiliationDisplayLabel = (station) => {
    const code = String(station?.affiliationCode ?? "");
    if (code === "0") return "気象庁";
    if (code === "1") return "地方公共団体";
    if (code === "2") return "防災科学技術研究所";
    return "不明";
  };

  const getStationRegionSortIndex = (region) => {
    if (region === "海域") {
      return PREFECTURE_CENTROIDS.length + 1;
    }
    const index = PREFECTURE_CENTROIDS.findIndex(([name]) => name === region);
    return index >= 0 ? index : PREFECTURE_CENTROIDS.length;
  };

  const getStationInfoRegionSafe = (station) => {
    const latitude = Number(station?.latitude);
    const longitude = Number(station?.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return "\u6d77\u57df";
    }
    let nearest = null;
    let nearestDistance = Infinity;
    PREFECTURE_CENTROIDS.forEach(([name, lat, lon]) => {
      const distance = haversineKilometers([longitude, latitude], [lon, lat]);
      if (distance < nearestDistance) {
        nearest = name;
        nearestDistance = distance;
      }
    });
    return nearestDistance <= 180 ? nearest : "\u6d77\u57df";
  };

  const getStationRegionSortIndexSafe = (region) => {
    if (region === "\u6d77\u57df") {
      return PREFECTURE_CENTROIDS.length + 1;
    }
    const index = PREFECTURE_CENTROIDS.findIndex(([name]) => name === region);
    return index >= 0 ? index : PREFECTURE_CENTROIDS.length;
  };

  const getStationAffiliationDisplayLabelSafe = (station) => {
    const code = String(station?.affiliationCode ?? "");
    if (code === "0") return "\u6c17\u8c61\u5e81";
    if (code === "1") return "\u5730\u65b9\u516c\u5171\u56e3\u4f53";
    if (code === "2") return "\u9632\u707d\u79d1\u5b66\u6280\u8853\u7814\u7a76\u6240";
    return "\u4e0d\u660e";
  };

  const getStationInfoSuggestionValues = (stations) => {
    const suggestions = new Set();
    for (const station of stations) {
      if (station?.name) suggestions.add(String(station.name));
      if (station?.areaName) suggestions.add(String(station.areaName));
      suggestions.add(getStationInfoRegionSafe(station));
      suggestions.add(getStationAffiliationDisplayLabelSafe(station));
      if (suggestions.size >= 320) break;
    }
    return [...suggestions]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "ja", { numeric: true }));
  };

  const renderStationInfoSuggestions = (stations) => {
    const input = els.infoFullPanel?.querySelector("#station-info-filter");
    const panel = els.infoFullPanel?.querySelector("#station-info-suggestions");
    if (!input || !panel) {
      return;
    }
    const query = normalizePresetFilterText(input.value ?? "");
    if (!query) {
      panel.classList.add("hidden");
      panel.innerHTML = "";
      return;
    }
    const values = getStationInfoSuggestionValues(stations)
      .filter((value) => normalizePresetFilterText(value).includes(query))
      .slice(0, 8);
    if (!values.length) {
      panel.classList.add("hidden");
      panel.innerHTML = "";
      return;
    }
    panel.innerHTML = values
      .map((value) => `<button type="button" data-station-suggestion="${escapeHtml(value)}">${escapeHtml(value)}</button>`)
      .join("");
    panel.classList.remove("hidden");
  };

  const renderInfoStationList = () => {
    if (!els.infoFullPanel) {
      return;
    }
    const stations = Array.isArray(shindoStationData?.stations) ? shindoStationData.stations : [];
    const input = els.infoFullPanel.querySelector("#station-info-filter");
    const regionSelect = els.infoFullPanel.querySelector("#station-info-region");
    const affiliationSelect = els.infoFullPanel.querySelector("#station-info-affiliation");
    const list = els.infoFullPanel.querySelector("#station-info-list");
    const count = els.infoFullPanel.querySelector("#station-info-count");
    if (!list || !count) {
      return;
    }
    if (!stations.length) {
      list.innerHTML = `<div class="station-info-empty">観測点データを読み込み中です。</div>`;
      count.textContent = "-";
      return;
    }
    const regionCounts = new Map();
    stations.forEach((station) => {
      const region = getStationInfoRegionSafe(station);
      regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
    });
    if (regionSelect && regionSelect.dataset.ready !== "true") {
      const options = [...regionCounts.entries()]
        .sort((a, b) => getStationRegionSortIndexSafe(a[0]) - getStationRegionSortIndexSafe(b[0]))
        .map(([region, value]) => `<option value="${escapeHtml(region)}">${escapeHtml(region)}（${value}）</option>`);
      regionSelect.innerHTML = `<option value="">都道府県・海域を選択</option>${options.join("")}`;
      regionSelect.dataset.ready = "true";
    }
    if (regionSelect) {
      regionSelect.value = selectedStationInfoRegion;
    }
    if (false && !selectedStationInfoRegion) {
      count.textContent = `${stations.length.toLocaleString("ja-JP")}`;
      list.innerHTML = `<div class="station-info-empty">都道府県または海域を選択してください。</div>`;
      if (input) {
        input.disabled = true;
      }
      if (affiliationSelect) {
        affiliationSelect.disabled = true;
      }
      return;
    }
    if (input) {
      input.disabled = false;
    }
    if (affiliationSelect) {
      affiliationSelect.disabled = false;
    }
    const query = normalizePresetFilterText(input?.value ?? "");
    const hasUserFilter = Boolean(selectedStationInfoRegion || stationInfoAffiliationFilter || query);
    const filtered = stations.filter((station) => {
      if (selectedStationInfoRegion && getStationInfoRegionSafe(station) !== selectedStationInfoRegion) {
        return false;
      }
      if (stationInfoAffiliationFilter && String(station.affiliationCode ?? "") !== stationInfoAffiliationFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      return normalizePresetFilterText([
        station.name,
        station.areaName,
        station.address,
        getStationAffiliationDisplayLabelSafe(station),
      ].join(" ")).includes(query);
    });
    if (!hasUserFilter) {
      count.textContent = `0 / ${stations.length.toLocaleString("ja-JP")}`;
      list.innerHTML = `<div class="station-info-empty">\u691c\u7d22\u3067\u7d5e\u308a\u8fbc\u3093\u3067\u304f\u3060\u3055\u3044\u3002</div>`;
      renderStationInfoSuggestions(stations);
      return;
    }
    const visible = filtered
      .sort((a, b) =>
        getStationAffiliationDisplayLabelSafe(a).localeCompare(getStationAffiliationDisplayLabelSafe(b), "ja") ||
        String(a.name || "").localeCompare(String(b.name || ""), "ja", { numeric: true })
      )
      .slice(0, 650);
    count.textContent = `${filtered.length.toLocaleString("ja-JP")} / ${stations.length.toLocaleString("ja-JP")}`;
    list.innerHTML = visible.map((station) => `
      <article class="station-info-card">
        <div class="station-info-card-main">
          <strong>${escapeHtml(station.name || "-")}</strong>
          <span>${escapeHtml(station.areaName || "-")}</span>
        </div>
        <dl>
          <div><dt>機関</dt><dd>${escapeHtml(getStationAffiliationDisplayLabelSafe(station))}</dd></div>
          <div><dt>緯度</dt><dd>${escapeHtml(Number(station.latitude).toFixed(3))}</dd></div>
          <div><dt>経度</dt><dd>${escapeHtml(Number(station.longitude).toFixed(3))}</dd></div>
        </dl>
      </article>
    `).join("") + (filtered.length > visible.length ? `<div class="station-info-more">検索で絞り込んでください。</div>` : "");
  };

  const ensureInfoStationPanel = () => {
    if (!els.infoFullPanel || els.infoFullPanel.dataset.stationReady === "true") {
      return;
    }
    els.infoFullPanel.innerHTML = `
      <div class="station-info-toolbar">
        <div class="station-info-search-wrap">
          <input id="station-info-filter" type="search" inputmode="search" autocomplete="off" placeholder="観測点名・地域・機関で検索" aria-label="観測点を検索" />
          <div class="station-info-suggestions hidden" id="station-info-suggestions"></div>
        </div>
        <span id="station-info-count">-</span>
      </div>
      <div class="station-info-list" id="station-info-list"></div>
    `;
    const toolbar = els.infoFullPanel.querySelector(".station-info-toolbar");
    if (toolbar && !toolbar.querySelector("#station-info-region")) {
      const regionSelect = document.createElement("select");
      regionSelect.id = "station-info-region";
      regionSelect.setAttribute("aria-label", "都道府県・海域を選択");
      const affiliationSelect = document.createElement("select");
      affiliationSelect.id = "station-info-affiliation";
      affiliationSelect.setAttribute("aria-label", "機関で絞り込み");
      affiliationSelect.innerHTML = `
        <option value="">すべての機関</option>
        <option value="0">気象庁</option>
        <option value="1">地方公共団体</option>
        <option value="2">防災科学技術研究所</option>
      `;
      toolbar.prepend(regionSelect, affiliationSelect);
      regionSelect.addEventListener("change", (event) => {
        selectedStationInfoRegion = event.target.value;
        renderInfoStationList();
      });
      affiliationSelect.addEventListener("change", (event) => {
        stationInfoAffiliationFilter = event.target.value;
        renderInfoStationList();
      });
    }
    const stationFilterInput = els.infoFullPanel.querySelector("#station-info-filter");
    stationFilterInput?.addEventListener("input", () => {
      const stations = Array.isArray(shindoStationData?.stations) ? shindoStationData.stations : [];
      renderStationInfoSuggestions(stations);
      renderInfoStationList();
    });
    stationFilterInput?.addEventListener("focus", () => {
      renderStationInfoSuggestions(Array.isArray(shindoStationData?.stations) ? shindoStationData.stations : []);
    });
    els.infoFullPanel.querySelector("#station-info-suggestions")?.addEventListener("pointerdown", (event) => {
      const button = event.target?.closest?.("[data-station-suggestion]");
      if (!button || !stationFilterInput) {
        return;
      }
      event.preventDefault();
      stationFilterInput.value = button.dataset.stationSuggestion || "";
      button.parentElement?.classList.add("hidden");
      renderInfoStationList();
    });
    els.infoFullPanel.dataset.stationReady = "true";
  };

  const ensureLearningPanel = () => {
    if (!els.learningFullPanel || els.learningFullPanel.dataset.ready === "true") {
      return;
    }
    const items = [
      ["0", "人は揺れを感じませんが、地震計には記録される段階です。"],
      ["1", "屋内で静かにしている人の中には、わずかな揺れを感じる人がいます。"],
      ["2", "屋内で静かにしている人の多くが揺れを感じ、眠っている人が目を覚ますことがあります。"],
      ["3", "屋内のほとんどの人が揺れを感じ、食器類が音を立てることがあります。"],
      ["4", "ほとんどの人が驚き、つり下げ物が大きく揺れ、座りの悪い置物が倒れることがあります。"],
      ["5弱", "多くの人が恐怖を覚え、物につかまりたいと感じます。棚の物が落ちることがあります。"],
      ["5強", "物につかまらないと歩くことが難しく、固定していない家具が倒れることがあります。"],
      ["6弱", "立っていることが困難になります。固定していない家具の多くが移動し、倒れるものがあります。"],
      ["6強", "立っていられず、はわないと動けないほどの揺れになることがあります。"],
      ["7", "固定していない家具が大きく移動・転倒し、飛ぶこともあります。"],
    ];
    els.learningFullPanel.innerHTML = `
      <div class="learning-content">
        <section class="learning-hero">
          <span class="learning-kicker">地震を知る</span>
          <h2>震度ごとの揺れの目安</h2>
          <p>気象庁の震度階級関連解説表をもとに、アプリ内で読みやすい短い説明に整理しています。</p>
        </section>
        <section class="learning-card">
          <h3>震度は「場所ごとの揺れの強さ」</h3>
          <p>マグニチュードは地震そのものの規模、震度は各地点で観測された揺れの強さです。同じ地震でも、震源からの距離や地盤によって震度は変わります。</p>
        </section>
        <section class="learning-intensity-list">
          ${items.map(([label, description]) => `
            <article class="learning-intensity-item">
              <span class="learning-intensity-badge">${escapeHtml(label)}</span>
              <p>${escapeHtml(description)}</p>
            </article>
          `).join("")}
        </section>
        <section class="learning-card">
          <h3>見るときの注意</h3>
          <p>震度の説明は目安です。実際の被害は、揺れの周期・継続時間・建物の状態・地盤の違いで変わります。</p>
          <a href="https://www.jma.go.jp/jma/kishou/know/shindo/index.html" target="_blank" rel="noopener noreferrer">気象庁「震度について」</a>
          <a href="https://www.jma.go.jp/jma/kishou/know/shindo/kaisetsu.html" target="_blank" rel="noopener noreferrer">気象庁「震度階級関連解説表」</a>
        </section>
      </div>
    `;
    els.learningFullPanel.dataset.ready = "true";
    normalizeLearningIntensityBadges();
    enhanceLearningPanelContent();
  };

  const normalizeLearningIntensityBadges = () => {
    const labels = ["0", "1", "2", "3", "4", "5弱", "5強", "6弱", "6強", "7"];
    els.learningFullPanel?.querySelectorAll(".learning-intensity-badge").forEach((badge, index) => {
      const label = labels[index] ?? badge.textContent;
      const intensityClass = getIntensityClassByLearningLabel(label);
      badge.textContent = label;
      if (intensityClass) {
        badge.style.setProperty("--learning-intensity-color", intensityClass.color);
        badge.style.setProperty("--learning-intensity-text", intensityClass.textColor);
      }
    });
  };

  const getIntensityClassByLearningLabel = (label) => {
    const normalized = String(label).replace("弱", "-").replace("強", "+");
    return INTENSITY_CLASSES.find((item) => item.shortLabel === normalized || item.label === normalized) ?? null;
  };

  const enhanceLearningPanelContent = () => {
    const labels = ["0", "1", "2", "3", "4", "5\u5f31", "5\u5f37", "6\u5f31", "6\u5f37", "7"];
    els.learningFullPanel?.querySelectorAll(".learning-intensity-badge").forEach((badge, index) => {
      const label = labels[index] ?? badge.textContent;
      const normalized = String(label).replace("\u5f31", "-").replace("\u5f37", "+");
      const intensityClass = INTENSITY_CLASSES.find((item) => item.shortLabel === normalized || item.label === normalized);
      badge.textContent = label;
      if (intensityClass) {
        badge.style.setProperty("--learning-intensity-color", intensityClass.color);
        badge.style.setProperty("--learning-intensity-text", intensityClass.textColor);
      }
    });

    const content = els.learningFullPanel?.querySelector(".learning-content");
    if (!content || content.querySelector(".learning-long-period")) {
      return;
    }
    const levels = [
      ["1", "#7dd3fc", "\u5ba4\u5185\u3067\u63fa\u308c\u3092\u611f\u3058\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002"],
      ["2", "#86efac", "\u5ba4\u5185\u306e\u540a\u308a\u4e0b\u3052\u7269\u304c\u5927\u304d\u304f\u63fa\u308c\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002"],
      ["3", "#fde047", "\u7acb\u3063\u3066\u3044\u308b\u3053\u3068\u304c\u56f0\u96e3\u306b\u306a\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\u3002"],
      ["4", "#fb7185", "\u306f\u308f\u306a\u3044\u3068\u52d5\u3051\u306a\u3044\u307b\u3069\u306e\u5927\u304d\u306a\u63fa\u308c\u306b\u306a\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\u3002"],
    ];
    const section = document.createElement("section");
    section.className = "learning-card learning-long-period";
    section.innerHTML = `
      <h3>\u9577\u5468\u671f\u5730\u9707\u52d5\u968e\u7d1a</h3>
      <p>\u9ad8\u5c64\u30d3\u30eb\u306a\u3069\u3067\u3086\u3063\u304f\u308a\u3068\u5927\u304d\u304f\u63fa\u308c\u308b\u73fe\u8c61\u3067\u3059\u3002\u968e\u7d1a\u304c\u5927\u304d\u3044\u307b\u3069\u3001\u9577\u3044\u5468\u671f\u306e\u63fa\u308c\u306b\u3088\u308b\u884c\u52d5\u306e\u3057\u3065\u3089\u3055\u3084\u5ba4\u5185\u306e\u79fb\u52d5\u30fb\u8ee2\u5012\u306e\u53ef\u80fd\u6027\u304c\u9ad8\u304f\u306a\u308a\u307e\u3059\u3002</p>
      <div class="learning-long-period-list">
        ${levels.map(([level, color, text]) => `
          <article class="learning-long-period-item" style="--long-period-color: ${color}">
            <span>${level}</span>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
      <a href="https://www.jma.go.jp/jma/kishou/know/jishin/ltpgm/index.html" target="_blank" rel="noopener noreferrer">\u6c17\u8c61\u5e81\u300c\u9577\u5468\u671f\u5730\u9707\u52d5\u306b\u3064\u3044\u3066\u300d</a>
    `;
    content.append(section);
  };

  const activateEarthquakePanel = () => {
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("panel-active"));
    document.querySelector("#earthquake-panel")?.classList.add("panel-active");
    requestAnimationFrame(() => safelyResizeMap());
  };

  const resetHistoryTabState = () => {
    selectedHistoryLocalAreaName = "";
    abortEarthquakeStatisticsLoad();
    earthquakeStatisticsRange = { startYear: "2026", endYear: "2026" };
    if (els.historyAreaFilter) {
      els.historyAreaFilter.value = "";
    }
    els.historyFullPanel?.querySelectorAll("#history-start-year, #history-end-year").forEach((select) => {
      select.value = "2026";
    });
    if (map?.getSource("jma-local-areas") && localAreaData?.features?.length) {
      setGeoJsonSourceData("jma-local-areas", buildHistoryLocalAreaMapData());
    }
    if (map?.getSource("history-epicenter-areas") && epicenterAreaData?.features?.length) {
      setGeoJsonSourceData("history-epicenter-areas", buildHistoryEpicenterAreaMapData());
    }
  };

  const resetInfoTabState = () => {
    selectedStationInfoRegion = "";
    stationInfoAffiliationFilter = "";
    els.infoFullPanel?.querySelectorAll("#station-info-filter, #station-info-region, #station-info-affiliation").forEach((control) => {
      control.value = "";
    });
  };

  const setActiveBottomTab = (selector) => {
    const previousTabId = document.body.dataset.activeBottomTab || "";
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    const activeTab = document.querySelector(selector);
    activeTab?.classList.add("active");
    document.body.dataset.activeBottomTab = activeTab?.id || "";
    if (previousTabId && previousTabId !== activeTab?.id && state.simulationRunning) {
      stopSimulation();
    }
    if (activeTab?.id !== "bottom-history-tab") {
      resetHistoryTabState();
    }
    if (activeTab?.id !== "bottom-info-tab") {
      resetInfoTabState();
    }
  };

  document.body.dataset.activeBottomTab = document.querySelector(".tab.active")?.id || "earthquake-tab";

  const openInfoOverlay = () => {
    const { sourceOverlay } = setupGlobalOverlays();
    sourceOverlay.classList.remove("hidden");
    document.body.classList.add("source-overlay-open");
    resetSourceInfoScroll(sourceOverlay);
  };

  const openFeedbackOverlay = () => {
    const { feedbackOverlay } = setupGlobalOverlays();
    feedbackOverlay.classList.remove("hidden");
    document.body.classList.add("source-overlay-open");
  };

  const openPushSettingsOverlay = () => {
    const { pushConfirmOverlay } = setupGlobalOverlays();
    showPushConfirmOverlay(pushConfirmOverlay);
  };

  const openSettingsMenuSheet = () => {
    closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
    setSetupMenuOpen(false);
    ensureSettingsStatusCards();
    ensureSettingsAppearanceElements();
    els.settingsMenuSheet?.classList.remove("settings-detail-open");
    els.settingsMenuSheet?.querySelectorAll(".settings-inline-panel").forEach((panel) => {
      panel.classList.add("hidden");
      panel.classList.remove("settings-detail-panel", "is-active", "is-leaving");
    });
    els.settingsMenuSheet?.classList.remove("hidden");
    updateSettingsScreenNotificationState();
  };

  const closeSettingsMenuSheet = () => {
    els.settingsMenuSheet?.classList.add("hidden");
  };

  const closeFullPanels = () => {
    setHistoryMapModeActive(false);
    els.historyFullPanel?.classList.add("hidden");
    els.infoFullPanel?.classList.add("hidden");
    els.learningFullPanel?.classList.add("hidden");
  };

  const openHistoryFullPanel = () => {
    closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
    closeSettingsMenuSheet();
    setSetupMenuOpen(false);
    setSheetState(els.setupPanel, "collapsed");
    els.infoFullPanel?.classList.add("hidden");
    els.learningFullPanel?.classList.add("hidden");
    ensureHistoryFullPanel()?.classList.remove("hidden");
    setHistoryMapModeActive(true);
    renderPastEarthquakeStatsPanel();
    Promise.all([loadLocalAreas(), loadEpicenterAreas()])
      .then(() => {
        setHistoryMapModeActive(true);
        renderPastEarthquakeStatsPanel();
      })
      .catch((error) => {
        if (error?.name === "AbortError") {
          return;
        }
        console.warn("Failed to prepare local area history stats", error);
        renderPastEarthquakeStatsPanel(error);
      });
  };

  const openInfoFullPanel = () => {
    closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
    closeSettingsMenuSheet();
    setSetupMenuOpen(false);
    setHistoryMapModeActive(false);
    els.historyFullPanel?.classList.add("hidden");
    els.learningFullPanel?.classList.add("hidden");
    ensureInfoStationPanel();
    renderInfoStationList();
    els.infoFullPanel?.classList.remove("hidden");
    Promise.resolve(loadShindoStations())
      .then(() => renderInfoStationList())
      .catch((error) => {
        console.warn("Failed to load station information", error);
      });
  };

  const openLearningFullPanel = () => {
    closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
    closeSettingsMenuSheet();
    setSetupMenuOpen(false);
    setHistoryMapModeActive(false);
    els.historyFullPanel?.classList.add("hidden");
    els.infoFullPanel?.classList.add("hidden");
    ensureLearningPanel();
    els.learningFullPanel?.classList.remove("hidden");
  };

  const setSettingsRowLabels = () => {
    ensureSettingsStatusCards();
    ensureSettingsAppearanceElements();
    if (!els.settingsPrivacyButton && els.settingsSourceButton) {
      els.settingsPrivacyButton = document.createElement("button");
      els.settingsPrivacyButton.className = "settings-menu-row";
      els.settingsPrivacyButton.id = "settings-privacy-button";
      els.settingsPrivacyButton.type = "button";
      els.settingsPrivacyButton.innerHTML = `<span>プライバシーポリシー</span><span aria-hidden="true">›</span>`;
      els.settingsSourceButton.insertAdjacentElement("afterend", els.settingsPrivacyButton);
    }
    if (!els.settingsPrivacyPanel && els.settingsSourcePanel) {
      els.settingsPrivacyPanel = document.createElement("section");
      els.settingsPrivacyPanel.className = "settings-inline-panel hidden";
      els.settingsPrivacyPanel.id = "settings-privacy-panel";
      els.settingsPrivacyPanel.setAttribute("aria-label", "プライバシーポリシー");
      els.settingsSourcePanel.insertAdjacentElement("afterend", els.settingsPrivacyPanel);
    }
    if (!els.settingsAdminButton && els.settingsFeedbackButton) {
      els.settingsAdminButton = document.createElement("button");
      els.settingsAdminButton.className = "settings-menu-row";
      els.settingsAdminButton.id = "settings-admin-button";
      els.settingsAdminButton.type = "button";
      els.settingsAdminButton.innerHTML = `<span>管理者モード</span><span aria-hidden="true">›</span>`;
      els.settingsFeedbackButton.insertAdjacentElement("afterend", els.settingsAdminButton);
    }
    if (!els.settingsAdminPanel && els.settingsFeedbackPanel) {
      els.settingsAdminPanel = document.createElement("section");
      els.settingsAdminPanel.className = "settings-inline-panel hidden";
      els.settingsAdminPanel.id = "settings-admin-panel";
      els.settingsAdminPanel.setAttribute("aria-label", "管理者モード");
      els.settingsFeedbackPanel.insertAdjacentElement("afterend", els.settingsAdminPanel);
    }
    if (els.settingsSourceButton?.firstElementChild) {
      els.settingsSourceButton.firstElementChild.textContent = "出典";
      els.settingsSourceButton.lastElementChild.textContent = "›";
      els.settingsSourceButton.setAttribute("aria-controls", "settings-source-panel");
      els.settingsSourceButton.setAttribute("aria-expanded", "false");
    }
    if (els.settingsPrivacyButton?.firstElementChild) {
      els.settingsPrivacyButton.firstElementChild.textContent = "プライバシーポリシー";
      els.settingsPrivacyButton.lastElementChild.textContent = "›";
      els.settingsPrivacyButton.setAttribute("aria-controls", "settings-privacy-panel");
      els.settingsPrivacyButton.setAttribute("aria-expanded", "false");
    }
    if (els.settingsAdminButton?.firstElementChild) {
      els.settingsAdminButton.firstElementChild.textContent = "管理者モード";
      els.settingsAdminButton.lastElementChild.textContent = "›";
      els.settingsAdminButton.setAttribute("aria-controls", "settings-admin-panel");
      els.settingsAdminButton.setAttribute("aria-expanded", "false");
    }
    if (els.settingsFeedbackButton?.firstElementChild) {
      els.settingsFeedbackButton.firstElementChild.textContent = "フィードバック";
      els.settingsFeedbackButton.lastElementChild.textContent = "›";
      els.settingsFeedbackButton.setAttribute("aria-controls", "settings-feedback-panel");
      els.settingsFeedbackButton.setAttribute("aria-expanded", "false");
    }
    if (els.settingsPushButton?.firstElementChild) {
      els.settingsPushButton.firstElementChild.textContent = "通知の設定";
      els.settingsPushButton.lastElementChild.textContent = "›";
    }
    if (els.settingsAppearanceButton?.firstElementChild) {
      els.settingsAppearanceButton.firstElementChild.textContent = "外観";
      els.settingsAppearanceButton.lastElementChild.textContent = "›";
      els.settingsAppearanceButton.setAttribute("aria-controls", "settings-appearance-panel");
      els.settingsAppearanceButton.setAttribute("aria-expanded", "false");
    }
    if (els.settingsPushHistoryButton?.firstElementChild) {
      els.settingsPushHistoryButton.firstElementChild.textContent = "通知履歴";
      els.settingsPushHistoryButton.lastElementChild.textContent = "›";
    }
  };

  const closeSettingsInlinePanels = (exceptPanel = null) => {
    [
      [els.settingsSourceButton, els.settingsSourcePanel],
      [els.settingsPrivacyButton, els.settingsPrivacyPanel],
      [els.settingsFeedbackButton, els.settingsFeedbackPanel],
      [els.settingsAdminButton, els.settingsAdminPanel],
      [els.settingsPushButton, els.settingsPushPanel],
      [els.settingsAppearanceButton, els.settingsAppearancePanel],
      [els.settingsPushHistoryButton, els.settingsPushHistoryPanel],
    ].forEach(([button, panel]) => {
      if (panel && panel !== exceptPanel) {
        panel.classList.add("hidden");
      }
      if (button && panel !== exceptPanel) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  };

  const ensureSettingsPushPanel = () => {
    if (!els.settingsMenuSheet) {
      return;
    }
    if (!els.settingsPushPanel) {
      els.settingsPushPanel = document.createElement("section");
      els.settingsPushPanel.id = "settings-push-panel";
      els.settingsPushPanel.className = "settings-inline-panel hidden settings-push-inline-panel";
      els.settingsPushPanel.setAttribute("aria-label", "通知の設定");
      els.settingsMenuSheet.querySelector(".settings-menu-list")?.append(els.settingsPushPanel);
    }
    if (els.settingsPushPanel.dataset.ready === "true") {
      updateSettingsPushPanelState();
      return;
    }
    els.settingsPushPanel.innerHTML = `
      <section class="push-confirm-panel" data-push-panel="settings">
        <h2>通知の設定</h2>
        <p>アプリを閉じていても、重要なお知らせを通知として受け取れるようにします。</p>
        <div class="push-confirm-actions">
          <button class="push-confirm-yes" type="button">通知を設定</button>
        </div>
        <p class="push-confirm-status" role="status" aria-live="polite"></p>
      </section>
    `;
    const yesButton = els.settingsPushPanel.querySelector(".push-confirm-yes");
    const status = els.settingsPushPanel.querySelector(".push-confirm-status");
    yesButton?.addEventListener("click", async () => {
      yesButton.disabled = true;
      const shouldUnsubscribe = state.pushSubscribed;
      yesButton.textContent = shouldUnsubscribe ? "通知解除中..." : "通知設定中...";
      setPushPermissionStatus(status, shouldUnsubscribe ? "通知を解除しています..." : "通知を設定しています...");
      const ok = shouldUnsubscribe
        ? await disablePushNotificationsFromOverlay(status)
        : await enablePushNotificationsFromOverlay(status);
      updateSettingsScreenNotificationState();
      updateSettingsPushPanelState();
      yesButton.disabled = false;
      if (ok) {
        dispatchNotificationHistoryChange({ source: "settings" });
      }
    });
    els.settingsPushPanel.dataset.ready = "true";
    updateSettingsPushPanelState();
  };

  const updateSettingsPushPanelState = () => {
    const button = els.settingsPushPanel?.querySelector(".push-confirm-yes");
    if (!button) {
      return;
    }
    button.textContent = state.pushSubscribed ? "通知を解除" : "通知を設定";
  };

  const ensureSettingsPushHistoryPanel = () => {
    if (!els.settingsMenuSheet) {
      return;
    }
    if (!els.settingsPushHistoryPanel) {
      els.settingsPushHistoryPanel = document.createElement("section");
      els.settingsPushHistoryPanel.id = "settings-push-history-panel";
      els.settingsPushHistoryPanel.className = "settings-inline-panel hidden settings-push-history-inline-panel";
      els.settingsPushHistoryPanel.setAttribute("aria-label", "通知履歴");
      els.settingsMenuSheet.querySelector(".settings-menu-list")?.append(els.settingsPushHistoryPanel);
    }
    if (els.settingsPushHistoryPanel.dataset.ready !== "true") {
      els.settingsPushHistoryPanel.innerHTML = `
        <section class="push-confirm-panel" data-push-panel="history">
          <div class="push-history-list" role="list"></div>
          <p class="push-history-status" role="status" aria-live="polite"></p>
        </section>
      `;
      els.settingsPushHistoryPanel.querySelector(".push-history-list")?.addEventListener("click", async (event) => {
        const readButton = event.target?.closest?.("[data-read-notification-history]");
        if (readButton) {
          await markNotificationHistoryItemRead(readButton.dataset.readNotificationHistory);
          await renderNotificationHistory(els.settingsPushHistoryPanel);
          return;
        }

        const deleteButton = event.target?.closest?.("[data-delete-notification-history]");
        if (deleteButton) {
          await deleteNotificationHistoryItem(deleteButton.dataset.deleteNotificationHistory);
          await renderNotificationHistory(els.settingsPushHistoryPanel);
          return;
        }

        const item = event.target?.closest?.("[data-read-notification-history-item]");
        if (item) {
          await markNotificationHistoryItemRead(item.dataset.readNotificationHistoryItem);
          await renderNotificationHistory(els.settingsPushHistoryPanel);
        }
      });
      window.addEventListener("notification-history-change", () => {
        if (!els.settingsPushHistoryPanel?.classList.contains("hidden")) {
          renderNotificationHistory(els.settingsPushHistoryPanel);
        }
      });
      els.settingsPushHistoryPanel.dataset.ready = "true";
    }
    renderNotificationHistory(els.settingsPushHistoryPanel);
  };

  const ensureSettingsSourcePanel = () => {
    if (!els.settingsSourcePanel || els.settingsSourcePanel.dataset.ready === "true") {
      return;
    }
    els.settingsSourcePanel.innerHTML = buildSourceInfoOverlayHtml();
    els.settingsSourcePanel.querySelector(".source-info-close")?.remove();
    els.settingsSourcePanel.querySelector(".source-admin-mode-button")?.remove();
    els.settingsSourcePanel.querySelector(".source-info-tabs")?.remove();
    els.settingsSourcePanel.querySelector("#source-panel-privacy")?.remove();
    els.settingsSourcePanel.querySelector("#source-panel-sources")?.classList.remove("hidden");
    setupSourceInfoTabs(els.settingsSourcePanel);
    els.settingsSourcePanel.dataset.ready = "true";
  };

  const ensureSettingsPrivacyPanel = () => {
    if (!els.settingsPrivacyPanel || els.settingsPrivacyPanel.dataset.ready === "true") {
      return;
    }
    els.settingsPrivacyPanel.innerHTML = `
      <div class="source-info-overlay-content settings-privacy-content">
        ${buildPrivacyPolicyHtml()}
      </div>
    `;
    els.settingsPrivacyPanel.dataset.ready = "true";
  };

  const ensureSettingsFeedbackPanel = () => {
    if (!els.settingsFeedbackPanel || els.settingsFeedbackPanel.dataset.ready === "true") {
      return;
    }
    els.settingsFeedbackPanel.innerHTML = `
      <form class="settings-feedback-form">
        <label class="feedback-field" for="settings-feedback-message">
          <span>気づいた点・改善してほしい点</span>
          <textarea id="settings-feedback-message" rows="8" maxlength="4000"></textarea>
        </label>
        <p class="feedback-status" role="status" aria-live="polite"></p>
        <button class="feedback-submit" type="submit">送信</button>
      </form>
    `;
    const form = els.settingsFeedbackPanel.querySelector(".settings-feedback-form");
    const textarea = els.settingsFeedbackPanel.querySelector("#settings-feedback-message");
    const status = els.settingsFeedbackPanel.querySelector(".feedback-status");
    const submitButton = els.settingsFeedbackPanel.querySelector(".feedback-submit");
    applyFeedbackPlaceholder(textarea);
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = textarea?.value.trim() ?? "";
      if (!message) {
        setFeedbackStatus(status, "内容を入力してください。", true);
        textarea?.focus();
        return;
      }
      if (!FEEDBACK_ENDPOINT_URL) {
        setFeedbackStatus(status, "送信用URLが未設定です。", true);
        return;
      }
      submitButton.disabled = true;
      setFeedbackStatus(status, "送信中...", false);
      try {
        await sendFeedbackMessage(message);
        textarea.value = "";
        setFeedbackStatus(status, "送信しました。ありがとうございます。", false);
      } catch (error) {
        console.warn(error);
        setFeedbackStatus(status, "送信に失敗しました。時間をおいて再度お試しください。", true);
      } finally {
        submitButton.disabled = false;
      }
    });
    els.settingsFeedbackPanel.dataset.ready = "true";
  };

  const ensureSettingsAdminPanel = () => {
    if (!els.settingsAdminPanel || els.settingsAdminPanel.dataset.ready === "true") {
      return;
    }
    const adminPanel = createAdminModeOverlay();
    adminPanel.classList.remove("hidden");
    adminPanel.classList.add("settings-admin-embedded");
    adminPanel.querySelector(".source-info-close")?.remove();
    els.settingsAdminPanel.replaceChildren(adminPanel);
    els.settingsAdminPanel.dataset.ready = "true";
    updateAdminModeControls(adminPanel);
  };

  ensureSettingsStatusCards();
  ensureSettingsAppearanceElements();
  ensureSettingsAppearancePanel();
  ensureSimulationStartInsideSheet();
  ensureInfoStationPanel();

  const toggleSettingsInlinePanel = (button, panel, ensurePanel) => {
    ensurePanel();
    const willOpen = panel?.classList.contains("hidden");
    closeSettingsInlinePanels(willOpen ? panel : null);
    panel?.classList.toggle("hidden", !willOpen);
    button?.setAttribute("aria-expanded", willOpen ? "true" : "false");
  };

  let activeSettingsDetailPanel = null;
  let settingsDetailCloseTimer = 0;
  let settingsDetailSwipeStart = null;

  const hideSettingsDetailPanel = (panel) => {
    if (!panel) {
      return;
    }
    panel.classList.add("hidden");
    panel.classList.remove("settings-detail-panel", "is-active", "is-leaving");
  };

  const closeSettingsDetailPanel = ({ immediate = false } = {}) => {
    const panel = activeSettingsDetailPanel;
    if (!panel) {
      return;
    }
    window.clearTimeout(settingsDetailCloseTimer);
    activeSettingsDetailPanel = null;
    els.settingsMenuSheet?.classList.remove("settings-detail-open");
    [
      els.settingsSourceButton,
      els.settingsPrivacyButton,
      els.settingsFeedbackButton,
      els.settingsAdminButton,
      els.settingsPushButton,
      els.settingsAppearanceButton,
      els.settingsPushHistoryButton,
    ].forEach((button) => button?.setAttribute("aria-expanded", "false"));

    if (immediate) {
      hideSettingsDetailPanel(panel);
      return;
    }
    panel.classList.remove("is-active");
    panel.classList.add("is-leaving");
    settingsDetailCloseTimer = window.setTimeout(() => hideSettingsDetailPanel(panel), 220);
  };

  const prepareSettingsDetailPanel = (panel, title) => {
    if (!panel) {
      return;
    }
    if (!panel.querySelector(".settings-detail-head")) {
      const header = document.createElement("header");
      header.className = "settings-detail-head";
      header.innerHTML = `
        <button class="settings-detail-back" type="button" aria-label="戻る">‹</button>
        <h3>${escapeHtml(title)}</h3>
        <span aria-hidden="true"></span>
      `;
      panel.prepend(header);
      header.querySelector(".settings-detail-back")?.addEventListener("click", () => closeSettingsDetailPanel());
    }
  };

  const openSettingsDetailPanel = (button, panel, ensurePanel, title) => {
    ensurePanel();
    if (!panel) {
      return;
    }
    window.clearTimeout(settingsDetailCloseTimer);
    if (activeSettingsDetailPanel && activeSettingsDetailPanel !== panel) {
      hideSettingsDetailPanel(activeSettingsDetailPanel);
    }
    prepareSettingsDetailPanel(panel, title);
    closeSettingsInlinePanels(panel);
    activeSettingsDetailPanel = panel;
    els.settingsMenuSheet?.classList.add("settings-detail-open");
    panel.classList.remove("hidden", "is-leaving");
    panel.classList.add("settings-detail-panel");
    requestAnimationFrame(() => panel.classList.add("is-active"));
    button?.setAttribute("aria-expanded", "true");
  };

  els.settingsMenuSheet?.addEventListener("pointerdown", (event) => {
    if (!activeSettingsDetailPanel) {
      return;
    }
    settingsDetailSwipeStart = { x: event.clientX, y: event.clientY };
  });

  els.settingsMenuSheet?.addEventListener("pointerup", (event) => {
    if (!settingsDetailSwipeStart || !activeSettingsDetailPanel) {
      settingsDetailSwipeStart = null;
      return;
    }
    const deltaX = event.clientX - settingsDetailSwipeStart.x;
    const deltaY = event.clientY - settingsDetailSwipeStart.y;
    settingsDetailSwipeStart = null;
    if (deltaX > 68 && Math.abs(deltaY) < 76) {
      closeSettingsDetailPanel();
    }
  });

  setSettingsRowLabels();
  document.querySelector("#bottom-history-tab span:last-child")?.replaceChildren("地震統計");
  document.querySelector("#bottom-info-tab span:last-child")?.replaceChildren("情報");
  document.querySelector("#bottom-learning-tab span:last-child")?.replaceChildren("学習");
  document.querySelector("#bottom-settings-tab span:last-child")?.replaceChildren("設定");
  document.querySelector("#earthquake-tab span:last-child")?.replaceChildren("シミュレーション");
  els.settingsMenuSheet?.querySelector(".settings-menu-head h2")?.replaceChildren("設定");
  els.settingsPushStatus?.closest(".settings-notification-row")?.querySelector("span")?.replaceChildren("現在の通知");
  els.settingsLocationStatus?.closest(".settings-notification-row")?.querySelector("span")?.replaceChildren("位置情報");
  if (els.settingsPushButton?.firstElementChild) {
    els.settingsPushButton.firstElementChild.textContent = "通知設定";
  }
  if (els.settingsPushHistoryButton?.firstElementChild) {
    els.settingsPushHistoryButton.firstElementChild.textContent = "通知履歴";
  }
  if (els.settingsSourceButton?.firstElementChild) {
    els.settingsSourceButton.firstElementChild.textContent = "出典";
  }
  if (els.settingsPrivacyButton?.firstElementChild) {
    els.settingsPrivacyButton.firstElementChild.textContent = "プライバシーポリシー";
  }
  if (els.settingsFeedbackButton?.firstElementChild) {
    els.settingsFeedbackButton.firstElementChild.textContent = "フィードバック";
  }
  if (els.settingsAppearanceButton?.firstElementChild) {
    els.settingsAppearanceButton.firstElementChild.textContent = "外観";
  }
  if (els.settingsAdminButton?.firstElementChild) {
    els.settingsAdminButton.firstElementChild.textContent = "管理者モード";
  }

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!tab.dataset.panel) {
        return;
      }

      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("panel-active"));

      const previousTabId = document.body.dataset.activeBottomTab || "";
      tab.classList.add("active");
      document.body.dataset.activeBottomTab = tab.id || "";
      if (previousTabId && previousTabId !== tab.id && state.simulationRunning) {
        stopSimulation();
      }
      if (tab.id !== "bottom-history-tab") {
        resetHistoryTabState();
      }
      if (tab.id !== "bottom-info-tab") {
        resetInfoTabState();
      }
      document.querySelector(`#${tab.dataset.panel}`).classList.add("panel-active");

      if (tab.dataset.panel === "earthquake-panel" && map) {
        closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
        els.settingsMenuSheet?.classList.add("hidden");
        closeFullPanels();
        activateSettingsTab("primary");
        ensureSimulationStartInsideSheet();
        if (els.setupPanel?.classList.contains("setup-menu-open") && els.setupPanel?.dataset.sheetState === "open") {
          setSheetState(els.setupPanel, "collapsed");
        } else {
          setSetupMenuOpen(true);
          setSheetState(els.setupPanel, "open");
        }
        requestAnimationFrame(() => safelyResizeMap());
      }
    });
  });

  document.querySelector("#bottom-history-tab")?.addEventListener("click", () => {
    setActiveBottomTab("#bottom-history-tab");
    activateEarthquakePanel();
    openHistoryFullPanel();
  });

  document.querySelector("#bottom-info-tab")?.addEventListener("click", () => {
    setActiveBottomTab("#bottom-info-tab");
    activateEarthquakePanel();
    openInfoFullPanel();
  });

  document.querySelector("#bottom-learning-tab")?.addEventListener("click", () => {
    setActiveBottomTab("#bottom-learning-tab");
    activateEarthquakePanel();
    openLearningFullPanel();
  });

  document.querySelector("#bottom-settings-tab")?.addEventListener("click", () => {
    setActiveBottomTab("#bottom-settings-tab");
    activateEarthquakePanel();
    closeFullPanels();
    setHistoryMapModeActive(false);
    openSettingsMenuSheet();
  });

  els.settingsMenuSheet?.addEventListener("click", (event) => {
    const statusCard = event.target?.closest?.(".settings-status-card");
    if (statusCard && !activeSettingsDetailPanel) {
      if (statusCard.classList.contains("settings-location-card")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (els.currentLocationToggle) {
          els.currentLocationToggle.checked = !els.currentLocationToggle.checked;
          toggleCurrentLocationLink().finally(() => updateSettingsScreenNotificationState());
        }
        return;
      }
      if (statusCard.contains(els.settingsPushStatus)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const status = statusCard.querySelector(".settings-status-message");
        (state.pushSubscribed
          ? disablePushNotificationsFromOverlay(status)
          : enablePushNotificationsFromOverlay(status)
        ).finally(() => {
          updateSettingsScreenNotificationState();
          refreshSettingsPushPanelButton();
        });
        return;
      }
    }
    const row = event.target?.closest?.(".settings-menu-row");
    if (!row || activeSettingsDetailPanel) {
      return;
    }
    const detailMap = {
      "settings-source-button": [els.settingsSourceButton, els.settingsSourcePanel, ensureSettingsSourcePanel, "出典"],
      "settings-privacy-button": [els.settingsPrivacyButton, els.settingsPrivacyPanel, ensureSettingsPrivacyPanel, "プライバシーポリシー"],
      "settings-feedback-button": [els.settingsFeedbackButton, els.settingsFeedbackPanel, ensureSettingsFeedbackPanel, "フィードバック"],
      "settings-admin-button": [els.settingsAdminButton, els.settingsAdminPanel, ensureSettingsAdminPanel, "管理者モード"],
      "settings-push-button": [els.settingsPushButton, els.settingsPushPanel, ensureSettingsPushPanel, "通知設定"],
      "settings-appearance-button": [els.settingsAppearanceButton, els.settingsAppearancePanel, ensureSettingsAppearancePanel, "外観"],
      "settings-push-history-button": [els.settingsPushHistoryButton, els.settingsPushHistoryPanel, ensureSettingsPushHistoryPanel, "通知履歴"],
    };
    const detail = detailMap[row.id];
    if (!detail) {
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    openSettingsDetailPanel(...detail);
  });

  els.settingsMenuClose?.addEventListener("click", () => {
    closeSettingsDetailPanel({ immediate: true });
    closeSettingsMenuSheet();
  });
  els.settingsSourceButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsSourceButton, els.settingsSourcePanel, ensureSettingsSourcePanel, "出典");
  });
  els.settingsPrivacyButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsPrivacyButton, els.settingsPrivacyPanel, ensureSettingsPrivacyPanel, "プライバシーポリシー");
  });
  els.settingsFeedbackButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsFeedbackButton, els.settingsFeedbackPanel, ensureSettingsFeedbackPanel, "フィードバック");
  });
  els.settingsAdminButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsAdminButton, els.settingsAdminPanel, ensureSettingsAdminPanel, "管理者モード");
  });
  els.settingsPushButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsPushButton, els.settingsPushPanel, ensureSettingsPushPanel, "通知設定");
  });
  els.settingsAppearanceButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsAppearanceButton, els.settingsAppearancePanel, ensureSettingsAppearancePanel, "外観");
  });
  els.settingsPushHistoryButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsPushHistoryButton, els.settingsPushHistoryPanel, ensureSettingsPushHistoryPanel, "通知履歴");
  });
}

function renderDepthOptions() {
  const shallow = document.createElement("option");
  shallow.value = "0";
  shallow.textContent = "ごく浅い";

  const depthOptions = Array.from({ length: 691 }, (_, index) => {
    const depth = index + 10;
    const option = document.createElement("option");
    option.value = String(depth);
    option.textContent = `${depth} km`;
    return option;
  });

  els.depth.replaceChildren(shallow, ...depthOptions);
}

function ensureDepthOption(depthKm) {
  if (!els.depth) {
    return;
  }

  const depth = Number(depthKm);
  if (!Number.isFinite(depth) || els.depth.querySelector(`option[value="${depth}"]`)) {
    return;
  }

  const option = document.createElement("option");
  option.value = String(depth);
  option.textContent = `${depth} km`;
  els.depth.append(option);
}

function renderMagnitudeOptions() {
  if (!els.magnitude) {
    return;
  }

  const selectedMagnitude = state.magnitude.toFixed(1);
  const magnitudeOptions = Array.from({ length: 100 }, (_, index) => {
    const magnitude = ((index + 1) / 10).toFixed(1);
    const option = document.createElement("option");
    option.value = magnitude;
    option.textContent = magnitude;
    option.selected = magnitude === selectedMagnitude;
    return option;
  });

  els.magnitude.replaceChildren(...magnitudeOptions);
}

function renderIntensityColorSchemeOptions() {
  if (!els.intensityColorScheme) {
    return;
  }

  const options = [
    ["normal", "気象庁配色"],
    ["high", "高コントラスト"],
    ["low", "低コントラスト"],
    ["p", "P型色覚"],
    ["d", "D型色覚"],
    ["t", "T型色覚"],
    ["a", "A型色覚"],
  ].map(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = value === state.intensityColorScheme;
    return option;
  });

  els.intensityColorScheme.replaceChildren(...options);
}

function renderEarthquakePresetPicker() {
  if (!els.presetPickerList) {
    return;
  }

  const filterText = normalizePresetFilterText(state.presetFilterText);
  const presets = [...EARTHQUAKE_PRESETS]
    .filter((preset) => matchesPresetFilter(preset, filterText))
    .map((preset, index) => ({ preset, index }))
    .sort(comparePresetSortItems)
    .map(({ preset }) => preset)
    .map((preset) => {
      const row = document.createElement("tr");
      const intensityClass = getPresetMaxIntensityClass(preset);
      const intensityBadgeLabel = normalizeIntensityLabelToken(formatPresetMaxIntensity(preset)) || "-";
      row.className = preset.id === state.selectedPresetId ? "selected" : "";
      row.innerHTML = `
        <td><span class="preset-intensity-stack"><span class="preset-depth-over">${escapeHtml(formatPresetDepth(preset))}</span><span class="preset-intensity-badge" style="--preset-intensity-color: ${escapeHtml(intensityClass?.color ?? "#d7d5e3")}; --preset-intensity-text: ${escapeHtml(intensityClass?.textColor ?? "#22242b")};">${escapeHtml(intensityBadgeLabel)}</span><span class="preset-magnitude-under">M${escapeHtml(formatPresetMagnitude(preset))}</span></span></td>
        <td>${escapeHtml(formatPresetDateTime(preset))}</td>
        <td>${escapeHtml(preset.epicenterName ?? preset.label ?? "-")}</td>
        <td>${escapeHtml(formatPresetDepth(preset))}</td>
        <td>${escapeHtml(formatPresetMagnitude(preset))}</td>
      `;
      row.addEventListener("click", () => {
        closeEarthquakePresetPicker();
        applyEarthquakePreset(preset.id);
      });
      return row;
    });

  els.presetPickerList.replaceChildren(...presets);
  updatePresetSortButtons();
  updateEarthquakePresetButtonLabel();
}

function normalizePresetFilterText(value) {
  return String(value ?? "").normalize("NFKC").trim().toLowerCase();
}

function matchesPresetFilter(preset, filterText) {
  if (!filterText) {
    return true;
  }

  return [
    preset?.label,
    preset?.epicenterName,
    preset?.date,
    preset?.time,
    formatPresetDepth(preset),
    formatPresetMagnitude(preset),
    formatPresetMaxIntensity(preset),
  ]
    .map((value) => normalizePresetFilterText(value))
    .some((value) => value.includes(filterText));
}

function comparePresetSortItems(a, b) {
  const sortKey = state.presetSortKey ?? "date";
  const direction = state.presetSortKey && state.presetSortDirection === "asc" ? 1 : -1;
  if (sortKey === "epicenter") {
    const comparedByEpicenter = comparePresetEpicenterNorthToSouth(a.preset, b.preset);
    if (comparedByEpicenter !== 0) {
      return comparedByEpicenter * direction;
    }
  }
  const compared = comparePresetSortValues(
    getPresetSortValue(a.preset, sortKey),
    getPresetSortValue(b.preset, sortKey),
  );

  if (compared !== 0) {
    return compared * direction;
  }

  const fallback = getPresetSortTime(b.preset) - getPresetSortTime(a.preset);
  return fallback || a.index - b.index;
}

function comparePresetEpicenterNorthToSouth(a, b) {
  const aLatitude = Number(a?.latitude);
  const bLatitude = Number(b?.latitude);
  const aHasLatitude = Number.isFinite(aLatitude);
  const bHasLatitude = Number.isFinite(bLatitude);
  if (aHasLatitude && bHasLatitude && aLatitude !== bLatitude) {
    return bLatitude - aLatitude;
  }
  if (aHasLatitude !== bHasLatitude) {
    return aHasLatitude ? -1 : 1;
  }

  const aLongitude = Number(a?.longitude);
  const bLongitude = Number(b?.longitude);
  const aHasLongitude = Number.isFinite(aLongitude);
  const bHasLongitude = Number.isFinite(bLongitude);
  if (aHasLongitude && bHasLongitude && aLongitude !== bLongitude) {
    return aLongitude - bLongitude;
  }
  if (aHasLongitude !== bHasLongitude) {
    return aHasLongitude ? -1 : 1;
  }

  return String(a?.epicenterName ?? a?.label ?? "").localeCompare(
    String(b?.epicenterName ?? b?.label ?? ""),
    "ja",
    { numeric: true, sensitivity: "base" },
  );
}

function comparePresetSortValues(a, b) {
  const aEmpty = a == null || a === "";
  const bEmpty = b == null || b === "";
  if (aEmpty && bEmpty) {
    return 0;
  }
  if (aEmpty) {
    return 1;
  }
  if (bEmpty) {
    return -1;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  return String(a).localeCompare(String(b), "ja", { numeric: true, sensitivity: "base" });
}

function getPresetSortValue(preset, key) {
  switch (key) {
    case "date":
      return getPresetSortTime(preset);
    case "epicenter":
      return String(preset?.epicenterName ?? preset?.label ?? "").trim();
    case "depth":
      return Number.isFinite(Number(preset?.depthKm)) ? Number(preset.depthKm) : null;
    case "magnitude":
      return Number.isFinite(Number(preset?.magnitude)) ? Number(preset.magnitude) : null;
    case "intensity":
      return getPresetMaxIntensityClass(preset)?.rank ?? null;
    default:
      return getPresetSortTime(preset);
  }
}

function togglePresetSort(key) {
  if (state.presetSortKey !== key) {
    state.presetSortKey = key;
    state.presetSortDirection = "asc";
  } else if (state.presetSortDirection === "asc") {
    state.presetSortDirection = "desc";
  } else {
    state.presetSortKey = null;
    state.presetSortDirection = "desc";
  }
  renderEarthquakePresetPicker();
  clampPresetPickerScrollBoundsNow();
}

function updatePresetSortButtons() {
  document.querySelectorAll(".preset-sort-button").forEach((button) => {
    const key = button.dataset.presetSortKey;
    const active = key === state.presetSortKey;
    button.classList.toggle("is-active", active);
    button.dataset.sortState = active ? state.presetSortDirection : "none";
    button.textContent = active ? (state.presetSortDirection === "asc" ? "▲" : "▼") : "▲\n▼";
    button.setAttribute("aria-pressed", String(active));
    const label = button.closest(".preset-sort-head")?.querySelector("span")?.textContent?.trim() || "項目";
    button.setAttribute(
      "aria-label",
      `${label}の並び順を${
        active && state.presetSortDirection === "asc" ? "降順" : "昇順"
      }に切り替え`,
    );
  });
}

function updateEarthquakePresetButtonLabel() {
  if (!els.historicalEarthquakeButton) {
    return;
  }

  const preset = getSelectedPreset();
  els.historicalEarthquakeButton.textContent = preset
    ? formatEarthquakePresetButtonLabel(preset)
    : "地震を選ぶ";
  els.historicalEarthquakeButton.classList.toggle("has-preset", Boolean(preset));
  updateSubmarineObservationToggleAvailability();
}

function setupPresetToolbar() {
  const head = document.querySelector(".preset-picker-head");
  if (!head || head.dataset.toolbarReady === "true") {
    return;
  }

  head.dataset.toolbarReady = "true";
  head.innerHTML = `
    <input class="preset-filter-input" id="preset-filter-input" type="search" inputmode="search" autocomplete="off" placeholder="検索" aria-label="プリセット地震を検索" />
    <select class="preset-sort-select" id="preset-sort-select" aria-label="並べ替え">
      <option value="">新しい順</option>
      <option value="date:asc">古い順</option>
      <option value="intensity:desc">震度が大きい順</option>
      <option value="magnitude:desc">Mが大きい順</option>
      <option value="depth:asc">浅い順</option>
      <option value="epicenter:asc">北から順</option>
    </select>
  `;

  head.querySelector('[data-preset-sort="date:asc"]')?.replaceChildren("発生日時");
  head.querySelector('[data-preset-sort="magnitude:asc"]')?.replaceChildren("マグニチュード");
  head.querySelector('[data-preset-sort="depth:asc"]')?.replaceChildren("深さ");

  const filterInput = head.querySelector("#preset-filter-input");
  const sortSelect = head.querySelector("#preset-sort-select");
  if (filterInput) {
    filterInput.value = state.presetFilterText;
  }
  filterInput?.addEventListener("input", () => {
    state.presetFilterText = filterInput.value;
    renderEarthquakePresetPicker();
    resetPresetPickerScroll();
  });
  sortSelect?.addEventListener("change", () => {
    const [key, direction] = String(sortSelect.value || "").split(":");
    state.presetSortKey = key || null;
    state.presetSortDirection = direction || "desc";
    renderEarthquakePresetPicker();
    resetPresetPickerScroll();
  });
}

function setupPresetToolbar() {
  const head = document.querySelector(".preset-picker-head");
  if (!head) {
    return;
  }

  const previousFilter = head.querySelector("#preset-filter-input")?.value ?? state.presetFilterText;
  head.dataset.toolbarReady = "true";
  head.innerHTML = `
    <input class="preset-filter-input" id="preset-filter-input" type="search" inputmode="search" autocomplete="off" placeholder="検索" aria-label="プリセット地震を検索" />
    <div class="preset-sort-buttons" role="group" aria-label="並び替え">
      <button class="preset-sort-choice" type="button" data-preset-sort="date:asc">発生順</button>
      <button class="preset-sort-choice" type="button" data-preset-sort="magnitude:asc">マグニチュード順</button>
      <button class="preset-sort-choice" type="button" data-preset-sort="depth:asc">深さ順</button>
    </div>
  `;

  const filterInput = head.querySelector("#preset-filter-input");
  if (filterInput) {
    filterInput.value = previousFilter;
    state.presetFilterText = previousFilter;
  }
  filterInput?.addEventListener("input", () => {
    state.presetFilterText = filterInput.value;
    renderEarthquakePresetPicker();
    resetPresetPickerScroll();
  });

  const syncSortButtons = () => {
    head.querySelectorAll("[data-preset-sort]").forEach((button) => {
      const [key] = String(button.dataset.presetSort || "").split(":");
      const isActive = key === state.presetSortKey;
      button.classList.toggle("is-active", isActive);
      button.dataset.sortState = isActive ? state.presetSortDirection : "none";
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  head.querySelectorAll("[data-preset-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const [key] = String(button.dataset.presetSort || "date:asc").split(":");
      if (state.presetSortKey !== key) {
        state.presetSortKey = key || null;
        state.presetSortDirection = "asc";
      } else if (state.presetSortDirection === "asc") {
        state.presetSortDirection = "desc";
      } else {
        state.presetSortKey = null;
        state.presetSortDirection = "desc";
      }
      syncSortButtons();
      renderEarthquakePresetPicker();
      resetPresetPickerScroll();
    });
  });
  syncSortButtons();
}

function formatEarthquakePresetButtonLabel(preset) {
  const label = String(preset?.label ?? "").trim();
  if (label) {
    return label;
  }

  const year = String(preset?.date ?? "").match(/(?:19|20)\d{2}/)?.[0];
  const name = String(preset?.epicenterName ?? "地震").trim();
  return year ? `${name}地震（${year}）` : name;
}

function formatPresetDateTime(preset) {
  const date = String(preset?.date ?? "").trim();
  const time = String(preset?.time ?? "").trim();
  return [date, formatPresetTimeToMinute(time)].filter(Boolean).join(" ") || "-";
}

function formatPresetTimeToMinute(time) {
  const match = String(time ?? "").trim().match(/^(\d{1,2}):(\d{2})/);
  return match ? `${match[1].padStart(2, "0")}:${match[2]}` : String(time ?? "").trim();
}

function formatPresetDepth(preset) {
  const depth = Number(preset?.depthKm);
  return Number.isFinite(depth) ? `${depth} km` : "-";
}

function formatPresetMagnitude(preset) {
  const magnitude = Number(preset?.magnitude);
  return Number.isFinite(magnitude) ? magnitude.toFixed(1) : "-";
}

function formatPresetMaxIntensity(preset) {
  const intensityClass = getPresetMaxIntensityClass(preset);
  const label = String(preset?.maxIntensity ?? "").trim();
  if (label) {
    return label;
  }

  return intensityClass?.label ?? intensityClass?.shortLabel ?? "-";
}

function normalizeIntensityLabelToken(value) {
  return String(value ?? "")
    .trim()
    .replace(/[０-９]/g, (char) => String(char.charCodeAt(0) - 0xff10))
    .replace(/[＋]/g, "+")
    .replace(/[－ー―]/g, "-")
    .replace(/\s+/g, "")
    .replace(/^震度/, "")
    .replace(/強/g, "+")
    .replace(/弱/g, "-");
}

function findIntensityClassByLabel(value) {
  const normalizedLabel = normalizeIntensityLabelToken(value);
  if (!normalizedLabel || normalizedLabel === "-") {
    return null;
  }

  if (normalizedLabel === "6") {
    return INTENSITY_CLASSES.find((item) => item.shortLabel === "6+") ?? null;
  }
  if (normalizedLabel === "5") {
    return INTENSITY_CLASSES.find((item) => item.shortLabel === "5+") ?? null;
  }

  return (
    INTENSITY_CLASSES.find(
      (item) =>
        item.label === value ||
        item.shortLabel === value ||
        normalizeIntensityLabelToken(item.label) === normalizedLabel ||
        normalizeIntensityLabelToken(item.shortLabel) === normalizedLabel,
    ) ?? null
  );
}

function getPresetMaxIntensityClass(preset) {
  const label = String(preset?.maxIntensity ?? "").trim();
  if (label) {
    const matchedClass = findIntensityClassByLabel(label);
    if (matchedClass) {
      return matchedClass;
    }
  }

  const values = (preset?.observedStations ?? [])
    .map((station) => Number(station.intensityValue))
    .filter(Number.isFinite);
  if (values.length === 0) {
    return null;
  }

  return toJmaIntensityClass(Math.max(...values));
}

function getPresetSortTime(preset) {
  const dateText = String(preset?.date ?? "").trim();
  const normalizedDate = dateText.replace(/[./]/g, "-");
  const timeText = String(preset?.time ?? "").trim();
  const time = Date.parse([normalizedDate, timeText].filter(Boolean).join("T"));
  if (Number.isFinite(time)) {
    return time;
  }

  const yearMatch = String(preset?.label ?? "").match(/(?:19|20)\d{2}/);
  return yearMatch ? Date.UTC(Number(yearMatch[0]), 0, 1) : 0;
}

function openEarthquakePresetPicker() {
  setupPresetToolbar();
  const sortSelect = document.querySelector("#preset-sort-select");
  if (sortSelect) {
    sortSelect.value = `${state.presetSortKey}:${state.presetSortDirection}`;
  }
  renderEarthquakePresetPicker();
  els.presetPickerOverlay?.classList.remove("hidden");
  resetPresetPickerScroll();
  els.presetPickerClose?.focus();
}

function closeEarthquakePresetPicker(options = {}) {
  els.presetPickerOverlay?.classList.add("hidden");
  if (options.restoreTab !== false) {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    document.querySelector("#earthquake-tab")?.classList.add("active");
  }
  if (!options.skipFocus) {
    els.historicalEarthquakeButton?.focus();
  }
}

function resetPresetPickerScroll() {
  const scrollElement = els.presetPickerTableWrap;
  if (!scrollElement) {
    return;
  }

  scrollElement.scrollLeft = 0;
  scrollElement.scrollTop = 0;
  schedulePresetPickerScrollClamp();
}

function schedulePresetPickerScrollClamp() {
  if (presetPickerScrollClampFrame) {
    return;
  }

  presetPickerScrollClampFrame = requestAnimationFrame(clampPresetPickerScrollBounds);
}

function clampPresetPickerScrollBoundsNow() {
  if (presetPickerScrollClampFrame) {
    cancelAnimationFrame(presetPickerScrollClampFrame);
    presetPickerScrollClampFrame = 0;
  }

  clampPresetPickerScrollBounds();
}

function clampPresetPickerScrollBounds() {
  presetPickerScrollClampFrame = 0;

  const scrollElement = els.presetPickerTableWrap;
  if (!scrollElement) {
    return;
  }

  const maxLeft = Math.max(0, scrollElement.scrollWidth - scrollElement.clientWidth);
  const maxTop = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
  const nextLeft = Math.min(Math.max(scrollElement.scrollLeft, 0), maxLeft);
  const nextTop = Math.min(Math.max(scrollElement.scrollTop, 0), maxTop);

  if (Math.abs(nextLeft - scrollElement.scrollLeft) > 0.5) {
    scrollElement.scrollLeft = nextLeft;
  }

  if (Math.abs(nextTop - scrollElement.scrollTop) > 0.5) {
    scrollElement.scrollTop = nextTop;
  }
}

function trackPresetPickerTouchStart(event) {
  const touch = event.touches?.[0];
  presetPickerTouchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
}

function limitPresetPickerOverscroll(event) {
  const scrollElement = els.presetPickerTableWrap;
  const touch = event.touches?.[0];
  if (!scrollElement || !touch || !presetPickerTouchStart) {
    return;
  }

  const deltaX = touch.clientX - presetPickerTouchStart.x;
  const deltaY = touch.clientY - presetPickerTouchStart.y;
  const horizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

  const maxLeft = Math.max(0, scrollElement.scrollWidth - scrollElement.clientWidth);
  const maxTop = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
  const pullingPastLeft = scrollElement.scrollLeft <= 0.5 && deltaX > 0;
  const pullingPastRight = scrollElement.scrollLeft >= maxLeft - 0.5 && deltaX < 0;
  const pullingPastTop = scrollElement.scrollTop <= 0.5 && deltaY > 0;
  const pullingPastBottom = scrollElement.scrollTop >= maxTop - 0.5 && deltaY < 0;
  const pullingPastHorizontalEdge = horizontalSwipe && (pullingPastLeft || pullingPastRight);
  const pullingPastVerticalEdge = !horizontalSwipe && (pullingPastTop || pullingPastBottom);

  if (pullingPastHorizontalEdge || pullingPastVerticalEdge) {
    event.preventDefault();
    clampPresetPickerScrollBoundsNow();
  }
}

async function loadEarthquakePresets() {
  try {
    const presets = await loadEarthquakePresetSummaries();
    EARTHQUAKE_PRESETS.splice(0, EARTHQUAKE_PRESETS.length, ...presets);
    renderEarthquakePresetPicker();
    pastEarthquakeAreaStatsCache = { signature: "", rows: [] };
    renderPastEarthquakeStatsPanel();
    invalidateIntensityEstimateCache();
    updateIntensityLayer();
  } catch (error) {
    console.warn(error);
  }
}

function renderPastEarthquakeStatsPanel(error = null) {
  if (!els.historyStatsList) {
    return;
  }

  if (error) {
    els.historyStatsList.innerHTML = `
      <div class="history-stats-empty" role="status">
        <strong>過去の地震回数を読み込めませんでした</strong>
        <span>時間をおいてもう一度お試しください。</span>
      </div>
    `;
    return;
  }

  if (earthquakeStatisticsLoading) {
    els.historyStatsList.innerHTML = `
      <div class="history-stats-empty history-stats-empty-static" role="status">
        <strong>取得中...</strong>
        <span>${escapeHtml(earthquakeStatisticsRange.startYear)}年 〜 ${escapeHtml(earthquakeStatisticsRange.endYear)}年の地震統計を読み込んでいます。</span>
      </div>
    `;
    return;
  }

  if (!EARTHQUAKE_PRESETS.length && !earthquakeStatisticsData?.areas?.length) {
    els.historyStatsList.innerHTML = `
      <div class="history-stats-empty" role="status">
        <strong>地震データを読み込み中</strong>
        <span>プリセット地震データの取得後に表示します。</span>
      </div>
    `;
    return;
  }

  if (!localAreaData?.features?.length) {
    els.historyStatsList.innerHTML = `
      <div class="history-stats-empty" role="status">
        <strong>細分区域を読み込み中</strong>
        <span>区域ごとの回数を集計しています。</span>
      </div>
    `;
    return;
  }

  const filterText = normalizePresetFilterText(els.historyAreaFilter?.value ?? "");
  let rows = getPastEarthquakeAreaStatsRows();
  updateHistoryAreaSuggestions(rows);
  if (!selectedHistoryLocalAreaName) {
    els.historyStatsList.innerHTML = `
      <div class="history-stats-empty history-stats-empty-static" role="status">
        <strong>地域を選択してください</strong>
        <span>地図上の細分区域をタップすると、その地域の地震統計だけを読み込みます。</span>
      </div>
    `;
    return;
  }
  rows = rows.filter((row) => row.areaName === selectedHistoryLocalAreaName);
  rows = rows.filter((row) => {
    if (!filterText) {
      return true;
    }
    return normalizePresetFilterText([
      row.areaName,
      ...row.epicenters.map((item) => item.name),
    ].join(" ")).includes(filterText);
  });

  if (!rows.length) {
    els.historyStatsList.innerHTML = `
      <div class="history-stats-empty" role="status">
        <strong>該当する地震回数がありません</strong>
        <span>検索条件を変えてみてください。</span>
      </div>
    `;
    return;
  }

  const heading = selectedHistoryLocalAreaName
    ? `<div class="history-stats-sheet-head"><strong>${escapeHtml(selectedHistoryLocalAreaName)}</strong><button type="button" data-history-clear-area>全国一覧</button></div>`
    : `<div class="history-stats-sheet-head"><strong>全国の震源域別・細分区域別</strong><span>区域をタップすると詳細表示</span></div>`;
  const cards = rows.map((row) => {
    const epicenters = row.epicenters.slice(0, 4).map((item) => `
      <li>
        <span>${escapeHtml(item.name)}</span>
        <strong>${item.count}</strong>
      </li>
    `).join("");
    const moreCount = Math.max(0, row.epicenters.length - 4);
    return `
      <article class="history-stats-card" role="listitem">
        <div class="history-stats-card-main">
          <strong>${escapeHtml(row.areaName)}</strong>
          <span>直近: ${escapeHtml(row.latestLabel || "-")}</span>
        </div>
        <div class="history-stats-count" aria-label="地震回数">${row.count}</div>
        <ul class="history-epicenter-list">${epicenters}${moreCount ? `<li class="history-epicenter-more">ほか ${moreCount} 件</li>` : ""}</ul>
      </article>
    `;
  }).join("");

  els.historyStatsList.innerHTML = `${heading}${cards}`;
  els.historyStatsList.querySelector("[data-history-clear-area]")?.addEventListener("click", () => {
    selectedHistoryLocalAreaName = "";
    if (map?.getSource("jma-local-areas")) {
      setGeoJsonSourceData("jma-local-areas", buildHistoryLocalAreaMapData());
    }
    renderPastEarthquakeStatsPanel();
  });
}

function updateHistoryAreaSuggestions(rows) {
  const datalist = document.querySelector("#history-area-suggestions");
  if (!datalist || datalist.dataset.signature === String(rows.length)) {
    return;
  }
  const suggestions = new Set();
  rows.forEach((row) => {
    if (row.areaName) suggestions.add(row.areaName);
    row.epicenters?.slice(0, 4).forEach((item) => {
      if (item.name) suggestions.add(item.name);
    });
  });
  datalist.innerHTML = [...suggestions]
    .filter(Boolean)
    .slice(0, 320)
    .map((value) => `<option value="${escapeHtml(value)}"></option>`)
    .join("");
  datalist.dataset.signature = String(rows.length);
}

function getPastEarthquakeAreaStatsRows() {
  if (earthquakeStatisticsData?.areas?.length) {
    return earthquakeStatisticsData.areas
      .filter((area) => area?.areaName && Number(area.count) > 0)
      .map((area) => ({
        areaName: String(area.areaName),
        count: Number(area.count) || 0,
        latestTime: Date.parse(area.latestAt || "") || -Infinity,
        latestLabel: area.latestAt ? formatDateTimeLabel(area.latestAt) : "",
        epicenterCounts: new Map(),
        epicenters: Array.isArray(area.epicenters)
          ? area.epicenters
              .filter((item) => item?.name && Number(item.count) > 0)
              .map((item) => ({ name: String(item.name), count: Number(item.count) || 0 }))
          : [],
      }))
      .sort((a, b) => b.count - a.count || a.areaName.localeCompare(b.areaName, "ja"));
  }

  return [];

  const signature = [
    EARTHQUAKE_PRESETS.length,
    EARTHQUAKE_PRESETS[0]?.id ?? "",
    EARTHQUAKE_PRESETS[EARTHQUAKE_PRESETS.length - 1]?.id ?? "",
    localAreaData?.features?.length ?? 0,
    epicenterAreaData?.features?.length ?? 0,
  ].join("|");

  if (pastEarthquakeAreaStatsCache.signature === signature) {
    return pastEarthquakeAreaStatsCache.rows;
  }

  const byArea = new Map();
  EARTHQUAKE_PRESETS.forEach((preset) => {
    const longitude = Number(preset.longitude);
    const latitude = Number(preset.latitude);
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      return;
    }

    const localArea = findStatisticsAreaForPoint(longitude, latitude);
    const areaName = cleanDisplayAreaName(localArea?.properties?.name) || "区域未判定";
    const epicenterName = String(preset.epicenterName || preset.label || "震源地未設定").trim();
    const row = byArea.get(areaName) ?? {
      areaName,
      count: 0,
      latestTime: -Infinity,
      latestLabel: "",
      epicenterCounts: new Map(),
      epicenters: [],
    };
    row.count += 1;
    const currentCount = row.epicenterCounts.get(epicenterName) ?? 0;
    row.epicenterCounts.set(epicenterName, currentCount + 1);
    const sortTime = getPresetSortTime(preset);
    if (sortTime > row.latestTime) {
      row.latestTime = sortTime;
      row.latestLabel = formatPresetDateTime(preset);
    }
    byArea.set(areaName, row);
  });

  const rows = [...byArea.values()].map((row) => ({
    ...row,
    epicenters: [...row.epicenterCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ja")),
  })).sort((a, b) => b.count - a.count || a.areaName.localeCompare(b.areaName, "ja"));

  pastEarthquakeAreaStatsCache = { signature, rows };
  return rows;
}

function findStatisticsAreaForPoint(longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return null;
  }
  const localArea = localAreaData?.features?.length
    ? findFeatureAtPoint(localAreaData, longitude, latitude)
    : null;
  if (localArea) {
    return localArea;
  }
  const epicenterArea = epicenterAreaData?.features?.length
    ? findEpicenterAreaAtPoint(epicenterAreaData, longitude, latitude)
    : null;
  if (epicenterArea) {
    return epicenterArea;
  }
  return epicenterAreaData?.features?.length
    ? findNearestFeatureByDistance(epicenterAreaData, [toEpicenterAreaSourceLongitude(longitude), latitude], 180)
    : null;
}

function findNearestFeatureByDistance(geojson, point, maxDistanceKm = Infinity) {
  let nearest = null;
  let nearestDistance = Infinity;
  for (const feature of geojson?.features ?? []) {
    const candidate = getNearestPointOnFeature(point, feature);
    if (candidate.distanceKm < nearestDistance) {
      nearest = feature;
      nearestDistance = candidate.distanceKm;
    }
  }
  return nearestDistance <= maxDistanceKm ? nearest : null;
}

function formatDateTimeLabel(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getEarthquakeStatisticsRangeKey() {
  const startYear = Number(earthquakeStatisticsRange.startYear) || 2026;
  const endYear = Number(earthquakeStatisticsRange.endYear) || startYear;
  return `${Math.min(startYear, endYear)}-${Math.max(startYear, endYear)}`;
}

function abortEarthquakeStatisticsLoad() {
  if (earthquakeStatisticsAbortController) {
    earthquakeStatisticsAbortController.abort();
    earthquakeStatisticsAbortController = null;
  }
  earthquakeStatisticsLoadPromise = null;
  earthquakeStatisticsLoading = false;
}

async function loadEarthquakeStatistics(options = {}) {
  const rangeKey = getEarthquakeStatisticsRangeKey();
  if (!options.force && earthquakeStatisticsData && earthquakeStatisticsLoadKey === rangeKey) {
    return earthquakeStatisticsData;
  }
  if (options.force) {
    abortEarthquakeStatisticsLoad();
    earthquakeStatisticsData = null;
  }
  if (!earthquakeStatisticsLoadPromise) {
    const controller = new AbortController();
    earthquakeStatisticsAbortController = controller;
    earthquakeStatisticsLoadKey = rangeKey;
    earthquakeStatisticsLoadPromise = (async () => {
      const startYear = Number(earthquakeStatisticsRange.startYear) || 2026;
      const endYear = Number(earthquakeStatisticsRange.endYear) || startYear;
      const normalizedStartYear = Math.min(startYear, endYear);
      const normalizedEndYear = Math.max(startYear, endYear);
      try {
        earthquakeStatisticsData = await fetchEarthquakeStatisticsFromUsgs(
          normalizedStartYear,
          normalizedEndYear,
          controller.signal,
        );
      } catch (error) {
        if (error?.name === "AbortError") {
          throw error;
        }
        console.warn("USGS earthquake statistics load failed", error);
        earthquakeStatisticsData = {
          source: "USGS Earthquake Catalog API",
          updatedAt: "",
          period: { startYear: normalizedStartYear, endYear: normalizedEndYear },
          areas: [],
        };
      }
      pastEarthquakeAreaStatsCache = { signature: "", rows: [] };
      return earthquakeStatisticsData;
    })().finally(() => {
      if (earthquakeStatisticsAbortController === controller) {
        earthquakeStatisticsAbortController = null;
      }
      earthquakeStatisticsLoadPromise = null;
    });
  }
  return earthquakeStatisticsLoadPromise;
}

async function fetchEarthquakeStatisticsFromUsgs(startYear, endYear, signal) {
  await Promise.all([loadLocalAreas(), loadEpicenterAreas()]);
  const byArea = new Map();
  let fetched = 0;
  for (const [startDate, endDate] of getUsgsMonthRanges(startYear, endYear)) {
    const url = new URL(USGS_EARTHQUAKE_QUERY_URL);
    url.searchParams.set("format", "geojson");
    url.searchParams.set("starttime", startDate);
    url.searchParams.set("endtime", endDate);
    url.searchParams.set("orderby", "time-asc");
    url.searchParams.set("limit", "20000");
    url.searchParams.set("minlatitude", "20");
    url.searchParams.set("maxlatitude", "50");
    url.searchParams.set("minlongitude", "118");
    url.searchParams.set("maxlongitude", "156");
    const response = await fetch(url.toString(), { cache: "no-store", signal });
    if (!response.ok) {
      throw new Error(`USGS request failed: ${response.status}`);
    }
    const data = await response.json();
    const events = Array.isArray(data?.features) ? data.features : [];
    fetched += events.length;
    events.forEach((event) => addUsgsEventToStatistics(byArea, event));
  }

  return {
    source: "USGS Earthquake Catalog API",
    sourceUrl: USGS_EARTHQUAKE_QUERY_URL,
    updatedAt: new Date().toISOString(),
    period: { startYear, endYear },
    fetched,
    areas: [...byArea.values()]
      .map((row) => ({
        areaName: row.areaName,
        count: row.count,
        latestAt: row.latestAt,
        epicenters: [...row.epicenterCounts.entries()]
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ja"))
          .slice(0, 20),
      }))
      .sort((a, b) => b.count - a.count || a.areaName.localeCompare(b.areaName, "ja")),
  };
}

function addUsgsEventToStatistics(byArea, event) {
  const coordinates = event?.geometry?.coordinates;
  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    return;
  }
  const longitude = Number(coordinates[0]);
  const latitude = Number(coordinates[1]);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return;
  }
  const area = findStatisticsAreaForPoint(longitude, latitude);
  const areaName = cleanDisplayAreaName(area?.properties?.name);
  if (!areaName) {
    return;
  }
  const eventTime = new Date(Number(event.properties?.time) || 0);
  if (Number.isNaN(eventTime.getTime())) {
    return;
  }
  const place = cleanDisplayAreaName(event.properties?.place) || areaName;
  const row = byArea.get(areaName) || {
    areaName,
    count: 0,
    latestAt: "",
    epicenterCounts: new Map(),
  };
  row.count += 1;
  const isoTime = eventTime.toISOString();
  if (!row.latestAt || isoTime > row.latestAt) {
    row.latestAt = isoTime;
  }
  row.epicenterCounts.set(place, (row.epicenterCounts.get(place) || 0) + 1);
  byArea.set(areaName, row);
}

function getUsgsMonthRanges(startYear, endYear) {
  const normalizedStartYear = Math.min(Number(startYear) || 2026, Number(endYear) || startYear || 2026);
  const normalizedEndYear = Math.max(Number(startYear) || 2026, Number(endYear) || startYear || 2026);
  const ranges = [];
  let cursor = new Date(Date.UTC(normalizedStartYear, 0, 1));
  const finalDate = new Date(Date.UTC(normalizedEndYear + 1, 0, 1));
  while (cursor < finalDate) {
    const next = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1));
    ranges.push([cursor.toISOString().slice(0, 10), (next < finalDate ? next : finalDate).toISOString().slice(0, 10)]);
    cursor = next;
  }
  return ranges;
}

function setHistoryMapModeActive(active) {
  document.body.classList.toggle("history-map-mode", Boolean(active));
  if (!map) {
    return;
  }
  map.setMaxZoom?.(active ? 7.2 : 14);

  if (active && localAreaData?.features?.length) {
    setGeoJsonSourceData("jma-local-areas", buildHistoryLocalAreaMapData());
    if (epicenterAreaData?.features?.length && map.getSource("history-epicenter-areas")) {
      setGeoJsonSourceData("history-epicenter-areas", buildHistoryEpicenterAreaMapData());
    }
    updateLayerVisibility("history-local-area-fill", true);
    updateLayerVisibility("history-epicenter-area-fill", Boolean(epicenterAreaData?.features?.length));
    updateLayerVisibility("jma-intensity-fill", false);
    updateLayerVisibility("eew-warning-fill", false);
    updateLayerVisibility("municipality-boundaries", false);
    updateHistoryMapIsolation();
    bindHistoryMapEvents();
    return;
  }

  updateLayerVisibility("history-local-area-fill", false);
  updateLayerVisibility("history-epicenter-area-fill", false);
  if (map.getSource("jma-local-areas") && localAreaData?.features?.length) {
    const elapsedSec = state.simulationRunning ? getSimulationStationElapsedSec() : Infinity;
    setGeoJsonSourceData("jma-local-areas", buildIntensityAreaData(localAreaData, elapsedSec));
  }
  updateDisplayMode();
}

function updateHistoryMapIsolation() {
  [
    "shindo-station-points",
    "submarine-observation-fill",
    "eew-warning-fill",
    "municipality-boundaries",
    "plate-boundaries",
    "active-fault-lines",
    "p-wave-fill",
    "p-wave-line",
    "s-wave-fill",
    "s-wave-line",
  ].forEach((layerId) => updateLayerVisibility(layerId, false));
  closeInactiveStationPopups();
  scheduleStationCanvasRender({ force: true });
}

function buildHistoryLocalAreaMapData() {
  if (!localAreaData?.features?.length) {
    return emptyFeatureCollection();
  }

  return {
    ...localAreaData,
    features: localAreaData.features.map((feature) => {
      const areaName = cleanDisplayAreaName(feature.properties?.name);
      const selectable = Boolean(areaName);
      return {
        ...feature,
        properties: {
          ...(feature.properties ?? {}),
          historySelectable: selectable,
          historySelected: Boolean(areaName && areaName === selectedHistoryLocalAreaName),
        },
      };
    }),
  };
}

function buildHistoryEpicenterAreaMapData() {
  if (!epicenterAreaData?.features?.length) {
    return emptyFeatureCollection();
  }

  return {
    ...epicenterAreaData,
    features: epicenterAreaData.features.map((feature) => {
      const areaName = cleanDisplayAreaName(feature.properties?.name);
      const marine = isMarineStatisticsAreaName(areaName);
      return {
        ...feature,
        properties: {
          ...(feature.properties ?? {}),
          historySelectable: Boolean(areaName),
          historySelected: Boolean(areaName && areaName === selectedHistoryLocalAreaName),
          historyMarine: marine,
        },
      };
    }),
  };
}

function isMarineStatisticsAreaName(areaName) {
  const name = String(areaName || "");
  return /海|沖|湾|灘|水道|海峡|洋|島近海|島沖|諸島|列島|沿岸/.test(name);
}

function bindHistoryMapEvents() {
  if (!map || historyMapEventsBound) {
    return;
  }

  historyMapEventsBound = true;
  map.on("click", "history-local-area-fill", (event) => {
    if (document.body.dataset.activeBottomTab !== "bottom-history-tab") {
      return;
    }
    const feature = event.features?.[0];
    const areaName = cleanDisplayAreaName(feature?.properties?.name);
    if (!areaName) {
      return;
    }
    selectedHistoryLocalAreaName = areaName;
    setGeoJsonSourceData("jma-local-areas", buildHistoryLocalAreaMapData());
    if (map.getSource("history-epicenter-areas")) {
      setGeoJsonSourceData("history-epicenter-areas", buildHistoryEpicenterAreaMapData());
    }
    renderPastEarthquakeStatsPanel();
  });
  map.on("click", "history-epicenter-area-fill", (event) => {
    if (document.body.dataset.activeBottomTab !== "bottom-history-tab") {
      return;
    }
    const feature = event.features?.[0];
    const areaName = cleanDisplayAreaName(feature?.properties?.name);
    if (!areaName) {
      return;
    }
    selectedHistoryLocalAreaName = areaName;
    setGeoJsonSourceData("jma-local-areas", buildHistoryLocalAreaMapData());
    setGeoJsonSourceData("history-epicenter-areas", buildHistoryEpicenterAreaMapData());
    renderPastEarthquakeStatsPanel();
  });
  map.on("mouseenter", "history-local-area-fill", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "history-local-area-fill", () => {
    map.getCanvas().style.cursor = "";
  });
  map.on("mouseenter", "history-epicenter-area-fill", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "history-epicenter-area-fill", () => {
    map.getCanvas().style.cursor = "";
  });
}

async function loadEarthquakePresetSummaries() {
  try {
    const config = await loadPushConfig();
    const workerUrl = String(config.workerUrl || "").replace(/\/+$/, "");
    if (workerUrl) {
      const response = await fetch(`${workerUrl}/earthquake-presets`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load earthquake presets from D1: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data.presets)) {
        return data.presets.map(normalizeEarthquakePresetSummary);
      }
    }
  } catch (error) {
    console.warn("D1 earthquake presets unavailable", error);
  }

  return [];
}

function normalizeEarthquakePresetSummary(preset) {
  return {
    id: String(preset.id || ""),
    label: String(preset.label || ""),
    date: String(preset.date || ""),
    time: String(preset.time || ""),
    epicenterName: String(preset.epicenterName || ""),
    latitude: Number(preset.latitude),
    longitude: Number(preset.longitude),
    depthKm: Number(preset.depthKm),
    magnitude: Number(preset.magnitude),
    maxIntensity: String(preset.maxIntensity || ""),
  };
}

async function ensureEarthquakePresetDetail(presetId) {
  const cached = earthquakePresetDetailCache.get(presetId);
  if (cached?.observedStations) {
    return cached;
  }

  const existingPreset = EARTHQUAKE_PRESETS.find((preset) => preset.id === presetId);
  if (existingPreset?.observedStations) {
    earthquakePresetDetailCache.set(presetId, existingPreset);
    return existingPreset;
  }

  presetDetailLoadingId = presetId;
  updateSimulationAvailability();
  try {
    const detail = await fetchEarthquakePresetDetailFromWorker(presetId);
    const preset = detail || earthquakePresetDetailCache.get(presetId) || existingPreset;
    if (!preset?.observedStations) {
      throw new Error(`Earthquake preset detail is unavailable: ${presetId}`);
    }

    earthquakePresetDetailCache.set(presetId, preset);
    const index = EARTHQUAKE_PRESETS.findIndex((item) => item.id === presetId);
    if (index >= 0) {
      EARTHQUAKE_PRESETS[index] = { ...EARTHQUAKE_PRESETS[index], ...preset };
    }
    return EARTHQUAKE_PRESETS.find((item) => item.id === presetId) ?? preset;
  } finally {
    if (presetDetailLoadingId === presetId) {
      presetDetailLoadingId = "";
      updateSimulationAvailability();
    }
  }
}

async function fetchEarthquakePresetDetailFromWorker(presetId) {
  const config = await loadPushConfig();
  const workerUrl = String(config.workerUrl || "").replace(/\/+$/, "");
  if (!workerUrl) {
    return null;
  }

  const response = await fetch(`${workerUrl}/earthquake-presets/${encodeURIComponent(presetId)}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Failed to load earthquake preset detail from D1: ${response.status}`);
  }

  const data = await response.json();
  return data.preset || null;
}

function bindSimulationControls() {
  els.settingsMenuButton?.addEventListener("click", () => toggleSetupMenu());

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-settings-tab]");
    if (!button) {
      return;
    }

    event.preventDefault();
    activateSettingsTab(button.dataset.settingsTab || "primary");
  });

  [els.latitude, els.longitude].forEach((input) => {
    input.addEventListener("input", () => {
      validateCoordinateInput(input, { report: true });
    });
    input.addEventListener("blur", () => {
      updateStateFromInputs({ resolveLocation: true, enforceManagedArea: true });
      syncInputs();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        input.blur();
      }
    });
  });
  els.depth.addEventListener("change", () => updateStateFromInputs());
  els.magnitude.addEventListener("change", () => updateStateFromInputs());
  els.historicalEarthquakeButton?.addEventListener("click", () => openEarthquakePresetPicker());
  els.presetPickerClose?.addEventListener("click", () => closeEarthquakePresetPicker());
  document.querySelectorAll(".preset-sort-button").forEach((button) => {
    button.addEventListener("click", () => togglePresetSort(button.dataset.presetSortKey));
  });
  els.presetPickerOverlay?.addEventListener("click", (event) => {
    if (event.target === els.presetPickerOverlay) {
      closeEarthquakePresetPicker();
    }
  });
  els.presetPickerTableWrap?.addEventListener("scroll", () => clampPresetPickerScrollBoundsNow(), { passive: true });
  els.presetPickerTableWrap?.addEventListener("touchstart", trackPresetPickerTouchStart, { passive: true });
  els.presetPickerTableWrap?.addEventListener("touchmove", limitPresetPickerOverscroll, { passive: false });
  els.presetPickerTableWrap?.addEventListener("touchend", () => clampPresetPickerScrollBoundsNow(), { passive: true });
  els.presetPickerTableWrap?.addEventListener("touchcancel", () => {
    presetPickerTouchStart = null;
    clampPresetPickerScrollBoundsNow();
  }, { passive: true });
  els.presetPickerTableWrap?.addEventListener("pointerup", () => clampPresetPickerScrollBoundsNow(), { passive: true });
  window.addEventListener("resize", () => schedulePresetPickerScrollClamp());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.presetPickerOverlay?.classList.contains("hidden")) {
      closeEarthquakePresetPicker();
    }
    if (
      event.key === "Escape"
      && !els.setupPanel?.classList.contains("setup-menu-closed")
      && els.simulationPanel?.classList.contains("hidden")
    ) {
      setSetupMenuOpen(false);
    }
  });
  els.intensityColorScheme?.addEventListener("change", () => {
    applyIntensityColorScheme(els.intensityColorScheme.value);
  });
  els.epicenterEditToggle.addEventListener("change", () => updateEpicenterEditMode());
  els.stationLayerToggle.addEventListener("change", () => updateDisplayMode());
  els.submarineStationLayerToggle?.addEventListener("change", () => updateDisplayMode());
  els.regionLayerToggle.addEventListener("change", () => updateDisplayMode());
  els.eewWarningToggle.addEventListener("change", () => updateDisplayMode());
  els.plateBoundaryLayerToggle?.addEventListener("change", () => updateDisplayMode());
  els.faultLayerToggle?.addEventListener("change", () => updateDisplayMode());
  els.simulationStationLayerToggle.addEventListener("change", () => syncSimulationLayerToggles());
  els.simulationSubmarineStationLayerToggle?.addEventListener("change", () => syncSimulationLayerToggles());
  els.simulationRegionLayerToggle.addEventListener("change", () => syncSimulationLayerToggles());
  els.simulationEewWarningToggle.addEventListener("change", () => syncSimulationLayerToggles());
  els.simulationPlateBoundaryLayerToggle?.addEventListener("change", () => syncSimulationLayerToggles());
  els.simulationFaultLayerToggle?.addEventListener("change", () => syncSimulationLayerToggles());
  els.currentLocationToggle?.addEventListener("change", () => {
    toggleCurrentLocationLink();
    updateSettingsScreenNotificationState();
  });
  els.simulationStart.addEventListener("click", () => {
    if (state.simulationRunning) {
      stopSimulation();
      return;
    }

    startSimulation();
  });
  els.simulationPause?.addEventListener("click", () => {
    if (state.simulationCompleted) {
      startSimulation();
      return;
    }

    toggleSimulationPause();
  });
  els.simulationStop.addEventListener("click", () => stopSimulation());
  document.addEventListener("visibilitychange", pauseSimulationWhenAppHidden);
  window.addEventListener("pagehide", pauseSimulationWhenAppHidden);
  document.addEventListener("freeze", pauseSimulationWhenAppHidden);

  els.resetEpicenter.addEventListener("click", () => {
    resetEpicenterToInitialState();
  });

  syncInputs();
  updateDisplayMode();
  updateSimulationAvailability();
  setSetupMenuOpen(false);
  updateSettingsMenuButtonVisibility();
}

function activateSettingsTab(tabId) {
  const nextTabId = String(tabId || "primary");
  document.querySelectorAll("[data-settings-tab]").forEach((button) => {
    const selected = button.dataset.settingsTab === nextTabId;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", selected ? "true" : "false");
  });
  document.querySelectorAll("[data-settings-section]").forEach((section) => {
    section.hidden = section.dataset.settingsSection !== nextTabId;
  });
}

function setSetupMenuOpen(open) {
  if (!els.setupPanel) {
    return;
  }

  const nextOpen = Boolean(open);
  els.setupPanel.classList.toggle("setup-menu-closed", !nextOpen);
  els.setupPanel.classList.toggle("setup-menu-open", nextOpen);
  if (els.settingsMenuButton) {
    els.settingsMenuButton.classList.toggle("is-active", nextOpen);
    els.settingsMenuButton.setAttribute("aria-expanded", nextOpen ? "true" : "false");
    els.settingsMenuButton.setAttribute("aria-label", nextOpen ? "設定メニューを閉じる" : "設定メニューを開く");
  }
  if (nextOpen) {
    setSheetState(els.setupPanel, "open");
  } else {
    setSheetState(els.setupPanel, "collapsed");
  }
}

function toggleSetupMenu() {
  setSetupMenuOpen(els.setupPanel?.classList.contains("setup-menu-closed"));
}

function updateSettingsMenuButtonVisibility() {
  if (!els.settingsMenuButton) {
    return;
  }

  els.settingsMenuButton.classList.toggle("is-hidden", state.simulationRunning);
}

function resetEpicenterToInitialState(options = {}) {
  if (options.stopSimulation && state.simulationRunning) {
    stopSimulation();
  }
  if (options.cancelSpeech) {
    cancelSpeechAnnouncements();
  }
  state.latitude = 35.681;
  state.longitude = 139.767;
  state.depthKm = 10;
  state.magnitude = 3.5;
  state.selectedPresetId = "";
  resetCheckboxesToDefaults();
  updateEarthquakePresetButtonLabel();
  state.epicenterName = "未選択";
  state.municipalityName = "未選択";
  invalidateIntensityEstimateCache();
  syncInputs();
  updateEpicenterEditMode();
  updateDisplayMode();
  clearCurrentLocationLink();
  updateEpicenter({ resolveLocation: true, enforceManagedArea: true });
  resetViewAnimating = true;
  updateSimulationAvailability();
  resetMapViewToInitial().finally(() => {
    resetViewAnimating = false;
    updateSimulationAvailability();
  });
}

async function setupPushNotifications() {
  if (IS_LOCAL_DEV) {
    setPushNotificationStatus("ローカル開発中は通知を無効化しています", { disabled: true });
    return;
  }

  if (!els.notificationEnable || !els.notificationStatus) {
    return;
  }

  if (!("serviceWorker" in navigator)) {
    setPushNotificationStatus("このブラウザはService Workerに対応していません。", { disabled: true });
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("./sw.js");

    if (!("PushManager" in window) || !("Notification" in window)) {
      setPushNotificationStatus("このブラウザはPush通知に対応していません。", { disabled: true });
      return;
    }

    const config = await loadPushConfig();
    state.pushConfigured = Boolean(config.workerUrl);

    if (!state.pushConfigured) {
      setPushNotificationStatus("Cloudflare Worker URLが未設定です。", { disabled: true });
      return;
    }

    const subscription = await registration.pushManager.getSubscription();
    state.pushSubscribed = Boolean(subscription);
    setPushNotificationStatus(
      subscription ? "通知は有効です。" : "通知を有効にできます。",
      { disabled: false },
    );
  } catch (error) {
    console.warn("push notification setup failed", error);
    setPushNotificationStatus("通知の初期化に失敗しました。", { disabled: false });
  }
}

async function loadPushConfig() {
  try {
    const response = await fetch(`${PUSH_CONFIG_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      return {};
    }

    const config = await response.json();
    return {
      workerUrl: typeof config.workerUrl === "string" ? config.workerUrl.trim() : "",
    };
  } catch (error) {
    console.warn("push config load failed", error);
    return {};
  }
}

async function getWorkerBaseUrl() {
  const config = await loadPushConfig();
  return String(config.workerUrl || "").replace(/\/+$/, "");
}

function setPushNotificationStatus(message, options = {}) {
  if (els.notificationStatus) {
    els.notificationStatus.textContent = message;
  }

  if (els.notificationEnable) {
    els.notificationEnable.disabled = Boolean(options.disabled);
    els.notificationEnable.textContent = state.pushSubscribed ? "通知は有効です" : "通知を有効にする";
  }
}

function updateSettingsScreenNotificationState() {
  if (els.settingsPushStatus) {
    els.settingsPushStatus.textContent = state.pushSubscribed ? "ON" : "OFF";
    els.settingsPushStatus.dataset.state = state.pushSubscribed ? "on" : "off";
  }
  if (els.settingsLocationStatus) {
    const locationOn = Boolean(els.currentLocationToggle?.checked);
    els.settingsLocationStatus.textContent = locationOn ? "ON" : "OFF";
    els.settingsLocationStatus.dataset.state = locationOn ? "on" : "off";
  }
  if (els.settingsPushToggle) {
    els.settingsPushToggle.classList.toggle("is-on", state.pushSubscribed);
    els.settingsPushToggle.setAttribute("aria-pressed", String(state.pushSubscribed));
  }
}

function getAppearanceTheme() {
  const value = localStorage.getItem(APPEARANCE_THEME_KEY);
  return ["system", "light", "dark"].includes(value) ? value : DEFAULT_APPEARANCE_THEME;
}

function setAppearanceTheme(value) {
  const nextValue = ["system", "light", "dark"].includes(value) ? value : DEFAULT_APPEARANCE_THEME;
  localStorage.setItem(APPEARANCE_THEME_KEY, nextValue);
  applyAppearanceTheme(nextValue);
}

function applyAppearanceTheme(value = getAppearanceTheme()) {
  const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? true;
  const resolved = value === "system" ? (systemDark ? "dark" : "light") : value;
  document.documentElement.dataset.appearanceTheme = value;
  document.documentElement.dataset.resolvedTheme = resolved;
}

function base64UrlToUint8Array(value) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = `${value}${padding}`.replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((character) => character.charCodeAt(0)));
}

function resetCheckboxesToDefaults() {
  state.epicenterEditEnabled = false;
  state.showStationLayer = false;
  state.showSubmarineStationLayer = false;
  state.showRegionLayer = false;
  state.showEewWarningLayer = false;
  state.showPlateBoundaryLayer = false;
  state.showFaultLayer = false;
  if (els.epicenterEditToggle) {
    els.epicenterEditToggle.checked = false;
  }
  if (els.stationLayerToggle) {
    els.stationLayerToggle.checked = false;
  }
  if (els.submarineStationLayerToggle) {
    els.submarineStationLayerToggle.checked = false;
  }
  if (els.regionLayerToggle) {
    els.regionLayerToggle.checked = false;
  }
  if (els.eewWarningToggle) {
    els.eewWarningToggle.checked = false;
  }
  if (els.plateBoundaryLayerToggle) {
    els.plateBoundaryLayerToggle.checked = false;
  }
  if (els.faultLayerToggle) {
    els.faultLayerToggle.checked = false;
  }
  if (els.simulationStationLayerToggle) {
    els.simulationStationLayerToggle.checked = false;
  }
  if (els.simulationSubmarineStationLayerToggle) {
    els.simulationSubmarineStationLayerToggle.checked = false;
  }
  if (els.simulationRegionLayerToggle) {
    els.simulationRegionLayerToggle.checked = false;
  }
  if (els.simulationEewWarningToggle) {
    els.simulationEewWarningToggle.checked = false;
  }
  if (els.simulationPlateBoundaryLayerToggle) {
    els.simulationPlateBoundaryLayerToggle.checked = false;
  }
  if (els.simulationFaultLayerToggle) {
    els.simulationFaultLayerToggle.checked = false;
  }
  if (els.currentLocationToggle) {
    els.currentLocationToggle.checked = false;
  }
}

function applyIntensityColorScheme(schemeId, options = {}) {
  const scheme = INTENSITY_COLOR_SCHEMES[schemeId] ?? INTENSITY_COLOR_SCHEMES.normal;
  const nextSchemeId = INTENSITY_COLOR_SCHEMES[schemeId] ? schemeId : "normal";
  state.intensityColorScheme = nextSchemeId;

  INTENSITY_CLASSES.forEach((intensityClass) => {
    const key = intensityClass.shortLabel;
    intensityClass.color = scheme.colors[key] ?? intensityClass.color;
    intensityClass.textColor = scheme.textColors[key] ?? intensityClass.textColor;
  });

  if (els.intensityColorScheme) {
    els.intensityColorScheme.value = nextSchemeId;
  }

  updateLegendColors();
  scheduleStationCanvasRender();

  if (options.refreshLayers === false) {
    return;
  }

  invalidateIntensityEstimateCache();
  updateIntensityLayer();
}

function updateLegendColors() {
  const legendScale = document.querySelector(".intensity-scale");
  if (!legendScale) {
    return;
  }

  const labels = isOldJmaScaleSyntheticPreset(getSelectedPreset())
    ? ["7", "6", "5", "4", "3", "2", "1"]
    : ["7", "6+", "6-", "5+", "5-", "4", "3", "2", "1"];
  legendScale.replaceChildren(
    ...labels.map((label) => {
      const item = document.createElement("span");
      item.textContent = label;
      return item;
    }),
  );

  document.querySelectorAll(".intensity-scale span").forEach((legendItem) => {
    const label = legendItem.textContent.trim();
    const intensityClass = getLegendIntensityClass(label);

    if (!intensityClass) {
      return;
    }

    legendItem.style.setProperty("--color", intensityClass.color);
    legendItem.style.setProperty("--text-color", intensityClass.textColor);
  });
}

function getLegendIntensityClass(label) {
  if (isOldJmaScaleSyntheticPreset(getSelectedPreset())) {
    if (label === "6") {
      return INTENSITY_CLASSES.find((item) => item.shortLabel === "6+");
    }
    if (label === "5") {
      return INTENSITY_CLASSES.find((item) => item.shortLabel === "5+");
    }
  }

  return findIntensityClassByLabel(label);
}

async function applyEarthquakePreset(presetId) {
  state.selectedPresetId = presetId;
  let preset = EARTHQUAKE_PRESETS.find((item) => item.id === presetId);
  updateEarthquakePresetButtonLabel();

  if (!preset) {
    updateLegendColors();
    syncInputs();
    updateDisplayMode();
    updateSimulationAvailability();
    return;
  }

  try {
    preset = await ensureEarthquakePresetDetail(presetId);
  } catch (error) {
    console.warn(error);
  }

  if (state.selectedPresetId !== presetId || !preset) {
    return;
  }

  state.latitude = Number(preset.latitude.toFixed(3));
  state.longitude = Number(preset.longitude.toFixed(3));
  state.depthKm = preset.depthKm;
  state.magnitude = preset.magnitude;
  state.epicenterName = preset.epicenterName;
  state.municipalityName = "海域";
  state.epicenterEditEnabled = false;
  els.epicenterEditToggle.checked = false;
  updateEpicenterEditMode();
  invalidateIntensityEstimateCache();
  scheduleOldScaleSyntheticMunicipalityHydration(preset);
  updateLegendColors();
  syncInputs();
  updateEpicenter({ resolveLocation: true, preservePresetEpicenterName: shouldPreservePresetEpicenterName(preset) });

  if (map) {
    resetViewAnimating = true;
    updateSimulationAvailability();
    animateMapViewTo({
      center: [state.longitude, state.latitude],
      zoom: Math.max(map.getZoom(), 6),
      padding: getInitialMapPaddingForViewport(),
      duration: 700,
    }).finally(() => {
      resetViewAnimating = false;
      updateSimulationAvailability();
    });
  }
}

function getSelectedPreset() {
  return EARTHQUAKE_PRESETS.find((preset) => preset.id === state.selectedPresetId) ?? null;
}

function clearSelectedPreset() {
  if (!state.selectedPresetId) {
    return;
  }

  state.selectedPresetId = "";
  presetDetailLoadingId = "";
  oldScaleSyntheticMunicipalityHydrationPromise = null;
  oldScaleSyntheticMunicipalityHydratingPresetId = "";
  updateEarthquakePresetButtonLabel();
  updateLegendColors();
}

function getPresetStationObservation(station) {
  const preset = getSelectedPreset();
  if (!preset?.observedStations) {
    return null;
  }

  const lookup = getPresetObservationLookup(preset);
  const normalizedStationName = normalizeStationNameForMatch(station.name);
  const exactMatch = lookup.byStationId.get(station.id) ?? lookup.byName.get(normalizedStationName);
  if (exactMatch) {
    return exactMatch;
  }

  return (
    lookup.fuzzyCandidates.find(
      (observation) => {
        const normalizedObservationName = observation.normalizedStationName;
        return (
          normalizedObservationName &&
          (normalizedStationName.includes(normalizedObservationName) ||
            normalizedObservationName.includes(normalizedStationName))
        );
      },
    ) ??
    null
  );
}

function getPresetObservationLookup(preset) {
  if (presetObservationLookupCache?.presetId === preset.id) {
    return presetObservationLookupCache;
  }

  const byStationId = new Map();
  const byName = new Map();
  const fuzzyCandidates = [];
  (preset.observedStations ?? []).forEach((observation) => {
    const normalizedStationName = normalizeStationNameForMatch(observation.stationName);
    const normalizedObservation = {
      ...observation,
      normalizedStationName,
    };

    if (observation.stationId) {
      byStationId.set(observation.stationId, normalizedObservation);
    }
    if (normalizedStationName && !byName.has(normalizedStationName)) {
      byName.set(normalizedStationName, normalizedObservation);
    }
    if (normalizedStationName.length >= 3) {
      fuzzyCandidates.push(normalizedObservation);
    }
  });

  presetObservationLookupCache = {
    presetId: preset.id,
    byStationId,
    byName,
    fuzzyCandidates,
  };
  return presetObservationLookupCache;
}

function normalizeStationNameForMatch(name) {
  return String(name ?? "")
    .normalize("NFKC")
    .replace(/[・･]/g, "")
    .replace(/（旧[^）]*）/g, "")
    .replace(/\(旧[^)]*\)/g, "")
    .replace(/[()\[\]（）「」『』\s]/g, "")
    .trim();
}

function setupMobileSheets() {
  document.querySelectorAll(".sim-panel").forEach((panel) => {
    if (panel.id === "simulation-panel") {
      return;
    }

    setSheetState(panel, "collapsed");
    const handle = panel.querySelector(".sheet-handle");
    const toggleButtons = [els.setupSheetToggle, els.simulationSheetToggle].filter(Boolean);

    const toggleSheet = (event) => {
      event?.preventDefault();
      event?.stopPropagation();
      setSheetState(panel, panel.dataset.sheetState === "collapsed" ? "open" : "collapsed");
    };

    toggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener("click", toggleSheet);
    });

    let dragStartY = 0;
    let dragCurrentY = 0;
    let dragging = false;
    let suppressHandleClick = false;
    let dragStartCollapsed = false;
    let dragStartHeight = 0;

    if (handle) {
      handle.addEventListener("click", (event) => {
        if (suppressHandleClick) {
          event.preventDefault();
          event.stopPropagation();
          suppressHandleClick = false;
          return;
        }
        toggleSheet(event);
      });
    }

    const beginDrag = (event) => {
      const panelRect = panel.getBoundingClientRect();
      const startedOnHandle = Boolean(event.target?.closest?.(".sheet-handle"));
      const startedOnTopGrabZone = event.clientY - panelRect.top <= 78;
      const startedOnInteractive = Boolean(event.target?.closest?.("button:not(.sheet-handle), input, select, textarea, a, label"));
      if (!startedOnHandle && (!startedOnTopGrabZone || startedOnInteractive)) {
        return;
      }

      event.preventDefault();
      dragging = true;
      dragStartY = event.clientY;
      dragCurrentY = event.clientY;
      dragStartCollapsed = panel.dataset.sheetState === "collapsed";
      dragStartHeight = panelRect.height;
      panel.classList.add("is-dragging");
      panel.setPointerCapture?.(event.pointerId);
    };

    const updateDrag = (event) => {
      if (!dragging) {
        return;
      }

      dragCurrentY = event.clientY;
      const deltaY = dragCurrentY - dragStartY;
      const viewportHeight = window.visualViewport?.height || window.innerHeight || 720;
      const minHeight = Math.min(viewportHeight * 0.26, 260);
      const maxHeight = Math.min(viewportHeight * 0.58, 560);
      const nextHeight = clamp(dragStartHeight - deltaY, minHeight, maxHeight);
      panel.style.setProperty("--sheet-drag-height", `${nextHeight}px`);
    };

    const finishDrag = (event) => {
      if (!dragging) {
        return;
      }

      dragging = false;
      panel.releasePointerCapture?.(event.pointerId);
      panel.classList.remove("is-dragging");
      panel.style.removeProperty("--sheet-drag-height");
      const deltaY = dragCurrentY - dragStartY;
      suppressHandleClick = Math.abs(deltaY) > 8;
      setSheetState(panel, dragStartCollapsed
        ? (deltaY < -40 ? "open" : "collapsed")
        : (deltaY > 60 ? "collapsed" : "open"));
    };

    panel.addEventListener("pointerdown", beginDrag);
    panel.addEventListener("pointermove", updateDrag);
    panel.addEventListener("pointerup", finishDrag);
    panel.addEventListener("pointercancel", finishDrag);
  });
}

function setupTransientPanelScrollbars() {
  const scrollTimers = new WeakMap();
  const scrollContainers = document.querySelectorAll(
    "#setup-panel .sim-panel-scroll, #simulation-panel .sim-panel-scroll, .settings-menu-list, .settings-inline-panel.settings-detail-panel",
  );

  scrollContainers.forEach((element) => {
    element.addEventListener(
      "scroll",
      () => {
        element.classList.add("is-scrolling");
        const timer = scrollTimers.get(element);
        if (timer) {
          window.clearTimeout(timer);
        }
        scrollTimers.set(
          element,
          window.setTimeout(() => {
            element.classList.remove("is-scrolling");
            scrollTimers.delete(element);
          }, 850),
        );
      },
      { passive: true },
    );
  });
}

function setupPanelScrollbarOffsets() {
  const panels = [els.setupPanel, els.simulationPanel].filter(Boolean);
  let updateFrame = 0;

  const updatePanel = (panel) => {
    const scroller = panel.querySelector(".sim-panel-scroll");
    if (!scroller) {
      panel.classList.remove("has-scrollbar-offset");
      return;
    }

    const hasScrollbar = scroller.scrollHeight > scroller.clientHeight + 1;
    panel.classList.toggle(
      "has-scrollbar-offset",
      hasScrollbar && shouldOffsetForPanelScrollbar(),
    );
  };

  const updateAll = () => {
    updateFrame = 0;
    panels.forEach(updatePanel);
  };

  const scheduleUpdate = () => {
    if (updateFrame) {
      return;
    }
    updateFrame = window.requestAnimationFrame(updateAll);
  };

  if (window.ResizeObserver) {
    const observer = new ResizeObserver(scheduleUpdate);
    panels.forEach((panel) => {
      observer.observe(panel);
      const scroller = panel.querySelector(".sim-panel-scroll");
      if (scroller) {
        observer.observe(scroller);
      }
    });
  }

  if (window.MutationObserver) {
    const observer = new MutationObserver(scheduleUpdate);
    panels.forEach((panel) => {
      const scroller = panel.querySelector(".sim-panel-scroll");
      if (scroller) {
        observer.observe(scroller, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
      }
    });
  }

  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.visualViewport?.addEventListener("resize", scheduleUpdate, { passive: true });
  scheduleUpdate();
}

function shouldOffsetForPanelScrollbar() {
  const compactPhone = window.matchMedia("(max-width: 720px)").matches;
  const landscapeSidePanel = isLandscapeSidePanelViewport();
  return !compactPhone && !landscapeSidePanel;
}

function isLandscapeSidePanelViewport() {
  return window.matchMedia("(orientation: landscape) and (max-width: 1180px) and (max-height: 720px)").matches;
}

function isPhonePortraitViewport() {
  return window.matchMedia("(orientation: portrait) and (max-width: 720px)").matches;
}

function isCompactViewport() {
  return window.matchMedia("(max-width: 720px)").matches;
}

function isTabletViewport() {
  return window.matchMedia("(min-width: 721px) and (max-width: 1180px)").matches;
}

function setSheetState(panel, stateName) {
  if (!panel) {
    return;
  }

  panel.dataset.sheetState = stateName;
  if (isCompactViewport() && stateName === "collapsed") {
    panel.scrollTop = 0;
  }
  const handle = panel.querySelector(".sheet-handle");
  if (handle) {
    handle.textContent = getSheetHandleLabel(stateName);
    handle.setAttribute("aria-expanded", String(stateName === "open"));
  }
  updateMobileSheetToggleLabels();
}

function updateMobileSheetToggleLabels() {
  const setupCollapsed = els.setupPanel?.dataset.sheetState === "collapsed";
  const simulationCollapsed = els.simulationPanel?.dataset.sheetState === "collapsed";

  if (els.setupSheetToggle) {
    els.setupSheetToggle.textContent = setupCollapsed ? "設定画面を表示" : "マップを表示";
    els.setupSheetToggle.setAttribute("aria-expanded", String(!setupCollapsed));
  }
  if (els.simulationSheetToggle) {
    els.simulationSheetToggle.textContent = simulationCollapsed ? "メニューを表示" : "メニューを非表示";
    els.simulationSheetToggle.setAttribute("aria-expanded", String(!simulationCollapsed));
  }
}

function getSheetHandleLabel(stateName) {
  if (isCompactViewport()) {
    return stateName === "collapsed" ? "∧" : "∨";
  }

  return stateName === "collapsed" ? "‹" : "›";
}

function preventNonMapZoom() {
  const isInsideMap = (target) => Boolean(target?.closest?.("#map"));

  window.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey && !isInsideMap(event.target)) {
        event.preventDefault();
      }
    },
    { passive: false },
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (event.touches.length > 1 && !isInsideMap(event.target)) {
        event.preventDefault();
      }
    },
    { passive: false },
  );

  window.addEventListener("keydown", (event) => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    if (["+", "-", "=", "_", "0"].includes(event.key) && !isInsideMap(document.activeElement)) {
      event.preventDefault();
    }
  });
}

function setupViewportStability() {
  updateAppViewportHeight();

  const handleViewportChange = () => {
    updateAppViewportHeight();
    scheduleMapResize();
  };

  window.addEventListener("resize", handleViewportChange, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", handleViewportChange, { passive: true });
    window.visualViewport.addEventListener("scroll", handleViewportChange, { passive: true });
  }
}

function setupSmartphoneLandscapeUnsupportedReset() {
  const media = window.matchMedia(
    "(orientation: landscape) and (hover: none) and (pointer: coarse) and (max-height: 540px) and (max-width: 1000px)",
  );

  const applyResetIfNeeded = () => {
    document.body.classList.toggle("unsupported-screen-active", media.matches);
    updateSimulationAvailability();
    if (!media.matches) {
      const shouldResetAfterReturn = smartphoneLandscapeResetApplied;
      smartphoneLandscapeResetApplied = false;
      if (shouldResetAfterReturn) {
        requestAnimationFrame(() => {
          resetEpicenterToInitialState({ cancelSpeech: true, stopSimulation: true });
        });
      }
      return;
    }

    if (smartphoneLandscapeResetApplied) {
      return;
    }

    smartphoneLandscapeResetApplied = true;
    requestAnimationFrame(() => {
      resetEpicenterToInitialState({ cancelSpeech: true, stopSimulation: true });
    });
  };

  applyResetIfNeeded();
  media.addEventListener?.("change", applyResetIfNeeded);
  window.addEventListener("resize", applyResetIfNeeded, { passive: true });
  window.addEventListener("orientationchange", applyResetIfNeeded, { passive: true });
}

function setupSpeechSynthesisRecovery() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const recover = () => {
    recoverSpeechSynthesis({ resumeSimulation: document.visibilityState === "visible" });
  };
  document.addEventListener("visibilitychange", recover);
  window.addEventListener("pageshow", recover);
  window.addEventListener("focus", recover);
}

function updateAppViewportHeight() {
  const viewportHeight = Math.max(
    window.visualViewport?.height ?? 0,
    window.innerHeight || 0,
    document.documentElement.clientHeight || 0,
  );
  document.documentElement.style.setProperty("--app-height", `${Math.round(viewportHeight)}px`);
}

function scheduleMapResize() {
  if (!map) {
    return;
  }

  [0, 50, 150, 350, 800, 1400].forEach((delay) => {
    window.setTimeout(() => {
      updateAppViewportHeight();
      safelyResizeMap();
    }, delay);
  });
}

function safelyResizeMap() {
  if (!map) {
    return false;
  }

  const container = document.querySelector("#map");
  const rect = container?.getBoundingClientRect();
  if (!rect || rect.width < 1 || rect.height < 1) {
    return false;
  }

  try {
    map.resize();
    return true;
  } catch (error) {
    console.warn("map resize skipped", error);
    return false;
  }
}

async function initEarthquakeMap() {
  updateAppViewportHeight();
  registerPmtilesProtocol();
  map = new maplibregl.Map({
    container: "map",
    style: {
      version: 8,
      glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      transition: {
        duration: 0,
        delay: 0,
      },
      sources: {},
      layers: [
        {
          id: "sea-background",
          type: "background",
          paint: {
            "background-color": "#0c1326",
          },
        },
      ],
    },
    center: getInitialMapView().center,
    zoom: getInitialMapView().zoom,
    minZoom: BASE_MAP_MIN_ZOOM,
    maxZoom: 14,
    maxBounds: MAP_PAN_BOUNDS,
    renderWorldCopies: false,
    attributionControl: false,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
    scrollZoom: true,
    cooperativeGestures: false,
  });

  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();
  map.scrollZoom.setWheelZoomRate?.(1 / 600);
  map.scrollZoom.setZoomRate?.(1 / 90);
  map.keyboard?.disableRotation?.();
  setStartupInteractionLocked(true);
  updateMapPanConstraints();
  scheduleMapResize();

  addZoomOnlyControl();
  addSourceInfoControl();
  updateEpicenterEditMode();
  map.on("movestart", () => {
    state.mapInteracting = true;
  });
  map.on("move", () => {
    constrainMapToPanRange();
  });
  map.on("moveend", () => {
    state.mapInteracting = false;
    constrainMapToPanRange();
    scheduleStationCanvasRender({ force: true });
    schedulePostMapInteractionRender();
  });
  map.on("zoomstart", () => {
    state.mapInteracting = true;
  });
  map.on("zoomend", () => {
    state.mapInteracting = false;
    scheduleStationCanvasRender({ force: true });
    schedulePostMapInteractionRender();
  });
  map.on("render", () => {
    renderStationCanvasOverlay();
  });
  map.on("resize", () => {
    updateMapPanConstraints();
    scheduleStationCanvasRender({ force: true });
  });

  map.on("click", (event) => {
    if (!state.epicenterEditEnabled) {
      return;
    }

    state.latitude = Number(event.lngLat.lat.toFixed(3));
    state.longitude = Number(event.lngLat.lng.toFixed(3));
    clearSelectedPreset();
    invalidateIntensityEstimateCache();
    syncInputs();
    syncEpicenterMarkerPosition();
    updateActiveEpicenterPopups([state.longitude, state.latitude]);
    scheduleDeferredEpicenterUpdate({ resolveLocation: true, enforceManagedArea: true });
  });

  try {
    await onceMapLoaded();
    await showMapLayers();
    els.status.textContent = "市町村区分地図を表示中";
  } catch (error) {
    els.status.textContent = "地図データの読み込みに失敗しました";
    console.warn(error);
  }

  updateEpicenter({ skipIntensityUpdate: true });
}

function registerPmtilesProtocol() {
  if (pmtilesProtocolRegistered || !window.pmtiles?.Protocol || !window.pmtiles?.PMTiles || !window.maplibregl?.addProtocol) {
    return;
  }

  const protocol = new window.pmtiles.Protocol();
  const absoluteUrl = new URL(JAPAN_PMTILES_URL, window.location.href).href;
  const archive = new window.pmtiles.PMTiles(absoluteUrl);
  protocol.add(archive);
  japanPmtilesProtocolUrl = `pmtiles://${absoluteUrl}`;
  window.maplibregl.addProtocol("pmtiles", protocol.tile);
  pmtilesProtocolRegistered = true;
}

function getJapanPmtilesProtocolUrl() {
  return japanPmtilesProtocolUrl || `pmtiles://${new URL(JAPAN_PMTILES_URL, window.location.href).href}`;
}

function onceMapLoaded() {
  if (map.loaded()) {
    return Promise.resolve();
  }

  return new Promise((resolve) => map.once("load", resolve));
}

function addZoomOnlyControl() {
  return;

  const zoomControl = {
    onAdd(targetMap) {
      const container = document.createElement("div");
      container.className = "maplibregl-ctrl maplibregl-ctrl-group zoom-only-control";

      const zoomIn = document.createElement("button");
      zoomIn.type = "button";
      zoomIn.title = "拡大";
      zoomIn.setAttribute("aria-label", "拡大");
      zoomIn.textContent = "+";
      zoomIn.addEventListener("click", () => targetMap.zoomIn({ duration: 240 }));

      const zoomOut = document.createElement("button");
      zoomOut.type = "button";
      zoomOut.title = "縮小";
      zoomOut.setAttribute("aria-label", "縮小");
      zoomOut.textContent = "-";
      zoomOut.addEventListener("click", () => targetMap.zoomOut({ duration: 240 }));

      container.append(zoomIn, zoomOut);
      return container;
    },
    onRemove() {},
  };

  map.addControl(zoomControl, "top-right");
}

function setupGlobalOverlays() {
  if (appOverlays) {
    return appOverlays;
  }

  const maintenanceOverlay = createMaintenanceModeOverlay();
  const maintenanceBadge = createMaintenanceModeBadge();
  const localServerBadge = createLocalServerBadge();
  const parentTerminalBadge = createParentTerminalBadge();
  const feedbackOverlay = createFeedbackOverlay();
  document.body.append(
    feedbackOverlay,
    maintenanceOverlay,
    maintenanceBadge,
    localServerBadge,
    parentTerminalBadge,
  );
  setupLocalServerBadge(localServerBadge);
  setupParentTerminalBadge(parentTerminalBadge);
  setupMaintenanceMode(maintenanceOverlay, maintenanceBadge);

  const adminOverlay = createAdminModeOverlay();
  const sourceOverlay = createSourceInfoOverlay(adminOverlay, feedbackOverlay);
  const speechConfirmOverlay = createSpeechConfirmOverlay();
  const pushConfirmOverlay = createPushConfirmOverlay();
  document.body.append(sourceOverlay, speechConfirmOverlay, pushConfirmOverlay, adminOverlay);
  setupMaintenanceLinks(maintenanceOverlay, feedbackOverlay, pushConfirmOverlay);

  appOverlays = {
    adminOverlay,
    maintenanceOverlay,
    maintenanceBadge,
    localServerBadge,
    parentTerminalBadge,
    feedbackOverlay,
    sourceOverlay,
    speechConfirmOverlay,
    pushConfirmOverlay,
  };
  return appOverlays;
}

function addSourceInfoControl() {
  const {
    sourceOverlay,
    feedbackOverlay,
    speechConfirmOverlay,
    pushConfirmOverlay,
  } = setupGlobalOverlays();

  const sourceInfoControl = {
    onAdd() {
      const container = document.createElement("div");
      container.className = "maplibregl-ctrl source-info-control";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "source-info-button source-menu-button";
      button.setAttribute("aria-label", "情報メニューを開く");
      button.setAttribute("aria-expanded", "false");

      const sourceMenu = document.createElement("div");
      sourceMenu.className = "source-info-menu hidden";

      const sourceMenuItem = document.createElement("button");
      sourceMenuItem.type = "button";
      sourceMenuItem.className = "source-info-menu-item";
      sourceMenuItem.textContent = "出典";

      const feedbackMenuItem = document.createElement("button");
      feedbackMenuItem.type = "button";
      feedbackMenuItem.className = "source-info-menu-item";
      feedbackMenuItem.textContent = "フィードバック";

      sourceMenu.append(sourceMenuItem, feedbackMenuItem);

      const setSourceMenuOpen = (open) => {
        sourceMenu.classList.toggle("hidden", !open);
        button.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
        button.setAttribute("aria-label", open ? "情報メニューを閉じる" : "情報メニューを開く");
      };

      button.addEventListener("click", (event) => {
        event.stopPropagation();
        setSourceMenuOpen(sourceMenu.classList.contains("hidden"));
      });

      sourceMenu.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      document.addEventListener("click", () => {
        setSourceMenuOpen(false);
      });

      sourceMenuItem.addEventListener("click", () => {
        setSourceMenuOpen(false);
        sourceOverlay.classList.remove("hidden");
        document.body.classList.add("source-overlay-open");
        resetSourceInfoScroll(sourceOverlay);
      });

      sourceOverlay.addEventListener("source-overlay-close", () => {
        setSourceMenuOpen(false);
      });

      feedbackMenuItem.addEventListener("click", () => {
        setSourceMenuOpen(false);
        feedbackOverlay.classList.remove("hidden");
        document.body.classList.add("source-overlay-open");
      });

      feedbackOverlay.addEventListener("feedback-overlay-close", () => {
        setSourceMenuOpen(false);
      });

      const speechButton = document.createElement("button");
      speechButton.type = "button";
      speechButton.className = "source-info-button speech-info-button is-muted";
      speechButton.setAttribute("aria-label", "音声読み上げミュート");
      speechButton.setAttribute("aria-pressed", "true");

      speechButton.addEventListener("click", () => {
        if (speechButton.classList.contains("is-muted")) {
          showSpeechConfirmOverlay(speechConfirmOverlay, () => {
            setSpeechButtonMuted(speechButton, false);
          });
          return;
        }

        setSpeechButtonMuted(speechButton, true);
      });

      const pushButton = document.createElement("button");
      pushButton.type = "button";
      pushButton.className = "source-info-button push-info-button";
      pushButton.setAttribute("aria-label", "通知を有効にする");
      pushButton.setAttribute("aria-expanded", "false");
      const pushUnreadDot = document.createElement("span");
      pushUnreadDot.className = "push-info-unread-dot";
      pushUnreadDot.setAttribute("aria-hidden", "true");
      pushButton.append(pushUnreadDot);

      pushButton.addEventListener("click", () => {
        showPushConfirmOverlay(pushConfirmOverlay, pushButton);
      });
      refreshPushInfoButtonState(pushButton);
      schedulePushHistoryUnreadIndicatorRefresh(pushButton);

      pushConfirmOverlay.addEventListener("push-confirm-close", () => {
        pushButton.setAttribute("aria-expanded", "false");
      });
      window.addEventListener("notification-history-change", () => {
        schedulePushHistoryUnreadIndicatorRefresh(pushButton);
      });
      window.addEventListener("pageshow", () => schedulePushHistoryUnreadIndicatorRefresh(pushButton));
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          schedulePushHistoryUnreadIndicatorRefresh(pushButton);
        }
      });

      container.append(button, sourceMenu, speechButton, pushButton);
      return container;
    },
    onRemove() {},
  };

  map.addControl(sourceInfoControl, "top-right");
  setupNotificationHistoryMessages();
}

async function refreshPushInfoButtonState(button) {
  if (!button || !("serviceWorker" in navigator) || !("PushManager" in window)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("./sw.js");
    const subscription = await registration.pushManager.getSubscription();
    state.pushSubscribed = Boolean(subscription);
    button.classList.toggle("is-enabled", state.pushSubscribed);
  } catch (error) {
    console.warn("push button state refresh failed", error);
  }
}

function setSpeechButtonMuted(button, muted) {
  state.speechMuted = muted;
  button.classList.toggle("is-muted", muted);
  button.setAttribute("aria-pressed", String(muted));
  button.setAttribute("aria-label", muted ? "音声読み上げミュート" : "音声読み上げ");
  if (muted) {
    cancelSpeechAnnouncements();
    return;
  }

  recoverSpeechSynthesis();
  if (state.simulationRunning) {
    resetSpeechAnnouncementState();
    startSimulationSpeechAnnouncementsNow();
  }
}

function createSpeechConfirmOverlay() {
  const overlay = document.createElement("section");
  overlay.className = "speech-confirm-overlay hidden";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "音声読み上げ確認");
  overlay.innerHTML = `
    <div class="speech-confirm-dialog">
      <p>公共の場では周囲への迷惑や法令・施設ルールに反する場合があります。音声を流す前に周囲の安全を確認してください。</p>
      <div class="speech-confirm-actions">
        <button class="speech-confirm-yes" type="button">はい</button>
        <button class="speech-confirm-no" type="button">いいえ</button>
      </div>
    </div>
  `;
  return overlay;
}

function showSpeechConfirmOverlay(overlay, onConfirm) {
  const yesButton = overlay.querySelector(".speech-confirm-yes");
  const noButton = overlay.querySelector(".speech-confirm-no");
  const close = () => {
    overlay.classList.add("hidden");
    document.body.classList.remove("speech-confirm-open");
  };
  const confirm = () => {
    close();
    onConfirm();
  };

  yesButton.onclick = confirm;
  noButton.onclick = close;
  overlay.onclick = (event) => {
    if (event.target === overlay) {
      close();
    }
  };

  overlay.classList.remove("hidden");
  document.body.classList.add("speech-confirm-open");
  yesButton?.focus();
}

function createPushConfirmOverlay() {
  const overlay = document.createElement("section");
  overlay.className = "source-info-overlay push-confirm-overlay hidden";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "\u901a\u77e5\u306e\u8a31\u53ef");
  overlay.innerHTML = `
    <button class="source-info-close push-confirm-close" type="button" aria-label="\u901a\u77e5\u30e1\u30cb\u30e5\u30fc\u3092\u9589\u3058\u308b">\u00d7</button>
    <div class="source-info-overlay-content push-confirm-dialog">
      <header class="source-info-header push-confirm-header">
        <p>Notifications</p>
        <h2>\u901a\u77e5</h2>
      </header>
      <div class="source-info-tabs push-confirm-tabs" role="tablist" aria-label="\u901a\u77e5\u30e1\u30cb\u30e5\u30fc">
        <button class="source-info-tab push-confirm-tab is-active" type="button" role="tab" aria-selected="true" data-push-tab="settings">\u901a\u77e5\u8a2d\u5b9a</button>
        <button class="source-info-tab push-confirm-tab" type="button" role="tab" aria-selected="false" data-push-tab="history">\u901a\u77e5\u5c65\u6b74</button>
      </div>
      <section class="source-info-tab-panel push-confirm-panel" data-push-panel="settings" role="tabpanel">
        <h2>\u3010\u901a\u77e5\u306e\u8a31\u53ef\u3011</h2>
        <p>\u30a2\u30d7\u30ea\u3092\u9589\u3058\u3066\u3044\u3066\u3082\u3001<br class="push-confirm-mobile-break" />\u91cd\u8981\u306a\u304a\u77e5\u3089\u305b\u3092\u901a\u77e5\u3068\u3057\u3066<br class="push-confirm-mobile-break" />\u53d7\u3051\u53d6\u308c\u308b\u3088\u3046\u306b\u3057\u307e\u3059\u3002</p>
        <div class="push-confirm-actions">
          <button class="push-confirm-yes" type="button">\u901a\u77e5\u3092\u8a2d\u5b9a</button>
        </div>
        <p class="push-confirm-status" role="status" aria-live="polite"></p>
      </section>
      <section class="source-info-tab-panel push-confirm-panel hidden" data-push-panel="history" role="tabpanel">
        <div class="push-history-head">
          <h2>\u901a\u77e5\u5c65\u6b74</h2>
        </div>
        <div class="push-history-list" role="list"></div>
        <p class="push-history-status" role="status" aria-live="polite"></p>
      </section>
    </div>
  `;
  setupPushConfirmTabs(overlay);
  return overlay;
}

function setupPushConfirmTabs(overlay) {
  overlay.querySelectorAll("[data-push-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      activatePushConfirmTab(overlay, tab.dataset.pushTab || "settings");
    });
  });

  overlay.querySelector(".push-history-list")?.addEventListener("click", async (event) => {
    const readButton = event.target?.closest?.("[data-read-notification-history]");
    if (readButton) {
      await markNotificationHistoryItemRead(readButton.dataset.readNotificationHistory);
      await renderNotificationHistory(overlay);
      return;
    }

    const button = event.target?.closest?.("[data-delete-notification-history]");
    if (!button) {
      return;
    }

    await deleteNotificationHistoryItem(button.dataset.deleteNotificationHistory);
    await renderNotificationHistory(overlay);
  });

  overlay.querySelector(".push-history-list")?.addEventListener("click", async (event) => {
    if (event.target?.closest?.("button")) {
      return;
    }

    const item = event.target?.closest?.("[data-read-notification-history-item]");
    if (!item) {
      return;
    }

    await markNotificationHistoryItemRead(item.dataset.readNotificationHistoryItem);
    await renderNotificationHistory(overlay);
  });

  overlay.querySelector(".push-history-list")?.addEventListener("focusin", async (event) => {
    if (event.target?.closest?.("button")) {
      return;
    }

    const item = event.target?.closest?.("[data-read-notification-history-item]");
    if (!item) {
      return;
    }

    await markNotificationHistoryItemRead(item.dataset.readNotificationHistoryItem);
    await renderNotificationHistory(overlay);
  });

  window.addEventListener("notification-history-change", () => {
    if (!overlay.classList.contains("hidden") && overlay.dataset.pushTab === "history") {
      renderNotificationHistory(overlay);
    }
  });
}

function activatePushConfirmTab(overlay, tabName) {
  overlay.dataset.pushTab = tabName;
  overlay.querySelectorAll("[data-push-tab]").forEach((tab) => {
    const active = tab.dataset.pushTab === tabName;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  overlay.querySelectorAll("[data-push-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.pushPanel !== tabName);
  });

  if (tabName === "history") {
    renderNotificationHistory(overlay);
  }
}

function showPushConfirmOverlay(overlay, triggerButton) {
  const yesButton = overlay.querySelector(".push-confirm-yes");
  const noButton = overlay.querySelector(".push-confirm-no");
  const closeButton = overlay.querySelector(".push-confirm-close");
  const status = overlay.querySelector(".push-confirm-status");
  const isLocalServer = isLocalDevelopmentHost();
  const close = () => {
    overlay.classList.add("hidden");
    document.body.classList.remove("push-confirm-open");
    triggerButton?.setAttribute("aria-expanded", "false");
    overlay.dispatchEvent(new CustomEvent("push-confirm-close"));
  };

  yesButton.onclick = async () => {
    const originalActionText = yesButton.textContent;
    yesButton.disabled = true;
    if (noButton) {
      noButton.disabled = true;
    }
    const shouldUnsubscribe = state.pushSubscribed;
    yesButton.textContent = shouldUnsubscribe ? "\u901a\u77e5\u89e3\u9664\u4e2d..." : "\u901a\u77e5\u8a2d\u5b9a\u4e2d...";
    setPushPermissionStatus(status, shouldUnsubscribe ? "通知を解除しています..." : "通知を設定しています...");
    const enabled = shouldUnsubscribe
      ? await disablePushNotificationsFromOverlay(status)
      : await enablePushNotificationsFromOverlay(status);
    if (enabled) {
      yesButton.disabled = true;
      if (noButton) {
        noButton.disabled = true;
      }
      triggerButton?.classList.toggle("is-enabled", state.pushSubscribed);
      window.setTimeout(close, 900);
      return;
    }
    yesButton.disabled = false;
    if (noButton) {
      noButton.disabled = false;
    }
    yesButton.textContent = originalActionText;
  };
  if (noButton) {
    noButton.onclick = close;
  }
  closeButton.onclick = close;
  overlay.onclick = (event) => {
    if (event.target === overlay) {
      close();
    }
  };

  yesButton.disabled = isLocalServer;
  yesButton.textContent = state.pushSubscribed ? "通知を解除" : "通知を設定";
  if (noButton) {
    noButton.disabled = false;
  }
  setPushPermissionStatus(
    status,
    isLocalServer ? "Localサーバーでは通知の許可はできません。\n公開サイトから有効にしてください。" : "",
    isLocalServer,
  );
  activatePushConfirmTab(overlay, "settings");
  triggerButton?.setAttribute("aria-expanded", "true");
  triggerButton?.classList.toggle("is-enabled", state.pushSubscribed);
  overlay.classList.remove("hidden");
  document.body.classList.add("push-confirm-open");
  yesButton?.focus();
}

async function enablePushNotificationsFromOverlay(statusElement = null) {
  if (IS_LOCAL_DEV) {
    setPushPermissionStatus(statusElement, "ローカル開発中は通知を無効化しています。", true);
    return false;
  }

  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
    setPushPermissionStatus(statusElement, "このブラウザはPush通知に対応していません。", true);
    return false;
  }

  try {
    const config = await loadPushConfig();
    if (!config.workerUrl) {
      setPushPermissionStatus(statusElement, "Cloudflare Worker URLが未設定です。", true);
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      setPushPermissionStatus(statusElement, "通知の許可が必要です。", true);
      return false;
    }

    const workerUrl = config.workerUrl.replace(/\/+$/, "");
    const registration = await navigator.serviceWorker.register("./sw.js");
    const publicKeyResponse = await fetch(`${workerUrl}/vapid-public-key`, { cache: "no-store" });
    if (!publicKeyResponse.ok) {
      throw new Error(`VAPID public key request failed: ${publicKeyResponse.status}`);
    }

    const { publicKey } = await publicKeyResponse.json();
    if (!publicKey) {
      throw new Error("VAPID public key is empty");
    }

    const existingSubscription = await registration.pushManager.getSubscription();
    const subscription =
      existingSubscription ||
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64UrlToUint8Array(publicKey),
      }));

    const saveResponse = await fetch(`${workerUrl}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });

    if (!saveResponse.ok) {
      throw new Error(`subscription save failed: ${saveResponse.status}`);
    }

    state.pushConfigured = true;
    state.pushSubscribed = true;
    setPushPermissionStatus(statusElement, "通知を有効にしました。");
    return true;
  } catch (error) {
    console.warn("push notification enable failed", error);
    setPushPermissionStatus(statusElement, "通知の設定に失敗しました。", true);
    return false;
  }
}

async function disablePushNotificationsFromOverlay(statusElement = null) {
  if (IS_LOCAL_DEV) {
    state.pushSubscribed = false;
    setPushPermissionStatus(statusElement, "ローカル開発中は通知を無効化しています。", true);
    return true;
  }

  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    state.pushSubscribed = false;
    setPushPermissionStatus(statusElement, "通知は解除されています。");
    return true;
  }

  try {
    const registration = await navigator.serviceWorker.register("./sw.js");
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      state.pushSubscribed = false;
      setPushPermissionStatus(statusElement, "通知は解除されています。");
      return true;
    }

    const config = await loadPushConfig();
    const workerUrl = config.workerUrl?.replace(/\/+$/, "");
    await subscription.unsubscribe();
    state.pushSubscribed = false;

    if (workerUrl) {
      await fetch(`${workerUrl}/subscriptions`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      }).catch((error) => console.warn("push subscription delete failed", error));
    }

    setPushPermissionStatus(statusElement, "通知を解除しました。");
    return true;
  } catch (error) {
    console.warn("push notification disable failed", error);
    setPushPermissionStatus(statusElement, "通知の解除に失敗しました。", true);
    return false;
  }
}

function setPushPermissionStatus(element, message, isError = false) {
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.toggle("push-confirm-status-error", Boolean(isError));
}

function canManageNotificationHistory() {
  return true;
}

async function renderNotificationHistory(overlay) {
  const list = overlay?.querySelector(".push-history-list");
  const status = overlay?.querySelector(".push-history-status");
  if (!list || !status) {
    return;
  }

  const canManage = canManageNotificationHistory();
  list.replaceChildren();
  status.classList.remove("is-empty");
  status.textContent = "読み込み中...";

  try {
    const history = await readNotificationHistory();
    const readIds = getNotificationHistoryReadIds();
    if (history.length === 0) {
      status.classList.add("is-empty");
      status.textContent = "過去30日以内に配信された通知はありません。";
      return;
    }

    status.classList.remove("is-empty");
    status.textContent = canManage ? "" : "履歴の削除は親端末またはLocalサーバーでできます。";
    list.replaceChildren(
      ...history.map((item) => createNotificationHistoryItem(item, canManage, readIds.has(item.id))),
    );
  } catch (error) {
    console.warn("notification history render failed", error);
    status.classList.remove("is-empty");
    status.textContent = "通知履歴の読み込みに失敗しました。";
  }
}

function setupNotificationHistoryMessages() {
  if (!("serviceWorker" in navigator) || setupNotificationHistoryMessages.done) {
    return;
  }

  setupNotificationHistoryMessages.done = true;
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "notification-history-updated") {
      dispatchNotificationHistoryChange({ source: "push" });
      window.setTimeout(() => dispatchNotificationHistoryChange({ source: "push" }), 150);
    }
  });
}

function dispatchNotificationHistoryChange(detail = {}) {
  window.dispatchEvent(new CustomEvent("notification-history-change", { detail }));
}

function getNotificationHistoryReadIds() {
  try {
    const value = JSON.parse(localStorage.getItem(NOTIFICATION_HISTORY_READ_IDS_KEY) || "[]");
    return new Set(Array.isArray(value) ? value.filter(Boolean).map(String) : []);
  } catch (error) {
    console.warn("notification history read ids parse failed", error);
    return new Set();
  }
}

function setNotificationHistoryReadIds(readIds) {
  localStorage.setItem(NOTIFICATION_HISTORY_READ_IDS_KEY, JSON.stringify([...readIds].filter(Boolean)));
}

function markNotificationHistoryItemRead(id) {
  if (!id) {
    return;
  }

  const readIds = getNotificationHistoryReadIds();
  readIds.add(id);
  setNotificationHistoryReadIds(readIds);
  dispatchNotificationHistoryChange();
}

async function hasUnreadNotificationHistory() {
  const history = await readNotificationHistory();
  if (history.length === 0) {
    return false;
  }

  const readIds = getNotificationHistoryReadIds();
  return history.some((item) => item.id && !readIds.has(item.id));
}

async function updatePushHistoryUnreadIndicator(button) {
  if (!button) {
    return;
  }

  try {
    button.classList.toggle("has-unread-history", await hasUnreadNotificationHistory());
  } catch (error) {
    console.warn("notification history unread check failed", error);
    button.classList.remove("has-unread-history");
  }
}

function schedulePushHistoryUnreadIndicatorRefresh(button) {
  updatePushHistoryUnreadIndicator(button);
  requestAnimationFrame(() => updatePushHistoryUnreadIndicator(button));
  window.setTimeout(() => updatePushHistoryUnreadIndicator(button), 250);
}

function createNotificationHistoryItem(item, canManage, isRead = false) {
  const article = document.createElement("article");
  article.className = "push-history-item";
  article.setAttribute("role", "listitem");
  if (!isRead && item.id) {
    article.tabIndex = 0;
    article.dataset.readNotificationHistoryItem = item.id;
  }

  const content = document.createElement("div");
  content.className = "push-history-content";

  const heading = document.createElement("div");
  heading.className = "push-history-heading";
  const meta = document.createElement("div");
  meta.className = "push-history-meta";
  const time = document.createElement("time");
  time.textContent = formatNotificationHistoryTime(item.createdAt);
  time.dateTime = item.createdAt || "";
  const readState = document.createElement("button");
  readState.type = "button";
  readState.className = `push-history-read-state ${isRead ? "is-read" : "is-unread"}`;
  readState.textContent = isRead ? "\u65e2\u8aad" : "\u672a\u8aad";
  readState.disabled = isRead;
  if (!isRead) {
    readState.dataset.readNotificationHistory = item.id;
  }
  meta.append(time, readState);

  const title = document.createElement("h3");
  title.className = "push-history-title";
  title.textContent = item.title || "WE-Simulator";
  heading.append(meta, title);

  const body = document.createElement("p");
  body.textContent = item.body || "通知内容なし";

  content.append(heading, body);
  article.append(content);

  if (canManage) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "push-history-delete";
    deleteButton.textContent = "削除";
    deleteButton.dataset.deleteNotificationHistory = item.id;
    article.append(deleteButton);
  }

  return article;
}

function formatNotificationHistoryTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    return new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hour}:${minute}`;
}

function createNotificationHistoryId() {
  return `notification-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

async function backfillLegacyNotificationHistory() {
  if (!("indexedDB" in window) || localStorage.getItem(NOTIFICATION_HISTORY_BACKFILL_KEY) === "done") {
    return;
  }

  try {
    const history = await readNotificationHistory();
    const existingIds = new Set(history.map((item) => item.id));
    for (const item of LEGACY_NOTIFICATION_HISTORY_ITEMS) {
      if (!existingIds.has(item.id)) {
        await saveNotificationHistoryItem(item);
      }
    }
    localStorage.setItem(NOTIFICATION_HISTORY_BACKFILL_KEY, "done");
  } catch (error) {
    console.warn("notification history backfill failed", error);
  }
}

async function saveNotificationHistoryItem(notification) {
  if (!notification?.id || !("indexedDB" in window)) {
    return;
  }

  const db = await openNotificationHistoryDb();
  await runNotificationHistoryTransaction(db, "readwrite", (store) => {
    store.put({
      id: notification.id,
      title: String(notification.title || "WE-Simulator").slice(0, 80),
      body: String(notification.body || "").slice(0, 300),
      createdAt: notification.createdAt || new Date().toISOString(),
      source: notification.source || "local",
    });
  });
  await pruneNotificationHistory();
  dispatchNotificationHistoryChange();
}

async function syncRemoteNotificationHistory() {
  if (!("indexedDB" in window) || remoteNotificationHistoryUnavailable) {
    return;
  }

  const config = await loadPushConfig();
  if (!config.workerUrl) {
    return;
  }

  const response = await fetch(`${config.workerUrl.replace(/\/+$/, "")}/notification-history`, {
    cache: "no-store",
  });
  if (!response.ok) {
    if (response.status === 404 || response.status === 405) {
      remoteNotificationHistoryUnavailable = true;
    }
    return;
  }

  const data = await response.json().catch(() => ({}));
  const notifications = Array.isArray(data.notifications) ? data.notifications : [];
  if (notifications.length === 0) {
    return;
  }

  const db = await openNotificationHistoryDb();
  const existingIds = new Set((await readNotificationHistoryItems(db)).map((item) => item.id));
  const nextItems = notifications
    .filter((item) => item?.id && !existingIds.has(item.id))
    .map((item) => ({
      id: item.id,
      title: String(item.title || "WE-Simulator").slice(0, 80),
      body: String(item.body || "").slice(0, 300),
      createdAt: item.createdAt || new Date().toISOString(),
      source: item.source || "remote",
    }));
  if (nextItems.length === 0) {
    return;
  }

  await runNotificationHistoryTransaction(db, "readwrite", (store) => {
    nextItems.forEach((item) => store.put(item));
  });
  await pruneNotificationHistory();
}

async function readNotificationHistory() {
  if (!("indexedDB" in window)) {
    return [];
  }

  await syncRemoteNotificationHistory().catch((error) => console.warn("remote notification history sync failed", error));
  const db = await openNotificationHistoryDb();
  const items = await readNotificationHistoryItems(db);
  const expiredIds = getExpiredNotificationHistoryIds(items);
  if (expiredIds.length > 0) {
    await deleteNotificationHistoryIds(db, expiredIds);
    removeNotificationHistoryReadIds(expiredIds);
  }

  return items
    .filter((item) => !expiredIds.includes(item.id))
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
}

async function deleteNotificationHistoryItem(id) {
  if (!id || !("indexedDB" in window)) {
    return;
  }

  const db = await openNotificationHistoryDb();
  await runNotificationHistoryTransaction(db, "readwrite", (store) => {
    store.delete(id);
  });
  const readIds = getNotificationHistoryReadIds();
  if (readIds.delete(id)) {
    setNotificationHistoryReadIds(readIds);
  }
  dispatchNotificationHistoryChange();
}

async function pruneNotificationHistory() {
  if (!("indexedDB" in window)) {
    return;
  }

  const db = await openNotificationHistoryDb();
  const items = await readNotificationHistoryItems(db);
  const sortedActiveItems = items
    .filter((item) => !isNotificationHistoryExpired(item))
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  const removeIds = [
    ...getExpiredNotificationHistoryIds(items),
    ...sortedActiveItems.slice(NOTIFICATION_HISTORY_LIMIT).map((item) => item.id),
  ].filter(Boolean);
  if (removeIds.length === 0) {
    return;
  }

  await deleteNotificationHistoryIds(db, removeIds);
  removeNotificationHistoryReadIds(removeIds);
}

function isNotificationHistoryExpired(item, now = Date.now()) {
  const createdAtMs = Date.parse(item?.createdAt ?? "");
  if (!Number.isFinite(createdAtMs)) {
    return false;
  }

  return now - createdAtMs >= NOTIFICATION_HISTORY_RETENTION_DAYS * 24 * 60 * 60 * 1000;
}

function getExpiredNotificationHistoryIds(items) {
  const now = Date.now();
  return items.filter((item) => item?.id && isNotificationHistoryExpired(item, now)).map((item) => item.id);
}

function readNotificationHistoryItems(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION_HISTORY_STORE_NAME, "readonly");
    const request = transaction.objectStore(NOTIFICATION_HISTORY_STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function deleteNotificationHistoryIds(db, ids) {
  const uniqueIds = [...new Set(ids)].filter(Boolean);
  if (uniqueIds.length === 0) {
    return Promise.resolve();
  }

  return runNotificationHistoryTransaction(db, "readwrite", (store) => {
    uniqueIds.forEach((id) => store.delete(id));
  });
}

function removeNotificationHistoryReadIds(ids) {
  const readIds = getNotificationHistoryReadIds();
  let changed = false;
  ids.forEach((id) => {
    if (readIds.delete(id)) {
      changed = true;
    }
  });
  if (changed) {
    setNotificationHistoryReadIds(readIds);
  }
}

function openNotificationHistoryDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(NOTIFICATION_HISTORY_DB_NAME, NOTIFICATION_HISTORY_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(NOTIFICATION_HISTORY_STORE_NAME)) {
        db.createObjectStore(NOTIFICATION_HISTORY_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function runNotificationHistoryTransaction(db, mode, callback) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION_HISTORY_STORE_NAME, mode);
    callback(transaction.objectStore(NOTIFICATION_HISTORY_STORE_NAME));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function createSpeechAnnouncementState() {
  return {
    startAnnounced: false,
    maxObservedRank: 0,
    observedIntensitySpeechSignature: "",
    latestObservedIntensityMessage: "",
    observedIntensityRepeatCompleted: false,
    eewAreaNames: new Set(),
    priorityMessages: [],
    pendingMessages: [],
    speaking: false,
    paused: false,
    active: false,
    startTimer: null,
    repeatTimer: null,
  };
}

function resetSpeechAnnouncementState() {
  window.clearTimeout(speechAnnouncementState?.startTimer);
  window.clearTimeout(speechAnnouncementState?.repeatTimer);
  speechAnnouncementState = createSpeechAnnouncementState();
}

function canSpeakAnnouncements() {
  return !state.speechMuted && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

function recoverSpeechSynthesis(options = {}) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  speechAnnouncementState.speaking = false;
  speechAnnouncementState.paused = false;
  if (!options.resumeSimulation || state.speechMuted || !state.simulationRunning) {
    return;
  }

  speechAnnouncementState.priorityMessages = [];
  speechAnnouncementState.pendingMessages = [];
  playNextSpeechAnnouncement();
}

function speakAnnouncement(message, options = {}) {
  if (!canSpeakAnnouncements() || !message || !speechAnnouncementState.active) {
    return;
  }

  const normalizedMessage = normalizeSpeechAnnouncementText(String(message).trim());
  if (!normalizedMessage) {
    return;
  }

  if (options.priority) {
    speechAnnouncementState.priorityMessages.push(normalizedMessage);
  } else {
    speechAnnouncementState.pendingMessages = [normalizedMessage];
  }
  if (!options.repeat) {
    speechAnnouncementState.observedIntensityRepeatCompleted = false;
  }
  window.clearTimeout(speechAnnouncementState.repeatTimer);
  playNextSpeechAnnouncement();
}

function normalizeSpeechAnnouncementText(message) {
  return message
    .replace(/北海道道央/g, "ほっかいどうどうおう")
    .replace(/北海道道南/g, "ほっかいどうどうなん")
    .replace(/北海道道北/g, "ほっかいどうどうほく")
    .replace(/北海道道東/g, "ほっかいどうどうとう")
    .replace(/愛媛県南予/g, "えひめけんなんよ")
    .replace(/四国/g, "しこく")
    .replace(/礼北/g, "れいほく")
    .replace(/礼南/g, "れいなん")
    .replace(/中越/g, "ちゅうえつ")
    .replace(/三八上北/g, "さんぱちかみきた")
    .replace(/山梨県東部・富士五湖/g, "やまなしけんとうぶ・ふじごこ")
    .replace(/天草芦北/g, "あまくさあしきた")
    .replace(/大東島/g, "だいとうじま")
    .replace(/八重山/g, "やえやま")
    .replace(/大分/g, "おおいた");
}

function playNextSpeechAnnouncement() {
  if ("speechSynthesis" in window && !window.speechSynthesis.speaking && speechAnnouncementState.speaking) {
    speechAnnouncementState.speaking = false;
  }

  if (
    speechAnnouncementState.speaking ||
    speechAnnouncementState.paused ||
    !speechAnnouncementState.active ||
    !canSpeakAnnouncements() ||
    (speechAnnouncementState.priorityMessages.length === 0 && speechAnnouncementState.pendingMessages.length === 0)
  ) {
    if (
      speechAnnouncementState.active &&
      canSpeakAnnouncements() &&
      !speechAnnouncementState.speaking &&
      !speechAnnouncementState.paused &&
      !speechAnnouncementState.observedIntensityRepeatCompleted
    ) {
      scheduleObservedIntensityRepeat();
    }
    return;
  }

  const message =
    speechAnnouncementState.priorityMessages.length > 0
      ? speechAnnouncementState.priorityMessages.shift()
      : speechAnnouncementState.pendingMessages.shift();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "ja-JP";
  utterance.rate = 1.08;
  utterance.pitch = 1;
  utterance.onend = () => {
    speechAnnouncementState.speaking = false;
    playNextSpeechAnnouncement();
  };
  utterance.onerror = () => {
    speechAnnouncementState.speaking = false;
    playNextSpeechAnnouncement();
  };
  speechAnnouncementState.speaking = true;
  window.speechSynthesis.speak(utterance);
}

function pauseSpeechAnnouncements() {
  if (!("speechSynthesis" in window) || state.speechMuted) {
    return;
  }

  speechAnnouncementState.paused = true;
  window.clearTimeout(speechAnnouncementState.repeatTimer);
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
  }
}

function resumeSpeechAnnouncements() {
  if (!("speechSynthesis" in window) || state.speechMuted || !speechAnnouncementState.active) {
    return;
  }

  speechAnnouncementState.paused = false;
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    return;
  }

  playNextSpeechAnnouncement();
}

function cancelSpeechAnnouncements() {
  speechAnnouncementState.active = false;
  speechAnnouncementState.priorityMessages = [];
  speechAnnouncementState.pendingMessages = [];
  speechAnnouncementState.speaking = false;
  speechAnnouncementState.paused = false;
  window.clearTimeout(speechAnnouncementState.startTimer);
  window.clearTimeout(speechAnnouncementState.repeatTimer);
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function finishSpeechAnnouncementsGracefully() {
  speechAnnouncementState.active = false;
  speechAnnouncementState.priorityMessages = [];
  speechAnnouncementState.pendingMessages = [];
  window.clearTimeout(speechAnnouncementState.startTimer);
  window.clearTimeout(speechAnnouncementState.repeatTimer);
}

function scheduleSimulationSpeechStart() {
  window.clearTimeout(speechAnnouncementState.startTimer);
  speechAnnouncementState.active = true;
  speechAnnouncementState.startTimer = window.setTimeout(() => {
    startSimulationSpeechAnnouncementsNow();
  }, 1500);
}

function startSimulationSpeechAnnouncementsNow() {
  window.clearTimeout(speechAnnouncementState.startTimer);
  speechAnnouncementState.active = true;
  announceSimulationUpdates(getSimulationStationElapsedSec());
}

function scheduleObservedIntensityRepeat() {
  window.clearTimeout(speechAnnouncementState.repeatTimer);
  if (
    !state.simulationRunning ||
    state.simulationPaused ||
    state.speechMuted ||
    !speechAnnouncementState.active ||
    speechAnnouncementState.speaking ||
    speechAnnouncementState.paused ||
    speechAnnouncementState.observedIntensityRepeatCompleted
  ) {
    return;
  }

  speechAnnouncementState.repeatTimer = window.setTimeout(() => {
    speechAnnouncementState.repeatTimer = null;
    repeatCurrentObservedIntensityAnnouncement();
  }, 4500);
}

function repeatCurrentObservedIntensityAnnouncement() {
  if (
    !state.simulationRunning ||
    state.simulationPaused ||
    !speechAnnouncementState.active ||
    !canSpeakAnnouncements()
  ) {
    return;
  }

  const elapsedSec = getSimulationStationElapsedSec();
  const message = buildObservedIntensitySpeechMessage(elapsedSec);
  if (message) {
    speechAnnouncementState.observedIntensityRepeatCompleted = true;
    speakAnnouncement(message, { repeat: true });
    return;
  }

  scheduleObservedIntensityRepeat();
}

function announceSimulationStartIfNeeded() {
  if (
    !state.simulationRunning ||
    speechAnnouncementState.startAnnounced ||
    !speechAnnouncementState.active ||
    !canSpeakAnnouncements()
  ) {
    return;
  }

  const predictedMax = getPredictedMaximumIntensity();
  const maxClass = INTENSITY_CLASSES.find((item) => item.rank === predictedMax.rank) ?? INTENSITY_CLASSES[0];
  const displayMaxClass = getPresetDisplayIntensityClass(maxClass, predictedMax.value, getSelectedPreset());
  const currentLocationText = getCurrentLocationSpeechText();
  const eewText = getEewSpeechText();
  const epicenterName = getSpeechEpicenterName();
  const summaryText = `最大震度は${displayMaxClass.label}、マグニチュードは${state.magnitude.toFixed(1)}と推定されます。${currentLocationText}`;
  speakAnnouncement(
    eewText ? `${eewText}${summaryText}` : `${epicenterName}で地震。${summaryText}`,
    { priority: Boolean(eewText) },
  );
  markCurrentEewAreasAnnounced();
  speechAnnouncementState.startAnnounced = true;
}

function getSpeechEpicenterName() {
  return isHyogoNanbuPreset(getSelectedPreset()) ? "大阪湾" : state.epicenterName;
}

function getEewSpeechText() {
  const areaNames = state.eewWarningForecastAreas;
  if (!Array.isArray(areaNames) || areaNames.length === 0) {
    return "";
  }

  return `${getEewSpeechHeading()} ${getSpeechEpicenterName()}で地震。強い揺れに警戒してください。対象地域は ${areaNames.join("、")}。`;
}

function getEewSpeechHeading() {
  return state.eewWarningReportNumber
    ? `緊急地震速報 第${state.eewWarningReportNumber}報`
    : "緊急地震速報";
}

function markCurrentEewAreasAnnounced() {
  state.eewWarningForecastAreas.forEach((areaName) => {
    speechAnnouncementState.eewAreaNames.add(areaName);
  });
}

function announceEewAreaUpdates() {
  if (!Array.isArray(state.eewWarningForecastAreas) || state.eewWarningForecastAreas.length === 0) {
    return;
  }

  const isFirstEewAnnouncement = speechAnnouncementState.eewAreaNames.size === 0;
  const addedAreaNames = state.eewWarningForecastAreas.filter(
    (areaName) => !speechAnnouncementState.eewAreaNames.has(areaName),
  );
  if (addedAreaNames.length === 0) {
    return;
  }

  addedAreaNames.forEach((areaName) => {
    speechAnnouncementState.eewAreaNames.add(areaName);
  });
  const areaText = addedAreaNames.join("、");
  const message = isFirstEewAnnouncement
    ? `${getEewSpeechHeading()} ${getSpeechEpicenterName()}で地震。強い揺れに警戒してください。対象地域は ${areaText}。`
    : `${getEewSpeechHeading()} 対象地域に ${areaText} が追加されました。強い揺れに警戒してください。`;
  speakAnnouncement(message, { priority: true });
}

function announceSimulationUpdates(elapsedSec) {
  if (
    !state.simulationRunning ||
    !Number.isFinite(elapsedSec) ||
    !speechAnnouncementState.active ||
    !canSpeakAnnouncements() ||
    !shindoStationData
  ) {
    return;
  }

  refreshSpeechForecastAreas(elapsedSec);
  announceSimulationStartIfNeeded();
  announceEewAreaUpdates();
  announceMaxObservedAreaUpdate(elapsedSec);
}

function refreshSpeechForecastAreas(elapsedSec) {
  if (!localAreaData) {
    return;
  }

  buildIntensityAreaData(localAreaData, elapsedSec);
}

function announceMaxObservedAreaUpdate(elapsedSec) {
  const snapshot = buildObservedIntensitySpeechSnapshot(elapsedSec);
  if (!snapshot || snapshot.maxRank < speechAnnouncementState.maxObservedRank) {
    return;
  }

  if (snapshot.signature === speechAnnouncementState.observedIntensitySpeechSignature) {
    return;
  }

  speechAnnouncementState.maxObservedRank = snapshot.maxRank;
  speechAnnouncementState.observedIntensitySpeechSignature = snapshot.signature;
  speechAnnouncementState.latestObservedIntensityMessage = snapshot.message;
  speechAnnouncementState.observedIntensityRepeatCompleted = false;
  speakAnnouncement(snapshot.message);
}

function buildObservedIntensitySpeechMessage(elapsedSec) {
  const snapshot = buildObservedIntensitySpeechSnapshot(elapsedSec);
  if (!snapshot) {
    return speechAnnouncementState.latestObservedIntensityMessage;
  }

  speechAnnouncementState.latestObservedIntensityMessage = snapshot.message;
  return snapshot.message;
}

function buildObservedIntensitySpeechSnapshot(elapsedSec) {
  const selectedPreset = getSelectedPreset();
  const presetSpeechLabels = getOldScalePresetSpeechLabels(selectedPreset);
  if (presetSpeechLabels.length > 0) {
    return buildOldScalePresetObservedSpeechSnapshot(elapsedSec, presetSpeechLabels);
  }

  if (!localAreaData) {
    return null;
  }

  const allAreaFeatures = buildIntensityAreaData(localAreaData, elapsedSec).features;
  const areaFeatures = allAreaFeatures.filter(
    (feature) => feature.properties.intensityRank > 0,
  );
  if (areaFeatures.length === 0) {
    return null;
  }

  const maxRank = Math.max(...areaFeatures.map((feature) => feature.properties.intensityRank));
  const speechGroups = buildObservedIntensitySpeechGroups(areaFeatures, maxRank, allAreaFeatures);
  if (speechGroups.length === 0) {
    return null;
  }

  return buildObservedIntensitySpeechSnapshotFromGroups(speechGroups);
}

function buildObservedIntensitySpeechSnapshotFromGroups(speechGroups) {
  const maxRank = Math.max(...speechGroups.map((group) => group.rank));
  const signature = speechGroups.map((group) => `${group.rank}:${group.label}:${group.areaNames.join(",")}`).join("|");
  const currentLocationText = getCurrentLocationSpeechText();
  const intensityText = speechGroups
    .map((group) => `震度${group.label} ${group.areaNames.join("、")}`)
    .join("。");
  return {
    maxRank,
    signature,
    message: `${intensityText}。${currentLocationText}`,
  };
}

function buildObservedIntensitySpeechGroups(areaFeatures, maxRank, allAreaFeatures = areaFeatures) {
  const minSpeechRank = maxRank >= 5 ? 5 : maxRank;
  const groups = [];

  for (let rank = maxRank; rank >= minSpeechRank; rank -= 1) {
    const rankedFeatures = areaFeatures.filter((feature) => feature.properties.intensityRank === rank);
    if (rankedFeatures.length === 0) {
      continue;
    }

    const intensityClass = INTENSITY_CLASSES.find((item) => item.rank === rank) ?? INTENSITY_CLASSES[0];
    const displayIntensityFeature = rankedFeatures.find((feature) => feature.properties.intensityLabel);
    const areaNames = formatObservedIntensitySpeechAreaNames(rankedFeatures, allAreaFeatures);
    if (areaNames.length === 0) {
      continue;
    }

    groups.push({
      rank,
      label: displayIntensityFeature?.properties.intensityLabel ?? intensityClass.label,
      areaNames,
    });
  }

  return groups;
}

function formatObservedIntensitySpeechAreaNames(areaFeatures, allObservedAreaFeatures = areaFeatures) {
  const totalAreaCountsByPrefecture = getObservedAreaCountsByPrefecture(allObservedAreaFeatures);
  const names = areaFeatures
    .map((feature) => cleanDisplayAreaName(feature.properties.name))
    .filter(Boolean);
  const namesByPrefecture = new Map();
  const areaNames = [];

  names.forEach((name) => {
    const prefecture = PREFECTURE_NAMES.find((prefectureName) => name.startsWith(prefectureName));
    if (!prefecture) {
      areaNames.push(name);
      return;
    }

    if (!namesByPrefecture.has(prefecture)) {
      namesByPrefecture.set(prefecture, []);
    }
    namesByPrefecture.get(prefecture).push(name);
  });

  namesByPrefecture.forEach((prefectureAreaNames, prefecture) => {
    const totalAreaCount = totalAreaCountsByPrefecture.get(prefecture) ?? 0;
    if (totalAreaCount > 0 && prefectureAreaNames.length === totalAreaCount) {
      areaNames.push(prefecture);
    } else {
      areaNames.push(...prefectureAreaNames);
    }
  });

  return [...new Set(areaNames)];
}

function getObservedAreaCountsByPrefecture(areaFeatures) {
  const counts = new Map();
  areaFeatures.forEach((feature) => {
    const name = cleanDisplayAreaName(feature.properties.name);
    const prefecture = PREFECTURE_NAMES.find((prefectureName) => name.startsWith(prefectureName));
    if (!prefecture) {
      return;
    }

    counts.set(prefecture, (counts.get(prefecture) ?? 0) + 1);
  });
  return counts;
}

function getOldScalePresetSpeechLabels(preset) {
  if (preset?.label?.includes("兵庫県南部地震")) {
    return ["7", "6", "5"];
  }
  if (preset?.label?.includes("関東大震災")) {
    return ["6", "5"];
  }
  return [];
}

function buildOldScalePresetObservedSpeechSnapshot(elapsedSec, intensityLabels) {
  if (!shindoStationData) {
    return null;
  }

  const stationFeatures = getStationIntensityDataForElapsed(elapsedSec).features.filter(
    (feature) => feature.properties.observed && feature.properties.oldJmaScale,
  );
  if (stationFeatures.length === 0) {
    return null;
  }

  const groups = buildOldScalePresetObservedSpeechGroups(stationFeatures, intensityLabels);
  if (groups.length === 0) {
    return null;
  }

  return buildObservedIntensitySpeechSnapshotFromGroups(groups);
}

function buildOldScalePresetObservedSpeechGroups(stationFeatures, intensityLabels) {
  const groupsByLabel = new Map(
    intensityLabels.map((label) => [label, stationFeatures.filter((feature) => feature.properties.intensityLabel === label)]),
  );
  const firstObservedIndex = intensityLabels.findIndex((label) => (groupsByLabel.get(label) ?? []).length > 0);
  if (firstObservedIndex < 0) {
    return [];
  }

  return intensityLabels.slice(firstObservedIndex).flatMap((label) => {
    const features = groupsByLabel.get(label) ?? [];
    if (features.length === 0) {
      return [];
    }

    const rank = Math.max(...features.map((feature) => feature.properties.intensityRank ?? 0));
    return [{
      rank,
      label,
      areaNames: formatOldScalePresetObservedSpeechAreaNames(features),
    }];
  });
}

function formatOldScalePresetObservedSpeechAreaNames(stationFeatures) {
  let previousPrefecture = "";

  return stationFeatures
    .map((feature) => getOldScalePresetObservedPlace(feature.properties))
    .filter(Boolean)
    .map((place) => {
      const rawPlaceName = place.prefecture && place.name.startsWith(place.prefecture)
        ? place.name.slice(place.prefecture.length)
        : place.name;
      const placeName = formatOldScalePresetMunicipalitySpeechName(rawPlaceName);
      const spokenName = place.prefecture && place.prefecture !== previousPrefecture
        ? `${place.prefecture}${placeName}`
        : placeName;
      previousPrefecture = place.prefecture;
      return spokenName;
    });
}

function formatOldScalePresetMunicipalitySpeechName(name) {
  const cityWardMatch = String(name ?? "").match(/^(.+市)(.+区)$/);
  if (cityWardMatch) {
    return `${cityWardMatch[1]}(${cityWardMatch[2]})`;
  }
  return name;
}

function getOldScalePresetObservedPlace(properties = {}) {
  const address = cleanDisplayAreaName(properties.address ?? "");
  const name = cleanDisplayAreaName(properties.name ?? properties.areaName ?? "");
  const prefecture = PREFECTURE_NAMES.find((prefectureName) => address.startsWith(prefectureName)) ?? "";
  return {
    prefecture,
    name: name || (prefecture ? address.slice(prefecture.length) : address),
  };
}

function getCurrentLocationSpeechText() {
  if (!state.currentLocationEnabled || state.currentLocationStatus !== "ready" || !state.currentLocation) {
    return "";
  }

  const forecast = getCurrentLocationForecast();
  if (!forecast || forecast.intensityClass.rank < 1) {
    return "";
  }

  const locationName = stripPrefectureName(state.currentLocationName);
  if (!locationName) {
    return "";
  }

  const observed = state.simulationRunning && Number.isFinite(getSimulationStationElapsedSec())
    ? getSimulationStationElapsedSec() >= forecast.pArrivalSec
    : false;
  return observed
    ? `${locationName}で震度${forecast.intensityClass.label}を観測。`
    : `${locationName}の推定震度は${forecast.intensityClass.label}です。`;
}

function stripPrefectureName(name) {
  let displayName = cleanDisplayAreaName(name);
  PREFECTURE_NAMES.forEach((prefecture) => {
    if (displayName.startsWith(prefecture)) {
      displayName = displayName.slice(prefecture.length);
    }
  });
  return displayName || "";
}

function createSourceInfoOverlay(adminOverlay, feedbackOverlay) {
  const overlay = document.createElement("section");
  overlay.className = "source-info-overlay hidden";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "出典");
  overlay.innerHTML = buildSourceInfoOverlayHtml();

  const closeButton = overlay.querySelector(".source-info-close");
  const adminButton = overlay.querySelector(".source-admin-mode-button");
  setupSourceInfoTabs(overlay);
  setupSourceInfoScrollBounds(overlay);
  const closeOverlay = () => {
    overlay.classList.add("hidden");
    document.body.classList.remove("source-overlay-open");
    overlay.dispatchEvent(new CustomEvent("source-overlay-close"));
  };

  closeButton?.addEventListener("click", closeOverlay);
  adminButton?.addEventListener("click", () => {
    openAdminModeOverlay(adminOverlay);
  });
  overlay.querySelector("[data-feedback-link]")?.addEventListener("click", (event) => {
    event.preventDefault();
    feedbackOverlay?.classList.add("from-source");
    feedbackOverlay.dataset.returnToSource = "true";
    feedbackOverlay?.classList.remove("hidden");
    document.body.classList.add("source-overlay-open");
    document.querySelector(".feedback-info-button")?.setAttribute("aria-expanded", "true");
  });
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.classList.contains("hidden")) {
      closeOverlay();
    }
  });

  return overlay;
}

function setupSourceInfoTabs(overlay) {
  const tabs = [...overlay.querySelectorAll(".source-info-tab")];
  const panels = [...overlay.querySelectorAll(".source-info-tab-panel")];
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanelId = tab.getAttribute("aria-controls");
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      panels.forEach((panel) => {
        panel.classList.toggle("hidden", panel.id !== targetPanelId);
      });
      resetSourceInfoScroll(overlay);
    });
  });
}

function setupSourceInfoScrollBounds(overlay) {
  const scrollElement = getSourceInfoScrollElement(overlay);
  if (!scrollElement) {
    return;
  }

  scrollElement.addEventListener("scroll", () => clampSourceInfoScrollBoundsNow(overlay), { passive: true });
  scrollElement.addEventListener("wheel", (event) => scrollSourceInfoWithWheel(event, overlay), { passive: false });
  scrollElement.addEventListener("touchstart", trackSourceInfoTouchStart, { passive: true });
  scrollElement.addEventListener("touchmove", (event) => limitSourceInfoOverscroll(event, overlay), { passive: false });
  scrollElement.addEventListener("touchend", () => clampSourceInfoScrollBoundsNow(overlay), { passive: true });
  scrollElement.addEventListener("touchcancel", () => {
    sourceInfoTouchStart = null;
    clampSourceInfoScrollBoundsNow(overlay);
  }, { passive: true });
  scrollElement.addEventListener("pointerup", () => clampSourceInfoScrollBoundsNow(overlay), { passive: true });
  overlay.querySelectorAll(".source-info-tab-panel").forEach((panel) => {
    panel.addEventListener("scroll", () => clampSourceInfoScrollBoundsNow(overlay), { passive: true });
  });
  window.addEventListener("resize", () => scheduleSourceInfoScrollClamp(overlay));
}

function resetSourceInfoScroll(overlay) {
  const scrollElement = getSourceInfoScrollElement(overlay);
  if (!scrollElement) {
    return;
  }

  scrollElement.scrollLeft = 0;
  scrollElement.scrollTop = 0;
  scheduleSourceInfoScrollClamp(overlay);
}

function scheduleSourceInfoScrollClamp(overlay) {
  if (sourceInfoScrollClampFrame) {
    return;
  }

  sourceInfoScrollClampFrame = requestAnimationFrame(() => clampSourceInfoScrollBounds(overlay));
}

function clampSourceInfoScrollBoundsNow(overlay) {
  if (sourceInfoScrollClampFrame) {
    cancelAnimationFrame(sourceInfoScrollClampFrame);
    sourceInfoScrollClampFrame = 0;
  }

  clampSourceInfoScrollBounds(overlay);
}

function clampSourceInfoScrollBounds(overlay) {
  sourceInfoScrollClampFrame = 0;

  const scrollElement = getSourceInfoScrollElement(overlay);
  if (!scrollElement) {
    return;
  }

  clampScrollElementBounds(scrollElement);
}

function getSourceInfoScrollElement(overlay) {
  return overlay.querySelector(".source-info-overlay-content");
}

function scrollSourceInfoWithWheel(event, overlay) {
  if (event.target?.closest?.("textarea, input, select")) {
    return;
  }

  const scrollElement = getSourceInfoScrollElement(overlay);
  if (!scrollElement) {
    return;
  }

  const maxLeft = Math.max(0, scrollElement.scrollWidth - scrollElement.clientWidth);
  const maxTop = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
  if (maxLeft <= 0 && maxTop <= 0) {
    return;
  }

  const nextLeft = Math.min(Math.max(scrollElement.scrollLeft + event.deltaX, 0), maxLeft);
  const nextTop = Math.min(Math.max(scrollElement.scrollTop + event.deltaY, 0), maxTop);
  const didMove =
    Math.abs(nextLeft - scrollElement.scrollLeft) > 0.5 ||
    Math.abs(nextTop - scrollElement.scrollTop) > 0.5;

  if (!didMove) {
    return;
  }

  event.preventDefault();
  scrollElement.scrollLeft = nextLeft;
  scrollElement.scrollTop = nextTop;
}

function clampScrollElementBounds(scrollElement) {
  const maxLeft = Math.max(0, scrollElement.scrollWidth - scrollElement.clientWidth);
  const maxTop = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
  const nextLeft = Math.min(Math.max(scrollElement.scrollLeft, 0), maxLeft);
  const nextTop = Math.min(Math.max(scrollElement.scrollTop, 0), maxTop);

  if (Math.abs(nextLeft - scrollElement.scrollLeft) > 0.5) {
    scrollElement.scrollLeft = nextLeft;
  }

  if (Math.abs(nextTop - scrollElement.scrollTop) > 0.5) {
    scrollElement.scrollTop = nextTop;
  }
}

function trackSourceInfoTouchStart(event) {
  const touch = event.touches?.[0];
  sourceInfoTouchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
}

function limitSourceInfoOverscroll(event, overlay) {
  const scrollElement = getSourceInfoScrollElement(overlay);
  const touch = event.touches?.[0];
  if (!scrollElement || !touch || !sourceInfoTouchStart) {
    return;
  }

  const deltaX = touch.clientX - sourceInfoTouchStart.x;
  const deltaY = touch.clientY - sourceInfoTouchStart.y;
  const horizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
  const maxLeft = Math.max(0, scrollElement.scrollWidth - scrollElement.clientWidth);
  const maxTop = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
  const pullingPastLeft = scrollElement.scrollLeft <= 0.5 && deltaX > 0;
  const pullingPastRight = scrollElement.scrollLeft >= maxLeft - 0.5 && deltaX < 0;
  const pullingPastTop = scrollElement.scrollTop <= 0.5 && deltaY > 0;
  const pullingPastBottom = scrollElement.scrollTop >= maxTop - 0.5 && deltaY < 0;
  const pullingPastHorizontalEdge = horizontalSwipe && (pullingPastLeft || pullingPastRight);
  const pullingPastVerticalEdge = !horizontalSwipe && (pullingPastTop || pullingPastBottom);

  if (pullingPastHorizontalEdge || pullingPastVerticalEdge) {
    event.preventDefault();
    clampSourceInfoScrollBoundsNow(overlay);
  }
}

function createMaintenanceModeOverlay() {
  const overlay = document.createElement("section");
  overlay.className = "maintenance-mode-overlay hidden";
  overlay.setAttribute("aria-live", "polite");
  overlay.setAttribute("aria-label", "メンテナンスモード");
  overlay.innerHTML = `
    <div class="maintenance-mode-dialog">
      <h2>只今メンテナンス中です</h2>
      <p>しばらくお待ち下さい。</p>
      ${buildMaintenanceOverlayLinksHtml()}
    </div>
  `;
  return overlay;
}

function buildMaintenanceOverlayLinksHtml() {
  return `
    <p class="maintenance-mode-links">
      <a href="#feedback" data-maintenance-feedback-link>フィードバック</a><span aria-hidden="true">｜</span><a href="#notification-settings" data-maintenance-notification-link>通知設定</a>
    </p>
  `;
}

function setupMaintenanceLinks(maintenanceOverlay, feedbackOverlay, pushConfirmOverlay) {
  maintenanceOverlay?.addEventListener("click", (event) => {
    const feedbackLink = event.target?.closest?.("[data-maintenance-feedback-link]");
    const notificationLink = event.target?.closest?.("[data-maintenance-notification-link]");
    if (!feedbackLink && !notificationLink) {
      return;
    }

    event.preventDefault();
    if (feedbackLink) {
      feedbackOverlay.classList.add("from-maintenance");
      feedbackOverlay.classList.remove("hidden");
      document.body.classList.add("source-overlay-open");
      return;
    }

    if (pushConfirmOverlay) {
      pushConfirmOverlay.classList.add("from-maintenance");
      showPushConfirmOverlay(pushConfirmOverlay);
    }
  });

  feedbackOverlay?.addEventListener("feedback-overlay-close", () => {
    feedbackOverlay.classList.remove("from-maintenance");
  });

  pushConfirmOverlay?.addEventListener("push-confirm-close", () => {
    pushConfirmOverlay.classList.remove("from-maintenance");
  });
}

function createMaintenanceReasonOverlay() {
  const overlay = document.createElement("section");
  overlay.className = "source-info-overlay maintenance-reason-overlay hidden";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "メンテナンス理由");
  overlay.innerHTML = `
    <button class="source-info-close maintenance-reason-cancel" type="button" aria-label="メンテナンス理由の入力を閉じる">×</button>
    <form class="maintenance-reason-dialog" id="maintenance-reason-form">
      <h2>メンテナンス理由</h2>
      <label class="maintenance-reason-field">
        <span>利用者に表示する理由（任意）</span>
        <textarea id="maintenance-reason-input" rows="5" maxlength="500" placeholder="例：データ更新のため"></textarea>
      </label>
      <div class="maintenance-reason-actions">
        <button class="maintenance-reason-cancel" type="button">キャンセル</button>
        <button class="maintenance-reason-submit" type="submit">送信</button>
      </div>
    </form>
  `;
  return overlay;
}

function openMaintenanceReasonOverlay() {
  if (!maintenanceReasonOverlay) {
    maintenanceReasonOverlay = createMaintenanceReasonOverlay();
    document.body.appendChild(maintenanceReasonOverlay);
  }

  const overlay = maintenanceReasonOverlay;
  const form = overlay.querySelector("#maintenance-reason-form");
  const input = overlay.querySelector("#maintenance-reason-input");
  const cancelButtons = overlay.querySelectorAll(".maintenance-reason-cancel");
  input.value = "";
  overlay.classList.remove("hidden");
  document.body.classList.add("source-overlay-open");
  window.requestAnimationFrame(() => input?.focus());

  return new Promise((resolve) => {
    const close = (value) => {
      overlay.classList.add("hidden");
      if (!document.querySelector(".source-info-overlay:not(.hidden)")) {
        document.body.classList.remove("source-overlay-open");
      }
      form?.removeEventListener("submit", handleSubmit);
      cancelButtons.forEach((button) => button.removeEventListener("click", handleCancel));
      overlay.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleKeydown);
      resolve(value);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      close(normalizeMaintenanceReason(input?.value ?? ""));
    };
    const handleCancel = () => close(null);
    const handleOverlayClick = (event) => {
      if (event.target === overlay) {
        close(null);
      }
    };
    const handleKeydown = (event) => {
      if (event.key === "Escape" && !overlay.classList.contains("hidden")) {
        close(null);
      }
    };

    form?.addEventListener("submit", handleSubmit);
    cancelButtons.forEach((button) => button.addEventListener("click", handleCancel));
    overlay.addEventListener("click", handleOverlayClick);
    document.addEventListener("keydown", handleKeydown);
  });
}

function normalizeMaintenanceReason(reason) {
  return String(reason ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 500);
}

function createMaintenanceModeBadge() {
  const badge = document.createElement("div");
  badge.className = "maintenance-mode-badge hidden";
  badge.textContent = "メンテナンスモード";
  return badge;
}

function createLocalServerBadge() {
  const badge = document.createElement("div");
  badge.className = "local-server-badge hidden";
  badge.textContent = "Localサーバー";
  return badge;
}

function createParentTerminalBadge() {
  const badge = document.createElement("div");
  badge.className = "parent-terminal-badge hidden";
  badge.textContent = "親端末";
  return badge;
}

function createAdminModeOverlay() {
  const overlay = document.createElement("section");
  overlay.className = "source-info-overlay admin-mode-overlay hidden";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "管理者モード");
  overlay.innerHTML = `
    <button class="source-info-close" type="button" aria-label="管理者モードを閉じる">×</button>
    <form class="admin-mode-dialog" id="admin-mode-form">
      <h2>管理者モード</h2>
      <label class="admin-mode-field">
        <span>パスワード</span>
        <input id="admin-mode-password" type="password" autocomplete="current-password" />
      </label>
      <div class="admin-mode-actions">
        <button class="admin-mode-login" type="submit">親端末に設定</button>
        <button class="admin-mode-maintenance" id="admin-maintenance-toggle" type="button" disabled>メンテナンスモード</button>
      </div>
      <section class="admin-notification-panel" aria-label="通知送信">
        <h3>通知送信</h3>
        <label class="admin-mode-field">
          <span>タイトル</span>
          <input id="admin-notification-title" type="text" maxlength="80" value="WE-Simulator" />
        </label>
        <label class="admin-mode-field">
          <span>本文</span>
          <textarea id="admin-notification-body" rows="4" maxlength="300" placeholder="通知内容を入力"></textarea>
        </label>
        <label class="admin-mode-field admin-notification-token-field">
          <span>通知送信用トークン</span>
          <input id="admin-notification-token" type="password" autocomplete="off" />
        </label>
        <button class="admin-notification-send" id="admin-notification-send" type="button">通知を送信</button>
        <p class="admin-notification-status" id="admin-notification-status" role="status" aria-live="polite"></p>
      </section>
      <p class="admin-mode-status" id="admin-mode-status" role="status" aria-live="polite"></p>
    </form>
  `;

  const closeButton = overlay.querySelector(".source-info-close");
  const form = overlay.querySelector("#admin-mode-form");
  const passwordInput = overlay.querySelector("#admin-mode-password");
  const status = overlay.querySelector("#admin-mode-status");
  const loginButton = overlay.querySelector(".admin-mode-login");
  const toggleButton = overlay.querySelector("#admin-maintenance-toggle");
  const notificationSendButton = overlay.querySelector("#admin-notification-send");

  const closeOverlay = () => {
    overlay.classList.add("hidden");
    document.body.classList.remove("source-overlay-open");
  };

  closeButton?.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.classList.contains("hidden")) {
      closeOverlay();
    }
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isAdminParentActionPending(overlay) || isAdminMaintenanceActionPending(overlay)) {
      return;
    }

    if (isLocalDevelopmentHost()) {
      setAdminModeStatus(status, "Localサーバーでは親端末に設定できません", true);
      updateAdminModeControls(overlay);
      return;
    }

    const token = localStorage.getItem(ADMIN_PARENT_TOKEN_KEY);
    if (token) {
      setAdminParentActionPending(overlay, true);
      setAdminModeStatus(status, "解除中...");
      setAdminPasswordInputUnavailable(passwordInput);
      if (loginButton) {
        loginButton.disabled = true;
        loginButton.textContent = "解除中...";
      }
      if (toggleButton) {
        toggleButton.disabled = true;
      }
      const current = await fetchMaintenanceStatus();
      if (current.maintenance) {
        const maintenanceReleaseResult = await postMaintenanceAction("setMaintenance", {
          token,
          maintenance: false,
          parentRelease: true,
          releaseMaintenanceWithParent: true,
          reason: "",
          maintenanceReason: "",
          maintenanceDetail: "",
          details: "",
        });
        if (!maintenanceReleaseResult.ok) {
          if (isInvalidParentTokenResponse(maintenanceReleaseResult)) {
            await forceReleaseInvalidParentTerminal(overlay, passwordInput, status, token);
            return;
          }
          setAdminParentActionPending(overlay, false);
          updateAdminModeControls(overlay, current);
          setAdminModeStatus(status, maintenanceReleaseResult.message || "メンテナンスモードの解除に失敗しました。", true);
          return;
        }
        notifyMaintenanceStatusChange({ maintenance: false, reason: "" });
      }
      const result = await postMaintenanceAction("releaseParent", {
        token,
        releaseMaintenance: true,
        releaseMaintenanceWithParent: Boolean(current.maintenance),
      });
      if (!result.ok) {
        if (isInvalidParentTokenResponse(result)) {
          await forceReleaseInvalidParentTerminal(overlay, passwordInput, status, token);
          return;
        }
        setAdminParentActionPending(overlay, false);
        updateAdminModeControls(overlay, current);
        setAdminModeStatus(status, result.message || "親端末の解除に失敗しました。", true);
        return;
      }

      localStorage.removeItem(ADMIN_PARENT_TOKEN_KEY);
      notifyAdminParentStatusChange();
      passwordInput.value = "";
      setAdminParentActionPending(overlay, false);
      updateAdminModeControls(overlay, { maintenance: false });
      notifyMaintenanceStatusChange({ maintenance: false });
      setAdminModeStatus(status, current.maintenance ? "親端末を解除し、メンテナンスモードも解除しました。" : "親端末を解除しました。");
      return;
    }
    const adminPassword = passwordInput?.value ?? "";
    setAdminParentActionPending(overlay, true);
    setAdminModeStatus(status, "認証中...");
    setAdminPasswordInputUnavailable(passwordInput);
    if (loginButton) {
      loginButton.disabled = true;
      loginButton.textContent = "認証中...";
    }
    if (toggleButton) {
      toggleButton.disabled = true;
    }
    const result = await postMaintenanceAction("adminLogin", {
      password: adminPassword,
    });
    if (!result.ok || !result.token) {
      setAdminParentActionPending(overlay, false);
      localStorage.removeItem(ADMIN_PARENT_TOKEN_KEY);
      notifyAdminParentStatusChange();
      updateAdminModeControls(overlay);
      const message = result.ok && !result.token
        ? "Apps Scriptの管理者処理が未反映です。デプロイを更新してください。"
        : result.message || "認証できませんでした。";
      setAdminModeStatus(status, message, true);
      return;
    }

    localStorage.setItem(ADMIN_PARENT_TOKEN_KEY, result.token);
    notifyAdminParentStatusChange();
    passwordInput.value = "";
    setAdminParentActionPending(overlay, false);
    updateAdminModeControls(overlay);
    setAdminModeStatus(status, "この端末を親端末にしました。");
  });

  toggleButton?.addEventListener("click", async () => {
    if (isAdminParentActionPending(overlay) || isAdminMaintenanceActionPending(overlay)) {
      return;
    }

    const token = localStorage.getItem(ADMIN_PARENT_TOKEN_KEY);
    if (!token) {
      setAdminModeStatus(status, "先に親端末認証をしてください。", true);
      return;
    }

    setAdminMaintenanceActionPending(overlay, true);
    setAdminModeStatus(status, "確認中...");
    setAdminPasswordInputUnavailable(passwordInput);
    if (toggleButton) {
      toggleButton.disabled = true;
      toggleButton.textContent = "確認中...";
    }
    if (loginButton) {
      loginButton.disabled = true;
    }
    const current = await fetchMaintenanceStatus();
    const nextMaintenance = !Boolean(current.maintenance);
    const maintenanceReason = nextMaintenance ? await openMaintenanceReasonOverlay() : "";
    if (maintenanceReason === null) {
      setAdminMaintenanceActionPending(overlay, false);
      updateAdminModeControls(overlay, current);
      setAdminModeStatus(status, "メンテナンスモード設定をキャンセルしました。");
      return;
    }
    setAdminModeStatus(status, nextMaintenance ? "設定中..." : "解除中...");
    if (toggleButton) {
      toggleButton.disabled = true;
      toggleButton.textContent = nextMaintenance ? "設定中..." : "解除中...";
    }
    if (loginButton) {
      loginButton.disabled = true;
    }
    const result = await postMaintenanceAction("setMaintenance", {
      token,
      maintenance: nextMaintenance,
      reason: nextMaintenance ? maintenanceReason : "",
      maintenanceReason: nextMaintenance ? maintenanceReason : "",
      maintenanceDetail: nextMaintenance ? maintenanceReason : "",
      details: nextMaintenance ? maintenanceReason : "",
    });
    if (!result.ok) {
      setAdminMaintenanceActionPending(overlay, false);
      updateAdminModeControls(overlay, current);
      setAdminModeStatus(status, result.message || "切り替えに失敗しました。", true);
      return;
    }

    setAdminMaintenanceActionPending(overlay, false);
    const confirmedReason = nextMaintenance
      ? extractMaintenanceReason(result) || maintenanceReason
      : "";
    updateAdminModeControls(overlay, { maintenance: nextMaintenance, reason: confirmedReason });
    notifyMaintenanceStatusChange({ maintenance: nextMaintenance, reason: confirmedReason });
    setAdminModeStatus(status, nextMaintenance ? "メンテナンスモードに切り替えました。" : "メンテナンスモードを解除しました。");
  });

  notificationSendButton?.addEventListener("click", () => sendAdminNotification(overlay));

  return overlay;
}

async function sendAdminNotification(overlay) {
  if (!overlay || isAdminNotificationActionPending(overlay)) {
    return;
  }

  const titleInput = overlay.querySelector("#admin-notification-title");
  const bodyInput = overlay.querySelector("#admin-notification-body");
  const tokenInput = overlay.querySelector("#admin-notification-token");
  const status = overlay.querySelector("#admin-notification-status");
  const button = overlay.querySelector("#admin-notification-send");
  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY));
  const canSend = isLocalDevelopmentHost() || isParentTerminal;

  if (!canSend) {
    setAdminNotificationStatus(status, "Localサーバーまたは親端末でのみ送信できます。", true);
    return;
  }

  const title = String(titleInput?.value || "WE-Simulator").trim().slice(0, 80) || "WE-Simulator";
  const body = String(bodyInput?.value || "").trim().slice(0, 300);
  if (!body) {
    setAdminNotificationStatus(status, "本文を入力してください。", true);
    return;
  }

  const payload = {
    id: createNotificationHistoryId(),
    title,
    body,
    createdAt: new Date().toISOString(),
    url: "./",
    tag: "we-simulator-admin",
    renotify: true,
  };

  setAdminNotificationActionPending(overlay, true);
  if (button) {
    button.disabled = true;
    button.textContent = "送信中...";
  }
  setAdminNotificationStatus(status, "通知を送信しています...");

  try {
    const result = isLocalDevelopmentHost()
      ? await postLocalAdminNotification(payload)
      : await postParentAdminNotification(payload, tokenInput);

    if (!result.ok) {
      setAdminNotificationStatus(status, result.message || "通知送信に失敗しました。", true);
      return;
    }

    if (bodyInput) {
      bodyInput.value = "";
    }
    const confirmedNotification = result.notification || payload;
    await saveNotificationHistoryItem({
      id: confirmedNotification.id || payload.id,
      title: confirmedNotification.title || payload.title,
      body: confirmedNotification.body || payload.body,
      createdAt: confirmedNotification.createdAt || payload.createdAt,
      source: isLocalDevelopmentHost() ? "local" : "parent",
    });
    setAdminNotificationStatus(
      status,
      `通知を送信しました。購読端末: ${result.subscribers ?? 0} / 送信: ${result.sent ?? 0}`,
    );
  } catch (error) {
    console.warn(error);
    setAdminNotificationStatus(status, "通知送信に失敗しました。", true);
  } finally {
    setAdminNotificationActionPending(overlay, false);
    updateAdminNotificationControls(overlay);
  }
}

async function postLocalAdminNotification(payload) {
  const response = await fetch("./api/notify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  return {
    ok: response.ok && data.ok !== false,
    ...data,
  };
}

async function postParentAdminNotification(payload, tokenInput) {
  const config = await loadPushConfig();
  const workerUrl = config.workerUrl?.replace(/\/+$/, "");
  const token = String(tokenInput?.value || "").trim();

  if (!workerUrl) {
    return { ok: false, message: "Cloudflare Worker URLが未設定です。" };
  }

  if (!token) {
    return { ok: false, message: "通知送信用トークンを入力してください。" };
  }

  const response = await fetch(`${workerUrl}/notify`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok && data.ok !== false,
    message: data.message || data.error,
    ...data,
  };
}

function updateAdminNotificationControls(overlay) {
  if (!overlay) {
    return;
  }

  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY));
  const isLocalServer = isLocalDevelopmentHost();
  const panel = overlay.querySelector(".admin-notification-panel");
  const tokenField = overlay.querySelector(".admin-notification-token-field");
  const button = overlay.querySelector("#admin-notification-send");
  const pending = isAdminNotificationActionPending(overlay);
  const canShowNotificationPanel = isLocalServer || isParentTerminal;

  panel?.classList.toggle("hidden", !canShowNotificationPanel);
  tokenField?.classList.toggle("hidden", isLocalServer);
  if (button) {
    button.disabled = pending || !canShowNotificationPanel;
    if (!pending) {
      button.textContent = "通知を送信";
    }
  }
}

function setAdminNotificationStatus(element, message, isError = false) {
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.toggle("admin-mode-status-error", Boolean(isError));
}

function setAdminNotificationActionPending(overlay, isPending) {
  if (!overlay) {
    return;
  }

  overlay.dataset.notificationActionPending = isPending ? "true" : "false";
}

function isAdminNotificationActionPending(overlay) {
  return overlay?.dataset.notificationActionPending === "true";
}

function isInvalidParentTokenResponse(result) {
  const message = String(result?.message ?? "");
  return message.includes("親端末の認証が無効");
}

async function forceReleaseInvalidParentTerminal(overlay, passwordInput, status, token) {
  const current = await fetchMaintenanceStatus();
  if (current.maintenance) {
    await postMaintenanceAction("setMaintenance", {
      token,
      maintenance: false,
      parentRelease: true,
      releaseMaintenanceWithParent: true,
      reason: "",
      maintenanceReason: "",
      maintenanceDetail: "",
      details: "",
    });
    notifyMaintenanceStatusChange({ maintenance: false, reason: "" });
  }
  await postMaintenanceAction("forceReleaseInvalidParent", {
    token,
    releaseMaintenance: true,
    maintenance: false,
    reason: "",
    maintenanceReason: "",
    maintenanceDetail: "",
    details: "",
  });
  localStorage.removeItem(ADMIN_PARENT_TOKEN_KEY);
  notifyAdminParentStatusChange();
  if (passwordInput) {
    passwordInput.value = "";
  }
  setAdminParentActionPending(overlay, false);
  setAdminMaintenanceActionPending(overlay, false);
  updateAdminModeControls(overlay, { maintenance: false, reason: "" });
  notifyMaintenanceStatusChange({ maintenance: false, reason: "" });
  setAdminModeStatus(status, "親端末の認証が無効のため、親端末を解除しました。");
}

function openAdminModeOverlay(overlay) {
  if (!overlay) {
    return;
  }

  overlay.classList.remove("hidden");
  document.body.classList.add("source-overlay-open");
  updateAdminModeControls(overlay);
  overlay.querySelector("#admin-mode-password")?.focus();
}

function updateAdminModeControls(overlay, maintenanceStatus = null) {
  if (!overlay) {
    return;
  }

  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY));
  const passwordInput = overlay.querySelector("#admin-mode-password");
  const loginButton = overlay.querySelector(".admin-mode-login");
  const toggleButton = overlay.querySelector("#admin-maintenance-toggle");
  updateAdminNotificationControls(overlay);
  if (isLocalDevelopmentHost()) {
    if (passwordInput) {
      passwordInput.disabled = true;
    }
    if (loginButton) {
      loginButton.disabled = true;
      loginButton.textContent = LOCAL_PARENT_UNAVAILABLE_LABEL;
    }
    if (toggleButton) {
      toggleButton.disabled = true;
      toggleButton.textContent = "メンテナンスモード";
    }
    return;
  }

  if (isAdminParentActionPending(overlay) || isAdminMaintenanceActionPending(overlay)) {
    setAdminPasswordInputUnavailable(passwordInput);
    if (toggleButton) {
      toggleButton.disabled = true;
    }
    return;
  }

  if (passwordInput) {
    if (isParentTerminal) {
      setAdminPasswordInputUnavailable(passwordInput);
    } else {
      setAdminPasswordInputAvailable(passwordInput);
    }
  }
  if (loginButton) {
    loginButton.disabled = false;
    loginButton.textContent = isParentTerminal ? "親端末を解除" : "親端末に設定";
  }
  if (toggleButton) {
    toggleButton.disabled = !isParentTerminal;
    if (!isParentTerminal) {
      toggleButton.textContent = "メンテナンスモード";
    } else if (maintenanceStatus && typeof maintenanceStatus.maintenance === "boolean") {
      toggleButton.textContent = maintenanceStatus.maintenance ? "メンテナンスモード解除" : "メンテナンスモード";
    } else {
      toggleButton.textContent = "確認中...";
      toggleButton.disabled = true;
      setAdminPasswordInputUnavailable(passwordInput);
      fetchMaintenanceStatus().then((status) => {
        const isStillParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY));
        if (!isStillParentTerminal) {
          toggleButton.textContent = "メンテナンスモード";
          toggleButton.disabled = true;
          if (!isAdminParentActionPending(overlay) && !isAdminMaintenanceActionPending(overlay)) {
            setAdminPasswordInputAvailable(passwordInput);
          }
          return;
        }
        if (isAdminParentActionPending(overlay) || isAdminMaintenanceActionPending(overlay)) {
          toggleButton.disabled = true;
          setAdminPasswordInputUnavailable(passwordInput);
          return;
        }
        toggleButton.textContent = status.maintenance ? "メンテナンスモード解除" : "メンテナンスモード";
        toggleButton.disabled = false;
        setAdminPasswordInputUnavailable(passwordInput);
        notifyMaintenanceStatusChange(status);
      });
    }
  }
}

function setAdminPasswordInputUnavailable(input) {
  if (!input) {
    return;
  }

  input.dataset.previousType = input.dataset.previousType || input.type || "password";
  input.type = "text";
  input.value = "入力不可";
  input.disabled = true;
}

function setAdminPasswordInputAvailable(input) {
  if (!input) {
    return;
  }

  input.type = input.dataset.previousType || "password";
  input.value = "";
  input.disabled = false;
}

function setAdminParentActionPending(overlay, isPending) {
  if (!overlay) {
    return;
  }

  overlay.dataset.parentActionPending = isPending ? "true" : "false";
}

function isAdminParentActionPending(overlay) {
  return overlay?.dataset.parentActionPending === "true";
}

function setAdminMaintenanceActionPending(overlay, isPending) {
  if (!overlay) {
    return;
  }

  overlay.dataset.maintenanceActionPending = isPending ? "true" : "false";
}

function isAdminMaintenanceActionPending(overlay) {
  return overlay?.dataset.maintenanceActionPending === "true";
}

function setAdminModeStatus(element, message, isError = false) {
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.toggle("admin-mode-status-error", Boolean(isError));
}

function setupMaintenanceMode(maintenanceOverlay, maintenanceBadge) {
  const refresh = async () => {
    try {
      const status = await fetchMaintenanceStatus();
      updateMaintenanceStateIndicators(maintenanceOverlay, maintenanceBadge, status);
    } finally {
      if (!maintenanceStatusReady) {
        maintenanceStatusReady = true;
        updateSimulationAvailability();
      }
    }
  };

  window.addEventListener("maintenance-status-change", (event) => {
    updateMaintenanceStateIndicators(maintenanceOverlay, maintenanceBadge, event.detail);
  });
  refresh();
  window.setInterval(refresh, MAINTENANCE_STATUS_POLL_MS);
}

function setupParentTerminalBadge(badge) {
  const refresh = () => updateParentTerminalBadge(badge, latestMaintenanceStatus);
  window.addEventListener("admin-parent-status-change", refresh);
  window.addEventListener("maintenance-status-change", (event) => {
    updateParentTerminalBadge(badge, event.detail);
  });
  window.addEventListener("storage", (event) => {
    if (event.key === ADMIN_PARENT_TOKEN_KEY) {
      refresh();
    }
  });
  refresh();
}

function setupLocalServerBadge(badge) {
  const refresh = () => updateLocalServerBadge(badge);
  window.addEventListener("maintenance-status-change", refresh);
  refresh();
}

function updateLocalServerBadge(badge) {
  if (!badge) {
    return;
  }

  badge.textContent = "Localサーバー";
  badge.classList.add("hidden");
}

function updateParentTerminalBadge(badge, maintenanceStatus = latestMaintenanceStatus) {
  if (!badge) {
    return;
  }

  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY));
  badge.textContent = maintenanceStatus?.maintenance ? "親端末／メンテナンスモード" : "親端末";
  badge.classList.toggle("hidden", !isParentTerminal || isLocalDevelopmentHost());
}

function updateMaintenanceStateIndicators(overlay, badge, status) {
  latestMaintenanceStatus = {
    maintenance: Boolean(status?.maintenance),
    reason: extractMaintenanceReason(status),
  };
  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY));
  const isLocalServer = isLocalDevelopmentHost();
  const isMaintenanceExemptTerminal = isParentTerminal || isLocalServer;
  document.body.classList.toggle(
    "maintenance-screen-blocking",
    Boolean(status.maintenance && !isMaintenanceExemptTerminal),
  );
  const reason = latestMaintenanceStatus.reason;
  if (status.maintenance && !isMaintenanceExemptTerminal && state.simulationRunning) {
    stopSimulation();
  }
  if (overlay) {
    updateMaintenanceOverlayMessage(overlay, reason);
    overlay.classList.toggle("hidden", !status.maintenance || isMaintenanceExemptTerminal);
  }
  if (badge) {
    badge.classList.add("hidden");
    badge.classList.remove("is-stacked-above-local");
    const parentBadge = document.querySelector(".parent-terminal-badge");
    updateParentTerminalBadge(parentBadge, latestMaintenanceStatus);
    const localBadge = document.querySelector(".local-server-badge");
    updateLocalServerBadge(localBadge);
  }
  updateSimulationAvailability();
}

function updateMaintenanceOverlayMessage(overlay, reason = "") {
  const dialog = overlay.querySelector(".maintenance-mode-dialog");
  if (!dialog) {
    return;
  }

  dialog.innerHTML = `
    <h2>只今メンテナンス中です</h2>
    <p class="maintenance-mode-reason ${reason ? "" : "hidden"}">${reason ? formatMaintenanceReasonHtml(reason) : ""}</p>
    <p>しばらくお待ち下さい。</p>
    ${buildMaintenanceOverlayLinksHtml()}
  `;
}

function formatMaintenanceReasonHtml(reason) {
  return `詳細：${escapeHtml(reason).replace(/\n/g, "<br>")}`;
}

function notifyMaintenanceStatusChange(status) {
  window.dispatchEvent(new CustomEvent("maintenance-status-change", { detail: status }));
}

function notifyAdminParentStatusChange() {
  window.dispatchEvent(new CustomEvent("admin-parent-status-change"));
}

function extractMaintenanceReason(payload) {
  const candidates = [
    payload?.reason,
    payload?.maintenanceReason,
    payload?.maintenanceDetail,
    payload?.maintenanceDetails,
    payload?.detail,
    payload?.details,
    payload?.maintenance?.reason,
    payload?.maintenance?.maintenanceReason,
    payload?.status?.reason,
    payload?.status?.maintenanceReason,
    payload?.data?.reason,
    payload?.data?.maintenanceReason,
  ];

  for (const candidate of candidates) {
    const reason = normalizeMaintenanceReason(candidate);
    if (reason) {
      return reason;
    }
  }

  return "";
}

async function fetchMaintenanceStatus() {
  if (isLocalDevelopmentHost()) {
    return { maintenance: false };
  }

  try {
    const workerUrl = await getWorkerBaseUrl();
    if (!workerUrl) {
      return { maintenance: false };
    }
    const url = `${workerUrl}/maintenance-status?ts=${Date.now()}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return { maintenance: false };
    }
    const data = await response.json();
    return {
      maintenance: Boolean(data.maintenance),
      reason: extractMaintenanceReason(data),
    };
  } catch (error) {
    console.warn(error);
    return { maintenance: false };
  }
}

function isLocalDevelopmentHost() {
  const hostname = window.location.hostname;
  return hostname === "localhost"
    || hostname === "127.0.0.1"
    || hostname === "::1"
    || hostname.startsWith("192.168.")
    || hostname.startsWith("10.")
    || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);
}

async function postMaintenanceAction(action, payload = {}) {
  try {
    const workerUrl = await getWorkerBaseUrl();
    if (!workerUrl) {
      return { ok: false, message: "Cloudflare Worker URLが未設定です。" };
    }

    const response = await fetch(`${workerUrl}/maintenance-action`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        action,
        ...payload,
        page: location.href,
        userAgent: navigator.userAgent,
        createdAt: new Date().toISOString(),
        sheet: FEEDBACK_SHEET_URL,
      }),
    });
    const data = await response.json().catch(() => ({}));
    return {
      ok: response.ok && data.ok !== false,
      ...data,
    };
  } catch (error) {
    console.warn(error);
    return { ok: false };
  }
}

function createFeedbackOverlay() {
  const overlay = document.createElement("section");
  overlay.className = "source-info-overlay feedback-overlay hidden";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "フィードバック");
  overlay.innerHTML = buildFeedbackOverlayHtml();

  const form = overlay.querySelector(".feedback-form");
  const textarea = overlay.querySelector("#feedback-message");
  const status = overlay.querySelector(".feedback-status");
  const submitButton = overlay.querySelector(".feedback-submit");
  const closeButton = overlay.querySelector(".source-info-close");
  applyFeedbackPlaceholder(textarea);
  setupSourceInfoScrollBounds(overlay);
  const closeOverlay = () => {
    const shouldReturnToMaintenance = overlay.dataset.returnToMaintenance === "true";
    const shouldReturnToSource = overlay.dataset.returnToSource === "true";
    delete overlay.dataset.returnToMaintenance;
    delete overlay.dataset.returnToSource;
    overlay.classList.add("hidden");
    overlay.classList.remove("from-source");
    if (!shouldReturnToSource) {
      document.body.classList.remove("source-overlay-open");
    }
    if (shouldReturnToMaintenance) {
      document.querySelector(".maintenance-mode-overlay")?.classList.remove("hidden");
    }
    overlay.dispatchEvent(new CustomEvent("feedback-overlay-close"));
  };

  closeButton?.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.classList.contains("hidden")) {
      closeOverlay();
    }
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = textarea?.value.trim() ?? "";
    if (!message) {
      setFeedbackStatus(status, "任意の文字を入力してください。", true);
      textarea?.focus();
      return;
    }

    if (!FEEDBACK_ENDPOINT_URL) {
      setFeedbackStatus(
        status,
        "送信用URLが未設定です。Apps ScriptのWebアプリURLをFEEDBACK_ENDPOINT_URLに設定してください。",
        true,
      );
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
    }
    setFeedbackStatus(status, "送信中...", false);

    try {
      await sendFeedbackMessage(message);
      textarea.value = "";
      setFeedbackStatus(status, "送信しました。ありがとうございます。", false);
    } catch (error) {
      console.warn(error);
      setFeedbackStatus(status, "送信に失敗しました。時間をおいて再度お試しください。", true);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });

  return overlay;
}

function applyFeedbackPlaceholder(textarea) {
  if (!textarea) {
    return;
  }

  textarea.placeholder = getCleanFeedbackPlaceholderText();
}

function getFeedbackPlaceholderText() {
  return [
    "例：スマホでメニューが少し開きにくい。",
    "　　震度表示を見やすくしてほしい。",
    "　　など",
  ].join("\n");
}

function getCleanFeedbackPlaceholderText() {
  return [
    "例：スマホでメニューが少し開きにくい",
    "　　震度表示を見やすくしてほしい",
  ].join("\n");
}

function buildFeedbackOverlayHtml() {
  return `
    <button class="source-info-close" type="button" aria-label="フィードバックを閉じる">×</button>
    <form class="source-info-overlay-content feedback-form" id="feedback-form">
      <header class="source-info-header">
        <p>Feedback</p>
        <h2>フィードバック</h2>
      </header>
      <label class="feedback-field" for="feedback-message">
        <span>気づいた点、改善してほしい点など</span>
        <textarea id="feedback-message" name="message" rows="10" maxlength="4000" placeholder="${escapeHtml(getCleanFeedbackPlaceholderText())}"></textarea>
      </label>
      <p class="feedback-status" role="status" aria-live="polite"></p>
      <p class="feedback-sheet-note">
        送信内容は管理者のGoogleスプレッドシートに記録されます。
      </p>
    </form>
    <div class="feedback-actions">
      <button class="feedback-submit" type="submit" form="feedback-form">送信</button>
    </div>
  `;
}

async function sendFeedbackMessage(message) {
  const payload = {
    message,
    page: location.href,
    userAgent: navigator.userAgent,
    createdAt: new Date().toISOString(),
    sheet: FEEDBACK_SHEET_URL,
  };

  await fetch(FEEDBACK_ENDPOINT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
}

function setFeedbackStatus(element, message, isError) {
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.toggle("feedback-status-error", Boolean(isError));
}

function buildSourceInfoOverlayHtml() {
  const sections = SOURCE_SECTIONS.map((section) => {
    const links = section.links.map((source) => {
      const description = source.description || getSourceLinkDescription(source, section);
      const labelSuffix = source.kind ? ` <span class="source-link-kind">${escapeHtml(source.kind)}</span>` : "";
      const sourceUrl = escapeHtml(source.href);
      return `
        <article class="source-link-card">
          <span class="source-link-label">${escapeHtml(source.label)}${labelSuffix}</span>
          <span class="source-link-description">${escapeHtml(description)}</span>
          <a class="source-link-url" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(formatSourceUrl(source.href))}</a>
        </article>
      `;
    }).join("");

    const note = section.note ? `<p class="source-section-note">${escapeHtml(section.note)}</p>` : "";

    return `
      <section class="source-info-section">
        <h3>${escapeHtml(section.title)}</h3>
        <p>${escapeHtml(section.description)}</p>
        <div class="source-link-list">${links}</div>
        ${note}
      </section>
    `;
  }).join("");

  return `
    <button class="source-info-close" type="button" aria-label="出典を閉じる">×</button>
    <div class="source-info-overlay-content">
      <header class="source-info-header">
        <p>Sources and Privacy-policy</p>
        <h2>出典・プライバシーポリシー</h2>
      </header>
      <div class="source-info-tabs" role="tablist" aria-label="出典とプライバシーポリシー">
        <button class="source-info-tab is-active" id="source-tab-sources" type="button" role="tab" aria-selected="true" aria-controls="source-panel-sources">出典</button>
        <button class="source-info-tab" id="source-tab-privacy" type="button" role="tab" aria-selected="false" aria-controls="source-panel-privacy">プライバシーポリシー</button>
      </div>
      <div class="source-info-tab-panel" id="source-panel-sources" role="tabpanel" aria-labelledby="source-tab-sources">
        <div class="source-info-sections">${sections}</div>
      </div>
      <div class="source-info-tab-panel hidden" id="source-panel-privacy" role="tabpanel" aria-labelledby="source-tab-privacy">
        ${buildPrivacyPolicyHtml()}
      </div>
    </div>
    <div class="source-info-footer">
      <button class="source-admin-mode-button" type="button">管理者モード</button>
      <p class="source-info-updated">最終更新：${formatSourceUpdatedAt(SOURCE_UPDATED_AT)}</p>
    </div>
  `;
}

function getSourceLinkDescription(source, section) {
  const label = String(source?.label ?? "");
  const href = String(source?.href ?? "");

  if (label.includes("区域の名称")) return "緊急地震速報・震度情報で使う区域名と市町村対応の確認に使用しています。";
  if (label.includes("震央地名")) return "震源地名の候補や震央区域の整理に使用しています。";
  if (label.includes("震度観測点")) return "震度観測点の名称と位置を表示するために使用しています。";
  if (label.includes("緊急地震速報")) return "緊急地震速報の表示内容や警報扱いの参考にしています。";
  if (label.includes("予報区等GIS")) return "細分区域などの地理データを地図レイヤー作成に使用しています。";
  if (label.includes("国土数値情報")) return "市区町村などの行政区域データの作成に使用しています。";
  if (label.includes("J-SHIS")) return "地盤や揺れやすさに関する資料の参照に使用しています。";
  if (label.includes("Natural Earth")) return "日本周辺の陸域・海岸線など背景地図の補助に使用しています。";
  if (label.includes("PB2002") || label.includes("Bird")) return "日本周辺のプレート境界線の描画に使用しています。";
  if (label.includes("S-net") || label.includes("海底地震津波観測網")) return "海底観測網の表示と資料確認に使用しています。";
  if (label.includes("MeteoScope")) return "起動時の地図表示や配色・レイヤー構成の参考にしています。";
  if (label.includes("MapLibre")) return "地図描画ライブラリとして使用しています。";
  if (href.includes("jma.go.jp")) return "気象庁が公開している一次資料として参照しています。";
  return `${section.title}に関する資料として参照しています。`;
}

function formatSourceUrl(value) {
  return String(value ?? "").replace(/^https?:\/\//, "");
}

function buildPrivacyPolicyHtml() {
  return `
    <div class="source-info-sections privacy-policy-sections">
      <section class="source-info-section">
        <h3>取得する情報</h3>
        <p>本サイトは、震源設定や地図表示、フィードバック送信のために必要な範囲で情報を扱います。</p>
        <ul>
          <li>現在地機能を利用した場合の緯度・経度、現在地名、推定震度などの表示用情報</li>
          <li>フィードバックとして入力された内容</li>
          <li>フィードバック送信時の送信日時、送信元のユーザーエージェント</li>
        </ul>
      </section>
      <section class="source-info-section">
        <h3>利用目的</h3>
        <p>取得した情報は、シミュレーション表示、問い合わせ対応、動作改善のために利用します。</p>
      </section>
      <section class="source-info-section">
        <h3>外部送信</h3>
        <p>フィードバック内容は、管理者のGoogle Apps ScriptおよびGoogleスプレッドシートへ送信されます。現在地は、利用者が現在地機能を許可した場合にブラウザから取得され、画面表示や計算に利用されます。</p>
      </section>
      <section class="source-info-section">
        <h3>保存期間と管理</h3>
        <p>送信された内容は管理者が必要な範囲で保管し、不要になった情報は適宜削除します。</p>
      </section>
      <section class="source-info-section">
        <h3>第三者提供</h3>
        <p>法令に基づく場合を除き、取得した情報を第三者へ提供しません。</p>
      </section>
      <section class="source-info-section">
        <h3>問い合わせ</h3>
        <p>本サイトに関する問い合わせは、<br /><a href="mailto:akurah3000@icloud.com">akurah3000@icloud.com</a> または <a href="#feedback" data-feedback-link>フィードバック</a> までご連絡ください。</p>
      </section>
    </div>
  `;
}

function formatSourceUpdatedAt(value) {
  const match = String(value ?? "").match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!match) {
    return value;
  }

  const [, year, month, day] = match;
  return `${year}年${month.padStart(2, "0")}月${day.padStart(2, "0")}日`;
}

async function showMapLayers() {
  document.body.classList.add("map-core-loading");
  startupLocationResolved = false;
  addGeoJsonSource("surrounding-land", emptyFeatureCollection());
  addGeoJsonSource("world-coastline", emptyFeatureCollection());
  addGeoJsonSource("japan-coastline", emptyFeatureCollection());
  addGeoJsonSource("prefecture-boundaries", emptyFeatureCollection());
  addGeoJsonSource("municipality-areas", emptyFeatureCollection());
  addGeoJsonSource("municipality-boundary-lines", emptyFeatureCollection());
  addGeoJsonSource("jma-local-area-boundaries", emptyFeatureCollection());
  addVectorTileSource("japan-pmtiles", {
    url: getJapanPmtilesProtocolUrl(),
    minzoom: 0,
    maxzoom: 14,
    attribution: "JMA / National Land Numerical Information",
  });
  addGeoJsonSource("jma-local-areas", emptyFeatureCollection());
  addGeoJsonSource("history-epicenter-areas", emptyFeatureCollection());
  addGeoJsonSource("plate-boundaries", emptyFeatureCollection());
  addGeoJsonSource("active-faults", emptyFeatureCollection());
  addGeoJsonSource("submarine-observation-points", emptyFeatureCollection());
  addGeoJsonSource("shindo-stations", emptyFeatureCollection());
  addGeoJsonSource("p-wave", emptyFeatureCollection());
  addGeoJsonSource("s-wave", emptyFeatureCollection());

  addMapLayers();
  setupStationHoverPopup();
  keepWaveAndStationLayerOrder();
  fitInitialMapBounds(getInitialJapanBounds());
  startupLocationResolved = true;
  municipalityBoundaryVisible = true;
  scheduleStartupReadyAfterIntensityPaint();
  watchJapanPmtilesStartup();
}

function scheduleStartupBackgroundData() {
  if (startupBackgroundDataScheduled) {
    return;
  }
  startupBackgroundDataScheduled = true;
  scheduleDeferredTask(
    hydrateDeferredSupplementaryMapData,
    LIGHT_DEFERRED_DATA_DELAY_MS,
    3000,
  ).catch((error) => console.warn(error));
  scheduleDeferredTask(
    hydrateDeferredSimulationMapData,
    SIMULATION_DEFERRED_DATA_DELAY_MS,
    8000,
  ).catch((error) => console.warn(error));
  scheduleDeferredTask(() => scheduleLocationResolve(), 1200, 3200);
  updateSimulationAvailability();
  schedulePostMunicipalityDataHydration();
}

function watchJapanPmtilesStartup() {
  let settled = false;
  let fallbackTimer = 0;

  const finishAfterPaint = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(finish);
    });
  };

  const cleanup = () => {
    map?.off("sourcedata", onSourceData);
    map?.off("idle", finishAfterPaint);
    if (fallbackTimer) {
      window.clearTimeout(fallbackTimer);
    }
  };

  const finish = () => {
    if (settled) {
      return;
    }

    settled = true;
    cleanup();
    startupLocationResolved = true;
    municipalityBoundaryVisible = true;
    scheduleStartupReadyAfterIntensityPaint();
  };

  const onSourceData = (event) => {
    if (event.sourceId === "japan-pmtiles") {
      finishAfterPaint();
    }
  };

  if (map.isSourceLoaded?.("japan-pmtiles") || map.areTilesLoaded?.()) {
    finishAfterPaint();
    return;
  }

  map.on("sourcedata", onSourceData);
  map.once("idle", finishAfterPaint);
  fallbackTimer = window.setTimeout(finishAfterPaint, 900);
}

function applyMunicipalityLogicData(displayData, options = {}) {
  if (!displayData?.features?.length) {
    return;
  }

  const shouldRefreshDerivedState = options.refreshDerivedState !== false;
  municipalityDisplayData = displayData;
  if (shouldRefreshDerivedState) {
    invalidateIntensityEstimateCache();
  }
  keepWaveAndStationLayerOrder();
  if (shouldRefreshDerivedState) {
    updateSetupResultOutputs();
    updateIntensityLayer();
    updateSimulationAvailability();
  }
}

function isOldScaleSyntheticMunicipalityHydrating() {
  const preset = getSelectedPreset();
  return Boolean(
    preset &&
      oldScaleSyntheticMunicipalityHydrationPromise &&
      oldScaleSyntheticMunicipalityHydratingPresetId === preset.id,
  );
}

function scheduleOldScaleSyntheticMunicipalityHydration(preset) {
  if (!isOldJmaScaleSyntheticPreset(preset)) {
    oldScaleSyntheticMunicipalityHydrationPromise = null;
    oldScaleSyntheticMunicipalityHydratingPresetId = "";
    return;
  }

  oldScaleSyntheticMunicipalityHydratingPresetId = preset.id;
  oldScaleSyntheticMunicipalityHydrationPromise = scheduleDeferredTask(
    () => hydrateOldScaleSyntheticMunicipalityData(preset),
    350,
    1800,
  )
    .catch((error) => console.warn("Old JMA scale municipality representatives unavailable", error))
    .finally(() => {
      if (oldScaleSyntheticMunicipalityHydratingPresetId === preset.id) {
        oldScaleSyntheticMunicipalityHydrationPromise = null;
        oldScaleSyntheticMunicipalityHydratingPresetId = "";
        invalidateIntensityEstimateCache();
        updateIntensityLayer();
        updateSimulationAvailability();
      }
    });
  updateSimulationAvailability();
}

async function hydrateOldScaleSyntheticMunicipalityData(preset) {
  if (!preset?.observedStations?.length) {
    return;
  }
}

async function hydrateDeferredSupplementaryMapData() {
  const [
    surroundingLand,
    worldCoastline,
    japanCoastline,
    prefectureBoundaryLines,
    municipalityBoundaries,
    municipalityBoundaryLines,
    localAreaBoundaryLines,
  ] = await Promise.all([
    loadOptionalGeoJsonData(loadSurroundingLand, "Surrounding land GeoJSON"),
    loadOptionalGeoJsonData(loadWorldCoastline, "World coastline GeoJSON"),
    loadOptionalGeoJsonData(loadJapanCoastline, "Japan coastline GeoJSON"),
    loadOptionalGeoJsonData(loadPrefectureBoundaryLines, "Prefecture boundary line GeoJSON"),
    loadOptionalGeoJsonData(loadMunicipalityBoundaries, "Municipality boundary GeoJSON"),
    loadOptionalGeoJsonData(loadMunicipalityBoundaryLines, "Municipality boundary line GeoJSON"),
    loadOptionalGeoJsonData(loadJmaLocalAreaBoundaryLines, "JMA local area boundary line GeoJSON"),
  ]);

  setGeoJsonSourceData("surrounding-land", filterSurroundingLandForDisplay(surroundingLand));
  setGeoJsonSourceData("world-coastline", removeWorldJapanOverlapLinework(worldCoastline));
  setGeoJsonSourceData("japan-coastline", japanCoastline);
  setGeoJsonSourceData("prefecture-boundaries", prefectureBoundaryLines);
  setGeoJsonSourceData("municipality-areas", municipalityBoundaries);
  setGeoJsonSourceData("municipality-boundary-lines", municipalityBoundaryLines);
  setGeoJsonSourceData("jma-local-area-boundaries", localAreaBoundaryLines);
  applyMunicipalityLogicData(municipalityBoundaries, { refreshDerivedState: false });
  keepWaveAndStationLayerOrder();
}

async function hydrateDeferredSimulationMapData() {
  const [localAreas, shindoStations, eewForecastAreas] = await Promise.all([
    loadOptionalGeoJsonData(loadLocalAreas, "JMA local area GeoJSON"),
    loadOptionalStationData(loadShindoStations, "JMA shindo stations"),
    loadEewForecastAreas().catch((error) => {
      console.warn("JMA EEW forecast area mapping unavailable; falling back to local rules", error);
      return null;
    }),
  ]);
  const hasShindoStationData = Array.isArray(shindoStations?.stations) && shindoStations.stations.length > 0;

  localAreaData = localAreas;
  shindoStationData = hasShindoStationData ? shindoStations : null;
  eewForecastAreaData = eewForecastAreas;
  eewForecastAreaNameCache.clear();
  invalidateIntensityEstimateCache();
  if (shouldSyncAreaSourceData()) {
    syncVisibleAreaSourceData(Infinity);
  }
  if (state.showStationLayer) {
    setGeoJsonSourceData(
      "shindo-stations",
      hasShindoStationData ? buildStationIntensityData(shindoStations, Infinity) : emptyFeatureCollection(),
    );
  }
  updateSetupResultOutputs();
  updateIntensityLayer();
  updateSimulationAvailability();
}

async function loadOptionalGeoJsonData(loader, label) {
  try {
    return await loader();
  } catch (error) {
    console.warn(`${label} unavailable; continuing with empty data`, error);
    return emptyFeatureCollection();
  }
}

async function loadOptionalStationData(loader, label) {
  try {
    return await loader();
  } catch (error) {
    console.warn(`${label} unavailable; continuing with empty data`, error);
    return emptyStationData();
  }
}

function scheduleStartupReadyAfterIntensityPaint() {
  if (
    startupMapVisualReady ||
    startupOverlayReleasePending ||
    !startupLocationResolved ||
    !municipalityBoundaryVisible
  ) {
    return;
  }

  startupOverlayReleasePending = true;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(releaseStartupMapOverlay);
  });
}

function releaseStartupMapOverlay() {
  startupOverlayReleasePending = false;
  startupMapVisualReady = true;
  map?.resize();
  window.requestAnimationFrame(() => renderStationCanvasOverlay());
  document.body.classList.remove("map-core-loading");
  updateSimulationAvailability();
  scheduleStartupBackgroundData();
}

function schedulePostMunicipalityDataHydration() {
  if (postMunicipalityDataScheduled) {
    return;
  }

  postMunicipalityDataScheduled = true;
  scheduleDeferredTask(loadSecondaryMapData, LIGHT_DEFERRED_DATA_DELAY_MS, 3000);
  scheduleDeferredTask(loadStationMapData, STATION_DEFERRED_DATA_DELAY_MS, 3500);
  scheduleDeferredTask(loadEarthquakePresets, PRESET_DEFERRED_DATA_DELAY_MS, 4500);
  scheduleDeferredTask(loadHeavyGroundModelData, HEAVY_DEFERRED_DATA_DELAY_MS, 8000);
  scheduleDeferredTask(loadPlateBoundaryMapData, PLATE_BOUNDARY_DEFERRED_DATA_DELAY_MS, 9000);
}

function scheduleDeferredTask(callback, delayMs = 0, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const run = () => {
        try {
          resolve(callback());
        } catch (error) {
          reject(error);
        }
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(run, { timeout: timeoutMs });
        return;
      }

      window.setTimeout(run, 0);
    }, delayMs);
  });
}

function loadSecondaryMapData() {
  loadEpicenterAreas().catch((error) => console.warn(error));
}

function loadPlateBoundaryMapData() {
  loadPlateBoundaries()
    .then((plateBoundaries) => {
      setGeoJsonSourceData("plate-boundaries", plateBoundaries);
      updatePlateBoundaryLayerVisibility();
      keepWaveAndStationLayerOrder();
    })
    .catch((error) => console.warn(error));
}

function loadStationMapData() {
  const stationDataAlreadyAvailable = Boolean(shindoStationData);
  loadShindoStations()
    .then((shindoStations) => {
      if (stationDataAlreadyAvailable && sourceDataRefs.get("shindo-stations")) {
        return;
      }
      if (state.showStationLayer) {
        setGeoJsonSourceData("shindo-stations", buildStationIntensityData(shindoStations));
      }
      if (!stationDataAlreadyAvailable) {
        invalidateIntensityEstimateCache();
        updateIntensityLayer();
      }
    })
    .catch((error) => console.warn(error))
    .finally(() => updateSimulationAvailability());
}

function loadHeavyGroundModelData() {
  loadGroundModel()
    .then(() => {
      invalidateIntensityEstimateCache();
      updateIntensityLayer();
    })
    .catch((error) => console.warn(error));
}

function filterSurroundingLandForDisplay(geojson) {
  return {
    ...geojson,
    features: (geojson.features ?? []).flatMap((feature) => {
      const properties = feature.properties ?? {};
      if (properties.isoA3 !== "JPN" && properties.nameEn !== "Japan") {
        return removeWorldJapanOverlapPolygons(feature).map(removeInteriorRingsFromFeature);
      }

      return [];
    }),
  };
}

function removeWorldJapanOverlapPolygons(feature) {
  const geometry = feature.geometry;
  if (!geometry?.coordinates) {
    return [feature];
  }

  if (geometry.type === "MultiPolygon") {
    const coordinates = geometry.coordinates.filter((polygon) => !isWorldJapanOverlapPolygon(polygon));
    return coordinates.length > 0
      ? [{
          ...feature,
          geometry: {
            ...geometry,
            coordinates,
          },
        }]
      : [];
  }

  if (geometry.type === "Polygon" && isWorldJapanOverlapPolygon(geometry.coordinates)) {
    return [];
  }

  return [feature];
}

function isWorldJapanOverlapPolygon(polygon) {
  const outerRing = polygon?.[0];
  if (!Array.isArray(outerRing) || outerRing.length === 0) {
    return false;
  }

  const center = getRingCentroidCoordinate(outerRing);
  return center ? shouldSuppressWorldJapanCoordinate(center) : false;
}

function removeInteriorRingsFromFeature(feature) {
  const geometry = feature.geometry;
  if (!geometry) {
    return feature;
  }

  if (geometry.type === "GeometryCollection") {
    return {
      ...feature,
      geometry: {
        ...geometry,
        geometries: (geometry.geometries ?? []).map(
          (part) => removeInteriorRingsFromFeature({ geometry: part }).geometry,
        ),
      },
    };
  }

  if (!geometry.coordinates) {
    return feature;
  }

  if (geometry.type === "MultiPolygon") {
    return {
      ...feature,
      geometry: {
        ...geometry,
        coordinates: geometry.coordinates
          .map((polygon) => polygon?.[0])
          .filter((ring) => Array.isArray(ring) && ring.length >= 4)
          .map((ring) => [ring]),
      },
    };
  }

  if (geometry.type === "Polygon") {
    const outerRing = geometry.coordinates?.[0];
    return Array.isArray(outerRing) && outerRing.length >= 4
      ? {
          ...feature,
          geometry: {
            ...geometry,
            coordinates: [outerRing],
          },
        }
      : feature;
  }

  return feature;
}

function pointInBounds([longitude, latitude], bounds) {
  return longitude >= bounds.west && longitude <= bounds.east && latitude >= bounds.south && latitude <= bounds.north;
}

function addGeoJsonSource(id, data) {
  if (map.getSource(id)) {
    setGeoJsonSourceData(id, data);
    return;
  }

  map.addSource(id, {
    type: "geojson",
    data,
  });
  sourceDataRefs.set(id, data);
}

function addVectorTileSource(id, options) {
  if (map.getSource(id)) {
    return;
  }

  map.addSource(id, {
    type: "vector",
    ...options,
  });
}

function setGeoJsonSourceData(id, data) {
  const source = map?.getSource(id);
  if (!source) {
    return false;
  }

  if (sourceDataRefs.get(id) === data) {
    return false;
  }

  source.setData(data);
  sourceDataRefs.set(id, data);
  if (id === "shindo-stations") {
    stationCanvasFeatureCache = { data: null, features: [] };
    scheduleStationCanvasRender();
    updateActiveStationPopups(data);
  }
  if (id === "submarine-observation-points") {
    submarineStationCanvasFeatureCache = { data: null, features: [] };
    scheduleStationCanvasRender();
    updateActiveStationPopups(data);
  }
  return true;
}

function shouldSyncAreaSourceData() {
  return state.showRegionLayer || state.showEewWarningLayer;
}

function syncVisibleAreaSourceData(elapsedSec = getSimulationStationElapsedSec()) {
  if (!shouldSyncAreaSourceData() || !map?.getSource("jma-local-areas") || !localAreaData || !shindoStationData) {
    return false;
  }

  const bucket = toSimulationBucket(elapsedSec);
  if (visibleAreaDataSyncBucket === bucket) {
    return false;
  }

  const nextAreaData =
    document.body.dataset.activeBottomTab === "bottom-history-tab"
      ? buildHistoryLocalAreaMapData(elapsedSec)
      : buildIntensityAreaData(localAreaData, elapsedSec);
  const updated = setGeoJsonSourceData("jma-local-areas", nextAreaData);
  visibleAreaDataSyncBucket = bucket;
  return updated;
}

function addMapLayers() {
  ensureStationCanvasOverlay();

  addLayerIfMissing({
    id: "plate-boundaries",
    type: "line",
    source: "plate-boundaries",
    paint: {
      "line-color": ["case", ["==", ["get", "highlight"], true], "#ffd84a", "#6ccfff"],
      "line-opacity": ["case", ["==", ["get", "highlight"], true], 0.82, 0.68],
      "line-width": ["case", ["==", ["get", "highlight"], true], 1.9, 1.35],
      "line-dasharray": [4.5, 2.2],
    },
  });
  updateLayerVisibility("plate-boundaries", state.showPlateBoundaryLayer);

  addLayerIfMissing({
    id: "surrounding-land-fill",
    type: "fill",
    source: "surrounding-land",
    paint: {
      "fill-antialias": true,
      "fill-color": [
        "case",
        ["==", ["get", "territoryType"], "northern-territories"],
        "#3c3d40",
        "#252a33",
      ],
      "fill-outline-color": [
        "case",
        ["==", ["get", "territoryType"], "northern-territories"],
        "#3c3d40",
        "#252a33",
      ],
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "surrounding-land-gap-fill",
    type: "line",
    source: "surrounding-land",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#252a33",
      "line-opacity": 1,
      "line-width": ["interpolate", ["linear"], ["zoom"], 1, 1.8, 4, 2.5, 7, 1.7, 10, 0.9],
    },
  });

  addLayerIfMissing({
    id: "japan-land-fill",
    type: "fill",
    source: "japan-pmtiles",
    "source-layer": JAPAN_PMTILES_SOURCE_LAYER_PREF,
    paint: {
      "fill-antialias": true,
      "fill-color": "#3c3d40",
      "fill-outline-color": "rgba(60, 61, 64, 0)",
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "japan-land-gap-fill",
    type: "line",
    source: "japan-pmtiles",
    "source-layer": JAPAN_PMTILES_SOURCE_LAYER_PREF,
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#3c3d40",
      "line-opacity": 1,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 2.1, 7, 1.45, 10, 0.8, 12, 0.55],
    },
  });

  addLayerIfMissing({
    id: "municipality-land-fill",
    type: "fill",
    source: "municipality-areas",
    minzoom: 6,
    paint: {
      "fill-antialias": true,
      "fill-color": "#3c3d40",
      "fill-outline-color": "rgba(60, 61, 64, 0)",
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "world-coastline",
    type: "line",
    source: "world-coastline",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#aeb6c2",
      "line-opacity": 0.86,
      "line-width": ["interpolate", ["linear"], ["zoom"], 2, 0.85, 5, 1.25, 8, 1.6, 11, 1.85],
    },
  });

  addLayerIfMissing({
    id: "japan-coastline",
    type: "line",
    source: "japan-coastline",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#cbd3df",
      "line-opacity": 0.92,
      "line-width": ["interpolate", ["linear"], ["zoom"], 2, 0.9, 5, 1.35, 8, 1.75, 11, 2.05],
    },
  });

  addLayerIfMissing({
    id: "active-fault-lines",
    type: "line",
    source: "active-faults",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#ff4d6d",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 4, 0.62, 7, 0.78, 10, 0.92],
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1.15, 7, 1.75, 10, 2.55],
    },
  });
  updateLayerVisibility("active-fault-lines", state.showFaultLayer);

  addLayerIfMissing({
    id: "jma-intensity-fill",
    type: "fill",
    source: "jma-local-areas",
    paint: {
      "fill-color": ["get", "intensityColor"],
      "fill-color-transition": {
        duration: 0,
        delay: 0,
      },
      "fill-opacity": [
        "case",
        ["<=", ["get", "intensityRank"], 0],
        0,
        ["interpolate", ["linear"], ["get", "intensityRank"], 1, 0.54, 2, 0.72, 9, 0.94],
      ],
      "fill-opacity-transition": {
        duration: 0,
        delay: 0,
      },
    },
  });
  updateLayerVisibility("jma-intensity-fill", state.showRegionLayer);

  addLayerIfMissing({
    id: "history-local-area-fill",
    type: "fill",
    source: "jma-local-areas",
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", "historySelected"], true],
        "rgba(38, 217, 255, 0.38)",
        "rgba(255, 255, 255, 0)",
      ],
      "fill-outline-color": "rgba(255, 255, 255, 0)",
      "fill-opacity": [
        "case",
        ["==", ["get", "historySelected"], true],
        1,
        0,
      ],
    },
  });
  updateLayerVisibility("history-local-area-fill", false);

  addLayerIfMissing({
    id: "history-epicenter-area-fill",
    type: "fill",
    source: "history-epicenter-areas",
    paint: {
      "fill-color": "rgba(255, 255, 255, 0)",
      "fill-outline-color": "rgba(255, 255, 255, 0)",
      "fill-opacity": 0,
    },
  });
  updateLayerVisibility("history-epicenter-area-fill", false);

  addLayerIfMissing({
    id: "eew-warning-fill",
    type: "fill",
    source: "jma-local-areas",
    filter: ["==", ["get", "eewWarning"], true],
    paint: {
      "fill-color": ["case", ["==", ["get", "eewBlinkOff"], true], "#3c3d40", "#e60012"],
      "fill-opacity": ["case", ["==", ["get", "eewBlinkOff"], true], 1, 0.94],
    },
  });
  updateLayerVisibility("eew-warning-fill", state.showEewWarningLayer);

  addLayerIfMissing({
    id: "jma-local-area-boundaries",
    type: "line",
    source: "jma-local-area-boundaries",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#dce3ed",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.75, 7, 1.12, 10, 1.42],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 4, 0.66, 7, 0.8, 10, 0.88],
    },
  });

  addLayerIfMissing({
    id: "municipality-boundaries",
    type: "line",
    source: "municipality-boundary-lines",
    minzoom: 8,
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#848a94",
      "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.45, 10, 0.85, 12, 1.15],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0.48, 10, 0.76, 12, 0.92],
    },
  });

  addLayerIfMissing({
    id: "prefecture-boundaries",
    type: "line",
    source: "prefecture-boundaries",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#f7fbff",
      "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1.05, 5, 1.35, 6.5, 1.1, 7.4, 0.55],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 3, 0.64, 5.5, 0.54, 6.6, 0.22, 7.4, 0],
    },
  });

  addLayerIfMissing({
    id: "submarine-observation-fill",
    type: "circle",
    source: "submarine-observation-points",
    paint: {
      "circle-color": "#000000",
      "circle-opacity": 0.001,
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 7.5, 7, 9, 10, 10.5],
      "circle-stroke-opacity": 0,
    },
  });
  updateLayerVisibility("submarine-observation-fill", state.showSubmarineStationLayer);

  addLayerIfMissing({
    id: "shindo-station-points",
    type: "circle",
    source: "shindo-stations",
    paint: {
      "circle-color": "#000000",
      "circle-opacity": 0.001,
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 7.5, 7, 9, 10, 10.5],
      "circle-stroke-opacity": 0,
    },
  });
  updateLayerVisibility("shindo-station-points", state.showStationLayer);

  addLayerIfMissing({
    id: "p-wave-fill",
    type: "fill",
    source: "p-wave",
    paint: {
      "fill-color": "rgba(45, 212, 255, 0.08)",
      "fill-opacity": 0,
    },
  });

  addLayerIfMissing({
    id: "p-wave-line",
    type: "line",
    source: "p-wave",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#7de7ff",
      "line-opacity": 0,
      "line-width": 2.4,
    },
  });

  addLayerIfMissing({
    id: "s-wave-fill",
    type: "fill",
    source: "s-wave",
    paint: {
      "fill-color": "rgba(255, 55, 95, 0.1)",
      "fill-opacity": 0,
    },
  });

  addLayerIfMissing({
    id: "s-wave-line",
    type: "line",
    source: "s-wave",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#ff6b7f",
      "line-opacity": 0,
      "line-width": 3.4,
    },
  });

  keepWaveAndStationLayerOrder();
}

function addLayerIfMissing(layer) {
  if (!map.getLayer(layer.id)) {
    try {
      map.addLayer(layer);
    } catch (error) {
      console.warn(`Layer ${layer.id} could not be added`, error);
    }
  }
}

function moveLayerToTop(layerId) {
  if (map?.getLayer(layerId)) {
    map.moveLayer(layerId);
  }
}

function keepWaveAndStationLayerOrder() {
  moveLayerToTop("municipality-boundaries");
  moveLayerToTop("jma-local-area-boundaries");
  moveLayerToTop("prefecture-boundaries");
  moveLayerToTop("world-coastline");
  moveLayerToTop("japan-coastline");
  moveLayerToTop("active-fault-lines");
  moveLayerToTop("p-wave-fill");
  moveLayerToTop("s-wave-fill");
  moveLayerToTop("submarine-observation-fill");
  moveLayerToTop("shindo-station-points");
  moveLayerToTop("p-wave-line");
  moveLayerToTop("s-wave-line");
}

function updateLayerVisibility(layerId, visible) {
  if (map?.getLayer(layerId)) {
    map.setLayoutProperty(layerId, "visibility", visible ? "visible" : "none");
  }
  if (layerId === "shindo-station-points" || layerId === "submarine-observation-fill") {
    scheduleStationCanvasRender();
  }
}

function ensureStationCanvasOverlay() {
  if (!map || stationCanvasOverlay) {
    return;
  }

  const container = map.getContainer();
  const canvas = document.createElement("canvas");
  canvas.className = "station-canvas-overlay";
  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "420",
  });
  container.appendChild(canvas);
  stationCanvasOverlay = canvas;
  scheduleStationCanvasRender({ force: true });
}

function scheduleStationCanvasRender(options = {}) {
  if (!map || !stationCanvasOverlay || stationCanvasRenderFrame) {
    return;
  }

  stationCanvasRenderFrame = window.requestAnimationFrame(() => {
    stationCanvasRenderFrame = 0;
    renderStationCanvasOverlay();
  });
}

function resizeStationCanvasOverlay() {
  if (!map || !stationCanvasOverlay) {
    return null;
  }

  const container = map.getContainer();
  const width = Math.max(Math.floor(container.clientWidth), 1);
  const height = Math.max(Math.floor(container.clientHeight), 1);
  const pixelRatio = Math.min(window.devicePixelRatio || 1, STATION_CANVAS_PIXEL_RATIO_LIMIT);
  const canvasWidth = Math.ceil(width * pixelRatio);
  const canvasHeight = Math.ceil(height * pixelRatio);
  if (stationCanvasOverlay.width !== canvasWidth || stationCanvasOverlay.height !== canvasHeight) {
    stationCanvasOverlay.width = canvasWidth;
    stationCanvasOverlay.height = canvasHeight;
  }
  stationCanvasOverlay.style.width = `${width}px`;
  stationCanvasOverlay.style.height = `${height}px`;
  const context = stationCanvasOverlay.getContext("2d");
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  return { context, width, height };
}

function renderStationCanvasOverlay() {
  const canvasState = resizeStationCanvasOverlay();
  if (!canvasState) {
    return;
  }

  const { context, width, height } = canvasState;
  context.clearRect(0, 0, width, height);
  if (document.body.dataset.activeBottomTab === "bottom-history-tab") {
    return;
  }

  const features = getStationCanvasFeatures();
  const submarineFeatures = getSubmarineStationCanvasFeatures();
  const zoom = map.getZoom();

  const projectedPWaveRing = getProjectedWaveCanvasRing(waveCanvasRadiusState.p);
  const projectedSWaveRing = getProjectedWaveCanvasRing(waveCanvasRadiusState.s);

  drawProjectedWaveCanvasRadiusFill(context, projectedPWaveRing, "rgba(45, 212, 255, 0.08)");
  drawProjectedWaveCanvasRadiusFill(context, projectedSWaveRing, "rgba(255, 55, 95, 0.1)");

  if ((state.showStationLayer && features.length) || (state.showSubmarineStationLayer && submarineFeatures.length)) {
    const radius = interpolateByZoom(zoom, [
      [4, 8.2],
      [7, 10.2],
      [10, 12.2],
    ]);
    const fontSize = interpolateByZoom(zoom, [
      [4, 10.2],
      [8.8, 12.1],
      [11, 13.2],
    ]);
    const labelFadeStartZoom = STATION_LABEL_ALL_VISIBLE_MIN_ZOOM - 0.18;
    const labelAlpha = smoothStep(clamp((zoom - labelFadeStartZoom) / 0.18, 0, 1));
    const padding = radius + 6;

    if (state.showSubmarineStationLayer) {
      submarineFeatures.forEach((feature) => {
        const coordinates = feature.geometry?.coordinates;
        if (!Array.isArray(coordinates)) {
          return;
        }

        const point = map.project({ lng: coordinates[0], lat: coordinates[1] });
        if (point.x < -padding || point.x > width + padding || point.y < -padding || point.y > height + padding) {
          return;
        }

        const properties = feature.properties ?? {};
        drawSubmarineStationCanvasMarker(context, point.x, point.y, radius, fontSize, labelAlpha, properties);
      });
    }

    if (state.showStationLayer) {
      features.forEach((feature) => {
        const coordinates = feature.geometry?.coordinates;
        if (!Array.isArray(coordinates)) {
          return;
        }

        const point = map.project({ lng: coordinates[0], lat: coordinates[1] });
        if (point.x < -padding || point.x > width + padding || point.y < -padding || point.y > height + padding) {
          return;
        }

        const properties = feature.properties ?? {};
        drawStationCanvasMarker(context, point.x, point.y, radius, fontSize, labelAlpha, properties);
      });
    }
  }

  drawProjectedWaveCanvasRadiusLine(context, projectedPWaveRing, "#7de7ff", 2.4, 0.9);
  drawProjectedWaveCanvasRadiusLine(context, projectedSWaveRing, "#ff6b7f", 3.4, 0.95);
}

function getProjectedWaveCanvasRing(radiusKm) {
  if (!Number.isFinite(radiusKm) || radiusKm <= 0) {
    return null;
  }

  const ring = buildGeodesicCircle(simulationEpicenter, radiusKm);
  if (ring.length < 2) {
    return null;
  }

  return ring.map((coordinate) => map.project({ lng: coordinate[0], lat: coordinate[1] }));
}

function getStationCanvasFeatures() {
  const data = sourceDataRefs.get("shindo-stations");
  if (!data?.features?.length) {
    return [];
  }

  if (stationCanvasFeatureCache.data === data) {
    return stationCanvasFeatureCache.features;
  }

  const features = [...data.features].sort(
    (a, b) => Number(a.properties?.stationDisplaySortKey ?? 0) - Number(b.properties?.stationDisplaySortKey ?? 0),
  );
  stationCanvasFeatureCache = { data, features };
  return features;
}

function getSubmarineStationCanvasFeatures() {
  const data = sourceDataRefs.get("submarine-observation-points");
  if (!data?.features?.length) {
    return [];
  }

  if (submarineStationCanvasFeatureCache.data === data) {
    return submarineStationCanvasFeatureCache.features;
  }

  const features = [...data.features].sort((a, b) =>
    String(a.properties?.displaySortStableKey ?? "").localeCompare(
      String(b.properties?.displaySortStableKey ?? ""),
      "ja",
      { numeric: true },
    ),
  );
  submarineStationCanvasFeatureCache = { data, features };
  return features;
}

function interpolateByZoom(zoom, stops) {
  if (zoom <= stops[0][0]) {
    return stops[0][1];
  }

  for (let index = 1; index < stops.length; index += 1) {
    const [nextZoom, nextValue] = stops[index];
    const [previousZoom, previousValue] = stops[index - 1];
    if (zoom <= nextZoom) {
      const progress = (zoom - previousZoom) / (nextZoom - previousZoom);
      return previousValue + (nextValue - previousValue) * progress;
    }
  }

  return stops[stops.length - 1][1];
}

function drawStationCanvasMarker(context, x, y, radius, fontSize, labelAlpha, properties) {
  const fillColor = properties.intensityColor || "#ffffff";
  const textColor = properties.intensityTextColor || "#111827";
  const intensityRank = Number(properties.intensityRank ?? 0);

  context.save();
  context.shadowColor = "rgba(0, 0, 0, 0.2)";
  context.shadowBlur = 2.5;
  context.shadowOffsetY = 0.6;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = fillColor;
  context.fill();
  context.shadowColor = "transparent";
  context.lineWidth = intensityRank <= 2 ? 1.35 : 1.45;
  context.strokeStyle = intensityRank <= 2 ? "rgba(0, 0, 0, 0.36)" : "rgba(0, 0, 0, 0.30)";
  context.stroke();
  context.restore();

  if (labelAlpha <= 0) {
    return;
  }

  drawStationCanvasLabel(context, x, y, fontSize, labelAlpha, textColor, properties);
}

function drawSubmarineStationCanvasMarker(context, x, y, radius, fontSize, labelAlpha, properties) {
  const intensityRank = Number(properties.intensityRank ?? 0);
  const observed = properties.observed === true;
  const hasRecordedIntensity = observed && intensityRank >= 1;
  const fillColor = hasRecordedIntensity ? properties.intensityColor || "#ffffff" : "rgba(255, 255, 255, 0)";
  const textColor = properties.intensityTextColor || "#111827";

  context.save();
  context.shadowColor = hasRecordedIntensity ? "rgba(0, 0, 0, 0.16)" : "transparent";
  context.shadowBlur = hasRecordedIntensity ? 2.2 : 0;
  context.shadowOffsetY = hasRecordedIntensity ? 0.5 : 0;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = fillColor;
  context.fill();
  context.shadowColor = "transparent";
  context.lineWidth = hasRecordedIntensity ? 1.35 : 1.45;
  context.setLineDash(hasRecordedIntensity ? [2.8, 2.2] : [2.5, 3.2]);
  context.strokeStyle = hasRecordedIntensity ? "rgba(0, 0, 0, 0.32)" : "rgba(0, 0, 0, 0.28)";
  context.stroke();
  context.setLineDash([]);
  context.restore();

  if (!hasRecordedIntensity || labelAlpha <= 0) {
    return;
  }

  drawStationCanvasLabel(context, x, y, fontSize, labelAlpha, textColor, properties);
}

function drawStationCanvasLabel(context, x, y, fontSize, labelAlpha, textColor, properties) {
  context.save();
  context.globalAlpha = labelAlpha;
  context.font = `800 ${fontSize}px "Segoe UI", "Noto Sans", "Arial", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineWidth = 0.65;
  context.strokeStyle = Number(properties.intensityRank ?? 0) <= 2 ? "rgba(255, 255, 255, 0.34)" : "rgba(0, 0, 0, 0.22)";
  context.fillStyle = textColor;
  context.strokeText(String(properties.intensityShortLabel ?? ""), x, y + 0.15);
  context.fillText(String(properties.intensityShortLabel ?? ""), x, y + 0.15);
  context.restore();
}

function drawProjectedWaveCanvasRadiusFill(context, projectedRing, color) {
  if (!projectedRing || projectedRing.length < 3) {
    return;
  }

  context.save();
  context.fillStyle = color;
  context.beginPath();
  projectedRing.forEach((point, index) => {
    if (index === 0) {
      context.moveTo(point.x, point.y);
      return;
    }
    context.lineTo(point.x, point.y);
  });
  context.closePath();
  context.fill();
  context.restore();
}

function fitInitialMapBounds(bounds) {
  if (!bounds) {
    return;
  }

  const initialView = getInitialMapView();
  map.jumpTo({
    center: initialView.center,
    zoom: initialView.zoom,
    padding: getInitialMapPaddingForViewport(),
  });
  updateMapPanConstraints();
}

function getInitialMapView() {
  return isCompactViewport()
    ? { center: MOBILE_INITIAL_CENTER, zoom: MOBILE_INITIAL_ZOOM }
    : { center: INITIAL_CENTER, zoom: INITIAL_ZOOM };
}

function getInitialMapPaddingForViewport() {
  if (isLandscapeSidePanelViewport()) {
    return getLandscapeSidePanelMapPaddingForViewport();
  }

  if (isCompactViewport()) {
    return getCompactMapPaddingForViewport();
  }

  const handleRect = getActiveMenuHandleRect();
  const legendRect = document.querySelector(".intensity-legend")?.getBoundingClientRect();
  const leftEdge = Math.ceil(handleRect?.right ?? els.setupPanel?.getBoundingClientRect()?.right ?? 374);
  const rightEdge = Math.floor(legendRect?.left ?? window.innerWidth);
  return normalizeMapPaddingForViewport({
    top: 0,
    right: Math.max(window.innerWidth - rightEdge, 0),
    bottom: 0,
    left: Math.max(leftEdge, 0),
  });
}

function getLandscapeSidePanelMapPaddingForViewport() {
  const handleRect = getActiveMenuHandleRect();
  const controlsRect = document.querySelector(".maplibregl-ctrl-top-right")?.getBoundingClientRect();
  const leftEdge = Math.ceil(handleRect?.right ?? els.setupPanel?.getBoundingClientRect()?.right ?? 374);
  const rightEdge = Math.floor(controlsRect?.left ?? window.innerWidth);
  return normalizeMapPaddingForViewport({
    top: 0,
    right: Math.max(window.innerWidth - rightEdge, 0),
    bottom: 0,
    left: Math.max(leftEdge, 0),
  });
}

function drawProjectedWaveCanvasRadiusLine(context, projectedRing, color, lineWidth, alpha) {
  if (!projectedRing || projectedRing.length < 2) {
    return;
  }

  context.save();
  context.globalAlpha = alpha;
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  projectedRing.forEach((point, index) => {
    if (index === 0) {
      context.moveTo(point.x, point.y);
      return;
    }
    context.lineTo(point.x, point.y);
  });
  context.stroke();
  context.restore();
}

function getCompactMapPaddingForViewport() {
  const mapRect = document.querySelector("#map")?.getBoundingClientRect();
  const panelRect = getActiveBottomSheetRect();
  if (!mapRect || !panelRect) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  const coveredHeight = Math.max(mapRect.bottom - Math.max(panelRect.top, mapRect.top), 0);
  return normalizeMapPaddingForViewport({
    top: 0,
    right: 0,
    bottom: coveredHeight,
    left: 0,
  });
}

function normalizeMapPaddingForViewport(padding) {
  const container = document.querySelector("#map");
  const rect = container?.getBoundingClientRect();
  const width = Math.max(Math.floor(rect?.width ?? window.innerWidth ?? 0), 0);
  const height = Math.max(Math.floor(rect?.height ?? window.innerHeight ?? 0), 0);
  if (width < 1 || height < 1) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  const safePadding = {
    top: Math.max(Number(padding.top) || 0, 0),
    right: Math.max(Number(padding.right) || 0, 0),
    bottom: Math.max(Number(padding.bottom) || 0, 0),
    left: Math.max(Number(padding.left) || 0, 0),
  };
  const minimumVisibleWidth = Math.min(96, Math.max(Math.floor(width * 0.25), 1));
  const minimumVisibleHeight = Math.min(96, Math.max(Math.floor(height * 0.25), 1));
  const maxHorizontalPadding = Math.max(width - minimumVisibleWidth, 0);
  const maxVerticalPadding = Math.max(height - minimumVisibleHeight, 0);
  const horizontalPadding = safePadding.left + safePadding.right;
  const verticalPadding = safePadding.top + safePadding.bottom;

  if (horizontalPadding > maxHorizontalPadding && horizontalPadding > 0) {
    const scale = maxHorizontalPadding / horizontalPadding;
    safePadding.left *= scale;
    safePadding.right *= scale;
  }

  if (verticalPadding > maxVerticalPadding && verticalPadding > 0) {
    const scale = maxVerticalPadding / verticalPadding;
    safePadding.top *= scale;
    safePadding.bottom *= scale;
  }

  return {
    top: Math.round(safePadding.top),
    right: Math.round(safePadding.right),
    bottom: Math.round(safePadding.bottom),
    left: Math.round(safePadding.left),
  };
}

function resetMapViewToInitial() {
  if (!map) {
    return Promise.resolve();
  }

  const initialView = getInitialMapView();
  return animateMapViewTo({
    center: initialView.center,
    zoom: initialView.zoom,
    padding: getInitialMapPaddingForViewport(),
    duration: RESET_VIEW_ANIMATION_MS,
    easing: smoothResetMapEasing,
  });
}

function alignMapToSimulationEpicenter() {
  if (!map) {
    return Promise.resolve();
  }

  return animateMapViewTo({
    center: [state.longitude, state.latitude],
    zoom: Math.max(map.getZoom(), 6),
    padding: getInitialMapPaddingForViewport(),
    duration: 650,
    easing: smoothResetMapEasing,
  });
}

function getActiveMenuHandleRect() {
  const panels = [els.setupPanel, els.simulationPanel].filter(Boolean);
  const activePanel = panels.find((panel) => !panel.classList.contains("hidden")) ?? els.setupPanel;
  return activePanel?.querySelector(".sheet-handle")?.getBoundingClientRect() ?? null;
}

function getActiveBottomSheetRect() {
  const panels = [els.setupPanel, els.simulationPanel].filter(Boolean);
  const activePanel = panels.find((panel) => !panel.classList.contains("hidden")) ?? els.setupPanel;
  return activePanel?.getBoundingClientRect() ?? null;
}

function animateMapViewTo(options) {
  if (!map) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      window.clearTimeout(timeoutId);
      map.off("moveend", finish);
      resolve();
    };
    const duration = options.duration ?? RESET_VIEW_ANIMATION_MS;
    const timeoutId = window.setTimeout(finish, duration + 500);
    map.once("moveend", finish);
    map.easeTo({
      ...options,
      duration,
      essential: true,
    });
  });
}

function smoothResetMapEasing(time) {
  return time * time * time * (time * (time * 6 - 15) + 10);
}

function getInitialJapanBounds() {
  return [
    [122, 23],
    [153, 46],
  ];
}

function scheduleLocationResolve(options = {}) {
  window.clearTimeout(locationResolveTimer);
  locationResolveTimer = window.setTimeout(async () => {
    const skipStartupIntensityUpdate = document.body.classList.contains("map-core-loading");
    await updateEpicenter({
      resolveLocation: true,
      enforceManagedArea: true,
      skipIntensityUpdate: skipStartupIntensityUpdate,
      ...options,
    });
    if (document.body.classList.contains("map-core-loading")) {
      startupLocationResolved = true;
      scheduleStartupReadyAfterIntensityPaint();
    }
  }, 180);
}

function updateEpicenterEditMode() {
  state.epicenterEditEnabled = state.simulationRunning ? false : els.epicenterEditToggle.checked;

  if (map) {
    map.getCanvas().classList.toggle("epicenter-edit-enabled", state.epicenterEditEnabled);
  }

  els.epicenterEditToggle.checked = state.epicenterEditEnabled;
  els.epicenterEditToggle.disabled = state.simulationRunning;

  if (epicenterMarker) {
    epicenterMarker.setDraggable(state.epicenterEditEnabled);
    epicenterMarker.getElement().classList.toggle("locked", !state.epicenterEditEnabled);
  }

  if (state.epicenterEditEnabled) {
    closeEpicenterInfoPopups();
  }
}

function updateDisplayMode() {
  state.showStationLayer = els.stationLayerToggle.checked;
  state.showSubmarineStationLayer = Boolean(els.submarineStationLayerToggle?.checked);
  if (getSelectedPreset()) {
    state.showSubmarineStationLayer = false;
    if (els.submarineStationLayerToggle) {
      els.submarineStationLayerToggle.checked = false;
    }
  }
  state.showRegionLayer = els.regionLayerToggle.checked;
  state.showEewWarningLayer = els.eewWarningToggle.checked;
  state.showPlateBoundaryLayer = Boolean(els.plateBoundaryLayerToggle?.checked);
  state.showFaultLayer = Boolean(els.faultLayerToggle?.checked);
  els.simulationStationLayerToggle.checked = state.showStationLayer;
  if (els.simulationSubmarineStationLayerToggle) {
    els.simulationSubmarineStationLayerToggle.checked = state.showSubmarineStationLayer;
  }
  els.simulationRegionLayerToggle.checked = state.showRegionLayer;
  els.simulationEewWarningToggle.checked = state.showEewWarningLayer;
  if (els.simulationPlateBoundaryLayerToggle) {
    els.simulationPlateBoundaryLayerToggle.checked = state.showPlateBoundaryLayer;
  }
  if (els.simulationFaultLayerToggle) {
    els.simulationFaultLayerToggle.checked = state.showFaultLayer;
  }
  updateLayerVisibility("shindo-station-points", state.showStationLayer);
  updateSubmarineObservationLayerVisibility();
  updateLayerVisibility("jma-intensity-fill", state.showRegionLayer);
  updateLayerVisibility("eew-warning-fill", state.showEewWarningLayer);
  updatePlateBoundaryLayerVisibility();
  updateFaultLayerVisibility();
  if (shouldSyncAreaSourceData()) {
    visibleAreaDataSyncBucket = null;
    syncVisibleAreaSourceData(getSimulationStationElapsedSec());
  }
  if (state.showStationLayer && map?.getSource("shindo-stations")) {
    setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(getSimulationStationElapsedSec()));
    keepWaveAndStationLayerOrder();
  }
  updateEewReplacementMode();
  updateEewForecastPanel();
}

function updateSubmarineObservationToggleAvailability() {
  const disabled = Boolean(getSelectedPreset());
  if (disabled) {
    state.showSubmarineStationLayer = false;
  }

  [els.submarineStationLayerToggle, els.simulationSubmarineStationLayerToggle].forEach((toggle) => {
    if (!toggle) {
      return;
    }
    toggle.disabled = disabled;
    toggle.closest(".toggle-row")?.classList.toggle("is-disabled", disabled);
    if (disabled) {
      toggle.checked = false;
    }
  });

  if (disabled) {
    updateLayerVisibility("submarine-observation-fill", false);
  }
}

function updateSubmarineObservationLayerVisibility() {
  updateSubmarineObservationToggleAvailability();
  if (!state.showSubmarineStationLayer || !map?.getSource("submarine-observation-points")) {
    setGeoJsonSourceData("submarine-observation-points", emptyFeatureCollection());
    updateLayerVisibility("submarine-observation-fill", false);
    return;
  }

  loadSubmarineObservationPoints()
    .then((points) => {
      if (!state.showSubmarineStationLayer || !map?.getSource("submarine-observation-points")) {
        return;
      }
      setSubmarineObservationSourceForElapsed(getSubmarineObservationElapsedSec(), points);
      keepWaveAndStationLayerOrder();
    })
    .catch((error) => {
      console.warn(error);
      state.showSubmarineStationLayer = false;
      if (els.submarineStationLayerToggle) {
        els.submarineStationLayerToggle.checked = false;
      }
      if (els.simulationSubmarineStationLayerToggle) {
        els.simulationSubmarineStationLayerToggle.checked = false;
      }
      updateLayerVisibility("submarine-observation-fill", false);
    });
}

function setSubmarineObservationSourceForElapsed(elapsedSec, data = submarineObservationPointData) {
  if (!map?.getSource("submarine-observation-points")) {
    return emptyFeatureCollection();
  }

  const nextData = getSubmarineObservationDataForElapsed(elapsedSec, data);
  setGeoJsonSourceData("submarine-observation-points", nextData);
  const hasObservedFeatures = state.showSubmarineStationLayer && nextData.features.length > 0;
  updateLayerVisibility("submarine-observation-fill", hasObservedFeatures);
  if (!hasObservedFeatures) {
    closeInactiveStationPopups();
  }
  return nextData;
}

function closeInactiveStationPopups() {
  const submarineData = sourceDataRefs.get("submarine-observation-points");
  const visibleIds = new Set((submarineData?.features ?? []).map((feature) => String(feature.properties?.id ?? "")));

  if (isSubmarineFeatureId(hoveredStationFeatureId) && !visibleIds.has(hoveredStationFeatureId)) {
    hoveredStationFeatureId = null;
    hoveredStationLngLat = null;
    stationPopup?.remove();
  }

  if (isSubmarineFeatureId(clickedStationFeatureId) && !visibleIds.has(clickedStationFeatureId)) {
    clickedStationFeatureId = null;
    stationClickPopup?.remove();
  }
}

function isSubmarineFeatureId(featureId) {
  return String(featureId ?? "").startsWith("submarine-");
}

function updateFaultLayerVisibility() {
  updateLayerVisibility("active-fault-lines", state.showFaultLayer);
  if (!state.showFaultLayer || !map?.getSource("active-faults")) {
    return;
  }

  loadActiveFaultSegments()
    .then((faults) => {
      if (!state.showFaultLayer || !map?.getSource("active-faults")) {
        return;
      }
      setGeoJsonSourceData("active-faults", faults);
      updateLayerVisibility("active-fault-lines", true);
      keepWaveAndStationLayerOrder();
    })
    .catch((error) => {
      console.warn(error);
      state.showFaultLayer = false;
      if (els.faultLayerToggle) {
        els.faultLayerToggle.checked = false;
      }
      if (els.simulationFaultLayerToggle) {
        els.simulationFaultLayerToggle.checked = false;
      }
      updateLayerVisibility("active-fault-lines", false);
    });
}

function updatePlateBoundaryLayerVisibility() {
  updateLayerVisibility("plate-boundaries", state.showPlateBoundaryLayer);
}

function syncSimulationLayerToggles() {
  state.showStationLayer = els.simulationStationLayerToggle.checked;
  state.showSubmarineStationLayer = Boolean(els.simulationSubmarineStationLayerToggle?.checked);
  state.showRegionLayer = els.simulationRegionLayerToggle.checked;
  state.showEewWarningLayer = els.simulationEewWarningToggle.checked;
  state.showPlateBoundaryLayer = Boolean(els.simulationPlateBoundaryLayerToggle?.checked);
  state.showFaultLayer = Boolean(els.simulationFaultLayerToggle?.checked);
  els.stationLayerToggle.checked = state.showStationLayer;
  if (els.submarineStationLayerToggle) {
    els.submarineStationLayerToggle.checked = state.showSubmarineStationLayer;
  }
  els.regionLayerToggle.checked = state.showRegionLayer;
  els.eewWarningToggle.checked = state.showEewWarningLayer;
  if (els.plateBoundaryLayerToggle) {
    els.plateBoundaryLayerToggle.checked = state.showPlateBoundaryLayer;
  }
  if (els.faultLayerToggle) {
    els.faultLayerToggle.checked = state.showFaultLayer;
  }
  updateDisplayMode();
}

function updateEewReplacementMode() {
  if (!map?.getLayer("jma-intensity-fill")) {
    return;
  }

  const replaceWithWarning = state.showRegionLayer && state.showEewWarningLayer;
  map.setFilter(
    "jma-intensity-fill",
    replaceWithWarning ? ["!", ["==", ["get", "eewWarning"], true]] : null,
  );
}

function setupStationHoverPopup() {
  if (stationHoverEventsBound) {
    return;
  }

  stationHoverEventsBound = true;
  stationPopup = new maplibregl.Popup({
    anchor: "bottom",
    closeButton: false,
    closeOnClick: false,
    className: "station-popup",
    offset: 10,
  });
  stationClickPopup = new maplibregl.Popup({
    anchor: "bottom",
    closeButton: true,
    closeOnClick: false,
    className: "station-popup",
    offset: 14,
  });
  stationClickPopup.on("close", () => {
    clickedStationFeatureId = null;
  });

  ["shindo-station-points", "submarine-observation-fill"].forEach((layerId) => {
    bindStationPopupLayer(layerId);
  });
}

function bindStationPopupLayer(layerId) {
  map.on("mouseenter", layerId, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mousemove", layerId, (event) => {
    const feature = event.features?.[0];
    if (!feature) {
      return;
    }
    if (!isStationFeatureInteractive(feature.properties)) {
      stationPopup.remove();
      return;
    }

    hoveredStationFeatureId = String(feature.properties?.id ?? "");
    if (clickedStationFeatureId && clickedStationFeatureId === hoveredStationFeatureId) {
      stationPopup.remove();
      return;
    }
    hoveredStationLngLat = event.lngLat;
    stationPopup
      .setLngLat(event.lngLat)
      .setHTML(stationPopupHtml(feature.properties))
      .addTo(map);
  });

  map.on("click", layerId, (event) => {
    const feature = event.features?.[0];
    if (!feature) {
      return;
    }
    if (!isStationFeatureInteractive(feature.properties)) {
      return;
    }

    event.preventDefault();
    event.originalEvent?.stopPropagation?.();
    const nextClickedStationFeatureId = String(feature.properties?.id ?? "");
    if (nextClickedStationFeatureId === hoveredStationFeatureId) {
      stationPopup.remove();
    }
    stationClickPopup
      .setLngLat(event.lngLat)
      .setHTML(stationPopupHtml(feature.properties))
      .addTo(map);
    clickedStationFeatureId = nextClickedStationFeatureId;
  });

  map.on("mouseleave", layerId, () => {
    map.getCanvas().style.cursor = "";
    hoveredStationFeatureId = null;
    hoveredStationLngLat = null;
    stationPopup.remove();
  });
}

function isStationFeatureInteractive(properties = {}) {
  if (!properties.submarineObservation) {
    return true;
  }

  return properties.observed === true && Number(properties.intensityRank ?? 0) >= 1;
}

function updateActiveStationPopups(data = sourceDataRefs.get("shindo-stations")) {
  if (!data?.features?.length) {
    return;
  }

  if (hoveredStationFeatureId && stationPopup?.isOpen?.()) {
    const properties = findStationFeaturePropertiesById(hoveredStationFeatureId, data);
    if (properties) {
      if (clickedStationFeatureId && clickedStationFeatureId === hoveredStationFeatureId) {
        stationPopup.remove();
        return;
      }
      if (hoveredStationLngLat) {
        stationPopup.setLngLat(hoveredStationLngLat);
      }
      stationPopup.setHTML(stationPopupHtml(properties));
    }
  }

  if (clickedStationFeatureId && stationClickPopup?.isOpen?.()) {
    const properties = findStationFeaturePropertiesById(clickedStationFeatureId, data);
    if (properties) {
      stationClickPopup.setHTML(stationPopupHtml(properties));
    }
  }
}

function findStationFeaturePropertiesById(featureId, data = sourceDataRefs.get("shindo-stations")) {
  if (!featureId || !data?.features?.length) {
    const submarineData = sourceDataRefs.get("submarine-observation-points");
    return submarineData?.features?.find((feature) => String(feature.properties?.id ?? "") === String(featureId))
      ?.properties ?? null;
  }

  return (
    data.features.find((feature) => String(feature.properties?.id ?? "") === String(featureId))?.properties ??
    findStationFeaturePropertiesById(featureId, null)
  );
}

function stationPopupHtml(properties) {
  const unobservedSubmarine = properties.submarineObservation && !properties.observed;
  const currentValue = Number(properties.currentIntensityValue ?? properties.intensityValue ?? 0);
  const submarineCurrentUnavailable =
    properties.submarineObservation && (!properties.observed || currentValue <= 0);
  const waveLabel =
    unobservedSubmarine
      ? "未観測"
      : properties.waveState === "p"
        ? `P波到達 / S波 ${Number(properties.sArrivalSec).toFixed(1)}秒`
        : submarineCurrentUnavailable
          ? "震度 -"
          : `震度${properties.intensityLabel}`;
  const predictedValue = Number(properties.predictedIntensityValue ?? 0);
  const hideSubmarinePredictedIntensity = properties.submarineObservation && predictedValue <= 0;
  const currentMeasured =
    submarineCurrentUnavailable ? "-" : formatMeasuredIntensity(properties, currentValue);
  const predictedMeasured =
    hideSubmarinePredictedIntensity ? "-" : formatMeasuredIntensity(properties, predictedValue);
  const currentIntensityLabel =
    submarineCurrentUnavailable ? "-" : (properties.intensityLabel ?? "0");
  const predictedIntensityLabel =
    hideSubmarinePredictedIntensity ? "-" : (properties.predictedIntensityLabel ?? "0");
  const submarineDepth = properties.submarineObservation
    ? `<span>水深 ${Number.isFinite(Number(properties.depthM)) ? `${Number(properties.depthM).toFixed(0)} m` : "-"}</span>`
    : "";

  return [
    `<strong>${escapeHtml(properties.name)}</strong>`,
    `<span>${escapeHtml(properties.areaName ?? "")}</span>`,
    `<span>${escapeHtml(properties.observationStatus ?? "")}</span>`,
    submarineDepth,
    `<span>${escapeHtml(waveLabel)}</span>`,
    `<span>現在震度 ${escapeHtml(currentIntensityLabel)}（計測震度 ${currentMeasured}）</span>`,
    `<span>最大震度 ${escapeHtml(predictedIntensityLabel)}（計測震度 ${predictedMeasured}）</span>`,
    `<span>震央距離 ${Number(properties.epicentralDistanceKm ?? 0).toFixed(0)} km</span>`,
    `<span>P波 ${Number(properties.pArrivalSec ?? 0).toFixed(1)}秒 / S波 ${Number(properties.sArrivalSec ?? 0).toFixed(1)}秒</span>`,
  ].join("");
}

function formatMeasuredIntensity(properties, fallbackValue) {
  if (properties.actualObserved && properties.measuredIntensity == null) {
    return "-";
  }

  const value = Number(properties.measuredIntensity ?? fallbackValue);
  if (properties.submarineObservation && value <= 0) {
    return "-";
  }

  const displayValue = clamp(value, 0, 6.7);
  return Number.isFinite(displayValue) ? displayValue.toFixed(1) : "-";
}

function getMeasuredIntensityListSuffix(properties, fallbackValue) {
  if (properties.actualObserved && properties.measuredIntensity == null) {
    return "";
  }

  const measuredIntensity = formatMeasuredIntensity(properties, fallbackValue);
  return measuredIntensity === "-" ? "" : `（計測震度 ${measuredIntensity}）`;
}

async function toggleCurrentLocationLink() {
  const requestId = (currentLocationRequestId += 1);

  if (!els.currentLocationToggle?.checked) {
    state.currentLocationEnabled = false;
    state.currentLocation = null;
    state.currentLocationName = "-";
    state.currentLocationStatus = "idle";
    removeCurrentLocationMarker();
    updateCurrentLocationForecast(getSimulationStationElapsedSec());
    return;
  }

  state.currentLocationEnabled = false;
  state.currentLocation = null;
  state.currentLocationName = "位置情報を取得中...";
  state.currentLocationStatus = "loading";
  removeCurrentLocationMarker();
  updateCurrentLocationForecast(getSimulationStationElapsedSec());

  let position;
  try {
    position = await requestCurrentPosition();
  } catch (error) {
    if (requestId !== currentLocationRequestId) {
      return;
    }
    console.warn(error);
    state.currentLocationEnabled = false;
    state.currentLocation = null;
    state.currentLocationName = "位置情報の取得に失敗しました。再度お試しください。";
    state.currentLocationStatus = "error";
    els.currentLocationToggle.checked = false;
    removeCurrentLocationMarker();
    updateCurrentLocationForecast(getSimulationStationElapsedSec());
    return;
  }

  if (requestId !== currentLocationRequestId || !els.currentLocationToggle?.checked) {
    return;
  }

  const latitude = Number(position.coords?.latitude);
  const longitude = Number(position.coords?.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    console.warn("Geolocation returned invalid coordinates.", position);
    state.currentLocationEnabled = false;
    state.currentLocation = null;
    state.currentLocationName = "位置情報の取得に失敗しました。再度お試しください。";
    state.currentLocationStatus = "error";
    els.currentLocationToggle.checked = false;
    removeCurrentLocationMarker();
    updateCurrentLocationForecast(getSimulationStationElapsedSec());
    return;
  }

  state.currentLocationEnabled = true;
  state.currentLocation = {
    latitude: Number(latitude.toFixed(5)),
    longitude: Number(longitude.toFixed(5)),
  };
  state.currentLocationName = "位置情報を取得中...";
  state.currentLocationStatus = "loading";
  updateCurrentLocationForecast(getSimulationStationElapsedSec());
  const resolvedLocationName = await resolveMunicipalityNameAt(
    state.currentLocation.longitude,
    state.currentLocation.latitude,
  );
  if (requestId !== currentLocationRequestId || !els.currentLocationToggle?.checked) {
    return;
  }
  state.currentLocationName = resolvedLocationName;
  state.currentLocationStatus = "ready";
  updateCurrentLocationMarker();
  updateCurrentLocationForecast(getSimulationStationElapsedSec());
}

function clearCurrentLocationLink(options = {}) {
  currentLocationRequestId += 1;
  state.currentLocationEnabled = false;
  state.currentLocation = null;
  state.currentLocationName = "-";
  state.currentLocationStatus = "idle";
  if (els.currentLocationToggle) {
    els.currentLocationToggle.checked = false;
  }
  removeCurrentLocationMarker();
  if (options.updateForecast !== false) {
    updateCurrentLocationForecast(getSimulationStationElapsedSec());
  }
}

function requestCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not available."));
      return;
    }

    let settled = false;
    let watchIds = [];
    let settleTimer = null;
    let timeoutTimer = null;
    let bestPosition = null;
    let lastError = null;
    const isIpad = isIpadLikeDevice();
    const maxWaitMs = isIpad ? GEOLOCATION_IPAD_MAX_WAIT_MS : GEOLOCATION_MAX_WAIT_MS;
    const acceptableAccuracy = isIpad ? GEOLOCATION_IPAD_ACCEPTABLE_ACCURACY_M : GEOLOCATION_ACCEPTABLE_ACCURACY_M;

    const clearTimers = () => {
      watchIds.forEach((id) => navigator.geolocation.clearWatch(id));
      watchIds = [];
      clearTimeout(settleTimer);
      clearTimeout(timeoutTimer);
    };

    const finish = (position) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimers();
      resolve(position);
    };

    const fail = (error) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimers();
      reject(error);
    };

    const scheduleBestEffortFinish = () => {
      if (settleTimer || !bestPosition) {
        return;
      }

      settleTimer = setTimeout(() => {
        if (bestPosition) {
          finish(bestPosition);
        }
      }, GEOLOCATION_FAST_SETTLE_MS);
    };

    const onPosition = (position) => {
      if (!isUsableGeolocationPosition(position)) {
        return;
      }

      if (!bestPosition || getGeolocationAccuracy(position) < getGeolocationAccuracy(bestPosition)) {
        bestPosition = position;
      }

      const accuracy = getGeolocationAccuracy(bestPosition);
      if (accuracy <= GEOLOCATION_TARGET_ACCURACY_M) {
        finish(bestPosition);
        return;
      }

      if (accuracy <= acceptableAccuracy) {
        scheduleBestEffortFinish();
      }
    };

    const onError = (error) => {
      lastError = error;
      if (error?.code === 1 || error?.code === error?.PERMISSION_DENIED) {
        fail(error);
        return;
      }

      if (bestPosition) {
        scheduleBestEffortFinish();
      }
    };

    timeoutTimer = setTimeout(() => {
      if (bestPosition) {
        finish(bestPosition);
        return;
      }

      fail(lastError ?? new Error("Geolocation timed out."));
    }, maxWaitMs);

    const highAccuracyOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: maxWaitMs,
    };
    const cachedOptions = {
      enableHighAccuracy: false,
      maximumAge: isIpad ? GEOLOCATION_IPAD_CACHED_MAX_AGE_MS : GEOLOCATION_CACHED_MAX_AGE_MS,
      timeout: Math.min(isIpad ? 9000 : 5000, maxWaitMs),
    };

    navigator.geolocation.getCurrentPosition(onPosition, onError, cachedOptions);
    if (isIpad) {
      navigator.geolocation.getCurrentPosition(onPosition, onError, {
        enableHighAccuracy: false,
        maximumAge: GEOLOCATION_IPAD_CACHED_MAX_AGE_MS,
        timeout: Math.min(14000, maxWaitMs),
      });
    }
    watchIds.push(navigator.geolocation.watchPosition(onPosition, onError, highAccuracyOptions));
    if (isIpad) {
      watchIds.push(navigator.geolocation.watchPosition(onPosition, onError, {
        enableHighAccuracy: false,
        maximumAge: GEOLOCATION_IPAD_CACHED_MAX_AGE_MS,
        timeout: maxWaitMs,
      }));
    }
  });
}

function isIpadLikeDevice() {
  const userAgent = navigator.userAgent || "";
  return (
    /iPad/.test(userAgent) ||
    (navigator.platform === "MacIntel" && Number(navigator.maxTouchPoints || 0) > 1)
  );
}

function isUsableGeolocationPosition(position) {
  const latitude = Number(position?.coords?.latitude);
  const longitude = Number(position?.coords?.longitude);
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function getGeolocationAccuracy(position) {
  const accuracy = Number(position?.coords?.accuracy);
  return Number.isFinite(accuracy) && accuracy >= 0 ? accuracy : Infinity;
}

async function resolveMunicipalityNameAt(longitude, latitude) {
  try {
    const municipality = await findMunicipalityAtPoint(longitude, latitude);
    const properties = municipality?.properties ?? {};
    const municipalityName = cleanDisplayAreaName(
      properties.city || properties.municipality || properties.name || "",
    );
    if (!municipality || isExcludedTerritoryName(municipalityName)) {
      return "-";
    }
    const prefecture = cleanDisplayAreaName(properties.pref || properties.prefecture || "");
    if (!municipalityName) {
      return "-";
    }
    return prefecture && !municipalityName.startsWith(prefecture)
      ? `${prefecture}${municipalityName}`
      : municipalityName;
  } catch (error) {
    console.warn(error);
    return "-";
  }
}

function updateCurrentLocationMarker() {
  if (!map || !state.simulationRunning || !state.currentLocationEnabled || !state.currentLocation) {
    removeCurrentLocationMarker();
    return;
  }

  const lngLat = [state.currentLocation.longitude, state.currentLocation.latitude];
  if (!Number.isFinite(lngLat[0]) || !Number.isFinite(lngLat[1])) {
    removeCurrentLocationMarker();
    return;
  }

  try {
    if (!currentLocationMarker) {
      const markerElement = document.createElement("span");
      markerElement.className = "current-location-marker";
      currentLocationMarker = new maplibregl.Marker({
        element: markerElement,
        anchor: "bottom",
      })
        .setLngLat(lngLat)
        .addTo(map);
      return;
    }

    currentLocationMarker.setLngLat(lngLat);
  } catch (error) {
    console.warn("Current location marker could not be updated.", error);
    removeCurrentLocationMarker();
  }
}

function removeCurrentLocationMarker() {
  currentLocationMarker?.remove();
  currentLocationMarker = null;
}

function updateCurrentLocationForecast(elapsedSec = 0) {
  if (!els.currentLocationName || !els.currentLocationIntensity || !els.currentLocationArrival) {
    return;
  }

  if (state.currentLocationStatus === "loading") {
    setTextContentIfChanged(els.currentLocationName, state.currentLocationName || "位置情報を取得中...");
    setTextContentIfChanged(els.currentLocationIntensity, "計算中");
    setTextContentIfChanged(els.currentLocationArrival, "計算中");
    return;
  }

  if (state.currentLocationStatus === "error") {
    setTextContentIfChanged(
      els.currentLocationName,
      state.currentLocationName || "位置情報の取得に失敗しました。再度お試しください。",
    );
    setTextContentIfChanged(els.currentLocationIntensity, "-");
    setTextContentIfChanged(els.currentLocationArrival, "-");
    return;
  }

  if (!state.currentLocationEnabled || !state.currentLocation) {
    setTextContentIfChanged(els.currentLocationName, "-");
    setTextContentIfChanged(els.currentLocationIntensity, "-");
    setTextContentIfChanged(els.currentLocationArrival, "-");
    return;
  }

  setTextContentIfChanged(els.currentLocationName, state.currentLocationName || "-");

  const forecast = getCurrentLocationForecast();
  if (!forecast) {
    setTextContentIfChanged(els.currentLocationIntensity, "計算中");
    setTextContentIfChanged(els.currentLocationArrival, "計算中");
    return;
  }

  if (forecast.intensityClass.rank < 1) {
    setTextContentIfChanged(els.currentLocationIntensity, "該当なし");
    setTextContentIfChanged(els.currentLocationArrival, "該当なし");
    return;
  }

  const elapsed = Number.isFinite(elapsedSec) ? elapsedSec : 0;
  const remainingSec = Math.max(forecast.pArrivalSec - elapsed, 0);
  setTextContentIfChanged(els.currentLocationIntensity, forecast.intensityClass.label);
  setTextContentIfChanged(els.currentLocationArrival, `${remainingSec.toFixed(3)}秒`);
}

function getCurrentLocationForecast() {
  if (!state.currentLocation) {
    return null;
  }

  const cacheKey = [
    state.longitude.toFixed(4),
    state.latitude.toFixed(4),
    state.depthKm.toFixed(1),
    state.magnitude.toFixed(1),
    state.currentLocation.longitude.toFixed(5),
    state.currentLocation.latitude.toFixed(5),
    state.selectedPresetId,
  ].join("|");
  if (currentLocationForecastCache?.key === cacheKey) {
    return currentLocationForecastCache.forecast;
  }

  const epicentralDistanceKm = haversineKilometers(
    [state.longitude, state.latitude],
    [state.currentLocation.longitude, state.currentLocation.latitude],
  );
  const intensityValue = estimateIntensityAtPoint(
    state.currentLocation.longitude,
    state.currentLocation.latitude,
    epicentralDistanceKm,
  );
  const intensityClass = toJmaIntensityClass(intensityValue);
  const pWaveArrivalSec = epicentralDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec;

  const forecast = {
    intensityValue,
    intensityClass,
    pArrivalSec: pWaveArrivalSec,
  };
  currentLocationForecastCache = { key: cacheKey, forecast };
  return forecast;
}

async function startSimulation() {
  if (els.simulationStart.disabled) {
    return;
  }

  resetViewAnimating = true;
  updateSimulationAvailability();
  try {
    await alignMapToSimulationEpicenter();
  } finally {
    resetViewAnimating = false;
  }

  simulationPreviousEpicenterEditEnabled = state.epicenterEditEnabled;
  simulationEpicenter = [state.longitude, state.latitude];
  state.eewWarningReportNumber = null;
  state.eewWarningFinalReport = false;
  state.eewReportAreaKeySignature = "";
  state.eewSyntheticReportNumber = 0;
  state.eewFirstReportElapsedSec = null;
  state.eewIssuedWarningKeys = new Set();
  state.eewWarningBlinkStartedAt = {};
  state.eewInitialWarningKeys = new Set();
  state.eewPreviousWarningKeys = new Set();
  resetSpeechAnnouncementState();
  resetWaveRenderCache();
  simulationCompleteAtSec = getSimulationCompleteAtSec();
  stationSummaryCache = { data: null, summary: null };
  eewForecastPanelRenderSignature = "";
  simulationRenderBucket = -1;
  simulationStationRenderBucket = -1;
  maxStationListRenderBucket = null;
  maxStationListRenderSignature = "";
  cancelPendingMaxStationListRender();
  simulationTimeTextCache = "";
  state.simulationRunning = true;
  state.simulationPaused = false;
  state.simulationCompleted = false;
  delete els.simulationPanel.dataset.simulationComplete;
  state.epicenterEditEnabled = false;
  els.epicenterEditToggle.checked = false;
  state.showStationLayer = els.stationLayerToggle.checked;
  state.showSubmarineStationLayer = Boolean(els.submarineStationLayerToggle?.checked);
  state.showRegionLayer = els.regionLayerToggle.checked;
  state.showEewWarningLayer = els.eewWarningToggle.checked;
  state.showPlateBoundaryLayer = Boolean(els.plateBoundaryLayerToggle?.checked);
  state.showFaultLayer = Boolean(els.faultLayerToggle?.checked);
  els.simulationStationLayerToggle.checked = state.showStationLayer;
  if (els.simulationSubmarineStationLayerToggle) {
    els.simulationSubmarineStationLayerToggle.checked = state.showSubmarineStationLayer;
  }
  els.simulationRegionLayerToggle.checked = state.showRegionLayer;
  els.simulationEewWarningToggle.checked = state.showEewWarningLayer;
  if (els.simulationPlateBoundaryLayerToggle) {
    els.simulationPlateBoundaryLayerToggle.checked = state.showPlateBoundaryLayer;
  }
  if (els.simulationFaultLayerToggle) {
    els.simulationFaultLayerToggle.checked = state.showFaultLayer;
  }
  updateEpicenterEditMode();
  simulationStartedAt = performance.now();
  simulationPausedAt = null;
  updateIntensityLayer();
  updateLayerVisibility("shindo-station-points", state.showStationLayer);
  updateSubmarineObservationLayerVisibility();
  updateLayerVisibility("jma-intensity-fill", state.showRegionLayer);
  updateLayerVisibility("eew-warning-fill", state.showEewWarningLayer);
  updatePlateBoundaryLayerVisibility();
  updateFaultLayerVisibility();
  updateEewReplacementMode();
  updateEewForecastPanel();
  updateSimulationSummary(0);
  if (!state.speechMuted) {
    scheduleSimulationSpeechStart();
  }
  updateCurrentLocationMarker();
  if (els.simulationPause) {
    els.simulationPause.textContent = "一時停止";
    els.simulationPause.disabled = false;
  }
  if (els.simulationStop) {
    els.simulationStop.textContent = "シミュレーション中止";
  }
  els.simulationStart.textContent = "シミュレーション中止";
  els.setupPanel.classList.remove("hidden");
  els.simulationPanel.classList.add("hidden");
  activateSettingsTab("result");
  setSetupMenuOpen(true);
  updateSettingsMenuButtonVisibility();
  setSheetState(els.setupPanel, "open");
  cancelAnimationFrame(simulationFrame);
  tickSimulation(simulationStartedAt);
}

function stopSimulation() {
  cancelSpeechAnnouncements();
  state.simulationRunning = false;
  state.simulationPaused = false;
  state.simulationCompleted = false;
  state.eewWarningReportNumber = null;
  state.eewWarningFinalReport = false;
  state.eewReportAreaKeySignature = "";
  state.eewSyntheticReportNumber = 0;
  state.eewFirstReportElapsedSec = null;
  state.eewIssuedWarningKeys = new Set();
  state.eewWarningBlinkStartedAt = {};
  state.eewInitialWarningKeys = new Set();
  state.eewPreviousWarningKeys = new Set();
  cancelAnimationFrame(simulationFrame);
  simulationFrame = null;
  simulationStartedAt = null;
  simulationCompleteAtSec = null;
  simulationPausedAt = null;
  simulationRenderBucket = -1;
  simulationStationRenderBucket = -1;
  maxStationListRenderBucket = null;
  simulationTimeTextCache = "";
  state.epicenterEditEnabled = simulationPreviousEpicenterEditEnabled;
  els.epicenterEditToggle.checked = state.epicenterEditEnabled;
  updateEpicenterEditMode();
  els.simulationStart.textContent = "シミュレーション開始";
  delete els.simulationPanel.dataset.simulationComplete;
  if (els.simulationPause) {
    els.simulationPause.textContent = "一時停止";
    els.simulationPause.disabled = true;
  }
  if (els.simulationStop) {
    els.simulationStop.textContent = "シミュレーション中止";
  }
  els.setupPanel.classList.remove("hidden");
  els.simulationPanel.classList.add("hidden");
  activateSettingsTab("primary");
  setSetupMenuOpen(false);
  updateSettingsMenuButtonVisibility();
  clearCurrentLocationLink();
  resetWaveRenderCache();
  setWaveRadiusData(0, 0);
  updateIntensityLayer();
  updateSimulationAvailability();
}

function toggleSimulationPause() {
  if (!state.simulationRunning || !simulationStartedAt) {
    return;
  }

  if (state.simulationPaused) {
    resumeSimulationFromPause();
    return;
  }

  pauseSimulation();
}

function pauseSimulationWhenAppHidden() {
  if (document.visibilityState === "visible") {
    return;
  }

  pauseSimulation();
}

function pauseSimulation() {
  if (!state.simulationRunning || state.simulationPaused || !simulationStartedAt) {
    return false;
  }

  state.simulationPaused = true;
  simulationPausedAt = performance.now();
  cancelAnimationFrame(simulationFrame);
  simulationFrame = null;
  pauseSpeechAnnouncements();
  if (els.simulationPause) {
    els.simulationPause.textContent = "再開";
  }
  return true;
}

function resumeSimulationFromPause() {
  if (!state.simulationRunning || !state.simulationPaused || !simulationStartedAt || !simulationPausedAt) {
    return false;
  }

  const pauseDuration = performance.now() - simulationPausedAt;
  simulationStartedAt += pauseDuration;
  simulationPausedAt = null;
  state.simulationPaused = false;
  if (els.simulationPause) {
    els.simulationPause.textContent = "一時停止";
  }
  resumeSpeechAnnouncements();
  simulationFrame = requestAnimationFrame(tickSimulation);
  return true;
}

function tickSimulation(now) {
  if (!state.simulationRunning || state.simulationPaused) {
    return;
  }

  const elapsedSec = getSimulationElapsedSec(now);
  const { pRadiusKm, sRadiusKm } = getWaveSurfaceRadiiForElapsed(elapsedSec);
  const currentBucket = toSimulationBucket(elapsedSec);

  setWaveRadiusData(pRadiusKm, sRadiusKm);
  const nextSimulationTimeText = `${elapsedSec.toFixed(1)} 秒`;
  if (nextSimulationTimeText !== simulationTimeTextCache) {
    els.simulationTime.textContent = nextSimulationTimeText;
    simulationTimeTextCache = nextSimulationTimeText;
  }

  if (currentBucket !== simulationStationRenderBucket) {
    simulationStationRenderBucket = currentBucket;
    if (state.showStationLayer && map?.getSource("shindo-stations") && shindoStationData) {
      setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(elapsedSec));
    }
    if (
      state.showSubmarineStationLayer &&
      !getSelectedPreset() &&
      map?.getSource("submarine-observation-points") &&
      submarineObservationPointData
    ) {
      setSubmarineObservationSourceForElapsed(elapsedSec);
    }
  }

  if (currentBucket !== simulationRenderBucket) {
    simulationRenderBucket = currentBucket;

    syncVisibleAreaSourceData(elapsedSec);

    updateSimulationSummary(elapsedSec);
  }

  if (isSimulationComplete(elapsedSec)) {
    state.simulationRunning = false;
    state.simulationPaused = false;
    state.simulationCompleted = true;
    state.eewWarningFinalReport = state.eewWarningReportNumber != null;
    resetSpeechAnnouncementState();
    finishSpeechAnnouncementsGracefully();
    simulationFrame = null;
    simulationCompleteAtSec = null;
    simulationPausedAt = null;
    maxStationListRenderBucket = null;
    maxStationListRenderSignature = "";
    maxStationListItemCache.clear();
    maxStationListEmptyItem = null;
    cancelPendingMaxStationListRender();
    clearCurrentLocationLink({ updateForecast: false });
    resetWaveRenderCache();
    setWaveRadiusData(0, 0);
    visibleAreaDataSyncBucket = null;
    syncVisibleAreaSourceData(Infinity);
    updateSimulationSummary(Infinity);
    state.epicenterEditEnabled = simulationPreviousEpicenterEditEnabled;
    els.epicenterEditToggle.checked = state.epicenterEditEnabled;
    updateEpicenterEditMode();
    els.simulationStart.textContent = "シミュレーション開始";
    els.simulationPanel.dataset.simulationComplete = "true";
    if (els.simulationPause) {
      els.simulationPause.textContent = "再度実行";
      els.simulationPause.disabled = false;
    }
    if (els.simulationStop) {
      els.simulationStop.textContent = "シミュレーション終了";
    }
    updateSimulationAvailability();
    return;
  }

  simulationFrame = requestAnimationFrame(tickSimulation);
}

function getSimulationElapsedSec(now = performance.now()) {
  const currentTime = state.simulationPaused && simulationPausedAt ? simulationPausedAt : now;
  return simulationStartedAt ? Math.max((currentTime - simulationStartedAt) / 1000, 0) : 0;
}

function getWaveSurfaceRadiiForElapsed(elapsedSec) {
  const pRadiusKm = getWaveSurfaceRadiusKm(elapsedSec, EARTHQUAKE_MODEL.pWaveVelocityKmPerSec);
  const rawSRadiusKm = getWaveSurfaceRadiusKm(elapsedSec, EARTHQUAKE_MODEL.sWaveVelocityKmPerSec);
  const sRadiusKm = pRadiusKm > 0 ? Math.min(rawSRadiusKm, Math.max(pRadiusKm - 0.01, 0)) : 0;
  return { pRadiusKm, sRadiusKm };
}

function getWaveSurfaceRadiusKm(elapsedSec, velocityKmPerSec) {
  if (!Number.isFinite(elapsedSec) || elapsedSec <= 0) {
    return 0;
  }

  return elapsedSec * velocityKmPerSec;
}

function toSimulationBucket(elapsedSec) {
  return Number.isFinite(elapsedSec) ? Math.max(Math.floor(elapsedSec * SIMULATION_DATA_UPDATE_HZ), 0) : Infinity;
}

function updateSimulationSummary(elapsedSec = getSimulationStationElapsedSec()) {
  const { stationFeatures, maxRank } = getObservedStationSummaryForElapsed(elapsedSec);
  const maxClass = INTENSITY_CLASSES.find((item) => item.rank === maxRank) ?? INTENSITY_CLASSES[0];
  const hasObservedIntensity = stationFeatures.length > 0;

  setTextContentIfChanged(
    els.simulationMaxIntensity,
    state.simulationRunning && Number.isFinite(elapsedSec) && !hasObservedIntensity ? "-" : maxClass.label,
  );
  setTextContentIfChanged(els.simulationMagnitude, state.magnitude.toFixed(1));
  setTextContentIfChanged(els.simulationEpicenter, `${state.latitude.toFixed(3)}, ${state.longitude.toFixed(3)}`);
  setTextContentIfChanged(els.simulationRegionName, state.epicenterName);
  setTextContentIfChanged(els.simulationDepth, formatDepth(state.depthKm));
  setTextContentIfChanged(els.maxIntensityOutput, formatSetupMaxIntensityLabel(state.maxIntensityLabel));
  updateCurrentLocationForecast(elapsedSec);
  updateMaxStationList(stationFeatures, elapsedSec);
  announceSimulationUpdates(elapsedSec);
}

function getObservedStationSummaryForElapsed(elapsedSec) {
  if (!shindoStationData) {
    return { stationFeatures: [], maxRank: 0, maxValue: 0 };
  }

  const data = getStationIntensityDataForElapsed(elapsedSec);
  if (stationSummaryCache.data === data && stationSummaryCache.summary) {
    return stationSummaryCache.summary;
  }

  const stationFeatures = getObservedStationFeaturesFromData(data);
  let maxRank = 0;
  stationFeatures.forEach((feature) => {
    maxRank = Math.max(maxRank, feature.properties.intensityRank);
  });

  const summary = { stationFeatures, maxRank };
  stationSummaryCache = { data, summary };
  return summary;
}

function getObservedStationFeaturesForElapsed(elapsedSec) {
  return getObservedStationFeaturesFromData(getStationIntensityDataForElapsed(elapsedSec));
}

function getObservedStationFeaturesFromData(data) {
  if (observedStationFeatureCache.data === data) {
    return observedStationFeatureCache.features;
  }

  const features = data.features.filter(
    (feature) => feature.properties.observed && feature.properties.intensityRank > 0,
  );
  observedStationFeatureCache = { data, features };
  return features;
}

function setTextContentIfChanged(element, value) {
  if (!element) {
    return;
  }

  const text = String(value ?? "");
  if (element.textContent !== text) {
    element.textContent = text;
  }
}

function updateMaxStationList(stationFeatures, elapsedSec) {
  const listBucket = Number.isFinite(elapsedSec) ? Math.floor(elapsedSec) : Infinity;
  if (maxStationListRenderBucket === listBucket) {
    return;
  }

  maxStationListRenderBucket = listBucket;
  pendingMaxStationListRender = { stationFeatures: stationFeatures.slice() };
  scheduleMaxStationListRender();
}

function buildMaxStationListSignature(observedStations) {
  if (observedStations.length === 0) {
    return "empty";
  }

  return observedStations
    .map((feature) => {
      const properties = feature.properties;
      return [
        properties.id,
        properties.name,
        properties.intensityLabel,
        getMeasuredIntensityListSuffix(properties, properties.currentIntensityValue),
      ].join(":");
    })
    .join("|");
}

function scheduleMaxStationListRender() {
  if (maxStationListRenderHandle) {
    return;
  }

  const render = () => {
    maxStationListRenderHandle = 0;
    maxStationListRenderHandleType = "";
    renderPendingMaxStationList();
  };

  if ("requestIdleCallback" in window) {
    maxStationListRenderHandleType = "idle";
    maxStationListRenderHandle = window.requestIdleCallback(render);
    return;
  }

  maxStationListRenderHandleType = "timeout";
  maxStationListRenderHandle = window.setTimeout(render, 0);
}

function cancelPendingMaxStationListRender() {
  if (!maxStationListRenderHandle) {
    pendingMaxStationListRender = null;
    return;
  }

  if (maxStationListRenderHandleType === "idle" && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(maxStationListRenderHandle);
  } else {
    window.clearTimeout(maxStationListRenderHandle);
  }

  maxStationListRenderHandle = 0;
  maxStationListRenderHandleType = "";
  pendingMaxStationListRender = null;
}

function renderPendingMaxStationList() {
  const renderState = pendingMaxStationListRender;
  if (!renderState) {
    return;
  }

  pendingMaxStationListRender = null;
  const observedStations = renderState.stationFeatures.sort(
    (a, b) => b.properties.currentIntensityValue - a.properties.currentIntensityValue,
  );
  const signature = buildMaxStationListSignature(observedStations);
  if (signature === maxStationListRenderSignature) {
    return;
  }

  maxStationListRenderSignature = signature;
  renderMaxStationListItems(observedStations);
}

function renderMaxStationListItems(observedStations) {
  if (observedStations.length === 0) {
    maxStationListItemCache.clear();
    if (!maxStationListEmptyItem) {
      maxStationListEmptyItem = document.createElement("li");
    }
    maxStationListEmptyItem.textContent = "震度1以上の観測点はありません";
    els.maxStationList.replaceChildren(maxStationListEmptyItem);
    return;
  }

  const nextItemKeys = new Set();
  const items = observedStations.map((feature, index) => {
    const properties = feature.properties;
    const itemKey = String(properties.id ?? `${properties.name ?? "station"}:${index}`);
    nextItemKeys.add(itemKey);

    let item = maxStationListItemCache.get(itemKey);
    if (!item) {
      item = document.createElement("li");
      maxStationListItemCache.set(itemKey, item);
    }

    const rank = String(index + 1);
    if (item.dataset.rank !== rank) {
      item.dataset.rank = rank;
    }

    const measuredIntensityText = getMeasuredIntensityListSuffix(
      properties,
      properties.currentIntensityValue,
    );
    const text = `${properties.name}　震度${properties.intensityLabel}${measuredIntensityText}`;
    if (item.textContent !== text) {
      item.textContent = text;
    }
    return item;
  });

  maxStationListItemCache.forEach((_, itemKey) => {
    if (!nextItemKeys.has(itemKey)) {
      maxStationListItemCache.delete(itemKey);
    }
  });
  maxStationListEmptyItem = null;
  // Keep existing nodes attached whenever their order has not changed. Replacing
  // the entire list caused a layout/paint spike at the one-second update cadence.
  items.forEach((item, index) => {
    const currentItem = els.maxStationList.children[index] ?? null;
    if (currentItem !== item) {
      els.maxStationList.insertBefore(item, currentItem);
    }
  });
  while (els.maxStationList.children.length > items.length) {
    els.maxStationList.lastElementChild?.remove();
  }
}

function isSimulationComplete(elapsedSec) {
  if (!Number.isFinite(simulationCompleteAtSec)) {
    return false;
  }

  return elapsedSec >= simulationCompleteAtSec;
}

function getSimulationCompleteAtSec() {
  if (!shindoStationData) {
    return Infinity;
  }

  const observedStations = buildStationIntensityFeatures(shindoStationData).filter(
    (feature) => feature.properties.predictedIntensityRank >= 1,
  );
  if (observedStations.length === 0) {
    if (isOldJmaScaleSyntheticPreset(getSelectedPreset())) {
      return Infinity;
    }
    return SIMULATION_END_GRACE_SEC;
  }

  const latestEndSec = observedStations.reduce(
    (latest, feature) => Math.max(latest, Number(feature.properties.intensityCompleteSec) || 0),
    0,
  );
  return latestEndSec + SIMULATION_END_GRACE_SEC;
}

function setWaveRadiusData(pRadiusKm, sRadiusKm) {
  const pSource = map?.getSource("p-wave");
  const sSource = map?.getSource("s-wave");
  const nextP = getRenderableWaveRadius(pRadiusKm);
  const nextS = getRenderableWaveRadius(sRadiusKm);

  waveCanvasRadiusState = {
    p: Number.isFinite(pRadiusKm) ? Math.max(pRadiusKm, 0) : 0,
    s: Number.isFinite(sRadiusKm) ? Math.max(sRadiusKm, 0) : 0,
  };
  scheduleStationCanvasRender();

  if (pSource && nextP !== waveRenderRadiusCache.p) {
    setGeoJsonSourceData("p-wave", wavePolygonFeatureCollection(nextP));
    waveRenderRadiusCache.p = nextP;
  }

  if (sSource && nextS !== waveRenderRadiusCache.s) {
    setGeoJsonSourceData("s-wave", wavePolygonFeatureCollection(nextS));
    waveRenderRadiusCache.s = nextS;
  }
}

function getRenderableWaveRadius(radiusKm) {
  if (!Number.isFinite(radiusKm) || radiusKm <= 0) {
    return 0;
  }

  return Math.round(radiusKm / WAVE_RENDER_RADIUS_STEP_KM) * WAVE_RENDER_RADIUS_STEP_KM;
}

function resetWaveRenderCache() {
  waveRenderRadiusCache = { p: null, s: null };
  waveCanvasRadiusState = { p: 0, s: 0 };
}

function wavePolygonFeatureCollection(radiusKm) {
  if (!Number.isFinite(radiusKm) || radiusKm <= 0) {
    return emptyFeatureCollection();
  }

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          radiusKm: Number(radiusKm.toFixed(2)),
        },
        geometry: {
          type: "Polygon",
          coordinates: [buildGeodesicCircle(simulationEpicenter, radiusKm)],
        },
      },
    ],
  };
}

function buildGeodesicCircle(center, radiusKm, steps = WAVE_CIRCLE_STEPS) {
  const coordinates = new Array(steps + 1);
  const [longitude, latitude] = center;
  const angularDistance = radiusKm / EARTH_RADIUS_KM;
  const lat1 = toRadians(latitude);
  const lon1 = toRadians(longitude);
  const sinLat1 = Math.sin(lat1);
  const cosLat1 = Math.cos(lat1);
  const sinAngularDistance = Math.sin(angularDistance);
  const cosAngularDistance = Math.cos(angularDistance);
  const bearings = getWaveCircleBearings(steps);

  for (let index = 0; index <= steps; index += 1) {
    const { sin, cos } = bearings[index];
    const lat2 = Math.asin(
      sinLat1 * cosAngularDistance + cosLat1 * sinAngularDistance * cos,
    );
    const lon2 =
      lon1 +
      Math.atan2(
        sin * sinAngularDistance * cosLat1,
        cosAngularDistance - sinLat1 * Math.sin(lat2),
      );
    coordinates[index] = [normalizeLongitude(toDegrees(lon2)), toDegrees(lat2)];
  }

  return coordinates;
}

function getWaveCircleBearings(steps) {
  if (waveCircleBearingCache.has(steps)) {
    return waveCircleBearingCache.get(steps);
  }

  const bearings = Array.from({ length: steps + 1 }, (_, index) => {
    const bearing = toRadians((index / steps) * 360);
    return {
      sin: Math.sin(bearing),
      cos: Math.cos(bearing),
    };
  });
  waveCircleBearingCache.set(steps, bearings);
  return bearings;
}

function normalizeLongitude(longitude) {
  if (!Number.isFinite(longitude)) {
    return longitude;
  }

  return ((longitude + 540) % 360) - 180;
}

function updateMapPanConstraints() {
  if (!map) {
    return;
  }

  const minZoom = Math.max(BASE_MAP_MIN_ZOOM, getViewportContainedMinZoom());
  if (Number.isFinite(minZoom)) {
    map.setMinZoom(minZoom);
    if (map.getZoom() < minZoom) {
      map.jumpTo({ zoom: minZoom });
    }
  }

  constrainMapToPanRange();
}

function getViewportContainedMinZoom() {
  const rect = map?.getContainer()?.getBoundingClientRect();
  if (!rect?.width || !rect?.height) {
    return BASE_MAP_MIN_ZOOM;
  }

  const [[west, south], [east, north]] = MAP_PAN_BOUNDS;
  const longitudeSpan = Math.max(east - west, 0.001);
  const mercatorSpan = Math.max(mercatorY(south) - mercatorY(north), 0.001);
  const worldSizeForWidth = (rect.width * 360) / longitudeSpan;
  const worldSizeForHeight = rect.height / mercatorSpan;
  return Math.log2(Math.max(worldSizeForWidth, worldSizeForHeight) / MAP_CONSTRAINT_TILE_SIZE) + 0.02;
}

function mercatorY(latitude) {
  const clampedLatitude = clamp(latitude, -85.05112878, 85.05112878);
  const sine = Math.sin(toRadians(clampedLatitude));
  return 0.5 - Math.log((1 + sine) / (1 - sine)) / (4 * Math.PI);
}

function latitudeFromMercatorY(y) {
  return toDegrees(Math.atan(Math.sinh(Math.PI * (1 - 2 * y))));
}

function getMapConstraintViewport(rect) {
  const padding = typeof map?.getPadding === "function"
    ? map.getPadding()
    : { top: 0, right: 0, bottom: 0, left: 0 };
  const safePadding = {
    top: clamp(Number(padding.top) || 0, 0, rect.height),
    right: clamp(Number(padding.right) || 0, 0, rect.width),
    bottom: clamp(Number(padding.bottom) || 0, 0, rect.height),
    left: clamp(Number(padding.left) || 0, 0, rect.width),
  };

  return {
    centerX: (safePadding.left + rect.width - safePadding.right) / 2,
    centerY: (safePadding.top + rect.height - safePadding.bottom) / 2,
    width: rect.width,
    height: rect.height,
  };
}

function constrainMapToPanRange() {
  if (!map || mapPanConstraintApplying) {
    return;
  }

  const center = map.getCenter();
  const [constrainedLongitude, constrainedLatitude] = getViewportConstrainedMapCenter(center);

  if (
    Math.abs(normalizeLongitude(center.lng - constrainedLongitude)) < 0.000001 &&
    Math.abs(center.lat - constrainedLatitude) < 0.000001
  ) {
    return;
  }

  mapPanConstraintApplying = true;
  map.jumpTo({
    center: [constrainedLongitude, constrainedLatitude],
  });
  mapPanConstraintApplying = false;
}

function getViewportConstrainedMapCenter(center) {
  const rect = map?.getContainer()?.getBoundingClientRect();
  const [[west, south], [east, north]] = MAP_PAN_BOUNDS;
  if (!rect?.width || !rect?.height) {
    return [clamp(center.lng, west, east), clamp(center.lat, south, north)];
  }

  const worldSize = MAP_CONSTRAINT_TILE_SIZE * 2 ** map.getZoom();
  const viewport = getMapConstraintViewport(rect);
  const longitudePerPixel = 360 / worldSize;
  const minLongitude = west + viewport.centerX * longitudePerPixel;
  const maxLongitude = east - (viewport.width - viewport.centerX) * longitudePerPixel;
  const constrainedLongitude = minLongitude <= maxLongitude
    ? clamp(center.lng, minLongitude, maxLongitude)
    : (minLongitude + maxLongitude) / 2;

  const northY = mercatorY(north);
  const southY = mercatorY(south);
  const minCenterY = northY + viewport.centerY / worldSize;
  const maxCenterY = southY - (viewport.height - viewport.centerY) / worldSize;
  const centerY = mercatorY(center.lat);
  const constrainedY = minCenterY <= maxCenterY
    ? clamp(centerY, minCenterY, maxCenterY)
    : (northY + southY) / 2;

  return [constrainedLongitude, latitudeFromMercatorY(constrainedY)];
}

function emptyFeatureCollection() {
  return {
    type: "FeatureCollection",
    features: [],
  };
}

function emptyStationData() {
  return {
    source: "",
    updated: "",
    stations: [],
  };
}

function buildPolygonBoundaryLinework(geojson) {
  const lines = [];
  for (const feature of geojson?.features ?? []) {
    const geometry = feature.geometry;
    if (geometry?.type === "Polygon") {
      lines.push(...geometry.coordinates);
    } else if (geometry?.type === "MultiPolygon") {
      geometry.coordinates.forEach((polygon) => lines.push(...polygon));
    }
  }

  return {
    type: "FeatureCollection",
    features: lines.length
      ? [
          {
            type: "Feature",
            properties: {
              kind: "generated-outline",
            },
            geometry: {
              type: "MultiLineString",
              coordinates: lines,
            },
          },
        ]
      : [],
  };
}

async function findMunicipalityAtPoint(longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return null;
  }

  try {
    const municipalities = municipalityDisplayData ?? await loadMunicipalityBoundaries();
    return findFeatureAtPoint(municipalities, longitude, latitude) ?? null;
  } catch (error) {
    console.warn("Municipality lookup unavailable", error);
    return null;
  }
}

async function loadLocalAreas() {
  if (localAreaData) {
    return localAreaData;
  }

  if (!localAreaLoadPromise) {
    localAreaLoadPromise = fetchJson(JMA_LOCAL_AREAS_URL, "JMA local area GeoJSON");
  }

  localAreaData = filterExcludedGeoJsonFeatures(await localAreaLoadPromise);
  return localAreaData;
}

async function loadEewForecastAreas() {
  if (eewForecastAreaData) {
    return eewForecastAreaData;
  }

  if (!eewForecastAreaLoadPromise) {
    eewForecastAreaLoadPromise = fetchJson(JMA_EEW_FORECAST_AREAS_URL, "JMA EEW forecast area mapping");
  }

  eewForecastAreaData = await eewForecastAreaLoadPromise;
  return eewForecastAreaData;
}

async function loadEpicenterAreas() {
  if (epicenterAreaData) {
    return epicenterAreaData;
  }

  if (!epicenterAreaLoadPromise) {
    epicenterAreaLoadPromise = fetchJson(JMA_EPICENTER_AREAS_URL, "JMA epicenter area GeoJSON");
  }

  epicenterAreaData = await epicenterAreaLoadPromise;
  return epicenterAreaData;
}

async function loadPlateBoundaries() {
  if (plateBoundaryData) {
    return plateBoundaryData;
  }

  if (!plateBoundaryLoadPromise) {
    plateBoundaryLoadPromise = fetchJson(PLATE_BOUNDARIES_URL, "Plate boundary GeoJSON");
  }

  plateBoundaryData = await plateBoundaryLoadPromise;
  return plateBoundaryData;
}

async function loadActiveFaultSegments() {
  if (activeFaultData) {
    return activeFaultData;
  }

  if (!activeFaultLoadPromise) {
    activeFaultLoadPromise = fetchJson(ACTIVE_FAULT_SEGMENTS_URL, "Active fault segment GeoJSON");
  }

  activeFaultData = await activeFaultLoadPromise;
  return activeFaultData;
}

async function loadSubmarineObservationPoints() {
  if (submarineObservationPointData) {
    return submarineObservationPointData;
  }

  if (!submarineObservationPointLoadPromise) {
    submarineObservationPointLoadPromise = fetchJson(
      SUBMARINE_OBSERVATION_POINTS_URL,
      "Submarine observation point GeoJSON",
    );
  }

  submarineObservationPointData = await submarineObservationPointLoadPromise;
  return submarineObservationPointData;
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

async function loadWorldCoastline() {
  if (worldCoastlineData) {
    return worldCoastlineData;
  }

  if (!worldCoastlineLoadPromise) {
    worldCoastlineLoadPromise = fetchJson(WORLD_COASTLINE_URL, "World coastline GeoJSON");
  }

  worldCoastlineData = await worldCoastlineLoadPromise;
  return worldCoastlineData;
}

async function loadJapanCoastline() {
  if (japanCoastlineData) {
    return japanCoastlineData;
  }

  if (!japanCoastlineLoadPromise) {
    japanCoastlineLoadPromise = fetchJson(JAPAN_COASTLINE_LINES_URL, "Japan coastline GeoJSON");
  }

  japanCoastlineData = await japanCoastlineLoadPromise;
  return japanCoastlineData;
}

async function loadPrefectureBoundaryLines() {
  if (prefectureBoundaryLineData) {
    return prefectureBoundaryLineData;
  }

  if (!prefectureBoundaryLineLoadPromise) {
    prefectureBoundaryLineLoadPromise = fetchJson(PREFECTURE_BOUNDARY_LINES_URL, "Prefecture boundary line GeoJSON");
  }

  prefectureBoundaryLineData = await prefectureBoundaryLineLoadPromise;
  return prefectureBoundaryLineData;
}

async function loadMunicipalityBoundaries() {
  if (municipalityBoundaryData) {
    return municipalityBoundaryData;
  }

  if (!municipalityBoundaryLoadPromise) {
    municipalityBoundaryLoadPromise = fetchJson(MUNICIPALITY_BOUNDARIES_URL, "Municipality boundary GeoJSON");
  }

  municipalityBoundaryData = await municipalityBoundaryLoadPromise;
  municipalityDisplayData = municipalityBoundaryData;
  return municipalityBoundaryData;
}

async function loadMunicipalityBoundaryLines() {
  if (municipalityBoundaryLineData) {
    return municipalityBoundaryLineData;
  }

  if (!municipalityBoundaryLineLoadPromise) {
    municipalityBoundaryLineLoadPromise = fetchJson(MUNICIPALITY_BOUNDARY_LINES_URL, "Municipality boundary line GeoJSON");
  }

  municipalityBoundaryLineData = await municipalityBoundaryLineLoadPromise;
  return municipalityBoundaryLineData;
}

async function loadJmaLocalAreaBoundaryLines() {
  if (jmaLocalAreaBoundaryLineData) {
    return jmaLocalAreaBoundaryLineData;
  }

  if (!jmaLocalAreaBoundaryLineLoadPromise) {
    jmaLocalAreaBoundaryLineLoadPromise = fetchJson(
      JMA_LOCAL_AREA_BOUNDARY_LINES_URL,
      "JMA local area boundary line GeoJSON"
    );
  }

  jmaLocalAreaBoundaryLineData = await jmaLocalAreaBoundaryLineLoadPromise;
  return jmaLocalAreaBoundaryLineData;
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

function removeWorldJapanOverlapLinework(geojson) {
  return {
    ...geojson,
    features: (geojson.features ?? []).flatMap((feature) => {
      const geometry = feature.geometry;
      if (!geometry?.coordinates) {
        return [];
      }

      if (geometry.type === "LineString") {
        return buildLineFeatureSegments(
          feature,
          getLineSegmentsOutsidePredicate(geometry.coordinates, shouldSuppressWorldJapanCoastlineCoordinate),
        );
      }

      if (geometry.type === "MultiLineString") {
        const coordinates = geometry.coordinates.flatMap((line) =>
          getLineSegmentsOutsidePredicate(line, shouldSuppressWorldJapanCoastlineCoordinate),
        );
        return buildLineFeatureSegments(feature, coordinates);
      }

      return [feature];
    }),
  };
}

function getLineSegmentsOutsidePredicate(line, shouldRemoveCoordinate) {
  if (!Array.isArray(line) || line.length === 0) {
    return [];
  }

  const segments = [];
  let current = [];
  for (const coordinate of line) {
    if (shouldRemoveCoordinate(coordinate)) {
      if (current.length >= 2) {
        segments.push(current);
      }
      current = [];
      continue;
    }

    current.push(coordinate);
  }

  if (current.length >= 2) {
    segments.push(current);
  }

  return segments;
}

function buildLineFeatureSegments(feature, segments) {
  if (!Array.isArray(segments) || segments.length === 0) {
    return [];
  }

  return [{
    ...feature,
    geometry: segments.length === 1
      ? {
          type: "LineString",
          coordinates: segments[0],
        }
      : {
          type: "MultiLineString",
          coordinates: segments,
        },
  }];
}

function shouldSuppressWorldJapanCoordinate(point) {
  return JAPAN_WORLD_MAP_SUPPRESS_BOUNDS.some((bounds) => pointInBounds(point, bounds));
}

function shouldSuppressWorldJapanCoastlineCoordinate(point) {
  return JAPAN_WORLD_COASTLINE_SUPPRESS_BOUNDS.some((bounds) => pointInBounds(point, bounds));
}

function updateStateFromInputs(options = {}) {
  if (!validateCoordinateInput(els.latitude, { report: true }) || !validateCoordinateInput(els.longitude, { report: true })) {
    return;
  }

  if (isPendingDecimalInput(els.latitude.value) || isPendingDecimalInput(els.longitude.value)) {
    return;
  }

  const nextLatitude = parseClampedInput(els.latitude.value, state.latitude, -85, 90);
  const nextLongitude = parseClampedInput(els.longitude.value, state.longitude, 0, 360);
  const nextDepthKm = clamp(Number(els.depth.value), 0, 700);
  const nextMagnitude = parseClampedInput(els.magnitude.value, state.magnitude, 0.1, 10);
  const epicenterMoved =
    Math.abs(nextLatitude - state.latitude) > 0.0001 ||
    Math.abs(nextLongitude - state.longitude) > 0.0001;
  const sourceParametersChanged =
    epicenterMoved ||
    Math.abs(nextDepthKm - state.depthKm) > 0.0001 ||
    Math.abs(nextMagnitude - state.magnitude) > 0.0001;

  if (!sourceParametersChanged && !options.resolveLocation) {
    syncInputs();
    return;
  }

  state.latitude = nextLatitude;
  state.longitude = nextLongitude;
  state.depthKm = nextDepthKm;
  state.magnitude = nextMagnitude;
  if (!options.preservePreset && sourceParametersChanged) {
    clearSelectedPreset();
  }
  invalidateIntensityEstimateCache();
  updateEpicenter({ skipIntensityUpdate: true });
  scheduleDeferredEpicenterUpdate({
    resolveLocation: Boolean(options.resolveLocation),
    enforceManagedArea: Boolean(options.enforceManagedArea),
  });

  if (state.simulationRunning) {
    updateSimulationSummary();
    const elapsedSec = getSimulationElapsedSec();
    const { pRadiusKm, sRadiusKm } = getWaveSurfaceRadiiForElapsed(elapsedSec);
    setWaveRadiusData(pRadiusKm, sRadiusKm);
  }
}

function validateCoordinateInput(input, options = {}) {
  const value = input.value.trim();
  const valid = value === "" || value === "." || value === "-" || /^-?\d+(\.\d*)?$/.test(value);
  input.setCustomValidity(valid ? "" : "数字、小数点、負号だけで入力してください");

  if (!valid && options.report) {
    input.reportValidity();
  }

  return valid;
}

function isPendingDecimalInput(value) {
  const trimmed = value.trim();
  return trimmed === "" || trimmed === "." || trimmed === "-";
}

function parseClampedInput(value, fallback, min, max) {
  if (value === "" || value === "." || value === "-") {
    return fallback;
  }

  const number = Number(value);
  return Number.isFinite(number) ? clamp(number, min, max) : fallback;
}

function invalidateIntensityEstimateCache() {
  stationIntensityFeatureCache = null;
  submarineObservationFeatureCache = { key: "", data: null, features: [] };
  submarineObservationIntensityCache = { key: "", features: [] };
  predictedMaximumCache = null;
  presetObservationLookupCache = null;
  hyogoNanbuSyntheticStationCache = null;
  currentLocationForecastCache = null;
  simulationCompleteAtSec = null;
  stationSummaryCache = { data: null, summary: null };
  observedStationFeatureCache = { data: null, features: [] };
  eewForecastPanelRenderSignature = "";
  if (!state.simulationRunning) {
    state.eewWarningFinalReport = false;
  }
  stationDataCache = { key: "", data: null };
  areaDataCache = { key: "", data: null };
  visibleAreaDataSyncBucket = null;
  areaEpicentralDistanceCache = { key: "", distances: [] };
  localAreaStationSnapshotCache = null;
  stationCanvasFeatureCache = { data: null, features: [] };
  submarineStationCanvasFeatureCache = { data: null, features: [] };
    simulationRenderBucket = -1;
    simulationStationRenderBucket = -1;
    maxStationListRenderBucket = null;
    maxStationListRenderSignature = "";
    maxStationListItemCache.clear();
    maxStationListEmptyItem = null;
    cancelPendingMaxStationListRender();
  }

function syncInputs() {
  if (els.magnitude && els.magnitude.options.length === 0) {
    renderMagnitudeOptions();
  }

  if (document.activeElement !== els.latitude) {
    els.latitude.value = state.latitude.toFixed(3);
  }
  if (document.activeElement !== els.longitude) {
    els.longitude.value = state.longitude.toFixed(3);
  }
  ensureDepthOption(state.depthKm);
  els.depth.value = String(state.depthKm);
  els.magnitude.value = state.magnitude.toFixed(1);
  if (els.intensityColorScheme) {
    els.intensityColorScheme.value = state.intensityColorScheme;
  }
  els.epicenterRegion.value = state.epicenterName;
  updateSetupResultOutputs();
  els.stationLayerToggle.checked = state.showStationLayer;
  if (els.submarineStationLayerToggle) {
    els.submarineStationLayerToggle.checked = state.showSubmarineStationLayer;
  }
  els.regionLayerToggle.checked = state.showRegionLayer;
  els.eewWarningToggle.checked = state.showEewWarningLayer;
  if (els.plateBoundaryLayerToggle) {
    els.plateBoundaryLayerToggle.checked = state.showPlateBoundaryLayer;
  }
  if (els.faultLayerToggle) {
    els.faultLayerToggle.checked = state.showFaultLayer;
  }
  els.simulationStationLayerToggle.checked = state.showStationLayer;
  if (els.simulationSubmarineStationLayerToggle) {
    els.simulationSubmarineStationLayerToggle.checked = state.showSubmarineStationLayer;
  }
  els.simulationRegionLayerToggle.checked = state.showRegionLayer;
  els.simulationEewWarningToggle.checked = state.showEewWarningLayer;
  if (els.simulationPlateBoundaryLayerToggle) {
    els.simulationPlateBoundaryLayerToggle.checked = state.showPlateBoundaryLayer;
  }
  if (els.simulationFaultLayerToggle) {
    els.simulationFaultLayerToggle.checked = state.showFaultLayer;
  }
  updateEarthquakePresetButtonLabel();
}

function updateSimulationAvailability() {
  if (!els.simulationStart) {
    return;
  }

  document.body.classList.toggle("simulation-running", Boolean(state.simulationRunning));
  setStartupInteractionLocked(!maintenanceStatusReady || resetViewAnimating);

  if (document.body.classList.contains("unsupported-screen-active") || document.body.classList.contains("maintenance-screen-blocking")) {
    els.simulationStart.disabled = true;
    els.simulationStart.title = "";
    return;
  }

  if (state.simulationRunning) {
    setStartupInteractionLocked(false);
    els.simulationStart.disabled = false;
    els.simulationStart.title = "";
    return;
  }

  if (resetViewAnimating) {
    els.simulationStart.disabled = true;
    els.simulationStart.textContent = "しばらくお待ち下さい";
    els.simulationStart.title = "マップを初期位置へ移動しています";
    return;
  }

  if (!maintenanceStatusReady) {
    els.simulationStart.disabled = true;
    els.simulationStart.textContent = "メンテナンス確認中...";
    els.simulationStart.title = "メンテナンスモードの状態を確認しています";
    return;
  }

  if (presetDetailLoadingId) {
    els.simulationStart.disabled = true;
    els.simulationStart.textContent = "プリセットを読み込み中...";
    els.simulationStart.title = "プリセット地震の詳細データを読み込んでいます";
    return;
  }

  const predictedMaximum = getPredictedMaximumIntensity();
  const canStart =
    Number.isFinite(predictedMaximum.value) && predictedMaximum.rank >= 1;

  els.simulationStart.disabled = !canStart;
  els.simulationStart.textContent = "シミュレーション開始";
  els.simulationStart.title = canStart
    ? ""
    : "震度1以上が見込まれないため開始できません";
}

function updateSetupResultOutputs() {
  if (els.municipalityOutput) {
    setTextContentIfChanged(els.municipalityOutput, state.municipalityName);
  }

  if (els.maxIntensityOutput) {
    setTextContentIfChanged(els.maxIntensityOutput, formatSetupMaxIntensityLabel(state.maxIntensityLabel));
  }
}

function formatSetupMaxIntensityLabel(label) {
  return String(label ?? "").trim() === "0" ? "-" : (label || "-");
}

function isSimulationMapDataLoading() {
  return (
    !localAreaData?.features?.length ||
    !shindoStationData
  );
}

function setStartupInteractionLocked(locked) {
  document.body.classList.toggle("app-loading", Boolean(locked));
  if (!map) {
    return;
  }

  const methodName = locked ? "disable" : "enable";
  map.scrollZoom?.[methodName]?.();
  map.boxZoom?.[methodName]?.();
  map.dragPan?.[methodName]?.();
  map.doubleClickZoom?.[methodName]?.();
  map.touchZoomRotate?.[methodName]?.();
  map.keyboard?.[methodName]?.();
  map.touchZoomRotate?.disableRotation?.();
  map.dragRotate?.disable?.();
}

function schedulePostMapInteractionRender() {
  simulationRenderBucket = -1;
  simulationStationRenderBucket = -1;
  window.clearTimeout(postMapInteractionRenderTimer);
  postMapInteractionRenderTimer = window.setTimeout(() => {
    if (state.mapInteracting || !map) {
      return;
    }

    if (state.simulationRunning) {
      const elapsedSec = getSimulationElapsedSec();
      if (state.showStationLayer && map.getSource("shindo-stations") && shindoStationData) {
        setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(elapsedSec));
      }
      visibleAreaDataSyncBucket = null;
      syncVisibleAreaSourceData(elapsedSec);
      updateSimulationSummary(elapsedSec);
    }
  }, 90);
}

function syncEpicenterMarkerPosition() {
  const lngLat = [state.longitude, state.latitude];
  if (epicenterMarker) {
    epicenterMarker.setLngLat(lngLat);
  }
  return lngLat;
}

function scheduleDeferredEpicenterUpdate(options = {}, delayMs = EPICENTER_DEFERRED_UPDATE_DELAY_MS) {
  const token = ++deferredEpicenterUpdateToken;
  window.clearTimeout(deferredEpicenterUpdateTimer);
  deferredEpicenterUpdateTimer = window.setTimeout(() => {
    deferredEpicenterUpdateTimer = 0;
    updateEpicenter({ ...options, updateToken: token });
  }, delayMs);
}

async function updateEpicenter(options = {}) {
  if (!map) {
    return;
  }

  if (options.resolveLocation) {
    const locationInManagedArea = await updateLocationNames();
    if (options.updateToken && options.updateToken !== deferredEpicenterUpdateToken) {
      return;
    }
    if (options.enforceManagedArea && !locationInManagedArea) {
      state.latitude = lastManagedEpicenter.latitude;
      state.longitude = lastManagedEpicenter.longitude;
      await updateLocationNames();
      if (options.updateToken && options.updateToken !== deferredEpicenterUpdateToken) {
        return;
      }
      syncInputs();
      if (epicenterMarker) {
        epicenterMarker.setLngLat([state.longitude, state.latitude]);
      }
      if (!options.skipIntensityUpdate) {
        updateIntensityLayer();
      }
      return;
    }

    if (locationInManagedArea) {
      lastManagedEpicenter = {
        latitude: state.latitude,
        longitude: state.longitude,
      };
    }
  }

  if (options.preservePresetEpicenterName) {
    applyPresetEpicenterNameOverride();
  }

  if (!options.skipIntensityUpdate) {
    updateIntensityLayer();
  }
  syncInputs();
  const lngLat = [state.longitude, state.latitude];

  if (!epicenterMarker) {
    const markerElement = document.createElement("span");
    markerElement.className = "epicenter-marker-shell";
    markerElement.tabIndex = 0;
    markerElement.setAttribute("role", "button");
    markerElement.setAttribute("aria-label", "震度情報を表示");
    markerElement.innerHTML = `
      <svg class="epicenter-marker" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 15 L15 10 L24 19 L33 10 L38 15 L29 24 L38 33 L33 38 L24 29 L15 38 L10 33 L19 24 Z" />
      </svg>
    `;

    epicenterMarker = new maplibregl.Marker({
      element: markerElement,
      draggable: state.epicenterEditEnabled,
    })
      .setLngLat(lngLat)
      .addTo(map);

    epicenterHoverPopup = new maplibregl.Popup({
      anchor: "bottom",
      closeButton: false,
      closeOnClick: false,
      className: "station-popup epicenter-popup",
      offset: 10,
    });
    epicenterClickPopup = new maplibregl.Popup({
      anchor: "bottom",
      closeButton: true,
      closeOnClick: true,
      className: "station-popup epicenter-popup",
      offset: 14,
    });
    epicenterClickPopup.on("close", () => {
      epicenterPopupPinned = false;
    });

    const getEpicenterEventLngLat = (event) => {
      const rect = map.getContainer().getBoundingClientRect();
      return map.unproject([event.clientX - rect.left, event.clientY - rect.top]);
    };

    const openEpicenterHoverPopup = (event) => {
      if (state.epicenterEditEnabled || epicenterPopupPinned) {
        epicenterHoverPopup.remove();
        return;
      }
      const popupLngLat = event ? getEpicenterEventLngLat(event) : [state.longitude, state.latitude];
      epicenterHoverLngLat = popupLngLat;
      epicenterHoverPopup
        .setLngLat(popupLngLat)
        .setHTML(buildEpicenterPopupHtml())
        .addTo(map);
    };

    markerElement.addEventListener("mouseenter", (event) => {
      if (state.epicenterEditEnabled) {
        return;
      }
      map.getCanvas().style.cursor = "pointer";
      openEpicenterHoverPopup(event);
    });

    markerElement.addEventListener("mousemove", (event) => {
      if (state.epicenterEditEnabled) {
        return;
      }
      openEpicenterHoverPopup(event);
    });

    markerElement.addEventListener("mouseleave", () => {
      map.getCanvas().style.cursor = "";
      epicenterHoverLngLat = null;
      epicenterHoverPopup.remove();
    });

    markerElement.addEventListener("focus", () => {
      if (state.epicenterEditEnabled) {
        return;
      }
      openEpicenterHoverPopup();
    });

    markerElement.addEventListener("blur", () => {
      epicenterHoverLngLat = null;
      epicenterHoverPopup.remove();
    });

    markerElement.addEventListener("click", (event) => {
      if (state.epicenterEditEnabled) {
        closeEpicenterInfoPopups();
        return;
      }
      event.stopPropagation();
      epicenterPopupPinned = true;
      epicenterHoverLngLat = null;
      epicenterHoverPopup.remove();
      epicenterClickPopup
        .setLngLat(getEpicenterEventLngLat(event))
        .setHTML(buildEpicenterPopupHtml())
        .addTo(map);
    });

    epicenterMarker.on("dragend", () => {
      if (state.simulationRunning || !state.epicenterEditEnabled) {
        epicenterMarker.setLngLat([state.longitude, state.latitude]);
        return;
      }

      const markerLngLat = epicenterMarker.getLngLat();
      state.latitude = Number(markerLngLat.lat.toFixed(3));
      state.longitude = Number(markerLngLat.lng.toFixed(3));
      clearSelectedPreset();
      invalidateIntensityEstimateCache();
      syncInputs();
      updateActiveEpicenterPopups([state.longitude, state.latitude]);
      scheduleDeferredEpicenterUpdate({ resolveLocation: true, enforceManagedArea: true }, EPICENTER_DRAG_UPDATE_DELAY_MS);
    });
    updateEpicenterEditMode();
  }

  epicenterMarker.setLngLat(lngLat);
  updateActiveEpicenterPopups(lngLat);
}

function buildEpicenterPopupHtml() {
  return [
    `<span>震源：${escapeHtml(state.epicenterName)}</span>`,
    `<span>マグニチュード：${state.magnitude.toFixed(1)}</span>`,
    `<span>深さ：${escapeHtml(formatDepth(state.depthKm))}</span>`,
  ].join("");
}

function updateActiveEpicenterPopups(lngLat = [state.longitude, state.latitude]) {
  if (state.epicenterEditEnabled) {
    closeEpicenterInfoPopups();
    return;
  }

  if (epicenterHoverPopup?.isOpen?.()) {
    epicenterHoverPopup
      .setLngLat(epicenterHoverLngLat ?? lngLat)
      .setHTML(buildEpicenterPopupHtml());
  }

  if (epicenterClickPopup?.isOpen?.()) {
    epicenterClickPopup
      .setLngLat(lngLat)
      .setHTML(buildEpicenterPopupHtml());
  }
}

function closeEpicenterInfoPopups() {
  epicenterPopupPinned = false;
  epicenterHoverLngLat = null;
  epicenterHoverPopup?.remove();
  epicenterClickPopup?.remove();
  if (map) {
    map.getCanvas().style.cursor = "";
  }
}

async function updateLocationNames() {
  let inManagedArea = false;

  try {
    const [municipality, epicenterAreas] = await Promise.all([
      findMunicipalityAtPoint(state.longitude, state.latitude),
      loadEpicenterAreas(),
    ]);
    const epicenterArea = findEpicenterAreaAtPoint(epicenterAreas, state.longitude, state.latitude);
    inManagedArea = Boolean(municipality || epicenterArea);

    state.municipalityName = municipality ? formatMunicipalityDisplayName(municipality.properties) : "該当なし";
    state.epicenterName = epicenterArea
      ? cleanDisplayAreaName(epicenterArea.properties.name)
      : "判定できません";

  } catch (error) {
    state.municipalityName = "判定できません";
    state.epicenterName = "判定できません";
    console.warn(error);
  }

  els.epicenterRegion.value = state.epicenterName;
  setTextContentIfChanged(els.municipalityOutput, state.municipalityName);
  return inManagedArea;
}

function formatMunicipalityDisplayName(properties = {}) {
  const prefecture = cleanDisplayAreaName(properties.pref || properties.prefecture || "");
  const municipality = cleanDisplayAreaName(properties.city || properties.municipality || "");
  const fullName = cleanDisplayAreaName(properties.name || "");

  if (prefecture && municipality) {
    return municipality.startsWith(prefecture) ? municipality : `${prefecture}${municipality}`;
  }

  if (prefecture && fullName) {
    return fullName.startsWith(prefecture) ? fullName : `${prefecture}${fullName}`;
  }

  return fullName || municipality || prefecture || "該当なし";
}

function isExcludedTerritoryName(name) {
  return Boolean(
    name &&
      /北方領土|樺太|サハリン|竹島|尖閣|魚釣島|択捉|択捉島|国後|国後島|色丹|色丹島|歯舞|歯舞群島/.test(
        String(name),
      ),
  );
}

function filterExcludedGeoJsonFeatures(geojson) {
  return {
    ...geojson,
    features: (geojson.features ?? []).filter((feature) => !isExcludedFeature(feature)),
  };
}

function isExcludedFeature(feature) {
  const code = String(feature.properties?.code ?? "");
  if (EXCLUDED_TERRITORY_CODES.has(code.slice(0, 5))) {
    return true;
  }

  return Object.values(feature.properties ?? {}).some((value) => isExcludedTerritoryName(value));
}

function cleanDisplayAreaName(name) {
  return String(name ?? "").trim();
}

function updateIntensityLayer() {
  if (!map || !localAreaData) {
    return;
  }

  if (state.showStationLayer && map.getSource("shindo-stations") && shindoStationData) {
    setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(getSimulationStationElapsedSec()));
  }

  if (
    state.showSubmarineStationLayer &&
    !getSelectedPreset() &&
    map.getSource("submarine-observation-points") &&
    submarineObservationPointData
  ) {
    setSubmarineObservationSourceForElapsed(getSubmarineObservationElapsedSec());
  }

  if (localAreaData) {
    if (!shindoStationData) {
      updateSimulationAvailability();
      return;
    }

    const nextAreaData =
      document.body.dataset.activeBottomTab === "bottom-history-tab"
        ? buildHistoryLocalAreaMapData(getSimulationStationElapsedSec())
        : buildIntensityAreaData(localAreaData, getSimulationStationElapsedSec());
    if (shouldSyncAreaSourceData() && map.getSource("jma-local-areas")) {
      const updated = setGeoJsonSourceData("jma-local-areas", nextAreaData);
      if (updated) {
        visibleAreaDataSyncBucket = toSimulationBucket(getSimulationStationElapsedSec());
      }
    }
    updateSetupResultOutputs();
  }

  scheduleStartupReadyAfterIntensityPaint();
  updateSimulationAvailability();
}

function getSimulationStationElapsedSec() {
  return state.simulationRunning ? getSimulationElapsedSec() : Infinity;
}

function getSubmarineObservationElapsedSec() {
  return state.simulationRunning ? getSimulationElapsedSec() : Infinity;
}

function getIntensitySourceCacheKey(elapsedSec = Infinity) {
  return [
    toSimulationBucket(elapsedSec),
    Number(state.longitude).toFixed(4),
    Number(state.latitude).toFixed(4),
    Number(state.depthKm).toFixed(1),
    Number(state.magnitude).toFixed(1),
    getSelectedPreset()?.id ?? "",
  ].join("|");
}

function getStationIntensityDataForElapsed(elapsedSec = Infinity) {
  if (!shindoStationData) {
    return emptyFeatureCollection();
  }

  const key = getIntensitySourceCacheKey(elapsedSec);
  if (stationDataCache.key === key && stationDataCache.data) {
    return stationDataCache.data;
  }

  const data = buildStationIntensityData(shindoStationData, elapsedSec);
  stationDataCache = {
    key,
    data,
  };
  return data;
}

function getPredictedMaximumIntensity() {
  if (!shindoStationData) {
    return { rank: 0, value: 0 };
  }

  if (predictedMaximumCache) {
    return predictedMaximumCache;
  }

  predictedMaximumCache = buildStationIntensityFeatures(shindoStationData).reduce(
    (maximum, feature) => {
      const rank = feature.properties.predictedIntensityRank;
      const value = feature.properties.predictedIntensityValue;
      if (rank > maximum.rank || (rank === maximum.rank && value > maximum.value)) {
        return { rank, value };
      }

      return maximum;
    },
    { rank: 0, value: 0 },
  );
  return predictedMaximumCache;
}

function getAreaEpicentralDistances(geojson) {
  const key = [
    Number(state.longitude).toFixed(4),
    Number(state.latitude).toFixed(4),
    geojson.features?.length ?? 0,
  ].join("|");

  if (areaEpicentralDistanceCache.key === key) {
    return areaEpicentralDistanceCache.distances;
  }

  const epicenter = [state.longitude, state.latitude];
  const distances = (geojson.features ?? []).map((feature) =>
    Number(getNearestPointOnFeature(epicenter, feature).distanceKm.toFixed(1)),
  );
  areaEpicentralDistanceCache = {
    key,
    distances,
  };
  return distances;
}

function getSubmarineObservationDataForElapsed(elapsedSec = Infinity, data = submarineObservationPointData) {
  if (!data?.features?.length || getSelectedPreset()) {
    return emptyFeatureCollection();
  }

  const isSimulation = Number.isFinite(elapsedSec);
  const cacheKey = [
    data.features.length,
    isSimulation ? toSimulationBucket(elapsedSec) : "preview",
    state.longitude.toFixed(4),
    state.latitude.toFixed(4),
    state.depthKm.toFixed(1),
    state.magnitude.toFixed(1),
  ].join("|");
  if (submarineObservationIntensityCache.key === cacheKey) {
    return {
      type: "FeatureCollection",
      features: submarineObservationIntensityCache.features,
    };
  }

  const features = buildSubmarineObservationIntensityFeatures(data)
    .map((feature) => {
      const currentProperties = getCurrentIntensityProperties(feature.properties, elapsedSec);
      return {
        ...feature,
        properties: {
          ...feature.properties,
          ...currentProperties,
        },
      };
    })
    .filter((feature) =>
      (!isSimulation || feature.properties.observed === true) &&
      Number(feature.properties.intensityRank ?? 0) >= 1
    );

  submarineObservationIntensityCache = { key: cacheKey, features };
  return {
    type: "FeatureCollection",
    features,
  };
}

function getLocalAreaStationSnapshot(geojson, predictedStationFeatures) {
  if (
    localAreaStationSnapshotCache?.geojson === geojson &&
    localAreaStationSnapshotCache?.stationFeatures === predictedStationFeatures
  ) {
    return localAreaStationSnapshotCache;
  }

  const areaStationIds = getLocalAreaStationMembership(geojson, predictedStationFeatures);
  const predictedStationById = new Map(
    predictedStationFeatures.map((feature) => [feature.properties.id, feature]),
  );
  const predictedMaxValues = [];
  const earliestPArrivals = [];
  const earliestSArrivals = [];

  areaStationIds.forEach((stationIds, index) => {
    let predictedMaxValue = 0;
    let earliestPArrivalSec = Infinity;
    let earliestSArrivalSec = Infinity;

    stationIds.forEach((stationId) => {
      const stationFeature = predictedStationById.get(stationId);
      if (!stationFeature) {
        return;
      }

      const properties = stationFeature.properties ?? {};
      predictedMaxValue = Math.max(predictedMaxValue, Number(properties.predictedIntensityValue ?? 0));
      earliestPArrivalSec = Math.min(earliestPArrivalSec, Number(properties.pArrivalSec ?? Infinity));
      earliestSArrivalSec = Math.min(earliestSArrivalSec, Number(properties.sArrivalSec ?? Infinity));
    });

    predictedMaxValues[index] = predictedMaxValue;
    earliestPArrivals[index] = earliestPArrivalSec;
    earliestSArrivals[index] = earliestSArrivalSec;
  });

  localAreaStationSnapshotCache = {
    geojson,
    stationFeatures: predictedStationFeatures,
    areaStationIds,
    predictedMaxValues,
    earliestPArrivals,
    earliestSArrivals,
  };
  return localAreaStationSnapshotCache;
}

function buildIntensityAreaData(geojson, elapsedSec = Infinity) {
  const cacheKey = [
    getIntensitySourceCacheKey(elapsedSec),
    geojson.features?.length ?? 0,
    state.showEewWarningLayer ? "eew" : "no-eew",
  ].join("|");
  if (areaDataCache.key === cacheKey && areaDataCache.data) {
    return areaDataCache.data;
  }

  const isSimulation = Number.isFinite(elapsedSec);
  const selectedPreset = getSelectedPreset();
  const predictedStationFeatures = shindoStationData ? buildStationIntensityFeatures(shindoStationData) : [];
  const stationFeatures = shindoStationData
      ? isSimulation
        ? getObservedStationFeaturesForElapsed(elapsedSec)
      : predictedStationFeatures
    : [];
  const areaStationSnapshot = getLocalAreaStationSnapshot(geojson, predictedStationFeatures);
  const { areaStationIds, predictedMaxValues, earliestPArrivals, earliestSArrivals } = areaStationSnapshot;
  const activeStationById = new Map(stationFeatures.map((feature) => [feature.properties.id, feature]));
  const epicentralDistances = getAreaEpicentralDistances(geojson);
  let maxClass = INTENSITY_CLASSES[0];
  let maxValue = 0;
  let predictedMaxClass = INTENSITY_CLASSES[0];

  const areaFeatures = geojson.features.map((feature, index) => {
    const stationIds = areaStationIds[index] ?? [];
    let areaHasObservedStation = false;
    let areaObservedIntensityValue = 0;
    stationIds.forEach((stationId) => {
      const stationFeature = activeStationById.get(stationId);
      if (!stationFeature) {
        return;
      }

      areaHasObservedStation = true;
      areaObservedIntensityValue = Math.max(
        areaObservedIntensityValue,
        Number(stationFeature.properties.intensityValue ?? 0),
      );
    });
    const earliestPArrivalSec = earliestPArrivals[index] ?? Infinity;
    const earliestSArrivalSec = earliestSArrivals[index] ?? Infinity;
    const eewPWaveObserved =
      isSimulation &&
      Number.isFinite(earliestPArrivalSec) &&
      elapsedSec >= earliestPArrivalSec + EARTHQUAKE_MODEL.eewProcessingDelaySec;
    const eewBeforeMainMotion =
      !isSimulation ||
      !Number.isFinite(earliestSArrivalSec) ||
      elapsedSec < earliestSArrivalSec;
    const intensityValue =
      areaHasObservedStation
        ? areaObservedIntensityValue
        : isSimulation
          ? 0
          : selectedPreset
            ? 0
            : estimateMaxIntensityForFeature(feature);
    const predictedIntensityValue =
      (predictedMaxValues[index] ?? 0) > 0
        ? predictedMaxValues[index]
        : selectedPreset
          ? 0
          : estimateMaxIntensityForFeature(feature);
    const intensityClass = toJmaIntensityClass(intensityValue);
    const predictedIntensityClass = toJmaIntensityClass(predictedIntensityValue);
    const displayedIntensityClass = getPresetDisplayIntensityClass(intensityClass, intensityValue, selectedPreset);
    const displayedPredictedIntensityClass = getPresetDisplayIntensityClass(
      predictedIntensityClass,
      predictedIntensityValue,
      selectedPreset,
    );
    const epicentralDistanceKm = epicentralDistances[index] ?? 0;

    if (displayedIntensityClass.rank > maxClass.rank || intensityValue > maxValue) {
      maxClass = displayedIntensityClass;
      maxValue = intensityValue;
    }
    if (displayedPredictedIntensityClass.rank > predictedMaxClass.rank) {
      predictedMaxClass = displayedPredictedIntensityClass;
    }

    return {
      ...feature,
      properties: {
        ...feature.properties,
        intensityValue: Number(intensityValue.toFixed(2)),
        intensityLabel: displayedIntensityClass.label,
        intensityRank: displayedIntensityClass.rank,
        intensityColor: displayedIntensityClass.color,
        predictedIntensityValue: Number(predictedIntensityValue.toFixed(2)),
        predictedIntensityRank: displayedPredictedIntensityClass.rank,
        epicentralDistanceKm,
        eewPWaveObserved,
        eewBeforeMainMotion,
        earliestPArrivalSec: Number.isFinite(earliestPArrivalSec) ? Number(earliestPArrivalSec.toFixed(2)) : null,
        earliestSArrivalSec: Number.isFinite(earliestSArrivalSec) ? Number(earliestSArrivalSec.toFixed(2)) : null,
      },
    };
  });

  const shouldIssueEew = predictedMaxClass.rank >= 5;
  const activePresetEewReport = selectedPreset ? getPresetEewReportForElapsed(selectedPreset, elapsedSec) : null;
  const freezeSimulationEew =
    !selectedPreset && state.simulationRunning && state.eewWarningFinalReport;
  const features = areaFeatures;
  features.forEach((feature) => {
    const eewForecastArea = getEewForecastAreaName(feature.properties.name);
    const eewWarning = selectedPreset
      ? isPresetEewWarningFeature(selectedPreset, feature, eewForecastArea, elapsedSec)
      : !freezeSimulationEew && shouldIssueEew && shouldIssueSimulationEewFeature(feature, elapsedSec);

    feature.properties.eewWarning = eewWarning;
    feature.properties.eewForecastArea = eewForecastArea;
  });

  if (!selectedPreset) {
    if (!freezeSimulationEew) {
      applyAdaptiveEewExpansion(features, shouldIssueEew, elapsedSec);
    }
    applyPersistentSimulationEewWarnings(features, elapsedSec);
  }
  updateEewReportState(features, selectedPreset, activePresetEewReport, elapsedSec);
  applyEewBlinkState(features, elapsedSec);
  const warningForecastAreas = new Set();
  features.forEach((feature) => {
    if (feature.properties.eewWarning) {
      warningForecastAreas.add(feature.properties.eewForecastArea);
    }
  });

  state.eewWarningForecastAreas = compactForecastAreas([...warningForecastAreas]);
  updateEewForecastPanel();

  const displayedMaxClass = getPresetDisplayIntensityClass(maxClass, maxValue, selectedPreset);
  state.maxIntensityLabel = displayedMaxClass.label;

  const data = {
    ...geojson,
    name: "JMA local areas with representative maximum intensity",
    features,
  };

  areaDataCache = {
    key: cacheKey,
    data,
  };

  return data;
}

function shouldIssueSimulationEewFeature(feature, elapsedSec = Infinity) {
  const predictedValue = feature.properties.predictedIntensityValue ?? 0;
  if (!isFinalSimulationEewFeature(feature)) {
    return false;
  }

  if (!Number.isFinite(elapsedSec)) {
    return true;
  }

  const currentValue = feature.properties.intensityValue ?? 0;
  if (currentValue >= 4.5) {
    return true;
  }

  const earliestPArrivalSec = feature.properties.earliestPArrivalSec ?? Infinity;
  const earliestSArrivalSec = feature.properties.earliestSArrivalSec ?? Infinity;
  const pObservedForWarning =
    Number.isFinite(earliestPArrivalSec) &&
    elapsedSec >= earliestPArrivalSec + EARTHQUAKE_MODEL.eewProcessingDelaySec;
  const beforeStrongMotion =
    !Number.isFinite(earliestSArrivalSec) || elapsedSec < earliestSArrivalSec - 0.4;

  return (
    pObservedForWarning &&
    beforeStrongMotion &&
    feature.properties.predictedIntensityRank >= 4 &&
    (currentValue >= getSimulationEewObservedIntensityThreshold(predictedValue) ||
      isNearEpicenterHighPredictedArea(feature))
  );
}

function isFinalSimulationEewFeature(feature) {
  const predictedValue = feature.properties.predictedIntensityValue ?? 0;
  const predictedRank = feature.properties.predictedIntensityRank ?? 0;
  return predictedRank >= 4 && predictedValue >= 3.5;
}

function isNearEpicenterHighPredictedArea(feature) {
  const predictedValue = feature.properties.predictedIntensityValue ?? 0;
  if (predictedValue < 4.5) {
    return false;
  }

  const distanceKm = feature.properties.epicentralDistanceKm ?? Infinity;
  const offshoreFactor = getOffshoreEpicenterFactor();
  const radiusKm = clamp(40 + Math.max(state.magnitude - 5.5, 0) * 45 + offshoreFactor * 35, 45, 180);
  return distanceKm <= radiusKm;
}

function getSimulationEewObservedIntensityThreshold(predictedValue) {
  if (predictedValue >= 5.5) {
    return 2.55;
  }

  if (predictedValue >= 4.5) {
    return 2.75;
  }

  return 2.95;
}

function applyAdaptiveEewExpansion(features, shouldIssueEew, elapsedSec = Infinity) {
  if (!shouldIssueEew) {
    return;
  }

  const offshoreFactor = getOffshoreEpicenterFactor();
  const predictedMax = features.reduce(
    (maximum, feature) =>
      Math.max(maximum, feature.properties.predictedIntensityValue ?? 0),
    0,
  );
  const evidence = getSimulationEewObservationEvidence(features, elapsedSec);
  if (!evidence.hasActionableObservation) {
    return;
  }

  const warningAreas = new Set(
    features.filter((feature) => feature.properties.eewWarning).map((feature) => feature.properties.eewForecastArea),
  );

  features.forEach((feature) => {
    if (feature.properties.eewWarning) {
      return;
    }

    const sameForecastAreaAlreadyWarned = warningAreas.has(feature.properties.eewForecastArea);
    const predictedRank = feature.properties.predictedIntensityRank ?? 0;
    const predictedValue = feature.properties.predictedIntensityValue ?? 0;
    const currentRank = feature.properties.intensityRank ?? 0;
    const currentValue = feature.properties.intensityValue ?? 0;
    const distanceKm = feature.properties.epicentralDistanceKm ?? Infinity;
    const phaseConfidence = getSimulationEewPhaseConfidence(elapsedSec, evidence.firstActionableObservedSec);
    const expansionThreshold = getSimulationEewExpansionThreshold({
      predictedMax,
      offshoreFactor,
      phaseConfidence,
    });
    const pWaveEvidenceWindow =
      Number.isFinite(elapsedSec) &&
      feature.properties.eewPWaveObserved &&
      feature.properties.eewBeforeMainMotion;
    const localObservationSupportsWarning =
      pWaveEvidenceWindow &&
      predictedRank >= 4 &&
      currentValue >= getSimulationEewObservedIntensityThreshold(predictedValue);
    const enoughConfidenceForForecastExpansion =
      phaseConfidence > 0 &&
      pWaveEvidenceWindow &&
      predictedRank >= 4 &&
      predictedValue >= expansionThreshold;
    const sameForecastAreaExpansion =
      sameForecastAreaAlreadyWarned &&
      predictedRank >= 4 &&
      predictedValue >= Math.max(3.5, expansionThreshold - 0.55);
    const nearEpicenterBatchExpansion =
      predictedRank >= 4 &&
      predictedValue >= 3.5 &&
      distanceKm <= getSimulationEewBatchExpansionRadiusKm(predictedMax, offshoreFactor, phaseConfidence);
    const broadForecastExpansion =
      isFinalSimulationEewFeature(feature) &&
      phaseConfidence >= 0.18 &&
      predictedMax >= 4.8 &&
      distanceKm <= getSimulationEewBroadExpansionRadiusKm(predictedMax, offshoreFactor, phaseConfidence);
    const matureFinalForecastExpansion =
      isFinalSimulationEewFeature(feature) &&
      phaseConfidence >= 0.55 &&
      predictedMax >= 5.0;

    if (
      localObservationSupportsWarning ||
      enoughConfidenceForForecastExpansion ||
      nearEpicenterBatchExpansion ||
      broadForecastExpansion ||
      matureFinalForecastExpansion ||
      (phaseConfidence >= 0.45 && sameForecastAreaExpansion) ||
      (predictedMax >= 5.0 && currentRank >= 3 && sameForecastAreaAlreadyWarned)
    ) {
      feature.properties.eewWarning = true;
      warningAreas.add(feature.properties.eewForecastArea);
    }
  });

  expandSimulationEewWithinForecastAreas(features, warningAreas);
}

function getSimulationEewBatchExpansionRadiusKm(predictedMax, offshoreFactor, phaseConfidence) {
  return clamp(
    75 + Math.max(predictedMax - 4.5, 0) * 58 + offshoreFactor * 65 + phaseConfidence * 110,
    90,
    360,
  );
}

function getSimulationEewBroadExpansionRadiusKm(predictedMax, offshoreFactor, phaseConfidence) {
  return clamp(
    115 + Math.max(predictedMax - 4.5, 0) * 78 + offshoreFactor * 85 + phaseConfidence * 180,
    130,
    520,
  );
}

function expandSimulationEewWithinForecastAreas(features, warningAreas) {
  if (warningAreas.size === 0) {
    return;
  }

  features.forEach((feature) => {
    if (feature.properties.eewWarning) {
      return;
    }
    if (!warningAreas.has(feature.properties.eewForecastArea)) {
      return;
    }
    if (!isFinalSimulationEewFeature(feature)) {
      return;
    }

    feature.properties.eewWarning = true;
  });
}

function getSimulationEewObservationEvidence(features, elapsedSec) {
  if (!Number.isFinite(elapsedSec)) {
    return {
      hasActionableObservation: true,
      firstActionableObservedSec: 0,
    };
  }

  const actionableFeatures = features.filter((feature) => {
    const predictedValue = feature.properties.predictedIntensityValue ?? 0;
    const currentValue = feature.properties.intensityValue ?? 0;
    return (
      feature.properties.eewPWaveObserved &&
      feature.properties.predictedIntensityRank >= 4 &&
      currentValue >= getSimulationEewObservedIntensityThreshold(predictedValue)
    );
  });

  if (actionableFeatures.length === 0) {
    return {
      hasActionableObservation: false,
      firstActionableObservedSec: Infinity,
    };
  }

  return {
    hasActionableObservation: true,
    firstActionableObservedSec: Math.min(
      ...actionableFeatures.map(
        (feature) =>
          (feature.properties.earliestPArrivalSec ?? elapsedSec) + EARTHQUAKE_MODEL.eewProcessingDelaySec,
      ),
    ),
  };
}

function getSimulationEewPhaseConfidence(elapsedSec, firstActionableObservedSec) {
  if (!Number.isFinite(elapsedSec) || !Number.isFinite(firstActionableObservedSec)) {
    return 1;
  }

  const secondsSinceEvidence = elapsedSec - firstActionableObservedSec;
  return smoothStep(clamp(secondsSinceEvidence / 10, 0, 1));
}

function getSimulationEewExpansionThreshold({ predictedMax, offshoreFactor, phaseConfidence }) {
  const largeEventRelaxation = clamp((predictedMax - 5.0) * 0.16 + offshoreFactor * 0.18, 0, 0.42);
  const earlyThreshold = 4.85 - largeEventRelaxation;
  const matureThreshold = 3.85 - largeEventRelaxation * 0.35;
  return earlyThreshold + (matureThreshold - earlyThreshold) * phaseConfidence;
}

function applyPersistentSimulationEewWarnings(features, elapsedSec) {
  if (!state.simulationRunning || !Number.isFinite(elapsedSec)) {
    return;
  }

  features.forEach((feature) => {
    const key = getEewFeatureKey(feature);
    if (feature.properties.eewWarning) {
      state.eewIssuedWarningKeys.add(key);
    } else if (state.eewIssuedWarningKeys.has(key)) {
      feature.properties.eewWarning = true;
    }
  });
}

function updateEewReportState(features, selectedPreset, activePresetEewReport, elapsedSec) {
  if (selectedPreset) {
    state.eewWarningReportNumber = activePresetEewReport?.reportNumber ?? null;
    state.eewWarningFinalReport = isPresetFinalEewReport(selectedPreset, activePresetEewReport);
    state.eewReportAreaKeySignature = "";
    state.eewSyntheticReportNumber = 0;
    state.eewFirstReportElapsedSec = null;
    return;
  }

  const warningKeys = features
    .filter((feature) => feature.properties.eewWarning)
    .map(getEewFeatureKey)
    .sort();
  if (warningKeys.length === 0) {
    state.eewWarningReportNumber = null;
    state.eewWarningFinalReport = false;
    state.eewReportAreaKeySignature = "";
    state.eewSyntheticReportNumber = 0;
    state.eewFirstReportElapsedSec = null;
    return;
  }

  const nextSignature = warningKeys.join("|");
  if (!state.simulationRunning || !Number.isFinite(elapsedSec)) {
    state.eewWarningReportNumber = 1;
    state.eewWarningFinalReport = !state.simulationRunning && !Number.isFinite(elapsedSec);
    state.eewReportAreaKeySignature = nextSignature;
    state.eewSyntheticReportNumber = 1;
    state.eewFirstReportElapsedSec = null;
    return;
  }

  const previousWarningKeys = new Set(
    state.eewReportAreaKeySignature ? state.eewReportAreaKeySignature.split("|") : [],
  );
  const hasAddedArea = warningKeys.some((key) => !previousWarningKeys.has(key));
  state.eewFirstReportElapsedSec ??= elapsedSec;

  if (!state.eewReportAreaKeySignature) {
    state.eewSyntheticReportNumber = 1;
  } else if (hasAddedArea) {
    state.eewSyntheticReportNumber += 1;
  }

  const timedReportNumber = getSimulationEewTimedReportNumber(elapsedSec);
  state.eewSyntheticReportNumber = Math.max(state.eewSyntheticReportNumber, timedReportNumber);
  state.eewReportAreaKeySignature = nextSignature;
  state.eewWarningReportNumber = state.eewSyntheticReportNumber;
  state.eewWarningFinalReport =
    !hasPendingSimulationEewUpdate(features, elapsedSec) &&
    hasSimulationEewHadEnoughReview(elapsedSec, state.eewSyntheticReportNumber);
}

function hasPendingSimulationEewUpdate(features, elapsedSec) {
  if (!state.simulationRunning || !Number.isFinite(elapsedSec)) {
    return false;
  }

  return features.some((feature) => {
    if (feature.properties.eewWarning) {
      return false;
    }

    if (!isFinalSimulationEewFeature(feature)) {
      return false;
    }

    return true;
  });
}

function getSimulationEewTimedReportNumber(elapsedSec) {
  if (!Number.isFinite(elapsedSec) || state.eewFirstReportElapsedSec == null) {
    return state.eewSyntheticReportNumber || 1;
  }

  const intervalSec = getSimulationEewReportIntervalSec();
  return Math.max(1, Math.floor((elapsedSec - state.eewFirstReportElapsedSec) / intervalSec) + 1);
}

function hasSimulationEewHadEnoughReview(elapsedSec, reportNumber) {
  if (!Number.isFinite(elapsedSec) || state.eewFirstReportElapsedSec == null) {
    return true;
  }

  const reviewElapsedSec = elapsedSec - state.eewFirstReportElapsedSec;
  return (
    reviewElapsedSec >= getSimulationEewMinimumReviewSec() &&
    reportNumber >= getSimulationEewMinimumReportCount()
  );
}

function getSimulationEewReportIntervalSec() {
  return clamp(4.2 - Math.max(state.magnitude - 6.0, 0) * 0.45, 2.6, 4.2);
}

function getSimulationEewMinimumReviewSec() {
  const offshoreFactor = getOffshoreEpicenterFactor();
  return clamp(12 + Math.max(state.magnitude - 5.5, 0) * 13 + offshoreFactor * 9, 12, 96);
}

function getSimulationEewMinimumReportCount() {
  return Math.round(clamp(3 + Math.max(state.magnitude - 5.5, 0) * 7.1, 3, 30));
}

function isPresetFinalEewReport(preset, activePresetEewReport) {
  const reports = preset?.eewReports ?? [];
  return Boolean(
    activePresetEewReport &&
      reports.length > 0 &&
      activePresetEewReport.reportNumber === reports[reports.length - 1].reportNumber,
  );
}

function isPresetEewWarningFeature(preset, feature, forecastArea, elapsedSec = Infinity) {
  const reportAreas = getPresetEewAreasForElapsed(preset, elapsedSec);
  if (reportAreas.length === 0) {
    return false;
  }

  const featureArea = normalizeEewAreaName(feature.properties.name);
  const forecast = normalizeEewAreaName(forecastArea);

  return reportAreas.some((areaName) => {
    const area = normalizeEewAreaName(areaName);
    const groupedAreas = (FORECAST_AREA_GROUP_MEMBERS[areaName] ?? []).map(normalizeEewAreaName);
    return (
      area === featureArea ||
      area === forecast ||
      groupedAreas.includes(forecast) ||
      groupedAreas.includes(featureArea) ||
      (area.length >= 2 && featureArea.includes(area)) ||
      (area.length >= 2 && forecast.includes(area))
    );
  });
}

function getPresetEewAreasForElapsed(preset, elapsedSec = Infinity) {
  return getPresetEewReportForElapsed(preset, elapsedSec)?.areas ?? [];
}

function getPresetEewReportForElapsed(preset, elapsedSec = Infinity) {
  const reports = preset.eewReports ?? [];
  if (reports.length === 0) {
    return null;
  }

  if (!Number.isFinite(elapsedSec)) {
    return reports[reports.length - 1] ?? null;
  }

  for (let index = reports.length - 1; index >= 0; index -= 1) {
    if (Number(reports[index].elapsedSec) <= elapsedSec) {
      return reports[index];
    }
  }

  return null;
}

function normalizeEewAreaName(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .trim();
}

function applyEewBlinkState(features, elapsedSec) {
  const isSimulation = state.simulationRunning && Number.isFinite(elapsedSec);
  if (!isSimulation) {
    state.eewWarningBlinkStartedAt = {};
    state.eewInitialWarningKeys = new Set();
    state.eewPreviousWarningKeys = new Set();
    features.forEach((feature) => {
      feature.properties.eewBlinkOff = false;
    });
    return;
  }

  const activeWarningKeys = features
    .filter((feature) => feature.properties.eewWarning)
    .map(getEewFeatureKey);
  const activeWarningKeySet = new Set(activeWarningKeys);
  const newWarningKeys = activeWarningKeys.filter((key) => !state.eewPreviousWarningKeys.has(key));

  if (state.eewPreviousWarningKeys.size === 0) {
    state.eewWarningBlinkStartedAt = {};
  } else if (newWarningKeys.length > 0) {
    state.eewWarningBlinkStartedAt = Object.fromEntries(
      newWarningKeys.map((key) => [key, elapsedSec]),
    );
  }
  state.eewPreviousWarningKeys = activeWarningKeySet;

  features.forEach((feature) => {
    if (!feature.properties.eewWarning) {
      feature.properties.eewBlinkOff = false;
      return;
    }

    const key = getEewFeatureKey(feature);
    const blinkStartedAt = state.eewWarningBlinkStartedAt[key];
    if (blinkStartedAt == null) {
      feature.properties.eewBlinkOff = false;
      return;
    }
    const elapsedSinceWarning = elapsedSec - state.eewWarningBlinkStartedAt[key];
    const phase = Math.floor(elapsedSinceWarning / EEW_BLINK_INTERVAL_SEC);
    feature.properties.eewBlinkOff = phase < EEW_BLINK_PHASES && phase % 2 === 1;
  });
}

function getEewFeatureKey(feature) {
  return String(feature.properties.code ?? feature.properties.name ?? feature.id ?? "");
}

function getLocalAreaStationMembership(geojson, stationFeatures) {
  const stationSignature = getStationMembershipSignature(stationFeatures);
  if (
    localAreaStationMembershipCache &&
    localAreaStationMembershipCache.geojson === geojson &&
    localAreaStationMembershipCache.areaCount === geojson.features.length &&
    localAreaStationMembershipCache.stationSignature === stationSignature
  ) {
    return localAreaStationMembershipCache.stationIdsByArea;
  }

  const stationIdsByArea = geojson.features.map(() => []);
  stationFeatures.forEach((stationFeature) => {
    const point = stationFeature.geometry.coordinates;
    const areaIndex = geojson.features.findIndex((feature) =>
      getFeaturePolygons(feature).some((polygon) => pointInPolygon(point, polygon)),
    );

    if (areaIndex >= 0) {
      stationIdsByArea[areaIndex].push(stationFeature.properties.id);
    }
  });

  localAreaStationMembershipCache = {
    geojson,
    areaCount: geojson.features.length,
    stationCount: stationFeatures.length,
    stationSignature,
    stationIdsByArea,
  };

  return stationIdsByArea;
}

function getStationMembershipSignature(stationFeatures) {
  return stationFeatures.map((feature) => feature.properties?.id ?? "").join("|");
}

function compactForecastAreas(areaNames) {
  const sortedNames = sortForecastAreas([...new Set(areaNames.map(normalizeForecastAreaDisplayName))]);
  const displayGroups = {
    ...FORECAST_AREA_GROUP_MEMBERS,
    北陸: [...(FORECAST_AREA_GROUP_MEMBERS.北陸 ?? []), "長野"],
  };
  const groups = Object.entries(displayGroups).map(([name, members]) => ({
    name: normalizeForecastAreaDisplayName(name),
    members: members.map(normalizeForecastAreaDisplayName),
  }));
  const remaining = new Set(sortedNames);
  const compacted = [];

  groups.forEach((group) => {
    if (remaining.has(group.name)) {
      compacted.push(group.name);
      remaining.delete(group.name);
      group.members.forEach((member) => remaining.delete(member));
      return;
    }

    const included = group.members.filter((member) => remaining.has(member));
    if (included.length >= 3 || included.length / group.members.length >= 0.5) {
      compacted.push(group.name);
      included.forEach((member) => remaining.delete(member));
    }
  });

  return sortForecastAreasForDisplay([...compacted, ...remaining]);
}
function normalizeForecastAreaDisplayName(areaName) {
  const normalizedName = String(areaName ?? "").normalize("NFKC").replace(/\s+/g, "");
  if (normalizedName === "奄美群島" || normalizedName === "奄美諸島") return "奄美";
  if (["沖縄本島", "沖縄県本島", "沖縄県大東島", "大東島"].includes(normalizedName)) return normalizedName.includes("大東") ? "大東島" : "沖縄";
  if (normalizedName === "長野") return "北陸";
  return areaName;
}

const FORECAST_AREA_GROUP_MEMBERS = {
  北海道: ["北海道道央", "北海道道南", "北海道道北", "北海道道東"],
  関東: ["東京", "神奈川", "埼玉", "千葉", "茨城", "栃木", "群馬", "山梨"],
  東北: ["青森", "岩手", "宮城", "秋田", "山形", "福島"],
  北陸: ["新潟", "富山", "石川", "福井"],
  東海: ["静岡", "愛知", "岐阜", "三重"],
  近畿: ["滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山"],
  中国: ["鳥取", "島根", "岡山", "広島", "山口"],
  四国: ["徳島", "香川", "愛媛", "高知"],
  九州: ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島"],
};

const FORECAST_AREA_ORDER = [
  "北海道", "北海道道央", "北海道道南", "北海道道北", "北海道道東",
  "東北", "青森", "岩手", "宮城", "秋田", "山形", "福島",
  "関東", "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", "山梨",
  "北陸", "新潟", "富山", "石川", "福井", "長野",
  "東海", "岐阜", "静岡", "愛知", "三重",
  "近畿", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山",
  "中国", "鳥取", "島根", "岡山", "広島", "山口",
  "四国", "徳島", "香川", "愛媛", "高知",
  "九州", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島",
  "奄美群島", "沖縄本島", "大東島", "宮古島", "八重山", "伊豆諸島", "小笠原",
];

const PREFECTURE_NAMES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県",
  "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];

function sortForecastAreas(areaNames) {
  return [...areaNames].sort((a, b) => {
    const diff = forecastAreaSortIndex(a) - forecastAreaSortIndex(b);
    return diff === 0 ? a.localeCompare(b, "ja") : diff;
  });
}

function sortForecastAreasForDisplay(areaNames) {
  return [...areaNames].sort((a, b) => {
    const broadAreaDiff = forecastAreaDisplayGroupIndex(a) - forecastAreaDisplayGroupIndex(b);
    if (broadAreaDiff !== 0) {
      return broadAreaDiff;
    }

    const diff = forecastAreaSortIndex(a) - forecastAreaSortIndex(b);
    return diff === 0 ? a.localeCompare(b, "ja") : diff;
  });
}

function forecastAreaDisplayGroupIndex(areaName) {
  return isBroadForecastArea(areaName) ? 0 : 1;
}

function isBroadForecastArea(areaName) {
  return [
    "北海道", "北海道道央", "北海道道南", "北海道道北", "北海道道東",
    "東北", "関東", "北陸", "東海", "近畿", "中国", "四国", "九州",
    "奄美群島", "沖縄本島", "大東島", "宮古島", "八重山", "伊豆諸島", "小笠原",
  ].includes(areaName);
}

function forecastAreaSortIndex(areaName) {
  const sortName = areaName === "奄美" ? "奄美群島" : areaName === "沖縄" ? "沖縄本島" : areaName;
  const index = FORECAST_AREA_ORDER.indexOf(sortName);
  return index >= 0 ? index : FORECAST_AREA_ORDER.length;
}
function updateEewForecastPanel() {
  if (!els.eewForecastPanel || !els.eewForecastList) {
    return;
  }

  const visible = state.showEewWarningLayer && state.eewWarningForecastAreas.length > 0;
  const signature = [
    visible ? "1" : "0",
    state.eewWarningFinalReport ? "1" : "0",
    state.eewWarningReportNumber ?? "",
    state.epicenterName ?? "",
    state.eewWarningForecastAreas.join("|"),
  ].join("\u001f");
  if (signature === eewForecastPanelRenderSignature) {
    return;
  }
  eewForecastPanelRenderSignature = signature;

  const heading = els.eewForecastPanel.querySelector("h2");
  if (heading) {
    heading.textContent = state.eewWarningFinalReport
      ? "緊急地震速報（警報）最終報"
      : state.eewWarningReportNumber
        ? `緊急地震速報（警報）第${state.eewWarningReportNumber}報`
        : "緊急地震速報（警報）";
  }
  updateEewForecastMessage(heading);
  els.eewForecastPanel.classList.toggle("hidden", !visible);
  els.eewForecastList.replaceChildren(
    ...state.eewWarningForecastAreas.map((areaName) => {
      const item = document.createElement("li");
      item.textContent = areaName;
      return item;
    }),
  );
}

function updateEewForecastMessage(heading) {
  if (!els.eewForecastPanel) {
    return;
  }

  let message = els.eewForecastPanel.querySelector(".eew-forecast-message");
  if (!message) {
    message = document.createElement("p");
    message.className = "eew-forecast-message";
    heading?.after(message);
  }

  const epicenterName = getEewMessageEpicenterAreaName();
  message.textContent = `${epicenterName}で地震  強い揺れに警戒`;
}

function getEewMessageEpicenterAreaName() {
  if (localAreaData?.features?.length) {
    const localArea = findFeatureAtPoint(localAreaData, state.longitude, state.latitude);
    const localAreaName = cleanDisplayAreaName(localArea?.properties?.name);
    if (localAreaName) {
      return localAreaName;
    }
  }

  return cleanDisplayAreaName(state.epicenterName) || "震央";
}

function getEewForecastAreaName(localAreaName) {
  if (!localAreaName) {
    return "不明";
  }
  if (eewForecastAreaNameCache.has(localAreaName)) {
    return eewForecastAreaNameCache.get(localAreaName);
  }
  const forecastAreaName =
    eewForecastAreaData?.areaToForecast?.[localAreaName] ??
    getFallbackEewForecastAreaName(localAreaName);
  eewForecastAreaNameCache.set(localAreaName, forecastAreaName);
  return forecastAreaName;
}

function getFallbackEewForecastAreaName(localAreaName) {
  let forecastAreaName = localAreaName;
  const hokkaidoForecastArea = getHokkaidoEewForecastAreaName(localAreaName);
  if (hokkaidoForecastArea) {
    return hokkaidoForecastArea;
  }
  if (/^東京都/.test(localAreaName)) {
    return "東京";
  }
  if (["伊豆大島", "新島", "神津島", "三宅島", "八丈島"].some((name) => localAreaName.includes(name))) {
    return "伊豆諸島";
  }
  if (localAreaName.includes("小笠原")) {
    return "小笠原";
  }
  if (localAreaName.includes("奄美")) {
    return "奄美群島";
  }
  if (localAreaName.includes("甑")) {
    return "鹿児島";
  }
  if (localAreaName.includes("大東島")) {
    return "大東島";
  }
  if (localAreaName.includes("宮古島")) {
    return "宮古島";
  }
  if (localAreaName.includes("八重山")) {
    return "八重山";
  }
  if (localAreaName.includes("沖縄") || localAreaName.includes("うるま") || localAreaName.includes("金武")) {
    return "沖縄本島";
  }

  const prefecture = PREFECTURE_NAMES.find((name) => localAreaName.startsWith(name));
  if (prefecture) {
    forecastAreaName = prefecture.replace(/[都道府県]$/, "");
  }
  return forecastAreaName;
}

function getHokkaidoEewForecastAreaName(localAreaName) {
  if (
    [
      "石狩地方北部",
      "石狩地方中部",
      "石狩地方南部",
      "後志地方北部",
      "後志地方東部",
      "後志地方西部",
      "空知地方北部",
      "空知地方中部",
      "空知地方南部",
    ].includes(localAreaName)
  ) {
    return "北海道道央";
  }

  if (
    [
      "渡島地方北部",
      "渡島地方東部",
      "渡島地方西部",
      "檜山地方",
      "北海道奥尻島",
      "胆振地方西部",
      "胆振地方中東部",
      "日高地方西部",
      "日高地方中部",
      "日高地方東部",
    ].includes(localAreaName)
  ) {
    return "北海道道南";
  }

  if (
    [
      "上川地方北部",
      "上川地方中部",
      "上川地方南部",
      "留萌地方中北部",
      "留萌地方南部",
      "宗谷地方北部",
      "宗谷地方南部",
      "北海道利尻礼文",
    ].includes(localAreaName)
  ) {
    return "北海道道北";
  }

  if (
    [
      "網走地方",
      "北見地方",
      "紋別地方",
      "十勝地方北部",
      "十勝地方中部",
      "十勝地方南部",
      "釧路地方北部",
      "釧路地方中南部",
      "根室地方北部",
      "根室地方中部",
      "根室地方南部",
    ].includes(localAreaName)
  ) {
    return "北海道道東";
  }

  return null;
}

function buildStationIntensityData(data, elapsedSec = Infinity) {
  const isSimulation = Number.isFinite(elapsedSec);
  const features = [];

  buildStationIntensityFeatures(data).forEach((feature) => {
    if (
      feature.properties.intensityRank < 1 ||
      (isSimulation
        ? feature.properties.pArrivalSec > elapsedSec
        : feature.properties.sArrivalSec > elapsedSec)
    ) {
      return;
    }

    const currentProperties = getCurrentIntensityProperties(feature.properties, elapsedSec);
    features.push({
      ...feature,
      properties: {
        ...feature.properties,
        ...currentProperties,
      },
    });
  });

  return {
    type: "FeatureCollection",
    name: "Observed JMA shindo stations with estimated intensity",
    source: data.source,
    updated: data.updated,
    features,
  };
}

function getCurrentIntensityProperties(properties, elapsedSec = Infinity) {
  const isSimulation = Number.isFinite(elapsedSec);
  const observed = !isSimulation || elapsedSec >= properties.pArrivalSec;
  const waveState = isSimulation && properties.sArrivalSec > elapsedSec ? "p" : "s";
  const riseProfile = getGroundRiseProfile(properties);
  const sTransitionLeadSec = getSWaveTransitionLeadSec(properties);
  const riseProgress = isSimulation
    ? groundAwareRiseProgress(
        elapsedSec - properties.sArrivalSec + sTransitionLeadSec - (properties.sWaveRiseDelaySec ?? 0),
        riseProfile,
      )
    : 1;
  const pWaveProgress = isSimulation
    ? getPWaveRiseProgress(properties, elapsedSec)
    : 1;
  const pWaveTarget = getPWaveIntensityTarget(properties);
  const pWaveIntensity = pWaveTarget * pWaveProgress;
  const rawCurrentIntensityValue =
    waveState === "p"
      ? pWaveIntensity
      : Math.max(pWaveIntensity, properties.predictedIntensityValue * riseProgress);
  const recordedIntensityFloor = getPWaveRecordedIntensityFloor(properties, observed);
  const currentIntensityValue = Math.max(rawCurrentIntensityValue, recordedIntensityFloor);
  const currentClass = getOldScaleDisplayIntensityClassIfNeeded(
    toJmaIntensityClass(currentIntensityValue),
    currentIntensityValue,
    properties,
  );

  return {
    observed,
    waveState,
    riseProgress: Number(riseProgress.toFixed(3)),
    currentIntensityValue: Number(currentIntensityValue.toFixed(2)),
    intensityValue: Number(currentIntensityValue.toFixed(2)),
    intensityLabel: currentClass.label,
    intensityShortLabel: currentClass.shortLabel,
    intensityRank: currentClass.rank,
    intensityColor: currentClass.color,
    intensityTextColor: currentClass.textColor,
    stationDisplaySortKey: getStationDisplaySortKey(currentClass.rank, properties.displaySortStableKey ?? properties.id),
  };
}

function getPWaveRecordedIntensityFloor(properties, observed) {
  if (!observed) {
    return 0;
  }

  const finalIntensity = Number(properties.predictedIntensityValue ?? 0);
  if (finalIntensity < 0.5) {
    return 0;
  }

  const siteResponse = properties.pWaveSiteResponse ?? 0.5;
  const stableVariation = stableUnitInterval(`${properties.displaySortStableKey ?? properties.id ?? ""}|p-record`) - 0.5;
  const floor = 0.53 + siteResponse * 0.06 + stableVariation * 0.06;
  return Math.min(finalIntensity, clamp(floor, 0.5, 0.64));
}

function getPWaveRiseProgress(properties, elapsedSec) {
  const timeSincePArrivalSec = elapsedSec - properties.pArrivalSec - (properties.pWaveRiseDelaySec ?? 0);
  if (timeSincePArrivalSec <= 0) {
    return 0;
  }

  const spGapSec = Math.max(properties.sArrivalSec - properties.pArrivalSec, 0.5);
  const siteResponse = properties.pWaveSiteResponse ?? 0.5;
  const quickOnsetSec = clamp(spGapSec * (0.14 + (1 - siteResponse) * 0.1), 0.24, 1.05);
  const quickOnset = smoothStep(clamp(timeSincePArrivalSec / quickOnsetSec, 0, 1));
  const preSwell = smoothStep(
    clamp(
      (timeSincePArrivalSec - quickOnsetSec * 0.55) /
        Math.max(spGapSec - quickOnsetSec * 0.55, 0.5),
      0,
      1,
    ),
  );
  return clamp(quickOnset * 0.72 + preSwell * 0.28, 0, 1);
}

function getSWaveTransitionLeadSec(properties) {
  const spGapSec = Math.max((properties.sArrivalSec ?? 0) - (properties.pArrivalSec ?? 0), 0.5);
  const siteResponse = properties.pWaveSiteResponse ?? 0.5;
  const finalIntensity = Number(properties.predictedIntensityValue ?? 0);
  const intensityFactor = clamp((finalIntensity - 2.5) / 3.5, 0, 1);
  return clamp(0.35 + spGapSec * 0.1 + siteResponse * 0.18 + intensityFactor * 0.28, 0.42, 1.35);
}

function getPWaveIntensityTarget(properties) {
  const finalIntensity = Number(properties.predictedIntensityValue ?? 0);
  if (finalIntensity < 0.5) {
    return 0;
  }

  const magnitudeFactor = clamp((state.magnitude - 4.7) / 3.3, 0, 1);
  const distanceKm = Number(properties.epicentralDistanceKm ?? 0);
  const distanceFactor = clamp(1 - distanceKm / 820, 0.38, 1);
  const groundFactor = clamp(
    ((properties.groundAmplification ?? EARTHQUAKE_MODEL.defaultSiteAmplification) + 0.45) / 1.2,
    0,
    1,
  );
  const strongMotionFactor = clamp((finalIntensity - 2.5) / 3.6, 0, 1);
  const siteResponse = properties.pWaveSiteResponse ?? 0.5;
  const share =
    0.38 +
    magnitudeFactor * 0.12 +
    groundFactor * 0.15 +
    strongMotionFactor * 0.16 +
    siteResponse * 0.08;
  const pWaveFloor =
    finalIntensity >= 1.5
      ? (0.86 + magnitudeFactor * 0.24 + groundFactor * 0.34 + strongMotionFactor * 0.38 + siteResponse * 0.22) *
        distanceFactor
      : finalIntensity >= 0.5
        ? 0.52 + magnitudeFactor * 0.12 + groundFactor * 0.08 + siteResponse * 0.08
        : 0.25 + magnitudeFactor * 0.08;
  const pWaveCeiling =
    1.35 +
    magnitudeFactor * 0.72 +
    groundFactor * 0.72 +
    strongMotionFactor * 1.28 +
    siteResponse * 0.36;
  const target = Math.max(finalIntensity * share, pWaveFloor);
  return clamp(target, 0, Math.min(finalIntensity * 0.82, pWaveCeiling, 3.55));
}

function getStationWaveResponseProperties(key, finalIntensity, ground = {}) {
  const siteNoise = stableUnitInterval(`${key}|site`);
  const pDelayNoise = stableUnitInterval(`${key}|p-delay`);
  const sDelayNoise = stableUnitInterval(`${key}|s-delay`);
  const avs = Number(ground.groundAvs ?? 400);
  const amplification = Number(ground.groundAmplification ?? EARTHQUAKE_MODEL.defaultSiteAmplification);
  const softness = Number.isFinite(avs) ? clamp((520 - avs) / 430, 0, 1) : 0.35;
  const amplificationFactor = clamp((amplification + 0.45) / 1.45, 0, 1);
  const finalFactor = clamp((Number(finalIntensity) - 1.2) / 4.8, 0, 1);
  const pWaveSiteResponse = clamp(
    0.24 + siteNoise * 0.36 + softness * 0.18 + amplificationFactor * 0.18 + finalFactor * 0.12,
    0,
    1,
  );
  const pWaveRiseDelaySec = clamp(
    pDelayNoise * 0.22 + (1 - pWaveSiteResponse) * 0.12 - finalFactor * 0.08,
    0,
    0.34,
  );
  const sWaveRiseDelaySec = clamp(
    sDelayNoise * 0.34 + (1 - softness) * 0.12 - finalFactor * 0.18,
    -0.18,
    0.38,
  );

  return {
    pWaveSiteResponse: Number(pWaveSiteResponse.toFixed(3)),
    pWaveRiseDelaySec: Number(pWaveRiseDelaySec.toFixed(2)),
    sWaveRiseDelaySec: Number(sWaveRiseDelaySec.toFixed(2)),
  };
}

function getGroundRiseProfile(properties) {
  const avs = properties.groundAvs ?? 400;
  const amplification = properties.groundAmplification ?? EARTHQUAKE_MODEL.defaultSiteAmplification;
  const softness = clamp((520 - avs) / 420, 0, 1);
  const amplificationFactor = clamp((amplification + 0.6) / 1.8, 0, 1);
  const finalIntensityFactor = clamp((Number(properties.predictedIntensityValue ?? 0) - 3.5) / 3.0, 0, 1);
  const epicentralDistanceKm = Number(properties.epicentralDistanceKm ?? Infinity);
  const nearSourceFactor = clamp((120 - epicentralDistanceKm) / 120, 0, 1);
  const nearSourceStrongMotionFactor =
    nearSourceFactor * finalIntensityFactor;
  const waveformProfile = getEarthquakeWaveformProfile();
  const durationSec =
    1.65 +
    softness * 2.35 +
    amplificationFactor * 0.95 +
    waveformProfile.durationExtensionSec * 0.28 -
    finalIntensityFactor * 0.85 +
    nearSourceStrongMotionFactor * 0.24 -
    nearSourceFactor * 0.38;
  const curvature =
    2.25 +
    softness * 0.85 +
    amplificationFactor * 0.7 +
    finalIntensityFactor * 1.15 -
    waveformProfile.slowRise * 0.35 -
    nearSourceStrongMotionFactor * 0.08;

  return {
    durationSec: Math.max(durationSec, 1.15),
    curvature: Math.max(curvature, 1.35),
    lateEnergy: waveformProfile.lateEnergy,
    multiPeak: waveformProfile.multiPeak,
    mainSurgeRatio: clamp(
      0.9 + finalIntensityFactor * 0.07 - waveformProfile.lateEnergy * 0.12 - nearSourceStrongMotionFactor * 0.03,
      0.84,
      0.97,
    ),
    mainMotionOnsetSec: clamp(
      0.62 +
        softness * 0.5 +
        amplificationFactor * 0.18 -
        finalIntensityFactor * 0.26 +
        nearSourceStrongMotionFactor * 0.26 -
        nearSourceFactor * 0.22,
      0.42,
      1.35,
    ),
  };
}

function groundAwareRiseProgress(timeSinceSArrivalSec, profile) {
  if (timeSinceSArrivalSec <= 0) {
    return 0;
  }

  const normalizedTime = timeSinceSArrivalSec / Math.max(profile.durationSec, 0.1);
  if (normalizedTime >= 1) {
    return 1;
  }

  const mainMotionOnsetSec = profile.mainMotionOnsetSec ?? clamp(profile.durationSec * 0.18, 0.65, 1.8);
  const mainMotionSurge =
    smoothStep(clamp(timeSinceSArrivalSec / mainMotionOnsetSec, 0, 1)) *
    (profile.mainSurgeRatio ?? clamp(0.9 - profile.lateEnergy * 0.25, 0.82, 0.94));
  const exponentialEnvelope = 1 - Math.exp(-profile.curvature * normalizedTime);
  const lateEnergy = profile.lateEnergy * 0.58 * smoothStep(clamp((normalizedTime - 0.42) / 0.58, 0, 1));
  const multiPeakEnergy =
    profile.multiPeak * 0.72 *
    (0.45 * smoothStep(clamp((normalizedTime - 0.16) / 0.18, 0, 1)) +
      0.35 * smoothStep(clamp((normalizedTime - 0.38) / 0.2, 0, 1)) +
      0.2 * smoothStep(clamp((normalizedTime - 0.66) / 0.24, 0, 1)));
  return clamp(Math.max(mainMotionSurge, exponentialEnvelope + lateEnergy + multiPeakEnergy), 0, 1);
}

function getEarthquakeWaveformProfile() {
  const magnitudeExcess = Math.max(state.magnitude - 6.5, 0);
  const giantMagnitude = Math.max(state.magnitude - 8.0, 0);
  const offshoreFactor = getOffshoreEpicenterFactor();

  return {
    durationExtensionSec:
      magnitudeExcess * 2.6 +
      offshoreFactor * (1.7 + magnitudeExcess * 2.9) +
      giantMagnitude * 7.5,
    slowRise: clamp(offshoreFactor * 0.14 + giantMagnitude * 0.08, 0, 0.26),
    lateEnergy: clamp(0.07 + offshoreFactor * 0.08 + giantMagnitude * 0.08, 0.07, 0.24),
    multiPeak: clamp(offshoreFactor * 0.12 + giantMagnitude * 0.12, 0, 0.28),
  };
}

function getOffshoreEpicenterFactor() {
  const name = state.epicenterName ?? "";
  if (/沖|海|湾|灘|トラフ|海溝/.test(name)) {
    return 1;
  }
  if (/近海|東方|南方|北西|南東/.test(name)) {
    return 0.75;
  }
  return 0;
}
function getStationDisplaySortKey(intensityRank, stableKey) {
  const rank = Number(intensityRank) || 0;
  return Number((rank * 100000 + stableUnitInterval(`station-sort|${stableKey}`)).toFixed(6));
}

function buildStationIntensityFeatures(data) {
  if (stationIntensityFeatureCache) {
    return stationIntensityFeatureCache;
  }

  const preset = getSelectedPreset();
  if (isOldJmaScaleSyntheticPreset(preset)) {
    stationIntensityFeatureCache = buildOldScaleSyntheticStationFeatures(preset, []);
    return stationIntensityFeatureCache;
  }

  const baseFeatures = data.stations
    .filter((station) => station.active)
    .map((station) => {
      const ground = getGroundModelAt(station.longitude, station.latitude);
      const actualObservation = getPresetStationObservation(station);
      if (preset && !actualObservation) {
        return null;
      }
      const intensityValue = actualObservation
        ? actualObservation.intensityValue
        : estimateIntensityAtPoint(station.longitude, station.latitude);
      const intensityClass = toJmaIntensityClass(intensityValue);
      const epicentralDistanceKm = haversineKilometers(
        [state.longitude, state.latitude],
        [station.longitude, station.latitude],
      );
      const hypocentralDistanceKm = Math.hypot(epicentralDistanceKm, state.depthKm);
      const pArrivalSec = epicentralDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec;
      const sArrivalSec = epicentralDistanceKm / EARTHQUAKE_MODEL.sWaveVelocityKmPerSec;
      const groundAmplification =
        ground?.intensityAmplification ?? EARTHQUAKE_MODEL.defaultSiteAmplification;
      const riseProfile = getGroundRiseProfile({
          groundAvs: ground?.effectiveAvs,
          groundAmplification,
      });
      const waveResponse = getStationWaveResponseProperties(
        `${station.id}|${station.name}|${state.longitude.toFixed(2)}|${state.latitude.toFixed(2)}`,
        intensityValue,
        {
          groundAvs: ground?.effectiveAvs,
          groundAmplification,
        },
      );

      return {
        type: "Feature",
        properties: {
          id: station.id,
          displaySortStableKey: `${station.id}|${station.longitude.toFixed(4)}|${station.latitude.toFixed(4)}`,
          name: station.name,
          areaName: station.areaName,
          address: station.address,
          predictedIntensityValue: Number(intensityValue.toFixed(2)),
          predictedIntensityLabel: intensityClass.label,
          predictedIntensityShortLabel: intensityClass.shortLabel,
          predictedIntensityRank: intensityClass.rank,
          predictedIntensityColor: intensityClass.color,
          actualObserved: Boolean(actualObservation),
          sourceObservationName: actualObservation?.stationName ?? "",
          observationStatus: actualObservation ? "実観測" : preset ? "欠測（当時の観測点なし・補完）" : "推定",
          measuredIntensity:
            actualObservation?.measuredIntensity == null
              ? null
              : Number(actualObservation.measuredIntensity),
          intensityValue: Number(intensityValue.toFixed(2)),
          intensityLabel: intensityClass.label,
          intensityShortLabel: intensityClass.shortLabel,
          intensityRank: intensityClass.rank,
          intensityColor: intensityClass.color,
          intensityTextColor: intensityClass.textColor,
          stationDisplaySortKey: getStationDisplaySortKey(
            intensityClass.rank,
            `${station.id}|${station.longitude.toFixed(4)}|${station.latitude.toFixed(4)}`,
          ),
          groundCode: ground?.code ?? "",
          groundArv: ground?.arv ?? null,
          groundAvs: ground?.avs ?? null,
          groundWm2020Avs: ground?.wm2020Avs ?? null,
          groundWm2020Jcode: ground?.wm2020Jcode ?? null,
          groundAmplification: Number(groundAmplification.toFixed(2)),
          epicentralDistanceKm: Number(epicentralDistanceKm.toFixed(1)),
          hypocentralDistanceKm: Number(hypocentralDistanceKm.toFixed(1)),
          pArrivalSec: Number(pArrivalSec.toFixed(2)),
          sArrivalSec: Number(sArrivalSec.toFixed(2)),
          pWaveSiteResponse: waveResponse.pWaveSiteResponse,
          pWaveRiseDelaySec: waveResponse.pWaveRiseDelaySec,
          sWaveRiseDelaySec: waveResponse.sWaveRiseDelaySec,
          intensityRiseDurationSec: Number(riseProfile.durationSec.toFixed(2)),
          intensityCompleteSec: Number((sArrivalSec + riseProfile.durationSec).toFixed(2)),
        },
        geometry: {
          type: "Point",
          coordinates: [station.longitude, station.latitude],
        },
      };
    })
    .filter(Boolean);

  stationIntensityFeatureCache = baseFeatures;

  return stationIntensityFeatureCache;
}

function buildSubmarineObservationIntensityFeatures(data) {
  const cacheKey = [
    data?.features?.length ?? 0,
    state.longitude.toFixed(4),
    state.latitude.toFixed(4),
    state.depthKm.toFixed(1),
    state.magnitude.toFixed(1),
  ].join("|");
  if (
    submarineObservationFeatureCache.data === data &&
    submarineObservationFeatureCache.key === cacheKey
  ) {
    return submarineObservationFeatureCache.features;
  }

  const features = (data.features ?? [])
    .map((feature) => {
      const [longitude, latitude] = feature.geometry?.coordinates ?? [];
      if (!Number.isFinite(Number(longitude)) || !Number.isFinite(Number(latitude))) {
        return null;
      }

      const lon = Number(longitude);
      const lat = Number(latitude);
      const id = feature.properties?.code || `${lon.toFixed(4)},${lat.toFixed(4)}`;
      const intensityValue = estimateIntensityAtPoint(lon, lat);
      const intensityClass = toJmaIntensityClass(intensityValue);
      const epicentralDistanceKm = haversineKilometers([state.longitude, state.latitude], [lon, lat]);
      const pArrivalSec = epicentralDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec;
      const sArrivalSec = epicentralDistanceKm / EARTHQUAKE_MODEL.sWaveVelocityKmPerSec;
      const waveResponse = getStationWaveResponseProperties(
        `submarine|${id}|${state.longitude.toFixed(2)}|${state.latitude.toFixed(2)}`,
        intensityValue,
        {},
      );

      return {
        type: "Feature",
        properties: {
          ...feature.properties,
          id: `submarine-${id}`,
          displaySortStableKey: `submarine|${id}|${lon.toFixed(4)}|${lat.toFixed(4)}`,
          name: feature.properties?.name || feature.properties?.code || "海底観測点",
          predictedIntensityValue: Number(intensityValue.toFixed(2)),
          predictedIntensityLabel: intensityClass.label,
          predictedIntensityShortLabel: intensityClass.shortLabel,
          predictedIntensityRank: intensityClass.rank,
          predictedIntensityColor: intensityClass.color,
          intensityValue: Number(intensityValue.toFixed(2)),
          intensityLabel: intensityClass.label,
          intensityShortLabel: intensityClass.shortLabel,
          intensityRank: intensityClass.rank,
          intensityColor: intensityClass.color,
          intensityTextColor: intensityClass.textColor,
          groundAmplification: EARTHQUAKE_MODEL.defaultSiteAmplification,
          epicentralDistanceKm: Number(epicentralDistanceKm.toFixed(1)),
          hypocentralDistanceKm: Number(Math.hypot(epicentralDistanceKm, state.depthKm).toFixed(1)),
          pArrivalSec: Number(pArrivalSec.toFixed(2)),
          sArrivalSec: Number(sArrivalSec.toFixed(2)),
          pWaveSiteResponse: waveResponse.pWaveSiteResponse,
          pWaveRiseDelaySec: waveResponse.pWaveRiseDelaySec,
          sWaveRiseDelaySec: waveResponse.sWaveRiseDelaySec,
          submarineObservation: true,
        },
        geometry: {
          type: "Point",
          coordinates: [lon, lat],
        },
      };
    })
    .filter(Boolean);

  submarineObservationFeatureCache = { key: cacheKey, data, features };
  return features;
}

function isOldJmaScaleSyntheticPreset(preset) {
  return Boolean(
    isHyogoNanbuPreset(preset) ||
      preset?.label?.includes("関東大震災"),
  );
}

function isHyogoNanbuPreset(preset) {
  return Boolean(preset?.label?.includes("兵庫県南部地震"));
}

function isNaganoHokubuPreset(preset) {
  return Boolean(preset?.label?.includes("長野県北部"));
}

function getPresetEpicenterNameOverride(preset) {
  if (isHyogoNanbuPreset(preset)) {
    return "大阪湾";
  }
  if (isNaganoHokubuPreset(preset)) {
    return "長野県北部";
  }
  return "";
}

function shouldPreservePresetEpicenterName(preset) {
  return Boolean(getPresetEpicenterNameOverride(preset));
}

function applyPresetEpicenterNameOverride() {
  const preset = getSelectedPreset();
  const epicenterName = getPresetEpicenterNameOverride(preset);
  if (!epicenterName) {
    return;
  }

  state.epicenterName = epicenterName;
  if (els.epicenterRegion) {
    els.epicenterRegion.value = state.epicenterName;
  }
}

function getPresetDisplayIntensityClass(intensityClass, intensityValue, preset) {
  if (!isOldJmaScaleSyntheticPreset(preset)) {
    return intensityClass;
  }

  return getOldJmaScaleIntensityClass(intensityClass, intensityValue);
}

function getOldJmaScaleIntensityClass(intensityClass, intensityValue) {
  if (intensityValue >= 5.5 && intensityValue < 6.5) {
    const colorClass = INTENSITY_CLASSES.find((item) => item.shortLabel === "6+") ?? intensityClass;
    return { ...colorClass, label: "6", shortLabel: "6" };
  }
  if (intensityValue >= 4.5 && intensityValue < 5.5) {
    const colorClass = INTENSITY_CLASSES.find((item) => item.shortLabel === "5+") ?? intensityClass;
    return { ...colorClass, label: "5", shortLabel: "5" };
  }
  return intensityClass;
}

function getOldScaleDisplayIntensityClassIfNeeded(intensityClass, intensityValue, properties) {
  if (!properties?.oldJmaScale) {
    return intensityClass;
  }

  return getOldJmaScaleIntensityClass(intensityClass, intensityValue);
}

function coordinatesKey([longitude, latitude]) {
  return `${Number(longitude).toFixed(4)},${Number(latitude).toFixed(4)}`;
}

const DESIGNATED_CITY_BASE_NAMES = [
  "札幌",
  "仙台",
  "さいたま",
  "千葉",
  "横浜",
  "川崎",
  "相模原",
  "新潟",
  "静岡",
  "浜松",
  "名古屋",
  "京都",
  "大阪",
  "堺",
  "神戸",
  "岡山",
  "広島",
  "北九州",
  "福岡",
  "熊本",
];

function normalizeOldScaleSyntheticMunicipalityName(name, prefecture = "") {
  const displayName = cleanDisplayAreaName(name);
  if (!displayName || prefecture === "東京都") {
    return displayName;
  }

  const localName = stripPrefectureName(displayName);
  for (const city of DESIGNATED_CITY_BASE_NAMES) {
    const cityName = `${city}市`;
    if (localName === cityName) {
      return cityName;
    }

    const suffix = localName.startsWith(cityName)
      ? localName.slice(cityName.length)
      : localName.startsWith(city)
        ? localName.slice(city.length)
        : "";
    if (suffix && suffix.includes("区")) {
      return cityName;
    }
  }

  return localName || displayName;
}

function buildOldScaleSyntheticStationFeatures(preset, existingFeatures) {
  if (!municipalityDisplayData?.features || !preset?.observedStations) {
    return [];
  }
  if (hyogoNanbuSyntheticStationCache?.presetId === preset.id) {
    return hyogoNanbuSyntheticStationCache.features;
  }

  const alreadyPlaced = new Set(
    existingFeatures
      .flatMap((feature) => [feature.properties.sourceObservationName, feature.properties.name])
      .map(normalizeStationNameForMatch)
      .filter(Boolean),
  );
  const municipalityCounts = new Map();
  const placedSyntheticMunicipalityKeys = new Set();
  const features = [];

  const sortedObservations = [...preset.observedStations].sort(
    (a, b) => Number(b.intensityValue ?? 0) - Number(a.intensityValue ?? 0),
  );

  sortedObservations.forEach((observation, index) => {
    const normalizedObservationName = normalizeStationNameForMatch(observation.stationName);
    if (!normalizedObservationName || alreadyPlaced.has(normalizedObservationName)) {
      return;
    }

    const explicitCoordinates =
      Number.isFinite(Number(observation.longitude)) && Number.isFinite(Number(observation.latitude))
        ? [Number(observation.longitude), Number(observation.latitude)]
        : null;
    const municipalityFeature = explicitCoordinates
      ? null
      : findOldScaleSyntheticMunicipalityFeature(observation);
    if (!municipalityFeature && !explicitCoordinates) {
      return;
    }

    const municipalityName = normalizeOldScaleSyntheticMunicipalityName(
      municipalityFeature?.properties?.municipality ?? municipalityFeature?.properties?.name ?? observation.stationName,
      observation.prefecture,
    );
    const stationDisplayName = municipalityName;
    const syntheticMunicipalityKey = explicitCoordinates
      ? `coord:${coordinatesKey(explicitCoordinates)}`
      : `${observation.prefecture ?? ""}|${municipalityName}`;
    if (placedSyntheticMunicipalityKeys.has(syntheticMunicipalityKey)) {
      return;
    }
    placedSyntheticMunicipalityKeys.add(syntheticMunicipalityKey);

    const count = municipalityCounts.get(municipalityName) ?? 0;
    municipalityCounts.set(municipalityName, count + 1);
    const center = explicitCoordinates ?? getMunicipalityRepresentativeCoordinate(municipalityFeature);
    const coordinates = explicitCoordinates
      ? offsetFreeSyntheticStationCoordinate(center, count)
      : offsetSyntheticStationCoordinate(center, count, municipalityFeature);
    const ground = getGroundModelAt(coordinates[0], coordinates[1]);
    const intensityValue = Number(observation.intensityValue);
    const intensityClass = toJmaIntensityClass(intensityValue);
    const intensityLabel = observation.displayIntensityLabel ?? intensityClass.label;
    const intensityShortLabel = observation.displayIntensityShortLabel ?? intensityClass.shortLabel;
    const epicentralDistanceKm = haversineKilometers(
      [state.longitude, state.latitude],
      coordinates,
    );
    const hypocentralDistanceKm = Math.hypot(epicentralDistanceKm, state.depthKm);
    const pArrivalSec = epicentralDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec;
    const sArrivalSec = epicentralDistanceKm / EARTHQUAKE_MODEL.sWaveVelocityKmPerSec;
    const groundAmplification =
      ground?.intensityAmplification ?? EARTHQUAKE_MODEL.defaultSiteAmplification;
    const riseProfile = getGroundRiseProfile({
      groundAvs: ground?.effectiveAvs,
      groundAmplification,
    });
    const waveResponse = getStationWaveResponseProperties(
      `${preset.id}|${observation.stationName}|${coordinates[0].toFixed(3)}|${coordinates[1].toFixed(3)}`,
      intensityValue,
      {
        groundAvs: ground?.effectiveAvs,
        groundAmplification,
      },
    );

    features.push({
      type: "Feature",
      properties: {
        id: `${preset.id}-synthetic-${index}`,
        displaySortStableKey: `${preset.id}|${stationDisplayName}|${coordinates[0].toFixed(4)}|${coordinates[1].toFixed(4)}`,
        name: stationDisplayName,
        areaName: municipalityName,
        address: `${observation.prefecture ?? ""}${municipalityName}`,
        predictedIntensityValue: Number(intensityValue.toFixed(2)),
        predictedIntensityLabel: intensityLabel,
        predictedIntensityShortLabel: intensityShortLabel,
        predictedIntensityRank: intensityClass.rank,
        predictedIntensityColor: intensityClass.color,
        actualObserved: true,
        oldJmaScale: Boolean(observation.oldJmaScale),
        sourceObservationName: observation.stationName,
        observationStatus: "実観測",
        measuredIntensity: null,
        intensityValue: Number(intensityValue.toFixed(2)),
        intensityLabel,
        intensityShortLabel,
        intensityRank: intensityClass.rank,
        intensityColor: intensityClass.color,
        intensityTextColor: intensityClass.textColor,
        stationDisplaySortKey: getStationDisplaySortKey(
          intensityClass.rank,
          `${preset.id}|${stationDisplayName}|${coordinates[0].toFixed(4)}|${coordinates[1].toFixed(4)}`,
        ),
        groundCode: ground?.code ?? "",
        groundArv: ground?.arv ?? null,
        groundAvs: ground?.avs ?? null,
        groundWm2020Avs: ground?.wm2020Avs ?? null,
        groundWm2020Jcode: ground?.wm2020Jcode ?? null,
        groundAmplification: Number(groundAmplification.toFixed(2)),
        epicentralDistanceKm: Number(epicentralDistanceKm.toFixed(1)),
        hypocentralDistanceKm: Number(hypocentralDistanceKm.toFixed(1)),
        pArrivalSec: Number(pArrivalSec.toFixed(2)),
        sArrivalSec: Number(sArrivalSec.toFixed(2)),
        pWaveSiteResponse: waveResponse.pWaveSiteResponse,
        pWaveRiseDelaySec: waveResponse.pWaveRiseDelaySec,
        sWaveRiseDelaySec: waveResponse.sWaveRiseDelaySec,
        intensityRiseDurationSec: Number(riseProfile.durationSec.toFixed(2)),
        intensityCompleteSec: Number((sArrivalSec + riseProfile.durationSec).toFixed(2)),
      },
      geometry: {
        type: "Point",
        coordinates,
      },
    });
  });

  hyogoNanbuSyntheticStationCache = {
    presetId: preset.id,
    features,
  };
  return features;
}

const HYOGO_NANBU_MUNICIPALITY_HINTS = [];
function findOldScaleSyntheticMunicipalityFeature(observation, allMunicipalityFeatures = municipalityDisplayData?.features ?? []) {
  const stationName = normalizeStationNameForMatch(observation.stationName);
  const municipalityFeatures = allMunicipalityFeatures.filter(
    (feature) => feature.properties.prefecture === observation.prefecture,
  );
  const findMatchingFeature = (candidates) => candidates.find((feature) => {
    const municipalityName = normalizeStationNameForMatch(
      feature.properties.municipality || feature.properties.name,
    );
    const nameWithoutPrefecture = normalizeStationNameForMatch(
      stripPrefectureName(feature.properties.municipality || feature.properties.name),
    );
    const nameCandidates = [
      municipalityName,
      nameWithoutPrefecture,
      nameWithoutPrefecture.replace(/[市区町村郡]$/u, ""),
    ].filter((name) => name.length >= 2);

    return nameCandidates.some((name) =>
      stationName.includes(name) ||
      name.includes(stationName) ||
      stationName.includes(name.replace(/[市区町村郡]$/u, "")),
    );
  });
  return findMatchingFeature(municipalityFeatures) ?? findMatchingFeature(allMunicipalityFeatures);
}
function getMunicipalityRepresentativeCoordinate(feature) {
  const stableInteriorCoordinate = getStableInteriorCoordinate(feature);
  if (stableInteriorCoordinate) {
    return stableInteriorCoordinate;
  }

  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  forEachCoordinate(feature.geometry.coordinates, ([lng, lat]) => {
    minLng = Math.min(minLng, lng);
    minLat = Math.min(minLat, lat);
    maxLng = Math.max(maxLng, lng);
    maxLat = Math.max(maxLat, lat);
  });

  const center = [
    Number(((minLng + maxLng) / 2).toFixed(5)),
    Number(((minLat + maxLat) / 2).toFixed(5)),
  ];
  if (pointInFeature(center, feature)) {
    return center;
  }

  const polygonCenters = getFeaturePolygons(feature)
    .map((polygon) => getRingCentroidCoordinate(polygon[0]))
    .filter((coordinate) => coordinate && pointInFeature(coordinate, feature));
  if (polygonCenters.length > 0) {
    return getNearestCoordinate(center, polygonCenters);
  }

  const gridCoordinate = getInteriorGridCoordinate(feature, center, minLng, minLat, maxLng, maxLat);
  if (gridCoordinate) {
    return gridCoordinate;
  }

  const nearestPoint = getNearestPointOnFeature(center, feature).point;
  return [Number(nearestPoint[0].toFixed(5)), Number(nearestPoint[1].toFixed(5))];
}

function getStableInteriorCoordinate(feature) {
  const polygons = getFeaturePolygons(feature)
    .map((polygon) => ({
      polygon,
      area: Math.abs(getLinearRingArea(polygon[0])),
    }))
    .sort((a, b) => b.area - a.area);

  for (const item of polygons) {
    const coordinate = getDeepInteriorCoordinateForPolygon(item.polygon);
    if (coordinate && pointInFeature(coordinate, feature)) {
      return coordinate;
    }
  }

  return null;
}

function getDeepInteriorCoordinateForPolygon(polygon) {
  const outerRing = polygon?.[0];
  if (!outerRing?.length) {
    return null;
  }

  const box = outerRing.reduce(
    (current, [lng, lat]) => ({
      minLng: Math.min(current.minLng, lng),
      minLat: Math.min(current.minLat, lat),
      maxLng: Math.max(current.maxLng, lng),
      maxLat: Math.max(current.maxLat, lat),
    }),
    { minLng: Infinity, minLat: Infinity, maxLng: -Infinity, maxLat: -Infinity },
  );
  const centroid = getRingCentroidCoordinate(outerRing) ?? [
    (box.minLng + box.maxLng) / 2,
    (box.minLat + box.maxLat) / 2,
  ];
  const candidates = [];
  const gridSteps = 17;

  for (let lngIndex = 1; lngIndex < gridSteps; lngIndex += 1) {
    for (let latIndex = 1; latIndex < gridSteps; latIndex += 1) {
      const candidate = [
        Number((box.minLng + ((box.maxLng - box.minLng) * lngIndex) / gridSteps).toFixed(5)),
        Number((box.minLat + ((box.maxLat - box.minLat) * latIndex) / gridSteps).toFixed(5)),
      ];
      if (!pointInPolygon(candidate, polygon)) {
        continue;
      }

      candidates.push({
        coordinate: candidate,
        edgeDistanceKm: getDistanceToPolygonBoundaryKilometers(candidate, polygon),
        centerDistanceKm: haversineKilometers(candidate, centroid),
      });
    }
  }

  if (pointInPolygon(centroid, polygon)) {
    candidates.push({
      coordinate: [Number(centroid[0].toFixed(5)), Number(centroid[1].toFixed(5))],
      edgeDistanceKm: getDistanceToPolygonBoundaryKilometers(centroid, polygon),
      centerDistanceKm: 0,
    });
  }

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort(
    (a, b) =>
      b.edgeDistanceKm - a.edgeDistanceKm ||
      a.centerDistanceKm - b.centerDistanceKm,
  );
  return candidates[0].coordinate;
}

function getDistanceToPolygonBoundaryKilometers(point, polygon) {
  return polygon.reduce(
    (minimum, ring) => Math.min(minimum, distanceToRingKilometers(point, ring)),
    Infinity,
  );
}

function getLinearRingArea(ring) {
  if (!ring?.length) {
    return 0;
  }

  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [lng1, lat1] = ring[index];
    const [lng2, lat2] = ring[index + 1];
    area += lng1 * lat2 - lng2 * lat1;
  }
  return area / 2;
}

function getRingCentroidCoordinate(ring) {
  if (!ring?.length) {
    return null;
  }

  let twiceArea = 0;
  let centroidLng = 0;
  let centroidLat = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [lng1, lat1] = ring[index];
    const [lng2, lat2] = ring[index + 1];
    const cross = lng1 * lat2 - lng2 * lat1;
    twiceArea += cross;
    centroidLng += (lng1 + lng2) * cross;
    centroidLat += (lat1 + lat2) * cross;
  }

  if (Math.abs(twiceArea) < 1e-12) {
    return null;
  }

  return [
    Number((centroidLng / (3 * twiceArea)).toFixed(5)),
    Number((centroidLat / (3 * twiceArea)).toFixed(5)),
  ];
}

function getInteriorGridCoordinate(feature, center, minLng, minLat, maxLng, maxLat) {
  const candidates = [];
  const gridSteps = 9;
  for (let lngIndex = 1; lngIndex < gridSteps; lngIndex += 1) {
    for (let latIndex = 1; latIndex < gridSteps; latIndex += 1) {
      const candidate = [
        Number((minLng + ((maxLng - minLng) * lngIndex) / gridSteps).toFixed(5)),
        Number((minLat + ((maxLat - minLat) * latIndex) / gridSteps).toFixed(5)),
      ];
      if (pointInFeature(candidate, feature)) {
        candidates.push(candidate);
      }
    }
  }

  return candidates.length > 0 ? getNearestCoordinate(center, candidates) : null;
}

function getNearestCoordinate(origin, coordinates) {
  return coordinates.reduce((nearest, coordinate) =>
    haversineKilometers(origin, coordinate) < haversineKilometers(origin, nearest)
      ? coordinate
      : nearest,
  );
}

function offsetSyntheticStationCoordinate(center, index, feature = null) {
  if (index === 0) {
    return center;
  }

  const angle = index * 2.399963229728653;
  const radius = 0.008 * Math.sqrt(index);
  const coordinate = [
    Number((center[0] + Math.cos(angle) * radius).toFixed(5)),
    Number((center[1] + Math.sin(angle) * radius).toFixed(5)),
  ];
  return feature && !pointInFeature(coordinate, feature) ? center : coordinate;
}

function offsetFreeSyntheticStationCoordinate(center, index) {
  if (index === 0) {
    return center;
  }

  const angle = index * 2.399963229728653;
  const radius = 0.006 * Math.sqrt(index);
  return [
    Number((center[0] + Math.cos(angle) * radius).toFixed(5)),
    Number((center[1] + Math.sin(angle) * radius).toFixed(5)),
  ];
}

function estimateMaxIntensityForFeature(feature) {
  const epicenter = [state.longitude, state.latitude];
  const nearestPoint = getNearestPointOnFeature(epicenter, feature, {
    polygons: getFeatureIntensityDistancePolygons(feature),
  });
  return estimateIntensityAtPoint(nearestPoint.point[0], nearestPoint.point[1], nearestPoint.distanceKm);
}

function estimateIntensityAtPoint(longitude, latitude, knownEpicentralDistanceKm = null) {
  const epicenter = [state.longitude, state.latitude];
  const epicentralDistanceKm =
    knownEpicentralDistanceKm ?? haversineKilometers(epicenter, [longitude, latitude]);
  const effectiveEpicentralDistanceKm = getEffectiveEpicentralDistance(epicentralDistanceKm);
  const hypocentralDistanceKm = Math.hypot(effectiveEpicentralDistanceKm, state.depthKm);
  const ground = getGroundModelAt(longitude, latitude);

  return estimateInstrumentalIntensity({
    magnitude: state.magnitude,
    hypocentralDistanceKm,
    siteAmplification: ground?.intensityAmplification ?? EARTHQUAKE_MODEL.defaultSiteAmplification,
  });
}

function getEffectiveEpicentralDistance(epicentralDistanceKm) {
  const ruptureLengthKm = estimateRuptureLengthKm();
  const finiteFaultReductionKm =
    ruptureLengthKm *
    (EARTHQUAKE_MODEL.finiteFaultReductionBase +
      getOffshoreEpicenterFactor() * EARTHQUAKE_MODEL.finiteFaultReductionOffshore);
  return Math.max(epicentralDistanceKm - finiteFaultReductionKm, 1);
}

function estimateRuptureLengthKm() {
  if (state.magnitude < 6.6) {
    return 0;
  }

  return clamp(10 ** (-2.44 + 0.59 * state.magnitude), 0, 520);
}

function estimateInstrumentalIntensity({
  magnitude,
  hypocentralDistanceKm,
  siteAmplification = EARTHQUAKE_MODEL.defaultSiteAmplification,
}) {
  const distance = Math.max(hypocentralDistanceKm, 1);
  const magnitudeTerm = getMagnitudeIntensityTerm(magnitude);
  const giantMagnitudeSaturation =
    EARTHQUAKE_MODEL.giantMagnitudeSaturationFactor *
    Math.max(magnitude - EARTHQUAKE_MODEL.giantMagnitudeSaturationStart, 0) ** 2;
  return clamp(
    magnitudeTerm -
      giantMagnitudeSaturation -
      EARTHQUAKE_MODEL.intensityDistanceLogAttenuation * Math.log10(distance + 20) -
      EARTHQUAKE_MODEL.intensityDistanceLinearAttenuation * distance +
      siteAmplification -
      EARTHQUAKE_MODEL.intensityBaselineDamping,
    0,
    7,
  );
}

function getMagnitudeEnergyLog10(magnitude) {
  // Magnitude represents log-scaled earthquake energy: log10E = 4.8 + 1.5M.
  // Ground shaking is compressed back to an intensity contribution below.
  return 4.8 + 1.5 * magnitude;
}

function getMagnitudeIntensityTerm(magnitude) {
  const energyLog10 = getMagnitudeEnergyLog10(magnitude);
  return (EARTHQUAKE_MODEL.intensityMagnitudeSlope / 1.5) * (energyLog10 - 4.8);
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

  const [arv, avs, s0, maxDepthM, wm2020Avs, wm2020Jcode] = values;
  const effectiveAvs = Number.isFinite(wm2020Avs) && wm2020Avs > 0 ? wm2020Avs : avs;
  return {
    code,
    arv,
    avs,
    s0,
    maxDepthM,
    wm2020Avs,
    wm2020Jcode,
    effectiveAvs,
    intensityAmplification: groundToIntensityAmplification({ arv, avs: effectiveAvs, maxDepthM }),
  };
}

function groundToIntensityAmplification({ arv, avs, maxDepthM }) {
  const velocityAmplification = arvToIntensityAmplification(arv);
  const shallowSoftness = Number.isFinite(avs) ? clamp((420 - avs) / 360, -0.28, 0.45) : 0;
  const basinAmplification = Number.isFinite(maxDepthM)
    ? clamp(Math.log10(Math.max(maxDepthM, 100) / 900) * 0.18, -0.08, 0.16)
    : 0;

  return clamp(velocityAmplification + shallowSoftness * 0.45 + basinAmplification, -0.45, 0.75);
}

function arvToIntensityAmplification(arv) {
  if (!Number.isFinite(arv) || arv <= 0) {
    return EARTHQUAKE_MODEL.defaultSiteAmplification;
  }

  // ARV is a peak velocity amplification factor. JMA instrumental intensity is
  // logarithmic, so use a modest log10 correction to avoid over-amplifying.
  return clamp(1.05 * Math.log10(arv), -0.35, 0.62);
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
    isPointInFeatureBounds(feature, longitude, latitude) &&
    getFeaturePolygons(feature).some((polygon) => pointInPolygon([longitude, latitude], polygon)),
  );
}

function findEpicenterAreaAtPoint(geojson, longitude, latitude) {
  const sourceLongitude = toEpicenterAreaSourceLongitude(longitude);
  return geojson.features.find((feature) =>
    getFeaturePolygons(feature).some((polygon) => pointInPolygon([sourceLongitude, latitude], polygon)),
  );
}

function toEpicenterAreaSourceLongitude(longitude) {
  if (!Number.isFinite(longitude)) {
    return longitude;
  }

  return longitude < 0 ? longitude + 360 : longitude;
}

function isPointInFeatureBounds(feature, longitude, latitude) {
  const bounds = feature.properties?.bbox ?? feature.bbox;
  if (!bounds) {
    return true;
  }

  return isPointInBoundsArray(bounds, longitude, latitude);
}

function isPointInBoundsArray(bounds, longitude, latitude) {
  if (!Array.isArray(bounds) || bounds.length < 4) {
    return false;
  }

  return (
    longitude >= Number(bounds[0]) &&
    latitude >= Number(bounds[1]) &&
    longitude <= Number(bounds[2]) &&
    latitude <= Number(bounds[3])
  );
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

function getFeatureIntensityDistancePolygons(feature) {
  const cached = intensityDistanceGeometryCache.get(feature);
  if (cached) {
    return cached;
  }

  const polygons = getFeaturePolygons(feature)
    .map(simplifyIntensityDistancePolygon)
    .filter((polygon) => polygon.length);
  const result = polygons.length ? polygons : getFeaturePolygons(feature);
  intensityDistanceGeometryCache.set(feature, result);
  return result;
}

function simplifyIntensityDistancePolygon(polygon) {
  const rings = polygon
    .map(simplifyIntensityDistanceRing)
    .filter((ring) => ring.length >= 4);
  return rings.length ? rings : polygon;
}

function simplifyIntensityDistanceRing(ring) {
  if (!Array.isArray(ring) || ring.length <= INTENSITY_DISTANCE_SIMPLIFY_MIN_POINTS) {
    return ring;
  }

  const closed = coordinatesEqual(ring[0], ring.at(-1));
  const openRing = closed ? ring.slice(0, -1) : ring;
  const simplified = simplifyCoordinateLine(
    openRing,
    INTENSITY_DISTANCE_SIMPLIFY_TOLERANCE_DEGREES,
  );

  if (simplified.length < 3) {
    return ring;
  }

  const result = closed ? [...simplified, [...simplified[0]]] : simplified;
  return result.length >= 4 ? result : ring;
}

function simplifyCoordinateLine(points, tolerance) {
  if (!Array.isArray(points) || points.length <= 3 || tolerance <= 0) {
    return points;
  }

  let maxDistance = 0;
  let maxIndex = 0;
  const start = points[0];
  const end = points.at(-1);

  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = perpendicularDistanceDegrees(points[index], start, end);
    if (distance > maxDistance) {
      maxDistance = distance;
      maxIndex = index;
    }
  }

  if (maxDistance <= tolerance) {
    return [start, end];
  }

  return [
    ...simplifyCoordinateLine(points.slice(0, maxIndex + 1), tolerance).slice(0, -1),
    ...simplifyCoordinateLine(points.slice(maxIndex), tolerance),
  ];
}

function perpendicularDistanceDegrees(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) {
    return Math.hypot(point[0] - start[0], point[1] - start[1]);
  }

  return Math.abs(dy * point[0] - dx * point[1] + end[0] * start[1] - end[1] * start[0]) /
    Math.hypot(dx, dy);
}

function coordinatesEqual(a, b) {
  return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}

function pointInPolygon(point, polygon) {
  return pointInRing(point, polygon[0]) && polygon.slice(1).every((ring) => !pointInRing(point, ring));
}

function pointInFeature(point, feature) {
  return getFeaturePolygons(feature).some((polygon) => pointInPolygon(point, polygon));
}

function getNearestPointOnFeature(point, feature, options = {}) {
  let nearest = {
    point,
    distanceKm: Infinity,
  };

  for (const polygon of options.polygons ?? getFeaturePolygons(feature)) {
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
  const startLat = toRadians(start[1]);
  const endLat = toRadians(end[1]);
  const deltaLat = toRadians(end[1] - start[1]);
  const deltaLon = toRadians(end[0] - start[0]);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(startLat) * Math.cos(endLat) * Math.sin(deltaLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function toDegrees(value) {
  return (value * 180) / Math.PI;
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

function forEachCoordinate(coordinates, callback) {
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    return;
  }

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

function smoothStep(value) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function stableUnitInterval(value) {
  let hash = 2166136261;
  const text = String(value ?? "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}
