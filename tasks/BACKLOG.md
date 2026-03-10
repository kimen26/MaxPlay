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
| EP-004 | Architecture V0 (HTML quiz + Phaser sandbox) | `[~]` |
| EP-MJ01 | MJ-01 · Quelle couleur ? | `[ ]` |
| EP-MJ02 | MJ-02 · Quel numéro ? | `[ ]` |
| EP-MJ03A | MJ-03a · Compte les passagers | `[ ]` |
| EP-MJ03B | MJ-03b · La bonne place (soustraction) | `[ ]` |
| EP-MJ04 | MJ-04 · Lis le mot | `[ ]` |
| EP-MJ05 | MJ-05 · Quel bus pour aller où ? | `[ ]` |
| EP-MJ06 | MJ-06 · Au garage le soir ! | `[ ]` |
| EP-MJ07 | MJ-07 · La journée de Max (sandbox Phaser) | `[ ]` |
| EP-005 | Système de progression (flotte + carte) | `[ ]` |
| EP-006 | Audio (sons + musique + TTS) | `[ ]` |
| EP-008 | Recherche motricité enfant 3-4 ans | `[ ]` |
| EP-009 | Recherche audio : TTS, voix, streaming | `[ ]` |

---

## Architecture V0 – Option C (validée 2026-03-10)

```
MaxPlay V0
├── game-html/index.html     ← Quiz games MJ-01 à MJ-06 (HTML/CSS/JS)
│   ├── MJ-01 · Quelle couleur ?
│   ├── MJ-02 · Quel numéro ?
│   ├── MJ-03a · Compte les passagers
│   ├── MJ-03b · La bonne place
│   ├── MJ-04 · Lis le mot
│   ├── MJ-05 · Quel bus pour aller où ?
│   └── MJ-06 · Au garage le soir !
└── game/                    ← Sandbox Phaser.js (MJ-07)
    └── MJ-07 · La journée de Max
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
- [~] T-153 : Logique réponse + feedback carte animée → sans carte pour l'instant

### EP-MJ06 – MJ-06 · Au garage le soir !
- [ ] T-161 : Rendu garage (cases numérotées au sol)
- [ ] T-162 : Drag & drop bus → case (cibles min 80px)
- [ ] T-163 : Progression 3→6→8 bus
- [ ] T-164 : Feedback son + animation porte

### EP-MJ07 – MJ-07 · La journée de Max (Phaser)
- [ ] T-171 : Carte Villejuif top-down (tiles basiques pour commencer)
- [ ] T-172 : Personnage Max avec mouvement tap-to-move
- [ ] T-173 : Bus topdown avec sprite sheets + setTint couleurs IDFM
- [ ] T-174 : Système de missions (arrêt → identifier bus → monter → arriver)
- [ ] T-175 : Progression jour 1/2/3
- [ ] T-176 : Sourcer sprites piétons top-down (itch.io)

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

---

## Changelog sessions

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
