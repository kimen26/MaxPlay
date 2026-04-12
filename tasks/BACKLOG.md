# MaxPlay – Backlog

> Source de vérité du projet. Survit aux reboots de session.
> IDs stables : `EP-001` épics, `T-001` tâches, `D-001` décisions, `L-001` leçons.
> Statuts : `[ ]` à faire · `[~]` en cours · `[x]` terminé · `[!]` bloqué · `[?]` à décider

---

## Épics

| ID | Titre | Statut |
|----|-------|--------|
| EP-001 | Infrastructure & config Claude | `[x]` |
| EP-002 | Direction artistique & univers | `[x]` |
| EP-003 | Scaffold Phaser.js | `[x]` |
| EP-007 | Config Claude avancée (hooks) | `[x]` |
| EP-010 | Assets & outils graphiques | `[x]` |
| EP-004 | Architecture V0 (HTML quiz + Phaser sandbox) | `[x]` |
| EP-MJ01 | MJ-01 · Quelle couleur ? | `[x]` |
| EP-MJ02 | MJ-02 · Quel numéro ? | `[x]` |
| EP-MJ03 | MJ-03 · Devine le numéro (TTS) | `[x]` |
| EP-MJ04 | MJ-04 · Compte les passagers | `[x]` |
| EP-MJ05 | MJ-05 · La bonne place (soustraction) | `[x]` |
| EP-MJ06 | MJ-06 · Lis la phrase | `[x]` |
| EP-MJ07 | MJ-07 · Terminus | `[x]` |
| EP-MJ08 | MJ-08 · Au garage ! | `[x]` |
| EP-MJ09 | MJ-09 · Trie les bus ! | `[x]` |
| EP-MJ10 | MJ-10 · Tableau de bord (sons) | `[x]` |
| EP-MJ11 | MJ-11 · Quel pays ? (drapeaux) | `[x]` |
| EP-MJ13 | MJ-13 · L'arrêt de bus (panneau RATP) | `[x]` |
| EP-MAXADV | Max Adventure · La journée de Max (sandbox Phaser) | `[x]` |
| EP-005 | Système de progression (flotte + carte) | `[ ]` |
| EP-006 | Audio (sons + musique + TTS) | `[ ]` |
| EP-008 | Recherche motricité enfant 3-4 ans | `[ ]` |
| EP-009 | Recherche audio : TTS, voix, streaming | `[ ]` |

---

## Architecture V0 – Option C (validée 2026-03-10)

```
MaxPlay V0
├── game-html/index.html     ← Menu 2 colonnes (14 mini-jeux + Max Adventure)
│   ├── mj-01.html · Quelle couleur ?
│   ├── mj-02.html · Quel numéro ?
│   ├── mj-03.html · Devine le numéro (TTS) — pool 362 lignes IDFM
│   ├── mj-04.html · Compte les passagers
│   ├── mj-05.html · La bonne place
│   ├── mj-06.html · Lis la phrase
│   ├── mj-07.html · Terminus
│   ├── mj-08.html · Au garage ! — pool 362 lignes IDFM
│   ├── mj-09.html · Trie les bus ! — pool 362 lignes IDFM
│   ├── mj-10.html · Tableau de bord — 12 boutons sons sandbox
│   ├── mj-11.html · Quel pays ? — drapeaux + TTS + confettis
│   ├── mj-12.html · Nouveaux sons — tableau de bord 22 sons + easter egg
│   ├── mj-13.html · L'arrêt de bus — panneau RATP + fiches LED
│   ├── max-adventure.html · splash → ./max-adventure/
│   └── js/
│       ├── data.js    ← LIGNES (26 actives), source de vérité
│       ├── idfm.js    ← IDFM_REFERENTIEL (362 lignes complètes)
│       ├── bus-svg.js ← busSVG(), busSVGHiddenNum(), selectDistinctColors()
│       ├── sounds.js  ← Web Audio API
│       └── feedback.js ← feedback visuel/sonore + busParade()
└── game/                    ← Sandbox Phaser.js (Max Adventure)
    └── Max Adventure · La journée de Max
```

**Principe** : HTML pour les jeux quiz (simple, livrable vite), Phaser pour la sandbox/action.
**Déploiement** : static file, zéro serveur. GitHub Pages ou Netlify.

---

## Fiches mini-jeux V0

### MJ-01 · Quelle couleur ?

| | |
|--|--|
| **But pédagogique** | Mémoriser les couleurs des lignes — Max les connait déjà par cœur |
| **Mécanique** | Numéro affiché seul (ex : "**162**") → 4 swatches de couleur → tap la bonne |
| **Ce qui est caché** | La couleur n'est JAMAIS visible avant la réponse |
| **Pool lignes** | **Toutes les 20 lignes connues de Max** — y compris les centaines (172, 185, 2234...) |
| **TVM** | Cas particulier → exclu pour l'instant |
| **Ambiguïtés** | 380=V6 (vert clair), 132=2234 (violet), N15=N22 (bleu nuit) → **les 2 réponses acceptées** |
| **Feedback ambiguïté** | Message "Les deux sont [couleur] !" + les deux bus s'affichent |
| **Progression** | Commence par les 5 lignes du quotidien → toutes les lignes |
| **Feedback** | Bus apparaît dans sa couleur + son klaxon |
| **Tech** | HTML · SVG template bus-svg.ts |

