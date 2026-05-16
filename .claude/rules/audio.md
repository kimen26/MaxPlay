---
paths:
  - "narration/scripts/**"
  - "narration/personnages/voix-meta/**"
  - "narration/stories/**/assets/audio/**"
  - "**/*-segments*.json"
---

# Production audio ElevenLabs — règles auto-chargées

> Chargé automatiquement dès que Claude touche un script de production audio, voix-meta, ou un fichier de segments JSON.
> Source de vérité : 2 skills globaux user-level auto-triggered.

## Skills globaux (TOUJOURS lire en premier)

| Skill | Rôle | Auto-trigger |
|-------|------|--------------|
| [`~/.claude/skills/elevenlabs-voice-design/`](C:/Users/kimen/.claude/skills/elevenlabs-voice-design/) | **CRÉATION** voix | "ElevenLabs", "voice design", "TTS ElevenLabs", "signature vocale", "voice cloning" |
| [`~/.claude/skills/audio-direction-elevenlabs/`](C:/Users/kimen/.claude/skills/audio-direction-elevenlabs/) | **PRODUCTION** multi-voix | "audio direction", "audiobook", "multi-voix", "text-to-dialogue", "audio tags v3", "MP3 multi-personnages", "dialogue génération" |

Le skill `audio-direction-elevenlabs` est PARENT (router) + 8 sous-fichiers (API, tags v3, graphie, dicts, voice settings, méthodo, anti-patterns, multi-culture) + journal de découvertes.

## Source de vérité voix MaxPlay

[`narration/personnages/voix-meta/_VOICE-IDS-CASTING.md`](../../narration/personnages/voix-meta/_VOICE-IDS-CASTING.md) — **méthodo v24 figée 2026-05-11**.

Contenu :
- voice_ids par personnage (Wex, Melki, Mimi, Dadou, Madie, Lulu, Pierrot, Raph, Juju, Nono)
- Narrateurs H/F
- Voice settings recommandés (stability, similarity_boost, style)
- Pronunciation dicts personnalisés par perso
- Cheatsheet didascalies + preview-texts + alias-tags catalog

## VOIE PAR DÉFAUT : Outil MCP (IMPÉRATIF)

**Outil obligatoire** : `studio_audiobook_from_segments_v2_dialogue` (MCP ElevenLabs, clé dans ~/.claude.json).

**Fallback CLI UNIQUEMENT** : si outil MCP indisponible → `narration/scripts/generate-story-dialogue.js` (même méthodo).

**Resolver voix** : `narration/personnages/voix-meta/voice-map.json` (autoritaire, mappe `role` → voice_id). Toujours via role (ex: `wex`, `narrateur_h`, `raph`) sauf si voice_id périmé.

**Forbidden paths** :
- ❌ `studio_audiobook_from_segments` (Studio API Enterprise verrouillée)
- ❌ `tts_elevenlabs` (mono, anti-pattern)
- ❌ Script fallback main agent (réservé sub-agent ou CLI CLI)

---

## PROCESS MILITAIRE audio (DEC-AUDIO-PRODUCTION-001 v3, figée 2026-05-16, jamais régresser)

**Méthode OFFICIELLE** : MCP `studio_audiobook_from_segments_v2_dialogue` (wrapper text-to-dialogue API multi-voix natif) + 3 durcissements gravés 2026-05-16 14:00.

**3 Durcissements FIGÉS (2026-05-16, jamais régresser sans décision datée explicite)** :
- **#1 MCP voie par défaut obligatoire** : `studio_audiobook_from_segments_v2_dialogue` (clé ~/.claude.json env). Fallback CLI = `generate-story-dialogue.js` debug seulement.
- **#2 Model `eleven_v3` forcé** : seul modèle tags v3 inline. Pas d'autre modèle, jamais inventer.
- **#3 Voice-map.json lookup** : résolveur centralisé `role` → voice_id (source autorité = `_VOICE-IDS-CASTING.md`).

### Règles MILITAIRES production audio (ENFORCED)

