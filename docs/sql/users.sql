-- ──────────────────────────────────────────────────────────────────
-- Relay — self-serve signups
--
-- Every successful /api/signup mirrors {email -> key_hash, providers,
-- plan} into this table. Used for:
--  • Founder visibility into who signed up
--  • "I lost my key" recovery (look up keyHash, revoke + re-issue)
--  • Future dashboard auth (link Supabase Auth session ↔ key_hash)
--
-- Run this once in Supabase → SQL Editor → New query → Run.
-- ──────────────────────────────────────────────────────────────────

create table if not exists public.users (
  id          bigserial primary key,
  email       text not null unique,
  key_hash    text not null,
  providers   text[] not null default '{}',
  plan        text not null default 'free',
  created_at  timestamptz not null default now()
);

create index if not exists users_created_at_idx
  on public.users (created_at desc);

create index if not exists users_key_hash_idx
  on public.users (key_hash);

alter table public.users enable row level security;

comment on table  public.users is
  'Self-serve signup records. Stores email + the SHA-256 hash of the rly_ key only.';
comment on column public.users.key_hash is
  'SHA-256 hex hash of the issued rly_ API key. Use to revoke via Worker /admin/users/:hash.';
comment on column public.users.providers is
  'List of upstream providers the user wired up at signup time.';
