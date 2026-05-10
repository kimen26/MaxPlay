"""Passage pieton sur route VERTICALE (les pietons traversent horizontalement).

CORRIGE 2026-05-08 : avant on utilisait _33 (extremite gauche) et _36 (extremite
droite) qui ajoutent un GROS REBORD blanc dans le trottoir. LimeZu fournit _34
et _35 = MILIEUX SANS rebord. On les utilise sur les 3 cols de la chaussee, le
passage s'arrete net au contact des bords sw_4/sw_8 sans crete blanche.

Layout 5 cols x 12 rows :
  cols : trottoir | sw_4 | asph_dash | sw_8 | trottoir
  Passage pieton sur cols 1-3 (largeur chaussee) row 5 : 3 fois _34 (1x2 - couvre rows 5-6).
"""

ASPH_PLAIN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
ASPH_DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
BORD_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
BORD_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
PIETON_H_CLEAN = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_34.png'  # 1x2 - bandes propres SANS rebord trottoir

COLS, ROWS = 5, 12
ground = []
for r in range(ROWS):
    ground.append([TROTTOIR, BORD_W, ASPH_DASH_V, BORD_E, TROTTOIR])

# Passage pieton SANS REBORD : 3 fois _34 sur cols 1-3 row 5 (couvre rows 5-6)
PROW = 5
objects = [
    (1, PROW, PIETON_H_CLEAN),
    (2, PROW, PIETON_H_CLEAN),
    (3, PROW, PIETON_H_CLEAN),
]

SNIPPET = {'name': 'passage_pieton_route_v', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
