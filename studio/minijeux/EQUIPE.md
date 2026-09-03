# Organigramme — Équipe Pôle JEU MaxPlay

> **Ce fichier est la référence technique complète de l'équipe Game.**
> **Pour la lecture quotidienne**, voir [`INDEX.md`](INDEX.md).
> **Pour les chiffres clés**, voir [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md).
> Mis à jour 2026-07-19 (**fusion gouvernance** : game-archiviste + game-mj-pmo + game-tile-pmo fondus dans `game-pmo` unifié Sonnet ; capture immédiate des idées par le main agent ; hook Stop `pmo-check` 3 pôles).
>
> Équivalent côté Narration : [`../studio/narration/equipe/ORGANIGRAMME.md`](../narration/equipe/ORGANIGRAMME.md).

---

## Vue d'ensemble — 12 agents actifs (+ 3 Phase 2)

> MAJ 2026-07-15 : ajout `game-test-audio` + `game-test-secu` (batterie de test « vitesse complète », voir [`../../.claude/rules/mini-jeux.md`](../../.claude/rules/mini-jeux.md) § Batterie 2 vitesses). Menu = source `site/js/catalog.js` (plus `site/index.html` en dur).

```
┌─ AUTEUR (Papa Yann)
│
├─ NIVEAU 1 : GREFFIER UNIFIÉ (fusion 2026-07-19)
│  └─ game-pmo            [Sonnet · clôture/audit/RECHERCHE] — FOND (INVARIANTS, decisions, sprint-log, backlog)
│                          + FORME (dossiers, gabarit, refs, orphelins) + domaines tile & mj (LESSONS, rules, figées)
│                          NB : la capture immédiate des idées = main agent, dans le tour (hook Stop pmo-check l'enforce)
│
├─ NIVEAU 3 : CONSEILLER (manuel, sur question produit)
│  └─ game-conseiller     [Opus] — binôme créatif transverse 3 sous-domaines
│
└─ NIVEAU 4 : SACHANTS SPÉCIALISÉS (manuel, sur demande)
   ├─ Sous-domaine TILE
   │  └─ game-tile [Sonnet] — 3 modes fusionnés (2026-09-03) : ANALYSE (image/desc → ANALYSE), RECETTE (ANALYSE → recette + PNG + BILAN), REVUE (verdict PASS/FAIL max 5 iter)
   │
   ├─ Sous-domaine MJ
   │  ├─ game-dev              [Sonnet] — code HTML vanilla + Phaser TS + SVG bus + déploiement
   │  ├─ game-mj-reviewer      [Haiku]  — verdict 5 sections (Bus/UX/Audio/Technique/Vocab) max 5 iter
   │  ├─ game-test-audio       [Haiku]  — audit AUDIO (exclusivité voix, fallback TTS, padding, démarrage)
   │  └─ game-test-secu        [Haiku]  — audit SÉCURITÉ (XSS, secrets, inputs) — cf. batterie 2 vitesses rules/mini-jeux.md
   │
   └─ Sous-domaine WEXWORLD (⏳ Phase 2)
      ├─ game-wexworld-designer  [Sonnet] — placeholder
      └─ game-wexworld-tester    [Haiku]  — placeholder
```

---

## Tableau qui-fait-quoi-quand-obligé

| Agent | Modèle | Niveau | Mode invocation | Doit répondre quand ? |
|-------|--------|--------|-----------------|------------------------|
| **game-pmo** (unifié) | Sonnet | 1 | Clôture de session, `/game-pmo-audit`, mode RECHERCHE | FOND + FORME + domaines tile/mj — un seul garant depuis 2026-07-19 |
| **game-conseiller** | Opus | 3 | Manuel — question produit/UX/vision | Quand auteur dit "qu'est-ce que t'en penses ?", "comment on aborde X ?", "challenge cette idée" |
| **game-dev** | Sonnet | 4 | Manuel — code à écrire | Implémentation MJ, refacto code, fix bug code |
| **game-tile** (3 modes) | Sonnet | 4 | Manuel — pipeline tile, préciser le mode | ANALYSE (photo/desc → ANALYSE) → RECETTE (ANALYSE → recette Python + PNG) → REVUE (verdict PASS/FAIL, max 5 iter) |
| **game-mj-reviewer** | Haiku | 4 | Manuel — après code MJ | Verdict PASS/FAIL checklist 5 sections, max 5 iter |
| **game-test-audio** | Haiku | 4 | Manuel — jeu avec MP3+TTS | Audit exclusivité voix / fallback TTS / padding SFX / démarrage muet |
| **game-test-secu** | Haiku | 4 | Manuel — saisie/cloud/release | Audit XSS / secrets / inputs non validés, verdict PASS/FAIL |

---

## Chaîne de commandement

