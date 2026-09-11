-- ─────────────────────────────────────────────────────────────────────────
--  013_drop_dead_tables.sql — (appliquée 2026-09-12 via MCP, D-010)
--  feedback  : réservée depuis 001, jamais branchée (le feedback réel passe par annotations).
--  tile_refs : orpheline depuis 2026-09-05 (pipeline tiles archivé).
--  Vérifié avant drop : 0 ligne chacune, 0 FK entrante, 0 vue dépendante.
-- ─────────────────────────────────────────────────────────────────────────
drop table if exists public.feedback;
drop table if exists public.tile_refs;
