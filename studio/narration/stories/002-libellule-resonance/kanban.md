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
| 4 | **14 Versions writers — VAGUE 5** | 14 Writers | ✅ **14/14** | 2026-07-03 | [`4-versions-writers/`](4-versions-writers/) — **14/14 persistées**. 11 initiales (6 Claude + kimi-k26-instant + deepseek déf/reco + grok déf/reco) **+ 3 Kimi récupérés via CLI** (`kimi-reco` 487 · `kimi-reco-guide` **546** (resserré depuis 564) · `kimi-k26-thinking` **542** (resserré depuis 561)). **TOUTES dans 400-550 mots** (haiku-def 428 · haiku-reco 470 · opus-def 507 · opus-reco 499 · sonnet-def 470 · sonnet-reco 476 · deepseek-def 549 · deepseek-reco 497 · grok-def 483 · grok-reco 414 · kimi-k26-instant 528 · kimi-reco 487 · kimi-reco-guide 546 · kimi-k26-thinking 542). **Les 3 Kimi ont été récupérés par Papa Yann via `call-llm.mjs` CLI** (contournement du **timeout du transport MCP** sur générations longues 188-396 s). ⚠️ **LEÇON MCP/INFRA** : la conclusion « panne infra Moonshot » était **FAUSSE** — le canal Kimi répond en ~1.9 s ; la vraie cause est le timeout du transport MCP sur les writers longs. **Règle : sur échec MCP d'un writer long, basculer sur `infra/mcp/call-llm.mjs` (Bash timeout 600 s), ne PAS conclure à une panne infra.** Vague 4 archivée `_archive/vague-4/`. |
| 4-v4 | ~~14 Versions writers vague 4~~ | 14 Writers | ✅→📦 | 2026-05-17 | Produites (commit 634c5041). **Archivées 2026-07-03** `_archive/vague-4/` (16 versions + 20 fiches panel + synthèse + sélection). |
| 5 | **Panel v2 hétérogène (12 calls) + synthèse** | Panel v2 + Directeur | ✅ (écart doc.) | 2026-07-03 | **13 fiches produites** (12 attendues + 1 bonus `G-extra-haiku` session concurrente) : `5-lecteurs-temoins/`. **Kimi indisponible sur les 4 groupes** (même panne socket) → 3e voix substituée par Haiku/DeepSeek (PROCESS panel v2 = « Haiku OU DeepSeek » en 3e colonne). Chaque groupe = Sonnet + Haiku + DeepSeek. **Corpus jugé = 11 versions.** Synthèse consolidée produite : [`5-synthese-lecteurs.md`](5-synthese-lecteurs.md). **Top A (11 versions notées)** : 1.opus-reco (3.15) · 2.grok-reco (4.15) · 3.haiku-reco · 4.sonnet-reco · 5.deepseek-reco. **Signal central** : kimi-k26-instant polarise (#1-2 chez 5 fiches / dernier chez 7 — voix d'enfant vraie mais fin-pirouette + cascade anonyme). Patterns « à éviter » : main-qui-parle, doigt-qui-pend, libellule-sur-le-genou, fin qui repart. **ADDENDUM 2026-07-03** : les 3 Kimi récupérés hors panel sont évalués en **lecture Directeur** (non notés lecteurs) dans `5-synthese-lecteurs.md` → verdict : **ne délogent pas le top 2** ; `kimi-k26-thinking` mérite la zone rang 4-6 (fin apaisée « On était bien » + verrou causal incarné) et sert de réservoir de greffe. Test calibration one-shot toujours SAUTÉ (ticket TEST-PANEL-CALIBRATION). |
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

### 2026-07-03 (soir) — VAGUE 5 passe à 14/14 : 3 Kimi récupérés via CLI + resserrement

**Fait** :
- Papa Yann a récupéré lui-même les 3 writers Kimi manquants (`kimi-reco`, `kimi-reco-guide`, `kimi-k26-thinking`) via `infra/mcp/call-llm.mjs` (CLI). Étape 4 = **14/14**.
- Directeur a **resserré les 2 Kimi hors gabarit** (corps hors frontmatter/note) : `kimi-reco-guide` 564 → **546** · `kimi-k26-thinking` 561 → **542**. Resserrement pur (coupes de phrases secondaires), spine + note d'intention + axes déclarés intacts. `kimi-reco` déjà OK (487).
- Synthèse panel mise à jour : **ADDENDUM VAGUE 5** ajouté à `5-synthese-lecteurs.md` — les 3 Kimi **n'ont PAS été notés par le panel** (récupérés après le passage des lecteurs) ; ils sont évalués en **lecture Directeur** contre les mêmes critères (option (b) choisie, la plus honnête : pas de rang panel fabriqué). Verdict : le top 2 (opus-reco / grok-reco) est **inchangé** ; `kimi-k26-thinking` entre en zone rang 4-6 et alimente la matière à greffer (fin « On était bien »).
- Le §0 de la synthèse (qui disait « même panne infra » pour les 3 Kimi-writers) est **corrigé** dans l'addendum.

**🔧 LEÇON MCP/INFRA (gravée)** : la conclusion précédente « panne infra socket Moonshot » sur les writers Kimi longs était **FAUSSE**. Le canal Kimi répond en ~1.9 s. La vraie cause = **timeout du transport MCP** sur les générations longues (188-396 s). **Règle : sur échec MCP d'un writer long, basculer sur `infra/mcp/call-llm.mjs` (Bash timeout 600 s) — NE PAS conclure à une panne infra.** (Cf. `reference_mcp_tool_timeout.md` : tool-call MCP coupé ~250 s, non configurable.)

**NON touché** (consigne) : `site/duel-data.js` (duel de goût déjà généré/joué par Papa Yann) · étape 6 (sélection) — on attend le retour du duel.

**Prochaine action** : étape 6 (sélection) **après** retour du duel de goût de Papa Yann. Ne pas lancer avant.

---

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
