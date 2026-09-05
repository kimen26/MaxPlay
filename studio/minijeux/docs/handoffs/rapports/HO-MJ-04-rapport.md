# HO-MJ-04 — Rapport : chrome du panneau règle + lots 3 et 4 en anglais (17 jeux)

Statut : fait. 0 erreur checker, bundle régénéré, audit-gabarit 17/17 sain, Playwright 0 pageerror
sur 34 runs (17 jeux × `?lang=en` / sans `?lang`).

## Objectif 1 — Chrome du panneau règle (`_commun`)

`site/js/regle-info.js` : 24 chaînes fixes (onglets, bouton son, encadré étoiles, bouton
« J'ai compris », coin parents, avis/dictée, favoris) passent par `MJi18n.t('_commun', cle, fr,
params)` via un raccourci local `t()`. Bloc `_commun` créé dans
`studio/minijeux/i18n/{fr,en}/strings.json` (25 clés avec `ariaRegleAvis`).

**Piège trouvé et corrigé** : `_commun` n'est pas un jeu — pas de sous-clé `.ui`, l'objet est
directement `{cle: texte}`. `MJi18n.t()` (site/js/mj-i18n.js) cherchait toujours
`MJ_STRINGS[id].ui[cle]`, donc résolvait `undefined` pour `_commun` et retombait silencieusement
sur le FR même en `?lang=en` (repli assumé du mécanisme, donc aucune erreur — juste le mauvais
texte). Détecté à la relecture de capture (`La règle`/`Avis` restaient FR malgré `?lang=en`).
Fix : `t()` distingue `gid === '_commun'` (racine plate) de tout autre jeu (`entry.ui`).
`_check-mj-traduction.cjs` étendu en miroir : `_commun` validé via `checkUiTree` à part (avant la
boucle par jeu), pas comme un jeu avec `titre`/`regle`.

`mj-shell.js`/`intro-splash.js`/`victory-sounds.js` : aucun texte FR fixe visible trouvé (titres
passés par `cfg.titre`, déjà géré par jeu ; `intro-splash.js` n'est chargé par aucun des 17 jeux
du périmètre — vérifié par grep `data-mp-intro`). Rien à brancher côté commun sur ces 3 fichiers.

## Objectif 2 — Lots 3 et 4 (17 jeux) : clés `ui` par jeu

| Jeu | clés ui (extrait) |
|---|---|
| mj-14 | mode-bar (Formes/Bus/Dinos), Choisis↓, 12 hints (formes/bus/dino), 3 labels forme/fill, 3 labels couleur dino, 3 consignes, 4 strongHint, `niveauSur3` template |
| mj-15 | quiNeVaPas, 5 familles bus, 8 thèmes+8 oddLabel emoji, hints F/G/régime/époque/famille/A-E, niveauSur3 |
| mj-19 | trouveLeDino/Amorce, questDino/questBus (templates `{n}`), trouveLeBusN |
| mj-37 | 3 tierLabels, 6 pieceNames, 6 voxPiece (fallback TTS intro), toutCroque + plural(gouterRestant/s), bravoToutCroque |
| mj-38 | recommencer, niveauSurTotal, combo, essaieEncoreRecommencer |
| mj-39 | plural(ligne/lignes) — piège concaténation `n > 1 ? 'lignes' : 'ligne'` |
| mj-40 | instruction, 9 noms de figures (Œuf/Écaille/Cou…) |
| mj-54 | consigne (1 clé) |
| mj-55 | bienJoue, consigneAvecEquilibre, consigneSimple |
| mj-56 | consigne (1 clé) |
| mj-59 | traceRectangleN (template `{n}`), faisUnTerritoire |
| mj-35 | nid, niveau1/2/3GrosTas, trouveLeTrouPile, presqueCompteBien, **pileExcl** ("PILE!"→"EXACT!", cohérent HO-MJ-02) |
| mj-46 | combienDoeufs, plural(oeufSing/Plur), recomptonsEnsemble |
| mj-47 | combienEnTout, etCaFait (template a/b/total) |
| mj-48 | **ordinaux[5] par langue** (`ui.ordinaux`), toucheLeOrdinal/leOrdinalMonte (consomment le tableau), plural(passager monte/montent, descend/descendent), 5 consignes ask(), speakCalc template, 2 phrases say() fixes |
| mj-49 | 2 consignes manque (formulations alternées PY), combienDoeufsEnTout, deuxBoitesPleines, ilMeFautN, boiteEstPleine, 5 templates celebrateAnswer |
| mj-57 | tousLesOeufsOntEclos, continueAFaireEclore, faisEcloreDores, tapoteUnGroupe |

**Bonus hors brief strict, fait par cohérence avec HO-MJ-03** : les 16 jeux du périmètre qui ont un
`.htitle`/`<title>` (tous sauf mj-14, qui n'a pas de header standard) branchés sur
`MJi18n.titre(id, fr)` — les titres existaient déjà dans le pack depuis HO-MJ-02 mais n'étaient
jamais lus par ces jeux (mj-shell ne le fait pas lui-même, chaque jeu doit l'appeler). Sans ce
correctif les en-têtes restaient 100% FR même en `?lang=en` malgré des titres EN déjà traduits.

## Fichiers modifiés

- `site/js/regle-info.js`, `site/js/mj-i18n.js` (fix `_commun`)
- `site/mj-14.html`, `mj-15.html`, `mj-19.html`, `mj-37.html`, `mj-38.html`, `mj-39.html`,
  `mj-40.html`, `mj-54.html`, `mj-55.html`, `mj-56.html`, `mj-59.html`, `mj-35.html`, `mj-46.html`,
  `mj-47.html`, `mj-48.html`, `mj-49.html`, `mj-57.html`
- `studio/minijeux/i18n/fr/strings.json`, `studio/minijeux/i18n/en/strings.json` (`_commun` + `ui`
  par jeu, `titre` déjà présent depuis HO-MJ-02 réutilisé)
- `site/js/i18n/mj-strings.en.js` (régénéré)
- `studio/minijeux/tools/_check-mj-traduction.cjs` (support `_commun`)
- Captures : `docs/handoffs/rapports/captures/HO-MJ-04-{mj-14-en-panneau,mj-14-fr-apres,mj-19-en,
  mj-46-en-jeu,mj-48-en-ordinal-jeu}.png`

## Sorties des portes (depuis la racine du repo)

```
node studio/minijeux/tools/_check-mj-traduction.cjs en
  jeux 37/37, 0 erreurs, 3 avertissements (tous pré-existants HO-MJ-02/03 : mj-30 conversion
  métrique->impérial partielle, mj-49 titre "Ten-Frames" sans le "10", mj-18 faux positif marqueur)

