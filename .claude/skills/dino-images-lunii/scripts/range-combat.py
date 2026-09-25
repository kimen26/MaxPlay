# Range une scène de combat VALIDÉE du staging vers la collection paleoart.
# PNG ChatGPT -> site/img/dinos/paleoart/<Nom>_<type>.webp, côté long ramené à 1448 px
# (largeur des scènes paleoart existantes), WebP q88.
# Usage : python range-combat.py <staging.png> <Nom> <ennemi|proie|rival>
import sys
from pathlib import Path
from PIL import Image

TYPES = {'ennemi', 'proie', 'rival'}
COTE_MAX = 1448
DEST = Path('c:/ProjetsPerso/Claude_Projects/MaxPlay/site/img/dinos/paleoart')

src, nom, typ = sys.argv[1], sys.argv[2], sys.argv[3]
if typ not in TYPES:
    sys.exit(f'type inconnu : {typ} (attendu : {", ".join(sorted(TYPES))})')
if not nom[:1].isupper():
    sys.exit(f'nom attendu en latin capitalisé (clé d\'asset) : {nom}')

im = Image.open(src).convert('RGB')
im.thumbnail((COTE_MAX, COTE_MAX), Image.LANCZOS)
out = DEST / f'{nom}_{typ}.webp'
im.save(out, 'WEBP', quality=88, method=6)
print(f'{out.name} {im.size[0]}x{im.size[1]} {out.stat().st_size // 1024} Ko')
