# PIPELINE-MEMORY — Mémoire méta-process du pipeline tile-tools

> **Quoi** : journal des décisions de design, frictions résolues, retours user sur la **boucle elle-même** du pipeline tile-tools.
> Pas un journal des tiles (ça c'est `~/.claude/skills/maxplay-tiles/LESSONS.md`).
> Pas un journal projet (ça c'est `game/tasks/BACKLOG.md`).
> **C'est le journal de comment notre système d'agents tile évolue.**
>
> **Garant** : [`game-tile-pmo`](../../../.claude/agents/game-tile-pmo.md) — ajoute une entrée datée à chaque session où le pipeline lui-même change.
>
> **À lire** au démarrage de toute session où on touche aux agents tile (création, refonte, debug), pas pour une simple compo tile.

---

## 1. Architecture actuelle (snapshot 2026-05-11)

```
Main agent (Sonnet/Opus)
  └─ game-pmo (Haiku) [PMO niveau pôle JEU]
      • scope : state.md + BACKLOG.md
      • classifie inputs (6 catégories DÉCISION/LEÇON/TODO/QUESTION/INFO/TRAITEMENT)
      └─ game-tile-pmo (Haiku) [sous-spé pipeline tile]
          • scope strict : LESSONS.md + cartography.json + patterns.js + recipes_data.js + PIPELINE-MEMORY.md (ce fichier)
          • remonte synthèse 5-10 lignes à game-pmo
          • NE TOUCHE PAS state.md ni BACKLOG.md

[Sachants tile à créer — design en cours validation user 2026-05-11]
  game-tile-simplifier (Sonnet) → analyse scène, applique règles
  game-tile-designer  (Sonnet) → recette Python + PNG
  game-tile-reviewer  (Haiku)  → verdict PASS/FAIL avec checklist hardcodée
  → boucle d'apprentissage : correction user → game-tile-pmo → LESSONS + ce fichier
```

**Skills mobilisés** :
- `~/.claude/skills/maxplay-tiles/` (technique LimeZu, 30+ leçons cartographie)
- `~/.claude/skills/multi-agent-pmo/` (template PMO normé, créé 2026-05-10)

---

## 2. Décisions de design (chronologique)

### 2026-05-10 — Création de `tile-pmo` (version 1, supprimée le même jour)

**Décision** : créer un agent PMO Haiku pour capturer les leçons tile.
**Raison** : 30+ leçons accumulées éparpillées dans LESSONS.md uniquement, invisibles au reboot.
**Résultat** : agent créé mais **n'écrivait que dans LESSONS.md** → invisible au reboot, ne touchait pas BACKLOG ni state.md.

### 2026-05-10 — Audit user "tu fais pas ton job de garant"

**Décision** : refonte complète avec **cartographie 8 fichiers** + checklist 8 cases.
**Résultat** : fiche poste enrichie mais toujours **agent unique tile-pmo** sans hiérarchie. Confondait scope pôle (state.md, BACKLOG.md) et scope tile (LESSONS, cartography).

### 2026-05-10 — Refonte hiérarchique : game-pmo + game-tile-pmo

**Trigger user** : *"pkoi il est pas agent de Game ? et on peut avoir une sous spécialisation Tile si tu veux"*
**Décision** : 2 agents : `game-pmo` (parent niveau pôle) + `game-tile-pmo` (sous-spé scope strict 4 fichiers).
**Raison** (validée par deepsearch Feb-May 2026) :
- Memory isolation problem (Hindsight mai 2026) : sous-agents siloed, doivent graver dans fichiers projet
- Hierarchical decomposition (Google ADK) : parent → enfant uniquement, jamais cross-pôle
- Coordination substrate pattern : state.md + BACKLOG.md comme source de vérité partagée
**Résultat** : architecture testable, scope strict par agent, format synthèse remontée standardisé.

### 2026-05-10 — Création skill `multi-agent-pmo`

**Trigger user** : *"je veux bien en faire un skill de ton deepsearch pmo stp"*
**Décision** : capitaliser le pattern PMO multi-agent en skill global `~/.claude/skills/multi-agent-pmo/`.
**Contenu** : template 12 sections + 5 trouvailles deepsearch + 8 anti-patterns + checklist création + sources.
**Résultat** : réutilisable pour d'autres pôles (ex futur si on segmente narration-pmo) ou autres projets.

### 2026-05-11 — Constat manque sachant tile

**Trigger user** : *"j'ai pas de sachant en tile, un mec je lui donne une image y sait me la mettre en mode tile"*
**Constat** : on avait créé **2 PMO comptables** mais **0 sachant**. game-dev ne connaît pas LimeZu en profondeur. Les `pixel-map-simplifier/designer/reviewer` globaux **étaient pile pour ça** mais sont sur une version fossile :
- Format de sortie : JS `MAP_NOM` au lieu de Python `recipes/*.py`
- Tileset catalog : `~/.claude/skills/pixel-maps/tileset-catalog.md` (ancien) au lieu de `cartography.json` (actuel)
- Pas de connaissance des 30 leçons MaxPlay (anti-mono, `_2`/`_8` propres, croix `_13`, INT/EXT corners)
- Pas connectés à game-tile-pmo (pas de boucle d'apprentissage)
**Décision** : créer 3 agents projet-scopés `game-tile-simplifier`, `game-tile-designer`, `game-tile-reviewer` qui :
- Lisent skill maxplay-tiles + LESSONS + cartography.json (sources de vérité actuelles)
- Sortent en format Python `recipes/*.py`
- Bouclent avec game-tile-pmo (qui grave les corrections user en L-xxx)
**Statut** : design validé, implémentation à faire.

### 2026-05-11 — Création de ce fichier PIPELINE-MEMORY.md

**Trigger user** : *"tout ce qu'on a vu dans cette discussion mes corrections et challenge ca va remonter où ?"*
**Décision** : créer un journal méta-process distinct de LESSONS (tile technique) et BACKLOG (projet).
**Garant** : game-tile-pmo (ajouter ce fichier à son scope strict).

---

## 3. Frictions résolues

### F-001 : PMO ne gravait que dans 1 fichier
- **Symptôme** : leçons invisibles au reboot, user devait re-expliquer
- **Cause** : confusion garant vs secrétaire, pas de cartographie multi-fichiers
- **Résolution** : refonte fiche poste avec cartographie 8 fichiers explicite + checklist
- **Anti-pattern gravé** : "un PMO qui ne grave que dans 1 fichier n'est pas un PMO, c'est un journal intime"

### F-002 : Confusion scope pôle vs scope tile
- **Symptôme** : tile-pmo (v1) écrivait dans state.md → confusion avec scope global JEU
- **Cause** : pas de hiérarchie, agent monolithique
- **Résolution** : split parent (game-pmo) / enfant (game-tile-pmo) avec scope strict + format synthèse remontée
- **Pattern gravé** : "sous-spé ne touche jamais aux fichiers du parent — remonte une synthèse formatée"

### F-003 : 2 PMO mais 0 sachant tile
- **Symptôme** : couverture comptable complète, mais personne pour transformer une image en tile
- **Cause** : focus initial sur la persistance, oubli du métier
- **Résolution** : 3 agents sachants à créer (simplifier/designer/reviewer)
- **Pattern gravé** (skill multi-agent-pmo, anti-pattern #5) : "pour chaque domaine structuré, prévoir PMO ET sachant — sinon il manque un côté"

### F-004 : pixel-map-* globaux non réutilisables
- **Symptôme** : les agents existaient mais inutilisables tels quels pour MaxPlay actuel
- **Cause** : tileset-catalog ancien, format JS, déconnectés de cartography/LESSONS
- **Résolution** : créer des équivalents projet-scopés (game-tile-*), garder pixel-map-* globaux pour d'autres projets potentiels
- **Pattern gravé** : "ne pas modifier un agent global pour les besoins d'un projet — créer un équivalent projet"

### F-005 : Audit superficiel sans lire le fichier complètement (2026-05-11)
- **Symptôme** : sur les 7 challenges transmis à narration-pmo, **C-1 (checklist hardcodée fin de session) était déjà implémenté** dans narration-pmo.md → décliné par lui
- **Cause** : j'ai lu narration-pmo.md partiellement pour formuler les challenges, manqué la section "Checklist remise main 8 points" qui existait déjà
- **Résolution** : lire le fichier en entier (Read sans limit + Grep des sections) avant de proposer un challenge "manque X"
- **Pattern gravé** : "auditer ≠ scanner — il faut LIRE en entier le fichier audité avant de proposer du 'manquant'"
- **Conséquence positive** : narration-pmo a quand même retenu 5/7 (C-3 traité en plus léger via section decisions.md plutôt qu'un 6e fichier ; C-4/C-5/C-6 patchés ; C-7 noté Question ouverte #16)

### F-006 : Conflit doc cartography.json ↔ LESSONS.md (2026-05-11)
- **Symptôme** : Claude se trompait systématiquement entre `_2` (H propre) et `_14` (H sale). 5+ fois sur 4 sessions, malgré 30+ leçons gravées
- **Cause** : `cartography.json` line 22 disait "_14 = ligne H propre" (cartographie historique 2026-05-04), `LESSONS.md` correction 5 du 2026-05-10 disait "_14 SALE, _2 PROPRE" → deux sources de vérité contradictoires, Claude lisait l'une ou l'autre
- **Résolution** : créer `vocab.py` comme **source unique** (constantes nommées français), marquer `cartography.json` DEPRECATED (champ `_DEPRECATED` dans le JSON), pointer skill+agent vers vocab.py
- **Pattern gravé** : "une source de vérité unique, sinon la mauvaise se rappellera à toi"

### F-007 : Inventer la composition de scènes = piège (2026-05-11, soir)
- **Symptôme** : J'ai commencé à coder des macros `route_h`, `route_v` qui répliquent exactement les recettes existantes. Mais **Papa Yann trouve les recettes existantes pas OK visuellement** → mes macros héritaient du défaut → circulaire
- **Cause** : confusion entre "documenter des constantes" (légitime, vocab.py) et "inventer comment composer" (illégitime, je n'ai pas l'œil de Papa Yann)
- **Résolution** : **pivot EP-VOCAB phase 3+**. On abandonne l'invention de macros. On collecte des **références visuelles validées** par Papa Yann (LimeZu officiel, Pokemon, LDtk samples) → on reproduit fidèlement → la "macro" devient une recette de référence.
- **Pattern gravé** : "0-invention sur la composition esthétique. On copie ce qui marche déjà et que l'utilisateur valide visuellement. On invente seulement le vocabulaire (constantes nommées)."
- **EP créé** : EP-REFS (banque de références visuelles tile-tools) — à lancer en session dédiée

---

## 4. Patterns user observés (collaboration)

### P-001 : Propositions concrètes > questions multi-choix abstraites
- **Observation** : *"pas une recherche rapide en ligne un deep search"* + rejet d'une AskUserQuestion 3-choix
- **Conséquence** : préférer **1 proposition détaillée + question simple de validation** plutôt qu'une menu 3-options
- **Application** : à graver aussi en auto-memory feedback pour persistance cross-sessions

### P-002 : User répète calmement quand on ne comprend pas
- **Observation** : *"je te l'ai dit calmement 5x de suite"* sur `_14` sale
- **Conséquence** : si user signale 2x la même chose sans amélioration visible → STOP, zoomer, comparer (L-016 gravée dans LESSONS)
- **Application** : règle déjà active côté tile-pmo

### P-003 : User pointe le manque avec une question rhétorique
- **Observation** : *"j'ai pas de sachant en tile, t'es bien conscient ?"*
- **Conséquence** : reconnaître le manque immédiatement avant de proposer ("Tu as raison à 200%")
- **Application** : pas de défense, on confirme le constat puis on propose

### P-004 : User veut une boucle d'apprentissage positive
- **Observation** : *"on a une boucle d'apprentissage et positive"*
- **Conséquence** : chaque correction user doit enrichir le système (LESSONS, PIPELINE-MEMORY, cartography) pour que les futures sessions soient meilleures
- **Application** : c'est l'objectif central du pipeline 3-sachants + game-tile-pmo

### P-005 : Challenge réciproque entre PMO fonctionne (2026-05-11)
- **Observation** : audit cross-PMO game-pmo ↔ narration-pmo a donné 5/7 retenus côté narration. Narration-pmo a répondu : *"À charge de revanche : quand tu pousseras la prochaine évolution de tile-pmo, ping-moi pour challenge réciproque"*
- **Conséquence** : le mécanisme de challenge réciproque entre PMO de pôles différents est un **vecteur d'amélioration mutuelle** sans toucher au scope strict de chacun
- **Application** : à la **prochaine évolution non-triviale de game-pmo OU game-tile-pmo**, le main agent doit pinger narration-pmo pour challenge réciproque. Engagement explicite ↔.

### P-006 : "0-invention" sur la composition esthétique (2026-05-11)
- **Observation** : *"t'es pas obligé d'inventer hein c'est ca le PB... mais tu as dit que tu notais juste le vocabulaire ? y'a pas des exemples visuel dans tous les repos exemple que t'as trouvé ?"*
- **Conséquence** : Claude doit faire la **différence entre 2 types d'outputs** :
  - ✅ **Légitime** : documenter, cartographier, nommer (vocab.py), lister des sources externes (RESEARCH-INSPIRATIONS.md)
  - ❌ **Illégitime** : inventer comment doit-être un beau carrefour, un beau trottoir, une belle rivière → Papa Yann n'a pas la même esthétique que les recettes existantes, donc je reproduirai le défaut
- **Application** : pour tout nouveau type de scène (carrefour, immeuble, parc…), **commencer par chercher une référence visuelle externe** (LimeZu officiel, Pokemon, LDtk samples) que Papa Yann valide, **avant** d'écrire la moindre ligne de recette.
- **Règle d'or gravée** : "on copie ce qui marche, on n'invente pas le beau"

### P-007 : Papa Yann valorise le "dire non" (2026-05-11)
- **Observation** : *"pas de soucis à dire non !!! au contraire, on gagne du temps !"*
- **Conséquence** : quand Claude détecte une faiblesse dans son propre plan, il doit la nommer EXPLICITEMENT et proposer le pivot, plutôt que d'avancer mécaniquement.
- **Application** : ne pas continuer à exécuter une phase juste parce que je l'ai prévue ; signaler au moindre doute. C'est valorisé, pas pénalisé.
- **Format challenge** : transmettre 5-7 observations comparatives (forme + fond), pas un audit complet. L'autre PMO trie et patche ce qui est pertinent dans son scope.

---

### 2026-05-12 — Clôture EP-VOCAB, livraison pipeline route+virages v3, intégration builders.py

**Trigger** : Papa Yann finalise les recettes route + 4 virages avec nouvelle largeur LimeZu validée (3 chaussées H=7rows, V=7cols).
**Livrables** (batch-validé reviewer 9/10 PASS) :
1. `builders.py` v3 : `route_h(longueur, trottoirs=True, anti_mono_cols=())` → 7 rows ; `route_v(hauteur, trottoirs=True, anti_mono_rows=())` → 7 cols
2. **5 recettes produites + validées** :
   - `test_route_h_7rows_v3.py` (14×7, 672×336 px) ✅
   - `test_route_v_7cols_v3.py` (7×14, 336×672 px) ✅
   - `test_papa_route_large.py` (17×9, 816×432 px) ref composition Papa
   - 4 virages refactorés **13×13 carré intersection 7×7** :
     - `test_virage_gauche.py` (pivot haut-droite) ✅
     - `test_virage_droit.py` (pivot haut-gauche, miroir H) ✅
     - `test_virage_haut_gauche.py` (pivot bas-droite, miroir V) ✅
     - `test_virage_haut_droit.py` (pivot bas-gauche, miroir H+V) ✅
3. Playground mis à jour : `game/web/tools/vocab-playground.html` cards v3 + status validated
**Verdict** : PASS 9/10 (aucune issue, reviewers ont juste signalé "visually clean").

**Leçons à graver dans LESSONS.md** :
- P-008 : Pipeline 3-sachants (simplifier→designer→reviewer) = unité travail pour recettes complexes (latence 8 min vs 40+ min tâtonnement)
- P-009 : Anti-pattern détecté 2026-05-12 — vérifier agents/skills avant de coder (checklist : (1) skill maxplay-tiles ? (2) pipeline 3-agents ? (3) PMO à invoquer ?)
- P-010 : Géométrie virage 3-chaussées = carré 7×7, 4 coins critiques, marquages s'arrêtent à la limite de la branche pure
- P-011 : Anti-mono pool 3 + décalage voie → `_VOIE_POOL = [_a(20), _a(22), _a(27)]` avec cycle modulo, casse la mono "tâches"

**Conséquence** : EP-VOCAB **clôturé 2026-05-12** (scope révisé post-pivot 2026-05-11). Briefs complexes reportés en EP-REFS (session dédiée).

---

## 5. Hypothèses à tester (suivi)

| Hypothèse | À tester quand | Critère |
|-----------|----------------|---------|
| Reviewer en Haiku suffit (verdict structuré rapide) | ✅ **VALIDÉE 2026-05-12** | < 1 min par recette, verdict fiable 9/10 PASS |
| Designer en Sonnet vs Opus | ✅ **VALIDÉE 2026-05-12** | Sonnet a produit 5 recettes route+virages sans dériver, respecte 6 règles |
| Simplifier nécessaire ou fusionnable avec designer | À affiner après 3 sessions | Observe si simplifier sort valeur ajoutée > 20% du temps |
| Auto-déclenchement game-tile-pmo à chaque PASS reviewer | ✅ **À systématiser** | Chaque PASS doit appeler game-tile-pmo pour graver la leçon |

---

## 6. Sources externes & inspirations

- **Skill** : [`~/.claude/skills/multi-agent-pmo/SKILL.md`](C:/Users/kimen/.claude/skills/multi-agent-pmo/SKILL.md) (template normé)
- **Skill** : [`~/.claude/skills/maxplay-tiles/SKILL.md`](C:/Users/kimen/.claude/skills/maxplay-tiles/SKILL.md) (règles LimeZu + 30 LESSONS)
- **PMO modèle** : [`.claude/agents/narration-pmo.md`](../../../.claude/agents/narration-pmo.md) (classification 6 catégories, autonomie 3 niveaux)
- **Agents globaux abandonnés** : `~/.claude/agents/pixel-map-simplifier.md`, `pixel-map-designer.md`, `pixel-map-reviewer.md` (version fossile, format JS, non connectés cartography.json)
- **Deepsearch Feb-May 2026** :
  - Memory isolation (Hindsight mai 2026)
  - Coordination substrate (claude-progress.txt pattern)
  - Hierarchical decomposition (Google ADK + Anthropic engineering)
  - « 1 goal/input/output/handoff » (Anthropic blog)

---

## 7. Engagements croisés inter-PMO

| Date | Engagement | Origine | Statut |
|---|---|---|---|
| 2026-05-11 | À la prochaine évolution non-triviale de `game-pmo` ou `game-tile-pmo`, pinger `narration-pmo` pour challenge réciproque | Réponse narration-pmo après audit du 2026-05-11 (5/7 retenus) | ✅ **HONORÉ 2026-05-11** — création game-conseiller + game-mj-pmo + game-mj-reviewer → 5/5 challenges narration-pmo retenus, patchs appliqués, voir `PIPELINE-MEMORY-MJ.md` |
| 2026-05-11 | À la création de `game-wexworld-*` (Phase 2), continuer le protocole réciproque avec narration-pmo (pattern validé 2 fois) | Pattern P-004 PIPELINE-MEMORY-MJ — à systématiser | ⏳ Actif (Phase 2) |

**Mécanisme** : main agent invoque l'autre PMO via Agent tool avec un prompt "challenge réciproque sur fiche [nom]". L'autre PMO renvoie 5-7 observations, le PMO ciblé trie et patche.

---

## 8. Comment alimenter ce fichier

À chaque session où **le pipeline lui-même** change, `game-tile-pmo` ajoute :
- Une entrée dans § 2 (Décisions de design) si nouveau agent / refonte / suppression
- Une entrée dans § 3 (Frictions) si problème résolu sur la boucle
- Une entrée dans § 4 (Patterns user) si nouveau tic de collaboration observé
- Une entrée dans § 5 (Hypothèses) si nouvelle expérimentation à suivre

**Ne pas ajouter ici** :
- Les leçons sur les tiles individuelles → `LESSONS.md`
- Les bugs/features projet → `BACKLOG.md`
- Les sessions tile sans changement de pipeline → ailleurs (state.md via game-pmo)
