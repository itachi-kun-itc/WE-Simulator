const MUNICIPALITIES_URL = "./data/municipalities.geojson";
const BOUNDARY_LAYERS_URL = "./data/boundary_layers.geojson";
const JMA_LOCAL_AREAS_URL = "./data/jma_local_areas.geojson";
const JMA_EPICENTER_AREAS_URL = "./data/jma_epicenter_areas.geojson";
const PLATE_BOUNDARIES_URL = "./data/plate_boundaries.geojson";
const SURROUNDING_LAND_URL = "./data/surrounding_land.geojson";
const NORTHERN_ISLANDS_LAND_URL = "./data/northern_islands_land.geojson";
const GROUND_MODEL_URL = "./data/ground_model.json";
const SHINDO_STATIONS_URL = "./data/jma_shindo_stations.json";
const EARTHQUAKE_PRESETS_URL = "./data/earthquake_presets.json";
const FEEDBACK_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1cmR_OGml5ngLuq0zAi_gAs_qgrBNqTSlWZ5-H7tLWV0/edit?usp=sharing";
const FEEDBACK_ENDPOINT_URL =
  "https://script.google.com/macros/s/AKfycbztrmCH_ukdLtY6xUKNSZQWShY0ziCT_8HMm7QI-qtSFRviETHw_APJJhyV50hSRvMy3A/exec";
const MAINTENANCE_ENDPOINT_URL = FEEDBACK_ENDPOINT_URL;
const ADMIN_PARENT_TOKEN_KEY = "weather-earthquake-admin-parent-token";
const MAINTENANCE_STATUS_POLL_MS = 60000;

const INITIAL_CENTER = [139.767, 35.681];
const INITIAL_ZOOM = 6;
const MOBILE_INITIAL_CENTER = INITIAL_CENTER;
const MOBILE_INITIAL_ZOOM = 6;
const STATION_LABEL_ALL_VISIBLE_MIN_ZOOM = 8.8;
const STATION_CANVAS_PIXEL_RATIO_LIMIT = 2.5;
const EXCLUDED_JAPAN_LAND_BOUNDS = [
  { west: 131.75, south: 37.15, east: 131.95, north: 37.35 },
  { west: 123.2, south: 25.5, east: 124.8, north: 26.3 },
];
const NORTHERN_ISLAND_DISPLAY_BOUNDS = [
  { west: 145.15, south: 43.1, east: 149.7, north: 46.35 },
];
const MUNICIPALITY_BOUNDARY_MIN_ZOOM = 8;
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
const GEOLOCATION_TARGET_ACCURACY_M = 35;
const GEOLOCATION_ACCEPTABLE_ACCURACY_M = 120;
const GEOLOCATION_IPAD_ACCEPTABLE_ACCURACY_M = 350;
const GEOLOCATION_FAST_SETTLE_MS = 2500;
const GEOLOCATION_MAX_WAIT_MS = 16000;
const GEOLOCATION_IPAD_MAX_WAIT_MS = 32000;
const GEOLOCATION_CACHED_MAX_AGE_MS = 15000;
const GEOLOCATION_IPAD_CACHED_MAX_AGE_MS = 120000;
const WAVE_RENDER_RADIUS_STEP_KM = 0.05;
const WAVE_CIRCLE_STEPS = 160;
const RESET_VIEW_ANIMATION_MS = 1200;
const LIGHT_DEFERRED_DATA_DELAY_MS = 180;
const STATION_DEFERRED_DATA_DELAY_MS = 450;
const PRESET_DEFERRED_DATA_DELAY_MS = 900;
const HEAVY_DEFERRED_DATA_DELAY_MS = 6000;
const EARTHQUAKE_PRESETS = [
  {
    id: "tohoku-2011",
    label: "東北地方太平洋沖地震（2011）",
    latitude: 38 + 6.2 / 60,
    longitude: 142 + 51.6 / 60,
    depthKm: 24,
    magnitude: 9.0,
    epicenterName: "三陸沖",
    observedStations: [
      { stationId: "00518", intensityValue: 6.6 },
      ...observationsFromNames(
        [
          "栗原市若柳",
          "石巻市桃生町",
          "登米市米山町",
          "大崎市古川三日町",
          "大崎市田尻",
          "宮城川崎町前川",
          "仙台宮城野区苦竹",
          "名取市増田",
          "栗原市高清水",
          "大崎市古川北町",
          "宮城美里町木間塚",
          "東松島市矢本",
          "大崎市鹿島台",
          "栗原市一迫",
          "塩竈市旭町",
          "涌谷町新町",
          "大衡村大衡",
          "蔵王町円田",
          "登米市南方町",
          "山元町浅生原",
        ],
        6.1,
      ),
      ...observationsFromNames(
        [
          "栗原市金成",
          "登米市迫町",
          "大崎市松山",
          "岩沼市桜",
          "石巻市門脇",
          "石巻市前谷地",
          "気仙沼市赤岩",
          "角田市角田",
          "仙台若林区遠見塚",
          "仙台泉区将監",
          "宮城美里町北浦",
          "登米市豊里町",
          "仙台青葉区大倉",
          "登米市登米町",
          "栗原市栗駒",
          "東松島市小野",
          "松島町高城",
          "登米市中田町",
          "白石市亘理町",
          "利府町利府",
          "大郷町粕川",
          "大河原町新南",
          "仙台宮城野区五輪",
          "南三陸町歌津",
          "石巻市鮎川浜",
          "仙台空港",
          "亘理町下小路",
          "大和町吉岡",
        ],
        5.7,
      ),
    ],
    eewForecastAreas: ["東北", "関東", "新潟", "長野", "静岡"],
  },
  {
    id: "osaka-northern-2018",
    label: "大阪北部地震（2018）",
    latitude: 34 + 50.6 / 60,
    longitude: 135 + 37.2 / 60,
    depthKm: 13,
    magnitude: 6.1,
    epicenterName: "大阪府北部",
    observedStations: [
      { stationId: "02670", intensityValue: 5.6 },
      { stationId: "02678", intensityValue: 5.6 },
      { stationId: "02682", intensityValue: 5.6 },
      { stationId: "02683", intensityValue: 5.6 },
      { stationId: "02688", intensityValue: 5.6 },
      ...observationsFromNames(
        [
          "大阪都島区都島本通",
          "大阪東淀川区北江口",
          "大阪旭区大宮",
          "大阪淀川区木川東",
          "豊中市曽根南町",
          "豊中市役所",
          "吹田市内本町",
          "高槻市桃園町",
          "高槻市消防本部",
          "寝屋川市役所",
          "箕面市箕面",
          "摂津市三島",
          "交野市私部",
          "島本町若山台",
          "京都中京区河原町御池",
          "京都伏見区向島",
          "京都伏見区久我",
          "京都西京区大枝",
          "亀岡市余部町",
          "長岡京市開田",
          "八幡市八幡",
          "大山崎町円明寺",
          "久御山町田井",
        ],
        5.1,
      ),
      ...observationsFromNames(
        [
          "大阪福島区福島",
          "大阪此花区春日出北",
          "大阪港区築港",
          "大阪西淀川区千舟",
          "大阪東淀川区柴島",
          "大阪生野区舎利寺",
          "大阪国際空港",
          "池田市城南",
          "守口市京阪本通",
          "大東市新町",
          "四條畷市中野",
          "豊能町余野",
          "能勢町役場",
          "京都伏見区竹田",
          "京都伏見区醍醐",
          "京都伏見区淀",
          "京都西京区樫原",
          "宇治市宇治琵琶",
          "宇治市折居台",
          "亀岡市安町",
          "城陽市寺田",
          "向日市寺戸町",
          "京田辺市田辺",
          "井手町井手",
          "精華町南稲八妻",
          "南丹市八木町八木",
          "大津市南郷",
          "尼崎市昭和通",
          "西宮市宮前町",
          "西宮市平木",
          "伊丹市千僧",
          "川西市中央町",
          "大和郡山市北郡山町",
          "御所市役所",
          "高取町観覚寺",
          "広陵町南郷",
        ],
        4.6,
      ),
      ...observationsFromNames(
        [
          "大阪西区九条南",
          "大阪大正区泉尾",
          "大阪天王寺区上本町",
          "大阪浪速区元町",
          "大阪東成区東中本",
          "大阪城東区放出西",
          "大阪阿倍野区松崎町",
          "大阪住吉区遠里小野",
          "大阪東住吉区杭全",
          "大阪西成区岸里",
          "大阪鶴見区横堤",
          "大阪住之江区御崎",
          "大阪平野区平野南",
          "大阪中央区大手前",
          "八尾市本町",
          "柏原市安堂町",
          "門真市中町",
          "東大阪市荒本北",
          "能勢町今西",
          "岸和田市畑町",
          "泉大津市東雲町",
          "富田林市高辺台",
          "松原市阿保",
          "大阪和泉市府中町",
          "羽曳野市誉田",
          "藤井寺市岡",
          "大阪太子町山田",
          "河南町白木",
          "大阪堺市堺区山本町",
          "大阪堺市堺区大浜南町",
        ],
        4.0,
      ),
    ],
    eewForecastAreas: ["近畿"],
  },
  {
    id: "kumamoto-2016",
    label: "熊本地震（2016）",
    latitude: 32 + 45.2 / 60,
    longitude: 130 + 45.7 / 60,
    depthKm: 12,
    magnitude: 7.3,
    epicenterName: "熊本県熊本地方",
    observedStations: [
      { stationId: "03947", intensityValue: 6.7 },
      { stationId: "03944", intensityValue: 6.6 },
      ...observationsFromNames(
        [
          "菊池市旭志",
          "南阿蘇村河陽",
          "宇土市浦田町",
          "嘉島町上島",
          "合志市竹迫",
          "宇城市豊野町",
          "大津町大津",
          "宇城市松橋町",
          "宇城市小川町",
          "熊本中央区大江",
          "熊本東区佐土原",
          "熊本西区春日",
        ],
        6.1,
      ),
      ...observationsFromNames(
        [
          "南阿蘇村中松",
          "熊本美里町馬場",
          "宇城市不知火町",
          "熊本南区城南町",
          "熊本南区富合町",
          "菊陽町久保田",
          "熊本北区植木町",
          "阿蘇市内牧",
          "菊池市隈府",
          "山都町下馬尾",
          "氷川町島地",
          "和水町江田",
          "大津町引水",
          "御船町御船",
          "玉名市天水町",
          "熊本美里町永富",
          "菊池市泗水町",
          "合志市御代志",
          "玉名市横島町",
          "阿蘇市一の宮町",
          "上天草市大矢野町",
          "天草市五和町",
          "八代市鏡町",
        ],
        5.7,
      ),
      ...observationsFromNames(
        [
          "南小国町赤馬場",
          "産山村山鹿",
          "玉東町木葉",
          "南阿蘇村吉田",
          "八代市千丁町",
          "熊本高森町高森",
          "甲佐町豊内",
          "氷川町宮原",
          "八代市松江城町",
          "山鹿市鹿央町",
          "菊池市七城町",
          "熊本小国町宮原",
          "長洲町長洲",
          "八代市平山新町",
          "上天草市松島町",
          "山鹿市菊鹿町",
          "玉名市中尾",
          "山鹿市鹿本町",
          "芦北町芦北",
          "芦北町田浦町",
        ],
        5.2,
      ),
      ...observationsFromNames(
        [
          "阿蘇市波野",
          "八代市坂本町",
          "玉名市岱明町",
          "山都町大平",
          "山都町今",
          "和水町板楠",
          "山江村山田",
          "山鹿市老人福祉センター",
          "山鹿市山鹿",
          "宇城市三角町",
          "津奈木町小津奈木",
          "荒尾市宮内出目",
          "八代市泉支所",
          "南関町関町",
          "人吉市西間下町",
          "あさぎり町須惠",
          "八代市東陽町",
          "水俣市牧ノ内",
          "上天草市姫戸町",
        ],
        4.7,
      ),
    ],
    eewForecastAreas: ["九州"],
  },
];
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
  epicenterName: "未選択",
  municipalityName: "未選択",
  maxIntensityLabel: "未計算",
  epicenterEditEnabled: false,
  showStationLayer: false,
  showRegionLayer: false,
  showEewWarningLayer: false,
  selectedPresetId: "",
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
  maxIntensityHistory: [],
  simulationRunning: false,
  simulationPaused: false,
  mapInteracting: false,
  currentLocationEnabled: false,
  currentLocation: null,
  currentLocationName: "-",
  currentLocationStatus: "idle",
  speechMuted: true,
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
  intensityColorScheme: document.querySelector("#intensity-color-scheme"),
  municipalityOutput: document.querySelector("#municipality-output"),
  maxIntensityOutput: document.querySelector("#max-intensity-output"),
  epicenterEditToggle: document.querySelector("#epicenter-edit-toggle"),
  stationLayerToggle: document.querySelector("#station-layer-toggle"),
  regionLayerToggle: document.querySelector("#region-layer-toggle"),
  eewWarningToggle: document.querySelector("#eew-warning-toggle"),
  simulationStationLayerToggle: document.querySelector("#simulation-station-layer-toggle"),
  simulationRegionLayerToggle: document.querySelector("#simulation-region-layer-toggle"),
  simulationEewWarningToggle: document.querySelector("#simulation-eew-warning-toggle"),
  resetEpicenter: document.querySelector("#reset-epicenter"),
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
let municipalityData;
let municipalityDisplayData;
let municipalityLoadPromise;
let boundaryData;
let boundaryLoadPromise;
let localAreaData;
let localAreaLoadPromise;
let epicenterAreaData;
let epicenterAreaLoadPromise;
let plateBoundaryData;
let plateBoundaryLoadPromise;
let surroundingLandData;
let surroundingLandLoadPromise;
let northernIslandsLandData;
let northernIslandsLandLoadPromise;
let groundModelData;
let groundModelLoadPromise;
let shindoStationData;
let shindoStationLoadPromise;
let stationIntensityFeatureCache;
let predictedMaximumCache;
let presetObservationLookupCache;
let presetPickerScrollClampFrame = 0;
let hyogoNanbuSyntheticStationCache;
let stationPopup;
let stationClickPopup;
let stationHoverEventsBound = false;
let hoveredStationFeatureId = null;
let hoveredStationLngLat = null;
let clickedStationFeatureId = null;
let stationCanvasOverlay;
let stationCanvasRenderFrame = 0;
let currentLocationMarker;
let epicenterHoverPopup;
let epicenterClickPopup;
let epicenterHoverLngLat = null;
let epicenterPopupPinned = false;
let currentLocationRequestId = 0;
let currentLocationForecastCache;
let locationResolveTimer;
let simulationFrame;
let municipalityBoundaryVisibilityTimer;
let startupMapVisualReady = false;
let municipalityBoundaryVisible = false;
let startupLocationResolved = false;
let startupIntensityPaintVersion = 0;
let startupOverlayReleasePending = false;
let startupOverlayReleaseTimer;
let simulationStartedAt;
let simulationPausedAt;
let simulationPreviousEpicenterEditEnabled = false;
let simulationEpicenter = [state.longitude, state.latitude];
let simulationRenderBucket = -1;
let maxStationListRenderBucket = null;
let simulationTimeTextCache = "";
let waveRenderRadiusCache = { p: null, s: null };
const waveCircleBearingCache = new Map();
let resetViewAnimating = false;
let postMapInteractionRenderTimer;
let localAreaStationMembershipCache;
let areaEpicentralDistanceCache = {
  key: "",
  distances: [],
};
let speechAnnouncementState = createSpeechAnnouncementState();
let postMunicipalityDataScheduled = false;
const sourceDataRefs = new Map();
const SOURCE_LINKS = [
  { label: "気象庁", href: "https://www.jma.go.jp/" },
  { label: "JMA_Region 震央地名ポリゴン", href: "https://github.com/0Quake/JMA_Region" },
  { label: "東北地方太平洋沖地震（2011）", href: "https://www.data.jma.go.jp/eqev/data/2011_03_11_tohoku/" },
  { label: "大阪北部地震（2018）", href: "https://www.data.jma.go.jp/eqev/data/higai/20180618_oosaka_jishin_menu.html" },
  { label: "熊本地震（2016）", href: "https://www.data.jma.go.jp/eqev/data/2016_04_14_kumamoto/index.html" },
  { label: "地震本部", href: "https://www.jishin.go.jp/" },
  { label: "国土数値情報", href: "https://nlftp.mlit.go.jp/ksj/" },
  { label: "J-SHIS", href: "https://www.j-shis.bosai.go.jp/" },
  { label: "若松・松岡(2020) 地形・地盤分類データ", href: "https://www.j-shis.bosai.go.jp/map/JSHIS2/download.html?lang=jp" },
  { label: "Kunijiban（国土地盤情報）", href: "http://www.kunijiban.pwri.go.jp/jp/" },
  { label: "Natural Earth", href: "https://www.naturalearthdata.com/" },
  { label: "気象研究所 プレート形状データ / Hirose Fuyuki", href: "https://www.mri-jma.go.jp/Dep/sei/fhirose/plate/PlateData.html" },
];
const SOURCE_UPDATED_AT = "2026 07 05";
const SOURCE_SECTIONS = [
  {
    title: "気象庁",
    description: "震央区分、震度観測点、緊急地震速報（警報）の府県予報区、震度階級、長周期地震動、過去地震資料の参照に使用。このサイトでは緊急地震速報の特別警報相当も警報として扱い、表示上は区別しません。",
    links: [
      { label: "気象庁", href: "https://www.jma.go.jp/" },
      { label: "震度情報で用いる区域名", href: "https://www.jma.go.jp/jma/kishou/know/jishin/joho/shindo-name.html" },
      { label: "地震情報で用いる震央地名", href: "https://www.data.jma.go.jp/eqev/data/joho/region/index.html" },
      { label: "JMA_Region 震央地名ポリゴン", href: "https://github.com/0Quake/JMA_Region" },
      { label: "震度観測点", href: "https://www.data.jma.go.jp/eqev/data/kyoshin/jma-shindo.html" },
      { label: "緊急地震速報のしくみ", href: "https://www.jma.go.jp/jma/kishou/know/jishin/eew/shikumi/shikumi.html" },
      { label: "長周期地震動に関する情報の運用開始について", href: "https://www.jma.go.jp/jma/kishou/know/jishin/eew/shiryo/lpgm_start202302/202302_setsumei.pdf" },
      { label: "震度について", href: "https://www.jma.go.jp/jma/kishou/know/shindo/index.html" },
      { label: "東北地方太平洋沖地震（2011）", href: "https://www.data.jma.go.jp/eqev/data/2011_03_11_tohoku/" },
      { label: "大阪府北部の地震（2018）", href: "https://www.data.jma.go.jp/eqev/data/higai/20180618_oosaka_jishin_menu.html" },
      { label: "熊本地震（2016）", href: "https://www.data.jma.go.jp/eqev/data/2016_04_14_kumamoto/index.html" },
    ],
  },
  {
    title: "気象研究所 プレート形状データ",
    description: "日本周辺の海域プレート境界・海溝・トラフ線の描画に使用。",
    links: [
      { label: "プレート形状 数値データ", href: "https://www.mri-jma.go.jp/Dep/sei/fhirose/plate/PlateData.html" },
      { label: "plate_data.tar.gz", href: "https://www.mri-jma.go.jp/Dep/sei/fhirose/data/plate_data.tar.gz" },
    ],
    note: "Kita et al. (2010, EPSL)およびNakajima and Hasegawa (2006, GRL)\nNakajima and Hasegawa (2006, GRL)，弘瀬・他 (2008, 地震)，Nakajima et al. (2009, JGR)\nBaba et al. (2002, PEPI)，Nakajima and Hasegawa (2007, JGR)，Hirose et al. (2008, JGR)",
  },
  {
    title: "地図・地盤・境界データ",
    description: "市区町村、周辺陸域、地盤増幅、シミュレーション補正、背景地図の作成に使用。",
    links: [
      { label: "国土数値情報", href: "https://nlftp.mlit.go.jp/ksj/" },
      { label: "気象庁 GISデータ", href: "https://www.data.jma.go.jp/developer/gis.html" },
      { label: "J-SHIS 地震ハザードステーション", href: "https://www.j-shis.bosai.go.jp/" },
      { label: "若松・松岡(2020) 地形・地盤分類データ", href: "https://www.j-shis.bosai.go.jp/map/JSHIS2/download.html?lang=jp" },
      { label: "Kunijiban（国土地盤情報）", href: "http://www.kunijiban.pwri.go.jp/jp/" },
      { label: "地震本部", href: "https://www.jishin.go.jp/" },
      { label: "Natural Earth", href: "https://www.naturalearthdata.com/" },
      { label: "MapLibre GL JS", href: "https://maplibre.org/maplibre-gl-js/docs/" },
    ],
  },
];
let stationDataCache = {
  bucket: null,
  data: null,
};
let areaDataCache = {
  bucket: null,
  data: null,
};
let lastManagedEpicenter = {
  latitude: state.latitude,
  longitude: state.longitude,
};

