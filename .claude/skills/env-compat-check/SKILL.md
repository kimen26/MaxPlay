---
name: env-compat-check
description: Audit de compatibilité bi-outil Claude Code / Kimi Code — vérifie que AGENTS.md, skills, hooks et configs restent synchronisés et valides des deux côtés
whenToUse: Quand l'utilisateur demande un check/audit de compatibilité d'environnement, une validation de la config Claude/Kimi, ou périodiquement après toute modif de CLAUDE.md, .claude/skills, .claude/settings.json ou ~/.kimi-code/config.toml
---

# Skill : env-compat-check

> Audit de dérive **bi-outil** (Claude Code ↔ Kimi Code) pour MaxPlay.
> Créé 2026-07-19 après le portage Kimi (AGENTS.md, hooks, extra_skill_dirs).
> Exécute les checks **dans l'ordre**, note ✅ / ⚠️ / ❌ pour chacun, et termine par un tableau récap.

Contexte à connaître avant de commencer :

- `~/.kimi-code/config.toml` = config Kimi **globale** (user-level, pas de config hooks par projet chez Kimi).
- `.kimi-code/hooks/*.ps1` = versions Kimi des hooks (les versions `.claude/hooks/` restent pour Claude Code).
- PowerShell 5.1 exige l'**UTF-8 avec BOM** pour parser les accents/emoji des .ps1.
- Décisions de non-portage **volontaires** (ne pas remonter comme erreurs) :
  - SessionStart (lancement bot Telegram) — Claude only, demandé par Papa Yann
  - PostToolUse commit INBOX — Claude only
  - PermissionRequest http (localhost:3001) — pas d'équivalent `type: http` chez Kimi
