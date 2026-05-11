"""builders.py — Macros haut-niveau pour composer des scènes MaxPlay.

🎯 Pourquoi
────────────
Avant : chaque recette codait à la main une boucle for sur la grille avec choix manuel
des tiles → erreurs systématiques (mauvaise tile, oubli de bordure, anti-mono cassé).

Désormais : on appelle des fonctions testées qui retournent des grilles `ground` prêtes
pour le `SNIPPET` attendu par render.py. Plus de choix de tile à faire.

📚 Conventions
─────────────
• Chaque builder retourne une LISTE DE ROWS (chaque row = liste de tile paths).
• `ground` peut être passé tel quel au render via `SNIPPET = {..., 'ground': ground}`.
• Pour composer plusieurs builders, voir `Scene` en bas de fichier.

🧪 Tests
────────
Lancer `python builders.py` exécute les sanity checks (dimensions, contenu).
Les tests visuels (comparaison PNG) sont dans les recettes `recipes/test_*_v2.py`.
"""

from __future__ import annotations

from typing import Iterable

from vocab import (
    ASPHALT_PLAIN,
    ASPHALT_PLAIN_ALT1,
    ASPHALT_PLAIN_ALT2,
    BORD_EST,
    BORD_NORD,
    BORD_OUEST,
    BORD_SUD,
    ROUTE_H_PROPRE,
    ROUTE_H_SALE,
    ROUTE_V_PROPRE,
    ROUTE_V_SALE,
    TROTTOIR_PLAIN,
)

# Pool de 3 variantes plain pour casser la mono "tâches répétées" sur les voies.
# Validation Papa Yann 2026-05-11 : sans alternance, on voit le même motif texture
# partout, ça fait artificiel.
_VOIE_POOL = [ASPHALT_PLAIN, ASPHALT_PLAIN_ALT1, ASPHALT_PLAIN_ALT2]

# Type alias pour clarté
Row = list[str]
Ground = list[Row]


# ═══════════════════════════════════════════════════════════════════════════
#  ROUTES — ligne droite horizontale ou verticale
# ═══════════════════════════════════════════════════════════════════════════

def route_h(
    longueur: int,
    *,
    trottoirs: bool = True,
    anti_mono_cols: Iterable[int] = (),
) -> Ground:
    """Construit une route HORIZONTALE 2 voies (1 sens par voie) — vraie largeur LimeZu.

    Validée 2026-05-11 sur planches officielles LimeZu :
    3 rows d'asphalte (voie ←, marquage central pointillé, voie →) au lieu d'1 seule.

    Structure si `trottoirs=True` (7 rows × `longueur` cols) :

        row 0 │ trottoir       trottoir       trottoir       trottoir
        row 1 │ bord-N         bord-N         bord-N         bord-N
        row 2 │ asphalte       asphalte       asphalte       asphalte    ← voie ←
        row 3 │ marquage H     marquage H     marquage H     marquage H  ← séparation
        row 4 │ asphalte       asphalte       asphalte       asphalte    ← voie →
        row 5 │ bord-S         bord-S         bord-S         bord-S
        row 6 │ trottoir       trottoir       trottoir       trottoir

    Si `trottoirs=False` : 3 rows (asphalte / marquage / asphalte) sans bordures ni trottoirs.

    Args:
        longueur: nombre de colonnes (cellules de 48px).
        trottoirs: True ajoute bordures + 2 rows trottoir N/S.
        anti_mono_cols: indices de colonnes (0-based) où poser ROUTE_H_SALE
            au lieu de ROUTE_H_PROPRE sur la row marquage. LESSONS : ≤10% MAX.

    Returns:
        Ground (liste de rows). Hauteur = 7 si trottoirs, 3 sinon.

    Raises:
        ValueError: si longueur < 1 ou si un index anti_mono_cols est hors bornes.
    """
    if longueur < 1:
        raise ValueError(f"longueur doit etre >= 1, recu {longueur}")
    dirty = set(anti_mono_cols)
    out_of_range = [c for c in dirty if c < 0 or c >= longueur]
    if out_of_range:
        raise ValueError(f"anti_mono_cols hors bornes [0..{longueur-1}] : {out_of_range}")

    # Voies asphalte : alternance déterministe entre les 3 plains (_20, _22, _27)
    # pour casser la mono "même tâche partout". Voie sud décalée d'1 vs voie nord.
    voie_nord: Row = [_VOIE_POOL[c % 3] for c in range(longueur)]
    voie_sud: Row = [_VOIE_POOL[(c + 1) % 3] for c in range(longueur)]
    centre_row: Row = [
        ROUTE_H_SALE if c in dirty else ROUTE_H_PROPRE
        for c in range(longueur)
    ]

    if not trottoirs:
        return [voie_nord, centre_row, voie_sud]

    return [
        [TROTTOIR_PLAIN] * longueur,
        [BORD_NORD] * longueur,
        voie_nord,
        centre_row,
        voie_sud,
        [BORD_SUD] * longueur,
        [TROTTOIR_PLAIN] * longueur,
    ]


