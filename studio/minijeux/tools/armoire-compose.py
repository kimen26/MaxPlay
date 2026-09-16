"""armoire-compose.py — maquette statique de l'accueil « L'Armoire » v3.

Recompose la référence (armoire ouverte GPT, fond transparent, 1024×1536)
en tuiles : deux PANNEAUX latéraux continus du haut en bas, un corps entre
eux (étagères, casiers, traverses, tiroirs — tout reste DANS les panneaux),
des portes ouvertes hors du corps en calque au-dessus. Les bandes « souples »
absorbent la hauteur ; quand l'écran est haut on AJOUTE une rangée de
casiers. Même découpage que le HTML/CSS reproduira.

    python studio/minijeux/tools/armoire-compose.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[3]
REF = ROOT / 'studio/minijeux/inbox/decoupe/ChatGPT Image 15 sept. 2026, 00_25_01.png'
OUT = ROOT / 'studio/minijeux/docs/handoffs/rapports/captures'
FONT = 'C:/Windows/Fonts/arialbd.ttf'

# ── unités = pixels de la référence ────────────────────────────────────
DOOR_L, DOOR_R = (36, 175), (850, 988)   # portes ouvertes (calque)
PANEL = (136, 152, 720, 860)             # panneau latéral : la face claire du cadre des casiers (uni), répétée en miroir
PANEL_W = 22                             # largeur affichée (unités), un peu plus que la source
DOOR_W = DOOR_L[1] - DOOR_L[0]
BODY = (200, 830)                        # corps derrière les portes (souple)
INNER = (185, 860)                       # corps entre les panneaux (souple)
CUBBY, DIV = (185, 362), (362, 398)      # un casier, un séparateur
SHOULDER_L, SHOULDER_R = (133, 200), (830, 890)   # épaules du fronton / pieds
LEAF, LEAF_PATCH = (450, 65, 578, 152), (322, 65, 450, 152)
FOOT_TOP = 1332                          # sous cette ligne les tuiles de porte contiendraient les pieds
MAX_SOFT, MARGIN_X = 1.45, 0.02

# (y0, y1, souple, genre, nom) — genre : door (corps + portes), shoulder
# (corps + épaules propres + portes), inner (entre panneaux, sans porte),
# cubby (casiers)
def rows(cubby_rows=1):
    r = [(0, 165, False, 'shoulder', 'fronton'),
         (165, 392, True, 'door', 'vitrine-1'),
         (392, 418, False, 'door', 'planche-vitrine'),
         (418, 653, True, 'door', 'vitrine-2'),
         (653, 685, False, 'inner', 'traverse-haut')]
    for i in range(cubby_rows):
        if i:
            r.append((880, 905, False, 'inner', 'planche-casiers'))
        r.append((685, 880, True, 'cubby', 'casiers'))
    r += [(905, 935, False, 'inner', 'traverse-bas'),
          (935, 1122, True, 'door', 'bas-etagere'),
          (1122, 1310, False, 'inner-door', 'bas-tiroirs'),
          (1310, 1385, False, 'feet', 'pieds')]
    return r


def tile(ref, box, w, h):
    x0, y0, x1, y1 = box
    return ref.crop((x0, y0, min(x1 + 1, 1024), min(y1 + 1, 1536))).resize((max(1, round(w)) + 1, max(1, round(h)) + 1), Image.LANCZOS)


def panel_tile(ref, w, h):
    """Planche verticale unie : le carré PANEL répété en miroir jusqu'à h."""
    sq = ref.crop(PANEL)
    sq = sq.resize((max(1, round(w)) + 1, max(1, round(sq.size[1] * (w / PANEL_W))) + 1), Image.LANCZOS)
    strip = Image.new('RGBA', (sq.size[0], sq.size[1] * 2))
    strip.paste(sq, (0, 0)); strip.paste(sq.transpose(Image.FLIP_TOP_BOTTOM), (0, sq.size[1]))
    out = Image.new('RGBA', (sq.size[0], max(1, round(h)) + 1))
    for y in range(0, out.size[1], strip.size[1]):
        out.paste(strip, (0, y))
    return out


