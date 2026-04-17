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

## Flow de validation

Chaque message déclenche une confirmation avant exécution :

```
Toi → bot : "génère mj-18"
Bot → toi : 📨 Demande reçue … [✅ Exécuter] [❌ Annuler]
Toi → bot : clique ✅
Bot → Claude CLI → résultat renvoyé dans le chat
```

Aucune commande Claude ne s'exécute sans ton approbation explicite.

## Commandes

| Commande | Description |
|----------|-------------|
| `/start` | Affiche ton Chat ID (pour configurer `ALLOWED_CHAT_ID`) |
| `/status` | Vérifie que le bot est actif |
| Tout autre texte | Demande de validation → exécution Claude si approuvé |

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
