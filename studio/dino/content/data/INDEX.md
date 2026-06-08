# content/data/ — Données structurées

> Donnée **machine** qui nourrit les features (page Dico, Quiz, fiches). Dérivée des [`../sources/`](../sources/), régénérable. Hub : [`../INDEX.md`](../INDEX.md).

| Fichier | Contenu | Généré par | Source |
|---------|---------|-----------|--------|
| [`racines.json`](racines.json) | `racines[]` : 69 racines grec/latin triées par fréquence (`-saure` 29 dinos, `-odon` 5…) · `dinos{}` : décompo + sens recomposé + statut `nom_etym` | [`../scripts/export/_etymo2racines.cjs`](../scripts/export/_etymo2racines.cjs) | [`../sources/etymo/_ETYMO-RACINES-50.md`](../sources/etymo/_ETYMO-RACINES-50.md) |

## Consommateurs prévus

- **Page Dico Latin/Grec** : `racines` filtrées `type=racine`, triées par `n` (les plus récurrentes d'abord).
- **Quiz** lecture : « que veut dire *cérat* ? » · « décompose *Tricératops* ».
- **Fiches** : cohérence du `nom_etym` (vérif vs décompo) — `racines.json` flag déjà 5 `nom_etym` à corriger.

## Règle

La **vérité** reste dans `sources/etymo/`. Ne pas éditer `racines.json` à la main : corriger le `.md` puis **régénérer**. La curation pédagogique (libellés enfant, racines vedettes du Dico) = `dino-conseiller`.
