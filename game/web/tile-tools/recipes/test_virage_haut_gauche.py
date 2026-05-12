"""Virage haut-gauche v3 — RÉFÉRENCE CANONIQUE Papa Yann 2026-05-12.

Route descend du NORD (cols 7-10) et tourne vers l'OUEST en bas (rows 2-6).
Style validé Papa Yann après comparaison 3 variantes (A/B/C → A retenue).

Canvas : 12 cols × 13 rows.
- Marquage H pointillé (a_2) row 3 cols 0-5 + transition (a_6 a_6 a_3) cols 6-8
- Marquage V pointillé (a_8) col 8 rows 4-12 (cohérent avec H pointillé)
- Coin externe NE = sw_14 (route encadrée en haut, ne continue pas au nord)
- Bord interne sw_3 (INT_SW) en (5,6) = transition propre coin interne du L
- Zone None (transparent) = rows 7-12 × cols 0-4 (pour bâtiment/parc futur)

Source : test_papa_virage_v3a_marquage validé visuel par Papa Yann.
"""

SW9, SW6, SW2, SW4, SW8 = (
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png',
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png',
)
SW10 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_10.png'  # transition asphalte/trottoir
SW14 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_14.png'  # EXT_NE (coin externe convexe NE)
SW3  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_3.png'   # INT_SW (transition coin interne)
A2   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'   # marquage H pointillé
A6   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_6.png'   # alt marquage H (transition)
A8   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'   # marquage V pointillé
A3   = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_3.png'   # PIVOT_L SW (coin asphalte intérieur)
A20  = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'  # asphalte plain
A22  = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_22.png'  # asphalte plain alt

ground = [
    [SW9]*12,
    [SW6, SW6, SW6, SW6, SW6, SW6, SW6, SW6, SW6, SW6, SW14, SW9],
    [SW10]*10 + [SW8, SW9],
    [A2, A2, A2, A2, A2, A2, A6, A6, A3, SW10, SW8, SW9],
    [A22, A20, A22, A20, A22, A20, A22, A20, A8, SW10, SW8, SW9],
    [SW2, SW2, SW2, SW2, SW2, SW2, SW3, A20, A8, SW10, SW8, SW9],
    [SW9, SW9, SW9, SW9, SW9, SW9, SW4, SW10, A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9, SW4, SW10, A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9, SW4, A20,  A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9, SW4, A22,  A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9, SW4, SW10, A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9, SW4, A20,  A8, SW10, SW8, SW9],
    [None, None, None, None, None, SW9, SW4, SW10, A8, SW10, SW8, SW9],
]

SNIPPET = {'name': 'virage_haut_gauche', 'cols': 12, 'rows': 13, 'ground': ground, 'objects': []}
