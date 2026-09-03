"""Génère une planche-catalogue d'une série de tiles, étiquetée.

Pour identifier visuellement quelle tile fait quoi sans render 60 PNG séparés.

Usage :
    python scripts/catalog_sheet.py sidewalk_1 15 50  → planche Sidewalk_1_15 à _50
    python scripts/catalog_sheet.py asphalt_1 1 30
"""

from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

TILES_DIR = Path(r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles\roads')
OUT_DIR = Path(__file__).parent.parent / 'recipes' / 'bricks'
OUT_DIR.mkdir(parents=True, exist_ok=True)


def main() -> None:
    if len(sys.argv) != 4:
        print("Usage: python catalog_sheet.py <prefix> <start> <end>")
        print("  prefix: sidewalk_1, sidewalk_2, asphalt_1")
        sys.exit(1)

    prefix = sys.argv[1].lower()
    start = int(sys.argv[2])
    end = int(sys.argv[3])

    fmt_map = {
        'sidewalk_1': 'ME_Singles_City_Terrains_48x48_Sidewalk_1_{n}.png',
        'sidewalk_2': 'ME_Singles_City_Terrains_48x48_Sidewalk_2_{n}.png',
        'asphalt_1':  'ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_{n}.png',
    }
    if prefix not in fmt_map:
        print(f"Unknown prefix: {prefix}")
        sys.exit(1)
    fmt = fmt_map[prefix]

    # Layout : 8 cols × N rows, chaque cellule = 48px tile + 24px label en bas
    cols = 8
    tile_size = 96  # zoom x2 pour mieux voir
    label_h = 28
    cell_w = tile_size + 8
    cell_h = tile_size + label_h + 8

    nums = list(range(start, end + 1))
    rows = (len(nums) + cols - 1) // cols
    W = cols * cell_w + 16
    H = rows * cell_h + 16

    img = Image.new('RGB', (W, H), (40, 40, 50))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 16)
    except Exception:
        font = ImageFont.load_default()

    for idx, n in enumerate(nums):
        r, c = divmod(idx, cols)
        x = 8 + c * cell_w
        y = 8 + r * cell_h
        tile_path = TILES_DIR / fmt.format(n=n)
        if tile_path.exists():
            tile = Image.open(tile_path).convert('RGBA')
            tile = tile.resize((tile_size, tile_size), Image.NEAREST)
            # Background : asphalte gris foncé pour faire ressortir les trottoirs blancs
            bg = Image.new('RGBA', (tile_size, tile_size), (95, 95, 95, 255))
            bg.paste(tile, (0, 0), tile)
            img.paste(bg, (x, y))
        else:
            draw.rectangle([x, y, x + tile_size, y + tile_size], fill=(20, 20, 20))
            draw.text((x + 10, y + 10), '404', fill=(200, 50, 50), font=font)
        draw.text((x + 4, y + tile_size + 4), f'{prefix}_{n}',
                  fill=(255, 230, 102), font=font)

    out = OUT_DIR / f'_catalog_{prefix}_{start}-{end}.png'
    img.save(out)
    print(f'OK -> {out.relative_to(Path.cwd())}  ({W}x{H} px, {len(nums)} tiles)')


if __name__ == '__main__':
    main()
