# Rapport HO-MJ-13 — L'Armoire, nouvel accueil enfant

Statut : **fait**. Exécuté par sous-agent Sonnet, 2026-09-15.

## Résumé

`site/index.html` affiche désormais une armoire en bois (fronton + grille de
casiers + socle à 2 tiroirs) à la place de La Vallée. Personnages animés,
décor, bus qui passe : supprimés (`site/js/mur-scene.js` effacé). Chaque
casier montre un objet ; taper un objet ouvre un jeu, l'encyclopédie, la
chambre des œufs ou l'album. Zéro ascenseur vérifié sur les 7 viewports du
brief. Profil, étoiles, porte parents, code TRITRI, langue, deep-link
`?open=nid`, service worker : tous vérifiés intacts.

## Sortie des 6 portes de vérification

1. **`armoire.spec.mjs`** (`node studio/minijeux/tests/armoire.spec.mjs`,
   spec AUTONOME — pas de `site/armoire.html`, donc `npm run mj:test armoire`
   ne s'applique pas ; `run.mjs` n'a pas été modifié, le cas est documenté en
   tête du fichier) : **56/56 assertions vertes** sur les 7 viewports —
   jamais d'ascenseur (H et V), casiers ≥ 96×96, `--cols` exact, images
   chargées (`naturalWidth>0`), poids ≤ 600 Ko à 360×740, 0 erreur console.
2. **`index.spec.mjs`** (`npm run mj:test index`) : **17/17 vertes** — profil,
   ⭐, `#hdr-oeufs`, `#hdr-padidi`, gate parents (avatar → `#parents-btn` →
   3 s → 28), casier verrouillé → `#code-modal` → `tritri` → déverrouillage,
   deep-link `?open=nid`.
3. **`mur-nid.spec.mjs`** (`node studio/minijeux/tests/mur-nid.spec.mjs`) :
   **25/25 vertes** — chambre des œufs, Padidi (mur d'ombres anti-spoiler),
   théâtre d'éclosion complet (œuf doré → transport → glissement → révélation
   → fiche proposée), tous atteignables depuis `#hdr-oeufs`/`#hdr-padidi`
   (plus aucune dépendance à `.v-copain`/`.vb-porte`).
4. **`npm run check`** : **vert** (0 BLOQUANT), `check-mj-coherence.mjs` :
   36/36 jeux OK, `zone`/`murOrder` intacts (aucun fichier catalog.js touché).
5. **Poids 1er affichage** : mesuré via `page.on('response')` +
   `res.body()` (le header `content-length` n'est pas fiable en `file://`,
   corrigé dans le spec) — **240 Ko à 360×740**, très en dessous des 600 Ko.
6. **Captures ouvertes et jugées** (Read, pas juste générées) — voir
   ci-dessous. Un bug de layout a été trouvé et corrigé pendant cette
   inspection (voir « Écart corrigé en cours de route »).

## Tableau viewport → cols×rows → poids (mesuré, méthode `res.body()`)

| Viewport | `--cols` | rows réels | casiers affichés | poids images |
|---|---|---|---|---|
| 360×740 | 3 | 4 | 12 | 240 Ko |
| 360×640 | 3 | 4 | 12 | 240 Ko |
| 320×568 | 3 | 4 | 12 | 240 Ko |
| 412×915 | 3 | 4 | 12 | 240 Ko |
| 800×600 (paysage) | 4 | 4 | 16 (pool entier) | 307 Ko |
| 1024×768 | 5 | 3 | 15 | 289 Ko |
| 1280×720 | 6 | 2 | 12 | 240 Ko |

La grille est toujours **pleine** (jamais de dernière rangée à moitié vide) :
`armoire.js` tronque le nombre de casiers affichés au multiple de `cols` le
plus proche par en dessous — à 1280×720 ça donne exactement 6×2=12, comme
souhaité par le brief (« pas une bande de bois vide »).

## Captures

Toutes dans `studio/minijeux/docs/handoffs/rapports/captures/` :
`HO-MJ-13-360x740.png`, `-360x640.png`, `-320x568.png`, `-412x915.png`,
`-800x600.png`, `-1024x768.png`, `-1280x720.png`. Chacune ouverte et
inspectée visuellement (pas seulement générée) :
- Objets **posés** sur la planche (align `flex-end`), pas flottants.
- Montants/planches visuellement raccordés à la structure du fronton/socle.
- Rien de tronqué à 320×568 hormis les étiquettes trop longues en ellipsis
  sur 1 ligne (« Le monde en… », comportement voulu par le brief).
- À 1280×720 et 1024×768 la grille est pleine (6×2 et 5×3), pas de bande de
  bois vide.

## Écart corrigé en cours de route (pas dans le brief, trouvé à l'inspection)

