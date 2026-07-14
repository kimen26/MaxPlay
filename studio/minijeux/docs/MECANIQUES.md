# 📚 BIBLIOTHÈQUE DE MÉCANIQUES — le savoir-faire réutilisable MaxPlay

> **Décision Papa Yann 2026-07-14** : « avoir une bibliothèque de savoir-faire qu'on peut proposer et reproduire pour d'autres mini-jeux est une super pratique. Je veux un nouveau jeu → on propose par défaut des mécaniques actuelles si pas besoin de spécificité. »
>
> **Règle** : toute demande de NOUVEAU mini-jeu commence par un tour de cette bibliothèque. On propose 1-2 mécaniques existantes re-skinnées AVANT d'envisager du code neuf. Du neuf seulement si la notion pédagogique l'exige.
> Classification complète des 41 jeux : [`jeux/CLASSIFICATION-2026-07.md`](jeux/CLASSIFICATION-2026-07.md).

## Le socle (obligatoire, tous jeux)

| Brique | Fichier | Rôle |
|--------|---------|------|
| Gabarit | `site/js/mj-shell.js` | 1 include = cadre complet (thème, header, consigne, règles, tracking, cloud, célébrations) |
| Golden | `site/js/mj-golden.js` | Piste de manches + étoiles ★★★ (3 niveaux via `Stars.get`) |
| QCM retry | `site/js/qcm-retry.js` | Retry sans pénalité + révélation |
| Célébrations | `site/js/celebrations.js` | MaxFX : jeton vers la piste, étoile finale (cinematic = sans-faute) |

## Moteurs réutilisables (libs extraites)

| Lib | Fichier | Savoir-faire | Jeux clients |
|-----|---------|--------------|--------------|
| Dés & regroupement | `site/js/mj-dice.js` | Constellation de dé (subitizing), composition de groupes, **solveur anti-deadlock** (subset-sum : garantit que chaque coup laisse le round soluble) | mj-43, mj-45 |
| Ombres dino | `site/js/dinos-ombres.js` | Pool d'ombres canon, tirage « cousin de la même famille » (difficulté), audio nom exclusif (MP3 ElevenLabs → fallback TTS, un son coupe l'autre) | mj-24, 25, 26, 28, 33 |
| Bus SVG | `site/js/bus-svg.js` | `busSVG()` / `busSVGHiddenNum()` + couleurs `LIGNES` (data.js) — JAMAIS d'emoji 🚌 | tous les jeux bus |
| Comptage QCM | `site/js/mj-compte.js` | tirage quantité par palier (`nextValue`) + distracteurs proches ±1..±3 (`distractors`) + retry via `QcmRetry` — chaque jeu garde SA peau (scène, niveau, consigne) | mj-04 (peau bus), mj-26 (peau dino) |

## Mécaniques éprouvées (à proposer par défaut pour un nouveau jeu)

| Mécanique | Référence(s) | Re-skinnable ? | Notes |
|-----------|--------------|----------------|-------|
| **QCM-tap** (question → N choix) | mj-04, 06, 11, 23, 24, 26, 36 | ✅ facile | LA mécanique par défaut. Manche mixte 8 questions (4 niveau courant + 4 faciles) |
| **Compter/subitizing** | mj-04, 26, 43, 45 | ✅ facile | mj-04/26 = même moteur 2 peaux (pilote 1-moteur-N-peaux) |
| **Drag&drop tri vers bacs** | mj-08, 09, 44 | ✅ facile | Critère libre : couleur, famille, son… |
| **Tri-ordre** (séquence) | mj-30 (taille), mj-31 (temps) | ✅ moyen | Révélation « échelle honnête » réutilisable |
| **Memory / paires** | mj-33 (flip), mj-41 (mahjong libre/coincé) | ✅ facile | mj-41 : génération garantie solvable + remélange auto |
| **Lecture mot→image** | mj-23 (mots), mj-27 (syllabes), mj-06 (phrase à trou) | ✅ facile | Progression graphémique dans la banque de mots |
| **Puzzle plateau + niveaux précalculés** | mj-34 (Rush Hour, BFS), mj-38 (peg-solitaire, BFS), mj-37 (échecs) | ✅ moyen | Pattern : niveaux vérifiés par solveur AVANT d'être livrés |
| **Cherche l'objet mobile** | mj-19 | ✅ facile | requestAnimationFrame + zéro stress |
| **Révélation cachée** (lampe) | mj-28 | ✅ facile | Masque radial-gradient qui suit le doigt |
| **Suite logique / intrus** | mj-16, mj-15 | ✅ moyen | Paliers par TYPE de critère, jamais de révélation |
| **Manipulation couleur** | mj-18 (water-sort), mj-21 (mélange), mj-32 (coloriage flood-fill) | ✅ moyen | Flood-fill canvas maison dans mj-32 |
| **Jeu contre IA à paliers** | mj-42 (Shisima) | ✅ moyen | IA : aléatoire → bloque 1/2 → bloque toujours |
| **Bac à sable** (0 étoile) | mj-12, 32, pose-tiles | ✅ facile | `maxStars:0`, `access:'free'` |

## Contrats transverses (ne pas réinventer)

- **Difficulté = 2 régimes seulement** (décision 2026-07-14) : ① golden 3 niveaux `Math.min(2, Stars.get(id))` pour les jeux à manches · ② niveaux précalculés/jauge pour les puzzles. Plus jamais de « 5 paliers ».
- **Étoile = partie 100%** (stars.js, dérivé du tracker — aucun code étoile dans le jeu).
- **Anti-deadlock** : tout jeu où un coup peut bloquer le joueur DOIT avoir un solveur (mj-dice, mj-41, mj-34/38) — jamais de partie perdable par malchance.
- **Audio** : un seul son à la fois · MP3 → fallback TTS · SFX paddés 250 ms.

---
_Créé 2026-07-14 (décision bibliothèque de savoir-faire). MAJ à chaque lib extraite ou mécanique nouvelle validée._
