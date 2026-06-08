#!/bin/bash
cd "c:/ProjetsPerso/Claude_Projects/MaxPlay"
KEY=$(node -e "process.stdout.write(JSON.parse(require('fs').readFileSync('C:/Users/kimen/.claude.json','utf8')).mcpServers.elevenlabs.env.ELEVENLABS_API_KEY)")
SRC="dino/content/scripts-audio/json-top"
OUT="site/audio/dinos"
mkdir -p "$OUT"
DINOS="tyrannosaurus velociraptor stegosaurus spinosaurus giganotosaurus brachiosaurus ankylosaurus diplodocus allosaurus carnotaurus triceratops"
OK=0; KO=0
for d in $DINOS; do
  for b in nom taille regime funfact; do
    J="$SRC/_seg-${d}-${b}.json"
    O="$OUT/${d}-${b}.mp3"
    if [ ! -f "$J" ]; then echo "KO ${d}-${b} JSON-absent"; KO=$((KO+1)); continue; fi
    H=$(curl -s -w "%{http_code}" -X POST "https://api.elevenlabs.io/v1/text-to-dialogue" -H "xi-api-key: $KEY" -H "Content-Type: application/json" -d @"$J" --output "$O" --max-time 90)
    SZ=$(stat -c%s "$O" 2>/dev/null || echo 0)
    if [ "$H" = "200" ] && [ "$SZ" -gt 5000 ]; then OK=$((OK+1)); echo "OK  ${d}-${b} ($SZ)"; else KO=$((KO+1)); echo "KO  ${d}-${b} HTTP=$H sz=$SZ :: $(head -c 140 "$O" 2>/dev/null)"; rm -f "$O"; fi
    sleep 8
  done
done
echo "=== DONE OK=$OK KO=$KO ==="
