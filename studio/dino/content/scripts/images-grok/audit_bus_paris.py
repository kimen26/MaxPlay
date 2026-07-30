#!/usr/bin/env python
"""Audite les scenes _paris : detecte les bus ROUGES (non-RATP) et les scenes sans ville.

Contexte : la consigne de generation dit « bus RATP » (livree blanche a bandeau
VERT jade), mais plusieurs scenes sortent un bus ROUGE facon Londres — signale par
Papa Yann le 2026-07-25 sur Gallimimus / Parasaurolophus / Plateosaurus. Verifier
70 images a l'oeil est couteux : on prefiltre ici, l'oeil ne tranche que les suspects.

Methode : dans la moitie basse de l'image (la ou roule un bus), on compte les pixels
d'un rouge SATURE de carrosserie et ceux du vert jade RATP. On sort un ratio et un
verdict indicatif. Le vert de la vegetation est ecarte par une teinte plus cyan et une
luminosite plus faible que le jade RATP, mais l'heuristique reste indicative :
tout ce qui est signale doit etre regarde.

Usage:
  python audit_bus_paris.py <dossier_paleoart>
  python audit_bus_paris.py <dossier_paleoart> --seuil 0.004
"""
import glob
import os
import sys

from PIL import Image

SEUIL_ROUGE = 0.003   # part de pixels rouge-carrosserie a partir de laquelle on alerte
ECHANT = 4            # on echantillonne 1 pixel sur 4 en x et en y (assez pour un bus)


def analyse(path):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    px = im.load()
    rouge = vert = total = 0
    for y in range(h // 2, h, ECHANT):          # moitie basse : la chaussee
        for x in range(0, w, ECHANT):
            r, g, b = px[x, y]
            total += 1
            # Rouge de carrosserie : franchement dominant, sature, pas une brique terne.
            if r > 110 and r - g > 55 and r - b > 55 and g < 110:
                rouge += 1
            # Vert jade RATP : vert dominant mais clair et un peu bleute.
            elif g > 90 and g - r > 25 and b > 70 and abs(g - b) < 60:
                vert += 1
    return rouge / max(total, 1), vert / max(total, 1)


def main(argv):
    args = [a for a in argv if not a.startswith('--')]
    flags = {a.split('=')[0]: (a.split('=', 1)[1] if '=' in a else True) for a in argv if a.startswith('--')}
    seuil = float(flags.get('--seuil', SEUIL_ROUGE))
    if not args:
        print(__doc__)
        return 1
    fichiers = sorted(glob.glob(os.path.join(args[0], '*_paris.jpg')))
    if not fichiers:
        print('aucune scene _paris trouvee')
        return 1

    suspects = []
    for f in fichiers:
        nom = os.path.basename(f).replace('_paris.jpg', '')
        pr, pv = analyse(f)
        flag = ''
        if pr >= seuil:
            flag = ' <<< ROUGE SUSPECT'
            suspects.append((nom, pr, pv))
        print(f'{nom:24} rouge={pr*100:5.2f}%  vert={pv*100:5.2f}%{flag}')

    print(f'\n{len(fichiers)} scenes analysees, {len(suspects)} suspectes (seuil {seuil*100:.2f}%)')
    if suspects:
        print('A REGARDER :', ', '.join(n for n, _, _ in sorted(suspects, key=lambda t: -t[1])))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
