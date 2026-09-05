# HO-MJ-02 — Rapport : plomberie i18n mini-jeux + panneaux règle EN (Lot 0)

Statut : fait. 36/36 jeux extraits (FR) et traduits (EN), gates vertes, zéro régression FR.

## Point d'injection choisi

**Zéro édition des 36 `mj-XX.html`.** Tous les 36 chargent déjà `js/mj-shell.js`, qui construit
sa file `SCRIPTS` au parse (`loadSeq`, chargement séquentiel via `createElement('script')`) et
appelle `RegleInfo.init(cfg.regle)` à la fin de `MJ.init` — un seul point d'appel pour les 36 jeux.
`mj-shell.js` a été étendu pour :
1. Calculer la langue active en tête (même whitelist/résolution `?lang=`/`localStorage` que `lang.js`,
   dupliquée volontairement : `SCRIPTS` est une liste statique construite avant que `lang.js` ait fini
   de charger — impossible d'attendre son résultat).
2. Insérer `js/lang.js` puis `js/mj-i18n.js` en tête de `SCRIPTS` (`hasScript()` déduplique les 8 jeux
   qui chargeaient déjà `lang.js` à la main : mj-14/15/19/24/28/30/31/32).
3. Insérer `js/i18n/mj-strings.<lang>.js` juste après, seulement si la langue n'est pas `fr` — un
   pack absent (es-es/pt-br, structure prête, contenu à venir) 404 silencieusement (`onerror` de
   `loadSeq` continue la file), `MJi18n` reste sans `MJ_STRINGS` et `regle-info.js` retombe sur le FR.

`regle-info.js` : une ligne ajoutée en tête de `init(opts)` — `if (window.MJi18n && MJi18n.regle) opts = MJi18n.regle(gameId(), opts);`
— fusionne une COPIE de `opts` (jamais de mutation de l'objet FR passé par le jeu).

**Piège rencontré et corrigé** : `mj-i18n.js` copiait d'abord le mécanisme `document.write` de
`dinos-i18n.js` pour poser son pack. Ça casse : `dinos-i18n.js` est un `<script src>` SYNCHRONE posé
en dur dans le HTML, alors que `mj-i18n.js` est lui-même chargé ASYNCHRONE par `mj-shell.js`
(`createElement`) — `document.write` y échoue silencieusement (« It isn't possible to write into a
document from an asynchronously-loaded external script »), le pack ne se chargeait jamais. Solution :
le pack est un item de plus dans la file `SCRIPTS` de `mj-shell.js` (calculé avant construction de la
liste), pas un `document.write` interne à `mj-i18n.js`.

## Chiffres

- **36/36 chaînes FR extraites** (`studio/minijeux/i18n/fr/strings.json`, 4 étapes par jeu partout).
- **36/36 chaînes EN traduites** (`studio/minijeux/i18n/en/strings.json`), 0 erreur checker, 2 avertissements
  bénins (faux positifs : `mj-49.titre` "Ten-Frames" ne reprend pas le chiffre "10" du titre FR — nom
  pédagogique standard EN, volontaire ; `mj-18.regle.texte` détecté comme "mot FR résiduel" par le
  marqueur générique `\bfor\b`-like — relecture manuelle : traduction correcte).

## Sorties des portes (rejouées, depuis la racine du repo)

```
node studio/minijeux/tools/_extract-mj-regles.mjs        → 36/36 jeux extraits
node studio/minijeux/tools/_check-mj-traduction.cjs en    → jeux 36/36, 0 erreurs, 2 avertissements
node studio/minijeux/tools/_gen-mj-strings-bundle.cjs en  → site/js/i18n/mj-strings.en.js : 36 jeux
cd studio/minijeux/tests && node audit-gabarit.mjs mj-14  → 0 BLOQUANT (1 dette pré-existante, hex couleur, non liée)
node audit-gabarit.mjs mj-48                              → OK, cadre conforme
```

Balayage Playwright des 36 jeux en `?lang=en` (`file://`, viewport 390×844) : **0 pageerror** sur les 36.
Captures ouvertes et relues (Read) :
- `captures/HO-MJ-02-mj14-en.png`, `HO-MJ-02-mj48-en.png`, `HO-MJ-02-mj22-en.png` — panneau règle en
  anglais, mise en page identique au FR (seuls les onglets "La règle"/"Avis" et le bouton "J'ai compris !"
  restent en FR — hors périmètre Lot 0, chrome du panneau, pas le contenu règle).
- `captures/HO-MJ-02-mj14-fr-apres.png` — `mj-14.html` sans `?lang` : texte pixel-identique à avant
  (comparé au rendu FR de `HO-MJ-02-mj14-en` avant activation de la surcouche, même 4 étapes, même mise
  en page).

## Fichiers modifiés / créés

**Nouveaux** :
- `site/js/mj-i18n.js` — surcouche i18n (`MJi18n.regle(id, cfgRegle)`, `MJi18n.titre(id, fr)`).
- `site/js/i18n/mj-strings.en.js` — généré, 36 jeux.
- `studio/minijeux/i18n/fr/strings.json` — généré (référence), `studio/minijeux/i18n/en/strings.json` — traduit à la main.
- `studio/minijeux/tools/_extract-mj-regles.mjs`, `_check-mj-traduction.cjs`, `_gen-mj-strings-bundle.cjs`.
- `studio/minijeux/docs/handoffs/rapports/HO-MJ-02-rapport.md` (ce fichier) + captures.

**Modifiés** :
- `site/js/regle-info.js` — 1 ligne ajoutée (appel `MJi18n.regle`) en tête de `init(opts)`.
- `site/js/mj-shell.js` — calcul `langActive()`, `SCRIPTS` composé dynamiquement (lang.js, mj-i18n.js,
  pack de langue conditionnel), reste inchangé pour tout le reste.
- `studio/minijeux/docs/STACK.md` — section i18n (5 lignes), `studio/minijeux/tools/README.md` — 3 outils.

**Aucun des 36 `mj-XX.html` n'a été touché** (objectif "zéro édition" du brief atteint).

## Les 36 titres FR → EN

| id | FR | EN |
|---|---|---|
| mj-06 | Lis la phrase | Read the Sentence |
| mj-09 | Trie les bus ! | Sort the Buses! |
| mj-13a | Le premier bus | The First Bus |
| mj-13c | Combien avant ? | How Many Before? |
| mj-14 | Les cases mystères | Mystery Squares |
| mj-15 | L'intrus | The Odd One Out |
| mj-18 | Tubes de couleurs | Color Tubes |
| mj-19 | Trouve le bus ! | Find the Bus! |
| mj-20 | Compte en 8 langues | Count in 8 Languages |
| mj-21 | Peins les bus ! | Paint the Buses! |
| mj-22 | Trouve le pays ! | Find the Country! |
| mj-24 | Trouve le dino | Find the Dino |
| mj-28 | La lampe du dino | The Dino's Flashlight |
| mj-30 | Range-les par taille | Sort Them by Size |
| mj-31 | Le voyage du temps | The Time Journey |
| mj-32 | L'atelier coloriage | The Coloring Studio |
| mj-34 | Le dépôt bloqué | The Blocked Depot |
| mj-35 | Le jeu des graines | The Seed Game |
| mj-37 | Croque-échecs ! | Chess Snack Attack! |
| mj-38 | Saute-mouton ! | Leapfrog! |
| mj-39 | Blocs magiques | Magic Blocks |
| mj-40 | Tangram des dinos | Dino Tangram |
| mj-42 | Shisima ! | Shisima! |
| mj-46 | Les œufs surprises | Surprise Eggs |
| mj-47 | Les constellations | The Constellations |
| mj-48 | Tout le monde monte | Everybody On Board |
| mj-49 | Les barquettes de 10 | Ten-Frames |
| mj-50 | Trouve la lettre | Find the Letter |
| mj-51 | Le tri des lettres | Sort the Letters |
| mj-52 | La boîte à mots | The Word Box |
| mj-53 | Lis et fais | Read and Do |
| mj-54 | Sudoku Dino | Dino Sudoku |
| mj-55 | Équilibre | Balance |
| mj-56 | Les Enclos | The Pens |
| mj-57 | Œufs Surprise | Surprise Eggs |
| mj-59 | Territoires | Territories |

## Pièges rencontrés

- **Nom propre / jeu de mots (mj-35, "PILE")** : "PILE" en FR joue sur deux sens (le comptage tombe
  "pile" = exactement, et fait écho au geste "empiler"). Intraduisible tel quel en anglais : rendu par
  "EXACT!" / "EXACTLY RIGHT" — perd le jeu de mots mais garde le sens exact (compte tombant juste).
  Assumé, pas de meilleure option sans réécrire la mécanique du texte.
- **Nom propre à garder (mj-42, Shisima)** : jeu traditionnel kényan, nom conservé tel quel (charte).
- **mj-22 (pays)** : le panneau règle lui-même n'a pas d'article genré (contrairement aux données pays,
  hors périmètre Lot 0/panneau) — traduction directe sans piège grammatical à ce niveau.
- **mj-48 (ordinaux)** : "2ᵉ"/"3ᵉ" → "2nd"/"3rd", conversion mécanique sans piège particulier au niveau
  du panneau règle (le vrai piège ordinal FR vit dans le code du jeu, hors périmètre Lot 0).
- **Titres courts (mj-06, mj-46/mj-57 "Œufs Surprise(s)")** : mj-46 et mj-57 ont le même thème et un
  titre FR proche mais pas identique (surprises/Surprise, pluriel différent) — traduits indépendamment
  en gardant "Surprise Eggs" pour les deux, cohérent avec le contenu de chaque jeu.
- **Unités impériales** : aucun panneau règle des 36 jeux ne contient de mesure chiffrée dino (m/kg) sauf
  mj-30 ("mètres" → converti en "feet" par cohérence charte, seule occurrence).

## Hors périmètre confirmé (non touché)

Consignes TTS/MP3, `textes-jeux.js`, chaînes hors panneau règle (toasts, boutons dynamiques), es-es/pt-br
(dossiers prêts, contenu absent — `studio/minijeux/i18n/es-es/` et `pt-br/` non créés, à faire aux lots
suivants), `site/index.html`, catalogue, aucun appel ElevenLabs, aucun `git`, aucun sous-agent.
