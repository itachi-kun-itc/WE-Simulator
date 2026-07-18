CREATE TABLE IF NOT EXISTS simulation_scenarios (
  id TEXT PRIMARY KEY,
  owner_key_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  scenario_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_simulation_scenarios_owner_updated
  ON simulation_scenarios(owner_key_hash, updated_at DESC);

CREATE TABLE IF NOT EXISTS simulation_comparison_baselines (
  owner_key_hash TEXT PRIMARY KEY,
  snapshot_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
