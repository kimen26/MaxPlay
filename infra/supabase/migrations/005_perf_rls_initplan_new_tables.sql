-- ─────────────────────────────────────────────────────────────────────────
--  005_perf_rls_initplan_new_tables.sql — (appliquée 2026-07-12 via MCP)
--  Advisors post-003/004 : auth.uid() ré-évalué par ligne dans les policies
--  → (select auth.uid()) = initplan unique. + index FK annotations.child_id.
--  Périmètre : les 3 nouvelles tables seulement (les anciennes = dette 001).
-- ─────────────────────────────────────────────────────────────────────────

-- game_sessions
drop policy "parent insère les sessions de ses enfants" on public.game_sessions;
create policy "parent insère les sessions de ses enfants"
  on public.game_sessions for insert
  with check (exists (
    select 1 from public.child_profiles c
    where c.id = game_sessions.child_id and c.parent_id = (select auth.uid())
  ));

drop policy "parent lit les sessions de ses enfants" on public.game_sessions;
create policy "parent lit les sessions de ses enfants"
  on public.game_sessions for select
  using (exists (
    select 1 from public.child_profiles c
    where c.id = game_sessions.child_id and c.parent_id = (select auth.uid())
  ));

-- child_state
drop policy "parent gère l'état de ses enfants" on public.child_state;
create policy "parent gère l'état de ses enfants"
  on public.child_state for all
  using (exists (
    select 1 from public.child_profiles c
    where c.id = child_state.child_id and c.parent_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.child_profiles c
    where c.id = child_state.child_id and c.parent_id = (select auth.uid())
  ));

-- annotations
drop policy "parent insère ses annotations" on public.annotations;
create policy "parent insère ses annotations"
  on public.annotations for insert
  with check ((select auth.uid()) = parent_id);

drop policy "parent lit ses annotations" on public.annotations;
create policy "parent lit ses annotations"
  on public.annotations for select
  using ((select auth.uid()) = parent_id);

drop policy "parent supprime ses annotations" on public.annotations;
create policy "parent supprime ses annotations"
  on public.annotations for delete
  using ((select auth.uid()) = parent_id);

-- FK sans index (advisor INFO)
create index idx_annotations_child on public.annotations (child_id);
