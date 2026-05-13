# Voix Type 3 — Dadou (David)

> **Voice_id figé** : `5wcx0KzRnrP48I5RCVD8` — bibliothèque ElevenLabs **Lumi Dadou Fier** (rename 2026-05-13, ex-"Lumi Polo Fier" — voice_id conservé tel quel, juste renommé côté EL).

**Ennéatype :** Performeur · **Sensibilité :** Forces · **Astre :** Soleil

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Consonnes nettes et claires · sibilantes précises · diction impeccable |
| **Prosodie** | Statements descendants confiants · fin de phrase = fait accompli |
| **Rythme** | Brisk · attaque énergique sur la première syllabe des mots importants |
| **Phonation** | Légère pointe d'énergie en début de souffle · voix portée |

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

> ⚠️ Ces 4 paramètres se règlent **APRÈS** création du voice_id. Pour la création, voir [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) (Voice Design ① : Loudness, Guidance Scale 30-40%).
>
> Voice_id à créer une fois (cf. backlog VOIX-003) puis stocker dans le frontmatter du fichier.

```
Stability: 0.70
Similarity Boost: 0.65
Style: 0.40
Speaker Boost: true
```

## Prompt ElevenLabs (F)

> Native French. Female, young child around 4 to 5 years old. Studio quality.
> Persona: confident little achiever. Emotion: assured, dynamic, focused.
> Clean precise consonants, sharp sibilants, impeccable diction. Sentences end with a confident downward cadence — like a fact stated. Brisk pacing with energetic attack on the first syllable of important words. Voice carried forward with a slight initial puff of energy. Bright clear child timbre, naturally competent, never arrogant.

## Prompt ElevenLabs (M)

> Native French. Male, young child around 4 to 5 years old. Studio quality.
> Persona: confident little achiever. Emotion: assured, dynamic, focused.
> Clean consonants, crisp diction, every word well-placed. Conclusive downward sentence endings. Brisk pace with vivid attack on first syllables. Voice carried forward with natural energy — present, not loud. Bright clear child timbre, naturally capable.

---

## Phrases types (Dadou)

- "C'est moi qui gagne." *(descendant, factuel, pas méchant)*
- "Regardez ! Je sais faire ça." *(attaque sur "regardez", énergie première syllabe)*
- "Bon. On y va ?" *(efficace, minimal, prêt)*

---

## Langage naturel (4-6 ans)

> Tournures caractéristiques dérivées de Chabreuil. Côté lumière au premier plan — ombre à doser.

**Lumière** (perso épanoui, énergie entraînante, célèbre les victoires) :
- "Allez !"
- "On peut le faire !"
- "On y est presque !"
- "J'ai réussi !"
- "On a gagné !"

**Ombre** (réflexe automatique — besoin d'image, impatience) :
- "C'est moi qui l'ai fait."
- "On a gagné ou pas ?"
- "C'est bon, faites confiance."

---

## Tags writer ElevenLabs

> Pour les writers : balises à intégrer dans les dialogues/didascalies. Max 2-3 tags par phrase.

| Contexte | Tags | Exemple |
|---|---|---|
| Ton dominant (énergie, efficacité) | `[excited]` · `[confident]` · `[quickly]` · `[projecting]` | `"- Allez ! [excited]"` |
| Énergie vivante | `[vibrant]` · `[enthusiastic]` · `[cheerful]` | `"- On peut le faire ! [vibrant]"` |
| Victoire | `[laughs]` · `[happily]` | `"- On a gagné ! [laughs]"` |
| Décision rapide | `[matter-of-fact]` · `[confident rhythm]` | `"- On y va. [matter-of-fact]"` |

**Jamais** : `[slowly]` · `[whispers]` · `[sighs]` — hors moment de vraie fatigue
**Onomatopée signature** : "hop" (action, passage à l'acte — catalogue à vérifier)
