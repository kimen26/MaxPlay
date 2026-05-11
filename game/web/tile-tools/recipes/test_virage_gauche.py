"""Virage gauche : route arrive du haut-gauche (OUEST), descend vers le bas.

Layout 6x9 minimal (None partout sauf le L).
- L pivote en haut-droite du canvas
- Branche OUEST en haut : rows 1-3, cols 0-4 (chaussee row 2, bords row 1 + row 3)
- Pivot row 2 col 4 : asph_3 (PIVOT_L SW)
- Branche descendante : col 4 rows 3-8 (sw_4 col 3, asph_8 col 4, sw_8 col 5)
- EXT_NE (sw_14) row 1 col 5 (coin exterieur du L, vers haut-droite)
- INT_SW (sw_3) row 3 col 3 (coin interieur du L, vers bas-gauche)

Tout le reste = None (parc/immeuble plus tard).
"""

SW_4  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'   # BORD_OUEST
SW_8  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'   # BORD_EST
SW_6  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'   # BORD_NORD
SW_2  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'   # BORD_SUD
SW_3  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_3.png'   # INT_SW
SW_14 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_14.png'  # EXT_NE
ASPH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'
ASPH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'
ASPH_3 = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_3.png'  # PIVOT_L SW

ground = [
    [None,   None,   None,   None,   None,   None],            # row 0
    [SW_6,   SW_6,   SW_6,   SW_6,   SW_6,   SW_14],           # row 1 : bord N + EXT_NE
    [ASPH_H, ASPH_H, ASPH_H, ASPH_H, ASPH_3, SW_8],            # row 2 : chaussee OUEST + pivot + bord E descendante
    [SW_2,   SW_2,   SW_2,   SW_3,   ASPH_V, SW_8],            # row 3 : bord S + INT_SW + asph + bord E
    [None,   None,   None,   SW_4,   ASPH_V, SW_8],            # rows 4-8 : descendante
    [None,   None,   None,   SW_4,   ASPH_V, SW_8],
    [None,   None,   None,   SW_4,   ASPH_V, SW_8],
    [None,   None,   None,   SW_4,   ASPH_V, SW_8],
    [None,   None,   None,   SW_4,   ASPH_V, SW_8],
]

SNIPPET = {'name': 'virage_gauche', 'cols': 6, 'rows': 9, 'ground': ground, 'objects': []}
