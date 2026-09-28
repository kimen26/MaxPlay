# figees-injector.kimi.ps1 — Hook PreToolUse (Edit|Write) — VERSION KIMI CODE
# Adaptation de la logique figees-injector portee dans .claude/hooks/pre-tool.ps1
# (dispatcher unique PreToolUse cote Claude depuis HO-R04, fonction Invoke-FigeesInjector) :
#   - payload Kimi : tool_input.path (Edit/Write Kimi) ou tool_input.file_path (compat Claude)
#   - sortie : texte brut sur stdout (exit 0 = contexte ajouté, non bloquant)
#     au lieu du JSON hookSpecificOutput propre a Claude Code.
# Logique métier alignée sur la version Claude (vague 1 lot C — R11) : injection DINO
# ciblée (plus tout /studio/dino/), filtrée aux lignes 🔒/❌, au plus 1x par tour
# (marqueur relu dans le wire.jsonl de la session, borné, depuis le dernier turn.prompt —
# même mécanique que pmo-check.kimi.ps1). MJ et les rappels de rules path-scoped inchangés.

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
$root = 'c:\ProjetsPerso\Claude_Projects\MaxPlay'

# --- Dedup "1x par tour" pour l'injection DINO : localise le wire.jsonl de la session,
# comme pmo-check.kimi.ps1 (mêmes commentaires sur le format), puis cherche le marqueur
# après le dernier evenement turn.prompt. Fail-open si session introuvable (payload Kimi
# sans session_id, ou wire.jsonl absent) : on injecte quand même plutôt que de bloquer.
function Test-DinoFigeeDejaInjecteeCeTour {
    param($data, $root)

    $sessionId = [string]$data.session_id
    if (-not $sessionId) { return $false }

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
    if (-not $wirePath) { return $false }

    $lines = Get-Content -LiteralPath $wirePath -Encoding UTF8
    $lastPrompt = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '"type"\s*:\s*"turn\.prompt"') { $lastPrompt = $i }
    }
    for ($i = $lastPrompt + 1; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'MARQUEUR-FIGEE-DINO-CE-TOUR') { return $true }
    }
    return $false
}

# Cible DINO resserree (R11) : uniquement le contenu/asset dino, jamais memory/docs/figees.
if (($norm -match 'studio/dino/content/(dinos|scripts-audio|sources)/' -or
     $norm -match 'site/dev-dinos\.html$' -or
     $norm -match 'site/audio/dinos/' -or
     $norm -match 'site/img/dinos/' -or
     $norm -match 'site/js/gen/dinos-data\.js$') -and
    ($norm -notmatch 'studio/dino/(memory|docs|figees)/')) {

    if (Test-DinoFigeeDejaInjecteeCeTour -data $data -root $root) { exit 0 }

    $figPath = Join-Path $root 'studio\dino\figees\encyclopedie.md'
    if (Test-Path $figPath) {
        $allLines = Get-Content -LiteralPath $figPath -Encoding UTF8
        $locked = @($allLines | Where-Object { $_ -match '🔒' -or $_ -match '❌' })
        $contenu = ($locked -join "`n")
        Write-Output @"
==================================================================
STOP -- studio/dino/figees/encyclopedie.md : DECISIONS FIGEES dino (extrait lignes 🔒/❌).
Tu DOIS confirmer que ton edit respecte CHAQUE ligne 🔒 ci-dessous AVANT de continuer.
Une ligne ❌ 🔒 est une regression deja commise : INTERDITE.
Si ton changement contredit une ligne 🔒, n'edite pas -- demande a Papa Yann de defiger explicitement.
Fichier complet (contexte) : studio/dino/figees/encyclopedie.md

------- extrait 🔒/❌ studio/dino/figees/encyclopedie.md -------
$contenu
------- fin extrait -------
==================================================================
MARQUEUR-FIGEE-DINO-CE-TOUR
"@
    } else {
        Write-Output @"
==================================================================
NOTE -- studio/dino/figees/encyclopedie.md n'existe pas.
Si tu codes ici un comportement deja valide par Papa Yann, tu DOIS
creer ce fichier (procedure dino-pmo) pour le figer.
==================================================================
MARQUEUR-FIGEE-DINO-CE-TOUR
"@
    }
    Write-Output "[RULE path-scoped] .claude/rules/dino.md s'applique a ce fichier -- lis-le si pas encore fait ce tour."
    exit 0
}

# --- MJ + rappels de rules path-scoped : logique inchangée ---
$slug = ''
$figPath = ''
$ruleReminder = ''
if ($norm -match 'site/(mj-[\w-]+)\.html$') {
    $slug = $Matches[1]   # ex: mj-21
    $figPath = Join-Path $root ("studio\minijeux\docs\jeux\figees\{0}.md" -f $slug)
    $ruleReminder = '.claude/rules/mini-jeux.md'
}
# --- SONS : equivalent Kimi de la rule .claude/rules/sons.md ---
# (ajoute 2026-08-10 : _BANQUE-SONS.md existait depuis un mois sans que rien ne le rende
#  inratable, un audit du contenu sonore est passe a cote et a conclu a tort que 109 fichiers
#  de voix n'avaient aucune source. Place AVANT le filet generique site/js/ : sinon les scripts
#  de son y sont captes en premier et ce rappel ne sort jamais.)
elseif ($norm -match 'site/sounds/' -or
        $norm -match 'site/audio/' -or
        $norm -match 'site/js/(victory-sounds|say-nombres|sounds|dinos-audio-manifest)\.js$' -or
        $norm -match 'studio/referentiel/') {
    $aussiMj = if ($norm -match 'site/js/') { "`nS'applique AUSSI : .claude/rules/mini-jeux.md (fichier sous site/js/)." } else { '' }
    Write-Output @"
==================================================================
[RULE path-scoped SONS] .claude/rules/sons.md s'applique a ce fichier.
LIS D'ABORD site/sounds/_BANQUE-SONS.md : SOURCE DE VERITE du systeme
sonore (carte des dossiers, API SoundPool/SayNombres/MJKit, process de
generation en 8 etapes, ce qui est deja branche ou non).
Ne jamais conclure "ce son n'a pas de source" sans l'avoir ouvert.
Rappels durs : padding 250 ms obligatoire · voix resolue par role via
voice-map.json · repli TTS systematique MAIS le texte de repli n'est PAS
le texte du MP3 joue · jamais d'assemblage mot a mot (gabarits pre-generes).$aussiMj
==================================================================
"@
    exit 0
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
(sources de verite : studio/narration/INDEX.md + memory/INVARIANTS.md)
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
