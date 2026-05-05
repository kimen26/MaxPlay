# Kanban — 004 Le Pont Cassé

| # | Étape | Owner | Statut | Output |
|---|-------|-------|--------|--------|
| 0 | Idée | Papa Yann | ✅ | Test variance température réelle sur sujet "pont cassé" |
| 1 | Pitch | Conseiller | ✅ | Sujet figé directement (réutilise matière connue) |
| 2 | Plan | Architecte | ✅ | Plan minimal (3 perceptions distinctes, pont au centre) |
| 3 | Briefs | Directeur | ✅ | `_writer-package.md` autoporteur |
| 4 | Versions writers | 4 LLM × 2 temp | ⏳ | 8 runs en cours |
| 5 | Lecteurs témoins | 6 lecteurs vierges | ⏳ | en attente étape 4 |
| 6 | Sélection | Directeur | ⏳ | en attente étape 5 |
| 7 | Rewrite | Directeur | ⏳ | — |
| 8 | GateKeeper | GateKeeper | ⏳ | — |
| 9 | Canon | Directeur+PMO | ⏳ | — |

## Mapping températures Tour writers (2026-05-05)

| Run | LLM | Temperature | Note |
|-----|-----|-------------|------|
| claude-run1 | Claude (Sonnet via Task) | natif | Task tool n'expose pas temp |
| claude-run2 | Claude (Sonnet via Task) | natif (re-prompt) | variance par re-roll |
| kimi-run1 | moonshot-v1-32k (mode story) | 0.3 | nominal Moonshot |
| kimi-run2 | moonshot-v1-32k (mode story) | 0.9 | créatif |
| deepseek-run1 | deepseek-chat | 1.0 | nominal DeepSeek |
| deepseek-run2 | deepseek-chat | 0.4 | sobre |
| grok-run1 | grok-4-fast-non-reasoning | 0.7 | nominal Grok |
| grok-run2 | grok-4-fast-non-reasoning | 1.2 | créatif |
