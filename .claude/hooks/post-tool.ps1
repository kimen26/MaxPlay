# post-tool.ps1 — Dispatcher unique PostToolUse (HO-R04, routage portes statiques R09 vague 3)
# Remplace les 2 entrees PostToolUse de settings.json (sync-agents-md.py + hook bash
# INBOX narration) par UN SEUL processus PowerShell. sync-agents-md est reporte de
# Python vers PowerShell (coherence : plus de sous-processus python a demarrer).
#
# 1. Si le fichier edite est CLAUDE.md racine -> regenere AGENTS.md (miroir Kimi).
# 2. Si le fichier edite est un hook .claude/hooks/*.ps1 -> rappelle de verifier le
#    portage .kimi-code/hooks/<nom>.kimi.ps1.
# 3. Si le contenu edite touche narration/INBOX -> commit auto (async d'origine ;
#    ici synchrone dans le meme process, le hook PostToolUse Claude ne bloque pas
#    la main sur du travail deja fait).
# 4. R09 : routage par chemin vers la porte STATIQUE rapide correspondante (0 navigateur,
#    < 2 s). Rejoue la porte dans le tour, sans attendre un /compact ou un rappel humain.
#    Sortie hookSpecificOutput.additionalContext SEULEMENT si la porte est KO (0 octet si OK).
#    Portes lentes (Playwright, MP3, gate) restent dans gate/Stop -- volontairement absentes ici.

$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

$root = 'c:\ProjetsPerso\Claude_Projects\MaxPlay'
$path = ''
if ($data.tool_input.file_path) { $path = [string]$data.tool_input.file_path }
elseif ($data.tool_input.path) { $path = [string]$data.tool_input.path }

# --- 1 & 2 : sync-agents-md (portage PowerShell de sync-agents-md.py) ---
if ($path) {
    $norm = $path -replace '/', '\'
    $normLower = $norm.ToLowerInvariant()
    $claudeMdRoot = (Join-Path $root 'CLAUDE.md').ToLowerInvariant()

    if ($normLower -eq $claudeMdRoot) {
        $srcPath = Join-Path $root 'CLAUDE.md'
        $dstPath = Join-Path $root 'AGENTS.md'

        $banner = "<!-- MIROIR de CLAUDE.md — point d'entrée Kimi Code (AGENTS.md) et autres agents non-Claude.`n" +
                  "     CLAUDE.md reste la SOURCE : toute modif se fait là-bas, puis régénérer ce fichier à l'identique`n" +
                  "     (seul ce bandeau diffère). GÉNÉRÉ par .claude/hooks/post-tool.ps1 (ex sync-agents-md.py) — ne pas éditer à la main. -->`n`n"

        $subs = @(
            @{ src = "touché. Ce CLAUDE.md racine est le SEUL re-injecté après ``/compact``."
               dst = "touché. Sous Kimi Code, l'équivalent est le ``AGENTS.md`` du pôle — le lire explicitement. Ce fichier racine est le SEUL re-injecté après compaction." },
            @{ src = "Voir .claude/settings.json. -->"
               dst = "Voir .claude/settings.json (Claude Code) et ~/.kimi-code/config.toml (Kimi Code). -->" },
            @{ src = "├── CLAUDE.md             ← ce fichier (routage + commun)"
               dst = "├── CLAUDE.md             ← source de vérité du routage (Claude Code)`n├── AGENTS.md             ← ce fichier (miroir pour Kimi Code & autres agents)" },
            @{ src = "- **JAMAIS de ``AskUserQuestion``** — questions **en texte dans la réponse**"
               dst = "- **JAMAIS de formulaire dynamique de questions** (AskUserQuestion) — questions **en texte dans la réponse**" },
            @{ src = "seul re-injecté après ``/compact``._"
               dst = "seul re-injecté après ``/compact``. Miroir AGENTS.md créé 2026-07-18 pour Kimi Code._" }
        )

        $text = Get-Content -LiteralPath $srcPath -Raw -Encoding UTF8
        $missed = @()
        foreach ($s in $subs) {
            if ($text.Contains($s.src)) {
                $text = $text.Replace($s.src, $s.dst)
            } else {
                $missed += $s.src.Substring(0, [Math]::Min(60, $s.src.Length))
            }
        }
        [System.IO.File]::WriteAllText($dstPath, ($banner + $text), (New-Object System.Text.UTF8Encoding($false)))

        if ($missed.Count -gt 0) {
            Write-Output ("[post-tool/sync-agents-md] AGENTS.md régénéré MAIS {0} substitution(s) Kimi n'ont plus matché (passage source modifié) — mettre à jour les subs dans .claude/hooks/post-tool.ps1 : {1}" -f $missed.Count, ($missed -join '; '))
        } else {
            Write-Output "[post-tool/sync-agents-md] AGENTS.md régénéré depuis CLAUDE.md (miroir Kimi à jour)."
        }
    }
    elseif ($normLower -match '\\\.claude\\hooks\\' -and $normLower.EndsWith('.ps1')) {
        $stem = [System.IO.Path]::GetFileNameWithoutExtension($norm)
        $kimi = Join-Path $root (".kimi-code\hooks\{0}.kimi.ps1" -f $stem)
        if (Test-Path $kimi) {
            Write-Output ("[post-tool/sync-agents-md] Hook Claude modifié : vérifier la parité du portage Kimi .kimi-code/hooks/{0}.kimi.ps1 (messages identiques — check 7 env-compat-check)." -f $stem)
        }
    }
}

