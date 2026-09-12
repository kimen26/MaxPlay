# run.ps1 — Tests des dispatchers HO-R04
# Rejoue 5 payloads JSON representatifs contre pre-tool.ps1 / post-tool.ps1 / garde-git-add
# et compare le comportement observe (exit code + presence de motifs cles) a l'attendu.
# Usage : .\.claude\hooks\tests\run.ps1

$ErrorActionPreference = 'Stop'
$root = 'c:\ProjetsPerso\Claude_Projects\MaxPlay'
$hooksDir = Join-Path $root '.claude\hooks'

$results = @()

function Test-Case {
    param(
        [string]$Name,
        [string]$Script,
        [string]$PayloadJson,
        [int]$ExpectedExit,
        [string]$ExpectPattern = $null
    )

    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = 'powershell'
    $psi.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$Script`""
    $psi.RedirectStandardInput = $true
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.UseShellExecute = $false

    $proc = New-Object System.Diagnostics.Process
    $proc.StartInfo = $psi
    [void]$proc.Start()
    $proc.StandardInput.Write($PayloadJson)
    $proc.StandardInput.Close()
    $stdout = $proc.StandardOutput.ReadToEnd()
    $stderr = $proc.StandardError.ReadToEnd()
    $proc.WaitForExit()
    $exit = $proc.ExitCode

    $pass = ($exit -eq $ExpectedExit)
    if ($pass -and $ExpectPattern) {
        $combined = $stdout + $stderr
        $pass = ($combined -match $ExpectPattern)
    }

    [PSCustomObject]@{
        Name     = $Name
        Expected = $ExpectedExit
        Actual   = $exit
        Pass     = $pass
        Stdout   = $stdout.Substring(0, [Math]::Min(120, $stdout.Length))
        Stderr   = $stderr.Substring(0, [Math]::Min(200, $stderr.Length))
    }
}

# --- Payload 1 : PreToolUse Edit sur un mj sans figees -> pre-tool.ps1 (figees-injector), non bloquant ---
$p1 = '{"tool_name":"Edit","tool_input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/site/mj-99.html"}}'
$results += Test-Case -Name 'pre-tool: Edit mj-99 (pas de figees)' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p1 -ExpectedExit 0 -ExpectPattern 'PreToolUse'

# --- Payload 2 : PreToolUse Edit hors perimetre (pas mj, pas dino) -> exit 0 silencieux ---
$p2 = '{"tool_name":"Edit","tool_input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/docs/handoffs/README.md"}}'
$results += Test-Case -Name 'pre-tool: Edit hors perimetre figees' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p2 -ExpectedExit 0

# --- Payload 3 : PreToolUse Bash "git add -A" -> BLOQUE (exit 2), simule sans executer la commande ---
$p3 = '{"tool_name":"Bash","tool_input":{"command":"git add -A"}}'
$results += Test-Case -Name 'pre-tool: garde-git-add bloque "git add -A"' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p3 -ExpectedExit 2 -ExpectPattern 'BLOQUEE'

# --- Payload 4 : PreToolUse Bash "git status" -> laisse passer (exit 0) ---
$p4 = '{"tool_name":"Bash","tool_input":{"command":"git status"}}'
$results += Test-Case -Name 'pre-tool: garde-git-add laisse passer "git status"' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p4 -ExpectedExit 0

# --- Payload 5 : PreToolUse Bash "git stash" -> BLOQUE (exit 2), simule sans executer ---
$p5 = '{"tool_name":"Bash","tool_input":{"command":"git stash"}}'
$results += Test-Case -Name 'pre-tool: garde-git-add bloque "git stash"' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p5 -ExpectedExit 2 -ExpectPattern 'BLOQUEE'

$results | ForEach-Object {
    $status = if ($_.Pass) { 'PASS' } else { 'FAIL' }
    Write-Output ("[{0}] {1} (attendu exit={2}, obtenu exit={3})" -f $status, $_.Name, $_.Expected, $_.Actual)
}

$failCount = ($results | Where-Object { -not $_.Pass }).Count
if ($failCount -gt 0) {
    Write-Output ""
    Write-Output "$failCount test(s) EN ECHEC."
    exit 1
} else {
    Write-Output ""
    Write-Output "Tous les tests sont VERTS (5/5)."
    exit 0
}
