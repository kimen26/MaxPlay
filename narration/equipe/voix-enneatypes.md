# Étude vocale par ennéatype — 18 voix ElevenLabs

> Le timbre est l'apparence d'une voix. Sa signature, c'est ce qui reste quand on change de langue, de sexe, ou de microphone.

---

## Préambule — le principe directeur

Pour qu'un personnage reste **reconnaissable** à chaque écoute, à travers une dizaine de langues, et même quand son interprète change de sexe selon le pays, il ne faut surtout **pas** s'appuyer sur le timbre comme marqueur d'identité. Le timbre change avec le sexe. La langue change avec le pays. Le moteur multilingue d'ElevenLabs (v2 ou v3) recalcule automatiquement les harmoniques selon la phonologie cible.

Ce qui *reste*, c'est une **signature combinatoire** faite de quatre couches superposées :

1. Une **manière articulatoire** : la façon dont les consonnes sont attaquées et relâchées (les fameux "p", "t", "r" qui font la singularité)
2. Une **mélodie prosodique** : la courbe d'intonation typique, les fins de phrases, les questions implicites
3. Un **rythme respiratoire** : la vitesse, les pauses, la longueur des groupes de souffle
4. Une **texture phonatoire** : voix soufflée, modale, légèrement éraillée, etc.

Cette signature à quatre couches, c'est l'ADN vocal du personnage. Un Type 4 femme en français et un Type 4 homme en anglais doivent partager les mêmes ralentis, les mêmes soupirs, le même "r" tenu — c'est *ça* qui fait dire à l'auditeur "ah, ce personnage". Le timbre, lui, est juste l'enveloppe.

**Note technique sur la rédaction des prompts** : les descriptions à coller dans Voice Design sont en anglais. Le module comprend mieux les termes phonétiques anglais (`rolled R`, `aspirated T`, `breathy onset`, `legato consonants`) et c'est sa langue d'entraînement principale. Le résultat reste pleinement multilingue — la voix générée parlera tes 10 langues sans que tu aies à le préciser.

---

## PARTIE 1 — Lexique exhaustif des marqueurs de singularité vocale

### 1. Timbre et tessiture (la "couleur" de base)

- **Tessiture** : soprano / mezzo / alto chez les voix féminines ; ténor / baryton / basse chez les voix masculines. Le baryton chaud est le standard narratif masculin ; le mezzo le plus polyvalent en féminin.
- **Brillance vs sombreur** : voix claire (harmoniques hautes présentes, type "lumineuse") vs voix sombre (harmoniques basses dominantes, type "veloutée").
- **Adjectifs de timbre fiables en anglais pour ElevenLabs** : `velvety`, `silky`, `smoky`, `bright`, `warm`, `crystalline`, `mellow`, `husky`, `airy`, `grounded`, `chesty`, `forward`, `rounded`.
- **Adjectifs à éviter** car trop subjectifs : `beautiful`, `nice`, `perfect`. Le moteur ne les interprète pas finement.

### 2. Marqueurs articulatoires — les consonnes

C'est ici que se cache la majorité des "tics" reconnaissables.

