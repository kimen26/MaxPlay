-- ─────────────────────────────────────────────────────────────────────────
--  003_sessions_state_annotations.sql — Suivi par profil × jeu + sync état
--  (décision Papa Yann 2026-07-12 : fini les copier-coller JSON)
--
--  1. game_sessions  : 1 ligne par partie, append-only — table de suivi/debug
--                      requêtable (profil × jeu × date). Le blob progression
--                      reste la source du merge rapide ; ceci est la vue
--                      analytique.
--  2. child_state    : clé-valeur générique par enfant — synchronise tout ce
--                      qui restait local (unlocks, avatar, galerie coloriage,
--                      états mj-20/37, langue…) sans table par feature.
--  3. annotations    : commentaires 💬 in-game + notes de revue, unifiés.
--
--  RLS : même modèle que 001 — le parent ne voit que ses enfants.
-- ─────────────────────────────────────────────────────────────────────────

-- ── 1. Sessions de jeu (append-only, debug/suivi) ─────────────────────────
create table public.game_sessions (
  id         bigint generated always as identity primary key,
  child_id   uuid not null references public.child_profiles(id) on delete cascade,
  game_id    text not null check (char_length(game_id) between 1 and 40),
  played_at  timestamptz not null,
  score      integer,
  max_score  integer,
  correct    integer,
  questions  integer,
  duration_s integer,
  client     jsonb,          -- contexte libre (device, version app…)
  created_at timestamptz not null default now(),
  -- dédup multi-appareils : une même partie poussée 2× = no-op
  unique (child_id, game_id, played_at)
);

create index idx_game_sessions_child_date
  on public.game_sessions (child_id, played_at desc);
create index idx_game_sessions_child_game
  on public.game_sessions (child_id, game_id);

alter table public.game_sessions enable row level security;

create policy "parent insère les sessions de ses enfants"
  on public.game_sessions for insert
  with check (exists (
    select 1 from public.child_profiles c
    where c.id = game_sessions.child_id and c.parent_id = auth.uid()
  ));

create policy "parent lit les sessions de ses enfants"
  on public.game_sessions for select
  using (exists (
    select 1 from public.child_profiles c
    where c.id = game_sessions.child_id and c.parent_id = auth.uid()
  ));

-- Pas d'update/delete : journal append-only (debug fiable).

-- ── 2. État par enfant (clé-valeur, whitelist côté client) ───────────────
create table public.child_state (
  child_id   uuid not null references public.child_profiles(id) on delete cascade,
  key        text not null check (char_length(key) between 1 and 40),
  data       jsonb not null check (pg_column_size(data) < 524288), -- 512 Ko (galerie coloriage)
  updated_at timestamptz not null default now(),
  primary key (child_id, key)
);

alter table public.child_state enable row level security;

create policy "parent gère l'état de ses enfants"
  on public.child_state for all
  using (exists (
    select 1 from public.child_profiles c
    where c.id = child_state.child_id and c.parent_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.child_profiles c
    where c.id = child_state.child_id and c.parent_id = auth.uid()
  ));

create trigger trg_child_state_touch
  before update on public.child_state
  for each row execute function public.touch_updated_at();

-- ── 3. Annotations (💬 in-game + notes de revue) ──────────────────────────
create table public.annotations (
  id         bigint generated always as identity primary key,
  parent_id  uuid not null references auth.users(id) on delete cascade,
  child_id   uuid references public.child_profiles(id) on delete set null,
  game_id    text,
  source     text not null check (source in ('comment', 'review')),
  text       text not null check (char_length(text) between 1 and 4000),
  client_key text not null,  -- gameId|date côté client → dédup re-sync
  created_at timestamptz not null default now(),
  unique (parent_id, client_key)
);

create index idx_annotations_parent_date
  on public.annotations (parent_id, created_at desc);

alter table public.annotations enable row level security;

create policy "parent insère ses annotations"
  on public.annotations for insert
  with check (auth.uid() = parent_id);

create policy "parent lit ses annotations"
  on public.annotations for select
  using (auth.uid() = parent_id);

create policy "parent supprime ses annotations"
  on public.annotations for delete
  using (auth.uid() = parent_id);
