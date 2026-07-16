ALTER TABLE community_posts ADD COLUMN expires_at TEXT;

CREATE INDEX IF NOT EXISTS idx_community_posts_expires_at
  ON community_posts(expires_at);
