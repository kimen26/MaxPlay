# AUDIT PORTAIL — résultat C1 (2026-07-28)

> Instrument : `studio/minijeux/tests/audit-gabarit.mjs`, enrichi de 5 checks (EP-038, plan
> [`2026-07-28-plan-remise-au-propre.md`](2026-07-28-plan-remise-au-propre.md) § C1).
> Portée : 46 jeux au menu (`site/js/catalog.js`). 6 jeux hors-menu non audités par défaut
> (mj-01, mj-13b, mj-25, mj-29, mj-33, mj-41 — cf. `--all`).
> **Ce rapport ne corrige aucun jeu.** Il mesure, pour préparer les lots A/B/C de migration.

## 0. Les 5 checks ajoutés

| # | Nom | Détection | Niveau par défaut | Niveau `--strict` |
|---|-----|-----------|---|---|
| 1 | écran de fin via `G.showEnd` | appel `G.showEnd(`/`shell.G.showEnd(` dans le JS inline ; sinon recherche de marqueurs maison (`#end-screen`, `.victory-overlay`, `.fin-overlay`, `#fin-overlay`, `#victoryScreen`, `.parade-overlay`, `#fullScreen`, `.victoire-overlay`, `showEndScreen(`, `.end-wrap`/`wrap.className='end-wrap'`, `function showEnd/showTierEnd/showVictory(`) | dette | **BLOQUANT** |
| 2 | `golden:true` si `maxStars>0` | lit `maxStars` dans l'entrée `catalog.js`, cherche `golden:true` ou `Golden.setup(` dans le JS inline | dette | **BLOQUANT** |
| 3 | titre ≤ 4 mots / ≤ 22 car. + cohérence catalog↔MJ.init↔`<title>` | tolère apostrophes typographiques et ponctuation finale | dette | **BLOQUANT** |
| 4 | `.hdr` canonique | zéro règle CSS locale `.hdr`/`.htitle` ; zéro `#levelbar`/`#score-badge`/`#score`/`.mp-g-stars` inséré dans le markup `.hdr` | dette | **BLOQUANT** |
| 5 | débordement Cursif | règle CSS `font-family:'Cursif'` + `font-size≥2rem` sans `clamp()` ni `line-height≥1.2` | dette (toujours, même `--strict`) | dette |

**Piège mj-34 vérifié** : le jeu redéclare `.end-wrap` (classe du vrai écran golden) en CSS locale
et la construit en JS (`wrap.className = 'end-wrap'`) sans jamais appeler `G.showEnd` → détecté
correctement comme écran maison (le check ne se fie jamais à `.end-wrap` seul, seulement à
l'absence d'appel `G.showEnd` combinée à un marqueur).

## 1. Résultat chiffré

| Mode | Jeux conformes | Avec dette (non bloquant) | BLOQUANT | Exit code |
|---|---|---|---|---|
| **par défaut** (CI actuelle) | 6 | 40 | 0 | **0 (vert)** |
| **`--strict`** (état réel migration) | 6 | 6 | **34** | 1 |

- Confirme l'ordre de grandeur de l'audit initial (33 showEnd maison + 29 golden manquants sur 45).
- Écart d'unité normal : le portail audite 46 jeux au menu (catalog.js), l'audit initial en citait 45 ;
  léger différentiel de périmètre (mj-pose-tiles inclus ici, absent de la numérotation mj-XX classique).

## 2. Détail par jeu (mode `--strict`)

