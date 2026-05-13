---
role: perso
type: 6
genre: M
prenom: Pierrot
voice_id_elevenlabs: ukIKjXqbiGGkqIz0SW5c
voice_name_elevenlabs: Lumi Pierrot Sincère
voice_name_elevenlabs_en_archive: Lumi Pierrot Alert  # version EN initiale 2026-05-12, jamais publiée
voice_workspace_elevenlabs: ElevenCreative
date_creation_voice: 2026-05-12
description_fr_publiee: 462 chars
description_en_publiee: 418 chars
modele_creation: eleven_multilingual_v2
modele_production: eleven_v3
prompt_version_utilise: v1
---

# Voix Pierrot — Type 6 (Le Loyal)

**Ennéatype :** Loyal · **Sensibilité :** Animaux · **Astre :** Saturne
**Surnom canon :** Pierrot (Pierre)

---

## ① Voice Design (création voice_id) — Prompt v1 (2026-05-12)

> **Approche** : template cartoon character (validé sur Wex + Raph) + signature prosodique T6 (cf. `etude-vocale-par-type.md`) + descripteurs phonétiques **conservés** (ils orientent le caractère même s'ils ne s'exécutent pas — décision Papa Yann 2026-05-12).
>
> **Nom Voice Library** : `Lumi Pierrot Alert` (convention famille Lumi).

### Prompt à coller dans ElevenLabs Voice Design (928 chars)

```
Native French. Male, young adult attentive cartoon character voice — clear, slightly tight, alert, French animation style (like a watchful young hero). Studio quality.
Persona: vigilant loyal companion — eyes scanning ahead, checking everyone is safe, slightly tense until reassured. Emotion: caring, sincere, attentive, sometimes anxious but always present.
Clear bright tenor with sincere franc warmth. Alert precise plosives, every consonant carefully placed. Slight interrogative rise at the end of uncertain phrases — checking for confirmation, looking for the listener's eyes. Variable pacing: faster when worried, slower and grounded once reassured. Smile in voice when settled. Subtle childlike speech imperfections expected. Statements end firmly when he's sure, with a downward resolute drop. No fry, no overacting. Conveys steady loyal presence — the kind of friend you can count on to notice when something is wrong.
```

### Notes de design

| Élément | Raison |
|---------|--------|
| `young adult attentive cartoon character voice` | Template **Plan A officiel** (passe filtre minor voices) |
| `French animation style (like a watchful young hero)` | Référence stylistique = jeune héros vigilant FR (Pierre dans Pierre et le Loup version moderne) |
| `clear bright tenor with sincere franc warmth` | Tessiture T6 garçon — clarté + chaleur sincère |
| `alert precise plosives, every consonant carefully placed` | Articulation T6 du §etude-vocale-par-type.md (consonnes alertes vigilantes) |
| `Slight interrogative rise at the end of uncertain phrases` | Prosodie T6 (upspeak interrogatif quand doute) |
| `Variable pacing: faster when worried, slower when reassured` | Rythme T6 variable selon état émotionnel |
| `Smile in voice when settled` | Signature qui marche officiellement (cf. Lumi H/F/Wex/Raph) |
| `Subtle childlike speech imperfections expected` | Descripteur d'effet **CONSERVÉ malgré KO test 2026-05-12** — oriente le caractère général (jeune perso approximatif) même si non exécuté |
| `Statements end firmly when he's sure, with a downward resolute drop` | Contraste avec upspeak — quand Pierrot est SÛR, sa voix devient ferme et descendante |
| `the kind of friend you can count on to notice when something is wrong` | Persona narrative T6 (loyauté + vigilance bienveillante) |

### Paramètres TTS Generation (à régler APRÈS création voice_id)

```
Stability: 0.65        ← plus stable que Raph (T6 moins expressif)
Similarity Boost: 0.70
Style: 0.25            ← bas (T6 ne sur-joue jamais, sincérité contenue)
Speaker Boost: true
```

---

## 🎬 Preview text v3 — à coller dans ElevenLabs Voice Design

> **Source canon** : [`../voix-meta/_PREVIEW-TEXTS.md`](../voix-meta/_PREVIEW-TEXTS.md) §Pierrot v2.
> **Version : v2 enrichie 2026-05-12** — 494 chars, 7 tags v3 (palette complète T6 avec rire obligatoire `[chuckles]`).

