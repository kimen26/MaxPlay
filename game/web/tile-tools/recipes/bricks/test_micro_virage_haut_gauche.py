"""Micro-virage haut-gauche 5x5 — preuve de concept brique élémentaire.

Route descend du NORD (col 2) et tourne vers l'OUEST en bas (row 2).
Pivot = (2,2). C'est le PLUS PETIT virage possible avec 1 voie.

Composition :
  - row 2 col 0-1 : route H (asphalte voie unique)
  - col 2 row 0-1 : route V (asphalte voie unique)
  - (2,2) : asphalte plein (intersection)
  - (1,1) : POINT_INT_NW (sw_7) — petit accroche trottoir côté intérieur du L
  - (3,3) : COURBE_EXT_NW (sw_13) — gros arc trottoir côté extérieur du L
  - reste : trottoir plain ou None

Si ce rendu est OK → on scale en 7-wide (3 voies) + macro.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from vocab import (
    TROTTOIR_PLAIN, ASPHALT_PLAIN,
    POINT_INT_NE, COURBE_EXT_SW,
    BORD_NORD, BORD_SUD, BORD_OUEST, BORD_EST,
)

# Géométrie d'un virage "route descend du nord puis tourne vers l'ouest" :
#   - Le L a son extérieur (CONVEXE) en bas-gauche → COURBE_EXT_SW
#   - Le L a son intérieur (CONCAVE) en haut-droite → POINT_INT_NE
#   - L'asphalte plein occupe le coude
#   - Route V arrive par le haut (col 2 rows 0-1), route H part vers la gauche (row 2 cols 0-1)

T = TROTTOIR_PLAIN
A = ASPHALT_PLAIN

ground = [
    # row 0 : haut → trottoir + None à gauche (rien au-dessus)
    [None, BORD_OUEST, A, BORD_EST, T],
    # row 1 : continuation route V
    [None, BORD_OUEST, A, BORD_EST, T],
    # row 2 : route V rencontre route H → asphalte plein dans le coude + POINT_INT_NE en (2,3)
    [BORD_NORD, A,     A, POINT_INT_NE, T],
    # row 3 : bord SUD route H + COURBE_EXT_SW (gros arc) en (3,1) + trottoir + None
    [BORD_SUD, COURBE_EXT_SW, T, T, T],
    # row 4 : trottoir bas + None
    [T, T, T, None, None],
]

SNIPPET = {'name': 'micro_virage_haut_gauche', 'cols': 5, 'rows': 5, 'ground': ground, 'objects': []}
