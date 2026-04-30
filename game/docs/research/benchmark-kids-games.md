# Benchmark — Jeux & apps éducatives pour enfants 3-5 ans

> Inspiration croisée pour MaxPlay. Qu'est-ce qui marche vraiment chez les pros du kids gaming, et qu'est-ce qu'on peut appliquer à Max (3.5-4 ans, passionné bus).
> Références liées : [`../audit/jeux-2026-04.md`](../audit/jeux-2026-04.md) · [`../audit/roadmap-technique.md`](../audit/roadmap-technique.md) · [`../MAX_PROFILE.md`](../MAX_PROFILE.md)

## 1. Apps de référence étudiées

| App | Éditeur | Cible | Modèle | Force principale |
|---|---|---|---|---|
| **Toca Boca** (Life, Kitchen, Hair Salon…) | Toca Boca (Spin Master) | 3-8 | freemium / pack | Open-ended, zéro règle, pure exploration |
| **Sago Mini** (World, School, Forest…) | Sago Mini (Spin Master) | 2-5 | abonnement | Premier tap = toujours récompensé |
| **Khan Academy Kids** | Khan Academy | 2-7 | gratuit | Curriculum structuré + mascotte persistante |
| **Endless Alphabet / Numbers / Reader** | Originator Kids | 3-6 | pack payant | Animation lettres rigolote, TTS impec |
| **Lingokids** | Monkimun | 2-8 | abonnement | Gamification douce, suivi parental |
| **Pok Pok** | Pok Pok (Snowman) | 2-5 | abonnement | Design minimaliste, montessori-inspired |
| **Tayo Bus Game** (apps officielles) | Iconix | 3-6 | pub/premium | Univers familier bus, mécaniques simples |
| **Busy Shapes** | Edoki | 2-5 | one-shot | Progression physique + gravité |
| **Thinkrolls** | Avokiddo | 3-8 | one-shot | Puzzle physique avec vrai challenge |
| **PBS Kids Games** | PBS | 2-8 | gratuit | Personnages connus + mini-jeux courts |

## 2. Mécaniques qui marchent (et pourquoi)

### 2.1 Open-ended / Bac à sable (Toca, Sago)
**Principe** : pas d'objectif, pas de score. L'enfant manipule.  
**Pourquoi ça marche** : 3-4 ans n'a pas encore besoin d'accomplir — il explore.  
**Applicable MaxPlay** : **MJ-17 "Village des bus"** en mode bac à sable (plus de score, plus de rounds — juste des bus qui arrivent, Max les soigne). Ajouter **SandboxScene** étendue dans le Phaser build.  
🔗 Voir [roadmap-technique.md §court terme](../audit/roadmap-technique.md).

### 2.2 "Premier tap récompensé" (Sago Mini)
**Principe** : tout geste déclenche une micro-animation plaisante, même hors objectif.  
**Applicable MaxPlay** : dans chaque MJ, tap sur un bus non-cible = petit bruit/sursaut amusant (pas un "BZZZ" punitif). **Déjà partiellement fait** (shake + son doux), à généraliser.

