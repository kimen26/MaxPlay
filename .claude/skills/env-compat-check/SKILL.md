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
  - PostToolUse tsc (max-adventure) et commit INBOX — Claude only
  - PermissionRequest http (localhost:3001) — pas d'équivalent `type: http` chez Kimi
  - Stop `pmo-check.ps1` (ex-narration-pmo-check, généralisé 3 pôles le 2026-07-19) — dépend de transcript_path Claude ; sonde Kimi en attente (check 9). La voie par défaut « capture immédiate par le main agent » est portée côté Kimi via les AGENTS.md de pôle + signal-detector.kimi.ps1

---

## Check 1 — Config Kimi : TOML valide

```bash
python -c "import tomllib; d=tomllib.load(open('$HOME/.kimi-code/config.toml','rb')); print('OK', len(d.get('hooks',[])), 'hooks,', len(d.get('extra_skill_dirs',[])), 'skill_dirs')"
```

✅ attendu : `OK 3 hooks, 3 skill_dirs` (skills projet + skills globaux Claude + CheiKh).
❌ si exception → config cassée, restaurer depuis le backup le plus récent (`ls -t $HOME/.kimi-code/config.toml.*.bak | head -1`).

## Check 2 — extra_skill_dirs : chemins vivants

```bash
python -c "import tomllib,os; d=tomllib.load(open('$HOME/.kimi-code/config.toml','rb')); [print(('OK ' if os.path.isdir(p) else 'MORT ')+p) for p in d.get('extra_skill_dirs',[])]"
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

✅ tous `OK`. Réparation si KO :

```bash
powershell -NoProfile -Command "$s=[IO.File]::ReadAllText('CHEMIN',[Text.Encoding]::UTF8); [IO.File]::WriteAllText('CHEMIN',$s,(New-Object Text.UTF8Encoding($true)))"
```

## Check 9 — Sonde Stop (portage narration-pmo-check en attente)

```bash
wc -l .kimi-code/hooks/stop-payload.jsonl 2>/dev/null || echo "pas encore de payload"
```

⚠️ rappel : tant que le vrai portage du Stop `pmo-check.ps1` n'est pas fait, la gouvernance pôle n'est **pas enforced** côté Kimi — mais la voie par défaut 2026-07-19 (« capture immédiate par le main agent ») est portée en advisory via les AGENTS.md de pôle et le signal-detector Kimi, donc le manque est limité au filet de sécurité bloquant. Si le fichier a grossi (payloads réels disponibles) → proposer le portage.

## Check 10 — Smoke test des 2 hooks actifs

```bash
echo '{"hook_event_name":"UserPromptSubmit","prompt":"ajouter un mini-jeu bus"}' | powershell -NoProfile -ExecutionPolicy Bypass -File ".kimi-code/hooks/signal-detector.kimi.ps1" | grep -c "SIGNAL JEU"
echo '{"hook_event_name":"PreToolUse","tool_input":{"path":"C:/ProjetsPerso/Claude_Projects/MaxPlay/site/mj-01.html"}}' | powershell -NoProfile -ExecutionPolicy Bypass -File ".kimi-code/hooks/figees-injector.kimi.ps1" | grep -c "DECISIONS FIGEES"
```

✅ `1` et `1`.

---

## Rapport final attendu

| # | Check | Claude | Kimi | Statut |
|---|-------|--------|------|--------|
| 1-3 | Config | n/a | … | ✅/❌ |
| 4-5 | Mémoire (AGENTS.md) | … | … | |
| 6 | Skills | … | … | |
| 7-10 | Hooks | … | … | |

Terminer par : liste des dérives trouvées + action corrective proposée pour chacune (ne pas corriger sans accord, sauf régénération AGENTS.md qui est sans risque).
