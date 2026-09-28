# Stop hook — pmo-check.ps1 (généralisé 3 pôles, remplace narration-pmo-check.ps1 le 2026-07-19)
# Durci vague 1 lot C (R10a) :
#   - retrait de la référence à studio/dino/pmo/ (dossier inexistant)
#   - la trace mémoire ne compte que pour une commande qui ÉCRIT (Edit/Write sur memory/,
#     ou Bash/PowerShell avec un indicateur d'écriture explicite ET qui cite le chemin memory/
#     du pôle) — un `cat`/`grep` seul ne compte plus
#   - les écritures Bash/PowerShell vers site/ ou studio/ comptent aussi comme "touché"
#   - 2 portes de contenu spécifiques : mj édité -> test rejoué ; contenu dino édité -> check rejoué
#
# Si le tour a modifié des fichiers d'un pôle (JEU / DINO / NARRATION) SANS trace de gouvernance,
# bloque la fin de tour. Deux façons de satisfaire le check, par pôle :
#   a) un fichier memory/ du pôle a été édité/écrit ce tour (capture directe main agent — voie par défaut)
#   b) l'agent <pole>-pmo a été invoqué ce tour
# Décision 2026-07-19 : capture immédiate par le main agent = voie par défaut (REX PMO menteurs).

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding  = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

try {
    $raw = [Console]::In.ReadToEnd()
    if ([string]::IsNullOrWhiteSpace($raw)) { exit 0 }
    $input_json = $raw | ConvertFrom-Json
} catch { exit 0 }

if ($input_json.stop_hook_active -eq $true) { exit 0 }

$transcript_path = $input_json.transcript_path
if ([string]::IsNullOrEmpty($transcript_path) -or -not (Test-Path -LiteralPath $transcript_path)) { exit 0 }

# Indicateur d'écriture : reste volontairement simple (documente sa propre limite) —
# détecte une redirection shell, une cmdlet PowerShell d'écriture de fichier, un `sed -i`,
# ou l'invocation d'un interpréteur python/node (script externe qui peut écrire sans que
# la redirection soit visible dans la ligne de commande elle-même). Un `cat`/`grep`/`head`
# seul ne matche aucun de ces motifs.
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

# Par pôle : patterns de contenu touché / patterns de trace gouvernance / agent PMO
$poles = @(
    @{ name = "NARRATION"; agent = "narration-pmo";
       touch = @("studio[\\/]narration[\\/]", "\.claude[\\/]agents[\\/]narration-");
       trace = @("studio[\\/]narration[\\/]memory[\\/]") },
    @{ name = "DINO"; agent = "dino-pmo";
       touch = @("studio[\\/]dino[\\/]", "dev-dinos", "dinos-data", "audio[\\/]dinos", "img[\\/]dinos", "\.claude[\\/]agents[\\/]dino-");
       trace = @("studio[\\/]dino[\\/]memory[\\/]", "studio[\\/]dino[\\/]figees[\\/]") },
    @{ name = "JEU"; agent = "game-pmo";
       touch = @("studio[\\/]minijeux[\\/]", "site[\\/]mj-", "\.claude[\\/]agents[\\/]game-");
       trace = @("studio[\\/]minijeux[\\/]memory[\\/]", "studio[\\/]minijeux[\\/]docs[\\/]jeux[\\/]figees[\\/]") }
)

foreach ($p in $poles) { $p.touched = $false; $p.traced = $false; $p.invoked = $false }

# Portes de contenu (R10a) : ids mj édités ce tour, contenu dino édité ce tour, commandes du tour.
$editedMjIds = New-Object System.Collections.Generic.HashSet[string]
$dinoContentEdited = $false
$turnCommands = New-Object System.Collections.Generic.List[string]

