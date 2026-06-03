"""Virage haut-droit — miroir H de haut_gauche. 12×13. 2026-05-12.

Route descend du NORD (cols 1-4) et tourne vers l'EST en bas (rows 2-6).
Zone None (transparent) = rows 7-12 × cols 7-11.

Miroir H de test_virage_haut_gauche.py : chaque row inversée col 0↔11.
Swaps asymétriques appliqués : SW4↔SW8, SW3→SW1 (INT_SE), SW14→SW13 (EXT_NW), A3→A1 (PIVOT_L_SE).
"""

SW9, SW6, SW2, SW4, SW8 = (
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png',
)
SW10 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_10.png'  # transition asphalte/trottoir
SW13 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_13.png'  # EXT_NW (coin externe convexe NW)
SW1  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_1.png'   # INT_SE (transition coin interne)
A2   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'   # marquage H pointillé
A6   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_6.png'   # alt marquage H (transition)
A8   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'   # marquage V pointillé
A1   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_1.png'   # PIVOT_L SE (coin asphalte intérieur)
A20  = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'  # asphalte plain
A22  = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_22.png'  # asphalte plain alt

ground = [
    [SW9, SW9, SW9, SW9, SW9, SW9, SW9, SW9, SW9, SW9, SW9, SW9],
    [SW9, SW13, SW6, SW6, SW6, SW6, SW6, SW6, SW6, SW6, SW6, SW6],
    [SW9, SW4, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10],
    [SW9, SW4, SW10, A1, A6, A6, A2, A2, A2, A2, A2, A2],
    [SW9, SW4, SW10, A8, A20, A22, A20, A22, A20, A22, A20, A22],
    [SW9, SW4, SW10, A8, A20, SW1, SW2, SW2, SW2, SW2, SW2, SW2],
    [SW9, SW4, SW10, A8, SW10, SW8, SW9, SW9, SW9, SW9, SW9, SW9],
    [SW9, SW4, SW10, A8, SW10, SW8, SW9, None, None, None, None, None],
    [SW9, SW4, SW10, A8, A20,  SW8, SW9, None, None, None, None, None],
    [SW9, SW4, SW10, A8, A22,  SW8, SW9, None, None, None, None, None],
    [SW9, SW4, SW10, A8, SW10, SW8, SW9, None, None, None, None, None],
    [SW9, SW4, SW10, A8, A20,  SW8, SW9, None, None, None, None, None],
    [SW9, SW4, SW10, A8, SW10, SW8, SW9, None, None, None, None, None],
]

SNIPPET = {'name': 'virage_haut_droit', 'cols': 12, 'rows': 13, 'ground': ground, 'objects': []}
