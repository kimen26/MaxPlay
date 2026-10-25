"""Dino-Mix : construit la page de démonstration (un dino + toutes ses allures) depuis les pièces découpées.

Usage (depuis la racine du dépôt) :
    python -I studio/minijeux/dino-mix/build.py [index_tête] [sortie.html]

    index_tête : 0 Tricératops (défaut), 1 Parasaurolophus, 2 Spinosaure, 3 Diplodocus, 4 Ankylosaure,
                 5 Raptor à plumes.
    sortie     : défaut studio/minijeux/dino-mix/dino-mix-demo.html (page autonome, images en data:).

Lit : pieces/*.webp (voir README.md) et le gabarit page.html (« /*KIT*/null » remplacé par les données).
Ne modifie jamais les pièces : le nettoyage (ombre sous le corps) se fait en mémoire.
"""
import base64
import colorsys
import io
import json
import sys
from collections import deque
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
PIECES = HERE / "pieces"
HEADS = ["Tricératops", "Parasaurolophus", "Spinosaure", "Diplodocus", "Ankylosaure", "Raptor à plumes"]
LEG_POSES = ["avant", "droite", "arriere", "pliee", "pendante"]
SHOD = [("nus", "chaus-r1c1"), ("baskets", "chaus-r1c2"), ("rollers", "chaus-r1c3"), ("ressorts", "chaus-r1c4"), ("fusees", "fusee-r1c1")]
ACC = ["skate", "oeuf", "oeuf-avant", "roue", "meteorite", "nuage", "cendre"]


def data_uri(im):
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=90, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def load(name):
    return Image.open(PIECES / f"{name}.webp").convert("RGBA")


def clear_shadow(img, y_min=0):
    """Efface l'ombre portée beige (pixels clairs et peu saturés reliés au transparent) sous y_min."""
    w, h = img.size
    px = img.load()

    def light(x, y):
        r, g, b, a = px[x, y]
        if a < 10:
            return False
        _, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        return v > 0.72 and s < 0.28
    q = deque((x, y) for y in range(h) for x in range(w) if px[x, y][3] < 10)
    seen = set(q)
    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and y_min <= ny < h and (nx, ny) not in seen and light(nx, ny):
                seen.add((nx, ny))
                px[nx, ny] = (0, 0, 0, 0)
                q.append((nx, ny))
    return img


def clean_body(im):
    """Corps sans pattes : retire l'ombre ChatGPT sous le ventre (l'« ovale » vu par PY le 2026-10-16)."""
    im = clear_shadow(im.copy(), int(im.height * 0.6))
    px = im.load()
    w, h = im.size
    for x in range(w):
        dark = [y for y in range(int(h * 0.6), h) if px[x, y][3] > 128 and max(px[x, y][:3]) < 120]
        if dark:
            for y in range(max(dark) + 2, h):
                px[x, y] = (0, 0, 0, 0)
    return im.crop(im.getchannel("A").getbbox())


def find_eye(im):
    """Centre et rayon de l'œil : la plus grosse tache noire, ronde et pleine, dans le haut-droit du sprite."""
    w, h = im.size
    px = im.load()

    def dark(x, y):
        r, g, b, a = px[x, y]
        return a > 200 and max(r, g, b) < 70
    seen, best = set(), []
    for y in range(int(h * 0.1), int(h * 0.7)):
        for x in range(int(w * 0.4), w):
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
    return [round(sum(xs) / len(xs), 1), round(sum(ys) / len(ys), 1), round(max(max(xs) - min(xs), max(ys) - min(ys)) / 2 + 3, 1)]


def body_meta(im):
    """Bas du ventre et deux hanches (là où les jambes se glissent sous le corps)."""
    w, h = im.size
    a = im.getchannel("A").load()
    bottom = [max((y for y in range(h) if a[x, y] > 128), default=-1) for x in range(w)]
    lo = int(w * 0.3)
    ref = max(bottom[lo:])
    belly = [x for x in range(lo, w) if bottom[x] >= ref - h * 0.07]
    x0, x1 = min(belly), max(belly)
    hips = [x0 + (x1 - x0) * 0.32, x0 + (x1 - x0) * 0.68]
    return {"w": w, "h": h, "hips": [[round(x, 1), bottom[int(x)]] for x in hips], "bottom": ref, "eye": find_eye(im)}


