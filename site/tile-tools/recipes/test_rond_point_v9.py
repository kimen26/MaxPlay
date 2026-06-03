"""Rond-point v9 - 4 quarts + ilot beige + panneau bleu giratoire au centre.

CENTRAGE CORRIGE 2026-05-08 : avant (col=6, row=5) -> ilot/panneau decales en
bas-droite par rapport au cercle pointille. Test des 4 positions possibles
((5,3) (5,4) (6,3) (6,4)) montre que (col=5, row=4) centre bien le panneau
sur l'axe du cercle. Le centre canvas reel est (col=7, row=6) = jonction
des 4 quarts ; le panneau bleu de _54 est en (col=1, row~0.5) du tile, donc
pose en (5,4) -> panneau au canvas (6, 4.5) ce qui matche le centre vertical
du cercle pointille (qui est legerement plus haut que la jonction).

Layout 14 cols x 12 rows :
  _50 NW (col=0, row=0) 7x6
  _51 NE (col=7, row=0) 7x6
  _53 SW (col=0, row=6) 7x6
  _52 SE (col=7, row=6) 7x6
  Asphalte plain dessous
  _54 ilot+panneau (3x4) pose en (col=5, row=4) pour centrer le panneau bleu sur le cercle.
"""

ASPH_PLAIN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
RP_NW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_50.png'
RP_NE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_51.png'
RP_SE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_52.png'
RP_SW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_53.png'
ILOT_PANNEAU = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_54.png'

COLS, ROWS = 14, 12
ground = [[ASPH_PLAIN] * COLS for _ in range(ROWS)]

# Quarts (multi-tile 7x6) puis ilot panneau (3x4) au centre.
# Centre du rond-point = (col=7, row=5). _54 fait 3x4 -> pose en (col=6, row=4) pour centrer.
objects = [
    (0, 0, RP_NW),
    (7, 0, RP_NE),
    (0, 6, RP_SW),
    (7, 6, RP_SE),
    (5, 4, ILOT_PANNEAU),
]

SNIPPET = {'name': 'rond_point_v9', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
