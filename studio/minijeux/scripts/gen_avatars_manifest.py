# Genere site/js/avatars.js depuis site/img/avatars/<id>_<mood>_<n>.png (variant-aware)
import os, re, json, io
AV = 'C:/ProjetsPerso/Claude_Projects/MaxPlay/site/img/avatars'
OUT = 'C:/ProjetsPerso/Claude_Projects/MaxPlay/site/js/avatars.js'
NAMES = {  # id -> (surnom, sous-titre) ; ordre = ordre d'affichage historique
    'tritri': ('Tritri', 'Tricératops'), 'trex': ('Rex', 'T-Rex'), 'stego': ('Stégo', 'Stégosaure'),
    'brachio': ('Brachi', 'Brachiosaure'), 'velo': ('Vélo', 'Vélociraptor'), 'spino': ('Spino', 'Spinosaure'),
    'anky': ('Anky', 'Ankylosaure'), 'ptero': ('Ptéro', 'Ptéranodon'), 'diplo': ('Diplo', 'Diplodocus'),
    'paras': ('Paras', 'Parasaurolophus'), 'theri': ('Théri', 'Therizinosaure'),
    'pachy': ('Pachy', 'Pachycéphalosaure'), 'centro': ('Centro', 'Centrosaure'), 'dilo': ('Dilo', 'Dilophosaure'),
    'galli': ('Galli', 'Gallimimus'), 'allo': ('Allo', 'Allosaure'),
    'oeuf': ('Coco', 'Œuf de dino'), 'libellule': ('Libelle', 'Libellule géante'), 'ammonite': ('Ammo', 'Ammonite'),
    'mosa': ('Mosa', 'Mosasaure'), 'plesio': ('Plési', 'Plésiosaure'), 'cory': ('Cory', 'Corythosaure'),
    'vague': ('Vague', 'La grande vague'), 'cendre': ('Cendro', 'Nuage de cendre'), 'lave': ('Lava', 'Goutte de lave'),
    'mammouth': ('Mammouth', 'Mammouth laineux'), 'smilodon': ('Smilo', 'Dent de sabre'),
    'meteorite': ('Météo', 'Météorite'), 'volcan': ('Volcan', 'Volcan'),
}
MOODS = ['joyeux', 'enerve', 'original']
rx = re.compile(r'^([a-z]+)_(joyeux|enerve|original)_(\d+)\.png$')
found = {}
for f in sorted(os.listdir(AV)):
    m = rx.match(f)
    if not m:
        print('IGNORE', f)
        continue
    i, mood = m.group(1), m.group(2)
    found.setdefault(i, {mm: [] for mm in MOODS})[mood].append(f)
data = []
for i, (nm, sub) in NAMES.items():
    if i not in found:
        print('ABSENT (aucun fichier):', i)
        continue
    data.append({'id': i, 'name': nm, 'sub': sub, 'moods': found[i]})
unknown = set(found) - set(NAMES)
if unknown:
    print('SANS NOM (a ajouter a NAMES):', unknown)
js = ('// avatars.js — manifest (généré par c:/tmp/gen_avatars_manifest.py). Variant-aware.\n'
      'window.MAXPLAY_AVATARS_BASE = "img/avatars/";\n'
      'window.MAXPLAY_AVATARS = ' + json.dumps(data, ensure_ascii=False, indent=1) + ';\n')
with io.open(OUT, 'w', encoding='utf-8') as fh:
    fh.write(js)
total = sum(len(v) for d in data for v in d['moods'].values())
print('OK:', len(data), 'creatures,', total, 'fichiers ->', OUT)
