# PÔLE JEU — Index

> Point d'entrée du pôle JEU. Lu en premier par tout agent qui touche au code/spec/asset des mini-jeux ou des tiles.
> Refonte 2026-05-13 (harmonisation Game ↔ Narration). **MAJ 2026-06-04** : migration `game/` → `studio/minijeux/` (gouvernance) + `site/` (code déployé) + `studio/max-adventure/` (Phaser). Carte + chemins réalignés.
>
> Équivalent côté Narration : [`../narration/INDEX.md`](../narration/INDEX.md).

## Carte du pôle

```
studio/minijeux/          ← GOUVERNANCE + specs (PAS le code déployé)
├── INDEX.md              ← ce fichier (carte d'entrée)
├── CLAUDE.md             ← règles auto-chargées du pôle (nested)
├── EQUIPE.md             ← organigramme complet équipe
├── INBOX.md · inbox/     ← idées entrantes (bot Telegram + dépôts manuels)
├── docs/
│   ├── jeux/             ← INDEX, GAMES_SPECS, ASSETS, AUDIO_ASSETS, game-ideas, figees/
│   ├── audit/            ← INDEX, jeux-2026-04, factorisation, roadmap-technique
│   └── research/         ← benchmark-kids-games
├── memory/               ← sources de vérité statiques
│   ├── state.md          ← état déploiement (jeux actifs, bugs critiques)
│   ├── rules.md          ← règles UX/péda + designs validés
│   ├── stack.md          ← Phaser, archi déploiement, règles SVG
│   └── VISION-LONG-TERME.md ← Phase 2 WexWorld, pont narration↔jeu
├── pmo/                  ← INVARIANTS · decisions · sprint-log · backlog · audit-trail
├── tasks/BACKLOG.md      ← stub redirection vers pmo/backlog.md
└── tests/                ← harnais Playwright mini-jeux (EP-038)

CODE DÉPLOYÉ (hors pôle, GitHub Pages) :
  site/                   ← mini-jeux HTML (count → pmo/INVARIANTS.md) + index.html + js/catalog.js (menu) + tools/ + tile-tools/ + mj-pose-tiles.html
  studio/max-adventure/   ← Phaser TS+Vite (build CI → /max-adventure/) · gouverné par ce pôle (CLAUDE.md local pointe ici)
```

---

## Équipe agents

| Agent | Modèle | Niveau | Mode | Rôle bref |
|-------|--------|--------|------|-----------|
| `game-pmo` | Haiku | 1 | **AUTO** signal JEU | PMO fond + orchestre sous-spé |
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

- **Profil enfant** : [`../../memory/MAX_PROFILE.md`](../../memory/MAX_PROFILE.md)
- **Vision produit transverse** : [`../../memory/VISION.md`](../../memory/VISION.md)
- **Vision long terme pôle JEU** : [`memory/VISION-LONG-TERME.md`](memory/VISION-LONG-TERME.md)
- **Couleurs IDFM** : [`docs/ratp-colors.json`](docs/ratp-colors.json)

---

## Mémoires process (REX méta-pipeline)

- **Pipeline mini-jeux** : [`site/PIPELINE-MEMORY-MJ.md`](../../site/PIPELINE-MEMORY-MJ.md) — frictions résolues, évolution agents MJ (créé 2026-05-11, leçons EP-021 + EP-022)
- **Pipeline tile-tools** : [`site/tile-tools/PIPELINE-MEMORY.md`](../../site/tile-tools/PIPELINE-MEMORY.md) — journal design tiles, leçons simplifier/designer/reviewer, erreurs gravées LESSONS.md

---

## Déploiement

