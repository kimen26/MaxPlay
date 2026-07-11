#!/usr/bin/env bash
# run-panel-cli.sh — legs CLI du panel lecteurs v2 (axes externes)
#
# Panel v2 = 12 fiches / histoire : 4 groupes (G1-garcon, G2-fille, G3-dyade-papa,
# G4-dyade-maman) × 3 modèles hétérogènes. Ce script produit les legs EXTERNES :
#   axe Kimi     : 4 groupes (temp 1 forcée endpoint)
#   axe DeepSeek : G3 + G4 (def)
# Les legs Claude (G1/G2 + agents lecteur/dyade) restent orchestrés par agents.
#
# Usage :
#   bash run-panel-cli.sh <sys-dir> <corpus-file> <story-slug> [axe-provider]
#     sys-dir      : dossier contenant sys-g1-garcon.md, sys-g2-fille.md,
#                    sys-g3-dyade-papa.md, sys-g4-dyade-maman.md (system prompts groupes)
#     corpus-file  : corpus anonymisé (versions SANS notes d'intention)
#     story-slug   : ex. 006-le-noeud-qui-tient
#     axe-provider : provider de l'axe 4-groupes (défaut kimi ; deepseek = substitution
#                    quota — dérogation à documenter dans la fiche et le kanban)
#
# PRÉFLIGHT : node infra/mcp/call-llm.mjs --check
set -u
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
SYSDIR="${1:?usage: run-panel-cli.sh <sys-dir> <corpus-file> <story-slug> [axe-provider]}"
CORPUS="${2:?corpus-file manquant}"
STORY="${3:?story-slug manquant}"
AXE="${4:-kimi}"
OUTDIR="$ROOT/studio/narration/stories/$STORY/5-lecteurs-temoins"
TMP="$(mktemp -d)"
DATE="$(date +%F)"

[ -d "$SYSDIR" ] || { echo "ERREUR: sys-dir absent: $SYSDIR"; exit 2; }
[ -f "$CORPUS" ] || { echo "ERREUR: corpus absent: $CORPUS"; exit 2; }
mkdir -p "$OUTDIR"

leg() { local grp="$1" pref="$2" prov="$3"; shift 3
  local sys="$SYSDIR/sys-$grp.md"
  [ -f "$sys" ] || { echo "FAIL $STORY $pref-$prov — system absent: $sys"; FAILED=1; return; }
  if node "$ROOT/infra/mcp/call-llm.mjs" --provider "$prov" "$@" \
      --system "$sys" --prompt "$CORPUS" \
      --out "$TMP/$pref-$prov.txt" 2>"$TMP/$pref-$prov.err"; then
    { echo "# Lecteur — $pref · Modèle $prov (canal CLI call-llm.mjs)"
      echo "> Panel v2 $STORY — corpus anonymisé, notes d'intention retirées. Généré $DATE."
      echo
      cat "$TMP/$pref-$prov.txt"; } > "$OUTDIR/$pref-$prov.md"
    echo "OK $STORY $pref-$prov"
  else
    echo "FAIL $STORY $pref-$prov — voir $TMP/$pref-$prov.err"
    FAILED=1
  fi
}

FAILED=0
# Axe 4-groupes (kimi par défaut ; temp 1 = seule acceptée par l'endpoint kimi-for-coding)
if [ "$AXE" = "kimi" ]; then AXEARGS=(--temperature 1); else AXEARGS=(); fi
leg g1-garcon      G1-garcon      "$AXE" "${AXEARGS[@]}" &
leg g2-fille       G2-fille       "$AXE" "${AXEARGS[@]}" &
leg g3-dyade-papa  G3-dyade-papa  "$AXE" "${AXEARGS[@]}" &
leg g4-dyade-maman G4-dyade-maman "$AXE" "${AXEARGS[@]}" &
# Axe DeepSeek dyades (sauté si l'axe principal est déjà deepseek — pas de doublon)
if [ "$AXE" != "deepseek" ]; then
  leg g3-dyade-papa  G3-dyade-papa  deepseek &
  leg g4-dyade-maman G4-dyade-maman deepseek &
fi
wait

echo "=== PANEL CLI $STORY ($AXE) TERMINÉ (raw: $TMP) ==="
exit $FAILED
