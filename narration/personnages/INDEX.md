# Personnages — Index (Pilier 1)

> **Qui sont nos persos + théorie sur l'humain.** Wex + 9 compagnons-ennéatypes. Identité invariante (ennéatype, voix-signature, gestes, sensibilité, relations). Les **variantes culturelles** (prénoms, prononciation, décor local) vivent dans [`../cross-culture/`](../cross-culture/INDEX.md).

---

## Casting V1 — France (Christ) · figé 2026-04-24

> **Règle d'écriture :** dans les histoires et dialogues, on utilise le **diminutif 4/5 du temps**. Le prénom complet sert aux moments solennels.

| Dossier | Type | Prénom complet | **Diminutif** | Essence | Sensibilité | Token |
|---------|------|----------------|---------------|---------|-------------|-------|
| [type-01/](type-01/) | Perfectionniste | Melchisédech | **Melki** | Être bon·ne | Minéraux | `titi_1_fr` |
| [type-02/](type-02/) | Aidant | Marie (F) | **Mimi** | Être aimé·e | Eau | `titi_2_fr` |
| [type-03/](type-03/) | Performeur | David | **Dadou** | Être valorisé·e | Forces | `titi_3_fr` |
| [type-04/](type-04/) | Individualiste | Madeleine (F) | **Madie** | Être soi-même | Fréquence | `titi_4_fr` |
| [type-05/](type-05/) | Observateur | Luc | **Lulu** | Comprendre | Quantique | `titi_5_fr` |
| [type-06/](type-06/) | Loyal | Pierre | **Pierrot** | Avoir du soutien | Animaux | `titi_6_fr` |
| [type-07/](type-07/) | Enthousiaste | Raphaëlle (F) | **Raph** | Être comblé·e | Cosmos | `titi_7_fr` |
| [type-08/](type-08/) | Challenger | Judith (F) | **Juju** | Être fort·e | Plantes | `titi_8_fr` |
| [type-09/](type-09/) | Pacificateur | Noé | **Nono** | La paix | Vibration collective | `titi_9_fr` |
| [wex/](wex/) | Hors-système | **Wex** (invariant) | **Wex** | — | à définir (NARR-003) | `wex` |

**Bilan genre :** 4F (Mimi, Madie, Raph, Juju) / 5M + Wex. **Figé.**

→ Casting attribué FR (prénom, prononciation IPA, origine) dans [`../cross-culture/castings-nationaux/fr/`](../cross-culture/castings-nationaux/fr/).
→ Castings à venir (jp, br, he, sw…) : voir [`../cross-culture/castings-nationaux/INDEX.md`](../cross-culture/castings-nationaux/INDEX.md).

---

## Structure du pilier

```
personnages/
├── INDEX.md                        ← ce fichier
├── lookup.yml                      ← résolveur token → prénom (toutes cultures)
├── notation-types.md               ← convention TypeN/TitiN dans les textes
├── casting-mapping.md              ← pont théorie ↔ casting V1
│
├── type-01..09/                    ← 9 fiches incarnées (INVARIANT)
│   ├── README.md
│   ├── caractere.md                ← ennéatype + gestes/attitudes/habitudes
│   ├── relations.md                ← interactions avec les 8 autres
│   ├── sensibilite.md              ← sensibilité différenciée
│   └── voix.md                     ← signature vocale ElevenLabs (universelle)
│
├── wex/                            ← idem pour Wex
│
├── theorie/                        ← Théorie sur l'humain
│   ├── README.md
│   ├── enneagramme/                ← comprendre les 9 persos (Chabreuil, situations, etc.)
│   └── pedagogie-enfance/          ← comprendre le lecteur Max (4-5 ans)
│
└── archive/                        ← anciens brainstorms / candidats / matrice
```

---

## Lectures par usage

| Tu cherches… | Va lire… |
|--------------|----------|
| Le casting V1 français | Le tableau ci-dessus + [`type-NN/README.md`](type-01/README.md) |
| Le caractère, geste signature, attitude d'un perso | [`type-NN/caractere.md`](type-01/caractere.md) |
| La voix ElevenLabs d'un perso | [`type-NN/voix.md`](type-01/voix.md) |
| La sensibilité différenciée d'un perso | [`type-NN/sensibilite.md`](type-01/sensibilite.md) |
| Comment 2 persos interagissent | [`type-NN/relations.md`](type-01/relations.md) ou [`theorie/enneagramme/interactions-9x9.md`](theorie/enneagramme/interactions-9x9.md) |
| Comprendre un ennéatype en profondeur | [`theorie/enneagramme/`](theorie/enneagramme/README.md) (Chabreuil, guide auteur) |
| Comprendre Max le lecteur (4-5 ans) | [`theorie/pedagogie-enfance/`](theorie/pedagogie-enfance/README.md) |
| Le prénom d'un perso dans une autre culture | [`../cross-culture/castings-nationaux/`](../cross-culture/castings-nationaux/INDEX.md) (FR figé, autres à construire) |
| Des prénoms candidats par culture | [`../cross-culture/prenoms/INDEX.md`](../cross-culture/prenoms/INDEX.md) (218 prénoms / 30 cultures) |

---

## Sensibilités différenciées (tranché 2026-04-29)

> **Règle structurelle** : chaque personnage perçoit ce que les autres ne perçoivent pas. C'est de la **sensibilité différenciée** — **pas du savoir caché**. Aucune hiérarchie « Wex sait, les autres ignorent ».
>
> Voir [`../pmo/decisions.md`](../pmo/decisions.md) (section *Sensibilité différenciée*) et [`../univers/fondements/sensibilites.md`](../univers/fondements/sensibilites.md).

| Perso | Type | Sensibilité | Statut |
|-------|------|-------------|--------|
| **Wex** | hors-système | À définir précisément — piste : écoute des fausses notes / lien soin-bioélectrique | 🟡 NARR-003 |
| Melki | T1 | Minéraux | ✅ figé |
| Mimi | T2 | Eau | ✅ figé |
| Dadou | T3 | Forces | ✅ figé |
| Madie | T4 | Fréquence | ✅ figé |
| Lulu | T5 | Quantique | ✅ figé |
| Pierrot | T6 | Animaux | ✅ figé |
| Raph | T7 | Cosmos | ✅ figé |
| Juju | T8 | Plantes | ✅ figé |
| Nono | T9 | Vibration collective | ✅ figé |

**Révélation progressive** : les sensibilités sont peu/pas présentes en début S1, affleurent en milieu/fin S1, sont **mises en avant en S2** (saison des visites — Wex chez chaque copain).

---

## Liens

- Pilier Univers : [`../univers/INDEX.md`](../univers/INDEX.md)
- Pilier Cross-culture : [`../cross-culture/INDEX.md`](../cross-culture/INDEX.md)
- Plan éditorial saisons : [`../saisons/INDEX.md`](../saisons/INDEX.md)
- Process d'écriture : [`../equipe/PROCESS.md`](../equipe/PROCESS.md)
- Index racine narration : [`../INDEX.md`](../INDEX.md)