```
Auteur
  ├──→ game-conseiller   (challenge produit, brainstorm, vision — à consulter d'office sur brainstorm)
  ├──→ game-pmo unifié   (clôture : fond + forme + domaines · audit · recherche)
  └──→ game-dev          (code direct, simple modif)

Main agent (capture immédiate, dans le tour)
  └──→ 1 ligne backlog par idée/décision + figees/mj-XX.md sur figeage — hook Stop pmo-check l'enforce

game-tile mode ANALYSE → game-tile mode RECETTE → game-tile mode REVUE   (pipeline 3 modes tile, fusionné 2026-09-03)

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
| `pmo/audit-trail.md` | game-pmo unifié | Traces audits + cause racine | Chaque audit (PMO ou Archiviste) |
| `memory/state.md` | game-pmo | État déploiement statique | Ajout/retrait MJ, bug critique en cours |
| `memory/rules.md` | game-pmo | Règles UX/péda + designs validés | Nouvelle règle non-négociable validée |
| `memory/stack.md` | game-dev | Stack technique + archi déploiement | Refonte stack |
| `memory/VISION-LONG-TERME.md` | game-conseiller + game-pmo | Vision Phase 2 + roadmap | Inflexion stratégique |
| `site/tile-tools/LESSONS.md` *(skill)* | main agent / game-pmo | 30+ leçons tile gravées | Chaque correction tile validée |
| `site/tile-tools/PIPELINE-MEMORY.md` | main agent / game-pmo | Frictions F-xxx + Patterns P-xxx | Chaque session pipeline tile |
| `site/PIPELINE-MEMORY-MJ.md` | main agent / game-pmo | Leçons mini-jeux gravées | Chaque session MJ |

---

## Workflow type — création d'un nouveau MJ

```
1. Auteur dump idée → game-pmo log dans sprint-log
2. game-conseiller (Opus) challenge si question produit/UX
3. game-dev (Sonnet) implémente le MJ (HTML vanilla + bus-svg.js + sounds.js + tracker.js)
4. game-pmo (clôture) vérifie : préfixe mj-NN, référencé dans site/index.html, busSVG utilisé
5. game-mj-reviewer (Haiku) verdict 5 sections (max 5 iter) :
   - Bus & couleurs : busSVG() utilisé, selectDistinctColors si quiz
   - UX 3.5-4 ans : zones tap 80px+, feedback < 200 ms, zéro pénalité
   - Audio : victory-sounds, AudioContext singleton
   - Technique : code propre, pas de dépendance lourde
   - Vocab & péda : dodo/réparation/terminus si pertinent
6. game-pmo intègre dans sprint-log + backlog + state.md (count MJ +1)
7. game-pmo vérifie INVARIANTS.md MAJ + LESSONS si nouveau pattern
```

---

## Workflow type — création d'une nouvelle recette tile

```
1. Auteur dump idée (photo/description/croquis)
2. game-tile mode ANALYSE (Sonnet) → ANALYSE structurée
3. game-tile mode RECETTE (Sonnet) → recette test_<nom>.py + PNG via render.py + BILAN
4. game-tile mode REVUE (Sonnet) → verdict PASS/FAIL max 5 iter (cf. LESSONS)
5. graver LESSONS.md + PIPELINE-MEMORY.md (main agent, dans le tour)
6. game-pmo intègre synthèse dans sprint-log + backlog
7. game-pmo vérifie : test_<nom>.py + PNG associé, référencé dans patterns.js/recipes_data.js
```

---

## Réunions / Ateliers

| Atelier | Avec qui | Quand | Fichiers en jeu |
|---------|----------|-------|------------------|
| **Vision produit** | Toi + game-conseiller | Régulier (Phase 2 scoping, refonte) | VISION-LONG-TERME.md, conseiller mémoire |
| **Brainstorm MJ** | Toi + game-conseiller (+ capture immédiate backlog) | Quand une idée brute arrive | INBOX (pas encore créé côté Game), backlog |
| **Pipeline tile** | game-tile-{simplifier, designer, reviewer} | Création/refonte recette | recipes/, vocab.py, styles.py |
| **Refonte structure** | game-pmo unifié | Renommage, fusion, nouveau dossier | INVARIANTS, audit-trail, decisions |
| **Audit régulier** | Auteur invoque /game-pmo-audit (FOND+FORME) | Toutes les ~10 sessions OU avant commit important | audit-trail |
| **Rétro session** | game-pmo seul | Fin de chaque session | sprint-log + (decisions/backlog si décisions) |

---

## Commandes utiles

| Commande | Invoque | Cible | Mode |
|----------|---------|-------|------|
| `/game-pmo-audit` | game-pmo | **FOND** (décisions, statuts, cohérence sémantique) | Mode AUDIT 5 sections |
| `/pmo-challenge` (skill global) | n/a | LARGE (cartographie + obsolescence + simulations) | Audit ponctuel grosse charge |

**Règle d'or** : alterner FORME + FOND, ne pas enchaîner 3 audits forme successifs (apprentissage 2026-05-13 narration).

---

## État actuel (mis à jour 2026-05-13)

- [x] **game-pmo** créé 2026-05-11 (Haiku, AUTO signal JEU)
- [x] **game-archiviste** créé 2026-05-13, **fusionné dans game-pmo le 2026-07-19** ✅
- [x] **game-conseiller** créé 2026-05-11 (Opus, transverse 3 sous-domaines)
- [x] **game-dev** établi (Sonnet)
- [x] **game-mj-pmo** créé 2026-05-11 (Haiku, sous-spé)
- [x] **game-mj-reviewer** créé 2026-05-11 (Haiku, validateur)
- [x] **game-tile-pmo** créé (Haiku, sous-spé)
- [x] **game-tile-simplifier / designer / reviewer** établis (Sonnet/Sonnet/Haiku), **fusionnés en `game-tile` à 3 modes le 2026-09-03** (HO-G12) — fichiers d'origine dans `_archive/agents-2026-09-03/`
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
