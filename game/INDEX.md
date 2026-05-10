# PÔLE JEU — Index

> Point d'entrée du pôle JEU. Lu en premier par l'agent `game-dev` et tout agent qui touche au code/spec/asset des mini-jeux.

## Carte du pôle

```
game/
├── INDEX.md           ← ce fichier (carte d'entrée)
├── web/               ← 21 mini-jeux HTML vanilla (déployés à /)
├── phaser/            ← Phaser TS+Vite (max-adventure, déployé à /max-adventure/)
├── docs/              ← specs, audit, recherche
│   ├── jeux/          ← INDEX, GAMES_SPECS, ASSETS, AUDIO_ASSETS, game-ideas
│   ├── audit/         ← INDEX, jeux-2026-04, factorisation, roadmap-technique
│   ├── research/      ← benchmark-kids-games
│   └── ratp-colors.json ← source vérité couleurs IDFM (26 actives + 362 réf)
├── memory/            ← état + règles + stack
│   ├── state.md       ← jeux déployés, bugs actifs, backlog instantané
│   ├── rules.md       ← règles UX/péda + designs validés
│   └── stack.md       ← Phaser, archi déploiement, règles SVG
└── tasks/
    └── BACKLOG.md     ← épics jeu (EP-001 à EP-026)
```

## Lecture obligatoire avant toute modif jeu

| Étape | Fichier | Pourquoi |
|-------|---------|----------|
| 1 | [`memory/state.md`](memory/state.md) | État réel des jeux : déployés, bugs, en cours |
| 2 | [`memory/rules.md`](memory/rules.md) | Règles UX non-négociables (zéro pénalité, feedback <200 ms, zones tap 80px+) |
| 3 | [`memory/stack.md`](memory/stack.md) | Stack technique + règle bus SVG (toujours `busSVG()`) |
| 4 | [`docs/jeux/INDEX.md`](docs/jeux/INDEX.md) | Spec game-by-game |
| 5 | [`tasks/BACKLOG.md`](tasks/BACKLOG.md) | Épics, tâches, décisions |

## Source de vérité

- **Profil enfant** : [`../memory/MAX_PROFILE.md`](../memory/MAX_PROFILE.md) (transverse)
- **Vision produit** : [`../memory/VISION.md`](../memory/VISION.md) (transverse)
- **Couleurs IDFM** : [`docs/ratp-colors.json`](docs/ratp-colors.json)

## Déploiement

- CI : [`../.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
- URL : `kimen26.github.io/MaxPlay/`
  - `/` → `web/index.html` (menu mj-01..20)
  - `/mj-XX.html` → vanilla
  - `/max-adventure/` → Phaser build

## Règles non-négociables

1. **Bus** : toujours `busSVG()` / `busSVGHiddenNum()` de [`web/js/bus-svg.js`](web/js/bus-svg.js). Jamais d'emoji 🚌, jamais de div CSS colorée.
2. **Couleurs** : toujours via `LIGNES` de [`web/js/data.js`](web/js/data.js). Jamais de hex hardcodé.
3. **Zéro pénalité punitive** · **Feedback < 200 ms** · **Zones tap min 80 px** · **Sessions 3–8 min**.

## Outils tiles (LimeZu Modern Exteriors)

| Outil | Rôle |
|-------|------|
| [`web/tools/index.html`](web/tools/index.html) | **Hub Tools** — point d'entrée des outils de design |
| [`web/tools/mockups-routes.html`](web/tools/mockups-routes.html) | 🆕 **Mockups Routes** échelle uniforme + bouton "Éditer" → ouvre tile-picker pré-rempli |
| [`web/tools/tile-library-v3.html`](web/tools/tile-library-v3.html) | Patterns prêts à l'emploi + cartographie navigable |
| [`web/tools/tile-picker.html`](web/tools/tile-picker.html) | Bibliothèque catégorisée + matrice drag&drop + export Python. Supporte `?recipe=X.py` pour pré-remplir. |
| [`web/tile-tools/README.md`](web/tile-tools/README.md) | Pipeline complet (render, recipes, scripts) |

**Workflow Propose → Édite → Apprend** : agent propose une recette dans mockups-routes → user clique Éditer → modifie dans tile-picker → exporte → agent intègre + invoque agent `tile-pmo` pour graver les leçons.

**Agent dédié** : [`.claude/agents/tile-pmo.md`](../.claude/agents/tile-pmo.md) — capture systématique des erreurs ET réussites tile, met à jour LESSONS.md / patterns.js / cartography.json.

Skill associé : [`~/.claude/skills/maxplay-tiles/SKILL.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/SKILL.md) + [`LESSONS.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/LESSONS.md)

## Mini-jeu kids du tileset

[`web/mj-pose-tiles.html`](web/mj-pose-tiles.html) 🦺🚧 — **Pose-tes-tiles**, mini-jeu petit ouvrier où Max choisit ses pièces parmi 5 catégories simples (Rue, Parc, Jardin, Maisons, Forêt) et construit sa ville sur une grille 8×8. Bouton 🦺 "Lisser" qui pose automatiquement les bords trottoir autour de l'asphalte. Persistence localStorage.

---

## Pôle voisin

NARRATION : [`../narration/INDEX.md`](../narration/INDEX.md) — univers narratif (post-Phase 4).

_Créé 2026-04-30 dans la refonte arborescence._
