# Lance Brave avec le port de debug 9222 sur un profil dédié, ouvert sur ChatGPT.
# La session reste loguée d'une fois sur l'autre. Profil isolé = ne touche pas la navigation habituelle.
$brave = "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
if (-not (Test-Path $brave)) { Write-Error "Brave introuvable: $brave"; exit 1 }

# Déjà en écoute ?
try {
  $r = Invoke-WebRequest -Uri "http://127.0.0.1:9222/json/version" -TimeoutSec 2 -UseBasicParsing
  Write-Host "Brave debug déjà actif sur 9222 — rien à faire."
  exit 0
} catch {}

Start-Process $brave -ArgumentList @(
  "--remote-debugging-port=9222",
  "--user-data-dir=c:/tmp/brave-debug",
  "https://chatgpt.com/"
)
Start-Sleep -Seconds 3
try {
  $r = Invoke-WebRequest -Uri "http://127.0.0.1:9222/json/version" -TimeoutSec 3 -UseBasicParsing
  Write-Host "OK — port debug 9222 actif. Logue-toi à ChatGPT dans la fenêtre si demandé."
} catch {
  Write-Error "Le port debug ne répond pas. Ferme toute autre instance Brave et réessaie."
  exit 1
}
