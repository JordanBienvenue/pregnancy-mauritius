-- Extend role system: user, admin, moderator, editor
-- Drop the existing check constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Add new check constraint with all four roles
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('user', 'admin', 'moderator', 'editor'));

-- Helper: check if current user meets minimum role level
-- Hierarchy: admin(3) > moderator(2) > editor(1) > user(0)
CREATE OR REPLACE FUNCTION is_staff_role(required_role text)
RETURNS boolean AS $$
DECLARE
  user_role text;
  role_hierarchy jsonb := '{"admin": 3, "moderator": 2, "editor": 1, "user": 0}'::jsonb;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  IF user_role IS NULL THEN RETURN false; END IF;
  RETURN (role_hierarchy->>user_role)::int >= (role_hierarchy->>required_role)::int;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Helper: get current user's role
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS text AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Site settings (key-value store for admin config)
CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Seed default settings
INSERT INTO site_settings (key, value) VALUES
  ('maintenance_mode', 'false'::jsonb),
  ('default_locale', '"cr"'::jsonb),
  ('features', '{"marketplace": true, "donations": true, "forum": true, "blog": true}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- (forum_reports is defined in 20260408000000_extend_schema.sql)

-- Add like_count to forum_posts if not exists
DO $$ BEGIN
  ALTER TABLE forum_posts ADD COLUMN like_count integer DEFAULT 0;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
