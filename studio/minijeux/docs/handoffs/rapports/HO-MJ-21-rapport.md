# HO-MJ-21 — rapport d'exécution

Date : 2026-09-19. Brief : `studio/minijeux/docs/handoffs/HO-MJ-21-nid-gains-perdus.md`.

## Ce qui a été changé, fichier par fichier

### `site/js/mj-shell.js` (§4.1)

Ajout de `js/gen/dinos-data.js` dans la liste `SCRIPTS`, juste avant `js/collection.js`
et `js/collection-dinos.js` — c'était le trou identifié par le brief : sur 29 jeux/36,
`collection-dinos.js` ne trouvait jamais la globale `DINOS` et sortait en silence, laissant
le moteur `collection.js` tourner sans catalogue.

Je n'ai volontairement PAS ajouté `js/gen/dinos-assets.js` (que `nid-ui.js` charge, lui,
dans son propre `DEPS`). Ce fichier est le manifeste d'illustration utilisé par le Mur/Padidi
pour savoir quels dinos sont illustrés et filtrer la liste en conséquence ; `collection-dinos.js`
est déjà défensif sur son absence (« si `DINO_ASSETS` n'est pas chargé sur cette page, on ne
filtre pas »), ce qui est le comportement voulu pour un mini-jeu de calcul. Le brief ne
mentionnait que `dinos-data.js`, je suis resté strict au périmètre plutôt que d'ajouter une
dépendance non demandée.

### `site/sw.js` (§4.1, "penser à sw.js")

Ajout de `js/gen/dinos-data.js`, `js/collection.js` et `js/collection-dinos.js` à
`PRECACHE_LIST` (juste après `js/gen/avatars.js`). Sans ça, un mini-jeu ouvert hors-ligne
après le déploiement aurait continué à perdre le catalogue même une fois le fix de
`mj-shell.js` en place, puisque le service worker sert la coquille cache-first et ne
connaissait pas ce nouveau script.

### `site/js/collection.js` (§4.2, §4.3, §4.4)

Trois changements distincts, chacun documenté in situ par un commentaire daté :

1. **`hatchEgg()` (§4.2)** — ajout d'un garde-fou `if (!_items.length) return null;`
   placé AVANT le `s.eggs.splice(eggIndex, 1)`. Avant ce correctif, quand le catalogue
   était vide (`_items` jamais configuré faute de `DINOS`), la fonction retirait quand
   même l'œuf du tableau `eggs`, incrémentait `hatchCount`, puis tombait dans la branche
   `!notOwned.length` et renvoyait `{type:'doublon', item:null}` — l'œuf disparaissait
   pour de faux. Le fix corrige la cause exacte décrite au §2 du brief.

2. **`save()` retourne un booléen (§4.3)** — je n'ai ajouté aucun `try/catch` (il y en
   avait déjà un, avalant tout depuis toujours) : j'ai juste changé le corps du `try` pour
   `return true` et celui du `catch` pour `return false`, au lieu de ne rien renvoyer.
   Aucune sémantique de capture n'a changé, seule l'information de succès est maintenant
   remontée à l'appelant.

3. **`grantReward()` ne ment plus sur un gain non écrit (§4.3)** — les trois chemins de
   sortie (`mastered`, œuf, accessoire) testent désormais `if (!save(s))` et, en cas
   d'échec, renvoient `{ granted: false, type: null, saveFailed: true, ... }` au lieu du
   `granted:true` précédent. Le champ `saveFailed` est une addition à l'API existante
   (jamais présent avant, donc rien ne peut le lire par erreur ailleurs) : il sert à
   distinguer, côté `mj-golden.js`, un refus anti-farm (3 étoiles, message correct pour
   l'enfant) d'un échec d'écriture (aucun message, gain simplement pas annoncé).

4. **Migration du nid au premier `load()` sous profil neuf (§4.4)** — nouvelle fonction
   `_migrateFromBaseKey(profiledKey)`, appelée dans `load()` uniquement quand aucune donnée
   n'existe déjà sous la clé profilée. Elle lit `BASE_KEY` (`maxplay_collection_v1` sans
   suffixe), vérifie qu'il contient vraiment un nid (`eggs`, `pending`, `owned` ou `sac`
   non vides — couvre le format v1 ET v2), copie ce contenu tel quel sous la clé profilée,
   puis **supprime** `BASE_KEY` (`localStorage.removeItem`). C'est un déplacement, pas une
   copie : les deux clés ne peuvent jamais diverger ensuite. Si `storageKey()` retourne déjà
   `BASE_KEY` (aucun profil actif), la fonction sort immédiatement sans rien faire.

