# HO-MJ-03 — Rapport : `MJi18n.t()`/`plural()` + lots 1 et 2 en anglais (12 jeux)

Statut : fait. 0 erreur checker, bundle régénéré, audit-gabarit 12/12 sain, Playwright 0 pageerror
sur 24 runs (12 jeux × `?lang=en` / sans `?lang`).

## `site/js/mj-i18n.js` — nouvelles fonctions

- `MJi18n.t(gameId, cle, frFallback, params)` : cherche `MJ_STRINGS[gameId].ui[cle]` (chemin en
  points pour les sous-groupes, ex. `'consigne.poids'`), sinon `frFallback`. `params` remplace les
  `{cle}` dans le texte choisi (FR ou traduit) — jamais dans le seul FR.
- `MJi18n.plural(n, one, many)` : `n === 1 ? one : many` (EN). Utilisé mj-13c (bus/buses).

## Clés `ui` par jeu (EN, `studio/minijeux/i18n/{fr,en}/strings.json`)

| Jeu | clés ui | contenu |
|---|---|---|
| mj-24 | 8 | 8 formulations de consigne (`phrase[0..7]`, template `{n}`) |
| mj-28 | 3 | consigne, "Essaie encore !", "Bravo ! C'est le {nom} !" |
| mj-30 | 20 | boutons, labels petit/GRAND, mode poids/taille, comparaison, unités (t/kg/m/tonnes/kilos/mètres), repère enfant |
| mj-31 | 9 | titre long header, "Il vivait quand ?", 2 labels de bande pédagogiques + 5 dates |
| mj-32 | 13 | tous les boutons/titres d'écran, modale suppression, "Magnifique !" (+ template nom) |
| mj-06 | 1 | consigne "Quel mot manque…" |
| mj-09 | 13 | 6 labels famille couleur, RER/Métro/Tram, zone-label, parade (titre/sous-titre/bouton) |
| mj-13a | 6 | Chargement, question+hint, Bravo, C'était le, Essaie encore |
| mj-13c | 9 | Chargement, question (texte+TTS), Bravo, bus (sing/plur pour plural()), avant le, C'était, indice recompte |
| mj-18 | 8 | info bar, 2 boutons, "Niveau"/"couleurs", parade (Bravo/texte/caption dino) |
| mj-21 | 25 | 4 labels pots, Vider/Indice/Laver/OK, hint title, texte brun, "Plein !", "Bus", 13 noms de couleur |
| mj-34 | 2 | bandeau mission, panneau "SORTIE"→"EXIT" |

