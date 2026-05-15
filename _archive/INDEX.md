# `_archive/` — Cadavres préservés

Ce dossier contient les fichiers retirés de la circulation active mais **conservés pour traçabilité**. Aucun agent ne lit ce dossier par défaut. Ne pas y dumper de matière neuve.

> **Date de création :** 2026-04-30 (refonte arborescence projet)

## Contenu

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

> **Note importante :** Le pack pixel art `Design to sort/` (347 Mo, Modern Exteriors 16x16) et `Dino/` qui étaient dans l'ancien `temp/` ont été **laissés hors du repo** (toujours dans `temp/` racine, ignoré par `.gitignore`) pour ne pas gonfler le repo. Ils restent accessibles localement à l'utilisateur. Si un jour ces packs deviennent utiles, les déplacer vers `game/phaser/public/assets/` au moment de l'usage.

### `narration-architecte-deprecated-2026-05-12.md` — Agent DEPRECATED

| Fichier | Raison archivage |
|---------|-----------------|
| `narration-architecte-deprecated-2026-05-12.md` | Rôle fusionné avec `narration-conseiller` (étape 1 Pitch+Plan). Matière statique (Kishōtenketsu + boussole 4-5 ans) intégrée à narration-conseiller.md. Archivé 2026-05-15 (audit archi Claude). |

## Règle d'or

Ne **rien** y ajouter sans une note dans ce fichier expliquant **quand**, **pourquoi**, et **comment retrouver** la matière. Un cadavre non documenté = un cadavre perdu.
