"""Planche comparative SW_1 vs SW_2-6 avec décalage hypothese sur SW_1.

Pour valider l'hypothese : sw_1_(N+2) correspond a sw_2-6_N sur la plage [11, 20].
"""

from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

TILES_DIR = Path(r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles\roads')
OUT_DIR = Path(__file__).parent.parent / 'recipes' / 'bricks'
ASPH_BG_PATH = TILES_DIR / 'ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'


def tile_path(family: int, n: int) -> Path:
    return TILES_DIR / f'ME_Singles_City_Terrains_48x48_Sidewalk_{family}_{n}.png'


def main() -> None:
    # Hypothese : sur la plage [11, 20] de SW_2-6, le SW_1 equivalent est decale de +2
    # => sw_1_13 ~ sw_2_11, sw_1_14 ~ sw_2_12, etc.
    # On affiche : col 1 = SW_1 numero "decale", cols 2-6 = SW_2-6 numero "reference"
    RANGE_REF = list(range(11, 21))  # ref numbers in SW_2-6
    SHIFT_SW1 = 2

    TILESETS_REF = [2, 3, 4, 5, 6]

    tile_zoom = 80
    label_w = 100
    cell_w = tile_zoom + 8
    cell_h = tile_zoom + 8

    cols = 1 + len(TILESETS_REF)  # SW_1 shifted + 5 ref
    rows = len(RANGE_REF)
    W = label_w + cols * cell_w + 16
    H = rows * cell_h + 50

    img = Image.new('RGB', (W, H), (30, 30, 40))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 13)
    except Exception:
        font = ImageFont.load_default()

    # Header
    headers = [f'SW_1 (+{SHIFT_SW1})'] + [f'SW_{f}' for f in TILESETS_REF]
    for ci, h in enumerate(headers):
        x = label_w + ci * cell_w + 4
        draw.text((x, 8), h, fill=(255, 230, 102), font=font)

    asph_bg = Image.open(ASPH_BG_PATH).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)

    for ri, n_ref in enumerate(RANGE_REF):
        y = 40 + ri * cell_h
        n_sw1 = n_ref + SHIFT_SW1
        draw.text((4, y + cell_h // 2 - 14), f'ref#{n_ref}', fill=(255, 255, 255), font=font)
        draw.text((4, y + cell_h // 2 + 2), f'sw1#{n_sw1}', fill=(180, 180, 180), font=font)

        # Col 0 = SW_1 shifted
        tp = tile_path(1, n_sw1)
        x = label_w
        if tp.exists():
            tile = Image.open(tp).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)
            bg = asph_bg.copy()
            bg.paste(tile, (0, 0), tile)
            img.paste(bg, (x, y))

        # Cols 1+ = SW_2..6 a num n_ref
        for ci, family in enumerate(TILESETS_REF, start=1):
            x = label_w + ci * cell_w
            tp = tile_path(family, n_ref)
            if tp.exists():
                tile = Image.open(tp).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)
                bg = asph_bg.copy()
                bg.paste(tile, (0, 0), tile)
                img.paste(bg, (x, y))

    out = OUT_DIR / f'_compare_sw1_shifted_+{SHIFT_SW1}_ref{RANGE_REF[0]}-{RANGE_REF[-1]}.png'
    img.save(out)
    print(f'OK -> {out.relative_to(Path.cwd())}  ({W}x{H} px)')


if __name__ == '__main__':
    main()
