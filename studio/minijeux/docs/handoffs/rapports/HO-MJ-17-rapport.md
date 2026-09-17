# HO-MJ-17 — Rapport : kit 7 sprites + prototype statique « L'Armoire v4 »

> Statut : **fait**, passe 4. Rien touché dans `site/` hors `site/img/armoire/kit/`, pas de commit.
>
> - **Passe 1** rejetée : fond en losanges, spots en sprite tronqué et présents sur la mauvaise
>   vitrine, portes plates sans perspective avec un vide entre corps et porte, raccords
>   planches/montants visibles, pied avec un bout de socle, bois trop clair.
> - **Passe 2** : les 8 points corrigés. Encore rejetée : vitrines sans fond du tout, montants qui
>   dépassaient sous le socle, portes encore trop « de face ».
> - **Passe 3** : les 3 points corrigés (fond de vitrine, montants raccourcis, perspective
>   resserrée). Encore rejetée : **portes droites posées DANS le corps** (bug bloquant), vitrine
>   devenue trop sombre par rapport aux casiers (56-62% au lieu de ~35%), petits tronçons
>   résiduels sous le socle.
> - **Passe 4** (celle-ci) : les 3 points ci-dessous traités dans l'ordre, avec re-capture et Read
>   de la 360×740 et 1280×720 après chaque correctif.

## Porte 1 — `python studio/minijeux/tools/armoire-kit.py`

```
Kit : 25340 octets (24.7 Ko) pour 7 sprites   (limite brief : 80 Ko)
  fronton     757x143    9808 o
  montant      40x320    1522 o
  planche     250x32      636 o
  fond        320x320    2326 o
  tiroir      310x158    2882 o
  pied         68x52     1364 o
  porte       233x320    6802 o
```

Un sprite retouché en passe 4 : `planche.webp` (voir Corrections pt.3).

## Porte 2 — `node studio/minijeux/tools/armoire-proto-shot.mjs` + `python studio/minijeux/tools/armoire-proto-mesure.py`

8 captures, 0 image cassée, 0 erreur JS, aucun scroll. Trois portes de vérification ajoutées/corrigées :

- **pt.1** (charnière à ±6u du bord extérieur du montant, centre de porte hors du corps) : mesurée
  directement dans `armoire-proto-shot.mjs` à partir des `getBoundingClientRect()` du montant et
  de la porte rendue.
- **pt.2** (vitrine-2 ET casier du milieu, 30-40% plus sombres que le montant) : même méthode de
  mesure que les passes précédentes (coordonnées écrites en JSON, luminance lue sur le PNG).
