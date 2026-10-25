"""Découpe d'une planche Dino-Mix (fond crème uni) en sprites PNG transparents.

Usage :
    python -I studio/minijeux/dino-mix/decoupe.py <planche.png> <dossier_sortie> <rangées> <colonnes> <préfixe> [hauteur_max]

Pour chaque personnage ou objet de la grille : un WebP recadré à fond transparent (réduit à
hauteur_max pixels si donnée, mêmes proportions pour toute la planche), plus une
ligne dans <dossier_sortie>/<préfixe>.json (position dans la grille, taille, ligne des pieds,
étendue horizontale des pieds, teinte dominante). Python + PIL seulement (pas de numpy sur la
machine).
"""
import colorsys
import json
import sys
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw

SENTINEL = (255, 0, 255)
BG_THRESH = 38          # tolérance de remplissage du fond crème
SCALE = 2               # étiquetage des composantes sur une image réduite (vitesse)
MIN_AREA_RATIO = 0.002  # une composante plus petite que ça est un résidu
PAD = 4
FEET_BAND = 0.07        # bas de la silhouette considéré comme « les pieds »


def remove_background(img):
    """Remplit le fond depuis les bords et rend un masque alpha (True = sujet)."""
    work = img.convert("RGB").copy()
    w, h = work.size
    seeds = [(x, y) for x in range(0, w, max(1, w // 40)) for y in (0, h - 1)]
    seeds += [(x, y) for y in range(0, h, max(1, h // 40)) for x in (0, w - 1)]
    for seed in seeds:
        if work.getpixel(seed) != SENTINEL:
            ImageDraw.floodfill(work, seed, SENTINEL, thresh=BG_THRESH)
    px = work.load()
    return [[px[x, y] != SENTINEL for x in range(w)] for y in range(h)]


def label_components(mask):
    """Composantes 4-connexes sur le masque réduit. Rend une liste de listes de points réduits."""
    h, w = len(mask), len(mask[0])
    small = [[mask[y][x] for x in range(0, w, SCALE)] for y in range(0, h, SCALE)]
    sh, sw = len(small), len(small[0])
    seen = [[False] * sw for _ in range(sh)]
    comps = []
    for y in range(sh):
        for x in range(sw):
            if small[y][x] and not seen[y][x]:
                q, pts = deque([(x, y)]), []
                seen[y][x] = True
                while q:
                    cx, cy = q.popleft()
                    pts.append((cx, cy))
                    for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                        if 0 <= nx < sw and 0 <= ny < sh and small[ny][nx] and not seen[ny][nx]:
                            seen[ny][nx] = True
                            q.append((nx, ny))
                comps.append(pts)
    min_area = MIN_AREA_RATIO * sw * sh
    return [c for c in comps if len(c) >= min_area]


def cluster(values, k):
    """Regroupe des positions 1D en k groupes par les k-1 plus grands écarts."""
    order = sorted(range(len(values)), key=lambda i: values[i])
    gaps = sorted(range(len(order) - 1), key=lambda i: values[order[i + 1]] - values[order[i]], reverse=True)[: k - 1]
    cuts = sorted(gaps)
    group, groups, start = {}, [], 0
    for c in cuts + [len(order) - 1]:
        groups.append(order[start: c + 1])
        start = c + 1
    for g_idx, g in enumerate(groups):
        for i in g:
            group[i] = g_idx
    return group


def dominant_hue(img):
    """Teinte moyenne (degrés) des pixels saturés et clairs, moyenne circulaire."""
    import math
    sx = sy = 0.0
    n = 0
    data = img.get_flattened_data() if hasattr(img, 'get_flattened_data') else img.getdata()
    for r, g, b, a in data:
        if a < 200:
            continue
        hh, ss, vv = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if ss > 0.25 and vv > 0.5:
            sx += math.cos(hh * 2 * math.pi)
            sy += math.sin(hh * 2 * math.pi)
            n += 1
    if not n:
        return None
    return round((math.degrees(math.atan2(sy, sx)) + 360) % 360, 1)


def main():
    if len(sys.argv) not in (6, 7):
        print(__doc__)
        sys.exit(1)
    src, out_dir, rows, cols, prefix = sys.argv[1], Path(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
    max_h = int(sys.argv[6]) if len(sys.argv) == 7 else None
    out_dir.mkdir(parents=True, exist_ok=True)
    img = Image.open(src).convert("RGBA")
    mask = remove_background(img)
    comps = label_components(mask)
    if len(comps) < rows * cols:
        print(f"ERREUR {len(comps)} composantes trouvées, {rows * cols} attendues")
        sys.exit(2)
    # Les plus grosses composantes sont les sujets. Un morceau plus petit dont le centre tombe dans la boîte
    # d'un sujet lui appartient (contour troué : plumes claires, ventre crème) ; le reste est ignoré.
    ranked = sorted(comps, key=len, reverse=True)
    comps, rest = ranked[: rows * cols], ranked[rows * cols:]

    def box_of(c):
        xs = [p[0] for p in c]
        ys = [p[1] for p in c]
        return min(xs), min(ys), max(xs), max(ys)
    for piece in rest:
        bx = box_of(piece)
        cx_, cy_ = (bx[0] + bx[2]) / 2, (bx[1] + bx[3]) / 2
        for c in comps:
            b = box_of(c)
            if b[0] <= cx_ <= b[2] and b[1] <= cy_ <= b[3]:
                c.extend(piece)
                break
    boxes = []
    for c in comps:
        xs = [p[0] * SCALE for p in c]
        ys = [p[1] * SCALE for p in c]
        boxes.append((min(xs), min(ys), max(xs) + SCALE, max(ys) + SCALE))
    tallest = max(b[3] - b[1] + 2 * PAD for b in boxes)
    k = min(1.0, max_h / tallest) if max_h else 1.0
    row_of = cluster([(b[1] + b[3]) / 2 for b in boxes], rows)
    col_of = cluster([(b[0] + b[2]) / 2 for b in boxes], cols)

    w, h = img.size
    alpha = Image.new("L", (w, h), 0)
    ap = alpha.load()
    for y in range(h):
        row = mask[y]
        for x in range(w):
            if row[x]:
                ap[x, y] = 255
    rgba = img.copy()
    rgba.putalpha(alpha)

    meta = []
    for i, (x0, y0, x1, y1) in enumerate(boxes):
        r, c = row_of[i], col_of[i]
        box = (max(0, x0 - PAD), max(0, y0 - PAD), min(w, x1 + PAD), min(h, y1 + PAD))
        sprite = rgba.crop(box)
        # Ne garder que la composante elle-même (pas les bouts de voisins dans le rectangle).
        keep = Image.new("L", sprite.size, 0)
        kp = keep.load()
        for (sx_, sy_) in comps[i]:
            for dy in range(SCALE):
                for dx in range(SCALE):
                    X, Y = sx_ * SCALE + dx - box[0], sy_ * SCALE + dy - box[1]
                    if 0 <= X < sprite.width and 0 <= Y < sprite.height:
                        kp[X, Y] = 255
        a = Image.composite(sprite.getchannel("A"), Image.new("L", sprite.size, 0), keep)
        sprite.putalpha(a)
        if k < 1.0:
            sprite = sprite.resize((max(1, round(sprite.width * k)), max(1, round(sprite.height * k))), Image.LANCZOS)
        name = f"{prefix}-r{r + 1}c{c + 1}.webp"
        sprite.save(out_dir / name, quality=88, method=6)
        # Ligne et étendue des pieds : bas de la silhouette.
        sw_, sh_ = sprite.size
        apx = sprite.getchannel("A").load()
        bottom = max((y for y in range(sh_) for x in range(sw_) if apx[x, y] > 128), default=sh_ - 1)
        band_top = int(bottom - FEET_BAND * sh_)
        feet_x = [x for y in range(band_top, bottom + 1) for x in range(sw_) if apx[x, y] > 128]
        meta.append({
            "file": name, "row": r + 1, "col": c + 1, "w": sw_, "h": sh_,
            "feetY": bottom, "feetX0": min(feet_x) if feet_x else 0, "feetX1": max(feet_x) if feet_x else sw_,
            "hue": dominant_hue(sprite),
        })
    meta.sort(key=lambda m: (m["row"], m["col"]))
    (out_dir / f"{prefix}.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"OK {len(meta)} sprites -> {out_dir}")


if __name__ == "__main__":
    main()
