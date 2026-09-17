# HO-MJ-17 — L'Armoire v4 : kit de 7 sprites + lumière CSS, prototype statique

> Statut : fait · Ouvert le 2026-09-17 · Exécutant : 1 sous-agent Sonnet · Orchestrateur : session principale.
> Rapport : `rapports/HO-MJ-17-rapport.md`.
> Origine : recette de la v3 (HO-MJ-15) par Papa Yann le 2026-09-17, vingt points, résumés en une phrase : « corps plus large, composants moins nombreux visuellement, aucun raccord apparent, portes épaisses et douces, grandes surfaces simples, tiroirs mieux intégrés et lumière largement gérée par le moteur/CSS plutôt que pré-rendue dans les sprites ». Et une architecture qu'il impose : « fond + fronton/cadre principal, 1 planche horizontale réutilisable, 1 montant vertical, 1 modèle de porte gauche/droite, 1 tiroir, 1 spot. Les ombres, halos lumineux et petites variations de profondeur en CSS. Ça évitera l'effet puzzle. »
> Règle L-136 : on ne touche PAS à `site/index.html` dans ce brief. On livre un **prototype statique** (une page HTML autonome, sans objets, sans JS métier) que Papa Yann valide sur captures. L'intégration dans l'accueil (objets, avatar, tests) sera HO-MJ-18, une fois le visuel validé.

## Objectif (résultat observable)

Une page `studio/minijeux/tools/armoire-proto/index.html` qui, ouverte en `file://` à 360×740, 320×568, 412×915 et 1280×720, montre une armoire d'un seul tenant, construite à partir de **7 sprites** et de CSS, sans aucun raccord visible, sans ascenseur, avec le prénom « Champion » en HTML dans le fronton. Aucun objet dedans (calque à part, hors périmètre). Capture de chaque viewport à côté de la référence `studio/minijeux/inbox/decoupe/ChatGPT Image 15 sept. 2026, 00_25_01.png`.

Ouvre la référence (Read) avant de coder, puis la capture v3 `rapports/captures/HO-MJ-15-rendu-360x740.png` pour voir ce qu'on quitte. Les vingt points de Papa Yann sont la checklist du § 6 : chacun doit être visiblement traité.

## 1. Le kit — `site/img/armoire/kit/` (nouveau dossier), script `tools/armoire-kit.py`

Script Python rejouable (< 200 lignes, table des crops en tête, PIL + numpy dispo). Source principale = la référence (1024×1536, fond transparent), après `sans_feuille()` importé depuis `tools/armoire-compose.py`. Une seule pièce vient d'une autre image : la porte (voir plus bas), et elle est **harmonisée** à la référence.

