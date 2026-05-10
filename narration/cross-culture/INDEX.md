# Cross-culture — Index

> **Pilier 3 de la narration MaxPlay.**
> Tout ce qui **change selon la culture du lecteur** vit ici : prénoms, onomatopées, lieux, faune/flore, coutumes, climat. Les personnages (Pilier 1) et l'univers (Pilier 2) restent **invariants** ; seul le **costume culturel** change.
>
> Doctrine de référence : [`doctrine.md`](doctrine.md) (ex-`univers/meta/architecture-cross-culture.md`, décision 2026-04-29).

---

## Pourquoi ce pilier

L'univers MaxPlay n'est **pas un monde mono-culturel traduit**. C'est un univers structuré sur des **invariants universels** (les 9 ennéatypes, le monde post-Éveil, les sensibilités) qui prennent **des incarnations culturelles différentes** selon le pays.

```
                 PERSONNAGES (invariant)
                 ↓ 9 âmes + Wex, qui ne changent jamais
                 ↓
                 UNIVERS (invariant)
                 ↓ lois, cycles, sensibilités, monde post-Éveil
                 ↓
                 CROSS-CULTURE (variant) ← ce pilier
                 ↓
   ┌─────────────┼─────────────┐
   ↓             ↓             ↓
 Casting fr    Casting jp    Casting br ...
```

---

## Structure

```
cross-culture/
├── INDEX.md                       ← ce fichier
├── doctrine.md                    ← doctrine cross-culture (décision 2026-04-29)
│
├── prenoms/                       ← 218 prénoms qualifiés / 30 cultures
│   ├── INDEX.md
│   └── par-culture/               ← 1 fiche par aire linguistique
│
├── castings-nationaux/            ← prénoms attribués + identité locale
│   ├── INDEX.md
│   └── fr/                        ← V1 figé (Christ)
│       ├── type-01.md ... type-09.md, wex.md
│       └── (jp/, br/, sw/, he/ … à venir)
│
├── onomatopees/                   ← catalogue cross-culture (37 entrées)
│   ├── INDEX.md
│   └── catalogue-onomatopees.md
│
├── faune-flore/                   ← à peupler (animaux/plantes locaux)
│   └── INDEX.md
│
├── lieux-locaux/                  ← à peupler (équivalents locaux : pont/rivière gelée, etc.)
│   └── INDEX.md
│
├── coutumes-jeux-aliments/        ← à peupler
│   └── INDEX.md
│
└── saisons-climat/                ← à peupler (saisons locales : printemps / saison des pluies)
    └── INDEX.md
```

---

## Lectures par usage

| Tu cherches… | Va lire… |
|--------------|----------|
| Le casting V1 français (prénoms définitifs des 9 + Wex) | [`castings-nationaux/fr/`](castings-nationaux/fr/) |
| Des prénoms qualifiés pour construire un nouveau casting national | [`prenoms/INDEX.md`](prenoms/INDEX.md) |
| Une onomatopée à utiliser dans une histoire | [`onomatopees/catalogue-onomatopees.md`](onomatopees/catalogue-onomatopees.md) |
| L'équivalent local d'un décor (pont, rivière, sentier) | [`lieux-locaux/INDEX.md`](lieux-locaux/INDEX.md) *(à peupler)* |
| L'équivalent local d'une saison (printemps, automne) | [`saisons-climat/INDEX.md`](saisons-climat/INDEX.md) *(à peupler)* |
| La faune/flore disponible dans une culture cible | [`faune-flore/INDEX.md`](faune-flore/INDEX.md) *(à peupler)* |
| Les coutumes/jeux/aliments locaux | [`coutumes-jeux-aliments/INDEX.md`](coutumes-jeux-aliments/INDEX.md) *(à peupler)* |
| La doctrine cross-culture (bulles locales, croisements, règle anti-cliché) | [`doctrine.md`](doctrine.md) |

---

## État au 2026-05-10

- **Casting FR (V1)** : figé ✅
- **Catalogue prénoms** : 218 prénoms / 30 cultures qualifiées (statut « réserve »)
- **Catalogue onomatopées** : 37 entrées validées
- **Autres dossiers** : structure créée, à peupler au fil des histoires
- **Castings non-FR** : aucun construit pour l'instant (priorités probables : jp, br, he, sw)

---

## Liens

- Pilier Personnages : [`../personnages/INDEX.md`](../personnages/INDEX.md)
- Pilier Univers : [`../univers/INDEX.md`](../univers/INDEX.md)
- Plan éditorial : [`../saisons/INDEX.md`](../saisons/INDEX.md)
- Index racine narration : [`../INDEX.md`](../INDEX.md)
