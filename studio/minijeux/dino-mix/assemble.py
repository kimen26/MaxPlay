"""Dinomino en lego : recale les dessins ChatGPT de chaque espèce sur le corps de base et écrit les pièces.

Usage (depuis la racine du dépôt) :
    python -I studio/minijeux/dino-mix/assemble.py

Lit sources/lego/ : par espèce, trois dessins faits par ChatGPT (projet « Dinosaure ») dans la même conversation,
- <espèce>-corps : le corps sans tête (celui du Tricératops, plus le dos et la queue de l'espèce), épaule refermée ;
- <espèce>-full  : le même dino entier, tête comprise (donne la place de la tête sur le corps) ;
- <espèce>-tete  : la tête seule.
Le corps de base est triceratops-corps : tous les corps en sont dérivés, donc un seul cou, une seule épaule.

Recalage (échelle + translation, lego.py) : la tête seule sur le dessin entier par l'œil, le dessin entier et le corps
sur le corps de base par la silhouette du ventre (ni la queue ni le dos, qui changent d'une espèce à l'autre).
Écrit pieces/lego/corps-<espèce>.webp, tete-<espèce>.webp, tous dans le MÊME cadre (même taille, même origine), et
pieces/lego/kit.json (repères du cadre). Une tête se pose donc sur n'importe quel corps sans calcul : même cadre.
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
sys.dont_write_bytecode = True
import lego  # noqa: E402

SRC = HERE / "sources" / "lego"
OUT = HERE / "pieces" / "lego"
SPECIES = ["triceratops", "parasaurolophus", "spinosaure", "diplodocus", "ankylosaure", "raptor", "carnotaure",
           "stegosaure"]
SCALE = 0.45            # résolution des pièces : le corps de base fait ~370 px de large (l'ancien Tricératops 424)
MARGIN = 6              # marge autour de l'union des pièces, en pixels de pièce
SCALES = [0.8 + 0.04 * i for i in range(13)]   # échelles essayées avant l'affinage
SLACK = 3               # décalage toléré entre la tête seule et le dessin entier, en pixels
INSIDE = 4              # le bas du cou se juge à au moins INSIDE px à l'intérieur du corps de base
FADE = 5                # fondu du bas de la tête sur le corps, en pixels du dessin ChatGPT
AGREE = 40              # écart de couleur (0-255) sous lequel la tête seule et le dessin entier « disent la même chose »


def belly_weight(base):
    """Zone du corps de base qui sert au recalage : le ventre et l'avant du flanc, sans la queue ni le dos ni la tête."""
    w = Image.new("L", base.size, 0)
    d = ImageDraw.Draw(w)
    d.rectangle([base.width * 0.3, base.height * 0.35, base.width * 0.62, base.height], fill=255)
    d.rectangle([base.width * 0.62, base.height * 0.8, base.width, base.height], fill=255)
    return w


def on_base(im, base, weight):
    """(s, tx, ty) qui pose im (corps ou dino entier) sur le corps de base, par la silhouette du ventre."""
    (xb, yb), (xi, yi) = lego.belly(base), lego.belly(im)
    best = None
    for s in SCALES:
        init = (s, xb - s * xi, yb - s * yi)          # départ : bas du ventre sur bas du ventre
        r = lego.register(im, base, init, weight=weight, levels=(8,), win=4)
        if best is None or r[3] < best[3]:
            best = r
    return lego.register(im, base, best[:3], weight=weight, levels=(8, 4, 2, 1), win=2)


def head_on_full(head, full):
    """(s, tx, ty) qui pose la tête seule sur le dessin entier, par l'œil puis les couleurs."""
    eh, ef = lego.find_eye(head), lego.find_eye(full)
    s0 = ef[2] / eh[2]
    return lego.register(head, full, (s0, ef[0] - s0 * eh[0], ef[1] - s0 * eh[1]), use_rgb=True)


