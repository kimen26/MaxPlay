# run.ps1 — Tests des dispatchers HO-R04, durcis vague 1 lot C (R08/R10/R11)
# Rejoue des payloads JSON representatifs contre pre-tool.ps1 (PreToolUse) et pmo-check.ps1
# (Stop) et compare le comportement observe (exit code + presence de motifs cles) a l'attendu.
# Toutes les fixtures (transcripts, repo git jetable) sont creees dans un dossier TEMP a
# l'execution et nettoyees a la fin -- aucun etat ne persiste entre deux runs.
# Usage : powershell -NoProfile -File .claude/hooks/tests/run.ps1

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
        [string]$ExpectPattern = $null,
        [hashtable]$EnvVars = $null
    )

    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = 'powershell'
    $psi.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$Script`""
    $psi.RedirectStandardInput = $true
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.UseShellExecute = $false
    if ($EnvVars) {
        foreach ($k in $EnvVars.Keys) { $psi.EnvironmentVariables[$k] = $EnvVars[$k] }
    }

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
        Stdout   = $stdout.Substring(0, [Math]::Min(160, $stdout.Length))
        Stderr   = $stderr.Substring(0, [Math]::Min(220, $stderr.Length))
    }
}

# ==========================================================================
# Fixtures TEMP (transcripts JSONL + repo git jetable pour la garde push)
# ==========================================================================
$tmp = Join-Path $env:TEMP ("maxplay-hooktests-{0}" -f ([guid]::NewGuid().ToString('N')))
New-Item -ItemType Directory -Path $tmp -Force | Out-Null

function Write-Utf8NoBom {
    param([string]$Path, [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, (New-Object System.Text.UTF8Encoding($false)))
}

# --- transcript : Edit dino minmi.json (1ere fois, pour le test de dedup figees) ---
$tDinoFirst = Join-Path $tmp 'transcript-dino-first.jsonl'
Write-Utf8NoBom -Path $tDinoFirst -Content @'
{"type":"user","message":{"role":"user","content":[{"type":"text","text":"ajoute le Minmi"}]},"uuid":"u1"}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"ok"}]},"uuid":"a1"}
'@

# --- transcript : idem mais avec le marqueur d'injection deja pose apres le dernier message user ---
$tDinoSecond = Join-Path $tmp 'transcript-dino-second.jsonl'
Write-Utf8NoBom -Path $tDinoSecond -Content @'
{"type":"user","message":{"role":"user","content":[{"type":"text","text":"ajoute le Minmi"}]},"uuid":"u1"}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"ok"}]},"uuid":"a1"}
{"type":"attachment","attachment":{"type":"hook_additional_context","content":["MARQUEUR-FIGEE-DINO-CE-TOUR"]},"uuid":"h1"}
'@

# --- transcript pmo-check : mj-01 edite + trace JEU ecrite, sans commande de test ---
$tPmoMjNoTest = Join-Path $tmp 'pmo-mj-no-test.jsonl'
Write-Utf8NoBom -Path $tPmoMjNoTest -Content (@(
    '{"message":{"content":[{"type":"tool_use","name":"Edit","input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/site/mj-01.html"}}]}}',
    '{"message":{"content":[{"type":"tool_use","name":"Edit","input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/minijeux/memory/TODO.md"}}]}}'
) -join "`n")

# --- transcript pmo-check : mj-01 edite + trace JEU + commande de test rejouee ---
$tPmoMjWithTest = Join-Path $tmp 'pmo-mj-with-test.jsonl'
Write-Utf8NoBom -Path $tPmoMjWithTest -Content (@(
    '{"message":{"content":[{"type":"tool_use","name":"Edit","input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/site/mj-01.html"}}]}}',
    '{"message":{"content":[{"type":"tool_use","name":"Edit","input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/minijeux/memory/TODO.md"}}]}}',
    '{"message":{"content":[{"type":"tool_use","name":"Bash","input":{"command":"npm run test:mj -- mj-01"}}]}}'
) -join "`n")

# --- transcript pmo-check : dino content edite, un `cat` sur memory/TODO.md comme SEULE trace (ne doit pas compter) ---
$tPmoCatOnly = Join-Path $tmp 'pmo-cat-only.jsonl'
Write-Utf8NoBom -Path $tPmoCatOnly -Content (@(
    '{"message":{"content":[{"type":"tool_use","name":"Edit","input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/dino/content/dinos/minmi.json"}}]}}',
    '{"message":{"content":[{"type":"tool_use","name":"Bash","input":{"command":"cat studio/dino/memory/TODO.md"}}]}}'
) -join "`n")

function New-StopPayload {
    param([string]$TranscriptPath)
    $obj = @{ stop_hook_active = $false; transcript_path = $TranscriptPath }
    return ($obj | ConvertTo-Json -Compress)
}

