-- ─────────────────────────────────────────────────────────────────────────
--  001_init.sql — Schéma initial MaxPlay (Phase 1 light : auth + sync)
--  Modèle légal (audit 2026-07-06) : compte PARENT titulaire,
--  enfant = profil pseudonyme (surnom uniquement, zéro donnée perso enfant).
--  RLS partout : un parent ne voit que ses propres lignes.
--  Application : dashboard SQL editor OU MCP apply_migration (write mode).
-- ─────────────────────────────────────────────────────────────────────────

-- ── Profils enfants (pseudonymes, sous le compte parent) ─────────────────
create table public.child_profiles (
  id         uuid primary key default gen_random_uuid(),
  parent_id  uuid not null references auth.users(id) on delete cascade,
  nickname   text not null check (char_length(nickname) between 1 and 30),
  created_at timestamptz not null default now()
);

alter table public.child_profiles enable row level security;

create policy "parent gère ses profils enfants"
  on public.child_profiles for all
  using (auth.uid() = parent_id)
  with check (auth.uid() = parent_id);

-- Garde-fou : max 6 profils par parent (famille nombreuse OK, farming non)
create or replace function public.check_child_limit()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from child_profiles where parent_id = new.parent_id) >= 6 then
    raise exception 'Limite de 6 profils enfants par compte';
  end if;
  return new;
end $$;

create trigger trg_child_limit
  before insert on public.child_profiles
  for each row execute function public.check_child_limit();

-- ── Progression (1 blob JSON par enfant, même format que tracker.js) ─────
-- Le client fait le merge local-first ; le serveur stocke, point.
create table public.progression (
  child_id   uuid primary key references public.child_profiles(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb check (pg_column_size(data) < 262144), -- 256 Ko max
  updated_at timestamptz not null default now()
);

alter table public.progression enable row level security;

create policy "parent lit/écrit la progression de ses enfants"
  on public.progression for all
  using (exists (
    select 1 from public.child_profiles c
    where c.id = progression.child_id and c.parent_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.child_profiles c
    where c.id = progression.child_id and c.parent_id = auth.uid()
  ));

-- ── Consentements (log horodaté — exigence RGPD/COPPA de l'audit) ────────
create table public.consents (
  id         bigint generated always as identity primary key,
  parent_id  uuid not null references auth.users(id) on delete cascade,
  kind       text not null,   -- 'account_created' | 'profile_created' | ...
  detail     jsonb,
  created_at timestamptz not null default now()
);

alter table public.consents enable row level security;

create policy "parent insère ses consentements"
  on public.consents for insert
  with check (auth.uid() = parent_id);

create policy "parent lit ses consentements"
  on public.consents for select
  using (auth.uid() = parent_id);

-- Pas d'update/delete : un log de consentement est immuable.

-- ── Feedback parent (asynchrone — décision audit : pas de "live") ────────
create table public.feedback (
  id         bigint generated always as identity primary key,
  parent_id  uuid references auth.users(id) on delete set null,
  message    text not null check (char_length(message) between 1 and 4000),
  page       text,            -- d'où vient le feedback (jeu, dino, menu…)
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

create policy "parent connecté envoie un feedback"
  on public.feedback for insert
  with check (auth.uid() = parent_id);

create policy "parent lit ses feedbacks"
  on public.feedback for select
  using (auth.uid() = parent_id);

-- ── updated_at automatique sur progression ───────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger trg_progression_touch
  before update on public.progression
  for each row execute function public.touch_updated_at();
