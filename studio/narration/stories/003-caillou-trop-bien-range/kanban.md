# Kanban — STORY-003 caillou-trop-bien-range

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
| 0 | Idée | Auteur | ✅ | 2026-07-10 | INBOX / GO Papa Yann (sujet + trio validés) |
| 1 | Pitch + Plan | Conseiller | ✅ | 2026-07-10 | [`1-pitch-plan.md`](1-pitch-plan.md) |
| 2B | Brainstorm équipe | Kimi+DeepSeek+Grok+Conseiller | ✅ | 2026-07-10 | [`2-brainstorm-equipe.md`](2-brainstorm-equipe.md) (matière brute 3 LLMs) |
| 3 | Briefs | Directeur | ✅ | 2026-07-11 | [`3-briefs/`](3-briefs/) — personnages + histoire + micro-briefs |
| 4 | 14 Versions writers | 14 Writers | ✅ **14/14** | 2026-07-11 | [`4-versions-writers/`](4-versions-writers/) — vague 1 complète (6 Claude agents + kimi-reco-guide agent + 7 CLI `call-llm.mjs`). Écarts gabarit résiduels après retries : deepseek-def 379 · kimi-k26-instant 363 · kimi-reco 389 (légers, acceptés). ⚠️ deepseek-reco temp 1.5 : 2 générations dégénérées (charabia/1054 mots) avant une v3 propre (414) — instabilité à surveiller. kimi-payant : plafond concurrence orga = 3 (429 si 6 appels //, retry séquentiel OK). Prochaine étape 5 : lecture annotée Papa Yann (après ingestion 002 v6, lecture.html mono-corpus) + panel v2. |
| 5 | Panel 12 calls (DEC-PANEL-V2) | Panel v2 | 🟢 | 2026-07-11 | Panel v2 ✅ **12/12** (`5-lecteurs-temoins/` + [`5-synthese-lecteurs.md`](5-synthese-lecteurs.md)). Lecture annotée Papa Yann ⏳ (file d'attente après STORY-002). ⚠️ `deepseek-reco` jugée CORROMPUE = hors concours (version propre régénérée non jugée). |
| 6 | Sélection | Directeur | ⚪ | — | [`6-selection.md`](6-selection.md) |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`8-gatekeeper-verdict.md`](8-gatekeeper-verdict.md) |
| 9 | Re-relecture rewrite | Panel 12 (même panel qu'étape 5) | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

> Étape 2 supprimée 2026-05-12 (fusion avec étape 1 — l'Architecte est en standby).

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch+Plan** validé : GO Papa Yann 2026-07-10
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

- **2026-07-11 — Étape 3 complétée (Directeur).** 3 fichiers produits : `brief-personnages.md` (curseur méfiance douce bordé DEC-BRIEF-CURSEUR, Wex ≥2 répliques dont 1 pivot, deux fiertés distinctes), `brief-histoire.md` (doctrine BOUSSOLE/QUALITÉS §5bis, verrou causal Ten = caillou retourné par Wex → il tient, callback écarté↔sommet, goût en QUALITÉS pas recettes — DEC-GOÛT-RECETTE-VS-QUALITÉ tranché côté qualité), `micro-briefs.md` (menu d'angles COMMUN LP1, aucune assignation).
- **➡️ Prochaine action :** relecture mécanique PMO des briefs (négations gratuites / test règle F) AVANT lancement des 14 writers (étape 4). Tant que le PMO a des alertes, étape 4 = 🔴 BLOQUÉ.
- **2026-07-11 — Étape 5 : panel v2 ✅ 12/12 + synthèse produite (Directeur).** Top consolidé (rang moyen 12 fiches) : (1) claude-sonnet-def 4.42 · (2) claude-sonnet-reco 4.50 (seul jamais dans le fond) · (3) kimi-reco-guide 5.25 · (4) claude-opus-def 5.75 · (5) kimi-reco 5.92. Patterns : geste-pivot Wex silencieux gagne · mots d'adulte + incohérences comptage + métaphores prises au 1er degré perdent · chute « personne n'a gagné » inquiète les 4 ans (divergence groupes). ⚠️ **`deepseek-reco` corrompue à l'étape 4 = rang NUL, exclue du fond de sélection ; version propre régénérée non jugée** (cf. `5-synthese-lecteurs.md` §0bis). Panel = acceptable, PAS le goût auteur.
- **➡️ Prochaine action étape 5 :** **lecture annotée Papa Yann** (instrument principal) — ⏳ file d'attente après ingestion STORY-002. **Étape 6 NON lancée** (attendre lecture annotée + instruction séparée).

---

## Reprise après reboot

Procédure :
1. Lire ce fichier (statut étape en cours)
2. Lire [`README.md`](README.md) (état global histoire)
3. Lire le dernier livrable produit (selon étape ci-dessus)
4. Lire `narration/pmo/INVARIANTS.md` + `pmo/decisions.md` (règles tranchées + chiffres clés)
5. Reprendre selon ce qui manque
