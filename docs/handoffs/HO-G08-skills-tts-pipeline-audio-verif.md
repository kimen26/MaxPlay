# HO-G08 — Skills globaux `tts-pipeline` + `audio-verif`

**Statut :** pret
**Depend de :** —

## Objectif
Deux skills user-level, génériques (aucun chemin MaxPlay dedans), qui remplaceront à terme les 17 scripts d'appel ElevenLabs du repo : **un seul CLI de génération** piloté par des fichiers de configuration du projet, et **un outil de réécoute** (STT + diff + mesures) pour vérifier un MP3 produit.

## Contexte a lire d'abord (lecture seule, dans le repo MaxPlay)
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 point 9, § 5 plan C
- Les 17 points d'entrée actuels, pour en extraire le dénominateur commun (formats de segments, voice-map, tags, loudnorm, padding) :
  `studio/referentiel/_gen-*.mjs` (11), `studio/referentiel/_fix-phonemes-vides.mjs`, `studio/referentiel/_test-phonemes-graphies.mjs`, `studio/dino/content/scripts/audio/_gen-audio-v3.sh`, `_gen-audio-nouveaux.sh`, `_md2json-v3.cjs`, `studio/narration/scripts/generate-story-dialogue.js`, `infra/mcp/server.ts` (outils `studio_audiobook_from_segments_v2_dialogue`, `tts_elevenlabs`)
- Formats de segments : `studio/dino/content/scripts-audio/fr/V3/json/_seg-*.json`, `studio/narration/stories/*/assets/audio/*segments*.json`
- Config voix : `studio/narration/personnages/voix-meta/voice-map.json`, `_VOICE-IDS-CASTING.md`
- Lexique prononciation : `studio/dino/content/scripts-audio/_LEXIQUE-PRONONCIATION.md`, `studio/dino/content/i18n/lexiques-prononciation/`
- Règles : `.claude/rules/audio.md`, `.claude/rules/sons.md` (padding 250 ms, loudnorm), skills `~/.claude/skills/audio-direction-elevenlabs/` (tags v3, API), `~/.claude/skills/ecriture-audio-enfants/`
- Doc skills : `~/.claude/skills/claude-infra/references/checks-skills.md` (frontmatter, taille, structure)
- Clé API : variable d'environnement `ELEVENLABS_API_KEY` (ne jamais l'écrire dans un fichier ; si absente, tout tourne en `--dry-run`)

## Fichiers autorises
- `C:/Users/kimen/.claude/skills/tts-pipeline/**` (création)
- `C:/Users/kimen/.claude/skills/audio-verif/**` (création)
- Sorties de test uniquement dans `C:/tmp/tts-pipeline-test/`

## Hors perimetre
- Aucun fichier du repo MaxPlay n'est modifié (la migration des 17 scripts est un chantier ultérieur : tu produis dans le rapport la table script actuel → commande `tts-pipeline` équivalente). Aucune commande git. Aucun appel API réel au-delà du test de 40 caractères décrit plus bas.

## Travail
### `tts-pipeline`
1. `SKILL.md` (≤ 150 lignes, `disable-model-invocation: true` car effet de bord payant, description avec déclencheurs : générer audio, lancer ElevenLabs, produire MP3, segments, dialogue v3, batch TTS). Sections : quand l'utiliser · entrée (format de segments) · config projet attendue · commandes · portes.
2. `scripts/tts.mjs` (Node ≥ 18, zéro dépendance hors `node:` + `fetch`) :
   - entrée : un ou plusieurs fichiers de segments JSON. **Définir un format pivot** documenté dans `references/format-segments.md`, et accepter en entrée les deux formats existants du repo (dino `_seg-*.json`, narration `*segments*.json`) via un adaptateur (`--from dino|narration|pivot`).
   - `--voice-map <fichier>` (JSON `{alias: {voice_id, model, stability, similarity, style, speed}}`, format compatible avec `voice-map.json` du repo — le lire pour coller au format réel), `--lexique <fichier>` (remplacements de graphie avant envoi, format du `_LEXIQUE-PRONONCIATION.md` ou JSON simple), `--mode dialogue|mono` (text-to-dialogue v3 multi-voix vs text-to-speech), `--out <dir>`, `--loudnorm` (ffmpeg `loudnorm` I=-16 TP=-1.5 LRA=11, valeurs par défaut lues dans la config), `--pad-ms 250` (silence de tête), `--dry-run` (imprime le plan : nb d'appels, caractères, coût estimé, fichiers produits — n'appelle rien), `--only <id>`, `--force` (sinon skip si le MP3 existe et que l'empreinte du texte n'a pas changé — empreinte sha1 stockée en side-car `.json`).
   - endpoints/paramètres : reprendre exactement ceux qui marchent dans `infra/mcp/server.ts` et `generate-story-dialogue.js` (modèle, `apply_text_normalization`, découpage < 2 000 caractères par paquet dialogue).
   - sortie : MP3 + side-car `<id>.meta.json` (texte envoyé, voix, modèle, durée, empreinte, date).
