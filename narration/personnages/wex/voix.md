---
role: perso
type: hors-système
genre: M
voice_id_elevenlabs: MvACGLim6BRvCWyH21A6
voice_name_elevenlabs: Lumi Wex Rêveur
voice_name_elevenlabs_en_archive: Lumi Wex Playful
voice_workspace_elevenlabs: ElevenCreative
date_creation_voice: 2026-05-11
modele_creation: eleven_multilingual_v2
modele_production: eleven_v3
prompt_version_utilise: v19
description_fr_publiee: 489 chars
description_en_publiee: 446 chars
filtre_elevenlabs_passage: après-insistance
---

# Voix Wex — Hors-système

**Rôle :** Héros universel · **Sensibilité :** Vibration (transversale) · **Power :** Vision causale

---

## Note préliminaire

Wex n'a pas de signature vocale figée dans le sens où il ne correspond à aucun des 9 types.
Sa voix doit évoquer l'**observateur tranquille** — celui qui voit avant, qui ne réagit pas, qui est là.

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Neutre, propre · aucune aspérité · toutes les consonnes mais sans excès |
| **Prosodie** | Légèrement entre Type 5 (plateau) et Type 9 (vague) · rarement urgent |
| **Rythme** | Adaptatif · peut accélérer avec Raph, ralentir avec Nono · il s'accorde aux autres |
| **Phonation** | Silence avant d'agir · pas de "mm", pas de soupir · juste une présence |

### 7 tics canon Wex (encodés dans le voice_id)

| # | Tic | Comment ça sonne | Fréquence | Origine |
|---|-----|------------------|-----------|---------|
| **1** | **Sifflement léger sur `s` et `ch`** | Petite fuite d'air audible (pas un zézaiement) | Constant | Physiologique (dents de lait) |
| **2** | **`é` parasite devant S+consonne** | « un éstylo », « un éscargot » | 1/3-4 phrases | PT BR : *estilo, escargot* |
| **3** | **`ouit` au lieu de `huit`** | tous les -uit deviennent -wi (ouit, nouit, fruite) | 1/3-4 phrases | PT BR (pas de /ɥ/) |
| **4** | **`je` instable** | mixe « se », « ze », « je » selon le moment | Variable | Articulation enfantine |
| **5** | **Bégaiement quand excité** | reprise 1ère syllabe 2-3× : « le-le-le bus ! » | Pics d'excitation uniquement | Observation Max IRL |
| **6** | **Affirmations : fin en intonation BASSE** | descente prosodique, jamais upspeak | Constant sur statements | Observation Max IRL |
| **7** | **Questions : mélodie franc-comtoise/suisse romande** | montée puis redescente arrondie + légère avant-dernière syllabe allongée | Constant sur questions | Coloration géographique (Belfort/Suisse romande) |

**Règle d'or pour les writers** : tu **n'écris rien de spécial** dans les dialogues de Wex. Continue en FR standard normal — « Je sais pas », « huit bus », « le bus arrive ». Le voice-director et le voice_id ElevenLabs ajoutent les tics à la lecture audio.

---

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

```
Stability: 0.68
Similarity Boost: 0.72
Style: 0.18
Speaker Boost: false
```

---

## Prompt ElevenLabs (Voice Design) — v19 (descripteurs anglais, 2026-05-11)

> **Méthodo v19** : après vérif doc officielle ElevenLabs, l'IPA et phoneme tags ne sont PAS supportés en Voice Design. Le prompt utilise uniquement des **descripteurs anglais naturels riches** pour encoder les 7 tics phonétiques.
>
> **Stratégie** :
> - **Création de voix (ce fichier)** : descripteurs anglais naturels riches uniquement
> - **Production audio future** : alias tags pour forcer « huit » → « ouitte » si besoin

```
Native French. Male, young adult squeaky and playful character voice — high-pitched, bright, light, French Sangoku or Naruto cartoon style. Studio quality.
Persona: cheerful absent-minded dreamer with gentle bright energy — easily distracted, often drifting, always smiling. Emotion: dreamy, playful.
Clear bright high timbre, smile in every word. Articulate but tangled when excited. Childlike softening of "j" — blurs toward "z" or "s" hiss. Repeats first syllable 2-3 times when excited ("le-le-le bus !"). Statements end on low falling cadence (never upspeak). Questions follow a Franche-Comté/Swiss melody: pitch rises then gently falls, slight lengthening on second-to-last syllable. Soft bursts, sudden pauses. Faint whistle on "s" and "ch" — tiny air leak, hissy (not a lisp). Brazilian-Portuguese flavor: drops the y-glide so "huit" sounds like English "weet"; inserts a short "eh" before s-clusters ("stylo" → "eh-stylo"). Light — 1/3-4 phrases. Other tics: giggle, wonder-gasp.
```

**Longueur** : 988 caractères ✅

---

## Preview text Voice Design

*Attendre préview ElevenLabs — phrase de test avant finalisation audio.*

---

## Description publique Voice Library

**FR :** Voix haute et pétillante d'un petit rêveur souriant, avec signature phonétique ludique et légère. Parfait pour les personnages observateurs malicieux en littérature jeunesse.

**EN :** Bright, playful voice of a dreamy young observer with delightful phonetic quirks and gentle energy. Perfect for charming, attentive characters in children's storytelling.

---

## Wex et les autres voix

Wex s'accorde vocalement à son interlocuteur — léger effet miroir.
- Avec Raph : il accélère légèrement.
- Avec Nono : il ralentit.
- Avec Juju : il devient plus direct.

Ce n'est pas une règle stricte — juste une observation pour le casting.

---

## Lien

→ [`personnage.md`](personnage.md) pour la nature et le rôle de Wex
