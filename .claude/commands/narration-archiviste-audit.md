---
description: Audit structurel du pôle NARRATION via l'Archiviste (FORME) — vérifie gabarit dossiers stories, préfixes étapes, refs cassées, fichiers orphelins, cohérence sémantique Kanban⇄INDEX. Complémentaire à /narration-pmo-audit (FOND). Communique findings au narration-pmo.
---

Tu invoques l'agent `narration-archiviste` en **mode AUDIT** sur l'ensemble du pôle narration.

L'Archiviste vérifie **la structure** (équivalent du PMO côté forme) :

## Procédure (4 sections obligatoires)

### 1. Préfixes étapes (depuis refonte 2026-05-12)
- Tous les dossiers `stories/<NNN>/` respectent-ils la convention de préfixage ?
- Fichiers attendus : `1-pitch-plan.md`, `3-briefs/`, `4-versions-writers/`, `5-lecteurs-temoins/`, `6-selection.md`, `7-rewrite/`, `8-gatekeeper-verdict.md`, `9-relecture-rewrite/`, `10-texte.md`
- Fichiers transverses sans préfixe : `README.md`, `kanban.md`

### 2. Gabarit respecté
- Tous les dossiers `stories/<NNN>/` correspondent-ils à `stories/_gabarit/` ?
- Aucun fichier prématuré (ex: `10-texte.md` créé avant l'étape 10)
- Aucun fichier interdit (ex: `3-briefs/README.md`, `3-briefs/SYNTHESE-BRIEFS.md`)

### 3. Refs cassées
- Tous les liens markdown `[texte](chemin)` dans `studio/narration/` et `.claude/agents/narration-*.md` pointent-ils vers des fichiers existants ?
- Cas typiques à grep : `workshop/`, `patte-john.md`, `ultime_debrief.md`, agents supprimés/renommés

### 4. Fichiers orphelins
- Chaque fichier `.md` dans `studio/narration/` est-il référencé par au moins un INDEX ou un autre fichier ?
- Liste les orphelins suspects

## Livrable attendu

L'Archiviste produit :
1. Rapport markdown structuré avec **CRITIQUE/HAUTE/MOYENNE/BASSE** par finding
2. **Liste d'actions concrètes** (chemin exact + correctif suggéré)
3. **Ping `narration-pmo`** si action de fond nécessaire (logged dans `pmo/sprint-log.md` préfixe `[ARCHIVISTE]`)
4. Entrée datée dans `pmo/audit-trail.md`

## Contraintes

- **Lecture seule** par défaut (l'audit ne modifie rien)
- Si l'auteur dit `/narration-archiviste-audit fix` → l'Archiviste peut corriger les findings BASSE/MOYENNE auto-fixables (renommer préfixe, supprimer doublon évident)
- Pour CRITIQUE/HAUTE → toujours demander validation auteur
- Cite chemins exacts toujours
- Reste factuel
