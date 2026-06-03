---
name: Recherches & inspirations tile-tools
description: Capitalisation du deepsearch 2026-05-11 sur outils, algos et patterns externes pour pipeline pixel-map LimeZu MaxPlay
type: reference
---

# Recherches & inspirations tile-tools

**Source :** deepsearch Papa Yann demandé le 2026-05-11.
**But :** ne pas perdre les pistes externes même si on choisit de rester dans notre stack Python.
**Décision finale prise ce jour :** rester sur Python + créer `vocab.py` + macros haut-niveau (voir [`PIPELINE-MEMORY.md`](PIPELINE-MEMORY.md) et BACKLOG EP-VOCAB). Ce fichier est **archivistique** — pour ressortir une option plus tard si on veut.

---

## TL;DR du deepsearch

3 trouvailles externes qui pourraient inspirer (mais qu'on **n'adopte pas tout de suite**) :

1. **Dual Tilemap autotiling (Excalibur.js)** — 5 tiles composables au lieu de 47, offset half-tile, transitions T/croix/coin "just work". Le plus élégant conceptuellement.
2. **LDtk (open source, ex-Dead Cells)** — éditeur 2D visuel avec Auto-layers (règles visuelles → placement auto des tiles). Export JSON well-documented → import Phaser direct.
3. **Bitmask 47-tiles (Wang tiles classique)** — encodage 8 voisins en nombre binaire, lookup table → tile correcte choisie automatiquement.

**Pourquoi on n'adopte pas tout de suite** : LimeZu n'est PAS conçu comme un set d'auto-tile (ses tiles d'asphalte sont des variations stylistiques, pas des rôles bitmask). Adopter ces algos demanderait un effort de cartographie 47 tiles "rôles" qui n'existent pas tels quels dans LimeZu. À explorer plus tard si le besoin arrive.

---

## Ressources externes (catalogue)

### Auto-tile & bitmask

| Ressource | URL | Pertinence pour nous |
|-----------|-----|----------------------|
| **Dual Tilemap Autotiling** (Excalibur.js) | https://excaliburjs.com/blog/Dual%20Tilemap%20Autotiling%20Technique/ | ⭐ Pattern le plus élégant. Si un jour on étend à de la nature (herbe ↔ terre ↔ eau) → revenir ici |
| Autotiling Technique (bitmask 8-voisins) | https://excaliburjs.com/blog/Autotiling%20Technique/ | Référence classique, lookup-table bitmask → coordonnées tile |
| How to Use Tile Bitmasking (Envato) | https://code.tutsplus.com/how-to-use-tile-bitmasking-to-auto-tile-your-level-layouts--cms-25673t | Intro pédagogique, schémas clairs |
| Tilemap bitmasking (Chris Hammond) | https://chrishammond.ca/2018/09/tilemap-bitmasking/ | Implémentation pas-à-pas |
| odin-tilemap-collision (ChrisPHP) | https://github.com/ChrisPHP/odin-tilemap-collision | Exemple code bitmask + collision |
| UnityTilemapTileBitmask (MattouBatou) | https://github.com/MattouBatou/UnityTilemapTileBitmask | Implémentation Unity |
| Wang tiles procedural (Dykeman) | https://ijdykeman.github.io/ml/2017/10/12/wang-tile-procedural-generation.html | Théorie + implémentation |

### Éditeurs visuels (alternatives à coder à la main)

| Outil | URL | Pertinence |
|-------|-----|------------|
| **LDtk** (Deepnight, ex-Dead Cells) | https://ldtk.io/ + https://github.com/deepnight/ldtk | ⭐ Open source, supporte LimeZu via tileset 16×16 standard. Auto-layers rules = définir des règles visuelles ("si je peins ROUTE, place tels tiles"). Export JSON well-documented, Phaser-compatible via JSON parsing |
| LDtk → Phaser loading docs | https://ldtk.io/docs/game-dev/loading/ | Comment importer JSON LDtk en Phaser |
| Tiled mapeditor | https://www.mapeditor.org/ + https://github.com/mapeditor/tiled | Éditeur historique, C++/Qt, exporte JSON/TMX |
| PixLab Tilemap Editor | https://pixlab.io/tilemap-2d-level-editor | Browser-based |

### Phaser 3 + tilemaps (utile pour max-adventure)

| Ressource | URL | Pertinence |
|-----------|-----|------------|
| **mikewesthad/phaser-3-tilemap-blog-posts** | https://github.com/mikewesthad/phaser-3-tilemap-blog-posts | ⭐ Tutoriel Pokemon-style top-down, série complète. Référence pour Phase 2 WexWorld |
| Modular Game Worlds in Phaser 3 #1 (Hadley) | https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6 | Article de référence |
| Loading TileMaps in Phaser 3 + JSON | https://phasergames.com/loading-tilemaps-in-phaser-3-and-json/ | Pratique |
| A Noob's Guide to Loading Tiled Tilemaps in Phaser 3 (Ourcade) | https://blog.ourcade.co/posts/2020/phaser-3-noob-guide-loading-tiled-tilemaps/ | Pratique, bien expliqué |
| GameDev Academy : HTML5 Phaser + Tiled | https://gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/ | Tuto end-to-end |
| englercj/phaser-tiled | https://github.com/englercj/phaser-tiled | Plugin Phaser pour maps Tiled larges |

