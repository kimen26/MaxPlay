"""vocab.py — Source UNIQUE des tiles LimeZu pour MaxPlay (pipeline tile-tools).

🎯 Pourquoi ce fichier existe
────────────────────────────
Avant : chaque recette redéfinissait ses propres constantes (`ASPH_CENTRE = '...Variation_2.png'`).
Conséquences : conflit doc actif (cartography.json disait `_14` propre, LESSONS disait `_2` propre),
noms cryptiques imossibles à retenir, info éparpillée sur 3 fichiers, ~5 erreurs grossières
gravées par Claude sur tâches simples ("route droite propre").

Désormais : on importe les constantes d'ici. Plus de choix entre `_2` et `_14`. Plus d'erreur possible.

📚 Source de vérité
────────────────────
`~/.claude/skills/maxplay-tiles/LESSONS.md` — correction 5 du 2026-05-10 :
  • H propre = _2 (alias _6) ⭐ DÉFAUT marquage centre H
  • H sale   = _14 (anti-mono ≤10% UNIQUEMENT)
  • V propre = _8 (alias _4) ⭐ DÉFAUT marquage centre V
  • V sale   = _15 (anti-mono ≤10% UNIQUEMENT)
  • Croix carrefour = _13
  • Règle d'or : "monotone propre > varié sale"

⚠️ `cartography.json` est DEPRECATED (l'EP-VOCAB phase 7 le marque officiellement).

🧪 Validation
────────────
Lancer `python vocab.py` valide que chaque constante pointe vers un fichier qui existe
sur le disque. Si une tile est renommée/déplacée → l'import plante au démarrage.
"""

from __future__ import annotations

import os
import sys

# ─── Configuration ───────────────────────────────────────────────────────────

TILES_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles'

_ASPHALT_FMT = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_{n}.png'
_SIDEWALK_FMT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_{n}.png'


def _a(n: int) -> str:
    """Path tile Asphalt_1_Variation_<n>."""
    return _ASPHALT_FMT.format(n=n)


def _s(n: int) -> str:
    """Path tile Sidewalk_1_<n>."""
    return _SIDEWALK_FMT.format(n=n)


# ═══════════════════════════════════════════════════════════════════════════
#  ROUTE — marquages centraux
# ═══════════════════════════════════════════════════════════════════════════

# Ligne pointillée centrale — route 2 voies (1 sens chacune)
ROUTE_H_PROPRE: str = _a(2)   # ⭐ DÉFAUT marquage centre H
ROUTE_H_PROPRE_ALT: str = _a(6)   # équivalent (interchangeable)
ROUTE_H_SALE: str = _a(14)    # anti-mono UNIQUEMENT (≤10%)

ROUTE_V_PROPRE: str = _a(8)   # ⭐ DÉFAUT marquage centre V
ROUTE_V_PROPRE_ALT: str = _a(4)   # équivalent (interchangeable)
ROUTE_V_SALE: str = _a(15)    # anti-mono UNIQUEMENT (≤10%)


# ═══════════════════════════════════════════════════════════════════════════
#  ROUTE — asphalte plain (remplissage uniforme)
# ═══════════════════════════════════════════════════════════════════════════

ASPHALT_PLAIN: str = _a(20)         # ⭐ DÉFAUT remplissage asphalte
ASPHALT_PLAIN_ALT1: str = _a(22)    # variante (utiliser uniformément si choisie)
ASPHALT_PLAIN_ALT2: str = _a(27)    # variante très nette


# ═══════════════════════════════════════════════════════════════════════════
#  CARREFOUR — signal intersection + T-junctions
# ═══════════════════════════════════════════════════════════════════════════

CROIX_INTERSECTION: str = _a(13)    # ⭐ Centre carrefour 4 voies (signal +)

# T-junctions (la barre du T pointe vers la direction nommée)
T_JUNCTION_N: str = _a(12)
T_JUNCTION_S: str = _a(11)
T_JUNCTION_W: str = _a(5)
T_JUNCTION_E: str = _a(9)
T_JUNCTION_W_ALT: str = _a(10)


# ═══════════════════════════════════════════════════════════════════════════
#  CARREFOUR — coins asphalte intérieurs (route fait un "L")
# ═══════════════════════════════════════════════════════════════════════════

