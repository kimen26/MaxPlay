# HO-MJ-19 — L'Armoire v6 : un repère de design fixe, mis à l'échelle d'un bloc

> Statut : **livré 2026-09-18**, recette Papa Yann à faire sur le P30 Pro.
> Remplace HO-MJ-15 (v3, en ligne, recettée en vingt points), HO-MJ-17 (v4,
> prototype abandonné) et HO-MJ-18 (v5, jamais commitée, cassée).
> Fichiers possédés : `site/index.html`, `site/css/armoire.css`,
> `site/js/armoire.js`, `site/sw.js`, `site/img/armoire/v6/**`,
> `studio/minijeux/tools/armoire-sprites.py`, `tools/armoire-shot.mjs`,
> `studio/minijeux/tests/armoire.spec.mjs`.

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

## 2. Ce qui a été fait

### Le repère

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

### Les sprites : trois, pas vingt-cinq

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
(sx = 0.9860, sy = 0.9460 — les deux rendus GPT n'ont pas exactement les mêmes
proportions). Les portes de droite sont le même sprite en miroir.

**Le halo des spots n'est plus une image** : c'est un `radial-gradient` CSS,
donc il suit la taille au lieu d'avoir des bords durs.

### Les portes

Une rotation 3D CSS, pas quinze PNG d'angles :

```css
.porte-g { transform-origin: left center; }
.armoire.ouvert-haut .porte-haut.porte-g { transform: perspective(1300px) rotateY(-116deg); }
```

116° est **mesuré sur la référence** : le vantail ouvert y fait 43,5 % de sa
largeur fermée, donc |cos θ| = 0,435. Au-delà de 90° le vantail sort du corps et
dégage entièrement l'ouverture — c'est le geste de découverte, et les trois
colonnes restent libres.

Le wrapper tourne, le sprite miroité vit dedans. L'inverse (tourner un sprite
déjà en `scaleX(-1)`) inverse aussi le sens de la rotation : c'est ce qui
donnait des charnières du mauvais côté.

Les portes sont **fermées au chargement puis s'ouvrent toutes seules** (420 ms
et 640 ms) : l'armoire accueille l'enfant une fois par visite sans lui demander
deux gestes à chaque retour. Un tap sur un vantail referme ou rouvre sa zone.
`prefers-reduced-motion` : ouvert d'emblée, sans animation.

### Le rangement : 17 cases

| Emplacement | Contenu |
|---|---|
| 2 niveaux × 3 colonnes derrière les portes hautes | jeux tirés 1 à 6 |
| niche centrale, toujours ouverte, 3 cases | **Dinos · Monde · Œufs** (badge du nombre d'œufs toujours visible) |
| 2 niveaux × 3 colonnes derrière les portes basses | jeux tirés 7 à 12 |
| tiroir gauche | **Album** |
| tiroir droit | 13e jeu tiré |

Les cases d'une zone fermée sont réellement masquées (`visibility`), donc ni
cliquables ni annoncées par un lecteur d'écran : la porte est devant, on ne
triche pas.

Le prénom n'est pas dans le sprite — c'est un `.player-name` sur l'arche, il
change d'enfant, de langue et de longueur. L'avatar est **sous** la carcasse
(`z-index` 20 contre 30) : l'épaule gauche de l'arche passe devant le disque, le
dino a l'air de sortir du meuble au lieu d'y être collé.

## 3. Recette

`node studio/minijeux/tests/armoire.spec.mjs` — **vert, 8 viewports**
(320×568 → 1280×720). `npm run mj:test index` — vert.

Le spec garde par viewport : jamais d'ascenseur, rien de rogné par le bord de
l'écran, les 17 cases présentes et ≥ 96 × 96 de zone tactile, toutes les images
chargées **portes comprises** (une `url()` de fond en 404 est invisible à
l'œil — c'est arrivé en passe 1), les quatre vantaux qui s'ouvrent et se
referment, le poids du premier affichage, aucune erreur JS.

Et surtout la promesse de l'architecture : **les proportions ne bougent pas.**
Chaque case est mesurée en fraction de la boîte de l'armoire et ces fractions
sont comparées entre 320 px et 1280 px (écart toléré 1,5 %, ce qui couvre le
décalage dû au plancher tactile de 96 px). C'est ce test-là qui échouerait si
quelqu'un remettait un calcul de taille par pièce.

Captures : `rapports/captures/HO-MJ-19-armoire-*.png`.

## 4. Ménage fait dans la foulée

Supprimés : `site/img/armoire/carcasse/` (19 tuiles v3), `site/img/armoire/kit/`
(7 sprites v4), les 10 pièces v1 à la racine de `img/armoire/`,
`tools/armoire-compose.py`, `armoire-tuiles.py`, `armoire-kit.py`,
`armoire-diff.py`, `armoire-proto*`, le brief et le rapport HO-MJ-18 et ses
captures, les captures HO-MJ-14 à 17.

Conservés et promus en références stables dans `docs/refs/armoire/` :
`ref-ouverte.png`, `ref-fermee.png`, `ref-casiers-12.png`.

`sw.js` : le precache passe des 19 tuiles `carcasse/` aux 3 sprites `v6/` —
`cache.addAll()` échoue en bloc si un seul fichier manque, la liste ne pouvait
pas rester périmée. `SW_VERSION` régénéré (`7bfea2dc4f17`).

## 5. Reste à faire

- Recette Papa Yann sur le P30 Pro (le seul juge du ressenti).
- `nid-e2e.spec.mjs` échoue sur `.v-copain[data-copain="trex"]` : sélecteur de
  La Vallée, supprimée depuis HO-MJ-13. **Panne antérieure à ce handoff**, à
  traiter à part.
- HO-MJ-16 (globe animé au tap) reste ouvert, `inbox/globe-webapp-animation/`
  intact.
