"""Import ME_Theme_Sorter complet vers studio/max-adventure/public/assets/tiles/themes/.

Structure cible :
  themes/
    _planches/         # Les PNG de planche-contact par thème
    01_terrains_fences/
    02_city_terrains/
    03_city_props/
    ...
    24_additional_houses/

Chaque dossier theme contient les singles, slugified pour usage web.
Génère aussi themes/_index.json avec dimensions natives.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

from PIL import Image

SRC = Path(
    r"C:/ProjetsPerso/Claude_Projects/MaxPlay/temp/Design to sort/"
    r"Modern_Exteriors_48x48/ME_Theme_Sorter_48x48"
)
DST = Path(
    r"C:/ProjetsPerso/Claude_Projects/MaxPlay/studio/max-adventure/public/assets/tiles/themes"
)

THEME_RE = re.compile(r"^(\d+)_(.+?)_(?:Singles_)?48x48$")


def slug(text: str) -> str:
    return text.lower().replace("__", "_").strip("_")


def parse_dir(name: str) -> tuple[int, str, bool]:
    m = THEME_RE.match(name)
    if not m:
        return 0, name, False
    num = int(m.group(1))
    theme = m.group(2)
    is_singles = name.endswith("_Singles_48x48")
    return num, theme, is_singles


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    planches = DST / "_planches"
    planches.mkdir(exist_ok=True)

    index: dict[str, list[dict]] = {}

    for entry in sorted(SRC.iterdir()):
        if entry.is_dir() and entry.name.endswith("_Singles_48x48"):
            num, theme, _ = parse_dir(entry.name)
            theme_slug = f"{num:02d}_{slug(theme)}"
            theme_dir = DST / theme_slug
            theme_dir.mkdir(exist_ok=True)

            tiles_meta: list[dict] = []
            for tile in sorted(entry.iterdir()):
                if not tile.suffix == ".png":
                    continue
                short = re.sub(r"^ME_Singles_[A-Za-z_]+_48x48_", "", tile.name)
                target = theme_dir / short
                if not target.exists():
                    shutil.copy2(tile, target)
                with Image.open(target) as im:
                    w, h = im.size
                tiles_meta.append({
                    "file": short,
                    "w": w // 48,
                    "h": h // 48,
                })
            index[theme_slug] = tiles_meta
            print(f"  {theme_slug:<40} {len(tiles_meta)} tiles")

        elif entry.is_file() and entry.suffix == ".png":
            num, theme, _ = parse_dir(entry.stem)
            if num == 0:
                continue
            target = planches / f"{num:02d}_{slug(theme)}.png"
            if not target.exists():
                shutil.copy2(entry, target)

    index_path = DST / "_index.json"
    index_path.write_text(json.dumps(index, indent=2), encoding="utf-8")
    total = sum(len(v) for v in index.values())
    print(f"\nTOTAL : {total} tiles dans {len(index)} themes")
    print(f"Index -> {index_path}")


if __name__ == "__main__":
    main()
