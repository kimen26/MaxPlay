-- ─────────────────────────────────────────────────────────────────────────
--  008_annotations_lifecycle.sql — (appliquée 2026-07-13 via MCP)
--  Suivi de traitement des annotations/commentaires (demande Papa Yann) :
--  quand un retour est traité (fix, décision, intégration), Claude le note
--  en base → release note par mini-jeu requêtable :
--    select game_id, text, resolution, traite_le from annotations
--    where status='traite' order by game_id, traite_le;
--  Mise à jour par Claude via MCP (service role) uniquement — aucune policy
--  UPDATE côté client : les parents créent, ne modifient pas.
-- ─────────────────────────────────────────────────────────────────────────
alter table public.annotations
  add column status text not null default 'nouveau'
    check (status in ('nouveau', 'traite', 'ecarte')),
  add column resolution text,          -- ce qui a été fait (+ ref commit)
  add column traite_le timestamptz;

create index idx_annotations_status on public.annotations (status)
  where status = 'nouveau';            -- accès rapide au backlog non traité
