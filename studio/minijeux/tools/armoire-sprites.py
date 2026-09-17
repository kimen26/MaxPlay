# -*- coding: utf-8 -*-
"""Decoupe des 3 sprites de l'armoire (HO-MJ-19) depuis les deux references.

Modele : une seule verite geometrique, `ref-ouverte.png`. Le shell en sort
(portes effacees, montants reconstruits). Les deux vantaux frontaux viennent
de `ref-fermee.png`, remis a l'echelle de `ref-ouverte` par la transformation
affine qui fait coincider les deux boites de corps.

Sortie : site/img/armoire/v6/{shell,porte-haut,porte-bas}.webp + repere.json
"""
import json
import os

import numpy as np
from PIL import Image

REFS = 'studio/minijeux/docs/refs/armoire'
OUT = 'site/img/armoire/v6'

# ── Reperes mesures sur les deux references (pixels) ──────────────────────
# corps = du bord gauche au bord droit du meuble ; haut = sommet de l'arche ;
# bas = dessous des pieds.
F = {'x0': 128, 'x1': 840, 'y0': 9, 'y1': 1546}      # ref-fermee
O = {'x0': 133, 'x1': 835, 'y0': 22, 'y1': 1476}     # ref-ouverte

SX = (O['x1'] - O['x0']) / (F['x1'] - F['x0'])
SY = (O['y1'] - O['y0']) / (F['y1'] - F['y0'])


def f2o_x(x):
    return O['x0'] + (x - F['x0']) * SX


def f2o_y(y):
    return O['y0'] + (y - F['y0']) * SY


# Coutures relevees sur ref-fermee (voir rapport HO-MJ-19) :
#   portes hautes  x 195..773, y 140..580   (couture centrale x 484)
#   niche centrale y 606..805
#   portes basses  x 195..773, y 852..1452
DOOR_X0, DOOR_X1 = 195, 773
DOOR_MID = 484
TOP_Y0, TOP_Y1 = 140, 580
BOT_Y0, BOT_Y1 = 852, 1452
NICHE_Y0, NICHE_Y1 = 606, 805

# Bandes ou les vantaux ouverts sont dessines dans ref-ouverte (mesurees).
LEAF_TOP = (146, 582)
LEAF_BOT = (803, 1387)
LEAF_XL, LEAF_XR = 190, 778     # limites interieures des vantaux ouverts
SOCLE = (1388, 1476)
SOCLE_XL, SOCLE_XR = 126, 842

# Montant sain a recopier : une seule ligne prise au milieu de la niche,
# seule bande sans porte. Une ligne unique et non un pave : recopier un
# pave y reimprime les aretes horizontales des planches tous les N pixels
# (bourrelets facon bambou constates en passe 1).
STILE_ROW = 690


def build_shell():
    im = Image.open(os.path.join(REFS, 'ref-ouverte.png')).convert('RGBA')
    a = np.array(im)
    h, w = a.shape[:2]

    # 1. effacer les quatre vantaux ouverts (+ leurs sommets, au-dessus de
    # la bande des portes hautes : ils depassent le long de l'arche)
    a[:LEAF_TOP[0], :SOCLE_XL, 3] = 0
    a[:LEAF_TOP[0], SOCLE_XR + 1:, 3] = 0
    for y0, y1 in (LEAF_TOP, LEAF_BOT):
        a[y0:y1 + 1, :LEAF_XL, 3] = 0
        a[y0:y1 + 1, LEAF_XR + 1:, 3] = 0
    a[SOCLE[0]:SOCLE[1] + 1, :SOCLE_XL, 3] = 0
    a[SOCLE[0]:SOCLE[1] + 1, SOCLE_XR + 1:, 3] = 0

    # 2. reconstruire les montants gauche/droit dans les deux bandes a portes
    src = np.array(Image.open(os.path.join(REFS, 'ref-ouverte.png')).convert('RGBA'))
    left = slice(O['x0'], LEAF_XL)
    right = slice(LEAF_XR + 1, O['x1'] + 1)
    for y0, y1 in (LEAF_TOP, LEAF_BOT):
        a[y0:y1 + 1, left] = src[STILE_ROW, left]
        a[y0:y1 + 1, right] = src[STILE_ROW, right]

    Image.fromarray(a).save(os.path.join(OUT, 'shell.webp'), 'WEBP', quality=92, method=6)
    return (w, h)


def build_door(name, fy0, fy1):
    """Un vantail gauche, decoupe dans ref-fermee puis mis a l'echelle ouverte."""
    im = Image.open(os.path.join(REFS, 'ref-fermee.png')).convert('RGBA')
    leaf = im.crop((DOOR_X0, fy0, DOOR_MID, fy1))
    tw = int(round((f2o_x(DOOR_MID) - f2o_x(DOOR_X0))))
    th = int(round((f2o_y(fy1) - f2o_y(fy0))))
    leaf = leaf.resize((tw, th), Image.LANCZOS)
    leaf.save(os.path.join(OUT, name), 'WEBP', quality=92, method=6)
    return (tw, th)


os.makedirs(OUT, exist_ok=True)
size = build_shell()
dh = build_door('porte-haut.webp', TOP_Y0, TOP_Y1)
db = build_door('porte-bas.webp', BOT_Y0, BOT_Y1)

# ── Repere de design : le canvas de ref-ouverte, rogne aux marges utiles ───
FRAME = {'x': 30, 'y': 10, 'w': 911, 'h': 1480}


def pct_x(x):
    return round((x - FRAME['x']) / FRAME['w'] * 100, 3)


def pct_y(y):
    return round((y - FRAME['y']) / FRAME['h'] * 100, 3)


repere = {
    'frame': FRAME,
    'source': {'image': 'ref-ouverte.png', 'size': size, 'affine': {'sx': SX, 'sy': SY}},
    'sprites': {'shell.webp': size, 'porte-haut.webp': dh, 'porte-bas.webp': db},
    'corps': {
        'left': pct_x(O['x0']), 'right': pct_x(O['x1']),
        'top': pct_y(O['y0']), 'bottom': pct_y(O['y1']),
    },
    'portes': {
        'haut': {
            'left': pct_x(f2o_x(DOOR_X0)), 'mid': pct_x(f2o_x(DOOR_MID)),
            'right': pct_x(f2o_x(DOOR_X1)),
            'top': pct_y(f2o_y(TOP_Y0)), 'bottom': pct_y(f2o_y(TOP_Y1)),
        },
        'bas': {
            'left': pct_x(f2o_x(DOOR_X0)), 'mid': pct_x(f2o_x(DOOR_MID)),
            'right': pct_x(f2o_x(DOOR_X1)),
            'top': pct_y(f2o_y(BOT_Y0)), 'bottom': pct_y(f2o_y(BOT_Y1)),
        },
    },
    'niche': {'top': pct_y(f2o_y(NICHE_Y0)), 'bottom': pct_y(f2o_y(NICHE_Y1))},
}
with open(os.path.join(OUT, 'repere.json'), 'w', encoding='utf-8') as fh:
    json.dump(repere, fh, indent=2, ensure_ascii=False)
print(json.dumps(repere, indent=2, ensure_ascii=False))
