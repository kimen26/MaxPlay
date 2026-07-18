# figees-injector.kimi.ps1 — Hook PreToolUse (Edit|Write) — VERSION KIMI CODE
# Adaptation de .claude/hooks/figees-injector.ps1 :
#   - payload Kimi : tool_input.path (Edit/Write Kimi) ou tool_input.file_path (compat Claude)
#   - sortie : texte brut sur stdout (exit 0 = contexte ajouté, non bloquant)
#     au lieu du JSON hookSpecificOutput propre a Claude Code.
# Logique métier IDENTIQUE a la version Claude.

$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

$path = ''
if ($data.tool_input.file_path) { $path = [string]$data.tool_input.file_path }
elseif ($data.tool_input.path) { $path = [string]$data.tool_input.path }
if (-not $path) { exit 0 }

# Normalise les separateurs
$norm = $path -replace '\\', '/'

# Cible : .../site/mj-<slug>.html  (mini-jeux → studio/minijeux/docs/jeux/figees/<slug>.md)
# OU     : pôle DINO (code site/dino + dossier studio/dino/) → studio/dino/figees/encyclopedie.md
$root = 'c:\ProjetsPerso\Claude_Projects\MaxPlay'
$slug = ''
$figPath = ''
if ($norm -match 'site/(mj-[\w-]+)\.html$') {
    $slug = $Matches[1]   # ex: mj-21  ou  mj-pose-tiles
    $figPath = Join-Path $root ("studio\minijeux\docs\jeux\figees\{0}.md" -f $slug)
}
elseif ($norm -match 'site/dev-dinos\.html$' -or
        $norm -match 'site/js/dinos-data\.js$' -or
        $norm -match 'site/audio/dinos/(recit|menu)-[\w-]+\.mp3$' -or
        $norm -match '/studio/dino/') {
    $slug = 'encyclopedie'   # pôle DINO
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

------- $figPath -------
$contenu
------- fin fichier LOI -------
==================================================================
"@
} else {
    $ctx = @"
==================================================================
NOTE -- $slug.html n'a PAS de fichier de decisions figees.
Si tu codes ici un comportement deja valide par Papa Yann, tu DOIS
creer le fichier fige correspondant (procedure game-mj-pmo) pour le figer
(sinon il sera perdu a la prochaine compaction).
==================================================================
"@
}

Write-Output $ctx
exit 0
