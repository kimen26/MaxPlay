# pre-tool.ps1 — Dispatcher unique PreToolUse (HO-R04, durci vague 1 lot C — R10/R11 + garde push R08)
# Remplace les 2 entrées PreToolUse de settings.json (figees-injector sur Edit|Write,
# garde-git-add sur Bash|PowerShell) par UN SEUL processus PowerShell qui lit stdin
# une fois, route selon tool_name, puis appelle la logique existante en dot-sourcing
# (pas de re-fork de process). Objectif : 1 seul processus par evenement, < 400 ms.
#
# Contrat : meme JSON en entree (payload PreToolUse standard), meme comportement de
# sortie que les scripts d'origine :
#   - lessons-gate    : stderr + exit 2 si une leçon L- ajoutée à LESSONS.md n'a pas
#                       de marqueur de porte (Porte:/Rule:/Hook:/Figée:/Archive:)
#   - figees-injector : stdout JSON hookSpecificOutput (jamais bloquant, exit 0)
#   - AskUserQuestion  : stderr + exit 2 toujours (pas de formulaire, cf rules/interaction-style.md)
#   - garde-git-add   : stderr + exit 2 si commande git bloquee, sinon exit 0
#     (inclut desormais la garde `git push` scopee site/** + gate vert, et git rm/mv glob)
#
# Encodage : [Console]::OutputEncoding/InputEncoding forcés en UTF-8 (cf signal-detector.ps1:9-10) —
# sans ça, un contenu UTF-8 (emoji 🔒/❌, accents) lu depuis stdin ou écrit vers stdout se corrompt
# silencieusement selon la codepage OS active, et peut même casser le JSON de sortie (observé en
# session réelle : "Single quotes not allowed in JSON" sur un ❌ mal réencodé).

$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding  = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

$toolName = [string]$data.tool_name
# $env:MAXPLAY_HOOK_ROOT permet aux tests (hooks/tests/run.ps1) de pointer la garde push
# vers un repo jetable sans toucher au repo réel. Non défini en usage normal -> chemin réel.
$ROOT = if ($env:MAXPLAY_HOOK_ROOT) { $env:MAXPLAY_HOOK_ROOT } else { 'c:\ProjetsPerso\Claude_Projects\MaxPlay' }

# ==========================================================================
# lessons-gate (R10b) — une leçon L- ajoutée à */memory/LESSONS.md doit porter
# un marqueur de porte, sinon elle sera reperdue/refaite (cf L- répétées observées).
# Ne s'applique JAMAIS à DECISIONS.md, seulement LESSONS.md.
# ==========================================================================
function Invoke-LessonsGate {
    param($data)

    $path = ''
    if ($data.tool_input.file_path) { $path = [string]$data.tool_input.file_path }
    elseif ($data.tool_input.path) { $path = [string]$data.tool_input.path }
    if (-not $path) { return }

    $norm = $path -replace '\\', '/'
    if ($norm -notmatch 'memory/LESSONS\.md$') { return }

    $toolName = [string]$data.tool_name
    $oldText = ''
    $newText = ''

    if ($toolName -eq 'Edit') {
        $oldText = [string]$data.tool_input.old_string
        $newText = [string]$data.tool_input.new_string
    } elseif ($toolName -eq 'Write') {
        $newText = [string]$data.tool_input.content
        $absPath = $path
        if ($absPath -notmatch '^[A-Za-z]:') { $absPath = Join-Path $ROOT $path }
        if (Test-Path -LiteralPath $absPath) {
            $oldText = Get-Content -LiteralPath $absPath -Raw -Encoding UTF8
        }
    } else {
        return
    }

    $oldLines = @()
    if ($oldText) { $oldLines = [string[]]($oldText -split "`r?`n") }
    $newLines = @()
    if ($newText) { $newLines = [string[]]($newText -split "`r?`n") }

    $oldSet = @{}
    foreach ($l in $oldLines) { $oldSet[$l.Trim()] = $true }

    # Une ligne L- est "ajoutée" si elle apparaît dans le nouveau contenu et pas dans l'ancien.
    $addedLessonLine = $false
    $addedLines = New-Object System.Collections.Generic.List[string]
    foreach ($l in $newLines) {
        $t = $l.Trim()
        if (-not $oldSet.ContainsKey($t)) {
            $addedLines.Add($l)
            if ($t -match '^(## L-|- \*\*L-)') { $addedLessonLine = $true }
        }
    }

    if (-not $addedLessonLine) { return }

    $addedBlock = ($addedLines -join "`n")
    if ($addedBlock -notmatch '(Porte\s*:|Rule\s*:|Hook\s*:|Figée\s*:|Archive\s*:)') {
        [Console]::Error.WriteLine('[hook lessons-gate] Une leçon sans porte sera refaite : ajoute Porte :, Rule :, Hook :, Figée : ou Archive :')
        exit 2
    }
}

