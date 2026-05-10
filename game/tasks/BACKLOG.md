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
| EP-021 | Renommage cohérence vocab Max (Centre bus / Garage / Village) | `[x]` |
| EP-033 | Désactivation TTS annonce titre au lancement (laggue) | `[x]` |
| EP-022 | MJ-04 → ajouter fin de partie (10 tours + endSession + playEndSound) | `[x]` |
| EP-023 | Menu hybride : Carte de Villejuif (haut) + grille classique (bas) | `[x]` |
| EP-024 | Fix Max Adventure (cassé actuellement) | `[x]` |
| EP-025 | Max Adventure responsive (portrait mobile) | `[x]` |
| EP-026 | TTS ElevenLabs pré-générés (MP3 statiques pour noms de jeux) | `[ ]` |
| EP-027 | MJ-20 · Système de niveaux par langue (cartes intermédiaires, progression mot par mot) | `[x]` |
| EP-028 | MJ-18 · Tubes de couleurs : contrôle nb de tubes vides + palette élargie | `[x]` |
| EP-029 | MJ-19 · Trouve le bus : 2-3× plus de bus (pool avec doublons) | `[x]` |
| EP-030 | MJ-17 · Le garage : 10 icônes en 2 lignes droites | `[x]` |
| EP-031 | MJ-15 · L'intrus : niveau D roues colorées + intrus couleur+numéro wrong | `[x]` |
| EP-032 | MJ-09 · Trie les bus : déplacer 2 bus simultanément (multi-touch 2 doigts) | `[x]` |
| EP-TILES | Pipeline tile-tools LimeZu (cartographie + recettes + mockups-routes + tile-picker + tile-pmo) | `[~]` |
| EP-MJPOSE | MJ · Pose-tes-tiles (kids éditeur de map simplifié) | `[x]` |

---

## Architecture V0 – Option C (validée 2026-03-10)