```
[hesitant] C'est sûr qu'on peut y aller ? [curious] Attends... t'as bien regardé le pont ? Y a une planche qui me dit pas trop quelque chose. [serious] Faut qu'on fasse attention là, c'est pas une blague. [softly] Vas-y doucement, hein. Pose le pied bien à plat. [pauses] Voilà... voilà comme ça. [chuckles] Bon ben tu vois, ça va, j'avais juste un peu peur. [happily] Moi je suis là, t'inquiète. S'il se passe un truc, je suis là. [playful] Et puis si on tombe, ben on tombera ensemble, hein !
```

**Palette couverte (7 tags v3)** :

| Tag | Position | Effet attendu |
|-----|----------|---------------|
| `[hesitant]` | « C'est sûr qu'on peut y aller ? » | Upspeak interrogatif T6 d'ouverture |
| `[curious]` | « Attends... t'as bien regardé le pont ? » | Accélération d'alerte vigilante |
| `[serious]` | « Faut qu'on fasse attention » | Gravité protectrice |
| `[softly]` | « Vas-y doucement, hein » | Douceur attentionnée, voix qui guide |
| `[pauses]` | « Voilà... voilà comme ça » | Respiration partagée |
| `[chuckles]` | « j'avais juste un peu peur » | **Rire de détente** mid-sentence après la tension |
| `[happily]` | « Moi je suis là, t'inquiète » | **Descente résolue** une fois rassuré |
| `[playful]` | « on tombera ensemble » | Humour nerveux complice T6 (fin) |

**Couverture** : arc complet T6 — tension/upspeak → alerte → gravité → douceur → rire de détente → fermeté loyale → humour complice.

**Paramètres UI** :
- Generate Preview Text → **OFF**
- Loudness → ~50%
- Guidance Scale → 35-40%

---

## ② Description publique Voice Library (à coller après création)

**Title** : `Lumi Pierrot Alert`

**Description FR/EN** : *(à rédiger avec skill impact après validation voix)*

---

## Signature vocale (résumé canon)

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Consonnes alertes · légèrement vigilantes · plosives nettes |
| **Prosodie** | Légère ouverture interrogative en fin de phrase incertaine · descendant ferme une fois sûr |
| **Rythme** | Variable · accélérations quand anxieux · ralentissements quand rassuré |
| **Phonation** | Upspeak discret sur doute · sourire audible quand rassuré · sincère franc |

---

## Phrases types (Pierrot)

- *"C'est sûr qu'on peut y aller ?"* (upspeak final, ton sincère interrogatif)
- *"Moi je suis là, t'inquiète."* (descendant, résolu — quand il est rassuré)
- *"Attends, attends — t'es sûr ?"* (accélération, répétition d'alerte)

---

## Langage naturel (4-6 ans)

> Tournures caractéristiques dérivées de Chabreuil. Côté lumière au premier plan — ombre à doser.

**Lumière** (perso épanoui, loyal et protecteur, garde le groupe soudé) :
- "On est ensemble."
- "Je reste là."
- "T'inquiète, je suis là."
- "C'est quoi le plan ?"

**Ombre** (réflexe automatique — anticipation du pire, doute) :
- "Et si ça marche pas ?"
- "T'es sûr ?"
- "On vérifie ?"
- "On sait jamais..."

---

## Tags writer ElevenLabs

> Pour les writers : balises à intégrer dans les dialogues/didascalies. Max 2-3 tags par phrase.

| Contexte | Tags | Exemple |
|---|---|---|
| Ton dominant (vigilance attentive) | `[hesitant]` · `[curious]` · `[apprehensive]` | `"- T'es sûr ? [hesitant]"` |
| Cherche confirmation | `[confirming tone]` · `[hesitates]` | `"- C'est bien par là ? [confirming tone]"` |
| Rassuré / loyal | `[softly]` · `[chuckles]` | `"- Moi je suis là. [softly]"` |
| Inquiet (voix basse) | `[whispers]` · `[sighs]` | `"- [whispers] Et si ça marche pas..."` |
| Ferme (quand sûr) | `[confident]` | `"- On y va. [confident]"` |

**Jamais** : `[shouts]` · `[excited]` seul · `[laughs]` franc non motivé
**Onomatopée signature** : "pfff" (soupir d'inquiétude soulagée — à utiliser avec parcimonie)

---

## Liens

- Caractère : [`caractere.md`](caractere.md)
- Relations : [`relations.md`](relations.md)
- Sensibilité : [`sensibilite.md`](sensibilite.md)
- Étude vocale source : [`../voix-meta/etude-vocale-par-type.md`](../voix-meta/etude-vocale-par-type.md) §Type 6
- Playbook prompting : [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md)
