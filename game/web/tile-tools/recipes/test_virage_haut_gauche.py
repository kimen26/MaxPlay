"""Virage haut-gauche — 13x13. Version v2 2026-05-12.

Route 3-chaussees (7-wide) en L miroir vertical, pivot bas-droit.
Branche V descend du NORD (cols 6-12, rows 0-6), branche H part vers l'OUEST (rows 6-12).
Carre intersection rows 6-12 x cols 6-12. Zone None rows 0-5 x cols 0-5.

Schema:
  - Branche V : cols 6-12, rows 0-6 (marquage V sur col 9 rows 1-5)
  - Branche H : rows 6-12, cols 0-12 (marquage H sur row 9 cols 0-5)
  - Coins : (12,12)=VIRAGE_INT_NE, (6,6)=COIN_INT_NW
  - Coins neutres : (6,12)=TROTTOIR_PLAIN, (12,6)=TROTTOIR_PLAIN
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from vocab import (
    TROTTOIR_PLAIN,
    BORD_NORD, BORD_SUD, BORD_OUEST, BORD_EST,
    ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2,
    ROUTE_H_PROPRE, ROUTE_V_PROPRE,
    COIN_INT_NW,
    VIRAGE_INT_NE,
)

_VOIE_POOL = [ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2]


def _asph(r: int, c: int) -> str:
    return _VOIE_POOL[(r + c) % 3]


COLS, ROWS = 13, 13

# Init grille None
ground = [[None] * COLS for _ in range(ROWS)]

# ── Branche V : cols 6-12, rows 0-6 ──────────────────────────────────────
# row 0 : trottoir cols 6-12
for c in range(6, COLS):
    ground[0][c] = TROTTOIR_PLAIN

# rows 1-5 : branche V pure
for r in range(1, 6):
    ground[r][6] = BORD_OUEST
    ground[r][7] = _asph(r, 7)
    ground[r][8] = _asph(r, 8)
    ground[r][9] = ROUTE_V_PROPRE   # marquage V col 9
    ground[r][10] = _asph(r, 10)
    ground[r][11] = _asph(r, 11)
    ground[r][12] = BORD_EST

# row 6 : COIN_INT_NW a (6,6), bords N carre cols 7-11, (6,12)=TROTTOIR_PLAIN
# + trottoir cols 0-5 (bord superieur branche H)
for c in range(0, 6):
    ground[6][c] = TROTTOIR_PLAIN
ground[6][6] = COIN_INT_NW
for c in range(7, 12):
    ground[6][c] = BORD_NORD
ground[6][12] = TROTTOIR_PLAIN

# ── Branche H : rows 7-12, cols 0-12 ─────────────────────────────────────
# rows 7-11 : branche pure (cols 0-5) + carre (cols 6-12)
for r in range(7, 12):
    # Branche pure cols 0-5
    if r == 7:
        for c in range(0, 6):
            ground[r][c] = BORD_NORD
    elif r == 8:
        for c in range(0, 6):
            ground[r][c] = _asph(r, c)
    elif r == 9:
        for c in range(0, 6):
            ground[r][c] = ROUTE_H_PROPRE   # marquage H row 9
    elif r == 10:
        for c in range(0, 6):
            ground[r][c] = _asph(r, c)
    elif r == 11:
        for c in range(0, 6):
            ground[r][c] = BORD_SUD
    # Carre cols 6-12
    ground[r][6] = BORD_OUEST
    for c in range(7, 12):
        ground[r][c] = _asph(r, c)
    ground[r][12] = BORD_EST

# row 12 : trottoir cols 0-5, (12,6)=TROTTOIR_PLAIN, bords S carre cols 7-11, (12,12)=VIRAGE_INT_NE
for c in range(0, 7):
    ground[12][c] = TROTTOIR_PLAIN
for c in range(7, 12):
    ground[12][c] = BORD_SUD
ground[12][12] = VIRAGE_INT_NE

SNIPPET = {
    'name': 'virage_haut_gauche',
    'cols': COLS,
    'rows': ROWS,
    'ground': ground,
    'objects': [],
}
