"""Virage HAUT-GAUCHE (NORD->OUEST) - 10x10. Version PROPRE 2026-05-10.

Miroir vertical du virage gauche.
Coin EXT SE : Sidewalk_1_12. Coin INT NW : Sidewalk_1_5.
"""

TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
EXT_SE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_12.png'
INT_NW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_5.png'
DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'
DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'
PIVOT_L = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_5.png'  # coin L NW

COLS, ROWS = 10, 10
ground = [[TROTTOIR] * COLS for _ in range(ROWS)]

# Branche NORD (verticale en haut) : col 4-5, rows 0-5
for r in range(0, 4):
    ground[r][3] = SW_W
    ground[r][4] = DASH_V
    ground[r][5] = SW_E

# Pivot row 4 : INT NW + asphalte + sw_E
ground[4][3] = INT_NW
ground[4][4] = DASH_V    # axe asphalte continue (jonction au pivot)
ground[4][5] = SW_E

# Branche OUEST (horizontale a gauche) : row 5, cols 0-4
ground[5][0] = SW_W   # bord W debut branche... non, rows 5 = asphalte horiz
# Refonte : branche OUEST = rows 4-6 cols 0-5
# row 4 : sw_N en cols 0-3 + INT_NW col 3 ? non, _5 est INT_NW pose en (col=3, row=4)
# Reprenons proprement avec bords symetriques au virage_gauche flippe verticalement.
# Virage gauche : EXT en (5,1), INT en (3,3), branche OUEST rows 1-3 cols 0-4, branche SUD rows 3-7 cols 4-5
# Virage haut-gauche (miroir V) : EXT en (5,8), INT en (3,6), branche OUEST rows 6-8 cols 0-4, branche NORD rows 1-6 cols 4-5

# Reset
ground = [[TROTTOIR] * COLS for _ in range(ROWS)]

# Branche NORD : col 4-5 rows 1-6 (3 = sw_W col, 4 = asph, 5 = sw_E col)
for r in range(1, 6):
    ground[r][3] = SW_W
    ground[r][4] = DASH_V
    ground[r][5] = SW_E

# Pivot row 6 : INT_NW en (3,6) + asphalte + sw_E
ground[6][3] = INT_NW
ground[6][4] = DASH_V
ground[6][5] = SW_E

# Branche OUEST : row 7 (asph + dashH) + sw_N row 6 cols 0-2 + sw_S row 8 cols 0-5
# Recap voisinages :
#   row 6 (cote N de la branche OUEST) : sw_N pour cols 0-2, INT_NW en col 3, DASH_V en col 4, SW_E col 5
#   row 7 (asphalte branche OUEST) : DASH_H cols 0-3, PIVOT_L en col 4, SW_E col 5
#   row 8 (cote S de la branche OUEST) : sw_S cols 0-4, EXT_SE en col 5, trottoir cols 6+
for c in range(0, 3):
    ground[6][c] = SW_N
for c in range(0, 4):
    ground[7][c] = DASH_H
ground[7][4] = PIVOT_L  # coin L NW (asphalt _5) au pivot
ground[7][5] = SW_E
for c in range(0, 5):
    ground[8][c] = SW_S
ground[8][5] = EXT_SE

SNIPPET = {'name': 'virage_haut_gauche', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
