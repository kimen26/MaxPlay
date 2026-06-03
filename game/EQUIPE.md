# Organigramme — Équipe Pôle JEU MaxPlay

> **Ce fichier est la référence technique complète de l'équipe Game.**
> **Pour la lecture quotidienne**, voir [`INDEX.md`](INDEX.md).
> **Pour les chiffres clés**, voir [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md).
> Mis à jour 2026-05-13 (harmonisation Game ↔ Narration — création game-archiviste, refonte structure pmo/).
>
> Équivalent côté Narration : [`../studio/narration/equipe/ORGANIGRAMME.md`](../studio/narration/equipe/ORGANIGRAMME.md).

---

## Vue d'ensemble — 10 agents actifs (+ 3 Phase 2)

```
┌─ AUTEUR (Papa Yann)
│
├─ NIVEAU 1 : PMO PROACTIFS (AUTO à chaque tour)
│  ├─ game-pmo            [Haiku · AUTO signal JEU]     — FOND : INVARIANTS, decisions, sprint-log, backlog, audit-trail
│  └─ game-archiviste     [Haiku · AUTO signal structure] — FORME : dossiers, gabarit, refs, orphelins, préfixes
│
├─ NIVEAU 2 : SOUS-PMO (invoqués par game-pmo parent)
│  ├─ game-mj-pmo         [Haiku] — pipeline mini-jeux HTML (5 fichiers scope strict)
│  ├─ game-tile-pmo       [Haiku] — pipeline tile-tools LimeZu (4 fichiers scope strict)
│  └─ game-wexworld-pmo   [Haiku] — ⏳ Phase 2 (placeholder Phaser RPG)
│
├─ NIVEAU 3 : CONSEILLER (manuel, sur question produit)
│  └─ game-conseiller     [Opus] — binôme créatif transverse 3 sous-domaines
│
└─ NIVEAU 4 : SACHANTS SPÉCIALISÉS (manuel, sur demande)
   ├─ Sous-domaine TILE
   │  ├─ game-tile-simplifier  [Sonnet] — étape 1/3 : image/desc → ANALYSE
   │  ├─ game-tile-designer    [Sonnet] — étape 2/3 : ANALYSE → recette + PNG + BILAN
   │  └─ game-tile-reviewer    [Haiku]  — étape 3/3 : verdict PASS/FAIL max 5 iter
   │
   ├─ Sous-domaine MJ
   │  ├─ game-dev              [Sonnet] — code HTML vanilla + Phaser TS + SVG bus + déploiement
   │  └─ game-mj-reviewer      [Haiku]  — verdict 5 sections (Bus/UX/Audio/Technique/Vocab) max 5 iter
   │
   └─ Sous-domaine WEXWORLD (⏳ Phase 2)
      ├─ game-wexworld-designer  [Sonnet] — placeholder
      └─ game-wexworld-tester    [Haiku]  — placeholder
```

---

## Tableau qui-fait-quoi-quand-obligé

| Agent | Modèle | Niveau | Mode invocation | Doit répondre quand ? |
|-------|--------|--------|-----------------|------------------------|
| **game-pmo** | Haiku | 1 (parent) | **AUTO** à chaque tour signal JEU | Tout : nouveau MJ, refonte tile, modif rules, décision, dump backlog, fin de session |
| **game-archiviste** | Haiku | 1 (parent) | **AUTO** à chaque tour signal structure | Création/suppression fichier, nouveau dossier, modif INDEX, gabarit, refs cassées, recipe, LESSONS |
| **game-mj-pmo** | Haiku | 2 (enfant) | Sur signal `mj-XX`, `rules.md`/`stack.md`, `web/` par game-pmo | Toute modif touchant les 5 fichiers MJ |
| **game-tile-pmo** | Haiku | 2 (enfant) | Sur signal `tile`, `recipe`, `LimeZu`, `cartography`, `patterns` par game-pmo | Toute modif touchant tile-tools |
| **game-wexworld-pmo** | Haiku | 2 (enfant) | ⏳ Phase 2 | À activer quand WexWorld démarre |
| **game-conseiller** | Opus | 3 | Manuel — question produit/UX/vision | Quand auteur dit "qu'est-ce que t'en penses ?", "comment on aborde X ?", "challenge cette idée" |
| **game-dev** | Sonnet | 4 | Manuel — code à écrire | Implémentation MJ, refacto code, fix bug code |
| **game-tile-simplifier** | Sonnet | 4 | Manuel — début pipeline tile | Photo/description à transformer en ANALYSE structurée |
| **game-tile-designer** | Sonnet | 4 | Manuel — milieu pipeline tile (chaîné depuis simplifier) | ANALYSE → recette Python + PNG render |
| **game-tile-reviewer** | Haiku | 4 | Manuel — fin pipeline tile (chaîné depuis designer) | Verdict PASS/FAIL recette + PNG, max 5 iter |
| **game-mj-reviewer** | Haiku | 4 | Manuel — après code MJ | Verdict PASS/FAIL checklist 5 sections, max 5 iter |

