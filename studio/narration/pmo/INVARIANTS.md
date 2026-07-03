# Invariants Narration — Source de Vérité Unique

> **Tout chiffre clé ou règle structurelle vit ICI.** Le reste du projet pointe vers ce fichier.
> Si tu trouves un chiffre divergent ailleurs (ex: "8 versions" dans un kanban) → ce fichier gagne, l'autre est obsolète.

---

## Chiffres clés PROCESS (refonte 2026-05-08, étape 2 Brainstorm recréée 2026-05-15)

| Métrique | Valeur | Notes |
|----------|--------|-------|
| Étapes PROCESS | **11** (numérotées 0 à 10) | Owner / Inputs / Outputs / Critères PASS définis par étape. Étape 2 = Brainstorm (boss + équipe) depuis DEC-PROCESS-002. |
| Préfixage fichiers stories | **Oui depuis 2026-05-12** | `1-pitch-plan.md`, `3-briefs/`, `4-versions-writers/`, `5-lecteurs-temoins/`, `6-selection.md`, `7-rewrite/`, `8-gatekeeper-verdict.md`, `9-relecture-rewrite/`, `10-texte.md`. Fichiers transverses (kanban, README) sans préfixe. |
| Versions writers (étape 4) | **14** (refonte 2026-05-12 v2 — calibration multi-modèles) | 6 Claude (2 Opus + 2 Sonnet + 2 Haiku, déf/**reco**) + 4 Kimi (déf/reco/thinking/guidé) + 2 DeepSeek (déf/reco) + 2 Grok (déf/reco) — détail bloc *Casting writers étape 4* ci-dessous. "reco" = température recommandée créatif officielle (cf. [`../equipe/references/temperatures-llm.md`](../equipe/references/temperatures-llm.md)) |
| Panel lecteurs (étape 5) | **12 calls** (refonte 2026-07-03 DEC-PANEL-V2 — hétérogène) | 4 groupes profils (garçon seul / fille seule / dyade papa / dyade maman) × 3 modèles (Sonnet + Kimi + Haiku/DeepSeek). Chaque call : 2 tranches âge (3-5 + 6-7) en 1 dyade. Test calibration one-shot obligatoire avant STORY-003. Détail : bloc *Panel lecteurs hétérogène* ci-dessous. |
| Panel re-relecture (étape 9) | **12 calls** (structure identique étape 5 depuis 2026-07-03) | Unifiées : mêmes 4 groupes × 3 modèles. |
| Validations auteur obligatoires | **3** : étape 1 (Pitch), étape 6 (Sélection), étape 10 (Canon) — la Phase A du Brainstorm (2A) ajoute un point de validation léger, hors compte des 3 jalons durs |
| Intention Directeur (étape 3) | **1 ligne obligatoire par histoire** (DEC-BRIEF-CURSEUR 2026-07-03) | Section « Intention Directeur » dans brief-histoire.md. Critère sélection étape 6. Anti-Streisand : intention métier fixe, mise en scène writers libre. Ex: « Nono libère vs retient », « moment physique mémorable ». |
| Plafond rewrite (étape 7) | **1 cycle max** par histoire |
| SLA "EN ATTENTE AUTEUR" | **3 jours** → au-delà : kanban 🔴 BLOQUÉ |
| Max tickets actifs PMO | **3** simultanés |
| Fichiers obsolètes étape 3 | **brief-univers.md** (contenu → _writer-system.md), **_writer-package.md** (remplacé brief-histoire.md format Couche 2+3) — depuis 2026-05-15 DEC-WRITER-ARCH-001 |

---

## Casting writers étape 4 (14 versions — refonte calibration 2026-05-12 + architecture 2026-05-15)

> **Source de vérité unique pour "combien de writers / quels modèles / libre vs guidé / température"**. Détail mécanique d'appel : `narration/equipe/PROCESS.md` § Étape 4.
> **Refonte 2026-05-12** : passage de 10 → 14 writers pour calibration modèles+température sur 3-5 histoires (réduction à config finale après). Test : Opus/Sonnet/Haiku défaut vs créatif + Kimi thinking vs non-thinking + DeepSeek/Grok étendus.
> **Architecture system/user 2026-05-15** (DEC-WRITER-ARCH-001) : tous writers reçoivent **system = `equipe/_writer-system.md`** (Couche 1 universelle, figée par arc) + **user = `stories/NNN/3-briefs/brief-histoire.md`** (Couche 2 histoire + Couche 3 guidé). Conséquences : `brief-univers.md` OBSOLÈTE (contenu → system.md), `_writer-package.md` OBSOLÈTE (remplacé par split system/user).

| Bloc | # | Identité | Modèle | Thinking/Reasoning | Température | Top-p | Invocation | Brief |
|------|---|----------|--------|--------------------|-------------|-------|------------|-------|
| **Claude** | 1 | claude-opus-def | `claude-opus-4-8` | low | **défaut Anthropic** (param non envoyé, ≈1.0) | défaut | `narration-writer-claude-libre` | LIBRE |
| | 2 | claude-opus-reco | `claude-opus-4-8` | low | **1.0** (plafond Anthropic = reco créatif) | défaut | `narration-writer-claude-libre` | LIBRE |
| | 3 | claude-sonnet-def | `claude-sonnet-5` | low | défaut Anthropic | défaut | `narration-writer-claude-libre` | LIBRE |
| | 4 | claude-sonnet-reco | `claude-sonnet-5` | low | 1.0 | défaut | `narration-writer-claude-libre` | LIBRE |
| | 5 | claude-haiku-def | `claude-haiku-4-5` | low | défaut Anthropic | défaut | `narration-writer-claude-libre` | LIBRE |
| | 6 | claude-haiku-reco | `claude-haiku-4-5` | low | 1.0 | défaut | `narration-writer-claude-libre` | LIBRE |
| **Kimi** | 7 | kimi-reco | `kimi-k2.7-code` (gratuit endpoint `api.kimi.com/coding/v1`) | n/a | **0.6** (reco créatif Moonshot Instant) | — (param non exposé) | `ask_kimi` (MCP gratuit) | LIBRE |
| | 8 | kimi-k26-instant | `kimi-k2.6` (payant endpoint `api.moonshot.ai/v1`) | **disabled** (forcer Instant) | fixe K2.6 (ignoré API) | 0.95 fixe K2.6 | **`ask_kimi_payant`** (`thinking: "disabled"`) | LIBRE |
| | 9 | kimi-k26-thinking | `kimi-k2.6` (payant endpoint `api.moonshot.ai/v1`) | **enabled** (défaut K2.6) | fixe K2.6 (ignoré API) | 0.95 fixe K2.6 | **`ask_kimi_payant`** (`thinking: "enabled"` ou omis) | LIBRE |
| | 10 | kimi-reco-guide | `kimi-k2.7-code` (gratuit endpoint `api.kimi.com/coding/v1`) | n/a | 0.6 (reco créatif Instant) | — (param non exposé) | `narration-writer-kimi-guide` → `ask_kimi` gratuit | **GUIDÉ** (axes 1-6 + leçons + trame histoire) |
| **DeepSeek** | 11 | deepseek-def | `deepseek-v4-pro` | off | **défaut DeepSeek** (1.0 API = 0.3 modèle réel) | défaut | `ask_deepseek` (MCP) | LIBRE |
| | 12 | deepseek-reco | `deepseek-v4-pro` | off | **1.5** (reco officielle DeepSeek creative writing) | défaut | `ask_deepseek` (MCP) | LIBRE |
| **Grok** | 13 | grok-def | `grok-4.3` | low | **défaut xAI** (≈1.0, param non envoyé) | défaut | `ask_grok` (MCP) | LIBRE |
| | 14 | grok-reco | `grok-4.3` | low | **1.2** (haut reco créatif — au-delà 1.5 = incohérent) | défaut | `ask_grok` (MCP) | LIBRE |

> **Règles "température"** :
> - `def` = ne PAS envoyer le param. Laisse le fournisseur appliquer son défaut.
> - `reco` = valeur officielle "creative writing" du fournisseur (cf. [`../equipe/references/temperatures-llm.md`](../equipe/references/temperatures-llm.md) — doc autorité).
> - Référence Papa Yann 2026-05-12 : "max → reco" parce que `2.0` Grok/Kimi = incohérent narratif.
>
> ⚠ **Cohabitation stricte MCP Kimi (refonte 2026-05-12 — résout ARCHI-009)** :
> - **`ask_kimi`** (gratuit, endpoint `kimi.com/coding/v1`, env `MOONSHOT_API_KEY`) → writers #7 kimi-reco + #10 kimi-reco-guide + tout usage général. Modèle `kimi-for-coding`. Temp 0.6 reco Moonshot Instant.
> - **`ask_kimi_payant`** (officiel, endpoint `api.moonshot.ai/v1`, env `MOONSHOT_PAYANT_API_KEY`) → STRICTEMENT writers #8 kimi-k26-instant (thinking disabled) + #9 kimi-k26-thinking (thinking enabled). Modèle `kimi-k2.6`. Temp et top_p fixes par K2.6 (params ignorés par l'API — seul `thinking` est contrôlable, doc Moonshot).
> - **Différenciation K2.6** : sur K2.6, le SEUL levier est `thinking: {"type": "enabled"|"disabled"}`. Temp et top_p sont fixes côté modèle (doc officielle 2026-05-13 https://platform.kimi.ai/docs/api/models-overview#parameter-comparison).
> - Détail : [`infra/mcp/MODELS.md`](../../../infra/mcp/MODELS.md) — *Cohabitation stricte*.

**Total : 13 writers LIBRES + 1 writer GUIDÉ = 14 versions.**

**Note casting FIGÉ** : Casting **14 writers IMMUABLE**. Retrait du writer #9 (kimi-k26-thinking) PROPOSÉ par PMO 2026-05-16, **REFUSÉ par Papa Yann 2026-05-17**. Le writer #9 est et reste dans le casting — **il a été produit en vague 4 STORY-002 comme les 13 autres** (commit 634c5041). AUCUNE exclusion d'aucune vague. AP-WRITER-THINKING-001 (flop 20/20 vague 3) = **observation** liée à l'ancien brief GPS sur-spécifié, PAS un motif de retrait/exclusion. Jamais régresser sans décision auteur explicite datée. Réf : mémoire feedback-regle-figee-alerte (un agent propose, ne décide jamais).

**Évaluation** : après 3-5 histoires, arbitrage réduction à config finale (~6-8 writers optimaux). Ticket `ARCHI-008` pour suivi (cf. backlog).

### Leviers de variance (imposables par Directeur dans `brief-histoire.md`)

| Levier | Options |
|--------|---------|
| **Température** | Param MCP par writer (Claude : 0.0–1.0 / Kimi/DeepSeek/Grok : 0.0–2.0). Si non spécifiée → défaut modèle. |
| **Angle narratif** | Sobre · Sensoriel · Dynamique (dialogues) · Instinct (libre) |
| **POV / focal** | Wex témoin · perso A · perso B · narrateur invisible |
| **Ouverture** | In medias res · ouverture lente · dialogue d'amorce |
| **Longueur cible** | 400 mots · 550 mots · 700 mots |

### 6 axes du writer GUIDÉ (annexe AXES 1-6 → `narration-writer-kimi-guide`)

1. **Créature vivante** (objet/lieu/élément a une âme)
2. **Geste avant parole** (action physique avant dialogue)
3. **Onomatopée légère** (ploc, frou, tsing — pas BOUM)
4. **Fin rituel** (clôture par geste répété, pas morale)
5. **Mystère vs résolution** (laisser zone d'ombre)
6. **Faute volontaire** (détail "imparfait" qui rend humain)

Règle : le writer guidé active **2-3 axes librement, jamais 4+**. Source vivante : `equipe/lecons-vivantes.md`.

---

## Panel lecteurs hétérogène (refonte 2026-07-03 DEC-PANEL-V2)

**Changement règle figée 2026-07-03** : panel 20 → **panel 12 calls** (étapes 5 + 9 unifiées).

**Structure 4 groupes profils × 3 modèles** :

| Groupe | Profil | Modèle 1 | Modèle 2 | Modèle 3 | Output |
|--------|--------|----------|----------|----------|--------|
| 1 | Garçon seul (4.5 ans) | Sonnet 4.6 | Kimi K2.6 forfait code | Haiku 4.5 | 1 call → 2 tranches âge (3-5 + 6-7) dyade ✅ |
| 2 | Fille seule (4.5 ans) | Sonnet 4.6 | Kimi K2.6 forfait code | Haiku 4.5 | idem |
| 3 | Dyade Papa-Enfant | Sonnet 4.6 | Kimi K2.6 forfait code | DeepSeek V4 | idem |
| 4 | Dyade Maman-Enfant | Sonnet 4.6 | Kimi K2.6 forfait code | DeepSeek V4 | idem |

**Bilan** : 4 calls × 3 modèles = **12 appels totaux** (vs 20 précédemment). Chaque call rend 2 tranches (3-5 + 6-7) comme 1 diade.

**Rationale** : 
- Panel homogène (20 Sonnet) créait risque convergence mécanique (vague 3 STORY-002 : 11/14 writers identiques gestes mineurs)
- Modèles hétérogènes (Sonnet standard + Kimi créatif + Haiku/DeepSeek agilité) testent divergence réelle perceptuelle
- 12 calls = ~3× moins cher (CoT pricing), plus rapide

**Test calibration obligatoire** (DEC-PANEL-V2) : avant full deployment STORY-003+, tester 2 paires de benchmarks :
- Paire 1 : écart connu (vague 3 kimi-run1 vs grok-run1), mesurer reproductibilité
- Paire 2 : quasi-identique, mesurer faux positif convergence

**Ticket tracking** : TEST-PANEL-CALIBRATION (à faire 2026-07-03, cible 2026-07-15).

**Source de vérité** : `pmo/decisions.md` DEC-PANEL-V2 (figée 2026-07-03).

---

## Casting figé (V1 Christ FR)

10 persos (9 + Wex), figé 2026-04-24, ajusté 2026-05-05, **rename T3 2026-05-13**.

**Gabarit structure** : chaque perso (`type-NN/` ou `wex/`) suit le gabarit figé 5 fichiers (DEC-GABARIT-PERSO-001, 2026-05-15) : README · enneagramme · personnage · alive · voix. Source détail : [`../personnages/INDEX.md`](../personnages/INDEX.md) § Gabarit figé.

| Type | Prénom complet | Diminutif | Sexe |
|------|----------------|-----------|------|
| 0 hors-système | Wex | Wex | invariant cross-culture |
| 1 Perfectionniste | Melchisédech | Melki | M |
| 2 Aidant | Marie | Mimi | F |
| 3 Performeur | David | Dadou | M |
| 4 Individualiste | Madeleine | Madie | F |
| 5 Observateur | Luc | Lulu | M |
| 6 Loyal | Pierre | Pierrot | M |
| 7 Enthousiaste | Raphaëlle | Raph | F |
| 8 Challenger | Judith | Juju | F |
| 9 Pacificateur | Noé | Nono | M |

Bilan : **4F / 5M + Wex**. Source : [`../personnages/INDEX.md`](../personnages/INDEX.md).
**Historique** : Polo (Paul) → Dadou (David) 2026-05-13 (collision sonore Polo↔Nono, voir `decisions.md` DEC-RENAME-POLO-DADOU).

---

## Voice IDs ElevenLabs (état 2026-05-13)

| Perso | Voice ID | Méthodo | Naming bibliothèque |
|-------|----------|---------|---------------------|
| Wex | `G54e8CyYslC2Y4ZupTlg` | v24 | Lumi Wex Héros |
| Dadou | `5wcx0KzRnrP48I5RCVD8` | v2 | Lumi Dadou Fier |
| Melki | `sWfumkYiI1QERQ5INqRQ` | v1 | Lumi Melki Précis |
| Pierrot | `ukIKjXqbiGGkqIz0SW5c` | pré-v24 | (conservé) |
| Raph | `Te5RKnm9ebwdEvZ1S5pS` | pré-v24 (conservé) | Lumi Raph Vive |
| Lulu | `1XwHANMW4m2pxt7buPmQ` | v1 (filtre cumulatif vaincu) | Lumi Lulu Léger |
| Nono | `f3w48h8ngnWWnhO9XGb3` | pré-v24 (conservé) | Lumi Nono Paisible |
| Juju | `WFNYCPhDQM9w07KAV6Be` | v1 (méthodo v24 fille) | Lumi Juju Solide |
| Mimi | `aPQfyqve0ovOsJIl7EzX` | v1 (méthodo v24 fille) | Lumi Mimi Attentive |
| Madie | `9JvOiMFLj8GdHK3Fcydn` | v1 (méthodo v24 fille) | Lumi Madie Vibrante |

> **Narrateurs** : `narrateur_h` = `cbRcktt2xvoeFpdvW2wg` · `narrateur_f` = `aHKEGRjW94hqXc6gaItG` (créés, dans `voice-map.json` depuis 2026-05-16).

Détail complet : [`../personnages/voix-meta/_VOICE-IDS-CASTING.md`](../personnages/voix-meta/_VOICE-IDS-CASTING.md). Résolveur de production : [`../personnages/voix-meta/voice-map.json`](../personnages/voix-meta/voice-map.json) (lookup par `role`).
**Historique** : Polo → Dadou (2026-05-13, voice_id conservé `5wcx0KzRnrP48I5RCVD8`, naming ElevenLabs "Lumi Polo Fier" → "Lumi Dadou Fier" par utilisateur).

---

## Production audio multi-voix (figée 2026-05-16 + 3 durcissements 2026-05-16 14:00)

**Méthode officielle** : MCP `studio_audiobook_from_segments_v2_dialogue` (wrapper text-to-dialogue ElevenLabs API).

| Métrique | Valeur | Notes |
|----------|--------|-------|
| **Voie par défaut OBLIGATOIRE** | **MCP `studio_audiobook_from_segments_v2_dialogue`** (durcissement #1, 2026-05-16) | Orchestre text-to-dialogue API, concat, loudnorm. Clé API en env MCP. Fallback = script CLI debug seulement. |
| **Modèle ElevenLabs FORCÉ** | **`eleven_v3`** (durcissement #2, 2026-05-16) | Seul modèle supportant audio tags v3 inline (`[softly]`, `[excited]`, etc.). Pas d'autre modèle, pas de fallback, jamais inventer. |
| **Résolveur voice_ids unique** | **`narration/personnages/voix-meta/voice-map.json`** (durcissement #3, 2026-05-16) | Lookup clé `role` → voice_id. Source humaine autorité = `_VOICE-IDS-CASTING.md`. Vieux voice_ids rejetés automatiquement. |
| Endpoint API | `POST /v1/text-to-dialogue` (via MCP wrapper) | Multi-voix natif, cohérence prosodique |
| Plafond caractères par requête | **2000** (total, y.c. tags v3) | Dur. MCP packetise auto. |
| Voice IDs par appel | **Jusqu'à 10** | MaxPlay utilise 10 persos + narrateurs (2 max par appel) |
| Audio tags supportés | Oui, avec `eleven_v3` | Catalogue complet dans skill `audio-direction-elevenlabs` |
| Moteur concat final | ffmpeg `loudnorm` | Concat 2-3 paquets text-to-dialogue SEULEMENT (pas 32 segments) |
| Anti-pattern | ❌ 32+ TTS séparés | Produit transitions abruptes, volumes inégaux, intonations cassées |
| Agent owner | `narration-audio` (Sonnet) | Adapte le canon (délègue à `narration-audio-writer` si dense), pose les tags, écrit les segments JSON, lance le MCP. Pas d'agent `voice-director` séparé. |
| Script legacy | `narration/scripts/generate-story-dialogue.js` | Fallback CLI debug seulement. L'ancien `generate-story-audio.js` (32+ TTS mono) est DÉPRÉCIÉ/archivé 2026-05-16. |

**Méthodologie** :
1. Préparer texte canon + tags v3 inline (`[softly]`, `[excited]`, etc.)
2. Créer JSON segments : `[{role: "wex", text: "..."}]`
3. Appeler MCP `studio_audiobook_from_segments_v2_dialogue` (voice-map.json lookup auto)
4. MCP packetise < 2000 char, 1 appel API par paquet, concat + loudnorm inline
5. Sortie : 1 MP3 multi-voix cohérent

**Owner production audio** : agent `narration-audio` + MCP outil. Consigne : adapter le canon, poser les tags, écrire les segments, appeler le MCP.

**Source de vérité** : `pmo/decisions.md` DEC-AUDIO-PRODUCTION-001 v3 (figée 2026-05-16 14:00, jamais régresser sans décision explicite).

---

## Patte narrative

**B+D+C** : Kishōtenketsu + tranche de vie + cycle.

Source : [`../equipe/patte-narrative-maxplay.md`](../equipe/patte-narrative-maxplay.md).

---

## Casting V1 — Obligatoire pour skills CRAFT (DEC-NARR-CRAFT-RESURRECTION 2026-06-08)

**Tous les skills CRAFT (16 masterclass narrative) OBLIGATOIREMENT utilisent CASTING V1 FIXÉ** (Wex + 9 types, 4F/5M).

**Ancien casting DEPRECATED** (avant 2026-04-24) : Léo, Sam, Lila, Élia, Camille, Victor, Iris, Theo, Noa — ne JAMAIS invoquer dans un skill CRAFT.

**Remap type-by-type (ANCIEN → V1)** — ⚠️ **corrigé 2026-06-08** (la 1ʳᵉ version mélangeait les types : elle appariait les vieux prénoms aux types dans l'ordre de la liste au lieu de leur ennéatype réel) :
- Type 1 Perfectionniste: **Élia** (F) → **Melki** (M) ⚠️ genre change
- Type 2 Aidant: **Camille** (F) → **Mimi** (F)
- Type 3 Performeur: **Victor** (M) → **Dadou** (M)
- Type 4 Individualiste: **Iris** (F) → **Madie** (F)
- Type 5 Observateur: **Theo** (M) → **Lulu** (M)
- Type 6 Loyal: **Noa** (M) → **Pierrot** (M)
- Type 7 Enthousiaste: **Léo** (M) → **Raph** (F) ⚠️ genre change
- Type 8 Challenger: **Sam** (M) → **Juju** (F) ⚠️ genre change
- Type 9 Pacificateur: **Lila** (F) → **Nono** (M) ⚠️ genre change
- Type 0 hors-système: Wex → **Wex** (invariant)

⚠️ **4 changements de genre** (types 1, 7, 8, 9) → au remap, corriger les accords dans les phrases d'exemple (« toute seule » → « tout seul », pronoms, participes).

**Résultat remap** : 4F (Mimi/Madie/Raph/Juju) + 5M (Melki/Dadou/Lulu/Pierrot/Nono) + Wex = **V1 CANON partout**.

**Anti-pattern banni** : utiliser vieux prénoms (Léo, Élia, Victor, etc.) dans un skill CRAFT. Remap systématique ou rejeter le skill comme dépréciée.

---

## Règles d'or structurelles

1. **Casting V1 figé** — ne pas inventer de prénoms hors casting
2. **Surnoms 4/5 du temps** dans les histoires — prénom complet réservé au solennel
3. **Ennéatype DILUÉ** — jamais nommé explicitement dans le texte
4. **Univers IMPLICITE** — pas d'exposition, montrer en touches légères
5. **Parents hors-scène** — jamais d'adulte sauveur, l'histoire se résout entre enfants
6. **Pas de morale** — la promesse du titre se tient, le lecteur infère
7. **Onomatopées 0 ou 1** par histoire, choisie dans `cross-culture/onomatopees/catalogue-onomatopees.md`
8. **Writer du top 1 garde la main au rewrite** (règle 2026-05-08) — pas de greffes externes
9. **Conservation matière fabrication** — `versions-writers/`, `lecteurs-temoins/`, etc. NE SONT JAMAIS SUPPRIMÉS après canonisation
10. **Zéro négation dans Voice Design ElevenLabs** (AP#16)

---

## Histoires (état production)

| # | Titre | Statut | Owner courant |
|---|-------|--------|---------------|
| 001 | Le Pont Cassé | ✅ canon (refonte 2026-05-08) | — |
| 002 | La Libellule impossible | 🟡 **étape 6 sélection en cours** (étapes 0-5 ✅, Q-ouvertes → DEC-TENSION-RESONANCE 2026-05-12, casting Wex+Juju+Nono, panel 20 lecteurs ✅, top writers identifiés) | Directeur (arbitrage sélection) |
| 003+ | À démarrer | ⚪ — | — |

---

## Comment utiliser ce fichier

**Quand consulter** :
- Avant d'écrire un chiffre clé dans un kanban / pitch / brief
- Avant de valider une décision qui touche au PROCESS
- En cas de doute "c'est 6 ou 20 lecteurs ?"

**Quand mettre à jour** :
- Toute décision qui modifie un chiffre clé → MAJ ici **avant** de propager ailleurs
- Toute création d'un voice_id → ajouter ici **et** dans `_VOICE-IDS-CASTING.md` **et** `voice-map.json`
- Toute évolution casting → ici + `personnages/INDEX.md`

**Règle** : ce fichier est court par design (~120 lignes utiles). Si tu veux ajouter une section longue → la mettre ailleurs et pointer ici.