### `site/js/collection-dinos.js` (§4.3, "console.warn dans le return muet")

Les trois `return` muets du fichier (DINOS absent, Collection/list invalide, liste vide
après filtrage) portent maintenant chacun un `console.warn` explicite avant de sortir.
Directement issu de L-143 : « un garde de dépendance qui sort en silence doit au minimum
laisser une trace ».

### `site/js/mj-golden.js` (§4.3, "mj-golden.js ne joue pas de théâtre sur un gain non écrit")

Dans `showEnd()`, `noMoreEggsHere` (qui déclenche le message « Tu as déjà toutes les
étoiles ici ! ») est maintenant conditionné par `grant.granted === false && !grant.saveFailed`
au lieu de `grant.granted === false` seul. Sans cette distinction, un échec de sauvegarde
aurait affiché EXACTEMENT le même message que l'anti-farm — un mensonge sur la cause pour
l'enfant/le parent qui lit l'écran. `rewardGranted` reste calculé sur `granted !== false`,
donc aucun théâtre d'œuf/accessoire ne se joue dans les deux cas (anti-farm ou échec de
sauvegarde) — c'était déjà vrai avant mon changement, la correction du §4.3 côté
`collection.js` (ne plus renvoyer `granted:true` sur un save raté) suffisait à couper le
théâtre ; le changement dans `mj-golden.js` corrige uniquement le TEXTE affiché à côté.
Un `console.warn` accompagne le cas `saveFailed` pour la traçabilité.

## Cause non prévue par le brief

`nid-e2e.spec.mjs` (une des trois portes de vérification listées au §5) échoue, mais
**pas à cause de ce chantier**. Investigation : la page `site/index.html` a été
entièrement refaite en armoire modulaire par un chantier antérieur et indépendant
(HO-MJ-13 à HO-MJ-19/20, commits `b298bb61`, `0ddd4688`, `115e89d9` visibles dans
`git log -- site/index.html`) — il n'y a plus de `#app`, plus de `.v-copain`, plus de
"Vallée" avec ses 6 copains cliquables. `nid-e2e.spec.mjs` pilote encore cette UI disparue
(sélecteurs `.v-copain[data-copain="trex"]`, `.vb-porte[data-porte="nid"]`, `.v-bulle`) et
timeout dès la première étape. `NidUI` (le moteur `nid-ui.js` que ce spec veut exercer) est
toujours bien branché — mais depuis l'armoire, via les nouveaux points d'entrée
`#profil-avatar` / deep-link `index.html?open=nid`, pas via la Vallée. Je n'ai pas touché
à ce fichier de spec : il n'est pas dans mes fichiers possédés, la cause est un chantier UI
antérieur totalement étranger à HO-MJ-21, et le réparer aurait dépassé le périmètre (il
faudrait le réécrire sur les sélecteurs de l'armoire, ce qui recoupe potentiellement le
chantier armoire v7 en cours dans une autre session — risque de collision explicitement
signalé dans les contraintes de session). Je le signale plutôt que de le masquer ou de le
contourner en douce.

Preuve que le moteur lui-même n'est pas en cause : `collection.spec.mjs` (moteur pur,
sans DOM de menu) est vert, et ma capture manuelle via le deep-link `index.html?open=nid`
(voir plus bas) montre que `NidUI`/`Collection` fonctionnent parfaitement sur l'armoire
actuelle.

## Sorties des portes (§5 du brief)

