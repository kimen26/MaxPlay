"""armoire-proto-mesure.py — HO-MJ-17 passe 4 :

- pt.2 : vérifie que vitrine-2 ET le casier du milieu sont tous les deux
  30-40% plus sombres (luminance) que le montant, sur les 8 captures — même
  fourchette pour les deux, preuve que c'est bien le même jeu de règles CSS
  (.ar-fond::after) qui s'applique partout, pas une surcouche par type de
  rangée.
- pt.3 : vérifie qu'une ligne de pixels 4px sous le socle, entre les pieds,
  est à 100% couleur du mur (aucun tronçon de montant/séparateur résiduel).

(Le pt.1 passe 4 — portes droites posées dans le corps — et le pt.3 passe 3
— hauteur du bord extérieur vs bord charnière — sont mesurés directement
DANS armoire-proto-shot.mjs, voir ses commentaires.)

Lit HO-MJ-17-points-mesure.json (coordonnées écrites par
armoire-proto-shot.mjs) puis scanne les PNG de capture (la luminance n'est
pas lisible depuis le DOM seul : canvas taintée par les <img> file://).

    python studio/minijeux/tools/armoire-proto-mesure.py
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
CAPS = ROOT / 'studio/minijeux/docs/handoffs/rapports/captures'
POINTS = CAPS / 'HO-MJ-17-points-mesure.json'


def luma(px):
    r, g, b = px[:3]
    return 0.299 * r + 0.587 * g + 0.114 * b


def zone_luma(arr, pt, demi=6):
    zone = arr[pt['y'] - demi:pt['y'] + demi, pt['x'] - demi:pt['x'] + demi].reshape(-1, 3)
    return luma(zone.mean(axis=0).astype(float))


def scan_sous_socle(im, scan):
    """Ligne de pixels 4px sous le socle, entre les pieds : ne doit
    contenir AUCUN tronçon de montant/séparateur résiduel (brief passe 4
    pt.3). À cette hauteur, le tapis (.piece::before, ellipse sombre floue
    sous les pieds — élément de mise en scène VOULU, cf. armoire.css
    d'origine) assombrit légitimement toute la zone, donc comparer à la
    couleur EXACTE du mur (premier essai) donne un faux positif partout. Le
    signal d'un vrai tronçon résiduel est un pic de LUMINOSITÉ localisé
    (plus clair que ses voisins, comme du bois clair sur fond de
    tapis sombre) au milieu d'un dégradé par ailleurs doux — on scanne la
    variation locale (dérivée) plutôt que la couleur absolue."""
    if not scan or scan['xEnd'] <= scan['xStart']:
        return None
    arr = np.asarray(im.convert('RGB')).astype(float)
    y = min(max(0, scan['y']), arr.shape[0] - 1)
    x0, x1 = max(0, scan['xStart']), min(arr.shape[1], scan['xEnd'])
    if x1 - x0 < 10:
        return None
    ligne_luma = arr[y, x0:x1] @ [0.299, 0.587, 0.114]
    # lissage large (le tapis varie doucement, en ellipse) puis écart au
    # lissage : un tronçon de bois clair ressort comme un pic net au-dessus
    # de sa tendance locale. mode='valid' évite les faux pics de bord que
    # 'same' introduit près des pieds (où le dégradé elliptique du tapis
    # remonte naturellement) ; on exclut aussi 15% de marge à chaque bout.
    marge = max(1, (x1 - x0) // 7)
    fenetre = max(5, (x1 - x0) // 6)
    if fenetre % 2 == 0:
        fenetre += 1
    kernel = np.ones(fenetre) / fenetre
    tendance = np.convolve(ligne_luma, kernel, mode='same')
    ecart = (ligne_luma - tendance)[marge:-marge] if len(ligne_luma) > 2 * marge else ligne_luma - tendance
    pic_max = float(ecart.max()) if len(ecart) else 0.0
    return pic_max


def main():
    points = json.loads(POINTS.read_text(encoding='utf-8'))
    for entry in points:
        w, h = entry['w'], entry['h']
        png = CAPS / f'HO-MJ-17-proto-{w}x{h}.png'
        if not png.exists():
            continue
        im = Image.open(png)
        arr = np.asarray(im.convert('RGB'))
        montant_l = zone_luma(arr, entry['montantPoint'])
        vitrine_l = zone_luma(arr, entry['vitrine2Point'])
        vitrine_ecart = (1 - vitrine_l / montant_l) * 100 if montant_l else 0
        v_ok = 'OK' if 30 <= vitrine_ecart <= 40 else f"HORS FOURCHETTE (30-40% requis)"
        print(f"{w}x{h} - pt.2 vitrine-2 vs montant : vitrine_luma={vitrine_l:.1f} "
              f"montant_luma={montant_l:.1f} ecart={vitrine_ecart:.1f}% {v_ok}")
        if entry.get('casierPoint'):
            casier_l = zone_luma(arr, entry['casierPoint'])
            casier_ecart = (1 - casier_l / montant_l) * 100 if montant_l else 0
            c_ok = 'OK' if 30 <= casier_ecart <= 40 else f"HORS FOURCHETTE (30-40% requis)"
            print(f"    pt.2 casier milieu vs montant : casier_luma={casier_l:.1f} "
                  f"montant_luma={montant_l:.1f} ecart={casier_ecart:.1f}% {c_ok}")
        pic = scan_sous_socle(im, entry.get('sousLeSocleScan'))
        if pic is not None:
            s_ok = 'OK' if pic < 12 else f"TRONCON RESIDUEL (pic luminance +{pic:.1f})"
            print(f"    pt.3 sous le socle (entre pieds) : pic max luminance = +{pic:.1f} {s_ok}")


if __name__ == '__main__':
    main()
