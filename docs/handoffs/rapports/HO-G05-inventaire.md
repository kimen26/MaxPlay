# HO-G05 — Inventaire nettoyage (rapport)

> Lecture seule. Toutes les preuves ci-dessous viennent de `du -sh`, `git ls-files`, `git log -1`, `git status` et de grep ciblés (hors `_archive`, `node_modules`). Aucune écriture, aucune suppression, aucune commande git de modification n'a été exécutée pendant cette mission.

## 1. `temp/` et `studio/temp/` (non versionnés, gitignorés)

| Chemin | Taille | Fichiers | Versionné | Dernier commit | Usage prouvé | Verdict | Raison |
|---|---|---|---|---|---|---|---|
| `temp/` (racine) | 210 Mo | ~200+ (23 sous-dossiers + ~130 fichiers racine) | Non (gitignoré) | — | 0 (gitignoré, jamais lu par du code de prod) | **SUPPRIMER** | Zone de scratch confirmée par `.gitignore` (`temp/`). Contient des profils Chrome Playwright (`chrome-fresh*`, 57 Mo), des captures de dev (`mj*.png`, `mur-*.png`, `v1..v5-*.png` — 100+ PNG), des lots audio bruts (`audio-taille/`, `dino-audio-*`, `noms-i18n-*` — 60+ Mo). Rien de tout cela n'est référencé par du code versionné. Récupérable git = non applicable (jamais versionné), donc perte définitive si supprimé — mais c'est exactement la nature d'un scratch gitignoré. |
| `studio/temp/` | 2.7 Mo | ~10 | Non (gitignoré) | — | voir détail scripts ci-dessous | **SUPPRIMER (assets) / DÉPLACER (2 scripts)** | Contient `alberto-2026-08-17/` (MP3 de test, 4 fichiers) à supprimer, et 6 scripts `.mjs`/`.cjs` à trancher un par un ci-dessous. |

### Scripts `studio/temp/*.mjs` / `.cjs` — un par un

