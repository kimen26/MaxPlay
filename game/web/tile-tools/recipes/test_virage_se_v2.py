"""Virage SE v2 - 11x11 double-sens.
Coin EXTERIEUR SE. NORD entre, OUEST sort.

Asphalte:
  branche OUEST : rows 3-7, cols 0-7  (sort par gauche)
  branche NORD  : rows 0-5, cols 3-7  (entre par haut)
  pivot         : rows 3-7, cols 3-7

Bords valides:
  row=8, cols 3-7  = SW_S  (S pivot, trottoir rows 9-10)
  col=8,  rows 3-8 = SW_E  (E pivot + sous-pivot, trottoir cols 9-10)
  row=2, cols 0-2  = SW_N  (N branche OUEST, trottoir rows 0-1)
  Arc interieur NW : (col=2, row=2)
"""

ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
TR   = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
ARC  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_12.png'  # arc interieur SW

LINE_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'
LINE_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'
LINE_L = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_1.png'  # coin NW

COLS, ROWS = 11, 11
ground = [[TR] * COLS for _ in range(ROWS)]

# Asphalte branche OUEST : rows 3-7, cols 0-7
for r in range(3, 8):
    for c in range(0, 8):
        ground[r][c] = ASPH
# Asphalte branche NORD : rows 0-5, cols 3-7
for r in range(0, 6):
    for c in range(3, 8):
        ground[r][c] = ASPH

# Bord S branche OUEST (row=8, cols 0-8) : toute la largeur asphalte + coin E
for c in range(0, 9): ground[8][c] = SW_S

# Bord E pivot + branche NORD (col=8, rows 0-8)
for r in range(0, 9): ground[r][8] = SW_E

# Bord N branche OUEST (row=2) : seulement cols 0-2 (cols 3-7 = asphalte branche NORD)
for c in range(0, 3): ground[2][c] = SW_N

# Arc interieur NW
ground[2][2] = ARC

objects = [
    (5, 0, LINE_V), (5, 1, LINE_V), (5, 2, LINE_V), (5, 3, LINE_V),
    (0, 5, LINE_H), (1, 5, LINE_H), (2, 5, LINE_H), (3, 5, LINE_H),
    (5, 5, LINE_L),
]

SNIPPET = {'name': 'virage_se_v2', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
