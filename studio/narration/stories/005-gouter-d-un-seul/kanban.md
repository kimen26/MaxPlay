# Kanban — STORY-005 le-gouter-d-un-seul

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
| 0 | Idée | Auteur | ✅ | 2026-07-10 | INBOX section datée |
| 1 | Pitch + Plan | Conseiller | ✅ | 2026-07-10 | [`1-pitch-plan.md`](1-pitch-plan.md) |
| 2B | Brainstorm équipe | Kimi+DeepSeek+Grok | ✅ | 2026-07-10 | [`2-brainstorm-equipe.md`](2-brainstorm-equipe.md) |
| 3 | Briefs | Directeur | ✅ | 2026-07-11 | [`3-briefs/`](3-briefs/) |
| 4 | 14 Versions writers | 14 Writers | ✅ **14/14** | 2026-07-11 | [`4-versions-writers/`](4-versions-writers/) — vague 1 complète (6 Claude agents + kimi-reco-guide agent + 7 CLI). 2 Haiku régénérés (282/308 → 472/477). Écarts résiduels acceptés : deepseek-reco 333 (3 essais, instable temp 1.5) · kimi-k26-instant 373 · grok-def ~406/reco 434 OK. kimi-payant ×2 récupérés en séquentiel (429 concurrence orga 3). Prochaine étape 5 : lecture annotée Papa Yann (après 002 v6) + panel v2. |
| 5 | Panel 12 calls (DEC-PANEL-V2) | Panel v2 | ✅ **12/12** | 2026-07-11 | [`5-synthese-lecteurs.md`](5-synthese-lecteurs.md) — synthèse produite · ⚠️ deepseek-reco jugée CORROMPUE = hors concours · lecture annotée Papa Yann ⏳ |
| 6 | Sélection | Directeur | ⚪ | — | [`6-selection.md`](6-selection.md) |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`8-gatekeeper-verdict.md`](8-gatekeeper-verdict.md) |
| 9 | Re-relecture rewrite | Panel 12 (même panel qu'étape 5) | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

> Étape 2 supprimée 2026-05-12 (fusion avec étape 1 — l'Architecte est en standby).

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch+Plan** validé : GO Papa Yann 2026-07-10 (sujet + trio validés)
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

---

## Reprise après reboot

Procédure :
1. Lire ce fichier (statut étape en cours)
2. Lire [`README.md`](README.md) (état global histoire)
3. Lire le dernier livrable produit (selon étape ci-dessus)
4. Lire `narration/pmo/INVARIANTS.md` + `pmo/decisions.md` (règles tranchées + chiffres clés)
5. Reprendre selon ce qui manque