# ==========================================================================
# figees-injector (R11) — injection ciblée dino/mj des décisions figées.
# DINO : uniquement studio/dino/content/(dinos|scripts-audio|sources)/, site/dev-dinos.html,
# site/audio/dinos/, site/img/dinos/, site/js/gen/dinos-data.js — jamais memory/docs/figees.
# N'injecte que les lignes 🔒/❌ d'encyclopedie.md, au plus 1 fois par TOUR (marqueur relu
# dans le transcript, borné, depuis le dernier VRAI message utilisateur).
# MJ : logique existante conservée telle quelle (marche déjà, pas de dédup demandée).
# ==========================================================================
function Test-DinoFigeeDejaInjecteeCeTour {
    param($data)
    $transcriptPath = [string]$data.transcript_path
    if (-not $transcriptPath -or -not (Test-Path -LiteralPath $transcriptPath)) { return $false }
    try {
        $lines = Get-Content -LiteralPath $transcriptPath -Encoding UTF8 -Tail 2000
    } catch { return $false }
    if (-not $lines) { return $false }

    # Borne = dernier VRAI message utilisateur (type "user" SANS "toolUseResult" —
    # un tool_result est renvoyé côté API avec role "user" aussi, il faut l'exclure).
    $boundary = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '"type"\s*:\s*"user"' -and $lines[$i] -notmatch '"toolUseResult"') {
            $boundary = $i
        }
    }
    for ($i = $boundary + 1; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'MARQUEUR-FIGEE-DINO-CE-TOUR') { return $true }
    }
    return $false
}

