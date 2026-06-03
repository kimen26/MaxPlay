cd "c:/ProjetsPerso/Claude_Projects/MaxPlay"
KEY=$(node -e "process.stdout.write(JSON.parse(require('fs').readFileSync('C:/Users/kimen/.claude.json','utf8')).mcpServers.elevenlabs.env.ELEVENLABS_API_KEY)")
DINOS="tyrannosaurus velociraptor stegosaurus spinosaurus giganotosaurus brachiosaurus ankylosaurus diplodocus allosaurus carnotaurus"
OK=0; KO=0
for d in $DINOS; do
  for pair in nom:nom taille:taille regime:regime superpower:pouvoir ennemis:ennemis funfact:funfact; do
    src="${pair%%:*}"; dst="${pair##*:}"
    O="game/web/audio/dinos/${d}-${dst}.mp3"
    if [ "$d" = "tyrannosaurus" ] && [ "$dst" = "nom" ] && [ -f "$O" ]; then echo "SKIP ${d}-${dst} (test deja fait)"; continue; fi
    J="dino/content/assets/audio/_seg-${d}-${src}.json"
    if [ ! -f "$J" ]; then echo "KO  ${d}-${dst} JSON-absent"; KO=$((KO+1)); continue; fi
    H=$(curl -s -w "%{http_code}" -X POST "https://api.elevenlabs.io/v1/text-to-dialogue" -H "xi-api-key: $KEY" -H "Content-Type: application/json" -d @"$J" --output "$O" --max-time 60)
    SZ=$(stat -c%s "$O" 2>/dev/null || echo 0)
    if [ "$H" = "200" ] && [ "$SZ" -gt 5000 ]; then OK=$((OK+1)); echo "OK  ${d}-${dst} ($SZ)"; else KO=$((KO+1)); echo "KO  ${d}-${dst} HTTP=$H sz=$SZ :: $(head -c 140 "$O" 2>/dev/null)"; rm -f "$O"; fi
    sleep 7
  done
done
echo "=== DONE OK=$OK KO=$KO ==="
