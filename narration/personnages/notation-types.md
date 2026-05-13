# Notation `TypeN` / `TitiN` × origine

> Convention d'écriture pour **référencer les personnages dans les textes narratifs, specs, histoires et orchestrations** sans figer un prénom.
> Permet d'écrire une histoire une fois, publiable en N versions cross-country (voir [prénoms-par-origine.md](prénoms-par-origine.md)).

---

## Règles

### 1. Deux formes équivalentes

| Forme | Usage | Exemple |
|-------|-------|---------|
| **`TypeN`** | Forme complète, textes formels, specs, fiches. | `Type4 s'éloigne du Cercle de Paix, le regard perdu.` |
| **`TitiN`** | Forme affectueuse/surnom, dialogues internes, notes rapides. | `Titi7 entraîne tout le monde dans une nouvelle aventure.` |

`N` = chiffre de l'ennéatype de 1 à 9.

### 2. Origine explicite (optionnelle)

Par défaut : **origine = "Christ"** (casting V1).

Quand on écrit pour une autre version, préciser entre parenthèses ou crochets :

```
Type4(Christ)        → Madeleine
Type4(Hébreu)        → David
Type4(Japonais)      → Miyu
Titi7(Christ)        → Raph
Titi7(Swahili)       → Furaha
```

Syntaxe alternative acceptée : `Type4@Christ`, `Titi7@Japonais`.

### 3. Wex = exception

**Wex ne suit pas la notation `TypeN`.** Il est hors-système (pas d'ennéatype pour le moment).
Dans les textes, on écrit directement **Wex**. Il reste identique dans toutes les versions cross-country.

---

## Pourquoi cette notation

- **Écrire une fois, publier N fois.** Le moteur de publication cross-country remplace `Type4(Christ)` par "Madeleine", `Type4(Japonais)` par "Miyu", etc.
- **Désambiguïse les discussions.** "Le type 4" est vague ("le *4*" ? "Madeleine" ? "la fiche n°4" ?) ; `Type4` ou `Titi4` est un identifiant net.
- **Protège l'univers.** On discute des comportements et des relations (liés au type), pas des prénoms qui ne sont que du cosmétique culturel.

---

## Mapping rapide (casting Christ par défaut)

> **Règle d'usage :** diminutif par défaut dans les textes (≈ 4/5 du temps). Prénom complet = moments formels, solennels, ou parole d'adulte nommant l'enfant.

| Notation | Prénom complet | **Diminutif (courant)** |
|----------|----------------|--------------------------|
| Type1 / Titi1 | Melchisédech | **Melki** |
| Type2 / Titi2 | Marie | **Mimi** |
| Type3 / Titi3 | David | **Dadou** |
| Type4 / Titi4 | Madeleine | **Madie** |
| Type5 / Titi5 | Luc | **Lulu** |
| Type6 / Titi6 | Pierre | **Pierrot** |
| Type7 / Titi7 | Raphaëlle | **Raph** |
| Type8 / Titi8 | Judith | **Juju** |
| Type9 / Titi9 | Noé | **Nono** |
| *(hors-système)* | **Wex** | Wex (pas de diminutif — jamais traduit) |

Pour les autres origines → [`../cross-culture/castings-nationaux/`](../cross-culture/castings-nationaux/INDEX.md) (FR figé ; jp/br/he/sw à construire) + catalogue prénoms qualifiés dans [`../cross-culture/prenoms/`](../cross-culture/prenoms/INDEX.md).

---

## À appliquer

- Nouvelles histoires / orchestrations : utiliser `TypeN` / `TitiN` dans les brouillons, résoudre à un prénom au moment de la publication.
- Fiches `personnages/type-NN/` : invariant (caractère, voix, sensibilité, relations). L'identité culturelle (prénom, prononciation) vit dans `cross-culture/castings-nationaux/<pays>/type-NN.md`.
- Specs de jeux : pas concerné (les mini-jeux n'utilisent pas les personnages de la narration pour l'instant).
