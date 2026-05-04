"""Parking — version FINALE serrée. P_45/P_46 contiennent déjà leur bordure blanche.

Layout 12 cols × 8 rows :
row 0 : trottoir N
rows 1-2 : P_45 (rangée haute, collée au trottoir N)
rows 3-4 : asphalte plain (allée centrale)
rows 5-6 : P_46 (rangée basse, collée au trottoir S)
row 7 : trottoir S

PAS DE BORD AJOUTÉ — le marquage P contient déjà sa bordure blanche.
"""

ASPH_PLAIN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
P_HAUT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_45.png'
P_BAS = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_46.png'

COLS, ROWS = 12, 8
ground = []
for r in range(ROWS):
    if r == 0 or r == 7:
        ground.append([TROTTOIR] * COLS)
    else:
        ground.append([ASPH_PLAIN] * COLS)

# P_HAUT collé au trottoir N (rows 1-2), P_BAS collé au trottoir S (rows 5-6)
objects = [
    (1, 1, P_HAUT),  (6, 1, P_HAUT),
    (1, 5, P_BAS),   (6, 5, P_BAS),
]

SNIPPET = {'name': 'parking_v4', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
