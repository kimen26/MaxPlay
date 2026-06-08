# content/scripts/ — Outils

> Tous les exécutables du pôle. **CWD attendu = racine repo** (`MaxPlay/`) pour les `.sh` (ils `cd` eux-mêmes) ; les `.cjs` résolvent en `__dirname` → un déplacement = corriger les chemins. Hub : [`../INDEX.md`](../INDEX.md).

## 🔊 audio/

| Script | Rôle | Lit | Écrit |
|--------|------|-----|-------|
| `_md2json.cjs` | md → JSON text-to-dialogue (top 11) | `../../scripts-audio/groupe-*.md` | `../../scripts-audio/json-top/` |
| `_md2json-nouveaux.cjs <f.md>` | idem (nouveaux dinos, 1 fichier) | `../../scripts-audio/<f>.md` | `json-top/` |
| `_md2json-special.cjs` | idem (pangée / extinction) | `../../scripts-audio/special-*.md` | `json-top/` |
| `_gen-audio-top.sh` · `_gen-audio-nouveaux.sh` | curl text-to-dialogue → MP3 — ⚠️ **coût API ElevenLabs** | `json-top/` | `site/audio/dinos/` |
| `_gen-recaps.sh "id…"` | concat 4 blocs → recap (ffmpeg loudnorm, **0 API**) | `site/audio/dinos/` | idem |

## 🎨 images-grok/

| Script | Rôle |
|--------|------|
| `_gen-grok.cjs` | filtre `site/img/dinos/grok/` (KO exclus) → `site/js/dinos-images-grok.js` (galerie) |
| `_gen-prompts-grok.cjs` | génère `_PROMPTS-GROK.txt` (prompts vues manquantes) depuis l'état réel des données |
| `_PROMPTS-GROK.txt` | _(sortie)_ prompts Grok prêts à coller |

## 📤 export/ (regénèrent un doc/data depuis une source)

| Script | Rôle |
|--------|------|
| `_etymo2racines.cjs` | `../../sources/etymo/_ETYMO-RACINES-50.md` → `../../data/racines.json` |
| `_blocB-canonique-50.cjs` | `dinos-data.js` → `../../sources/mesures/_BLOC-B-CANONIQUE.md` (bloc Taille verbatim) |
| `_export-fiches.cjs` | `dinos-data.js` → `../../sources/fiches/_FICHES-CONTENU.md` (relecture) |

> **Réparés 2026-06-08** : les chemins pointaient encore vers `dino/content/…` et `../../site/js` (pré-migration du pôle dans `studio/`). Tous recâblés vers `studio/dino/content/…` + profondeur `site/` corrigée. Vérifiés par régen-diff (sorties identiques).
