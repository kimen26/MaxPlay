# HO-MJ-12 -- Rapport : découpe des assets GPT de l'armoire

> Statut : **fait** · 2026-09-15 · Exécutant : sous-agent Sonnet.

## Tableau des pièces produites

Toutes dans `site/img/armoire/`, WEBP alpha conservé, `quality=35` (voir § Portes de vérification pour la raison de ce réglage). Traitement halo : `rembg` = segmentation IA sur fond blanc puis reprise de l'alpha ; `érosion` = alpha d'origine, érodée 2px + seuillée <40→0 ; `n/a` = pas de nettoyage de halo pertinent (crop de carcasse ou tuile déjà opaque).

| Fichier | Dimensions | Ko | Source | Traitement halo |
|---|---|---|---|---|
| `fronton.webp` | 720×138 | 7,4 | carcasse `(1)` | érosion (léger, sur crop) |
| `fond-bois.webp` | 256×256 | 1,7 | carcasse `(1)` | n/a (zone opaque, pas d'alpha à nettoyer) |
| `socle.webp` | 720×202 | 7,6 | carcasse `(1)` | érosion (léger, sur crop) |
| `montant.webp` | 48×128 | 0,4 | `(3)` montant | n/a (bande centrale, pas de bord alpha) |
| `planche.webp` | 720×54 | 6,2 | `(2)` planche | érosion (léger, sur crop) |
| `porte.webp` | 175×240 | 3,1 | `(4)` porte | érosion |
| `porte-ouverte.webp` | 105×240 | 3,2 | `(5)` porte entrouverte | érosion |
| `tiroir.webp` | 360×154 | 5,8 | `(6)` tiroir | érosion |
| `spot.webp` | 96×44 | 1,7 | `(7)` spot | érosion |
| `lumiere.webp` | 102×160 | 5,1 | `(8)` cône lumière | érosion |
| `obj-dino.webp` | 320×306 | 13,6 | `23_05_04 (1)` | rembg |
| `obj-livres-jeux.webp` | 320×284 | 19,9 | `23_05_04 (2)` | rembg |
| `obj-puzzle.webp` | 320×275 | 17,4 | `23_05_04 (3)` | rembg |
| `obj-bus.webp` | 320×216 | 16,3 | `23_05_05 (4)` | rembg |
| `obj-peluche-tri.webp` | 298×320 | 14,3 | `23_05_06 (5)` | rembg |
| `obj-oeuf.webp` | 320×294 | 14,7 | `23_05_06 (6)` | rembg |
| `obj-radio.webp` | 320×294 | 15,1 | `23_05_07 (7)` | rembg |
| `obj-globe.webp` | 230×320 | 15,3 | `23_05_42 (1)` | rembg |
| `obj-volcan.webp` | 313×320 | 14,1 | `23_05_42 (2)` | rembg |
| `obj-meteorite.webp` | 320×299 | 16,4 | `23_05_42 (3)` | rembg |
| `obj-lettres.webp` | 320×251 | 14,3 | `23_05_43 (4)` | rembg |
| `obj-chiffres.webp` | 320×258 | 17,0 | `23_05_44 (5)` | rembg |
| `obj-drapeaux.webp` | 320×289 | 18,8 | `23_05_44 (6)` | **érosion** (rembg dégradait, voir § Problèmes) |
| `obj-reveil.webp` | 269×320 | 16,4 | `23_05_45 (7)` | **érosion** (rembg dégradait, voir § Problèmes) |
| `obj-livre-ouvert.webp` | 320×312 | 18,1 | `23_07_10 (1)` | rembg |
| `obj-livres-dinos.webp` | 320×295 | 19,9 | `23_07_10 (2)` | rembg |
| `obj-carnet.webp` | 320×308 | 18,9 | `23_07_10 (3)` | rembg |
| `obj-peluche-stego.webp` | 320×276 | 21,0 | `23_23_49` | rembg |

28 fichiers + `MANIFEST.json`. `23_07_10 (4)` (doublon du globe) ignoré comme prescrit.

## Sortie des portes de vérification

```
$ python studio/minijeux/tools/armoire-decoupe.py --sheet
28 pieces ecrites dans .../site/img/armoire
planche-contact : .../studio/minijeux/docs/handoffs/rapports/captures/HO-MJ-12-planche-contact.png

$ python - <<'EOF'
import os,glob; t=sum(os.path.getsize(f) for f in glob.glob('site/img/armoire/*.webp')); print('total Ko', t//1024); assert t < 350*1024
EOF
total Ko 343
(pas d'AssertionError -> sous la cible de 350 Ko)
```

Planche-contact ouverte et jugée à l'œil (voir `captures/HO-MJ-12-planche-contact.png`) : zéro halo blanc/coloré résiduel autour des objets, tuile `fond-bois` sans couture visible en composition 3×3, `montant` sans couture visible en répétition verticale ×4, `fronton` et `socle` à bords droits (coupe nette juste sous la planche / juste au-dessus du socle, feet inclus), `planche` non déformée. Composition de test 360×740 (bas de la planche-contact) : fronton + fond tuilé + 3 montants + 4 planches + 6 objets + socle + 2 tiroirs s'assemblent de façon cohérente.

## Problèmes rencontrés

1. **rembg sensible au cadrage, pas seulement au contenu** : un premier passage trimait l'alpha *avant* d'appeler rembg, ce qui a fait disparaître les 3/4 de `obj-drapeaux` (rembg a classé les drapeaux + la banderole comme fond sur l'image recadrée, alors que sur l'image pleine 1254×1254 le même modèle les gardait). Correctif appliqué dans le script : rembg tourne toujours sur le canevas complet, le trim vient après.
2. **rembg dégrade deux objets même sur canevas complet**, confirmant l'anticipation du brief :
   - `obj-reveil.webp` : rembg laissait un résidu semi-opaque sombre à la place du pont/anse entre les deux cloches (l'espace négatif fin n'était pas reconnu proprement).
   - `obj-drapeaux.webp` : rembg laissait une tache grise/noire diffuse près de la banderole et du drapeau Terre (flou de mouvement du rendu mal segmenté).
   Pour ces deux fichiers, méthode `erode` (alpha d'origine, érosion 2px, seuil <40→0) au lieu de `rembg`, conformément à la clause du brief "si rembg dégrade un objet... garder l'alpha d'origine et seulement éroder".
3. **Poids total** : à `quality=82` (défaut prévu au départ) le dossier pesait 516 Ko, largement au-dessus des 350 Ko cible. `quality=75` -> 444 Ko, encore au-dessus. Descendu progressivement (60 -> 405 Ko, 45 -> 370 Ko, 40 -> 356 Ko) jusqu'à `quality=35` -> **343,7 Ko**, sous la cible, sans perte visible à l'œil sur les objets les plus texturés (`obj-peluche-stego`, `obj-carnet` vérifiés). Le brief autorisait explicitement à baisser `quality` avant de toucher aux tailles ; aucune taille n'a donc été réduite.
4. **Coordonnées de crop de la carcasse** trouvées par profil de luminance (numpy, colonnes centrales x=[w/2-50, w/2+50] sur `ChatGPT...00_23_44 (1).png`, 971×1619) plutôt que devinées : transition nette planche/mur à y=190 (fronton), transition nette mur/socle à y=1340. Le carré `fond-bois` (128×128) est pris à x=[421,549] y=[636,764], zone plate loin des montants (x<150 et x>840 à y=700) et loin des gradients haut/bas.
5. **Limite de 300 lignes** : un premier jet (découpe + `--sheet`) atteignait 446 lignes. Refactor en table `FURNITURE` (source, sortie, pre-crop, mode resize, taille) pour fusionner 5 fonctions quasi identiques en une seule, fonctions helper condensées, commentaires resserrés -> 299 lignes, mêmes sorties (343,7 Ko, 28 fichiers, planche-contact identique).

## Fichiers créés

- `c:\ProjetsPerso\Claude_Projects\MaxPlay\site\img\armoire\*.webp` (27 pièces, liste ci-dessus) + `site\img\armoire\MANIFEST.json`
- `c:\ProjetsPerso\Claude_Projects\MaxPlay\studio\minijeux\tools\armoire-decoupe.py`
- `c:\ProjetsPerso\Claude_Projects\MaxPlay\studio\minijeux\docs\handoffs\rapports\captures\HO-MJ-12-planche-contact.png`
- `c:\ProjetsPerso\Claude_Projects\MaxPlay\studio\minijeux\docs\handoffs\rapports\HO-MJ-12-rapport.md` (ce fichier)
- Ligne de statut du brief `HO-MJ-12-armoire-assets.md` passée à `fait`.

Rien touché dans `inbox/`.
