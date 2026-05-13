---
role: perso
type: 7
genre: F
prenom: Raph
voice_id_elevenlabs: Te5RKnm9ebwdEvZ1S5pS
voice_name_elevenlabs: Lumi Raph Pétillante
voice_name_elevenlabs_en_archive: Lumi Raph Bubbly  # version EN initiale 2026-05-12, renommée FR-first 2026-05-12
voice_workspace_elevenlabs: ElevenCreative
date_creation_voice: 2026-05-12
modele_creation: eleven_multilingual_v2
modele_production: eleven_v3
prompt_version_utilise: v1
description_fr_publiee: 490 chars
description_en_publiee: 462 chars
test_lisp_2026-05-12: KO (verbatim Papa Yann "elle ne zozote pas")
---

# Voix Raph — Type 7 (L'Enthousiaste)

**Ennéatype :** Enthousiaste · **Sensibilité :** Cosmos · **Astre :** Jupiter
**Surnom canon :** Raph (Raphaëlle)

---

## ① Voice Design (création voice_id) — Prompt v1 (2026-05-12)

> **Approche** : template cartoon character (validé sur Wex) + signature prosodique T7 (cf. `etude-vocale-par-type.md`) + test descripteur d'effet `slight childlike lisp` pour valider/invalider partiellement l'anti-pattern #6 du playbook.
>
> **Nom Voice Library** : `Lumi Raph Bubbly` (convention famille Lumi validée 2026-05-11).

### Prompt à coller dans ElevenLabs Voice Design (912 chars)

```
Native French. Female, young adult bubbly cartoon character voice — high-pitched, bright, airy, French animation style. Studio quality.
Persona: pétillante enthusiast — eager explorer, eyes wide, words bouncing out faster than she can plan them. Emotion: joyful, excited, optimistic, contagious delight.
Bright airy mezzo-soprano with smile in every word. Light dancing plosives like little bubbles. Luminous open vowels. Multiple melodic peaks per sentence — phrase endings often rise or stay suspended in curiosity. Fast pace with bursts of syllables, accelerates when excited, idea-stacking on a single breath. Spontaneous half-laughs slipping between words. Slight childlike lisp on sibilants (gentle, charming, not impeding). Statements may end with an excited little jump. Minimal breathing pauses, no fry. Conveys boundless cheerful momentum — the joy of someone who finds the world endlessly fascinating.
```

### Notes de design

