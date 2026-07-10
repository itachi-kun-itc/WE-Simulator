CREATE TABLE IF NOT EXISTS earthquake_presets (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  epicenter_name TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  depth_km REAL NOT NULL,
  magnitude REAL NOT NULL,
  max_intensity TEXT NOT NULL,
  observed_stations_json TEXT NOT NULL DEFAULT '[]',
  eew_forecast_areas_json TEXT NOT NULL DEFAULT '[]',
  eew_reports_json TEXT NOT NULL DEFAULT '[]',
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS earthquake_presets_date_idx
  ON earthquake_presets (date DESC, time DESC);