# Lecture bornee (HO-R04) : seules les 2000 dernieres lignes du transcript sont
# examinees -- le pmo-check porte sur "ce tour", jamais besoin de relire toute une
# session longue pour ca, et un transcript volumineux ne doit pas faire trainer le
# hook Stop.
$lines = Get-Content -LiteralPath $transcript_path -Encoding UTF8 -Tail 2000
foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    try { $entry = $line | ConvertFrom-Json } catch { continue }
    if (-not $entry.message -or -not $entry.message.content) { continue }

    foreach ($content in $entry.message.content) {
        if ($content.type -ne "tool_use") { continue }

        if ($content.name -in @("Edit", "Write", "MultiEdit")) {
            $path = $content.input.file_path
            if ([string]::IsNullOrEmpty($path)) { continue }

            if ($path -match 'site[\\/]mj-[\w-]+\.html$') {
                if ($path -match 'mj-[\w-]+') { [void]$editedMjIds.Add($Matches[0]) }
            }
            if ($path -match 'studio[\\/]dino[\\/]content[\\/]dinos[\\/].*\.json$' -or
                $path -match 'studio[\\/]dino[\\/]content[\\/]scripts-audio[\\/]') {
                $dinoContentEdited = $true
            }

            foreach ($p in $poles) {
                # La trace memory/figees est prioritaire : un edit dedans ne compte pas comme "contenu touché"
                $isTrace = $false
                foreach ($t in $p.trace) { if ($path -match $t) { $p.traced = $true; $isTrace = $true } }
                if (-not $isTrace) {
                    foreach ($t in $p.touch) {
                        if ($path -match $t) {
                            # exclusion : les fichiers dino de site/ ne déclenchent pas le pôle JEU
                            if ($p.name -eq "JEU" -and $path -match "dino") { continue }
                            $p.touched = $true
                        }
                    }
                }
            }
        }

        if ($content.name -eq "Agent") {
            $st = $content.input.subagent_type
            foreach ($p in $poles) { if ($st -eq $p.agent) { $p.invoked = $true } }
        }

        if ($content.name -in @("Bash", "PowerShell")) {
            $cmd = $content.input.command
            if (-not [string]::IsNullOrEmpty($cmd)) {
                $turnCommands.Add($cmd)
                $isWrite = Test-IsWriteCommand -cmd $cmd

                if ($cmd -match 'mj-[\w-]+') {
                    # une commande Bash qui MODIFIE un fichier site/mj-XX.html compte aussi
                    if ($isWrite -and $cmd -match 'site[\\/](mj-[\w-]+)\.html') { [void]$editedMjIds.Add($Matches[1]) }
                }
                if ($isWrite -and ($cmd -match 'studio[\\/]dino[\\/]content[\\/]dinos[\\/]' -or $cmd -match 'studio[\\/]dino[\\/]content[\\/]scripts-audio[\\/]')) {
                    $dinoContentEdited = $true
                }

                foreach ($p in $poles) {
                    # trace : ECRITURE explicite dans memory/figees du pôle (un cat/grep ne compte plus)
                    if ($isWrite) {
                        foreach ($t in $p.trace) { if ($cmd -match $t) { $p.traced = $true } }
                    }
                    # touched : écriture Bash/PowerShell vers site/ ou studio/ du pôle
                    if ($isWrite) {
                        foreach ($t in $p.touch) {
                            if ($cmd -match $t) {
                                if ($p.name -eq "JEU" -and $cmd -match "dino") { continue }
                                $p.touched = $true
                            }
                        }
                    }
                }
            }
        }
    }
}

# --- Porte 1 : gouvernance (trace mémoire par pôle) ---
$missing = @()
foreach ($p in $poles) {
    if ($p.touched -and -not ($p.traced -or $p.invoked)) { $missing += $p }
}

if ($missing.Count -gt 0) {
    $names = ($missing | ForEach-Object { $_.name }) -join " + "
    $details = ($missing | ForEach-Object {
        $dir = if ($_.name -eq 'JEU') { 'minijeux' } elseif ($_.name -eq 'DINO') { 'dino' } else { 'narration' }
        "  - $($_.name) : graver TOI-MEME dans studio/$dir/memory/ : TODO.md / DECISIONS.md / LESSONS.md / MEMORY.md § Journal (a minima, ECRITURE reelle, pas juste une lecture) OU invoquer l'agent $($_.agent)."
    }) -join "`n"
    $msg = @"
[hook pmo-check] Fichiers $names modifies ce tour SANS trace de gouvernance.

Regle 2026-07-19 (capture immediate) : toute session qui touche un pole laisse une trace ECRITE dans
sa gouvernance (studio/<pole>/memory/) AVANT de rendre la main.
$details

Idees/decisions de Papa Yann evoquees ce tour et non gravees = a capturer maintenant (1 ligne backlog suffit).
Une fois la trace ecrite, la fin de tour sera autorisee.
"@
    [Console]::Error.WriteLine($msg)
    exit 2
}

# --- Porte 2 : mj édité -> test rejoué (R10a) ---
if ($editedMjIds.Count -gt 0) {
    $allCmds = ($turnCommands -join "`n")
    foreach ($id in $editedMjIds) {
        # Accepte les deux noms de script npm (racine "test:mj", package tests/ "mj:test") + run.mjs direct + gate global.
        $tested = ($allCmds -match [regex]::Escape('npm run gate')) -or
                  (($allCmds -match 'mj:test|test:mj') -and ($allCmds -match [regex]::Escape($id))) -or
                  (($allCmds -match 'run\.mjs') -and ($allCmds -match [regex]::Escape($id)))
        if (-not $tested) {
            $msg = "[hook pmo-check] site/$id.html a été édité ce tour sans que son test ait été rejoué.`nLance : npm run test:mj -- $id  (ou : node studio/minijeux/tests/run.mjs $id)  -- ou npm run gate."
            [Console]::Error.WriteLine($msg)
            exit 2
        }
    }
}

# --- Porte 3 : contenu dino édité -> check rejoué (R10a) ---
if ($dinoContentEdited) {
    $allCmds = ($turnCommands -join "`n")
    $checked = ($allCmds -match [regex]::Escape('npm run check')) -or
               ($allCmds -match [regex]::Escape('npm run gate')) -or
               ($allCmds -match '_verif-scripts-audio')
    if (-not $checked) {
        $msg = "[hook pmo-check] Du contenu dino (content/dinos/*.json ou content/scripts-audio/**) a été édité ce tour sans porte rejouée.`nLance : node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr  -- ou npm run check  -- ou npm run gate."
        [Console]::Error.WriteLine($msg)
        exit 2
    }
}

exit 0
