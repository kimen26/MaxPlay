"""Scan tous les PNG de assets/tiles/ et genere tile_picker_data.js (100% couverture).

Strategie (refonte 2026-05-12 apres detection Papa Yann d'erreur w/h=1x1 systematique) :
- Recurse tous les PNG sous tiles/ (sauf full tilesheet).
- LIT les VRAIES dimensions via PIL (taille px / 48 = nombre de cellules).
- Categorise par premier dossier (roads, buildings, parks, props, stations, themes/<nom>).
- Pour chaque tile :
    file        : chemin relatif depuis tiles/
    name        : nom court lisible
    w, h        : VRAIES dimensions en cellules 48x48
    family      : nom de famille extrait (Sidewalk, Asphalt, Grass, etc.)
    variant     : numero de variation (1-6 typiquement) ou None
    n           : numero de tile dans la famille
    is_planche  : True si > 10 cellules dans une dimension (atlas complet)

Output : site/tile-tools/tile_picker_data.js
"""

from __future__ import annotations
import json
import re
from pathlib import Path
from PIL import Image

TILES_DIR = Path(r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles')
OUT_FILE = Path(__file__).parent.parent / 'tile_picker_data.js'

# Categories de top-niveau (= premier dossier sous tiles/)
TOP_LEVEL = {
    'roads':     'rue',
    'buildings': 'building',
    'parks':     'parc',
    'props':     'props',
    'stations':  'station',
}

# Pour themes/<sous-dossier> : on prefixe "theme_<nom>" et on map les noms connus
THEME_MAP = {
    '01_terrains_and_fences':       'terrain',
    '02_city_terrains':             'rue',
    '03_city_props':                'props',
    '04_generic_building':          'building',
    '05_floor_modular_building':    'building',
    '06_garage_sales':              'building',
    '07_villas':                    'building',
    '08_worksite':                  'props',
    '09_shopping_center_and_markets': 'building',
    '10_vehicles':                  'vehicule',
    '11_camping':                   'camping',
    '12_hotel_and_hospital':        'building',
    '13_school':                    'building',
    '14_swimming_pool':             'pool',
    '15_police_station':            'building',
    '16_office':                    'building',
}

# Nom de famille a detecter dans le filename (apres _48x48_)
# Exemples reels :
#   ME_Singles_City_Terrains_48x48_Sidewalk_1_9.png        -> family=Sidewalk, variant=1, n=9
#   ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_20.png -> family=Asphalt, variant=1, n=20
#   ME_Singles_City_Terrains_48x48_Grass_3_5.png            -> family=Grass, variant=3, n=5
#   ME_Singles_Generic_48x48_Wall_1_4.png                  -> family=Wall, variant=1, n=4
FAMILY_REGEX = re.compile(
    r'48x48_(?P<family>[A-Za-z]+)_(?P<variant>\d+)(?:_Variation)?_(?P<n>\d+)\.png$',
    re.IGNORECASE,
)


def short_name(rel_path: str) -> str:
    """Nom court humain : retire prefixes ME_/Singles_, garde l'essentiel."""
    name = Path(rel_path).stem
    # Coupe prefixes redondants
    for prefix in ('ME_Singles_', 'ME_', 'Singles_'):
        if name.startswith(prefix):
            name = name[len(prefix):]
            break
    # Coupe le tag de taille
    name = re.sub(r'48x48_', '', name)
    # Coupe le prefixe de pack (City_Terrains_ etc.) pour rester compact
    name = re.sub(r'^[A-Z][a-z_]+_(?=\w+_\d)', '', name, count=1)
    return name


def categorize(rel: Path) -> str:
    parts = rel.parts
    top = parts[0]
    if top == 'themes' and len(parts) > 1:
        theme_dir = parts[1]
        return THEME_MAP.get(theme_dir, f'theme_{theme_dir[:15]}')
    return TOP_LEVEL.get(top, top)


def parse_family(filename: str) -> tuple[str | None, int | None, int | None]:
    m = FAMILY_REGEX.search(filename)
    if not m:
        return None, None, None
    return m.group('family'), int(m.group('variant')), int(m.group('n'))


CELL = 48
PLANCHE_THRESHOLD = 10  # > 10 cellules sur 1 dimension = planche catalogue


def main() -> None:
    by_cat: dict[str, list[dict]] = {}
    skipped_full = 0
    nb_unit = nb_sprite = nb_planche = 0
    for png in TILES_DIR.rglob('*.png'):
        rel = png.relative_to(TILES_DIR)
        # Skip le full tileset Modern_Exteriors_Complete (image gigantesque)
        if 'Complete_Tileset' in png.name:
            skipped_full += 1
            continue

        # Lit les vraies dimensions
        try:
            with Image.open(png) as img:
                px_w, px_h = img.size
        except Exception:
            continue

        # Convertit en cellules 48x48 (arrondi superieur si non multiple)
        cells_w = max(1, round(px_w / CELL))
        cells_h = max(1, round(px_h / CELL))
        is_planche = cells_w > PLANCHE_THRESHOLD or cells_h > PLANCHE_THRESHOLD

        cat = categorize(rel)
        # Les planches vont dans une cat dediee
        if is_planche:
            cat = 'planches'
            nb_planche += 1
        elif cells_w == 1 and cells_h == 1:
            nb_unit += 1
        else:
            nb_sprite += 1

        family, variant, n = parse_family(png.name)
        entry = {
            'file': rel.as_posix(),
            'name': short_name(rel.as_posix()),
            'w': cells_w,
            'h': cells_h,
        }
        if is_planche:
            entry['planche'] = True
        if family:
            entry['family'] = family
            entry['variant'] = variant
            entry['n'] = n
        by_cat.setdefault(cat, []).append(entry)

    # Tri par categorie : briques manipulables d'abord (1x1 et 2x2), puis sprites plus gros.
    # Ordre de tri :
    #   1. petites tiles (max dim <= 2) en premier
    #   2. sprites moyens (max dim 3-10) ensuite
    #   3. famille, variant, n, file (pour stabilite intra-groupe)
    def size_bucket(e: dict) -> int:
        m = max(e['w'], e['h'])
        if m <= 2: return 0       # briques 1x1, 1x2, 2x1, 2x2
        return 1                   # sprites > 2

    for cat in by_cat:
        by_cat[cat].sort(key=lambda e: (
            size_bucket(e),
            e['w'] * e['h'],  # au sein du bucket, plus petit d'abord
            e.get('family') or '',
            e.get('variant') or 0,
            e.get('n') or 0,
            e['file'],
        ))

    total = sum(len(v) for v in by_cat.values())
    js = 'window.TILE_PICKER = ' + json.dumps(by_cat, indent=2, ensure_ascii=False) + ';\n'
    OUT_FILE.write_text(js, encoding='utf-8')

    print(f'OK -> {OUT_FILE.relative_to(Path.cwd())}')
    print(f'   {total} tiles (skipped {skipped_full} full-tilesheets)')
    print(f'   {nb_unit} unitaires 1x1 + {nb_sprite} sprites multi-cells + {nb_planche} planches catalogue')
    print(f'   {len(by_cat)} categories :')
    for cat, tiles in sorted(by_cat.items(), key=lambda kv: -len(kv[1])):
        print(f'     {cat:25s} : {len(tiles):5d} tiles')


if __name__ == '__main__':
    main()
