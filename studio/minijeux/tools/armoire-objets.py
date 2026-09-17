# -*- coding: utf-8 -*-
"""Egalise la MASSE VISUELLE des objets poses dans l'armoire (HO-MJ-19 bis).

Deux objets a la meme taille de case ne paraissent pas de la meme taille :
chaque webp a sa propre marge transparente et son propre taux de remplissage.
D'ou le rendu « 123 enorme, bus minuscule » releve en recette.

Ce script fait deux choses :
  1. il rogne chaque obj-*.webp sur sa boite alpha, pour supprimer les marges
     transparentes parasites (le CSS pose ensuite chaque objet dans une case
     CARREE en object-fit:contain, donc le plus grand cote fait toujours S) ;
  2. il calcule un facteur par objet pour egaliser ce qui reste — un objet
     ajoure ou allonge peint moins de surface dans ce carre qu'un objet trapu
     — et l'ecrit dans site/js/gen/armoire-objets.js.

Rien n'est devine a la main : les facteurs sortent de la mesure.

    python studio/minijeux/tools/armoire-objets.py
"""
import glob
import json
import os

import numpy as np
from PIL import Image

IMG = 'site/img/armoire'
OUT_JS = 'site/js/gen/armoire-objets.js'

# Plafond de facteur : au-dela l'objet deborde de sa case. Un objet tres
# ajoure ne doit pas etre gonfle jusqu'a l'absurde pour atteindre la cible.
SCALE_MIN, SCALE_MAX = 0.80, 1.30
SEUIL_ALPHA = 12

ENTETE = [
    '// GENERE par studio/minijeux/tools/armoire-objets.py - ne pas editer.',
    "// Facteur de taille par objet de l'armoire : egalise la MASSE VISUELLE",
    '// (racine de la surface peinte) dans une case carree. Sans ce facteur, a',
    '// taille de case egale, un objet ajoure (drapeaux, volcan) parait maigre',
    "// a cote d'un objet trapu (livres, carnet).",
]


def bbox_alpha(im):
    a = np.array(im)[:, :, 3]
    ys, xs = np.where(a > SEUIL_ALPHA)
    if len(xs) == 0:
        return None
    return (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)


mesures = {}
for path in sorted(glob.glob(os.path.join(IMG, 'obj-*.webp'))):
    nom = os.path.splitext(os.path.basename(path))[0]
    im = Image.open(path).convert('RGBA')
    bb = bbox_alpha(im)
    if bb is None:
        print('  !! %s entierement transparent, ignore' % nom)
        continue
    if bb != (0, 0, im.width, im.height):
        im = im.crop(bb)
        im.save(path, 'WEBP', quality=92, method=6)
    # surface REELLEMENT peinte, pas la boite englobante : un objet ajoure
    # (le globe, les drapeaux) pese moins que son rectangle.
    peint = float((np.array(im)[:, :, 3] > SEUIL_ALPHA).sum())
    mesures[nom] = {'w': im.width, 'h': im.height, 'peint': peint,
                    'masse': peint ** 0.5 / max(im.width, im.height)}

mediane = float(np.median([m['masse'] for m in mesures.values()]))

scales = {}
for nom, m in sorted(mesures.items()):
    s = round(max(SCALE_MIN, min(SCALE_MAX, mediane / m['masse'])), 3)
    scales[nom] = s
    print('  %-20s %4dx%-4d  remplissage %3.0f%%  facteur %.3f'
          % (nom, m['w'], m['h'], 100 * m['peint'] / (m['w'] * m['h']), s))

os.makedirs(os.path.dirname(OUT_JS), exist_ok=True)
with open(OUT_JS, 'w', encoding='utf-8') as fh:
    for ligne in ENTETE:
        fh.write(ligne + '\n')
    fh.write('window.ARMOIRE_OBJ_SCALE = %s;\n'
             % json.dumps(scales, indent=2, ensure_ascii=False, sort_keys=True))
print('masse mediane %.4f, ecrite dans %s' % (mediane, OUT_JS))
