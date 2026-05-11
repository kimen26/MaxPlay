"""Virage haut-gauche : route descend du haut, tourne a gauche en bas (vers OUEST).

Layout 6x9 (minimal, pas de trottoir _9 inutile).
- L pivote en bas-droite du canvas
- Branche descendante : cols 3-5 (sw_4 | asph_8 | sw_8), rows 0-7
- Pivot row 7 : INT_NW sw_5 (col 3), asph_5 (col 4), sw_8 (col 5)
- Branche OUEST : row 7 cols 0-3 (asph_2) + asph_5 pivot col 4
- Bord N branche OUEST : row 6 cols 0-3 (sw_6, dont sw_5 col 3 = INT au coin int)
- Bord S branche OUEST : row 8 cols 0-4 (sw_2) + sw_11 (EXT_SW) col 5

Tout le reste = None (transparent : sera rempli parc/immeuble plus tard).

Source : composition tile-picker Papa Yann 2026-05-11 + suppression sw_9 inutiles.
"""

# Tiles utilisees (chemins absolus pour copier-coller depuis tile-picker)
SW_4  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png'   # BORD_OUEST
SW_8  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png'   # BORD_EST
SW_6  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png'   # BORD_NORD
SW_2  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png'   # BORD_SUD
SW_5  = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_5.png'   # INT_NW
SW_11 = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_11.png'  # EXT_SW (validation Papa 2026-05-11)
ASPH_V = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_8.png'  # ROUTE_V_PROPRE
ASPH_H = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_2.png'  # ROUTE_H_PROPRE
ASPH_5 = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_5.png'  # PIVOT_L NW

ground = [
    [None, None, None, SW_4, ASPH_V, SW_8],       # row 0 : descendante touche bord haut
    [None, None, None, SW_4, ASPH_V, SW_8],
    [None, None, None, SW_4, ASPH_V, SW_8],
    [None, None, None, SW_4, ASPH_V, SW_8],
    [None, None, None, SW_4, ASPH_V, SW_8],
    [None, None, None, SW_4, ASPH_V, SW_8],
    [SW_6,  SW_6, SW_6,  SW_5,  ASPH_V, SW_8],    # row 6 : bord N branche OUEST + INT_NW
    [ASPH_H, ASPH_H, ASPH_H, ASPH_H, ASPH_5, SW_8],  # row 7 : chaussee horizontale + pivot
    [SW_2,  SW_2,  SW_2,  SW_2,  SW_2,  SW_11],   # row 8 : bord S branche OUEST + EXT_SW
]

SNIPPET = {'name': 'virage_haut_gauche', 'cols': 6, 'rows': 9, 'ground': ground, 'objects': []}