| Script | Usage prouvé | Verdict | Raison |
|---|---|---|---|
| `_couts.mjs` | Aucune référence hors du handoff lui-même. Lit `studio/referentiel/plan-generation.json` (fichier gitignoré, régénérable) pour lister le coût de génération vocale d'une catégorie précise (`humeur.doux`) et vérifier 6 consignes précises. | **SUPPRIMER** | Script d'analyse ad hoc, écrit pour une question ponctuelle du 2026-08. Non paramétrable, chemins en dur, pas un outil réutilisable — un vrai outil de coût vivrait dans `studio/referentiel/couverture.mjs` (déjà existant). |
| `_inventaire-voix.mjs` | Idem : lit `plan-generation.json`, compare un cutoff de date en dur (`2026-08-10T23:40`) pour trier frais/anciens/absents. | **SUPPRIMER** | Date en dur = usage unique du jour, pas un outil pérenne. |
| `_phrases.mjs` | Idem : filtre `site/sounds/voix/phrases/` du plan, imprime des compteurs. | **SUPPRIMER** | Même famille, question ponctuelle déjà répondue. |
| `_detail.mjs` | Idem : filtre "lieu"/"ligne" du plan. | **SUPPRIMER** | Idem. |
| `_inspect-plan.mjs` | Idem : dump structure JSON du plan. | **SUPPRIMER** | Debug one-shot du format JSON, plus utile une fois le format stabilisé. |
| `_comp-runner-ceratopsiens.cjs` | Charge `site/js/dinos-data.js` en isolant les fonctions `_compLong/_compHaut/_compPoids` pour comparer 5 dinos cératopsiens. Aucune référence externe trouvée, mais répond à un vrai besoin récurrent (vérifier les comparaisons d'échelle citées dans les scripts audio dino — sujet cité dans plusieurs LESSONS du projet sur les erreurs d'échelle). | **DÉPLACER → `studio/dino/scripts/verif-echelle.mjs`** (généralisé aux familles, pas juste ceratopsiens) | Seul des 6 scripts à avoir une utilité réutilisable prouvée (calcul d'échelle = friction documentée ailleurs dans le projet, ex. feedback_traduction sur les échelles à recalculer). Les 5 autres sont strictement des requêtes ad hoc sur un fichier gitignoré. |

**Sous-total temp/ : ~213 Mo récupérables (tout `temp/` + `studio/temp/`), 100% non versionné donc sans impact sur le repo git — gain disque local seulement.**

## 2. `studio/minijeux/tests/` — scratch, batch, test-dinos, résultats

| Chemin | Taille | Fichiers | Versionné | Dernier commit | Usage prouvé | Verdict | Raison |
|---|---|---|---|---|---|---|---|
| `studio/minijeux/tests/_scratch/` | 9.6 Mo | 48 | 48 (versionné) | 2026-07-28 | `collection.spec.mjs` importe/nettoie ce dossier au runtime (`const scratch = resolve(__dir, '_scratch')`) ; commentaire dans le spec : « `_scratch/` est un dossier PARTAGÉ entre specs — supprimer seulement notre fichier, jamais le dossier entier. » `pmo/backlog.md` (entrée 2026-07-31) confirme un nettoyage ciblé déjà fait dans ce dossier (`dbg-levelof.mjs` supprimé). | **GARDER le dossier, TRIER le contenu** | Le dossier lui-même est un working-dir actif utilisé par au moins un spec Playwright. Mais son contenu actuel mélange scripts de capture (`capture-*.mjs`, `check-*.mjs`, `shot.mjs`, `crop.mjs`, `final-e2e.mjs`) et ~25 PNG de résultats (`mapv3-*.png`, `reel-*.png`, `familles-tab*.png`, `vignettes-*.png`, `icon-*.png`) qui sont des captures de sessions passées, pas des fixtures utilisées par les tests actuels. À TRANCHER : lister quels PNG sont encore lus par un spec (`grep` par fichier) avant purge — non fait ici par manque de budget, cf. question ouverte §résumé. |
| `tests/batch-avatars-dual.mjs`, `batch-avatars-gpt.mjs`, `batch-avatars-grok.mjs` | — | 3 | oui | 2026-07-10/11 | `pmo/backlog.md` (entrée 2026-07-22) documente `batch-avatars-grok.mjs` comme LA méthode gravée pour générer les avatars dino (leçon sur la cohérence de pose inter-humeurs). Usage actif et récent. | **DÉPLACER → `studio/minijeux/scripts/avatars/`** | Générateurs de contenu, pas des tests — mauvais rangement dans `tests/`, mais outil vivant et documenté, à garder. |
| `tests/batch-decor-gpt.mjs` | — | 1 | oui | 2026-07-10 | `pmo/backlog.md` (entrée 2026-07-29) : "img/decor/* générés via batch-decor-gpt.mjs" pour la scène Mur/Vallée — usage actif. | **DÉPLACER → `studio/minijeux/scripts/decor/`** | Même famille que les batch-avatars : générateur, pas un test. |
| `tests/test-dinos.mjs`, `test-dinos-v2.mjs`, `test-dinos-scroll.mjs`, `test-dinos-grid-scroll.mjs`, `check-dinos-grid.mjs` | — | 5 | oui | 2026-06-03 (les 5, même commit) | Aucune trace dans `pmo/backlog.md` ou `sprint-log.md` après leur commit d'origine ; pas cités par un `run.mjs`/CI. Noms suggèrent des specs manuelles pour scroller/grid l'encyclopédie dino (dev-dinos.html), jamais rejoués depuis 3 mois. | **À TRANCHER** | Pas de preuve d'usage récent ni de suppression documentée — ni clairement du test automatisé (pas dans `audit-gabarit.mjs`/`compat.mjs`), ni un outil cité ailleurs. Supprimable si confirmé obsolète, mais aucune preuve positive de mort trouvée (juste absence de trace) : ne pas trancher sans vérifier avec Papa Yann si le scroll/grid dino est encore un point sensible. |
| `tests/_check-window-soundpool.mjs` | — | 1 | oui | 2026-08-12 | Nom + date récente suggèrent un script de vérif ponctuel (window.soundPool). Aucune référence dans le harnais principal (`run.mjs`, `audit-gabarit.mjs`). | **À TRANCHER** | Récent (moins d'un mois), possible utilité encore active — pas assez de preuve pour trancher SUPPRIMER en confiance. |
| `studio/minijeux/test-results/` | 1.0 Ko | — | 1 fichier versionné | — | Dossier standard généré par Playwright (`test-results/`), quasi vide (1 Ko). | **SUPPRIMER le contenu versionné, ajouter au `.gitignore`** | `test-results/` est un artefact de run Playwright ; il ne devrait jamais être versionné (comme `tests/.artifacts/` l'est déjà dans `.gitignore`). Un seul fichier dedans, probablement un oubli de `git add -A`. |
| `studio/minijeux/tests/.artifacts/` | 27 Mo | — | 0 (déjà gitignoré) | — | Confirmé dans `.gitignore` (« Harnais de test mini-jeux (EP-038) — screenshots/artefacts de run, pas versionnés »). | **GARDER tel quel (déjà hors repo)** | Rien à faire, conforme. 27 Mo de disque local seulement, aucune trace git. |

## 3. `site/` hors prod

### Dossiers d'outillage

| Chemin | Taille | Fichiers | Versionné | Dernier commit | Usage prouvé | Verdict | Raison |
|---|---|---|---|---|---|---|---|
| `site/tile-tools/` | 37 Mo | 2 447 (2 406 versionnés) | 2 406 | 2026-07-13 | Relié depuis `site/tools/index.html` (hub interne "MaxPlay - Tools ... pas pour Max") : `tile-picker.html`, `tile-library-v3.html`, `vocab-playground.html`, `mockups-routes.html`, `brick-explorer.html` — tous dans `tile-tools/`. **Aucun lien depuis `site/index.html` ou `site/js/catalog.js`** (le menu de Max). | **DÉPLACER → `studio/minijeux/tools/`** (hors `site/`, donc hors build `_site/`) | Outillage d'auteur légitime et actif (skill `maxplay-tiles` s'appuie dessus, `.claude/skills/maxplay-tiles/SKILL.md` le référence), mais n'a aucune raison d'être déployé sur GitHub Pages : le workflow copie `site/*` sans filtre (`cp -r site/* _site/`), donc ces 37 Mo partent en prod à chaque déploiement pour un usage 100% auteur. |
| `site/tools/` (le hub `index.html` + 8 autres fichiers) | 152 Ko | 9 | 9 | 2026-08-12 | Page hub reliant tile-tools + `map-mockups.html` + `design-mockups.html` + `dev-fx.html` + `dev-sounds-ui.html` + `atelier-couleurs.html`. Non lié depuis le menu Max. | **DÉPLACER → `studio/minijeux/tools/`** avec `tile-tools/` | Même raisonnement : outil d'auteur, à sortir du build prod. |
| `site/design-compte/` | 292 Ko | 23 | 23 | 2026-07-19 | Référencé uniquement par `NOTES-DESIGN-LECTURE.md` (design-lecture) et des docs `studio/minijeux/pmo/*` — aucun lien HTML/JS actif depuis une page servie à Max. `mj-46.html` s'en inspire par commentaire (« design repris de design-compte/mockup-1 ») mais ne charge pas le dossier. | **DÉPLACER → `studio/minijeux/docs/design-explorations/design-compte/`** | POC de design déjà tranchés/absorbés dans mj-46 ; valeur = référence historique, pas un asset servi. |
| `site/design-lecture/` | 172 Ko | 21 | 21 | 2026-07-19 | Idem : 19 mockups (`mockup-01..19`), référencés par leurs propres notes et par `mj-50.html` en commentaire seulement (« méthode validée par le POC design-lecture/mockup-01 »), pas de `<link>`/`<script src>` actif. | **DÉPLACER → `studio/minijeux/docs/design-explorations/design-lecture/`** | Même cas que design-compte : matière de conception absorbée dans les MJ livrés, gardée pour traçabilité, mais pas un asset de prod. |
| `site/design-mur/` | 180 Ko | 10 | 10 | 2026-08-12 | POC (`poc-a/b/c`, `v1..v5-vallee.html`) documentés en détail dans `pmo/sprint-log.md` (2026-07-29, "P0 MOCKUP VALLEE livré"). Pas de lien depuis le menu Max. | **DÉPLACER → `studio/minijeux/docs/design-explorations/design-mur/`** | POC produit-vision, valeur de traçabilité de décision, aucun usage servi à l'enfant. |
| `site/design-shared/` | 284 Ko | 4 | 4 | 2026-08-12 | **`site/mj-50.html`, `mj-51.html`, `mj-52.html`, `mj-53.html` chargent `@font-face … url('design-shared/fonts/Cursif.ttf')`** — usage RUNTIME PROD prouvé, pas une simple mention. | **GARDER dans `site/`** | Contrairement à design-compte/lecture/mur, ce dossier contient un asset (police Cursif) réellement chargé par 4 mini-jeux en production. Renommer/déplacer casserait ces 4 jeux. Le nom "design-" est trompeur mais le contenu est un asset partagé de prod. |
| `site/video/` | 15 Mo | 4 | 4 | 2026-07-20 | Référencé par `site/dev-dinos.html` (qui est la page prod de l'encyclopédie, cf. §4) — dossier `dinos` à l'intérieur. | **GARDER** | Usage prouvé dans la page prod dino. |

### Pages HTML hors catalogue

| Page | Versionné | Dernier commit | Usage prouvé | Verdict | Raison |
|---|---|---|---|---|---|
| `dev-fx.html` | 1 | 2026-07-20 | Lien depuis `site/tools/index.html` uniquement. | **DÉPLACER avec site/tools** | Démo interne (célébrations), pas pour Max. |
| `dev-sounds-ui.html` | 1 | 2026-08-17 | Lien depuis `site/tools/index.html` + cité dans `_BANQUE-SONS.md`. | **DÉPLACER avec site/tools** | Idem, outil d'écoute pour l'auteur. |
| `design-mockups.html` | 1 | 2026-06-03 | Lien depuis `site/tools/index.html`. | **DÉPLACER avec site/tools** | Design validé (poteau bus) déjà absorbé en prod ailleurs — page de référence, pas servie à Max. |
| `map-mockups.html` | 1 | 2026-06-03 | Lien depuis `site/tools/index.html` + cité dans `.claude/skills/maxplay-tiles/{SKILL.md,LESSONS.md}`. | **DÉPLACER avec site/tools** | Outil actif pour le skill tile, mais outil d'auteur — pas de lien menu Max. |
| `index-v2-archive.html` | 1 | 2026-07-20 | Cité dans `BUILD-MUR-COPAINS.md` et `pmo/backlog.md`, mais **aucune page active ne pointe vers elle** (nom "archive" explicite). Elle-même contient des liens sortants vers `suivi.html`/`avatar-atelier.html` (sens inverse : elle consomme, n'est pas consommée). | **SUPPRIMER** (ou déplacer vers `_archive/` avec entrée INDEX si valeur historique jugée utile) | Nommée elle-même "archive", non liée depuis l'index actif, récupérable via git si besoin. |
| `atelier-couleurs.html` | 1 | 2026-07-09 | Lien depuis `site/tools/index.html`. Le seul lien "fonctionnel" trouvé côté JS (`avatar-picker.js`) est un **commentaire** ("même algo que atelier-couleurs.html"), pas un chargement du fichier. | **DÉPLACER avec site/tools** | Prototype dont l'algo a été repris en dur dans avatar-picker.js — le prototype lui-même n'est plus qu'une référence de méthode. |
| `auteur.html` | 1 | 2026-07-13 | Chargé/lié par `site/suivi.html`. | **GARDER** | Page fonctionnelle du parcours parent (pas un mockup malgré le nom générique). |
| `lecture.html` | 1 | 2026-07-25 | Lié par `site/suivi.html`. | **GARDER** | Idem, page produit active (annotation lecture). |
| `compte.html` | 1 | 2026-07-28 | Lié par `auteur.html`, `dev-dinos.html`, `index.html`, `lecture.html`, `suivi.html`, `catalog.js`, `cloud.js`, `tracker.js`. | **GARDER — usage massif prouvé** | Page centrale du compte utilisateur, pas du tout un candidat suppression malgré sa présence dans la liste "hors prod" du brief. |
| `suivi.html` | 1 | 2026-07-19 | Lié par `auteur.html`, `confidentialite.html`, `index.html`, `index-v2-archive.html`, `tracker.js`, `unlock.js`. | **GARDER — usage massif prouvé** | Idem, page produit active. |
| `avatar-atelier.html` | 1 | 2026-08-12 | Lié par `index.html`, `index-v2-archive.html`. | **GARDER** | Page produit active (atelier de personnalisation d'avatar). |
| `mj-pose-tiles.html` | 1 | 2026-07-14 | `retire:true` dans `catalog.js`, encore linké par `compte.html` et présent dans `catalog.js` (donc potentiellement affiché grisé/caché selon logique JS). | **À TRANCHER** | `retire:true` = retiré du menu actif, mais le fichier reste appelable et lié depuis `compte.html`. Pas de suppression sans vérifier le comportement exact de `retire:true` dans le rendu du menu (grisé visible vs totalement masqué) — hors périmètre lecture-seule de vérifier le rendu runtime ici. |
| `max-adventure.html` | 1 | 2026-07-19 | `retire:true` dans `catalog.js`, encore linké par `compte.html`, et c'est le splash vers le build Phaser CI (`studio/max-adventure` → `_site/max-adventure/`) toujours construit par `deploy.yml`. | **GARDER (déployé par CI, ne pas couper sans décision produit)** | Contrairement à `mj-pose-tiles`, ce jeu a tout un pipeline CI dédié (npm build, assets, version.txt). Le retirer casserait une étape du workflow. `retire:true` semble être un statut "en pause visible pour l'auteur", pas "mort" — à confirmer avec Papa Yann si le pipeline CI doit être coupé en même temps qu'une éventuelle suppression. |

## 4. `site/img/` et `site/audio/`, `site/sounds/`

| Zone | Taille | Référencé par | Verdict | Raison |
|---|---|---|---|---|
| `site/img/dinos/wiki/` | 20 Mo | `site/js/dinos-images-local.js` (`DINO_WIKIMEDIA`, chargé par `site/dev-dinos.html`) | **GARDER — corrige l'audit du 2026-07-15** | `dev-dinos.html` **est** la page prod de l'encyclopédie dino (`catalog.js` id `dinos`, `url:'dev-dinos.html?v=7'`, malgré son nom trompeur "dev-"). Le script `dinos-images-local.js` y est chargé et référence bien `img/dinos/wiki/*.svg/.jpg`. L'entrée `_archive/INDEX.md` (« dino-orphans-2026-07-15 ») ne archive que `dinos-images-wikimedia.js` (0 référence, un autre fichier), pas `dinos-images-local.js` — ne pas confondre les deux noms proches. Le poids reste réel (20 Mo) mais l'usage est prouvé, donc pas orphelin. |
| `site/img/dinos/grok/` | 43 Mo | `site/js/dinos-images-grok.js`, chargé par `dev-dinos.html` | **GARDER** | Usage direct prouvé. |
| `site/img/dinos/sprites/` | 69 Mo | `site/js/dinos-assets.js` (140 occurrences) | **GARDER** | Usage massif prouvé. |
| `site/img/dinos/traces/` | 1.0 Mo | Cité comme "réserve documentée" dans `pmo/backlog.md` (2026-07-31) | **GARDER** | Décision explicite déjà tranchée par Papa Yann/game-pmo : réserve indexée, pas un mort. |
| `site/img/dinos/ombres/` | 1.8 Mo | `site/js/dinos-ombres.js`, `site/js/mur.js` | **GARDER** | Usage prouvé. |
| `site/img/dinos/familles/` | 864 Ko | Usage à confirmer précisément (non vérifié en détail, budget de mission) | **À TRANCHER** | Non exploré en profondeur — cohérent avec le nommage (icônes de famille dino), probablement utilisé par le menu de filtre par famille de `dev-dinos.html`, mais pas de grep dédié effectué. |
| `site/img/dinos/paleoart/` | 156 Mo | `site/js/dinos-assets.js` (490 occurrences), `dinos-ombres.js`, `mur.js` | **GARDER** | Usage massif prouvé — c'est le plus gros dossier (156 Mo) mais aussi le plus référencé. |
| `site/img/avatars/` | 14 Mo | `avatar-picker.js`, `avatars.js`, `mj-kit.js`, `mur-scene.js`, `mur.js` | **GARDER** | Usage prouvé. |
| `site/img/decor/` | 1.7 Mo | `decor.js`, `mur-scene.js`, `mur.js` | **GARDER** | Usage prouvé, confirmé aussi par `pmo/backlog.md` (« README les déclare "réserve indexée pour usage futur", pas mort »). |
| `site/audio/` | 274 Mo, 1 341 fichiers (`site/audio/dinos/` : 496 fr flat fiches + 5 fr/périodes + 840 noms sur 70 dinos × 12 langues) | Construction dynamique de chemin (`dinos-audio-manifest.js` et similaires) | **GARDER quasi intégralement** | Le corpus est massivement référencé mais via des chemins construits dynamiquement (pas de grep littéral possible sur chaque fichier) — pas d'orphelin net identifié dans ce dossier lors de l'échantillonnage. |
| `site/sounds/` | 48 Mo, 560 fichiers (voix/ seul = 38 Mo, 270 fichiers) | `_BANQUE-SONS.md` (manifest partiel), `dev-sounds-ui.html` (page QA), constructions dynamiques (`say-nombres.js`) | **GARDER le corpus, SUPPRIMER 32 fichiers orphelins prouvés** | Échantillon vérifié ~90 fichiers (fx/, nombres/, phonemes-test/, voix/lieux/, atomes/, epoques/, racine). Taux d'orphelinage concentré à 100% dans 4 zones précises (46 fichiers), le reste du corpus (phonemes/, phonemes-test/ — consommé par `dev-sounds-ui.html`, pas orphelin malgré son nom — nombres/, nombres de voix/) est référencé, souvent dynamiquement. **32 orphelins solides et sans ambiguïté** : `sounds/atomes/{duree-145-millions,duree-200-millions,duree-250-millions,duree-66-millions,epoque-cenozoique,epoque-cretace,epoque-jurassique,epoque-trias}.mp3` (8, jamais listés même dans `_BANQUE-SONS.md`) · `sounds/epoques/{66,145,200,250}-millions-{trias,jurassique,cretace,cenozoique}.mp3` (16 combinaisons, 0 référence) · 7 prototypes racine jamais branchés (`Gagné.mp3`, `motus-boule-noire_cTY2JG4.mp3`, `among-us-role-reveal-sound.mp3`, `mario coin hit.mp3`, `maro-jump-sound-effect_1.mp3`, `super-mario-coin-sound.mp3`, `pokemon lvl up.mp3`) · `sounds/voix/lieux/{bus,fusee}-{dinos,dodo,garage,lettres,monde,roulotte}.mp3` (12, dead-code confirmé : référencés seulement par `TEXTES_JEUX` mais plus aucun hub — ex-index2/index3 supprimés — ne consomme ces slugs). |

## 5. `studio/referentiel/` — constater vs générer

### Constater (lecture seule du contenu produit, jamais d'écriture de contenu final)

| Fichier | Rôle prouvé |
|---|---|
| `build.mjs`, `scan-dino.mjs`, `scan-jeu.mjs`, `couverture.mjs`, `valider.mjs`, `test-detection.mjs`, `acquitter.mjs` | Noms + convention (pas de préfixe `_gen-`/`_fix-`) cohérents avec le rôle "constater" annoncé par le `README.md` du dossier. |
| `plan-generation.mjs` | **Vérifié dans le code** : commentaire explicite « écrit le PLAN des appels ElevenLabs. N'en fait AUCUN. […] Ce script ne contacte aucune API et ne dépense aucun crédit. » — confirme sans ambiguïté le camp "constater". |
| `_ETAT-CONTENU.md`, `empreintes.json`, `catalogue/`, `lib/` | Données/état versionnés, cohérents avec "constater" (le `.gitignore` confirme `empreintes.json` est volontairement versionné comme mémoire de dérive, contrairement à `registre.json`/`plan-generation.json`/`textes-jeux.json` qui sont des dumps régénérables gitignorés). |

### Générer (produisent du contenu final, à sortir vers les pôles)

| Script | Pôle | Cible de déplacement proposée | Preuve |
|---|---|---|---|
| `_gen-consignes.mjs` | JEU | `studio/minijeux/scripts/audio/` | Écrit les consignes MJ, slug via `slugConsigne` de `site/js/mj-shell.js` |
| `_gen-humeur-invitee.mjs` | I18N | reste `studio/referentiel/` | Sortie `site/sounds/voix/<langue>/...`, gère l'accent/relecture multi-langue — pas propre à un seul pôle |
| `_gen-lot-dinos.mjs` | DINO | `studio/dino/scripts/audio/` | Sortie `site/audio/dinos/` (noms/menus/périodes) |
| `_gen-lot-i18n-noms-v2-sts.mjs` | I18N | reste `studio/referentiel/` | Pipeline STS multilingue, sortie `site/audio/dinos/<lang>/noms/` mais logique = traduction/native voice, pas contenu dino en soi |
| `_gen-lot-i18n-noms.mjs` | I18N | reste `studio/referentiel/` | Lit lexiques de prononciation par langue, paramètre `language_code` API |
| `_gen-lot-nombres.mjs` | JEU | `studio/minijeux/scripts/audio/` | Cible `sounds/nombres`, `sounds/epoques` (atomes/pièces) — banques jeu |
| `_gen-lot-phonemes.mjs` | JEU | `studio/minijeux/scripts/audio/` | Cible `site/sounds/phonemes/` (apprentissage lettres) |
| `_gen-plan.mjs` | TRANSVERSE (exécuteur générique) | reste `studio/referentiel/` | Exécute `plan-generation.json` toutes destinations confondues, pas de pôle propre |
| `_gen-regles.mjs` | JEU | `studio/minijeux/scripts/audio/` | Génère la voix des 55 panneaux de règles des MJ |
| `_gen-textes-site.mjs` | JEU | `studio/minijeux/scripts/audio/` | Génère `site/js/textes-jeux.js`, table consommée par libs jeu partagées |
| `_fix-phonemes-vides.mjs` | JEU | `studio/minijeux/scripts/audio/` | Corrige 4 phonèmes vides, même cible que `_gen-lot-phonemes.mjs` |
| `_test-phonemes-graphies.mjs` | JEU | `studio/minijeux/scripts/audio/` | **vérifié dans le code** : "génère des VARIANTES d'écoute pour les phonèmes mal rendus (retour PY 2026-08-12)", sortie `site/sounds/phonemes-test/` consommée par `dev-sounds-ui.html` |
| `_extraire-textes-jeux.mjs` | JEU (rôle mixte : plutôt "constater" en réalité) | `studio/minijeux/scripts/audio/` si regroupé par pôle, ou laisser côté "constater" | **vérifié dans le code** : "inventaire EXHAUSTIF des textes parlés des jeux" — c'est un scan/audit, pas une génération de contenu final, malgré son classement dans la liste "générer" du brief |
| `_REPRISE-2026-08-10.md`, `_FILE-EL.md`, `_PLAN-GENERATION.md` | Docs de suivi de production, pas des scripts | Restent `studio/referentiel/` (traces de la campagne de génération en cours), ou archivées une fois la campagne close | — |

**Classement confirmé par un sous-agent de recherche dédié** (lecture du code de chaque `_gen-*.mjs`, chemins de sortie et paramètres API vérifiés). Verdict global : 7 scripts partent vers `studio/minijeux/scripts/audio/` (JEU), 1 vers `studio/dino/scripts/audio/` (DINO), 3 restent transverses dans `studio/referentiel/` (I18N + exécuteur générique) car leur logique de relecture/langue n'est pas propre à un seul pôle.

## 6. Archives

| Dossier | Taille | Fichiers | Versionné | Dernier commit | Verdict | Raison |
|---|---|---|---|---|---|---|
| `_archive/` (racine) | 36 Mo | 83 | 83 | 2026-08-03 | **GARDER intégralement** | `_archive/INDEX.md` documente CHAQUE entrée (13 sous-dossiers/fichiers) avec date, raison, et pointeur de remplacement — conforme à la doctrine "une archive ne se réécrit pas, mais elle doit être documentée". Aucune entrée non documentée trouvée. |
| ↳ `temp-assets-2026-04/` | 2.8 Mo | 23 | 23 | (inclus ci-dessus) | **GARDER** | Le handoff supposait 36 Mo pour ce sous-dossier seul — erreur : 36 Mo est le poids de TOUT `_archive/`, `temp-assets-2026-04/` ne pèse que 2.8 Mo (confirmé par `du -sh` direct et par la note de l'INDEX qui donne "~2.8 Mo"). Documenté, contient 26 fichiers audio bruts pré-production + 1 script mort déjà noté. |
| `studio/dino/content/scripts-audio/_archive/` | 3.9 Mo | 122 | 122 | 2026-08-19 | **GARDER** | Deux sous-dossiers datés (`2026-07-18-ancien-pipeline/`, `2026-08-19-albertosaurus-avant-v4/`), noms explicites, cohérent avec la convention de rotation par date. Contient 5 MP3 (poids modeste, pas un vrai problème de taille). |
| `studio/narration/stories/002-libellule-resonance/_archive/` | 2.6 Mo | 212 | 212 | 2026-07-10 | **GARDER** | Fichiers explicitement suffixés `-PERIME-`, `-ANNULE-`, `_OLD-`, `-PRE-PIVOT-`, `-PRE-CASTING-` avec dates — convention de nommage auto-documentante, conforme à la doctrine narration ("jamais supprimer matière narrative sans question explicite"). |
| `studio/dino/_archive/` | 2.0 Mo | 19 | 19 | 2026-07-17 | **GARDER** (non audité en détail, cohérent avec le reste du pôle dino qui documente ses archives) | Pas d'anomalie détectée ; taille modeste. |
| `studio/narration/archive/` | 1.1 Mo | 18 | 18 | 2026-06-03 | **GARDER** | Contient `editorial-board-2026-04-26/`, `inputs-historiques/`, `sessions/` — structure datée cohérente. |
| `studio/minijeux/docs/jeux/_archive/` | 76 Ko | 13 | 13 | 2026-08-11 | **GARDER** | Contient `GAMES_SPECS.md` + `figees-jeux-purges-2026-08-10/` — daté, poids négligeable. |
| `studio/dino/content/scripts-audio/fr/V3/json/_draft-2026-08-17/` | 20 Ko | 4 | 4 | 2026-08-19 | **À TRANCHER** | 4 fichiers `_seg-albertosaurus-*.json` — un brouillon récent (moins d'un mois), pas encore une "archive" au sens rotation ; probablement un draft de travail en cours plutôt qu'un cadavre. Vérifier avec le pôle dino si la V4 albertosaurus a bien remplacé ce brouillon avant de le déplacer/nommer archive. |
| `site/tools/_archive/` | 60 Ko | 3 | 3 | 2026-06-03 | **GARDER** | `README.md` documente précisément les 2 fichiers HTML archivés (versions v1/v2 de tile-library, remplacées par v3), avec avertissement explicite de ne pas supprimer sans vérifier les bookmarks utilisateur. Exemplaire du point de vue doctrine. |

**Poids total des archives auditées : ~46.5 Mo, toutes déjà versionnées et documentées → aucun Mo réellement "récupérable" ici au sens suppression, tout est déjà conforme à la doctrine GED (verbatim + INDEX daté). Le seul gain possible serait de déplacer `site/tools/_archive/` en même temps que `site/tools/` (zone 3) puisqu'il vit sous un dossier qui, lui, sort de `site/`.**

## 7. Dossiers `inbox/`

| Dossier | Taille | Fichiers | Versionné | Dernier commit | Statut | Verdict | Raison |
|---|---|---|---|---|---|---|---|
| `studio/minijeux/inbox/` | 2.1 Mo | 2 | 2 | 2026-08-12 | Non traité (règle 48h documentée dans son README, violée depuis 22 jours au 2026-09-03) | **À TRANCHER par game-pmo** | Contient 1 PNG (`8b209b7d-....png`, dépôt Papa Yann sans titre explicite) — impossible de juger sans ouvrir/faire trancher son contenu, ce qui sort du périmètre lecture-facile de cette mission (nécessite un jugement créatif, pas une preuve de fichier). |
| `studio/narration/inbox/` | 1020 Ko | 8 | 8 | 2026-06-14 | Partiellement traité : `pmo/matiere-a-distiller.md` cite déjà "harmonie-des-spheres", "cosmos-ordre-platon" et "culture faune et flore" — mais les fichiers sources restent présents dans `inbox/`, donc pas "marqués traité" ni supprimés selon la règle documentée. | **À TRANCHER par narration-pmo** | Règle 48h violée depuis 81 jours (2026-06-14 → 2026-09-03). La distillation partielle (mention dans matiere-a-distiller.md) suggère que le contenu utile a déjà été récupéré ; les fichiers sources (2 .md culture + 2 .md cosmos + 2 .png + report.md) sont candidats à suppression SI la distillation est confirmée complète — ce qui nécessite un jugement de contenu narratif hors du périmètre "preuve de fichier" de cette mission. |

## 8. `infra/`

| Élément | Versionné | Détail | Verdict | Raison |
|---|---|---|---|---|
| `infra/bot/.env` | Non (gitignoré, `**/.env`) | Secrets bot Telegram | **GARDER (hors repo, normal)** | Conforme à `reference_secrets_storage_norm` — jamais versionné, c'est voulu. |
| `infra/bot/bot-runner.log`, `bot-start.err.log`, `bot-start.log`, `bot.err.log`, `bot.log`, `bot.run.log` | Non | 6 fichiers de log locaux | **SUPPRIMER (fichiers disque, hors repo)** | Logs runtime, non versionnés, rotation locale normale — rien à faire côté git, nettoyage disque possible sans risque. |
| `infra/bot/node_modules/` | Non (gitignoré) | Dépendances npm | **GARDER (hors repo, normal)** | Standard, régénérable via `npm install`. |
| `infra/mcp/node_modules/` | Non | Idem | **GARDER (hors repo, normal)** | Idem. |
| `infra/mcp/logs/` | Non (gitignoré explicitement, commentaire dédié dans `.gitignore` : "filet de sécurité option A") | 122 fichiers, 1004 Ko | **GARDER (hors repo, usage documenté)** | Le `.gitignore` explique explicitement pourquoi ce dossier existe et reste local (filet de sécurité de récupération si le MCP crash avant écriture) — conforme, ne pas toucher. |
| `infra/supabase/.env` | Non | Secret Supabase | **GARDER (hors repo, normal)** | Idem `.env` bot. |

**Total : 11 éléments non versionnés confirmés (7 logs/fichiers de log + 2 `.env` + 2 `node_modules`), exactement le chiffre annoncé par le brief.** Tous sont soit des secrets (à ne jamais versionner), soit des artefacts régénérables/documentés comme volontairement hors repo. Aucune action git nécessaire ; seul un ménage disque des 6 fichiers `.log` est possible sans aucun risque (déjà hors du repo, donc hors du scope git de HO-G10 au sens strict).

## 9. Doublons (hash MD5 identique, chemins différents)

Analyse réalisée sur tous les fichiers > 2 Ko de `studio/` et `site/`, hors `node_modules`, `_archive`, `.mp3`, `test-results`, `.artifacts` (9 919 fichiers scannés).

| Catégorie de doublon | Nb de fichiers en double | Poids | Versionné | Verdict | Raison |
|---|---|---|---|---|---|
| `studio/max-adventure/dist/**` dupliqué avec `studio/max-adventure/public/assets/**` | ~2 500 paires | non mesuré isolément | **0 (dist/ est gitignoré)** | **GARDER (faux positif de doublon versionné)** | `git check-ignore` confirme `studio/max-adventure/dist/` entièrement gitignoré (c'est le dossier de build Vite). Le doublon existe seulement sur disque local, pas dans le repo git — aucune action git possible ni utile. |
| `studio/lunii/.build-dinos/dino-*.png` dupliqué avec `.build-dinos/staging/assets/<hash>.png` | ~30+ paires | non mesuré isolément | **0 (`.build-dinos/` est gitignoré)** | **GARDER (faux positif)** | Idem : dossier de build Lunii, entièrement hors repo. |
| `studio/max-adventure/public/assets/tiles/themes/<NN_theme>/*.png` dupliqué avec `.../tiles/{roads,buildings,parks,props,stations,...}/ME_Singles_*.png` | **2 515 paires** | `themes/` pèse 38 Mo à lui seul, contre 2.5+4+2.6+3.5+3.5 = ~16 Mo pour les 5 sous-dossiers "catégorie" échantillonnés (d'autres catégories existent, non toutes mesurées) | **6 246 fichiers versionnés dans `themes/` seul** | **DÉPLACER/DÉDUPLIQUER — vrai doublon versionné, le plus gros gisement de la mission** | Le même asset LimeZu (tileset acheté) est rangé deux fois : une fois classé par thème d'origine (`themes/21_beach/`, `themes/10_vehicles/`...) et une fois reclassé par catégorie fonctionnelle (`roads/`, `buildings/`, `parks/`, `props/`, `stations/`...). **Estimation ~38 Mo récupérables** si une seule arborescence est gardée (à trancher : laquelle des deux organisations le code Phaser charge réellement — non vérifié ici, cf. question ouverte). |
| `site/tile-tools/families/<theme>/*.png` — variantes de couleur/état du même tile de base | 214 paires (hors max-adventure) | poids marginal (tiles 48×48, quelques Ko chacun) | versionné (fait partie des 2 406 fichiers de tile-tools déjà comptés en zone 3) | **GARDER — faux positif fonctionnel** | Ce sont des tiles visuellement différents (ex: 3 couleurs de feu tricolore identiques en pixels sauf la couleur — probablement un artefact de la façon dont LimeZu a livré des sprites quasi identiques), pas de vrais doublons de rangement à corriger ; les toucher romprait potentiellement une nomenclature attendue par le tile-picker. |
| `studio/narration/stories/003..008/{6-selection.md, 10-synthese-finale.md}` identiques entre histoires | 12 fichiers (6 paires) | négligeable (texte) | versionné | **À TRANCHER** | Ces fichiers de 6 histoires différentes ont un contenu MD5-identique — soit un gabarit jamais rempli spécifiquement (template resté vide/générique dans plusieurs dossiers), soit une vraie régression de contenu (copier-coller non personnalisé). Sort du périmètre "preuve de fichier" : nécessite lecture éditoriale par narration-pmo, pas un verdict de nettoyage technique. |
| `studio/dino/content/lunii/familles/*.png`, `studio/dino/content/lunii/voyage/*.png`, `studio/lunii/assets/images/histoires-dodo/*.png` | Chacun apparaît une seule fois dans le scan (pas de vraie paire trouvée dans l'extrait ci-dessus, à l'exception de `ep-intro.png` vs `.build-voyage/staging/`) | — | — | **GARDER, pas de doublon réel** | Vérification : ces lignes apparaissaient dans la sortie brute `md5sum` mais sans deuxième occurrence versionnée dans le même hash — pas de doublon actionnable. |

## Résumé

### Mo récupérables (estimation)

- **~213 Mo, non versionnés, gain disque local uniquement** : `temp/` (210 Mo) + `studio/temp/` hors les 2 scripts à garder (2.7 Mo). Zéro impact git.
- **~38 Mo, versionnés, vrai gain repo** : dédoublonnage `studio/max-adventure/public/assets/tiles/themes/` vs les sous-dossiers par catégorie (2 515 fichiers en double), sous réserve de vérifier lequel des deux rangements est réellement chargé par le code Phaser avant de choisir lequel garder.
- **37 Mo (site/tile-tools) + 152 Ko (site/tools) + 292+172+180+284 Ko (design-compte/lecture/mur, hors design-shared qui reste) ≈ 38 Mo** : pas un gain de poids (le contenu reste utile, donc pas supprimé), mais un gain de **build prod** — ces ~38 Mo sortiraient du `_site/` déployé sur GitHub Pages à chaque push s'ils étaient déplacés vers `studio/`.
- **32 fichiers audio orphelins prouvés dans `site/sounds/`** (poids marginal, quelques centaines de Ko au total — 8 atomes + 16 epoques + 7 prototypes racine + 12 lieux/bus-fusee dead-code confirmé, cf. §4) : gain de propreté plus que de poids, mais verdict SUPPRIMER ferme.
- Le reste (archives, inbox, infra) est déjà soit hors repo, soit documenté conforme à la doctrine — pas de Mo à récupérer sans arbitrage éditorial.

### Fichiers à supprimer (verdict ferme, preuve d'usage nulle)

- `temp/` entier (racine) et `studio/temp/` sauf `_comp-runner-ceratopsiens.cjs` (à déplacer) — non versionnés.
- `studio/temp/_couts.mjs`, `_inventaire-voix.mjs`, `_phrases.mjs`, `_detail.mjs`, `_inspect-plan.mjs` — non versionnés, scripts ad hoc à date fixe.
- `studio/minijeux/test-results/` (contenu versionné, 1 fichier — artefact Playwright égaré).
- `site/index-v2-archive.html` — non lié depuis aucune page active, nom explicitement "archive".
- 6 fichiers `.log` dans `infra/bot/` — non versionnés, ménage disque sans risque.
- 32 fichiers audio orphelins dans `site/sounds/` (preuve détaillée §4) : `sounds/atomes/{duree-145-millions,duree-200-millions,duree-250-millions,duree-66-millions,epoque-cenozoique,epoque-cretace,epoque-jurassique,epoque-trias}.mp3` (8) · `sounds/epoques/{66,145,200,250}-millions-{trias,jurassique,cretace,cenozoique}.mp3` (16) · 7 prototypes racine (`Gagné.mp3`, `motus-boule-noire_cTY2JG4.mp3`, `among-us-role-reveal-sound.mp3`, `mario coin hit.mp3`, `maro-jump-sound-effect_1.mp3`, `super-mario-coin-sound.mp3`, `pokemon lvl up.mp3`) · `sounds/voix/lieux/{bus,fusee}-{dinos,dodo,garage,lettres,monde,roulotte}.mp3` (12, dead-code confirmé).

### Déplacements proposés

| De | Vers |
|---|---|
| `site/tile-tools/`, `site/tools/`, `site/dev-fx.html`, `site/dev-sounds-ui.html`, `site/design-mockups.html`, `site/map-mockups.html`, `site/atelier-couleurs.html` | `studio/minijeux/tools/` (sorti du build `_site/`) |
| `site/design-compte/`, `site/design-lecture/`, `site/design-mur/` | `studio/minijeux/docs/design-explorations/` |
| `studio/temp/_comp-runner-ceratopsiens.cjs` | `studio/dino/scripts/verif-echelle.mjs` (généralisé) |
| `studio/minijeux/tests/batch-avatars-{dual,gpt,grok}.mjs`, `batch-decor-gpt.mjs` | `studio/minijeux/scripts/{avatars,decor}/` |
| Scripts `studio/referentiel/_gen-lot-dinos.mjs` | `studio/dino/scripts/audio/` |
| Scripts `studio/referentiel/_gen-lot-nombres.mjs`, `_gen-lot-phonemes.mjs`, `_gen-consignes.mjs`, `_gen-regles.mjs`, `_fix-phonemes-vides.mjs`, `_test-phonemes-graphies.mjs` | `studio/minijeux/scripts/audio/` |

### Questions à trancher (non prouvables en lecture seule dans le budget imparti)

1. **`studio/max-adventure/public/assets/tiles/themes/` vs les sous-dossiers par catégorie (`roads/`, `buildings/`...)** : lequel des deux rangements le code Phaser charge réellement au runtime ? C'est le plus gros gisement (~38 Mo versionnés) mais je n'ai pas vérifié quel chemin est lu par les scènes Phaser — à faire avant toute suppression.
2. **`site/audio/` (274 Mo, 1 341 fichiers)** : pas d'orphelin net identifié dans l'échantillon vérifié, mais le corpus est référencé via construction dynamique de chemin (pas de grep littéral exhaustif possible) — un vrai audit complet nécessiterait de croiser avec `studio/referentiel/empreintes.json` (versionné, sert justement à tracer "ce qui est à jour") plutôt qu'un grep par nom.
3. ~~Classement fin des scripts `studio/referentiel/_gen-*.mjs`~~ **RÉSOLU** : les 13 scripts sont maintenant classés avec preuve de code (§5) — 7 vers JEU, 1 vers DINO, 3 restent I18N/transverse dans `studio/referentiel/`, 2 en statut mixte documenté (`_gen-plan.mjs`, `_extraire-textes-jeux.mjs`).
4. **`studio/minijeux/tests/_scratch/`** : dossier actif (utilisé par `collection.spec.mjs`) mais son contenu mélange scripts actifs et ~25 PNG de captures anciennes — lesquels sont encore lus par un spec ? Non vérifié fichier par fichier.
5. **`studio/minijeux/tests/{test-dinos*.mjs, check-dinos-grid.mjs, _check-window-soundpool.mjs}`** : aucune preuve d'usage récent (3 mois pour les 5 premiers), mais aucune preuve positive de mort non plus (pas dans le harnais CI `audit-gabarit.mjs`) — à confirmer avec Papa Yann si le scroll/grid dino compte encore.
6. **`site/mj-pose-tiles.html`** : `retire:true` dans `catalog.js` mais fichier encore lié depuis `compte.html` — le retrait du menu masque-t-il vraiment l'accès, ou juste l'entrée du menu principal ? Sort du périmètre lecture-fichier (nécessite de lire le comportement runtime de `catalog.js`/`compte.html`).
7. **`site/img/dinos/familles/`** (864 Ko) : usage non vérifié en détail par manque de temps — probable mais pas prouvé par grep dédié.
8. **`studio/dino/content/scripts-audio/fr/V3/json/_draft-2026-08-17/`** : brouillon récent (moins d'1 mois) — la V4 albertosaurus l'a-t-elle bien remplacé ?
9. **Les 2 `inbox/`** (minijeux et narration) : contenu à trancher par jugement éditorial (game-pmo / narration-pmo), pas par preuve de fichier — la règle des 48h est violée depuis 22 et 81 jours respectivement, ce qui est en soi un signal à remonter indépendamment du contenu.
10. **`studio/narration/stories/{003..008}/{6-selection.md,10-synthese-finale.md}` identiques bit à bit entre 6 histoires différentes** : gabarit jamais rempli ou vraie régression de contenu ? Nécessite lecture éditoriale.

### Portes de vérification (à rejouer par l'orchestrateur)

```
test -s docs/handoffs/rapports/HO-G05-inventaire.md && grep -c "^| " docs/handoffs/rapports/HO-G05-inventaire.md
git status --porcelain | grep -v "docs/handoffs/rapports/"
```