### 2.3 Mascotte persistante (Khan Kids, Lingokids)
**Principe** : un personnage guide l'enfant, réapparaît entre les jeux, valide les succès.  
**Applicable MaxPlay** : lier au **pôle Narration** — Wex (#7, héros) pourrait apparaître dans le menu et entre les MJ. Voir [`docs/narration/personnages/INDEX.md`](../narration/personnages/INDEX.md).

### 2.4 Lettres qui parlent (Endless Alphabet)
**Principe** : chaque lettre d'un mot prononce son son quand on la touche, puis s'assemble en animation.  
**Applicable MaxPlay** : MJ-04 (mot à deviner) pourrait gagner ce traitement — chaque lettre tapée dit son son, puis le mot se prononce en entier.

### 2.5 Physique simple mais juste (Busy Shapes, Thinkrolls)
**Principe** : balles qui roulent, objets qui tombent, pente qui fait bouger.  
**Applicable MaxPlay** : petit potentiel — "le bus roule vers l'arrêt" avec physique légère dans une scène "laisse le bus descendre la pente" → jauge d'arrivée.

### 2.6 Univers familier (Tayo, Pat'Patrouille)
**Principe** : utiliser des personnages/véhicules que l'enfant connaît et aime.  
**Applicable MaxPlay** : **on EST déjà cette catégorie** (bus Villejuif, couleurs IDFM exactes). Force MaxPlay. À approfondir : apparition de **Pikachu** (déjà fait dans MJ-13), Tayo possible (droits d'image à checker), Stitch, Totoro.

### 2.7 Boucle courte & répétable (PBS, Sago)
**Principe** : un round = 30-90s. Victoire rapide. Rejouable immédiatement.  
**Applicable MaxPlay** : déjà bien tenu sur MJ-01→13. À surveiller sur MJ-14/15/16 qui peuvent traîner.

## 3. Styles visuels qui séduisent

| Style | Exemple | Caractéristiques | Fit MaxPlay ? |
|---|---|---|---|
| **Flat illustré friendly** | Sago Mini, Pok Pok | formes simples, couleurs pastel, contours doux | ✅ on y est |
| **Cartoon TV-like** | Tayo, Cocomelon | 3D simili, expressions exagérées | ➖ trop coûteux |
| **Papier/construction paper** | Toca Life, PBS Peg+Cat | textures découpées, stop-motion | 🟢 piste possible |
| **Pixel art** | Thinkrolls | rétro charmant | ➖ pas la cible |
| **Minimalisme Montessori** | Pok Pok, Busy Shapes | gros aplats, zéro superflu | ✅ bien pour Max |

**MaxPlay actuel** : mélange flat illustré (bus SVG, drapeaux) + panneaux RATP authentiques. Cohérent, à garder. Éviter les tentations photo-réalistes ou 3D.

## 4. UX / Accessibilité — règles d'or enfant 3-5 ans

Synthèse de plusieurs sources (Sesame Workshop research, ESA kids UX guidelines, observation Toca/Sago) :

1. **Tap targets ≥ 76-80px** (doigt 3-4 ans imprécis, tablet) → ✅ MaxPlay
2. **Pas de lecture obligatoire** : toute instruction doit avoir un équivalent audio/pictogramme → ⚠ certains MJ ont du texte seul
3. **Feedback < 200ms** → ✅ MaxPlay
4. **Pas d'écran de "Game Over"** → ✅ MaxPlay (règle formalisée)
5. **Pas de timer stressant** → ✅ MaxPlay
6. **Bouton Home toujours accessible** → ✅ (mais 3 variantes, voir factorisation)
7. **Sons volontaires, jamais stridents** → ✅ MaxPlay (klaxon, ding, Pikachu)
8. **Pas d'achat intégré visible, pas de pub** → ✅ MaxPlay (pas de monétisation)
9. **Gate parental pour options sensibles** → ❌ non implémenté (pas critique, jeu offert à un seul enfant)
10. **Mode offline** → ❌ actuellement online only (opportunité PWA, voir roadmap)

## 5. Modes & formats de jeu détectés

| Format | Description | Exemples marché | Présent MaxPlay ? |
|---|---|---|---|
| **Quiz multi-choix** | 3-4 options → 1 bonne | Endless, Khan | ✅ MJ-01 à 05, 11 |
| **Drag & drop tri** | objet → catégorie | Sago Sort, Khan | ✅ MJ-06, 08, 09, 17 |
| **Memory / paires** | retrouver les doublons | Khan, Pok Pok | ❌ absent (idée future) |
| **Point & click scène** | tap sur l'objet recherché | I Spy, Sago | 🔶 partiel (dev-dinos) |
| **Puzzle de reconstruction** | assembler pièces | Sago Puzzle | 📋 proposé (reconstruire un bus) |
| **Séquence / rythme** | reproduire un ordre | Endless Learning | ✅ MJ-16 (Complète la suite) |
| **Coloriage / création** | expression libre | Draw Along, Toca | ❌ absent (idée future) |
| **Narration interactive** | histoire + choix | Sago Mini World | ❌ lien pôle narration |
| **Course / conduite** | piloter un véhicule | Tayo, Hill Climb | 🔶 MJ-07 (Phaser) embryonnaire |
| **Physique / gravité** | laisser tomber, pousser | Busy, Thinkrolls | ❌ absent |
| **Simulation quotidienne** | préparer repas, laver… | Toca Kitchen | 🔶 MJ-17 l'amorce |

## 6. Synthèse — pistes prioritaires pour MaxPlay

### 🎯 Court terme (quelques heures chacune)
1. **Mascotte entre les MJ** — petit Wex en bas à droite du menu qui réagit (clin d'œil → pôle narration)
2. **Mode bac à sable pour MJ-17** — toggle "Village libre" sans score, bus qui arrivent à rythme doux
3. **TTS systématique sur les instructions** — chaque consigne parlée (règle UX n°2)
4. **Lettres parlantes MJ-04** — inspiration Endless Alphabet

### 🚀 Moyen terme (1-2 jours chacune)
5. **Jeu de mémoire (paires bus)** — format manquant, valeur éducative forte
6. **Reconstruire un bus (puzzle)** — déjà évoqué, fit univers
7. **PWA + offline** — installable sur tablet Max, marche sans wifi
8. **Accessibilité audio partout** — aucune instruction uniquement texte

### 🌌 Long terme (semaines)
9. **Narration interactive** — fusion pôle jeu / pôle narration, "une mini-histoire par soir" avec Wex
10. **Hub 2D exploratoire (MJ-07 Phaser)** — Max conduit dans une ville, entre dans les bâtiments pour lancer les MJ (cf. Tayo game)
11. **Mode coopératif parent** — 2 taps simultanés, un joue, un aide

## 7. Ressources

- Sesame Workshop UX research : https://sesameworkshop.org (usage digital enfants)
- ESA Kids UX Guide (Entertainment Software Association)
- Pok Pok design talk (GDC 2023)
- Toca Boca philosophy : "no rules, only play"
- Cocomelon / Moonbug research sur engagement attention 2-5

> Remarque : ces URL sont données pour mémoire et peuvent nécessiter vérification avant usage documentaire.