setupTabs();
renderDepthOptions();
renderMagnitudeOptions();
renderEarthquakePresetPicker();
renderIntensityColorSchemeOptions();
setStartupInteractionLocked(true);
setInitialSimulationStartLoadingState();
bindSimulationControls();
applyIntensityColorScheme(state.intensityColorScheme, { refreshLayers: false });
setupMobileSheets();
setupTransientPanelScrollbars();
setupPanelScrollbarOffsets();
preventNonMapZoom();
setupViewportStability();
setupSpeechSynthesisRecovery();

if (window.maplibregl) {
  initEarthquakeMap().catch((error) => {
    console.error(error);
    els.status.textContent = "地図の初期化に失敗しました";
  });
} else {
  els.status.textContent = "MapLibre GL JSを読み込めませんでした";
}

function setInitialSimulationStartLoadingState() {
  if (!els.simulationStart) {
    return;
  }

  els.simulationStart.disabled = true;
  els.simulationStart.textContent = "マップを読み込み中...";
  els.simulationStart.title = "マップと震度計算用データを読み込んでいます";
}

function setupTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("panel-active"));

      tab.classList.add("active");
      document.querySelector(`#${tab.dataset.panel}`).classList.add("panel-active");

      if (tab.dataset.panel === "earthquake-panel" && map) {
        requestAnimationFrame(() => safelyResizeMap());
      }
    });
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

  const presets = [...EARTHQUAKE_PRESETS]
    .sort((a, b) => getPresetSortTime(b) - getPresetSortTime(a))
    .map((preset) => {
      const row = document.createElement("tr");
      const intensityClass = getPresetMaxIntensityClass(preset);
      row.className = preset.id === state.selectedPresetId ? "selected" : "";
      row.innerHTML = `
        <td>${escapeHtml(formatPresetDateTime(preset))}</td>
        <td>${escapeHtml(preset.epicenterName ?? preset.label ?? "-")}</td>
        <td>${escapeHtml(formatPresetDepth(preset))}</td>
        <td>${escapeHtml(formatPresetMagnitude(preset))}</td>
        <td><span class="preset-intensity-pill" style="--preset-intensity-color: ${escapeHtml(intensityClass?.color ?? "#d7d5e3")}; --preset-intensity-text: ${escapeHtml(intensityClass?.textColor ?? "#22242b")};">${escapeHtml(formatPresetMaxIntensity(preset))}</span></td>
      `;
      row.addEventListener("click", () => {
        applyEarthquakePreset(preset.id);
        closeEarthquakePresetPicker();
      });
      return row;
    });

  els.presetPickerList.replaceChildren(...presets);
  updateEarthquakePresetButtonLabel();
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

