-- Old Boy's Association (Holy Ghost College Owerri)
-- Supabase schema, constraints, and RLS policies

create extension if not exists "pgcrypto";

create type user_role as enum ('admin', 'member');
create type membership_status as enum ('pending', 'approved', 'rejected');
create type payment_status as enum ('pending', 'success', 'failed');

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role user_role not null default 'member',
  membership_status membership_status not null default 'pending',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.elections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint elections_date_check check (ends_at > starts_at)
);

create table if not exists public.positions (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.elections(id) on delete cascade,
  name text not null,
  sort_order int not null default 1,
  created_at timestamptz not null default now(),
  unique (election_id, name)
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  position_id uuid not null references public.positions(id) on delete cascade,
  name text not null,
  manifesto text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.elections(id) on delete cascade,
  position_id uuid not null references public.positions(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (election_id, position_id, user_id)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  status payment_status not null default 'pending',
  reference text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  featured_image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_positions_election on public.positions(election_id);
create index if not exists idx_candidates_position on public.candidates(position_id);
create index if not exists idx_votes_election_user on public.votes(election_id, user_id);
create index if not exists idx_payments_user on public.payments(user_id);
create index if not exists idx_blog_posts_published on public.blog_posts(published, created_at desc);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, full_name, role, membership_status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'member',
    'pending'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create or replace function public.touch_blog_post_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_blog_posts_updated_at on public.blog_posts;
create trigger touch_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.touch_blog_post_updated_at();

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.users
    where id = uid and role = 'admin' and membership_status = 'approved'
  );
$$;

create or replace function public.is_approved_member(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.users
    where id = uid and membership_status = 'approved'
  );
$$;

alter table public.users enable row level security;
alter table public.elections enable row level security;
alter table public.positions enable row level security;
alter table public.candidates enable row level security;
alter table public.votes enable row level security;
alter table public.payments enable row level security;
alter table public.blog_posts enable row level security;

-- users
create policy "users can read self"
on public.users for select
using (auth.uid() = id);

create policy "admins can read all users"
on public.users for select
using (public.is_admin(auth.uid()));

create policy "admins can update users"
on public.users for update
using (public.is_admin(auth.uid()));

-- elections, positions, candidates are readable by authenticated users
create policy "read elections"
on public.elections for select
using (auth.uid() is not null);

create policy "admins manage elections"
on public.elections for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "read positions"
on public.positions for select
using (auth.uid() is not null);

create policy "admins manage positions"
on public.positions for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "read candidates"
on public.candidates for select
using (auth.uid() is not null);

create policy "admins manage candidates"
on public.candidates for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- votes
create policy "approved users can vote"
on public.votes for insert
with check (
  auth.uid() = user_id
  and public.is_approved_member(auth.uid())
);

create policy "users can read own votes"
on public.votes for select
using (auth.uid() = user_id or public.is_admin(auth.uid()));

-- payments
create policy "users create own payments"
on public.payments for insert
with check (auth.uid() = user_id and public.is_approved_member(auth.uid()));

create policy "users read own payments"
on public.payments for select
using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy "admins manage payments"
on public.payments for update
using (public.is_admin(auth.uid()));

-- blog
create policy "public read published blog"
on public.blog_posts for select
using (published = true or public.is_admin(auth.uid()));

create policy "admins manage blog"
on public.blog_posts for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public can read media"
on storage.objects for select
using (bucket_id = 'media');

create policy "admins can upload media"
on storage.objects for insert
with check (bucket_id = 'media' and public.is_admin(auth.uid()));

create policy "admins can update media"
on storage.objects for update
using (bucket_id = 'media' and public.is_admin(auth.uid()));

create policy "admins can delete media"
on storage.objects for delete
using (bucket_id = 'media' and public.is_admin(auth.uid()));
