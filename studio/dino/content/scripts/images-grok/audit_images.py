#!/usr/bin/env python
"""Audit COMPLET des images dino : integrite, doublons, format, poids, decor.

Repond a « je veux que ce soit clean » : passe toute la banque au crible en une
commande, sans avoir a relire 500 images a l'oeil. Ce qui est signale ici doit
etre regarde ; ce qui ne l'est pas est mecaniquement sain.

Controles :
  1. FICHIERS CASSES     — image illisible ou tronquee
  2. DOUBLONS BINAIRES   — deux scenes strictement identiques (incident
                           Apatosaurus_paris = copie de _manger, audit 25/07)
  3. QUASI-DOUBLONS      — meme dino, deux scenes visuellement tres proches
                           (empreinte perceptuelle 8x8)
  4. RATIO ABERRANT      — proportions hors des ratios utilises par la banque.
                           On ne controle PAS les dimensions exactes : les lots
                           ont ete generes a des epoques differentes (1448x1086,
                           1672x941, 1168x784...) et le hero s'affiche en
                           `object-fit:contain` — rien n'est deforme ni rogne.
                           Seul un ratio extreme (panoramique, tres etroit) gene
                           vraiment la mise en page.
  5. POIDS SUSPECTS      — fichier anormalement leger (rendu rate / tronque)
  6. SCENES TROP SOMBRES — luminosite moyenne tres basse (rendu nocturne rate)

Usage:
  python audit_images.py <racine_site>            # ex: site
  python audit_images.py site --verbeux
"""
import os
import sys
from collections import defaultdict

from PIL import Image

# Fourchettes de RATIO acceptees (largeur / hauteur), pas de dimensions figees :
# la banque melange plusieurs lots et l'affichage est en object-fit:contain.
RATIOS = {
    # Le panoramique 2.33 est LEGITIME pour les tres longs animaux (Apatosaure de
    # 21 m dans une avenue) et ne pose aucun probleme en object-fit:contain.
    'scene': (1.20, 2.40),     # paysage : du 4:3 au panoramique
    'headshot': (0.62, 0.85),  # portrait vertical
    'coloriage': (0.95, 1.65),  # carre a legerement paysage
}
POIDS_MINI = {'.jpg': 60_000, '.webp': 15_000, '.png': 2_000}  # une petite silhouette pleine pese ~3 Ko
LUMI_MINI = 28           # luminosite moyenne en dessous de laquelle on alerte
PROCHE = 6               # distance de Hamming max pour crier au quasi-doublon


def empreinte(im):
    """dHash 8x8 : compare les pixels voisins, robuste au reencodage."""
    g = im.convert('L').resize((9, 8), Image.LANCZOS)
    px = g.load()
    bits = 0
    for y in range(8):
        for x in range(8):
            bits = (bits << 1) | (1 if px[x, y] > px[x + 1, y] else 0)
    return bits


def hamming(a, b):
    return bin(a ^ b).count('1')


def main(argv):
    args = [a for a in argv if not a.startswith('--')]
    verbeux = '--verbeux' in argv
    racine = args[0] if args else 'site'
    dossiers = [
        os.path.join(racine, 'img', 'dinos', 'paleoart'),
        os.path.join(racine, 'img', 'dinos', 'ombres'),
        os.path.join(racine, 'img', 'dinos', 'sprites'),
    ]

    problemes = defaultdict(list)
    par_hash = defaultdict(list)      # contenu binaire identique
    empreintes = []                   # (chemin, dino, empreinte)
    nb = 0

    for d in dossiers:
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            ext = os.path.splitext(f)[1].lower()
            if ext not in ('.jpg', '.png', '.webp'):
                continue
            p = os.path.join(d, f)
            nb += 1
            try:
                with open(p, 'rb') as fh:
                    brut = fh.read()
                im = Image.open(p)
                im.load()
            except Exception as e:
                problemes['CASSE'].append(f'{p} — {type(e).__name__}')
                continue

            par_hash[hash(brut)].append(p)

            taille = len(brut)
            if taille < POIDS_MINI.get(ext, 0):
                problemes['LEGER'].append(f'{f} ({taille // 1024} Ko)')

            w, h = im.size
            if '_headshot' in f:
                borne = RATIOS['headshot']
            elif '_coloriage' in f:
                borne = RATIOS['coloriage']
            elif d.endswith('paleoart'):
                borne = RATIOS['scene']
            else:
                borne = None
            if borne:
                r = w / max(h, 1)
                if not (borne[0] <= r <= borne[1]):
                    problemes['RATIO'].append(
                        f'{f} {w}x{h} ratio {r:.2f} (attendu {borne[0]}-{borne[1]})')

            if d.endswith('paleoart'):
                gris = im.convert('L').resize((64, 64))
                moy = sum(gris.getdata()) / (64 * 64)
                if moy < LUMI_MINI:
                    problemes['SOMBRE'].append(f'{f} (luminosite {moy:.0f})')
                dino = f.split('_')[0].split('.')[0]
                empreintes.append((f, dino, empreinte(im)))

    for chemins in par_hash.values():
        if len(chemins) > 1:
            problemes['DOUBLON_BINAIRE'].append(' == '.join(os.path.basename(c) for c in chemins))

    # Quasi-doublons : uniquement AU SEIN d'un meme dino (deux dinos differents
    # peuvent legitimement partager une composition).
    par_dino = defaultdict(list)
    for f, dino, e in empreintes:
        par_dino[dino].append((f, e))
    for dino, lot in par_dino.items():
        for i in range(len(lot)):
            for j in range(i + 1, len(lot)):
                d_h = hamming(lot[i][1], lot[j][1])
                if d_h <= PROCHE:
                    problemes['QUASI_DOUBLON'].append(f'{lot[i][0]} ~ {lot[j][0]} (distance {d_h})')

    print(f'{nb} images analysees dans {len([d for d in dossiers if os.path.isdir(d)])} dossiers\n')
    ordre = ['CASSE', 'DOUBLON_BINAIRE', 'QUASI_DOUBLON', 'RATIO', 'LEGER', 'SOMBRE']
    total = 0
    for k in ordre:
        v = problemes.get(k, [])
        total += len(v)
        if not v:
            print(f'  {k:16} OK')
            continue
        print(f'  {k:16} {len(v)} :')
        for item in (v if verbeux else v[:12]):
            print(f'      - {item}')
        if not verbeux and len(v) > 12:
            print(f'      … et {len(v) - 12} autres (--verbeux)')
    print(f'\nTOTAL SIGNALEMENTS : {total}')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
