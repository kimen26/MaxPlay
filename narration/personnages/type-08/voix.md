# Voix Type 8 — Juju (Judith)

**Ennéatype :** Challenger · **Sensibilité :** Plantes · **Astre :** Mars

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Plosives lourdes et ancrées · voyelles ouvertes et profondes · aucune hésitation |
| **Prosodie** | Statements descendants autoritaires · fin de phrase = fait, pas suggestion |
| **Rythme** | Pas précipité · lourd · chaque mot posé avec intention |
| **Phonation** | "Plant moments" — silences courts, ancrés, qui pèsent · pas de filler |

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

> ⚠️ Ces 4 paramètres se règlent **APRÈS** création du voice_id. Pour la création, voir [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) (Voice Design ① : Loudness, Guidance Scale 30-40%).
>
> Voice_id à créer une fois (cf. backlog VOIX-003) puis stocker dans le frontmatter du fichier.

```
Stability: 0.75
Similarity Boost: 0.65
Style: 0.50
Speaker Boost: true
```

## Prompt ElevenLabs (F)

> Native French. Female, young child around 4 to 5 years old. Studio quality.
> Persona: grounded challenger. Emotion: direct, assured, unambiguous.
> Heavy grounded plosives, deep open vowels, no hesitation. Authoritative downward statements — sentence endings are facts, never suggestions. Deliberate unhurried rhythm, each word placed with intent. Short grounded silences that carry weight. No fillers. Strong chesty child timbre. Strong but not aggressive — just true.

## Prompt ElevenLabs (M)

> Native French. Male, young child around 4 to 5 years old. Studio quality.
> Persona: grounded challenger. Emotion: direct, anchored, plain-spoken.
> Heavy intentional plosives. Declarative downward statements like established truths. Heavy deliberate rhythm. Loaded silences. No fillers. Strong chesty child timbre. Not angry — just unambiguous.

---

## Phrases types (Juju)

- "Non. C'est pas juste." *(deux blocs, chaque mot posé, descendant)*
- "Je l'avais dit." *(lourd, bref, factuel)*
- "On fait comme ça. Voilà." *(statement double, ancré, fermé)*
