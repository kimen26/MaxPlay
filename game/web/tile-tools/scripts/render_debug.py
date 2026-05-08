"""Render avec grille + coordonnees - aide visuelle pour debug.

Usage : python scripts/render_debug.py recipes/test_X.py
Sortie: <name>_debug.png (grille col/row par-dessus le rendu).
"""
import sys
import os
import importlib.util
from PIL import Image, ImageDraw, ImageFont

TILE = 48
TILES_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles'

_cache: dict[str, Image.Image] = {}


def load_tile(rel_path: str) -> Image.Image:
    if rel_path in _cache:
        return _cache[rel_path]
    full = os.path.join(TILES_DIR, rel_path)
    if not os.path.isfile(full):
        raise FileNotFoundError(f"Tile manquant: {full}")
    img = Image.open(full).convert('RGBA')
    _cache[rel_path] = img
    return img


def render_debug(snippet: dict, out_path: str) -> None:
    cols, rows = snippet['cols'], snippet['rows']
    canvas = Image.new('RGBA', (cols * TILE, rows * TILE), (61, 122, 61, 255))

    ground = snippet.get('ground', [])
    for r, row in enumerate(ground):
        for c, key in enumerate(row):
            if key is None:
                continue
            t = load_tile(key)
            canvas.paste(t, (c * TILE, r * TILE), t)

    for obj in snippet.get('objects', []):
        c, r, key = obj[0], obj[1], obj[2]
        t = load_tile(key)
        canvas.paste(t, (c * TILE, r * TILE), t)

    overlay = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for c in range(cols + 1):
        x = c * TILE
        draw.line([(x, 0), (x, rows * TILE)], fill=(255, 0, 0, 80), width=1)
    for r in range(rows + 1):
        y = r * TILE
        draw.line([(0, y), (cols * TILE, y)], fill=(255, 0, 0, 80), width=1)

    try:
        font = ImageFont.truetype("arial.ttf", 10)
    except (OSError, IOError):
        font = ImageFont.load_default()
    for c in range(cols):
        draw.text((c * TILE + 2, 1), str(c), fill=(255, 255, 0, 220), font=font)
    for r in range(rows):
        draw.text((1, r * TILE + 12), str(r), fill=(255, 255, 0, 220), font=font)

    canvas = Image.alpha_composite(canvas, overlay)
    canvas.save(out_path)
    print(f"OK -> {out_path} ({canvas.width}x{canvas.height} px)")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python render_debug.py <module.py>")
        sys.exit(1)
    mod_path = sys.argv[1]
    spec = importlib.util.spec_from_file_location("snip", mod_path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    out = os.path.splitext(mod_path)[0] + '_debug.png'
    render_debug(mod.SNIPPET, out)
