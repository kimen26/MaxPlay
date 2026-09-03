"""Construit un .tmj Tiled qui reproduit le rond-point v9.

Layout 14x12 :
  Layer 1 (ground)  : asphalte plain partout
  Layer 2 (objects) : quarts NW (0,0) + NE (7,0) + SW (0,6) + SE (7,6) + ilot (6,5)

Output : ../maps/rondpoint.tmj
"""
import json
import os

with open(r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\web\tile-tools\tilesheets\roads_mapping.json', encoding='utf-8') as f:
    M = json.load(f)

MAP_W, MAP_H = 14, 12

def gid(name):
    return M[name]

def empty_layer():
    return [0] * (MAP_W * MAP_H)

def set_tile(layer, col, row, g):
    layer[row * MAP_W + col] = g

# Layer 1 : asphalte plain partout
ground = empty_layer()
asph_gid = gid('Asphalt_1_Variation_20')
for r in range(MAP_H):
    for c in range(MAP_W):
        set_tile(ground, c, r, asph_gid)

# Layer 2 : quarts + ilot (decomposes case par case)
objects = empty_layer()

def stamp_multi(layer, col0, row0, prefix, w, h):
    for ry in range(h):
        for cx in range(w):
            g = gid(f'{prefix}_c{cx}_r{ry}')
            set_tile(layer, col0 + cx, row0 + ry, g)

stamp_multi(objects, 0, 0, 'rondpoint_NW', 7, 6)
stamp_multi(objects, 7, 0, 'rondpoint_NE', 7, 6)
stamp_multi(objects, 0, 6, 'rondpoint_SW', 7, 6)
stamp_multi(objects, 7, 6, 'rondpoint_SE', 7, 6)
stamp_multi(objects, 6, 5, 'ilot_panneau', 3, 4)

tmj = {
    'compressionlevel': -1,
    'height': MAP_H,
    'infinite': False,
    'layers': [
        {
            'data': ground,
            'height': MAP_H,
            'id': 1,
            'name': 'ground',
            'opacity': 1,
            'type': 'tilelayer',
            'visible': True,
            'width': MAP_W,
            'x': 0,
            'y': 0,
        },
        {
            'data': objects,
            'height': MAP_H,
            'id': 2,
            'name': 'objects',
            'opacity': 1,
            'type': 'tilelayer',
            'visible': True,
            'width': MAP_W,
            'x': 0,
            'y': 0,
        },
    ],
    'nextlayerid': 3,
    'nextobjectid': 1,
    'orientation': 'orthogonal',
    'renderorder': 'right-down',
    'tiledversion': '1.10.2',
    'tileheight': 48,
    'tilesets': [
        {'firstgid': 1, 'source': '../tilesheets/roads.tsj'},
    ],
    'tilewidth': 48,
    'type': 'map',
    'version': '1.10',
    'width': MAP_W,
}

out_dir = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\web\tile-tools\maps'
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, 'rondpoint.tmj')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(tmj, f, indent=2)
print(f'OK -> {out_path}')
