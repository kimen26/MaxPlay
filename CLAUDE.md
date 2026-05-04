# MaxPlay — Jeu éducatif & Univers narratif pour Max (3.5-4 ans)

## ACTION OBLIGATOIRE — avant toute réponse

**Étape 1 — Identifier le pôle :**

| Mots dans la demande | Pôle | Lire ensuite |
|----------------------|------|-------------|
| jeu · MJ · mini-jeu · bus · Phaser · mj-XX · déploiement · `game/web` | **JEU** | [`game/INDEX.md`](game/INDEX.md) → [`game/memory/state.md`](game/memory/state.md) |
| narration · histoire · personnage · univers · ennéagramme · Wex/Melki/Mimi/Polo/Jérem/Lulu/Pierrot/Raph/Juju/Nono | **NARRATION** | [`narration/INDEX.md`](narration/INDEX.md) → [`narration/pmo/INDEX.md`](narration/pmo/INDEX.md) |
| idée brute · dump · brainstorm sans contexte clair | **?** | Demander : "C'est pour le jeu ou pour les histoires ?" |

**Étape 2 — Annoncer avant d'agir :**
Dire en 1 ligne : *"Mode [JEU/NARRATION] — je charge [fichier] puis j'agis."*
Ne jamais répondre sans avoir chargé le contexte du bon pôle.

---

## Arborescence (refonte 2026-04-30)

```
MaxPlay/
├── game/         ← PÔLE JEU (web/, phaser/, docs/, memory/, tasks/) → game/INDEX.md
├── narration/    ← PÔLE NARRATION (stories, arcs, univers, perso, equipe, pmo, scripts, ...) → narration/INDEX.md
├── infra/        ← bot Telegram + serveur MCP llm-copains
├── memory/       ← transverse : MEMORY, MAX_PROFILE, VISION, workflow, skills-map
├── _archive/     ← cadavres préservés (avec INDEX expliquant chaque entrée)
└── .claude/ .github/ .gitignore CLAUDE.md README.md
```

---

# PÔLE JEU

## Principes
- **Simplicity First** · **No Laziness** · **Minimal Impact** · Plan mode pour 3+ étapes
- Toujours `busSVG()` / `busSVGHiddenNum()` de [`game/web/js/bus-svg.js`](game/web/js/bus-svg.js), jamais 🚌

## Fichiers clés
| Fichier | Rôle |
|---------|------|
| [`game/INDEX.md`](game/INDEX.md) | **Point d'entrée pôle** — charger en premier |
| [`game/memory/state.md`](game/memory/state.md) | État réel : déployés, bugs, backlog |
| [`game/memory/rules.md`](game/memory/rules.md) | Règles UX/péda + designs validés |
| [`game/memory/stack.md`](game/memory/stack.md) | Stack Phaser, archi déploiement, règles SVG |
| [`game/tasks/BACKLOG.md`](game/tasks/BACKLOG.md) | Source de vérité épics jeu |
| [`game/docs/jeux/`](game/docs/jeux/) | Specs, assets, idées |
| [`game/web/`](game/web/) | 21 mini-jeux HTML vanilla |
| [`game/phaser/`](game/phaser/) | Phaser TS+Vite (max-adventure) |

## Stack & déploiement
GitHub Pages → `kimen26.github.io/MaxPlay/`
- `/` → `game/web/index.html` (menu)
- `/mj-XX.html` → HTML vanilla
- `/max-adventure/` → Phaser build (CI)

