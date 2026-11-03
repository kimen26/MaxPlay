"""Dino-Mix : construit la page de démonstration (un dino + toutes ses allures) depuis les pièces découpées.

Usage (depuis la racine du dépôt) :
    python -I studio/minijeux/dino-mix/build.py [index_tête] [sortie.html]

    index_tête : dino affiché à l'ouverture (ordre de SPECIES), 0 Tricératops par défaut. Toutes les têtes et
                 tous les corps sont dans la page.
    sortie     : défaut studio/minijeux/dino-mix/dino-mix-demo.html (page autonome, images en data:).

Lit : pieces/lego/ (têtes et corps, écrits par assemble.py), pieces/*.webp (jambes, objets ; voir README.md) et le
gabarit page.html (« /*KIT*/null » remplacé par les données). Ne modifie jamais les pièces.
"""
import base64
import io
import json
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
PIECES = HERE / "pieces"
LEGO = PIECES / "lego"
# Lego (assemble.py, L-165) : par espèce, un corps et une tête dessinés par ChatGPT sur le MÊME corps de base, recalés
# dans le même cadre. Toute tête se pose sur tout corps telle quelle. Ordre = ordre des boutons.
SPECIES = [("triceratops", "Tricératops"), ("parasaurolophus", "Parasaurolophus"), ("spinosaure", "Spinosaure"),
           ("diplodocus", "Diplodocus"), ("ankylosaure", "Ankylosaure"), ("raptor", "Raptor à plumes"),
           ("carnotaure", "Carnotaure"), ("stegosaure", "Stégosaure")]
BELLY_BAND = 0.07       # bas du ventre : colonnes à moins de 7 % de la hauteur du corps du point le plus bas
TAIL_K = 1.6            # ampleur de la queue lego (page : mo.tail x tailK) : la flexion ne déchire rien, elle peut
                        # se voir (revue 2026-11-03 : « queues trop rigides »)
TAIL_PIVOT = (0.30, 0.55)   # racine de la queue, en part de la boîte du corps de base (x depuis la gauche, y depuis le haut)
LEG_POSES = ["avant", "droite", "arriere", "pliee", "pendante"]
SHOD = [("nus", "chaus-r1c1"), ("baskets", "chaus-r1c2"), ("rollers", "chaus-r1c3"), ("ressorts", "chaus-r1c4"), ("fusees", "fusee-r1c1")]
ACC = ["skate", "oeuf", "oeuf-avant", "roue", "meteorite", "nuage", "cendre"]


def data_uri(im):
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=90, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def file_uri(path):
    """Pièce déjà en WebP : ses octets tels quels (le réencodage bloquait l'encodeur sur une tête presque vide)."""
    return "data:image/webp;base64," + base64.b64encode(path.read_bytes()).decode("ascii")


def load(name):
    return Image.open(PIECES / f"{name}.webp").convert("RGBA")


def lego_kit():
    """Têtes et corps lego (pieces/lego, écrits par assemble.py). Repères pris sur le corps de base (Tricératops sans
    tête) : tous les corps en dérivent, donc mêmes hanches, même ventre, même racine de queue pour tous."""
    meta = json.loads((LEGO / "kit.json").read_text(encoding="utf-8"))
    by_key = {s["key"]: s for s in meta["species"]}
    w, h = meta["size"]
    bx0, by0, bx1, by1 = meta["base"]
    a = Image.open(LEGO / "corps-triceratops.webp").getchannel("A").load()
    bottom = [max((y for y in range(by0, by1) if a[x, y] > 128), default=-1) for x in range(w)]
    ref = max(bottom)
    run = [x for x in range(bx0, bx1) if bottom[x] >= ref - (by1 - by0) * BELLY_BAND]
    x0, x1 = min(run), max(run)
    hips = [[round(x, 1), bottom[int(x)]] for x in (x0 + (x1 - x0) * 0.32, x0 + (x1 - x0) * 0.68)]
    tri = meta["tri"]
    common = {"w": w, "h": h, "u": tri[2] - tri[0], "refH": tri[3] - tri[1], "top": tri[1], "bottom": ref, "hips": hips, "tailK": TAIL_K,
              "tailJ": [bx0 + (bx1 - bx0) * TAIL_PIVOT[0], by0 + (by1 - by0) * TAIL_PIVOT[1]], "lego": True}
    heads, bodies = [], []
    for key, label in SPECIES:
        if key not in by_key:
            print("pas encore assemblé :", key)
            continue
        s = by_key[key]
        heads.append({"w": w, "h": h, "name": label, "src": file_uri(LEGO / f"tete-{key}.webp"),
                      "pivot": s["pivot"], "eye": s["eye"]})
        im = Image.open(LEGO / f"corps-{key}.webp")
        tip = im.getchannel("A").point(lambda v: 255 if v > 128 else 0).getbbox()[0]   # bout de la queue (flexion)
        bodies.append(dict(common, name=label, tailTip=tip, src=file_uri(LEGO / f"corps-{key}.webp")))
    return heads, bodies


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
    heads, bodies = lego_kit()
    kit = {
        "heads": heads,
        "bodies": bodies,
        "start": head,
        "legs": [dict(leg_meta(load(f"jambe-r1c{i + 1}")), name=n, src=data_uri(load(f"jambe-r1c{i + 1}"))) for i, n in enumerate(LEG_POSES)],
        "shod": {},
        "acc": {n: piece(f"acc-{n}") for n in ACC},
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
    page = (HERE / "page.html").read_text(encoding="utf-8").replace("/*KIT*/null", json.dumps(kit, ensure_ascii=False))
    out.write_text(page, encoding="utf-8")
    print(f"OK {out} ({out.stat().st_size // 1024} Ko)")


if __name__ == "__main__":
    main()
