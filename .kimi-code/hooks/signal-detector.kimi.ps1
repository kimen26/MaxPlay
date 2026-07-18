# MaxPlay — Hook UserPromptSubmit (VERSION KIMI CODE)
# Adaptation de .claude/hooks/signal-detector.ps1 :
#   - payload Kimi : champs snake_case, on accepte plusieurs noms pour le prompt
#   - sortie : texte brut sur stdout (ajouté au contexte), exit 0 toujours (non bloquant)
# La version Claude (.claude/hooks/signal-detector.ps1) reste la référence pour la logique.

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$inputJson = [Console]::In.ReadToEnd()

try {
    $data = $inputJson | ConvertFrom-Json -ErrorAction Stop
    $prompt = ''
    foreach ($f in @('prompt', 'user_prompt', 'text', 'message', 'input')) {
        if ($data.$f) { $prompt = [string]$data.$f; break }
    }
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
    $reminders += "[SIGNAL DINO detecte] -> consulter dino-pmo (.claude/agents/dino-pmo.md, FOND). Si modif structure : aussi dino-archiviste (FORME). Contenu/peda/ecriture : dino-conseiller. Verifier studio/dino/figees/encyclopedie.md (Tritri, audio, UI)."
}

if (($gameMatch -or $pathGame) -and -not ($dinoMatch -or $pathDino)) {
    $reminders += "[SIGNAL JEU detecte] -> consulter game-pmo (.claude/agents/game-pmo.md, FOND). Si modif structure : aussi game-archiviste (FORME)."
}

if ($narrationMatch -or $pathNarration) {
    $reminders += "[SIGNAL NARRATION detecte] -> consulter narration-pmo (.claude/agents/narration-pmo.md, FOND). Si modif structure : aussi narration-archiviste (FORME)."
}

if ($structMatch -and -not ($gameMatch -or $narrationMatch -or $dinoMatch -or $pathGame -or $pathNarration -or $pathDino)) {
    $reminders += "[SIGNAL STRUCTURE detecte sans pole clair] -> demander le pole a l'utilisateur OU deduire du chemin avant de toucher a la structure."
}

if ($reminders.Count -gt 0) {
    Write-Output ""
    Write-Output "===== [hook signal-detector] Rappel MILITAIRE declencheurs ====="
    foreach ($r in $reminders) {
        Write-Output "  - $r"
    }
    Write-Output "Tableau de routage : AGENTS.md / CLAUDE.md racine - section 'ACTION OBLIGATOIRE'."
    Write-Output "NOTE Kimi Code : les agents .claude/agents/*.md sont des PLAYBOOKS a lire soi-meme (pas de subagent_type custom)."
    Write-Output "================================================================"
    Write-Output ""
}

exit 0
