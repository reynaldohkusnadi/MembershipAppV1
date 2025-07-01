-- Extension Prerequisites
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- =====================
-- Core Reference Tables
-- =====================

-- tiers
create table if not exists public.tiers (
  id            serial primary key,
  name          text    unique not null check (char_length(name) <= 32),
  min_points    int     not null,
  benefits      jsonb   default '{}'::jsonb,
  created_at    timestamp with time zone default timezone('utc', now())
);

insert into public.tiers (name, min_points)
values ('Bronze', 0), ('Silver', 1_000), ('Gold', 3_000), ('Platinum', 5_000)
  on conflict (name) do nothing;

-- reward_categories (enum‑style lookup)
create table if not exists public.reward_categories (
  code text primary key,         -- e.g. 'discount', 'freebie', 'experience'
  label text not null
);

insert into public.reward_categories (code, label) values
  ('discount',   'Discounts'),
  ('freebie',    'Freebies'),
  ('experience', 'Experiences')
  on conflict (code) do nothing;

-- =====================
-- User‑Facing Tables
-- =====================

-- profiles – 1‑to‑1 with auth.users
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  display_name  text check (char_length(display_name) <= 50),
  avatar_url    text,
  tier_id       int  not null default 1 references public.tiers(id),
  points        int  not null default 0,
  created_at    timestamp with time zone default timezone('utc', now())
);

-- points_ledger – immutable source of truth
create table if not exists public.points_ledger (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  delta         int  not null,                      -- positive or negative
  reason        text not null,                      -- free‑form or enum
  source        text check (source in ('purchase','manual','referral','promo','redemption')),
  ref_id        uuid,                               -- e.g. redemption id or pos tx id
  created_at    timestamp with time zone default timezone('utc', now())
);
create index if not exists points_ledger_user_idx on public.points_ledger (user_id, created_at desc);

-- TRIGGER: update profile.points after every ledger insert
create or replace function public.fn_recalc_points() returns trigger language plpgsql as $$
begin
  update public.profiles p
    set points = coalesce((select sum(delta) from public.points_ledger where user_id = p.id),0)
  where p.id = new.user_id;
  return new;
end $$;

drop trigger if exists trg_recalc_points on public.points_ledger;
create trigger trg_recalc_points
  after insert on public.points_ledger
  for each row execute function public.fn_recalc_points();

-- rewards (catalog)
create table if not exists public.rewards (
  id            uuid primary key default uuid_generate_v4(),
  category_code text not null references public.reward_categories(code) on delete restrict,
  title         text not null,
  description   text,
  image_url     text,
  cost          int  not null check (cost > 0),
  available     boolean not null default true,
  created_at    timestamp with time zone default timezone('utc', now())
);
create index if not exists rewards_category_idx on public.rewards (category_code);

-- redemptions
create table if not exists public.redemptions (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  reward_id     uuid not null references public.rewards(id) on delete restrict,
  cost          int  not null,
  qr_code       text not null,                       -- pre‑encoded data
  status        text not null default 'pending' check (status in ('pending','redeemed','expired')),
  expires_at    timestamp with time zone not null,
  created_at    timestamp with time zone default timezone('utc', now())
);
create index if not exists redemptions_user_idx on public.redemptions (user_id, created_at desc);

-- brands
create table if not exists public.brands (
  id          serial primary key,
  name        text unique not null,
  logo_url    text,
  description text,
  created_at  timestamp with time zone default timezone('utc', now())
);

-- outlets (restaurants)
create table if not exists public.outlets (
  id          serial primary key,
  brand_id    int  not null references public.brands(id) on delete cascade,
  name        text not null,
  address     text,
  lat         double precision,
  lng         double precision,
  phone       text,
  created_at  timestamp with time zone default timezone('utc', now())
);
create index if not exists outlets_geo_idx on public.outlets using gist (point(lng, lat));

-- promotions (news & promos)
create table if not exists public.promotions (
  id          uuid primary key default uuid_generate_v4(),
  brand_id    int references public.brands(id) on delete set null,
  title       text not null,
  content_md  text,                                -- markdown body
  image_url   text,
  start_date  date not null,
  end_date    date not null,
  urgent      boolean not null default false,
  created_at  timestamp with time zone default timezone('utc', now())
);
create index if not exists promotions_active_idx on public.promotions (start_date, end_date);

-- pos_transactions (optional integration)
create table if not exists public.pos_transactions (
  id              uuid primary key default uuid_generate_v4(),
  external_tx_id  text unique not null,
  user_id         uuid references public.profiles(id) on delete set null,
  outlet_id       int  references public.outlets(id) on delete set null,
  subtotal        numeric(12,2) not null,
  points_awarded  int not null,
  created_at      timestamp with time zone default timezone('utc', now())
);
create index if not exists pos_tx_user_idx on public.pos_transactions (user_id, created_at desc);

-- =====================
-- Row‑Level Security (RLS)
-- =====================

-- profiles
alter table public.profiles enable row level security;
create policy "Users can view & update own profile" on public.profiles
  for select, update
  using ( id = auth.uid() );

-- points_ledger
alter table public.points_ledger enable row level security;
create policy "Users view own ledger" on public.points_ledger
  for select using ( user_id = auth.uid() );

-- redemptions
alter table public.redemptions enable row level security;
create policy "Users CRUD own redemptions" on public.redemptions
  for select, insert, update
  using ( user_id = auth.uid() )
  with check ( user_id = auth.uid() );

-- Read‑only public access
alter table public.rewards     enable row level security;
alter table public.promotions  enable row level security;
alter table public.brands      enable row level security;
alter table public.outlets     enable row level security;
alter table public.tiers       enable row level security;
alter table public.reward_categories enable row level security;

create policy "Public read access" on public.rewards    for select using ( true );
create policy "Public read access" on public.promotions for select using ( true );
create policy "Public read access" on public.brands     for select using ( true );
create policy "Public read access" on public.outlets    for select using ( true );
create policy "Public read access" on public.tiers      for select using ( true );
create policy "Public read access" on public.reward_categories for select using ( true );

-- =====================
-- Helper Functions
-- =====================

-- Claim reward & write ledger atomically
create or replace function public.fn_redeem_reward(p_user uuid, p_reward uuid) returns uuid
language plpgsql as $$
declare
  reward_cost int;
  redemption_id uuid;
begin
  select cost into reward_cost from public.rewards where id = p_reward and available;
  if reward_cost is null then raise exception 'Reward not available'; end if;

  -- Check balance
  if (select points from public.profiles where id = p_user) < reward_cost then
    raise exception 'Insufficient points';
  end if;

  -- Insert redemption & ledger within one tx
  insert into public.redemptions (user_id, reward_id, cost, qr_code, expires_at)
    values (p_user, p_reward, reward_cost, encode(gen_random_bytes(8),'hex'), timezone('utc', now()) + interval '10 minutes')
    returning id into redemption_id;

  insert into public.points_ledger (user_id, delta, reason, source, ref_id)
    values (p_user, -reward_cost, 'Reward redemption', 'redemption', redemption_id);

  return redemption_id;
end $$ security definer; 