---
code_pays: XX
nom: <Nom complet du pays/culture>
famille: <Christ / Ghibli / Tupi-Orisha / AT / Swahili / ...>
statut: <à construire | en cours | figé>
date_fixation: YYYY-MM-DD
casting_v1: false
---

# Casting <Famille> — <Nom du pays>

> **Statut :** <à construire>. Source prénoms : [`../../prenoms/par-culture/<fichier>.md`](../../prenoms/par-culture/).
>
> Casting **parmi N** (le casting V1 figé est `fr/`). Voir [`../../doctrine.md`](../../doctrine.md) pour les règles cross-culture.

---

## Tableau des 9 + Wex

| Type | Fiche | Prénom complet | **Diminutif** | Genre |
|------|-------|----------------|---------------|-------|
| 1 — Perfectionniste | [type-01.md](type-01.md) | — | — | — |
| 2 — Aidant | [type-02.md](type-02.md) | — | — | — |
| 3 — Performeur | [type-03.md](type-03.md) | — | — | — |
| 4 — Individualiste | [type-04.md](type-04.md) | — | — | — |
| 5 — Observateur | [type-05.md](type-05.md) | — | — | — |
| 6 — Loyal | [type-06.md](type-06.md) | — | — | — |
| 7 — Enthousiaste | [type-07.md](type-07.md) | — | — | — |
| 8 — Challenger | [type-08.md](type-08.md) | — | — | — |
| 9 — Pacificateur | [type-09.md](type-09.md) | — | — | — |
| Hors-système | [wex.md](wex.md) | Wex (invariant) | **Wex** | M |

**Bilan genre cible :** maintenir 4F/5M+Wex (équilibre du casting FR V1). Toute exception doit être justifiée.

---

## Particularités du casting

- **Famille de prénoms :** <ex: Tupi-Guarani + Orishas — origines indigènes du Brésil>
- **Voix native :** enfants nés <langue native> → `{native_language: <Brazilian Portuguese>}` dans les prompts ElevenLabs
- Wex garde le prénom « Wex » dans toutes les cultures (invariant cross-culture)

---

## Personnage invariant vs identité locale

Ce dossier contient **uniquement** ce qui change avec <nom culture> :
- prénom + prononciation IPA + origine du prénom
- éventuel override voix (`voix.md` si différences)
- décors locaux récurrents (`decor-local.md`)
- lexique/expressions locales (`lexique.md`)

Le reste — ennéatype, sensibilité, gestes/attitudes/habitudes, voix-signature universelle — vit dans [`../../../personnages/type-NN/`](../../../personnages/).

---

## Étapes de construction d'un casting

1. **Choisir les 10 prénoms** depuis [`../../prenoms/par-culture/<fichier>.md`](../../prenoms/par-culture/) en respectant le bilan genre 4F/5M+Wex.
2. **Créer les 10 fiches** `type-NN.md` (copier `_gabarit/type-XX.md` et remplir).
3. **Créer `wex.md`** (Wex invariant côté prénom, mais peut avoir une identité locale légère).
4. **Documenter les overrides voix** dans `voix.md` si la langue native impose des ajustements.
5. **Préparer les variantes décor** dans `decor-local.md` (équivalents pont, rivière, talus, mare, etc.).
6. **Mettre à jour [`../../../personnages/lookup.yml`](../../../personnages/lookup.yml)** avec les nouveaux tokens `titi_N_<pays>`.
7. **Mettre à jour [`../INDEX.md`](../INDEX.md)** (tableau des castings).
8. **Tracer décision** dans [`../../../pmo/decisions.md`](../../../pmo/decisions.md).

---

## Liens

- Index castings : [`../INDEX.md`](../INDEX.md)
- Doctrine cross-culture : [`../../doctrine.md`](../../doctrine.md)
- Catalogue prénoms réserve : [`../../prenoms/INDEX.md`](../../prenoms/INDEX.md)
- Pilier Personnages (invariant) : [`../../../personnages/INDEX.md`](../../../personnages/INDEX.md)
