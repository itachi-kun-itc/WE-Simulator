CREATE TABLE IF NOT EXISTS maintenance_state (
  id TEXT PRIMARY KEY CHECK (id = 'global'),
  maintenance INTEGER NOT NULL DEFAULT 0,
  reason TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

INSERT OR IGNORE INTO maintenance_state (
  id,
  maintenance,
  reason,
  updated_at
) VALUES (
  'global',
  0,
  '',
  datetime('now')
);

CREATE TABLE IF NOT EXISTS admin_parent_tokens (
  token TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);