---

## Chaîne de commandement

```
Auteur
  ├──→ game-conseiller   (challenge produit, brainstorm, vision)
  ├──→ game-pmo          (fond : décisions, backlog, sprint-log)
  ├──→ game-archiviste   (forme : dossiers, gabarit, INDEX)
  └──→ game-dev          (code direct, simple modif)

game-pmo (parent)
  ├──→ game-mj-pmo       (sur signal MJ)
  ├──→ game-tile-pmo     (sur signal tile)
  └──→ game-wexworld-pmo (⏳ Phase 2)

game-archiviste (parent)
  └──→ scan transverse FORME (ne touche pas aux fichiers des sous-spé, mais les audite)

game-tile-simplifier → game-tile-designer → game-tile-reviewer   (pipeline 3 étapes tile)

game-dev → game-mj-reviewer   (après livraison code MJ)
```

---

## Mémoires partagées (par agent)

| Fichier | Owner | Contenu | MAJ après |
|---------|-------|---------|-----------|
| `pmo/INVARIANTS.md` | game-pmo | Source de vérité chiffres clés | Changement règle non-négociable ou casting tile |
| `pmo/decisions.md` | game-pmo | Décisions figées + Q-ouvertes | Toute décision avec raison + impact |
| `pmo/sprint-log.md` | game-pmo | Journal sessions | Chaque session datée (Fait/Décisions/État reboot) |
| `pmo/backlog.md` | game-pmo | Tickets EP-xxx + Leçons L-xxx | Mouvement ticket, nouvelle leçon, changelog session |
| `pmo/audit-trail.md` | game-pmo + game-archiviste | Traces audits + cause racine | Chaque audit (PMO ou Archiviste) |
| `memory/state.md` | game-pmo | État déploiement statique | Ajout/retrait MJ, bug critique en cours |
| `memory/rules.md` | game-pmo | Règles UX/péda + designs validés | Nouvelle règle non-négociable validée |
| `memory/stack.md` | game-dev | Stack technique + archi déploiement | Refonte stack |
| `memory/VISION-LONG-TERME.md` | game-conseiller + game-pmo | Vision Phase 2 + roadmap | Inflexion stratégique |
| `web/tile-tools/LESSONS.md` *(skill)* | game-tile-pmo | 30+ leçons tile gravées | Chaque correction tile validée |
| `web/tile-tools/PIPELINE-MEMORY.md` | game-tile-pmo | Frictions F-xxx + Patterns P-xxx | Chaque session pipeline tile |
| `web/PIPELINE-MEMORY-MJ.md` | game-mj-pmo | Leçons mini-jeux gravées | Chaque session MJ |

---

## Workflow type — création d'un nouveau MJ

```
1. Auteur dump idée → game-pmo log dans sprint-log
2. game-conseiller (Opus) challenge si question produit/UX
3. game-dev (Sonnet) implémente le MJ (HTML vanilla + bus-svg.js + sounds.js + tracker.js)
4. game-archiviste (auto) vérifie : préfixe mj-NN, référencé dans web/index.html, busSVG utilisé
5. game-mj-reviewer (Haiku) verdict 5 sections (max 5 iter) :
   - Bus & couleurs : busSVG() utilisé, selectDistinctColors si quiz
   - UX 3.5-4 ans : zones tap 80px+, feedback < 200 ms, zéro pénalité
   - Audio : victory-sounds, AudioContext singleton
   - Technique : code propre, pas de dépendance lourde
   - Vocab & péda : dodo/réparation/terminus si pertinent
6. game-pmo intègre dans sprint-log + backlog + state.md (count MJ +1)
7. game-archiviste vérifie INVARIANTS.md MAJ + LESSONS si nouveau pattern
```

