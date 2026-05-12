# Preview Texts — pour Voice Design ElevenLabs

> Texte à coller dans le champ **Preview Text** de l'UI Voice Design ElevenLabs au moment de la création du `voice_id`.
> Tous en français (cohérent avec `Native French` dans les prompts).
> Chaque preview text est **long et pertinent** (recommandation officielle ElevenLabs : « For better results, use long and relevant preview text »).
> Tags v3 inline (`[softly]`, `[pauses]`, etc.) pour tester le rendu émotionnel **en même temps que le timbre**.

---

## 🎙️ Narrateurs (H et F — phrase commune pour comparer)

> **⚠️ UNIQUEMENT le texte narratif de 001 — Le Pont Cassé.** Zéro dialogue (le narrateur **ne dit jamais** les répliques des enfants — celles-ci sont jouées par les voix perso). Bouts narratifs enchaînés couvrant : ouverture sensorielle → arrêt et tension → description visuelle → mouvement Raph → geste tendre Pierrot. Mêmes mots pour H et F → comparaison directe sur **toute la palette émotionnelle** en une seule génération.

```
[softly] Le printemps avait mis de la mousse tendre sur les pierres du sentier. [playful] Wex courait devant. Ses baskets claquaient contre les cailloux. Clac. Clac. Clac. [chuckles] Derrière, Raph comptait les pissenlits en sautillant. [softly] Pierrot fermait la marche. Il regardait où il posait ses chaussures. [pauses] [slowly] Le pont apparaissait après le gros chêne. C'était un pont en bois avec une barrière des deux côtés. En dessous, le ruisseau chantait tout seul sur les galets. [hesitant] Wex posa le pied sur la première planche. Il s'arrêta net. [whispers] Il pointa le doigt. [serious] La deuxième planche était cassée. Un morceau de bois manquait, comme si on avait enlevé une pièce de puzzle. [slowly] On voyait l'eau couler en dessous, rapide et claire. [excited] [quickly] Raph arriva en courant. Elle se pencha par-dessus la barrière. [gasps] Pierrot posa sa main autour de son poignet. [softly] Il ne serrait pas fort. Il serrait comme un bracelet. [sighs] Tout allait bien.
```

**13 tags v3 distincts + 1 onomatopée — palette débridée :**

| Tag | Position | Effet attendu |
|-----|----------|--------------|
| `[softly]` | ouverture | pose sensorielle intime |
| `[playful]` | Wex court | joie enfantine dans la narration |
| `Clac. Clac. Clac.` | onomatopée | diction punchy, rythme |
| `[chuckles]` | Raph compte pissenlits | **rire du narrateur en racontant** (slip mid-sentence) |
| `[softly]` | Pierrot ferme la marche | douceur attentive |
| `[pauses]` | transition | respiration entre paragraphes |
| `[slowly]` | description du pont | poésie posée, fait sonner les mots |
| `[hesitant]` | Wex s'arrête | **tension qui monte** |
| `[whispers]` | il pointe le doigt | mystère chuchoté |
| `[serious]` | constat planche cassée | gravité factuelle |
| `[slowly]` | eau qui coule | retour contemplatif |
| `[excited]` `[quickly]` | Raph arrive | **énergie accélérée** |
| `[gasps]` | Raph se penche | **souffle suspendu** — micro-danger fugace |
| `[softly]` | geste de Pierrot | retour douceur sur le bracelet |
| `[sighs]` | « Tout allait bien » | **soupir de soulagement** dans la voix du narrateur, fin de scène |

**C'est le test ultime** : si la voix sait passer **par tous ces registres** dans un seul bloc — pose sensorielle → joie enfantine → rire en racontant → poésie posée → tension qui monte → chuchotement de mystère → gravité → énergie accélérée → souffle suspendu → douceur du geste → soupir de soulagement — c'est qu'elle peut narrer toutes les histoires MaxPlay. Si elle reste plate ou perd 1-2 tags, on relance (chaque génération diffère, fait 3 takes).

