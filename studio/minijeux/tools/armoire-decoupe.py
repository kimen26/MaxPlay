#!/usr/bin/env python3
"""HO-MJ-12 -- decoupe des assets GPT de l'armoire en pieces modulaires webp.

Regenere tout `site/img/armoire/` depuis `studio/minijeux/inbox/` (racine + decoupe/).
Idempotent : rejouable sans effet de bord sur les sources (jamais modifiees).

Usage:
    python studio/minijeux/tools/armoire-decoupe.py
    python studio/minijeux/tools/armoire-decoupe.py --sheet   # + planche-contact de controle
"""
import json
import os
import sys

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

# Chemins
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
INBOX = os.path.join(ROOT, "studio", "minijeux", "inbox")
DECOUPE = os.path.join(INBOX, "decoupe")
OUT_DIR = os.path.join(ROOT, "site", "img", "armoire")
SHEET_PATH = os.path.join(ROOT, "studio", "minijeux", "docs", "handoffs", "rapports",
                           "captures", "HO-MJ-12-planche-contact.png")

# Sources decoupe/ (jamais de nombre magique dans le corps)
CARCASSE = os.path.join(DECOUPE, "ChatGPT Image 15 sept. 2026, 00_23_44 (1).png")
PLANCHE_SRC = os.path.join(DECOUPE, "ChatGPT Image 15 sept. 2026, 00_23_44 (2).png")
MONTANT_SRC = os.path.join(DECOUPE, "ChatGPT Image 15 sept. 2026, 00_23_44 (3).png")
PORTE_SRC = os.path.join(DECOUPE, "ChatGPT Image 15 sept. 2026, 00_23_44 (4).png")
PORTE_OUVERTE_SRC = os.path.join(DECOUPE, "ChatGPT Image 15 sept. 2026, 00_23_45 (5).png")
TIROIR_SRC = os.path.join(DECOUPE, "ChatGPT Image 15 sept. 2026, 00_23_45 (6).png")
SPOT_SRC = os.path.join(DECOUPE, "ChatGPT Image 15 sept. 2026, 00_23_45 (7).png")
LUMIERE_SRC = os.path.join(DECOUPE, "ChatGPT Image 15 sept. 2026, 00_23_46 (8).png")

# Coordonnees issues d'un profil de luminance ligne par ligne (numpy, colonnes
# centrales x=[w/2-50, w/2+50]) sur CARCASSE (971x1619) : transition nette
# planche/mur a y=190 (fronton), transition nette mur/socle a y=1340.
FRONTON_BOTTOM_Y = 190
SOCLE_TOP_Y = 1340

# Carre 128x128 pour la tuile fond-bois : zone plate du mur, loin des montants
# (x<150 et x>840 a y=700) et des gradients haut/bas -> centre du panneau.
FOND_BOIS_BOX = (421, 636, 549, 764)

# Bande 48x64 au milieu du montant (bbox alpha du montant : x[283,441], y[75,2103])
MONTANT_BOX = (338, 1057, 386, 1121)

# Tailles cibles (cote long en px, sauf mention contraire)
SIZE_OBJET = 320
SIZE_FRONTON_LARGEUR = 720
SIZE_PLANCHE_LARGEUR = 720
SIZE_SOCLE_LARGEUR = 720
SIZE_TIROIR = 360
SIZE_PORTE = 240
SIZE_PORTE_OUVERTE = 240
SIZE_SPOT = 96
SIZE_LUMIERE = 160

ALPHA_TRIM_THRESHOLD = 8
ALPHA_ERODE_PX = 2
ALPHA_HARD_THRESHOLD = 40

# quality=82 (defaut) -> 516 Ko, quality=75 -> 444 Ko, quality=60 -> 405 Ko :
# tous au-dessus de la cible 350 Ko. quality=35 -> 343,7 Ko, sans perte visible
# a l'oeil (verifie sur obj-peluche-stego, obj-carnet). Baisse de quality
# choisie avant toute baisse de taille, comme prescrit par le brief.
WEBP_QUALITY = 35
WEBP_METHOD = 6

