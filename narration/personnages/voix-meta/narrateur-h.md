---
role: narrateur
genre: M
voice_id_elevenlabs: null   # à remplir après création Voice Design (cf. VOIX-002 backlog)
date_creation_voice: null
modele_creation: eleven_multilingual_v2
modele_production: eleven_v3
---

# Narrateur — Voix générale (H)

> Voix qui raconte — pas un personnage, mais celui qui porte l'histoire.

---

## Rôle éditorial

Le narrateur n'est pas lié à un ennéatype. Il est la présence solide et chaleureuse qui ouvre le monde, accompagne l'action, et pose les ancres entre les scènes. Il doit pouvoir aller de la douceur nocturne au tempo de l'aventure, du murmure au moment fort — avec toujours une gravité tranquille qui inspire confiance.

**Public cible :** 3–9 ans. La voix doit être rassurante pour un enfant de 4 ans et engageante pour un enfant de 9 ans.

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Consonnes pleines et posées · B, D, G légèrement pondérés (présence, pas autorité) · R semi-roulé discret · S propre |
| **Prosodie** | Cadences descendantes rassurantes · légère montée sur le mystère · jamais plat · toujours résolu en fin de phrase-clé |
| **Rythme** | Lent à moyen · pauses habitées · jamais pressé · chaque image a le temps d'exister |
| **Phonation** | Voix baryton chaleureuse · résonance thoracique douce · pas de fry · légère présence soufflée dans les moments intimes |

---

## ① Voice Design — création voice_id (UI ElevenLabs, modèle `eleven_multilingual_v2`)

> Paramètres **visibles dans l'UI Voice Design** au moment de la création.

| Paramètre | Valeur | Pourquoi |
|-----------|--------|----------|
| **Prompt** | (voir ci-dessous, 770 chars) | Décrit la voix |
| **Loudness** | Slider ~50% (milieu) | Voix narrative pas saturée |
| **Guidance Scale** | **30-40 %** | Priorité fidélité au prompt (timbre stable et reproductible — critique pour un narrateur) |
| **Generate Preview Text** | ON | Tester en preview avant sauvegarde |
| **Preview text** | Phrase complète FR (ex : « Le printemps avait mis de la mousse tendre sur les pierres du sentier. ») | Long, pas abrupt — best practices |

**Procédure** :
1. Coller le prompt ci-dessous dans Voice Design
2. Régler Loudness milieu + Guidance Scale 30-40%
3. Générer **3 previews** (chaque génération diffère)
4. Garder la meilleure → sauvegarder → noter `voice_id_elevenlabs` dans le frontmatter

---

## ② TTS Generation — utilisation voice_id (API, modèle `eleven_v3` recommandé)

> Paramètres réglés **APRÈS création**, au moment de générer l'audio (via MCP `mcp__llm-copains__tts_elevenlabs`).

```
Stability: 0.55
Similarity Boost: 0.80
Style: 0.20
Speaker Boost: false
```

**Workflow recommandé v2 → v3** (cf. skill `elevenlabs-voice-design` §10) :
- Création voice_id en `eleven_multilingual_v2` ← étape ① (stable, reproductible)
- Production audio en `eleven_v3` ← étape ② (alpha, audio tags inline pour émotion fine)
- Le `voice_id` est **indépendant du moteur** — on crée en v2 et on exploite en v3

**Audio tags v3 inline dans le texte** (mapping didascalies FR → tags) :

| Didascalie writer FR | Tag v3 |
|---------------------|--------|
| `*(en chuchotant)*` | `[whispers]` |
| `*(doucement)*` `*(tout doux)*` | `[softly]` |
| `*(en riant)*` `*(rire)*` | `[laughs]` |
| `*(soupir)*` | `[sighs]` |
| `*(curieux)*` | `[curious]` |
| `*(calme)*` | `[calm]` |
| `*(pause)*` ou `*(...)*` | `[pauses]` |

→ Mapping complet (20 didascalies) dans le skill `elevenlabs-voice-design` §11 + dans [`_CHEATSHEET-WRITERS.md`](_CHEATSHEET-WRITERS.md).

---

## Prompt ElevenLabs (Voice Design)

> Native French. Male narrator, late thirties. Studio quality.
> Persona: warm bedtime-story father for children aged 3 to 9. Emotion: trustworthy, grounded, wondering.
> Warm baritone with gentle chest resonance, grounded but unhurried. Full carefully-placed consonants — B, D, G with just enough weight to feel present without authority, clean S with no sibilant excess, semi-soft R with a hint of roll, never theatrical. Open sustained vowels. Gentle narrative arcs: lift on wonder and mystery, calm resolving drop at key closures. Medium-slow real storytelling pace with genuine breath pauses, each image landing fully before the next. Light natural breathiness on intimate passages, no fry, no roughness — just depth. Micro-pause before important words. Trustworthy wonder — someone who has seen many things and finds them all worth sharing.

---

## Usages

- Texte narratif des histoires (hors dialogues personnages)
- Transitions entre scènes
- Voix de fin (conclusion, résolution)
- Descriptions sensorielles (nature, lieux, atmosphère)
