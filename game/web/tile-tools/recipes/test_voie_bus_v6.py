"""Voie de bus — version FINALE serrée. BUS_G/BUS_D contiennent déjà leur bordure blanche.

Layout 9 cols × 12 rows :
col 0  : trottoir
cols 1-3 : voie G (BUS_G 3×6 posé en col 1) — _48 inclut le bord blanc gauche
col 4  : ligne pointillée centrale
cols 5-7 : voie D (BUS_D 3×6 posé en col 5) — _49 inclut le bord blanc droit
col 8  : trottoir

PAS DE BORD AJOUTÉ — le marquage BUS contient déjà sa bordure blanche.
"""

ASPH_PLAIN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
ASPH_DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'  # V PROPRE (corrigé 2026-05-11, voir LESSONS correction 5 du 2026-05-10)
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
BUS_VOIE_G = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_48.png'
BUS_VOIE_D = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_49.png'

COLS, ROWS = 9, 12
ground = []
for r in range(ROWS):
    row = [TROTTOIR,
           ASPH_PLAIN, ASPH_PLAIN, ASPH_PLAIN,
           ASPH_DASH_V,
           ASPH_PLAIN, ASPH_PLAIN, ASPH_PLAIN,
           TROTTOIR]
    ground.append(row)

# BUS_G en col 1 (collé au trottoir), BUS_D en col 5 (collé à la ligne)
objects = [
    (1, 3, BUS_VOIE_G),
    (5, 3, BUS_VOIE_D),
]

SNIPPET = {'name': 'voie_bus_v6', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
