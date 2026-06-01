-- Phase 2 — reply likes. Mirrors forum_post_likes + its count trigger.
-- The like_count change is an UPDATE on forum_replies, which the thread page
-- already subscribes to, so counts propagate live without publishing this
-- table separately.

create table if not exists forum_reply_likes (
  id uuid primary key default gen_random_uuid(),
  reply_id uuid references forum_replies(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  created_at timestamptz default now(),
  unique(reply_id, user_id)
);

alter table forum_reply_likes enable row level security;

create policy "Users can view all reply likes" on forum_reply_likes
  for select using (true);
create policy "Users can insert own reply likes" on forum_reply_likes
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own reply likes" on forum_reply_likes
  for delete using (auth.uid() = user_id);
create policy "Admins have full access to forum_reply_likes" on forum_reply_likes
  for all using (is_admin());

create or replace function sync_forum_reply_like_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if (tg_op = 'INSERT') then
    update forum_replies set like_count = coalesce(like_count, 0) + 1
      where id = new.reply_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update forum_replies set like_count = greatest(0, coalesce(like_count, 0) - 1)
      where id = old.reply_id;
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_forum_reply_like_count on forum_reply_likes;
create trigger trg_forum_reply_like_count
  after insert or delete on forum_reply_likes
  for each row execute function sync_forum_reply_like_count();

-- Maintain forum_posts.reply_count via trigger too. The client previously
-- bumped it directly, which RLS blocks for any replier who isn't the post
-- author (only INSERT own / staff can UPDATE forum_posts) — so counts drifted.
create or replace function sync_forum_post_reply_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if (tg_op = 'INSERT') then
    update forum_posts set reply_count = coalesce(reply_count, 0) + 1
      where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update forum_posts set reply_count = greatest(0, coalesce(reply_count, 0) - 1)
      where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_forum_post_reply_count on forum_replies;
create trigger trg_forum_post_reply_count
  after insert or delete on forum_replies
  for each row execute function sync_forum_post_reply_count();

-- Backfill existing counts to be consistent.
update forum_posts p
set reply_count = (select count(*) from forum_replies r where r.post_id = p.id);