function Invoke-FigeesInjector {
    param($data, $raw)

    $path = ''
    if ($data.tool_input.file_path) { $path = [string]$data.tool_input.file_path }
    elseif ($data.tool_input.path) { $path = [string]$data.tool_input.path }
    if (-not $path) { exit 0 }

    $norm = $path -replace '\\', '/'

    if ($norm -match 'site/(mj-[\w-]+)\.html$') {
        $slug = $Matches[1]
        $figPath = Join-Path $ROOT ("studio\minijeux\docs\jeux\figees\{0}.md" -f $slug)

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
    elseif ($norm -match 'studio/dino/content/(dinos|scripts-audio|sources)/' -or
            $norm -match 'site/dev-dinos\.html$' -or
            $norm -match 'site/audio/dinos/' -or
            $norm -match 'site/img/dinos/' -or
            $norm -match 'site/js/gen/dinos-data\.js$') {

        # Exclusion explicite (ceinture + bretelles) : jamais d'injection sur memory/docs/figees,
        # même si un futur élargissement de regex ci-dessus les recouvrait par erreur.
        if ($norm -match 'studio/dino/(memory|docs|figees)/') { exit 0 }

        if (Test-DinoFigeeDejaInjecteeCeTour -data $data) { exit 0 }

        $figPath = Join-Path $ROOT 'studio\dino\figees\encyclopedie.md'

        if (Test-Path $figPath) {
            $allLines = Get-Content -LiteralPath $figPath -Encoding UTF8
            $locked = @($allLines | Where-Object { $_ -match '🔒' -or $_ -match '❌' })
            $contenu = ($locked -join "`n")
            $ctx = @"
==================================================================
STOP -- studio/dino/figees/encyclopedie.md : DECISIONS FIGEES dino (extrait lignes 🔒/❌).
Tu DOIS confirmer que ton edit respecte CHAQUE ligne 🔒 ci-dessous AVANT de continuer.
Une ligne ❌ 🔒 est une regression deja commise : INTERDITE.
Si ton changement contredit une ligne 🔒, n'edite pas -- demande a Papa Yann de defiger explicitement.
Fichier complet (contexte) : studio/dino/figees/encyclopedie.md

------- extrait 🔒/❌ studio/dino/figees/encyclopedie.md -------
$contenu
------- fin extrait -------
==================================================================
MARQUEUR-FIGEE-DINO-CE-TOUR
"@
        } else {
            $ctx = @"
==================================================================
NOTE -- studio/dino/figees/encyclopedie.md n'existe pas.
Si tu codes ici un comportement deja valide par Papa Yann, tu DOIS
creer ce fichier (procedure dino-pmo) pour le figer.
==================================================================
MARQUEUR-FIGEE-DINO-CE-TOUR
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
    else { exit 0 }
}

# ==========================================================================
# AskUserQuestion (R10c) — jamais de formulaire, questions en texte (rules/interaction-style.md).
# ==========================================================================
function Invoke-BlockAskUserQuestion {
    [Console]::Error.WriteLine('Pas de formulaire : pose la question en texte dans ta réponse (rules/interaction-style.md).')
    exit 2
}

# ==========================================================================
# garde-git-add (garde working-tree/index partagé) + garde git push (R08) + git rm/mv glob (R10d)
# ==========================================================================
function Test-SitePushNeedsGate {
    param($root)
    Push-Location $root
    try {
        $diffOut = git diff --name-only origin/master..HEAD -- site/ 2>$null
        $siteDirty = -not [string]::IsNullOrWhiteSpace((($diffOut | Out-String)))
        if (-not $siteDirty) { return $false }

        $greenPath = Join-Path $root 'studio\minijeux\tests\.artifacts\GREEN.json'
        if (-not (Test-Path -LiteralPath $greenPath)) { return $true }

        try {
            $green = Get-Content -LiteralPath $greenPath -Raw -Encoding UTF8 | ConvertFrom-Json
        } catch { return $true }

        $headSha = (git rev-parse HEAD 2>$null | Out-String).Trim()
        if (-not $green.sha -or [string]$green.sha -ne $headSha) { return $true }
        return $false
    } finally {
        Pop-Location
    }
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
        'git\s+clean\b',
        'git\s+(rm|mv)\b[^\r\n]*[*?]'
    )

    foreach ($p in $patterns) {
        if ($cmd -match $p) {
            $msg = @"
[hook garde-git-add] Commande BLOQUEE : elle touche l'index/working tree PARTAGE entre sessions concurrentes,
ou (git rm/mv) risque une suppression/renommage massif via un glob non revu.
Commande : $cmd

Le working tree et l'index git sont partagés entre sessions Claude/Kimi qui tournent en parallèle
sur ce repo. `git add -A`/`.`/`--all`, `git commit -a`, `git stash`, `git checkout -- .`, `git reset`,
`git clean`, `git rm`/`git mv` avec un glob (`*`/`?`) peuvent stager, écraser, supprimer ou renommer en
masse le travail EN COURS d'une autre session (leçon L-007, L-D-44).

Autorisé : `git add/rm/mv <chemin1> <chemin2> ...` avec des chemins EXPLICITES (pas de glob).
Si tu es un exécutant de handoff : tu n'as de toute façon aucune commande git à lancer —
c'est l'orchestrateur qui commite.
"@
            [Console]::Error.WriteLine($msg)
            exit 2
        }
    }

    if ($cmd -match 'git\s+push\b') {
        if (Test-SitePushNeedsGate -root $ROOT) {
            [Console]::Error.WriteLine('Mise en ligne bloquée : des fichiers de site/ partent sans contrôle vert. Lance `npm run gate`, puis repousse.')
            exit 2
        }
    }

    exit 0
}

switch -Regex ($toolName) {
    '^(Edit|Write)$' {
        Invoke-LessonsGate -data $data
        Invoke-FigeesInjector -data $data -raw $raw
    }
    '^(Bash|PowerShell)$'  { Invoke-GardeGitAdd -data $data }
    '^AskUserQuestion$'    { Invoke-BlockAskUserQuestion }
    default                { exit 0 }
}

exit 0
