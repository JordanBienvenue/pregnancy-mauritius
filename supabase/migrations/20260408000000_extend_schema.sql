-- Add claimed_by and claimed_at to donations
alter table donations add column claimed_by uuid references profiles(id);
alter table donations add column claimed_at timestamptz;

-- Add like_count to forum_posts and forum_replies
alter table forum_posts add column like_count integer default 0;
alter table forum_replies add column like_count integer default 0;

-- Forum post likes
create table forum_post_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references forum_posts(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

-- Forum reports
create table forum_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references forum_posts(id) on delete cascade,
  reply_id uuid references forum_replies(id) on delete cascade,
  user_id uuid references profiles(id) not null,
  reason text not null,
  status text default 'pending' check (status in ('pending', 'resolved', 'dismissed')),
  created_at timestamptz default now()
);

-- RLS for new tables
alter table forum_post_likes enable row level security;
alter table forum_reports enable row level security;

create policy "Users can view all likes" on forum_post_likes for select using (true);
create policy "Users can insert own likes" on forum_post_likes for insert with check (auth.uid() = user_id);
create policy "Users can delete own likes" on forum_post_likes for delete using (auth.uid() = user_id);

create policy "Users can insert reports" on forum_reports for insert with check (auth.uid() = user_id);
create policy "Admins can view reports" on forum_reports for select
  using ((select role from profiles where id = auth.uid()) = 'admin');

-- Allow authenticated users to claim donations
create policy "Users can claim available donations" on donations for update
  using (auth.uid() is not null and is_available = true);

-- Admin full access to new tables
create policy "Admins have full access to forum_post_likes" on forum_post_likes for all
  using ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admins have full access to forum_reports" on forum_reports for all
  using ((select role from profiles where id = auth.uid()) = 'admin');

-- Update handle_new_user trigger to populate more fields
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, due_date, is_postpartum, baby_dob, is_solo_mother, locale)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    case when new.raw_user_meta_data->>'due_date' is not null and new.raw_user_meta_data->>'due_date' != ''
      then (new.raw_user_meta_data->>'due_date')::date else null end,
    coalesce((new.raw_user_meta_data->>'is_postpartum')::boolean, false),
    case when new.raw_user_meta_data->>'baby_dob' is not null and new.raw_user_meta_data->>'baby_dob' != ''
      then (new.raw_user_meta_data->>'baby_dob')::date else null end,
    coalesce((new.raw_user_meta_data->>'is_solo_mother')::boolean, false),
    coalesce(new.raw_user_meta_data->>'locale', 'cr')
  );
  return new;
end;
$$ language plpgsql security definer;
