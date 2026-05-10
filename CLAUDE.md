# MaxPlay — Jeu éducatif & Univers narratif pour Max (3.5-4 ans)

## ACTION OBLIGATOIRE — avant toute réponse

**Étape 1 — Identifier le pôle :**

| Mots dans la demande | Pôle | Lire ensuite |
|----------------------|------|-------------|
| jeu · MJ · mini-jeu · bus · Phaser · mj-XX · déploiement · `game/web` | **JEU** | [`game/INDEX.md`](game/INDEX.md) → [`game/memory/state.md`](game/memory/state.md) |
| narration · histoire · personnage · univers · ennéagramme · cross-culture · saison · arc · Wex/Melki/Mimi/Polo/Madie/Lulu/Pierrot/Raph/Juju/Nono | **NARRATION** | [`narration/INDEX.md`](narration/INDEX.md) → [`narration/pmo/INDEX.md`](narration/pmo/INDEX.md) |
| idée brute · dump · brainstorm sans contexte clair | **?** | Demander : "C'est pour le jeu ou pour les histoires ?" |

**Étape 2 — Annoncer avant d'agir :**
Dire en 1 ligne : *"Mode [JEU/NARRATION] — je charge [fichier] puis j'agis."*
Ne jamais répondre sans avoir chargé le contexte du bon pôle.

---

## Arborescence (refonte 2026-04-30)

