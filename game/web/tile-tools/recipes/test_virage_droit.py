"""Virage droit — 13x13. Version v2 2026-05-12.

Route 3-chaussees (7-wide) en L miroir horizontal, pivot haut-gauche.
Branche H arrive de l'EST (rows 0-6), branche V descend vers le SUD (cols 0-6).
Carre intersection rows 0-6 x cols 0-6. Zone None rows 7-12 x cols 7-12.

Schema:
  - Branche H : rows 0-6, cols 0-12 (marquage H sur row 3 cols 7-12)
  - Branche V : cols 0-6, rows 7-12 (marquage V sur col 3 rows 7-11)
  - Coins : (0,0)=VIRAGE_INT_SW, (6,6)=COIN_INT_SE
  - Coins neutres : (0,6)=TROTTOIR_PLAIN, (6,0)=TROTTOIR_PLAIN
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from vocab import (
    TROTTOIR_PLAIN,
    BORD_NORD, BORD_SUD, BORD_OUEST, BORD_EST,
    ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2,
    ROUTE_H_PROPRE, ROUTE_V_PROPRE,
    COIN_INT_SE,
    VIRAGE_INT_SW,
)

_VOIE_POOL = [ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2]


def _asph(r: int, c: int) -> str:
    return _VOIE_POOL[(r + c) % 3]


COLS, ROWS = 13, 13

# Init grille None
ground = [[None] * COLS for _ in range(ROWS)]

# ── row 0 : trottoir partout, (0,0)=VIRAGE_INT_SW ─────────────────────────
ground[0][0] = VIRAGE_INT_SW
for c in range(1, COLS):
    ground[0][c] = TROTTOIR_PLAIN

# ── rows 1-5 : toute la branche H ─────────────────────────────────────────
# Carre (cols 0-6) : bord O col 0, asphalte plain cols 1-5, bord E col 6
# Branche pure (cols 7-12) : bord N row 1, asphalte rows 2+4, marquage row 3, bord S row 5
for r in range(1, 6):
    # Carre cols 0-6
    ground[r][0] = BORD_OUEST
    for c in range(1, 6):
        ground[r][c] = _asph(r, c)
    ground[r][6] = BORD_EST
    # Branche pure cols 7-12
    for c in range(7, 13):
        if r == 1:
            ground[r][c] = BORD_NORD
        elif r == 2:
            ground[r][c] = _asph(r, c)
        elif r == 3:
            ground[r][c] = ROUTE_H_PROPRE
        elif r == 4:
            ground[r][c] = _asph(r, c)
        elif r == 5:
            ground[r][c] = BORD_SUD

# ── row 6 : (6,0)=TROTTOIR_PLAIN, bords S carre cols 1-5, (6,6)=COIN_INT_SE, trottoir cols 7-12
ground[6][0] = TROTTOIR_PLAIN
for c in range(1, 6):
    ground[6][c] = BORD_SUD
ground[6][6] = COIN_INT_SE
for c in range(7, COLS):
    ground[6][c] = TROTTOIR_PLAIN

# ── Branche V : cols 0-6, rows 7-12 ──────────────────────────────────────
for r in range(7, 12):
    ground[r][0] = BORD_OUEST
    ground[r][1] = _asph(r, 1)
    ground[r][2] = _asph(r, 2)
    ground[r][3] = ROUTE_V_PROPRE   # marquage V col 3
    ground[r][4] = _asph(r, 4)
    ground[r][5] = _asph(r, 5)
    ground[r][6] = BORD_EST

# row 12 : trottoir cols 0-6
for c in range(0, 7):
    ground[12][c] = TROTTOIR_PLAIN

SNIPPET = {
    'name': 'virage_droit',
    'cols': COLS,
    'rows': ROWS,
    'ground': ground,
    'objects': [],
}