# --- 3 : sauvegarde INBOX narration (portage du hook bash inline) ---
if ($raw -match 'narration.*INBOX') {
    Push-Location $root
    try {
        git commit -m ("inbox: dump {0}" -f (Get-Date -Format 'yyyy-MM-dd')) -- studio/narration/INBOX.md 2>$null | Out-Null
    } catch {}
    Pop-Location
}

# --- 4 (R09) : routage par chemin vers la porte statique correspondante ---
function Send-GateContext {
    param([string]$Texte)
    $out = @{
        hookSpecificOutput = @{
            hookEventName     = 'PostToolUse'
            additionalContext = $Texte
        }
    }
    $out | ConvertTo-Json -Depth 5 -Compress
}

if ($path) {
    $normSlash = ($path -replace '\\', '/')
    Push-Location $root
    try {
        # a) site/mj-XX.html -> audit-gabarit.mjs mj-XX --json
        if ($normSlash -match '(?:^|/)site/(mj-[0-9]+[a-z]?)\.html$') {
            $mjId = $Matches[1]
            $gate = & node studio/minijeux/tests/audit-gabarit.mjs $mjId --json 2>&1
            $exit = $LASTEXITCODE
            if ($exit -ne 0) {
                $ctx = "==================================================================`nPORTE KO -- audit-gabarit.mjs $mjId (post-tool.ps1, R09)`n$($gate -join "`n")`n=================================================================="
                Send-GateContext -Texte $ctx
                exit 0
            }
        }
        # b) scripts-audio/fr/V3/<id>.md -> _verif-scripts-audio.cjs fr <id>
        elseif ($normSlash -match '(?:^|/)studio/dino/content/scripts-audio/fr/V3/([a-z0-9_]+)\.md$') {
            $dinoId = $Matches[1]
            $gate = & node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr $dinoId 2>&1
            $exit = $LASTEXITCODE
            if ($exit -ne 0) {
                $ctx = "==================================================================`nPORTE KO -- _verif-scripts-audio.cjs fr $dinoId (post-tool.ps1, R09)`n$($gate -join "`n")`n=================================================================="
                Send-GateContext -Texte $ctx
                exit 0
            }
        }
        # c) content/dinos/<id>.json -> _gen-dinos-data.cjs --with-header puis check-dino-coherence.cjs <id>
        elseif ($normSlash -match '(?:^|/)studio/dino/content/dinos/([a-z0-9_]+)\.json$') {
            $dinoId = $Matches[1]
            & node studio/dino/content/scripts/export/_gen-dinos-data.cjs --with-header 2>&1 | Out-Null
            $gate = & node studio/dino/content/scripts/export/check-dino-coherence.cjs $dinoId 2>&1
            $exit = $LASTEXITCODE
            if ($exit -ne 0) {
                $ctx = "==================================================================`nPORTE KO -- check-dino-coherence.cjs $dinoId (post-tool.ps1, R09)`n$($gate -join "`n")`n=================================================================="
                Send-GateContext -Texte $ctx
                exit 0
            }
        }
        # d) docs/jeux/figees/mj-XX.md ou figees/encyclopedie.md -> check-figees.mjs
        elseif ($normSlash -match '(?:^|/)studio/minijeux/docs/jeux/figees/mj-[0-9]+[a-z]?\.md$' -or
                $normSlash -match '(?:^|/)studio/dino/figees/encyclopedie\.md$') {
            $gate = & node studio/minijeux/tests/check-figees.mjs 2>&1
            $exit = $LASTEXITCODE
            if ($exit -ne 0) {
                $ctx = "==================================================================`nPORTE KO -- check-figees.mjs (post-tool.ps1, R09)`n$($gate -join "`n")`n=================================================================="
                Send-GateContext -Texte $ctx
                exit 0
            }
        }
        # e) site/js/catalog.js ou strings.json -> check-mj-coherence.mjs --json
        elseif ($normSlash -match '(?:^|/)site/js/catalog\.js$' -or
                $normSlash -match '(?:^|/)strings\.json$') {
            $gate = & node studio/minijeux/tests/check-mj-coherence.mjs --json 2>&1
            $exit = $LASTEXITCODE
            if ($exit -ne 0) {
                $ctx = "==================================================================`nPORTE KO -- check-mj-coherence.mjs (post-tool.ps1, R09)`n$($gate -join "`n")`n=================================================================="
                Send-GateContext -Texte $ctx
                exit 0
            }
        }
    } finally {
        Pop-Location
    }
}