```
MaxPlay/
├── game/         ← PÔLE JEU (web/, phaser/, docs/, memory/, tasks/) → game/INDEX.md
├── narration/    ← PÔLE NARRATION (4 piliers : personnages, univers, cross-culture, saisons + stories, equipe, pmo, scripts) → narration/INDEX.md
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
| [`game/web/`](game/web/) | 21 mini-jeux HTML vanilla + mj-pose-tiles (kids) |
| [`game/web/tools/`](game/web/tools/) | **Hub outils tiles** : tile-picker (matrice drag&drop), tile-library-v3 (patterns), mockups-routes (échelle uniforme) |
| [`game/web/tile-tools/`](game/web/tile-tools/) | Pipeline tiles : recipes/*.py (13 validées), cartography.json, patterns.js, scripts/render.py |
| [`game/phaser/`](game/phaser/) | Phaser TS+Vite (max-adventure) |

## Tileset LimeZu — règles + agent
- **Skill** : [`~/.claude/skills/maxplay-tiles/SKILL.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/SKILL.md) + [`LESSONS.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/LESSONS.md) (30+ leçons gravées)
- **Équipe pôle JEU complète (refonte 2026-05-11)** :
  - **PMO niveau pôle** : [`game-pmo`](.claude/agents/game-pmo.md) — garant `state.md` + `BACKLOG.md`. Classifie 6 catégories. **À invoquer à chaque tour incluant un signal JEU**.
  - **Sous-spé PMO maps tile** : [`game-tile-pmo`](.claude/agents/game-tile-pmo.md) — scope strict 5 fichiers (LESSONS, cartography.json, patterns.js, recipes_data.js, PIPELINE-MEMORY.md).
  - **Sous-spé PMO mini-jeux HTML** : [`game-mj-pmo`](.claude/agents/game-mj-pmo.md) — scope strict (rules.md, stack.md, PIPELINE-MEMORY-MJ.md, docs/jeux/).
  - **Conseiller transverse** : [`game-conseiller`](.claude/agents/game-conseiller.md) (Opus) — binôme créatif Papa Yann, voix produit, force de proposition, pont entre les 3 sous-domaines. Équivalent narration-conseiller côté jeu.
  - **Sachants tile (pipeline 3 étapes)** :
    1. [`game-tile-simplifier`](.claude/agents/game-tile-simplifier.md) (Sonnet) — image/desc → ANALYSE structurée
    2. [`game-tile-designer`](.claude/agents/game-tile-designer.md) (Sonnet) — ANALYSE → recette `test_<nom>.py` + PNG render
    3. [`game-tile-reviewer`](.claude/agents/game-tile-reviewer.md) (Haiku) — verdict PASS/FAIL
  - **Sachants MJ** :
    - [`game-dev`](.claude/agents/game-dev.md) (Sonnet) — dev HTML + Phaser
    - [`game-mj-reviewer`](.claude/agents/game-mj-reviewer.md) (Haiku) — checklist 5 sections (Bus & couleurs / UX 3.5-4 ans / Audio / Technique / Vocab & péda), verdict PASS/FAIL max 5 iter
  - **Phase 2 à venir** : game-wexworld-pmo + game-wexworld-designer + game-wexworld-tester (Pokemon Gameboy-like, séparé du pipeline tile)
  - **Règle hiérarchie** : main → game-pmo → sous-spé. Communication enfant → parent. Jamais cross-pôle direct.
- **Workflow boucles d'apprentissage** :
  - **Tile** : simplifier → designer (PNG) → reviewer → user → game-tile-pmo grave (LESSONS + PIPELINE-MEMORY)
  - **MJ** : game-conseiller (challenge) → game-dev (code) → game-mj-reviewer (verdict) → user → game-mj-pmo grave (PIPELINE-MEMORY-MJ)
- **Vision long terme** : [`game/memory/VISION-LONG-TERME.md`](game/memory/VISION-LONG-TERME.md) (Phase 2 WexWorld, pont narration↔jeu, app mobile)
- **Règles d'or** :
  - Marquages H : `Asphalt_1_Variation_2` propre (pas `_14` qui est sale)
  - Marquages V : `Asphalt_1_Variation_8` propre (pas `_15` qui est sale)
  - Surfaces béton (trottoir/asphalte) = **tile unique uniforme** par défaut. Variations max 10%
  - Surfaces nature (herbe) = variations OK
  - Mnémonique : *"2 propre H, 8 propre V, 14 sale H, 15 sale V"*

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

## Architecture en 4 piliers (refonte 2026-05-10)

```
narration/
├── personnages/     ← Pilier 1 : qui sont les persos (+ théorie : ennéagramme + pédagogie 4-5)
├── univers/         ← Pilier 2 : le monde où ils vivent
├── cross-culture/   ← Pilier 3 : variantes par culture (prénoms, onomatopées, lieux, faune, saisons climat)
├── saisons/         ← Pilier 4 : plan éditorial (saison → arc → stories)
└── stories/, equipe/, pmo/, scripts/, archive/, memory/
```

## Fichiers clés
| Fichier | Rôle |
|---------|------|
| [`narration/INDEX.md`](narration/INDEX.md) | **Point d'entrée pôle** — charger en premier |
| [`narration/INBOX.md`](narration/INBOX.md) | Zone unique de dump brut sessions |
| [`narration/pmo/INDEX.md`](narration/pmo/INDEX.md) | PMO — backlog, decisions, sprint-log, roadmap |
| [`narration/personnages/INDEX.md`](narration/personnages/INDEX.md) | **Pilier 1** — casting V1 figé + lookup + théorie ennéagramme + pédagogie 4-5 ans |
| [`narration/univers/INDEX.md`](narration/univers/INDEX.md) | **Pilier 2** — carte du monde (fondements, vie-quotidienne, meta) |
| [`narration/cross-culture/INDEX.md`](narration/cross-culture/INDEX.md) | **Pilier 3** — variantes par culture (prénoms, onomatopées, faune-flore, lieux, coutumes, saisons climat, castings nationaux) |
| [`narration/saisons/INDEX.md`](narration/saisons/INDEX.md) | **Pilier 4** — plan éditorial (saison → arc → stories) |
| [`narration/stories/INDEX.md`](narration/stories/INDEX.md) | Catalogue récits — tous les états (un seul lieu post-2026-04-30) |
| [`narration/equipe/INDEX.md`](narration/equipe/INDEX.md) | Index équipe, arbre de décision agents |
| [`narration/equipe/PROCESS.md`](narration/equipe/PROCESS.md) | Workflow militaire 11 étapes (refonte 2026-05-08) |
| [`narration/equipe/patte-narrative-maxplay.md`](narration/equipe/patte-narrative-maxplay.md) | Patte B+D+C Kishōtenketsu+tranche de vie+cycle |
| [`narration/equipe/templates/`](narration/equipe/templates/) | 10 gabarits réutilisables (pitch, plan, briefs, sélection, kanban, synthèse) |
| [`narration/equipe/ORGANIGRAMME.md`](narration/equipe/ORGANIGRAMME.md) | Vue agents + chaîne de commandement |
| [`narration/scripts/`](narration/scripts/) | CLI : new-story, archive-story, gatekeeper, validate, generate-index |

## Personnages
Casting V1 « Christ » **figé** (2026-04-24, ajusté 2026-05-05) : Wex (hors-système, invariant cross-culture) + Melki/Mimi/Polo/**Madie**/Lulu/Pierrot/Raph/Juju/Nono. **4F/5M+Wex.**
Toujours lire [`narration/personnages/INDEX.md`](narration/personnages/INDEX.md) avant d'écrire.

## Cross-culture
Les **variantes culturelles** (prénoms par pays, onomatopées, équivalents de décor, faune, saisons climatiques) vivent dans [`narration/cross-culture/`](narration/cross-culture/INDEX.md). Le casting FR est dans `cross-culture/castings-nationaux/fr/`.

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
