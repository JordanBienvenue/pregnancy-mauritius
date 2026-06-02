-- Reddit-style nested/threaded comments.

alter table forum_replies
  add column if not exists parent_reply_id uuid
    references forum_replies(id) on delete cascade;

create index if not exists idx_forum_replies_parent
  on forum_replies(parent_reply_id);

-- Notify the right person on a new reply: the parent comment's author when
-- replying to a comment, otherwise the post's author. Skips self-replies.
create or replace function notify_post_author_on_reply()
returns trigger
language plpgsql
security definer
as $$
declare
  target uuid;
  ptitle text;
  pcategory text;
begin
  select title, category into ptitle, pcategory
    from forum_posts where id = new.post_id;

  if new.parent_reply_id is not null then
    select user_id into target from forum_replies where id = new.parent_reply_id;
  else
    select user_id into target from forum_posts where id = new.post_id;
  end if;

  if target is not null and target <> new.user_id then
    insert into notifications (user_id, type, title, body, link)
    values (
      target,
      'reply',
      ptitle,
      'New reply to your discussion',
      '/forum/' || pcategory || '/' || new.post_id
    );
  end if;
  return new;
end;
$$;
