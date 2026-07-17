CREATE TABLE IF NOT EXISTS active_fault_segments (
  segment_id TEXT PRIMARY KEY,
  segment_name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT '',
  source_url TEXT NOT NULL DEFAULT '',
  path_json TEXT NOT NULL DEFAULT '[]',
  point_count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS active_fault_segments_name_idx
  ON active_fault_segments (segment_name);
