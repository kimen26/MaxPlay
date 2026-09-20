# -*- coding: utf-8 -*-
"""Armoire v8 (HO-MJ-20 passe 4) : le kit est decoupe dans UNE seule image,
docs/refs/armoire/ref-ouverte.png (la reference validee), jamais dans les
pieces GPT separees (point de vue et lumiere incompatibles, L-136/L-144).

Pieces : shell (carcasse inpaintee : sans planches, montants, tiroirs, vantaux),
5 planches, 2 montants, 1 tiroir, 2 vantaux ouverts (gauche ; droite = miroir),
2 vantaux fermes (repris de v6, issus de ref-fermee). Sortie : site/img/armoire/v8/
+ kit.json (boites en % du repere 911x1480) + maquette PIL de controle.

  python studio/minijeux/tools/armoire-v8.py [dossier-maquette]
"""
import json
import os
import sys

import numpy as np
from PIL import Image

REF = 'studio/minijeux/docs/refs/armoire/ref-ouverte.png'
V6 = 'site/img/armoire/v6'
OUT = 'site/img/armoire/v8'
FRAME = {'x': 30, 'y': 10, 'w': 911, 'h': 1480}
Q = 90

src = np.array(Image.open(REF).convert('RGBA'))
H, W = src.shape[:2]

# Boites mesurees sur ref-ouverte (pixels source, [x0, x1, y0, y1] exclusifs)
# interieur (fond) entre les parois : x 156..813 ; stiles du corps : 133..835
INT_X0, INT_X1 = 152, 818          # bande de fond a inpainter
SH_X0, SH_X1 = 186, 782            # planches interieures : du bord interieur d un
                                   # montant a l autre (la zone de charniere 152..186
                                   # est CACHEE par le vantail ouvert dans la reference ;
                                   # la garder ferait deborder la planche du montant
                                   # quand la porte est fermee)
PLANCHES = [  # bande planche + ombre portee dessous
    (SH_X0, SH_X1, 360, 404),
    (126, 842, 564, 604),     # traverse : pleine largeur du corps
    (126, 842, 762, 812),     # traverse
    (SH_X0, SH_X1, 954, 1004),
    (SH_X0, SH_X1, 1186, 1224),
]
MONTANTS = [(346, 378, 600, 766), (592, 624, 600, 766)]     # niche
TIROIRS = [(176, 470, 1222, 1382), (476, 770, 1222, 1382)]  # gauche, droit (meme largeur : un seul sprite)
DRAWER_BAND = (172, 792)   # bande inpaintee derriere les deux tiroirs
LEAVES = {  # vantaux ouverts gauches ; x = du bord image au stile inclus.
    # En y ils DEPASSENT l ouverture : vus en perspective, plus pres de l oeil,
    # le haut monte devant la corniche (y=64) et le bas descend devant le
    # socle (y=1426). Les couper a l ouverture les tronquait (recette PY).
    'porte-ouverte-haut': (30, 192, 58, 600),
    'porte-ouverte-bas': (30, 192, 796, 1470),   # bord exterieur bas a y=1466 (perspective)
}
STILE_ROW = 690      # ligne de montant sain (niche), recopiee dans les bandes a portes
LEAF_XL, LEAF_XR = 190, 778
SOCLE_XL, SOCLE_XR = 126, 842
CORPS_X0, CORPS_X1 = 133, 835


# Affine corps ref-fermee <-> ref-ouverte (les deux rendus GPT n ont pas les
# memes proportions ; on fait coincider les boites de corps).
F = {'x0': 128, 'x1': 840, 'y0': 9, 'y1': 1546}      # corps sur ref-fermee
O = {'x0': CORPS_X0, 'x1': CORPS_X1, 'y0': 22, 'y1': 1476}
SX = (O['x1'] - O['x0']) / float(F['x1'] - F['x0'])
SY = (O['y1'] - O['y0']) / float(F['y1'] - F['y0'])


def f2o(x, y):
    return O['x0'] + (x - F['x0']) * SX, O['y0'] + (y - F['y0']) * SY


def o2f(x, y):
    return F['x0'] + (x - O['x0']) / SX, F['y0'] + (y - O['y0']) / SY


def crop(box):
    x0, x1, y0, y1 = box
    return Image.fromarray(src[y0:y1, x0:x1])


