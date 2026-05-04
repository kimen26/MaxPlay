"""Virage NW v2 - 11x11 double-sens.
Coin EXTERIEUR NW. SUD entre, EST sort.

Asphalte:
  branche EST  : rows 3-7, cols 3-10  (sort par droite)
  branche SUD  : rows 5-10, cols 3-7  (sort par bas)
  pivot        : rows 3-7, cols 3-7

Bords valides (cotes fermes avec trottoir visible):
  row=2, cols 3-7 = SW_N  (N du pivot, trottoir rows 0-1)
  col=2,  rows 3-10 = SW_W  (W pivot + branche SUD, trottoir cols 0-1)
  row=8, cols 8-10 = SW_S  (S branche EST, trottoir rows 9-10)
  Arc interieur SE : (col=8, row=8)
"""

ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
TR   = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
ARC  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_14.png'  # arc interieur NE

LINE_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'
LINE_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'
LINE_L = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_7.png'  # coin SE

COLS, ROWS = 11, 11
ground = [[TR] * COLS for _ in range(ROWS)]

# Asphalte branche EST : rows 3-7, cols 3-10
for r in range(3, 8):
    for c in range(3, 11):
        ground[r][c] = ASPH
# Asphalte branche SUD : rows 5-10, cols 3-7
for r in range(5, 11):
    for c in range(3, 8):
        ground[r][c] = ASPH

# Bord N branche EST (row=2, cols 2-10) : toute la largeur asphalte + coin W
for c in range(2, 11): ground[2][c] = SW_N

# Bord W pivot + branche SUD (col=2, rows 3-10)
for r in range(3, 11): ground[r][2] = SW_W

# Bord S branche EST (row=8, cols 8-10)
for c in range(8, 11): ground[8][c] = SW_S

# Arc interieur SE
ground[8][8] = ARC

objects = [
    (5, 6, LINE_V), (5, 7, LINE_V), (5, 8, LINE_V), (5, 9, LINE_V), (5, 10, LINE_V),
    (7, 5, LINE_H), (8, 5, LINE_H), (9, 5, LINE_H), (10, 5, LINE_H),
    (5, 5, LINE_L),
]

SNIPPET = {'name': 'virage_nw_v2', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
