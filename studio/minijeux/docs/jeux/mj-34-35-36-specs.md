# Specs MJ-34 · MJ-35 · MJ-36 — trio "mécaniques addictives" (nuit 2026-07-06)

> Issus de la [méga-synthèse](../research/SYNTHESE-JEUX-ADDICTIFS.md) (2 audits croisés).
> Cadrage amendé par **game-conseiller** (verdicts GO×2 + NO-GO duel → GO solo). Codés dans la nuit du 6 juillet, **à valider par Papa Yann au réveil**.

---

## MJ-34 — Le dépôt bloqué 🚧 (Rush Hour bus)

- **Source** : Rush Hour / Hua Rong Dao (Chine) / Parking Jam. Convergence top-3 des 2 audits.
- **Thème** : BUS. Le bus de Max est coincé dans le dépôt, les autres bus bloquent la sortie.
- **Catégorie** : 🧩 Logique · **paysage** · maxStars 3.
- **Mécanique** : grille **4×4 (★), 5×5 (★★/★★★)** — jamais 6×6 (trop dur à 4 ans, verdict conseiller). Bus horizontaux glissent ↔, verticaux ↕ (**drag contraint sur l'axe**, snap case par case). Le bus de Max (jaune, avec yeux) est **toujours horizontal sur la ligne de sortie, sortie à droite** (invariant visuel). Il sort → victoire.
- **Niveaux** : précalculés en dur, **solvabilité vérifiée par solveur BFS** avant push. ★ 2-3 coups · ★★ 3-4 coups · ★★★ 5-6 coups.
- **Zéro pénalité** : bus bloqué = bounce doux, aucun son négatif. **Pas de compteur de coups visible.**
- **Pédagogie** : planification spatiale, anticipation séquentielle.
- **Sons** : sndTschh (glisse), sndKlaxon+sndVictory (sortie), sndPorte (niveau suivant).

## MJ-35 — Le jeu des graines 🌱 (semailles mancala SOLO)

- **Source** : famille mancala (Kalah/Awalé/Congkak/Pallanguzhi — Afrique/Asie). Podium des 2 audits.
- **⚠️ Décision conseiller** : le **Kalah duel vs IA est NO-GO à 4 ans** (sens anti-horaire abstrait, adversaire = pleurs, méta-règles opaques). Version codée = **semailles SOLO pédagogiques**, zéro adversaire. Le Kalah authentique 2 joueurs reste au backlog "6-7 ans". **← seul arbitrage produit ouvert pour Papa Yann.**
- **Thème** : ORIGINE gardée (graines, bois, calebasse) — pas de skin bus forcé.
- **Catégorie** : 🔢 Compter · **paysage** · maxStars 3.
- **Mécanique** : 1 rangée de 6 trous + 1 grenier à droite. Tap sur un trou → les graines sautent **une par une** vers la droite avec **comptage vocal/visuel** ("1… 2… 3 !"), la dernière dans le grenier si le compte tombe juste. Le sens du semis est rendu lisible par l'ANIMATION (flèche + illumination en séquence), jamais par du texte.
- **Objectif doux (coopératif, pas de défaite)** : amener toutes les graines au grenier. Choisir le bon trou = celui dont le compte atteint pile le grenier → graines encaissées ; sinon elles se redistribuent (rien n'est perdu, bounce doux).
- **3★** : ★ 6 graines au grenier · ★★ 12 · ★★★ défi "gros semis" (compter au-delà de 10 — sweet spot Max).
- **Pédagogie** : comptage un-à-un, anticipation numérique (quel trou atteint pile le grenier = pré-addition).
- **Sons** : sndCount (chaque graine), sndDing (grenier), sndBravo/sndVictory (palier).

## MJ-36 — Arrête le bus ! 🛑 (timing)

- **Source** : Stack / Color Switch / idée n°2 audit A. Famille timing pur.
- **Thème** : BUS — l'arrêt de bus EST le jeu (poteau design validé `design_bus_stop`).
- **Catégorie** : 👀 Observer & vite · **paysage** · maxStars 3.
- **Mécanique** : route horizontale, bus (busSVG, ligne aléatoire de LIGNES) roule gauche→droite, passagers attendent à l'arrêt à droite. **Tap n'importe où = frein** (zone tap = écran entier) → décélération douce → immobilisation. Dans la zone cible = les passagers montent + fanfare.
- **Tolérance généreuse (clé anti-frustration)** : zone ★ ≈ 40 % de la largeur d'arrêt, se resserre ensuite mais **jamais < 1 pare-chocs**. **Raté = JAMAIS Game Over** : le bus dépasse, fait demi-tour en marche arrière avec un "bip bip" rigolo et re-passe. Rien n'est perdu.
- **Bonus non punitif** : arrêt "pile au milieu" = sparkle + étoile qui brille (rater le pile-poil ≠ échec).
- **3★** : ★ 3 arrêts zone large · ★★ 3 arrêts zone moyenne · ★★★ 3 "pile" (pas un streak anxiogène : ça ne se remet pas à zéro méchamment, juste "encore 2 !"). Vitesse +légère par palier.
- **Pédagogie** : contrôle inhibiteur (attendre le bon moment), estimation spatio-temporelle.
- **Sons** : sndMoteur (roulage), sndTschh (frein), sndPorte+sndVictory (montée passagers), sndKlaxon rigolo (demi-tour).

---

## Règle transverse (leçon conseiller à graver par game-pmo à la clôture)

**"Timing / duel / puzzle → toujours neutraliser l'échec binaire natif"** : bus bloqué = bounce, semis raté = redistribution, arrêt manqué = demi-tour rigolo. Aucun des 3 ne doit avoir de son négatif ni d'état "perdu".
