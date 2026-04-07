-- Users (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  phone text,
  locale text default 'cr',
  due_date date,
  is_postpartum boolean default false,
  baby_dob date,
  is_solo_mother boolean default false,
  created_at timestamptz default now()
);

-- Healthcare providers
create table providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  district text not null,
  address text,
  phone text,
  email text,
  website text,
  lat numeric,
  lng numeric,
  is_verified boolean default false,
  is_public boolean default true,
  image_url text,
  description text,
  created_at timestamptz default now()
);

-- PPD mood check-ins
create table ppd_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  score integer not null,
  answers jsonb,
  flagged boolean default false,
  created_at timestamptz default now()
);

-- Forum posts
create table forum_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  category text not null,
  title text not null,
  content text not null,
  is_anonymous boolean default false,
  is_pinned boolean default false,
  is_moderated boolean default false,
  reply_count integer default 0,
  created_at timestamptz default now()
);

create table forum_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references forum_posts(id) on delete cascade,
  user_id uuid references profiles(id),
  content text not null,
  is_anonymous boolean default false,
  created_at timestamptz default now()
);

-- Donation listings
create table donations (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid references profiles(id),
  item_name text not null,
  description text,
  condition text,
  category text,
  district text,
  is_available boolean default true,
  is_hygiene_verified boolean default false,
  images text[],
  created_at timestamptz default now()
);

-- Bookings
create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  provider_id uuid references providers(id),
  service_type text not null,
  preferred_date date,
  preferred_time text,
  status text default 'pending',
  notes text,
  created_at timestamptz default now()
);

-- Baby milestones log
create table milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  month integer not null,
  milestone_key text not null,
  achieved_at date,
  notes text
);

-- Sponsors (admin managed)
create table sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website text,
  package text,
  category text,
  active_from date,
  active_to date,
  is_active boolean default true
);

-- Blog posts
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  cover_image text,
  author text,
  reviewer text,
  category text,
  read_time integer default 5,
  is_published boolean default true,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Marketplace items
create table marketplace_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  category text not null,
  image_url text,
  seller_name text,
  is_available boolean default true,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table ppd_checkins enable row level security;
alter table forum_posts enable row level security;
alter table forum_replies enable row level security;
alter table donations enable row level security;
alter table bookings enable row level security;
alter table milestones enable row level security;
alter table providers enable row level security;
alter table sponsors enable row level security;
alter table blog_posts enable row level security;
alter table marketplace_items enable row level security;

-- Public read policies
create policy "Public providers are viewable by everyone" on providers for select using (is_public = true);
create policy "Public sponsors are viewable by everyone" on sponsors for select using (is_active = true);
create policy "Published blog posts are viewable by everyone" on blog_posts for select using (is_published = true);
create policy "Available marketplace items are viewable by everyone" on marketplace_items for select using (is_available = true);
create policy "Forum posts are viewable by everyone" on forum_posts for select using (true);
create policy "Forum replies are viewable by everyone" on forum_replies for select using (true);
create policy "Available donations are viewable by everyone" on donations for select using (true);

-- Authenticated user policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "Users can insert own ppd checkins" on ppd_checkins for insert with check (auth.uid() = user_id);
create policy "Users can view own ppd checkins" on ppd_checkins for select using (auth.uid() = user_id);

create policy "Users can create forum posts" on forum_posts for insert with check (auth.uid() = user_id);
create policy "Users can create forum replies" on forum_replies for insert with check (auth.uid() = user_id);

create policy "Users can create donations" on donations for insert with check (auth.uid() = donor_id);
create policy "Users can update own donations" on donations for update using (auth.uid() = donor_id);

create policy "Users can create bookings" on bookings for insert with check (auth.uid() = user_id);
create policy "Users can view own bookings" on bookings for select using (auth.uid() = user_id);

create policy "Users can insert own milestones" on milestones for insert with check (auth.uid() = user_id);
create policy "Users can view own milestones" on milestones for select using (auth.uid() = user_id);
create policy "Users can update own milestones" on milestones for update using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
