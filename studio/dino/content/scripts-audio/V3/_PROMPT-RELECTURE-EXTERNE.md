# Prompt de contexte — Relecture V3 Fiches Audio Dino (51 dinos)

> Pour l'autre LLM (illimité) — Mission : lancer les agents de relecture sur les scripts audio V3
> Projet : MaxPlay — Encyclopédie dinosaure pour enfant 4 ans (Max)
> Date : 2026-06-14

---

## 1. CONTEXTE PROJET

**MaxPlay** = jeu éducatif dinosaure pour Max (4 ans). Papa Yann pilote. 51 dinosaures + reptiles préhistoriques couverts.

**Pipeline audio actuelle** :
```
Scripts V3 (texte) → Relecture conseillers → Panel enfants → Dyades → Corrections → JSON → ElevenLabs → MP3
```

**Les scripts V3 sont PRÊTS** — 8 fichiers, 51 dinos, format dialogue Narrateur H + Wex, 4 blocs par dino. Relecture interne Kimi faite : 13 corrections d'échelle appliquées, 3 micro-fixes (typo + onomatopées). **Zero interdit détecté.**

---

## 2. ARCHITECTURE AGENTS — QUI APPELER

Les agents vivent dans `.claude/agents/*.md`. Tu les invoques un par un, séquentiellement.

### ÉTAPE 1 — Conseiller factuel : `dino-conseiller`

**Fichier** : `.claude/agents/dino-conseiller.md`

**Mission** : Vérifier l'honnêteté scientifique, l'échelle, les faits.
- Fact-check : dates, tailles, régimes, étymologies vs `dinos-data.js`
- Vérifier comparaisons d'échelle (doivent passer par `_compLong/_compHaut/_compPoids`)
- Vérifier termes savants expliqués (L-D01/L-D09)
- Vérifier non-dinosaures signalés avec bienveillance
- **Ne PAS valider** — produire une liste de questions/doutes à trancher

**Data pull obligatoire** (lire AVANT de répondre) :
1. `studio/dino/figees/encyclopedie.md` — règles verrouillées
2. `studio/dino/pmo/INVARIANTS.md` — échelle, casting
3. `site/js/dinos-data.js` — source de vérité chiffres
4. `studio/dino/content/sources/etymo/_ETYMO-RACINES-50.md` — dictionnaire racines
5. Les 8 fichiers V3 dans `studio/dino/content/scripts-audio/V3/*.md`

**Livrable** : Fichier `studio/dino/content/scripts-audio/V3/_RELECTURE-dino-conseiller.md` avec :
- Doutes par dino (si factuel)
- Questions ouvertes pour Papa Yann
- Échelle : OK / À vérifier / Erreur

---

### ÉTAPE 2 — Conseiller craft : `narration-conseiller`

**Fichier** : `.claude/agents/narration-conseiller.md`

**Mission** : Vérifier le craft narratif, le rythme, la cohérence du dialogue.
- Boucle fermée Wex→Narrateur : chaque question a sa réponse ?
- Rythme : pas de monologue, 1-3 phrases Narrateur, 1 ligne Wex
- Questions Wex : naturelles, enfantines 4 ans, jamais forcées
- Chutes douces : chaque bloc D termine sur une image
- Tritri = running gag présent ? (uniquement Crétacé)
- Tags v3 : bien répartis, pas 3 collés
- MAJUSCULES : mots forts > 4 lettres, pas de CAPS sur mots courts
- **Ne PAS réécrire** — produire des pistes d'amélioration

**Data pull** :
1. `studio/dino/content/scripts-audio/V3/CONSIGNES.md` — style V3 canonique
2. `studio/dino/content/scripts-audio/_TEMPLATE-4blocs-dialogue.md` — template
3. Les 8 fichiers V3

**Livrable** : `studio/dino/content/scripts-audio/V3/_RELECTURE-narration-conseiller.md` avec :
- Remarques par dino (craft)
- Patterns répétitifs à lisser
- Suggestions (pas de réécriture)

---

### ÉTAPE 3 — Panel enfants : `narration-lecteur`

**Fichier** : `.claude/agents/narration-lecteur.md`

**Mission** : Simuler 2 profils d'enfants 4-6 ans qui écoutent les fiches.

**AVANT** : Lire `studio/narration/equipe/profils-lecteurs.md` — **panel 20 = INVARIANT (DEC-PANEL-20)**. Les codes ci-dessous sont les VRAIS codes du panel. **Ne JAMAIS inventer un code de profil.**

