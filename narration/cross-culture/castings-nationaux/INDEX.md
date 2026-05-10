# Castings nationaux — Index

> Un dossier par pays/culture. Chaque casting attribue un **prénom local** + une **identité locale** aux 9 ennéatypes invariants (+ Wex, invariant cross-culture).

---

## Castings disponibles

| Code | Famille | Statut | Fiches |
|------|---------|--------|--------|
| `fr` | Christ (France) | ✅ **V1 figé** 2026-04-24 | [`fr/`](fr/) |
| `jp` | Ghibli (Japon) | ⚪ à construire | — |
| `br` | Tupi-Orisha (Brésil) | ⚪ prioritaire (origines Max) | — |
| `he` | AT (Hébreu) | ⚪ à construire | — |
| `sw` | Swahili (Afrique de l'Est) | ⚪ à construire | — |

→ Surcouverture catalogue prénoms : 30 cultures qualifiées dans [`../prenoms/INDEX.md`](../prenoms/INDEX.md).

---

## Gabarit (pour construire un nouveau casting)

Un gabarit complet est disponible dans [`_gabarit/`](_gabarit/) :
- `README.md` (présentation casting + étapes de construction)
- `type-XX.md` (modèle perso à dupliquer 9 fois)
- `wex.md` (modèle Wex local)
- `voix.md` (modèle overrides voix si nécessaire)

→ Copier `_gabarit/` → `<code-pays>/`, remplir, mettre à jour `personnages/lookup.yml` + cet INDEX.

---

## Structure d'un casting

```
castings-nationaux/<code>/
├── README.md          ← présentation casting (genre F/M, voix native, particularités)
├── type-01.md         ← Melki/équivalent — prénom complet, diminutif, prononciation IPA, origine du prénom
├── type-02.md
├── ...
├── type-09.md
├── wex.md             ← Wex local (prénom toujours "Wex" — invariant — mais identité contextuelle locale)
├── voix.md            ← overrides voix culture-spécifiques (native_language pour ElevenLabs)
├── decor-local.md     ← équivalents locaux des décors récurrents (pont, rivière, etc.)
└── lexique.md         ← mots/expressions locales utilisables dans le texte
```

---

## Règle d'écriture

Les histoires (`stories/NNN/texte.md`) utilisent des **tokens** (cf. [`../../personnages/notation-types.md`](../../personnages/notation-types.md)) :
- `{titi_4}` → résolu en `Madie` (fr) ou `Miyu` (jp) ou `Iracema` (br)…
- `{decor.pont}` → « petit pont de bois » (fr) / « pont gelé » (saison sèche jp) / « pont de lianes » (br)…

Le **moteur de publication** substitue les tokens selon le casting cible. Voir [`../../personnages/lookup.yml`](../../personnages/lookup.yml) pour la résolution des prénoms.

---

## Liens

- Doctrine : [`../doctrine.md`](../doctrine.md)
- Catalogue prénoms (matière brute) : [`../prenoms/INDEX.md`](../prenoms/INDEX.md)
- Pilier Personnages (invariant) : [`../../personnages/INDEX.md`](../../personnages/INDEX.md)
