"""Virage a DROITE (SUD->EST) - 10x10. Version PROPRE 2026-05-10.

Miroir horizontal du virage gauche.
Coin EXT NW : Sidewalk_1_13. Coin INT SE : Sidewalk_1_1.
"""

TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
EXT_NW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_13.png'  # coin EXT
INT_SE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_1.png'   # coin INT
DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'
DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'
PIVOT_L = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_1.png'  # coin L SW

COLS, ROWS = 10, 10
ground = [[TROTTOIR] * COLS for _ in range(ROWS)]

# Branche EST : rows 1-3, cols 5-9 (miroir horizontal de la gauche)
ground[1][4] = EXT_NW
for c in range(5, 10):
    ground[1][c] = SW_N

ground[2][4] = SW_W
ground[2][5] = PIVOT_L
for c in range(6, 10):
    ground[2][c] = DASH_H

ground[3][4] = SW_W
ground[3][5] = DASH_V
ground[3][6] = INT_SE
for c in range(7, 10):
    ground[3][c] = SW_S

# Branche SUD : col 4 (sw_W), col 5 (asphalte), col 6 (sw_E)
for r in range(4, 8):
    ground[r][4] = SW_W
    ground[r][5] = DASH_V
    ground[r][6] = SW_E

SNIPPET = {'name': 'virage_droit', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
