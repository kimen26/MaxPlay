# BUILD PLAN — Le Mur des Copains (document de reprise)

> **Pourquoi ce fichier** : si la session plante ou le contexte est compacté, repartir d'ICI.
> Plan vivant, mis à jour à chaque étape livrée. Dernière MAJ : 2026-07-20 (après Étape 1).

## 1. État livré

| Étape | Contenu | Commit |
|-------|---------|--------|
| Spec | **v0.6** — `studio/minijeux/docs/specs/2026-07-19-menu-mur-copains.md` (24 jeux, build par moteur, vagues) | `ca1d9b9f` |
| **Étape 1 ✅** | **Le Mur** : nouveau `site/index.html` + `site/js/mur.js` + `site/css/mur.css`. Ancien menu archivé `site/index-v2-archive.html` et réutilisé derrière le gate parents | `eb47e099` |
| Triage jeux | 41 commentaires PY intégrés — `studio/minijeux/pmo/audits/2026-07-19-triage-poc-design.md` §6-7 | `d85cd578` |

## 2. Décisions gravées (ne pas re-discuter)

- **Mur + copains** : Tritri hôte (Découverte 3 vignettes/jour + Préférés) · Roi T-Rex dinos · Spino compter · Galli lire · Vélo casse-têtes · Para couleurs&monde. Encyclo = portail spécial (Mur + repaire T-Rex).
- **Pas de voix/TTS dans les menus** avant GO « stable » de PY. Bulles texte seulement.
- Jeux non accessibles **cachés** + phrase « Obtiens ★★ sur … pour ouvrir un nouveau jeu ! ».
- Vignettes = **CSS/SVG animées, zéro génération d'images, zéro emoji en visuel principal**.
- Fontes : consignes script · apprentissage cursive (Cursif, `site/design-shared/fonts/`) · bi-alphabet dans le tri.
- **Build par MOTEUR** : durcir un moteur → décliner ses peaux (cf. `studio/minijeux/docs/MECANIQUES.md`).
- Critère de coupe : un jeu réussit = Max le relance seul dans la semaine.
- Supprimés (cachés partout) : mj-04, 05, 16, 25, 26, 29, 36, 41, 45, 11 · espace parents : mj-pose-tiles, max-adventure · refontes à venir (cachés en attendant) : mj-37, 38, 39.

## 3. Plan de build (ordre en cours)

> Attribution des IDs : mj-46+ (catalogue actuel max = mj-45). Spec détaillée de chaque jeu = spec §3-7.

### Vague V1 — moteur comptage QCM (`site/js/mj-compte.js`, référence : mj-04.html)
- [x] **mj-46 = S1 « Les œufs surprises »** (Spino 1) — LIVRÉ + câblé (repaire Spino #1, catalog). Pointage pastille + QCM combien + éclosion. Paliers N0 2-5 · N1 3-10 · N2 5-15. ⚠️ Écart spec : pas de regroupement par 5 au palier 3★ (golden 3 niveaux).
- [ ] **mj-48 = S3 « Tout le monde monte ! »** (Spino 3) — bus 2 fenêtres de 5, monte/descend, file ordinale. Paliers cf. spec.
- [ ] **P2 = mj-20 corrigé** (Para) — 1-2 pays ouverts à la fois, pas compter jusqu'à 10 direct (modif du jeu existant).

### Vague V1 — moteur dés/regroupement (`site/js/mj-dice.js`, référence : mj-43.html)
- [x] **mj-47 = S2 « Les constellations »** (Spino 2) — LIVRÉ + câblé (repaire Spino #2, catalog). Subitizing ombres dino (variante adoptée) + décomposition « 3 et 2, ça fait 5 ». Paliers N0 1-3 · N1 1-6 · N2 4-10.
- [ ] **mj-49 = S4 « Les barquettes de 10 »** (Spino 4) — barquette 5×2, 10+n, 3★ « remplis pour atteindre N » + célébration bocal.

### Vague V1 — moteur tri-bacs (référence : mj-09.html)
- [ ] **G2 « Le tri des lettres »** (Galli) — peau lettres du moteur mj-09 : cursives/scripts/majuscules, confusables b/d/h/j/k.
- [ ] **G1 « Trouve la lettre »** (Galli) — QCM-tap lettres, consigne = le SON.

### Vague 2 (ensuite)
G3 boîte à mots · G5 lis-et-fais · captcha traçage (après test tactile) · V1 intrus assets · V2 Raven (mj-14 → vraie entrée) · V4 dépôt (🐛 avancement) · T3 vétérinaire · T4 frise SVG · P3 géo test.

## 4. Process à chaque jeu (ne pas sauter d'étape)

1. Coder la page `site/mj-XX.html` avec **`mj-shell.js` + golden (3 niveaux via Stars.get)** — lire `studio/minijeux/docs/STANDARD-MJ.md` et `CONTRAT MJ v2` avant. Moteur existant d'abord (MECANIQUES.md).
2. Valider par screenshot Chrome headless : chemins **slashes forward** (`C:/...`), `--virtual-time-budget=3000`, screenshots dans `temp/`.
3. **Câblage (fait par l'agent principal, pas les sous-agents)** : ajouter le jeu au mapping du repaire dans `site/js/mur.js` + entrée dans `site/js/catalog.js` (pour l'accordéon parents + tracking).
4. Commit + push (autorisé par PY au fil du dev, message clair).

## 5. Pièges connus

- Screenshots headless : backslash devant `$var` bash mange l'expansion — toujours slashes forward.
- CSS : `padding`/`gap` en `%` dans une vignette se résolvent contre le parent — utiliser des px (documenté dans `mur.css`).
- mj-14 hors catalog.js → méta locale dans `mur.js` (pattern à réutiliser si besoin).
- Déblocage repaires = 2★ recalculé localement dans `mur.js` (pas `Unlock.isUnlocked` — ordres différents des catégories).
- Bugs à ne pas oublier : cloud.js non chargé sur 32 MJ (commentaires perdus) · avancement mj-34 cassé · images mj-27/41 · SVG continents mj-31 · galerie compressée mj-32.
- Sessions parallèles actives (dino, hooks) : ne commiter QUE ses propres fichiers, vérifier `git status` avant.

## 6. Pour reprendre après un crash

1. Lire CE fichier (état + plan).
2. Lire la spec §8 (vagues) et §3-7 (détail du jeu à faire).
3. `git log --oneline -5` pour voir où on en est.
4. Continuer la première case non cochée du §3.