def as_drawn(head, full, h, base, f):
    """La tête seule, posée dans le repère du dessin entier, réduite à ce que le dessin entier montre comme tête.
    Pour être seule, ChatGPT referme le bas du cou par un trait : sur le dino entier, ce bas de cou n'existe pas (le cou
    se fond dans le poitrail, le bras passe devant). On garde donc les seuls pixels où la tête seule et le dessin entier
    concordent : ailleurs, c'est le corps, dessous, qui se voit (retour 2026-11-03 : bras coupé par le bas du cou)."""
    hp = lego.place(head, *h[:3], full.size)
    rgb, ref = hp.convert("RGB"), full.convert("RGB")
    diff = None
    for dx in range(-SLACK, SLACK + 1):       # ChatGPT redessine à quelques pixels près : le plus proche dans SLACK px
        for dy in range(-SLACK, SLACK + 1):
            d = ImageChops.difference(rgb, ImageChops.offset(ref, dx, dy)).convert("L")
            diff = d if diff is None else ImageChops.darker(diff, d)
    agree = diff.point(lambda v: 255 if v < AGREE else 0)
    agree = agree.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(5))     # pas de poussière
    agree = agree.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))     # pas de trous
    # on ne juge que là où la tête recouvre le corps (le bas du cou refermé y est) : ailleurs, un trait de la tête
    # simplement décalé de quelques pixels resterait effacé (contour arrière du long cou du Diplodocus, 2026-11-03)
    trunk = lego.place(base, 1 / f[0], -f[1] / f[0], -f[2] / f[0], full.size).getchannel("A")
    inner = trunk.point(lambda v: 255 if v > 128 else 0).filter(ImageFilter.MinFilter(2 * INSIDE + 1))
    agree = ImageChops.lighter(agree, ImageChops.invert(inner))
    # là où le dessin entier montre autre chose (bas du cou refermé), la tête s'efface en fondu, en restant à
    # FADE px de la zone : sinon un liseré clair (bord adouci du trait effacé) ou un bord net restait sur le poitrail
    agree = agree.filter(ImageFilter.MinFilter(2 * FADE + 1)).filter(ImageFilter.GaussianBlur(FADE))
    hp.putalpha(ImageChops.darker(hp.getchannel("A"), agree))
    return hp


def main():
    base = lego.detour(SRC / "triceratops-corps.webp")
    weight = belly_weight(base)
    placed, report = {}, {}
    for sp in SPECIES:
        if not (SRC / f"{sp}-tete.webp").exists():
            print("manque", sp)
            continue
        body, full, head = (lego.detour(SRC / f"{sp}-{p}.webp") for p in ("corps", "full", "tete"))
        b = (1, 0, 0, 0) if sp == "triceratops" else on_base(body, base, weight)
        f = on_base(full, base, weight)
        h = head_on_full(head, full)
        placed[sp] = {"corps": (body, b[:3]), "tete": (as_drawn(head, full, h, base, f), f[:3]), "full": (full, f[:3])}
        report[sp] = {"corps": round(b[3], 1), "full": round(f[3], 1), "tete": round(h[3], 2)}
        print(sp, report[sp])
    # cadre commun : l'union de toutes les pièces posées, dans le repère du corps de base
    boxes = []
    for sp in placed:
        for key in ("corps", "tete"):
            im, (s, tx, ty) = placed[sp][key]
            boxes.append((tx, ty, tx + im.width * s, ty + im.height * s))
    x0, y0 = min(b[0] for b in boxes), min(b[1] for b in boxes)
    x1, y1 = max(b[2] for b in boxes), max(b[3] for b in boxes)
    size = (round((x1 - x0) * SCALE) + 2 * MARGIN, round((y1 - y0) * SCALE) + 2 * MARGIN)
    OUT.mkdir(parents=True, exist_ok=True)

    def frame(im, s, tx, ty):
        return lego.place(im, s * SCALE, (tx - x0) * SCALE + MARGIN, (ty - y0) * SCALE + MARGIN, size)
    kit = {"size": size, "species": [], "recalage": report}
    for sp in placed:
        body, head, full = (frame(placed[sp][k][0], *placed[sp][k][1]) for k in ("corps", "tete", "full"))
        body.save(OUT / f"corps-{sp}.webp", quality=90, method=6)
        head.save(OUT / f"tete-{sp}.webp", quality=90, method=6)
        full.save(OUT / f"entier-{sp}.webp", quality=80, method=6)     # contrôle seulement
        # pivot de la tête : centre de la zone où elle recouvre le corps de base
        base_a = lego.binarize(frame(base, 1, 0, 0).getchannel("A"))
        over = ImageChops.multiply(lego.binarize(head.getchannel("A")), base_a).getbbox()
        eye = lego.find_eye(head)
        kit["species"].append({"key": sp, "pivot": [round((over[0] + over[2]) / 2, 1), round((over[1] + over[3]) / 2, 1)],
                               "eye": [round(v, 1) for v in eye] if eye else None})
    kit["base"] = list(lego.binarize(frame(base, 1, 0, 0).getchannel("A")).getbbox())
    full, f = placed["triceratops"]["full"]
    kit["tri"] = list(lego.binarize(frame(full, *f).getchannel("A")).getbbox())   # Tricératops entier : hauteur de référence
    (OUT / "kit.json").write_text(json.dumps(kit, ensure_ascii=False, indent=1), encoding="utf-8")
    print("OK", size, OUT)


if __name__ == "__main__":
    main()
