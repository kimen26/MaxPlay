# Voix Type 8 — Juju (Judith)

> **Voice_id figé** : `WFNYCPhDQM9w07KAV6Be` — bibliothèque ElevenLabs **Lumi Juju Solide** (figé 2026-05-13, méthodo v24 transposée fille, 1 essai).

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

## Prompt ElevenLabs (F) — utilisé pour création voice_id 2026-05-13 (858 chars)

> Native French. Animated little girl character voice for animation series — high-pitched, bright, grounded, strong chesty edge. Studio quality.
> Persona: a grounded direct little character who states things as facts with calm certainty. Alive and attentive, anchored, clear, plain-spoken. Emotion: direct, assured, unambiguous, steady.
> High bright grounded timbre with a strong chesty quality and full body. Clean articulate French diction, heavy intentional plosives, deep open vowels, crisp consonants. Deliberate cadence with each word placed with intent. Pace varies: holds steady on statements, lands firmly on key words. Sentence endings descend authoritatively — endings are facts, not suggestions. Vocal range strong and bright, weighted on declarations. Short grounded silences that carry weight between statements. Brief satisfied chuckle of plain truth.
> Conveys strength, clarity, certainty, groundedness.

### Ancien prompt (pré-méthodo v24 fille, archivé)

> Native French. Female, young child around 4 to 5 years old. Studio quality.
> Persona: grounded challenger. Emotion: direct, assured, unambiguous.
> Heavy grounded plosives, deep open vowels, no hesitation. Authoritative downward statements — sentence endings are facts, never suggestions. Deliberate unhurried rhythm, each word placed with intent. Short grounded silences that carry weight. No fillers. Strong chesty child timbre. Strong but not aggressive — just true.

⚠️ L'ancien prompt utilisait `young child around 4 to 5 years old` = blacklist Prohibited Use Policy ElevenLabs. Méthodo v24 transposée fille (validée empiriquement 2026-05-13 sur Juju) = remplace par `Animated little girl character voice` + physiologie aiguë.

## Prompt ElevenLabs (M)

> Native French. Male, young child around 4 to 5 years old. Studio quality.
> Persona: grounded challenger. Emotion: direct, anchored, plain-spoken.
> Heavy intentional plosives. Declarative downward statements like established truths. Heavy deliberate rhythm. Loaded silences. No fillers. Strong chesty child timbre. Not angry — just unambiguous.

---

## Phrases types (Juju)

- "Non. C'est pas juste." *(deux blocs, chaque mot posé, descendant)*
- "Je l'avais dit." *(lourd, bref, factuel)*
- "On fait comme ça. Voilà." *(statement double, ancré, fermé)*

---

## Preview text Voice Design (utilisé 2026-05-13)

> Source canon : [`../voix-meta/_PREVIEW-TEXTS.md`](../voix-meta/_PREVIEW-TEXTS.md) §Type 8.

```
[serious] Non. [pauses] C'est pas juste. Je l'avais dit. On fait comme ça. Voilà.
```

---

## Description publique Voice Library (Lumi Juju Solide)

**Title** : `Lumi Juju Solide`

**Description FR** (416 chars / 500 max) :
```
La voix qui tient la main sans le dire. Une présence qui dit ce qui est, sans détour, et fait tenir ce qui vacille. Vous l'écoutez et le sol semble plus stable sous vos pieds. Conçue pour les contes qui rassurent, les héroïnes qui ne fléchissent pas, les livres illustrés 3-8 ans où la franchise est tendre. Une voix qui protège ceux qui en ont besoin, sans jamais peser. Celle qu'on appelle quand il faut tenir bon.
```

**Description EN** (416 chars / 500 max) :
```
The voice that holds your hand without saying so. A presence that says what is, plainly, and steadies what trembles. You listen and the ground feels firmer beneath you. Made for stories that reassure, for heroines who hold their ground, for illustrated books for ages 3-8 where honesty is tender. A voice that protects those who need it, without ever weighing them down. The one you call when you need to stand firm.
```

> Stratégie impact appliquée : hook bénéfice ("tient la main sans le dire" / "holds your hand without saying so") + image expérientielle ("le sol semble plus stable" / "the ground feels firmer") + use cases publics (contes, héroïnes, 3-8 ans) + CTA via désir ("celle qu'on appelle quand il faut tenir bon" / "when you need to stand firm"). Zéro mot-clé technique reproductible. Cf. [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) §Description publique.
