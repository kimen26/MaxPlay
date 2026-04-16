# MaxPlay — Fiche specs des mini-jeux

> Source de vérité pour chaque jeu : objectif pédagogique, mécanique, pool de lignes, et règles.
> À consulter avant toute modification d'un jeu.

---

## Règle transverse (s'applique à TOUS les jeux)

- **Bus** : modèle unique turquoise RATP. Seule la **fenêtre destination** change (couleur + numéro de la ligne). Jamais d'autre élément modifié.
- **Couleurs** : TOUJOURS depuis `data.js` → `LIGNES`. Jamais de valeur hex hardcodée dans un jeu.
- **Bus SVG** : `busSVG()` ou `busSVGHiddenNum()` de `game-html/js/bus-svg.js`. Jamais de SVG inline, jamais d'emoji, jamais de div CSS colorée.
- **Pool sans audio** : uniquement les lignes que Max connaît bien (list restreinte ci-dessous par jeu).
- **Pool avec audio TTS** : toutes les lignes de `LIGNES` (data.js) — la voix annonce le nom, pas de risque de confusion.

---

## MJ-01 — Quelle couleur ?

**Fichier** : `game-html/mj-01.html`

**Objectif pédagogique** : Reconnaître la couleur associée à chaque numéro de ligne.

**Mécanique** :
- Max voit le bus avec la **fenêtre destination en couleur** + le **numéro visible** dedans
- Il doit taper la pastille de la bonne couleur parmi 6 proposées
- Anti-doublons : `selectDistinctColors()` évite 2 couleurs trop proches dans les 6 swatches

**Pool** : `LIGNES.filter(l => l.num !== 'TVM')` — toutes sauf TVM (doublon couleur 162)

**Audio** : TTS facultatif (bouton "Écouter") — lit "Quelle couleur est le bus 162 ?"

**Pourquoi pas tout le pool** : pas d'audio auto → Max doit reconnaître visuellement. Les lignes avec couleurs proches (N15/N22, V6/380) sont filtrées par `selectDistinctColors`.

---

## MJ-02 — Quel numéro ?

**Fichier** : `game-html/mj-02.html`

**Objectif pédagogique** : Associer la couleur d'une ligne à son numéro.

**Mécanique** :
- Max voit le bus avec la **fenêtre destination en couleur** + le **numéro caché** (`busSVGHiddenNum`)
- Il doit choisir le bon numéro parmi 6 boutons texte
- Après réponse : `revealBusNumber()` révèle le numéro en fondu
- Anti-doublons couleurs sur les 6 choix

**Pool** : `POOL_MJ02 = LIGNES.filter(l => !['V6', '2234', 'N22', 'TVM'].includes(l.num))`
→ Exclut les doublons de couleur (V6≈380, 2234≈132, N22≈N15, TVM≈162)

**Audio** : aucun (pas de TTS)

---

## MJ-02b — Devine le numéro (version TTS)

**Fichier** : `game-html/mj-02b.html`

**Objectif pédagogique** : Idem MJ-02 mais avec aide audio — associer un numéro **entendu** à sa représentation visuelle.

**Mécanique** :
- TTS annonce le numéro à l'entrée de la question (ex : "Bus cent soixante-deux")
- Max voit le bus avec la **fenêtre destination en couleur** + le **numéro caché**
- Il choisit le bon numéro parmi 6 boutons
- Bouton 🔊 pour répéter l'annonce
- Après bonne réponse : `revealBusNumber()` + TTS dit "Bravo ! C'était le bus 162"

**Pool** : `LIGNES` complet (data.js) — audio = pas de confusion possible

**Audio** : TTS obligatoire (Web Speech API, fr-FR, rate 0.85)

---

## MJ-03a — Compte les passagers

**Fichier** : `game-html/mj-03a.html`

