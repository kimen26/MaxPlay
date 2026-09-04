"""Planche comparative SW_1 vs SW_2-6 avec rotation circulaire sur #11-#22.

Hypothese Papa Yann 2026-05-12 :
  - Pour ref# (SW_2-6) dans [11, 22] :
    - ref#11 et ref#12 → SW_1 #21 et #22 (rotation : viennent du bas)
    - ref#13 a ref#22  → SW_1 #11 a #20 (decalage -2)
  - Equivalent : SW_1[#] = SW_2-6[((# - 11 + 2) % 12) + 11]
                 SW_1->SW_2-6 mapping :
                   sw_1_11 = sw_2-6_13
                   sw_1_12 = sw_2-6_14
                   ...
                   sw_1_20 = sw_2-6_22
                   sw_1_21 = sw_2-6_11
                   sw_1_22 = sw_2-6_12
"""

from __future__ import annotations
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

TILES_DIR = Path(r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles\roads')
OUT_DIR = Path(__file__).parent.parent / 'recipes' / 'bricks'
ASPH_BG_PATH = TILES_DIR / 'ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'


def tile_path(family: int, n: int) -> Path:
    return TILES_DIR / f'ME_Singles_City_Terrains_48x48_Sidewalk_{family}_{n}.png'


def sw1_for_ref(n_ref: int) -> int:
    """Convertit numero SW_2-6 vers le numero SW_1 equivalent."""
    if 11 <= n_ref <= 22:
        # rotation : ref [13..22] → SW_1 [11..20] ; ref [11,12] → SW_1 [21,22]
        if n_ref <= 12:
            return n_ref + 10  # 11→21, 12→22
        else:
            return n_ref - 2   # 13→11, 14→12, ..., 22→20
    return n_ref  # pas de rotation hors plage


def main() -> None:
    RANGE_REF = list(range(11, 23))   # 11 a 22 inclus
    TILESETS_REF = [2, 3, 4, 5, 6]

    tile_zoom = 80
    label_w = 110
    cell_w = tile_zoom + 8
    cell_h = tile_zoom + 8

    cols = 1 + len(TILESETS_REF)
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
    headers = ['SW_1 (rot)'] + [f'SW_{f}' for f in TILESETS_REF]
    for ci, h in enumerate(headers):
        x = label_w + ci * cell_w + 4
        draw.text((x, 8), h, fill=(255, 230, 102), font=font)

    asph_bg = Image.open(ASPH_BG_PATH).convert('RGBA').resize((tile_zoom, tile_zoom), Image.NEAREST)

    for ri, n_ref in enumerate(RANGE_REF):
        y = 40 + ri * cell_h
        n_sw1 = sw1_for_ref(n_ref)
        draw.text((4, y + cell_h // 2 - 14), f'ref#{n_ref}', fill=(255, 255, 255), font=font)
        draw.text((4, y + cell_h // 2 + 2), f'sw1#{n_sw1}', fill=(180, 180, 180), font=font)

        # Col 0 = SW_1 with rotation
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

    out = OUT_DIR / f'_compare_sw1_rotation_ref{RANGE_REF[0]}-{RANGE_REF[-1]}.png'
    img.save(out)
    print(f'OK -> {out.relative_to(Path.cwd())}  ({W}x{H} px)')


if __name__ == '__main__':
    main()
