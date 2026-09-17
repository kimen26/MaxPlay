"""armoire-kit.py — HO-MJ-17 : kit de 8 sprites pour l'armoire v4.

Découpe 7 sprites depuis la référence (armoire ouverte GPT, fond transparent,
1024×1536) + harmonise la porte v1 (site/img/armoire/porte.webp, plate,
détourée) sur un échantillon de bois de la référence. Écrit les 8 WEBP dans
site/img/armoire/kit/, un MANIFEST.json (w, h, octets, crop, source), et une
planche-contact (damier + tests de raccord) à ouvrir avant le prototype.

    python studio/minijeux/tools/armoire-kit.py
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[3]
REF = ROOT / 'studio/minijeux/inbox/decoupe/ChatGPT Image 15 sept. 2026, 00_25_01.png'
PORTE_V1 = ROOT / 'site/img/armoire/porte.webp'
OUT = ROOT / 'site/img/armoire/kit'
CONTACT = ROOT / 'studio/minijeux/docs/handoffs/rapports/captures/HO-MJ-17-kit-planche-contact.png'

# ── table des crops (px de la référence 1024×1536) ─────────────────────
LEAF, LEAF_PATCH = (450, 65, 578, 152), (322, 65, 450, 152)   # feuille du fronton à effacer
FRONTON = (133, 0, 890, 165)
MONTANT = (133, 700, 173, 860)          # bande verticale, cadre latéral gauche du casier
PLANCHE = (435, 653, 685, 685)          # traverse haute (a une vraie tranche avant) — zone SANS tenon de séparateur visible (HO-MJ-17 passe 4 pt.3 : le crop précédent (191..854) incluait les hauts de 2 séparateurs de casiers de la référence à x≈360-385 et 610-640, réaffichés en petits tenons sous le socle une fois le sprite réutilisé pour .ar-socle)
FOND = (300, 450, 460, 610)              # 160×160, fond de vitrine (HO-MJ-17 passe 2 : zone imposée)
FOND_ECHANTILLON = (300, 450, 730, 640)   # mesure de contrôle : fond nettement plus sombre que le cadre
CADRE_ECHANTILLON = (140, 700, 180, 850)
TIROIR = (205, 1140, 515, 1298)         # tiroir gauche de la rangée basse
PIED = (140, 1333, 215, 1385)           # pied seul, sans morceau de socle (HO-MJ-17 passe 2, pt.5 : zone imposée par l'orchestrateur (140..215,1325..1385), top ajusté à 1333 pour couper le liseré d'ombre sous le socle mesuré sur la colonne x=175)
# spot.webp supprimé du kit (HO-MJ-17 passe 2) : le spot devient CSS pur
# (radial-gradient), voir proto.css .spot / .spot::after.
# échantillon pour harmoniser la porte (seule pièce hors référence) : le
# montant/cadre lui-même (HO-MJ-17 passe 2, pt.6), pas une porte ouverte —
# la porte ouverte de la référence est nettement plus claire que le cadre.

WEBP_OPTS = dict(quality=80, method=6)


def sans_feuille(ref):
    """Efface la feuille du fronton (patch de bois voisin, bord flouté)."""
    ref = ref.copy()
    patch = ref.crop(LEAF_PATCH).resize((LEAF[2] - LEAF[0], LEAF[3] - LEAF[1]))
    mask = Image.new('L', patch.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([6, 6, patch.size[0] - 6, patch.size[1] - 6], radius=14, fill=255)
    ref.paste(patch, (LEAF[0], LEAF[1]), mask.filter(ImageFilter.GaussianBlur(5)))
    return ref


def trim(img):
    """Recadre sur le bbox alpha (retire les marges transparentes)."""
    arr = np.asarray(img)
    if arr.shape[-1] < 4:
        return img
    alpha = arr[..., 3]
    ys, xs = np.where(alpha > 4)
    if len(xs) == 0:
        return img
    return img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def harmonise(img, sample):
    """Aligne moyenne/écart-type de luminance (L) et saturation (S, HSV) de
    `img` sur `sample`, canal par canal, en préservant l'alpha. Sur les
    sprites déjà issus de la référence l'effet est ~nul ; sur la porte v1
    (autre génération) il recolore pour qu'elle ne jure plus."""
    img_rgba = img.convert('RGBA')
    arr = np.asarray(img_rgba).astype(np.float64)
    rgb, alpha = arr[..., :3], arr[..., 3]

    def hsv(a):
        im = Image.fromarray(np.clip(a, 0, 255).astype('uint8'), 'RGB').convert('HSV')
        return np.asarray(im).astype(np.float64)

    src_hsv = hsv(rgb)
    samp_rgb = np.asarray(sample.convert('RGB')).astype(np.float64).reshape(-1, 3)
    samp_hsv = np.asarray(sample.convert('HSV')).astype(np.float64).reshape(-1, 3)

    mask = alpha.reshape(-1) > 4
    for ch in (1, 2):  # S, V — pas H (on ne change pas la teinte du bois)
        s_vals = src_hsv[..., ch].reshape(-1)[mask]
        if s_vals.size == 0:
            continue
        src_mean, src_std = s_vals.mean(), s_vals.std() + 1e-6
        tgt_mean, tgt_std = samp_hsv[:, ch].mean(), samp_hsv[:, ch].std() + 1e-6
        plane = src_hsv[..., ch]
        src_hsv[..., ch] = np.clip((plane - src_mean) / src_std * tgt_std + tgt_mean, 0, 255)

    out_rgb = Image.fromarray(np.clip(src_hsv, 0, 255).astype('uint8'), 'HSV').convert('RGB')
    out = Image.new('RGBA', img_rgba.size)
    out.paste(out_rgb, (0, 0))
    out.putalpha(Image.fromarray(np.clip(alpha, 0, 255).astype('uint8')))
    return out