def pct(box):
    x0, x1, y0, y1 = box
    return {'x': round((x0 - FRAME['x']) / FRAME['w'] * 100, 3),
            'y': round((y0 - FRAME['y']) / FRAME['h'] * 100, 3),
            'w': round((x1 - x0) / FRAME['w'] * 100, 3),
            'h': round((y1 - y0) / FRAME['h'] * 100, 3)}


def fill_band(a, x0, x1, y0, y1):
    """Inpaint d'une bande horizontale : miroir vertical de la bande du dessus
    (grain vertical continu, raccord sans couture en y0)."""
    h = y1 - y0
    a[y0:y1, x0:x1] = a[y0 - h:y0, x0:x1][::-1]


def fill_col(a, x0, x1, y0, y1):
    w = x1 - x0
    a[y0:y1, x0:x1] = a[y0:y1, x0 - w:x0][:, ::-1]


def build_shell():
    a = src.copy()
    # 1. vantaux ouverts effaces + stiles reconstruits (comme v6)
    a[:146, :SOCLE_XL, 3] = 0
    a[:146, SOCLE_XR + 1:, 3] = 0
    for y0, y1 in ((146, 582), (803, 1387)):
        a[y0:y1 + 1, :LEAF_XL, 3] = 0
        a[y0:y1 + 1, LEAF_XR + 1:, 3] = 0
        a[y0:y1 + 1, CORPS_X0:LEAF_XL] = src[STILE_ROW, CORPS_X0:LEAF_XL]
        a[y0:y1 + 1, LEAF_XR + 1:CORPS_X1 + 1] = src[STILE_ROW, LEAF_XR + 1:CORPS_X1 + 1]
    a[1388:1477, :SOCLE_XL, 3] = 0
    a[1388:1477, SOCLE_XR + 1:, 3] = 0
    # 2. rien ne depasse des stiles entre la corniche et le socle
    a[146:1388, :CORPS_X0, 3] = 0
    a[146:1388, CORPS_X1 + 1:, 3] = 0
    # 3. montants de niche d abord (sinon la traverse du dessous, remplie par
    #    miroir de la bande au-dessus, en recopie des bouts)
    for (x0, x1, y0, y1) in MONTANTS:
        fill_col(a, x0, x1, y0, y1)
    # 4. planches (la bande au-dessus des tiroirs doit etre propre avant de
    #    servir de source), interieur seulement ; les traverses debordent sur
    #    les stiles, la on recopie la ligne de stile saine
    for (x0, x1, y0, y1) in PLANCHES:
        fill_band(a, INT_X0, INT_X1, y0, y1)
        if x0 < INT_X0:
            a[y0:y1, CORPS_X0:INT_X0] = src[STILE_ROW, CORPS_X0:INT_X0]
            a[y0:y1, INT_X1:CORPS_X1 + 1] = src[STILE_ROW, INT_X1:CORPS_X1 + 1]
    # 5. tiroirs
    fill_band(a, DRAWER_BAND[0], DRAWER_BAND[1], TIROIRS[0][2], TIROIRS[0][3])
    # 6. coins de la corniche et du socle : dans ref-ouverte ils sont SOUS les
    #    vantaux ouverts (qui les recouvrent en perspective). ref-fermee n a pas
    #    les memes hauteurs de corniche ni de socle (patch essaye : marche
    #    visible). On reconstruit donc avec la MATIERE de ref-ouverte : miroir
    #    periodique de la bande visible juste a cote (meme rendu, meme lumiere),
    #    et un arrondi d alpha pour le bout.
    def mirror_tile(y0, y1, x0, x1, xs, period):
        # remplit [x0,x1) sur [y0,y1) depuis la bande [xs, xs+period) reflechie
        for x in range(x0, x1):
            d = (xs - x) % (2 * period)
            sx = xs + (d if d < period else 2 * period - d)
            a[y0:y1, x] = a[y0:y1, sx]
    CORN = (60, 152)     # corniche (y), SOC = socle jusqu au haut des pieds
    SOC = (1376, 1424)   # jusqu au haut des pieds, exclus
    for (x0, x1, xs) in ((SOCLE_XL, LEAF_XL + 6, LEAF_XL + 6), (LEAF_XR - 6, SOCLE_XR + 1, LEAF_XR - 6 - 1)):
        if xs > x0:
            mirror_tile(CORN[0], CORN[1], x0, x1, xs, 8)
            mirror_tile(SOC[0], SOC[1], x0, x1, xs, 8)
        else:
            # cote droit : source a gauche de la zone
            for x in range(x0, x1):
                d = (x - xs) % 16
                sx = xs - (d if d < 8 else 16 - d)
                a[CORN[0]:CORN[1], x] = a[CORN[0]:CORN[1], sx]
                a[SOC[0]:SOC[1], x] = a[SOC[0]:SOC[1], sx]
    # bouts arrondis (rayon 9 px) sur les 4 coins reconstruits
    R = 9
    yy, xx = np.mgrid[0:R, 0:R]
    quart = ((R - 1 - xx) ** 2 + (R - 1 - yy) ** 2) > (R - 1) ** 2   # hors du disque
    for (cy, top) in ((CORN[0] + 9, True), (CORN[1] - 1, False), (SOC[0], True), (SOC[1] - 1, False)):
        pass
    def round_corner(x_edge, y_edge, left, top):
        for dy in range(R):
            for dx in range(R):
                if quart[dy, dx]:
                    x = x_edge + dx if left else x_edge - dx
                    y = y_edge + dy if top else y_edge - dy
                    a[y, x, 3] = 0
    for (xe, left) in ((SOCLE_XL, True), (SOCLE_XR, False)):
        round_corner(xe, 69, left, True)        # haut de corniche
        round_corner(xe, CORN[1] - 1, left, False)
    a[146:1388, :CORPS_X0, 3] = 0
    a[146:1388, CORPS_X1 + 1:, 3] = 0
    a[1388:, :SOCLE_XL, 3] = 0
    a[1388:, SOCLE_XR + 1:, 3] = 0
    return Image.fromarray(a)


