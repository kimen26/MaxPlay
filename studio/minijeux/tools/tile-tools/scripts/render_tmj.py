"""Mini-renderer .tmj -> PNG.

Lit un .tmj Tiled (format JSON), reconstruit le PNG via PIL.
Demontre que le format Tiled est equivalent a notre pipeline render.py.
"""
import json
import os
import sys
from PIL import Image

TILE = 48
TILESHEETS_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\web\tile-tools\tilesheets'

def load_tilesheet(tsj_path):
    """Charge un tileset Tiled .tsj et retourne (image, columns)."""
    with open(tsj_path, encoding='utf-8') as f:
        tsj = json.load(f)
    img_path = os.path.join(os.path.dirname(tsj_path), tsj['image'])
    img = Image.open(img_path).convert('RGBA')
    return img, tsj['columns']

def get_tile(sheet, cols, gid):
    """gid (1-based) -> sub-image 48x48 du tilesheet."""
    idx = gid - 1
    cx, ry = idx % cols, idx // cols
    box = (cx * TILE, ry * TILE, (cx + 1) * TILE, (ry + 1) * TILE)
    return sheet.crop(box)

def render_tmj(tmj_path, out_path):
    with open(tmj_path, encoding='utf-8') as f:
        tmj = json.load(f)

    map_w = tmj['width']   # cols
    map_h = tmj['height']  # rows
    canvas = Image.new('RGBA', (map_w * TILE, map_h * TILE), (61, 122, 61, 255))

    # Charger les tilesets references
    tilesets = []  # liste (firstgid, sheet_image, columns, count)
    for ts in tmj['tilesets']:
        if 'source' in ts:
            tsj_path = os.path.join(os.path.dirname(tmj_path), ts['source'])
            tsj_path = os.path.normpath(tsj_path)
            sheet, cols = load_tilesheet(tsj_path)
            with open(tsj_path, encoding='utf-8') as f:
                meta = json.load(f)
            tilesets.append((ts['firstgid'], sheet, cols, meta['tilecount']))
        else:
            # embedded tileset
            img_path = os.path.join(os.path.dirname(tmj_path), ts['image'])
            sheet = Image.open(img_path).convert('RGBA')
            tilesets.append((ts['firstgid'], sheet, ts['columns'], ts['tilecount']))

    def resolve_gid(gid):
        """Trouve quel tileset contient ce gid."""
        for fg, sheet, cols, count in sorted(tilesets, key=lambda x: -x[0]):
            if gid >= fg:
                return sheet, cols, gid - fg + 1
        return None

    # Render layers
    for layer in tmj['layers']:
        if layer['type'] != 'tilelayer': continue
        data = layer['data']
        for i, gid in enumerate(data):
            if gid == 0: continue  # case vide
            cx = i % map_w
            ry = i // map_w
            resolved = resolve_gid(gid)
            if resolved is None: continue
            sheet, cols, local_gid = resolved
            tile = get_tile(sheet, cols, local_gid)
            canvas.paste(tile, (cx * TILE, ry * TILE), tile)

    canvas.save(out_path)
    print(f'OK -> {out_path} ({canvas.width}x{canvas.height} px)')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python render_tmj.py <map.tmj>')
        sys.exit(1)
    tmj_path = sys.argv[1]
    out = os.path.splitext(tmj_path)[0] + '.png'
    render_tmj(tmj_path, out)
