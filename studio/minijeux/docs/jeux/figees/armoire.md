# L'Armoire (accueil enfant) — cases à thème · DÉCISIONS FIGÉES

> ⚠️ FICHIER LOI (D-035). Toute ligne marquée 🔒 est NON NÉGOCIABLE.
> Seul Papa Yann peut défiger (décision datée explicite « je défige X »).
> Pourquoi : `memory/DECISIONS.md` D-025 (l'armoire) et D-035 (une case = un thème).
> Spec : [`docs/specs/2026-10-27-armoire-categories.md`](../../specs/2026-10-27-armoire-categories.md).

## 🔒 Une case = un thème (PY 2026-10-28)

- 🔒 Chaque case de l'armoire porte UN thème et UN objet. Le même objet n'apparaît jamais sur deux cases (PY 2026-10-28 : « les images eux sont forcément seul »).
- 🔒 Toucher une case ouvre DIRECTEMENT un jeu de ce thème, sans écran intermédiaire. Pas d'étagère de vignettes (PY 2026-10-28 : « il clique une case il y a un jeu du thème de l'image qui s'ouvre »).
- 🔒 Plusieurs jeux dans un thème : un s'ouvre au hasard, et « ça tourne » (PY 2026-10-28) — tour par tour mélangé, tous les jeux du thème passent avant qu'un revienne.
- 🔒 Dessin ouvre toujours le coloriage (mj-32), seul dans sa case (PY 2026-10-27 : « le dessin doit avoir une place direct et unique »).
- 🔒 Surprise est le SEUL hasard pur de l'armoire (PY 2026-10-27 : « on peut pas avoir du random total sur toutes les pages »).
- 🔒 Musique ouvre les chansons créées sur ElevenLabs (`musique.html`), en remplacement des jeux de pions supprimés (PY 2026-10-27/28).

## Les 12 cases (ordre de `MAXPLAY_ARMOIRE` dans `site/js/catalog.js`, puis armoire.js)

Haut : Dessin · Couleurs · Chiffres / Lettres · Dino · Puzzle. Bas : Grilles · Cherche · Pays / Musique · Histoires · Surprise.
Niche centrale inchangée : Dinos (encyclopédie) · Monde · Œufs.

Le classement de chaque jeu vit dans le champ `armoire` de `catalog.js` ; `check-mj-coherence` refuse un jeu sans case valide.

## Anti-régressions — NE JAMAIS FAIRE

- ❌ 🔒 Re-tirer les jeux au sort à l'ouverture de l'armoire, ou mélanger plusieurs thèmes dans une case (régime d'avant 2026-10-28, rejeté par PY).
- ❌ 🔒 Mettre en dur une liste de jeux dans `armoire.js` : la source est le champ `armoire` de `catalog.js` (PY 2026-10-28, D-035).

## Journal des décisions (append-only)

### 2026-10-28 — Figeage après validation Papa Yann
Classement en 9 thèmes + Musique, Histoires, Surprise validé ; geste tranché (ouverture directe, tour par tour) ; pions supprimés ; tiroir « encore » rendu au meuble (il n'a plus rien à retirer au sort).
