"""Virage gauche — miroir V de haut_gauche. 12×13. 2026-05-12.

Route arrive de l'OUEST en haut (rows 6-10) et tourne pour descendre vers le SUD (cols 7-10).
Zone None (transparent) = rows 0-5 × cols 0-4.

Miroir V de test_virage_haut_gauche.py : chaque col inversée row 0↔12.
Swaps asymétriques appliqués : SW6↔SW2, SW3→SW7 (INT_NW), SW14→SW12 (EXT_SE), A3→A7 (PIVOT_L_NW).
"""

SW9, SW6, SW2, SW4, SW8 = (
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png',
)
SW10 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_10.png'  # transition asphalte/trottoir
SW12 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_12.png'  # EXT_SE (coin externe convexe SE)
SW7  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_7.png'   # INT_NW (transition coin interne)
A2   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'   # marquage H pointillé
A6   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_6.png'   # alt marquage H (transition)
A8   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'   # marquage V pointillé
A7   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_7.png'   # PIVOT_L NW (coin asphalte intérieur)
A20  = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'  # asphalte plain
A22  = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_22.png'  # asphalte plain alt

ground = [
    [None, None, None, None, None, SW9,  SW4, SW10, A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9,  SW4, A20,  A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9,  SW4, SW10, A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9,  SW4, A22,  A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9,  SW4, A20,  A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9,  SW4, SW10, A8, SW10, SW8, SW9],
    [SW9,  SW9,  SW9,  SW9,  SW9,  SW9,  SW4, SW10, A8, SW10, SW8, SW9],
    [SW6,  SW6,  SW6,  SW6,  SW6,  SW6,  SW7, A20,  A8, SW10, SW8, SW9],
    [A22,  A20,  A22,  A20,  A22,  A20,  A22, A20,  A8, SW10, SW8, SW9],
    [A2,   A2,   A2,   A2,   A2,   A2,   A6,  A6,   A7, SW10, SW8, SW9],
    [SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW10, SW8, SW9],
    [SW2,  SW2,  SW2,  SW2,  SW2,  SW2,  SW2,  SW2,  SW2,  SW2, SW12, SW9],
    [SW9,  SW9,  SW9,  SW9,  SW9,  SW9,  SW9,  SW9,  SW9,  SW9, SW9,  SW9],
]

SNIPPET = {'name': 'virage_gauche', 'cols': 12, 'rows': 13, 'ground': ground, 'objects': []}
