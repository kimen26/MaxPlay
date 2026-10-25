"""Dino-Mix : monte les corps surfeur / bras levés / vol des 5 autres têtes à partir de ceux du Tricératops.

Usage (depuis la racine du dépôt) :
    python -I studio/minijeux/dino-mix/variantes.py [planche.png]

Les corps sans pattes des 6 têtes (corps-r1c1..6) sont dessinés sur le même gabarit (ventre, queue,
petits bras), et les trois variantes du Tricératops (surf-, up-, vol-r1c1) aussi : seuls les bras
changent. Pour chaque tête N et chaque variante V :
  1. on part du corps de la tête N (sa vraie tête, son cou, ses taches), son petit bras du fond coupé
     le long de la courbe du ventre ;
  2. on recale V sur N par le bas du ventre et la queue ;
  3. on recouvre le petit bras proche d'origine par le ventre de V (qui n'en a pas) ;
  4. on pose par-dessus les bras de V (et le manche du parapluie), détourés le long de leur trait.
Sortie : pieces/surf-r1cN.webp, up-r1cN.webp, vol-r1cN.webp (N = 2..6), même nommage qu'une planche
ChatGPT de 6 têtes découpée par decoupe.py : un vrai dessin les remplacera sans toucher à build.py.
Avec un argument, écrit aussi une planche de contrôle (les 18 corps, une ligne par variante).
"""
import sys
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

HERE = Path(__file__).resolve().parent
PIECES = HERE / "pieces"
DARK = 110  # au-dessous (max des canaux), un pixel est du trait

# Petit bras proche d'origine (posé sur le ventre), en coordonnées du gabarit (corps-r1c1 / up-r1c1,
# identiques au pixel près) : recouvert par le ventre de la variante.
NEAR_ARM = [(156, 230), (244, 230), (246, 302), (156, 302)]
# Petit bras du fond d'origine (il dépasse du bord avant du ventre) : rangées qu'il occupe, par tête,
# en coordonnées du corps. On le coupe le long de la courbe du ventre.
FAR_ARM = {2: (240, 296), 3: (184, 240), 4: (250, 308), 5: (184, 238), 6: (234, 286)}

# Bras de chaque variante, en coordonnées de la variante : polygone qui borne le détourage, germes
# (dans le bras, hors trait) et bords sans trait qu'il faut dessiner (là où le bras touchait la joue).
ARMS = {
    "surf": [
        {"poly": [(68, 188), (146, 194), (186, 198), (198, 214), (196, 246), (140, 244), (92, 236), (66, 216)],
         "seeds": [(110, 212), (160, 224)]},
        {"poly": [(256, 238), (262, 229), (334, 226), (344, 250), (324, 274), (256, 274)],
         "seeds": [(290, 245), (320, 250)]},
    ],
    "up": [
        {"poly": [(158, 96), (176, 82), (184, 34), (220, 34), (224, 84), (238, 94), (240, 128), (233, 150),
                  (219, 172), (209, 190), (205, 214), (164, 218), (156, 176)],
         "seeds": [(175, 150), (222, 115), (200, 60), (200, 85), (212, 170)],
         "stroke": [(237, 126), (231, 150), (217, 172), (207, 190), (203, 212)],
         "skin": (126, 218)},   # rangées où le bas du bras droit se fondait dans la joue : on le reteint en vert
    ],
    "vol": [
        {"poly": [(106, 204), (150, 196), (196, 208), (206, 232), (192, 252), (150, 260), (106, 252)],
         "seeds": [(130, 230), (170, 232)]},
        {"poly": [(258, 222), (264, 211), (300, 200), (326, 186), (361, 186), (361, 242), (330, 242),
                  (300, 252), (262, 270), (256, 240)],
         "seeds": [(290, 230), (340, 212)]},
    ],
}
SOURCES = {"surf": "surf-r1c1", "up": "up-r1c1", "vol": "vol-r1c1"}


def load(name):
    return Image.open(PIECES / f"{name}.webp").convert("RGBA")


def align(v, n):
    """Décalage (dx, dy) tel que le point (x, y) de v tombe en (x+dx, y+dy) dans n : bas du ventre et queue."""
    av, an = v.getchannel("A").load(), n.getchannel("A").load()
    pts = [(x, y) for y in range(int(v.height * 0.7), v.height, 2) for x in range(0, v.width, 2) if av[x, y] > 128]
    best = None
    for dx in range(-30, 61):
        for dy in range(n.height - v.height - 12, n.height - v.height + 13):
            s = sum(1 for x, y in pts if 0 <= x + dx < n.width and 0 <= y + dy < n.height and an[x + dx, y + dy] > 128)
            if best is None or s > best[0]:
                best = (s, dx, dy)
    return best[1], best[2]


def solve3(a, b):
    """Résout le système 3×3 a·x = b (Gauss, pivot partiel)."""
    m = [row[:] + [v] for row, v in zip(a, b)]
    for i in range(3):
        k = max(range(i, 3), key=lambda r: abs(m[r][i]))
        m[i], m[k] = m[k], m[i]
        for r in range(3):
            if r != i:
                f = m[r][i] / m[i][i]
                m[r] = [x - f * y for x, y in zip(m[r], m[i])]
    return [m[i][3] / m[i][i] for i in range(3)]


