"""Brique sw14_ext_ne — tile Sidewalk_1_14 sur fond asphalt.

Tile testée au centre d'une grille 3x3 entourée de asphalt.
Permet de voir CE que fait cette tile dans son contexte naturel.
"""

T = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_14.png'
BG = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'

ground = [
    [BG, BG, BG],
    [BG, T,  BG],
    [BG, BG, BG],
]

SNIPPET = {'name': 'sw14_ext_ne', 'cols': 3, 'rows': 3, 'ground': ground, 'objects': []}
