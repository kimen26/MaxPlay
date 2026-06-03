# figees-injector.ps1 — Hook PreToolUse (Edit|Write)
# Si on s'apprete a modifier un game/web/mj-XX.html qui possede un fichier
# de DECISIONS FIGEES (game/docs/jeux/figees/mj-XX.md), on REINJECTE son
# contenu dans le contexte AVANT l'edit, avec une banniere STOP.
# But : rendre la regression structurellement impossible meme apres /compact.
# Cree 2026-05-15 suite incident MJ-21 (refonte process figeage).

$ErrorActionPreference = 'SilentlyContinue'

$raw = @($input) -join "`n"
if (-not $raw) { try { $raw = [Console]::In.ReadToEnd() } catch {} }
if (-not $raw) { exit 0 }

try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

$path = ''
if ($data.tool_input.file_path) { $path = [string]$data.tool_input.file_path }
elseif ($data.tool_input.path) { $path = [string]$data.tool_input.path }
if (-not $path) { exit 0 }

# Normalise les separateurs
$norm = $path -replace '\\', '/'

# Cible : .../game/web/mj-<slug>.html  (mini-jeux → game/docs/jeux/figees/<slug>.md)
# OU     : pôle DINO (code game/web/dino + dossier dino/) → dino/figees/encyclopedie.md
$root = 'c:\ProjetsPerso\Claude_Projects\MaxPlay'
$slug = ''
$figPath = ''
if ($norm -match 'game/web/(mj-[\w-]+)\.html$') {
    $slug = $Matches[1]   # ex: mj-21  ou  mj-pose-tiles
    $figPath = Join-Path $root ("game\docs\jeux\figees\{0}.md" -f $slug)
}
elseif ($norm -match 'game/web/dev-dinos\.html$' -or
        $norm -match 'game/web/js/dinos-data\.js$' -or
        $norm -match 'game/web/audio/dinos/(recit|menu)-[\w-]+\.mp3$' -or
        $norm -match '/dino/') {
    $slug = 'encyclopedie'   # pôle DINO
    $figPath = Join-Path $root 'dino\figees\encyclopedie.md'
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

------- game/docs/jeux/figees/$slug.md -------
$contenu
------- fin fichier LOI -------
==================================================================
"@
} else {
    $ctx = @"
==================================================================
NOTE -- $slug.html n'a PAS de fichier de decisions figees.
Si tu codes ici un comportement deja valide par Papa Yann, tu DOIS
creer game/docs/jeux/figees/$slug.md via game-mj-pmo pour le figer
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