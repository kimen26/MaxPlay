# Histoires — Convention d'organisation

> Une histoire = un dossier, jamais un fichier seul. Pour scaler à 100+ récits avec variantes par culture, versions, comités de lecture.

---

## Structure d'un dossier histoire

```
NNN-titre-en-kebab-case/
├── meta.yaml                       ← métadonnées exploitables (catalogues regenérables)
├── texte.md                        ← version vivante (la dernière en date)
├── comite-lecture.md               ← retours empilés par session
├── archives/
│   ├── v1-YYYY-MM-DD.md            ← snapshots figés des versions précédentes
│   └── v2-YYYY-MM-DD.md
└── variantes-culturelles/
    ├── jp.md                       ← patches culturels (diff seulement)
    ├── ng.md
    └── br.md
```

**ID croissant à 3 chiffres** (`001`, `002`, …) = ordre d'écriture, immuable. Le slug peut changer, l'ID non.

---

## Ajouter une histoire

1. **Sélectionner un axe mûr** depuis [axes-histoires-en-stock.md](axes-histoires-en-stock.md) (check-list validée)
2. **Copier le gabarit** : `cp -r _gabarit/ NNN-titre-kebab/` (NNN = prochain numéro libre)
3. **Remplir** `meta.yaml` puis `texte.md`
4. **Ajouter une ligne** dans le catalogue de [INDEX.md](INDEX.md)
5. **Faire évoluer le statut** : `brouillon` → `V1` → `V1-comite-lu` → `V2` → `valide`

---

## Versionnage

- `texte.md` = version vivante. On l'édite.
- Quand une V passe en comité ou est figée → snapshot dans `archives/vN-YYYY-MM-DD.md`.
- Le snapshot est en lecture seule (par convention — git protège l'historique).

---

## Variantes culturelles

Les variantes sont des **patches**, pas des réécritures complètes. Un fichier `variantes-culturelles/{culture}.md` ne contient que :

- Lieu équivalent local (ex : pont au-dessus du ruisseau → pont du Sumida en JP)
- Prénoms locaux (Wex/Melki/Juju → équivalents culturels respectant la sonorité)
- Références culturelles ajustées (essence du bois, voisin âgé, métier ancien)
- **Pas** de réécriture du texte. Le squelette narratif reste celui de `texte.md`.

---

## Métadonnées (`meta.yaml`)

Source de vérité pour les catalogues transversaux regenérables :

- `histoires/par-personnage.md` (toutes les histoires où Wex apparaît)
- `histoires/par-ennéatype.md` (toutes les histoires avec un Type 1)
- `histoires/par-theme.md`, `par-morale.md`, `par-culture.md`

Ces catalogues seront générés (à terme) par l'agent `narration-archiviste` (Phase 2 du roadmap).

Voir [_gabarit/meta.yaml](_gabarit/meta.yaml) pour les champs disponibles.

---

## Règles d'écriture (rappels — voir [INDEX.md](INDEX.md))

- **Notation personnages :** `TypeN` / `TitiN` × origine. Wex toujours hors-système.
- **Univers IMPLICITE par défaut.** Pas de noms-concepts dans le texte.
- **Ennéatypes DILUÉS** dans les comportements, jamais étiquetés.
- **Kishōtenketsu privilégié** (sans antagoniste).
- **POV enfant né après l'Éveil** — rien ne l'étonne.
- **Pas de moralisme.**
- **Âge cible :** 3.5–4 ans.
