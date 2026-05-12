"""styles.py — Catalogue des 6 styles de trottoir LimeZu.

Decouvert le 2026-05-12 (planches comparatives Papa Yann) :
chaque forme geometrique du tileset existe en 6 variantes de couleur
(les 6 tilesets Sidewalk_1 a Sidewalk_6).

Nom des styles selon couleur visible du trottoir plain (tile #9) :
    blanc      = SW_1 (blanc casse, le plus clair)
    beige      = SW_2 (creme/jaune leger)        <- DEFAUT
    gris_bleu  = SW_3 (gris avec teinte bleue)
    jaune      = SW_4 (jaunatre)
    bleu       = SW_5 (bleu froid)
    gris       = SW_6 (gris neutre)

Particularite SW_1 : les numeros de tile #11 a #20 sont DIFFERENTS de SW_2-6.
Pour utiliser le style 'blanc', il faut appliquer la table de mapping :
    ref# (SW_2-6) -> sw1#
        11 -> 20      (bordure rayee H type a)
        12 -> 19      (bordure rayee H type b)
        13 -> 11      (grosse courbe NW)
        14 -> 12      (grosse courbe NE)
        15 -> 13      (grosse courbe NW + bord)
        16 -> 14      (grosse courbe NE + bord)
        17 -> 15      (bord V pur)
        18 -> 16      (coin NW)
        19 -> 17      (coin NE)
        20 -> 18      (bord + coin)
        autres -> identique

API publique :
    tile('blanc', 9)         -> chemin tile blanche plain
    tile('beige', 13)        -> chemin tile beige grosse courbe NW
    tile_for_form('blanc', 'COURBE_EXT_NW')  -> meme chose, par nom logique

Validation : compare_tilesets_final.py confirme visuellement chaque ligne.
"""

from __future__ import annotations

# ── Constantes nommees ────────────────────────────────────────────────────────

STYLES = ('blanc', 'beige', 'gris_bleu', 'jaune', 'bleu', 'gris')
STYLE_DEFAULT = 'beige'

# Mapping style -> numero de tileset Sidewalk_<n>
_STYLE_TO_FAMILY: dict[str, int] = {
    'blanc':     1,
    'beige':     2,
    'gris_bleu': 3,
    'jaune':     4,
    'bleu':      5,
    'gris':      6,
}

# Mapping ref# (SW_2-6) -> sw1# pour la plage 11-20
# Hors plage : identite.
_SW1_REMAP: dict[int, int] = {
    11: 20, 12: 19,
    13: 11, 14: 12, 15: 13, 16: 14,
    17: 15, 18: 16, 19: 17, 20: 18,
}

_TILE_FMT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_{family}_{n}.png'


def _resolve_n(style: str, n_ref: int) -> int:
    """Convertit un numero de tile ref (base SW_2-6) vers son numero reel
    dans le tileset cible. Pour 'blanc' (SW_1), applique le remap 11-20.
    """
    if style == 'blanc':
        return _SW1_REMAP.get(n_ref, n_ref)
    return n_ref


def tile(style: str, n_ref: int) -> str:
    """Retourne le chemin tile pour (style, numero ref SW_2-6).

    >>> tile('beige', 9)   # trottoir plain beige
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_2_9.png'
    >>> tile('blanc', 13)  # grosse courbe NW blanche (mappee a SW_1_11)
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_11.png'
    """
    if style not in _STYLE_TO_FAMILY:
        raise ValueError(f"Style inconnu : {style!r}. Connus : {STYLES}")
    family = _STYLE_TO_FAMILY[style]
    n = _resolve_n(style, n_ref)
    return _TILE_FMT.format(family=family, n=n)


# ── Constantes numero -> forme geometrique (base SW_2-6) ─────────────────────
#
# Cette table documente CE qu'est chaque numero. Utilisable pour generer
# des constantes nommees dynamiquement si besoin.

FORM_N: dict[str, int] = {
    # Bords / coins de transition trottoir/asphalte
    'BORD_INT_SE_PETIT':       1,   # asphalte avec petit angle trottoir SE
    'BORD_SUD':                2,
    'BORD_INT_SW_PETIT':       3,
    'BORD_OUEST':              4,
    'BORD_INT_NE_PETIT':       5,
    'BORD_NORD':               6,
    'BORD_INT_NW_PETIT':       7,
    'BORD_EST':                8,
    'TROTTOIR_PLAIN':          9,
    'TROTTOIR_PLAIN_ALT':      10,  # variation tile carrele un peu different
    # Plage particuliere (necessite remap pour 'blanc')
    'BORDURE_RAYEE_H_A':       11,  # liseré horizontal type A
    'BORDURE_RAYEE_H_B':       12,  # liseré horizontal type B
    'COURBE_EXT_NW':           13,  # grosse courbe trottoir convexe NW
    'COURBE_EXT_NE':           14,  # grosse courbe trottoir convexe NE
    'COURBE_EXT_NW_BORD':      15,
    'COURBE_EXT_NE_BORD':      16,
    'BORD_V_PUR':              17,
    'COIN_NW':                 18,
    'COIN_NE':                 19,
    'BORD_COIN_ALT':           20,
    # Pentes
    'PENTE_TRIANGLE_SW':       21,
    'PENTE_TRIANGLE_SE':       22,
}


def tile_for_form(style: str, form_name: str) -> str:
    """Retourne le chemin tile pour (style, nom logique de forme).

    >>> tile_for_form('beige', 'COURBE_EXT_NW')
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_2_13.png'
    >>> tile_for_form('blanc', 'COURBE_EXT_NW')
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_11.png'
    """
    if form_name not in FORM_N:
        raise ValueError(f"Forme inconnue : {form_name!r}. Voir FORM_N.keys()")
    return tile(style, FORM_N[form_name])
