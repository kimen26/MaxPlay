---
titre: Configuration LLM — MCP llm-copains
date_creation: 2026-05-06
maintenu_par: Auteur (John) + agent narration-pmo
---

# MODELS.md — Configuration LLM MaxPlay

> Source de vérité des modèles LLM utilisés via le serveur MCP `llm-copains` ([infra/mcp/server.ts](server.ts)).
> Toute modification du `server.ts` doit être reflétée ici dans la même PR.

---

## Modèles courants (état 2026-05-06)

| Outil MCP | LLM | Modèle | Endpoint | Mode thinking | Notes |
|-----------|-----|--------|----------|---------------|-------|
| `ask_grok` | xAI | `grok-4.3` | `https://api.x.ai/v1` | `reasoning_effort: "low"` (juste au-dessus de none) | 1M ctx, sorti mai 2026, -40% prix vs 4-fast |
| `ask_kimi` | Moonshot AI | `kimi-k2.6` | `https://api.moonshot.ai/v1` | non-thinking (modèle base, pas Kimi-Thinking) | Sorti 2026-04-20, MoE 1T params / 32B actifs |
| `ask_deepseek` | DeepSeek | `deepseek-v4-pro` (défaut) ou `deepseek-v4-flash` | `https://api.deepseek.com/v1` | `thinking: false` | V4-pro 1.6T params / 49B actifs |
| `tts_elevenlabs` | ElevenLabs | `eleven_multilingual_v2` | `https://api.elevenlabs.io/v1` | — | TTS narration |

---

## Casting writers narration (10 versions par histoire)

| Bloc | LLM | Rôle |
|------|-----|------|
| Claude × 2 | `claude-opus-4-7` (via agent) | libre — variance native |
| Kimi × 3 | `kimi-k2.6` non-thinking | libre — variance native |
| Kimi × 1 | `kimi-k2.6` non-thinking | **guidé** — annexe AXES 1-6 enrichie |
| DeepSeek × 2 | `deepseek-v4-pro` non-thinking | libre |
| Grok × 2 | `grok-4.3` `reasoning_effort: low` | libre |

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
