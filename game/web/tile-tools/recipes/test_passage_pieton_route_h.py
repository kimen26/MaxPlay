"""Passage pieton sur route HORIZONTALE (les pietons traversent verticalement).

CORRIGE 2026-05-08 : avant on utilisait _29/_30/_32 ce qui faisait apparaitre
un GROS REBORD blanc qui depassait dans le trottoir (visuellement moche, le
user l'a rejete). LimeZu a une variante PROPRE : _30 et _31 sont les milieux
SANS rebord. On les utilise sur les 3 rows de la chaussee, le passage
s'arrete net au contact des bords sw_6/sw_2 sans crete blanche.

Layout 12 cols x 5 rows :
  row 0 : trottoir
  row 1 : sw_6 (bord N - asphalte au sud, trottoir au nord)
  row 2 : asphalte avec ligne pointillee
  row 3 : sw_2 (bord S - asphalte au nord, trottoir au sud)
  row 4 : trottoir
  Passage pieton sur rows 1-3 cols 5-6 : 3 fois _30 (milieu sans rebord).
"""

ASPH_PLAIN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
ASPH_DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
BORD_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
BORD_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
PIETON_V_CLEAN = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_30.png'  # 2x1 - bandes propres SANS rebord trottoir

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

# Passage pieton SANS REBORD : 3 fois _30 sur rows 1-3 cols 5-6
PCOL = 5
objects = [
    (PCOL, 1, PIETON_V_CLEAN),
    (PCOL, 2, PIETON_V_CLEAN),
    (PCOL, 3, PIETON_V_CLEAN),
]

SNIPPET = {'name': 'passage_pieton_route_h', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