- **pt.3** (ligne 4px sous le socle, entre les pieds, sans tronçon résiduel) : premier essai —
  comparer à la couleur EXACTE du mur — donnait un faux positif partout (0% mur) car le tapis
  (`.piece::before`, ellipse sombre floue sous les pieds, élément de mise en scène voulu depuis
  `armoire.css` d'origine) assombrit légitimement toute cette zone. Corrigé : on scanne la
  variation LOCALE de luminance (écart à une tendance lissée) plutôt que la couleur absolue — un
  vrai tronçon de bois clair ressort comme un pic net, le dégradé doux du tapis non.

### Tableau viewport → u / rangées / largeur du corps / part visible des portes

| Viewport | u | Rangées | Corps (px) | Corps (%) | Porte visible (g et d) | Charnière vs montant | Centre hors corps |
|---|---|---|---|---|---|---|---|
| 360×740 | 0,422 | 3 | 295 | 82 % | 80 % | ±4u | oui |
| 360×640 | 0,422 | 1 | 295 | 82 % | 80 % | ±4u | oui |
| 320×568 | 0,375 | 1 | 262 | 82 % | 80 % | ±4u | oui |
| 390×844 | 0,457 | 3 | 320 | 82 % | 80 % | ±4u | oui |
| 412×915 | 0,483 | 3 | 338 | 82 % | 80 % | ±4u | oui |
| 800×600 | 0,480 | 1 | 336 | 42 % | 100 % | ±4u | oui |
| 1024×768 | 0,614 | 1 | 430 | 42 % | 100 % | ±4u | oui |
| 1280×720 | 0,576 | 1 | 403 | 31,5 % | 100 % | ±4u | oui |

**Porte droite désormais symétrique de la gauche sur les 8 viewports** (avant passe 4 : dans le
corps, recouvrant vitrine/casier/tiroir droits). Charnière à 4u du bord extérieur du montant
(≤6u requis), centre de chaque porte hors du corps (`true` sur toutes les mesures), part visible
remontée à 80 % (mobile) / 100 % (desktop) — les deux côtés, contre 80 %/100 % uniquement à gauche
avant (la droite n'était même pas "visible hors du corps" puisqu'elle était DANS le corps).

### Mesure pt.2 — vitrine-2 ET casier milieu vs montant (30-40% requis)

| Viewport | Vitrine-2 | Casier milieu |
|---|---|---|
| 360×740 | 30,9 % OK | 38,1 % OK |
| 360×640 | 33,6 % OK | 37,6 % OK |
| 320×568 | 35,8 % OK | 39,5 % OK |
| 390×844 | 34,8 % OK | 40,5 % *(hors, +0,5 pt)* |
| 412×915 | 37,3 % OK | 42,1 % *(hors, +2,1 pt)* |
| 800×600 | 27,9 % *(hors, −2,1 pt)* | 30,3 % OK |
| 1024×768 | 36,2 % OK | 35,5 % OK |
| 1280×720 | 32,0 % OK | 31,3 % OK |

12/16 mesures dans la fourchette stricte, les 4 hors fourchette le sont de peu (0,5 à 2,1 points).
Point important : vitrine et casier retombent maintenant dans la MÊME fourchette générale (avant
passe 4 : 56-62 % vs 33,9 %, un écart de ~25 points) — la couleur de fond est visuellement
cohérente entre les deux types de rangée sur toutes les captures (vérifié à l'œil).

### Mesure pt.3 — sous le socle, entre les pieds (pic de luminance locale)

| Viewport | Pic détecté |
|---|---|
| 360×740, 360×640, 320×568, 390×844, 412×915 | +0,0 (aucun) |
| 800×600 | +0,6 |
| 1024×768 | +0,3 |
| 1280×720 | +0,6 |

Tous largement sous le seuil (12) : aucun tronçon résiduel détecté.

## Porte 3 — vérification à l'œil

360×740 et 1280×720 Read à côté de la référence après chaque correctif (3 fois).

## Corrections apportées, dans l'ordre demandé

1. **Portes droites dans le corps (BLOQUANT)** : cause trouvée — `.ar-porte-hote.d .ar-porte`
   appliquait `transform: perspective(...) rotateY(65deg) scaleX(-1)`, `scaleX(-1)` en DERNIER
   dans la liste de fonctions. Les transforms CSS s'appliquent de droite à gauche : le miroir
   s'exécutait donc APRÈS la rotation, déplaçant tout le rendu visuel de la porte vers la gauche
   (dans le corps) au lieu de le refléter sur place. Un premier correctif (inverser l'ordre
   `scaleX(-1) rotateY(65deg)`) a amélioré sans résoudre. Solution retenue, plus robuste :
   **mirroir appliqué sur le HÔTE `.ar-porte-hote.d` entier** (`transform:scaleX(-1)` sur le hôte,
   pas sur chaque enfant), ce qui permet de réutiliser LA MÊME règle CSS interne que `.g` pour la
   porte, l'épaisseur et les charnières (plus de duplication de transforms qui divergeaient). Dans
   le référentiel local mirroré du hôte, `right:0`/`transform-origin:100%` redevient visuellement
   le bord gauche à l'écran automatiquement.
2. **Vitrine trop sombre (56-62% au lieu de ~35%)** : la couche `.ar-vitrine::before` ajoutée en
   passe 3 (voile spécifique aux vitrines) a été **supprimée** — un seul jeu de règles
   (`.ar-fond::after`) réutilisé pour vitrines, casiers et bas-étagère, comme demandé. Le vrai
   rééquilibrage a porté sur `.ar-fond::after` lui-même : l'ancien `radial-gradient` (halo clair
   au centre, sombre au bord) était proportionnel à la BOÎTE, donc un rectangle très allongé
   (vitrine 630×200u) gardait son centre clair sur une bien plus grande distance qu'une case
   presque carrée (casier ~150×150u) — même écriture, résultat très différent selon la forme.
   Remplacé par un voile sombre UNIFORME (indépendant de la forme, `rgba(0,0,0,.36)`) + un halo
   résiduel léger (`rgba(255,220,160,.08)`, transparent à 55%). Résultat : vitrine et casier
   retombent dans la même fourchette générale (30-42%, contre un écart de 25 points avant).
3. **Tronçons sous le socle** : cause trouvée — le sprite `planche.webp` (réutilisé pour
   `.ar-socle`) contenait 2 petits reliefs verticaux hérités de son crop dans la référence
   (`(191,653,854,685)` incluait les hauts de 2 séparateurs de casiers visibles dans l'image
   source à x≈360-385 et 610-640). Une fois ce sprite réutilisé à `background-size:100% 100%`
   pour le socle, ces reliefs réapparaissaient comme de petits tenons sous le socle. Corrigé :
   `PLANCHE` recadrée sur une zone SANS relief, `(435,653,685,685)` — vérifié à l'œil (planche-
   contact et zoom) et par scan de pixels (aucun pic de luminance locale sous le socle sur les 8
   viewports).

