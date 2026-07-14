-- ─────────────────────────────────────────────────────────────────────────
--  012_reset_anonymise_stats.sql — (appliquée 2026-07-14 via MCP)
--  Reset RGPD-compliant AVEC conservation de la statistique d'usage anonyme.
--
--  Besoin Papa Yann : être hyper RGPD-compliant (le parent qui reset efface
--  bien les données NOMINATIVES de son enfant) MAIS conserver la donnée
--  d'usage AGRÉGÉE et ANONYME — savoir p.ex. « 50 personnes ont reset après
--  la maj du 12 » est une statistique légitime, non personnelle.
--
--  Pattern = ANONYMISATION, pas suppression sèche :
--    1. reset_events    : 1 ligne par reset (date + nb sessions agrégées),
--                         AUCUN child_id/parent_id → non ré-identifiable.
--    2. usage_stats_anon : agrégats d'usage par jeu (plays, réussite),
--                          détachés de tout enfant, cumulés dans le temps.
--  Puis les lignes NOMINATIVES de game_sessions/child_state/progression sont
--  supprimées (droit à l'effacement honoré). Une fonction SECURITY DEFINER
--  fait l'agrégation+purge en une transaction, appelée par resetChild().
--
--  RGPD : les 2 tables ci-dessous ne contiennent AUCUN identifiant personnel
--  (ni child_id, ni parent_id, ni date de naissance…). Elles sont donc hors
--  périmètre « données personnelles » = conservation libre. Le lien enfant⇄
--  usage est irréversiblement rompu au moment du reset.
-- ─────────────────────────────────────────────────────────────────────────

-- 1) Journal des resets (anonyme : sait COMBIEN et QUAND, jamais QUI)
create table public.reset_events (
  id             bigint generated always as identity primary key,
  reset_at       timestamptz not null default now(),
  sessions_count int not null default 0,     -- nb de parties agrégées au reset
  games_count    int not null default 0,     -- nb de jeux distincts touchés
  app_version    text                        -- optionnel : marqueur de maj
);

alter table public.reset_events enable row level security;
-- Aucune policy anon/parent : écriture UNIQUEMENT via la fonction SECURITY
-- DEFINER (public.reset_child_anonymized). Lecture réservée MCP/dashboard.

-- 2) Stats d'usage anonymes cumulées par jeu (jamais liées à un enfant)
create table public.usage_stats_anon (
  game_id         text primary key,
  total_plays     bigint not null default 0,
  total_correct   bigint not null default 0,
  total_questions bigint not null default 0,
  total_duration_s bigint not null default 0,
  updated_at      timestamptz not null default now()
);

alter table public.usage_stats_anon enable row level security;
-- Idem : alimentée uniquement par la fonction. Pas de policy client.

-- 3) Fonction reset : agrège l'usage (anonyme) PUIS purge le nominatif.
--    SECURITY DEFINER pour écrire dans reset_events/usage_stats_anon (pas de
--    policy client) ; le contrôle d'accès reste côté APPELANT (RLS des DELETE).
--    Le paramètre p_child_id est validé : la fonction ne purge que si l'appelant
--    est bien le parent propriétaire (double vérif ownership).
create or replace function public.reset_child_anonymized(
  p_child_id uuid,
  p_app_version text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
  v_owner  uuid;
  v_sessions int;
  v_games int;
begin
  -- Ownership : le caller doit être le parent du profil. Sinon on ne fait RIEN.
  select parent_id into v_owner from child_profiles where id = p_child_id;
  if v_owner is null or v_owner <> v_caller then
    raise exception 'not owner';
  end if;

  -- Agrège les sessions de cet enfant dans les stats ANONYMES (par jeu).
  insert into usage_stats_anon as u (game_id, total_plays, total_correct, total_questions, total_duration_s, updated_at)
  select game_id, count(*), coalesce(sum(correct),0), coalesce(sum(questions),0), coalesce(sum(duration_s),0), now()
  from game_sessions where child_id = p_child_id
  group by game_id
  on conflict (game_id) do update set
    total_plays      = u.total_plays      + excluded.total_plays,
    total_correct    = u.total_correct    + excluded.total_correct,
    total_questions  = u.total_questions  + excluded.total_questions,
    total_duration_s = u.total_duration_s + excluded.total_duration_s,
    updated_at       = now();

  -- Compte pour le journal anonyme.
  select count(*), count(distinct game_id) into v_sessions, v_games
  from game_sessions where child_id = p_child_id;

  insert into reset_events (sessions_count, games_count, app_version)
  values (coalesce(v_sessions,0), coalesce(v_games,0), p_app_version);

  -- Purge NOMINATIVE (droit à l'effacement) : le lien enfant⇄usage est rompu.
  delete from game_sessions where child_id = p_child_id;
  delete from child_state   where child_id = p_child_id;
  delete from progression   where child_id = p_child_id;
end;
$$;

-- Exécutable par les utilisateurs authentifiés (l'ownership est vérifié dedans).
grant execute on function public.reset_child_anonymized(uuid, text) to authenticated;
