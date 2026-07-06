-- ─────────────────────────────────────────────────────────────────────────
--  002_indexes_hardening.sql — Index RLS + durcissement fonctions
--  (audit + advisors Supabase 2026-07-06, post-001)
-- ─────────────────────────────────────────────────────────────────────────

-- ── Index de support RLS ──────────────────────────────────────────────────
-- Les policies filtrent par parent_id via sous-requête sur child_profiles :
-- sans index, seq scan à chaque requête. Gratuit maintenant, douloureux à 10k.
create index if not exists idx_child_profiles_parent on public.child_profiles (parent_id);
create index if not exists idx_consents_parent       on public.consents (parent_id);
create index if not exists idx_feedback_parent       on public.feedback (parent_id);

-- ── Durcissement fonctions (3 WARN advisors sécurité) ────────────────────
-- 1. search_path mutable sur touch_updated_at (lint 0011)
alter function public.touch_updated_at() set search_path = public;

-- 2+3. check_child_limit est SECURITY DEFINER et appelable par anon/authenticated
-- via /rest/v1/rpc/ (lints 0028/0029). Ce sont des fonctions de TRIGGER :
-- elles tournent via les triggers, personne n'a besoin de les appeler par l'API.
revoke execute on function public.check_child_limit()  from anon, authenticated, public;
revoke execute on function public.touch_updated_at()   from anon, authenticated, public;