Toutes lancées depuis `studio/minijeux/tests`.

**`node run.mjs mj-golden-nid ../../../site/mj-24.html`** — vert avant ET après
modification (16/16 checks), aucune régression sur le contrat transverse A2/A3.

```
✓ mj-golden-nid OK — push autorisé
```

**`node collection.spec.mjs`** — vert, 43/43 checks, y compris tous les scénarios déjà
couverts (anti-farm, migration v1→v2, multi-profil, étoile 3 charges, doré).

```
✓ collection.js OK
```

**`node nid-e2e.spec.mjs`** — rouge, 2 échecs sur 5 checks exécutés (le test s'arrête tôt
sur un timeout). Cause détaillée ci-dessus : UI Vallée disparue, sans rapport avec ce
chantier. Le seul check qui touche vraiment `NidUI`/`Collection` avant le timeout
(« NidUI chargé dynamiquement », « Collection.js chargé sur le menu ») est PASS.

**`node run-all.mjs`** — vert, **36 jeux au menu, 36 PASS, 0 FAIL, 0 sans spec**. C'est la
porte la plus large et la plus probante : elle rejoue une partie complète sur chacun des
36 mini-jeux catalogués, y compris tous ceux qui, avant ce chantier, tournaient sans
catalogue dino (mj-49, mj-06, mj-40, mj-50 à mj-59, etc.).

**`node audit-gabarit.mjs` sur un échantillon (mj-49, mj-24, mj-06, mj-40)** — 3 jeux
cadre conforme, mj-40 a une dette pré-existante et non bloquante (hex CSS en dur dans son
JS inline, sans rapport avec le nid). Aucun BLOQUANT.

**Spec neuve 1 — `mj-49-nid.spec.mjs`** (nouveau fichier) : joue une partie complète sur
`site/mj-49.html` (jeu qui ne charge JAMAIS `dinos-data.js` en dur), vérifie que `DINOS`
est bien accessible malgré ça (piège du `const` top-level testé via `typeof DINOS`, pas
`window.DINOS`), que l'œuf gagné a une famille réelle (`!== '_sans'`), et qu'une éclosion
rend un dino complet (`{id, nom, famille}`, jamais `{type:'doublon'}`) ajouté à `owned`.
Vert, 9/9 checks : `node run.mjs mj-49-nid ../../../site/mj-49.html`.

**Spec neuve 2 — `mj-golden-savefail.spec.mjs`** (nouveau fichier) : stub
`Storage.prototype.setItem` pour lever une `QuotaExceededError` sur toute clé
`maxplay_collection_v1*`, joue une partie complète sur `mj-24`, et vérifie qu'aucun
bouton « Au nid ! » n'apparaît, que la zone œuf reste vide, et que rien n'est écrit sous
la clé collection — tout en confirmant que la fin de partie reste normale par ailleurs
(replay/maison toujours là). Vert, 5/5 checks :
`node run.mjs mj-golden-savefail ../../../site/mj-24.html`.

## Captures — ce qu'elles montrent

Trois captures prises dans `studio/minijeux/docs/handoffs/rapports/captures/` via un
script Playwright jetable (supprimé après usage, comme demandé) :

- **`HO-MJ-21-mj49-fin-partie.png`** : écran de fin de mj-49 après une partie
  sans-faute — « Tu as gagné l'étoile niveau 1 ! », 1ʳᵉ étoile allumée, et le bouton rose
  « 🥚 Au nid ! » présent. Preuve que sur ce jeu, qui n'a jamais chargé `dinos-data.js` en
  dur, le gain est bien accordé et proposé — avant ce chantier, ce bouton apparaissait déjà
  mais menait à un nid qui, une fois soigné, détruisait l'œuf sans rien donner.

- **`HO-MJ-21-nid-avant-eclosion.png`** : la chambre des œufs ouverte via le deep-link réel
  `index.html?open=nid` juste après la partie mj-49. On y voit 3 œufs — deux silhouettes
  encore grises en haut de l'écran, et au centre un œuf clairement TEINTÉ EN BLEU avec 3
  accessoires visibles dans le nid douillet en dessous de lui. C'est la preuve visuelle
  directe que l'œuf a une vraie couleur de famille au lieu du gris uniforme `_sans` d'avant
  le fix.

