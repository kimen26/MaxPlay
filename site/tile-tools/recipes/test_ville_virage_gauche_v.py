"""Ville — route VERTICALE (BUS + parking verticaux) + virage à GAUCHE (ouest) en bas.

Miroir de test_ville_virage_bus.py (v6 validée Papa Yann 2026-07-13), mêmes principes :
  - Blocs copiés des refs papa, jamais inventés (L-C).
  - Multi-tiles en objects (L-B) : BUS vertical _49 (3×6), parking _43 (3×5),
    abribus 5×3, panneau 1×3.
  - A1/A3/A5/A7 = coins de MARQUAGE pointillé (L-A) : ici A5 (SE) fait tourner la
    ligne nord→ouest.
  - Arcs trottoir _11/_12/_13/_14 : ici SW11 (arc SE) au coin extérieur du virage.

Géométrie : route V (asphalte cols 9-13, ligne A4 col 11) descend du haut, tourne
à l'ouest en rows 9-11 (ligne A2 row 10). Coin intérieur NW à (8,8), coin extérieur
SE arrondi à (12,14). Passage piéton horizontal (_33.._36, 1×2 chacun) rows 6-7,
reliant trottoir ouest et trottoir est, au-dessus du virage.

20×15 tiles (960×720 px).
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

_ROADS = 'roads/ME_Singles_City_Terrains_48x48_{name}.png'


def _r(name: str) -> str:
    return _ROADS.format(name=name)


# --- Trottoir / bordures ---
SW9 = _r('Sidewalk_1_9')      # trottoir plain
SW19 = _r('Sidewalk_1_19')    # bordurette nord biseautée (route H)
SW2 = _r('Sidewalk_1_2')      # bordure sud (route H)
SW4 = _r('Sidewalk_1_4')      # bord ouest (route V)
SW8 = _r('Sidewalk_1_8')      # bord est (route V)
SW10 = _r('Sidewalk_1_10')    # asphalte-famille-sidewalk (intérieur routes)
SW11 = _r('Sidewalk_1_11')    # arc trottoir convexe SE — coin extérieur du virage
SW5 = _r('Sidewalk_1_5')      # coin jonction bord nord → bord ouest (ref carrefour row1)

# --- Asphalte / marquages ---
A2 = _r('Asphalt_1_Variation_2')    # pointillés H
A4 = _r('Asphalt_1_Variation_4')    # marquage V
A5 = _r('Asphalt_1_Variation_5')    # coin de marquage SE : ligne V (nord) → ligne H (ouest)
A20 = _r('Asphalt_1_Variation_20')  # asphalte plain
A22 = _r('Asphalt_1_Variation_22')  # asphalte plain alt

# --- Marquages sol verticaux (multi-tiles → objects) ---
SW49 = _r('Sidewalk_1_49')   # "BUS" vertical, liseré blanc à droite (voie est), 3×6
SW43 = _r('Sidewalk_1_43')   # place parking verticale, 3×5

# --- Passage piéton HORIZONTAL (traverse une route V), 1×2 chacun ---
SW33 = _r('Sidewalk_1_33')
SW34 = _r('Sidewalk_1_34')
SW35 = _r('Sidewalk_1_35')
SW36 = _r('Sidewalk_1_36')

COLS, ROWS = 20, 15

GRASS_FMT = 'roads/ME_Singles_Terrains_and_Fences_48x48_Grass_2_{n}.png'
GRASS_POOL = [GRASS_FMT.format(n=n) for n in (7, 8, 9)]


def _grass(c: int, r: int) -> str:
    return GRASS_POOL[(r * 7 + c * 3) % 3]


ground: list[list[str]] = [[_grass(c, r) for c in range(COLS)] for r in range(ROWS)]

_CYC = [A20, SW10, SW10, A20, A22, A20]

# ── Trottoir ouest de la route V (2 cols) + trottoir nord de la route H : fusionnent ──
for r in range(0, 8):
    ground[r][6] = SW9
    ground[r][7] = SW9
for c in range(0, 6):
    ground[6][c] = SW9
    ground[7][c] = SW9

# ── Esplanade trottoir pour le renfoncement parking (poche creusée, PAS sur la route) ──
for r in range(2, 6):
    for c in range(1, 6):
        ground[r][c] = SW9

# Bordures de trottoir flanquant le renfoncement (demande Papa Yann) :
# col 1 = bord ouest de la poche (asphalte à l'est), col 5 = bord est (asphalte à l'ouest)
for r in range(3, 8):
    ground[r][1] = SW4
    ground[r][5] = SW8

# ── Route V : rows 0-8, cols 8-14 (bord ouest / 5 asphalte / bord est) ──
for r in range(0, 9):
    if r <= 7:
        ground[r][8] = SW4               # bord ouest (s'arrête au coin intérieur)
    for c in range(9, 14):
        ground[r][c] = _CYC[(r + c) % 6] if c != 11 else A4
    ground[r][14] = SW8                  # bord est (continue vers l'arc)

# ligne V : continue jusqu'au coin A5 (rows 8-9), le coin prend le relais en row 10
ground[8][11] = A4

# ── Trottoir est de la route V (2 cols) ──
for r in range(0, 12):
    ground[r][15] = SW9
    ground[r][16] = SW9

# ── Passage piéton horizontal : rows 6-7, cols 8-14 (1×2, ancrés row 6) ──
ground[6][8] = SW33
ground[7][8] = None
for c in range(9, 14):
    ground[6][c] = SW34 if c % 2 else SW35
    ground[7][c] = None
ground[6][14] = SW36
ground[7][14] = None

# ── Coin intérieur NW : bord nord (SW19) tourne vers le haut (SW4) ──
ground[8][8] = SW5

# ── Route H (sortie ouest) : rows 8-12, cols 0-8 + poche du virage ──
for c in range(0, 8):
    ground[8][c] = SW19                  # bordurette nord
for c in (2, 3, 4):
    ground[8][c] = A20                   # entrée du renfoncement parking : bordurette interrompue
for r in (9, 10, 11):
    for c in range(0, 14):
        if ground[r][c].startswith('roads/ME_Singles_Terrains'):
            ground[r][c] = _CYC[(r + c) % 6]
for r in (9, 10, 11):
    for c in range(0, 14):
        ground[r][c] = _CYC[(r + c) % 6]
for c in range(0, 10):
    ground[10][c] = A2                   # pointillés H
ground[10][10] = A2
ground[10][11] = A5                      # coin de marquage : la ligne V descend et part à l'ouest
ground[9][11] = A4                       # tiret vertical manquant entre passage piéton et coin
for r in (9, 10, 11):
    ground[r][14] = SW8                  # bord est descend jusqu'à l'arc

# ── Bordure sud + coin extérieur SE arrondi ──
for c in range(0, 14):
    ground[12][c] = SW2
ground[12][14] = SW11                    # arc trottoir convexe SE
ground[12][15] = SW9
ground[12][16] = SW9

# ── Trottoir sud (2 rangées pleines) ──
for r in (13, 14):
    for c in range(0, 17):
        ground[r][c] = SW9

# ── Objects (multi-tiles, ordre = ordre de dessin) ──
ABRI_V = 'themes/10_vehicles/Bus_Stop_3.png'  # abribus VERTICAL 2×6 (panneau intégré)

objects = [
    (2, 3, SW43),             # renfoncement parking 3×5 (cols 2-4, rows 3-7), poche dans le
                              # trottoir nord de la route H, ouverture sud vers la chaussée
    (12, 0, SW49),            # BUS vertical 3×6 (cols 12-14, rows 0-5), liseré sur bord est
    (15, 1, ABRI_V),          # abribus vertical 2×6 (cols 15-16, rows 1-6), face à la route
]

SNIPPET = {
    'name': 'ville_virage_gauche_v',
    'cols': COLS,
    'rows': ROWS,
    'ground': ground,
    'objects': objects,
}
