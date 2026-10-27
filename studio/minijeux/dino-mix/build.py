"""Dino-Mix : construit la page de démonstration (un dino + toutes ses allures) depuis les pièces découpées.

Usage (depuis la racine du dépôt) :
    python -I studio/minijeux/dino-mix/build.py [index_tête] [sortie.html]

    index_tête : tête affichée à l'ouverture (ordre de BODIES), 0 Tricératops par défaut. Toutes les têtes et
                 toutes les pièces de dos sont dans la page.
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
# Un dessin = une tête sur le corps-gabarit au dos lisse (même ventre, même échelle). Ce qui distingue les corps
# est une pièce de dos posée DERRIÈRE le dos (D-034) : elle se combine avec n'importe quelle tête.
BODIES = [("corps-r1c1", "Tricératops"), ("corps-r1c2", "Parasaurolophus"), ("corps-r1c3", "Spinosaure"),
          ("corps-r1c4", "Diplodocus"), ("corps-r1c5", "Ankylosaure"), ("corps-r1c6", "Raptor à plumes"),
          ("corps-carno", "Carnotaure"), ("corps-stego", "Stégosaure")]
# pièce de dos -> (fichier, largeur en part de la largeur du corps, part de sa hauteur cachée derrière le dos,
# bout de queue assorti ou None)
BACKS = {"voile": ("voile", 0.62, 0.22, None), "plaques": ("plaques", 0.50, 0.30, "pointes"),
         "plumes": ("plumes", 0.58, 0.35, None), "armure": ("armure", 0.66, 0.30, "massue"),
         "bosses": ("bosses", 0.62, 0.45, None)}
# bout de queue -> largeur en part de la largeur du corps
TIPS = {"massue": 0.21, "pointes": 0.23}
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


def belly_span(im, band):
    """Étendue du bas du ventre : colonnes dont le bas de silhouette est à moins de band pixels du plus bas."""
    w, h = im.size
    a = im.getchannel("A").load()
    bottom = [max((y for y in range(h) if a[x, y] > 128), default=-1) for x in range(w)]
    lo = int(w * 0.3)
    ref = max(bottom[lo:])
    belly = [x for x in range(lo, w) if bottom[x] >= ref - band]
    return min(belly), max(belly), bottom, ref


def back_line(im):
    """Haut du dos, colonne par colonne : en remontant depuis le bas du ventre, premier pixel vide (une crête
    séparée du dos par un vide ne compte pas). Rend [[x, y], ...] tous les 4 % de la largeur."""
    w, h = im.size
    a = im.getchannel("A").load()
    out = []
    for i in range(26):
        x = min(w - 1, round(i * w / 25))
        ys = [y for y in range(h) if a[x, y] > 128]
        if not ys:
            continue
        y = max(ys)
        while y > 0 and a[x, y - 1] > 128:
            y -= 1
        out.append([x, y])
    return out


def body_meta(im, band=None):
    """Bas du ventre, deux hanches (là où les jambes se glissent sous le corps) et ligne du dos."""
    w, h = im.size
    x0, x1, bottom, ref = belly_span(im, band if band else h * 0.07)
    hips = [x0 + (x1 - x0) * 0.32, x0 + (x1 - x0) * 0.68]
    a = im.getchannel("A").load()
    tx = min(x for x in range(w) if any(a[x, y] > 128 for y in range(h)))
    ty = [y for y in range(h) if a[tx, y] > 128]
    return {"w": w, "h": h, "hips": [[round(x, 1), bottom[int(x)]] for x in hips], "bottom": ref, "eye": find_eye(im),
            "back": back_line(im), "tip": [tx, sum(ty) / len(ty)]}


def body(name, label):
    im = clean_body(load(name))
    return dict(body_meta(im), name=label, src=data_uri(im))


def same_scale_bodies():
    """Tous les dessins ramenés à l'échelle du Tricératops, puis une seule hauteur de référence pour tous, sinon
    un long cou rapetisserait le dino (L-152). L'échelle se prend sur l'œil, identique sur toutes les têtes
    (D-034) : la largeur du ventre varie d'un dessin ChatGPT à l'autre (Stégosaure plus long)."""
    ref = clean_body(load(BODIES[0][0]))
    band = ref.height * 0.07
    eye = find_eye(ref)[2] - 3                    # find_eye ajoute 3 px de marge au rayon
    out = []
    for name, label in BODIES:
        im = clean_body(load(name))
        f = eye / (find_eye(im)[2] - 3)
        if abs(f - 1) > 0.02:
            im = im.resize((round(im.width * f), round(im.height * f)), Image.LANCZOS)
        out.append(dict(body_meta(im, band), name=label, refH=ref.height, src=data_uri(im)))
    return out


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


def piece(name):
    im = load(name)
    return {"w": im.width, "h": im.height, "src": data_uri(im)}


def main():
    head = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else HERE / "dino-mix-demo.html"
    kit = {
        "bodies": same_scale_bodies(),
        "start": head,
        # ligne du dos commune : celle du Stégosaure, seul dessin sans collerette ni crête qui touche le dos
        "tpl": [n for n, _ in BODIES].index("corps-stego"),
        "backs": {k: dict(piece(f"dos-{f}"), span=sp, sink=sk, tip=t) for k, (f, sp, sk, t) in BACKS.items()},
        "tips": {k: dict(piece(f"queue-{k}"), span=sp) for k, sp in TIPS.items()},
        "legs": [dict(leg_meta(load(f"jambe-r1c{i + 1}")), name=n, src=data_uri(load(f"jambe-r1c{i + 1}"))) for i, n in enumerate(LEG_POSES)],
        "shod": {},
        "acc": {n: piece(f"acc-{n}") for n in ACC},
        "surf": body("surf-r1c1", "surfeur"),      # bras écartés (skate)
        "up": body("up-r1c1", "up"),               # bras levés tenant le manche (parapluie-hélice)
        "vol": body("vol-r1c1", "vol"),            # pose de super-héros (tout ce qui vole)
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
    up = load("up-r1c1")                           # haut du manche rouge tenu dans les mains
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
