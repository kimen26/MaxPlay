# Process militaire JEU + DINO — les recommandations détaillées

> Annexe de [`2026-09-26-archi-process-militaire.md`](2026-09-26-archi-process-militaire.md). R01 à R19 viennent de la synthèse du workflow d'audit du 2026-09-26 (texte d'origine conservé) ; R20 à R23 viennent des sondes réelles. La ligne **Vérification** est celle du main agent : la réfutation automatique n'a pas tourné (plafond de dépense), chaque fait porteur a donc été contrôlé sur le disque le 2026-09-27, ou est marqué « à revérifier en DoR ».
> Les commandes citées qui n'existent pas encore (`check-dino-coherence`, `dino:new`, `mj:new`, `npm run gate`, `dev-dinos.spec`) sont créées par la vague indiquée.

## Sommaire

| Id | Vague | Coût | Titre | Vérification |
|---|---|---|---|---|
| R01 | 1 | S | Brancher les portes qui existent déjà dans npm run check (0 nouveau script) | vérifié |
| R05 | 1 | S | audit-gabarit --strict par défaut + checks mobile-parents + « jamais Max » + __mjTest | vérifié, AMENDÉ |
| R08 | 1 | S | CI Playwright bloquant AVANT Pages + garde git push scopée sur site/** | vérifié, AMENDÉ |
| R10 | 1 | S | Hooks Stop et PreToolUse durcis : pmo-check v2 (porte rejouée), lessons-gate, AskUserQuestion exit 2, git rm glob | vérifié en partie |
| R11 | 1 | S | figees-injector ciblé + digest 🔒/❌ par tour + regex/bandeau corrigés ; signal-detector réduit à 1 ligne de routage | vérifié |
| R20 | 1 | S | Réparer l'extracteur FR des règles de jeu, aujourd'hui destructeur | vérifié (l.29, 76, 125) |
| R21 | 1 | S | Gabarit de jeu conforme à sa propre porte | vérifié (grep vide sur le gabarit, règle l.196-199 de l'audit) |
| R23 | 1 | S | `--preview` du batch d'images ne doit rien écrire | sonde Minmi, à revérifier en DoR |
| R02 | 2 | S | Porte étymologie EP-D23 + interdits de fond dans _verif-scripts-audio.cjs (ferme L-D-84) | vérifié |
| R07 | 2 | S | check-mj-coherence v2 — i18n alignée D-013, bundle à jour, MP3-ou-ticket en avertissement, 🔒 sourcées pour les jeux neufs | vérifié |
| R12 | 2 | M | check-refs-claude + check-figees — aucun chemin mort dans agents/skills/rules, aucun prompt qui contredit une figée | vérifié |
| R22 | 2 | S | Porte de provenance des faits de fiche (L-D-85) | vérifié (Minmi, 3 sources, corrigé le 2026-09-26) |
| R03 | 3 | M | gen-dinos-ui.cjs — les 3 maps de dev-dinos.html deviennent un fichier généré | vérifié ; symptôme corrigé à la main le 2026-09-27 |
| R04 | 3 | M | check-dino-coherence.cjs — la DoD dino mécanique par id, clone de check-mj-coherence | vérifié |
| R06 | 3 | M | run.mjs — 360 px par défaut, 320 en non-régression, tap 48 mesuré, fin de partie, une seule voix, 2 captures ; compat.mjs supprimé | vérifié |
| R09 | 3 | M | post-tool.ps1 — dispatcher de portes STATIQUES rejouées dans le tour, sortie en additionalContext | à revérifier en DoR (cartographie seule) |
| R13 | 3 | M | dev-dinos.spec.mjs (rendu par dino, captures 360/320) + verif-mp3.mjs branché dans _gen-audio-v3.sh | vérifié en partie |
| R14 | 4 | L | npm run dino:new -- <id> — orchestrateur exécutable SANS fichier d'état, arrêts humains nommés, range-serie à verdict | vérifié par la sonde Minmi |
| R15 | 4 | M | npm run mj:new + _template.spec.mjs + skills nouveau-jeu (nouvelle) et nouveau-dino v2 (réduite) | vérifié par la sonde mj-60 |
| R16 | 4 | S | Gabarit de handoff unique (DoR + DoD, exemples = chemin + porte) et handoff-check léger dans gc.mjs | à revérifier en DoR (cartographie seule) |
| R17 | 5 | M | Agents JEU et DINO réécrits sur le repo réel, préchargés en digest, reviewer = juge de figée + lecteur de captures | vérifié |
| R18 | 5 | M | Fusion rule ↔ CLAUDE.md par pôle, CLAUDE.md racine 92 → ~60 l., STANDARD-MJ seule source JEU, EQUIPE.md remplacé par le README généré | à revérifier en DoR (cartographie seule) |
| R19 | 5 | M | Mémoire rationalisée : INVARIANTS → valeurs arbitrées + généré, archives descendues, auto-memory purgée, 2 décisions orphelines gravées, 5 arbitrages tranchés | vérifié en partie |

## Vague 1

### R01 — Brancher les portes qui existent déjà dans npm run check (0 nouveau script)

- **Type, coût** : ci, S
- **Quoi** : package.json:8 : ajouter `node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr`, `_verif-recits.cjs`, `studio/minijeux/scripts/_check-mj-traduction.cjs`, `scripts/gc.mjs` (lecture seule) ; remplacer `(check-coherence-data-narre.cjs || true)` par un appel bloquant (le script sort toujours 0, l.31-34 et 199 → `process.exit(ecarts ? 1 : 0)`, 0 écart au 2026-09-25). package.json:7 : ajouter `_gen-mj-strings-bundle.cjs` et `_gen-chiffres-data-header.cjs` à `build`. Règle : une porte se branche VERTE (chaque script est lancé à la main avant d'être ajouté).
- **Fichiers** : `package.json`, `studio/dino/content/scripts/export/check-coherence-data-narre.cjs`
- **Ce que ça supprime** : Les 7 rappels prose du grep interdits (rules/dino.md:65, studio/dino/CLAUDE.md:60, dino-conseiller.md:31, dino-fiche-writer.md:40, nouveau-dino/SKILL.md:93, figees/encyclopedie.md:117, CONSIGNES.md:90) → 1 pointeur « porte : _verif-scripts-audio.cjs » ; la note « en avertissement, l'orchestrateur décide » de check-coherence-data-narre.cjs:27-31 ; le rappel « relancer le bundle i18n ».
- **Preuve (cartographie)** : package.json:8 lu ce jour : `check` = 9 commandes dont `check-coherence-data-narre.cjs || true`, et 0 des portes de contenu dino (`grep -rln _verif-scripts-audio package.json .claude/hooks .claude/settings.json` = vide, lecteur 3) ; `_gen-mj-strings-bundle` et `_check-mj-traduction` absents de build/check (`grep -c` = 0, lecteur 4) ; studio/dino/memory/DECISIONS.md:19 cite pourtant `_verif-scripts-audio` comme « porte ».
- **Vérification (main, 2026-09-27)** : vérifié. `check-coherence-data-narre.cjs` sort toujours 0 (l.197). Sonde portes du 2026-09-26 : `_verif-scripts-audio`, `_verif-recits`, `run-all` hors `check` et hors CI. Bundle i18n absent de `package.json` et de la CI.

### R05 — audit-gabarit --strict par défaut + checks mobile-parents + « jamais Max » + __mjTest

- **Type, coût** : porte-script, S
- **Quoi** : studio/minijeux/tests/audit-gabarit.mjs:76 : `C1 = 'block'` (36/36 passent déjà `--strict`, condition du plan de bascule l.24-41 remplie), `--legacy` temporaire. Nouveaux BLOQUANTS statiques : meta viewport sans `user-scalable=no` ni `maximum-scale=1` ; `\bMax\b` dans le texte visible de mj-*.html, catalog.js, strings.json ; `window.__mjTest` exposé (bloquant pour tout jeu créé après la bascule, set LEGACY nominatif pour les 14 existants). Même vague : corriger `site/_template/mj-template.html:5,16-18` (viewport zoomable, plus d'`overflow:hidden` sur du texte) et `sed` sur les 36 jeux, capture avant/après sur 2 jeux.
- **Fichiers** : `studio/minijeux/tests/audit-gabarit.mjs`, `site/_template/mj-template.html`, `site/mj-*.html`
- **Ce que ça supprime** : Les checks mécaniques des Sections 1 et 4 de game-mj-reviewer.md (busSVG, hex, fetch, « lien index.html », « OGG+MP3 ») ; INVARIANTS jeu:35-36 (« 1024×768 », « 80×80 ») ; les copies « zones tap 80 px » de rules/mini-jeux.md:26, STANDARD-MJ.md:92, studio/minijeux/CLAUDE.md:14 (après arbitrage PY 48 px, vague 0).
- **Preuve (cartographie)** : audit-gabarit.mjs:76 lu ce jour `const C1 = strict ? 'block' : 'warn'` ; exécution `--strict --json` : 0 échec sur 36 (lecteur 4) ; `grep -l user-scalable=no site/mj-*.html | wc -l` = 36 + template l.5 (lecteur 4) contre ~/.claude/rules/mobile-parents.md (« Zéro user-scalable=no ») ; L-004/L-109 « jamais Max » sans aucune porte côté JEU (audit-gabarit.mjs:43-50, check-mj-coherence.mjs:13-19 — lecteur 2).
- **Vérification (main, 2026-09-27)** : vérifié, AMENDÉ. `audit-gabarit.mjs:76` : `C1 = strict ? 'block' : 'warn'`. Zoom bloqué sur les 36 jeux, le gabarit, `dev-dinos`, `dev-armoire` et quatre pages lues par un parent (`compte`, `confidentialite`, `auteur`, `lecture`), sans décision écrite. **Amendement** : le zoom est un arbitrage de produit (dossier § 8, question 1), pas un `sed` aveugle sur 36 jeux. Le reste de la recommandation (strict par défaut, `Max`, `__mjTest`) part en vague 1.

### R08 — CI Playwright bloquant AVANT Pages + garde git push scopée sur site/**

- **Type, coût** : ci, S
- **Quoi** : .github/workflows/deploy.yml : job `test` (npm ci, `npx playwright install --with-deps chromium`, `npm test`, upload des captures 7 j) et `needs: [test]` sur `build-and-deploy` ; `npm run check` reste dans le job deploy ; supprimer `test-minijeux.yml`. Local : `npm run gate` = `npm run check && npm test` écrit `studio/minijeux/tests/.artifacts/GREEN.json` {sha HEAD, porcelain site/}. Dans `pre-tool.ps1` § Invoke-GardeGitAdd (l.90-101), pattern `git\s+push\b` : bloqué (exit 2, message « lance npm run gate ») UNIQUEMENT si `git diff --stat origin/master..HEAD -- site/` est non vide ET (GREEN.json absent ou sha ≠ HEAD) ; un push docs/memory-only passe. Miroir `.kimi-code/hooks/` (jumeaux par stem, post-tool.ps1:70-76) + 3 payloads dans hooks/tests/run.ps1. `workflow_dispatch` avec `skip_tests` réservé à PY pour un hotfix.
- **Fichiers** : `.github/workflows/deploy.yml`, `.github/workflows/test-minijeux.yml`, `package.json`, `.claude/hooks/pre-tool.ps1`, `.claude/hooks/tests/run.ps1`, `studio/minijeux/tests/run-full.mjs`
- **Ce que ça supprime** : test-minijeux.yml ; la prose « harnais OBLIGATOIRE avant tout push » (rules/mini-jeux.md:34-40, game-dev.md:42-49) ; les auto-memory `feedback_test_avant_user.md` et `feedback_deploy_push_mini_jeux.md` ; le ticket studio/minijeux/memory/TODO.md:25.
- **Preuve (cartographie)** : deploy.yml lu ce jour : seul `npm run check` avant « Assemble site », aucun `needs` ; test-minijeux.yml:3-5 : « ne bloque JAMAIS la publication » ; pre-tool.ps1:92-100 : 8 patterns git, aucun `push` ; `.git/hooks` vide (lecteur 4) ; L-147 = un jeu vert au harnais planté en prod ; juge 1 : 62 commits sur studio/dino/memory/TODO.md en 30 j → une garde sur simple sha imposerait Playwright pour une ligne de TODO.
- **Vérification (main, 2026-09-27)** : vérifié, AMENDÉ. `deploy.yml` : seul `npm run check` avant Pages ; `test-minijeux.yml` « ne bloque JAMAIS ». **Amendement** : la suite Playwright complète dure 9 min 02 s (sonde). La garde locale avant `git push` exige `check` + les specs des jeux touchés ; la suite complète tourne en CI (`needs: test`) avant Pages.

### R10 — Hooks Stop et PreToolUse durcis : pmo-check v2 (porte rejouée), lessons-gate, AskUserQuestion exit 2, git rm glob

- **Type, coût** : hook, S
- **Quoi** : (a) `pmo-check.ps1` : garder la trace mémoire (l.22-33) ; retirer `studio/dino/pmo/` (l.29, dossier inexistant) ; compter les écritures Bash `>`/`>>`/`Set-Content`/`Add-Content` vers site/ ou studio/ comme « touché » et exiger une commande d'ÉCRITURE pour la trace (l.75-81 : aujourd'hui `cat studio/dino/memory/TODO.md` suffit) ; par pôle, si `site/mj-XX.html` a été édité ce tour, un Bash du tour doit contenir `mj:test mj-XX`|`run.mjs mj-XX`|`npm run gate` ; si `content/dinos/*.json` ou `scripts-audio/**` édité, `check-dino-coherence`|`dino:new` — sinon exit 2 avec la commande exacte. (b) `lessons-gate` dans pre-tool.ps1 : un `## L-`/`- **L-` ajouté à `**/memory/LESSONS.md` doit porter `Porte :`|`Rule :`|`Hook :`|`Figée :`|`Archive :`, sinon exit 2 « une leçon sans porte sera refaite » — LESSONS seulement, pas DECISIONS. (c) settings.json PreToolUse matcher `AskUserQuestion` → exit 2. (d) garde-git-add + `git\s+(rm|mv)\b.*[*?]` (L-D-44). (e) `[Console]::OutputEncoding` UTF-8 (copie de signal-detector.ps1:9-10). +8 payloads dans hooks/tests/run.ps1 (Edit mj sans test → 2, avec → 0, agent PMO → 0, `cat TODO` seul → 2, leçon sans marqueur → 2, AskUserQuestion → 2, git rm glob → 2, push docs-only → 0).
- **Fichiers** : `.claude/hooks/pmo-check.ps1`, `.claude/hooks/pre-tool.ps1`, `.claude/settings.json`, `.claude/hooks/tests/run.ps1`, `CLAUDE.md`
- **Ce que ça supprime** : Le message « Regle 2026-07-19 … pmo/ pour DINO en transition » (pmo-check.ps1:100) ; les 5 copies de « capture immédiate » (L-005, dino/CLAUDE.md:23, minijeux/CLAUDE.md:21, rules/dino.md:27, auto-memory) ; les 6 copies prose d'AskUserQuestion hors ~/.claude/rules/interaction-style.md (CLAUDE.md:59, memory/LESSONS.md L-003, nouveau-dino/SKILL.md:20 et :184, auto-memory reference_bot_askuserquestion_bridge, post-tool.ps1:47) ; L-003, L-005, L-D-44 passent en « Hook : ».
- **Preuve (cartographie)** : pmo-check.ps1:29 lu ce jour cite `studio[\\/]dino[\\/]pmo[\\/]` (`ls studio/dino/pmo` = No such file) ; :75-81 : `if ($cmd -match $t) { traced = true }` sur n'importe quelle commande ; hooks/tests/run.ps1:55-73 = 5 payloads, tous pre-tool (lecteur 1) ; lecteur 2 : 30 leçons jeu dont 13 pure prose, 23 dino dont 12 ; les 3 juges retiennent lessons-gate comme LE mécanisme anti-ré-empilement, restreint à LESSONS (juge 1 : « Vérifié par : aucun » de complaisance sur DECISIONS).
- **Vérification (main, 2026-09-27)** : vérifié en partie. `pmo-check.ps1` : la trace DINO cite `studio/dino/pmo/` (dossier inexistant) et toute commande Bash qui mentionne `studio/dino/memory/`, même un `cat`, compte comme trace (l.75-81). Le reste : cartographie.

### R11 — figees-injector ciblé + digest 🔒/❌ par tour + regex/bandeau corrigés ; signal-detector réduit à 1 ligne de routage

- **Type, coût** : hook, S
- **Quoi** : pre-tool.ps1:41-44 : le match `'/studio/dino/'` devient `studio/dino/content/(dinos|scripts-audio|sources)/`, `site/dev-dinos.html`, `site/audio/dinos/`, `site/img/dinos/`, `site/js/gen/dinos-data\.js$` (regex l.42 morte depuis le déplacement en gen/) ; exclusion explicite de `memory/`, `docs/`, `figees/`. Injecter pour le dino seulement les lignes 🔒/❌ de encyclopedie.md (~69/129) avec le VRAI chemin dans le bandeau (l.54/60 parlent de `$slug.html` et du chemin minijeux) ; 1 injection par TOUR (marqueur lu dans le transcript borné comme pmo-check.ps1:37-41) — pas « par session » (perdue après /compact). signal-detector.ps1 : supprimer les 3 paragraphes (:49-58) et la référence morte (:70), retirer `rules\.md|stack\.md` (:26) ; garder 1 ligne « [pôle DINO] → .claude/rules/dino.md » / « [pôle JEU] → .claude/rules/mini-jeux.md » ; ajouter comme signal DINO les ids de `_ordre.json` chargés à la volée (« ajoute le Minmi » muet aujourd'hui) et « nouveau jeu|un jeu (où|sur)|mj pour » comme signal JEU. +2 payloads (Edit memory/TODO.md → 0 octet ; Edit content/dinos/minmi.json → digest).
- **Fichiers** : `.claude/hooks/pre-tool.ps1`, `.claude/hooks/signal-detector.ps1`, `.claude/hooks/tests/run.ps1`, `studio/dino/figees/encyclopedie.md`
- **Ce que ça supprime** : 20 Ko réinjectés à chaque ligne de backlog ajoutée sous studio/dino/ ; 563-901 o × 24-78 prompts de rappel par session ; la phrase « lire la figée avant d'éditer » copiée à 8 endroits (le hook l'impose) ; les 🔒 arrivant en « ðŸ”’ ».
- **Preuve (cartographie)** : pre-tool.ps1:41-44 lu ce jour (`$norm -match '/studio/dino/'`, `site/js/dinos-data\.js$`) ; mesure lecteur 6 : Edit studio/dino/memory/TODO.md → 20 157 o injectés, 61 commits TODO.md en 30 j, 6 injections = 121 Ko dans une session ; signal-detector.ps1:70 pointe une section de CLAUDE.md inexistante (grep vide) ; juge 3 : « 1× par session » = trou après /compact ; juge 2 : garder 1 ligne de routage car rien ne recharge la rule après /compact tant qu'aucun fichier n'est touché.
- **Vérification (main, 2026-09-27)** : vérifié. `pre-tool.ps1:42` : regex `site/js/dinos-data.js` morte depuis le passage en `gen/`. `:44` : tout fichier sous `studio/dino/`, TODO compris, déclenche l'injection de la figée entière (19 550 octets) avec un bandeau faux (`encyclopedie.html`, chemin minijeux). 65 commits sur `studio/dino/memory/TODO.md` en 30 jours. `signal-detector` : 563 octets par prompt, et cite une section de `CLAUDE.md` qui n'existe pas.

### R20 — Réparer l'extracteur FR des règles de jeu, aujourd'hui destructeur

- **Coût** : S
- **Quoi** : `studio/minijeux/scripts/_extract-mj-regles.mjs` importe Playwright par un chemin mort (l.29, `studio/minijeux/tests/node_modules/...` disparu depuis HO-R08) ; s'il tournait, il construit `const resultat = {}` (l.76) sans relire l'existant puis écrase `strings.json` (l.125) : filtré sur un id, il effacerait le FR des 35 autres jeux. Correctif : import depuis la racine, fusion avec l'existant, sauvegarde datée, test « filtré sur un id ne modifie aucune autre clé ».
- **Fichiers** : `studio/minijeux/scripts/_extract-mj-regles.mjs`, un test dans `studio/minijeux/tests/`
- **Vérification (main, 2026-09-27)** : vérifié (l.29, 76, 125)

### R21 — Gabarit de jeu conforme à sa propre porte

- **Coût** : S
- **Quoi** : `site/_template/mj-template.html` n'a ni `<link rel="manifest">` ni `js/sw-register.js`, que `audit-gabarit.mjs` exige en BLOQUANT (HO-R11). Ajouter les deux lignes et une porte « le gabarit passe `audit-gabarit` » dans `npm run check`.
- **Fichiers** : `site/_template/mj-template.html`, `studio/minijeux/tests/audit-gabarit.mjs`
- **Vérification (main, 2026-09-27)** : vérifié (grep vide sur le gabarit, règle l.196-199 de l'audit)

### R23 — `--preview` du batch d'images ne doit rien écrire

- **Coût** : S
- **Quoi** : `batch-dino-series.mjs` crée `site/img/dinos/_new-xxl/` et ajoute une ligne à `_PROGRESS.tsv` avant même de lire ses options, y compris en `--preview`. Déplacer `mkdirSync` et `logProgress` après la lecture des options ; test : `--preview` laisse `git status` vide.
- **Fichiers** : `.claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs`
- **Vérification (main, 2026-09-27)** : sonde Minmi, à revérifier en DoR

## Vague 2

### R02 — Porte étymologie EP-D23 + interdits de fond dans _verif-scripts-audio.cjs (ferme L-D-84)

- **Type, coût** : porte-script, S
- **Quoi** : Dans `_verif-scripts-audio.cjs` (151 l., 0 occurrence « etym » vérifiée) : charger `studio/dino/content/data/racines.json` (déjà généré par `_etymo2racines.cjs` dans build) ; pour chaque `dinos[<id>].racines[]`, ERREUR si le bloc A ne contient pas le `sens` (normalisation NFD, sans tirets, liste `sens_alt` par racine pour « lézard/reptile ») ; ERREUR si aucun nom de langue (grec|latin|…) dans le bloc A ; ERREUR si l'id est absent de racines.json ; grep `sang|tortur|agoni` (figée § prédation :78-84) et `\bWex\b` dans une réplique (rules/dino.md:54). Mode `--warn` 2 semaines : la porte COMPTE les KO (T-Rex, 9 fiches sans langue), on corrige ces blocs A avec dino-fiche-writer et on relance EL sur ces seuls blocs, puis bloquant. Ajouter 1 ligne 🔒 sourcée PY dans encyclopedie.md § vrais mots (:36-40) : « le bloc A dit chaque racine, son sens et sa langue — porte _verif-scripts-audio ».
- **Fichiers** : `studio/dino/content/scripts/export/_verif-scripts-audio.cjs`, `studio/dino/content/data/racines.json`, `studio/dino/figees/encyclopedie.md`, `studio/dino/memory/TODO.md`
- **Ce que ça supprime** : Le ticket EP-D23 (studio/dino/memory/TODO.md:135) ; l'auto-memory `feedback_dino_noms_latin_grec.md` (seule trace de la décision PY, hors repo) ; la phrase d'agent dino-fiche-writer.md:48 comme unique garant.
- **Preuve (cartographie)** : studio/dino/memory/LESSONS.md:63-80 (L-D-84 : « la porte vérifie la structure et les tags, jamais que le bloc A contient les racines ») ; `grep -ci etym _verif-scripts-audio.cjs` = 0 (vérifié) ; sortie réelle 2026-09-26 « 71 OK · 0 KO » alors que le T-Rex n'a ni « saure » ni « rex » (lecteur 5) ; TODO.md:135 EP-D23 non coché ; racines.json existe (75 dinos, T-Rex = tyrannos-/grec, -saure/grec, rex/latin — juge 3).
- **Vérification (main, 2026-09-27)** : vérifié. L-D-84 reconstituée et T-Rex corrigé le 2026-09-24 : la porte contrôle structure et tags, jamais les racines ni leur langue.

### R07 — check-mj-coherence v2 — i18n alignée D-013, bundle à jour, MP3-ou-ticket en avertissement, 🔒 sourcées pour les jeux neufs

- **Type, coût** : porte-script, S
- **Quoi** : studio/minijeux/tests/check-mj-coherence.mjs:40 : `I18N_LANGS` bloquant = fr/en (memory/DECISIONS.md D-013, `SUPPORTED=['fr','en']` site/js/lang.js:9), es-es/pt-br = avertissement. Ajouts : empreinte strings.json ↔ `site/js/gen/i18n/mj-strings.<lang>.js` (bundle régénéré) ; MP3 consigne `site/sounds/voix/phrases/<slug>.mp3` absent = AVERTISSEMENT nommé (repli TTS voulu par design, run.mjs:48-52) ; lignes 🔒 sans source (l.92-113) → BLOQUANT pour toute figée créée après la date de bascule (`git log --diff-filter=A`), avertissement pour les 36 existantes ; option `--next-id` (id libre + murOrder libre par zone). Marqueur de figée provisoire : selon arbitrage PY vague 0 (🟡 + en-tête `PROVISOIRE — playtest PY : non`), jamais des 🔒 que PY n'a pas vus.
- **Fichiers** : `studio/minijeux/tests/check-mj-coherence.mjs`, `studio/minijeux/scripts/_gen-mj-strings-bundle.cjs`
- **Ce que ça supprime** : Les traductions es/pt exigées pour 2 langues servies ; la régénération manuelle du bundle ; la note EP-043 comme « avertissement pour toujours » ; le ticket EP-076 pour les jeux neufs (si PY valide le marqueur provisoire).
- **Preuve (cartographie)** : check-mj-coherence.mjs:40,130-133 bloque sur 4 strings.json alors que D-013 (memory/DECISIONS.md:96-98) et lang.js:9 / mj-shell.js:47 ne servent que fr/en (lecteur 4) ; 320/620 lignes 🔒 non sourcées, EP-043 non bloquant par décision (:92-99) ; run.mjs:47-60 ASSET_OPTIONNEL ; juges 1 et 2 rejettent « MP3-ou-ticket bloquant » et les 🔒 sourcés « spec HO-MJ-n » (contredit rules/mini-jeux.md:17-20).
- **Vérification (main, 2026-09-27)** : vérifié. `site/js/lang.js:9` : `SUPPORTED = ['fr', 'en']`. Bundle `site/js/gen/i18n/mj-strings.<lang>.js` régénéré par rien d'automatique.

### R12 — check-refs-claude + check-figees — aucun chemin mort dans agents/skills/rules, aucun prompt qui contredit une figée

- **Type, coût** : porte-script, M
- **Quoi** : (a) `studio/minijeux/scripts/check-liens-md.mjs` accepte plusieurs racines (`docs .claude`) et vérifie l'existence de tout chemin `studio/|site/|docs/|memory/|.claude/` cité en lien ou en backticks dans `.claude/agents/*.md`, `.claude/skills/**/SKILL.md`, `.claude/rules/*.md` (+ `paths:` YAML ; globs = ≥ 1 match) ; `scripts/gen-agents-readme.mjs` gagne le lint frontmatter (`:` `—` `×` dans une description non quotée). (b) Nouveau `studio/minijeux/tests/check-figees.mjs` (partage `findUnsourcedLockLines`) : BLOQUANT si une ligne 🔒 citée dans une section « DÉFIGÉ/SUPPRIMÉE » plus bas n'est pas barrée `~~` (mj-31.md:25-32 vs :132-140) ; BLOQUANT si deux nombres pour le même invariant nommé dans la même figée (« 8 récits » :31 vs « 12 » :90) ; AVERTISSEMENT « figée qui PRESCRIT un procédé » (L-D-83, encyclopedie.md:88) ; les lignes ❌ 🔒 fournissent les phrases interdites (« running gag », « fil rouge », « doudou Tri », « quête ») grepées dans `.claude/agents/*.md` et `.claude/skills/**` UNIQUEMENT (pas les rules, qui citent l'abrogation — rules/dino.md:44-48), lignes contenant abrogé|défigé|remplace|prescrivait exclues. Les deux dans `npm run check` et dans post-tool (R09). `check-glossaire` fondu ici (rejeté seul par les 3 juges).
- **Fichiers** : `studio/minijeux/scripts/check-liens-md.mjs`, `scripts/gen-agents-readme.mjs`, `studio/minijeux/tests/check-figees.mjs`, `studio/minijeux/tests/check-mj-coherence.mjs`, `studio/minijeux/docs/jeux/figees/mj-31.md`, `package.json`
- **Ce que ça supprime** : La vérification à l'œil des « Première action OBLIGATOIRE » des 9 agents ; l'auto-memory `feedback_agent_frontmatter.md` et `feedback_regle_figee_alerte.md` (le lint alerte) ; la classe entière « l'agent démarre sur de fausses prémisses » (mécanisme L-D-84 côté chemins).
- **Preuve (cartographie)** : 13 chemins cassés dans 6 agents sur 9 (game-dev.md:26,28,35 ; game-mj-reviewer.md:28-29 ; game-conseiller.md:30,32 ; game-test-audio.md:21 ; dino-fiche-writer.md:24,29,31 ; dino-conseiller.md:28) + 3 paths morts rules/dino.md:7-8, sons.md:8 (lecteur 1, existence vérifiée sur 90 chemins) ; check-liens-md.mjs ne scanne que `docs` (package.json:8) ; dino-conseiller.md:24 « Tritri = running gag de Wex » contredit la figée RE-FIGÉE 2026-09-11 depuis 22 jours ; narration-audio-writer.md:40 « doudou Tricératops » ; juge 3 : la porte (c) sur les rules échouerait sur sa propre source rules/dino.md:44-48.
- **Vérification (main, 2026-09-27)** : vérifié. 11 chemins morts réels dans 5 agents sur 9 (hors gabarits `mj-XX`). `dino-conseiller.md:24` « Tritri = running gag de Wex » contre la figée RE-FIGÉE le 2026-09-11. `narration-audio-writer.md:40` « doudou Tricératops ». 250 liens morts sous `studio/`, 1 sous `memory/`, invisibles car la porte ne scanne que `docs/`.

### R22 — Porte de provenance des faits de fiche (L-D-85)

- **Coût** : S
- **Quoi** : Toute ligne « Fact-check » d'un en-tête de script V3 doit citer une URL et la phrase lue ; « CONFIRMÉ » sans URL = KO. Pour les espèces à synonyme ou à spécimen reclassé (liste tenue dans `content/sources/`), le numéro de spécimen est exigé. « Grokipedia 404 » se note comme tel, jamais comme une confirmation.
- **Fichiers** : `studio/dino/content/scripts/export/_verif-scripts-audio.cjs`, `studio/dino/content/sources/_ESPECES-A-SOSIE.md` (nouveau)
- **Vérification (main, 2026-09-27)** : vérifié (Minmi, 3 sources, corrigé le 2026-09-26)

## Vague 3

### R03 — gen-dinos-ui.cjs — les 3 maps de dev-dinos.html deviennent un fichier généré

- **Type, coût** : porte-script, M
- **Quoi** : Nouveau `studio/dino/content/scripts/export/gen-dinos-ui.cjs` → `site/js/gen/dinos-ui.js` (`window.DINO_EXTRAS`, `window.DINO_AUDIO`, `window.DINO_AUDIO_VERSION`) dérivé de `js/gen/dinos-assets.js` (paleoart manger/paris/ecosysteme/funfact par clé latine) + `js/gen/dinos-audio-manifest.js` (5 MP3 présents) + un marqueur `> version:` lu dans l'en-tête du script V3 (défaut V3). `site/dev-dinos.html` charge ce fichier à côté de `js/gen/dinos-audio-manifest.js` (l.667) et perd les `const` littérales l.1890, l.2387, l.2480 ; `dinoHasAudio()` (l.2470) inchangé. Dans `npm run build` et `--check` (mécanique de gen-dinos-assets.mjs:75-82). Capture avant/après sur Scelidosaurus, T-Rex, Minmi AVANT de supprimer les maps.
- **Fichiers** : `studio/dino/content/scripts/export/gen-dinos-ui.cjs`, `site/js/gen/dinos-ui.js`, `site/dev-dinos.html`, `package.json`
- **Ce que ça supprime** : nouveau-dino/SKILL.md:142 (« câbler les trois ») et :174 (piège « bouton audio masqué ») ; l'étape manuelle n°14 du pipeline dino ; ~600 lignes de maps littérales dans dev-dinos.html.
- **Preuve (cartographie)** : Vérifié ce jour : `grep -c scelidosaurus site/dev-dinos.html` = 0, `ls site/audio/dinos/fr/ | grep -c scelidosaurus` = 5 ; sonde Playwright lecteur 3 : DINOS=71, DINO_AUDIO=70, DINO_EXTRAS=70, `dinoHasAudio()=false` pour scelidosaurus, bouton masqué depuis le 2026-09-03 ; studio/dino/memory/_ETAT-DINOS.md dit « 71 complets (8/8) » ; les 3 juges classent cette idée en tête.
- **Vérification (main, 2026-09-27)** : vérifié ; symptôme corrigé à la main le 2026-09-27. Scélidosaure absent des trois tables (0 occurrence) avec 5 MP3 et 9 images sur disque ; câblé à la main (commit `5dab25fb`), vérifié à 360 et 320 px. La cause racine, des tables tenues à la main, reste ouverte.

### R04 — check-dino-coherence.cjs — la DoD dino mécanique par id, clone de check-mj-coherence

- **Type, coût** : porte-script, M
- **Quoi** : Nouveau `studio/dino/content/scripts/export/check-dino-coherence.cjs` (pattern `auditGame` + `--json` + exit 1 de check-mj-coherence.mjs:115-144). Par id (CLI) ou pour tous les ids de `_ordre.json` : json conforme `_schema.json` + `id ∈ _ordre.json` + aucun json orphelin ; champs structurés ↔ `_raw` cohérents (taille_m/hauteur_m/poids_t/nom_etym) ; script `scripts-audio/fr/V3/<id>.md` présent et `_verif-scripts-audio` OK ; 5 MP3 fr présents > 5 Ko ; hero, 5 scènes, coloriage, ombre, sprite, tête, bébé par clé latine ; entrée racines.json, lexique fr.md, 2 scènes dans combats.json, clé en/strings.json + script en ; présence dans dinos-ui.js ; dette référentiel `dino.<id>.*` = 0. Importe `verif-echelle.cjs`, `_verif-comppoids.cjs`, `_check-ombres-dino.mjs` sans les réécrire. `_gen-etat-dinos.cjs` devient `check-dino-coherence --md` (un code, deux vues, plus jamais 8 vs 15 axes). Dans `npm run check` : BLOQUANT par id ; GLOBAL avec liste `_wip.json` nominative (ids en cours, ajoutés par `dino:new`, retirés à la DoD, liste qui ne peut que rétrécir — pattern LEGACY d'audit-gabarit.mjs:83-93) pour ne jamais bloquer le déploiement du site pendant les 3 arrêts humains d'un dino neuf.
- **Fichiers** : `studio/dino/content/scripts/export/check-dino-coherence.cjs`, `studio/dino/content/scripts/export/_gen-etat-dinos.cjs`, `studio/dino/content/dinos/_wip.json`, `studio/dino/content/dinos/_schema.json`, `package.json`
- **Ce que ça supprime** : La checklist « 8 axes » en prose (rules/dino.md:35) ; les counts tenus à la main dans studio/dino/memory/INVARIANTS.md:19-33 (générés) ; nouveau-dino Phase 6 (:144-146) ; les tickets NOMS-COURTS-*/REFERENTIEL-96-DETTES comme lignes manuelles (deviennent une sortie de porte).
- **Preuve (cartographie)** : _gen-etat-dinos.cjs:53-64 = 8 axes (hero, 5 scènes, coloriage, 5 MP3, ombre, fiche, étymo, mesures) aveugles au câblage, sprite/tête, bébé, combats, EN, noms courts (lecteur 3 : Scelidosaurus 8/8 mais 0 sprite, 0 tête, 1/2 combats) ; HO-R12.md:33-37 documente la double source champs ↔ `_raw` ; `_gen-dinos-data.cjs:47-52` ne lit que `_raw` ; les 3 juges rejettent le global bloquant sans statut wip (CI rouge pendant les arrêts humains).
- **Vérification (main, 2026-09-27)** : vérifié. Sonde « ajoute le Minmi » : aucun contrôle « existe déjà ? ». `_ETAT-DINOS.md` disait le Scélidosaure complet 8/8 alors qu'il était sans bouton audio.

