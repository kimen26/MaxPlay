# -*- coding: utf-8 -*-
"""Retouches du kit v8 de l'armoire (retour Papa Yann 2026-11-01, sur P30).

Deux defauts du kit, tous deux dans les sprites decoupes de la reference :

  1. Le tiroir (v8/tiroir.webp) est ROGNE A DROITE : dans la reference, le
     montant central couvrait son bord droit. Sa poignee n'est donc pas au
     centre de la facade, et a gauche il embarque un morceau du cadre du
     meuble. Pose deux fois, le tiroir de droite paraissait tronque et le
     cadre avancait avec la facade quand on tirait le tiroir.
     -> v8/tiroir-facade.webp : le bois de la facade seul (ni cadre, ni
     sillons sombres), complete a droite par le miroir de son propre bord
     gauche, autour de l'axe de la poignee. Grain et lumiere d'origine.

  2. Chaque planche (v8/planche-N.webp) porte, en plus de son CHANT clair,
     une bande sombre au-dessus et/ou en dessous (dessus de l'etagere, ombre
     portee sur le fond). Les cloisons doivent courir d'un chant a l'autre,
     par-dessus ces bandes : on mesure ici ou commence et finit le chant.

Sortie : site/img/armoire/v8/tiroir-facade.webp + site/js/gen/armoire-retouches.js
Lancer depuis la racine du repo : python studio/minijeux/tools/armoire-retouches.py
"""
import json
import os

import numpy as np
from PIL import Image

V8 = 'site/img/armoire/v8'
GEN = 'site/js/gen/armoire-retouches.js'
SEUIL_CHANT = 140      # luminance moyenne d'une ligne : au-dessus, c'est le chant clair
SEUIL_POIGNEE = 120    # metal sombre et gris (saturation < 25) = la poignee
SEUIL_BOIS = 100       # luminance du bois de la facade ; en dessous, un sillon


def luminance(im):
    return np.asarray(im.convert('RGB')).astype(float).mean(-1)


def bord_facade(lum):
    """Premiere colonne du bois de la facade, apres le sillon sombre qui la
    separe du cadre (le sillon reste dehors : derriere le tiroir, le fond
    sombre du meuble fait l'ombre du jour, et le tiroir tire n'a plus de
    contour noir)."""
    profil = lum.mean(0)
    sillon = int(np.argmin(profil[:40]))
    while profil[sillon] < SEUIL_BOIS:
        sillon += 1
    return sillon


def lignes_facade(lum, debut):
    """Premiere et derniere ligne du bois de la facade (hors sillons haut et bas)."""
    profil = lum[:, debut:debut + 40].mean(1)
    milieu = len(profil) // 2
    haut = int(np.nonzero(profil[:milieu] >= SEUIL_BOIS)[0].min())
    # dernier bloc continu de bois avant le sillon du bas
    fin = milieu
    while fin + 1 < len(profil) and profil[fin + 1] >= SEUIL_BOIS:
        fin += 1
    return haut, fin + 1


def axe_poignee(rgb):
    sat = rgb.max(-1) - rgb.min(-1)
    masque = (sat < 25) & (rgb.mean(-1) < SEUIL_POIGNEE)
    masque[:, :40] = False
    xs = np.nonzero(masque)[1]
    return (xs.min() + xs.max()) / 2


def facade_tiroir():
    src = Image.open(os.path.join(V8, 'tiroir.webp')).convert('RGBA')
    rgb = np.asarray(src.convert('RGB')).astype(int)
    lum = luminance(src)
    debut = bord_facade(lum)
    haut, bas = lignes_facade(lum, debut)
    axe = axe_poignee(rgb)
    fin = int(round(2 * axe - debut))           # bord droit symetrique, hors de l'image
    larg, haut_img = src.width, src.height
    if fin <= larg:
        raise SystemExit('tiroir.webp : pas rogne a droite, rien a completer')
    a = np.asarray(src)[haut:bas]
    gauche = a[:, debut:larg]
    # colonne x' = 2*axe - x : le bord droit manquant est le miroir du bord gauche
    miroir = a[:, [int(round(2 * axe - x)) for x in range(larg, fin + 1)]]
    out = np.concatenate([gauche, miroir], axis=1)
    Image.fromarray(out).save(os.path.join(V8, 'tiroir-facade.webp'), quality=90, method=6)
    # boite de la facade en fraction de la boite de tiroir.webp
    return {'x': round(debut / larg, 5), 'y': round(haut / haut_img, 5),
            'w': round(out.shape[1] / larg, 5), 'h': round(out.shape[0] / haut_img, 5)}


def chants():
    res = {}
    for n in range(1, 6):
        im = Image.open(os.path.join(V8, 'planche-%d.webp' % n))
        lum = luminance(im)
        w = lum.shape[1]
        lignes = lum[:, int(w * .2):int(w * .8)].mean(1)
        clair = np.nonzero(lignes >= SEUIL_CHANT)[0]
        if not len(clair):
            raise SystemExit('planche-%d : aucun chant clair trouve' % n)
        h = lum.shape[0]
        res['planche-%d' % n] = [round(clair.min() / h, 4), round((clair.max() + 1) / h, 4)]
    return res


def main():
    data = {'tiroir': facade_tiroir(), 'chants': chants()}
    with open(GEN, 'w', encoding='utf-8', newline='\n') as f:
        f.write('// GENERE par studio/minijeux/tools/armoire-retouches.py - ne pas editer.\n')
        f.write('// tiroir : boite de la facade symetrique (v8/tiroir-facade.webp), en\n')
        f.write('//   fraction de la boite de v8/tiroir.webp. chants : [debut, fin] du chant clair de chaque\n')
        f.write('//   planche, en fraction de la hauteur de son sprite.\n')
        f.write('window.ARMOIRE_RETOUCHES = ' + json.dumps(data, indent=2) + ';\n')
    print(json.dumps(data))


if __name__ == '__main__':
    main()