0. **Outil MCP par défaut (durcissement #1)** : `studio_audiobook_from_segments_v2_dialogue` (clé ~/.claude.json). Fallback = script `narration/scripts/generate-story-dialogue.js` debug seulement. Ne PAS inventer d'autres outils/APIs.
1. **Modèle eleven_v3 OBLIGATOIRE (durcissement #2)** : seul modèle supportant tags v3 inline. Jamais `eleven_multilingual_v2` ou autres (ils ignorent/cassent les tags).
2. **Resolver voix via voice-map.json (durcissement #3)** : lookup centralisé `role` → voice_id autoritative (source = `_VOICE-IDS-CASTING.md`). Jamais hardcoder voice_ids périmés.
3. **text-to-dialogue API OBLIGATOIRE** pour multi-voix (pas text-to-speech mono 32+ appels).
4. **Packetisation canon < 2000 char/appel** : split texte canon → 2-3 paquets max → 1 appel text-to-dialogue/paquet → 1 MP3/paquet.
5. **Voice settings** : ne pas inventer — utiliser les valeurs gravées dans `_VOICE-IDS-CASTING.md`.
6. **Tags audio v3** : utiliser le catalogue gravé dans `audio-direction-elevenlabs/`. Pas d'invention.
7. **Pronunciation dicts** : un dict par perso, gravé. Modifier = MAJ `_VOICE-IDS-CASTING.md`.
8. **Loudness normalization** : ffmpeg `loudnorm` obligatoire EN POST-PROD (concat 1-3 paquets seulement, pas 32+).
9. **Format segments** : JSON figé. Voir [`narration/stories/001-le-pont-casse/assets/audio/_segments-001-v2-kimi.json`](../../narration/stories/001-le-pont-casse/assets/audio/) pour exemple.

### Anti-patterns bannis (depuis 2026-05-16)

- ❌ **32+ appels text-to-speech mono** (ancien script obsolète → `_archive/generate-story-audio.js.DEPRECATED`)
- ❌ **Concat ffmpeg brut sans loudnorm** (provoque incohérence volume inter-segments)
- ❌ **Inventer des voice settings** (toujours copier depuis `_VOICE-IDS-CASTING.md`)
- ❌ **Tags v3 maison** (catalogue exhaustif dans skill `audio-direction-elevenlabs/`)
- ❌ **Packets > 2000 char/appel text-to-dialogue** (plafonner à 1 appel = 1 paquet < 2000c)

## Pipeline production (procédure détaillée en skill global)

Voir **skill global** `~/.claude/skills/audio-direction-elevenlabs/` § *Méthodologie production*.

**Résumé étapes** :
1. Segmenter canon en paquets < 2000 char (garder intégrité phrase/dialogue)
2. 1 appel `POST /v1/text-to-dialogue` par paquet + voice_ids + settings gravés
3. Récupérer 2-3 MP3
4. Concaténer + `ffmpeg -af loudnorm` (1 pass seulement)
5. Export MP3 final

**Ancien script (obsolète)** : `_archive/generate-story-audio.js.DEPRECATED` (anti-pattern 32+ TTS mono, ne pas réutiliser).

## 20+ anti-patterns documentés (skill `audio-direction-elevenlabs/`)

Voir détail complet dans le skill global. **Résumé par catégorie** :

### Voix & settings
1. ❌ Voice ID copié d'un autre projet sans test
2. ❌ Voice settings standard sur tous les persos (chaque perso = settings gravés)
3. ❌ Inventer des voice_ids (toujours chercher dans `_VOICE-IDS-CASTING.md`)
4. ❌ Modifier settings sans mettre à jour `_VOICE-IDS-CASTING.md`

### Tags & didascalies
5. ❌ Tags v3 inventés (utiliser catalogue skill global exhaustif)
6. ❌ Didascalies non listées dans cheatsheet voice-meta
7. ❌ Production sans preview-text d'abord (valider son avant full-prod)

### Phonétique
8. ❌ Pas de pronunciation dict pour les prénoms spécifiques
9. ❌ Onomatopée écrite en FR sur perso d'une autre culture

### Architecture
10. ❌ **32+ appels text-to-speech mono** (ANTI-PATTERN PRINCIPAL — voir DEC-AUDIO-001)
11. ❌ Loudness non normalisé (volume incohérent entre segments) — **ffmpeg loudnorm OBLIGATOIRE**
12. ❌ Packets > 2000 char/appel (plafonner)
13. ❌ Concat ffmpeg brut sans loudnorm

## Multi-culture (12 cultures préparées)

Le skill `audio-direction-elevenlabs/` couvre la production multi-culturelle :
- Accents personnalisés par culture
- Pronunciation dicts adaptés
- Voice IDs par culture
- Tags v3 et didascalies adaptés

## Cross-références

- Session retour exp : [`personnages/voix-meta/_SESSION-2026-05-11-RETOUR-EXP.md`](../../narration/personnages/voix-meta/_SESSION-2026-05-11-RETOUR-EXP.md)
- Étude vocale 18 prompts : [`personnages/voix-meta/`](../../narration/personnages/voix-meta/)
- Playbook MaxPlay : [`personnages/voix-meta/`](../../narration/personnages/voix-meta/)

---

_Refonte 2026-05-13 : règles audio extraites pour auto-chargement path-scoped. Détail complet dans skills globaux user-level._