---

## Workflow type — création d'une nouvelle recette tile

```
1. Auteur dump idée (photo/description/croquis)
2. game-tile-simplifier (Sonnet) étape 1/3 → ANALYSE structurée
3. game-tile-designer (Sonnet) étape 2/3 → recette test_<nom>.py + PNG via render.py + BILAN
4. game-tile-reviewer (Haiku) étape 3/3 → verdict PASS/FAIL max 5 iter (cf. LESSONS)
5. game-tile-pmo grave dans LESSONS.md + PIPELINE-MEMORY.md
6. game-pmo intègre synthèse dans sprint-log + backlog
7. game-archiviste vérifie : test_<nom>.py + PNG associé, référencé dans patterns.js/recipes_data.js
```

---

## Réunions / Ateliers

| Atelier | Avec qui | Quand | Fichiers en jeu |
|---------|----------|-------|------------------|
| **Vision produit** | Toi + game-conseiller | Régulier (Phase 2 scoping, refonte) | VISION-LONG-TERME.md, conseiller mémoire |
| **Brainstorm MJ** | Toi + game-conseiller + game-mj-pmo | Quand une idée brute arrive | INBOX (pas encore créé côté Game), backlog |
| **Pipeline tile** | game-tile-{simplifier, designer, reviewer} | Création/refonte recette | recipes/, vocab.py, styles.py |
| **Refonte structure** | game-pmo + game-archiviste | Renommage, fusion, nouveau dossier | INVARIANTS, audit-trail, decisions |
| **Audit régulier** | Auteur invoque /game-pmo-audit + /game-archiviste-audit | Toutes les ~10 sessions OU avant commit important | audit-trail |
| **Rétro session** | game-pmo seul | Fin de chaque session | sprint-log + (decisions/backlog si décisions) |

---

## Commandes utiles

| Commande | Invoque | Cible | Mode |
|----------|---------|-------|------|
| `/game-pmo-audit` | game-pmo | **FOND** (décisions, statuts, cohérence sémantique) | Mode AUDIT 5 sections |
| `/game-archiviste-audit` | game-archiviste | **FORME** (gabarit, refs, orphelins, préfixes) | Mode AUDIT 5 sections |
| `/pmo-challenge` (skill global) | n/a | LARGE (cartographie + obsolescence + simulations) | Audit ponctuel grosse charge |

**Règle d'or** : alterner FORME + FOND, ne pas enchaîner 3 audits forme successifs (apprentissage 2026-05-13 narration).

---

## État actuel (mis à jour 2026-05-13)

- [x] **game-pmo** créé 2026-05-11 (Haiku, AUTO signal JEU)
- [x] **game-archiviste** créé 2026-05-13 (Haiku, AUTO signal structure) — binôme PMO ✅
- [x] **game-conseiller** créé 2026-05-11 (Opus, transverse 3 sous-domaines)
- [x] **game-dev** établi (Sonnet)
- [x] **game-mj-pmo** créé 2026-05-11 (Haiku, sous-spé)
- [x] **game-mj-reviewer** créé 2026-05-11 (Haiku, validateur)
- [x] **game-tile-pmo** créé (Haiku, sous-spé)
- [x] **game-tile-simplifier / designer / reviewer** établis (Sonnet/Sonnet/Haiku)
- [ ] **game-wexworld-pmo** ⏳ Phase 2
- [ ] **game-wexworld-designer / tester** ⏳ Phase 2

**Fichiers PMO créés 2026-05-13** :
- [x] `pmo/INVARIANTS.md` — chiffres clés
- [x] `pmo/decisions.md` — décisions figées + Q-ouvertes
- [x] `pmo/sprint-log.md` — journal sessions
- [x] `pmo/backlog.md` — tickets actifs (déplacé depuis `tasks/`)
- [x] `pmo/audit-trail.md` — traces audits
- [x] `memory/state.md` réduit aux sources statiques uniquement

**Commandes 2026-05-13** :
- [x] `/narration-archiviste-audit` (renommé depuis `/challenge-archiviste`)
- [x] `/narration-pmo-audit` (renommé depuis `/pmo-audit`)
- [x] `/game-pmo-audit` (créé)
- [x] `/game-archiviste-audit` (créé)
