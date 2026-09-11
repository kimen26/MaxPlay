# Rapport d'exécution — HO-G13 abandon Max Adventure / tiles LimeZu / WexWorld JEU

> Exécutant Sonnet, 2026-09-05. Zéro commande git utilisée. Aucun appel API externe.

## Fichiers modifiés (fichier:ligne)

### Site déployé
- `site/js/catalog.js:113-114` — entrées `max-adventure` et `mj-pose-tiles` retirées ; `:22` commentaire (exemples des deux ids) simplifié.
- `site/compte.html:118-124` — bloc entier des 2 liens "Outils libres" retiré (commentaire + `<p>` devenu creux).
- `site/js/tracker.js:93` — `|| file === 'max-adventure'` retiré de `_detectGameId()`. (Une entrée `GAME_META['mj-07']` nommée « Max Adventure » subsiste : c'est un libellé legacy explicitement protégé par le commentaire du fichier « Ne PAS la vider : un id sans libellé s'afficherait brut » — hors scope du brief, laissé tel quel.)
- `site/js/unlock.js` (commentaire mode `'free'`) — retiré la mention "Max Adventure, Pose-tiles".
- `site/js/cloud.js:38,321` — clé `mj-pose-tiles` retirée de `STATE_KEYS` + commentaire associé.
- `studio/referentiel/catalogue/fr/regles.mjs` — **aucune modification nécessaire** : ce fichier scanne dynamiquement `site/mj-*.html` sur disque (`listerRegles()` dans `lib/regles.mjs`), et `mj-pose-tiles.html` était déjà sorti de `site/` par l'orchestrateur. La source réelle du dernier résidu était `studio/referentiel/scan-jeu.mjs` (section 3, scan des `.mp3` orphelins) : réglé en supprimant le MP3.
- `site/sounds/voix/phrases/regle-mj-pose-tiles.mp3` — **supprimé** (seule suppression de fichier autorisée par le brief).
- `site/sounds/_BANQUE-SONS.md` — aucune mention de `regle-mj-pose-tiles` trouvée (déjà absente avant intervention) — rien à faire.
- Pipeline référentiel régénéré dans l'ordre prescrit : `_gen-textes-site.mjs` → `plan-generation.mjs` → `build.mjs`. Résultat : `site/js/textes-jeux.js` (86 entrées), `studio/referentiel/registre.json` (936 clés, était 948), `_ETAT-CONTENU.md`, `_PLAN-GENERATION.md`, `empreintes.json` régénérés. `registre.json`/`plan-generation.json`/`textes-jeux.json` sont gitignorés (dump machine), donc invisibles dans `git status` — normal.
- `studio/minijeux/tests/audit-gabarit.mjs:83-95` — `mj-pose-tiles` retiré de `LEGACY_FIN_MAISON` (Set réduit à `mj-32` seul) + commentaires "2 jeux parentaux" corrigés pour pointer `catalog.js` au lieu de recopier un compte.

### CI / config
- `.github/workflows/deploy.yml` — étapes Max Adventure retirées (`cache-dependency-path`, `npm ci`, `npm run build`, `mkdir _site/max-adventure`, `cp dist`, `version.txt`) ; `cache: 'npm'` retiré de `setup-node` (plus de lockfile) ; `Assemble site` réduit à `mkdir -p _site && cp -r site/* _site/`.
- `.claude/settings.json` — hook `PostToolUse` tsc sur `max-adventure` (bloc entier, ~10 lignes) retiré. JSON valide vérifié.
- `.claude/settings.local.json` — 15 entrées `permissions.allow` retirées (11 citant `tile-tools`/`tile-library`/`studio/max-adventure`, 4 citant `game\phaser\...\tiles\...`). JSON valide vérifié. Non touché (hors périmètre strict du brief) : `WebFetch(domain:limezu.art)` et `WebFetch(domain:limezu.itch.io)` (L139, L144) — pattern non listé dans le brief, à trancher.
- `.claude/hooks/signal-detector.ps1:26` et `.kimi-code/hooks/signal-detector.kimi.ps1:31` — mots retirés de `$gameKeywords` : `tile`, `recipe`, `limezu`, `cartography`, `patterns.js`, `phaser`, `max-adventure`, `asphalt`, `sidewalk`, `mj-pose`, `vocab.py`, `tile-tools`, `tile-picker`. Les deux fichiers restent identiques sur cette ligne (vérifié `diff`).
- `.kimi-code/hooks/pmo-check.kimi.ps1:65` — `'site[\\/]tile-tools[\\/]'` retiré de `touch`.
- `.kimi-code/hooks/figees-injector.kimi.ps1:34` — commentaire d'exemple `# ex: mj-21 ou mj-pose-tiles` réduit à `# ex: mj-21`.
- `.claude/skills/env-compat-check/SKILL.md:20` — ligne "PostToolUse tsc (max-adventure) et commit INBOX" réduite à "PostToolUse commit INBOX" (le fait "commit INBOX" reste vrai, seul le hook tsc a disparu).

