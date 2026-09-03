"""
Génère des planches-contact PNG pour chaque catégorie.
Chaque tile est rendue à sa taille native, avec un libellé.
Compose des feuilles ~1500px de large.
"""
import json
import os
from PIL import Image, ImageDraw

TILES_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles'
OUT_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\web\tile-tools'
INV_PATH = os.path.join(OUT_DIR, '_inventory.json')

# Grouping pour limiter la taille et faire des sous-feuilles
GROUPS = {
    'roads_marquages': {'cat': 'roads', 'pattern': 'Sidewalk_1_'},
    'roads_terrains':  {'cat': 'roads', 'pattern': 'Asphalt_1_'},
    'roads_grass':     {'cat': 'roads', 'pattern': 'Grass_'},
    'roads_fences':    {'cat': 'roads', 'pattern': 'Fence_'},
    'roads_walls':     {'cat': 'roads', 'pattern': 'Wall_'},
    'roads_water':     {'cat': 'roads', 'pattern': 'Water'},
    'buildings_villas': {'cat': 'buildings', 'pattern': 'Villas_'},
    'buildings_condo':  {'cat': 'buildings', 'pattern': 'Generic_Building_48x48_Condo'},
    'buildings_modular': {'cat': 'buildings', 'pattern': 'Floor_Modular_Building_48x48_Ground_Floor'},
    'buildings_modular_middle': {'cat': 'buildings', 'pattern': 'Floor_Modular_Building_48x48_Middle_Floor'},
    'buildings_modular_roof':   {'cat': 'buildings', 'pattern': 'Floor_Modular_Building_48x48_Roof'},
    'parks_plants':    {'cat': 'parks', 'pattern': 'Bush'},
    'parks_flowers':   {'cat': 'parks', 'pattern': 'Flower'},
    'parks_furniture': {'cat': 'parks', 'pattern': 'Bench'},
    'parks_fountains': {'cat': 'parks', 'pattern': 'Fountain'},
    'parks_statues':   {'cat': 'parks', 'pattern': 'Statue'},
    'parks_misc':      {'cat': 'parks', 'pattern': ''},  # tout
    'props_trash':     {'cat': 'props', 'pattern': 'Trash'},
    'props_signs':     {'cat': 'props', 'pattern': 'Sign'},
    'props_lights':    {'cat': 'props', 'pattern': 'Pole'},
    'props_misc':      {'cat': 'props', 'pattern': ''},  # tout
    'stations_school': {'cat': 'stations', 'pattern': 'School'},
    'stations_metro':  {'cat': 'stations', 'pattern': 'Subway'},
    'animated':        {'cat': 'animated', 'pattern': ''},
}

MAX_W = 1600  # largeur max de la planche
GAP = 4
LABEL_H = 16
BG = (32, 32, 48, 255)
FG = (255, 224, 102, 255)
WHITE = (240, 240, 240, 255)


def make_sheet(group_name, files, out_path):
    if not files:
        print(f"SKIP {group_name}: 0 files")
        return
    # On charge images, on les stocke
    items = []
    for rel in files:
        full = os.path.join(TILES_DIR, rel.replace('/', os.sep))
        try:
            img = Image.open(full).convert('RGBA')
            items.append((rel, img))
        except Exception as e:
            print(f"  FAIL {rel}: {e}")

    # Pack en lignes : on fait du flow horizontal jusqu'à MAX_W puis nouvelle ligne
    rows = []  # list of (height, [items])
    cur = []; cur_w = GAP; cur_h = 0
    for rel, img in items:
        w = img.width + GAP
        if cur_w + w > MAX_W and cur:
            rows.append((cur_h, cur))
            cur = []; cur_w = GAP; cur_h = 0
        cur.append((rel, img))
        cur_w += w
        cur_h = max(cur_h, img.height + LABEL_H)
    if cur:
        rows.append((cur_h, cur))

    total_h = 28 + sum(h + GAP for h, _ in rows)
    sheet = Image.new('RGBA', (MAX_W, total_h), BG)
    draw = ImageDraw.Draw(sheet)
    draw.text((8, 6), f"{group_name} — {len(items)} tiles", fill=FG)
    y = 28
    for h, row in rows:
        x = GAP
        for rel, img in row:
            sheet.paste(img, (x, y), img)
            # Label : nom court + taille
            short = rel.split('/')[-1].replace('.png', '')
            short = short[-30:] if len(short) > 30 else short
            label = f"{short} {img.width}x{img.height}"
            draw.text((x, y + img.height), label[:max(1, img.width // 6)], fill=WHITE)
            x += img.width + GAP
        y += h + GAP

    sheet.save(out_path)
    print(f"OK {group_name} -> {out_path} ({MAX_W}x{total_h}, {len(items)} tiles)")


def main():
    with open(INV_PATH, 'r', encoding='utf-8') as f:
        inv = json.load(f)
    all_files = list(inv['all'].keys())
    for group_name, cfg in GROUPS.items():
        cat = cfg['cat']
        pattern = cfg['pattern']
        # Sélection
        files = sorted([
            f for f in all_files
            if f.startswith(cat + '/') and (not pattern or pattern in f)
        ])
        # Pour les "misc", on enlève ceux qui ont déjà été pris dans un sous-groupe
        out = os.path.join(OUT_DIR, f'_sheet_{group_name}.png')
        make_sheet(group_name, files[:200], out)  # cap à 200 par feuille pour rester lisible


if __name__ == '__main__':
    main()
