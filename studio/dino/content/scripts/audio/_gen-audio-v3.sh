#!/bin/bash
# Génère les MP3 EL (4 blocs + recap concaténé) pour une liste de dinos,
# depuis les segments V3 (scripts-audio/fr/V3/json) produits par _md2json-v3.cjs.
# Diffère de _gen-audio-nouveaux.sh uniquement par le dossier source (V3/json vs json-top).
# Usage: bash _gen-audio-v3.sh "minmi scutellosaurus ..." ["nom regime"]   (2e arg optionnel = blocs, defaut 4)
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
BLOCS="${2:-nom taille regime funfact}"
for d in $1; do
  for b in $BLOCS; do
    J="$SRC/_seg-${d}-${b}.json"
    O="$OUT/${d}-${b}.mp3"
    if [ ! -f "$J" ]; then echo "KO ${d}-${b} JSON-absent"; KO=$((KO+1)); continue; fi
    H=$(curl -s -w "%{http_code}" -X POST "https://api.elevenlabs.io/v1/text-to-dialogue" -H "xi-api-key: $KEY" -H "Content-Type: application/json" -d @"$J" --output "$O" --max-time 120)
    SZ=$(stat -c%s "$O" 2>/dev/null || echo 0)
    if [ "$H" = "200" ] && [ "$SZ" -gt 5000 ]; then OK=$((OK+1)); node studio/dino/content/scripts/audio/_pad-tete.mjs "$O" >/dev/null || echo "  (pad tête KO ${d}-${b})"; echo "OK  ${d}-${b} ($SZ)"; else KO=$((KO+1)); echo "KO  ${d}-${b} HTTP=$H sz=$SZ :: $(head -c 140 "$O" 2>/dev/null)"; rm -f "$O"; fi
    sleep 8
  done
done
echo "=== BLOCS OK=$OK KO=$KO ==="
# recaps = concat des 4 blocs (0 coût API), chemins relatifs pour ffmpeg Windows
bash studio/dino/content/scripts/audio/_gen-recaps.sh "$1"
# Porte R13b (vague 3) : verif-mp3 <id> pour chaque dino de la liste -- KO si un MP3
# manque au lieu d'un "OK" silencieux sur fichier absent. N'ENVOIE aucune requête API
# (0 crédit ElevenLabs), lit uniquement le disque (ffprobe/ffmpeg).
VERIF_KO=0
for d in $1; do
  node studio/dino/content/scripts/audio/verif-mp3.mjs "$d" || VERIF_KO=$((VERIF_KO+1))
done
if [ "$VERIF_KO" -gt 0 ]; then
  echo "=== verif-mp3 : $VERIF_KO dino(s) avec au moins un bloc hors bornes ==="
fi
