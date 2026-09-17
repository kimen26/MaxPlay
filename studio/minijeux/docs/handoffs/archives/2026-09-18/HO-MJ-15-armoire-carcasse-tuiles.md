# HO-MJ-15 — L'Armoire v3 : la carcasse en tuiles, fidèle à la maquette

> Statut : pret · Ouvert le 2026-09-17 · Exécutant : 1 sous-agent Sonnet · Orchestrateur : session principale.
> Origine : Papa Yann a rejeté la v2 (HO-MJ-14) : « t'en es très loin, les portes, les hauteurs, le positionnement des étagères, c'est pas fluide ». Une maquette statique a ensuite été itérée avec lui jusqu'à validation de la **carcasse** : [`tools/armoire-compose.py`](../../tools/armoire-compose.py) et ses rendus `rapports/captures/HO-MJ-15-maquette-*.png`. **Ce script est la spec** : mêmes coordonnées, même modèle d'étirement. Le HTML doit rendre, au pixel près, ce que la maquette rend.
> Mots de PY : « l'important c'est le visuel de l'armoire : propre, modulable, modulaire, léger » · « les planches latérales sont les plus au bord, les étagères sont DANS l'armoire, elles ne traversent pas les côtés » · « tiroirs à fleur, on doit voir leurs deux bords » · « recette et ne me redonne pas la main pour rien ».

## Objectif (résultat observable)

`site/index.html` affiche la carcasse de la maquette (ouvrir `HO-MJ-15-maquette-360x740.png`, `-320x568.png`, `-1280x720.png`, `-1280x720-4-casiers.png` AVANT de coder et les garder sous les yeux), construite en HTML/CSS à partir de ~19 tuiles webp (~65 Ko en tout), sans ascenseur, avec les objets/jeux posés dans les cases en **calque au-dessus** de la carcasse. Tout ce qui marchait (profil, porte parents, code TRITRI, œufs, album, deep-link, SW, tests) marche encore.

## 1. Les tuiles — `site/img/armoire/carcasse/` (nouveau dossier)

Source unique : `studio/minijeux/inbox/decoupe/ChatGPT Image 15 sept. 2026, 00_25_01.png` (1024×1536, fond transparent). Passer d'abord `sans_feuille()` (importer depuis `armoire-compose.py`, ne pas recopier). Découpe à faire dans un script **`studio/minijeux/tools/armoire-tuiles.py`** (rejouable, table en tête, < 150 lignes), sortie webp `quality=80, method=6`, **résolution native** (pas de redimensionnement : à 360 px css × dpr 3 on affiche ~1050 px pour 1024 de source). Unités = pixels de la référence.

| Fichier | Crop (x0,y0,x1,y1) | Rôle CSS |
|---|---|---|
| `fronton.webp` | 200,0,830,165 | corps du fronton, `background-size:100% 100%` |
| `fronton-g.webp` / `fronton-d.webp` | 133,0,200,165 / 830,0,890,165 | épaules de l'arche, colonnes panneau (largeur 67 / 60 u, débordent sur le corps) |
| `vitrine-haut.webp` | 200,165,830,392 | fond d'étagère avec les 2 spots, souple |
| `planche.webp` | 200,392,830,418 | planche de la vitrine, fixe |
| `vitrine-bas.webp` | 200,418,830,653 | fond d'étagère sans spot, souple |
| `traverse-haut.webp` | 185,653,860,685 | traverse (entre panneaux), fixe |
| `casier.webp` | 185,685,362,880 | un casier, souple (répété n fois) |
| `separateur.webp` | 362,685,398,880 | séparateur entre casiers, largeur fixe 36 u, hauteur souple |
| `planche-casiers.webp` | 185,880,860,905 | planche entre 2 rangées de casiers |
| `traverse-bas.webp` | 185,905,860,935 | traverse, fixe |
| `bas-etagere.webp` | 200,935,830,1122 | étagère basse, souple |
| `tiroirs.webp` | 185,1122,860,1310 | bloc 2 tiroirs, **entre panneaux** (à fleur), fixe |
| `pieds.webp` | 200,1310,830,1385 | base, fixe |
| `pieds-g.webp` / `pieds-d.webp` | 133,1310,200,1385 / 830,1310,890,1385 | pieds, colonnes panneau |
| `panneau.webp` | 136,720,152,860 puis **miroir vertical accolé** (16×280) | panneau latéral, `repeat-y`, affiché 22 u de large |
| `porte-haut.webp` | 36,110,175,668 | porte haute gauche (droite = `scaleX(-1)`) |
| `porte-bas.webp` | 36,938,175,1332 | porte basse gauche (droite = miroir) |

