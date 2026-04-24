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
Type4(Christ)        → Jérémie
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

- **Écrire une fois, publier N fois.** Le moteur de publication cross-country remplace `Type4(Christ)` par "Jérémie", `Type4(Japonais)` par "Miyu", etc.
- **Désambiguïse les discussions.** "Le type 4" est vague ("le *4*" ? "Jérémie" ? "la fiche n°4" ?) ; `Type4` ou `Titi4` est un identifiant net.
- **Protège l'univers.** On discute des comportements et des relations (liés au type), pas des prénoms qui ne sont que du cosmétique culturel.

---

## Mapping rapide (casting Christ par défaut)

| Notation | Prénom V1 (Christ) |
|----------|--------------------|
| Type1 / Titi1 | Melki |
| Type2 / Titi2 | Marie |
| Type3 / Titi3 | Paul |
| Type4 / Titi4 | Jérémie |
| Type5 / Titi5 | Luc |
| Type6 / Titi6 | Pierre |
| Type7 / Titi7 | Raph |
| Type8 / Titi8 | Judith |
| Type9 / Titi9 | Noé |
| *(hors-système)* | **Wex** (héros universel, pas de type) |

Pour les autres origines → [prénoms-par-origine.md](prénoms-par-origine.md).

---

## À appliquer

- Nouvelles histoires / orchestrations : utiliser `TypeN` / `TitiN` dans les brouillons, résoudre à un prénom au moment de la publication.
- Fiches `Eneagramme/personnages/type-XX-*.md` : header canonique = notation ; le prénom par casting est une donnée de surface.
- Specs de jeux : pas concerné (les mini-jeux n'utilisent pas les personnages de la narration pour l'instant).
