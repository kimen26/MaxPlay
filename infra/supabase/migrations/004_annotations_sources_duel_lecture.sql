-- ─────────────────────────────────────────────────────────────────────────
--  004_annotations_sources_duel_lecture.sql — (appliquée 2026-07-12 via MCP)
--  Les outils duel.html et lecture.html poussent leur payload JSON complet
--  dans annotations (fin du copier-coller manuel vers Claude) :
--  - sources élargies : + 'duel', 'lecture'
--  - cap texte élargi : 4 000 → 100 000 (payloads JSON complets)
-- ─────────────────────────────────────────────────────────────────────────
alter table public.annotations drop constraint annotations_source_check;
alter table public.annotations add constraint annotations_source_check
  check (source in ('comment', 'review', 'duel', 'lecture'));

alter table public.annotations drop constraint annotations_text_check;
alter table public.annotations add constraint annotations_text_check
  check (char_length(text) between 1 and 100000);