# --- repo git jetable pour la garde push (R08) ---
$scratchRepo = Join-Path $tmp 'scratchrepo'
New-Item -ItemType Directory -Path (Join-Path $scratchRepo 'site') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $scratchRepo 'docs') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $scratchRepo 'studio\minijeux\tests\.artifacts') -Force | Out-Null

Push-Location $scratchRepo
try {
    git init -q
    git config user.email test@test.local
    git config user.name test
    'hello' | Out-File -FilePath (Join-Path $scratchRepo 'site\foo.html') -Encoding utf8
    'doc'   | Out-File -FilePath (Join-Path $scratchRepo 'docs\readme.md') -Encoding utf8
    git add site docs 2>$null | Out-Null
    git commit -q -m init 2>$null | Out-Null
    git update-ref refs/remotes/origin/master master

    # Scenario "push docs seulement" : nouveau commit qui ne touche que docs/
    'more' | Out-File -FilePath (Join-Path $scratchRepo 'docs\readme.md') -Encoding utf8 -Append
    git add docs 2>$null | Out-Null
    git commit -q -m "docs only" 2>$null | Out-Null
    $shaDocsOnly = (git rev-parse HEAD | Out-String).Trim()
}
finally {
    Pop-Location
}

# Clone jetable n2 : meme historique + un commit qui touche site/, SANS GREEN.json -> doit bloquer
$scratchRepoSite = Join-Path $tmp 'scratchrepo-site'
Copy-Item -Path $scratchRepo -Destination $scratchRepoSite -Recurse
Push-Location $scratchRepoSite
try {
    'changed' | Out-File -FilePath (Join-Path $scratchRepoSite 'site\foo.html') -Encoding utf8 -Append
    git add site 2>$null | Out-Null
    git commit -q -m "site change" 2>$null | Out-Null
}
finally {
    Pop-Location
}

# ==========================================================================
# Payloads pre-tool.ps1
# ==========================================================================

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

# --- Payload 6 (R10c) : AskUserQuestion -> BLOQUE toujours ---
$p6 = '{"tool_name":"AskUserQuestion","tool_input":{"questions":[{"question":"A ou B ?"}]}}'
$results += Test-Case -Name 'pre-tool: AskUserQuestion bloque' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p6 -ExpectedExit 2 -ExpectPattern 'formulaire'

# --- Payload 7 (R10d) : git rm avec un glob -> BLOQUE ---
$p7 = '{"tool_name":"Bash","tool_input":{"command":"git rm site/*.png"}}'
$results += Test-Case -Name 'pre-tool: git rm glob bloque' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p7 -ExpectedExit 2 -ExpectPattern 'BLOQUEE'

# --- Payload 8 (R10b) : LESSONS.md, leçon L- ajoutee SANS marqueur de porte -> BLOQUE ---
$p8 = '{"tool_name":"Edit","tool_input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/dino/memory/LESSONS.md","old_string":"## L-098 existing\ntext","new_string":"## L-098 existing\ntext\n\n## L-099 - Nouvelle lecon sans porte\nConstat : bla.\nRegle : faire attention."}}'
$results += Test-Case -Name 'pre-tool: lessons-gate bloque sans marqueur' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p8 -ExpectedExit 2 -ExpectPattern 'porte'

# --- Payload 9 (R10b) : LESSONS.md, leçon L- ajoutee AVEC "Rule :" -> passe ---
$p9 = '{"tool_name":"Edit","tool_input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/dino/memory/LESSONS.md","old_string":"## L-098 existing\ntext","new_string":"## L-098 existing\ntext\n\n## L-099 - Nouvelle lecon avec porte\nConstat : bla.\nRule : node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr"}}'
$results += Test-Case -Name 'pre-tool: lessons-gate passe avec Rule :' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p9 -ExpectedExit 0

# --- Payload 10 (R11) : Edit studio/dino/memory/TODO.md -> 0 octet injecte (hors perimetre figees) ---
$p10 = '{"tool_name":"Edit","tool_input":{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/dino/memory/TODO.md","old_string":"a","new_string":"b"}}'
$r10 = Test-Case -Name 'pre-tool: Edit dino memory/TODO.md -> 0 octet injecte' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p10 -ExpectedExit 0
if ($r10.Pass -and $r10.Stdout.Trim().Length -ne 0) { $r10.Pass = $false }
$results += $r10

# --- Payload 11 (R11) : Edit studio/dino/content/dinos/minmi.json, 1ere fois du tour -> digest 🔒/❌ injecte ---
$p11 = ('{{"tool_name":"Edit","tool_input":{{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/dino/content/dinos/minmi.json","old_string":"a","new_string":"b"}},"transcript_path":"{0}"}}' -f ($tDinoFirst -replace '\\','/'))
$results += Test-Case -Name 'pre-tool: Edit dino minmi.json 1ere fois -> digest' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p11 -ExpectedExit 0 -ExpectPattern 'MARQUEUR-FIGEE-DINO-CE-TOUR'