### R06 — run.mjs — 360 px par défaut, 320 en non-régression, tap 48 mesuré, fin de partie, une seule voix, 2 captures ; compat.mjs supprimé

- **Type, coût** : porte-script, M
- **Quoi** : studio/minijeux/tests/run.mjs:45 : viewport 360×740 (P30 Pro) au lieu de 480×900. Après `spec.run()` : (a) recharge à 320×568, FAIL si `scrollWidth > innerWidth` ; (b) mesure les boîtes rendues de `button, .tap, [data-act], a.btn` → FAIL si < 48×48 (L-140, mobile-parents) ; (c) `.end-wrap` visible en fin de spec au RUNTIME sauf id dans `LEGACY_FIN_MAISON` (L-147 ; 9 specs à corriger, liste qui ne peut que rétrécir) ; (d) `page.addInitScript` patchant `HTMLMediaElement.prototype.play` et `speechSynthesis.speak` → FAIL si 2 sources voix se chevauchent à la victoire (L-111) ; (e) captures `<mj>-360.png` et `<mj>-320.png` dans `studio/minijeux/docs/handoffs/rapports/captures/` (chemin déjà utilisé par armoire.spec.mjs:42-45), PAS dans `.artifacts/` gitignoré. Supprimer `compat.mjs` (chemin `../web` mort l.23, hors npm, 3 moteurs pour un P30 Pro Chromium).
- **Fichiers** : `studio/minijeux/tests/run.mjs`, `studio/minijeux/tests/compat.mjs`, `studio/minijeux/tests/mj-*.spec.mjs (9 specs sans fin)`
- **Ce que ça supprime** : `compat.mjs` ; l'agent `game-test-audio.md` (padding et exclusivité → machine, R13) ; la prose « responsive tablette landscape + portrait » du reviewer (:94-95) ; la recette manuelle « voir à 360, voir à 320 » pour les mini-jeux.
- **Preuve (cartographie)** : run.mjs:45 lu ce jour : `viewport: { width: 480, height: 900 }` ; 3 specs/36 fixent un viewport, 5 fichiers/51 citent 360 (lecteur 5) ; compat.mjs:23 `resolve(__dir,'..','web')` + `ls studio/minijeux/web` inexistant (lecteur 4) ; L-147 (LESSONS jeu:172-176) : mj-13a/13c verts à `npm test`, plantés en 8e manche ; L-111 : fanfare + MP3 + TTS ensemble ; HO-MJ-20 : 8 passes et 3 recettes PY avec spec vert parce que le spec mesurait des rects à 480×900 (lecteur 5).
- **Vérification (main, 2026-09-27)** : vérifié. `run.mjs:45` viewport 480×900. La sonde mj-60 a trouvé une animation jouée derrière le panneau règle, invisible pour les trois portes, repérée seulement en ouvrant une capture.