def route_v(
    hauteur: int,
    *,
    trottoirs: bool = True,
    anti_mono_rows: Iterable[int] = (),
) -> Ground:
    """Construit une route VERTICALE 2 voies (1 sens par voie) — vraie largeur LimeZu.

    Validée 2026-05-11 : 3 cols d'asphalte (voie ↑, marquage central pointillé, voie ↓).

    Structure si `trottoirs=True` (`hauteur` rows × 7 cols) :

              col 0       col 1     col 2      col 3        col 4      col 5    col 6
        row r │ trottoir   bord-W   asphalte   marquage V   asphalte   bord-E   trottoir
        ...

    Si `trottoirs=False` : 3 cols (asphalte / marquage / asphalte).

    Args:
        hauteur: nombre de rows (cellules de 48px).
        trottoirs: True ajoute bordures + 2 cols trottoir O/E.
        anti_mono_rows: indices de rows (0-based) où poser ROUTE_V_SALE
            au lieu de ROUTE_V_PROPRE sur la col marquage. LESSONS : ≤10% MAX.

    Returns:
        Ground (liste de rows). Largeur = 7 si trottoirs, 3 sinon.

    Raises:
        ValueError: si hauteur < 1 ou si un index anti_mono_rows est hors bornes.
    """
    if hauteur < 1:
        raise ValueError(f"hauteur doit etre >= 1, recu {hauteur}")
    dirty = set(anti_mono_rows)
    out_of_range = [r for r in dirty if r < 0 or r >= hauteur]
    if out_of_range:
        raise ValueError(f"anti_mono_rows hors bornes [0..{hauteur-1}] : {out_of_range}")

    # Voies asphalte : alternance déterministe (voie ouest = row % 3, voie est décalée +1)
    if not trottoirs:
        return [
            [
                _VOIE_POOL[r % 3],
                ROUTE_V_SALE if r in dirty else ROUTE_V_PROPRE,
                _VOIE_POOL[(r + 1) % 3],
            ]
            for r in range(hauteur)
        ]

    ground: Ground = []
    for r in range(hauteur):
        centre_tile = ROUTE_V_SALE if r in dirty else ROUTE_V_PROPRE
        ground.append([
            TROTTOIR_PLAIN,
            BORD_OUEST,
            _VOIE_POOL[r % 3],
            centre_tile,
            _VOIE_POOL[(r + 1) % 3],
            BORD_EST,
            TROTTOIR_PLAIN,
        ])
    return ground


# ═══════════════════════════════════════════════════════════════════════════
#  TESTS — sanity checks (lancer `python builders.py`)
# ═══════════════════════════════════════════════════════════════════════════