| Élément | Raison |
|---------|--------|
| `young adult bubbly cartoon character voice` | Template **Plan A officiel** ElevenLabs (voix d'enfant via adulte cartoon) — passe le filtre |
| `French animation style` | Référence stylistique reconnue par le moteur, plus large que Sangoku/Naruto (qui sont masculins) |
| `bright airy mezzo-soprano` | Tessiture T7 fille |
| `light dancing plosives like little bubbles, luminous open vowels` | Articulation T7 du §etude-vocale-par-type.md |
| `multiple melodic peaks per sentence, phrase endings often rise or stay suspended` | Prosodie T7 |
| `fast pace with bursts of syllables, idea-stacking on a single breath` | Rythme T7 (rafales, enthousiasme) |
| `spontaneous half-laughs slipping between words` | Signature T7 (sourire audible permanent) |
| **❌ `Slight childlike lisp on sibilants (gentle, charming, not impeding)`** | **Test 2026-05-12 → résultat KO** (verbatim Papa Yann : « NON ELLE NE ZOZOTE PAS »). Anti-pattern #6 confirmé : même les descripteurs de défauts sonores réels ne sont pas exécutés. À RETIRER pour v2 (inutile, pollue le prompt). Voir `_PROMPTING-GUIDE.md` §VERDICT TEST 2026-05-12 |
| `Statements may end with an excited little jump` | Signature spécifique Raph (« Allez ! » qui saute en finale) |
| `no fry` | Pas de friture vocale (incompatible avec enfant pétillante) |

### Paramètres TTS Generation (à régler APRÈS création voice_id)

```
Stability: 0.45        ← bas pour expressivité maximale
Similarity Boost: 0.70
Style: 0.65            ← haut pour amplifier signature pétillante
Speaker Boost: true
```

---

## ② Description publique Voice Library (à coller après création)

**Title** : `Lumi Raph Bubbly`

**Description FR (à remplir après test voice)** : *(à rédiger avec skill impact après validation voix)*

**Description EN (à remplir après test voice)** : *(à rédiger avec skill impact après validation voix)*

---

## Signature vocale (résumé canon)

| Couche | Paramètre |
|--------|-----------|
| **Articulation** | Plosives légères et dansantes · voyelles lumineuses · énergie dans la bouche |
| **Prosodie** | Pics mélodiques multiples · fin de phrase souvent montante ou suspendue |
| **Rythme** | Rapide · rafales de syllabes · accélère quand excité |
| **Phonation** | Sourire audible · demi-rire spontané · voix portée vers le haut |
| **🆕 Test** | Léger lisp enfantin sur sibilantes (à valider à l'écoute) |

---

## Phrases types (Raph) — pour preview text

- *"Oh mais c'est trop bien ça !"* (pic sur "trop", sourire audible)
- *"Et ensuite — et ensuite — on pourrait aussi..."* (rafale, accélération, idea-stacking)
- *"Allez, on y va, ça va être génial !"* (montée finale, entrain, jump final)

---

## 🎬 Preview text v3 — à coller dans ElevenLabs Voice Design

> **Source canon** : [`../voix-meta/_PREVIEW-TEXTS.md`](../voix-meta/_PREVIEW-TEXTS.md) §Raph v2.
> **Version : v2 enrichie 2026-05-12** — 522 chars, 7 tags v3 (palette complète T7 avec rire `[laughs]` + `[giggles]` obligatoires).

```
[excited] Oh mais c'est trop bien ça ! [laughs] T'as vu la grenouille — elle a sauté direct dans l'eau ! [happily] Et ensuite — et ensuite — on pourrait grimper sur le rocher là-bas, et après on cherche des pissenlits, et après on souffle dessus pour faire des petites étoiles partout ! [curious] Tu crois qu'elles vont jusqu'où les graines ? [softly] Moi je trouve ça doux quand le vent les emporte. [giggles] Hihi regarde, y en a une qui m'a chatouillé le nez ! [playful] Bon allez, on y va, on y va, ça va être génial !
```

**Palette couverte (7 tags v3)** :

| Tag | Position | Effet attendu |
|-----|----------|---------------|
| `[excited]` | « Oh mais c'est trop bien » | Ouverture énergie haute, pic sur « trop » |
| `[laughs]` | « T'as vu la grenouille » | **Rire franc** sur la surprise joyeuse |
| `[happily]` | « Et ensuite — et ensuite » | Idea-stacking en mode positif |
| `[curious]` | « Tu crois qu'elles vont jusqu'où » | Exploration vocale curieuse |
| `[softly]` | « Moi je trouve ça doux » | **Contemplation tendre** (test : Raph sait-elle ralentir ?) |
| `[giggles]` | « y en a une qui m'a chatouillé le nez » | **Rire enfantin spontané** |
| `[playful]` | « Bon allez, on y va » | Retour énergie, montée finale jump |

**Couverture** : la voix doit alterner **rafale énergie** (excited + happily) ↔ **moments doux** (softly + curious) sans rupture, et **2 types de rires distincts** (`[laughs]` franc + `[giggles]` enfantin).

**Note** : laisser **Generate Preview Text OFF** dans l'UI ElevenLabs. Loudness ~50%, Guidance Scale 35-40%.

---

## Langage naturel (4-6 ans)

> Tournures caractéristiques dérivées de Chabreuil. Côté lumière au premier plan — ombre à doser.

**Lumière** (perso épanoui, enthousiasme contagieux, voit les possibles) :
- "J'ai une idée !"
- "Et après on fait quoi ?!"
- "C'est trop bien !"
- "Et aussi !"
- "Imagine si..."

**Ombre** (réflexe automatique — fuite de l'ennui, accumulation d'idées) :
- "C'est trop long..."
- "J'en ai marre."
- "On fait autre chose ?"

---

## Tags writer ElevenLabs

> Pour les writers : balises à intégrer dans les dialogues/didascalies. Max 2-3 tags par phrase.

| Contexte | Tags | Exemple |
|---|---|---|
| Ton dominant (énergie pétillante) | `[excited]` · `[quickly]` · `[playful]` · `[bouncy]` | `"- J'ai une idée ! [excited]"` |
| Joie débordante | `[cheerful]` · `[enthusiastic]` · `[yahoo]` | `"- C'est trop bien ! [yahoo]"` |
| Rire / joie | `[laughs]` · `[giggles]` | `"- [laughs] T'as vu ça ?!"` |
| Idée nouvelle (révélation) | `[gasps]` | `"- [gasps] Et si on..."` |
| Moment doux (rare) | `[softly]` · `[curious]` | `"- Tu crois qu'elles vont où ? [curious]"` |

**Jamais** : `[slowly]` · `[serious]` soutenu · `[wistful]` · `[sighs]` prolongé
**Onomatopée signature** : "ouhou !" (joie pure — à signaler en note d'intention si utilisée)

---

## Liens

- Caractère : [`caractere.md`](caractere.md)
- Relations : [`relations.md`](relations.md)
- Sensibilité : [`sensibilite.md`](sensibilite.md)
- Étude vocale source : [`../voix-meta/etude-vocale-par-type.md`](../voix-meta/etude-vocale-par-type.md) §Type 7
- Playbook prompting : [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md)
