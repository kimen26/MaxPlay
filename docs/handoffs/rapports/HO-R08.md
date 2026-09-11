# Rapport HO-R08 — `package.json` racine, `site/js/gen/`, `npm run build / check / test`

**Statut brief :** rapport reçu

## Tableau des 14 fichiers « généré » (audit P2)

L'audit annonce « 14 fichiers marqués généré ». La relecture exhaustive de `site/js/*.js`
(grep sur les marqueurs « généré / GÉNÉRÉ / GENERE / ne pas éditer / do not edit / auto-generat »)
n'en trouve que **12** portant réellement le marqueur sur eux-mêmes. Les 2 manquants restent
une question ouverte (voir § Questions) — possibilité : le compte inclut `dinos-i18n.js` et
`mj-i18n.js`, qui ne sont PAS eux-mêmes générés mais DÉCRIVENT des fichiers générés ailleurs
(`js/i18n/*.js`) ; je les ai classés « hand-written », pas déplacés.

| # | Fichier | Généré par / statut | Action |
|---|---|---|---|
| 1 | `avatars.js` | `studio/minijeux/scripts/gen-avatars-manifest.mjs` — confirmé, 0 diff de contenu (seul l'en-tête, qui pointait vers `c:/tmp/gen_avatars_manifest.py`, un chemin local hors repo, était faux) | → `site/js/gen/avatars.js`, en-tête normalisé |
| 2 | `dinos-assets.js` | `studio/dino/scripts/gen-dinos-assets.mjs` — confirmé, 0 diff (en-tête pointait vers l'ancien emplacement `studio/minijeux/scripts/`, corrigé) | → `site/js/gen/dinos-assets.js`, en-tête corrigé, **`--check` ajouté** |
| 3 | `dinos-audio-manifest.js` | `studio/dino/content/scripts/export/_gen-audio-manifest.cjs` — confirmé, 0 diff (générateur in-place : ne réécrit que les lignes `Set`, préserve les helpers écrits à la main) | → `site/js/gen/dinos-audio-manifest.js`, en-tête normalisé |
| 4 | `dinos-images-grok.js` | `studio/dino/content/scripts/images-grok/_gen-grok.cjs` — confirmé, 0 diff | → `site/js/gen/dinos-images-grok.js` |
| 5 | `dinos-images-local.js` | **AUCUN générateur trouvé** (grep exhaustif sur `studio/**`) | reste `site/js/`, marqueur « généré » retiré, remplacé par une note explicite |
| 6 | `dinos-plantes.js` | `studio/dino/content/scripts/export/_gen-plantes.cjs` — confirmé, 0 diff | → `site/js/gen/dinos-plantes.js` |
| 7 | `dinos-racines.js` | `studio/dino/content/scripts/export/_etymo2racines.cjs` — confirmé, 0 diff | → `site/js/gen/dinos-racines.js` |
| 8 | `lexique-fr.js` | `studio/dino/content/scripts/i18n/_gen-lexique-site.mjs` — confirmé déterministe ; **2 lignes de drift** (Rhomaleosaurus, Tylosaurus) déjà présentes dans le fichier source `fr.md` mais pas encore régénérées dans le commit précédent : le build les fait apparaître, c'est la régénération qui fonctionne, pas une régression introduite ici | → `site/js/gen/lexique-fr.js` |
| 9 | `textes-jeux.js` | `studio/referentiel/generer/_gen-textes-site.mjs` — confirmé, 0 diff | → `site/js/gen/textes-jeux.js` |
| 10 | `dinos-i18n.js` | Pas de marqueur « généré » sur lui-même — surcouche écrite à la main qui charge le fichier généré `js/i18n/dinos-strings.<lang>.js` | reste `site/js/`, inchangé |
| 11 | `mj-i18n.js` | Idem, décrit `js/i18n/mj-strings.<lang>.js` généré par `_gen-mj-strings-bundle.cjs` | reste `site/js/`, inchangé (référence corrigée) |
| 12 | `regle-info.js` | Faux positif du grep initial (« règle » ≠ « généré ») — pas de marqueur | reste `site/js/`, inchangé |

**Bonus hors des 12** : les 9 fichiers `site/js/i18n/{dino-ui,dinos,mj}-strings.<lang>.js` portent
aussi un marqueur « GENERE » avec un en-tête pointant vers l'ancien `studio/minijeux/tools/`
(déplacé en vague 1 vers `studio/minijeux/scripts/`). J'ai régénéré les 3 `mj-strings.*.js`
(seuls concernés par le chemin `tools/`) via leur générateur `_gen-mj-strings-bundle.cjs` :
0 diff de contenu, uniquement l'en-tête corrigé. Ces 9 fichiers restent dans `js/i18n/` (pas
dans `js/gen/`) : ils ont déjà leur propre namespace clair, le brief ne demandait pas de les
bouger, et je n'ai pas voulu élargir le périmètre sans validation.

## `package.json` racine

Créé avec les scripts demandés :
- `build` : lance les 8 générateurs confirmés, dans l'ordre (indépendants entre eux — aucun ne
  dépend de la sortie d'un autre, ils lisent tous depuis le disque ou une source `studio/`)
- `check` : `gen-dinos-assets.mjs --check` (nouveau flag, voir plus bas) + `mj:audit` + `referentiel/build.mjs` + `check-liens-md.mjs docs`
- `test` : `npm run --prefix studio/minijeux/tests mj:all` (Playwright complet)
- `test:mj -- mj-XX` : `npm run --prefix studio/minijeux/tests mj:test --`
- `gc` : placeholder qui `exit 1` avec message, réservé HO-R14 (non implémenté ici, hors périmètre)

`package-lock.json` généré par `npm install` (root). `devDependencies: playwright ^1.60.0`
(résolu en 1.63.0).

## `--check` sur `gen-dinos-assets.mjs`

Ajouté comme demandé par l'orchestrateur : `node studio/dino/scripts/gen-dinos-assets.mjs --check`
compare la sortie calculée au fichier `site/js/gen/dinos-assets.js` existant sans écrire, sort
en code 1 avec message si diff, code 0 + `✓ dinos-assets.js à jour.` sinon. Testé vert dans
`npm run check`.

## `studio/minijeux/tests/package.json`

`devDependencies.playwright` retiré (fusionné à la racine). `node_modules/` et
`package-lock.json` locaux supprimés (artefacts de build, gitignorés, jamais commités).
Vérifié que la résolution Node de `playwright` depuis `studio/minijeux/tests/*.mjs` remonte
bien jusqu'au `node_modules` racine (`require.resolve` confirmé).

## CI (`.github/workflows/`)

- `deploy.yml` : ajout `npm ci` (racine) avant le portail, portail bloquant remplacé par
  `npm run check` (au lieu du seul `audit-gabarit.mjs`) — conforme au brief « CI : npm ci &&
  npm run check avant déploiement ».
- `test-minijeux.yml` : `npm ci` + install Playwright/Chromium à la racine, `npm run --prefix
  studio/minijeux/tests mj:audit` puis `npm test` (au lieu d'appels directs dans le sous-dossier).

⚠️ **Ce changement rendra `npm run check` — donc `deploy.yml` — ROUGE en l'état actuel du
repo**, à cause des 3 liens morts pré-existants dans `docs/` (voir § Portes de vérification).
Ce n'est pas une régression introduite par HO-R08 : c'était déjà le cas avant (le check n'était
juste pas branché sur le déploiement). Signalé en question, pas corrigé (hors fichiers autorisés).

## `site/js/gen/README.md`

Créé : tableau fichier → générateur → source pour les 8 fichiers déplacés, + section « cas
particuliers » qui documente `dinos-images-local.js` (pas de générateur), `dinos-data.js`
(généré en HO-R12), `dinos-i18n.js`/`mj-i18n.js` (surcouches à la main), `lecture-data.js`
(hors périmètre narration).

## Références `<script src>` mises à jour

16 fichiers HTML (`avatar-atelier.html`, `dev-dinos.html`, `index.html`, `mj-14/18/19/24/28/30/31/32/38/42/46/48/49.html`)
+ 1 commentaire de code dans `dev-dinos.html` (ligne 918).
Plus 6 fichiers JS avec des références fonctionnelles ou en commentaire à corriger :
- `site/js/mj-shell.js` : tableau `SCRIPTS` (chargement dynamique) — `js/lexique-fr.js` et
  `js/textes-jeux.js` → `js/gen/...` (référence FONCTIONNELLE, pas juste un commentaire)
- `site/js/nid-ui.js` : tableau `DEPS` (chargement paresseux) — `js/dinos-assets.js` →
  `js/gen/dinos-assets.js` (référence FONCTIONNELLE)
- `site/js/avatar-picker.js`, `site/js/dinos-ombres.js`, `site/js/mj-i18n.js`,
  `site/js/victory-sounds.js` : commentaires uniquement, corrigés pour cohérence

Sweep final (`grep -rn` sur tout `site/*.html` + `site/js/*.js`) : 0 référence résiduelle vers
les 8 anciens chemins.

## Générateurs : ligne de chemin de sortie corrigée

`studio/minijeux/scripts/gen-avatars-manifest.mjs`, `studio/dino/scripts/gen-dinos-assets.mjs`,
`studio/dino/content/scripts/export/_gen-audio-manifest.cjs`,
`studio/dino/content/scripts/images-grok/_gen-grok.cjs`,
`studio/dino/content/scripts/export/_gen-plantes.cjs`,
`studio/dino/content/scripts/export/_etymo2racines.cjs`,
`studio/dino/content/scripts/i18n/_gen-lexique-site.mjs`,
`studio/referentiel/generer/_gen-textes-site.mjs` : toutes les constantes `OUT`/chemin
d'écriture pointent maintenant vers `site/js/gen/`. Chaque script re-testé individuellement
avant et après (0 diff de contenu hors en-têtes attendus).

## Portes de vérification

```
npm run build            → exit 0, tous les générateurs écrivent dans site/js/gen/
npm run check             → exit 1 (36 jeux audités : 20 cadre conforme, 16 avec dette,
                             0 BLOQUANT · registre référentiel écrit sans erreur ·
                             3 liens morts PRÉ-EXISTANTS dans docs/ARCHIVES.md (2) et
                             docs/handoffs/rapports/HO-R01.md (1), hors fichiers autorisés
                             HO-R08 → non corrigés, signalés en question)
npm test                   → 36 jeux au menu · 36 PASS · 0 FAIL · 0 sans spec
```

Playwright 360 px (`site/index.html`, `site/dev-dinos.html`) : 0 erreur console sur les deux
pages. Captures dans `studio/minijeux/tests/.artifacts/site_index-360.png` et
`site_dev-dinos-360.png`, ouvertes et vérifiées : `index.html` affiche la carte/collection
(avatars dino, compteurs étoile/œuf, cartes famille) sans débordement horizontal ; `dev-dinos.html`
affiche l'onglet Familles (cartes Théropodes/Sauropodes/Thyréophores, boutons retour/son) lisible
et complet à 360 px.

`git status --short` (lecture seule, pour preuve) confirme : 8 suppressions dans `site/js/`
correspondant exactement aux 8 apparitions dans `site/js/gen/` (déplacements purs), et les
autres modifications sont limitées aux fichiers listés ci-dessus.

## Fichiers créés / modifiés / supprimés

**Créés**
- `package.json`, `package-lock.json` (racine)
- `site/js/gen/` (8 fichiers déplacés) + `site/js/gen/README.md`

**Modifiés**
- `studio/minijeux/tests/package.json` (devDependency retirée)
- `.github/workflows/deploy.yml`, `.github/workflows/test-minijeux.yml`
- 8 générateurs (ligne de chemin de sortie + `--check` sur `gen-dinos-assets.mjs`)
- 16 fichiers `site/*.html` (script src)
- `site/js/{mj-shell,nid-ui,avatar-picker,dinos-ombres,mj-i18n,victory-sounds,dinos-images-local}.js`
- `site/js/i18n/mj-strings.{en,es-es,pt-br}.js` (en-tête `tools/` → `scripts/`)

**Supprimés (déplacements)**
- `site/js/{avatars,dinos-assets,dinos-audio-manifest,dinos-images-grok,dinos-plantes,dinos-racines,lexique-fr,textes-jeux}.js`
- `studio/minijeux/tests/node_modules/`, `studio/minijeux/tests/package-lock.json` (artefacts de build, gitignorés)

## Questions pour l'orchestrateur

1. **Compte « 14 »** : je n'en trouve que 12 avec un marqueur généré sur eux-mêmes (+ 9 dans
   `js/i18n/` qui portent aussi le marqueur, comptés à part). D'où viennent les 2 fichiers
   manquants du chiffre de l'audit ? Possiblement `dinos-i18n.js`/`mj-i18n.js` (que j'ai laissés
   en `js/`, non déplacés, car ils ne sont pas eux-mêmes générés) — à trancher.