# --- Payload 12 (R11) : meme edit, mais le marqueur est deja dans le transcript ce tour -> RIEN (0 octet) ---
$p12 = ('{{"tool_name":"Edit","tool_input":{{"file_path":"c:/ProjetsPerso/Claude_Projects/MaxPlay/studio/dino/content/dinos/minmi.json","old_string":"a","new_string":"b"}},"transcript_path":"{0}"}}' -f ($tDinoSecond -replace '\\','/'))
$r12 = Test-Case -Name 'pre-tool: Edit dino minmi.json 2e fois meme tour -> rien' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p12 -ExpectedExit 0
if ($r12.Pass -and $r12.Stdout.Trim().Length -ne 0) { $r12.Pass = $false }
$results += $r12

# --- Payload 13 (R08) : push, site/ modifie vs origin/master, PAS de GREEN.json -> BLOQUE ---
$p13 = '{"tool_name":"Bash","tool_input":{"command":"git push origin master"}}'
$results += Test-Case -Name 'pre-tool: push site/ modifie sans GREEN -> bloque' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p13 -ExpectedExit 2 -ExpectPattern 'gate' -EnvVars @{ MAXPLAY_HOOK_ROOT = $scratchRepoSite }

# --- Payload 14 (R08) : push, HEAD ne touche que docs/ vs origin/master -> passe ---
$p14 = '{"tool_name":"Bash","tool_input":{"command":"git push origin master"}}'
$results += Test-Case -Name 'pre-tool: push docs seulement -> passe' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p14 -ExpectedExit 0 -EnvVars @{ MAXPLAY_HOOK_ROOT = $scratchRepo }

# --- Payload 15 (R08) : push, site/ modifie, GREEN.json present avec le bon sha HEAD -> passe ---
$greenPath = Join-Path $scratchRepoSite 'studio\minijeux\tests\.artifacts\GREEN.json'
Push-Location $scratchRepoSite
try { $headShaSite = (git rev-parse HEAD | Out-String).Trim() } finally { Pop-Location }
('{{"sha":"{0}"}}' -f $headShaSite) | Out-File -FilePath $greenPath -Encoding utf8
$p15 = '{"tool_name":"Bash","tool_input":{"command":"git push origin master"}}'
$results += Test-Case -Name 'pre-tool: push site/ modifie, GREEN.json a jour -> passe' -Script (Join-Path $hooksDir 'pre-tool.ps1') -PayloadJson $p15 -ExpectedExit 0 -EnvVars @{ MAXPLAY_HOOK_ROOT = $scratchRepoSite }

# ==========================================================================
# Payloads pmo-check.ps1 (Stop hook, R10a)
# ==========================================================================

# --- Payload 16 : site/mj-01.html edite + trace JEU, AUCUNE commande de test rejouee -> BLOQUE ---
$p16 = New-StopPayload -TranscriptPath $tPmoMjNoTest
$results += Test-Case -Name 'pmo-check: mj-01 edite sans test rejoue -> bloque' -Script (Join-Path $hooksDir 'pmo-check.ps1') -PayloadJson $p16 -ExpectedExit 2 -ExpectPattern 'mj-01'

# --- Payload 17 : idem + "npm run test:mj -- mj-01" rejoue -> passe ---
$p17 = New-StopPayload -TranscriptPath $tPmoMjWithTest
$results += Test-Case -Name 'pmo-check: mj-01 edite avec test rejoue -> passe' -Script (Join-Path $hooksDir 'pmo-check.ps1') -PayloadJson $p17 -ExpectedExit 0

# --- Payload 18 (R10a) : dino content edite, SEULE trace = un `cat` sur memory/TODO.md -> ne compte pas, BLOQUE ---
$p18 = New-StopPayload -TranscriptPath $tPmoCatOnly
$results += Test-Case -Name 'pmo-check: cat seul sur memory/ ne vaut pas trace -> bloque' -Script (Join-Path $hooksDir 'pmo-check.ps1') -PayloadJson $p18 -ExpectedExit 2 -ExpectPattern 'DINO'

# ==========================================================================
# Rapport + nettoyage
# ==========================================================================
$results | ForEach-Object {
    $status = if ($_.Pass) { 'PASS' } else { 'FAIL' }
    Write-Output ("[{0}] {1} (attendu exit={2}, obtenu exit={3})" -f $status, $_.Name, $_.Expected, $_.Actual)
    if (-not $_.Pass) {
        if ($_.Stdout.Trim()) { Write-Output ("    stdout: {0}" -f $_.Stdout) }
        if ($_.Stderr.Trim()) { Write-Output ("    stderr: {0}" -f $_.Stderr) }
    }
}

Remove-Item -Path $tmp -Recurse -Force -ErrorAction SilentlyContinue

$failCount = ($results | Where-Object { -not $_.Pass }).Count
if ($failCount -gt 0) {
    Write-Output ""
    Write-Output "$failCount test(s) EN ECHEC."
    exit 1
} else {
    Write-Output ""
    Write-Output ("Tous les tests sont VERTS ({0}/{0})." -f $results.Count)
    exit 0
}
