# Lance le Chromium de Playwright avec un port de debug et un profil dedie,
# ouvert sur ChatGPT. Alternative a launch-brave.ps1 quand Brave est deja lance
# sans port de debug (ses processus sont partages entre profils : on ne peut pas
# ouvrir une seconde instance en debug sans fermer la premiere).
# La session ChatGPT persiste dans le profil d une fois sur l autre.
param([int]$Port = 9225, [string]$ProfileDir = "c:/tmp/chromium-dino")

$exe = "C:\Users\kimen\AppData\Local\ms-playwright\chromium-1223\chrome-win64\chrome.exe"
if (-not (Test-Path $exe)) { Write-Error "Chromium Playwright introuvable: $exe"; exit 1 }

try {
  Invoke-WebRequest -Uri "http://127.0.0.1:$Port/json/version" -TimeoutSec 2 -UseBasicParsing | Out-Null
  Write-Host "Chromium debug deja actif sur $Port - rien a faire."
  exit 0
} catch {}

Start-Process $exe -ArgumentList @(
  "--remote-debugging-port=$Port",
  "--user-data-dir=$ProfileDir",
  "--no-first-run",
  "--no-default-browser-check",
  "https://chatgpt.com/"
)

for ($i = 0; $i -lt 15; $i++) {
  Start-Sleep -Seconds 2
  try {
    Invoke-WebRequest -Uri "http://127.0.0.1:$Port/json/version" -TimeoutSec 2 -UseBasicParsing | Out-Null
    Write-Host "OK - port debug $Port actif. Logue-toi a ChatGPT dans la fenetre si demande."
    exit 0
  } catch {}
}
Write-Error "Le port debug $Port ne repond pas apres 30s."
exit 1
