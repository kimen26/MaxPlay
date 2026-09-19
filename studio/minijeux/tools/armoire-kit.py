# -*- coding: utf-8 -*-
"""Kit de pieces GPT -> site/img/armoire/v7 (HO-MJ-20).

Modele : kit de pieces reutilisees (une par NATURE), pas un shell monolithique.
8 sources dans studio/minijeux/docs/refs/armoire/kit/ (copiees depuis les PNG
livres par ChatGPT le 17/09, deja detourees RGBA). Pour chaque piece (sauf
halo, garde en reference CSS seulement) :
  1. rogner sur la boite alpha (seuil alpha > 8) ;
  2. pour la carcasse-vide : l'etirer (affine non uniforme) pour que sa boite
     CORPS coincide avec la boite corps de v6/repere.json (911x1480), comme le
     fait deja armoire-sprites.py pour les vantaux v6 ;
  3. reduire en LANCZOS a <= 2x sa taille max affichee a l'ecran ;
  4. exporter en WebP q=90 avec alpha.

Sortie : site/img/armoire/v7/{carcasse-vide,planche,montant,porte-fermee,
porte-ouverte,tiroir,spot}.webp + kit.json (tailles + boites alpha d'origine
+ boite corps mesuree + ecart d'echelle applique).
"""
import json
import os

import numpy as np
from PIL import Image

REFS = 'studio/minijeux/docs/refs/armoire/kit'
OUT = 'site/img/armoire/v7'
ALPHA_THRESH = 8

# Repere de design fixe (v6, D-027/D-028) : le canvas de ref-ouverte, en % du
# frame 911 x 1480. Ligne de provenance : site/img/armoire/v6/repere.json §
# "corps" (ecrit par armoire-sprites.py depuis la mesure sur ref-ouverte.png).
FRAME_W, FRAME_H = 911, 1480
CORPS_PCT = {'left': 11.306, 'right': 88.364, 'top': 0.811, 'bottom': 99.054}

# Largeur max affichee a l'ecran : l'armoire fait au plus --cab-w ~= 911px de
# large (viewport max retenu par le brief = 1280px, cf. HO-MJ-20 § 3). Plafond
# de reduction = 2x cette taille par piece, selon son role dans la scene.
MAX_W = {
    'carcasse-vide.png': 1000,
    'planche.png': 1400,
    'montant.png': 120,
    'porte-fermee.png': 480,
    'porte-ouverte.png': 480,
    'tiroir.png': 480,
    'spot.png': 160,
}


def alpha_box(arr, thresh=ALPHA_THRESH):
    alpha = arr[:, :, 3]
    ys, xs = np.where(alpha > thresh)
    return int(xs.min()), int(xs.max()), int(ys.min()), int(ys.max())


def load(name):
    im = Image.open(os.path.join(REFS, name)).convert('RGBA')
    return im, np.array(im)


def crop_to_alpha(im, box):
    x0, x1, y0, y1 = box
    return im.crop((x0, y0, x1 + 1, y1 + 1))


def resize_lanczos(im, max_w):
    if im.width <= max_w:
        return im
    ratio = max_w / im.width
    new_size = (max_w, max(1, round(im.height * ratio)))
    return im.resize(new_size, Image.LANCZOS)


def save_webp(im, name):
    path = os.path.join(OUT, name.replace('.png', '.webp'))
    im.save(path, 'WEBP', quality=85, method=6)
    return path, im.size


os.makedirs(OUT, exist_ok=True)
kit = {'frame': {'w': FRAME_W, 'h': FRAME_H}, 'corps_pct': CORPS_PCT, 'sprites': {}}

# ── carcasse-vide : mesure boite corps (hors arche/pieds), etire pour ────
# coincider avec la boite corps du repere v6 ─────────────────────────────
im_c, arr_c = load('carcasse-vide.png')
box_c = alpha_box(arr_c)  # boite alpha totale = sommet arche .. dessous pieds

# boite CORPS mesuree a la main sur carcasse-vide.png (studio, 2026-09-19) :
# largeur stable x=[50,919] entre y=200 et y=1375 (hors arche qui retrecit en
# haut, hors pieds plus etroits que le corps en bas) ; top/bottom = boite
# alpha totale (sommet de l'arche, dessous des pieds).
CORPS_CARCASSE = {'x0': 50, 'x1': 919, 'y0': box_c[2], 'y1': box_c[3]}

