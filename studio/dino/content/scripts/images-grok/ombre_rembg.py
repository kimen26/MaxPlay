#!/usr/bin/env python
"""Ombre chinoise a partir d'une scene paleoart, via rembg (pipeline 2026-07-20).

Pourquoi rembg et pas un seuillage couleur : dans une scene reelle, l'animal partage
sa teinte avec le decor (sol boueux, chaussee, troncs) — le seuillage attrape le sol
et les arbres (constat 2026-07-30). rembg segmente le SUJET par reseau, sans se fier
a la couleur, puis on aplatit en noir plein.

Sortie conforme aux 69 ombres existantes : PNG noir plein sur alpha, largeur 600,
halo semi-transparent maintenu sous ~1.5 % (cf. clean_ombre.py).

Usage:
  python ombre_rembg.py <scene.jpg> <out_ombre.png> [--largeur 600] [--garde-plus-gros]
  python ombre_rembg.py --compare <out_dir> <scene1.jpg> <scene2.jpg> ...
     -> sort une silhouette par scene, pour choisir la plus lisible a l'oeil
"""
import os
import sys

from PIL import Image, ImageFilter

LARGEUR_DEFAUT = 600
PAD = 6
SEUIL_ALPHA = 128     # rembg rend un alpha doux : on le durcit en binaire
MIN_ILOT = 0.02       # ilot < 2 % du sujet = residu de decor, on le jette


def _composantes(mask, w, h):
    """Etiquette les composantes connexes (8-connexite), retourne (labels, tailles)."""
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


def silhouette(src, dst, largeur=LARGEUR_DEFAUT, garde_plus_gros=True):
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
    couvert = sum(mask)
    if not couvert:
        print(f'  {os.path.basename(src)} : rembg n\'a rien trouve')
        os.remove(tmp)
        return None

    if garde_plus_gros:
        labels, tailles = _composantes(mask, w, h)
        if tailles:
            plus_gros = max(tailles)
            garde = {i + 1 for i, t in enumerate(tailles) if t >= plus_gros * MIN_ILOT}
            jetes = sum(1 for i in range(w * h) if mask[i] and labels[i] not in garde)
            mask = [1 if (mask[i] and labels[i] in garde) else 0 for i in range(w * h)]
            print(f'  composantes={len(tailles)} gardees={len(garde)} px_jetes={jetes}')

    sil = Image.new('L', (w, h), 0)
    sil.putdata([255 if m else 0 for m in mask])
    sil = sil.filter(ImageFilter.MedianFilter(5))
    sil = sil.point(lambda v: 255 if v >= 128 else 0)

    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    out.putalpha(sil.filter(ImageFilter.GaussianBlur(0.5)))
    bbox = out.getbbox()
    if bbox:
        bbox = (max(0, bbox[0] - PAD), max(0, bbox[1] - PAD),
                min(w, bbox[2] + PAD), min(h, bbox[3] + PAD))
        out = out.crop(bbox)
    if out.width != largeur:
        out = out.resize((largeur, max(1, round(out.height * largeur / out.width))), Image.LANCZOS)

    ap = list(out.split()[3].getdata())
    halo = 100.0 * sum(1 for a in ap if 20 < a < 200) / len(ap)
    remplissage = 100.0 * sum(1 for a in ap if a >= 200) / len(ap)
    out.save(dst)
    os.remove(tmp)
    print(f'  -> {os.path.basename(dst)} {out.size[0]}x{out.size[1]} '
          f'halo={halo:.2f}% remplissage={remplissage:.1f}%')
    return dst


def main(argv):
    args = [a for a in argv if not a.startswith('--')]
    flags = {a.split('=')[0]: (a.split('=', 1)[1] if '=' in a else True) for a in argv if a.startswith('--')}
    largeur = int(flags.get('--largeur', LARGEUR_DEFAUT))

    if '--compare' in flags:
        if len(args) < 2:
            print('usage: ombre_rembg.py --compare <out_dir> <scene...>')
            return 1
        outdir, scenes = args[0], args[1:]
        os.makedirs(outdir, exist_ok=True)
        for s in scenes:
            base = os.path.splitext(os.path.basename(s))[0]
            print(base)
            silhouette(s, os.path.join(outdir, base + '_sil.png'), largeur)
        return 0

    if len(args) < 2:
        print(__doc__)
        return 1
    print(os.path.basename(args[0]))
    silhouette(args[0], args[1], largeur)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
