# PÔLE JEU — Index

> Point d'entrée du pôle JEU. Lu en premier par tout agent qui touche au code/spec/asset des mini-jeux ou des tiles.
> Refonte 2026-05-13 (harmonisation Game ↔ Narration — création game-archiviste, dossier pmo/ dédié, préfixage commandes).
>
> Équivalent côté Narration : [`../narration/INDEX.md`](../narration/INDEX.md).

## Carte du pôle

```
game/
├── INDEX.md              ← ce fichier (carte d'entrée)
├── EQUIPE.md             ← 🆕 organigramme complet équipe (10 agents + 3 Phase 2)
├── web/                  ← 22 mini-jeux HTML vanilla + mj-pose-tiles + tile-tools
│   ├── index.html        ← menu
│   ├── mj-XX.html        ← mini-jeux (22 actifs)
│   ├── mj-pose-tiles.html ← mini-jeu kids tileset
│   ├── js/               ← bus-svg.js, data.js, tracker.js, sounds.js, victory-sounds.js
│   ├── tools/            ← hub : tile-picker, tile-library-v3, mockups-routes, brick-explorer
│   └── tile-tools/       ← pipeline : vocab.py, styles.py, builders.py, recipes/, scripts/
├── phaser/               ← Phaser TS+Vite (max-adventure, déployé à /max-adventure/)
├── docs/                 ← specs, audit, recherche
│   ├── jeux/             ← INDEX, GAMES_SPECS, ASSETS, AUDIO_ASSETS, game-ideas
│   ├── audit/            ← INDEX, jeux-2026-04, factorisation, roadmap-technique
│   ├── research/         ← benchmark-kids-games
│   └── ratp-colors.json  ← source vérité couleurs IDFM (26 actives + 362 réf)
├── memory/               ← 🆕 sources de vérité statiques (depuis refonte 2026-05-13)
│   ├── state.md          ← état déploiement statique (jeux actifs, bugs critiques en cours)
│   ├── rules.md          ← règles UX/péda + designs validés
│   ├── stack.md          ← Phaser, archi déploiement, règles SVG
│   └── VISION-LONG-TERME.md ← Phase 2 WexWorld, pont narration↔jeu, app mobile
├── pmo/                  ← 🆕 PMO dossier dédié (depuis refonte 2026-05-13)
│   ├── INVARIANTS.md     ← 🆕 source de vérité chiffres clés
│   ├── decisions.md      ← 🆕 décisions figées + questions ouvertes
│   ├── sprint-log.md     ← 🆕 journal sessions chronologique
│   ├── backlog.md        ← 🆕 tickets EP-xxx + leçons L-xxx (déplacé depuis tasks/)
│   └── audit-trail.md    ← 🆕 traces audits PMO + cause racine
└── tasks/
    └── BACKLOG.md        ← ⚠️ stub redirection vers pmo/backlog.md (depuis 2026-05-13)
```

---

---

## Équipe agents

| Agent | Modèle | Niveau | Mode | Rôle bref |
|-------|--------|--------|------|-----------|
| `game-pmo` | Haiku | 1 | **AUTO** signal JEU | PMO fond + orchestre sous-spé |
| `game-archiviste` 🆕 | Haiku | 1 | **AUTO** signal structure | Maillon central forme (binôme PMO) |
| `game-mj-pmo` | Haiku | 2 | Invoqué par game-pmo | Sous-spé mini-jeux HTML |
| `game-tile-pmo` | Haiku | 2 | Invoqué par game-pmo | Sous-spé tile-tools LimeZu |
| `game-wexworld-pmo` ⏳ | Haiku | 2 | Phase 2 | Sous-spé Phaser RPG |
| `game-conseiller` | Opus | 3 | Manuel | Binôme créatif transverse |
| `game-dev` | Sonnet | 4 | Manuel | Dev HTML vanilla + Phaser |
| `game-tile-simplifier` | Sonnet | 4 | Manuel | Pipeline tile étape 1/3 |
| `game-tile-designer` | Sonnet | 4 | Manuel | Pipeline tile étape 2/3 |
| `game-tile-reviewer` | Haiku | 4 | Manuel | Pipeline tile étape 3/3 |
| `game-mj-reviewer` | Haiku | 4 | Manuel | Validateur MJ (checklist 5 sections) |

Détails complets : [`EQUIPE.md`](EQUIPE.md).

---

## Source de vérité transverse

- **Profil enfant** : [`../memory/MAX_PROFILE.md`](../memory/MAX_PROFILE.md)
- **Vision produit transverse** : [`../memory/VISION.md`](../memory/VISION.md)
- **Vision long terme pôle JEU** : [`memory/VISION-LONG-TERME.md`](memory/VISION-LONG-TERME.md)
- **Couleurs IDFM** : [`docs/ratp-colors.json`](docs/ratp-colors.json)

---

## Déploiement

- CI : [`../.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
- URL : `kimen26.github.io/MaxPlay/`
  - `/` → `web/index.html` (menu mj-01..20 + max-adventure)
  - `/mj-XX.html` → vanilla
  - `/max-adventure/` → Phaser build (CI)
  - `/mj-pose-tiles.html` → mini-jeu kids tileset

---

---

## Outils tiles (LimeZu Modern Exteriors)

| Outil | Rôle |
|-------|------|
| [`web/tools/index.html`](web/tools/index.html) | **Hub Tools** — point d'entrée des outils de design |
| [`web/tools/mockups-routes.html`](web/tools/mockups-routes.html) | **Mockups Routes** échelle uniforme + bouton "Éditer" → ouvre tile-picker pré-rempli |
| [`web/tools/tile-library-v3.html`](web/tools/tile-library-v3.html) | Patterns prêts à l'emploi + cartographie navigable |
| [`web/tools/tile-picker.html`](web/tools/tile-picker.html) | Bibliothèque catégorisée (9811 tiles, 100% couverture) + matrice drag&drop + export Python. Supporte `?recipe=X.py` |
| [`web/tools/brick-explorer.html`](web/tools/brick-explorer.html) | 🆕 (2026-05-12) Page interactive validation tile par tile (mini-render 3×3, vote courbe/point/autre/rejeté) |
| [`web/tile-tools/README.md`](web/tile-tools/README.md) | Pipeline complet (render, recipes, scripts, vocab.py, styles.py) |

**Workflow Propose → Édite → Apprend** :
1. game-tile-simplifier → ANALYSE
2. game-tile-designer → recette + PNG
3. game-tile-reviewer → verdict PASS/FAIL
4. game-tile-pmo grave leçons dans LESSONS.md + PIPELINE-MEMORY.md
5. game-pmo intègre synthèse, game-archiviste vérifie structure

**Skill associé** : [`~/.claude/skills/maxplay-tiles/SKILL.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/SKILL.md) + [`LESSONS.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/LESSONS.md) (30+ leçons gravées).

---

## Mini-jeu kids du tileset

[`web/mj-pose-tiles.html`](web/mj-pose-tiles.html) 🦺🚧 — **Pose-tes-tiles**, mini-jeu petit ouvrier où Max choisit ses pièces parmi 5 catégories simples (Rue, Parc, Jardin, Maisons, Forêt) et construit sa ville sur une grille 8×8. Bouton 🦺 "Lisser" qui pose automatiquement les bords trottoir autour de l'asphalte. Persistence localStorage.

---

## Pôle voisin

NARRATION : [`../narration/INDEX.md`](../narration/INDEX.md) — univers narratif (post-Phase 4).

---

_Créé 2026-04-30 dans la refonte arborescence. Refonte 2026-05-13 : harmonisation Game ↔ Narration._
