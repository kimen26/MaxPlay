# HO-G10 — Nettoyage exécution + prod propre

**Statut :** pret (verdicts validés par l'orchestrateur le 2026-09-03 sur la base de `rapports/HO-G05-inventaire.md`)
**Depend de :** HO-G05 (fait)

## Objectif
Dans `site/` il ne reste que ce que la prod sert ; les outils, brouillons, artefacts et doublons sortent ou disparaissent ; les scripts de génération vivent dans le `scripts/` de leur pôle. Tout ce qui est supprimé est récupérable par git (rien n'est écrasé, pas de `--force`).

## Contexte a lire d'abord
- `docs/handoffs/rapports/HO-G05-inventaire.md` (preuves d'usage, section par section)
- `docs/handoffs/README.md` (règles : zéro git, ownership)
- `.github/workflows/deploy.yml` (`cp -r site/* _site/` : sortir un fichier de `site/` = le sortir de la prod)

## Verdicts tranchés (à exécuter tels quels)

### SUPPRIMER (rm, récupérable git)
1. `temp/` (racine, 210 Mo, non versionné) — entier.
2. `studio/temp/` — entier SAUF `_comp-runner-ceratopsiens.cjs` (déplacé, voir plus bas).
3. `studio/minijeux/test-results/` (artefact Playwright versionné).
4. `studio/minijeux/tests/_scratch/` — **entier** : `collection.spec.mjs` recrée le dossier (`mkdirSync(scratch, {recursive:true})`) et n'y lit rien de préexistant. Les 11 scripts `.mjs` qu'il contient (`capture-*.mjs`, `check-*.mjs`, `crop.mjs`, `final-e2e.mjs`, `shot.mjs`) sont des essais ponctuels dino/collection sans usage tracé.
5. `studio/minijeux/tests/{test-dinos.mjs,test-dinos-v2.mjs,test-dinos-scroll.mjs,test-dinos-grid-scroll.mjs,check-dinos-grid.mjs,_check-window-soundpool.mjs}` — essais ad hoc, pas des specs du harnais.
6. `site/index-v2-archive.html`.
7. `infra/bot/*.log` (non versionnés).
8. Les 32 fichiers audio orphelins de `site/sounds/` listés au § « Fichiers à supprimer » du rapport G05 (8 `atomes/`, 16 `epoques/`, 7 prototypes racine, 12 `voix/lieux/{bus,fusee}-*.mp3`). Avant chaque `rm` : `grep -rn "<nom-sans-extension>" site/*.html site/js/*.js` doit être vide (re-vérifier, le rapport peut avoir vieilli). Si un grep matche : ne pas supprimer, le lister.
9. `studio/max-adventure/public/assets/tiles/themes/` (38 Mo, 2 515 fichiers) : le code charge `assets/tiles/roads/…`, `buildings/…` etc. (`src/scenes/PreloadScene.ts` L29+), jamais `themes/`. Vérifier d'abord `grep -rn "themes" studio/max-adventure/src studio/max-adventure/index.html studio/max-adventure/vite.config.ts` = vide, puis supprimer. Le script `site/tile-tools/scripts/import_themes.py` (qui produit ce dossier) suit le déplacement de tile-tools ; ajouter en tête de ce script un commentaire « sortie `themes/` retirée du repo 2026-09-03 (doublon des dossiers par catégorie chargés par PreloadScene) ».
10. `studio/dino/content/scripts-audio/fr/V3/json/_draft-2026-08-17/` (4 fichiers) : les versions finales `_seg-albertosaurus-*.json` existent à côté.

### DÉPLACER (mv, puis corriger les chemins internes des scripts déplacés)
| De | Vers |
|---|---|
| `site/tile-tools/` | `studio/minijeux/tools/tile-tools/` |
| `site/tools/` | `studio/minijeux/tools/web/` |
| `site/dev-fx.html`, `site/dev-sounds-ui.html`, `site/design-mockups.html`, `site/map-mockups.html`, `site/atelier-couleurs.html` | `studio/minijeux/tools/pages/` |
| `site/design-compte/`, `site/design-lecture/`, `site/design-mur/` | `studio/minijeux/docs/design-explorations/` |
| `site/PIPELINE-MEMORY-MJ.md` | `studio/minijeux/memory/archive/PIPELINE-MEMORY-MJ.md` (bandeau archive en tête ; si `studio/minijeux/memory/archive/` n'existe pas encore, le créer) |
| `studio/temp/_comp-runner-ceratopsiens.cjs` | `studio/dino/scripts/verif-echelle.cjs` (renommer, généraliser l'entrée : liste de dinos en argument au lieu de la liste codée) |
| `studio/minijeux/tests/batch-avatars-{dual,gpt,grok}.mjs` | `studio/minijeux/scripts/avatars/` |
| `studio/minijeux/tests/batch-decor-gpt.mjs` | `studio/minijeux/scripts/decor/` |
| `studio/referentiel/_gen-lot-dinos.mjs` | `studio/dino/scripts/audio/` |
| `studio/referentiel/{_gen-lot-nombres,_gen-lot-phonemes,_gen-consignes,_gen-regles,_fix-phonemes-vides,_test-phonemes-graphies}.mjs` | `studio/minijeux/scripts/audio/` |
| `studio/referentiel/{_gen-lot-i18n-noms,_gen-lot-i18n-noms-v2-sts}.mjs`, `_gen-plan.mjs`, `_gen-humeur-invitee.mjs`, `_extraire-textes-jeux.mjs`, `_gen-textes-site.mjs` | restent dans `studio/referentiel/` mais dans un sous-dossier `generer/` (le README du référentiel dit déjà « deux moitiés » : `constater` à la racine, `generer/` pour ce qui appelle une API) |

Pour chaque script déplacé : corriger ses `import`/`require`/chemins relatifs (`../lib`, `../site/...`) et le vérifier avec `node --check <fichier>` (syntaxe) puis, si le script accepte `--help` ou `--dry-run`, le lancer ainsi. Corriger les commandes du `studio/referentiel/README.md` et du `_PLAN-GENERATION.md`/`_FILE-EL.md` qui citent ces scripts. Ne PAS lancer d'appel ElevenLabs.

### GARDER (ne pas toucher, contrairement à l'hypothèse de l'audit)
- `site/compte.html`, `suivi.html`, `auteur.html`, `lecture.html`, `avatar-atelier.html`, `mj-pose-tiles.html`, `max-adventure.html` (pages produit liées).
- `site/design-shared/` (police Cursif `@font-face` de mj-50..53).
- `site/img/dinos/wiki/` (utilisé par `dev-dinos.html`, qui est la page prod de l'encyclopédie), `site/img/dinos/familles/` (vérifier par grep et le noter).
- `site/video/`, `site/audio/` (pas de preuve d'orphelin ; un audit croisé avec `studio/referentiel/empreintes.json` est noté en TODO, pas fait ici).
- Toutes les archives (`_archive/`, `archive/`) : conformes à la doctrine, rien à supprimer.
- `studio/minijeux/inbox/` et `studio/narration/inbox/` : hors périmètre (jugement éditorial des pôles).

## Fichiers autorises
Tout ce qui est nommé ci-dessus, plus : `.gitignore` (ajouter `studio/minijeux/tests/_scratch/` ; retirer les motifs devenus inutiles si `temp/` reste ignoré : le laisser), `studio/referentiel/README.md`, `studio/referentiel/_PLAN-GENERATION.md`, `studio/referentiel/_FILE-EL.md`, `studio/minijeux/tools/README.md` (création : 10 lignes, ce que contient le dossier et comment lancer les pages en local : `npx serve studio/minijeux/tools/pages` ou ouverture directe), `studio/minijeux/scripts/README.md` (création, même esprit).

## Hors perimetre
- `studio/minijeux/{INDEX.md,CLAUDE.md}`, `studio/dino/{INDEX.md,CLAUDE.md}`, `.claude/**`, `CLAUDE.md` racine : les pointeurs vers les anciens chemins (`site/tile-tools`, `site/tools`) y sont LISTÉS dans le rapport (fichier:ligne), pas modifiés — HO-G07 et les briefs de pôle s'en chargent. Attention : `.claude/rules/tile-tools.md` a des `paths:` sur `site/tile-tools/**` et `site/tools/**` → à signaler explicitement (nouveaux globs `studio/minijeux/tools/**`).
- `site/js/`, `site/index.html`, `site/mj-*.html` : ne pas toucher. Si un de ces fichiers référence un chemin déplacé (grep `tile-tools|tools/|design-compte|design-lecture|design-mur|dev-fx|dev-sounds|map-mockups|design-mockups|atelier-couleurs`), NE PAS déplacer la cible et le lister.
- Aucune commande git. Aucun appel API.

## Portes de verification
```bash
test ! -d temp && test ! -d studio/temp && test ! -d studio/minijeux/test-results && test ! -d studio/minijeux/tests/_scratch && echo "supprimés OK"
test ! -d site/tile-tools && test ! -d site/tools && test ! -d site/design-compte && test ! -f site/index-v2-archive.html && test ! -f site/PIPELINE-MEMORY-MJ.md && echo "site/ propre"
ls site/design-shared site/compte.html site/suivi.html site/lecture.html site/auteur.html site/avatar-atelier.html site/mj-pose-tiles.html >/dev/null && echo "pages produit intactes"
test ! -d studio/max-adventure/public/assets/tiles/themes && ls studio/max-adventure/public/assets/tiles/roads | head -2
grep -rlE "tile-tools/|/tools/|design-compte|design-lecture|design-mur|dev-fx\.html|dev-sounds-ui|map-mockups|design-mockups|atelier-couleurs" site/*.html site/js/*.js   # vide (sinon : listé + cible non déplacée)
ls studio/minijeux/tools/tile-tools/scripts/render.py studio/minijeux/tools/web studio/minijeux/tools/pages studio/minijeux/docs/design-explorations
ls studio/minijeux/scripts/audio studio/dino/scripts/audio studio/dino/scripts/verif-echelle.cjs studio/referentiel/generer
for f in studio/minijeux/scripts/audio/*.mjs studio/dino/scripts/audio/*.mjs studio/referentiel/generer/*.mjs studio/dino/scripts/verif-echelle.cjs; do node --check "$f" || echo "SYNTAXE KO $f"; done; echo "check fini"
node studio/referentiel/build.mjs >/dev/null && echo "referentiel constater OK"
cd studio/minijeux/tests && npm run mj:test -- mj-50 2>&1 | tail -5     # la police Cursif est toujours servie ; le harnais passe
git status --porcelain | grep -vE "^( D|D |\?\?| M|R )" | head    # rien d'inattendu
```

## Rapport attendu
Liste exacte des suppressions (avec le grep de ré-vérification pour les sons), des déplacements (avec les chemins internes corrigés), les fichiers `site/` qui référençaient une cible (donc non déplacée), les pointeurs à corriger ailleurs (fichier:ligne, dont les `paths:` de `.claude/rules/tile-tools.md`), sortie des portes, questions ouvertes.
