"""Outils lego : détourer une image ChatGPT (fond crème), recaler une image sur une autre (échelle + translation).
PIL seul. Recalage : point de départ donné (œil, ou bout de queue + bas du ventre), puis affinage local grossier-fin,
coût = différence moyenne (calculée en C par PIL)."""
from collections import deque

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageStat

SENTINEL = (255, 0, 255)
BG_THRESH = 38


def detour(path):
    """RGBA, fond crème retiré par remplissage depuis les bords, recadré au sujet (marge 4 px)."""
    img = Image.open(path).convert("RGB")
    work = img.copy()
    w, h = work.size
    seeds = [(x, y) for x in range(0, w, 16) for y in (0, h - 1)] + [(x, y) for y in range(0, h, 16) for x in (0, w - 1)]
    for s in seeds:
        if work.getpixel(s) != SENTINEL:
            ImageDraw.floodfill(work, s, SENTINEL, thresh=BG_THRESH)
    m = Image.new("L", (w, h), 0)
    wp, mp = work.load(), m.load()
    for y in range(h):
        for x in range(w):
            if wp[x, y] != SENTINEL:
                mp[x, y] = 255
    m = m.filter(ImageFilter.GaussianBlur(0.6))          # bord adouci d'un demi-pixel
    out = img.convert("RGBA")
    out.putalpha(m)
    box = m.point(lambda v: 255 if v > 20 else 0).getbbox()
    box = (max(0, box[0] - 4), max(0, box[1] - 4), min(w, box[2] + 4), min(h, box[3] + 4))
    return out.crop(box)


def find_eye(im):
    """Centre et rayon de la plus grosse tache noire ronde et pleine (l'œil). None si aucune."""
    small = im.resize((im.width // 2, im.height // 2), Image.BILINEAR)
    w, h = small.size
    px = small.load()
    dark = lambda x, y: px[x, y][3] > 200 and max(px[x, y][:3]) < 60
    seen, best = set(), []
    for y in range(h):
        for x in range(w):
            if (x, y) in seen or not dark(x, y):
                continue
            q, blob = deque([(x, y)]), []
            seen.add((x, y))
            while q:
                cx, cy = q.popleft()
                blob.append((cx, cy))
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and dark(nx, ny):
                        seen.add((nx, ny))
                        q.append((nx, ny))
            xs, ys = [p[0] for p in blob], [p[1] for p in blob]
            bw, bh = max(xs) - min(xs) + 1, max(ys) - min(ys) + 1
            if len(blob) > len(best) and 0.5 < bw / bh < 2 and len(blob) > 0.45 * bw * bh:
                best = blob
    if not best:
        return None
    xs, ys = [p[0] for p in best], [p[1] for p in best]
    return [sum(xs) / len(xs) * 2, sum(ys) / len(ys) * 2, (max(xs) - min(xs) + max(ys) - min(ys)) / 2]


def tail_bottom(im):
    """Bout de la queue (point le plus à gauche de la silhouette) et bas du ventre (y le plus bas)."""
    a = im.getchannel("A").point(lambda v: 255 if v > 128 else 0)
    box = a.getbbox()
    col = a.crop((box[0], 0, box[0] + 3, im.height)).getbbox()
    return (box[0], (col[1] + col[3]) / 2), box[3]


def belly(im, band=0.03):
    """Bas du ventre : milieu des colonnes dont le bas de silhouette est à moins de band (part de la hauteur) du plus
    bas, et ce plus bas. Ne dépend ni de la queue ni de la tête."""
    a = im.getchannel("A").point(lambda v: 255 if v > 128 else 0)
    low = a.getbbox()[3]
    strip = a.crop((0, round(low - im.height * band), im.width, low))
    xs = [x for x in range(im.width) if strip.crop((x, 0, x + 1, strip.height)).getbbox()]
    return (min(xs) + max(xs)) / 2, low


def place(im, s, tx, ty, size):
    """im mis à l'échelle s et posé en (tx, ty) sur un fond transparent de taille size."""
    sm = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.BILINEAR)
    out = Image.new("RGBA", size, (0, 0, 0, 0))
    out.paste(sm, (round(tx), round(ty)))
    return out


def binarize(a):
    return a.point(lambda v: 255 if v > 128 else 0)


def cost(mov, fix, weight, s, tx, ty, use_rgb):
    """Différence moyenne sur la zone weight (L) entre fix et mov posé (s, tx, ty)."""
    p = place(mov, s, tx, ty, fix.size)
    a = binarize(p.getchannel("A"))
    if use_rgb:
        wm = ImageChops.multiply(weight, a)
        n = ImageStat.Stat(wm).sum[0] / 255
        if n < 20:
            return 1e9
        d = ImageChops.difference(p.convert("RGB"), fix.convert("RGB")).convert("L")
        return ImageStat.Stat(ImageChops.multiply(d, wm)).sum[0] / 255 / n
    d = ImageChops.multiply(ImageChops.difference(a, binarize(fix.getchannel("A"))), weight)
    return ImageStat.Stat(d).sum[0] / 255


def register(mov, fix, init, weight=None, use_rgb=False, levels=(8, 4, 2, 1), win=6, ds=0.02):
    """Affine (s, tx, ty) autour de init (repère plein) pour poser mov sur fix. weight : zone de fix qui compte."""
    if weight is None:
        weight = Image.new("L", fix.size, 255)
    s, tx, ty = init
    c = None
    for i, lv in enumerate(levels):
        f = fix.resize((max(1, fix.width // lv), max(1, fix.height // lv)), Image.BILINEAR)
        k = fix.width / f.width
        wt = weight.resize(f.size, Image.BILINEAR)
        m = mov.resize((max(1, round(mov.width / k)), max(1, round(mov.height / k))), Image.BILINEAR)
        r = win if i == 0 else 2
        step_s = ds / (2 ** i)
        best = None
        for j in range(-r, r + 1):
            ss = s * (1 + j * step_s)
            for dx in range(-r, r + 1):
                for dy in range(-r, r + 1):
                    v = cost(m, f, wt, ss, tx / k + dx, ty / k + dy, use_rgb)
                    if best is None or v < best[0]:
                        best = (v, ss, (tx / k + dx) * k, (ty / k + dy) * k)
        c, s, tx, ty = best
    return s, tx, ty, c
