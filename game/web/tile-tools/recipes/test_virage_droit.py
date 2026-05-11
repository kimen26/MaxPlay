"""Virage droit : route arrive du haut-droite (EST), descend vers le bas.

Layout 6x9 minimal (None partout sauf le L).
- L pivote en haut-gauche du canvas
- Branche EST en haut : rows 1-3, cols 1-5 (chaussee row 2, bords row 1 + row 3)
- Pivot row 2 col 1 : asph_1 (PIVOT_L SE)
- Branche descendante : col 1 rows 3-8 (sw_4 col 0, asph_8 col 1, sw_8 col 2)
- EXT_NW (sw_13) row 1 col 0 (coin exterieur du L, vers haut-gauche)
- INT_SE (sw_1) row 3 col 2 (coin interieur du L, vers bas-droite)

Tout le reste = None.
"""

SW_4  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_8  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
SW_6  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_2  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
SW_1  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_1.png'   # INT_SE
SW_13 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_13.png'  # EXT_NW
ASPH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'
ASPH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'
ASPH_1 = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_1.png'  # PIVOT_L SE

ground = [
    [None,   None,   None,   None,   None,   None],            # row 0
    [SW_13,  SW_6,   SW_6,   SW_6,   SW_6,   SW_6],            # row 1 : EXT_NW + bord N
    [SW_4,   ASPH_1, ASPH_H, ASPH_H, ASPH_H, ASPH_H],          # row 2 : bord W + pivot + chaussee EST
    [SW_4,   ASPH_V, SW_1,   SW_2,   SW_2,   SW_2],            # row 3 : bord W + asph + INT_SE + bord S
    [SW_4,   ASPH_V, SW_8,   None,   None,   None],            # rows 4-8 : descendante seule
    [SW_4,   ASPH_V, SW_8,   None,   None,   None],
    [SW_4,   ASPH_V, SW_8,   None,   None,   None],
    [SW_4,   ASPH_V, SW_8,   None,   None,   None],
    [SW_4,   ASPH_V, SW_8,   None,   None,   None],
]

SNIPPET = {'name': 'virage_droit', 'cols': 6, 'rows': 9, 'ground': ground, 'objects': []}
