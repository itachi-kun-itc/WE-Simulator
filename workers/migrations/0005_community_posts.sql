CREATE TABLE IF NOT EXISTS community_accounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT '',
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  is_admin INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_community_accounts_name
  ON community_accounts(name);

CREATE TABLE IF NOT EXISTS community_sessions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_community_sessions_account_id
  ON community_sessions(account_id);

CREATE INDEX IF NOT EXISTS idx_community_sessions_token_hash
  ON community_sessions(token_hash);

CREATE TABLE IF NOT EXISTS community_posts (
  id TEXT PRIMARY KEY,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  location_mode TEXT NOT NULL DEFAULT 'map',
  tags_json TEXT NOT NULL DEFAULT '[]',
  text TEXT NOT NULL DEFAULT '',
  media_key TEXT,
  media_type TEXT,
  media_name TEXT,
  account_id TEXT,
  author_name TEXT,
  author_icon TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_community_posts_created_at
  ON community_posts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_community_posts_location
  ON community_posts(latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_community_posts_account_id
  ON community_posts(account_id);
