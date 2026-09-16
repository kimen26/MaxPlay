"""armoire-compose.py — maquette statique de l'accueil « L'Armoire » v3.

Prend LA référence (armoire ouverte GPT, fond transparent) et l'étire par
bandes : les zones « fixes » (fronton, planches, traverses, tiroirs, pieds,
portes, montants) gardent l'échelle uniforme, les zones « souples » (fond des
étagères, intérieur des casiers) absorbent la place restante. C'est le même
découpage que le HTML/CSS reproduira (une bande = une rangée de grille, une
tranche = une colonne). Sortie : PNG de maquette à plusieurs viewports.

    python studio/minijeux/tools/armoire-compose.py

Coordonnées en pixels de la référence 1024×1536.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[3]
REF = ROOT / 'studio/minijeux/inbox/decoupe/ChatGPT Image 15 sept. 2026, 00_25_01.png'
OBJ = ROOT / 'site/img/armoire'
OUT = ROOT / 'studio/minijeux/docs/handoffs/rapports/captures'
FONT = 'C:/Windows/Fonts/arialbd.ttf'

# Tranches horizontales par défaut : porte+montant gauche | fond souple | porte+montant droit
COLS_DOORS = [(0, 200, False), (200, 830, True), (830, 1024, False)]
# Rangée des casiers : cadre | casier | séparateur | casier | séparateur | casier | cadre
COLS_CUBBY = [(0, 185, False), (185, 362, True), (362, 398, False),
              (398, 627, True), (627, 660, False), (660, 860, True), (860, 1024, False)]
LEAF = (450, 65, 578, 152)          # le logo feuille du fronton, remplacé par du bois
LEAF_PATCH = (322, 65, 450, 152)    # bois voisin qui le recouvre


def cols_cubby(n):
    """Rangée de n casiers : cadre | (casier | séparateur)×(n-1) | casier | cadre."""
    cols = [(0, 185, False)]
    for i in range(n):
        cols.append((185, 362, True))
        if i < n - 1:
            cols.append((362, 398, False))
    cols.append((860, 1024, False))
    return cols


def rows(cubby_rows=1, cubby_cols=3):
    """Bandes verticales ; la rangée de casiers se répète cubby_rows fois."""
    r = [(0, 165, False, COLS_DOORS, 'fronton'),
         (165, 392, True, COLS_DOORS, 'vitrine-1'),
         (392, 418, False, COLS_DOORS, 'planche-vitrine'),
         (418, 653, True, COLS_DOORS, 'vitrine-2'),
         (653, 685, False, COLS_DOORS, 'traverse-haut')]
    for i in range(cubby_rows):
        if i:
            r.append((880, 905, False, cols_cubby(cubby_cols), 'planche-casiers'))
        r.append((685, 880, True, cols_cubby(cubby_cols), 'casiers'))
    r += [(905, 935, False, COLS_DOORS, 'traverse-bas'),
          (935, 1122, True, COLS_DOORS, 'bas-etagere'),
          (1122, 1310, False, COLS_DOORS, 'bas-tiroirs'),
          (1310, 1385, False, COLS_DOORS, 'pieds')]
    return r

ROWS = rows()
REF_W, REF_H = 1024, 1385
MAX_SOFT = 1.45   # une étagère ne s'étire jamais plus de ×1,45 (sinon armoire « allongée »)
MARGIN_X = 0.02   # 2 % de mur de chaque côté

# Objets posés : (nom de bande, index de tranche souple dans la bande, fichier, étiquette)
OBJETS = [
    ('vitrine-1', 0, 'obj-livres-dinos', 'Dinos', 0.27),
    ('vitrine-1', 0, 'obj-globe', 'Monde', 0.73),
    ('vitrine-2', 0, 'obj-oeuf', 'Œufs', 0.27),
    ('vitrine-2', 0, 'obj-carnet', 'Album', 0.73),
    ('casiers', 0, 'obj-bus', 'Bus', 0.5),
    ('casiers', 1, 'obj-lettres', 'Lettres', 0.5),
    ('casiers', 2, 'obj-chiffres', 'Chiffres', 0.5),
    ('bas-etagere', 0, 'obj-volcan', 'Volcan', 0.2),
    ('bas-etagere', 0, 'obj-peluche-tri', 'Tritri', 0.5),
    ('bas-etagere', 0, 'obj-meteorite', 'Surprise', 0.8),
]


def stretch(ref, W, H, ROWS=ROWS):
    """Rend la référence dans W×H : fixes à l'échelle s, souples étirés."""
    fixed_u = sum((y1 - y0) for y0, y1, soft, *_ in ROWS if not soft)
    soft_u = sum((y1 - y0) for y0, y1, soft, *_ in ROWS if soft)
    # échelle : tenir la largeur, ET garder aux bandes souples au moins 85 %
    # de leur hauteur naturelle (sinon, en paysage, les étagères s'écrasent
    # et l'armoire devient un buffet difforme : on la rétrécit, le mur reste).
    s = min(W / REF_W, H / (fixed_u + 0.85 * soft_u))
    fixed_h = fixed_u * s
    soft_nat = soft_u * s
    ratio = min(MAX_SOFT, (H - fixed_h) / soft_nat)   # facteur commun des bandes souples
    H = int(fixed_h + soft_nat * ratio)
    W = int(REF_W * s)
    out = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    y = 0.0
    boxes = {}
    for y0, y1, soft, cols, name in ROWS:
        h = (y1 - y0) * s * (ratio if soft else 1)
        fixed_w = sum((x1 - x0) for x0, x1, sf in cols if not sf) * s
        soft_w = sum((x1 - x0) for x0, x1, sf in cols if sf) * s
        xr = (W - fixed_w) / soft_w
        x = 0.0
        cells = []
        for x0, x1, sf in cols:
            w = (x1 - x0) * s * (xr if sf else 1)
            # +1 px de recouvrement à droite et en bas : sans lui, chaque tuile
            # redimensionnée séparément laisse une couture d'un pixel.
            tile = ref.crop((x0, y0, min(x1 + 1, REF_W), min(y1 + 1, REF_H))).resize((max(1, round(w)) + 1, max(1, round(h)) + 1), Image.LANCZOS)
            if name == 'fronton' and x0 == 200:
                _sans_feuille(tile, s, x0, y0)
            out.alpha_composite(tile, (round(x), round(y)))
            if sf:
                cells.append((round(x), round(y), round(x + w), round(y + h)))
            x += w
        boxes[name] = cells
        y += h
    return out, boxes


