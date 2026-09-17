# HO-MJ-19 — L'Armoire v6 : un repère de design fixe, mis à l'échelle d'un bloc

> Statut : **livré 2026-09-18** (deux passes), recette Papa Yann à faire sur le
> P30 Pro. Remplace HO-MJ-15 (v3, recettée en vingt points), HO-MJ-17 (v4,
> prototype abandonné) et HO-MJ-18 (v5, jamais commitée, cassée).
> Fichiers possédés : `site/index.html`, `site/css/armoire.css`,
> `site/js/armoire.js`, `site/js/gen/armoire-objets.js`, `site/sw.js`,
> `site/img/armoire/**`, `studio/minijeux/tools/armoire-sprites.py`,
> `armoire-objets.py`, `armoire-shot.mjs`, `studio/minijeux/tests/armoire.spec.mjs`,
> `index.spec.mjs`.

## 1. Pourquoi une v6 alors que la v3 passait tous ses tests

La v3 était fidèle à sa maquette à 3 px près et verte sur huit viewports. Elle
a quand même été rejetée, parce que les tests mesuraient la bonne chose au
mauvais endroit : des positions, pas une matière ni une cohérence.

La cause racine, identifiée par le designer, n'est pas la découpe des images.
C'est l'architecture responsive :

> Il ne faut pas rendre chaque morceau responsive indépendamment. L'armoire est
> construite dans un repère fixe de design. Tous les sprites sont positionnés
> en `%` dans ce repère. Ensuite on redimensionne l'armoire entière
> uniformément. On ne modifie jamais indépendamment la hauteur d'une porte,
> l'épaisseur d'une étagère ou la largeur d'un montant suivant l'écran.

Les v2 à v5 faisaient exactement l'inverse : `armoire.js` recalculait à chaque
resize un pixel-par-unité `--u`, un nombre de rangées variable, un ratio
d'étirement « souple » par bande, et posait la hauteur de chaque planche en
style inline. D'où des planches d'épaisseurs différentes selon l'écran, des
raccords qui ne tombaient plus juste, et un meuble qui n'avait pas les mêmes
proportions sur deux téléphones.

## 2. Le repère

L'armoire vit dans un cadre de **911 × 1480** — le cadrage de la référence
`docs/refs/armoire/ref-ouverte.png`, marges comprises pour que les vantaux
ouverts ne sortent jamais de la scène. Tout y est en pourcentage. La mise à
l'échelle est une seule ligne de CSS, sans JavaScript :

```css
--cab-w: min(100vw - safe-x, (100svh - safe-y - 18px) * 0.61554);
.armoire { width: var(--cab-w); aspect-ratio: 911 / 1480; }
```

La largeur pilote sur écran étroit, la hauteur sur écran bas. `svh` plutôt que
`dvh` : la scène ne saute pas quand la barre d'URL se rétracte. Les tailles qui
ne peuvent pas être en pourcentage (police, objets, ombres) sont exprimées en
fraction de `--cab-w`, donc elles suivent la même échelle.

**Il n'y a plus aucun handler de resize dans `armoire.js`.**

Corollaire appris à la dure (L-140) : dans cette scène, **aucune contrainte en
pixels n'a le droit de toucher la géométrie visuelle**. Le confort tactile passe
par un calque `.tap` dédié, pas par un `min-width` sur les cases.

## 3. Les sprites : trois pour le meuble

`tools/armoire-sprites.py` les découpe dans les deux références et écrit le
repère mesuré dans `site/img/armoire/v6/repere.json`.

| Sprite | Contenu | Poids |
|---|---|---|
| `shell.webp` | arche, côtés, fond, toutes les planches, montants, tiroirs, socle, pieds, spots | 113 Ko |
| `porte-haut.webp` | un vantail haut, de face | 12 Ko |
| `porte-bas.webp` | un vantail bas, de face | 16 Ko |

