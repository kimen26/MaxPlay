-- ─────────────────────────────────────────────────────────────────────────
--  010_feedback_comment_pings_retention.sql — (appliquée 2026-07-14 via MCP)
--  Suite audit persistance 2026-07-14 (2 findings hygiène/légal) :
--
--  1) Table `feedback` (migration 001) = CANAL FANTÔME : jamais lue ni écrite.
--     Tout le feedback parent passe par `annotations` (unifiée migration 003).
--     On la commente comme réservée/non branchée (pas de DROP : conservée pour
--     un usage futur éventuel, mais plus présentée comme active).
--
--  2) Rétention pings 13 mois (CONDITION de l'exemption CNIL mesure d'audience)
--     non automatisée → purge quotidienne via pg_cron.
-- ─────────────────────────────────────────────────────────────────────────

comment on table public.feedback is
  'RÉSERVÉE / NON BRANCHÉE (audit 2026-07-14). Aucun code client ne lit/écrit cette table. Le feedback parent réel (💬 in-game + notes de revue) transite par public.annotations (migration 003). Ne pas y écrire sans rebrancher explicitement le client.';

-- Purge automatique des pings > 13 mois (condition CNIL). pg_cron tourne
-- dans la base postgres ; la fonction est SECURITY DEFINER pour contourner RLS.
create extension if not exists pg_cron;

create or replace function public.purge_old_pings()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.pings where day < current_date - interval '13 months';
$$;

-- Tous les jours à 03:15 UTC. unschedule d'abord (idempotent si re-appliquée).
select cron.unschedule('purge_old_pings') where exists (
  select 1 from cron.job where jobname = 'purge_old_pings'
);
select cron.schedule('purge_old_pings', '15 3 * * *', 'select public.purge_old_pings()');
