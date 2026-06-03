window.PATTERNS = {
  "version": "3.2",
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
    "title": "Virage a GAUCHE (SUD->OUEST) - validee 2026-05-08 par compo user",
    "size_min": "10x10",
    "preview": "recipes/test_virage_gauche.png",
    "code_example": "recipes/test_virage_gauche.py",
    "validated_by_user": true,
    "validation_date": "2026-05-08",
    "tiles_required": [
      "Sidewalk_1_14 (coin EXT NE en col=5 row=1)",
      "Sidewalk_1_3 (coin INT SW en col=3 row=3)",
      "Sidewalk_1_2/_4/_6/_8 (bords N/S/W/E)",
      "Sidewalk_1_9/_25/_26/_27 (trottoirs plain anti-mono)",
      "Asphalt_1_Variation_2/3/4 (pointillees coins L)",
      "Asphalt_1_Variation_14/15 (marquages dashees route)"
    ],
    "layout": "Branche OUEST rows 1-3 cols 0-4 + branche SUD col 4 rows 3-6. Coin EXT NE = _14 (5,1). Coin INT SW = _3 (3,3).",
    "rendered": "tile-tools/recipes/test_virage_gauche.png",
    "note": "Compo user via tile-picker.html. _3 = vrai coin INT SW (petit triangle trottoir SW). _14 = coin EXT NE (gros arc trottoir NE)."
  },
  "virage_droit": {
    "title": "Virage a DROITE (SUD->EST) - genere 2026-05-09 par symetrie horizontale",
    "size_min": "10x10",
    "preview": "recipes/test_virage_droit.png",
    "code_example": "recipes/test_virage_droit.py",
    "validated_by_user": false,
    "validation_date": "2026-05-09",
    "tiles_required": [
      "Sidewalk_1_13 (coin EXT NW en col=4 row=1)",
      "Sidewalk_1_1 (coin INT SE en col=6 row=3)",
      "Sidewalk_1_2/_4/_6/_8 (bords N/S/W/E)",
      "Sidewalk_1_9/_25/_26/_27 (trottoirs plain anti-mono)",
      "Asphalt_1_Variation_1/2/4 (pointillees coins L)",
      "Asphalt_1_Variation_14/15 (marquages dashees route)"
    ],
    "layout": "Branche EST rows 1-3 cols 5-9 + branche SUD col 5 rows 3-6. Coin EXT NW = _13 (4,1). Coin INT SE = _1 (6,3).",
    "rendered": "tile-tools/recipes/test_virage_droit.png",
    "note": "Miroir horizontal du virage gauche. _13 = coin EXT NW (gros arc trottoir NW). _1 = coin INT SE (petit triangle trottoir SE)."
  },
  "virage_haut_gauche": {
    "title": "Virage HAUT-GAUCHE (NORD->OUEST) - genere 2026-05-09 par symetrie verticale",
    "size_min": "10x10",
    "preview": "recipes/test_virage_haut_gauche.png",
    "code_example": "recipes/test_virage_haut_gauche.py",
    "validated_by_user": false,
    "validation_date": "2026-05-09",
    "tiles_required": [
      "Sidewalk_1_12 (coin EXT SE en col=5 row=5)",
      "Sidewalk_1_5 (coin INT NW en col=3 row=3)",
      "Sidewalk_1_2/_4/_6/_8 (bords N/S/W/E)",
      "Sidewalk_1_9/_25/_26/_27 (trottoirs plain anti-mono)",
      "Asphalt_1_Variation_2/4/5 (pointillees coins L)",
      "Asphalt_1_Variation_14/15 (marquages dashees route)"
    ],
    "layout": "Branche NORD col 4 rows 0-5 + branche OUEST row 4 cols 0-5. Coin EXT SE = _12 (5,5). Coin INT NW = _5 (3,3).",
    "rendered": "tile-tools/recipes/test_virage_haut_gauche.png",
    "note": "Miroir vertical du virage gauche. _12 = coin EXT SE (gros arc trottoir SE). _5 = coin INT NW (petit triangle trottoir NW)."
  },
  "quartier_propre": {
    "title": "Petit quartier 16x12 - anneau routier + pelouse + maison (base future Max Adventure)",
    "size_min": "16x12",
    "preview": "recipes/test_quartier_propre.png",
    "code_example": "recipes/test_quartier_propre.py",
    "validated_by_user": false,
    "validation_date": "2026-05-10",
    "tiles_required": [
      "Asphalt_1_Variation_20 (asphalte route)",
      "Asphalt_1_Variation_14/15 (pointillees DASHEES centre route)",
      "Sidewalk_1_2/_4/_6/_8 (bords trottoir N/S/W/E)",
      "Sidewalk_1_1/_3/_5/_7 (coins INT - 4 coins de la pelouse)",
      "Sidewalk_1_11/_12/_13/_14 (coins EXT - 4 coins du bloc)",
      "Sidewalk_1_9/_25/_26 (trottoirs plain anti-mono)",
      "Grass_2_7/_8/_9 (pelouse mixee)",
      "Toy_House_1 (maison 4x5)",
      "Bush_1 (decoration)"
    ],
    "layout": "Anneau routier (rows 2+9, cols 2+13) + 4 virages aux coins externes du bloc (1,1)/(1,14)/(10,1)/(10,14) + 4 coins INT autour de la pelouse centrale (3,3)/(3,12)/(8,3)/(8,12). Pelouse interne 8x4 rows 4-7 cols 4-11. Toyhouse en (5,4). Bushes ailleurs.",
    "rendered": "tile-tools/recipes/test_quartier_propre.png",
    "note": "Base remplaçant la 'grosse croix au pif' precedente. Toutes les recettes virages/route/bords/coins sont utilisees a la fois - vrai exemple integre. A elargir x2-3 pour faire la map Max Adventure complete."
  },
  "virage_haut_droit": {
    "title": "Virage HAUT-DROIT (NORD->EST) - genere 2026-05-09 par double miroir",
    "size_min": "10x10",
    "preview": "recipes/test_virage_haut_droit.png",
    "code_example": "recipes/test_virage_haut_droit.py",
    "validated_by_user": false,
    "validation_date": "2026-05-09",
    "tiles_required": [
      "Sidewalk_1_11 (coin EXT SW en col=3 row=5)",
      "Sidewalk_1_7 (coin INT NE en col=5 row=3)",
      "Sidewalk_1_2/_4/_6/_8 (bords N/S/W/E)",
      "Sidewalk_1_9/_25/_26/_27 (trottoirs plain anti-mono)",
      "Asphalt_1_Variation_2/4/7 (pointillees coins L)",
      "Asphalt_1_Variation_14/15 (marquages dashees route)"
    ],
    "layout": "Branche NORD col 4 rows 0-5 + branche EST row 4 cols 4-9. Coin EXT SW = _11 (3,5). Coin INT NE = _7 (5,3).",
    "rendered": "tile-tools/recipes/test_virage_haut_droit.png",
    "note": "Double miroir du virage gauche. _11 = coin EXT SW (gros arc trottoir SW). _7 = coin INT NE (petit triangle trottoir NE)."
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
      "Sidewalk_1_54 (3x4 ilot beige + panneau bleu giratoire) pose en (col=5, row=4) pour centrer panneau sur cercle"
    ],
    "layout": "4 quarts du rond-point + asphalte plain + ilot central avec panneau bleu",
    "rendered": "tile-tools/recipes/test_rond_point_v9.png",
    "warning": "_52 va en SE et _53 en SW (ordre LimeZu non-intuitif). _54 (ilot+panneau) se pose au centre.",
    "note": "CENTRAGE 2026-05-08 : _54 pose en (col=5, row=4) -> panneau bleu pile au centre du cercle pointille. Avant on l'avait en (6,5) ce qui decalait l'ilot en bas-droite. Test des 4 positions possibles ((5,3) (5,4) (6,3) (6,4)) montre que (5,4) est le seul qui aligne le panneau avec le centre visuel du cercle.",
    "validation_date": "2026-05-08"
  },
  "passage_pieton_route_v": {
    "title": "Passage pieton sur route VERTICALE (pietons traversent horizontalement)",
    "size_min": "5x12",
    "preview": "recipes/test_passage_pieton_route_v.png",
    "code_example": "recipes/test_passage_pieton_route_v.py",
    "validated_by_user": false,
    "tiles_required": [
      "Base = route_verticale_5cols",
      "Sidewalk_1_34 (1x2) milieu PROPRE sans rebord trottoir - 3 fois sur cols 1-3 row 5"
    ],
    "layout": "Route verticale 5x12 + passage pieton 3x _34 en cols 1-3 row 5 (couvre rows 5-6)",
    "rendered": "tile-tools/recipes/test_passage_pieton_route_v.png",
    "note": "PROPRE 2026-05-08 : on utilise SEULEMENT _34 (ou _35, equivalent) qui est le milieu sans rebord. Avant on avait _33+_34+_36 qui ajoutaient un GROS REBORD blanc au contact du trottoir, dgs visuellement. Avec 3x _34 le passage s'arrete net au contact des bords sw_4/sw_8."
  },
  "passage_pieton_route_h": {
    "title": "Passage pieton sur route HORIZONTALE (pietons traversent verticalement)",
    "size_min": "12x5",
    "preview": "recipes/test_passage_pieton_route_h.png",
    "code_example": "recipes/test_passage_pieton_route_h.py",
    "validated_by_user": false,
    "tiles_required": [
      "Base = route_horizontale_5rows",
      "Sidewalk_1_30 (2x1) milieu PROPRE sans rebord trottoir - 3 fois sur col 5 rows 1-3"
    ],
    "layout": "Route horizontale 12x5 + passage pieton 3x _30 en col 5 rows 1-3 (couvre cols 5-6)",
    "rendered": "tile-tools/recipes/test_passage_pieton_route_h.png",
    "note": "PROPRE 2026-05-08 : on utilise SEULEMENT _30 (ou _31, equivalent) qui est le milieu sans rebord. Avant on avait _29+_30+_32 qui ajoutaient un GROS REBORD blanc dans le trottoir nord et sud. Avec 3x _30 le passage s'arrete net."
  },
};