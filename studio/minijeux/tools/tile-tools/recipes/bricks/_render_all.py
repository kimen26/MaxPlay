"""Render des 8 briques candidates 'coin' du tileset LimeZu.

Pour chaque tile candidate, on pose la tile au CENTRE d'une grille 3x3
avec :
  - asphalte plein autour (pour voir le coin convexe/concave)
  - OU trottoir plein autour (pour voir l'autre orientation)

But : Papa Yann voit ce que CHAQUE tile fait vraiment dans son contexte naturel,
on figue ce qui est 'courbe extérieure' vs 'point intérieur'.

Lancer :  python recipes/bricks/_render_all.py
"""

import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent  # tile-tools/

# Tiles trottoir spéciales du sidewalk_1 série
ASPH = 'roads/ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png'
TROT = 'roads/ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png'

BRIQUES = [
    # (nom, tile, contexte_default)
    ('sw01_int_se', 'Sidewalk_1_1',  'asphalt'),   # candidat point intérieur SE
    ('sw03_int_sw', 'Sidewalk_1_3',  'asphalt'),   # candidat point intérieur SW
    ('sw05_int_ne', 'Sidewalk_1_5',  'asphalt'),   # candidat point intérieur NE
    ('sw07_int_nw', 'Sidewalk_1_7',  'asphalt'),   # candidat point intérieur NW
    ('sw11_ext_se', 'Sidewalk_1_11', 'asphalt'),   # candidat courbe extérieure SE
    ('sw12_ext_sw', 'Sidewalk_1_12', 'asphalt'),
    ('sw13_ext_nw', 'Sidewalk_1_13', 'asphalt'),
    ('sw14_ext_ne', 'Sidewalk_1_14', 'asphalt'),
]


def build_recipe(name: str, tile_short: str, context: str) -> str:
    tile = f'roads/ME_Singles_City_Terrains_48x48_{tile_short}.png'
    bg = ASPH if context == 'asphalt' else TROT
    return f'''"""Brique {name} — tile {tile_short} sur fond {context}.

Tile testée au centre d'une grille 3x3 entourée de {context}.
Permet de voir CE que fait cette tile dans son contexte naturel.
"""

T = '{tile}'
BG = '{bg}'

ground = [
    [BG, BG, BG],
    [BG, T,  BG],
    [BG, BG, BG],
]

SNIPPET = {{'name': '{name}', 'cols': 3, 'rows': 3, 'ground': ground, 'objects': []}}
'''


def main() -> None:
    rendered = []
    for name, tile_short, ctx in BRIQUES:
        recipe_path = HERE / f'test_brique_{name}.py'
        recipe_path.write_text(build_recipe(name, tile_short, ctx), encoding='utf-8')
        # render
        rel = recipe_path.relative_to(ROOT)
        res = subprocess.run(
            [sys.executable, 'scripts/render.py', str(rel).replace('\\', '/')],
            cwd=ROOT, capture_output=True, text=True,
        )
        if res.returncode == 0:
            rendered.append((name, recipe_path.with_suffix('.png')))
            print(f'  OK -> {name}')
        else:
            print(f'  FAIL -> {name}: {res.stderr.strip()}')
    print(f'\n{len(rendered)}/8 briques rendues.')


if __name__ == '__main__':
    main()