3. `references/migration-maxplay.md` : table des 17 scripts → commande équivalente (à titre indicatif, pour le chantier suivant), et ce qui n'est PAS couvert (ex. `_test-phonemes-graphies` = expérimentation).
4. Test : `--dry-run` sur un vrai fichier dino et un vrai fichier narration (copiés dans `C:/tmp/tts-pipeline-test/`), puis — SEULEMENT si `ELEVENLABS_API_KEY` est présente dans l'environnement — une génération réelle d'UN segment mono de ≤ 40 caractères avec la voix `narrateur_f` du voice-map, pour prouver le chemin complet (MP3 + loudnorm + padding + meta). Si la clé n'est pas dans l'env : dry-run seulement, le dire.

### `audio-verif`
5. `SKILL.md` (≤ 100 lignes, auto-invocable, déclencheurs : réécouter, vérifier un MP3, contrôler l'audio, STT, diff script/audio, loudness, silence de tête).
6. `scripts/verif.mjs` : entrée = un MP3 (ou un dossier) + le texte attendu (fichier ou side-car `.meta.json` de `tts-pipeline`) ; produit un rapport markdown : durée réelle vs attendue (≈ caractères / 15 par seconde, seuil configurable), loudness intégrée (`ffmpeg -af ebur128`), silence de tête (ffmpeg `silencedetect`, attendu ≥ 200 ms), et **transcription** via l'API ElevenLabs speech-to-text (`/v1/speech-to-text`, modèle `scribe_v1` — vérifier le nom exact dans la doc `https://elevenlabs.io/docs/api-reference/speech-to-text/convert`) puis diff mot à mot normalisé (accents, ponctuation, tags `[...]` retirés) avec taux de similarité et liste des écarts. Sans clé API : tout sauf la transcription, le dire dans le rapport.
7. Test sur 2 MP3 réels du repo (ex. `site/audio/dinos/` un `-nom.mp3` court et un récit) avec leur texte source (`_seg-*.json`) : coller le rapport produit.

## Portes de verification
```bash
ls ~/.claude/skills/tts-pipeline/SKILL.md ~/.claude/skills/tts-pipeline/scripts/tts.mjs ~/.claude/skills/tts-pipeline/references/format-segments.md ~/.claude/skills/tts-pipeline/references/migration-maxplay.md
ls ~/.claude/skills/audio-verif/SKILL.md ~/.claude/skills/audio-verif/scripts/verif.mjs
grep -rn "MaxPlay\|studio/\|kimen" ~/.claude/skills/tts-pipeline ~/.claude/skills/audio-verif | grep -v migration-maxplay.md | wc -l   # 0
node ~/.claude/skills/tts-pipeline/scripts/tts.mjs --help
node ~/.claude/skills/tts-pipeline/scripts/tts.mjs --from dino --voice-map <voice-map> --dry-run <un _seg-*.json>    # plan imprimé, 0 appel
node ~/.claude/skills/audio-verif/scripts/verif.mjs <mp3> --text <texte>    # rapport
head -5 ~/.claude/skills/tts-pipeline/SKILL.md | grep -c "disable-model-invocation: true"   # 1
```

## Rapport attendu
Arborescence créée, format pivot en 10 lignes, sortie des dry-run + du test réel (ou raison de son absence), rapports audio-verif, table de migration des 17 scripts, questions ouvertes (ex. paramètres v3 incertains).