```
MaxPlay V0
├── game/web/index.html     ← Menu 2 colonnes (14 mini-jeux + Max Adventure)
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

### EP-021 – Renommage cohérence vocab Max ✅
> Vocabulaire Max validé 2026-04-26 : Centre bus = dodo des bus · Garage = réparation · Village des bus = terminus
- [x] T-210 : MJ-08 "Au garage !" → "Au centre bus" (titre, header, commentaires)
- [x] T-211 : MJ-17 "Village des bus" → "Le garage" (titre, header, commentaires)
- [x] T-212 : tracker.js GAME_META à jour
- [x] T-213 : "Village des bus" libéré pour future idée terminus

### EP-033 – TTS annonce titre désactivé ✅
> Au lancement de chaque MJ, `tracker.startSession()` lançait `_announceTitle()` (TTS du nom du jeu). Cause des lags au démarrage. Désactivé 2026-05-03 — l'utilisateur n'en a pas besoin, les jeux gardent leurs TTS pédagogiques en cours de partie.
- [x] T-330 : Commenter l'appel `_announceTitle(id)` dans `tracker.startSession()`

### EP-022 – MJ-04 fin de partie
> Aujourd'hui MJ-04 boucle infinie sans `endSession`. Doit terminer normalement.
- [ ] T-220 : Ajouter compteur 10 tours dans mj-04.html
- [ ] T-221 : Écran fin de partie + appel `Tracker.endSession(score, max)`
- [ ] T-222 : Appel `playEndSound(score, max)`

### EP-023 – Menu hybride Carte de Villejuif ✅
> Page d'accueil = map Villejuif (haut) + grille classique (bas). Implémenté dans `game/web/index.html` avec `.map-hotspot`, tooltips et liens vers chaque MJ.
- [x] T-230 : Valider emplacements V1 avec utilisateur
- [x] T-231 : Layout map (dimensions, échelle, choix illustration vs tileset LimeZu)
- [x] T-232 : Coordonnées x,y des emojis hotspots
- [x] T-233 : Intégration index.html (map en haut, grille en bas, pas de toggle)
- [x] T-234 : Test motricité (hotspots min 60×60 px)

### EP-024 – Fix Max Adventure (RÉSOLU)
> Root cause : `vite.config.ts` `base: '/MaxPlay/mj-07/'` mais CI déploie sous `/max-adventure/`. Mismatch → 404 JS Phaser → écran noir prod.
- [x] T-240 : Reproduit via Playwright sur prod (écran noir, 404 phaser-*.js et index-*.js)
- [x] T-241 : Diagnostic — `base` Vite pas mis à jour quand le dossier de déploiement a été renommé en session 9
- [x] T-242 : Fix `base: '/MaxPlay/max-adventure/'` + commit + push CI (commit 98923b60)
- [x] T-243 : Re-test prod : OK, jeu se charge

### EP-026 – TTS ElevenLabs (MP3 statiques) — JEU + NARRATION
> Aujourd'hui annonce nom de jeu via `speechSynthesis` natif (voix robotique). Décidé 2026-04-26 : pré-générer les MP3 via MCP ElevenLabs (option B) — zéro clé exposée, zéro coût récurrent.
> **Voix : générées ou clonées (PAS les voix par défaut)**. Cible : voix enfant-friendly avec nuances émotionnelles fortes (joie, suspense, douceur, surprise…).
> Champ d'application : **JEU** (annonces, retours, victoires) **ET NARRATION** (lecture des histoires Wex/Christ avec dialogues incarnés).
> Reportée : ne pas faire maintenant, on garde speechSynthesis comme fallback.

**Infra TTS**
- [ ] T-260 : Setup MCP ElevenLabs dans `~/.claude/settings.json` (clé API utilisateur)
- [ ] T-261 : Sélection / clonage de voix (3-5 voix : narrateur doux, voix enfant joyeuse, voix grave/calme, voix vive/excitée…)
- [ ] T-262 : Script de génération bouclant sur `GAME_META` → `game/web/sounds/titles/mj-XX.mp3`
- [ ] T-263 : Modifier `tracker.js._announceTitle` : si MP3 existe → `new Audio()`, sinon fallback `speechSynthesis`
- [ ] T-264 : Régénération à la demande quand un jeu est renommé
- [ ] T-265 : Pipeline narration : 1 histoire → découpe par voix → MP3 par segment → lecteur audio web

**Agent éditorial voix (nouveau)**
- [ ] T-266 : Spec d'un nouvel agent `voice-director` : prend un texte brut (annonce de jeu, dialogue d'histoire) et l'enrichit en SSML/markup ElevenLabs (émotions, pauses, emphases, prononciation, voix par personnage)
- [ ] T-267 : Définir le vocabulaire d'émotions : joyeux, doux, suspense, mystérieux, déçu, fier, complice…
- [ ] T-268 : Mapper personnages (casting Christ : Wex, Melki, Mimi, Polo…) → voix ElevenLabs
- [ ] T-269 : Tester sur un texte court de chaque type (annonce jeu courte, victoire, dialogue narration)

### EP-025 – Max Adventure responsive (portrait mobile)
> Constat user 2026-04-26 : sur Xiaomi 15 Ultra en portrait avec barre navigateur, paysage = trop peu de place. Veut rester en portrait.
- [x] T-250 : `game/index.html` — `#game-container` 1024x768 fixe → 100vw/100vh (commit c9b2de3f)
- [x] T-251 : `PreloadScene` — UI centrée via `this.scale.width/height` au lieu des constantes fixes
- [x] T-252 : `SandboxScene.setupCamera` — zoom = max(W/WORLD_W, H/WORLD_H, 0.45) → garantit que le monde remplit le viewport quel que soit l'orientation (commit ab5bbee3)
- [x] T-253 : Listener `scale.on('resize')` pour recalculer le zoom en cas de rotation
- [x] T-254 : Test Playwright mobile portrait 430x932 → canvas plein viewport, pas de bande vide

### EP-010 – Assets & outils graphiques ✅
- [x] T-070 : SVG bus side-view (droite + gauche) avec template {{COLOR}}/{{LINE}}
- [x] T-071 : Utilitaire bus-svg.ts (createBusSvg, createBusDataUrl, preloadAllBusTextures)
- [x] T-072 : Sprite sheets topdown sélectionnés (bus 5 couleurs, police, ambulance, taxi, 3 sedans)
- [x] T-073 : Sprites personnages (archer, king, knight, musketeer, pirate, wizard – walk + idle)
- [x] T-074 : docs/ASSETS.md créé (catalogue complet + lacunes identifiées)