os.makedirs(OUT, exist_ok=True)
kit = {'frame': FRAME, 'source': 'ref-ouverte.png', 'pieces': {}}


def save(name, im, box):
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=Q, method=6)
    kit['pieces'][name] = {'size': list(im.size), 'box': pct(box)}


shell = build_shell()
FB = (FRAME['x'], FRAME['x'] + FRAME['w'], FRAME['y'], FRAME['y'] + FRAME['h'])
save('shell', shell.crop((FB[0], FB[2], FB[1], FB[3])), FB)   # rogne au repere : boite 0/0/100/100
for i, b in enumerate(PLANCHES, 1):
    save('planche-%d' % i, crop(b), b)
for i, b in enumerate(MONTANTS, 1):
    save('montant-%d' % i, crop(b), b)
save('tiroir', crop(TIROIRS[0]), TIROIRS[0])
kit['pieces']['tiroir']['box_droite'] = pct(TIROIRS[1])
CX = (CORPS_X0 + CORPS_X1) / 2.0
for name, b in LEAVES.items():
    lf = crop(b)
    if name == 'porte-ouverte-bas':
        # le pied gauche (x>=130, y>=1424) entre dans la boite : il appartient
        # a la carcasse, pas au vantail -> alpha 0 dans le sprite
        la = np.array(lf)
        la[1424 - b[2]:, 130 - b[0]:, 3] = 0
        lf = Image.fromarray(la)
    save(name, lf, b)
    x0, x1, y0, y1 = b
    kit['pieces'][name]['box_droite'] = pct((int(round(2 * CX - x1)), int(round(2 * CX - x0)), y0, y1))
# vantaux fermes : decoupes dans ref-fermee AVEC leurs charnieres (x 146..163,
# mesurees : pixels gris metal), remis a l echelle de ref-ouverte par l affine
# qui fait coincider les deux boites de corps (comme v6, armoire-sprites.py).
# v6 coupait a x=195 : porte trop etroite, sans charniere, montant a nu.
FER = np.array(Image.open('studio/minijeux/docs/refs/armoire/ref-fermee.png').convert('RGBA'))
DOOR_X0, DOOR_MID = 146, 484
DOORS_F = {'porte-haut': (140, 580), 'porte-bas': (852, 1452)}
HINGE_AXIS_F = 154.5   # axe des charnieres (milieu de 146..163) sur ref-fermee


# Les charnieres du vantail FERME (ref-fermee) ne sont pas a la meme hauteur
# que celles du vantail OUVERT (ref-ouverte) : 7 a 31 px d ecart une fois a
# l echelle, d ou un saut visible a l ouverture (recette PY). Le vantail ferme
# est remappe verticalement par bandes (lineaire par morceaux) pour que ses
# centres de charnieres tombent sur ceux du vantail ouvert, bords conserves.
# Mesures (pixels, colonnes de metal gris) : voir rapport § 13.
HINGES = {  # (y source fermee, y cible ouverte) des centres de charnieres
    'porte-haut': [(225.5, 216.0), (499.0, 514.0)],
    'porte-bas': [(949.0, 873.0), (1358.5, 1318.0)],
}


