"""Virage SW v2 - 11x11 double-sens.
Coin EXTERIEUR SW. NORD entre, EST sort.

Asphalte:
  branche EST  : rows 3-7, cols 3-10  (sort par droite)
  branche NORD : rows 0-5, cols 3-7   (entre par haut)
  pivot        : rows 3-7, cols 3-7

Bords valides:
  row=8, cols 3-10 = SW_S  (S pivot + branche EST, trottoir rows 9-10)
  col=2,  rows 0-8 = SW_W  (W branche NORD + pivot, trottoir cols 0-1)
  row=2, cols 8-10 = SW_N  (N branche EST, trottoir rows 0-1)
  Arc interieur NE : (col=8, row=2)
"""

ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
TR   = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
ARC  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_11.png'  # arc interieur SE

LINE_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'
LINE_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'
LINE_L = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_3.png'  # coin NE

COLS, ROWS = 11, 11
ground = [[TR] * COLS for _ in range(ROWS)]

# Asphalte branche NORD : rows 0-5, cols 3-7
for r in range(0, 6):
    for c in range(3, 8):
        ground[r][c] = ASPH
# Asphalte branche EST : rows 3-7, cols 3-10
for r in range(3, 8):
    for c in range(3, 11):
        ground[r][c] = ASPH

# Bord S branche EST (row=8, cols 2-10) : toute la largeur asphalte + coin W
for c in range(2, 11): ground[8][c] = SW_S

# Bord W branche NORD + pivot (col=2, rows 0-8)
for r in range(0, 9): ground[r][2] = SW_W

# Bord N branche EST (row=2) : seulement cols 8-10 (cols 3-7 = asphalte branche NORD)
for c in range(8, 11): ground[2][c] = SW_N

# Arc interieur NE
ground[2][8] = ARC

objects = [
    (5, 0, LINE_V), (5, 1, LINE_V), (5, 2, LINE_V), (5, 3, LINE_V),
    (7, 5, LINE_H), (8, 5, LINE_H), (9, 5, LINE_H), (10, 5, LINE_H),
    (5, 5, LINE_L),
]

SNIPPET = {'name': 'virage_sw_v2', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
