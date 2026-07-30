# Spec — Pack « DinoJeux » 6 jeux de logique (reçue PY 2026-07-31, « exécute ça »)

> Source : spec externe (copain LLM) transmise par Papa Yann. **Statut : GO PY.**
> Ce fichier grave la spec source (résumé fidèle) + les **ADAPTATIONS MaxPlay
> OBLIGATOIRES** (la spec vient d'un contexte hors-MaxPlay ; nos règles figées
> priment partout où elles contredisent la source).

## Adaptations MaxPlay (non négociables, priment sur la source)

| Point de la spec source | Adaptation MaxPlay | Pourquoi |
|---|---|---|
| « Bravo Max ! » parlé/écrit | ❌ INTERDIT — « Bravo ! » neutre / pseudo dynamique | Règle figée : JAMAIS Max dans le produit (2026-07-19) |
| App standalone React + Canvas, accueil 6 cartes, PWA à part | Mini-jeux **mj-54..mj-59** HTML vanilla + `mj-shell` intégrés à LA VALLÉE | 1 plateforme, gabarit CONTRAT v2, pas de 2e app |
| Sons WebAudio synthèse, zéro asset | Banque `sounds/` existante + MaxFX (célébrations bibliothèque) | CONTRAT v2 : jamais d'anim/son maison |
| Gamification propre (étoiles/streak/badges/puzzle du jour) | Systèmes EXISTANTS : étoiles (sans-faute), œufs/accessoires (NID v4), séquence 2★ | Une seule économie, arbitrée PY |
| Ordre de déblocage §7 | = ordre dans la chaîne du copain porteur (séquence 2★) | Mécanique existante identique |
| « Espace Parents » à créer | Existe déjà (gate + suivi/compte) | — |
| Verrou adulte 3 s + calcul | Existe déjà (gate) | — |
| Difficulté adaptative silencieuse | Niveaux par étoiles (min(2, Stars)) — l'adaptatif EP-112 reste pilote mj-04 | Décision PY 2026-07-28 |
| Emoji dinos 🦖 comme sprites | OK pour pièces de plateau (pas de règle bus ici), avatars/ombres existants quand pertinent | assets réutilisés |

Principes source CONSERVÉS (alignés avec nos règles) : zéro texte en jeu (démo
montrée), pas de « perdu », pas de chrono par défaut, zones ≥ 64 px (nous : 80),
un seul geste par jeu, feedback immédiat, sortie visible.

## Les 6 jeux (moteur + curseur — détail complet dans la source PY)

| id | Jeu | Pattern | Geste | Niveaux (étoiles 0/1/2+) |
|---|---|---|---|---|
| mj-54 | 🥚 Sudoku Dino | sudoku 4×4 symboles (🦕🦖🥚🌋) | tap case → tap symbole | 8 indices → 5-6 indices → 6×6 (2×3) |
| mj-55 | ⚖️ Équilibre | Takuzu/Binairo 🦕🥚 | tap cycle 3 états | ligne seule « pas 3 pareils » → 4×4 règle des 3 → + équilibre 2/2 |
| mj-56 | 🦕 Les Enclos | Queens/N-reines + zones | tap pose/retire | 4×4 quadrants → 5×5 zones → 6×6 |
| mj-57 | 🎨 Œufs Surprise | SameGame/Chain Shot | tap groupe ≥2 | 6×6 3 couleurs → 8×8 4 → 8×8 4 + objectif dorés |
| mj-58 | 🏃 Dino Run | runner vue latérale + saut variable | tap court/long | lent, cactus simples → +doubles → +ptéro (ne PAS sauter) |
| mj-59 | 🟦 Territoires | Shikaku rectangles | drag rectangle | niveau 0 passerelle (1 pierre 3×3) → 5×5 → 6×6 |

Règles moteur clés (source, conservées) :
- **mj-54** : générateur = solution canonique + permutations (bandes/piles/symboles), retrait de cases avec unicité (backtracking 4×4). Conflit = 2 cases tremblent orange, jamais bloquant.
- **mj-55** : contraintes « jamais 3 identiques adjacents » + « 2/2 par ligne/colonne » (niveau 2+). Trio en conflit surligné orange tant qu'il existe.
- **mj-56** : 1 dino par ligne/colonne/zone, jamais adjacents (diagonales incluses). Pose = cases « attaquées » illuminées rouge doux (le feedback EST le teaching). Générateur : solution N-reines puis zones par croissance autour de chaque reine.
- **mj-57** : flood-fill groupes, gravité verticale + compactage horizontal, score en bébés 🐣 (jamais de chiffre-score), fin naturelle quand plus de groupe ≥2 (jamais de défaite). Pré-illumination du groupe au toucher.
- **mj-58** : canvas emoji, gravité ~0.6, maintien = gravité ÷2 (saut variable), collision AABB à 70 % (indulgence), trébuche = « Encore ? » jamais GAME OVER, distance en jalons illustrés (pas de chiffres). Accélération douce PLAFONNÉE (pas de stress chrono — refus Tetris PY respecté).
- **mj-59** : drag → rectangle prévisualisé avec compteur live ; valide si 1 pierre ∧ aire = valeur ∧ pas de chevauchement ; invalide = s'efface doucement. Générateur = partition récursive en rectangles (toujours soluble).

## Placement dans la vallée

- **Troudi (casse-têtes)** : mj-54, mj-55, mj-56, mj-59 (ordre = déblocage source : sudoku → équilibre → enclos → territoires).
- **Hôte dino** : mj-57 (Œufs Surprise, thème œufs/bébés dinos) et mj-58 (Dino Run — la récompense fun du pack).

## Check-list de test (source, conservée)

Lance chaque jeu sans aide · règle comprise en <2 parties sans parole · aucun
écran « perdu » · session 3 jeux < 10 min · harnais Playwright vert par jeu.

---
_Créé 2026-07-31. Direction PY du jour : pause onboarding/mj-coach — on fait
d'autres jeux et on challenge les existants ; système œufs/récompenses validé._
