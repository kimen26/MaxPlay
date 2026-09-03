---
paths:
  - "studio/narration/scripts/**"
  - "studio/narration/personnages/voix-meta/**"
  - "studio/narration/stories/**/assets/audio/**"
  - "**/*-segments*.json"
---

# Production audio ElevenLabs — règles auto-chargées

> Chargé automatiquement dès que Claude touche un script de production audio, voix-meta, ou un fichier de segments JSON.

## Skills globaux (TOUJOURS lire en premier)

| Skill | Rôle | Auto-trigger |
|-------|------|--------------|
| [`~/.claude/skills/elevenlabs-voice-design/`](C:/Users/kimen/.claude/skills/elevenlabs-voice-design/) | **CRÉATION** voix | "ElevenLabs", "voice design", "signature vocale" |
| [`~/.claude/skills/audio-direction-elevenlabs/`](C:/Users/kimen/.claude/skills/audio-direction-elevenlabs/) | **PRODUCTION** multi-voix (méthodo, tags v3, anti-patterns, multi-culture) | "audiobook", "multi-voix", "text-to-dialogue" |
| [`~/.claude/skills/tts-pipeline/`](C:/Users/kimen/.claude/skills/tts-pipeline/) | Pipeline TTS générique | "pipeline audio", "génération TTS" |
| [`~/.claude/skills/audio-verif/`](C:/Users/kimen/.claude/skills/audio-verif/) | Vérifier un MP3 produit (durée, loudness, STT diff) | "vérifier l'audio", "réécouter" |

Source de vérité voix MaxPlay : [`studio/narration/personnages/voix-meta/_VOICE-IDS-CASTING.md`](../../studio/narration/personnages/voix-meta/_VOICE-IDS-CASTING.md) (méthodo v24 figée 2026-05-11).

## VOIE PAR DÉFAUT : Outil MCP (IMPÉRATIF)

**Outil obligatoire** : `studio_audiobook_from_segments_v2_dialogue` (MCP ElevenLabs).
**Fallback CLI UNIQUEMENT** : `studio/narration/scripts/generate-story-dialogue.js` (même méthodo).
**Resolver voix** : `studio/narration/personnages/voix-meta/voice-map.json` (autoritaire, `role` → voice_id).

**Forbidden** : ❌ `studio_audiobook_from_segments` (Enterprise verrouillée) · ❌ `tts_elevenlabs` (mono) · ❌ script fallback en main agent (réservé sub-agent/CLI).

## Règles MILITAIRES (DEC-AUDIO-PRODUCTION-001 v3, figée 2026-05-16, jamais régresser)

1. **MCP par défaut** (durcissement #1) — jamais d'autre outil inventé.
2. **Modèle `eleven_v3` OBLIGATOIRE** (durcissement #2) — seul modèle qui supporte les tags v3 inline.
3. **Resolver voix via `voice-map.json`** (durcissement #3) — jamais de voice_id en dur.
4. **text-to-dialogue API** pour multi-voix (jamais 32+ appels text-to-speech mono).
5. **Packetisation < 2000 char/appel**, 2-3 paquets max.
6. **Voice settings, tags v3, pronunciation dicts** : jamais inventés — copiés depuis `_VOICE-IDS-CASTING.md` / skill `audio-direction-elevenlabs`.
7. **Loudness `ffmpeg loudnorm`** obligatoire en post-prod (1 pass, sur le concat final seulement).

Anti-patterns détaillés (20+) et méthodologie multi-culture (12 cultures) : skill global `audio-direction-elevenlabs/`.

## Cross-références

- Session retour exp : [`personnages/voix-meta/_SESSION-2026-05-11-RETOUR-EXP.md`](../../studio/narration/personnages/voix-meta/_SESSION-2026-05-11-RETOUR-EXP.md)
- Ancien script obsolète : `_archive/generate-story-audio.js.DEPRECATED` (anti-pattern 32+ TTS mono)

---

_Refonte 2026-05-13, allégée HO-G07 (2026-09-03) : anti-patterns et multi-culture retirés (vivent dans le skill `audio-direction-elevenlabs/`), pointeurs `tts-pipeline`/`audio-verif` ajoutés._
