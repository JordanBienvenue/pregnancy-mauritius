-- Phase 6 — notifications.

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null,
  title text not null,
  body text,
  link text,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table notifications enable row level security;

create policy "Users read own notifications" on notifications
  for select using (auth.uid() = user_id);
create policy "Users update own notifications" on notifications
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Admins full access notifications" on notifications
  for all using (is_admin());

alter publication supabase_realtime add table notifications;
alter table notifications replica identity full;

-- When someone replies, notify the post's author (skip self-replies).
create or replace function notify_post_author_on_reply()
returns trigger
language plpgsql
security definer
as $$
declare
  author uuid;
  ptitle text;
  pcategory text;
begin
  select user_id, title, category into author, ptitle, pcategory
    from forum_posts where id = new.post_id;
  if author is not null and author <> new.user_id then
    insert into notifications (user_id, type, title, body, link)
    values (
      author,
      'reply',
      ptitle,
      'New reply to your discussion',
      '/forum/' || pcategory || '/' || new.post_id
    );
  end if;
  return new;
end;
$$;

drop trigger if exists trg_notify_post_author on forum_replies;
create trigger trg_notify_post_author
  after insert on forum_replies
  for each row execute function notify_post_author_on_reply();