### R09 — post-tool.ps1 — dispatcher de portes STATIQUES rejouées dans le tour, sortie en additionalContext

- **Type, coût** : hook, M
- **Quoi** : `.claude/hooks/post-tool.ps1` (déjà branché PostToolUse Edit|Write, settings.json:113-117, ne fait aujourd'hui que le miroir AGENTS.md) route par chemin et exécute la porte statique correspondante (< 2 s, 0 navigateur) : `site/mj-XX.html` → `audit-gabarit.mjs mj-XX --json` ; `scripts-audio/fr/V3/<id>.md` → `_verif-scripts-audio.cjs fr <id>` ; `content/dinos/<id>.json` → `_gen-dinos-data.cjs --with-header` puis `check-dino-coherence.cjs <id>` ; `docs/jeux/figees/mj-XX.md` ou `figees/encyclopedie.md` → `check-figees.mjs` ; `site/js/catalog.js` ou `strings.json` → `check-mj-coherence.mjs --json`. 0 octet si OK, 100-500 o si KO : l'erreur arrive DANS le tour sans rappel ni relecture. Portes lentes (Playwright, MP3) restent dans `gate`/Stop. `Measure-Command` dans hooks/tests pour garder < 2 s ; +4 payloads.
- **Fichiers** : `.claude/hooks/post-tool.ps1`, `.claude/hooks/tests/run.ps1`
- **Ce que ça supprime** : nouveau-dino:89 (« relire soi-même après l'agent ») ; les rappels « vérifier la figée » du signal-detector ; la boucle « edit → oublier la porte → push → CI rouge » ; le sous-agent Haiku « porte-runner » proposé par P2 (rejeté par les 3 juges : un script se lance en Bash, pas par un LLM).
- **Preuve (cartographie)** : settings.json:113-117 : PostToolUse Edit|Write → post-tool.ps1 (vérifié) ; post-tool.ps1 = sync AGENTS.md + commit INBOX narration seulement (lecteur 5) ; lecteur 6 : signal-detector coûte 563-901 o × 24-78 prompts par session pour rappeler ce qu'une porte ferait à 0 token ; les 3 juges placent ce composant parmi les meilleures idées de P1.
- **Vérification (main, 2026-09-27)** : à revérifier en DoR (cartographie seule). Contenu actuel de `post-tool.ps1` non relu par le main.

### R13 — dev-dinos.spec.mjs (rendu par dino, captures 360/320) + verif-mp3.mjs branché dans _gen-audio-v3.sh

- **Type, coût** : porte-script, M
- **Quoi** : (a) `studio/minijeux/tests/dev-dinos.spec.mjs` (à côté de i18n-dinos.spec.mjs, découvert par run-autonomes.mjs:14-16 — pas de dossier `studio/dino/tests/`) : global = `DINOS.length` = entrées DINO_AUDIO = DINO_EXTRAS = manifest fr, 0 pageerror, 0 404 hors ASSET_OPTIONNEL ; par id (`node dev-dinos.spec.mjs <id>`) : `?open=<id>`, hero `naturalWidth > 0`, bouton audio visible, 4 scènes + combats en galerie, badge version, captures `studio/dino/docs/handoffs/rapports/captures/dino-<id>-360x740.png` et `-320x568.png` (chemin de i18n-dinos.spec.mjs:12), FAIL si débordement horizontal. (b) `studio/dino/content/scripts/audio/verif-mp3.mjs <id> [--stt]` : 5 fichiers > 5 Ko, durées ffprobe (bloc 15-35 s, recap 60-120 s), silence de tête ≥ 250 ms (mesure de `_pad-tete.mjs`), et `--stt` opt-in seulement (reconstruit le texte depuis `_seg-<id>-<bloc>.json` et appelle `~/.claude/skills/audio-verif/scripts/verif.mjs`, crédits EL) ; appelé en fin de `_gen-audio-v3.sh` (après la boucle l.30-40) → KO si un MP3 manque au lieu d'un « OK » sur fichier absent.
- **Fichiers** : `studio/minijeux/tests/dev-dinos.spec.mjs`, `studio/dino/content/scripts/audio/verif-mp3.mjs`, `studio/dino/content/scripts/audio/_gen-audio-v3.sh`, `studio/dino/content/scripts/audio/_pad-tete.mjs`
- **Ce que ça supprime** : nouveau-dino Phase 6 « Playwright ad hoc » (:146) refaite en contexte principal ; nouveau-dino:107 (« compter 5 MP3 … ffprobe à l'œil ») et :169 (« MP3 OK mais absents ») ; le ticket « audio-verif sur 70 fiches à généraliser » ; le STT systématique de P2 (rejeté : palier Creator saturé, HO-019:17 solde ≈ 15 000/173 048).
- **Preuve (cartographie)** : `ls studio/dino/tests` = No such file ; seul i18n-dinos.spec.mjs touche dev-dinos (lecteur 5) ; run-autonomes.mjs:14-16 ne découvre que `studio/minijeux/tests/*.spec.mjs` (juge 1) ; `grep DINO_EXTRAS|DINO_AUDIO` dans tests/scripts = vide, ffprobe dans 7 scripts sans `verif-mp3 <id>` (lecteur 6) ; verif.mjs:9,150 appelle /v1/speech-to-text avec la même clé EL (juge 3) ; L-D-81 : appel coupé facturé.
- **Vérification (main, 2026-09-27)** : vérifié en partie. Sonde portes : `_verif-scripts-audio` vérifie le texte, jamais que le MP3 existe ou correspond.

## Vague 4

### R14 — npm run dino:new -- <id> — orchestrateur exécutable SANS fichier d'état, arrêts humains nommés, range-serie à verdict

- **Type, coût** : porte-script, L
- **Quoi** : `studio/dino/scripts/dino-new.mjs` recalcule tout depuis le disque via `check-dino-coherence <id>` (aucun `_etat/<id>.json`) : 0 `existe déjà ?` (id ∈ `_ordre.json` → affiche les manques et s'arrête : « ajoute le Minmi » ne relance plus un fact-check) · 1 attend `content/dinos/<id>.json` → ajoute l'id à `_wip.json` → `npm run build` → `check-dino-coherence <id>` (la liste des manques EST la TODO du dino) · 2 attend `scripts-audio/fr/V3/<id>.md` → `_verif-scripts-audio fr <id>` · 3 `--go-audio` (arrêt humain, affiche le coût EXACT en caractères calculé sur les `_seg-*.json` et le solde EL lu par l'API avec la clé de settings.json) → `_md2json-v3` → `_gen-audio-v3.sh <id>` → `verif-mp3 <id>` → `_gen-audio-manifest` → `gen-dinos-ui` · 4 `--go-images` (arrêt humain quota/jugement) → `batch-dino-series.mjs` puis `range-serie.mjs --valide` (nouveau, clone de `range-combat.py` : staging `_new-xxl` → `paleoart/` webp, verdict obligatoire comme `substitue-audit.mjs`) → dérivés 0 quota (`ombre_rembg.py`, `sprite_from_hero.py`, `bebe_detoure.py`) → build · 5 `dev-dinos.spec <id>` + captures · 6 `check-dino-coherence <id>` = 0 manque → retire l'id de `_wip.json`, `_gen-etat-dinos`, imprime « DoD atteinte » · 7 `--lunii` optionnel (`prepare-dino-assets.mjs <id>` → `build-pack.mjs dinos`). Sans flag : « PROCHAINE ACTION : … », exit 0. Chaque étape = un script existant + une vérification disque ; jamais un jugement (taxo, images).
- **Fichiers** : `studio/dino/scripts/dino-new.mjs`, `.claude/skills/dino-images-lunii/scripts/range-serie.mjs`, `studio/dino/content/dinos/_wip.json`, `package.json`, `studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md`
- **Ce que ça supprime** : nouveau-dino/SKILL.md Phases 2 (:68-74), 3b (:97-107), 5 (:136-142), 6 (:144-146), 7 `_gen-etat` (:154) et la table « ce qui coince » (:164-174, 5 lignes sur 7 deviennent des vérifs de script) ; le déplacement manuel staging→prod de la série (SKILL:136-140) ; le rappel « reconstruire le pack Lunii ».
- **Preuve (cartographie)** : `ls -R .claude/skills/nouveau-dino/` = SKILL.md seul, V1 2026-07-25 jamais révisée malgré 2 usages (lecteur 3) ; `_PROGRESS.tsv` ne couvre que les images (batch-dino-series.mjs:28) ; ≥ 6 arrêts subis pour 3 légitimes, 35 % du chemin auto (table 22 étapes, lecteur 3) ; les 3 juges rejettent le fichier d'état (L-D-54 : script qui trace l'intention) ; juge 3 : Minmi FR = 1 308 car. mesurés = 0,76 % du mois Creator, afficher le coût exact.
- **Vérification (main, 2026-09-27)** : vérifié par la sonde Minmi. 35 à 40 % du chemin « nouveau dino » tient aujourd'hui sans humain ni question.

### R15 — npm run mj:new + _template.spec.mjs + skills nouveau-jeu (nouvelle) et nouveau-dino v2 (réduite)

- **Type, coût** : skill, M
- **Quoi** : (a) `studio/minijeux/scripts/mj-new.mjs mj-XX "Titre" emoji` : copie `site/_template/mj-template.html` (viewport corrigé), entrée `catalog.js` `status:'wip'` avec les champs obligatoires de STANDARD-MJ.md:13, clé `mj-XX` dans i18n fr + en (es/pt copiées `_todo:true`), spec `tests/mj-XX.spec.mjs` depuis `tests/_template.spec.mjs` (nouveau : smoke, chemin gagnant via `__mjTest`, assert `.end-wrap`, un `ok('🔒 …')` par ligne de figée), figée `docs/jeux/figees/mj-XX.md` avec en-tête provisoire (marqueur arbitré vague 0), `_extraire-textes-jeux.mjs`, puis `check-mj-coherence mj-XX` vert AVANT la première ligne de gameplay. (b) `.claude/skills/nouveau-jeu/SKILL.md` (~90 l., auto-trigger « nouveau jeu », « un jeu où », « mj pour ») : § DoR en texte (mécanique dans MECANIQUES.md — re-skin avant code neuf —, aire pédagogique, palier N1, titre ≤ 4 mots + emoji, consigne FR, MP3 ou TTS, zone/murOrder via `--next-id`, `__mjTest`), UN arrêt de cadrage, puis `mj:new` → `game-dev` → `mj:test` → Read des 2 captures → `game-mj-reviewer` → `game-test-secu` (invoqué par le main, pas par le reviewer) → `gate` → push → playtest PY → figée sort du provisoire. (c) `nouveau-dino/SKILL.md` 185 → ~90 l. : Phase 0 `dino:new <id>` (existe déjà ?), Phase 1 dino-conseiller, arrêt taxo, fiche+étymo+lexique par le main, `dino-fiche-writer` NOMMÉ pour le script (format `<id>.md`, plus `<lot>.md` :78), images via `dino-images-lunii`, `dino:new` entre chaque phase ; arrêts `--go-audio`/`--go-images` nommés.
- **Fichiers** : `studio/minijeux/scripts/mj-new.mjs`, `studio/minijeux/tests/_template.spec.mjs`, `.claude/skills/nouveau-jeu/SKILL.md`, `.claude/skills/nouveau-dino/SKILL.md`, `studio/minijeux/docs/STANDARD-MJ.md`, `package.json`
- **Ce que ça supprime** : STANDARD-MJ.md § Livrer étapes 1, 3-6 (:15-21) → « `mj:new` puis coder » ; le commentaire « COMMENT LIVRER » de mj-template.html:78-94 ; rules/mini-jeux.md:44 (workflow en 7 flèches humaines) ; EQUIPE.md:79-94 ; les Phases mécanisées de nouveau-dino et ses 3 lectures préalables (:24-28).
- **Preuve (cartographie)** : `ls .claude/skills/` = 7 skills, 0 pour les mini-jeux (lecteur 4) ; STANDARD-MJ.md:9-29 = 9 emplacements en checklist manuelle ; 15 points de relance humaine sur le pipeline jeu (lecteur 4) ; nouveau-dino:34 ne nomme que dino-conseiller, Phase 3 sans agent et au format `<lot>.md` contredit par `_verif-scripts-audio.cjs:2` (lecteur 1) ; game-mj-reviewer.md:5 n'a pas l'outil Agent → test-audio/secu jamais lancés.
- **Vérification (main, 2026-09-27)** : vérifié par la sonde mj-60. Gabarit qui casse son propre audit, prochain id faux dans la doc (mj-54 au lieu de mj-60), aucune zone possible pour un jeu non dino, outil FR destructeur.

### R16 — Gabarit de handoff unique (DoR + DoD, exemples = chemin + porte) et handoff-check léger dans gc.mjs

- **Type, coût** : gabarit, S
- **Quoi** : `docs/handoffs/_template.md` v2 pour les 3 pôles (le dino garde une ligne de pointeur, le pôle JEU qui n'en a pas l'utilise) : frontmatter minimal `id / pole / statut / depend / fichiers / arrets_humains` ; § Prêt (DoR) et § Fait (DoD) tels que dans le gabarit livré ; règle L-D-84 : § Exemples conformes n'accepte que `{chemin existant, porte qui le valide}`, `fond: forme-seule` obligatoire sinon. `scripts/gc.mjs` § handoffs : lit les frontmatters, GÉNÈRE le registre dans chaque README (remplace les 3 tables manuelles), FAIL sur statut fichier ≠ registre (tous statuts, pas seulement `fait`), deux briefs actifs sur le même fichier, brief `fait` hors `archives/`, rapport citant une capture inexistante ou plus ancienne que le dernier html/json modifié, section Portes sans sortie brute (un « ✓ » nu). Pas de `figee_sha`, pas de rapport 5 sections, pas de brief par dino/jeu (briefs réservés aux chantiers multi-items) ; les préconditions d'environnement (Brave, quota images) ne se cochent que si `arrets_humains` contient `images`, le solde EL que si `go_credits`.
- **Fichiers** : `docs/handoffs/_template.md`, `studio/dino/docs/handoffs/_template.md`, `docs/handoffs/README.md`, `studio/minijeux/docs/handoffs/README.md`, `studio/dino/docs/handoffs/README.md`, `scripts/gc.mjs`
- **Ce que ça supprime** : `studio/dino/docs/handoffs/_template.md` (→ pointeur) ; les 3 tables de registre tenues à la main ; le `handoff-check.py` promis par protocole-handoffs.md:37 jamais écrit ; la DoD de lane en une ligne de memory/TODO.md:8 (déplacée dans le gabarit).
- **Preuve (cartographie)** : docs/handoffs/_template.md:1-25 et studio/dino/…/_template.md:1-21 : 6 sections, 0 DoR, 0 DoD ; `ls studio/minijeux/docs/handoffs/_template.md` inexistant ; registre JEU arrêté à HO-MJ-21 alors que HO-MJ-23/24 existent ; DINO HO-022 « pret » vs fichier « FAIT » ; gc.mjs:65-79 ne voit que le cas `fait` ; 13 rapports sur 19 sans verdict brut (lecteur 5) ; L-D-84 : « une règle perd contre un exemple qui la contredit » ; juges 1 et 2 retiennent la règle exemple = chemin + porte et rejettent `figee_sha`.
- **Vérification (main, 2026-09-27)** : à revérifier en DoR (cartographie seule). Gabarits et registres non relus par le main.

## Vague 5

### R17 — Agents JEU et DINO réécrits sur le repo réel, préchargés en digest, reviewer = juge de figée + lecteur de captures

- **Type, coût** : agent, M
- **Quoi** : Une passe (skill pmo-design), `check-refs` vert avant commit. `game-dev.md` : stack réelle (mj-shell, mj-golden, MaxFX, catalog.js, i18n, référentiel), lectures = STACK.md + INVARIANTS arbitrés + MECANIQUES.md + figée du jeu ; 360 px / 48 px ; plus de Phaser/Vite/1024×768/MJ-01..20/index.html. `game-mj-reviewer.md` : `model: sonnet`, garde Section 0 (:39-50) et Section 7 (:123-135), ajoute Section 8 « captures » = `Read` de `mj-XX-360.png`/`-320.png` et verdict sur ce que l'œil voit ; supprime tout ce qu'audit-gabarit et run.mjs bloquent (:52-98 : OGG, index.html, Fredoka, klaxon, emoji, fetch, hex) → ~120 l. `game-conseiller.md` : chemins réels, retirer `memory/archive/PIPELINE-MEMORY-MJ.md` (41 Ko). `game-test-audio.md` supprimé ; `game-test-secu.md` : « invoqué par le main après le reviewer ». `dino-fiche-writer.md` : `content/dinos/<id>.json` (3 Ko) au lieu de `site/js/dinos-data.js` (mort, 133 Ko) ; HO-011 archivé retiré (son exemple est celui de L-D-84), `_RELECTURE-*` retirés ; étymo et vignettes par `grep <id>` ; INVARIANTS + figée → digest généré `_methode/DIGEST-FICHE.md` (~40 l. : § Échelle, § Casting, lignes 🔒 audio) ; « la porte fait foi, lance-la avant de rendre ». `dino-conseiller.md:24` → pointeur rules/dino.md § Tritri ; :28 chemin mort retiré ; préchargement = digest. `dino-pmo.md`/`game-pmo.md` : archives et audits/ hors lecture obligatoire, « L-Dxx → LESSONS.md », « sprint-log » retiré. Retirer `memory: project` des 4 agents et les dossiers agent-memory vides.
- **Fichiers** : `.claude/agents/game-dev.md`, `.claude/agents/game-mj-reviewer.md`, `.claude/agents/game-conseiller.md`, `.claude/agents/game-test-audio.md`, `.claude/agents/game-test-secu.md`, `.claude/agents/dino-fiche-writer.md`, `.claude/agents/dino-conseiller.md`, `.claude/agents/dino-pmo.md`, `.claude/agents/game-pmo.md`, `studio/dino/content/scripts-audio/_methode/DIGEST-FICHE.md`, `.claude/agent-memory/`
- **Ce que ça supprime** : 13 chemins morts ; 4 leçons archivées citées ; la fausse chaîne « invoqué par game-mj-reviewer » (game-test-audio.md:8, game-test-secu.md:8, studio/minijeux/CLAUDE.md:47) ; ~100 lignes de checklist mécanique du reviewer ; 8 occurrences de « sprint-log » ; 4 mémoires d'agent vides depuis 22 jours ; 312 Ko → ~45 Ko de préchargement par fiche.
- **Preuve (cartographie)** : game-dev.md:9-14,40,57 (Phaser, 1024×768, MJ-01 à MJ-20, index.html) vs STANDARD-MJ.md:9-30 et EQUIPE.md:14 ; game-mj-reviewer.md:5 tools sans Agent, 281 l. dont ~100 doublonnent audit-gabarit.mjs:47-53 ; dino-fiche-writer.md:29 → dinos-data.js 133 Ko chemin mort, lecture totale ≈ 312 Ko (lecteur 6, E2 : −65 k tokens par fiche) ; dino-conseiller.md:24 contredit encyclopedie.md:10-23 RE-FIGÉ 2026-09-11 ; .claude/agent-memory/*/MEMORY.md 8-9 lignes « vide au démarrage » depuis 2026-09-04.
- **Vérification (main, 2026-09-27)** : vérifié. `game-mj-reviewer` : `tools: Read, Grep, Glob, Bash`, sans Agent, alors que `game-test-audio` et `game-test-secu` se disent « invoqués par » lui. `game-dev` décrit Phaser, 1024×768, MJ-01 à MJ-20 et un menu `index.html`.

### R18 — Fusion rule ↔ CLAUDE.md par pôle, CLAUDE.md racine 92 → ~60 l., STANDARD-MJ seule source JEU, EQUIPE.md remplacé par le README généré

- **Type, coût** : fusion, M
- **Quoi** : `.claude/rules/dino.md` 73 l. → ~45 l. : § Réflexe (figée injectée par le hook, chiffres = `_ETAT-DINOS.md`, fiche canon `<id>.json`), § Doctrine GED (UNIQUE copie), § Norme clé, § Tritri & Wex (inchangé, source unique :44-57), § Portes (`npm run check` + ce qu'il couvre, remplace § Règles dures :59-65), § Toujours (commit+push 1 ligne) ; paths :7-8 corrigés ; le pointeur 🔒 DEC-GED-001 :31 vers INVARIANTS réécrit vers `_ETAT-DINOS.md` + § valeurs arbitrées APRÈS défigeage PY en texte (vague 0). `studio/dino/CLAUDE.md` 81 → ~18 l. (produit + table « où vit quoi » corrigée :44 → `content/dinos/<id>.json`). `.claude/rules/mini-jeux.md` 56 → ~30 l. (triple verrou figée :14-22, 1 ligne gate, 1 ligne skill nouveau-jeu, pointeur STANDARD) ; `studio/minijeux/CLAUDE.md` 74 → ~20 l. ; STANDARD-MJ.md 174 → ~140 l. (§ Livrer réduit, piliers v1 → archive, § Audio 250 ms → rules/sons.md seule) ; STACK.md → ~60 l. de faits de déploiement ; EQUIPE.md supprimé (`scripts/gen-agents-readme.mjs:7-8` le prévoit déjà). CLAUDE.md racine : garder routage (+ « ajoute le X » → DINO si X ∈ `_ordre.json`), plateforme, arborescence, profil ; supprimer :26 (commentaire vers section inexistante), :58-61, :63-67, :78-86 → 1 ligne « `npm run check` = toutes les portes ; `npm test` = Playwright ; `npm run gate` avant push » ; ajouter « les 3 commandes à quota (dino-images-lunii, dino-paleoart, lunii-sync) ne se déclenchent que sur demande de Papa Yann » et « une leçon = sa porte ». AGENTS.md miroirs resynchronisés (post-tool.ps1), env-compat-check rejoué.
- **Fichiers** : `.claude/rules/dino.md`, `studio/dino/CLAUDE.md`, `.claude/rules/mini-jeux.md`, `studio/minijeux/CLAUDE.md`, `studio/minijeux/docs/STANDARD-MJ.md`, `studio/minijeux/docs/STACK.md`, `studio/minijeux/EQUIPE.md`, `CLAUDE.md`, `studio/dino/AGENTS.md`, `studio/minijeux/AGENTS.md`
- **Ce que ça supprime** : ~7 Ko rechargés après chaque /compact par pôle ; 12 règles en double entre rule et CLAUDE.md dino ; 5 fichiers JEU qui se disent chacun « source de vérité » ; EQUIPE.md (143 l., sprint-log, state.md, index.html en dur) ; 30 lignes du CLAUDE.md racine qui vivent déjà ailleurs ; la contradiction source de vérité (studio/dino/CLAUDE.md:44 vs D-009).
- **Preuve (cartographie)** : rules/dino.md:3 `paths: studio/dino/**` + nested CLAUDE.md chargés ensemble, doublons :27,44-57,59-65,69 ↔ studio/dino/CLAUDE.md:9-17,23,60,66-68 (lecteur 6) ; JEU : 46 Ko de sources concurrentes (INVARIANTS 7,7 + STANDARD 14 + STACK 8,9 + EQUIPE 7,7 + rule 3,2 + CLAUDE 4,9 — juge 3) ; rules/dino.md:31 lu ce jour = ligne 🔒 pointant `memory/INVARIANTS.md` (juge 3 : défigeage PY requis) ; CLAUDE.md:26 = commentaire HTML seul vers « Signaux qui déclenchent les agents auto ».
- **Vérification (main, 2026-09-27)** : à revérifier en DoR (cartographie seule). Doublons rule ↔ CLAUDE.md non recomptés par le main.

### R19 — Mémoire rationalisée : INVARIANTS → valeurs arbitrées + généré, archives descendues, auto-memory purgée, 2 décisions orphelines gravées, 5 arbitrages tranchés

- **Type, coût** : suppression, M
- **Quoi** : (1) `studio/dino/memory/INVARIANTS.md` → ~30 l. de valeurs ARBITRÉES (échelle, bornes durées, langues servies alignées D-013, casting → pointeur `voice-map.json`, plus de voice_id en clair :76-80) ; counts :19-33, familles :103-119, statuts :97-101 → `_ETAT-DINOS.md` généré ; journal :4-15 → MEMORY.md ; Doctrine GED :88-95 → pointeur ; l'ancien fichier verbatim en `memory/archive/INVARIANTS-2026-09-26.md` avec bandeau (Convention archive DECISIONS.md:43-52). (2) `studio/minijeux/memory/INVARIANTS.md` → ~30 l. de chiffres arbitrés + pointeurs (« 1024×768 », « 80×80 » remplacés). (3) `studio/minijeux/memory/DECISIONS.md:36-130` (designs « vision ancienne non appliquée ») → `memory/archive/designs-2026-H1.md`. (4) `memory/DOCTRINE.md` : :1-59 → `docs/handoffs/archives/2026-09/`, :61-93 → en-tête de gc.mjs ; fichier supprimé. (5) `memory/GLOSSAIRE.md` : 4 lignes périmées corrigées (:24, :30-31, :40-41, :52), § Dérives → audit daté, § Termes ❓ → TODO. (6) DECISIONS dino : :16 (80 ms) barrée → :22 ; :31 et :33 closes ; :3 chemin corrigé — on ajoute « abrogée le … », on ne réécrit pas. (7) Graver dans encyclopedie.md les 2 décisions qui n'existent qu'en auto-memory : « noms latin/grec + sens » (§ vrais mots :36-40) et « cannibalisme infantile refusé 2026-05-17 » (§ prédation :78-84) ; sons.md:43 aligné sur « fiches padées 250 ms ». (8) Auto-memory : zip daté hors repo (D-007), puis suppression des 22 doublons + 3 archives, 5 feedbacks d'interaction → ~/.claude/rules/interaction-style.md, narration dans un sous-index, index MEMORY.md 90 → ~25 l., 3 chemins morts corrigés (:2), « TODO reportés » → memory/TODO.md. (9) Ajouter à ~/.claude/rules/memoire-projet.md : « avant d'ajouter une ligne à une rule, un agent ou une figée : un script peut-il le vérifier ? oui → porte + pointeur ; non → UN endroit, les autres pointent ».
- **Fichiers** : `studio/dino/memory/INVARIANTS.md`, `studio/minijeux/memory/INVARIANTS.md`, `studio/minijeux/memory/DECISIONS.md`, `memory/DOCTRINE.md`, `memory/GLOSSAIRE.md`, `studio/dino/memory/DECISIONS.md`, `studio/dino/figees/encyclopedie.md`, `.claude/rules/sons.md`, `C:/Users/kimen/.claude/projects/c--ProjetsPerso-Claude-Projects-MaxPlay/memory/MEMORY.md`, `C:/Users/kimen/.claude/rules/memoire-projet.md`
- **Ce que ça supprime** : ≈ 45 items « doublon » + 32 « archive » sur 212 classés ; 12 contradictions vivantes (silence 80/250, récits 8/12, langues 9/2, tap 80/60/48, 1024×768/360, Doctrine GED ×2, crescendo figé vs L-D-82, source dinos-data.js vs JSON, silhouettes, drift 70/71, ères, mj-31 🔒 abrogés) ; DOCTRINE.md ; 30 fichiers auto-memory ; 9,2 → 2,5 Ko d'index chargés à chaque session.
- **Preuve (cartographie)** : Lecteur 2 : 212 items classés, 73 porte / 9 rule-hook / 53 skill-agent / 32 archive / 45 doublon ; 12 règles répétées ≥ 3 fois (padding ×8, Max ×9, zéro chiffre ×10…) ; INVARIANTS dino:33 « 9 langues FIGÉE » vs D-013 ; :25 « 12 récits » vs :79 « 8 » ; voice_id en clair :76-80 vs sons.md:44 ; DOCTRINE.md:58 vs :63 se contredit sur sa propre existence ; auto-memory : 22 doublons/44, 2 décisions orphelines (feedback_dino_violence_juste.md:15), 3 chemins morts dans MEMORY.md:2 ; juge 1 : dans 2 cas l'auto-memory est PLUS à jour que le repo → graver avant de supprimer.
- **Vérification (main, 2026-09-27)** : vérifié en partie. INVARIANTS dino « 9 langues FIGÉE » contre D-013 « deux langues servies ». Cible tactile : 80 px (STANDARD-MJ:92, rule mini-jeux l.26) contre 60 px (rule l.48) contre 48 px (règle globale).

## Annexe — gabarit de brief HO avec DoR et DoD (vague 4, R16)

> Proposition à copier dans `docs/handoffs/_template.md` au moment de la vague 4. D'ici là, les briefs existants restent valables.

> Copier tel quel. Un brief ne sert qu'aux chantiers multi-items (une vague de dinos, un pack de jeux, une refonte). Un dino ou un jeu SEUL passe par `npm run dino:new` / `npm run mj:new` : la sortie de `check-*-coherence <id>` EST sa DoR et sa DoD, pas de brief.
> Règles fixes : chaque case DoR/DoD cite une COMMANDE et sa sortie, jamais une phrase. Un exemple est un CHEMIN + la porte qui le valide aujourd'hui, jamais un extrait recopié (L-D-84). Les arrêts humains sont nommés dans le frontmatter ; tout autre arrêt est un bug de process à graver.

```markdown
---
id: HO-<POLE>-<NNN>            # HO-D-042 · HO-MJ-025 · HO-T-003
pole: dino | jeu | transverse
statut: brouillon | pret | en_cours | rapport_recu | fait
depend: []                      # ids de briefs qui doivent être `fait`
fichiers: []                    # EXHAUSTIF — tout fichier que l'exécutant a le droit de toucher
arrets_humains: []              # parmi : taxo · cadrage · go_credits · images · playtest · recette
---

# HO-<POLE>-<NNN> — <titre en une ligne, observable>

## 1. Objectif
Une phrase qui décrit ce que Max (ou Papa Yann) VERRA de différent. Pas de « refactor », pas de « améliorer ».

## 2. Prêt — Definition of Ready (rien ne se lance sans ces sorties collées)
- [ ] **Existe déjà ?** — sortie de `node studio/dino/content/scripts/export/check-dino-coherence.cjs <id>` / `node studio/minijeux/tests/check-mj-coherence.mjs --next-id` / `grep -i <mot> site/js/catalog.js` collée ci-dessous. Si ça existe → ce brief devient un brief de complétion ou de re-skin.
- [ ] **Loi lue** — chemin de la figée concernée + lignes 🔒 citées par numéro. Pour un dino : l'arrêt taxo est passé, réponse de PY collée. Pour un jeu : mécanique choisie dans `studio/minijeux/docs/MECANIQUES.md` (re-skin avant code neuf) + palier N1 (`_PALIERS-DIFFICULTE.md`).
- [ ] **Fichiers libres** — `node scripts/gc.mjs` ne signale aucun autre brief `pret|en_cours` sur `fichiers:` ; `git status --porcelain <fichiers>` vide.
- [ ] **Dépendances `fait`** — sortie de `gc.mjs` § handoffs collée.
- [ ] **Porte écrite AVANT les rédacteurs** (L-D-79) — nom du script qui validera le livrable + sa sortie sur l'existant aujourd'hui.
- [ ] **Exemples conformes sur le FOND** (L-D-84) — voir § 6 ; chaque exemple passe sa porte aujourd'hui (sortie collée).
- [ ] **Environnement** (seulement si `arrets_humains` le demande) — `go_credits` : solde ElevenLabs ≥ coût estimé (caractères comptés sur les `_seg-*.json`) ; `images` : Brave debug logué, quota non épuisé (`_PROGRESS.tsv`) ; toujours : `npx playwright --version`.
- [ ] **Le seul arrêt humain avant exécution est posé en TEXTE et répondu** (jamais AskUserQuestion).

## 3. Contexte à lire (≤ 5 chemins, tous existants — `check-liens-md` les vérifie)
- `…`

## 4. Fichiers autorisés
Recopie de `fichiers:` avec, par fichier, ce qu'on y fait. Tout autre fichier = hors périmètre, même « pour aider ».

## 5. Hors périmètre
Ce qu'on NE fait PAS, même si c'est tentant (git, memory/, figées, autres jeux/dinos).

## 6. Exemples conformes (chemin + porte, jamais un extrait)
| Chemin | Porte qui le valide | Fond |
|---|---|---|
| `studio/dino/content/scripts-audio/fr/V3/albertosaurus.md` | `node …/_verif-scripts-audio.cjs fr albertosaurus` | conforme |
| `site/mj-28.html` | `node studio/minijeux/tests/audit-gabarit.mjs mj-28` | forme-seule → citer AUSSI un exemple `conforme` |

## 7. Portes — Definition of Done (rien n'est « fait » sans ces sorties brutes)
- [ ] **Porte de contenu** — JEU : `audit-gabarit.mjs mj-XX` (strict) · DINO : `_verif-scripts-audio.cjs fr <id>` (étymo incluse) — sortie brute collée dans le rapport.
- [ ] **Porte de cohérence** — `check-mj-coherence.mjs mj-XX` = 0 manque · `check-dino-coherence.cjs <id>` = 0 manque (l'id sort de `_wip.json`).
- [ ] **Rendu prouvé** — `npm run test:mj mj-XX` (360×740 + 320×568, cibles ≥ 48 px, `.end-wrap`, une seule voix) · `node studio/minijeux/tests/dev-dinos.spec.mjs <id>` ; les 2 captures nommées ci-dessous, OUVERTES (Read) par le main — le rapport dit « ouvert » et gc vérifie qu'elles existent et sont plus récentes que le dernier html/json modifié.
- [ ] **`npm run gate` vert** (check + test) sur le HEAD à pousser → GREEN.json ; sinon `git push` est refusé si `site/**` est touché.
- [ ] **Mémoire gravée dans le tour** — TODO (lane fermée), MEMORY (session), LESSONS seulement si un bug a été trouvé et AVEC son marqueur `Porte :|Rule :|Hook :|Figée :|Archive :` (le hook refuse le reste), DECISIONS si arbitrage ; numéros pris en relisant le fichier.
- [ ] **Figée à jour** — jeu neuf : figée provisoire (marqueur arbitré PY) avec 0 🔒 non sourcé ; dino : aucune ligne 🔒 contredite (`check-figees`) ; toute règle nouvelle de PY → ligne 🔒 sourcée le jour même.
- [ ] **`git diff --stat` ⊆ `fichiers:`** — collé.
- [ ] **Commit par palier avec chemins explicites** (jamais `git add -A`) ; `verifie-deploiement.mjs` pour un asset lourd.

## 8. À graver après livraison
- TODO : `…` · DECISIONS : `D-… (si arbitrage)` · LESSONS : `L-… + marqueur` · Figée : `ligne 🔒 + source`.

## 9. Recette Papa Yann (P30 Pro, 360 px)
2 à 3 questions FERMÉES et mesurables, posées dans le dernier message :
1. « … ? » (ex. : le doigt trouve « Encore » seul à la 3e partie ? / tu entends « chair » et « taureau » dans le bloc A ?)
2. « … ? »
La lane TODO garde « recette PY : en attente » jusqu'au retour ; le retour amende spec + figée + un cas de spec DANS LE MÊME TOUR.

## 10. Rapport attendu (`docs/handoffs/rapports/HO-<POLE>-<NNN>.md`)
1. **Fichiers modifiés** — sortie de `git diff --stat` collée (vérifiable, jamais une liste tapée).
2. **Portes** — chaque commande du § 7 avec sa sortie brute (un « ✓ » sans ligne de sortie = rapport refusé par gc).
3. **Captures** — chemins, et « ouvert le <date> par <qui> ».
4. **Questions** — ce qui n'a pas pu être tranché (le main tranche, en texte).
5. **À graver** — L-/D- proposés avec marqueur.
```

Capture-type de la DoD pour un exécutant sous-agent : première ligne du brief = « pas de sous-agent, zéro git, un fichier de notes par exécutant » (L-D-76/73).