# Objets a poser dans les casiers : (source dans inbox/, sortie, methode halo)
OBJETS = [
    ("ChatGPT Image 14 sept. 2026, 23_05_04 (1).png", "obj-dino.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_04 (2).png", "obj-livres-jeux.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_04 (3).png", "obj-puzzle.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_05 (4).png", "obj-bus.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_06 (5).png", "obj-peluche-tri.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_06 (6).png", "obj-oeuf.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_07 (7).png", "obj-radio.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_42 (1).png", "obj-globe.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_42 (2).png", "obj-volcan.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_42 (3).png", "obj-meteorite.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_43 (4).png", "obj-lettres.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_05_44 (5).png", "obj-chiffres.webp", "rembg"),
    # rembg laisse une tache sombre pres de la banderole (flou de mouvement mal
    # segmente, constate a l'oeil) -> alpha d'origine + erosion seule.
    ("ChatGPT Image 14 sept. 2026, 23_05_44 (6).png", "obj-drapeaux.webp", "erode"),
    # rembg troue le pont entre les deux cloches -> alpha d'origine + erosion.
    ("ChatGPT Image 14 sept. 2026, 23_05_45 (7).png", "obj-reveil.webp", "erode"),
    ("ChatGPT Image 14 sept. 2026, 23_07_10 (1).png", "obj-livre-ouvert.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_07_10 (2).png", "obj-livres-dinos.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_07_10 (3).png", "obj-carnet.webp", "rembg"),
    ("ChatGPT Image 14 sept. 2026, 23_23_49.png", "obj-peluche-stego.webp", "rembg"),
    # 23_07_10 (4) = doublon du globe -> ignore.
]

_REMBG_SESSION = new_session()

# --- Helpers image ---------------------------------------------------------
def load_rgba(path):
    return Image.open(path).convert("RGBA")

def trim_alpha(im, threshold=ALPHA_TRIM_THRESHOLD):
    """Recadre sur le bbox du canal alpha seuille."""
    a = np.array(im)[:, :, 3]
    ys, xs = np.where(a >= threshold)
    if len(xs) == 0:
        return im
    return im.crop((int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))

def erode_alpha(im, erode_px=ALPHA_ERODE_PX, hard_threshold=ALPHA_HARD_THRESHOLD):
    """Erode l'alpha de erode_px (min-filter) + seuille <hard_threshold a 0.

    Nettoie les franges de halo sans rembg (mobilier, ou objets que rembg degrade).
    """
    arr = np.array(im)
    a_img = Image.fromarray(arr[:, :, 3], mode="L")
    for _ in range(erode_px):
        a_img = a_img.filter(ImageFilter.MinFilter(3))
    a2 = np.where(np.array(a_img) < hard_threshold, 0, np.array(a_img))
    out = arr.copy()
    out[:, :, 3] = a2
    return Image.fromarray(out, mode="RGBA")

def remove_halo_rembg(im):
    """Aplati sur fond blanc puis rembg -> reprend l'alpha rembg sur les RGB d'origine."""
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    flat = Image.alpha_composite(bg, im).convert("RGB")
    new_alpha = np.array(remove(flat, session=_REMBG_SESSION).convert("RGBA"))[:, :, 3]
    out = np.array(im).copy()
    out[:, :, 3] = new_alpha
    return Image.fromarray(out, mode="RGBA")

def remove_halo(im, method):
    if method not in ("rembg", "erode"):
        raise ValueError(f"methode de halo inconnue: {method}")
    return remove_halo_rembg(im) if method == "rembg" else erode_alpha(im)

def resize(im, target, by="long"):
    """`by='long'` -> plus grand cote = target px ; `by='largeur'` -> largeur = target px."""
    base = max(im.width, im.height) if by == "long" else im.width
    if base == target:
        return im
    ratio = target / base
    w, h = max(1, round(im.width * ratio)), max(1, round(im.height * ratio))
    return im.resize((w, h), Image.LANCZOS)

