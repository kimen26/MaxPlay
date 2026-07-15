# MaxPlay — Catégories & paliers de difficulté (spec rollout)

> Spec validée avec Papa Yann (2026-06-01). Sert de référence pour :
> 1. la **réorganisation du menu par catégories** (coque),
> 2. le **rollout du contrat de difficulté** sur chaque mini-jeu.
>
> ⚠️ **maxStars = 3 depuis 2026-07-14** (règle figée changée 5→3, décision Papa Yann « tout le monde en 3 étoiles » — voir [`pmo/INVARIANTS.md`](../../pmo/INVARIANTS.md) + figées datées). Les mentions « 5 paliers » ci-dessous sont **historiques**, le contrat de progression reste valide, seul le plafond passe à 3.
>
> **Contrat (rappel)** : Niveau = étoiles + 1 · une manche à 100% (sans révélation) → +1★ → le niveau monte · **maxStars = 3** (ex-5, voir note ci-dessus) · le 1ᵉʳ jeu de chaque catégorie est ouvert, les suivants se débloquent à **2★** sur le précédent · indice de méthode à l'erreur, jamais la réponse · **manche mixte = 8 questions : 4 au niveau courant + 4 tirées au hasard sur les niveaux inférieurs** (mélangées ; niveau 1 → 8 faciles ; l'étoile exige de réussir les 4 dures).
>
> **Règle d'or paliers** : **Niveau 1 = ultra-simple** (point d'entrée évident pour 3,5 ans), puis on monte doucement. Ce qui scale : **nombres · vocabulaire · densité · vitesse · proximité des distracteurs · nb de critères**.

---

## Catégories du menu

| Catégorie | Jeux (ordre de la chaîne) |
|-----------|---------------------------|
| 🔢 **Compter** | mj-04 · mj-13c · mj-05 |
| 🎨 **Couleurs** | mj-01 · mj-09 · mj-21 · mj-18 |
| 📖 **Lire** | mj-06 · mj-13b |
| 🧩 **Logique** | mj-13a · mj-15 · mj-16 · mj-14 |
| 👀 **Observer & vite** | mj-08 · mj-17 · mj-19 |
| 🌍 **Le monde & langues** | mj-11 · mj-22 · mj-20 |
| 🎮 **En libre** (hors paliers) | mj-12 · max-adventure · mj-pose-tiles |
| 🦕 **Dinos** (code) | encyclopédie |

---

## 🔢 Compter

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-04** Compte les passagers | nb passagers | 2–5 | 4–8 | 6–12 | 9–16 | 13–22 |
| **mj-13c** Combien avant ? | taille file / position | file 3 | file 4–5 | file 6 | file 7–8, n° proches | file 9–10, distracteurs serrés |
| **mj-05** La bonne place | opération | places libres (6–10) | + monter (≤20) | + descendre | combos monter+descendre | combos grands nombres (≤30) |

## 🎨 Couleurs

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-01** Quiz Bus | type de question | couleur, 2–3 choix | couleur, 4 choix | + numéro | + écoute (audio) | mix complet |
| **mj-09** Trie les bus | nb familles + bus | 2 familles, 4 bus | 3 familles | 4 familles | 5 familles, +bus | 6 familles, nuances proches |
| **mj-21** Peins les bus | recette couleur | primaires pures (R/J/B) | mélanges 2 (vert/orange/violet) | + blanc (rose/ciel) | doses multiples (or, brun) | recettes complexes (lavande…) |
| **mj-18** Tubes de couleurs | nb couleurs + tubes | 2 couleurs | 3 | 4 | 5 (+1 tube vide) | 6 couleurs |

## 📖 Lire

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-06** Lis la phrase | longueur / rareté du mot | mot court (bus, Max) | mots familiers | phrase plus longue | mot moins fréquent | 2 mots à choisir |
| **mj-13b** Monte dans le bus | nb bus + proximité n° | 3 bus, n° distincts | 4 bus | 6 bus | 8 bus, n° proches | 10+ bus, n° très proches |

## 🧩 Logique

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-13a** Le premier bus | nb bus + écart horaire | 2 bus, écart net | 3 bus | 4 bus | 5 bus, écarts serrés | 6 bus, minutes proches |
| **mj-15** L'intrus | critère | couleur (évident) | taille | parité du numéro | 2 critères mêlés | critère subtil + plus d'items |
| **mj-16** Complète la suite | type de motif | couleur ABAB | taille croissante | motif ABC | suite numérique (+2) | motifs combinés |
| **mj-14** La grille (Raven) | taille + attributs | 2×2, 1 attribut | 2×3 | 3×3 | 3×3 + 2 attributs | 3×3 + 3 attributs |

## 👀 Observer & vite

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-08** Au centre bus | nb bus à ranger | 3 bus | 4 | 5 | 6, places proches | 8 bus |
| **mj-17** Le garage | nb pannes + patience | 1 panne, patience longue | 1–2 pannes | 2 pannes | + outils proches, patience moyenne | 2 pannes, patience courte |
| **mj-19** Trouve le bus | nb bus + vitesse | **10–12 bus, lents (~20 px/s)** | 15 bus | 20–25, + rapides | 30–40 | 50+, rapides *(l'actuel)* |

## 🌍 Le monde & langues

| Jeu | Axe | N1 | N2 | N3 | N4 | N5 |
|-----|-----|----|----|----|----|----|
| **mj-11** Quel pays ? | nb choix + proximité | 3 pays connus (FR/ES/BR) | 4 choix | pays moins connus | drapeaux proches (NL/LU) | 6 choix, drapeaux similaires |
| **mj-22** Trouve le pays (Europe) | nb pays + taille | 5 grands pays | 10 | 15 | 20 (petits pays) | 25, tous |
| **mj-20** Compte en 8 langues | plage + langues | 1–5, FR/ES | 1–10 | 1–15, +EN/PT | 1–20, +JP/AR | toutes langues mêlées |

---

## Hors paliers

- **🎮 En libre** : mj-12 (sons — exploration), max-adventure (bac à sable), mj-pose-tiles (construction) → toujours ouverts, pas d'étoiles.
- **🦕 Dinos** : ouverts par code (`TRITRI`) — déblocage parent/futur payant.

---

## Notes d'implémentation (rollout)

- `catalog.js` : ajouter un champ **`category`** par jeu + passer **`maxStars: 5`** sur tous les jeux à paliers.
- Chaque jeu charge `catalog.js` + `stars.js` (2 lignes), lit `niveau = Stars.get(id)+1`, configure ses paramètres selon le tableau ci-dessus.
- mj-05, mj-15, mj-16, mj-19 ont déjà une structure de rounds/level → adaptation plus rapide.
- mj-19, mj-15, mj-17 utilisent `SpeechSynthesisUtterance` **sans garde** → corriger (cf. `tts.js`) pendant le refacto (bug WebKit).
- Audio TTS : annoncer le niveau ? (optionnel, à voir avec Papa Yann).

_Spec rédigée 2026-06-01. À valider par Papa Yann avant rollout._
