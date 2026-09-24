#!/usr/bin/env python
"""Bebe dino dans son oeuf (fond gris uni) -> webp transparent pret pour l'eclosion.

Pourquoi rembg et pas detoure_sprite.py : la coquille est creme/grise, proche du
fond gris -> le color-key troue la coquille (constat Triceratops 2026-09-25).
rembg segmente le SUJET (bebe + coquille) sans se fier a la couleur.

Sortie : site/img/dinos/bebes/<Nom>_bebe.webp, cote max 512 px, alpha doux garde
(le bebe a du poil/plumes/bord de coquille : un alpha binaire crenelerait).

Usage: python bebe_detoure.py <in.png> <out.webp> [--cote 512]
"""
import sys

from PIL import Image
from rembg import remove

COTE_DEFAUT = 512
PAD = 8
SEUIL_CROP = 16  # alpha sous ce seuil = halo, ignore pour le recadrage


def detoure(src, dst, cote):
    im = Image.open(src).convert("RGBA")
    out = remove(im)
    alpha = out.getchannel("A").point(lambda a: 255 if a >= SEUIL_CROP else 0)
    bbox = alpha.getbbox()
    if not bbox:
        raise SystemExit("ERREUR : rembg n'a trouve aucun sujet dans " + src)
    x0, y0, x1, y1 = bbox
    out = out.crop((max(0, x0 - PAD), max(0, y0 - PAD),
                    min(out.width, x1 + PAD), min(out.height, y1 + PAD)))
    out.thumbnail((cote, cote), Image.LANCZOS)
    out.save(dst, "WEBP", quality=85, method=6)
    print("OK ->", dst, out.size)


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) < 2:
        raise SystemExit(__doc__)
    cote = COTE_DEFAUT
    if "--cote" in args:
        cote = int(args[args.index("--cote") + 1])
    detoure(args[0], args[1], cote)
