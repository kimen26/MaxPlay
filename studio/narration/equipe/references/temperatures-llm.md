# Températures LLM — référence officielle

> **Source** : synthèse Papa Yann 2026-05-12, croisée avec docs officielles Anthropic / Moonshot / DeepSeek / xAI.
> **Statut** : référence permanente — à consulter avant tout réglage température dans le casting writers ou ailleurs.
> **Cible** : MaxPlay (narration créative pour enfants 4-6 ans).

---

## ⚠️ Avertissement préliminaire

La "température" n'est **pas comparable à 100 %** d'un éditeur à l'autre, parce que chacun la mappe différemment en interne. Même valeur numérique = comportement différent selon le modèle.

---

## Claude (Anthropic)

| Item | Valeur |
|------|--------|
| **Plage acceptée** | `0.0` à `1.0` (plafonné — Claude est plus restrictif que les autres) |
| **Défaut API** | `1.0` ("Defaults to 1.0. Ranges from 0.0 to 1.0") |
| **Reco officielle** | Proche de `0.0` pour tâches analytiques/choix multiple. Proche de `1.0` pour tâches créatives/génératives. |
| **Reco créatif (histoire)** | **`0.8 – 1.0`** |
| **Note** | Ne toucher qu'à la température, laisser `top_p` / `top_k` par défaut. Même à `0.0`, sortie non totalement déterministe. |

**Source** : docs API Anthropic / glossaire Claude.

---

## Grok (xAI)

| Item | Valeur |
|------|--------|
| **Plage acceptée** | `0` à `2` (style OpenAI) |
| **Défaut** | `1.0` (convention OpenAI ; xAI ne publie pas de tableau explicite) |
| **Reco usage** | Commencer à `0` ou `<1`, augmenter progressivement. Trop haut → hallucinations. |
| **Reco créatif (histoire)** | **`0.8 – 1.2`** |
| **Limite cohérence** | Au-delà de `1.5`, incohérence narrative fréquente |

**Sources** : `docs.x.ai`, `docs.oracle.com` (xAI Grok 4 / 4 Fast), AIMLAPI.

---

## Kimi (Moonshot AI) ⚠️ le plus particulier

| Item | Valeur |
|------|--------|
| **Plage acceptée** | `0` à `2` (compatible OpenAI) |
| **Reco officielle Moonshot** | <ul><li>Kimi-K2-Instruct : `0.6`</li><li>K2.5 / K2.6 mode **Instant** (non-thinking) : `0.6` (avec `top_p: 0.95`)</li><li>K2.5 / K2.6 mode **Thinking** : `1.0` (K2.6 utilise une température fixe `1.0` selon doc thinking models)</li></ul> |
| **⚠️ Piège mapping** | Sur l'API Anthropic-compatible de Moonshot : `real_temperature = request_temperature × 0.6`. Demander `1.0` envoie en réalité `0.6` au modèle. |
| **Reco créatif (histoire)** | **`0.6 – 1.0`** avec `top_p: 0.95`. Monter plus haut **non conseillé** par Moonshot — leurs benchmarks officiels tournent à 1.0 max. |
| **Note couplage** | Moonshot recommande de **coupler** température + `top_p: 0.95` (contraire d'Anthropic) |

**Sources** : Hugging Face `moonshotai/Kimi-K2.5` et `K2.6`, `github.com/MoonshotAI/Kimi-K2`, `platform.kimi.ai/docs`.

---

## DeepSeek — le seul à publier un tableau task-par-task

| Item | Valeur |
|------|--------|
| **Plage acceptée** | `0` à `2` |
| **Défaut API** | `1.0` ("The default value of temperature is 1.0") |
| **⚠️ Piège mapping** | Sur DeepSeek-V3 et suivants : `T_model = T_api × 0.3` (pour `0 ≤ T_api ≤ 1`). Envoyer `1.0` via API = température modèle réelle `0.3`. C'est exprès, pour aligner l'API sur l'app web. |
| **Tableau officiel par tâche** | <ul><li>`0.0` — code / mathématiques</li><li>`1.0` — analyse / nettoyage de données</li><li>`1.3` — conversation générale / traduction</li><li>**`1.5` — écriture créative / poésie**</li></ul> |
| **Reco créatif (histoire)** | **`1.5`** (officiel — la plus haute du tableau) |
| **Cas spécial DeepSeek R1** | `0.6` recommandé (modèle de raisonnement, pas créatif) |

**Sources** : `api-docs.deepseek.com/quick_start/parameter_settings`, `huggingface.co/deepseek-ai/DeepSeek-V3-0324`.

---

## 📊 Récap pour histoire créative (MaxPlay)

| Modèle | Défaut API | Max accepté | **Reco créatif** | Notes spécifiques |
|--------|------------|-------------|-------------------|-------------------|
| Claude | `1.0` | `1.0` (plafond) | **`0.8 – 1.0`** | top_p/top_k par défaut |
| Grok | `~1.0` | `2.0` | **`0.8 – 1.2`** | au-delà 1.5 = incohérent |
| Kimi | `0.6 – 1.0` selon mode | `2.0` | **`0.6 – 1.0`** | top_p `0.95`, **mapping × 0.6** sur API Anthropic-compat |
| DeepSeek | `1.0` (= 0.3 modèle) | `2.0` | **`1.5`** (officiel) | **mapping × 0.3** API public |

---

## 🎯 3 règles à garder en tête

1. **Même valeur numérique ≠ même comportement** d'un modèle à l'autre. Mappings internes : DeepSeek ×0.3, Kimi (Anthropic-compat) ×0.6.
2. **Anthropic vs Moonshot opposés sur top_p** : Anthropic dit "ne touche qu'à la température". Moonshot dit "couple température + top_p 0.95". Suivre la reco du fournisseur, pas une règle générique.
3. **Au-delà des seuils, perte de cohérence narrative** :
   - Grok / DeepSeek : au-delà de `~1.5 – 1.7` = poésie expérimentale OK, histoire structurée KO
   - Claude : `1.0` = plafond (impossible plus haut)
   - Kimi : au-delà de `1.0` = déconseillé par Moonshot

---

## 🔧 Implications pour le casting writers MaxPlay v2 (2026-05-12)

| Writer | Ancienne reco "max" | **Nouvelle reco créatif** | Pourquoi |
|--------|---------------------|---------------------------|----------|
| claude-*-max | `1.0` | **`1.0`** | inchangé (plafond Claude) |
| kimi-max | `2.0` | **`1.0`** (avec `top_p: 0.95`) | Moonshot déconseille >1.0, `0.6` mini reco créatif → `1.0` haut de reco |
| kimi-thinking | défaut | **`1.0` fixe** | doc K2.6 thinking : température fixe `1.0` |
| kimi-def, kimi-guide | défaut | **`0.6`** (avec `top_p: 0.95`) | reco officielle Instant mode |
| deepseek-max | `1.5` | **`1.5`** | inchangé (reco officielle creative writing) |
| grok-max | `2.0` | **`1.2`** | au-delà = incohérent narratif |

**Renommage suggéré** : `*-max` → `*-reco` (recommandé créatif) — plus juste sémantiquement.

---

**Date :** 2026-05-12
**Source matière :** Papa Yann (vérif docs officielles)
**Statut :** référence stable, à mettre à jour si docs fournisseurs évoluent
