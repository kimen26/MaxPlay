# HO-MJ-20 — L'Armoire v7 : meuble VIDE recomposé depuis le kit de pièces GPT

> **Passe 4, même jour (v8, D-030)** : la v7 recomposée depuis les pièces GPT a été rejetée par Papa Yann (six défauts, tous fondés). Le kit est désormais DÉCOUPÉ dans `ref-ouverte.png` par `tools/armoire-v8.py` (carcasse inpaintée, planches, montants, tiroir, vantaux ouverts ; vantaux fermés dans `ref-fermee.png` avec charnières), boîtes générées dans `js/gen/armoire-kit.js`. Les § 2-4 ci-dessous décrivent la v7 et restent pour l'histoire ; l'état vrai est le rapport § 11.
> Statut : **livré 2026-09-19** en trois itérations (Fable rédige et juge les planches de comparaison, Sonnet exécute), spec vert sur 6 viewports. Recette Papa Yann sur `site/dev-armoire.html` à faire. Ce qui a changé en cours de route par rapport aux § 3-4 ci-dessous : la géométrie ne vient plus de `v6/repere.json` mais de l'OUVERTURE AVANT de la carcasse du kit, en fractions (voir rapport § 10 et L-144) ; l'épaisseur de planche est une donnée de config (3 %), pas le ratio du sprite ; les tiroirs fermés utilisent `tiroir-face.webp` (façade seule).
> Demande Papa Yann : « fabrique cette armoire pour le petit jeu de Max, déjà juste
> vide, ouvert / fermé, logique et modulable ». Le kit de 8 images est celui que
> ChatGPT a livré le 17/09 (voir § 2). **`site/index.html` reste sur la v6 : on ne
> touche pas à l'accueil en production dans ce brief.** L'intégration des objets
> viendra dans HO-MJ-22.
> Fichiers possédés : `site/img/armoire/v7/**`, `site/css/armoire-meuble.css`,
> `site/js/armoire-meuble.js`, `site/dev-armoire.html`,
> `studio/minijeux/tools/armoire-kit.py`, `tools/armoire-meuble-shot.mjs`,
> `studio/minijeux/tests/armoire-meuble.spec.mjs`, `docs/refs/armoire/kit/**`.

## 1. Ce qui ne change pas (D-027, D-028, L-136 à L-141)

- **Repère de design fixe 911 × 1480**, tout en pourcentage, mise à l'échelle d'un
  bloc par `--cab-w`. Zéro handler de resize. Zéro contrainte en pixels sur la
  géométrie visuelle (L-140).
- **Toute la lumière en CSS** : halo des spots = `radial-gradient` (l'image halo du
  kit est gardée en référence, pas déployée).
