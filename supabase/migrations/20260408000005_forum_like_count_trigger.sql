-- Maintain forum_posts.like_count automatically.
-- Regular users cannot UPDATE forum_posts under RLS (only INSERT their own,
-- or staff/admin), so the client cannot bump like_count itself. A
-- SECURITY DEFINER trigger on forum_post_likes keeps the count correct and
-- race-safe instead.

create or replace function sync_forum_post_like_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if (tg_op = 'INSERT') then
    update forum_posts set like_count = coalesce(like_count, 0) + 1
      where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update forum_posts set like_count = greatest(0, coalesce(like_count, 0) - 1)
      where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_forum_post_like_count on forum_post_likes;
create trigger trg_forum_post_like_count
  after insert or delete on forum_post_likes
  for each row execute function sync_forum_post_like_count();

-- Backfill so existing rows are consistent with any pre-existing likes.
update forum_posts p
set like_count = (
  select count(*) from forum_post_likes l where l.post_id = p.id
);
