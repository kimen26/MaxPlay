# TODO — quoi ensuite

> Ouverture/fermeture de chantier. Les lanes livrées se vident dans `CHANGELOG.md`.
> Détail d'exécution = dans le handoff, pas ici. Usine et registre : `docs/handoffs/README.md`.

## Chantier — Refonte infra Claude 2026-09-03 (5 plans, usine handoffs `docs/handoffs/`)

Issu de `memory/audits/2026-09-03-archi-claude-infra.md`. Vagues 1 → 2 → 3, chaque vague commitée avant la suivante. Statuts et fichiers possédés exacts : `docs/handoffs/README.md` (registre).

- **Plan A — Hygiène immédiate** : BOM, plugin telegram, config active liens cassés, purge settings.json, auto-memory. Handoffs HO-G01, HO-G03, HO-G04.
- **Plan B — Mémoire convergente** : ce chantier (HO-G02 racine, en cours) + pôle par pôle (HO-MJ-01, HO-DINO-008, HO-NAR-01).
- **Plan C — Skills globaux chaîne de contenu** : `tts-pipeline`, `audio-verif`, `i18n-contenu`, `browser-pilot`, migration `narration-craft`/`game-design-enfant` en user-level. Handoffs HO-G06, HO-G08, HO-G09.
- **Plan D — Prod propre** : sortir l'outillage de `site/`, trancher les orphelins `img/dinos/`, scinder `studio/referentiel/`. Handoff HO-G10 (post-inventaire HO-G05 validé).
- **Plan E — Agents et Kimi** : décision Kimi Code, archivage/fusion agents jamais tracés, `memory: project`, catalogue d'équipe unique généré. Handoff HO-G12.

## Lanes transverses connues (reprises de l'ancien `memory/MEMORY.md`)

- Recette réelle du parcours compte → sync (Papa Yann) à faire en conditions réelles.
- Resend SMTP + template `{{ .Token }}` — bloqué par la configuration SMTP custom.
- Nom de domaine à acheter (~10 €/an).
- 6 pages encore en `SpeechSynthesisUtterance` brut à migrer vers `TTS.speak` : mj-19, mj-20, mj-22, dev-dinos, index2, index3.

## Audio i18n — proposition non tranchée

`memory/audio/PLAN-AUDIO-I18N.md` (2026-07-08) reste un plan **proposé**, pas figé : décisions 🚨 en attente d'arbitrage Papa Yann (convention `<lang>/`, casting `Native <lang>`, gouvernance registre, Supabase Storage hors FR). Ne pas le considérer comme réalisé — l'i18n dino a depuis avancé (voir commits `feat(dino-i18n)`, `feat(audio-i18n)` de 2026-08/09) mais le plan lui-même n'a pas été revalidé point par point.
