# MaxPlay — Hook UserPromptSubmit : détecte les signaux JEU/NARRATION/DINO
# et rappelle en UNE ligne par pôle quelle rule charger.
#
# Source : doc Anthropic hooks-guide. Reçoit JSON {"prompt": "..."} sur stdin.
# Output texte = ajouté au contexte Claude AVANT que le prompt soit traité.
# Non bloquant — exit 0 toujours.
#
# Durci vague 1 lot C (R11) : les 3 paragraphes de rappel "CAPTURE IMMEDIATE" détaillés
# et la référence à une section de CLAUDE.md inexistante sont retirés — 1 ligne de routage
# par pôle suffit, le détail vit dans les rules elles-mêmes (chargées explicitement par
# le CLAUDE.md racine). `rules\.md|stack\.md` retiré des signaux JEU (matchait le NOM de
# fichiers de rules elles-mêmes, jamais utile comme signal de prompt). Signal DINO élargi
# aux ids de dinos (lus à la volée dans _ordre.json, "ajoute le Minmi" déclenchait rien
# avant) ; signal JEU élargi à "nouveau jeu / un jeu où / mj pour".

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$inputJson = [Console]::In.ReadToEnd()

try {
    $data = $inputJson | ConvertFrom-Json -ErrorAction Stop
    $prompt = if ($data.prompt) { $data.prompt } else { '' }
} catch {
    exit 0
}

if ([string]::IsNullOrWhiteSpace($prompt)) { exit 0 }

$lowerPrompt = $prompt.ToLower()

# === Signaux JEU ===
$gameKeywords = 'mini-jeu|mini jeu|mj-\d|bus-svg|victory-sounds|déploiement|nouveau jeu|un jeu (où|sur)|mj pour'

# === Signaux NARRATION ===
$narrationKeywords = '\bpersonnage|\bhistoire\b|\bvoix\b|elevenlabs|\bbrief\b|kanban|équipe narrat|\bunivers\b|\bsaison\b|\barc\b|ennéagramme|cross-culture|\bpitch\b|rewrite|gatekeeper|\blecteur\b|\bcasting\b|\binbox\b|\bwex\b|\bmelki\b|\bmimi\b|\bdadou\b|\bpolo\b|\bmadie\b|\blulu\b|pierrot|\braph\b|\bjuju\b|\bnono\b|kishōtenketsu|kishotenketsu'

# === Signaux DINO ===
$dinoKeywords = '\bdino\b|\bdinos\b|dinosaure|encyclopédie|dev-dinos|\btritri\b|ptérosaure|cératopsien|théropode|sauropode|récit.*époque|époque.*dino|le voyage dans le temps|tricératops|tyrannosaure|\bt-rex\b|mosasaure|paléonto'

# === Signaux structure (transverses) ===
$structureKeywords = 'créer.*(fichier|dossier|nouveau)|nouveau dossier|nouveau fichier|supprimer.*(fichier|dossier)|gabarit|refs cassées|orphelin|index\.md|refonte|déplacer|renommer'

# --- Ids de dinos, chargés à la volée depuis _ordre.json (source de vérité de l'encyclopédie).
# Fallback : liste des fichiers content/dinos/*.json si _ordre.json est absent ou change de forme.
# Documente sa propre limite : si un dino est ajouté hors de ces deux sources, il reste muet ici
# jusqu'au prochain redémarrage du hook (aucun cache, relu à chaque prompt — coût négligeable).
$root = 'c:\ProjetsPerso\Claude_Projects\MaxPlay'
$dinoIds = @()
try {
    $ordrePath = Join-Path $root 'studio\dino\content\dinos\_ordre.json'
    if (Test-Path -LiteralPath $ordrePath) {
        $ordreData = Get-Content -LiteralPath $ordrePath -Raw -Encoding UTF8 | ConvertFrom-Json
        if ($ordreData.ordre) { $dinoIds = @($ordreData.ordre) }
    }
} catch { $dinoIds = @() }
if ($dinoIds.Count -eq 0) {
    try {
        $dinoIds = @(Get-ChildItem -Path (Join-Path $root 'studio\dino\content\dinos') -Filter '*.json' -File -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -notmatch '^_' } |
            ForEach-Object { $_.BaseName })
    } catch { $dinoIds = @() }
}
$dinoIdPattern = ''
if ($dinoIds.Count -gt 0) {
    $escaped = $dinoIds | ForEach-Object { [regex]::Escape($_) }
    $dinoIdPattern = '\b(' + ($escaped -join '|') + ')\b'
}

$gameMatch = $lowerPrompt -match $gameKeywords
$narrationMatch = $lowerPrompt -match $narrationKeywords
$dinoMatch = $lowerPrompt -match $dinoKeywords
if (-not $dinoMatch -and $dinoIdPattern) { $dinoMatch = $lowerPrompt -match $dinoIdPattern }
$structMatch = $lowerPrompt -match $structureKeywords

$pathGame = $lowerPrompt -match 'studio/minijeux/'
$pathNarration = $lowerPrompt -match 'studio/narration/'
$pathDino = $lowerPrompt -match 'studio/dino/|dev-dinos|dinos-data|audio/dinos'

$reminders = @()

if ($dinoMatch -or $pathDino) {
    $reminders += "[pôle DINO] -> .claude/rules/dino.md"
}

if (($gameMatch -or $pathGame) -and -not ($dinoMatch -or $pathDino)) {
    $reminders += "[pôle JEU] -> .claude/rules/mini-jeux.md"
}

if ($narrationMatch -or $pathNarration) {
    $reminders += "[pôle NARRATION] -> .claude/rules/narration-craft.md"
}

if ($structMatch -and -not ($gameMatch -or $narrationMatch -or $dinoMatch -or $pathGame -or $pathNarration -or $pathDino)) {
    $reminders += "[structure, pôle pas clair] -> déduire du chemin ou demander en texte, puis charger la rule du pôle"
}

if ($reminders.Count -gt 0) {
    Write-Output ""
    Write-Output "===== [hook signal-detector] Routage pôle ====="
    foreach ($r in $reminders) {
        Write-Output "  - $r"
    }
    Write-Output "================================================="
    Write-Output ""
}

exit 0
