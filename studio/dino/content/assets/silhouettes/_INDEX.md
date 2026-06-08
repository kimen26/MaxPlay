# Banque de silhouettes dino — assets jeux

> **215 silhouettes** noires détourées (PNG fond transparent, recolorables en jeu), extraites de 9 planches SVG.
> Pipeline : render Chromium → découpe grille → seuillage → détourage bbox → despeckle (préserve multi-parties).
> Sources archivées dans [`_sources/`](_sources/). Généré 2026-06-09.

## Rangement par famille

| Dossier | Nb | Contenu |
|---------|----|---------|
| [`theropode/`](theropode/) | 56 | carnivores bipèdes, raptors, allosaures, spinosaures (dos voilé) |
| [`trex/`](trex/) | 40 | tyrannosaures (grosse tête, petits bras, posture massive) |
| [`sauropode/`](sauropode/) | 44 | cous longs : brachiosaure, diplodocus, brontosaure, apatosaure |
| [`stegosaure/`](stegosaure/) | 17 | plaques dorsales |
| [`ankylosaure/`](ankylosaure/) | 8 | cuirassés, massue de queue |
| [`ceratopsien/`](ceratopsien/) | 20 | **🦕 Tritri** — tricératops (collerette + cornes) |
| [`hadrosaure/`](hadrosaure/) | 12 | becs-de-canard, parasaurolophus (crête) |
| [`pterosaure/`](pterosaure/) | 11 | reptiles volants (ptéranodon) |
| [`divers/`](divers/) | 7 | **non-dinos** (voir détail ci-dessous) |
| **Total** | **215** | |

## Convention de nommage

- `famille-sNNrRcC.png` → source **sheet NN**, **ligne R**, **colonne C** (traçabilité vers le SVG d'origine).
- Sheet 01 (`-v2`) = noms descriptifs hérités (`sauropode-brachiosaure-01.png`, etc.).
- `divers/` = noms explicites (`divers-plesiosaure-01.png`, `divers-squelette-trex-01.png`…).

## Dossier `divers/` (non-dinos)

| Fichier | Quoi |
|---------|------|
| `divers-plesiosaure-01/02.png` | reptiles marins (cou long, nageoires) — **pas des dinos** |
| `divers-plante-01/02.png` | fougères / végétation |
| `divers-squelette-trex-01.png` | squelette T-rex (style contour) |
| `divers-squelette-ankylosaure-01.png` | squelette ankylosaure (style contour) |
| `divers-empreintes-01.png` | paire d'empreintes de pas |

## ⚠️ À savoir

- **Famille = fiable** (lisible depuis silhouette). **Espèce = approximative** → à valider (`dino-conseiller`) avant usage pédagogique nommé (« ça c'est un brachiosaure »).
- **Tritri dispo** : `ceratopsien/` contient 20 tricératops → de quoi faire le doudou de Max. `ceratopsien-s03r5c3.png` est douteux (juste une collerette).
- **Doublons & variantes de style** nombreux entre planches (même espèce, poses/styles différents : plein, contour, mignon, réaliste) — normal, utile pour varier en jeu.
- **Spinosaures à dos voilé** classés dans `theropode/` ; quelques dimétrodons (non-dinos sprawlers) ont pu y tomber aussi → à trier si besoin.

## Usage en jeu

`manifest.json` liste tout par famille → le code peut piocher aléatoirement par famille (ex. quiz « trouve le tricératops »).
