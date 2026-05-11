"""Virage haut-droit — 13x13. Version v2 2026-05-12.

Route 3-chaussees (7-wide) en L miroir H+V, pivot bas-gauche.
Branche V descend du NORD (cols 0-6, rows 0-6), branche H part vers l'EST (rows 6-12).
Carre intersection rows 6-12 x cols 0-6. Zone None rows 0-5 x cols 7-12.

Schema:
  - Branche V : cols 0-6, rows 0-6 (marquage V sur col 3 rows 1-5)
  - Branche H : rows 6-12, cols 0-12 (marquage H sur row 9 cols 7-12)
  - Coins : (12,0)=VIRAGE_INT_NW, (6,6)=COIN_INT_NE
  - Coins neutres : (6,0)=TROTTOIR_PLAIN, (12,6)=TROTTOIR_PLAIN
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from vocab import (
    TROTTOIR_PLAIN,
    BORD_NORD, BORD_SUD, BORD_OUEST, BORD_EST,
    ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2,
    ROUTE_H_PROPRE, ROUTE_V_PROPRE,
    COIN_INT_NE,
    VIRAGE_INT_NW,
)

_VOIE_POOL = [ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2]


def _asph(r: int, c: int) -> str:
    return _VOIE_POOL[(r + c) % 3]


COLS, ROWS = 13, 13

# Init grille None
ground = [[None] * COLS for _ in range(ROWS)]

# ── Branche V : cols 0-6, rows 0-6 ───────────────────────────────────────
# row 0 : trottoir cols 0-6
for c in range(0, 7):
    ground[0][c] = TROTTOIR_PLAIN

# rows 1-5 : branche V pure
for r in range(1, 6):
    ground[r][0] = BORD_OUEST
    ground[r][1] = _asph(r, 1)
    ground[r][2] = _asph(r, 2)
    ground[r][3] = ROUTE_V_PROPRE   # marquage V col 3
    ground[r][4] = _asph(r, 4)
    ground[r][5] = _asph(r, 5)
    ground[r][6] = BORD_EST

# row 6 : (6,0)=TROTTOIR_PLAIN, bords N carre cols 1-5, (6,6)=COIN_INT_NE, trottoir cols 7-12
ground[6][0] = TROTTOIR_PLAIN
for c in range(1, 6):
    ground[6][c] = BORD_NORD
ground[6][6] = COIN_INT_NE
for c in range(7, COLS):
    ground[6][c] = TROTTOIR_PLAIN

# ── Branche H : rows 7-12, cols 0-12 ─────────────────────────────────────
# rows 7-11 : carre (cols 0-6) + branche pure (cols 7-12)
for r in range(7, 12):
    # Carre cols 0-6
    ground[r][0] = BORD_OUEST
    for c in range(1, 6):
        ground[r][c] = _asph(r, c)
    ground[r][6] = BORD_EST
    # Branche pure cols 7-12
    if r == 7:
        for c in range(7, 13):
            ground[r][c] = BORD_NORD
    elif r == 8:
        for c in range(7, 13):
            ground[r][c] = _asph(r, c)
    elif r == 9:
        for c in range(7, 13):
            ground[r][c] = ROUTE_H_PROPRE   # marquage H row 9
    elif r == 10:
        for c in range(7, 13):
            ground[r][c] = _asph(r, c)
    elif r == 11:
        for c in range(7, 13):
            ground[r][c] = BORD_SUD

# row 12 : (12,0)=VIRAGE_INT_NW, bords S carre cols 1-5, (12,6)=TROTTOIR_PLAIN, trottoir cols 7-12
ground[12][0] = VIRAGE_INT_NW
for c in range(1, 6):
    ground[12][c] = BORD_SUD
ground[12][6] = TROTTOIR_PLAIN
for c in range(7, COLS):
    ground[12][c] = TROTTOIR_PLAIN

SNIPPET = {
    'name': 'virage_haut_droit',
    'cols': COLS,
    'rows': ROWS,
    'ground': ground,
    'objects': [],
}