### Algos procéduraux (curiosité, plutôt Phase 2)

| Ressource | URL | Pertinence |
|-----------|-----|------------|
| **mxgmn/WaveFunctionCollapse** | https://github.com/mxgmn/WaveFunctionCollapse | ⭐ Algo phare, exemples C#, ports dans toutes les langues. Townscaper / Bad North l'utilisent |
| Procedural Generation with WFC (Gridbugs) | https://www.gridbugs.org/wave-function-collapse/ | Article didactique |
| Wave Function Collapse (Jaxry) | https://jaxry.github.io/wave-function-collapse/ | Démo interactive |
| WFC (Excalibur.js) | https://excaliburjs.com/blog/Wave%20Function%20Collapse/ | Implémentation pour Excalibur |
| CodingTrain WFC | https://github.com/CodingTrain/Wave-Function-Collapse | Implémentation pédagogique |
| drippls/MapGeneration | https://github.com/drippls/MapGeneration | Python OpenSimplex 2D tiles |
| WaveFunctionCollapseEditor (jsmars) | https://github.com/jsmars/WaveFunctionCollapseEditor | GUI WFC |

### Pokemon / town generator (références style top-down 4-5 ans)

| Ressource | URL | Pertinence |
|-----------|-----|------------|
| Peter Hajas Pokemon Map Generator | https://www.peterhajas.com/blog/pokemon_map_generator/ | Python qui parse `pokered` repo et génère des cartes |
| gdbroman/tile-game | https://github.com/gdbroman/tile-game | Pokemon-inspired tilemap generator PyGame |
| VictoriaDerks/tilemap-game | https://github.com/VictoriaDerks/tilemap-game | Tile-based PyGame Pokemon + VN |
| Data Analysis Pokemon towns (Frewin) | https://chrisfrew.in/blog/data-analysis-and-pixel-art-of-towns-and-cities-in-pokemon/ | Analyse pixel art des villes Pokemon |
| Screen Smith Pokemon Map Gen | https://screensmith.itch.io/pokemon-style-map-generator | Outil prêt à l'emploi (itch.io) |

### AI / LLM-assisted (curiosité)

| Ressource | URL | Pertinence |
|-----------|-----|------------|
| mxmarchal/pixel-llm | https://github.com/mxmarchal/pixel-llm | Pixel art via LLM (WebGPU + OpenAI + local Ministral 3B). Auteur lui-même dit "small local models don't work great" |
| charmed-ai/tilemapgen | https://github.com/charmed-ai/tilemapgen | Génération tiles isométriques via Stable Diffusion |
| ljvmiranda 'Draw me a swordsman' | https://ljvmiranda921.github.io/notebook/2025/07/20/draw-me-a-swordsman/ | Tool-calling LLMs pour dessiner du pixel art |
| awesome-ai-tools-for-game-dev | https://github.com/simoninithomas/awesome-ai-tools-for-game-dev | Curation outils IA gamedev |
| Yuan-ManX/ai-game-devtools | https://github.com/Yuan-ManX/ai-game-devtools | Hub AI tools gamedev |

### LimeZu officiel

| Ressource | URL | Pertinence |
|-----------|-----|------------|
| LimeZu Modern Exteriors (itch.io) | https://limezu.itch.io/modernexteriors | Page asset officielle |
| LimeZu Resources Site | https://limezuweb.github.io/ (redirige vers limezu.art — actuellement down) | Doc officielle |
| LimeZu YouTube channel devlog (2026-01) | https://limezu.itch.io/modernexteriors/devlog/1290471/happy-new-year-youtube-channel | Annonce tutos YouTube |
| LimeZu GameDevMarket profile | https://www.gamedevmarket.net/member/limezu | Profil créateur |
| LimeZu itch.io profile | https://limezu.itch.io/ | Tous les tilesets de l'auteur |

### Outils Python génération tile (notre stack)

| Ressource | URL | Pertinence |
|-----------|-----|------------|
| Image Mosaics with Python (Aaron Grove) | https://medium.com/@aarongrove/creating-image-mosaics-with-python-8e4c25dd9bf9 | Pillow + numpy + scipy patterns |
| Image Mosaics with Python (Ryan Kelly) | http://blog.ryankelly.us/2017/01/02/image-mosaics-with-python.html | Pratique |
| Tiling the plane with Pillow (alexwlchan) | https://alexwlchan.net/2016/tiling-the-plane-with-pillow/ | Notre cas d'usage |
| Static maps with OpenStreetMap + Pillow (alexwlchan, 2025) | https://alexwlchan.net/2025/static-maps/ | Pertinent : composition d'images |
| colinhumber/6203665 (gist) | https://gist.github.com/colinhumber/6203665 | Tile set generator avec transparence |
| Easy-Peasy AI Tile Map | https://easy-peasy.ai/ai-image-generator/images/can-you-create-me-e6ebc0e2-d922-4cd7-a878-e171f800492c | Service en ligne |
| Pillow Wallpapers (alexwlchan) | https://alexwlchan.net/2016/wallpapers-with-pillow/ | Compositions Pillow |