def crop_trim(ref, box):
    return trim(ref.crop(box))


def make_fond_320(ref):
    """160×160 -> mosaïque 320×320 par miroir 2x2. Flou gaussien rayon 4
    AVANT le miroir (demande orchestrateur passe 2) : le motif devient
    presque uni, la couture du miroir disparaît."""
    sq = ref.crop(FOND).filter(ImageFilter.GaussianBlur(4)).convert('RGBA')
    top = Image.new('RGBA', (sq.width * 2, sq.height))
    top.paste(sq, (0, 0))
    top.paste(sq.transpose(Image.FLIP_LEFT_RIGHT), (sq.width, 0))
    full = Image.new('RGBA', (sq.width * 2, sq.height * 2))
    full.paste(top, (0, 0))
    full.paste(top.transpose(Image.FLIP_TOP_BOTTOM), (0, sq.height))
    return full


def make_montant_raccordable(ref):
    """Bande verticale rendue raccordable en repeat-y : miroir vertical
    140 -> 280 (brief § 1)."""
    band = crop_trim(ref, MONTANT)
    mirrored = Image.new('RGBA', (band.width, band.height * 2))
    mirrored.paste(band, (0, 0))
    mirrored.paste(band.transpose(Image.FLIP_TOP_BOTTOM), (0, band.height))
    return mirrored


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    ref = sans_feuille(Image.open(REF).convert('RGBA'))
    montant_sample = ref.crop(CADRE_ECHANTILLON)

    sprites = {}
    sprites['fronton'] = crop_trim(ref, FRONTON)
    sprites['montant'] = make_montant_raccordable(ref)
    sprites['planche'] = crop_trim(ref, PLANCHE)
    sprites['fond'] = make_fond_320(ref)
    sprites['tiroir'] = crop_trim(ref, TIROIR)
    sprites['pied'] = crop_trim(ref, PIED)

    # porte : v1 plate/détourée, redimensionnée à 320 px de haut, harmonisée
    # sur le MONTANT (le cadre), pas sur une porte ouverte de la référence :
    # HO-MJ-17 passe 2 (pt.6) a mesuré que la porte ouverte est nettement
    # plus claire que le cadre, et harmoniser dessus éclaircissait tout le
    # kit. Les sprites natifs de la référence (fronton/montant/planche/
    # fond/tiroir/pied) NE PASSENT PLUS par harmonise() : ils sont déjà dans
    # le ton exact de la référence, les repasser dans HSV les en éloignait
    # au lieu de les préserver (mesuré : montant du proto passe 1 à
    # RGB(185,138,85) contre RGB(183,112,46) sur la référence, écarts G/B
    # hors tolérance ±10). Seule la porte (source externe) a besoin d'être
    # recolorée.
    porte = Image.open(PORTE_V1).convert('RGBA')
    ratio = 320 / porte.height
    porte = porte.resize((max(1, round(porte.width * ratio)), 320), Image.LANCZOS)
    sprites['porte'] = harmonise(porte, montant_sample)

    manifest = {}
    total_bytes = 0
    for name, img in sprites.items():
        path = OUT / f'{name}.webp'
        img.save(path, 'WEBP', **WEBP_OPTS)
        size_bytes = path.stat().st_size
        total_bytes += size_bytes
        crop_map = {
            'fronton': FRONTON, 'montant': MONTANT, 'planche': PLANCHE,
            'fond': FOND, 'tiroir': TIROIR, 'pied': PIED,
            'porte': 'site/img/armoire/porte.webp (v1, harmonisée)',
        }
        manifest[name] = {
            'w': img.width, 'h': img.height, 'bytes': size_bytes,
            'crop': crop_map[name],
            'source': 'reference' if name != 'porte' else 'porte v1 + harmonise()',
        }
    manifest['_total_bytes'] = total_bytes
    (OUT / 'MANIFEST.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False, default=str), encoding='utf-8')

    print(f'Kit : {total_bytes} octets ({total_bytes / 1024:.1f} Ko) pour {len(sprites)} sprites')
    for name, info in manifest.items():
        if name.startswith('_'):
            continue
        print(f"  {name:10s} {info['w']:4d}x{info['h']:<4d} {info['bytes']:6d} o")

    # mesures de contrôle demandées (HO-MJ-17 passe 2, pt.1 et pt.6)
    fond_zone = np.asarray(ref.convert('RGB').crop(FOND_ECHANTILLON)).reshape(-1, 3).mean(axis=0)
    cadre_zone = np.asarray(ref.convert('RGB').crop(CADRE_ECHANTILLON)).reshape(-1, 3).mean(axis=0)
    montant_kit = np.asarray(sprites['montant'].convert('RGB')).reshape(-1, 3).mean(axis=0)
    print(f"\nMesure pt.1 (fond vs cadre, référence) : fond RGB={fond_zone.round(1)} "
          f"({fond_zone.mean():.1f}) / cadre RGB={cadre_zone.round(1)} ({cadre_zone.mean():.1f}) "
          f"-> écart luminance {(1 - fond_zone.mean() / cadre_zone.mean()) * 100:.1f}%")
    montant_ref_meme_zone = np.asarray(ref.convert('RGB').crop(MONTANT)).reshape(-1, 3).mean(axis=0)
    print(f"Mesure pt.6 (montant kit vs référence, MÊME zone de crop) : kit RGB={montant_kit.round(1)} "
          f"vs référence RGB={montant_ref_meme_zone.round(1)} -> écart par canal "
          f"{np.abs(montant_kit - montant_ref_meme_zone).round(1)}")

    build_planche_contact(sprites)


def checker(w, h, cell=16):
    im = Image.new('RGB', (w, h))
    a = np.indices((h, w)).sum(axis=0) // cell % 2
    arr = np.where(a[..., None] == 0, 230, 200).astype('uint8')
    return Image.fromarray(np.repeat(arr, 3, axis=2))


def build_planche_contact(sprites):
    """8 sprites sur damier + 3 tests de raccord (montant x4 en Y, fond x3x3,
    planche étirée x2 en largeur)."""
    pad = 20
    cell_w, cell_h = 220, 220
    cols = 4
    rows_n = 2
    W = cols * cell_w + pad
    H = rows_n * cell_h + pad + 260  # + zone tests de raccord
    board = checker(W, H)
    d = ImageDraw.Draw(board)

    names = ['fronton', 'montant', 'planche', 'fond', 'tiroir', 'pied', 'porte']
    for i, name in enumerate(names):
        img = sprites[name]
        col, row = i % cols, i // cols
        x0, y0 = pad + col * cell_w, pad + row * cell_h
        thumb = img.copy()
        thumb.thumbnail((cell_w - 2 * pad, cell_h - 2 * pad - 18))
        board.paste(thumb, (x0 + (cell_w - thumb.width) // 2, y0 + (cell_h - thumb.height) // 2), thumb)
        d.text((x0 + 4, y0 + cell_h - 16), name, fill=(20, 20, 20))

    ty = rows_n * cell_h + pad + 10
    d.text((pad, ty), 'Tests de raccord :', fill=(20, 20, 20))
    ty += 20

    # montant x4 en Y (repeat-y)
    montant = sprites['montant']
    strip_h = montant.height * 2  # 2x le motif déjà mirroré = 4x le motif de base
    strip = Image.new('RGBA', (montant.width, strip_h))
    for y in range(0, strip_h, montant.height):
        strip.alpha_composite(montant, (0, y))
    strip.thumbnail((80, 220))
    board.paste(strip, (pad, ty), strip)
    d.text((pad, ty + strip.height + 2), 'montant x4', fill=(20, 20, 20))

    # fond x3x3
    fond = sprites['fond']
    mosaic = Image.new('RGBA', (fond.width * 3, fond.height * 3))
    for yy in range(3):
        for xx in range(3):
            mosaic.alpha_composite(fond, (xx * fond.width, yy * fond.height))
    mosaic.thumbnail((180, 180))
    board.paste(mosaic, (pad + 110, ty), mosaic)
    d.text((pad + 110, ty + mosaic.height + 2), 'fond x3x3', fill=(20, 20, 20))

    # planche étirée x2 en largeur
    planche = sprites['planche']
    stretched = planche.resize((planche.width * 2, planche.height * 3))
    stretched.thumbnail((320, 90))
    board.paste(stretched, (pad + 320, ty), stretched)
    d.text((pad + 320, ty + stretched.height + 2), 'planche étirée x2', fill=(20, 20, 20))

    CONTACT.parent.mkdir(parents=True, exist_ok=True)
    board.convert('RGB').save(CONTACT)
    print(f'Planche-contact : {CONTACT}')


if __name__ == '__main__':
    build()
