# studio-ctl.ps1 — pilote STUdio (Lunii) de façon fiable.
# Le .bat fourni (studio-windows.bat) échoue souvent : `java` n'est PAS sur le PATH système,
# et son `copy` prompte quand les jars existent déjà. Ce script lance java en CHEMIN ABSOLU.
#
# Usage :
#   powershell -File studio-ctl.ps1 start    # lance STUdio (localhost:8080), attend qu'il soit up
#   powershell -File studio-ctl.ps1 stop     # arrête STUdio (libère le device USB D:)
#   powershell -File studio-ctl.ps1 status   # 8080 up ? + état device
#   powershell -File studio-ctl.ps1 packs    # liste les packs lus sur la boîte (via API)
#
# ⚠️ AVANT toute écriture directe sur la carte SD de la Lunii (ex. réparer .pi) : `stop` d'abord,
#    sinon le backend java tient le lecteur et l'écriture échoue
#    (« Un périphérique qui n'existe pas a été spécifié »). cf. LESSONS-MOTEUR BUG-4.

param([ValidateSet('start','stop','status','packs')] [string]$cmd = 'status')

$STUDIO = 'C:\ProjetsPerso\Tools\studio-lunii\studio-web-ui-0.4.2'
$PORT = 8080

function Get-StudioPid { (Get-NetTCPConnection -LocalPort $PORT -State Listen -ErrorAction SilentlyContinue).OwningProcess }
function Find-Java {
  $j = (Get-ChildItem 'C:\Program Files\Eclipse Adoptium\*\bin\java.exe' -ErrorAction SilentlyContinue | Select-Object -First 1).FullName
  if (-not $j) { $j = (Get-Command java -ErrorAction SilentlyContinue).Source }
  $j
}

switch ($cmd) {
  'start' {
    if (Get-StudioPid) { "STUdio déjà actif sur $PORT (PID $(Get-StudioPid))."; break }
    $java = Find-Java
    if (-not $java) { Write-Error "java introuvable (Adoptium JDK attendu)."; break }
    $cp = "$STUDIO\studio-web-ui-0.4.2.jar;$STUDIO\lib\*;."
    $jargs = @(
      '-Dvertx.disableDnsResolver=true',
      '-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager',
      '-Dvertx.logger-delegate-factory-class-name=io.vertx.core.logging.Log4j2LogDelegateFactory',
      '-Dfile.encoding=UTF-8', '-cp', $cp,
      'io.vertx.core.Launcher','run','studio.webui.MainVerticle')
    $p = Start-Process -FilePath $java -ArgumentList $jargs -WorkingDirectory $STUDIO `
         -RedirectStandardOutput "$env:TEMP\studio-out.log" -RedirectStandardError "$env:TEMP\studio-err.log" `
         -WindowStyle Hidden -PassThru
    "STUdio lancé (java PID $($p.Id))…"
    for ($i=0; $i -lt 30; $i++) { Start-Sleep 2; if (Get-StudioPid) { "✅ UP sur http://localhost:$PORT après ~$([int](($i+1)*2))s."; return } }
    "⚠️ Pas up après 60s — stderr :"; Get-Content "$env:TEMP\studio-err.log" -Tail 15 -ErrorAction SilentlyContinue
  }
  'stop' {
    $sp = Get-StudioPid
    if ($sp) { Stop-Process -Id $sp -Force; "STUdio (PID $sp) arrêté → device D: libéré." }
    else { "STUdio déjà arrêté." }
  }
  'status' {
    $sp = Get-StudioPid
    if ($sp) { "STUdio UP (PID $sp, port $PORT)." } else { "STUdio DOWN." }
    $d = Get-Volume -ErrorAction SilentlyContinue | Where-Object FileSystemLabel -eq 'LUNII'
    if ($d) { "Lunii montée : $($d.DriveLetter): ($([math]::Round($d.SizeRemaining/1GB,1)) Go libres)." } else { "Lunii non détectée comme lecteur." }
  }
  'packs' {
    try { $packs = Invoke-RestMethod -Uri "http://localhost:$PORT/api/device/packs" -TimeoutSec 10
          "$($packs.Count) packs lus sur la boîte." ; $packs | ForEach-Object { "  - $($_.folderName)  $($_.title)" } }
    catch { Write-Error "Échec lecture device (STUdio up ? boîte branchée ?) : $_" }
  }
}
