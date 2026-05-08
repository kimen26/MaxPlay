window.PATTERNS = {
  "version": "2.8",
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
  "virage_gauche": {
    "title": "Virage a GAUCHE - route 5 cols, DOUBLE arrondi (coin EXT _14 + coin INT _12)",
    "size_min": "24x18",
    "preview": "recipes/test_virage_gauche.png",
    "code_example": "recipes/test_virage_gauche.py",
    "validated_by_user": false,
    "validation_date": "2026-05-08",
    "tiles_required": [
      "Asphalt_1_Variation_20 (asphalte plein)",
      "Sidewalk_1_9 (trottoir plain)",
      "Sidewalk_1_6 (sw_N : row=5 cols 0-8 - bord N branche OUEST jusqu'au coin EXT)",
      "Sidewalk_1_8 (sw_E : col=9 rows 6-17 - bord E branche SUD)",
      "Sidewalk_1_2 (sw_S : row=9 cols 0-4 - bord S branche OUEST jusqu'au coin INT)",
      "Sidewalk_1_4 (sw_W : col=5 rows 10-17 - bord W branche SUD)",
      "Sidewalk_1_14 (coin EXT NE - trottoir massif NE + arc descendant, en col=9 row=5)",
      "Sidewalk_1_12 (coin INT SW - trottoir au SW + arc concave NE, en col=5 row=9)",
      "Asphalt_1_Variation_15 (pointille V branche SUD col=7 rows 10-17)",
      "Asphalt_1_Variation_14 (pointille H branche OUEST row=7 cols 0-4)"
    ],
    "layout": "24x18 : branche OUEST asphalte rows 6-8 cols 0-9 (10 cases) + branche SUD asphalte rows 6-17 cols 6-8 (12 cases). Pivot 3x3 cols 6-8 rows 6-8. Coin EXT NE = _14 (col=9 row=5). Coin INT SW = _12 (col=5 row=9).",
    "rendered": "tile-tools/recipes/test_virage_gauche.png",
    "note": "CARTOGRAPHIE 2026-05-08 : _14 (coin EXT) = trottoir massif NE + arc, _12 (coin INT) = petit trottoir au SW + arc concave. Confirme sur la planche themes_overview/2_City_Terrains qui montre l'assemblage exemple LimeZu. Avant j'utilisais _13 au coin INT par erreur - _13 est en fait une transition trottoir-asphalte horizontale, pas un coin de virage."
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
};