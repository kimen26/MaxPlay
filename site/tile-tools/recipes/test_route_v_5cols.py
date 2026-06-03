"""Route verticale 5 cols - VERSION USER VALIDEE 2026-05-10.

User a corrige : la voie centrale doit etre Asphalt_1_Variation_8 (PROPRE,
asphalte plain sans marquage) par defaut, avec quelques _15 (asphalte +
marquage discontinu) tous les 4-5 rows pour casser la mono.

C'est l'INVERSE de ce que je pensais : _15 n'est pas la "ligne pointillee
centrale", c'est un marquage rare. _8 est l'asphalte propre.

Layout 5 cols x 12 rows :
  col 0 : trottoir plain (sw_9)
  col 1 : sw_4 (trottoir-a-gauche)
  col 2 : asphalte _8 (PROPRE par defaut) + _15 disperse (variantes anti-mono)
  col 3 : sw_8 (trottoir-a-droite)
  col 4 : trottoir plain (sw_9)
"""

TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
BORD_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
BORD_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
ASPH_CLEAN = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'   # asphalte propre par defaut
ASPH_DASH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'   # marquage discontinu (rare)

COLS, ROWS = 5, 12
# Rows ou on met une variante dashee (anti-mono toutes les 4-5 rows)
DASH_ROWS = {1, 6, 9}

ground = []
for r in range(ROWS):
    center = ASPH_DASH if r in DASH_ROWS else ASPH_CLEAN
    ground.append([TROTTOIR, BORD_W, center, BORD_E, TROTTOIR])

SNIPPET = {'name': 'route_v_5cols', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
