# MaxPlay — Hook UserPromptSubmit : détecte les signaux JEU/NARRATION
# et rappelle militairement quel agent PMO/Archiviste invoquer.
#
# Source : doc Anthropic hooks-guide. Reçoit JSON {"prompt": "..."} sur stdin.
# Output texte = ajouté au contexte Claude AVANT que le prompt soit traité.
# Non bloquant — exit 0 toujours.

# Force UTF-8 en sortie pour préserver les accents
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
$gameKeywords = 'mini-jeu|mini jeu|mj-\d|bus-svg|victory-sounds|\btile\b|recipe|limezu|cartography|patterns\.js|rules\.md|stack\.md|phaser|max-adventure|déploiement|asphalt|sidewalk|mj-pose|vocab\.py|tile-tools|tile-picker'

# === Signaux NARRATION ===
$narrationKeywords = '\bpersonnage|\bhistoire\b|\bvoix\b|elevenlabs|\bbrief\b|kanban|équipe narrat|\bunivers\b|\bsaison\b|\barc\b|ennéagramme|cross-culture|\bpitch\b|rewrite|gatekeeper|\blecteur\b|\bcasting\b|\binbox\b|\bwex\b|\bmelki\b|\bmimi\b|\bdadou\b|\bpolo\b|\bmadie\b|\blulu\b|pierrot|\braph\b|\bjuju\b|\bnono\b|kishōtenketsu|kishotenketsu'

# === Signaux DINO ===
$dinoKeywords = '\bdino\b|\bdinos\b|dinosaure|encyclopédie|dev-dinos|\btritri\b|ptérosaure|cératopsien|théropode|sauropode|récit.*époque|époque.*dino|le voyage dans le temps|tricératops|tyrannosaure|\bt-rex\b|mosasaure|paléonto'

# === Signaux structure (transverses) ===
$structureKeywords = 'créer.*(fichier|dossier|nouveau)|nouveau dossier|nouveau fichier|supprimer.*(fichier|dossier)|gabarit|refs cassées|orphelin|index\.md|refonte|déplacer|renommer'

$gameMatch = $lowerPrompt -match $gameKeywords
$narrationMatch = $lowerPrompt -match $narrationKeywords
$dinoMatch = $lowerPrompt -match $dinoKeywords
$structMatch = $lowerPrompt -match $structureKeywords

$pathGame = $lowerPrompt -match 'studio/minijeux/'
$pathNarration = $lowerPrompt -match 'studio/narration/'
$pathDino = $lowerPrompt -match 'studio/dino/|dev-dinos|dinos-data|audio/dinos'

$reminders = @()

if ($dinoMatch -or $pathDino) {
    $reminders += "[SIGNAL DINO] -> CAPTURE IMMEDIATE : toute idee/decision de ce tour = 1 ligne dans studio/dino/pmo/backlog.md DANS LE TOUR (pas a la cloture). Verifier figees/encyclopedie.md avant d'editer. Brainstorm/contenu/peda -> consulter dino-conseiller. Cloture de session : trace dans studio/dino/pmo/ (toi-meme) ou dino-pmo."
}

if (($gameMatch -or $pathGame) -and -not ($dinoMatch -or $pathDino)) {
    $reminders += "[SIGNAL JEU] -> CAPTURE IMMEDIATE : toute idee/decision de ce tour = 1 ligne dans studio/minijeux/memory/TODO.md DANS LE TOUR. Figeage Papa Yann ('c'est fige') -> docs/jeux/figees/mj-XX.md AVANT tout. Brainstorm/design -> consulter game-conseiller. Cloture : trace dans studio/minijeux/memory/ (toi-meme) ou game-pmo."
}

if ($narrationMatch -or $pathNarration) {
    $reminders += "[SIGNAL NARRATION] -> CAPTURE IMMEDIATE : toute idee/decision de ce tour = 1 ligne dans studio/narration/memory/TODO.md DANS LE TOUR. Chiffre/casting/voice_id -> narration-pmo mode RECHERCHE (jamais de memoire). Brainstorm -> consulter narration-conseiller. Cloture : trace dans studio/narration/memory/ (toi-meme) ou narration-pmo."
}

if ($structMatch -and -not ($gameMatch -or $narrationMatch -or $dinoMatch -or $pathGame -or $pathNarration -or $pathDino)) {
    $reminders += "[SIGNAL STRUCTURE sans pole clair] -> deduire le pole du chemin ou demander en texte, puis appliquer la capture immediate du pole."
}

if ($reminders.Count -gt 0) {
    Write-Output ""
    Write-Output "===== [hook signal-detector] Rappel MILITAIRE declencheurs ====="
    foreach ($r in $reminders) {
        Write-Output "  - $r"
    }
    Write-Output "Tableau complet des signaux : CLAUDE.md racine - section 'Signaux qui declenchent les agents auto'."
    Write-Output "================================================================"
    Write-Output ""
}

exit 0