Écrire `carcasse/MANIFEST.json` (w, h, octets, crop). Total attendu ≈ 63 Ko ; porte de vérif : < 100 Ko.

## 2. Le modèle CSS — une seule variable `--u`

`armoire.js` calcule à chaque `resize` le **pixel par unité** exactement comme `compose()` :

```
natW = 2*139 + 2*22 + 630 = 952 u          (porte, panneau, corps, panneau, porte)
fixed_u = 165+26+32+30+188+75 (+25 par planche-casiers)   soft_u = 227+235+187 + 195×rangées
u = min( (largeurÉcran − 2×2 %) / 952 , hauteurDispo / (fixed_u + 0.85×soft_u) )
```
puis choisit le nombre de rangées de casiers (1 → 3) : on en **ajoute une** tant que la hauteur restante ≥ (195+25)·u, et le facteur d'étirement des bandes souples est plafonné à **1,45** ; s'il reste de la place, l'armoire est plus courte et le mur se voit (jamais l'inverse). Il pose `--u`, `--rangees`, `--casiers` (3 sous 600 px, 4 de 600 à 1199, 5 au-delà — la maquette « 4 casiers » montre l'effet) sur `#armoire`.

Grille : `grid-template-columns: calc(139*var(--u)) calc(22*var(--u)) 1fr calc(22*var(--u)) calc(139*var(--u))`. Rangées fixes en `calc(N*var(--u))`, rangées souples en `Nfr` (227fr, 235fr, 195fr par rangée de casiers, 187fr) avec `max-height: calc(N*1.45*var(--u))`. Les panneaux = 2 éléments `grid-row: 1 / -1` sur les colonnes 2 et 4, `background: url(panneau.webp) repeat-y / 100% auto`. Les épaules du fronton et des pieds recouvrent la colonne panneau + débordent (`grid-column: 2 / 3` avec `width: calc(67*var(--u))`, `z-index` au-dessus du corps). Tiroirs et traverses s'étendent sur `grid-column: 3 / 4` avec `margin: 0 calc(-… )` = **non** : elles vont de panneau à panneau, c'est-à-dire `grid-column: 3 / 4` tout court puisque la colonne 3 EST l'espace entre panneaux (le corps 630 u et l'inter-panneaux 675 u de la référence sont tous deux étirés à la même largeur, comme dans la maquette).

