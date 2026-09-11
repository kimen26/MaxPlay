# MaxPlay — Catégories & paliers de difficulté (spec rollout)

> ⚠️ **SNAPSHOT 2026-06-01** : les catégories ci-dessous (Compter / Lire / Observer & vite…) sont remplacées par le menu v2 — source vivante [`site/js/catalog.js`](../../../../site/js/catalog.js). Purge 2026-08-10 : mj-01, mj-04, mj-05, mj-08, mj-11, mj-12, mj-13b, mj-16, mj-17 (+ d'autres, voir `memory/archive/backlog-fermes-2026.md`) **n'existent plus**.
> 🧹 **Purge refs jeux morts 2026-09-12** (HO-R01) : les lignes de jeux supprimés ont été retirées des tableaux ci-dessous (leurs paliers restaient une simple matière de design, non codée). Ne conservent que les jeux vivants au sens de `catalog.js`.
>
> Spec validée avec Papa Yann (2026-06-01). Sert de référence pour :
> 1. la **réorganisation du menu par catégories** (coque),
> 2. le **rollout du contrat de difficulté** sur chaque mini-jeu.
>
> ⚠️ **maxStars = 3 depuis 2026-07-14** (règle figée changée 5→3, décision Papa Yann « tout le monde en 3 étoiles » — voir [`memory/INVARIANTS.md`](../../memory/INVARIANTS.md) + figées datées). Les mentions « 5 paliers » ci-dessous sont **historiques**, le contrat de progression reste valide, seul le plafond passe à 3.
>
> **Contrat (rappel)** : Niveau = étoiles + 1 · une manche à 100% (sans révélation) → +1★ → le niveau monte · **maxStars = 3** (ex-5, voir note ci-dessus) · le 1ᵉʳ jeu de chaque catégorie est ouvert, les suivants se débloquent à **2★** sur le précédent · indice de méthode à l'erreur, jamais la réponse · **manche mixte = 8 questions : 4 au niveau courant + 4 tirées au hasard sur les niveaux inférieurs** (mélangées ; niveau 1 → 8 faciles ; l'étoile exige de réussir les 4 dures).
>
> **Règle d'or paliers** : **Niveau 1 = ultra-simple** (point d'entrée évident pour 3,5 ans), puis on monte doucement. Ce qui scale : **nombres · vocabulaire · densité · vitesse · proximité des distracteurs · nb de critères**.

---

## Catégories du menu

| Catégorie | Jeux (ordre de la chaîne) |
|-----------|---------------------------|
| 🔢 **Compter** | mj-13c |
| 🎨 **Couleurs** | mj-09 · mj-21 · mj-18 |
| 📖 **Lire** | mj-06 |
| 🧩 **Logique** | mj-13a · mj-15 · mj-14 |
| 👀 **Observer & vite** | mj-19 |
| 🌍 **Le monde & langues** | mj-22 · mj-20 |
| 🦕 **Dinos** (code) | encyclopédie |

---

## 🔢 Compter

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-13c** Combien avant ? | taille file / position | file 3 | file 4–5 | file 6 | file 7–8, n° proches | file 9–10, distracteurs serrés |

## 🎨 Couleurs

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-09** Trie les bus | nb familles + bus | 2 familles, 4 bus | 3 familles | 4 familles | 5 familles, +bus | 6 familles, nuances proches |
| **mj-21** Peins les bus | recette couleur | primaires pures (R/J/B) | mélanges 2 (vert/orange/violet) | + blanc (rose/ciel) | doses multiples (or, brun) | recettes complexes (lavande…) |
| **mj-18** Tubes de couleurs | nb couleurs + tubes | 2 couleurs | 3 | 4 | 5 (+1 tube vide) | 6 couleurs |

## 📖 Lire

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-06** Lis la phrase | longueur / rareté du mot | mot court (bus, Max) | mots familiers | phrase plus longue | mot moins fréquent | 2 mots à choisir |

## 🧩 Logique

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-13a** Le premier bus | nb bus + écart horaire | 2 bus, écart net | 3 bus | 4 bus | 5 bus, écarts serrés | 6 bus, minutes proches |
| **mj-15** L'intrus | critère | couleur (évident) | taille | parité du numéro | 2 critères mêlés | critère subtil + plus d'items |
| **mj-14** La grille (Raven) | taille + attributs | 2×2, 1 attribut | 2×3 | 3×3 | 3×3 + 2 attributs | 3×3 + 3 attributs |

## 👀 Observer & vite

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-19** Trouve le bus | nb bus + vitesse | **10–12 bus, lents (~20 px/s)** | 15 bus | 20–25, + rapides | 30–40 | 50+, rapides *(l'actuel)* |

## 🌍 Le monde & langues

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-22** Trouve le pays (Europe) | nb pays + taille | 5 grands pays | 10 | 15 | 20 (petits pays) | 25, tous |
| **mj-20** Compte en 8 langues | plage + langues | 1–5, FR/ES | 1–10 | 1–15, +EN/PT | 1–20, +JP/AR | toutes langues mêlées |

---

## Hors paliers

- **🦕 Dinos** : ouverts par code (`TRITRI`) — déblocage parent/futur payant.

---

## Notes d'implémentation (rollout)

- `catalog.js` : ajouter un champ **`category`** par jeu + passer **`maxStars: 5`** sur tous les jeux à paliers.
- Chaque jeu charge `catalog.js` + `stars.js` (2 lignes), lit `niveau = Stars.get(id)+1`, configure ses paramètres selon le tableau ci-dessus.
- mj-15, mj-19 ont déjà une structure de rounds/level → adaptation plus rapide.
- mj-19, mj-15 utilisent `SpeechSynthesisUtterance` **sans garde** → corriger (cf. `tts.js`) pendant le refacto (bug WebKit).
- Audio TTS : annoncer le niveau ? (optionnel, à voir avec Papa Yann).

_Spec rédigée 2026-06-01. À valider par Papa Yann avant rollout._
