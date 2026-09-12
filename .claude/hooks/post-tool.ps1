# post-tool.ps1 — Dispatcher unique PostToolUse (HO-R04)
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

exit 0