2. **3 liens morts pré-existants** (`docs/ARCHIVES.md` ×2, `docs/handoffs/rapports/HO-R01.md` ×1)
   font échouer `npm run check`, donc bloqueront `deploy.yml` une fois cette vague commitée.
   Aucun de ces fichiers n'est dans mes fichiers autorisés. Je ne les ai pas touchés — à corriger
   par l'orchestrateur ou par une lane dédiée avant de merger le portail `check` dans `deploy.yml`.
3. **`site/js/i18n/*.js`** (9 fichiers, hors des 8 déplacés) : j'ai corrigé les 3 en-têtes
   `mj-strings.*.js` (référence à `studio/minijeux/tools/` disparu en vague 1), mais je ne les
   ai pas déplacés dans `js/gen/` — le brief ne le demandait pas explicitement et je n'ai pas
   voulu élargir le périmètre. À faire dans une vague ultérieure si voulu.
4. **`avatars.js`** avait un en-tête pointant vers un script hors-repo (`c:/tmp/gen_avatars_manifest.py`)
   alors qu'un vrai générateur repo (`gen-avatars-manifest.mjs`) existe et produit une sortie
   identique (hors en-tête) — je l'ai normalisé sur le générateur repo réel. Signalé au cas où
   `c:/tmp/gen_avatars_manifest.py` avait un rôle que j'ignore (semble être un script Python
   ponctuel abandonné, absent du repo).

