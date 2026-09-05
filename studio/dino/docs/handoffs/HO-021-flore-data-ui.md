# HO-021 — Flore : data + UI dans l'onglet « Les époques »

**Statut :** en cours
**Depend de :** HO-020 (plantes.json) — le squelette UI se code avec 2-3 entrées de test, la data définitive est branchée ensuite par l'orchestrateur.

## Objectif
Dans `site/dev-dinos.html`, la grille d'une époque (`showGridEpoque`) affiche APRÈS les dinos une section « 🌿 Les plantes du <période> » avec une carte par plante ; clic → fiche plante (`showFichePlante`) réutilisant l'écran `fiche` et les classes existantes (`v1-hero`, `v1-panel`, `v1-stats`, `v1-list-box`…). **Zéro CSS inventé** sauf strict nécessaire (justifier).

## Fiche plante — 6 blocs
1. Hero : `img/dinos/plantes/<png>` avec repli emoji (pas d'ombre dispo) ; nom + latin + sens du nom (`nom_etym`).
2. « Où elle pousse » : `environnement` + périodes (labels via `DINO_PERIODES`) + `region`.
3. « Sa taille » : hauteur (`DinoUI.longueurTxt(hauteur_m)`) + `comp_hauteur` (vs enfant 1 m).
4. « Sa feuille et ses graines » : `feuille` + `graines`.
5. « Qui la mangeait » : `mangee_comment` + vignettes cliquables des dinos `mangee_par` (ombre + nom → `showFiche2(id)`).
6. « Le truc fou » : `superpower` + `fait` + `vivant`.
Chaque bloc a son bouton 🔊 → repli TTS via `playBloc('plante:'+id, bloc, txt, btn)` qui doit marcher sans MP3 (MP3 ElevenLabs = ticket ultérieur).

## Contraintes
- Nouveau fichier `site/js/dinos-plantes.js` : `const DINO_PLANTES = [...]` (copie fidèle de `studio/dino/content/sources/flore/plantes.json`), chargé juste après `dinos-data.js`. Header : source + « GÉNÉRÉ, ne pas éditer à la main → `node studio/dino/content/scripts/export/_gen-plantes.cjs` » ; écrire ce script (json → js).
- `dinos-i18n.js` : ajouter `merge(DINO_PLANTES, S.plantes)` (prêt pour HO-023, sans casser si absent).
- Libellés UI nouveaux → `site/js/dino-ui.js` (dico FR, clés `plantes_*`, `compteur_plantes`) ; `node _check-ui.cjs en|es-es|pt-br` doivent rester verts → ajouter les traductions dans `content/i18n/<lang>/ui.json` (libellés UI courts seulement ; le contenu des fiches = HO-023).
- Carte époque : ajouter « · N plantes » dans `.fam-count` via `Tn('compteur_plantes', n)`.
- Retour depuis fiche plante → grille de l'époque courante (`showGrid` reste correct). `currentDino` ne doit pas être écrasé par une plante.
- Pas d'`innerHTML` avec du texte non contrôlé hors data interne (règle secu).

## Fichiers autorisés
- `site/dev-dinos.html`, `site/js/dinos-plantes.js` (nouveau), `site/js/dinos-i18n.js`, `site/js/dino-ui.js`
- `studio/dino/content/i18n/{en,es-es,pt-br}/ui.json`
- `studio/dino/content/scripts/export/_gen-plantes.cjs` (nouveau)

## Hors périmètre
- Contenu des fiches (HO-020), images (HO-022), audio EL, 5 onglets (FIGÉ : on n'en ajoute pas).

## Portes de vérification
```bash
cd studio/dino/content/scripts/export && node _gen-plantes.cjs && for l in en es-es pt-br; do node _check-ui.cjs $l; done
node -e "new Function(require('fs').readFileSync('site/js/dinos-plantes.js','utf8'))()" && echo JS-OK
# Playwright (studio/minijeux/tests/node_modules) : ouvrir site/dev-dinos.html via un serveur statique, onglet Les époques → Jurassique → scroller → cliquer une plante → capture fiche → cliquer un dino mangeur → fiche dino. Captures dans le scratchpad, à joindre au rapport.
```

## Rapport attendu
Diff résumé, sortie des portes, chemins des captures, tout écart au brief.
