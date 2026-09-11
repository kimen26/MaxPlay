# TODO — quoi ensuite

> Ouverture/fermeture de chantier. Les lanes livrées se vident dans `CHANGELOG.md`.
> Détail d'exécution = dans le handoff, pas ici. Remis à plat le 2026-09-12 (refonte GED) : les chantiers de la refonte infra 2026-09-03 sont tous livrés (registre `docs/handoffs/README.md`), leurs reliquats sont repris ci-dessous ou dans le plan de refonte.

## CHANTIER EN COURS — Refonte GED site ↔ studio (ouvert 2026-09-12)

**Cerveau : `docs/handoffs/refonte-ged-2026-09/PLAN.md`** (état des vagues, spec des lanes, règles d'orchestration). Audit source : `memory/audits/2026-09-12-archi-ged-site-studio.md`. Décisions D-007 à D-012.

| Vague | Lanes | Résultat attendu |
|---|---|---|
| 0 | R00 orchestrateur | binaires tiers supprimés, `_archive` dans le vault, gitignore générique, branches mortes, handoffs `_done/`, migration 013 |
| 1 | R01 R02 R03 R06 R07 | docs et mémoire JEU/DINO à plat, Lunii un moteur, site sans assets morts ni rips sous droits |
| 2 | R08 | `package.json` racine, `site/js/gen/`, `npm run build / check / test` |
| 3 | R09 R10 | Mur piloté par le catalogue, `check-mj-coherence` bloquant, gabarit mj, runtime dédoublonné |
| 4 | R12 R11 R04 | fiche canon dino + check data ↔ narré, service worker, hooks consolidés |
| 5 | R13 R14 | WebP, routine `npm run gc` |
| 6 | R99 orchestrateur | `git filter-repo`, force-push, CHANGELOG, audit de clôture |

Reliquats absorbés par la refonte : INDEX minijeux (R01) · pages en `speechSynthesis` brut (R10) · commentaires obsolètes `mj-46.html:40`, `mj-50.html:90`, `avatar-picker.js:5,16` (R10) · dérive `aenocyon-taille` (R12, check data ↔ narré) · scripts dino logés dans minijeux (R01).

## Décisions attendues de Papa Yann (hors refonte)

- [ ] MCP `supabase-maxvoyage` : il vit dans `~/.claude.json` (niveau utilisateur), donc visible depuis MaxPlay. À déplacer dans le `.mcp.json` du projet MaxVoyage. Risque : migration appliquée au mauvais projet.
- [ ] `memory/audio/PLAN-AUDIO-I18N.md` (2026-07-08) : plan **proposé**, jamais revalidé point par point (convention `<lang>/`, casting `Native <lang>`, gouvernance registre, Supabase Storage hors FR). L'i18n dino a avancé depuis sans lui.
- [ ] `memory/GLOSSAIRE.md` : valider les termes ❓, puis passer le vocabulaire partout (handoff par pôle une fois tranché).
- [ ] Pousser les 6 skills globaux sur `kimen26/claude_conf` via `Sync-Skills-github-ProPerso` (action externe).
- [ ] Recette réelle du parcours compte → sync en conditions réelles (P30 Pro, 360 px).
- [ ] Nom de domaine (~10 €/an). Resend SMTP + template `{{ .Token }}` bloqué par la config SMTP custom.

## Backlog post-refonte (à ouvrir après la vague 6)

- [ ] DINO : `i18n.config.json` + brancher `~/.claude/skills/i18n-contenu/scripts/check-i18n.mjs`.
- [ ] DINO : migrer `dino-images-lunii/scripts/{gpt-gen,gpt-gen-dino,grok-gen-dino}.mjs` sur `browser-pilot` (corrige le bug qualité Grok, bouton Télécharger).
- [ ] AUDIO : migrer les 17 scripts ElevenLabs vers `~/.claude/skills/tts-pipeline` (table `references/migration-maxplay.md`), loudnorm unique I=-16/TP=-1.5/LRA=11.
- [ ] AUDIO : `audio-verif` bascule `--stt-model scribe_v2` quand `scribe_v1` sera déprécié.
- [ ] NARRATION (hors périmètre refonte) : skill `name-sonority-check` (8 axes, verdict /16) + agent dédié ou skill seule, à clarifier.
