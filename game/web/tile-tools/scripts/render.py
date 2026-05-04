"""
Render snippet — compose une map de tiles en PNG.

Usage:
  python render.py <snippet_module>
  Le module doit définir SNIPPET = {
    'name': str, 'cols': int, 'rows': int,
    'ground': [[tile_path_or_none, ...], ...],   # cols × rows
    'objects': [(col, row, tile_path, w_tiles?, h_tiles?), ...],
  }
  Sortie: <snippet_name>.png à côté du module.
"""
import sys
import os
import importlib.util
from PIL import Image

TILE = 48
TILES_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles'

_cache = {}
def load_tile(rel_path):
    if rel_path in _cache: return _cache[rel_path]
    full = os.path.join(TILES_DIR, rel_path)
    if not os.path.isfile(full):
        raise FileNotFoundError(f"Tile manquant: {full}")
    img = Image.open(full).convert('RGBA')
    _cache[rel_path] = img
    return img

def render(snippet, out_path):
    cols, rows = snippet['cols'], snippet['rows']
    canvas = Image.new('RGBA', (cols * TILE, rows * TILE), (61, 122, 61, 255))  # green fallback

    # Layer 1 : ground
    ground = snippet.get('ground', [])
    for r, row in enumerate(ground):
        for c, key in enumerate(row):
            if key is None: continue
            t = load_tile(key)
            canvas.paste(t, (c * TILE, r * TILE), t)

    # Layer 2 : objects (taille native, alignés top-left)
    for obj in snippet.get('objects', []):
        c, r, key = obj[0], obj[1], obj[2]
        t = load_tile(key)
        canvas.paste(t, (c * TILE, r * TILE), t)

    canvas.save(out_path)
    print(f"OK -> {out_path} ({canvas.width}x{canvas.height} px)")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python render.py <module.py>")
        sys.exit(1)
    mod_path = sys.argv[1]
    spec = importlib.util.spec_from_file_location("snip", mod_path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    out = os.path.splitext(mod_path)[0] + '.png'
    render(mod.SNIPPET, out)
