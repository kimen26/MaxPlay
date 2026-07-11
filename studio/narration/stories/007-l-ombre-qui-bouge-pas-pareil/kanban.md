# Kanban — STORY-007 l-ombre-qui-bouge-pas-pareil

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
| 0 | Idée | Auteur | ✅ | 2026-07-11 | GO autonome Papa Yann (sujet + trio + Kishōtenketsu) |
| 1 | Pitch + Plan | Conseiller | ✅ | 2026-07-11 | [`1-pitch-plan.md`](1-pitch-plan.md) — VALIDÉ (GO autonome Papa Yann) |
| 2 | Brainstorm (boss + équipe) | Papa Yann + Conseiller / Kimi+DeepSeek+Grok | ✅ | 2026-07-11 | 2A GO autonome · [`2-brainstorm-equipe.md`](2-brainstorm-equipe.md) (matière brute) |
| 3 | Briefs | Directeur | ✅ | 2026-07-11 | [`3-briefs/`](3-briefs/) — brief-personnages · brief-histoire · micro-briefs |
| 4 | 14 Versions writers | 14 Writers | ✅ (13/14) | 2026-07-11 | [`4-versions-writers/`](4-versions-writers/) — `kimi-reco-guide` MANQUE (quota Kimi) |
| 5 | Panel 20 lecteurs | 20 Témoins | 🟢 panel ✅ 12/12 · lecture annotée ⏳ | 2026-07-11 | [`5-synthese-lecteurs.md`](5-synthese-lecteurs.md) — synthèse produite (corpus 13) |
| 6 | Sélection | Directeur | ⚪ | — | [`6-selection.md`](6-selection.md) |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`8-gatekeeper-verdict.md`](8-gatekeeper-verdict.md) |
| 9 | Re-relecture rewrite | Panel 20 | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

> Étape 2 = Brainstorm (boss Phase A + équipe Phase B), recréée 2026-05-15 (DEC-PROCESS-002).

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

**2026-07-11 — Synthèse lecteurs livrée (étape 5, panel ✅ 12/12).** `5-synthese-lecteurs.md` produite sur **corpus 13/14**. Champion net = **claude-sonnet-reco** (rang moyen 2.50, 10 top-3, 0 fond). Suivants : kimi-reco (3.67, polarisant), claude-sonnet-def (4.92, chute « on est dedans »). **2 dérogations dispositif à valider PMO** : (1) version writer `kimi-reco-guide` **non générée** (quota Kimi gratuit épuisé) → hors corpus, PAS dernière ; (2) **axe lecteur Kimi substitué par DeepSeek sur les 4 groupes** (même cause) → panel hétérogène mais non conforme DEC-PANEL-V2, penche vers l'analytique (sous-note structurellement kimi-reco). **Reste : lecture annotée Papa Yann ⏳ (instrument principal) avant étape 6.** Question ouverte transmise : générer kimi-reco-guide + re-paneler, ou acter corpus 13 ? Étape 6 NON lancée.

**2026-07-11 — Briefs livrés (étape 3 ✅).** 3 fichiers dans `3-briefs/` : brief-personnages (Raph/Madie/Wex), brief-histoire (BOUSSOLE + verrou Ten + §5bis goût), micro-briefs (menu commun orienté MOUVEMENT). **Prochaine étape : relecture mécanique PMO des négations gratuites (test règle F)** avant lancement des 14 writers (étape 4). Tant que le PMO a des alertes, étape 4 reste 🔴/⚪. Point de vigilance transmis au writer : sujet = ombre, le plus exposé aux 2 tueurs (confusion + comparaison absconse) → interdit dur « zéro explication de l'ombre » gravé au Ten et en §5bis-1.

---

## Reprise après reboot

Procédure :
1. Lire ce fichier (statut étape en cours)
2. Lire [`README.md`](README.md) (état global histoire)
3. Lire le dernier livrable produit (selon étape ci-dessus)
4. Lire `narration/pmo/INVARIANTS.md` + `pmo/decisions.md` (règles tranchées + chiffres clés)
5. Reprendre selon ce qui manque
