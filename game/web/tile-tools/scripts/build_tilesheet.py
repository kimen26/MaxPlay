"""Build tilesheet pour Tiled/Phaser.

Assemble les PNG individuels LimeZu (utilises dans nos recipes) en une seule image
grille (cols x N), genere un .tsj (Tiled tileset JSON).

Logique : tile single (1x1) -> 1 case dans la grille.
Pour les multi-tiles (rond-point quarts 7x6, ilot 3x4), on les decompose case par case
en re-extrayant chaque sous-image 48x48.

Sortie :
  ../tilesheets/roads.png      <- l'image tilesheet
  ../tilesheets/roads.tsj      <- le tileset Tiled (charge en module dans .tmj)
  ../tilesheets/roads_mapping.json  <- pour notre code : nom_logique -> firstgid
"""
import json
import os
from PIL import Image

TILE = 48
TILES_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles'
OUT_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\web\tile-tools\tilesheets'
os.makedirs(OUT_DIR, exist_ok=True)

# Liste des tiles a inclure - on prend tous les Sidewalk_1, Asphalt_1 utilises dans nos recipes.
# Ordre = ordre dans la grille (gid commence a 1).
ROADS_TILES = [
    # Asphalt_1 (variations utiles : 1,3,5,7 lignes L + 4,6 lignes V/H + 14,15 pointilles + 20 plain)
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_1.png',
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_3.png',
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_4.png',
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_5.png',
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_6.png',
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_7.png',
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_14.png',
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_15.png',
    'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png',
    # Sidewalk_1 (bords, arcs, plain)
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_2.png',   # bord S
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_4.png',   # bord W
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_6.png',   # bord N
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_8.png',   # bord E
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png',   # plain
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_11.png',  # arc int SE
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_12.png',  # arc int SW
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_13.png',  # arc int NW
    'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_14.png',  # arc int NE
]

# Multi-tiles a decomposer : (path, w, h, prefix)
ROADS_MULTI = [
    ('roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_50.png', 7, 6, 'rondpoint_NW'),
    ('roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_51.png', 7, 6, 'rondpoint_NE'),
    ('roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_52.png', 7, 6, 'rondpoint_SE'),
    ('roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_53.png', 7, 6, 'rondpoint_SW'),
    ('roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_54.png', 3, 4, 'ilot_panneau'),
]

def main():
    # Build flat list : (label, image_48x48)
    flat = []
    for rel in ROADS_TILES:
        img = Image.open(os.path.join(TILES_DIR, rel)).convert('RGBA')
        label = os.path.splitext(os.path.basename(rel))[0].replace('ME_Singles_City_Terrains_48x48_', '')
        flat.append((label, img))

    for rel, w, h, prefix in ROADS_MULTI:
        big = Image.open(os.path.join(TILES_DIR, rel)).convert('RGBA')
        for ry in range(h):
            for cx in range(w):
                box = (cx * TILE, ry * TILE, (cx + 1) * TILE, (ry + 1) * TILE)
                sub = big.crop(box)
                flat.append((f'{prefix}_c{cx}_r{ry}', sub))

    # Grille 16 cols
    cols = 16
    rows = (len(flat) + cols - 1) // cols
    sheet = Image.new('RGBA', (cols * TILE, rows * TILE), (0, 0, 0, 0))

    mapping = {}  # name -> gid (1-based, Tiled convention)
    for i, (label, img) in enumerate(flat):
        cx, ry = i % cols, i // cols
        sheet.paste(img, (cx * TILE, ry * TILE), img)
        mapping[label] = i + 1  # gid 1-based

    sheet_path = os.path.join(OUT_DIR, 'roads.png')
    sheet.save(sheet_path)
    print(f'OK -> {sheet_path} ({sheet.width}x{sheet.height} px, {len(flat)} tiles)')

    # Tileset Tiled .tsj
    tsj = {
        'columns': cols,
        'image': 'roads.png',
        'imagewidth': cols * TILE,
        'imageheight': rows * TILE,
        'margin': 0,
        'name': 'roads',
        'spacing': 0,
        'tilecount': len(flat),
        'tiledversion': '1.10.2',
        'tileheight': TILE,
        'tilewidth': TILE,
        'type': 'tileset',
        'version': '1.10',
    }
    tsj_path = os.path.join(OUT_DIR, 'roads.tsj')
    with open(tsj_path, 'w', encoding='utf-8') as f:
        json.dump(tsj, f, indent=2)
    print(f'OK -> {tsj_path}')

    # Mapping pour notre code
    map_path = os.path.join(OUT_DIR, 'roads_mapping.json')
    with open(map_path, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)
    print(f'OK -> {map_path} ({len(mapping)} entrees)')

if __name__ == '__main__':
    main()
