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
| **B** | **Brainstorm Couche 0 (NOUVEAU — vague 3)** | Directeur + LLMs | ⚪ | — | [`0-brainstorm-couche.md`](0-brainstorm-couche.md) — étape exploratoire pré-briefs (DEC-PROCESS-NEW-001) |
| **C** | **Briefs Couche 2 (refonte — vague 3)** | Directeur | ⚪ | — | [`3-briefs/`](3-briefs/) refondus : intentions Ki/Sho/Ten/Ketsu uniquement (DEC-BRIEF-ARCH-001) |
| **D** | **_writer-package complet Couches 1/2/3 (vague 3)** | Directeur | ⚪ | — | [`3-briefs/_writer-package.md`](3-briefs/_writer-package.md) refondé : Couche 1 ref + Couche 2 brief + Couche 3 vision guidé |
| 3 | ~~Briefs~~ (archivé vague 1-2) | — | ❌ | 2026-05-12 | [`3-briefs/`](3-briefs/) — **REFONTE VAGUE 3 PRÉVUE** (voir étapes B/C/D) |
| 4 | **14 Versions writers — VAGUE 3** (briefs refondus 3 couches) | 14 Writers | ⚪ | — | [`4-versions-writers/`](4-versions-writers/) — vague 2 archivée dans `_archive/vague-2/`, vague 1 reste `_archive/vague-1/` |
| 5 | **Panel 20 lecteurs + synthèse** | 20 Témoins + Directeur | ✅ | 2026-05-14 | [`5-lecteurs-temoins/`](5-lecteurs-temoins/) + [`5-synthese-lecteurs.md`](5-synthese-lecteurs.md) — verdict : `kimi-reco-guide` #1 chez 18/20 |
| 6 | Sélection | Directeur | ⏳ | 2026-05-14 → 2026-05-15 | [`6-selection.md`](6-selection.md) — **EN ATTENTE AUTEUR** (validation vague 3 briefs avant sélection ETH vague 3, voir DEC-STORY-002-VAGUE3) |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`8-gatekeeper-verdict.md`](8-gatekeeper-verdict.md) |
| 9 | Re-relecture (panel 20) | 20 Témoins | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch** validé : 2026-05-12 (recentrage Nono uniquement finalisé)
- [ ] **Étape 6 — Sélection** validée : ___ (vague 2 en cours)
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

### 2026-05-15 — Vague 3 décisions : architecture briefs refondée + PROCESS nouveau (DEC-BRIEF-ARCH-*, DEC-PROCESS-NEW-001)

**Contexte** : analyse étape 5 vague 2 révèle convergence artificielle (gestes Nono + berge humide + Juju touche eau = même chez 11/14 writers). Cause : détails signature injectés en brief commun (Couche 2) au lieu vision guidé (Couche 3).

**Décisions tranchées** (voir `pmo/decisions.md` pour détails) :
- **DEC-BRIEF-ARCH-001** : Architecture briefs en 3 couches (Couche 1 STATIQUE / Couche 2 DYNAMIQUE HISTOIRE / Couche 3 DYNAMIQUE GUIDÉ)
- **DEC-BRIEF-ARCH-002** : _writer-package.md = package UNIQUE parité totale (variant = LLM + température)
- **DEC-BRIEF-ARCH-003** : Bug vague 2 confirmé — gestes/décor/actions = Couche 3 (vision guidé) uniquement, pas Couche 2
- **DEC-PROCESS-NEW-001** : Nouveau process étapes A/B/C/D (ajout étape B brainstorm Couche 0) avant étape 3-10
- **DEC-JUJU-T8-001** : Trait Juju gravé — "Chansonnette interrompue + reset brutal" (découverte vague 2, 18/20 plébiscite)

**Prochaines actions vague 3** :
1. Validation Papa Yann sur LLMs Couche 0 (PROP-COUCHE0-LLMS : Kimi/DeepSeek/Grok ?)
2. Étape B : brainstorm Couche 0 (2-3 jours)
3. Étape C : refonte brief Couche 2 (intentions Ki/Sho/Ten/Ketsu uniquement)
4. Étape D : _writer-package.md refondé (Couches 1/2/3)
5. Étape 4 vague 3 : 14 writers relancés (prochaines actions après validation)

**Blocage** : vague 3 lancée dès validation auteur sur proposition LLMs Couche 0.

**État** : ⏳ Avant lancement vague 3 — validation auteur attendue avant étape B.

---

### 2026-05-14 — Étape 5 ✅ Panel 20 lecteurs + synthèse Directeur

**Verdict consolidé** : `kimi-reco-guide` (vague 2) écrase le panel.
- #1 chez 18 lecteurs sur 20 (90 %)
- #2 chez 2 lecteurs (DMF-A, DMF-B — qui placent `claude-opus-def` en #1 pour sa dernière phrase)
- Écart score #1 vs #2 = 86 points (sur 322 max théorique)

**Greffes potentielles identifiées** (à valider auteur étape 6) :
1. Dernière phrase opus-def "elle ne savait pas qu'on la regardait" — meilleure fin du corpus selon adultes
2. Image "libellule sur le genou de Nono" — moment le plus cité (16/20)
3. Remplacer "funambule" (mot hors-portée 4-7 ans)

**Signaux rouges transverses** identifiés pour gravage `lecons-vivantes.md` :
- Métaphores adultes (silence rond, présence épaisse, verre plein, corde dans l'air)
- Nommer la résonance ("l'étang tremblait avec eux", "la libellule pencha la tête")
- Vocabulaire hors-portée (funambule, amont, inlassable, trajectoire)
- Émotions adultes attribuées à Juju ("déçue", "magnifique")

**Prochaine étape** : 6 — Sélection Directeur (validation auteur attendue avant étape 7).

### 2026-05-14 — Vague 2 lancée (briefs corrigés + vague 1 archivée)

Corrections briefs avant relance :
- Positif pur sur Juju/Nono (suppression négations OBS-001)
- Phrases types injectées (Juju + Nono)
- Gestes archétypiques Nono (P9) injectés
- Règle résonance jamais nommée (DEC-TENSION-RESONANCE) ajoutée dans les 4 briefs
- Onomatopées retirées des briefs (TODO créé dans leçons-vivantes pour travail futur par perso)
- Vague 1 archivée dans `_archive/vague-1/` — top 1 (`kimi-reco-guide-v2.md`) conservé comme référence

### 2026-05-13 — Étape 4 ✅ vague 1 (refonte casting v2 + cohabitation MCP Kimi + logs auto)

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