function getPresetMaxIntensityClass(preset) {
  const label = String(preset?.maxIntensity ?? "").trim();
  if (label) {
    const normalizedLabel = label.replace(/^震度/, "");
    const matchedClass = INTENSITY_CLASSES.find(
      (item) =>
        item.label === label ||
        item.shortLabel === label ||
        item.label === normalizedLabel ||
        item.shortLabel === normalizedLabel,
    );
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
  const time = Date.parse(normalizedDate);
  if (Number.isFinite(time)) {
    return time;
  }

  const yearMatch = String(preset?.label ?? "").match(/(?:19|20)\d{2}/);
  return yearMatch ? Date.UTC(Number(yearMatch[0]), 0, 1) : 0;
}

function openEarthquakePresetPicker() {
  renderEarthquakePresetPicker();
  els.presetPickerOverlay?.classList.remove("hidden");
  resetPresetPickerScroll();
  els.presetPickerClose?.focus();
}

function closeEarthquakePresetPicker() {
  els.presetPickerOverlay?.classList.add("hidden");
  els.historicalEarthquakeButton?.focus();
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

async function loadEarthquakePresets() {
  try {
    const response = await fetch(`${EARTHQUAKE_PRESETS_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load earthquake presets: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.presets)) {
      throw new Error("earthquake_presets.json does not contain presets");
    }

    EARTHQUAKE_PRESETS.splice(0, EARTHQUAKE_PRESETS.length, ...data.presets);
    renderEarthquakePresetPicker();
    invalidateIntensityEstimateCache();
    updateIntensityLayer();
  } catch (error) {
    console.warn(error);
  }
}

function bindSimulationControls() {
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
  els.presetPickerOverlay?.addEventListener("click", (event) => {
    if (event.target === els.presetPickerOverlay) {
      closeEarthquakePresetPicker();
    }
  });
  els.presetPickerTableWrap?.addEventListener("scroll", () => schedulePresetPickerScrollClamp(), { passive: true });
  els.presetPickerTableWrap?.addEventListener("touchend", () => schedulePresetPickerScrollClamp(), { passive: true });
  window.addEventListener("resize", () => schedulePresetPickerScrollClamp());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.presetPickerOverlay?.classList.contains("hidden")) {
      closeEarthquakePresetPicker();
    }
  });
  els.intensityColorScheme?.addEventListener("change", () => {
    applyIntensityColorScheme(els.intensityColorScheme.value);
  });
  els.epicenterEditToggle.addEventListener("change", () => updateEpicenterEditMode());
  els.stationLayerToggle.addEventListener("change", () => updateDisplayMode());
  els.regionLayerToggle.addEventListener("change", () => updateDisplayMode());
  els.eewWarningToggle.addEventListener("change", () => updateDisplayMode());
  els.simulationStationLayerToggle.addEventListener("change", () => syncSimulationLayerToggles());
  els.simulationRegionLayerToggle.addEventListener("change", () => syncSimulationLayerToggles());
  els.simulationEewWarningToggle.addEventListener("change", () => syncSimulationLayerToggles());
  els.currentLocationToggle?.addEventListener("change", () => toggleCurrentLocationLink());
  els.simulationStart.addEventListener("click", () => {
    if (state.simulationRunning) {
      stopSimulation();
      return;
    }

    startSimulation();
  });
  els.simulationPause?.addEventListener("click", () => toggleSimulationPause());
  els.simulationStop.addEventListener("click", () => stopSimulation());

  els.resetEpicenter.addEventListener("click", () => {
    state.latitude = 35.681;
    state.longitude = 139.767;
    state.depthKm = 10;
    state.magnitude = 3.5;
    state.selectedPresetId = "";
    state.epicenterName = "未選択";
    state.municipalityName = "未選択";
    invalidateIntensityEstimateCache();
    syncInputs();
    updateEpicenter({ resolveLocation: true, enforceManagedArea: true });
    resetViewAnimating = true;
    updateSimulationAvailability();
    resetMapViewToInitial().finally(() => {
      resetViewAnimating = false;
      updateSimulationAvailability();
    });
  });

  syncInputs();
  updateDisplayMode();
  updateSimulationAvailability();
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

  return INTENSITY_CLASSES.find((item) => item.shortLabel === label || item.label === label);
}

function applyEarthquakePreset(presetId) {
  state.selectedPresetId = presetId;
  const preset = EARTHQUAKE_PRESETS.find((item) => item.id === presetId);
  updateEarthquakePresetButtonLabel();
  renderEarthquakePresetPicker();

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
  updateEpicenter({ resolveLocation: true, preservePresetEpicenterName: isHyogoNanbuPreset(preset) });

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
  updateEarthquakePresetButtonLabel();
  updateLegendColors();
  renderEarthquakePresetPicker();
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
    .replace(/[＊*]/g, "")
    .replace(/（旧[^）]*）/g, "")
    .replace(/\(旧[^)]*\)/g, "")
    .replace(/[()\[\]（）「」『』\s]/g, "")
    .trim();
}

function setupMobileSheets() {
  document.querySelectorAll(".sim-panel").forEach((panel) => {
    setSheetState(panel, isCompactViewport() && panel.id === "simulation-panel" ? "collapsed" : "open");
    const handle = panel.querySelector(".sheet-handle");
    const toggleButton =
      panel.id === "simulation-panel" ? els.simulationSheetToggle : els.setupSheetToggle;

    const toggleSheet = (event) => {
      event?.preventDefault();
      event?.stopPropagation();
      setSheetState(panel, panel.dataset.sheetState === "collapsed" ? "open" : "collapsed");
    };

    toggleButton?.addEventListener("click", toggleSheet);

    if (handle) {
      handle.addEventListener("click", toggleSheet);
    }
  });
}

function setupTransientPanelScrollbars() {
  const scrollTimers = new WeakMap();
  const scrollContainers = document.querySelectorAll(
    "#setup-panel .sim-panel-scroll, #simulation-panel .sim-panel-scroll",
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
  const phoneLandscape = window.matchMedia(
    "(pointer: coarse) and (orientation: landscape) and (max-height: 720px)",
  ).matches;
  return !compactPhone && !phoneLandscape;
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
            "background-color": "#061a3a",
          },
        },
      ],
    },
    center: getInitialMapView().center,
    zoom: getInitialMapView().zoom,
    minZoom: 4,
    maxZoom: 10,
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
  scheduleMapResize();

  addZoomOnlyControl();
  addSourceInfoControl();
  updateEpicenterEditMode();
  map.on("movestart", () => {
    state.mapInteracting = true;
  });
  map.on("moveend", () => {
    state.mapInteracting = false;
    schedulePostMapInteractionRender();
  });
  map.on("render", () => {
    renderStationCanvasOverlay();
  });
  map.on("resize", () => {
    renderStationCanvasOverlay();
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
    updateEpicenter({ resolveLocation: true, enforceManagedArea: true });
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

function onceMapLoaded() {
  if (map.loaded()) {
    return Promise.resolve();
  }

  return new Promise((resolve) => map.once("load", resolve));
}

function addZoomOnlyControl() {
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
      zoomOut.textContent = "−";
      zoomOut.addEventListener("click", () => targetMap.zoomOut({ duration: 240 }));

      container.append(zoomIn, zoomOut);
      return container;
    },
    onRemove() {},
  };

  map.addControl(zoomControl, "top-right");
}

function addSourceInfoControl() {
  const adminOverlay = createAdminModeOverlay();
  const maintenanceOverlay = createMaintenanceModeOverlay();
  const maintenanceBadge = createMaintenanceModeBadge();
  const sourceOverlay = createSourceInfoOverlay(adminOverlay);
  const feedbackOverlay = createFeedbackOverlay();
  const speechConfirmOverlay = createSpeechConfirmOverlay();
  document.body.append(sourceOverlay, feedbackOverlay, speechConfirmOverlay, adminOverlay, maintenanceOverlay, maintenanceBadge);
  setupMaintenanceMode(maintenanceOverlay, maintenanceBadge);

  const sourceInfoControl = {
    onAdd() {
      const container = document.createElement("div");
      container.className = "maplibregl-ctrl source-info-control";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "source-info-button";
      button.textContent = "i";
      button.setAttribute("aria-label", "出典を表示");
      button.setAttribute("aria-expanded", "false");

      button.addEventListener("click", () => {
        sourceOverlay.classList.remove("hidden");
        document.body.classList.add("source-overlay-open");
        button.setAttribute("aria-expanded", "true");
      });

      sourceOverlay.addEventListener("source-overlay-close", () => {
        button.setAttribute("aria-expanded", "false");
      });

      const feedbackButton = document.createElement("button");
      feedbackButton.type = "button";
      feedbackButton.className = "source-info-button feedback-info-button";
      feedbackButton.setAttribute("aria-label", "フィードバックを送信");
      feedbackButton.setAttribute("aria-expanded", "false");

      feedbackButton.addEventListener("click", () => {
        feedbackOverlay.classList.remove("hidden");
        document.body.classList.add("source-overlay-open");
        feedbackButton.setAttribute("aria-expanded", "true");
      });

      feedbackOverlay.addEventListener("feedback-overlay-close", () => {
        feedbackButton.setAttribute("aria-expanded", "false");
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

      container.append(button, feedbackButton, speechButton);
      return container;
    },
    onRemove() {},
  };

  map.addControl(sourceInfoControl, "top-right");
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
    .replace(/四国/g, "シコク")
    .replace(/嶺北/g, "れいほく")
    .replace(/嶺南/g, "れいなん")
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
    .join("、");
  return {
    maxRank,
    signature,
    message: `${intensityText}、${currentLocationText}`,
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

function announceOldScalePresetObservedIntensityUpdate(elapsedSec, intensityLabels) {
  const snapshot = buildOldScalePresetObservedSpeechSnapshot(elapsedSec, intensityLabels);
  if (!snapshot) {
    return;
  }

  if (snapshot.maxRank < speechAnnouncementState.maxObservedRank) {
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
  const closeOverlay = () => {
    overlay.classList.add("hidden");
    document.body.classList.remove("source-overlay-open");
    overlay.dispatchEvent(new CustomEvent("source-overlay-close"));
  };

  closeButton?.addEventListener("click", closeOverlay);
  adminButton?.addEventListener("click", () => {
    openAdminModeOverlay(adminOverlay);
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

function createMaintenanceModeOverlay() {
  const overlay = document.createElement("section");
  overlay.className = "maintenance-mode-overlay hidden";
  overlay.setAttribute("aria-live", "polite");
  overlay.innerHTML = `
    <div class="maintenance-mode-dialog">
      <h2>只今メンテナンス中です。</h2>
      <p>しばらくお待ち下さい。</p>
      <p>詳しくは管理者にお問い合わせください。</p>
    </div>
  `;
  return overlay;
}

function createMaintenanceModeBadge() {
  const badge = document.createElement("div");
  badge.className = "maintenance-mode-badge hidden";
  badge.textContent = "メンテナンスモード中";
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
        <button class="admin-mode-login" type="submit">親端末にする</button>
        <button class="admin-mode-maintenance" id="admin-maintenance-toggle" type="button" disabled>メンテナンスモード</button>
      </div>
      <p class="admin-mode-status" id="admin-mode-status" role="status" aria-live="polite"></p>
    </form>
  `;

  const closeButton = overlay.querySelector(".source-info-close");
  const form = overlay.querySelector("#admin-mode-form");
  const passwordInput = overlay.querySelector("#admin-mode-password");
  const status = overlay.querySelector("#admin-mode-status");
  const loginButton = overlay.querySelector(".admin-mode-login");
  const toggleButton = overlay.querySelector("#admin-maintenance-toggle");

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
    const token = localStorage.getItem(ADMIN_PARENT_TOKEN_KEY);
    if (token) {
      setAdminModeStatus(status, "解除中...");
      if (loginButton) {
        loginButton.disabled = true;
      }
      if (toggleButton) {
        toggleButton.disabled = true;
      }
      const current = await fetchMaintenanceStatus();
      const result = await postMaintenanceAction("releaseParent", { token });
      if (!result.ok) {
        updateAdminModeControls(overlay, current);
        setAdminModeStatus(status, result.message || "親端末の解除に失敗しました。", true);
        return;
      }

      localStorage.removeItem(ADMIN_PARENT_TOKEN_KEY);
      passwordInput.value = "";
      updateAdminModeControls(overlay, { maintenance: false });
      notifyMaintenanceStatusChange({ maintenance: false });
      setAdminModeStatus(status, current.maintenance ? "親端末を解除し、メンテナンスモードも解除しました。" : "親端末を解除しました。");
      return;
    }
    setAdminModeStatus(status, "確認中...");
    const result = await postMaintenanceAction("adminLogin", {
      password: passwordInput?.value ?? "",
    });
    if (!result.ok || !result.token) {
      localStorage.removeItem(ADMIN_PARENT_TOKEN_KEY);
      updateAdminModeControls(overlay);
      const message = result.ok && !result.token
        ? "Apps Scriptの管理者処理が未反映です。デプロイを更新してください。"
        : result.message || "認証できませんでした。";
      setAdminModeStatus(status, message, true);
      return;
    }

    localStorage.setItem(ADMIN_PARENT_TOKEN_KEY, result.token);
    passwordInput.value = "";
    updateAdminModeControls(overlay);
    setAdminModeStatus(status, "この端末を親端末にしました。");
  });

  toggleButton?.addEventListener("click", async () => {
    const token = localStorage.getItem(ADMIN_PARENT_TOKEN_KEY);
    if (!token) {
      setAdminModeStatus(status, "先に親端末認証をしてください。", true);
      return;
    }

    setAdminModeStatus(status, "切替中...");
    const current = await fetchMaintenanceStatus();
    const nextMaintenance = !Boolean(current.maintenance);
    const result = await postMaintenanceAction("setMaintenance", {
      token,
      maintenance: nextMaintenance,
    });
    if (!result.ok) {
      setAdminModeStatus(status, result.message || "切替に失敗しました。", true);
      return;
    }

    updateAdminModeControls(overlay, { maintenance: nextMaintenance });
    notifyMaintenanceStatusChange({ maintenance: nextMaintenance });
    setAdminModeStatus(status, nextMaintenance ? "メンテナンスモードに切り替えました。" : "メンテナンスモードを解除しました。");
  });

  return overlay;
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
  const loginButton = overlay.querySelector(".admin-mode-login");
  const toggleButton = overlay.querySelector("#admin-maintenance-toggle");
  if (loginButton) {
    loginButton.disabled = false;
    loginButton.textContent = isParentTerminal ? "親端末を解除" : "親端末にする";
  }
  if (toggleButton) {
    toggleButton.disabled = !isParentTerminal;
    if (!isParentTerminal) {
      toggleButton.textContent = "メンテナンスモード";
    } else if (maintenanceStatus && typeof maintenanceStatus.maintenance === "boolean") {
      toggleButton.textContent = maintenanceStatus.maintenance ? "メンテナンスモード解除" : "メンテナンスモード";
    } else {
      toggleButton.textContent = "確認中...";
      fetchMaintenanceStatus().then((status) => {
        const isStillParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY));
        if (!isStillParentTerminal) {
          toggleButton.textContent = "メンテナンスモード";
          toggleButton.disabled = true;
          return;
        }
        toggleButton.textContent = status.maintenance ? "メンテナンスモード解除" : "メンテナンスモード";
        toggleButton.disabled = false;
        notifyMaintenanceStatusChange(status);
      });
    }
  }
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
    const status = await fetchMaintenanceStatus();
    updateMaintenanceStateIndicators(maintenanceOverlay, maintenanceBadge, status);
  };

  window.addEventListener("maintenance-status-change", (event) => {
    updateMaintenanceStateIndicators(maintenanceOverlay, maintenanceBadge, event.detail);
  });
  refresh();
  window.setInterval(refresh, MAINTENANCE_STATUS_POLL_MS);
}

