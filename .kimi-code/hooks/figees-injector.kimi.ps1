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
# OU     : scope d'une rule path-scoped sans figees (rappel de lecture, equivalent Kimi des
#          rules auto-injectees de Claude Code — Kimi n'a pas d'injection native par path)
$root = 'c:\ProjetsPerso\Claude_Projects\MaxPlay'
$slug = ''
$figPath = ''
$ruleReminder = ''
if ($norm -match 'site/(mj-[\w-]+)\.html$') {
    $slug = $Matches[1]   # ex: mj-21  ou  mj-pose-tiles
    $figPath = Join-Path $root ("studio\minijeux\docs\jeux\figees\{0}.md" -f $slug)
    $ruleReminder = '.claude/rules/mini-jeux.md'
}
elseif ($norm -match 'site/dev-dinos\.html$' -or
        $norm -match 'site/js/dinos-data\.js$' -or
        $norm -match 'site/audio/dinos/(recit|menu)-[\w-]+\.mp3$' -or
        $norm -match '/studio/dino/') {
    $slug = 'encyclopedie'   # pôle DINO
    $figPath = Join-Path $root 'studio\dino\figees\encyclopedie.md'
    $ruleReminder = '.claude/rules/dino.md'
}
elseif ($norm -match 'site/index\.html$' -or
        $norm -match 'site/js/' -or
        $norm -match 'studio/minijeux/docs/jeux/') {
    # Scope de la rule mini-jeux sans fichier figees propre : rappel seul
    Write-Output @"
==================================================================
[RULE path-scoped] .claude/rules/mini-jeux.md s'applique a ce fichier.
Si tu ne l'as pas encore lu ce tour, lis-le AVANT d'editer
(decisions figees, UX 3.5-4 ans, bus SVG, contrat STANDARD-MJ).
==================================================================
"@
    exit 0
}
# --- NARRATION : equivalent Kimi des 5 rules path-scoped ---
# (Claude Code les injecte nativement via le frontmatter paths: ; Kimi non,
#  d'ou ce rappel deterministe. Parite ajoutee 2026-07-28, phase 3 cartographie.)
elseif ($norm -match 'studio/narration/') {
    $rules = @()
    if ($norm -match 'studio/narration/stories/')     { $rules += '.claude/rules/stories-process.md'; $rules += '.claude/rules/narration-craft.md' }
    if ($norm -match 'studio/narration/personnages/') { $rules += '.claude/rules/personnages.md';     $rules += '.claude/rules/narration-craft.md' }
    if ($norm -match 'studio/narration/cross-culture/(castings-nationaux|prenoms)/') { $rules += '.claude/rules/personnages.md' }
    if ($norm -match 'studio/narration/(univers|saisons)/' -or $norm -match 'studio/narration/cross-culture/') { $rules += '.claude/rules/univers.md' }
    if ($norm -match 'studio/narration/equipe/')      { $rules += '.claude/rules/narration-craft.md' }
    if ($norm -match 'studio/narration/scripts/' -or
        $norm -match 'studio/narration/personnages/voix-meta/' -or
        $norm -match 'studio/narration/stories/[^/]+/assets/audio/' -or
        $norm -match '-segments[^/]*\.json$')         { $rules += '.claude/rules/audio.md' }
    $rules = @($rules | Select-Object -Unique)
    if ($rules.Count -eq 0) { exit 0 }
    $liste = ($rules | ForEach-Object { " - $_" }) -join "`n"
    Write-Output @"
==================================================================
[RULES path-scoped NARRATION] Ces regles s'appliquent a ce fichier.
Si tu ne les as pas encore lues ce tour, lis-les AVANT d'editer :
$liste
(sources de verite : studio/narration/INDEX.md + pmo/INVARIANTS.md)
==================================================================
"@
    exit 0
}
# Pattern segments JSON (rule audio) meme hors studio/narration/
elseif ($norm -match '-segments[^/]*\.json$') {
    Write-Output @"
==================================================================
[RULE path-scoped] .claude/rules/audio.md s'applique a ce fichier
(segments ElevenLabs) -- lis-le si pas encore fait ce tour.
==================================================================
"@
    exit 0
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

if ($ruleReminder) {
    Write-Output "[RULE path-scoped] $ruleReminder s'applique a ce fichier -- lis-le si pas encore fait ce tour."
}
Write-Output $ctx
exit 0