Le shell sort de `ref-ouverte.png` : les quatre vantaux ouverts sont effacés et
les montants gauche et droit reconstruits en recopiant **une seule ligne** de
montant prise au milieu de la niche (recopier un pavé réimprime les arêtes des
planches tous les N pixels — bourrelets façon bambou constatés en passe 1).

Les vantaux sortent de `ref-fermee.png`, remis à l'échelle de `ref-ouverte` par
la transformation affine qui fait coïncider les deux boîtes de corps
(sx = 0,9860, sy = 0,9460 — les deux rendus GPT n'ont pas exactement les mêmes
proportions). Les portes de droite sont le même sprite en miroir.

**Le halo des spots n'est plus une image** : c'est un `radial-gradient` CSS,
donc il suit la taille au lieu d'avoir des bords durs.

### Les objets des cases

`tools/armoire-objets.py` rogne chaque `obj-*.webp` sur sa boîte alpha, puis
mesure la surface réellement peinte et écrit un facteur de taille par objet dans
`site/js/gen/armoire-objets.js`. Le CSS pose chaque objet dans une case **carrée**
en `object-fit: contain` — son plus grand côté fait donc toujours la même taille
— et le facteur corrige ce qui reste : un objet ajouré paraît maigre à côté d'un
objet trapu. `obj-drapeaux` monte à 1,205 (47 % de remplissage),
`obj-livres-dinos` descend à 0,885 (85 %). Aucun chiffre n'est choisi à la main.

## 4. Les portes

Une rotation 3D CSS, pas quinze PNG d'angles. Deux réglages, tous deux mesurés :

```css
.porte-g { transform-origin: -23.19% center; }   /* charnière sur le montant EXTÉRIEUR */
.armoire.ouvert-haut .porte-haut.porte-g {
  transform: perspective(calc(var(--cab-w) * 3.6)) rotateY(-80deg);
}
```

**L'angle reste sous 90°** : au-delà, un sprite plat montre son verso (L-141).
La passe 1 avait pris 116° parce que `|cos θ| = 0,435` — mesuré sur la référence
— admet aussi bien 64° que 116°.

**La charnière est reportée sur le montant extérieur** du meuble, à 23,19 % de la
largeur du vantail au-delà de son bord : `(18,558 − 11,306) / 31,277`. Sans ce
report, un vantail ouvert à 80° retombe sur la colonne de bord et masque un jeu
sur trois. C'est d'ailleurs ainsi qu'est monté le meuble de la référence. Le
spec vérifie **par la mesure** qu'aucun vantail ouvert ne recouvre un objet :
l'angle et la charnière se compensent, on ne devine pas le résultat.

La face du vantail ouvert est assombrie (`brightness(.8)`) : vue presque de
chant, sans cela elle reste aussi claire qu'à plat et se lit comme un montant de
plus.

Le wrapper tourne, le sprite miroité vit dedans. L'inverse (tourner un sprite
déjà en `scaleX(-1)`) inverse aussi le sens de la rotation : c'est ce qui
donnait des charnières du mauvais côté.

Les portes sont **fermées à l'arrivée et le restent** : c'est l'enfant qui
ouvre, un tap sur un vantail ouvre ou referme sa zone. C'est tout le propos du
meuble — on découvre ce qu'il y a dedans en le touchant.

## 5. Le rangement : 15 cases et 2 tiroirs