| Sprite | Source, crop (x0,y0,x1,y1) en px de la référence | Rôle |
|---|---|---|
| `fronton.webp` | référence `(133,0,890,165)` — épaules comprises, trimé sur l'alpha | l'arche entière, `background-size:100% 100%`, affichée **plus haute** (190 u au lieu de 165 : PY veut du volume). Ombre portée dessous en CSS. |
| `montant.webp` | référence, bande verticale prise dans la face claire du cadre latéral gauche, largeur ≈ 30 px, hauteur ≈ 140 px, zone `(136..170, 700..860)` à ajuster à l'œil ; rendue **raccordable** en repeat-y par miroir vertical (140 → 280) | les 2 montants latéraux (35 u de large) ET les séparateurs verticaux des casiers (même sprite, 36 u) : même vocabulaire, PY le demande explicitement. Lumière sur un bord, ombre sur l'autre : si le crop ne les a pas, les ajouter en CSS (`box-shadow: inset`), pas dans l'image. |
| `planche.webp` | référence, la traverse `(185,653,860,685)` (32 px, elle a une vraie tranche avant) | TOUTES les planches horizontales : planche de vitrine, planche entre rangées de casiers, traverses, socle. Étirée `100% 100%`, hauteur selon le rôle (planche 36 u, traverse 40 u, socle 50 u). Tranche avant plus claire + ombre sous la planche en CSS. |
| `fond.webp` | référence, carré de 96×96 pris dans l'intérieur d'un casier `(230..326, 720..816)` puis miroir 2×2 → 192×192 sans couture | fond intérieur de toutes les cases, `background-repeat`. Le gradient (coins sombres, derrière les montants) est en CSS par-dessus : `radial-gradient` + `box-shadow: inset`. |
| `tiroir.webp` | référence, UN tiroir de la rangée `1122..1310` : mesurer l'un des deux (à l'œil : `x ≈ 205..515`, `y ≈ 1140..1298`), trimé | les 2 tiroirs, chacun à ~47 % de la largeur intérieure, hauteur 190 u (PY : +15-25 % par rapport à la v3, cadre épais, creux pour les doigts visible). Relief du cadre accentué en CSS (`filter: drop-shadow` + ombre interne). |
| `pied.webp` | référence, pied gauche `(133,1310,215,1385)` trimé, droite = `scaleX(-1)` | pieds plus larges (80 u) et « qui portent » : collés sous le socle, pas flottants. |
| `spot.webp` | référence, un des deux spots ronds de la vitrine haute (dans `200..830 × 170..215`, mesurer) | le spot physique seulement. Le **halo est en CSS** : `radial-gradient` chaud, court, progressif (+ `filter: blur()` si besoin). Jamais deux colonnes nettes. |
| `porte.webp` | `site/img/armoire/porte.webp` actuel (v1, porte fermée plate avec anneau, source `inbox/decoupe/…00_23_44 (4).png`) régénérée ici à 320 px de haut, **harmonisée** : ajuster luminance / saturation / contraste (moyenne et écart-type par canal, en Lab ou HSV) sur un échantillon de bois de la référence — la face d'une porte ouverte `(60..150, 300..600)`. Une seule porte flat, la gauche ; la droite est son miroir. | les 4 portes (haut et bas, gauche et droite) : **même sprite**, redimensionné. Ouverture = CSS 3D : `transform: perspective(…) rotateY(±58deg)`, `transform-origin` sur le bord charnière. Épaisseur = pseudo-élément (face de tranche plus sombre, 8-10 u), coins arrondis (`border-radius`). Deux charnières identiques par porte (pseudo-éléments ou petit crop de charnière de la référence, même taille, même retrait du bord, même axe vertical) — pas de « rails » ni de petits éléments horizontaux le long des côtés. |

Encodage : `WEBP quality=80, method=6`, alpha conservé. Écrire `kit/MANIFEST.json` (w, h, octets, crop, source). Poids du kit **≤ 80 Ko**. Planche-contact `rapports/captures/HO-MJ-17-kit-planche-contact.png` (les 8 fichiers sur damier + un test de raccord : montant répété ×4 en Y, fond ×3×3, planche étirée ×2 en largeur) — **à ouvrir** et regarder avant de passer au prototype.

