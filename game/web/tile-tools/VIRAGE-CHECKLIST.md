# Checklist virage (gravée 2026-05-11, validation visuelle Papa Yann)

## Règles strictes pour TOUT virage

1. **Route touche les bords** : la chaussée entre par un bord du canvas et sort par un autre.
2. **Bordures route uniquement** : `sw_4` (W) / `sw_6` (N) / `sw_8` (E) / `sw_2` (S) **collées** à la chaussée.
3. **Pivot asphalte** au coude : `asph_1` (SE) / `asph_3` (SW) / `asph_5` (NW) / `asph_7` (NE).
4. **INT trottoir** au coin intérieur du L : `sw_1`/`sw_3`/`sw_5`/`sw_7` (selon quadrant intérieur).
5. **EXT trottoir** au coin extérieur du L : `sw_11`/`sw_12`/`sw_13`/`sw_14` (selon quadrant extérieur).
6. **Pas de trottoir `sw_9` inutile** autour du virage. Toutes les cellules hors-L = **`None`**. Le transparent sera rempli plus tard par parc/immeuble/etc.
7. **Canvas size = bbox du L strict**, pas de rangée/colonne entièrement `None`.

## Verbe interdit : « marge trottoir »

S'il n'y a pas de route ou de bordure dedans, c'est `None`. Point.

## Mapping tiles par direction du L

Le L a 4 orientations (où est le coude) :

| Pivot du L situé en… | Coin intérieur (INT) | Coin extérieur (EXT) | Pivot asphalte | Sens du L |
|--|--|--|--|--|
| **bas-droite** du canvas | NW (`sw_5`) | SE (`sw_12`) | NW (`asph_5`) | descendante en haut, branche OUEST en bas |
| **bas-gauche** du canvas | NE (`sw_7`) | SW (`sw_11`) | NE (`asph_7`) | descendante en haut, branche EST en bas |
| **haut-droite** du canvas | SW (`sw_3`) | NE (`sw_14`) | SW (`asph_3`) | branche OUEST en haut, descendante en bas |
| **haut-gauche** du canvas | SE (`sw_1`) | NW (`sw_13`) | SE (`asph_1`) | branche EST en haut, descendante en bas |

⚠️ **À switcher ⑤↔⑥ selon retour Papa Yann 2026-05-11** : `sw_11` et `sw_12` peuvent être à confirmer visuellement.

## Mes 4 virages projet

- **③ virage_gauche** (route arrive du haut, tourne à gauche → ouest)
  - Pivot en **haut-droite** du canvas
  - Branche horizontale OUEST en haut, descendante en bas
- **④ virage_droit** (route arrive du haut, tourne à droite → est)
  - Pivot en **haut-gauche** du canvas
  - Branche horizontale EST en haut, descendante en bas
- **⑤ virage_haut_gauche** (route arrive du haut, tourne à gauche en bas → ouest)
  - Pivot en **bas-droite** du canvas
  - Branche descendante en haut, branche OUEST en bas
  - ⭐ Composition Papa Yann tile-picker 2026-05-11
- **⑥ virage_haut_droit** (route arrive du haut, tourne à droite en bas → est)
  - Pivot en **bas-gauche** du canvas
  - Branche descendante en haut, branche EST en bas

## Procédure de validation par virage

1. Render → PNG
2. Auto-check : la route touche 2 bords ? Bordures correctes ? Pivot OK ? INT/EXT au bon endroit ? Tout le reste = `None` ?
3. Présenter à Papa Yann via playground
4. Si pas OK → noter le retour + corriger
