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
| [`i18n/`](i18n/INDEX.md) | 🌍 **Multilingue** : lexiques prononciation 9 langues + textes traduits par langue | — |
| [`scripts-audio/`](scripts-audio/) | 🎙️ **Dialogues** Wex/Narrateur (`groupe-*`, `special-*`, template) + prod FR `fr/` (V3 + json-top) | — |
| [`assets/`](assets/) | 🎨 **Assets visuels** — banque de silhouettes dino par famille (PNG noir/transparent, mini-jeux). ⛔ Voir [`assets/silhouettes/_STOP-3-ZONES.md`](assets/silhouettes/_STOP-3-ZONES.md) (3 zones silhouettes coexistent). | [`assets/silhouettes/_INDEX.md`](assets/silhouettes/_INDEX.md) |
| [`lunii/`](lunii/) | 🎒 **Images Lunii** — 9 emblèmes familles + couverture (320×240, 16 gris, **fond noir natif**). Produites par skill `dino-images-lunii`, consommées par `studio/lunii/scripts/build-dinos-pack.mjs` | [`lunii/INDEX.md`](lunii/INDEX.md) |
| [`inbox/`](inbox/) | 📥 **Brut non trié** — matière à exploiter | — |

> 🖼️ **Toutes les images dino** (déployées `site/img/dinos/` + autoring + staging) : carte maîtresse → [`INDEX-IMAGES.md`](INDEX-IMAGES.md) — « je cherche X → va là », nommage, comment régénérer.

## 🔁 Le flux (de la source au produit déployé)

```
sources/etymo/_ETYMO-RACINES-50.md ─(_etymo2racines.cjs)─▶ data/racines.json ─▶ Dico + Quiz + fiches
sources/recits/RECITS-EPOQUES.md ─(_md2json-recits-v3.cjs)─▶ recits/json/ ─(_gen-audio-recits-v3.sh)─▶ site/audio/dinos/recit-*.mp3
scripts-audio/groupe-*.md ─(_md2json.cjs)─▶ scripts-audio/fr/json-top/ ─(_gen-audio-*.sh)─▶ site/audio/dinos/fr/*.mp3
site/img/dinos/grok/ ─(_gen-grok.cjs)─▶ site/js/dinos-images-grok.js (galerie)
```

## 📌 État & doctrine

> **DEC-GED-001 (2026-07-03)** : ce fichier NE cite AUCUN count en dur (règle #2 « zéro chiffre en dur » — un chiffre recopié à la main ment). La source de vérité des chiffres = **[`../../site/js/dinos-data.js`](../../../site/js/dinos-data.js)** (produit) ; le tracker des invariants (exception légitime) = **[`../pmo/INVARIANTS.md`](../pmo/INVARIANTS.md)**.

- **Compte dinos · familles · régimes** → voir [`../pmo/INVARIANTS.md`](../pmo/INVARIANTS.md) (jamais recopié ici).
- **Récits d'époque** : canon = `sources/recits/RECITS-EPOQUES.md` (ex-V5, anciennes versions dans `recits/_archive/`).
- **Étymo** : source active `sources/etymo/_ETYMO-RACINES-50.md` (⚠️ périmé, ne couvre pas les Cénozoïque) → bascule vers `_ETYMO-COMPLET-60.md` = ticket EP-D-GED.
- ⚠️ `sources/mesures/_BLOC-B-CANONIQUE.md` **périmé** vs `dinos-data.js`. À régénérer OU à graver « gelé volontairement » (ticket EP-D-GED).
- ❓ `scripts-audio/001-trex-brachiosaure-velociraptor.md` : brouillon early non consommé par le pipeline, à archiver.
