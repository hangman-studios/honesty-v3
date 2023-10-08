create table if not exists profiles (
  id uuid references auth.users primary key,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

create table if not exists notification_states (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  updated_at timestamp with time zone,
  endpoint text,
  expiration_time text
);

create table if not exists rooms (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  updated_at timestamp with time zone,
  name text,
  constraint name_length check (char_length(name) >= 1)
);

create table if not exists room_members (
  room_id uuid references public.rooms not null,
  user_id uuid references public.profiles not null,
  updated_at timestamp with time zone,
  primary key(room_id, user_id)
);

alter table profiles enable row level security;
alter table rooms enable row level security;
alter table room_members enable row level security;
alter table notification_states enable row level security;

drop policy if exists "Public profiles are viewable by the owner." on profiles;
create policy "Public profiles are viewable by the owner."
  on profiles for select
  using ( auth.uid() = id );

drop policy if exists "Users can insert their own profile." on profiles;
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

drop policy if exists "Users can update own profile." on profiles;
create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

drop policy if exists "Users can handle own notification states." on notification_states;
create policy "Users can handle own notification states."
  on notification_states for all
  using ( auth.uid() = user_id );

drop policy if exists "Rooms are viewable by everyone." on rooms;
create policy "Rooms are viewable by everyone."
  on rooms for select 
  using (true );

drop policy if exists "Users can insert their own rooms." on rooms;
create policy "Users can insert their own rooms."
  on rooms for insert
  with check ( auth.uid() = user_id );

drop policy if exists "Users can update own rooms." on rooms;
create policy "Users can update own rooms."
  on rooms for update
  using ( auth.uid() = user_id );

drop policy if exists "Room members are viewable for authenticated users." on room_members;
create policy "Room members are viewable for authenticated users."
  on room_members for select 
  using ( auth.role() = 'authenticated' );

drop policy if exists "Users can insert his self to rooms." on room_members;
create policy "Users can insert his self to rooms."
  on room_members for insert
  with check ( auth.uid() = user_id );

drop policy if exists "Users can update his self as member." on room_members;
create policy "Users can update his self as member."
  on room_members for update
  using ( auth.uid() = user_id );

-- Set up Realtime
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table rooms;
alter publication supabase_realtime add table room_members;

-- Set up Storage
insert into storage.buckets (id, name)
values ('avatars', 'avatars') ON CONFLICT DO NOTHING;

drop policy if exists "Avatar images are publicly accessible." on storage.objects;
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

drop policy if exists "Anyone can upload an avatar." on storage.objects;
create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

drop policy if exists "Anyone can update an avatar." on storage.objects;
create policy "Anyone can update an avatar."
  on storage.objects for update
  with check ( bucket_id = 'avatars' );
