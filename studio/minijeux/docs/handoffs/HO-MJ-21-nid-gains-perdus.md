# HO-MJ-21 — Le nid perd les gains : catalogue dino absent, échecs silencieux

> Statut : **livré** (2026-09-19). Rapport :
> `studio/minijeux/docs/handoffs/rapports/HO-MJ-21-rapport.md`. Portes 4/5 vertes
> (`mj-golden-nid`, `collection.spec.mjs`, `run-all.mjs` 36/36, `audit-gabarit.mjs`) ;
> `nid-e2e.spec.mjs` rouge pour cause étrangère à ce chantier (UI "Vallée" remplacée
> par l'armoire dans un chantier antérieur, détaillé dans le rapport).
> Origine : retour Papa Yann 2026-09-19 — « on a fait 5-6 jeux
> de calcul, on a gagné aucun objet aucun œuf », nid vide **et** sac vide.
> Fichiers possédés : `site/js/mj-shell.js`, `site/js/collection.js`,
> `site/js/collection-dinos.js`, `site/js/nid-ui.js`, `site/sw.js`,
> `studio/minijeux/tests/collection.spec.mjs`, `nid-e2e.spec.mjs`,
> `mj-golden-nid.spec.mjs`.
> Tickets : EP-129 à EP-133 (`studio/minijeux/memory/TODO.md`). Leçons : L-142, L-143.

## 1. Le symptôme, et pourquoi les premières pistes étaient fausses

Papa Yann joue 5-6 mini-jeux de calcul avec Max, bonnes parties, et à l'arrivée :
zéro œuf, zéro accessoire. Le nid est vide, le sac aussi.

Deux hypothèses ont été explorées et **écartées par Papa Yann lui-même** — elles
sont notées ici pour qu'on ne les re-propose pas :

- *« l'anti-farm 3 étoiles coupe les gains »* — vrai mécaniquement, mais hors sujet :
  c'étaient des jeux **différents**. Et sur le fond Papa Yann a tranché : « il a le
  droit de farm, farm = s'entraîner sur des exercices pédagogiques ». Le sujet
  anti-farm reste ouvert (EP-129) mais **n'est pas** la cause de cet incident.
- *« le nid est plein, donc les gains deviennent des accessoires »* — écarté aussi :
  le nid était **vide**.

## 2. La cause racine

`collection.js` est un moteur **thème-neutre** : il ne connaît aucun dino. C'est
`collection-dinos.js` qui lui injecte le catalogue, et ce fichier commence par un
`return` muet si la globale `DINOS` est absente :

```js
if (typeof global.DINOS === 'undefined' && typeof DINOS === 'undefined') return;
```

Or `mj-shell.js` charge bien `collection.js` et `collection-dinos.js`, mais **jamais
`js/gen/dinos-data.js`**. Seuls les 7 jeux qui incluent `dinos-data.js` à la main
ont un catalogue. Mesuré : **29 mini-jeux sur 36 tournent avec un nid à vide.**

Conséquences en cascade, toutes vérifiées en Chromium réel :

| Effet | Sur mj-49 (sans catalogue) | Sur mj-24 (avec catalogue) |
|---|---|---|
| Œuf gagné en fin de partie | oui, mais `famille:"_sans"` → **œuf gris** | `famille:"pterosaures"`, teinté |
| Éclosion de cet œuf | **`DOUBLON` — œuf détruit, rien ajouté** | `dino allosaurus`, collection +1 |

C'est le second effet qui vide le nid. Dans `hatchEgg()`, l'œuf est retiré
(`s.eggs.splice`) **avant** qu'on cherche l'espèce à donner ; catalogue vide →
`notOwned` vide → retour `{type:'doublon'}` sans rien pousser dans `owned`. L'œuf
et ses accessoires sont consommés pour rien. Répété sur quelques parties, on
obtient exactement l'état observé : nid vide, sac vide, collection vide.

L'éclosion à 2 accessoires signalée par Papa Yann (« j'ai souvent ouvert des œufs
avec seulement 2 objets ») **n'est pas un bug** : c'est `loveHatch`
(`LOVE_HATCH_CHANCE = 1/3`, D-002). Mais elle a **accéléré la casse** — plus
d'éclosions, donc plus d'œufs détruits pour rien.