→ **Longueur** ~960 chars (sous la limite preview ElevenLabs, large). Le tag stacking `[excited] [quickly]` est utilisé une fois (combo OK selon skill, max 2-3 par phrase respecté).

→ **Tip Guidance Scale** : si la voix ignore certains tags (ex : ne rit pas, ne chuchote pas), monte Guidance Scale à **40-45%** pour forcer la fidélité au prompt. Si elle sur-joue à l'inverse, descends à **25-30%**.

→ Bloc historique v1 (avec dialogues d'enfants qui n'appartiennent pas au rôle narrateur) archivé pour mémoire :
```
[softly] Le pont apparaissait après le gros chêne. ... — Regardez. Il y a un trou. ... — Une fenêtre ! ...
```
> ⚠️ V1 et V2 abandonnés 2026-05-11 — V1 trop plat, V2 mélangeait narration + dialogues (Papa Yann : *« le narrateur n'a pas les voix des enfants »*).

---

## 👦 Wex (hors-système, rêveur-gaffeur-fun avec énergie joyeuse)

> Tic vocal : **sourire dans la voix** + énergie excitée sur les découvertes + **tête en l'air** (pauses brusques quand pensée dérive, petits "ah!" de souvenir) + giggles spontanés + wonder-gasps sur l'émerveillement. Direction Papa Yann v7 : fun + tête en l'air + rêveur + gaffeur.

### v2 enrichie (2026-05-12) — 666 chars, 11 tags v3, palette élargie avec [laughs] + contemplation [softly]

```
[excited] Viens ! [playful] C'est par là ! [pauses] [gasps] Regardez ! [excited] Il y a un trou ! [curious] L'eau est toute froide... [giggles] Je vois des cailloux blancs ! [happily] Il y en a un qui brille ! [chuckles] Pierrot il a dit "attends" mais moi je voulais voir. [pauses] [softly] Le vent il fait bouger les pissenlits, c'est joli. [curious] Tu crois que les nuages ils ont sommeil ? [laughs] Ahah moi je trouve qu'ils marchent doucement comme s'ils dormaient debout ! [playful] Ah ! On met un panneau ! [excited] Ceux qui courent vite aussi ! [curious] On peut en remettre une autre demain ? Si le vent l'emporte. [happily] C'est bon pour tout le monde ?
```

**Palette couverte v2 — test ultime Wex** : si sa voix sait aller de l'énergie excitée à la contemplation poétique en passant par 3 types de rires distincts (`[giggles]`, `[chuckles]`, `[laughs]`), c'est qu'elle a la palette pour toutes les histoires MaxPlay. Si elle reste plate ou ignore le `[softly]`, monte Guidance Scale à 40-45%.

<details><summary>v1 minimaliste (archivée — sans rire [laughs] ni contemplation)</summary>

```
[excited] Viens ! [playful] C'est par là ! [pauses] [gasps] Regardez ! [excited] Il y a un trou ! [curious] L'eau est toute froide... [giggles] Je vois des cailloux blancs ! [happily] Il y en a un qui brille ! [pauses] [playful] Ah ! On met un panneau ! [excited] Ceux qui courent vite aussi ! [curious] On peut en remettre une autre demain ? Si le vent l'emporte. [happily] C'est bon pour tout le monde ?
```

400 chars · 8 tags v3. Élargie en v2 le 2026-05-12 (directive Papa Yann : preview plus long + rire obligatoire).

</details>

**~400 chars · 8 tags v3 · 9 répliques canoniques de Wex extraites de 001** :

| Tag | Position | Effet attendu |
|-----|----------|--------------|
| `[excited]` | « Viens ! » | invitation énergique |
| `[playful]` | « C'est par là ! » | espiègle |
| `[pauses]` + `[gasps]` | « Regardez ! » | **pause rêveur + wonder-gasp** sur la découverte |
| `[excited]` | « Il y a un trou ! » | enthousiasme |
| `[curious]` | « L'eau est toute froide... » | curiosité avec trailing-off (tête en l'air) |
| `[giggles]` | « cailloux blancs » | **rire spontané** sur l'observation |
| `[happily]` | « un qui brille ! » | joie |
| `[pauses]` + `[playful]` | « Ah ! » | **petit "ah!" gaffeur** quand l'idée arrive |
| `[excited]` | « Ceux qui courent vite aussi ! » | inclusion énergique |
| `[curious]` | question « demain ? » | curiosité |
| `[happily]` | question finale | cercle d'harmonie joyeux |

