"""armoire-tuiles.py — decoupe la carcasse de l'armoire en tuiles webp
(HO-MJ-15). Source unique : compose() / panel_tile() / sans_feuille() de
armoire-compose.py (la maquette validee par Papa Yann) — ce script ne
recopie PAS ces fonctions, il les importe. Rejouable :

    python studio/minijeux/tools/armoire-tuiles.py

Unites = pixels de la reference (1024x1536, fond transparent). Sortie en
resolution NATIVE (pas de redimensionnement) : le CSS etire au pixel/unite
--u calcule par armoire.js. Table ci-dessous = table du brief HO-MJ-15 § 1.
"""
import importlib.util
import json
from pathlib import Path

from PIL import Image

TOOLS = Path(__file__).resolve().parent

# armoire-compose.py a un tiret dans son nom : pas importable via `import`,
# on le charge par chemin (c'est la SPEC, on ne recopie jamais son code).
_spec = importlib.util.spec_from_file_location('armoire_compose', TOOLS / 'armoire-compose.py')
armoire_compose = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(armoire_compose)
REF, sans_feuille, panel_tile, PANEL_W = (
    armoire_compose.REF, armoire_compose.sans_feuille, armoire_compose.panel_tile,
    armoire_compose.PANEL_W,
)
# Brief HO-MJ-15 § 1 : box panneau = 136,720,152,860 (bande de bois clair
# unie, 16x140 px) — DIFFERENTE de la constante PANEL=(136,152,720,860) de
# armoire-compose.py (qui capture toute la vitrine, spots compris : un
# souvenir d'une iteration precedente du script). Le tableau du brief est la
# spec explicite pour les tuiles ; on le suit a la lettre.
PANEL_BOX = (136, 720, 152, 860)

ROOT = TOOLS.parents[2]
OUT = ROOT / 'site/img/armoire/carcasse'

# (fichier, box) — box = (x0, y0, x1, y1) en pixels de la reference.
# Chaque tuile est cropee puis sauvee telle quelle (resolution native).
TILES = [
    ('fronton.webp', (200, 0, 830, 165)),
    ('fronton-g.webp', (133, 0, 200, 165)),
    ('fronton-d.webp', (830, 0, 890, 165)),
    ('vitrine-haut.webp', (200, 165, 830, 392)),
    ('planche.webp', (200, 392, 830, 418)),
    ('vitrine-bas.webp', (200, 418, 830, 653)),
    ('traverse-haut.webp', (185, 653, 860, 685)),
    ('casier.webp', (185, 685, 362, 880)),
    ('separateur.webp', (362, 685, 398, 880)),
    ('planche-casiers.webp', (185, 880, 860, 905)),
    ('traverse-bas.webp', (185, 905, 860, 935)),
    ('bas-etagere.webp', (200, 935, 830, 1122)),
    ('tiroirs.webp', (185, 1122, 860, 1310)),
    ('pieds.webp', (200, 1310, 830, 1385)),
    ('pieds-g.webp', (133, 1310, 200, 1385)),
    ('pieds-d.webp', (830, 1310, 890, 1385)),
    ('porte-haut.webp', (36, 110, 175, 668)),
    ('porte-bas.webp', (36, 938, 175, 1332)),
]

# panneau.webp : cas particulier — carre PANEL (voir armoire-compose.py)
# repete en miroir vertical, comme panel_tile() le fait au rendu. On fige
# UNE bande (le motif de base, deux fois : original + miroir accole) a la
# largeur affichee PANEL_W*  facteur de nettete (2x) pour rester net a
# l'etirement CSS. La hauteur totale de la tuile n'a pas besoin de couvrir
# toute l'armoire : le CSS la repete en `repeat-y`.
PANEL_TILE_SCALE = 2  # sur-echantillonnage : la tuile source (16 u) est petite


def build_panneau(ref):
    # PANEL_BOX = bande de bois clair unie (16x140 px, brief § 1), affichee a
    # PANEL_W=22 u de large a l'ecran. panel_tile() resize cette bande a la
    # largeur/hauteur demandees puis accole son miroir vertical (repeat-y
    # cote CSS). On fige une tuile native = un seul cycle (motif + miroir),
    # sur-echantillonnee (PANEL_TILE_SCALE) pour rester nette meme etiree.
    sq = ref.crop(PANEL_BOX)
    w_native = PANEL_W * PANEL_TILE_SCALE
    sq_h_native = sq.size[1] * (w_native / (PANEL_BOX[2] - PANEL_BOX[0]))
    h_native = round(sq_h_native) * 2  # un cycle complet : motif + son miroir
    return panel_tile(ref, w_native, h_native)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ref = sans_feuille(Image.open(REF).convert('RGBA'))

    manifest = {}
    for name, box in TILES:
        x0, y0, x1, y1 = box
        crop = ref.crop((x0, y0, min(x1, ref.size[0]), min(y1, ref.size[1])))
        path = OUT / name
        crop.save(path, 'WEBP', quality=80, method=6)
        manifest[name] = {'w': crop.size[0], 'h': crop.size[1], 'bytes': path.stat().st_size, 'crop': list(box)}
        print(f'{name:24s} {crop.size[0]:4d}x{crop.size[1]:<4d} {path.stat().st_size:6d} o')

    panneau = build_panneau(ref)
    ppath = OUT / 'panneau.webp'
    panneau.save(ppath, 'WEBP', quality=80, method=6)
    manifest['panneau.webp'] = {'w': panneau.size[0], 'h': panneau.size[1], 'bytes': ppath.stat().st_size, 'crop': 'PANEL miroir vertical accole'}
    print(f'{"panneau.webp":24s} {panneau.size[0]:4d}x{panneau.size[1]:<4d} {ppath.stat().st_size:6d} o')

    (OUT / 'MANIFEST.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')
    total = sum(m['bytes'] for m in manifest.values())
    print(f'\nTotal : {total} o ({total / 1024:.1f} Ko) — {len(manifest)} tuiles -> {OUT}')


if __name__ == '__main__':
    main()
