# Kanban — STORY-002 La Libellule impossible

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
| **2A** | **Brainstorm boss (Phase A)** | Papa Yann + Conseiller | ✅ | 2026-05-15 | [`2-brainstorm-boss.md`](2-brainstorm-boss.md) — vision Couche 0 + Couche 1 beats figés (11 beats, libellule sur nez Juju, Wex "oh" muet) — **scène pivot complète** validée auteur |
| **2B** | **Brainstorm équipe (Phase B) v2** | Kimi + DeepSeek + Grok + Conseiller | ✅ | 2026-05-15 | [`2-brainstorm-equipe.md`](2-brainstorm-equipe.md) — matière brute 6 axes filtrée (faune/flore/actions/vannes/Wex/libellule/admiration) — **filtrage auteur appliqué 2026-05-15** |
| **3-V5** | **Briefs VAGUE 5 (refonte goût — DEC-BRIEF-CURSEUR)** | Directeur | 🟢→⏳PMO | 2026-07-03 | [`3-briefs/`](3-briefs/) — **3 fichiers from scratch** : `brief-personnages.md` (fond inchangé, libellule bleue figée, aucun diminutif hors lookup) + `brief-histoire.md` (BOUSSOLE resserrée 400-550 mots, images épouvantail/nez **LIBÉRÉES**, seul verrou causal Juju↔Nono→libellule, **§5bis GOÛT AUTEUR** rempli) + `micro-briefs.md` (**14 angles DISTINCTS** depuis palmarès). Vague 4 archivée `_archive/3-briefs-vague4-2026-05-17/`. **En attente relecture PMO** avant étape 4. |
| **3C** | ~~Briefs vague 4 BOUSSOLE~~ (archivé) | Directeur | ✅ | 2026-05-17 | Archivé `_archive/3-briefs-vague4-2026-05-17/` — dictait encore épouvantail + nez (images héritées brainstorm boss). Remplacé par vague 5. |
| **D** | **_writer-package complet Couches 1/2/3 (vague 3)** | Directeur | ✅ | 2026-05-16 | [`3-briefs/brief-histoire.md`](3-briefs/brief-histoire.md) refondé : Couche 1 ref → `equipe/_writer-system.md` + Couche 2 brief + Couche 3 vision guidé. Format : système/utilisateur (DEC-WRITER-ARCH-001). **LIVRÉ** |
| 3 | ~~Briefs~~ (archivé vague 1-2) | — | ❌ | 2026-05-12 | [`3-briefs/`](3-briefs/) — **REFONTE VAGUE 3 COMPLÉTÉE** (étapes B/C/D ✅) |
| 4 | **14 Versions writers — VAGUE 5** | 14 Writers | ⚪ | — | [`4-versions-writers/`](4-versions-writers/) — **À RELANCER sur briefs vague 5** dès relecture PMO PASS. Kimi via canal `kimi-for-coding` prioritaire. Chaque writer reçoit son micro-brief (`micro-briefs.md`). Versions vague 4 à archiver `_archive/4-versions-vague4/` avant relance. |
| 4-v4 | ~~14 Versions writers vague 4~~ | 14 Writers | ✅ | 2026-05-17 | Produites (commit 634c5041). À archiver avant relance vague 5. |
| 5 | **Panel 20 lecteurs + synthèse** | 20 Témoins + Directeur | ⚪ | — | À RELANCER sur les **14 vague 4** (panels vague 2 et 3 archivés dans `_archive/`). En attente décision Papa Yann. |
| 6 | Sélection | Directeur | 🔴 | 2026-05-14 → 2026-05-21 (SLA 3j dépassé) | [`6-selection.md`](6-selection.md) — **BLOQUÉ** (SLA dépassé depuis 2026-05-17 — en attente décision Papa Yann sur étape 5 panel 20 lecteurs relance vague 4) |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | GateKeeper | GateKeeper | ⚪ | — | [`8-gatekeeper-verdict.md`](8-gatekeeper-verdict.md) |
| 9 | Re-relecture (panel 20) | 20 Témoins | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch** validé : 2026-05-12 (recentrage Nono uniquement finalisé)
- [ ] **Étape 6 — Sélection** validée : ___ (en attente relance étape 5 Panel 20 — vague 4)
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

### 2026-07-03 — VAGUE 5 : refonte briefs goût (DEC-BRIEF-CURSEUR)

**Contexte** : après le duel de goût 002 (vague 4), l'auteur a rejeté les 2 champions du panel. Refonte du PROCESS (micro-briefs par writer, lecture `gout/` obligatoire). Les briefs vague 4, bien qu'en boussole, **dictaient encore** l'épouvantail et le nez de Juju (images héritées du brainstorm boss beats 8-11).