## Checklist Papa Yann (§ 6 du brief) — passe 4, HONNÊTE

Points modifiés en passe 4 uniquement (les autres inchangés depuis la passe 3) :

- **Point 20 (portes qui débordent, corps presque pleine largeur)** — TENU, corrigé pour de bon.
  Vu sur 1280×720 : les deux portes débordent symétriquement, plus aucune ne recouvre le corps.
  **Non tenu en passe 3** malgré la case cochée : la porte droite était entièrement DANS le corps,
  recouvrant vitrine/casier/tiroir droits — un défaut bloquant qui n'avait pas été détecté car
  la mesure de "part visible" de la passe 3 portait sur le HÔTE (bien positionné), pas sur la
  porte rendue à l'intérieur (mal positionnée) — l'écart entre les deux n'avait pas été vérifié.
- **Point 16 (fond intérieur avec vignette)** — TENU, rééquilibré. Vu sur 360×740 : vitrine et
  casiers ont maintenant la même teinte de fond visuellement. **Non tenu en passe 3** malgré la
  case cochée : « vitrine bien plus sombre que les casiers » n'est plus « le même intérieur »,
  signalé par l'orchestrateur, corrigé.
- **Point 13/14 (socle massif, pieds intégrés)** — TENU, affiné. Vu sur 1280×720 : plus aucun
  tenon résiduel sous le socle. **Non tenu en passe 3** malgré la case cochée (2 petits reliefs du
  sprite `planche.webp` réapparaissaient).

Tous les autres points de la checklist restent dans l'état rapporté en passe 3 (points 4, 13/14,
16, 20 déjà signalés comme retravaillés en passe 3, désormais consolidés en passe 4 ; point 15
« cohérence du bois » toujours en écart résiduel documenté, non retouché en passe 4 faute de
consigne).

## Fichiers livrés

- `site/img/armoire/kit/{fronton,montant,planche,fond,tiroir,pied,porte}.webp` + `MANIFEST.json`
  (24,7 Ko, 7 sprites — `planche.webp` retouché en passe 4)
- `studio/minijeux/tools/armoire-kit.py` (crop `PLANCHE` corrigé)
- `studio/minijeux/tools/armoire-proto/{index.html,proto.css,proto.js}` (proto.css modifié : portes,
  fond)
- `studio/minijeux/tools/armoire-proto-shot.mjs` (mesures pt.1/pt.2/pt.3 passe 4 ajoutées)
- `studio/minijeux/tools/armoire-proto-mesure.py` (pt.2/pt.3 mis à jour)
- `docs/handoffs/rapports/captures/HO-MJ-17-kit-planche-contact.png`
- `docs/handoffs/rapports/captures/HO-MJ-17-proto-{360x740,360x640,320x568,390x844,412x915,800x600,1024x768,1280x720}.png`
- `docs/handoffs/rapports/captures/HO-MJ-17-points-mesure.json`
- ce rapport

## Écarts persistants (non enjolivés, reportés des passes précédentes, non retouchés en passe 4)

1. **Point 15 (cohérence du bois)** : écart de 18,1 sur le canal Bleu entre le montant rendu et la
   référence — non retouché, hors périmètre de cette reprise.
2. **Nombre de rangées à 360×740 = 3** (brief en annonçait 2) — non retouché.
3. `proto.js` reste au-delà de la limite 40 lignes — non retouché.
4. **Point 2 (30-40% requis) : 4 mesures sur 16 légèrement hors fourchette** (27,9% à 42,1%,
   écarts de 0,5 à 2,1 points). Resserrer davantage l'assombrissement ferait probablement sortir
   d'autres viewports de la fourchette dans l'autre sens — un compromis a été choisi plutôt que de
   poursuivre un réglage fin sans fin ; signalé plutôt que masqué.

## Questions pour Papa Yann

1. Les 3 points de la passe 4 sont tenus et mesurés : portes droites symétriques (charnière ±4u,
   centre hors corps sur les 8 viewports), vitrine/casier dans la même fourchette de couleur
   (12/16 mesures strictement 30-40%, les 4 restantes à moins de 2,1 points d'écart), plus aucun
   tronçon sous le socle (pic de luminance locale <1 partout, seuil 12).
2. Le point 2 n'est pas parfaitement dans la fourchette stricte sur 4 des 16 mesures (léger
   dépassement) — acceptable tel quel, ou faut-il un réglage plus fin par taille de rangée (ce qui
   réintroduirait une distinction vitrine/casier que ce point demandait justement d'éliminer) ?
3. Le canal B du montant (point 15, écart résiduel de 18) et le nombre de rangées à 360×740 (3 au
   lieu de 2 annoncé) restent des écarts connus, non traités depuis la passe 2/3 faute de consigne
   — à corriger avant HO-MJ-18, ou acceptés tels quels ?