def _test_route_h() -> None:
    # Cas 1 : trottoirs + tout propre (7 rows depuis 2026-05-11)
    g = route_h(longueur=14)
    assert len(g) == 7, f"7 rows attendues (3 chaussee + bordures + trottoirs), got {len(g)}"
    assert all(len(row) == 14 for row in g)
    assert g[0][0] == TROTTOIR_PLAIN
    assert g[1][0] == BORD_NORD
    assert g[2][0] in _VOIE_POOL, "row 2 = voie nord (plain alterné)"
    assert g[3][0] == ROUTE_H_PROPRE, "row 3 = marquage central"
    assert g[4][0] in _VOIE_POOL, "row 4 = voie sud (plain alterné)"
    assert g[5][0] == BORD_SUD
    assert g[6][0] == TROTTOIR_PLAIN
    # Alternance vérifiée : col 0 et col 3 doivent être identiques (cycle de 3)
    assert g[2][0] == g[2][3], "voies alternent en cycle 3 (col 0 == col 3)"

    # Cas 2 : anti-mono sur la row marquage (row 3)
    g2 = route_h(longueur=14, anti_mono_cols=[4, 10])
    assert g2[3][4] == ROUTE_H_SALE
    assert g2[3][10] == ROUTE_H_SALE
    assert g2[3][5] == ROUTE_H_PROPRE
    assert g2[2][4] in _VOIE_POOL, "voie nord pas affectee par anti-mono"

    # Cas 3 : sans trottoirs = 3 rows (asphalte / marquage / asphalte)
    g3 = route_h(longueur=10, trottoirs=False)
    assert len(g3) == 3
    assert g3[0][0] in _VOIE_POOL
    assert g3[1][0] == ROUTE_H_PROPRE
    assert g3[2][0] in _VOIE_POOL

    # Cas 4 : erreurs
    try:
        route_h(longueur=0)
        assert False, "longueur 0 doit lever ValueError"
    except ValueError:
        pass
    try:
        route_h(longueur=5, anti_mono_cols=[10])
        assert False
    except ValueError:
        pass

    print("  ✅ route_h (7 rows, 3 chaussee) : 4 cas OK")


def _test_route_v() -> None:
    # Cas 1 : trottoirs + tout propre (7 cols depuis 2026-05-11)
    g = route_v(hauteur=10)
    assert len(g) == 10
    assert all(len(row) == 7 for row in g), f"7 cols attendues, got {len(g[0])}"
    assert g[0][0] == TROTTOIR_PLAIN
    assert g[0][1] == BORD_OUEST
    assert g[0][2] in _VOIE_POOL, "col 2 = voie ouest (plain alterné)"
    assert g[0][3] == ROUTE_V_PROPRE, "col 3 = marquage central"
    assert g[0][4] in _VOIE_POOL, "col 4 = voie est (plain alterné)"
    assert g[0][5] == BORD_EST
    assert g[0][6] == TROTTOIR_PLAIN
    # Alternance vérifiée : row 0 et row 3 doivent être identiques
    assert g[0][2] == g[3][2], "voies alternent en cycle 3 (row 0 == row 3)"

    # Cas 2 : anti-mono sur la col marquage (col 3)
    g2 = route_v(hauteur=10, anti_mono_rows=[3, 7])
    assert g2[3][3] == ROUTE_V_SALE
    assert g2[7][3] == ROUTE_V_SALE
    assert g2[4][3] == ROUTE_V_PROPRE

    # Cas 3 : sans trottoirs = 3 cols (asphalte / marquage / asphalte)
    g3 = route_v(hauteur=10, trottoirs=False)
    assert len(g3) == 10
    assert len(g3[0]) == 3
    assert g3[0][0] in _VOIE_POOL
    assert g3[0][1] == ROUTE_V_PROPRE
    assert g3[0][2] in _VOIE_POOL

    # Cas 4 : erreurs
    try:
        route_v(hauteur=0)
        assert False
    except ValueError:
        pass
    try:
        route_v(hauteur=5, anti_mono_rows=[10])
        assert False
    except ValueError:
        pass

    print("  ✅ route_v (7 cols, 3 chaussee) : 4 cas OK")


if __name__ == '__main__':
    print("Tests builders.py")
    _test_route_h()
    _test_route_v()
    print("\n✅ Tous les tests passent.")
