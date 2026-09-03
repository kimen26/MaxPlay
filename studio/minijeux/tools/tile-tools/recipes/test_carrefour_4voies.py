"""Carrefour 4 voies (croix +) - 12x12.
Route H rows 5-7 + Route V cols 5-7. Trottoirs aux 4 coins externes
avec coins EXT (gros arcs) + coins INT autour de la chaussee centrale.

Schema :
  - 4 quadrants de trottoir aux coins (cols 0-4 + cols 8-11)
  - 4 coins INT autour du carrefour central (cols 5,7 et rows 5,7)
  - Pas de pointillee centrale au pivot car 4 directions
"""

ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'   # V propre
DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'  # H propre
CROIX = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_13.png'  # + croisement central
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
INT_NE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_7.png'
INT_NW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_5.png'
INT_SE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_1.png'
INT_SW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_3.png'

COLS, ROWS = 12, 12

ground = [[TROTTOIR] * COLS for _ in range(ROWS)]

# Asphalte H (rows 5-6) cols 0-11
for r in range(5, 7):
    for c in range(COLS):
        ground[r][c] = ASPH
# Asphalte V (cols 5-6) rows 0-11
for r in range(ROWS):
    for c in range(5, 7):
        ground[r][c] = ASPH

# Pointillee H dashee (row 5, cols 0-4 et cols 7-11) - pas dans le pivot
for c in list(range(0, 5)) + list(range(7, 12)):
    ground[5][c] = DASH_H
# Pointillee V dashee (col 5, rows 0-4 et rows 7-11)
for r in list(range(0, 5)) + list(range(7, 12)):
    ground[r][5] = DASH_V

# Bords trottoir 1×1 autour des branches
# Branche OUEST (rows 5-6, cols 0-4) : bord N row 4, bord S row 7 (cols 0-4)
for c in range(0, 5):
    ground[4][c] = SW_N
    ground[7][c] = SW_S
# Branche EST (rows 5-6, cols 7-11) : bord N row 4, bord S row 7 (cols 7-11)
for c in range(7, 12):
    ground[4][c] = SW_N
    ground[7][c] = SW_S
# Branche NORD (cols 5-6, rows 0-4) : bord W col 4, bord E col 7 (rows 0-4)
for r in range(0, 5):
    ground[r][4] = SW_W
    ground[r][7] = SW_E
# Branche SUD (cols 5-6, rows 7-11) : bord W col 4, bord E col 7 (rows 7-11)
for r in range(7, 12):
    ground[r][4] = SW_W
    ground[r][7] = SW_E

# 4 coins INT au pivot (autour du centre carrefour)
ground[4][4] = INT_NW   # coin NW : trottoir au NW de la tile
ground[4][7] = INT_NE   # coin NE
ground[7][4] = INT_SW   # coin SW
ground[7][7] = INT_SE   # coin SE

# Croix au centre du croisement (signale l'intersection)
ground[5][5] = CROIX

SNIPPET = {'name': 'carrefour_4voies', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