function updateMaintenanceStateIndicators(overlay, badge, status) {
  const isParentTerminal = Boolean(localStorage.getItem(ADMIN_PARENT_TOKEN_KEY));
  if (overlay) {
    overlay.classList.toggle("hidden", !status.maintenance || isParentTerminal);
  }
  if (badge) {
    badge.classList.toggle("hidden", !status.maintenance || !isParentTerminal);
  }
}

function notifyMaintenanceStatusChange(status) {
  window.dispatchEvent(new CustomEvent("maintenance-status-change", { detail: status }));
}

async function fetchMaintenanceStatus() {
  if (isLocalDevelopmentHost()) {
    return { maintenance: false };
  }

  try {
    const url = `${MAINTENANCE_ENDPOINT_URL}?action=maintenanceStatus&ts=${Date.now()}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return { maintenance: false };
    }
    const data = await response.json();
    return { maintenance: Boolean(data.maintenance) };
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
    const response = await fetch(MAINTENANCE_ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...payload }),
    });
    if (!response.ok) {
      return { ok: false };
    }
    return await response.json();
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
  const closeOverlay = () => {
    overlay.classList.add("hidden");
    document.body.classList.remove("source-overlay-open");
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

  textarea.placeholder = getFeedbackPlaceholderText();
}

function getFeedbackPlaceholderText() {
  return [
    "例：スマホでメニューが少し開きにくい。",
    "　　震度表示を見やすくしてほしい。",
    "　　など",
  ].join("\n");
}

function buildFeedbackOverlayHtml() {
  return `
    <button class="source-info-close" type="button" aria-label="フィードバックを閉じる">×</button>
    <form class="source-info-overlay-content feedback-form" id="feedback-form">
      <header class="source-info-header">
        <p>FEEDBACK</p>
        <h2>フィードバック</h2>
      </header>
      <label class="feedback-field" for="feedback-message">
        <span>気づいた点、改善してほしい点など</span>
        <textarea id="feedback-message" name="message" rows="10" maxlength="4000" placeholder="${escapeHtml(getFeedbackPlaceholderText())}"></textarea>
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
    const links = section.links
      .map(
        (source) =>
          `<li><a href="${source.href}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a></li>`,
      )
      .join("");
    const note = section.note ? `<pre class="source-citation-note">${escapeHtml(section.note)}</pre>` : "";

    return `
      <section class="source-info-section">
        <h3>${escapeHtml(section.title)}</h3>
        <p>${escapeHtml(section.description)}</p>
        <ul>${links}</ul>
        ${note}
      </section>
    `;
  }).join("");

  return `
    <button class="source-info-close" type="button" aria-label="出典を閉じる">×</button>
    <div class="source-info-overlay-content">
      <header class="source-info-header">
        <p>SOURCES</p>
        <h2>出典一覧</h2>
      </header>
      <div class="source-info-sections">${sections}</div>
    </div>
    <div class="source-info-footer">
      <button class="source-admin-mode-button" type="button">管理者モード</button>
      <p class="source-info-updated">最終更新：${formatSourceUpdatedAt(SOURCE_UPDATED_AT)}</p>
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
  addGeoJsonSource("municipalities", emptyFeatureCollection());
  addGeoJsonSource("municipalities-linework", emptyFeatureCollection());
  addGeoJsonSource("excluded-japan-islands", emptyFeatureCollection());
  addGeoJsonSource("northern-islands-land", emptyFeatureCollection());
  addGeoJsonSource("jma-local-areas", emptyFeatureCollection());
  addGeoJsonSource("plate-boundaries", emptyFeatureCollection());
  addGeoJsonSource("shindo-stations", emptyFeatureCollection());
  addGeoJsonSource("p-wave", emptyFeatureCollection());
  addGeoJsonSource("s-wave", emptyFeatureCollection());
  addGeoJsonSource("boundaries", emptyFeatureCollection());

  fitInitialMapBounds(getInitialJapanBounds());
  hydrateDeferredMapData();
}

async function hydrateDeferredMapData() {
  try {
    const [
      municipalities,
      surroundingLand,
      boundaries,
      localAreas,
      shindoStations,
    ] = await Promise.all([
      loadMunicipalitySourceData(),
      loadSurroundingLand(),
      loadBoundaryLayers(),
      loadLocalAreas(),
      loadShindoStations(),
    ]);

    window.requestAnimationFrame(() => {
      const displayMunicipalities = filterExcludedGeoJsonFeatures(municipalities);
      municipalityDisplayData = municipalityDisplayData ?? withoutInteriorRings(displayMunicipalities);
      shindoStationData = shindoStations;
      invalidateIntensityEstimateCache();

      setGeoJsonSourceData("surrounding-land", filterSurroundingLandForDisplay(surroundingLand));
      setGeoJsonSourceData(
        "boundaries",
        removeExcludedJapanIslandLinework(filterExcludedGeoJsonFeatures(boundaries)),
      );
      setGeoJsonSourceData(
        "municipalities-linework",
        removeExcludedJapanIslandPolygons(municipalityDisplayData),
      );
      setGeoJsonSourceData(
        "excluded-japan-islands",
        extractExcludedJapanIslandPolygons(municipalityDisplayData),
      );
      setGeoJsonSourceData("municipalities", municipalityDisplayData);
      const initialAreaData = buildIntensityAreaData(localAreaData, Infinity);
      setGeoJsonSourceData("jma-local-areas", initialAreaData);
      setGeoJsonSourceData("shindo-stations", buildStationIntensityData(shindoStationData, Infinity));
      updateSetupResultOutputs();
      addMapLayers();
      setupStationHoverPopup();
      keepWaveAndStationLayerOrder();
      safelyResizeMap();
      if (document.body.classList.contains("map-core-loading")) {
        startupLocationResolved = true;
      }
      showMunicipalityLinework();
      scheduleLocationResolve();
      updateSimulationAvailability();
      schedulePostMunicipalityDataHydration();
    });
  } catch (error) {
    console.warn(error);
    document.body.classList.remove("map-core-loading");
  } finally {
    updateSimulationAvailability();
  }
}

function showMunicipalityLinework() {
  startupMapVisualReady = false;
  startupOverlayReleasePending = false;
  startupIntensityPaintVersion = 0;
  municipalityBoundaryVisible = false;
  updateLayerVisibility("japan-land-gap-fill", true);
  updateLayerVisibility("municipality-boundaries", false);
  window.clearTimeout(municipalityBoundaryVisibilityTimer);
  municipalityBoundaryVisibilityTimer = window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      updateLayerVisibility("municipality-boundaries", true);
      municipalityBoundaryVisible = true;
      scheduleStartupReadyAfterIntensityPaint();
    });
  }, 360);
}

function scheduleStartupReadyAfterIntensityPaint() {
  if (
    startupMapVisualReady ||
    startupOverlayReleasePending ||
    !startupLocationResolved ||
    !municipalityBoundaryVisible ||
    !municipalityDisplayData?.features?.length ||
    !localAreaData?.features?.length ||
    !shindoStationData
  ) {
    return;
  }

  startupOverlayReleasePending = true;
  const paintVersion = startupIntensityPaintVersion;
  waitForStableStartupMap(paintVersion).then((stable) => {
    if (stable) {
      scheduleStartupMapOverlayRelease();
    } else {
      startupOverlayReleasePending = false;
      scheduleStartupReadyAfterIntensityPaint();
    }
  });
}

function scheduleStartupMapOverlayRelease() {
  window.clearTimeout(startupOverlayReleaseTimer);
  startupOverlayReleaseTimer = window.setTimeout(() => {
    startupOverlayReleasePending = false;
    releaseStartupMapOverlay();
  }, 700);
}

function releaseStartupMapOverlay() {
  startupMapVisualReady = true;
  map?.resize();
  renderStationCanvasOverlay();
  document.body.classList.remove("map-core-loading");
  updateSimulationAvailability();
}

async function waitForStableStartupMap(paintVersion) {
  await waitForMapIdle(1200, { force: true });
  await waitForAnimationFrames(isCompactViewport() || isTabletViewport() ? 6 : 4);
  await waitForMapIdle(700, { force: true });
  await waitForAnimationFrames(2);
  return (
    paintVersion === startupIntensityPaintVersion &&
    startupLocationResolved &&
    municipalityBoundaryVisible &&
    Boolean(municipalityDisplayData?.features?.length) &&
    Boolean(localAreaData?.features?.length) &&
    Boolean(shindoStationData)
  );
}

function isStartupIntensityLayerReady() {
  const areaData = sourceDataRefs.get("jma-local-areas");
  return Boolean(
    map?.getLayer("jma-intensity-fill") &&
      map?.getSource("jma-local-areas") &&
      areaData?.features?.length &&
      areaData.features.every((feature) => typeof feature.properties?.intensityColor === "string"),
  );
}

function waitForAnimationFrames(count = 1) {
  return new Promise((resolve) => {
    const step = (remaining) => {
      if (remaining <= 0) {
        resolve();
        return;
      }

      window.requestAnimationFrame(() => step(remaining - 1));
    };
    step(count);
  });
}

function waitForMapIdle(timeoutMs = 1200, options = {}) {
  if (!map || (!options.force && map.loaded())) {
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
      map.off("idle", finish);
      resolve();
    };
    const timeoutId = window.setTimeout(finish, timeoutMs);
    map.once("idle", finish);
  });
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
}

function scheduleDeferredTask(callback, delayMs = 0, timeoutMs = 3000) {
  window.setTimeout(() => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(callback, { timeout: timeoutMs });
      return;
    }

    window.setTimeout(callback, 0);
  }, delayMs);
}

function loadSecondaryMapData() {
  loadEpicenterAreas().catch((error) => console.warn(error));
  loadPlateBoundaries()
    .then((plateBoundaries) => {
      setGeoJsonSourceData("plate-boundaries", plateBoundaries);
      keepWaveAndStationLayerOrder();
    })
    .catch((error) => console.warn(error));
  loadNorthernIslandsLand()
    .then((northernIslandsLand) => {
      setNorthernIslandDisplayData(withoutInteriorRings(northernIslandsLand));
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
      setGeoJsonSourceData("shindo-stations", buildStationIntensityData(shindoStations));
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
        return removeNorthernIslandDisplayPolygonsFromFeature(feature);
      }

      return [];
    }),
  };
}

function removeNorthernIslandDisplayPolygonsFromFeature(feature) {
  const geometry = feature.geometry;
  if (!geometry?.coordinates) {
    return [feature];
  }

  if (geometry.type === "MultiPolygon") {
    const coordinates = geometry.coordinates.filter((polygon) => !isNorthernIslandDisplayPolygon(polygon));
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

  if (geometry.type === "Polygon" && isNorthernIslandDisplayPolygon(geometry.coordinates)) {
    return [];
  }

  return [feature];
}

function isExcludedJapanIslandPolygon(polygon) {
  const outerRing = polygon?.[0];
  if (!Array.isArray(outerRing) || outerRing.length === 0) {
    return false;
  }

  const center = getRingCentroidCoordinate(outerRing);
  if (!center) {
    return false;
  }

  return isPointInExcludedJapanDisplayBounds(center);
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
    scheduleStationCanvasRender();
    updateActiveStationPopups(data);
  }
  return true;
}

function addMapLayers() {
  ensureStationCanvasOverlay();

  addLayerIfMissing({
    id: "surrounding-land-fill",
    type: "fill",
    source: "surrounding-land",
    paint: {
      "fill-antialias": false,
      "fill-color": "#6f777f",
      "fill-outline-color": "#6f777f",
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "japan-land-fill",
    type: "fill",
    source: "municipalities",
    paint: {
      "fill-antialias": false,
      "fill-color": "#8c9298",
      "fill-outline-color": "rgba(140, 146, 152, 0)",
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "japan-land-gap-fill",
    type: "line",
    source: "municipalities-linework",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#8c9298",
      "line-opacity": 1,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 2.1, 7, 1.45, 10, 0.8, 12, 0.55],
    },
  });

  addLayerIfMissing({
    id: "excluded-japan-islands-fill",
    type: "fill",
    source: "excluded-japan-islands",
    paint: {
      "fill-antialias": false,
      "fill-color": "#8c9298",
      "fill-outline-color": "rgba(140, 146, 152, 0)",
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "excluded-japan-islands-outline",
    type: "line",
    source: "excluded-japan-islands",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#b9c2ca",
      "line-opacity": 0.72,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.45, 7, 0.75, 10, 1.05],
    },
  });
  updateLayerVisibility("excluded-japan-islands-outline", false);

  addLayerIfMissing({
    id: "northern-islands-land-fill",
    type: "fill",
    source: "northern-islands-land",
    paint: {
      "fill-antialias": false,
      "fill-color": "#8c9298",
      "fill-outline-color": "#8c9298",
      "fill-opacity": 1,
    },
  });

  addLayerIfMissing({
    id: "northern-islands-land-outline",
    type: "line",
    source: "northern-islands-land",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#c9d3dc",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 4, 0.56, 7, 0.72, 10, 0.86],
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.9, 7, 1.45, 10, 2.05],
    },
  });
  updateLayerVisibility("northern-islands-land-outline", false);

  addLayerIfMissing({
    id: "plate-boundaries",
    type: "line",
    source: "plate-boundaries",
    paint: {
      "line-color": [
        "match",
        ["get", "kind"],
        "trough",
        "#f2d06b",
        "slab_contour",
        "#9be7ff",
        "#78d4ff",
      ],
      "line-opacity": ["match", ["get", "kind"], "trench", 0.48, 0.34],
      "line-width": [
        "match",
        ["get", "kind"],
        "trench",
        1.25,
        0.85,
      ],
      "line-dasharray": [4, 2.5],
    },
  });

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
    id: "eew-warning-fill",
    type: "fill",
    source: "jma-local-areas",
    filter: ["==", ["get", "eewWarning"], true],
    paint: {
      "fill-color": ["case", ["==", ["get", "eewBlinkOff"], true], "#8c9298", "#e60012"],
      "fill-opacity": 0.94,
    },
  });
  updateLayerVisibility("eew-warning-fill", state.showEewWarningLayer);

  addLayerIfMissing({
    id: "municipality-boundaries",
    type: "line",
    source: "municipalities-linework",
    minzoom: MUNICIPALITY_BOUNDARY_MIN_ZOOM,
    paint: {
      "line-color": "#ffffff",
      "line-opacity": 0.58,
      "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.36, 10, 0.58],
    },
  });
  updateLayerVisibility("municipality-boundaries", false);

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
      "fill-opacity": 1,
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
      "fill-opacity": 1,
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
  moveLayerToTop("northern-islands-land-fill");
  moveLayerToTop("northern-islands-land-outline");
  moveLayerToTop("p-wave-fill");
  moveLayerToTop("s-wave-fill");
  moveLayerToTop("shindo-station-points");
  moveLayerToTop("p-wave-line");
  moveLayerToTop("s-wave-line");
}

function updateLayerVisibility(layerId, visible) {
  if (map?.getLayer(layerId)) {
    map.setLayoutProperty(layerId, "visibility", visible ? "visible" : "none");
  }
  if (layerId === "shindo-station-points") {
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
  scheduleStationCanvasRender();
}

function scheduleStationCanvasRender() {
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

  const features = sourceDataRefs.get("shindo-stations")?.features ?? [];
  const zoom = map.getZoom();
  if (state.showStationLayer && features.length) {
    const radius = interpolateByZoom(zoom, [
      [4, 7.5],
      [7, 9],
      [10, 10.5],
    ]);
  const fontSize = interpolateByZoom(zoom, [
    [4, 9.2],
    [8.8, 10.8],
    [11, 11.6],
  ]);
    const labelFadeStartZoom = STATION_LABEL_ALL_VISIBLE_MIN_ZOOM - 0.18;
    const labelAlpha = smoothStep(clamp((zoom - labelFadeStartZoom) / 0.18, 0, 1));
    const padding = radius + 6;

    [...features]
      .sort((a, b) => Number(a.properties?.stationDisplaySortKey ?? 0) - Number(b.properties?.stationDisplaySortKey ?? 0))
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
        drawStationCanvasMarker(context, point.x, point.y, radius, fontSize, labelAlpha, properties);
      });
  }

  drawWaveCanvasLine(context, "p-wave", "#7de7ff", 2.4, 0.9);
  drawWaveCanvasLine(context, "s-wave", "#ff6b7f", 3.4, 0.95);
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

  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = fillColor;
  context.fill();
  context.lineWidth = 1.05;
  context.strokeStyle = "#111827";
  context.stroke();

  if (labelAlpha <= 0) {
    return;
  }

  context.save();
  context.globalAlpha = labelAlpha;
  context.font = `700 ${fontSize}px "Noto Sans", "Arial", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineWidth = 0.9;
  context.strokeStyle = Number(properties.intensityRank ?? 0) <= 2 ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.32)";
  context.fillStyle = textColor;
  context.strokeText(String(properties.intensityShortLabel ?? ""), x, y + 0.35);
  context.fillText(String(properties.intensityShortLabel ?? ""), x, y + 0.35);
  context.restore();
}

