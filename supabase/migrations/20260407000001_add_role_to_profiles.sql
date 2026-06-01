-- Add role column to profiles
alter table profiles add column role text default 'user' check (role in ('user', 'admin'));

-- Admin full-access policies
create policy "Admins can view all profiles" on profiles for select
  using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "Admins have full access to providers" on providers for all
  using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "Admins have full access to sponsors" on sponsors for all
  using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "Admins have full access to blog_posts" on blog_posts for all
  using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "Admins have full access to marketplace_items" on marketplace_items for all
  using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "Admins have full access to forum_posts" on forum_posts for all
  using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "Admins have full access to forum_replies" on forum_replies for all
  using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "Admins have full access to donations" on donations for all
  using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "Admins have full access to bookings" on bookings for all
  using ((select role from profiles where id = auth.uid()) = 'admin');
