# content/ — Hub (carte du dossier)

> Dossier d'**autoring** du pôle DINO (sources, données, scripts). Le **code déployé** vit ailleurs : [`site/dev-dinos.html`](../../../site/dev-dinos.html) · [`site/js/dinos-data.js`](../../../site/js/dinos-data.js).
> Catalogue du **pôle** (vue produit d'ensemble) : [`../INDEX.md`](../INDEX.md). Ce fichier-ci = carte du **dossier content/**.
> Réorganisé 2026-06-08 : séparation claire sources / data / scripts (voir [`../pmo/decisions.md`](../pmo/decisions.md)).

## 🗂️ Les natures (1 dossier = 1 rôle)

| Dossier | Rôle | INDEX |
|---------|------|-------|
| [`sources/`](sources/) | 📚 **Vérité** — prose de recherche fact-checkée, jamais réinventer | [`sources/INDEX.md`](sources/INDEX.md) |
| [`data/`](data/) | 🎯 **Donnée structurée** — nourrit les features (dico, quiz, fiches) | [`data/INDEX.md`](data/INDEX.md) |
| [`scripts/`](scripts/) | 🛠️ **Outils** — génèrent audio / images / exports | [`scripts/INDEX.md`](scripts/INDEX.md) |
| [`scripts-audio/`](scripts-audio/) | 🎙️ **Dialogues** Wex/Narrateur (`groupe-*`, `special-*`, template) + cache `json-top/` | — |
| [`assets/`](assets/) | 🎨 **Assets visuels** — banque 215 silhouettes dino par famille (PNG noir/transparent, mini-jeux) | [`assets/silhouettes/_INDEX.md`](assets/silhouettes/_INDEX.md) |
| [`inbox/`](inbox/) | 📥 **Brut non trié** — matière à exploiter | — |

## 🔁 Le flux (de la source au produit déployé)

```
sources/etymo/_ETYMO-RACINES-50.md ─(_etymo2racines.cjs)─▶ data/racines.json ─▶ Dico + Quiz + fiches
scripts-audio/groupe-*.md ─(_md2json.cjs)─▶ scripts-audio/json-top/ ─(_gen-audio-*.sh)─▶ site/audio/dinos/*.mp3
site/img/dinos/grok/ ─(_gen-grok.cjs)─▶ site/js/dinos-images-grok.js (galerie)
site/js/dinos-data.js ─(_blocB-canonique-50.cjs)─▶ sources/mesures/_BLOC-B-CANONIQUE.md
```

## 📌 État (2026-06-08)

- 50 dinos · 9 familles · 4 régimes — détail produit → [`../INDEX.md`](../INDEX.md).
- `data/racines.json` : 69 racines grec/latin (généré, regénérable).
- ⚠️ `sources/mesures/_BLOC-B-CANONIQUE.md` **périmé** vs `dinos-data.js` (chiffres dérivés depuis les corrections data récentes). Régénérer = décision narration → [`../pmo/decisions.md`](../pmo/decisions.md).
- ❓ `scripts-audio/001-trex-brachiosaure-velociraptor.md` : brouillon early non consommé par le pipeline, à confirmer/supprimer.
