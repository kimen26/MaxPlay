---
description: Audit FOND du pôle NARRATION via narration-pmo (Mode AUDIT 5 sections). Complémentaire à /narration-archiviste-audit (FORME). Vérifie cohérence sémantique : décisions vs INDEX vs Kanban vs prochaines actions. À utiliser en alternance avec /narration-archiviste-audit pour couvrir forme + fond.
---

Tu invoques l'agent `narration-pmo` en **Mode AUDIT** sur l'ensemble du pôle narration.

Le PMO vérifie **le FOND** (décisions, statuts, cohérence sémantique) — complémentaire à `/narration-archiviste-audit` (FORME : préfixes, refs, orphelins).

## Procédure (5 sections obligatoires — depuis `narration-pmo.md` Mode AUDIT)

### 1. Architecture / Découvrabilité
- INDEX racine + sous-INDEX à jour ?
- Fichiers orphelins (créés sans propagation INDEX) ?
- Liens cassés majeurs ?

### 2. Cohérence PROCESS
- 10 étapes alignées partout (vs INVARIANTS) ?
- Templates référencés existent ?
- Agents = owners PROCESS ?
- Préfixes étapes respectés dans stories ?

### 3. État histoires (le fond critique — section qui couvre le trou détecté 2026-05-13)
- **Pour chaque histoire active** : kanban = état réel ?
- **SLA respectés** (3 jours max attente auteur) ?
- **Statuts dans INDEX cohérents** entre eux ? (pmo/INDEX vs INVARIANTS vs stories/INDEX vs kanban de chaque histoire)
- **Prochaine action affichée** dans pmo/INDEX = vraie prochaine action selon le kanban ?
- **Q-ouvertes** dans decisions.md = effectivement non tranchées (pas obsolètes) ?

### 4. Connaissances / Skills
- Skills MaxPlay (audio-direction, voice-design, tiles) à jour avec apprentissages récents ?
- Voice IDs INVARIANTS = état réel ElevenLabs ?
- Lecons-vivantes enrichi après chaque canonisation ?

### 5. Lean / Anti-patterns
- Doublons (2 fichiers qui disent la même chose) ?
- Fichiers obsolètes non archivés ?
- Process implicite non documenté ?
- Décisions tranchées en session non écrites dans `decisions.md` ?

## Livrable attendu

Le PMO produit :
1. Rapport markdown structuré avec **CRITIQUE/HAUTE/MOYENNE/BASSE** par finding
2. **Liste d'actions concrètes** (chemin exact + correctif suggéré)
3. **Croisement avec dernier audit Archiviste** : ce que la forme a raté que le fond attrape (et inversement)
4. Entrée datée dans `pmo/audit-trail.md` préfixée `[PMO MODE AUDIT]`

## Contraintes

- **Lecture seule** par défaut
- Si l'auteur dit `/narration-pmo-audit fix` → le PMO peut corriger les findings BASSE/MOYENNE auto-fixables (MAJ statut INDEX, MAJ prochaine action)
- Pour CRITIQUE/HAUTE → toujours demander validation auteur
- Cite chemins exacts toujours
- Reste factuel

## Quand utiliser cette commande vs /narration-archiviste-audit

| Commande | Cible | Trigger |
|----------|-------|---------|
| `/narration-archiviste-audit` | FORME (préfixes, gabarit, refs, orphelins) | Après refonte structurelle, création de nouveau dossier |
| `/pmo-audit` | FOND (décisions, statuts, cohérence sémantique, SLA) | Après plusieurs sessions, avant un commit/livraison, quand "tout a l'air OK" mais on veut vérifier que les statuts disent la vérité |
| `/pmo-challenge` (skill) | LARGE (cartographie + obsolescence + simulations) | Audit ponctuel grosse charge, avant refonte majeure |

**Règle d'or** : alterner FORME + FOND pour ne pas accumuler de désynchros sémantiques (apprentissage 2026-05-13).
