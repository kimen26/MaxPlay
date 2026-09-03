"""Génère une planche zoomée x4 pour mieux voir chaque tile."""
import os
from PIL import Image, ImageDraw

TILES_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles\roads'
OUT_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\web\tile-tools'

def make_zoom(name, prefix, max_n, cols, scale, out):
    rows = (max_n + cols - 1) // cols
    cell_w = 48 * scale + 32  # tile + label
    cell_h = 48 * scale + 24
    sheet_w = cols * cell_w + 16
    sheet_h = rows * cell_h + 32
    sheet = Image.new('RGBA', (sheet_w, sheet_h), (32, 32, 48, 255))
    draw = ImageDraw.Draw(sheet)
    draw.text((8, 6), f"{name} (x{scale})", fill=(255, 224, 102, 255))
    for i in range(1, max_n + 1):
        path = os.path.join(TILES_DIR, f"{prefix}{i}.png")
        if not os.path.isfile(path): continue
        c = (i - 1) % cols
        r = (i - 1) // cols
        x = 8 + c * cell_w
        y = 28 + r * cell_h
        try:
            t = Image.open(path).convert('RGBA')
            # n'inclure dans la planche que les tiles 48×48 (les autres sont composites)
            if t.size == (48, 48):
                t_big = t.resize((48 * scale, 48 * scale), Image.NEAREST)
                sheet.paste(t_big, (x, y), t_big)
            else:
                # placer petit + indication taille
                sheet.paste(t, (x, y), t)
                draw.text((x, y + t.height + 2), f"{t.size[0]//48}x{t.size[1]//48}", fill=(255, 100, 100, 255))
            draw.text((x, y + 48 * scale + 4), f"#{i}", fill=(255, 255, 255, 255))
        except Exception as e:
            print(f"FAIL {i}: {e}")
    sheet.save(out)
    print(f"OK {out}")

if __name__ == '__main__':
    make_zoom("Asphalt_1", "ME_Singles_City_Terrains_48x48_Asphalt_1_Variation_", 27, 7, 3,
              os.path.join(OUT_DIR, "_zoom_asphalt.png"))
    make_zoom("Sidewalk_1 (1-44 = bordures+zebras)", "ME_Singles_City_Terrains_48x48_Sidewalk_1_", 44, 8, 3,
              os.path.join(OUT_DIR, "_zoom_sidewalk1_borders.png"))
