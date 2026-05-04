"""Route horizontale 5 rows — 100% propre, pas de mix."""

ASPH_DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
BORD_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
BORD_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'

COLS, ROWS = 14, 5
ground = []
for r in range(ROWS):
    if r == 0 or r == 4:
        ground.append([TROTTOIR] * COLS)
    elif r == 1:
        ground.append([BORD_N] * COLS)
    elif r == 3:
        ground.append([BORD_S] * COLS)
    else:
        ground.append([ASPH_DASH_H] * COLS)

SNIPPET = {'name': 'route_h_5rows', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