| Jeu | Statut | Bloquants détectés |
|---|---|---|
| mj-04 | BLOQUANT | showEnd maison (`showEndScreen()` L210) · golden manquant (3★ promises) |
| mj-05 | BLOQUANT | showEnd maison (`showEndScreen()` L243) · golden manquant |
| mj-06 | BLOQUANT | showEnd maison (`showEndScreen()` L272) · golden manquant |
| mj-08 | BLOQUANT | showEnd maison (`.victory-overlay` L193) · golden manquant · `.hdr` CSS locale (L26) |
| mj-09 | BLOQUANT | showEnd maison (`.parade-overlay` L172) · golden manquant · élément ajouté `.hdr` (`levelbar` L21) |
| mj-11 | BLOQUANT | showEnd maison (`#victoryScreen` + fonction locale L167) · golden manquant |
| mj-12 | **OK** | — |
| mj-13a | BLOQUANT | showEnd maison (fonction locale L426) · golden manquant · titre catalog≠`<title>` · élément ajouté `.hdr` (`levelbar, score` L69) |
| mj-13c | BLOQUANT | showEnd maison (fonction locale L442) · golden manquant · titre catalog≠`<title>` · élément ajouté `.hdr` (`levelbar, score` L70) |
| mj-14 | BLOQUANT | titre : 3 valeurs différentes (catalog "Les cases mystères" ≠ MJ.init "La grille" ≠ `<title>` "La grille des bus") |
| mj-15 | BLOQUANT | showEnd maison (`#end-screen` + fonction locale L126) · golden manquant · élément ajouté `.hdr` (`levelbar, score-badge, mp-g-stars` L160) |
| mj-16 | BLOQUANT | showEnd maison (`#end-screen` + fonction locale L182) · golden manquant · élément ajouté `.hdr` (`levelbar, score-badge` L209) |
| mj-17 | BLOQUANT | showEnd maison (fonction locale L680) · golden manquant |
| mj-18 | BLOQUANT | showEnd maison (`.victory-overlay` + fonction locale L145) · golden manquant · élément ajouté `.hdr` (`levelbar` L134) |
| mj-19 | BLOQUANT | golden manquant · élément ajouté `.hdr` (`levelbar, score` L76) |
| mj-20 | BLOQUANT | showEnd maison (`#victoryScreen` + fonction locale L303) · golden manquant · titre 3 valeurs différentes |
| mj-21 | dette seule | (hex en dur, non bloquant) |
| mj-22 | BLOQUANT | golden manquant |
| mj-23 | BLOQUANT | showEnd maison (fonction locale L235) · golden manquant · élément ajouté `.hdr` (`levelbar` L15) |
| mj-24 | **OK** | — |
| mj-26 | **OK** | — |
| mj-27 | BLOQUANT | titre catalog 5 mots/18 car. ("Lis le nom du dino") |
| mj-28 | BLOQUANT | titre catalog 4 mots/25 car. ("La lampe du paléontologue") |
| mj-30 | dette seule | (hex en dur) |
| mj-31 | BLOQUANT | titre catalog 5 mots/24 car. ("Le grand voyage du temps") |
| mj-32 | dette seule | (hex en dur) |
| mj-34 | BLOQUANT | showEnd maison (`.end-wrap` construit en JS + fonction locale L638 — **piège confirmé**) · golden manquant |
| mj-35 | BLOQUANT | showEnd maison (`#end-screen` + fonction locale L139) · golden manquant |
| mj-36 | BLOQUANT | golden manquant (`golden:false` explicite alors que catalog promet 3★) |
| mj-37 | BLOQUANT | golden manquant |
| mj-38 | BLOQUANT | golden manquant |
| mj-39 | BLOQUANT | showEnd maison (`#fullScreen` L85) · golden manquant |
| mj-40 | BLOQUANT | showEnd maison (`#end-screen` + `showEndScreen()` L71) · golden manquant |
| mj-42 | BLOQUANT | golden manquant |
| mj-43 | BLOQUANT | golden manquant |
| mj-44 | BLOQUANT | golden manquant |
| mj-45 | BLOQUANT | golden manquant · titre catalog 5 mots/21 car. ("Le bus qui se remplit") |
| mj-46 | **OK** | — |
| mj-47 | **OK** | — |
| mj-48 | BLOQUANT | titre catalog 5 mots/21 car. ("Tout le monde monte !") |
| mj-49 | **OK** | — |
| mj-50 | dette seule | (Cursif 2 règles à risque) |
| mj-51 | BLOQUANT | showEnd maison (`.fin-overlay` L120) · golden manquant · élément ajouté `.hdr` (`levelbar` L16) |
| mj-52 | dette seule | (Cursif 3 règles à risque) |
| mj-53 | dette seule | (hex en dur + Cursif 1 règle à risque) |
| mj-pose-tiles | BLOQUANT | titre catalog "Pose-tes-tiles" ≠ `<title>` "🦺 Pose-tes-tiles - Petit Ouvrier 🚧" |

