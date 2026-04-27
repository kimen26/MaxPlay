# Personnages — Index

> ✅ **Casting V1 validé 2026-04-24** — origine **France** (Christ).
> ✅ **Structure multi-pays mise en place 2026-04-28** — un dossier par type, sous-dossier `pays/` pour les castings.
> **Wex = héros hors-système** — jamais traduit, un seul casting universel.
> Concept cross-country : les 9 types changent de prénom selon l'origine (fr, jp, sw, he...).
> Le **caractère ennéatype et la sensibilité sont invariants** dans toutes les versions.
> → [lookup.yml](lookup.yml) pour la résolution des tokens `titi_N_pays`.
> → [notation-types.md](notation-types.md) pour la convention `TypeN / TitiN × pays`.

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
→ L'ancien emplacement `Eneagramme/personnages/` contient des stubs de redirection.

---

## Ressources transversales

- [Eneagramme/situations/interactions.md](../Eneagramme/situations/interactions.md) — tableau 9×9 des interactions
- [Eneagramme/situations/emotions-universelles.md](../Eneagramme/situations/emotions-universelles.md) — 81 réactions
- [reference/enneagramme-9-niveaux-riso-hudson.md](../reference/enneagramme-9-niveaux-riso-hudson.md) — niveaux Riso-Hudson
- [univers/sensibilites.md](../univers/sensibilites.md) — doctrine des 9 sensibilités
