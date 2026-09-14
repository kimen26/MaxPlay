# HO-MJ-12 — L'Armoire (nouvel accueil) · découpe des assets GPT en pièces modulaires

> Statut : fait · Ouvert le 2026-09-15 · Exécutant : 1 sous-agent Sonnet · Orchestrateur : session principale.
> Origine : décision Papa Yann 2026-09-15 — « VIRE le menu actuel avec les perso qui bougent, ça a toujours été un échec ». Le nouvel accueil est une armoire en bois dont le milieu est une grille construite par le code. Les images n'apportent que texture et relief.
> Contrainte Papa Yann : « sprite/pattern pixel qui se répètent, optimisation maximale du poids et des perfs, c'est notre menu ».

## Objectif

Produire dans `site/img/armoire/` un jeu de pièces **petites, réutilisables, en webp**, découpées depuis les PNG GPT de `studio/minijeux/inbox/` et `studio/minijeux/inbox/decoupe/`, plus un script Python rejouable. Poids total cible du dossier : **≤ 350 Ko**. Aucune image d'armoire complète n'est embarquée.

## Sources (ne pas modifier, ne pas déplacer)

`studio/minijeux/inbox/decoupe/` (fond transparent, halos possibles aux bords) :

| Fichier | Contenu | Pièce à en tirer |
|---|---|---|
| `…00_23_44 (1).png` (971×1619) | carcasse vide : fronton chantourné + fond bois sombre + socle + 2 pieds | `fronton.webp`, `fond-bois.webp` (tuile), `socle.webp` |
| `…00_23_44 (2).png` (2172×724) | planche horizontale seule | `planche.webp` |
| `…00_23_44 (3).png` (724×2172) | montant vertical seul | `montant.webp` (tuile repeat-y) |
| `…00_23_44 (4).png` | porte fermée avec anneau | `porte.webp` |
| `…00_23_45 (5).png` | porte entrouverte en perspective | `porte-ouverte.webp` |
| `…00_23_45 (6).png` (1536×1024) | tiroir seul, encoche en haut | `tiroir.webp` |
| `…00_23_45 (7).png` | spot rond encastré | `spot.webp` |
| `…00_23_46 (8).png` | cône de lumière jaune, dégradé transparent | `lumiere.webp` |
| `…00_25_01.png` | armoire complète ouverte, portes déployées | RÉFÉRENCE VISUELLE seulement, rien à découper |
| `…00_00_53.png` | armoire vide 3×4 sur fond ocre | référence seulement |

`studio/minijeux/inbox/` (racine, 1254×1254, fond transparent avec halos colorés) — les OBJETS à poser dans les casiers :

| Fichier | Objet | Nom de sortie |
|---|---|---|
| `…23_05_04 (1).png` | bébé dino vert mascotte | `obj-dino.webp` |
| `…23_05_04 (2).png` | pile de livres + cartes + puzzle | `obj-livres-jeux.webp` |
| `…23_05_04 (3).png` | dino + puzzle + dé | `obj-puzzle.webp` |
| `…23_05_05 (4).png` | bus jaune + voiture rouge + panneau | `obj-bus.webp` |
| `…23_05_06 (5).png` | peluche tricératops | `obj-peluche-tri.webp` |
| `…23_05_06 (6).png` | œuf tacheté | `obj-oeuf.webp` |
| `…23_05_07 (7).png` | radio vintage | `obj-radio.webp` |
| `…23_05_42 (1).png` | globe terrestre (garder celui-ci, `23_07_10 (4)` est un doublon) | `obj-globe.webp` |
| `…23_05_42 (2).png` | volcan | `obj-volcan.webp` |
| `…23_05_42 (3).png` | météorite | `obj-meteorite.webp` |
| `…23_05_43 (4).png` | cubes ABC + crayons | `obj-lettres.webp` |
| `…23_05_44 (5).png` | jouet 1-2-3 perles | `obj-chiffres.webp` |
| `…23_05_44 (6).png` | drapeaux + fanions | `obj-drapeaux.webp` |
| `…23_05_45 (7).png` | réveil vert | `obj-reveil.webp` |
| `…23_07_10 (1).png` | livres + livre ouvert | `obj-livre-ouvert.webp` |
| `…23_07_10 (2).png` | livres debout + cartes + œufs | `obj-livres-dinos.webp` |
| `…23_07_10 (3).png` | livre vert ouvert + carnet fossile | `obj-carnet.webp` |
| `…23_23_49.png` | peluche stégosaure | `obj-peluche-stego.webp` |

Ignorer `23_07_10 (4)` (doublon globe).

## Livrables

### 1. `site/img/armoire/` — les pièces

Règles de découpe :