def mirror_tile_2x2(square):
    """Carre WxH -> tuile 2Wx2H seamless par miroir horizontal + vertical."""
    w, h = square.size
    flip_h = square.transpose(Image.FLIP_LEFT_RIGHT)
    flip_v = square.transpose(Image.FLIP_TOP_BOTTOM)
    tile = Image.new("RGBA", (w * 2, h * 2))
    tile.paste(square, (0, 0))
    tile.paste(flip_h, (w, 0))
    tile.paste(flip_v, (0, h))
    tile.paste(flip_h.transpose(Image.FLIP_TOP_BOTTOM), (w, h))
    return tile

def mirror_tile_y(band):
    """Bande WxH -> tuile WxH*2 seamless en repeat-y par miroir vertical."""
    w, h = band.size
    tile = Image.new("RGBA", (w, h * 2))
    tile.paste(band, (0, 0))
    tile.paste(band.transpose(Image.FLIP_TOP_BOTTOM), (0, h))
    return tile

def save_webp(im, name, source, manifest):
    path = os.path.join(OUT_DIR, name)
    im.save(path, "WEBP", quality=WEBP_QUALITY, method=WEBP_METHOD)
    manifest[name] = {"w": im.width, "h": im.height, "octets": os.path.getsize(path), "source": source}

# --- Pipeline ----------------------------------------------------------------
# Pieces de mobilier : (source, sortie, pre-crop ou None, mode resize, taille).
# pre-crop = (left, top, right, bottom) ; None pour right/bottom = bord de l'image.
FURNITURE = [
    (CARCASSE, "fronton.webp", (0, 0, None, FRONTON_BOTTOM_Y), "largeur", SIZE_FRONTON_LARGEUR),
    (CARCASSE, "socle.webp", (0, SOCLE_TOP_Y, None, None), "largeur", SIZE_SOCLE_LARGEUR),
    (PLANCHE_SRC, "planche.webp", None, "largeur", SIZE_PLANCHE_LARGEUR),
    (PORTE_SRC, "porte.webp", None, "long", SIZE_PORTE),
    (PORTE_OUVERTE_SRC, "porte-ouverte.webp", None, "long", SIZE_PORTE_OUVERTE),
    (TIROIR_SRC, "tiroir.webp", None, "long", SIZE_TIROIR),
    (SPOT_SRC, "spot.webp", None, "long", SIZE_SPOT),
    (LUMIERE_SRC, "lumiere.webp", None, "long", SIZE_LUMIERE),
]

def build_furniture(manifest):
    for src, out_name, box, mode, size in FURNITURE:
        im = load_rgba(src)
        if box:
            l, t, r, b = box
            im = im.crop((l, t, r or im.width, b or im.height))
        crop = resize(erode_alpha(trim_alpha(im)), size, mode)
        save_webp(crop, out_name, os.path.basename(src), manifest)

def build_fond_bois(manifest):
    square = load_rgba(CARCASSE).crop(FOND_BOIS_BOX)  # zone opaque, pas d'alpha a nettoyer
    save_webp(mirror_tile_2x2(square), "fond-bois.webp", os.path.basename(CARCASSE), manifest)

def build_montant(manifest):
    band = load_rgba(MONTANT_SRC).crop(MONTANT_BOX)
    save_webp(mirror_tile_y(band), "montant.webp", os.path.basename(MONTANT_SRC), manifest)

def build_objects(manifest):
    for src_name, out_name, halo_method in OBJETS:
        im = load_rgba(os.path.join(INBOX, src_name))
        # rembg est sensible au cadrage : toujours lance sur le canevas complet
        # (un pre-trim avant rembg faisait disparaitre une partie de obj-drapeaux,
        # constate a l'oeil) ; le trim vient seulement apres.
        crop = trim_alpha(remove_halo(im, halo_method))
        save_webp(resize(crop, SIZE_OBJET), out_name, src_name, manifest)