def _sans_feuille(tile, s, x0, y0):
    """Recouvre la feuille par du bois voisin (bords fondus)."""
    global _REF
    patch = _REF.crop(LEAF_PATCH)
    lw, lh = LEAF[2] - LEAF[0], LEAF[3] - LEAF[1]
    patch = patch.resize((lw, lh), Image.LANCZOS)
    mask = Image.new('L', (lw, lh), 0)
    ImageDraw.Draw(mask).rounded_rectangle([6, 6, lw - 6, lh - 6], radius=14, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(5))
    full = _REF.crop((200, 0, 831, 166)).copy()
    full.paste(patch, (LEAF[0] - 200, LEAF[1]), mask)
    tile.paste(full.resize(tile.size, Image.LANCZOS))


def pose(canvas, boxes, W_scale, font):
    d = ImageDraw.Draw(canvas)
    for band, idx, fichier, label, fx in OBJETS:
        x0, y0, x1, y1 = boxes[band][idx]
        cell_w, cell_h = x1 - x0, y1 - y0
        n = sum(1 for o in OBJETS if o[0] == band and o[1] == idx)
        slot_w = cell_w / n
        obj = Image.open(OBJ / f'{fichier}.webp').convert('RGBA')
        size = int(min(slot_w * 0.78, cell_h * 0.62))
        r = size / max(obj.size)
        obj = obj.resize((max(1, int(obj.size[0] * r)), max(1, int(obj.size[1] * r))), Image.LANCZOS)
        cx = x0 + cell_w * fx
        oy = y1 - int(cell_h * 0.2) - obj.size[1]
        canvas.alpha_composite(obj, (int(cx - obj.size[0] / 2), oy))
        tw = d.textlength(label, font=font)
        ty = y1 - int(cell_h * 0.19)
        d.text((cx - tw / 2 + 1, ty + 1), label, font=font, fill=(0, 0, 0, 160))
        d.text((cx - tw / 2, ty), label, font=font, fill=(255, 248, 236, 255))


