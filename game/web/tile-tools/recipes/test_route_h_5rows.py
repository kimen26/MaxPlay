"""Route horizontale 5 rows - PROPRE PROPRE 2026-05-10 (correction 4).

CORRECTION CRITIQUE : _14 etait BAVEUSE/SALE, pas propre. Le user me l'a
signale 5 fois, je l'ai ignore parce que j'avais cartographie _14 comme
"propre" depuis le 2026-05-08. ZOOM x4 sur les 27 variations Asphalt_1
revele : _2 et _6 sont les SEULES vraies lignes H PROPRES (trait blanc
franc, net), _14 est leur version sale/baveuse.

Cartographie corrigee :
- _2, _6 : ligne H PROPRE (a utiliser PARTOUT par defaut)
- _14 : ligne H sale/usee (n'utiliser que pour anti-mono ≤ 10%)
"""

ASPH_CENTRE = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'   # H PROPRE PROPRE
ASPH_SALE = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'   # H SALE (anti-mono ≤ 10-15%)
TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
BORD_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
BORD_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'

COLS, ROWS = 14, 5
# 2 traits sales sur 14 cases du marquage centre (anti-mono ~14%)
DIRTY_COLS = {4, 10}

ground = []
for r in range(ROWS):
    if r == 0 or r == 4:
        ground.append([TROTTOIR] * COLS)
    elif r == 1:
        ground.append([BORD_N] * COLS)
    elif r == 3:
        ground.append([BORD_S] * COLS)
    else:
        # row 2 : marquage centre H (propre par defaut, 2 sales aux cols 4 et 10)
        ground.append([ASPH_SALE if c in DIRTY_COLS else ASPH_CENTRE for c in range(COLS)])

SNIPPET = {'name': 'route_h_5rows', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': []}
