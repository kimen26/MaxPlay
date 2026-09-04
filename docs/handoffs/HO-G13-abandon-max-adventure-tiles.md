# HO-G13 — Abandon Max Adventure + tiles LimeZu + WexWorld côté JEU : références

**Statut :** pret
**Depend de :** déplacements déjà faits par l'orchestrateur (git mv) — voir `_archive/INDEX.md` § `2026-09-05-max-adventure-tiles/`.

## Objectif
Plus aucun document vivant, hook, agent, workflow ou page ne cite Max Adventure, le pipeline tiles LimeZu, `mj-pose-tiles` ou « WexWorld » au sens JEU (Phaser Phase 2). WexWorld garde UN sens : le monde des Histoires (`memory/GLOSSAIRE.md`). Les traces historiques datées ne sont pas réécrites.

## Contexte a lire d'abord
- `memory/GLOSSAIRE.md` (vocabulaire à employer, § Abandonné)
- `_archive/INDEX.md` § `2026-09-05-max-adventure-tiles/` (ce qui est parti, où)
- `docs/handoffs/README.md` (règles : zéro commande git, ownership)

## Fichiers autorises (tout ce qui est listé ci-dessous, rien d'autre)

### Site déployé
- `site/js/catalog.js` : retirer les entrées `max-adventure` (L113) et `mj-pose-tiles` (L114) + le commentaire L22.
- `site/compte.html` L122-123 : retirer les 2 liens.
- `site/js/tracker.js` L93 : retirer le cas `max-adventure`.
- `site/js/unlock.js` L10 : commentaire.
- `site/js/cloud.js` L38 et L321 : retirer la clé de sync `mj-pose-tiles` (les données enfant déjà en base restent, inoffensives) — vérifier qu'aucune lecture ne casse (grep `mj-pose-tiles` dans `site/js/`).
- Le fichier du catalogue référentiel qui porte `regle-mj-pose-tiles` (probablement `studio/referentiel/catalogue/fr/regles.mjs`) : retirer l'entrée, puis régénérer dans l'ordre : `node studio/referentiel/generer/_gen-textes-site.mjs`, `node studio/referentiel/plan-generation.mjs`, `node studio/referentiel/build.mjs`. Supprimer le MP3 `site/sounds/voix/phrases/regle-mj-pose-tiles.mp3` et retirer sa mention de `site/sounds/_BANQUE-SONS.md`.
- `studio/minijeux/tests/audit-gabarit.mjs` L88-95 : retirer `mj-pose-tiles` de la liste d'exceptions + le commentaire « 2 jeux parentaux ».

### CI / config
- `.github/workflows/deploy.yml` : retirer les étapes max-adventure (`cache-dependency-path` L30, `npm ci` / `npm run build` L39-45, `mkdir _site/max-adventure` L49, `cp dist` L51, `version.txt` L52). Retirer aussi `cache: 'npm'` de setup-node (plus de lockfile). Garder setup-node : `audit-gabarit.mjs` (L35-37) a besoin de Node.
- `.claude/settings.json` : retirer le hook PostToolUse `tsc` sur `max-adventure` (vers L136) — JSON valide après.
- `.claude/settings.local.json` : retirer les entrées `permissions.allow` citant `tile-tools`, `tile-library`, `game-tile-*`, `game/phaser`, `studio/max-adventure` (≈16 lignes) — JSON valide après.
- `.claude/hooks/signal-detector.ps1` L26 et `.kimi-code/hooks/signal-detector.kimi.ps1` L31 : retirer de `$gameKeywords` les mots `tile`, `recipe`, `limezu`, `cartography`, `patterns.js`, `phaser`, `max-adventure`, `asphalt`, `sidewalk`, `mj-pose`, `vocab.py`, `tile-tools`, `tile-picker` (garder le reste, identique dans les 2 fichiers).
- `.kimi-code/hooks/pmo-check.kimi.ps1` L65 : retirer `site[\\/]tile-tools[\\/]`.
- `.kimi-code/hooks/figees-injector.kimi.ps1` L34 : commentaire.
- `.claude/skills/env-compat-check/SKILL.md` L20 : retirer la ligne « PostToolUse tsc (max-adventure) ».