ASPH_COIN_INT_SE: str = _a(1)   # route forme L, coin asphalte intérieur en SE
ASPH_COIN_BORD_HAUT: str = _a(2)  # bordure haute (peut servir hors marquage)
ASPH_COIN_INT_SW: str = _a(3)
ASPH_LIGNE_V_SOLIDE: str = _a(4)  # ligne blanche solide V (centre 1 voie ou bord)
ASPH_COIN_INT_NE: str = _a(7)
ASPH_COIN_BORD_BAS: str = _a(6)


# ═══════════════════════════════════════════════════════════════════════════
#  TROTTOIR — plain & bordures (transition route ↔ trottoir)
# ═══════════════════════════════════════════════════════════════════════════

TROTTOIR_PLAIN: str = _s(9)         # ⭐ DÉFAUT trottoir uniforme (carrelé fin)
TROTTOIR_PLAIN_ALT: str = _s(27)    # variante PLAIN très nette (uniformément si choisie)

# Bordures = transition entre trottoir et asphalte (asphalte avec bandeau trottoir)
BORD_NORD: str = _s(6)   # asphalte avec trottoir au NORD (utilisé en row au-dessus de la route)
BORD_SUD: str = _s(2)    # asphalte avec trottoir au SUD (utilisé en row en-dessous de la route)
BORD_OUEST: str = _s(4)  # asphalte avec trottoir à l'OUEST (col à gauche de la route)
BORD_EST: str = _s(8)    # asphalte avec trottoir à l'EST (col à droite de la route)

# Aliases courts (compat recettes existantes)
BORD_N: str = BORD_NORD
BORD_S: str = BORD_SUD
BORD_W: str = BORD_OUEST
BORD_E: str = BORD_EST


# ═══════════════════════════════════════════════════════════════════════════
#  VIRAGE — 2 briques élémentaires par diagonale (validé Papa Yann 2026-05-12)
# ═══════════════════════════════════════════════════════════════════════════
#
# Un virage = COURBE EXT (gros arc trottoir côté extérieur du virage)
#           + POINT INT (petit accroche trottoir côté intérieur du virage)
#           + routes droites (route_h / route_v) qui mènent au virage
#           + asphalte plein dans l'angle entre les 2 routes
#
# Convention : le suffixe (SE/SW/NE/NW) indique vers QUELLE diagonale
# pointe la tile (où est le coin du trottoir / le centre de la courbe).
#
# Source de vérité : brick-explorer.html validé 2026-05-12.
# Les tiles Sidewalk_2_X ont exactement la même sémantique (variante beige).

# Petit accroche trottoir côté intérieur du virage (= côté concave de la route)
POINT_INT_SE: str = _s(1)   # trottoir s'avance vers SE dans l'asphalte
POINT_INT_SW: str = _s(3)   # vers SW
POINT_INT_NE: str = _s(5)   # vers NE
POINT_INT_NW: str = _s(7)   # vers NW

# Gros arc trottoir côté extérieur du virage (= côté convexe de la route)
COURBE_EXT_SE: str = _s(11)  # trottoir gros arc convexe SE
COURBE_EXT_SW: str = _s(12)  # SW
COURBE_EXT_NW: str = _s(13)  # NW
COURBE_EXT_NE: str = _s(14)  # NE

# ── Aliases dépréciés (compat avec recettes existantes — à migrer puis supprimer)
COIN_INT_SE: str = POINT_INT_SE
COIN_INT_SW: str = POINT_INT_SW
COIN_INT_NE: str = POINT_INT_NE
COIN_INT_NW: str = POINT_INT_NW
VIRAGE_INT_SE: str = COURBE_EXT_SE
VIRAGE_INT_SW: str = COURBE_EXT_SW
VIRAGE_INT_NW: str = COURBE_EXT_NW
VIRAGE_INT_NE: str = COURBE_EXT_NE


# ═══════════════════════════════════════════════════════════════════════════
#  MARQUAGES — voies bus, parking
# ═══════════════════════════════════════════════════════════════════════════

MARQUAGE_BUS_G: str = _s(48)   # mot "BUS" voie gauche (inclut bord blanc gauche)
MARQUAGE_BUS_D: str = _s(49)   # mot "BUS" voie droite (inclut bord blanc droit)

MARQUAGE_P_HAUT: str = _s(45)  # marquage parking — extrémité haute
MARQUAGE_P_BAS: str = _s(46)   # marquage parking — extrémité basse


# ═══════════════════════════════════════════════════════════════════════════
#  PASSAGES PIÉTONS
# ═══════════════════════════════════════════════════════════════════════════

