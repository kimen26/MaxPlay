#!/bin/bash
# Génère les recaps (concat des 4 blocs) pour une liste de dinos. 0 coût API.
# Chemins RELATIFS (ffmpeg Windows ne gère pas /c/... de pwd). Usage: bash _gen-recaps.sh "id1 id2 ..."
cd "c:/ProjetsPerso/Claude_Projects/MaxPlay"
OUT="site/audio/dinos/fr"
OK=0; KO=0
for d in $1; do
  if [ -f "$OUT/${d}-nom.mp3" ] && [ -f "$OUT/${d}-taille.mp3" ] && [ -f "$OUT/${d}-regime.mp3" ] && [ -f "$OUT/${d}-funfact.mp3" ]; then
    LIST="$OUT/_concat-${d}.txt"
    : > "$LIST"
    for b in nom taille regime funfact; do echo "file '${d}-${b}.mp3'" >> "$LIST"; done
    # ffmpeg lit le concat avec des chemins relatifs à l'emplacement du fichier liste
    (cd "$OUT" && ffmpeg -y -f concat -safe 0 -i "_concat-${d}.txt" -af loudnorm -c:a libmp3lame -b:a 128k "${d}-recap.mp3" -loglevel error) \
      && { node studio/dino/content/scripts/audio/_pad-tete.mjs "$OUT/${d}-recap.mp3" >/dev/null; echo "RECAP ${d} OK"; OK=$((OK+1)); } || { echo "RECAP ${d} KO"; KO=$((KO+1)); }
    rm -f "$LIST"
  else
    echo "RECAP ${d} SKIP (blocs manquants)"; KO=$((KO+1))
  fi
done
echo "=== RECAPS OK=$OK KO=$KO ==="