function drawWaveCanvasLine(context, sourceId, color, lineWidth, alpha) {
  const features = sourceDataRefs.get(sourceId)?.features ?? [];
  if (!features.length) {
    return;
  }

  context.save();
  context.globalAlpha = alpha;
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";

  features.forEach((feature) => {
    const rings = feature.geometry?.coordinates ?? [];
    rings.forEach((ring) => {
      if (!Array.isArray(ring) || ring.length < 2) {
        return;
      }

      context.beginPath();
      ring.forEach((coordinate, index) => {
        const point = map.project({ lng: coordinate[0], lat: coordinate[1] });
        if (index === 0) {
          context.moveTo(point.x, point.y);
          return;
        }
        context.lineTo(point.x, point.y);
      });
      context.stroke();
    });
  });

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
}

function getInitialMapView() {
  return isCompactViewport()
    ? { center: MOBILE_INITIAL_CENTER, zoom: MOBILE_INITIAL_ZOOM }
    : { center: INITIAL_CENTER, zoom: INITIAL_ZOOM };
}

function getInitialMapPaddingForViewport() {
  if (isCompactViewport()) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
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
  state.showRegionLayer = els.regionLayerToggle.checked;
  state.showEewWarningLayer = els.eewWarningToggle.checked;
  els.simulationStationLayerToggle.checked = state.showStationLayer;
  els.simulationRegionLayerToggle.checked = state.showRegionLayer;
  els.simulationEewWarningToggle.checked = state.showEewWarningLayer;
  updateLayerVisibility("shindo-station-points", state.showStationLayer);
  updateLayerVisibility("jma-intensity-fill", state.showRegionLayer);
  updateLayerVisibility("eew-warning-fill", state.showEewWarningLayer);
  if (state.showStationLayer && map?.getSource("shindo-stations")) {
    setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(getSimulationStationElapsedSec()));
    keepWaveAndStationLayerOrder();
  }
  updateEewReplacementMode();
  updateEewForecastPanel();
}