## Résumé (10 lignes)

12 fichiers `site/js/*.js` marqués « généré » relus ; 8 confirmés avec générateur repo
déterministe (0 diff de contenu) déplacés vers `site/js/gen/` ; 1 sans générateur trouvé
(`dinos-images-local.js`, marqueur retiré, reste en `js/`) ; 3 faux marqueurs (surcouches
manuelles ou faux positif) laissés en place. `package.json` racine créé (`build`/`check`/
`test`/`test:mj`/`gc` réservé). `--check` ajouté à `gen-dinos-assets.mjs` comme demandé par
l'orchestrateur. `playwright` fusionné à la racine, CI mise à jour pour utiliser `npm ci` +
`npm run check`/`npm test` depuis la racine. `site/js/gen/README.md` écrit. 16 HTML + 8 JS
mis à jour pour les nouveaux chemins, sweep final confirmé 0 référence résiduelle.
`npm run build` propre, `npm test` 36/36 PASS, Playwright 360 px 0 erreur console sur les 2
pages, captures ouvertes et décrites. `npm run check` rouge uniquement à cause de 3 liens
morts pré-existants hors de mon périmètre — signalé, non corrigé. Décompte « 14 fichiers »
de l'audit non retrouvé à l'identique (12 trouvés) — question posée, pas tranchée moi-même.

## Décisions orchestrateur (2026-09-12)
- Compte « 14 » : l'audit surcomptait ; 12 fichiers examinés font foi. `site/js/i18n/*.js` restent en `js/` (reporté au backlog post-refonte).
- 3 liens morts corrigés par l'orchestrateur (`docs/ARCHIVES.md` : cibles dans le vault, `HO-R01.md` : exemple de syntaxe) ; `npm run check` : 0 lien mort.
- `avatars.js` normalisé sur `gen-avatars-manifest.mjs` : accepté, `c:/tmp/gen_avatars_manifest.py` était le script ponctuel réécrit en vague 1.