# Passage piéton VERTICAL (traverse une route horizontale)
PASSAGE_V_HAUT: str = _s(29)       # extrémité haute (bord trottoir blanc en haut)
PASSAGE_V_MID: str = _s(30)        # section milieu (2 bandes blanches)
PASSAGE_V_MID_ALT: str = _s(31)    # variante milieu


# ═══════════════════════════════════════════════════════════════════════════
#  REGISTRY — pour validation auto et listing
# ═══════════════════════════════════════════════════════════════════════════

# Toutes les constantes string définies ci-dessus. Utilisé par _validate().
_REGISTRY: dict[str, str] = {
    name: value
    for name, value in globals().items()
    if (
        not name.startswith('_')
        and name.isupper()
        and isinstance(value, str)
        and value.startswith('roads/')
        and '{n}' not in value
    )
}


# ═══════════════════════════════════════════════════════════════════════════
#  VALIDATION — lancer `python vocab.py`
# ═══════════════════════════════════════════════════════════════════════════

def _validate() -> int:
    """Vérifie que chaque constante pointe vers un fichier existant.

    Retourne 0 si tout est OK, sinon le nombre d'erreurs.
    Ce check est rapide (~50 stat() calls) et tourne au boot.
    """
    errors: list[str] = []
    for name, rel_path in sorted(_REGISTRY.items()):
        full = os.path.join(TILES_DIR, rel_path)
        if not os.path.isfile(full):
            errors.append(f"  ❌ {name:25s} → {rel_path}  (introuvable)")

    total = len(_REGISTRY)
    if errors:
        print(f"❌ vocab.py : {len(errors)}/{total} tiles manquantes")
        for e in errors:
            print(e)
        return len(errors)

    print(f"✅ vocab.py : {total} constantes valides (toutes les tiles existent)")
    return 0


def _print_catalog() -> None:
    """Liste toutes les constantes par thème (utile en debug)."""
    themes = [
        ("ROUTE marquages", ["ROUTE_H_PROPRE", "ROUTE_H_PROPRE_ALT", "ROUTE_H_SALE",
                             "ROUTE_V_PROPRE", "ROUTE_V_PROPRE_ALT", "ROUTE_V_SALE"]),
        ("ASPHALT plain", ["ASPHALT_PLAIN", "ASPHALT_PLAIN_ALT1", "ASPHALT_PLAIN_ALT2"]),
        ("CARREFOUR", ["CROIX_INTERSECTION", "T_JUNCTION_N", "T_JUNCTION_S",
                       "T_JUNCTION_W", "T_JUNCTION_E", "T_JUNCTION_W_ALT"]),
        ("ASPH coins", ["ASPH_COIN_INT_SE", "ASPH_COIN_INT_SW", "ASPH_COIN_INT_NE",
                        "ASPH_LIGNE_V_SOLIDE", "ASPH_COIN_BORD_HAUT", "ASPH_COIN_BORD_BAS"]),
        ("TROTTOIR plain & bords", ["TROTTOIR_PLAIN", "TROTTOIR_PLAIN_ALT",
                                    "BORD_NORD", "BORD_SUD", "BORD_OUEST", "BORD_EST"]),
        ("TROTTOIR coins", ["COIN_INT_NE", "COIN_INT_NW", "COIN_INT_SE", "COIN_INT_SW"]),
        ("VIRAGES", ["VIRAGE_INT_NE", "VIRAGE_INT_NW", "VIRAGE_INT_SE", "VIRAGE_INT_SW"]),
        ("MARQUAGES", ["MARQUAGE_BUS_G", "MARQUAGE_BUS_D", "MARQUAGE_P_HAUT", "MARQUAGE_P_BAS"]),
        ("PASSAGES PIÉTONS", ["PASSAGE_V_HAUT", "PASSAGE_V_MID", "PASSAGE_V_MID_ALT"]),
    ]
    for theme, names in themes:
        print(f"\n### {theme}")
        for n in names:
            v = globals().get(n)
            if v:
                short = v.split('Variation_')[-1] if '_Variation_' in v else v.split('Sidewalk_1_')[-1]
                short = short.replace('.png', '')
                print(f"  {n:25s} = ...{short}")


if __name__ == '__main__':
    rc = _validate()
    if '--catalog' in sys.argv:
        _print_catalog()
    sys.exit(rc)