def regenerate_all():
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest = {}
    build_furniture(manifest)
    build_fond_bois(manifest)
    build_montant(manifest)
    build_objects(manifest)
    with open(os.path.join(OUT_DIR, "MANIFEST.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2, sort_keys=True)
    return manifest

# --- Planche-contact (--sheet) ----------------------------------------------
def checkerboard(w, h, cell=16):
    xv, yv = np.meshgrid(np.arange(w) // cell, np.arange(h) // cell)
    shade = np.where((xv + yv) % 2 == 0, 210, 170).astype(np.uint8)
    return Image.fromarray(np.dstack([shade] * 3), mode="RGB")

def _open(name):
    return Image.open(os.path.join(OUT_DIR, name)).convert("RGBA")

def build_composition_test():
    """Assemble 360x740 (fronton+tuile+montants+planches+objets+socle+tiroirs) : preuve du raccord."""
    W, H = 360, 740
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fond = _open("fond-bois.webp")
    for y in range(0, H, fond.height):
        for x in range(0, W, fond.width):
            canvas.paste(fond, (x, y))
    fronton = resize(_open("fronton.webp"), W, "largeur")
    socle = resize(_open("socle.webp"), W, "largeur")
    canvas.alpha_composite(fronton, (0, 0))
    canvas.alpha_composite(socle, (0, H - socle.height))
    montant = _open("montant.webp")
    interieur_bas = H - socle.height
    for mx in (0, (W - montant.width) // 2, W - montant.width):
        for y in range(fronton.height, interieur_bas, montant.height):
            canvas.alpha_composite(montant, (mx, y))
    planche = resize(_open("planche.webp"), W, "largeur")
    n_planches, step = 4, (interieur_bas - fronton.height) // 5
    for i in range(1, n_planches + 1):
        canvas.alpha_composite(planche, (0, fronton.height + i * step - planche.height // 2))
    objets = [
        "obj-dino.webp", "obj-livres-jeux.webp", "obj-bus.webp",
        "obj-globe.webp", "obj-reveil.webp", "obj-peluche-stego.webp",
    ]
    slot_w = (W - montant.width * 3) // 2
    for idx, obj_name in enumerate(objets):
        row, col = divmod(idx, 2)
        obj = _open(obj_name)
        scale = min(slot_w / obj.width, step / obj.height) * 0.8
        obj = obj.resize((max(1, round(obj.width * scale)), max(1, round(obj.height * scale))), Image.LANCZOS)
        x = montant.width + col * (slot_w + montant.width) + (slot_w - obj.width) // 2
        y = fronton.height + row * step + (step - obj.height) // 2
        canvas.alpha_composite(obj, (x, y))
    tiroir = _open("tiroir.webp")
    ty = interieur_bas - tiroir.height + 10
    for tx in (10, W - tiroir.width - 10):
        canvas.alpha_composite(tiroir, (tx, ty))
    return canvas

def build_contact_sheet():
    names = sorted(n for n in os.listdir(OUT_DIR) if n.endswith(".webp"))
    cols, cell, pad = 5, 200, 12
    rows = (len(names) + cols - 1) // cols
    composition = build_composition_test()
    sheet = checkerboard(cols * cell, rows * cell + composition.height + pad * 3).convert("RGBA")
    for i, name in enumerate(names):
        r, c = divmod(i, cols)
        thumb = _open(name)
        thumb.thumbnail((cell - pad * 2, cell - pad * 2), Image.LANCZOS)
        x, y = c * cell + (cell - thumb.width) // 2, r * cell + (cell - thumb.height) // 2
        sheet.alpha_composite(thumb, (x, y))
    comp_pos = ((sheet.width - composition.width) // 2, rows * cell + pad)
    sheet.alpha_composite(composition, comp_pos)
    os.makedirs(os.path.dirname(SHEET_PATH), exist_ok=True)
    sheet.convert("RGB").save(SHEET_PATH, "PNG")
    return SHEET_PATH

def main():
    manifest = regenerate_all()
    print(f"{len(manifest)} pieces ecrites dans {OUT_DIR}")
    if "--sheet" in sys.argv:
        print(f"planche-contact : {build_contact_sheet()}")

if __name__ == "__main__":
    main()