def maquette(W, H, objets=False, cubby_rows=1, cubby_cols=3):
    global _REF
    ref = Image.open(REF).convert('RGBA').crop((0, 0, 1024, 1385))
    _REF = ref
    R = rows(cubby_rows, cubby_cols)
    margin_x, margin_y = int(W * MARGIN_X), int(H * 0.03)
    # le mur
    bg = Image.new('RGBA', (W, H), (214, 170, 110, 255))
    d = ImageDraw.Draw(bg)
    for i in range(H):
        t = i / H
        d.line([(0, i), (W, i)], fill=(int(226 - 90 * t), int(184 - 90 * t), int(126 - 70 * t), 255))
    aw = W - 2 * margin_x
    ah = H - 2 * margin_y
    arm, boxes = stretch(ref, aw, ah, R)
    # modularité : si l'écran est haut, on AJOUTE une rangée de casiers au
    # lieu d'étirer les étagères (l'armoire grandit par étages, pas en chewing-gum)
    while arm.size[1] < ah - (880 - 685 + 25) * (arm.size[0] / REF_W) and cubby_rows < 3:
        cubby_rows += 1
        R = rows(cubby_rows, cubby_cols)
        arm, boxes = stretch(ref, aw, ah, R)
    aw, ah = arm.size
    ax = (W - aw) // 2
    margin_y = (H - ah) // 2 if H - ah < H * 0.12 else int(H * 0.03)
    # tapis
    tapis = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(tapis).ellipse([ax - aw * 0.05, H - margin_y - ah * 0.03, ax + aw * 1.05, H + ah * 0.03], fill=(60, 30, 10, 110))
    tapis = tapis.filter(ImageFilter.GaussianBlur(8))
    bg.alpha_composite(tapis)
    bg.alpha_composite(arm, (ax, margin_y))
    for k, v in boxes.items():
        boxes[k] = [(x0 + ax, y0 + margin_y, x1 + ax, y1 + margin_y) for x0, y0, x1, y1 in v]
    font = ImageFont.truetype(FONT, max(11, int(aw * 0.036)))
    if objets:
        pose(bg, boxes, aw, font)
    # avatar mordu par l'arche : disque derrière le fronton
    r = int(aw * 0.09)
    av = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(av).ellipse([ax + aw * 0.05, margin_y - r * 0.7, ax + aw * 0.05 + 2 * r, margin_y - r * 0.7 + 2 * r], fill=(90, 160, 90, 255), outline=(230, 190, 80, 255), width=3)
    bg.alpha_composite(av)
    bg.alpha_composite(arm.crop((0, 0, aw, int(boxes['vitrine-1'][0][1] - margin_y))), (ax, margin_y))
    # prénom + étoiles
    d = ImageDraw.Draw(bg)
    f2 = ImageFont.truetype(FONT, max(13, int(aw * 0.05)))
    d.text((ax + aw / 2 - d.textlength('Champion', font=f2) / 2, margin_y + int(aw * 0.085)), 'Champion', font=f2, fill=(59, 36, 18, 255))
    d.rounded_rectangle([ax + aw - int(aw * 0.2), margin_y + int(aw * 0.05), ax + aw - int(aw * 0.04), margin_y + int(aw * 0.11)], radius=6, fill=(122, 74, 28, 255))
    d.text((ax + aw - int(aw * 0.18), margin_y + int(aw * 0.06)), '* 19', font=font, fill=(255, 209, 102, 255))
    return bg.convert('RGB')


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for W, H in [(360, 740), (320, 568), (412, 915), (1280, 720)]:
        p = OUT / f'HO-MJ-15-maquette-{W}x{H}.png'
        maquette(W, H).save(p)
        print(p)
    # preuve de modularité : 2 rangées de casiers, puis 4 casiers par rangée
    maquette(360, 740, cubby_rows=2).save(OUT / 'HO-MJ-15-maquette-360x740-2-rangees.png')
    maquette(1280, 720, cubby_rows=2, cubby_cols=4).save(OUT / 'HO-MJ-15-maquette-1280x720-4-casiers.png')
