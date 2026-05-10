"""Virage HAUT-DROIT (NORD->EST) - 10x10. Version PROPRE 2026-05-10.

Double miroir du virage gauche.
Coin EXT SW : Sidewalk_1_11. Coin INT NE : Sidewalk_1_7.
"""

TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
EXT_SW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_11.png'
INT_NE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_7.png'
DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'
DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'
PIVOT_L = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_7.png'  # coin L NE

COLS, ROWS = 10, 10
ground = [[TROTTOIR] * COLS for _ in range(ROWS)]

# Branche NORD : cols 3-5 rows 1-6 (sw_W col 3, asph col 4, sw_E col 5)
for r in range(1, 6):
    ground[r][3] = SW_W
    ground[r][4] = DASH_V
    ground[r][5] = SW_E

# Pivot row 6 : sw_W + asphalte + INT_NE
ground[6][3] = SW_W
ground[6][4] = DASH_V
ground[6][5] = INT_NE

# Branche EST (horizontale a droite) :
#   row 6 (N branche EST) : sw_N cols 6-9 (apres INT_NE col 5)
#   row 7 (asphalte) : sw_W col 3, PIVOT_L col 4, DASH_H cols 5-9
#   row 8 (S branche EST) : EXT_SW col 3, sw_S cols 4-9
for c in range(6, 10):
    ground[6][c] = SW_N

ground[7][3] = SW_W
ground[7][4] = PIVOT_L
for c in range(5, 10):
    ground[7][c] = DASH_H

ground[8][3] = EXT_SW
for c in range(4, 10):
    ground[8][c] = SW_S

SNIPPET = {'name': 'virage_haut_droit', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
