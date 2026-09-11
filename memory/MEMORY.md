# MaxPlay — Mémoire (où on en est)

> Chargé automatiquement à chaque session. Rester sous 60 lignes — l'état vrai (chiffres,
> listes) vit dans les fichiers pointés, jamais recopié ici.

## Le projet

PWA éducative pour Max (3.5-4 ans), déployée sur GitHub Pages depuis `site/`. Modèle **1
plateforme, N domaines autonomes** : mini-jeux, dino (encyclopédie + voyage dans le temps),
narration (univers, pas encore déployée), lunii (distribution). Chaque domaine a sa
gouvernance propre dans `studio/<pôle>/`. Profil complet de Max : `memory/MAX_PROFILE.md`.
Vision produit : `memory/VISION.md`.

## Ce qui est live

- **Mini-jeux** : catalogue au menu enfant. Nombre et liste = `site/js/catalog.js`, jamais
  recopiés en dur ailleurs. Détail d'état : `studio/minijeux/memory/INVARIANTS.md` § État déploiement.
- **Dino** : encyclopédie multi-langue en construction (FR complet, EN/ES/PT-BR en cours
  sur l'UI et les fiches). Compte de dinos et couverture : `studio/dino/memory/_ETAT-DINOS.md`.
- **Infra** : Supabase (auth parent, sync progression, voix cloud) — `infra/supabase/README.md`.
  Bot Telegram (backend Claude ou Kimi Code) — `infra/bot/index.ts`. MCP `llm-copains`
  (Grok, Kimi, ElevenLabs) — `infra/mcp/server.ts`.

## Chantiers en cours

- Refonte infra Claude (mémoire, hooks, skills, agents) : lanes détaillées dans `memory/TODO.md`.
- Multilingue dino (EN/ES/PT-BR) : avance fiche par fiche, voir commits `feat(dino-i18n)`.
- Registre de contenu transverse (dette/dérive texte-audio) : `studio/referentiel/README.md`.

## Où lire quoi

| Question | Fichier |
|---|---|
| Pourquoi c'est comme ça (arbitrages) | `memory/DECISIONS.md` |
| Quoi ensuite (lanes ouvertes) | `memory/TODO.md` |
| Quelle erreur ne pas refaire | `memory/LESSONS.md` |
| Ce qui est sorti | `memory/CHANGELOG.md` |
| Qui est Max | `memory/MAX_PROFILE.md` |
| Vision produit | `memory/VISION.md` |
| Quel mot pour quelle chose (vocabulaire unique) | `memory/GLOSSAIRE.md` |
| Agents disponibles | `.claude/agents/README.md` |
| Quel skill utiliser | `/skills` |
| Workflow session | Plan → Dev (subagents) → Verify → Commit → graver (mémoire + backlog) |
| État vrai d'un pôle (jeu/dino/narration) | `studio/<pôle>/memory/MEMORY.md` |
| Audits transverses (GED, infra) | `memory/audits/AAAA-MM-JJ-<sujet>.md` |

## Convention mémoire

Quintette `memory/` (MEMORY · TODO · DECISIONS · LESSONS · CHANGELOG) à la racine ET par
pôle vivant. Règle complète : `~/.claude/rules/memoire-projet.md`. Historique de la
convergence : `memory/DECISIONS.md` § D-004.

## Journal
- 2026-09-03/04 — Refonte infra Claude (audit `memory/audits/2026-09-03-archi-claude-infra.md`) : 13 handoffs exécutés par Sonnet (registre `docs/handoffs/README.md`). Fait : quintette racine + JEU + NARRATION + DINO (HO-008), rules ≤ 60 l., hooks `memory/` + `garde-git-add`, 26→21 agents avec `memory: project`, site/ sans outillage (−38 Mo tiles doublon), 6 skills globaux (`narration-craft`, `game-design-enfant`, `tts-pipeline`, `audio-verif`, `i18n-contenu`, `browser-pilot`). Reste : pousser les skills sur `claude_conf` (Sync-Skills, confirmation Papa Yann), INDEX minijeux (TODO).
- 2026-09-04 — 12 sons `voix/lieux/` tués à la source (catalogue `LIEUX`), silence 80 ms des fiches dino gravé comme voulu, glossaire vocabulaire ouvert (`memory/GLOSSAIRE.md`).
- 2026-09-05 — Abandon Max Adventure + tiles LimeZu + WexWorld côté JEU (D-005) : archivés dans `_archive/2026-09-05-max-adventure-tiles/`, références retirées (HO-G13), CI sans build Phaser. Glossaire normatif (D-006), 7 types d'images dino définis.
- 2026-09-12 — Audit archi GED site ↔ studio (`memory/audits/2026-09-12-archi-ged-site-studio.md`) : repo = entrepôt (3,8 Go d'historique, ~290 Mo d'audio tiers versionné, `_archive` 46 % des fichiers), source de vérité éclatée (dino 4 copies, mj 9-13 gestes, `mj-58` fantôme dans `mur.js`), zéro GC (handoffs, LESSONS 70 Ko, tables mortes). Supabase gardé réduit à 4 tables. Papa Yann a tranché le même jour (D-007 à D-012) : refonte complète lancée : TODO à plat dans `memory/TODO.md` (15 lanes, 7 vagues, DoD par lane), un handoff par lane dans `docs/handoffs/HO-R*.md`, règles dans `docs/handoffs/README.md`, narration hors périmètre. Leçon L-008 : pas de plan parallèle à la TODO.
