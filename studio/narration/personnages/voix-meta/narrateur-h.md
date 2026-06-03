---
role: narrateur
genre: M
voice_id_elevenlabs: cbRcktt2xvoeFpdvW2wg   # Lumi - Playful, Theatrical, Warm (FR) — corrigé 2026-05-11 après inversion dans le message initial
voice_name_elevenlabs: Lumi - Playful, Theatrical, Warm
voice_workspace_elevenlabs: ElevenCreative
date_creation_voice: 2026-05-11
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

## Prompt ElevenLabs (Voice Design) — v3 (théâtre habité, résonnant, fait sonner les mots)

> **Référence sonore visée** : Gérard Philipe racontant *Pierre et le Loup* (1956) — voix magique, intemporelle, parfaite diction, théâtre habité sans surjeu. Ajout v3 : **résonnance vocale** + **dynamique de jeu** (accélère, ralentit, plus fort, plus doux selon le moment). Le narrateur **vit la scène** même quand l'histoire est calme. **Aucun surjeu théâtre-école.**

```
Native French. Male storyteller, early thirties. Studio quality.
Persona: agile theatrical storyteller in the lineage of Gérard Philipe reading Pierre et le Loup — light, playful, between mischief and tenderness. Emotion: alive, curious, capable of suspense and quiet care — never grave, never scary.
Clear bright tenor with slight forward placement, light and agile — distinctive timbre. Crisp articulate diction, words made to sound and bounce. Dynamic range that lives the scene: accelerates on action, slows on sensory moments, near-whisper on mystery, softens on tenderness. Signature trait: a slight pitch rise on onomatopoeias and questions — the voice plays along with the story. A clear smile inhabits the voice; a hint of mischief in the corner. Minimal audible breathing between phrases, clean delivery, no fry, no overacting. Signature tic: a soft chuckle slipping mid-sentence. Conveys the joy of telling — playful even in suspense.
```

**Longueur** : 957 caractères ✅