---

### MJ-02 · Quel numéro ?

| | |
|--|--|
| **But pédagogique** | Mémorisation inverse : retrouver le numéro depuis la couleur |
| **Mécanique** | Bus affiché avec sa couleur, numéro caché → 4 choix de numéros → tap le bon |
| **Ce qui est caché** | Le numéro sur le panneau est masqué (recto blanc) |
| **⚠️ Lignes excluses** | **380/V6, 132/2234, N15/N22** — mêmes couleurs = question ambiguë |
| **Règle** | Une question ne doit JAMAIS avoir 2 bonnes réponses possibles |
| **Distracteurs** | Choisir des numéros de couleurs proches → vraie mémorisation |
| **Feedback** | Numéro se révèle sur le bus avec animation + son |
| **Tech** | HTML · SVG template |

---

### MJ-03a · Compte les passagers

| | |
|--|--|
| **But pédagogique** | Dénombrement 1–10, notion de groupe (subitizing) |
| **Mécanique** | Passagers arrivent par groupes → "Combien en tout ?" → choisir le chiffre |
| **Visuel GROUPÉ** | **PAS 8 bonhommes en ligne** → groupements visuels : 2+3+3 ou 2+2+4 |
| **Progression** | Niveau 1 : 1–5 · Niveau 2 : 1–10 · Niveau 3 : groupements plus complexes |
| **Personnages** | Pirate, magicien, roi, archer… passagers insolites = fun |
| **Feedback** | Chaque bonhomme fait un son en montant dans le bus |
| **Tech** | HTML · sprites/characters/ |

---

### MJ-03b · La bonne place (soustraction)

