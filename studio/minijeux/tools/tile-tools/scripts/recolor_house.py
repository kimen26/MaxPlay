"""Genere des variantes de couleur d'une Toy_House.

Toy_House_1 a un toit rouge + corps vert. On genere :
  Toy_House_blue.png : toit BLEU + corps creme
  Toy_House_yellow.png : toit JAUNE + corps creme

Approche : analyse HSL pixel par pixel, remappe la teinte selon zones.
"""
import os
from PIL import Image
import colorsys

SRC_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles\buildings'

def shift_hue(img, target_hue_red, target_hue_green):
    """Pour chaque pixel : si rouge dominant (toit), shift vers target_hue_red.
    Si vert dominant (corps), shift vers target_hue_green.
    """
    px = img.load()
    w, h = img.size
    out = Image.new('RGBA', (w, h))
    out_px = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                out_px[x, y] = (0, 0, 0, 0)
                continue
            hh, ll, ss = colorsys.rgb_to_hls(r/255, g/255, b/255)
            # Rouge : hue ~0 ou ~1
            is_red = (hh < 0.06 or hh > 0.92) and ss > 0.25
            # Vert : hue ~0.25-0.45
            is_green = 0.20 < hh < 0.50 and ss > 0.20
            if is_red:
                hh = target_hue_red
            elif is_green:
                hh = target_hue_green
            nr, ng, nb = colorsys.hls_to_rgb(hh, ll, ss)
            out_px[x, y] = (int(nr*255), int(ng*255), int(nb*255), a)
    return out

def main():
    # Variantes a partir de Toy_House_1 (toit rouge + corps vert)
    src = os.path.join(SRC_DIR, 'ME_Singles_Villas_48x48_Toy_House_1.png')
    img = Image.open(src).convert('RGBA')

    # Bleue : toit bleu + corps creme/beige (hue ~0.10 = jaune-orange clair)
    blue = shift_hue(img, target_hue_red=0.60, target_hue_green=0.10)
    blue.save(os.path.join(SRC_DIR, 'ME_Custom_Villas_48x48_Toy_House_Blue_1.png'))
    print('OK -> Toy_House_Blue_1')

    # Jaune : toit jaune + corps creme
    yellow = shift_hue(img, target_hue_red=0.13, target_hue_green=0.10)
    yellow.save(os.path.join(SRC_DIR, 'ME_Custom_Villas_48x48_Toy_House_Yellow_1.png'))
    print('OK -> Toy_House_Yellow_1')

    # Variante depuis Toy_House_2 pour diversite
    src2 = os.path.join(SRC_DIR, 'ME_Singles_Villas_48x48_Toy_House_2.png')
    img2 = Image.open(src2).convert('RGBA')
    blue2 = shift_hue(img2, target_hue_red=0.60, target_hue_green=0.10)
    blue2.save(os.path.join(SRC_DIR, 'ME_Custom_Villas_48x48_Toy_House_Blue_2.png'))
    print('OK -> Toy_House_Blue_2')

if __name__ == '__main__':
    main()