### EP-004 – Architecture V0
- [x] T-031 : Sandbox codée – SandboxScene.ts (prototype top-down)
- [x] T-080 : Supprimer `game/web/index.html` v1 (version pédagogiquement cassée) → backup dans `temp/`
- [x] T-081 : Créer nouvelle structure `game/web/` avec composants partagés (SVG bus, feedback, score)
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
- [x] T-134 : Variantes 2 étapes (descendre puis monter) — type `combo` ajouté au niveau 3 dans mj-05

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
| D-021 | 2026-04-26 | Vocab Max : Centre bus = dodo · Garage = réparation · Village des bus = terminus (réservé) | Cohérence avec le vocabulaire que Max utilise |
| D-022 | 2026-04-26 | Menu hybride : carte Villejuif (haut) + grille classique (bas), pas de toggle | Découverte map sans casser le fallback rapide |
| D-023 | 2026-04-26 | Backup progression : reste localStorage seul. Pas d'API/n8n maintenant | Site = HTML simple, pas de complexité prématurée |

---

## Leçons apprises

| ID | Date | Leçon | Contexte |
|----|------|-------|---------|
| L-001 | 2026-03-07 | Ne pas décider le scénario/style à la place du designer – présenter des options | Setup initial trop prescriptif |
| L-002 | 2026-03-07 | Skills = ouvrir des possibilités, pas fermer des choix | Skills v1 trop opinionated |
| L-003 | 2026-03-07 | CLAUDE.md = instructions opérationnelles Claude, pas de la doc projet | Confusion format initial |
| L-004 | 2026-03-08 | Le prénom de l'enfant est Max, pas Tom | Correction critique session 2 |
| L-005 | 2026-03-08 | Sandbox avant de coder le mini-jeu – le game feel se décide en jouant | EP-004 |
| L-006 | 2026-03-10 | Afficher la réponse dans la question = zéro défi pédagogique (ex: couleur visible dans le quiz couleur) | Jeux v1 game/web cassés pédagogiquement |
| L-007 | 2026-03-10 | Toujours vérifier les incohérences entre docs (VISION vs BACKLOG ici) avant chaque session | Pixel art vs flat design, même date, deux docs différents |
| L-008 | 2026-03-10 | Max est très avancé – ne pas sous-estimer. Il connaît 20 lignes par cœur, chiffres jusqu'aux milliers, lecture phonétique | Calibrage MJ-01/02/03b |
| L-009 | 2026-03-15 | Sidewalk 1–6 = 6 STYLES différents (textures distinctes), pas des orientations. Utiliser 1 seul style par zone + sidewalk2 pour varier max 2–3 points | map-mockups pipeline |
| L-010 | 2026-03-15 | Anti-répétition : >6 tiles identiques consécutifs = issue HAUTE. Briser avec sidewalk2 aux positions des props. Asphalt : mixer asphalt/asphalt2/asphalt3 | map-mockups M2 FAIL fix |
| L-011 | 2026-03-15 | bench_city = sprite 96×96 (2×2 tiles). Ancrer top-left. Tous les 4 pixels du footprint doivent être sur sidewalk, jamais sur asphalt | map-mockups M5 MOYENNE-01 |
| L-012 | 2026-03-15 | Transition obligatoire : asphalt → sidewalk → bâtiment. Jamais asphalt adjacent direct à un bâtiment | Règle fondamentale tileset |
| L-013 | 2026-05-10 | **Marquage centre route** : `Asphalt_1_Variation_2` (H propre) / `_8` (V propre). JAMAIS `_14` / `_15` (sales). Mnémonique : "2 propre H, 8 propre V, 14 sale H, 15 sale V" | 4 sessions d'erreur, 30+ leçons dans LESSONS.md du skill |
| L-014 | 2026-05-10 | **Béton uniforme / nature variée** : trottoir et asphalte = tile UNIQUE par défaut, anti-mono max 10%. Herbe/terre = variations OK | Refonte propre 7 recettes 2026-05-10 |
| L-015 | 2026-05-10 | **Workflow Propose → Édite → Apprend** : agent propose une recette dans `mockups-routes.html` → user clique 🎨 Éditer → tile-picker pré-rempli via `?recipe=X.py` → user exporte → agent intègre + invoque `tile-pmo` pour graver les leçons | Pipeline collaboratif tile-tools |
| L-016 | 2026-05-10 | **Anti-pattern méta** : si user dit 2× "c'est sale" et que je crois avoir corrigé sans changement visible → STOP, zoomer la tile x5, comparer planche-contact entière, identifier différence pixel-perfect AVANT de patcher | Erreur de 4 sessions sur `_14` |
| L-017 | 2026-05-10 | **Multi-tiles à vraies dimensions** : un sprite 4×2 doit s'afficher rectangle 4×2 dans tile-picker, pas carré 1×1 déformé. CSS inline `width: calc(w * --cell-size); height: calc(h * --cell-size)` | Bug visuel tile-picker corrigé |
| L-018 | 2026-05-10 | **Tile `Asphalt_1_Variation_13` = croix `+` pour intersection centrale** d'un carrefour 4 voies. Sans elle, le pivot est juste de l'asphalte plain sans signal visuel d'intersection | Cartographie révélée |
| L-019 | 2026-05-11 | **Composant partagé `js/back-button.js`** (80×80 + mini-bus SVG + auto-replace 3 patterns) > 19 boutons inline duplicate. Injecté dans 18 MJ. CSS `.back` fallback upgraded 48→80. | Session refactor 5 dim (`PIPELINE-MEMORY-MJ.md` § 3 F-006) |
| L-020 | 2026-05-11 | **Composant partagé `js/intro-splash.js`** avec convention déclarative `data-mp-intro-emoji/title/hint` sur `<body>`. Auto-init au DOMContentLoaded, skippable au tap, pas de TTS (EP-033 respecté) | Session refactor 5 dim (`PIPELINE-MEMORY-MJ.md` § 3 F-007) |
| L-021 | 2026-05-11 | **`.scorebar` neutralisée par défaut** dans CSS partagé (DOM reste pour compat code, affichage masqué). Ajout `.progressbar` alternative non-numérique. Règle "pas de score < 6 ans" enfin appliquée sur 7 MJ | Session refactor 5 dim (`PIPELINE-MEMORY-MJ.md` § 3 F-005) |
| L-022 | 2026-05-11 | **`mj-pose-tiles` consomme `Asphalt_1_Variation_14` et `_15` SALE** (lignes 123-124) — viole L-013. Dépendance tile à fixer + tracer dans coordination tile↔MJ (cas OBS-3 narration-pmo) | Audit MJ 2026-05-11, à corriger prochain tour |

