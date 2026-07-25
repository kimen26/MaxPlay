#!/bin/bash
# Génère les MP3 EL (4 blocs + recap concaténé) pour une liste de dinos,
# depuis les segments V3 (scripts-audio/fr/V3/json) produits par _md2json-v3.cjs.
# Diffère de _gen-audio-nouveaux.sh uniquement par le dossier source (V3/json vs json-top).
# Usage: bash _gen-audio-v3.sh "minmi scutellosaurus ..."
cd "c:/ProjetsPerso/Claude_Projects/MaxPlay"
# Résolution de la clé : .claude.json ne contient qu'un placeholder "${ELEVENLABS_API_KEY}"
# depuis le passage à la norme secrets (valeurs dans ~/.claude/settings.json > env).
# On lit donc settings.json en priorité, .claude.json en repli si la valeur y est littérale.
KEY=$(node -e "
const fs=require('fs');
const read=p=>{try{return JSON.parse(fs.readFileSync(p,'utf8'))}catch(e){return null}};
const s=read('C:/Users/kimen/.claude/settings.json');
let k=s&&s.env&&s.env.ELEVENLABS_API_KEY;
if(!k||/^\\\$\{/.test(k)){
  const c=read('C:/Users/kimen/.claude.json');
  const v=c&&c.mcpServers&&c.mcpServers.elevenlabs&&c.mcpServers.elevenlabs.env.ELEVENLABS_API_KEY;
  if(v&&!/^\\\$\{/.test(v)) k=v;
}
if(!k||/^\\\$\{/.test(k)){console.error('CLE ELEVENLABS INTROUVABLE');process.exit(1)}
process.stdout.write(k);
") || exit 1
SRC="studio/dino/content/scripts-audio/fr/V3/json"
OUT="site/audio/dinos/fr"
mkdir -p "$OUT"
OK=0; KO=0
for d in $1; do
  for b in nom taille regime funfact; do
    J="$SRC/_seg-${d}-${b}.json"
    O="$OUT/${d}-${b}.mp3"
    if [ ! -f "$J" ]; then echo "KO ${d}-${b} JSON-absent"; KO=$((KO+1)); continue; fi
    H=$(curl -s -w "%{http_code}" -X POST "https://api.elevenlabs.io/v1/text-to-dialogue" -H "xi-api-key: $KEY" -H "Content-Type: application/json" -d @"$J" --output "$O" --max-time 120)
    SZ=$(stat -c%s "$O" 2>/dev/null || echo 0)
    if [ "$H" = "200" ] && [ "$SZ" -gt 5000 ]; then OK=$((OK+1)); echo "OK  ${d}-${b} ($SZ)"; else KO=$((KO+1)); echo "KO  ${d}-${b} HTTP=$H sz=$SZ :: $(head -c 140 "$O" 2>/dev/null)"; rm -f "$O"; fi
    sleep 8
  done
done
echo "=== BLOCS OK=$OK KO=$KO ==="
# recaps = concat des 4 blocs (0 coût API), chemins relatifs pour ffmpeg Windows
bash studio/dino/content/scripts/audio/_gen-recaps.sh "$1"
