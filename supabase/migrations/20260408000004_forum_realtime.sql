-- Enable Supabase Realtime for the forum tables.
-- Without these, the `supabase_realtime` publication is empty and clients
-- subscribing to postgres_changes receive no events.

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'forum_replies'
  ) then
    alter publication supabase_realtime add table forum_replies;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'forum_posts'
  ) then
    alter publication supabase_realtime add table forum_posts;
  end if;
end $$;

-- Send full row data on UPDATE/DELETE events (INSERT already carries the new row).
alter table forum_replies replica identity full;
alter table forum_posts replica identity full;
