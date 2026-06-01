-- Drop old admin-only policies from 20260407000001
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins have full access to providers" ON providers;
DROP POLICY IF EXISTS "Admins have full access to sponsors" ON sponsors;
DROP POLICY IF EXISTS "Admins have full access to blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins have full access to marketplace_items" ON marketplace_items;
DROP POLICY IF EXISTS "Admins have full access to forum_posts" ON forum_posts;
DROP POLICY IF EXISTS "Admins have full access to forum_replies" ON forum_replies;
DROP POLICY IF EXISTS "Admins have full access to donations" ON donations;
DROP POLICY IF EXISTS "Admins have full access to bookings" ON bookings;

-- ═══════════════════════════════════════════════════════════════
-- PROFILES
-- ═══════════════════════════════════════════════════════════════
-- Moderators+ can read all profiles
CREATE POLICY "Staff can view all profiles" ON profiles FOR SELECT
  USING (auth.uid() = id OR is_staff_role('moderator'));

-- Admin can update any profile (e.g. role assignment)
CREATE POLICY "Admin can update all profiles" ON profiles FOR UPDATE
  USING (is_staff_role('admin'));

-- ═══════════════════════════════════════════════════════════════
-- PROVIDERS
-- ═══════════════════════════════════════════════════════════════
-- Moderators+ can manage providers
CREATE POLICY "Staff can manage providers" ON providers FOR ALL
  USING (is_staff_role('moderator'));

-- ═══════════════════════════════════════════════════════════════
-- BLOG POSTS
-- ═══════════════════════════════════════════════════════════════
-- Editors+ can read all blog posts (including drafts)
CREATE POLICY "Staff can read all blog posts" ON blog_posts FOR SELECT
  USING (is_staff_role('editor'));

-- Editors+ can insert blog posts
CREATE POLICY "Staff can create blog posts" ON blog_posts FOR INSERT
  WITH CHECK (is_staff_role('editor'));

-- Editors+ can update blog posts
CREATE POLICY "Staff can update blog posts" ON blog_posts FOR UPDATE
  USING (is_staff_role('editor'));

-- Admin can delete blog posts
CREATE POLICY "Admin can delete blog posts" ON blog_posts FOR DELETE
  USING (is_staff_role('admin'));

-- ═══════════════════════════════════════════════════════════════
-- FORUM POSTS
-- ═══════════════════════════════════════════════════════════════
-- Moderators+ can manage forum posts (pin, moderate, delete)
CREATE POLICY "Staff can manage forum posts" ON forum_posts FOR UPDATE
  USING (is_staff_role('moderator'));

CREATE POLICY "Staff can delete forum posts" ON forum_posts FOR DELETE
  USING (is_staff_role('moderator'));

-- ═══════════════════════════════════════════════════════════════
-- FORUM REPLIES
-- ═══════════════════════════════════════════════════════════════
CREATE POLICY "Staff can manage forum replies" ON forum_replies FOR UPDATE
  USING (is_staff_role('moderator'));

CREATE POLICY "Staff can delete forum replies" ON forum_replies FOR DELETE
  USING (is_staff_role('moderator'));

-- ═══════════════════════════════════════════════════════════════
-- FORUM REPORTS
-- ═══════════════════════════════════════════════════════════════
-- Anyone authenticated can create a report
CREATE POLICY "Users can create forum reports" ON forum_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Moderators+ can read and manage reports
CREATE POLICY "Staff can read forum reports" ON forum_reports FOR SELECT
  USING (is_staff_role('moderator'));

CREATE POLICY "Staff can update forum reports" ON forum_reports FOR UPDATE
  USING (is_staff_role('moderator'));

-- ═══════════════════════════════════════════════════════════════
-- DONATIONS
-- ═══════════════════════════════════════════════════════════════
-- Moderators+ can manage all donations
CREATE POLICY "Staff can manage donations" ON donations FOR UPDATE
  USING (is_staff_role('moderator'));

CREATE POLICY "Staff can delete donations" ON donations FOR DELETE
  USING (is_staff_role('moderator'));

-- ═══════════════════════════════════════════════════════════════
-- BOOKINGS
-- ═══════════════════════════════════════════════════════════════
-- Moderators+ can read all bookings
CREATE POLICY "Staff can read all bookings" ON bookings FOR SELECT
  USING (is_staff_role('moderator'));

-- Admin can manage all bookings
CREATE POLICY "Admin can manage bookings" ON bookings FOR UPDATE
  USING (is_staff_role('admin'));

CREATE POLICY "Admin can delete bookings" ON bookings FOR DELETE
  USING (is_staff_role('admin'));

-- ═══════════════════════════════════════════════════════════════
-- SPONSORS
-- ═══════════════════════════════════════════════════════════════
-- Admin-only management
CREATE POLICY "Admin can manage sponsors" ON sponsors FOR ALL
  USING (is_staff_role('admin'));

-- ═══════════════════════════════════════════════════════════════
-- MARKETPLACE
-- ═══════════════════════════════════════════════════════════════
-- Moderators+ can manage marketplace items
CREATE POLICY "Staff can manage marketplace" ON marketplace_items FOR ALL
  USING (is_staff_role('moderator'));

-- ═══════════════════════════════════════════════════════════════
-- PPD CHECK-INS
-- ═══════════════════════════════════════════════════════════════
-- Admin can read all PPD data (individual records)
CREATE POLICY "Admin can read all ppd checkins" ON ppd_checkins FOR SELECT
  USING (is_staff_role('admin'));

-- ═══════════════════════════════════════════════════════════════
-- SITE SETTINGS
-- ═══════════════════════════════════════════════════════════════
-- Staff can read settings
CREATE POLICY "Staff can read settings" ON site_settings FOR SELECT
  USING (is_staff_role('editor'));

-- Admin can manage settings
CREATE POLICY "Admin can manage settings" ON site_settings FOR ALL
  USING (is_staff_role('admin'));

-- ═══════════════════════════════════════════════════════════════
-- MILESTONES (staff read for dashboard stats)
-- ═══════════════════════════════════════════════════════════════
CREATE POLICY "Admin can read all milestones" ON milestones FOR SELECT
  USING (is_staff_role('admin'));
