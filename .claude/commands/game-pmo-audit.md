---
description: Audit FOND du pôle GAME via game-pmo (Mode AUDIT 5 sections). Complémentaire à /game-archiviste-audit (FORME). Vérifie cohérence sémantique : décisions vs INVARIANTS vs state.md vs sprint-log vs prochaines actions. À utiliser en alternance avec /game-archiviste-audit pour couvrir forme + fond côté pôle JEU.
---

Tu invoques l'agent `game-pmo` en **Mode AUDIT** sur l'ensemble du pôle JEU.

Le PMO vérifie **le FOND** (décisions, statuts, cohérence sémantique) — complémentaire à `/game-archiviste-audit` (FORME : préfixes, refs, orphelins).

## Procédure (5 sections obligatoires — depuis `game-pmo.md` Mode AUDIT)

### 1. Architecture / Découvrabilité
- `studio/minijeux/INDEX.md` + sous-INDEX (docs/, memory/, pmo/) à jour ?
- Fichiers orphelins (créés sans propagation INDEX) ?
- Liens cassés majeurs ?

### 2. Cohérence chiffres clés
- `pmo/INVARIANTS.md` ⇄ `memory/state.md` ⇄ `pmo/decisions.md` cohérents entre eux ?
- Count MJ déployés ? (table INVARIANTS = état réel `site/index.html` ?)
- Casting tile (Asphalt 2/8/14/15) ?
- Recettes validées count ?
- Voice IDs (côté Narration uniquement — vérifier qu'aucune ref ne traîne côté Game par erreur)

### 3. État production (le fond critique)
- **`memory/state.md`** reflète vraiment l'état déployé ?
- **Bugs critiques** en cours = vrais bugs (pas faux comme EP-022 qui était résolu) ?
- **Sessions récentes** loguées dans `pmo/sprint-log.md` ?
- **Prochaine action** identifiable depuis sprint-log.md + backlog.md ?

### 4. Connaissances / Skills
- Skills MaxPlay (`~/.claude/skills/maxplay-tiles/LESSONS.md`, `audio-direction-elevenlabs`, etc.) à jour avec apprentissages récents ?
- Les **leçons L-xxx** de `pmo/backlog.md` sont-elles consolidées vers SKILL.md / LESSONS.md ?
- VISION-LONG-TERME.md cohérent avec décisions récentes ?

### 5. Lean / Anti-patterns
- Doublons (2 fichiers qui disent la même chose) ?
- Fichiers obsolètes non archivés ?
- Process implicite non documenté ?
- Décisions tranchées en session non écrites dans `pmo/decisions.md` ?
- **Cohérence sémantique** : la "prochaine action" affichée est-elle la vraie ? (apprentissage 2026-05-13 narration — anti-pattern à éviter)

## Livrable attendu

Le PMO produit :
1. Rapport markdown structuré avec **CRITIQUE/HAUTE/MOYENNE/BASSE** par finding
2. **Liste d'actions concrètes** (chemin exact + correctif suggéré)
3. **Croisement avec dernier audit Archiviste** : ce que la forme a raté que le fond attrape (et inversement)
4. Entrée datée dans `pmo/audit-trail.md` préfixée `[PMO MODE AUDIT]`

## Contraintes

- **Lecture seule** par défaut
- Si l'auteur dit `/game-pmo-audit fix` → le PMO peut corriger les findings BASSE/MOYENNE auto-fixables (MAJ INVARIANTS si chiffre changé, MAJ statut state.md, MAJ prochaine action)
- Pour CRITIQUE/HAUTE → toujours demander validation auteur
- Cite chemins exacts toujours
- Reste factuel

## Quand utiliser cette commande vs /game-archiviste-audit

| Commande | Cible | Trigger |
|----------|-------|---------|
| `/game-archiviste-audit` | FORME (gabarit, refs, orphelins, préfixes) | Après création MJ/recette, modif structurelle, doute sur fichier orphelin |
| `/game-pmo-audit` | FOND (décisions, statuts, cohérence sémantique, INVARIANTS) | Après plusieurs sessions, avant un commit/livraison, quand "tout a l'air OK" mais on veut vérifier que les statuts disent la vérité |
| `/pmo-challenge` (skill global) | LARGE (cartographie + obsolescence + simulations) | Audit ponctuel grosse charge, avant refonte majeure |

**Règle d'or** : alterner FORME + FOND pour ne pas accumuler de désynchros sémantiques (apprentissage 2026-05-13 narration).
