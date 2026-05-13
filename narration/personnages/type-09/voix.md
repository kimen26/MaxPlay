# Voix Type 9 — Nono (Noé)

**Ennéatype :** Pacificateur · **Sensibilité :** Vibration collective · **Astre :** Vénus

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Consonnes legato · tout s'enchaîne doucement · pas de ruptures |
| **Prosodie** | Vagues douces · ni vraiment montant ni vraiment descendant · berçant |
| **Rythme** | Lent et fluide · aucune urgence · tout prend son temps |
| **Phonation** | "mmm" doux · "ah" doux · respiration lente et profonde · sourire serein |

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

> ⚠️ Ces 4 paramètres se règlent **APRÈS** création du voice_id. Pour la création, voir [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) (Voice Design ① : Loudness, Guidance Scale 30-40%).
>
> Voice_id à créer une fois (cf. backlog VOIX-003) puis stocker dans le frontmatter du fichier.

```
Stability: 0.70
Similarity Boost: 0.75
Style: 0.20
Speaker Boost: false
```

## Prompt ElevenLabs (F)

> Native French. Female, young child around 4 to 5 years old. Studio quality.
> Persona: serene peacemaker. Emotion: calm, soothing, unhurried.
> Legato consonants flowing seamlessly with no ruptures. Gentle wave-like prosody, neither rising nor falling — gently rocking. Slow fluid pacing, no urgency, everything takes its time. Natural soft "mmm" and "ah" sounds, slow audible breath. Soft round child timbre. Effortless serenity, soothing without effort.

## Prompt ElevenLabs (M)

> Native French. Male, young child around 4 to 5 years old. Studio quality.
> Persona: serene peacemaker. Emotion: calm, fluid, peaceful.
> Soft legato consonants, fluid throughout. Slow regular rhythm like a calm river. Natural soft "mmm" and "ah". Slow audible breath. Soft warm child timbre. Not drowsy — just at peace.

---

## Phrases types (Nono)

- "Mmm... on peut tous y aller ensemble, non ?" *(mmm d'ouverture, vague douce)*
- "C'est bien comme ça." *(plat, serein, suffisant)*
- "Ah... ouais." *(long, lent, apaisé — la solution vient de couler de source)*

---

## Langage naturel (4-6 ans)

> Tournures caractéristiques dérivées de Chabreuil. Côté lumière au premier plan — ombre à doser.

**Lumière** (perso épanoui, présence apaisante) :
- "C'est bien aussi."
- "On peut faire les deux."
- "Ouais..." *(présence silencieuse, acquiescement lent)*
- "Mmm..." *(pensée qui se pose sans se presser)*

**Ombre** (réflexe automatique — effacement) :
- "Ça m'est égal."
- "Comme tu veux."
- *[silence complet — présence sans mots]*

---

## Tags writer ElevenLabs

> Pour les writers : balises à intégrer dans les dialogues/didascalies. Max 2-3 tags par phrase.

| Contexte | Tags | Exemple |
|---|---|---|
| Ton dominant | `[softly]` · `[slowly]` · `[smooth flow]` | `"- C'est bien aussi. [softly]"` |
| Silence expressif | `[pauses]` · `...` | `"- Ouais... [pauses] c'est là."` |
| Sérénité (ambiance) | `[evening relaxed]` · `[gentle interjection]` | `"- On peut faire les deux. [evening relaxed]"` |
| Émerveillement discret (Ten) | `[awe]` · `[gasps]` | `"- [awe] Elle est là."` |
| Chuchotement complice | `[whispers]` | `"- [whispers] Chut."` |

**Jamais** : `[excited]` · `[quickly]` · `[shouts]` · `[laughs]` franc — hors exception narrative forte
**Onomatopée signature** : aucune — le silence est la signature de Nono
