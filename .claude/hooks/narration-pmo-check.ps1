# Stop hook — narration-pmo-check.ps1
# Si le tour a modifié des fichiers studio/narration/** ou .claude/agents/narration-*.md
# ET que l'agent narration-pmo n'a pas été invoqué dans ce tour,
# bloque la fin de tour avec un message rappelant d'invoquer le PMO.
#
# Décision 2026-05-08 : PMO systématique en mode narration.
# Cf. .claude/agents/narration-pmo.md (procédure formelle classification + remise main).

$ErrorActionPreference = "Stop"

# Lecture input JSON via stdin
try {
    $raw = [Console]::In.ReadToEnd()
    if ([string]::IsNullOrWhiteSpace($raw)) { exit 0 }
    $input_json = $raw | ConvertFrom-Json
} catch {
    # Si on ne peut pas parser, on laisse passer (pas bloquer une erreur de notre côté)
    exit 0
}

# Évite boucle infinie si Stop hook s'auto-déclenche
if ($input_json.stop_hook_active -eq $true) {
    exit 0
}

$transcript_path = $input_json.transcript_path
if ([string]::IsNullOrEmpty($transcript_path) -or -not (Test-Path -LiteralPath $transcript_path)) {
    exit 0
}

# Patterns de chemins qui déclenchent le PMO
$narration_patterns = @(
    "narration[\\/]",
    "\.claude[\\/]agents[\\/]narration-",
    "infra[\\/]mcp[\\/]MODELS\.md"
)

$narration_touched = $false
$pmo_invoked = $false

# Parse JSONL ligne par ligne
$lines = Get-Content -LiteralPath $transcript_path -Encoding UTF8
foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    try {
        $entry = $line | ConvertFrom-Json
    } catch {
        continue
    }

    # On scanne uniquement les messages assistant qui contiennent des tool_use
    if (-not $entry.message) { continue }
    if (-not $entry.message.content) { continue }

    foreach ($content in $entry.message.content) {
        if ($content.type -ne "tool_use") { continue }

        # Détection Edit/Write/MultiEdit sur fichiers narration
        if ($content.name -in @("Edit", "Write", "MultiEdit")) {
            $path = $content.input.file_path
            if ([string]::IsNullOrEmpty($path)) { continue }
            foreach ($pattern in $narration_patterns) {
                if ($path -match $pattern) {
                    $narration_touched = $true
                    break
                }
            }
        }

        # Détection invocation Agent narration-pmo
        if ($content.name -eq "Agent") {
            if ($content.input.subagent_type -eq "narration-pmo") {
                $pmo_invoked = $true
            }
        }
    }
}

if ($narration_touched -and -not $pmo_invoked) {
    # Bloque la fin de tour avec message vers stderr (Claude le voit)
    $msg = @"
[hook narration-pmo-check] Mode NARRATION détecté ce tour : des fichiers studio/narration/** ou agents narration-* ont été modifiés.

Avant de rendre la main à l'auteur, invoquer l'agent narration-pmo (Haiku) avec la procédure formelle 2026-05-08 :
  - Classification du tour (6 catégories : DÉCISION / LEÇON / TODO / QUESTION / INFO / TRAITEMENT IMMÉDIAT)
  - Mises à jour des fichiers PMO concernés (decisions.md, sprint-log.md, backlog.md, lecons-vivantes.md)
  - Checklist remise main 8 points (INDEX à jour, pas de références cassées, kanban aligné, etc.)

Voir : .claude/agents/narration-pmo.md (section "Procédure systématique").

Une fois le PMO passé, la fin de tour sera autorisée.
"@
    [Console]::Error.WriteLine($msg)
    exit 2
}

exit 0
