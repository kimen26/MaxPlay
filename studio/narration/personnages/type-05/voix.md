# Voix Type 5 — Lulu (Luc)

**Ennéatype :** Observateur · **Sensibilité :** Quantique · **Astre :** Uranus

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Consonnes sèches et précises · voyelles neutres, économes |
| **Prosodie** | Plateau plat + léger drop final · ton informatif, jamais affirmatif-émotionnel |
| **Rythme** | Mesuré · pauses de réflexion avant les termes techniques ou précis |
| **Phonation** | Micro-pauses avant les mots exacts · pas de remplisseurs ("euh", "mm") |

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

> ⚠️ Ces 4 paramètres se règlent **APRÈS** création du voice_id. Pour la création, voir [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) (Voice Design ① : Loudness, Guidance Scale 30-40%).
>
> Voice_id à créer une fois (cf. backlog VOIX-003) puis stocker dans le frontmatter du fichier.

```
Stability: 0.80
Similarity Boost: 0.60
Style: 0.10
Speaker Boost: false
```

## Prompt ElevenLabs (F) — méthodo v24 (2026-05-13)

> Native French. Animated little girl character voice for animation series — precise, calm, observant. Studio quality.
> Persona: calm precise observer. Emotion: neutral, focused, factual.
> Dry precise consonants, economical neutral vowels. Flat plateau prosody with a slight downward drop at sentence ends — informative, never emotional. Measured pacing with reflective micro-pauses before precise terms. No fillers, no "uh" or "mm". Clear unembellished child timbre. Neutral tone, never cold — just concentrated.

## Prompt ElevenLabs (M) — méthodo v24

> Native French. Animated little boy character voice for animation series — precise, calm, observant. Studio quality.
> Persona: calm methodical observer. Emotion: neutral, focused, factual.
> Dry precise consonants, economical diction. Plateau prosody with slight downward drop at sentence ends. Measured pacing with micro-pauses before precise terms. No verbal fillers. Clear unembellished child timbre. Factual tone — not distant, just focused.

## Preview text Voice Design

*Attendre préview ElevenLabs — phrase de test avant finalisation audio.*

## Description publique Voice Library

**FR :** Voix posée et précise d'un petit observateur curieux, avec ton informatif et concentration naturelle. Parfait pour les personnages méthodiques en littérature jeunesse.

**EN :** Calm, precise observer's voice with measured pacing and neutral focus. Perfect for analytical, curious characters in children's storytelling.