**6 jeux déjà conformes strict** : mj-12, mj-24, mj-26, mj-46, mj-47, mj-49.

## 3. Listes de migration (pour C1 § plan de bascule)

### Lot A — showEnd maison, ancien modèle (à recâbler vers `G.showEnd`)
mj-04, mj-05, mj-06, mj-08, mj-09, mj-11, mj-13a, mj-13c, mj-15, mj-16, mj-17, mj-18, mj-20,
mj-23, mj-34, mj-35, mj-39, mj-40, mj-51 — **19 jeux**, conforme au chiffre de l'audit initial.

### Lot golden — `golden:true` manquant seul (pas de showEnd maison à corriger, souvent `golden:false` explicite)
mj-19, mj-22, mj-36, mj-37, mj-38, mj-42, mj-43, mj-44, mj-45 — **9 jeux** (sous-ensemble qui a déjà
un `G.showEnd` propre ou pas de boucle de fin détectée par le portail, mais promet des étoiles sans piste).

### Lot C — entêtes maison (`.hdr` pollué : CSS locale ou élément ajouté)
mj-08 (CSS locale), mj-09/13a/13c/15/16/18/19/23/51 (élément ajouté : levelbar/score/score-badge/mp-g-stars).

### Titres à raccourcir/aligner
mj-14 (3 valeurs différentes), mj-20 (catalog≠init), mj-27, mj-28, mj-31, mj-45, mj-48, mj-13a,
mj-13c, mj-pose-tiles — recoupe et complète la liste de 8 jeux du plan § C2.

### Dette Cursif (non bloquant, à traiter en C2)
mj-50 (2 règles), mj-51 (3 règles), mj-52 (3 règles), mj-53 (1 règle).

## 4. Plan de bascule `--strict` (gravé aussi en tête de `audit-gabarit.mjs`)

- **Aujourd'hui** : les 5 nouveaux checks sortent en `dette` par défaut → **CI verte**, mais
  visibles et tracés (`node audit-gabarit.mjs` sans flag).
- **Pendant la migration** : chaque jeu corrigé (lot A puis golden puis C) est vérifié avec
  `node audit-gabarit.mjs --strict mj-XX` avant push — doit passer 0 BLOQUANT sur ce jeu précis.
  Aucune régression possible ensuite : le check est mécanique et permanent.
- **Quand tous les jeux du catalogue passent `--strict` sans BLOQUANT** : basculer le défaut
  (retirer le flag ou l'inverser en `--legacy` pour l'ancien comportement temporaire pendant
  la transition), documenté dans le commentaire de tête du script.
- Le check #5 (Cursif) reste `dette` **même en `--strict`** — c'est un signal de risque, pas une
  règle mécanique fiable à 100 % (calcul heuristique sur les règles CSS, pas un rendu réel) ; le
  traitement définitif du débordement reste au jugement humain (C2).

## 5. Ce qui n'a PAS été fait dans cette tâche

Aucun `site/mj-XX.html` n'a été modifié. Aucun commit. Le portail seul a changé
(`studio/minijeux/tests/audit-gabarit.mjs`). Prochaine étape (hors scope ici) : C0 tri qualité
(conseiller) puis migration lot par lot selon `2026-07-28-plan-remise-au-propre.md` § 4.