**Objectif pédagogique** : Dénombrement visuel rapide (comptage jusqu'à ~12).

**Mécanique** :
- Groupes de personnages emojis affichés
- Max compte et choisit parmi 4 réponses numériques

**Bus** : non utilisé — jeu de comptage pur

**Pool lignes** : N/A

---

## MJ-03b — La bonne place

**Fichier** : `game-html/mj-03b.html`

**Objectif pédagogique** : Addition/soustraction simple en contexte bus (places libres, gens qui montent/descendent).

**Mécanique** :
- Bus décoratif affiché (contexte visuel)
- Grille de places (ocupées/libres)
- Problème : "il y a X places, Y personnes montent, combien reste-t-il de places ?"
- 4 réponses proposées

**Bus** : `busSVG()` — bus décoratif d'une ligne aléatoire, rôle visuel uniquement

**Pool** : `POOL_MJ03B = ['162','172','185','380','V7','131','125','132','180','47','186']`
→ Lignes quotidiennes de Max, pas besoin du pool complet (bus purement décoratif)

**Audio** : aucun

---

## MJ-04 — Lis la phrase

**Fichier** : `game-html/mj-04.html`

**Objectif pédagogique** : Lecture de mots simples + compréhension de phrases. Max est en apprentissage de lecture syllabique.

**Mécanique** :
- Phrase affichée avec un mot manquant `[?]`
- 4 grands boutons avec des mots en majuscules
- Bouton "Écouter" → TTS lit la phrase avec "quelque chose" à la place du mot
- Après bonne réponse : TTS lit la phrase complète

**Bus** : non utilisé (jeu de lecture)

**Mots Phase 1** : BUS, TRAM, METRO, ROUGE, VELO, VERT, TRAIN, BLEU, BRAVO, MERCI, LOUP, MAX, PAPA, MAMAN

**Audio** : TTS obligatoire (Web Speech API, fr-FR, rate 0.85)

---

## MJ-05 — Terminus

**Fichier** : `game-html/mj-05.html`

**Objectif pédagogique** : Mémoriser les destinations réelles des lignes de Max. Ancrage sur les vrais trajets.

**Mécanique** :
- Panneau style RATP (fond noir, effet lumineux) avec badge de ligne coloré + flèche
- La destination est cachée (affiche `?`)
- 3 destinations proposées en dessous
- Après bonne réponse : TTS dit "Le 162 va vers Porte de Champerret !"

**Bus** : non utilisé — badge de ligne (carré coloré avec numéro)

**Couleurs badges** : `getBadgeStyle(ligneNum)` depuis `LIGNES` de data.js — jamais de classe CSS hardcodée

**Pool** : **Tous les bus** (TERMINUS_DATA, 21 entrées = LIGNES complet) — variable renommée `TERMINUS_DATA` pour éviter conflit avec `DESTINATIONS` de data.js.
| Ligne | Destination | Direction |
|-------|-------------|-----------|
| M7 | Villejuif - Louis Aragon | sud |
| M6 | Nation | est |
| T7 | Villejuif - Louis Aragon | sud |
| 125 | Porte de Gentilly | nord |
| 131 | Porte d'Italie | nord |
| 132 | Porte de Choisy | nord |
| 162 | Clamart - Hôpital Béclère | sud |
| 172 | Porte de Bagnolet | nord |
| 180 | Porte de Clignancourt | nord |
| 184 | Orly - Aéroport | sud |
| 185 | Porte d'Italie | nord |
| 186 | Porte d'Orléans | ouest |
| 286 | Villejuif - Louis Aragon | sud |
| 323 | Rungis - La Fraternelle | sud |
| 380 | Créteil - Préfecture | est |
| 2234 | Massy - Palaiseau | ouest |
| 47 | Porte de Bagnolet | nord |
| N15 | Gare de Lyon | nord |
| N22 | Châtelet | nord |
| V6 | L'Haÿ-les-Roses - Mairie | nord |
| V7 | Chevilly - Marché | sud |

**Audio** : TTS après bonne réponse (obligatoire)

---

## MJ-06 — Au garage !

**Fichier** : `game-html/mj-06.html`

**Objectif pédagogique** : Reconnaître les bus par leur couleur + numéro. Motricité (drag & drop).

**Mécanique** :
- 6 bus draggables à gauche
- 6 slots de garage à droite (colorés + numéro)
- Glisser chaque bus vers sa case → porte de garage se ferme
- Mauvais slot : animation shake + retour position initiale

**Bus** : `busSVG()` — bus avec fenêtre destination colorée + numéro visible

**Pool** : 6 lignes tirées aléatoirement depuis toutes les lignes de couleur unique (`LIGNES` filtré sur couleurs uniques, via `selectDistinctColors(pool, 6, 60)`)
→ Audio implicite (sons de garage) → pool complet autorisé

**Couleurs slots** : dérivées de la couleur IDFM de la ligne (`hexToSlotBg()`)

**Audio** : sons de garage (tschh = parking OK, buzz = mauvaise place)

---

## MJ-07 (menu) — Trie les bus !

**Fichier** : `game-html/mj-08.html` (numéro 7 dans le menu, fichier nommé mj-08)

**Objectif pédagogique** : Classer les bus par famille de couleur. Triage, catégorisation.

**Mécanique** :
- 21 bus SVG posés aléatoirement (X+Y random, sans chevauchement)
- 6 boîtes de familles à droite (colonne fixe)
- Glisser chaque bus vers sa boîte de couleur
- Mauvais groupe : shake + retour position initiale
- Victoire : défilé de toutes les familles avec leurs bus

**Bus** : `busSVG()` — bus avec carrosserie en couleur de la ligne, numéro visible

**Pool** : **Tous les bus** (ALL_BUSES = LIGNES, 21 lignes)

**Positions** : Aléatoires (random X + Y), sans chevauchement, sans toucher la zone boîtes

**Familles (6 groupes)** :
| Famille | Lignes | Couleurs |
|---------|--------|----------|
| 🔵 Bleu | 162, 125, N15, N22 | #0064B1, #006EB8, #000091 |
| 🟢 Vert | 172, 380, V6, M6 | #008C59, #75CE89, #6ECA97 |
| 🟡 Orange/Jaune | 185, 184, T7, 323, 180 | #F58443, #DCAC27, #C2A000, #CEC92A, #9B9839 |
| 🟣 Violet/Rose | 132, 2234, 286, 186, 47, M7 | #652C90, #B43C95, #C9A2CD, #FF82B4, #FA9ABA |
| 🔴 Rouge | V7 | #E3051C |
| 🟤 Brun | 131 | #8D653A |

**Audio** : sons AudioContext (ok/wrong/victory)

---

## MJ-08 (menu) — La journée de Max (Sandbox)

**Fichier** : `game-html/mj-07.html` (splash intro) + `game/` (Phaser app, build → `mj-07/`)

**Objectif pédagogique** : Libre exploration — Max se déplace dans Villejuif, monte dans les bus, découvre son quartier.

**Mécanique** :
- Vue top-down (GTA1/Pokémon style)
- Tap pour se déplacer sur la route
- Snap-to-road : le personnage reste sur la chaussée
- Passagers sur les trottoirs
- Bus M7 circulant sur l'axe vertical

**Bus** : sprite Phaser (topdown), setTint() pour la couleur

**Lignes présentes** : M7 (fixe pour l'instant — EP-005 prévu pour expansion)

**Audio** : sons Web Audio API (moteur bus, ding d'arrêt)

---

## Référentiel couleurs

Toujours depuis `game-html/js/data.js` → tableau `LIGNES`.

Lignes à double couleur (à exclure des quiz sans audio pour éviter confusion) :
- `N15` et `N22` : même bleu nuit `#000091`
- `V6` et `380` : même vert `#75CE89`
- `132` et `2234` : même violet `#652C90`
- `TVM` et `162` : même bleu `#0064B1`