**Test ultime Wex v7** : la voix doit jouer **les transitions brutales** entre excité (`[excited]`) et pause rêveuse (`[pauses]`) — c'est ça « tête en l'air ». Et les giggles + "Ah!" doivent sonner **spontanés**, pas planifiés. Si ça sort lissé → trop adulte. Si ça sort hystérique → trop. La bonne version = **enfant rêveur-gaffeur authentique**.

**~370 chars · 7 tags v3 · 9 répliques canoniques de Wex extraites de 001** :

| Tag | Position | Effet attendu |
|-----|----------|--------------|
| `[softly]` | « Viens » | invitation douce, pas excitée |
| `[curious]` | « C'est par là » | montre avec curiosité |
| `[pauses]` | avant « Regardez » | petit silence d'observation |
| `[gasps]` | « Il y a un trou » | **wonder-gasp** sur la découverte |
| `[whispers]` | « L'eau est toute froide... » | proximité de l'observation rapprochée |
| `[curious]` | « cailloux blancs » | observation curieuse |
| `[giggles]` | « un qui brille » | **petit rire spontané** sur la découverte (joie discrète) |
| `[softly]` | « On met un panneau » | proposition douce |
| `[calm]` | « Ceux qui courent vite aussi » | inclusion sereine |
| `[curious]` | « demain ? » | question curieuse |
| `[softly]` | question finale | cercle d'harmonie tranquille |

**Test ultime Wex v5** : la voix doit avoir un **sourire doux dans la voix** (pas constant, pas démonstratif) + jouer les `[giggles]` et `[gasps]` **comme des micro-émerveillements discrets** d'un enfant qui s'arrête pour voir. Si la voix sort **grave / sans joie** → trop sérieux. Si elle sort **hyper rigolo / clown** → trop excité. La bonne version = **sérénité curieuse joyeuse**.

> ⚠️ Preview text v1-v2 abandonnés 2026-05-11 : v1 trop contemplatif (`[pauses]` `[calm]` partout), v2 trop excité (`[playful]` `[excited]` `[happily]` constants). v3 équilibrée = mélange `[softly]` + `[curious]` + 1 `[gasps]` + 1 `[giggles]` pour les émerveillements discrets.

---

## 👧 Type 1 — Melki (perfectionniste, T/K crisp, métronomique)

```
[calm] Non, comme ça c'est pas bien rangé. [pauses] Attends... je vérifie d'abord. C'est bon. C'est comme il faut.
```

**Couvre :** négation calme + micro-inspiration sur "vérifie" + deux cadences fermées résolues.

---

## 👧 Type 2 — Mimi (aidante, M/N résonants, montées tendres)

```
[softly] Mm... t'as l'air triste. [curious] Tu veux qu'on s'assoie ? Je peux t'aider, hein. C'est pas grave.
```

**Couvre :** "mm" doux d'ouverture + question curieuse + lingering "hein" berçant.

---

## 👦 Type 3 — Polo (performeur, plosives punchy, smile-in-voice)

```
[excited] Regardez ! Je sais faire ça. [happily] C'est moi qui gagne. Bon. On y va ?
```

**Couvre :** attaque énergique 1ère syllabe + descendant confiant non-méchant + efficacité finale.

---

## 👧 Type 4 — Madie (individualiste, R roulé doux, voyelles étirées, soupirs)

```
[sighs] Personne comprend vraiment ce que je veux dire... [softly] C'est... beau, en fait. [pauses] Oh.
```

