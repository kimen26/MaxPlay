# Voix Type 4 — Madie (Madeleine)

> **Voice_id figé** : `9JvOiMFLj8GdHK3Fcydn` — bibliothèque ElevenLabs **Lumi Madie Vibrante** (figé 2026-05-13, méthodo v24 transposée fille).

**Ennéatype :** Individualiste · **Sensibilité :** Fréquence · **Astre :** Neptune

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | R roulé doux · voyelles tenues, étirées sur les mots émotionnels |
| **Prosodie** | Fins mélodiques légèrement tristes ou suspendues · montée puis chute douce |
| **Rythme** | Lent · pauses dramatiques · silences chargés |
| **Phonation** | Soupirs discrets · "oh" chuchoté · respiration audible |

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

> ⚠️ Ces 4 paramètres se règlent **APRÈS** création du voice_id. Pour la création, voir [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) (Voice Design ① : Loudness, Guidance Scale 30-40%).
>
> Voice_id à créer une fois (cf. backlog VOIX-003) puis stocker dans le frontmatter du fichier.

```
Stability: 0.50
Similarity Boost: 0.70
Style: 0.55
Speaker Boost: false
```

## Prompt ElevenLabs (F) — utilisé pour création voice_id 2026-05-13 (méthodo v24 fille)

> Native French. Animated little girl character voice for animation series — high-pitched, bright, expressive, dreamy. Studio quality.
> Persona: a deep sensitive little dreamer who feels everything intensely and expresses it in waves. Alive and attentive, original, inward. Emotion: intense, poetic, singular, wondering.
> High bright timbre with a warm dreamy edge and light breathiness. Clean articulate French diction, slow expressive consonants, deep resonant vowels, slight vocal weight. Flowing uneven cadence — variable rhythm following emotion. Pace varies: slows on emotional peaks, lifts on wonder. Sentence endings oscillate — some open (unresolved), some descending (gravity). Vocal range bright and weighted, expressive dynamic range. Soft wondering sigh when moved. Long soft exhale of feeling.
> Conveys depth, sensitivity, singularity, beauty.

### Ancien prompt (pré-méthodo v24 fille, archivé)

> Native French. Female, young child around 4 to 5 years old. Studio quality.
> Persona: dreamy introspective child. Emotion: gentle, melancholic, intimate.
> Soft rolled R, sustained vowels stretched on emotional words. Slow pacing with charged pauses and loaded silences. Sentence endings descend softly with a faint melodic sadness — like an unanswered question. Discreet sighs and whispered "oh" moments. Slightly breathy modal child timbre with inner depth — not sad, just deep.

⚠️ L'ancien prompt utilisait `young child around 4 to 5 years old` = blacklist Prohibited Use Policy ElevenLabs.

## Prompt ElevenLabs (M)

> Native French. Male, young child around 4 to 5 years old. Studio quality.
> Persona: dreamy introspective child. Emotion: gentle, melancholic, intimate.
> Soft rolled R, sustained vowels on words that matter. Slow pacing with charged silences. Sentence endings descend softly, faintly melancholic. Faintly audible breath. Slightly breathy child timbre, present and inward — not sad, just deep.

---

## Phrases types (Madie)

- "Personne comprend vraiment ce que je veux dire..." *(voyelle étirée sur "vraiment")*
- "C'est... *(pause)* ...beau, en fait." *(respiration audible, découverte lente)*
- "Oh." *(chuchoté, seul — tout un monde)*
