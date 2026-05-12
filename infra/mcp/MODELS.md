---
titre: Configuration LLM — MCP llm-copains
date_creation: 2026-05-06
maintenu_par: Auteur (John) + agent narration-pmo
---

# MODELS.md — Configuration LLM MaxPlay

> Source de vérité des modèles LLM utilisés via le serveur MCP `llm-copains` ([infra/mcp/server.ts](server.ts)).
> Toute modification du `server.ts` doit être reflétée ici dans la même PR.

---

## Modèles courants (état 2026-05-12)

| Outil MCP | LLM | Modèle | Endpoint réel | Mode thinking | Env var | Notes |
|-----------|-----|--------|---------------|---------------|---------|-------|
| `ask_grok` | xAI | `grok-4.3` | `https://api.x.ai/v1` | `reasoning_effort: "low"` | `XAI_API_KEY` | 1M ctx, sorti mai 2026, -40% prix vs 4-fast |
| `ask_kimi` ⚠️ | Moonshot AI (endpoint coding passe-partout) | `kimi-for-coding` | `https://api.kimi.com/coding/v1` | non-thinking (non exposé) | `MOONSHOT_API_KEY` | **GRATUIT** — endpoint passe-partout. Pas de `top_p`, pas de mode thinking. Usage : kimi-def (#7) + kimi-guide (#10). |
| `ask_kimi_payant` 🆕 (refonte 2026-05-12) | Moonshot AI OFFICIEL | `kimi-k2.6` | `https://api.moonshot.ai/v1` | `thinking: true/false` (exposé) | **`MOONSHOT_PAYANT_API_KEY`** | **PAYANT — usage STRICTEMENT writers narratifs kimi-reco (#8) + kimi-thinking (#9)**. Expose `top_p` + mode `thinking`. |
| `ask_deepseek` | DeepSeek | `deepseek-v4-pro` (défaut) ou `deepseek-v4-flash` | `https://api.deepseek.com/v1` | `thinking: false` | `DEEPSEEK_API_KEY` | V4-pro 1.6T params / 49B actifs |
| `tts_elevenlabs` | ElevenLabs | `eleven_multilingual_v2` | `https://api.elevenlabs.io/v1` | — | `ELEVENLABS_API_KEY` | TTS narration |

### ⚠️ Cohabitation stricte `ask_kimi` (gratuit) vs `ask_kimi_payant` (officiel)

**Règle** : on ne mélange JAMAIS les usages.

| Writer | MCP à utiliser | Pourquoi |
|--------|----------------|----------|
| kimi-def (#7) | `ask_kimi` (gratuit) | Pas besoin de top_p ni thinking → endpoint coding suffit |
| kimi-reco (#8) | **`ask_kimi_payant`** | Besoin `top_p: 0.95` couplé à `temperature: 1.0` (reco Moonshot) |
| kimi-thinking (#9) | **`ask_kimi_payant`** avec `thinking: true` | Seul moyen d'activer le mode thinking K2.6 |
| kimi-guide (#10) | `ask_kimi` (gratuit) | Temp 0.6 sans top_p — endpoint coding accepte |

**Hors writers narratifs** : tout autre besoin Kimi (questions tech, exploration, etc.) → toujours `ask_kimi` (gratuit). Jamais le payant.

---

## Casting writers narration (14 versions par histoire — refonte v2 2026-05-12)

| Bloc | N | LLM | Rôle | MCP appelé |
|------|---|-----|------|------------|
| Claude | 6 | `claude-opus-4-7` / `sonnet-4-6` / `haiku-4-5` × déf/reco | libre — calibration multi-modèles | agent `narration-writer-claude-libre` (SDK direct, pas MCP) |
| Kimi libre | 3 | `kimi-k2.6` (déf/reco/thinking) | libre — variance native + calibration | #7 → `ask_kimi` · #8 → `ask_kimi_payant` (top_p) · #9 → `ask_kimi_payant` (thinking) |
| Kimi guidé | 1 | `kimi-k2.6` non-thinking | **guidé** — axes 1-6 + retours lecteurs + trame story | `ask_kimi` (gratuit, 0.6) |
| DeepSeek | 2 | `deepseek-v4-pro` non-thinking × déf/reco | libre — calibration température | `ask_deepseek` |
| Grok | 2 | `grok-4.3` `reasoning_effort: low` × déf/reco | libre — calibration température | `ask_grok` |

**Total : 13 libres + 1 guidé = 14 versions.**
Référence températures : [../../narration/equipe/references/temperatures-llm.md](../../narration/equipe/references/temperatures-llm.md).
Détail complet : [../../narration/pmo/INVARIANTS.md](../../narration/pmo/INVARIANTS.md) § *Casting writers étape 4*.

Cf. [equipe/PROCESS.md](../../narration/equipe/PROCESS.md) §4.

---

## Dates de dépréciation à surveiller

| Date | Action |
|------|--------|
| **2026-05-25** | Kimi K2 series **discontinuation** (K2.6 reste OK, mais surveiller les release notes) |
| **2026-05-31** | Fin promo DeepSeek -75% sur V4-Pro → vérifier coût, basculer V4-Flash si trop cher. Rappel dans [pmo/sprint-log.md](../../narration/pmo/sprint-log.md) |
| **2026-07-24** | Dépréciation noms `deepseek-chat` / `deepseek-reasoner` côté DeepSeek (déjà migrés ici, OK) |

---

## Historique des changements

### 2026-05-12 — Cohabitation stricte `ask_kimi` (gratuit) + `ask_kimi_payant` (officiel)

**Décidé par** : Papa Yann, session 2026-05-12 (refonte casting v2 — 14 writers).

**Changements** :
- Nouvel outil MCP `ask_kimi_payant` ajouté dans [server.ts](server.ts) — endpoint `https://api.moonshot.ai/v1`, modèle `kimi-k2.6`, expose `top_p` + mode `thinking`.
- Nouvelle env var **`MOONSHOT_PAYANT_API_KEY`** (à ajouter au niveau utilisateur Windows) — distincte de `MOONSHOT_API_KEY` (gratuit).
- `ask_kimi` (existant, endpoint `kimi.com/coding/v1`) **conservé** pour usage général + writers #7 (kimi-def) et #10 (kimi-guide).
- `ask_kimi_payant` (nouveau) **réservé** aux writers #8 (kimi-reco, top_p 0.95) et #9 (kimi-thinking, mode thinking).

**Pourquoi** :
- L'endpoint coding gratuit `kimi.com/coding` n'expose pas `top_p` ni mode thinking.
- Moonshot recommande officiellement `top_p: 0.95` couplé à la température pour le créatif. Et K2.6 a un vrai mode thinking activable via API officielle.
- Pour préserver les usages gratuits existants et n'engager des coûts que sur les 2 writers qui en ont vraiment besoin → 2 MCP distincts avec env var distincte.
- Refonte casting v2 (10 → 14 writers) cf. [decisions.md](../../narration/pmo/decisions.md) 2026-05-12.

**Liens** :
- Ticket résolu : ARCHI-009 dans backlog.
- Référence températures officielles : [../../narration/equipe/references/temperatures-llm.md](../../narration/equipe/references/temperatures-llm.md)

---

### 2026-05-06 — Refonte casting + bascule modèles récents

**Décidé par** : John, session 2026-05-06 post-Tour 3 (004 pont-casse-temperatures).

**Changements** :
- Grok : `grok-4-fast-non-reasoning` → `grok-4.3` + `reasoning_effort: "low"`
- Kimi : suppression du mode `story` (moonshot-v1-32k 401 chronique) → mono-mode `kimi-k2.6` sur `api.moonshot.ai`. Plus de paramètre `mode`.
- DeepSeek : `deepseek-chat` → `deepseek-v4-pro` (défaut) + `deepseek-v4-flash` en option. Suppression de `deepseek-reasoner`. Param `thinking: false` ajouté.
- Casting writers : passé de 8 à **10 versions** (2 Claude Opus + 4 Kimi dont 1 guidé + 2 DeepSeek + 2 Grok).

**Pourquoi** :
- Verdict Tour 2/3 (003-v2 + 004) : Kimi domine en classement, justifie 4 Kimi (3 libre + 1 guidé)
- Grok bottom unanime sur 6/6 lecteurs → on lui laisse une chance avec 4.3 (saut majeur de génération)
- DeepSeek-Pro -75% jusqu'au 31 mai → fenêtre éphémère, on en profite
- Tous en **non-thinking** : décision John "pas de thinking mode" — réponses one-shot, pas de chaînes de raisonnement qui lissent la créativité
- Claude writers passés en Opus 4.7 pour tester si le saut de modèle décale le rang Claude (était 3-4 toujours)

**Liens** :
- Commit : à venir
- Décision PMO : [pmo/decisions.md](../../narration/pmo/decisions.md) entrée 2026-05-06
- Mémoire obsolète archivée : `feedback_kimi_mode_code.md` (mode `story` n'existe plus)

---

### 2026-05-04 — Ajout paramètre `temperature` (initial)

Param `temperature` ajouté aux 3 outils LLM pour permettre le test de variance réelle (vs prompt-simulated).
Validé sur Tour 3 (004 pont-casse-temperatures) : convergence kimi-run1 #1 confirmée → la température réelle stabilise le verdict.

---

## Comment changer un modèle

1. Modifier `infra/mcp/server.ts` (le nom du modèle, l'endpoint, ou les params)
2. Mettre à jour ce fichier (`MODELS.md`) — tableau + historique
3. Notifier le PMO : entrée datée dans `narration/pmo/decisions.md`
4. **Reboot Claude Code** pour recharger le serveur MCP
5. Tester via `ToolSearch` que le schéma exposé est bien le nouveau

---

## Pointeurs

- Code MCP : [server.ts](server.ts)
- Bot Telegram (consommateur) : [../bot/index.ts](../bot/index.ts)
- Cartographie agents : [../../narration/equipe/cartographie-domaines.md](../../narration/equipe/cartographie-domaines.md)
- Process : [../../narration/equipe/PROCESS.md](../../narration/equipe/PROCESS.md)
- Décisions : [../../narration/pmo/decisions.md](../../narration/pmo/decisions.md)