Portes : 4 `<img>` absolus, `pointer-events:none`, `porte-haut` de `top = fronton×(110/165)` jusqu'au bas de `traverse-haut`, `porte-bas` du haut de `bas-etagere` jusqu'à `pieds×(22/75)` ; largeur `calc(139*var(--u))`, `height` étirée entre ces deux repères (comme la maquette : la porte s'allonge avec sa zone). Droite = `transform: scaleX(-1)`.

La pièce : `body` = mur dégradé chaud (celui de la maquette : 226/184/126 en haut → 136/94/56 en bas), tapis = ellipse floue sous les pieds, armoire centrée, `padding` safe-area (`env()`), marge 2 %.

## 3. Le calque objets (au-dessus, jamais dans la carcasse)

Les cases souples sont des conteneurs vides à la même position que les boîtes `boxes` de la maquette : `vitrine-haut` (2 places), `vitrine-bas` (2 places), chaque `casier` (1 place), `bas-etagere` (3 places). `armoire.js` garde sa table `SLOTS` et son tirage (v2), mais **pose** : Dinos + Monde dans vitrine-haut, Œufs (`#hdr-oeufs`, badge) + Album (`#hdr-padidi`) dans vitrine-bas, puis les jeux dans les casiers et l'étagère basse, dans l'ordre, tronqués au nombre de places. Chaque place = `<button>` ≥ 80×80 css px, image posée sur la planche (`align-items:flex-end`, bas de l'objet à 20 % de la hauteur de la case comme dans `pose()`), étiquette d'un mot dessous en Fredoka One blanc ombré. Porte fermée (`porte.webp` v1) sur Dinos tant que TRITRI n'est pas saisi, proportions conservées.

Identité : **le prénom seul** gravé dans l'arche (position de la maquette : centre, à 8,5 % de la largeur sous le haut). `#profil-avatar` : le vrai avatar (Avatar.file), **derrière l'arche** à gauche, mordu à ~15 %, ≥ 56 px, tap = mini-menu inchangé. `#stars-total` : **plus sur l'arche** (PY : « vire le *19 ») → il vit dans le mini-menu de l'avatar (`#avatar-menu`, première ligne « ⭐ N »), toujours rempli par `paintProfilMeta()` pour que `index.spec` passe.

## 4. Fichiers autorisés

`site/index.html`, `site/js/armoire.js`, `site/css/armoire.css`, `site/sw.js` (+ `node studio/minijeux/scripts/gen-sw-version.mjs` ; precache = les 19 tuiles carcasse, retirer fronton/fond-bois/montant/planche/socle/tiroir/spot/porte-ouverte de la v1 s'ils ne servent plus — `porte.webp` reste), `site/img/armoire/carcasse/**`, `studio/minijeux/tools/armoire-tuiles.py`, `studio/minijeux/tests/armoire.spec.mjs`, `studio/minijeux/tests/index.spec.mjs` (sélecteurs seulement), `rapports/HO-MJ-15-rapport.md`, `rapports/captures/HO-MJ-15-*.png` (préfixe `HO-MJ-15-rendu-` pour ne pas écraser les maquettes). Rien d'autre. Les anciennes tuiles v1 de `site/img/armoire/*.webp` ne sont **pas supprimées** (objets réutilisés ; le ménage se fera après recette).

## 5. Portes de vérification

1. `python studio/minijeux/tools/armoire-tuiles.py` puis poids `carcasse/` < 100 Ko.
2. `node studio/minijeux/tests/armoire.spec.mjs` sur 360×740, 360×640, 320×568, 390×844, 412×915, 800×600, 1024×768, 1280×720 : pas d'ascenseur ; **fidélité** : pour 360×740, 320×568 et 1280×720, la capture est comparée à la maquette du même nom — le spec calcule sur les deux images (PNG via `sharp` absent → utiliser un petit script Python `tools/armoire-diff.py` appelé par le spec, PIL dispo) la position des **bords des panneaux, des traverses et des planches** (profils de luminance comme dans la maquette) et exige un écart ≤ 3 px ; places d'objets ≥ 80×80 ; portes entièrement dans l'écran ; images chargées.
3. `npm run mj:test index`, `node studio/minijeux/tests/mur-nid.spec.mjs`, `npm run check` verts.
4. Poids premier affichage 360×740 ≤ 200 Ko (carcasse + objets visibles).
5. **Ouvrir chaque capture à côté de sa maquette** (Read) : panneaux d'un seul tenant sans motif répété, portes entières (bas non coupé, pieds non dédoublés), tiroirs à fleur avec leurs deux bords visibles, aucune étagère qui dépasse des panneaux, feuille absente, prénom seul dans l'arche, objets posés sur les planches. Une capture pas comparée = handoff pas fini. Itérer jusqu'à ce que ce soit vrai.

## Hors périmètre

Globe/volcan animés, chaîne 2★, tiroirs cliquables, contenu des tiroirs, `mur.js`, `mur.css`, `nid-ui.js`, `catalog.js`, `mj-*.html`.

## Rapport attendu

`rapports/HO-MJ-15-rapport.md` : portes, tableau viewport → u / rangées / poids, écarts maquette↔rendu mesurés, captures, écarts au brief, questions. Statut `fait` ici. Pas de commit.
