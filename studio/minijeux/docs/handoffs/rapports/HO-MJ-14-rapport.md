# HO-MJ-14 — L'Armoire v2 : trois zones — rapport

Statut : **fait**. Pas de commit (consigne du brief).

## Ce qui a changé

`site/index.html` : l'armoire passe d'un seul bloc de casiers à 3 zones dans une grille (`fronton / vitrine / traverse / casiers(1fr) / traverse / bas`). Vitrine = 2 étagères fixes (Dinos+Monde, puis Œufs+Album, ids `#hdr-oeufs`/`#hdr-oeufs-n`/`#hdr-padidi` déplacés dessus). Bas = compartiment décoratif avec 2 tiroirs `aria-hidden`. Portes ouvertes (`porte-ouverte.webp`, miroir CSS `scaleX(-1)`) hors flux de part et d'autre de la vitrine et du bas. Avatar sorti du fronton, en `position:absolute` par-dessus la pièce, mordu à 15 % par l'arche (z-index inférieur au fronton). Nouveau wrapper `.piece` (mur en dégradé CSS + tapis en ellipse floutée) avec les marges de sécurité.

`site/js/armoire.js` : `buildSlots()` ne tire plus Dinos/Monde (fixes en HTML) — seuls les 12 jeux restent dans le tirage aléatoire des casiers. Nouvelle fonction `renderVitrine()` : verrouille `#vit-dinos` tant que TRITRI n'est pas saisi (comportement inchangé), **`#vit-monde` n'est plus verrouillé** (changement de comportement voulu par le brief : « Monde, encyclo pour l'instant », sans la mention « porte fermée » que porte Dinos). `computeLayout()` : rangées de casiers plafonnées à 3 (au lieu de 4), plancher à 1 (au lieu de 2), cases ≥ 80 px (au lieu de 96).

`site/css/armoire.css` : réécrit pour les 3 zones + `.piece` (padding safe-area, tapis), traverses (`planche.webp` étirée), portes ouvertes. `.casier`/`.objet` partagent les mêmes règles (spot, image, étiquette, porte verrouillée).

`site/sw.js` : ajout de `img/armoire/porte-ouverte.webp` au precache ; retrait de `img/armoire/lumiere.webp` (halo objet supprimé en v2, plus référencé nulle part). `node studio/minijeux/scripts/gen-sw-version.mjs` relancé (nouvelle version `b69fe4898f99`).

`studio/minijeux/tests/armoire.spec.mjs` : réécrit — ajoute le viewport `390×844`, vérifie marges armoire (gauche/droite/bas, 2-8 % de la largeur), 4 portes ouvertes entièrement à l'écran, avatar visible ≥ 60 %, boutons vitrine+casiers ≥ 80×80, poids ≤ 260 Ko.

`studio/minijeux/tests/index.spec.mjs` : sélecteur du casier verrouillé mis à jour (`.casier.locked` → `#vit-dinos.locked`, puisque Dinos vit désormais dans la vitrine, plus dans la grille de jeux).

## Bug trouvé et corrigé en cours de route

Premier jet : j'avais mis une traverse `<div class="ar-traverse">` entre le fronton et la vitrine, en plus des deux traverses vitrine↔casiers et casiers↔bas — soit 7 éléments dans la grille `.armoire` pour seulement 6 tracks déclarées (`auto auto auto 1fr auto auto`). Le décalage envoyait le track `1fr` sur une traverse au lieu des casiers : les casiers se retrouvaient en `auto` (hauteur de leur seul contenu, ~96 px) et tout l'espace restant (parfois 400+ px) était perdu sous forme de vide entre la vitrine et les casiers, avec une seule rangée de jeux au lieu de 2-3. Repéré en ouvrant la capture 412×915 (vide énorme sous « Bus/Lettres/Chiffres »). Correction : suppression de la traverse fronton→vitrine (le brief n'en demandait que 2, entre les 3 zones du bas). Vérifié ensuite sur toutes les captures : l'armoire est pleine partout (3×3 dès 360×740).

## Portes de vérification

| # | Porte | Résultat |
|---|-------|----------|
| 1 | `node studio/minijeux/tests/armoire.spec.mjs` (8 viewports dont 390×844) | ✓ 100 % vert |
| 2 | `npm run mj:test index` + `node studio/minijeux/tests/mur-nid.spec.mjs` | ✓ vert (sélecteur `.casier.locked` → `#vit-dinos.locked` mis à jour) |
| 3 | `npm run check` | ✓ exit 0 (0 lien mort, 0 bloquant gabarit ; dettes/écarts affichés sont pré-existants, hors périmètre armoire) |
| 4 | Poids ≤ 260 Ko à 360×740 | ✓ **254,5 Ko** (marge serrée, ~2 %) |
| 5 | Captures ouvertes et comparées à la référence | ✓ (voir ci-dessous) |

## Tableau viewport → rangées de casiers → poids

| Viewport | `--cols` | Rangées de casiers rendues | Casiers affichés |
|---|---|---|---|
| 320×568 | 3 | 2 | 6/12 |
| 360×640 | 3 | 2 | 6/12 |
| 360×740 | 3 | 3 | 9/12 |
| 390×844 | 3 | 3 | 9/12 |
| 412×915 | 3 | 3 | 9/12 |
| 800×600 | 4 | 2 | 8/12 |
| 1024×768 | 5 | 2 | 10/12 |
| 1280×720 | 6 | 2 | 12/12 (armoire pleine) |

Poids images 1er affichage (360×740) : **254,5 Ko** — détail : 9 objets casiers tirés (14-21 Ko chacun) + 4 objets vitrine (Dinos/Monde/Œufs/Album, 15-20 Ko chacun) + pièces structurelles (fronton, socle, planche, tiroir, portes, fond-bois, spot, montant ≈ 46 Ko cumulés).

## Captures (ouvertes et comparées à la référence)

Toutes dans `studio/minijeux/docs/handoffs/rapports/captures/HO-MJ-14-*.png` (320×568, 360×640, 360×740, 390×844, 412×915, 800×600, 1024×768, 1280×720).

Comparaison à `inbox/decoupe/ChatGPT Image 15 sept. 2026, 00_25_01.png` : trois zones lisibles (vitrine à 2 étagères / casiers / bas à 2 tiroirs) ✓, portes ouvertes visibles des deux côtés sur les 8 viewports ✓, avatar mordu par l'arche du fronton (≥ 60 % visible partout, mesuré) ✓, marge de pièce visible mais discrète (2-8 % mesuré gauche/droite/bas) ✓, rien de tronqué à 320×568 (vérifié visuellement + `scrollWidth`/`scrollHeight`) ✓, armoire pleine à 1280×720 (12/12 casiers, aucune case vide) ✓.

## Écarts au brief

- **Aucun** volontaire. Un seul ajustement : suppression de la traverse fronton→vitrine qui n'était pas demandée par le brief (relecture du schéma ASCII § « Les trois zones ») — la corriger a aussi réglé le bug de rangées écrasées.
- Le poids (254,5 Ko / 260 Ko) est passant mais avec peu de marge : un futur tirage aléatoire de casiers plus lourds que la moyenne actuelle (14-21 Ko/objet) pourrait dépasser le seuil. Pas d'action prise (hors périmètre : le brief interdit toute nouvelle génération d'asset).
- `lumiere.webp` retiré du service worker precache car son usage (`.casier .lumiere`, halo lumineux sur l'objet) a été abandonné en v2 pour simplifier le CSS — le fichier reste sur disque (pas dans les fichiers autorisés à supprimer), seule sa précache a été retirée.

## Questions pour Papa Yann

1. Le rendu des portes ouvertes (`porte-ouverte.webp` étiré à 100 % 100 %, un peu compressé horizontalement à 7 % de largeur sous 600 px) te va tel quel, ou tu préfères qu'on recadre une tranche plus fine du visage de la porte (juste la charnière) pour éviter l'écrasement ? Regarde `HO-MJ-14-360x740.png` en particulier.
2. Confirmé : Monde (`#vit-monde`) n'est plus verrouillé en v2 (seul Dinos l'est), conformément à la formulation du brief. Dis-moi si c'était une lecture correcte ou si tu voulais garder les deux verrouillés comme en v1.
3. Poids à 254,5/260 Ko : ça te va comme marge, ou tu veux qu'on réserve un budget plus large (ex. 300 Ko) pour respirer si un futur tirage tombe sur les objets les plus lourds ?
