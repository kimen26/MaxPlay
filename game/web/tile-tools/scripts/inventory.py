"""
Scan toutes les tiles et produit un index JSON :
- Pour chaque PNG : taille px + taille en tiles (48px)
- Détection des assets non-multiple de 48
- Groupement par dossier
"""
import json
import os
from PIL import Image

TILES_DIR = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\phaser\public\assets\tiles'
OUT = r'c:\ProjetsPerso\Claude_Projects\MaxPlay\game\web\tile-tools\_inventory.json'

def scan(root):
    inventory = {}
    for dirpath, _, files in os.walk(root):
        rel_dir = os.path.relpath(dirpath, root).replace('\\', '/')
        for f in files:
            if not f.lower().endswith('.png'): continue
            full = os.path.join(dirpath, f)
            try:
                img = Image.open(full)
                w, h = img.size
                rel = (rel_dir + '/' + f).lstrip('./').replace('\\', '/')
                inventory[rel] = {
                    'w': w, 'h': h,
                    'wt': w // 48 if w % 48 == 0 else None,
                    'ht': h // 48 if h % 48 == 0 else None,
                    'multi': w > 48 or h > 48,
                }
            except Exception as e:
                print(f"FAIL: {f} -> {e}")
    return inventory

if __name__ == '__main__':
    inv = scan(TILES_DIR)
    # Garde uniquement les multi-tiles dans un sous-index utile
    multi = {k: v for k, v in inv.items() if v.get('multi')}
    print(f"Total tiles : {len(inv)}")
    print(f"Multi-tiles (> 48x48) : {len(multi)}")
    # Stats par catégorie
    cats = {}
    for k, v in inv.items():
        cat = k.split('/')[0]
        cats.setdefault(cat, {'total': 0, 'multi': 0, 'sizes': set()})
        cats[cat]['total'] += 1
        if v['multi']: cats[cat]['multi'] += 1
        cats[cat]['sizes'].add(f"{v['w']}x{v['h']}")
    for cat, s in cats.items():
        print(f"  {cat}: {s['total']} ({s['multi']} multi) sizes={len(s['sizes'])}")
    # Sauvegarde JSON
    out_data = {
        'all': inv,
        'multi_only': multi,
        'stats': {cat: {'total': s['total'], 'multi': s['multi']} for cat, s in cats.items()},
    }
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(out_data, f, indent=2)
    print(f"\nWrote {OUT}")