target_x0 = CORPS_PCT['left'] / 100 * FRAME_W
target_x1 = CORPS_PCT['right'] / 100 * FRAME_W
target_y0 = CORPS_PCT['top'] / 100 * FRAME_H
target_y1 = CORPS_PCT['bottom'] / 100 * FRAME_H

cw = CORPS_CARCASSE['x1'] - CORPS_CARCASSE['x0']
ch = CORPS_CARCASSE['y1'] - CORPS_CARCASSE['y0']
sx = (target_x1 - target_x0) / cw
sy = (target_y1 - target_y0) / ch

# on rogne sur la boite ALPHA totale (pas seulement le corps) pour garder
# l'arche et les pieds, puis on etire tout le sprite au meme facteur (sx,sy)
# pour que SA boite corps coincide avec la cible une fois posee au meme
# endroit : le facteur est calcule sur le corps, applique a l'image entiere.
leaf = crop_to_alpha(im_c, box_c)
new_w = max(1, round(leaf.width * sx))
new_h = max(1, round(leaf.height * sy))
leaf = leaf.resize((new_w, new_h), Image.LANCZOS)

# Position du coin haut-gauche du CROP (boite alpha totale, PAS juste le
# corps) dans le repere 911x1480, une fois l'etirement applique : le crop
# n'occupe pas tout le frame (il y a une marge de part et d'autre de l'arche
# et sous les pieds), donc l'image ne peut PAS etre posee en `inset:0` —
# il faut ses propres left/top/width/height en % du frame. Ancrage sur le
# coin haut-gauche de la boite CORPS (seul point dont on connait la cible).
crop_x0_pct = target_x0 / FRAME_W * 100 + (box_c[0] - CORPS_CARCASSE['x0']) * sx / FRAME_W * 100
crop_y0_pct = target_y0 / FRAME_H * 100 + (box_c[2] - CORPS_CARCASSE['y0']) * sy / FRAME_H * 100
crop_w_pct = new_w / FRAME_W * 100
crop_h_pct = new_h / FRAME_H * 100

leaf = resize_lanczos(leaf, MAX_W['carcasse-vide.png'])
path, size = save_webp(leaf, 'carcasse-vide.png')
kit['sprites']['carcasse-vide.webp'] = {
    'size': list(size),
    'alpha_box_source': list(box_c),
    'corps_box_source': [CORPS_CARCASSE['x0'], CORPS_CARCASSE['x1'], CORPS_CARCASSE['y0'], CORPS_CARCASSE['y1']],
    'scale_affine': {'sx': round(sx, 5), 'sy': round(sy, 5)},
    'pose_pct': {
        'left': round(crop_x0_pct, 3), 'top': round(crop_y0_pct, 3),
        'width': round(crop_w_pct, 3), 'height': round(crop_h_pct, 3),
    },
    'note': ('etiree (sx,sy) pour que sa boite corps coincide avec corps_pct du repere v6 911x1480 ; '
             'pose_pct = position/taille du sprite ENTIER (crop alpha total, marge autour du corps '
             'comprise) dans le repere, PAS inset:0 — le crop ne remplit pas tout le frame.'),
}
print(f'carcasse-vide: box corps mesuree x=[{CORPS_CARCASSE["x0"]},{CORPS_CARCASSE["x1"]}] '
      f'y=[{box_c[2]},{box_c[3]}], scale sx={sx:.4f} sy={sy:.4f} -> {size}, '
      f'pose_pct={kit["sprites"]["carcasse-vide.webp"]["pose_pct"]}')

