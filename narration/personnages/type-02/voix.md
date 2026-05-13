# Voix Type 2 — Mimi (Marie)

> **Voice_id figé** : `aPQfyqve0ovOsJIl7EzX` — bibliothèque ElevenLabs **Lumi Mimi Attentive** (figé 2026-05-13, méthodo v24 transposée fille, 1 essai).

**Ennéatype :** Aidant · **Sensibilité :** Eau · **Astre :** Lune

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | P/B adoucis · M/N résonnants et chauds · voyelles ouvertes |
| **Prosodie** | Cadences montantes chaleureuses · fin de phrase = invitation, légèrement ouverte |
| **Rythme** | Avec micro-lingerings sur les voyelles · généreux, pas pressé |
| **Phonation** | "mm" doux avant de répondre · sourire audible |

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

> ⚠️ Ces 4 paramètres se règlent **APRÈS** création du voice_id. Pour la création, voir [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) (Voice Design ① : Loudness, Guidance Scale 30-40%).
>
> Voice_id à créer une fois (cf. backlog VOIX-003) puis stocker dans le frontmatter du fichier.

```
Stability: 0.60
Similarity Boost: 0.75
Style: 0.30
Speaker Boost: true
```

## Prompt ElevenLabs (F) — utilisé pour création voice_id 2026-05-13 (838 chars)

> Native French. Animated little girl character voice for animation series — high-pitched, bright, warm, round. Studio quality.
> Persona: a warm tender little caregiver who welcomes others with an open smile. Open smile, alive and attentive, friendly. Emotion: tender, welcoming, attentive, soft.
> High bright warm timbre with a round chesty quality and natural warmth. Clean articulate French diction, softened P and B consonants, resonant warm M and N, open vowels. Generous unhurried cadence with micro-lingerings on warm vowels. Pace varies: lifts gently on questions, lingers on caring words. Sentence endings rise softly — like a gentle invitation. Vocal range warm and bright, lifts on tenderness. Soft "mm" before responding, audible smile in the voice. Soft tender chuckle of affection.
> Conveys warmth, tenderness, welcome, care.

### Ancien prompt (pré-méthodo v24 fille, archivé)

> Native French. Female, young child around 4 to 5 years old. Studio quality.
> Persona: warm little caregiver. Emotion: tender, welcoming, attentive.
> Softened P and B consonants, resonant warm M and N, open vowels. Sentences end with a slight upward cadence — like a gentle invitation. Generous unhurried pacing with micro-lingerings on warm vowels. Audible smile in the voice, soft "mm" before responding. Round chesty child timbre with natural warmth, never saccharine.

⚠️ L'ancien prompt utilisait `young child around 4 to 5 years old` = blacklist Prohibited Use Policy ElevenLabs.

## Prompt ElevenLabs (M)

> Native French. Male, young child around 4 to 5 years old. Studio quality.
> Persona: warm little caregiver. Emotion: tender, welcoming, attentive.
> Softened P and B, resonant warm M and N, open vowels. Open phrase endings, slight upward lift — welcoming, not questioning. Generous unhurried pacing. Soft "mm" before responding. Audible smile in the voice. Round warm child timbre, naturally caring, no mannerism.

---

## Phrases types (Mimi)

- "Mm... t'as l'air triste. Tu veux qu'on s'assoie ?" *(mm doux, montée finale)*
- "Je peux t'aider !" *(élan spontané, voyelle ouverte)*
- "C'est pas grave, hein." *(lingering sur "hein", berçant)*

---

## Langage naturel (4-6 ans)

> Tournures caractéristiques dérivées de Chabreuil. Côté lumière au premier plan — ombre à doser.

**Lumière** (perso épanoui, chaleur et attention spontanée) :
- "T'as besoin de quoi ?"
- "Je vais t'aider !"
- "Viens, je suis là."
- "Tiens, prends ça."

**Ombre** (réflexe automatique — aide non demandée, hypervigilance) :
- "Mais... tu manges pas ?"
- "Tu vas bien ?"
- "J'avais apporté ça pour toi."

---

## Tags writer ElevenLabs

> Pour les writers : balises à intégrer dans les dialogues/didascalies. Max 2-3 tags par phrase.

| Contexte | Tags | Exemple |
|---|---|---|
| Ton dominant (douceur attentive) | `[softly]` · `[happily]` · `[warm]` | `"- Viens. [softly]"` |
| Aide proposée | `[caring]` · `[curious]` | `"- T'as besoin de quoi ? [curious]"` |
| Réconfort / compassion | `[compassionate]` ⚠️ · `[tender]` ⚠️ · `[sighs]` | `"- C'est pas grave. [compassionate]"` |
| Joie d'aider | `[excited]` · `[gentle interjection]` | `"- Je vais t'aider ! [excited]"` |

**Jamais** : `[shouts]` · `[confident]` dominant · `[serious]` prolongé
**Onomatopée signature** : "mm" doux (interjection d'attention — pas une onomatopée bruitiste)
**Note** : `[compassionate]` et `[tender]` ont 👍 faibles (5/4) — tester avant d'utiliser en prod
