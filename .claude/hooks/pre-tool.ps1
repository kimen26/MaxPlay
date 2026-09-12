# pre-tool.ps1 — Dispatcher unique PreToolUse (HO-R04)
# Remplace les 2 entrées PreToolUse de settings.json (figees-injector sur Edit|Write,
# garde-git-add sur Bash|PowerShell) par UN SEUL processus PowerShell qui lit stdin
# une fois, route selon tool_name, puis appelle la logique existante en dot-sourcing
# (pas de re-fork de process). Objectif : 1 seul processus par evenement, < 400 ms.
#
# Contrat : meme JSON en entree (payload PreToolUse standard), meme comportement de
# sortie que les scripts d'origine :
#   - figees-injector : stdout JSON hookSpecificOutput (jamais bloquant, exit 0)
#   - garde-git-add   : stderr + exit 2 si commande git bloquee, sinon exit 0
# Si garde-git-add bloque, on n'a pas besoin d'executer figees-injector (l'outil ne
# passera de toute facon pas) -- mais comme les deux matchers sont mutuellement
# exclusifs par tool_name (Edit|Write vs Bash|PowerShell), un seul des deux blocs
# s'execute jamais dans le meme appel.

$ErrorActionPreference = 'SilentlyContinue'

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

$toolName = [string]$data.tool_name

function Invoke-FigeesInjector {
    param($data, $raw)

    $path = ''
    if ($data.tool_input.file_path) { $path = [string]$data.tool_input.file_path }
    elseif ($data.tool_input.path) { $path = [string]$data.tool_input.path }
    if (-not $path) { exit 0 }

    $norm = $path -replace '\\', '/'
    $root = 'c:\ProjetsPerso\Claude_Projects\MaxPlay'
    $slug = ''
    $figPath = ''
    if ($norm -match 'site/(mj-[\w-]+)\.html$') {
        $slug = $Matches[1]
        $figPath = Join-Path $root ("studio\minijeux\docs\jeux\figees\{0}.md" -f $slug)
    }
    elseif ($norm -match 'site/dev-dinos\.html$' -or
            $norm -match 'site/js/dinos-data\.js$' -or
            $norm -match 'site/audio/dinos/(recit|menu)-[\w-]+\.mp3$' -or
            $norm -match '/studio/dino/') {
        $slug = 'encyclopedie'
        $figPath = Join-Path $root 'studio\dino\figees\encyclopedie.md'
    }
    else { exit 0 }

    if (Test-Path $figPath) {
        $contenu = Get-Content $figPath -Raw -Encoding UTF8
        $ctx = @"
==================================================================
STOP -- $slug.html est sous DECISIONS FIGEES.
Tu DOIS confirmer que ton edit respecte CHAQUE ligne 🔒 ci-dessous
AVANT de continuer. Une ligne ❌ 🔒 est une regression deja commise :
INTERDITE. Si ton changement contredit une ligne 🔒, n'edite pas --
demande a Papa Yann de defiger explicitement.

------- studio/minijeux/docs/jeux/figees/$slug.md -------
$contenu
------- fin fichier LOI -------
==================================================================
"@
    } else {
        $ctx = @"
==================================================================
NOTE -- $slug.html n'a PAS de fichier de decisions figees.
Si tu codes ici un comportement deja valide par Papa Yann, tu DOIS
creer studio/minijeux/docs/jeux/figees/$slug.md via game-pmo ou toi-même pour le figer
(sinon il sera perdu au prochain /compact).
==================================================================
"@
    }

    $out = @{
        hookSpecificOutput = @{
            hookEventName    = 'PreToolUse'
            additionalContext = $ctx
        }
    }
    $out | ConvertTo-Json -Depth 5 -Compress
    exit 0
}

function Invoke-GardeGitAdd {
    param($data)

    $cmd = [string]$data.tool_input.command
    if (-not $cmd) { exit 0 }

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
}

switch -Regex ($toolName) {
    '^(Edit|Write)$'       { Invoke-FigeesInjector -data $data -raw $raw }
    '^(Bash|PowerShell)$'  { Invoke-GardeGitAdd -data $data }
    default                { exit 0 }
}

exit 0