# ── Mesure de l'OUVERTURE AVANT (iteration 3, remplace la mesure iteration
# 2 qui avait releve le panneau de fond sombre AU FOND de la perspective, pas
# le bord avant du cadre — erreur signalee par le coordinateur : le meuble
# GPT est une bibliotheque avec un interieur en perspective, il y a une face
# AVANT (bois clair, montants/traverses/socle) puis une paroi INTERIEURE en
# perspective (plus sombre) avant le fond. Les vantaux fermes doivent couvrir
# jusqu'au bord AVANT (ou ils s'arretent sur la reference), pas jusqu'au fond.
# Mesuree studio 2026-09-19 sur carcasse-vide.png (971x1619, coordonnees
# SOURCE avant crop/etirement) par PIC DE LUMINANCE (l'arete du bord avant
# est plus claire que la face avant ET que la paroi en perspective) : left
# stable sur 65/108 lignes scannees, right stable sur 108/108, top stable sur
# 38/38 colonnes, bottom stable sur 39/39 colonnes. Verifie a l'oeil par
# superposition de 4 lignes sur l'image entiere (studio) : le rectangle forme
# encadre exactement les faces avant du montant/traverse/socle, comme sur
# ref-fermee.png.
OUVERTURE_SRC = {'x0': 85, 'x1': 912, 'y0': 193, 'y1': 1410}


def map_x_repere(px):
    frac = (px - box_c[0]) / (box_c[1] - box_c[0])
    return crop_x0_pct + frac * crop_w_pct


def map_y_repere(py):
    frac = (py - box_c[2]) / (box_c[3] - box_c[2])
    return crop_y0_pct + frac * crop_h_pct


ouverture_pct = {
    'left': round(map_x_repere(OUVERTURE_SRC['x0']), 3),
    'right': round(map_x_repere(OUVERTURE_SRC['x1']), 3),
    'top': round(map_y_repere(OUVERTURE_SRC['y0']), 3),
    'bottom': round(map_y_repere(OUVERTURE_SRC['y1']), 3),
}
kit['ouverture'] = ouverture_pct
print(f'ouverture (pct repere): {ouverture_pct}  '
      f'(v6 repere.json portes.haut: left=18.558 mid=49.835 right=81.113 top=9.184 ; '
      f'portes.bas bottom=93.046)')

# ── les autres pieces : rognage alpha simple + reduction ─────────────────
for name in ['planche.png', 'montant.png', 'porte-fermee.png', 'porte-ouverte.png', 'tiroir.png', 'spot.png']:
    im, arr = load(name)
    box = alpha_box(arr)
    leaf = crop_to_alpha(im, box)
    leaf = resize_lanczos(leaf, MAX_W[name])
    path, size = save_webp(leaf, name)
    kit['sprites'][name.replace('.png', '.webp')] = {
        'size': list(size),
        'alpha_box_source': list(box),
    }
    print(f'{name}: box={box} -> {size}')

# ── tiroir-face.webp : la FACADE seule (panneau avant + anneau), pas le
# tiroir tire vu de dessus (brief iteration 2, point 4). Bord haut mesure
# studio 2026-09-19 : l'arete claire horizontale ou la boite (interieur, vue
# de dessus) devient la face avant (verticale) - y=476 sur tiroir.png source
# (1448x1086), verifiee a l'oeil par superposition de ligne. Bas = bas de la
# boite alpha totale. `tiroir.webp` (le sprite ENTIER, tiroir ouvert) reste
# produit ci-dessus pour un futur etat "tiroir ouvert", non utilise ici.
im_t, arr_t = load('tiroir.png')
box_t = alpha_box(arr_t)
FACE_Y0 = 476
face_row = arr_t[600]
face_xs = np.where(face_row[:, 3] > ALPHA_THRESH)[0]
FACE_BOX = (int(face_xs.min()), int(face_xs.max()), FACE_Y0, box_t[3])
face = crop_to_alpha(im_t, FACE_BOX)
face = resize_lanczos(face, MAX_W['tiroir.png'])
path, size = save_webp(face, 'tiroir-face.png')
kit['sprites']['tiroir-face.webp'] = {
    'size': list(size),
    'alpha_box_source': list(FACE_BOX),
    'note': 'facade seule (panneau avant + anneau), bord haut mesure par transition de luminance sur tiroir.png source (y=476), pas la boite alpha totale (qui inclut l\'interieur vu de dessus)',
}
print(f'tiroir-face.png: box={FACE_BOX} -> {size}')

with open(os.path.join(OUT, 'kit.json'), 'w', encoding='utf-8') as fh:
    json.dump(kit, fh, indent=2, ensure_ascii=False)

# budget dossier
total = 0
for f in os.listdir(OUT):
    if f.endswith('.webp'):
        total += os.path.getsize(os.path.join(OUT, f))
print(f'\nTotal .webp v7 : {total/1024:.1f} Ko (budget <= 250 Ko)')