En jugeant les captures larges, `.armoire { max-width:720px }` (mon 1er jet,
calé sur la largeur native du fronton/socle) écrasait 6 colonnes dans une
armoire de 720 px de large réelle même à 1280 px de fenêtre → colonnes de
120 px, étiquettes tronquées inutilement (« Le monde en… », « Les dinos
jo… ») et grand espace noir inutilisé de chaque côté. Corrigé en portant le
plafond à `max-width:1200px` (aligné sur le dernier breakpoint `--cols`) :
étiquettes entières, armoire qui remplit vraiment l'écran large. Toutes les
portes revérifiées vertes après correction.

## Écarts au brief (choix faits, à confirmer par Papa Yann)

1. **Portes verrouillées cachent tout, pas juste l'objet** : `.porte`
   (`z-index:2`, `inset:0`) couvre aussi l'étiquette (« Les dinos », « Le
   monde ») — comportement plus fort que le `opacity:.4` prévu au départ
   pour objet+étiquette (qui reste dans le CSS mais n'a plus d'effet visible
   puisque la porte les recouvre entièrement). Rendu : un casier fermé ne
   révèle RIEN de ce qu'il cache (mystère total), ce qui est cohérent avec le
   thème « armoire fermée » et lisible sur les captures — mais diffère du
   texte du brief qui semblait vouloir un objet/étiquette dimmed VISIBLE
   sous la porte. Je n'ai pas retouché car ça rend bien ; à valider.
2. **Pas de `MJi18n`** : vérifié absent d'`index.html` avant la bascule
   (aucune trace, aucun `<script>` i18n sur cette page) — les 16 étiquettes
   sont donc en **FR brut** dans `armoire.js` (`SLOTS`), comme le brief
   l'anticipait en repli.
3. **`nid-e2e.spec.mjs`** (hors périmètre du brief, non touché) dépend
   entièrement de `.v-copain`/`.vb-porte`/`MurScene.init` et **va casser**
   après cette bascule (plus aucun de ces sélecteurs n'existe). Il faudra un
   futur handoff pour le réécrire sur les tiroirs `#hdr-oeufs`/`#hdr-padidi`,
   comme fait ici pour `mur-nid.spec.mjs`.
4. **`run.mjs` non modifié** : `npm run mj:test armoire` échoue avec un
   message orientant vers `node studio/minijeux/tests/armoire.spec.mjs`
   (même mécanisme que `mur-nid`/`collection` déjà en place) — pas ajouté de
   cas spécial dans `run.mjs`, jugé inutile vu que le mécanisme d'orientation
   existe déjà et fonctionne.
5. **Pièces images non utilisées dans le mapping** (livrées par HO-MJ-12,
   non retouchées) : `obj-dino.webp` et `obj-livres-jeux.webp` — présentes
   dans `site/img/armoire/` mais absentes de la table `SLOTS` (16 objets
   déjà couverts par le brief). `porte-ouverte.webp` également non utilisée
   (aucun état "porte en train de s'ouvrir" dans cette V1). Rien de mal
   découpé constaté sur la planche-contact — pas de signalement qualité.
6. **`site/js/mur.js`** : au-delà de la liste stricte du brief, j'ai aussi
   retiré `vignetteHtml`, `starsHtml`, `fillBusVignettes`/`_fillBus` (morts
   depuis la suppression de `mur-scene.js`, plus aucun appelant) pour éviter
   du code mort — ils n'étaient référencés que par `mur-scene.js` (vérifié
   par grep avant suppression). `mur.js` : 293 lignes (contre 424 avant).

## Fichiers touchés

- `site/index.html` (réécrit), `site/js/armoire.js` (nouveau, 175 lignes),
  `site/css/armoire.css` (nouveau, ~120 lignes)
- `site/js/mur.js` (élagué, 424→293 lignes), `site/css/mur.css` (élagué,
  757→324 lignes), `site/js/mur-scene.js` (supprimé)
- `site/sw.js` (PRECACHE_LIST à jour) + `site/js/gen/sw-version.js`
  (régénéré via `gen-sw-version.mjs`)
- `studio/minijeux/tests/index.spec.mjs` (réécrit), `mur-nid.spec.mjs`
  (adapté), `armoire.spec.mjs` (nouveau)
- Ce rapport + 7 captures dans `rapports/captures/`

## Questions pour Papa Yann

1. Les portes verrouillées cachent l'étiquette en plus de l'objet (mystère
   total plutôt que dimmed visible) — tu gardes ce rendu ou tu préfères
   qu'on voie le nom du casier même fermé ?
2. `nid-e2e.spec.mjs` va casser (dépend de la scène supprimée) : on ouvre un
   HO-MJ-14 bis pour le réécrire, ou on le retire du harnais en attendant ?
3. `obj-dino.webp`/`obj-livres-jeux.webp` (non utilisées) : à garder en
   réserve pour un futur casier, ou à supprimer du dossier `armoire/` ?