- **`HO-MJ-21-nid-apres-eclosion.png`** : après le tap accessoire + tap œuf, l'écran a
  glissé vers Padidi (l'album encyclopédique), théâtre de révélation en cours (« Voir sa
  fiche » affiché), compteur en haut à droite à « 1 / 71 ». L'état localStorage relevé au
  même moment confirme : `owned:["ichthyosaurus"]`, `eggs:[]`, `sac:[]`, `hatchCount:1` —
  un dino a bien rejoint la collection, l'œuf et son accessoire sont consommés, le nid est
  vide et sain (pas de perte silencieuse).

## Ce que je n'ai PAS fait, et pourquoi

- **Pas touché à `js/gen/dinos-assets.js`** dans `mj-shell.js` — hors périmètre exact du
  brief (§4.1 ne cite que `dinos-data.js`), et `collection-dinos.js` est déjà défensif sur
  son absence par conception (comportement voulu pour les mini-jeux, différent du Mur).

- **Pas touché à `nid-e2e.spec.mjs`** malgré son échec — cause étrangère à ce chantier
  (refonte armoire antérieure), fichier non listé dans mes possédés, et le réparer
  correctement exigerait de le réécrire sur les sélecteurs de l'armoire, ce qui empièterait
  sur le chantier armoire v7 actuellement en cours dans une autre session. Signalé plutôt
  que masqué.

- **Pas touché `MAX_EGGS`** (§4.5 explicitement hors périmètre, §6 interdits) — non
  modifié.

- **Pas touché `LOVE_HATCH_CHANCE` ni `WARMTH_COST`** (§6 interdits) — non modifiés.

- **Pas touché l'anti-farm 3 étoiles** (§6 interdits) — la garde `stars >= 3` dans
  `grantReward()` est inchangée dans sa logique ; je l'ai seulement laissée retourner un
  objet qui, comme avant, ne porte pas `saveFailed` (donc le message anti-farm reste
  affiché normalement dans ce cas, distinct du cas d'échec d'écriture).

- **Pas ajouté de `try/catch`** — aucun nouveau bloc de gestion d'erreur silencieuse.
  `save()` réutilise le `try/catch` déjà présent, en changeant seulement ce qu'il retourne.

- **Pas propagé `saveFailed`/le booléen de `save()` à `warmEgg()`, `caress()`, `own()`
  ou à la migration v1→v2`** — ces appels à `save(s)` restent tels quels (résultat ignoré).
  Le brief §4.3 ne cite explicitement que `grantReward()` et l'appelant `mj-golden.js` ;
  élargir le filet à `hatchEgg`/`warmEgg`/`caress` aurait dépassé le périmètre décrit et
  multiplié les points de retour à documenter sans qu'un scénario du brief (§3, A/B/C) ne
  les couvre. Une session future pourrait vouloir traiter `warmEgg`/`caress` de la même
  façon si un nouveau symptôme apparaît sur le soin plutôt que sur le gain de fin de partie.

## Nettoyage effectué

Le script de debug jetable et le script de capture Playwright ont été supprimés après
usage (`studio/minijeux/tests/_debug-mur.mjs`, `_capture-nid.mjs`) — seuls
`mj-49-nid.spec.mjs` et `mj-golden-savefail.spec.mjs` restent, comme demandé par le brief
(specs neuves permanentes).

## Doute restant

Le champ `saveFailed` est une extension non documentée dans le contrat existant de
`grantReward()`/`grantCapsule()` (compat v1). Je ne l'ai vu consommé nulle part ailleurs
dans le code (`grep` sur tout `site/js/` ne montre que mes deux points d'écriture et de
lecture), donc pas de risque de collision, mais si un futur chantier introduit un autre
sens à ce champ il faudra vérifier cette convention-ci en premier.