def sans_feuille(ref):
    ref = ref.copy()
    patch = ref.crop(LEAF_PATCH).resize((LEAF[2] - LEAF[0], LEAF[3] - LEAF[1]))
    mask = Image.new('L', patch.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([6, 6, patch.size[0] - 6, patch.size[1] - 6], radius=14, fill=255)
    ref.paste(patch, (LEAF[0], LEAF[1]), mask.filter(ImageFilter.GaussianBlur(5)))
    return ref


def compose(ref, W, H, R, cubby_cols=3):
    """Rend l'armoire dans W×H. Retourne l'image et les boîtes souples."""
    fixed_u = sum(y1 - y0 for y0, y1, soft, *_ in R if not soft)
    soft_u = sum(y1 - y0 for y0, y1, soft, *_ in R if soft)
    nat_w = 2 * DOOR_W + 2 * PANEL_W + (BODY[1] - BODY[0])
    s = min(W / nat_w, H / (fixed_u + 0.85 * soft_u))
    ratio = min(MAX_SOFT, (H - fixed_u * s) / (soft_u * s))
    H = round(fixed_u * s + soft_u * s * ratio)
    W = round(nat_w * s)
    px, pw = DOOR_W * s, PANEL_W * s          # panneau gauche : x, largeur
    bx, bw = px + pw, W - 2 * (px + pw)       # corps : x, largeur
    body = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    doors = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    boxes, y = {}, 0.0
    for y0, y1, soft, kind, name in R:
        h = (y1 - y0) * s * (ratio if soft else 1)
        Y = round(y)
        if kind in ('door', 'shoulder', 'feet'):
            body.alpha_composite(tile(ref, (BODY[0], y0, BODY[1], y1), bw, h), (round(bx), Y))
        if kind == 'inner-door':   # tiroirs à fleur des panneaux : on garde leurs deux bords
            body.alpha_composite(tile(ref, (INNER[0], y0, INNER[1], y1), bw, h), (round(bx), Y))
            boxes.setdefault(name, []).append((round(bx), Y, round(bx + bw), round(y + h)))
        if kind in ('shoulder', 'feet'):
            lw, rw = (SHOULDER_L[1] - SHOULDER_L[0]) * s, (SHOULDER_R[1] - SHOULDER_R[0]) * s
            body.alpha_composite(tile(ref, (SHOULDER_L[0], y0, SHOULDER_L[1], y1), lw, h), (round(px), Y))
            body.alpha_composite(tile(ref, (SHOULDER_R[0], y0, SHOULDER_R[1], y1), rw, h), (round(W - px - rw), Y))
        else:
            pan = panel_tile(ref, pw, h)
            body.alpha_composite(pan, (round(px), Y))
            body.alpha_composite(pan.transpose(Image.FLIP_LEFT_RIGHT), (round(W - px - pw), Y))
        if kind == 'inner':
            body.alpha_composite(tile(ref, (INNER[0], y0, INNER[1], y1), bw, h), (round(bx), Y))
        if kind == 'cubby':
            dw = (DIV[1] - DIV[0]) * s
            cw = (bw - (cubby_cols - 1) * dw) / cubby_cols
            x = bx
            for i in range(cubby_cols):
                body.alpha_composite(tile(ref, (CUBBY[0], y0, CUBBY[1], y1), cw, h), (round(x), Y))
                boxes.setdefault(name, []).append((round(x), Y, round(x + cw), round(y + h)))
                x += cw
                if i < cubby_cols - 1:
                    body.alpha_composite(tile(ref, (DIV[0], y0, DIV[1], y1), dw, h), (round(x), Y))
                    x += dw
        if kind != 'cubby':        # calque portes sur toutes les bandes (bas de porte jamais coupé)
            dy1 = min(y1, FOOT_TOP) if kind == 'feet' else y1
            dh = h * (dy1 - y0) / (y1 - y0)
            doors.alpha_composite(tile(ref, (DOOR_L[0], y0, DOOR_L[1], dy1), DOOR_W * s, dh), (0, Y))
            doors.alpha_composite(tile(ref, (DOOR_R[0], y0, DOOR_R[1], dy1), (DOOR_R[1] - DOOR_R[0]) * s, dh), (round(W - (DOOR_R[1] - DOOR_R[0]) * s), Y))
        y += h
    body.alpha_composite(doors)
    return body, boxes


def maquette(W, H, cubby_rows=1, cubby_cols=3):
    ref = sans_feuille(Image.open(REF).convert('RGBA'))
    margin_x = int(W * MARGIN_X)
    aw, ah = W - 2 * margin_x, int(H * 0.94)
    arm, boxes = compose(ref, aw, ah, rows(cubby_rows), cubby_cols)
    # écran haut : une rangée de casiers en plus plutôt qu'une armoire étirée
    while arm.size[1] < ah - (880 - 685 + 25) * (arm.size[0] / 1012) and cubby_rows < 3:
        cubby_rows += 1
        arm, boxes = compose(ref, aw, ah, rows(cubby_rows), cubby_cols)
    aw, ah = arm.size
    ax, ay = (W - aw) // 2, (H - ah) // 2 if H - ah < H * 0.12 else int(H * 0.03)
    bg = Image.new('RGBA', (W, H), (0, 0, 0, 255))
    d = ImageDraw.Draw(bg)
    for i in range(H):
        t = i / H
        d.line([(0, i), (W, i)], fill=(int(226 - 90 * t), int(184 - 90 * t), int(126 - 70 * t), 255))
    tapis = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(tapis).ellipse([ax - aw * 0.05, ay + ah * 0.97, ax + aw * 1.05, ay + ah * 1.03], fill=(60, 30, 10, 110))
    bg.alpha_composite(tapis.filter(ImageFilter.GaussianBlur(8)))
    bg.alpha_composite(arm, (ax, ay))
    f2 = ImageFont.truetype(FONT, max(13, int(aw * 0.05)))
    f1 = ImageFont.truetype(FONT, max(11, int(aw * 0.036)))
    d.text((ax + aw / 2 - d.textlength('Champion', font=f2) / 2, ay + int(aw * 0.085)), 'Champion', font=f2, fill=(59, 36, 18, 255))
    return bg.convert('RGB')


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for W, H in [(360, 740), (320, 568), (412, 915), (1280, 720)]:
        maquette(W, H).save(OUT / f'HO-MJ-15-maquette-{W}x{H}.png')
    maquette(360, 740, cubby_rows=2).save(OUT / 'HO-MJ-15-maquette-360x740-2-rangees.png')
    maquette(1280, 720, cubby_rows=2, cubby_cols=4).save(OUT / 'HO-MJ-15-maquette-1280x720-4-casiers.png')
    print('ok')
