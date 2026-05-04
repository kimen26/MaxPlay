"""Passage pieton sur route VERTICALE (les pietons traversent horizontalement).

Reuse layout route_verticale_5cols, on insere passage pieton (rows centrales) :
  - Sidewalk_1_33 (1x2) = extremite gauche du passage (pose en col=1)
  - Sidewalk_1_34 (1x2) = milieu (pose en col=2)
  - Sidewalk_1_35 (1x2) = milieu (pose en col=3) - mais col 3 c'est sw_8 normalement!
  - On a 5 cols : trottoir | sw_4 | asph | sw_8 | trottoir
  - Le passage prend les 3 cols asphalte + une col sur chaque trottoir, soit cols 1-3 = 3 tiles
  - Avec _33 _34 _36 (extremites + milieu) ca tient pile en 3 tiles

Layout 5 cols x 12 rows :
  ground : route verticale standard
  objects : passage en (col=1, row=5) + (col=2, row=5) + (col=3, row=5)
"""

ASPH_PLAIN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
ASPH_DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
BORD_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
BORD_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
PIETON_H_LEFT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_33.png'
PIETON_H_MID = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_34.png'
PIETON_H_RIGHT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_36.png'

COLS, ROWS = 5, 12
ground = []
for r in range(ROWS):
    ground.append([TROTTOIR, BORD_W, ASPH_DASH_V, BORD_E, TROTTOIR])

# Passage pieton centree sur row 5 (passage 1x2 -> couvre rows 5-6)
PROW = 5
objects = [
    (1, PROW, PIETON_H_LEFT),
    (2, PROW, PIETON_H_MID),
    (3, PROW, PIETON_H_RIGHT),
]

SNIPPET = {'name': 'passage_pieton_route_v', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
