# Personnages — Index

> ✅ **Casting V1 validé 2026-04-24** — origine **France** (Christ) — **un casting parmi N**.
> ✅ **Structure multi-pays mise en place 2026-04-28** — un dossier par type, sous-dossier `pays/` pour les castings.
> ✅ **Architecture cross-culture tranchée 2026-04-29** — voir [`../pmo/decisions.md`](../pmo/decisions.md) et [`../univers/architecture-cross-culture.md`](../univers/architecture-cross-culture.md).
>
> **Structure générale de l'univers :**
> - **Wex** = archetype universel, **prénom invariant** (« Wex »), présent dans toutes les communautés / cultures.
> - **9 compagnons** = ennéatypes invariants + sensibilités fixes, MAIS **prénoms variables par culture** (9 nouveaux prénoms par casting national) + vies adaptées au pays + **légère variance dans l'expression de l'ennéatype**.
>
> Le casting V1 « Christ » français = **un casting parmi N à venir**. Les 218 prénoms / 30 cultures de [`catalogue-prenoms/`](catalogue-prenoms/INDEX.md) sont la **base opérationnelle** pour construire les autres castings nationaux.
>
> → [lookup.yml](lookup.yml) pour la résolution des tokens `titi_N_pays`.
> → [notation-types.md](notation-types.md) pour la convention `TypeN / TitiN × pays`.
> → [catalogue-prenoms/INDEX.md](catalogue-prenoms/INDEX.md) pour les prénoms qualifiés des autres castings.

---

## Structure des dossiers

```
personnages/
├── INDEX.md (ce fichier)
├── lookup.yml          ← résolveur token → prénom
├── notation-types.md   ← convention TypeN/TitiN
├── _gabarit/           ← modèles vierges pour nouveaux types/pays
├── archive/            ← prénoms-brainstorm, candidats, matrice plate
├── type-01/            ← Perfectionniste (Melki/fr)
│   ├── README.md
│   ├── caractere.md
│   ├── relations.md
│   ├── sensibilite.md
│   ├── voix.md
│   └── pays/fr/identite.md
├── type-02/ ... type-09/  (même structure)
└── wex/
    ├── README.md
    ├── caractere.md
    ├── relations.md
    ├── sensibilite.md
    ├── voix.md
    └── pays/fr/identite.md  ← universel, jamais de pays/jp/ etc.
```

### Codes pays disponibles

| Code | Nom | Famille | Statut |
|------|-----|---------|--------|
| `fr` | France | Christ | ✅ V1 — casting principal |
| `jp` | Japon | Ghibli | ⚪ à créer pour S2 |
| `he` | Hébreu / Ancien Testament | AT | ⚪ à créer |
| `sw` | Swahili / Afrique de l'Est | Swahili | ⚪ à créer |

---

## Tableau des 9 — Casting V1 (France)

> **Règle d'écriture :** dans les histoires et dialogues, on utilise le **diminutif 4/5 du temps**.
> Le prénom complet sert aux moments formels, solennels, ou quand un adulte nomme l'enfant.

| Dossier | Type | Prénom complet | **Diminutif** | Essence | Sensibilité | Token |
|---------|------|----------------|---------------|---------|-------------|-------|
| [type-01/](type-01/) | Perfectionniste | Melchisédech | **Melki** | Être bon·ne | Minéraux | `titi_1_fr` |
| [type-02/](type-02/) | Aidant | Marie (F) | **Mimi** | Être aimé·e | Eau | `titi_2_fr` |
| [type-03/](type-03/) | Performeur | Paul | **Polo** | Être valorisé·e | Forces | `titi_3_fr` |
| [type-04/](type-04/) | Individualiste | Jérémie | **Jérem** | Être soi-même | Fréquence | `titi_4_fr` |
| [type-05/](type-05/) | Observateur | Luc | **Lulu** | Comprendre | Quantique | `titi_5_fr` |
| [type-06/](type-06/) | Loyal | Pierre | **Pierrot** | Avoir du soutien | Animaux | `titi_6_fr` |
| [type-07/](type-07/) | Enthousiaste | Raphaëlle (F) | **Raph** | Être comblé·e | Cosmos | `titi_7_fr` |
| [type-08/](type-08/) | Challenger | Judith (F) | **Juju** | Être fort·e | Plantes | `titi_8_fr` |
| [type-09/](type-09/) | Pacificateur | Noé | **Nono** | La paix | Vibration collective | `titi_9_fr` |

### Hors-système

| Dossier | Rôle | Prénom | Token |
|---------|------|--------|-------|
| [wex/](wex/) | **Héros universel** | **Wex** | `wex` |

**Bilan genre casting France :** 3F (Mimi, Raph, Juju) / 6M + Wex. **Figé — définitif.**

---

## Fiches détaillées

→ Chaque dossier `type-NN/` contient les 5 fichiers + dossier `pays/`.
→ L'ancien emplacement `enneagramme/personnages/` contient des stubs de redirection.

---

## Sensibilités différenciées (tranché 2026-04-29)

> **Règle structurelle** : chaque personnage perçoit ce que les autres ne perçoivent pas. C'est de la **sensibilité différenciée** — **pas du savoir caché**. Aucune hiérarchie « Wex sait, les autres ignorent ».
>
> Voir `../pmo/decisions.md` (section *Sensibilité différenciée*) et `../univers/sensibilites.md`.

| Perso | Type | Sensibilité | Statut |
|-------|------|-------------|--------|
| **Wex** | hors-système | À définir précisément — piste : écoute des fausses notes / lien soin-bioélectrique | 🟡 NARR-003 |
| Melki | T1 | Minéraux | ✅ figé |
| Mimi | T2 | Eau | ✅ figé |
| Polo | T3 | Forces | ✅ figé |
| Jérem | T4 | Fréquence | ✅ figé |
| Lulu | T5 | Quantique | ✅ figé |
| Pierrot | T6 | Animaux | ✅ figé |
| Raph | T7 | Cosmos | ✅ figé |
| Juju | T8 | Plantes | ✅ figé |
| Nono | T9 | Vibration collective | ✅ figé |

**Révélation progressive** : les sensibilités sont peu/pas présentes en début S1, affleurent en milieu/fin S1, sont **mises en avant en S2** (saison des visites — Wex chez chaque copain). Voir `../pmo/roadmap.md`.

**Détail à creuser** : ce que perçoit *exactement* Wex (NARR-003) — à définir progressivement via les histoires, idéalement en début S2 quand sa propre découverte devient le sujet.

---

## Ressources transversales

- [enneagramme/casting-mapping.md](../enneagramme/casting-mapping.md) — pont type ↔ casting V1 (à lire avant d'écrire)
- [enneagramme/situations/interactions.md](../enneagramme/situations/interactions.md) — tableau 9×9 des interactions
- [enneagramme/situations/emotions-universelles.md](../enneagramme/situations/emotions-universelles.md) — 81 réactions
- [univers/sensibilites.md](../univers/sensibilites.md) — doctrine des 9 sensibilités
- [univers/compagnons.md](../univers/compagnons.md) — compagnons ondes/couleurs (distinct des sensibilités)
