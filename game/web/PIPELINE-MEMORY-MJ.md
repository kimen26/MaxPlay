# PIPELINE-MEMORY-MJ — Mémoire méta-process du pipeline mini-jeux HTML

> **Quoi** : journal des décisions de design, frictions résolues, retours user sur **la boucle elle-même** du pipeline mini-jeux MaxPlay.
> Pas un journal des règles UX/péda (ça c'est `game/memory/rules.md`).
> Pas un journal projet (ça c'est `game/tasks/BACKLOG.md`).
> **C'est le journal de comment notre système d'agents MJ évolue.**
>
> **Garant** : [`game-mj-pmo`](../../.claude/agents/game-mj-pmo.md) — ajoute une entrée datée à chaque session où le pipeline MJ lui-même change.
>
> **À lire** au démarrage de toute session où on touche aux agents MJ (création, refonte, debug), pas pour un simple ajout de mini-jeu.

---

## 1. Architecture actuelle (snapshot 2026-05-11)

```
Main agent (Sonnet/Opus)
  └─ game-pmo (Haiku) [PMO niveau pôle JEU]
      • scope : state.md + BACKLOG.md
      └─ game-mj-pmo (Haiku) [sous-spé mini-jeux HTML]
          • scope strict : rules.md (rare), stack.md (rare), PIPELINE-MEMORY-MJ.md (ce fichier), docs/jeux/ (ajout possible)
          • remonte synthèse 5-10 lignes à game-pmo

Sachants MJ :
  game-conseiller (Opus) [transverse] → réflexion produit, challenge des idées
  game-dev (Sonnet) → développement HTML + Phaser
  game-mj-reviewer (Haiku) → validateur pré-livraison checklist 5 sections (Bus & couleurs / UX 3.5-4 ans / Audio / Technique / Vocab & péda)

Pipeline boucle d'apprentissage :
  user idée → game-conseiller (challenge) → game-dev (code) → game-mj-reviewer (verdict PASS/FAIL, max 5 iter)
  → user (validation finale) → game-mj-pmo (grave leçon technique + meta) → game-pmo (state.md + BACKLOG.md)
```

**Skills mobilisés** :
- `~/.claude/skills/pmo-design/SKILL.md` (template PMO normé)
- `~/.claude/skills/pmo-challenge/SKILL.md` (audit/challenge réciproque)

---

## 2. Décisions de design (chronologique)

### 2026-05-11 — Décision Papa Yann sur scope mj-12

**Trigger user** : *"nanan c'est bien garder comme plage de son tableau de bord, pas de jeu"*

**Décision** : mj-12 reste un **dashboard sonore / découverte libre**, pas un mini-jeu à mécanique gagnant. Pas de refonte en quiz. L'intro splash actuelle ("Joue avec les sons / Touche les boutons pour écouter") reflète bien ce scope. Étiquettes index.html cohérentes ("Nouveaux sons" + "Bus, Mario, Pokémon et plein de sons secrets !").

**Conséquence pour le pôle JEU** : la grille des mini-jeux peut contenir **2 types** :
- **Jeux à mécanique** (quiz, tri, déduction) avec compteur de tours + showEndScreen
- **Dashboards / découvertes libres** (exploration, sans gagnant) — mj-12 est le 1er du genre

**Application future** : ne pas chercher à imposer "score / fin de partie" aux dashboards. game-mj-reviewer doit reconnaître ce type via une convention (ex `data-mp-type="dashboard"` sur `<body>` à explorer plus tard si on en crée d'autres).

→ Voir L-024 dans BACKLOG.

---

### 2026-05-11 (nuit) — Audit complet + refactor 5 dimensions + 2 composants partagés

**Trigger user** : *"review tous les jeux, intro, son, [...] retour menu ou rejouer. y'a des bugs sur beaucoup ! (...) CORRIGE TOUT"*

**Audit conduit** via skill `pmo-challenge` (Explore en délégation) sur les 19 mini-jeux et 5 dimensions ciblées. **Résultat** : 3 bugs transversaux + 5 bugs localisés.

**Décision** : créer 2 composants partagés (back-button.js + intro-splash.js) + neutraliser `.scorebar` dans le CSS partagé, puis batch des MJ. Approche **composants > duplications** pour gain durable.

**Composants créés** :
- `game/web/js/back-button.js` : bouton 80×80 avec mini-bus SVG, auto-replace sélecteurs `.back`, `.back-mj`, `.back-btn`, `#hdr a/button[href|onclick*="index.html"]`
- `game/web/js/intro-splash.js` : splash 1.5s avec auto-init via `data-mp-intro-emoji|title|hint` sur `<body>`, skippable au tap

**Fichiers patchés** :
- `style.css` : `.scorebar/.scoretxt/.scoreval/.streak` → `display:none !important`. `.back` upgraded 48×48 → 80×80. Ajout `.progressbar` (alternative non-numérique).
- 18 MJ HTML : injection script back-button.js
- 7 MJ : score badges inline masqués (mj-13a/b/c sur `#score`, mj-14/15/16/17 sur `#score-badge`)
- 7 MJ : intro splash + `data-mp-intro-*` (mj-04/05/12/13a/b/c/17)
- mj-pose-tiles : import sounds.js + victory-sounds.js + feedback.js + back-button.js, `celebrer()` enrichi avec `playEndSound` + `confettiBurst`

**Résultat** : violations rules.md (scores visibles, zones tap < 80px, intros absentes, mj-pose-tiles silencieux) résolues sans toucher à la logique métier des MJ.

### 2026-05-11 — Création game-mj-pmo + game-mj-reviewer + game-conseiller (Phase 1)

**Trigger user** : *"on a pas d'agent pour les mini-jeux, autant avoir aussi un agent à minima de validation avant livraison de suivi backlog todo"* + vision élargie en 3 sous-domaines (MJ, tile, WexWorld) + besoin d'un conseiller transverse.

**Décision** : créer 3 agents Phase 1 — **game-mj-pmo** (sous-spé PMO), **game-mj-reviewer** (validateur Haiku), **game-conseiller** (Opus, transverse aux 3 sous-domaines).

**Raison** :
- 19 MJ actifs avec règles UX/péda/techniques denses (rules.md + stack.md) mais aucun agent ne les validait systématiquement → risque régressions
- Manque d'équivalent de `narration-conseiller` côté JEU pour réflexion produit profonde
- Capitaliser le pattern `game-tile-pmo` + `game-tile-reviewer` qui fonctionne sur tile pour le décliner sur MJ
- Préparer la **Phase 2 WexWorld** (game-wexworld-* à venir) en posant les fondations transversales d'abord

**Résultat** : architecture symétrique avec pattern PMO + validateur + conseiller. `game-conseiller` se distingue car **transverse**, non rattaché à un sous-spé.

**Liens** :
- `game-mj-pmo.md` (sous-spé PMO Haiku)
- `game-mj-reviewer.md` (validateur Haiku, checklist 5 sections)
- `game-conseiller.md` (Opus, ta voix)
- `game/memory/VISION-LONG-TERME.md` (créé en parallèle pour graver Phase 2 + 3)

---

## 3. Frictions résolues

### F-001 : Pas de protocole "conflit design vs règles UX" (2026-05-11)
- **Symptôme** : narration-pmo (challenge réciproque OBS-1) a relevé qu'aucun protocole n'arbitrait quand game-conseiller propose une idée qui viole rules.md
- **Cause** : game-mj-pmo et game-conseiller n'avaient pas de hiérarchie d'arbitrage explicite
- **Résolution** : section "Cas de conflit design vs règles UX" ajoutée dans `game-mj-pmo.md` → game-mj-pmo escalade à game-pmo qui arbitre via user. Pas de double commandement.
- **Pattern gravé** : "tu ne tranche jamais seule un conflit règle/design — tu escalades game-pmo"

### F-002 : Pas de mémoire vivante "patterns Max" accessible à game-conseiller (2026-05-11)
- **Symptôme** : narration-pmo (OBS-2) a relevé que game-conseiller devra relire MAX_PROFILE.md + rules.md à chaque session pour accumuler les patterns observés. Pas d'équivalent `lecons-vivantes.md` côté game.
- **Cause** : pas créé en Phase 1 (focus sur agents)
- **Résolution** : section "§ 4 Patterns user" de ce fichier (PIPELINE-MEMORY-MJ.md) prend ce rôle. game-conseiller le lit au démarrage de chaque session. Pas besoin d'un 6e fichier `LECONS-MJ.md` dédié (KISS).
- **Pattern gravé** : "les patterns user observés sur les MJ vivent dans § 4 de PIPELINE-MEMORY-MJ, lus par game-conseiller à chaque session"

### F-003 : Coordination tile↔MJ pas explicite (cas mj-pose-tiles) (2026-05-11)
- **Symptôme** : narration-pmo (OBS-3) a noté que `mj-pose-tiles.html` consomme des recettes tile sans dépendance tracée
- **Cause** : game-mj-pmo et game-tile-pmo travaillaient en silos
- **Résolution** : section "Coordination tile↔MJ" ajoutée dans `game-mj-pmo.md` + ce fichier § 6 (Engagements croisés)
- **Pattern gravé** : "tile fournit, MJ consomme. Toute dépendance MJ→tile est tracée dans § 6 de PIPELINE-MEMORY-MJ + remontée à game-tile-pmo via game-pmo"

### F-004 : Pont narration↔jeu sans gate ni prérequis (CRITIQUE) (2026-05-11)
- **Symptôme** : narration-pmo (OBS-5 CRITIQUE) a alerté que sans protocole explicite, on découvrirait une dépendance cachée narration↔jeu dans 3 mois lors de la 1ère intégration WexWorld
- **Cause** : Hypothèse H-LT-002 formulée mais sans prérequis détaillés
- **Résolution** : section "Préparation du pont — prérequis canon avant adaptation jeu" ajoutée dans `VISION-LONG-TERME.md` avec 6 critères + protocole hand-off futur narration-pmo ↔ game-pmo
- **Pattern gravé** : "graver les protocoles inter-pôles avant qu'ils ne deviennent urgents — éviter le retro-fit"

### F-005 : Score visible sur 7 MJ → violation rules.md (2026-05-11)
- **Symptôme** : 7 MJ affichaient `Score` / `score-badge` / `#score` malgré la règle MaxPlay "pas de score < 6 ans"
- **Cause** : pattern hérité du CSS partagé `.scorebar` (mj-01/04/05) + badges inline custom (mj-13a/b/c/14/15/16/17). Les nouveaux MJ remplissaient le champ au lieu de désactiver.
- **Résolution** : `.scorebar` neutralisée par défaut dans style.css (DOM reste pour compat code) + `display:none !important` injecté dans les CSS custom inline. Ajout `.progressbar` comme alternative non-numérique pour les MJ qui ont besoin d'une jauge de progression.
- **Pattern gravé** : "le DOM peut accumuler du score en interne, jamais en visuel — utiliser .progressbar pour la jauge visuelle"

### F-006 : Boutons retour inconsistants 30-48px → tous les MJ violation 80×80 (2026-05-11)
- **Symptôme** : 3 patterns différents de bouton retour observés (`.back` 48×48, `#hdr a` 30px, `#hdr button` 32px), tous sous la zone tap 80×80 obligatoire
- **Cause** : pas de composant unique partagé
- **Résolution** : création `js/back-button.js` qui injecte un bouton 80×80 avec mini-bus SVG (forme "bus qui rentre au dépôt") au DOMContentLoaded. Auto-replace les 3 patterns existants. Injecté dans les 18 MJ via PowerShell batch. CSS `.back` fallback aussi upgradé 48→80 pour robustesse.
- **Pattern gravé** : "1 composant partagé > 19 duplications inline. Le composant gagne en upgrade futur (forme, accessibilité, son tap...)"

### F-007 : 6 MJ sans intro → Max ne sait pas quoi faire (2026-05-11)
- **Symptôme** : mj-04/05/12/13a/b/c/17 démarrent direct sur la mécanique, pas d'écran de bienvenue, pas de contexte
- **Cause** : pas de composant partagé, pas de convention
- **Résolution** : création `js/intro-splash.js` avec auto-init via `data-mp-intro-emoji|title|hint` sur `<body>`. Splash 1.5s, skippable au tap (respect agentivité Max), animation bounce sur emoji, **PAS de TTS** (respect EP-033).
- **Pattern gravé** : "convention déclarative > impératif — `data-mp-intro-*` sur `<body>` rend l'intro lisible dans le HTML, pas perdue dans le JS"

### F-008 : mj-pose-tiles silencieux + dépendance tile non tracée (2026-05-11)
- **Symptôme** : mj-pose-tiles n'importait ni sounds.js ni victory-sounds.js → expérience silencieuse, pas de feedback victoire. ET ligne 123-124 utilise `Asphalt_1_Variation_14`/`_15` qui sont les variations **SALE** (interdit par règle L-013 tile)
- **Cause** : créé en parallèle du pipeline tile sans coordination, audio oublié
- **Résolution partielle** : audio importé + `celebrer()` enrichi avec `playEndSound(10,10)` + `confettiBurst(40)` → finit sur succès. **Dépendance tile NON résolue** : `_14`/`_15` sales restent dans le code, à signaler à game-tile-pmo pour fix au prochain tour (cas exact OBS-3 narration-pmo qu'on a capitalisé)
- **Pattern gravé** : "tile fournit, MJ consomme — la dépendance doit être tracée à la création du MJ, pas découverte 3 sessions plus tard"

---

## 4. Patterns user observés

### P-001 : Vision en 3 sous-domaines (2026-05-11)

**Observation** : Papa Yann a précisé la vision pôle JEU en 3 sous-domaines structurés (mini-jeux HTML, maps tile, WexWorld Phaser) + un conseiller transverse. Il pense déjà à long terme (pont narration↔jeu, app mobile, diffusion grand public).

**Conséquence** :
- Ne pas siloter les 3 sous-domaines artificiellement — `game-conseiller` doit faire le pont
- Penser intégration future (un MJ peut devenir une scène WexWorld, une histoire canon peut devenir une zone)
- Graver les hypothèses long terme dans `VISION-LONG-TERME.md` distinct du BACKLOG tactique

**Application** : créer `game-conseiller` (Opus) avec scope transverse + section "ton rôle de pont cross-domaines" dans sa fiche.

### P-002 : Préférence MJ + dev = équipe (2026-05-11)

**Observation** : Papa Yann a formulé *"pmo + dev"* pour les MJ — pas "1 agent sachant unique" ni "5 agents par sous-action". L'équilibre KISS qu'il cherche : **1 sachant créatif (game-dev existant) + 1 validateur (reviewer) + 1 PMO**.

**Conséquence** : ne pas dupliquer game-dev en `game-mj-dev` dédié. game-dev reste général HTML + Phaser. Le reviewer suffit pour valider la spécificité MJ.

**Application** : pas de game-mj-dev créé. game-dev orchestre, game-mj-reviewer valide.

### P-003 : Patterns Max observés (mémoire vivante) (2026-05-11)

**Observation** : narration-pmo (OBS-2) a confirmé qu'il faut une mémoire vivante des patterns Max accessible à game-conseiller. Elle vit ici, pas dans un 6e fichier.

**Patterns à graver et enrichir au fil des sessions** :

**Succès culte** :
- **Klaxon prout 1/20** : *"il en parlera des jours"* → mécanique culte, keeper pour toujours
- **Multi-touch 2 doigts mj-09** (EP-032) : forte adhésion → explorer pour autres MJ tactiles
- **mj-15 niveau D roues colorées + E combo couleur+numéro** (EP-031) : progression motivante, modèle pour autres MJ progressifs
- **selectDistinctColors() minDist=80** : évite confusion couleurs, applicable partout
- **busSVG() / busSVGHiddenNum()** : identité visuelle stable, jamais 🚌 emoji
- **Drag & drop tri bus** : mécanique quick-win validée
- **MJ-20 progression Duolingo par langue** (EP-027) : engagement long terme
- **MJ-19 50-80 bus avec doublons** (EP-029) : densité optimale vs 20-30 (moins engageant)

**Échecs / leçons** :
- **TTS annonce titre au démarrage** (EP-033) : laggait → désactivé. **Règle gravée** : pas de TTS dans `<body onload>` ni en début de scene
- **MJ-04 boucle infinie** (EP-022) : bug actif à fixer
- **Quiz formels** : Max déteste → environnement qui invite, jamais "choisis la bonne réponse" frontal
- **Pénalités punitives** : encodage négatif, jamais
- **Streak < 7 ans** : anxiété si cassé
- **Classements / scores** : pleurs, jamais

**Conséquence pour game-conseiller** : lire **cette section** à chaque session (après MAX_PROFILE.md) pour rester à jour des patterns observés sans devoir tout reconstituer depuis rules.md.

### P-004 : Challenge réciproque PMO entre pôles fonctionne — 2e fois confirmée (2026-05-11)

**Observation** : 2e exécution du protocole challenge réciproque entre game-pmo et narration-pmo. Cette fois dans l'autre sens (game crée → narration challenge). Verdict : **5/5 challenges retenus** (4 patchés immédiatement, 1 CRITIQUE intégrée à VISION-LONG-TERME).

**Conséquence** : le protocole "challenge réciproque" du skill `pmo-challenge` est validé comme **outil systématique** à chaque évolution non-triviale d'un PMO ou d'un sachant transverse.

**Application** : à honorer pour toute prochaine évolution majeure (création game-wexworld-* en Phase 2, refonte conseiller, etc.). Le bénéfice asymétrique est documenté.

---

## 5. Hypothèses à tester (suivi)

| Hypothèse | À tester quand | Critère |
|-----------|----------------|---------|
| Reviewer en Haiku suffit (vs Sonnet) pour MJ HTML | 1ère review complète sur 1 MJ existant | < 3 itérations pour PASS sur mj simple |
| Le pattern conseiller transverse fonctionne sans pollution (pas dérive narration↔jeu) | Après 3-5 sessions d'usage game-conseiller | Aucune confusion de scope avec narration-conseiller |
| game-mj-pmo a-t-il besoin d'un PIPELINE-MEMORY ou peut tout vivre dans BACKLOG ? | Après 5 sessions MJ | Si PIPELINE-MEMORY reste vide, fusionner avec game-tile-pmo |
| Audit réciproque entre game-mj-pmo et narration-pmo apporte de la valeur | Après création (ping engagement réciproque) | Au moins 2/5 challenges retenus par chaque |

---

## 6. Engagements croisés inter-PMO

| Date | Engagement | Origine | Statut |
|---|---|---|---|
| 2026-05-11 | Ping narration-pmo pour challenge réciproque à la création de game-mj-pmo + game-mj-reviewer + game-conseiller | Engagement actif gravé dans `PIPELINE-MEMORY.md` (tile) § 7 — réponse 5/7 retenus | ✅ **HONORÉ 2026-05-11** — 5/5 challenges retenus, 4 patchés, OBS-5 CRITIQUE intégrée à VISION-LONG-TERME |
| 2026-05-11 | À la création de `game-wexworld-*` (Phase 2), pinger narration-pmo pour challenge réciproque | Pattern validé 2 fois, à systématiser | ⏳ Actif (Phase 2) |

### Dépendances inter-pôles tracées (cas concrets)

| MJ / Asset | Dépendance | Tracé par | Date |
|---|---|---|---|
| `mj-pose-tiles.html` | Consomme `recipes/test_quartier_propre.py` + cartography.json LimeZu | À tracer en collab game-mj-pmo + game-tile-pmo (OBS-3 narration-pmo) | 2026-05-11 |

**Règle** : toute nouvelle dépendance MJ→tile (ou tile→MJ) est tracée ici + remontée à game-pmo qui notifie l'autre sous-spé PMO.

---

## 7. Sources externes & inspirations

- **Skill** : [`~/.claude/skills/pmo-design/SKILL.md`](C:/Users/kimen/.claude/skills/pmo-design/SKILL.md) (template normé 12 sections)
- **Skill** : [`~/.claude/skills/pmo-challenge/SKILL.md`](C:/Users/kimen/.claude/skills/pmo-challenge/SKILL.md) (audit + challenge réciproque)
- **PMO frère** : [`game-tile-pmo`](../../.claude/agents/game-tile-pmo.md) — même pattern hiérarchique
- **Conseiller modèle** : [`narration-conseiller`](../../.claude/agents/narration-conseiller.md) — référence inspirante (Opus, binôme créatif)
- **Reviewer modèle** : [`game-tile-reviewer`](../../.claude/agents/game-tile-reviewer.md) — pattern checklist hardcodée + verdict PASS/FAIL

---

## 8. Comment alimenter ce fichier

À chaque session où **le pipeline MJ lui-même** change, `game-mj-pmo` ajoute :
- Une entrée dans § 2 (Décisions de design) si nouveau agent / refonte / suppression
- Une entrée dans § 3 (Frictions) si problème résolu sur la boucle d'agents
- Une entrée dans § 4 (Patterns user) si nouveau tic de collaboration observé
- Une entrée dans § 5 (Hypothèses) si nouvelle expérimentation à suivre
- Une entrée dans § 6 (Engagements) si nouveau challenge réciproque pris

**Ne pas ajouter ici** :
- Les leçons sur les MJ individuels (bug, fix, fonctionnalité) → `BACKLOG.md` via game-pmo
- Les nouvelles règles UX/péda → `rules.md` (rare, validation auteur)
- Les nouvelles règles techniques → `stack.md` (rare, validation auteur)
- Les sessions MJ sans changement de pipeline → ailleurs (state.md via game-pmo)
