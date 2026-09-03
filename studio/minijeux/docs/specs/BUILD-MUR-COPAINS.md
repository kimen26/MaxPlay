# BUILD PLAN — Le Mur des Copains (document de reprise)

> **Pourquoi ce fichier** : si la session plante ou le contexte est compacté, repartir d'ICI.
> Plan vivant, mis à jour à chaque étape livrée. Dernière MAJ : 2026-07-20 soir (V1 COMPLÈTE + vague 2 partielle).

## 1. État livré

| Étape | Contenu | Commit |
|-------|---------|--------|
| Spec | **v0.6** — `studio/minijeux/docs/specs/2026-07-19-menu-mur-copains.md` (24 jeux, build par moteur, vagues) | `ca1d9b9f` |
| **Étape 1 ✅** | **Le Mur** : nouveau `site/index.html` + `site/js/mur.js` + `site/css/mur.css`. Ancien menu archivé `site/index-v2-archive.html` et réutilisé derrière le gate parents | `eb47e099` |
| Triage jeux | 41 commentaires PY intégrés — `studio/minijeux/memory/audits/2026-07-19-triage-poc-design.md` §6-7 | `d85cd578` |

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
- [x] **mj-46 = S1 « Les œufs surprises »** (Spino 1) — LIVRÉ + câblé (repaire Spino #1, catalog) + **retouches F1 FAITES (Kimi, 2026-07-20)** : QCM visible dès le début (tap = aide optionnelle), œuf fissuré au tap, œufs en vrac posés dans le nid (jamais cachés à +50 %), paliers N0 2-5 · N1 5-15 · N2 7-22. ⚠️ Écart spec : pas de regroupement par 5 au palier 3★.
- [x] **mj-48 = S3 « Tout le monde monte ! »** (Spino 3) — LIVRÉ 2026-07-20 (repaire Spino #3, figée, spec verte). Bus 2 fenêtres de 5, N2 mixte monte/descend + places libres + compléments à 10 + ordinal file (tap direct).
- [x] **P2 = mj-20 corrigé** (Para) — LIVRÉ 2026-07-20 : gating par étoiles (0★ FR 1-5 · 1★ FR 1-10 + EN · 2★ +ES/BR · 3★ tout). Figée mj-20.md.

### Vague V1 — moteur dés/regroupement (`site/js/mj-dice.js`, référence : mj-43.html)
- [x] **mj-47 = S2 « Les constellations »** (Spino 2) — LIVRÉ + câblé + **retouche F2 FAITE (Kimi, 2026-07-20)** : réécriture en **format domino permanent** (2 cases accolées, configurations dé en ombres dino, ref. POC mockup-6), décomposition = les 2 moitiés visibles illuminées (« 3 et 4, ça fait 7 ! »), paliers relevés : moitiés 1-3 (total 2→6) · 1-6 (total ≥4) · 3-6 (total 6→12).
- [x] **mj-49 = S4 « Les barquettes de 10 »** (Spino 4) — LIVRÉ 2026-07-20 (remplace mj-43 au repaire #4, figée, spec verte). Boîte d'œufs 5×2, badge 10, célébration bocal N2.

### Vague V1 — moteur tri-bacs (référence : mj-09.html)
- [x] **mj-51 = G2 « Le tri des lettres »** — LIVRÉ 2026-07-20 (remplace mj-09 au repaire Galli #2). Allographes cursive/script/MAJ, confusables b/d/h/k au N2. ⚠️ « boîtes-sons » (3★) différé vague 3.
- [x] **mj-50 = G1 « Trouve la lettre »** — LIVRÉ 2026-07-20 (repaire Galli #1). Le SON jamais le nom, MP3 phonèmes + TTS lent, confusables + son-du-mot au N2.

### Vague 2 — état 2026-07-20 soir
- [x] **mj-52 = G3 « La boîte à mots »** — LIVRÉ (Galli #3). Alphabet mobile cursif, guide syllabique, aide lumineuse. ⚠️ « mot libre » 3★ différé.
- [x] **mj-53 = G5 « Lis et fais »** — LIVRÉ (Galli #4, fusion mj-23+mj-06 retirés du repaire). Mot→image, syllabes dino photos SANS audio, consigne-action. ⚠️ « phrase rigolote » 3★ différée.
- [x] **V4 mj-34** — 🐛 avancement FIXÉ (persistant : étoiles + localStorage) + obstacles éteints (un seul bus sort). Figée mj-34.md.
- [x] **V2 mj-14** — vraie entrée catalog (hack LOCAL_META retiré). ⚠️ Reste : suite AB/AAB propre (ex-mj-16) + variante dino.
- [ ] V1 intrus (mj-15) : assets à monter · T3 vétérinaire (mj-17 peau dino) · T4 frise (mj-31 SVG continents) · P3 géo (mj-22, test réel PY d'abord) · captcha traçage (test tactile PY d'abord).

> **Prochain ID libre : mj-54.** Repaires cibles atteints : Spino 46/47/48/49 · Galli 50/51/52/53.
> 🐛 Dette découverte : `tests/index.spec.mjs` écrit pour l'ancien menu accordéon (cherche `.game[data-id=mj-04]`) — cassé depuis le passage au Mur, à réécrire pour mur.js.

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
