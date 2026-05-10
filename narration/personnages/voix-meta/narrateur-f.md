---
role: narratrice
genre: F
voice_id_elevenlabs: null   # à remplir après création Voice Design (cf. VOIX-002 backlog)
date_creation_voice: null
modele_creation: eleven_multilingual_v2
modele_production: eleven_v3
---

# Narratrice — Voix générale (F)

> Voix qui raconte — pas un personnage, mais celle qui porte l'histoire.

---

## Rôle éditorial

La narratrice n'est pas liée à un ennéatype. Elle est la présence bienveillante qui pose le décor, guide l'auditeur, et habite les transitions entre les scènes. Elle doit pouvoir passer de la douceur au suspense, de l'émerveillement à la résolution — sans jamais être ni trop lisse ni trop dramatique.

**Public cible :** 3–9 ans. La voix doit être compréhensible pour un enfant de 4 ans et captivante pour un enfant de 9 ans.

---

## Signature vocale

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Consonnes claires et bienveillantes, jamais sèches · M et N résonants · S doux · chaque mot articulé sans effort apparent |
| **Prosodie** | Légère ondulation narrative (monte sur le mystère, descend sur la résolution) · fins de phrases apaisantes · jamais monotone |
| **Rythme** | Lent à moyen · pauses aux moments clés · respiration visible · laisse le silence exister |
| **Phonation** | Voix modale avec micro-chaleur soufflée · sourire discret dans la voix · jamais forcé |

---

## ① Voice Design — création voice_id (UI ElevenLabs, modèle `eleven_multilingual_v2`)

> Paramètres **visibles dans l'UI Voice Design** au moment de la création.

| Paramètre | Valeur | Pourquoi |
|-----------|--------|----------|
| **Prompt** | (voir ci-dessous, 744 chars) | Décrit la voix |
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
Style: 0.25
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

> Native French. Female narrator, mid-thirties. Studio quality.
> Persona: kind storytelling librarian for children aged 3 to 9. Emotion: warm, curious, unhurried.
> Warm clear mezzo timbre with gentle chest resonance, naturally bright but never rushed. Clean unhurried consonants — warmly voiced M and N, soft S with no edge, rounded releases. Full open vowels, never clipped. Gentle narrative arcs: a slight rise on wonder and mystery, a soft grounding drop on resolution. Medium-slow pacing with genuine breath pauses; silence is her friend. Light natural breathiness, the warmth of a trusted adult, never saccharine. Micro-lingering on evocative nouns. Conveys safe curiosity — someone who knows a wonderful secret and shares it gently.

---

## Usages

- Texte narratif des histoires (hors dialogues personnages)
- Transitions entre scènes
- Voix de fin (conclusion, résolution)
- Descriptions sensorielles (nature, lieux, atmosphère)
