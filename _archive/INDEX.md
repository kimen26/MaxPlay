# `_archive/` — Cadavres préservés

Ce dossier contient les fichiers retirés de la circulation active mais **conservés pour traçabilité**. Aucun agent ne lit ce dossier par défaut. Ne pas y dumper de matière neuve.

> **Date de création :** 2026-04-30 (refonte arborescence projet)

## Contenu

### `2026-07-19-skills-connaissance-ecc/` — Dossiers « connaissance » ex-`.claude/skills/`

7 dossiers hérités de l'époque ECC (avril 2026) : `00-project` (guidelines pré-refonte + persona cheikh-maxplay), `13-media`, `20-game-tech` (patterns Phaser), `audio`, `design`, `education` (pédagogie enfant), `ux`. **Jamais chargés** par Claude Code (SKILL.md imbriqués à 2 niveaux = non découverts) et contenu antérieur à la refonte CLAUDE.md 2026-05-13. Nettoyage input-context 2026-07-19. La pédagogie 4-5 ans active vit dans `studio/narration/personnages/theorie/pedagogie-enfance/`.

### `dino-orphans-2026-07-15/` — Orphelins dino (scan militaire)

| Fichier | Raison archivage |
|---------|------------------|
| `dinos-images-wikimedia.js` | Chargé par **0** HTML, 0 réf gouvernance (superseded par grok + local + paléoart). Vérifié orphelin lors du scan 2026-07-15. Images associées `site/img/dinos/wiki/` (50) restent en place — voir ticket poids staging. |

### `site-duel/` — Outil « Duel de goût » retiré (2026-07-13)

| Fichier | Raison archivage |
|---------|------------------|
| `duel.html` + `duel-data.js` | Décision Papa Yann 2026-07-13 : « duel on vire, c'est pas intéressant ». La lecture annotée par passages (lecture.html) le remplace comme instrument de goût. Source 'duel' conservée en base (données historiques + contrainte annotations). |

### `docs-jeux-cadavres/` — Anciens documents JEU obsolètes

| Fichier | Raison archivage |
|---------|------------------|
| `IMPROVEMENTS.md` | Log fixes MJ-01→14 — historique migré vers `tasks/BACKLOG.md` |
| `ITERATION_NOTES.md` | Journal dev MJ-07 Phaser sandbox — sprints 1-4 terminés, plus de suivi actif |
| `ASSETS_INVENTORY.md` | Métadonnées pack Modern Exteriors (40k PNG) — référence uniquement, jamais implémenté |
| `MENU-MAP-VILLEJUIF.md` | Spec menu hybride carte+grille — non implémenté, speculative design |

### `docs-meta-cadavres/` — Anciens documents META

| Fichier | Raison archivage |
|---------|------------------|
| `REFERENCES.md` | Hub liens externes — peu référencé, valeur secondaire |
| `PROJECT-TOUR.md` | Doc onboarding — rarement relue après première visite ; pourra être fusionnée dans `README.md` si besoin |
| `README-docs-old.md` | Ex-`docs/README.md` — carte de la documentation pré-refonte. Pointeurs obsolètes après l'éclatement de `docs/` en `game/docs/` + `narration/`. Conservé pour mémoire archi. |

### `narration-reference/` — Analyses inspiration ennéagramme

Ex-`docs/narration/reference/`. Contenu analysé mais jamais référencé activement dans le canon ou le workshop narratif.

| Fichier | Note |
|---------|------|
| `INDEX.md` | Index ancien |
| `analyse-personnages-manga-enneagramme.md` (26 ko) | Inspiration manga → ennéatypes |
| `analyse-personnages-pokemon-enneagramme.md` (32 ko) | Mapping Pokémon → ennéatypes |
| `analyse-pokemon-eux-memes-enneagramme.md` (31 ko) | Pokémon individuels → ennéatypes |
| `enneagramme-9-niveaux-riso-hudson.md` (44 ko) | Référence théorique Riso-Hudson |

À ressortir si une histoire future réutilise les compagnons-créatures façon Pokémon. Sinon laisser dormir.

**+ `baron.md`** (ex-`docs/narration/univers/baron.md`) : inspiration univers écartée le 2026-04-17 (figure de voyageur temporel mise de côté). Conservée si une histoire ravive la piste.

