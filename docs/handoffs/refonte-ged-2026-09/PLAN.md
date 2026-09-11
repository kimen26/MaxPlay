# Refonte GED site ↔ studio — PLAN MAÎTRE (ouvert 2026-09-12)

> **Ce fichier est le cerveau de la campagne.** Après tout `/compact`, l'orchestrateur le relit en premier, puis `memory/TODO.md`. Il porte l'état (colonne Statut), les règles, et la spec de chaque lane. Les briefs `HO-Rnn.md` sont écrits au fil de l'eau dans ce dossier, les rapports d'exécutants dans `rapports/`.
> Source : `memory/audits/2026-09-12-archi-ged-site-studio.md`. Décisions : `memory/DECISIONS.md` D-007 à D-011.

## Décisions de Papa Yann (2026-09-12)

1. `git filter-repo` : **GO** (fin de campagne, une seule fois).
2. Audio tiers sous droits : **suppression sèche** (pas de vault pour l'audio).
3. Fiche canon dino `studio/dino/content/dinos/<id>.json` : **GO**.
4. Narration : **hors périmètre**. On ne touche ni ses agents, ni `studio/narration/**`, ni `site/lecture*.{html,js}`.
5. Refonte complète du reste : on supprime ce qui ne sert plus, process militaire et contrôlé pour les mini-jeux, modulable, réutilisable, sons et images rangés par usage, index explicites, et à chaque choix la question : local ou BDD ? rapidité ? réutilisation ? internationalisation ?

## Rôles et règles d'orchestration

- **Orchestrateur** (cette session, Fable) : rédige les briefs, lance les exécutants, relit les rapports, rejoue les portes, commite, grave, enchaîne. Ne code pas lui-même sauf vague 0 et vague 6 (git, destructif, décisions). Une relance « tout va bien continue » tombe toutes les ~5 h 30 (crons `65b37f46` et `31be474e`, à supprimer à la fin).
- **Exécutants** : sous-agents `general-purpose`, modèle **Sonnet** par défaut, **Haiku** pour les lanes purement mécaniques (déplacements, tableaux). Chaque exécutant travaille dans son propre contexte, sur ses fichiers autorisés uniquement, teste lui-même, colle la sortie des portes dans son rapport. **Zéro commande git côté exécutant.**
- **Ownership par fichier** : deux lanes actives de la même vague ne partagent jamais un fichier. Une vague est commitée avant la suivante (`git add <chemins>` explicites, jamais `-A`).
- **Une archive ne se réécrit pas** : rotation = déplacement verbatim + bandeau daté. Les numéros `D-NNN`/`L-NNN` se prennent en relisant le fichier au moment d'écrire.
- **Un doute = question dans le rapport**, jamais « je corrige au passage ». L'orchestrateur tranche et répond.
- **Chaque rapport répond aux 5 questions de conception** quand la lane touche à des données ou des assets : local ou BDD ? impact rapidité (poids, requêtes) ? réutilisable par un autre pôle ? i18n (langue dans la clé ? chemin ?) ? index/manifeste nécessaire et où ?
- **Preuve avant livraison** : un log « ok » ne suffit pas. Playwright vert, capture ouverte, `git diff --stat` cohérent avec le brief.
- Modèle de brief : `docs/handoffs/_template.md` (Statut · Depend de · Objectif · Contexte · Fichiers autorisés · Hors périmètre · Travail · Portes · Rapport).

## Portes globales (rejouées par l'orchestrateur à chaque fin de vague)

```bash
cd studio/minijeux/tests && node audit-gabarit.mjs            # 0 BLOQUANT attendu
cd studio/minijeux/tests && node run-all.mjs                  # harnais Playwright complet (long, à lancer en fond)
node studio/referentiel/build.mjs                             # référentiel régénéré sans erreur
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs   # état dinos inchangé (ou amélioré)
git status --short | grep -v '^??' | wc -l                    # rien de non prévu dans l'index
```

## État des vagues

| Vague | Lane | Titre | Modèle | Statut |
|---|---|---|---|---|
| 0 | R00 | Orchestrateur : purge, suppressions, vault, gitignore, branches, handoffs `_done/`, migration Supabase 013 | Fable | **à faire** |
| 1 | R01 | Minijeux : docs GC (figées mortes, `menu.md`, refs `pmo/`, INDEX, EQUIPE, handoffs `_done/`, mockups/captures dehors, scripts dino rendus) | Sonnet | à faire |
| 1 | R02 | Minijeux : rotation mémoire (LESSONS 70 Ko, TODO 39 Ko, CHANGELOG) | Sonnet | à faire |
| 1 | R03 | Dino : rotation mémoire + docs `_done/` + dé-triplication rule/CLAUDE/figées + playbook vs skill + `temp/` | Sonnet | à faire |
| 1 | R06 | Lunii : cohérence post-suppression audio tiers, un moteur `build-pack.mjs` + configs, purge `.build-*` intégrée | Sonnet | à faire |
| 1 | R07 | Site : assets morts et rips sous droits (sounds racine, phonemes-test, music v1-v3, mockup.*, traces, decor.js, pins.js, voices-manifest) | Sonnet | à faire |
| 2 | R08 | Site : `package.json` racine + `site/js/gen/` + déplacement des générés + `npm run build/check/test` | Sonnet | à faire |
| 3 | R09 | Minijeux : `mur.js` piloté par `catalog.js` + `check-mj-coherence.mjs` + `mj-template.html` + CI | Sonnet | à faire |
| 3 | R10 | Site : dédoublonnage runtime dans les mj (speak, speechSynthesis, confettis, retour, font-face, lang.js) | Sonnet | à faire |
| 4 | R12 | Dino : fiche canon `content/dinos/<id>.json` → générateur `dinos-data.js` + en-têtes audio + check data ↔ narré | Sonnet | à faire |
| 4 | R11 | Site : service worker + manifest partout + politique de cache par type d'asset | Sonnet | à faire |
| 4 | R04 | Gouvernance : hooks consolidés (1 processus par événement), points d'entrée des agents orphelins JEU/DINO, `.kimi-code` résidus | Sonnet | à faire |
| 5 | R13 | Site : WebP (sprites, paléoart) via ffmpeg + générateurs mis à jour | Sonnet | à faire |
| 5 | R14 | Transverse : routine `npm run gc` (handoffs, LESSONS, artifacts, inbox, liens md, assets orphelins) | Sonnet | à faire |
| 6 | R99 | Orchestrateur : `git filter-repo`, `gc --aggressive`, force-push, CHANGELOG, MEMORY, audit de clôture | Fable | à faire |

Statuts possibles : à faire · brief écrit · en cours · rapport reçu · validé · commité · bloqué (raison).

---

## Vague 0 — R00 (orchestrateur seul)

Destructif ou git : personne d'autre.

1. Créer `C:\ProjetsPerso\MaxPlay-vault\` (hors repo). Zipper `_archive/` → `MaxPlay-vault/_archive-2026-09-12.zip`. Copier `_archive/INDEX.md` → `docs/ARCHIVES.md` avec bandeau « contenu dans le vault, zip daté ». `git rm -r _archive`.
2. `rm -rf studio/lunii/.build-*` (684 Mo, livrables déjà dans `~/.studio/library/`).
3. Suppression sèche audio tiers : `git rm -r studio/dino/content/inbox studio/lunii/assets/audio/histoires-dodo studio/lunii/assets/audio/pierre-loup`. Vérifier qu'il ne reste que du contenu MaxPlay dans `studio/lunii/assets/`.
4. `.gitignore` réécrit en patterns génériques : `**/_new-*/`, `**/inbox/*.mp3`, `**/.build-*/`, `**/*.log`, `**/.artifacts/`, `**/_scratch/`, `temp/`, conserver les exceptions référentiel. Retirer les lignes zone-par-zone devenues inutiles.
5. Branches : `git branch -D reorg/2026-04-30` ; `git push origin --delete reorg/2026-04-30 main` (HEAD distant = `master`, vérifié).
6. Handoffs racine : `docs/handoffs/_done/` ← HO-G01…G13, HO-MJ-01, HO-NAR-01 (tous `fait` au registre) ; corriger le statut interne de HO-G12 en `fait` ; `HO-POLE-memoire-convergente-COMMUN.md` → `memory/DOCTRINE.md` (il est cité sous ce nom et n'existe pas). Registre README mis à jour avec une ligne « archivés le 2026-09-12 ».
7. Supabase : migration `013_drop_dead_tables.sql` (drop `feedback`, `tile_refs`) appliquée via MCP `supabase` ; `child_state`/`game_sessions` : **on garde** (câblées, coût nul), décision notée dans `infra/supabase/README.md`.
8. MCP `supabase-maxvoyage` : il vit dans `~/.claude.json` au niveau utilisateur, pas dans le projet. À déplacer par Papa Yann dans le `.mcp.json` du projet MaxVoyage. **Question ouverte, ne pas toucher.**
9. Commit vague 0 : `chore(ged): vague 0 — purge binaires, archive hors repo, gitignore, branches, handoffs _done, migration 013`.

Portes : `git status` propre hors `_new-*` ; `du -sm studio/lunii` < 250 ; `git ls-files | wc -l` ≈ 7 300 (13 439 − 6 142) ; `node studio/lunii/scripts/build-dinos-pack.mjs` toujours capable de construire (ses sources ne sont pas touchées).

---

## Vague 1 — cinq lanes parallèles, aucun fichier partagé

### R01 — Minijeux : docs GC
- **Owner** : `studio/minijeux/{docs,tools,scripts,inbox,INBOX.md,INDEX.md,EQUIPE.md,AGENTS.md,CLAUDE.md}` ; `studio/dino/scripts/**` (réception des 3 scripts dino) ; `.claude/agents/game-pmo.md` (ligne `pmo/` seulement).
- **Hors** : `studio/minijeux/memory/**` (R02), `tests/**`, `i18n/**`, tout `site/`.
- **Travail** : (a) figées mj-46/48/49/51/53 + `figees/menu.md` : retirer toute référence à un jeu absent de `site/js/catalog.js`, bandeau daté « purge refs jeux morts 2026-09-12 » ; (b) écrire les 5 figées manquantes (mj-28, 30, 35, 40, 42) à partir du code réel et du gabarit des figées existantes, marquées « rétro-documentée » ; (c) 20 refs `pmo/` → chemin réel dans `memory/` ; (d) `INDEX.md` : 6 liens morts corrigés, date de MAJ ; (e) `EQUIPE.md` : un seul compte d'agents, cohérent avec `.claude/agents/` (JEU = game-conseiller, game-dev, game-mj-reviewer, game-pmo, game-test-audio, game-test-secu) ; (f) `docs/handoffs/_done/` ← 8 briefs faits, statut interne aligné ; (g) `docs/design-explorations/` (54 mockups de pages déjà construites) et `docs/research/{captures,menus}` → **supprimés** (les pages existent en prod, les mockups sont morts) ; les 3 md de research restent ; (h) docs racine `2026-07-*` et `jeux/{CLASSIFICATION,REVUE}-2026-07.md`, `mj-34-35-36-specs.md` → `docs/_archive/2026-07/` avec bandeau ; `MECANIQUES.md` et `_PALIERS-DIFFICULTE.md` : retirer les jeux morts ; (i) `tools/` fusionné dans `scripts/` avec README unique (`scripts/{audio,avatars,decor,i18n,pages}`), les 3 scripts dino (`gen-dinos-assets.mjs`, `_check-catalogue-dino-i18n.mjs`, `_check-ombres-dino.mjs`) déplacés vers `studio/dino/scripts/` avec chemins internes corrigés ; `gen_avatars_manifest.py` réécrit en `.mjs` ou supprimé s'il a un équivalent ; (j) `inbox/` : le PNG GUID de juillet supprimé, `INBOX.md` conservé (canal bot).
- **Portes** : `grep -rlE "pmo/" studio/minijeux .claude/agents/game-pmo.md` vide ; script de liens md (écrire `studio/minijeux/scripts/check-liens-md.mjs` si absent) 0 lien mort sur `studio/minijeux/**/*.md` ; pour chaque `mj-XX` de `catalog.js` une figée existe ; `node studio/dino/scripts/gen-dinos-assets.mjs --dry-run` (ou équivalent) tourne depuis son nouveau chemin.

### R02 — Minijeux : rotation mémoire
- **Owner** : `studio/minijeux/memory/**`.
- **Travail** : `LESSONS.md` : garder les leçons encore vraies et générales (cible ≤ 20 Ko), déplacer le reste **verbatim** dans `memory/archive/lessons-2026-H1.md` avec bandeau, numéros L-NNN conservés ; `TODO.md` : supprimer ce qui est fait ou obsolète (croiser avec `catalog.js`, les commits, `CHANGELOG.md`), regrouper en lanes vivantes, cible ≤ 8 Ko, les lanes fermées passent dans `CHANGELOG.md` en capacités livrées ; `INVARIANTS.md` relu, refs `pmo/` corrigées ; `MEMORY.md` : état vrai en ≤ 60 lignes ; `audits/` : soit alimenté par les 3 audits de juillet déplacés depuis `memory/audits/`, soit supprimé.
- **Portes** : `wc -c` des 5 fichiers ; aucun L-NNN perdu (`grep -o "L-[0-9]\{3\}"` avant/après sur l'union vivant+archive identique) ; 0 ref `pmo/`.

### R03 — Dino : mémoire, docs, dé-triplication
- **Owner** : `studio/dino/{memory,docs,figees,temp,CLAUDE.md,INDEX.md,AGENTS.md}` ; `.claude/rules/dino.md` ; `.claude/skills/{nouveau-dino,dino-paleoart,dino-images-lunii}/**` ; `studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md` ; `studio/dino/content/sources/megafaune/**` ; `studio/dino/content/sources/images/variantes-non-retenues/**` ; `studio/dino/content/sources/video/**`.
- **Hors** : `content/{dinos,scripts-audio,i18n,lunii,data,scripts}`, `site/**` (R12 plus tard).
- **Travail** : rotation `LESSONS.md` (68 Ko) et `TODO.md` (47 Ko) comme R02 ; `docs/handoffs/_done/` ← HO-003…HO-023 faits, `rapports/` des pilotes conservés dans `_done/rapports/` ; **une seule source par règle** : `.claude/rules/dino.md` = règles opérationnelles (Tritri, échelle, grep-interdits, checklist 8 axes, commit+push), `studio/dino/CLAUDE.md` = navigation et gouvernance uniquement (renvoie à la rule), `figees/encyclopedie.md` = verrous produit datés uniquement (ce qui ne bouge pas sans alerte rouge) ; `nouveau-dino/SKILL.md` = procédure unique, `_PLAYBOOK-DINO-NOUVEAU.md` réduit à un pointeur ; `dino-images-lunii` ne garde que le 320×240 N&B, le system prompt paléoart part dans `dino-paleoart` ; `temp/audit-fiches.cjs` supprimé (doublon de `export/_audit-fiches-complet.cjs`) ; `megafaune/_refs-visuelles/` (41 Mo dont PDF 15 Mo), `variantes-non-retenues/`, `video/` → **supprimés** (refs visuelles consultables en ligne, variantes rejetées par définition) ; noter dans `memory/TODO.md` dino : « `site/img/dinos/_new-*` : intégrer ou jeter, gitignorés par pattern ».
- **Portes** : `wc -c` ; L-NNN conservés ; `grep -c Tritri` sur les 3 fichiers = présent dans un seul (la rule) ; 0 lien mort md dans `studio/dino/**` ; `node studio/dino/content/scripts/export/_gen-etat-dinos.cjs` inchangé.

### R06 — Lunii : cohérence et moteur unique
- **Owner** : `studio/lunii/**`.
- **Travail** : supprimer `build-dodo-pack.mjs`, `build-pierre-loup-pack.mjs` (sources supprimées en vague 0) ; `packs-manifest.json` : les packs dodo et pierre-loup passent en type `library` (UUID, déjà déposés dans `~/.studio/library/`) ; README et `LESSONS-MOTEUR.md` mis à jour (provenance : plus d'audio tiers dans le repo) ; **un moteur** `build-pack.mjs` + `packs/<nom>.json` (dinos, voyage, tritri) remplaçant les 3 scripts restants, avec purge automatique du `.build-<nom>/` après dépôt du zip ; `prepare-dino-assets.mjs` conservé (dérivés ffmpeg).
- **Portes** : `node build-pack.mjs dinos` produit un zip dont la liste de fichiers (`unzip -l`) est identique à celle du dernier `maxplay-dinos-de-max.zip` du vault/library (à part les horodatages) ; idem `voyage`, `tritri` ; `.build-*` absent après build.
- **Question de conception à documenter** : l'audio Lunii est une copie physique de `site/audio/dinos/fr/` — acceptable (dérivé ffmpeg, pas de TTS) mais à régénérer par `build-pack.mjs` à chaque run, jamais stocké dans `assets/audio/` s'il peut être recalculé en < 1 min. Décider et appliquer.

### R07 — Site : assets morts et rips sous droits
- **Owner** : `site/sounds/**`, `site/design-shared/mockup.{css,js}`, `site/img/dinos/traces/**`, `site/img/decor/{meteorite_feu,nuage_gris}.png`, `site/js/{decor,pins,voices-manifest,tracker,victory-sounds,sounds,mj-golden}.js`, `site/index.html`, `site/mj-13a.html`, `site/mj-13c.html`, `site/mj-48.html` (lignes de chemins sons uniquement), `studio/referentiel/catalogue/**` (entrées sons retirées).
- **Travail** : 15 rips racine `sounds/` (Pokémon, Mario, FF7, Zelda, SNCF, freesound…) : pour chaque référence dans le code (`index.html`, `mj-13a`, `mj-13c`, `mj-48`, `mj-golden.js`, `victory-sounds.js`), remplacer par un son **libre déjà présent** dans `sounds/fx/` ou `sounds/music/` de même fonction, documenter la table de correspondance dans `sounds/_BANQUE-SONS.md`, supprimer les rips ; `sounds/phonemes-test/` (65 f) supprimé après vérification 0 ref ; `music/generique-v1..v3`, `victoire-v1..v4` : garder uniquement les versions référencées, renommer sans suffixe de version ; `design-shared/mockup.*` supprimés ; `img/dinos/traces/` supprimé ; `decor.js`, `pins.js` supprimés (logique déjà dans `mj-kit.js` et `regle-info.js`) ; `voices-manifest.js` supprimé et `tracker.js` ne le charge plus ; casse `sounds/voix/pt-BR` → `pt-br` avec refs mises à jour.
- **Portes** : `grep -rE "ff7_victory|pikachu|victory-mario|zelda-tresor|sncf-france|perfect-fart|freesound_community|bus-closing-door|phonemes-test|decor\.js|pins\.js|voices-manifest|mockup\.|pt-BR" site/*.html site/js` vide ; `node audit-gabarit.mjs` 0 bloquant ; `npm run mj:test` sur mj-13a, mj-13c, mj-48 et `index.spec` verts ; `node studio/referentiel/build.mjs` sans erreur.
- **Question de conception** : proposer dans le rapport une arborescence cible `site/sounds/` par **usage** (ui/ · feedback/ · voix/<lang>/ · music/ · nombres/<lang>/ · phonemes/<lang>/) avec la règle « la langue est un dossier, jamais un suffixe » ; ne pas l'appliquer dans cette lane (R08 décidera avec le manifeste).

---

## Vague 2 — R08 seul sur `site/`

### R08 — `package.json` racine, `site/js/gen/`, build/check/test
- **Owner** : `package.json` (nouveau, racine), `site/js/**` (déplacements), tous `site/*.html` (lignes `<script src>` uniquement), `studio/{dino,minijeux,referentiel}/**/scripts` générateurs (ligne de chemin de sortie uniquement), `.github/workflows/*.yml`, `studio/minijeux/tests/{run,run-all,audit-gabarit}.mjs` (chemins).
- **Hors** : `site/lecture-data.js` et `studio/narration/**` (narration hors périmètre : `lecture-data.js` reste à la racine, noté comme exception).
- **Travail** : inventorier les 14 fichiers marqués « généré » et **prouver** pour chacun l'existence du générateur ; ceux qui en ont un → `site/js/gen/` avec en-tête normalisé `// GÉNÉRÉ par <chemin du script> — ne pas éditer` ; ceux qui n'en ont pas → restent dans `js/` et perdent le marqueur ; `dinos-data.js` reste dans `js/` (devient généré en R12) ; `package.json` racine avec `scripts` : `build` (enchaîne tous les générateurs dans l'ordre des dépendances), `check` (audit-gabarit + référentiel + liens md), `test` (Playwright run-all), `test:mj -- mj-XX`, `gc` (réservé R14) ; `studio/minijeux/tests/package.json` fusionné dans le racine (workspace ou dépendance directe `playwright`) ; CI appelle `npm ci && npm run check` puis déploie.
- **Portes** : `npm run build` puis `git status --short` ne montre **aucun** diff hors déplacements (preuve que les générateurs sont déterministes et à jour) ; `npm run check` vert ; `npm run test` vert (lancer en fond, coller le résumé) ; ouvrir `site/index.html` et `site/dev-dinos.html` via Playwright, capture, 0 erreur console.

---

## Vague 3 — R09 ∥ R10 (fichiers disjoints)

### R09 — `mur.js` ← `catalog.js`, cohérence mj, gabarit source
- **Owner** : `site/js/{mur,catalog}.js`, `site/css/mur.css`, `site/_template/**` (nouveau), `studio/minijeux/tests/check-mj-coherence.mjs` (nouveau), `studio/minijeux/tests/{index,mur-nid}.spec.mjs`, `.github/workflows/deploy.yml` (étape check), `studio/minijeux/docs/STANDARD-MJ.md`, `studio/minijeux/CLAUDE.md` (section livraison).
- **Travail** : ajouter à chaque entrée de `MAXPLAY_CATALOG` les champs que `mur.js` code en dur aujourd'hui (zone, vignette, libellé Mur) ; `mur.js` ne contient plus aucun id `mj-` : il itère sur `catalogVisible()` ; `mj-58` disparaît, les 9 jeux absents apparaissent (ou sont explicitement `parental`/`retire` dans le catalogue avec raison) ; `site/_template/mj-template.html` : squelette complet (head, dépendances dans l'ordre canonique, `.hdr`, `MJ.init`, `G.buildPips`, `G.showEnd`, section i18n, commentaire « comment livrer » pointant vers le process) ; `check-mj-coherence.mjs` : pour chaque jeu du catalogue vérifie html, figée, spec Playwright, 4 `strings.json`, clés référentiel, entrée `textes-jeux`, et pour chaque `mj-*.html` sur disque une entrée catalogue ; **bloquant** dans `npm run check` et la CI ; `STANDARD-MJ.md` et `CLAUDE.md` minijeux décrivent le process de livraison en une page : copier le template → coder → `npm run test:mj` → `npm run check` → figée → commit.
- **Portes** : `node check-mj-coherence.mjs` 0 erreur sur 36 jeux ; Playwright `index.spec` + `mur-nid.spec` verts ; capture du Mur à 360 px ouverte et lue : 36 jeux visibles ou justifiés.

### R10 — Dédoublonnage runtime dans les mj
- **Owner** : `site/mj-*.html` (tous), `site/dev-dinos.html` (appels `speechSynthesis` seulement), `site/css/mp-theme.css` (`@font-face` Cursif).
- **Travail** : 9 `speak()` locaux → `TTS.speak` ; 3 `speechSynthesis` bruts (`dev-dinos` ×2, `mj-20`, `mj-31`) → `TTS.speak` (respell phonétique retrouvé) ; 5 confettis locaux → `MaxFX.confetti()/burst()` ; 4 `<a href="index.html">` en dur retirés (`back-button.js` fait le travail) ; `@font-face` Cursif déclaré une fois dans `mp-theme.css`, retiré des 4 mj ; `<script src="js/lang.js">` redondant retiré des 10 mj (le shell le charge) ; `<style>` inline > 100 lignes : extraire ce qui est générique vers `mj-kit.css` uniquement si identique dans ≥ 3 jeux, sinon laisser.
- **Portes** : `npm run test:mj` vert sur **chaque** mj touché (coller la liste et le verdict) ; `node audit-gabarit.mjs` 0 bloquant, dette hex non aggravée ; capture d'un jeu à 360 px avec police Cursif visible.

---

## Vague 4 — R12 ∥ R11 ∥ R04

### R12 — Fiche canon dino
- **Owner** : `studio/dino/content/dinos/**` (nouveau), `studio/dino/content/scripts/export/**`, `studio/dino/content/scripts/audio/_md2json-v3.cjs`, `studio/dino/content/scripts-audio/*/V3/*.md` (en-tête chiffré uniquement, jamais le corps narré), `site/js/gen/dinos-data.js` (déplacé, généré), `site/js/dinos-data.js` (supprimé), `site/dev-dinos.html` + 7 mj qui incluent `dinos-data.js` (ligne de chemin), `studio/dino/memory/{TODO,DECISIONS}.md`, `.claude/skills/nouveau-dino/SKILL.md` (phase 2), `.claude/rules/dino.md` (chemin source).
- **Travail** : script one-shot `_split-dinos-data.cjs` qui découpe `dinos-data.js` en `content/dinos/<id>.json` (un par dino, ~94) + `content/dinos/_familles.json` + `_schema.json` documenté (tous les champs, unités, FR canon inline, i18n = overlay) ; générateur `_gen-dinos-data.cjs` : `dinos/*.json` → `site/js/gen/dinos-data.js` **octet pour octet identique** à l'actuel au premier run (preuve de non-régression), ensuite libre ; `_gen-etat-dinos.cjs` lit les JSON, plus de regex sur du JS ; en-tête « Chiffres data » des 4×~71 `.md` audio régénéré depuis la fiche par `_md2json-v3.cjs` (ou script dédié) ; `check-coherence-data-narre.cjs` : extrait les nombres du corps narré FR (mètres, tonnes, km/h) et échoue si écart avec la fiche, sortie lisible « dino · bloc · attendu · trouvé » ; ajouté à `npm run check` en mode **avertissement** d'abord (liste des écarts existants dans le rapport, décision de bascule bloquante par l'orchestrateur) ; `nouveau-dino` phase 2 = créer le JSON, pas éditer le JS.
- **Portes** : `diff` vide entre l'ancien `dinos-data.js` et le généré au premier run ; `_gen-etat-dinos.cjs` même compte de dinos et même couverture ; `dev-dinos.html` ouvert via Playwright, 0 erreur console, capture des 5 onglets d'une fiche ; `i18n-dinos.spec.mjs` vert ; rapport des écarts data ↔ narré.
- **Questions de conception** (réponse attendue dans le rapport) : local (JSON dans le repo, généré en JS statique, pas de fetch) — confirmer ; i18n : la fiche FR est canon, les overlays `dinos-i18n.js` restent, ne pas dupliquer les chiffres par langue ; index : `_familles.json` + le générateur suffisent-ils ou faut-il un `_index.json` ?

### R11 — Service worker et cache
- **Owner** : `site/sw.js` (nouveau), `site/js/sw-register.js` (nouveau), tous `site/*.html` (lignes `<head>` : manifest + enregistrement SW uniquement — **attendre que R10 soit commité**), `site/manifest-classic.json` → `site/manifest.json`, `studio/minijeux/tests/audit-gabarit.mjs` (règle : manifest + SW présents).
- **Travail** : precache versionné de la coquille (index, css, js runtime, catalogue, icônes) ; runtime cache `stale-while-revalidate` pour `img/`, `audio/`, `sounds/` avec plafond par cache (ex. 300 entrées audio, 500 images) ; `network-first` pour `cloud.js`/Supabase ; version du SW dérivée d'un hash calculé par `npm run build` (jamais en dur) ; page « hors ligne » minimale ; manifest lié par les 44 HTML ; `audit-gabarit` le vérifie.
- **Portes** : Playwright : charger `index.html`, couper le réseau (`context.setOffline(true)`), recharger, capture du menu affiché ; ouvrir un mj déjà visité hors ligne ; Lighthouse PWA « installable » si disponible, sinon capture de la console `serviceWorker.ready`.
- **Question de conception** : rapidité vs fraîcheur — documenter la stratégie par type d'asset dans `site/sw.js` en tête et dans `studio/minijeux/docs/STACK.md`.

### R04 — Gouvernance : hooks et agents
- **Owner** : `.claude/hooks/**`, `.claude/settings.json` (clé `hooks` uniquement), `.kimi-code/**`, `.claude/agents/README.md`, `.claude/agents/{game-*,dino-*,quick}.md` (frontmatter et ligne « invoqué par » seulement), `studio/minijeux/CLAUDE.md` et `studio/dino/CLAUDE.md` (section « agents du pôle » seulement), `scripts/gen-agents-readme.mjs`.
- **Hors** : tout agent `narration-*`, `studio/narration/**`.
- **Travail** : un seul dispatcher PowerShell par événement (`pre-tool.ps1` = figees-injector + garde-git-add selon l'outil ; `post-tool.ps1` = sync-agents-md porté en PS + rappel Kimi), tests de non-régression en PS (un fichier `hooks/tests/run.ps1` qui rejoue 5 payloads JSON et compare la sortie) ; `signal-detector` et `pmo-check` inchangés en logique, relus pour le coût (lecture du transcript bornée) ; `stop-payload.jsonl` supprimé ; agents JEU/DINO sans point d'entrée (`game-test-audio`, `game-test-secu`, `dino-fiche-writer`, `quick`) : soit une ligne « invoqué par … » dans le CLAUDE.md du pôle, soit archivage dans `_archive` **du vault** (pas du repo) — proposer, l'orchestrateur tranche ; `quick` : supprimer si aucune commande ne l'appelle ; `.kimi-code/hooks/*.kimi.ps1` réalignés sur les dispatchers.
- **Portes** : `hooks/tests/run.ps1` vert ; une session de test : `Edit` sur un fichier hors mj → 1 seul processus lancé (mesurer avec `Measure-Command`) ; `garde-git-add` bloque toujours `git add -A` (test) ; `sync-agents-md` régénère `AGENTS.md` identique à l'actuel.

---

## Vague 5 — R13 ∥ R14

### R13 — WebP
- **Owner** : `site/img/dinos/{sprites,paleoart}/**`, `studio/dino/scripts/images/webp-convert.mjs` (nouveau), `studio/dino/scripts/gen-dinos-assets.mjs` (sortie `site/js/gen/dinos-assets.js`), `site/js/gen/dinos-assets.js`, `site/dev-dinos.html` (extensions si en dur), `studio/lunii/scripts/**` (lecture paléoart : accepter webp), `.claude/skills/dino-paleoart/SKILL.md` (format de sortie).
- **Travail** : conversion `ffmpeg -c:v libwebp -quality 80` (82 webp existent déjà : même outil, même qualité), sprites à fond transparent → webp lossless ou q90 alpha ; PNG/JPG source supprimés une fois le webp validé visuellement (capture côte à côte de 5 échantillons ouverte) ; manifeste régénéré ; règle écrite dans `dino-paleoart` : « livrable = webp, jamais de png > 300 Ko dans `site/` » ; `npm run check` refuse un png/jpg > 300 Ko dans `site/img/`.
- **Portes** : `du -sm site/img/dinos` avant/après (cible −150 Mo) ; `dev-dinos.html` Playwright 0 image cassée (`img.naturalWidth === 0` compté) ; capture de 3 fiches ; `build-pack.mjs dinos` toujours vert.

### R14 — Routine `npm run gc`
- **Owner** : `scripts/gc.mjs` (nouveau, racine), `package.json` (script `gc`), `memory/DOCTRINE.md` (section « rotation »), `docs/handoffs/README.md` (section « cycle de vie »).
- **Travail** : script **en lecture seule** qui liste : handoffs `fait` hors `_done/`, statut interne ≠ registre ; `LESSONS.md`/`TODO.md` > 20 Ko par pôle ; `tests/.artifacts/` > 14 jours ; `inbox/` > 48 h ; liens md cassés (tout le repo hors `_archive`) ; images `site/img/**` non référencées (basename) ; audio `site/audio/dinos/**` non couvert par le produit cartésien slug × suffixe × langue depuis `content/dinos/*.json` et `dinos-audio-manifest` ; branches git mortes ; sortie markdown datée dans `memory/audits/gc-<date>.md` ; option `--fix` qui n'applique que les déplacements sûrs (`_done/`, purge `.artifacts`), jamais de suppression de contenu.
- **Portes** : `npm run gc` tourne en < 60 s, rapport lisible, 0 faux positif sur l'audio (vérifier 10 fichiers à la main).

---

## Vague 6 — R99 (orchestrateur)

1. `pip install git-filter-repo` (wheel 2.47.0 disponible). Sauvegarde : `git bundle create MaxPlay-vault/pre-filter-2026-09.bundle --all`.
2. `git filter-repo --invert-paths --path studio/dino/content/inbox --path studio/lunii/assets/audio/histoires-dodo --path studio/lunii/assets/audio/pierre-loup --path _archive --path-glob 'studio/dino/content/sources/megafaune/*' --path-glob '*.pdf'` puis `--strip-blobs-bigger-than 20M` sur ce qui reste hors `site/`. Vérifier avec `git count-objects -vH` (cible < 1,2 Go).
3. `git remote add origin …` (filter-repo retire le remote), `git push --force origin master`, vérifier que le workflow Pages repasse vert.
4. Le bot Telegram tourne sur ce working tree : le prévenir n'est pas nécessaire, il n'a pas de clone séparé. Vérifier `infra/bot/bot.run.log` après.
5. `memory/CHANGELOG.md` : vider les lanes livrées en capacités visibles ; `memory/MEMORY.md` : état ; `memory/audits/2026-09-XX-cloture-refonte-ged.md` : avant/après chiffré (poids, fichiers, tokens contexte, jeux visibles, tables) ; supprimer les deux crons.

---

## Journal de campagne

- 2026-09-12 — Plan écrit, décisions gravées (D-007 à D-011), crons de relance posés. En attente de `/compact` puis lancement vague 0.
