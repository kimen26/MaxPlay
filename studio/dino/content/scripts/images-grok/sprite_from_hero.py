#!/usr/bin/env python
"""Sprite dino (animal detoure en COULEUR) derive d'une scene paleoart validee.

Meme principe que ombre_rembg.py, mais on GARDE les pixels couleur au lieu de les
aplatir en noir. Format aligne sur les 69 sprites existants : PNG RGBA, largeur 800.

Genere aussi la vignette `_tete` (crop serre sur la tete) avec --tete : la tete est
cherchee du cote ou le sujet est le plus HAUT et le plus FIN (le museau), ce qui
marche pour un profil ; verifier visuellement, le crop reste une heuristique.

Usage:
  python sprite_from_hero.py <scene.jpg> <out_sprite.png> [--largeur 800]
  python sprite_from_hero.py <scene.jpg> <out_sprite.png> --tete <out_tete.png>
"""
import os
import sys

from PIL import Image, ImageFilter

LARGEUR_DEFAUT = 800
SEUIL_ALPHA = 128
MIN_ILOT = 0.02
PAD = 4


def _composantes(mask, w, h):
    labels = [0] * (w * h)
    tailles = []
    for depart in range(w * h):
        if not mask[depart] or labels[depart]:
            continue
        idx = len(tailles) + 1
        pile = [depart]
        labels[depart] = idx
        taille = 0
        while pile:
            p = pile.pop()
            taille += 1
            x, y = p % w, p // w
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        q = ny * w + nx
                        if mask[q] and not labels[q]:
                            labels[q] = idx
                            pile.append(q)
        tailles.append(taille)
    return labels, tailles


def sprite(src, dst, largeur=LARGEUR_DEFAUT, tete=None):
    from rembg import remove

    with open(src, 'rb') as f:
        brut = remove(f.read())
    tmp = dst + '.rembg.png'
    with open(tmp, 'wb') as f:
        f.write(brut)
    im = Image.open(tmp).convert('RGBA')
    w, h = im.size
    alpha = list(im.split()[3].getdata())
    mask = [1 if a >= SEUIL_ALPHA else 0 for a in alpha]
    if not sum(mask):
        print('  rembg n\'a rien trouve')
        os.remove(tmp)
        return None

    # Jette les residus de decor detaches du sujet.
    labels, tailles = _composantes(mask, w, h)
    if tailles:
        plus_gros = max(tailles)
        garde = {i + 1 for i, t in enumerate(tailles) if t >= plus_gros * MIN_ILOT}
        jetes = sum(1 for i in range(w * h) if mask[i] and labels[i] not in garde)
        mask = [1 if (mask[i] and labels[i] in garde) else 0 for i in range(w * h)]
        print(f'  composantes={len(tailles)} gardees={len(garde)} px_jetes={jetes}')

    m = Image.new('L', (w, h), 0)
    m.putdata([255 if v else 0 for v in mask])
    m = m.filter(ImageFilter.MedianFilter(5)).point(lambda v: 255 if v >= 128 else 0)
    out = im.copy()
    out.putalpha(m.filter(ImageFilter.GaussianBlur(0.5)))

    bbox = out.getbbox()
    if bbox:
        bbox = (max(0, bbox[0] - PAD), max(0, bbox[1] - PAD),
                min(w, bbox[2] + PAD), min(h, bbox[3] + PAD))
        out = out.crop(bbox)
    plein = out.copy()
    if out.width != largeur:
        out = out.resize((largeur, max(1, round(out.height * largeur / out.width))), Image.LANCZOS)
    out.save(dst)
    print(f'  -> {os.path.basename(dst)} {out.size[0]}x{out.size[1]}')

    if tete:
        # La tete est du cote le plus haut du sujet : on compare la hauteur occupee
        # dans le premier et le dernier tiers, et on croppe un carre de ce cote.
        pw, ph = plein.size
        pa = plein.split()[3].load()
        def hauteur(x0, x1):
            haut = ph
            for x in range(x0, x1):
                for y in range(ph):
                    if pa[x, y] > 128:
                        haut = min(haut, y)
                        break
            return haut
        gauche = hauteur(0, pw // 3)
        droite = hauteur(pw - pw // 3, pw)
        cote_gauche = gauche <= droite
        cote = min(pw // 3, ph)
        x0 = 0 if cote_gauche else pw - cote
        # cadre sur la partie haute du sujet de ce cote
        y0 = max(0, min(gauche if cote_gauche else droite, ph - cote))
        crop = plein.crop((x0, y0, min(pw, x0 + cote), min(ph, y0 + cote)))
        crop = crop.resize((largeur, round(crop.height * largeur / crop.width)), Image.LANCZOS)
        crop.save(tete)
        print(f'  -> {os.path.basename(tete)} {crop.size[0]}x{crop.size[1]} '
              f'(cote {"gauche" if cote_gauche else "droit"})')
    os.remove(tmp)
    return dst


def main(argv):
    args = [a for a in argv if not a.startswith('--')]
    flags = {a.split('=')[0]: (a.split('=', 1)[1] if '=' in a else True) for a in argv if a.startswith('--')}
    if len(args) < 2:
        print(__doc__)
        return 1
    largeur = int(flags.get('--largeur', LARGEUR_DEFAUT))
    # --tete peut prendre sa valeur en '=' ou en argument positionnel suivant
    tete = flags.get('--tete')
    if tete is True:
        tete = args[2] if len(args) > 2 else None
    print(os.path.basename(args[0]))
    sprite(args[0], args[1], largeur, tete)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