node studio/minijeux/tools/_gen-mj-strings-bundle.cjs en
  site/js/i18n/mj-strings.en.js : 37 jeux

cd studio/minijeux/tests && node audit-gabarit.mjs <mj-XX> pour les 17 jeux du périmètre
  0 BLOQUANT sur les 17 (dettes pré-existantes non liées à l'i18n)
```

Playwright (17 jeux × `?lang=en` et sans `?lang`, viewport 390×844, `file://`) : **0 pageerror**
sur les 34 runs.

Captures ouvertes et relues (Read direct des PNG) :
- `HO-MJ-04-mj-14-en-panneau.png` : panneau règle EN — onglets **"Rules"/"Feedback"**, bouton
  **"Listen to all the rules"**, bouton **"Got it!"**, chrome traduit (avant le fix `_commun`, ce
  même écran affichait encore "La règle"/"Avis"/"J'ai compris !" — comparé pour confirmer le fix).
- `HO-MJ-04-mj-19-en.png` : header "Find the Bus!", quête dynamique "Find bus N15!" traduite,
  panneau EN par-dessus (chrome + contenu règle mj-19 déjà EN depuis HO-MJ-02).
- `HO-MJ-04-mj-48-en-ordinal-jeu.png` : header "Everybody On Board", consigne ordinale
  **"Tap the third in line!"** (via `ui.ordinaux` EN, pas un calcul mécanique du FR).
- `HO-MJ-04-mj-46-en-jeu.png` : header "Surprise Eggs", consigne "How many eggs?" (pluriel neutre
  ici, testé côté code via `MJi18n.plural`).
- `HO-MJ-04-mj-14-fr-apres.png` : FR sans `?lang` — "Les cases mystères", "Qu'est-ce qui manque ?",
  "Formes/Bus/Dinos", "NIVEAU 3 / 3" — texte pixel-identique à avant HO-MJ-04 (aucune régression
  du panneau ni du chrome FR canon).

## Pièges traités

- **Bug `_commun` non résolu (le plus important de ce lot)** : voir Objectif 1 ci-dessus — sans ce
  fix, tout l'objectif 1 du brief aurait silencieusement échoué (repli FR jamais signalé comme
  erreur, juste comme "traduction absente"). Détecté uniquement par relecture visuelle de capture,
  pas par le checker (qui valide la structure du pack, pas son branchement runtime) — confirme la
  valeur de la porte "ouvrir et relire" du brief.
