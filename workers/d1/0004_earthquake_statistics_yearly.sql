CREATE TABLE IF NOT EXISTS earthquake_statistics_area_years (
  year INTEGER NOT NULL,
  area_name TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  latest_at TEXT,
  source TEXT NOT NULL DEFAULT 'USGS Earthquake Catalog API',
  updated_at TEXT NOT NULL,
  PRIMARY KEY (year, area_name)
);

CREATE TABLE IF NOT EXISTS earthquake_statistics_epicenter_years (
  year INTEGER NOT NULL,
  area_name TEXT NOT NULL,
  epicenter_name TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  latest_at TEXT,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (year, area_name, epicenter_name)
);

CREATE INDEX IF NOT EXISTS earthquake_statistics_area_years_range_idx
  ON earthquake_statistics_area_years (year, count DESC);

CREATE INDEX IF NOT EXISTS earthquake_statistics_epicenter_years_range_idx
  ON earthquake_statistics_epicenter_years (year, area_name, count DESC);