def cut_far_arm(n, rows):
    """Retire le petit bras qui dépasse du ventre : bord avant du corps ajusté (parabole en y) sur les
    rangées juste au-dessus et au-dessous du bras, tout ce qui est au-delà devient transparent."""
    n = n.copy()
    a = n.getchannel("A").load()
    px = n.load()
    top, bot = rows

    def right(y):
        return max((x for x in range(n.width) if a[x, y] > 128), default=None)
    pts = [(y, right(y)) for y in list(range(top - 10, top - 2)) + list(range(bot + 4, min(bot + 22, n.height - 4)))]
    pts = [(y, x) for y, x in pts if x is not None]
    s = [[sum(y ** (i + j) for y, _ in pts) for j in range(3)] for i in range(3)]
    t = [sum(x * y ** i for y, x in pts) for i in range(3)]
    c = solve3(s, t)
    for y in range(top - 2, bot + 4):
        edge = c[0] + c[1] * y + c[2] * y * y
        for x in range(int(edge) - 1, n.width):
            k = max(0.0, min(1.0, edge + 0.5 - x))     # bord adouci sur un pixel
            r, g, b, al = px[x, y]
            px[x, y] = (r, g, b, int(al * k))
    return n


def poly_mask(size, poly, shift=(0, 0)):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).polygon([(x + shift[0], y + shift[1]) for x, y in poly], fill=255)
    return m


def arm_mask(v, arm):
    """Le bras détouré le long de son trait : remplissage depuis les germes, arrêté par le trait et le polygone."""
    w, h = v.size
    px = v.load()
    inside = poly_mask(v.size, arm["poly"]).load()
    fill = Image.new("L", v.size, 0)
    pf = fill.load()

    def clear(x, y):
        r, g, b, a = px[x, y]
        return inside[x, y] and a > 128 and max(r, g, b) >= DARK
    q = deque(s for s in arm["seeds"] if clear(*s))
    for s in q:
        pf[s] = 255
    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not pf[nx, ny] and clear(nx, ny):
                pf[nx, ny] = 255
                q.append((nx, ny))
    # le trait qui borde le remplissage (jusqu'à 5 px d'épaisseur), et rien d'autre
    near = fill.filter(ImageFilter.MaxFilter(11)).load()
    out = fill.copy()
    po = out.load()
    for y in range(h):
        for x in range(w):
            if near[x, y] and inside[x, y] and px[x, y][3] > 60 and max(px[x, y][:3]) < DARK + 40:
                po[x, y] = 255
    return out.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))


def green_skin(v, mask, rows):
    """Dans le bras, reteint en vert (couleur du dernier pixel vert de la rangée) ce qui était la joue."""
    v = v.copy()
    px, pm = v.load(), mask.load()
    for y in range(*rows):
        last = None
        for x in range(v.width):
            if not pm[x, y]:
                continue
            r, g, b, a = px[x, y]
            if max(r, g, b) < DARK + 30:
                continue
            if g > r + 12:
                last = (r, g, b, a)
            elif last:
                px[x, y] = last
    return v


def paste(dst, src, mask, at):
    """dst ← src à travers mask (src et mask posés en at), alpha compris."""
    layer = Image.new("RGBA", dst.size, (0, 0, 0, 0))
    layer.paste(src, at)
    m = Image.new("L", dst.size, 0)
    m.paste(mask, at)
    return Image.composite(layer, dst, m)


def stroke(img, pts, at, color=(66, 40, 28, 255), width=4):
    d = ImageDraw.Draw(img)
    d.line([(x + at[0], y + at[1]) for x, y in pts], fill=color, width=width, joint="curve")
    for x, y in (pts[0], pts[-1]):
        r = width / 2
        d.ellipse([x + at[0] - r, y + at[1] - r, x + at[0] + r, y + at[1] + r], fill=color)


def compose(kind, n_idx):
    v, n = load(SOURCES[kind]), cut_far_arm(load(f"corps-r1c{n_idx}"), FAR_ARM[n_idx])
    dx, dy = align(v, n)                      # v → n
    tx, ty = align(load("up-r1c1"), v)        # gabarit → v (up-r1c1 = corps-r1c1 sans ses petits bras)
    pad = 120
    W, H = max(n.width, v.width + dx) + 2 * pad, max(n.height, v.height + dy) + 2 * pad
    nat = (pad, pad)                               # position de n sur la toile
    vat = (pad + dx, pad + dy)                     # position de v : son point (x, y) tombe sur (x+dx, y+dy) de n
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    out.paste(n, nat)
    # 3. ventre sans petit bras proche : celui de la variante, fondu sur quelques pixels
    belly = poly_mask(v.size, NEAR_ARM, (tx, ty))
    out = paste(out, v, belly.filter(ImageFilter.GaussianBlur(3)), vat)
    # 4. bras de la variante par-dessus
    for arm in ARMS[kind]:
        m = arm_mask(v, arm)
        out = paste(out, green_skin(v, m, arm["skin"]) if "skin" in arm else v, m, vat)
        if "stroke" in arm:
            stroke(out, arm["stroke"], vat)
    return out.crop(out.getchannel("A").getbbox())


def main():
    made = {}
    for kind in SOURCES:
        for i in range(2, 7):
            im = compose(kind, i)
            im.save(PIECES / f"{SOURCES[kind][:-1]}{i}.webp", "WEBP", quality=92, method=6)
            made[(kind, i)] = im
            print(f"OK {SOURCES[kind][:-1]}{i}.webp {im.size}")
    if len(sys.argv) > 1:
        cell = 440
        sheet = Image.new("RGBA", (cell * 6, cell * 4), (205, 205, 240, 255))
        for c in range(6):
            body = load(f"corps-r1c{c + 1}")
            sheet.alpha_composite(body, (c * cell + 20, cell - body.height - 20))
            for r, kind in enumerate(SOURCES, 1):
                im = load(SOURCES[kind]) if c == 0 else made[(kind, c + 1)]
                sheet.alpha_composite(im, (c * cell + 20, (r + 1) * cell - im.height - 20))
        sheet.save(sys.argv[1])
        print("planche", sys.argv[1])


if __name__ == "__main__":
    main()
