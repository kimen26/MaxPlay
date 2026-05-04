# tile-tools — pipeline LimeZu pour MaxPlay

Outils Python pour explorer, indexer, composer et valider des tiles LimeZu Modern Exteriors.

**Skill associé** : [`~/.claude/skills/maxplay-tiles/SKILL.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/SKILL.md) + [`LESSONS.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/LESSONS.md)

---

## Structure

```
tile-tools/
├── README.md
├── cartography.json + .js     ← rôle de chaque tile Asphalt_1 / Sidewalk_1
├── patterns.json   + .js     ← recettes validées (route, virages, parking…)
├── scripts/                   ← outils Python (render, import, catalog…)
├── recipes/                   ← snippets Python validés + leurs PNG
├── families/                  ← planches-contact par famille (généré)
├── themes_overview/           ← 24 spritesheets globales (1/thème)
└── inspections/               ← PNG ad-hoc d'inspection (debug)
```

---

## Données indexées

| Fichier | Contenu |
|---------|---------|
| `inspections/_inventory.json` | 3563 tiles legacy avec dimensions natives |
| `families/_families_index.json` | **2220 familles, 6222 variants** depuis ME_Theme_Sorter (24 thèmes) |
| `cartography.json` + `.js` | Rôle visuel précis de chaque Asphalt_1 (27) et Sidewalk_1 (54) |
| `patterns.json` + `.js` | Recettes par cas d'usage |

Les `.js` sont des copies des `.json` chargées via `<script src>` (file:// bloque fetch).

---

## Scripts (`scripts/`)

| Script | Sortie |
|--------|--------|
| `render.py` | Compositeur PIL — `python scripts/render.py recipes/test_X.py` → PNG à côté |
| `import_themes.py` | Copie ME_Theme_Sorter → `game/phaser/public/assets/tiles/themes/<NN>/` + `_index.json` |
| `catalog_families.py` | Planches-contact par famille → `families/<theme>/<family>.png` |
| `compare_sidewalk_styles.py` | `compare_sidewalk_styles.png` — 6 styles Sidewalk côte à côte |
| `make_catalog_sheets.py` | 24 planches legacy (remplacé par `catalog_families.py`) |
| `inventory.py` | Génère `_inventory.json` (legacy) |
| `index_asphalt.py`, `zoom_index.py` | Anciennes planches zoomées |

---

## Workflow obligatoire

```
1. ÉCRIRE       recipes/test_X.py avec SNIPPET = {cols, rows, ground[][], objects[]}
2. RENDRE       python scripts/render.py recipes/test_X.py
3. LIRE         Read tool sur recipes/test_X.png
4. CRITIQUER    pixel par pixel
5. ITÉRER       jusqu'à propre
6. SOUMETTRE    afficher au user
7. CARTOGRAPHIER ajouter à patterns.json + régénérer patterns.js
```

---

## Recettes validées (`recipes/`)

| Recette | Fichier | Statut |
|---------|---------|--------|
| Route verticale 5 cols | `test_route_v_5cols.py` | ✅ validé |
| Route horizontale 5 rows | `test_route_h_5rows.py` | ✅ validé |
| Voie bus 2 voies | `test_voie_bus_v6.py` | ⏳ |
| Parking 2 rangées | `test_parking_v4.py` | ⏳ |
| Rond-point | `test_rond_point_v9.py` | ⏳ |
| Passage piéton vertical | `test_passage_pieton_route_v.py` | ⏳ |
| Passage piéton horizontal | `test_passage_pieton_route_h.py` | ⏳ |
| Virage NE/NW/SE/SW (11×11) | `test_virage_{ne,nw,se,sw}_v2.py` | ✅ validé |

---

## Vue navigable

Ouvrir [`../tile-library-v3.html`](../tile-library-v3.html) en double-clic — charge `cartography.js` + `patterns.js` et affiche tous les patterns avec PNG.
