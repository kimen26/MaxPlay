# HO-G03 — Liens cassés config active + purge settings + figees-injector

**Statut :** pret
**Depend de :** —

## Objectif
Plus aucun lien cassé dans les fichiers que Claude charge automatiquement (skills, rules, CLAUDE.md minijeux, hook), et un `settings.json` sans commandes jetables.

## Contexte a lire d'abord
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 points 8, 16, 18
- Réorganisation 2026-06-04 : `game/web/` → `site/`, `game/docs/` → `studio/minijeux/docs/`, `game/` → `studio/minijeux/`. Le skill `maxplay-tiles` vit dans `.claude/skills/maxplay-tiles/` (projet), PAS dans `~/.claude/skills/`.
- Agents supprimés le 2026-07-19 : `game-mj-pmo`, `game-tile-pmo`, `game-archiviste`, `narration-archiviste` → tous remplacés par `game-pmo` / `narration-pmo` / `dino-pmo`.

## Fichiers autorises
- `.claude/skills/maxplay-tiles/**` (liens et chemins seulement, pas le fond)
- `.claude/rules/tile-tools.md`, `.claude/rules/lunii.md` (liens seulement)
- `studio/minijeux/CLAUDE.md`, `studio/minijeux/INDEX.md` (uniquement les lignes contenant un lien vers `C:/Users/kimen/.claude/skills/maxplay-tiles`)
- `site/PIPELINE-MEMORY-MJ.md` (liens vers agents supprimés → agents actuels ; si le fichier entier est périmé, le dire dans le rapport, ne pas le supprimer)
- `.claude/hooks/figees-injector.ps1` (le texte du message NOTE : « via game-mj-pmo » → « via game-pmo ou toi-même »)
- `.claude/settings.json` : **clé `permissions.allow` uniquement**. Ne pas toucher `hooks`, `additionalDirectories`, `enabledMcpjsonServers`, `allowedHttpHookUrls`, `effortLevel`.

## Hors perimetre
- `.claude/skills/narration-craft/**` et `.claude/rules/narration-craft.md` (HO-G06). Aucune commande git.

## Travail
1. Lancer le scan de liens ci-dessous, corriger chaque lien cassé des fichiers autorisés vers le chemin réel (vérifier l'existence de la cible avec `ls`). Un lien dont la cible n'existe plus nulle part → remplacer par du texte sans lien + note « (fichier disparu, voir git) ».
2. `settings.json` `permissions.allow` : garder uniquement les règles génériques et réutilisables (patrons `*`, outils MCP, `WebFetch(domain:…)`, `Bash(git:*)`, `Bash(npm run *)`, `Read(...)`, `Skill(...)`, `Edit(~/.claude/skills/...)` sauf `cheikh` et `00-project`). Supprimer toute règle qui contient un chemin de fichier précis, un ID de transcript `.jsonl`, un `Start-Process`, un `Stop-Process`, un `Get-CimInstance`, un `sed -i` sur un fichier nommé, un `awk 'NR…'`, un `node -e "…"` de plus de 60 caractères. Valider le JSON (`python3 -c "import json;json.load(open('.claude/settings.json'))"`). Cible : ≤ 45 entrées. Lister dans le rapport ce qui a été retiré.

## Portes de verification
```bash
python3 - <<'EOF'
import re,os
files=["site/PIPELINE-MEMORY-MJ.md",".claude/rules/tile-tools.md",".claude/rules/lunii.md","studio/minijeux/CLAUDE.md","studio/minijeux/INDEX.md"]
import glob; files+=glob.glob(".claude/skills/maxplay-tiles/**/*.md",recursive=True)
bad=0
for f in files:
    t=open(f,encoding="utf-8",errors="ignore").read()
    for l in re.findall(r'\]\(([^)#\s]+?)(?:#[^)]*)?\)',t):
        if l.startswith("http"): continue
        p=os.path.normpath(os.path.join(os.path.dirname(f),l))
        if not os.path.exists(p): bad+=1; print("CASSE",f,l)
print("cassés:",bad)      # attendu 0
EOF
python3 -c "import json;d=json.load(open('.claude/settings.json'));print(len(d['permissions']['allow']));print('hooks' in d, 'additionalDirectories' in d['permissions'])"   # <=45, True True
grep -n "game-mj-pmo\|game-tile-pmo\|archiviste" .claude/hooks/figees-injector.ps1 site/PIPELINE-MEMORY-MJ.md   # 0
```

## Rapport attendu
Table lien cassé → correction, liste des `allow` supprimés, sortie des portes.