**Occlusives / plosives** (p, b, t, d, k, g) — les sons "explosifs"
- *Aspirated* : libération avec souffle, comme un petit "h" derrière (ex. anglais standard)
- *Unaspirated* : libération sèche, sans souffle (ex. français, espagnol)
- *Soft / cushioned* : relâchement adouci, presque caressant (P qui sonne comme un baiser)
- *Hard / weighted* : attaque ferme, avec poids (P d'autorité)
- *Crisp* : net, précis, sans bavure
- *Released* vs *unreleased* : relâché ou coupé

**Fricatives et sibilantes** (s, z, f, v, ch, j)
- *Sharp sibilants* : S qui siffle, parfois excessif
- *Soft sibilants* : S amorti, doux
- *Wet vs dry* : présence ou non de salive perceptible
- *Hissy* : sifflement marqué (à éviter sauf effet)

**Liquides** (l, r) — les plus identitaires
- *Rolled R* : R roulé apical (espagnol/italien) — multiples vibrations
- *Tapped R* : un seul battement (R intermédiaire)
- *Uvular R* : R français/allemand, à la luette (le R "grasseyé")
- *Approximant R* : R anglais (sans contact)
- *Soft rolled R* : R roulé léger, charmant, non théâtral — **excellent marqueur de singularité**
- *Light L* vs *Dark L* : L clair (français) vs L sourd (anglais "ball")

**Nasales** (m, n, gn)
- *Resonant nasals* : M et N vibrants, prolongés
- *Closed-mouth M* : M lèvres fermées prolongé, type "mmm" pensif
- *Nasal twang* : résonance nasale forte (style country/oriental)

**Affriquées** (tch, dj) — crispation possible

**Coup de glotte** (glottal stop) — petite coupure entre deux voyelles. En grande quantité = voix saccadée, alerte, anxieuse.

### 3. Marqueurs vocaliques — les voyelles

- **Lengthening / sustained vowels** : voyelles tenues plus longtemps que la moyenne — marqueur fort de mélancolie, contemplation, sensualité
- **Diphtongues** (ce que tu appelles "diftongues") : passage de deux voyelles dans une syllabe (ex. anglais "boy", "ride"). Certaines voix les *monoftongueuent* (les aplatissent), d'autres les *exagèrent*
- **Vowel rounding** : arrondi des lèvres — donne un timbre plus rond, féminin, sensuel
- **Vowel break / glottal onset** : attaque vocalique avec petit choc de glotte (alerte) ou sans (legato)
- **Vowel openness** : voyelles ouvertes (vocales franches) vs fermées (intimistes)

### 4. Prosodie — la mélodie de la phrase

- **Tessiture utilisée** (vs disponible) : narrow range (monotone calme) vs wide range (expressif)
- **Intonation finale** :
  - *Falling cadence* : descente de fin de phrase (assertif, résolu)
  - *Rising cadence* : montée (questionnement, ouverture, "upspeak")
  - *Plateau* : fin plate (neutralité, contemplation)
  - *Drop endings* : chute marquée (mélancolie, gravité)
- **Lifted endings** : fins légèrement remontées en chaleur (chaleur, accueil)
- **Melodic peaks** : pics mélodiques sur les mots-clés
- **Boundary tones** : signaux de fin de groupe (haut, bas, plat)

### 5. Rythme et timing

- **Pace / tempo** : slow, medium-slow, medium, medium-brisk, brisk, fast
- **Staccato** (détaché, syllabes séparées) vs **legato** (lié, fondu)
- **Pause typology** :
  - *Breath pauses* : pauses de souffle (physiologiques)
  - *Thinking pauses* : pauses de réflexion (cognitives)
  - *Dramatic pauses* : pauses dramatiques (émotionnelles)
  - *Plant pauses* : pauses d'ancrage (avant un mot fort)
- **Group length** : longueur des groupes rythmiques (combien de syllabes par souffle)
- **Rushed** (précipité) vs **measured** (mesuré) vs **deliberate** (délibéré)

### 6. Souffle et respiration

- **Audible inhales** : inspirations entendues (intimité, présence physique)
- **Breathy onset** : attaque de phrase soufflée (douceur, séduction)
- **Sigh patterns** : soupirs entre les phrases (mélancolie, fatigue, tendresse)
- **Breath holds** : suspensions de souffle (attente, drame)
- **Exhale-syllables** : syllabes prononcées sur l'expiration ("ohhh", "ahh")

### 7. Modes phonatoires (la texture vocale)

- **Modal voice** : voix normale, équilibrée
- **Breathy voice** : voix soufflée (intimité, séduction, fragilité)
- **Creaky voice / vocal fry** : friture vocale, craquement de cordes — à doser, marqueur d'authenticité ou de fatigue
- **Rough / husky** : voix éraillée, rauque (charisme, expérience)
- **Tense voice** : voix tendue (alerte, urgence)
- **Whisper voice** : chuchotement (confidence, mystère)
- **Twang** : pincement nasal-pharyngal (caractère, country)

### 8. Dynamique (le volume)

- **Soft-spoken** : volume bas, naturellement contenu
- **Projected** : voix portée
- **Crescendo / decrescendo** : montée ou descente de volume sur une phrase
- **Dynamic emphasis** : accent de volume sur un mot

### 9. Placement résonantiel

- **Forward / mask placement** : résonance dans le masque (visage, sinus) — voix lumineuse, percutante
- **Back placement / throaty** : résonance arrière (gorge) — voix profonde, sombre
- **Chest resonance** : résonance thoracique — chaleur, gravité
- **Head voice** : résonance crânienne — légèreté, douceur
- **Mixed placement** : mélange équilibré

### 10. Tics idiosyncratiques (la signature finale)

C'est la couche la plus reconnaissable — un détail qui revient et fait *signer* la voix.

- **Closed-mouth "mm"** entre les phrases (réflexion, chaleur, accord)
- **Soft chuckle reflex** : petit rire bref (chaleur, complicité)
- **Half-laugh on words** : éclat de rire à demi-étouffé sur certains mots (joie)
- **Audible exhale-sigh** : soupir audible (mélancolie, soulagement)
- **Whispered "oh" / "ah"** : interjection chuchotée (émotion contenue)
- **Tiny pre-word in-breath** : micro-inspiration avant les mots-clés (précision, importance)
- **Idea-stacking on one breath** : enchaîner plusieurs idées sans reprendre souffle (enthousiasme)
- **Plant moments** : suspension d'ancrage avant un mot de vérité
- **Lingering on names** : étirement tendre sur les prénoms et termes d'adresse
- **Slight upspeak** : montée interrogative discrète en fin de phrase
- **Vocal lean-in** : impression de se rapprocher physiquement de l'auditeur

---

## PARTIE 2 — Matrice ennéatype → signature vocale

Pour chaque type, je fixe la **signature partagée H/F** (ce qui doit rester identique entre la version masculine et féminine pour que ce soit *le même personnage*), et je laisse uniquement le timbre/tessiture varier.

### Type 1 — Le Réformateur (principes, précision)
**Signature partagée** : articulation cristalline, T et K parfaitement aspirés, S net non sifflant, aucune élision, légère insistance sur les mots de conviction morale, cadences finales descendantes résolues, rythme régulier presque métronomique, texture sèche et propre, micro-inspirations précises avant les mots-clés.

### Type 2 — L'Aidant (chaleur, embrassement)
**Signature partagée** : P et B adoucis (presque embrassés), M et N résonants prolongés, S amortis, étirement tendre sur les prénoms, cadences chaudes montantes en fin de phrases émotionnelles, texture veloutée avec souffle intermittent, sourire dans la voix, "mm" doux entre les phrases, petit rire de tendresse occasionnel.

### Type 3 — Le Performant (charme, énergie)
**Signature partagée** : relâche nette de toutes les consonnes, sibilantes brillantes propres, plosives en début de phrase punchy, voyelles de pic ouvertes et claires, statements descendants confiants, sourire de présentation dans la voix, rythme vif mais contrôlé, placement avant (masque), attaque énergique sur la première syllabe de chaque idée nouvelle.

### Type 4 — L'Individualiste (mélancolie, expression)
**Signature partagée** : voyelles tenues longuement (presque endeuillées), R légèrement roulé et étiré (doux, jamais théâtral), soupirs audibles entre les phrases, fins descendantes mélancoliques, texture enfumée et soufflée avec soupçon de rauque sur les voyelles tenues, rythme lent avec pauses dramatiques, "oh" chuchoté ou syllabe-soupir occasionnelle.

### Type 5 — L'Investigateur (cérébralité, retenue)
**Signature partagée** : consonnes sèches à faible souffle, T et S parfaitement contenus, choix des mots audible, aucune expansion vocale, registre tonal étroit, cadence en plateau avec léger drop final, emphase pondérée sur des mots uniques, rythme mesuré avec pauses de réflexion, texture fraîche et silencieuse, micro-pauses précédant la terminologie précise.

### Type 6 — Le Loyal (vigilance, engagement)
**Signature partagée** : consonnes alertes légèrement tendues, arête sur les T et K (attention cristallisée), légère ouverture interrogative en fin de proposition (vérification implicite), pauses de mi-phrase pour confirmation, rythme variable (rapide quand engagée, pondéré sur les faits), texture alerte, lift montant discret invitant la confirmation de l'auditeur.

### Type 7 — L'Enthousiaste (légèreté, élan)
**Signature partagée** : plosives légères dansantes, articulation à lèvres avant (souriantes), pics mélodiques multiples par phrase, danse mélodique enjouée, fins remontées (curieuses, ouvertes), rythme rapide avec rafales, texture brillante et aérienne, sourire dans la voix avec bulles de demi-rire, empilement de plusieurs idées sur un même souffle.

### Type 8 — Le Protecteur (puissance, ancrage)
**Signature partagée** : plosives lourdes (P, B, D pleinement relâchées), voyelles ancrées au soutien thoracique, statements descendants déclaratifs autoritaires, registre étroit mais puissant, jamais précipité, poids sur chaque syllabe, texture pleine et thoracique avec rauque chaud sur les mots forts, emphase pondérée sur les mots de vérité, "plant moments" avant les déclarations clés.

### Type 9 — Le Médiateur (fluidité, harmonie)
**Signature partagée** : consonnes legato glissant dans les voyelles, plosives non percussives douces, liaison-flow entre les mots (presque chantées), vagues mélodiques douces (ni pic ni vallée), fins non emphatiques douces, rythme lent fluide sans urgence, texture lisse légèrement soufflée sans aucune arête, "mmm" ou "ah" doux entre les phrases, absence totale d'attaque percussive.

---

## PARTIE 3 — Les 18 descriptions ElevenLabs

À coller telles quelles dans Voice Design, en anglais. Pour chaque type, la version femme et la version homme partagent **mot pour mot** les marqueurs de signature — seul le timbre varie. C'est ce qui assurera la continuité du personnage à travers les langues et les sexes.

---

### Type 1 — Le Réformateur

**Femme**
> Female narrator voice, mid-thirties, clear and bright mezzo timbre with controlled focused resonance. Calm composed delivery with quiet conviction. Distinctive shared articulation: extra-crisp release on "t" and "k" (precisely aspirated, never sloppy), perfectly enunciated "s" with no sibilant excess, no consonant elision or slurring, every syllable fully articulated. Subtle weight on words of moral conviction. Prosody: narrow controlled range, slight downward terminal resolution on every statement (resolved, never floating). Rhythm: regular almost metronomic, with measured micro-pauses for emphasis. Texture: clean and dry, no vocal fry, minimal breathiness. Signature tic: a tiny precise in-breath right before key words. No warmth excess, no dramatic flourish. Conveys principled clarity and quiet rigor. Think: a thoughtful editor reading a text she believes in deeply.

**Homme**
> Male narrator voice, late thirties, clear baritone timbre with controlled focused resonance and a clean upper register. Calm composed delivery with quiet conviction. Distinctive shared articulation: extra-crisp release on "t" and "k" (precisely aspirated, never sloppy), perfectly enunciated "s" with no sibilant excess, no consonant elision or slurring, every syllable fully articulated. Subtle weight on words of moral conviction. Prosody: narrow controlled range, slight downward terminal resolution on every statement (resolved, never floating). Rhythm: regular almost metronomic, with measured micro-pauses for emphasis. Texture: clean and dry, no vocal fry, minimal breathiness. Signature tic: a tiny precise in-breath right before key words. No warmth excess, no dramatic flourish. Conveys principled clarity and quiet rigor. Think: a thoughtful editor reading a text he believes in deeply.

---

### Type 2 — L'Aidant

**Femme**
> Female narrator voice, early thirties, warm velvety mezzo timbre with soft chest resonance and a hint of head warmth. Tender embracing delivery filled with affection. Distinctive shared articulation: softened "p" and "b" (gentle, almost lip-kiss release), warmly sustained "m" and "n" sounds, soft non-sharp "s", every consonant treated with care. Lingering tenderly on names and address terms. Prosody: rising warm cadences, lifted endings on emotionally important phrases, gentle waves of melodic warmth. Rhythm: medium pace with affectionate micro-lingerings on tender words. Texture: velvety with intermittent soft breathiness, distinct smile in the voice. Signature tic: warm closed-mouth "mm" between phrases, occasional soft chuckle reflex on tender moments. Conveys profound benevolence and embracing care. Think: a tender aunt reading you a love letter.

**Homme**
> Male narrator voice, late thirties, warm velvety baritone timbre with soft chest resonance and gentle upper warmth. Tender embracing delivery filled with affection. Distinctive shared articulation: softened "p" and "b" (gentle, almost lip-kiss release), warmly sustained "m" and "n" sounds, soft non-sharp "s", every consonant treated with care. Lingering tenderly on names and address terms. Prosody: rising warm cadences, lifted endings on emotionally important phrases, gentle waves of melodic warmth. Rhythm: medium pace with affectionate micro-lingerings on tender words. Texture: velvety with intermittent soft breathiness, distinct smile in the voice. Signature tic: warm closed-mouth "mm" between phrases, occasional soft chuckle reflex on tender moments. Conveys profound benevolence and embracing care. Think: a tender uncle reading you a love letter.

---

### Type 3 — Le Performant

**Femme**
> Female narrator voice, early thirties, bright clear mezzo timbre with forward placement and a polished radiant quality. Confident warmly engaging delivery. Distinctive shared articulation: crisp confident release on every consonant, bright forward sibilants (clean and energizing), punchy plosives at phrase starts giving energizing entry, every word fully present. Bright open peak vowels. Prosody: confident downward statements (resolved, never tentative), distinct smile-in-voice, slight bright rise on key motivating words. Rhythm: brisk and energizing but never rushed, controlled and presentational. Texture: bright forward (mask placement), clean and polished. Signature tic: peppy energetic attack on first syllable of each new idea, charisma audible in the lift on action verbs. Conveys polished confident charm. Think: a charismatic TED speaker who genuinely believes her message.

**Homme**
> Male narrator voice, mid-thirties, bright clear baritone timbre with forward placement and a polished radiant quality. Confident warmly engaging delivery. Distinctive shared articulation: crisp confident release on every consonant, bright forward sibilants (clean and energizing), punchy plosives at phrase starts giving energizing entry, every word fully present. Bright open peak vowels. Prosody: confident downward statements (resolved, never tentative), distinct smile-in-voice, slight bright rise on key motivating words. Rhythm: brisk and energizing but never rushed, controlled and presentational. Texture: bright forward (mask placement), clean and polished. Signature tic: peppy energetic attack on first syllable of each new idea, charisma audible in the lift on action verbs. Conveys polished confident charm. Think: a charismatic TED speaker who genuinely believes his message.

---

### Type 4 — L'Individualiste

**Femme**
> Female narrator voice, early thirties, smoky mezzo-alto timbre with rich lower resonance and a touch of velvet rasp on sustained notes. Melancholic, deeply expressive, soulful delivery. Distinctive shared articulation: lingering sustained vowels (held longer than expected, almost mournful), slightly rolled and elongated "r" sound (soft and lingering, never theatrical), audible exhale-sighs between phrases, dropped soft endings on emotional moments. Prosody: melodic and sustained, dropping melancholic terminal cadences, slow contemplative arcs. Rhythm: slow with dramatic emotional pauses, never rushed. Texture: smoky and breathy, slight velvet rasp on long-held vowels, deeply present. Signature tic: audible exhaled sigh between phrases, occasional whispered "oh" or breath-syllable, lingering on emotionally weighted vowels. Conveys poetic melancholy and authentic feeling. Think: a woman reading her own diary by candlelight, fully inhabiting each memory.

**Homme**
> Male narrator voice, mid-thirties, smoky low baritone timbre with rich chest resonance and a touch of velvet rasp on sustained notes. Melancholic, deeply expressive, soulful delivery. Distinctive shared articulation: lingering sustained vowels (held longer than expected, almost mournful), slightly rolled and elongated "r" sound (soft and lingering, never theatrical), audible exhale-sighs between phrases, dropped soft endings on emotional moments. Prosody: melodic and sustained, dropping melancholic terminal cadences, slow contemplative arcs. Rhythm: slow with dramatic emotional pauses, never rushed. Texture: smoky and breathy, slight velvet rasp on long-held vowels, deeply present. Signature tic: audible exhaled sigh between phrases, occasional whispered "oh" or breath-syllable, lingering on emotionally weighted vowels. Conveys poetic melancholy and authentic feeling. Think: a man reading his own diary by candlelight, fully inhabiting each memory.

---

### Type 5 — L'Investigateur

**Femme**
> Female narrator voice, mid-thirties, cool clear mezzo timbre with contained dry resonance, neither warm nor cold but perfectly poised. Quiet contained intellectually present delivery. Distinctive shared articulation: dry low-air consonants (precise but never effortful), perfectly contained "t" and "s" (no airy excess), every word chosen carefully. No vocal expansion, no warmth flourish. Prosody: narrow controlled pitch range, calm plateau-like delivery with slight terminal drop, weighted emphasis on single key words. Rhythm: measured and deliberate, with characteristic thinking pauses before precise word choices. Texture: cool and quiet, contained natural low volume, no breathiness, no fry. Signature tic: micro-pauses preceding precise terminology, the audible sound of careful selection. Conveys quiet intellectual depth and observational calm. Think: a research librarian who has spent years with this specific text.

**Homme**
> Male narrator voice, late thirties, cool clear baritone timbre with contained dry resonance, neither warm nor cold but perfectly poised. Quiet contained intellectually present delivery. Distinctive shared articulation: dry low-air consonants (precise but never effortful), perfectly contained "t" and "s" (no airy excess), every word chosen carefully. No vocal expansion, no warmth flourish. Prosody: narrow controlled pitch range, calm plateau-like delivery with slight terminal drop, weighted emphasis on single key words. Rhythm: measured and deliberate, with characteristic thinking pauses before precise word choices. Texture: cool and quiet, contained natural low volume, no breathiness, no fry. Signature tic: micro-pauses preceding precise terminology, the audible sound of careful selection. Conveys quiet intellectual depth and observational calm. Think: a research librarian who has spent years with this specific text.

---

### Type 6 — Le Loyal

**Femme**
> Female narrator voice, early thirties, clear alert mezzo timbre with slightly forward placement and a bright but not piercing quality. Engaged, watchful, emotionally invested delivery. Distinctive shared articulation: alert slightly tight-throated consonants, edge on "t" and "k" (sharp but not harsh, like attention crystallized), every word actively chosen. Subtle vocal lean-in on important details. Prosody: variable energy with characteristic slight upspeak (questioning lifts at phrase ends, as if checking the listener is following), mid-phrase pauses for verification. Rhythm: variable — faster when energized, careful and weighted on key facts. Texture: alert, slightly tight throat tension (active engagement, not anxiety), bright awareness. Signature tic: tiny upturning lift at clause ends inviting confirmation, audible attentiveness to the listener. Conveys vigilant warm loyalty and present engagement. Think: a trusted friend telling you a story she really wants you to understand correctly.

**Homme**
> Male narrator voice, mid-thirties, clear alert baritone timbre with slightly forward placement and a bright but not piercing quality. Engaged, watchful, emotionally invested delivery. Distinctive shared articulation: alert slightly tight-throated consonants, edge on "t" and "k" (sharp but not harsh, like attention crystallized), every word actively chosen. Subtle vocal lean-in on important details. Prosody: variable energy with characteristic slight upspeak (questioning lifts at phrase ends, as if checking the listener is following), mid-phrase pauses for verification. Rhythm: variable — faster when energized, careful and weighted on key facts. Texture: alert, slightly tight throat tension (active engagement, not anxiety), bright awareness. Signature tic: tiny upturning lift at clause ends inviting confirmation, audible attentiveness to the listener. Conveys vigilant warm loyalty and present engagement. Think: a trusted friend telling you a story he really wants you to understand correctly.

---

### Type 7 — L'Enthousiaste

**Femme**
> Female narrator voice, late twenties, bright airy mezzo-soprano timbre with light forward placement and dancing musicality. Lively optimistic playfully invested delivery. Distinctive shared articulation: light dancing plosives ("p", "t", "k" released playfully, never weighted), smile-front articulation (lips active forward), every consonant carrying brightness. Prosody: ascending intonation lifts with multiple melodic peaks per sentence, playful melodic dance, lifting endings (curious, open, never closed). Rhythm: faster pace with energetic bursts and rushes, multiple ideas riding a single breath, alive with momentum. Texture: bright and airy, distinct smile-in-voice with occasional half-laugh bubbles, contagious delight. Signature tic: small laugh-breath escaping on delighted words, idea-stacking within a single breath group. Conveys radiant enthusiasm and joyful curiosity. Think: a delighted friend bursting to share something wonderful she just discovered.

**Homme**
> Male narrator voice, early thirties, bright airy tenor-baritone timbre with light forward placement and dancing musicality. Lively optimistic playfully invested delivery. Distinctive shared articulation: light dancing plosives ("p", "t", "k" released playfully, never weighted), smile-front articulation (lips active forward), every consonant carrying brightness. Prosody: ascending intonation lifts with multiple melodic peaks per sentence, playful melodic dance, lifting endings (curious, open, never closed). Rhythm: faster pace with energetic bursts and rushes, multiple ideas riding a single breath, alive with momentum. Texture: bright and airy, distinct smile-in-voice with occasional half-laugh bubbles, contagious delight. Signature tic: small laugh-breath escaping on delighted words, idea-stacking within a single breath group. Conveys radiant enthusiasm and joyful curiosity. Think: a delighted friend bursting to share something wonderful he just discovered.

---

### Type 8 — Le Protecteur

**Femme**
> Female narrator voice, late thirties, full grounded mezzo-alto timbre with rich chest resonance and a touch of warm rasp. Powerful, present, fiercely caring delivery. Distinctive shared articulation: weighted plosives ("p", "b", "d" given full grounded release, never light), rooted strong vowels with full chest support, every consonant carrying weight and conviction. Prosody: strong downward declarative statements (resolved with authority), narrow but powerful pitch range, no tentative lifts. Rhythm: medium-slow and deliberate, never rushed, weight on every syllable, plant-and-deliver pacing. Texture: chesty and full, slight warm rasp on emphasized words and sustained vowels, presence you can feel. Signature tic: weighted single-word emphasis on truth-words, vocal "plant" moments where she stops and grounds before key declarations. Conveys protective rooted authority and unflinching warmth. Think: a fierce mother bear who chooses every word like she's making a vow.

**Homme**
> Male narrator voice, early forties, full grounded bass-baritone timbre with rich chest resonance and a touch of warm rasp. Powerful, present, fiercely caring delivery. Distinctive shared articulation: weighted plosives ("p", "b", "d" given full grounded release, never light), rooted strong vowels with full chest support, every consonant carrying weight and conviction. Prosody: strong downward declarative statements (resolved with authority), narrow but powerful pitch range, no tentative lifts. Rhythm: medium-slow and deliberate, never rushed, weight on every syllable, plant-and-deliver pacing. Texture: chesty and full, slight warm rasp on emphasized words and sustained vowels, presence you can feel. Signature tic: weighted single-word emphasis on truth-words, vocal "plant" moments where he stops and grounds before key declarations. Conveys protective rooted authority and unflinching warmth. Think: a fierce protector who chooses every word like he's making a vow.

---

### Type 9 — Le Médiateur

**Femme**
> Female narrator voice, mid-thirties, smooth flowing mezzo timbre with mellow gentle resonance and naturally soft edges. Calm soothing harmoniously present delivery. Distinctive shared articulation: legato consonants (gliding seamlessly into vowels), soft non-percussive plosives (no sharpness ever), liaison-like flow between words as if they were one melody. Prosody: gentle wavelike rises and falls (no peaks, no valleys, just soft swells), soft un-emphatic endings, no harsh resolutions. Rhythm: slow and flowing, no urgency, no rush, no break in continuity. Texture: smooth and slightly soft, light natural breathiness, no edges, no friction anywhere. Signature tic: soft "mmm" or "ah" between phrases, liaison flow that carries one phrase into the next, complete absence of percussive attacks. Conveys harmonious ease and gentle ever-presence. Think: a wise gentle aunt whose voice itself is a place of rest.

**Homme**
> Male narrator voice, late thirties, smooth flowing baritone timbre with mellow gentle resonance and naturally soft edges. Calm soothing harmoniously present delivery. Distinctive shared articulation: legato consonants (gliding seamlessly into vowels), soft non-percussive plosives (no sharpness ever), liaison-like flow between words as if they were one melody. Prosody: gentle wavelike rises and falls (no peaks, no valleys, just soft swells), soft un-emphatic endings, no harsh resolutions. Rhythm: slow and flowing, no urgency, no rush, no break in continuity. Texture: smooth and slightly soft, light natural breathiness, no edges, no friction anywhere. Signature tic: soft "mmm" or "ah" between phrases, liaison flow that carries one phrase into the next, complete absence of percussive attacks. Conveys harmonious ease and gentle ever-presence. Think: a wise gentle uncle whose voice itself is a place of rest.

---

## Conseils pratiques pour la génération

**Le texte de prévisualisation (preview text)** est aussi influent que la description. Pour chaque type, choisis un extrait narratif d'environ 100-150 mots qui *contient déjà* l'émotion et le rythme du personnage. Pour le Type 4, prends un passage mélancolique avec virgules et respirations. Pour le Type 7, prends un passage joyeux avec exclamations légères. La voix se "calibre" autant sur le texte que sur le prompt.

**Les paramètres au moment de la génération vocale** (pas du voice design) :
- *Stability* : 30-40 pour les types expressifs (4, 7, 8) ; 50-60 pour les types contenus (1, 5, 9). Plus c'est bas, plus c'est expressif et variable.
- *Similarity* : 75-85 pour bien préserver le timbre généré.
- *Style exaggeration* : à doser. 0 pour neutre, 30-40 pour amplifier la signature.

**Sur le multilingue** : génère et teste chaque voix d'abord en anglais (langue native du modèle), puis en français, puis dans tes autres langues cibles. Certains marqueurs voyagent parfaitement (souffle, rythme, prosodie). D'autres se transforment selon la phonologie cible (le R roulé ne se rend pas pareil en allemand qu'en italien). C'est attendu et c'est même un atout : la signature persiste tout en s'adaptant naturellement à chaque langue.

**Validation cross-sex** : pour vérifier que la version H et F d'un même type sonnent comme "le même personnage", fais leur lire le **même paragraphe** et écoute en aveugle. Les marqueurs partagés (rythme, articulation, tics) doivent t'apparaître clairement. Si seul le timbre te semble distinguer, c'est gagné.

**Itération** : il faudra probablement régénérer 2-3 fois chaque description pour trouver la variante qui sonne le plus juste. Sauvegarde celles qui ont le bon *grain*, même si l'émotion semble imparfaite — l'émotion se réajuste à la lecture, le grain non.
