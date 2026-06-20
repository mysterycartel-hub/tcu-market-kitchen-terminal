-- ============================================================
-- TCU Market Kitchen Terminal — Supabase Database Schema v2
-- Paste this entire file into the Supabase SQL Editor and Run.
-- ============================================================

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────
-- PROFILES
-- Central user row. xp, rank, arrays of completed ids.
-- Mirrors auth.users; auto-created on signup via trigger.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  user_id               uuid primary key references auth.users(id) on delete cascade,
  email                 text not null default '',
  display_name          text not null default 'Trading Chef',
  xp                    integer not null default 0,
  rank                  text not null default 'Kitchen Rookie',
  completed_missions    text[] not null default '{}',
  completed_concepts    text[] not null default '{}',
  unlocked_characters   text[] not null default '{}',
  journal_count         integer not null default 0,
  trade_plan_count      integer not null default 0,
  last_activity         timestamptz,
  created_at            timestamptz not null default timezone('utc', now()),
  updated_at            timestamptz not null default timezone('utc', now())
);

-- ─────────────────────────────────────────────────────────────
-- MISSIONS
-- Static mission definitions (seeded separately).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.missions (
  id          text primary key,
  title       text not null,
  description text not null,
  xp_reward   integer not null default 0,
  created_at  timestamptz not null default timezone('utc', now())
);

-- ─────────────────────────────────────────────────────────────
-- MISSION PROGRESS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.mission_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  mission_id   text not null references public.missions(id) on delete cascade,
  xp_awarded   integer not null default 0,
  completed_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, mission_id)
);

-- ─────────────────────────────────────────────────────────────
-- JOURNAL ENTRIES
-- Full text of each journal note, persisted per user.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.journal_entries (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  note       text not null,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists journal_entries_user_idx on public.journal_entries(user_id, created_at desc);

-- ─────────────────────────────────────────────────────────────
-- TRADE PLANS
-- Practice kitchen tickets (not live trades).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.trade_plans (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  symbol     text not null default 'XAUUSD',
  direction  text check (direction in ('BUY', 'SELL')),
  content    text not null,
  grade      text,
  bias       text,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists trade_plans_user_idx on public.trade_plans(user_id, created_at desc);

-- ─────────────────────────────────────────────────────────────
-- CHARACTER UNLOCKS
-- Recorded when user crosses the XP threshold for each coach.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.character_unlocks (
  user_id        uuid not null references auth.users(id) on delete cascade,
  character_name text not null,
  xp_at_unlock   integer not null default 0,
  unlocked_at    timestamptz not null default timezone('utc', now()),
  primary key (user_id, character_name)
);

-- ─────────────────────────────────────────────────────────────
-- CHARTS  (chart_uploads)
-- Uploaded screenshot + Vercel Blob key + AI analysis sessions.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.charts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  symbol         text not null default 'XAUUSD',
  timeframe      text not null default '1H',
  screenshot_url text,
  blob_key       text,
  notes          text,
  ai_summary     text,
  created_at     timestamptz not null default timezone('utc', now())
);
create index if not exists charts_user_idx on public.charts(user_id, created_at desc);

-- ─────────────────────────────────────────────────────────────
-- CHART ANALYSES
-- Structured chart analysis saves for AI coach + journal bridge.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.chart_analyses (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  symbol           text not null default 'EURUSD',
  timeframe        text not null default '15m',
  bias             text,
  liquidity        text,
  aoi              text,
  entry            text,
  burn_point       text,
  tables_served    text,
  invalidation     text,
  ai_summary       text,
  character_lesson text,
  screenshot_url   text,
  created_at       timestamptz not null default timezone('utc', now())
);
create index if not exists chart_analyses_user_idx on public.chart_analyses(user_id, created_at desc);

-- ─────────────────────────────────────────────────────────────
-- CHARACTERS  (static coach definitions)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.characters (
  id          text primary key,
  name        text not null,
  role        text not null,
  emoji       text not null default '👨‍🍳',
  description text not null,
  xp_unlock   integer not null default 0,
  created_at  timestamptz not null default timezone('utc', now())
);

-- ─────────────────────────────────────────────────────────────
-- VAULT ITEMS  (concept flashcards, lessons, chef reads)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.vault_items (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  shorthand   text not null default '',
  category    text not null default 'concept',
  definition  text not null,
  clue        text not null,
  xp_reward   integer not null default 10,
  premium     boolean not null default false,
  created_at  timestamptz not null default timezone('utc', now())
);

-- ─────────────────────────────────────────────────────────────
-- VAULT PROGRESS  (per-user flashcard review history)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.vault_progress (
  user_id       uuid not null references auth.users(id) on delete cascade,
  vault_item_id uuid not null references public.vault_items(id) on delete cascade,
  reviewed_at   timestamptz not null default timezone('utc', now()),
  xp_awarded    integer not null default 10,
  primary key (user_id, vault_item_id)
);

-- ─────────────────────────────────────────────────────────────
-- SUBSCRIPTIONS  (Stripe-ready)
-- tier: 'free' | 'pro' | 'master'
-- status: 'active' | 'trialing' | 'canceled' | 'past_due'
-- ─────────────────────────────────────────────────────────────
create table if not exists public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null unique references auth.users(id) on delete cascade,
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  tier                   text not null default 'free'
                           check (tier in ('free', 'pro', 'master')),
  status                 text not null default 'active'
                           check (status in ('active', 'trialing', 'canceled', 'past_due', 'incomplete')),
  current_period_end     timestamptz,
  cancel_at_period_end   boolean not null default false,
  created_at             timestamptz not null default timezone('utc', now()),
  updated_at             timestamptz not null default timezone('utc', now())
);

