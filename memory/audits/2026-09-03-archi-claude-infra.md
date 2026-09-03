# Audit archi Claude Infra — MaxPlay — 2026-09-03

> Audit transverse (skill `claude-infra`, module audit-archi + nettoyage). Lecture seule : rien n'a été modifié.
> Doc Anthropic rafraîchie ce jour (memory, skills, sub-agents, hooks, context-window). Étiquetage : `[OFFICIEL ✓]` = doc Anthropic · `💡 IDÉE` = pattern maison.

## 1. Ce que dit la doc aujourd'hui (repères qui comptent pour MaxPlay)

| Mécanisme | Charge quand | Survit `/compact` | Source |
|---|---|---|---|
| CLAUDE.md racine + `~/.claude/CLAUDE.md` | session start, entier (cible < 200 lignes) | ✅ | [OFFICIEL ✓ memory] |
| CLAUDE.md de sous-dossier | quand Claude lit un fichier dessous | ❌ (recharge au contact) | [OFFICIEL ✓ memory] |
| `.claude/rules/*.md` **avec** `paths:` | au match d'un fichier lu | recharge si le fichier re-lu | [OFFICIEL ✓ memory] |
| `.claude/rules/*.md` **sans** `paths:` (dont `~/.claude/rules/`) | session start, toujours | ✅ | [OFFICIEL ✓ memory] |
| Auto-memory `MEMORY.md` | 200 premières lignes / 25 KB | ✅ | [OFFICIEL ✓ memory] |
| Descriptions de skills | session start | ❌ **pas re-injectées** après compact | [OFFICIEL ✓ context-window] |
| Corps d'un skill invoqué | à l'invocation, reste en contexte | ✅ 5 000 tokens/skill, 25 000 au total | [OFFICIEL ✓ skills] |
| Skill `disable-model-invocation: true` | jamais avant `/nom` | — | coût 0 [OFFICIEL ✓ skills] |
| Skill `paths:` | comme une rule path-scopée | — | [OFFICIEL ✓ skills] |
| Descriptions d'agents | session start, budget combiné 15 000 tokens | — | [OFFICIEL ✓ sub-agents] |
| Agent `memory: project` | auto-memory propre à l'agent dans `.claude/agent-memory/<nom>/` | — | [OFFICIEL ✓ sub-agents] |
| Commentaires HTML dans CLAUDE.md | strippés = 0 token | — | [OFFICIEL ✓ memory] |
| `@AGENTS.md` import | Claude ne lit PAS AGENTS.md ; l'importer depuis CLAUDE.md | — | [OFFICIEL ✓ memory] |
| Hook `InstructionsLoaded` | log de ce qui se charge vraiment et pourquoi | — | [OFFICIEL ✓ hooks] |
| `/doctor` | propose des coupes dans un CLAUDE.md | — | [OFFICIEL ✓ memory] |

