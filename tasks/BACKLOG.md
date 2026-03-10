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
| EP-004 | Premier mini-jeu jouable | `[~]` |
| EP-005 | Système de progression | `[ ]` |
| EP-006 | Audio (sons + musique + TTS) | `[ ]` |
| EP-008 | Recherche motricité enfant 3-4 ans + contrôles | `[ ]` |
| EP-009 | Recherche audio : TTS, voix, streaming, MIDI | `[ ]` |

---

## Tâches actives

### EP-001 – Infrastructure (terminé)
- [x] T-001 : Créer CLAUDE.md format opérationnel
- [x] T-002 : Créer skills organisés en sous-dossiers
- [x] T-003 : Créer docs/VISION.md + REFERENCES.md
- [x] T-004 : Créer tasks/BACKLOG.md
- [x] T-005 : Créer memory/MEMORY.md
- [x] T-006 : Initialiser scaffold Phaser.js (scenes Boot/Preload/Hub)

### EP-002 – Direction artistique ✅
- [x] T-010 : Direction artistique → Flat design arrondi (Toca Boca / Tayo style)
- [x] T-011 : Univers → Ville réaliste Villejuif + vie secrète des bus · POV immersion avec le bus
- [x] T-012 : Progression → Collection de bus + carte Villejuif qui se dévoile
- [ ] T-013 : Créer palette de couleurs UI définitive (compléter UI_COLORS)
- [ ] T-014 : Prototype bus dessiné (Inkscape, flat arrondi, couleur 162)

### EP-003 – Scaffold Phaser.js ✅
- [x] T-020 : package.json + tsconfig + vite.config
- [x] T-021 : BootScene + PreloadScene + HubScene squelette
- [x] T-022 : constants/colors.ts + constants/config.ts (vraies couleurs IDFM)
- [x] T-023 : npm install + vérifier que ça tourne (tsc 0 erreur, Vite 5 ok)
- [ ] T-024 : Composant Feedback réutilisable (success/try-again/ambient)
- [ ] T-025 : Composant Bus de base (flat arrondi + numéro ligne + setTint)

### EP-007 – Config Claude avancée ✅
- [x] T-040 : Hook PostToolUse Edit/Write → tsc --noEmit automatique
- [x] T-042 : Hooks actifs dans settings.local.json

### EP-008 – Recherche motricité enfant 3-4 ans
> À faire en subagent quand contexte dispo. Résultats → skill child-pedagogy + config.ts
- [ ] T-050 : Synthèse études/thèses sur motricité fine 3-4 ans et jeux vidéo
- [ ] T-051 : Quels gestes sont maîtrisés (tap, drag, pinch, double-tap) à quel âge ?
- [ ] T-052 : Adapter GAME_CONFIG (MIN_TAP_SIZE, DRAG_THRESHOLD) selon les données
- [ ] T-053 : Documenter la progression manette/contrôles recommandée par tranche d'âge

### EP-009 – Recherche audio & TTS
> À faire en subagent quand contexte dispo. Résultats → nouveau skill audio/ + EP-006
- [ ] T-060 : Inventaire TTS 2025 (Qwen3-TTS, ElevenLabs, OpenAI TTS, Web Speech API)
- [ ] T-061 : TTS local vs streamé : latence, coût, intégration Phaser.js
- [ ] T-062 : Musique : Web Audio API vs Howler.js vs Tone.js vs MIDI
- [ ] T-063 : Audio sprites vs fichiers séparés : quand utiliser quoi ?
- [ ] T-064 : Voix enfant-friendly : paramètres pitch, débit, langue FR pour 3-4 ans
- [ ] T-065 : Créer skill `.claude/skills/audio/sound-design.md`

### EP-004 – Premier mini-jeu
- [x] T-030 : Sandbox d'abord pour sentir le game feel avant de choisir la mécanique
- [x] T-031 : Sandbox codée – SandboxScene.ts (top-down, bus 162, Max tap-to-move, boarding)
- [ ] T-031b : Ajouter support gamepad FC30 dans SandboxScene (D-pad déplacement, A = interagir)
- [ ] T-032 : Décider la mécanique après sandbox (quizz / point&click / RPG / action)
- [ ] T-033 : Coder le mini-jeu v1
- [ ] T-034 : Tester avec Max

---

## Décisions prises

| ID | Date | Décision | Raison |
|----|------|----------|--------|
| D-001 | 2026-03-07 | Stack : Phaser.js 3 + Vite + TypeScript | Navigateur, pas d'install, itération rapide |
| D-002 | 2026-03-07 | Zéro pénalité punitive | Enfant 3-4 ans : frustration = abandon |
| D-003 | 2026-03-07 | Sessions max 3-8 min | Capacité d'attention à cet âge |
| D-004 | 2026-03-08 | Direction artistique : flat design arrondi | Rapide, lisible, Tayo/Toca Boca feel |
| D-005 | 2026-03-08 | Univers : ville Villejuif + vie secrète des bus | Ancrage affectif + liberté créative |
| D-006 | 2026-03-08 | POV : immersion avec le bus (pas guide extérieur) | Max vit l'aventure avec le bus |
| D-007 | 2026-03-08 | Progression : flotte de bus + carte Villejuif | Double satisfaction visuelle |
| D-008 | 2026-03-08 | Sandbox d'abord avant de figer la mécanique du mini-jeu | Sentir les mouvements, décider le game feel |

---

## Leçons apprises

| ID | Date | Leçon | Contexte |
|----|------|-------|---------|
| L-001 | 2026-03-07 | Ne pas décider le scénario/style à la place du designer – présenter des options | Setup initial trop prescriptif |
| L-002 | 2026-03-07 | Skills = ouvrir des possibilités, pas fermer des choix | Skills v1 trop opinionated |
| L-003 | 2026-03-07 | CLAUDE.md = instructions opérationnelles Claude, pas de la doc projet | Confusion format initial |
| L-004 | 2026-03-08 | Le prénom de l'enfant est Max, pas Tom | Correction critique session 2 |
| L-005 | 2026-03-08 | Sandbox avant de coder le mini-jeu – le game feel se décide en jouant, pas en théorie | EP-004 |

---

## Changelog sessions

### 2026-03-07 – Session 1
Setup complet de l'infrastructure. EP-001 terminé.
EP-002 ouvert, en attente de discussion avec l'utilisateur.
Scaffold Phaser.js créé mais non installé.

### 2026-03-08 – Session 2
- Correction nom Tom → Max dans tous les fichiers
- Création `docs/MAX_PROFILE.md` (19 lignes de bus + couleurs IDFM, profil complet)
- Mise à jour `game/src/constants/colors.ts` avec vraies couleurs Villejuif
- npm install, tsc 0 erreur, Vite 5 fonctionnel
- Hooks Claude configurés (tsc auto après Edit/Write)
- EP-002 décidé : flat arrondi · ville Villejuif + vie secrète · immersion bus · flotte + carte
- Sandbox comme première étape EP-004 (game feel avant mécanique)
