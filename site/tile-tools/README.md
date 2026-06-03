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
| Rond-point | `test_rond_point_v9.py` | ⏳ centrage corrigé 2026-05-08 |
| Passage piéton vertical (sans rebord) | `test_passage_pieton_route_v.py` | ⏳ corrigé 2026-05-08 |
| Passage piéton horizontal (sans rebord) | `test_passage_pieton_route_h.py` | ⏳ corrigé 2026-05-08 |
| Virage gauche route 5 cols (double arrondi) | `test_virage_gauche.py` | ⏳ en cours |

---

## Outils HTML (à ouvrir en double-clic, file:// supporté)

| Page | Rôle |
|------|------|
| [`../tools/index.html`](../tools/index.html) | 🆕 **Hub Tools** (point d'entrée unique des outils de design). |
| [`../tools/tile-library-v3.html`](../tools/tile-library-v3.html) | **Vue navigable** des patterns + cartographie. Charge `patterns.js` et affiche chaque pattern avec PNG, tiles requises, layout. |
| [`../tools/tile-picker.html`](../tools/tile-picker.html) | **Bibliothèque visuelle catégorisée** (Rue/Parc/Jardin/Building/Forêt) + matrice 10×10 drag&drop. ~3500 tiles indexés (roads, parks, buildings, props, stations), export Python à coller dans une recette. **À utiliser quand l'agencement n'est pas évident** — le user compose, l'agent transcrit. |
| [`../mj-pose-tiles.html`](../mj-pose-tiles.html) | 🦺🚧 **Mini-jeu Pose-tes-tiles** (kids) - version simplifiée du tile-picker pensée pour Max. 8×8, palette réduite, bouton "Lisser" auto-bords. |

---

## Outils de scripts complémentaires

| Script | Rôle |
|--------|------|
| `scripts/render.py` | Render PIL → PNG d'une recipe |
| `scripts/render_debug.py` | Idem + grille rouge + coordonnées col/row jaune (debug visuel) |
| `scripts/catalog_families.py` | Planches-contact par famille |
| `scripts/import_themes.py` | Import LimeZu Theme Sorter |