**Couvre :** soupir audible + voyelle étirée sur "vraiment" + chuchotement "oh" final.

---

## 👦 Type 5 — Lulu (observateur, consonnes dry, plat, micro-pauses réflexives)

```
[calm] En fait... [pauses] c'est pas tout à fait ça. J'ai besoin d'observer encore un peu. Logiquement, ça devrait marcher comme ça.
```

**Couvre :** pause pré-correction + ton informatif sans demande d'approbation + léger drop final.

---

## 👦 Type 6 — Pierrot (loyal, upspeak, légère tension, variable)

### v2 enrichie (2026-05-12) — 494 chars, 7 tags v3, palette élargie avec [chuckles] + descente résolue après détente

```
[hesitant] C'est sûr qu'on peut y aller ? [curious] Attends... t'as bien regardé le pont ? Y a une planche qui me dit pas trop quelque chose. [serious] Faut qu'on fasse attention là, c'est pas une blague. [softly] Vas-y doucement, hein. Pose le pied bien à plat. [pauses] Voilà... voilà comme ça. [chuckles] Bon ben tu vois, ça va, j'avais juste un peu peur. [happily] Moi je suis là, t'inquiète. S'il se passe un truc, je suis là. [playful] Et puis si on tombe, ben on tombera ensemble, hein !
```

**Palette couverte (7 registres)** :

| Tag | Position | Effet attendu |
|-----|----------|---------------|
| `[hesitant]` | « C'est sûr qu'on peut y aller ? » | upspeak interrogatif T6 d'ouverture |
| `[curious]` | « Attends... t'as bien regardé le pont ? » | accélération d'alerte vigilante |
| `[serious]` | « Faut qu'on fasse attention » | gravité protectrice |
| `[softly]` | « Vas-y doucement, hein » | douceur attentionnée, voix qui guide |
| `[pauses]` | « Voilà... voilà comme ça » | respiration partagée avec le pair |
| `[chuckles]` | « Bon ben tu vois, ça va, j'avais juste un peu peur » | **rire de détente** mid-sentence après la tension |
| `[happily]` | « Moi je suis là, t'inquiète » | **descente résolue** une fois rassuré |
| `[playful]` | « si on tombe, ben on tombera ensemble » | humour nerveux complice T6 (fin) |

→ **Test signature Pierrot** : l'arc complet T6 doit s'entendre — **tension/upspeak** → **alerte** → **gravité** → **douceur protectrice** → **rire de détente** → **fermeté loyale**. Si la voix reste tendue jusqu'à la fin, monte Stability à 0.70 pour stabiliser.

<details><summary>v1 minimaliste (archivée — sans rire ni arc émotionnel complet)</summary>

```
[hesitant] C'est sûr qu'on peut y aller ? [curious] Attends... t'es sûr ? Moi je suis là, t'inquiète.
```

~100 chars · 2 tags v3. Élargie en v2 le 2026-05-12 (directive Papa Yann : preview plus long + rire obligatoire).

</details>

---

## 👧 Type 7 — Raph (enthousiaste, plosives dansantes, rafales)

### v2 enrichie (2026-05-12) — 522 chars, 7 tags v3, palette élargie avec [laughs] + [giggles] + contemplation douce

```
[excited] Oh mais c'est trop bien ça ! [laughs] T'as vu la grenouille — elle a sauté direct dans l'eau ! [happily] Et ensuite — et ensuite — on pourrait grimper sur le rocher là-bas, et après on cherche des pissenlits, et après on souffle dessus pour faire des petites étoiles partout ! [curious] Tu crois qu'elles vont jusqu'où les graines ? [softly] Moi je trouve ça doux quand le vent les emporte. [giggles] Hihi regarde, y en a une qui m'a chatouillé le nez ! [playful] Bon allez, on y va, on y va, ça va être génial !
```

**Palette couverte (7 registres)** :

