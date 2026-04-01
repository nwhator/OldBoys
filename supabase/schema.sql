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

create table if not exists public.registration_access_codes (
  code text primary key,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.leadership_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  bio text,
  image_url text,
  sort_order int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  caption text,
  event_date date,
  sort_order int not null default 1,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.email_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  subject text not null,
  body text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_positions_election on public.positions(election_id);
create index if not exists idx_candidates_position on public.candidates(position_id);
create index if not exists idx_votes_election_user on public.votes(election_id, user_id);
create index if not exists idx_payments_user on public.payments(user_id);
create index if not exists idx_blog_posts_published on public.blog_posts(published, created_at desc);
create index if not exists idx_contact_messages_created_at on public.contact_messages(created_at desc);
create index if not exists idx_leadership_profiles_order on public.leadership_profiles(sort_order, created_at desc);
create index if not exists idx_gallery_items_order on public.gallery_items(sort_order, created_at desc);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email <> 'admin@oldboys.local' then
    if not exists (
      select 1
      from public.registration_access_codes
      where is_active = true
        and code = coalesce(new.raw_user_meta_data->>'registration_code', '')
    ) then
      raise exception 'Registration is restricted. A valid access code is required.';
    end if;
  end if;

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

drop trigger if exists touch_email_templates_updated_at on public.email_templates;
create trigger touch_email_templates_updated_at
before update on public.email_templates
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
alter table public.contact_messages enable row level security;
alter table public.leadership_profiles enable row level security;
alter table public.gallery_items enable row level security;
alter table public.audit_settings enable row level security;
alter table public.email_templates enable row level security;

-- users
drop policy if exists "users can read self" on public.users;
create policy "users can read self"
on public.users for select
using (auth.uid() = id);

drop policy if exists "admins can read all users" on public.users;
create policy "admins can read all users"
on public.users for select
using (public.is_admin(auth.uid()));

drop policy if exists "admins can update users" on public.users;
create policy "admins can update users"
on public.users for update
using (public.is_admin(auth.uid()));

-- elections, positions, candidates are readable by authenticated users
drop policy if exists "read elections" on public.elections;
create policy "read elections"
on public.elections for select
using (auth.uid() is not null);

drop policy if exists "admins manage elections" on public.elections;
create policy "admins manage elections"
on public.elections for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "read positions" on public.positions;
create policy "read positions"
on public.positions for select
using (auth.uid() is not null);

drop policy if exists "admins manage positions" on public.positions;
create policy "admins manage positions"
on public.positions for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "read candidates" on public.candidates;
create policy "read candidates"
on public.candidates for select
using (auth.uid() is not null);

drop policy if exists "admins manage candidates" on public.candidates;
create policy "admins manage candidates"
on public.candidates for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- votes
drop policy if exists "approved users can vote" on public.votes;
create policy "approved users can vote"
on public.votes for insert
with check (
  auth.uid() = user_id
  and public.is_approved_member(auth.uid())
);

drop policy if exists "users can read own votes" on public.votes;
create policy "users can read own votes"
on public.votes for select
using (auth.uid() = user_id or public.is_admin(auth.uid()));

-- payments
drop policy if exists "users create own payments" on public.payments;
create policy "users create own payments"
on public.payments for insert
with check (auth.uid() = user_id and public.is_approved_member(auth.uid()));

drop policy if exists "users read own payments" on public.payments;
create policy "users read own payments"
on public.payments for select
using (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "admins manage payments" on public.payments;
create policy "admins manage payments"
on public.payments for update
using (public.is_admin(auth.uid()));

-- blog
drop policy if exists "public read published blog" on public.blog_posts;
create policy "public read published blog"
on public.blog_posts for select
using (published = true or public.is_admin(auth.uid()));

drop policy if exists "admins manage blog" on public.blog_posts;
create policy "admins manage blog"
on public.blog_posts for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- contact messages
drop policy if exists "anyone can submit contact message" on public.contact_messages;
create policy "anyone can submit contact message"
on public.contact_messages for insert
with check (true);

drop policy if exists "admins can read contact messages" on public.contact_messages;
create policy "admins can read contact messages"
on public.contact_messages for select
using (public.is_admin(auth.uid()));

drop policy if exists "admins can update contact messages" on public.contact_messages;
create policy "admins can update contact messages"
on public.contact_messages for update
using (public.is_admin(auth.uid()));

-- leadership profiles
drop policy if exists "public read active leadership" on public.leadership_profiles;
create policy "public read active leadership"
on public.leadership_profiles for select
using (is_active = true or public.is_admin(auth.uid()));

drop policy if exists "admins manage leadership" on public.leadership_profiles;
create policy "admins manage leadership"
on public.leadership_profiles for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- gallery
drop policy if exists "public read published gallery" on public.gallery_items;
create policy "public read published gallery"
on public.gallery_items for select
using (is_published = true or public.is_admin(auth.uid()));

drop policy if exists "admins manage gallery" on public.gallery_items;
create policy "admins manage gallery"
on public.gallery_items for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- audit settings
drop policy if exists "admins read audit settings" on public.audit_settings;
create policy "admins read audit settings"
on public.audit_settings for select
using (public.is_admin(auth.uid()));

drop policy if exists "admins manage audit settings" on public.audit_settings;
create policy "admins manage audit settings"
on public.audit_settings for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- email templates
drop policy if exists "admins read email templates" on public.email_templates;
create policy "admins read email templates"
on public.email_templates for select
using (public.is_admin(auth.uid()));

drop policy if exists "admins manage email templates" on public.email_templates;
create policy "admins manage email templates"
on public.email_templates for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public can read media" on storage.objects;
create policy "public can read media"
on storage.objects for select
using (bucket_id = 'media');

drop policy if exists "admins can upload media" on storage.objects;
create policy "admins can upload media"
on storage.objects for insert
with check (bucket_id = 'media' and public.is_admin(auth.uid()));

drop policy if exists "admins can update media" on storage.objects;
create policy "admins can update media"
on storage.objects for update
using (bucket_id = 'media' and public.is_admin(auth.uid()));

drop policy if exists "admins can delete media" on storage.objects;
create policy "admins can delete media"
on storage.objects for delete
using (bucket_id = 'media' and public.is_admin(auth.uid()));

insert into public.registration_access_codes (code, is_active)
values ('OldBoys-Alumni-Invite', true)
on conflict (code) do nothing;

insert into public.audit_settings (key, value)
values
  ('security.alert_email', 'admin@oldboys.local'),
  ('security.login_audit_enabled', 'true'),
  ('notifications.contact_inbox_enabled', 'true')
on conflict (key) do nothing;

insert into public.email_templates (name, subject, body, is_active)
values
  (
    'welcome',
    'Welcome to Old Boys'' Association, {{name}}',
    '<h1>Welcome {{name}}</h1><p>Your account has been created and is pending approval.</p>',
    true
  ),
  (
    'dues_notice',
    'Dues Notice for {{name}}',
    '<p>Hello {{name}}, this is a reminder to complete your dues payment.</p>',
    true
  )
on conflict (name) do nothing;

-- Development seed: hardcoded admin login
-- Email/login: admin@oldboys.local
-- Password: OldBoys'Alumini
do $$
declare
  admin_uid uuid := '11111111-1111-4111-8111-111111111111';
  admin_email text := 'admin@oldboys.local';
  admin_password text := 'OldBoys''Alumini';
begin
  insert into auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    confirmation_sent_at,
    recovery_sent_at,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    is_sso_user,
    is_anonymous
  )
  values (
    admin_uid,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', 'Admin'),
    now(),
    now(),
    false,
    false
  )
  on conflict (id) do nothing;

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    gen_random_uuid(),
    admin_uid,
    jsonb_build_object('sub', admin_uid::text, 'email', admin_email),
    'email',
    admin_email,
    now(),
    now(),
    now()
  )
  on conflict (provider, provider_id) do nothing;

  insert into public.users (id, full_name, role, membership_status)
  values (admin_uid, 'Admin', 'admin', 'approved')
  on conflict (id) do update
    set full_name = excluded.full_name,
        role = 'admin',
        membership_status = 'approved';
end
$$;