---

## Session 14 — 2026-05-11 (équipe pôle JEU complète + refactor MJ 5 dim)

### Fait (Phase 1)
- ✅ Création 3 agents : `game-conseiller` (Opus transverse) · `game-mj-pmo` (Haiku sous-spé) · `game-mj-reviewer` (Haiku validateur)
- ✅ `game/web/PIPELINE-MEMORY-MJ.md` créé (méta-process MJ, 3 niveaux mémoire)
- ✅ `game/memory/VISION-LONG-TERME.md` créé (Phase 2 WexWorld + pont narration↔jeu + hypothèses)
- ✅ Skill global `pmo-design` renommé depuis `multi-agent-pmo` + nouveau skill `pmo-challenge` (~/.claude/skills/)
- ✅ Challenge réciproque narration-pmo : 5/5 retenus, patchs appliqués (OBS-1 à OBS-5)

### Fait (refactor MJ 5 dimensions)
- ✅ Audit 19 MJ via pmo-challenge (skill Explore)
- ✅ Composant `js/back-button.js` (80×80, mini-bus SVG, auto-replace 3 patterns)
- ✅ Composant `js/intro-splash.js` (auto-init via data-mp-intro-*)
- ✅ CSS partagé : `.scorebar` neutralisée, `.back` 48→80, ajout `.progressbar`
- ✅ 18 MJ : injection back-button.js (mj-pose-tiles patché à part)
- ✅ 7 MJ : score badges inline masqués
- ✅ 7 MJ : intro splash + data-mp-intro-* (mj-04/05/12/13a/b/c/17)
- ✅ mj-pose-tiles : audio + confettis + son victoire dans `celebrer()`

### Leçons (voir L-019 à L-022 ci-dessus)

### Out of scope (à acter prochain tour)
- 🟠 mj-04 boucle infinie EP-022 — non fixé (gros chantier logique)
- 🟠 mj-pose-tiles utilise `_14`/`_15` SALE — dépendance tile à fixer + tracer
- 🟠 mj-12 scope (lecteur audio vs quiz) — décision auteur à prendre

