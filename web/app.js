const JMA_LOCAL_AREAS_URL = "./data/jma_local_areas_simplified_10.geojson";
const JMA_EEW_FORECAST_AREAS_URL = "./data/jma_eew_forecast_areas.json";
const JMA_EPICENTER_AREAS_URL = "./data/jma_epicenter_areas.geojson";
const PLATE_BOUNDARIES_URL = "./data/plate_boundaries.geojson";
const ACTIVE_FAULT_SEGMENTS_URL = "./data/activefault_japan_segments.geojson";
const SUBMARINE_OBSERVATION_POINTS_URL = "./data/submarine_observation_points.geojson";
const SURROUNDING_LAND_URL = "./data/surrounding_land.geojson";
const MUNICIPALITY_BOUNDARIES_URL = "./data/japan_municipalities_simplified_50.geojson";
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
const COMMUNITY_MAP_LIGHT_TILE_URLS = [
  "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
];
const COMMUNITY_MAP_DARK_TILE_URLS = [
  "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
];
const COMMUNITY_MAP_STYLE_STORAGE_KEY = "we-simulator-community-map-style";
const COMMUNITY_LOCATION_MARKER_VISIBLE_KEY = "we-simulator-community-location-marker-visible";
const COMMUNITY_MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const COMMUNITY_MAP_FALLBACK_CENTER = [137.2, 37.0];
const COMMUNITY_MAP_FALLBACK_ZOOM = 3.5;
const COMMUNITY_MAP_DEFAULT_ZOOM = 8;
const COMMUNITY_MAP_CURRENT_LOCATION_ZOOM = 12;
const SIMULATION_MAP_MAX_ZOOM = 8;
const HISTORY_MAP_DEFAULT_CENTER = [137.2, 37.0];
const HISTORY_MAP_DEFAULT_ZOOM = 4.2;
let COMMUNITY_POST_TAGS = [
  { id: "safety", label: "防災共有" },
  { id: "weather", label: "気象報告" },
  { id: "disaster", label: "災害報告" },
];
const COMMUNITY_POST_VIDEO_MAX_SECONDS = 30;
const COMMUNITY_POST_VAGUE_LOCATION_RADIUS_METERS = 1000;
const COMMUNITY_POST_VAGUE_LOCATION_MAX_ATTEMPTS = 120;
let COMMUNITY_POST_OPTIONAL_TAGS = [];
const ADMIN_PARENT_TOKEN_KEY = "weather-earthquake-admin-parent-token";
const COMMUNITY_ACCOUNT_STORAGE_KEY = "we-simulator-community-account";
const CURRENT_LOCATION_ENABLED_KEY = "weather-earthquake-current-location-enabled";
const CURRENT_LOCATION_LAST_COORDS_KEY = "weather-earthquake-current-location-last-coords";
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
const WEATHER_FORECASTER_QUIZ_URL = "./data/weather_forecaster_quiz_questions.json";
const WEATHER_QUIZ_GOOD_QUESTION_KEYS_STORAGE_KEY = "weather-earthquake-weather-quiz-good-question-keys-v1";
let weatherForecasterQuizItems = null;
let weatherForecasterQuizLoadPromise = null;
const MAINTENANCE_STATUS_POLL_MS = 60000;
const APPEARANCE_THEME_KEY = "weather-earthquake-appearance-theme";
const DEFAULT_APPEARANCE_THEME = "dark";
const INTENSITY_COLOR_SCHEME_KEY = "weather-earthquake-intensity-color-scheme";
const LOCAL_PARENT_UNAVAILABLE_LABEL = "Localサーバーでは\n親端末に設定できません";

const INITIAL_CENTER = [139.767, 35.681];
const INITIAL_ZOOM = 5.6;
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
const SIMULATION_END_GRACE_SEC = 8;
const SIMULATION_ORIGIN_OFFSET_SEC = 1.4;
const SIMULATION_DATA_UPDATE_HZ = 2;
const SIMULATION_TIMELINE_PX_PER_SEC = 56;
const SIMULATION_TIMELINE_START_PX = 64;
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
const FAULT_MODE_LONG_PRESS_MS = 650;
const FAULT_MODE_LONG_PRESS_MOVE_TOLERANCE_PX = 12;
const ACTIVE_FAULT_AREA_WIDTH_KM = 15;
const FAULT_SOURCE_SAMPLE_MAX_INTERVALS = 16;
const FAULT_SOURCE_SAMPLE_MIN_SPACING_KM = 12;
const FAULT_MODEL_PRESETS = {
  "nankai-trough": {
    name: "南海トラフ巨大地震",
    magnitude: "Mw9クラス",
    region: "駿河湾から日向灘まで",
    modelType: "最大クラス想定震源域・6セグメント強震断層モデル",
    segments: ["駿河湾域", "遠州海盆域", "熊野灘海盆域", "室戸舟状海盆域", "土佐海盆域", "日向灘域"],
    summary: "駿河湾から日向灘まで、海溝軸側を含む約14万km²の最大クラス想定震源域です。内部を6区分し、各セグメントに強震動生成域（SMGA）を置くモデルです。",
    detail: "地図の外形は内閣府公表の想定震源域全体を表示します。揺れの計算では、その内側に設定される強震断層域とSMGAを近似した震源列を使用します。",
    sourceLabel: "内閣府「南海トラフ巨大地震モデル・被害想定手法検討会」地震モデル報告書（2025年）",
    sourceUrl: "https://www.bousai.go.jp/jishin/nankai/kento_wg/pdf/honbun.pdf",
    magnitudeValue: 9.0,
    depthKm: 20,
    path: [[130.95, 31.55], [132.1, 32.05], [133.35, 32.45], [134.65, 32.85], [135.9, 33.3], [137.1, 33.85], [138.35, 34.55]],
    areaSides: {
      // Landward edge and Nankai-trough-side edge of the maximum-class source region.
      // Extra vertices preserve the Hyuga-nada bulge, Kii-channel neck, and Suruga-bay reach.
      left: [
        [130.45, 31.35], [130.62, 31.95], [131.02, 32.48], [131.62, 32.88],
        [132.35, 33.20], [133.15, 33.48], [133.95, 33.68], [134.65, 33.72],
        [135.18, 33.55], [135.62, 33.72], [135.92, 34.12], [136.22, 34.52],
        [136.72, 34.82], [137.28, 34.98], [137.88, 35.02], [138.38, 35.30],
        [138.72, 35.16],
      ],
      right: [
        [130.42, 30.99], [130.77, 30.83], [131.31, 30.91], [131.91, 31.09],
        [132.61, 31.32], [133.34, 31.56], [134.07, 31.84], [134.72, 32.09],
        [135.25, 32.33], [135.72, 32.43], [136.11, 32.58], [136.51, 32.79],
        [136.97, 33.03], [137.41, 33.29], [137.82, 33.58], [138.23, 33.92],
        [138.49, 34.32],
      ],
    },
  },
  "kuril-trench": {
    name: "千島海溝（十勝・根室沖）モデル",
    magnitude: "Mw9.3",
    magnitudeNote: "津波断層モデルの規模",
    region: "襟裳岬より東側の十勝・根室沖",
    modelType: "最大クラス強震・津波断層モデル",
    segments: ["十勝沖", "根室沖", "千島海溝沿い"],
    summary: "津波堆積物を説明する最大クラスの津波断層域に、過去の地震活動を参考に強震動生成域（SMGA）を配置した想定です。",
    detail: "日本海溝モデルとは別々に発生する前提です。領域外形は内閣府公表図を基に地図表示用に近似しています。",
    sourceLabel: "内閣府「日本海溝・千島海溝沿いの巨大地震モデル検討会」最終報告",
    sourceUrl: "https://www.bousai.go.jp/jishin/nihonkaiko_chishima/model/pdf/hokoku_honbun.pdf",
    magnitudeValue: 9.3,
    depthKm: 25,
    path: [[143.6, 41.9], [144.45, 42.45], [145.4, 43.0], [146.5, 43.55], [147.7, 44.15], [149.0, 44.85], [150.3, 45.6]],
    areaSides: {
      left: [[143.15, 42.05], [143.9, 42.7], [144.85, 43.3], [145.95, 43.85], [147.2, 44.45], [148.55, 45.15], [150.05, 46.15]],
      right: [[143.95, 41.55], [144.9, 42.05], [145.95, 42.55], [147.05, 43.05], [148.35, 43.65], [149.75, 44.35], [151.55, 45.45]],
    },
  },
  "japan-trench": {
    name: "日本海溝（三陸・日高沖）モデル",
    magnitude: "Mw9.1",
    magnitudeNote: "津波断層モデルの規模",
    region: "岩手県沖から北海道日高地方の沖合",
    modelType: "最大クラス強震・津波断層モデル",
    segments: ["三陸沖北部", "青森県東方沖", "日高沖"],
    summary: "津波堆積物を説明する最大クラスの津波断層域に、過去の地震活動を参考に強震動生成域（SMGA）を配置した想定です。",
    detail: "千島海溝モデルとは別々に発生する前提です。領域外形は内閣府公表図を基に地図表示用に近似しています。",
    sourceLabel: "内閣府「日本海溝・千島海溝沿いの巨大地震モデル検討会」最終報告",
    sourceUrl: "https://www.bousai.go.jp/jishin/nihonkaiko_chishima/model/pdf/hokoku_honbun.pdf",
    magnitudeValue: 9.1,
    depthKm: 25,
    path: [[143.1, 38.8], [143.2, 39.5], [143.3, 40.2], [143.35, 40.9], [143.4, 41.6], [143.45, 42.15]],
    areaSides: {
      left: [[142.15, 38.65], [142.1, 39.3], [142.1, 40.0], [142.15, 40.7], [142.35, 41.45], [142.95, 42.2]],
      right: [[144.0, 38.55], [144.15, 39.3], [144.25, 40.0], [144.35, 40.7], [144.25, 41.5], [143.9, 42.3]],
    },
  },
};
const NANKAI_RUPTURE_CASES = {
  full: {
    label: "全割れケース",
  },
  east: {
    label: "半割れケース（東側）",
    name: "南海トラフ地震（半割れ・東側）",
    magnitude: "Mw8クラス",
    magnitudeValue: 8.6,
    region: "紀伊半島沖から駿河湾側",
    modelType: "紀伊半島以東の半割れモデル",
    segments: ["熊野灘海盆域", "遠州海盆域", "駿河湾域"],
    pathRange: [3, null],
    areaRange: [8, null],
  },
  west: {
    label: "半割れケース（西側）",
    name: "南海トラフ地震（半割れ・西側）",
    magnitude: "Mw8クラス",
    magnitudeValue: 8.7,
    region: "日向灘から紀伊半島沖側",
    modelType: "紀伊半島以西の半割れモデル",
    segments: ["日向灘域", "土佐海盆域", "室戸舟状海盆域", "熊野灘海盆域"],
    pathRange: [0, 4],
    areaRange: [0, 10],
  },
};
const LIGHT_DEFERRED_DATA_DELAY_MS = 700;
const SIMULATION_DEFERRED_DATA_DELAY_MS = 0;
const STATION_DEFERRED_DATA_DELAY_MS = 3200;
const PRESET_DEFERRED_DATA_DELAY_MS = 3800;
const PLATE_BOUNDARY_DEFERRED_DATA_DELAY_MS = 11000;
const EARTHQUAKE_PRESETS = [];

const INTENSITY_INFORMATION_GRAY = "#d9dee5";
const INTENSITY_BOUNDARY_LIGHT = "#cbd2da";
const INTENSITY_BOUNDARY_DARK = "#37424d";
const INTENSITY_WHITE_TEXT_LABELS = new Set(["3", "6-", "6+", "7"]);
const INTENSITY_CLASSES = [
  { label: "0", shortLabel: "0", min: 0, color: INTENSITY_INFORMATION_GRAY, textColor: "#1f2937", rank: 0 },
  { label: "1", shortLabel: "1", min: 0.5, color: INTENSITY_INFORMATION_GRAY, textColor: "#1f2937", rank: 1 },
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
const INTENSITY_COLOR_SCHEME_OPTIONS = [
  ["normal", "気象庁配色"],
  ["high", "高コントラスト"],
  ["low", "低コントラスト"],
  ["p", "P型色覚"],
  ["d", "D型色覚"],
  ["t", "T型色覚"],
  ["a", "A型色覚"],
];

function getIntensitySchemeTextColor(scheme, key) {
  return scheme !== INTENSITY_COLOR_SCHEMES.a && INTENSITY_WHITE_TEXT_LABELS.has(String(key))
    ? "#ffffff"
    : scheme?.textColors?.[key] ?? "#111827";
}

function getIntensityBoundaryColor(intensityClass) {
  return getStationBoundaryColor({ intensityTextColor: intensityClass?.textColor });
}

function getStationBoundaryColor(properties) {
  return String(properties?.intensityTextColor ?? "").toLowerCase() === "#ffffff"
    ? INTENSITY_BOUNDARY_LIGHT
    : INTENSITY_BOUNDARY_DARK;
}

function getStoredIntensityColorScheme() {
  try {
    const value = localStorage.getItem(INTENSITY_COLOR_SCHEME_KEY);
    return INTENSITY_COLOR_SCHEMES[value] ? value : "normal";
  } catch (_error) {
    return "normal";
  }
}

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
  showRegionLayer: true,
  showEewWarningLayer: false,
  showPlateBoundaryLayer: false,
  showFaultLayer: false,
  selectedPresetId: "",
  presetFilterText: "",
  presetSortKey: null,
  presetSortDirection: "desc",
  intensityColorScheme: getStoredIntensityColorScheme(),
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
  sourceModel: "point",
  faultModelId: "rectangle",
  faultNankaiCase: "full",
  activeFaultSegmentId: "",
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
  currentLocationRequestButton: document.querySelector("#request-current-location"),
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
  mapLayerControlButton: document.querySelector("#map-layer-control-button"),
  mapLayerControlPanel: document.querySelector("#map-layer-control-panel"),
  setupSheetToggle: document.querySelector("#setup-sheet-toggle"),
  simulationSheetToggle: document.querySelector("#simulation-sheet-toggle"),
  setupPanel: document.querySelector("#setup-panel"),
  simulationPanel: document.querySelector("#simulation-panel"),
  simulationStart: document.querySelector("#simulation-start"),
  simulationRewind: document.querySelector("#simulation-rewind"),
  simulationPause: document.querySelector("#simulation-pause"),
  simulationStop: document.querySelector("#simulation-stop"),
  simulationMaxIntensity: document.querySelector("#simulation-max-intensity"),
  simulationMagnitude: document.querySelector("#simulation-magnitude"),
  simulationEpicenter: document.querySelector("#simulation-epicenter"),
  simulationRegionName: document.querySelector("#simulation-region-name"),
  simulationDepth: document.querySelector("#simulation-depth"),
  simulationOriginTime: document.querySelector("#simulation-origin-time"),
  simulationTime: document.querySelector("#simulation-time"),
  simulationProgressTrack: document.querySelector("#simulation-progress-track"),
  simulationProgressCanvas: document.querySelector("#simulation-progress-canvas"),
  simulationProgressFill: document.querySelector("#simulation-progress-fill"),
  simulationProgressEvents: document.querySelector("#simulation-progress-events"),
  simulationProgressNow: document.querySelector("#simulation-progress-now"),
  simulationProgressTime: document.querySelector("#simulation-progress-time"),
  simulationMaxAreaList: document.querySelector("#simulation-max-area-list"),
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
let municipalityBoundaryData;
let municipalityBoundaryLoadPromise;
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
let presetStationObservationMatchCache = { presetId: "", matches: new Map() };
let presetDetailLoadingId = "";
const earthquakePresetDetailCache = new Map();
const earthquakePresetDetailPromiseCache = new Map();
const presetResolvedObservationByStationIdCache = new Map();
const presetObservationIndexPromiseCache = new Map();
const EARTHQUAKE_PRESET_CACHE_NAME = "we-simulator-earthquake-presets-v1";
let presetPickerScrollClampFrame = 0;
let presetPickerTouchStart = null;
let sourceInfoScrollClampFrame = 0;
let sourceInfoTouchStart = null;
let hyogoNanbuSyntheticStationCache;
let stationPopup;
let stationHoverEventsBound = false;
let hoveredStationFeatureId = null;
let hoveredStationLngLat = null;
let stationCanvasOverlay;
let stationCanvasRenderFrame = 0;
let stationSourceInputDataRef = null;
const stationFeatureDetailById = new Map();
let submarineStationCanvasFeatureCache = { data: null, features: [] };
let maintenanceReasonOverlay;
let appOverlays;
let latestMaintenanceStatus = { maintenance: false, reason: "" };
let currentLocationMarker;
let epicenterHoverPopup;
let epicenterHoverLngLat = null;
let currentLocationRequestId = 0;
let currentLocationForecastCache;
let locationResolveTimer;
let simulationFrame;
let simulationCompleteAtSec = null;
let simulationSetupMagnitude = null;
let simulationDisplayedMagnitude = null;
let simulationMagnitudeReports = [];
let simulationMagnitudeReportIndex = -1;
let simulationTimelineEvents = [];
let simulationTimelineElapsedSec = 0;
let simulationTimelineLastEewReport = null;
let simulationTimelineMaxRank = 0;
let simulationObservedMaxRank = 0;
let simulationTimelineAutoFollow = true;
let simulationTimelineExpectedFirstEewSec = null;
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
let simulationMaxAreaListSignature = "";
let simulationResultReportSnapshot = null;
let simulationResultSummaryMount = null;
let simulationSeeking = false;
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
let weatherQuizSession = null;
let observedStationFeatureCache = { data: null, features: [] };
let communityPosts = [];
let communityPostsLoadPromise = null;
let communityWorkerBaseUrl = "";
let communityPostMarkers = [];
let communityPostMarkerLayoutBound = false;
let communityMapCenterRequestId = 0;
let communityPostLocation = null;
let communityPostLocationResolveRequestId = 0;
let communityPostOverlayElements = null;
let activeCommunityPostDetail = null;
let communityMapStyle = loadCommunityMapStylePreference();
let communityLocationMarkerVisible = loadCommunityLocationMarkerVisible();
let communityAccount = loadCommunityAccountFromStorage();
document.body?.classList.toggle("community-admin-account", Boolean(communityAccount?.isAdmin));
document.body?.classList.toggle("community-local-account", Boolean(communityAccount?.localOnly));
let communityAccountRequiredPanel = null;
let communityAccountPanel = null;
let communityAccountStatsPromise = null;
let faultSourceSampleCache = { key: "", samples: [] };
let activeFaultCatalog = [];
let selectedActiveFaultPath = [];
const activeFaultDetailCache = new Map();
let activeFaultSelectionRequestId = 0;
let faultEpicenterNameSyncKey = "";
let faultEpicenterNameRequestId = 0;
let faultEpicenterNamePendingKey = "";
let faultEpicenterNameSyncPromise = null;

function updateHistoryStatisticsLoadButtonState() {
  const button = document.querySelector("#history-statistics-load");
  if (!button) {
    return;
  }
  const disabled = !selectedHistoryLocalAreaName || earthquakeStatisticsLoading;
  button.disabled = disabled;
  button.setAttribute("aria-disabled", String(disabled));
}

let speechAnnouncementState = createSpeechAnnouncementState();
let postMunicipalityDataScheduled = false;
const sourceDataRefs = new Map();
let pmtilesProtocolRegistered = false;
let japanPmtilesProtocolUrl = "";
const SOURCE_LINKS = [
  { label: "気象庁", href: "https://www.jma.go.jp/" },
  { label: "気象庁 気象警報・注意報", href: "https://www.jma.go.jp/jma/kishou/know/bosai/warning.html" },
  { label: "気象庁 気象警報・注意報の種類", href: "https://www.jma.go.jp/jma/kishou/know/bosai/warning_kind.html" },
  { label: "気象庁 津波警報・注意報", href: "https://www.jma.go.jp/jma/kishou/know/jishin/joho/tsunamiinfo.html" },
  { label: "気象予報士試験 試験問題と解答例", href: "https://www.jmbsc.or.jp/jp/examination/examination-7.html" },
  { label: "気象庁 予報区等GISデータ", href: "https://www.data.jma.go.jp/developer/gis.html" },
  { label: "気象庁 震度観測点", href: "https://www.jma.go.jp/jma/kishou/know/jishin/intens-st/index.html" },
  { label: "国土数値情報", href: "https://nlftp.mlit.go.jp/ksj/" },
  { label: "J-SHIS", href: "https://www.j-shis.bosai.go.jp/" },
  { label: "Natural Earth", href: "https://www.naturalearthdata.com/" },
  { label: "PB2002 Plate Boundaries", href: "https://github.com/fraxen/tectonicplates" },
  { label: "MeteoScope", href: "https://github.com/wvdtc7bjwn-bit/MeteoScope" },
  { label: "S-net", href: "https://www.seafloor.bosai.go.jp/outline/" },
  { label: "MapLibre GL JS", href: "https://maplibre.org/maplibre-gl-js/docs/" },
  { label: "OpenStreetMap", href: "https://www.openstreetmap.org/copyright" },
  { label: "CARTO", href: "https://carto.com/attributions" },
];
const SOURCE_UPDATED_AT = "2026 07 13";
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
      {
        label: "気象警報・注意報（2026年5月29日からの体系）",
        href: "https://www.jma.go.jp/jma/kishou/know/bosai/warning.html",
      },
      {
        label: "気象警報・注意報の種類",
        href: "https://www.jma.go.jp/jma/kishou/know/bosai/warning_kind.html",
      },
      {
        label: "津波警報・注意報",
        href: "https://www.jma.go.jp/jma/kishou/know/jishin/joho/tsunamiinfo.html",
      },
    ],
  },
  {
    title: "気象予報士試験",
    description: "気象予報士試験 対策問題集の出題範囲と正答内容の確認に使用している一次資料。問題文は転載せず、学習用の独自問題へ再構成しています。",
    links: [
      {
        label: "気象業務支援センター 試験問題と解答例",
        href: "https://www.jmbsc.or.jp/jp/examination/examination-7.html",
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
      { label: "OpenStreetMap", href: "https://www.openstreetmap.org/copyright" },
      { label: "CARTO", href: "https://carto.com/attributions" },
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
let staticIntensityAreaDataRef = null;
const intensityAreaFeatureStateSignatures = new Map();
let pendingIntensityAreaFeatureStateData = null;
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
setupMapMenuGestures();
setupTransientPanelScrollbars();
setupPanelScrollbarOffsets();
preventNonMapZoom();
setupViewportStability();
setupSmartphoneLandscapeUnsupportedReset();
setupSpeechSynthesisRecovery();
bootstrapApplication();

async function bootstrapApplication() {
  await disableLocalDevelopmentServiceWorker();
  setupSystemPermissionSync();
  restoreCurrentLocationPreference();
  recoverPmtilesByteServingIfNeeded().catch((error) => {
    console.warn("PMTiles byte serving recovery failed", error);
  });
  if (!IS_LOCAL_DEV) {
    setupPushNotifications();
  }
  backfillLegacyNotificationHistory();

  if (window.maplibregl) {
    initEarthquakeMap()
      .then(() => updateCurrentLocationMarker())
      .catch((error) => {
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

  els.simulationStart.disabled = false;
  els.simulationStart.textContent = "開始";
  els.simulationStart.title = "";
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

    notificationCard.querySelector(".settings-notification-row span")?.replaceChildren("通知設定");
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
    const list = els.settingsMenuSheet?.querySelector(".settings-menu-list");
    if (!list) return;
    if (!els.settingsAppearanceButton) {
      const button = document.createElement("button");
      button.className = "settings-menu-row";
      button.id = "settings-appearance-button";
      button.type = "button";
      button.innerHTML = `<span>外観</span><span aria-hidden="true">›</span>`;
      list.append(button);
      els.settingsAppearanceButton = button;
    }
    if (!els.settingsAppearancePanel) {
      const panel = document.createElement("section");
      panel.className = "settings-inline-panel hidden";
      panel.id = "settings-appearance-panel";
      panel.setAttribute("aria-label", "外観");
      list.append(panel);
      els.settingsAppearancePanel = panel;
    }
  };

  const ensureSettingsAppearancePanel = () => {
    ensureSettingsAppearanceElements();
    if (!els.settingsAppearancePanel || els.settingsAppearancePanel.dataset.ready === "true") {
      return;
    }

    els.settingsAppearancePanel.replaceChildren();
    const intensityPreviewKeys = ["7", "6+", "6-", "5+", "5-", "4", "3", "2", "1"];
    const colorSchemeChoices = INTENSITY_COLOR_SCHEME_OPTIONS.map(([value, label]) => {
      const scheme = INTENSITY_COLOR_SCHEMES[value];
      const preview = intensityPreviewKeys.map((key) => {
        const color = key === "1" ? INTENSITY_INFORMATION_GRAY : scheme.colors[key];
        const textColor = key === "1" ? "#1f2937" : getIntensitySchemeTextColor(scheme, key);
        return `<i style="--preview-color:${escapeHtml(color)};--preview-text:${escapeHtml(textColor)}">${escapeHtml(key)}</i>`;
      }).join("");
      return `
        <label class="settings-color-scheme-choice">
          <input type="radio" name="intensity-color-scheme-choice" value="${escapeHtml(value)}" />
          <span class="settings-color-scheme-name">${escapeHtml(label)}</span>
          <span class="settings-color-scheme-preview" aria-label="${escapeHtml(label)}の震度凡例例">${preview}</span>
        </label>
      `;
    }).join("");
    els.settingsAppearancePanel.insertAdjacentHTML("beforeend", `
      <div class="settings-appearance-content">
      <section class="settings-appearance-section">
        <h4>表示テーマ</h4>
        <div class="settings-theme-options" role="radiogroup" aria-label="表示テーマ">
          <label class="settings-theme-choice"><input type="radio" name="appearance-theme" value="light" /> <span>ホワイト</span></label>
          <label class="settings-theme-choice"><input type="radio" name="appearance-theme" value="dark" /> <span>ダーク</span></label>
          <label class="settings-theme-choice"><input type="radio" name="appearance-theme" value="system" /> <span>システムに従う</span></label>
        </div>
      </section>
      <section class="settings-appearance-section settings-appearance-color-section">
        <h4>震度配色</h4>
        <div class="settings-color-scheme-options" role="radiogroup" aria-label="震度配色">
          ${colorSchemeChoices}
        </div>
      </section>
      </div>
    `);
    const appearanceHeadings = els.settingsAppearancePanel.querySelectorAll(".settings-appearance-section h4");
    if (appearanceHeadings[0]) {
      appearanceHeadings[0].textContent = "表示テーマ";
    }
    if (appearanceHeadings[1]) {
      appearanceHeadings[1].textContent = "震度配色";
    }
    const themeLabels = els.settingsAppearancePanel.querySelectorAll(".settings-theme-options label span");
    ["ホワイト", "ダーク", "システムに従う"].forEach((label, index) => {
      if (themeLabels[index]) {
        themeLabels[index].textContent = label;
      }
    });
    els.settingsAppearancePanel.querySelectorAll('input[name="appearance-theme"]').forEach((input) => {
      input.checked = input.value === getAppearanceTheme();
      input.addEventListener("change", () => {
        if (input.checked) {
          setAppearanceTheme(input.value);
        }
      });
    });
    els.settingsAppearancePanel.querySelectorAll('input[name="intensity-color-scheme-choice"]').forEach((input) => {
      input.checked = input.value === state.intensityColorScheme;
      input.addEventListener("change", () => {
        if (input.checked) {
          applyIntensityColorScheme(input.value);
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
    updateHistoryStatisticsLoadButtonState();
    row.querySelector("#history-statistics-load")?.addEventListener("click", async () => {
      if (!selectedHistoryLocalAreaName) {
        updateHistoryStatisticsLoadButtonState();
        return;
      }
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
      updateHistoryStatisticsLoadButtonState();
      renderPastEarthquakeStatsPanel();
      try {
        await loadEarthquakeStatistics({ force: true });
      } catch (error) {
        if (error?.name !== "AbortError") {
          throw error;
        }
      } finally {
        earthquakeStatisticsLoading = false;
        updateHistoryStatisticsLoadButtonState();
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
    els.historicalEarthquakeButton?.querySelector("span")?.replaceChildren("過去の地震");
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
    speechButton?.querySelector("span")?.replaceChildren("");
    speechButton?.querySelector("strong")?.replaceChildren("読み上げ");

    const scrollHost = els.setupPanel.querySelector(".sim-panel-scroll") ?? els.setupPanel;
    let host = els.setupPanel.querySelector(".simulation-start-sheet-host");
    if (!host) {
      host = document.createElement("div");
      host.className = "simulation-start-sheet-host";
      scrollHost.append(host);
    } else if (host.parentElement !== scrollHost) {
      scrollHost.append(host);
    }
    if (quickHost.parentElement !== scrollHost || quickHost.nextElementSibling !== host) {
      host.insertAdjacentElement("beforebegin", quickHost);
    }
    if (!host.contains(els.simulationStart)) {
      host.append(els.simulationStart);
      els.simulationStart.classList.remove("map-simulation-start");
      els.simulationStart.classList.add("sheet-simulation-start");
    }
    if (!state.simulationRunning) {
      els.simulationStart.textContent = "開始";
    }
    if (document.body.classList.contains("fault-simulation-mode")) {
      els.setupPanel.querySelector("#fault-simulation-menu")?.append(host);
      updateSimulationFaultSource();
    }
  };

  const ensureSimulationRuntimeHud = () => {
    const mapWrap = document.querySelector(".map-wrap");
    const resultSection = document.querySelector(".setup-result-section");
    if (!mapWrap || !resultSection) return;

    let hud = mapWrap.querySelector(".simulation-runtime-hud");
    if (!hud) {
      hud = document.createElement("section");
      hud.className = "simulation-runtime-hud";
      hud.setAttribute("aria-label", "シミュレーション情報");
      mapWrap.append(hud);
    }
    if (!hud.querySelector(".simulation-runtime-handle")) {
      const handle = document.createElement("button");
      handle.type = "button";
      handle.className = "simulation-runtime-handle";
      handle.setAttribute("aria-label", "シミュレーション情報を折りたたむ");
      handle.setAttribute("aria-expanded", "true");
      const setRuntimeHudCollapsed = (collapsed) => {
        hud.classList.toggle("is-collapsed", collapsed);
        handle.setAttribute("aria-expanded", String(!collapsed));
        handle.setAttribute(
          "aria-label",
          collapsed ? "シミュレーション情報を展開する" : "シミュレーション情報を折りたたむ",
        );
      };
      let dragPointerId = null;
      let dragStartY = 0;
      let dragStartOffset = 0;
      let dragCurrentOffset = 0;
      let dragMaxOffset = 0;
      let dragMoved = false;
      handle.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        dragPointerId = event.pointerId;
        dragStartY = event.clientY;
        dragMaxOffset = Math.max(hud.offsetHeight - handle.offsetHeight, 0);
        dragStartOffset = hud.classList.contains("is-collapsed") ? dragMaxOffset : 0;
        dragCurrentOffset = dragStartOffset;
        dragMoved = false;
        hud.classList.add("is-dragging");
        hud.style.setProperty("--runtime-hud-drag-y", `${dragCurrentOffset}px`);
        handle.setPointerCapture?.(event.pointerId);
        event.preventDefault();
      });
      handle.addEventListener("pointermove", (event) => {
        if (event.pointerId !== dragPointerId) return;
        const deltaY = event.clientY - dragStartY;
        dragMoved ||= Math.abs(deltaY) >= 4;
        dragCurrentOffset = clamp(dragStartOffset + deltaY, 0, dragMaxOffset);
        hud.style.setProperty("--runtime-hud-drag-y", `${dragCurrentOffset}px`);
      });
      const finishRuntimeHudDrag = (event) => {
        if (event.pointerId !== dragPointerId) return;
        handle.releasePointerCapture?.(event.pointerId);
        dragPointerId = null;
        hud.classList.remove("is-dragging");
        hud.style.removeProperty("--runtime-hud-drag-y");
        if (dragMoved) {
          setRuntimeHudCollapsed(dragCurrentOffset > dragMaxOffset * 0.45);
          handle.dataset.suppressClick = "true";
        }
      };
      handle.addEventListener("pointerup", finishRuntimeHudDrag);
      handle.addEventListener("pointercancel", finishRuntimeHudDrag);
      handle.addEventListener("click", () => {
        if (handle.dataset.suppressClick === "true") {
          delete handle.dataset.suppressClick;
          return;
        }
        setRuntimeHudCollapsed(!hud.classList.contains("is-collapsed"));
      });
      hud.prepend(handle);
    }
    if (!hud.contains(resultSection)) hud.append(resultSection);

    const summary = resultSection.querySelector(".simulation-summary");
    const waveReadout = resultSection.querySelector(".wave-readout");
    if (summary && waveReadout) {
      [...waveReadout.children].forEach((item) => summary.append(item));
      waveReadout.remove();
    }
    const magnitudeCard = summary?.querySelector(".magnitude-card");
    const depthCard = summary?.querySelector("div:has(#simulation-depth)");
    if (summary && magnitudeCard && depthCard && !summary.querySelector(".simulation-depth-magnitude-row")) {
      const depthMagnitudeRow = document.createElement("div");
      depthMagnitudeRow.className = "simulation-depth-magnitude-row";
      depthMagnitudeRow.append(depthCard, magnitudeCard);
      summary.append(depthMagnitudeRow);
    }
    const originTime = resultSection.querySelector(".simulation-origin-time-card");
    if (summary && originTime && !summary.contains(originTime)) summary.append(originTime);
    const progressPanel = resultSection.querySelector(".simulation-progress-panel");
    const progressTrack = resultSection.querySelector(".simulation-progress-track");
    const progressNow = resultSection.querySelector("#simulation-progress-now");
    if (progressPanel && progressNow && progressNow.parentElement !== progressPanel) {
      progressPanel.append(progressNow);
    }
    if (progressPanel && progressTrack && progressNow && progressPanel.dataset.cursorBoundsReady !== "true") {
      progressPanel.dataset.cursorBoundsReady = "true";
      const syncProgressCursorBounds = () => {
        const top = progressTrack.offsetTop;
        const bottom = Math.max(progressPanel.clientHeight - top - progressTrack.offsetHeight, 0);
        progressPanel.style.setProperty("--simulation-progress-now-top", `${top}px`);
        progressPanel.style.setProperty("--simulation-progress-now-bottom", `${bottom}px`);
      };
      syncProgressCursorBounds();
      window.requestAnimationFrame(syncProgressCursorBounds);
      if (typeof ResizeObserver === "function") {
        const cursorBoundsObserver = new ResizeObserver(syncProgressCursorBounds);
        cursorBoundsObserver.observe(progressPanel);
        cursorBoundsObserver.observe(progressTrack);
      } else {
        window.addEventListener("resize", syncProgressCursorBounds, { passive: true });
      }
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
      regionSelect.innerHTML = `<option value="">都道府県</option>${options.join("")}`;
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

  const ensureInfoToolShell = () => {
    if (!els.infoFullPanel || els.infoFullPanel.dataset.toolShellReady === "true") {
      return;
    }
    els.infoFullPanel.innerHTML = `
      <section class="tool-home-page" id="tool-home-page" aria-label="ツール">
        <div class="tool-menu-list">
          <button class="tool-menu-row" type="button" data-tool-page="source">
            <span class="tool-menu-copy"><strong>震源地検索</strong><small>地図から地域を選び、過去の地震回数を調べます。</small></span><span aria-hidden="true">›</span>
          </button>
          <button class="tool-menu-row" type="button" data-tool-page="station">
            <span class="tool-menu-copy"><strong>観測点検索</strong><small>震度観測点を地域・機関・名称から検索します。</small></span><span aria-hidden="true">›</span>
          </button>
          <button class="tool-menu-row" type="button" data-tool-page="weather-quiz">
            <span class="tool-menu-copy"><strong>気象予報士試験 対策問題集</strong><small>一般・専門知識と年次・問題数・問題形式を選び、○×問題または4択問題で学習できます。</small></span><span aria-hidden="true">›</span>
          </button>
        </div>
      </section>
      <section class="tool-station-page hidden" id="tool-station-page" aria-label="観測点検索"></section>
      <section class="tool-weather-quiz-page hidden" id="tool-weather-quiz-page" aria-label="気象予報士試験 対策問題集"></section>
    `;
    els.infoFullPanel.querySelector('[data-tool-page="source"]')?.addEventListener("click", () => openInfoSourceSearchPage());
    els.infoFullPanel.querySelector('[data-tool-page="station"]')?.addEventListener("click", () => openInfoStationSearchPage());
    els.infoFullPanel.querySelector('[data-tool-page="weather-quiz"]')?.addEventListener("click", () => openInfoWeatherQuizPage());
    els.infoFullPanel.dataset.toolShellReady = "true";
    delete els.infoFullPanel.dataset.stationReady;
  };

  const showInfoToolHome = () => {
    ensureInfoToolShell();
    document.body.classList.remove("tool-source-search-mode", "tool-station-search-mode", "tool-weather-quiz-mode");
    setHistoryMapModeActive(false);
    els.historyFullPanel?.classList.add("hidden");
    els.infoFullPanel?.querySelector("#tool-home-page")?.classList.remove("hidden");
    els.infoFullPanel?.querySelector("#tool-station-page")?.classList.add("hidden");
    els.infoFullPanel?.querySelector("#tool-weather-quiz-page")?.classList.add("hidden");
    els.infoFullPanel?.classList.remove("hidden");
  };

  const ensureToolPageHeader = (panel, title, onBack) => {
    if (!panel || panel.querySelector(".tool-page-head")) {
      return;
    }
    const head = document.createElement("div");
    head.className = "tool-page-head";
    head.innerHTML = `
      <button class="tool-page-back" type="button" aria-label="戻る">‹</button>
      <h2>${title}</h2>
      <span aria-hidden="true"></span>
    `;
    head.querySelector(".tool-page-back")?.addEventListener("click", onBack);
    panel.insertAdjacentElement("afterbegin", head);
  };

  const openInfoSourceSearchPage = () => {
    ensureInfoToolShell();
    closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
    closeSettingsMenuSheet();
    setSetupMenuOpen(false);
    els.infoFullPanel?.classList.add("hidden");
    els.learningFullPanel?.classList.add("hidden");
    const panel = ensureHistoryFullPanel();
    ensureToolPageHeader(panel, "震源地検索", showInfoToolHome);
    panel?.classList.remove("hidden");
    document.body.classList.add("tool-source-search-mode");
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

  const openInfoStationSearchPage = () => {
    ensureInfoToolShell();
    closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
    closeSettingsMenuSheet();
    setSetupMenuOpen(false);
    setHistoryMapModeActive(false);
    els.historyFullPanel?.classList.add("hidden");
    els.learningFullPanel?.classList.add("hidden");
    document.body.classList.remove("tool-source-search-mode");
    document.body.classList.remove("tool-weather-quiz-mode");
    document.body.classList.add("tool-station-search-mode");
    const stationPage = els.infoFullPanel?.querySelector("#tool-station-page");
    ensureInfoStationPanel();
    ensureToolPageHeader(stationPage, "観測点検索", showInfoToolHome);
    els.infoFullPanel?.querySelector("#tool-home-page")?.classList.add("hidden");
    els.infoFullPanel?.querySelector("#tool-weather-quiz-page")?.classList.add("hidden");
    stationPage?.classList.remove("hidden");
    els.infoFullPanel?.classList.remove("hidden");
    renderInfoStationList();
    Promise.resolve(loadShindoStations())
      .then(() => renderInfoStationList())
      .catch((error) => {
        console.warn("Failed to load station information", error);
      });
  };

  const WEATHER_QUIZ_QUESTION_REWRITES = new Map([
    ["成層圏でオゾンが生成される基本的な反応を答えてください。", "成層圏では、どのような反応によってオゾンが生成されますか。"],
    ["平均気圧500hPa、平均気温-23℃の乾燥空気層で、高度差100mに対応する気圧差は約何hPaですか。", "平均気圧500hPa、平均気温−23℃の乾燥した空気層では、高度差100mに対応する気圧差は約何hPaですか。"],
    ["未飽和の湿潤気塊を、周囲と混合させず気圧一定で冷却したとき、仮温度・露点温度・相当温位のうち保存されるものはどれですか。", "未飽和の湿潤空気を、周囲と混合させず一定の気圧で冷却します。このとき、仮温度・露点温度・相当温位のうち、変化しないものはどれですか。"],
    ["暖かい雨の雲で、雲粒が地上へ落ちる大きな雨滴へ成長する際に重要な過程は何ですか。", "暖かい雨を降らせる雲の中で、雲粒が大きな雨滴へ成長するために重要な過程は何ですか。"],
    ["人の目で見える可視光と、降水観測に使う気象レーダー電波の代表的な波長帯を答えてください。", "可視光と、降水観測に使われる気象レーダーの電波では、代表的な波長はそれぞれどの程度ですか。"],
    ["北半球の慣性振動はどちら向きに回り、その周期はコリオリパラメータfを使ってどう表しますか。", "北半球の慣性振動はどちら向きに回転しますか。また、その周期をコリオリパラメータ f を使って表してください。"],
    ["発達中の温帯低気圧では、気圧の谷の軸は高度とともに地上低気圧のどちら側へ傾くのが一般的ですか。", "発達中の温帯低気圧では、気圧の谷の軸は高度が上がるほど、地上低気圧のどちら側へ傾くのが一般的ですか。"],
    ["中間圏界面付近で気温が極小になる主な力学的要因は何ですか。", "中間圏界面付近で気温が最も低くなる主な力学的要因は何ですか。"],
    ["日中の海風時、地表付近の気圧は海上と陸上のどちらが低くなりますか。", "日中に海風が吹いているとき、地表付近の気圧は海上と陸上のどちらで低くなりますか。"],
    ["人為起源の二酸化炭素排出量のうち、大気中に蓄積する割合はおよそどの程度ですか。", "人間活動によって排出された二酸化炭素のうち、大気中に残る割合はおよそどの程度ですか。"],
    ["許可を受けて予報業務を行う事業所が、記録しておくべき代表的な事項を2つ答えてください。", "許可を受けて予報業務を行う事業所は、どのような事項を記録しておく必要がありますか。代表例を2つ挙げてください。"],
    ["災害のおそれがある異常現象を発見した海上では、まず誰へ通報しますか。", "海上で災害のおそれがある異常現象を発見した場合、最初に誰へ通報しますか。"],
    ["超音波式積雪計の測定面は、どのような状態にして設置するのが推奨されますか。", "超音波式積雪計を設置するとき、積雪を測る地面はどのような状態にするのが適切ですか。"],
    ["ウィンドプロファイラで非常に激しい雨を観測すると、上空の風データが得られないことがあるのはなぜですか。", "非常に激しい雨のとき、ウィンドプロファイラで上空の風を観測できない場合があるのはなぜですか。"],
    ["気象レーダーのブライトバンドは何に対応する強いエコーですか。", "気象レーダーで見られるブライトバンドは、どのような層で生じる強いエコーですか。"],
    ["解析予報サイクルを繰り返すことで、観測の少ない海上でも解析精度の向上が期待できるのはなぜですか。", "解析と予報を繰り返すことで、観測点の少ない海上でも解析精度の向上が期待できるのはなぜですか。"],
    ["数値予報モデルで、実際の地形をモデル格子に合わせて平滑化することは予測誤差の原因になりますか。", "数値予報モデルで実際の地形を格子に合わせて平滑化すると、予測誤差の原因になることがありますか。"],
    ["天気予報ガイダンスは、数値予報のランダム誤差を統計的に完全補正できますか。", "天気予報ガイダンスによって、数値予報のランダム誤差を統計的に完全補正できますか。"],
    ["赤外画像で灰色、可視画像で白灰色に見える雲域から、どのような雲を推定できますか。", "衛星の赤外画像では灰色、可視画像では白灰色に見える雲域から、どのような雲を推定できますか。"],
    ["温暖前線の接近・通過をウィンドプロファイラで見ると、南寄りの風の層は時間とともにどのように変化しますか。", "温暖前線が接近して通過するとき、ウィンドプロファイラで観測される南寄りの風の層は、時間とともにどのように変化しますか。"],
    ["冬の日本海で寒気が流入して対流混合層が形成されたとき、層内の水蒸気混合比は高度方向にどうなりやすいですか。", "冬の日本海に寒気が流れ込み、対流混合層が形成された場合、層内の水蒸気混合比は高度によってどのように変化しますか。"],
    ["平均誤差（ME）の値が0に近ければ、個々の予報誤差も小さいと判断できますか。", "平均誤差（ME）が0に近い場合、個々の予報誤差も小さいと判断してよいですか。"],
    ["流域雨量指数の洪水警報基準には、堤防整備状況など指数計算に直接入らない要素も反映されますか。", "流域雨量指数の洪水警報基準には、堤防の整備状況など、指数の計算式に直接含まれない地域特性も反映されますか。"],
    ["月平均海面気圧の平年偏差図で負偏差が続く地域は、平年と比べてどのような気圧場だったと読めますか。", "月平均海面気圧の平年偏差が継続して負の地域では、平年と比べてどのような気圧場だったと考えられますか。"],
    ["周囲より4℃低い空気塊を気温減率0.6℃/100mの大気中で放すと、約何m下降して振動しますか。", "周囲より4℃低い空気塊を、気温減率0.6℃/100mの大気中で自由にすると、空気塊は約何m下降して振動しますか。"],
    ["水溶性エーロゾルを核にした雲粒は、相対湿度100%未満でも存在できますか。", "水溶性エーロゾルを核とする雲粒は、相対湿度が100%未満でも存在することがありますか。"],
    ["4℃差の等温線が40km間隔なら、等温線に直角な気温傾度は1kmあたり何℃ですか。", "4℃差の等温線が40km間隔で並んでいる場合、等温線に直角な方向の気温傾度は1kmあたり何℃ですか。"],
    ["北半球で南風が上空ほど強まるとき、層平均気温は風下の東側ほどどうなりますか。", "北半球で南風が高度とともに強くなる場合、層平均気温は風下にあたる東側ほど高くなりますか、低くなりますか。"],
    ["許可事業者で働く予報士本人が、従事開始を届け出る制度ですか。", "気象予報士が許可事業者で予報業務に従事し始める場合、届出は本人と事業者のどちらが行いますか。"],
    ["予報業務の許可事業者は、関係する警報を利用者へどう扱いますか。", "予報業務の許可事業者は、業務に関係する警報を利用者へどのように伝える必要がありますか。"],
    ["ラジオゾンデの風は風センサーで直接測りますか。", "ラジオゾンデによる高層風の観測では、風向・風速を搭載センサーで直接測定しますか。"],
    ["二重偏波レーダーの位相差は、何の推定改善に使えますか。", "二重偏波レーダーで観測する位相差は、どのような量の推定精度を高めるために使われますか。"],
    ["アンサンブル最大値は、顕著現象の何を高めるのに役立ちますか。", "アンサンブル予報の最大値を利用すると、顕著現象を捉えるうえでどの指標の向上が期待できますか。"],
    ["トランスバースライン付近で注意すべき航空現象は何ですか。", "衛星画像でトランスバースラインが見られる付近では、どのような航空気象現象に注意が必要ですか。"],
    ["線状降水帯の情報は、災害危険度の急上昇を知らせますか。", "線状降水帯に関する情報は、大雨災害の危険度が急激に高まっていることを知らせるものですか。"],
    ["高度1000mで18℃、900hPaの飽和空気を地上まで乾燥断熱下降させた場合、相対湿度はおよそ何％ですか。", "高度1000mで気温18℃、気圧900hPaの飽和空気を地上まで乾燥断熱的に下降させると、地上での相対湿度はおよそ何％になりますか。"],
    ["未飽和空気では、露点温度と湿球温度のどちらが高くなりますか。", "未飽和の空気では、露点温度と湿球温度のどちらが高くなりますか。"],
    ["地表摩擦が大きくなると、風が等圧線を横切る角度はどうなりますか。", "地表面の摩擦が大きくなると、風が等圧線を横切る角度はどのように変化しますか。"],
    ["日本では、日降水量100mm以上の日数と日降水量1mm未満の日数にどのような長期傾向がありますか。", "日本では、日降水量100mm以上の日数と、日降水量1mm未満の日数は、長期的にどのような傾向を示していますか。"],
    ["同じ期間に同じ極値が複数回現れた場合、極値の起日はどの時点を採用しますか。", "同じ統計期間内に同じ極値が複数回観測された場合、どの観測時点を極値の起日・起時として採用しますか。"],
    ["二重偏波気象レーダーは、昆虫や鳥による晴天時エコーと降水を区別できますか。", "二重偏波気象レーダーでは、昆虫や鳥による晴天時エコーと降水エコーを区別できますか。"],
    ["降水短時間予報は、6時間先までどの程度の格子間隔で予測しますか。", "降水短時間予報では、6時間先までの降水分布をどの程度の格子間隔で予測しますか。"],
    ["寒帯前線ジェットは亜熱帯ジェットより、最大風速の高度が一般に高いですか、低いですか。", "寒帯前線ジェットで最大風速となる高度は、一般に亜熱帯ジェットより高いですか、低いですか。"],
    ["強い雨の見逃しを減らすには、判定しきい値を高くしますか、低くしますか。", "強い雨の見逃しを減らすには、雨を検出する判定しきい値を高くするべきですか、低くするべきですか。"],
    ["高温に関する早期天候情報は、何日間の平均気温予想を基にしますか。", "高温に関する早期天候情報は、何日間の平均気温の予測を基に発表されますか。"],
    ["台風が温帯低気圧へ変わる過程で、強風域は中心付近だけに狭まりますか。", "台風が温帯低気圧へ変わる過程では、強風域は中心付近だけに狭まりますか。"],
    ["エルニーニョ時、インド洋熱帯域の海面水温変化は太平洋の変化より早いですか、遅れますか。", "エルニーニョ現象の発生時、熱帯インド洋の海面水温の変化は、太平洋の変化より先に現れますか、それとも遅れて現れますか。"],
  ]);

  const normalizeWeatherQuizQuestion = (question) => {
    const value = String(question || "").trim();
    return WEATHER_QUIZ_QUESTION_REWRITES.get(value) || value;
  };

  const loadWeatherForecasterQuizItems = async ({ forceRefresh = false } = {}) => {
    if (weatherForecasterQuizItems?.length && !forceRefresh) {
      return weatherForecasterQuizItems;
    }
    if (!weatherForecasterQuizLoadPromise) {
      weatherForecasterQuizLoadPromise = fetch(WEATHER_FORECASTER_QUIZ_URL, { cache: "no-store" })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const items = await response.json();
          if (!Array.isArray(items) || !items.length) {
            throw new Error("問題データが空です。");
          }
          weatherForecasterQuizItems = items.filter((item) => {
            const hasTrueFalse = Boolean(
              item?.trueFalse?.id
              && item?.trueFalse?.statement
              && typeof item?.trueFalse?.correct === "boolean"
              && item?.trueFalse?.correctStatement
              && item?.trueFalse?.explanation
            );
            const hasMultipleChoice = Boolean(
              item?.multipleChoice?.id
              && item?.multipleChoice?.question
              && Array.isArray(item?.multipleChoice?.choices)
              && item.multipleChoice.choices.length === 4
              && Number.isInteger(item?.multipleChoice?.correctIndex)
              && item.multipleChoice.correctIndex >= 0
              && item.multipleChoice.correctIndex < 4
              && item?.multipleChoice?.explanation
            );
            return Boolean(
              item?.category
              && item?.exam
              && item?.year
              && (hasTrueFalse || hasMultipleChoice)
            );
          });
          if (!weatherForecasterQuizItems.length) {
            throw new Error("有効な問題がありません。");
          }
          return weatherForecasterQuizItems;
        })
        .finally(() => {
          weatherForecasterQuizLoadPromise = null;
        });
    }
    return weatherForecasterQuizLoadPromise;
  };

  const shuffleWeatherQuizItems = (items) => {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  };

  const createWeatherQuizDistractor = (item) => {
    const answer = String(item?.answer || "").trim();
    const question = String(item?.originalQuestion || item?.question || "").trim();
    const authoredDistractor = String(item?.wrongAnswer || "").trim();
    if (authoredDistractor && authoredDistractor !== answer) {
      return authoredDistractor;
    }

    const questionDistractors = new Map([
      ["北半球の低気圧性の傾度風は、地衡風と比べて速いですか、遅いですか。", "地衡風より速くなり、低気圧中心から離れるほど差が大きくなります。"],
      ["発達中の温帯低気圧では、気圧の谷の軸は高度とともに地上低気圧のどちら側へ傾くのが一般的ですか。", "東側へ傾くのが一般的です。"],
      ["許可を受けて予報業務を行う事業所が、記録しておくべき代表的な事項を2つ答えてください。", "担当者の勤務時間と、予報に使用した端末の機種名です。"],
      ["ウィンドプロファイラで非常に激しい雨を観測すると、上空の風データが得られないことがあるのはなぜですか。", "強雨時は大気の屈折率が一様になり、電波がまったく散乱しなくなるためです。"],
      ["数値予報モデルで、実際の地形をモデル格子に合わせて平滑化することは予測誤差の原因になりますか。", "原因にはなりません。格子化後も実際の地形が完全に保存されるためです。"],
      ["温暖前線の接近・通過をウィンドプロファイラで見ると、南寄りの風の層は時間とともにどのように変化しますか。", "はじめ地表付近に現れ、前線の接近とともに上空側へ薄くなります。"],
      ["流域雨量指数の洪水警報基準には、堤防整備状況など指数計算に直接入らない要素も反映されますか。", "反映されません。全国で同じ指数値を一律の基準として用います。"],
      ["月平均海面気圧の平年偏差図で負偏差が続く地域は、平年と比べてどのような気圧場だったと読めますか。", "平年より高気圧の影響を受けやすく、高圧部が強かったと読めます。"],
      ["北半球で南風が上空ほど強まるとき、層平均気温は風下の東側ほどどうなりますか。", "東側ほど低くなります。"],
      ["積乱雲下で冷却された空気がたまると、地上気圧はどうなりやすいですか。", "局地的に低くなりやすいです。"],
      ["国が洪水予報の対象に指定するのは、どのような河川ですか。", "流域面積や想定被害に関係なく、すべての河川が一律に指定されます。"],
      ["気象レーダーのドップラー効果から直接分かる主な量は何ですか。", "レーダーに直角な方向の風速を直接求められます。"],
      ["観測点が密な地域のデータは、観測点が疎な地域の解析にも影響しますか。", "影響しません。観測値は最寄りの格子点だけに使用されます。"],
      ["アンサンブルのばらつきが大きいとき、予報の不確実性はどう評価しますか。", "不確実性は小さいと評価します。"],
      ["発達中の低気圧で、寒冷前線東側の暖湿気はどの前線面を上昇しますか。", "寒冷前線面を上昇します。"],
      ["北西太平洋低緯度で発生直後の台風は、どちらへ進みやすいですか。", "偏西風に流され東へ進みやすいです。"],
      ["対流圏で水蒸気が増えると、空気の平均分子量はどうなりますか。", "大きくなります。"],
      ["水平の流入量が流出量より多いと、上面の鉛直流はどうなりますか。", "下向きになります。"],
      ["赤道付近の対流圏下層では、東風と西風のどちらが卓越しますか。", "西風が卓越します。"],
      ["許可事業者で働く予報士本人が、従事開始を届け出る制度ですか。", "予報士本人が、従事開始前に直接届け出る制度です。"],
      ["予報業務の許可事業者は、関係する警報を利用者へどう扱いますか。", "警報内容を独自に修正してから利用者へ伝達します。"],
      ["ラジオゾンデの風は風センサーで直接測りますか。", "はい。ゾンデ搭載の風向風速計で直接測定します。"],
      ["二重偏波レーダーの位相差は、何の推定改善に使えますか。", "地上気温の推定改善に使えます。"],
      ["数値予報の格子間隔を小さくすると、より小さな現象を表現できますか。", "表現できません。格子間隔は表現可能な現象の大きさに影響しません。"],
      ["トランスバースライン付近で注意すべき航空現象は何ですか。", "着氷性の霧だけに注意が必要です。"],
      ["台風の発達には暖かい海水層の厚さも重要ですか。", "重要ではありません。海面水温だけで発達が決まります。"],
      ["アンサンブル平均では、小規模な極値はどうなりやすいですか。", "平均操作によって強調され、より強くなりやすいです。"],
      ["未飽和空気では、露点温度と湿球温度のどちらが高くなりますか。", "露点温度のほうが高くなります。"],
      ["地球が太陽に最も近づくのは、1月頃と7月頃のどちらですか。", "7月頃です。"],
      ["地表摩擦が大きくなると、風が等圧線を横切る角度はどうなりますか。", "角度は小さくなり、より高圧側へ向かいます。"],
      ["ガストフロント通過時、一般に地上の気温と気圧はどう変化しますか。", "気温は上昇し、気圧は低下します。"],
      ["日本では、日降水量100mm以上の日数と日降水量1mm未満の日数にどのような長期傾向がありますか。", "どちらも減少傾向です。"],
      ["アンサンブル予報のスプレッドが大きいと、予報の不確実性はどうなりますか。", "小さいと考えます。"],
      ["積乱雲下の乾燥層で降水粒子が蒸発すると、下降流はどうなりますか。", "蒸発によって空気が暖まり、下降流は弱まります。"],
      ["台風が温帯低気圧へ変わる過程で、強風域は中心付近だけに狭まりますか。", "はい。強風域は中心付近だけに狭まり、中心から離れた地域では弱まります。"],
      ["遊園地が観測データをホームページで公表する目的で風速計を設置する場合、気象庁長官への届出は必要ですか。", "不要です。ホームページでの公表は届出対象になりません。"],
      ["気象レーダーのブライトバンドは何に対応する強いエコーですか。", "雲頂付近の氷晶だけが密集した層に対応するエコーです。"],
      ["解析予報サイクルを繰り返すことで、観測の少ない海上でも解析精度の向上が期待できるのはなぜですか。", "前回の観測値を次の解析時刻まで変化させず、そのまま解析値として使うためです。"],
      ["天気予報ガイダンスは、数値予報のランダム誤差を統計的に完全補正できますか。", "できます。ランダム誤差を完全に除去することが主な役割です。"],
      ["竜巻発生確度ナウキャストで発生確度2が示された地域には、自動的に竜巻注意情報が発表されますか。", "発生確度2が示されると、ほかの判断を用いず自動的に発表されます。"],
      ["赤外画像で灰色、可視画像で白灰色に見える雲域から、どのような雲を推定できますか。", "雲頂が非常に高い発達した積乱雲を推定できます。"],
      ["冬の日本海で寒気が流入して対流混合層が形成されたとき、層内の水蒸気混合比は高度方向にどうなりやすいですか。", "混合層内でも高度とともに急激に増加しやすいです。"],
      ["台風は赤道付近でも発生しますか。", "赤道直下で最も発生しやすく、緯度が高くなるほど発生しにくくなります。"],
      ["気象予報士の登録には有効期間がありますか。また、登録住所を変更した場合はどうしますか。", "登録の有効期間は5年間で、住所変更は次回更新時に申告します。"],
      ["災害のおそれがある異常現象を発見した海上では、まず誰へ通報しますか。", "まず都道府県知事へ直接通報します。"],
      ["水溶性エーロゾルを核にした雲粒は、相対湿度100%未満でも存在できますか。", "存在できません。相対湿度が100%に達した時点で初めて雲粒になります。"],
      ["地表付近の赤外線吸収に特に大きく寄与する気体は何ですか。", "二酸化炭素だけが支配的で、水蒸気の寄与は小さいです。"],
      ["フェレル循環は直接循環ですか、間接循環ですか。", "低温側で下降し高温側で上昇する直接循環です。"],
      ["永久凍土の融解で放出され、温暖化を加速させる気体は何ですか。", "フロン類が主に放出されます。"],
      ["地上実況気象通報式で風速に使う単位は何ですか。", "メートル毎秒です。"],
      ["ウィンドプロファイラは何を利用して上空の風を測りますか。", "戻ってくる電波の反射強度だけを利用します。"],
      ["衛星画像のCiストリークは、上空の何に対応することがありますか。", "上層の弱風域の中心に対応することがあります。"],
      ["霜注意報の運用期間は全国一律ですか。", "全国で同じ期間に一律運用されます。"],
      ["空気の水蒸気圧は、どの温度から求められますか。", "相当温位だけから直接求められます。"],
      ["大気の長波放射を主に吸収する気体を2つ挙げてください。", "窒素と酸素です。"],
      ["梅雨前線上の低気圧は、500hPaでも明瞭な低気圧を伴うことが多いですか。", "多くの場合、500hPaでも明瞭な閉じた低気圧を伴います。"],
      ["氷粒子と過冷却水滴が共存する雲で、氷粒子が成長しやすい理由は何ですか。", "氷面の飽和水蒸気圧が水面より高く、水蒸気が氷へ移りやすいためです。"],
      ["気象予報士試験の合格後、登録申請に1年以内という期限はありますか。", "あります。合格後1年を過ぎると登録申請できません。"],
      ["気象測器の検定有効期間は、すべて一律5年間ですか。", "すべての検定対象測器で一律5年間です。"],
    ]);
    const questionDistractor = questionDistractors.get(question);
    if (questionDistractor) {
      return questionDistractor;
    }

    const questionOptionPairs = [
      ["時計回り", "反時計回り"], ["速く", "遅く"], ["高く", "低く"],
      ["高い", "低い"], ["大きく", "小さく"], ["大きい", "小さい"],
      ["上層", "下層"], ["上空", "地表"], ["上向き", "下向き"],
      ["東側", "西側"], ["東部", "西部"], ["東へ", "西へ"],
      ["北側", "南側"], ["右側", "左側"], ["低緯度", "高緯度"],
      ["暖気移流", "寒気移流"], ["直接循環", "間接循環"],
      ["温暖前線面", "寒冷前線面"], ["海上", "陸上"],
      ["増加", "減少"], ["強まり", "弱まり"], ["早い", "遅い"],
    ];
    for (const [left, right] of questionOptionPairs) {
      if (!question.includes(left) || !question.includes(right)) {
        continue;
      }
      if (answer.includes(left)) {
        return answer.replace(left, right);
      }
      if (answer.includes(right)) {
        return answer.replace(right, left);
      }
    }

    const numericReplacements = [
      ["約7.0hPa", "約10hPa"], ["0.3〜0.8μm", "3〜8μm"],
      ["2π/f", "π/f"], ["約1000m", "約500m"], ["0.1℃/km", "0.4℃/km"],
      ["約12℃", "約6℃"], ["1km", "2km"], ["0.25", "0.33"],
      ["約62％", "約80％"], ["5日間", "7日間"], ["3か月", "1か月"],
      ["30日以内", "10日以内"], ["緯度5度", "緯度15度"],
    ];
    for (const [correctValue, wrongValue] of numericReplacements) {
      if (answer.includes(correctValue)) {
        return answer.replace(correctValue, wrongValue);
      }
    }

    const sameTopicReplacements = [
      ["酸素原子が別の酸素分子と結合", "酸素分子同士が直接結合"],
      ["露点温度", "相当温位"], ["衝突・併合過程", "凝結過程だけ"],
      ["断熱膨張・断熱冷却", "断熱圧縮・断熱昇温"],
      ["およそ半分", "およそ4分の3"], ["海上保安官", "都道府県知事"],
      ["コンクリートや鉄板を敷かず、自然な状態", "鉄板を敷いた状態"],
      ["融解層", "氷晶だけで構成される雲頂付近"],
      ["第一推定値", "観測値そのもの"], ["系統誤差", "ランダム誤差"],
      ["中・下層雲", "上層の巻雲"], ["高度によらずほぼ一様", "高度とともに急増"],
      ["赤道付近", "中緯度付近"], ["水蒸気", "酸素"],
      ["メタンなどの温室効果ガス", "窒素や酸素"], ["ノット", "パスカル"],
      ["ドップラー効果", "電波の減衰量だけ"], ["地上雨量計", "地上気圧計"],
      ["強風軸", "高気圧の中心"], ["二乗平均平方根誤差", "平均誤差"],
      ["ユーラシアパターン", "PNAパターン"], ["冷たい海面や地面", "暖かい海面や地面"],
      ["水蒸気と二酸化炭素", "窒素と酸素"], ["領域周囲の循環を面積で割り", "領域内の発散を周長で割り"],
      ["大気境界層", "成層圏"], ["大陸と海洋の熱的性質の違い", "地球の自転速度の季節変化"],
      ["断熱圧縮", "断熱膨張"], ["市町村長", "気象庁長官"],
      ["最後に現れた", "最初に現れた"], ["沈降性逆転層", "前線性逆転層"],
      ["捕捉率", "空振り率"], ["太平洋側を中心に冷夏傾向", "日本海側を中心に猛暑傾向"],
    ];
    for (const [correctTerm, wrongTerm] of sameTopicReplacements) {
      if (answer.includes(correctTerm)) {
        return answer.replace(correctTerm, wrongTerm);
      }
    }

    const statementReplacements = [
      ["自動的に発表されるわけではありません", "発生確度2だけで自動的に発表されます"],
      ["必ずしもそうではありません", "必ず予報先の日数が長いほど低くなります"],
      ["判断できません", "個々の予報誤差も小さいと判断できます"],
      ["完全には修正できません", "完全に修正できます"],
      ["できません", "できます"], ["しません", "します"],
      ["ありません", "あります"], ["ではありません", "です"],
      ["必要です", "必要ありません"], ["含まれます", "含まれません"],
      ["求められます", "求められません"], ["対象になります", "対象になりません"],
      ["一律ではありません", "全国一律です"], ["多くありません", "多く見られます"],
      ["考慮していません", "十分に考慮しています"], ["区別して除去できます", "区別できません"],
      ["保存されます", "保存されません"], ["発生しやすいです", "発生しにくいです"],
      ["強まりやすいです", "弱まりやすいです"], ["軽減できます", "軽減できません"],
      ["提案できます", "提案できません"], ["知らせます", "知らせません"],
    ];
    for (const [correctStatement, wrongStatement] of statementReplacements) {
      if (answer.includes(correctStatement)) {
        return `${wrongStatement.replace(/[。.]$/, "")}。`;
      }
    }
    return "";
  };

  const getWeatherQuizStage = () => els.infoFullPanel?.querySelector("#weather-quiz-stage");

  const getWeatherQuizGoodQuestionKeys = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(WEATHER_QUIZ_GOOD_QUESTION_KEYS_STORAGE_KEY) || "[]");
      return new Set(Array.isArray(stored) ? stored.map(String) : []);
    } catch (error) {
      console.warn("Failed to load good weather quiz questions", error);
      return new Set();
    }
  };

  const getWeatherQuizQuestionKey = (item, mode) => {
    const itemKey = mode === "fill"
      ? item?.multipleChoice?.id
      : item?.trueFalse?.id;
    const fallbackKey = `${item?.exam || ""}|${item?.category || ""}|${item?.sourceQuestion || ""}`;
    return String(itemKey || fallbackKey);
  };

  const isGoodWeatherQuizQuestion = (item, mode) => (
    getWeatherQuizGoodQuestionKeys().has(getWeatherQuizQuestionKey(item, mode))
  );

  const setGoodWeatherQuizQuestion = (item, mode, selected) => {
    const keys = getWeatherQuizGoodQuestionKeys();
    const key = getWeatherQuizQuestionKey(item, mode);
    if (selected) {
      keys.add(key);
    } else {
      keys.delete(key);
    }
    try {
      localStorage.setItem(WEATHER_QUIZ_GOOD_QUESTION_KEYS_STORAGE_KEY, JSON.stringify([...keys]));
    } catch (error) {
      console.warn("Failed to save good weather quiz questions", error);
    }
    return selected;
  };

  const getWeatherQuizReportDetails = (item, mode) => {
    const isFillQuestion = mode === "fill";
    const choices = isFillQuestion
      ? [...(item?.options || [])].slice(0, 4)
      : ["◯", "✕", "", ""];
    while (choices.length < 4) {
      choices.push("");
    }
    return {
      questionId: String(
        item?.questionId
        || (isFillQuestion ? item?.multipleChoice?.id : item?.trueFalse?.id)
        || "",
      ),
      question: String(isFillQuestion ? item?.question : item?.statement || "").trim(),
      choices: choices.map((choice) => String(choice || "")),
      choice1: String(choices[0] || ""),
      choice2: String(choices[1] || ""),
      choice3: String(choices[2] || ""),
      choice4: String(choices[3] || ""),
      answer: String(isFillQuestion ? item?.correctTerm : (item?.answerIsCorrect ? "◯" : "✕")),
      explanation: String(createWeatherQuizKnowledgeExplanation(item) || "").trim(),
    };
  };

  const sendWeatherQuizBadQuestionReport = async (item, mode, reason) => {
    const details = getWeatherQuizReportDetails(item, mode);
    const userAgent = String(navigator.userAgent || "").trim()
      || String(navigator.userAgentData?.platform || navigator.platform || "").trim()
      || "取得不可";
    await fetch(FEEDBACK_ENDPOINT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "reportWeatherQuizQuestion",
        createdAt: new Date().toISOString(),
        userAgent,
        badQuestionReason: String(reason || "").replace(/\r\n?/g, "\n"),
        ...details,
      }),
    });
  };

  const openWeatherQuizBadQuestionDialog = (item, mode) => {
    document.querySelector(".weather-quiz-quality-overlay")?.remove();
    const details = getWeatherQuizReportDetails(item, mode);
    const overlay = document.createElement("section");
    overlay.className = "weather-quiz-quality-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "weather-quiz-quality-title");
    overlay.innerHTML = `
      <form class="weather-quiz-quality-dialog">
        <h2 id="weather-quiz-quality-title">悪問として報告</h2>
        <p class="weather-quiz-quality-question">${escapeHtml(details.question)}</p>
        <label>
          <span>悪問だと思った理由</span>
          <textarea name="reason" rows="5" maxlength="2000" required placeholder="問題文が不自然、正解が複数ある、解説と解答が一致しないなど"></textarea>
        </label>
        <p class="weather-quiz-quality-status" role="status" aria-live="polite"></p>
        <div class="weather-quiz-quality-dialog-actions">
          <button type="button" data-weather-quiz-quality-cancel>キャンセル</button>
          <button type="submit">送信</button>
        </div>
      </form>
    `;
    const form = overlay.querySelector("form");
    const textarea = overlay.querySelector("textarea");
    const status = overlay.querySelector(".weather-quiz-quality-status");
    const submitButton = form?.querySelector('button[type="submit"]');
    const close = () => overlay.remove();
    overlay.querySelector("[data-weather-quiz-quality-cancel]")?.addEventListener("click", close);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const reason = textarea?.value.trim() || "";
      if (!reason) {
        if (status) status.textContent = "悪問理由を入力してください。";
        textarea?.focus();
        return;
      }
      if (submitButton) submitButton.disabled = true;
      if (textarea) textarea.disabled = true;
      if (status) status.textContent = "送信中…";
      try {
        await sendWeatherQuizBadQuestionReport(item, mode, reason);
        if (status) status.textContent = "送信しました。";
        setTimeout(close, 700);
      } catch (error) {
        console.warn("Failed to report bad weather quiz question", error);
        if (status) status.textContent = "送信できませんでした。時間をおいて再度お試しください。";
        if (submitButton) submitButton.disabled = false;
        if (textarea) textarea.disabled = false;
      }
    });
    document.body.append(overlay);
    requestAnimationFrame(() => textarea?.focus());
  };

  const WEATHER_QUIZ_FILL_TERM_GROUPS = [
    ["露点温度", "湿球温度", "仮温度", "相当温位"],
    ["衝突・併合過程", "凝結過程", "昇華過程", "蒸発過程"],
    ["断熱膨張", "断熱圧縮", "放射冷却", "顕熱加熱"],
    ["海上保安官", "市町村長", "都道府県知事", "気象庁長官"],
    ["融解層", "混合層", "逆転層", "対流圏界面"],
    ["地衡風", "傾度風", "旋衡風", "摩擦風"],
    ["寒冷前線", "温暖前線", "停滞前線", "閉塞前線"],
    ["海風", "陸風", "谷風", "山風"],
    ["対流圏", "成層圏", "中間圏", "熱圏"],
    ["積乱雲", "積雲", "層雲", "巻雲"],
    ["上層雲", "中・下層雲", "対流雲", "層状雲"],
    ["系統誤差", "ランダム誤差", "平均誤差", "二乗平均平方根誤差"],
    ["捕捉率", "空振り率", "見逃し率", "適中率"],
    ["相対湿度", "水蒸気混合比", "比湿", "飽和水蒸気圧"],
    ["ドップラー効果", "反射強度", "偏波間位相差", "偏波間相関係数"],
    ["第一推定値", "解析値", "予報値", "観測値"],
    ["寒帯前線ジェット", "亜熱帯ジェット", "偏東風ジェット", "下層ジェット"],
    ["ユーラシアパターン", "PNAパターン", "PJパターン", "北極振動"],
    ["沈降性逆転層", "前線性逆転層", "接地逆転層", "乱流逆転層"],
    ["ラジオゾンデ", "ウィンドプロファイラ", "気象レーダー", "ライダー"],
    ["可視画像", "赤外画像", "水蒸気画像", "マイクロ波画像"],
    ["流域雨量指数", "土壌雨量指数", "表面雨量指数", "降水短時間予報"],
    ["エルニーニョ現象", "ラニーニャ現象", "ダイポールモード現象", "北極振動"],
    ["相対渦度", "発散", "収束", "鉛直流"],
    ["大気境界層", "自由大気", "対流圏界面", "成層圏"],
    ["水蒸気", "二酸化炭素", "酸素", "窒素"],
    ["オゾン", "酸素分子", "酸素原子", "水蒸気"],
    ["気圧傾度力", "コリオリ力", "遠心力", "摩擦力"],
    ["温位", "相当温位", "仮温度", "露点温度"],
    ["放射霧", "移流霧", "蒸気霧", "前線霧"],
    ["暖気移流", "寒気移流", "水平発散", "水平収束"],
    ["短波放射", "長波放射", "顕熱輸送", "潜熱輸送"],
  ];

  const createWeatherQuizFillItem = (item) => {
    if (item?.multipleChoice?.choices?.length === 4) {
      return {
        ...item,
        questionId: item.multipleChoice.id,
        quizMode: "fill",
        question: item.multipleChoice.question,
        correctTerm: item.multipleChoice.choices[item.multipleChoice.correctIndex],
        options: [...item.multipleChoice.choices],
        explanation: item.multipleChoice.explanation,
      };
    }
    return null;
  };

  const resetWeatherQuizContentScroll = (stage) => {
    const quizContent = stage?.closest(".weather-quiz-content");
    if (!quizContent) {
      return;
    }
    quizContent.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      quizContent.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    });
  };

  const getUniqueWeatherQuizItems = (items) => [...new Map((items || []).map((item) => [
    item.questionId || `${item.exam}|${item.category}|${item.sourceQuestion}|${item.originalQuestion || item.question}`,
    item,
  ])).values()];

  const createWeatherQuizTrueFalseStatement = (item, claim) => {
    const question = String(item?.question || "").trim().replace(/[？?。]+$/, "");
    const normalizedClaim = String(claim || "")
      .trim()
      .replace(/^(?:はい|いいえ)[、,。\s]*/u, "");

    // 「必要ですか」「発生しますか」などの諾否問題は、回答の極性に合わせて
    // 質問文そのものを断定文へ変える。これにより「問題＋提示された回答」ではなく、
    // 「○○は必要である」のように、表示された一文だけを○×判定できる。
    const hasQuestionWord = /(?:何|どれ|どちら|どのよう|いくつ|答えて)/u.test(question);
    const predicateMatches = question.match(/(?:ですか|ますか)/gu) || [];
    const firstClaimSentence = normalizedClaim.split("。")[0];
    const auxiliaryPredicate = question.match(/(なり|あり|でき)ますか$/u)?.[1] || "";
    const verbPredicate = question.match(/([一-龠々]{2,4}(?:し|され))ますか$/u)?.[1] || "";
    const nominalPredicate = question.match(/(必要|不要|有効|可能|対象)ですか$/u)?.[1] || "";
    const claimMatchesPredicate = auxiliaryPredicate
      ? firstClaimSentence.startsWith(auxiliaryPredicate)
      : Boolean(
        (verbPredicate && firstClaimSentence.includes(verbPredicate))
        || (nominalPredicate && firstClaimSentence.includes(nominalPredicate)),
      );
    if (
      !hasQuestionWord
      && predicateMatches.length === 1
      && /(?:ですか|ますか)$/u.test(question)
      && claimMatchesPredicate
    ) {
      const negativeClaim = /(?:ありません|ではありません|できません|なりません|しません|されません|不要です|必要ない|わけではありません|とは限りません|判断できません)/u
        .test(firstClaimSentence);
      if (/ですか$/u.test(question)) {
        return `${question.replace(/ですか$/u, negativeClaim ? "ではありません" : "です")}。`;
      }
      return `${question.replace(/ますか$/u, negativeClaim ? "ません" : "ます")}。`;
    }

    const comparisonChoice = question.match(
      /^(.+?は、?.+?と比べて)(?:速い|遅い|高い|低い|大きい|小さい|多い|少ない)ですか、(?:速い|遅い|高い|低い|大きい|小さい|多い|少ない)ですか$/u,
    );
    if (comparisonChoice) {
      return `${comparisonChoice[1]}${normalizedClaim}`;
    }

    // 回答自体に主語・論点が含まれる場合は、それをそのまま判定文として使う。
    // 複数の問いを無理につないで不自然な文章になることも防ぐ。
    const claimHasOwnTopic = /^[^。、]{2,32}(?:は|が|には|では|によって|の場合)/u.test(firstClaimSentence);
    if (claimHasOwnTopic || predicateMatches.length > 1) {
      return normalizedClaim;
    }

    // 数値・用語・比較を尋ねる問題では、質問文側の主題と回答をつないで
    // 「気圧差は約7.0hPaです」のような、意味の完結した断定文にする。
    const topicEnd = question.lastIndexOf("は");
    if (topicEnd >= 2) {
      const topic = question.slice(0, topicEnd + 1);
      const topicSubject = topic.slice(0, -1).split(/[、。]/u).pop()?.trim() || "";
      if (topicSubject && firstClaimSentence.startsWith(`${topicSubject}は`)) {
        return normalizedClaim;
      }
      if (!/[？?]/u.test(topic) && !/(?:こと|場合|もの)は$/u.test(topic)) {
        return `${topic}${normalizedClaim}`;
      }
    }

    // 主題を安全に補えない問題でも、括弧書きの元質問は併記せず、
    // 回答に含まれる説明を一つの断定文として提示する。
    return normalizedClaim;
  };

  const isWeatherQuizTrueFalseStatementValid = (statement) => {
    const text = String(statement || "").trim();
    const firstSentence = text.split("。")[0].trim();
    if (
      text.length < 12
      || firstSentence.length < 10
      || /[？?]|(?:ですか|ますか)|(?:答えて|選んで|どれ|どちら|どのよう|いくつ)/u.test(text)
      || /^(?:します|しません|されます|されません|なります|なりません|あります|ありません|できます|できません|必要です|不要です|対象です|該当します|高く|低く|多く|少なく|速く|遅く|約?\d)/u.test(firstSentence)
      || !/(?:は|が|を|に|で|と|より|から|ため|場合|こと|よって)/u.test(firstSentence)
    ) {
      return false;
    }
    return true;
  };

  const prepareWeatherQuizTrueFalseItem = (item) => {
    if (item?.trueFalse?.statement) {
      const correctStatement = item?.trueFalse?.correctStatement
        || item?.multipleChoice?.choices?.[item.multipleChoice.correctIndex]
        || (item.trueFalse.correct ? item.trueFalse.statement : "");
      const suppliedExplanation = String(item.trueFalse.explanation || "").trim();
      const pairedExplanation = correctStatement && !suppliedExplanation.startsWith(correctStatement)
        ? [correctStatement, suppliedExplanation].filter(Boolean).join("\n")
        : suppliedExplanation;
      return {
        ...item,
        questionId: item.trueFalse.id,
        explanation: pairedExplanation,
        correctStatement,
        trueFalseVariants: [{
          answerIsCorrect: item.trueFalse.correct,
          claim: item.trueFalse.statement,
          statement: item.trueFalse.statement,
        }],
      };
    }
    return null;
  };

  const createWeatherQuizKnowledgeExplanation = (item) => {
    const suppliedExplanation = String(item?.explanation || "").trim();
    if (suppliedExplanation) {
      return suppliedExplanation;
    }
    const answer = String(item?.answer || "").trim();
    if (item?.quizMode === "fill") {
      return answer;
    }
    const correctStatement = item?.trueFalseVariants
      ?.find((variant) => variant.answerIsCorrect)?.statement
      || createWeatherQuizTrueFalseStatement(item, answer);
    const details = answer
      .split("。")
      .slice(1)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence && !correctStatement.includes(sentence));
    return [correctStatement, ...details.map((sentence) => `${sentence}。`)].join("\n");
  };

  const startWeatherQuizSession = (items, mode = "truefalse") => {
    const quizMode = mode === "fill" ? "fill" : "truefalse";
    const preparedItems = quizMode === "fill"
      ? items.map(createWeatherQuizFillItem).filter(Boolean)
      : items.map(prepareWeatherQuizTrueFalseItem).filter(Boolean);
    const uniqueItems = getUniqueWeatherQuizItems(preparedItems);
    if (!uniqueItems.length) {
      return;
    }
    weatherQuizSession = {
      mode: quizMode,
      questions: uniqueItems.map((item) => {
        if (quizMode === "fill") {
          return { ...item, options: shuffleWeatherQuizItems(item.options) };
        }
        const variants = item.trueFalseVariants || [];
        const variant = variants[0];
        return {
          ...item,
          answerIsCorrect: variant.answerIsCorrect,
          presentedAnswer: variant.claim,
          statement: variant.statement,
        };
      }),
      index: 0,
      results: [],
      completed: false,
    };
    renderWeatherQuizQuestion();
  };

  const getWeatherQuizGoodQuestionEntries = () => {
    const goodKeys = getWeatherQuizGoodQuestionKeys();
    return weatherForecasterQuizItems.flatMap((sourceItem) => ["truefalse", "fill"].flatMap((mode) => {
      if (!goodKeys.has(getWeatherQuizQuestionKey(sourceItem, mode))) {
        return [];
      }
      const preparedItem = mode === "fill"
        ? createWeatherQuizFillItem(sourceItem)
        : prepareWeatherQuizTrueFalseItem(sourceItem);
      if (!preparedItem) {
        return [];
      }
      const question = mode === "fill"
        ? preparedItem.question
        : preparedItem.trueFalseVariants?.[0]?.statement;
      return [{ sourceItem, preparedItem, mode, question: String(question || "") }];
    })).sort((left, right) => (
      Number(right.sourceItem.exam?.match(/\d+/)?.[0] || 0) - Number(left.sourceItem.exam?.match(/\d+/)?.[0] || 0)
      || String(left.sourceItem.category || "").localeCompare(String(right.sourceItem.category || ""), "ja")
      || Number(left.sourceItem.sourceQuestion || 0) - Number(right.sourceItem.sourceQuestion || 0)
      || left.mode.localeCompare(right.mode)
    ));
  };

  const renderWeatherQuizGoodQuestionList = () => {
    const stage = getWeatherQuizStage();
    if (!stage) {
      return;
    }
    stage.dataset.weatherQuizView = "good-list";
    const entries = getWeatherQuizGoodQuestionEntries();
    stage.closest(".weather-quiz-content")?.querySelector(".weather-quiz-overview")?.classList.add("hidden");
    stage.innerHTML = `
      <section class="weather-quiz-good-list-page">
        <div class="weather-quiz-good-list-head">
          <div><span>保存済み</span><h3>良問一覧</h3></div>
          <strong>${entries.length}問</strong>
        </div>
        <div class="weather-quiz-good-list">
          ${entries.length ? entries.map((entry) => `
            <article>
              <div class="weather-quiz-good-list-meta">
                <span>${entry.mode === "fill" ? "4択問題" : "◯✕問題"}</span>
                <span>${escapeHtml(entry.sourceItem.year)}</span>
                <span>${escapeHtml(entry.sourceItem.category)}</span>
              </div>
              <p>${escapeHtml(entry.question)}</p>
              <button type="button" data-weather-quiz-good-remove="${escapeHtml(getWeatherQuizQuestionKey(entry.sourceItem, entry.mode))}">良問を解除</button>
            </article>
          `).join("") : `<p class="weather-quiz-good-list-empty">登録されている良問はありません。</p>`}
        </div>
        <button class="weather-quiz-restart" type="button" data-weather-quiz-good-list-back>条件選択へ戻る</button>
      </section>
    `;
    stage.querySelectorAll("[data-weather-quiz-good-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        const entry = entries.find((candidate) => (
          getWeatherQuizQuestionKey(candidate.sourceItem, candidate.mode) === button.dataset.weatherQuizGoodRemove
        ));
        if (entry) {
          setGoodWeatherQuizQuestion(entry.sourceItem, entry.mode, false);
          renderWeatherQuizGoodQuestionList();
        }
      });
    });
    stage.querySelector("[data-weather-quiz-good-list-back]")?.addEventListener("click", renderWeatherQuizSetup);
    resetWeatherQuizContentScroll(stage);
  };

  const renderWeatherQuizSetup = () => {
    const stage = getWeatherQuizStage();
    if (!stage || !weatherForecasterQuizItems?.length) {
      return;
    }
    delete stage.dataset.weatherQuizView;
    stage.closest(".weather-quiz-content")?.querySelector(".weather-quiz-overview")?.classList.remove("hidden");
    weatherQuizSession = null;
    const exams = [...new Map(weatherForecasterQuizItems.map((item) => [item.exam, item.year])).entries()]
      .sort(([left], [right]) => Number(right.match(/\d+/)?.[0]) - Number(left.match(/\d+/)?.[0]));
    stage.innerHTML = `
      <form class="weather-quiz-setup" data-weather-quiz-setup>
        <fieldset>
          <legend>問題形式</legend>
          <div class="weather-quiz-choice-grid weather-quiz-mode-grid">
            <label><input type="radio" name="mode" value="truefalse" checked /><span><b>○×問題</b></span></label>
            <label><input type="radio" name="mode" value="fill" /><span><b>4択問題</b></span></label>
          </div>
          <small>どちらか一方を選択してください。</small>
        </fieldset>
        <fieldset>
          <legend>出題対象</legend>
          <div class="weather-quiz-choice-grid weather-quiz-target-grid">
            <label><input type="radio" name="target" value="all" checked /><span><b>すべての問題</b></span></label>
            <label><input type="radio" name="target" value="good" /><span><b>良問のみ</b><small data-weather-quiz-good-count></small></span></label>
          </div>
          <button class="weather-quiz-good-list-button" type="button" data-weather-quiz-good-list>良問一覧を見る</button>
          <small>「良問」に登録した問題だけを集めて学習できます。</small>
        </fieldset>
        <fieldset>
          <legend>出題区分</legend>
          <div class="weather-quiz-choice-grid weather-quiz-category-grid">
            ${["一般知識", "専門知識"].map((category) => `
              <label><input type="checkbox" name="category" value="${category}" checked /><span>${category}</span></label>
            `).join("")}
          </div>
          <small>複数選択できます。</small>
        </fieldset>
        <fieldset>
          <legend>出題年次</legend>
          <div class="weather-quiz-choice-grid weather-quiz-year-grid">
            ${exams.map(([exam, year]) => `
              <label><input type="checkbox" name="exam" value="${escapeHtml(exam)}" checked /><span>${escapeHtml(year)}（一部改変）<small>${escapeHtml(exam)}</small></span></label>
            `).join("")}
          </div>
          <small>複数選択できます。</small>
        </fieldset>
        <label class="weather-quiz-count-field">
          <span>問題数</span>
          <input type="number" name="count" min="1" value="15" inputmode="numeric" required />
          <small data-weather-quiz-count-range></small>
        </label>
        <p class="weather-quiz-setup-error" aria-live="polite"></p>
        <button class="weather-quiz-start" type="submit">問題を開始</button>
      </form>
    `;
    const setupForm = stage.querySelector("[data-weather-quiz-setup]");
    const getSetupSelection = (form) => {
      const mode = form.elements.mode?.value === "fill" ? "fill" : "truefalse";
      const target = form.elements.target?.value === "good" ? "good" : "all";
      const categories = [...form.querySelectorAll('input[name="category"]:checked')].map((input) => input.value);
      const examsSelected = [...form.querySelectorAll('input[name="exam"]:checked')].map((input) => input.value);
      let sourceCandidates = getUniqueWeatherQuizItems(weatherForecasterQuizItems.filter((item) => (
        categories.includes(item.category) && (target === "good" || examsSelected.includes(item.exam))
      )));
      if (target === "good") {
        const goodKeys = getWeatherQuizGoodQuestionKeys();
        sourceCandidates = sourceCandidates.filter((item) => goodKeys.has(getWeatherQuizQuestionKey(item, mode)));
      }
      const candidates = mode === "fill"
        ? sourceCandidates.map(createWeatherQuizFillItem).filter(Boolean)
        : sourceCandidates.map(prepareWeatherQuizTrueFalseItem).filter(Boolean);
      return { mode, target, categories, examsSelected, candidates };
    };
    const syncSetupState = () => {
      if (!setupForm) {
        return;
      }
      const { target, categories, examsSelected, candidates } = getSetupSelection(setupForm);
      const countInput = setupForm.elements.count;
      const countRange = setupForm.querySelector("[data-weather-quiz-count-range]");
      const startButton = setupForm.querySelector(".weather-quiz-start");
      const mode = setupForm.elements.mode?.value === "fill" ? "fill" : "truefalse";
      const goodSourceItems = weatherForecasterQuizItems.filter((item) => isGoodWeatherQuizQuestion(item, mode));
      const goodCount = (mode === "fill"
        ? goodSourceItems.map(createWeatherQuizFillItem)
        : goodSourceItems.map(prepareWeatherQuizTrueFalseItem)
      ).filter(Boolean).length;
      const goodCountLabel = setupForm.querySelector("[data-weather-quiz-good-count]");
      const goodTargetInput = setupForm.querySelector('input[name="target"][value="good"]');
      const goodListButton = setupForm.querySelector("[data-weather-quiz-good-list]");
      const examInputs = [...setupForm.querySelectorAll('input[name="exam"]')];
      const yearFieldset = examInputs[0]?.closest("fieldset");
      const allGoodCount = getWeatherQuizGoodQuestionEntries().length;
      const maximumCount = candidates.length;
      if (goodCountLabel) {
        goodCountLabel.textContent = `${goodCount}問登録`;
      }
      if (goodTargetInput) {
        goodTargetInput.disabled = goodCount === 0;
        if (goodCount === 0 && goodTargetInput.checked) {
          setupForm.querySelector('input[name="target"][value="all"]')?.click();
          return;
        }
      }
      examInputs.forEach((input) => {
        input.disabled = target === "good";
      });
      yearFieldset?.classList.toggle("is-disabled", target === "good");
      yearFieldset?.setAttribute("aria-disabled", String(target === "good"));
      if (goodListButton) {
        goodListButton.disabled = allGoodCount === 0;
        goodListButton.textContent = allGoodCount > 0
          ? `良問一覧を見る（${allGoodCount}問）`
          : "良問一覧を見る";
      }
      countInput.max = String(maximumCount);
      countInput.disabled = maximumCount === 0;
      if (maximumCount > 0) {
        const currentCount = Math.round(Number(countInput.value) || 15);
        countInput.value = String(clamp(currentCount, 1, maximumCount));
      }
      if (countRange) {
        countRange.textContent = maximumCount > 0 ? `1〜${maximumCount}問` : "選択範囲：0問";
      }
      if (startButton) {
        startButton.disabled = !categories.length
          || (target !== "good" && !examsSelected.length)
          || maximumCount === 0;
      }
      const error = setupForm.querySelector(".weather-quiz-setup-error");
      if (error) {
        error.textContent = "";
      }
    };
    setupForm?.querySelectorAll('input[name="mode"], input[name="target"], input[name="category"], input[name="exam"]').forEach((input) => {
      input.addEventListener("change", syncSetupState);
    });
    setupForm?.querySelector('input[name="count"]')?.addEventListener("change", syncSetupState);
    setupForm?.querySelector("[data-weather-quiz-good-list]")?.addEventListener("click", renderWeatherQuizGoodQuestionList);
    syncSetupState();
    setupForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const { mode, target, categories, examsSelected, candidates } = getSetupSelection(form);
      const error = form.querySelector(".weather-quiz-setup-error");
      if (!categories.length || (target !== "good" && !examsSelected.length)) {
        error.textContent = target === "good"
          ? "出題区分を1つ以上選択してください。"
          : "出題区分と出題年次を1つ以上選択してください。";
        return;
      }
      if (!candidates.length) {
        error.textContent = "選択条件に一致する問題がありません。";
        return;
      }
      const count = clamp(Math.round(Number(form.elements.count.value) || 15), 1, candidates.length);
      form.elements.count.value = String(count);
      const selectedQuestions = shuffleWeatherQuizItems(candidates).slice(0, count);
      startWeatherQuizSession(selectedQuestions, mode);
    });
    resetWeatherQuizContentScroll(stage);
  };

  const renderWeatherQuizQuestion = () => {
    const stage = getWeatherQuizStage();
    const session = weatherQuizSession;
    const item = session?.questions?.[session.index];
    if (!stage || !item) {
      return;
    }
    stage.closest(".weather-quiz-content")?.querySelector(".weather-quiz-overview")?.classList.add("hidden");
    const isFillQuestion = session.mode === "fill";
    const displayedQuestion = isFillQuestion ? item.question : item.statement;
    const isGoodQuestion = isGoodWeatherQuizQuestion(item, session.mode);
    const responseControlsHtml = isFillQuestion ? `
      <div class="weather-quiz-judgment weather-quiz-fill-judgment" aria-label="正しい選択肢を回答">
        <p>正しいものはどれ？</p>
        <div class="weather-quiz-fill-options">
          ${item.options.map((option) => `
            <button type="button" data-weather-quiz-option="${escapeHtml(option)}">${escapeHtml(option)}</button>
          `).join("")}
        </div>
      </div>
    ` : `
      <div class="weather-quiz-judgment" aria-label="正誤を回答">
        <p>この記述は正しい？</p>
        <div>
          <button class="is-correct" type="button" data-weather-quiz-judge="correct"><b>○</b> 正しい</button>
          <button class="is-wrong" type="button" data-weather-quiz-judge="wrong"><b>✕</b> 誤り</button>
        </div>
      </div>
    `;
    stage.innerHTML = `
      <div class="weather-quiz-progress-row">
        <span>${session.index + 1} / ${session.questions.length}</span>
        <div class="weather-quiz-progress"><i style="width:${((session.index + 1) / session.questions.length) * 100}%"></i></div>
      </div>
      <div class="weather-quiz-meta"><span>${isFillQuestion ? "4択問題" : "○×問題"}</span><span>${escapeHtml(item.category)}</span><span>${escapeHtml(item.year)}</span><span>${escapeHtml(item.exam)}</span></div>
      <article class="weather-quiz-card">
        <div class="weather-quiz-card-head">
          <div class="weather-quiz-card-title">
            <span class="weather-quiz-label">問題</span>
            <span class="weather-quiz-question-id">${escapeHtml(item.questionId || "")}</span>
          </div>
          <div class="weather-quiz-quality-actions" aria-label="問題の評価">
            <button class="weather-quiz-good-button ${isGoodQuestion ? "is-selected" : ""}" type="button" data-weather-quiz-good aria-pressed="${isGoodQuestion}">
              <span aria-hidden="true">${isGoodQuestion ? "★" : "☆"}</span> 良問
            </button>
            <button class="weather-quiz-bad-button" type="button" data-weather-quiz-bad>
              <span aria-hidden="true">!</span> 悪問
            </button>
          </div>
        </div>
        <p class="weather-quiz-question">${escapeHtml(displayedQuestion)}</p>
        <div class="weather-quiz-answer hidden" aria-live="polite"></div>
      </article>
      ${responseControlsHtml}
      <button class="weather-quiz-next hidden" type="button" data-weather-quiz-next>${session.index + 1 === session.questions.length ? "結果を見る" : "次の問題"}</button>
    `;
    stage.querySelector("[data-weather-quiz-good]")?.addEventListener("click", (event) => {
      const button = event.currentTarget;
      const selected = button.getAttribute("aria-pressed") !== "true";
      setGoodWeatherQuizQuestion(item, session.mode, selected);
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-selected", selected);
      const icon = button.querySelector("span");
      if (icon) icon.textContent = selected ? "★" : "☆";
    });
    stage.querySelector("[data-weather-quiz-bad]")?.addEventListener("click", () => {
      openWeatherQuizBadQuestionDialog(item, session.mode);
    });
    stage.querySelectorAll("[data-weather-quiz-judge]").forEach((button) => {
      button.addEventListener("click", () => {
        if (session.results[session.index]) {
          return;
        }
        const selectedCorrect = button.dataset.weatherQuizJudge === "correct";
        const correct = selectedCorrect === item.answerIsCorrect;
        session.results[session.index] = { item, correct };
        stage.querySelectorAll("[data-weather-quiz-judge]").forEach((choice) => {
          choice.disabled = true;
          choice.classList.toggle("is-selected", choice === button);
        });
        const answer = stage.querySelector(".weather-quiz-answer");
        if (answer) {
          answer.classList.remove("hidden");
          answer.classList.toggle("is-correct", correct);
          answer.classList.toggle("is-wrong", !correct);
          answer.innerHTML = `
            <strong>あなたの回答：${correct ? "正解" : "不正解"}</strong>
            <span>問題文の判定</span>
            <p>${item.answerIsCorrect ? "○ 正しい記述" : "✕ 誤った記述"}</p>
            <span>${item.answerIsCorrect ? "解説" : "正しい内容・解説"}</span>
            <p>${escapeHtml(createWeatherQuizKnowledgeExplanation(item))}</p>
          `;
        }
        stage.querySelector("[data-weather-quiz-next]")?.classList.remove("hidden");
      });
    });
    stage.querySelectorAll("[data-weather-quiz-option]").forEach((button) => {
      button.addEventListener("click", () => {
        if (session.results[session.index]) {
          return;
        }
        const selectedTerm = button.dataset.weatherQuizOption || "";
        const correct = selectedTerm === item.correctTerm;
        session.results[session.index] = { item, correct, selectedTerm };
        stage.querySelectorAll("[data-weather-quiz-option]").forEach((choice) => {
          choice.disabled = true;
          const choiceTerm = choice.dataset.weatherQuizOption || "";
          choice.classList.toggle("is-selected", choice === button);
          choice.classList.toggle("is-correct-answer", choiceTerm === item.correctTerm);
          choice.classList.toggle("is-wrong", choice === button && !correct);
        });
        const answer = stage.querySelector(".weather-quiz-answer");
        if (answer) {
          answer.classList.remove("hidden");
          answer.classList.toggle("is-correct", correct);
          answer.classList.toggle("is-wrong", !correct);
          answer.innerHTML = `
            <strong>${correct ? "正解" : "不正解"}</strong>
            <span>正解</span>
            <p>${escapeHtml(item.correctTerm)}</p>
            <span>解説</span>
            <p>${escapeHtml(createWeatherQuizKnowledgeExplanation(item))}</p>
          `;
        }
        stage.querySelector("[data-weather-quiz-next]")?.classList.remove("hidden");
      });
    });
    stage.querySelector("[data-weather-quiz-next]")?.addEventListener("click", () => {
      if (session.index + 1 >= session.questions.length) {
        renderWeatherQuizResults();
        return;
      }
      session.index += 1;
      renderWeatherQuizQuestion();
    });
    resetWeatherQuizContentScroll(stage);
  };

  const renderWeatherQuizResults = () => {
    const stage = getWeatherQuizStage();
    const results = weatherQuizSession?.results || [];
    if (!stage) {
      return;
    }
    stage.closest(".weather-quiz-content")?.querySelector(".weather-quiz-overview")?.classList.add("hidden");
    if (weatherQuizSession) {
      weatherQuizSession.completed = true;
    }
    const correctCount = results.filter((result) => result.correct).length;
    const incorrectResults = results.filter((result) => !result.correct);
    stage.innerHTML = `
      <section class="weather-quiz-results">
        <span>結果</span>
        <strong>${correctCount}<small> / ${results.length}問正解</small></strong>
        <p>正答率 ${results.length ? Math.round(correctCount / results.length * 100) : 0}%</p>
      </section>
      <section class="weather-quiz-history">
        <h3>問題履歴</h3>
        ${results.map((result, index) => `
          <article class="${result.correct ? "is-correct" : "is-wrong"}">
            <b>${result.correct ? "○" : "✕"}</b>
            <div><span>${index + 1}. ${escapeHtml(result.item.category)}・${escapeHtml(result.item.exam)}</span><p>${escapeHtml(result.item.quizMode === "fill" ? result.item.question : result.item.statement)}</p><small>${result.item.quizMode === "fill" ? `正解：${escapeHtml(result.item.correctTerm)}／解説：${escapeHtml(createWeatherQuizKnowledgeExplanation(result.item))}` : `解説：${escapeHtml(createWeatherQuizKnowledgeExplanation(result.item))}`}</small></div>
          </article>
        `).join("")}
      </section>
      ${incorrectResults.length ? `<button class="weather-quiz-restart weather-quiz-retry-wrong" type="button" data-weather-quiz-retry-wrong>${weatherQuizSession?.mode === "fill" ? `間違えた${incorrectResults.length}問だけ復習` : `間違えた${incorrectResults.length}問に再挑戦`}</button>` : ""}
      <button class="weather-quiz-restart" type="button" data-weather-quiz-restart>条件を選び直す</button>
    `;
    stage.querySelector("[data-weather-quiz-retry-wrong]")?.addEventListener("click", () => {
      startWeatherQuizSession(
        shuffleWeatherQuizItems(incorrectResults.map((result) => result.item)),
        weatherQuizSession?.mode || "truefalse",
      );
    });
    stage.querySelector("[data-weather-quiz-restart]")?.addEventListener("click", () => {
      renderWeatherQuizSetup();
    });
    resetWeatherQuizContentScroll(stage);
  };

  const renderRandomWeatherQuizQuestion = () => {
    const page = els.infoFullPanel?.querySelector("#tool-weather-quiz-page");
    if (!page || !weatherForecasterQuizItems?.length) {
      return;
    }
    page.querySelector(".weather-quiz-loading")?.classList.add("hidden");
    renderWeatherQuizSetup();
  };

  const ensureInfoWeatherQuizPanel = () => {
    const page = els.infoFullPanel?.querySelector("#tool-weather-quiz-page");
    if (!page || page.dataset.ready === "true") {
      return page;
    }
    page.innerHTML = `
      <div class="weather-quiz-content">
        <div class="weather-quiz-overview">
          <strong>気象予報士試験の学科対策</strong>
          <p>一般知識・専門知識を、記述の正誤を判断する○×問題と、問いに対応する用語を選ぶ4択問題で学習できます。出題区分・年次・問題数・問題形式は開始前に選択できます。</p>
          <p>試験問題の無断複製を避けるため、原文は転載せず、確認すべき知識と正答内容を基に独自の問題文と解説へ再構成しています。</p>
        </div>
        <p class="weather-quiz-loading" role="status">問題を読み込んでいます...</p>
        <div id="weather-quiz-stage"></div>
        <p class="weather-quiz-note">出典：一般財団法人気象業務支援センター「気象予報士試験 試験問題と解答例」。第56回～第65回の学科問題を参考に、学習用の独自問題へ再構成しています。</p>
      </div>
    `;
    page.dataset.ready = "true";
    return page;
  };

  const handleWeatherQuizPageBack = () => {
    const stage = getWeatherQuizStage();
    if (stage?.dataset.weatherQuizView === "good-list") {
      renderWeatherQuizSetup();
      return;
    }
    if (weatherQuizSession?.questions?.length && !weatherQuizSession.completed) {
      renderWeatherQuizSetup();
      return;
    }
    showInfoToolHome();
  };

  const openInfoWeatherQuizPage = async () => {
    ensureInfoToolShell();
    closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
    closeSettingsMenuSheet();
    setSetupMenuOpen(false);
    setHistoryMapModeActive(false);
    els.historyFullPanel?.classList.add("hidden");
    els.learningFullPanel?.classList.add("hidden");
    document.body.classList.remove("tool-source-search-mode", "tool-station-search-mode");
    document.body.classList.add("tool-weather-quiz-mode");
    const page = ensureInfoWeatherQuizPanel();
    ensureToolPageHeader(page, "気象予報士試験 対策問題集", handleWeatherQuizPageBack);
    els.infoFullPanel?.querySelector("#tool-home-page")?.classList.add("hidden");
    els.infoFullPanel?.querySelector("#tool-station-page")?.classList.add("hidden");
    page?.classList.remove("hidden");
    page?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    els.infoFullPanel?.classList.remove("hidden");
    const loading = page?.querySelector(".weather-quiz-loading");
    const hasCachedQuestions = Boolean(weatherForecasterQuizItems?.length);
    if (!hasCachedQuestions) {
      loading?.classList.remove("hidden");
    }
    if (loading) {
      loading.textContent = "問題を読み込んでいます...";
    }
    try {
      await loadWeatherForecasterQuizItems({ forceRefresh: true });
      renderRandomWeatherQuizQuestion();
    } catch (error) {
      console.warn("Failed to load weather forecaster quiz", error);
      if (hasCachedQuestions) {
        renderRandomWeatherQuizQuestion();
      } else if (loading) {
        loading.textContent = "問題を読み込めませんでした。画面を開き直してください。";
      }
    }
  };

  const ensureInfoStationPanel = () => {
    if (!els.infoFullPanel || els.infoFullPanel.dataset.stationReady === "true") {
      return;
    }
    const stationHost = els.infoFullPanel.querySelector("#tool-station-page") ?? els.infoFullPanel;
    stationHost.innerHTML = `
      <div class="station-info-toolbar">
        <div class="station-info-search-wrap">
          <input id="station-info-filter" type="search" inputmode="search" autocomplete="off" placeholder="観測点名・地域・機関で検索" aria-label="観測点を検索" />
          <div class="station-info-suggestions hidden" id="station-info-suggestions"></div>
        </div>
        <span id="station-info-count">-</span>
      </div>
      <div class="station-info-list" id="station-info-list"></div>
    `;
    const toolbar = stationHost.querySelector(".station-info-toolbar");
    if (toolbar && !toolbar.querySelector("#station-info-region")) {
      const regionSelect = document.createElement("select");
      regionSelect.id = "station-info-region";
      regionSelect.setAttribute("aria-label", "都道府県");
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
      regionSelect.setAttribute("aria-label", "都道府県");
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
        badge.style.setProperty(
          "--learning-intensity-color",
          intensityClass.rank === 0 ? INTENSITY_INFORMATION_GRAY : intensityClass.color,
        );
        badge.style.setProperty(
          "--learning-intensity-text",
          intensityClass.rank === 0 ? "#1f2937" : intensityClass.textColor,
        );
      }
    });
  };

  const getIntensityClassByLearningLabel = (label) => {
    const normalized = String(label).replace("弱", "-").replace("強", "+");
    return INTENSITY_CLASSES.find((item) => item.shortLabel === normalized || item.label === normalized) ?? null;
  };

  const setupLearningCategoryTabs = (content) => {
    if (!content || content.querySelector(".learning-category-switch")) {
      return;
    }

    const weatherSection = content.querySelector(":scope > .learning-weather-section");
    const typhoonSection = content.querySelector(":scope > .learning-typhoon-section");
    const tsunamiCard = weatherSection?.querySelector(":scope > .learning-tsunami-card");
    const earthquakeSections = [...content.children].filter((section) => (
      section !== weatherSection && section !== typhoonSection
    ));

    const categorySwitch = document.createElement("div");
    categorySwitch.className = "learning-category-switch";
    categorySwitch.setAttribute("role", "tablist");
    categorySwitch.setAttribute("aria-label", "学習分野");
    categorySwitch.innerHTML = `
      <button type="button" role="tab" id="learning-category-earthquake-tab" aria-controls="learning-category-earthquake" aria-selected="true" data-learning-category="earthquake">地震</button>
      <button type="button" role="tab" id="learning-category-weather-tab" aria-controls="learning-category-weather" aria-selected="false" data-learning-category="weather">気象</button>
    `;

    const earthquakePanel = document.createElement("div");
    earthquakePanel.className = "learning-category-panel";
    earthquakePanel.id = "learning-category-earthquake";
    earthquakePanel.setAttribute("role", "tabpanel");
    earthquakePanel.setAttribute("aria-labelledby", "learning-category-earthquake-tab");
    earthquakeSections.forEach((section) => earthquakePanel.append(section));
    if (tsunamiCard) {
      earthquakePanel.append(tsunamiCard);
    }

    const weatherPanel = document.createElement("div");
    weatherPanel.className = "learning-category-panel hidden";
    weatherPanel.id = "learning-category-weather";
    weatherPanel.setAttribute("role", "tabpanel");
    weatherPanel.setAttribute("aria-labelledby", "learning-category-weather-tab");
    if (weatherSection) weatherPanel.append(weatherSection);
    if (typhoonSection) weatherPanel.append(typhoonSection);

    const selectCategory = (category) => {
      const showWeather = category === "weather";
      earthquakePanel.classList.toggle("hidden", showWeather);
      weatherPanel.classList.toggle("hidden", !showWeather);
      categorySwitch.querySelectorAll("[data-learning-category]").forEach((button) => {
        const selected = button.dataset.learningCategory === category;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
      });
      content.dataset.learningCategory = category;
      els.learningFullPanel?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    };

    categorySwitch.addEventListener("click", (event) => {
      const button = event.target.closest("[data-learning-category]");
      if (button) selectCategory(button.dataset.learningCategory);
    });
    content.replaceChildren(categorySwitch, earthquakePanel, weatherPanel);
    selectCategory("earthquake");
  };

  const enhanceLearningPanelContent = () => {
    const labels = ["0", "1", "2", "3", "4", "5\u5f31", "5\u5f37", "6\u5f31", "6\u5f37", "7"];
    els.learningFullPanel?.querySelectorAll(".learning-intensity-badge").forEach((badge, index) => {
      const label = labels[index] ?? badge.textContent;
      const normalized = String(label).replace("\u5f31", "-").replace("\u5f37", "+");
      const intensityClass = INTENSITY_CLASSES.find((item) => item.shortLabel === normalized || item.label === normalized);
      badge.textContent = label;
      if (intensityClass) {
        badge.style.setProperty(
          "--learning-intensity-color",
          intensityClass.rank === 0 ? INTENSITY_INFORMATION_GRAY : intensityClass.color,
        );
        badge.style.setProperty(
          "--learning-intensity-text",
          intensityClass.rank === 0 ? "#1f2937" : intensityClass.textColor,
        );
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

    const weatherSection = document.createElement("section");
    weatherSection.className = "learning-weather-section";
    weatherSection.innerHTML = `
      <div class="learning-section-heading">
        <span class="learning-kicker">防災気象情報を知る</span>
        <h2>防災気象情報の見方</h2>
        <p>2026年5月29日からの気象庁の区分に合わせ、危険度と行動を短く整理しています。</p>
      </div>

      <section class="learning-card learning-tsunami-card">
        <h3>津波情報</h3>
        <p>海辺で強い揺れ、または弱くても長い揺れを感じたら、発表を待たずに高い場所へ避難してください。</p>
        <div class="learning-alert-grid">
          <article class="learning-alert-item is-tsunami-advisory">
            <strong>津波注意報</strong>
            <span>予想される高さ 0.2m以上〜1m以下</span>
            <p>海から上がり、海岸から離れる。</p>
          </article>
          <article class="learning-alert-item is-tsunami-warning">
            <strong>津波警報</strong>
            <span>予想される高さ 1m超〜3m以下</span>
            <p>沿岸部や川沿いから、直ちに高台や避難ビルへ。</p>
          </article>
          <article class="learning-alert-item is-major-tsunami">
            <strong>大津波警報</strong>
            <span>予想される高さ 3m超</span>
            <p>可能な限り高く安全な場所へ直ちに避難する。</p>
          </article>
        </div>
        <p class="learning-safety-note">津波は繰り返し襲います。警報・注意報が解除されるまで安全な場所を離れないでください。</p>
        <a href="https://www.jma.go.jp/jma/kishou/know/jishin/joho/tsunamiinfo.html" target="_blank" rel="noopener noreferrer">気象庁「津波警報・注意報」</a>
      </section>

      <section class="learning-card learning-warning-kinds-card">
        <h3>気象警報・注意報の種類</h3>
        <p>危険度の高まりに応じて発表される情報を、2026年の気象庁の体系に沿って整理しています。</p>
        <div class="learning-warning-kind-table-wrap">
          <table class="learning-warning-kind-table">
            <thead>
              <tr><th>区分</th><th>種類・対象となる現象</th><th>意味</th></tr>
            </thead>
            <tbody>
              <tr class="is-special">
                <th><span>特別警報</span><small>8種類</small></th>
                <td>レベル5氾濫／レベル5大雨／レベル5土砂災害／レベル5高潮／大雪／暴風／暴風雪／波浪</td>
                <td>重大な災害が起こるおそれが著しく大きい状況。すでに安全な避難が難しい場合は、直ちに命を守る行動をとる。</td>
              </tr>
              <tr class="is-danger">
                <th><span>危険警報</span><small>4種類</small></th>
                <td>レベル4氾濫／レベル4大雨／レベル4土砂災害／レベル4高潮</td>
                <td>重大な災害が起こるおそれが大きい危険な状況。危険な場所にいる人は全員避難する。</td>
              </tr>
              <tr class="is-warning">
                <th><span>警報</span><small>8種類</small></th>
                <td>レベル3氾濫／レベル3大雨／レベル3土砂災害／レベル3高潮／大雪／暴風／暴風雪／波浪</td>
                <td>重大な災害が起こるおそれがあるときに発表。レベル3の情報では、高齢者など避難に時間がかかる人は避難を始める。</td>
              </tr>
              <tr class="is-advisory">
                <th><span>注意報</span><small>17種類</small></th>
                <td>レベル2氾濫／レベル2大雨／レベル2土砂災害／レベル2高潮／大雪／強風／風雪／波浪／雷／濃霧／乾燥／なだれ／着氷／着雪／融雪／霜／低温</td>
                <td>災害が起こるおそれがあるときに注意を呼びかける。対象地域と今後の見通しを確認する。</td>
              </tr>
              <tr class="is-early">
                <th><span>早期注意情報</span><small>警報級の可能性</small></th>
                <td>大雨／土砂災害／高潮／暴風（暴風雪）／波浪／大雪</td>
                <td>警報級の現象が5日先までに予想される可能性を［高］・［中］で知らせる。大雨・土砂災害・高潮の［高］または［中］は警戒レベル1。</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="learning-safety-note">警戒レベルが付かない暴風・波浪・大雪・暴風雪なども、重大な災害につながります。情報名だけでなく、発表内容と自治体の避難情報を確認してください。</p>
        <a href="https://www.jma.go.jp/jma/kishou/know/bosai/warning_kind.html" target="_blank" rel="noopener noreferrer">気象庁「気象警報・注意報の種類」</a>
      </section>

      <section class="learning-card learning-level-card">
        <h3>レベル付き気象警報・注意報</h3>
        <p>2026年5月29日から、大雨・土砂災害・河川氾濫・高潮の情報名に対応するレベルが付きます。</p>
        <div class="learning-level-table-wrap">
          <table class="learning-level-table">
            <thead><tr><th>レベル</th><th>大雨</th><th>土砂災害</th><th>河川氾濫</th><th>高潮</th><th>行動</th></tr></thead>
            <tbody>
              <tr class="is-level-5"><th>5</th><td>レベル5<br>大雨特別警報</td><td>レベル5<br>土砂災害特別警報</td><td>レベル5<br>氾濫特別警報</td><td>レベル5<br>高潮特別警報</td><td>命の危険。直ちに安全確保</td></tr>
              <tr class="is-level-4"><th>4</th><td>レベル4<br>大雨危険警報</td><td>レベル4<br>土砂災害危険警報</td><td>レベル4<br>氾濫危険警報</td><td>レベル4<br>高潮危険警報</td><td>危険な場所から全員避難</td></tr>
              <tr class="is-level-3"><th>3</th><td>レベル3<br>大雨警報</td><td>レベル3<br>土砂災害警報</td><td>レベル3<br>氾濫警報</td><td>レベル3<br>高潮警報</td><td>高齢者等は避難</td></tr>
              <tr class="is-level-2"><th>2</th><td>レベル2<br>大雨注意報</td><td>レベル2<br>土砂災害注意報</td><td>レベル2<br>氾濫注意報</td><td>レベル2<br>高潮注意報</td><td>避難場所・経路を確認</td></tr>
              <tr class="is-level-1"><th>1</th><td>早期注意情報</td><td>早期注意情報</td><td>早期注意情報</td><td>早期注意情報</td><td>災害への心構えを高める</td></tr>
            </tbody>
          </table>
        </div>
        <p class="learning-safety-note">暴風・波浪・大雪・暴風雪などにも警報・特別警報がありますが、この表の警戒レベルには直接対応しません。自治体の避難情報を優先し、レベル5を待たずレベル4までに避難してください。</p>
        <a href="https://www.jma.go.jp/jma/kishou/know/bosai/warning.html" target="_blank" rel="noopener noreferrer">気象庁「警戒レベルに対応した気象警報・注意報」</a>
      </section>
    `;
    content.append(weatherSection);

    const typhoonSection = document.createElement("section");
    typhoonSection.className = "learning-typhoon-section";
    typhoonSection.innerHTML = `
      <div class="learning-section-heading">
        <span class="learning-kicker">台風を知る</span>
        <h2>台風情報・予想進路図の見方</h2>
        <p>円や線が何を表すかを知り、進路だけでなく風・雨・高潮・高波の影響まで確認しましょう。</p>
      </div>

      <section class="learning-card learning-typhoon-basic-card">
        <h3>台風とは</h3>
        <p>北西太平洋または南シナ海にある熱帯低気圧のうち、最大風速（10分間平均）がおよそ17m/s以上のものです。雨は中心付近だけで強くなるとは限らず、台風から離れた場所でも大雨になることがあります。</p>
        <div class="learning-typhoon-fact-grid">
          <article><strong>強風域</strong><span>平均風速15m/s以上の風が吹く、または吹く可能性がある範囲</span></article>
          <article><strong>暴風域</strong><span>平均風速25m/s以上の風が吹く、または吹く可能性がある範囲</span></article>
        </div>
      </section>

      <section class="learning-card learning-typhoon-route-card">
        <h3>予想進路図を読み解く</h3>
        <div class="learning-typhoon-route-diagram" role="img" aria-label="予報円、強風域、暴風域、暴風警戒域を示す台風進路図の模式図">
          <svg viewBox="0 0 600 410" aria-hidden="true">
            <g transform="translate(50 16) scale(1.12)">
              <path class="typhoon-warning-envelope" d="M108.42 256.12 L159.81 183.61 A37 37 0 0 1 160.97 182.06 L224.56 101.61 A49 49 0 0 1 227.90 97.81 L302.31 21.43 A61 61 0 1 1 379.14 115.21 L289.62 173.14 A49 49 0 0 0 293.39 170.44 L212.94 234.03 A37 37 0 0 1 212.80 234.14 L142.79 288.90" />
              <path class="typhoon-past-route" d="M-80 350 C-18 340 61 306 128 270" />
              <path class="typhoon-forecast-guide" d="M128 270 L163.68 192.83 M128 270 L203.40 230.72" />
              <path class="typhoon-forecast-circle-links" d="M167.25 187.02 L230.84 106.58 M207.98 227.75 L288.42 164.16 M233.63 103.39 L308.04 27.02 M285.27 166.42 L374.79 108.50" />
              <path class="typhoon-forecast-route" d="M128 270 L190 205 L263 132 L346 64" />
              <circle class="typhoon-strong-wind-area" cx="128" cy="270" r="66" />
              <circle class="typhoon-storm-area" cx="128" cy="270" r="24" />
              <circle class="typhoon-forecast-circle" cx="190" cy="205" r="29" />
              <circle class="typhoon-forecast-circle" cx="263" cy="132" r="41" />
              <circle class="typhoon-forecast-circle" cx="346" cy="64" r="53" />
              <circle class="typhoon-forecast-center" cx="190" cy="205" r="3.5" />
              <circle class="typhoon-forecast-center" cx="263" cy="132" r="3.5" />
              <circle class="typhoon-forecast-center" cx="346" cy="64" r="3.5" />
              <path class="typhoon-current-mark" d="M119 261l18 18m0-18-18 18" />
            </g>
          </svg>
        </div>
        <div class="learning-typhoon-symbol-list">
          <article><span class="is-current">×</span><div><strong>現在の中心位置</strong><p>実況の台風中心。青い実線はこれまでの経路です。</p></div></article>
          <article><span class="is-strong-wind"></span><div><strong>黄色の実線：強風域</strong><p>平均風速15m/s以上の強風が吹く可能性がある範囲です。</p></div></article>
          <article><span class="is-storm"></span><div><strong>赤色の太実線：暴風域</strong><p>平均風速25m/s以上の暴風が吹く可能性がある範囲です。</p></div></article>
          <article><span class="is-warning-area"></span><div><strong>赤色の実線：暴風警戒域</strong><p>台風中心が予報円内を進んだ場合に、暴風域へ入るおそれがある範囲全体です。</p></div></article>
          <article><span class="is-forecast"></span><div><strong><span class="typhoon-forecast-label-dark">白い破線：予報円</span><span class="typhoon-forecast-label-light">黒い破線：予報円</span></strong><p>予報時刻に台風の中心が入る確率が70％の範囲。円の大きさは台風の大きさではなく、進路予報の不確実性です。</p></div></article>
          <article><span class="is-center-line"></span><div><strong>予報円の中心を結ぶ線</strong><p>代表的な進路ですが、台風が必ず線上を進むわけではありません。</p></div></article>
        </div>
      </section>

      <section class="learning-card learning-typhoon-scale-card">
        <h3>「大きさ」と「強さ」は別の指標</h3>
        <p>大きさは強風域の半径、強さは最大風速で決まります。中心気圧だけで強さの階級は決まりません。</p>
        <div class="learning-typhoon-scale-grid">
          <div>
            <h4>強さ（最大風速）</h4>
            <table><tbody>
              <tr><th>表現なし</th><td>17m/s以上～33m/s未満</td></tr>
              <tr><th>強い</th><td>33m/s以上～44m/s未満</td></tr>
              <tr><th>非常に強い</th><td>44m/s以上～54m/s未満</td></tr>
              <tr><th>猛烈な</th><td>54m/s以上</td></tr>
            </tbody></table>
          </div>
          <div>
            <h4>大きさ（強風域の半径）</h4>
            <table><tbody>
              <tr><th>表現なし</th><td>500km未満</td></tr>
              <tr><th>大型</th><td>500km以上～800km未満</td></tr>
              <tr><th>超大型</th><td>800km以上</td></tr>
            </tbody></table>
          </div>
        </div>
      </section>

      <section class="learning-card learning-typhoon-action-card">
        <h3>接近前に確認すること</h3>
        <div class="learning-typhoon-action-list">
          <article><span>1</span><div><strong>数日前</strong><p>予報円と暴風警戒域、ハザードマップ、避難先を確認。屋外の飛びやすい物を片付ける。</p></div></article>
          <article><span>2</span><div><strong>警報級の可能性が高まったら</strong><p>大雨・暴風・高潮・波浪の情報、交通機関、自治体の避難情報を確認。充電や備蓄を済ませる。</p></div></article>
          <article><span>3</span><div><strong>風雨が強まる前</strong><p>危険な場所にいる場合は明るいうちに移動。暴風中の屋外移動や海・川・用水路の確認はしない。</p></div></article>
        </div>
        <p class="learning-safety-note">台風が温帯低気圧や熱帯低気圧に変わっても、強風や大雨が続くことがあります。名称が変わっただけで安全になったとは限りません。</p>
        <a href="https://www.jma.go.jp/jma/kishou/know/typhoon/1-1.html" target="_blank" rel="noopener noreferrer">気象庁「台風とは」</a>
        <a href="https://www.jma.go.jp/jma/kishou/know/typhoon/1-3.html" target="_blank" rel="noopener noreferrer">気象庁「台風の大きさと強さ」</a>
        <a href="https://www.jma.go.jp/jma/kishou/know/typhoon/7-1.html" target="_blank" rel="noopener noreferrer">気象庁「台風情報の種類と表現方法」</a>
      </section>
    `;
    content.append(typhoonSection);
    setupLearningCategoryTabs(content);
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
    updateHistoryStatisticsLoadButtonState();
  };

  const resetInfoTabState = () => {
    document.body.classList.remove("tool-source-search-mode", "tool-station-search-mode", "tool-weather-quiz-mode");
    selectedStationInfoRegion = "";
    stationInfoAffiliationFilter = "";
    els.infoFullPanel?.querySelectorAll("#station-info-filter, #station-info-region, #station-info-affiliation").forEach((control) => {
      control.value = "";
    });
  };

  const resetCommunityPostScrollPosition = () => {
    const ui = communityPostOverlayElements;
    ui?.overlay?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    ui?.overlay?.querySelector(".community-post-sheet")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    ui?.form?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  };

  const resetSimulationMenuState = () => {
    resetSimulationLayersToDefaults();
    activateSettingsTab("primary");
    setSetupMenuOpen(false);
    setSheetState(els.setupPanel, "collapsed");
    els.setupPanel?.classList.remove("is-dragging");
    els.setupPanel?.style.removeProperty("--sheet-drag-height");
    els.setupPanel?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    els.setupPanel?.querySelector(".sim-panel-scroll")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  };

  const resetBottomTabScrollPosition = (tabId) => {
    const selectorsByTab = {
      "earthquake-tab": [
        "#setup-panel",
        "#setup-panel .sim-panel-scroll",
        "#simulation-panel",
        "#simulation-panel .sim-panel-scroll",
      ],
      "bottom-history-tab": [
        "#history-full-panel",
        "#history-full-panel .history-stats-list",
        ".community-post-overlay",
        ".community-post-sheet",
        ".community-post-form",
        ".community-post-detail-overlay",
        ".community-post-detail-sheet",
        ".community-post-detail-body",
      ],
      "bottom-info-tab": [
        "#info-full-panel",
        "#info-full-panel .tool-home-page",
        "#info-full-panel .tool-station-page",
        "#info-full-panel .tool-weather-quiz-page",
        "#info-full-panel .weather-quiz-content",
        "#info-full-panel .station-info-list",
        "#history-full-panel",
        "#history-full-panel .history-stats-list",
      ],
      "bottom-learning-tab": [
        "#learning-full-panel",
        "#learning-full-panel .learning-content",
      ],
      "bottom-settings-tab": [
        "#settings-menu-sheet",
        "#settings-menu-sheet .settings-menu-list",
        "#settings-menu-sheet .settings-inline-panel",
        "#settings-menu-sheet .source-info-overlay-content",
        "#settings-menu-sheet .settings-privacy-content",
        "#settings-menu-sheet .settings-feedback-form",
        "#settings-menu-sheet .push-confirm-panel",
        "#settings-menu-sheet .push-history-list",
        "#settings-menu-sheet .settings-admin-embedded",
        "#settings-menu-sheet .settings-appearance-content",
        "#community-account-screen",
      ],
    };
    const selectors = selectorsByTab[tabId] || [];
    if (!selectors.length) {
      return;
    }
    document.querySelectorAll(selectors.join(",")).forEach((element) => {
      element.scrollTop = 0;
      element.scrollLeft = 0;
      element.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    });
  };

  const setActiveBottomTab = (selector) => {
    const previousTabId = document.body.dataset.activeBottomTab || "";
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    const activeTab = document.querySelector(selector);
    activeTab?.classList.add("active");
    document.body.dataset.activeBottomTab = activeTab?.id || "";
    if (previousTabId && previousTabId !== activeTab?.id) {
      resetBottomTabScrollPosition(previousTabId);
      if (previousTabId === "bottom-history-tab") {
        closeCommunityPostOverlay();
        resetCommunityPostScrollPosition();
      }
      if (
        previousTabId === "earthquake-tab"
        && (
          state.simulationRunning
          || state.simulationCompleted
          || document.body.classList.contains("simulation-session-active")
          || document.body.classList.contains("simulation-session-complete")
        )
      ) {
        stopSimulation();
      }
      if (previousTabId === "earthquake-tab") {
        resetSimulationMenuState();
      }
      if (activeTab?.id === "bottom-history-tab") {
        resetCommunityPostScrollPosition();
      }
      resetBottomTabScrollPosition(activeTab?.id);
      requestAnimationFrame(() => resetBottomTabScrollPosition(activeTab?.id));
    }
    if (
      previousTabId !== "earthquake-tab"
      && previousTabId
      && previousTabId !== activeTab?.id
      && state.simulationRunning
    ) {
      stopSimulation();
    }
    if (activeTab?.id !== "bottom-history-tab") {
      resetHistoryTabState();
      setCommunityMapModeActive(false);
      closeCommunityAccountRequiredPanel();
    }
    if (activeTab?.id !== "bottom-info-tab") {
      resetInfoTabState();
    }
    updateSimulationFaultSource();
  };

  document.body.dataset.activeBottomTab = document.querySelector(".tab.active")?.id || "earthquake-tab";

  const setFaultSimulationMenuActive = (active) => {
    const enabled = Boolean(active);
    const setupPanel = els.setupPanel;
    const simulationTab = document.querySelector("#earthquake-tab");
    const simulationTabLabel = simulationTab?.querySelector("span:last-child");
    const setupTitle = setupPanel?.querySelector(".setup-panel-title h2");
    const faultMenu = setupPanel?.querySelector("#fault-simulation-menu");

    document.body.classList.toggle("fault-simulation-mode", enabled);
    state.sourceModel = enabled ? "fault" : "point";
    setupPanel?.classList.toggle("fault-simulation-mode", enabled);
    faultMenu?.classList.toggle("hidden", !enabled);
    simulationTab?.setAttribute(
      "aria-label",
      enabled ? "断層シミュレーション。長押しで通常モード" : "シミュレーション。長押しで断層モード",
    );
    simulationTab?.setAttribute("aria-pressed", enabled ? "true" : "false");
    simulationTabLabel?.replaceChildren(enabled ? "断層" : "シミュレーション");
    setupTitle?.replaceChildren(enabled ? "断層設定" : "震源設定");
    if (enabled) {
      state.selectedPresetId = "";
    }
    invalidateIntensityEstimateCache();
    updateSimulationFaultSource();
    void updateEpicenter({ skipIntensityUpdate: false, resolveLocation: !enabled });

    if (enabled) {
      closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
      document.querySelector("#fault-model-type")?.dispatchEvent(new Event("change"));
      const startHost = setupPanel?.querySelector(".simulation-start-sheet-host");
      if (startHost && faultMenu) {
        faultMenu.append(startHost);
      }
    } else {
      ensureSimulationStartInsideSheet();
    }
    activateSettingsTab("primary");
    setSetupMenuOpen(true);
    setSheetState(setupPanel, "open");
    setupPanel?.querySelector(".sim-panel-scroll")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    updateSimulationAvailability();

    const existingNotice = document.querySelector(".fault-mode-switch-notice");
    existingNotice?.remove();
    const notice = document.createElement("div");
    notice.className = "fault-mode-switch-notice";
    notice.setAttribute("role", "status");
    notice.textContent = enabled
      ? "断層メニューに切り替わりました"
      : "シミュレーションメニューに切り替わりました";
    document.body.append(notice);
    requestAnimationFrame(() => notice.classList.add("is-visible"));
    window.setTimeout(() => {
      notice.classList.remove("is-visible");
      window.setTimeout(() => notice.remove(), 220);
    }, 1200);
  };

  const simulationTab = document.querySelector("#earthquake-tab");
  let simulationTabLongPressTimer = 0;
  let simulationTabLongPressPointer = null;
  let suppressSimulationTabClick = false;
  const cancelSimulationTabLongPress = () => {
    window.clearTimeout(simulationTabLongPressTimer);
    simulationTabLongPressTimer = 0;
    simulationTabLongPressPointer = null;
    simulationTab?.classList.remove("is-long-pressing");
  };
  simulationTab?.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || state.simulationRunning || state.simulationCompleted) {
      return;
    }
    cancelSimulationTabLongPress();
    suppressSimulationTabClick = false;
    simulationTabLongPressPointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    simulationTab.classList.add("is-long-pressing");
    simulationTabLongPressTimer = window.setTimeout(() => {
      simulationTabLongPressTimer = 0;
      suppressSimulationTabClick = true;
      simulationTab.classList.remove("is-long-pressing");
      setFaultSimulationMenuActive(!document.body.classList.contains("fault-simulation-mode"));
      navigator.vibrate?.(35);
    }, FAULT_MODE_LONG_PRESS_MS);
  });
  simulationTab?.addEventListener("pointermove", (event) => {
    if (!simulationTabLongPressPointer || event.pointerId !== simulationTabLongPressPointer.id) {
      return;
    }
    if (
      Math.hypot(
        event.clientX - simulationTabLongPressPointer.x,
        event.clientY - simulationTabLongPressPointer.y,
      ) > FAULT_MODE_LONG_PRESS_MOVE_TOLERANCE_PX
    ) {
      cancelSimulationTabLongPress();
    }
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    simulationTab?.addEventListener(eventName, cancelSimulationTabLongPress);
  });
  simulationTab?.addEventListener("contextmenu", (event) => {
    if (simulationTabLongPressTimer || suppressSimulationTabClick) {
      event.preventDefault();
    }
  });
  simulationTab?.addEventListener("click", (event) => {
    if (!suppressSimulationTabClick) {
      return;
    }
    suppressSimulationTabClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

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
    closeSettingsDetailPanel({ immediate: true });
    closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
    setSetupMenuOpen(false);
    ensureSettingsStatusCards();
    ensureSettingsAppearanceElements();
    els.settingsMenuSheet?.classList.remove("settings-detail-open");
    els.settingsMenuSheet?.classList.remove("community-account-screen-open");
    els.settingsMenuSheet?.querySelector("#community-account-screen")?.classList.add("hidden");
    els.settingsMenuSheet?.querySelectorAll(".settings-inline-panel").forEach((panel) => {
      panel.classList.add("hidden");
      panel.classList.remove("settings-detail-panel", "is-active", "is-leaving");
    });
    els.settingsMenuSheet?.classList.remove("hidden");
    updateSettingsScreenNotificationState();
    refreshSystemPermissionStates();
  };

  const closeSettingsMenuSheet = () => {
    closeSettingsDetailPanel({ immediate: true });
    closeCommunityAccountScreen();
    els.settingsMenuSheet?.classList.add("hidden");
    showMaintenanceBlockingScreen();
  };

  const closeFullPanels = () => {
    setHistoryMapModeActive(false);
    document.body.classList.remove("tool-source-search-mode", "tool-station-search-mode", "tool-weather-quiz-mode");
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
    els.learningFullPanel?.classList.add("hidden");
    showInfoToolHome();
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
    if (!els.settingsAcknowledgementsButton && els.settingsPrivacyButton) {
      els.settingsAcknowledgementsButton = document.createElement("button");
      els.settingsAcknowledgementsButton.className = "settings-menu-row";
      els.settingsAcknowledgementsButton.id = "settings-acknowledgements-button";
      els.settingsAcknowledgementsButton.type = "button";
      els.settingsAcknowledgementsButton.innerHTML = `<span>謝辞</span><span aria-hidden="true">›</span>`;
      els.settingsPrivacyButton.insertAdjacentElement("afterend", els.settingsAcknowledgementsButton);
    }
    if (!els.settingsAcknowledgementsPanel && els.settingsPrivacyPanel) {
      els.settingsAcknowledgementsPanel = document.createElement("section");
      els.settingsAcknowledgementsPanel.className = "settings-inline-panel hidden";
      els.settingsAcknowledgementsPanel.id = "settings-acknowledgements-panel";
      els.settingsAcknowledgementsPanel.setAttribute("aria-label", "謝辞");
      els.settingsPrivacyPanel.insertAdjacentElement("afterend", els.settingsAcknowledgementsPanel);
    }
    if (!els.settingsAdminButton && els.settingsFeedbackButton) {
      els.settingsAdminButton = document.createElement("button");
      els.settingsAdminButton.className = "settings-menu-row";
      els.settingsAdminButton.id = "settings-admin-button";
      els.settingsAdminButton.type = "button";
      els.settingsAdminButton.innerHTML = `<span>管理者メニュー</span><span aria-hidden="true">›</span>`;
      els.settingsFeedbackButton.insertAdjacentElement("afterend", els.settingsAdminButton);
    }
    if (!els.settingsAdminPanel && els.settingsFeedbackPanel) {
      els.settingsAdminPanel = document.createElement("section");
      els.settingsAdminPanel.className = "settings-inline-panel hidden";
      els.settingsAdminPanel.id = "settings-admin-panel";
      els.settingsAdminPanel.setAttribute("aria-label", "管理者メニュー");
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
      els.settingsAdminButton.firstElementChild.textContent = "管理者メニュー";
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
    if (els.settingsAcknowledgementsButton?.firstElementChild) {
      els.settingsAcknowledgementsButton.firstElementChild.textContent = "謝辞";
      els.settingsAcknowledgementsButton.lastElementChild.textContent = "›";
      els.settingsAcknowledgementsButton.setAttribute("aria-controls", "settings-acknowledgements-panel");
      els.settingsAcknowledgementsButton.setAttribute("aria-expanded", "false");
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
    const menuList = els.settingsMenuSheet?.querySelector(".settings-menu-list");
    [
      els.settingsFeedbackButton,
      els.settingsSourceButton,
      els.settingsPrivacyButton,
      els.settingsAcknowledgementsButton,
      els.settingsAdminButton,
    ].forEach((button) => button && menuList?.append(button));
  };

  const closeSettingsInlinePanels = (exceptPanel = null) => {
    [
      [els.settingsSourceButton, els.settingsSourcePanel],
      [els.settingsPrivacyButton, els.settingsPrivacyPanel],
      [els.settingsFeedbackButton, els.settingsFeedbackPanel],
      [els.settingsAcknowledgementsButton, els.settingsAcknowledgementsPanel],
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
    els.settingsPrivacyPanel.querySelector("[data-feedback-link]")?.addEventListener("click", (event) => {
      event.preventDefault();
      openSettingsDetailPanel(
        els.settingsFeedbackButton,
        els.settingsFeedbackPanel,
        ensureSettingsFeedbackPanel,
        "フィードバック",
      );
    });
    els.settingsPrivacyPanel.dataset.ready = "true";
  };

  const ensureSettingsFeedbackPanel = () => {
    if (!els.settingsFeedbackPanel || els.settingsFeedbackPanel.dataset.ready === "true") {
      return;
    }
    els.settingsFeedbackPanel.innerHTML = `
      <form class="settings-feedback-form">
        <label class="feedback-field" for="settings-feedback-message">
          <textarea id="settings-feedback-message" rows="8" maxlength="4000" aria-label="フィードバック内容"></textarea>
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

  const ensureSettingsAcknowledgementsPanel = () => {
    if (!els.settingsAcknowledgementsPanel || els.settingsAcknowledgementsPanel.dataset.ready === "true") {
      return;
    }
    els.settingsAcknowledgementsPanel.innerHTML = `
      <div class="source-info-overlay-content settings-acknowledgements-content">
        ${buildAcknowledgementsHtml()}
      </div>
    `;
    els.settingsAcknowledgementsPanel.dataset.ready = "true";
  };

  const ensureSettingsAdminPanel = () => {
    if (!els.settingsAdminPanel) {
      return;
    }
    if (els.settingsAdminPanel.dataset.ready === "true") {
      els.settingsAdminPanel.querySelector(".settings-admin-embedded")
        ?.dispatchEvent(new CustomEvent("admin-menu-reset"));
      return;
    }
    const adminPanel = createAdminModeOverlay();
    adminPanel.classList.remove("hidden");
    adminPanel.classList.add("settings-admin-embedded");
    adminPanel.querySelector(".source-info-close")?.remove();
    setupSettingsAdminMenu(adminPanel);
    els.settingsAdminPanel.replaceChildren(adminPanel);
    els.settingsAdminPanel.dataset.ready = "true";
    updateAdminModeControls(adminPanel);
  };

  const setupSettingsAdminMenu = (adminPanel) => {
    const dialog = adminPanel.querySelector(".admin-mode-dialog");
    const maintenanceActions = adminPanel.querySelector(".admin-mode-actions");
    const maintenanceStatus = adminPanel.querySelector(".admin-mode-status");
    const notificationPanel = adminPanel.querySelector(".admin-notification-panel");
    if (!dialog || !maintenanceActions || !notificationPanel) {
      return;
    }

    const menu = document.createElement("div");
    menu.className = "admin-section-menu settings-admin-menu-list";
    menu.innerHTML = `
      <section class="admin-overview" aria-labelledby="admin-overview-title">
        <header>
          <strong id="admin-overview-title">管理概要</strong>
          <button type="button" data-admin-overview-refresh>更新</button>
        </header>
        <div class="admin-overview-content" aria-live="polite">読み込み中...</div>
        <p class="admin-overview-status" role="status"></p>
      </section>
      <button class="settings-menu-row" type="button" data-admin-section="accounts"><span>アカウント情報</span><span aria-hidden="true">›</span></button>
      <button class="settings-menu-row" type="button" data-admin-section="notification"><span>通知</span><span aria-hidden="true">›</span></button>
      <button class="settings-menu-row" type="button" data-admin-section="maintenance"><span>メンテナンス</span><span aria-hidden="true">›</span></button>
    `;

    const formatAdminDateTime = (value) => {
      const timestamp = Date.parse(String(value || ""));
      if (!Number.isFinite(timestamp)) {
        return "-";
      }
      return new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(timestamp));
    };
    const getClientVersion = () => {
      try {
        const scriptUrl = document.querySelector('script[src*="app.js"]')?.src;
        return scriptUrl ? new URL(scriptUrl).searchParams.get("v") || "開発版" : "開発版";
      } catch {
        return "開発版";
      }
    };
    const renderAdminOverview = (overview) => {
      const content = menu.querySelector(".admin-overview-content");
      if (!content) {
        return;
      }
      const metrics = [
        ["アカウント", overview.accountCount],
        ["管理者", overview.adminCount],
        ["セッション", overview.sessionCount],
        ["投稿総数", overview.postCount],
        ["24時間の投稿", overview.post24hCount],
        ["7日間の投稿", overview.post7dCount],
        ["期限付き投稿", overview.expiringPostCount],
        ["通知履歴", overview.notificationCount],
      ];
      const maintenanceLabel = overview.maintenance ? "メンテナンス中" : "通常稼働";
      const workerLabel = overview.workerStatus === "ok" ? "正常" : "要確認";
      const databaseLabel = overview.databaseStatus === "ok" ? "正常" : "要確認";
      const mediaLabel = overview.mediaStorageStatus === "connected" ? "接続済み" : "未接続";
      content.innerHTML = `
        <div class="admin-overview-metrics">
          ${metrics.map(([label, value]) => `
            <article><span>${escapeHtml(label)}</span><strong>${Number(value || 0).toLocaleString("ja-JP")}</strong></article>
          `).join("")}
        </div>
        <dl class="admin-overview-system">
          <div><dt>運用状態</dt><dd data-state="${overview.maintenance ? "warning" : "ok"}">${maintenanceLabel}</dd></div>
          <div><dt>Worker API</dt><dd data-state="${overview.workerStatus === "ok" ? "ok" : "warning"}">${workerLabel}</dd></div>
          <div><dt>データベース</dt><dd data-state="${overview.databaseStatus === "ok" ? "ok" : "warning"}">${databaseLabel}</dd></div>
          <div><dt>メディア保存</dt><dd data-state="${overview.mediaStorageStatus === "connected" ? "ok" : "warning"}">${mediaLabel}</dd></div>
          <div><dt>アプリバージョン</dt><dd>${escapeHtml(getClientVersion())}</dd></div>
          <div><dt>最終デプロイ</dt><dd>${escapeHtml(formatAdminDateTime(document.lastModified))}</dd></div>
          <div><dt>最新通知</dt><dd>${escapeHtml(formatAdminDateTime(overview.latestNotificationAt))}</dd></div>
          <div><dt>サーバー時刻</dt><dd>${escapeHtml(formatAdminDateTime(overview.serverTime))}</dd></div>
        </dl>
        ${overview.maintenanceReason ? `<p class="admin-overview-maintenance-reason">${escapeHtml(overview.maintenanceReason)}</p>` : ""}
      `;
    };
    const refreshAdminOverview = async () => {
      const refreshButton = menu.querySelector("[data-admin-overview-refresh]");
      const status = menu.querySelector(".admin-overview-status");
      if (refreshButton) refreshButton.disabled = true;
      if (status) status.textContent = "";
      try {
        if (communityAccount?.localOnly) {
          renderAdminOverview({
            accountCount: 1,
            adminCount: 1,
            sessionCount: 1,
            workerStatus: "local",
            databaseStatus: "local",
            mediaStorageStatus: "unavailable",
            serverTime: new Date().toISOString(),
          });
          return;
        }
        const workerUrl = await getWorkerBaseUrl();
        const response = await fetch(`${workerUrl}/admin-overview`, {
          headers: { Authorization: `Bearer ${communityAccount?.token || ""}` },
          cache: "no-store",
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(body?.error || "管理概要を読み込めませんでした。");
        }
        renderAdminOverview(body.overview || {});
      } catch (error) {
        if (status) status.textContent = error?.message || "管理概要を読み込めませんでした。";
      } finally {
        if (refreshButton) refreshButton.disabled = false;
      }
    };
    menu.querySelector("[data-admin-overview-refresh]")?.addEventListener("click", refreshAdminOverview);

    const createPage = (id, title) => {
      const page = document.createElement("section");
      page.className = "admin-section-page hidden";
      page.dataset.adminSectionPage = id;
      page.innerHTML = `
        <header class="admin-section-head">
          <button class="admin-section-back" type="button" aria-label="管理者メニューへ戻る">‹</button>
          <h3>${escapeHtml(title)}</h3>
          <span aria-hidden="true"></span>
        </header>
        <div class="admin-section-body"></div>
      `;
      return page;
    };

    const notificationPage = createPage("notification", "通知");
    const maintenancePage = createPage("maintenance", "メンテナンス");
    notificationPage.querySelector(".admin-section-body")?.append(notificationPanel);
    const maintenanceReasonField = document.createElement("label");
    maintenanceReasonField.className = "admin-mode-field admin-maintenance-reason-field";
    maintenanceReasonField.innerHTML = `
      <span>メンテナンス理由</span>
      <textarea id="admin-maintenance-reason" rows="4" maxlength="500" placeholder="利用者に表示する理由を入力（任意）"></textarea>
    `;
    maintenancePage.querySelector(".admin-section-body")?.append(
      maintenanceReasonField,
      maintenanceActions,
      maintenanceStatus,
    );
    dialog.replaceChildren(menu, notificationPage, maintenancePage);

    const showMenu = () => {
      els.settingsAdminPanel?.classList.remove("admin-subpage-open");
      menu.classList.remove("hidden");
      adminPanel.querySelectorAll("[data-admin-section-page]").forEach((page) => page.classList.add("hidden"));
      adminPanel.scrollTop = 0;
      void refreshAdminOverview();
    };
    const showPage = (id) => {
      els.settingsAdminPanel?.classList.add("admin-subpage-open");
      menu.classList.add("hidden");
      adminPanel.querySelectorAll("[data-admin-section-page]").forEach((page) => {
        page.classList.toggle("hidden", page.dataset.adminSectionPage !== id);
      });
      adminPanel.scrollTop = 0;
    };

    menu.querySelector('[data-admin-section="accounts"]')?.addEventListener("click", () => {
      showMenu();
      els.settingsAdminPanel?.classList.add("admin-subpage-open");
      openCommunityAccountScreen("accounts");
    });
    menu.querySelector('[data-admin-section="notification"]')?.addEventListener("click", () => showPage("notification"));
    menu.querySelector('[data-admin-section="maintenance"]')?.addEventListener("click", () => showPage("maintenance"));
    adminPanel.querySelectorAll(".admin-section-back").forEach((button) => button.addEventListener("click", showMenu));
    adminPanel.addEventListener("admin-menu-reset", showMenu);
    showMenu();
  };

  ensureSettingsStatusCards();
  ensureSettingsAppearanceElements();
  ensureSettingsAppearancePanel();
  ensureSimulationStartInsideSheet();
  ensureSimulationRuntimeHud();
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
      els.settingsAcknowledgementsButton,
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
    panel.classList.add("settings-detail-panel", "is-active");
    panel.scrollTop = 0;
    panel.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    els.settingsMenuSheet?.querySelector(".settings-menu-list")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      panel.scrollTop = 0;
      panel.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
      panel.classList.add("is-active");
    });
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
  els.settingsPushStatus?.closest(".settings-notification-row")?.querySelector("span")?.replaceChildren("通知設定");
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
    els.settingsAdminButton.firstElementChild.textContent = "管理者メニュー";
  }

  const isWeatherQuizInProgress = () => Boolean(
    document.body.classList.contains("tool-weather-quiz-mode")
    && weatherQuizSession?.questions?.length
    && !weatherQuizSession.completed
  );
  const showWeatherQuizLeaveConfirm = (targetTab) => {
    const overlay = document.createElement("section");
    overlay.className = "weather-quiz-leave-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "weather-quiz-leave-title");
    overlay.innerHTML = `
      <div class="weather-quiz-leave-dialog">
        <h2 id="weather-quiz-leave-title">問題を終了しますか？</h2>
        <p>別のタブへ移動すると、現在の回答状況は破棄されます。本当に移動しますか？</p>
        <div class="weather-quiz-leave-actions">
          <button type="button" data-weather-quiz-leave-yes>はい</button>
          <button type="button" data-weather-quiz-leave-no>いいえ</button>
        </div>
      </div>
    `;
    const close = () => {
      overlay.remove();
      document.body.classList.remove("weather-quiz-leave-open");
      document.querySelector("#bottom-info-tab")?.focus?.({ preventScroll: true });
    };
    overlay.querySelector("[data-weather-quiz-leave-no]")?.addEventListener("click", close);
    overlay.querySelector("[data-weather-quiz-leave-yes]")?.addEventListener("click", () => {
      overlay.remove();
      document.body.classList.remove("weather-quiz-leave-open");
      weatherQuizSession = null;
      targetTab.click();
    });
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });
    overlay.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    });
    document.body.append(overlay);
    document.body.classList.add("weather-quiz-leave-open");
    overlay.querySelector("[data-weather-quiz-leave-no]")?.focus();
  };

  document.querySelector(".bottom-tabs")?.addEventListener("click", (event) => {
    const tab = event.target?.closest?.(".tab");
    if (!tab || tab.id === document.body.dataset.activeBottomTab || !isWeatherQuizInProgress()) {
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!document.querySelector(".weather-quiz-leave-overlay")) {
      showWeatherQuizLeaveConfirm(tab);
    }
  }, true);

  document.querySelector(".bottom-tabs")?.addEventListener("click", (event) => {
    const tab = event.target?.closest?.(".tab");
    if (
      !tab ||
      tab.id === "bottom-settings-tab" ||
      !document.body.classList.contains("maintenance-screen-blocking")
    ) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    closeSettingsMenuSheet();
    showMaintenanceBlockingScreen();
  }, true);

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!tab.dataset.panel) {
        return;
      }

      if (tab.id === "earthquake-tab") {
        closeMapLayerControlPanel();
      }

      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("panel-active"));

      const previousTabId = document.body.dataset.activeBottomTab || "";
      tab.classList.add("active");
      document.body.dataset.activeBottomTab = tab.id || "";
      if (previousTabId === "bottom-history-tab" && previousTabId !== tab.id) {
        closeCommunityPostOverlay();
        resetCommunityPostScrollPosition();
      }
      if (previousTabId === "earthquake-tab" && previousTabId !== tab.id) {
        if (
          state.simulationRunning
          || state.simulationCompleted
          || document.body.classList.contains("simulation-session-active")
          || document.body.classList.contains("simulation-session-complete")
        ) {
          stopSimulation();
        }
        resetSimulationMenuState();
      } else if (previousTabId && previousTabId !== tab.id && state.simulationRunning) {
        stopSimulation();
      }
      if (tab.id !== "bottom-history-tab") {
        resetHistoryTabState();
        setCommunityMapModeActive(false);
        closeCommunityAccountRequiredPanel();
      }
      if (tab.id !== "bottom-info-tab") {
        resetInfoTabState();
      }
      document.querySelector(`#${tab.dataset.panel}`).classList.add("panel-active");

      if (tab.dataset.panel === "earthquake-panel" && map) {
        closeEarthquakePresetPicker({ restoreTab: false, skipFocus: true });
        els.settingsMenuSheet?.classList.add("hidden");
        closeFullPanels();
        ensureSimulationStartInsideSheet();
        if (previousTabId && previousTabId !== tab.id) {
          resetSimulationMenuState();
        } else if (els.setupPanel?.classList.contains("setup-menu-open") && els.setupPanel?.dataset.sheetState === "open") {
          setSheetState(els.setupPanel, "collapsed");
        } else {
          activateSettingsTab("primary");
          setSetupMenuOpen(true);
          setSheetState(els.setupPanel, "open");
        }
        const shouldResetInitialView = previousTabId && previousTabId !== tab.id;
        requestAnimationFrame(() => {
          safelyResizeMap();
          if (shouldResetInitialView) {
            fitInitialMapBounds(getInitialJapanBounds());
          }
        });
      }
      updateSimulationFaultSource();
    });
  });

  document.querySelector("#bottom-history-tab")?.addEventListener("click", () => {
    setActiveBottomTab("#bottom-history-tab");
    activateEarthquakePanel();
    closeSettingsMenuSheet();
    closeFullPanels();
    if (!hasCommunityAccount()) {
      setCommunityMapModeActive(false);
      openCommunityAccountRequiredPanel();
      requestAnimationFrame(() => safelyResizeMap());
      return;
    }
    closeCommunityAccountRequiredPanel();
    setCommunityMapModeActive(true);
    requestAnimationFrame(() => safelyResizeMap());
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
    allowMaintenanceSettingsAccess();
    setActiveBottomTab("#bottom-settings-tab");
    activateEarthquakePanel();
    closeFullPanels();
    setHistoryMapModeActive(false);
    openSettingsMenuSheet();
    ensureCommunityAccountSettingsCard();
    refreshCommunityAccountStats();
  });

  const toggleSettingsStatusCard = (statusCard) => {
    if (!statusCard || activeSettingsDetailPanel) {
      return false;
    }
    if (statusCard.classList.contains("settings-location-card")) {
      if (els.currentLocationToggle) {
        els.currentLocationToggle.checked = !els.currentLocationToggle.checked;
        toggleCurrentLocationLink().finally(() => updateSettingsScreenNotificationState());
      }
      return true;
    }
    if (statusCard.contains(els.settingsPushStatus)) {
      const status = statusCard.querySelector(".settings-status-message");
      (state.pushSubscribed
        ? disablePushNotificationsFromOverlay(status)
        : enablePushNotificationsFromOverlay(status)
      ).finally(() => {
        updateSettingsScreenNotificationState();
        refreshSettingsPushPanelButton();
      });
      return true;
    }
    return false;
  };

  els.settingsMenuSheet?.addEventListener("click", (event) => {
    const statusPill = event.target?.closest?.("#settings-push-status, #settings-location-status");
    const statusCard = statusPill?.closest?.(".settings-status-card") ?? event.target?.closest?.(".settings-status-card");
    if (toggleSettingsStatusCard(statusCard)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const row = event.target?.closest?.(".settings-menu-row");
    if (activeSettingsDetailPanel && !els.settingsMenuSheet?.classList.contains("settings-detail-open")) {
      activeSettingsDetailPanel = null;
    }
    if (!row || activeSettingsDetailPanel) {
      return;
    }
    const detailMap = {
      "settings-source-button": [els.settingsSourceButton, els.settingsSourcePanel, ensureSettingsSourcePanel, "出典"],
      "settings-privacy-button": [els.settingsPrivacyButton, els.settingsPrivacyPanel, ensureSettingsPrivacyPanel, "プライバシーポリシー"],
      "settings-feedback-button": [els.settingsFeedbackButton, els.settingsFeedbackPanel, ensureSettingsFeedbackPanel, "フィードバック"],
      "settings-acknowledgements-button": [els.settingsAcknowledgementsButton, els.settingsAcknowledgementsPanel, ensureSettingsAcknowledgementsPanel, "謝辞"],
      "settings-admin-button": [els.settingsAdminButton, els.settingsAdminPanel, ensureSettingsAdminPanel, "管理者メニュー"],
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

  els.settingsMenuSheet?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    const statusPill = event.target?.closest?.("#settings-push-status, #settings-location-status");
    const statusCard = statusPill?.closest?.(".settings-status-card");
    if (toggleSettingsStatusCard(statusCard)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
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
  els.settingsAcknowledgementsButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsAcknowledgementsButton, els.settingsAcknowledgementsPanel, ensureSettingsAcknowledgementsPanel, "謝辞");
  });
  els.settingsAdminButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsAdminButton, els.settingsAdminPanel, ensureSettingsAdminPanel, "管理者メニュー");
  });
  els.settingsPushButton?.addEventListener("click", () => {
    openSettingsDetailPanel(els.settingsPushButton, els.settingsPushPanel, ensureSettingsPushPanel, "通知設定");
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
    option.textContent = `M${magnitude}`;
    option.selected = magnitude === selectedMagnitude;
    return option;
  });

  els.magnitude.replaceChildren(...magnitudeOptions);
}

function renderIntensityColorSchemeOptions() {
  if (!els.intensityColorScheme) {
    return;
  }

  const options = INTENSITY_COLOR_SCHEME_OPTIONS.map(([value, label]) => {
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
      row.addEventListener("pointerenter", () => prefetchEarthquakePresetDetail(preset.id), { once: true });
      row.addEventListener("focusin", () => prefetchEarthquakePresetDetail(preset.id), { once: true });
      row.addEventListener("pointerdown", () => prefetchEarthquakePresetDetail(preset.id), { once: true });
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
    : "過去の地震";
  const presetButtonLabel = document.createElement("span");
  presetButtonLabel.textContent = preset ? formatEarthquakePresetButtonLabel(preset) : "過去の地震";
  els.historicalEarthquakeButton.replaceChildren(presetButtonLabel);
  els.historicalEarthquakeButton.classList.toggle("has-preset", Boolean(preset));
  updateSubmarineObservationToggleAvailability();
}

function ensurePresetPickerCloseButton() {
  const overlay = els.presetPickerOverlay ?? document.querySelector("#preset-picker-overlay");
  if (!overlay) {
    return null;
  }
  let button = els.presetPickerClose ?? document.querySelector("#preset-picker-close");
  if (!button) {
    button = document.createElement("button");
    button.addEventListener("click", () => closeEarthquakePresetPicker());
  }
  button.id = "preset-picker-close";
  button.className = "preset-picker-close";
  button.type = "button";
  button.setAttribute("aria-label", "戻る");
  button.textContent = "‹";
  const dialog = overlay.querySelector(".preset-picker-dialog");
  if (dialog && button.parentElement !== dialog) {
    dialog.insertAdjacentElement("afterbegin", button);
  }
  els.presetPickerClose = button;
  return button;
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
  const closeButton = ensurePresetPickerCloseButton();
  const sortSelect = document.querySelector("#preset-sort-select");
  if (sortSelect) {
    sortSelect.value = `${state.presetSortKey}:${state.presetSortDirection}`;
  }
  renderEarthquakePresetPicker();
  els.presetPickerOverlay?.classList.remove("hidden");
  resetPresetPickerScroll();
  closeButton?.focus();
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
  updateHistoryStatisticsLoadButtonState();

  if (error) {
    els.historyStatsList.innerHTML = `
      <div class="history-stats-empty" role="status">
        <strong>過去の地震回数を読み込めませんでした</strong>
        <span>時間をおいてもう一度お試しください。</span>
      </div>
    `;
    return;
  }

  if (!selectedHistoryLocalAreaName) {
    els.historyStatsList.innerHTML = `
      <div class="history-stats-empty history-stats-empty-static" role="status">
        <strong>地域を選択してください</strong>
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
  els.historyStatsList
    .querySelectorAll(".history-stats-sheet-head, [data-history-clear-area], .history-epicenter-list, .history-epicenter-more")
    .forEach((element) => element.remove());
  els.historyStatsList.querySelectorAll(".history-stats-card-main span").forEach((element) => {
    element.replaceChildren("この区域を震源とする地震");
  });
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
  const wasActive = document.body.classList.contains("history-map-mode");
  document.body.classList.toggle("history-map-mode", Boolean(active));
  if (!map) {
    return;
  }
  applySimulationWhiteMapStyle(isResolvedAppearanceLight());
  if (active) {
    window.requestAnimationFrame(() => {
      applySimulationWhiteMapStyle(isResolvedAppearanceLight());
    });
  }
  map.setMaxZoom?.(active ? 7.2 : SIMULATION_MAP_MAX_ZOOM);

  if (active && !wasActive) {
    map.jumpTo({
      center: HISTORY_MAP_DEFAULT_CENTER,
      zoom: HISTORY_MAP_DEFAULT_ZOOM,
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    updateMapPanConstraints();
  }

  if (active && localAreaData?.features?.length) {
    setGeoJsonSourceData("jma-local-areas", buildHistoryLocalAreaMapData());
    if (epicenterAreaData?.features?.length && map.getSource("history-epicenter-areas")) {
      setGeoJsonSourceData("history-epicenter-areas", buildHistoryEpicenterAreaMapData());
    }
    updateLayerVisibility("history-local-area-fill", true);
    updateLayerVisibility("history-epicenter-area-fill", Boolean(epicenterAreaData?.features?.length));
    updateLayerVisibility("jma-intensity-fill", false);
    updateLayerVisibility("eew-warning-fill", false);
    updateLayerVisibility("jma-intensity-area-boundaries", false);
    updateLayerVisibility("jma-intensity-area-boundaries-light", false);
    updateLayerVisibility("jma-eew-warning-boundaries", false);
    updateHistoryMapIsolation();
    bindHistoryMapEvents();
    return;
  }

  updateLayerVisibility("history-local-area-fill", false);
  updateLayerVisibility("history-epicenter-area-fill", false);
  if (map.getSource("jma-intensity-areas") && localAreaData?.features?.length) {
    const elapsedSec = state.simulationRunning ? getSimulationStationElapsedSec() : Infinity;
    applyIntensityAreaFeatureStates(buildIntensityAreaData(localAreaData, elapsedSec));
  }
  updateDisplayMode();
}

function moveCommunityMapTo(center, immediate = false, zoom = COMMUNITY_MAP_DEFAULT_ZOOM) {
  if (!map || !Array.isArray(center) || center.length < 2) {
    return;
  }
  map[immediate ? "jumpTo" : "easeTo"]({
    center,
    zoom,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    ...(immediate ? {} : { duration: 550 }),
  });
}

function loadLastKnownCurrentLocation() {
  try {
    const saved = JSON.parse(localStorage.getItem(CURRENT_LOCATION_LAST_COORDS_KEY) || "null");
    const latitude = Number(saved?.latitude);
    const longitude = Number(saved?.longitude);
    return Number.isFinite(latitude) && Number.isFinite(longitude)
      ? { latitude, longitude }
      : null;
  } catch (error) {
    console.warn("Could not read the last known current location.", error);
    return null;
  }
}

function loadCommunityLocationMarkerVisible() {
  try {
    return localStorage.getItem(COMMUNITY_LOCATION_MARKER_VISIBLE_KEY) !== "false";
  } catch (error) {
    console.warn("Could not read the community location marker preference.", error);
    return true;
  }
}

function updateCommunityLocationMarkerControlState(control) {
  if (!control) {
    return;
  }
  control.classList.toggle("is-marker-hidden", !communityLocationMarkerVisible);
  control.setAttribute("aria-pressed", String(communityLocationMarkerVisible));
  const label = communityLocationMarkerVisible
    ? "現在地付近を表示（長押しで現在地マークを非表示）"
    : "現在地付近を表示（長押しで現在地マークを表示）";
  control.setAttribute("aria-label", label);
  control.title = label;
}

function toggleCommunityLocationMarkerVisibility(control) {
  communityLocationMarkerVisible = !communityLocationMarkerVisible;
  try {
    localStorage.setItem(
      COMMUNITY_LOCATION_MARKER_VISIBLE_KEY,
      String(communityLocationMarkerVisible),
    );
  } catch (error) {
    console.warn("Could not save the community location marker preference.", error);
  }
  updateCommunityLocationMarkerControlState(control);
  updateCurrentLocationMarker();
  setCommunityMapControlResult(
    control,
    "success",
    communityLocationMarkerVisible ? "現在地マークを表示しました" : "現在地マークを非表示にしました",
  );
}

function saveLastKnownCurrentLocation(location) {
  const latitude = Number(location?.latitude);
  const longitude = Number(location?.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return;
  }
  localStorage.setItem(CURRENT_LOCATION_LAST_COORDS_KEY, JSON.stringify({ latitude, longitude }));
}

async function centerCommunityMapOnDefaultLocation() {
  const requestId = ++communityMapCenterRequestId;
  const locationEnabled = localStorage.getItem(CURRENT_LOCATION_ENABLED_KEY) === "true";
  const knownLocation = state.currentLocationEnabled && state.currentLocation
    ? state.currentLocation
    : locationEnabled
      ? loadLastKnownCurrentLocation()
      : null;

  if (knownLocation) {
    moveCommunityMapTo([knownLocation.longitude, knownLocation.latitude], true);
  } else if (!locationEnabled) {
    moveCommunityMapTo(COMMUNITY_MAP_FALLBACK_CENTER, false, COMMUNITY_MAP_FALLBACK_ZOOM);
  }

  if (!locationEnabled || (state.currentLocationEnabled && state.currentLocation)) {
    return;
  }
  if (!navigator.geolocation || !navigator.permissions?.query) {
    if (!knownLocation) {
      moveCommunityMapTo(COMMUNITY_MAP_FALLBACK_CENTER, false, COMMUNITY_MAP_FALLBACK_ZOOM);
    }
    return;
  }

  try {
    const permission = await navigator.permissions.query({ name: "geolocation" });
    if (permission.state !== "granted" || requestId !== communityMapCenterRequestId) {
      if (!knownLocation && requestId === communityMapCenterRequestId) {
        moveCommunityMapTo(COMMUNITY_MAP_FALLBACK_CENTER, false, COMMUNITY_MAP_FALLBACK_ZOOM);
      }
      return;
    }
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 60000,
      });
    });
    const latitude = Number(position.coords?.latitude);
    const longitude = Number(position.coords?.longitude);
    if (
      requestId === communityMapCenterRequestId
      && document.body.classList.contains("community-map-mode")
      && Number.isFinite(latitude)
      && Number.isFinite(longitude)
    ) {
      saveLastKnownCurrentLocation({ latitude, longitude });
      moveCommunityMapTo([longitude, latitude]);
    }
  } catch (error) {
    console.warn("Community map could not use the current location.", error);
    if (!knownLocation && requestId === communityMapCenterRequestId) {
      moveCommunityMapTo(COMMUNITY_MAP_FALLBACK_CENTER, false, COMMUNITY_MAP_FALLBACK_ZOOM);
    }
  }
}

async function centerCommunityMapOnRequestedCurrentLocation(control) {
  if (!navigator.geolocation) {
    setCommunityMapControlResult(control, "error", "現在地を取得できませんでした");
    return;
  }

  const requestId = ++communityMapCenterRequestId;
  setCommunityMapControlBusy(control, true);
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      });
    });
    const latitude = Number(position.coords?.latitude);
    const longitude = Number(position.coords?.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error("Invalid current location");
    }
    if (requestId !== communityMapCenterRequestId || !document.body.classList.contains("community-map-mode")) {
      return;
    }
    syncCurrentLocationSettingFromCoordinates(latitude, longitude);
    moveCommunityMapTo([longitude, latitude], false, COMMUNITY_MAP_CURRENT_LOCATION_ZOOM);
    setCommunityMapControlResult(control, "success", "現在地付近へ移動しました");
  } catch (error) {
    console.warn("Community map current-location request failed", error);
    setCommunityMapControlResult(control, "error", "現在地を取得できませんでした");
  } finally {
    setCommunityMapControlBusy(control, false);
  }
}

async function syncCurrentLocationSettingFromCoordinates(latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !els.currentLocationToggle) {
    return;
  }

  const requestId = ++currentLocationRequestId;
  els.currentLocationToggle.checked = true;
  localStorage.setItem(CURRENT_LOCATION_ENABLED_KEY, "true");
  state.currentLocationEnabled = true;
  state.currentLocation = {
    latitude: Number(latitude.toFixed(5)),
    longitude: Number(longitude.toFixed(5)),
  };
  state.currentLocationName = "位置情報を取得中...";
  state.currentLocationStatus = "loading";
  saveLastKnownCurrentLocation(state.currentLocation);
  updateSettingsScreenNotificationState();
  updateCurrentLocationMarker();
  updateCurrentLocationForecast(getSimulationStationElapsedSec());

  const resolvedLocationName = await resolveMunicipalityNameAt(
    state.currentLocation.longitude,
    state.currentLocation.latitude,
  );
  if (requestId !== currentLocationRequestId || !els.currentLocationToggle.checked) {
    return;
  }
  state.currentLocationName = resolvedLocationName;
  state.currentLocationStatus = "ready";
  updateCurrentLocationMarker();
  updateCurrentLocationForecast(getSimulationStationElapsedSec());
  updateSettingsScreenNotificationState();
}

function setCommunityMapModeActive(active) {
  const wasActive = document.body.classList.contains("community-map-mode");
  document.body.classList.toggle("community-map-mode", Boolean(active));
  if (!map) {
    return;
  }
  const hiddenLayers = [
    "surrounding-land-fill",
    "surrounding-land-gap-fill",
    "japan-land-fill",
    "japan-land-gap-fill",
    "jma-intensity-fill",
    "history-local-area-fill",
    "history-epicenter-area-fill",
    "eew-warning-fill",
    "jma-local-area-boundaries",
    "jma-intensity-area-boundaries",
    "jma-intensity-area-boundaries-light",
    "jma-eew-warning-boundaries",
    "submarine-observation-fill",
    "shindo-station-points",
    "plate-boundaries",
    "active-fault-lines",
    "p-wave-fill",
    "p-wave-line",
    "s-wave-fill",
    "s-wave-line",
  ];
  if (active) {
    ensureCommunityMapLayer();
    setCommunityMapStyle(isResolvedAppearanceLight() ? "light" : "dark", { persist: false });
    void refreshSystemPermissionStates();
  }
  updateCommunityMapStyleLayers(Boolean(active));
  map.setMaxZoom?.(
    active ? 18 : document.body.classList.contains("history-map-mode") ? 7.2 : SIMULATION_MAP_MAX_ZOOM,
  );
  if (active) {
    hiddenLayers.forEach((layerId) => updateLayerVisibility(layerId, false));
    if (!wasActive) {
      centerCommunityMapOnDefaultLocation();
    }
    if (!communityPostMarkerLayoutBound) {
      map.on("zoomend", () => {
        if (document.body.classList.contains("community-map-mode")) {
          renderCommunityPostMarkers();
        }
      });
      communityPostMarkerLayoutBound = true;
    }
    ensureCommunityPostUi();
    loadCommunityPosts().catch((error) => console.warn("community posts load failed", error));
    renderCommunityPostMarkers();
    updateCurrentLocationMarker();
    closeInactiveStationPopups();
    scheduleStationCanvasRender({ force: true });
    return;
  }
  communityMapCenterRequestId += 1;
  document.body.classList.remove("community-pick-mode");
  closeCommunityPostOverlay();
  closeCommunityPostDetail();
  renderCommunityPostMarkers();
  restoreSimulationMapLayersAfterCommunityMode();
  updateDisplayMode();
  updateCurrentLocationMarker();
}

function restoreSimulationMapLayersAfterCommunityMode() {
  [
    "surrounding-land-fill",
    "surrounding-land-gap-fill",
    "japan-land-fill",
    "japan-land-gap-fill",
    "jma-local-area-boundaries",
    "jma-intensity-area-boundaries",
    "jma-intensity-area-boundaries-light",
    "jma-eew-warning-boundaries",
  ].forEach((layerId) => updateLayerVisibility(layerId, true));
  updateLayerVisibility("community-light-map", false);
  updateLayerVisibility("community-dark-map", false);
  applySimulationWhiteMapStyle(isResolvedAppearanceLight());
}

function ensureCommunityMapLayer() {
  if (!map) {
    return;
  }
  if (!map.getSource("community-light-map")) {
    map.addSource("community-light-map", {
      type: "raster",
      tiles: COMMUNITY_MAP_LIGHT_TILE_URLS,
      tileSize: 256,
      minzoom: 0,
      maxzoom: 19,
      attribution: COMMUNITY_MAP_ATTRIBUTION,
    });
  }
  if (!map.getSource("community-dark-map")) {
    map.addSource("community-dark-map", {
      type: "raster",
      tiles: COMMUNITY_MAP_DARK_TILE_URLS,
      tileSize: 256,
      minzoom: 0,
      maxzoom: 19,
      attribution: COMMUNITY_MAP_ATTRIBUTION,
    });
  }
  const beforeId = map.getLayer("plate-boundaries") ? "plate-boundaries" : undefined;
  if (!map.getLayer("community-light-map")) {
    map.addLayer({
      id: "community-light-map",
      type: "raster",
      source: "community-light-map",
      paint: {
        "raster-opacity": 1,
        "raster-contrast": 0.12,
        "raster-fade-duration": 0,
      },
    }, beforeId);
  }
  if (!map.getLayer("community-dark-map")) {
    map.addLayer({
      id: "community-dark-map",
      type: "raster",
      source: "community-dark-map",
      paint: {
        "raster-opacity": 1,
        "raster-contrast": 0,
        "raster-fade-duration": 0,
      },
    }, beforeId);
  }
  updateCommunityMapStyleLayers(document.body.classList.contains("community-map-mode"));
}

function loadCommunityMapStylePreference() {
  try {
    return localStorage.getItem(COMMUNITY_MAP_STYLE_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function setCommunityMapStyle(style, { persist = true } = {}) {
  communityMapStyle = style === "dark" ? "dark" : "light";
  document.body.dataset.communityMapStyle = communityMapStyle;
  if (persist) {
    try {
      localStorage.setItem(COMMUNITY_MAP_STYLE_STORAGE_KEY, communityMapStyle);
    } catch {
      // 保存できない環境でも、その場での切り替えは維持します。
    }
  }
  updateCommunityMapStyleLayers(document.body.classList.contains("community-map-mode"));
  updateCommunityMapStyleButtons();
}

function updateCommunityMapStyleLayers(active = true) {
  if (!map) {
    return;
  }
  updateLayerVisibility("community-light-map", Boolean(active && communityMapStyle === "light"));
  updateLayerVisibility("community-dark-map", Boolean(active && communityMapStyle === "dark"));
}

function updateCommunityMapStyleButtons() {
  document.querySelectorAll("[data-community-map-style]").forEach((button) => {
    const selected = button.dataset.communityMapStyle === communityMapStyle;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
}

function updateHistoryMapIsolation() {
  [
    "shindo-station-points",
    "submarine-observation-fill",
    "eew-warning-fill",
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
    if (
      document.body.dataset.activeBottomTab !== "bottom-history-tab"
      && !document.body.classList.contains("tool-source-search-mode")
    ) {
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
    updateHistoryStatisticsLoadButtonState();
    renderPastEarthquakeStatsPanel();
  });
  map.on("click", "history-epicenter-area-fill", (event) => {
    if (
      document.body.dataset.activeBottomTab !== "bottom-history-tab"
      && !document.body.classList.contains("tool-source-search-mode")
    ) {
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
    updateHistoryStatisticsLoadButtonState();
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

async function ensureEarthquakePresetDetail(presetId, options = {}) {
  const cached = earthquakePresetDetailCache.get(presetId);
  if (cached?.observedStations) {
    return cached;
  }

  const existingPreset = EARTHQUAKE_PRESETS.find((preset) => preset.id === presetId);
  if (existingPreset?.observedStations) {
    earthquakePresetDetailCache.set(presetId, existingPreset);
    return existingPreset;
  }

  if (earthquakePresetDetailPromiseCache.has(presetId)) {
    return earthquakePresetDetailPromiseCache.get(presetId);
  }

  const showLoading = options.showLoading !== false;
  if (showLoading) {
    presetDetailLoadingId = presetId;
    updateSimulationAvailability();
  }
  const detailPromise = (async () => {
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
  })();
  earthquakePresetDetailPromiseCache.set(presetId, detailPromise);
  try {
    return await detailPromise;
  } finally {
    earthquakePresetDetailPromiseCache.delete(presetId);
    if (showLoading && presetDetailLoadingId === presetId) {
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

  const requestUrl = `${workerUrl}/earthquake-presets/${encodeURIComponent(presetId)}`;
  const cache = "caches" in window
    ? await window.caches.open(EARTHQUAKE_PRESET_CACHE_NAME).catch(() => null)
    : null;
  const cachedResponse = cache ? await cache.match(requestUrl).catch(() => null) : null;
  if (cachedResponse?.ok) {
    const cachedData = await cachedResponse.json();
    return cachedData.preset || null;
  }

  const response = await fetch(requestUrl, { cache: "default" });
  if (!response.ok) {
    throw new Error(`Failed to load earthquake preset detail from D1: ${response.status}`);
  }

  if (cache) {
    await cache.put(requestUrl, response.clone()).catch(() => {});
  }
  const data = await response.json();
  return data.preset || null;
}

function prefetchEarthquakePresetDetail(presetId) {
  if (!presetId || earthquakePresetDetailCache.has(presetId)) {
    return;
  }
  ensureEarthquakePresetDetail(presetId, { showLoading: false })
    .then((preset) => schedulePresetObservationIndex(preset))
    .catch((error) => console.warn("Earthquake preset prefetch failed", error));
}

function bindSimulationControls() {
  els.settingsMenuButton?.addEventListener("click", () => toggleSetupMenu());

  const faultModelSelect = document.querySelector("#fault-model-type");
  const faultModelProfile = document.querySelector("#fault-model-profile");
  const faultMagnitudeInput = document.querySelector("#fault-magnitude-input");
  const faultDepthInput = document.querySelector("#fault-depth-input");
  const faultRuptureSpeedInput = document.querySelector("#fault-rupture-speed");
  const faultLengthInput = document.querySelector("#fault-length-input");
  const faultWidthInput = document.querySelector("#fault-width-input");
  const faultStrikeInput = document.querySelector("#fault-strike-input");
  const faultDipInput = document.querySelector("#fault-dip-input");
  const faultEpicenterEditButton = document.querySelector("#fault-epicenter-edit-button");
  const faultNankaiCasePicker = document.querySelector("#fault-nankai-case-picker");
  const faultNankaiCaseSelect = document.querySelector("#fault-nankai-case");
  const activeFaultPicker = document.querySelector("#active-fault-picker");
  const activeFaultSearch = document.querySelector("#active-fault-search");
  const activeFaultSelect = document.querySelector("#active-fault-select");
  const activeFaultPickerStatus = document.querySelector("#active-fault-picker-status");
  if (faultMagnitudeInput) {
    const selectedMagnitude = state.magnitude.toFixed(1);
    const options = Array.from({ length: 100 }, (_, index) => {
      const value = ((index + 1) / 10).toFixed(1);
      return new Option(`M${value}`, value, false, value === selectedMagnitude);
    });
    faultMagnitudeInput.replaceChildren(...options);
  }
  if (faultDepthInput) {
    const depths = [0, ...Array.from({ length: 691 }, (_, index) => index + 10)];
    const options = depths.map((depth) => new Option(
      depth === 0 ? "ごく浅い" : `${depth} km`,
      String(depth),
      false,
      depth === state.depthKm,
    ));
    faultDepthInput.replaceChildren(...options);
  }
  if (faultRuptureSpeedInput) {
    const selectedSpeed = Number(faultRuptureSpeedInput.value || 2.8).toFixed(1);
    const options = Array.from({ length: 36 }, (_, index) => {
      const value = (0.5 + index * 0.1).toFixed(1);
      return new Option(`${value} km/s`, value, false, value === selectedSpeed);
    });
    faultRuptureSpeedInput.replaceChildren(...options);
  }
  const populateIntegerUnitOptions = (select, minimum, maximum, unit, fallback) => {
    if (!select) {
      return;
    }
    const selectedValue = String(Number(select.value || fallback));
    const options = Array.from({ length: maximum - minimum + 1 }, (_, index) => {
      const value = String(minimum + index);
      const label = unit === "°" ? `${value}°` : `${value} ${unit}`;
      return new Option(label, value, false, value === selectedValue);
    });
    select.replaceChildren(...options);
  };
  populateIntegerUnitOptions(faultLengthInput, 1, 520, "km", 30);
  populateIntegerUnitOptions(faultWidthInput, 1, 200, "km", 15);
  populateIntegerUnitOptions(faultStrikeInput, 0, 359, "°", 0);
  populateIntegerUnitOptions(faultDipInput, 1, 90, "°", 45);
  const applyFaultSourceParameterInputs = () => {
    state.magnitude = parseClampedInput(faultMagnitudeInput?.value ?? "", state.magnitude, 0.1, 10);
    state.depthKm = parseClampedInput(faultDepthInput?.value ?? "", state.depthKm, 0, 700);
    if (faultMagnitudeInput) {
      faultMagnitudeInput.value = state.magnitude.toFixed(1);
    }
    if (faultDepthInput) {
      faultDepthInput.value = String(Number(state.depthKm.toFixed(1)));
    }
    invalidateIntensityEstimateCache();
    syncInputs();
    updateSimulationFaultSource();
    updateIntensityLayer();
  };
  const renderActiveFaultOptions = (filterText = "") => {
    if (!activeFaultSelect) {
      return;
    }
    const normalizedFilter = String(filterText).trim().toLocaleLowerCase("ja");
    const matches = activeFaultCatalog.filter((entry) => (
      !normalizedFilter
      || entry.name.toLocaleLowerCase("ja").includes(normalizedFilter)
      || entry.id.toLocaleLowerCase("ja").includes(normalizedFilter)
    ));
    const options = [new Option("活断層を選択してください", "")];
    matches.forEach((entry) => options.push(new Option(`${entry.name}（${entry.id}）`, entry.id)));
    activeFaultSelect.replaceChildren(...options);
    activeFaultSelect.disabled = false;
    if (matches.some((entry) => entry.id === state.activeFaultSegmentId)) {
      activeFaultSelect.value = state.activeFaultSegmentId;
    }
    if (activeFaultPickerStatus) {
      activeFaultPickerStatus.textContent = `${matches.length}件 / 全${activeFaultCatalog.length}件`;
    }
  };
  const applyActiveFaultSelection = async (segmentId) => {
    const requestId = ++activeFaultSelectionRequestId;
    const entry = activeFaultCatalog.find((candidate) => candidate.id === segmentId);
    state.activeFaultSegmentId = entry?.id || "";
    selectedActiveFaultPath = [];
    if (entry && !entry.features?.length && !entry.path?.length) {
      if (activeFaultPickerStatus) {
        activeFaultPickerStatus.textContent = `${entry.name}の断層座標を読み込んでいます...`;
      }
      updateSimulationAvailability();
      try {
        let detail = activeFaultDetailCache.get(entry.id);
        if (!detail) {
          detail = await fetchActiveFaultDetailFromWorker(entry.id);
          activeFaultDetailCache.set(entry.id, detail);
        }
        if (requestId !== activeFaultSelectionRequestId) {
          return;
        }
        entry.path = detail.path;
        entry.description ||= detail.description;
        entry.source ||= detail.source;
        entry.sourceUrl ||= detail.sourceUrl;
      } catch (error) {
        console.warn("Active fault detail unavailable from D1; using local fallback", error);
        const fallbackEntry = buildActiveFaultCatalog(await loadActiveFaultSegments())
          .find((candidate) => candidate.id === entry.id);
        if (requestId !== activeFaultSelectionRequestId) {
          return;
        }
        if (fallbackEntry) {
          entry.features = fallbackEntry.features;
          entry.description ||= fallbackEntry.description;
          entry.source ||= fallbackEntry.source;
          entry.sourceUrl ||= fallbackEntry.sourceUrl;
        }
      }
    }
    selectedActiveFaultPath = entry
      ? (entry.path?.length ? entry.path.map((point) => [...point]) : buildRepresentativeActiveFaultPath(entry))
      : [];
    if (!entry || selectedActiveFaultPath.length < 2) {
      faultModelProfile.innerHTML = `
        <strong>活断層を選択</strong>
        <p>産総研 活断層データベースの活動セグメントから、シミュレーションに使う断層を選択してください。</p>
      `;
      invalidateIntensityEstimateCache();
      updateSimulationFaultSource();
      updateSimulationAvailability();
      return;
    }

    if (activeFaultPickerStatus) {
      activeFaultPickerStatus.textContent = `${activeFaultCatalog.length}件の活断層から選択中`;
    }

    const centerPoint = selectedActiveFaultPath[Math.floor(selectedActiveFaultPath.length / 2)];
    state.longitude = centerPoint[0];
    state.latitude = centerPoint[1];
    state.epicenterName = `${entry.name}活動セグメント`;
    const description = entry.description
      .split(/\r?\n/)
      .map((line) => line.replace(/詳細はこちら。?/g, "").trim())
      .filter((line) => (
        line
        && !line.includes("産業技術総合研究所")
        && !line.includes("産総研 活断層データベース")
      ))
      .slice(0, 2)
      .join(" ");
    faultModelProfile.innerHTML = `
      <div class="fault-model-profile-head">
        <div><strong>${escapeHtml(entry.name)}</strong><span>活動セグメント ${escapeHtml(entry.id)}</span></div>
        <b>活断層</b>
      </div>
      <p>${escapeHtml(description || "活断層データベース収録の断層トレースを使用します。")}</p>
    `;
    invalidateIntensityEstimateCache();
    syncInputs();
    epicenterMarker?.setLngLat([state.longitude, state.latitude]);
    updateSimulationFaultSource();
    updateIntensityLayer();
    updateSimulationAvailability();
  };
  const ensureActiveFaultPickerData = async () => {
    if (activeFaultCatalog.length) {
      renderActiveFaultOptions(activeFaultSearch?.value || "");
      await applyActiveFaultSelection(state.activeFaultSegmentId);
      return;
    }
    if (activeFaultSelect) {
      activeFaultSelect.disabled = true;
      activeFaultSelect.replaceChildren(new Option("データを読み込み中...", ""));
    }
    if (activeFaultPickerStatus) {
      activeFaultPickerStatus.textContent = "活断層データを読み込んでいます...";
    }
    try {
      try {
        activeFaultCatalog = await fetchActiveFaultCatalogFromWorker();
      } catch (error) {
        console.warn("Active fault catalog unavailable from D1; using local fallback", error);
        activeFaultCatalog = buildActiveFaultCatalog(await loadActiveFaultSegments());
      }
      renderActiveFaultOptions(activeFaultSearch?.value || "");
      await applyActiveFaultSelection(state.activeFaultSegmentId);
    } catch (error) {
      console.warn("Active fault catalog unavailable", error);
      if (activeFaultSelect) {
        activeFaultSelect.disabled = true;
        activeFaultSelect.replaceChildren(new Option("読み込みに失敗しました", ""));
      }
      if (activeFaultPickerStatus) {
        activeFaultPickerStatus.textContent = "活断層データを読み込めませんでした。";
      }
    }
  };
  const syncFaultModelPreset = () => {
    const faultMenu = document.querySelector("#fault-simulation-menu");
    state.faultModelId = faultModelSelect?.value || "rectangle";
    if (faultNankaiCaseSelect) {
      state.faultNankaiCase = faultNankaiCaseSelect.value || "full";
    }
    const preset = getSelectedFaultModelPreset();
    faultNankaiCasePicker?.classList.toggle("hidden", state.faultModelId !== "nankai-trough");
    if (state.faultModelId !== "rectangle" && els.epicenterEditToggle?.checked) {
      els.epicenterEditToggle.checked = false;
    }
    updateEpicenterEditMode();
    const selectsExistingFault = state.faultModelId === "active-fault";
    if (!selectsExistingFault) {
      activeFaultSelectionRequestId += 1;
    }
    faultMenu?.classList.toggle("has-official-fault-preset", Boolean(preset) || selectsExistingFault);
    activeFaultPicker?.classList.toggle("hidden", !selectsExistingFault);
    if (!faultModelProfile) {
      return;
    }
    if (selectsExistingFault) {
      faultModelProfile.innerHTML = `
        <strong>活断層を選択</strong>
        <p>産総研 活断層データベースの活動セグメントから選択できます。</p>
      `;
      ensureActiveFaultPickerData();
      invalidateIntensityEstimateCache();
      updateSimulationFaultSource();
      updateSimulationAvailability();
      return;
    }
    if (!preset) {
      if (faultMagnitudeInput) {
        faultMagnitudeInput.value = state.magnitude.toFixed(1);
      }
      if (faultDepthInput) {
        faultDepthInput.value = String(state.depthKm);
      }
      faultModelProfile.innerHTML = `
        <strong>単一の矩形断層</strong>
        <p>長さ・幅・走向・傾斜角と破壊の進み方を手動で設定します。</p>
      `;
      invalidateIntensityEstimateCache();
      updateSimulationFaultSource();
      updateIntensityLayer();
      return;
    }
    state.magnitude = preset.magnitudeValue;
    state.depthKm = preset.depthKm;
    if (faultMagnitudeInput) {
      faultMagnitudeInput.value = state.magnitude.toFixed(1);
    }
    if (faultDepthInput) {
      faultDepthInput.value = String(state.depthKm);
    }
    const centerPoint = preset.path[Math.floor(preset.path.length / 2)];
    state.longitude = centerPoint[0];
    state.latitude = centerPoint[1];
    state.epicenterName = preset.name;
    const magnitudeNote = preset.magnitudeNote ? `<small>${escapeHtml(preset.magnitudeNote)}</small>` : "";
    faultModelProfile.innerHTML = `
      <div class="fault-model-profile-head">
        <div><strong>${escapeHtml(preset.name)}</strong><span>${escapeHtml(preset.modelType)}</span></div>
        <b>${escapeHtml(preset.magnitude)}</b>
      </div>
      ${magnitudeNote}
      <dl>
        <div><dt>対象領域</dt><dd>${escapeHtml(preset.region)}</dd></div>
        <div><dt>構成</dt><dd>${preset.segments.map((segment) => `<span>${escapeHtml(segment)}</span>`).join("")}</dd></div>
      </dl>
      <p>${escapeHtml(preset.summary)}</p>
      <p>${escapeHtml(preset.detail)}</p>
      <a href="${escapeHtml(preset.sourceUrl)}" target="_blank" rel="noopener noreferrer">出典：${escapeHtml(preset.sourceLabel)}</a>
    `;
    invalidateIntensityEstimateCache();
    syncInputs();
    if (epicenterMarker) {
      epicenterMarker.setLngLat([state.longitude, state.latitude]);
    }
    updateSimulationFaultSource();
    updateIntensityLayer();
  };
  faultModelSelect?.addEventListener("change", syncFaultModelPreset);
  faultNankaiCaseSelect?.addEventListener("change", syncFaultModelPreset);
  faultEpicenterEditButton?.addEventListener("click", () => {
    if (state.faultModelId !== "rectangle" || state.simulationRunning) {
      return;
    }
    els.epicenterEditToggle.checked = !els.epicenterEditToggle.checked;
    updateEpicenterEditMode();
  });
  activeFaultSearch?.addEventListener("input", () => renderActiveFaultOptions(activeFaultSearch.value));
  activeFaultSelect?.addEventListener("change", () => {
    void applyActiveFaultSelection(activeFaultSelect.value);
  });
  [faultMagnitudeInput, faultDepthInput].forEach((input) => {
    input?.addEventListener("change", applyFaultSourceParameterInputs);
  });
  document.querySelectorAll("#fault-simulation-menu input, #fault-simulation-menu select").forEach((control) => {
    if (
      control === faultModelSelect
      || control === faultNankaiCaseSelect
      || control === faultMagnitudeInput
      || control === faultDepthInput
      || control === activeFaultSearch
      || control === activeFaultSelect
    ) {
      return;
    }
    control.addEventListener("change", () => {
      invalidateIntensityEstimateCache();
      updateSimulationFaultSource();
      updateIntensityLayer();
    });
  });
  syncFaultModelPreset();

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
  els.currentLocationRequestButton?.addEventListener("click", () => requestCurrentLocationForMaps());
  els.stationLayerToggle.addEventListener("change", () => updateDisplayMode());
  els.submarineStationLayerToggle?.addEventListener("change", () => updateDisplayMode());
  els.regionLayerToggle.addEventListener("change", () => updateDisplayMode());
  els.eewWarningToggle.addEventListener("change", () => updateDisplayMode());
  els.plateBoundaryLayerToggle?.addEventListener("change", () => updateDisplayMode());
  els.faultLayerToggle?.addEventListener("change", () => updateDisplayMode());
  const syncMapLayerControlPanel = () => {
    els.mapLayerControlPanel?.querySelectorAll("[data-map-layer-target]").forEach((control) => {
      const target = document.getElementById(control.dataset.mapLayerTarget || "");
      if (target instanceof HTMLInputElement) {
        control.checked = target.checked;
        control.disabled = target.disabled;
      }
    });
  };
  els.mapLayerControlButton?.addEventListener("click", () => {
    const willOpen = els.mapLayerControlPanel?.classList.contains("hidden");
    if (willOpen) syncMapLayerControlPanel();
    els.mapLayerControlPanel?.classList.toggle("hidden", !willOpen);
    els.mapLayerControlButton?.setAttribute("aria-expanded", String(willOpen));
  });
  els.mapLayerControlPanel?.querySelectorAll("[data-map-layer-target]").forEach((control) => {
    control.addEventListener("change", () => {
      const target = document.getElementById(control.dataset.mapLayerTarget || "");
      if (!(target instanceof HTMLInputElement)) return;
      target.checked = control.checked;
      target.dispatchEvent(new Event("change", { bubbles: true }));
      syncMapLayerControlPanel();
    });
  });
  document.addEventListener("change", (event) => {
    if (
      event.target instanceof HTMLInputElement
      && [
        "station-layer-toggle",
        "submarine-station-layer-toggle",
        "region-layer-toggle",
        "eew-warning-toggle",
        "plate-boundary-layer-toggle",
        "fault-layer-toggle",
      ].includes(event.target.id)
    ) {
      syncMapLayerControlPanel();
    }
  });
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
      stopSimulation({ expandSetup: true });
      return;
    }

    toggleSimulationPause();
  });
  els.simulationRewind?.addEventListener("click", () => {
    if (state.simulationCompleted) {
      showSimulationResultReport();
      return;
    }
    if (!state.simulationRunning || !simulationStartedAt) {
      return;
    }
    seekSimulationToElapsed(getSimulationElapsedSec() - 5);
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

function ensureSimulationResultReportPage() {
  const scrollHost = els.setupPanel?.querySelector(".sim-panel-scroll");
  if (!scrollHost) {
    return null;
  }

  let page = scrollHost.querySelector("#simulation-result-report-page");
  if (page) {
    return page;
  }

  page = document.createElement("section");
  page.id = "simulation-result-report-page";
  page.className = "simulation-result-report-page hidden";
  page.setAttribute("aria-label", "シミュレーション結果");
  page.innerHTML = `
    <header class="simulation-result-report-head">
      <button type="button" data-simulation-result-back aria-label="シミュレーション終了時点へ戻る">‹</button>
      <h3>シミュレーション結果</h3>
      <span aria-hidden="true"></span>
    </header>
    <div class="simulation-result-report-content"></div>
    <div class="simulation-result-report-actions">
      <button type="button" data-simulation-result-pdf>PDF出力</button>
      <button type="button" data-simulation-result-csv>CSV出力</button>
    </div>
  `;
  page.querySelector("[data-simulation-result-back]")?.addEventListener("click", () => {
    closeSimulationResultReport();
  });
  page.querySelector("[data-simulation-result-pdf]")?.addEventListener("click", () => {
    downloadSimulationResultPdf();
  });
  page.querySelector("[data-simulation-result-csv]")?.addEventListener("click", () => {
    downloadSimulationResultCsv();
  });
  scrollHost.append(page);
  return page;
}

function captureSimulationResultReport() {
  return {
    epicenter: els.simulationRegionName?.textContent?.trim() || "-",
    magnitude: els.simulationMagnitude?.textContent?.trim() || "-",
    depth: els.simulationDepth?.textContent?.trim() || "-",
    originTime: els.simulationOriginTime?.textContent?.trim() || "-",
    maxIntensity: els.simulationMaxIntensity?.textContent?.trim() || "-",
    magnitudeHistory: simulationMagnitudeReports.map((report) => ({
      reportNumber: report.reportNumber,
      elapsedSec: report.elapsedSec,
      magnitude: report.magnitude,
      isFinal: report.isFinal === true,
    })),
    stationGroups: buildSimulationResultStationGroups(),
  };
}

function buildSimulationResultStationGroups() {
  const stationFeatures = getObservedStationSummaryForElapsed(Infinity).stationFeatures;
  const groups = new Map();
  stationFeatures.forEach((feature) => {
    const properties = feature.properties ?? {};
    const rank = Number(properties.intensityRank) || 0;
    const name = String(properties.name || "").trim();
    if (rank <= 0 || !name) {
      return;
    }
    const intensityClass = INTENSITY_CLASSES.find((candidate) => candidate.rank === rank);
    const label = String(properties.intensityLabel || intensityClass?.label || "-");
    if (!groups.has(rank)) {
      groups.set(rank, {
        rank,
        label,
        color: intensityClass?.color || properties.intensityColor || "#64748b",
        textColor: intensityClass?.textColor || "#ffffff",
        names: new Set(),
      });
    }
    groups.get(rank).names.add(name);
  });
  return [...groups.values()]
    .sort((left, right) => right.rank - left.rank)
    .map((group) => ({ ...group, names: [...group.names].sort((a, b) => a.localeCompare(b, "ja")) }));
}

function renderSimulationResultReport(snapshot) {
  const page = ensureSimulationResultReportPage();
  const content = page?.querySelector(".simulation-result-report-content");
  if (!page || !content) {
    return null;
  }

  const stationGroups = snapshot.stationGroups.length
    ? snapshot.stationGroups.map((group) => `
      <section class="simulation-result-station-group">
        <header>
          <b style="--simulation-intensity-color:${escapeHtml(group.color)};--simulation-intensity-text:${escapeHtml(group.textColor)}">震度${escapeHtml(group.label)}</b>
          <span>${group.names.length}地点</span>
        </header>
        <ul>${group.names.map((name) => `<li>${escapeHtml(name)}</li>`).join("")}</ul>
      </section>
    `).join("")
    : '<p class="simulation-result-stations-empty">震度1以上を観測した観測点はありません</p>';
  const actions = page.querySelector(".simulation-result-report-actions");
  content.innerHTML = `
    <section class="simulation-result-report-summary-host"></section>
    <section class="simulation-result-report-stations">
      <h4>震度別観測点</h4>
      <div class="simulation-result-station-groups">${stationGroups}</div>
    </section>
  `;
  content.querySelector(".simulation-result-report-summary-host")?.insertAdjacentElement("afterend", actions);
  return page;
}

function mountLiveSimulationSummaryOnResultPage(page) {
  restoreLiveSimulationSummary();
  const host = page?.querySelector(".simulation-result-report-summary-host");
  const summary = document.querySelector(".map-wrap > .simulation-runtime-hud .simulation-summary");
  if (!host || !summary || !summary.parentElement) {
    return false;
  }

  const context = document.createElement("div");
  context.className = "simulation-runtime-hud simulation-result-report-runtime-hud";
  simulationResultSummaryMount = {
    summary,
    parent: summary.parentElement,
    nextSibling: summary.nextSibling,
  };
  host.replaceChildren(context);
  context.append(summary);
  return true;
}

function restoreLiveSimulationSummary() {
  if (!simulationResultSummaryMount) {
    return;
  }
  const { summary, parent, nextSibling } = simulationResultSummaryMount;
  if (nextSibling?.parentElement === parent) {
    parent.insertBefore(summary, nextSibling);
  } else {
    parent.append(summary);
  }
  simulationResultSummaryMount = null;
}

function showSimulationResultReport() {
  if (!state.simulationCompleted) {
    return;
  }

  const snapshot = captureSimulationResultReport();
  simulationResultReportSnapshot = snapshot;
  const page = renderSimulationResultReport(snapshot);
  if (!page || !els.setupPanel) {
    return;
  }

  mountLiveSimulationSummaryOnResultPage(page);
  document.body.classList.add("simulation-result-report-visible");
  els.setupPanel.classList.remove("hidden");
  els.setupPanel.classList.add("simulation-result-report-open");
  page.classList.remove("hidden");
  setSetupMenuOpen(true);
  const scrollHost = els.setupPanel.querySelector(".sim-panel-scroll");
  const scrollResultToTop = () => {
    scrollHost?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    if (scrollHost) {
      scrollHost.scrollTop = 0;
      scrollHost.scrollLeft = 0;
    }
    page.scrollTop = 0;
    page.scrollLeft = 0;
  };
  scrollResultToTop();
  window.requestAnimationFrame(scrollResultToTop);
}

function closeSimulationResultReport(options = {}) {
  const returnToCompletedSimulation = options.returnToCompleted !== false
    && document.body.classList.contains("simulation-result-report-visible")
    && state.simulationCompleted;
  const page = document.querySelector("#simulation-result-report-page");
  restoreLiveSimulationSummary();
  page?.classList.add("hidden");
  els.setupPanel?.classList.remove("simulation-result-report-open");
  document.body.classList.remove("simulation-result-report-visible");
  if (returnToCompletedSimulation) {
    els.setupPanel?.classList.add("hidden");
    const runtimeHud = document.querySelector(".simulation-runtime-hud");
    runtimeHud?.classList.remove("is-collapsed", "is-dragging");
    runtimeHud?.style.removeProperty("--runtime-hud-drag-y");
    const runtimeHudHandle = runtimeHud?.querySelector(".simulation-runtime-handle");
    runtimeHudHandle?.setAttribute("aria-expanded", "true");
    runtimeHudHandle?.setAttribute("aria-label", "シミュレーション情報を折りたたむ");
    return;
  }
  if (options.activatePrimary !== false) {
    activateSettingsTab("primary");
  }
}

function downloadSimulationResultPdf() {
  const page = document.querySelector("#simulation-result-report-page");
  const button = page?.querySelector("[data-simulation-result-pdf]");
  if (!page || page.classList.contains("hidden") || !simulationResultReportSnapshot || !button) {
    return;
  }

  button.disabled = true;
  button.textContent = "PDF生成中...";
  try {
    const canvases = renderSimulationResultPdfCanvases(simulationResultReportSnapshot);
    const pdfBytes = buildJpegPagesPdf(canvases);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = getSimulationResultExportFilename("pdf");
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.warn("simulation result PDF generation failed", error);
    button.textContent = "PDF生成失敗・再試行";
    return;
  } finally {
    button.disabled = false;
  }
  button.textContent = "PDF出力";
}

function getSimulationResultExportFilename(extension) {
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join("");
  return `WE-Simulator_Result_${timestamp}.${String(extension || "").replace(/^\./u, "")}`;
}

function escapeSimulationResultCsvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/u.test(text) ? `"${text.replace(/"/gu, '""')}"` : text;
}

function buildSimulationResultCsv(snapshot) {
  const rows = [
    ["シミュレーション結果"],
    ["震央地名", snapshot.epicenter],
    ["深さ", snapshot.depth],
    ["マグニチュード", snapshot.magnitude],
    ["最大震度", snapshot.maxIntensity],
    ["発生時刻", snapshot.originTime],
    [],
    ["マグニチュード履歴"],
    ["報数", "経過秒", "マグニチュード", "確定"],
    ...snapshot.magnitudeHistory.map((report) => [
      report.reportNumber,
      report.elapsedSec,
      report.magnitude,
      report.isFinal ? "確定" : "",
    ]),
    [],
    ["震度別観測点"],
    ["震度", "観測点名"],
    ...snapshot.stationGroups.flatMap((group) => (
      group.names.map((name) => [group.label, name])
    )),
  ];
  return rows
    .map((row) => row.map(escapeSimulationResultCsvCell).join(","))
    .join("\r\n");
}

function downloadSimulationResultCsv() {
  const page = document.querySelector("#simulation-result-report-page");
  const button = page?.querySelector("[data-simulation-result-csv]");
  if (!page || page.classList.contains("hidden") || !simulationResultReportSnapshot || !button) {
    return;
  }

  button.disabled = true;
  button.textContent = "CSV生成中...";
  try {
    const csv = buildSimulationResultCsv(simulationResultReportSnapshot);
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = getSimulationResultExportFilename("csv");
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.warn("simulation result CSV generation failed", error);
    button.textContent = "CSV生成失敗・再試行";
    return;
  } finally {
    button.disabled = false;
  }
  button.textContent = "CSV出力";
}

function renderSimulationResultPdfCanvases(snapshot) {
  const width = 1240;
  const height = 1754;
  const margin = 78;
  const bottomLimit = height - 100;
  const pages = [];
  let canvas;
  let context;
  let y;

  const newPage = () => {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#0f172a";
    context.font = "900 42px sans-serif";
    context.fillText("シミュレーション結果", margin, 74);
    context.strokeStyle = "#cbd5e1";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(margin, 96);
    context.lineTo(width - margin, 96);
    context.stroke();
    pages.push(canvas);
    y = 130;
  };

  const drawInfoTicket = () => {
    const ticketHeight = 250;
    context.fillStyle = "#0b1224";
    roundCanvasRect(context, margin, y, width - margin * 2, ticketHeight, 24);
    context.fill();
    context.fillStyle = "#1f2937";
    roundCanvasRect(context, margin + 24, y + 55, 150, 150, 18);
    context.fill();
    context.fillStyle = "#cbd5e1";
    context.font = "800 24px sans-serif";
    context.fillText("最大震度", margin + 48, y + 42);
    context.fillStyle = "#ffffff";
    context.font = "900 72px sans-serif";
    context.textAlign = "center";
    context.fillText(snapshot.maxIntensity, margin + 99, y + 155);
    context.textAlign = "left";
    const detailX = margin + 205;
    const detailWidth = width - margin - detailX;
    context.fillStyle = "#ffffff";
    context.font = "900 38px sans-serif";
    context.fillText(fitCanvasText(context, snapshot.epicenter, detailWidth), detailX, y + 68);
    context.font = "700 29px sans-serif";
    context.fillText(
      fitCanvasText(context, `${snapshot.depth}  M${snapshot.magnitude}（確定値）`, detailWidth),
      detailX,
      y + 125,
    );
    context.fillStyle = "#cbd5e1";
    context.font = "700 25px sans-serif";
    context.fillText(
      fitCanvasText(context, snapshot.originTime, detailWidth),
      detailX,
      y + 182,
    );
    y += ticketHeight + 48;
  };

  const drawMagnitudeHistory = () => {
    const reports = Array.isArray(snapshot.magnitudeHistory) ? snapshot.magnitudeHistory : [];
    if (reports.length === 0) {
      return;
    }
    let reportIndex = 0;
    while (reportIndex < reports.length) {
      if (y + 92 > bottomLimit) {
        newPage();
      }
      context.fillStyle = "#0f172a";
      context.font = "900 32px sans-serif";
      context.fillText(reportIndex === 0 ? "マグニチュードの推移" : "マグニチュードの推移（続き）", margin, y);
      y += 46;
      const columnGap = 32;
      const columnWidth = (width - margin * 2 - columnGap) / 2;
      const availableRows = Math.max(1, Math.floor((bottomLimit - y - 24) / 38));
      const entries = reports.slice(reportIndex, reportIndex + availableRows * 2);
      entries.forEach((report, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        const x = margin + column * (columnWidth + columnGap);
        const label = reports.length === 1
          ? `開始時確定　M${Number(report.magnitude).toFixed(1)}`
          : `第${report.reportNumber}報　${Number(report.elapsedSec).toFixed(1)}秒　M${Number(report.magnitude).toFixed(1)}${report.isFinal ? "（最終）" : ""}`;
        context.fillStyle = row % 2 === 0 ? "#f1f5f9" : "#ffffff";
        context.fillRect(x, y + row * 38, columnWidth, 34);
        context.fillStyle = "#1e293b";
        context.font = "700 21px sans-serif";
        context.fillText(fitCanvasText(context, label, columnWidth - 20), x + 10, y + row * 38 + 25);
      });
      y += Math.ceil(entries.length / 2) * 38 + 30;
      reportIndex += entries.length;
      if (reportIndex < reports.length) {
        newPage();
      }
    }
  };

  newPage();
  drawInfoTicket();
  drawMagnitudeHistory();
  if (y + 80 > bottomLimit) {
    newPage();
  }
  context.fillStyle = "#0f172a";
  context.font = "900 32px sans-serif";
  context.fillText("震度別観測点", margin, y);
  y += 38;

  if (!snapshot.stationGroups.length) {
    context.fillStyle = "#475569";
    context.font = "500 25px sans-serif";
    context.fillText("震度1以上を観測した観測点はありません", margin, y + 34);
  }

  snapshot.stationGroups.forEach((group) => {
    let nameIndex = 0;
    while (nameIndex < group.names.length) {
      if (y + 130 > bottomLimit) {
        newPage();
      }
      context.fillStyle = group.color;
      roundCanvasRect(context, margin, y + 8, 160, 42, 9);
      context.fill();
      context.fillStyle = group.textColor;
      context.font = "900 25px sans-serif";
      context.textAlign = "center";
      context.fillText(`震度${group.label}`, margin + 80, y + 37);
      context.textAlign = "left";
      context.fillStyle = "#64748b";
      context.font = "800 22px sans-serif";
      const continuation = nameIndex > 0 ? "・続き" : "";
      context.fillText(`${group.names.length}地点${continuation}`, margin + 180, y + 36);
      // Leave enough room below the intensity badge for the first station name.
      y += 82;
      const columnWidth = (width - margin * 2 - 34) / 2;
      const availableRows = Math.max(1, Math.floor((bottomLimit - y - 48) / 40));
      const names = group.names.slice(nameIndex, nameIndex + availableRows * 2);
      names.forEach((name, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        context.fillStyle = "#0f172a";
        context.font = "600 23px sans-serif";
        context.fillText(`・${fitCanvasText(context, name, columnWidth - 18)}`, margin + column * (columnWidth + 34), y + row * 40);
      });
      y += Math.ceil(names.length / 2) * 40 + 22;
      context.strokeStyle = "#e2e8f0";
      context.beginPath();
      context.moveTo(margin, y);
      context.lineTo(width - margin, y);
      context.stroke();
      y += 24;
      nameIndex += names.length;
      if (nameIndex < group.names.length) {
        newPage();
      }
    }
  });

  pages.forEach((pageCanvas, index) => {
    const pageContext = pageCanvas.getContext("2d");
    pageContext.fillStyle = "#64748b";
    pageContext.font = "500 20px sans-serif";
    pageContext.textAlign = "center";
    pageContext.fillText(`${index + 1} / ${pages.length}`, width / 2, height - 42);
    pageContext.textAlign = "left";
  });
  return pages;
}

function roundCanvasRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function fitCanvasText(context, value, maxWidth) {
  const text = String(value || "-");
  if (context.measureText(text).width <= maxWidth) {
    return text;
  }
  let fitted = text;
  while (fitted.length > 1 && context.measureText(`${fitted}…`).width > maxWidth) {
    fitted = fitted.slice(0, -1);
  }
  return `${fitted}…`;
}

function buildJpegPagesPdf(canvases) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const encoder = new TextEncoder();
  const jpegPages = canvases.map((canvas) => ({
    width: canvas.width,
    height: canvas.height,
    bytes: decodeBase64Bytes(canvas.toDataURL("image/jpeg", 0.92).split(",")[1]),
  }));
  const objectCount = 2 + jpegPages.length * 3;
  const objects = new Array(objectCount + 1);
  objects[1] = encoder.encode("<< /Type /Catalog /Pages 2 0 R >>");
  const pageIds = jpegPages.map((_, index) => 3 + index * 3);
  objects[2] = encoder.encode(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
  jpegPages.forEach((image, index) => {
    const pageId = 3 + index * 3;
    const contentId = pageId + 1;
    const imageId = pageId + 2;
    objects[pageId] = encoder.encode(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    const content = `q ${pageWidth} 0 0 ${pageHeight} 0 0 cm /Im0 Do Q`;
    objects[contentId] = joinByteArrays([
      encoder.encode(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`),
    ]);
    objects[imageId] = joinByteArrays([
      encoder.encode(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`),
      image.bytes,
      encoder.encode("\nendstream"),
    ]);
  });

  const chunks = [encoder.encode("%PDF-1.4\n%PDFIMAGE\n")];
  const offsets = new Array(objectCount + 1).fill(0);
  let byteLength = chunks[0].length;
  for (let id = 1; id <= objectCount; id += 1) {
    offsets[id] = byteLength;
    const objectBytes = joinByteArrays([
      encoder.encode(`${id} 0 obj\n`),
      objects[id],
      encoder.encode("\nendobj\n"),
    ]);
    chunks.push(objectBytes);
    byteLength += objectBytes.length;
  }
  const xrefOffset = byteLength;
  const xref = ["xref", `0 ${objectCount + 1}`, "0000000000 65535 f "];
  for (let id = 1; id <= objectCount; id += 1) {
    xref.push(`${String(offsets[id]).padStart(10, "0")} 00000 n `);
  }
  xref.push(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  chunks.push(encoder.encode(`${xref.join("\n")}\n`));
  return joinByteArrays(chunks);
}

function decodeBase64Bytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function joinByteArrays(arrays) {
  const totalLength = arrays.reduce((sum, array) => sum + array.length, 0);
  const joined = new Uint8Array(totalLength);
  let offset = 0;
  arrays.forEach((array) => {
    joined.set(array, offset);
    offset += array.length;
  });
  return joined;
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
  clearCurrentLocationLink({ preserveEnabled: true });
  updateEpicenter({ resolveLocation: true, enforceManagedArea: true });
  resetViewAnimating = true;
  updateSimulationAvailability();
  resetMapViewToInitial().finally(() => {
    resetViewAnimating = false;
    updateSimulationAvailability();
  });
}

async function requestCurrentLocationForMaps() {
  const button = els.currentLocationRequestButton;
  if (!button || state.simulationRunning || button.getAttribute("aria-busy") === "true") {
    return;
  }

  button.disabled = true;
  button.setAttribute("aria-busy", "true");
  button.classList.remove("is-error");
  button.textContent = "取得中...";

  try {
    const position = await requestCurrentPosition();
    if (!isUsableGeolocationPosition(position)) {
      throw new Error("Geolocation returned invalid coordinates.");
    }

    const latitude = Number(position.coords.latitude);
    const longitude = Number(position.coords.longitude);
    await syncCurrentLocationSettingFromCoordinates(latitude, longitude);
    button.textContent = "位置情報を取得";
  } catch (error) {
    console.warn("failed to get current location for maps", error);
    button.classList.add("is-error");
    button.textContent = "取得失敗・再試行";
  } finally {
    button.removeAttribute("aria-busy");
    button.disabled = state.simulationRunning;
  }
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
    state.pushSubscribed = Boolean(subscription) && Notification.permission === "granted";
    if (subscription) {
      syncCommunityPushSubscriptionAccount(registration, subscription).catch((error) => {
        console.warn("push subscription account sync failed", error);
      });
    }
    setPushNotificationStatus(
      state.pushSubscribed ? "通知は有効です。" : "通知を有効にできます。",
      { disabled: false },
    );
    updateSettingsScreenNotificationState();
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
  if (communityWorkerBaseUrl) {
    return communityWorkerBaseUrl;
  }
  const config = await loadPushConfig();
  communityWorkerBaseUrl = String(config.workerUrl || "").replace(/\/+$/, "");
  return communityWorkerBaseUrl;
}

function setupCommunityCustomTagEditor(overlay) {
  const editor = overlay?.querySelector("[data-community-custom-tag-editor]");
  const input = overlay?.querySelector("#community-post-custom-tag");
  const addButton = overlay?.querySelector("[data-community-custom-tag-add]");
  const list = overlay?.querySelector("[data-community-custom-tag-list]");
  if (!editor || !input || !addButton || !list || editor.dataset.ready === "true") {
    return;
  }

  const addTag = () => {
    const value = String(input.value || "").trim().slice(0, 24);
    if (!value) {
      input.focus();
      return;
    }
    const duplicate = [...list.querySelectorAll("[data-community-custom-tag]")]
      .some((item) => item.dataset.communityCustomTag === value);
    if (!duplicate) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "community-post-custom-tag-chip";
      chip.dataset.communityCustomTag = value;
      chip.textContent = `${value} ×`;
      chip.setAttribute("aria-label", `${value}を削除`);
      list.append(chip);
    }
    input.value = "";
    input.focus();
    updateCommunityPostSubmitState();
  };

  addButton.addEventListener("click", addTag);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }
  });
  list.addEventListener("click", (event) => {
    event.target?.closest?.("[data-community-custom-tag]")?.remove();
    updateCommunityPostSubmitState();
  });
  editor.dataset.ready = "true";
}

function ensureCommunityPostUi() {
  if (communityPostOverlayElements) {
    return communityPostOverlayElements;
  }

  const button = document.createElement("button");
  button.id = "community-post-button";
  button.className = "community-post-button";
  button.type = "button";
  button.textContent = "＋ 投稿";
  button.addEventListener("click", () => openCommunityPostOverlay());

  const overlay = document.createElement("section");
  overlay.id = "community-post-overlay";
  overlay.className = "community-post-overlay hidden";
  overlay.setAttribute("aria-label", "投稿");
  overlay.innerHTML = `
    <div class="community-post-sheet" role="dialog" aria-modal="false">
      <div class="community-post-head">
        <button class="community-post-close" type="button" aria-label="戻る">‹</button>
        <h2>投稿する</h2>
        <span></span>
      </div>
      <form id="community-post-form" class="community-post-form">
        <section class="community-post-section">
          <h3>どこから投稿するか</h3>
          <div class="community-post-location-actions">
            <button type="button" data-community-location="current">現在地</button>
            <button type="button" data-community-location="map">指定する</button>
          </div>
        </section>
        <section class="community-post-section">
          <h3>タグ</h3>
          <div class="community-post-tags">
            ${COMMUNITY_POST_TAGS.map((tag) => `
              <label>
                <input type="radio" name="tags" value="${tag.id}" required />
                <span>${tag.label}</span>
              </label>
            `).join("")}
          </div>
        </section>
        <section class="community-post-section community-post-optional-tag-section">
          <h3>任意タグ</h3>
          <div class="community-post-tags community-post-optional-tags">
            ${COMMUNITY_POST_OPTIONAL_TAGS.map((tag) => `
              <label>
                <input type="checkbox" name="optionalTag" value="${tag.id}" />
                <span>${tag.label}</span>
              </label>
            `).join("")}
          </div>
          <div class="community-post-custom-tag-editor" data-community-custom-tag-editor>
            <div class="community-post-custom-tag-entry">
              <input id="community-post-custom-tag" class="community-post-custom-tag" type="text" maxlength="24" placeholder="任意タグ名" />
              <button type="button" data-community-custom-tag-add>追加</button>
            </div>
            <div class="community-post-custom-tag-list" data-community-custom-tag-list aria-live="polite"></div>
          </div>
        </section>
        <section class="community-post-section">
          <h3>写真・動画</h3>
          <label class="community-media-picker">
            <input id="community-post-media" name="media" type="file" accept="image/png,image/jpeg,video/mp4" />
            <span>PNG / JPEG / 30秒以内のMP4</span>
          </label>
          <div id="community-post-preview" class="community-post-preview hidden"></div>
        </section>
        <section class="community-post-section">
          <h3>投稿文</h3>
          <textarea id="community-post-text" name="text" rows="5" maxlength="1200" required placeholder="状況、見えたもの、危険箇所など"></textarea>
        </section>
        <section class="community-post-section">
          <h3>投稿保持時間</h3>
          <div class="community-post-retention-options">
            <label><input type="radio" name="retention" value="24h" /><span>24時間</span></label>
            <label><input type="radio" name="retention" value="7d" /><span>1週間</span></label>
            <label><input type="radio" name="retention" value="forever" checked /><span>削除するまで</span></label>
          </div>
        </section>
        <p id="community-post-status" class="community-post-status" aria-live="polite"></p>
        <button class="community-post-submit" type="submit">投稿する</button>
      </form>
    </div>
  `;

  document.body.append(button, overlay);

  const form = overlay.querySelector("#community-post-form");
  const close = overlay.querySelector(".community-post-close");
  close?.replaceChildren("‹");
  overlay.querySelector(".community-post-head h2")?.replaceChildren("投稿設定");
  close?.replaceChildren("‹");
  overlay.querySelector(".community-post-head h2")?.replaceChildren("投稿設定");
  const currentLocationButton = overlay.querySelector('[data-community-location="current"]');
  const mapLocationButton = overlay.querySelector('[data-community-location="map"]');
  const locationStatus = overlay.querySelector("#community-post-location-status");
  const mediaInput = overlay.querySelector("#community-post-media");
  const preview = overlay.querySelector("#community-post-preview");
  const status = overlay.querySelector("#community-post-status");
  overlay.setAttribute("aria-label", "投稿設定");
  close?.replaceChildren("‹");
  close?.setAttribute("aria-label", "戻る");
  overlay.querySelector(".community-post-head h2")?.replaceChildren("投稿設定");
  overlay.querySelector('[data-community-location="current"]')?.replaceChildren("現在地");
  overlay.querySelector('[data-community-location="vague"]')?.replaceChildren("曖昧な現在地");
  overlay.querySelector('[data-community-location="map"]')?.replaceChildren("指定する");
  overlay.querySelector(".community-media-picker span")?.replaceChildren("ここをタップして画像・動画を追加");
  overlay.querySelector(".community-media-picker small")?.replaceChildren("PNG / JPEG / 30秒以内のMP4");
  overlay.querySelector(".community-post-submit")?.replaceChildren("投稿する");
  overlay.querySelector("#community-post-text")?.setAttribute("placeholder", "状況、見えたもの、危険箇所など");
  overlay.querySelectorAll(".community-post-section h3").forEach((heading, index) => {
    const labels = ["投稿場所", "タグ", "任意タグ", "写真・動画", "投稿文", "投稿保持時間"];
    if (labels[index]) {
      heading.textContent = labels[index];
    }
  });

  close?.addEventListener("click", () => closeCommunityPostOverlay());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeCommunityPostOverlay();
    }
  });
  currentLocationButton?.addEventListener("click", () => selectCommunityPostCurrentLocation());
  mapLocationButton?.addEventListener("click", () => beginCommunityPostMapPick());
  setupCommunityCustomTagEditor(overlay);
  mediaInput?.addEventListener("change", () => validateAndPreviewCommunityMedia());
  form?.addEventListener("input", updateCommunityPostSubmitState);
  form?.addEventListener("change", updateCommunityPostSubmitState);
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitCommunityPost();
  });

  communityPostOverlayElements = { button, overlay, form, locationStatus, mediaInput, preview, status };
  updateCommunityPostLocationStatus();
  return communityPostOverlayElements;
}

function openCommunityPostOverlay() {
  const ui = ensureCommunityPostUi();
  document.body.classList.add("community-post-overlay-open");
  ui.overlay.classList.remove("hidden");
  ui.overlay.scrollTop = 0;
  ui.overlay.querySelector(".community-post-sheet")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  ui.form?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  updateCommunityPostLocationStatus();
  ui.overlay.querySelector(".community-post-close")?.focus?.({ preventScroll: true });
}

function closeCommunityPostOverlay() {
  document.body.classList.remove("community-post-overlay-open", "community-pick-mode");
  communityPostOverlayElements?.overlay?.classList.add("hidden");
}

function resetCommunityPostForm() {
  const ui = ensureCommunityPostUi();
  ui.form?.reset();
  ui.form?.querySelector("[data-community-custom-tag-list]")?.replaceChildren();
  ui.preview?.classList.add("hidden");
  if (ui.preview) {
    ui.preview.innerHTML = "";
  }
  if (ui.status) {
    ui.status.textContent = "";
  }
  communityPostLocation = null;
  updateCommunityPostLocationStatus();
}

function updateCommunityPostLocationStatus() {
  const ui = ensureCommunityPostUi();
  if (!ui.locationStatus) {
    return;
  }
  if (!communityPostLocation) {
    ui.locationStatus.textContent = "場所を選択してください";
    return;
  }
  const label = communityPostLocation.mode === "current" ? "現在地" : "マップ指定";
  ui.locationStatus.textContent = `${label}: ${communityPostLocation.latitude.toFixed(5)}, ${communityPostLocation.longitude.toFixed(5)}`;
}

function selectCommunityPostCurrentLocation() {
  const ui = ensureCommunityPostUi();
  if (!navigator.geolocation) {
    ui.status.textContent = "このブラウザでは現在地を取得できません。";
    return;
  }
  ui.status.textContent = "現在地を取得中...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      communityPostLocation = {
        mode: "current",
        latitude: Number(position.coords.latitude),
        longitude: Number(position.coords.longitude),
      };
      ui.status.textContent = "";
      updateCommunityPostLocationStatus();
      updateCommunityPostSubmitState();
    },
    () => {
      ui.status.textContent = "現在地の取得ができませんでした。マップから指定してください。";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
  );
}

function beginCommunityPostMapPick() {
  const ui = ensureCommunityPostUi();
  ui.status.textContent = "地図をタップして投稿場所を指定してください。";
  document.body.classList.add("community-pick-mode");
  ui.overlay.classList.add("hidden");
}

function setCommunityPostMapLocation(lngLat) {
  communityPostLocation = {
    mode: "map",
    latitude: Number(lngLat.lat),
    longitude: Number(lngLat.lng),
  };
  document.body.classList.remove("community-pick-mode");
  openCommunityPostOverlay();
}

function validateAndPreviewCommunityMedia() {
  const ui = ensureCommunityPostUi();
  const file = ui.mediaInput?.files?.[0];
  if (ui.preview) {
    ui.preview.innerHTML = "";
    ui.preview.classList.add("hidden");
  }
  if (ui.status) {
    ui.status.textContent = "";
  }
  if (!file) {
    return;
  }
  const allowed = ["image/png", "image/jpeg", "video/mp4"];
  if (!allowed.includes(file.type)) {
    ui.status.textContent = "PNG / JPEG / MP4 のみ投稿できます。";
    ui.mediaInput.value = "";
    return;
  }
  const url = URL.createObjectURL(file);
  if (file.type === "video/mp4") {
    const video = document.createElement("video");
    video.controls = true;
    video.muted = true;
    video.src = url;
    video.addEventListener("loadedmetadata", () => {
      if (video.duration > COMMUNITY_POST_VIDEO_MAX_SECONDS) {
        URL.revokeObjectURL(url);
        ui.status.textContent = "動画は30秒以内にしてください。";
        ui.mediaInput.value = "";
        ui.preview.innerHTML = "";
        ui.preview.classList.add("hidden");
      }
    }, { once: true });
    ui.preview?.append(video);
  } else {
    const image = document.createElement("img");
    image.alt = "投稿写真プレビュー";
    image.src = url;
    ui.preview?.append(image);
  }
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "community-media-remove";
  removeButton.replaceChildren("添付を削除");
  removeButton.textContent = "添付を削除";
  removeButton.replaceChildren("添付を削除");
  removeButton.addEventListener("click", () => {
    if (ui.mediaInput) {
      ui.mediaInput.value = "";
    }
    ui.preview.innerHTML = "";
    ui.preview.classList.add("hidden");
    updateCommunityPostSubmitState();
  });
  ui.preview?.append(removeButton);
  ui.preview?.classList.remove("hidden");
  updateCommunityPostSubmitState();
}

function updateCommunityPostSubmitState() {
  const ui = communityPostOverlayElements;
  if (!ui?.form) {
    return;
  }
  const submitButton = ui.form.querySelector(".community-post-submit");
  const hasLocation = Boolean(communityPostLocation);
  const hasTag = ui.form.querySelectorAll('input[name="tags"]:checked').length === 1;
  const hasText = Boolean(String(ui.form.querySelector("#community-post-text")?.value || "").trim());
  if (submitButton) {
    submitButton.disabled = !(hasLocation && hasTag && hasText);
  }
}

function getSelectedCommunityOptionalTags(form) {
  const selected = [...(form?.querySelectorAll('input[name="optionalTag"]:checked') || [])]
    .map((input) => input.value)
    .filter((value) => value && value !== "custom");
  form?.querySelectorAll("[data-community-custom-tag]").forEach((item) => {
    selected.push(item.dataset.communityCustomTag || "");
  });
  selected.push(String(form?.querySelector("#community-post-custom-tag")?.value || "").trim().slice(0, 24));
  return [...new Set(selected.map((value) => String(value || "").trim()).filter(Boolean))]
    .map((value) => `optional:${value}`);
}

async function submitCommunityPost() {
  const ui = ensureCommunityPostUi();
  if (!hasCommunityAccount()) {
    ui.status.textContent = "投稿するにはアカウントを作成してください。";
    return;
  }
  const workerUrl = await getWorkerBaseUrl();
  if (!workerUrl) {
    ui.status.textContent = "投稿先のWorkerが設定されていません。";
    return;
  }
  if (!communityPostLocation) {
    ui.status.textContent = "投稿場所を選択してください。";
    return;
  }
  const checkedTags = [...ui.form.querySelectorAll('input[name="tags"]:checked')].map((input) => input.value);
  if (checkedTags.length !== 1) {
    ui.status.textContent = "タグを1つ以上選択してください。";
    return;
  }
  const optionalTags = getSelectedCommunityOptionalTags(ui.form);
  const postText = String(ui.form.querySelector("#community-post-text")?.value || "").trim();
  if (!postText) {
    ui.status.textContent = "投稿文を入力してください。";
    return;
  }
  const submitButton = ui.form.querySelector(".community-post-submit");
  if (submitButton) {
    submitButton.disabled = true;
  }
  ui.status.textContent = "投稿中...";
  try {
    const formData = new FormData(ui.form);
    if (!communityPostLocation.placeName) {
      const resolvedPlaceName = await resolveMunicipalityNameAt(
        communityPostLocation.longitude,
        communityPostLocation.latitude,
      );
      if (resolvedPlaceName && resolvedPlaceName !== "-") {
        communityPostLocation.placeName = `${resolvedPlaceName}${communityPostLocation.mode === "vague" ? "内" : ""}`;
      }
    }
    formData.set("latitude", String(communityPostLocation.latitude));
    formData.set("longitude", String(communityPostLocation.longitude));
    formData.set("locationMode", communityPostLocation.mode);
    formData.set("placeName", communityPostLocation.placeName || "");
    formData.delete("tags");
    formData.delete("optionalTag");
    formData.delete("customTag");
    checkedTags.forEach((tag) => formData.append("tags", tag));
    optionalTags.forEach((tag) => formData.append("tags", tag));
    const response = await fetch(`${workerUrl}/community-posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${communityAccount.token}`,
      },
      body: formData,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || `投稿に失敗しました (${response.status})`);
    }
    if (data.post) {
      communityPosts = [data.post, ...communityPosts.filter((post) => post.id !== data.post.id)];
      renderCommunityPostMarkers();
    }
    resetCommunityPostForm();
    closeCommunityPostOverlay();
  } catch (error) {
    ui.status.textContent = error?.message || "投稿に失敗しました。";
  } finally {
    updateCommunityPostSubmitState();
  }
}

async function loadCommunityPosts({ force = false, rejectOnError = false } = {}) {
  if (communityPostsLoadPromise) {
    if (!force) {
      return communityPostsLoadPromise;
    }
    await communityPostsLoadPromise;
  }
  const workerUrl = await getWorkerBaseUrl();
  if (!workerUrl) {
    communityPosts = [];
    renderCommunityPostMarkers();
    if (rejectOnError) {
      throw new Error("投稿サーバーが設定されていません");
    }
    return [];
  }
  communityPostsLoadPromise = fetchCommunityPostsFromWorker(workerUrl)
    .then((data) => {
      communityPosts = Array.isArray(data.posts) ? data.posts : [];
      renderCommunityPostMarkers();
      return communityPosts;
    })
    .catch((error) => {
      console.warn("community posts load failed", error);
      if (rejectOnError) {
        throw error;
      }
      return [];
    })
    .finally(() => {
      communityPostsLoadPromise = null;
    });
  return communityPostsLoadPromise;
}

async function fetchCommunityPostsFromWorker(workerUrl) {
  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const url = `${workerUrl}/community-posts?limit=120&ts=${Date.now()}`;
      const response = await fetch(url, {
        cache: "no-store",
        headers: communityAccount?.token && !communityAccount.localOnly
          ? { Authorization: `Bearer ${communityAccount.token}` }
          : {},
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || `community posts load failed (${response.status})`);
      }
      return data;
    } catch (error) {
      lastError = error;
      if (attempt === 0) {
        await new Promise((resolve) => window.setTimeout(resolve, 250));
      }
    }
  }
  throw lastError || new Error("community posts load failed");
}

function setCommunityMapControlBusy(control, busy) {
  if (!control) {
    return;
  }
  control.disabled = Boolean(busy);
  control.classList.toggle("is-loading", Boolean(busy));
  control.setAttribute("aria-busy", String(Boolean(busy)));
}

function setCommunityMapControlResult(control, result, message) {
  if (!control) {
    return;
  }
  control.classList.remove("is-success", "is-error");
  control.classList.add(result === "success" ? "is-success" : "is-error");
  control.title = message;
  window.setTimeout(() => {
    control.classList.remove("is-success", "is-error");
    if (control.classList.contains("community-map-current-location")) {
      updateCommunityLocationMarkerControlState(control);
      return;
    }
    control.title = control.classList.contains("community-map-refresh")
      ? "投稿を更新"
      : "現在地付近を表示";
  }, 1800);
}

function getCommunityPostMarkerOffsets(posts) {
  return new Map((Array.isArray(posts) ? posts : []).map((post) => [post, [0, 0]]));
}

const COMMUNITY_POST_COUNT_MAX_ZOOM = 9;
const COMMUNITY_POST_OVERLAP_DISTANCE_PX = 18;

function getCommunityPostMarkerGroups(posts) {
  const validPosts = (Array.isArray(posts) ? posts : []).filter((post) => {
    return Number.isFinite(Number(post?.latitude)) && Number.isFinite(Number(post?.longitude));
  });
  if (!map || map.getZoom() >= COMMUNITY_POST_COUNT_MAX_ZOOM || validPosts.length < 2) {
    return validPosts.map((post) => [post]);
  }

  const points = validPosts.map((post) => map.project([
    Number(post.longitude),
    Number(post.latitude),
  ]));
  const parents = validPosts.map((_, index) => index);
  const find = (index) => {
    while (parents[index] !== index) {
      parents[index] = parents[parents[index]];
      index = parents[index];
    }
    return index;
  };
  const unite = (left, right) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) {
      parents[rightRoot] = leftRoot;
    }
  };

  for (let left = 0; left < points.length; left += 1) {
    for (let right = left + 1; right < points.length; right += 1) {
      const distance = Math.hypot(
        points[left].x - points[right].x,
        points[left].y - points[right].y,
      );
      if (distance <= COMMUNITY_POST_OVERLAP_DISTANCE_PX) {
        unite(left, right);
      }
    }
  }

  const groups = new Map();
  validPosts.forEach((post, index) => {
    const root = find(index);
    if (!groups.has(root)) {
      groups.set(root, []);
    }
    groups.get(root).push(post);
  });
  return [...groups.values()];
}

function renderCommunityPostMarkers() {
  communityPostMarkers.forEach((marker) => marker.remove());
  communityPostMarkers = [];
  if (!map || !document.body.classList.contains("community-map-mode")) {
    return;
  }
  const markerGroups = getCommunityPostMarkerGroups(communityPosts);
  markerGroups.forEach((group) => {
    const post = group[0];
    const postCount = group.length;
    const latitude = Number(post.latitude);
    const longitude = Number(post.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    const markerElement = document.createElement("button");
    markerElement.type = "button";
    markerElement.className = "community-post-marker";
    markerElement.dataset.communityTag = Array.isArray(post.tags) ? String(post.tags[0] || "") : "";
    markerElement.setAttribute("aria-label", "投稿");
    const popup = new maplibregl.Popup({
      closeButton: true,
      closeOnClick: true,
      className: "community-post-popup",
      offset: 16,
    }).setHTML(buildCommunityPostPopupHtml(post));
    const marker = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
      offset: markerOffsets.get(post) || [0, 0],
    })
      .setLngLat([longitude, latitude])
      .setPopup(popup)
      .addTo(map);
    communityPostMarkers.push(marker);
  });
}

function isCommunityPostOptionalTag(tag) {
  return String(tag || "").startsWith("optional:");
}

function getCommunityPostTagLabel(tag) {
  const value = String(tag || "").trim();
  const primary = COMMUNITY_POST_TAGS.find((item) => item.id === value);
  if (primary) {
    return primary.label;
  }
  if (isCommunityPostOptionalTag(value)) {
    const optionalId = value.slice("optional:".length);
    const optional = COMMUNITY_POST_OPTIONAL_TAGS.find((item) => item.id === optionalId);
    return optional?.label || optionalId || "その他";
  }
  return value;
}

function renderCommunityPostTagPills(tags) {
  return (Array.isArray(tags) ? tags : [])
    .filter((tag) => !["optional:custom", "optional:その他"].includes(String(tag || "").trim()))
    .map((tag) => {
      const optional = isCommunityPostOptionalTag(tag);
      return `<span data-community-tag-pill="${optional ? "optional" : "primary"}">${escapeHtml(getCommunityPostTagLabel(tag))}</span>`;
    })
    .join("");
}

function buildCommunityPostPopupHtml(post) {
  const tags = renderCommunityPostTagPills(post.tags);
  const media = post.mediaUrl
    ? post.mediaType === "video/mp4"
      ? `<video controls playsinline src="${escapeHtml(post.mediaUrl)}"></video>`
      : `<img alt="投稿写真" src="${escapeHtml(post.mediaUrl)}" />`
    : "";
  return `
    <article class="community-post-popup-card">
      <div class="community-post-popup-tags">${tags}</div>
      ${media}
      <p>${escapeHtml(post.text || "投稿文なし")}</p>
      <time>${escapeHtml(formatCommunityPostDate(post.createdAt))}</time>
    </article>
  `;
}

function formatCommunityPostDate(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) {
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

function ensureCommunityPostUi() {
  if (communityPostOverlayElements) {
    return communityPostOverlayElements;
  }

  const button = document.createElement("button");
  button.id = "community-post-button";
  button.className = "community-post-button";
  button.type = "button";
  button.textContent = "投稿";
  button.addEventListener("click", () => openCommunityPostOverlay());

  const mapControls = document.createElement("div");
  mapControls.className = "community-map-controls";
  mapControls.setAttribute("aria-label", "投稿マップ操作");
  mapControls.innerHTML = `
    <button class="community-map-control community-map-refresh" type="button" aria-label="投稿を更新" title="投稿を更新">
      <span aria-hidden="true"></span>
    </button>
    <button class="community-map-control community-map-current-location" type="button" aria-label="現在地付近を表示" title="現在地付近を表示">
      <span aria-hidden="true"></span>
    </button>
  `;
  const refreshControl = mapControls.querySelector(".community-map-refresh");
  const currentLocationControl = mapControls.querySelector(".community-map-current-location");
  updateCommunityLocationMarkerControlState(currentLocationControl);
  refreshControl?.addEventListener("click", async () => {
    setCommunityMapControlBusy(refreshControl, true);
    try {
      await loadCommunityPosts({ force: true, rejectOnError: true });
      setCommunityMapControlResult(refreshControl, "success", "投稿を更新しました");
    } catch (error) {
      console.warn("Community posts refresh failed", error);
      setCommunityMapControlResult(refreshControl, "error", "投稿を更新できませんでした");
    } finally {
      setCommunityMapControlBusy(refreshControl, false);
    }
  });
  if (currentLocationControl) {
    let longPressTimer = 0;
    let suppressNextClick = false;
    let pointerStart = null;
    const cancelLongPress = () => {
      window.clearTimeout(longPressTimer);
      longPressTimer = 0;
      pointerStart = null;
    };
    currentLocationControl.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || currentLocationControl.disabled) {
        return;
      }
      cancelLongPress();
      pointerStart = { x: event.clientX, y: event.clientY };
      longPressTimer = window.setTimeout(() => {
        longPressTimer = 0;
        pointerStart = null;
        suppressNextClick = true;
        window.setTimeout(() => {
          suppressNextClick = false;
        }, 900);
        toggleCommunityLocationMarkerVisibility(currentLocationControl);
      }, 650);
    });
    currentLocationControl.addEventListener("pointermove", (event) => {
      if (
        pointerStart
        && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 10
      ) {
        cancelLongPress();
      }
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      currentLocationControl.addEventListener(eventName, cancelLongPress);
    });
    currentLocationControl.addEventListener("contextmenu", (event) => event.preventDefault());
    currentLocationControl.addEventListener("click", () => {
      if (suppressNextClick) {
        suppressNextClick = false;
        return;
      }
      centerCommunityMapOnRequestedCurrentLocation(currentLocationControl);
    });
  }

  const overlay = document.createElement("section");
  overlay.id = "community-post-overlay";
  overlay.className = "community-post-overlay hidden";
  overlay.setAttribute("aria-label", "投稿");
  overlay.innerHTML = `
    <div class="community-post-sheet" role="dialog" aria-modal="false">
      <div class="community-post-head">
        <button class="community-post-close" type="button" aria-label="戻る">‹</button>
        <h2>投稿する</h2>
        <span></span>
      </div>
      <form id="community-post-form" class="community-post-form">
        <section class="community-post-section">
          <h3>投稿場所</h3>
          <div class="community-post-location-preview" id="community-post-location-preview">
            <span class="community-post-location-dot" aria-hidden="true"></span>
            <span class="community-post-location-preview-text">場所を選択してください</span>
          </div>
          <div class="community-post-location-actions">
            <button type="button" data-community-location="current">現在地</button>
            <button type="button" data-community-location="vague">曖昧な現在地</button>
            <button type="button" data-community-location="map">指定する</button>
          </div>
        </section>
        <section class="community-post-section">
          <h3>タグ</h3>
          <div class="community-post-tags">
            ${COMMUNITY_POST_TAGS.map((tag) => `
              <label>
                <input type="radio" name="tags" value="${tag.id}" required />
                <span>${tag.label}</span>
              </label>
            `).join("")}
          </div>
        </section>
        <section class="community-post-section community-post-optional-tag-section">
          <h3>任意タグ</h3>
          <div class="community-post-tags community-post-optional-tags">
            ${COMMUNITY_POST_OPTIONAL_TAGS.map((tag) => `
              <label>
                <input type="checkbox" name="optionalTag" value="${tag.id}" />
                <span>${tag.label}</span>
              </label>
            `).join("")}
          </div>
          <div class="community-post-custom-tag-editor" data-community-custom-tag-editor>
            <div class="community-post-custom-tag-entry">
              <input id="community-post-custom-tag" class="community-post-custom-tag" type="text" maxlength="24" placeholder="任意タグ名" />
              <button type="button" data-community-custom-tag-add>追加</button>
            </div>
            <div class="community-post-custom-tag-list" data-community-custom-tag-list aria-live="polite"></div>
          </div>
        </section>
        <section class="community-post-section">
          <h3>写真・動画</h3>
          <label class="community-media-picker">
            <input id="community-post-media" name="media" type="file" accept="image/png,image/jpeg,video/mp4" />
            <span>ここをタップして画像・動画を追加</span>
            <small>PNG / JPEG / 30秒以内のMP4</small>
          </label>
          <div id="community-post-preview" class="community-post-preview hidden"></div>
        </section>
        <section class="community-post-section">
          <h3>投稿文</h3>
          <textarea id="community-post-text" name="text" rows="5" maxlength="1200" required placeholder="状況、見えたもの、危険箇所など"></textarea>
        </section>
        <section class="community-post-section">
          <h3>投稿保持時間</h3>
          <div class="community-post-retention-options">
            <label><input type="radio" name="retention" value="24h" /><span>24時間</span></label>
            <label><input type="radio" name="retention" value="7d" /><span>1週間</span></label>
            <label><input type="radio" name="retention" value="forever" checked /><span>削除するまで</span></label>
          </div>
        </section>
        <p id="community-post-status" class="community-post-status" aria-live="polite"></p>
        <button class="community-post-submit" type="submit">投稿する</button>
      </form>
    </div>
  `;

  document.body.append(button, mapControls, overlay);
  setCommunityMapStyle(communityMapStyle, { persist: false });

  const form = overlay.querySelector("#community-post-form");
  const close = overlay.querySelector(".community-post-close");
  const locationStatus = overlay.querySelector("#community-post-location-status");
  const locationPreview = overlay.querySelector("#community-post-location-preview");
  const mediaInput = overlay.querySelector("#community-post-media");
  const preview = overlay.querySelector("#community-post-preview");
  const status = overlay.querySelector("#community-post-status");

  close?.addEventListener("click", () => closeCommunityPostOverlay());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeCommunityPostOverlay();
    }
  });
  overlay.querySelector('[data-community-location="current"]')?.addEventListener("click", () => {
    selectCommunityPostCurrentLocation("current");
  });
  overlay.querySelector('[data-community-location="vague"]')?.addEventListener("click", () => {
    selectCommunityPostCurrentLocation("vague");
  });
  overlay.querySelector('[data-community-location="map"]')?.addEventListener("click", () => beginCommunityPostMapPick());
  setupCommunityCustomTagEditor(overlay);
  mediaInput?.addEventListener("change", () => validateAndPreviewCommunityMedia());
  form?.addEventListener("input", updateCommunityPostSubmitState);
  form?.addEventListener("change", updateCommunityPostSubmitState);
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitCommunityPost();
  });

  communityPostOverlayElements = {
    button,
    mapControls,
    refreshControl,
    currentLocationControl,
    overlay,
    form,
    locationStatus,
    locationPreview,
    mediaInput,
    preview,
    status,
  };
  updateCommunityPostLocationStatus();
  updateCommunityPostSubmitState();
  return communityPostOverlayElements;
}

async function updateCommunityPostLocationStatus() {
  const ui = ensureCommunityPostUi();
  const text = ui.locationPreview?.querySelector(".community-post-location-preview-text");
  const dot = ui.locationPreview?.querySelector(".community-post-location-dot");
  const requestId = ++communityPostLocationResolveRequestId;
  if (!communityPostLocation) {
    if (text) {
      text.textContent = "場所を選択してください";
    }
    dot?.classList.remove("is-set", "is-vague");
    return;
  }
  const location = communityPostLocation;
  if (text) {
    text.textContent = "場所を確認中...";
  }
  dot?.classList.add("is-set");
  dot?.classList.toggle("is-vague", communityPostLocation.mode === "vague");
}

function selectCommunityPostCurrentLocation(mode = "current") {
  const ui = ensureCommunityPostUi();
  if (!navigator.geolocation) {
    ui.status.textContent = "このブラウザでは現在地を取得できません。";
    return;
  }
  ui.status.textContent = mode === "vague" ? "曖昧な現在地を作成中..." : "現在地を取得中...";
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const base = {
        latitude: Number(position.coords.latitude),
        longitude: Number(position.coords.longitude),
      };
      const point = mode === "vague"
        ? await randomizeLocationWithinCurrentMunicipality(
          base,
          COMMUNITY_POST_VAGUE_LOCATION_RADIUS_METERS,
        )
        : base;
      communityPostLocation = {
        mode,
        latitude: point.latitude,
        longitude: point.longitude,
      };
      ui.status.textContent = "";
      updateCommunityPostLocationStatus();
    },
    () => {
      ui.status.textContent = "現在地の取得ができませんでした。マップから指定してください。";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
  );
}

async function randomizeLocationWithinCurrentMunicipality(location, radiusMeters) {
  const actualPoint = [Number(location.longitude), Number(location.latitude)];
  const municipality = await findMunicipalityAtPoint(actualPoint[0], actualPoint[1]);
  if (!municipality) {
    return location;
  }

  for (let attempt = 0; attempt < COMMUNITY_POST_VAGUE_LOCATION_MAX_ATTEMPTS; attempt += 1) {
    const radiusScale = 0.5 ** Math.floor(attempt / 30);
    const candidate = randomizeLocationWithinRadius(location, radiusMeters * radiusScale);
    if (pointInFeature([candidate.longitude, candidate.latitude], municipality)) {
      return candidate;
    }
  }

  return location;
}

function randomizeLocationWithinRadius(location, radiusMeters) {
  const bearing = Math.random() * Math.PI * 2;
  const distance = Math.sqrt(Math.random()) * radiusMeters;
  const earthRadius = 6378137;
  const lat1 = location.latitude * Math.PI / 180;
  const lon1 = location.longitude * Math.PI / 180;
  const angularDistance = distance / earthRadius;
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angularDistance) +
    Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing),
  );
  const lon2 = lon1 + Math.atan2(
    Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(lat1),
    Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2),
  );
  return {
    latitude: lat2 * 180 / Math.PI,
    longitude: lon2 * 180 / Math.PI,
  };
}

function setCommunityPostMapLocation(lngLat) {
  communityPostLocation = {
    mode: "map",
    latitude: Number(lngLat.lat),
    longitude: Number(lngLat.lng),
  };
  document.body.classList.remove("community-pick-mode");
  openCommunityPostOverlay();
  if (communityPostOverlayElements?.status) {
    communityPostOverlayElements.status.textContent = "";
  }
  updateCommunityPostLocationStatus();
  updateCommunityPostSubmitState();
}

function renderCommunityPostMarkers() {
  communityPostMarkers.forEach((marker) => marker.remove());
  communityPostMarkers = [];
  if (!map || !document.body.classList.contains("community-map-mode")) {
    return;
  }
  const markerGroups = getCommunityPostMarkerGroups(communityPosts);
  markerGroups.forEach((group) => {
    const post = group[0];
    const postCount = group.length;
    const latitude = Number(post.latitude);
    const longitude = Number(post.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }
    const markerElement = document.createElement("button");
    markerElement.type = "button";
    markerElement.className = "community-post-marker";
    markerElement.classList.toggle("is-count", postCount > 1);
    markerElement.textContent = postCount > 1 ? String(postCount) : "";
    if (postCount > 1) {
      markerElement.classList.add("is-tag-group");
      const postsByTag = new Map();
      group.forEach((groupPost) => {
        const primaryTag = Array.isArray(groupPost.tags) ? String(groupPost.tags[0] || "") : "";
        postsByTag.set(primaryTag, (postsByTag.get(primaryTag) || 0) + 1);
      });
      markerElement.replaceChildren(...[...postsByTag.entries()].map(([tag, count]) => {
        const countDot = document.createElement("span");
        countDot.className = "community-post-marker-count";
        countDot.dataset.communityTag = tag;
        countDot.textContent = String(count);
        countDot.setAttribute("aria-hidden", "true");
        return countDot;
      }));
    }
    markerElement.dataset.communityTag = Array.isArray(post.tags) ? String(post.tags[0] || "") : "";
    markerElement.setAttribute("aria-label", postCount > 1 ? `${postCount}件の投稿を表示` : "投稿を開く");
    markerElement.addEventListener("click", (event) => {
      event.stopPropagation();
      if (postCount > 1) {
        map.easeTo({
          center: [longitude, latitude],
          zoom: Math.max(COMMUNITY_POST_COUNT_MAX_ZOOM, map.getZoom() + 2),
        });
        return;
      }
      openCommunityPostDetail(post);
    });
    const marker = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
      offset: [0, 0],
    })
      .setLngLat([longitude, latitude])
      .addTo(map);
    communityPostMarkers.push(marker);
  });
}

function ensureCommunityPostDetailUi() {
  if (communityPostOverlayElements?.detailSheet) {
    return communityPostOverlayElements.detailSheet;
  }
  ensureCommunityPostUi();
  const sheet = document.createElement("section");
  sheet.id = "community-post-detail-sheet";
  sheet.className = "community-post-detail-sheet hidden";
  sheet.setAttribute("aria-label", "投稿内容");
  sheet.innerHTML = `
    <button class="community-post-detail-close" type="button" aria-label="戻る">‹</button>
    <div class="community-post-detail-body"></div>
  `;
  sheet.querySelector(".community-post-detail-close")?.addEventListener("click", () => closeCommunityPostDetail());
  document.body.append(sheet);
  communityPostOverlayElements.detailSheet = sheet;
  return sheet;
}

async function openCommunityPostDetail(post) {
  const sheet = ensureCommunityPostDetailUi();
  activeCommunityPostDetail = post;
  document.documentElement.classList.add("community-post-detail-open");
  document.body.classList.add("community-post-detail-open");
  sheet.classList.remove("hidden");
  renderCommunityPostDetail(post, "場所を判定中...");
  resetCommunityPostDetailScroll(sheet);
  requestAnimationFrame(() => resetCommunityPostDetailScroll(sheet));
  const placeName = await resolveCommunityPostPlaceName(post);
  if (!sheet.classList.contains("hidden")) {
    renderCommunityPostDetail(post, placeName);
  }
}

function resetCommunityPostDetailScroll(sheet) {
  sheet?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  sheet?.querySelector(".community-post-detail-body")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
}

function closeCommunityPostDetail() {
  document.documentElement.classList.remove("community-post-detail-open");
  document.body.classList.remove("community-post-detail-open");
  communityPostOverlayElements?.detailSheet?.classList.add("hidden");
  activeCommunityPostDetail = null;
}

function renderCommunityPostDetail(post, placeName = "") {
  const sheet = ensureCommunityPostDetailUi();
  const body = sheet.querySelector(".community-post-detail-body");
  if (!body) {
    return;
  }
  const tags = renderCommunityPostTagPills(post.tags);
  const media = post.mediaUrl
    ? post.mediaType === "video/mp4"
      ? `<video controls playsinline src="${escapeHtml(post.mediaUrl)}"></video>`
      : `<img alt="投稿写真" src="${escapeHtml(post.mediaUrl)}" />`
    : "";
  const isOwnPost = Boolean(communityAccount?.id && post.accountId === communityAccount.id);
  const localAdminInteractionsDisabled = Boolean(communityAccount?.isAdmin && communityAccount?.localOnly);
  const localAdminDisabledAttributes = localAdminInteractionsDisabled
    ? ' disabled aria-disabled="true" title="Local管理者はこの操作を利用できません"'
    : "";
  const likeLabel = post.liked ? "♥" : "♡";
  const followButton = post.accountId && !isOwnPost
    ? `<button class="community-post-follow-button${post.following ? " is-following" : ""}" type="button" data-community-follow-account="${escapeHtml(post.accountId)}"${localAdminDisabledAttributes}>${post.following ? "フォロー中" : "フォロー"}</button>`
    : "";
  body.innerHTML = `
    <div class="community-post-author">
      ${renderCommunityAccountIcon({ icon: post.authorIcon || "", name: post.authorName || "" }, "community-post-author-icon")}
      <strong>${escapeHtml(post.authorName || "匿名ユーザー")}</strong>
      <div class="community-post-author-actions">
        <button class="community-post-like-button${post.liked ? " is-liked" : ""}" type="button" data-community-like-post="${escapeHtml(post.id)}" aria-label="いいね"${localAdminDisabledAttributes}>${likeLabel}<span>${Number(post.likeCount || 0).toLocaleString("ja-JP")}</span></button>
        ${followButton}
      </div>
    </div>
    <div class="community-post-detail-tags">${tags}</div>
    ${media}
    <dl class="community-post-detail-meta">
      <div><dt>投稿場所</dt><dd>${escapeHtml(placeName || "場所を判定中...")}</dd></div>
      <div><dt>投稿時間</dt><dd>${escapeHtml(formatCommunityPostDate(post.createdAt))}</dd></div>
    </dl>
    <p>${escapeHtml(post.text || "投稿文なし")}</p>
    ${canDeleteCommunityPost(post) ? `<button class="community-post-delete-button" type="button" data-community-post-delete="${escapeHtml(post.id)}">投稿を削除</button>` : ""}
  `;
  body.querySelector("[data-community-post-delete]")?.addEventListener("click", () => deleteCommunityPost(post));
  body.querySelector("[data-community-like-post]")?.addEventListener("click", (event) => toggleCommunityPostLike(post, event.currentTarget));
  body.querySelector("[data-community-follow-account]")?.addEventListener("click", (event) => toggleCommunityAuthorFollow(post, event.currentTarget));
}

async function toggleCommunityPostLike(post, button) {
  if (!hasCommunityAccount() || communityAccount.localOnly) {
    window.alert("いいねするにはアカウントへログインしてください。");
    return;
  }
  if (button.dataset.pending === "true") {
    return;
  }
  const previousLiked = Boolean(post.liked);
  const previousCount = Number(post.likeCount || 0);
  const nextLiked = !previousLiked;
  post.liked = nextLiked;
  post.likeCount = Math.max(0, previousCount + (nextLiked ? 1 : -1));
  updateCommunityPostLikeButton(button, post);
  button.dataset.pending = "true";
  try {
    const workerUrl = await getWorkerBaseUrl();
    const response = await fetch(`${workerUrl}/community-posts/${encodeURIComponent(post.id)}/like`, {
      method: previousLiked ? "DELETE" : "PUT",
      headers: { Authorization: `Bearer ${communityAccount.token}` },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || "いいねを更新できませんでした。");
    }
    post.liked = Boolean(data.liked);
    post.likeCount = Number(data.likeCount || 0);
    updateCommunityPostLikeButton(button, post);
  } catch (error) {
    post.liked = previousLiked;
    post.likeCount = previousCount;
    updateCommunityPostLikeButton(button, post);
    window.alert(error?.message || "いいねを更新できませんでした。");
  } finally {
    delete button.dataset.pending;
  }
}

function updateCommunityPostLikeButton(button, post) {
  if (!button?.isConnected) {
    return;
  }
  button.classList.toggle("is-liked", Boolean(post.liked));
  button.innerHTML = `${post.liked ? "♥" : "♡"}<span>${Number(post.likeCount || 0).toLocaleString("ja-JP")}</span>`;
}

async function toggleCommunityAuthorFollow(post, button) {
  if (!hasCommunityAccount() || communityAccount.localOnly) {
    window.alert("フォローするにはアカウントへログインしてください。");
    return;
  }
  if (!post.accountId || post.accountId === communityAccount.id) {
    return;
  }
  if (button.dataset.pending === "true") {
    return;
  }
  const previousFollowing = Boolean(post.following);
  const nextFollowing = !previousFollowing;
  const previousFollowingCount = Number(communityAccount.followingCount || 0);
  const affectedPosts = communityPosts
    .filter((item) => item.accountId === post.accountId)
    .map((item) => [item, Boolean(item.following)]);
  affectedPosts.forEach(([item]) => {
    item.following = nextFollowing;
  });
  post.following = nextFollowing;
  updateCommunityPostFollowButton(button, nextFollowing);
  saveCommunityAccount({
    ...communityAccount,
    followingCount: Math.max(0, previousFollowingCount + (nextFollowing ? 1 : -1)),
  });
  button.dataset.pending = "true";
  try {
    const workerUrl = await getWorkerBaseUrl();
    const response = await fetch(`${workerUrl}/community-accounts/${encodeURIComponent(post.accountId)}/follow`, {
      method: previousFollowing ? "DELETE" : "PUT",
      headers: { Authorization: `Bearer ${communityAccount.token}` },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || "フォロー状態を更新できませんでした。");
    }
    communityPosts.forEach((item) => {
      if (item.accountId === post.accountId) {
        item.following = Boolean(data.following);
      }
    });
    post.following = Boolean(data.following);
    updateCommunityPostFollowButton(button, post.following);
    saveCommunityAccount({
      ...communityAccount,
      followingCount: Number(data.followingCount || 0),
    });
  } catch (error) {
    affectedPosts.forEach(([item, following]) => {
      item.following = following;
    });
    post.following = previousFollowing;
    updateCommunityPostFollowButton(button, previousFollowing);
    saveCommunityAccount({
      ...communityAccount,
      followingCount: previousFollowingCount,
    });
    window.alert(error?.message || "フォロー状態を更新できませんでした。");
  } finally {
    delete button.dataset.pending;
  }
}

function updateCommunityPostFollowButton(button, following) {
  if (!button?.isConnected) {
    return;
  }
  button.classList.toggle("is-following", Boolean(following));
  button.textContent = following ? "フォロー中" : "フォロー";
}

function getActiveCommunityPostPlaceName() {
  return communityPostOverlayElements?.detailSheet
    ?.querySelector(".community-post-detail-meta dd")?.textContent || "";
}

function canDeleteCommunityPost(post) {
  return Boolean(
    hasCommunityAccount() &&
    post?.id &&
    (communityAccount?.isAdmin || (post.accountId && post.accountId === communityAccount.id)),
  );
}

async function deleteCommunityPost(post) {
  if (!window.confirm("この投稿を削除しますか？")) {
    return;
  }
  const workerUrl = await getWorkerBaseUrl();
  try {
    const response = await fetch(`${workerUrl}/community-posts/${encodeURIComponent(post.id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${communityAccount.token}` },
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body?.error || "投稿を削除できませんでした。");
    }
    communityPosts = communityPosts.filter((item) => item.id !== post.id);
    renderCommunityPostMarkers();
    closeCommunityPostDetail();
  } catch (error) {
    window.alert(error?.message || "投稿を削除できませんでした。");
  }
}

async function resolveCommunityPostPlaceName(post) {
  const savedPlaceName = String(post?.placeName || "").trim();
  if (savedPlaceName) {
    return savedPlaceName;
  }
  const longitude = Number(post.longitude);
  const latitude = Number(post.latitude);
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return "-";
  }
  const name = await resolveMunicipalityNameAt(longitude, latitude);
  if (name && name !== "-") {
    return post?.locationMode === "vague" ? `${name}内` : name;
  }
  try {
    const municipalities = municipalityDisplayData ?? await loadMunicipalityBoundaries();
    const nearestMunicipality = findNearestFeatureByDistance(municipalities, [longitude, latitude], 40);
    if (nearestMunicipality) {
      const nearestName = formatMunicipalityDisplayName(nearestMunicipality.properties ?? {});
      if (nearestName && nearestName !== "該当なし") {
        return post?.locationMode === "vague" ? `${nearestName}内` : nearestName;
      }
    }
  } catch (error) {
    console.warn("Nearest municipality lookup unavailable", error);
  }
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

async function updateCommunityPostLocationStatus() {
  const ui = ensureCommunityPostUi();
  const text = ui.locationPreview?.querySelector(".community-post-location-preview-text");
  const dot = ui.locationPreview?.querySelector(".community-post-location-dot");
  const requestId = ++communityPostLocationResolveRequestId;
  if (!communityPostLocation) {
    if (text) {
      text.textContent = "場所を選択してください";
    }
    dot?.classList.remove("is-set", "is-vague");
    updateCommunityPostSubmitState();
    return;
  }
  const location = communityPostLocation;
  if (text) {
    text.textContent = "場所を確認中...";
  }
  dot?.classList.add("is-set");
  dot?.classList.toggle("is-vague", location.mode === "vague");
  updateCommunityPostSubmitState();

  const placeName = await resolveMunicipalityNameAt(location.longitude, location.latitude);
  if (requestId !== communityPostLocationResolveRequestId || communityPostLocation !== location) {
    return;
  }
  const resolvedPlaceName = placeName && placeName !== "-"
    ? `${placeName}${location.mode === "vague" ? "内" : ""}`
    : "所在地を特定できません";
  location.placeName = placeName && placeName !== "-" ? resolvedPlaceName : "";
  if (text) {
    text.textContent = resolvedPlaceName;
  }
}

COMMUNITY_POST_TAGS = [
  { id: "weather", label: "気象" },
  { id: "disaster", label: "災害" },
  { id: "earthquake", label: "地震" },
  { id: "safety", label: "防災" },
];

COMMUNITY_POST_OPTIONAL_TAGS = [
  { id: "typhoon", label: "台風" },
  { id: "heat", label: "猛暑" },
  { id: "landslide", label: "土砂災害" },
];

function loadCommunityAccountFromStorage() {
  try {
    const parsed = JSON.parse(localStorage.getItem(COMMUNITY_ACCOUNT_STORAGE_KEY) || "null");
    if (parsed?.token && parsed?.name) {
      return {
        id: String(parsed.id || ""),
        name: String(parsed.name || ""),
        icon: String(parsed.icon || "🌐"),
        token: String(parsed.token || ""),
      };
    }
  } catch (error) {
    console.warn("community account storage read failed", error);
  }
  return null;
}

function saveCommunityAccount(account) {
  communityAccount = account?.token ? {
    id: String(account.id || ""),
    name: String(account.name || ""),
    icon: String(account.icon || "🌐"),
    token: String(account.token || ""),
  } : null;
  if (communityAccount) {
    localStorage.setItem(COMMUNITY_ACCOUNT_STORAGE_KEY, JSON.stringify(communityAccount));
  } else {
    localStorage.removeItem(COMMUNITY_ACCOUNT_STORAGE_KEY);
  }
  updateCommunityAccountSettingsCard();
  if (communityAccount && document.body.dataset.activeBottomTab === "bottom-history-tab") {
    closeCommunityAccountRequiredPanel();
    setCommunityMapModeActive(true);
  }
}

function hasCommunityAccount() {
  return Boolean(communityAccount?.token && communityAccount?.name);
}

function openCommunityAccountRequiredPanel() {
  if (!communityAccountRequiredPanel) {
    communityAccountRequiredPanel = document.createElement("section");
    communityAccountRequiredPanel.id = "community-account-required";
    communityAccountRequiredPanel.className = "community-account-required";
    communityAccountRequiredPanel.innerHTML = `
      <div class="community-account-required-card">
        <div class="community-account-required-icon">＋</div>
        <h2>アカウントを作成してください</h2>
        <p>投稿を見る・投稿するにはアカウントが必要です。設定タブから名前、アイコン、パスワードを登録してください。</p>
        <button type="button" id="community-account-required-settings">設定で作成する</button>
      </div>
    `;
    communityAccountRequiredPanel.querySelector("#community-account-required-settings")?.addEventListener("click", () => {
      document.querySelector("#bottom-settings-tab")?.click();
    });
    document.body.append(communityAccountRequiredPanel);
  }
  communityAccountRequiredPanel.classList.remove("hidden");
}

function closeCommunityAccountRequiredPanel() {
  communityAccountRequiredPanel?.classList.add("hidden");
}

function ensureCommunityAccountSettingsCard() {
  const list = els.settingsMenuSheet?.querySelector(".settings-menu-list");
  if (!list) {
    return null;
  }
  if (!communityAccountPanel) {
    communityAccountPanel = document.createElement("section");
    communityAccountPanel.id = "community-account-panel";
    communityAccountPanel.className = "community-account-panel";
    list.insertAdjacentElement("afterbegin", communityAccountPanel);
  }
  updateCommunityAccountSettingsCard();
  refreshCommunityAccountStats();
  return communityAccountPanel;
}

function refreshCommunityAccountStats() {
  if (!communityAccount?.token || communityAccount.localOnly || communityAccountStatsPromise) {
    return communityAccountStatsPromise;
  }
  communityAccountStatsPromise = getWorkerBaseUrl()
    .then(async (workerUrl) => {
      if (!workerUrl) {
        return;
      }
      const response = await fetch(`${workerUrl}/community-account`, {
        headers: { Authorization: `Bearer ${communityAccount.token}` },
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.account && communityAccount) {
        saveCommunityAccount({ ...communityAccount, ...data.account, token: communityAccount.token });
      }
    })
    .catch((error) => console.warn("community account stats refresh failed", error))
    .finally(() => {
      communityAccountStatsPromise = null;
    });
  return communityAccountStatsPromise;
}

function updateCommunityAccountSettingsCard() {
  if (!communityAccountPanel) {
    return;
  }
  document.body.classList.toggle("community-admin-account", Boolean(communityAccount?.isAdmin));
  document.body.classList.toggle("community-local-account", Boolean(communityAccount?.localOnly));
  if (hasCommunityAccount()) {
    communityAccountPanel.innerHTML = `
      <div class="community-profile-card">
        <div class="community-profile-icon">${escapeHtml(communityAccount.icon || "🌐")}</div>
        <div class="community-profile-main">
          <span>プロフィール</span>
          <strong>${escapeHtml(communityAccount.name)}</strong>
        </div>
      </div>
      <form class="community-account-edit-form">
        <label>名前<input name="name" type="text" maxlength="32" value="${escapeHtml(communityAccount.name)}" /></label>
        <label>アイコン<input name="icon" type="text" maxlength="8" value="${escapeHtml(communityAccount.icon || "🌐")}" /></label>
        <button type="submit">プロフィールを更新</button>
      </form>
      <p class="community-account-note">投稿にはこのプロフィール名が表示されます。</p>
    `;
    communityAccountPanel.querySelector(".community-account-edit-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      updateCommunityAccountProfile(event.currentTarget);
    });
    return;
  }

  communityAccountPanel.innerHTML = `
    <div class="community-profile-card is-empty">
      <div class="community-profile-icon">＋</div>
      <div class="community-profile-main">
        <span>プロフィール</span>
        <strong>アカウント未作成</strong>
      </div>
    </div>
    <form class="community-account-create-form">
      <label>名前<input name="name" type="text" maxlength="32" autocomplete="username" placeholder="表示名" required /></label>
      <label>アイコン<input name="icon" type="text" maxlength="8" placeholder="例: 🌦️" /></label>
      <label>パスワード<input name="password" type="password" minlength="8" autocomplete="new-password" placeholder="8文字以上" required /></label>
      <label class="community-account-confirm"><input name="confirm" type="checkbox" required /><span>パスワードは絶対に忘れてはいけません。</span></label>
      <button type="submit">アカウント作成</button>
    </form>
    <form class="community-account-login-form">
      <strong>作成済みアカウントでログイン</strong>
      <label>名前<input name="name" type="text" maxlength="32" autocomplete="username" /></label>
      <label>パスワード<input name="password" type="password" autocomplete="current-password" /></label>
      <button type="submit">ログイン</button>
    </form>
    <p class="community-account-note">パスワードはサーバー側でハッシュ化して保存します。平文では保存しません。</p>
  `;
  communityAccountPanel.querySelector(".community-account-create-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    createCommunityAccountFromForm(event.currentTarget);
  });
  communityAccountPanel.querySelector(".community-account-login-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    loginCommunityAccountFromForm(event.currentTarget);
  });
}

async function createCommunityAccountFromForm(form) {
  const status = getCommunityAccountStatusElement();
  const workerUrl = await getWorkerBaseUrl();
  if (!workerUrl) {
    status.textContent = "Workerが設定されていません。";
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  status.textContent = "アカウント作成中...";
  try {
    const response = await fetch(`${workerUrl}/community-accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        icon: data.icon,
        password: data.password,
      }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body?.error || "アカウント作成に失敗しました。");
    }
    saveCommunityAccount(body.account);
    status.textContent = "アカウントを作成しました。";
    closeCommunityAccountRequiredPanel();
  } catch (error) {
    status.textContent = error?.message || "アカウント作成に失敗しました。";
  }
}

async function loginCommunityAccountFromForm(form) {
  const status = getCommunityAccountStatusElement();
  const workerUrl = await getWorkerBaseUrl();
  if (!workerUrl) {
    status.textContent = "Workerが設定されていません。";
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  status.textContent = "ログイン中...";
  try {
    const response = await fetch(`${workerUrl}/community-accounts/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, password: data.password }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body?.error || "ログインに失敗しました。");
    }
    saveCommunityAccount(body.account);
    status.textContent = "ログインしました。";
    closeCommunityAccountRequiredPanel();
  } catch (error) {
    status.textContent = error?.message || "ログインに失敗しました。";
  }
}

async function updateCommunityAccountProfile(form) {
  const status = getCommunityAccountStatusElement();
  const workerUrl = await getWorkerBaseUrl();
  if (!workerUrl || !hasCommunityAccount()) {
    status.textContent = "アカウント情報を更新できません。";
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  status.textContent = "更新中...";
  try {
    const response = await fetch(`${workerUrl}/community-account`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${communityAccount.token}`,
      },
      body: JSON.stringify({ name: data.name, icon: data.icon }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body?.error || "更新に失敗しました。");
    }
    saveCommunityAccount({ ...communityAccount, ...body.account, token: body.account?.token || communityAccount.token });
    status.textContent = "プロフィールを更新しました。";
  } catch (error) {
    status.textContent = error?.message || "更新に失敗しました。";
  }
}

function getCommunityAccountStatusElement() {
  ensureCommunityAccountSettingsCard();
  let status = communityAccountPanel?.querySelector(".community-account-status");
  if (!status) {
    status = document.createElement("p");
    status.className = "community-account-status";
    communityAccountPanel?.append(status);
  }
  return status;
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
    els.settingsPushStatus.setAttribute("role", "button");
    els.settingsPushStatus.setAttribute("tabindex", "0");
    els.settingsPushStatus.setAttribute("aria-pressed", String(state.pushSubscribed));
  }
  if (els.settingsLocationStatus) {
    const locationOn = Boolean(els.currentLocationToggle?.checked);
    els.settingsLocationStatus.textContent = locationOn ? "ON" : "OFF";
    els.settingsLocationStatus.dataset.state = locationOn ? "on" : "off";
    els.settingsLocationStatus.setAttribute("role", "button");
    els.settingsLocationStatus.setAttribute("tabindex", "0");
    els.settingsLocationStatus.setAttribute("aria-pressed", String(locationOn));
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
  document.documentElement.style.colorScheme = resolved;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    resolved === "light" ? "#eef2f5" : "#070b12",
  );
  if (map) {
    setCommunityMapStyle(resolved, { persist: false });
    if (!document.body.classList.contains("community-map-mode")) {
      applySimulationWhiteMapStyle(resolved === "light");
    }
  }
  els.settingsAppearancePanel?.querySelectorAll('input[name="appearance-theme"]').forEach((input) => {
    input.checked = input.value === value;
  });
}

function isResolvedAppearanceLight() {
  return document.documentElement.dataset.resolvedTheme === "light";
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
  state.showRegionLayer = true;
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
    els.regionLayerToggle.checked = true;
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
    els.simulationRegionLayerToggle.checked = true;
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

function resetSimulationLayersToDefaults() {
  [
    els.stationLayerToggle,
    els.submarineStationLayerToggle,
    els.regionLayerToggle,
    els.eewWarningToggle,
    els.plateBoundaryLayerToggle,
    els.faultLayerToggle,
    els.simulationStationLayerToggle,
    els.simulationSubmarineStationLayerToggle,
    els.simulationRegionLayerToggle,
    els.simulationEewWarningToggle,
    els.simulationPlateBoundaryLayerToggle,
    els.simulationFaultLayerToggle,
  ].forEach((toggle) => {
    if (toggle) {
      toggle.checked = toggle === els.regionLayerToggle || toggle === els.simulationRegionLayerToggle;
    }
  });
  els.mapLayerControlPanel?.querySelectorAll("[data-map-layer-target]").forEach((toggle) => {
    toggle.checked = toggle.dataset.mapLayerTarget === "region-layer-toggle";
  });
  els.mapLayerControlPanel?.classList.add("hidden");
  els.mapLayerControlButton?.setAttribute("aria-expanded", "false");
  updateDisplayMode();
}

function applyIntensityColorScheme(schemeId, options = {}) {
  const scheme = INTENSITY_COLOR_SCHEMES[schemeId] ?? INTENSITY_COLOR_SCHEMES.normal;
  const nextSchemeId = INTENSITY_COLOR_SCHEMES[schemeId] ? schemeId : "normal";
  state.intensityColorScheme = nextSchemeId;
  try {
    localStorage.setItem(INTENSITY_COLOR_SCHEME_KEY, nextSchemeId);
  } catch (_error) {
    // Storage may be unavailable in private/restricted contexts.
  }

  INTENSITY_CLASSES.forEach((intensityClass) => {
    const key = intensityClass.shortLabel;
    intensityClass.color = intensityClass.rank === 1
      ? INTENSITY_INFORMATION_GRAY
      : scheme.colors[key] ?? intensityClass.color;
    intensityClass.textColor = intensityClass.rank === 1
      ? "#1f2937"
      : getIntensitySchemeTextColor(scheme, key);
  });

  if (els.intensityColorScheme) {
    els.intensityColorScheme.value = nextSchemeId;
  }
  els.settingsAppearancePanel?.querySelectorAll('input[name="intensity-color-scheme-choice"]').forEach((input) => {
    input.checked = input.value === nextSchemeId;
  });

  updateLegendColors();
  ensureStationIntensityLabelImages({ refresh: true });
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

  const usesOldJmaScale = isOldJmaScaleSyntheticPreset(getSelectedPreset());
  legendScale.closest(".intensity-legend")?.classList.toggle("is-old-jma-scale", usesOldJmaScale);
  const labels = usesOldJmaScale
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
  updateLegendColors();
  syncInputs();
  updateEpicenter({ skipIntensityUpdate: true, preservePresetEpicenterName: true });
  if (map?.getSource("shindo-stations")) {
    setGeoJsonSourceData("shindo-stations", emptyFeatureCollection());
  }

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

  presetDetailLoadingId = presetId;
  updateSimulationAvailability();
  try {
    preset = await ensureEarthquakePresetDetail(presetId, { showLoading: false });
  } catch (error) {
    console.warn(error);
    if (presetDetailLoadingId === presetId) {
      presetDetailLoadingId = "";
      updateSimulationAvailability();
    }
    return;
  }

  if (state.selectedPresetId !== presetId || !preset) {
    return;
  }

  await schedulePresetObservationIndex(preset);
  if (state.selectedPresetId !== presetId) {
    return;
  }
  invalidateIntensityEstimateCache();
  scheduleOldScaleSyntheticMunicipalityHydration(preset);
  updateLegendColors();
  updateIntensityLayer();
  if (presetDetailLoadingId === presetId) {
    presetDetailLoadingId = "";
    updateSimulationAvailability();
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

  if (presetStationObservationMatchCache.presetId !== preset.id) {
    presetStationObservationMatchCache = { presetId: preset.id, matches: new Map() };
  }
  const stationKey = String(station.id ?? station.name ?? "");
  const resolvedByStationId = presetResolvedObservationByStationIdCache.get(preset.id);
  if (resolvedByStationId?.has(stationKey)) {
    return resolvedByStationId.get(stationKey);
  }
  if (presetStationObservationMatchCache.matches.has(stationKey)) {
    return presetStationObservationMatchCache.matches.get(stationKey);
  }

  const lookup = getPresetObservationLookup(preset);
  const normalizedStationName = normalizeStationNameForMatch(station.name);
  const exactMatch = lookup.byStationId.get(String(station.id ?? "")) ?? lookup.byName.get(normalizedStationName);
  if (exactMatch) {
    presetStationObservationMatchCache.matches.set(stationKey, exactMatch);
    return exactMatch;
  }

  const fuzzyMatch = (
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
  presetStationObservationMatchCache.matches.set(stationKey, fuzzyMatch);
  return fuzzyMatch;
}

function schedulePresetObservationIndex(preset) {
  if (!preset?.id || presetResolvedObservationByStationIdCache.has(preset.id) || !shindoStationData?.stations) {
    return Promise.resolve();
  }
  if (presetObservationIndexPromiseCache.has(preset.id)) {
    return presetObservationIndexPromiseCache.get(preset.id);
  }
  const promise = scheduleDeferredTask(() => buildPresetObservationStationIndex(preset), 0, 800)
    .finally(() => presetObservationIndexPromiseCache.delete(preset.id));
  presetObservationIndexPromiseCache.set(preset.id, promise);
  return promise;
}

function buildPresetObservationStationIndex(preset) {
  if (!preset?.id || presetResolvedObservationByStationIdCache.has(preset.id)) {
    return;
  }
  const lookup = getPresetObservationLookup(preset);
  const matches = new Map();
  (shindoStationData?.stations ?? []).forEach((station) => {
    const stationKey = String(station.id ?? station.name ?? "");
    const normalizedStationName = normalizeStationNameForMatch(station.name);
    const match = lookup.byStationId.get(stationKey) ?? lookup.byName.get(normalizedStationName) ??
      lookup.fuzzyCandidates.find((observation) => (
        observation.normalizedStationName &&
        (normalizedStationName.includes(observation.normalizedStationName) ||
          observation.normalizedStationName.includes(normalizedStationName))
      )) ?? null;
    matches.set(stationKey, match);
  });
  presetResolvedObservationByStationIdCache.set(preset.id, matches);
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
      byStationId.set(String(observation.stationId), normalizedObservation);
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
      setSheetState(panel, panel.dataset.sheetState === "open" ? "collapsed" : "open");
    };

    toggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener("click", toggleSheet);
    });

    let dragStartY = 0;
    let dragCurrentY = 0;
    let dragging = false;
    let suppressHandleClick = false;
    let dragStartHeight = 0;
    let dragCurrentHeight = 0;
    let dragRenderFrame = 0;
    let settleRenderFrame = 0;
    let pendingDragHeight = 0;

    const renderDragHeight = () => {
      dragRenderFrame = 0;
      if (!dragging || !pendingDragHeight) {
        return;
      }
      panel.style.setProperty("--sheet-drag-height", `${pendingDragHeight}px`);
    };

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
      if (panel.classList.contains("simulation-result-report-open")) {
        return;
      }
      const panelRect = panel.getBoundingClientRect();
      const startedOnHandle = Boolean(event.target?.closest?.(".sheet-handle"));
      const startedOnTopGrabZone = event.clientY - panelRect.top <= 78;
      const startedOnInteractive = Boolean(event.target?.closest?.("button:not(.sheet-handle), input, select, textarea, a, label"));
      if (!startedOnHandle && (!startedOnTopGrabZone || startedOnInteractive)) {
        return;
      }

      event.preventDefault();
      if (settleRenderFrame) {
        cancelAnimationFrame(settleRenderFrame);
        settleRenderFrame = 0;
      }
      dragging = true;
      dragStartY = event.clientY;
      dragCurrentY = event.clientY;
      dragStartHeight = panelRect.height;
      dragCurrentHeight = dragStartHeight;
      pendingDragHeight = dragStartHeight;
      panel.classList.add("is-dragging");
      panel.style.setProperty("--sheet-drag-height", `${dragStartHeight}px`);
      if (panel.dataset.sheetState !== "open") {
        setSheetState(panel, "open");
      }
      panel.setPointerCapture?.(event.pointerId);
    };

    const updateDrag = (event) => {
      if (!dragging) {
        return;
      }

      event.preventDefault();
      const coalescedEvents = event.getCoalescedEvents?.() ?? [];
      const latestEvent = coalescedEvents[coalescedEvents.length - 1] ?? event;
      dragCurrentY = latestEvent.clientY;
      const deltaY = dragCurrentY - dragStartY;
      const viewportHeight = window.visualViewport?.height || window.innerHeight || 720;
      const minHeight = 42;
      const maxHeight = getSetupSheetOpenHeight(viewportHeight);
      const nextHeight = clamp(dragStartHeight - deltaY, minHeight, maxHeight);
      dragCurrentHeight = nextHeight;
      pendingDragHeight = nextHeight;
      if (!dragRenderFrame) {
        dragRenderFrame = requestAnimationFrame(renderDragHeight);
      }
    };

    const finishDrag = (event) => {
      if (!dragging) {
        return;
      }

      dragging = false;
      panel.releasePointerCapture?.(event.pointerId);
      if (dragRenderFrame) {
        cancelAnimationFrame(dragRenderFrame);
        dragRenderFrame = 0;
      }
      panel.style.setProperty("--sheet-drag-height", `${dragCurrentHeight}px`);
      const deltaY = dragCurrentY - dragStartY;
      suppressHandleClick = Math.abs(deltaY) > 8;
      const viewportHeight = window.visualViewport?.height || window.innerHeight || 720;
      const closedHeight = 42;
      const collapsedHeight = 42;
      const openHeight = getSetupSheetOpenHeight(viewportHeight);
      const finalHeight = dragCurrentHeight || dragStartHeight;
      let nextState = "collapsed";
      if (finalHeight >= (collapsedHeight + openHeight) / 2 || deltaY < -48) {
        nextState = "open";
      } else if (finalHeight <= (closedHeight + collapsedHeight) / 2 || deltaY > 48) {
        nextState = "closed";
      }
      setSheetState(panel, nextState);
      settleRenderFrame = requestAnimationFrame(() => {
        settleRenderFrame = 0;
        panel.classList.remove("is-dragging");
        panel.style.removeProperty("--sheet-drag-height");
      });
    };

    panel.addEventListener("pointerdown", beginDrag);
    panel.addEventListener("pointermove", updateDrag);
    panel.addEventListener("pointerup", finishDrag);
    panel.addEventListener("pointercancel", finishDrag);
  });
}

function closeMapLayerControlPanel() {
  els.mapLayerControlPanel?.classList.add("hidden");
  els.mapLayerControlButton?.setAttribute("aria-expanded", "false");
}

function setupMapMenuGestures() {
  let tapCount = 0;
  let lastTapAt = 0;
  let lastTapX = 0;
  let lastTapY = 0;
  let pointerStart = null;
  const tripleTapWindowMs = 700;
  const tapRadiusPx = 42;
  const maxTapTravelPx = 14;

  const isBottomTabsTarget = (target) => Boolean(target?.closest?.(".bottom-tabs"));
  const isLayerMenuTarget = (target) => Boolean(
    target?.closest?.("#map-layer-control-panel, #map-layer-control-button"),
  );
  const isSheetMenuTarget = (target) => Boolean(
    target?.closest?.("#setup-panel, .simulation-runtime-hud"),
  );
  const isInteractiveTarget = (target) => Boolean(
    target?.closest?.("button, input, select, textarea, a, label, [role='button'], [contenteditable='true']"),
  );

  document.addEventListener(
    "pointerdown",
    (event) => {
      const target = event.target;
      if (
        !els.mapLayerControlPanel?.classList.contains("hidden")
        && !isLayerMenuTarget(target)
        && !isBottomTabsTarget(target)
      ) {
        closeMapLayerControlPanel();
      }

      if (event.isPrimary === false || (event.pointerType === "mouse" && event.button !== 0)) {
        pointerStart = null;
        return;
      }
      pointerStart = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        target,
      };
    },
    { capture: true, passive: true },
  );

  document.addEventListener(
    "pointerup",
    (event) => {
      if (!pointerStart || pointerStart.pointerId !== event.pointerId) {
        return;
      }

      const start = pointerStart;
      pointerStart = null;
      const travel = Math.hypot(event.clientX - start.x, event.clientY - start.y);
      const target = event.target;
      const excluded =
        document.body.dataset.activeBottomTab !== "earthquake-tab"
        || isBottomTabsTarget(target)
        || isLayerMenuTarget(target)
        || isSheetMenuTarget(target)
        || isInteractiveTarget(target);
      if (travel > maxTapTravelPx || excluded) {
        tapCount = 0;
        return;
      }

      const now = performance.now();
      const nearLastTap = Math.hypot(event.clientX - lastTapX, event.clientY - lastTapY) <= tapRadiusPx;
      if (now - lastTapAt > tripleTapWindowMs || !nearLastTap) {
        tapCount = 0;
      }
      tapCount += 1;
      lastTapAt = now;
      lastTapX = event.clientX;
      lastTapY = event.clientY;
      if (tapCount < 3) {
        return;
      }

      tapCount = 0;
      event.preventDefault();
      event.stopPropagation();
      const runtimeHud = document.querySelector(".simulation-runtime-hud");
      if (document.body.classList.contains("simulation-session-active") && runtimeHud) {
        runtimeHud.querySelector(".simulation-runtime-handle")?.click();
        return;
      }

      if (!els.setupPanel?.classList.contains("hidden")) {
        if (els.setupPanel.classList.contains("simulation-result-report-open")) {
          return;
        }
        const nextState = els.setupPanel.dataset.sheetState === "open" ? "collapsed" : "open";
        setSheetState(els.setupPanel, nextState);
      }
    },
    { capture: true, passive: false },
  );

  document.addEventListener(
    "pointercancel",
    () => {
      pointerStart = null;
      tapCount = 0;
    },
    { capture: true, passive: true },
  );
}

function getSetupSheetOpenHeight(viewportHeight = window.visualViewport?.height || window.innerHeight || 720) {
  const bottomTabsHeight = document.querySelector(".bottom-tabs")?.getBoundingClientRect().height || 64;
  const availableHeight = viewportHeight - bottomTabsHeight - 16;
  const preferredHeight = viewportHeight * 0.67;
  return Math.max(56, Math.min(availableHeight, preferredHeight));
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
            "background-color": isResolvedAppearanceLight() ? "#dbe8f0" : "#050914",
          },
        },
      ],
    },
    center: getInitialMapView().center,
    zoom: getInitialMapView().zoom,
    minZoom: BASE_MAP_MIN_ZOOM,
    maxZoom: SIMULATION_MAP_MAX_ZOOM,
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
  prefetchSimulationMapData();
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
    if (document.body.classList.contains("community-pick-mode")) {
      event.originalEvent?.preventDefault?.();
      setCommunityPostMapLocation(event.lngLat);
      return;
    }

    if (!state.epicenterEditEnabled) {
      return;
    }

    state.latitude = Number(event.lngLat.lat.toFixed(3));
    state.longitude = Number(event.lngLat.lng.toFixed(3));
    clearSelectedPreset();
    invalidateIntensityEstimateCache();
    syncInputs();
    if (isFaultSimulationActive()) {
      updateSimulationFaultSource();
    }
    updateActiveEpicenterPopups(syncEpicenterMarkerPosition());
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
  const maintenanceBadge = null;
  const localServerBadge = null;
  const parentTerminalBadge = null;
  const feedbackOverlay = createFeedbackOverlay();
  document.body.append(
    feedbackOverlay,
    maintenanceOverlay,
  );
  setupMaintenanceMode(maintenanceOverlay, maintenanceBadge);

  const adminOverlay = createAdminModeOverlay();
  const sourceOverlay = createSourceInfoOverlay(adminOverlay);
  const speechConfirmOverlay = createSpeechConfirmOverlay();
  const pushConfirmOverlay = createPushConfirmOverlay();
  document.body.append(sourceOverlay, speechConfirmOverlay, pushConfirmOverlay, adminOverlay);
  setupMaintenanceLinks(maintenanceOverlay);

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
    <button class="source-info-close push-confirm-close" type="button" aria-label="戻る">‹</button>
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
        ...(communityAccount?.token && !communityAccount.localOnly
          ? { Authorization: `Bearer ${communityAccount.token}` }
          : {}),
      },
      body: JSON.stringify(subscription),
    });

    if (!saveResponse.ok) {
      throw new Error(`subscription save failed: ${saveResponse.status}`);
    }

    const savedSubscription = await saveResponse.json().catch(() => ({}));
    await savePushSubscriptionKey(registration, savedSubscription.key);
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

async function syncCommunityPushSubscriptionAccount(registration = null, subscription = null) {
  if (IS_LOCAL_DEV || !state.pushSubscribed || !("serviceWorker" in navigator)) {
    return;
  }
  const activeRegistration = registration || await navigator.serviceWorker.ready;
  const activeSubscription = subscription || await activeRegistration.pushManager?.getSubscription();
  if (!activeSubscription) {
    return;
  }
  const config = await loadPushConfig();
  const workerUrl = String(config.workerUrl || "").replace(/\/+$/, "");
  if (!workerUrl) {
    return;
  }
  const response = await fetch(`${workerUrl}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(communityAccount?.token && !communityAccount.localOnly
        ? { Authorization: `Bearer ${communityAccount.token}` }
        : {}),
    },
    body: JSON.stringify(activeSubscription),
  });
  if (!response.ok) {
    throw new Error(`subscription account sync failed: ${response.status}`);
  }
  const data = await response.json().catch(() => ({}));
  await savePushSubscriptionKey(activeRegistration, data.key);
}

async function savePushSubscriptionKey(registration, key) {
  if (!key) {
    return;
  }
  const readyRegistration = registration || await navigator.serviceWorker.ready;
  const worker = readyRegistration.active || readyRegistration.waiting || readyRegistration.installing;
  worker?.postMessage({ type: "set-push-subscription-key", key });
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
  status.textContent = "";

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

function createSourceInfoOverlay(adminOverlay) {
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
    closeOverlay();
    openSettingsFeedbackPage();
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
      <a href="#settings-menu-sheet" data-maintenance-settings-link>設定</a>
    </p>
  `;
}

function setupMaintenanceLinks(maintenanceOverlay) {
  maintenanceOverlay?.addEventListener("click", (event) => {
    const settingsLink = event.target?.closest?.("[data-maintenance-settings-link]");
    if (!settingsLink) {
      return;
    }

    event.preventDefault();
    allowMaintenanceSettingsAccess();
    document.querySelector("#bottom-settings-tab")?.click();
  });
}

function allowMaintenanceSettingsAccess() {
  const overlay = document.querySelector(".maintenance-mode-overlay");
  if (!overlay || !document.body.classList.contains("maintenance-screen-blocking")) {
    return;
  }
  overlay.dataset.settingsAccess = "true";
  overlay.classList.add("hidden");
}

function showMaintenanceBlockingScreen() {
  const overlay = document.querySelector(".maintenance-mode-overlay");
  if (!overlay || !document.body.classList.contains("maintenance-screen-blocking")) {
    return;
  }
  delete overlay.dataset.settingsAccess;
  overlay.classList.remove("hidden");
}

function openSettingsFeedbackPage() {
  document.querySelector("#bottom-settings-tab")?.click();
  requestAnimationFrame(() => {
    document.querySelector("#settings-feedback-button")?.click();
  });
}

function createMaintenanceReasonOverlay() {
  const overlay = document.createElement("section");
  overlay.className = "source-info-overlay maintenance-reason-overlay hidden";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "メンテナンス理由");
  overlay.innerHTML = `
    <button class="source-info-close maintenance-reason-cancel" type="button" aria-label="戻る">‹</button>
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
  overlay.setAttribute("aria-label", "管理者用設定");
  overlay.innerHTML = `
    <button class="source-info-close" type="button" aria-label="戻る">‹</button>
    <div class="admin-mode-dialog" id="admin-mode-form">
      <h2>管理者用設定</h2>
      <div class="admin-mode-actions">
        <button class="admin-mode-maintenance" id="admin-maintenance-toggle" type="button" disabled>メンテナンス開始</button>
      </div>
      <section class="admin-notification-panel" aria-label="通知送信">
        <h3>通知送信</h3>
        <label class="admin-mode-field">
          <span>タイトル</span>
          <input id="admin-notification-title" type="text" maxlength="80" placeholder="タイトルを入力" />
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
    </div>
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

    const token = communityAccount?.isAdmin ? "" : localStorage.getItem(ADMIN_PARENT_TOKEN_KEY);
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

    const token = communityAccount?.isAdmin ? "" : localStorage.getItem(ADMIN_PARENT_TOKEN_KEY);
    if (!token && !communityAccount?.isAdmin) {
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
    const embeddedReasonInput = overlay.querySelector("#admin-maintenance-reason");
    const maintenanceReason = nextMaintenance
      ? embeddedReasonInput
        ? normalizeMaintenanceReason(embeddedReasonInput.value)
        : await openMaintenanceReasonOverlay()
      : "";
    if (maintenanceReason === null) {
      setAdminMaintenanceActionPending(overlay, false);
      updateAdminModeControls(overlay, current);
      setAdminModeStatus(status, "メンテナンス開始をキャンセルしました。");
      return;
    }
    setAdminModeStatus(status, nextMaintenance ? "開始中..." : "終了中...");
    if (toggleButton) {
      toggleButton.disabled = true;
      toggleButton.textContent = nextMaintenance ? "開始中..." : "終了中...";
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
    const savedStatus = await fetchMaintenanceStatus();
    if (savedStatus.ok === false || Boolean(savedStatus.maintenance) !== nextMaintenance) {
      updateAdminModeControls(overlay, current);
      setAdminModeStatus(status, savedStatus.message || "メンテナンス状態を保存できませんでした。", true);
      return;
    }
    const confirmedMaintenance = Boolean(savedStatus.maintenance);
    const confirmedReason = confirmedMaintenance
      ? extractMaintenanceReason(result) || maintenanceReason
      : "";
    updateAdminModeControls(overlay, { maintenance: confirmedMaintenance, reason: confirmedReason });
    notifyMaintenanceStatusChange({ maintenance: confirmedMaintenance, reason: confirmedReason });
    setAdminModeStatus(status, confirmedMaintenance ? "メンテナンスを開始しました。" : "メンテナンスを終了しました。");
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
  const canSend = isLocalDevelopmentHost() || Boolean(communityAccount?.isAdmin);

  if (!canSend) {
    setAdminNotificationStatus(status, "Localサーバーまたは親端末でのみ送信できます。", true);
    return;
  }

  const title = String(titleInput?.value || "").trim().slice(0, 80);
  const body = String(bodyInput?.value || "").trim().slice(0, 300);
  if (!title) {
    setAdminNotificationStatus(status, "タイトルを入力してください。", true);
    titleInput?.focus();
    return;
  }
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
  const accountAdminToken = communityAccount?.isAdmin && communityAccount?.token && !communityAccount.localOnly
    ? communityAccount.token
    : "";

  if (!workerUrl) {
    return { ok: false, message: "Cloudflare Worker URLが未設定です。" };
  }

  if (!token && !accountAdminToken) {
    return { ok: false, message: "通知送信用トークンを入力してください。" };
  }

  const response = await fetch(`${workerUrl}/notify`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accountAdminToken || token}`,
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

  const isLocalServer = isLocalDevelopmentHost();
  const isAdminAccount = Boolean(communityAccount?.isAdmin);
  const panel = overlay.querySelector(".admin-notification-panel");
  const tokenField = overlay.querySelector(".admin-notification-token-field");
  const button = overlay.querySelector("#admin-notification-send");
  const pending = isAdminNotificationActionPending(overlay);
  const canShowNotificationPanel = isLocalServer || isAdminAccount;

  panel?.classList.toggle("hidden", !canShowNotificationPanel);
  tokenField?.classList.toggle("hidden", isLocalServer || isAdminAccount);
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

  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY)) || Boolean(communityAccount?.isAdmin);
  const isAdminAccount = Boolean(communityAccount?.isAdmin);
  const passwordInput = overlay.querySelector("#admin-mode-password");
  const loginButton = overlay.querySelector(".admin-mode-login");
  const toggleButton = overlay.querySelector("#admin-maintenance-toggle");
  updateAdminNotificationControls(overlay);
  if (isLocalDevelopmentHost() && !isAdminAccount) {
    if (passwordInput) {
      passwordInput.disabled = true;
    }
    if (loginButton) {
      loginButton.disabled = true;
      loginButton.textContent = LOCAL_PARENT_UNAVAILABLE_LABEL;
    }
    if (toggleButton) {
      toggleButton.disabled = true;
      toggleButton.textContent = "メンテナンス開始";
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
      toggleButton.textContent = "メンテナンス開始";
    } else if (maintenanceStatus && typeof maintenanceStatus.maintenance === "boolean") {
      toggleButton.textContent = maintenanceStatus.maintenance ? "メンテナンス終了" : "メンテナンス開始";
    } else {
      toggleButton.textContent = "確認中...";
      toggleButton.disabled = true;
      setAdminPasswordInputUnavailable(passwordInput);
      fetchMaintenanceStatus().then((status) => {
        const isStillParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY))
          || Boolean(communityAccount?.isAdmin);
        if (!isStillParentTerminal) {
          toggleButton.textContent = "メンテナンス開始";
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
        toggleButton.textContent = status.maintenance ? "メンテナンス終了" : "メンテナンス開始";
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

  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY)) || Boolean(communityAccount?.isAdmin);
  badge.textContent = maintenanceStatus?.maintenance ? "親端末／メンテナンスモード" : "親端末";
  badge.classList.toggle("hidden", !isParentTerminal || isLocalDevelopmentHost());
}

function updateMaintenanceStateIndicators(overlay, badge, status) {
  latestMaintenanceStatus = {
    maintenance: Boolean(status?.maintenance),
    reason: extractMaintenanceReason(status),
  };
  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY)) || Boolean(communityAccount?.isAdmin);
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
    const settingsAccessActive =
      overlay.dataset.settingsAccess === "true" &&
      document.body.dataset.activeBottomTab === "bottom-settings-tab" &&
      !document.querySelector("#settings-menu-sheet")?.classList.contains("hidden");
    overlay.classList.toggle(
      "hidden",
      !status.maintenance || isMaintenanceExemptTerminal || settingsAccessActive,
    );
    if (!status.maintenance || isMaintenanceExemptTerminal) {
      delete overlay.dataset.settingsAccess;
    }
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
  try {
    const isLocalServer = isLocalDevelopmentHost();
    const workerUrl = isLocalServer ? "" : await getWorkerBaseUrl();
    if (!isLocalServer && !workerUrl) {
      return { ok: false, maintenance: false, message: "Cloudflare Worker URLが未設定です。" };
    }
    const url = isLocalServer
      ? `/api/maintenance-status?ts=${Date.now()}`
      : `${workerUrl}/maintenance-status?ts=${Date.now()}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        ok: false,
        maintenance: false,
        message: data.message || data.error || `状態確認に失敗しました（${response.status}）。`,
      };
    }
    const data = await response.json();
    return {
      ok: data.ok !== false,
      maintenance: Boolean(data.maintenance),
      reason: extractMaintenanceReason(data),
    };
  } catch (error) {
    console.warn(error);
    return { ok: false, maintenance: false, message: "メンテナンス状態を確認できませんでした。" };
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
    const isLocalServer = isLocalDevelopmentHost();
    const workerUrl = isLocalServer ? "" : await getWorkerBaseUrl();
    if (!isLocalServer && !workerUrl) {
      return { ok: false, message: "Cloudflare Worker URLが未設定です。" };
    }

    const headers = { "Content-Type": "application/json; charset=utf-8" };
    if (communityAccount?.isAdmin && communityAccount?.token && !communityAccount.localOnly) {
      headers.Authorization = `Bearer ${communityAccount.token}`;
    }
    const response = await fetch(isLocalServer ? "/api/maintenance-action" : `${workerUrl}/maintenance-action`, {
      method: "POST",
      headers,
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
    const ok = response.ok && data.ok !== false;
    const localAdminAuthMessage = isLocalServer && data.invalidParentToken
      ? "Workerが管理用TOKENを認証できませんでした。Worker secretの一致とWorkerの再デプロイを確認してください。"
      : "";
    return {
      ...data,
      ok,
      message: localAdminAuthMessage
        || data.message
        || data.error
        || (!ok ? `メンテナンスの切り替えに失敗しました（HTTP ${response.status}）` : ""),
    };
  } catch (error) {
    console.warn(error);
    return {
      ok: false,
      message: "メンテナンス用サーバーに接続できませんでした。開発サーバーを再起動してからお試しください。",
    };
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
  return "例：◯◯の機能を追加してほしい";
}

function getCleanFeedbackPlaceholderText() {
  return "例：◯◯の機能を追加してほしい";
}

function buildFeedbackOverlayHtml() {
  return `
    <button class="source-info-close" type="button" aria-label="戻る">‹</button>
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
    <button class="source-info-close" type="button" aria-label="戻る">‹</button>
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
      <button class="source-admin-mode-button" type="button">管理者用設定</button>
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
        <p>本サイトに関する問い合わせは、<br /><a href="mailto:akurah3000@icloud.com">akurah3000@icloud.com</a> または <a href="#settings-feedback-panel" data-feedback-link>フィードバック</a> までご連絡ください。</p>
      </section>
    </div>
  `;
}

function buildAcknowledgementsHtml() {
  return `
    <div class="source-info-sections acknowledgements-sections">
      <section class="source-info-section acknowledgements-intro">
        <h3>WE-Simulatorを支えてくださる皆さまへ</h3>
        <p>WE-Simulatorは、多くの公的機関、研究機関、オープンデータ提供者、オープンソース開発者、そして利用者の皆さまが公開・提供してくださった知見と技術によって成り立っています。ここに深い感謝を表します。</p>
      </section>
      <section class="source-info-section">
        <h3>気象・地震情報</h3>
        <p>地震情報、震度階級、震央地名、緊急地震速報、警報・注意報、津波情報、予報区・細分区域、震度観測点などの基礎資料を公開している気象庁に感謝いたします。防災情報を分かりやすく、継続的に公開されていることが、本シミュレーターの表示と学習機能の土台となっています。</p>
      </section>
      <section class="source-info-section">
        <h3>気象予報士試験資料</h3>
        <p>気象予報士試験の問題・解答例などを公開している気象業務支援センターに感謝いたします。学習機能では公開資料の出題分野を参考にしながら、独自に再構成した練習問題を提供しています。</p>
      </section>
      <section class="source-info-section">
        <h3>地理・行政区域データ</h3>
        <p>国土数値情報を整備・公開している国土交通省をはじめ、行政区域や地理情報の維持に携わる皆さまに感謝いたします。地図上の地域表示、検索、集計機能の実現に欠かせない資料として活用しています。</p>
      </section>
      <section class="source-info-section">
        <h3>地盤・観測網・防災研究</h3>
        <p>J-SHIS、S-netをはじめとする地震防災関連の研究成果・観測情報を公開している防災科学技術研究所および関係機関の皆さまに感謝いたします。地盤特性、揺れやすさ、海底観測点の理解と表現において重要な知見をいただいています。</p>
      </section>
      <section class="source-info-section">
        <h3>世界地図・背景地図</h3>
        <p>Natural Earthの貢献者、OpenStreetMapのマッパーとコミュニティ、CARTOおよび地図タイルの提供に関わる皆さまに感謝いたします。世界中の継続的な編集・整備活動によって、地域の位置関係を直感的に把握できる地図表示が可能になっています。</p>
      </section>
      <section class="source-info-section">
        <h3>プレート境界資料</h3>
        <p>PB2002 Plate Boundariesデータを公開したPeter Bird氏、データを利用しやすい形で提供するfraxen/tectonicplatesの貢献者の皆さまに感謝いたします。日本周辺のプレート境界を学ぶための重要な資料として利用しています。</p>
      </section>
      <section class="source-info-section">
        <h3>地図描画とデータ配信技術</h3>
        <p>MapLibre GL JS、PMTilesおよび関連するオープンソースプロジェクトの開発者・コントリビューターの皆さまに感謝いたします。滑らかな地図操作、大規模な地理データの配信、複数レイヤーの表現は、これらの技術と継続的な改善によって支えられています。</p>
      </section>
      <section class="source-info-section">
        <h3>Web基盤と公開環境</h3>
        <p>GitHubおよびGitHub Pages、Cloudflare Workers・D1・KV・R2、Google Apps Scriptなど、開発・公開・データ保存・通知・フィードバック受付を支えるサービスと、その運用に携わる皆さまに感謝いたします。</p>
      </section>
      <section class="source-info-section">
        <h3>オープンソースコミュニティ</h3>
        <p>JavaScript、Web API、ブラウザ、地理情報処理、アクセシビリティ、PWAなどの技術を育ててきた世界中の開発者と標準化活動に感謝いたします。公開されたドキュメント、実装例、問題報告、修正の積み重ねが本アプリの開発を可能にしています。</p>
      </section>
      <section class="source-info-section">
        <h3>表示・操作設計への示唆</h3>
        <p>MeteoScopeをはじめ、気象・地震情報を見やすく伝えるための公開プロジェクトや先行事例に感謝いたします。情報の優先順位、地図レイヤー、配色、モバイルでの操作性を考えるうえで多くの示唆をいただきました。</p>
      </section>
      <section class="source-info-section">
        <h3>テストと改善への協力</h3>
        <p>日々アプリを利用し、表示の違和感、不具合、分かりにくい表現、端末ごとの差異を知らせてくださる皆さまに心より感謝いたします。一つひとつの報告と提案が、ライト・ダーク両外観、スマートフォン、タブレット、パソコンでの継続的な改善につながっています。</p>
      </section>
      <section class="source-info-section">
        <h3>防災に携わるすべての方へ</h3>
        <p>観測、研究、予報、報道、自治体対応、教育、地域防災、設備保守など、災害から命と暮らしを守る活動に携わるすべての方へ敬意と感謝を表します。本アプリが、地震や気象を学び、備えを考える小さなきっかけとなることを願っています。</p>
      </section>
      <section class="source-info-section">
        <h3>利用者の皆さまへ</h3>
        <p>WE-Simulatorを見つけ、触れ、学習や確認に使ってくださる皆さま、本当にありがとうございます。これからも正確さ、分かりやすさ、使いやすさを大切にしながら改善を続けていきます。</p>
      </section>
    </div>
    <div class="acknowledgements-brand" aria-label="WE-Simulator">
      <img src="./icon-192.png" alt="WE-Simulator アイコン" />
      <span>WE-Simulator</span>
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
  addVectorTileSource("japan-pmtiles", {
    url: getJapanPmtilesProtocolUrl(),
    minzoom: 0,
    maxzoom: 14,
    attribution: "JMA / National Land Numerical Information",
  });
  addGeoJsonSource("jma-local-areas", emptyFeatureCollection());
  addGeoJsonSource("jma-intensity-areas", emptyFeatureCollection());
  addGeoJsonSource("history-epicenter-areas", emptyFeatureCollection());
  addGeoJsonSource("plate-boundaries", emptyFeatureCollection());
  addGeoJsonSource("active-faults", emptyFeatureCollection());
  addGeoJsonSource("simulation-fault-source", emptyFeatureCollection());
  addGeoJsonSource("submarine-observation-points", emptyFeatureCollection());
  addGeoJsonSource("shindo-stations", emptyFeatureCollection());
  addGeoJsonSource("p-wave", emptyFeatureCollection());
  addGeoJsonSource("s-wave", emptyFeatureCollection());

  addMapLayers();
  setupStationHoverPopup();
  keepWaveAndStationLayerOrder();
  // 地図本体と並行して細分区域線を読み込み、起動後の遅れて現れる状態を短縮する。
  hydrateStartupLocalAreaBoundaries().catch((error) => console.warn(error));
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
  window.setTimeout(() => {
    hydrateDeferredSimulationMapData().catch((error) => console.warn(error));
  }, SIMULATION_DEFERRED_DATA_DELAY_MS);
  scheduleDeferredTask(() => scheduleLocationResolve(), 1200, 3200);
  updateSimulationAvailability();
  schedulePostMunicipalityDataHydration();
}

function prefetchSimulationMapData() {
  loadLocalAreas().catch((error) => console.warn("JMA local area prefetch unavailable", error));
  loadShindoStations().catch((error) => console.warn("JMA shindo station prefetch unavailable", error));
  loadEewForecastAreas().catch((error) => console.warn("JMA EEW area prefetch unavailable", error));
  loadGroundModel().catch((error) => console.warn("J-SHIS ground model prefetch unavailable", error));
}

async function hydrateStartupLocalAreaBoundaries() {
  const localAreas = await loadOptionalGeoJsonData(loadLocalAreas, "JMA local area GeoJSON");
  localAreaData = localAreas;
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
    municipalityBoundaries,
  ] = await Promise.all([
    loadOptionalGeoJsonData(loadSurroundingLand, "Surrounding land GeoJSON"),
    loadOptionalGeoJsonData(loadMunicipalityBoundaries, "Municipality boundary GeoJSON"),
  ]);

  setGeoJsonSourceData("surrounding-land", filterSurroundingLandForDisplay(surroundingLand));
  applyMunicipalityLogicData(municipalityBoundaries, { refreshDerivedState: false });
  keepWaveAndStationLayerOrder();
}

async function hydrateDeferredSimulationMapData() {
  const [localAreas, shindoStations, eewForecastAreas, loadedGroundModel] = await Promise.all([
    loadOptionalGeoJsonData(loadLocalAreas, "JMA local area GeoJSON"),
    loadOptionalStationData(loadShindoStations, "JMA shindo stations"),
    loadEewForecastAreas().catch((error) => {
      console.warn("JMA EEW forecast area mapping unavailable; falling back to local rules", error);
      return null;
    }),
    loadGroundModel().catch((error) => {
      console.warn("J-SHIS ground model unavailable; falling back to the base intensity estimate", error);
      return null;
    }),
  ]);
  const hasShindoStationData = Array.isArray(shindoStations?.stations) && shindoStations.stations.length > 0;

  localAreaData = localAreas;
  shindoStationData = hasShindoStationData ? shindoStations : null;
  eewForecastAreaData = eewForecastAreas;
  groundModelData = loadedGroundModel;
  eewForecastAreaNameCache.clear();
  invalidateIntensityEstimateCache();
  if (shouldSyncAreaSourceData() && hasShindoStationData) {
    const finalizedAreaData = buildIntensityAreaData(localAreaData, Infinity);
    ensureStaticIntensityAreaSource(finalizedAreaData);
    visibleAreaDataSyncBucket = toSimulationBucket(Infinity);
  }
  await waitForStartupMapSourcePaint("jma-intensity-areas");
  await yieldStartupHydrationFrame();

  if (state.showStationLayer) {
    setGeoJsonSourceData(
      "shindo-stations",
      hasShindoStationData ? buildStationIntensityData(shindoStations, Infinity) : emptyFeatureCollection(),
    );
  }
  await yieldStartupHydrationFrame();

  updateSetupResultOutputs();
  updateSimulationAvailability();
  await yieldStartupHydrationFrame();
  updateIntensityLayer();
}

function waitForStartupMapSourcePaint(sourceId, timeoutMs = 1200) {
  if (!map?.getSource(sourceId)) {
    return Promise.resolve();
  }
  try {
    if (map.isSourceLoaded?.(sourceId)) {
      return Promise.resolve();
    }
  } catch (_error) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      map?.off?.("sourcedata", handleSourceData);
      window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
    };
    const handleSourceData = (event) => {
      if (event.sourceId === sourceId && event.isSourceLoaded) {
        finish();
      }
    };
    const timeoutId = window.setTimeout(finish, timeoutMs);
    map.on("sourcedata", handleSourceData);
  });
}

function yieldStartupHydrationFrame() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => window.setTimeout(resolve, 0));
  });
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

  if (id === "shindo-stations" && stationSourceInputDataRef === data) {
    return false;
  }
  if (id !== "shindo-stations" && sourceDataRefs.get(id) === data) {
    return false;
  }

  const sourceData = id === "shindo-stations" ? buildStationRenderData(data) : data;
  source.setData(sourceData);
  sourceDataRefs.set(id, sourceData);
  if (id === "shindo-stations") {
    stationSourceInputDataRef = data;
    scheduleStationCanvasRender();
    updateActiveStationPopups(sourceData);
  }
  if (id === "submarine-observation-points") {
    submarineStationCanvasFeatureCache = { data: null, features: [] };
    scheduleStationCanvasRender();
    updateActiveStationPopups(data);
  }
  return true;
}

function buildStationRenderData(data) {
  stationFeatureDetailById.clear();
  const features = (data?.features ?? []).map((feature) => {
    const properties = feature.properties ?? {};
    const id = String(properties.id ?? "");
    stationFeatureDetailById.set(id, properties);
    return {
      type: "Feature",
      id,
      geometry: feature.geometry,
      properties: {
        id,
        intensityColor: properties.intensityColor,
        intensityTextColor: properties.intensityTextColor,
        intensityRank: properties.intensityRank,
        intensityLabel: properties.intensityLabel,
        intensityShortLabel: properties.intensityShortLabel,
        stationDisplaySortKey: properties.stationDisplaySortKey,
      },
    };
  });
  return {
    type: "FeatureCollection",
    features,
  };
}

function shouldSyncAreaSourceData() {
  return state.showRegionLayer || state.showEewWarningLayer;
}

function getIntensityAreaFeatureId(feature, index) {
  return index;
}

function ensureStaticIntensityAreaSource(initialAreaData = localAreaData) {
  if (!map?.getSource("jma-intensity-areas") || !localAreaData?.features?.length || staticIntensityAreaDataRef === localAreaData) {
    return;
  }
  const sourceAreaData = initialAreaData?.features?.length ? initialAreaData : localAreaData;
  const data = {
    type: "FeatureCollection",
    features: sourceAreaData.features.map((feature, index) => ({
      ...feature,
      id: getIntensityAreaFeatureId(feature, index),
    })),
  };
  pendingIntensityAreaFeatureStateData = sourceAreaData;
  setGeoJsonSourceData("jma-intensity-areas", data);
  staticIntensityAreaDataRef = localAreaData;
  intensityAreaFeatureStateSignatures.clear();
  let featureStatesApplied = false;
  const reapplyFeatureStates = () => {
    if (featureStatesApplied || !pendingIntensityAreaFeatureStateData) {
      return;
    }
    try {
      if (!map.isSourceLoaded?.("jma-intensity-areas")) {
        return;
      }
    } catch (_error) {
      return;
    }
    featureStatesApplied = true;
    map.off("sourcedata", reapplyWhenSourceReady);
    intensityAreaFeatureStateSignatures.clear();
    applyIntensityAreaFeatureStates(pendingIntensityAreaFeatureStateData, { force: true });
    updateEewReplacementMode();
  };
  const reapplyWhenSourceReady = (event) => {
    if (event.sourceId !== "jma-intensity-areas" || !event.isSourceLoaded) {
      return;
    }
    reapplyFeatureStates();
  };
  map.on("sourcedata", reapplyWhenSourceReady);
  map.once("idle", reapplyFeatureStates);
  window.requestAnimationFrame(() => window.requestAnimationFrame(reapplyFeatureStates));
}

function applyIntensityAreaFeatureStates(data, options = {}) {
  pendingIntensityAreaFeatureStateData = data;
  ensureStaticIntensityAreaSource();
  if (!map?.getSource("jma-intensity-areas")) {
    return false;
  }
  let updated = false;
  (data?.features ?? []).forEach((feature, index) => {
    const properties = feature.properties ?? {};
    const id = getIntensityAreaFeatureId(feature, index);
    const featureState = {
      intensityColor: properties.intensityColor ?? "rgba(255, 255, 255, 0)",
      intensityBoundaryColor: properties.intensityBoundaryColor ?? INTENSITY_BOUNDARY_DARK,
      intensityRank: Number(properties.intensityRank ?? 0),
      eewWarning: properties.eewWarning === true,
      eewBlinkOff: properties.eewBlinkOff === true,
    };
    const signature = `${featureState.intensityColor}|${featureState.intensityBoundaryColor}|${featureState.intensityRank}|${featureState.eewWarning ? 1 : 0}|${featureState.eewBlinkOff ? 1 : 0}`;
    if (!options.force && intensityAreaFeatureStateSignatures.get(id) === signature) {
      return;
    }
    map.setFeatureState({ source: "jma-intensity-areas", id }, featureState);
    intensityAreaFeatureStateSignatures.set(id, signature);
    updated = true;
  });
  return updated;
}

function syncVisibleAreaSourceData(elapsedSec = getSimulationStationElapsedSec()) {
  if (!shouldSyncAreaSourceData() || !map?.getSource("jma-local-areas") || !localAreaData || !shindoStationData) {
    return false;
  }

  const bucket = toSimulationBucket(elapsedSec);
  if (visibleAreaDataSyncBucket === bucket) {
    return false;
  }

  const historyMode = document.body.dataset.activeBottomTab === "bottom-history-tab";
  const nextAreaData = historyMode
    ? buildHistoryLocalAreaMapData(elapsedSec)
    : buildIntensityAreaData(localAreaData, elapsedSec);
  const updated = historyMode
    ? setGeoJsonSourceData("jma-local-areas", nextAreaData)
    : applyIntensityAreaFeatureStates(nextAreaData);
  visibleAreaDataSyncBucket = bucket;
  return updated;
}

function addMapLayers() {
  ensureStationCanvasOverlay();
  ensureStationIntensityLabelImages();

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
      "fill-color": "#e5e9ee",
      "fill-outline-color": "#b7c0ca",
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
      "line-color": "#b7c0ca",
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
      "fill-color": "#eef1f4",
      "fill-outline-color": "rgba(174, 184, 195, 0)",
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
      "line-color": "#eef1f4",
      "line-opacity": 1,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 2.1, 7, 1.45, 10, 0.8, 12, 0.55],
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
    id: "simulation-fault-area-fill",
    type: "fill",
    source: "simulation-fault-source",
    filter: ["==", ["get", "kind"], "fault-area"],
    paint: {
      "fill-color": "#fb7185",
      "fill-opacity": 0.3,
    },
  });
  updateLayerVisibility("simulation-fault-area-fill", shouldDisplaySimulationFaultLayer() && isFaultAreaActive());

  addLayerIfMissing({
    id: "simulation-fault-area-outline",
    type: "line",
    source: "simulation-fault-source",
    filter: ["==", ["get", "kind"], "fault-area"],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#9f1239",
      "line-opacity": 0.95,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1.8, 8, 3.2],
    },
  });
  updateLayerVisibility("simulation-fault-area-outline", shouldDisplaySimulationFaultLayer() && isFaultAreaActive());

  addLayerIfMissing({
    id: "simulation-fault-rupture-fill",
    type: "fill",
    source: "simulation-fault-source",
    filter: ["==", ["get", "kind"], "fault-rupture"],
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "progress"],
        0,
        "#fb923c",
        1,
        "#e11d48",
      ],
      "fill-opacity": 0.82,
    },
  });
  updateLayerVisibility("simulation-fault-rupture-fill", shouldDisplaySimulationFaultLayer() && isFaultAreaActive());

  addLayerIfMissing({
    id: "simulation-fault-line-casing",
    type: "line",
    source: "simulation-fault-source",
    filter: ["==", ["geometry-type"], "LineString"],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#4c0519",
      "line-opacity": 0.9,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 5.6, 7, 8.2, 10, 10.4],
    },
  });
  updateLayerVisibility(
    "simulation-fault-line-casing",
    shouldDisplaySimulationFaultLayer() && !isFaultAreaActive(),
  );

  addLayerIfMissing({
    id: "simulation-fault-line",
    type: "line",
    source: "simulation-fault-source",
    filter: ["==", ["geometry-type"], "LineString"],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#ff315c",
      "line-opacity": 1,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 3.2, 7, 5.4, 10, 7.2],
    },
  });
  updateLayerVisibility("simulation-fault-line", shouldDisplaySimulationFaultLayer() && !isFaultAreaActive());

  addLayerIfMissing({
    id: "simulation-fault-endpoints",
    type: "circle",
    source: "simulation-fault-source",
    filter: ["==", ["get", "kind"], "rupture-end"],
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 5, 8, 7],
      "circle-color": "#ffffff",
      "circle-opacity": 0.96,
      "circle-stroke-color": "#e11d48",
      "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 4, 2, 8, 2.8],
    },
  });
  updateLayerVisibility(
    "simulation-fault-endpoints",
    shouldDisplaySimulationFaultLayer() && !isFaultAreaActive(),
  );

  addLayerIfMissing({
    id: "jma-intensity-fill",
    type: "fill",
    source: "jma-intensity-areas",
    paint: {
      "fill-color": [
        "coalesce",
        ["feature-state", "intensityColor"],
        ["get", "intensityColor"],
        "rgba(255, 255, 255, 0)",
      ],
      "fill-color-transition": {
        duration: 0,
        delay: 0,
      },
      "fill-opacity": [
        "case",
        ["<=", ["coalesce", ["feature-state", "intensityRank"], ["get", "intensityRank"], 0], 0],
        0,
        [
          "interpolate",
          ["linear"],
          ["coalesce", ["feature-state", "intensityRank"], ["get", "intensityRank"], 0],
          1,
          0.54,
          2,
          0.72,
          9,
          0.94,
        ],
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
    source: "jma-intensity-areas",
    paint: {
      "fill-color": [
        "case",
        ["==", ["coalesce", ["feature-state", "eewBlinkOff"], ["get", "eewBlinkOff"], false], true],
        "#eef1f4",
        "#e60012",
      ],
      "fill-opacity": [
        "case",
        ["!=", ["coalesce", ["feature-state", "eewWarning"], ["get", "eewWarning"], false], true],
        0,
        ["==", ["coalesce", ["feature-state", "eewBlinkOff"], ["get", "eewBlinkOff"], false], true],
        1,
        0.94,
      ],
    },
  });
  updateLayerVisibility("eew-warning-fill", state.showEewWarningLayer);

  addLayerIfMissing({
    id: "jma-local-area-boundaries",
    type: "line",
    source: "jma-intensity-areas",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#aab3bd",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.42, 7, 0.68, 10, 0.9],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 4, 0.52, 7, 0.68, 10, 0.8],
    },
  });

  addLayerIfMissing({
    id: "jma-intensity-area-boundaries",
    type: "line",
    source: "jma-intensity-areas",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": INTENSITY_BOUNDARY_DARK,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.72, 7, 1.02, 10, 1.28],
      "line-opacity": [
        "case",
        [
          "all",
          [
            ">",
            ["coalesce", ["feature-state", "intensityRank"], ["get", "intensityRank"], 0],
            0,
          ],
          [
            "==",
            [
              "coalesce",
              ["feature-state", "intensityBoundaryColor"],
              ["get", "intensityBoundaryColor"],
              INTENSITY_BOUNDARY_DARK,
            ],
            INTENSITY_BOUNDARY_DARK,
          ],
        ],
        0.94,
        0,
      ],
    },
  });
  updateLayerVisibility("jma-intensity-area-boundaries", state.showRegionLayer);

  addLayerIfMissing({
    id: "jma-intensity-area-boundaries-light",
    type: "line",
    source: "jma-intensity-areas",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": INTENSITY_BOUNDARY_LIGHT,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.72, 7, 1.02, 10, 1.28],
      "line-opacity": [
        "case",
        [
          "all",
          [
            ">",
            ["coalesce", ["feature-state", "intensityRank"], ["get", "intensityRank"], 0],
            0,
          ],
          [
            "==",
            [
              "coalesce",
              ["feature-state", "intensityBoundaryColor"],
              ["get", "intensityBoundaryColor"],
              INTENSITY_BOUNDARY_DARK,
            ],
            INTENSITY_BOUNDARY_LIGHT,
          ],
        ],
        0.94,
        0,
      ],
    },
  });
  updateLayerVisibility("jma-intensity-area-boundaries-light", state.showRegionLayer);

  addLayerIfMissing({
    id: "jma-eew-warning-boundaries",
    type: "line",
    source: "jma-intensity-areas",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.78, 7, 1.08, 10, 1.34],
      "line-opacity": [
        "case",
        [
          "all",
          [
            "==",
            ["coalesce", ["feature-state", "eewWarning"], ["get", "eewWarning"], false],
            true,
          ],
          [
            "!=",
            ["coalesce", ["feature-state", "eewBlinkOff"], ["get", "eewBlinkOff"], false],
            true,
          ],
        ],
        1,
        0,
      ],
    },
  });
  updateLayerVisibility("jma-eew-warning-boundaries", state.showEewWarningLayer);

  addLayerIfMissing({
    id: "submarine-observation-fill",
    type: "circle",
    source: "submarine-observation-points",
    paint: {
      "circle-color": "#000000",
      "circle-opacity": 0.001,
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 4.6, 6, 5.8, 8, 7.2],
      "circle-stroke-opacity": 0,
    },
  });
  updateLayerVisibility("submarine-observation-fill", state.showSubmarineStationLayer);

  addLayerIfMissing({
    id: "shindo-station-points",
    type: "circle",
    source: "shindo-stations",
    layout: {
      "circle-sort-key": ["get", "stationDisplaySortKey"],
    },
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 4.6, 6, 5.8, 8, 7.2],
      "circle-color": ["coalesce", ["get", "intensityColor"], INTENSITY_INFORMATION_GRAY],
      "circle-opacity": 1,
      "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 4, 0.8, 8, 1.2],
      "circle-stroke-color": "#000000",
      "circle-stroke-opacity": 1,
      "circle-color-transition": { duration: 0, delay: 0 },
      "circle-radius-transition": { duration: 0, delay: 0 },
    },
  });
  updateLayerVisibility("shindo-station-points", state.showStationLayer);

  addLayerIfMissing({
    id: "shindo-station-points-light-outline",
    type: "circle",
    source: "shindo-stations",
    layout: {
      "circle-sort-key": ["get", "stationDisplaySortKey"],
    },
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 4.6, 6, 5.8, 8, 7.2],
      "circle-color": "rgba(255, 255, 255, 0)",
      "circle-opacity": 0,
      "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 4, 0.8, 8, 1.2],
      "circle-stroke-color": INTENSITY_BOUNDARY_LIGHT,
      "circle-stroke-opacity": 0,
    },
  });
  updateLayerVisibility("shindo-station-points-light-outline", state.showStationLayer);

  addLayerIfMissing({
    id: "shindo-station-labels",
    type: "symbol",
    source: "shindo-stations",
    minzoom: SIMULATION_MAP_MAX_ZOOM - 0.1,
    layout: {
      "icon-image": ["concat", "station-intensity-label-", ["get", "intensityShortLabel"]],
      "icon-size": 1,
      "icon-anchor": "center",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-padding": 0,
      "symbol-sort-key": ["get", "stationDisplaySortKey"],
    },
    paint: {
      "icon-opacity": ["case", [">=", ["zoom"], SIMULATION_MAP_MAX_ZOOM - 0.1], 1, 0],
      "icon-opacity-transition": { duration: 0, delay: 0 },
    },
  });
  updateLayerVisibility("shindo-station-labels", state.showStationLayer);

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
  applySimulationWhiteMapStyle(isResolvedAppearanceLight());
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

function ensureStationIntensityLabelImages(options = {}) {
  if (!map?.addImage || !map?.hasImage || !map.isStyleLoaded?.()) {
    return;
  }
  const labelClasses = new Map(INTENSITY_CLASSES.map((intensityClass) => [
    intensityClass.shortLabel,
    intensityClass,
  ]));
  labelClasses.set("5", INTENSITY_CLASSES.find((item) => item.rank === 5) ?? INTENSITY_CLASSES[5]);
  labelClasses.set("6", INTENSITY_CLASSES.find((item) => item.rank === 7) ?? INTENSITY_CLASSES[7]);

  labelClasses.forEach((intensityClass, label) => {
    const imageId = `station-intensity-label-${label}`;
    const imageData = createStationIntensityLabelImage(label, intensityClass?.textColor ?? "#1f2937");
    if (map.hasImage(imageId)) {
      if (options.refresh && map.updateImage) {
        map.updateImage(imageId, imageData);
      }
      return;
    }
    map.addImage(imageId, imageData, { pixelRatio: 2 });
  });
}

function createStationIntensityLabelImage(label, textColor) {
  const canvas = document.createElement("canvas");
  const size = 28;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  const text = String(label ?? "");
  const fontSize = text.length > 1 ? 15 : 18;
  context.clearRect(0, 0, size, size);
  context.font = `800 ${fontSize}px "Segoe UI", "Arial", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";
  context.lineWidth = 1.25;
  context.strokeStyle = textColor.toLowerCase() === "#ffffff"
    ? "rgba(0, 0, 0, 0.34)"
    : "rgba(255, 255, 255, 0.48)";
  context.fillStyle = textColor;
  context.strokeText(text, size / 2, size / 2 + 0.5);
  context.fillText(text, size / 2, size / 2 + 0.5);
  return context.getImageData(0, 0, size, size);
}

function moveLayerToTop(layerId) {
  if (map?.getLayer(layerId)) {
    map.moveLayer(layerId);
  }
}

function keepWaveAndStationLayerOrder() {
  moveLayerToTop("jma-local-area-boundaries");
  moveLayerToTop("jma-intensity-area-boundaries");
  moveLayerToTop("jma-intensity-area-boundaries-light");
  moveLayerToTop("jma-eew-warning-boundaries");
  moveLayerToTop("active-fault-lines");
  moveLayerToTop("simulation-fault-area-fill");
  moveLayerToTop("simulation-fault-rupture-fill");
  moveLayerToTop("simulation-fault-area-outline");
  moveLayerToTop("p-wave-fill");
  moveLayerToTop("s-wave-fill");
  moveLayerToTop("simulation-fault-line-casing");
  moveLayerToTop("simulation-fault-line");
  moveLayerToTop("submarine-observation-fill");
  moveLayerToTop("shindo-station-points");
  moveLayerToTop("shindo-station-points-light-outline");
  moveLayerToTop("shindo-station-labels");
  moveLayerToTop("p-wave-line");
  moveLayerToTop("s-wave-line");
  moveLayerToTop("simulation-fault-endpoints");
}

function updateLayerVisibility(layerId, visible) {
  if (map?.getLayer(layerId)) {
    map.setLayoutProperty(layerId, "visibility", visible ? "visible" : "none");
  }
  if (layerId === "shindo-station-points" && map?.getLayer("shindo-station-labels")) {
    map.setLayoutProperty("shindo-station-labels", "visibility", visible ? "visible" : "none");
  }
  if (layerId === "shindo-station-points" && map?.getLayer("shindo-station-points-light-outline")) {
    map.setLayoutProperty("shindo-station-points-light-outline", "visibility", visible ? "visible" : "none");
  }
  if (layerId === "shindo-station-points" || layerId === "submarine-observation-fill") {
    scheduleStationCanvasRender();
  }
}

function applySimulationWhiteMapStyle(enabled) {
  if (!map) {
    return;
  }
  const setPaint = (layerId, property, value) => {
    if (map.getLayer(layerId)) {
      map.setPaintProperty(layerId, property, value);
    }
  };
  const whiteMap = Boolean(enabled);
  setPaint("sea-background", "background-color", whiteMap ? "#dbe8f0" : "#050914");
  setPaint(
    "surrounding-land-fill",
    "fill-color",
    whiteMap
      ? "#e5e9ee"
      : ["case", ["==", ["get", "territoryType"], "northern-territories"], "#202833", "#111821"],
  );
  setPaint(
    "surrounding-land-fill",
    "fill-outline-color",
    whiteMap
      ? "#b7c0ca"
      : ["case", ["==", ["get", "territoryType"], "northern-territories"], "#394452", "#303a47"],
  );
  setPaint("surrounding-land-gap-fill", "line-color", whiteMap ? "#b7c0ca" : "#303a47");
  setPaint("surrounding-land-gap-fill", "line-opacity", whiteMap ? 0 : 0.82);
  setPaint("japan-land-fill", "fill-color", whiteMap ? "#eef1f4" : "#151b23");
  setPaint(
    "japan-land-fill",
    "fill-outline-color",
    "rgba(0, 0, 0, 0)",
  );
  /*
   * The prefecture polygon edge and this former gap line shared the same
   * geometry. Drawing both produced a faint second coastline. Keep one
   * authoritative edge so the land fill and coastline stay pixel-aligned.
   */
  setPaint("japan-land-gap-fill", "line-color", whiteMap ? "#77828e" : "#9aa7b6");
  setPaint("japan-land-gap-fill", "line-opacity", 0);
  setPaint(
    "japan-land-gap-fill",
    "line-width",
    whiteMap
      ? ["interpolate", ["linear"], ["zoom"], 4, 0.55, 7, 0.78, 10, 1.02, 12, 1.15]
      : ["interpolate", ["linear"], ["zoom"], 4, 2.1, 7, 1.45, 10, 0.8, 12, 0.55],
  );
  setPaint("japan-land-gap-fill", "line-blur", 0);
  setPaint("jma-local-area-boundaries", "line-color", whiteMap ? "#aab3bd" : "#667383");
  setPaint(
    "jma-local-area-boundaries",
    "line-width",
    whiteMap
      ? ["interpolate", ["linear"], ["zoom"], 4, 0.42, 7, 0.68, 10, 0.9]
      : ["interpolate", ["linear"], ["zoom"], 4, 0.48, 7, 0.72, 10, 0.94],
  );
  setPaint(
    "eew-warning-fill",
    "fill-color",
    [
      "case",
      ["==", ["coalesce", ["feature-state", "eewBlinkOff"], ["get", "eewBlinkOff"], false], true],
      whiteMap ? "#eef1f4" : "#151b23",
      "#e60012",
    ],
  );
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
  const width = Math.floor(container.clientWidth);
  const height = Math.floor(container.clientHeight);
  if (width < 2 || height < 2) {
    return null;
  }
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

  const submarineFeatures = getSubmarineStationCanvasFeatures();
  const zoom = map.getZoom();
  const projectedPWaveRing = getProjectedWaveCanvasRing(waveCanvasRadiusState.p);
  const projectedSWaveRing = getProjectedWaveCanvasRing(waveCanvasRadiusState.s);

  drawProjectedWaveCanvasRadiusFill(context, projectedPWaveRing, "rgba(45, 212, 255, 0.08)");
  drawProjectedWaveCanvasRadiusFill(context, projectedSWaveRing, "rgba(255, 55, 95, 0.1)");

  if (state.showSubmarineStationLayer && submarineFeatures.length) {
    const radius = interpolateByZoom(zoom, [
      [4, 4.6],
      [6, 5.8],
      [8, 7.2],
    ]);
    const strokeWidth = interpolateByZoom(zoom, [[4, 0.8], [8, 1.2]]);
    const labelFadeStartZoom = STATION_LABEL_ALL_VISIBLE_MIN_ZOOM - 0.18;
    const labelAlpha = smoothStep(clamp((zoom - labelFadeStartZoom) / 0.18, 0, 1));
    const padding = radius + 6;

    [...submarineFeatures]
      .sort((left, right) => (
        getStationBoundaryColor(left.properties) === INTENSITY_BOUNDARY_LIGHT ? 1 : 0
      ) - (
        getStationBoundaryColor(right.properties) === INTENSITY_BOUNDARY_LIGHT ? 1 : 0
      ))
      .forEach((feature) => {
        const coordinates = feature.geometry?.coordinates;
        if (!Array.isArray(coordinates)) {
          return;
        }

        const point = map.project({ lng: coordinates[0], lat: coordinates[1] });
        if (point.x < -padding || point.x > width + padding || point.y < -padding || point.y > height + padding) {
          return;
        }

        const properties = feature.properties ?? {};
        drawSubmarineStationCanvasMarker(context, point.x, point.y, radius, strokeWidth, labelAlpha, properties);
      });

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

function drawSubmarineStationCanvasMarker(context, x, y, radius, strokeWidth, labelAlpha, properties) {
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
  for (let vertex = 0; vertex < 6; vertex += 1) {
    const angle = -Math.PI / 2 + vertex * Math.PI / 3;
    const vertexX = x + Math.cos(angle) * radius;
    const vertexY = y + Math.sin(angle) * radius;
    if (vertex === 0) {
      context.moveTo(vertexX, vertexY);
    } else {
      context.lineTo(vertexX, vertexY);
    }
  }
  context.closePath();
  context.fillStyle = fillColor;
  context.fill();
  context.shadowColor = "transparent";
  context.lineWidth = strokeWidth;
  context.setLineDash([]);
  context.strokeStyle = "#000000";
  context.stroke();
  context.restore();

  if (!hasRecordedIntensity || labelAlpha <= 0) {
    return;
  }

  const label = String(properties.intensityShortLabel ?? "");
  const fontSize = label.length > 1 ? 7.5 : 9;
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
    padding: getSimulationInitialMapPadding(),
  });
  updateMapPanConstraints();
}

function getInitialMapView() {
  return isCompactViewport() && !isIpadLikeDevice()
    ? { center: MOBILE_INITIAL_CENTER, zoom: MOBILE_INITIAL_ZOOM }
    : { center: INITIAL_CENTER, zoom: INITIAL_ZOOM };
}

function getSimulationInitialMapPadding() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
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
    padding: getSimulationInitialMapPadding(),
    duration: RESET_VIEW_ANIMATION_MS,
    easing: smoothResetMapEasing,
  });
}

function alignMapToSimulationEpicenter() {
  if (!map) {
    return Promise.resolve();
  }

  if (isFaultSimulationActive()) {
    const path = getActiveFaultPath();
    if (path.length >= 2) {
      const longitudes = path.map((point) => point[0]);
      const latitudes = path.map((point) => point[1]);
      return new Promise((resolve) => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeoutId);
          map.off("moveend", finish);
          resolve();
        };
        const timeoutId = window.setTimeout(finish, 1200);
        map.once("moveend", finish);
        map.fitBounds(
          [
            [Math.min(...longitudes), Math.min(...latitudes)],
            [Math.max(...longitudes), Math.max(...latitudes)],
          ],
          {
            padding: getInitialMapPaddingForViewport(),
            duration: 650,
            maxZoom: 6,
            essential: true,
          },
        );
      });
    }
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
  const faultEditButton = document.querySelector("#fault-epicenter-edit-button");
  const faultEditHint = document.querySelector("#fault-epicenter-edit-hint");
  const rectangleEditActive = isFaultSimulationActive()
    && state.faultModelId === "rectangle"
    && state.epicenterEditEnabled;

  if (map) {
    map.getCanvas().classList.toggle("epicenter-edit-enabled", state.epicenterEditEnabled);
  }

  els.epicenterEditToggle.checked = state.epicenterEditEnabled;
  els.epicenterEditToggle.disabled = state.simulationRunning;
  if (els.currentLocationRequestButton) {
    els.currentLocationRequestButton.disabled = state.simulationRunning;
  }
  if (faultEditButton) {
    faultEditButton.disabled = state.simulationRunning || state.faultModelId !== "rectangle";
    faultEditButton.classList.toggle("is-active", rectangleEditActive);
    faultEditButton.setAttribute("aria-pressed", rectangleEditActive ? "true" : "false");
    faultEditButton.replaceChildren(rectangleEditActive ? "配置地点を設定中" : "震源地を設定");
  }
  faultEditHint?.replaceChildren(rectangleEditActive
    ? "地図上をタップするか震源マーカーを移動すると、その地点へ矩形断層を配置します。"
    : "地図上の配置地点をタップするか、震源マーカーを移動してください。");

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
  state.showFaultLayer = false;
  updateFaultLayerToggleAvailability();
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
  if (shouldSyncAreaSourceData()) {
    visibleAreaDataSyncBucket = null;
    syncVisibleAreaSourceData(getSimulationStationElapsedSec());
  }
  updateLayerVisibility("shindo-station-points", state.showStationLayer);
  updateSubmarineObservationLayerVisibility();
  updateLayerVisibility("jma-intensity-fill", state.showRegionLayer);
  updateLayerVisibility("jma-intensity-area-boundaries", state.showRegionLayer);
  updateLayerVisibility("jma-intensity-area-boundaries-light", state.showRegionLayer);
  updateLayerVisibility("eew-warning-fill", state.showEewWarningLayer);
  updateLayerVisibility("jma-eew-warning-boundaries", state.showEewWarningLayer);
  updatePlateBoundaryLayerVisibility();
  updateFaultLayerVisibility();
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

}

function isSubmarineFeatureId(featureId) {
  return String(featureId ?? "").startsWith("submarine-");
}

function updateFaultLayerVisibility() {
  updateFaultLayerToggleAvailability();
}

function updateFaultLayerToggleAvailability() {
  state.showFaultLayer = false;
  [els.faultLayerToggle, els.simulationFaultLayerToggle].forEach((toggle) => {
    if (!toggle) {
      return;
    }
    toggle.checked = false;
    toggle.disabled = true;
    toggle.closest(".toggle-row")?.classList.add("is-disabled");
  });
  const proxyToggle = els.mapLayerControlPanel?.querySelector('[data-map-layer-target="fault-layer-toggle"]');
  if (proxyToggle instanceof HTMLInputElement) {
    proxyToggle.checked = false;
    proxyToggle.disabled = true;
    proxyToggle.closest("label")?.classList.add("is-disabled");
  }
  updateLayerVisibility("active-fault-lines", false);
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
  state.showFaultLayer = false;
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
  map.setPaintProperty("jma-intensity-fill", "fill-opacity", [
    "case",
    ...(replaceWithWarning
      ? [["==", ["feature-state", "eewWarning"], true], 0]
      : []),
    ["<=", ["coalesce", ["feature-state", "intensityRank"], 0], 0],
    0,
    ["interpolate", ["linear"], ["feature-state", "intensityRank"], 1, 0.54, 2, 0.72, 9, 0.94],
  ]);
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
    const properties = getStationPopupProperties(feature.properties);
    if (!isStationFeatureInteractive(properties)) {
      stationPopup.remove();
      return;
    }

    hoveredStationFeatureId = String(feature.properties?.id ?? "");
    hoveredStationLngLat = event.lngLat;
    stationPopup
      .setLngLat(event.lngLat)
      .setHTML(stationPopupHtml(properties))
      .addTo(map);
  });

  map.on("mouseleave", layerId, () => {
    map.getCanvas().style.cursor = "";
    hoveredStationFeatureId = null;
    hoveredStationLngLat = null;
    stationPopup.remove();
  });
}

function getStationPopupProperties(properties = {}) {
  const detail = stationFeatureDetailById.get(String(properties.id ?? ""));
  return detail ? { ...detail, ...properties } : properties;
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
      if (hoveredStationLngLat) {
        stationPopup.setLngLat(hoveredStationLngLat);
      }
      stationPopup.setHTML(stationPopupHtml(properties));
    }
  }
}

function findStationFeaturePropertiesById(featureId, data = sourceDataRefs.get("shindo-stations")) {
  const stationDetail = stationFeatureDetailById.get(String(featureId ?? ""));
  if (stationDetail) {
    return stationDetail;
  }
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
  const predictedIntensityLabel = properties.predictedIntensityLabel ?? "0";

  return [
    `<strong>${escapeHtml(properties.name ?? "観測点")}</strong>`,
    `<span>最大震度：${escapeHtml(predictedIntensityLabel)}</span>`,
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
    localStorage.removeItem(CURRENT_LOCATION_ENABLED_KEY);
    localStorage.removeItem(CURRENT_LOCATION_LAST_COORDS_KEY);
    state.currentLocationEnabled = false;
    state.currentLocation = null;
    state.currentLocationName = "-";
    state.currentLocationStatus = "idle";
    removeCurrentLocationMarker();
    updateCurrentLocationForecast(getSimulationStationElapsedSec());
    return;
  }

  localStorage.setItem(CURRENT_LOCATION_ENABLED_KEY, "true");

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
    const permissionDenied = error?.code === 1 || error?.code === error?.PERMISSION_DENIED;
    state.currentLocationEnabled = false;
    state.currentLocation = null;
    state.currentLocationName = permissionDenied
      ? "OSの設定で位置情報を許可してください。"
      : "位置情報の取得に失敗しました。再度お試しください。";
    state.currentLocationStatus = "error";
    if (permissionDenied) {
      els.currentLocationToggle.checked = false;
      localStorage.removeItem(CURRENT_LOCATION_ENABLED_KEY);
      localStorage.removeItem(CURRENT_LOCATION_LAST_COORDS_KEY);
    }
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
    removeCurrentLocationMarker();
    updateCurrentLocationForecast(getSimulationStationElapsedSec());
    return;
  }

  state.currentLocationEnabled = true;
  state.currentLocation = {
    latitude: Number(latitude.toFixed(5)),
    longitude: Number(longitude.toFixed(5)),
  };
  saveLastKnownCurrentLocation(state.currentLocation);
  state.currentLocationName = "位置情報を取得中...";
  state.currentLocationStatus = "loading";
  updateCurrentLocationMarker();
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

async function restoreCurrentLocationPreference() {
  if (!els.currentLocationToggle) {
    return;
  }

  const locationEnabled = localStorage.getItem(CURRENT_LOCATION_ENABLED_KEY) === "true";
  els.currentLocationToggle.checked = locationEnabled;
  updateSettingsScreenNotificationState();

  if (!navigator.geolocation) {
    els.currentLocationToggle.checked = false;
    updateSettingsScreenNotificationState();
    return;
  }

  if (!locationEnabled) {
    if (!navigator.permissions?.query) {
      showStartupLocationPermissionPrompt("prompt");
      return;
    }
    try {
      const permission = await navigator.permissions.query({ name: "geolocation" });
      showStartupLocationPermissionPrompt(permission.state);
    } catch (error) {
      console.warn("location permission check failed", error);
      showStartupLocationPermissionPrompt("prompt");
    }
    return;
  }

  if (!navigator.permissions?.query) {
    await toggleCurrentLocationLink();
    updateSettingsScreenNotificationState();
    return;
  }

  try {
    const permission = await navigator.permissions.query({ name: "geolocation" });
    if (permission.state !== "granted") {
      state.currentLocationEnabled = false;
      state.currentLocation = null;
      state.currentLocationName = permission.state === "denied"
        ? "OSの設定で位置情報を許可してください。"
        : "位置情報の許可を確認してください。";
      state.currentLocationStatus = "error";
      updateSettingsScreenNotificationState();
      return;
    }
    updateSettingsScreenNotificationState();
    await toggleCurrentLocationLink();
    updateSettingsScreenNotificationState();
    closeStartupLocationPermissionPrompt();
  } catch (error) {
    console.warn("location permission restore failed", error);
  }
}

function showStartupLocationPermissionPrompt(permissionState = "prompt") {
  if (!navigator.geolocation) {
    return null;
  }

  let overlay = document.querySelector("#startup-location-permission-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "startup-location-permission-overlay";
    overlay.className = "startup-location-permission-overlay";
    overlay.innerHTML = `
      <section class="startup-location-permission-dialog" role="dialog" aria-modal="true" aria-labelledby="startup-location-permission-title">
        <span class="startup-location-permission-icon" aria-hidden="true"></span>
        <h2 id="startup-location-permission-title">位置情報を使用しますか？</h2>
        <p>現在地をシミュレーションマップと投稿マップに表示します。現在地を震源地として設定することはありません。</p>
        <p class="startup-location-permission-status" aria-live="polite"></p>
        <div class="startup-location-permission-actions">
          <button type="button" data-location-permission-later>後で</button>
          <button type="button" data-location-permission-allow>位置情報を許可</button>
        </div>
      </section>
    `;
    overlay.querySelector("[data-location-permission-later]")?.addEventListener("click", () => {
      closeStartupLocationPermissionPrompt();
    });
    overlay.querySelector("[data-location-permission-allow]")?.addEventListener("click", async () => {
      const allowButton = overlay.querySelector("[data-location-permission-allow]");
      const laterButton = overlay.querySelector("[data-location-permission-later]");
      const status = overlay.querySelector(".startup-location-permission-status");
      allowButton.disabled = true;
      laterButton.disabled = true;
      allowButton.textContent = "取得中...";
      status.textContent = "ブラウザまたはOSの確認画面で位置情報を許可してください。";
      try {
        const position = await requestCurrentPosition();
        if (!isUsableGeolocationPosition(position)) {
          throw new Error("Geolocation returned invalid coordinates.");
        }
        await syncCurrentLocationSettingFromCoordinates(
          Number(position.coords.latitude),
          Number(position.coords.longitude),
        );
        closeStartupLocationPermissionPrompt();
      } catch (error) {
        console.warn("startup location permission request failed", error);
        const permissionDenied = error?.code === 1 || error?.code === error?.PERMISSION_DENIED;
        status.textContent = permissionDenied
          ? "位置情報が拒否されています。ブラウザまたはOSの設定で許可してから再確認してください。"
          : "位置情報を取得できませんでした。通信状態を確認して再度お試しください。";
        allowButton.textContent = "再確認";
        allowButton.disabled = false;
        laterButton.disabled = false;
      }
    });
    document.body.append(overlay);
  }

  const status = overlay.querySelector(".startup-location-permission-status");
  status.textContent = permissionState === "denied"
    ? "位置情報が拒否されています。ブラウザまたはOSの設定で許可してください。"
    : "許可後、現在地マークを地図に表示します。";
  return overlay;
}

function closeStartupLocationPermissionPrompt() {
  document.querySelector("#startup-location-permission-overlay")?.remove();
}

async function refreshSystemPermissionStates() {
  if (navigator.permissions?.query && els.currentLocationToggle) {
    try {
      const permission = await navigator.permissions.query({ name: "geolocation" });
      const locationEnabled = localStorage.getItem(CURRENT_LOCATION_ENABLED_KEY) === "true";
      if (permission.state === "denied" && els.currentLocationToggle.checked) {
        clearCurrentLocationLink();
      } else if (
        permission.state === "granted"
        && locationEnabled
        && (
          !els.currentLocationToggle.checked
          || !state.currentLocationEnabled
          || !state.currentLocation
        )
      ) {
        els.currentLocationToggle.checked = true;
        localStorage.setItem(CURRENT_LOCATION_ENABLED_KEY, "true");
        await toggleCurrentLocationLink();
        closeStartupLocationPermissionPrompt();
      } else if (permission.state === "granted" && state.currentLocation) {
        updateCurrentLocationMarker();
        closeStartupLocationPermissionPrompt();
      }
    } catch (error) {
      console.warn("location permission check failed", error);
    }
  }

  if (!IS_LOCAL_DEV && "serviceWorker" in navigator && "Notification" in window) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration?.pushManager?.getSubscription();
      state.pushSubscribed = Notification.permission === "granted" && Boolean(subscription);
    } catch (error) {
      console.warn("notification permission check failed", error);
    }
  }
  updateSettingsScreenNotificationState();
}

function setupSystemPermissionSync() {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      refreshSystemPermissionStates();
    }
  });

  if (navigator.permissions?.query) {
    navigator.permissions.query({ name: "geolocation" }).then((permission) => {
      permission.addEventListener?.("change", () => refreshSystemPermissionStates());
    }).catch((error) => console.warn("location permission listener setup failed", error));
  }
}

function clearCurrentLocationLink(options = {}) {
  currentLocationRequestId += 1;
  if (options.preserveEnabled && els.currentLocationToggle?.checked) {
    removeCurrentLocationMarker();
    if (options.updateForecast !== false) {
      updateCurrentLocationForecast(getSimulationStationElapsedSec());
    }
    return;
  }
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
  const isCommunityMapVisible = document.body.classList.contains("community-map-mode");
  const isLocationMapVisible =
    document.body.dataset.activeBottomTab === "earthquake-tab"
    || isCommunityMapVisible;
  if (
    !map
    || !isLocationMapVisible
    || (isCommunityMapVisible && !communityLocationMarkerVisible)
    || !state.currentLocationEnabled
    || !state.currentLocation
  ) {
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
      markerElement.setAttribute("role", "img");
      markerElement.setAttribute("aria-label", "現在地");
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
    applySimulationIntensityCard(els.currentLocationIntensity, null);
    setTextContentIfChanged(els.currentLocationArrival, "計算中");
    return;
  }

  if (state.currentLocationStatus === "error") {
    setTextContentIfChanged(
      els.currentLocationName,
      state.currentLocationName || "位置情報の取得に失敗しました。再度お試しください。",
    );
    setTextContentIfChanged(els.currentLocationIntensity, "-");
    applySimulationIntensityCard(els.currentLocationIntensity, null);
    setTextContentIfChanged(els.currentLocationArrival, "-");
    return;
  }

  if (!state.currentLocationEnabled || !state.currentLocation) {
    setTextContentIfChanged(els.currentLocationName, "-");
    setTextContentIfChanged(els.currentLocationIntensity, "-");
    applySimulationIntensityCard(els.currentLocationIntensity, null);
    setTextContentIfChanged(els.currentLocationArrival, "-");
    return;
  }

  setTextContentIfChanged(els.currentLocationName, state.currentLocationName || "-");

  const forecast = getCurrentLocationForecast();
  if (!forecast) {
    setTextContentIfChanged(els.currentLocationIntensity, "計算中");
    applySimulationIntensityCard(els.currentLocationIntensity, null);
    setTextContentIfChanged(els.currentLocationArrival, "計算中");
    return;
  }

  if (forecast.intensityClass.rank < 1) {
    setTextContentIfChanged(els.currentLocationIntensity, "該当なし");
    applySimulationIntensityCard(els.currentLocationIntensity, null);
    setTextContentIfChanged(els.currentLocationArrival, "該当なし");
    return;
  }

  const elapsed = Number.isFinite(elapsedSec) ? elapsedSec : 0;
  const remainingSec = Math.max(forecast.pArrivalSec - elapsed, 0);
  setTextContentIfChanged(els.currentLocationIntensity, forecast.intensityClass.label);
  applySimulationIntensityCard(els.currentLocationIntensity, forecast.intensityClass);
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
    state.sourceModel,
    state.faultModelId,
  ].join("|");
  if (currentLocationForecastCache?.key === cacheKey) {
    return currentLocationForecastCache.forecast;
  }

  const travelMetrics = isFaultSimulationActive()
    ? getFaultTravelMetrics(state.currentLocation.longitude, state.currentLocation.latitude)
    : null;
  const epicentralDistanceKm = travelMetrics?.surfaceDistanceKm ?? haversineKilometers(
      [state.longitude, state.latitude],
      [state.currentLocation.longitude, state.currentLocation.latitude],
    );
  const intensityValue = estimateIntensityAtPoint(
    state.currentLocation.longitude,
    state.currentLocation.latitude,
    epicentralDistanceKm,
  );
  const intensityClass = toJmaIntensityClass(intensityValue);
  const pWaveArrivalSec = travelMetrics?.pArrivalSec
    ?? epicentralDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec;

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
  if (!maintenanceStatusReady || isSimulationMapDataLoading()) {
    return;
  }

  if (isFaultSimulationActive()) {
    await syncFaultEpicenterName();
  }

  resetViewAnimating = true;
  updateSimulationAvailability();
  try {
    await alignMapToSimulationEpicenter();
  } finally {
    resetViewAnimating = false;
  }

  simulationPreviousEpicenterEditEnabled = state.epicenterEditEnabled;
  simulationEpicenter = getDisplayedEpicenterCoordinates();
  state.eewWarningReportNumber = null;
  state.eewWarningFinalReport = false;
  state.eewReportAreaKeySignature = "";
  state.eewSyntheticReportNumber = 0;
  state.eewFirstReportElapsedSec = null;
  state.eewIssuedWarningKeys = new Set();
  state.eewWarningBlinkStartedAt = {};
  state.eewInitialWarningKeys = new Set();
  state.eewPreviousWarningKeys = new Set();
  state.eewWarningForecastAreas = [];
  resetSpeechAnnouncementState();
  resetWaveRenderCache();
  simulationSetupMagnitude = state.magnitude;
  simulationCompleteAtSec = getSimulationCompleteAtSec();
  prepareSimulationMagnitudeReports();
  const finalMagnitudeReport = simulationMagnitudeReports.at(-1);
  if (Number.isFinite(Number(finalMagnitudeReport?.elapsedSec))) {
    simulationCompleteAtSec = Math.max(
      simulationCompleteAtSec,
      Number(finalMagnitudeReport.elapsedSec) + SIMULATION_ORIGIN_OFFSET_SEC + SIMULATION_END_GRACE_SEC,
    );
  }
  updateSimulationMagnitudeForElapsed(0, { force: true });
  resetSimulationTimeline();
  stationSummaryCache = { data: null, summary: null };
  eewForecastPanelRenderSignature = "";
  simulationRenderBucket = -1;
  simulationStationRenderBucket = -1;
  maxStationListRenderBucket = null;
  maxStationListRenderSignature = "";
  simulationMaxAreaListSignature = "";
  cancelPendingMaxStationListRender();
  simulationTimeTextCache = "";
  state.simulationRunning = true;
  state.simulationPaused = false;
  state.simulationCompleted = false;
  document.body.classList.add("simulation-session-active");
  document.body.classList.remove("simulation-session-complete");
  const runtimeHud = document.querySelector(".simulation-runtime-hud");
  runtimeHud?.classList.remove("is-collapsed", "is-dragging");
  runtimeHud?.style.removeProperty("--runtime-hud-drag-y");
  const runtimeHudHandle = runtimeHud?.querySelector(".simulation-runtime-handle");
  runtimeHudHandle?.setAttribute("aria-expanded", "true");
  runtimeHudHandle?.setAttribute("aria-label", "シミュレーション情報を折りたたむ");
  const selectedPreset = getSelectedPreset();
  const originTimeText = selectedPreset
    ? formatPresetDateTime(selectedPreset)
    : new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  setTextContentIfChanged(els.simulationOriginTime, originTimeText);
  els.setupPanel?.setAttribute("aria-label", "シミュレーションメニュー");
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
  updateSimulationProgress(0);
  if (!state.speechMuted) {
    scheduleSimulationSpeechStart();
  }
  updateCurrentLocationMarker();
  if (els.simulationPause) {
    els.simulationPause.textContent = "一時停止";
    els.simulationPause.disabled = false;
    els.simulationPause.setAttribute("aria-label", "シミュレーションを一時停止");
  }
  if (els.simulationRewind) {
    els.simulationRewind.textContent = "↶ 5秒";
    els.simulationRewind.disabled = false;
    els.simulationRewind.setAttribute("aria-label", "5秒巻き戻す");
  }
  if (els.simulationStop) {
    els.simulationStop.textContent = "シミュレーション終了";
  }
  els.simulationStart.textContent = "シミュレーション中止";
  els.setupPanel.classList.add("hidden");
  els.simulationPanel.classList.add("hidden");
  activateSettingsTab("result");
  updateSettingsMenuButtonVisibility();
  cancelAnimationFrame(simulationFrame);
  tickSimulation(simulationStartedAt);
}

function stopSimulation(options = {}) {
  const expandSetup = Boolean(options.expandSetup);
  closeSimulationResultReport({ activatePrimary: false, returnToCompleted: false });
  restoreSimulationSetupMagnitude();
  cancelSpeechAnnouncements();
  state.simulationRunning = false;
  state.simulationPaused = false;
  state.simulationCompleted = false;
  document.body.classList.remove("simulation-session-active", "simulation-session-complete");
  const returnsToFaultSelection = isFaultSimulationActive();
  els.setupPanel?.setAttribute("aria-label", returnsToFaultSelection ? "断層設定" : "震源設定");
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
  simulationSetupMagnitude = null;
  simulationDisplayedMagnitude = null;
  simulationMagnitudeReports = [];
  simulationMagnitudeReportIndex = -1;
  simulationPausedAt = null;
  simulationRenderBucket = -1;
  simulationStationRenderBucket = -1;
  maxStationListRenderBucket = null;
  simulationTimeTextCache = "";
  simulationMaxAreaListSignature = "";
  state.epicenterEditEnabled = simulationPreviousEpicenterEditEnabled;
  els.epicenterEditToggle.checked = state.epicenterEditEnabled;
  updateEpicenterEditMode();
  els.simulationStart.textContent = "開始";
  delete els.simulationPanel.dataset.simulationComplete;
  if (els.simulationPause) {
    els.simulationPause.textContent = "一時停止";
    els.simulationPause.disabled = true;
    els.simulationPause.setAttribute("aria-label", "シミュレーションを一時停止");
  }
  if (els.simulationRewind) {
    els.simulationRewind.textContent = "↶ 5秒";
    els.simulationRewind.disabled = true;
    els.simulationRewind.setAttribute("aria-label", "5秒巻き戻す");
  }
  if (els.simulationStop) {
    els.simulationStop.textContent = "シミュレーション終了";
  }
  updateSimulationProgress(0);
  els.setupPanel.classList.remove("hidden");
  els.simulationPanel.classList.add("hidden");
  activateSettingsTab("primary");
  setSetupMenuOpen(expandSetup);
  if (expandSetup) {
    els.setupPanel?.querySelector(".sim-panel-scroll")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  }
  updateSettingsMenuButtonVisibility();
  clearCurrentLocationLink({ preserveEnabled: true });
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

function seekSimulationToElapsed(nextElapsedSec) {
  if (!state.simulationRunning || !simulationStartedAt) {
    return false;
  }

  const upperBound = Number.isFinite(simulationCompleteAtSec) ? simulationCompleteAtSec : Math.max(getSimulationElapsedSec(), 0);
  const elapsedSec = clamp(Number(nextElapsedSec) || 0, 0, upperBound);
  const now = performance.now();
  simulationStartedAt = now - elapsedSec * 1000;
  if (state.simulationPaused) {
    simulationPausedAt = now;
  }

  cancelAnimationFrame(simulationFrame);
  simulationFrame = null;
  resetSimulationStateForSeek(elapsedSec);
  renderSimulationAtElapsed(elapsedSec);
  if (!state.simulationPaused) {
    resumeSpeechAnnouncements();
    simulationFrame = requestAnimationFrame(tickSimulation);
  }
  return true;
}

function resetSimulationStateForSeek(elapsedSec) {
  const modelElapsedSec = getSimulationModelElapsedSec(elapsedSec);
  state.eewWarningReportNumber = null;
  state.eewWarningFinalReport = false;
  state.eewReportAreaKeySignature = "";
  state.eewSyntheticReportNumber = 0;
  state.eewFirstReportElapsedSec =
    Number.isFinite(simulationTimelineExpectedFirstEewSec) && modelElapsedSec >= simulationTimelineExpectedFirstEewSec
      ? simulationTimelineExpectedFirstEewSec
      : null;
  state.eewIssuedWarningKeys = new Set();
  state.eewWarningBlinkStartedAt = {};
  state.eewInitialWarningKeys = new Set();
  state.eewPreviousWarningKeys = new Set();
  state.eewWarningForecastAreas = [];
  resetSpeechAnnouncementState();
  pauseSpeechAnnouncements();
  resetWaveRenderCache();
  stationSummaryCache = { data: null, summary: null };
  observedStationFeatureCache = { data: null, features: [] };
  stationDataCache = { key: "", data: null };
  areaDataCache = { key: "", data: null };
  visibleAreaDataSyncBucket = null;
  simulationRenderBucket = -1;
  simulationStationRenderBucket = -1;
  maxStationListRenderBucket = null;
  simulationTimeTextCache = "";
  simulationMaxAreaListSignature = "";
  resetSimulationTimeline();
}

function renderSimulationAtElapsed(elapsedSec) {
  simulationSeeking = true;
  try {
    const modelElapsedSec = getSimulationModelElapsedSec(elapsedSec);
    updateSimulationMagnitudeForElapsed(modelElapsedSec);
    const { pRadiusKm, sRadiusKm } = getWaveSurfaceRadiiForElapsed(modelElapsedSec);
    setWaveRadiusData(pRadiusKm, sRadiusKm);
    updateSimulationFaultRuptureSource(modelElapsedSec);
    setTextContentIfChanged(els.simulationTime, `${elapsedSec.toFixed(1)} 秒`);
    simulationTimeTextCache = `${elapsedSec.toFixed(1)} 秒`;
    if (state.showStationLayer && map?.getSource("shindo-stations") && shindoStationData) {
      setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(modelElapsedSec));
    }
    if (
      state.showSubmarineStationLayer
      && !getSelectedPreset()
      && map?.getSource("submarine-observation-points")
      && submarineObservationPointData
    ) {
      setSubmarineObservationSourceForElapsed(modelElapsedSec);
    }
    syncVisibleAreaSourceData(modelElapsedSec);
    updateSimulationSummary(modelElapsedSec);
    updateSimulationProgress(elapsedSec);
  } finally {
    simulationSeeking = false;
  }
}

function tickSimulation(now) {
  if (!state.simulationRunning || state.simulationPaused) {
    return;
  }

  if (!Number.isFinite(simulationCompleteAtSec)) {
    refreshSimulationCompletionSchedule();
  }

  const rawElapsedSec = getSimulationElapsedSec(now);
  const elapsedSec = Number.isFinite(simulationCompleteAtSec)
    ? Math.min(rawElapsedSec, simulationCompleteAtSec)
    : rawElapsedSec;
  const modelElapsedSec = getSimulationModelElapsedSec(elapsedSec);
  updateSimulationMagnitudeForElapsed(modelElapsedSec);
  const { pRadiusKm, sRadiusKm } = getWaveSurfaceRadiiForElapsed(modelElapsedSec);
  setWaveRadiusData(pRadiusKm, sRadiusKm);
  const currentBucket = toSimulationBucket(modelElapsedSec);

  const nextSimulationTimeText = `${elapsedSec.toFixed(1)} 秒`;
  if (nextSimulationTimeText !== simulationTimeTextCache) {
    els.simulationTime.textContent = nextSimulationTimeText;
    simulationTimeTextCache = nextSimulationTimeText;
  }

  if (currentBucket !== simulationStationRenderBucket) {
    simulationStationRenderBucket = currentBucket;
    if (state.showStationLayer && map?.getSource("shindo-stations") && shindoStationData) {
      setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(modelElapsedSec));
    }
    if (
      state.showSubmarineStationLayer &&
      !getSelectedPreset() &&
      map?.getSource("submarine-observation-points") &&
      submarineObservationPointData
    ) {
      setSubmarineObservationSourceForElapsed(modelElapsedSec);
    }
  }

  if (currentBucket !== simulationRenderBucket) {
    simulationRenderBucket = currentBucket;

    updateSimulationFaultRuptureSource(modelElapsedSec);
    syncVisibleAreaSourceData(modelElapsedSec);

    updateSimulationSummary(modelElapsedSec);
  }

  updateSimulationProgress(elapsedSec);

  if (isSimulationComplete(elapsedSec)) {
    updateSimulationMagnitudeForElapsed(Infinity, { force: true });
    state.simulationRunning = false;
    state.simulationPaused = false;
    state.simulationCompleted = true;
    document.body.classList.add("simulation-session-complete");
    state.eewWarningFinalReport = state.eewWarningReportNumber != null;
    resetSpeechAnnouncementState();
    finishSpeechAnnouncementsGracefully();
    simulationFrame = null;
    simulationPausedAt = null;
    maxStationListRenderBucket = null;
    maxStationListRenderSignature = "";
    maxStationListItemCache.clear();
    maxStationListEmptyItem = null;
    cancelPendingMaxStationListRender();
    clearCurrentLocationLink({ updateForecast: false, preserveEnabled: true });
    resetWaveRenderCache();
    setWaveRadiusData(0, 0);
    visibleAreaDataSyncBucket = null;
    if (state.showStationLayer && map?.getSource("shindo-stations") && shindoStationData) {
      setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(modelElapsedSec));
    }
    syncVisibleAreaSourceData(modelElapsedSec);
    updateSimulationSummary(modelElapsedSec);
    state.epicenterEditEnabled = simulationPreviousEpicenterEditEnabled;
    els.epicenterEditToggle.checked = state.epicenterEditEnabled;
    updateEpicenterEditMode();
    els.simulationStart.textContent = "開始";
    els.simulationPanel.dataset.simulationComplete = "true";
    if (els.simulationPause) {
      const returnsToFaultSelection = isFaultSimulationActive();
      els.simulationPause.textContent = returnsToFaultSelection ? "断層選択へ" : "震源設定へ";
      els.simulationPause.disabled = false;
      els.simulationPause.setAttribute(
        "aria-label",
        returnsToFaultSelection
          ? "シミュレーションを終了して断層選択に戻る"
          : "シミュレーションを終了して震源設定に戻る",
      );
    }
    if (els.simulationRewind) {
      els.simulationRewind.textContent = "結果";
      els.simulationRewind.disabled = false;
      els.simulationRewind.setAttribute("aria-label", "シミュレーション結果を表示");
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

function getSimulationModelElapsedSec(sessionElapsedSec = getSimulationElapsedSec()) {
  return Math.max((Number(sessionElapsedSec) || 0) - SIMULATION_ORIGIN_OFFSET_SEC, 0);
}

function prepareSimulationMagnitudeReports() {
  const preset = getSelectedPreset();
  const setupMagnitude = Number(simulationSetupMagnitude ?? state.magnitude);
  const presetReports = Array.isArray(preset?.eewReports) ? preset.eewReports : [];
  const presetMagnitudeReports = presetReports
    .map((report, index) => ({
      reportNumber: Number(report.reportNumber) || index + 1,
      elapsedSec: Math.max(Number(report.elapsedSec) || 0, 0),
      magnitude: Number(report.magnitude),
    }))
    .filter((report) => Number.isFinite(report.magnitude) && report.magnitude > 0)
    .sort((left, right) => left.elapsedSec - right.elapsedSec);

  if (presetMagnitudeReports.length > 0) {
    simulationMagnitudeReports = presetMagnitudeReports.map((report, index, reports) => ({
      ...report,
      magnitude: Number(clamp(report.magnitude, 0.1, 10).toFixed(1)),
      isFinal: index === reports.length - 1,
    }));
    simulationMagnitudeReportIndex = -1;
    return;
  }

  if (preset) {
    simulationMagnitudeReports = [{
      reportNumber: 1,
      elapsedSec: 0,
      magnitude: setupMagnitude,
      isFinal: true,
    }];
    simulationMagnitudeReportIndex = -1;
    return;
  }

  simulationMagnitudeReports = buildSyntheticSimulationMagnitudeReports(setupMagnitude);
  simulationMagnitudeReportIndex = -1;
}

function buildSyntheticSimulationMagnitudeReports(finalMagnitude) {
  const predictedStations = shindoStationData ? buildStationIntensityFeatures(shindoStationData) : [];
  const arrivalCandidates = predictedStations
    .filter((feature) => Number(feature.properties?.predictedIntensityRank) >= 1)
    .map((feature) => Number(feature.properties?.pArrivalSec))
    .filter(Number.isFinite);
  const firstReportSec = clamp(
    (arrivalCandidates.length ? Math.min(...arrivalCandidates) : 1.2) + EARTHQUAKE_MODEL.eewProcessingDelaySec,
    2.4,
    7.5,
  );
  const reviewDurationSec = clamp(
    11 + Math.max(finalMagnitude - 5.0, 0) * 12 + getOffshoreEpicenterFactor() * 8,
    11,
    78,
  );
  const availableEndSec = Number.isFinite(simulationCompleteAtSec)
    ? Math.max(simulationCompleteAtSec - SIMULATION_ORIGIN_OFFSET_SEC - SIMULATION_END_GRACE_SEC, firstReportSec)
    : firstReportSec + reviewDurationSec;
  const finalReportSec = Math.min(firstReportSec + reviewDurationSec, availableEndSec);
  const reportCount = Math.round(clamp(4 + Math.max(finalMagnitude - 4.0, 0) * 2.1, 4, 18));
  const intervalWeights = Array.from({ length: Math.max(reportCount - 1, 1) }, (_, index) => (
    0.45 + stableUnitInterval([
      "magnitude-report-time",
      state.latitude.toFixed(3),
      state.longitude.toFixed(3),
      finalMagnitude.toFixed(1),
      index,
    ].join("|")) * 1.9
  ));
  const totalWeight = intervalWeights.reduce((sum, weight) => sum + weight, 0);
  let accumulatedWeight = 0;
  const initialDeficit = clamp(0.45 + Math.max(finalMagnitude - 5.0, 0) * 0.24, 0.45, 1.65);

  let previousMagnitude = null;
  let previousStep = null;
  return Array.from({ length: reportCount }, (_, index) => {
    const isFinal = index === reportCount - 1;
    if (index > 0) {
      accumulatedWeight += intervalWeights[index - 1];
    }
    const progress = isFinal ? 1 : accumulatedWeight / totalWeight;
    const remainingUncertainty = (1 - progress) ** 1.35;
    const noise = (
      stableUnitInterval([
        "magnitude-report-value",
        state.latitude.toFixed(3),
        state.longitude.toFixed(3),
        finalMagnitude.toFixed(1),
        index,
      ].join("|")) - 0.5
    ) * 0.8 * remainingUncertainty;
    const targetEstimate = isFinal
      ? finalMagnitude
      : finalMagnitude - initialDeficit * remainingUncertainty + noise;
    let estimate = targetEstimate;
    if (!isFinal && previousMagnitude != null) {
      const stepChoices = [-0.2, -0.1, 0.1, 0.2, 0.3];
      estimate = stepChoices
        .map((step) => {
          const candidate = Number((previousMagnitude + step).toFixed(1));
          const tieBreaker = stableUnitInterval([
            "magnitude-report-step",
            state.latitude.toFixed(3),
            state.longitude.toFixed(3),
            finalMagnitude.toFixed(1),
            index,
            step,
          ].join("|"));
          return {
            step,
            candidate,
            score: Math.abs(candidate - targetEstimate)
              + (step === previousStep ? 0.18 : 0)
              + tieBreaker * 0.08,
          };
        })
        .sort((left, right) => left.score - right.score)[0].candidate;
    }
    const magnitude = Number(clamp(Math.round(estimate * 10) / 10, 0.1, 10).toFixed(1));
    const step = previousMagnitude == null ? null : Number((magnitude - previousMagnitude).toFixed(1));
    previousMagnitude = magnitude;
    previousStep = step;
    return {
      reportNumber: index + 1,
      elapsedSec: Number((firstReportSec + (finalReportSec - firstReportSec) * progress).toFixed(2)),
      magnitude,
      isFinal,
    };
  });
}

function getSimulationMagnitudeReportForElapsed(elapsedSec = Infinity) {
  if (simulationMagnitudeReports.length === 0) {
    return null;
  }
  if (!Number.isFinite(elapsedSec)) {
    return simulationMagnitudeReports.at(-1);
  }
  for (let index = simulationMagnitudeReports.length - 1; index >= 0; index -= 1) {
    if (simulationMagnitudeReports[index].elapsedSec <= elapsedSec) {
      return simulationMagnitudeReports[index];
    }
  }
  return simulationMagnitudeReports[0];
}

function updateSimulationMagnitudeForElapsed(elapsedSec, options = {}) {
  const report = getSimulationMagnitudeReportForElapsed(elapsedSec);
  if (!report) {
    return false;
  }
  const nextIndex = simulationMagnitudeReports.indexOf(report);
  const nextMagnitude = Number(report.magnitude);
  if (
    !options.force
    && nextIndex === simulationMagnitudeReportIndex
    && Math.abs(nextMagnitude - Number(simulationDisplayedMagnitude)) < 0.0001
  ) {
    return false;
  }
  simulationMagnitudeReportIndex = nextIndex;
  simulationDisplayedMagnitude = nextMagnitude;
  if (!options.force && state.simulationRunning) {
    addSimulationTimelineEvent(
      `magnitude-${report.reportNumber}`,
      Number(report.elapsedSec) + SIMULATION_ORIGIN_OFFSET_SEC,
      formatSimulationMagnitudeTimelineLabel(report),
      "magnitude",
    );
  }
  // Magnitude reports are display-only. Keep state.magnitude fixed so no
  // intensity, station, area, or EEW-range calculation is rerun for any quake.
  setTextContentIfChanged(els.simulationMagnitude, nextMagnitude.toFixed(1));
  return true;
}

function restoreSimulationSetupMagnitude() {
  simulationDisplayedMagnitude = null;
  if (!Number.isFinite(Number(simulationSetupMagnitude))) {
    return;
  }
  const setupMagnitude = Number(simulationSetupMagnitude);
  setTextContentIfChanged(els.simulationMagnitude, setupMagnitude.toFixed(1));
}

function updateSimulationProgress(elapsedSec = 0) {
  const elapsed = Number.isFinite(elapsedSec) ? Math.max(elapsedSec, 0) : 0;
  const total = Number(simulationCompleteAtSec);
  const hasFiniteTotal = Number.isFinite(total) && total > 0;
  const progress = hasFiniteTotal ? Math.min(elapsed / total, 1) : 0;
  const percent = Math.round(progress * 1000) / 10;
  const timelineElapsed = hasFiniteTotal ? Math.min(elapsed, total) : elapsed;
  simulationTimelineElapsedSec = timelineElapsed;
  const currentX = Math.round(SIMULATION_TIMELINE_START_PX + timelineElapsed * SIMULATION_TIMELINE_PX_PER_SEC);
  const viewportWidth = Math.max(els.simulationProgressTrack?.clientWidth || 0, 320);
  const timelineEndSec = hasFiniteTotal ? total : elapsed + 60;
  const canvasWidth = hasFiniteTotal
    ? viewportWidth + Math.round(timelineEndSec * SIMULATION_TIMELINE_PX_PER_SEC)
    : Math.max(viewportWidth * 2.5, currentX + viewportWidth);

  if (
    state.simulationRunning
    && state.eewWarningReportNumber != null
    && state.eewWarningReportNumber !== simulationTimelineLastEewReport
  ) {
    simulationTimelineLastEewReport = state.eewWarningReportNumber;
    const matchingMagnitudeReport = simulationMagnitudeReports.find(
      (report) => Number(report.reportNumber) === Number(state.eewWarningReportNumber),
    );
    addSimulationTimelineEvent(
      `eew-${state.eewWarningReportNumber}`,
      elapsed,
      formatSimulationEewTimelineLabel(
        state.eewWarningReportNumber,
        matchingMagnitudeReport?.magnitude,
      ),
      "eew",
    );
  }
  if (els.simulationProgressCanvas) {
    els.simulationProgressCanvas.style.width = `${canvasWidth}px`;
  }
  if (els.simulationProgressFill) {
    els.simulationProgressFill.style.width = `${SIMULATION_TIMELINE_START_PX}px`;
  }
  if (els.simulationProgressNow) {
    els.simulationProgressNow.style.left = `${SIMULATION_TIMELINE_START_PX}px`;
  }
  syncSimulationTimelineEventStates();
  if (els.simulationProgressTrack) {
    els.simulationProgressTrack.setAttribute("aria-valuenow", String(Math.round(percent)));
    els.simulationProgressTrack.setAttribute(
      "aria-valuetext",
      hasFiniteTotal ? `${timelineElapsed.toFixed(1)}秒 / ${total.toFixed(1)}秒` : `${elapsed.toFixed(1)}秒経過`,
    );
    if (simulationTimelineAutoFollow) {
      const nextScrollLeft = Math.max(currentX - SIMULATION_TIMELINE_START_PX, 0);
      if (Math.abs(els.simulationProgressTrack.scrollLeft - nextScrollLeft) > 1) {
        els.simulationProgressTrack.scrollLeft = nextScrollLeft;
      }
    }
  }
  setTextContentIfChanged(
    els.simulationProgressTime,
    hasFiniteTotal ? `${timelineElapsed.toFixed(1)} / ${total.toFixed(1)} 秒` : `${elapsed.toFixed(1)} 秒`,
  );
}

function resetSimulationTimeline() {
  simulationTimelineEvents = [];
  simulationTimelineElapsedSec = 0;
  els.simulationProgressEvents?.replaceChildren();
  simulationTimelineLastEewReport = null;
  simulationTimelineMaxRank = 0;
  simulationObservedMaxRank = 0;
  simulationTimelineAutoFollow = true;
  simulationTimelineExpectedFirstEewSec = null;
  if (els.simulationProgressTrack) {
    els.simulationProgressTrack.scrollLeft = 0;
  }
  addSimulationTimelineEvent("start", SIMULATION_ORIGIN_OFFSET_SEC, "地震発生", "start");
  const magnitudeReportNumbersCoveredByEew = addExpectedSimulationEewTimelineEvents();
  addExpectedSimulationMagnitudeTimelineEvents(magnitudeReportNumbersCoveredByEew);
  addExpectedSimulationIntensityTimelineEvents();
  if (Number.isFinite(simulationCompleteAtSec)) {
    addSimulationTimelineEvent("complete", simulationCompleteAtSec, "シミュレーション終了", "complete");
  }
  renderSimulationTimelineGuides();
}

function renderSimulationTimelineGuides() {
  const guideHost = document.querySelector("#simulation-progress-guides");
  const total = Number(simulationCompleteAtSec);
  if (!guideHost || !Number.isFinite(total) || total <= 0) {
    guideHost?.replaceChildren();
    return;
  }

  const guides = [];
  const originGuide = document.createElement("span");
  originGuide.style.left = `${SIMULATION_TIMELINE_START_PX + SIMULATION_ORIGIN_OFFSET_SEC * SIMULATION_TIMELINE_PX_PER_SEC}px`;
  originGuide.dataset.label = "0s";
  guides.push(originGuide);
  for (let elapsedSec = 10; elapsedSec + SIMULATION_ORIGIN_OFFSET_SEC <= total; elapsedSec += 10) {
    const guide = document.createElement("span");
    guide.style.left = `${SIMULATION_TIMELINE_START_PX + (elapsedSec + SIMULATION_ORIGIN_OFFSET_SEC) * SIMULATION_TIMELINE_PX_PER_SEC}px`;
    guide.dataset.label = formatSimulationTimelineGuideLabel(elapsedSec);
    guides.push(guide);
  }
  guideHost.replaceChildren(...guides);
}

function formatSimulationTimelineGuideLabel(elapsedSec) {
  const wholeSeconds = Math.max(Math.round(Number(elapsedSec) || 0), 0);
  const minutes = Math.floor(wholeSeconds / 60);
  const seconds = wholeSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return seconds === 0 ? `${minutes}m` : `${minutes}m${seconds}s`;
}

function addExpectedSimulationIntensityTimelineEvents() {
  if (!shindoStationData) return;
  const predictedStations = buildStationIntensityFeatures(shindoStationData).filter((feature) => (
    Number(feature.properties?.predictedIntensityRank) >= 1
  ));
  const predictedMaxRank = predictedStations.reduce(
    (maximum, feature) => Math.max(maximum, Number(feature.properties?.predictedIntensityRank) || 0),
    0,
  );
  if (predictedMaxRank < 1) return;

  const eventRanks = predictedMaxRank >= 5
    ? Array.from({ length: predictedMaxRank - 4 }, (_, index) => index + 5)
    : [predictedMaxRank];
  const preset = getSelectedPreset();
  const usesOldJmaScale = isOldJmaScaleSyntheticPreset(preset);
  const predictedMaxClass = INTENSITY_CLASSES.find((entry) => entry.rank === predictedMaxRank);
  const predictedDisplayClass = predictedMaxClass
    ? getPresetDisplayIntensityClass(predictedMaxClass, predictedMaxClass.min, preset)
    : null;
  const representativeEventsByTime = new Map();
  eventRanks.forEach((rank) => {
    const intensityClass = INTENSITY_CLASSES.find((entry) => entry.rank === rank);
    const observedSec = getFirstPredictedIntensityObservationSec(predictedStations, rank);
    const elapsedSec = Number.isFinite(observedSec)
      ? Math.ceil(observedSec * SIMULATION_DATA_UPDATE_HZ) / SIMULATION_DATA_UPDATE_HZ
      : Infinity;
    if (!intensityClass || !Number.isFinite(elapsedSec)) return;
    representativeEventsByTime.set(elapsedSec, { rank, elapsedSec, intensityClass });
  });

  const emittedOldScaleLabels = new Set();
  [...representativeEventsByTime.values()]
    .sort((left, right) => left.elapsedSec - right.elapsedSec)
    .forEach(({ rank, elapsedSec, intensityClass }) => {
      const displayClass = getPresetDisplayIntensityClass(intensityClass, intensityClass.min, preset);
      if (usesOldJmaScale && emittedOldScaleLabels.has(displayClass.label)) return;
      if (usesOldJmaScale) emittedOldScaleLabels.add(displayClass.label);
      const isFinalMaximum = usesOldJmaScale
        ? displayClass.label === predictedDisplayClass?.label
        : rank === predictedMaxRank;
      addSimulationTimelineEvent(
        `intensity-${rank}`,
        elapsedSec + SIMULATION_ORIGIN_OFFSET_SEC,
        `${isFinalMaximum ? "最大震度" : "震度"}${displayClass.label}を観測`,
        "intensity-planned",
      );
    });
}

function getFirstPredictedIntensityObservationSec(stationFeatures, targetRank) {
  const candidates = stationFeatures.filter((feature) => (
    Number(feature.properties?.predictedIntensityRank) >= targetRank
    && Number.isFinite(Number(feature.properties?.pArrivalSec))
    && Number.isFinite(Number(feature.properties?.intensityCompleteSec))
  ));
  if (!candidates.length) return Infinity;

  let lowerSec = Math.min(...candidates.map((feature) => Number(feature.properties.pArrivalSec)));
  let upperSec = Math.max(...candidates.map((feature) => Number(feature.properties.intensityCompleteSec)));
  const hasReachedTarget = (elapsedSec) => candidates.some((feature) => (
    getCurrentIntensityProperties(feature.properties, elapsedSec).intensityRank >= targetRank
  ));
  if (!hasReachedTarget(upperSec)) return Infinity;

  for (let iteration = 0; iteration < 16; iteration += 1) {
    const middleSec = (lowerSec + upperSec) / 2;
    if (hasReachedTarget(middleSec)) {
      upperSec = middleSec;
    } else {
      lowerSec = middleSec;
    }
  }
  return upperSec;
}

function addExpectedSimulationEewTimelineEvents() {
  const coveredMagnitudeReportNumbers = new Set();
  const preset = getSelectedPreset();
  const presetReports = Array.isArray(preset?.eewReports) ? preset.eewReports : [];
  if (presetReports.length) {
    presetReports.forEach((report, index) => {
      const elapsedSec = Number(report.elapsedSec);
      if (!Number.isFinite(elapsedSec) || elapsedSec < 0) {
        return;
      }
      const reportNumber = Number(report.reportNumber) || index + 1;
      simulationTimelineExpectedFirstEewSec ??= elapsedSec;
      if (Number.isFinite(Number(report.magnitude))) {
        coveredMagnitudeReportNumbers.add(reportNumber);
      }
      addSimulationTimelineEvent(
        `eew-${reportNumber}`,
        elapsedSec + SIMULATION_ORIGIN_OFFSET_SEC,
        formatSimulationEewTimelineLabel(reportNumber, report.magnitude),
        "eew-planned",
      );
    });
    return coveredMagnitudeReportNumbers;
  }

  if (!shindoStationData) {
    return coveredMagnitudeReportNumbers;
  }
  const predictedStations = buildStationIntensityFeatures(shindoStationData).filter(
    (feature) => feature.properties.predictedIntensityRank >= 4 && Number.isFinite(feature.properties.pArrivalSec),
  );
  const predictedMaxRank = predictedStations.reduce(
    (maximum, feature) => Math.max(maximum, Number(feature.properties.predictedIntensityRank) || 0),
    0,
  );
  if (!predictedStations.length || predictedMaxRank < 5) {
    return coveredMagnitudeReportNumbers;
  }

  const reports = simulationMagnitudeReports.length
    ? simulationMagnitudeReports
    : [{
        reportNumber: 1,
        elapsedSec: Math.min(
          ...predictedStations.map(
            (feature) => Number(feature.properties.pArrivalSec) + EARTHQUAKE_MODEL.eewProcessingDelaySec,
          ),
        ),
      }];
  reports.forEach((report, index) => {
    const elapsedSec = Number(report.elapsedSec);
    if (!Number.isFinite(elapsedSec) || elapsedSec < 0) return;
    const reportNumber = Number(report.reportNumber) || index + 1;
    simulationTimelineExpectedFirstEewSec ??= elapsedSec;
    if (Number.isFinite(Number(report.magnitude))) {
      coveredMagnitudeReportNumbers.add(reportNumber);
    }
    addSimulationTimelineEvent(
      `eew-${reportNumber}`,
      elapsedSec + SIMULATION_ORIGIN_OFFSET_SEC,
      formatSimulationEewTimelineLabel(reportNumber, report.magnitude),
      "eew-planned",
    );
  });
  return coveredMagnitudeReportNumbers;
}

function addExpectedSimulationMagnitudeTimelineEvents(coveredReportNumbers = new Set()) {
  let previousMagnitude = null;
  simulationMagnitudeReports.forEach((report) => {
    const reportNumber = Number(report.reportNumber);
    const magnitude = Number(report.magnitude);
    const elapsedSec = Number(report.elapsedSec);
    if (!Number.isFinite(magnitude) || !Number.isFinite(elapsedSec)) return;
    const magnitudeChanged = previousMagnitude == null || Math.abs(magnitude - previousMagnitude) >= 0.05;
    previousMagnitude = magnitude;
    if (!magnitudeChanged || coveredReportNumbers.has(reportNumber)) return;
    addSimulationTimelineEvent(
      `magnitude-${reportNumber}`,
      elapsedSec + SIMULATION_ORIGIN_OFFSET_SEC,
      formatSimulationMagnitudeTimelineLabel(report),
      "magnitude-planned",
    );
  });
}

function formatSimulationEewTimelineLabel(reportNumber, magnitude) {
  const magnitudeText = Number.isFinite(Number(magnitude)) ? ` M${Number(magnitude).toFixed(1)}` : "";
  return `EEW 第${reportNumber}報${magnitudeText}`;
}

function formatSimulationMagnitudeTimelineLabel(report) {
  const magnitude = Number(report?.magnitude);
  if (!Number.isFinite(magnitude)) return "M更新";
  return `M${magnitude.toFixed(1)}${report?.isFinal ? " 確定" : ""}`;
}

function addSimulationTimelineEvent(id, elapsedSec, label, type) {
  const normalizedId = String(id || "");
  if (!normalizedId) {
    return;
  }
  const existingEvent = simulationTimelineEvents.find((item) => item.id === normalizedId);
  if (existingEvent) {
    if (
      (existingEvent.type === "eew-planned" && type === "eew")
      || (existingEvent.type === "intensity-planned" && type === "intensity")
      || (existingEvent.type === "magnitude-planned" && type === "magnitude")
    ) {
      existingEvent.label = String(label || "");
      existingEvent.type = type;
      renderSimulationTimelineEvents();
    } else if (normalizedId === "complete" && type === "complete") {
      existingEvent.elapsedSec = Math.max(Number(elapsedSec) || 0, 0);
      existingEvent.label = String(label || "");
      renderSimulationTimelineEvents();
    }
    return;
  }
  if (
    state.simulationRunning
    && (type === "eew" || type === "intensity" || type === "magnitude")
  ) {
    return;
  }
  simulationTimelineEvents.push({
    id: normalizedId,
    elapsedSec: Math.max(Number(elapsedSec) || 0, 0),
    label: String(label || ""),
    type: String(type || "event"),
  });
  renderSimulationTimelineEvents();
}

function renderSimulationTimelineEvents() {
  if (!els.simulationProgressEvents) {
    return;
  }
  const sortedEvents = [...simulationTimelineEvents]
    .sort((left, right) => left.elapsedSec - right.elapsedSec);
  const existingNodes = new Map(
    [...els.simulationProgressEvents.children].map((node) => [node.dataset.timelineEventId, node]),
  );
  const activeIds = new Set();
  const orderedNodes = [];
  sortedEvents.forEach((item, index) => {
    let event = existingNodes.get(item.id);
    if (!event) {
      event = document.createElement("span");
      event.dataset.timelineEventId = item.id;
      event.append(document.createElement("b"));
    }
    activeIds.add(item.id);
    const renderType = getSimulationTimelineEventRenderType(item);
    event.className = `simulation-timeline-event is-${renderType} ${index % 2 ? "is-lower" : "is-upper"}`;
    event.style.left = `${Math.round(SIMULATION_TIMELINE_START_PX + item.elapsedSec * SIMULATION_TIMELINE_PX_PER_SEC)}px`;
    const labelNode = event.querySelector("b") ?? event.appendChild(document.createElement("b"));
    labelNode.textContent = item.label;
    orderedNodes.push(event);
  });
  [...els.simulationProgressEvents.children].forEach((node) => {
    if (!activeIds.has(node.dataset.timelineEventId)) {
      node.remove();
    }
  });
  orderedNodes.forEach((event, index) => {
    const nodeAtIndex = els.simulationProgressEvents.children[index] || null;
    if (nodeAtIndex !== event) {
      els.simulationProgressEvents.insertBefore(event, nodeAtIndex);
    }
  });
}

function getSimulationTimelineEventRenderType(item) {
  const type = String(item?.type || "event");
  if (type.endsWith("-planned") && simulationTimelineElapsedSec >= Number(item?.elapsedSec)) {
    return type.slice(0, -"-planned".length);
  }
  return type;
}

function syncSimulationTimelineEventStates() {
  if (!els.simulationProgressEvents) return;
  const existingNodes = new Map(
    [...els.simulationProgressEvents.children].map((node) => [node.dataset.timelineEventId, node]),
  );
  simulationTimelineEvents.forEach((item) => {
    const event = existingNodes.get(item.id);
    if (!event) return;
    const plannedType = String(item.type || "event");
    const renderType = getSimulationTimelineEventRenderType(item);
    event.classList.toggle(`is-${plannedType}`, renderType === plannedType);
    if (renderType !== plannedType) {
      event.classList.add(`is-${renderType}`);
    } else if (plannedType.endsWith("-planned")) {
      event.classList.remove(`is-${plannedType.slice(0, -"-planned".length)}`);
    }
  });
}

function recordSimulationMaxIntensityEvent(elapsedSec, maxRank, label) {
  const predictedMaxRank = Number(getPredictedMaximumIntensity()?.rank) || 0;
  const preset = getSelectedPreset();
  const usesOldJmaScale = isOldJmaScaleSyntheticPreset(preset);
  const predictedMaxClass = INTENSITY_CLASSES.find((entry) => entry.rank === predictedMaxRank);
  const predictedDisplayClass = predictedMaxClass
    ? getPresetDisplayIntensityClass(predictedMaxClass, predictedMaxClass.min, preset)
    : null;
  if (
    !document.body.classList.contains("simulation-session-active")
    || !Number.isFinite(elapsedSec)
    || maxRank < 1
    || maxRank <= simulationTimelineMaxRank
  ) {
    return;
  }
  const firstRank = predictedMaxRank >= 5
    ? Math.max(simulationTimelineMaxRank + 1, 5)
    : predictedMaxRank;
  const lastRank = Math.min(maxRank, predictedMaxRank);
  if (firstRank > lastRank) {
    return;
  }
  const intensityClass = INTENSITY_CLASSES.find((entry) => entry.rank === lastRank);
  if (intensityClass) {
    const displayClass = getPresetDisplayIntensityClass(intensityClass, intensityClass.min, preset);
    const previousClass = INTENSITY_CLASSES.find((entry) => entry.rank === simulationTimelineMaxRank);
    const previousDisplayClass = previousClass
      ? getPresetDisplayIntensityClass(previousClass, previousClass.min, preset)
      : null;
    const isDuplicateOldScaleLevel = usesOldJmaScale
      && previousDisplayClass?.label === displayClass.label;
    if (!isDuplicateOldScaleLevel) {
      const isFinalMaximum = usesOldJmaScale
        ? displayClass.label === predictedDisplayClass?.label
        : lastRank === predictedMaxRank;
      const eventLabel = usesOldJmaScale
        ? displayClass.label
        : (isFinalMaximum ? label : intensityClass.label);
      addSimulationTimelineEvent(
        `intensity-${lastRank}`,
        elapsedSec + SIMULATION_ORIGIN_OFFSET_SEC,
        `${isFinalMaximum ? "最大震度" : "震度"}${eventLabel}を観測`,
        "intensity",
      );
    }
  }
  simulationTimelineMaxRank = lastRank;
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
  const { stationFeatures, maxRank: currentMaxRank } = getObservedStationSummaryForElapsed(elapsedSec);
  if (Number.isFinite(elapsedSec) && (state.simulationRunning || state.simulationCompleted)) {
    simulationObservedMaxRank = Math.max(simulationObservedMaxRank, currentMaxRank);
  }
  const maxRank = Number.isFinite(elapsedSec) && (state.simulationRunning || state.simulationCompleted)
    ? simulationObservedMaxRank
    : currentMaxRank;
  const maxClass = INTENSITY_CLASSES.find((item) => item.rank === maxRank) ?? INTENSITY_CLASSES[0];
  const displayMaxClass = getPresetDisplayIntensityClass(
    maxClass,
    maxClass.min,
    getSelectedPreset(),
  );
  const hasObservedIntensity = stationFeatures.length > 0;
  recordSimulationMaxIntensityEvent(elapsedSec, maxRank, displayMaxClass.label);

  setTextContentIfChanged(
    els.simulationMaxIntensity,
    state.simulationRunning && Number.isFinite(elapsedSec) && !hasObservedIntensity ? "-" : displayMaxClass.label,
  );
  applySimulationIntensityCard(
    els.simulationMaxIntensity,
    state.simulationRunning && Number.isFinite(elapsedSec) && !hasObservedIntensity ? null : displayMaxClass,
  );
  setTextContentIfChanged(els.simulationMagnitude, getSimulationTicketMagnitude().toFixed(1));
  const [displayLongitude, displayLatitude] = getDisplayedEpicenterCoordinates();
  setTextContentIfChanged(els.simulationEpicenter, `${displayLatitude.toFixed(3)}, ${displayLongitude.toFixed(3)}`);
  setTextContentIfChanged(els.simulationRegionName, state.epicenterName);
  setTextContentIfChanged(els.simulationDepth, formatDepth(state.depthKm));
  setTextContentIfChanged(els.maxIntensityOutput, formatSetupMaxIntensityLabel(state.maxIntensityLabel));
  updateCurrentLocationForecast(elapsedSec);
  updateSimulationMaxAreaList(elapsedSec, maxRank);
  updateMaxStationList(stationFeatures, elapsedSec);
  if (!simulationSeeking) {
    announceSimulationUpdates(elapsedSec);
  }
}

function getSimulationTicketMagnitude() {
  const presetMagnitude = Number(getSelectedPreset()?.magnitude);
  if (state.simulationCompleted && Number.isFinite(presetMagnitude)) {
    return presetMagnitude;
  }
  if (state.simulationRunning && Number.isFinite(Number(simulationDisplayedMagnitude))) {
    return Number(simulationDisplayedMagnitude);
  }
  return state.magnitude;
}

function applySimulationIntensityCard(element, intensityClass) {
  if (!element) {
    return;
  }
  const hasIntensity = Boolean(intensityClass && intensityClass.rank > 0);
  element.dataset.intensityRank = String(intensityClass?.rank ?? 0);
  element.classList.toggle("has-intensity", hasIntensity);
  element.style.setProperty("--simulation-intensity-color", intensityClass?.color ?? "rgba(255, 255, 255, 0.1)");
  element.style.setProperty("--simulation-intensity-text", intensityClass?.textColor ?? "#ffffff");
  const summary = element.closest(".simulation-summary");
  if (summary) {
    summary.classList.add("has-observed-intensity");
    summary.style.setProperty(
      "--simulation-ticket-intensity-color",
      intensityClass?.rank === 1 || !hasIntensity ? INTENSITY_INFORMATION_GRAY : intensityClass.color,
    );
    summary.style.setProperty(
      "--simulation-ticket-intensity-text",
      intensityClass?.textColor ?? "#1f2937",
    );
  }
}

function updateSimulationMaxAreaList(elapsedSec, stableMaxRank = null) {
  if (!els.simulationMaxAreaList || !localAreaData?.features?.length) {
    return;
  }
  const sourceAreaFeatures = (areaDataCache.data?.features ?? buildIntensityAreaData(localAreaData, elapsedSec))
    .filter((feature) => Number(feature.properties?.intensityRank) > 0);
  const stationMaxRank = Number.isFinite(stableMaxRank)
    ? stableMaxRank
    : getObservedStationSummaryForElapsed(elapsedSec).maxRank;
  const originalAreaMaxRank = sourceAreaFeatures.reduce(
    (maximum, feature) => Math.max(maximum, Number(feature.properties.intensityRank) || 0),
    0,
  );
  const areaFeatures = sourceAreaFeatures
    .map((feature) => {
      const originalRank = Number(feature.properties.intensityRank) || 0;
      const synchronizedRank = stationMaxRank > 0
        ? (originalRank === originalAreaMaxRank ? stationMaxRank : Math.min(originalRank, stationMaxRank))
        : 0;
      const synchronizedClass = INTENSITY_CLASSES.find((item) => item.rank === synchronizedRank) ?? INTENSITY_CLASSES[0];
      return {
        ...feature,
        properties: {
          ...feature.properties,
          intensityRank: synchronizedRank,
          intensityLabel: synchronizedClass.label,
          intensityColor: synchronizedClass.color,
        },
      };
    })
    .filter((feature) => Number(feature.properties.intensityRank) > 0)
    .sort((left, right) => (
      Number(right.properties.intensityRank) - Number(left.properties.intensityRank)
      || Number(right.properties.intensityValue) - Number(left.properties.intensityValue)
      || String(left.properties.name).localeCompare(String(right.properties.name), "ja")
    ));
  const signature = `${state.intensityColorScheme}|${areaFeatures
    .map((feature) => `${feature.properties.name}:${feature.properties.intensityRank}:${feature.properties.intensityLabel}`)
    .join("|")}`;
  if (signature === simulationMaxAreaListSignature) {
    return;
  }
  simulationMaxAreaListSignature = signature;
  if (!areaFeatures.length) {
    const empty = document.createElement("li");
    empty.className = "simulation-area-empty";
    empty.textContent = "震度1以上の細分区域はまだありません";
    els.simulationMaxAreaList.replaceChildren(empty);
    return;
  }
  const items = areaFeatures.map((feature) => {
    const properties = feature.properties;
    const intensityClass = INTENSITY_CLASSES.find((item) => item.rank === properties.intensityRank);
    const item = document.createElement("li");
    const badge = document.createElement("b");
    badge.className = "simulation-list-intensity-card";
    badge.textContent = properties.intensityLabel;
    badge.style.setProperty("--simulation-intensity-color", intensityClass?.color ?? properties.intensityColor);
    badge.style.setProperty("--simulation-intensity-text", intensityClass?.textColor ?? "#ffffff");
    const name = document.createElement("span");
    name.textContent = properties.name || "名称不明";
    item.append(badge, name);
    return item;
  });
  els.simulationMaxAreaList.replaceChildren(...items);
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
  if (!els.maxStationList) {
    return;
  }
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
  if (!els.maxStationList) {
    return;
  }
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
    const contentSignature = `${state.intensityColorScheme}|${properties.name}|${properties.intensityLabel}|${measuredIntensityText}`;
    if (item.dataset.contentSignature !== contentSignature) {
      item.dataset.contentSignature = contentSignature;
      const intensityClass = INTENSITY_CLASSES.find((candidate) => candidate.rank === properties.intensityRank);
      const badge = document.createElement("b");
      badge.className = "simulation-list-intensity-card";
      badge.textContent = properties.intensityLabel;
      badge.style.setProperty("--simulation-intensity-color", intensityClass?.color ?? properties.intensityColor);
      badge.style.setProperty("--simulation-intensity-text", intensityClass?.textColor ?? "#ffffff");
      const name = document.createElement("span");
      name.textContent = `${properties.name}${measuredIntensityText}`;
      item.replaceChildren(badge, name);
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

  const observedStations = buildStationIntensityFeatures(shindoStationData).filter((feature) => (
    Number(feature.properties?.predictedIntensityRank) >= 1
    && Number.isFinite(Number(feature.properties?.intensityCompleteSec))
  ));
  if (observedStations.length === 0) {
    if (isOldJmaScaleSyntheticPreset(getSelectedPreset())) {
      return Infinity;
    }
    return SIMULATION_ORIGIN_OFFSET_SEC + SIMULATION_END_GRACE_SEC;
  }

  const latestEndSec = observedStations.reduce(
    (latest, feature) => Math.max(latest, Number(feature.properties.intensityCompleteSec) || 0),
    0,
  );
  return SIMULATION_ORIGIN_OFFSET_SEC + latestEndSec + SIMULATION_END_GRACE_SEC;
}

function refreshSimulationCompletionSchedule() {
  const nextCompleteAtSec = getSimulationCompleteAtSec();
  if (!Number.isFinite(nextCompleteAtSec)) {
    return false;
  }

  simulationCompleteAtSec = nextCompleteAtSec;
  addSimulationTimelineEvent("complete", simulationCompleteAtSec, "シミュレーション終了", "complete");
  renderSimulationTimelineGuides();
  return true;
}

function setWaveRadiusData(pRadiusKm, sRadiusKm) {
  const pSource = map?.getSource("p-wave");
  const sSource = map?.getSource("s-wave");
  if (isFaultAreaActive()) {
    waveCanvasRadiusState = { p: 0, s: 0 };
    scheduleStationCanvasRender();
    if (pSource && waveRenderRadiusCache.p !== 0) {
      setGeoJsonSourceData("p-wave", emptyFeatureCollection());
    }
    if (sSource && waveRenderRadiusCache.s !== 0) {
      setGeoJsonSourceData("s-wave", emptyFeatureCollection());
    }
    waveRenderRadiusCache = { p: 0, s: 0 };
    return;
  }
  const nextP = getRenderableWaveRadius(pRadiusKm);
  const nextS = getRenderableWaveRadius(sRadiusKm);

  waveCanvasRadiusState = {
    p: Number.isFinite(pRadiusKm) ? Math.max(pRadiusKm, 0) : 0,
    s: Number.isFinite(sRadiusKm) ? Math.max(sRadiusKm, 0) : 0,
  };
  scheduleStationCanvasRender();

  if (pSource && nextP !== waveRenderRadiusCache.p) {
    setGeoJsonSourceData("p-wave", wavePolygonFeatureCollection(nextP, EARTHQUAKE_MODEL.pWaveVelocityKmPerSec));
    waveRenderRadiusCache.p = nextP;
  }

  if (sSource && nextS !== waveRenderRadiusCache.s) {
    setGeoJsonSourceData("s-wave", wavePolygonFeatureCollection(nextS, EARTHQUAKE_MODEL.sWaveVelocityKmPerSec));
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

function wavePolygonFeatureCollection(radiusKm, velocityKmPerSec = EARTHQUAKE_MODEL.pWaveVelocityKmPerSec) {
  if (!Number.isFinite(radiusKm) || radiusKm <= 0) {
    return emptyFeatureCollection();
  }

  const elapsedSec = radiusKm / velocityKmPerSec;
  const faultSamples = isFaultSimulationActive() ? getFaultSourceSamples() : [];
  const waveSources = faultSamples.length
    ? faultSamples
        .map((sample) => ({
          center: sample.coordinates,
          radiusKm: Math.max((elapsedSec - sample.ruptureDelaySec) * velocityKmPerSec, 0),
        }))
        .filter((source) => source.radiusKm > 0)
    : [{ center: simulationEpicenter, radiusKm }];
  return {
    type: "FeatureCollection",
    features: waveSources.map((source) => ({
        type: "Feature",
        properties: {
          radiusKm: Number(source.radiusKm.toFixed(2)),
        },
        geometry: {
          type: "Polygon",
          coordinates: [buildGeodesicCircle(source.center, source.radiusKm, 72)],
        },
      })),
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

async function fetchActiveFaultCatalogFromWorker() {
  const workerUrl = await getWorkerBaseUrl();
  if (!workerUrl) {
    throw new Error("Worker URL is not configured");
  }
  const response = await fetch(`${workerUrl}/active-faults?limit=700`);
  if (!response.ok) {
    throw new Error(`Active fault catalog request failed: ${response.status}`);
  }
  const payload = await response.json();
  const segments = Array.isArray(payload?.segments) ? payload.segments : [];
  if (!segments.length) {
    throw new Error("Active fault catalog is empty");
  }
  return segments.map((segment) => ({
    id: String(segment.id || ""),
    name: String(segment.name || segment.id || ""),
    description: String(segment.description || ""),
    source: String(segment.source || ""),
    sourceUrl: String(segment.sourceUrl || ""),
    pointCount: Number(segment.pointCount) || 0,
  })).filter((segment) => segment.id);
}

async function fetchActiveFaultDetailFromWorker(segmentId) {
  const workerUrl = await getWorkerBaseUrl();
  if (!workerUrl) {
    throw new Error("Worker URL is not configured");
  }
  const response = await fetch(`${workerUrl}/active-faults/${encodeURIComponent(segmentId)}`);
  if (!response.ok) {
    throw new Error(`Active fault detail request failed: ${response.status}`);
  }
  const segment = (await response.json())?.segment;
  const path = Array.isArray(segment?.path)
    ? segment.path.map((point) => [Number(point?.[0]), Number(point?.[1])])
      .filter(([longitude, latitude]) => Number.isFinite(longitude) && Number.isFinite(latitude))
    : [];
  if (path.length < 2) {
    throw new Error("Active fault detail has no usable path");
  }
  return {
    id: String(segment.id || segmentId),
    name: String(segment.name || segmentId),
    description: String(segment.description || ""),
    source: String(segment.source || "産総研 活断層データベース"),
    sourceUrl: String(segment.sourceUrl || ""),
    path,
  };
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

function shouldSuppressWorldJapanCoordinate(point) {
  return JAPAN_WORLD_MAP_SUPPRESS_BOUNDS.some((bounds) => pointInBounds(point, bounds));
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
    const elapsedSec = getSimulationModelElapsedSec();
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

function invalidateIntensityEstimateCache(options = {}) {
  const previousSimulationCompleteAtSec = simulationCompleteAtSec;
  stationIntensityFeatureCache = null;
  submarineObservationFeatureCache = { key: "", data: null, features: [] };
  submarineObservationIntensityCache = { key: "", features: [] };
  predictedMaximumCache = null;
  presetObservationLookupCache = null;
  presetStationObservationMatchCache = { presetId: "", matches: new Map() };
  hyogoNanbuSyntheticStationCache = null;
  currentLocationForecastCache = null;
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
  faultSourceSampleCache = { key: "", samples: [] };
  localAreaStationSnapshotCache = null;
  stationSourceInputDataRef = null;
  submarineStationCanvasFeatureCache = { data: null, features: [] };
  simulationRenderBucket = -1;
  simulationStationRenderBucket = -1;
  maxStationListRenderBucket = null;
  maxStationListRenderSignature = "";
  maxStationListItemCache.clear();
  maxStationListEmptyItem = null;
  cancelPendingMaxStationListRender();
  if (state.simulationRunning) {
    simulationCompleteAtSec = previousSimulationCompleteAtSec;
    if (!options.preserveSimulationSchedule) {
      refreshSimulationCompletionSchedule();
    }
  } else {
    simulationCompleteAtSec = options.preserveSimulationSchedule ? previousSimulationCompleteAtSec : null;
  }
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
    els.simulationStart.disabled = false;
    els.simulationStart.textContent = "開始";
    els.simulationStart.title = "";
    return;
  }

  if (isSimulationMapDataLoading()) {
    els.simulationStart.disabled = false;
    els.simulationStart.textContent = "開始";
    els.simulationStart.title = "";
    return;
  }

  if (presetDetailLoadingId) {
    els.simulationStart.disabled = true;
    els.simulationStart.textContent = "プリセットを読み込み中...";
    els.simulationStart.title = "プリセット地震の詳細データを読み込んでいます";
    return;
  }

  if (
    isFaultSimulationActive()
    && state.faultModelId === "active-fault"
    && selectedActiveFaultPath.length < 2
  ) {
    els.simulationStart.disabled = true;
    els.simulationStart.textContent = "活断層を選択してください";
    els.simulationStart.title = "活動セグメントを選択すると開始できます";
    return;
  }

  const predictedMaximum = getPredictedMaximumIntensity();
  const canStart =
    Number.isFinite(predictedMaximum.value) && predictedMaximum.rank >= 1;

  els.simulationStart.disabled = !canStart;
  els.simulationStart.textContent = "開始";
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
      const elapsedSec = getSimulationModelElapsedSec(getSimulationElapsedSec());
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
  const lngLat = getDisplayedEpicenterCoordinates();
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
  const lngLat = getDisplayedEpicenterCoordinates();

  if (!epicenterMarker) {
    const markerElement = document.createElement("span");
    markerElement.className = "epicenter-marker-shell";
    markerElement.tabIndex = 0;
    markerElement.setAttribute("role", "img");
    markerElement.setAttribute("aria-label", "震源地");
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

    const getEpicenterEventLngLat = (event) => {
      const rect = map.getContainer().getBoundingClientRect();
      return map.unproject([event.clientX - rect.left, event.clientY - rect.top]);
    };

    const openEpicenterHoverPopup = (event) => {
      if (state.epicenterEditEnabled) {
        epicenterHoverPopup.remove();
        return;
      }
      const popupLngLat = event ? getEpicenterEventLngLat(event) : getDisplayedEpicenterCoordinates();
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
      epicenterHoverLngLat = null;
      epicenterHoverPopup.remove();
      markerElement.blur();
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
      if (isFaultSimulationActive()) {
        updateSimulationFaultSource();
      }
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
    `<span>震央：${escapeHtml(state.epicenterName)}</span>`,
    `<span>マグニチュード：${state.magnitude.toFixed(1)}</span>`,
    `<span>深さ：${escapeHtml(formatDepth(state.depthKm))}</span>`,
  ].join("");
}

function updateActiveEpicenterPopups(lngLat = getDisplayedEpicenterCoordinates()) {
  if (state.epicenterEditEnabled) {
    closeEpicenterInfoPopups();
    return;
  }

  if (epicenterHoverPopup?.isOpen?.()) {
    epicenterHoverPopup
      .setLngLat(epicenterHoverLngLat ?? lngLat)
      .setHTML(buildEpicenterPopupHtml());
  }

}

function closeEpicenterInfoPopups() {
  epicenterHoverLngLat = null;
  epicenterHoverPopup?.remove();
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
    if (shouldSyncAreaSourceData()) {
      const historyMode = document.body.dataset.activeBottomTab === "bottom-history-tab";
      const updated = historyMode
        ? setGeoJsonSourceData("jma-local-areas", nextAreaData)
        : applyIntensityAreaFeatureStates(nextAreaData);
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
  return state.simulationRunning ? getSimulationModelElapsedSec() : Infinity;
}

function getSubmarineObservationElapsedSec() {
  return state.simulationRunning ? getSimulationModelElapsedSec() : Infinity;
}

function getIntensitySourceCacheKey(elapsedSec = Infinity) {
  return [
    toSimulationBucket(elapsedSec),
    Number(state.longitude).toFixed(4),
    Number(state.latitude).toFixed(4),
    Number(state.depthKm).toFixed(1),
    Number(state.magnitude).toFixed(1),
    getSelectedPreset()?.id ?? "",
    state.sourceModel,
    state.faultModelId,
    state.faultNankaiCase,
    state.activeFaultSegmentId,
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
    state.sourceModel,
    state.faultModelId,
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
        intensityBoundaryColor: getIntensityBoundaryColor(displayedIntensityClass),
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
    applyFaultRuptureEewProgressGate(features, elapsedSec);
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
  if (Number.isFinite(elapsedSec) && (state.simulationRunning || state.simulationCompleted)) {
    simulationObservedMaxRank = Math.max(simulationObservedMaxRank, displayedMaxClass.rank);
  }
  const stableDisplayedMaxClass = Number.isFinite(elapsedSec) && (state.simulationRunning || state.simulationCompleted)
    ? (INTENSITY_CLASSES.find((item) => item.rank === simulationObservedMaxRank) ?? displayedMaxClass)
    : displayedMaxClass;
  state.maxIntensityLabel = stableDisplayedMaxClass.label;

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

function applyFaultRuptureEewProgressGate(features, elapsedSec = Infinity) {
  if (!isFaultSimulationActive() || !Number.isFinite(elapsedSec)) {
    return;
  }
  const samples = getFaultSourceSamples();
  if (samples.length === 0) {
    return;
  }
  features.forEach((feature) => {
    if (!feature.properties.eewWarning) {
      return;
    }
    const polygons = getFeatureIntensityDistancePolygons(feature);
    let nearestDistanceKm = Infinity;
    let nearestRuptureDelaySec = Infinity;
    samples.forEach((sample) => {
      const distanceKm = getNearestPointOnFeature(sample.coordinates, feature, { polygons }).distanceKm;
      if (distanceKm < nearestDistanceKm) {
        nearestDistanceKm = distanceKm;
        nearestRuptureDelaySec = sample.ruptureDelaySec;
      }
    });
    feature.properties.faultRuptureAvailableSec = Number(nearestRuptureDelaySec.toFixed(2));
    if (elapsedSec < nearestRuptureDelaySec) {
      feature.properties.eewWarning = false;
    }
  });
}

function getFaultRuptureCompletionSec() {
  if (!isFaultSimulationActive()) {
    return 0;
  }
  return getFaultSourceSamples().reduce(
    (maximum, sample) => Math.max(maximum, Number(sample.ruptureDelaySec) || 0),
    0,
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

  const magnitudeReport = getSimulationMagnitudeReportForElapsed(elapsedSec);
  const scheduledReportNumber = Number(magnitudeReport?.reportNumber) || 1;
  state.eewSyntheticReportNumber = Math.max(state.eewSyntheticReportNumber, scheduledReportNumber);
  state.eewReportAreaKeySignature = nextSignature;
  state.eewWarningReportNumber = state.eewSyntheticReportNumber;
  const faultRuptureComplete = !isFaultSimulationActive()
    || elapsedSec >= getFaultRuptureCompletionSec();
  state.eewWarningFinalReport = magnitudeReport?.isFinal === true && faultRuptureComplete;
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
  const areaIndexByName = new Map(
    geojson.features.map((feature, index) => [
      String(feature.properties?.name ?? "").normalize("NFKC").replace(/\s+/g, "").trim(),
      index,
    ]),
  );
  const stationsWithoutPrecomputedArea = [];

  stationFeatures.forEach((stationFeature) => {
    const areaName = String(stationFeature.properties?.areaName ?? "")
      .normalize("NFKC")
      .replace(/\s+/g, "")
      .trim();
    const areaIndex = areaIndexByName.get(areaName);
    if (areaIndex != null) {
      stationIdsByArea[areaIndex].push(stationFeature.properties.id);
      return;
    }
    stationsWithoutPrecomputedArea.push(stationFeature);
  });

  // Old/synthetic station data may not carry the precomputed JMA area name.
  // Keep spatial lookup only for those exceptional records.
  stationsWithoutPrecomputedArea.forEach((stationFeature) => {
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
  return stationFeatures.map((feature) => (
    `${feature.properties?.id ?? ""}@${feature.properties?.areaName ?? ""}`
  )).join("|");
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
  const nearSourceFactor = clamp((220 - distanceKm) / 160, 0, 1);
  const severeShakingFactor = clamp((finalIntensity - 5.0) / 1.2, 0, 1);
  // Do not paint widespread intensity-3 areas from the first P-wave motion alone.
  // A rank-3 P-wave remains possible close to a source that will ultimately shake severely.
  const pWaveDisplayCap = 2.42 + nearSourceFactor * severeShakingFactor * 0.58;
  return clamp(target, 0, Math.min(finalIntensity * 0.72, pWaveCeiling, pWaveDisplayCap));
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
      const actualObservation = getPresetStationObservation(station);
      if (preset && !actualObservation) {
        return null;
      }
      const ground = getGroundModelAt(station.longitude, station.latitude);
      const travelMetrics = isFaultSimulationActive()
        ? getFaultTravelMetrics(station.longitude, station.latitude)
        : null;
      const intensityValue = actualObservation
        ? actualObservation.intensityValue
        : estimateIntensityAtPoint(station.longitude, station.latitude, null, travelMetrics);
      const intensityClass = toJmaIntensityClass(intensityValue);
      const epicentralDistanceKm = travelMetrics?.surfaceDistanceKm ?? haversineKilometers(
          [state.longitude, state.latitude],
          [station.longitude, station.latitude],
        );
      const hypocentralDistanceKm = travelMetrics?.hypocentralDistanceKm
        ?? Math.hypot(epicentralDistanceKm, state.depthKm);
      const pArrivalSec = travelMetrics?.pArrivalSec
        ?? epicentralDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec;
      const sArrivalSec = travelMetrics?.sArrivalSec
        ?? epicentralDistanceKm / EARTHQUAKE_MODEL.sWaveVelocityKmPerSec;
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
      const travelMetrics = isFaultSimulationActive() ? getFaultTravelMetrics(lon, lat) : null;
      const intensityValue = estimateIntensityAtPoint(lon, lat, null, travelMetrics);
      const intensityClass = toJmaIntensityClass(intensityValue);
      const epicentralDistanceKm = travelMetrics?.surfaceDistanceKm
        ?? haversineKilometers([state.longitude, state.latitude], [lon, lat]);
      const pArrivalSec = travelMetrics?.pArrivalSec
        ?? epicentralDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec;
      const sArrivalSec = travelMetrics?.sArrivalSec
        ?? epicentralDistanceKm / EARTHQUAKE_MODEL.sWaveVelocityKmPerSec;
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
          hypocentralDistanceKm: Number((travelMetrics?.hypocentralDistanceKm
            ?? Math.hypot(epicentralDistanceKm, state.depthKm)).toFixed(1)),
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

function isFaultSimulationActive() {
  return state.sourceModel === "fault";
}

function shouldDisplaySimulationFaultLayer() {
  return isFaultSimulationActive()
    && document.body.dataset.activeBottomTab === "earthquake-tab"
    && !document.body.classList.contains("tool-source-search-mode")
    && !document.body.classList.contains("community-pick-mode");
}

function getSelectedFaultModelPreset(modelId = state.faultModelId) {
  const preset = FAULT_MODEL_PRESETS[modelId];
  if (!preset || modelId !== "nankai-trough") {
    return preset;
  }
  const ruptureCase = NANKAI_RUPTURE_CASES[state.faultNankaiCase] ?? NANKAI_RUPTURE_CASES.full;
  if (state.faultNankaiCase === "full" || !ruptureCase.pathRange) {
    return preset;
  }
  const [pathStart, pathEnd] = ruptureCase.pathRange;
  const [areaStart, areaEnd] = ruptureCase.areaRange;
  return {
    ...preset,
    ...ruptureCase,
    summary: `${ruptureCase.label}として、${ruptureCase.region}の破壊を想定します。`,
    detail: "半割れは南海トラフ想定震源域の一部でM8級の地震が発生する防災対応上のケースです。領域外形は内閣府公表図を基に地図表示用に近似しています。",
    path: preset.path.slice(pathStart, pathEnd ?? undefined),
    areaSides: {
      left: preset.areaSides.left.slice(areaStart, areaEnd ?? undefined),
      right: preset.areaSides.right.slice(areaStart, areaEnd ?? undefined),
    },
  };
}

function isFaultAreaActive() {
  return isFaultSimulationActive() && (
    state.faultModelId === "rectangle"
    || Boolean(getSelectedFaultModelPreset())
    || (state.faultModelId === "active-fault" && selectedActiveFaultPath.length >= 2)
  );
}

function getFaultControlNumber(selector, fallback, minimum, maximum) {
  const value = Number(document.querySelector(selector)?.value);
  return Number.isFinite(value) ? clamp(value, minimum, maximum) : fallback;
}

function getFaultEndpointDirectionLabels(path = getActiveFaultPath()) {
  if (path.length < 2) {
    return { start: "始点側", end: "終点側" };
  }
  const start = path[0];
  const end = path[path.length - 1];
  const meanLatitude = (start[1] + end[1]) / 2;
  const deltaX = (end[0] - start[0]) * Math.cos(toRadians(meanLatitude));
  const deltaY = end[1] - start[1];
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return deltaX >= 0
      ? { start: "西側", end: "東側" }
      : { start: "東側", end: "西側" };
  }
  return deltaY >= 0
    ? { start: "南側", end: "北側" }
    : { start: "北側", end: "南側" };
}

function syncFaultRuptureControls() {
  const originSelect = document.querySelector("#fault-rupture-origin");
  const directionSelect = document.querySelector("#fault-rupture-direction");
  const hint = document.querySelector("#fault-rupture-settings-hint");
  if (!originSelect || !directionSelect) {
    return;
  }
  const labels = getFaultEndpointDirectionLabels();
  const startOption = originSelect.querySelector('option[value="start"]');
  const endOption = originSelect.querySelector('option[value="end"]');
  const forwardOption = directionSelect.querySelector('option[value="forward"]');
  const reverseOption = directionSelect.querySelector('option[value="reverse"]');
  startOption?.replaceChildren(`始点（${labels.start}）`);
  endOption?.replaceChildren(`終点（${labels.end}）`);
  forwardOption?.replaceChildren(`終点（${labels.end}）へ`);
  reverseOption?.replaceChildren(`始点（${labels.start}）へ`);

  const origin = originSelect.value || "center";
  if (origin === "start") {
    directionSelect.value = "forward";
    directionSelect.disabled = true;
    hint?.replaceChildren(`始点は${labels.start}です。破壊は終点（${labels.end}）へ進みます。`);
    return;
  }
  if (origin === "end") {
    directionSelect.value = "reverse";
    directionSelect.disabled = true;
    hint?.replaceChildren(`終点は${labels.end}です。破壊は始点（${labels.start}）へ進みます。`);
    return;
  }
  directionSelect.disabled = false;
  hint?.replaceChildren(`始点は${labels.start}、終点は${labels.end}です。`);
}

function getResolvedFaultRuptureSettings() {
  const origin = document.querySelector("#fault-rupture-origin")?.value || "center";
  const selectedDirection = document.querySelector("#fault-rupture-direction")?.value || "bilateral";
  const direction = origin === "start" ? "forward" : origin === "end" ? "reverse" : selectedDirection;
  return { origin, direction };
}

function destinationPointKilometers(center, distanceKm, bearingDegrees) {
  const angularDistance = distanceKm / EARTH_RADIUS_KM;
  const bearing = toRadians(bearingDegrees);
  const latitude = toRadians(center[1]);
  const longitude = toRadians(center[0]);
  const destinationLatitude = Math.asin(
    Math.sin(latitude) * Math.cos(angularDistance)
      + Math.cos(latitude) * Math.sin(angularDistance) * Math.cos(bearing),
  );
  const destinationLongitude = longitude + Math.atan2(
    Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latitude),
    Math.cos(angularDistance) - Math.sin(latitude) * Math.sin(destinationLatitude),
  );
  return [normalizeLongitude(toDegrees(destinationLongitude)), toDegrees(destinationLatitude)];
}

function buildActiveFaultCatalog(data) {
  const groups = new Map();
  (data?.features ?? []).forEach((feature) => {
    const id = String(feature.properties?.segment_id ?? "").trim();
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
  return [...groups.values()].sort((left, right) => (
    left.name.localeCompare(right.name, "ja") || left.id.localeCompare(right.id)
  ));
}

function buildRepresentativeActiveFaultPath(entry) {
  const coordinateMap = new Map();
  (entry?.features ?? []).forEach((feature) => {
    (feature.geometry?.coordinates ?? []).forEach((coordinate) => {
      const longitude = Number(coordinate?.[0]);
      const latitude = Number(coordinate?.[1]);
      if (Number.isFinite(longitude) && Number.isFinite(latitude)) {
        coordinateMap.set(`${longitude.toFixed(5)},${latitude.toFixed(5)}`, [longitude, latitude]);
      }
    });
  });
  const coordinates = [...coordinateMap.values()];
  if (coordinates.length < 2) {
    return coordinates;
  }

  const meanLongitude = coordinates.reduce((sum, point) => sum + point[0], 0) / coordinates.length;
  const meanLatitude = coordinates.reduce((sum, point) => sum + point[1], 0) / coordinates.length;
  const longitudeScale = Math.cos(toRadians(meanLatitude));
  let covarianceXX = 0;
  let covarianceXY = 0;
  let covarianceYY = 0;
  coordinates.forEach((point) => {
    const x = (point[0] - meanLongitude) * longitudeScale;
    const y = point[1] - meanLatitude;
    covarianceXX += x * x;
    covarianceXY += x * y;
    covarianceYY += y * y;
  });
  const axisAngle = 0.5 * Math.atan2(2 * covarianceXY, covarianceXX - covarianceYY);
  const axisX = Math.cos(axisAngle);
  const axisY = Math.sin(axisAngle);
  return coordinates.sort((left, right) => {
    const leftProjection = (left[0] - meanLongitude) * longitudeScale * axisX
      + (left[1] - meanLatitude) * axisY;
    const rightProjection = (right[0] - meanLongitude) * longitudeScale * axisX
      + (right[1] - meanLatitude) * axisY;
    return leftProjection - rightProjection;
  });
}

function getActiveFaultPath() {
  if (!isFaultSimulationActive()) {
    return [];
  }
  const preset = getSelectedFaultModelPreset();
  if (preset?.path?.length >= 2) {
    return preset.path.map((point) => [...point]);
  }
  if (state.faultModelId === "active-fault") {
    return selectedActiveFaultPath.map((point) => [...point]);
  }
  const lengthKm = getFaultControlNumber("#fault-length-input", 30, 1, 520);
  const strikeDegrees = getFaultControlNumber("#fault-strike-input", 0, 0, 359);
  const center = [state.longitude, state.latitude];
  return [
    destinationPointKilometers(center, lengthKm / 2, strikeDegrees + 180),
    destinationPointKilometers(center, lengthKm / 2, strikeDegrees),
  ];
}

function getFaultSourceSamples() {
  const ruptureSpeed = getFaultControlNumber("#fault-rupture-speed", 2.8, 0.5, 4);
  const { origin, direction } = getResolvedFaultRuptureSettings();
  const cacheKey = [
    state.faultModelId,
    state.faultNankaiCase,
    state.activeFaultSegmentId,
    state.longitude.toFixed(4),
    state.latitude.toFixed(4),
    ruptureSpeed,
    direction,
    origin,
  ].join("|");
  if (faultSourceSampleCache.key === cacheKey) {
    return faultSourceSampleCache.samples;
  }
  const path = getActiveFaultPath();
  if (path.length < 2) {
    return [];
  }
  const segmentLengths = path.slice(1).map((point, index) => haversineKilometers(path[index], point));
  const totalLengthKm = segmentLengths.reduce((sum, length) => sum + length, 0);
  const originAlongKm = origin === "start" ? 0 : origin === "end" ? totalLengthKm : totalLengthKm / 2;
  const spacingKm = Math.max(
    totalLengthKm / FAULT_SOURCE_SAMPLE_MAX_INTERVALS,
    FAULT_SOURCE_SAMPLE_MIN_SPACING_KM,
  );
  const intervalCount = Math.max(Math.ceil(totalLengthKm / spacingKm), 1);
  const samples = Array.from({ length: intervalCount + 1 }, (_, index) => {
    const alongKm = totalLengthKm * index / intervalCount;
    return {
      coordinates: getPointAlongFaultPath(path, segmentLengths, alongKm),
      alongKm,
    };
  });

  if (!samples.some((sample) => Math.abs(sample.alongKm - originAlongKm) < 0.01)) {
    samples.push({
      coordinates: getPointAlongFaultPath(path, segmentLengths, originAlongKm),
      alongKm: originAlongKm,
    });
    samples.sort((left, right) => left.alongKm - right.alongKm);
  }
  const resolvedSamples = samples
    .filter((sample) => (
      direction === "bilateral"
      || (direction === "forward" && sample.alongKm >= originAlongKm - 0.01)
      || (direction === "reverse" && sample.alongKm <= originAlongKm + 0.01)
    ))
    .map((sample) => ({
      ...sample,
      ruptureDelaySec: Math.abs(sample.alongKm - originAlongKm) / ruptureSpeed,
    }));
  faultSourceSampleCache = { key: cacheKey, samples: resolvedSamples };
  return resolvedSamples;
}

function getPointAlongFaultPath(path, segmentLengths, targetAlongKm) {
  const totalLengthKm = segmentLengths.reduce((sum, length) => sum + length, 0);
  const target = Math.min(Math.max(Number(targetAlongKm) || 0, 0), totalLengthKm);
  let traversedKm = 0;
  for (let index = 0; index < segmentLengths.length; index += 1) {
    const segmentLengthKm = segmentLengths[index];
    if (target <= traversedKm + segmentLengthKm || index === segmentLengths.length - 1) {
      const ratio = segmentLengthKm > 0 ? (target - traversedKm) / segmentLengthKm : 0;
      return [
        path[index][0] + (path[index + 1][0] - path[index][0]) * ratio,
        path[index][1] + (path[index + 1][1] - path[index][1]) * ratio,
      ];
    }
    traversedKm += segmentLengthKm;
  }
  return [...path[path.length - 1]];
}

function getFaultRuptureMarkers(path) {
  const segmentLengths = path.slice(1).map((point, index) => haversineKilometers(path[index], point));
  const totalLengthKm = segmentLengths.reduce((sum, length) => sum + length, 0);
  const { origin, direction } = getResolvedFaultRuptureSettings();
  const originAlongKm = origin === "start" ? 0 : origin === "end" ? totalLengthKm : totalLengthKm / 2;
  const originCoordinates = getPointAlongFaultPath(path, segmentLengths, originAlongKm);
  const endCoordinates = [];
  if ((direction === "bilateral" || direction === "reverse") && originAlongKm > 0.01) {
    endCoordinates.push([...path[0]]);
  }
  if ((direction === "bilateral" || direction === "forward") && originAlongKm < totalLengthKm - 0.01) {
    endCoordinates.push([...path[path.length - 1]]);
  }
  return { originCoordinates, endCoordinates };
}

function getDisplayedEpicenterCoordinates() {
  if (isFaultSimulationActive()) {
    const path = getActiveFaultPath();
    if (path.length >= 2) {
      return getFaultRuptureMarkers(path).originCoordinates;
    }
  }
  return [state.longitude, state.latitude];
}

async function syncFaultEpicenterName() {
  if (!isFaultSimulationActive()) {
    faultEpicenterNameSyncKey = "";
    faultEpicenterNamePendingKey = "";
    faultEpicenterNameSyncPromise = null;
    faultEpicenterNameRequestId += 1;
    return;
  }
  const [longitude, latitude] = getDisplayedEpicenterCoordinates();
  const syncKey = `${state.faultModelId}|${longitude.toFixed(4)}|${latitude.toFixed(4)}`;
  if (syncKey === faultEpicenterNameSyncKey) {
    return;
  }
  if (syncKey === faultEpicenterNamePendingKey && faultEpicenterNameSyncPromise) {
    return faultEpicenterNameSyncPromise;
  }
  faultEpicenterNamePendingKey = syncKey;
  const requestId = ++faultEpicenterNameRequestId;
  faultEpicenterNameSyncPromise = (async () => {
    try {
      const areas = await loadEpicenterAreas();
      const area = findEpicenterAreaAtPoint(areas, longitude, latitude);
      if (requestId !== faultEpicenterNameRequestId || !isFaultSimulationActive()) {
        return;
      }
      state.epicenterName = area
        ? cleanDisplayAreaName(area.properties?.name)
        : "判定できません";
    } catch (error) {
      if (requestId !== faultEpicenterNameRequestId || !isFaultSimulationActive()) {
        return;
      }
      state.epicenterName = "判定できません";
      console.warn("Fault epicenter name unavailable", error);
    }
    faultEpicenterNameSyncKey = syncKey;
    if (els.epicenterRegion) {
      els.epicenterRegion.value = state.epicenterName;
    }
    setTextContentIfChanged(els.simulationRegionName, state.epicenterName);
    eewForecastPanelRenderSignature = "";
    updateEewForecastPanel();
    updateActiveEpicenterPopups([longitude, latitude]);
  })().finally(() => {
    if (requestId === faultEpicenterNameRequestId) {
      faultEpicenterNamePendingKey = "";
      faultEpicenterNameSyncPromise = null;
    }
  });
  return faultEpicenterNameSyncPromise;
}

function getFaultTravelMetrics(longitude, latitude) {
  const samples = getFaultSourceSamples();
  if (!samples.length) {
    const surfaceDistanceKm = haversineKilometers([state.longitude, state.latitude], [longitude, latitude]);
    return {
      surfaceDistanceKm,
      hypocentralDistanceKm: Math.hypot(surfaceDistanceKm, state.depthKm),
      pArrivalSec: surfaceDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec,
      sArrivalSec: surfaceDistanceKm / EARTHQUAKE_MODEL.sWaveVelocityKmPerSec,
    };
  }
  return samples.reduce((best, sample) => {
    const surfaceDistanceKm = haversineKilometers(sample.coordinates, [longitude, latitude]);
    const hypocentralDistanceKm = Math.hypot(surfaceDistanceKm, state.depthKm);
    return {
      surfaceDistanceKm: Math.min(best.surfaceDistanceKm, surfaceDistanceKm),
      hypocentralDistanceKm: Math.min(best.hypocentralDistanceKm, hypocentralDistanceKm),
      pArrivalSec: Math.min(
        best.pArrivalSec,
        sample.ruptureDelaySec + surfaceDistanceKm / EARTHQUAKE_MODEL.pWaveVelocityKmPerSec,
      ),
      sArrivalSec: Math.min(
        best.sArrivalSec,
        sample.ruptureDelaySec + surfaceDistanceKm / EARTHQUAKE_MODEL.sWaveVelocityKmPerSec,
      ),
    };
  }, {
    surfaceDistanceKm: Infinity,
    hypocentralDistanceKm: Infinity,
    pArrivalSec: Infinity,
    sArrivalSec: Infinity,
  });
}

function buildFaultAreaGeometry(path, widthKm) {
  const segmentLengths = path.slice(1).map((point, index) => haversineKilometers(path[index], point));
  const totalLengthKm = segmentLengths.reduce((sum, length) => sum + length, 0);
  const cellCount = Math.min(Math.max(Math.ceil(totalLengthKm / 30), 4), 28);
  const centerPoints = Array.from({ length: cellCount + 1 }, (_, index) => (
    getPointAlongFaultPath(path, segmentLengths, totalLengthKm * index / cellCount)
  ));
  const halfWidthKm = widthKm / 2;
  const left = [];
  const right = [];
  centerPoints.forEach((point, index) => {
    const previous = centerPoints[Math.max(index - 1, 0)];
    const next = centerPoints[Math.min(index + 1, centerPoints.length - 1)];
    const longitudeScale = Math.max(Math.cos(toRadians(point[1])), 0.2);
    const deltaX = (next[0] - previous[0]) * longitudeScale;
    const deltaY = next[1] - previous[1];
    const tangentLength = Math.hypot(deltaX, deltaY) || 1;
    const normalX = -deltaY / tangentLength;
    const normalY = deltaX / tangentLength;
    const longitudeOffset = normalX * halfWidthKm / (111 * longitudeScale);
    const latitudeOffset = normalY * halfWidthKm / 111;
    left.push([point[0] + longitudeOffset, point[1] + latitudeOffset]);
    right.push([point[0] - longitudeOffset, point[1] - latitudeOffset]);
  });
  const areaRing = [...left, ...right.slice().reverse(), left[0]];
  const cells = Array.from({ length: cellCount }, (_, index) => ({
    ring: [left[index], left[index + 1], right[index + 1], right[index], left[index]],
    startAlongKm: totalLengthKm * index / cellCount,
    endAlongKm: totalLengthKm * (index + 1) / cellCount,
  }));
  return { areaRing, cells, totalLengthKm };
}

function buildPresetFaultAreaGeometry(preset) {
  const left = preset?.areaSides?.left ?? [];
  const right = preset?.areaSides?.right ?? [];
  if (left.length < 2 || left.length !== right.length) {
    return null;
  }
  const centerPoints = left.map((point, index) => [
    (point[0] + right[index][0]) / 2,
    (point[1] + right[index][1]) / 2,
  ]);
  const segmentLengths = centerPoints.slice(1).map((point, index) => (
    haversineKilometers(centerPoints[index], point)
  ));
  const cumulativeLengths = [0];
  segmentLengths.forEach((length) => {
    cumulativeLengths.push(cumulativeLengths[cumulativeLengths.length - 1] + length);
  });
  return {
    areaRing: [...left, ...right.slice().reverse(), left[0]],
    cells: left.slice(0, -1).map((point, index) => ({
      ring: [point, left[index + 1], right[index + 1], right[index], point],
      startAlongKm: cumulativeLengths[index],
      endAlongKm: cumulativeLengths[index + 1],
    })),
    totalLengthKm: cumulativeLengths[cumulativeLengths.length - 1],
  };
}

function getFaultRuptureCellProgress(cell, originAlongKm, direction, ruptureSpeed, elapsedSec) {
  const canRupture = direction === "bilateral"
    || (direction === "forward" && cell.endAlongKm >= originAlongKm)
    || (direction === "reverse" && cell.startAlongKm <= originAlongKm);
  if (!canRupture || !Number.isFinite(elapsedSec)) {
    return 0;
  }
  const nearestAlongKm = Math.min(Math.max(originAlongKm, cell.startAlongKm), cell.endAlongKm);
  const farthestDistanceKm = Math.max(
    Math.abs(cell.startAlongKm - originAlongKm),
    Math.abs(cell.endAlongKm - originAlongKm),
  );
  const startDelaySec = Math.abs(nearestAlongKm - originAlongKm) / ruptureSpeed;
  const finishDelaySec = farthestDistanceKm / ruptureSpeed;
  if (elapsedSec < startDelaySec) {
    return 0;
  }
  return Math.min(Math.max((elapsedSec - startDelaySec) / Math.max(finishDelaySec - startDelaySec, 0.2), 0.12), 1);
}

function buildSimulationFaultGeoJson(elapsedSec = null) {
  const path = getActiveFaultPath();
  if (path.length < 2) {
    return emptyFeatureCollection();
  }
  const preset = getSelectedFaultModelPreset();
  const usesSelectedActiveFault = state.faultModelId === "active-fault" && selectedActiveFaultPath.length >= 2;
  const usesRectangleFault = state.faultModelId === "rectangle";
  if (preset || usesSelectedActiveFault || usesRectangleFault) {
    const areaPath = usesSelectedActiveFault ? [path[0], path[path.length - 1]] : path;
    const areaWidthKm = usesRectangleFault
      ? getFaultControlNumber("#fault-width-input", 15, 1, 200)
      : preset?.areaWidthKm ?? ACTIVE_FAULT_AREA_WIDTH_KM;
    const { areaRing, cells, totalLengthKm } = (
      buildPresetFaultAreaGeometry(preset)
      ?? buildFaultAreaGeometry(areaPath, areaWidthKm)
    );
    const ruptureSpeed = getFaultControlNumber("#fault-rupture-speed", 2.8, 0.5, 4);
    const { origin, direction } = getResolvedFaultRuptureSettings();
    const originAlongKm = origin === "start" ? 0 : origin === "end" ? totalLengthKm : totalLengthKm / 2;
    const ruptureFeatures = cells.map((cell, index) => ({
      cell,
      index,
      progress: getFaultRuptureCellProgress(cell, originAlongKm, direction, ruptureSpeed, elapsedSec),
    })).filter((entry) => entry.progress > 0).map(({ cell, index, progress }) => ({
      type: "Feature",
      properties: { kind: "fault-rupture", index, progress: Number(progress.toFixed(3)) },
      geometry: { type: "Polygon", coordinates: [cell.ring] },
    }));
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { kind: "fault-area", model: state.faultModelId },
          geometry: { type: "Polygon", coordinates: [areaRing] },
        },
        ...ruptureFeatures,
      ],
    };
  }
  const { endCoordinates } = getFaultRuptureMarkers(path);
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { kind: "fault-line", model: state.faultModelId },
        geometry: { type: "LineString", coordinates: path },
      },
      ...endCoordinates.map((coordinates, index) => ({
        type: "Feature",
        properties: { kind: "rupture-end", index },
        geometry: { type: "Point", coordinates },
      })),
    ],
  };
}

function updateSimulationFaultRuptureSource(elapsedSec) {
  if (!shouldDisplaySimulationFaultLayer() || !isFaultAreaActive() || !map?.getSource("simulation-fault-source")) {
    return;
  }
  setGeoJsonSourceData("simulation-fault-source", buildSimulationFaultGeoJson(elapsedSec));
}

function updateSimulationFaultSource() {
  syncFaultRuptureControls();
  void syncFaultEpicenterName();
  const epicenterCoordinates = getDisplayedEpicenterCoordinates();
  epicenterMarker?.setLngLat(epicenterCoordinates);
  updateActiveEpicenterPopups(epicenterCoordinates);
  const displaysFault = shouldDisplaySimulationFaultLayer();
  const showsFaultArea = displaysFault && isFaultAreaActive();
  if (showsFaultArea) {
    setWaveRadiusData(0, 0);
  }
  if (!map?.getSource("simulation-fault-source")) {
    return;
  }
  setGeoJsonSourceData(
    "simulation-fault-source",
    displaysFault ? buildSimulationFaultGeoJson() : emptyFeatureCollection(),
  );
  updateLayerVisibility("simulation-fault-line", displaysFault && !showsFaultArea);
  updateLayerVisibility("simulation-fault-line-casing", displaysFault && !showsFaultArea);
  updateLayerVisibility("simulation-fault-area-fill", showsFaultArea);
  updateLayerVisibility("simulation-fault-area-outline", showsFaultArea);
  updateLayerVisibility("simulation-fault-rupture-fill", showsFaultArea);
  updateLayerVisibility("simulation-fault-endpoints", displaysFault && !showsFaultArea);
  keepWaveAndStationLayerOrder();
}

function estimateMaxIntensityForFeature(feature) {
  if (isFaultSimulationActive()) {
    return Math.max(...getFaultSourceSamples().map((sample) => {
      const nearestPoint = getNearestPointOnFeature(sample.coordinates, feature, {
        polygons: getFeatureIntensityDistancePolygons(feature),
      });
      return estimateIntensityAtPoint(nearestPoint.point[0], nearestPoint.point[1]);
    }));
  }
  const epicenter = [state.longitude, state.latitude];
  const nearestPoint = getNearestPointOnFeature(epicenter, feature, {
    polygons: getFeatureIntensityDistancePolygons(feature),
  });
  return estimateIntensityAtPoint(nearestPoint.point[0], nearestPoint.point[1], nearestPoint.distanceKm);
}

function estimateIntensityAtPoint(
  longitude,
  latitude,
  knownEpicentralDistanceKm = null,
  knownFaultTravelMetrics = null,
) {
  if (isFaultSimulationActive()) {
    const metrics = knownFaultTravelMetrics ?? getFaultTravelMetrics(longitude, latitude);
    const ground = getGroundModelAt(longitude, latitude);
    return estimateInstrumentalIntensity({
      magnitude: state.magnitude,
      hypocentralDistanceKm: metrics.hypocentralDistanceKm,
      siteAmplification: ground?.intensityAmplification ?? EARTHQUAKE_MODEL.defaultSiteAmplification,
    });
  }
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

function setCompactHistoryTabLabel() {
  document.querySelector("#bottom-history-tab span:last-child")?.replaceChildren("統計");
}

setCompactHistoryTabLabel();
document.addEventListener("DOMContentLoaded", setCompactHistoryTabLabel);
window.addEventListener("load", setCompactHistoryTabLabel);

function setFinalToolTabLabels() {
  document.querySelector("#bottom-history-tab span:last-child")?.replaceChildren("マップ");
  document.querySelector("#bottom-info-tab span:last-child")?.replaceChildren("ツール");
}

setFinalToolTabLabels();
document.addEventListener("DOMContentLoaded", setFinalToolTabLabels);
window.addEventListener("load", setFinalToolTabLabels);

function setFinalPostTabLabels() {
  document.querySelector("#bottom-history-tab span:last-child")?.replaceChildren("投稿");
  document.querySelector("#bottom-info-tab span:last-child")?.replaceChildren("ツール");
}

setFinalPostTabLabels();
document.addEventListener("DOMContentLoaded", setFinalPostTabLabels);
window.addEventListener("load", setFinalPostTabLabels);

COMMUNITY_POST_TAGS = [
  { id: "weather", label: "気象" },
  { id: "disaster", label: "災害" },
  { id: "earthquake", label: "地震" },
  { id: "safety", label: "防災" },
];

function loadCommunityAccountFromStorage() {
  if (IS_LOCAL_DEV) {
    return {
      id: "local-admin",
      name: "Local 管理者",
      icon: "",
      token: "local-admin",
      isAdmin: true,
      localOnly: true,
    };
  }
  try {
    const parsed = JSON.parse(localStorage.getItem(COMMUNITY_ACCOUNT_STORAGE_KEY) || "null");
    if (parsed?.token && parsed?.name) {
      return {
        id: String(parsed.id || ""),
        name: String(parsed.name || ""),
        icon: String(parsed.icon || ""),
        token: String(parsed.token || ""),
        isAdmin: Boolean(parsed.isAdmin),
        followingCount: Number(parsed.followingCount || 0),
        followerCount: Number(parsed.followerCount || 0),
      };
    }
  } catch (error) {
    console.warn("community account storage read failed", error);
  }
  return null;
}

function saveCommunityAccount(account) {
  communityAccount = account?.token ? {
    id: String(account.id || ""),
    name: String(account.name || ""),
    icon: String(account.icon || ""),
    token: String(account.token || ""),
    isAdmin: Boolean(account.isAdmin),
    localOnly: Boolean(account.localOnly),
    followingCount: Number(account.followingCount || 0),
    followerCount: Number(account.followerCount || 0),
  } : null;
  if (communityAccount && !communityAccount.localOnly) {
    localStorage.setItem(COMMUNITY_ACCOUNT_STORAGE_KEY, JSON.stringify(communityAccount));
  } else if (!communityAccount) {
    localStorage.removeItem(COMMUNITY_ACCOUNT_STORAGE_KEY);
  }
  document.body.classList.toggle("community-admin-account", Boolean(communityAccount?.isAdmin));
  document.body.classList.toggle("community-local-account", Boolean(communityAccount?.localOnly));
  if (communityAccount?.id) {
    communityPosts.forEach((post) => {
      if (String(post.accountId || "") === communityAccount.id) {
        post.authorName = communityAccount.name;
        post.authorIcon = communityAccount.icon;
      }
    });
    if (activeCommunityPostDetail && String(activeCommunityPostDetail.accountId || "") === communityAccount.id) {
      const placeName = communityPostOverlayElements?.detailSheet
        ?.querySelector(".community-post-detail-meta dd")?.textContent || "";
      renderCommunityPostDetail(activeCommunityPostDetail, placeName);
    }
  }
  updateCommunityAccountSettingsCard();
  syncCommunityPushSubscriptionAccount().catch((error) => {
    console.warn("push subscription account sync failed", error);
  });
  if (communityAccount && document.body.dataset.activeBottomTab === "bottom-history-tab") {
    closeCommunityAccountRequiredPanel();
    setCommunityMapModeActive(true);
  }
}

function hasCommunityAccount() {
  return Boolean(communityAccount?.token && communityAccount?.name);
}

function renderCommunityAccountIcon(account, className = "community-profile-icon") {
  const icon = account?.icon || "";
  if (icon.startsWith("data:image/")) {
    return `<span class="${className}"><img src="${escapeHtml(icon)}" alt="" /></span>`;
  }
  const text = account?.localOnly ? "L" : "＋";
  return `<span class="${className}">${escapeHtml(text)}</span>`;
}

function ensureCommunityAccountSettingsCard() {
  const list = els.settingsMenuSheet?.querySelector(".settings-menu-list");
  if (!list) {
    return null;
  }
  if (!communityAccountPanel) {
    communityAccountPanel = document.createElement("section");
    communityAccountPanel.id = "community-account-panel";
    communityAccountPanel.className = "community-account-panel";
    list.insertAdjacentElement("afterbegin", communityAccountPanel);
  }
  updateCommunityAccountSettingsCard();
  return communityAccountPanel;
}

function updateCommunityAccountSettingsCard() {
  if (!communityAccountPanel) {
    return;
  }
  if (hasCommunityAccount()) {
    communityAccountPanel.innerHTML = `
      <div class="community-profile-card">
        ${renderCommunityAccountIcon(communityAccount)}
        <div class="community-profile-main">
          <span>プロフィール</span>
          <strong>${escapeHtml(communityAccount.name)}</strong>
          <div class="community-profile-follow-counts">
            <button type="button" data-community-account-screen="following" ${Number(communityAccount.followingCount || 0) === 0 ? "disabled" : ""}>フォロー <b>${Number(communityAccount.followingCount || 0).toLocaleString("ja-JP")}</b>人</button>
            <button type="button" data-community-account-screen="followers" ${Number(communityAccount.followerCount || 0) === 0 ? "disabled" : ""}>フォロワー <b>${Number(communityAccount.followerCount || 0).toLocaleString("ja-JP")}</b>人</button>
          </div>
          ${communityAccount.isAdmin ? `<em>管理者アカウント</em>` : ""}
        </div>
      </div>
      <div class="community-account-button-row">
        <button type="button" data-community-account-screen="name">名前を編集</button>
        <button type="button" data-community-account-screen="icon">アイコンを編集</button>
      </div>
      <div class="community-account-danger-actions">
        <button type="button" data-community-account-action="logout">ログアウト</button>
        <button type="button" data-community-account-action="delete">アカウント削除</button>
      </div>
      <p class="community-account-status" aria-live="polite"></p>
    `;
  } else {
    communityAccountPanel.innerHTML = `
      <div class="community-profile-card is-empty">
        ${renderCommunityAccountIcon(null)}
        <div class="community-profile-main">
          <span>プロフィール</span>
          <strong>アカウント未作成</strong>
        </div>
      </div>
      <p class="community-account-note">アカウント名は投稿時にほかの人からも見えます。</p>
      <div class="community-account-button-row">
        <button type="button" data-community-account-screen="login">ログイン</button>
        <button type="button" data-community-account-screen="create">アカウント作成</button>
      </div>
      <p class="community-account-status" aria-live="polite"></p>
    `;
  }
  if (hasCommunityAccount()) {
    const profileMain = communityAccountPanel.querySelector(".community-profile-main");
    if (profileMain) {
      let typeLabel = profileMain.querySelector("em");
      if (!typeLabel) {
        typeLabel = document.createElement("em");
        profileMain.append(typeLabel);
      }
      typeLabel.textContent = communityAccount.isAdmin ? "管理者アカウント" : "一般アカウント";
    }
    const nameButton = communityAccountPanel.querySelector('[data-community-account-screen="name"]');
    const logoutButton = communityAccountPanel.querySelector('[data-community-account-action="logout"]');
    if (nameButton) {
      nameButton.textContent = "名前を編集";
      nameButton.disabled = Boolean(communityAccount.localOnly);
      nameButton.classList.toggle("is-disabled", Boolean(communityAccount.localOnly));
    }
    const iconButton = communityAccountPanel.querySelector('[data-community-account-screen="icon"]');
    if (iconButton) {
      iconButton.textContent = "アイコンを編集";
      iconButton.disabled = Boolean(communityAccount.localOnly);
      iconButton.setAttribute("aria-disabled", String(Boolean(communityAccount.localOnly)));
      iconButton.classList.toggle("is-disabled", Boolean(communityAccount.localOnly));
      if (communityAccount.localOnly) {
        iconButton.title = "Localアカウントではアイコンを変更できません";
      }
    }
    if (logoutButton) {
      logoutButton.textContent = "ログアウト";
      logoutButton.disabled = Boolean(communityAccount.localOnly);
      logoutButton.classList.toggle("is-disabled", Boolean(communityAccount.localOnly));
    }
    const deleteButton = communityAccountPanel.querySelector('[data-community-account-action="delete"]');
    if (deleteButton) {
      deleteButton.textContent = "アカウント削除";
      deleteButton.disabled = Boolean(communityAccount.localOnly);
      deleteButton.setAttribute("aria-disabled", String(Boolean(communityAccount.localOnly)));
      deleteButton.classList.toggle("is-disabled", Boolean(communityAccount.localOnly));
      if (communityAccount.localOnly) {
        deleteButton.title = "Local管理者アカウントは削除できません";
      }
    }
  }
  communityAccountPanel.querySelectorAll("[data-community-account-screen]").forEach((button) => {
    button.addEventListener("click", () => openCommunityAccountScreen(button.dataset.communityAccountScreen));
  });
  communityAccountPanel.querySelector('[data-community-account-action="logout"]')?.addEventListener("click", () => logoutCommunityAccount());
  communityAccountPanel.querySelector('[data-community-account-action="delete"]')?.addEventListener("click", () => deleteCommunityAccountWithConfirm());
}

function openCommunityAccountScreen(type) {
  const sheet = els.settingsMenuSheet;
  if (!sheet) {
    return;
  }
  if (type === "icon" && communityAccount?.localOnly) {
    return;
  }
  let screen = sheet.querySelector("#community-account-screen");
  if (!screen) {
    screen = document.createElement("section");
    screen.id = "community-account-screen";
    screen.className = "community-account-screen hidden";
    sheet.append(screen);
  }
  const content = getCommunityAccountScreenHtml(type);
  const title = getCommunityAccountScreenTitle(type);
  screen.innerHTML = `
    <header class="settings-detail-head community-account-screen-head">
      <button class="settings-detail-back community-account-screen-back" type="button" aria-label="戻る">‹</button>
      <h2>${escapeHtml(title)}</h2>
      <span aria-hidden="true"></span>
    </header>
    <div class="community-account-screen-content">
      ${content}
      <p class="community-account-screen-status" aria-live="polite"></p>
    </div>
  `;
  sheet.classList.add("community-account-screen-open");
  screen.classList.remove("hidden");
  screen.scrollTop = 0;
  screen.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  sheet.querySelector(".settings-menu-list")?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  requestAnimationFrame(() => {
    screen.scrollTop = 0;
    screen.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  });
  screen.querySelector(".community-account-screen-back")?.addEventListener("click", closeCommunityAccountScreen);
  bindCommunityAccountScreen(type, screen);
}

function closeCommunityAccountScreen() {
  els.settingsMenuSheet?.classList.remove("community-account-screen-open");
  els.settingsMenuSheet?.querySelector("#community-account-screen")?.classList.add("hidden");
  els.settingsAdminPanel?.classList.remove("admin-subpage-open");
}

function getCommunityAccountScreenTitle(type) {
  return {
    login: "ログイン",
    create: "アカウント作成",
    name: "名前を編集",
    icon: "アイコンを編集",
    following: "フォロー",
    followers: "フォロワー",
    accounts: "アカウント情報",
  }[type] || "アカウント情報";
}

function getCommunityAccountScreenHtml(type) {
  if (type === "login") {
    return `
      <form class="community-account-screen-form" data-community-account-form="login">
        <label>名前<input name="name" type="text" maxlength="32" autocomplete="username" required /></label>
        <label>パスワード<input name="password" type="password" autocomplete="current-password" required /></label>
        <button type="submit">ログイン</button>
      </form>
    `;
  }
  if (type === "create") {
    return `
      <p class="community-account-note">アカウント名は投稿時にほかの人からも見えます。パスワードは英大文字・小文字・数字のみ使用できます。パスワードは絶対に忘れないでください。</p>
      <form class="community-account-screen-form" data-community-account-form="create">
        <label>名前<input name="name" type="text" maxlength="32" autocomplete="username" required /></label>
        <label>パスワード<input name="password" type="password" minlength="6" maxlength="64" pattern="[A-Za-z0-9]{6,64}" autocomplete="new-password" required /></label>
        <label class="community-account-confirm"><input name="confirm" type="checkbox" required /><span>パスワードを忘れるとログインできません。</span></label>
        <button type="submit">作成する</button>
      </form>
    `;
  }
  if (type === "name") {
    return `
      <p class="community-account-note">設定した名前は、投稿者名としてほかのユーザーに公開されます。</p>
      <form class="community-account-screen-form" data-community-account-form="name">
        <label>名前<input name="name" type="text" maxlength="32" value="${escapeHtml(communityAccount?.name || "")}" required /></label>
        <button type="submit">保存</button>
      </form>
    `;
  }
  if (type === "icon") {
    return `
      <form class="community-account-screen-form" data-community-account-form="icon">
        <label class="community-icon-picker">PNG / JPEGを選択<input name="icon" type="file" accept="image/png,image/jpeg" required /></label>
        <div class="community-icon-preview" id="community-icon-preview">${communityAccount?.icon ? `<img src="${escapeHtml(communityAccount.icon)}" alt="アイコンプレビュー" />` : "プレビュー"}</div>
        <button type="submit">保存</button>
      </form>
    `;
  }
  if (type === "following" || type === "followers") {
    return `
      <div class="community-connection-list" id="community-connection-list" data-community-connection-kind="${type}">読み込み中...</div>
    `;
  }
  return `
    <div class="community-account-list" id="community-account-list">読み込み中...</div>
  `;
}

function bindCommunityAccountScreen(type, screen) {
  const form = screen.querySelector(".community-account-screen-form");
  if (form) {
    if (type === "icon") {
      form.querySelector('input[name="icon"]')?.addEventListener("change", async (event) => {
        const preview = form.querySelector("#community-icon-preview");
        const file = event.target.files?.[0];
        if (!preview || !file) {
          return;
        }
        if (!["image/png", "image/jpeg"].includes(file.type)) {
          preview.textContent = "PNG / JPEGのみ";
          return;
        }
        try {
          const dataUrl = await compressIconFileToDataUrl(file);
          preview.innerHTML = `<img src="${escapeHtml(dataUrl)}" alt="アイコンプレビュー" />`;
          preview.dataset.iconDataUrl = dataUrl;
        } catch {
          preview.textContent = "プレビューできませんでした";
        }
      });
    }
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (type === "create") {
        await createCommunityAccountFromForm(form);
      } else if (type === "login") {
        await loginCommunityAccountFromForm(form);
      } else if (type === "name") {
        await updateCommunityAccountProfile(form);
      } else if (type === "icon") {
        await updateCommunityAccountIcon(form);
      }
    });
  }
  if (type === "accounts") {
    loadCommunityAccountList(screen);
  }
  if (type === "following" || type === "followers") {
    loadCommunityConnectionList(screen, type);
  }
}

async function loadCommunityConnectionList(screen, kind) {
  const list = screen.querySelector("#community-connection-list");
  if (!list || !communityAccount?.id) {
    return;
  }
  const workerUrl = await getWorkerBaseUrl();
  try {
    const response = await fetch(
      `${workerUrl}/community-accounts/${encodeURIComponent(communityAccount.id)}/${kind}`,
      {
        headers: communityAccount.localOnly
          ? {}
          : { Authorization: `Bearer ${communityAccount.token}` },
        cache: "no-store",
      },
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || "一覧を読み込めませんでした。");
    }
    const accounts = Array.isArray(data.accounts) ? data.accounts : [];
    list.innerHTML = accounts.map((account) => `
      <article class="community-connection-item">
        ${renderCommunityAccountIcon(account, "community-connection-icon")}
        <div class="community-connection-name">
          <strong>${escapeHtml(account.name || "名前なし")}</strong>
          ${account.isAdmin ? "<span>管理者</span>" : ""}
        </div>
        ${account.id === communityAccount.id ? "" : `
          <button class="community-connection-follow${account.following ? " is-following" : ""}" type="button" data-community-connection-account="${escapeHtml(account.id)}" data-community-connection-following="${account.following ? "true" : "false"}">
            ${account.following ? "フォロー中" : "フォロー"}
          </button>
        `}
      </article>
    `).join("") || `<p class="community-connection-empty">${kind === "following" ? "フォローしている人はいません。" : "フォロワーはいません。"}</p>`;
    list.querySelectorAll("[data-community-connection-account]").forEach((button) => {
      button.addEventListener("click", () => toggleCommunityConnectionFollow(screen, kind, button));
    });
  } catch (error) {
    list.textContent = error?.message || "一覧を読み込めませんでした。";
  }
}

async function toggleCommunityConnectionFollow(screen, kind, button) {
  if (!communityAccount?.token || communityAccount.localOnly) {
    return;
  }
  const accountId = button.dataset.communityConnectionAccount || "";
  const following = button.dataset.communityConnectionFollowing === "true";
  const workerUrl = await getWorkerBaseUrl();
  button.disabled = true;
  try {
    const response = await fetch(`${workerUrl}/community-accounts/${encodeURIComponent(accountId)}/follow`, {
      method: following ? "DELETE" : "PUT",
      headers: { Authorization: `Bearer ${communityAccount.token}` },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || "フォロー状態を更新できませんでした。");
    }
    communityPosts.forEach((post) => {
      if (post.accountId === accountId) {
        post.following = Boolean(data.following);
      }
    });
    saveCommunityAccount({
      ...communityAccount,
      followingCount: Number(data.followingCount || 0),
    });
    await loadCommunityConnectionList(screen, kind);
  } catch (error) {
    window.alert(error?.message || "フォロー状態を更新できませんでした。");
    button.disabled = false;
  }
}

async function createCommunityAccountFromForm(form) {
  const status = getCommunityAccountScreenStatus();
  const workerUrl = await getWorkerBaseUrl();
  const data = Object.fromEntries(new FormData(form).entries());
  status.textContent = "作成中...";
  try {
    const response = await fetch(`${workerUrl}/community-accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, password: data.password, icon: "" }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body?.error || "アカウント作成に失敗しました。");
    }
    saveCommunityAccount(body.account);
    status.textContent = "作成しました。";
    closeCommunityAccountScreen();
  } catch (error) {
    status.textContent = error?.message || "アカウント作成に失敗しました。";
  }
}

async function loginCommunityAccountFromForm(form) {
  const status = getCommunityAccountScreenStatus();
  const workerUrl = await getWorkerBaseUrl();
  const data = Object.fromEntries(new FormData(form).entries());
  status.textContent = "ログイン中...";
  try {
    const response = await fetch(`${workerUrl}/community-accounts/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, password: data.password }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body?.error || "ログインに失敗しました。");
    }
    saveCommunityAccount(body.account);
    status.textContent = "ログインしました。";
    closeCommunityAccountScreen();
  } catch (error) {
    status.textContent = error?.message || "ログインに失敗しました。";
  }
}

async function updateCommunityAccountProfile(form) {
  const status = getCommunityAccountScreenStatus();
  const data = Object.fromEntries(new FormData(form).entries());
  await updateCommunityAccountRequest({ name: data.name }, status);
}

async function updateCommunityAccountIcon(form) {
  const status = getCommunityAccountScreenStatus();
  const file = new FormData(form).get("icon");
  if (!(file instanceof File) || !["image/png", "image/jpeg"].includes(file.type)) {
    status.textContent = "PNG / JPEG画像を選択してください。";
    return;
  }
  const previewDataUrl = form.querySelector("#community-icon-preview")?.dataset.iconDataUrl;
  await updateCommunityAccountRequest({ icon: previewDataUrl || await compressIconFileToDataUrl(file) }, status);
}

function compressIconFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      const size = 96;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("canvas unavailable"));
        return;
      }
      const scale = Math.max(size / image.width, size / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
      resolve(canvas.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", 0.86));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image load failed"));
    };
    image.src = url;
  });
}

async function updateCommunityAccountRequest(patch, status) {
  const workerUrl = await getWorkerBaseUrl();
  status.textContent = "保存中...";
  try {
    const response = await fetch(`${workerUrl}/community-account`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${communityAccount.token}`,
      },
      body: JSON.stringify(patch),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body?.error || "保存に失敗しました。");
    }
    saveCommunityAccount({ ...communityAccount, ...body.account, token: body.account?.token || communityAccount.token });
    status.textContent = "保存しました。";
    closeCommunityAccountScreen();
  } catch (error) {
    status.textContent = error?.message || "保存に失敗しました。";
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function getCommunityAccountScreenStatus() {
  return els.settingsMenuSheet?.querySelector(".community-account-screen-status") || getCommunityAccountStatusElement();
}

async function logoutCommunityAccount() {
  if (!window.confirm("ログアウトしますか？")) {
    return;
  }
  const workerUrl = await getWorkerBaseUrl();
  if (workerUrl && communityAccount?.token && !communityAccount.localOnly) {
    await fetch(`${workerUrl}/community-session`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${communityAccount.token}` },
    }).catch(() => {});
  }
  saveCommunityAccount(null);
}

async function deleteCommunityAccountWithConfirm() {
  if (!window.confirm("アカウントを削除しますか？過去の投稿も削除されます。")) {
    return;
  }
  try {
    const workerUrl = await getWorkerBaseUrl();
    if (workerUrl && communityAccount?.token) {
      const response = await fetch(`${workerUrl}/community-account`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${communityAccount.token}` },
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || "アカウントを削除できませんでした。");
      }
    }
    communityPosts = [];
    renderCommunityPostMarkers();
    closeCommunityPostDetail();
    saveCommunityAccount(null);
  } catch (error) {
    window.alert(error?.message || "アカウントを削除できませんでした。");
  }
}

function formatCommunityAdminDateTime(value) {
  const timestamp = Date.parse(String(value || ""));
  if (!Number.isFinite(timestamp)) {
    return "-";
  }
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
}

async function loadCommunityAccountList(screen) {
  const list = screen.querySelector("#community-account-list");
  const workerUrl = await getWorkerBaseUrl();
  try {
    if (communityAccount?.localOnly) {
      list.innerHTML = `
        <article class="community-account-list-item">
          <strong>Local 管理者</strong><em>管理者</em>
          <div class="community-account-list-stats">
            <span>ログイン端末数: 1</span><span>投稿数: 0</span>
            <span>フォロー: 0</span><span>フォロワー: 0</span>
          </div>
        </article>`;
      return;
    }
    const response = await fetch(`${workerUrl}/community-accounts`, {
      headers: { Authorization: `Bearer ${communityAccount.token}` },
      cache: "no-store",
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body?.error || "読み込みに失敗しました。");
    }
    list.innerHTML = (body.accounts || []).map((account) => `
      <article class="community-account-list-item">
        <strong>${escapeHtml(account.name)}</strong>
        ${account.isAdmin ? "<em>管理者</em>" : ""}
        <div class="community-account-list-stats">
          <span>ログイン端末数: ${Number(account.sessionCount || 0).toLocaleString("ja-JP")}</span>
          <span>投稿数: ${Number(account.postCount || 0).toLocaleString("ja-JP")}</span>
          <span>フォロー: ${Number(account.followingCount || 0).toLocaleString("ja-JP")}</span>
          <span>フォロワー: ${Number(account.followerCount || 0).toLocaleString("ja-JP")}</span>
        </div>
        <div class="community-account-list-dates">
          <span>作成: ${escapeHtml(formatCommunityAdminDateTime(account.createdAt))}</span>
          <span>更新: ${escapeHtml(formatCommunityAdminDateTime(account.updatedAt))}</span>
          <span>最終ログイン: ${escapeHtml(formatCommunityAdminDateTime(account.lastLoginAt))}</span>
        </div>
      </article>
    `).join("") || "アカウントがありません。";
  } catch (error) {
    list.textContent = error?.message || "読み込みに失敗しました。";
  }
}
