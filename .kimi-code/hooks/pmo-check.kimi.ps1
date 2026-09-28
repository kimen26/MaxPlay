# pmo-check.kimi.ps1 — Hook Stop — VERSION KIMI CODE (portage 2026-07-19, remplace la sonde stop-probe)
# Portage de .claude/hooks/pmo-check.ps1 (generalise 3 poles : JEU / DINO / NARRATION).
# Durci vague 1 lot C (R10a), parite avec la version Claude :
#   - retrait de la reference a studio/dino/pmo/ (dossier inexistant)
#   - la trace memoire ne compte que pour un evenement Bash qui ECRIT (indicateur explicite),
#     un `cat`/`grep` seul ne compte plus
#   - les ecritures Bash vers site/ ou studio/ comptent aussi comme "touche"
#   - 2 portes de contenu : mj edite -> test rejoue ; contenu dino edite -> check rejoue
#
# Differences avec la version Claude (adapte au payload/format Kimi) :
#   - Pas de transcript_path dans le payload Stop Kimi : on localise le wire.jsonl de la session
#     via %KIMI_CODE_HOME%|~/.kimi-code/session_index.jsonl (fallback : glob sessions/*/<id>/).
#   - Format wire.jsonl Kimi : evenements context.append_loop_event -> event{type:"tool.call",name,args}
#     (Edit/Write = args.path, Bash = args.command) au lieu du JSONL Claude (message.content tool_use).
#   - Perimetre = LE TOUR (evenements apres le dernier turn.prompt), pas toute la session :
#     plus strict que Claude, aligne doctrine "capture immediate DANS LE TOUR" (2026-07-19).
#   - Pas d'agents custom chez Kimi : la voie (b) "agent <pole>-pmo invoque" devient
#     "playbook .claude/agents/<pole>-pmo.md lu et applique par le main agent" — seule la trace
#     ECRITE dans memory/ (voie a) satisfait mecaniquement le check.
#
# Satisfaire le check, par pole : un fichier memory/ du pole edite/ecrit ce tour.

$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding  = [System.Text.Encoding]::UTF8

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }
try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

if ($data.stop_hook_active -eq $true) { exit 0 }

$sessionId = [string]$data.session_id
if (-not $sessionId) { exit 0 }

# --- Localiser le wire.jsonl de la session ---
$kimiHome = if ($env:KIMI_CODE_HOME) { $env:KIMI_CODE_HOME } else { Join-Path $HOME '.kimi-code' }
$wirePath = ''

$indexFile = Join-Path $kimiHome 'session_index.jsonl'
if (Test-Path $indexFile) {
    foreach ($line in Get-Content -LiteralPath $indexFile -Encoding UTF8) {
        if (-not $line.Trim()) { continue }
        try { $rec = $line | ConvertFrom-Json } catch { continue }
        if ($rec.sessionId -eq $sessionId -and $rec.sessionDir) {
            $candidate = Join-Path ([string]$rec.sessionDir) 'agents\main\wire.jsonl'
            if (Test-Path $candidate) { $wirePath = $candidate; break }
        }
    }
}
if (-not $wirePath) {
    $hit = Get-ChildItem -Path (Join-Path $kimiHome 'sessions') -Directory -ErrorAction SilentlyContinue |
        ForEach-Object { Join-Path $_.FullName "$sessionId\agents\main\wire.jsonl" } |
        Where-Object { Test-Path $_ } | Select-Object -First 1
    if ($hit) { $wirePath = $hit }
}
if (-not $wirePath) { exit 0 }   # session introuvable -> fail-open (philosophie hooks Kimi)

# Indicateur d'ecriture (memes limites documentees que la version Claude : reste simple,
# ne distingue pas un python/node en lecture seule qui citerait par hasard le chemin).
function Test-IsWriteCommand {
    param([string]$cmd)
    if ([string]::IsNullOrEmpty($cmd)) { return $false }
    if ($cmd -match '>>') { return $true }
    if ($cmd -match '(?<!\d)>(?!=)') { return $true }
    if ($cmd -match 'Set-Content|Add-Content|Out-File') { return $true }
    if ($cmd -match 'sed\s+-i') { return $true }
    if ($cmd -match '\b(python3?|node)\b') { return $true }
    return $false
}

# --- Par pole : patterns contenu touche / trace gouvernance (memory/ uniquement, pmo/ retire) ---
$poles = @(
    @{ name = 'NARRATION'; agent = 'narration-pmo';
       touch = @('studio[\\/]narration[\\/]', '\.claude[\\/]agents[\\/]narration-');
       trace = @('studio[\\/]narration[\\/]memory[\\/]') },
    @{ name = 'DINO'; agent = 'dino-pmo';
       touch = @('studio[\\/]dino[\\/]', 'dev-dinos', 'dinos-data', 'audio[\\/]dinos', 'img[\\/]dinos', '\.claude[\\/]agents[\\/]dino-');
       trace = @('studio[\\/]dino[\\/]memory[\\/]', 'studio[\\/]dino[\\/]figees[\\/]') },
    @{ name = 'JEU'; agent = 'game-pmo';
       touch = @('studio[\\/]minijeux[\\/]', 'site[\\/]mj-', '\.claude[\\/]agents[\\/]game-');
       trace = @('studio[\\/]minijeux[\\/]memory[\\/]', 'studio[\\/]minijeux[\\/]docs[\\/]jeux[\\/]figees[\\/]') }
)
foreach ($p in $poles) { $p.touched = $false; $p.traced = $false }

$editedMjIds = New-Object System.Collections.Generic.HashSet[string]
$dinoContentEdited = $false
$turnCommands = New-Object System.Collections.Generic.List[string]

