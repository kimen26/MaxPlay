---
name: recette-visuelle
description: "Recetter visuellement un écran MaxPlay (mini-jeu, encyclopédie, accueil) avant de le livrer — capture multi-largeurs (360x740 / 320x568), planche référence/avant/après, et scénario de mise à jour du service worker. À utiliser avant tout push touchant du CSS, une image, ou la coquille du site (index, armoire, css/js précachés). Déclencheurs : recette visuelle, capturer l'écran, planche avant/après, vérifier le rendu mobile, tester la bascule du service worker, ouvrir 320px/360px."
---

# Recette visuelle

Zéro token à l'exécution : trois scripts Node/Playwright, pas de LLM dans la boucle. Un
sous-agent (Sonnet ou Haiku) peut les lancer directement en Bash.

## Quand l'utiliser

- Après tout changement visuel (CSS, sprite, layout) sur une page du site, avant de la donner à
  relire à Papa Yann ou de pousser.
- Après tout changement à la coquille servie par le service worker (`site/index.html`,
  `site/sw.js`, CSS/JS précachés) : la bascule cache-first doit être vérifiée en scénario, pas
  en capture fraîche seule (L-148).
- Pour comparer un rendu à une image de référence (maquette validée, capture d'un ancien
  build) : produire une planche, ne jamais juger sur un log de succès (L-145).

## Résolution des dépendances

- **Playwright** : devDependency à la racine du repo (`package.json`, HO-R08), hoistée dans
  `node_modules/playwright`. Les scripts de ce skill l'importent par son nom (`import {
  chromium } from 'playwright'`) — Node remonte l'arbre de `node_modules` automatiquement,
  aucun chemin relatif à écrire. Fonctionne tant que le script est lancé depuis un dossier sous
  la racine du repo (le cas normal).
- **sharp** : absent du repo (vérifié le 2026-09-30 — `require.resolve('sharp')` échoue).
  `planche.mjs` détecte son absence et bascule automatiquement sur un fallback Playwright (page
  HTML statique composée puis capturée). Si `sharp` est installé un jour, le script l'utilise
  sans changement d'invocation.

## Commandes

### 1. `capture` — capturer une page à plusieurs largeurs

```bash
node .claude/skills/recette-visuelle/scripts/capture.mjs <page> \
  [--width 360x740,320x568] [--dpr 3] \
  [--click "<sélecteur>"]... [--lang en] [--out <dossier>]
```

- `<page>` : chemin local (ex. `site/index.html`, servi par un petit serveur http intégré — le
  site fait des `fetch()`/`<script src>` relatifs qui échouent en `file://`) ou une URL complète
  (`https://kimen26.github.io/MaxPlay/`).
- `--width` : liste de `LxH` séparées par des virgules. Défaut : `360x740,320x568` (viewport
  P30 Pro et non-régression WCAG, voir `rules/mobile-parents.md`).
- `--dpr <n>` : `deviceScaleFactor` Playwright, pour zoomer la netteté de capture.
- `--click <sélecteur>` : répétable, cliqué dans l'ordre donné après le chargement. **Utiliser
  un sélecteur DISTINCT par clic**, pas le même répété : Playwright résout toujours un sélecteur
  non strict sur son premier élément, donc `--click ".am-porte" --click ".am-porte"` reclique la
  même porte déjà ouverte (elle finit recouverte par les casiers, le clic timeout). Pour
  l'armoire de l'accueil : `--click ".am-porte-haut.am-g" --click ".am-porte-bas.am-g"` (une
  porte par zone).
- `--lang en` : ajouté en paramètre `?lang=en` à l'URL (à adapter si une page attend un autre
  mécanisme de langue).
- `--out <dossier>` : dossier de sortie des PNG + `capture-report.json`.

Pour chaque largeur, le script affiche `OK` ou `PROBLEME` et détaille :
`scrollWidth <= innerWidth`, `scrollHeight <= innerHeight`, les erreurs console (`console.error`,
`pageerror`), et les réponses réseau `>= 400`. Code de sortie non-zéro si un problème est détecté
sur au moins une largeur.

### 2. `planche` — assembler référence / avant / après

```bash
node .claude/skills/recette-visuelle/scripts/planche.mjs <img1> <img2> [<img3>] \
  [--label "Référence"] [--label "Avant"] [--label "Après"] \
  [--out <fichier.png>]
```

Assemble 2 ou 3 images côte à côte, hauteur commune, légendes optionnelles. Utilise `sharp` si
disponible, sinon le fallback Playwright (voir ci-dessus).

### 3. `sw-update` — scénario de bascule du service worker

```bash
node .claude/skills/recette-visuelle/scripts/sw-update.mjs \
  [--page site/index.html] [--sw-version-file site/js/gen/sw-version.js]
```

Scénario complet : visite 1 (installation, aucun rechargement attendu) → modification
temporaire du hash dans `sw-version.js` → visite 2 dans le même contexte navigateur → vérifie
qu'il y a eu **exactement un** `location.reload()` (pas 0, pas plusieurs) et qu'**un seul** cache
de coquille est actif (`caches.keys()`). **Restaure toujours** le fichier de version original
dans un `finally`, même en cas d'erreur — vérifier après coup avec :
```bash
git diff --stat site/js/gen/sw-version.js   # doit être vide
```

## Règle non négociable (L-145)

Une commande qui sort "OK" ou un rendu qui "ressemble" ne suffit jamais. Après toute capture ou
planche produite :

1. **Ouvrir l'image** avec l'outil Read (jamais se fier au seul code de sortie du script).
2. **Écrire la liste de ce qui DIFFÈRE** de la référence — pas ce qui ressemble. Une liste vide
   veut dire qu'on a cherché la ressemblance, pas les écarts.
3. Si la liste n'est pas vide : ce n'est pas fini, retourner corriger.

Un test vert peut coexister avec un rendu mauvais (L-140) — ces scripts vérifient des propriétés
mesurables (débordement, erreurs, rechargements), jamais l'esthétique ou la fidélité au design :
ça reste un jugement humain (ou d'agent) sur l'image ouverte.
