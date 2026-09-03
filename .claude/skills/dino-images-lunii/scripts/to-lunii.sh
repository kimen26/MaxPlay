#!/usr/bin/env bash
# Convertit une image HD au format réel Lunii : 320x240, 16 niveaux de gris, sans alpha.
# FOND NOIR NATIF (figé 2026-06-17, clarifié Papa Yann) : l'image source est DÉJÀ composée
# sur fond noir (sujet clair). On NE FAIT PLUS d'inversion — l'inversion mécanique n'est pas
# belle. On se contente de : redimensionner -> niveaux de gris -> posteriser 16 niveaux ->
# letterbox noir (se fond dans le fond noir natif).
# Produit aussi un zoom x3 (nearest) pour inspection visuelle.
# Usage: bash to-lunii.sh <in.png> <out-lunii.png>
set -euo pipefail

IN="${1:?usage: to-lunii.sh <in.png> <out-lunii.png>}"
OUT="${2:?usage: to-lunii.sh <in.png> <out-lunii.png>}"
ZOOM="${OUT%.png}-zoom.png"

# Trouver ffmpeg (PATH sinon chemin winget connu)
FF="$(command -v ffmpeg || true)"
if [ -z "$FF" ]; then
  FF="C:/Users/kimen/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe"
fi

# Pipeline fond noir natif (PAS d'inversion) :
#  scale (fit) -> gris -> posterize 16 niveaux -> pad letterbox NOIR
"$FF" -y -i "$IN" -vf \
  "scale=320:240:force_original_aspect_ratio=decrease,format=gray,lutyuv=y='round(val/255*15)*17',pad=320:240:(ow-iw)/2:(oh-ih)/2:color=black" \
  -frames:v 1 "$OUT" 2>/dev/null

# Zoom x3 pour inspection (nearest = pixels nets)
"$FF" -y -i "$OUT" -vf "scale=960:720:flags=neighbor" -frames:v 1 "$ZOOM" 2>/dev/null

echo "✓ Lunii  → $OUT (320x240, 16 gris, fond noir natif — sans inversion)"
echo "✓ Zoom   → $ZOOM (inspection)"
