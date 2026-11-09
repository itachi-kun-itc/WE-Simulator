-- Preserve accounts and credentials; only haruka has remote admin privileges.
UPDATE community_accounts
SET is_admin = CASE WHEN name COLLATE BINARY = 'haruka' THEN 1 ELSE 0 END
WHERE is_admin <> CASE WHEN name COLLATE BINARY = 'haruka' THEN 1 ELSE 0 END;
