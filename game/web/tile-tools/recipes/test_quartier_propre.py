"""Petit quartier 16x12 - extrait de map-mockups.html card max_adventure.

Anneau routier (route H + route V + 4 virages aux coins) entourant une pelouse
centrale 8x4 avec une toyhouse. Tous bords trottoir lisses.
"""

# Tiles - tout PROPRE par defaut (regle 2026-05-10 : monotone propre > varie sale)
ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
DASH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'
DASH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'

TROTTOIR = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'

INT_NE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_7.png'
INT_NW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_5.png'
INT_SE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_1.png'
INT_SW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_3.png'
EXT_NE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_14.png'
EXT_NW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_13.png'
EXT_SE = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_12.png'
EXT_SW = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_11.png'

GRASS_1 = 'roads/ME_Singles_Terrains_and_Fences_48x48_Grass_2_9.png'
GRASS_2 = 'roads/ME_Singles_Terrains_and_Fences_48x48_Grass_2_7.png'
GRASS_3 = 'roads/ME_Singles_Terrains_and_Fences_48x48_Grass_2_8.png'

TOYHOUSE = 'buildings/ME_Singles_Villas_48x48_Toy_House_1.png'
BUSH = 'parks/ME_Singles_Garden_48x48_Bush_1.png'

COLS, ROWS = 16, 12

GRASS_MIX = [GRASS_1, GRASS_2, GRASS_3]

ground = [[None] * COLS for _ in range(ROWS)]
# Pelouse partout par defaut (variation OK pour herbe : c'est de la nature, pas du beton)
for r in range(ROWS):
    for c in range(COLS):
        ground[r][c] = GRASS_MIX[(r * 7 + c * 3) % 3]

# Asphalte rings : row 2 (H haut), row 9 (H bas), col 2 (V gauche), col 13 (V droite)
for c in range(2, 14): ground[2][c] = ASPH
for c in range(2, 14): ground[9][c] = ASPH
for r in range(2, 10): ground[r][2] = ASPH
for r in range(2, 10): ground[r][13] = ASPH

# Pointillees centrales : DASH_H/_V propres uniformes (regle 2026-05-10)
for c in range(3, 13): ground[2][c] = DASH_H
for c in range(3, 13): ground[9][c] = DASH_H
for r in range(3, 9):
    ground[r][2] = DASH_V
    ground[r][13] = DASH_V

# Bords trottoir externes
for c in range(1, 15): ground[1][c] = SW_N
for c in range(1, 15): ground[10][c] = SW_S
for r in range(1, 11): ground[r][1] = SW_W
for r in range(1, 11): ground[r][14] = SW_E

# Bords trottoir internes (autour de la pelouse, vers le centre)
for c in range(3, 13): ground[3][c] = SW_N
for c in range(3, 13): ground[8][c] = SW_S
for r in range(3, 9): ground[r][3] = SW_W
for r in range(3, 9): ground[r][12] = SW_E

# Coins externes
ground[1][1]  = EXT_NW
ground[1][14] = EXT_NE
ground[10][1] = EXT_SW
ground[10][14]= EXT_SE

# Coins internes
ground[3][3]  = INT_NW
ground[3][12] = INT_NE
ground[8][3]  = INT_SW
ground[8][12] = INT_SE

# Pelouse centrale
for r in range(4, 8):
    for c in range(4, 12):
        ground[r][c] = GRASS_MIX[(r * 7 + c * 3) % 3]

# Trottoirs externes : TROTTOIR uniforme (pas de variations motifs)
for c in range(COLS):
    ground[0][c] = TROTTOIR
    ground[11][c] = TROTTOIR
for r in range(ROWS):
    ground[r][0] = TROTTOIR
    ground[r][15] = TROTTOIR

# Toyhouse au centre
objects = [(5, 4, TOYHOUSE)]

# Quelques bushes
for (c, r) in [(10, 5), (4, 6), (11, 7), (11, 4)]:
    objects.append((c, r, BUSH))

SNIPPET = {'name': 'quartier_propre', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
