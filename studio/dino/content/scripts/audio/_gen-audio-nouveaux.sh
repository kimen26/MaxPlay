#!/bin/bash
# Génère les MP3 EL pour une liste de dinos (4 blocs chacun) + recap concaténé.
# Usage: bash _gen-audio-nouveaux.sh "kosmoceratops diabloceratops ..."
cd "c:/ProjetsPerso/Claude_Projects/MaxPlay"
KEY=$(node -e "process.stdout.write(JSON.parse(require('fs').readFileSync('C:/Users/kimen/.claude.json','utf8')).mcpServers.elevenlabs.env.ELEVENLABS_API_KEY)")
SRC="studio/dino/content/scripts-audio/json-top"
OUT="site/audio/dinos"
mkdir -p "$OUT"
DINOS="$1"
OK=0; KO=0
for d in $DINOS; do
  for b in nom taille regime funfact; do
    J="$SRC/_seg-${d}-${b}.json"
    O="$OUT/${d}-${b}.mp3"
    if [ ! -f "$J" ]; then echo "KO ${d}-${b} JSON-absent"; KO=$((KO+1)); continue; fi
    H=$(curl -s -w "%{http_code}" -X POST "https://api.elevenlabs.io/v1/text-to-dialogue" -H "xi-api-key: $KEY" -H "Content-Type: application/json" -d @"$J" --output "$O" --max-time 120)
    SZ=$(stat -c%s "$O" 2>/dev/null || echo 0)
    if [ "$H" = "200" ] && [ "$SZ" -gt 5000 ]; then OK=$((OK+1)); echo "OK  ${d}-${b} ($SZ)"; else KO=$((KO+1)); echo "KO  ${d}-${b} HTTP=$H sz=$SZ :: $(head -c 140 "$O" 2>/dev/null)"; rm -f "$O"; fi
    sleep 8
  done
  # recap = concat des 4 blocs (0 coût API) avec ffmpeg + loudnorm
  R="$OUT/${d}-recap.mp3"
  if [ -f "$OUT/${d}-nom.mp3" ] && [ -f "$OUT/${d}-taille.mp3" ] && [ -f "$OUT/${d}-regime.mp3" ] && [ -f "$OUT/${d}-funfact.mp3" ]; then
    LIST=$(mktemp)
    for b in nom taille regime funfact; do echo "file '$(pwd)/$OUT/${d}-${b}.mp3'" >> "$LIST"; done
    ffmpeg -y -f concat -safe 0 -i "$LIST" -af loudnorm -c:a libmp3lame -b:a 128k "$R" -loglevel error && echo "RECAP ${d} OK" || echo "RECAP ${d} KO"
    rm -f "$LIST"
  fi
done
echo "=== DONE OK=$OK KO=$KO ==="
