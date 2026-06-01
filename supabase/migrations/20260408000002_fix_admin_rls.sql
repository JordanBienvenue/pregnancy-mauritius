-- Create a SECURITY DEFINER function to check admin role
-- This bypasses RLS to avoid infinite recursion when checking profiles.role
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Drop the old recursive admin policies
drop policy if exists "Admins can view all profiles" on profiles;
drop policy if exists "Admins have full access to providers" on providers;
drop policy if exists "Admins have full access to sponsors" on sponsors;
drop policy if exists "Admins have full access to blog_posts" on blog_posts;
drop policy if exists "Admins have full access to marketplace_items" on marketplace_items;
drop policy if exists "Admins have full access to forum_posts" on forum_posts;
drop policy if exists "Admins have full access to forum_replies" on forum_replies;
drop policy if exists "Admins have full access to donations" on donations;
drop policy if exists "Admins have full access to bookings" on bookings;
drop policy if exists "Admins have full access to forum_post_likes" on forum_post_likes;
drop policy if exists "Admins have full access to forum_reports" on forum_reports;

-- Recreate admin policies using the SECURITY DEFINER function
create policy "Admins can view all profiles" on profiles for select using (is_admin());
create policy "Admins can update all profiles" on profiles for update using (is_admin());

create policy "Admins have full access to providers" on providers for all using (is_admin());
create policy "Admins have full access to sponsors" on sponsors for all using (is_admin());
create policy "Admins have full access to blog_posts" on blog_posts for all using (is_admin());
create policy "Admins have full access to marketplace_items" on marketplace_items for all using (is_admin());
create policy "Admins have full access to forum_posts" on forum_posts for all using (is_admin());
create policy "Admins have full access to forum_replies" on forum_replies for all using (is_admin());
create policy "Admins have full access to donations" on donations for all using (is_admin());
create policy "Admins have full access to bookings" on bookings for all using (is_admin());
create policy "Admins have full access to forum_post_likes" on forum_post_likes for all using (is_admin());
create policy "Admins have full access to forum_reports" on forum_reports for all using (is_admin());