**2 profils à incarner** (un par fichier) :
- **Profil G-A1** (garçon normal, 3-5 ans — véhicules/animaux, aime quand ça bouge)
- **Profil F-A2** (fille intro/observatrice, 3-5 ans — douce, attentive aux détails)

**Format par profil** (texte libre, pas de cases) :
```
## Dino : [Nom]

J'ai aimé : [ce qui m'a fait sourire, ce que je retiens]
J'ai pas trop aimé : [ce qui m'a perdu, ce que j'ai pas compris]
Ce que je retiens : [1-2 images précises]
Questions : [si j'ai demandé "pourquoi ?"]
```

**Livrables** :
- `studio/dino/content/scripts-audio/V3/_RELECTURE-lecteur-G-A1.md`
- `studio/dino/content/scripts-audio/V3/_RELECTURE-lecteur-F-A2.md`

---

### ÉTAPE 4 — Dyades parent-enfant : `narration-lecteur-dyade`

**Fichier** : `.claude/agents/narration-lecteur-dyade.md`

**Mission** : Simuler 4 dyades (parent + enfant) qui lisent à voix haute.

**AVANT** : Lire `studio/narration/equipe/profils-lecteurs.md` — **panel 20 = INVARIANT (DEC-PANEL-20)**. Codes dyades réels : `DPG-A/B` · `DPF-A/B` · `DMG-A/B` · `DMF-A/B` (A = 3-5 ans, B = 6-7 ans). **Il n'existe PAS de code `-C` ni `-D`.** Ne JAMAIS inventer.