Titre (`titre`) déjà présent depuis HO-MJ-02 — réutilisé pour `document.title` et les `<span class="htitle">` statiques (9 jeux sur 12 en avaient un en dur dans le HTML ; ajout d'un `id="htitle"` + mise à jour JS. mj-28/mj-21/mj-06(déjà géré par mj-shell pour mj-28/21) créent leur `.hdr` via le gabarit, seul `titre:` suffisait pour eux.

## Fichiers modifiés

- `site/js/mj-i18n.js` (fonctions `t`/`plural`)
- `site/mj-24.html`, `mj-28.html`, `mj-30.html`, `mj-31.html`, `mj-32.html`, `mj-06.html`,
  `mj-09.html`, `mj-13a.html`, `mj-13c.html`, `mj-18.html`, `mj-21.html`, `mj-34.html`
  (remplacements ciblés, aucun changement de logique de jeu)
- `studio/minijeux/i18n/fr/strings.json`, `studio/minijeux/i18n/en/strings.json` (clé `ui` ajoutée
  par jeu, à côté de `titre`/`regle` existants)
- `site/js/i18n/mj-strings.en.js` (régénéré via `_gen-mj-strings-bundle.cjs en`)
- `studio/minijeux/tools/_check-mj-traduction.cjs` (étendu : parcours récursif `ui`, objets +
  tableaux, vérifie mêmes clés FR/EN, aucune vide, placeholders `{cle}` identiques)
- Captures : `docs/handoffs/rapports/captures/HO-MJ-03-{mj-24,mj-32,mj-13c,mj-18}-en.png`,
  `HO-MJ-03-mj-30-fr-apres.png`

## Sorties des portes (depuis la racine du repo)

```
node studio/minijeux/tools/_check-mj-traduction.cjs en
  jeux 36/36, 0 erreurs, 3 avertissements (2 pré-existants HO-MJ-02 : mj-49 titre "Ten-Frames",
  mj-18 faux positif marqueur FR résiduel ; 1 nouveau bénin : mj-30 "1 m (toi)"→"3 ft (you)"
  signalé chiffre 1→3 par le checker générique, conversion métrique→impérial volontaire charte dino)

node studio/minijeux/tools/_gen-mj-strings-bundle.cjs en
  site/js/i18n/mj-strings.en.js : 36 jeux

cd studio/minijeux/tests && node audit-gabarit.mjs <mj-XX> pour les 12 jeux
  0 BLOQUANT sur les 12 (dettes pré-existantes non liées, mêmes qu'avant HO-MJ-03)
```

Playwright (12 jeux × `?lang=en` et sans `?lang`, viewport 390×844, `file://`) : **0 pageerror**
sur les 24 runs. Quelques `console.error` de type `ERR_FILE_NOT_FOUND` (assets `paleoart/*_coloriage.webp`
manquants pour certains dinos, mj-28/mj-30/mj-32) : pré-existants, non liés à ce lot, ne bloquent pas
la porte (elle porte sur `pageerror`, pas sur les 404 réseau).

Captures ouvertes et relues (Read direct des PNG) :
- `HO-MJ-03-mj-24-en.png` : header "Find the Dino", consigne "Where is the Brachiosaurus?" (template
  `{n}` résolu), panneau règle EN intact (déjà HO-MJ-02).
- `HO-MJ-03-mj-32-en.png` : header "The Coloring Studio", bouton "My gallery", titre écran choix
  "Choose a dino to color!".
- `HO-MJ-03-mj-13c-en.png` : header "How Many Before?", pips visibles.
- `HO-MJ-03-mj-18-en.png` : header "Color Tubes", info bar "Tap a tube, then tap another to pour!".
- `HO-MJ-03-mj-30-fr-apres.png` : FR sans `?lang` — "Range-les par taille", "petit → GRAND",
  "Range-les du plus petit au plus grand !" — texte pixel-identique à l'ancien FR (aucune régression).
- Vérification ciblée hors capture (Playwright headless) : `document.title` traduit pour mj-24
  ("MJ-24 – Find the Dino"), mj-32 ("MJ-32 – The Coloring Studio"), mj-34 ("MJ-34 — The Blocked
  Depot") ; texte DOM du panneau SORTIE de mj-34 = "EXIT" en `?lang=en`.

## Pièges traités

- **mj-32 concaténation** : `'Magnifique ! Ton ' + name + ' est superbe !'` → template
  `MJi18n.t('mj-32','magnifiqueNom','Magnifique ! Ton {nom} est superbe !', {nom})`.
- **mj-13c pluriel** : `${correctBefore} bus avant le` → `MJi18n.plural(correctBefore, busSing, busPlur)`
  ("bus"/"buses" en EN, le FR reste invariable dans les deux cas).
- **mj-13c/mj-13a intro-splash** : `data-mp-intro-title/-hint` sur `<body>` sont lus par
  `intro-splash.js` au `DOMContentLoaded`, **avant** que `mj-shell.js` ait fini de charger
  `mj-i18n.js`/`MJ_STRINGS` de façon asynchrone (piège déjà documenté HO-MJ-02 pour le pack de
  langue). `MJi18n.t()` n'est donc pas utilisable à cet endroit précis. Solution : un petit script
  inline, posé juste avant `intro-splash.js`, recalcule la langue active avec la même résolution que
  `lang.js` (querystring puis `localStorage`) et pose directement les 2 chaînes EN en dur sur les
  attributs `data-mp-intro-*` si `lang===en` — mini-lot fixe (2 phrases), pas besoin du pack complet
  à ce stade du chargement.
- **mj-34 "SORTIE"** : vit dans le DOM (`sign.textContent`, pas un canvas) → traduction directe en
  "EXIT", vérifiée par lecture du DOM en Playwright.
- **mj-31 époques** : les labels des 3 bandes qui correspondent à un `DINO_PERIODES.id` réel
  (trias/jurassique/cretace) sont lus depuis `DINO_PERIODES[].label` (déjà traduit par
  `dinos-i18n.js`/`dinos-strings.en.js`, HO-MJ-03 ne duplique pas ce texte). Les 2 bandes
  pédagogiques propres à ce jeu (« Avant les dinosaures », « Après la météorite ») n'ont pas
  d'équivalent dans `DINO_PERIODES` (dont les labels sont "Permien"/"Cénozoïque" génériques) : elles
  restent des clés `MJi18n` locales au jeu. Les 5 phrases "date" (« il y a X millions d'années »)
  n'existent pas telles quelles dans les données dino (qui ont `range` avec une phrase différente,
  ex. "280 Mya") : restées des clés locales.
- **mj-09 données partagées hors périmètre** : `getLineDisplayName()` (mots "Bus"/"Noctilien"/
  "Valouette"/"Métro"/"Tram"/"RER" pour les lignes hors métro/RER/tram explicites) vit dans
  `site/js/data.js`, partagé par des dizaines de mini-jeux hors périmètre HO-MJ-03 — non modifié
  (hors fichiers autorisés du brief). Reste en FR même en `?lang=en`.

## Textes FR non branchés (et pourquoi)

- **mj-06 `PHRASES[]`** (30 phrases à trou, ex. "Le CHAT dort sur le canapé.") : contenu de lecture
  phonétique FR intrinsèque (mots accentués, orthographe FR travaillée exprès pour l'apprentissage
  de la lecture 3,5-4 ans en français) — hors périmètre HO-MJ-03 par nature (même famille que le
  Lot 5 de l'audit i18n, mj-50/51/52/53). Le mot de remplissage `'quelque chose'` dans le TTS de
  repli (`speakQuestion(false)`) a été laissé en FR à dessein : il est concaténé au milieu d'une
  phrase FR (`before`/`after`), le traduire seul produirait un charabia bilingue plus mauvais qu'un
  FR cohérent.
- **mj-31 `d.epoque`** (ex. "Crétacé · il y a 66 millions d'ans") : déjà traduit par le pipeline
  dino existant (`dinos-i18n.js` + `dinos-strings.en.js`), consulté tel quel par `speakEpoquePhrase` —
  pas dupliqué ici, conforme au brief ("ne pas dupliquer les données dino").
- **mj-31 `il-vivait-quand.mp3`** : voix FR pré-enregistrée (`sounds/voix/phrases/`) — hors périmètre
  explicite du brief ("consignes parlées MP3"). Seul son texte de repli TTS est traduit ; le MP3 lui-
  même reste FR même en `?lang=en` (dégradation assumée : audio français sur écran anglais tant
  qu'aucun MP3 EN n'existe pour cette phrase).
- **mj-32 `PALETTE[].name`** ("rouge", "orange", …) : champ jamais lu/affiché nulle part dans le
  fichier (seul `.hex` est utilisé) — donnée morte, aucune traduction utile.
- **mj-30 mesures chiffrées (poids/taille des 60 dinos)** : la charte dino (`_CHARTE-TRADUCTION.md`)
  prescrit une conversion métrique→impérial pour l'anglais avec arrondi et repères concrets par
  dino. Seuls les MOTS d'unité (t/kg/m/tonnes/kilos/mètres, "1 m (toi)"→"3 ft (you)") ont été
  traduits ; les VALEURS numériques restent métriques dans les deux langues (aucune conversion de
  grandeur appliquée) — une conversion complète par dino serait un chantier de calibrage à part
  (60 dinos × repères enfant), hors du périmètre "chaînes hors panneau règle" de ce lot. Signalé au
  checker (avertissement bénin sur le "1"→"3" du repère enfant, seule conversion partielle faite).

## Contraintes respectées

Aucune ligne 🔒 des figées (mj-24, mj-31, mj-32, mj-06, mj-09, mj-13a, mj-13c, mj-18, mj-21, mj-34)
contredite — toutes portent sur la mécanique/layout/audio, aucune sur le texte UI. mj-28 et mj-30
n'ont pas de fichier figée (hook signalé à chaque édition, aucune décision Papa Yann nouvelle gravée
ici : uniquement de l'i18n, pas de changement de comportement). Aucun ElevenLabs, aucun `git`, aucun
sous-agent. Aucun serveur local lancé (tests en `file://`).