**Changement v4 → v3.1 (2026-05-11 — Papa Yann : « moins résonnant, moins grave, ça fait peur, plus fun, unique sans être chiant »)** :
- **Âge** : `mid to late thirties` → `early thirties` (plus jeune, moins grave)
- **Timbre** : `resonant baritone with warm chest depth` → `clear bright tenor with slight forward placement, light and agile` (haut, léger, accessible — pas effrayant)
- **Persona** : `theatrical storyteller — singular, resonant, between poetry and theater` → `agile theatrical storyteller — light, playful, between mischief and tenderness` (malice + tendresse au lieu de poésie+théâtre lourd)
- **Émotion** : `tension, mystery, quiet tenderness` → `suspense and quiet care — never grave, never scary` (garde-fou explicite contre l'effrayant)
- **Signature distinctive ajoutée** : `**a slight pitch rise on onomatopoeias and questions — the voice plays along with the story**` (trait unique reconnaissable — voix qui joue avec le texte sur Clac/Houlou/questions)
- **Mots qui bougent** : `words made to sound and resonate` → `words made to sound and bounce` (rebondir au lieu de résonner — plus léger)
- **Trait fun** : ajout `a hint of mischief in the corner` (malice discrète)
- **Conclusion** : `joy of telling — hears every word land before saying the next` → `joy of telling — playful even in suspense` (rappelle Pierre et le Loup : suspense joué avec malice)

**Ce qui a changé vs v2** (raison : Papa Yann 2026-05-11 — v2 trop léger tenor, pas assez résonnant, jeu de scène pas assez explicite) :
- `early thirties` → **mid to late thirties** (un peu plus mature, plus grave)
- `clear lyrical tenor with bright forward placement, never heavy` → **resonant baritone with warm chest depth and a slight bright forward placement** (gravité résonnante, pas pesante)
- Ajout **words made to sound and resonate** (fait sonner et résonner les mots — demande explicite Papa Yann)
- Ajout **Dynamic range that lives the scene: accelerates on action, slows on sensory moments, drops to near-whisper on mystery, lifts on revelation, softens on tenderness** (jeu de lecteur 5 modes)
- Ajout **between poetry and theater** (positionnement entre 2 registres)
- Ajout **fills the room without weight** + **the kind that makes you lean in** (présence captivante)
- Ajout **hears every word land before he says the next** (comprend le texte avant de le dire)
- **Aucun surjeu théâtre-école** maintenu (garde-fou)

---

## Description publique (Voice Library ElevenLabs — limite 500 chars)

> **Pour publier la voix dans la Voice Library ElevenLabs.** Vendre la voix, **pas en donner la recette**. Aucun mot-clé technique reproductible (ténor, mezzo, pitch rise, théâtre habité, onomatopée, malice, etc.) — seulement du **bénéfice émotionnel** + **use cases**. Anti-copie strict.

### Version française (446 chars) — marché FR

```
La voix qui fait briller les histoires d'enfants. Tendre quand il faut, complice toujours, elle danse entre les mots et désarme par sa malice. Vous fermez les yeux et l'histoire commence à exister autour de vous. Conçue pour les livres audio jeunesse, les contes illustrés, les courts métrages d'animation, les applis de lecture interactive. Une voix qui sait être l'ami de l'enfant qui écoute. Celle qu'on retient. Celle qu'on redemande.
```

### Version anglaise (402 chars) — marché international

```
The voice that brings children's stories alive. Tender when it must be, always complicit, it dances between words with disarming mischief. You close your eyes and the story begins to exist around you. Made for children's audiobooks, illustrated tales, animated shorts, interactive read-along apps. The voice that becomes the listening child's friend. The one they remember. The one they ask for again.
```

**Stratégie impact appliquée** (skill `impact` — accroche + storytelling) :
- **Hook bénéfice** : « fait briller les histoires » / « brings stories alive » (résultat, pas technique)
- **Image expérientielle** : « vous fermez les yeux et l'histoire commence à exister autour de vous »
- **Use cases listés** (seuls éléments concrets, OK car publics)
- **Garde-fou anti-creux** : « celle qu'on retient, celle qu'on redemande » (satisfaction implicite)
- **CTA via désir** : on veut écouter, on ne sait pas pourquoi techniquement → mystère vendeur

**Mots-clés volontairement absents (anti-copie)** :
- ❌ Pas de **ténor / baritone / mezzo / clear bright** (timbre)
- ❌ Pas de **pitch rise / onomatopée / question** (signature distinctive)
- ❌ Pas de **théâtre habité / poésie / malice** comme termes techniques
- ❌ Pas de **Gérard Philipe / Pierre et le Loup / MaxPlay / Wex / Max**
- ❌ Pas de **eleven_v3 / Loudness / Guidance** (params techniques)

→ Un concurrent lit, ne voit qu'une **promesse émotionnelle**, n'a aucune piste pour reproduire la voix.

<details><summary>Archive — anciennes descriptions trop techniques (révélaient la recette)</summary>

**v1 FR (490 chars, abandonné — révélait ténor, malice, onomatopées, pitch rise sur questions)** :
> Narrateur français vif et lumineux qui vit chaque mot. Ténor léger, malice à la lisière, fait pour vibrer dans les histoires d'enfants. Il passe du suspense à la tendresse avec un théâtre habité — joue avec les onomatopées, fait monter sa voix sur les questions comme s'il la trouvait avec vous. Aucun ton lourd, juste la joie de raconter. Parfait pour livres audio jeunesse 4-12 ans, contes illustrés, courts d'animation, applis de lecture. La voix qui fait tendre l'oreille.

**v1 EN (485 chars, abandonné — révélait light tenor, mischief, onomatopoeias, lifts on questions)** :
> A bright, agile French male narrator who lives every word. Light tenor, mischief in the corner of every sentence, made to bring children's stories alive. He hops from suspense to tenderness with theatrical care — plays with onomatopoeias, lifts on questions like he's discovering the answer with you. No grave overtones, just the joy of telling. Perfect for children's audiobooks (4-12), illustrated tales, animated shorts, read-along apps. The kind of voice that makes you lean in.

> Abandonnés 2026-05-11 — Papa Yann : *« j'aimerais pas donner tous les mots-clés pour refaire pareil, on est là pour vendre la voix, pas la définir entièrement »*. Pivot vers bénéfice émotionnel pur.

</details>

---

## Usages

- Texte narratif des histoires (hors dialogues personnages)
- Transitions entre scènes
- Voix de fin (conclusion, résolution)
- Descriptions sensorielles (nature, lieux, atmosphère)
