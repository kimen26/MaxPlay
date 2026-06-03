"""Genere un catalogue par famille pour tous les themes.

Pour chaque theme :
  - Liste les familles (ex: 'Asphalt_1', 'Sidewalk_3', 'Bush', 'Tree_1')
  - Pour chaque famille, planche-contact zoomee x3 avec numero
  - Sortie : tile-tools/families/<theme>/<family>.png
  - JSON : tile-tools/families/_families_index.json (theme -> family -> [variants with size])
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

THEMES = Path(
    r"c:/ProjetsPerso/Claude_Projects/MaxPlay/game/phaser/public/assets/tiles/themes"
)
OUT = Path(r"c:/ProjetsPerso/Claude_Projects/MaxPlay/game/web/tile-tools/families")
OUT.mkdir(exist_ok=True)

ZOOM = 3
TILE = 48
COLS = 10  # tiles per row in catalog sheet
GAP = 6

# Family detection : "Foo_Bar_3.png" -> family="Foo_Bar", variant=3
# "Asphalt_1_Variation_15.png" -> family="Asphalt_1", variant=15
FAMILY_RE = re.compile(r"^(.+?)(?:_Variation)?_(\d+)\.png$")
SINGLETON_RE = re.compile(r"^(.+?)\.png$")


def parse_filename(name: str) -> tuple[str, int]:
    m = FAMILY_RE.match(name)
    if m:
        family = m.group(1)
        variant = int(m.group(2))
        return family, variant
    m = SINGLETON_RE.match(name)
    if m:
        return m.group(1), 0
    return name, 0


def load_font(size: int = 14) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        return ImageFont.truetype("arial.ttf", size)
    except Exception:
        return ImageFont.load_default()


def render_family_sheet(theme_dir: Path, family: str, variants: list[tuple[int, str]]) -> tuple[Path, list[dict]]:
    """variants = [(variant_num, filename), ...] sorted."""
    n = len(variants)
    cols = min(COLS, n)
    rows = (n + cols - 1) // cols

    cell_w = TILE * 4 * ZOOM // 4  # max width hypothesis 1 tile - we'll resize anyway
    cell_w = TILE * ZOOM
    cell_h = TILE * ZOOM
    label_h = 20
    header_h = 30

    width = cols * (cell_w + GAP) + GAP
    height = header_h + rows * (cell_h + label_h + GAP) + GAP

    canvas = Image.new("RGBA", (width, height), (40, 40, 40, 255))
    draw = ImageDraw.Draw(canvas)
    font = load_font(14)
    font_small = load_font(11)
    draw.text((GAP, 8), f"{family}  ({n} variants)", fill="yellow", font=font)

    metas: list[dict] = []
    for i, (var, fname) in enumerate(variants):
        r, c = divmod(i, cols)
        x = GAP + c * (cell_w + GAP)
        y = header_h + r * (cell_h + label_h + GAP)

        path = theme_dir / fname
        im = Image.open(path).convert("RGBA")
        nat_w, nat_h = im.size
        # Tile size in 48px units
        tw, th = nat_w // TILE, nat_h // TILE

        # Cellule fixe : on prend juste le coin haut-gauche pour comparaison rapide
        crop = im.crop((0, 0, min(TILE, nat_w), min(TILE, nat_h)))
        zoomed = crop.resize((cell_w, cell_h), Image.Resampling.NEAREST)
        canvas.paste(zoomed, (x, y), zoomed)

        # Label
        label = f"_{var}" if var > 0 else ""
        size_lbl = f"({tw}x{th})" if (tw, th) != (1, 1) else ""
        full_lbl = f"{label} {size_lbl}".strip()
        draw.text((x + 2, y + cell_h + 2), full_lbl, fill="white", font=font_small)

        metas.append({
            "variant": var,
            "file": fname,
            "w": tw,
            "h": th,
            "size": f"{tw}x{th}",
        })

    out_path = OUT / theme_dir.name / f"{family}.png"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out_path)
    return out_path, metas


def main() -> None:
    grand_index: dict[str, dict[str, list[dict]]] = {}

    for theme_dir in sorted(THEMES.iterdir()):
        if not theme_dir.is_dir() or theme_dir.name.startswith("_"):
            continue
        # Group files by family
        groups: dict[str, list[tuple[int, str]]] = defaultdict(list)
        for f in sorted(theme_dir.iterdir()):
            if f.suffix != ".png":
                continue
            family, variant = parse_filename(f.name)
            groups[family].append((variant, f.name))

        theme_index: dict[str, list[dict]] = {}
        for family, variants in sorted(groups.items()):
            variants.sort()
            _, metas = render_family_sheet(theme_dir, family, variants)
            theme_index[family] = metas

        grand_index[theme_dir.name] = theme_index
        print(f"  {theme_dir.name:<40} {len(theme_index)} families")

    idx_path = OUT / "_families_index.json"
    idx_path.write_text(json.dumps(grand_index, indent=2), encoding="utf-8")
    total_fam = sum(len(v) for v in grand_index.values())
    total_var = sum(len(vs) for v in grand_index.values() for vs in v.values())
    print(f"\nTOTAL : {total_fam} families, {total_var} variants")


if __name__ == "__main__":
    main()
