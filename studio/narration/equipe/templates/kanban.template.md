# Kanban — STORY-NNN <slug>

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
| 0 | Idée | Auteur | ⚪ | — | INBOX section |
| 1 | Pitch | Conseiller | ⚪ | — | [`pitch.md`](pitch.md) |
| 2 | Plan | Architecte | ⚪ | — | [`plan-histoire.md`](plan-histoire.md) |
| 3 | Briefs | Directeur | ⚪ | — | [`briefs/`](briefs/) |
| 4 | Versions writers | 8 Writers | ⚪ | — | [`versions-writers/`](versions-writers/) |
| 5 | Lecteurs témoins | 4 Témoins | ⚪ | — | [`lecteurs-temoins/`](lecteurs-temoins/) |
| 6 | Sélection | Directeur | ⚪ | — | [`selection.md`](selection.md) |
| 7 | Rewrite | Directeur | ⚪ | — | [`rewrite/v1.md`](rewrite/v1.md) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`gatekeeper-verdict.md`](gatekeeper-verdict.md) |
| 9 | Canon | Directeur + PMO | ⚪ | — | [`texte.md`](texte.md) |

---

## Validations auteur (3 obligatoires)

- [ ] **Étape 1 — Pitch** validé : ___ (date)
- [ ] **Étape 6 — Sélection** validée : ___ (date)
- [ ] **Étape 9 — Version finale** validée : ___ (date)

**SLA :** 3 jours par validation. Au-delà → 🔴 BLOQUÉ + log auto `memory/MEMORY.md`.

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
4. Lire `memory/DECISIONS.md` (règles tranchées récentes)
5. Reprendre selon ce qui manque
