#!/usr/bin/env bash
# run-writers-externes.sh — lance les 7 writers EXTERNES du casting figé (CLI call-llm.mjs)
#
# Writers couverts (casting 14 figé — voir equipe/CASTING-WRITERS.md / INVARIANTS.md) :
#   kimi-reco · deepseek-def · deepseek-reco · grok-def · grok-reco   (parallèle)
#   kimi-k26-instant · kimi-k26-thinking                              (séquentiel, plafond orga 3)
# NON couverts ici : 6 writers Claude (agents narration-writer-claude-libre) +
#   kimi-reco-guide (orchestration guidée via narration-writer-kimi-guide).
#
# Usage :
#   bash run-writers-externes.sh <story-slug> <prompt-file> [vague]
#     story-slug  : ex. 009-titre-de-l-histoire (dossier sous stories/)
#     prompt-file : prompt user complet (concat briefs + consigne 400-550 mots
#                   + demande de note d'intention) — composé par l'orchestrateur,
#                   le script l'envoie TEL QUEL (zéro altération de contexte).
#     vague       : numéro de vague (défaut 1)
#
# PRÉFLIGHT OBLIGATOIRE avant tout batch :
#   node infra/mcp/call-llm.mjs --check
#
# Températures = casting FIGÉ. Ne pas modifier sans alerte 🚨 règle figée :
#   kimi (kimi-for-coding)   : endpoint force temperature 1 (constat 2026-07-10)
#   deepseek-reco            : 1.2 (fallback — 1.5 dégénère en fin de texte, 2026-07-11)
#   grok-reco                : 1.2 (reco officielle)
#   k26-instant / thinking   : fixes par l'API (0.6 / 1), gérées par --thinking
set -u
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
STORY="${1:?usage: run-writers-externes.sh <story-slug> <prompt-file> [vague]}"
PROMPT="${2:?prompt-file manquant}"
VAGUE="${3:-1}"
SYS="$ROOT/studio/narration/equipe/_writer-system.md"
OUT="$ROOT/studio/narration/stories/$STORY/4-versions-writers"
TMP="$(mktemp -d)"
DATE="$(date +%F)"

[ -f "$SYS" ]    || { echo "ERREUR: system prompt absent: $SYS"; exit 2; }
[ -f "$PROMPT" ] || { echo "ERREUR: prompt file absent: $PROMPT"; exit 2; }
mkdir -p "$OUT"

run() { local file="$1" llm="$2" tlabel="$3"; shift 3
  if node "$ROOT/infra/mcp/call-llm.mjs" "$@" --system "$SYS" --prompt "$PROMPT" \
      --out "$TMP/$file.txt" 2>"$TMP/$file.err"; then
    { echo "---"; echo "llm: $llm"; echo "role: libre"; echo "temperature: $tlabel"
      echo "date: $DATE"; echo "vague: $VAGUE"; echo "---"; echo
      cat "$TMP/$file.txt"; } > "$OUT/$file.md"
    echo "OK $STORY/$file"
  else
    echo "FAIL $STORY/$file — voir $TMP/$file.err"
    FAILED=1
  fi
}

FAILED=0
run kimi-reco     "kimi-for-coding" "1 (forcée endpoint)" --provider kimi --temperature 1 &
run deepseek-def  "deepseek-chat"   "def"                 --provider deepseek &
run deepseek-reco "deepseek-chat"   "1.2 (fallback 1.5 dégénère)" --provider deepseek --temperature 1.2 &
run grok-def      "grok-4"          "def"                 --provider grok &
run grok-reco     "grok-4"          "1.2 (reco)"          --provider grok --temperature 1.2 &
wait

# kimi-payant : SÉQUENTIEL (plafond concurrence orga = 3). Garde-fou --writer dans call-llm.mjs.
run kimi-k26-instant  "kimi-k2.6" "fixe K2.6 (thinking disabled)" --provider kimi-payant --writer kimi-k26-instant  --thinking disabled
sleep 3
run kimi-k26-thinking "kimi-k2.6" "fixe K2.6 (thinking enabled)"  --provider kimi-payant --writer kimi-k26-thinking --thinking enabled

echo "=== WRITERS EXTERNES $STORY TERMINÉ (raw: $TMP) ==="
exit $FAILED