### Gouvernance
- `CLAUDE.md` racine L9 (retirer `Phaser · tile · LimeZu` de la ligne JEU), L18 (retirer « tile/Max Adventure (futur) »), L33, L40. `AGENTS.md` est régénéré par le hook `sync-agents-md.py` après édition de CLAUDE.md : vérifier.
- `README.md` L28, L34, L50-51.
- `studio/minijeux/CLAUDE.md` L21, L25, L45, L51, L70 ; `studio/minijeux/INDEX.md` L4, L35, L78, L127, L151 ; `studio/minijeux/EQUIPE.md` (retirer le sous-domaine TILE, `game-tile`, les placeholders `game-wexworld-*`, les chemins `site/tile-tools/`) ; `studio/minijeux/tools/README.md` (ne décrit plus que `pages/`) ; `studio/minijeux/docs/STACK.md` (L10, 20, 21, 25, 28, 174) ; `studio/minijeux/docs/jeux/INDEX.md` L65 ; `studio/minijeux/docs/jeux/_PALIERS-DIFFICULTE.md` L27, L85 ; `studio/minijeux/docs/jeux/figees/menu.md` L70 (⚠️ figée : ne retirer QUE la mention des 2 jeux, rien d'autre, et le noter dans le rapport).
- `studio/minijeux/memory/MEMORY.md` L22, L26, L35 ; `studio/minijeux/memory/INVARIANTS.md` L65 (« 36 jeux + 2 bacs à sable » → sans les bacs à sable ; ne pas recopier de compte, pointer `catalog.js`), L110 ; `studio/minijeux/memory/TODO.md` L8 : passer le ticket ABANDON en `[x]` avec la date.
- `memory/MEMORY.md` L16-17 ; `memory/TODO.md` L28 (caduc → retirer) et L40 (INDEX minijeux : fait par ce brief → retirer).
- `.claude/agents/game-conseiller.md` (L3, 10, 21, 39, 40, 89, 107, 154-157 : plus qu'un seul domaine, les mini-jeux HTML), `.claude/agents/game-pmo.md` (L8, bloc « Tile (LimeZu) » L56-64, L93), `.claude/agents/game-mj-reviewer.md` L109, puis régénérer `.claude/agents/README.md` : `node scripts/gen-agents-readme.mjs` (corriger d'abord la ligne 158 du script si elle cite la fusion tile).
- `infra/bot/index.ts` L410, 436, 447, 460, 469, 546 : retirer l'agent `max-adventure` du routage ; `infra/bot/CLAUDE.md` L9. Vérifier avec `npx tsc --noEmit` dans `infra/bot` si un tsconfig existe.
- `infra/supabase/README.md` L22 : retirer « pose-tiles » ; L23 : annoter la table `tile_refs` « orpheline depuis 2026-09-05 (pipeline tiles archivé), à supprimer par migration dédiée ». Ne PAS toucher au projet Supabase ni au nom « WexWorld » L3.

## Hors perimetre
- `_archive/**`, `docs/handoffs/**` (sauf ce fichier et ton rapport), `memory/audits/**`, `studio/minijeux/memory/archive/**`, `studio/minijeux/memory/audits/**`, `studio/minijeux/docs/jeux/{CLASSIFICATION-2026-07,REVUE-JEUX-2026-07}.md`, `studio/minijeux/docs/specs/**` : traces datées, on ne réécrit pas.
- Aucune commande git. Aucun appel API. Aucune suppression hors le MP3 nommé.
- Auto-memory `~/.claude/projects/...` : fait par l'orchestrateur.

## Portes de verification
```bash
grep -rniE "max-adventure|max adventure|limezu|tile-tools|mj-pose|maxplay-tiles|phaser-tech|game-tile|VISION-LONG-TERME" --include=*.md --include=*.js --include=*.mjs --include=*.ts --include=*.html --include=*.json --include=*.ps1 --include=*.py --include=*.yml . 2>/dev/null | grep -vE "^\./(_archive|docs/handoffs|memory/audits|studio/minijeux/memory/(archive|audits)|studio/minijeux/docs/(specs|jeux/(CLASSIFICATION|REVUE)))" | grep -v node_modules   # vide
grep -rn "WexWorld" --include=*.md .claude studio/minijeux CLAUDE.md README.md | grep -v archive   # vide (WexWorld JEU) — les occurrences narration restent
python3 -c "import json;[json.load(open(f)) for f in ['.claude/settings.json','.claude/settings.local.json']];print('json ok')"
node --check site/js/catalog.js && node --check site/js/cloud.js && node --check site/js/tracker.js && node --check site/js/textes-jeux.js
cd studio/minijeux/tests && node audit-gabarit.mjs && npm run mj:test -- mj-50 2>&1 | tail -3 ; cd ../../..
node studio/referentiel/build.mjs > /dev/null && echo "referentiel ok"
node scripts/gen-agents-readme.mjs && echo "agents README regen"
wc -l CLAUDE.md   # <= 100
```

## Rapport attendu
`docs/handoffs/rapports/HO-G13-abandon.md` : liste fichier:ligne modifiés, sortie brute de chaque porte, ce qui n'a pas pu être fait et pourquoi, questions ouvertes. Jamais « devrait passer ».
