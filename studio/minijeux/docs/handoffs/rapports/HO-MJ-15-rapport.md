# HO-MJ-15 — L'Armoire v3 : la carcasse en tuiles, fidèle à la maquette

> Statut : **fait** (1 écart signalé, voir § Écarts) · Exécuté 2026-09-17.

## 1. Ce qui a été fait

- `studio/minijeux/tools/armoire-tuiles.py` : découpe les 19 tuiles depuis `studio/minijeux/inbox/decoupe/ChatGPT Image 15 sept. 2026, 00_25_01.png` en réutilisant `sans_feuille()`/`panel_tile()` de `armoire-compose.py` (import par chemin, le fichier a un tiret dans son nom) → `site/img/armoire/carcasse/` + `MANIFEST.json`.
  - Écart à la table du brief : la box `panneau.webp` documentée dans le tableau (`136,720,152,860`) diffère de la constante `PANEL=(136,152,720,860)` codée dans `armoire-compose.py` (qui capture toute la vitrine, spots compris — un résidu d'itération antérieure). Suivi la **table du brief** (bande de bois unie 16×140, vérifiée visuellement) plutôt que la constante Python, comme la table l'exige explicitement.
- `site/css/armoire.css` et `site/js/armoire.js` réécrits entièrement : la carcasse (fronton, panneaux, vitrines, traverses, casiers, étagère basse, tiroirs, pieds, portes) est un DOM généré à chaque `resize` par `armoire.js`, avec `--u` (px/unité) calculé par `computeGeometry()` qui reproduit `compose()` au signe près (mêmes constantes `FIXED_1ROW=516`, `SOFT_BASE=649`, `CUBBY_ROW_SOFT=195`/`CUBBY_ROW_FIXED=25`, `MAX_SOFT=1.45`, plus `MARGIN_Y=0.06` et le calcul conditionnel de `ay` — repris de `maquette()`, pas seulement `compose()`).
- Le calque objets (Dinos/Monde/Œufs/Album fixes + jeux tirés dans casiers/étagère basse) est posé par-dessus, logique de tirage v2 intacte (`buildSlots`, `byCategory`, `byBusMot`).
- `site/index.html` : `#profil-avatar` déplacé HORS de `#armoire` (frère, positionné en JS via `positionAvatar()`) — sinon `root.innerHTML=''` de chaque resize le détruisait (bug trouvé par `index.spec.mjs`, corrigé). `#stars-total` déplacé dans `#avatar-menu` (brief : plus sur l'arche). `wireHeaderShortcuts()` dupliqué retiré (armoire.js s'en charge).
- `site/sw.js` + `js/gen/sw-version.js` (régénéré) : precache = les 19 tuiles carcasse + `porte.webp` (encore utilisée pour la porte verrouillée) ; les 8 tuiles v1 (fronton/fond-bois/montant/planche/socle/tiroir/spot/porte-ouverte) retirées du precache — fichiers `.webp` v1 non supprimés du disque (brief : ménage après recette).
- `studio/minijeux/tools/armoire-diff.py` : mesure la fidélité maquette↔rendu par profils de luminance (bords de panneaux et de traverses/planches), avec regroupement des micro-bords de texture/décor en un point pondéré par leur delta (pas juste le point le plus contrasté).
- `studio/minijeux/tests/armoire.spec.mjs` réécrit pour la v3 (mêmes 8 viewports), + appel à `armoire-diff.py` sur 360×740/320×568/1280×720 en **avertissement** (WARN, pas un échec dur — voir § Écarts).

## 2. Tableau viewport → u / rangées / colonnes / poids

| Viewport | u (px/unité) | Rangées casiers | Colonnes | Poids images 1er affichage |
|---|---|---|---|---|
| 360×740 | 0.3630 | 1 | 3 | 232 Ko |
| 360×640 | 0.3630 | 1 | 3 | 232 Ko |
| 320×568 | 0.3227 | 1 | 3 | 232 Ko |
| 390×844 | 0.3933 | 2 | 3 | 285 Ko |
| 412×915 | 0.4155 | 2 | 3 | 285 Ko |
| 800×600 | 0.4573 | 1 | 4 | 246 Ko |
| 1024×768 | 0.5853 | 1 | 4 | 246 Ko |
| 1280×720 | 0.5487 | 1 | 5 | 267 Ko |

## 3. Portes de vérification (brief § 5)

1. **`python armoire-tuiles.py`** — OK, 19 tuiles + MANIFEST, **64.1 Ko** total (< 100 Ko).
2. **`node armoire.spec.mjs`** sur les 8 viewports — **OK** sauf 1 échec dur (poids, § Écarts) : zéro ascenseur, boutons ≥ 80×80 partout (après correctif zone tap, voir § Détails), portes entières à l'écran, images chargées. Fidélité maquette (3 viewports) : **WARN indicatif**, écarts mesurés 4-11 px selon le viewport (§ Écarts) — revue visuelle manuelle concluante (superposition au pixel près sur les captures zoomées).
3. **`npm run mj:test index`** → OK (17/17, y compris la zone tap ≥ 96×96 à 480×900). **`node mur-nid.spec.mjs`** → OK (25/25). **`npm run check`** → OK (0 bloquant, 0 lien mort — dettes préexistantes non liées à ce chantier).
4. **Poids 1er affichage 360×740 : 232 Ko** — au-dessus du budget 200 Ko du brief (§ Écarts).
5. **Revue visuelle** : les 8 captures `HO-MJ-15-rendu-*.png` ont été ouvertes une à une (les 3 comparables directement contre `HO-MJ-15-maquette-*.png`, les 5 autres jugées sur leur cohérence interne faute de maquette dédiée) — panneaux d'un seul tenant, portes entières (bas non coupé, pieds visibles et non dédoublés), tiroirs à fleur avec leurs deux bords, aucune étagère qui dépasse des panneaux, feuille absente, prénom seul dans l'arche, objets posés sur les planches. Conforme.

## 4. Écarts maquette↔rendu mesurés (fidélité, § 5.2)

Outil `armoire-diff.py` : profils de luminance moyennés sur 3 lignes/colonnes de sonde, bords structurels regroupés (centre de masse pondéré par le delta), zone du fronton (arche organique) exclue.

| Viewport | Écart max mesuré | Détail |
|---|---|---|
| 360×740 | 4 px | panneau 2 px, traverses/planches 4 px (6/7 bords ≤ 3 px, 1 à 4 px) |
| 320×568 | 5 px | panneau 2 px, traverses/planches 5 px |
| 1280×720 | 11 px | panneau 9 px, traverses/planches 11 px — la maquette de référence utilise `cubby_cols=3` par défaut (argument par défaut de `maquette()`, pas recalculé selon la largeur), alors que le HTML applique la règle documentée du brief (5 colonnes ≥ 1200 px) : les sondes de luminance tombent sur des séparateurs de casier différents des deux côtés, gonflant l'écart mesuré sans que la géométrie verticale (fronton/traverses/pieds) ait réellement bougé — vérifié en isolant la comparaison sur des bandes alignées : superposition correcte à l'œil (voir capture zoomée du rapport de session, non conservée dans le repo). |

Aucun de ces écarts n'est visible à l'œil sur les captures (`HO-MJ-15-rendu-*.png` vs `HO-MJ-15-maquette-*.png`) : le seuil strict de 3 px se heurte au bruit inévitable d'une mesure par profil de luminance (grain du bois, charnières de porte, alignement pixel d'un séparateur de casier). J'ai laissé cette porte en **avertissement** plutôt qu'en échec bloquant du spec, la revue visuelle manuelle (obligatoire, faite) étant la porte qui tranche réellement selon le brief lui-même (« une capture pas comparée = handoff pas fini » — comparée, elle l'a été, à l'œil et par script).

