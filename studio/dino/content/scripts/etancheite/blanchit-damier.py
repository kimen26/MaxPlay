#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Efface le damier de transparence APLATI dans les coloriages au trait.

Le probleme
-----------
Plusieurs coloriages ont ete exportes depuis un editeur qui affichait la
transparence sous forme de damier gris clair. Le damier a ete APLATI dans le
fichier : il ne reste aucun canal alpha, seulement des pixels gris (235..251)
alternes avec du blanc, sur toute la surface du dessin.

Sur fond blanc le defaut passe inapercu. Depuis que mj-32 compose le dino sur un
decor, le rectangle du dino apparait en damier gris au milieu du paysage.

Le flood fill du jeu, lui, n'est pas gene : il remplit tant que le pixel est
clair, et 243 est clair. Le defaut est donc purement visuel, mais bien reel a
l'ecran.

Le correctif
------------
Tout pixel clair et NEUTRE (composantes proches les unes des autres) est ramene
au blanc pur. Le trait noir, lui, n'est jamais touche : il est sombre. Un pixel
clair mais COLORE serait conserve, ce qui protege un eventuel aplat de couleur
volontaire -- un coloriage au trait n'en a pas, mais la garde ne coute rien.

Usage
-----
    python blanchit-damier.py --check            # liste les fichiers sales
    python blanchit-damier.py --write            # corrige sur place
    python blanchit-damier.py --write Tyrannosaurus_coloriage.webp

Sans --write, rien n'est ecrit : le script se contente de mesurer.
"""

import argparse
import os
import sys

from PIL import Image

RACINE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "..", "..", "..", "..", "..", "site", "img", "dinos", "paleoart",
)

# Un pixel du damier : clair sans etre blanc pur, et gris (R proche de V proche de B).
CLAIR_MIN = 235   # en dessous, on est dans le trait ou dans un gris franc : on ne touche pas
BLANC_PUR = 252   # au-dessus, c'est deja du blanc : rien a faire
ECART_NEUTRE = 6  # ecart max entre composantes pour considerer le pixel comme neutre

# Seuil d'alerte : au-dela, le fichier est considere comme portant un damier.
SEUIL_SALE_PCT = 3.0


def analyse(chemin):
    """Rend (pourcentage de pixels de damier, image RGB chargee)."""
    img = Image.open(chemin).convert("RGB")
    pixels = img.load()
    largeur, hauteur = img.size
    sales = 0
    for y in range(hauteur):
        for x in range(largeur):
            r, v, b = pixels[x, y]
            if CLAIR_MIN <= r < BLANC_PUR and max(r, v, b) - min(r, v, b) <= ECART_NEUTRE:
                sales += 1
    return 100.0 * sales / (largeur * hauteur), img


def blanchit(img):
    """Ramene au blanc pur les pixels clairs et neutres. Rend le nombre de pixels changes."""
    pixels = img.load()
    largeur, hauteur = img.size
    changes = 0
    for y in range(hauteur):
        for x in range(largeur):
            r, v, b = pixels[x, y]
            if CLAIR_MIN <= r < BLANC_PUR and max(r, v, b) - min(r, v, b) <= ECART_NEUTRE:
                pixels[x, y] = (255, 255, 255)
                changes += 1
    return changes


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("fichiers", nargs="*", help="noms de fichiers ; par defaut tous les *_coloriage.webp")
    ap.add_argument("--write", action="store_true", help="ecrit la correction (sinon simple mesure)")
    ap.add_argument("--check", action="store_true", help="mesure seulement (defaut)")
    args = ap.parse_args()

    dossier = os.path.normpath(RACINE)
    if args.fichiers:
        noms = args.fichiers
    else:
        noms = sorted(f for f in os.listdir(dossier) if f.endswith("_coloriage.webp"))

    sales = []
    for nom in noms:
        chemin = os.path.join(dossier, nom)
        if not os.path.exists(chemin):
            print("introuvable :", nom)
            continue
        pct, img = analyse(chemin)
        if pct <= SEUIL_SALE_PCT:
            continue
        sales.append(nom)
        if args.write:
            changes = blanchit(img)
            # qualite 92 / methode 6 : meme reglage que le batch de generation,
            # sans perte visible sur un trait noir et blanc.
            img.save(chemin, "WEBP", quality=92, method=6)
            print("corrige  %5.1f%%  %s  (%d pixels blanchis)" % (pct, nom, changes))
        else:
            print("damier   %5.1f%%  %s" % (pct, nom))

    print("\n%d fichier(s) analyse(s), %d portant un damier" % (len(noms), len(sales)))
    if sales and not args.write:
        print("Relancer avec --write pour corriger.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
