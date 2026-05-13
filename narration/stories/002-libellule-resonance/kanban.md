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
| 0 | Idée (brainstorm) | Auteur | ✅ | 2026-05-12 | Wex + Juju + Nono · Libellule · Étang amont · Résonance (pivot Dadou → Juju 2026-05-12) |
| 1 | Pitch + Plan (fusionnés depuis 2026-05-12) | Conseiller | ✅ | 2026-05-12 | [`1-pitch-plan.md`](1-pitch-plan.md) |
| 3 | Briefs | Directeur | ✅ | 2026-05-12 | [`3-briefs/`](3-briefs/) (4 fichiers : brief-univers, brief-personnages, brief-histoire, _writer-package) |
| 4 | **14 Versions writers** (refonte casting v2 2026-05-12) | 14 Writers | ✅ | 2026-05-13 | [`4-versions-writers/`](4-versions-writers/) — 14 versions + 1 régénération (kimi-reco-guide v1+v2) = **15 fichiers** |
| 5 | **Panel 20 lecteurs** (10 profils × 2 tranches d'âge — règle 2026-05-13, dès STORY-002) | 20 Témoins | ✅ | 2026-05-13 | [`5-lecteurs-temoins/`](5-lecteurs-temoins/) — 20 fiches + [`5-synthese-lecteurs.md`](5-lecteurs-temoins/5-synthese-lecteurs.md) · **Top : kimi-reco-guide-v2** (16+/20 profils) |
| 6 | Sélection (top 1-3 + greffes Directeur) | Directeur | ⏳ | — | [`6-selection.md`](6-selection.md) — attente arbitrage auteur |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`8-gatekeeper-verdict.md`](8-gatekeeper-verdict.md) |
| 9 | Re-relecture (panel 20) | 20 Témoins | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch** validé : 2026-05-12 (recentrage Nono uniquement finalisé)
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

### 2026-05-13 — Étape 4 ✅ (refonte casting v2 + cohabitation MCP Kimi + logs auto)

**14 writers livrés** (chronologie session) :
- Claude × 6 : opus-def/reco, sonnet-def/reco, haiku-def/reco (agents narration-writer-claude-libre)
- Kimi × 4 : kimi-reco (`ask_kimi` gratuit) · kimi-k26-instant (`ask_kimi_payant` `thinking: disabled`) · kimi-k26-thinking (`ask_kimi_payant` `thinking: enabled` défaut K2.6) · kimi-reco-guide (agent narration-writer-kimi-guide, `ask_kimi` gratuit)
- DeepSeek × 2 : def + reco (1.5 creative writing officiel)
- Grok × 2 : def + reco (1.2 reco créatif xAI, au-delà 1.5 incohérent narratif)

**Bonus exceptionnel** : `kimi-reco-guide-v2.md` régénéré après corrections frontmatter mid-session — `-v1` conservé pour comparaison (= 15e fichier ponctuel cette story uniquement).

**Anciennes versions archivées** : `_archive/deepseek-1-PRE-CASTING-V2-2026-05-12.md` (pré-refonte 10→14).

**Améliorations infra greffées étape 4** :
- Refonte casting v2 (10 → 14) — INVARIANTS + PROCESS + ORGANIGRAMME + MODELS.md propagés
- Cohabitation MCP Kimi gratuit (`ask_kimi`) / payant (`ask_kimi_payant`) — résout ARCHI-009
- Logs auto MCP créatifs (option A 2026-05-13) — filet de sécurité contre perte de génération

**Prêt pour étape 5** : panel 20 lecteurs (obligatoire depuis STORY-002 — décision 2026-05-13).

---

## Reprise après reboot

Procédure :
1. Lire ce fichier (statut étape en cours)
2. Lire [`README.md`](README.md) (état global histoire)
3. Lire le dernier livrable produit (selon étape ci-dessus)
4. Lire `pmo/decisions.md` (règles tranchées récentes)
5. Reprendre selon ce qui manque
