# Kanban — STORY-004 La flaque-miroir

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
| 0 | Idée | Auteur | ✅ | 2026-07-10 | INBOX (GO Papa Yann — sujet + trio validés) |
| 1 | Pitch + Plan | Conseiller | ✅ | 2026-07-10 | [`1-pitch-plan.md`](1-pitch-plan.md) — VALIDÉ AUTEUR |
| 2B | Brainstorm équipe (matière brute 3 LLMs) | Kimi + DeepSeek + Grok + Conseiller | ✅ | 2026-07-10 | matière brute briefs (Kimi + DeepSeek + Grok) |
| 3 | Briefs | Directeur | ✅ | 2026-07-11 | [`3-briefs/`](3-briefs/) — brief-personnages + brief-histoire + micro-briefs |
| 4 | 14 Versions writers | 14 Writers | ✅ **14/14** | 2026-07-11 | [`4-versions-writers/`](4-versions-writers/) — vague 1 complète (6 Claude agents + kimi-reco-guide agent + 7 CLI). Écarts résiduels acceptés : grok-def 375 · grok-reco 354 · deepseek-def 312 · haiku/sonnet-def 384-388 · kimi-reco-guide 393 · deepseek-reco 634 (long) — chips « trop court/long » de la lecture annotée trancheront. kimi-k26-thinking récupéré en retry séquentiel (429 concurrence orga 3). Prochaine étape 5 : lecture annotée Papa Yann (après 002 v6) + panel v2. |
| 5 | Panel 20 lecteurs | 20 Témoins | ⚪ | — | [`5-lecteurs-temoins/`](5-lecteurs-temoins/) |
| 6 | Sélection | Directeur | ⚪ | — | [`6-selection.md`](6-selection.md) |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`8-gatekeeper-verdict.md`](8-gatekeeper-verdict.md) |
| 9 | Re-relecture rewrite | Panel 20 | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

> Étape 2 supprimée 2026-05-12 (fusion avec étape 1 — l'Architecte est en standby).

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch+Plan** validé : **GO Papa Yann 2026-07-10**
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

- **2026-07-10** — Étapes 0 + 1 ✅. Pitch+plan validé. Point d'attention n°1 répercuté dans le brief-histoire : **section 3 du pitch-plan (traitement frontal de la lenteur / fluidité)** — deux introvertis + phénomène statique = risque « constats juxtaposés ».
- **2026-07-10** — Étape 2B ✅ : matière brute des 3 LLMs (Kimi + DeepSeek + Grok) récoltée pour nourrir les briefs.
- **2026-07-11** — Étape 3 ✅ : les 3 fichiers de `3-briefs/` produits (brief-personnages, brief-histoire, micro-briefs). Le menu d'angles COMMUN est recalibré sur le danger n°1 (lenteur) → angles orientés mouvement / dialogue-moteur / enchaînement. Prochaine étape = **4 (14 writers)**. ⚠️ Attente **relecture PMO des briefs** (passe mécanique négations gratuites) avant lancement writers — tant qu'il a des alertes, étape 4 = 🔴 BLOQUÉ.
- ⚠️ Dossier issu du gabarit : fichiers `6-selection.md`, `10-texte.md`, `10-synthese-finale.md` présents en résidu de copie — à ignorer/nettoyer par l'archiviste, hors scope étape 1.

---

## Reprise après reboot

Procédure :
1. Lire ce fichier (statut étape en cours)
2. Lire [`README.md`](README.md) (état global histoire)
3. Lire le dernier livrable produit (selon étape ci-dessus)
4. Lire `narration/pmo/INVARIANTS.md` + `pmo/decisions.md` (règles tranchées + chiffres clés)
5. Reprendre selon ce qui manque
