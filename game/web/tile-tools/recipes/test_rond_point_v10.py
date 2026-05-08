"""Rond-point v10 - centrage de l'ilot _54 corrige.

Bug v9 : _54 pose en (6, 5) -> ilot decale en bas-droite par rapport au cercle
pointille (centre du rond-point reel = col=7 row=6 = jonction des 4 quarts
_50/_51/_52/_53).

_54 (3x4) decomposition visuelle :
  rows 0-1 : panneau bleu + poteau (haut)
  rows 2-3 : ilot beige circulaire (bas)
  centre visuel ILOT = environ (col=1, row=2.5) dans le tile

Pour que le centre ILOT tombe sur (col=7, row=6) du canvas :
  pose en col = 7 - 1 = 6
  pose en row = 6 - 2.5 = 3.5 -> on essaie 3 et 4 puis on tranche

Test 1 : pose en (6, 3) -> ilot couvre rows 5-6 (bien centre vertical), panneau
visible rows 3-4 (au-dessus du centre).
"""

ASPH_PLAIN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
RP_NW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_50.png'
RP_NE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_51.png'
RP_SE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_52.png'
RP_SW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_53.png'
ILOT_PANNEAU = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_54.png'

COLS, ROWS = 14, 12
ground = [[ASPH_PLAIN] * COLS for _ in range(ROWS)]

objects = [
    (0, 0, RP_NW),
    (7, 0, RP_NE),
    (0, 6, RP_SW),
    (7, 6, RP_SE),
    (6, 4, ILOT_PANNEAU),  # test position centree (essai 2)
]

SNIPPET = {'name': 'rond_point_v10', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
