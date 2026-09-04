# Stop hook — pmo-check.ps1 (généralisé 3 pôles, remplace narration-pmo-check.ps1 le 2026-07-19)
# Si le tour a modifié des fichiers d'un pôle (JEU / DINO / NARRATION) SANS trace de gouvernance,
# bloque la fin de tour. Deux façons de satisfaire le check, par pôle :
#   a) un fichier de gouvernance du pôle a été édité ce tour (capture directe main agent — voie par défaut)
#      JEU/NARRATION : studio/<pole>/memory/** ; DINO : studio/dino/{memory,figees}/**
#   b) l'agent <pole>-pmo a été invoqué ce tour
# Décision 2026-07-19 : capture immédiate par le main agent = voie par défaut (REX PMO menteurs).

$ErrorActionPreference = "Stop"

try {
    $raw = [Console]::In.ReadToEnd()
    if ([string]::IsNullOrWhiteSpace($raw)) { exit 0 }
    $input_json = $raw | ConvertFrom-Json
} catch { exit 0 }

if ($input_json.stop_hook_active -eq $true) { exit 0 }

$transcript_path = $input_json.transcript_path
if ([string]::IsNullOrEmpty($transcript_path) -or -not (Test-Path -LiteralPath $transcript_path)) { exit 0 }

# Par pôle : patterns de contenu touché / patterns de trace gouvernance / agent PMO
$poles = @(
    @{ name = "NARRATION"; agent = "narration-pmo";
       touch = @("studio[\\/]narration[\\/]", "\.claude[\\/]agents[\\/]narration-");
       trace = @("studio[\\/]narration[\\/]memory[\\/]") },
    @{ name = "DINO"; agent = "dino-pmo";
       touch = @("studio[\\/]dino[\\/]", "dev-dinos", "dinos-data", "audio[\\/]dinos", "img[\\/]dinos", "\.claude[\\/]agents[\\/]dino-");
       trace = @("studio[\\/]dino[\\/]pmo[\\/]", "studio[\\/]dino[\\/]memory[\\/]", "studio[\\/]dino[\\/]figees[\\/]") },
    @{ name = "JEU"; agent = "game-pmo";
       touch = @("studio[\\/]minijeux[\\/]", "site[\\/]mj-", "\.claude[\\/]agents[\\/]game-");
       trace = @("studio[\\/]minijeux[\\/]memory[\\/]", "studio[\\/]minijeux[\\/]docs[\\/]jeux[\\/]figees[\\/]") }
)

foreach ($p in $poles) { $p.touched = $false; $p.traced = $false; $p.invoked = $false }

$lines = Get-Content -LiteralPath $transcript_path -Encoding UTF8
foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    try { $entry = $line | ConvertFrom-Json } catch { continue }
    if (-not $entry.message -or -not $entry.message.content) { continue }

    foreach ($content in $entry.message.content) {
        if ($content.type -ne "tool_use") { continue }

        if ($content.name -in @("Edit", "Write", "MultiEdit")) {
            $path = $content.input.file_path
            if ([string]::IsNullOrEmpty($path)) { continue }
            foreach ($p in $poles) {
                # La trace pmo/ est prioritaire : un edit dans pmo/ ne compte pas comme "contenu touché"
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

        # v1.1 (2026-07-19) : une écriture pmo/ via Bash/PowerShell (python, sed, cat >>) compte aussi comme trace
        if ($content.name -in @("Bash", "PowerShell")) {
            $cmd = $content.input.command
            if (-not [string]::IsNullOrEmpty($cmd)) {
                foreach ($p in $poles) {
                    foreach ($t in $p.trace) { if ($cmd -match $t) { $p.traced = $true } }
                }
            }
        }
    }
}

$missing = @()
foreach ($p in $poles) {
    if ($p.touched -and -not ($p.traced -or $p.invoked)) { $missing += $p }
}

if ($missing.Count -gt 0) {
    $names = ($missing | ForEach-Object { $_.name }) -join " + "
    $details = ($missing | ForEach-Object {
        if ($_.name -eq 'DINO') { "  - DINO : graver TOI-MEME une entree dans studio/dino/memory/ (TODO.md / DECISIONS.md / LESSONS.md / MEMORY.md § Journal) OU invoquer l'agent $($_.agent)." }
        else { $dir = if ($_.name -eq 'JEU') { 'minijeux' } else { 'narration' }; "  - $($_.name) : graver TOI-MEME dans studio/$dir/memory/ : TODO.md / DECISIONS.md / LESSONS.md / MEMORY.md § Journal (a minima) OU invoquer l'agent $($_.agent)." }
    }) -join "`n"
    $msg = @"
[hook pmo-check] Fichiers $names modifies ce tour SANS trace de gouvernance.

Regle 2026-07-19 (capture immediate) : toute session qui touche un pole laisse une trace dans sa gouvernance AVANT de rendre la main (memory/ pour JEU/NARRATION, pmo/ pour DINO en transition).
$details

Idees/decisions de Papa Yann evoquees ce tour et non gravees = a capturer maintenant (1 ligne backlog suffit).
Une fois la trace ecrite, la fin de tour sera autorisee.
"@
    [Console]::Error.WriteLine($msg)
    exit 2
}

exit 0
