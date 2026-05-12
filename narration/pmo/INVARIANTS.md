# Invariants Narration — Source de Vérité Unique

> **Tout chiffre clé ou règle structurelle vit ICI.** Le reste du projet pointe vers ce fichier.
> Si tu trouves un chiffre divergent ailleurs (ex: "8 versions" dans un kanban) → ce fichier gagne, l'autre est obsolète.

---

## Chiffres clés PROCESS (refonte 2026-05-08)

| Métrique | Valeur | Notes |
|----------|--------|-------|
| Étapes PROCESS | **10** (0, 1, 3-10 — étape 2 supprimée 2026-05-12 par fusion avec étape 1) | Owner / Inputs / Outputs / Critères PASS définis par étape |
| Préfixage fichiers stories | **Oui depuis 2026-05-12** | `1-pitch-plan.md`, `3-briefs/`, `4-versions-writers/`, `5-lecteurs-temoins/`, `6-selection.md`, `7-rewrite/`, `8-gatekeeper-verdict.md`, `9-relecture-rewrite/`, `10-texte.md`. Fichiers transverses (kanban, README) sans préfixe. |
| Versions writers (étape 4) | **14** (refonte 2026-05-12 v2 — calibration multi-modèles) | 6 Claude (2 Opus + 2 Sonnet + 2 Haiku, déf/**reco**) + 4 Kimi (déf/reco/thinking/guidé) + 2 DeepSeek (déf/reco) + 2 Grok (déf/reco) — détail bloc *Casting writers étape 4* ci-dessous. "reco" = température recommandée créatif officielle (cf. [`../equipe/references/temperatures-llm.md`](../equipe/references/temperatures-llm.md)) |
| Panel lecteurs (étape 5) | **20** dès STORY-003. Transitoire **6** pour 002 (commencé avant la décision panel 20) |
| Panel re-relecture (étape 9) | **20** dès STORY-003. Transitoire **6** pour 002 |
| Validations auteur obligatoires | **3** : Étape 1 (Pitch), Étape 6 (Sélection), Étape 10 (Canon) |
| Plafond rewrite (étape 7) | **1 cycle max** par histoire |
| SLA "EN ATTENTE AUTEUR" | **3 jours** → au-delà : kanban 🔴 BLOQUÉ |
| Max tickets actifs PMO | **3** simultanés |

---

## Casting writers étape 4 (14 versions — refonte calibration 2026-05-12)

> **Source de vérité unique pour "combien de writers / quels modèles / libre vs guidé / température"**. Détail mécanique d'appel : `narration/equipe/PROCESS.md` L.108-140.
> **Refonte 2026-05-12** : passage de 10 à 14 writers pour calibration modèles+température sur 3-5 histoires (réduction à config finale après). Test : Opus/Sonnet/Haiku défaut vs créatif + Kimi thinking vs non-thinking + DeepSeek/Grok étendus.

| Bloc | # | Identité | Modèle | Thinking/Reasoning | Température | Top-p | Invocation | Brief |
|------|---|----------|--------|--------------------|-------------|-------|------------|-------|
| **Claude** | 1 | claude-opus-def | `claude-opus-4-7` | low | **défaut Anthropic** (param non envoyé, ≈1.0) | défaut | `narration-writer-claude-libre` | LIBRE |
| | 2 | claude-opus-reco | `claude-opus-4-7` | low | **1.0** (plafond Anthropic = reco créatif) | défaut | `narration-writer-claude-libre` | LIBRE |
| | 3 | claude-sonnet-def | `claude-sonnet-4-6` | low | défaut Anthropic | défaut | `narration-writer-claude-libre` | LIBRE |
| | 4 | claude-sonnet-reco | `claude-sonnet-4-6` | low | 1.0 | défaut | `narration-writer-claude-libre` | LIBRE |
| | 5 | claude-haiku-def | `claude-haiku-4-5` | low | défaut Anthropic | défaut | `narration-writer-claude-libre` | LIBRE |
| | 6 | claude-haiku-reco | `claude-haiku-4-5` | low | 1.0 | défaut | `narration-writer-claude-libre` | LIBRE |
| **Kimi** | 7 | kimi-def | `kimi-k2.6` | off | **0.6** (reco Moonshot Instant mode) | — (MCP gratuit) | `ask_kimi` (MCP gratuit) | LIBRE |
| | 8 | kimi-reco | `kimi-k2.6` | off | **1.0** (haut de reco Moonshot) | **0.95** ✅ | **`ask_kimi_payant`** (MCP officiel) | LIBRE |
| | 9 | kimi-thinking | `kimi-k2.6` | **on (thinking activé)** | **1.0 fixe** (doc K2.6 thinking) | 0.95 ✅ | **`ask_kimi_payant`** (`thinking: true`) | LIBRE |
| | 10 | kimi-guide | `kimi-k2.6` | off | 0.6 (reco Instant) | — (MCP gratuit) | `narration-writer-kimi-guide` → `ask_kimi` gratuit | **GUIDÉ** (axes 1-6 + leçons + trame histoire) |
| **DeepSeek** | 11 | deepseek-def | `deepseek-v4-pro` | off | **défaut DeepSeek** (1.0 API = 0.3 modèle réel) | défaut | `ask_deepseek` (MCP) | LIBRE |
| | 12 | deepseek-reco | `deepseek-v4-pro` | off | **1.5** (reco officielle DeepSeek creative writing) | défaut | `ask_deepseek` (MCP) | LIBRE |
| **Grok** | 13 | grok-def | `grok-4.3` | low | **défaut xAI** (≈1.0, param non envoyé) | défaut | `ask_grok` (MCP) | LIBRE |
| | 14 | grok-reco | `grok-4.3` | low | **1.2** (haut reco créatif — au-delà 1.5 = incohérent) | défaut | `ask_grok` (MCP) | LIBRE |

> **Règles "température"** :
> - `def` = ne PAS envoyer le param. Laisse le fournisseur appliquer son défaut.
> - `reco` = valeur officielle "creative writing" du fournisseur (cf. [`../equipe/references/temperatures-llm.md`](../equipe/references/temperatures-llm.md) — doc autorité).
> - Référence Papa Yann 2026-05-12 : "max → reco" parce que `2.0` Grok/Kimi = incohérent narratif.
>
> ✅ **Cohabitation stricte MCP Kimi (refonte 2026-05-12 — résout ARCHI-009)** :
> - **`ask_kimi`** (gratuit, endpoint `kimi.com/coding/v1`, env `MOONSHOT_API_KEY`) → writers #7 kimi-def + #10 kimi-guide + tout usage général
> - **`ask_kimi_payant`** (officiel, endpoint `api.moonshot.ai/v1`, env `MOONSHOT_PAYANT_API_KEY`) → STRICTEMENT writers #8 kimi-reco (top_p 0.95) + #9 kimi-thinking (mode thinking)
> - Détail : [`infra/mcp/MODELS.md`](../../infra/mcp/MODELS.md) § *Cohabitation stricte*.

**Total : 13 writers LIBRES + 1 writer GUIDÉ = 14 versions.**

**Évaluation** : après 3-5 histoires, arbitrage réduction à config finale (~6-8 writers optimaux). Ticket `ARCHI-NNN` pour suivi (cf. backlog).

### Leviers de variance (imposables par Directeur dans `brief-histoire.md`)

| Levier | Options |
|--------|---------|
| **Température** | Param MCP par writer (Claude : 0.0–1.0 / Kimi/DeepSeek/Grok : 0.0–2.0). Si non spécifiée → défaut modèle. |
| **Angle narratif** | Sobre · Sensoriel · Dynamique (dialogues) · Instinct (libre) |
| **POV / focal** | Wex témoin · perso A · perso B · narrateur invisible |
| **Ouverture** | In medias res · ouverture lente · dialogue d'amorce |
| **Longueur cible** | 400 mots · 550 mots · 700 mots |

⚠️ Le bloc `## Les 4 Writers — angles assignés` de `equipe/ORGANIGRAMME.md` parle de **4 angles narratifs**, pas de 4 writers. C'est un levier de variance, pas une répartition writers.

### 6 axes du writer GUIDÉ (annexe AXES 1-6 — `narration-writer-kimi-guide`)

1. **Créature vivante** (objet/lieu/élément a une âme)
2. **Geste avant parole** (action physique avant dialogue)
3. **Onomatopée légère** (ploc, frou, tsing — pas BOUM)
4. **Fin rituel** (clôture par geste répété, pas morale)
5. **Mystère vs résolution** (laisser zone d'ombre)
6. **Faute volontaire** (détail "imparfait" qui rend humain)

Règle : le writer guidé active **2-3 axes librement, jamais 4+**. Source vivante : `equipe/lecons-vivantes.md`.

---

## Casting figé (V1 Christ FR)

10 persos (9 + Wex), figé 2026-04-24, ajusté 2026-05-05.

| Type | Prénom complet | Diminutif | Sexe |
|------|----------------|-----------|------|
| 0 hors-système | Wex | Wex | invariant cross-culture |
| 1 Perfectionniste | Melchisédech | Melki | M |
| 2 Aidant | Marie | Mimi | F |
| 3 Performeur | Paul | Polo | M |
| 4 Individualiste | Madeleine | Madie | F |
| 5 Observateur | Luc | Lulu | M |
| 6 Loyal | Pierre | Pierrot | M |
| 7 Enthousiaste | Raphaëlle | Raph | F |
| 8 Challenger | Judith | Juju | F |
| 9 Pacificateur | Noé | Nono | M |

Bilan : **4F / 5M + Wex**. Source : [`../personnages/INDEX.md`](../personnages/INDEX.md).

---

## Voice IDs ElevenLabs (état 2026-05-12)

| Perso | Voice ID | Méthodo | Naming bibliothèque |
|-------|----------|---------|---------------------|
| Wex | `G54e8CyYslC2Y4ZupTlg` | v24 | Lumi Wex Héros |
| Polo | `5wcx0KzRnrP48I5RCVD8` | v2 | Lumi Polo Fier |
| Melki | `sWfumkYiI1QERQ5INqRQ` | v1 | Lumi Melki Précis |
| Pierrot | `ukIKjXqbiGGkqIz0SW5c` | pré-v24 | (conservé) |
| Raph | `Te5RKnm9ebwdEvZ1S5pS` | — | — |
| Lulu | `1XwHANMW4m2pxt7buPmQ` | filtre cumulatif vaincu | Lumi Lulu Léger |
| Nono | `f3w48h8ngnWWnhO9XGb3` | v1 (companion) | Lumi Nono Paisible |
| Mimi, Madie, Juju | ⏳ à créer (filles) | — | — |

Détail complet : [`../personnages/voix-meta/_VOICE-IDS-CASTING.md`](../personnages/voix-meta/_VOICE-IDS-CASTING.md).

---

## Patte narrative

**B+D+C** : Kishōtenketsu + tranche de vie + cycle.

Source : [`../equipe/patte-narrative-maxplay.md`](../equipe/patte-narrative-maxplay.md).

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
| 002 | Libellule Résonance | 🟢 **étape 4 prête à lancer** (étapes 0/1/3 ✅, Q-ouvertes tranchées 2026-05-12, casting Wex+Juju+Nono) | Directeur |
| 003+ | À démarrer | ⚪ — | — |

---

## Comment utiliser ce fichier

**Quand consulter** :
- Avant d'écrire un chiffre clé dans un kanban / pitch / brief
- Avant de valider une décision qui touche au PROCESS
- En cas de doute "c'est 6 ou 20 lecteurs ?"

**Quand mettre à jour** :
- Toute décision qui modifie un chiffre clé → MAJ ici **avant** de propager ailleurs
- Toute création d'un voice_id → ajouter ici **et** dans `_VOICE-IDS-CASTING.md`
- Toute évolution casting → ici + `personnages/INDEX.md`

**Règle** : ce fichier est court par design (~100 lignes). Si tu veux ajouter une section longue → la mettre ailleurs et pointer ici.
