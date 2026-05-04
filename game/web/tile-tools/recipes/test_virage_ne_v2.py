"""Virage NE v2 - 11x11 double-sens.
Coin EXTERIEUR NE. SUD entre, OUEST sort.

Asphalte:
  branche OUEST : rows 3-7, cols 0-7   (sort par gauche - pas de bord W)
  branche SUD   : rows 5-10, cols 3-7  (sort par bas - pas de bord S)
  pivot         : rows 3-7, cols 3-7

Bords (seulement cotes FERMES = trottoir visible de l'autre cote):
  row=2 cols 0-7 = SW_N   (dessus branche OUEST, trottoir rows 0-1 au-dessus)
  row=8 cols 0-2 = SW_S   (dessous branche OUEST, seulement les 3 cols avant la branche SUD)
  col=8 rows 5-10 = SW_E  (droite branche SUD, trottoir cols 9-10 a droite)
  col=2 rows 3-7  = SW_W  (gauche du pivot cote ferme - SEULEMENT rows 3-4 car rows 5-10 = branche SUD avec son propre bord W)

Attends : col=2 rows 3-10 = SW_W est correct car :
  rows 3-7 : bord W de la branche OUEST (trottoir cols 0-1 a gauche de col=2... FAUX, col 0-1 = asphalte!)

ERREUR FONDAMENTALE : branche OUEST cols 0-7 => col=0,1 sont de l'asphalte.
Il n'y a PAS de trottoir a gauche de la branche OUEST car elle sort du canvas.
Donc pas de bord W non plus pour la branche OUEST.

Seul bord W valide : col=2 rows 5-10 = bord W de la branche SUD (trottoir cols 0-1 rows 5-10).

GEOMETRIE FINALE CORRECTE:
  Bords valides :
    row=2, cols 3-7 = SW_N  (N du pivot - trottoir rows 0-1 au-dessus du pivot)
    col=8, rows 3-7 = SW_E  (E du pivot - trottoir cols 9-10 a droite du pivot)
    col=8, rows 5-10 = SW_E (E branche SUD continue)
    col=2, rows 5-10 = SW_W (W branche SUD - trottoir cols 0-1 rows 5-10)
    row=8, cols 3-7  = SW_S (S branche SUD... non, sort par bas)

  Sorties ouvertes (pas de bord):
    gauche branche OUEST : col=0 = bord canvas
    bas branche SUD      : row=10 = bord canvas
    haut pivot           : rows 0-2 = trottoir sauf si branche NORD

  Conclusion: pour ce virage, les seuls bords utiles sont autour du PIVOT:
    row=2, cols 3-7 = SW_N
    col=8, rows 3-7 = SW_E
  Et sur les branches la ou il y a du trottoir visible:
    col=2, rows 5-10 = SW_W  (W branche SUD)
    Pas de bord S (sort par bas), pas de bord W branche OUEST (sort par gauche)
"""

ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
TR   = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'
SW_W = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_E = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
SW_N = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_S = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
ARC  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_13.png'  # arc interieur NW

LINE_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png'
LINE_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png'
LINE_L = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_5.png'  # coin SW

COLS, ROWS = 11, 11
ground = [[TR] * COLS for _ in range(ROWS)]

# Asphalte branche OUEST : rows 3-7, cols 0-7
for r in range(3, 8):
    for c in range(0, 8):
        ground[r][c] = ASPH
# Asphalte branche SUD : rows 5-10, cols 3-7
for r in range(5, 11):
    for c in range(3, 8):
        ground[r][c] = ASPH

# Bord N branche OUEST (row=2, cols 0-8) : toute la largeur de l'asphalte + coin E
for c in range(0, 9): ground[2][c] = SW_N

# Bord E du pivot + branche SUD (col=8, rows 3-10) : trottoir cols 9-10 a droite
for r in range(3, 11): ground[r][8] = SW_E

# Bord W branche SUD (col=2, rows 5-10) : trottoir cols 0-1 a gauche
for r in range(5, 11): ground[r][2] = SW_W

# Arc interieur coin SW du pivot : (col=2, row=8)
ground[8][2] = ARC

# Lignes pointillees : centre branche SUD col=5, centre branche OUEST row=5
objects = [
    (5, 6, LINE_V), (5, 7, LINE_V), (5, 8, LINE_V), (5, 9, LINE_V), (5, 10, LINE_V),
    (0, 5, LINE_H), (1, 5, LINE_H), (2, 5, LINE_H), (3, 5, LINE_H),
    (5, 5, LINE_L),
]

SNIPPET = {'name': 'virage_ne_v2', 'cols': COLS, 'rows': ROWS, 'ground': ground, 'objects': objects}