## 3. Les pertes silencieuses, même famille de bug

`load()` et `save()` avalent toute erreur et retombent sur un état vide. Trois
scénarios mesurés où l'écran **célèbre un gain que rien ne conserve** :

```
A. un profil enfant devient actif apres des gains anonymes | nid 2 -> 0
B. l'id du profil actif change (re-login, resync cloud)    | nid 1 -> 0
C. stockage sature (quota)                                 | ecran annonce "oeuf", garde 0
```

A et B viennent de `storageKey()` : la collection est rangée sous
`maxplay_collection_v1__<childId>` alors que la progression (`maxplay_progress`,
donc les étoiles) reste sur une clé **globale**. Créer ou resynchroniser un profil
déplace le nid sans le migrer ; l'ancien reste orphelin en localStorage.

## 4. Ce qu'il faut faire

**4.1 — Charger le catalogue partout (la correction qui débloque tout).**
Ajouter `js/gen/dinos-data.js` dans `SCRIPTS` de `mj-shell.js`, **avant**
`js/collection.js` (ordre figé, déjà documenté dans `nid-ui.js` : `DINOS` →
assets → moteur → skin). Penser à `site/sw.js` (cache hors ligne).
Attention : `DINOS` et `DINO_FAMILLES` sont des `const` top-level de
`dinos-data.js` — identifiants nus, jamais `global.DINOS` (piège déjà documenté).

**4.2 — Ne jamais détruire un œuf qu'on ne peut pas récompenser.**
Dans `hatchEgg()`, vérifier AVANT le `splice` qu'un item est attribuable. Si le
catalogue est vide, **ne rien consommer** et retourner un échec explicite que
`nid-ui.js` sait afficher sans mentir à l'enfant. Un œuf qui ne peut pas éclore
reste dans le nid, intact.

**4.3 — Rendre les échecs de persistance audibles.**
`save()` doit signaler son échec à l'appelant (retour booléen) ; `grantReward()`
ne doit pas annoncer `granted:true` si l'écriture a échoué. Côté `mj-golden.js`,
pas de théâtre de gain sur un gain non écrit. Un `console.warn` dans le `return`
muet de `collection-dinos.js` (une dépendance manquante doit laisser une trace).

**4.4 — Migrer le nid quand un profil apparaît ou change.**
Au premier `load()` sous une nouvelle clé de profil, si la clé profilée est vide
et que la clé de base contient un nid, le **reprendre** (déplacement, pas copie).
Sinon chaque création de profil repart de zéro.

**4.5 — Décider `MAX_EGGS`.**
Le nid sature à 3 œufs ; au-delà tout gain devient accessoire. Hors du périmètre
de ce correctif (EP-131), **ne pas y toucher ici** — juste ne pas le perdre de vue.

## 5. Portes de vérification

- `cd studio/minijeux/tests && node run.mjs mj-golden-nid ../../../site/mj-24.html` (vert avant/après)
- `node collection.spec.mjs` · `node nid-e2e.spec.mjs` · `node run-all.mjs`
- `node audit-gabarit.mjs` sur un échantillon de jeux touchés
- **Spec neuve obligatoire** : sur un jeu SANS `dinos-data.js` en dur (ex. mj-49),
  un œuf gagné doit avoir une famille réelle (jamais `_sans`), et son éclosion doit
  rendre un dino et incrémenter `owned` — jamais un `doublon`.
- **Spec neuve** : un `save()` en échec (quota simulé) ne doit produire aucun
  écran de gain.
- Recette Papa Yann : jouer 3 parties de calcul, vérifier que le nid se remplit et
  qu'une éclosion donne bien un dino visible dans la collection.

## 6. Interdits

- Ne pas toucher à l'anti-farm 3 étoiles (EP-129, arbitrage Papa Yann en attente).
- Ne pas toucher à `LOVE_HATCH_CHANCE` ni à `WARMTH_COST` : ce sont des choix
  produit (D-002), pas des bugs.
- Ne pas modifier `MAX_EGGS` dans ce chantier.
- Pas de `try/catch` muet ajouté : c'est précisément la cause de l'incident.
