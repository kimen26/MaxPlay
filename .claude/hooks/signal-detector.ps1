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
$narrationKeywords = '\bpersonnage|\bhistoire\b|\bvoix\b|elevenlabs|\bbrief\b|kanban|équipe narrat|\bunivers\b|\bsaison\b|\barc\b|ennéagramme|cross-culture|\bpitch\b|rewrite|gatekeeper|\blecteur\b|\bcasting\b|\binbox\b|\bwex\b|\bmelki\b|\bmimi\b|\bpolo\b|\bmadie\b|\blulu\b|pierrot|\braph\b|\bjuju\b|\bnono\b|kishōtenketsu|kishotenketsu'

# === Signaux DINO ===
$dinoKeywords = '\bdino\b|\bdinos\b|dinosaure|encyclopédie|dev-dinos|\btritri\b|ptérosaure|cératopsien|théropode|sauropode|récit.*époque|époque.*dino|le voyage dans le temps|tricératops|tyrannosaure|\bt-rex\b|mosasaure|paléonto'

# === Signaux structure (transverses) ===
$structureKeywords = 'créer.*(fichier|dossier|nouveau)|nouveau dossier|nouveau fichier|supprimer.*(fichier|dossier)|gabarit|refs cassées|orphelin|index\.md|refonte|déplacer|renommer'

$gameMatch = $lowerPrompt -match $gameKeywords
$narrationMatch = $lowerPrompt -match $narrationKeywords
$dinoMatch = $lowerPrompt -match $dinoKeywords
$structMatch = $lowerPrompt -match $structureKeywords

$pathGame = $lowerPrompt -match 'game/'
$pathNarration = $lowerPrompt -match 'narration/'
$pathDino = $lowerPrompt -match 'dino/|dev-dinos|dinos-data|audio/dinos'

$reminders = @()

if ($dinoMatch -or $pathDino) {
    $reminders += "[SIGNAL DINO detecte] -> invoquer dino-pmo (FOND) automatiquement. Si modif structure : aussi dino-archiviste (FORME). Contenu/peda/ecriture : dino-conseiller. Verifier dino/figees/encyclopedie.md (Tritri, audio, UI)."
}

if (($gameMatch -or $pathGame) -and -not ($dinoMatch -or $pathDino)) {
    $reminders += "[SIGNAL JEU detecte] -> invoquer game-pmo (FOND) automatiquement. Si modif structure : aussi game-archiviste (FORME)."
}

if ($narrationMatch -or $pathNarration) {
    $reminders += "[SIGNAL NARRATION detecte] -> invoquer narration-pmo (FOND) automatiquement. Si modif structure : aussi narration-archiviste (FORME)."
}

if ($structMatch -and -not ($gameMatch -or $narrationMatch -or $dinoMatch -or $pathGame -or $pathNarration -or $pathDino)) {
    $reminders += "[SIGNAL STRUCTURE detecte sans pole clair] -> demander le pole a l'utilisateur OU deduire du chemin avant d'invoquer l'archiviste."
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
