# PIPELINE-MEMORY-MJ — Mémoire méta-process du pipeline mini-jeux HTML

> **Quoi** : journal des décisions de design, frictions résolues, retours user sur **la boucle elle-même** du pipeline mini-jeux MaxPlay.
> Pas un journal des règles UX/péda (ça c'est `studio/minijeux/memory/rules.md`).
> Pas un journal projet (ça c'est `studio/minijeux/tasks/BACKLOG.md`).
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

### 2026-05-16 — REX MJ-21 : 33 commits → pipeline 2 vitesses + harnais machine

**Chiffres** : MJ-21 « Peins les bus! » = **33 commits** pour un mini-jeu simple. 3 sagas = ~25 commits : « Mixer cassé » (7 commits, vraie cause au 7e = `Object.entries(tube)` itérait clés non-couleur), « Bus en haut/bas » (~10 répétitions verbales, cause = pas de figeage → CORRIGÉ 2026-05-15), « Tube vide à la victoire » (4 commits, vraie cause au 4e = `clipPath id="tc"` dupliqué entre vrai tube + clone).

**Diagnostic Conseiller (co-boss)** : il n'y a pas 5 causes mais **3 leviers réels**. Le goulot unique = **absence de boucle de feedback machine** (le main agent ne peut pas tester → Papa Yann = harnais humain → ~20 commits d'essais aveugles). Les causes « chasse aux symptômes » et « bugs pédago tardifs » sont des _symptômes_ du goulot (un replay machine les sortait en 1 run). Causes indépendantes : figeage (✅ résolu) + design amont.

**Décisions process gravées** :
1. **Pipeline MJ à 2 vitesses** (anti sur-process) :
   - _MJ neuf à mécanique_ : tunnel complet — (0) cadrage 1-écran game-conseiller validé par Papa Yann AVANT code → (1) figeage initial game-mj-pmo → (2) game-dev code **+** spec de test ensemble → (3) game-mj-reviewer (Section 0 figé + couverture spec) → (4) validation Papa Yann **juge produit** (plus débogueur) → (5) gravure.
   - _Patch / bugfix_ : voie express — lire figé → fix → harnais vert → push. 1 seule gate.
   - _Tweak cosmétique_ : direct, hook figeage = filet.
2. **Harnais de test machine OBLIGATOIRE avant tout push** (toutes vitesses). `npm run mj:test mj-XX` vert sinon pas de push, pas de Papa Yann.
3. **jsdom REJETÉ par le Conseiller** : n'attrape qu'1 des 3 sagas (pas de rendu SVG ni rAF) → faux sentiment de sécurité. Cible = **Playwright headless (Chromium réel)**. Spec minimale : smoke (console.error = fail) + chemin nominal scripté + screenshot fin + 1 assert par ligne 🔒. ~30-50 lignes/MJ, < 15s. **✅ VALIDÉ + OPÉRATIONNEL 2026-05-16** (Papa Yann a tranché : à jour pour la sécurité, pas de version épinglée vieille). Stack : Playwright 1.60.0 + Chromium 148 (build 1223). Setup dans `studio/minijeux/tests/` (`package.json`, `run.mjs` générique, `mj-21.spec.mjs` pilote). Commande : `cd studio/minijeux/tests && npm run mj:test mj-XX`. **Preuve rétro faite** : pilote ROUGE sur commit buggé `bf5f5cde` (`clipPath id UNIQUE` → `ids=[tc,tc]`, la cause racine exacte), VERT 7/7 sur HEAD. Le harnais aurait tué la saga "tube vide" en 1 run sans Papa Yann.
4. **Règle « 2 strikes » outillée** : à partir du 2e commit-fix sur le même symptôme, un cas de test reproduisant le bug DOIT être ajouté au harnais AVANT le fix (on ne peut pas tester un bug qu'on ne comprend pas → force la cause-racine).

**Leçons** : L-032 figeage (✅) · L-034 id SVG unique obligatoire si clones DOM · L-035 valider recette couleur en image avant pédago · L-037 design amont obligatoire · EP-038 harnais Playwright (action n°1 vélocité). Détail backlog.md.

**À implémenter dans l'ordre** : (1) harnais Playwright [seul à demander de l'outillage, 60% du ROI] → (2) gabarit cadrage 1-écran game-conseiller [coût zéro, activable tout de suite] → figeage déjà fait.

### 2026-05-15 — Système de FIGEAGE par jeu (incident MJ-21)

**Cause racine** : aucune décision validée par Papa Yann n'avait d'adresse physique par-jeu. Elles vivaient dans le contexte conversationnel → effacées à chaque `/compact` → régression structurelle. Incident : décision « bus cible EN BAS » répétée >10× puis re-proposée « en haut » post-compact.

**Décidé par Papa Yann + game-conseiller (co-boss)**. Système triple verrou :

1. **Fichier LOI par jeu** : `studio/minijeux/docs/jeux/figees/mj-XX.md` (sections : Objectif / 🔒 Mécanique / 🔒 Layout / ❌ 🔒 Anti-régressions / Journal append-only / Zone ouverte). Seul `game-mj-pmo` y écrit (mot-pour-mot, jamais paraphrase). Seul Papa Yann défige.
2. **Hook PreToolUse** `.claude/hooks/figees-injector.ps1` (générique tous MJ) : réinjecte le fichier figé dans le contexte avant chaque Edit/Write d'un `mj-*.html`. Survit au `/compact`. C'est la pièce maîtresse — rend la régression structurellement impossible, pas « déconseillée ».
3. **Section 0 bloquante** dans `game-mj-reviewer` : diff sémantique code ↔ figé, citation obligatoire ligne par ligne, 1 ligne 🔒 violée = FAIL global immédiat.

Renforts : bloc « ⛔ AVANT DE MODIFIER » dans `.claude/rules/mini-jeux.md`, ligne LOI dans `studio/minijeux/CLAUDE.md` (re-injecté post-compact), responsabilité N°1 ajoutée à `game-mj-pmo`. Premier fichier : `figees/mj-21.md`.

**Trigger figeage** : formule Papa Yann (« OK c'est figé / validé / on fige / ne change plus X ») → main agent invoque `game-mj-pmo` immédiatement.

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
- `site/js/back-button.js` : bouton 80×80 avec mini-bus SVG, auto-replace sélecteurs `.back`, `.back-mj`, `.back-btn`, `#hdr a/button[href|onclick*="index.html"]`
- `site/js/intro-splash.js` : splash 1.5s avec auto-init via `data-mp-intro-emoji|title|hint` sur `<body>`, skippable au tap

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
- `studio/minijeux/memory/VISION-LONG-TERME.md` (créé en parallèle pour graver Phase 2 + 3)

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

### 2026-05-19 — MJ-22 « Trouve le pays ! » figé + harnais vert

**Trigger user** : Cahier des charges approuvé, commit 077de505 pushé. Papa Yann valide mécanique : clic → highlight orange + confirm → victoire overlay 2.5s.

**Décision** : figeage complet MJ-22 dans `studio/minijeux/docs/jeux/figees/mj-22.md` (section Mécanique / Layout / TTS / Niveaux / Anti-régressions). Test harness créé `studio/minijeux/tests/mj-22.spec.mjs` (11 asserts sur les 3 décisions figées : drapeau cible 72px, méca gagnante complète, progress dots).

**Résultat** : harnais vert, aucune correction nécessaire. Prêt pour game-mj-reviewer (Section 0 figé).

---

### 2026-07-05 — 6 nouveaux MJ dinos livrés (mj-28…33) · harnais vert 6/6 · leçons techniques gravées

**Trigger user** : Livraison lourde — 6 mini-jeux dinos avec testage. Commit f767416a pushé.

**Jeux livrés** :
- **MJ-28 Lampe du paléontologue** : spotlight CSS mask sur ombres, QCM noms (tag interactif → nuit → shadow)
- **MJ-29 Fabrique de noms** : briques racines grec/latin depuis `DINO_RACINES`, TTS sens à chaque pose (construction sémantique)
- **MJ-30 Range-les par taille** : tri puis révélation échelle vraie proportionnelle, enfant 1m posé en référence, vraies hauteurs dites (pédagogie échelle incarnée)
- **MJ-31 Grand voyage du temps** : frise 4-5 bandes peuplée (chrono), Pépite : T-Rex & Stégosaure jamais croisés (gap 85M ans), finale météorite 4 tableaux non-gore
- **MJ-32 Atelier coloriage** : flood-fill scanline <200ms sur 60 lineart PNG, galerie localStorage, libre (maxStars=0, pas de gagnant)
- **MJ-33 Memory des ombres** : paires ombre↔photo, cousins même famille (taxonomie L2, ex herbivores vs carnivores vs vols anciens)

**Statut harness** : ✅ **6/6 VERT** (npm run mj:test mj-28…33) — zéro correction nécessaire avant livraison. Preuve : commité f767416a clean.

**Mise à jour catalog.js** : +6 entrées catégorie `dinos` (mj-28→31+33 sequence maxStars 3, mj-32 free maxStars 0). Index.html menu alimenté.

**Leçons techniques gravées** (à intégrer L-xxx BACKLOG.md) :

1. **L-041 : const DINOS top-level = liaison lexicale globale, PAS window.DINOS**
   - Symptôme : 2 agents (mj-29 & mj-32 codeurs) ont perdu 45min à déboguer `window.DINOS undefined`
   - Cause racine : import `dino-data.js` crée `const DINOS` localement, mais essais sur `window.DINOS` en console
   - Règle à graver : accès par nom direct obligatoire dès le script charge. `window.DINOS` NE DEVRAIT JAMAIS être utilisé (pas d'export explicite)
   - Test : asserter que `DINOS` est accessible via nom direct (pas window.) dans les assert harness

2. **L-042 : Harnais run.mjs — flags Chromium --allow-file-access-from-files --disable-web-security obligatoires**
   - Symptôme : `file://` chaque fichier = origine opaque (spec CORS) → drawImage + getImageData toutes les lignes canvas en file:// causaient taint → silencieuse
   - Cause racine : Chromium headless en mode restrictif par défaut
   - Règle à graver : flags Chromium ajoutés à `studio/minijeux/tests/run.mjs` (Playwright + spécifique headless). En prod HTTPS same-origin : non concerné. Mais tout futur MJ canvas nécessite cet outillage harness.
   - Conséquence : tout MJ canvas = test harness OBLIGATOIRE, pas optionnel (pas de faux sentiment de sécurité)

3. **L-043 : PNG transparent silhouette ombre ≠ blanc + invert**
   - Symptôme : MJ-30 images ombres (mj-33 aussi) sont des PNG `_new-ombre/*` (silhouettes noires sur fond TRANSPARENT)
   - Cause : confusion initiale dev → les rencontrer en local sans fond = invisible (fond transparent du canvas)
   - Règle à graver : jamais de `filter: invert()` CSS sur silhouettes. Fond blanc/gris EN ARRIÈRE (contrastant). Le PNG reste noir pur. Vérification visuelle obligatoire (screenshot) car drawImage silencieuse sur fond blanc.
   - Test : 1 assert visual par MJ canvas-heavy (screenshot comparison, pas juste DOM assert)

4. **L-044 : 11 dinos sans image couleur = NO_HERO/NO_ASSET tag dans mj-28 et mj-33**
   - Status : edmontonia, torosaurus, pentaceratops, mammuthus, smilodon, megatherium, paraceratherium, glyptodon, aenocyon, coelodonta, titanis SANS `img/dinos/*.webp`
   - Régénération paléoart EN COURS (skill dino-paleoart actif)
   - Règle : mj-28/33 rendent gracefully (filtre `if (DINOS[id].images?.color)` avant drawImage). À RETIRER dès images livrées.
   - Tracking : tag NO_ASSET dans catalog.js jusqu'au complet.

**Architecture** :
- Source HTML : `site/mj-28.html` à `mj-33.html` (même repo GitHub Pages)
- Data canon : `site/js/dino-data.js` (DINOS const, liste complète 18 espèces + familiale)
- Harness : `studio/minijeux/tests/{mj-28…33}.spec.mjs` (1 fichier spec par MJ = couplage serré pour survie des figés)

**Statut figées** : aucun `figees/mj-28…33.md` créé — jeux pas encore VALIDÉS par Papa Yann (il teste via GitHub Pages seulement). À créer dès sa validation jeu par jeu, comportement par comportement.

**Prochaine action** : Papa Yann teste via https://kimen26.github.io/MaxPlay/ → feedback → figeage cas par cas → game-mj-reviewer Section 0 checkpoints figés.

### 2026-07-05 — Bug prod images 404 (mj-28/30/31/33) · leçon MAJEURE sur asset tracking

**Trigger** : Papa Yann détecte en prod 404 sur images dino dans 4 MJ livrés aujourd'hui.

**Cause racine** : nouveau dossier `img/dinos/_new-ombre/` GITIGNORÉ (staging, 60 PNGs ombres 600px). Harnais Playwright ✅ vert en local (file:// peut accéder au dossier staging) → faux sentiment de sécurité. En prod GitHub Pages HTTPS : dossier jamais poussé → 404 silencieux.

**Fix appliqué** (commit 941faa30) : chemins `_new-ombre/` → `img/dinos/ombres/` (nouveau dossier TRACKÉ). Specs mj-28/31 mises à jour. 11 dinos sans image couleur → filtres NO_HERO (mj-28) et NO_ASSET (mj-33) appliqués. PWA : icônes PNG 192+512 au manifest + apple-touch-icon dans index2.html (manifest SVG-only = pas d'icône install).

**Leçon CRITIQUE gravée** : `git check-ignore <chemin>` + `git ls-files <chemin>` OBLIGATOIRES après tout ajout de chemin d'asset dans un mj-XX.html. Harnais vert en local ≠ assets tracké. Réflexe : vérifier tracking AVANT push.

**Suggestion EP futur** : ajouter au harnais run.mjs un check automatique « chaque src/href/data-src relatif référencé par la page existe ET est tracké git ». Détecterait ce bug avant GitHub Pages.

**Prérequis pour fermer** : Papa Yann valide visuellement en prod (images chargées) + dino-skill génère images manquantes.

### 2026-07-05 (suite 3, clôture) — Revalidation 10/10 harnais + correctifs assets + déploiement SUCCESS

**Trigger** : Papa Yann demande revalidation complète 6 nouveaux MJ dinos + contrôle visuel mi-jeu.

**Corrections appliquées** :

1. **MJ-27 asset regression CASSÉE au harnais** — set `MISSING` périmé (noms `.png` vs data `.jpg`). Fix : spec regex accept `.png|.jpg`, liste MISSING vidée (60/60 heros valides). Leçon : listes d'exclusion en dur POURRISSENT → préférer manifest ou onerror.

2. **Ombres + coloriages** — damier transparence INCRUSTÉ pixels images générées. Contrôle visuel mi-jeu détecte (harnais DOM aveugle). Fix : nettoyage batch PIL (14Mo→1,7Mo). Leçon : contrôle PNG visuel obligatoire sur assets générés, harnais ne rend pas.

3. **Deploy-pages « Deployment failed » ×2 transitoire** — artefact 545 Mo (paleoart 122M + audio 191M + img/ 1,2G local dont 914M gitignorés). Alerte : régime minceur artefact avant d'atteindre 1 Go. Suggestion : webp + bitrate audio à surveiller.

**Statut final** : ✅ 10/10 harnais VERT (mj-24→33) · déploiement SUCCESS · 18/18 URLs prod HTTP 200 · staging concurrent géré (staging paths explicites, feedback_concurrent_git_staging appliqué).

**Leçon CRIANTE (ajout § Leçons)** : `git check-ignore <path>` + `git ls-files <path>` OBLIGATOIRES post-ajout asset dans mj-XX.html. Harnais vert local ≠ assets tracké. Réflexe avant push.

**Suggestion EP futur** : check auto dans harnais run.mjs « chaque src/href relative existe ET tracké git ». Détecterait ce bug avant GitHub Pages.

### 2026-07-05 (suite 4, figeage dinos) — MJ-24/25/26/31 FIGÉS après validations Papa Yann

**Trigger user** : Papa Yann validations explicites sur retours testage dinos en prod. 4 décisions figeage gravées dans les fichiers respectifs.

**Figeages créés** :

1. **`studio/minijeux/docs/jeux/figees/mj-31.md`** — Grand voyage du temps
   - 🔒 **Redire la période (époque) après bonne réponse** — leçon pédagogique centrale, jamais retirer. Papa Yann : **« c'est SUPER BIEN »**
   - 🔒 **Vignettes dino se posent EN LIVE sur frise chrono** — feedback principal, pas d'affichage massif final. Papa Yann : **« tes petites images en live c'est SUPERRRR »**
   - 🔒 **Voix RÉELLE ElevenLabs prioritaire sur TTS** pour annonce dino. Fallback TTS en 404 via manifest `js/dinos-audio-manifest.js` (auto-généré, source de vérité traçabilité).
   - 🔒 **T-Rex/Stégosaure jamais croisés** — alerte Wex « 85M ans » — leçon temporelle figée.
   - 🔒 **Finale météorite 4 tableaux, zéro gore** — vraie (« roches tombent, c'est fini »), pas violence.
   - Note : phrase d'époque reste TTS (aucun asset n'existe) — candidat génération EL post-reset quota (~9 juillet).

2. **`studio/minijeux/docs/jeux/figees/mj-24.md`** — Trouve l'espèce
   - 🔒 **Ombres chinoises CANON EXCLUSIVES** (`img/dinos/ombres/`, tracké). Silhouettes LimeZu : **SUPPRIMÉES, jamais réintroduire.**
   - 🔒 Papa Yann ordre explicite 2026-07-05 : *« les anciennes [silhouettes] SUPPRIME-LES, je ne veux plus les voir !! »*
   - 🔒 Fichiers banned : `img/dinos/silhouettes/`, `js/dino-silhouettes.js`, `dev-silhouettes.html` (supprimées en commit 941faa30).
   - 🔒 Voix réelle ElevenLabs pour nom dino (annonce spécifique), fallback TTS en 404.

3. **`studio/minijeux/docs/jeux/figees/mj-25.md`** — Cherche bien !
   - 🔒 Même bannissement silhouettes LimeZu → ombres canon `img/dinos/ombres/` exclusives.
   - 🔒 **Correction règle audio appliquée** : mj-25 disait « Regarde bien » → **« Cherche bien »** (règle UX 3.5-4 ans : écoute d'abord ≠ regard). Leçon L-xxx audio jeu.
   - 🔒 Voix réelle ElevenLabs pour nom dino, fallback TTS en 404.

4. **`studio/minijeux/docs/jeux/figees/mj-26.md`** — Tri des dinos
   - 🔒 Même bannissement silhouettes LimeZu → ombres canon exclusives.
   - 🔒 Voix réelle ElevenLabs pour nom dino, fallback TTS en 404.

**Leçon méthodologie gravée** : 
- **Manifest d'assets GÉNÉRÉ** (`js/dinos-audio-manifest.js`, script node one-liner) = réponse propre au pourrissement des listes en dur (L-046) ET aux 404 fallback gracieux. Garant : src fichiers réels, pas code.
- **Contrôle assets AVANT push** : `git check-ignore` + `git ls-files` post-ajout chemin. Harnais vert local (file://) ≠ assets tracké (prod HTTPS). Réflexe validé par incident images 404 (commit 941faa30).
- **Fallback TTS systématique** : si MP3 manquant (404), TTS navigateur prend le relais (pas d'erreur). Design pour la continuité, pas le crash.

**Statut** : 🔒 FIGÉ × 4 jeux. Fichiers créés, anti-régressions posées, miroirs négatifs documentés. Prêt pour game-mj-reviewer Section 0 checkpoints figés (pas encore validé en Section 0 par reviewer, attente test Papa Yann itéré).

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