- Porté le 2026-07-19 (n'est plus un manque) : Stop `pmo-check.ps1` → `.kimi-code/hooks/pmo-check.kimi.ps1` (check 9). Différences assumées vs Claude : périmètre = le tour (événements après le dernier `turn.prompt` du wire.jsonl, plus strict, aligné « capture immédiate DANS LE TOUR ») ; voie « agent PMO invoqué » absente (pas de subagent custom chez Kimi) → seule la trace `pmo/` satisfait le check. `stop-probe.kimi.ps1` reste sur disque mais n'est plus branché dans config.toml.
- Équivalent Kimi des rules path-scoped : pas d'injection native par path chez Kimi — le rappel est porté par `figees-injector.kimi.ps1` (PreToolUse) qui injecte un pointeur vers `.claude/rules/mini-jeux.md` / `dino.md` selon le path édité.
- MCP : côté Claude, serveurs dans `~/.claude.json` (clé `mcpServers` globale + `projects.<cwd>.mcpServers`) + `.mcp.json` racine ; côté Kimi, `~/.kimi-code/mcp.json` (user) + `.kimi-code/mcp.json` (projet, prioritaire). **Règle secrets : user-level uniquement, jamais de `mcp.json` avec clés API dans le repo.** Les clés `env` sont copiées côté Kimi sans jamais être affichées.

---

## Check 1 — Config Kimi : TOML valide

```bash
P=$(cygpath -w "$HOME/.kimi-code/config.toml"); python -c "import tomllib; d=tomllib.load(open(r'$P','rb')); print('OK', len(d.get('hooks',[])), 'hooks,', len(d.get('extra_skill_dirs',[])), 'skill_dirs')"
```

⚠️ Sous Git Bash Windows, Python ne comprend pas les chemins MSYS (`/c/Users/...`) — toujours passer par `cygpath -w` (sinon faux `FileNotFoundError`).

✅ attendu : `OK 3 hooks, 3 skill_dirs` (skills projet + skills globaux Claude + CheiKh).
❌ si exception → config cassée, restaurer depuis le backup le plus récent (`ls -t $HOME/.kimi-code/config.toml.*.bak | head -1`).

## Check 2 — extra_skill_dirs : chemins vivants

```bash
P=$(cygpath -w "$HOME/.kimi-code/config.toml"); python -c "import tomllib,os; d=tomllib.load(open(r'$P','rb')); [print(('OK ' if os.path.isdir(p) else 'MORT ')+p) for p in d.get('extra_skill_dirs',[])]"
```

✅ tous `OK`. ❌ un chemin `MORT` = dérive typique (ex : purge/archivage de skills comme le commit 3e9555bd) → retirer le chemin de `extra_skill_dirs` ou le repointer.

## Check 3 — merge_all_available_skills actif

```bash
grep -c 'merge_all_available_skills = true' "$HOME/.kimi-code/config.toml"
```

✅ `1`. ❌ `0` → les skills projet ne sont pas fusionnés côté Kimi.

## Check 4 — Miroir AGENTS.md racine à jour

```bash
[ CLAUDE.md -nt AGENTS.md ] && echo "DRIFT: CLAUDE.md plus récent que AGENTS.md" || echo "OK frais"
grep -c "ACTION OBLIGATOIRE" AGENTS.md
```

✅ `OK frais` + grep `1`. ⚠️ DRIFT → régénérer AGENTS.md depuis CLAUDE.md (miroir + bandeau, voir en-tête d'AGENTS.md).

## Check 5 — AGENTS.md de pôle présents

```bash
for d in studio/minijeux studio/dino studio/narration; do
  [ -f "$d/CLAUDE.md" ] && { [ -f "$d/AGENTS.md" ] && echo "OK $d" || echo "MANQUANT $d/AGENTS.md"; }
done
```

✅ trois `OK`. Règle : tout pôle avec un CLAUDE.md doit avoir son AGENTS.md (pointeur Kimi).

## Check 6 — Skills : frontmatter Kimi-compatible

```bash
for f in .claude/skills/*/SKILL.md; do
  n=$(grep -m1 '^name:' "$f"); d=$(grep -m1 '^description:' "$f")
  [ -n "$n" ] && [ -n "$d" ] && echo "OK $f" || echo "KO $f (name/description manquant)"
done
```

✅ tous `OK` — Kimi **ignore silencieusement** un SKILL.md de dossier sans `name`+`description`. (Précédent : qwen3-tts, corrigé puis purgé.)

## Check 7 — Parité hooks Claude ↔ Kimi

```bash
node -e "console.log(Object.keys(require('./.claude/settings.json').hooks).join(', '))"
grep 'event = ' "$HOME/.kimi-code/config.toml"
```

Comparer puis vérifier que chaque event Claude est soit **porté** (entrée Kimi), soit dans la liste des non-portés volontaires (en-tête de ce skill). Attendu aujourd'hui : `UserPromptSubmit`, `PreToolUse`, `Stop` côté Kimi. Vérifier aussi que les **messages** des rappels de `signal-detector.kimi.ps1` sont identiques à ceux de `.claude/hooks/signal-detector.ps1` (resync à chaque modif de la version Claude) :

```bash
diff <(grep 'SIGNAL' .claude/hooks/signal-detector.ps1 | grep -o '\[SIGNAL[^"]*') \
     <(grep 'SIGNAL' .kimi-code/hooks/signal-detector.kimi.ps1 | grep -o '\[SIGNAL[^"]*') && echo "OK messages identiques"
```

## Check 8 — Scripts hooks Kimi : existent + BOM UTF-8

```bash
for f in .kimi-code/hooks/*.ps1; do
  bom=$(head -c3 "$f" | od -An -tx1 | tr -d ' \n')
  [ "$bom" = "efbbbf" ] && echo "OK $f" || echo "KO $f : pas de BOM UTF-8 (accents/emoji cassés sous PS 5.1)"
done
```

✅ tous `OK`. Réparation si KO — préfixe le BOM au niveau octet (le one-liner PowerShell `$s=[IO.File]...` casse sous Git Bash, qui avale les `$`) :

```bash
printf '\xef\xbb\xbf' | cat - FICHIER > FICHIER.tmp && mv FICHIER.tmp FICHIER
```

⚠️ Les outils d'édition (Edit/Write) peuvent **perdre le BOM** d'un .ps1 — revérifier après toute modif d'un hook, et éviter les caractères exotiques (tiret cadratin `—`) qui font échouer le parse PS 5.1 sans BOM.

## Check 9 — Stop pmo-check porté (depuis 2026-07-19)

```bash
grep -c 'pmo-check.kimi.ps1' "$HOME/.kimi-code/config.toml"
ls .kimi-code/hooks/pmo-check.kimi.ps1
```

✅ `1` + fichier présent. Smoke test bloquant/passant (crée une session fake, vérifie exit 2 sans trace pmo/ et exit 0 avec, puis nettoie) :

```bash
FAKE="$HOME/.kimi-code/sessions/wd_smoketest/session_fake-pmo-test/agents/main"; mkdir -p "$FAKE"
printf '%s\n' '{"type":"turn.prompt","input":[{"type":"text","text":"t"}]}' \
  '{"type":"context.append_loop_event","event":{"type":"tool.call","name":"Edit","args":{"path":"site/mj-01.html"}}}' > "$FAKE/wire.jsonl"
P='{"hook_event_name":"Stop","session_id":"session_fake-pmo-test","cwd":"x","stop_hook_active":false}'
echo "$P" | powershell -NoProfile -ExecutionPolicy Bypass -File ".kimi-code/hooks/pmo-check.kimi.ps1" >/dev/null 2>&1; echo "sans trace (attendu 2) = $?"
printf '%s\n' '{"type":"context.append_loop_event","event":{"type":"tool.call","name":"Edit","args":{"path":"studio/minijeux/pmo/backlog.md"}}}' >> "$FAKE/wire.jsonl"
echo "$P" | powershell -NoProfile -ExecutionPolicy Bypass -File ".kimi-code/hooks/pmo-check.kimi.ps1" >/dev/null 2>&1; echo "avec trace (attendu 0) = $?"
rm -rf "$HOME/.kimi-code/sessions/wd_smoketest"
```

❌ exit inattendu ou hook absent de config.toml → rebrancher la commande Stop sur `pmo-check.kimi.ps1` (backup config d'abord). Le hook localise le wire via `session_index.jsonl` (fallback glob `sessions/*/<id>/`) et fail-open si introuvable.

## Check 10 — Smoke test des hooks actifs (signal-detector + figees-injector)

```bash
echo '{"hook_event_name":"UserPromptSubmit","prompt":"ajouter un mini-jeu bus"}' | powershell -NoProfile -ExecutionPolicy Bypass -File ".kimi-code/hooks/signal-detector.kimi.ps1" | grep -c "SIGNAL JEU"
echo '{"hook_event_name":"PreToolUse","tool_input":{"path":"C:/ProjetsPerso/Claude_Projects/MaxPlay/site/mj-01.html"}}' | powershell -NoProfile -ExecutionPolicy Bypass -File ".kimi-code/hooks/figees-injector.kimi.ps1" | grep -c "DECISIONS FIGEES"
```

✅ `1` et `1`.

## Check 11 — Parité MCP Claude ↔ Kimi (bidirectionnel)

Compare les serveurs MCP déclarés des deux côtés (noms uniquement — **jamais les valeurs `env`**, ce sont des secrets) + vérifie que les binaires `command` existent :

```bash
python << 'EOF'
import json, os, shutil
home = os.path.expanduser('~')
def load(p):
    try: return json.load(open(p, encoding='utf-8'))
    except Exception: return {}
def servers(d): return d.get('mcpServers') or {}

# Côté Claude : global + projet courant + .mcp.json racine
claude = load(os.path.join(home, '.claude.json'))
c = dict(servers(claude))
cwd = os.path.normpath(os.getcwd()).lower()
for path, pcfg in (claude.get('projects') or {}).items():
    if os.path.normpath(path).lower() == cwd:
        c.update(servers(pcfg))
c.update(servers(load('.mcp.json')))

# Côté Kimi : user + projet
k = dict(servers(load(os.path.join(home, '.kimi-code', 'mcp.json'))))
k.update(servers(load('.kimi-code/mcp.json')))

drift = False
for n in sorted(set(c) | set(k)):
    if n in c and n in k: print(f'OK          {n}')
    else:
        drift = True
        print(f'{"CLAUDE-ONLY" if n in c else "KIMI-ONLY "}  {n}')
for n, cfg in {**c, **k}.items():
    cmd = cfg.get('command')
    if cmd and not shutil.which(cmd) and not os.path.isfile(cmd):
        drift = True; print(f'BINAIRE MANQUANT {n}: {cmd}')
print('PARITE OK' if not drift else 'DRIFT -> recopier le serveur manquant de l\'autre cote (env comprises, sans les afficher)')
EOF
```

✅ chaque serveur en `OK` + `PARITE OK`. ❌ `CLAUDE-ONLY` / `KIMI-ONLY` = dérive → recopier l'entrée de l'autre côté (format identique `mcpServers`, copier les `env` sans les afficher ; user-level côté Kimi). `BINAIRE MANQUANT` = `command` introuvable (ex : bun/npx hors PATH, exe supprimé). Exception légitime possible : un serveur volontairement mono-outil — le documenter alors dans l'en-tête de ce skill (non-portage volontaire).

## Check 11b — MCP : pas de placeholder `${VAR}` non résolu (ajout 2026-08-03)

> Leçon EP-DINO-BUG-MCP-CLE-EL : Claude Code **résout** `"${ELEVENLABS_API_KEY}"` depuis le bloc `env` de `~/.claude/settings.json` ; Kimi Code **ne le résout pas** → le placeholder part tel quel comme clé → **401 invalid_api_key** silencieux côté Kimi (alors que « ça marche sous Claude »). Incident réel 2026-08-03 : 7 placeholders cassés dans `~/.kimi-code/mcp.json` (llm-copains + elevenlabs).

```bash
for f in "$HOME/.kimi-code/mcp.json" .kimi-code/mcp.json "$HOME/.claude.json" .mcp.json; do
  [ -f "$f" ] && grep -q '\${' "$f" && echo "PLACEHOLDER ${f} : $(grep -o '\${[A-Z_]*}' "$f" | sort -u | tr '\n' ' ')"
done; echo "check terminé"
```

✅ aucune ligne `PLACEHOLDER` côté Kimi (côté Claude c'est toléré, l'expansion y fonctionne — mais préférer la valeur réelle pour rester bi-outil). ❌ placeholder côté Kimi → remplacer par la valeur réelle depuis `~/.claude/settings.json` → `env` (backup d'abord, **sans jamais afficher la clé**), puis redémarrer la session (les process MCP gardent l'env de leur spawn).

---

## Rapport final attendu

| # | Check | Claude | Kimi | Statut |
|---|-------|--------|------|--------|
| 1-3 | Config | n/a | … | ✅/❌ |
| 4-5 | Mémoire (AGENTS.md) | … | … | |
| 6 | Skills | … | … | |
| 7-10 | Hooks | … | … | |
| 11 | MCP | … | … | |

Terminer par : liste des dérives trouvées + action corrective proposée pour chacune (ne pas corriger sans accord, sauf régénération AGENTS.md qui est sans risque).
