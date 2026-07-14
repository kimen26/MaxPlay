-- ─────────────────────────────────────────────────────────────────────────
--  011_game_sessions_delete_policy.sql — (appliquée 2026-07-14 via MCP)
--  Suite audit persistance/sécurité 2026-07-14, finding #4 (droit à l'effacement) :
--
--  resetChild() (cloud.js) vide child_state + progression, mais game_sessions
--  n'avait QUE des policies INSERT+SELECT → les sessions horodatées de l'enfant
--  survivaient indéfiniment côté serveur après un « Reset » parent. Du point de
--  vue RGPD art.17 / COPPA (droit à l'effacement), un parent qui reset exprime
--  une intention de suppression → il doit pouvoir effacer aussi les sessions.
--
--  On ajoute une policy DELETE scopée au parent propriétaire (même modèle RLS
--  que les autres tables). resetChild() appelle désormais ce delete.
--  (La cascade on-delete existante ne couvre QUE la suppression du PROFIL entier,
--   pas un reset de progression profil conservé.)
-- ─────────────────────────────────────────────────────────────────────────

create policy "parent supprime les sessions de ses enfants"
  on public.game_sessions for delete
  using (exists (
    select 1 from public.child_profiles c
    where c.id = game_sessions.child_id and c.parent_id = (select auth.uid())
  ));
