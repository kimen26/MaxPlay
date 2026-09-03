# garde-git-add.ps1 — Hook PreToolUse (Bash|PowerShell)
# Bloque les commandes git qui touchent l'index/working tree PARTAGE entre sessions concurrentes
# (plusieurs sessions Claude/Kimi travaillent dans le meme repo, meme index git).
# Regle non-negociable HO-G07 : l'orchestrateur commite avec `git add <chemins>` explicites,
# jamais un exécutant, jamais de staging/reset large qui emporterait le travail d'une autre session.
#
# Bloque : git add -A / git add . / git add --all / git commit -a
#        + git stash / git checkout -- / git checkout . / git reset / git clean
#          (leçon L-007 racine : un exécutant a fait `git stash` sur le working tree partagé
#          et a écrasé le travail en cours d'une autre session).
# Laisse passer : git add <chemin(s) explicites>, git status, git diff, git log, etc.

$ErrorActionPreference = 'SilentlyContinue'

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

$cmd = [string]$data.tool_input.command
if (-not $cmd) { exit 0 }

# Motifs bloquants (regex, insensible à la casse)
$patterns = @(
    'git\s+add\s+(-A\b|--all\b)',
    'git\s+add\s+\.\s*(\s|$|&&|;|\|)',
    'git\s+commit\s+(-\S*a\S*\b|--all\b)',
    'git\s+stash\b',
    'git\s+checkout\s+--\s',
    'git\s+checkout\s+\.\s*(\s|$|&&|;|\|)',
    'git\s+reset\b',
    'git\s+clean\b'
)

foreach ($p in $patterns) {
    if ($cmd -match $p) {
        $msg = @"
[hook garde-git-add] Commande BLOQUEE : elle touche l'index/working tree PARTAGE entre sessions concurrentes.
Commande : $cmd

Le working tree et l'index git sont partagés entre sessions Claude/Kimi qui tournent en parallèle
sur ce repo. `git add -A`/`.`/`--all`, `git commit -a`, `git stash`, `git checkout -- .`, `git reset`,
`git clean` peuvent stager, écraser ou effacer le travail EN COURS d'une autre session (leçon L-007).

Autorisé : `git add <chemin1> <chemin2> ...` avec des chemins EXPLICITES.
Si tu es un exécutant de handoff : tu n'as de toute façon aucune commande git à lancer —
c'est l'orchestrateur qui commite.
"@
        [Console]::Error.WriteLine($msg)
        exit 2
    }
}

exit 0
