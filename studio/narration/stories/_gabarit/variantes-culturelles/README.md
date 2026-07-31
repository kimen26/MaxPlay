# Variantes culturelles — convention

> Un **patch culturel** = le delta de localisation d'une histoire pour un casting national (prénoms, lieux, objets, tournures). Le texte canon (`10-texte.md`) contient des **tokens** ; le moteur de publication applique le patch du casting cible.

## Règles

1. **Aucun patch pour le casting de base (FR)** — le texte canon EST la version française. (Ex-`christ.patch` « patch identité », supprimé 2026-07-27 : un patch qui ne modifie rien n'a pas vocation à exister.)
2. Un patch par casting **ne se crée que quand le casting national existe** (cf. [`../../cross-culture/castings-nationaux/`](../../cross-culture/castings-nationaux/)) — aujourd'hui : **aucun**, seul FR est figé.
3. Nommage : `<code-casting>.patch.yml` (ex. `jp.patch.yml`, `br.patch.yml`).
4. Contenu : `prénoms:` · `lieux:` · `objets:` · `tournures:` — uniquement ce qui **change** vs la version FR.

> Référence tokens : [`../../personnages/notation-types.md`](../../personnages/notation-types.md) · résolveur prénoms : [`../../personnages/lookup.yml`](../../personnages/lookup.yml).
