"""Virage a GAUCHE - chaussee 5 cols, branches LONGUES, DOUBLE arrondi.

Conducteur arrive du SUD, tourne a gauche, sort par OUEST.
Coin EXTERIEUR NE = _14 (trottoir massif NE de la tile + arc descendant).
Coin INTERIEUR SW = _12 (trottoir au SW de la tile + arc concave NE).

CARTOGRAPHIE CORRIGEE 2026-05-08 (apres erreur _13 au lieu de _12) :
  _11 : trottoir au SE de la tile (petit) + arc concave NW
  _12 : trottoir au SW de la tile (petit) + arc concave NE  -> coin INT SW
  _13 : trottoir massif HAUT de la tile + arc descendant    -> coin EXT NW
  _14 : trottoir massif HAUT de la tile + arc descendant    -> coin EXT NE

Geometrie 24x18 :
  Branche OUEST : asphalte rows 6-8 cols 0-9 (10 cases avant pivot)
  Branche SUD   : asphalte rows 6-17 cols 6-8 (12 cases sous pivot)
  Pivot         : rows 6-8 cols 6-8 (3x3 asphalte plein)
  Coin EXT NE   : _14 en (col=9, row=5)
  Coin INT SW   : _12 en (col=5, row=9)
  Bord N        : sw_6 row=5 cols 0-8 (col 9 = _14)
  Bord E        : sw_8 col=9 rows 6-17 (row 5 = _14)
  Bord S OUEST  : sw_2 row=9 cols 0-4 (col 5 = _12)
  Bord W SUD    : sw_4 col=5 rows 10-17 (row 9 = _12)
"""

ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
TR   = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
ARC_INT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_12.png'  # coin INT SW : trottoir au SW + arc concave NE
ARC_EXT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_14.png'  # coin EXT NE : trottoir massif NE + arc

LINE_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'
LINE_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'

COLS, ROWS = 24, 18
ground = [[TR] * COLS for _ in range(ROWS)]

# Asphalte branche OUEST (rows 6-8, cols 0-9, jusqu'au pivot inclus)
for r in range(6, 9):
    for c in range(0, 10):
        ground[r][c] = ASPH
# Asphalte branche SUD (rows 6-17, cols 6-8)
for r in range(6, 18):
    for c in range(6, 9):
        ground[r][c] = ASPH

# Bords trottoir 1x1
# Bord N (cols 0-8, col 9 sera _14)
for c in range(0, 9):
    ground[5][c] = SW_N
# Bord E (rows 6-17, row 5 sera _14)
for r in range(6, 18):
    ground[r][9] = SW_E
# Bord S branche OUEST (cols 0-4, col 5 sera _13)
for c in range(0, 5):
    ground[9][c] = SW_S
# Bord W branche SUD (rows 10-17, row 9 sera _13)
for r in range(10, 18):
    ground[r][5] = SW_W

# Coins arrondis
ground[5][9] = ARC_EXT  # coin EXT NE
ground[9][5] = ARC_INT  # coin INT SW

# Lignes pointillees centrales
objects = []
for r in range(10, 18):
    objects.append((7, r, LINE_V))  # branche SUD axe
for c in range(0, 5):
    objects.append((c, 7, LINE_H))  # branche OUEST axe

SNIPPET = {
    'name': 'virage_gauche',
    'cols': COLS,
    'rows': ROWS,
    'ground': ground,
    'objects': objects,
}
