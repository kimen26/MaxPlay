window.PATTERNS = {
  "version": "2.2",
  "comment": "Patterns reutilisables - chaque entree VALIDEE en methode militaire (render -> regarde -> corrige). validated_by_user signifie confirmation explicite du user. UN SEUL STYLE de Sidewalk par pattern - ne JAMAIS melanger Sidewalk_1, _2, _3 etc dans le meme rendu.",
  "route_verticale_5cols": {
    "title": "Route verticale 2 voies - REFERENCE",
    "size_min": "5x9",
    "preview": "recipes/test_route_v_5cols.png",
    "code_example": "recipes/test_route_v_5cols.py",
    "validated_by_user": true,
    "validation_date": "2026-05-04",
    "tiles_required": [
      "Sidewalk_1_9 (trottoir plain)",
      "Sidewalk_1_4 (col 1 : trottoir A GAUCHE de la tile, asphalte a droite)",
      "Asphalt_1_Variation_15 (ligne pointillee centrale)",
      "Sidewalk_1_8 (col 3 : asphalte a gauche, trottoir A DROITE de la tile)"
    ],
    "layout": "[trottoir | sw_4 | asph_15 | sw_8 | trottoir]",
    "rendered": "tile-tools/recipes/test_route_v_5cols.png",
    "note": "5 cols seulement. Mnemonique : 'ou est le trottoir DANS la tile' = cote de la route ou on la pose."
  },
  "route_horizontale_5rows": {
    "title": "Route horizontale 2 voies - symetrique de la verticale",
    "size_min": "14x5",
    "preview": "recipes/test_route_h_5rows.png",
    "code_example": "recipes/test_route_h_5rows.py",
    "validated_by_user": true,
    "validation_date": "2026-05-04",
    "tiles_required": [
      "Sidewalk_1_9 (trottoirs N et S)",
      "Sidewalk_1_6 (row 1 : trottoir EN HAUT de la tile, asphalte en bas)",
      "Asphalt_1_Variation_14 (ligne pointillee horizontale)",
      "Sidewalk_1_2 (row 3 : asphalte en haut, trottoir EN BAS de la tile)"
    ],
    "layout": "rows: [trottoir | sw_6 | asph_14 | sw_2 | trottoir]",
    "rendered": "tile-tools/recipes/test_route_h_5rows.png"
  },
  "voie_bus_2voies": {
    "title": "Route 2 voies + BUS chaque sens (serree, 9 cols)",
    "size_min": "9x12",
    "preview": "recipes/test_voie_bus_v6.png",
    "code_example": "recipes/test_voie_bus_v6.py",
    "validated_by_user": false,
    "tiles_required": [
      "Sidewalk_1_9 (trottoirs G/D)",
      "Asphalt_1_Variation_20 (asphalte plain)",
      "Asphalt_1_Variation_15 (ligne pointillee centrale)",
      "Sidewalk_1_48 (BUS voie G 3x6) - inclut deja sa bordure blanche gauche",
      "Sidewalk_1_49 (BUS voie D 3x6) - inclut deja sa bordure blanche droite"
    ],
    "layout": "[trottoir | BUS_G 3cols | ligne | BUS_D 3cols | trottoir] = 9 cols",
    "rendered": "tile-tools/recipes/test_voie_bus_v6.png",
    "note": "PAS de transition sw_4/sw_8 ajoutee. Les marquages BUS (_48/_49) contiennent deja leur bordure blanche."
  },
  "parking_horizontal_2rangees": {
    "title": "Parking allee centrale + places P (serre, 8 rows)",
    "size_min": "12x8",
    "preview": "recipes/test_parking_v4.png",
    "code_example": "recipes/test_parking_v4.py",
    "validated_by_user": false,
    "tiles_required": [
      "Sidewalk_1_9 (trottoirs N et S)",
      "Asphalt_1_Variation_20 (asphalte plain)",
      "Sidewalk_1_45 (places HAUTES rows 1-2, cadre ferme EN HAUT)",
      "Sidewalk_1_46 (places BASSES rows 5-6, cadre ferme EN BAS)"
    ],
    "layout": "rows: [trottoir_N | P_45 x2 | asph x2 | P_46 x2 | trottoir_S] = 8 rows",
    "rendered": "tile-tools/recipes/test_parking_v4.png",
    "note": "PAS de transition sw_6/sw_2. Les marquages P (_45/_46) contiennent deja leur bordure blanche."
  },
  "rond_point_complet": {
    "title": "Rond-point 14x12 - 4 quarts + ilot beige + panneau bleu giratoire",
    "size_min": "14x12",
    "preview": "recipes/test_rond_point_v9.png",
    "code_example": "recipes/test_rond_point_v9.py",
    "validated_by_user": true,
    "tiles_required": [
      "Sidewalk_1_50 NW a (col=0, row=0) 7x6",
      "Sidewalk_1_51 NE a (col=7, row=0) 7x6",
      "Sidewalk_1_53 SW a (col=0, row=6) 7x6 - ATTENTION : _53 va en SW",
      "Sidewalk_1_52 SE a (col=7, row=6) 7x6 - ATTENTION : _52 va en SE",
      "Asphalt_1_Variation_20 (asphalte sous tout)",
      "Sidewalk_1_54 (3x4 ilot beige + panneau bleu giratoire) pose en (col=6, row=4)"
    ],
    "layout": "4 quarts du rond-point + asphalte plain + ilot central avec panneau bleu",
    "rendered": "tile-tools/recipes/test_rond_point_v9.png",
    "warning": "_52 va en SE et _53 en SW (ordre LimeZu non-intuitif). _54 (ilot+panneau) se pose au centre.",
    "note": "Ne PAS ajouter de pointilles sur les sorties - les bords trottoir des quarts _50/_51/_52/_53 cadrent deja les voies. Le tile _54 (ilot+panneau) se pose en (col=6, row=4) pour centrer.",
    "validation_date": "2026-05-05"
  },
  "passage_pieton_route_v": {
    "title": "Passage pieton sur route VERTICALE (pietons traversent horizontalement)",
    "size_min": "5x12",
    "preview": "recipes/test_passage_pieton_route_v.png",
    "code_example": "recipes/test_passage_pieton_route_v.py",
    "validated_by_user": false,
    "tiles_required": [
      "Base = route_verticale_5cols",
      "Sidewalk_1_33 (1x2) extremite gauche du passage - pose en col=1",
      "Sidewalk_1_34 (1x2) milieu du passage - pose en col=2",
      "Sidewalk_1_36 (1x2) extremite droite du passage - pose en col=3"
    ],
    "layout": "Route verticale 5x12 + passage pieton _33/_34/_36 en cols 1-3 row 5 (couvre rows 5-6)",
    "rendered": "tile-tools/recipes/test_passage_pieton_route_v.png",
    "note": "Variantes _34/_35 interchangeables pour le milieu. Les tiles font 1 col x 2 rows."
  },
  "passage_pieton_route_h": {
    "title": "Passage pieton sur route HORIZONTALE (pietons traversent verticalement)",
    "size_min": "12x5",
    "preview": "recipes/test_passage_pieton_route_h.png",
    "code_example": "recipes/test_passage_pieton_route_h.py",
    "validated_by_user": false,
    "tiles_required": [
      "Base = route_horizontale_5rows",
      "Sidewalk_1_29 (2x1) extremite haute du passage - pose en row=1",
      "Sidewalk_1_30 (2x1) milieu du passage - pose en row=2",
      "Sidewalk_1_32 (2x1) extremite basse du passage - pose en row=3"
    ],
    "layout": "Route horizontale 12x5 + passage pieton _29/_30/_32 en col 5 rows 1-3 (couvre cols 5-6)",
    "rendered": "tile-tools/recipes/test_passage_pieton_route_h.png",
    "note": "Variantes _30/_31 interchangeables. Les tiles font 2 cols x 1 row."
  },
  "virage_ne": {
    "title": "Virage route 90 degres - NE (route entre par SUD, sort par OUEST) - 2 voies",
    "size_min": "11x11",
    "preview": "recipes/test_virage_ne_v2.png",
    "code_example": "recipes/test_virage_ne_v2.py",
    "validated_by_user": true,
    "validation_date": "2026-05-04",
    "tiles_required": [
      "Asphalt_1_Variation_20 (asphalte)",
      "Sidewalk_1_9 (trottoir plain)",
      "Sidewalk_1_4 (sw_W : bord ouest branche SUD)",
      "Sidewalk_1_8 (sw_E : bord est branche SUD)",
      "Sidewalk_1_6 (sw_N : bord nord branche OUEST)",
      "Sidewalk_1_2 (sw_S : bord sud branche OUEST, 2 cols seulement)",
      "Sidewalk_1_13 (arc trottoir convexe NW au coin INTERIEUR SW)",
      "Asphalt_1_Variation_15 (pointille vertical - axe branche SUD)",
      "Asphalt_1_Variation_14 (pointille horizontal - axe branche OUEST)",
      "Asphalt_1_Variation_5 (ligne en L coin SW - au pivot)"
    ],
    "layout": "9x9 : branche SUD cols 2-6 rows 4-8 + branche OUEST rows 2-6 cols 0-6. Pivot 5x5 au NW.",
    "rendered": "tile-tools/recipes/test_virage_ne_v2.png",
    "note": "Coin EXTERIEUR NE = trottoir plain. Coin INTERIEUR SW = sw_13. Lignes pointillees (double-sens)."
  },
  "virage_nw": {
    "title": "Virage route 90 degres - NW (route entre par SUD, sort par EST) - 2 voies",
    "size_min": "11x11",
    "preview": "recipes/test_virage_nw_v2.png",
    "code_example": "recipes/test_virage_nw_v2.py",
    "validated_by_user": true,
    "validation_date": "2026-05-04",
    "tiles_required": [
      "Asphalt_1_Variation_20",
      "Sidewalk_1_9",
      "Sidewalk_1_4 (sw_W : col=1 rows 7-8 branche SUD)",
      "Sidewalk_1_8 (sw_E : col=7 rows 4-8 branche SUD)",
      "Sidewalk_1_6 (sw_N : row=1 cols 2-8 branche EST)",
      "Sidewalk_1_2 (sw_S : row=7 cols 7-8 branche EST)",
      "Sidewalk_1_14 (arc trottoir convexe NE au coin INTERIEUR SE)",
      "Asphalt_1_Variation_15 (pointille V axe SUD)",
      "Asphalt_1_Variation_14 (pointille H axe EST)",
      "Asphalt_1_Variation_7 (ligne en L coin SE - au pivot)"
    ],
    "layout": "9x9 : branche SUD cols 2-6 rows 4-8 + branche EST rows 2-6 cols 2-8. Pivot 5x5 au NE.",
    "rendered": "tile-tools/recipes/test_virage_nw_v2.png",
    "note": "Coin EXTERIEUR NW = trottoir plain. Coin INTERIEUR SE = sw_14."
  },
  "virage_se": {
    "title": "Virage route 90 degres - SE (route entre par NORD, sort par OUEST) - 2 voies",
    "size_min": "11x11",
    "preview": "recipes/test_virage_se_v2.png",
    "code_example": "recipes/test_virage_se_v2.py",
    "validated_by_user": true,
    "validation_date": "2026-05-04",
    "tiles_required": [
      "Asphalt_1_Variation_20",
      "Sidewalk_1_9",
      "Sidewalk_1_4 (sw_W : col=1 rows 0-1 branche NORD)",
      "Sidewalk_1_8 (sw_E : col=7 rows 0-4 branche NORD)",
      "Sidewalk_1_6 (sw_N : row=1 cols 0-1 branche OUEST)",
      "Sidewalk_1_2 (sw_S : row=7 cols 0-6 branche OUEST)",
      "Sidewalk_1_12 (arc trottoir convexe SW au coin INTERIEUR NW)",
      "Asphalt_1_Variation_15 (pointille V axe NORD)",
      "Asphalt_1_Variation_14 (pointille H axe OUEST)",
      "Asphalt_1_Variation_1 (ligne en L coin NW - au pivot)"
    ],
    "layout": "9x9 : branche NORD cols 2-6 rows 0-4 + branche OUEST rows 2-6 cols 0-6. Pivot 5x5 au SW.",
    "rendered": "tile-tools/recipes/test_virage_se_v2.png",
    "note": "Coin EXTERIEUR SE = trottoir plain. Coin INTERIEUR NW = sw_12."
  },
  "virage_sw": {
    "title": "Virage route 90 degres - SW (route entre par NORD, sort par EST) - 2 voies",
    "size_min": "11x11",
    "preview": "recipes/test_virage_sw_v2.png",
    "code_example": "recipes/test_virage_sw_v2.py",
    "validated_by_user": true,
    "validation_date": "2026-05-04",
    "tiles_required": [
      "Asphalt_1_Variation_20",
      "Sidewalk_1_9",
      "Sidewalk_1_4 (sw_W : col=1 rows 0-4 branche NORD)",
      "Sidewalk_1_8 (sw_E : col=7 rows 0-1 branche NORD)",
      "Sidewalk_1_6 (sw_N : row=1 cols 7-8 branche EST)",
      "Sidewalk_1_2 (sw_S : row=7 cols 2-8 branche EST)",
      "Sidewalk_1_11 (arc trottoir convexe SE au coin INTERIEUR NE)",
      "Asphalt_1_Variation_15 (pointille V axe NORD)",
      "Asphalt_1_Variation_14 (pointille H axe EST)",
      "Asphalt_1_Variation_3 (ligne en L coin NE - au pivot)"
    ],
    "layout": "9x9 : branche NORD cols 2-6 rows 0-4 + branche EST rows 2-6 cols 2-8. Pivot 5x5 au SE.",
    "rendered": "tile-tools/recipes/test_virage_sw_v2.png",
    "note": "Coin EXTERIEUR SW = trottoir plain. Coin INTERIEUR NE = sw_11."
  }
};