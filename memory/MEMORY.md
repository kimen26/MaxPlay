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

- **Mini-jeux** : catalogue au menu enfant + bacs à sable parentaux (max-adventure,
  mj-pose-tiles). Nombre et liste = `site/js/catalog.js`, jamais recopiés en dur ailleurs.
  Détail d'état : `studio/minijeux/pmo/INVARIANTS.md` § État déploiement.
- **Dino** : encyclopédie multi-langue en construction (FR complet, EN/ES/PT-BR en cours
  sur l'UI et les fiches). Compte de dinos et couverture : `studio/dino/pmo/_ETAT-DINOS.md`.
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
| Agents disponibles | `.claude/agents/README.md` |
| Quel skill utiliser | `/skills` |
| Workflow session | Plan → Dev (subagents) → Verify → Commit → graver (mémoire + backlog) |
| État vrai d'un pôle (jeu/dino/narration) | `studio/<pôle>/memory/MEMORY.md` (une fois converti) ou `pmo/` en attendant |
| Audits transverses (GED, infra) | `memory/audits/AAAA-MM-JJ-<sujet>.md` |

## Convention mémoire

Quintette `memory/` (MEMORY · TODO · DECISIONS · LESSONS · CHANGELOG) à la racine ET par
pôle vivant. Règle complète : `~/.claude/rules/memoire-projet.md`. Historique de la
convergence : `memory/DECISIONS.md` § D-004.