**4 dyades à incarner** — **2 âges fixes : 4 ans et 7-8 ans** × (papa/maman) × (garçon/fille). Code panel le plus proche entre crochets (A = petit / B = grand) :
- **DPG-A** : Papa + garçon **4 ans** (réactif, véhicules/animaux)
- **DMF-A** : Maman + fille **4 ans** (sensible atmosphères/silences)
- **DPG-B** : Papa + garçon **7-8 ans** (autonome, repère les incohérences, sait lire)
- **DMF-B** : Maman + fille **7-8 ans** (exigeante, compare avec d'autres histoires)

**Format par dyade** (2 voix séparées) :
```
## Dino : [Nom]

### Voix Enfant
J'ai aimé : [...]
J'ai pas compris : [...]
J'ai demandé pendant la lecture : [...]
Ce que je retiens : [1-2 images]

### Voix Parent
Ce qui a bien fonctionné : [...]
Moments accroché/décroché : [...]
Vocabulaire/tournure problématique : [...]
Rythme : [fluide / haché / trop dense / parfait]
Note sur la fin : [...]
```

**Livrables** :
- `studio/dino/content/scripts-audio/V3/_RELECTURE-dyade-DPG-A.md` (papa+garçon 4 ans)
- `studio/dino/content/scripts-audio/V3/_RELECTURE-dyade-DMF-A.md` (maman+fille 4 ans)
- `studio/dino/content/scripts-audio/V3/_RELECTURE-dyade-DPG-B.md` (papa+garçon 7-8 ans)
- `studio/dino/content/scripts-audio/V3/_RELECTURE-dyade-DMF-B.md` (maman+fille 7-8 ans)

---

## 3. RÈGLES DE PASSAGE ENTRE ÉTAPES

```
Étape 1 (dino-conseiller) → Étape 2 (narration-conseiller) → Étape 3 (lecteurs) → Étape 4 (dyades)
```

- **Chaque étape lit les livrables des étapes précédentes** pour ne pas répéter les mêmes remarques
- **Si une étape trouve une erreur critique** (factuelle) → la remonter immédiatement, ne pas attendre la fin
- **Le panel lecteur et les dyades ne corrigent pas** — ils réagissent comme des enfants/parents

---

## 4. FICHIERS SOURCE À LIRE

### Les 8 scripts V3 (les relire en entier) :
1. `studio/dino/content/scripts-audio/V3/ceratopsiens.md` — 5 dinos (Tricératops, Torosaure, Protocératops, Pentacératops, Centrosaure)
2. `studio/dino/content/scripts-audio/V3/trex-lot1.md` — 7 dinos (T-Rex, Spinosaure, Giganotosaure, Carcharodontosaure, Allosaure, Tarbosaure, Baryonyx)
3. `studio/dino/content/scripts-audio/V3/trex-lot2.md` — 5 dinos (Albertosaure, Cératosaure, Dilophosaure, Carnotaure, Cryolophosaure)
4. `studio/dino/content/scripts-audio/V3/sauropodes.md` — 7 dinos (Brachiosaure, Diplodocus, Apatosaure, Camarasaure, Amargasaure, Plateosaure, Titanosaure)
5. `studio/dino/content/scripts-audio/V3/volants-marins.md` — 10 dinos (Ptéranodon, Quetzalcoatlus, Archéoptéryx, Mosasaure, Élasmosaure, Ophthalmosaure, Liopleurodon, Archélon, Shonisaure, Ichtyosaure)
6. `studio/dino/content/scripts-audio/V3/armes-bizarres.md` — 6 dinos (Ankylosaure, Euoplocéphale, Stégosaure, Kéntrosaure, Thérizinosaure, Dimétrodon)
7. `studio/dino/content/scripts-audio/V3/ornithopodes-raptors.md` — 11 dinos (Parasaurolophus, Edmontosaure, Iguanodon, Pachycéphalosaure + Vélociraptor, Deinonychus, Utahraptor, Microraptor, Troodon, Gallimimus, Oviraptor)
8. `studio/dino/content/scripts-audio/V3/CONSIGNES.md` — style V3 canonique

### Références obligatoires :
- `site/js/dinos-data.js` — source de vérité chiffres
- `studio/dino/figees/encyclopedie.md` — règles figées
- `studio/dino/pmo/INVARIANTS.md` — échelle, casting, leçons
- `studio/dino/content/sources/etymo/_ETYMO-RACINES-50.md` — dictionnaire racines
- `studio/dino/content/scripts-audio/_LEXIQUE-PRONONCIATION.md` — prononciation
- `studio/dino/content/scripts-audio/_TEMPLATE-4blocs-dialogue.md` — template
- `studio/narration/equipe/profils-lecteurs.md` — profils panel (si existe, sinon inventer 2 profils crédibles)

---

## 5. RÈGLES ABSOLUES (non négociables)

- **JAMAIS** dire "Max", "doudou", "peluche", "nounours" dans un script audio
- **JAMAIS** dire "regarde" — on dit "écoute"
- **Bus** uniquement en comparaison d'échelle (pas en narration)
- **Tritri** = Tricératops, running gag uniquement au Crétacé
- **Échelle** : référentiel figé `_compLong/_compHaut/_compPoids` — jamais inventer
- **Terme savant** = expliqué dans la foulée (L-D01/L-D09)
- **Wex** : FR standard, pas de `!` final, questions vraies d'enfant 4 ans
- **Tags v3** : max 2 collés au début, plusieurs dans la phrase OK

---

## 6. LIVRABLES ATTENDUS (dans `studio/dino/content/scripts-audio/V3/`)

| Fichier | Agent | Contenu |
|---------|-------|---------|
| `_RELECTURE-dino-conseiller.md` | dino-conseiller | Doutes factuels, échelle, étymologie |
| `_RELECTURE-narration-conseiller.md` | narration-conseiller | Remarques craft, rythme, cohérence |
| `_RELECTURE-lecteur-G-A1.md` | narration-lecteur | Réactions enfant 4 ans garçon |
| `_RELECTURE-lecteur-F-A2.md` | narration-lecteur | Réactions enfant 5 ans fille |
| `_RELECTURE-dyade-DPG-A.md` | narration-lecteur-dyade | Papa + garçon 4 ans |
| `_RELECTURE-dyade-DMF-A.md` | narration-lecteur-dyade | Maman + fille 4 ans |
| `_RELECTURE-dyade-DPG-B.md` | narration-lecteur-dyade | Papa + garçon 7-8 ans |
| `_RELECTURE-dyade-DMF-B.md` | narration-lecteur-dyade | Maman + fille 7-8 ans |

---

## 7. SI BESOIN DE PMO

Si une décision doit être gravée (règle figée, leçon, changement échelle) :
- **Appeler** `narration-pmo` ou `dino-pmo` (selon le pôle)
- **Fichier PMO** : `studio/dino/pmo/backlog.md` — ajouter un ticket
- **Décision** : `studio/dino/pmo/decisions.md` — dater + raison + impact

---

## 8. MÉMO POUR L'AGENT

- Les scripts V3 ont déjà été relus par Kimi (interne) : 13 corrections d'échelle + 3 micro-fixes
- **Ne pas répéter** les mêmes remarques si déjà notées dans ce prompt
- **Focus** : ce que Kimi n'a pas vu (angles morts, réactions enfant réelles, dyades)
- **Ne pas réécrire** — produire des notes, des pistes, des questions
- **Papa Yann tranche** — toi tu observes, tu notes, tu remontes

---

*Fin du prompt. Lancer l'étape 1 (`dino-conseiller`) en premier.*
