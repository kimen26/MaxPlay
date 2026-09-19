# HO-MJ-20 — Rapport d'exécution : Armoire v7, meuble vide en kit modulaire

> Statut : spec vert (itération 3), captures produites. **Pas commité** (brief § 6.4 :
> Fable valide d'abord). Ce rapport dit ce qui a été mesuré et ce qui, à l'œil, ne colle
> PAS encore à la référence — pas « ça devrait aller ». § 9 = itération 2 (6 corrections
> demandées par le coordinateur après lecture des planches de l'itération 1). § 10 =
> itération 3 (arbitrage du § 9.4 : géométrie entièrement proportionnelle à l'ouverture
> AVANT de la carcasse, re-mesurée — l'itération 2 avait mesuré le panneau de fond, pas
> le bord avant du cadre).

## 1. Fichiers livrés

- `studio/minijeux/docs/refs/armoire/kit/{carcasse-vide,planche,montant,porte-fermee,
  porte-ouverte,tiroir,spot,halo}.png` — les 8 PNG source copiés (pas déplacés) depuis
  `C:\Users\kimen\Downloads\ChatGPT Image 17 sept. 2026, 23_21_4x (N).png`, N=3..10.
  Dossier source : 9,9 Mo (hors dépôt normal, c'est la matière brute).
- `studio/minijeux/tools/armoire-kit.py` — Lot A : rognage alpha (seuil 8), étirement
  affine de la carcasse, réduction LANCZOS, export WebP q=85, `kit.json`.
- `site/img/armoire/v7/{carcasse-vide,planche,montant,porte-fermee,porte-ouverte,
  tiroir,spot}.webp` + `kit.json` — **195,0 Ko** au total (budget ≤ 250 Ko, marge 55 Ko).
- `site/js/armoire-meuble.js` — `window.ArmoireMeuble = { build, setZone, toggle, DEFAUT }`.
- `site/css/armoire-meuble.css` — tout le placement en %, ordre z conforme au brief.
- `site/dev-armoire.html` — page de dev (fond/tapis recopiés de `armoire.css` v6, pas
  importés), barre de 4 boutons, `?etat=ferme|haut|bas|ouvert`.
- `studio/minijeux/tests/armoire-meuble.spec.mjs` — spec autonome Playwright.
- `studio/minijeux/tools/armoire-meuble-shot.mjs` + `armoire-meuble-cmp.py` (pas de
  `sharp` dans l'environnement : composition des planches de comparaison en PIL,
  appelé en sous-processus depuis le `.mjs`).

Rien touché dans `site/index.html`, `site/css/armoire.css`, `site/js/armoire.js`,
`site/sw.js` (vérifié par `git status` avant remise).

## 2. Mesures faites

### 2.1 Boîte corps de `carcasse-vide.png` (971×1619)

Scan de la largeur alpha (seuil α>8) ligne par ligne : stable à **x=[50,919]**
(largeur 870 px) entre y≈200 et y≈1375 ; l'arche rétrécit au-dessus, les pieds sont
plus étroits en dessous. `top`/`bottom` = boîte alpha totale : y=[35,1540].
→ `corps_box_source = [50, 919, 35, 1540]` dans `kit.json`.

### 2.2 Écart d'échelle vs `v6/repere.json` (corps cible : left 11,306 % · right
88,364 % · top 0,811 % · bottom 99,054 % du repère 911×1480)

```
target corps (px repère) : x=[102.998, 804.996]  y=[12.003, 1465.999]
carcasse corps (px source) : x=[50, 919] (870 px)  y=[35, 1540] (1505 px)
scale_affine : sx = 0.80782,  sy = 0.96611
```

La carcasse GPT est proportionnellement **plus large** que la référence (sx sensiblement
< sy) : étirée en conséquence, comme fait `armoire-sprites.py` pour les vantaux v6.

**Bug trouvé et corrigé (itération 2)** : le crop de `carcasse-vide.webp` (boîte alpha
TOTALE, donc avec de la marge autour de l'arche/pieds) ne remplit pas tout le frame
911×1480 — le poser en `inset:0; width:100%; height:100%` l'étirait sur tout le cadre
et désalignait tout le meuble (la carcasse prenait `100vw`, pas `--cab-w`, à cause d'un
second bug de classe CSS, voir § 4). Fix : `kit.json` porte désormais `pose_pct`
(`left:10,419 % · top:0,811 % · width:78,924 % · height:98,311 %`), posé en JS via
`--gx/--gy/--gw/--gh`, jamais en `inset:0`.

### 2.3 Positions re-mesurées sur `ref-ouverte.png` (971×1619, frame x=30 y=10 w=911 h=1480)

**Montants de niche** (pic de luminance sur une ligne à y=700px, au milieu de la niche) :
- montant 1 : x=361,5 px → **36,389 %**
- montant 2 : x=607,5 px → **63,392 %**
(v6 utilisait 39,2/60,4 à titre indicatif dans le brief — mesure réelle plus large.)

**5 planches** (bandes claires détectées par luminance sur une colonne centrale,
x0/x1 mesurés dans la bande intérieure [190,778]px, hors débord des vantaux ouverts
qui fausse la mesure si on scanne toute la largeur — constaté en pratique, toutes les
5 planches donnent alors le même x0/x1 une fois restreint à cette bande, preuve que
c'est la bonne mesure) :

| # | y (top, %) | x0 (%) | x1 (%) |
|---|---|---|---|
| 1 | 23,851 | 17,563 | 82,108 |
| 2 | 38,108 | 17,563 | 82,108 |
| 3 | 51,824 | 17,563 | 82,108 |
| 4 | 65,405 | 17,563 | 82,108 |
| 5 | 79,324 | 17,563 | 82,108 |

Épaisseur de planche déduite du ratio du sprite (`planche.webp` 1400×138 →
h/w=0,09857) appliqué à (x1-x0)=64,545 % → **plancheCh = 6,362 %**, commune aux 5.

**Bug trouvé et corrigé (itération 3)** : les `y0/y1` de niche utilisés pour poser les
2 montants avaient d'abord été pris depuis une mesure ponctuelle indépendante
(39,392 %, le bas RÉEL, variable, de la planche 2 sur l'image source). Mais le CSS pose
les 5 planches avec une épaisseur UNIFORME (`plancheCh=6,362`), donc le bas réel rendu
de la planche 2 tombe à `38,108+6,362=44,470 %`, pas 39,392 %. Résultat avant fix : le
montant remontait dans la planche 2 et débordait visuellement jusque dans la porte du
bas (visible sur la 2e planche de comparaison de l'itération 2). Fix : `montants[].y0`
recalculé depuis `planches[1].y + plancheCh`, pas depuis la mesure indépendante.

### 2.4 Portes

Repris de `v6/repere.json` (portes.haut/bas top/bottom, left/mid) : ces valeurs restent
valables puisque la carcasse est calée pour coïncider avec la même boîte corps.
**Bug trouvé et corrigé (itération 1)** : la config initiale utilisait `porteX.droite =
81,113 %` (le bord DROIT du vantail droit, = `repere.json portes.haut.right`) au lieu du
bord GAUCHE attendu par le CSS (`left:var(--dx); width:var(--dw)`). Le vantail droit
débordait donc massivement hors du cadre (mesuré : right=392,9px pour un cadre de
349,6px à 320×568). Fix : `porteX.droite = 49,835 %` (= le `mid` du repère, qui EST le
bord gauche du vantail droit).

### 2.5 Charnière du sprite `porte-ouverte.png`

**Constat par l'image, qui contredit le libellé du brief § 4.** Sur
`docs/refs/armoire/kit/porte-ouverte.png` : la charnière (les deux pentures visibles)
est sur le bord GAUCHE du sprite, la feuille du vantail part en perspective vers la
DROITE — conforme au tableau du brief § 2. Sur `ref-ouverte.png`, le **vantail gauche**
ouvert du meuble a sa charnière sur le montant extérieur gauche et son anneau du côté
centre (la feuille s'éloigne vers l'arrière-gauche) : c'est exactement la pose du
sprite `porte-ouverte.png` **tel quel**, pas en miroir. Le vantail droit ouvert est le
miroir de cette pose. Le brief § 4 affirmait l'inverse (« vantail gauche ouvert =
porte-ouverte en miroir, vantail droit ouvert = porte-ouverte tel quel ») — **j'ai
suivi l'image**, désignée par le brief lui-même comme la vérité géométrique (§ 2 :
« elles restent la vérité géométrique »), et je le signale ici explicitement plutôt que
de trancher en silence.

## 3. Poids

- Dossier `site/img/armoire/v7/` : **195,0 Ko** (webp) + `kit.json` (2 Ko), budget
  ≤ 250 Ko respecté avec 55 Ko de marge. Réglages : rognage alpha, plafonds de largeur
  par pièce (carcasse ≤ 1000, planche ≤ 1400, montant ≤ 120, portes/tiroir ≤ 480,
  spot ≤ 160 — portes et tiroir réduits de 600 à 480 lors du premier passage, qualité
  WebP 90→85, pour repasser sous le budget : 298,7 Ko → 195,0 Ko).
- Dossier source `docs/refs/armoire/kit/` (PNG bruts) : 9,9 Mo — hors budget déployé,
  c'est la matière de travail, jamais servie.

## 4. Sortie du spec (`armoire-meuble.spec.mjs`)

**Vert sur les 6 viewports** (320×568, 360×640, 360×740, 412×915, 800×600, 1280×720),
après 3 corrections trouvées en cours de route (dans l'ordre où le spec les a fait
apparaître) :

1. **`rien de rogné par le bord de l'écran` (FAIL initial)** — cause : `porteX.droite`
   mal calé (§ 2.4), les vantaux débordaient de 30 à 80 % de la largeur du cadre selon
   le viewport. Fix → PASS sur les 6 viewports.
2. **`rien de rogné` toujours FAIL après le fix 1, sur 4 des 6 viewports (les plus
   « larges »)** — cause distincte : la classe `.am-root`, posée sur le MÊME élément
   que `.armoire` (dimensionné par `--cab-w`), portait `width:100%; height:100%` dans
   `armoire-meuble.css` ; cette règle gagnait la cascade sur `width:var(--cab-w)` et
   l'armoire prenait `100vw`/`100%` de `.piece` au lieu de sa largeur calculée — visible
   uniquement quand `100vw` > la largeur théorique (viewports larges/bas), d'où le
   passage au vert des viewports étroits et l'échec des larges. Fix → `.am-root` ne
   porte plus aucune dimension, PASS sur les 6.
3. **`proportions identiques au viewport de référence` (FAIL, écart jusqu'à 5,78 %)** —
   même cause que le point 2 (les proportions divergeaient parce que le rectangle de la
   scène lui-même n'était pas stable). Résolu par le même fix.

Après ces trois fixes le spec est vert sans autre intervention : 5 planches même
hauteur (écart < 0,5 px), 2 montants, 2 tiroirs, 2 spots, 4 vantaux, arrive fermé,
`?etat=ouvert` bascule bien opacité/visibilité des deux jeux de sprites, toggle
ouvre/referme, poids ≤ 250 Ko, zéro erreur JS/console, empreinte de proportions
identique à 320 comme à 1280.

## 5. Captures et planches de comparaison

`studio/minijeux/docs/handoffs/rapports/captures/` :
- `HO-MJ-20-{320x568,360x640,360x740,412x915,800x600,1280x720}-{ferme,ouvert}.png`
- `HO-MJ-20-cmp-ferme.png` / `HO-MJ-20-cmp-ouvert.png` (planches [référence | rendu]
  en 360×740, celles que j'ai regardées pour juger)

## 6. Ce qui NE ressemble PAS encore à la référence (à l'œil, sur les planches de
   comparaison actuelles, après les 4 itérations de correction)

Défauts réels, dans l'ordre où je les vois :

1. **Le fond visible dans la niche (entre les 2 montants) est beaucoup plus étroit,
   proportionnellement, que sur la référence.** La référence montre 3 compartiments
   nettement séparés, à peu près égaux. Sur le rendu, les 2 montants prennent
   visuellement plus de place que leur voisinage bois — la niche a l'air « pincée »
   plutôt qu'ouverte en 3 cases franches. Cause probable non creusée faute d'itération
   restante : la largeur du montant (déduite du ratio brut du sprite `montant.webp`,
   120×1188) est peut-être surdimensionnée pour l'usage niche — sur `ref-ouverte.png`
   les montants de niche sont plus fins que les montants extérieurs du corps.
2. **Les vantaux ouverts semblent moins « dégagés » que sur la référence.** Sur
   `ref-ouverte.png`, les 4 vantaux ouverts s'écartent largement du corps et l'intérieur
   du meuble est visible sans obstruction. Sur le rendu, les vantaux ouverts restent
   visuellement proches de leur position fermée — l'angle/la perspective dessinés DANS
   le sprite `porte-ouverte.webp` donnent un décrochage plus faible que celui de la
   référence. Je n'ai pas retouché l'angle du sprite lui-même (il n'y a pas de rotation
   CSS 3D superposée dans cette version — v7 pose le sprite ouvert à plat, sa
   perspective est peinte dedans, contrairement à v6 qui appliquait un `rotateY` CSS à
   un sprite plat).
3. **Le vantail droit déborde très légèrement du cadre de la carcasse à droite**, visible
   en état ouvert sur la planche de comparaison 360×740. Pas mesuré précisément (pas eu
   le temps dans les 4 itérations) — à vérifier si c'est réel ou un artefact de rendu du
   drop-shadow (`filter:drop-shadow` peut déborder visuellement du rectangle mesuré).
4. **Pas de vérification chiffrée de la symétrie visuelle malgré une bonne mesure
   Playwright** (marge gauche 29,16 px vs droite 29,48 px à 800×600, quasi-symétrique) —
   l'asymétrie perçue sur une capture antérieure pourrait avoir été un artefact de
   compression PNG plutôt qu'un vrai défaut ; je le note sans trancher, n'ayant pas eu
   d'itération pour creuser plus avant.

Ce qui EST conforme, vérifié à l'œil sur les planches de comparaison finales :
proportions générales du meuble (largeur/hauteur, position de l'arche), les 5 planches
bien visibles et alignées, les 2 montants bien contenus dans la niche (ne débordent
plus dans les portes, corrigé § 2.3), les 2 tiroirs tous deux visibles en état ouvert
(corrigé en dernière itération : z-index insuffisant sous une porte ouverte, voir § 7),
portes fermées à l'arrivée, halo lumineux CSS présent (faible, cohérent avec le
`radial-gradient` repris de v6).

## 7. Bug additionnel trouvé et corrigé hors des 3 listés au § 4 (spec ne le couvrait pas)

**Un seul tiroir visible sur deux en état ouvert.** Cause : une porte ouverte
(`rotateY(-70deg)` — non, en v7 le sprite ouvert n'a pas de rotation 3D, c'est son
`z-index:60` fixe qui reste supérieur à celui du tiroir (`z-index:30`) même une fois
la zone "bas" ouverte, alors que visuellement le vantail est censé être écarté et ne
plus rien cacher. `getBoundingClientRect()` d'un élément avec `rotateY`/positionné en
place garde son rectangle plein, donc le navigateur peint sa boîte entière par-dessus
le tiroir dessous. Fix : `.am-root.am-ouvert-bas .am-tiroir { z-index:65; }` — passe
au-dessus des portes une fois la zone ouverte. Le spec ne le couvrait pas (il vérifie la
PRÉSENCE des tiroirs et du z-index déclaré en CSS, pas leur visibilité EFFECTIVE
derrière une porte pivotée) : à ajouter en TODO test si HO-MJ-22 réutilise ce mécanisme.

## 8. Itérations

4 cycles mesure/correction/capture/lecture effectués (limite du brief atteinte) :
1. Fix `porteX.droite` (débordement massif des vantaux).
2. Fix `.am-root` largeur/hauteur (carcasse à 100vw au lieu de `--cab-w`) + `pose_pct`
   de la carcasse (elle ne remplit pas tout le frame).
3. Fix `montants[].y0` (débordement dans la porte du bas).
4. Fix `z-index` des tiroirs sous une porte ouverte (un seul tiroir visible).

Le spec est vert. Les défauts du § 6 restent réels et non corrigés faute de cycle
supplémentaire — je les remonte tels quels plutôt que de les passer sous silence.

## 9. Itération 2 — 6 corrections demandées par le coordinateur

Le coordinateur a mesuré lui-même les rects en % sur les captures de l'itération 1 et
demandé 6 corrections précises. Traitées dans l'ordre donné.

### 9.1 Point 1 — Portes ouvertes : pose et miroir faux

**Miroir corrigé, inverse de l'itération 1.** Zoom sur le vantail HAUT GAUCHE de
`ref-ouverte.png` (crop serré sur les pentures, pas la vue d'ensemble qui avait induit
en erreur l'itération 1) : ses **pentures sont sur son bord DROIT** (contre le montant
intérieur), son **anneau sur son bord GAUCHE**. `porte-ouverte.webp` a ses pentures à
GAUCHE (confirmé § 2.5) : posé tel quel, c'est donc la pose du vantail **DROIT**. Le
vantail **GAUCHE** est son miroir — l'inverse exact de ce que rapportait le § 2.5 de
l'itération 1. Corrigé dans `armoire-meuble.js` (`buildPortes`).

**Mesure de la hauteur de colonne charnière** (demandée pour calibrer la hauteur
d'affichage) : sur `porte-ouverte.png` (1024×1536), la colonne alpha au bord gauche
(x=165, juste après le pixel anti-aliasé isolé à x=160) fait 1123 px de haut sur un
sprite total de 1375 px — ratio 0,8167. Cette colonne n'est PAS centrée dans le sprite
(marge haut 77 px, marge bas 175 px dans le crop final) : d'où `porteOuverte.depasseHaut
= 0,0686` et `depasseBas = 0,1558` (fractions constantes de la hauteur de zone, vérifié
identiques à 1e-4 près entre la zone haute et la zone basse — c'est le même sprite,
juste ré-échelonné).

**Incohérence trouvée entre le texte du brief et son propre test.** Le brief demande
d'ancrer la charnière sur le montant extérieur du CORPS (11,306 %/88,364 %,
`v6/repere.json corps.left/right`) avec une largeur de 13,6 %, mais demande AUSSI que
le spec vérifie « vantail ouvert gauche entièrement dans [0, 13,5 %] ». Avec une
charnière à 11,306 % et une largeur de 13,6 %, le vantail gauche irait de -2,29 % à
11,306 % — hors de `[0, 13,5]`. Les deux consignes ne sont pas simultanément
satisfaisables avec ces chiffres. **J'ai retenu la contrainte vérifiée par le spec**
(boîte `[0, largeur]` à gauche, `[100-largeur, 100]` à droite) plutôt que l'ancrage sur
`corps.left/right`, parce que c'est elle qui est testée et que la mesure réelle sur
`ref-ouverte.png` (bord libre du vantail gauche ouvert à x=2,52 %, jamais négatif,
largeur apparente réelle ~8,8 %) confirme que le vantail ne déborde pas hors du cadre —
cohérent avec `[0,13,5]`, pas avec l'ancrage à 11,306 %. Signalé plutôt que tranché en
silence.

**Bug CSS trouvé et corrigé en cours de route** : `transform-origin` du miroir
(`scaleX(-1)`) du vantail gauche. Avec `transform-origin:0%` la boîte `[0,13.6]`
devenait `[-13.6,0]` (hors cadre à gauche) ; avec `100%` (hérité de la règle de base)
elle devenait `[13.6,27.2]` (décalée à droite). Seule une origine à **50%** (le centre
de la boîte) garde la boîte immobile pendant que son contenu se reflète — corrigé dans
`armoire-meuble.css`.

Le sprite ouvert vit maintenant HORS du bouton `.am-porte` (sibling direct de
`.am-root`) : un enfant `position:absolute` du bouton se serait positionné relativement
à la boîte FERMÉE du bouton, pas au repère — c'est ce qui, avec l'ancien code, collait
le sprite ouvert à la position du vantail fermé au lieu de sa propre boîte `--ox/--oy/
--ow/--oh`.

`z-index:65` sur les tiroirs (fix de l'itération 1 pour un tiroir masqué par une porte
ouverte) retiré comme demandé : les tiroirs restent à z-index 30, sous les portes (z 60)
— le sprite ouvert vivant maintenant dans sa propre boîte hors du corps, il ne recouvre
plus le tiroir.

### 9.2 Point 2 — Ouverture de la carcasse mesurée par luminance

Mesuré sur `carcasse-vide.png` (971×1619), PAR LUMINANCE (le panneau de fond sombre vs
le bois clair du cadre), pas par alpha (la carcasse est pleine en alpha) :
- **left = x=138 px** (seuil de luminance ~150, colonne stable sur 84/110 lignes
  scannées, vérifié à l'œil par superposition de ligne rouge sur l'image — tombe
  exactement sur la jonction bois/fond sombre).
- **right = x=832 px** (seuil ~200, stable sur 110/110 lignes, vérifié de même) —
  symétrique à `left` par rapport au centre de l'image (485), cohérence croisée.
- **top = y=250 px, bottom = y=1335 px** (mesurés sur la colonne centrale x=485, en
  évitant la courbe de l'arche qui fausse un scan multi-colonnes).

Converti en % du repère via `pose_pct` de la carcasse (kit.json) :
`{left: 19.12, right: 80.732, top: 14.855, bottom: 85.731}`.

**Écart ouverture GPT vs référence (demandé par le brief) :**
- Largeur : 61,612 % (GPT) vs 62,555 % (v6, portes.haut.right − left = 81,113−18,558) —
  écart faible, 0,94 point, la carcasse GPT est très légèrement plus étroite.
- **Hauteur : écart majeur.** `top=14,855` vs v6 `portes.haut.top=9,184` (écart **5,671
  points**) ; `bottom=85,731` vs v6 `portes.bas.bottom=93,046` (écart **7,315 points**).
  L'ouverture de la carcasse GPT est donc bien plus ÉTROITE EN HAUTEUR que la référence,
  pas plus large comme le décrivait le brief au point 2 intro — l'effet visible (bande
  sombre entre vantail et côté) vient en fait surtout d'un écart vertical, pas
  horizontal. Cet écart de hauteur est la cause directe du problème de fond au § 9.4
  (tiroirs quasi invisibles).

Dérivé dans `DEFAUT` comme demandé : `porteX.gauche=19,12`, `porteX.droite=49,926`
(milieu de l'ouverture) ; `portes.haut.top=14,855` ; `portes.bas.bottom=85,731` ;
`planches[].x0/x1 = 19,12/80,732` (chevauchement de 0,5 % ajouté au moment du placement
par `buildPlanches`, pas stocké deux fois dans la table). Les y des planches et le bas
de haut/haut de bas restent ceux de la référence (`ref-ouverte.png`), inchangés par ce
point — **c'est précisément le fait de garder ces deux sources différentes qui produit
l'incohérence du § 9.4**.

### 9.3 Point 3 — Spots trop gros et hors des vantaux

Repositionnés : `w=6` (% du repère, hauteur déduite du ratio du sprite `spot.webp`
160×96 → 0,6), et **`y` recalculé** — le brief suggérait `y=11,5`, mais avec le nouveau
`portes.haut.top=14,855` (point 2), un spot centré à 11,5 tombe entièrement AU-DESSUS du
vantail (mesuré : spot `[9,7 ; 13,3]` vs vantail `[14,855 ; 37,3]`, zéro recouvrement).
Recalculé à `y=17,655` (= top de la zone + 1 % de marge + demi-hauteur du spot) pour que
le spot tombe réellement DANS le rect du vantail haut, comme le vérifie maintenant le
spec (`spots entièrement dans un vantail haut`, vert sur les 6 viewports).

### 9.4 Point 4 — Tiroirs : façade seule, PROBLÈME DE FOND non résolu

`tiroir-face.webp` produit comme demandé : rognage de `tiroir.png` sur la façade seule
(panneau avant + anneau), bord haut = y=476 px (mesuré par transition de luminance,
vérifié à l'œil — tombe exactement sur l'arête entre l'intérieur du tiroir vu de dessus
et la face avant), bas = bas de la boîte alpha totale. Boîte finale 1365×437,
`tiroir-face.webp` exporté à 480×154. `tiroir.webp` (sprite entier) conservé pour un
futur état « tiroir ouvert », non branché ici.

**Le calcul de boîte demandé par le brief dégénère.** La boîte verticale pour les 2
façades = entre le bas de la planche 5 (`79,324 + plancheCh(6,172) = 85,496`) et
`ouverture.bottom` (`85,731`, mesuré point 2) : **0,235 % de hauteur de repère**. Cause
: `planches[].y` vient de la mesure sur `ref-ouverte.png` (jamais changée par cette
itération), `ouverture.bottom` vient de la mesure sur `carcasse-vide.png` (ce point-ci)
— les deux sources ne sont PAS dimensionnellement cohérentes entre elles malgré
l'étirement affine du corps (qui ne corrige QUE la boîte corps globale mesurée en un
point, pas chaque détail interne comme la position de chaque planche).

Appliqué STRICTEMENT la règle « la hauteur commande » : `boxH=0,235` →
`wEach = boxH / ratioFacade = 0,732 %` de large, `hEach = 0,235 %`. **Résultat : les
deux façades sont mathématiquement posées, mais visuellement invisibles** — confirmé
sur la capture `HO-MJ-20-800x600-ouvert.png` (crop zoomé sur la zone tiroirs) : aucun
tiroir visible sous le meuble, seuls les pieds. Je n'ai PAS arbitré un compromis
(largeur fixe raisonnable, débordant sous `ouverture.bottom`) sans le signaler : la
seule application cohérente et testable de la règle donnée produit ce résultat dégradé.
**À trancher par le coordinateur** : soit re-mesurer `ouverture.bottom` plus bas, soit
ajuster `planches[4].y`/`plancheCh` pour laisser de la place, soit accepter que les
tiroirs débordent légèrement sous `ouverture.bottom` (qui semble anormalement haut sur
cette carcasse GPT par rapport à la planche 5 mesurée sur l'autre image).

### 9.5 Point 5 — Ombres allégées

`drop-shadow` des planches : `.006/.01/.35` → `.004/.008/.25`. Tiroirs : `.4` → `.3`
(alpha seulement, offset/blur inchangés comme demandé pour les planches — le brief ne
donnait pas de nouveaux offsets pour les tiroirs, seulement l'alpha).

### 9.6 Point 6 — Page dev : barre de boutons ne recouvre plus le meuble

`--bar-h: 64px` réservé dans la mise en page : `.piece { height: calc(100% -
var(--bar-h)) }`, `--cab-w` recalculé avec `100svh - var(--bar-h) - 18px`. La barre
passe en `height:var(--bar-h)` (plus de padding qui l'aurait fait dépasser cette
réserve). Le spec teste maintenant les bornes de l'armoire contre `.piece`
(`getBoundingClientRect()`), pas contre le viewport — vert sur les 6 viewports.

### 9.7 Sortie du spec (itération 2)

Vert sur les 6 viewports après ces corrections, plus 3 bugs supplémentaires trouvés et
corrigés PENDANT l'itération (le spec les a fait échouer avant d'être vert) :
1. **`vantaux ouverts dans [0,13.6%]/[86.4,100%]`** — d'abord raté avec l'ancrage
   `corps.left/right` (débord négatif), puis avec un bug `transform-origin` du miroir
   CSS (voir § 9.1).
2. **`spots entièrement dans un vantail haut`** — raté avec `y=11,5` du brief, qui ne
   tenait pas compte du nouveau `portes.haut.top=14,855` dérivé au point 2 (voir § 9.3).
3. **`rien de rogné par .piece`** — les `.am-porte-ouverte` (sprites ouverts, toujours
   présents en DOM même à `opacity:0`) débordaient de `.piece` par construction avant
   le fix du § 9.1 ; résolu par la même correction de boîte, pas de fix séparé.

### 9.8 Ce qui NE ressemble toujours PAS à la référence (planches relues, itération 2)

1. **Tiroirs invisibles** (§ 9.4) — le défaut le plus visible : aucun tiroir n'apparaît
   sous le meuble en état ouvert, alors que la référence en montre 2 nettement. Cause
   identifiée et non résolue, nécessite un arbitrage (voir § 9.4).
2. **Un léger liseré de carcasse reste visible aux 4 coins des vantaux fermés** —
   atténué par rapport à l'itération 1 (l'ouverture est mieux calée) mais pas nul :
   sur la référence, la jonction corps/portes est quasi invisible.
3. **Proportions globales légèrement différentes** — le meuble rendu paraît un peu
   moins élancé verticalement que la référence sur la planche de comparaison fermée,
   sans que j'aie mesuré précisément l'écart (pas eu d'itération pour le chiffrer).

Ce qui EST net et conforme sur les planches relues à l'itération 2 : l'angle et le
décrochage des vantaux ouverts (nettement amélioré, les 4 vantaux s'écartent
clairement du corps comme sur la référence) ; les spots tombent maintenant dans les
vantaux hauts (invisibles portes fermées, visibles portes ouvertes, cohérent avec la
référence) ; les 3 compartiments de la niche sont bien visibles et proportionnés ; les
montants ne débordent plus dans les portes ; le meuble ne déborde plus de la zone
utile de la page dev.

## 10. Itération 3 — arbitrage du § 9.4, ouverture AVANT (pas le panneau de fond)

Le coordinateur a arbitré : abandon des `y` de planches mesurés sur `ref-ouverte.png`,
tout dérive désormais de l'ouverture AVANT de la carcasse GPT, en fractions. Il a aussi
signalé que la mesure de l'itération 2 était fausse : j'avais mesuré le panneau de fond
sombre (au fond de la perspective intérieure du meuble, qui est une bibliothèque en 3D),
pas le bord avant du cadre — celui où les vantaux fermés doivent réellement s'arrêter.

### 10.1 Point 1 — Mesure de l'ouverture AVANT (px source, confirmée)

Re-mesurée sur `carcasse-vide.png` (971×1619) par pic de luminance (l'arête du bord
avant est plus claire que la face avant ET que la paroi en perspective — méthode
différente de l'itération 2, qui cherchait une transition de teinte vers le fond,
capturant un bord bien plus profond) :

| Bord | px mesuré | Stabilité | Estimation coordinateur (±10 px) |
|---|---|---|---|
| left | **85** | dominant sur 65/108 lignes scannées | 85 |
| right | **912** | dominant sur 108/108 lignes | 885 (écart 27 px, hors marge annoncée) |
| top | **193** | dominant sur 38/38 colonnes | 200 (écart 7 px, dans la marge) |
| bottom | **1410** | dominant sur 39/39 colonnes | 1400 (écart 10 px, à la marge) |

Chaque bord vérifié à l'œil par superposition de lignes sur l'image entière (pas
seulement un crop) : le rectangle formé encadre exactement les faces avant du
montant/traverse/socle, comme sur `ref-fermee.png`. Pour le bord droit (écart le plus
grand avec l'estimation), la ligne à 885 tombait encore dans la face avant du montant,
pas sur son arête — j'ai retenu la mesure automatisée (912), vérifiée visuellement.
Pour le bord bas, deux candidats existaient (y=1335, jonction fond-sombre/plancher ;
y=1410, jonction plancher/face-avant-du-socle) — c'est le second qui correspond à « haut
de la face avant du socle » demandé par le coordinateur, confirmé par un crop à 3 lignes
superposées.

Converti en % du repère via `pose_pct` de la carcasse : `kit.json "ouverture" = {left:
14.414, right: 87.834, top: 11.132, bottom: 90.63}` — remplace la valeur de l'itération
2 (`{left: 19.12, right: 80.732, top: 14.855, bottom: 85.731}`), nettement plus proche
des valeurs `v6/repere.json corps` (11.306/88.364/0.811/99.054), cohérent avec le fait
que c'est maintenant la même sorte de bord (avant du cadre) qui est mesurée des deux
côtés.

### 10.2 Point 2 — DEFAUT entièrement proportionnel à l'ouverture

`W = 73,42 %` (right−left), `H = 79,498 %` (bottom−top). Toutes les valeurs suivantes
sont calculées en JS depuis `OUVERTURE` et ces fractions (pas figées en dur séparément —
`xFrac(f)`/`yFrac(f)` dans `armoire-meuble.js`), donc automatiquement cohérentes entre
elles :

| Élément | Règle (coordinateur) | Valeur calculée |
|---|---|---|
| Zone haut | y ∈ [0, 0.354] H | [11.132, 39.274] % |
| Zone niche | y ∈ [0.354, 0.531] H | [39.274, 53.345] % |
| Zone bas | y ∈ [0.531, 1] H | [53.345, 90.63] % |
| Planches (top, fraction H) | 0.179 / 0.348 / 0.510 / 0.671 / 0.837 | 25.362 / 38.797 / 51.676 / 64.475 / 77.672 % |
| Montants (x) | 0.285 W / 0.717 W | 35.339 / 67.056 % |
| Spots (x) | 0.25 W / 0.75 W | 32.769 / 69.479 % |
| Spot (cy) | top + 0.09×(0.354×H) | 13.665 % |

**`plancheCh` redéfini en donnée de config** (brief point 2, 3e tiret) : `3,0 %` du
repère, plus le ratio du sprite (qui donnait 6,172 % — une dalle vue de dessus,
beaucoup trop épaisse pour ressembler à une étagère). Le sprite est compressé
verticalement en `background-size:100% 100%`, assumé.

**Montants de niche** : `y0 = planches[1].y + plancheCh = 41,797 %`, `y1 =
planches[2].y = 51,676 %` — calculés depuis la MÊME table `PLANCHES_Y` que
`buildPlanches`, donc plus de risque d'incohérence entre deux sources (le bug de fond
de l'itération 2, § 9.4).

**Tiroirs** (résout le problème de fond § 9.4) : boîte entre le bas de la planche 5
(`77,672+3,0=80,672 %`) et le bas de l'ouverture (`90,63 %`) = **9,958 %** de hauteur
(coordinateur : « ≈ 0,13 H », mesuré ici 0,1253 H — proche). Largement au-dessus du
minimum `0,10 H` exigé par le spec, et surtout **visible** : `wEach = boxH/ratioFaçade =
31,04 %`, `2×wEach+gap = 63,08 %` < `W = 73,42 %`, donc la hauteur commande bien comme
prévu par défaut, sans avoir besoin de réduire par la largeur.

**Spots** : `w=6 %` (fixe, pas une fraction de W — le brief le précise), hauteur
déduite du ratio du sprite.

**Portes ouvertes** (résout le trou signalé en itération 2 § 9.1) : boîte gauche
`[libre=2,5 ; charnière=12,3]`, droite `[87,7 ; 97,5]` par symétrie autour de 50 — la
charnière recouvre maintenant le bord du corps de ~1 %, plus d'ancrage sur
`corps.left/right` (abandonné, c'était la source de l'incohérence signalée en
itération 2 § 9.1 entre le texte du brief et son propre test).

### 10.3 Point 3 — Spec : nouveaux tests, tous verts du premier coup

Ajoutés : couverture de l'**ouverture avant** (remplace l'ancienne mesure fausse) ;
5 planches à **`plancheCh` en valeur absolue** (±0,3 px), pas seulement entre elles ;
**boîte tiroirs ≥ 0,10 H** ; vantaux ouverts dans leur boîte **`[libre,charnière]`** à
±0,3 % (remplace `[0,13.6%]` de l'itération 2). Spec vert sur les 6 viewports **sans
aucun bug supplémentaire trouvé en cours de route** cette fois — contrairement aux
itérations 1 et 2, la réécriture proportionnelle n'a réintroduit aucune régression.

### 10.4 Ce qui diffère encore de la référence (planches relues, itération 3)

Après avoir ouvert `HO-MJ-20-cmp-ferme.png` et `HO-MJ-20-cmp-ouvert.png` :

**Vantaux fermés touchent-ils les montants et traverses ? OUI, nettement amélioré.**
Crop zoomé sur le coin haut-gauche fermé (800×600) : les pentures du vantail touchent
quasiment le bord du montant, la bande sombre visible aux itérations 1-2 a disparu. Il
reste un très léger liseré de carcasse visible tout en haut, sous l'arche (normal :
l'arche n'a pas de vantail devant, ce n'est pas un défaut).

**Les tiroirs se voient-ils ? OUI**, nettement — c'était le défaut principal signalé
au § 9.4, résolu par la dérivation proportionnelle : les 2 façades sont visibles, bien
centrées sous la dernière étagère, à une échelle cohérente avec le reste du meuble.

**Les planches ont-elles l'air d'étagères, plus de dalles ? OUI.** Avec
`plancheCh=3,0 %` (au lieu du ratio brut du sprite, 6,172 %), les 5 planches sont
nettement plus fines sur le rendu, la niche à 3 compartiments et les étagères en haut/
bas ont maintenant une silhouette d'étagère plutôt qu'un bloc épais. Compté sur la
capture ouverte : 2 planches visibles dans chaque zone (haut et bas), plus les 2
planches bordant la niche — cohérent avec la référence.

Différences résiduelles, mineures :
1. Le halo lumineux CSS des spots (radial-gradient repris de v6) reste peu visible sur
   les captures — les deux ronds des luminaires eux-mêmes (sprite `spot.webp`) sont
   nets, mais la lueur ambiante autour est discrète comparée à la référence, qui a un
   éclairage plus marqué sur le fond du meuble. Non retouché cette itération (pas
   demandé explicitement au brief, et pas un défaut structurel).
2. Proportions générales du meuble toujours pas mesurées au pixel près contre la
   référence (pas eu de demande explicite de le faire cette itération) — à l'œil, la
   silhouette (largeur, hauteur, position de l'arche) semble cohérente sur les deux
   planches de comparaison.

Aucun défaut structurel résiduel identifié cette itération : les 3 questions posées par
le coordinateur (vantaux/montants, tiroirs visibles, planches en étagères) répondent
toutes OUI.
