"""Planche comparative : pour chaque numero de tile (1 a N),
affiche cote a cote Sidewalk_1_X / Sidewalk_2_X / ... / Sidewalk_K_X
sur fond asphalte pour voir si les formes sont equivalentes.

Permet de valider l'hypothese Papa Yann :
'meme numero entre tilesets = meme forme, juste couleur differente'.

Usage :
    python scripts/compare_tilesets.py 1 22   -> tiles 1 a 22
"""

from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

TILES_DIR = Path(r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles\roads')
OUT_DIR = Path(__file__).parent.parent / 'recipes' / 'bricks'
OUT_DIR.mkdir(parents=True, exist_ok=True)

TILESETS = [1, 2, 3, 4, 5, 6]   # Sidewalk_1 a Sidewalk_6
ASPH_BG_PATH = TILES_DIR / 'ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'


def tile_path(family: int, n: int) -> Path:
    return TILES_DIR / f'ME_Singles_City_Terrains_48x48_Sidewalk_{family}_{n}.png'


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: python compare_tilesets.py <start> <end>")
        sys.exit(1)
    start, end = int(sys.argv[1]), int(sys.argv[2])
    nums = list(range(start, end + 1))

    tile_zoom = 80
    label_w = 70
    cell_w = tile_zoom + 8
    cell_h = tile_zoom + 8

    cols = len(TILESETS)
    rows = len(nums)
    W = label_w + cols * cell_w + 16
    H = rows * cell_h + 40

    img = Image.new('RGB', (W, H), (30, 30, 40))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 14)
        font_small = ImageFont.truetype("arial.ttf", 12)
    except Exception:
        font = ImageFont.load_default()
        font_small = font

    # Header
    for ci, family in enumerate(TILESETS):
        x = label_w + ci * cell_w + 4
        draw.text((x, 8), f'SW_{family}', fill=(255, 230, 102), font=font)

    asph_bg = Image.open(ASPH_BG_PATH).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)

    for ri, n in enumerate(nums):
        y = 32 + ri * cell_h
        draw.text((4, y + cell_h // 2 - 8), f'#{n}', fill=(255, 255, 255), font=font)
        for ci, family in enumerate(TILESETS):
            x = label_w + ci * cell_w
            tp = tile_path(family, n)
            if tp.exists():
                tile = Image.open(tp).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)
                bg = asph_bg.copy()
                bg.paste(tile, (0, 0), tile)
                img.paste(bg, (x, y))
            else:
                draw.rectangle([x, y, x + tile_zoom, y + tile_zoom], fill=(20, 20, 20))
                draw.text((x + 12, y + tile_zoom // 2 - 6), '404', fill=(180, 60, 60), font=font_small)

    out = OUT_DIR / f'_compare_sidewalks_{start}-{end}.png'
    img.save(out)
    print(f'OK -> {out.relative_to(Path.cwd())}  ({W}x{H} px, {rows} rows x {cols} cols)')


if __name__ == '__main__':
    main()
