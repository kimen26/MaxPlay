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
    """Construit une route HORIZONTALE 2 voies (1 sens chacune).

    Structure si `trottoirs=True` (5 rows × `longueur` cols) :

        row 0 │ trottoir       trottoir       trottoir       trottoir
        row 1 │ bord-N         bord-N         bord-N         bord-N
        row 2 │ marquage H     marquage H     marquage H     marquage H
        row 3 │ bord-S         bord-S         bord-S         bord-S
        row 4 │ trottoir       trottoir       trottoir       trottoir

    Si `trottoirs=False` : juste la row 2 (1 row × `longueur` cols).

    Args:
        longueur: nombre de colonnes (cellules de 48px).
        trottoirs: True ajoute 2 rows trottoir nord + 2 rows trottoir sud.
        anti_mono_cols: indices de colonnes (0-based) où poser ROUTE_H_SALE
            au lieu de ROUTE_H_PROPRE. LESSONS : ≤10% MAX, défaut = `()` (tout propre).

    Returns:
        Ground (liste de rows). Hauteur = 5 si trottoirs, 1 sinon.

    Raises:
        ValueError: si longueur < 1 ou si un index anti_mono_cols est hors bornes.
    """
    if longueur < 1:
        raise ValueError(f"longueur doit etre >= 1, recu {longueur}")
    dirty = set(anti_mono_cols)
    out_of_range = [c for c in dirty if c < 0 or c >= longueur]
    if out_of_range:
        raise ValueError(f"anti_mono_cols hors bornes [0..{longueur-1}] : {out_of_range}")

    centre_row: Row = [
        ROUTE_H_SALE if c in dirty else ROUTE_H_PROPRE
        for c in range(longueur)
    ]

    if not trottoirs:
        return [centre_row]

    return [
        [TROTTOIR_PLAIN] * longueur,
        [BORD_NORD] * longueur,
        centre_row,
        [BORD_SUD] * longueur,
        [TROTTOIR_PLAIN] * longueur,
    ]


def route_v(
    hauteur: int,
    *,
    trottoirs: bool = True,
    anti_mono_rows: Iterable[int] = (),
) -> Ground:
    """Construit une route VERTICALE 2 voies (1 sens chacune).

    Structure si `trottoirs=True` (`hauteur` rows × 5 cols) :

              col 0       col 1     col 2       col 3     col 4
        row r │ trottoir   bord-W   marquage V  bord-E   trottoir
        row r │ trottoir   bord-W   marquage V  bord-E   trottoir
        ...

    Si `trottoirs=False` : juste 1 col centrale (`hauteur` rows × 1 col).

    Args:
        hauteur: nombre de rows (cellules de 48px).
        trottoirs: True ajoute 2 cols trottoir ouest + 2 cols trottoir est.
        anti_mono_rows: indices de rows (0-based) où poser ROUTE_V_SALE
            au lieu de ROUTE_V_PROPRE. LESSONS : ≤10% MAX, défaut = `()` (tout propre).

    Returns:
        Ground (liste de rows). Largeur = 5 si trottoirs, 1 sinon.

    Raises:
        ValueError: si hauteur < 1 ou si un index anti_mono_rows est hors bornes.
    """
    if hauteur < 1:
        raise ValueError(f"hauteur doit etre >= 1, recu {hauteur}")
    dirty = set(anti_mono_rows)
    out_of_range = [r for r in dirty if r < 0 or r >= hauteur]
    if out_of_range:
        raise ValueError(f"anti_mono_rows hors bornes [0..{hauteur-1}] : {out_of_range}")

    if not trottoirs:
        return [
            [ROUTE_V_SALE if r in dirty else ROUTE_V_PROPRE]
            for r in range(hauteur)
        ]

    ground: Ground = []
    for r in range(hauteur):
        centre_tile = ROUTE_V_SALE if r in dirty else ROUTE_V_PROPRE
        ground.append([
            TROTTOIR_PLAIN,
            BORD_OUEST,
            centre_tile,
            BORD_EST,
            TROTTOIR_PLAIN,
        ])
    return ground


# ═══════════════════════════════════════════════════════════════════════════
#  TESTS — sanity checks (lancer `python builders.py`)
# ═══════════════════════════════════════════════════════════════════════════

def _test_route_h() -> None:
    # Cas 1 : trottoirs + tout propre
    g = route_h(longueur=14)
    assert len(g) == 5, f"5 rows attendues, got {len(g)}"
    assert all(len(row) == 14 for row in g), "toutes les rows doivent faire 14 cols"
    assert g[2][0] == ROUTE_H_PROPRE, "row 2 col 0 = ROUTE_H_PROPRE attendu"
    assert g[1][0] == BORD_NORD
    assert g[3][0] == BORD_SUD
    assert g[0][0] == TROTTOIR_PLAIN

    # Cas 2 : anti-mono
    g2 = route_h(longueur=14, anti_mono_cols=[4, 10])
    assert g2[2][4] == ROUTE_H_SALE, "col 4 doit etre SALE"
    assert g2[2][10] == ROUTE_H_SALE
    assert g2[2][5] == ROUTE_H_PROPRE

    # Cas 3 : sans trottoirs
    g3 = route_h(longueur=10, trottoirs=False)
    assert len(g3) == 1, "sans trottoirs = 1 row"
    assert len(g3[0]) == 10

    # Cas 4 : erreurs
    try:
        route_h(longueur=0)
        assert False, "longueur 0 doit lever ValueError"
    except ValueError:
        pass
    try:
        route_h(longueur=5, anti_mono_cols=[10])
        assert False, "anti_mono hors bornes doit lever ValueError"
    except ValueError:
        pass

    print("  ✅ route_h : 4 cas OK")


def _test_route_v() -> None:
    # Cas 1 : trottoirs + tout propre
    g = route_v(hauteur=10)
    assert len(g) == 10, f"10 rows attendues, got {len(g)}"
    assert all(len(row) == 5 for row in g), "toutes les rows doivent faire 5 cols"
    assert g[0][2] == ROUTE_V_PROPRE
    assert g[0][1] == BORD_OUEST
    assert g[0][3] == BORD_EST
    assert g[0][0] == TROTTOIR_PLAIN

    # Cas 2 : anti-mono
    g2 = route_v(hauteur=10, anti_mono_rows=[3, 7])
    assert g2[3][2] == ROUTE_V_SALE
    assert g2[7][2] == ROUTE_V_SALE
    assert g2[4][2] == ROUTE_V_PROPRE

    # Cas 3 : sans trottoirs
    g3 = route_v(hauteur=10, trottoirs=False)
    assert len(g3) == 10
    assert len(g3[0]) == 1

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

    print("  ✅ route_v : 4 cas OK")


if __name__ == '__main__':
    print("Tests builders.py")
    _test_route_h()
    _test_route_v()
    print("\n✅ Tous les tests passent.")