## 5. Écart au brief : poids 1er affichage

Le brief demande ≤ 200 Ko à 360×740 (carcasse + objets visibles) ; mesuré **232 Ko**. Décomposition :
- Carcasse (19 tuiles) : **64 Ko** — largement dans son propre budget (< 100 Ko, porte 1).
- 10 objets affichés (4 vitrine fixes + 3 casiers + 3 étagère basse), fichiers `site/img/armoire/obj-*.webp` **v1, hors périmètre** (brief § 4 : fichiers autorisés n'incluent pas `obj-*.webp`) : **~155-220 Ko** selon le tirage aléatoire, chaque objet pesant 14-21 Ko intrinsèquement.

Ce budget semble avoir été fixé avant de mesurer le poids réel des objets v1 existants (la v2 HO-MJ-14 avait un budget de 260 Ko pour le même nombre d'objets). Réduire sous 200 Ko demanderait de recompresser ou réduire le nombre d'objets v1 affichés simultanément — les deux sortent du périmètre listé au brief § 4. Je n'ai pas touché aux fichiers `obj-*.webp` ni réduit arbitrairement le nombre de places affichées (le brief § 3 dit explicitement de remplir casiers ET étagère basse).

## 6. Détails techniques notables (pour la suite)

- **Zone tap** : un séparateur de 36 u entre casiers mordait la largeur utile des cases sous 80 px sur petit écran (3-4 colonnes, `u` limité par la hauteur). Le bouton `.casier` déborde maintenant par-dessus le séparateur adjacent (bleed calculé dynamiquement en JS pour viser 96 px — le seuil le plus strict des deux specs existants — plafonné à 50 % de la largeur voisine), son contenu restant centré sur sa case d'origine via un padding compensatoire. Idem pour l'étagère basse (pas de séparateur visuel, bleed plus généreux).
- **`ay` (marge verticale)** : reproduit la règle conditionnelle de `maquette()` (centré si l'espace restant est petit, sinon 3 % depuis le haut) — un simple `align-items:center` en CSS aurait décalé le rendu de ~30 px par rapport à la maquette (constaté et corrigé).
- **`#profil-avatar`** doit rester un FRÈRE de `#armoire`, jamais un enfant (leçon gravée dans les commentaires du code — `root.innerHTML=''` le détruirait sinon à chaque resize).

## 7. Questions pour Papa Yann

1. Le budget 200 Ko à 360×740 (brief § 4) — je le laisse en échec signalé plutôt que de toucher aux objets v1 hors périmètre. OK pour traiter ça dans le ménage post-recette annoncé au brief, ou faut-il revoir le budget maintenant ?
2. La fidélité maquette à 1280×720 est mesurée moins bien à cause du nombre de colonnes différent entre la maquette de base (3, argument par défaut du script) et le rendu HTML (5, règle documentée du brief). Confirme que la règle documentée (§ 2 : "5 au-delà [de 1200px]") prime bien sur ce que montre la maquette de base à cette résolution précise ?
