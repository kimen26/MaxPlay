# pmo-check.kimi.ps1 — Hook Stop — VERSION KIMI CODE (portage 2026-07-19, remplace la sonde stop-probe)
# Portage de .claude/hooks/pmo-check.ps1 (generalise 3 poles : JEU / DINO / NARRATION).
# Si le tour a modifie des fichiers d'un pole SANS trace de gouvernance, bloque la fin de tour.
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
#     pmo/ (voie a) satisfait mecaniquement le check.
#
# Satisfaire le check, par pole : un fichier de gouvernance du pole edite ce tour
# (Edit/Write, ou ecriture via commande Bash — python, sed, cat >>).
# JEU/NARRATION : studio/<pole>/memory/** ; DINO (transition, pmo/ pas encore migre) : studio/dino/{pmo,memory,figees}/**

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

# --- Par pole : patterns contenu touche / trace gouvernance (identiques a la version Claude) ---
$poles = @(
    @{ name = 'NARRATION'; agent = 'narration-pmo';
       touch = @('studio[\\/]narration[\\/]', '\.claude[\\/]agents[\\/]narration-');
       trace = @('studio[\\/]narration[\\/]memory[\\/]') },
    @{ name = 'DINO'; agent = 'dino-pmo';
       touch = @('studio[\\/]dino[\\/]', 'dev-dinos', 'dinos-data', 'audio[\\/]dinos', 'img[\\/]dinos', '\.claude[\\/]agents[\\/]dino-');
       trace = @('studio[\\/]dino[\\/]pmo[\\/]', 'studio[\\/]dino[\\/]memory[\\/]', 'studio[\\/]dino[\\/]figees[\\/]') },
    @{ name = 'JEU'; agent = 'game-pmo';
       touch = @('studio[\\/]minijeux[\\/]', 'site[\\/]mj-', 'site[\\/]tile-tools[\\/]', '\.claude[\\/]agents[\\/]game-');
       trace = @('studio[\\/]minijeux[\\/]memory[\\/]', 'studio[\\/]minijeux[\\/]docs[\\/]jeux[\\/]figees[\\/]') }
)
foreach ($p in $poles) { $p.touched = $false; $p.traced = $false }

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
        foreach ($p in $poles) {
            # La trace pmo/ est prioritaire : un edit dans pmo/ ne compte pas comme "contenu touche"
            $isTrace = $false
            foreach ($t in $p.trace) { if ($path -match $t) { $p.traced = $true; $isTrace = $true } }
            if (-not $isTrace) {
                foreach ($t in $p.touch) {
                    if ($path -match $t) {
                        # exclusion : les fichiers dino de site/ ne declenchent pas le pole JEU
                        if ($p.name -eq 'JEU' -and $path -match 'dino') { continue }
                        $p.touched = $true
                    }
                }
            }
        }
    }

    # Une ecriture pmo/ via Bash (python, sed, cat >>) compte aussi comme trace
    if ($ev.name -eq 'Bash') {
        $cmd = [string]($ev.args.command)
        if ($cmd) {
            foreach ($p in $poles) {
                foreach ($t in $p.trace) { if ($cmd -match $t) { $p.traced = $true } }
            }
        }
    }
}

$missing = @($poles | Where-Object { $_.touched -and -not $_.traced })
if ($missing.Count -eq 0) { exit 0 }

$names = ($missing | ForEach-Object { $_.name }) -join ' + '
$details = ($missing | ForEach-Object {
    if ($_.name -eq 'DINO') { "  - DINO : graver TOI-MEME une entree dans studio/dino/pmo/ (sprint-log a minima ; decisions/backlog selon le cas — playbook .claude/agents/$($_.agent).md a lire et appliquer, pas de subagent custom sous Kimi)." }
    else { $dir = if ($_.name -eq 'JEU') { 'minijeux' } else { 'narration' }; "  - $($_.name) : graver TOI-MEME dans studio/$dir/memory/ : TODO.md / DECISIONS.md / LESSONS.md / MEMORY.md § Journal (a minima — playbook .claude/agents/$($_.agent).md a lire et appliquer, pas de subagent custom sous Kimi)." }
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