def body(name, label):
    im = clean_body(load(name))
    return dict(body_meta(im), name=label, src=data_uri(im))


def leg_meta(im):
    """Pivot de hanche (centre du haut rond de la cuisse) et cheville (début des orteils blancs)."""
    w, h = im.size
    px = im.load()
    top = min(y for y in range(h) for x in range(w) if px[x, y][3] > 128)
    band = [x for y in range(top, top + int(h * 0.3)) for x in range(w) if px[x, y][3] > 128]
    toes = h
    for y in range(int(h * 0.55), h):
        if sum(1 for x in range(w) if px[x, y][3] > 128 and min(px[x, y][:3]) > 225) > w * 0.12:
            toes = y
            break
    return {"w": w, "h": h, "pivot": [round((min(band) + max(band)) / 2, 1), round(top + (max(band) - min(band)) * 0.42, 1)], "ankle": toes}


def variant(kind, head):
    """Corps surfeur / bras levés / vol de la tête : <kind>-r1c<tête> (montage variantes.py ou dessin),
    sinon celui du Tricératops."""
    name = f"{kind}-r1c{head + 1}"
    return name if (PIECES / f"{name}.webp").exists() else f"{kind}-r1c1"


def piece(name):
    im = load(name)
    return {"w": im.width, "h": im.height, "src": data_uri(im)}


def main():
    head = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else HERE / "dino-mix-demo.html"
    kit = {
        "bodies": [body(f"corps-r1c{head + 1}", HEADS[head])],
        "legs": [dict(leg_meta(load(f"jambe-r1c{i + 1}")), name=n, src=data_uri(load(f"jambe-r1c{i + 1}"))) for i, n in enumerate(LEG_POSES)],
        "shod": {},
        "acc": {n: piece(f"acc-{n}") for n in ACC},
        "surf": body(variant("surf", head), "surfeur"),  # bras écartés (skate)
        "up": body(variant("up", head), "up"),           # bras levés tenant le manche (parapluie-hélice)
        "vol": body(variant("vol", head), "vol"),        # pose de super-héros (tout ce qui vole)
        "prop": piece("prop-r1c1"),
    }
    kit["acc"]["parapluie"] = piece("parapluie-r1c1")
    for name, f in SHOD:                          # jambe + accessoire dessinés d'une seule pièce
        im = load(f)
        m = dict(leg_meta(im), src=data_uri(im))
        if name == "ressorts":                     # haut du ressort : la bague violette
            px = im.load()
            purple = [y for y in range(im.height) for x in range(0, im.width, 3)
                      if px[x, y][3] > 128 and px[x, y][2] > 150 and px[x, y][0] > 120 and px[x, y][1] < 120]
            m["springTop"] = min(purple) if purple else None
        kit["shod"][name] = m
    up = load(variant("up", head))                 # haut du manche rouge tenu dans les mains
    px = up.load()
    reds = [(x, y) for y in range(up.height) for x in range(0, up.width, 2)
            if px[x, y][3] > 128 and px[x, y][0] > 170 and px[x, y][1] < 110 and px[x, y][2] < 110]
    if reds:
        ty = min(y for _, y in reds)
        top = [x for x, y in reds if y < ty + 6]
        # le corps « up » est recadré par clean_body : le manche est au-dessus de l'ombre, coordonnées inchangées
        kit["up"]["stick"] = [sum(top) / len(top), ty]
    page = (HERE / "page.html").read_text(encoding="utf-8").replace("/*KIT*/null", json.dumps(kit, ensure_ascii=False))
    out.write_text(page, encoding="utf-8")
    print(f"OK {out} ({out.stat().st_size // 1024} Ko)")


if __name__ == "__main__":
    main()