### `generate-story-audio.js.DEPRECATED` — Script AUDIO obsolète (2026-05-16)

| Fichier | Raison archivage |
|---------|------------------|
| `generate-story-audio.js.DEPRECATED` | **Anti-pattern banni** (DEC-AUDIO-001). Implémentait multi-TTS mono (32+ appels API + concat ffmpeg brut) au lieu du PROCESS MILITAIRE officiel (text-to-dialogue API 1 appel par paquet < 2000 car + ffmpeg loudnorm 1-3 fois). Surcoûts API + incohérence loudness. PROCESS officiel dans `.claude/rules/audio.md` + skill `~/.claude/skills/audio-direction-elevenlabs/`. Migration demander narration-pmo. |

### `temp-assets-2026-04/` — Sons bruts pré-production

Ex-`temp/` (partie sons). 26 fichiers audio (.mp3, .flac) + 1 script `gen-idfm.js` mort. ~2.8 Mo.

> **Note importante (MAJ 2026-07-19) :** Le pack pixel art LimeZu Modern Exteriors (347 Mo, payé) vit désormais dans **`c:\ProjetsPerso\Assets\LimeZu-Modern-Exteriors\`** (hors repo, déplacé depuis `temp/Design to sort/` lors du nettoyage GED). Le sous-ensemble utilisé par le jeu est extrait dans `studio/max-adventure/public/assets/` (76 Mo). `temp/Dino/` (jpg exploratoires mars 2026) supprimé le 2026-07-19 (0 référence).

### `narration-architecte-deprecated-2026-05-12.md` — Agent DEPRECATED

| Fichier | Raison archivage |
|---------|-----------------|
| `narration-architecte-deprecated-2026-05-12.md` | Rôle fusionné avec `narration-conseiller` (étape 1 Pitch+Plan). Matière statique (Kishōtenketsu + boussole 4-5 ans) intégrée à narration-conseiller.md. Archivé 2026-05-15 (audit archi Claude). |

### `dino-vires-2026-06-12/` — 8 dinos retirés du catalogue

Documenté en détail dans son `INDEX.md` local (8 dinos retirés un à un, raisons incluses). Entrée ajoutée ici le 2026-07-19 (audit nettoyage GED — le dossier existait sans note dans cet index).

### `grok-3-batch-source-png-2026-07-10/` — SUPPRIMÉ le 2026-07-19

15 PNG sources brutes (Allosaurus / Ceratosaurus / Gallimimus × 5 variantes) du batch Gallimimus corrompu (commit 56fdfbfb). Vérifié avant suppression : les finales converties (.jpg) sont toutes déployées dans `site/img/dinos/paleoart/`. Sources sans valeur restante (19 Mo) — supprimées (décision Papa Yann, audit nettoyage GED, récupérables via historique git).

### `skills-craft-deprecated-2026-06-08/` — Skills craft absorbés

Skills `storytelling-master`, `craft-fundamentals`, `youth-writing`, `enneagramme-system` absorbés par `~/.claude/skills/narration-craft/` (voir son SKILL.md § historique). Entrée ajoutée ici le 2026-07-19 (existait sans note).

### `kimi-hooks-2026-07-27/` — Sonde Stop Kimi remplacée

`stop-probe.kimi.ps1` (loguait le payload Stop brut de Kimi Code) remplacée par `.kimi-code/hooks/pmo-check.kimi.ps1` le 2026-07-19, puis débranchée de `~/.kimi-code/config.toml`. Archivée le 2026-07-27 (audit cartographie narration) ; son log `stop-payload.jsonl` (gitignoré) supprimé. Détail : [`kimi-hooks-2026-07-27/README.md`](kimi-hooks-2026-07-27/README.md).

### `2026-08-02-dino-new-xxl-staging/` — Staging `_new-xxl` dino (variantes XXL)

Ex-`site/img/dinos/_new-xxl/` (13 PNG + `_PROGRESS.tsv`), vidé lors du nettoyage GED post-audit fiches 2026-08-02. 11 variantes XXL de slots paleoart déjà pourvus (rechange HD) + 2 inédits `Giganotosaurus_meute_*` sans slot fiche. Détail : [`2026-08-02-dino-new-xxl-staging/INDEX.md`](2026-08-02-dino-new-xxl-staging/INDEX.md).

### `agents-2026-09-03/` — Agents et mémoires fusionnés/archivés (HO-G12)

Nettoyage `.claude/agents/` : mémoires officielles `memory: project`, fusion des pipelines multi-modes, archivage des agents à 0 usage confirmé (`grep -rl "<nom>" studio/*/memory/archive studio/*/memory/*.md studio/dino/pmo/`).

| Fichier | Raison archivage |
|---------|------------------|
| `narration-science.md` + `memoire-science.md` | 0 usage tracé dans les mémoires narration (archive comprise). Rôle non refondu — récupérable verbatim si un besoin de fact-check scientifique dédié se représente. |
| `narration-sensibilite.md` + `memoire-sensibilite.md` | 0 usage tracé dans les mémoires narration. Idem — récupérable verbatim. |
| `game-tile-simplifier.md`, `game-tile-designer.md`, `game-tile-reviewer.md` | Pipeline confirmé **vivant** (usages 1-3 dans `studio/minijeux/memory/`, cité dans `.claude/rules/tile-tools.md` et le skill `maxplay-tiles`) — **pas archivé pour disparition**, fusionné en `.claude/agents/game-tile.md` (3 modes ANALYSE/RECETTE/REVUE). Fichiers gardés ici verbatim pour comparaison/traçabilité de la fusion. |
| `narration-lecteur-original.md`, `narration-lecteur-dyade.md` | Pipeline confirmé vivant (usages 2+2 dans `studio/narration/memory/archive/`) — fusionné en `.claude/agents/narration-lecteur.md` (mode ENFANT + mode DYADE). Fichiers gardés verbatim pour traçabilité de la fusion. |

> **Non archivé malgré le doute initial du brief HO-G12** : `dino-fiche-writer` a un usage réel confirmé (créé et utilisé 2026-08-17, pilote EP-D-29, cité dans `studio/dino/pmo/backlog.md`) — gardé actif, frontmatter enrichi (`skills: ecriture-audio-enfants, audio-direction-elevenlabs`).

### `2026-09-05-max-adventure-tiles/` — Max Adventure (Phaser), pipeline tiles LimeZu, WexWorld côté JEU

Décision Papa Yann du 2026-09-05 : « ça ne marche pas du tout, on arrête ». Les trois sous-domaines JEU hors mini-jeux HTML sortent de MaxPlay, déplacés par `git mv` (historique conservé) :

| Ici | Venait de | Quoi |
|---|---|---|
| `studio-max-adventure/` | `studio/max-adventure/` | source Phaser TS + Vite + assets tiles extraits (`node_modules/` et `dist/` non versionnés, supprimés) |
| `site-max-adventure.html`, `site-mj-pose-tiles.html` | `site/` | splash du jeu Phaser et bac à sable « Pose tes tiles » (chargeait ses tuiles via CDN jsdelivr depuis `studio/max-adventure/`) |
| `tests-mj-pose-tiles.spec.mjs` | `studio/minijeux/tests/` | spec Playwright dédiée |
| `tools-tile-tools/`, `tools-web/`, `tools-pages-map-mockups.html` | `studio/minijeux/tools/` | pipeline Python LimeZu (render.py, recettes, PIPELINE-MEMORY.md) + pages web tile-only |
| `skill-maxplay-tiles/`, `skill-phaser-tech/` | `.claude/skills/` | skills tiles + Phaser |
| `agent-game-tile.md`, `rule-tile-tools.md` | `.claude/agents/`, `.claude/rules/` | agent 3 modes et rule path-scopée |
| `docs-VISION-LONG-TERME.md` | `studio/minijeux/docs/` | vision « Phase 2 WexWorld » côté JEU (abandonnée ; WexWorld reste le monde des Histoires) |

Restent en place volontairement : le pack LimeZu d'origine (`temp-assets-2026-04`, déjà archivé), la table Supabase `tile_refs` (migrations 009-012, données live, à supprimer dans une migration dédiée si un jour utile), les traces historiques (`docs/handoffs/`, `memory/audits/`, `studio/minijeux/memory/archive/`). Vocabulaire : `memory/GLOSSAIRE.md` § Abandonné.

## Règle d'or

Ne **rien** y ajouter sans une note dans ce fichier expliquant **quand**, **pourquoi**, et **comment retrouver** la matière. Un cadavre non documenté = un cadavre perdu.