def remap_rows(im, src_pts, dst_pts):
    """im : bande source [y0,y1) ; src_pts/dst_pts : y croissants, bornes
    comprises, meme longueur. Chaque intervalle est redimensionne a part."""
    w = im.size[0]
    out = Image.new('RGBA', (w, int(round(dst_pts[-1] - dst_pts[0]))))
    y = 0
    for i in range(len(src_pts) - 1):
        sa, sb = src_pts[i] - src_pts[0], src_pts[i + 1] - src_pts[0]
        da, db = dst_pts[i] - dst_pts[0], dst_pts[i + 1] - dst_pts[0]
        h = int(round(db)) - int(round(da))
        if h <= 0:
            continue
        band = im.crop((0, int(round(sa)), w, int(round(sb)))).resize((w, h), Image.LANCZOS)
        out.paste(band, (0, int(round(da))))
    return out


for name, (fy0, fy1) in DOORS_F.items():
    leaf = Image.fromarray(FER[fy0:fy1, DOOR_X0:DOOR_MID])
    ox0, oy0 = f2o(DOOR_X0, fy0)
    ox1, oy1 = f2o(DOOR_MID, fy1)
    leaf = leaf.resize((int(round(ox1 - ox0)), int(round(oy1 - oy0))), Image.LANCZOS)
    src_pts = [0.0] + [f2o(0, hy)[1] - oy0 for hy, _ in HINGES[name]] + [oy1 - oy0]
    dst_pts = [0.0] + [ty - oy0 for _, ty in HINGES[name]] + [oy1 - oy0]
    leaf = remap_rows(leaf, src_pts, dst_pts)
    leaf.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=Q, method=6)
    b = (int(round(ox0)), int(round(ox1)), int(round(oy0)), int(round(oy1)))
    kit['pieces'][name] = {'size': list(leaf.size), 'box': pct(b),
                           'box_droite': pct((int(round(2 * CX - b[1])), int(round(2 * CX - b[0])), b[2], b[3])),
                           # axe de rotation, en fraction de la largeur du vantail
                           'charniere': round((f2o(HINGE_AXIS_F, 0)[0] - ox0) / (ox1 - ox0), 4)}
import hashlib
h = hashlib.sha1()
for fn in sorted(os.listdir(OUT)):
    if fn.endswith('.webp'):
        h.update(open(os.path.join(OUT, fn), 'rb').read())
kit['version'] = h.hexdigest()[:8]   # cache-busting : ?v= sur chaque sprite
with open(os.path.join(OUT, 'kit.json'), 'w') as f:
    json.dump(kit, f, indent=1)
# la meme table, servie au navigateur (HTML local : pas de fetch, cf. rules)
with open('site/js/gen/armoire-kit.js', 'w') as f:
    f.write('// GENERE par studio/minijeux/tools/armoire-v8.py -- ne pas editer.' + chr(10))
    f.write('// Boites en % du repere 911x1480, mesurees sur docs/refs/armoire/ref-ouverte.png.' + chr(10))
    f.write('window.ARMOIRE_KIT = ' + json.dumps(kit, separators=(',', ':')) + ';' + chr(10))

# Maquette de controle : shell + pieces a leur place doit valoir la reference
maq = Image.new('RGBA', (W, H), (0, 0, 0, 0))
maq.alpha_composite(shell)
for b in PLANCHES:
    maq.alpha_composite(crop(b), (b[0], b[2]))
for b in MONTANTS:
    maq.alpha_composite(crop(b), (b[0], b[2]))
t = crop(TIROIRS[0])
maq.alpha_composite(t, (TIROIRS[0][0], TIROIRS[0][2]))
maq.alpha_composite(t, (TIROIRS[1][0], TIROIRS[1][2]))
for name, b in LEAVES.items():
    lf = crop(b)
    maq.alpha_composite(lf, (b[0], b[2]))
    maq.alpha_composite(lf.transpose(Image.FLIP_LEFT_RIGHT), (int(round(2 * CX - b[1])), b[2]))
out = sys.argv[1] if len(sys.argv) > 1 else OUT
maq.save(os.path.join(out, '_maquette.png'))
shell.save(os.path.join(out, '_shell.png'))
tot = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT) if f.endswith('.webp'))
print('v8 webp total', tot // 1024, 'Ko')
