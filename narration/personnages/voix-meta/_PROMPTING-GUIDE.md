# Voice Design — Guide de prompting

> ⚠️ **Contenu déplacé vers le skill global `elevenlabs-voice-design`.**
>
> Localisation : `~/.claude/skills/elevenlabs-voice-design/SKILL.md`
>
> Le skill est auto-déclenché sur les mots-clés : ElevenLabs, voice design, prompt voix, voix ElevenLabs, signature vocale, multilingue voix, native french, etc.

## Pourquoi un skill global ?

Les patterns ElevenLabs sont **génériques** (pas MaxPlay-spécifique) et réutilisables sur tout projet voix.

## Ce qui reste dans MaxPlay

- Les **10 fiches persos** (`type-XX-*.md`, `wex.md`) — signatures vocales spécifiques au casting MaxPlay
- Les **2 fiches narrateurs** (`narrateur-f.md`, `narrateur-h.md`) — voix de l'univers MaxPlay
- Le **README.md** — index local des voix MaxPlay

## Contenu du skill (résumé)

1. Limite caractères ElevenLabs (< 1000)
2. Structure recommandée : `Native <Lang>. <Gender>, <Age>. <Quality>. Persona. Emotion. <Timbre/pacing>.`
3. Attributs à inclure (age, gender, tone, accent, pacing, emotion, audio quality)
4. Do's & Don'ts officiels
5. Paramètres avancés (Loudness, Guidance Scale)
6. **Stratégie multilingue 15+ langues** (1 voix par langue vs réutilisation)
7. **Liste des 70+ langues supportées Eleven v3** (`Native <X>` exact)
8. Workflow type déclinaison cross-langue