## Session 13 — 2026-05-08 → 2026-05-10 (pipeline tile-tools + EP-TILES)

### Fait
- [x] Skill `~/.claude/skills/maxplay-tiles/` créé avec SKILL.md (566 lignes) + LESSONS.md (30+ entrées datées)
- [x] Agent `.claude/agents/tile-pmo.md` créé (Haiku, capture systématique des leçons tile)
- [x] Dossier `game/web/tools/` créé : hub `index.html` + déplacement tile-library-v3 + tile-picker
- [x] **tile-picker.html** : bibliothèque 81 tiles + matrice 10×10 drag&drop + 5 catégories (Rue/Parc/Jardin/Building/Forêt) + sélecteur d'échelle (Mini/Petit/Normal/Grand) + multi-tiles à vraies dimensions + import via `?recipe=X.py` + auto-copy clipboard sur Export
- [x] **mockups-routes.html** : 6 patterns à échelle uniforme (route V/H, virage gauche, carrefour, rond-point, quartier) + bouton 🎨 Éditer → ouvre tile-picker pré-rempli
- [x] **mj-pose-tiles.html** : mini-jeu enfant "petit ouvrier" 🦺🚧 — 8×8 tactile, 5 catégories simplifiées, bouton "Lisser" auto-bords, localStorage
- [x] 13 recettes Python validées : routes V/H, 4 virages, carrefour 4 voies, rond-point, quartier, parking, voie bus, 2 passages piétons
- [x] Cartographie corrigée : `Asphalt_1_Variation_2/8` = propres, `_14/_15` = sales, `_13` = croix carrefour, `_3/_5/_7/_1` = coins INT, `_11-_14` = coins EXT, `_9` = trottoir plain
- [x] Script `scripts/export_recipes_to_js.py` : génère `recipes_data.js` pour tile-picker

### Leçons (voir L-013 à L-018)
- Marquage propre = `_2` (H) / `_8` (V), pas `_14`/`_15` (sale)
- Béton uniforme / nature variée (anti-mono ≤10% pour le béton)
- Workflow Propose → Édite → Apprend
- Anti-pattern méta : 2× "sale" sans amélioration visible = STOP, zoomer, comparer
- Tile-pmo à invoquer après correction user / découverte / fin session

### EP-TILES — Pipeline tile-tools LimeZu *(en cours)*

**Statut** : 13 recettes propres, 6 patterns affichés dans mockups-routes, tile-picker fonctionnel avec import. Workflow Propose→Édite→Apprend opérationnel.

**Reste à faire** :
- [ ] Intégrer le quartier propre 16×12 comme nouvelle scène Phaser (remplace la "grosse croix" actuelle de max-adventure)
- [ ] Étendre le quartier vers 24×18 (vrai carrefour 4 branches au centre) puis 32×24
- [ ] Ajouter passages piétons sur les routes principales du quartier
- [ ] Tester d'autres tiles "+ alternatives" pour intersections (cherche tile 4-voies plain ou ronds-points compacts)

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
  - `game/web/mj-07.html` : message "localhost" → bouton "Jouer" vers `./mj-07/`
  - `HubScene.ts` : URLs `/game/web/mj-X.html` → `../mj-X.html` (prod-ready)
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
- **Problème identifié** : jeux game/web v1 pédagogiquement cassés (réponse visible)
- **Architecture V0 décidée** : Option C (HTML quiz + Phaser sandbox)
- SVG bus side-view fourni par l'utilisateur → rangé + template dynamique créé
- `game/src/utils/bus-svg.ts` créé (createBusSvg, createBusDataUrl)
- Assets topdown triés : 27 fichiers utiles extraits de ~30 000
- `docs/ASSETS.md` créé (catalogue complet)
- 7 fiches mini-jeux V0 rédigées et validées
- Incohérence VISION.md (pixel art) vs BACKLOG (flat design) → flat design confirmé

### 2026-03-10 – Session 4 (soir)
- **BACKLOG.md mis à jour** avec les échanges utilisateur
- **Structure game/web/ nettoyée** – nouvelle architecture propre :
  ```
  game/web/
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
- **Ancien index.html v1** archivé dans `temp/game/web-v1-backup.html`
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
