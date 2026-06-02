-- Phase 2c — image uploads for the forum.
-- A public-read bucket; authenticated users upload, owners can delete.

insert into storage.buckets (id, name, public)
values ('forum-media', 'forum-media', true)
on conflict (id) do nothing;

-- Public read (bucket is public, but be explicit for the SELECT policy).
drop policy if exists "forum-media public read" on storage.objects;
create policy "forum-media public read" on storage.objects
  for select using (bucket_id = 'forum-media');

-- Authenticated users may upload.
drop policy if exists "forum-media authed upload" on storage.objects;
create policy "forum-media authed upload" on storage.objects
  for insert with check (
    bucket_id = 'forum-media' and auth.uid() is not null
  );

-- Owners may delete their own uploads.
drop policy if exists "forum-media owner delete" on storage.objects;
create policy "forum-media owner delete" on storage.objects
  for delete using (
    bucket_id = 'forum-media' and owner = auth.uid()
  );
