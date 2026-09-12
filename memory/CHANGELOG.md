# CHANGELOG — ce qui est sorti

> Exutoire, pas un journal : rempli en vidant `TODO.md` à la release. Une ligne = ce que
> Max ou le parent voit de plus. Reconstruit depuis `git log --oneline --since=2026-03-01
> | grep -E "^[0-9a-f]+ feat"`, regroupé par mois.

## v0.3 — 2026-03

Premiers mini-jeux bus (arrêt de bus, variantes de layout), premiers dinos (assets PNG libres), sandbox graphique et manette explorés.

## v0.4 — 2026-04

Univers narratif démarré (Story OS), bibliothèque de prompts writers, le jeu annonce le nom du mini-jeu à voix haute en y entrant, MCP llm-copains (Grok + Kimi) branché en coulisse.

## v0.5 — 2026-05

Encyclopédie dino enrichie (cartes réelles Europe, fiches plus grandes et lisibles), premières voix audio dino (émotion, récap), contrat commun aux mini-jeux (gabarit + bibliothèque partagée).

## v0.6 — 2026-06

Dinos avec vidéos en mouvement sur leurs fiches, images retravaillées (paléoart, poids allégé), premier pack Lunii (« Pierre et le loup »), épisodes Voyage dans le temps en vraie voix.

## v0.7 — 2026-07

Refonte du menu en « Mur des Copains » (accueil = scène vivante avec 5 personnages animés), Nid des œufs (collection, éclosion, chambre des œufs), 6 nouveaux jeux de logique dino (Sudoku Dino, Équilibre, Les Enclos, Œufs Surprise, Dino Run, Territoires), passage à 3 niveaux d'étoiles partout, tri qualité du catalogue (31 jeux au menu enfant), encyclopédie dino design v3, cartes du monde réelles pour les familles de dinos, 70 dinos complets.

## v0.8 — 2026-08

Premiers pas multilingue (noms de dinos doublés en 12 langues, plomberie i18n de l'audio), consignes vocales enregistrées, bascule de backend possible entre Claude et Kimi Code pour le bot.

## v0.9 — 2026-09 (en cours)

Interface et menu de l'encyclopédie dino traduits (anglais, espagnol, portugais du Brésil), 71e dino (Scelidosaure).

Refonte GED (2026-09-12, HO-R00 à HO-R99) — ce que le parent et Max voient de plus :
- L'application s'ouvre **hors ligne** : le menu et les jeux déjà visités se chargent sans réseau (service worker, page de secours).
- **9 jeux qui existaient mais n'apparaissaient pas au Mur** sont de retour (36 jeux visibles) ; un jeu supprimé ne peut plus y rester par oubli.
- Les fiches dino se chargent **plus vite** : images en webp (−75 Mo), sons tiers sous droits retirés et remplacés par des sons libres.
- Le repo se clone en 2,65 Go au lieu de 3,82 (historique réécrit, archives sorties dans un vault) ; une commande construit (`npm run build`), une vérifie (`npm run check`, bloquante en CI), une teste (`npm test`), une liste ce qui doit sortir (`npm run gc`).
- Chaque dino a une **fiche canon** unique (`studio/dino/content/dinos/<id>.json`) dont tout le reste dérive ; un contrôle signale les chiffres du texte narré qui divergent.
- Packs Lunii reconstruits par un seul moteur ; mémoire des pôles jeu et dino remise à plat (leçons archivées, rien de perdu).

