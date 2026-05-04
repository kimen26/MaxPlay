"""Route verticale 5 cols — 100% propre, pas de mix bizarre."""

ASPH_DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'  # SEUL trottoir plain net
BORD_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
BORD_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'

COLS, ROWS = 5, 12
ground = [[TROTTOIR, BORD_W, ASPH_DASH_V, BORD_E, TROTTOIR] for _ in range(ROWS)]

SNIPPET = {'name': 'route_v_5cols', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
