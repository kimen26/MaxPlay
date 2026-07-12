-- ─────────────────────────────────────────────────────────────────────────
--  007_author_reads_pings.sql — (appliquée 2026-07-12 via MCP)
--  Le compte AUTEUR (Papa Yann) peut lire les stats d'audience depuis
--  auteur.html. Les autres comptes : toujours aucun SELECT sur pings.
--  UID auteur = premier compte créé (9efd6921-…). Si le compte change,
--  refaire une migration.
-- ─────────────────────────────────────────────────────────────────────────
create policy "auteur lit les pings"
  on public.pings for select
  to authenticated
  using ((select auth.uid()) = '9efd6921-e9d0-49f4-9452-2edd64315e60'::uuid);
