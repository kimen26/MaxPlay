# Rapport HO-R09 — Mur piloté par le catalogue, `check-mj-coherence`, gabarit

## Fichiers créés

- `site/_template/mj-template.html` — gabarit source complet (head, dépendances dans l'ordre canonique, `.hdr`, `MJ.init`, commentaire « COMMENT LIVRER » en pied de fichier).
- `studio/minijeux/tests/check-mj-coherence.mjs` — contrôle bloquant (voir plus bas).

## Fichiers modifiés

- `site/js/catalog.js` — ajout des champs Mur sur les 36 entrées `mj-*` : `zone`, `murOrder`, `libelleMur` (quand il diffère du `titre`), `vignette`, `libre` (mj-32). Nouveau bloc de doc en tête de fichier qui documente ces 4 champs.
- `site/js/mur.js` — suppression totale des `COPAINS[].jeux` (ids en dur), de `LIBRES`, `TITRES`, `VIGNETTES`. `entry()` et `vignetteHtml()` lisent désormais `libelleMur`/`vignette` du catalogue. Nouvelle fonction `jeuxDeZone(zoneId)` (filtre `MAXPLAY_CATALOG` par `zone`, trie par `murOrder`). `repaireState()` construit la chaîne à partir de `jeuxDeZone()` + du flag `libre` du catalogue au lieu de `copain.jeux`/`LIBRES`. Plus un seul id `mj-` en dur dans le fichier (vérifié par grep).
- `package.json` — une ligne ajoutée au script `check` : `node studio/minijeux/tests/check-mj-coherence.mjs`.
- `.github/workflows/deploy.yml` — commentaire mis à jour (le check est déjà exécuté via `npm run check`, aucune étape supplémentaire nécessaire).
- `studio/minijeux/docs/STANDARD-MJ.md` — nouvelle section « 📦 Livrer un mini-jeu — process en une page » (9 étapes : copier gabarit → coder → catalogue → i18n/référentiel → spec → figée → tester → check global → commit).
- `studio/minijeux/CLAUDE.md` — nouvelle section « Livraison d'un mini-jeu » pointant vers STANDARD-MJ.md et le gabarit.

Aucun fichier hors périmètre touché. `site/mj-*.html`, `site/dev-dinos.html`, `site/css/mp-theme.css`, `site/js/avatar-picker.js` apparaissent modifiés dans `git status` mais **pas par cette lane** : ils portent la trace d'une session concurrente (probablement HO-R10, working tree/index git partagé — cf. `memory/feedback_concurrent_git_staging.md`). Vérifié via `git diff` : les diffs sur ces fichiers ne correspondent à aucune de mes éditions.

## Répartition zone/murOrder (décision de conception)

Aucune spec de zonage par jeu n'existait pour les 9 jeux absents du Mur. J'ai choisi de les rattacher au copain le plus proche par catégorie catalogue (`troudi` = casse-têtes, `spino`/`galli` = compter/lire, `volta` = monde, `dino` = dinos) et de les **ajouter en FIN de chaîne** de leur zone plutôt que de renuméroter l'ordre existant — pour ne rien changer à la progression 2★ déjà vécue par Max sur les jeux déjà en place. À valider par Papa Yann si un autre classement est préféré (voir Questions).

## Les 9 jeux réapparus

| id | ancienne situation | zone attribuée | rang (murOrder, fin de chaîne) |
|----|---|---|---|
| mj-09 « Trie les bus ! » | absent du Mur | troudi | 10 |
| mj-13c « Combien avant ? » | absent du Mur | troudi | 11 |
| mj-35 « Le jeu des graines » | absent du Mur | spino | 4 |
| mj-37 « Croque-échecs ! » | absent du Mur | troudi | 12 |
| mj-38 « Saute-mouton ! » | absent du Mur | troudi | 13 |
| mj-39 « Blocs magiques » | absent du Mur | troudi | 14 |
| mj-40 « Tangram des dinos » | absent du Mur | dino | 6 |
| mj-06 « Lis la phrase » | absent du Mur | galli | 4 |
| mj-42 « Shisima ! » | absent du Mur | volta | 3 |

`mj-58` (supprimé le 2026-08-10) n'a plus aucune trace dans `mur.js` : confirmé, le fichier ne contient plus aucun littéral `'mj-` (grep vide).

## Sortie des portes

### `node studio/minijeux/tests/check-mj-coherence.mjs`
```
── check-mj-coherence.mjs — 36 jeu(x) audité(s) ──
OK  mj-24 … OK  mj-42   (36/36 OK)
✓ 36 jeu(x), 0 manque
```
0 erreur sur les 36 jeux (html, figée, spec Playwright, 4 strings.json i18n, entrée référentiel, `murOrder` sans conflit — tout présent nativement, aucune correction de contenu nécessaire).

### `npm run check` (racine, inclut désormais check-mj-coherence)
```
36 jeux audités — 20 cadre conforme · 16 avec dette · 0 BLOQUANT
✓ aucun bloquant — cadre sain
✓ 36 jeu(x), 0 manque
registre : 924 clés — 0 dérive de fait nouvelle
0 lien mort.
```
Vert de bout en bout.

### `npm run test:mj -- index`
17/17 PASS (coque Mur, 6 copains, gate parents, flux code TRITRI). Capture `studio/minijeux/tests/.artifacts/index.png`.

### `node studio/minijeux/tests/mur-nid.spec.mjs`
40/40 PASS (vallée, nid, Padidi, scénario doré). `✓ mur-nid OK`.

## Capture du Mur à 360 px — ouverte et lue

Viewport 360×740 réel (Playwright, `site/index.html` local). Deux captures dans `studio/minijeux/tests/.artifacts/` :

- `mur-360.png` — vue globale : header 1 ligne (avatar, ⭐0, 🥚, 🦕), puis les **6 copains** posés dans le décor (Tritri au volcan, Volta sur le pic rocheux, Galli sous le palmier, Spino à la mare, Troudi près du rocher, Roi T-Rex sur le trône avec son livre). Aucun débordement horizontal, aucun texte tronqué à 360 px.
- `mur-360-bulle-troudi.png` — bulle de Troudi ouverte : vignette « Sudoku Dino » (premier jeu de la chaîne troudi, ordre préservé), texte d'incitation « ★★ sur « Sudoku Dino » ouvre un nouveau jeu ! » — preuve que `libelleMur` et la chaîne `murOrder` fonctionnent bout en bout depuis le catalogue.

Seul le 1er jeu de chaque chaîne est visible sans étoiles (comportement normal du déblocage 2★, pas un manque) — `repaireState()` confirmé en simulation (`node` + `vm`) : les 5 zones listent bien la totalité de leurs jeux dans l'ordre attendu, 9 nouveaux compris.

## Questions pour Papa Yann

1. **Zonage des 9 jeux réapparus** : j'ai suivi la catégorie catalogue existante (compter/casse/monde/dinos) faute de spec. Le zonage (quel copain, quel rang dans la chaîne) est un choix de conception assumé mais pas validé — à challenger si un classement différent est voulu (ex. mj-42 « Shisima » pourrait aussi aller chez Troudi plutôt que Volta).
2. **Vignettes des 9 nouveaux jeux** : j'ai dessiné des vignettes CSS/SVG minimalistes cohérentes avec le style existant (`.vig` + `<i>`/`<img>`), mais elles n'ont pas été revues visuellement par un humain au-delà de la capture 360 px — à raffiner si le rendu déçoit à l'usage.
3. Le check `check-mj-coherence.mjs` vérifie qu'un jeu a *au moins une* entrée dans le référentiel `textes-jeux.json` — je n'ai pas ajouté de garde plus stricte (ex. compter les clés attendues) faute de spec exhaustive côté référentiel ; si HO-R09 devait aussi garantir la complétude des clés référentiel (pas juste leur présence), c'est un chantier séparé.

## Résumé (10 lignes)

Catalogue enrichi de 4 champs Mur (`zone`/`murOrder`/`libelleMur`/`vignette`/`libre`) sur les 36 jeux ; `mur.js` ne contient plus aucun id `mj-` en dur, il lit `catalogVisible()`/`MAXPLAY_CATALOG` via `jeuxDeZone()`. Les 9 jeux absents du Mur (mj-06, 09, 13c, 35, 37, 38, 39, 40, 42) réapparaissent, ajoutés en fin de chaîne de leur zone pour ne pas perturber la progression 2★ existante ; `mj-58` n'a plus aucune trace. Nouveau gabarit `site/_template/mj-template.html` avec mode d'emploi intégré. Nouveau contrôle bloquant `check-mj-coherence.mjs` (html/figée/spec/i18n×4/référentiel/`murOrder`) : 0 erreur sur 36 jeux, intégré à `npm run check` et donc à `deploy.yml`. `STANDARD-MJ.md` et `CLAUDE.md` minijeux documentent le process de livraison en une page. Portes : check-mj-coherence 0 manque, `npm run check` 0 bloquant, `test:mj index` 17/17, `mur-nid` 40/40, capture 360 px ouverte et lue (6 copains, aucun débordement). Aucun fichier hors périmètre modifié par cette lane — les diffs observés sur `site/mj-*.html`/`mp-theme.css`/`avatar-picker.js` viennent d'une session concurrente (HO-R10), pas de ce travail. 3 questions de conception à trancher par Papa Yann (zonage des 9 jeux, vignettes à raffiner, portée du contrôle référentiel).
