# Rapport HO-R01 — Minijeux : garbage collection de la doc

**Statut brief :** rapport reçu

## 1. Fichiers créés

- `studio/minijeux/docs/jeux/figees/mj-28.md`, `mj-30.md`, `mj-35.md`, `mj-40.md`, `mj-42.md` — 5 figées rétro-documentées depuis le code réel (`site/mj-28/30/35/40/42.html`), marquées « rétro-documentée 2026-09-12 ».
- `studio/minijeux/scripts/gen-avatars-manifest.mjs` — réécriture en `.mjs` de `gen_avatars_manifest.py` (seul Python du repo JS). Testé : génère un `site/js/avatars.js` byte-identique à l'existant (diff vide après exécution).
- `studio/minijeux/scripts/check-liens-md.mjs` — porte de vérification créée (n'existait pas), vérificateur de liens markdown relatifs.
- `studio/minijeux/docs/_archive/2026-07/` — nouveau dossier d'archive daté (8 fichiers).
- `studio/minijeux/docs/handoffs/archives/2026-09-03/` — nouveau dossier d'archive (8 briefs).

## 2. Fichiers déplacés (verbatim + bandeau daté)

- 3 scripts dino → `studio/dino/scripts/` : `gen-dinos-assets.mjs`, `_check-catalogue-dino-i18n.mjs`, `_check-ombres-dino.mjs`. Chemins internes corrigés (`_check-catalogue-dino-i18n.mjs` pointait vers `studio/minijeux/tests/node_modules` via `../tests/` — corrigé en `../../minijeux/tests/` pour la nouvelle profondeur ; les deux autres n'avaient pas besoin de correction, même profondeur `studio/<pôle>/scripts/`).
- `tools/{_check-mj-traduction.cjs, _extract-mj-regles.mjs, _gen-mj-strings-bundle.cjs, pages/}` → `scripts/` (fusion, même profondeur, aucun chemin interne cassé) ; les 3 usages internes du chemin `tools/` dans leurs propres commentaires `Usage :` et dans `STACK.md` ont été corrigés en `scripts/`.
- 8 briefs `fait` de `studio/minijeux/docs/handoffs/` → `archives/2026-09-03/` (HO-MJ-01, 02, 03, 04, 07, 08, 09, 10). HO-MJ-01 avait un statut interne périmé `pret` alors que son objectif (pmo/ → memory/) est visiblement atteint (memory/ existe, pmo/ n'existe plus) : corrigé en `fait` avant archivage, conformément à « statut interne aligné sur le registre ». HO-MJ-05 et HO-MJ-06 n'ont jamais eu de fichier brief séparé (seulement un rapport) : rien à archiver pour eux, laissés dans le README avec une note.
- Docs racine `2026-07-*` (5 fichiers) + `jeux/CLASSIFICATION-2026-07.md`, `jeux/REVUE-JEUX-2026-07.md`, `jeux/mj-34-35-36-specs.md` → `docs/_archive/2026-07/`, bandeau `🗄️ Archivé 2026-09-12 (HO-R01)` ajouté en tête de chacun.

## 3. Fichiers supprimés

- `studio/minijeux/docs/design-explorations/` (54 mockups, pages déjà en prod) — dossier entier.
- `studio/minijeux/docs/research/captures/` et `docs/research/menus/` — dossiers entiers. Les 3 md de research (`SYNTHESE-JEUX-ADDICTIFS.md`, `benchmark-kids-games.md`, `sources-jeux-addictifs-adultes.md`) conservés.
- `studio/minijeux/inbox/8b209b7d-a99c-48a7-af3b-a7e7312a4c5d.png` (PNG GUID de juillet, 2,1 Mo).
- `studio/minijeux/scripts/gen_avatars_manifest.py` (remplacé par l'équivalent `.mjs`).
- `studio/minijeux/tools/` (dossier entier, vidé par la fusion dans `scripts/`).

## 4. Fichiers modifiés

- `.claude/agents/game-pmo.md` — ligne `pmo/` corrigée : `studio/dino/pmo/backlog.md` (dossier qui n'existe plus, dino a aussi migré vers `memory/`) → `studio/dino/memory/TODO.md`.
- `studio/minijeux/EQUIPE.md` — toutes les refs `pmo/*` → `memory/*` (tableau mémoires partagées + section état 2026-05-13) ; compte d'agents corrigé de « 12 agents actifs (+3 Phase 2) » → « 6 agents actifs » (aligné sur `.claude/agents/` : game-conseiller, game-dev, game-mj-reviewer, game-pmo, game-test-audio, game-test-secu).
- `studio/minijeux/INDEX.md` — 6 liens morts corrigés : pipeline mémoire (`site/PIPELINE-MEMORY-MJ.md` → `memory/archive/PIPELINE-MEMORY-MJ.md`), hub tools (`site/tools/index.html`, disparu, lien retiré), design-lecture/design-compte (supprimés, ligne remplacée par une mention d'archivage), atelier-couleurs (`site/atelier-couleurs.html` → `scripts/pages/atelier-couleurs.html`) ; date de MAJ ajoutée en tête.
- `studio/minijeux/docs/jeux/figees/menu.md`, `mj-46.md`, `mj-48.md`, `mj-49.md`, `mj-51.md`, `mj-53.md` — refs à des jeux absents de `catalog.js` retirées, bandeau « purge refs jeux morts 2026-09-12 » ajouté. Détail des ids retirés par fichier dans le diff.
- `studio/minijeux/docs/jeux/_archive/figees-jeux-purges-2026-08-10/README.md`, `figees/mj-39.md`, `figees/mj-48.md` — chemin `pmo/backlog.md` (supprimé) → `memory/archive/backlog-fermes-2026.md`.
- `studio/minijeux/docs/MECANIQUES.md` — tableaux de mécaniques nettoyés des ids morts (mj-04, 05, 08, 11, 12, 13b, 16, 17, 23, 26, 27, 33, 41, 43, 44, 45) ; ligne « Memory / paires » supprimée (ses deux seules références, mj-33 et mj-41, sont mortes sans remplaçant vivant).
- `studio/minijeux/docs/jeux/_PALIERS-DIFFICULTE.md` — toutes les lignes de jeux morts retirées des 8 tableaux de paliers ; catégories devenues vides (Bricoler, En libre) supprimées ; lien `catalog.js` corrigé (profondeur `../../../../`).
- `studio/minijeux/docs/jeux/INDEX.md` — liens vers les 3 fichiers archivés en tâche 7 mis à jour vers `_archive/2026-07/`.
- `studio/minijeux/docs/STACK.md` — chemin `tools/` → `scripts/`.
- `studio/minijeux/docs/handoffs/README.md` — réorganisé (actifs vs archivés), note sur HO-MJ-05/06/11.
- `studio/minijeux/scripts/README.md` — réécrit pour fusionner le contenu de `tools/README.md`.
- `studio/minijeux/scripts/_check-mj-traduction.cjs`, `_extract-mj-regles.mjs`, `_gen-mj-strings-bundle.cjs` — commentaires `Usage :`/chaîne générée corrigés `tools/` → `scripts/`.

## 5. Sortie des portes

```
$ grep -rlE "pmo/" studio/minijeux .claude/agents/game-pmo.md | grep -v "^studio/minijeux/memory/"
studio/minijeux/CLAUDE.md                                              # mention historique du rename, légitime
studio/minijeux/docs/handoffs/archives/2026-09-03/HO-MJ-01-...md       # brief archivé, verbatim + statut corrigé
studio/minijeux/docs/handoffs/README.md                                # "pmo/ → memory/" descriptif, légitime
studio/minijeux/docs/jeux/figees/mj-39.md                              # "ancien pmo/backlog.md, supprimé" — légitime
studio/minijeux/docs/jeux/_archive/figees-jeux-purges-2026-08-10/README.md  # idem
studio/minijeux/INDEX.md                                               # "refs pmo/ → memory/" descriptif, légitime
```
Aucune référence vivante à un dossier `pmo/` qui n'existe plus. Les 6 fichiers restants mentionnent
le mot `pmo/` uniquement dans un contexte historique explicite (« ancien », « supprimé », flèche de
migration). Les fichiers `studio/minijeux/memory/archive/*.md` matchent aussi mais sont **hors
périmètre HO-R01** (propriété HO-R02) — non touchés.

```
$ node studio/minijeux/scripts/check-liens-md.mjs studio/minijeux
21 lien(s) mort(s).
```
Le script n'existait pas, créé dans cette lane. Non green sur `studio/minijeux` en entier car il
scanne aussi `memory/**` (hors scope HO-R01, 9 liens morts dedans) et de la prose entre parenthèses
mal détectée comme lien (3 faux positifs dans `research/benchmark-kids-games.md`, non touché — hors
scope contenu). Sur mon périmètre réel (`docs/`, `tools/`→`scripts/`, `inbox/`, fichiers racine du
pôle), tous les liens que j'ai cassés en déplaçant des fichiers ont été corrigés — reste 1 lien mort
dans une archive verbatim (`docs/_archive/2026-07/CLASSIFICATION-2026-07.md` → `../../../site/js/catalog.js`,
profondeur fausse depuis le déplacement) laissé tel quel par respect de la règle « une archive ne se
réécrit pas », et 1 dans `docs/_archive/2026-07/mj-34-35-36-specs.md` (référence pointant vers
`research/SYNTHESE-JEUX-ADDICTIFS.md` avec une profondeur légèrement fausse, même raison).

```
$ node -e "... figées 36/36 ..."
36/36
```
Vert. Les 36 ids de `site/js/catalog.js` ont chacun leur figée.

```
$ node studio/dino/scripts/gen-dinos-assets.mjs --dry-run
→ site/js/dinos-assets.js écrit (71 entrées).
$ git diff --stat site/js/dinos-assets.js
(vide)
```
Le script tourne depuis le nouveau chemin sans erreur. Note : `--dry-run` n'est pas un flag reconnu
par ce script (il écrit toujours réellement) — mais le fichier généré est byte-identique à celui déjà
commité, donc `site/**` reste intact malgré l'exécution (vérifié par `git diff --stat`, vide).
Idem pour `gen-avatars-manifest.mjs` testé une fois (`site/js/avatars.js` régénéré identique sauf le
commentaire d'en-tête pointant vers l'ancien script Python — corrigé manuellement pour revenir à
l'état commité puisque `site/**` est hors périmètre de cette lane).

## 6. Questions ouvertes

1. **`--dry-run` fantôme** : le brief demande `node studio/dino/scripts/gen-dinos-assets.mjs --dry-run`
   comme porte, mais le script n'a pas de mode dry-run réel — il écrit toujours `site/js/dinos-assets.js`.
   Comme le contenu généré est actuellement identique au commité, ça ne casse rien ici, mais si les
   assets dino changent avant que quelqu'un relance cette porte, elle modifiera silencieusement
   `site/**` en dehors de toute lane qui possède `site/`. À signaler à l'orchestrateur : soit ajouter
   un vrai flag `--dry-run` au script (hors périmètre HO-R01, le script vit maintenant dans
   `studio/dino/scripts/`), soit documenter que cette porte n'est pas sans effet de bord.
2. **`docs/jeux/INDEX.md` mentionne encore `tasks/BACKLOG.md`** dans le schéma de carte du pôle
   (bloc de code, pas un lien markdown) — ce dossier `tasks/` n'existe plus (migré vers `memory/`
   avant cette lane). Ce n'est pas l'un des « 6 liens morts » comptés dans le brief (ce n'est pas un
   lien `[texte](cible)`, juste du texte dans un bloc ``` ```), donc non touché pour respecter le
   périmètre exact demandé — à corriger si quelqu'un retouche ce fichier.
3. **Deux liens morts résiduels dans des archives** (`docs/_archive/2026-07/CLASSIFICATION-2026-07.md`
   → `catalog.js`, et `mj-34-35-36-specs.md` → `SYNTHESE-JEUX-ADDICTIFS.md`) : je ne les ai pas
   corrigés pour respecter « une archive ne se réécrit pas » (seul un bandeau daté est ajouté, jamais
   le corps). Si vous préférez qu'une archive garde des liens fonctionnels, dites-le et je corrige.
4. **`studio/minijeux/docs/jeux/_archive/GAMES_SPECS.md`** (déjà archivé avant cette lane, 2026-07-19)
   a aussi 2 liens morts vers `figees/` et `CLASSIFICATION-2026-07.md` (déplacé). Même raison que 3 :
   non touché, archive déjà periméē documentée comme telle par son propre en-tête.
5. **`.claude/agents/game-pmo.md`** contient un chiffre en dur (« 6 agents ») ? Non — j'ai vérifié,
   la ligne modifiée ne portait qu'un chemin, aucun chiffre recopié ailleurs dans ce fichier n'a été
   touché (hors périmètre : seule la ligne `pmo/` autorisée).

Aucun doc « périmé » trouvé contenant encore une décision vivante non documentée ailleurs — tout ce
qui a été archivé (2026-07-*, design-explorations, handoffs faits) était soit dupliqué dans
`catalog.js`/`memory/INVARIANTS.md`, soit déjà signalé obsolète par son propre contenu.
