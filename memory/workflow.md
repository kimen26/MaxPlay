---
name: Workflow session MaxPlay
description: Process de travail session par session — plan, dev, verify, commit, docs
type: project
---

## Workflow session

```
1. Plan mode      → toute tâche 3+ étapes ou décision archi
2. TodoWrite      → tracker dès 2+ sous-étapes
3. Dev            → subagents pour explorer/analyser
4. Verify         → prouver que ça marche avant de cocher
5. Commit         → message conventionnel (feat/fix/refactor...)
6. Docs           → BACKLOG.md + MEMORY.md à jour = session terminée
```

## Doc update protocol (automatique)

| Moment | Action |
|--------|--------|
| Après ExitPlanMode | Ajouter tâches dans `tasks/BACKLOG.md` |
| Avant dev | Vérifier BACKLOG.md + TodoWrite alignés |
| Après étape validée | Cocher BACKLOG.md + maj MEMORY.md si décision structurante |
| Fin de session | BACKLOG.md (épics, leçons) + memory/ (état, décisions) |

> Règle : si les docs ne sont pas à jour, la session n'est pas terminée.

## Principes

- **Simplicity First** : impact minimal, changement aussi simple que possible
- **No Laziness** : root cause, pas le symptôme. Standards senior.
- **Minimal Impact** : toucher uniquement ce qui est nécessaire
- **Verification Before Done** : "un senior dev validerait ça ?"
- **Demand Elegance** : pause sur les non-triviaux — "y a-t-il plus élégant ?"
- **Autonomous Bug Fixing** : bug identifié = bug corrigé, sans demander

## Self-improvement

- Après toute correction utilisateur → leçon dans `tasks/BACKLOG.md`
- Écrire la règle pour ne pas reproduire l'erreur
- Relire les leçons en début de session
