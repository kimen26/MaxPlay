# Production Audio — Wex (Hors-système)

> **Voice_id figé** : `MvACGLim6BRvCWyH21A6` — bibliothèque ElevenLabs **Lumi Wex Rêveur** (figé 2026-05-11, méthodo v19, hors-système).

---

## Signature vocale (4 couches)

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Neutre, propre · toutes les consonnes sans excès · tangage léger sur les s/ch |
| **Prosodie** | Entre T5 (plateau) et T9 (vague) · rarement urgent · statements en descente, jamais upspeak |
| **Rythme** | Adaptatif · s'accorde aux autres · accélère avec Raph, ralentit avec Nono |
| **Phonation** | Silence avant d'agir · bégaiement sur pics d'excitation · mélodie franc-comtoise sur les questions |

### 7 tics canon Wex (encodés dans le voice_id)

| # | Tic | Comment ça sonne | Fréquence | Origine |
|---|-----|------------------|-----------|---------|
| **1** | Sifflement léger sur `s` et `ch` | Petite fuite d'air audible (pas un zézaiement) | Constant | Physiologique (dents de lait) |
| **2** | `é` parasite devant S+consonne | « un éstylo », « un éscargot » | 1/3-4 phrases | PT BR : *estilo, escargot* |
| **3** | `ouit` au lieu de `huit` | tous les -uit deviennent -wi (ouit, nouit, fruite) | 1/3-4 phrases | PT BR (pas de /ɥ/) |
| **4** | `je` instable | mixe « se », « ze », « je » selon le moment | Variable | Articulation enfantine |
| **5** | Bégaiement quand excité | reprise 1ère syllabe 2-3× : « le-le-le bus ! » | Pics d'excitation uniquement | Observation Max IRL |
| **6** | Affirmations : fin en intonation BASSE | descente prosodique, jamais upspeak | Constant sur statements | Observation Max IRL |
| **7** | Questions : mélodie franc-comtoise | montée puis redescente arrondie + légère avant-dernière syllabe allongée | Constant sur questions | Coloration géographique (Belfort/Suisse romande) |

**Règle d'or pour les writers** : écrire en FR standard normal — « Je sais pas », « huit bus », « le bus arrive ». Le voice_id ajoute les tics à la lecture audio.

---

## Paramètres TTS Generation (voice_id, modèle `eleven_v3`)

```
Stability: 0.68
Similarity Boost: 0.72
Style: 0.18
Speaker Boost: false
```

---

## Prompt ElevenLabs — v19 (2026-05-11, 988 chars, descripteurs anglais)

> **Méthodo v19** : descripteurs anglais naturels riches uniquement (IPA et phoneme tags non supportés en Voice Design).

```
Native French. Male, young adult squeaky and playful character voice — high-pitched, bright, light, French Sangoku or Naruto cartoon style. Studio quality.
Persona: cheerful absent-minded dreamer with gentle bright energy — easily distracted, often drifting, always smiling. Emotion: dreamy, playful.
Clear bright high timbre, smile in every word. Articulate but tangled when excited. Childlike softening of "j" — blurs toward "z" or "s" hiss. Repeats first syllable 2-3 times when excited ("le-le-le bus !"). Statements end on low falling cadence (never upspeak). Questions follow a Franche-Comté/Swiss melody: pitch rises then gently falls, slight lengthening on second-to-last syllable. Soft bursts, sudden pauses. Faint whistle on "s" and "ch" — tiny air leak, hissy (not a lisp). Brazilian-Portuguese flavor: drops the y-glide so "huit" sounds like English "weet"; inserts a short "eh" before s-clusters ("stylo" → "eh-stylo"). Light — 1/3-4 phrases. Other tics: giggle, wonder-gasp.
```

---

## Description publique Voice Library (Lumi Wex Rêveur)

**Title** : `Lumi Wex Rêveur`

**Description FR** :
```
Voix haute et pétillante d'un petit rêveur souriant, avec signature phonétique ludique et légère. Parfait pour les personnages observateurs malicieux en littérature jeunesse.
```

**Description EN** :
```
Bright, playful voice of a dreamy young observer with delightful phonetic quirks and gentle energy. Perfect for charming, attentive characters in children's storytelling.
```

---

## Wex et les autres voix

Wex s'accorde vocalement à son interlocuteur — léger effet miroir.
- Avec Raph : accélère légèrement.
- Avec Nono : ralentit.
- Avec Juju : devient plus direct.

Ce n'est pas une règle stricte — juste une observation pour le casting.

---

*Production méthodo v19 2026-05-11. Filtre ElevenLabs : passage après insistance. Documentation dans [`../voix-meta/_VOICE-IDS-CASTING.md`](../voix-meta/_VOICE-IDS-CASTING.md).*
