---
name: État pôle JEU MaxPlay
description: Où on en est — état déploiement, bugs actifs, journal des dernières sessions.
type: project
---

> Quintette mémoire pôle JEU (depuis 2026-09-03, HO-MJ-01) : `INVARIANTS` (chiffres) · `DECISIONS` (pourquoi) ·
> `TODO` (quoi ensuite) · `LESSONS` (erreur à ne pas refaire) · `MEMORY` (ce fichier, où on en est) · `CHANGELOG` (livré).

## Quelle question → quel fichier

| Question | Fichier |
|---|---|
| Un chiffre clé (zone tap, maxStars, count MJ) ? | `memory/INVARIANTS.md` |
| Pourquoi c'est comme ça ? | `memory/DECISIONS.md` (+ `archive/decisions-2026-H1.md` pour le détail) |
| Quoi faire ensuite ? | `memory/TODO.md` |
| Quelle erreur ne pas refaire ? | `memory/LESSONS.md` |
| Qu'est-ce qui est sorti ? | `memory/CHANGELOG.md` |
| Règles UX/audio/gabarit MJ ? | `docs/STANDARD-MJ.md` (source unique) |
| Mécaniques/libs réutilisables ? | `docs/MECANIQUES.md` |
| Stack technique ? | `docs/STACK.md` |

## État déploiement

**Jeux au menu enfant + 1 wip (encyclo dinos)** — liste = source unique `site/js/catalog.js` (ne jamais recopier de chiffre ailleurs).

