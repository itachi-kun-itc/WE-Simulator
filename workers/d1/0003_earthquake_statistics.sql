CREATE TABLE IF NOT EXISTS earthquake_statistics_areas (
  area_name TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  latest_at TEXT,
  source TEXT NOT NULL DEFAULT 'USGS Earthquake Catalog API',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS earthquake_statistics_epicenters (
  area_name TEXT NOT NULL,
  epicenter_name TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  latest_at TEXT,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (area_name, epicenter_name),
  FOREIGN KEY (area_name) REFERENCES earthquake_statistics_areas(area_name) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS earthquake_statistics_areas_count_idx
  ON earthquake_statistics_areas (count DESC);

CREATE INDEX IF NOT EXISTS earthquake_statistics_epicenters_area_count_idx
  ON earthquake_statistics_epicenters (area_name, count DESC);