CI : [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (assemble dans `_site/` gitignored).

---

# PÔLE NARRATION

## Principes
- Privilégier **Kishōtenketsu** (sans antagoniste) pour enfants
- Ennéagramme = grille personnages (basée Chabreuil)
- Référence externe : `C:\Users\kimen\SecondBrain\Ressources\Enneagramme\`

## Fichiers clés
| Fichier | Rôle |
|---------|------|
| [`narration/INDEX.md`](narration/INDEX.md) | **Point d'entrée pôle** — charger en premier |
| [`narration/INBOX.md`](narration/INBOX.md) | Zone unique de dump brut sessions |
| [`narration/pmo/INDEX.md`](narration/pmo/INDEX.md) | PMO — backlog, decisions, sprint-log, roadmap |
| [`narration/personnages/INDEX.md`](narration/personnages/INDEX.md) | Casting V1 figé + lookup + catalogue cross-culture |
| [`narration/univers/INDEX.md`](narration/univers/INDEX.md) | Carte du monde (3 sous-dossiers : fondements, vie-quotidienne, meta) |
| [`narration/stories/INDEX.md`](narration/stories/INDEX.md) | **Catalogue récits — TOUS les états** (pitch, gatekeeper-PASS, canon — un seul lieu post-2026-04-30) |
| [`narration/arcs/INDEX.md`](narration/arcs/INDEX.md) | **Fiches d'arc** : qualité humaine + problématique au niveau arc (4 arcs saison 1) |
| [`narration/enneagramme/`](narration/enneagramme/) | Fiches théoriques par type + casting-mapping |
| [`narration/equipe/INDEX.md`](narration/equipe/INDEX.md) | **Index équipe — point d'entrée**, arbre de décision agents |
| [`narration/equipe/PROCESS.md`](narration/equipe/PROCESS.md) | **Workflow militaire 9 étapes** — owners, I/O, critères PASS, SLA, reprise |
| [`narration/equipe/patte-narrative-maxplay.md`](narration/equipe/patte-narrative-maxplay.md) | **Patte B+D+C** Kishōtenketsu+tranche de vie+cycle, outils E/A doux, F écartée |
| [`narration/equipe/templates/`](narration/equipe/templates/) | 8 gabarits réutilisables (pitch, plan, briefs, sélection, kanban, synthèse) |
| [`narration/equipe/ORGANIGRAMME.md`](narration/equipe/ORGANIGRAMME.md) | Vue agents + chaîne de commandement |
| [`narration/memory/state.md`](narration/memory/state.md) | État instantané narration |
| [`narration/scripts/`](narration/scripts/) | CLI : new-story, archive-story, gatekeeper, validate, generate-index |

## Personnages
Casting V1 "Christ" **figé** (2026-04-24). Wex (héros hors-système, prénom invariant cross-culture) + 9 compagnons ennéatypes (prénoms variables par casting national).
Toujours lire [`narration/personnages/INDEX.md`](narration/personnages/INDEX.md) avant d'écrire.

---

# COMMUN

## Profil Max
3.5-4 ans · chiffres jusqu'aux milliers · lecture phonétique · tablette tactile.
Passions : bus Villejuif, animaux, drapeaux, loups, Tayo, Totoro/Ghibli, Stitch.
Origines brésiliennes. Voir [`memory/MAX_PROFILE.md`](memory/MAX_PROFILE.md).

## Fichiers transversaux
| Fichier | Rôle |
|---------|------|
| [`memory/MEMORY.md`](memory/MEMORY.md) | Mémoire projet dense (archi, décisions historiques) |
| [`memory/MAX_PROFILE.md`](memory/MAX_PROFILE.md) | Profil complet Max |
| [`memory/VISION.md`](memory/VISION.md) | Vision produit jeu |
| [`memory/workflow.md`](memory/workflow.md) | Workflow session |
| [`memory/skills-map.md`](memory/skills-map.md) | Agents, skills, commandes |
| [`infra/bot/index.ts`](infra/bot/index.ts) | Bot Telegram — routing agents, permissions |
| [`infra/mcp/server.ts`](infra/mcp/server.ts) | MCP llm-copains (Grok, Kimi, ElevenLabs) |
| [`.claude/agents/`](.claude/agents/) | Équipe : narration-conseiller (Opus) · narration-architecte (Sonnet) · narration (Opus) · narration-writer-claude-libre (Sonnet) · narration-gatekeeper (Haiku) · narration-pmo (Haiku) · science/sensibilite/archiviste (Haiku/Sonnet) · game-dev (Sonnet) · quick (Haiku) |
| [`_archive/INDEX.md`](_archive/INDEX.md) | Cadavres préservés (avec date + raison) |

## Workflow
```
Plan → TodoWrite → Dev (subagents) → Verify → Commit → Docs
```
Après correction utilisateur → leçon dans [`game/tasks/BACKLOG.md`](game/tasks/BACKLOG.md) (jeu) ou [`narration/pmo/decisions.md`](narration/pmo/decisions.md) (narration).