# --- Scanner le wire : uniquement les evenements APRES le dernier turn.prompt (= ce tour) ---
$lines = Get-Content -LiteralPath $wirePath -Encoding UTF8
$lastPrompt = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '"type"\s*:\s*"turn\.prompt"') { $lastPrompt = $i }
}

for ($i = $lastPrompt + 1; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if (-not $line.Trim()) { continue }
    try { $entry = $line | ConvertFrom-Json } catch { continue }
    if ($entry.type -ne 'context.append_loop_event') { continue }
    $ev = $entry.event
    if (-not $ev -or $ev.type -ne 'tool.call') { continue }

    if ($ev.name -in @('Edit', 'Write')) {
        $path = [string]($ev.args.path)
        if (-not $path) { $path = [string]($ev.args.file_path) }   # compat
        if (-not $path) { continue }

        if ($path -match 'site[\\/]mj-[\w-]+\.html$' -and $path -match 'mj-[\w-]+') { [void]$editedMjIds.Add($Matches[0]) }
        if ($path -match 'studio[\\/]dino[\\/]content[\\/]dinos[\\/].*\.json$' -or
            $path -match 'studio[\\/]dino[\\/]content[\\/]scripts-audio[\\/]') { $dinoContentEdited = $true }

        foreach ($p in $poles) {
            $isTrace = $false
            foreach ($t in $p.trace) { if ($path -match $t) { $p.traced = $true; $isTrace = $true } }
            if (-not $isTrace) {
                foreach ($t in $p.touch) {
                    if ($path -match $t) {
                        if ($p.name -eq 'JEU' -and $path -match 'dino') { continue }
                        $p.touched = $true
                    }
                }
            }
        }
    }

    if ($ev.name -eq 'Bash') {
        $cmd = [string]($ev.args.command)
        if ($cmd) {
            $turnCommands.Add($cmd)
            $isWrite = Test-IsWriteCommand -cmd $cmd
            if ($isWrite -and $cmd -match 'site[\\/](mj-[\w-]+)\.html') { [void]$editedMjIds.Add($Matches[1]) }
            if ($isWrite -and ($cmd -match 'studio[\\/]dino[\\/]content[\\/]dinos[\\/]' -or $cmd -match 'studio[\\/]dino[\\/]content[\\/]scripts-audio[\\/]')) { $dinoContentEdited = $true }

            foreach ($p in $poles) {
                if ($isWrite) {
                    foreach ($t in $p.trace) { if ($cmd -match $t) { $p.traced = $true } }
                    foreach ($t in $p.touch) {
                        if ($cmd -match $t) {
                            if ($p.name -eq 'JEU' -and $cmd -match 'dino') { continue }
                            $p.touched = $true
                        }
                    }
                }
            }
        }
    }
}

# --- Porte 1 : gouvernance ---
$missing = @($poles | Where-Object { $_.touched -and -not $_.traced })
if ($missing.Count -gt 0) {
    $names = ($missing | ForEach-Object { $_.name }) -join ' + '
    $details = ($missing | ForEach-Object {
        $dir = if ($_.name -eq 'JEU') { 'minijeux' } elseif ($_.name -eq 'DINO') { 'dino' } else { 'narration' }
        "  - $($_.name) : graver TOI-MEME dans studio/$dir/memory/ (ECRITURE reelle, pas une lecture) — playbook .claude/agents/$($_.agent).md a lire et appliquer, pas de subagent custom sous Kimi."
    }) -join "`n"
    $msg = @"
[hook pmo-check] Fichiers $names modifies ce tour SANS trace de gouvernance.

Regle 2026-07-19 (capture immediate) : toute session qui touche un pole laisse une trace ECRITE
dans sa gouvernance (studio/<pole>/memory/) AVANT de rendre la main.
$details

Idees/decisions de Papa Yann evoquees ce tour et non gravees = a capturer maintenant (1 ligne backlog suffit).
Une fois la trace ecrite, la fin de tour sera autorisee.
"@
    [Console]::Error.WriteLine($msg)
    exit 2
}

# --- Porte 2 : mj edite -> test rejoue ---
if ($editedMjIds.Count -gt 0) {
    $allCmds = ($turnCommands -join "`n")
    foreach ($id in $editedMjIds) {
        $tested = ($allCmds -match [regex]::Escape('npm run gate')) -or
                  (($allCmds -match 'mj:test|test:mj') -and ($allCmds -match [regex]::Escape($id))) -or
                  (($allCmds -match 'run\.mjs') -and ($allCmds -match [regex]::Escape($id)))
        if (-not $tested) {
            [Console]::Error.WriteLine("[hook pmo-check] site/$id.html a ete edite ce tour sans que son test ait ete rejoue.`nLance : npm run test:mj -- $id  (ou : node studio/minijeux/tests/run.mjs $id)  -- ou npm run gate.")
            exit 2
        }
    }
}

# --- Porte 3 : contenu dino edite -> check rejoue ---
if ($dinoContentEdited) {
    $allCmds = ($turnCommands -join "`n")
    $checked = ($allCmds -match [regex]::Escape('npm run check')) -or
               ($allCmds -match [regex]::Escape('npm run gate')) -or
               ($allCmds -match '_verif-scripts-audio')
    if (-not $checked) {
        [Console]::Error.WriteLine("[hook pmo-check] Du contenu dino (content/dinos/*.json ou content/scripts-audio/**) a ete edite ce tour sans porte rejouee.`nLance : node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr  -- ou npm run check  -- ou npm run gate.")
        exit 2
    }
}

exit 0