### Tilesets alternatifs (référence visuelle)

| Tileset | URL | Pertinence |
|---------|-----|------------|
| LPC Revised 4-Seasons | https://opengameart.org/content/lpc-revised-fully-configured-4-seasons-tilesets-for-tiled-map-editor | Tileset OpenGameArt déjà configuré pour Tiled |
| RPG_Maker_MZ_LPC_Starter_Kit (Gaurav0) | https://github.com/Gaurav0/RPG_Maker_MZ_LPC_Starter_Kit | LPC + Tiled starter |
| Toolset Highlight: Tiled (LPC) | https://lpc.opengameart.org/content/toolset-highlight-tiled | Article LPC |
| Cainos Pixel Art Top Down Basic | https://cainos.itch.io/pixel-art-top-down-basic | Alternative à LimeZu (style différent) |
| CraftPix Top-Down Tilesets | https://craftpix.net/categorys/top-down-tilesets/ | Marketplace |
| Modern Interiors (LimeZu) | https://limezu.itch.io/moderninteriors | Pendant intérieur de Modern Exteriors |

---

## Concepts retenus (à ressortir si besoin)

### 1. Bitmask autotile (4-bit ou 8-bit)

**Idée** : chaque tile regarde ses voisins (N/E/S/W ± diagonales), encode l'état en un nombre binaire, lookup table → tile correcte.

**4-bit (Marching Squares)** : 4 voisins N/E/S/W → 2^4 = 16 tiles minimum.
**8-bit (full bitmask)** : 8 voisins → 256 combinaisons mais réduites à 47 cas uniques par symétrie.

**Code-pattern (TypeScript, Excalibur)** :
```typescript
const neighborOffsets = [[1,1], [0,1], [-1,1], [1,0], [-1,0], [1,-1], [0,-1], [-1,-1]];

function getBitmask(map, index, outofbound) {
  let bitmask = 0;
  for (let i = 0; i < 8; i++) {
    const [dx, dy] = neighborOffsets[i];
    // ... check if neighbor is solid
    if (neighborIsSolid) bitmask |= 1 << i;
  }
  return bitmask;
}
// Lookup: tilebitmask[bitmask] → [tileX, tileY]
```

**Pour nous** : transposable en Python si on en a besoin pour de la nature (herbe/terre/eau). Pour route LimeZu : pas direct car LimeZu n'a pas les 47 tiles "rôles" — il a des variations stylistiques.

### 2. Dual Tilemap (5 tiles + offset)

**Idée** : 2 tilemaps superposés.
- **World** : la logique (route ici, herbe là, 1 tile par cellule)
- **Graphics** : 5 tiles composables, offset half-tile (-8,-8), regarde les 4 coins du tile world.

**Algo (pseudocode)** :
```
grassCount = nombre de coins voisins en "grass"

if grassCount == 0 : null
if grassCount == 1 : corner piece (rotation selon coin)
if grassCount == 2 : edge si adjacents, opposite si diagonal
if grassCount == 3 : inner corner (rotation selon coin manquant)
if grassCount == 4 : filled
```

**Pour nous** : très élégant. Si un jour on cartographie 5 tiles "rôles" LimeZu pour l'herbe (coin / edge / opposite / inner-corner / filled), on pourrait l'implémenter. Pas pour route (LimeZu ≠ 5 rôles).

### 3. Auto-layers rules (LDtk)

**Idée** : dans un éditeur visuel, tu peins en IntGrid des valeurs (1 = route, 2 = herbe), et tu définis des **règles** : "si la cellule = 1 ET le voisin N = 1 ET le voisin S = 1, place tile X". L'éditeur paint automatiquement.

**Pour nous** : c'est l'outil idéal mais demande d'installer LDtk + configurer les rules. À envisager si un jour le `vocab.py` Python devient insuffisant.

---

## Décisions tracées

| Date | Décision | Raison |
|------|----------|--------|
| 2026-05-11 | Rester sur Python + créer `vocab.py` + macros | Pas d'outil tiers, pas d'achat, exploite notre cartographie existante, attaque la vraie cause des erreurs (info éparpillée, conflits doc) |
| 2026-05-11 | Archiver les inspirations externes ici | Ne pas perdre la matière du deepsearch, pouvoir y revenir si besoin |
| 2026-05-11 | Marquer LDtk comme **option Phase 3** | Si vocab.py + macros plafonnent, LDtk est le pivot le plus crédible |

---

**Source de cette synthèse** : Claude Code (deepsearch 2026-05-11), 8 requêtes WebSearch + 3 WebFetch, validé par Papa Yann.
