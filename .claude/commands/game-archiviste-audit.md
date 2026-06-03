---
description: Audit structurel du pôle GAME via l'Archiviste (FORME) — vérifie conventions de nommage (mj-NN.html, test_*.py), refs cassées, fichiers orphelins, gabarit tile-tools + MJ. Complémentaire à /game-pmo-audit (FOND). Communique findings au game-pmo.
---

Tu invoques l'agent `game-archiviste` en **mode AUDIT** sur l'ensemble du pôle JEU.

L'Archiviste vérifie **la structure** (équivalent du PMO côté forme) :

## Procédure (5 sections obligatoires)

### 1. Préfixes et conventions de nommage
- Tous les MJ respectent `mj-NN.html` (NN = 2 chiffres) ?
- Toutes les recettes tile respectent `test_<nom>.py` ?
- Toutes les recettes ont leur PNG associé ?
- Les scripts respectent leur convention (render.py, render_*.py, build_*.py, compare_*.py) ?

### 2. Gabarit respecté
- Structure `studio/minijeux/` conforme : `docs/`, `memory/`, `pmo/`, `tasks/` (stub redirection), `inbox/`, `tests/` ? (⚠️ le **code** est déployé dans `site/` ; le **Phaser** est dans `studio/max-adventure/` — tous deux HORS du dossier pôle depuis la migration 2026-06-04)
- `studio/minijeux/pmo/` contient bien les 5 fichiers attendus : INVARIANTS, decisions, sprint-log, backlog, audit-trail ?
- Aucun fichier prématuré dans les sous-dossiers ?
- Pas de fichiers interdits dans tile-tools/ (cartography.json doit rester `_DEPRECATED`) ?

### 3. Refs cassées
- Tous les liens markdown `[texte](chemin)` dans `studio/minijeux/**/*.md` pointent vers des fichiers existants ?
- Tous les agents `.claude/agents/game-*.md` référencent-ils des chemins valides ?
- Les recettes Python ne référencent-elles que `vocab.py` (source unique) et pas `cartography.json` deprecated ?
- `studio/minijeux/tasks/BACKLOG.md` → `studio/minijeux/pmo/backlog.md` (stub redirection présent ?)

### 4. Fichiers orphelins
- Chaque fichier `.md` dans `studio/minijeux/` est-il référencé par au moins un INDEX ou un autre fichier ?
- Chaque recette `test_*.py` est-elle référencée par `patterns.js` / `recipes_data.js` ou un INDEX ?
- Chaque MJ `mj-XX.html` (dans `site/`) est-il référencé par `site/index.html` (sauf si retiré du menu volontairement) ?

### 5. Cohérence sémantique (apprentissage 2026-05-13 narration)
- Le count MJ déployés dans `INVARIANTS.md` ⇄ `state.md` ⇄ `site/index.html` est-il cohérent ?
- Le casting tile (variation 2/8/14/15) est-il cohérent dans `INVARIANTS.md` ⇄ `memory/rules.md` ⇄ `~/.claude/skills/maxplay-tiles/SKILL.md` ?
- La "prochaine action" affichée dans `pmo/INDEX.md` (si existe) ou `state.md` est-elle la vraie prochaine action selon le sprint-log + backlog ?

## Livrable attendu

L'Archiviste produit :
1. Rapport markdown structuré avec **CRITIQUE/HAUTE/MOYENNE/BASSE** par finding
2. **Liste d'actions concrètes** (chemin exact + correctif suggéré)
3. **Ping `game-pmo`** si action de fond nécessaire (logged dans `pmo/sprint-log.md` préfixe `[ARCHIVISTE]`)
4. Entrée datée dans `pmo/audit-trail.md`

## Contraintes

- **Lecture seule** par défaut
- Si l'auteur dit `/game-archiviste-audit fix` → l'Archiviste peut corriger les findings BASSE/MOYENNE auto-fixables (renommer, supprimer doublon évident)
- Pour CRITIQUE/HAUTE → toujours demander validation auteur
- Cite chemins exacts toujours
- Reste factuel

## Quand utiliser cette commande vs /game-pmo-audit

| Commande | Cible | Trigger |
|----------|-------|---------|
| `/game-archiviste-audit` | FORME (gabarit, refs, orphelins, préfixes) | Après création MJ/recette, modif structurelle, doute sur fichier orphelin |
| `/game-pmo-audit` | FOND (décisions, statuts, cohérence sémantique, INVARIANTS) | Après plusieurs sessions, avant un commit/livraison |
| `/pmo-challenge` (skill global) | LARGE (cartographie + obsolescence + simulations) | Audit ponctuel grosse charge, avant refonte majeure |

**Règle d'or** : alterner FORME + FOND pour ne pas accumuler de désynchros sémantiques.
