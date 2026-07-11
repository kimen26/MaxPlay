# Kanban — STORY-008 la-pomme-de-pin-qui-revient

> **Source de vérité de l'étape en cours.** Lu en premier par tout agent qui reprend l'histoire.
> Mis à jour par le **owner de l'étape en cours** dès qu'il termine son livrable.
> PROCESS = 11 étapes (0 à 10). Étape 2 = Brainstorm (boss + équipe) depuis 2026-05-15.

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

## Étapes (10 — préfixées par numéro)

| # | Étape | Owner | Statut | Date | Lien livrable |
|---|---|---|---|---|---|
| 0 | Idée | Auteur | ✅ | 2026-07-11 | GO autonome Papa Yann |
| 1 | Pitch + Plan | Conseiller | ✅ | 2026-07-11 | [`1-pitch-plan.md`](1-pitch-plan.md) |
| 3 | Briefs | Directeur | ⚪ | — | [`3-briefs/`](3-briefs/) |
| 4 | 14 Versions writers | 14 Writers | ⚪ | — | [`4-versions-writers/`](4-versions-writers/) |
| 5 | Panel 20 lecteurs | 20 Témoins | ⚪ | — | [`5-lecteurs-temoins/`](5-lecteurs-temoins/) |
| 6 | Sélection | Directeur | ⚪ | — | [`6-selection.md`](6-selection.md) |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`8-gatekeeper-verdict.md`](8-gatekeeper-verdict.md) |
| 9 | Re-relecture rewrite | Panel 20 | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

> Étape 2 supprimée 2026-05-12 (fusion avec étape 1 — l'Architecte est en standby).

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch+Plan** validé : 2026-07-11 (GO autonome Papa Yann)
- [ ] **Étape 6 — Sélection** validée : ___ (date)
- [ ] **Étape 10 — Canon finalisé** validé : ___ (date)

**SLA :** 3 jours par validation. Au-delà → 🔴 BLOQUÉ + log auto `pmo/sprint-log.md`.

---

## Boucles & itérations

> *Trace des retours en arrière (sélection v2, rewrite refusé, etc.). Plafonds dans `equipe/PROCESS.md`.*

| Date | Étape | De → vers | Raison |
|---|---|---|---|
| | | | |

---

## Notes & blocages

> *Notes libres du owner courant. Si 🔴 BLOQUÉ, expliquer ici.*

- **2026-07-11 — Arbitrage orchestrateur (objet titre)** : objet retenu = **pomme de pin**, PAS caillou. Raison : le caillou est déjà l'objet titre de **STORY-003** (« Le caillou trop bien rangé »), même **arc-1-objet-décor** → doublon évité. Le geste (lancer/rouler/revenir), le Ten (la pente ramène) et le duo (Dadou+Nono) sont distincts de 003 (empiler/aligner, retourner la face, Dadou+Melki).
- **2026-07-11 — Étape 1 livrée** par narration-conseiller (GO autonome Papa Yann). Prochaine étape : **2 — Brainstorm** (boss + équipe).
- **⚠️ Alerte casting genre** : arc-1 enchaîne 003 (2M) et 008 (2M), Dadou dans les deux → prioriser une paire F en duo principal sur STORY-009.

---

## Reprise après reboot

Procédure :
1. Lire ce fichier (statut étape en cours)
2. Lire [`README.md`](README.md) (état global histoire)
3. Lire le dernier livrable produit (selon étape ci-dessus)
4. Lire `narration/pmo/INVARIANTS.md` + `pmo/decisions.md` (règles tranchées + chiffres clés)
5. Reprendre selon ce qui manque
