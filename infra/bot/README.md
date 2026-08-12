# MaxPlay Bot (botard)

Bot Telegram qui permet de piloter un agent de code (Kimi Code ou Claude Code) depuis le téléphone.

## Stack

- **Runtime** : [Bun](https://bun.com)
- **Framework** : [grammY](https://grammy.dev)
- **IA** : Kimi Code CLI (`kimi -p …`, défaut) ou Claude Code CLI (`claude -p …`)

## Backend IA (switch claude ↔ kimi)

Le backend se choisit à deux niveaux :

1. **Défaut persistant** : `BOT_BACKEND=kimi` (ou `claude`) dans `.env` → pris au démarrage.
2. **À chaud** : commande Telegram `/backend kimi` ou `/backend claude` → effet immédiat, sans redémarrage (repasse au défaut `.env` au prochain restart).

Notes techniques :

- **Kimi** : nécessite le CLI (`npm install -g @moonshot-ai/kimi-code`), auth OAuth partagée avec `~/.kimi-code/`. Le shim `kimi.cmd` tronque les prompts multi-lignes (cmd.exe) : le bot appelle `node …/kimi-code/dist/main.mjs` directement. Sortie parsée en `--output-format stream-json`. En mode `-p`, Kimi applique la permission `auto` d'office (pas de `--yolo` possible) ; modèle = `default_model` de `~/.kimi-code/config.toml`, surchargeable via `KIMI_MODEL` dans `.env`.
- **Claude** : prompt passé sur stdin, modèle par agent (opus/sonnet/haiku), `--permission-mode bypassPermissions`.
- Le serveur de **permissions Telegram** (port 3001, boutons ✅/❌) ne fonctionne qu'avec le backend Claude (hook `PermissionRequest` de `.claude/settings.json`).

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Token du bot (BotFather) |
| `ALLOWED_CHAT_ID` | Chat ID autorisé (toi seul). Récupérable via `/start` |
| `PROJECT_PATH` | Chemin du projet (défaut : `C:/ProjetsPerso/Claude_Projects/MaxPlay`) |
| `BOT_BACKEND` | `kimi` (défaut) ou `claude` |
| `KIMI_MODEL` | (optionnel) alias modèle Kimi, ex. `kimi-code/kimi-for-coding` |
| `CLAUDE_CLI` / `KIMI_CLI` | (optionnel) surcharge des commandes CLI |
| `AGENT_TIMEOUT_MS` | (optionnel) timeout d'un appel (défaut 600000) |

## Flow

```
Toi → bot : "génère mj-21"
Bot → CLI du backend actif (agent détecté selon mots-clés : narration / game-dev / dino / quick)
Agent → résultat renvoyé dans le chat
```

Les messages sont exécutés directement sans confirmation préalable.

**Permissions d'outils** (backend Claude uniquement) : si Claude demande une permission (ex. écrire un fichier), le hook `PermissionRequest` envoie un message Telegram avec boutons ✅/❌. Tu valides depuis le téléphone.

## Routing agents

| Mots-clés détectés | Agent utilisé |
|-------------------|---------------|
| narration, histoire, personnage, univers... | `narration` (Claude: Opus) |
| jeu, mj, bug, html, phaser... | `game-dev` (Claude: Sonnet) |
| dino, dinosaure, tritri... | `dino` (Claude: Sonnet) |
| Tout le reste | `quick` (Claude: Haiku) |

(Avec le backend Kimi, le modèle est le même pour tous les agents — celui de la config Kimi.)

## Commandes

| Commande | Description |
|----------|-------------|
| `/start` | Affiche ton Chat ID (pour configurer `ALLOWED_CHAT_ID`) |
| `/status` | Vérifie que le bot est actif + backend courant |
| `/backend` | Affiche le backend ; `/backend kimi` ou `/backend claude` pour switcher à chaud |
| `/reset` | Efface l'historique de conversation |
| Tout autre texte | Envoyé à l'agent (routage automatique) |

## Démarrage

```bash
cd bot
bun run index.ts
```

Le bot se relance automatiquement à chaque démarrage de Claude Code via le hook `SessionStart` dans `.claude/settings.json`.

Logs : `bot.run.log` (append) dans ce dossier.

## Redémarrer manuellement

```bash
pkill -f "bot/index.ts" && cd bot && bun run index.ts &
```