**Harmonisation** (PY : « certaines pièces semblent venir d'assets différents ») : tous les sprites, même ceux de la référence, passent par la même fonction `harmonise(img, sample)` qui aligne la moyenne et l'écart-type de luminance/saturation sur l'échantillon. Sur les sprites de la référence l'effet est nul ou presque, sur la porte il est nécessaire. Vérifier sur la planche-contact que la porte ne jure plus.

## 2. Le modèle de mise en page — unités et rangées

Une seule variable `--u` (pixel par unité) posée sur `#armoire` par un `proto.js` de 40 lignes max (calcul au `load` et au `resize`, rien d'autre). Unités = px de la référence à l'échelle du **corps** :

- **Largeur naturelle du corps** = montant 35 + intérieur 630 + montant 35 = **700 u**. Les portes ne comptent PLUS dans la largeur : elles débordent (`overflow: visible`, `position: absolute`) sur la marge et, sur téléphone, peuvent sortir de l'écran (PY : « même si 20-30 % d'une porte sort de l'écran, ce n'est pas grave »). Le `body` garde `overflow: hidden` (jamais d'ascenseur, ni horizontal).
- **Marge latérale** : 9 % de chaque côté sous 600 px (corps = 82 % de l'écran, +23 % vs la v3), 4 % au-delà (corps plafonné à 1100 px). Marge basse 3 %, haut : safe-area seulement.
- **Portes** : sprite flat de largeur 315 u (une demi-largeur intérieure), rotation `rotateY` 55-65° avec `perspective` telle que la porte projetée fasse **18-22 % du corps** ; au moins **45 % de la porte reste visible** à 320 et 360 px. Portes hautes : du bas du fronton au bas de la traverse haute ; portes basses : de la traverse basse au socle inclus (le même sprite, seulement plus court). Elles ne couvrent jamais les casiers.
- **Rangées** (u ; « souple » = absorbe la hauteur) :

| Rangée | u | Souple | Note |
|---|---|---|---|
| fronton | 190 | non | prénom en HTML, centré, à ~45 % de la hauteur du fronton, `Fredoka One`, gravé (ombre claire dessous) — plus bas et plus aéré que la v3 |
| vitrine-1 | 200 | oui | spot + halo CSS |
| planche | 36 | non | |
| vitrine-2 | 200 | oui | |
| traverse | 40 | non | |
| casiers ×n | 150 | oui, **plafond ×1,2** | 3 colonnes sous 600 px, 4 de 600 à 999, 5 au-delà ; séparateurs = `montant.webp` 36 u ; PY : cases « basses et larges », jamais plus hautes que larges |
| planche entre rangées | 36 | non | seulement entre deux rangées de casiers |
| traverse | 40 | non | |
| bas-étagère | 120 | oui | compacte, PY : « rabaisser l'étagère supérieure de cette zone » |
| tiroirs | 190 | non | 2 tiroirs à ~47 % chacun, 2 % de jeu, à fleur des montants |
| socle | 50 | non | traverse basse massive (PY : « donner du poids ») |
| pieds | 60 | non | pieds larges |

Échelle : `u = min( corpsW / 700 , hauteurDispo / (fixe + 0.85 × souple) )`. Puis, tant qu'il reste ≥ (150+36) u de hauteur, ajouter une rangée de casiers (max 3). Le reste est réparti sur les rangées souples, plafond ×1,45 (vitrines, bas-étagère) et ×1,2 (casiers). S'il reste encore de la place, l'armoire est plus courte et le mur se voit : jamais l'inverse. À 360×740 le calcul donne 2 rangées de casiers et un corps de ~295 px : vérifier et le noter dans le rapport.

## 3. Le rendu — « un seul meuble »

- **Ordre des calques** (z) : fond des cases < montants latéraux (un seul élément par côté, `repeat-y`, du bas du fronton au socle — continus, jamais interrompus) < planches et traverses (elles **chevauchent** les montants de 3-4 px : `margin: 0 calc(-3 * var(--u))`) < séparateurs de casiers (posés sur le fond, sous la planche du dessus, chevauchement 3 px) < tiroirs < fronton et pieds < portes < prénom. Chaque jonction est recouverte par la pièce du dessus : **aucun trait de raccord ne doit être visible** — c'est LE défaut principal selon PY.
- **Lumière CSS**, pas dans les sprites : halo de spot `radial-gradient(ellipse at top, rgba(255,214,140,.55), transparent 60%)` sur la vitrine haute ; chaque case a une ombre interne `box-shadow: inset 0 10px 18px rgba(0,0,0,.45), inset 0 -6px 10px rgba(0,0,0,.25)` et une vignette (coins et zones derrière les montants plus sombres) ; sous chaque planche une ombre portée douce (`box-shadow: 0 4px 8px rgba(0,0,0,.4)`), tranche avant plus claire (`border-top` ou dégradé 3 px) ; sous le fronton une ombre ; les portes ont une ombre projetée sur le corps du côté charnière.
- **Cohérence bois** : un seul `filter` global éventuel sur `#armoire` (jamais un par pièce) ; si une pièce jure encore, c'est le kit qu'on corrige (`harmonise`), pas le CSS.
- Zéro animation. Pas de police en `vw` pur (`clamp`). Prénom = seul texte.

## 4. Fichiers autorisés

`site/img/armoire/kit/**`, `studio/minijeux/tools/armoire-kit.py`, `studio/minijeux/tools/armoire-proto/{index.html,proto.css,proto.js}` (CSS ≤ 250 lignes, JS ≤ 40), `studio/minijeux/tools/armoire-proto-shot.mjs` (Playwright depuis `studio/minijeux/tests/node_modules`, capture `file://` de la page aux 8 viewports 360×740, 360×640, 320×568, 390×844, 412×915, 800×600, 1024×768, 1280×720 → `rapports/captures/HO-MJ-17-proto-{W}x{H}.png`, et mesure : `document.documentElement.scrollHeight <= innerHeight`, `scrollWidth <= innerWidth`, largeur du corps / innerWidth, part visible de chaque porte), `rapports/HO-MJ-17-rapport.md`. **Rien dans `site/` sauf `img/armoire/kit/`** : pas `index.html`, pas `armoire.js/css`, pas `sw.js`. Ne rien supprimer.

## 5. Portes de vérification

1. `python studio/minijeux/tools/armoire-kit.py` : kit ≤ 80 Ko, MANIFEST écrit, planche-contact ouverte et regardée (montant raccordable, fond sans couture, porte harmonisée).
2. `node studio/minijeux/tools/armoire-proto-shot.mjs` : 8 captures, aucun ascenseur, corps ≥ 80 % de la largeur sous 600 px, portes ≥ 45 % visibles, hauteur de case de casier ≤ sa largeur.
3. Chaque capture **ouverte** (Read) à côté de la référence, et la checklist § 6 cochée point par point dans le rapport, avec « vu sur la capture X » à chaque ligne. Une ligne non vérifiée à l'œil = brief pas fini. Itérer jusqu'à ce que les vingt lignes tiennent.

## 6. Checklist Papa Yann (ses vingt points, condensés)

1. Corps plus large, moins « colonne » (≥ 80 % de la largeur sur téléphone).
2. Aucune jonction visible entre pièces ; montants continus derrière les planches.
3. Côtés propres : montant + 2 charnières par porte, aucun « rail » ni petits éléments horizontaux.
4. Portes épaisses, coins arrondis, rotation 3D douce 55-65°, pas à 90°.
5. Charnières identiques (taille, retrait, axe) sur les 4 portes, portes visiblement attachées au montant.
6. Fronton haut, bord arrondi, ombre dessous.
7. Prénom en HTML, plus bas, aéré, jamais dans l'image.
8. Planches épaisses, tranche avant claire, ombre dessous.
9. Séparateurs verticaux avec du corps, même vocabulaire que les montants.
10. Casiers bas et larges.
11. Bas-étagère compacte, tiroirs remontés.
12. Tiroirs plus hauts (+15-25 %), presque toute la largeur, cadre en relief, creux pour les doigts.
13. Socle bas massif.
14. Pieds plus larges, intégrés au socle.
15. Bois cohérent entre toutes les pièces (portes pas plus claires, montants pas plus sombres).
16. Fond intérieur avec vignette (coins et derrière les montants plus sombres).
17. Halo des spots diffus, court, chaud, en CSS.
18. Ombres douces et reflets dans les cases sans spot.
19. Même sprite de porte en haut et en bas.
20. Portes qui débordent du cadre (jusqu'à hors écran), corps presque pleine largeur.

## Hors périmètre

`site/index.html`, `armoire.js`, `armoire.css`, `sw.js`, objets, avatar, étoiles, tests `armoire.spec`/`index.spec`, tiroirs cliquables, globe/volcan animés. Tout ça = HO-MJ-18 après validation du prototype par Papa Yann.

## Rapport attendu

`rapports/HO-MJ-17-rapport.md` : portes 1-3 avec sorties, tableau viewport → u / rangées / largeur du corps / part visible des portes, checklist § 6 cochée avec la capture témoin, écarts au brief, questions. Statut `fait` ici. Pas de commit.
