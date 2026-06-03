"""Virage droit — miroir H+V de haut_gauche (double miroir). 12×13. 2026-05-12.

Route arrive de l'EST en haut (rows 7-11) et tourne pour descendre vers le SUD (cols 1-4).
Zone None (transparent) = rows 0-5 × cols 7-11.

Double miroir de test_virage_haut_gauche.py : rows et cols inversés.
Swaps asymétriques appliqués : SW4↔SW8, SW6↔SW2,
  SW3→SW5 (INT_NE), SW14→SW11 (EXT_SW), A3→A9 (PIVOT_L_NE).
"""

SW9, SW6, SW2, SW4, SW8 = (
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png',
)
SW10 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_10.png'  # transition asphalte/trottoir
SW11 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_11.png'  # EXT_SW (coin externe convexe SW)
SW5  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_5.png'   # INT_NE (transition coin interne)
A2   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'   # marquage H pointillé
A6   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_6.png'   # alt marquage H (transition)
A8   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'   # marquage V pointillé
A9   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_9.png'   # PIVOT_L NE (coin asphalte intérieur)
A20  = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'  # asphalte plain
A22  = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_22.png'  # asphalte plain alt

ground = [
    [SW9,  SW4, SW10, A8, SW10, SW8, SW9, None, None, None, None, None],
    [SW9,  SW4, SW10, A8, A20,  SW8, SW9, None, None, None, None, None],
    [SW9,  SW4, SW10, A8, SW10, SW8, SW9, None, None, None, None, None],
    [SW9,  SW4, SW10, A8, A22,  SW8, SW9, None, None, None, None, None],
    [SW9,  SW4, SW10, A8, A20,  SW8, SW9, None, None, None, None, None],
    [SW9,  SW4, SW10, A8, SW10, SW8, SW9, None, None, None, None, None],
    [SW9,  SW4, SW10, A8, SW10, SW8, SW9, SW9, SW9, SW9, SW9, SW9],
    [SW9,  SW4, SW10, A8, A20,  SW5, SW6, SW6, SW6, SW6, SW6, SW6],
    [SW9,  SW4, SW10, A8, A20,  A22, A20, A22, A20, A22, A20, A22],
    [SW9,  SW4, SW10, A9, A6,   A6,  A2,  A2,  A2,  A2,  A2,  A2],
    [SW9,  SW4, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10],
    [SW9,  SW11, SW2, SW2, SW2, SW2, SW2, SW2, SW2, SW2, SW2, SW2],
    [SW9,  SW9,  SW9, SW9, SW9, SW9, SW9, SW9, SW9, SW9, SW9, SW9],
]

SNIPPET = {'name': 'virage_droit', 'cols': 12, 'rows': 13, 'ground': ground, 'objects': []}