| Tag | Position | Effet attendu |
|-----|----------|---------------|
| `[excited]` | « Oh mais c'est trop bien » | ouverture énergie haute, pic sur « trop » |
| `[laughs]` | « T'as vu la grenouille » | **rire franc** sur la surprise joyeuse |
| `[happily]` | « Et ensuite — et ensuite » | idea-stacking en mode positif |
| `[curious]` | « Tu crois qu'elles vont jusqu'où » | exploration vocale curieuse |
| `[softly]` | « Moi je trouve ça doux » | **contemplation tendre** (test : Raph sait-elle ralentir ?) |
| `[giggles]` | « y en a une qui m'a chatouillé le nez » | **rire enfantin spontané** |
| `[playful]` | « Bon allez, on y va » | retour énergie, montée finale jump |

→ **Test signature Raph** : la voix doit alterner **rafale énergie** (excited + happily) ↔ **moments doux** (softly + curious) sans rupture, et **2 types de rires distincts** (`[laughs]` franc + `[giggles]` enfantin).

<details><summary>v1 minimaliste (archivée — sans rire ni contemplation)</summary>

```
[excited] Oh mais c'est trop bien ça ! [happily] Et ensuite — et ensuite — on pourrait aussi... Allez, on y va, ça va être génial !
```

~130 chars · 2 tags v3. Élargie en v2 le 2026-05-12 (directive Papa Yann : preview plus long + rire obligatoire).

</details>

---

## 👧 Type 8 — Juju (challenger, weighted plosives, plant-and-deliver)

```
[serious] Non. [pauses] C'est pas juste. Je l'avais dit. On fait comme ça. Voilà.
```

**Couvre :** "Non" planté + chaque mot posé + statement double ancré.

---

## 👦 Type 9 — Nono (pacificateur, legato, soft mmm, vague douce)

```
[calm] Mmm... on peut tous y aller ensemble, non ? [softly] C'est bien comme ça. Ah... ouais.
```

**Couvre :** "mmm" d'ouverture + question rassembleuse + résolution lente "ah... ouais".

---

## ⚠️ Important — paramètres UI à régler en parallèle

Pour chaque création de voice_id ElevenLabs Voice Design :

| Paramètre UI | Reco MaxPlay |
|--------------|-------------|
| **Generate Preview Text** | **OFF** ← important, sinon ton preview ci-dessus est ignoré |
| **Preview Text** | Coller le bloc ci-dessus correspondant |
| **Loudness** | ~50% (milieu) par défaut |
| **Guidance Scale** | **30-40 %** (priorité fidélité au prompt) |
| **Prompt** | Depuis la fiche voix concernée (`personnages/type-NN/voix.md` ou `voix-meta/narrateur-{h,f}.md`) |

**Procédure** : générer 3 previews → garder la meilleure → sauvegarder → noter le `voice_id` dans le frontmatter de la fiche voix.

---

## Cross-culture (futur)

Pour décliner un perso sur une autre langue (jp / br / he / sw…) :
- **Traduire** le preview text dans la langue cible (pas littéral — utiliser une phrase équivalente avec le même tic vocal)
- **Garder les tags v3** identiques (`[softly]`, `[pauses]`… sont en anglais dans tous les cas)
- **Changer** `Native French` → `Native <Target>` dans le prompt (cf. `_PROMPTING-GUIDE.md` §Cas multi-culture)

Les preview texts traduits vivront dans `cross-culture/castings-nationaux/<pays>/preview-texts.md` quand un casting non-FR sera lancé.

---

## Liens

- Guide complet : [`_PROMPTING-GUIDE.md`](_PROMPTING-GUIDE.md)
- Fiches voix : [`narrateur-h.md`](narrateur-h.md) · [`narrateur-f.md`](narrateur-f.md) · [`../type-01/voix.md`](../type-01/voix.md) … [`../wex/voix.md`](../wex/voix.md)
- Cheatsheet didascalies writers : [`_CHEATSHEET-WRITERS.md`](_CHEATSHEET-WRITERS.md)
- Skill global ElevenLabs : `~/.claude/skills/elevenlabs-voice-design/SKILL.md`
