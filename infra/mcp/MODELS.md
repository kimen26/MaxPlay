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
| `ask_kimi` ⚠️ | Moonshot AI (endpoint coding gratuit) | `kimi-k2.7-code` | `https://api.kimi.com/coding/v1` | non-thinking (non exposé) | `MOONSHOT_API_KEY` | **GRATUIT** — endpoint passe-partout. Modèle K2.7-Code depuis 2026-07-03. Pas de `top_p`, pas de mode thinking. Usage : kimi-reco (#7) + kimi-reco-guide (#10). |
| `ask_kimi_payant` 🆕 (refonte 2026-05-12) | Moonshot AI OFFICIEL | `kimi-k2.6` | `https://api.moonshot.ai/v1` | `thinking: true/false` (exposé) | **`MOONSHOT_PAYANT_API_KEY`** | **PAYANT — usage STRICTEMENT writers narratifs kimi-reco (#8) + kimi-thinking (#9)**. Expose `top_p` + mode `thinking`. |
| `ask_deepseek` | DeepSeek | `deepseek-v4-pro` (défaut) ou `deepseek-v4-flash` | `https://api.deepseek.com/v1` | `thinking: false` | `DEEPSEEK_API_KEY` | V4-pro 1.6T params / 49B actifs |
| `tts_elevenlabs` | ElevenLabs | `eleven_multilingual_v2` | `https://api.elevenlabs.io/v1` | — | `ELEVENLABS_API_KEY` | TTS narration |

### ⚠️ Cohabitation stricte `ask_kimi` (gratuit) vs `ask_kimi_payant` (officiel)

**Règle** : on ne mélange JAMAIS les usages.

| Writer | MCP à utiliser | Modèle réel | Param distinctif |
|--------|----------------|-------------|-------------------|
| kimi-reco (#7) | `ask_kimi` (gratuit) | `kimi-k2.7-code` (depuis 2026-07-03) | temp 0.6 (reco Moonshot Instant créatif) |
| kimi-k26-instant (#8) | **`ask_kimi_payant`** | `kimi-k2.6` | `thinking: {"type": "disabled"}` |
| kimi-k26-thinking (#9) | **`ask_kimi_payant`** | `kimi-k2.6` | `thinking: {"type": "enabled"}` (= défaut K2.6) |
| kimi-reco-guide (#10) | `ask_kimi` (gratuit) | `kimi-k2.7-code` (depuis 2026-07-03) | temp 0.6 + couche axes 1-6 + trame |

**Note clé K2.6** : selon doc Moonshot officielle (https://platform.kimi.ai/docs/api/models-overview#parameter-comparison), `kimi-k2.6` a **temperature et top_p fixes** côté modèle — l'API ignore ce qu'on envoie. **Seul `thinking` est contrôlable**. C'est pourquoi #8 et #9 ne se différencient QUE par ce param.

**Hors writers narratifs** : tout autre besoin Kimi (questions tech, exploration, etc.) → toujours `ask_kimi` (gratuit). Jamais le payant.

---

## Casting writers narration (14 versions par histoire — refonte v2 2026-05-12)

| Bloc | N | LLM | Rôle | MCP appelé |
|------|---|-----|------|------------|
| Claude | 6 | `claude-opus-4-7` / `sonnet-4-6` / `haiku-4-5` × déf/reco | libre — calibration multi-modèles | agent `narration-writer-claude-libre` (SDK direct, pas MCP) |
| Kimi libre | 3 | `kimi-for-coding` (#7) + `kimi-k2.6` (#8 Instant, #9 Thinking) | libre — variance native + calibration | #7 kimi-reco → `ask_kimi` (gratuit) · #8 kimi-k26-instant → `ask_kimi_payant` (thinking disabled) · #9 kimi-k26-thinking → `ask_kimi_payant` (thinking enabled) |
| Kimi guidé | 1 | `kimi-for-coding` | **guidé** — axes 1-6 + retours lecteurs + trame story | #10 kimi-reco-guide → `ask_kimi` (gratuit, 0.6) |
| DeepSeek | 2 | `deepseek-v4-pro` non-thinking × déf/reco | libre — calibration température | `ask_deepseek` |
| Grok | 2 | `grok-4.3` `reasoning_effort: low` × déf/reco | libre — calibration température | `ask_grok` |

**Total : 13 libres + 1 guidé = 14 versions.**
Référence températures : [../../studio/narration/equipe/references/temperatures-llm.md](../../studio/narration/equipe/references/temperatures-llm.md).
Détail complet : [../../studio/narration/pmo/INVARIANTS.md](../../studio/narration/pmo/INVARIANTS.md) § *Casting writers étape 4*.

Cf. [equipe/PROCESS.md](../../studio/narration/equipe/PROCESS.md) §4.

---

## Dates de dépréciation à surveiller

| Date | Action |
|------|--------|
| **2026-05-25** | Kimi K2 series **discontinuation** (K2.6 reste OK, mais surveiller les release notes) |
| **2026-05-31** | Fin promo DeepSeek -75% sur V4-Pro → vérifier coût, basculer V4-Flash si trop cher. Rappel dans [pmo/sprint-log.md](../../studio/narration/pmo/sprint-log.md) |
| **2026-07-24** | Dépréciation noms `deepseek-chat` / `deepseek-reasoner` côté DeepSeek (déjà migrés ici, OK) |

---

## 🛡️ Filet de sécurité — Logs auto (option A 2026-05-13)

Chaque appel à `ask_kimi`, `ask_kimi_payant`, `ask_deepseek`, `ask_grok` est **automatiquement loggé** dans `infra/mcp/logs/<YYYY-MM-DD>/<timestamp>-<tool>-<hash>.md`.

**Contenu du log** :
- frontmatter : `tool`, `model`, `date` ISO, `request_body` (JSON)
- corps : réponse brute du LLM

**Pourquoi** : si le main thread Claude Code reçoit le texte mais crash/oublie/manque de contexte avant le `Write` tool de sauvegarde dans `studio/narration/stories/...`, le texte reste **récupérable** sur le disque local. Filet contre la perte d'une génération créative coûteuse.

**Garanties** :
- Logging silent fail — n'interrompt JAMAIS l'appel principal en cas d'erreur d'écriture
- Hash SHA-256 du contenu dans le nom de fichier = dédoublonnage si même réponse loggée 2x
- Dossier **gitignored** (`.gitignore` → `infra/mcp/logs/`) — pas commit, pas envoyé

**Nettoyage** : à toi de purger périodiquement. Pas de rotation auto pour l'instant (ticket ARCHI à ouvrir si besoin).

---

## Historique des changements

### 2026-05-13 — Logs auto MCP créatifs (option A — filet de sécurité)

**Décidé par** : Papa Yann, session 2026-05-13.

**Changements** :
- `callOpenAICompat()` gagne un param optionnel `toolName`. Si fourni → log auto.
- Nouveau dossier `infra/mcp/logs/` (gitignored).
- Logging silent fail (try/catch interne, n'interrompt jamais l'appel).
- 4 outils branchés : `ask_grok`, `ask_kimi`, `ask_kimi_payant`, `ask_deepseek`.

**Pourquoi** : alternative à donner le droit d'écriture filesystem aux LLM distants (option B) — moins risqué (pas de prompt injection vers le filesystem, pas d'écrasement involontaire), tout en couvrant 95% du cas d'usage : récupérer un texte si main thread crash avant `Write`.

**Liens** : DEC à ajouter dans `studio/narration/pmo/decisions.md` 2026-05-13.

---

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
- Refonte casting v2 (10 → 14 writers) cf. [decisions.md](../../studio/narration/pmo/decisions.md) 2026-05-12.

**Liens** :
- Ticket résolu : ARCHI-009 dans backlog.
- Référence températures officielles : [../../studio/narration/equipe/references/temperatures-llm.md](../../studio/narration/equipe/references/temperatures-llm.md)

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
- Décision PMO : [pmo/decisions.md](../../studio/narration/pmo/decisions.md) entrée 2026-05-06
- Mémoire obsolète archivée : `feedback_kimi_mode_code.md` (mode `story` n'existe plus)

---

### 2026-05-04 — Ajout paramètre `temperature` (initial)

Param `temperature` ajouté aux 3 outils LLM pour permettre le test de variance réelle (vs prompt-simulated).
Validé sur Tour 3 (004 pont-casse-temperatures) : convergence kimi-run1 #1 confirmée → la température réelle stabilise le verdict.

---

## Comment changer un modèle

1. Modifier `infra/mcp/server.ts` (le nom du modèle, l'endpoint, ou les params)
2. Mettre à jour ce fichier (`MODELS.md`) — tableau + historique
3. Notifier le PMO : entrée datée dans `studio/narration/pmo/decisions.md`
4. **Reboot Claude Code** pour recharger le serveur MCP
5. Tester via `ToolSearch` que le schéma exposé est bien le nouveau

---

## Pointeurs

- Code MCP : [server.ts](server.ts)
- Bot Telegram (consommateur) : [../bot/index.ts](../bot/index.ts)
- Cartographie agents : [../../studio/narration/equipe/cartographie-domaines.md](../../studio/narration/equipe/cartographie-domaines.md)
- Process : [../../studio/narration/equipe/PROCESS.md](../../studio/narration/equipe/PROCESS.md)
- Décisions : [../../studio/narration/pmo/decisions.md](../../studio/narration/pmo/decisions.md)
