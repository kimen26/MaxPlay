# MaxPlay Bot (botard)

Bot Telegram qui permet de piloter Claude Code depuis le téléphone.

## Stack

- **Runtime** : [Bun](https://bun.com)
- **Framework** : [grammY](https://grammy.dev)
- **IA** : Claude Code CLI (`claude -p …`)

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Token du bot (BotFather) |
| `ALLOWED_CHAT_ID` | Chat ID autorisé (toi seul). Récupérable via `/start` |
| `PROJECT_PATH` | Chemin du projet (défaut : `C:/ProjetsPerso/Claude_Projects/MaxPlay`) |

## Flow

```
Toi → bot : "génère mj-21"
Bot → Claude CLI (agent détecté selon mots-clés : narration / game-dev / quick)
Claude → résultat renvoyé dans le chat
```

Les messages sont exécutés directement sans confirmation préalable.

**Permissions d'outils** : si Claude demande une permission (ex. écrire un fichier), le hook `PermissionRequest` envoie un message Telegram avec boutons ✅/❌. Tu valides depuis le téléphone.

## Routing agents

| Mots-clés détectés | Agent utilisé |
|-------------------|---------------|
| narration, histoire, personnage, univers... | `narration` (Opus) |
| jeu, mj, bug, html, phaser... | `game-dev` (Sonnet) |
| Tout le reste | `quick` (Haiku) |

## Commandes

| Commande | Description |
|----------|-------------|
| `/start` | Affiche ton Chat ID (pour configurer `ALLOWED_CHAT_ID`) |
| `/status` | Vérifie que le bot est actif |
| `/reset` | Efface l'historique de conversation |
| Tout autre texte | Envoyé à Claude (agent détecté automatiquement) |

## Démarrage

```bash
cd bot
bun run index.ts
```

Le bot se relance automatiquement à chaque démarrage de Claude Code via le hook `SessionStart` dans `.claude/settings.json`.

Logs : `/tmp/maxplay-bot.log`

## Redémarrer manuellement

```bash
pkill -f "bot/index.ts" && cd bot && bun run index.ts &
```