- **Trim** systématique des marges transparentes (`Image.getbbox()` sur le canal alpha après seuil ≥ 8).
- **Halos** : les objets GPT ont des franges colorées semi-transparentes. Passer `rembg` (dispo : `python -c "import rembg"`) sur l'objet APRÈS l'avoir aplati sur fond blanc, puis reprendre l'alpha rembg — ou, si rembg dégrade un objet (trous dans les livres, anneau du réveil), garder l'alpha d'origine et seulement **éroder** l'alpha de 2-3 px + seuiller à 0 tout pixel alpha < 40. Choisir par objet, en regardant le résultat (Read de la sortie), pas à l'aveugle.
- **Tailles** (côté long, en px) : objets **320** · fronton **720 de large** · planche **720×~60** · socle **720** · tiroir **360** · porte **240** · porte-ouverte **240** · spot **96** · lumière **160**. Un objet affiché à 100 px sur un P30 Pro (dpr 3) a besoin de 300 px : 320 suffit.
- **Tuiles répétables** (ce qui fait la légèreté) :
  - `fond-bois.webp` : prendre un carré de **128×128** au centre du fond sombre de la carcasse (zone sans planche ni montant), puis le rendre raccordable par **miroir 2×2** (le carré, son flip horizontal, son flip vertical, les deux) → tuile 256×256 parfaitement seamless en `background-repeat`. Vérifier en composant 3×3 tuiles dans une image de test et en la regardant.
  - `montant.webp` : bande de **48 px de large × 64 px de haut** prise au milieu du montant vertical, raccordable en repeat-y par le même miroir vertical (64 → 128 de haut). Doit se répéter verticalement sans couture.
  - `planche.webp` : la planche entière trimée, redimensionnée à 720 de large. Elle sera étirée en CSS `background-size:100% 100%` : vérifier qu'un étirement ×1,5 en largeur reste beau (grain horizontal, c'est le cas).
- **Fronton** : crop de la carcasse du haut de l'arche jusqu'à **juste sous la planche supérieure** (celle qui ferme le fronton). Pas de texte. Le bas du crop doit être une ligne droite horizontale de bois (pour se raccorder au fond).
- **Socle** : crop de la carcasse depuis la planche du bas (celle au-dessus des pieds) jusqu'aux pieds inclus. Le haut du crop = ligne droite de bois.
- **Encodage** : `Image.save(path, 'WEBP', quality=82, method=6)`, alpha conservé. Pas de PNG.
- **Écrire aussi** `site/img/armoire/MANIFEST.json` : `{ "fichier": {"w":…, "h":…, "octets":…, "source": "<nom source>"} }` — permet à HO-MJ-13 et aux tests de connaître les dimensions sans les ouvrir.

### 2. `studio/minijeux/tools/armoire-decoupe.py` — le script rejouable

- Un seul fichier, < 300 lignes, table des découpes en tête (source → sortie → opération → taille), fonctions courtes.
- `python studio/minijeux/tools/armoire-decoupe.py` régénère TOUT le dossier depuis l'inbox. Idempotent.
- `--sheet` : produit en plus `studio/minijeux/docs/handoffs/rapports/captures/HO-MJ-12-planche-contact.png` : toutes les pièces sur damier gris + une composition de test **360×740** assemblée en PIL (fronton + fond tuilé + 3 montants + 4 planches + 6 objets + socle + 2 tiroirs) pour prouver que les pièces se raccordent. Cette image est la preuve du handoff.
- Coordonnées de crop en constantes nommées en tête de fichier (jamais de nombre magique dans le corps).

## Portes de vérification (sortie = preuve dans le rapport)

```
python studio/minijeux/tools/armoire-decoupe.py --sheet
python - <<'EOF'
import os,glob; t=sum(os.path.getsize(f) for f in glob.glob('site/img/armoire/*.webp')); print('total Ko', t//1024); assert t < 350*1024
EOF
```

Puis **ouvrir** (Read) la planche-contact et vérifier à l'œil : zéro halo blanc/coloré autour des objets, tuile bois sans couture visible, fronton et socle à bords droits, planche non déformée.

## Hors périmètre

- `site/index.html`, `site/js/**`, `site/css/**` : c'est HO-MJ-13.
- Ne rien supprimer ni renommer dans `inbox/` (c'est le dépôt de Papa Yann ; le PMO le traite).
- Pas de sprite-sheet CSS pour les objets : un fichier par objet (cache SW, lazy-load possible). Si le total dépasse 350 Ko, baisser `quality` à 75 avant de baisser les tailles.
- Aucune génération d'image nouvelle (pas d'IA, pas de dessin).

## Rapport attendu

`studio/minijeux/docs/handoffs/rapports/HO-MJ-12-rapport.md` : tableau fichier / dimensions / Ko / traitement halo choisi (rembg ou érosion) ; sortie des portes ; problèmes rencontrés (objet dégradé, crop approximatif) ; statut passé à `fait` dans ce brief.
