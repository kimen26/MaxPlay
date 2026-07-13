"""Mini-render ISOLE — coin EXTERIEUR (convexe) du virage, methode L-009.

# CORRECTION : premiere tentative (4x4, cols8-11) ratait la vraie tile d'arrondi —
# Sidewalk_1_14 (COURBE_EXT_NE dans vocab.py, grand arc trottoir) etait hors du crop.
# Reproduction ELARGIE (8x6), copie EXACTE de test_ref_papa_4virages.py rows 0-5, cols 6-13
# (verifie par dump grille), qui contient le vrai combo arrondi :
#   Sidewalk_1_14 (row1,col12) = grand arc trottoir NE (COURBE_EXT_NE)
#   Asphalt_1_Variation_3 (row3,col10) = coin asphalte arrondi NE (A3)
Les deux tiles travaillent ENSEMBLE pour donner l'arrondi fluide vu dans le PNG reference.
"""
_R = 'roads/ME_Singles_City_Terrains_48x48_{n}.png'


def r(n):
    return _R.format(n=n)


SW2_9 = r('Sidewalk_2_9')
SW1_9 = r('Sidewalk_1_9')
SW2_12 = r('Sidewalk_2_12')
SW1_19 = r('Sidewalk_1_19')
SW1_14 = r('Sidewalk_1_14')
SW3_10 = r('Sidewalk_3_10')
SW2_10 = r('Sidewalk_2_10')
SW1_8 = r('Sidewalk_1_8')
A2 = r('Asphalt_1_Variation_2')
A6 = r('Asphalt_1_Variation_6')
A3 = r('Asphalt_1_Variation_3')
A4 = r('Asphalt_1_Variation_4')
SW1_2 = r('Sidewalk_1_2')
SW1_3 = r('Sidewalk_1_3')

ground = [
    [SW2_9, SW2_9, SW1_9, SW1_9, SW1_9, SW1_9, SW1_9, SW1_9],
    [SW2_12, SW1_19, SW1_19, SW1_19, SW1_19, SW1_19, SW1_14, SW1_9],
    [SW3_10, SW2_10, SW2_10, SW2_10, SW2_10, SW2_10, SW1_8, SW1_9],
    [A2, A6, A6, A6, A3, SW2_10, SW1_8, SW1_9],
    [SW2_10, SW2_10, SW2_10, SW2_10, A4, SW2_10, SW1_8, SW1_9],
    [SW1_2, SW1_2, SW1_3, SW2_10, A4, SW2_10, SW1_8, SW1_9],
]

SNIPPET = {'name': 'mini_coin_ext', 'cols': 8, 'rows': 6, 'ground': ground, 'objects': []}