**PURGE 2026-08-10** (décision PY « on garde l'idée, rien de codé pour rien ») : 23 jeux supprimés de `site/` (18 retirés tri C0 2026-07-28 + retraits PY 2026-07-21 + mj-58 + 4 orphelins hors catalogue). Trace : `memory/archive/backlog-fermes-2026.md` · figées archivées : `docs/jeux/_archive/figees-jeux-purges-2026-08-10/`.

**Production** : `https://kimen26.github.io/MaxPlay/` — CI via `.github/workflows/deploy.yml`.
**Artefact GitHub Pages** : 545 Mo / 1 Go limite (audio 191M + paleoart 122M). Ticket régime minceur à anticiper.

## Bugs critiques en cours

Recette complète 2026-09-19 (`memory/audits/2026-09-19-recette-complete.md`, lane REC-* de la TODO) : **mj-13a et mj-13c plantent à la 8ᵉ manche** (pas de `#app`, REC-C1) ; **mj-24/28/31 ne traduisent jamais leur contenu dino en EN** (ordre de scripts, REC-C7) ; **mj-22 dépend d'un fetch Wikimedia** (REC-C3) ; écran de victoire, menu et pages annexes 100 % FR en anglais (REC-C4/C5). mj-40 : blocage figure 2 vu par un testeur, non reproduit par l'autre (REC-C2, à confirmer à la main).

Faux bugs vérifiés : EP-022 MJ-04 "boucle infinie" (code conforme) · L-068 11 dinos sans image (résolu commit 941faa30).

## Fichiers clés jeu

| Fichier | Rôle |
|---------|------|
| `site/js/bus-svg.js` | SVG bus — lire avant tout |
| `site/js/data.js` | LIGNES (26 actives), DESTINATIONS |
| `site/js/tracker.js` | Suivi progression localStorage |
| `site/js/mj-shell.js` | Gabarit unique tout MJ |
| `docs/ratp-colors.json` | Source de vérité couleurs IDFM |

## Journal (dernières sessions)

- **2026-09-19/20 — Audit « inutile » + recette complète FR/EN (L-147)** : 6 agents d'audit (site, studio, racine/.claude/infra) → 13 fichiers morts supprimés (commit `chore(gc)`), refs `_archive/` corrigées, 111 Mo de langues retirées GARDÉS (PY réaffirme D-013 : réutilisation prévue), reste à trancher dans `memory/audits/2026-09-19-audit-inutile.md`. Recette : script générique 36×2 langues + 6 lots joués jusqu'à la victoire + dinos + transverse, ~300 captures jugées ; verdict : FR solide (0 crash chargement, 36/36 chaînages, HO-MJ-21 confirmé), EN pas livrable, 2 jeux plantent en fin de partie ; 13 tickets REC-* dans la TODO, rapport `memory/audits/2026-09-19-recette-complete.md`. Aucune correction appliquée (rapport seul, demande PY).
- **2026-09-21 — Armoire v8 VALIDÉE par PY** (« c'est bon ! et les étages sont bons aussi ») après les passes 5-7 (vantaux ouverts entiers, coins reconstruits, gonds fermé/ouvert identiques par remappage, images et scripts de dev versionnés contre le cache — L-146). Prochain : HO-MJ-22, remettre les 15 cases + 2 tiroirs sur ce meuble dans `index.html`.
- **2026-09-19 (soir) — L'Armoire v8 (HO-MJ-20 passe 4, D-030, L-145)** : la v7 assemblée depuis les 8 pièces GPT est rejetée par PY (lumière, portes, charnières, géométrie, croisements, tiroirs — tous fondés : pièces à points de vue et lumières incompatibles). Refait en découpant TOUT dans `ref-ouverte.png` (`tools/armoire-v8.py`, carcasse inpaintée, boîtes générées dans `js/gen/armoire-kit.js`), vantaux fermés dans `ref-fermee.png` avec charnières. Rendu = référence au pixel, spec vert 3/3, 170 Ko. Kit GPT supprimé. Serveur local `.claude/launch.json` (le volet navigateur n'exécute pas un `file://`).
- **2026-09-19 — L'Armoire v7, meuble vide en kit (HO-MJ-20, D-029, L-144)** : demande PY « fabrique cette armoire, déjà juste vide, ouvert/fermé, logique et modulable » avec les 8 pièces GPT du 17/09. Composant `site/js/armoire-meuble.js` (config = données, tout en fractions de l'ouverture avant de la carcasse) + `css/armoire-meuble.css` + page de dev `site/dev-armoire.html` (`?etat=ferme|haut|bas|ouvert`), 9 sprites v7 = 228 Ko, spec `tests/armoire-meuble.spec.mjs` vert 6 viewports, planches de comparaison `rapports/captures/HO-MJ-20-cmp-*.png`. Trois itérations Fable↔Sonnet, jugées sur les planches, pas sur le spec. `index.html` reste en v6 ; HO-MJ-22 (à ouvrir) = y remettre les 15 cases + 2 tiroirs. Recette PY à faire.
- **2026-09-17 — L'Armoire v3 carcasse en tuiles (HO-MJ-15, L-136)** : v2 rejetée visuellement par PY ; maquette statique `tools/armoire-compose.py` itérée avec lui jusqu'à validation (panneaux continus, étagères intérieures, portes entières, tiroirs à fleur, sans feuille), puis carcasse HTML/CSS générée par `--u` depuis 19 tuiles découpées dans LA référence (`img/armoire/carcasse/`, 64 Ko), objets en calque. 8 viewports sans ascenseur, écart rendu↔maquette ≤ 3 px, 232 Ko au premier affichage. En ligne, recette P30 Pro attendue.
- **2026-09-15 — L'Armoire v2 trois zones (HO-MJ-14)** : sur le modèle de l'armoire ouverte GPT — vitrine haute (Dinos, Monde, Œufs, Album) avec portes ouvertes, casiers de jeux au milieu, compartiment bas à tiroirs décoratifs, pièce autour (mur + tapis CSS, marges 3-5 %, safe-area), avatar derrière l'arche. 8 viewports sans ascenseur, 254 Ko à 360 px. Revue : avatar agrandi à ≥ 56 px, porte verrouillée en proportions conservées.
- **2026-09-15 — L'Armoire (HO-MJ-12 + HO-MJ-13, D-025)** : la Vallée animée est remplacée par une armoire en bois immobile (`site/js/armoire.js`, `css/armoire.css`, `img/armoire/` 27 pièces webp découpées par `tools/armoire-decoupe.py`). `mur-scene.js` supprimé, `mur.js`/`mur.css` élagués. Portes vertes : armoire.spec 7 viewports sans ascenseur, index, mur-nid, `npm run check`. Reste : recette PY sur GitHub Pages, globe/volcan animés déposés dans l'inbox (HO-MJ-14 à ouvrir), `nid-e2e.spec.mjs` à réécrire (bâti sur `.v-copain`).
- **2026-09-12 — HO-R02** : rotation mémoire du pôle (campagne refonte GED). `LESSONS.md` 70 Ko → 20 Ko (74 leçons datées/dupliquées/superseded déplacées verbatim dans `archive/lessons-2026-H1.md`, 18 gardées) ; `TODO.md` 39 Ko → 9 Ko (fait/obsolète retiré — 28 mj fantômes purgés le 2026-08-10 identifiés, lanes fermées condensées dans `CHANGELOG.md`).
- **2026-09-08/10 — Coloriage mj-32 (HO-MJ-08 à HO-MJ-12)** : décors, zoom, nom coloriable, damier/halo corrigés, harnais CI stabilisé (cause réelle : image d'ombre manquante, pas de l'instabilité). Détail `memory/TODO.md` § Coloriage mj-32.

## Équipe agents (référence rapide)

Détail complet : [`../EQUIPE.md`](../EQUIPE.md).

## Commandes audit

`/game-pmo-audit` → `game-pmo` Mode AUDIT (FOND + FORME en un passage).
