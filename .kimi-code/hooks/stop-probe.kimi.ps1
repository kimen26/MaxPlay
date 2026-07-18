# stop-probe.kimi.ps1 — Hook Stop — VERSION KIMI CODE (SONDE)
# L'equivalent Claude (.claude/hooks/narration-pmo-check.ps1) depend de
# transcript_path + format JSONL Claude, NON portable tel quel sous Kimi Code.
# Cette sonde LOGUE le payload Stop recu (JSON brut, une ligne par appel) dans
# .kimi-code/hooks/stop-payload.jsonl pour permettre un portage fidele ulterieur.
# Non bloquant — exit 0 toujours.

$ErrorActionPreference = 'SilentlyContinue'

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

$logDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$logFile = Join-Path $logDir 'stop-payload.jsonl'
$ts = (Get-Date).ToString('yyyy-MM-ddTHH:mm:ss')
Add-Content -Path $logFile -Value ("{0} {1}" -f $ts, ($raw -replace "`r?`n", ' ')) -Encoding UTF8

exit 0
