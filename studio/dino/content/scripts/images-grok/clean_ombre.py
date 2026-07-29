#!/usr/bin/env python
"""Nettoie le halo de bavure d'une ombre chinoise PNG (alpha semi-transparent parasite).

Probleme traite : les ombres derivees d'images generees gardent une trainee grise
diffuse autour de la silhouette (alpha entre 20 et 200 sur plusieurs % de l'image).
A l'ecran, la silhouette parait floue et sale au lieu d'etre un papier decoupe net.

Methode : seuillage franc de l'alpha (binaire), suppression des ilots detaches
(le halo forme des taches non connectees au sujet), puis re-adoucissement leger
d'un seul pixel pour garder un bord propre sans escalier. Recadre sur le contenu.

Usage: python clean_ombre.py <in.png> [out.png] [--seuil 128] [--min-ilot 0.002] [--dry]
       python clean_ombre.py --batch <dir> [...]        (traite tous les *_ombre.png)
"""
import sys
import os
import glob
from collections import deque

from PIL import Image, ImageFilter

SEUIL_DEFAUT = 128       # alpha >= seuil -> opaque, sinon transparent
MIN_ILOT_DEFAUT = 0.002  # un ilot < 0.2% des pixels opaques est du bruit, on le jette
PAD = 6                  # marge conservee autour du sujet apres recadrage


def _plus_gros_ilots(mask, w, h, min_ratio):
    """Garde les composantes connexes significatives. Retourne un nouveau masque.

    Le halo de bavure se presente en taches detachees du sujet : on les identifie
    par connexite 8 puis on ne conserve que celles qui pesent assez lourd par
    rapport a la plus grosse (le sujet). Les pattes fines restent connectees au
    corps, elles ne sont donc jamais victimes de ce filtre.
    """
    total = sum(mask)
    if total == 0:
        return mask, 0

    labels = bytearray(w * h)
    tailles = []
    for depart in range(w * h):
        if not mask[depart] or labels[depart]:
            continue
        idx = len(tailles) + 1
        if idx > 250:  # garde-fou : au-dela on ne sait plus etiqueter dans un bytearray
            break
        taille = 0
        q = deque([depart])
        labels[depart] = idx
        while q:
            p = q.popleft()
            taille += 1
            x, y = p % w, p // w
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        np_ = ny * w + nx
                        if mask[np_] and not labels[np_]:
                            labels[np_] = idx
                            q.append(np_)
        tailles.append(taille)

    if not tailles:
        return mask, 0
    plus_gros = max(tailles)
    garde = {i + 1 for i, t in enumerate(tailles) if t >= plus_gros * min_ratio}
    out = bytearray(w * h)
    jetes = 0
    for i in range(w * h):
        if mask[i]:
            if labels[i] in garde:
                out[i] = 1
            else:
                jetes += 1
    return out, jetes


def clean(src, dst, seuil=SEUIL_DEFAUT, min_ilot=MIN_ILOT_DEFAUT, dry=False):
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    alpha = im.split()[3]
    ap = list(alpha.getdata())

    halo_avant = sum(1 for p in ap if 20 < p < 200)

    mask = bytearray(1 if p >= seuil else 0 for p in ap)
    mask, jetes = _plus_gros_ilots(mask, w, h, min_ilot)

    # Silhouette pleine et noire : la couleur ne porte aucune information ici,
    # seul l'alpha compte. On repart d'un noir uni pour tuer les residus de teinte.
    net = Image.new("L", (w, h), 0)
    net.putdata([255 if m else 0 for m in mask])
    # Un seul pixel de flou : assez pour un bord non crenele, trop peu pour un halo.
    net = net.filter(ImageFilter.GaussianBlur(0.5))
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out.putalpha(net)

    bbox = out.getbbox()
    if bbox:
        bbox = (max(0, bbox[0] - PAD), max(0, bbox[1] - PAD),
                min(w, bbox[2] + PAD), min(h, bbox[3] + PAD))
        out = out.crop(bbox)

    ap2 = list(out.split()[3].getdata())
    halo_apres = sum(1 for p in ap2 if 20 < p < 200)
    pct = lambda n, tot: 100.0 * n / max(tot, 1)
    print(f"{os.path.basename(src):32} halo {pct(halo_avant, w*h):5.2f}% -> "
          f"{pct(halo_apres, len(ap2)):5.2f}%  ilots jetes={jetes}  {out.size[0]}x{out.size[1]}"
          + ("  [dry]" if dry else ""))
    if not dry:
        out.save(dst)
    return halo_avant, halo_apres


def main(argv):
    args = [a for a in argv if not a.startswith("--")]
    flags = [a for a in argv if a.startswith("--")]
    dry = "--dry" in flags
    seuil = SEUIL_DEFAUT
    min_ilot = MIN_ILOT_DEFAUT
    for f in flags:
        if f.startswith("--seuil"):
            seuil = int(f.split("=", 1)[1]) if "=" in f else seuil
        if f.startswith("--min-ilot"):
            min_ilot = float(f.split("=", 1)[1]) if "=" in f else min_ilot

    if "--batch" in flags:
        if not args:
            print("usage: clean_ombre.py --batch <dir>")
            return 1
        cibles = sorted(glob.glob(os.path.join(args[0], "*_ombre.png")))
        if not cibles:
            print(f"aucun *_ombre.png dans {args[0]}")
            return 1
        for p in cibles:
            clean(p, p, seuil, min_ilot, dry)
        return 0

    if not args:
        print(__doc__)
        return 1
    src = args[0]
    dst = args[1] if len(args) > 1 else src
    clean(src, dst, seuil, min_ilot, dry)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