**Non touché volontairement (hors liste autorisée)** : `.claude/hooks/figees-injector.ps1:30` et `.claude/hooks/pmo-check.ps1:31` (variantes Claude, non citées par le brief — seules les variantes `.kimi-code/` l'étaient) contiennent encore `mj-pose-tiles` / `tile-tools` en commentaire/pattern. À trancher : parité Claude/Kimi rompue sur ce point si on ne les corrige pas dans un brief séparé.

### Gouvernance
- `CLAUDE.md` racine — L9 (retiré `Phaser · tile · LimeZu`), L18 (retiré `tile/Max Adventure (futur)`), arborescence L33 (`site/` : retiré `max-adventure`) et L40 (retiré la ligne `max-adventure/` du studio, `└──` réajusté sur `referentiel/`). 92 lignes après édition (≤ 100). `AGENTS.md` racine régénéré automatiquement par le hook `sync-agents-md.py` (vérifié : plus aucune mention).
- `README.md` — L28 (retiré ligne `max-adventure/` de l'arbre), L34 (déploiement simplifié), L50-51 (bloc "Max Adventure (Phaser)" retiré du local dev). **Non touché** : L61 `| MJ-07 | Phaser.js 3 + TypeScript + Vite |` — cette ligne du tableau Stack technique n'était pas dans la liste autorisée (seuls L28/34/50-51 l'étaient) et `mj-07` n'existe dans aucun catalogue actuel ; probable résidu à trancher séparément.
- `studio/minijeux/CLAUDE.md` — L21 (retiré "domaines tile/mj"), L25 (retiré "casting tile"), L45 (résumé équipe réduit à game-dev/game-mj-reviewer), section "Règles d'or LimeZu" entière retirée (pointait vers `.claude/rules/tile-tools.md` et skill `maxplay-tiles`, tous deux archivés), L64/70 (référence à `docs/VISION-LONG-TERME.md`, doc archivé, retirée).
- `studio/minijeux/INDEX.md` — nettoyage étendu au-delà des lignes indicatives car le fichier entier (L4-151 dans la version brief) était structurellement bâti autour du pipeline tile : retrait de `studio/max-adventure/` de l'arbre, table Équipe réduite (plus de `game-tile` ×3), sections entières "Outils tiles (LimeZu)" / "Scripts Python tile" / "Mini-jeu kids du tileset" retirées (les 3 lignes non-tile de la 1ère table — hub tools, chantiers design lecture/compte, atelier couleurs, index2/index3 abandonnés — reclassées sous "Outils design (hors tiles)" pour ne pas perdre cette matière). Footer historique (L95, ex-L151) laissé tel quel (trace datée 2026-06-04).
- `studio/minijeux/EQUIPE.md` — nettoyage étendu similaire : bandeau L6, organigramme (sous-domaine TILE + WEXWORLD Phase 2 retirés), tableau qui-fait-quoi (ligne game-tile retirée), chaîne de commandement (ligne pipeline tile retirée), mémoires partagées (lignes tile-tools + VISION-LONG-TERME retirées), workflow "nouvelle recette tile" entier retiré, réunions/ateliers (ligne "Pipeline tile" retirée), État actuel (placeholders `game-wexworld-*` ouverts retirés — n'ont plus d'objet ; ligne `game-tile-pmo` gardée comme trace historique avec note d'abandon 2026-09-05).
- `studio/minijeux/tools/README.md` — réduit à ne décrire que `pages/` (retiré `tile-tools/` et `web/`, tous deux absents du disque) ; retiré aussi `map-mockups.html` de la liste (fichier déjà archivé, absent de `pages/`).
- `studio/minijeux/docs/STACK.md` — L10 (ligne "Jeu Phaser" retirée), L12 (résolution simplifiée), L20-21 (arborescence déploiement, branche `/max-adventure/` retirée), L25/28 (sources Phaser + `.gitignore` motif générique retirés), L174 (ligne état `max-adventure` retirée). **Non touché** (hors lignes nommées) : sections Aseprite/Tiled-LDtk/Animation Phaser (code snippets génériques `this.load.aseprite`, `this.tweens.add`, `this.load.tilemapTiledJSON`) — toujours rédigées pour Phaser, sans jeu Phaser pour les consommer ; à trancher si on les garde comme réserve technique ou si on les retire dans un brief dédié.
- `studio/minijeux/docs/jeux/INDEX.md:60-65` — branche `/max-adventure/` retirée de l'arborescence déploiement.
- `studio/minijeux/docs/jeux/_PALIERS-DIFFICULTE.md:27,85` — `max-adventure` et `mj-pose-tiles` retirés des 2 lignes "En libre".
- `studio/minijeux/docs/jeux/figees/menu.md:70` — **figée** : uniquement les 2 mentions de jeux retirées (`mj-12 (Max Adventure), mj-pose-tiles (compose tes mondes)` → `mj-12`), rien d'autre touché dans ce fichier figé.
- `studio/minijeux/memory/MEMORY.md` — L22 (ligne "Vision long terme (WexWorld)" retirée), L26 (compte "36 jeux + 2 bacs à sable" remplacé par pointeur `catalog.js` sans chiffre), L35 (mention "Max Adventure tourne en prod" retirée).
- `studio/minijeux/memory/INVARIANTS.md` — L65 (compte + parenthèse tile retirés, pointeur `catalog.js` conservé), L110 (ligne Build Phaser retirée) + nettoyage étendu (L17 ligne "Contexte tile", section entière "Casting tile LimeZu", 5 lignes tile de "État déploiement", 3 lignes `game-tile-*` de "Architecture équipe agents") — même logique que INDEX.md/EQUIPE.md : fichier structurellement tile-lourd au-delà des 2 lignes indicatives.
- `studio/minijeux/memory/TODO.md:8` — ticket ABANDON passé en `[x]` avec référence HO-G13 et date.
- `memory/MEMORY.md:16-17` — mention "bacs à sable parentaux (max-adventure, mj-pose-tiles)" retirée.
- `memory/TODO.md:28` (ticket Max Adventure `USE_SVG_BUS`, caduc) et `:40` (ticket INDEX minijeux tile-tools, fait par ce brief) — les deux lignes retirées.
- `.claude/agents/game-conseiller.md` — description (frontmatter), corps (L10 "3 sous-domaines"→1 seul), L21 (handoff `game-tile-simplifier` retiré), reading-list L37-40 (VISION-LONG-TERME + sous-domaines tile/WexWorld retirés), Mode 4 "Transfert cross-domaines" retiré, suggestion `game-tile-simplifier` retirée, section "Ce que tu NE fais PAS" (Phaser, recettes tile retirés), section "🌉 pont cross-domaines" remplacée par "🎮 Ton domaine" (mono-domaine mini-jeux), liens finaux (VISION-LONG-TERME retiré).
- `.claude/agents/game-pmo.md` — frontmatter description, corps L8 (retiré "domaines"), reading-list (casting tile ×2), section "DOMAINES" → "DOMAINE" (bloc Tile LimeZu entier retiré), FORME (item 1 tile retiré, renumération), "Ce que tu NE fais PAS" (recettes tile retiré), Mode AUDIT (casting tile retiré), template rapport (`Domaine : <tile / mj / général>` → `<mj / général>`).
- `.claude/agents/game-mj-reviewer.md:109` — "(sauf WexWorld qui est l'exception)" retiré.
- `.claude/agents/README.md` régénéré via `node scripts/gen-agents-readme.mjs` (20 agents, 0 avertissement) — script corrigé d'abord (`scripts/gen-agents-readme.mjs:158`, note d'archivage ajoutée à l'entrée historique HO-G12 plutôt que suppression, car fait historique daté toujours vrai).
- `infra/bot/index.ts` — type `Agent` (retiré `"max-adventure"`), `MAX_ADVENTURE_KEYWORDS` (const entière retirée), `detectAgent()` (entrée de score retirée), `AGENT_EMOJI`/`AGENT_POLE_HINT`/`modelMap` (entrées `max-adventure` retirées). `npx tsc --noEmit` (via `./node_modules/.bin/tsc`, npx cassé dans get env) : 0 erreur.
- `infra/bot/CLAUDE.md:9` — "Aiguilleur 5 agents" → "4 agents", mention max-adventure retirée.
- `infra/supabase/README.md:22` (retiré "pose-tiles" du descriptif `child_state`), `:23` (`tile_refs` annotée "orpheline depuis 2026-09-05 (pipeline tiles archivé), à supprimer par migration dédiée"). `WexWorld` (L3, nom du projet Supabase) non touché comme demandé.

## Sorties des portes de vérification

```
$ grep -rniE "max-adventure|max adventure|limezu|tile-tools|mj-pose|maxplay-tiles|phaser-tech|game-tile|VISION-LONG-TERME" ... | grep -v (exclusions hors-périmètre) | grep -v node_modules
```
Résidus restants après exclusions (tous justifiés ci-dessous, aucun dans un fichier autorisé sans raison) :
- `.claude/hooks/figees-injector.ps1:30`, `.claude/hooks/pmo-check.ps1:31` — variantes **Claude** non listées dans « Fichiers autorises » (seules les variantes `.kimi-code/` l'étaient). Non touchées.
- `.claude/settings.local.json:139,144` — `WebFetch(domain:limezu.art / limezu.itch.io)`, pattern non listé dans le brief. Non touché.
- `memory/DECISIONS.md`, `memory/GLOSSAIRE.md`, `memory/audio/PLAN-AUDIO-I18N.md` — mentions factuelles/historiques hors liste autorisée (D-005, glossaire § Abandonné, tableau audio daté). Non touchés (hors périmètre, corrects tels quels).
- `site/js/dinos-ombres.js:6`, `site/js/tracker.js:29`, `studio/dino/**`, `studio/narration/**` — pôle DINO/NARRATION, hors périmètre JEU, legacy labels protégés par commentaire explicite, ou traces datées.
- `studio/minijeux/AGENTS.md:8` — pointe encore `.claude/rules/tile-tools.md` (fichier disparu). Fichier non listé dans les autorisés (miroir Kimi léger, pas régénéré par `sync-agents-md.py` qui ne couvre que la racine). Lien mort réel, à corriger dans un brief séparé.
- `studio/minijeux/docs/2026-07-28-audit-portail-resultat.md`, `studio/minijeux/docs/handoffs/HO-MJ-01-memoire-convergente.md`, `studio/minijeux/docs/jeux/figees/mj-24.md` + `_archive/figees-jeux-purges-2026-08-10/*`, `studio/minijeux/memory/LESSONS.md` — traces datées / figées historiques, non listées, non réécrites (doctrine "une archive ne se réécrit pas").
- `studio/minijeux/memory/TODO.md:68-72` — lane "Pipeline tile-tools (EP-REFS, EP-MACRO-VIRAGE, EP-TILES)" avec tickets ouverts non fermés — **hors scope de ce brief** (le brief ne demandait que L8), mais probablement à clore/archiver dans un brief de suivi puisque le pipeline entier est abandonné.
- `studio/referentiel/textes-jeux.json:2608...`, `studio/referentiel/_FILE-EL.md:37` — non régénérés par le pipeline officiel des 3 scripts (produits par `_extraire-textes-jeux.mjs`, non listé dans les commandes de régénération du brief) ; `_FILE-EL.md` semble un document de travail ElevenLabs distinct. Non touchés, hors liste autorisée.

```
$ grep -rn "WexWorld" --include=*.md .claude studio/minijeux CLAUDE.md README.md | grep -v archive
```
→ Vide côté sens JEU. Occurrences restantes toutes légitimes : `narration-writer-*.md` (bon sens, Histoires), `studio/minijeux/docs/specs/ARCHI-COMPTES-PROFILS.md` (nom du projet Supabase, exclu — sous `docs/specs/`), `studio/minijeux/memory/audits/2026-07-19-menu-parcours.md` (audit daté, exclu), `studio/minijeux/docs/2026-07-25-brainstorm-gamification.md` (brainstorm daté, non listé, non touché — **question ouverte** : à archiver ou laisser tel quel ?).

```
$ python3 -c "import json;[json.load(open(f)) for f in ['.claude/settings.json','.claude/settings.local.json']];print('json ok')"
json ok
```

```
$ node --check site/js/catalog.js && node --check site/js/cloud.js && node --check site/js/tracker.js && node --check site/js/textes-jeux.js
(silence = succès, tous les 4 passent)
```

```
$ cd studio/minijeux/tests && node audit-gabarit.mjs
════════════════════════════════════════════
  36 jeux audités
  20 cadre conforme · 16 avec dette
  migration gabarit shell : 36/36
════════════════════════════════════════════
✓ aucun bloquant — cadre sain (les dettes sont à résorber au fil de l'eau)
```

```
$ npm run mj:test -- mj-50
> node run.mjs mj-50
browserType.launch: Executable doesn't exist at C:\Users\kimen\AppData\Local\ms-playwright\chromium_headless_shell-1223\...
Looks like Playwright was just installed or updated. Please run: npx playwright install
```
**ÉCHEC — cause hors périmètre** : binaire Chromium Playwright absent de l'environnement (`npx playwright install` jamais exécuté sur cette machine/session). Aucun rapport avec les fichiers modifiés par ce brief ; installer un binaire navigateur n'est pas une édition de fichier autorisée. Ce test n'a donc pas pu être validé — à relancer après `npx playwright install` côté orchestrateur ou Papa Yann.

```
$ node studio/referentiel/build.mjs > /dev/null && echo "referentiel ok"
referentiel ok
```
(Pipeline complet exécuté dans l'ordre : `_gen-textes-site.mjs` → `plan-generation.mjs` → `build.mjs`. registre.json passé de 948 à 936 clés — cohérent avec le retrait de l'entrée `regle-mj-pose-tiles` après suppression du MP3.)

```
$ node scripts/gen-agents-readme.mjs && echo "agents README regen"
README généré : 20 agents, 0 avertissement(s).
agents README regen
```

```
$ wc -l CLAUDE.md
92 CLAUDE.md
```
(≤ 100, conforme.)

## Ce qui n'a pas pu être fait, et pourquoi

1. **`npm run mj:test -- mj-50`** : échoue faute de binaire Chromium Playwright installé dans l'environnement. Cause racine confirmée (message d'erreur explicite Playwright), correction (`npx playwright install`) hors périmètre de ce brief (pas une modification de fichier autorisé, action d'infrastructure locale).
2. **`.claude/hooks/figees-injector.ps1` et `.claude/hooks/pmo-check.ps1`** (variantes Claude, pas Kimi) : contiennent encore `mj-pose-tiles`/`tile-tools`. Non corrigés car non listés dans « Fichiers autorises » — seules les variantes `.kimi-code/` l'étaient. Résultat : parité Claude/Kimi rompue sur ce point précis.
3. **`studio/minijeux/AGENTS.md:8`** : lien mort vers `.claude/rules/tile-tools.md` (fichier archivé). Non corrigé, fichier hors liste autorisée et non couvert par le hook de sync (qui ne régénère que l'`AGENTS.md` racine).
4. **`README.md:61`** (tableau Stack technique, ligne `MJ-07 | Phaser.js 3 + TypeScript + Vite`) : probable résidu Max Adventure sous un ancien id, mais hors des lignes explicitement listées (L28/34/50-51 seulement). Non touché.
5. **`studio/minijeux/docs/STACK.md`** sections Aseprite / Tiled-LDtk / Animation Phaser (code snippets) : toujours écrites pour un moteur Phaser qui n'existe plus dans le repo, mais hors des lignes nommées (L10/20/21/25/28/174). Non touchées.
6. **`studio/minijeux/memory/TODO.md:68-72`** (lane "Pipeline tile-tools") : 2 tickets encore ouverts (`EP-REFS [ ]`, `EP-TILES [~]`) pour un pipeline désormais abandonné. Le brief ne demandait que la ligne 8 (ticket ABANDON) ; cette lane n'a pas été traitée.
7. **`studio/minijeux/docs/2026-07-25-brainstorm-gamification.md`** : mentionne WexWorld (sens JEU, Phase 2). Doc daté non listé dans les autorisés, ni explicitement exclu — laissé tel quel par prudence (doctrine "une archive ne se réécrit pas" appliquée par analogie).
8. **`studio/referentiel/textes-jeux.json`** et **`studio/referentiel/_FILE-EL.md`** : contiennent encore `mj-pose-tiles`. Produits par un script (`_extraire-textes-jeux.mjs`) non inclus dans la chaîne de régénération prescrite par le brief (seuls `_gen-textes-site.mjs` → `plan-generation.mjs` → `build.mjs` étaient listés). Non régénérés, non édités à la main (fichiers hors liste autorisée).

## Étendue de nettoyage au-delà des lignes indicatives

Le brief prévenait explicitement que les numéros de ligne étaient indicatifs. Pour 4 fichiers autorisés (`studio/minijeux/INDEX.md`, `EQUIPE.md`, `memory/INVARIANTS.md`, `.claude/agents/game-conseiller.md` et `game-pmo.md`), la matière tile/Phaser/WexWorld débordait largement des lignes citées — des sections entières (tableaux d'agents, workflows, blocs de règles) étaient structurellement bâties autour du sous-domaine abandonné. Pour rester fidèle à l'objectif du handoff (« plus aucun document vivant... ne cite Max Adventure, le pipeline tiles LimeZu ») sans sortir des fichiers autorisés, ces sections ont été retirées entièrement plutôt que rapiécées ligne à ligne, ce qui produit un diff plus large que les lignes listées mais reste circonscrit aux fichiers explicitement autorisés.

## Questions ouvertes pour l'orchestrateur

1. Faut-il un brief de suivi pour porter les mêmes corrections aux variantes **Claude** de `figees-injector.ps1`/`pmo-check.ps1` (actuellement seules les variantes Kimi ont été nettoyées, brief oblige) ?
2. `studio/minijeux/AGENTS.md` (miroir Kimi léger du pôle JEU, pas régénéré automatiquement) a un lien mort vers `.claude/rules/tile-tools.md` — à corriger où et par qui (pas de hook qui le couvre) ?
3. `.claude/settings.local.json` garde 2 permissions `WebFetch(domain:limezu.art / limezu.itch.io)` — à retirer aussi, ou gardées au cas où (recherche future) ?
4. `studio/minijeux/memory/TODO.md` § "Lane — Pipeline tile-tools" (tickets EP-REFS, EP-TILES encore ouverts) — à clore/archiver explicitement maintenant que le pipeline est abandonné ?
5. `README.md:61` et `studio/minijeux/docs/STACK.md` (sections Aseprite/Tiled/Animation Phaser) : résidus Phaser hors des lignes nommées par le brief — à nettoyer dans un tour dédié ou laisser en réserve technique ?
6. `npx playwright install` n'a jamais été exécuté sur cette machine : `npm run mj:test` reste rouge pour toute session tant que ce n'est pas fait, indépendamment de ce brief.