function syncSimulationLayerToggles() {
  state.showStationLayer = els.simulationStationLayerToggle.checked;
  state.showRegionLayer = els.simulationRegionLayerToggle.checked;
  state.showEewWarningLayer = els.simulationEewWarningToggle.checked;
  els.stationLayerToggle.checked = state.showStationLayer;
  els.regionLayerToggle.checked = state.showRegionLayer;
  els.eewWarningToggle.checked = state.showEewWarningLayer;
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

  map.on("mouseenter", "shindo-station-points", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mousemove", "shindo-station-points", (event) => {
    const feature = event.features?.[0];
    if (!feature) {
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

  map.on("click", "shindo-station-points", (event) => {
    const feature = event.features?.[0];
    if (!feature) {
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

  map.on("mouseleave", "shindo-station-points", () => {
    map.getCanvas().style.cursor = "";
    hoveredStationFeatureId = null;
    hoveredStationLngLat = null;
    stationPopup.remove();
  });
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
    return null;
  }

  return data.features.find((feature) => String(feature.properties?.id ?? "") === String(featureId))?.properties ?? null;
}

function stationPopupHtml(properties) {
  const waveLabel =
    properties.waveState === "p"
      ? `P波到達 / S波 ${Number(properties.sArrivalSec).toFixed(1)}秒`
      : `震度${properties.intensityLabel}`;
  const currentValue = Number(properties.currentIntensityValue ?? properties.intensityValue ?? 0);
  const predictedValue = Number(properties.predictedIntensityValue ?? 0);
  const currentMeasured = formatMeasuredIntensity(properties, currentValue);
  const predictedMeasured = formatMeasuredIntensity(properties, predictedValue);

  return [
    `<strong>${escapeHtml(properties.name)}</strong>`,
    `<span>${escapeHtml(properties.areaName ?? "")}</span>`,
    `<span>${escapeHtml(properties.observationStatus ?? "")}</span>`,
    `<span>${escapeHtml(waveLabel)}</span>`,
    `<span>現在震度 ${escapeHtml(properties.intensityLabel ?? "0")}（計測震度 ${currentMeasured}）</span>`,
    `<span>最大震度 ${escapeHtml(properties.predictedIntensityLabel ?? "0")}（計測震度 ${predictedMeasured}）</span>`,
    `<span>震央距離 ${Number(properties.epicentralDistanceKm ?? 0).toFixed(0)} km</span>`,
    `<span>P波 ${Number(properties.pArrivalSec ?? 0).toFixed(1)}秒 / S波 ${Number(properties.sArrivalSec ?? 0).toFixed(1)}秒</span>`,
  ].join("");
}

function formatMeasuredIntensity(properties, fallbackValue) {
  if (properties.actualObserved && properties.measuredIntensity == null) {
    return "-";
  }

  const value = Number(properties.measuredIntensity ?? fallbackValue);
  const displayValue = clamp(value, 0, 6.7);
  return Number.isFinite(displayValue) ? displayValue.toFixed(1) : "-";
}

function getMeasuredIntensityListSuffix(properties, fallbackValue) {
  if (properties.actualObserved && properties.measuredIntensity == null) {
    return "";
  }

  const measuredIntensity = formatMeasuredIntensity(properties, fallbackValue);
  return measuredIntensity === "-" ? "" : `（${measuredIntensity}）`;
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
    let watchId = null;
    let settleTimer = null;
    let timeoutTimer = null;
    let bestPosition = null;
    let lastError = null;
    const isIpad = isIpadLikeDevice();
    const maxWaitMs = isIpad ? GEOLOCATION_IPAD_MAX_WAIT_MS : GEOLOCATION_MAX_WAIT_MS;
    const acceptableAccuracy = isIpad ? GEOLOCATION_IPAD_ACCEPTABLE_ACCURACY_M : GEOLOCATION_ACCEPTABLE_ACCURACY_M;

    const clearTimers = () => {
      if (watchId != null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
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
    watchId = navigator.geolocation.watchPosition(onPosition, onError, highAccuracyOptions);
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
    const municipalities = await loadMunicipalities();
    const municipality = findFeatureAtPoint(municipalities, longitude, latitude);
    if (!municipality || isExcludedTerritoryName(municipality.properties?.name)) {
      return "-";
    }
    const prefecture = cleanDisplayAreaName(municipality.properties?.prefecture || "");
    const municipalityName = cleanDisplayAreaName(
      municipality.properties?.municipality || municipality.properties?.name || "",
    );
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
    setTextContentIfChanged(els.currentLocationIntensity, "該当無し");
    setTextContentIfChanged(els.currentLocationArrival, "該当無し");
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
  state.maxIntensityHistory = [];
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
  simulationRenderBucket = -1;
  maxStationListRenderBucket = null;
  simulationTimeTextCache = "";
  state.simulationRunning = true;
  state.simulationPaused = false;
  state.epicenterEditEnabled = false;
  els.epicenterEditToggle.checked = false;
  state.showStationLayer = els.stationLayerToggle.checked;
  state.showRegionLayer = els.regionLayerToggle.checked;
  state.showEewWarningLayer = els.eewWarningToggle.checked;
  els.simulationStationLayerToggle.checked = state.showStationLayer;
  els.simulationRegionLayerToggle.checked = state.showRegionLayer;
  els.simulationEewWarningToggle.checked = state.showEewWarningLayer;
  updateEpicenterEditMode();
  simulationStartedAt = performance.now();
  simulationPausedAt = null;
  updateIntensityLayer();
  updateLayerVisibility("shindo-station-points", state.showStationLayer);
  updateLayerVisibility("jma-intensity-fill", state.showRegionLayer);
  updateLayerVisibility("eew-warning-fill", state.showEewWarningLayer);
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
  els.simulationStart.textContent = "シミュレーション中止";
  els.setupPanel.classList.add("hidden");
  els.simulationPanel.classList.remove("hidden");
  setSheetState(els.simulationPanel, isCompactViewport() ? "collapsed" : "open");
  cancelAnimationFrame(simulationFrame);
  tickSimulation(simulationStartedAt);
}

function stopSimulation() {
  cancelSpeechAnnouncements();
  state.simulationRunning = false;
  state.simulationPaused = false;
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
  simulationPausedAt = null;
  simulationRenderBucket = -1;
  maxStationListRenderBucket = null;
  simulationTimeTextCache = "";
  state.epicenterEditEnabled = simulationPreviousEpicenterEditEnabled;
  els.epicenterEditToggle.checked = state.epicenterEditEnabled;
  updateEpicenterEditMode();
  els.simulationStart.textContent = "シミュレーション開始";
  if (els.simulationPause) {
    els.simulationPause.textContent = "一時停止";
    els.simulationPause.disabled = true;
  }
  els.setupPanel.classList.remove("hidden");
  els.simulationPanel.classList.add("hidden");
  setSheetState(els.setupPanel, "open");
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
    const pauseDuration = performance.now() - simulationPausedAt;
    simulationStartedAt += pauseDuration;
    simulationPausedAt = null;
    state.simulationPaused = false;
    els.simulationPause.textContent = "一時停止";
    resumeSpeechAnnouncements();
    simulationFrame = requestAnimationFrame(tickSimulation);
    return;
  }

  state.simulationPaused = true;
  simulationPausedAt = performance.now();
  cancelAnimationFrame(simulationFrame);
  simulationFrame = null;
  pauseSpeechAnnouncements();
  els.simulationPause.textContent = "再開";
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
  updateCurrentLocationForecast(elapsedSec);

  if (currentBucket !== simulationRenderBucket && !state.mapInteracting) {
    simulationRenderBucket = currentBucket;

    if (map?.getSource("shindo-stations") && shindoStationData) {
      setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(elapsedSec));
    }
    if (map?.getSource("jma-local-areas") && localAreaData) {
      setGeoJsonSourceData("jma-local-areas", buildIntensityAreaData(localAreaData, elapsedSec));
    }

    updateSimulationSummary(elapsedSec);
  }

  if (isSimulationComplete(elapsedSec)) {
    state.simulationRunning = false;
    state.simulationPaused = false;
    state.eewWarningFinalReport = state.eewWarningReportNumber != null;
    resetSpeechAnnouncementState();
    finishSpeechAnnouncementsGracefully();
    simulationFrame = null;
    simulationPausedAt = null;
    maxStationListRenderBucket = null;
    clearCurrentLocationLink({ updateForecast: false });
    resetWaveRenderCache();
    setWaveRadiusData(0, 0);
    if (map?.getSource("jma-local-areas") && localAreaData) {
      setGeoJsonSourceData("jma-local-areas", buildIntensityAreaData(localAreaData, Infinity));
    }
    updateSimulationSummary(Infinity);
    state.epicenterEditEnabled = simulationPreviousEpicenterEditEnabled;
    els.epicenterEditToggle.checked = state.epicenterEditEnabled;
    updateEpicenterEditMode();
    els.simulationStart.textContent = "シミュレーション開始";
    if (els.simulationPause) {
      els.simulationPause.textContent = "一時停止";
      els.simulationPause.disabled = true;
    }
    els.setupPanel.classList.remove("hidden");
    els.simulationPanel.classList.add("hidden");
    setSheetState(els.setupPanel, "open");
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
  return Number.isFinite(elapsedSec) ? Math.max(Math.floor(elapsedSec * 4), 0) : Infinity;
}

function updateSimulationSummary(elapsedSec = getSimulationStationElapsedSec()) {
  const stationFeatures = [];
  let maxRank = 0;
  let maxValue = 0;
  if (shindoStationData) {
    getStationIntensityDataForElapsed(elapsedSec).features.forEach((feature) => {
      if (!feature.properties.observed || feature.properties.intensityRank <= 0) {
        return;
      }

      stationFeatures.push(feature);
      maxRank = Math.max(maxRank, feature.properties.intensityRank);
      maxValue = Math.max(maxValue, feature.properties.currentIntensityValue ?? 0);
    });
  }
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
  setTextContentIfChanged(els.maxIntensityOutput, state.maxIntensityLabel);
  updateCurrentLocationForecast(elapsedSec);
  updateMaxStationList(stationFeatures, elapsedSec);
  announceSimulationUpdates(elapsedSec);

  if (hasObservedIntensity) {
    recordMaxIntensityHistory(elapsedSec, maxValue);
  }
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
  const observedStations = [...stationFeatures].sort(
    (a, b) => b.properties.currentIntensityValue - a.properties.currentIntensityValue,
  );
  els.maxStationList.replaceChildren(
    ...(observedStations.length > 0
      ? observedStations.map((feature, index) => {
          const item = document.createElement("li");
          item.dataset.rank = String(index + 1);
          const measuredIntensityText = getMeasuredIntensityListSuffix(
            feature.properties,
            feature.properties.currentIntensityValue,
          );
          item.textContent = `${feature.properties.name}　震度${feature.properties.intensityLabel}${measuredIntensityText}`;
          return item;
        })
      : [document.createElement("li")]),
  );

  if (observedStations.length === 0) {
    els.maxStationList.firstElementChild.textContent = "震度1以上の観測点はありません";
  }
}

function recordMaxIntensityHistory(elapsedSec, maxValue) {
  if (!state.simulationRunning || !Number.isFinite(elapsedSec)) {
    return;
  }

  const lastPoint = state.maxIntensityHistory.at(-1);
  if (lastPoint && elapsedSec - lastPoint.elapsedSec < 0.25) {
    lastPoint.maxIntensityValue = Number(Math.max(lastPoint.maxIntensityValue, maxValue).toFixed(2));
    return;
  }

  state.maxIntensityHistory.push({
    elapsedSec: Number(elapsedSec.toFixed(2)),
    maxIntensityValue: Number(maxValue.toFixed(2)),
  });
}

function isSimulationComplete(elapsedSec) {
  if (!shindoStationData) {
    return false;
  }

  const observedStations = buildStationIntensityFeatures(shindoStationData).filter(
    (feature) => feature.properties.predictedIntensityRank >= 1,
  );
  if (observedStations.length === 0) {
    return elapsedSec >= SIMULATION_END_GRACE_SEC;
  }

  const latestEndSec = Math.max(
    ...observedStations.map((feature) => feature.properties.intensityCompleteSec),
  );
  return elapsedSec >= latestEndSec + SIMULATION_END_GRACE_SEC;
}

function setWaveRadiusData(pRadiusKm, sRadiusKm) {
  const pSource = map?.getSource("p-wave");
  const sSource = map?.getSource("s-wave");
  const nextP = getRenderableWaveRadius(pRadiusKm);
  const nextS = getRenderableWaveRadius(sRadiusKm);

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

function emptyFeatureCollection() {
  return {
    type: "FeatureCollection",
    features: [],
  };
}

async function loadMunicipalities() {
  if (municipalityData) {
    return municipalityData;
  }

  municipalityData = filterExcludedGeoJsonFeatures(await loadMunicipalitySourceData());
  return municipalityData;
}

async function loadMunicipalitySourceData() {
  if (!municipalityLoadPromise) {
    municipalityLoadPromise = fetchJson(MUNICIPALITIES_URL, "Municipality GeoJSON");
  }

  return municipalityLoadPromise;
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

  localAreaData = filterExcludedGeoJsonFeatures(await localAreaLoadPromise);
  return localAreaData;
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

async function loadNorthernIslandsLand() {
  if (northernIslandsLandData) {
    return northernIslandsLandData;
  }

  if (!northernIslandsLandLoadPromise) {
    northernIslandsLandLoadPromise = fetchJson(NORTHERN_ISLANDS_LAND_URL, "Northern islands land GeoJSON");
  }

  northernIslandsLandData = await northernIslandsLandLoadPromise;
  return northernIslandsLandData;
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
    features: (geojson.features ?? []).flatMap((feature) => {
      const geometry = feature.geometry;
      if (!geometry?.coordinates) {
        return [];
      }

      const coordinates =
        geometry.type === "MultiPolygon"
          ? geometry.coordinates
            .map((polygon) => polygon?.[0])
            .filter((ring) => Array.isArray(ring) && ring.length >= 4)
            .map((ring) => [ring])
          : [geometry.coordinates?.[0]].filter((ring) => Array.isArray(ring) && ring.length >= 4);
      if (coordinates.length === 0) {
        return [];
      }

      return [{
        ...feature,
        geometry: {
          ...geometry,
          coordinates,
        },
      }];
    }),
  };
}

function removeExcludedJapanIslandPolygons(geojson) {
  return {
    ...geojson,
    features: (geojson.features ?? []).flatMap((feature) => {
      const geometry = feature.geometry;
      if (!geometry?.coordinates) {
        return [];
      }

      if (geometry.type === "MultiPolygon") {
        const coordinates = geometry.coordinates.filter((polygon) => !isExcludedJapanIslandPolygon(polygon));
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

      if (geometry.type === "Polygon" && isExcludedJapanIslandPolygon(geometry.coordinates)) {
        return [];
      }

      return [feature];
    }),
  };
}

function extractExcludedJapanIslandPolygons(geojson) {
  return {
    ...geojson,
    name: "Excluded islands from Japan municipal layer",
    features: (geojson.features ?? []).flatMap((feature) => {
      const geometry = feature.geometry;
      if (!geometry?.coordinates) {
        return [];
      }

      const coordinates =
        geometry.type === "MultiPolygon"
          ? geometry.coordinates.filter(isExcludedJapanIslandPolygon)
          : geometry.type === "Polygon" && isExcludedJapanIslandPolygon(geometry.coordinates)
            ? [geometry.coordinates]
            : [];

      if (coordinates.length === 0) {
        return [];
      }

      return [{
        ...feature,
        properties: {
          ...feature.properties,
          mapTreatment: "excluded-island-display-only",
        },
        geometry: {
          type: "MultiPolygon",
          coordinates,
        },
      }];
    }),
  };
}

function setNorthernIslandDisplayData(geojson) {
  setGeoJsonSourceData("northern-islands-land", {
    type: "FeatureCollection",
    name: "Northern islands land display",
    features: geojson.features ?? [],
  });
}

function isNorthernIslandDisplayPolygon(polygon) {
  const outerRing = polygon?.[0];
  if (!Array.isArray(outerRing) || outerRing.length === 0) {
    return false;
  }

  const center = getRingCentroidCoordinate(outerRing);
  if (!center) {
    return false;
  }

  return NORTHERN_ISLAND_DISPLAY_BOUNDS.some((bounds) => pointInBounds(center, bounds));
}

function removeExcludedJapanIslandLinework(geojson) {
  return {
    ...geojson,
    features: (geojson.features ?? []).flatMap((feature) => {
      const geometry = feature.geometry;
      if (!geometry?.coordinates) {
        return [];
      }

      if (geometry.type === "LineString") {
        return lineIntersectsExcludedJapanIslandBounds(geometry.coordinates) ? [] : [feature];
      }

      if (geometry.type === "MultiLineString") {
        const coordinates = geometry.coordinates.filter(
          (line) => !lineIntersectsExcludedJapanIslandBounds(line),
        );
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

      return [feature];
    }),
  };
}

function lineIntersectsExcludedJapanIslandBounds(line) {
  if (!Array.isArray(line) || line.length === 0) {
    return false;
  }

  return EXCLUDED_JAPAN_LAND_BOUNDS.some((bounds) =>
    line.some((coordinate) => pointInBounds(coordinate, bounds)),
  );
}

function getExcludedJapanDisplayBounds() {
  return [...EXCLUDED_JAPAN_LAND_BOUNDS, ...NORTHERN_ISLAND_DISPLAY_BOUNDS];
}

function isPointInExcludedJapanDisplayBounds(point) {
  return getExcludedJapanDisplayBounds().some((bounds) => pointInBounds(point, bounds));
}

function updateStateFromInputs(options = {}) {
  if (!validateCoordinateInput(els.latitude, { report: true }) || !validateCoordinateInput(els.longitude, { report: true })) {
    return;
  }

  if (isPendingDecimalInput(els.latitude.value) || isPendingDecimalInput(els.longitude.value)) {
    return;
  }

  const nextLatitude = parseClampedInput(els.latitude.value, state.latitude, -85, 90);
  const nextLongitude = parseClampedInput(els.longitude.value, state.longitude, -180, 180);
  const nextDepthKm = clamp(Number(els.depth.value), 0, 700);
  const nextMagnitude = parseClampedInput(els.magnitude.value, state.magnitude, 0.1, 10);
  const epicenterMoved =
    Math.abs(nextLatitude - state.latitude) > 0.0001 ||
    Math.abs(nextLongitude - state.longitude) > 0.0001;
  const sourceParametersChanged =
    epicenterMoved ||
    Math.abs(nextDepthKm - state.depthKm) > 0.0001 ||
    Math.abs(nextMagnitude - state.magnitude) > 0.0001;

  state.latitude = nextLatitude;
  state.longitude = nextLongitude;
  state.depthKm = nextDepthKm;
  state.magnitude = nextMagnitude;
  if (!options.preservePreset && sourceParametersChanged) {
    clearSelectedPreset();
  }
  invalidateIntensityEstimateCache();
  updateEpicenter({
    resolveLocation: Boolean(options.resolveLocation),
    enforceManagedArea: Boolean(options.enforceManagedArea),
  });

  if (state.simulationRunning) {
    updateSimulationSummary();
    const elapsedSec = getSimulationElapsedSec();
    const { pRadiusKm, sRadiusKm } = getWaveSurfaceRadiiForElapsed(elapsedSec);
    setWaveRadiusData(pRadiusKm, sRadiusKm);
  }

  if (options.resolveLocation) {
    scheduleLocationResolve();
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
  predictedMaximumCache = null;
  presetObservationLookupCache = null;
  hyogoNanbuSyntheticStationCache = null;
  currentLocationForecastCache = null;
  if (!state.simulationRunning) {
    state.eewWarningFinalReport = false;
  }
  stationDataCache = { bucket: null, data: null };
  areaDataCache = { bucket: null, data: null };
  areaEpicentralDistanceCache = { key: "", distances: [] };
  localAreaStationMembershipCache = null;
  simulationRenderBucket = -1;
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
  els.regionLayerToggle.checked = state.showRegionLayer;
  els.eewWarningToggle.checked = state.showEewWarningLayer;
  els.simulationStationLayerToggle.checked = state.showStationLayer;
  els.simulationRegionLayerToggle.checked = state.showRegionLayer;
  els.simulationEewWarningToggle.checked = state.showEewWarningLayer;
  updateEarthquakePresetButtonLabel();
}

function updateSimulationAvailability() {
  if (!els.simulationStart) {
    return;
  }

  if (state.simulationRunning) {
    setStartupInteractionLocked(false);
    els.simulationStart.disabled = false;
    els.simulationStart.title = "";
    return;
  }

  if (resetViewAnimating) {
    setStartupInteractionLocked(true);
    els.simulationStart.disabled = true;
    els.simulationStart.textContent = "しばらくお待ち下さい";
    els.simulationStart.title = "マップを初期位置へ移動しています";
    return;
  }

  if (!startupMapVisualReady) {
    setStartupInteractionLocked(true);
    els.simulationStart.disabled = true;
    els.simulationStart.textContent = "マップを読み込み中...";
    els.simulationStart.title = "マップを読み込んでいます";
    return;
  }

  if (isSimulationMapDataLoading()) {
    setStartupInteractionLocked(false);
    els.simulationStart.disabled = true;
    els.simulationStart.textContent = "マップを読み込み中...";
    els.simulationStart.title = "マップと震度計算用データを読み込んでいます";
    return;
  }

  setStartupInteractionLocked(false);
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
    setTextContentIfChanged(els.maxIntensityOutput, state.maxIntensityLabel);
  }
}

function isSimulationMapDataLoading() {
  return (
    !municipalityDisplayData?.features?.length ||
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
  window.clearTimeout(postMapInteractionRenderTimer);
  postMapInteractionRenderTimer = window.setTimeout(() => {
    if (state.mapInteracting || !map) {
      return;
    }

    if (state.simulationRunning) {
      const elapsedSec = getSimulationElapsedSec();
      if (map.getSource("shindo-stations") && shindoStationData) {
        setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(elapsedSec));
      }
      if (map.getSource("jma-local-areas") && localAreaData) {
        setGeoJsonSourceData("jma-local-areas", buildIntensityAreaData(localAreaData, elapsedSec));
      }
      updateSimulationSummary(elapsedSec);
    }
  }, 90);
}

async function updateEpicenter(options = {}) {
  if (!map) {
    return;
  }

  if (options.resolveLocation) {
    const locationInManagedArea = await updateLocationNames();
    if (options.enforceManagedArea && !locationInManagedArea) {
      state.latitude = lastManagedEpicenter.latitude;
      state.longitude = lastManagedEpicenter.longitude;
      await updateLocationNames();
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
    markerElement.setAttribute("aria-label", "震源情報を表示");
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
      updateEpicenter({ resolveLocation: true, enforceManagedArea: true });
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
    const [municipalities, epicenterAreas] = await Promise.all([
      loadMunicipalities(),
      loadEpicenterAreas(),
    ]);
    const municipality = findFeatureAtPoint(municipalities, state.longitude, state.latitude);
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
  const prefecture = cleanDisplayAreaName(properties.prefecture || "");
  const municipality = cleanDisplayAreaName(properties.municipality || "");
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
  return Object.values(feature.properties ?? {}).some((value) => isExcludedTerritoryName(value));
}

function cleanDisplayAreaName(name) {
  return String(name ?? "")
    .replace(/^気象庁予報警報規程別表第四の二に示す「(.+)」の区域$/, "$1")
    .trim();
}

function updateIntensityLayer() {
  if (!map || !localAreaData) {
    return;
  }

  if (map.getSource("shindo-stations") && shindoStationData) {
    setGeoJsonSourceData("shindo-stations", getStationIntensityDataForElapsed(getSimulationStationElapsedSec()));
  }

  if (map.getSource("jma-local-areas")) {
    if (!shindoStationData) {
      updateSimulationAvailability();
      return;
    }

    const nextAreaData = buildIntensityAreaData(localAreaData, getSimulationStationElapsedSec());
    setGeoJsonSourceData("jma-local-areas", nextAreaData);
    if (document.body.classList.contains("map-core-loading")) {
      startupIntensityPaintVersion += 1;
    }
    updateSetupResultOutputs();
  }

  scheduleStartupReadyAfterIntensityPaint();
  updateSimulationAvailability();
}

function getSimulationStationElapsedSec() {
  return state.simulationRunning ? getSimulationElapsedSec() : Infinity;
}

function getStationIntensityDataForElapsed(elapsedSec = Infinity) {
  if (!shindoStationData) {
    return emptyFeatureCollection();
  }

  const bucket = toSimulationBucket(elapsedSec);
  if (stationDataCache.bucket === bucket && stationDataCache.data) {
    return stationDataCache.data;
  }

  const data = buildStationIntensityData(shindoStationData, elapsedSec);
  stationDataCache = {
    bucket,
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

function buildIntensityAreaData(geojson, elapsedSec = Infinity) {
  const bucket = toSimulationBucket(elapsedSec);
  if (areaDataCache.bucket === bucket && areaDataCache.data) {
    return areaDataCache.data;
  }

  const isSimulation = Number.isFinite(elapsedSec);
  const selectedPreset = getSelectedPreset();
  const predictedStationFeatures = shindoStationData ? buildStationIntensityFeatures(shindoStationData) : [];
  const stationFeatures = shindoStationData
      ? isSimulation
        ? getStationIntensityDataForElapsed(elapsedSec).features.filter(
          (feature) => feature.properties.observed,
        )
      : predictedStationFeatures
    : [];
  const areaStationIds = getLocalAreaStationMembership(geojson, predictedStationFeatures);
  const activeStationById = new Map(stationFeatures.map((feature) => [feature.properties.id, feature]));
  const predictedStationById = new Map(
    predictedStationFeatures.map((feature) => [feature.properties.id, feature]),
  );
  const epicentralDistances = getAreaEpicentralDistances(geojson);
  let maxClass = INTENSITY_CLASSES[0];
  let maxValue = 0;
  let predictedMaxClass = INTENSITY_CLASSES[0];

  const areaFeatures = geojson.features.map((feature, index) => {
    const stationIds = areaStationIds[index] ?? [];
    const areaStations = stationIds.map((stationId) => activeStationById.get(stationId)).filter(Boolean);
    const predictedAreaStations = stationIds
      .map((stationId) => predictedStationById.get(stationId))
      .filter(Boolean);
    const earliestPArrivalSec =
      predictedAreaStations.length > 0
        ? Math.min(...predictedAreaStations.map((stationFeature) => stationFeature.properties.pArrivalSec))
        : Infinity;
    const earliestSArrivalSec =
      predictedAreaStations.length > 0
        ? Math.min(...predictedAreaStations.map((stationFeature) => stationFeature.properties.sArrivalSec))
        : Infinity;
    const eewPWaveObserved =
      isSimulation &&
      Number.isFinite(earliestPArrivalSec) &&
      elapsedSec >= earliestPArrivalSec + EARTHQUAKE_MODEL.eewProcessingDelaySec;
    const eewBeforeMainMotion =
      !isSimulation ||
      !Number.isFinite(earliestSArrivalSec) ||
      elapsedSec < earliestSArrivalSec;
    const intensityValue =
      areaStations.length > 0
        ? Math.max(...areaStations.map((stationFeature) => stationFeature.properties.intensityValue))
        : isSimulation
          ? 0
          : selectedPreset
            ? 0
            : estimateMaxIntensityForFeature(feature);
    const predictedIntensityValue =
      predictedAreaStations.length > 0
        ? Math.max(
            ...predictedAreaStations.map((stationFeature) => stationFeature.properties.predictedIntensityValue),
          )
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
  const features = areaFeatures.map((feature) => {
    const eewForecastArea = getEewForecastAreaName(feature.properties.name);
    const eewWarning = selectedPreset
      ? isPresetEewWarningFeature(selectedPreset, feature, eewForecastArea, elapsedSec)
      : !freezeSimulationEew && shouldIssueEew && shouldIssueSimulationEewFeature(feature, elapsedSec);

    return {
      ...feature,
      properties: {
        ...feature.properties,
        eewWarning,
        eewForecastArea,
      },
    };
  });

  if (!selectedPreset) {
    if (!freezeSimulationEew) {
      applyAdaptiveEewExpansion(features, shouldIssueEew, elapsedSec);
    }
    applyPersistentSimulationEewWarnings(features, elapsedSec);
  }
  updateEewReportState(features, selectedPreset, activePresetEewReport, elapsedSec);
  applyEewBlinkState(features, elapsedSec);
  const warningForecastAreas = new Set(
    features
      .filter((feature) => feature.properties.eewWarning)
      .map((feature) => feature.properties.eewForecastArea),
  );

  state.eewWarningForecastAreas = compactForecastAreas([...warningForecastAreas]);
  updateEewForecastPanel();

  const displayedMaxClass = getPresetDisplayIntensityClass(maxClass, maxValue, selectedPreset);
  state.maxIntensityLabel = `${displayedMaxClass.label}（計測震度 ${selectedPreset ? "-" : maxValue.toFixed(1)}）`;

  const data = {
    ...geojson,
    name: "JMA local areas with representative maximum intensity",
    features,
  };

  areaDataCache = {
    bucket,
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
  if (
    localAreaStationMembershipCache &&
    localAreaStationMembershipCache.areaCount === geojson.features.length &&
    localAreaStationMembershipCache.stationCount === stationFeatures.length
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
    areaCount: geojson.features.length,
    stationCount: stationFeatures.length,
    stationIdsByArea,
  };

  return stationIdsByArea;
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
  if (normalizedName === "奄美群島" || normalizedName === "奄美諸島") {
    return "奄美";
  }
  if (
    normalizedName === "沖縄本島" ||
    normalizedName === "大東島" ||
    normalizedName === "沖縄県本島" ||
    normalizedName === "沖縄県大東島"
  ) {
    return "沖縄";
  }
  if (normalizedName === "長野") {
    return "北陸";
  }
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
  "北海道",
  "北海道道央",
  "北海道道南",
  "北海道道北",
  "北海道道東",
  "東北",
  "青森",
  "岩手",
  "宮城",
  "秋田",
  "山形",
  "福島",
  "関東",
  "茨城",
  "栃木",
  "群馬",
  "埼玉",
  "千葉",
  "東京",
  "神奈川",
  "山梨",
  "北陸",
  "新潟",
  "富山",
  "石川",
  "福井",
  "長野",
  "東海",
  "岐阜",
  "静岡",
  "愛知",
  "三重",
  "近畿",
  "滋賀",
  "京都",
  "大阪",
  "兵庫",
  "奈良",
  "和歌山",
  "中国",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "四国",
  "徳島",
  "香川",
  "愛媛",
  "高知",
  "九州",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "奄美群島",
  "沖縄本島",
  "大東島",
  "宮古島",
  "八重山",
  "伊豆諸島",
  "小笠原",
];

const PREFECTURE_NAMES = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
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
    "北海道",
    "北海道道央",
    "北海道道南",
    "北海道道北",
    "北海道道東",
    "東北",
    "関東",
    "北陸",
    "東海",
    "近畿",
    "中国",
    "四国",
    "九州",
    "奄美群島",
    "沖縄本島",
    "大東島",
    "宮古島",
    "八重山",
    "伊豆諸島",
    "小笠原",
  ].includes(areaName);
}

function forecastAreaSortIndex(areaName) {
  const sortName =
    areaName === "奄美" ? "奄美群島" : areaName === "沖縄" ? "沖縄本島" : areaName;
  const index = FORECAST_AREA_ORDER.indexOf(sortName);
  return index >= 0 ? index : FORECAST_AREA_ORDER.length;
}

function updateEewForecastPanel() {
  if (!els.eewForecastPanel || !els.eewForecastList) {
    return;
  }

  const visible = state.showEewWarningLayer && state.eewWarningForecastAreas.length > 0;
  const heading = els.eewForecastPanel.querySelector("h2");
  if (heading) {
    heading.textContent = state.eewWarningFinalReport
      ? "緊急地震速報（警報） 最終報"
      : state.eewWarningReportNumber
        ? `緊急地震速報（警報） 第${state.eewWarningReportNumber}報`
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

  const epicenterName = state.epicenterName || "震央";
  message.textContent = `${epicenterName}で地震 強い揺れに警戒`;
}

function getEewForecastAreaName(localAreaName) {
  if (!localAreaName) {
    return "不明";
  }

  const hokkaidoForecastArea = getHokkaidoEewForecastAreaName(localAreaName);
  if (hokkaidoForecastArea) {
    return hokkaidoForecastArea;
  }

  if (/^東京都(２３区|多摩)/.test(localAreaName)) {
    return "東京";
  }

  if (["伊豆大島", "新島", "神津島", "三宅島", "八丈島"].includes(localAreaName)) {
    return "伊豆諸島";
  }

  if (localAreaName === "小笠原") {
    return "小笠原";
  }

  if (localAreaName.startsWith("鹿児島県奄美")) {
    return "奄美群島";
  }

  if (localAreaName.startsWith("沖縄県本島")) {
    return "沖縄本島";
  }

  if (localAreaName.startsWith("沖縄県大東島")) {
    return "大東島";
  }

  if (localAreaName.startsWith("沖縄県宮古島")) {
    return "宮古島";
  }

  if (/^沖縄県(石垣島|与那国島|西表島)/.test(localAreaName)) {
    return "八重山";
  }

  const prefecture = PREFECTURE_NAMES.find((name) => localAreaName.startsWith(name));
  if (prefecture) {
    return prefecture.replace(/[都府県]$/, "");
  }

  return localAreaName;
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

  return {
    type: "FeatureCollection",
    name: "Observed JMA shindo stations with estimated intensity",
    source: data.source,
    updated: data.updated,
    features: buildStationIntensityFeatures(data)
      .filter(
        (feature) =>
          feature.properties.intensityRank >= 1 &&
          (isSimulation
            ? feature.properties.pArrivalSec <= elapsedSec
            : feature.properties.sArrivalSec <= elapsedSec),
      )
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
      .filter((feature) => feature.properties.intensityRank >= 1),
  };
}

function getCurrentIntensityProperties(properties, elapsedSec = Infinity) {
  const isSimulation = Number.isFinite(elapsedSec);
  const observed = !isSimulation || elapsedSec >= properties.pArrivalSec;
  const waveState = isSimulation && properties.sArrivalSec > elapsedSec ? "p" : "s";
  const riseProfile = getGroundRiseProfile(properties);
  const riseProgress = isSimulation
    ? groundAwareRiseProgress(elapsedSec - properties.sArrivalSec - (properties.sWaveRiseDelaySec ?? 0), riseProfile)
    : 1;
  const pWaveProgress = isSimulation
    ? getPWaveRiseProgress(properties, elapsedSec)
    : 1;
  const pWaveTarget = getPWaveIntensityTarget(properties);
  const pWaveIntensity = pWaveTarget * pWaveProgress;
  const currentIntensityValue =
    waveState === "p"
      ? pWaveIntensity
      : Math.max(pWaveIntensity, properties.predictedIntensityValue * riseProgress);
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

function getPWaveRiseProgress(properties, elapsedSec) {
  const timeSincePArrivalSec = elapsedSec - properties.pArrivalSec - (properties.pWaveRiseDelaySec ?? 0);
  if (timeSincePArrivalSec <= 0) {
    return 0;
  }

  const spGapSec = Math.max(properties.sArrivalSec - properties.pArrivalSec, 0.5);
  const siteResponse = properties.pWaveSiteResponse ?? 0.5;
  const quickOnsetSec = clamp(spGapSec * (0.12 + (1 - siteResponse) * 0.08), 0.18, 0.82);
  const quickOnset = smoothStep(clamp(timeSincePArrivalSec / quickOnsetSec, 0, 1));
  const preSwell = smoothStep(
    clamp(
      (timeSincePArrivalSec - quickOnsetSec * 0.55) /
        Math.max(spGapSec - quickOnsetSec * 0.55, 0.5),
      0,
      1,
    ),
  );
  return clamp(quickOnset * 0.84 + preSwell * 0.16, 0, 1);
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
    0.31 +
    magnitudeFactor * 0.1 +
    groundFactor * 0.13 +
    strongMotionFactor * 0.14 +
    siteResponse * 0.07;
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
  return clamp(target, 0, Math.min(finalIntensity * 0.74, pWaveCeiling, 3.25));
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
    0,
    0.48,
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
  if (/沖|海|湾|灘|海峡|トラフ|海溝|台湾付近|台湾東方沖/.test(name)) {
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

function isOldJmaScaleSyntheticPreset(preset) {
  return Boolean(
    isHyogoNanbuPreset(preset) ||
      preset?.label?.includes("関東大震災"),
  );
}

function isHyogoNanbuPreset(preset) {
  return Boolean(preset?.label?.includes("兵庫県南部地震"));
}

function applyPresetEpicenterNameOverride() {
  const preset = getSelectedPreset();
  if (!isHyogoNanbuPreset(preset)) {
    return;
  }

  state.epicenterName = "大阪湾";
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

    const municipalityName = municipalityFeature?.properties?.name ?? observation.stationName;
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
        displaySortStableKey: `${preset.id}|${observation.stationName}|${coordinates[0].toFixed(4)}|${coordinates[1].toFixed(4)}`,
        name: observation.stationName,
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
        observationStatus: `${preset.label} 観測点（市町村内代表点）`,
        measuredIntensity: null,
        intensityValue: Number(intensityValue.toFixed(2)),
        intensityLabel,
        intensityShortLabel,
        intensityRank: intensityClass.rank,
        intensityColor: intensityClass.color,
        intensityTextColor: intensityClass.textColor,
        stationDisplaySortKey: getStationDisplaySortKey(
          intensityClass.rank,
          `${preset.id}|${observation.stationName}|${coordinates[0].toFixed(4)}|${coordinates[1].toFixed(4)}`,
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

const HYOGO_NANBU_MUNICIPALITY_HINTS = [
  ["ポートアイランド", "神戸市"],
  ["六甲アイランド", "神戸市"],
  ["東神戸", "神戸市"],
  ["新神戸", "神戸市"],
  ["神戸港", "神戸市"],
  ["神戸", "神戸市"],
  ["葺合", "神戸市"],
  ["鷹取", "神戸市"],
  ["本山", "神戸市"],
  ["六甲", "神戸市"],
  ["西明石", "明石市"],
  ["明石", "明石市"],
  ["尼崎", "尼崎市"],
  ["関電", "尼崎市"],
  ["竹谷", "尼崎市"],
  ["西宮", "西宮市"],
  ["宝塚", "宝塚市"],
  ["猪名川", "猪名川町"],
  ["美方町", "香美町"],
  ["奈良市", "奈良市西部"],
  ["鳥取市", "鳥取市北部"],
  ["松本市", "松本市"],
  ["静岡駿河区", "静岡市南部"],
  ["浜松中区", "浜松市南部"],
];

function findOldScaleSyntheticMunicipalityFeature(observation) {
  const stationName = normalizeStationNameForMatch(observation.stationName);
  const hintedMunicipality = HYOGO_NANBU_MUNICIPALITY_HINTS.find(([hint]) =>
    stationName.includes(normalizeStationNameForMatch(hint)),
  )?.[1];
  const allMunicipalityFeatures = municipalityDisplayData.features;
  const municipalityFeatures = allMunicipalityFeatures.filter(
    (feature) => feature.properties.prefecture === observation.prefecture,
  );

  if (hintedMunicipality) {
    const normalizedHint = normalizeStationNameForMatch(hintedMunicipality);
    return allMunicipalityFeatures.find(
      (feature) => normalizeStationNameForMatch(feature.properties.name) === normalizedHint,
    );
  }

  const findMatchingFeature = (candidates) => candidates.find((feature) => {
    const municipalityName = normalizeStationNameForMatch(feature.properties.name);
    const shortName = municipalityName.replace(/[市区町村]$/u, "");
    const baseCityName = municipalityName.match(/^(.+?[市区町村])/u)?.[1] ?? shortName;
    return (
      (shortName.length >= 2 && stationName.includes(shortName)) ||
      (baseCityName.length >= 2 && stationName.includes(baseCityName)) ||
      (stationName.length >= 2 && (municipalityName.includes(stationName) || baseCityName.includes(stationName)))
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
  const nearestPoint = getNearestPointOnFeature(epicenter, feature);
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

function pointInFeature(point, feature) {
  return getFeaturePolygons(feature).some((polygon) => pointInPolygon(point, polygon));
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
