# Bot MaxPlay — architecture auth

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
