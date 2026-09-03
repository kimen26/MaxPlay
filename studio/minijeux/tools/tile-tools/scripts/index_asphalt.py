"""
Crée une planche-contact des 27 variations d'asphalt + 54 de sidewalk_1
pour identifier visuellement chaque tile (lignes blanches, marquages, etc.)
"""
import os
from PIL import Image, ImageDraw, ImageFont

TILES_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles\roads'
TILE = 48
GAP = 8
COLS = 10  # 10 tiles par ligne

def make_sheet(name, prefix, max_n, out):
    rows = (max_n + COLS - 1) // COLS
    w = COLS * (TILE + GAP) + GAP
    h = rows * (TILE + GAP + 14) + 30
    sheet = Image.new('RGBA', (w, h), (32, 32, 48, 255))
    draw = ImageDraw.Draw(sheet)
    draw.text((8, 6), f"{name} — {max_n} variations", fill=(255, 224, 102, 255))
    for i in range(1, max_n + 1):
        path = os.path.join(TILES_DIR, f"{prefix}{i}.png")
        if not os.path.isfile(path): continue
        col = (i - 1) % COLS
        row = (i - 1) // COLS
        x = GAP + col * (TILE + GAP)
        y = 24 + row * (TILE + GAP + 14)
        try:
            t = Image.open(path).convert('RGBA')
            sheet.paste(t, (x, y), t)
            draw.text((x + 2, y + TILE), str(i), fill=(255, 255, 255, 255))
        except Exception as e:
            print(f"FAIL {i}: {e}")
    sheet.save(out)
    print(f"OK → {out}")

if __name__ == '__main__':
    out_dir = os.path.dirname(os.path.abspath(__file__))
    make_sheet(
        "Asphalt_1 variations",
        "ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_",
        27,
        os.path.join(out_dir, "_index_asphalt.png"),
    )
    make_sheet(
        "Sidewalk_1 variations",
        "ME_Singles_City_Terrains_48x48_Sidewalk_1_",
        54,
        os.path.join(out_dir, "_index_sidewalk1.png"),
    )
