"""Virage gauche — 13x13. Version v2 2026-05-12.

Route 3-chaussees (7-wide) en L, pivot haut-droit.
Branche H arrive de l'OUEST (rows 0-6), descend vers le SUD (cols 6-12).
Carre intersection rows 0-6 x cols 6-12. Zone None rows 7-12 x cols 0-5.

Schema:
  - Branche H : rows 0-6, cols 0-12 (avec marquage H sur row 3 cols 0-5)
  - Branche V : cols 6-12, rows 7-12 (avec marquage V sur col 9 rows 7-11)
  - Coins : (0,12)=VIRAGE_INT_SE, (6,6)=COIN_INT_SW
  - Coins neutres : (0,6)=TROTTOIR_PLAIN, (6,12)=TROTTOIR_PLAIN
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from vocab import (
    TROTTOIR_PLAIN,
    BORD_NORD, BORD_SUD, BORD_OUEST, BORD_EST,
    ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2,
    ROUTE_H_PROPRE, ROUTE_V_PROPRE,
    COIN_INT_SW,
    VIRAGE_INT_SE,
)

_VOIE_POOL = [ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2]


def _asph(r: int, c: int) -> str:
    return _VOIE_POOL[(r + c) % 3]


COLS, ROWS = 13, 13

# Init grille None
ground = [[None] * COLS for _ in range(ROWS)]

# ── Branche H : rows 0-6, cols 0-12 ─────────────────────────────────────────
# row 0 : trottoir sauf (0,12)=VIRAGE_INT_SE
for c in range(COLS):
    ground[0][c] = TROTTOIR_PLAIN
ground[0][12] = VIRAGE_INT_SE

# rows 1-5 : bords + asphalte + marquage central
for c in range(COLS):
    ground[1][c] = BORD_NORD if c <= 5 else _asph(1, c)  # bord N sur branche pure, asph dans carre
    ground[2][c] = _asph(2, c)
    ground[3][c] = ROUTE_H_PROPRE if c <= 5 else _asph(3, c)  # marquage H branche pure seulement
    ground[4][c] = _asph(4, c)
    ground[5][c] = BORD_SUD if c <= 5 else _asph(5, c)   # bord S sur branche pure, asph dans carre

# row 6 : trottoir a gauche (cols 0-5), COIN_INT_SW a (6,6), bords S du carre (cols 7-11), trottoir (6,12)
for c in range(6):
    ground[6][c] = TROTTOIR_PLAIN
ground[6][6] = COIN_INT_SW
for c in range(7, 12):
    ground[6][c] = BORD_SUD
ground[6][12] = TROTTOIR_PLAIN

# Bord EST de la branche H (col 12, rows 1-5) — deja rempli par asph dans carre : corriger
# Le carre (rows 0-6 x cols 6-12) doit avoir bord E sur col 12
for r in range(1, 6):
    ground[r][12] = BORD_EST

# ── Branche V : cols 6-12, rows 7-12 ─────────────────────────────────────────
for r in range(7, 12):
    ground[r][6] = BORD_OUEST
    ground[r][7] = _asph(r, 7)
    ground[r][8] = _asph(r, 8)
    ground[r][9] = ROUTE_V_PROPRE   # marquage V col 9
    ground[r][10] = _asph(r, 10)
    ground[r][11] = _asph(r, 11)
    ground[r][12] = BORD_EST

# row 12 : trottoir
for c in range(6, COLS):
    ground[12][c] = TROTTOIR_PLAIN

SNIPPET = {
    'name': 'virage_gauche',
    'cols': COLS,
    'rows': ROWS,
    'ground': ground,
    'objects': [],
}
