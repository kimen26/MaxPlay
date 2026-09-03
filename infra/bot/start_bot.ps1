# Lance le bot Telegram MaxPlay (botard) avec redemarrage automatique.
# Historique : le bot etait lance a la main (Start-Process depuis une session
# Claude Code). Le 2026-07-04 il est mort sur un 409 Conflict (double instance)
# et personne ne l'a su pendant 7 semaines. D'ou cette tache au logon.
# Garde anti-double-instance : deux bots sur le meme token = 409 Conflict.
# NB : fichier volontairement sans accents (PS 5.1 lit l'UTF-8 sans BOM en ANSI).
$botDir = $PSScriptRoot
Set-Location $botDir

$log = Join-Path $botDir "bot-runner.log"
$bun = if (Test-Path "$env:USERPROFILE\.bun\bin\bun.exe") { "$env:USERPROFILE\.bun\bin\bun.exe" }
       else { (Get-Command bun -ErrorAction SilentlyContinue).Source }
if (-not $bun) {
    "$(Get-Date -Format s) ERREUR : bun introuvable - bot non demarre" |
        Add-Content $log -ErrorAction SilentlyContinue
    exit 1
}

# Une seule instance : si index.ts tourne deja, on sort sans rien casser.
$running = Get-CimInstance Win32_Process -Filter "Name = 'bun.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -and $_.CommandLine -match 'infra.bot.index\.ts' }
if ($running) {
    "$(Get-Date -Format s) bot deja actif (pid $($running.ProcessId)) - sortie" |
        Add-Content $log -ErrorAction SilentlyContinue
    exit 0
}

while ($true) {
    if ((Test-Path $log) -and (Get-Item $log).Length -gt 5MB) {
        Move-Item $log "$log.1" -Force -ErrorAction SilentlyContinue  # rotation simple
    }
    "$(Get-Date -Format s) demarrage index.ts" | Add-Content $log -ErrorAction SilentlyContinue
    & cmd.exe /c "`"$bun`" run `"$botDir\index.ts`" >> `"$log`" 2>&1"
    "$(Get-Date -Format s) bot arrete (code $LASTEXITCODE), relance dans 15 s" |
        Add-Content $log -ErrorAction SilentlyContinue
    # 15 s : laisse Telegram liberer la session getUpdates avant de reprendre
    # (un restart trop rapide retombe sur un 409 Conflict).
    Start-Sleep -Seconds 15
}
