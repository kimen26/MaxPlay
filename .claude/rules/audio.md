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

## Règles MILITAIRES production audio

1. **Toujours utiliser text-to-dialogue API** pour multi-voix (pas text-to-speech mono).
2. **Voice settings** : ne pas inventer — utiliser les valeurs gravées dans `_VOICE-IDS-CASTING.md`.
3. **Tags audio v3** : utiliser le catalogue gravé dans `audio-direction-elevenlabs/`. Pas d'invention.
4. **Pronunciation dicts** : un dict par perso, gravé. Modifier = MAJ `_VOICE-IDS-CASTING.md`.
5. **Loudness normalization** : ffmpeg `loudnorm` obligatoire en post-prod.
6. **Format segments** : JSON figé. Voir [`narration/stories/001-le-pont-casse/assets/audio/_segments-001-v2-kimi.json`](../../narration/stories/001-le-pont-casse/assets/audio/) pour exemple.

## Script de production

[`narration/scripts/generate-story-audio.js`](../../narration/scripts/generate-story-audio.js) — production MP3 multi-voix via text-to-dialogue + ffmpeg loudnorm.

```bash
# Usage
ELEVENLABS_API_KEY="..." bun narration/scripts/generate-story-audio.js \
  narration/stories/<NNN-titre>/assets/audio/_segments-<NNN>-vN-<llm>.json
```

## 17 anti-patterns gravés (skill `audio-direction-elevenlabs/`)

Synthèse des principaux :
1. ❌ Voice ID copié d'un autre projet sans test
2. ❌ Tags v3 inventés (utiliser catalogue)
3. ❌ Pas de pronunciation dict pour les prénoms spécifiques
4. ❌ Voice settings standard sur tous les persos (chaque perso = settings dédié)
5. ❌ Loudness non normalisé (volume incohérent entre segments)
6. ❌ Onomatopée écrite en FR sur perso d'une autre culture
7. ❌ Didascalies non listées dans cheatsheet
8. ❌ Production sans preview-text d'abord

Voir détail complet dans le skill global.

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
