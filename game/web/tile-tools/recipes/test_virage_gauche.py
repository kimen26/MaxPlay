"""Virage a GAUCHE (SUD->OUEST) - 10x10. Version PROPRE 2026-05-10.

Trottoirs : Sidewalk_1_9 uniquement (plain net, pas de motifs).
Marquage centre : Asphalt_1_Variation_8 (V propre) + Variation_14 (H propre).
Coin EXT NE : Sidewalk_1_14 (gros arc trottoir NE).
Coin INT SW : Sidewalk_1_3 (petit triangle trottoir SW).
Bords : Sidewalk_1_2/_4/_6/_8 (bords trottoir N/S/W/E).

Geometrie :
  Branche OUEST (route H) : rows 1-3, cols 0-4
  Branche SUD (route V)   : cols 4-5, rows 3-7
"""

# === Tiles ===
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
EXT_NE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_14.png'  # coin EXT
INT_SW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_3.png'   # coin INT
ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'  # plain
DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'  # marquage V propre
DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png' # marquage H propre
PIVOT_L = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_3.png' # coin L SE pour pivot

COLS, ROWS = 10, 10

# Init avec trottoir partout
ground = [[TROTTOIR] * COLS for _ in range(ROWS)]

# === Branche OUEST : rows 1-3, cols 0-4 ===
# row 1 : sw_N (bord N) cols 0-4
# row 2 : asph + marquage centre H cols 0-4 (sauf au pivot)
# row 3 : sw_S (bord S) cols 0-2 + INT_SW en col 3 + asph col 4

# Bord N branche OUEST + coin EXT NE en (col=5, row=1)
for c in range(0, 5):
    ground[1][c] = SW_N
ground[1][5] = EXT_NE

# Asphalte branche OUEST row=2, cols 0-5 (jusqu'au pivot inclus)
for c in range(0, 5):
    ground[2][c] = DASH_H  # marquage H propre
ground[2][4] = PIVOT_L     # coin L SE au pivot
ground[2][5] = SW_E        # bord E pivot/branche SUD

# Bord S branche OUEST row=3, cols 0-2 (jusqu'au coin INT SW)
for c in range(0, 3):
    ground[3][c] = SW_S
ground[3][3] = INT_SW      # coin INT en (col=3, row=3)
ground[3][4] = DASH_V      # asphalte centrale branche SUD
ground[3][5] = SW_E        # bord E branche SUD

# === Branche SUD : col 4 (asphalte), col 5 (bord E), col 3 (bord W) ===
# La branche descend jusqu'au bord du canvas (row 9 = derniere row)
for r in range(4, 10):
    ground[r][3] = SW_W    # bord W branche SUD
    ground[r][4] = DASH_V  # marquage V propre
    ground[r][5] = SW_E    # bord E branche SUD

SNIPPET = {'name': 'virage_gauche', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