| Emplacement | Contenu |
|---|---|
| 2 niveaux × 3 colonnes derrière les portes hautes | jeux tirés 1 à 6 |
| niche centrale, toujours ouverte, 3 cases | **Dinos · Monde · Œufs** (badge du nombre d'œufs toujours visible) |
| 2 niveaux × 3 colonnes derrière les portes basses | jeux tirés 7 à 12 |
| tiroir gauche | **Album** — le tiroir lui-même est le bouton |
| tiroir droit | **« encore »** — retire douze nouveaux jeux au sort, sans quitter l'armoire |

**Douze jeux, pas plus** : au-delà, l'accueil vire au launcher d'icônes et cesse
d'être un meuble. Les 36 du catalogue restent dans l'espace parents.

Les tiroirs n'ont **aucune icône posée dessus** : la poignée dessinée dans la
carcasse dit déjà « ouvre-moi ».

Les objets sont **posés sur les planches** : les cases sont en
`justify-content: flex-end` et le bas de chacune est calé sur le dessus de sa
planche (23,3 · 38,3 · 50,1 · 65,3 · 79,3 % du repère), donc le libellé tombe sur
le chant de l'étagère comme une petite plaque de bois.

Les cases d'une zone fermée sont réellement masquées (`visibility`), donc ni
cliquables ni annoncées par un lecteur d'écran : la porte est devant, on ne
triche pas.

Le prénom n'est pas dans le sprite — c'est un `.player-name` sur l'arche, il
change d'enfant, de langue et de longueur. L'avatar est **sous** la carcasse
(`z-index` 20 contre 30), sans médaillon ni cerne doré : l'épaule gauche de
l'arche passe devant lui, il a l'air de sortir du meuble au lieu d'y être collé.

## 6. Recette

`node studio/minijeux/tests/armoire.spec.mjs` — **vert, 8 viewports**
(320×568 → 1280×720). `npm run mj:test index` — vert.

Le spec garde par viewport : l'armoire arrive fermée et ses cases avec, jamais
d'ascenseur, rien de rogné par le bord de l'écran, les 15 cases et 2 tiroirs
présents, zone tactile ≥ 48 × 48, tiroirs sans icône, toutes les images chargées
**portes comprises** (une `url()` de fond en 404 est invisible à l'œil — c'est
arrivé en passe 1), aucun vantail ouvert ne recouvre un objet, ouverture et
fermeture réelles, poids du premier affichage, aucune erreur JS.

Et surtout la promesse de l'architecture : **les proportions ne bougent pas.**
Chaque case est mesurée en fraction de la boîte de l'armoire et ces fractions
sont comparées entre 320 px et 1280 px. C'est ce test-là qui échouerait si
quelqu'un remettait un calcul de taille par pièce.

Captures : `rapports/captures/HO-MJ-19-armoire-*.png`.

## 7. Ménage fait dans la foulée

Supprimés : `site/img/armoire/carcasse/` (19 tuiles v3), `site/img/armoire/kit/`
(7 sprites v4), les 10 pièces v1 à la racine de `img/armoire/`,
`tools/armoire-compose.py`, `armoire-tuiles.py`, `armoire-kit.py`,
`armoire-diff.py`, `armoire-proto*`, le brief et le rapport HO-MJ-18 et ses
captures, les captures HO-MJ-14 à 17.

Conservés et promus en références stables dans `docs/refs/armoire/` :
`ref-ouverte.png`, `ref-fermee.png`, `ref-casiers-12.png`.

`sw.js` : le precache passe des 19 tuiles `carcasse/` aux 3 sprites `v6/`, plus
`js/gen/armoire-objets.js` — `cache.addAll()` échoue en bloc si un seul fichier
manque, la liste ne pouvait pas rester périmée.

## 8. Reste à faire

- Recette Papa Yann sur le P30 Pro (le seul juge du ressenti).
- Le vantail ouvert à 80° se voit presque de chant. C'est le prix à payer pour
  rester sous 90° **et** garder les trois colonnes dégagées ; si le rendu ne
  plaît pas, le seul levier restant est de déplacer encore la charnière vers
  l'extérieur, pas d'augmenter l'angle.
- `nid-e2e.spec.mjs` échoue sur `.v-copain[data-copain="trex"]` : sélecteur de
  La Vallée, supprimée depuis HO-MJ-13. **Panne antérieure à ce handoff**, à
  traiter à part.
- HO-MJ-16 (globe animé au tap) reste ouvert, `inbox/globe-webapp-animation/`
  intact.
