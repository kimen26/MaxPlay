---
role: perso
type: hors-système
genre: M
voice_id_elevenlabs: MvACGLim6BRvCWyH21A6
voice_name_elevenlabs: Lumi Wex Rêveur
voice_name_elevenlabs_en_archive: Lumi Wex Playful  # version EN initiale 2026-05-11, renommée FR-first 2026-05-12
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

## ② Paramètres TTS Generation (utilisation voice_id, modèle `eleven_v3`)

> ⚠️ Ces 4 paramètres se règlent **APRÈS** création du voice_id. Pour la création, voir [`../voix-meta/_PROMPTING-GUIDE.md`](../voix-meta/_PROMPTING-GUIDE.md) (Voice Design ① : Loudness, Guidance Scale 30-40%).
>
> Voice_id à créer une fois (cf. backlog VOIX-003) puis stocker dans le frontmatter du fichier.

```
Stability: 0.68
Similarity Boost: 0.72
Style: 0.18
Speaker Boost: false
```

## Prompt ElevenLabs (Voice Design) — v19 (descripteurs anglais selon doc officielle EL)

> **v19 (2026-05-11, soir tard)** : après vérif doc officielle ElevenLabs, **l'IPA et les phoneme tags ne sont PAS supportés en Voice Design**. Sources :
> - [Voice Design — Best Practices](https://elevenlabs.io/docs/eleven-creative/voices/voice-design) : recommande descripteurs anglais riches, déconseille « accent » au sens intonation
> - [Pronunciation help center](https://help.elevenlabs.io/hc/en-us/articles/16712320194577) : phoneme tags IPA/CMU **English only** + uniquement `eleven_flash_v2` les lit. Tous les autres modèles les **ignorent silencieusement**
> - [Pronunciation dictionaries cookbook](https://elevenlabs.io/docs/cookbooks/text-to-speech/pronunciation-dictionaries) : pour FR/non-EN, seuls les **alias tags** fonctionnent (à la génération TTS, **pas** en Voice Design)
>
> **Stratégie v19 corrigée** :
> - **Création de voix (ce fichier)** : descripteurs anglais naturels riches uniquement
> - **Production audio future** (voice-director EP-026) : alias tags pour forcer « huit » → « ouitte » dans le script si voice design ne suffit pas
>
> **Tics phonétiques en descripteurs anglais (pas IPA)** :

```
Native French. Male, young adult squeaky and playful character voice — high-pitched, bright, light, French Sangoku or Naruto cartoon style. Studio quality.
Persona: cheerful absent-minded dreamer with gentle bright energy — easily distracted, often drifting, always smiling. Emotion: dreamy, playful.
Clear bright high timbre, smile in every word. Articulate but tangled when excited. Childlike softening of "j" — blurs toward "z" or "s" hiss. Repeats first syllable 2-3 times when excited ("le-le-le bus !"). Statements end on low falling cadence (never upspeak). Questions follow a Franche-Comté/Swiss melody: pitch rises then gently falls, slight lengthening on second-to-last syllable. Soft bursts, sudden pauses. Faint whistle on "s" and "ch" — tiny air leak, hissy (not a lisp). Brazilian-Portuguese flavor: drops the y-glide so "huit" sounds like English "weet"; inserts a short "eh" before s-clusters ("stylo" → "eh-stylo"). Light — 1/3-4 phrases. Other tics: giggle, wonder-gasp.
```

**Longueur** : 988 caractères ✅

**Notation v19 vs v18 (correction stratégique)** :

| Tic | v18 IPA (non-supporté en Voice Design) | v19 descripteurs anglais (doc-compliant) |
|-----|-----------------------------------------|------------------------------------------|
| Tic 2 (é-stylo) | `/e/ before "s+consonant" ("stylo" → /e.sti.lo/)` | `inserts a short "eh" before s-clusters ("stylo" → "eh-stylo")` |
| Tic 3 (huit) | `"huit" pronounced /wit/ instead of /ɥit/` | `drops the y-glide so "huit" sounds like English "weet"` |
| Tic 4 (je → ze/se) | `Unstable /ʒ/: French "je" (/ʒə/) drifts to /zə/ or /sə/` | `Childlike softening of "j" — blurs toward "z" or "s" hiss` |
| Tic 7 (mélodie FR-Comté) | `pitch rises then gently falls, slight lengthening on penultimate syllable` | `pitch rises then gently falls, slight lengthening on second-to-last syllable` |
| Tic 1, 5, 6 | déjà OK | (inchangés) |

**Pourquoi ces formulations** :
- `softens the "j" sound to "z" or "s" hiss` = pattern de **softening** des consonnes (terme technique vocal anglais)
- `drops the y-glide` = `/ɥ/` français = semi-voyelle décrite comme « y-glide » en anglais (terme phonétique standard)
- `inserts a short "eh"` = transcription anglaise du son `/e/` (`eh` se lit en anglais comme `é` en français)
- `second-to-last syllable` = « avant-dernière syllabe » en anglais courant (plus sûr que « penultimate » qui peut être ambigu pour le moteur)

---

<details><summary>v18 (IPA — non-supporté en Voice Design selon doc officielle, gardée pour traçabilité)</summary>

## Prompt ElevenLabs (Voice Design) — v18 (IPA + transcription anglaise pour sonorités explicites)

> **v18 (2026-05-11, soir)** : Papa Yann observe que v17 ne produisait pas les tics phonétiques (ni le `ouit`, ni le `je → ze`). **Diagnostic** : ElevenLabs lit le prompt comme un anglophone — `"huit" as "ouit"` était illisible pour lui (il ne sait pas comment se prononce "ouit" en FR).
>
> **Fix v18** : tous les tics phonétiques sont maintenant écrits en **notation IPA** doublée de **transcription anglaise** quand critique. Ce que le moteur comprend :
> - ✅ Symboles IPA standard (/ʒ/, /e/, /wi/, /ɥ/) — supportés officiellement par ElevenLabs
> - ✅ Transcriptions phonétiques anglaises ("zhuh", "weet", "ay-stylo")
> - ❌ Graphies françaises ("ouit", "éstylo") lues à l'anglaise → inopérantes

```
Native French. Male, young adult squeaky and playful character voice — high-pitched, bright, light, French Sangoku or Naruto cartoon style. Studio quality.
Persona: cheerful absent-minded dreamer with gentle bright energy — easily distracted, often drifting, always smiling. Emotion: dreamy, playful.
Clear bright high timbre with smile in every word. Articulate but tangled when excited. Unstable /ʒ/: French "je" (/ʒə/) drifts to /zə/ or /sə/. When excited, repeats first syllable 2-3 times ("le-le-le bus !"). Statements end on low falling cadence (never upspeak). Questions follow a subtle Franche-Comté/Swiss melody: pitch rises then gently falls, slight lengthening on penultimate syllable. Pacing: soft bursts, sudden pauses. Signature: faint whistle on "s" and "ch" — tiny air leak (not a lisp). Brazilian-Portuguese flavor: "huit" pronounced /wit/ (English "weet") instead of /ɥit/; inserts /e/ before "s+consonant" ("stylo" → /e.sti.lo/). Light — 1/3-4 phrases. Other tics: giggle, wonder-gasp.
```

**Longueur** : 997 caractères ✅

**Notation phonétique v18 (différences vs v17)** :

| Tic | v17 (graphie FR — ne marchait pas) | v18 (IPA + EN — devrait marcher) |
|-----|-------------------------------------|----------------------------------|
| Tic 2 (é-stylo) | `/e/ before "s+consonant" ("é-stylo")` | `inserts /e/ before "s+consonant" ("stylo" → /e.sti.lo/)` |
| Tic 3 (ouit) | `"huit" as "ouit"` | `"huit" pronounced /wit/ (English "weet") instead of /ɥit/` |
| Tic 4 (je → ze/se) | `"je" drifts to "ze" or "se" (unstable /ʒ/)` | `Unstable /ʒ/: French "je" (/ʒə/) drifts to /zə/ or /sə/` |
| Tic 1, 5, 6, 7 | déjà OK | (inchangés — termes anglais standards) |

**Pourquoi ces notations** :
- `/ʒə/` = symbole IPA officiel du son `je` français. ElevenLabs sait que c'est le `j` du français (cf. doc officielle IPA support)
- `/zə/` et `/sə/` = symboles IPA des dérives (`z` doux et `s` doux)
- `/wit/` accompagné de `(English "weet")` = double sécurité, l'anglais "weet" rime avec "feet" en anglais — sonorité claire
- `/ɥit/` = IPA du `huit` français standard (/ɥ/ est la semi-voyelle française "ui")
- `"stylo" → /e.sti.lo/` = le mot français déformé en 3 syllabes avec /e/ initial ajouté

> **Erratum 2026-05-11 soir** : après vérif doc officielle, l'IPA n'est PAS supporté dans le prompt Voice Design ElevenLabs (uniquement à la génération TTS, et uniquement en EN sur `eleven_flash_v2`). Cette v18 est gardée pour traçabilité — utiliser v19 qui repose sur descripteurs anglais doc-compliant.

</details>

---

<details><summary>v17 (graphie FR sans IPA — tics non rendus)</summary>

## Prompt ElevenLabs (Voice Design) — v17 (cartoon character + 7 tics signature + énergie baissée)

> **v17 (2026-05-11, soir)** : v16 + ajout **7ème tic prosodique franc-comtois/suisse romand** sur les questions (intonation montée-descente arrondie, légère pénultième allongée) + **énergie globale baissée** (rêveur dominant > fun explosif). Papa Yann : *« il a un peu du territoire de belfort/suisse sur ses questions, l'intonation est rigolote mais très subtil. On peut baisser un peu son énergie. »*
>
> **Les 7 tics canon Wex** :
>
> | # | Tic | Comment ça sonne | Fréquence | Origine |
> |---|-----|------------------|-----------|---------|
> | 1 | **Sifflement léger sur `s` et `ch`** | Petite fuite d'air audible (pas un zézaiement) | **Constant** | Physiologique (dents de lait + écho lusophone) |
> | 2 | **`é` parasite devant S+consonne** | "un éstylo", "un éscargot" | 1/3-4 phrases | PT BR : *estilo, escargot* |
> | 3 | **`ouit` au lieu de `huit`** | tous les -uit en -wi | 1/3-4 phrases | PT BR (pas de /ɥ/) |
> | 4 | **`je` instable** mixé `se / ze / je` | "se sais pas", "ze veux", "je vais" | Variable | Articulation enfantine (/ʒ/ pas figé) |
> | 5 | **Bégaiement quand excité** | reprise 1ère syllabe 2-3× : "le-le-le bus !" | Pics d'excitation uniquement | Max IRL |
> | 6 | **Affirmations : fin en intonation BASSE** | descente prosodique, jamais upspeak — il affirme | **Constant** sur statements | Max IRL |
> | 7 | **🆕 Questions : mélodie franc-comtoise/suisse** | montée puis redescente arrondie + légère pénultième allongée ("tu vienssss-tu ?") | **Constant** sur questions | Origine géographique (Belfort/Suisse romande) |
>
> **Compatibilité tic #6 / tic #7** : pas de conflit — #6 concerne les **affirmations**, #7 les **questions**. Wex affirme bas mais questionne avec une mélodie reconnaissable. C'est ce contraste qui rend la voix « rigolote » à l'oreille.
>
> **Énergie ajustée v17** : on a retiré `unfiltered energy` + `vividly expressive` + `lively bursts` → remplacés par `gentle bright energy` + `dreamy, playful` + `soft bursts`. Rêveur > explosif.
>
> **Encodage canonique = prompt vocal uniquement.** Les writers continuent d'écrire en FR standard. C'est la voix + le voice-director qui ajoutent les tics à la lecture audio.

```
Native French. Male, young adult squeaky and playful character voice — high-pitched, bright, light, French Sangoku or Naruto cartoon style. Studio quality.
Persona: cheerful absent-minded dreamer with gentle bright energy — easily distracted, often drifting, always smiling. Emotion: dreamy, playful.
Clear bright high timbre with smile in every word. Articulate but tangled when excited. Childlike articulation: "je" drifts to "ze" or "se" (unstable /ʒ/). When excited, repeats first syllable 2-3 times ("le-le-le bus !"). Statements end on low falling cadence (never upspeak). Questions follow a subtle Franche-Comté/Swiss-Romand melody: pitch rises then gently falls, slight lengthening on penultimate syllable. Pacing: soft bursts, sudden pauses. Signature: faint whistle on "s" and "ch" — tiny air leak, hissy (not a lisp). Brazilian-Portuguese flavor: /e/ before "s+consonant" ("é-stylo"), "huit" as "ouit". Light — 1/3-4 phrases. Other tics: giggle, soft wonder-gasp on discoveries.
```

**Longueur** : 989 caractères ✅

**Éléments-clés v17 (encodage des 7 tics + base perso)** :

| Trait | Comment c'est encodé |
|-------|----------------------|
| **Voix d'enfant via adulte (règle ElevenLabs)** | `young adult squeaky and playful character voice — high-pitched, bright, light, French Sangoku or Naruto cartoon style` |
| **🔄 Énergie BAISSÉE (v17)** | `gentle bright energy` (au lieu de `unfiltered`) + retrait de `lively bursts` → `soft bursts` + retrait de `vividly expressive` |
| **Tête en l'air + rêveur + gaffeur** | `absent-minded dreamer, easily distracted, often drifting, articulate but tangled, sudden pauses` |
| **Sourire constant** | `smile in every word` |
| **Émerveillement** | `giggle, soft wonder-gasp on discoveries` |
| **Tic 1 (sifflement)** | `faint whistle on "s" and "ch" — tiny air leak, hissy (not a lisp)` |
| **Tic 2 (é-stylo)** | `/e/ before "s+consonant" ("é-stylo")` |
| **Tic 3 (ouit)** | `"huit" as "ouit"` |
| **Tic 4 (je → se/ze)** | `Childlike articulation: "je" drifts to "ze" or "se" (unstable /ʒ/)` |
| **Tic 5 (bégaiement excité)** | `When excited, repeats first syllable 2-3 times ("le-le-le bus !")` |
| **Tic 6 (statements bas)** | `Statements end on low falling cadence (never upspeak)` |
| **🆕 Tic 7 (questions franc-comtoises)** | `Questions follow a subtle Franche-Comté/Swiss-Romand melody: pitch rises then gently falls, slight lengthening on penultimate syllable` |

---

<details><summary>v13 (passe le filtre, sans mimique signature)</summary>

## Prompt ElevenLabs (Voice Design) — v8 (boy treble — terme musical pour vraie voix d'enfant)

> **Problème v7 (2026-05-11)** : avec `light and clear voice with naturally high register` (workaround sans mention âge) → la voix générée sort en **adulte 30aine qui essaie de faire l'enfant**. Le workaround n'était pas assez précis pour qu'ElevenLabs comprenne « vrai enfant ».
>
> **Approche v8** : utiliser le terme musical canonique **« boy treble »** (voix masculine non-muée d'un jeune garçon — terme utilisé dans les chœurs d'enfants, opéras, musique sacrée). C'est un terme **technique musical**, pas un descripteur d'âge → devrait passer le filtre tout en étant compris par ElevenLabs comme une vraie voix d'enfant.

```
Native French. Male, boy treble voice (unbroken pre-mutation register) — small body, very high natural pitch, light and clear. Studio quality.
Persona: a cheerful daydreamer with bright energy — scatterbrained, mind often elsewhere, makes adorable little mistakes, always smiling and ready to play. Emotion: joyful, dreamy, playful, mischievous, full of life.
Bright clear high timbre with a smile woven into every word. Articulate but sometimes tangled, like a small mouth learning words — tumbles out fast when excited, soft trailing-offs when the mind drifts. Pacing: excited bursts on sudden ideas, sudden pauses when thoughts wander. Signature trait: a small spontaneous giggle that may slip mid-sentence, soft wonder-gasp on discoveries, small "ah!" on remembering. Prosody lifting, sometimes meandering. Minimal audible breathing, no fry, no overacting. Conveys the natural joy of a dreamy soul who finds the world wonderful.
```

**Longueur** : 939 caractères ✅

**Termes clés v8 (timbre enfantin sans déclencher filtre)** :
- ✅ `boy treble voice` — terme musical canonique pour voix d'enfant non-muée
- ✅ `unbroken pre-mutation register` — terme physiologique précis (avant mue de la puberté)
- ✅ `small body` — descripteur physique
- ✅ `very high natural pitch` — caractéristique physiologique
- ✅ `small mouth learning words` — articulation enfantine sans dire « enfant »

**Si v8 sort ENCORE adulte** : on tente une variante musicale plus connue : `boy soprano` (équivalent plus connu de boy treble, utilisé dans les chœurs traditionnels). Si toujours adulte → on explorera Voice Cloning à partir d'un sample audio d'enfant réel (avec accord parental).

</details>

</details>

---

## ⚠️ Anciennes versions (archive)

<details><summary>v7 (workaround "high register" insuffisant — donnait adulte aigu)</summary>

```
Native French. Male, light and clear voice with a naturally high register. Studio quality.
Persona: a cheerful daydreamer with bright energy — scatterbrained, mind often elsewhere, makes adorable little mistakes, always smiling and ready to play. Emotion: joyful, dreamy, playful, mischievous, full of life.
Bright clear timbre with a smile woven into every word. Crisp articulate diction but sometimes a little tangled — words tumble out fast when excited, then soft trailing-offs when the mind wanders. Variable pacing: excited bursts when sharing a sudden idea, sudden pauses when thoughts drift. Signature trait: a small spontaneous giggle that may slip mid-sentence, a soft wonder-gasp on discoveries, occasional small "ah!" when remembering something. Prosody melodic and lifting, sometimes meandering. Minimal audible breathing, no fry, no overacting. Conveys the natural joy of a dreamy soul who finds the world wonderful and shares it freely.
```

> Abandonnée 2026-05-11 — Papa Yann : *« absolument pas une voix d'enfant, au mieu d'un 30aire qui essaie de faire l'enfant »*. Le `naturally high register` n'a pas suffi à faire comprendre à ElevenLabs « vraie voix d'enfant ».

</details>

> **Direction Papa Yann RECTIFIÉE 2026-05-11** : *« Wex est fun avec de l'énergie, il a la tête en l'air et est souvent rêveur gaffeur, c'est ça son style »*. L'auteur tranche — le canon écrit (« observateur tranquille, sérénité ») est OBSOLÈTE, on évolue vers **rêveur-gaffeur-fun**.
>
> **Blocages ElevenLabs successifs** : v2 (tropes prophète) et v5 (avec âge enfant explicite) ont été bloqués. v7 = **sans mention « young child »** + direction rêveur-gaffeur-fun. Le timbre enfantin viendra du `light and clear voice with naturally high register`.
>
> **🔄 TODO** : aligner `personnages/wex/caractere.md` avec la nouvelle direction (rêveur-gaffeur-fun), avec validation Papa Yann.

```
Native French. Male, light and clear voice with a naturally high register. Studio quality.
Persona: a cheerful daydreamer with bright energy — scatterbrained, mind often elsewhere, makes adorable little mistakes, always smiling and ready to play. Emotion: joyful, dreamy, playful, mischievous, full of life.
Bright clear timbre with a smile woven into every word. Crisp articulate diction but sometimes a little tangled — words tumble out fast when excited, then soft trailing-offs when the mind wanders. Variable pacing: excited bursts when sharing a sudden idea, sudden pauses when thoughts drift. Signature trait: a small spontaneous giggle that may slip mid-sentence, a soft wonder-gasp on discoveries, occasional small "ah!" when remembering something. Prosody melodic and lifting, sometimes meandering. Minimal audible breathing, no fry, no overacting. Conveys the natural joy of a dreamy soul who finds the world wonderful and shares it freely.
```

**Longueur** : 956 caractères ✅

**Éléments-clés du caractère Wex v7 (direction Papa Yann)** :

| Trait demandé | Comment c'est encodé dans le prompt |
|---------------|-------------------------------------|
| **Fun + énergie** | `cheerful, bright energy, full of life, ready to play, words tumble out fast when excited, excited bursts` |
| **Tête en l'air** | `scatterbrained, mind often elsewhere, sometimes a little tangled, soft trailing-offs when the mind wanders, prosody sometimes meandering` |
| **Rêveur** | `daydreamer, dreamy, dreamy soul, thoughts drift, sudden pauses when thoughts drift` |
| **Gaffeur** | `makes adorable little mistakes, sometimes a little tangled` |
| **Sourire constant** | `smile woven into every word` |
| **Émerveillement** | `wonder-gasp on discoveries, finds the world wonderful, "ah!" when remembering` |

**Timbre enfantin (sans déclencher filtre)** :
- ✅ `light and clear voice with a naturally high register` (descripteurs physiques)
- ✅ `Bright clear timbre`
- ❌ Pas de `young child` / `4-5 years old` / `child timbre`

> **Direction équilibrée 2026-05-11** : ni grave-adulte (v3), ni clown-rigolo (v4) — **enfant calme, curieux, avec une joie intérieure tranquille**, qui s'émerveille des petites choses. Fidèle au canon Wex (sérénité, présence, paix qui n'est pas indifférence) tout en ayant la **joie de vivre** que Papa Yann demande.

```
Native French. Male, young child around 4 to 5 years old. Studio quality.
Persona: a calm and curious little boy with a gentle inner joy — present, peaceful, never sad, never restless. He smiles softly, watches the world with bright curiosity, and quietly enjoys it. Emotion: serene, warm, gently delighted by small things.
Bright clear child timbre with a soft smile woven into the voice. Crisp articulate diction for his age — words are placed gently, never rushed. Variable pacing: usually slow and curious, can quicken a little when sharing something he finds wonderful. Signature trait: a small spontaneous giggle that may slip on a discovery, a soft wonder-gasp when something catches his attention. Prosody gently lifting on questions and quiet revelations. Minimal audible breathing, no fry, no overacting. Conveys the quiet joy of a child who is happy to be exactly where he is.
```

**Longueur** : 892 caractères ✅

**Équilibre v5 entre v3 (trop grave) et v4 (trop clown)** :

| Trait | v3 (trop grave) | v4 (trop clown) | **v5 ✅ équilibré** |
|-------|-----------------|------------------|---------------------|
| Caractère central | quiet observer | scatterbrained boy who makes laugh | **calm and curious little boy** |
| Joie | absente | constant smile, mischievous | **gentle inner joy, smiles softly, quietly enjoys** |
| Émotion | serene, gently knowing | joyful, playful, mischievous | **serene, warm, gently delighted by small things** |
| Diction | placed gently | tumble out with playfulness | **placed gently, never rushed** |
| Pacing | almost flat, lets silence sit | bursts of excited speed | **usually slow and curious, can quicken when sharing something wonderful** |
| Signature | soft pause before speaks | constant giggles | **a small giggle on discovery, soft wonder-gasp** |
| Conclusion | knows what's coming (creepy) | finds world funny | **happy to be exactly where he is** (sérénité Wex préservée) |

**Tropes filtre ElevenLabs évités** : aucun « observer », « has seen », « outside system », « knows what's coming » — anti-pattern #-1 respecté.

**Compatibilité canon Wex** ✅ :
- *« Wex observe parce qu'il perçoit »* → préservé via « watches the world with bright curiosity »
- *« Sérénité, présence, paix qui n'est pas indifférence »* → préservé via « serene, gentle inner joy, quietly enjoys »
- *« Action au bon moment »* → préservé via « can quicken a little when sharing »
- *« Il est là »* → préservé via « happy to be exactly where he is »

**Changements v4 → v3 (refonte complète après retour Papa Yann)** :

| ❌ v3 retirée (sérieux + sans âge) | ✅ v4 ajoutée (joyeux + avec âge) |
|--------------|--------------|
| `Male, light and clear voice with a naturally high register` (sans âge) | `Male, young child around 4 to 5 years old` (âge gardé, test si trope était le vrai bloquant) |
| `quiet observer who has already seen` | `cheerful scatterbrained boy who loves to play and make others laugh` |
| `gently knowing — never detached, never sleepy` | `joyful, playful, mischievous, constantly smiling — never sad, never serious for long` |
| `naturally fresh tone` | `constant smile audible in every word` |
| `every word chosen and placed` | `words tumble out with genuine playfulness` |
| `lets silence sit before key words` | `bursts of excited speed when sharing something fun, slows down with bright curiosity` |
| `a soft pause before he speaks, as if listening one beat longer` | `a small spontaneous giggle that may slip mid-sentence, a soft wonder-gasp on discoveries` |
| `Prosody gently wavelike — almost flat but never monotone` | `Prosody melodic and lifting — phrases often end on a joyful question or a smile` |
| `A small smile lives in the voice` | (renforcé) `constant smile audible in every word` |
| `someone who knows what's coming and is glad to share it` | `child who finds the world funny and shares it freely` |

**Tropes retirés (probable cause rejet)** :
- ❌ « quiet observer » + « has already seen » + « knows what's coming » (oracle)
- ❌ « slightly outside the system » (mystique/cult)
- ❌ « serene attentiveness » (creepy distance)

---

## Phrases types (Wex)

- *(silence)* "Viens." *(simple, il a déjà vu)* 
- "Je sais pas pourquoi, mais... je pense qu'il faut attendre là." *(intuition, pas d'explication)*
- "C'est bon pour tout le monde ?" *(cercle d'harmonie — regarder chaque visage)*

---

## Wex et les autres voix

Wex s'accorde vocalement à son interlocuteur — léger effet miroir.
Avec Raph : il accélère légèrement. Avec Nono : il ralentit. Avec Juju : il devient plus direct.
Ce n'est pas une règle stricte — juste une observation pour le casting.