- **Les portes de droite = miroir des portes de gauche.** Le wrapper tourne / se
  déplace, le sprite miroité vit dedans (jamais l'inverse).
- **Les portes arrivent fermées.** Un tap sur un vantail ouvre ou referme sa zone.
- Les proportions ne bougent pas d'un viewport à l'autre : le spec le mesure.

## 2. Ce qui change : un KIT de pièces, plus un shell monolithique

D-027 corollaire (1) disait « trois sprites, pas vingt-cinq ». Papa Yann a fait
produire par ChatGPT un vrai kit cohérent (même bois, même lumière, une pièce
par NATURE — exactement ce que prescrit L-137), et veut l'armoire recomposée
avec. On reste à **une pièce par nature**, réutilisée, jamais une bande par
position. Décision gravée en D-029.

Sources (Downloads du 17/09, à copier dans `studio/minijeux/docs/refs/armoire/kit/`
sous ces noms — ce sont des PNG RGBA déjà détourés, fond transparent) :

| N° Downloads `ChatGPT Image 17 sept. 2026, 23_21_4x (N).png` | Nom cible | Taille | Rôle |
|---|---|---|---|
| (3) | `carcasse-vide.png` | 971 × 1619 | arche + côtés + fond + socle + pieds, **sans planche ni porte** |
| (4) | `planche.png` | 2172 × 724 | UNE planche horizontale, réutilisée 5 fois |
| (5) | `montant.png` | 724 × 2172 | UN montant vertical, réutilisé 2 fois (niche) |
| (6) | `porte-fermee.png` | 1024 × 1536 | vantail de face, charnières À GAUCHE, anneau à droite |
| (7) | `porte-ouverte.png` | 1024 × 1536 | vantail entrouvert en perspective, charnières à gauche, la feuille part vers la droite |
| (8) | `tiroir.png` | 1448 × 1086 | tiroir avec anneau |
| (9) | `spot.png` | 1254 × 1254 | luminaire (disque doré) |
| (10) | `halo.png` | 1024 × 1536 | halo — **référence seulement**, non déployé (CSS) |

(1) et (2) sont déjà `ref-ouverte.png` / `ref-fermee.png` (mêmes octets). Elles
restent la **vérité géométrique** : c'est à elles qu'on compare le rendu.

## 3. Lot A — `tools/armoire-kit.py` → `site/img/armoire/v7/`

Pour chaque pièce (sauf halo) : rogner sur la boîte alpha (seuil α > 8), réduire
en LANCZOS à **≤ 2× sa taille max affichée** (largeur max à l'écran = 1280 px de
viewport → l'armoire fait au plus 911 px de large ; donc carcasse ≤ 1000 px de
large, planche ≤ 1400, montant ≤ 120 de large, porte ≤ 600, tiroir ≤ 600, spot
≤ 160), exporter en WebP q=90 avec alpha. Écrire `site/img/armoire/v7/kit.json`
= taille de chaque sprite + boîte alpha d'origine. Budget : **≤ 250 Ko** pour le
dossier v7.

Mesurer dans `carcasse-vide.png` la boîte du CORPS (bord gauche/droit du meuble
hors arche, sommet de l'arche, dessous des pieds) et l'écrire dans `kit.json` :
c'est ce qui permet de la poser dans le repère 911 × 1480 exactement sur la boîte
`corps` de `v6/repere.json` (left 11,306 % · right 88,364 % · top 0,811 % ·
bottom 99,054 %), donc **tous les pourcentages de `repere.json` restent valables**
(portes, niche, planches). Si la carcasse GPT vide n'a pas les mêmes proportions
que `ref-ouverte`, on l'étire pour que sa boîte corps coïncide (comme l'affine
de `armoire-sprites.py`) — et on note l'écart dans le rapport.

## 4. Lot B — le composant `ArmoireMeuble`

`site/js/armoire-meuble.js` expose `window.ArmoireMeuble = { build(root, config), setZone(root, zone, open), toggle(root, zone) }`.
Il ne calcule aucune dimension : il pose des `<div>`/`<button>` avec `--cx/--cy/--cw/--ch` en % du repère, comme `armoire.js` v6. **La configuration est une donnée** (objet `DEFAUT` exporté, surchargeable) :

```js
{
  planches:  [ { y: 23.3, x0: 12.5, x1: 87.2 }, { y: 38.3, ... }, { y: 50.1, ... }, { y: 65.3, ... }, { y: 79.3, ... } ],
  montants:  [ { x: 39.2, y0: 38.97, y1: 51.69 }, { x: 60.4, ... } ],       // niche
  tiroirs:   [ { cx: 33.6, cy: 86.7, cw: 29.0 }, { cx: 65.8, cy: 86.7, cw: 29.0 } ],
  spots:     [ { x: 31.0, y: 10.5 }, { x: 63.5, y: 10.5 } ],
  portes:    { haut: { top: 9.184, bottom: 37.308 }, bas: { top: 54.694, bottom: 93.046 } },
  porteX:    { gauche: 18.558, mid: 49.835, droite: 81.113 }
}
```

Les chiffres ci-dessus sont ceux de `v6/repere.json` et `armoire.js` v6 (ROWS,
TIROIRS, PORTES) — **à re-mesurer sur `ref-ouverte.png` pour les montants de
niche et les x0/x1 des planches**, pas à recopier de mémoire.

Règles d'assemblage (brief designer + L-137) :
- ordre z : carcasse (10) < planches (20) < montants (25) < tiroirs (30) < spots + halo CSS (35) < portes (60). Les futures cases/objets prendront 40.
- les planches **chevauchent** les côtés de 0,5 % du repère de chaque côté (la pièce du dessus recouvre la jonction) ; les montants chevauchent la planche du dessus et celle du dessous de 0,5 %.
- une seule épaisseur de planche partout (`--ch` identique pour les 5), déduite du ratio du sprite : `ch = cw × (h_sprite / w_sprite)`.
- ombres portées légères en CSS (`drop-shadow` en unités de `--cab-w`) sous chaque planche et chaque tiroir, jamais dans les images.
- tiroirs : deux, posés SOUS la planche 5, à fleur du socle, derrière les portes basses.
- spots : deux, en haut de la zone haute, plus le halo CSS de la v6 (recopier `.spot::after`).

### Les portes : deux sprites, une transition

- **Fermée** : `porte-fermee.webp`, un vantail = moitié de zone (`porteX`), hauteur = `top→bottom` de la zone, en `background-size: 100% 100%`. Droite = même sprite dans un wrapper miroir.
- **Ouverte** : `porte-ouverte.webp`. Ce sprite a la charnière À GAUCHE et la feuille qui part vers la droite. Sur le meuble, le vantail gauche pivote sur le montant EXTÉRIEUR gauche et sa feuille part vers la GAUCHE : donc **vantail gauche ouvert = `porte-ouverte` en miroir, vantail droit ouvert = `porte-ouverte` tel quel**. Le sprite ouvert est posé de sorte que son bord charnière tombe sur le montant extérieur (x = 11,306 % à gauche, 88,364 % à droite) et que sa hauteur au niveau de la charnière = la hauteur de la zone. Vérifier à l'œil contre `ref-ouverte.png` : c'est exactement la pose des vantaux de la référence.
- **Transition** (620 ms, `cubic-bezier(.22,.8,.25,1)`) : le vantail fermé tourne `rotateY` vers l'extérieur jusqu'à −70° (perspective en unités de `--cab-w`, charnière `transform-origin` reportée sur le montant extérieur comme en v6 : `-23.19%`) en fondant à 0 sur la seconde moitié ; le sprite ouvert apparaît en fondu (0 → 1) sur la même seconde moitié, en `transform: scaleX(.6)` depuis sa charnière vers `scaleX(1)`. `prefers-reduced-motion` : 1 ms.
- Au repos, chaque état est **une seule image nette** (aucun fondu résiduel, aucune double porte).
- Les 4 vantaux sont des `<button>` (48 × 48 min via calque `.tap` comme en v6, jamais de `min-width` sur la géométrie), `aria-expanded`, libellés « Ouvrir / Fermer le haut (bas) de l'armoire ».

### `site/dev-armoire.html`

Page de dev (comme `dev-dinos.html`), **pas dans le menu, pas dans `sw.js`** : la
pièce (fond dégradé + tapis de `armoire.css` v6, à recopier, pas à importer — la
v6 reste intouchée), le meuble vide, et une barre de 4 boutons texte en bas de
page (Fermer tout · Haut · Bas · Tout ouvrir) plus `?etat=ferme|haut|bas|ouvert`
pour les captures. Aucun objet, aucun prénom, aucun avatar : **juste le meuble**.

## 5. Lot C — recette

`tools/armoire-meuble-shot.mjs` : pour 320×568, 360×640, 360×740, 412×915, 800×600,
1280×720 → capture `ferme` et `ouvert` dans
`docs/handoffs/rapports/captures/HO-MJ-20-<tag>-<etat>.png`. Et **deux planches
de comparaison** en 360×740 : `HO-MJ-20-cmp-ferme.png` = [ref-fermee redimensionnée
à la même hauteur | capture fermée] côte à côte, idem `HO-MJ-20-cmp-ouvert.png`.
C'est ce que Fable regarde pour juger.

`tests/armoire-meuble.spec.mjs` (autonome, `node …`) par viewport : pas
d'ascenseur ; rien de rogné ; toutes les images (`<img>` ET fonds CSS rechargés,
L-139) ; 5 planches de même hauteur (mesurée, écart < 0,5 px) ; 2 montants ; 2
tiroirs ; 2 spots ; 4 vantaux ; arrive fermé ; `?etat=ouvert` → les 4 sprites
ouverts visibles et les 4 fermés à opacité 0 ; toggle ouvre puis referme ;
empreinte des proportions (toutes les pièces) identique entre 320 et 1280 ;
poids images ≤ 250 Ko ; zéro erreur JS.

## 6. Livrable attendu de Sonnet

1. Fichiers du § « possédés », plus la copie des 8 PNG dans `docs/refs/armoire/kit/`.
2. `rapports/HO-MJ-20-rapport.md` : mesures faites (boîte corps de la carcasse
   vide, écart d'échelle vs ref-ouverte, positions re-mesurées des montants), poids
   v7, sortie du spec, chemins des captures et des planches de comparaison, et
   **ce qui ne ressemble pas encore à la référence** (dire ce qu'on voit, pas
   « ça devrait aller »).
3. Rien dans `index.html`, `armoire.css`, `armoire.js`, `sw.js`.
4. Pas de commit : Fable valide d'abord les captures.

## 7. HO-MJ-22 (suite, non ouvert) — intégrer les objets

Une fois v7 validée par Papa Yann : `armoire.js` v6 utilise `ArmoireMeuble.build`
à la place de `shell.webp`, garde ses 15 cases + 2 tiroirs + prénom + avatar,
`sw.js` passe de `v6/` à `v7/`, `armoire.spec.mjs` repasse vert, `v6/` supprimé.