-- ─────────────────────────────────────────────────────────────
-- LIBRARY ITEMS
-- Educational content (future CMS/admin seeded).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.library_items (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  title      text not null,
  category   text not null default 'concept',
  body       text not null,
  premium    boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

-- ─────────────────────────────────────────────────────────────
-- TRIGGERS
-- ─────────────────────────────────────────────────────────────

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_updated_at on public.subscriptions;
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- Auto-create profile + subscription on new user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (user_id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', 'Trading Chef')
  )
  on conflict (user_id) do nothing;

  insert into public.subscriptions (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────
alter table public.profiles          enable row level security;
alter table public.missions          enable row level security;
alter table public.mission_progress  enable row level security;
alter table public.journal_entries   enable row level security;
alter table public.trade_plans       enable row level security;
alter table public.character_unlocks enable row level security;
alter table public.charts            enable row level security;
alter table public.chart_analyses    enable row level security;
alter table public.characters        enable row level security;
alter table public.vault_items       enable row level security;
alter table public.vault_progress    enable row level security;
alter table public.subscriptions     enable row level security;
alter table public.library_items     enable row level security;

-- profiles: own row only
create policy if not exists "profiles_select_own"  on public.profiles
  for select using (auth.uid() = user_id);
create policy if not exists "profiles_upsert_own"  on public.profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- mission_progress
create policy if not exists "mission_progress_own" on public.mission_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- journal_entries
create policy if not exists "journal_entries_own"  on public.journal_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- trade_plans
create policy if not exists "trade_plans_own"      on public.trade_plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- character_unlocks
create policy if not exists "character_unlocks_own" on public.character_unlocks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- charts
create policy if not exists "charts_own"           on public.charts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- chart_analyses
create policy if not exists "chart_analyses_own"   on public.chart_analyses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- characters: public read (static data)
create policy if not exists "characters_read_all"  on public.characters
  for select using (true);

-- vault_items: public read
create policy if not exists "vault_items_read_all" on public.vault_items
  for select using (true);

-- vault_progress: own rows
create policy if not exists "vault_progress_own"   on public.vault_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- subscriptions: read own; write via service role only (Stripe webhook)
create policy if not exists "subscriptions_own"    on public.subscriptions
  for select using (auth.uid() = user_id);

-- missions + library: public read
create policy if not exists "missions_read_all"    on public.missions
  for select using (true);
create policy if not exists "library_read_all"     on public.library_items
  for select using (true);

-- ─────────────────────────────────────────────────────────────
-- SEED: missions
-- ─────────────────────────────────────────────────────────────
insert into public.missions (id, title, description, xp_reward) values
  ('first-market-read',   'Complete the first market read',    'Open the chart, identify bias, liquidity, and AOI, then save a trade plan.',      60),
  ('first-journal-entry', 'Write your first journal entry',    'Open the Journal and save a chart story using the 5 prompt questions.',            30),
  ('concept-vault-full',  'Review all Concept Vault flashcards','Open the TCU Concept Vault and flip every flashcard at least once.',              50),
  ('daily-review-full',   'Complete a full Daily Kitchen Review','Complete all checklist items in the Daily Kitchen Review before a session.',     40)
on conflict (id) do nothing;
