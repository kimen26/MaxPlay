#!/bin/bash
# Génère les 8 MP3 du voyage dans le temps (récits V3) via text-to-dialogue ElevenLabs.
cd "c:/ProjetsPerso/Claude_Projects/MaxPlay"
KEY=$(node -e "process.stdout.write(JSON.parse(require('fs').readFileSync('C:/Users/kimen/.claude.json','utf8')).mcpServers.elevenlabs.env.ELEVENLABS_API_KEY)")
SRC="studio/dino/content/sources/recits/json"
OUT="site/audio/dinos"
mkdir -p "$OUT"

RECITS="intro trias jurassique cretace extinction mammiferes glace-mammouth paleo"
OK=0; KO=0

for id in $RECITS; do
  J="$SRC/_seg-recit-${id}.json"
  O="$OUT/recit-${id}.mp3"
  if [ ! -f "$J" ]; then echo "KO recit-${id} JSON-absent"; KO=$((KO+1)); continue; fi
  H=$(curl -s -w "%{http_code}" -X POST "https://api.elevenlabs.io/v1/text-to-dialogue" -H "xi-api-key: $KEY" -H "Content-Type: application/json" -d @"$J" --output "$O" --max-time 90)
  SZ=$(stat -c%s "$O" 2>/dev/null || echo 0)
  if [ "$H" = "200" ] && [ "$SZ" -gt 5000 ]; then
    OK=$((OK+1)); echo "OK  recit-${id} ($SZ)"
  else
    KO=$((KO+1)); echo "KO  recit-${id} HTTP=$H sz=$SZ :: $(head -c 180 "$O" 2>/dev/null)"
    rm -f "$O"
  fi
  sleep 8
done

echo "=== DONE OK=$OK KO=$KO ==="
