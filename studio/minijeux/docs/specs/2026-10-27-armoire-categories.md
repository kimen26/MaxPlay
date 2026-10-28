# L'armoire par catégories — une case = un thème, plus de tirage au sort

> Statut : **validée et livrée le 2026-10-28** (D-035, figée `docs/jeux/figees/armoire.md`).
> Amende D-025 point (3) (« tirés au hasard par objet à chaque ouverture »).

## Le problème constaté

Sur les 12 cases de l'armoire ([`site/js/armoire.js`](../../../../site/js/armoire.js) `buildSlots()`),
**9 tirent un jeu au hasard** à chaque ouverture et à chaque tiroir « encore ». Seules Radio,
Puzzle et Lis pointent toujours au même endroit. Conséquences :

- un jeu que Max aime n'est jamais au même endroit deux fois ;
- deux cases puisent dans le même tas (« Tritri » et « Vite ! » tirent toutes deux dans les
  casse-têtes), d'autres n'ont aucun lien avec leur objet (« Copain » = les couleurs) ;
- **le coloriage n'a pas de place** : il sort seulement si la case Volcan (1 chance sur 6) ou
  Surprise (1 sur 35) tombe dessus, soit environ une ouverture sur cinq.

## L'inventaire : 36 jeux actifs

Actif = présent dans [`site/js/catalog.js`](../../../../site/js/catalog.js), fichier présent dans
`site/`, aucun `retire`. Les 36 fichiers `mj-*.html` et les 36 entrées concordent. L'encyclopédie,
les histoires (`lecture.html`) et le prototype Dino-Mix (non déployé) ne sont pas comptés.

Pas de mesure d'usage : la table `progression` du cloud est vide de parties depuis le 2026-07-08,
on ne sait pas lesquels Max joue vraiment.

## Le classement proposé : 10 catégories, un seul critère

**Critère unique : ce que l'enfant FAIT dans le jeu**, pas l'habillage. Un jeu de bus où l'on
compte va dans Chiffres ; un jeu de dino où l'on trie des couleurs va dans Couleurs. Chaque jeu
est dans une seule catégorie.

| # | Case (étiquette) | Ce qu'on y fait | Jeux | Objet |
|---|---|---|---|---|
| 1 | **Dessin** | colorier | mj-32 coloriage | **à créer** (crayons + feuille) |
| 2 | **Couleurs** | trier, mélanger, assortir des couleurs | mj-09 trie les bus · mj-18 tubes · mj-21 peins les bus · mj-57 œufs surprise | **à créer** (pots de peinture) |
| 3 | **Chiffres** | compter, quantités | mj-13c combien avant · mj-35 graines · mj-46 œufs · mj-47 constellations · mj-48 tout le monde monte · mj-49 barquettes de 10 | `obj-chiffres` (existe) |
| 4 | **Lettres** | sons, lettres, mots, phrases | mj-06 lis la phrase · mj-50 trouve la lettre · mj-51 tri des lettres · mj-52 boîte à mots · mj-53 lis et fais | `obj-lettres` (existe) |
| 5 | **Dino** | reconnaître et connaître les dinos | mj-24 trouve le dino · mj-28 la lampe · mj-30 range par taille · mj-31 voyage du temps | `obj-dino` (existe, inutilisé ; le TODO le réservait à un futur écran dino, l'armoire passe avant) |
| 6 | **Puzzle** | placer ou faire glisser des pièces | mj-34 dépôt bloqué · mj-39 blocs magiques (mj-40 tangram supprimé le 2026-10-27, PY) | `obj-puzzle` (existe) |
| 7 | **Grilles** | remplir une grille par une règle | mj-14 cases mystères · mj-54 sudoku · mj-55 équilibre · mj-56 enclos · mj-59 territoires | **à créer** (petite grille en bois avec pions dino) |
| 8 | **Cherche** | observer, repérer | mj-13a premier bus · mj-15 l'intrus · mj-19 trouve le bus | **à créer** (loupe) |
| 9 | ~~**Pions**~~ | jeux de plateau | mj-37 croque-échecs · mj-38 saute-mouton · mj-42 shisima | Supprimés le 2026-10-28 (PY : « les pions tu supprimes », confirmé après que les tests ont montré mj-38 et mj-42 verts). La case devient **Musique**. |
| 10 | **Pays** | carte, drapeaux, langues | mj-20 compte en 8 langues · mj-22 trouve le pays | `obj-drapeaux` (existe) |

Total au 2026-10-28 : 1 + 4 + 6 + 5 + 4 + 2 + 5 + 3 + 2 = **32** (tangram et pions supprimés).

Les 2 dernières cases :

| # | Case | Cible | Objet |
|---|---|---|---|
| 11 | **Histoires** | `lecture.html` (fixe, comme aujourd'hui) | `obj-radio` |
| 11 bis | **Musique** (idée PY 2026-10-27, à la place de Pions) | un lecteur des musiques créées sur ElevenLabs | à décider : `obj-radio` passe à Musique, Histoires prend `obj-livre-ouvert` |
| 12 | **Surprise** | un jeu au hasard parmi les 36 — **le seul hasard de l'armoire**, et il le dit | `obj-meteorite` |

La niche centrale (Dinos · Monde · Œufs) ne change pas.

## Pourquoi 10 et pas moins

L'armoire a 12 cases (D-028, figé). Fusionner Puzzle, Grilles, Cherche et Pions en un seul
« Casse-têtes » ferait une case de 14 jeux et laisserait 3 cases vides ou tirées au sort : on
retomberait dans le problème. 10 catégories remplissent exactement le meuble, chacune entre 1 et
6 jeux.

## Les objets

- Gardés : chiffres, lettres, dino, puzzle, drapeaux, radio, météorite (7).
- À générer en un seul lot GPT, même style que les existants (référence passée à
  `gpt-gen.mjs --ref`) : **Dessin, Couleurs, Grilles, Cherche, Pions** (5). Dessin sans aucune
  lettre ni chiffre pour ne pas se confondre avec Lettres (qui porte déjà des crayons).
- Plus utilisés sur l'armoire : bus, volcan, peluche-tri, peluche-stego, réveil, livre-ouvert
  (restent sur le disque).

## Le geste au toucher (tranché par PY le 2026-10-28 : ouverture directe, le jeu tourne dans la case)

- **Dessin** : le coloriage s'ouvre **directement**, un seul jeu, aucun écran intermédiaire.
- **Les autres** : recommandation, une petite étagère s'ouvre avec les vignettes de la
  catégorie (déjà présentes dans `catalog.js`), **toujours dans le même ordre** ; Max choisit.
  Alternative : le toucher lance directement le jeu suivant de la catégorie (un geste de moins,
  mais Max ne choisit pas).

## Étapes suivantes

1. Validation du classement et du geste (cette fiche).
2. Génération des 5 objets, planche de contrôle à valider.
3. `catalog.js` : un champ de catégorie d'armoire par jeu (source unique, rien en dur dans
   `armoire.js`) ; `armoire.js` : 12 cases fixes, l'étagère, plus de tirage hors Surprise ;
   le tiroir « encore » perd sa raison d'être (à réaffecter).
4. Recette à 360 et 320 px, puis D-034 qui amende D-025.
