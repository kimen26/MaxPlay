"""Ville — route H large + virage arrondi vers le bas + arrêt de bus + passage piéton.

v5 (2026-07-13) — reprise directe orchestrateur après 4 itérations designer.
Rejets Papa Yann v3/v4 : BUS trop bas, passage piéton sur le trottoir, virage pas arrondi.

STRUCTURE COPIÉE DES REFS (jamais inventée) :
  - Profil route H = test_papa_route_large.py :
      SW9 / SW9(ancrage BUS) / SW19 bordurette / asphalte / A2 pointillés / asphalte / SW2 / SW9.
      Le cadre BUS (SW23 + SW47 7×3 + SW24) s'ancre sur la DERNIÈRE rangée de trottoir nord
      (ref row1) : son art couvre trottoir + bordurette + 1re rangée d'asphalte.
  - Passage piéton = route_large col1 : SW29 (rangée SW19) / SW30 / SW30 / SW31 / SW32
      (rangée SW2). Ne touche JAMAIS une case de trottoir plain SW9.
  - Coin EXTÉRIEUR arrondi = test_ref_papa_4virages.py coin NE (rows1-3, cols10-13) :
      SW14 (arc trottoir) + SW8 dessous + A3 (coin asphalte arrondi) en diagonale.
  - Coin INTÉRIEUR = test_ref_papa_carrefour.py (row5 col6 + dessous) :
      Sidewalk_2_3 (jonction SW2→bord ouest) puis Sidewalk_2_4 puis SW4.
  - Profil route V = test_ref_papa_carrefour.py : SW9 / SW4 / SW10 / A4 / SW10 / SW8 / SW9.

MULTI-TILES (SW47 7×3, SW23/SW24 1×3, abribus 5×3, panneau 1×3) : tous en `objects`
(peints APRÈS le ground — en ground ils seraient écrasés par les rangées suivantes).
Ordre objects : cadre BUS d'abord, puis abribus/panneau (occlusion naturelle).

20×15 tiles (960×720 px). Premier incrément map ville pour max-adventure.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from vocab import (  # noqa: E402
    BUS_STOP_ABRI,
    BUS_STOP_PANNEAU,
)

_ROADS = 'roads/ME_Singles_City_Terrains_48x48_{name}.png'


def _r(name: str) -> str:
    return _ROADS.format(name=name)


# --- Trottoir / bordures (familles mixtes VOLONTAIRES, copiées des refs) ---
SW9 = _r('Sidewalk_1_9')      # trottoir plain
SW19 = _r('Sidewalk_1_19')    # bordurette nord biseautée (profil route_large)
SW2 = _r('Sidewalk_1_2')      # bordure sud
SW4 = _r('Sidewalk_1_4')      # bord ouest (route V)
SW8 = _r('Sidewalk_1_8')      # bord est (route V)
SW10 = _r('Sidewalk_1_10')    # asphalte-famille-sidewalk (intérieur route V, ref carrefour)
SW14 = _r('Sidewalk_1_14')    # grand arc trottoir convexe NE (coin extérieur virage)
S2_3 = _r('Sidewalk_2_3')     # coin intérieur : jonction bordure sud → bord ouest (ref carrefour)
S2_4 = _r('Sidewalk_2_4')     # coin intérieur, case sous S2_3 (ref carrefour)

# --- Asphalte ---
A2 = _r('Asphalt_1_Variation_2')    # pointillés H propres
A3 = _r('Asphalt_1_Variation_3')    # coin asphalte arrondi NE (ref 4virages)
A4 = _r('Asphalt_1_Variation_4')    # marquage V (ref carrefour route V)
A20 = _r('Asphalt_1_Variation_20')  # asphalte plain
A22 = _r('Asphalt_1_Variation_22')  # asphalte plain alt

# --- Cadre BUS jaune (route_large : ancré sur la dernière rangée de trottoir nord) ---
SW23 = _r('Sidewalk_1_23')   # barre gauche, 1×3
SW47 = _r('Sidewalk_1_47')   # "BUS", 7×3
SW24 = _r('Sidewalk_1_24')   # barre droite, 1×3

# --- Passage piéton (route_large col1, empilement exact) ---
SW29 = _r('Sidewalk_1_29')
SW30 = _r('Sidewalk_1_30')
SW31 = _r('Sidewalk_1_31')
SW32 = _r('Sidewalk_1_32')

COLS, ROWS = 20, 15

GRASS_FMT = 'roads/ME_Singles_Terrains_and_Fences_48x48_Grass_2_{n}.png'
GRASS_POOL = [GRASS_FMT.format(n=n) for n in (7, 8, 9)]


def _grass(c: int, r: int) -> str:
    return GRASS_POOL[(r * 7 + c * 3) % 3]


ground: list[list[str]] = [[_grass(c, r) for c in range(COLS)] for r in range(ROWS)]

# Cycles anti-mono asphalte (repris carrefour, comme v2-v4)
_CYC_A = [A20, SW10, SW10, A20, A22, A20]   # rangée asphalte nord
_CYC_B = [A22, SW10, A20, A22, SW10, A20]   # rangée asphalte sud

# ── Trottoir nord (2 rangées, largeur ref) : rows 3-4, cols 0-18 ──
for c in range(0, 19):
    ground[3][c] = SW9
    ground[4][c] = SW9

# ── Route H : rows 5-9, cols 0-16 (bordurette → bordure sud) ──
for c in range(0, 17):
    ground[5][c] = SW19          # bordurette nord biseautée
for c in range(0, 13):
    ground[6][c] = _CYC_A[c % 6]
    ground[8][c] = _CYC_B[c % 6]
for c in range(0, 9):
    ground[7][c] = A2            # pointillés — segment ouest (interrompus par le passage piéton)
for c in (11, 12):
    ground[7][c] = A2            # pointillés — reprise après le passage, stop avant le virage
for c in range(0, 13):
    ground[9][c] = SW2           # bordure sud (cols 9-10 remplacées par le passage piéton)

# ── Passage piéton : cols 9-10, rows 5-9 (bordurette → bordure sud, JAMAIS sur SW9) ──
for c in (9, 10):
    ground[5][c] = SW29
    ground[6][c] = SW30
    ground[7][c] = SW30
    ground[8][c] = SW31
    ground[9][c] = SW32

# ── Poche du virage : rows 6-8, cols 13-16 ──
for r in (6, 7, 8):
    for c in range(13, 17):
        ground[r][c] = A20 if (r + c) % 2 == 0 else A22

# Marquage pointillé qui TOURNE dans le virage : ligne H (row 7) → coin A3 → ligne V (col 15).
# A1/A3/A5/A7 = coins de MARQUAGE pointillé (NW/NE/SE/SW, cf. carré pointillé de 4virages).
ground[7][13] = A2
ground[7][14] = A2
ground[7][15] = A3     # coin NE : la ligne arrive de l'ouest et descend vers le sud
ground[8][15] = A4     # la ligne V remonte jusqu'au coin

# ── Coin EXTÉRIEUR arrondi (bloc 4virages NE) ──
ground[5][16] = SW19   # bordurette continue jusqu'à l'arc
ground[5][17] = SW14   # arc trottoir convexe
ground[5][18] = SW9
ground[6][16] = A20    # asphalte plain (A3 = coin de MARQUAGE pointillé, pas un coin d'asphalte — l'arrondi vient de SW14)
ground[6][17] = SW8    # bord est démarre sous l'arc
ground[6][18] = SW9
for r in (7, 8):
    ground[r][17] = SW8
    ground[r][18] = SW9

# ── Coin INTÉRIEUR (briques carrefour) + jonction route V ──
ground[9][13] = S2_3   # bordure sud tourne vers le bas
ground[9][14] = SW10
ground[9][15] = A4     # marquage V démarre après le pivot
ground[9][16] = SW10
ground[9][17] = SW8
ground[9][18] = SW9

# ── Trottoir sud (2 rangées) : rows 10-11, cols 0-12 ──
for c in range(0, 13):
    ground[10][c] = SW9
    ground[11][c] = SW9

# ── Route V : rows 10-14, cols 12-18 (jusqu'au bord bas du canvas) ──
ground[10][13] = S2_4  # case sous le coin intérieur (ref carrefour)
for r in range(10, 15):
    ground[r][12] = SW9
    if r >= 11:
        ground[r][13] = SW4
    ground[r][14] = SW10
    ground[r][15] = A4
    ground[r][16] = SW10
    ground[r][17] = SW8
    ground[r][18] = SW9

# ── Objects (multi-tiles, peints après le ground, ordre = ordre de dessin) ──
objects = [
    (0, 4, SW23),             # barre gauche cadre BUS, 1×3 (rows 4-6)
    (1, 4, SW47),             # "BUS" 7×3 (cols 1-7, rows 4-6) — ancré rangée trottoir comme la ref
    (8, 4, SW24),             # barre droite, 1×3
    (3, 1, BUS_STOP_ABRI),    # abribus 5×3 (cols 3-7, rows 1-3) — sur le trottoir nord
    (8, 1, BUS_STOP_PANNEAU), # panneau 1×3 (col 8, rows 1-3)
]

SNIPPET = {
    'name': 'ville_virage_bus',
    'cols': COLS,
    'rows': ROWS,
    'ground': ground,
    'objects': objects,
}
