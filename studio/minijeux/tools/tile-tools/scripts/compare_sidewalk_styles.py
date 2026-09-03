"""Genere une planche-comparaison des 6 styles Sidewalk_1 a Sidewalk_6.

Pour chaque style, montre les variations cles cote a cote :
  - 9 (trottoir plain)
  - 4 (transition gauche)
  - 8 (transition droite)
  - 6 (transition haut)
  - 2 (transition bas)
  - 50, 51, 52, 53 (rond-point quarts)
  - 45, 46 (P)
  - 48, 49 (BUS)

Sortie : compare_sidewalk_styles.png
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

THEMES = Path(
    r"C:/ProjetsPerso/Claude_Projects/MaxPlay/studio/max-adventure/public/assets/tiles/themes"
)
CITY = THEMES / "02_city_terrains"
OUT = Path(__file__).parent / "compare_sidewalk_styles.png"

KEY_VARIATIONS = [9, 4, 8, 6, 2, 45, 48, 50, 51, 52, 53]
TILE = 48
ZOOM = 2  # afficher x2 pour mieux voir
CELL = TILE * ZOOM
LABEL_W = 100
GAP = 8
HEADER_H = 30


def load_var(family: int, var: int) -> Image.Image | None:
    path = CITY / f"Sidewalk_{family}_{var}.png"
    if not path.exists():
        return None
    return Image.open(path).convert("RGBA")


def main() -> None:
    n_cols = len(KEY_VARIATIONS)
    n_rows = 6  # Sidewalk_1 to _6

    width = LABEL_W + n_cols * (CELL + GAP)
    height = HEADER_H + n_rows * (CELL + GAP)

    canvas = Image.new("RGBA", (width, height), (40, 40, 40, 255))
    draw = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype("arial.ttf", 14)
    except Exception:
        font = ImageFont.load_default()

    # Header : variation numbers
    for c, var in enumerate(KEY_VARIATIONS):
        x = LABEL_W + c * (CELL + GAP) + CELL // 2 - 8
        draw.text((x, 8), f"_{var}", fill="white", font=font)

    for r in range(n_rows):
        family = r + 1
        y = HEADER_H + r * (CELL + GAP)
        draw.text((8, y + CELL // 2 - 8), f"Sidewalk_{family}", fill="yellow", font=font)
        for c, var in enumerate(KEY_VARIATIONS):
            x = LABEL_W + c * (CELL + GAP)
            tile = load_var(family, var)
            if tile is None:
                draw.rectangle([x, y, x + CELL, y + CELL], outline="red", width=2)
                draw.text((x + 4, y + 4), "X", fill="red", font=font)
                continue
            # Si tile native > 1x1, on prend juste le coin haut-gauche pour comparer
            if tile.size != (TILE, TILE):
                tile = tile.crop((0, 0, TILE, TILE))
            zoomed = tile.resize((CELL, CELL), Image.Resampling.NEAREST)
            canvas.paste(zoomed, (x, y), zoomed)

    canvas.save(OUT)
    print(f"OK -> {OUT}")


if __name__ == "__main__":
    main()
