"""Passage pieton sur route HORIZONTALE (les pietons traversent verticalement).

Layout 12 cols x 5 rows :
  rows : trottoir | sw_6 | asph_14 | sw_2 | trottoir
  Passage pieton vertical : _29 (extremite haute, 2x1), _30 (milieu, 2x1), _32 (extremite basse, 2x1)
  Pose en (col=4, row=1) row 1, (col=4, row=2) row 2, (col=4, row=3) row 3
  Mais _29/_30/_32 font 2x1 (2 cols x 1 row) -> il faut col PAIRE de depart.
"""

ASPH_PLAIN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
ASPH_DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
BORD_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
BORD_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
PIETON_V_TOP = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_29.png'   # 2x1
PIETON_V_MID = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_30.png'   # 2x1
PIETON_V_BOT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_32.png'   # 2x1

COLS, ROWS = 12, 5
ground = []
for r in range(ROWS):
    if r == 0 or r == 4:
        ground.append([TROTTOIR] * COLS)
    elif r == 1:
        ground.append([BORD_N] * COLS)
    elif r == 3:
        ground.append([BORD_S] * COLS)
    else:
        ground.append([ASPH_DASH_H] * COLS)

# Passage pieton centre col=5 (cols 5-6 couverts par chaque tile 2x1)
PCOL = 5
objects = [
    (PCOL, 1, PIETON_V_TOP),
    (PCOL, 2, PIETON_V_MID),
    (PCOL, 3, PIETON_V_BOT),
]

SNIPPET = {'name': 'passage_pieton_route_h', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
