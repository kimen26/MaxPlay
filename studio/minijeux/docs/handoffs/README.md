# Handoffs — pôle JEU

> Usine du pôle (protocole : `~/.claude/skills/nouveau-projet/references/protocole-handoffs.md`). Registre global : `docs/handoffs/README.md` (racine).
> **MAJ 2026-09-12** (HO-R01) : 8 briefs `fait` déplacés vers [`archives/2026-09-03/`](archives/2026-09-03/) (HO-MJ-01 avait un statut interne périmé `pret`, corrigé en `fait` avant archivage). HO-MJ-05 et HO-MJ-06 n'ont jamais eu de fichier brief séparé (seulement un rapport) — rien à archiver pour eux. HO-MJ-11 a un rapport (`rapports/HO-MJ-11-rapport.md`) sans entrée de registre ni brief — question ouverte, non touché ici.
> **MAJ 2026-09-18** (HO-MJ-19) : les briefs HO-MJ-13, 14, 15 et 17 sont descendus dans [`archives/2026-09-18/`](archives/2026-09-18/) — quatre itérations mortes de la même armoire, gardées pour l'histoire, plus pour le travail courant. Seuls HO-MJ-12 (assets, encore ouvert) et HO-MJ-19 (v6, livrée) restent ici.

| ID | Titre | Fichiers possédés | Statut |
|----|-------|-------------------|--------|
| HO-MJ-05 | EPIC i18n mini-jeux · lot 6 (mj-20, mj-22, mj-42) + titre mj-14 | 4 mj-XX.html, i18n/** | fait (pas de fichier brief séparé, voir `rapports/HO-MJ-05-rapport.md`) |
| HO-MJ-06 | EPIC i18n mini-jeux · 81 consignes parlees en anglais (voix() + repli TTS + scripts STS) | site/js/mj-i18n.js, victory-sounds.js, i18n/**, tools/ | fait (MP3 EN au quota, pas de fichier brief séparé, voir `rapports/HO-MJ-06-rapport.md`) |
| HO-MJ-12 | L'Armoire · découpe des pièces GPT en tuiles/objets webp | site/img/armoire/**, tools/armoire-decoupe.py | fait |
| HO-MJ-13 | L'Armoire · nouvel accueil enfant, remplace La Vallée | site/index.html, js/armoire.js, css/armoire.css, js/mur.js, css/mur.css, js/mur-scene.js (suppr.), sw.js, tests index/mur-nid/armoire | fait |
| HO-MJ-14 | L'Armoire v2 · trois zones, portes ouvertes, marges de pièce | site/index.html, js/armoire.js, css/armoire.css, sw.js, tests armoire | fait (rejetée visuellement par PY, remplacée par HO-MJ-15) |
| HO-MJ-15 | L'Armoire v3 · carcasse en tuiles fidèle à la maquette validée | site/index.html, js/armoire.js, css/armoire.css, sw.js, img/armoire/carcasse/**, tools/armoire-tuiles.py, tests armoire/index | fait (recettée par PY 2026-09-17 : vingt points, remplacée par HO-MJ-17) |
| HO-MJ-17 | L'Armoire v4 · kit de 7 sprites + lumière CSS, prototype statique | site/img/armoire/kit/**, tools/armoire-kit.py, tools/armoire-proto/** | abandonné 2026-09-18 (prototype jamais validé, fichiers supprimés par HO-MJ-19) |
| HO-MJ-18 | L'Armoire v5 · kit de 10 images GPT + états | — | abandonné 2026-09-18 (jamais commité, résultat cassé ; brief, rapport et captures supprimés par HO-MJ-19) |
| HO-MJ-19 | L'Armoire v6 · repère de design fixe 911 × 1480, mise à l'échelle d'un bloc | site/index.html, css/armoire.css, js/armoire.js, sw.js, img/armoire/v6/**, tools/armoire-sprites.py, tools/armoire-shot.mjs, tests armoire | fait 2026-09-18 (recette PY sur P30 Pro à faire) |
| HO-MJ-20 | L'Armoire v7 · meuble VIDE recomposé depuis le kit de 8 pièces GPT (carcasse, planche, montant, 2 portes, tiroir, spot), ouvert/fermé, config = données | site/dev-armoire.html, js/armoire-meuble.js, css/armoire-meuble.css, img/armoire/v7/**, tools/armoire-kit.py, armoire-meuble-shot.mjs, armoire-meuble-cmp.py, tests/armoire-meuble.spec.mjs, docs/refs/armoire/kit/** | livré 2026-09-19 (3 itérations Fable↔Sonnet, spec vert 6 viewports, recette PY à faire ; suite HO-MJ-22 = y remettre les cases) |
| HO-MJ-21 | Le nid perd les gains · catalogue dino absent sur 29/36 jeux, œufs détruits à l'éclosion, pertes silencieuses | site/js/mj-shell.js, collection.js, collection-dinos.js, nid-ui.js, sw.js, tests collection/nid-e2e/mj-golden-nid | à faire (délégué Sonnet 2026-09-19) |

## Archivés (`archives/2026-09-03/`)

| ID | Titre | Statut |
|----|-------|--------|
| HO-MJ-01 | Mémoire convergente pôle JEU (pmo/ → memory/ quintette) | fait |
| HO-MJ-02 | EPIC i18n mini-jeux · lot 0 plomberie | fait (36/36 EN, portes rejouées) |
| HO-MJ-03 | EPIC i18n mini-jeux · MJi18n.t()/plural() + chaines lots 1-2 | fait (117 cles ui, portes rejouees) |
| HO-MJ-04 | EPIC i18n mini-jeux · chrome panneau regle + chaines lots 3-4 | fait |
| HO-MJ-07 | EPIC i18n mini-jeux · packs es-es et pt-br | fait (37/37 × 2, 0 erreur) |
| HO-MJ-08 | Coloriage mj-32 : halo blanc + cacophonie audio de fin | fait (portes vertes) |
| HO-MJ-09 | Coloriage mj-32 : nom du dino coloriable + sous-menu Decors | fait (portes vertes) |
| HO-MJ-10 | Coloriage mj-32 : zoom pour clics de précision | fait (zoom x2,75, portes vertes) |