| | |
|--|--|
| **But pédagogique** | Arithmétique appliquée, soustraction, logique |
| **Contexte** | Max a déjà réussi ce type de problème et **demandait plus de difficulté** |
| **Mécanique** | "Le bus a 8 places. 5 sont occupées. 4 personnes attendent. Combien peuvent monter ?" |
| **Variantes** | Places libres / Passagers qui descendent / Combinaisons + et - |
| **Calibrage** | **Max est très bon** → monter vite en difficulté (jusqu'à 20+ places) |
| **Niveaux** | Facile: places ≤ 10 · Moyen: places ≤ 20 · Difficile: 2 étapes (descendre puis monter) |
| **Feedback** | Animation passagers qui montent / s'assoient / restent sur le trottoir |
| **Tech** | HTML |

---

### MJ-04 · Lis le mot

| | |
|--|--|
| **But pédagogique** | Lecture phonétique, syllabe manquante |
| **Mécanique** | Mot affiché avec une syllabe en "?" → 4 syllabes proposées → tap la bonne → voix lit le mot complet |
| **Pool PRIORITAIRE (Phase 1)** | Mots simples que Max sait déjà lire : **CACA, BUS, PAPA, MAMAN, MAX, YANN, CLAUDIA, VALOUETTE, METRO, TRAM, POLICE, POMPIER** |
| **Pool ARRÊTS (Phase 2)** | VIL·LE·JUIF, LOU·IS A·RA·GON, KRE·MLIN, MA·RNE, GUY·AUMARD... |
| **Limite géo** | **Lignes 185 et M7 uniquement** — territoires connus de Max |
| **Ordre** | Mots simples d'abord (5-10 mots), noms d'arrêts ensuite |
| **Feedback** | Voix lit le mot entier + syllabe complétée s'illumine |
| **Tech** | HTML · Web Speech API |

---

### MJ-05 · Quel bus pour aller où ?

| | |
|--|--|
| **But pédagogique** | Logique, géographie locale, mémoire des itinéraires réels de Max |
| **Mécanique** | Destination avec icône → 4 bus proposés → lequel prend-on ? |
| **Situations réelles de Max** | |

| Destination | Bonne réponse | Contexte |
|---|---|---|
| École Montessori 101 | **185** ou **M7** | Trajet quotidien |
| Chez Valouette (marché / piscine / médiathèque Georgette) | **V7** | Surnom affectif |
| Chez mamie → Gare Montparnasse | **M7** puis **M6** | Trajet connu |
| Gare de l'Est (tata Sarah → Strasbourg) | **M7** | Trajet connu |
| Direction Clamart / Maison Blanche | **162** | Max connaît |
| 162 direction Clamart | **Maison Blanche** | Terminus connu |

| | |
|--|--|
| **Feedback** | Mini-animation trajet sur carte stylisée |
| **Tech** | HTML |

---

### MJ-06 · Au garage le soir !

| | |
|--|--|
| **But pédagogique** | Association numéro/place, tri, motricité drag & drop |
| **Mécanique** | Les bus rentrent au centre bus le soir → **drag chaque bus vers sa place numérotée au sol** |
| **Visuel garage** | Cases avec numéro peint au sol (simple, pas de 3D) |
| **Début** | 3 bus, 3 places bien distinctes → jusqu'à 6–8 bus |
| **Détail** | Numéro visible sur le bus ET au sol → Max fait correspondre |
| **Feedback** | Son moteur qui ralentit + porte de garage qui se ferme + lumière qui s'éteint |
| **Cibles** | Min 80×80 px pour la motricité 3-4 ans |
| **Tech** | HTML · Canvas 2D ou CSS drag |

---

### MJ-07 · La journée de Max *(Phaser sandbox)*

| | |
|--|--|
| **But pédagogique** | Exploration libre, logique d'itinéraire, zéro pression |
| **Mécanique** | Carte top-down de Villejuif · Max part de chez lui (Feuillantines) · 3 missions par journée |
| **Flux** | Marcher jusqu'à l'arrêt → identifier le bon bus → monter → trajet → arriver |
| **Missions exemples** | Aller à l'école (185), aller chez Valouette (V7), rentrer chez mamie (M7) |
| **Progression** | Jour 1 : flèches guide · Jour 2 : moins d'aide · Jour 3 : libre |
| **Récompense** | Chaque journée terminée débloque un bus dans la flotte de collection |
| **Assets** | sprites/vehicles/bus/bus-white-all.png + setTint · sprites/vehicles/special/ pour décor |
| **Lacune** | Pas de sprites piétons top-down → à sourcer (itch.io) ou formes simples en attendant |
| **Base existante** | SandboxScene.ts déjà codée → à faire évoluer |
| **Tech** | Phaser.js 3 + TypeScript |

---

### MJ-10 · Tableau de bord

| | |
|--|--|
| **But** | Sandbox libre — explorer les sons du bus sans objectif |
| **Mécanique** | 12 boutons thématiques : klaxon, moteur, porte, freins, sirène, bravo, victoire, ding, buzz, rire, tic-tac + easter egg prout caché (révélé après 5 taps) |
| **UX** | Glow coloré par catégorie, animation flash au tap |
| **Easter egg** | Bouton prout semi-transparent, révélé après 5 taps totaux |
| **Sons** | Web Audio API via sounds.js (singleton AudioContext depuis fix session 10) |
| **Tech** | HTML vanilla · sounds.js |

---

### MJ-11 · Quel pays ?

| | |
|--|--|
| **But pédagogique** | Reconnaissance des drapeaux du monde, géographie |
| **Mécanique** | Drapeau affiché dans la fenêtre destination du bus → 4 choix texte (nom du pays) → TTS lit le nom |
| **Drapeaux** | `flag-icons` CDN (260 drapeaux SVG) via CSS `fi fi-XX` |
| **Affichage** | Drapeau en `background-size:contain` + fond noir (pillarbox) — inset 2px pour voir le contour |
| **Pool** | Mode ⭐ (19 pays connus de Max) ou 🌍 (90+ pays) |
| **Pays connus de Max** | France, Espagne, Royaume-Uni, Italie, Tunisie, Brésil, Suisse, États-Unis, Chine, Japon, Russie, Allemagne, Égypte, Thaïlande, Maroc, Argentine, Pays-Bas, Luxembourg, Cambodge |
| **TTS** | Bouton "🔊 Écouter" — texte fixe (ne révèle jamais le nom). Lu auto à chaque question + après la réponse |
| **Score** | 10 tours, barre de score colorée |
| **Victoire** | 5 paliers selon score : 10/10 confettis drapeaux + son victoire · 8-9 bravo · 6-7 bien joué · 4-5 pas mal · 0-3 encouragements |
| **Confettis** | 40 emojis drapeaux animés Canvas — UNIQUEMENT au 10/10 sans-faute |
| **Tech** | HTML vanilla · flag-icons CDN · bus-svg.js · sounds.js |

---

### MJ-13 · L'arrêt de bus

| | |
|--|--|
| **But pédagogique** | Simuler l'attente à un arrêt de bus avec affichage RATP réaliste |
| **Univers** | Poteau gris RATP standard, fiches LED pour affichage des lignes |
| **Layout** | Flexbox column (body) : header (48px) · panel-zone (flex:1) · road (80px) |
| **Poteau** | Gris (#4a4a4a) avec cercle turquoise BUS (#00c5a0) dans header |
| **Fiches LED** | Panneau RATP classique : 2/3 largeur pour lignes, 1/3 pour "sec" (seconde) |
| **Buses animés** | Route scrollante avec 2-3 buses circulant (sprites ou SVG selon mode) |
| **Modes A/B/C** | 3 variantes mélangées dans 1 seul fichier — différences : animations, timing |
| **Décompte** | Secondes affichées · tick ~5s · freeze à 0 (arrivée bus) |
| **Feedback** | Changement couleur fiches, son Pikachu aléatoire (2 cris possibles) |
| **Score** | Points selon rapidité réaction ou choix correcte |
| **Tech** | HTML vanilla · Flexbox · SVG buses · sounds.js |

---

## Tâches actives

### EP-010 – Assets & outils graphiques ✅
- [x] T-070 : SVG bus side-view (droite + gauche) avec template {{COLOR}}/{{LINE}}
- [x] T-071 : Utilitaire bus-svg.ts (createBusSvg, createBusDataUrl, preloadAllBusTextures)
- [x] T-072 : Sprite sheets topdown sélectionnés (bus 5 couleurs, police, ambulance, taxi, 3 sedans)
- [x] T-073 : Sprites personnages (archer, king, knight, musketeer, pirate, wizard – walk + idle)
- [x] T-074 : docs/ASSETS.md créé (catalogue complet + lacunes identifiées)

### EP-004 – Architecture V0
- [x] T-031 : Sandbox codée – SandboxScene.ts (prototype top-down)
- [x] T-080 : Supprimer `game-html/index.html` v1 (version pédagogiquement cassée) → backup dans `temp/`
- [x] T-081 : Créer nouvelle structure `game-html/` avec composants partagés (SVG bus, feedback, score)
- [x] T-082 : Composant partagé BusCard (SVG + ligne + couleur + état masqué/révélé)
- [x] T-083 : Composant partagé FeedbackOverlay (succès / erreur / encouragement)
- [x] T-084 : Hub menu principal (7 mini-jeux, accès direct)

### EP-MJ01 – MJ-01 · Quelle couleur ?
- [x] T-101 : Données lignes (20 lignes, couleurs, cas ambigus 380/V6, 132/2234, N15/N22)
- [x] T-102 : UI question + 4 swatches
- [x] T-103 : Logique réponse (cas ambigus acceptés, message "Les deux sont...")
- [x] T-104 : Progression niveaux (5 quotidiennes → toutes les lignes)
- [x] T-105 : Feedback + TTS

### EP-MJ02 – MJ-02 · Quel numéro ?
- [x] T-111 : Filtrer les lignes ambiguës (exclure 380/V6, 132/2234, N15/N22)
- [x] T-112 : UI bus affiché + numéro masqué + 4 choix
- [x] T-113 : Logique + feedback révélation

### EP-MJ03A – MJ-03a · Compte les passagers
- [x] T-121 : Système de génération de groupes (2-3 bonhommes max par groupe)
- [x] T-122 : Rendu visuel groupements (2+3+3, pas 8 en ligne)
- [x] T-123 : Choix numérique + feedback son par passager

### EP-MJ03B – MJ-03b · La bonne place
- [x] T-131 : Moteur de problèmes (places total, occupées, attente, places libres)
- [x] T-132 : Génération texte problème + visuel bus intérieur
- [x] T-133 : Calibrage difficulté (Max est très bon → monter vite à 20+ places)
- [~] T-134 : Variantes 2 étapes (descendre puis monter) → TODO

### EP-MJ04 – MJ-04 · Lis le mot
- [x] T-141 : Base de données mots prioritaires (CACA, BUS, PAPA...)
- [x] T-142 : Base de données arrêts 185/M7 (Villejuif, Louis Aragon...)
- [x] T-143 : UI mot avec syllabe manquante
- [x] T-144 : 4 choix de syllabes + logique
- [x] T-145 : TTS lecture du mot complet après réponse

### EP-MJ05 – MJ-05 · Quel bus pour aller où ?
- [x] T-151 : Base de données destinations (école, Valouette, mamie, tata Sarah...)
- [x] T-152 : UI destination + 4 bus proposés
- [x] T-153 : Feedback fin de partie → `busParade()` (défilé de bus en victoire)

### EP-MJ06 – MJ-06 · Au garage le soir !
- [x] T-161 : Bus SVG IDFM (vraies lignes, vraies couleurs) — plus de div CSS colorés
- [x] T-162 : Drag & drop bus → colonne garage droite (cibles min 80px)
- [x] T-163 : 6 lignes quotidiennes Max (162, 185, 380, V7, 131, 125)
- [x] T-164 : Porte de garage animée (height 0→100% depuis bas) + sons

### EP-MJ07 – MJ-07 · La journée de Max (Phaser)
- [x] T-171 : Carte Villejuif top-down (routes H+V, trottoirs, arbres, bâtiments)
- [x] T-172 : Bus topdown avec sprite sheet 7×7 + tap-to-move + 8 directions
- [x] T-173 : 5 passagers à collecter sur les trottoirs
- [x] T-174 : Snap à la route (tap herbe → point le plus proche sur la route)
- [x] T-175 : Déploiement CI : Phaser build → _site/mj-07/ + redirect depuis mj-07.html

### EP-001 – Infrastructure (terminé)
- [x] T-001 : Créer CLAUDE.md format opérationnel
- [x] T-002 : Créer skills organisés en sous-dossiers
- [x] T-003 : Créer docs/VISION.md + REFERENCES.md
- [x] T-004 : Créer tasks/BACKLOG.md
- [x] T-005 : Créer memory/MEMORY.md
- [x] T-006 : Initialiser scaffold Phaser.js (scenes Boot/Preload/Hub)

### EP-002 – Direction artistique ✅
- [x] T-010 : Direction artistique → Flat design arrondi (Toca Boca / Tayo style)
- [x] T-011 : Univers → Ville réaliste Villejuif + vie secrète des bus
- [x] T-012 : Progression → Collection de bus + carte Villejuif qui se dévoile
- [x] T-014 : Bus side-view SVG fourni par l'utilisateur + rangé dans assets

### EP-003 – Scaffold Phaser.js ✅
- [x] T-020 : package.json + tsconfig + vite.config
- [x] T-021 : BootScene + PreloadScene + HubScene squelette
- [x] T-022 : constants/colors.ts + constants/config.ts (vraies couleurs IDFM)
- [x] T-023 : npm install, tsc 0 erreur, Vite 5 fonctionnel

### EP-007 – Config Claude avancée ✅
- [x] T-040 : Hook PostToolUse Edit/Write → tsc --noEmit automatique
- [x] T-042 : Hooks actifs dans settings.local.json

### EP-008 – Recherche motricité enfant 3-4 ans
> À faire en subagent. Résultats → skill child-pedagogy + config.ts
- [ ] T-050 : Synthèse études sur motricité fine 3-4 ans et jeux vidéo
- [ ] T-051 : Gestes maîtrisés (tap, drag, pinch, double-tap) à quel âge ?
- [ ] T-052 : Adapter GAME_CONFIG selon les données
- [ ] T-053 : Progression manette/contrôles par tranche d'âge

### EP-009 – Recherche audio & TTS
> À faire en subagent. Résultats → skill audio/ + EP-006
- [ ] T-060 : Inventaire TTS 2025 (ElevenLabs, OpenAI TTS, Web Speech API)
- [ ] T-061 : TTS local vs streamé : latence, coût, intégration
- [ ] T-062 : Musique : Web Audio API vs Howler.js vs Tone.js
- [ ] T-063 : Audio sprites vs fichiers séparés
- [ ] T-064 : Voix enfant-friendly FR pour 3-4 ans
- [ ] T-065 : Créer skill audio/sound-design.md

---

## Décisions prises

| ID | Date | Décision | Raison |
|----|------|----------|--------|
| D-001 | 2026-03-07 | Stack : Phaser.js 3 + Vite + TypeScript | Navigateur, pas d'install, itération rapide |
| D-002 | 2026-03-07 | Zéro pénalité punitive | Enfant 3-4 ans : frustration = abandon |
| D-003 | 2026-03-07 | Sessions max 3-8 min | Capacité d'attention à cet âge |
| D-004 | 2026-03-08 | Direction artistique : **flat design arrondi** (Toca Boca / Tayo) | Rapide, lisible, accessible sans dessinateur |
| D-005 | 2026-03-08 | Univers : ville Villejuif + vie secrète des bus | Ancrage affectif + liberté créative |
| D-006 | 2026-03-08 | POV : immersion avec le bus (pas guide extérieur) | Max vit l'aventure avec le bus |
| D-007 | 2026-03-08 | Progression : flotte de bus + carte Villejuif | Double satisfaction visuelle |
| D-008 | 2026-03-08 | Sandbox d'abord avant de figer la mécanique | Sentir les mouvements, décider le game feel |
| D-009 | 2026-03-10 | Bus side-view = SVG template dynamique ({{COLOR}}/{{LINE}}) | 1 fichier pour 20 lignes, couleur changeble par code |
| D-010 | 2026-03-10 | Bus topdown = sprite sheet White + setTint() Phaser | 1 sprite sheet pour toutes les couleurs IDFM |
| D-011 | 2026-03-10 | Architecture V0 Option C : HTML pour quiz + Phaser pour sandbox | HTML = livrable rapide · Phaser = valeur ajoutée sandbox |
| D-012 | 2026-03-10 | MJ-01 : lignes ambiguës (380=V6, 132=2234, N15=N22) → 2 réponses acceptées | Pédagogie honnête, pas d'ambiguïté trompeuse |
| D-013 | 2026-03-10 | MJ-02 : lignes à couleur identique exclues | Question sans réponse unique = pas pédagogique |
| D-014 | 2026-03-10 | VISION.md corrigé : pixel art → flat design (D-004 fait foi) | Incohérence détectée entre les deux docs |
| D-015 | 2026-03-10 | MJ-03a : groupements visuels (2+3+3) pas alignement linéaire | Max compte mieux avec des groupes qu'en ligne |
| D-016 | 2026-03-10 | MJ-03b : calibrage haut — Max est très avancé en soustraction | Ne pas sous-estimer, monter vite en difficulté |
| D-017 | 2026-03-10 | MJ-04 : Phase 1 = mots simples (CACA, BUS, PAPA...) avant arrêts | Max sait lire ces mots, commencer par l'acquis |
| D-018 | 2026-03-10 | MJ-05 : trajets réels uniquement (185 école, V7 Valouette, M7+M6 mamie) | Ancrage affectif maximal |
| D-019 | 2026-03-10 | MJ-06 : place au sol numérotée, pas garage 3D | Plus lisible pour 3-4 ans |

---

## Leçons apprises

| ID | Date | Leçon | Contexte |
|----|------|-------|---------|
| L-001 | 2026-03-07 | Ne pas décider le scénario/style à la place du designer – présenter des options | Setup initial trop prescriptif |
| L-002 | 2026-03-07 | Skills = ouvrir des possibilités, pas fermer des choix | Skills v1 trop opinionated |
| L-003 | 2026-03-07 | CLAUDE.md = instructions opérationnelles Claude, pas de la doc projet | Confusion format initial |
| L-004 | 2026-03-08 | Le prénom de l'enfant est Max, pas Tom | Correction critique session 2 |
| L-005 | 2026-03-08 | Sandbox avant de coder le mini-jeu – le game feel se décide en jouant | EP-004 |
| L-006 | 2026-03-10 | Afficher la réponse dans la question = zéro défi pédagogique (ex: couleur visible dans le quiz couleur) | Jeux v1 game-html cassés pédagogiquement |
| L-007 | 2026-03-10 | Toujours vérifier les incohérences entre docs (VISION vs BACKLOG ici) avant chaque session | Pixel art vs flat design, même date, deux docs différents |
| L-008 | 2026-03-10 | Max est très avancé – ne pas sous-estimer. Il connaît 20 lignes par cœur, chiffres jusqu'aux milliers, lecture phonétique | Calibrage MJ-01/02/03b |
| L-009 | 2026-03-15 | Sidewalk 1–6 = 6 STYLES différents (textures distinctes), pas des orientations. Utiliser 1 seul style par zone + sidewalk2 pour varier max 2–3 points | map-mockups pipeline |
| L-010 | 2026-03-15 | Anti-répétition : >6 tiles identiques consécutifs = issue HAUTE. Briser avec sidewalk2 aux positions des props. Asphalt : mixer asphalt/asphalt2/asphalt3 | map-mockups M2 FAIL fix |
| L-011 | 2026-03-15 | bench_city = sprite 96×96 (2×2 tiles). Ancrer top-left. Tous les 4 pixels du footprint doivent être sur sidewalk, jamais sur asphalt | map-mockups M5 MOYENNE-01 |
| L-012 | 2026-03-15 | Transition obligatoire : asphalt → sidewalk → bâtiment. Jamais asphalt adjacent direct à un bâtiment | Règle fondamentale tileset |

---

## Session 12 — 2026-04-12

### Fait
- [x] MJ-14 créé : La grille des bus — Matrices de Raven, 2 modes (Formes / Bus), 3 niveaux (ligne → colonne → les deux)
- [x] MJ-15 créé : L'intrus — 5 bus, 1 ne va pas, 3 niveaux (couleur / pair-impair / famille de ligne)
- [x] MJ-16 créé : Complète la suite — 4 cases, pattern couleurs/tailles/mixte
- [x] MJ-17 créé : L'ombre du bus — silhouette noire 3 niveaux (nette / floutée / partielle)
- [x] tracker.js créé : suivi progression localStorage, maîtrise Montessori (nouveau/en-cours/maîtrisé)
- [x] suivi.html créé : dashboard parent, stats globales, sparklines, export/import JSON
- [x] tracker.js intégré dans MJ-01 à MJ-17 (tous les jeux)

### Idées capturées (pas encore planifiées)

#### EP-015 · Suivi de progression (Carnet de Max)
- Tracker les sessions : jeux joués, temps passé, scores, taux de réussite
- Stockage : fichier JSON commité dans le repo git (voir D-020)
- Interface parent `/suivi.html` : stats par jeu, forces/faiblesses, progression dans le temps
- Accessible via bouton discret dans index.html (non visible pour Max)
- Ce que Max voit : Le Garage (collection de bus débloqués selon maîtrise des jeux)

#### EP-016 · Le Garage comme hub de progression
- Garage = map centrale visible de Max (pas de score brut)
- Chaque jeu maîtrisé → bus débloqué, visible dans le Garage
- État visuel : carte grisée (pas joué) → normale (en cours) → étoile dorée (maîtrisé)
- 3 états de maîtrise (Montessori) : ○ nouveau · ◑ en cours · ● maîtrisé
- Depann2000 = dernier unlock (boss final, jeu exclusif)

#### IDÉE · Garage comme mini-jeu
- Jeu de garage interactif : réparation, nettoyage, changement de pièces, essence
- Bus arrive sale/cassé → Max le répare → bus repart en condition
- Mécanique : tap sur les zones (roue crevée, vitre cassée, jauge essence vide)
- Progression : chaque bus débloqué peut venir au garage pour entretien
- Lien avec suivi : bus qui "vieillissent" selon le temps ou les erreurs en jeu → besoin d'entretien

#### IDÉE · Refonte du menu — 2 modes possibles
- **Mode actuel** : boutons liste (aujourd'hui) → garder comme fallback / option
- **Mode Map** : décor paysage animé (rue, arrêt de bus, immeubles Villejuif)
  - Des gens qui attendent sur le trottoir → tap sur un personnage → lance le jeu associé
  - Des bus qui arrivent → trouver le bon bus sur un panneau → mini-jeu de sélection
  - Le panneau RATP devient la navigation elle-même (cohérence avec MJ-13)
  - Chaque zone de la carte = famille de jeux (dépôt, arrêt, école, garage...)
- Toggle entre les deux modes (bouton discret) ou décision unique plus tard
- Familles naturelles : Couleurs/lignes (01-02), Nombres (03-04), Trajets (05), Garage (06-08-09), Sons (10-12), Monde (11), Arrêt (13), Logique (14)

#### D-020 (décision à prendre) · Stockage progression
- Option A : `localStorage` — offline, zéro serveur, perdu si navigateur effacé, non synchronisable
- Option B : Fichier JSON dans git (`data/progress.json`) — commité manuellement, visible dans le repo, lisible
- Option C : GitHub Gist API — 1 fichier JSON par appareil, synchronisable, nécessite token
- Option D : Service backend léger (Supabase free tier) — multi-appareils, temps réel, complexité ++
- **Recommandation** : Option A (localStorage) + export manuel JSON → git pour archivage ponctuel

---

## Session 10 — 2026-03-17

### Fait
- [x] MJ-10 créé : Tableau de bord — 12 boutons sons sandbox + easter egg prout caché
- [x] MJ-11 créé : Quel pays ? — drapeaux dans bus, TTS, 4 choix texte, confettis 10/10
- [x] sounds.js : AudioContext singleton (fix son qui coupait après clics rapides)
- [x] MJ-11 drapeau : pillarbox noir (contain) pour ratio correct dans la fenêtre bus
- [x] MJ-11 TTS : bouton texte fixe "Écouter" (ne révèle plus jamais le nom du pays)
- [x] MJ-11 victoire : 5 paliers de phrases selon score, confettis uniquement au 10/10
- [x] index.html : cartes MJ-10 et MJ-11 ajoutées dans la grille

### Leçons
- `AudioContext` doit être un singleton — créer un nouveau contexte à chaque son épuise le pool navigateur (limite ~6) et coupe le son. Toujours réutiliser + `.resume()` si suspendu.
- La fenêtre destination du bus SVG (w=40 h=21 / viewBox 160×80) a un ratio ≈1.9, trop large pour les drapeaux (ratio ≈1.5). Solution : `background-size:contain` + fond noir pour pillarbox automatique.
- Ne jamais afficher la réponse dans le bouton d'aide TTS — texte fixe uniquement.

---

## Session 9 — 2026-03-16

### Fait
- [x] Renommage complet : mj-02b/03a/03b/04/05/06/07/08 → mj-03 à mj-09 + max-adventure
- [x] Menu index.html refait en 2 colonnes — Max Adventure pleine largeur, badge ★
- [x] CI deploy.yml : mj-07/ → max-adventure/
- [x] Valouettes V2/V3/V4/V5 ajoutées (data.js + ratp-colors.json + idfm.js)
- [x] idfm.js créé : 362 lignes IDFM complètes accessibles dans les jeux
- [x] MJ-03/08/09 : pool élargi aux 362 lignes IDFM
- [x] MJ-09 : mapping HSL auto → famille couleur pour les nouvelles lignes
- [x] MJ-09 : #C2A000 retiré d'orange_jaune, #704B1C (T7) ajouté à brun
- [x] docs/ratp-colors.json : 26 lignes actives (+ V2-V5), 362 en référentiel

### Leçons
- Jamais de `cp` en chaîne quand les noms de destination chevauchent les sources — toujours passer par /tmp
- idfm.js doit être régénéré depuis ratp-colors.json (node script) à chaque ajout de ligne

---

## Session 7 — 2026-03-16

### Fait
- [x] Inventaire complet des bus et jeux (fiche produit)
- [x] Créé docs/ratp-colors.json — couleurs+terminus IDFM officiels, 22 lignes
- [x] Créé .claude/skills/game-rules/bus-rules.md — skill règles bus immuables
- [x] Corrigé T7 couleur #C2A000 → #704B1C dans data.js
- [x] Corrigé 2234 terminus dans mj-05.html (Massy → Chessy)
- [x] MJ-04 : 90 phrases génériques, sans prénom, emoji=answer
- [x] MJ-06 layout mobile : slots min-height 60px, buses ne débordent plus en bas
- [x] MJ-08 layout mobile : boîtes min-height 55px, box-parked overflow:hidden

### Leçons
- ratp-colors.json doit être créé dès le début, pas référencé en commentaire avant d'exister
- Les terminus de bus doivent être vérifiés via API IDFM officielle (pas sites tiers)
- Les conventions pédagogiques (N15/N22 bleu nuit) doivent être documentées et ne pas être "corrigées" silencieusement
- Sur mobile portrait (<700px hauteur), les zones de jeu draggable doivent réserver de la hauteur pour les UI elements (header, progress, labels)

---

## Changelog sessions

### 2026-03-15 – Session 8 (apprentissage tileset LimeZu — 5 maps atomiques)
- **map-mockups.html** : Reset complet des 12 maps incohérentes. Infrastructure conservée.
- Pipeline pixel-map (simplifier → designer → reviewer) exécuté sur 5 maps :
  - M1 Route simple (7×5) → PASS 8/10 iter 1
  - M2 Parking (7×6) → FAIL iter 1 (7 tiles sidewalk identiques) → PASS 9/10 iter 2
  - M3 Bâtiment (7×7) → PASS 9/10 iter 1
  - M4 Arrêt de bus (9×5) → PASS 8/10 iter 1 (fixé : max 2 styles sidewalk par trottoir)
  - M5 Composite (9×9) → PASS 7/10 iter 1, fix MOYENNE-01 + BASSE-02 → intégré iter 2
- Leçons L-009 à L-012 documentées
- Règles tileset gravées dans drawLayeredMap() inline comments

### 2026-03-15 – Session 7 (busParade + MJ-04 phrases + map-mockups)
- **feedback.js** : `busParade()` ajouté — défilé de bus en victoire (scroll gauche→droite + klaxon)
- **MJ-01/02/02b/05/06** : `busParade()` appelé sur écran fin de partie
- **MJ-04** : Phrases mises à jour — vocabulaire varié (animaux, nature, famille) moins centré transport
- **map-mockups.html** : Outil de preview tiles Modern Exteriors 48×48 — maquettes quartiers Villejuif
- **settings.local.json** : Hook ExitPlanMode ajouté + hook Stop enrichi

### 2026-03-13 – Session 6 (corrections multi-jeux)
- **MJ-01** : Anti-doublons couleurs proches dans les 6 swatches (`selectDistinctColors`)
- **MJ-02** : Bus caisse en couleur ligne + numéro caché (`busSVGHiddenNum`) + anti-doublons
- **MJ-03b** : Emoji 🚌 → vrai SVG IDFM d'une ligne de Max (`busSVG`)
- **MJ-04** : Refonte complète — mots simples à deviner (BUS, TRAM, ROUGE...) + TTS auto + "Écouter"
- **MJ-05** : Filtré sur lignes connues de Max, 125→Porte de Gentilly (terminus corrigé), TTS après bonne réponse
- **MJ-06** : Refonte complète — bus SVG IDFM, garage colonne droite, drag & drop, porte animée
- **SandboxScene.ts** : snap à la route (tap sur l'herbe → point le plus proche), passagers sur les trottoirs
- **style.css** : overlay "🔄 Tourne ton téléphone" en orientation portrait
- **bus-svg.js** : `colorDistance()` + `selectDistinctColors()` ajoutés (utilisés par MJ-01 et MJ-02)

### 2026-03-13 – Session 5
- **Analyse architecture déploiement** : docs/ = 41 MB doublon mort, MJ-07 jamais déployé en prod
- **Refonte déploiement** :
  - `docs/` nettoyé (seuls les .md conservés, -41 MB)
  - `vite.config.ts` : base conditionnel `process.env.CI ? '/MaxPlay/mj-07/' : './'`
  - `game-html/mj-07.html` : message "localhost" → bouton "Jouer" vers `./mj-07/`
  - `HubScene.ts` : URLs `/game-html/mj-X.html` → `../mj-X.html` (prod-ready)
  - `deploy.yml` : workflow build Phaser + assemble `_site/` + deploy Pages
  - `.gitignore` : `_site/` ajouté
- **Résultat** : un seul `git push` déploie tout. MJ-07 accessible en ligne. Base solide long terme.

### 2026-03-07 – Session 1
Setup complet infrastructure. EP-001 terminé. Scaffold Phaser.js créé.

### 2026-03-08 – Session 2
- Correction nom Tom → Max dans tous les fichiers
- `docs/MAX_PROFILE.md` créé (19 lignes + couleurs IDFM)
- npm install, tsc 0 erreur, Vite 5 fonctionnel
- Hooks Claude configurés
- EP-002 décidé : flat arrondi · Villejuif + vie secrète · immersion bus · flotte + carte
- SandboxScene.ts codée (top-down prototype)

### 2026-03-10 – Session 3
- Hooks Claude activés (SessionStart confirmé)
- Revue complète architecture + pédagogie
- **Problème identifié** : jeux game-html v1 pédagogiquement cassés (réponse visible)
- **Architecture V0 décidée** : Option C (HTML quiz + Phaser sandbox)
- SVG bus side-view fourni par l'utilisateur → rangé + template dynamique créé
- `game/src/utils/bus-svg.ts` créé (createBusSvg, createBusDataUrl)
- Assets topdown triés : 27 fichiers utiles extraits de ~30 000
- `docs/ASSETS.md` créé (catalogue complet)
- 7 fiches mini-jeux V0 rédigées et validées
- Incohérence VISION.md (pixel art) vs BACKLOG (flat design) → flat design confirmé

### 2026-03-10 – Session 4 (soir)
- **BACKLOG.md mis à jour** avec les échanges utilisateur
- **Structure game-html/ nettoyée** – nouvelle architecture propre :
  ```
  game-html/
  ├── index.html          ← Hub menu (7 mini-jeux)
  ├── css/
  │   └── style.css       ← Styles partagés
  ├── js/
  │   ├── data.js         ← Lignes, mots, destinations
  │   ├── bus-svg.js      ← Générateur SVG bus
  │   ├── sounds.js       ← Web Audio API
  │   └── feedback.js     ← Feedback visuel/sonore
  ├── mj-01.html          ← Quelle couleur ?
  ├── mj-02.html          ← Quel numéro ?
  ├── mj-03a.html         ← Compte les passagers
  ├── mj-03b.html         ← La bonne place
  ├── mj-04.html          ← Lis le mot
  ├── mj-05.html          ← Quel bus ?
  └── mj-06.html          ← Au garage !
  ```
- **Ancien index.html v1** archivé dans `temp/game-html-v1-backup.html`
- **MJ-01 à MJ-06 fonctionnels** en HTML vanilla
- **MJ-07 (Phaser)** reste dans `game/` avec SandboxScene.ts
  - MJ-01 : Max connait 20 lignes par cœur (centaines incluses), TVM exclu
  - MJ-02 : Exclusion des lignes ambiguës (pas de question piège)
  - MJ-03a : Groupements visuels 2+3+3 (pas alignement linéaire)
  - MJ-03b : Calibrage difficile — Max maîtrise déjà la soustraction
  - MJ-04 : Phase 1 = mots simples (CACA, BUS, PAPA...) avant arrêts
  - MJ-05 : Trajets réels détaillés (Valouette, mamie, tata Sarah...)
  - MJ-06 : Places numérotées au sol, pas garage 3D
- Analyse assets `temp/` → 30k+ fichiers mais essentiels déjà dans `game/public/assets/`
