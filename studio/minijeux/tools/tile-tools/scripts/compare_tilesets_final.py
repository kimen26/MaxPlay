"""Planche verification mapping SW_1 <-> SW_2-6 (validation finale Papa Yann 2026-05-12).

Table SW_2-6 ref -> SW_1 :
    ref#11 -> sw1#20
    ref#12 -> sw1#19
    ref#13 -> sw1#11
    ref#14 -> sw1#12
    ref#15 -> sw1#13
    ref#16 -> sw1#14
    ref#17 -> sw1#15
    ref#18 -> sw1#16
    ref#19 -> sw1#17
    ref#20 -> sw1#18
    autres -> meme numero (iso)
"""

from __future__ import annotations
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

TILES_DIR = Path(r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles\roads')
OUT_DIR = Path(__file__).parent.parent / 'recipes' / 'bricks'
ASPH_BG_PATH = TILES_DIR / 'ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'

# Table de correspondance : ref# (SW_2-6) -> sw1#
SW2_6_TO_SW1 = {
    11: 20, 12: 19, 13: 11, 14: 12, 15: 13,
    16: 14, 17: 15, 18: 16, 19: 17, 20: 18,
}


def sw1_for_ref(n_ref: int) -> int:
    return SW2_6_TO_SW1.get(n_ref, n_ref)


def tile_path(family: int, n: int) -> Path:
    return TILES_DIR / f'ME_Singles_City_Terrains_48x48_Sidewalk_{family}_{n}.png'


def main() -> None:
    RANGE_REF = list(range(1, 23))
    TILESETS_REF = [2, 3, 4, 5, 6]

    tile_zoom = 70
    label_w = 100
    cell_w = tile_zoom + 6
    cell_h = tile_zoom + 6

    cols = 1 + len(TILESETS_REF)
    rows = len(RANGE_REF)
    W = label_w + cols * cell_w + 16
    H = rows * cell_h + 50

    img = Image.new('RGB', (W, H), (30, 30, 40))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 12)
    except Exception:
        font = ImageFont.load_default()

    headers = ['SW_1 (map)'] + [f'SW_{f}' for f in TILESETS_REF]
    for ci, h in enumerate(headers):
        x = label_w + ci * cell_w + 4
        draw.text((x, 8), h, fill=(255, 230, 102), font=font)

    asph_bg = Image.open(ASPH_BG_PATH).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)

    for ri, n_ref in enumerate(RANGE_REF):
        y = 40 + ri * cell_h
        n_sw1 = sw1_for_ref(n_ref)
        is_remapped = (n_sw1 != n_ref)
        draw.text((4, y + cell_h // 2 - 14), f'ref#{n_ref}', fill=(255, 255, 255), font=font)
        if is_remapped:
            draw.text((4, y + cell_h // 2 + 2), f'sw1#{n_sw1}*', fill=(255, 200, 100), font=font)
        else:
            draw.text((4, y + cell_h // 2 + 2), f'sw1#{n_sw1}', fill=(160, 160, 160), font=font)

        # Col 0 = SW_1 with mapping
        tp = tile_path(1, n_sw1)
        x = label_w
        if tp.exists():
            tile = Image.open(tp).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)
            bg = asph_bg.copy()
            bg.paste(tile, (0, 0), tile)
            img.paste(bg, (x, y))

        # Cols 1+ = SW_2..6 at n_ref
        for ci, family in enumerate(TILESETS_REF, start=1):
            x = label_w + ci * cell_w
            tp = tile_path(family, n_ref)
            if tp.exists():
                tile = Image.open(tp).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)
                bg = asph_bg.copy()
                bg.paste(tile, (0, 0), tile)
                img.paste(bg, (x, y))

    out = OUT_DIR / '_compare_sw1_final_mapping.png'
    img.save(out)
    print(f'OK -> {out.relative_to(Path.cwd())}  ({W}x{H} px)')


if __name__ == '__main__':
    main()