Quatre distinctions à garder en tête : INDEX ≠ CLAUDE.md (navigation humaine vs règles auto) · skill ≠ rule (invocable on-demand vs imposé) · CLAUDE.md ≠ hook (advisory vs enforced) · auto-memory ≠ CLAUDE.md (Claude écrit vs toi tu imposes ; la doc dit explicitement que l'auto-memory doit **sauter** ce que CLAUDE.md dit déjà).

## 2. Inventaire

| Zone | Constat |
|---|---|
| CLAUDE.md | 7 fichiers, 672 lignes (racine 107 · narration 169 · minijeux 123 · dino 93 · lunii 82 · bot 65 · max-adventure 33) |
| INDEX.md | 35 fichiers, 2 253 lignes (22 côté narration) |
| Rules projet | 10 fichiers, 940 lignes, toutes path-scopées |
| Rules user | 2 fichiers (74 lignes), sans `paths:` = chargées toujours |
| Agents projet | 26 (+4 user). Descriptions ≈ 9 300 caractères, sous le plafond |
| Skills | 10 projet + 12 user + 11 plugins. Aucun `disable-model-invocation`, aucun `paths:` |
| Hooks | 4 scripts + 3 inline (SessionStart bot, tsc, commit INBOX) |
| Auto-memory | 61 fichiers, 2 578 lignes ; `MEMORY.md` 148 lignes (proche du plafond 200) |
| Mémoire projet | 4 couches : `memory/` racine (8 fichiers) · `studio/<pôle>/pmo/` (5 fichiers × 3) · `studio/<pôle>/memory/` · handoffs dino |
| Fichiers PMO | 13 216 lignes au total ; narration `decisions.md` 3 706 lignes (240 KB), minijeux `backlog.md` 2 494 lignes (279 KB) |
| Liens markdown | 1 674 liens, **187 cassés** dans 74 fichiers |
| `settings.json` | 190 entrées `allow`, dont des commandes jetables et `Edit(~/.claude/skills/cheikh/**)` (skill supprimé) |
| site/ (prod) | 683 MB, 5 543 fichiers · 52 HTML dont 37 mini-jeux · `tile-tools/` 2 406 fichiers / 37 MB déployés sans lien depuis aucune page |
| Entrées ElevenLabs | 17 scripts qui appellent l'API, dans 4 dossiers (referentiel ×11, dino ×2, narration ×3, mcp ×1) |
| i18n | 3 systèmes parallèles : `site/js/lang.js` (12 langues déclarées, 3 bundles réels) · `studio/dino/content/i18n/` (51 fichiers, handoffs en cours) · `studio/narration/cross-culture/` (8 cultures, seul `fr/` peuplé) |

## 3. Diagnostic

### 🔴 CRITIQUE (casse silencieuse ou info fausse active)

1. **BOM UTF-8 en tête de 3 fichiers d'instructions** : `.claude/rules/audio.md`, `.claude/rules/personnages.md`, `studio/narration/CLAUDE.md`. Un BOM avant `---` peut empêcher le parse du frontmatter `paths:`. Conséquence possible : `audio.md` (133 lignes) chargé à **chaque** session au lieu d'au match, ou jamais. À vérifier factuellement avec un hook `InstructionsLoaded` [OFFICIEL ✓], puis corriger l'encodage.
2. **Plugin `telegram@claude-plugins-official` toujours activé** dans `~/.claude/settings.json`. Mémoire `reference_telegram_plugin_conflit_409` : même token que le bot maison → 409 getUpdates → bot tué. Soit la mémoire est fausse, soit le plugin doit être désactivé.
3. **`memory/skills-map.md` raconte une config qui n'existe plus** : skills ECC (`tdd-workflow`, `storytelling-master`…), commandes `/plan`, `/tdd`, `/checkpoint` (dossier `~/.claude/commands/` vide), agents user `planner`, `architect`… Le CLAUDE.md racine le présente comme « Agents, skills, commandes ». Knowledge rot actif.
4. **`memory/MEMORY.md` (projet) et `memory/workflow.md` périmés** : « 21 jeux », « source de vérité = `tasks/BACKLOG.md` » (stub depuis 2026-05-13), état narration d'avril. Le CLAUDE.md racine les présente comme « mémoire projet dense » et « workflow session ».

### 🟠 HAUTE (friction structurelle)

5. **Quatre couches de mémoire, deux conventions concurrentes.** La convention machine (`~/.claude/rules/memoire-projet.md`, skill `nouveau-projet` du 2026-09-03) impose un quintette `memory/` (MEMORY · TODO · DECISIONS · LESSONS · CHANGELOG, compteurs D-NNN/L-NNN). MaxPlay utilise `pmo/` (INVARIANTS · decisions · sprint-log · backlog · audit-trail) + `memory/` de pôle (state, rules, stack) + `memory/` racine + auto-memory. Un agent ou une session neuve doit deviner. Les leçons L-xxx vivent dans `backlog.md` au milieu des tickets ; les CHANGELOG n'existent pas.
6. **Fichiers PMO ingérables.** `narration/pmo/decisions.md` 3 706 lignes, `minijeux/pmo/backlog.md` 2 494 lignes, sprint-logs de 900 à 1 500 lignes. Les CLAUDE.md de pôle disent « lecture obligatoire avant toute modif : sprint-log ». Une lecture = 30 à 80 k tokens. La rotation semestrielle existe (narration, DOCTRINE) mais n'est appliquée nulle part ailleurs, et le backlog mélange ouvert / fermé / leçons.
7. **Règles UX mini-jeux copiées en 4 endroits** : `rules/mini-jeux.md` (235 lignes), `studio/minijeux/memory/rules.md`, `docs/STANDARD-MJ.md` (contrat MJ v2 recopié intégralement dans la rule), `studio/minijeux/CLAUDE.md`. Même chose côté narration : PROCESS 11 étapes dans `CLAUDE.md` + `rules/stories-process.md` + `equipe/PROCESS.md` (418 lignes). Une dérive = trois versions.
8. **187 liens cassés**, dont dans la config active : `.claude/skills/maxplay-tiles/SKILL.md` (16, chemins `game/web/…` d'avant la réorg), `rules/tile-tools.md` (3), `rules/lunii.md` (2), `skills/narration-craft` (4), `studio/minijeux/CLAUDE.md` et `INDEX.md` qui pointent `~/.claude/skills/maxplay-tiles/` alors que le skill vit dans `.claude/skills/`. `site/PIPELINE-MEMORY-MJ.md` pointe des agents supprimés (`game-mj-pmo`, `game-tile-pmo`).
9. **Pipeline audio éclaté** : 17 scripts d'appel ElevenLabs dans 4 dossiers, chacun avec sa lecture du voice-map, ses tags, son loudnorm. `studio/referentiel/` annoncé « lecture seule » par le CLAUDE.md racine héberge 11 scripts `_gen-*.mjs` qui génèrent. Aucun outil de **réécoute** (le MCP `elevenlabs` expose pourtant `speech_to_text`).
10. **Agents jamais tracés** : 8 agents avec zéro mention dans tous les sprint-logs (dino-fiche-writer, les 3 tile, narration-lecteur, -lecteur-dyade, -science, -sensibilite) ; 6 autres à une ou deux mentions. Leurs descriptions coûtent à chaque session. Les « mémoires » d'agents narration (`equipe/memoire-*.md`, 482 lignes) sont un pattern maison qui a désormais un équivalent officiel (`memory: project`).
11. **INBOX morte** : `studio/narration/INBOX.md` 305 lignes, 13 sections d'avril-mai 2026, 5 jamais distillées. Règle « 48 h » violée depuis 4 mois = règle sans porte de vérification, donc pas une règle (principe du skill `nouveau-projet`).
12. **Auto-memory qui duplique CLAUDE.md** : règle bus SVG, AskUserQuestion, figées, commit+push, Tritri… présents dans les deux. 10 fichiers topic pointent des chemins morts (`game/docs`, `tasks/BACKLOG`). `MEMORY.md` à 148 lignes sur 200 : le prochain ajout dépasse.

### 🟡 MOYENNE

13. **Prod embarque de l'outillage** : `site/tile-tools/` (37 MB, 2 406 fichiers, aucune page ne le lie), `site/tools/`, `design-*/` (54 fichiers), pages `dev-fx`, `dev-sounds-ui`, `design-mockups`, `map-mockups`, `index-v2-archive`, `atelier-couleurs`. `site/img/dinos/wiki/` (20 MB) orphelin identifié dès le 2026-07-15, toujours là. Le workflow copie `site/*` sans filtre.
14. **Scripts mal rangés** : `studio/minijeux/tests/` contient `batch-avatars-*.mjs`, `batch-decor-gpt.mjs`, `test-dinos*.mjs` (génération d'images, pas des tests). `studio/temp/` (non versionné) contient `_inventaire-voix.mjs`, `_couts.mjs` qui ressemblent à de vrais outils. Pilotage navigateur (Brave CDP / Playwright) dupliqué dans `tests/`, `.claude/skills/dino-images-lunii/scripts/`, `dino-paleoart`.
15. **Rules trop bavardes** : `audio.md` recopie « 20+ anti-patterns » du skill ; `mini-jeux.md` 235 lignes. Le bon modèle existe déjà dans le repo : `rules/narration-craft.md` (23 lignes, pointeurs + rappels). Une rule path-scopée se recharge à chaque fichier touché : chaque ligne est payée plusieurs fois par session.
16. **`settings.json` : 190 entrées `allow`** dont ~60 commandes jetables d'une session (grep sur transcripts, sed sur un fichier précis, Start-Process bot ×6). Plus `Edit(~/.claude/skills/cheikh/**)` (skill supprimé).
17. **Miroir Kimi** (5 `AGENTS.md`, hook `sync-agents-md.py`, `.kimi-code/hooks`, skill `env-compat-check` 213 lignes) : à garder seulement si Kimi Code est encore utilisé. La doc officielle propose l'inverse (`@AGENTS.md` importé par CLAUDE.md), pas un miroir régénéré.
18. **Hook `figees-injector.ps1`** cite `game-mj-pmo` (agent supprimé le 2026-07-19) dans son message. Aucun hook ne bloque `git add -A` alors que trois documents l'interdisent (feedback mémoire, handoffs README, `nouveau-projet`).
19. **Catalogues d'équipe en 4 exemplaires** : `studio/minijeux/EQUIPE.md` (181), `studio/narration/equipe/ORGANIGRAMME.md` (150), `.claude/agents/README.md` (43), `memory/skills-map.md`. La source de vérité est le frontmatter des agents ; tout le reste dérive.

### 🟢 OK (à garder tel quel)

- CLAUDE.md racine à 107 lignes, table de routage claire, tableau des signaux en commentaire HTML (0 token) [OFFICIEL ✓].
- Modèle « 1 plateforme · N domaines » + rules path-scopées pour le code dino déployé dans `site/` : conforme et élégant.
- Hooks `pmo-check` (Stop) et `signal-detector` (UserPromptSubmit) : de vraies portes déterministes.
- Harnais Playwright `studio/minijeux/tests/` : 36 specs pour 37 jeux, `audit-gabarit.mjs`, `compat.mjs`.
- Usine handoffs dino (2026-09-03) : conforme au protocole `nouveau-projet`.
- Convention archive + norme audits (DOCTRINE) : bonnes, il manque juste leur application.

## 4. Architecture cible

Principe : **chaque savoir a UN seul endroit, choisi par la question « qui doit le charger, et quand ? »**

```
~/.claude/                          ← MACHINE (tous projets)
├── CLAUDE.md + rules/ (2)          ← inchangés
├── skills/                         ← savoir-faire GÉNÉRIQUE (réutilisable hors MaxPlay)
│   ├── ecriture-audio-enfants, audio-direction-elevenlabs, elevenlabs-voice-design  (existants)
│   ├── narration-craft, game-design-enfant             ← MIGRÉS depuis .claude/skills (craft pur, 0 chemin MaxPlay)
│   ├── tts-pipeline        ← NOUVEAU : segments JSON → MP3 (dialogue v3 ou mono) + loudnorm + padding, piloté par un voice-map.json du projet
│   ├── audio-verif         ← NOUVEAU : « réécouter » = speech_to_text du MP3, diff avec le script, durée, loudness
│   ├── i18n-contenu        ← NOUVEAU : charte traduction, relecture native croisée, génération bundles, échelle à recalculer par langue
│   └── browser-pilot       ← NOUVEAU : Brave CDP / Playwright (Grokipedia 403, ChatGPT/Grok images) — un seul lanceur
│
MaxPlay/                            ← PROJET
├── CLAUDE.md (< 100 l.)            ← routage + invariants transverses numérotés + table des portes de vérification
├── memory/                         ← quintette TRANSVERSE : MEMORY (état) · TODO (lanes) · DECISIONS (absorbe DOCTRINE) · LESSONS · CHANGELOG
│   ├── MAX_PROFILE.md · VISION.md  ← socle stable, hors quintette
│   └── audits/                     ← inchangé
├── .claude/
│   ├── rules/ (10, chacune < 60 l.)← règles DURES + pointeurs, jamais de procédure recopiée
│   ├── skills/                     ← SPÉCIFIQUE MaxPlay : maxplay-tiles, nouveau-dino, dino-paleoart, dino-images-lunii, lunii-*, phaser-tech
│   ├── agents/ (≈ 16)              ← ceux qui servent ; `memory: project` pour pmo/conseillers (remplace equipe/memoire-*.md)
│   └── hooks/                      ← + garde-git-add-A · + link-check sur .md · InstructionsLoaded (temporaire, diagnostic)
├── studio/<pôle>/
│   ├── CLAUDE.md (< 80 l.)         ← principes non négociables + « où vit quoi » + pointeurs
│   ├── INDEX.md                    ← navigation humaine (inchangé dans l'esprit)
│   ├── memory/                     ← quintette DE PÔLE (remplace pmo/ + memory/) :
│   │   MEMORY.md (ex state + sprint-log courant) · TODO.md (ex backlog, tickets OUVERTS seulement) ·
│   │   DECISIONS.md (ex decisions + figées 🔒) · LESSONS.md (L-xxx extraites du backlog) · CHANGELOG.md (nouveau) ·
│   │   INVARIANTS.md (reste : normatif, chiffres) · archive/ (semestres, tickets fermés, audit-trail)
│   ├── docs/handoffs/              ← usine quand il y a du parallèle (dino déjà en place)
│   └── content/ · scripts/         ← scripts de GÉNÉRATION ici, jamais dans tests/ ni referentiel/
├── studio/referentiel/             ← CONSTATER seulement (scan, registre, couverture) ; les `_gen-*` partent dans studio/<pôle>/scripts + skill tts-pipeline
└── site/                           ← PROD : plus de tile-tools/, tools/, design-*, dev-*.html (déplacés dans studio/ ou exclus par le workflow)
```

Mémoire par grande zone ou globale ? **Les deux, mais un seul format.** Le transverse (doctrine, vision, profil, leçons d'infra) reste à la racine ; chaque pôle vivant (minijeux, dino, narration) garde sa mémoire parce que ses sessions sont disjointes et que `pmo-check` le vérifie par chemin. Lunii reste sans mémoire (choix déjà gravé). Max Adventure reste membre du pôle jeu. Ce qui change : le **nom des fichiers et leur rôle** deviennent identiques partout, et le hook `pmo-check` cible `memory/` au lieu de `pmo/`.

## 5. Plans d'action

### Plan A — Hygiène immédiate (1 session, réversible commit par commit)

1. Retirer le BOM des 3 fichiers ; poser un hook `InstructionsLoaded` temporaire pour prouver quelles rules se chargent ; corriger.
2. Désactiver `telegram@claude-plugins-official` (ou corriger la mémoire si elle est fausse).
3. Supprimer `memory/skills-map.md`, `memory/workflow.md`, `studio/minijeux/tasks/BACKLOG.md` ; réécrire `memory/MEMORY.md` racine en 40 lignes d'état vrai.
4. Corriger les liens cassés de la config active (skills, rules, CLAUDE.md, `site/PIPELINE-MEMORY-MJ.md`) et le message de `figees-injector.ps1`.
5. Purger `settings.json` (garder ~40 allow génériques).
6. Auto-memory : dédoublonner contre CLAUDE.md, corriger les 10 chemins morts, ramener `MEMORY.md` sous 100 lignes.

### Plan B — Mémoire convergente (2 à 3 sessions)

1. Écrire la table de correspondance pmo/ → quintette (une fois, dans `memory/DECISIONS.md`, D-NNN).
2. Pôle par pôle : rotation des logs > 500 lignes vers `archive/AAAA-H1`, extraction des L-xxx vers `LESSONS.md`, tickets fermés hors de `TODO.md`, création `CHANGELOG.md` en vidant les lanes livrées.
3. Adapter `pmo-check.ps1` et `signal-detector.ps1` aux nouveaux chemins ; ajouter un check d'unicité D-NNN/L-NNN (script, pas promesse).
4. INBOX : distiller ou archiver les 5 sections restantes ; remplacer la règle « 48 h » par un check daté dans le Stop hook (ou supprimer la règle).
5. Dédoublonner les règles UX (une source : `STANDARD-MJ.md` ; la rule pointe) et le PROCESS narration (une source : `equipe/PROCESS.md`).

### Plan C — Skills globaux « chaîne de contenu » (3 à 4 sessions, le plus rentable)

1. `tts-pipeline` : un seul CLI générique (segments JSON + voice-map + options) qui remplace les 17 points d'entrée ; les scripts de pôle deviennent des fichiers de configuration/lots.
2. `audio-verif` : STT du MP3 produit, diff avec le script, durée attendue, loudness, silence de tête 250 ms — le « réécouter » demandé.
3. `i18n-contenu` : généraliser la charte dino (`_CHARTE-TRADUCTION.md`, lexiques prononciation, échelle recalculée) en skill, avec les handoffs comme mode d'exécution.
4. `browser-pilot` : un lanceur Brave CDP unique, utilisé par les skills images et par le contournement 403.
5. Migrer `narration-craft` et `game-design-enfant` en user-level ; pousser le tout sur `claude_conf`.
6. Poser `disable-model-invocation: true` sur les skills à effet de bord (lunii-sync, dino-paleoart, dino-images-lunii, tts-pipeline) : coût 0 tant qu'on ne les appelle pas.

### Plan D — Prod propre (1 à 2 sessions)

1. Sortir `tile-tools/`, `tools/`, `design-*/`, `dev-*.html`, `index-v2-archive.html` de `site/` (vers `studio/minijeux/tools/`) ou les exclure dans `deploy.yml`.
2. Trancher `img/dinos/{wiki,grok,sprites}` : utilisé par une page ou supprimé.
3. Déplacer les scripts de génération hors de `tests/` ; versionner ou jeter `studio/temp/`.
4. Scinder `studio/referentiel/` : constater reste, générer part.

### Plan E — Agents et Kimi (une décision, puis 1 session)

1. Décider si Kimi Code reste : sinon supprimer AGENTS.md ×5, `sync-agents-md.py`, `.kimi-code/`, `env-compat-check`.
2. Agents : archiver les 8 jamais tracés (récupérables git) ou les fusionner (les 3 tile → 1 agent avec 3 modes ; lecteur + dyade → 1) ; passer `narration-conseiller`, `game-conseiller`, `dino-conseiller` et les 3 pmo en `memory: project` ; supprimer `equipe/memoire-*.md` une fois migrés.
3. Un seul catalogue d'équipe : `.claude/agents/README.md` généré depuis les frontmatters (script), suppression d'EQUIPE.md / ORGANIGRAMME dupliqués.

## 6. Auto-challenge

| Risque | Réponse |
|---|---|
| Renommer pmo/ casse les hooks et les agents | Plan B étape 3 avant toute migration ; grep des chemins dans agents/rules/hooks ; commit par pôle |
| Perte de matière en rotation | Archive verbatim + INDEX daté (convention DOCTRINE) ; rien n'est supprimé |
| Skills globaux trop MaxPlay | Règle du skill `nouveau-projet` : un skill est global s'il n'embarque aucun chemin projet ; la config (voice-map, lexiques) reste dans le repo |
| Le BOM n'était pas un bug | Le hook `InstructionsLoaded` tranche en une session ; la correction d'encodage est sans risque |
| Trop de plans en parallèle | A puis B sont indépendants des autres ; C est le plus rentable en tokens et en temps humain ; D et E peuvent attendre |

_Audit exécuté le 2026-09-03. Doc Anthropic fetchée 5/5. Aucune écriture hors ce rapport._
