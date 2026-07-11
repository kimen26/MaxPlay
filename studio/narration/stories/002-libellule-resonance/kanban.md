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
| **3-V6** | **Briefs VAGUE 6 (goût qualités-vs-recettes + Nono libère)** | Directeur | ✅ | 2026-07-10 | [`3-briefs/`](3-briefs/) — **3 fichiers refondus** : `brief-personnages.md` (directive forte Nono libère figée dans son garde-fou, Wex ≥2 répliques) + `brief-histoire.md` (**§5bis refondu en QUALITÉS pas en recettes** — piste DEC-GOÛT-RECETTE-VS-QUALITÉ, bannit « entre par la sensation » procédé ; **verrou de mise en scène Nono libère** ajouté au verrou causal ; contre-goûts confirmés incohérence spatiale/continuité micro/narrateur-philosophe/comparaison absconse intégrés) + `micro-briefs.md` (menu COMMUN recalibré palmarès + duel v5, LP1 équité). Vague 5 archivée `_archive/3-briefs-vague5-2026-07-03/` (+ README). **Prêt étape 4 — main thread relance les 14 writers.** |
| **3-V5** | ~~Briefs VAGUE 5 (refonte goût — DEC-BRIEF-CURSEUR)~~ (archivé) | Directeur | ✅→📦 | 2026-07-03 | Archivé `_archive/3-briefs-vague5-2026-07-03/`. Pipeline complet tourné dessus (14 writers · re-panel v2 · sélection v2 · rewrite · gatekeeper). Remplacé par vague 6. |
| **3C** | ~~Briefs vague 4 BOUSSOLE~~ (archivé) | Directeur | ✅ | 2026-05-17 | Archivé `_archive/3-briefs-vague4-2026-05-17/` — dictait encore épouvantail + nez (images héritées brainstorm boss). Remplacé par vague 5. |
| **D** | **_writer-package complet Couches 1/2/3 (vague 3)** | Directeur | ✅ | 2026-05-16 | [`3-briefs/brief-histoire.md`](3-briefs/brief-histoire.md) refondé : Couche 1 ref → `equipe/_writer-system.md` + Couche 2 brief + Couche 3 vision guidé. Format : système/utilisateur (DEC-WRITER-ARCH-001). **LIVRÉ** |
| 3 | ~~Briefs~~ (archivé vague 1-2) | — | ❌ | 2026-05-12 | [`3-briefs/`](3-briefs/) — **REFONTE VAGUE 3 COMPLÉTÉE** (étapes B/C/D ✅) |
| **4-V6** | **14 Versions writers — VAGUE 6** | 14 Writers | ✅ **14/14** | 2026-07-10 | [`4-versions-writers/`](4-versions-writers/) — 14/14 produites sur briefs v6 (6 Claude agents + kimi-reco-guide agent + 7 via CLI `call-llm.mjs` d'emblée, leçon LP2 appliquée). Mots corps : opus-def 502 · opus-reco 523 · sonnet-def 484 · sonnet-reco 496 · haiku-def 523 · haiku-reco 443 · kimi-reco 475 · kimi-k26-instant 506 · kimi-k26-thinking 532 · kimi-reco-guide 426 · deepseek-def 386 · deepseek-reco 618 · grok-def 391 · grok-reco 382. ⚠️ 4 hors gabarit résiduels après 1 retry strict (deepseek/grok) — laissés au jugement lecture annotée (chips trop court/long). 🔧 **Leçon infra 2026-07-10** : endpoint gratuit `kimi-for-coding` n'accepte plus que `temperature: 1` (0.6 → HTTP 400) — frontmatter kimi-reco documente la temp forcée. 🔧 **Leçon agents** : les 2 writers Haiku (agents) ont AFFIRMÉ avoir sauvegardé sans Write réel — fichiers reconstruits par l'orchestrateur depuis leurs rapports (règle vérif claims confirmée). **Vague 5 complète archivée `_archive/vague-5/`** (14 versions + 12 fiches panel + synthèse + sélection v2 + gatekeeper). `site/lecture-data.js` chargé avec les 14 textes anonymisés (ordre mélangé seed fixe) → étape 5 = lecture annotée Papa Yann. |
| 4 | ~~**14 Versions writers — VAGUE 5**~~ (archivé) | 14 Writers | ✅→📦 | 2026-07-03 | [`4-versions-writers/`](4-versions-writers/) — **14/14 persistées**. 11 initiales (6 Claude + kimi-k26-instant + deepseek déf/reco + grok déf/reco) **+ 3 Kimi récupérés via CLI** (`kimi-reco` 487 · `kimi-reco-guide` **546** (resserré depuis 564) · `kimi-k26-thinking` **542** (resserré depuis 561)). **TOUTES dans 400-550 mots** (haiku-def 428 · haiku-reco 470 · opus-def 507 · opus-reco 499 · sonnet-def 470 · sonnet-reco 476 · deepseek-def 549 · deepseek-reco 497 · grok-def 483 · grok-reco 414 · kimi-k26-instant 528 · kimi-reco 487 · kimi-reco-guide 546 · kimi-k26-thinking 542). **Les 3 Kimi ont été récupérés par Papa Yann via `call-llm.mjs` CLI** (contournement du **timeout du transport MCP** sur générations longues 188-396 s). ⚠️ **LEÇON MCP/INFRA** : la conclusion « panne infra Moonshot » était **FAUSSE** — le canal Kimi répond en ~1.9 s ; la vraie cause est le timeout du transport MCP sur les writers longs. **Règle : sur échec MCP d'un writer long, basculer sur `infra/mcp/call-llm.mjs` (Bash timeout 600 s), ne PAS conclure à une panne infra.** Vague 4 archivée `_archive/vague-4/`. |
| 4-v4 | ~~14 Versions writers vague 4~~ | 14 Writers | ✅→📦 | 2026-05-17 | Produites (commit 634c5041). **Archivées 2026-07-03** `_archive/vague-4/` (16 versions + 20 fiches panel + synthèse + sélection). |
| **5-V6** | **Lecture annotée Papa Yann (instrument principal) + panel v2** | Papa Yann (lecture.html) + Panel v2 | 🟢 (panel ✅ / lecture ⏳) | 2026-07-11 | **Panel v2 ✅ 12/12** — 12 fiches `5-lecteurs-temoins/G{1-4}-<profil>-<modèle>.md` (Kimi présent sur les 4 groupes via CLI). Synthèse : [`5-synthese-lecteurs.md`](5-synthese-lecteurs.md). **TOP 5 (rang moyen, deepseek-reco EXCLUE car corrompue = rang NUL non significatif, régénérée depuis)** : 1.**claude-sonnet-def (3.0 — écrase : 9 top-3, 0 fond)** · 2.claude-opus-reco (5.5) · 3.claude-sonnet-reco (5.67) · 4.kimi-k26-thinking (6.33, clivant) · 5.claude-opus-def (6.92, bimodal). **3 patterns clés** : (a) callback/refrain d'un petit mot rejoué physiquement = moteur mémoriel n°1 ; (b) fin qui relance (« Encore »/« On recommence »/« J'ai faim ») = tueur unanime côté coucher ; (c) mots d'adulte (« sérénité », « quatre-vingt-dix degrés ») font buter la lecture. **Lecture annotée Papa Yann = ⏳ TOUJOURS L'INSTRUMENT PRINCIPAL** (le panel mesure l'acceptable, pas le goût — leçon vague 5). **Étape 6 NON lancée** (attente lecture annotée / instruction). |
| 5 | ~~**Panel v2 hétérogène (12 calls) — REFAIT sur les 14**~~ (vague 5, archivé) | Panel v2 + Directeur | ✅→📦 | 2026-07-03 (soir) | **RE-PANEL COMPLET sur 14 versions.** 12 fiches : `5-lecteurs-temoins/G{1-4}-<profil>-<modèle>.md` (4 groupes × 3 modèles). **Kimi présent sur les 4 groupes via CLI `call-llm.mjs`** (le MCP `ask_kimi` timeout sur prompts 46 KB → fallback CLI, exit 0 partout — PAS de panne infra, PAS de substitution de l'axe Kimi). Chaque fiche = 14 versions notées + 2 tranches d'âge. Synthèse : [`5-synthese-lecteurs.md`](5-synthese-lecteurs.md). **TOP 5 CONSOLIDÉ (rang moyen 12 fiches)** : 1.**claude-opus-def (3.5)** · 2.claude-sonnet-reco (5.2) · 3.deepseek-reco (5.7) · 4.claude-sonnet-def (6.1) · 5.kimi-reco (6.1). **opus-def écrase** (8 top-3, 0 fond-3, consensus max). **Les 3 Kimi absents avant** : kimi-reco #5, kimi-k26-thinking #9, kimi-reco-guide #11 — **aucun ne déloge le top 4**. Patterns « à éviter » confirmés : pose floue/abstraite, pose sur genou/roseau (hors-contact), **fin qui repart/pirouette (les 4 = des Kimi)**, ouverture trop descriptive, mots d'adulte. **Panel partiel 11 versions ARCHIVÉ** `_archive/5-panel-partiel-11versions-2026-07-03/` (NE PAS réutiliser). Test calibration one-shot toujours SAUTÉ (ticket TEST-PANEL-CALIBRATION). **Étape 6 NON lancée** (attente instruction). |
| 6 | ~~**Sélection v2 (re-panel vague 5)**~~ (obsolète — vague 6 lancée à la place de la validation, décision Papa Yann 2026-07-10 ; archivée [`_archive/vague-5/6-selection.md`](_archive/vague-5/6-selection.md)) | Directeur | 📦 | 2026-07-04 | v2 — **v2 PRODUITE, EN ATTENTE AUTEUR** (SLA 3j → 🔴 au 2026-07-07). **Base = `claude-opus-def`** (meilleur pivot + fin du corpus, consensus panel max 3.5, 0 fond-3) **+ greffe d'ouverture PRIORITAIRE** (patron `deepseek-reco` : action + voix d'emblée) car l'ouverture d'opus-def (pile sensorielle + décor gratuit « étang si peu profond ») **viole 2 contre-goûts auteur CONFIRMÉS** et a été rejetée à chaud. Greffe clôture optionnelle : `kimi-reco` « on l'a presque **vue** ». v1 (base vague 2, 2026-05-14) archivée `_archive/6-selection-v1-vague2-PERIME-2026-05-14.md`. |
| 7 | Rewrite | Writer du top 1 | ⚪ | — | [`7-rewrite/`](7-rewrite/) |
| 8 | ~~GateKeeper (vague 5)~~ (archivé [`_archive/vague-5/8-gatekeeper-verdict.md`](_archive/vague-5/8-gatekeeper-verdict.md)) | GateKeeper | 📦 | 2026-07-07 | Verdict vague 5 — **1 correction mineure** : Wex sous-doté (1 seule réplique, brief ≥2). Ajout 1 dialogue court. Reste : 23/24 critères ✅. Après correction → PASS automatique. |
| 9 | Re-relecture (panel 20) | 20 Témoins | ⚪ | — | [`9-relecture-rewrite/`](9-relecture-rewrite/) |
| 10 | Canon finalisé | Directeur + PMO | ⚪ | — | [`10-texte.md`](10-texte.md) |

---

## Validations auteur (3 obligatoires)

- [x] **Étape 1 — Pitch** validé : 2026-05-12 (recentrage Nono uniquement finalisé)
- [ ] **Étape 6 — Sélection** validée : ___ (⏳ v2 produite 2026-07-04, EN ATTENTE AUTEUR — base opus-def + greffe ouverture deepseek-reco)
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

### 2026-07-11 — Étape 5-V6 : panel v2 12/12 dépouillé + synthèse produite

**Fait** : Directeur a lu les 12 fiches vague 6 et produit `5-synthese-lecteurs.md` (classement consolidé, patterns, citations, divergences, lecture Directeur).

**⚠️ deepseek-reco CORROMPUE** : la version jugée par le panel était un fichier cassé (fragments illisibles « fréro-déglingo-écer », « pipillule »). Les 12 fiches la placent unanimement 14ᵉ *à cause du bug*, pas du contenu. **Rang NUL et non significatif → EXCLUE du classement de fond.** Elle a été régénérée depuis ; son verdict réel n'existe pas encore.

**TOP 5 (rang moyen 12 fiches, sur 13 versions valides)** : 1.**claude-sonnet-def 3.0** (écrase — 9 top-3/12, 0 fond) · 2.claude-opus-reco 5.5 · 3.claude-sonnet-reco 5.67 · 4.kimi-k26-thinking 6.33 (clivant, fin qui relance) · 5.claude-opus-def 6.92 (bimodal, « trop littéraire » pour 4 ans au coucher chez plusieurs).

**3 patterns clés** : (1) le **callback-refrain d'un petit mot** (« Presque pas », « Ploc », caillou début-fin) rejoué physiquement par les enfants = moteur mémoriel n°1, sonnet-def le tient le mieux ; (2) **fin qui relance l'excitation** = tueur unanime côté dyade-coucher (« Encore », « On recommence », « J'ai faim ») ; (3) **mots d'adulte** (« sérénité qui rayonne », « quatre-vingt-dix degrés », « pivotait », « berge ») font buter la lecture à voix haute.

**Rappel discipline** : le panel mesure l'ACCEPTABLE robuste, PAS le goût de Papa Yann (leçon vague 5 : les 2 champions panel vague 4 rejetés). **La lecture annotée reste l'instrument principal.**

**Défaut de FORME repéré** : notes d'intention laissées en fin de fichier (opus-reco, un cas sonnet-def) « gâchent la lecture au coucher » — à nettoyer avant tout rewrite.

**Étape 6 NON lancée** (consigne). Prochaine action : lecture annotée Papa Yann → ingestion → arbitrage étape 6.

---

### 2026-07-10 — VAGUE 6 LANCÉE : briefs refondus (décision Papa Yann)

**Décision Papa Yann (2026-07-10)** : **relancer une vague 6 de writers** au lieu de valider la sélection v2 (rewrite v5). Raison : la lecture annotée du 2026-07-05 (45 annotations) + le duel vague 5 ont livré une mémoire de goût BIEN plus riche que ce dont disposaient les briefs v5 — elle mérite un nouveau tour d'exploration nourri, pas un simple patch du rewrite opus v5.

**La sélection v2 (`6-selection.md`) + le gatekeeper vague 5 (`8-gatekeeper-verdict.md`) restent archivés EN L'ÉTAT** — non canonisés, non poubellés. Étape 6 reste ⏳ historiquement, mais le pipeline repart de l'étape 3.

**Ce que le Directeur a produit (étape 3-V6)** :
1. **Vague 5 archivée** `_archive/3-briefs-vague5-2026-07-03/` (+ README expliquant pourquoi vague 6, et que sélection/gatekeeper v5 restent en l'état).
2. **`brief-histoire.md`** — le §5bis « goût auteur » est **refondu en QUALITÉS, plus en recettes** (piste **DEC-GOÛT-RECETTE-VS-QUALITÉ**) : la vague 5 disait « entre par la sensation » = procédé, ce qui a produit la conformité mécanique pile-sensorielle (toutes les ouvertures du panel v5 = même template) rejetée à chaud. La v6 dit la QUALITÉ visée (**fluidité = enchaînement**, critère n°1). **Verrou de mise en scène ajouté : c'est NONO qui libère** (sérénité qui monte, grand sourire vers Juju, décollage sur son mouvement — jamais Juju). Contre-goûts confirmés intégrés : confusion, pile sensorielle, décor gratuit, comparaison absconse, incohérence spatiale des corps, continuité micro cassée, narrateur qui philosophe, pirouette finale. Goûts confirmés : callback début↔fin, répliques d'enfant redisables, images concrètes-justes, trois corps figés + pose au point de contact.
3. **`brief-personnages.md`** — directive Nono libère figée dans son garde-fou ; Wex ≥ 2 répliques (leçon gatekeeper v5).
4. **`micro-briefs.md`** — menu d'angles COMMUN recalibré depuis palmarès + duel v5 (respect LP1 équité : aucun angle assigné par writer en input ; la diversité se fait en output via note d'intention).

**Inchangé (verrous durs)** : libellule bleue · 400-550 mots · verrou causal (libellule APRÈS contact Juju↔Nono) · Wex ≥ 2 répliques · anti-verbatim (aucune phrase du corpus dans un brief).

**Prochaine action** : le **main thread relance les 14 writers** (étape 4 vague 6). Le Directeur ne lance PAS les writers lui-même. `site/lecture-data.js` NON touché.

---

### 2026-07-08 — PMO : 3 décisions figées + UX lecture

**Session PMO narration 2026-07-08** : enregistrement des 3 décisions Papa Yann :
1. **DOCTRINE-INSTRUMENT-LECTURE** : lecture annotée devient l'instrument PRINCIPAL (verdict Papa Yann après vagues 4-5 : « clairement le plus intéressant, même sur fragments »). Prochaines vagues chargent lecture.html par défaut.
2. **CHIPS-V3** : 11 positif + 10 négatif en 3 lignes thématiques (co-construites session). Format lignesthématiques (tableau de tableaux) déployé site/lecture-data.js.
3. **FIX-UX-LECTURE** : panneau 55vh · paddingBottom calc(55vh+20px) · scrollIntoView block 'nearest'. Passage tapé reste visible 20px au-dessus du panneau.

**Fichiers** : `site/lecture.html` + `pmo/sprint-log.md` + `pmo/decisions.md` + `equipe/lecons-vivantes.md` + `gout/memoire-papa-yann.md` (trace chips v3). Commit a1dae0a3 (2026-07-08).

**État après session** : STORY-002 étape 6 reste ⏳ EN ATTENTE (SLA 2026-07-07 atteint). Outils de captage goût consolidés. Attente validation Papa Yann sur sélection v2 (6-selection.md).

---

### 2026-07-07 — DUEL VAGUE 5 INGÉRÉ : 13 segments + finales (papa Yann en duel A/B)

**Résultats bruts** : duel Papa Yann sur 13 paires de segments (Claude opus-reco / sonnet-def / haiku-reco / deepseek-reco) + 2 finales (deepseek-reco vs kimi-k26-instant). Scoring : **opus 3 wins · sonnet 2 · haiku 2 · deepseek 2** (égalité, pas de dominante). **5 segments non tranchés** (refusés "confus" ou trop long) → signal structurel PROCESS, pas erreur écriture.

**Signaux clés** :
1. Pas de source unique fragmentaire — les 4 modèles excellents chacun sur 1-3 segments
2. 5 refus sur défaut "confus" (les 7/8 perdants avec défaut) = tueur n°1 mémoire de goût confirmé
3. **Finale : 2 histoires entières rejetées** (deepseek-reco + kimi-k26-instant) — alligne REX 2026-07-04 "trop long / dialogue-final / trop longueur"
4. Papa Yann ne tranché pas vers un writer unique v5

**Implication étape 6** : base opus-def + greffe deepseek reste **valide** (opus-def gagne plusieurs duels, surtout fin ; deepseek-reco gagne l'ouverture fluidité). Vague 5 en standby pour arbitrage futur (micro-briefs v3 post-rewrite ?) ou intégration rewrite si base défaillante.

**Traçabilité** : duel ingéré dans `gout/palmares-writers.md` § Duel vague 5 + JSON `gout-duel-vague5-2026-07-07.json` (complet, 13 paires + scores).

**Prochaine action** : validation auteur étape 6 (SLA 2026-07-07 atteint). Directeur décide : (a) base opus-def + rewrite directeur (risque dilution) OU (b) attendre arbitrage duel vague 5 avant rewrite OU (c) greffe intégrale deepseek-reco + vérification fluidité.

---

### 2026-07-04 — Étape 6 v2 TRANCHÉE (re-panel vague 5 × goût auteur)

**Sélection produite** : `6-selection.md` v2. **Base = `claude-opus-def`** (rang panel 3.5, 8 top-3, 0 fond-3 — consensus max) **+ greffe d'ouverture PRIORITAIRE**.

**Arbitrage panel × goût auteur** : le panel plébiscite opus-def, MAIS son ouverture (« *L'eau tiède clapote… Le soleil chauffe… un étang si peu profond qu'on voit le fond partout* ») viole **2 contre-goûts CONFIRMÉS** — pile sensorielle juxtaposée + description décor gratuite (« on s'en fiche de cet étang ») — et a été **rejetée à chaud** par Papa Yann. Le critère n°1 CONFIRMÉ = **fluidité (enchaînement)**.

**Analyse fluidité des 5 tops** : `deepseek-reco` (#3) gagne l'ouverture (« *Juju court…* » — action + voix d'emblée, chaque phrase appelle la suivante). `sonnet-reco` (#2) partage le **même défaut** que opus-def. → **On garde le meilleur CORPS (opus-def : pivot le plus clair du corpus, pose au point de contact peau, fin sans pirouette) et on greffe le meilleur DÉBUT (patron deepseek-reco).** Défaut opus-def = local (3 phrases), greffable ; faiblesses deepseek-reco = diffuses dans le corps (pose sur main, pas au contact ; fin plate), non greffables.

**Greffes** : (1) ouverture patron `deepseek-reco` l.8-16 — PRIORITAIRE · (2) clôture `kimi-reco` « on l'a presque **vue** » — optionnel, SANS la fin-qui-repart ni le genou · (3) fil têtard `sonnet-def` — optionnel.

**Owner rewrite (si validé)** : writer top 1 = `claude-opus-def` via `narration-writer-claude-libre` (règle 2026-05-08). Repli Directeur si dilution/sur-réécriture. Plafond 1 cycle.

**Archivage** : v1 (base vague 2, 2026-05-14) → `_archive/6-selection-v1-vague2-PERIME-2026-05-14.md` (+ bandeau péremption). Miroir conservé `_archive/vague-4/6-selection.md`.

**Prochaine action** : validation auteur (SLA 3j → 🔴 au 2026-07-07). Si (a) validé → étape 7 rewrite opus. Question ouverte : (a) base opus-def + ouverture réécrite [reco Directeur] OU (b) base deepseek-reco fluide d'emblée.

---

### 2026-07-03 (nuit) — Étape 5 REFAITE : panel v2 complet sur les 14 versions

**Motif** : le panel v2 précédent n'avait jugé que 11 versions (les 3 Kimi récupérés tardivement en étaient absents). Juger un sous-ensemble casse l'égalité du concours (consigne Papa Yann). Panel entièrement relancé sur les **14**.

**Dispositif** : 12 appels = 4 groupes (garçon / fille / dyade papa / dyade maman) × 3 modèles (Sonnet agents + Kimi + Haiku[g1,g2]/DeepSeek[g3,g4]). Chaque appel a lu les 14 textes seuls (notes d'intention retirées) et rendu classement + retours + 2 tranches d'âge.

**🔧 Canal Kimi : ✅ présent sur les 4 groupes via CLI.** Confirmation de la leçon LP2 : le MCP `ask_kimi` timeout (~250 s transport) sur des prompts de 46 KB (14 textes) → bascule immédiate `infra/mcp/call-llm.mjs --provider kimi` (timeout 540 s), 4/4 exit 0. **La conclusion « Kimi indisponible / panne infra » du panel partiel précédent était FAUSSE.** DeepSeek aussi passé par le même CLI. AUCUNE substitution de l'axe Kimi — 3 modèles réellement hétérogènes par groupe.

**Résultat (top 5 sur 14, rang moyen consolidé)** : 1.claude-opus-def **3.5** (écrasant : 8 top-3, 0 fond-3) · 2.claude-sonnet-reco 5.2 · 3.deepseek-reco 5.7 · 4.claude-sonnet-def 6.1 · 5.kimi-reco 6.1. Les 3 Kimi jadis absents : **kimi-reco #5, kimi-k26-thinking #9, kimi-reco-guide #11** — aucun ne déloge le top 4. Contre-goût auteur confirmé par le panel : **les 4 fins « qui repartent / pirouette » sont toutes des Kimi**.

**Livrables** : 12 fiches `5-lecteurs-temoins/` + `5-synthese-lecteurs.md` (top 5, patterns, citations, lecture Directeur). Panel partiel 11 versions **archivé** `_archive/5-panel-partiel-11versions-2026-07-03/`.

**Prochaine action** : étape 6 (sélection) — **NON lancée** (consigne). Attente instruction / retour duel de goût Papa Yann.

---

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
