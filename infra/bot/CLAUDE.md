# Bot MaxPlay — architecture auth

## Refonte fiabilité 2026-06-12

- **Logs** : le bot écrit lui-même dans `bot.run.log` (append, survit aux redémarrages).
  Les fichiers `bot-start.log`/`bot-start.err.log` ne contiennent que les erreurs de
  lancement du hook SessionStart. Ne plus se fier à `bot.log`/`bot.err.log` (obsolètes).
- **Aiguilleur 4 agents** : narration (opus) · game-dev (sonnet) · dino (sonnet) ·
  quick (haiku). Le pôle détecté est injecté en tête de prompt
  pour aider le routage CLAUDE.md côté CLI.
- **Anti-zombie** : timeout → `kill()` puis `SIGKILL` forcé 5s après (sous Windows le
  SIGTERM émulé peut être ignoré → avant, la promesse ne se réglait jamais et le
  message « Claude réfléchit » restait affiché à vie sans erreur).
- **Erreurs visibles** : l'erreur édite le message d'attente (1 seul appel API) au lieu
  de delete+send. Battement de cœur toutes les 60s pendant le traitement.
- **Singleton** : le port 3001 sert de verrou — un doublon log l'erreur dans
  `bot.run.log` et s'arrête proprement.

## ✅ Le bot utilise la CLI `claude` (login Claude Code), PAS le SDK

Depuis 2026-05-01 le bot **shell-exec** la CLI `claude` au lieu d'appeler le SDK
`@anthropic-ai/sdk`. Conséquence : il utilise l'auth OAuth de Claude Code
(abonnement Max de l'utilisateur) — **aucune clé API Anthropic n'est requise**.

### Fonctionnement

`runClaude()` dans [`index.ts`](index.ts) lance :

```
claude -p --model <opus|sonnet|haiku> --permission-mode bypassPermissions
```

Le prompt est passé via **stdin**, la réponse récupérée sur **stdout**.
`cwd` = `PROJECT_PATH` pour que la CLI charge bien le `CLAUDE.md` du projet.

### Variables d'env (toutes optionnelles côté Claude)

- `TELEGRAM_BOT_TOKEN` — **requis**
- `ALLOWED_CHAT_ID` — recommandé
- `PROJECT_PATH` — défaut `C:/ProjetsPerso/Claude_Projects/MaxPlay`
- `CLAUDE_CLI` — défaut `claude` (chemin de la CLI si non dans PATH)
- `CLAUDE_TIMEOUT_MS` — défaut `600000` (10 min par requête)

❌ **Plus besoin de `ANTHROPIC_API_KEY`** — l'auth est dans `~/.claude/`.

## ⚠️ Contraintes induites par ce choix

1. La CLI `claude` doit être installée et **loggée** (`claude` une fois en
   interactif pour faire l'OAuth). Vérif : `claude --version`.
2. Le bot doit tourner **en tant qu'utilisateur ayant fait le login Claude Code**
   (sinon `~/.claude/` est vide pour ce process).
3. `--permission-mode bypassPermissions` court-circuite les hooks de permission
   du projet — le serveur HTTP port 3001 du bot reste utile pour d'autres
   instances Claude Code, pas pour celle que le bot lance lui-même.
4. Pas de streaming — on attend la fin du process avant de répondre sur Telegram.
5. Latence : un cold start CLI ajoute ~1-2s vs SDK direct.

## 🧯 Si on veut revenir au SDK (option A)

Il faudrait :
1. Réinjecter `import Anthropic from "@anthropic-ai/sdk"` et l'init.
2. Ajouter `ANTHROPIC_API_KEY=sk-ant-...` dans `.env` (clé payante console.anthropic.com).
3. Restaurer l'ancien `runClaude()` (voir `git log -- index.ts`).

Le SDK **ne sait pas** lire l'auth de Claude Code — c'est ça ou rien.