- **mj-48 ordinaux** : tableau `ui.ordinaux: ["first","second","third","fourth","fifth"]` dans le
  pack EN, lu via `MJ_STRINGS[id].ui.ordinaux` avec repli sur le tableau FR si absent/mauvaise
  longueur (langue non traduite ou pack qui dérive) — jamais une conversion mécanique du français.
- **mj-39/mj-46/mj-37/mj-48 pluriels** : tous remplacés par `MJi18n.plural(n, one, many)` avec
  garde `window.MJi18n && MJi18n.plural` (repli `n===1?one:many` si mj-i18n.js absent). mj-39
  était le cas cité par le brief (`0 lignes` en dur dans le HTML initial, jamais recalculé pour
  n=1 avant ce lot).
- **mj-49 formulations alternées PY** : `curSub==='manque'` alterne 2 formulations FR
  ("il en faut"/"il en manque") selon `qCount % 2` — les deux gardées comme 2 clés distinctes
  (`ilEnFautCombien`/`ilEnManqueCombien`), pas fusionnées, pour ne pas perdre la variété demandée
  par Papa Yann.
- **mj-14/mj-15 templates avec paramètre nommé sur donnée dino** (`{v}` = époque brute FR type
  "Crétacé", `{fam}` = nom de famille FR) : template traduit, valeur injectée non traduite (donnée
  dino hors périmètre, cohérent avec la doctrine dino "frontière autoring/produit" — pas de
  traduction dino dans ce lot).
- **mj-40 ordre de déclaration `const T`** : `T` utilisé dans `FIGURES` (déclaré avant `T` dans le
  code original) — TDZ `ReferenceError` évité en déplaçant la définition de `T` juste après
  `shell = MJ.init(...)`, avant tout usage.
- **Titres jamais branchés (16/17 jeux)** : trouvé en relisant les captures EN (headers restaient
  FR) — corrigé par cohérence avec HO-MJ-03 (voir Objectif 2, bonus).

## FR non branché (et pourquoi)

- **mj-15 régime/époque/famille dino** (`Carnivore`/`Herbivore`/`Crétacé`/nom de famille) : valeurs
  brutes de `dinos-data.js`, hors périmètre (le pipeline dino a sa propre charte de traduction,
  `studio/dino/content/i18n/_CHARTE-TRADUCTION.md` — pas dupliqué ici).
- **mj-31/mj-09 (rappel HO-MJ-03, toujours vrai)** : non touchés dans ce lot, hors périmètre.
- **Consignes MP3 pré-enregistrées** (ex. `sounds/pieces/*-intro.mp3` mj-37, `bus-closing-door-
  sound.flac` mj-48) : restent FR même en `?lang=en` — seul le texte de repli TTS (si le MP3
  échoue) est traduit. Hors périmètre explicite du brief ("consignes MP3").
- **`SoundPool.phrase(slug, fallback)`** (mj-14, mj-15) : le `slug` (nom de fichier MP3) reste
  identique — seul le `fallback` texte est traduit. Un MP3 FR existant continuera de jouer en
  `?lang=en` tant qu'aucun MP3 EN n'est généré pour ce slug (dégradation assumée, même principe
  que HO-MJ-03 mj-31).
- **mj-32 `PALETTE[].name`** : non concerné par ce lot (rappel HO-MJ-03).

## Contraintes respectées

Aucune ligne 🔒 des figées (mj-14, mj-15, mj-19, mj-37, mj-38, mj-39, mj-46, mj-47, mj-48, mj-49,
mj-54, mj-55, mj-56, mj-57, mj-59) contredite — toutes portent sur mécanique/UI visuelle/paliers,
aucune sur le texte. mj-35 et mj-40 n'ont pas de fichier figée (hook signalé à chaque édition,
confirmé qu'aucune décision Papa Yann nouvelle n'était gravée ici : uniquement de l'i18n).
`?lang=fr` et sans paramètre strictement inchangés (vérifié capture mj-14 FR avant/après).
Aucun ElevenLabs, aucun `git`, aucun sous-agent, aucun serveur local lancé (tests `file://`).
Fichiers temporaires de scratch (`studio/minijeux/tests/_tmp-ho-mj-04/`) supprimés en fin de tour.