- CI : [`../../.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)
- URL : `kimen26.github.io/MaxPlay/`
  - `/` → `site/index.html` (menu par catégories, source `site/js/catalog.js`)
  - `/mj-XX.html` → vanilla
  - `/max-adventure/` → Phaser build (CI, source `studio/max-adventure/`)
  - `/mj-pose-tiles.html` → mini-jeu kids tileset

---

## Outils tiles (LimeZu Modern Exteriors)

| Outil | Rôle |
|-------|------|
| [`site/tools/index.html`](../../site/tools/index.html) | **Hub Tools** — point d'entrée des outils de design |
| [`site/tools/mockups-routes.html`](../../site/tools/mockups-routes.html) | **Mockups Routes** échelle uniforme + bouton "Éditer" → ouvre tile-picker pré-rempli |
| [`site/tools/tile-library-v3.html`](../../site/tools/tile-library-v3.html) | Patterns prêts à l'emploi + cartographie navigable |
| [`site/tools/tile-picker.html`](../../site/tools/tile-picker.html) | Bibliothèque catégorisée (9811 tiles, 100% couverture) + matrice drag&drop + export Python. Supporte `?recipe=X.py` |
| [`site/tools/brick-explorer.html`](../../site/tools/brick-explorer.html) | (2026-05-12) Page interactive validation tile par tile (mini-render 3×3, vote courbe/point/autre/rejeté) |
| [`site/design-lecture/`](../../site/design-lecture/) | **Chantier UI lecture** (mockups syllabique/phonique, Kimi) — voir `NOTES-DESIGN-LECTURE.md` interne |
| [`site/design-compte/`](../../site/design-compte/) | **Chantier UI compte** (mockups étoiles/récompenses) — voir `NOTES-DESIGN-COMPTE.md` interne |
| [`site/design-shared/`](../../site/design-shared/) | Assets partagés des chantiers design (mockup.css/js + fonts) — utilisé par design-lecture ET design-compte |
| [`site/atelier-couleurs.html`](../../site/atelier-couleurs.html) | Atelier prototype recoloration avatars (algo repris dans `avatar-picker.js`) |
| [`site/index2.html`](../../site/index2.html) · [`site/index3.html`](../../site/index3.html) | Prototypes menu alternatifs (« ligne » / « fusée ») — décision non tranchée, voir [`docs/audit/menu-2026-07.md`](docs/audit/menu-2026-07.md) |
| [`site/tile-tools/README.md`](../../site/tile-tools/README.md) | Pipeline complet (render, recipes, scripts, vocab.py, styles.py) |

**Workflow Propose → Édite → Apprend** :
1. game-tile-simplifier → ANALYSE
2. game-tile-designer → recette + PNG
3. game-tile-reviewer → verdict PASS/FAIL
4. graver leçons dans LESSONS.md + PIPELINE-MEMORY.md (main agent ou game-pmo unifié)
5. game-pmo unifié vérifie fond + structure (fusion 2026-07-19)

**Skill associé** : [`~/.claude/skills/maxplay-tiles/SKILL.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/SKILL.md) + [`LESSONS.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/LESSONS.md) (30+ leçons gravées).

---

## Scripts Python tile (`site/tile-tools/scripts/`)

**22 scripts** d'infrastructure & rendu pipeline LimeZu :

| Script | Rôle |
|--------|------|
| `render.py` | **Compositeur PIL** — convertit `recipes/test_X.py` en PNG (workflow obligatoire : render → Read → critique) |
| `render_debug.py` | Idem + grille rouge + coordonnées (debug visuel col/row) |
| `render_tmj.py` | Exporteur Tiled JSON (compatibilité TMJ) |
| `build_tilesheet.py` | Assemble spritesheet de synthèse depuis thèmes LimeZu |
| `build_tile_picker_data.py` | Indexe 9811 tiles catégorisées (Rue/Parc/Jardin/Maison/Forêt) pour `tile-picker.html` |
| `build_rondpoint_tmj.py` | Générateur rond-point spécialisé |
| `catalog_families.py` | Planches-contact par famille (2220 familles, 6222 variants) |
| `catalog_sheet.py` | Anciennes planches (remplacé par `catalog_families`) |
| `compare_sidewalk_styles.py` | Comparaison 6 styles Sidewalk côte à côte → PNG |
| `compare_tilesets.py`, `compare_tilesets_final.py`, `compare_tilesets_rotation.py`, `compare_tilesets_shifted.py`, `compare_tilesets_swap.py` | Outils de comparaison tilesets (legacy, debug) |
| `export_recipes_to_js.py` | Export format Python → JavaScript (patterns.js) |
| `import_themes.py` | Importe LimeZu Theme Sorter (24 thèmes) → `studio/max-adventure/public/assets/tiles/` |
| `inventory.py` | Indexation legacy (3563 tiles + dimensions natives) |
| `index_asphalt.py` | Planches zoomées Asphalt (legacy) |
| `zoom_index.py` | Zooms génériques (legacy) |
| `make_catalog_sheets.py` | Planches legacy globales (remplacé) |
| `recolor_house.py` | Utilitaire recoloration maison ad-hoc |

**Workflow obligatoire** : écrire `recipes/test_X.py` → `python render.py recipes/test_X.py` → Read PNG → critique → itérer. Détail : [`site/tile-tools/README.md`](../../site/tile-tools/README.md).

---

## Mini-jeu kids du tileset

[`site/mj-pose-tiles.html`](../../site/mj-pose-tiles.html) 🦺🚧 — **Pose-tes-tiles**, mini-jeu petit ouvrier où Max choisit ses pièces parmi 5 catégories simples (Rue, Parc, Jardin, Maisons, Forêt) et construit sa ville sur une grille 8×8. Bouton 🦺 "Lisser" qui pose automatiquement les bords trottoir autour de l'asphalte. Persistence localStorage.

---

## Pôle voisin

NARRATION : [`../narration/INDEX.md`](../narration/INDEX.md) — univers narratif (post-Phase 4).
DINO (transverse, code dans site/) : [`../dino/INDEX.md`](../dino/INDEX.md).

---

_Créé 2026-04-30 dans la refonte arborescence. Refonte 2026-05-13 : harmonisation Game ↔ Narration. MAJ 2026-06-04 : réalignement post-migration site/+studio/ (carte + labels web/→site/, phaser/→studio/max-adventure/)._