**Produit (3 fichiers from scratch)** :
- `brief-personnages.md` : fond vague 4 inchangé, format rafraîchi, **libellule BLEUE figée** (fin de l'ambiguïté couleur vague 4), aucun diminutif hors Juju/Nono/Wex.
- `brief-histoire.md` : BOUSSOLE resserrée **400-550 mots**, **images épouvantail + nez LIBÉRÉES** (matière writer, plus dictées), seul le **verrou causal** (libellule APRÈS contact Juju↔Nono) reste ESSENCE, **§5bis GOÛT AUTEUR** rempli (clarté qui-parle, économie, dialogues attribués, pas de pirouette, 1 moment physique mimable en intention).
- `micro-briefs.md` : **14 angles DISTINCTS** assignés depuis `gout/palmares-writers.md` (Kimi = attribution obligatoire · Grok-reco = dernière phrase courte + bleu cohérent · Opus = suspension sensorielle · Sonnet = Ketsu sobre · Haiku = phrase-culte · DeepSeek = 🚨 zéro renommage/diminutif · etc.).

**Règles dures respectées** : zéro verbatim d'histoires précédentes · zéro beat de mise en scène · gag du nez non dicté · libellule bleue · briefs autoporteurs.

**Vague 4 archivée** : `_archive/3-briefs-vague4-2026-05-17/` (+ README).

**Prochaine action** : relecture PMO (négations gratuites + cohérence) → si PASS, étape 4 relance 14 writers vague 5.

---

### 2026-05-17 — REX vague 3 + Refonte BOUSSOLE vague 4

**Contexte** : Vague 3 convergence sur-spécifiée (10 beats Couche 2 = recopie mécanique). Étalon vague 2 jamais battu. Décision BOUSSOLE = intentions + 6 causalités-ESSENCE, zéro formulation publiable.

**REX détaillé** :
- Vague 3 brief = 10 beats numérotés en langage narratif → writers recopient (Nono geste identique 11/14, Juju contact eau 8/14, libellule comportement 9/14)
- Vague 2 brief = 6 causalités + liberté complète → jamais battu en panel (18/20)
- Conclusion : augmenter précision brief = augmenter convergence mécanique = tuer patte créative

**Décision DEC-BRIEF-VAGUE4-BOUSSOLE** :
- Brief Couche 2 = BOUSSOLE uniquement, jamais phrase publiable
- Ten = 6 causalités-ESSENCE LIBRES (plus 10 beats numérotés)
- Verrou unique (libellule APRÈS bug Wex + contact Juju-Nono) = intouchable
- Couche 3 guidé = writer seul, jamais Couche 2
- Chansonnette supprimée, Nono debout (contradiction interne vague 3 éliminée)

**Application** : Brief STORY-002 vague 4 refondé en BOUSSOLE 2026-05-17. Étape 4 ✅ **14/14 writers produits** (casting figé 14, kimi-k26-thinking inclus comme les 13 autres — aucune exclusion). Bug infra résolu (CLI streaming SSE). Étape 5 (panel) en attente décision Papa Yann.

**Leçons gravées** : OBS-SURSPEC-BRIEFS (précision ≠ liberté) + AP-WRITER-THINKING-001 (Kimi K2.6 thinking incompatible briefs causalités).

---

### 2026-05-15 — Décisions architecturales : briefs 3 couches + system/user writers + PROCESS nouveau (DEC-BRIEF-ARCH-*, DEC-WRITER-ARCH-001, DEC-PROCESS-NEW-001)

**Contexte** : analyse étape 5 vague 2 révèle convergence artificielle (gestes Nono + berge humide + Juju touche eau = même chez 11/14 writers). Cause : détails signature injectés en brief commun (Couche 2) au lieu vision guidé (Couche 3).

**Décisions tranchées** (voir `pmo/decisions.md` pour détails) :
- **DEC-BRIEF-ARCH-001** : Architecture briefs en 3 couches (Couche 1 STATIQUE / Couche 2 DYNAMIQUE HISTOIRE / Couche 3 DYNAMIQUE GUIDÉ)
- **DEC-BRIEF-ARCH-002** : _writer-package.md = package UNIQUE parité totale (variant = LLM + température)
- **DEC-BRIEF-ARCH-003** : Bug vague 2 confirmé — gestes/décor/actions = Couche 3 (vision guidé) uniquement, pas Couche 2
- **DEC-WRITER-ARCH-001** : Architecture system/user UNIFIÉE writers étape 4 (system = `equipe/_writer-system.md` Couche 1 pérenne, user = `brief-histoire.md` Couche 2+3 per-story). Obsolètes : `brief-univers.md`, `_writer-package.md` (remplacés split system/user). Ticket ARCHI-014 créé pour implémentation.
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

### 2026-05-15 — Phase B v2 clôturée ✅ : filtrage auteur appliqué

**Contexte** : Phase B v1 a produit 3 narrations complètes (1700+ mots) au lieu de matière brute par axe. Anti-pattern détecté : formulation holistique « écrire une version brute » vs grain fin « listez X par axe ». Re-lancement urgent.

**Décision Papa Yann (2026-05-15 matin)** : Re-lancer Kimi/DeepSeek/Grok avec 6 missions granulaires distinctes (énumération, pas narration).

**6 axes Phase B v2 — Matière filtrée validée auteur (2026-05-15 fin de session)** :
1. **Faune/flore mai** : ✅ Têtards, poule d'eau, bourdon · Roseau, mousse (retenue)
2. **Actions/jeux trio** : ✅ Tableau Juju/Nono/Wex × 8 actions chacun (validé) · **⚠️ AXE 2 = contexte Directeur uniquement, JAMAIS injecter dans brief Couche 2** (risque convergence)
3. **Vannes Juju T8** : ✅ 2 validées (limaces, pas racines) · 3e libre au writer
4. **Wex** : ✅ Tourne + tête 90°/éclate rire · Répliques libres au writer
5. **Libellule** : ✅ Couleur libre (bleu/vert/jaune), yeux énormes · 5 comportements vol + 3 sensations paume validés
6. **Admiration** : ⚪ Libre au writer (en détail briefs étape 3C)

**Statut** : ✅ Phase B v2 **CLÔTURÉE** — matière filtrée dans `2-brainstorm-equipe.md`. Prêt étape 3C.

**Prochaines actions** : Directeur débute étape 3C (briefs Couche 2 intentions Ki/Sho/Ten/Ketsu) alimentée Phase B matière filtrée → lancement étape 4 vague 3 (14 writers).

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
- ~~Règle résonance jamais nommée~~ (DEC-TENSION-RESONANCE ANNULÉE 2026-05-15 — ce n'était pas une règle, bon sens narratif)
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
