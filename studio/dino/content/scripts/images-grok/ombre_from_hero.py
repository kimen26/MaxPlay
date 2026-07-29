#!/usr/bin/env python
"""Derive une ombre chinoise PROPRE a partir d'une scene paleoart couleur.

Pourquoi : demander la silhouette a l'IA donne des degrades flous (halo de bavure,
cf. incident 2026-07-30) ET redistribue les traits morphologiques au hasard — la
crete de Saurolophus revenait fausse a chaque tirage. Decouper l'animal dans le
hero DEJA VALIDE garantit la bonne bete, la bonne crete, et un noir franc.

Methode : l'operateur donne un point interieur a l'animal (ou on prend le centre),
on segmente par proximite de couleur en 8-connexite depuis ce germe (l'animal est
d'une teinte homogene face au vert du decor), on remplit les trous, on seuille dur,
puis on ecrit un PNG noir plein sur alpha transparent, recadre avec une petite marge.

Usage:
  python ombre_from_hero.py <hero.jpg> <out_ombre.png> [--seed x,y] [--tol 42]
                            [--largeur 600] [--dry]
"""
import sys
import os
from collections import deque

from PIL import Image, ImageFilter

TOL_DEFAUT = 42        # ecart de couleur max (somme RGB) accepte depuis le germe
LARGEUR_DEFAUT = 600   # largeur de sortie, alignee sur les ombres existantes
PAD = 6


def segmente(im, seed, tol):
    """Region growing 8-connexe depuis seed, sur proximite de couleur locale."""
    w, h = im.size
    px = im.load()
    sx, sy = seed
    ref = px[sx, sy][:3]
    dedans = bytearray(w * h)
    q = deque([(sx, sy)])
    dedans[sy * w + sx] = 1

    def proche(c, r):
        return abs(c[0] - r[0]) + abs(c[1] - r[1]) + abs(c[2] - r[2]) <= tol

    while q:
        x, y = q.popleft()
        cur = px[x, y][:3]
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dx == 0 and dy == 0:
                    continue
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and not dedans[ny * w + nx]:
                    c = px[nx, ny][:3]
                    # on compare au voisin courant ET au germe : suit les degrades
                    # du corps sans deborder dans le decor.
                    if proche(c, cur) and proche(c, ref):
                        dedans[ny * w + nx] = 1
                        q.append((nx, ny))
    return dedans


def remplis_trous(mask, w, h):
    """Bouche les poches internes (oeil, reflets) : flood depuis le bord sur le vide."""
    dehors = bytearray(w * h)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            i = y * w + x
            if not mask[i] and not dehors[i]:
                dehors[i] = 1
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            i = y * w + x
            if not mask[i] and not dehors[i]:
                dehors[i] = 1
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                i = ny * w + nx
                if not mask[i] and not dehors[i]:
                    dehors[i] = 1
                    q.append((nx, ny))
    return bytearray(0 if dehors[i] else 1 for i in range(w * h))


def main(argv):
    args = [a for a in argv if not a.startswith('--')]
    flags = {a.split('=')[0]: (a.split('=', 1)[1] if '=' in a else True) for a in argv if a.startswith('--')}
    if len(args) < 2:
        print(__doc__)
        return 1
    src, dst = args[0], args[1]
    tol = int(flags.get('--tol', TOL_DEFAUT))
    largeur = int(flags.get('--largeur', LARGEUR_DEFAUT))
    dry = '--dry' in flags

    im = Image.open(src).convert('RGB')
    w, h = im.size
    if '--seed' in flags and flags['--seed'] is not True:
        sx, sy = (int(v) for v in str(flags['--seed']).split(','))
    else:
        sx, sy = w // 2, h // 2
    print(f"{os.path.basename(src)} {w}x{h}  germe=({sx},{sy}) tol={tol}")

    mask = segmente(im, (sx, sy), tol)
    couvert = sum(mask)
    print(f"  region: {couvert} px ({100.0*couvert/(w*h):.1f}% de l'image)")
    if couvert < w * h * 0.02:
        print("  ATTENTION region minuscule — germe hors de l'animal ou tol trop bas.")
    if couvert > w * h * 0.75:
        print("  ATTENTION region enorme — la couleur a fui dans le decor, baisse --tol.")

    mask = remplis_trous(mask, w, h)

    sil = Image.new('L', (w, h), 0)
    sil.putdata([255 if m else 0 for m in mask])
    sil = sil.filter(ImageFilter.MedianFilter(5))   # mange les pixels isoles
    sil = sil.point(lambda v: 255 if v >= 128 else 0)

    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    out.putalpha(sil.filter(ImageFilter.GaussianBlur(0.5)))
    bbox = out.getbbox()
    if bbox:
        bbox = (max(0, bbox[0] - PAD), max(0, bbox[1] - PAD),
                min(w, bbox[2] + PAD), min(h, bbox[3] + PAD))
        out = out.crop(bbox)
    if out.width > largeur:
        out = out.resize((largeur, max(1, round(out.height * largeur / out.width))), Image.LANCZOS)
    print(f"  -> {out.size[0]}x{out.size[1]}" + ("  [dry]" if dry else ""))
    if not dry:
        out.save(dst)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