# --- 5 (HO-A03) : fichier precache du service worker touche -> regenerer sw-version.js.
#     Source unique de la liste precachee = site/sw.js (meme regex que gen-sw-version.mjs) ;
#     le hook ne maintient pas sa propre copie. Jamais bloquant (exit 0 dans tous les cas).
if ($path) {
    $normSlash = ($path -replace '\\', '/')
    $swPath = Join-Path $root 'site\sw.js'

    $isPrecacheHit = $false
    if ($normSlash -match '(?:^|/)site/sw\.js$') {
        $isPrecacheHit = $true
    } elseif ((Test-Path -LiteralPath $swPath) -and ($normSlash -match '(?:^|/)site/(.+)$')) {
        $relToSite = $Matches[1]
        $swSource = Get-Content -LiteralPath $swPath -Raw -Encoding UTF8
        $m = [regex]::Match($swSource, 'const PRECACHE_LIST = \[([\s\S]*?)\];')
        if ($m.Success) {
            $entries = [regex]::Matches($m.Groups[1].Value, "'([^']+)'") | ForEach-Object { $_.Groups[1].Value }
            foreach ($e in $entries) {
                $eNorm = $e -replace '^\./', ''
                if ($eNorm -and $eNorm -eq $relToSite) { $isPrecacheHit = $true; break }
            }
        }
    }

    if ($isPrecacheHit) {
        Push-Location $root
        try {
            $genOut = & node studio/minijeux/scripts/gen-sw-version.mjs 2>&1
            $genExit = $LASTEXITCODE
            if ($genExit -ne 0) {
                $ctx = "==================================================================`nPORTE KO -- gen-sw-version.mjs (post-tool.ps1, HO-A03)`n$($genOut -join "`n")`n=================================================================="
                Send-GateContext -Texte $ctx
                exit 0
            }
        } finally {
            Pop-Location
        }
    }
}

exit 0
