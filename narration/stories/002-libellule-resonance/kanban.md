# Kanban — STORY-002 libellule-resonance

> **Source de vérité de l'étape en cours.** Lu en premier par tout agent qui reprend l'histoire.
> Mis à jour par le **owner de l'étape en cours** dès qu'il termine son livrable.

---

## Légende

| Symbole | Signification |
|---|---|
| ⚪ | Pas commencé |
| 🟢 | En cours (équipe travaille) |
| ⏳ | En attente auteur (validation) |
| ✅ | Terminé (livrable produit + critères PASS validés) |
| ❌ | Refusé (retour itération) |
| 🔴 | BLOQUÉ (SLA dépassé ou problème) |

---

## Étapes

| # | Étape | Owner | Statut | Date | Lien livrable |
|---|---|---|---|---|---|
| 0 | Idée (brainstorm) | Auteur | ✅ | 2026-05-11 | Sprint-log: Wex + Polo + Nono · Libellule · Étang amont · Résonance |
| 1 | Pitch | Conseiller | ✅ | 2026-05-11 | [`pitch.md`](pitch.md) |
| 2 | Plan | Architecte | ✅ | 2026-05-11 | [`plan-histoire.md`](plan-histoire.md) |
| 3 | Briefs | Directeur | ✅ | 2026-05-11 | [`briefs/`](briefs/) + [`briefs/SYNTHESE-BRIEFS.md`](briefs/SYNTHESE-BRIEFS.md) |
| 4 | 10 Versions writers | 10 Writers | ⚪ | — | [`versions-writers/`](versions-writers/) |
| 5 | Panel 6 lecteurs (transitoire 002, panel 20 dès 003) | 6 Témoins | ⚪ | — | [`lecteurs-temoins/`](lecteurs-temoins/) |
| 6 | Sélection | Directeur | ⚪ | — | [`selection.md`](selection.md) |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`rewrite/v1.md`](rewrite/v1.md) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`gatekeeper-verdict.md`](gatekeeper-verdict.md) |
| 9 | Re-relecture (panel 6 transitoire) | Directeur | ⚪ | — | [`relecture-rewrite/`](relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`texte.md`](texte.md) |

---

## Validations auteur (3 obligatoires)

- [ ] **Étape 1 — Pitch** validé : ___ (date)
- [ ] **Étape 6 — Sélection** validée : ___ (date)
- [ ] **Étape 10 — Canon finalisé** validé : ___ (date)

**SLA :** 3 jours par validation. Au-delà → 🔴 BLOQUÉ + log auto `pmo/sprint-log.md`.

---

## Boucles & itérations

> *Trace des retours en arrière (sélection v2, Architecte v2, etc.). Plafonds dans `equipe/PROCESS.md`.*

| Date | Étape | De → vers | Raison |
|---|---|---|---|
| | | | |

---

## Notes & blocages

> *Notes libres du owner courant. Si 🔴 BLOQUÉ, expliquer ici.*

---

## Reprise après reboot

Procédure :
1. Lire ce fichier (statut étape en cours)
2. Lire [`README.md`](README.md) (état global histoire)
3. Lire le dernier livrable produit (selon étape ci-dessus)
4. Lire `pmo/decisions.md` (règles tranchées récentes)
5. Reprendre selon ce qui manque
