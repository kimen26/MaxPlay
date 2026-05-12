---
role: narratrice
genre: F
voice_id_elevenlabs: aHKEGRjW94hqXc6gaItG   # Lumi - Singing, Tender, Lively (FR) — corrigé 2026-05-11 après inversion dans le message initial
voice_name_elevenlabs: Lumi - Singing, Tender, Lively
voice_workspace_elevenlabs: ElevenCreative
date_creation_voice: 2026-05-11
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
| **Preview text** | Bloc commun H/F dans [`_PREVIEW-TEXTS.md`](_PREVIEW-TEXTS.md#-narrateurs-h-et-f--phrase-commune-pour-comparer) (1er paragraphe de 001 + 2 tags v3) | Long, pertinent, tags v3 inclus pour tester émotion en même temps que timbre |
| **Generate Preview Text** | **OFF** ← important sinon ton preview est ignoré | UI piège |

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

## Prompt ElevenLabs (Voice Design) — v3.1 (Virginie Albanese — éveil musical + théâtre habité)

> **Référence sonore visée 2026-05-11** : **Virginie Albanese** — auteure-compositrice et intervenante musicale enfants à Gironde (« L'éveil en musique avec Virginie »). Comptines, onomatopées, gestes, présence pédagogique-chaleureuse-proche des enfants. **Voix chantante en parlant**, douce et claire, sait jouer onomatopées + ralentir-accélérer. Ajout MaxPlay : dynamique théâtre habité (mystère, tension légère, tendresse) + sans surjeu.
>
> Exemples sonores : [Les Maracas — comptine](https://www.youtube.com/watch?v=pro2hwgdJuM) · [Des bulles — comptine douce](https://www.youtube.com/watch?v=637MQpklHng) · [Petite fleur — comptine douce](https://www.youtube.com/watch?v=2cR3W_15JeU)

```
Native French. Female storyteller, early to mid thirties. Studio quality.
Persona: nurturing children's storyteller in the lineage of Virginie Albanese (éveil musical, comptines) — singular, warm, with slight singing lift in the speech. Emotion: alive, playful, capable of mystery, tenderness, and gentle wonder — between poetry, song, theater.
Bright clear mezzo with slight singing quality — distinctive timbre. Crisp articulate diction, words sound and dance. Dynamic range that lives the scene: accelerates on action, slows on sensory moments, near-whisper on mystery, lifts on revelation, softens on tenderness, can almost sing on rhymed moments. A clear smile inhabits the voice; eyes-wide curiosity rises naturally. Minimal audible breathing between phrases, clean delivery, never saccharine, no overacting. Signature tic: a soft chuckle slipping mid-sentence. Conveys the joy of awakening — present, warm, singing.
```

**Longueur** : 932 caractères ✅

**Changement v3.1 → v3 (2026-05-11 — Papa Yann a précisé sa référence)** :
- **Référence change** : Marlène Jobert (théâtre classique conte) → **Virginie Albanese** (éveil musical, comptines, intervention crèche/école)
- Persona : `theatrical storyteller` → `nurturing children's storyteller` (plus proche, pédagogique)
- Timbre : `resonant mezzo with warm chest depth` → `bright clear mezzo with slight singing quality` (plus haut, plus chantant)
- Ajout `**can almost sing on rhymed moments**` (héritage comptines)
- Ajout `**words sound and dance**` (au lieu de "resonate" — danser comme dans les comptines à gestes)
- Ajout `**between poetry, song, theater**` (3 registres au lieu de 2)
- Retiré respirations explicites (alignement avec H v3.1)
- Garde-fou `never saccharine, no overacting` maintenu

---

## Description publique (Voice Library ElevenLabs — limite 500 chars)

> **Pour publier la voix dans la Voice Library ElevenLabs.** Vendre la voix, **pas en donner la recette**. Aucun mot-clé technique reproductible (mezzo, chantant, pitch rise, atelier musical, etc.) — seulement du **bénéfice émotionnel** + **use cases**. Anti-copie strict.

### Version française (420 chars) — marché FR

```
La voix qui éveille en chantant. Une présence chaleureuse qui pose un mot comme on pose une main, qui fait sourire le silence et danser les images. Vous écoutez et vous redevenez l'enfant qui écoutait. Conçue pour les comptines, les contes doux, les livres illustrés 3-8 ans, les contenus éducatifs avec cœur. Une voix qui prend soin de ceux qui l'écoutent. Celle qu'on garde. Celle qu'on redemande au coucher.
```

### Version anglaise (380 chars) — marché international

```
The voice that awakens through song. A warm presence that places a word like one places a hand, makes silence smile and images dance. You listen and become the child who once listened. Made for nursery rhymes, soft tales, illustrated books for ages 3-8, gentle educational content. The voice that takes care of those who listen. The one you keep. The one they ask for at bedtime.
```

**Stratégie impact appliquée** (skill `impact` — accroche + storytelling) :
- **Hook bénéfice** : « éveille en chantant » / « awakens through song » (résultat, pas technique)
- **Image expérientielle** : « vous redevenez l'enfant qui écoutait » / « become the child who once listened » (régression bienveillante)
- **Métaphore tactile** : « pose un mot comme on pose une main » / « places a word like one places a hand »
- **Use cases listés** (seuls éléments concrets, OK car publics)
- **CTA via désir** : « celle qu'on redemande au coucher » / « ask for at bedtime » (situation de fidélité)

**Mots-clés volontairement absents (anti-copie)** :
- ❌ Pas de **mezzo / clear / bright / chantant / singing quality** (timbre)
- ❌ Pas de **chuchotement / comptine joueuse / accélération** (signature distinctive)
- ❌ Pas de **Virginie Albanese / éveil musical / atelier** (référence externe)
- ❌ Pas de **mielleuse / saccharine** (garde-fou interne révélateur)
- ❌ Pas de **eleven_v3 / Loudness / Guidance** (params techniques)

<details><summary>Archive — anciennes descriptions trop techniques (révélaient la recette)</summary>

**v1 FR (491 chars, abandonné — révélait mezzo, chantante, atelier musical, comptine joueuse)** :
> Narratrice française lumineuse et chantante, avec la chaleur d'un atelier musical jeunesse. Mezzo clair, agile, faite pour faire danser les mots — passe du chuchotement mystérieux à la comptine joueuse avec délicatesse. S'ouvre aux petites oreilles sans jamais devenir mielleuse, glisse un sourire dans une phrase, chante presque sur les moments joyeux. Parfaite pour comptines, contes doux, livres illustrés 3-8 ans, contenus éducatifs tendres. La voix de celle qui aime éveiller.

**v1 EN (489 chars, abandonné — révélait bright singing mezzo, music workshop, whispered mystery)** :
> A bright, singing French female narrator with the warmth of a children's music workshop. Clear mezzo, agile, made to make words dance — moves from whispered mystery to playful rhyme with care. She opens up to little ears without ever being saccharine, weaves a chuckle into a sentence, almost sings on the playful moments. Perfect for nursery rhymes, soft tales, illustrated books for ages 3-8, gentle educational content. The voice of someone who genuinely loves awakening young minds.

> Abandonnés 2026-05-11 — Papa Yann : *« j'aimerais pas donner tous les mots-clés pour refaire pareil »*. Pivot vers bénéfice émotionnel pur.

</details>

---

## Usages

- Texte narratif des histoires (hors dialogues personnages)
- Transitions entre scènes
- Voix de fin (conclusion, résolution)
- Descriptions sensorielles (nature, lieux, atmosphère)
