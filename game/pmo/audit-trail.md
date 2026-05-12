# Audit Trail — Pôle JEU

> Trace des audits PMO + analyses cause racine. À lire pour comprendre **pourquoi** une dette de coordination s'accumule.
>
> Équivalent côté Narration : [`../../narration/pmo/audit-trail.md`](../../narration/pmo/audit-trail.md).
> Créé 2026-05-13 lors de l'harmonisation Game ↔ Narration (Phase A2).

---

## 2026-05-13 — Harmonisation Game ↔ Narration

**Trigger** : auteur demande symétrie pôle JEU avec pôle NARRATION (qui a été refondue 2026-05-12 : PMO proactif + Archiviste maillon central + INVARIANTS source de vérité + audit-trail traçabilité).

### Diagnostic comparatif Game vs Narration

**Trous côté Game identifiés (audit Explore)** :
1. ❌ Pas d'**Archiviste** structure proactif (narration en a un : `narration-archiviste` Haiku AUTO)
2. ❌ Pas d'**INVARIANTS.md** source de vérité chiffres clés
3. ❌ Pas d'**audit-trail.md** traçabilité
4. ❌ Pas de séparation **decisions / sprint-log** (tout dans `state.md`)
5. ❌ Pas de commandes `/game-pmo-audit` ni `/game-archiviste-audit`

**Symétries OK conservées** :
- ✅ PMO niveau pôle (Haiku, AUTO) : `game-pmo` ≡ `narration-pmo`
- ✅ Conseiller créatif (Opus) : `game-conseiller` ≡ `narration-conseiller`
- ✅ Validateurs Haiku : `game-mj-reviewer` + `game-tile-reviewer` ≡ `narration-gatekeeper`

### Actions appliquées 2026-05-13 (mode militaire full)

**Phase A — Fichiers PMO** :
1. ✅ `game/pmo/INVARIANTS.md` créé (chiffres clés table de vérité)
2. ✅ `game/pmo/audit-trail.md` créé (ce fichier)
3. ✅ `game/pmo/decisions.md` créé (extrait décisions figées de state.md)
4. ✅ `game/pmo/sprint-log.md` créé (extrait sessions chronologiques de state.md)
5. ✅ `game/pmo/backlog.md` (déplacé depuis `game/tasks/BACKLOG.md`)
6. ✅ `game/memory/state.md` réduit aux sources de vérité statiques uniquement

**Phase B — Archiviste Game** :
7. ✅ `.claude/agents/game-archiviste.md` créé (calqué narration-archiviste, scope MJ + tile + structure)
8. ✅ `.claude/agents/game-pmo.md` enrichi (binôme avec game-archiviste)

**Phase C — Préfixage commandes (strict net, pas d'alias)** :
9. ✅ `/challenge-archiviste` → `/narration-archiviste-audit`
10. ✅ `/pmo-audit` → `/narration-pmo-audit`
11. ✅ `/game-pmo-audit` créé
12. ✅ `/game-archiviste-audit` créé

**Phase D — INDEX et docs** :
13. ✅ `game/INDEX.md` refondu (arborescence pmo/, équipe complète)
14. ✅ `game/EQUIPE.md` créé (équivalent `narration/equipe/ORGANIGRAMME.md`)
15. ✅ `CLAUDE.md` racine MAJ (section Game enrichie comme Narration)

**Reste en queue** :
- 6 findings self-challenge Narration (gravés dans `narration/pmo/decisions.md` § Questions ouvertes) :
  - Suppression vs archive `narration-architecte.md`
  - Scission `narration/pmo/audit-trail.md` (~450 lignes)
  - Scission `narration/pmo/decisions.md` (~1265 lignes)
  - Gestion `memoire-architecte.md` non maintenue
  - Conseiller : matière statique gravée vs pointeur ?
  - Auto-déclencher `/narration-pmo-audit` proactivement ?

### Apprentissages méta

1. **Symétrie inter-pôles** = bonne pratique. Quand 2 domaines ont des PMO indépendants, les structurer pareil simplifie le mental model.
2. **L'Archiviste détecte des bugs structurels qu'aucun autre agent n'attrape** (apprentissage narration 2026-05-12, replicable côté Game).
3. **Préfixage strict `<pôle>-<agent>-<action>`** > noms courts. Évite la confusion "quel pôle ?".
4. **Audit fond ⇄ audit forme** : 2 modes complémentaires nécessaires. Côté Narration on a appris ça à la dure (bug Q-ouvertes STORY-002). Côté Game on intègre le pattern dès le départ.

---

## Prochain audit

Recommandé après :
- Création MJ-21+ ou refonte structurelle pôle JEU
- Phase 2 WexWorld scoping
- Toute refonte de gabarit / pipeline
