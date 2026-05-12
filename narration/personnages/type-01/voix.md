# Voix Type 1 — Melki (Melchisédech)

**Ennéatype :** Perfectionniste · **Sensibilité :** Minéraux · **Astre :** Mercure

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | T/K crisp aspirés · S sibilants nets · voyelles bien tenues |
| **Prosodie** | Cadences descendantes résolues · fin de phrase = conclusion, jamais suspendue |
| **Rythme** | Métronomique · pauses précises avant les mots importants |
| **Phonation** | Micro-inspiration audible avant les mots-clés · légère tension dans la gorge |

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

> ⚠️ Ces 4 paramètres se règlent **APRÈS** création du voice_id. Pour la création, voir [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) (Voice Design ① : Loudness, Guidance Scale 30-40%).
>
> Voice_id à créer une fois (cf. backlog VOIX-003) puis stocker dans le frontmatter du fichier.

```
Stability: 0.75
Similarity Boost: 0.70
Style: 0.15
Speaker Boost: true
```

## Prompt ElevenLabs (F)

> Native French. Female, young child around 4 to 5 years old. Studio quality.
> Persona: meticulous little perfectionist. Emotion: calm, attentive, quietly satisfied.
> Crisp aspirated T and K consonants, almost crunchy. Crystal-clear sibilants. Sentences end on a downward resolved cadence — like a decision firmly made. Steady metronomic rhythm with a brief micro-pause and audible micro-inhale before key words. Studious tone, never tense — just applied. Warm clear child timbre with a faint inner focus.

## Prompt ElevenLabs (M)

> Native French. Male, young child around 4 to 5 years old. Studio quality.
> Persona: meticulous little perfectionist. Emotion: calm, attentive, quietly satisfied.
> Crisp aspirated T and K consonants, almost crunchy. Crystal-clear sibilants. Sentences end on a downward resolved cadence — like a rule firmly stated. Steady metronomic rhythm with a brief micro-pause and audible micro-inhale before key words. Applied tone, never anxious — just attentive. Warm clear child timbre with a faint inner focus.

---

## Phrases types (Melki)

- "Non, comme ça c'est pas bien rangé." *(fin descendante, conviction calme)*
- "Attends... *(pause)* ...je vérifie d'abord." *(micro-inspiration avant "vérifie")*
- "C'est bon. C'est comme il faut." *(deux cadences fermées, satisfaction sobre)*
