"""Virage haut-droit : route descend du haut, tourne a droite en bas (vers EST).

Layout 6x9 minimal (None partout sauf le L). Miroir horizontal de virage_haut_gauche.
- L pivote en bas-gauche du canvas
- Branche descendante : cols 0-2 (sw_4 | asph_8 | sw_8) rows 0-7
- Pivot row 7 col 1 : asph_7 (PIVOT_L NE)
- Branche EST : row 7 cols 2-5 (asph_2) + asph_7 pivot col 1
- Bord N branche EST : row 6 cols 2-5 (sw_6) + INT_NE sw_7 col 1
- Bord S branche EST : row 8 cols 1-5 (sw_2) + EXT_SE sw_12 col 0

Tout le reste = None.
"""

SW_4  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'
SW_8  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'
SW_6  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'
SW_2  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'
SW_7  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_7.png'   # INT_NE
SW_12 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_12.png'  # EXT_SE (miroir de _11)
ASPH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'
ASPH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'
ASPH_7 = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_7.png'  # PIVOT_L NE

ground = [
    [SW_4,  ASPH_V, SW_8,   None,   None,   None],            # row 0 : descendante touche bord haut
    [SW_4,  ASPH_V, SW_8,   None,   None,   None],
    [SW_4,  ASPH_V, SW_8,   None,   None,   None],
    [SW_4,  ASPH_V, SW_8,   None,   None,   None],
    [SW_4,  ASPH_V, SW_8,   None,   None,   None],
    [SW_4,  ASPH_V, SW_8,   None,   None,   None],
    [SW_4,  ASPH_V, SW_7,   SW_6,   SW_6,   SW_6],            # row 6 : INT_NE + bord N branche EST
    [SW_4,  ASPH_7, ASPH_H, ASPH_H, ASPH_H, ASPH_H],          # row 7 : pivot + chaussee EST
    [SW_12, SW_2,   SW_2,   SW_2,   SW_2,   SW_2],            # row 8 : EXT_SE + bord S branche EST
]

SNIPPET = {'name': 'virage_haut_droit', 'cols': 6, 'rows': 9, 'ground': ground, 'objects': []}
