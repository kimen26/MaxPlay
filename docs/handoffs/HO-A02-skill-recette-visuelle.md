# HO-A02 — Skill recette-visuelle

**Statut :** fait
**Depend de :** —

## Objectif
Un skill `.claude/skills/recette-visuelle/` réutilisable par des sous-agents (Sonnet/Haiku),
zéro token à l'exécution, qui capture un écran (local ou en ligne) à plusieurs largeurs,
assemble une planche référence|avant|après, et vérifie le scénario de mise à jour du service
worker — pour arrêter de juger un visuel sur un log de succès (L-145) au lieu d'une image ouverte.

## Contexte a lire d'abord
- `studio/minijeux/memory/LESSONS.md` § L-136 (maquette validée avant code, une seule image
  source), § L-140 (un test vert peut coexister avec un rendu mauvais), § L-145 (lister ce qui
  DIFFÈRE de la cible, pas ce qui ressemble), § L-148 (visite 1 ancienne version → déploiement →
  visite 2 pour vérifier la bascule du service worker)
- `rules/mobile-parents.md` (360×740 par défaut, 320×568 non-régression, cibles 48 px)
- `site/js/sw-register.js` (recharge unique sur `controllerchange`, jamais dans un mj-*)
- `site/js/gen/sw-version.js` (généré, format `self.SW_VERSION = '<hash>';`)
- `studio/minijeux/tests/run.mjs` (import Playwright existant, résolu depuis `node_modules`
  racine du repo — `npm ci` se lance à la racine, HO-R08)

## Fichiers autorisés
- `.claude/skills/recette-visuelle/SKILL.md`
- `.claude/skills/recette-visuelle/scripts/capture.mjs`
- `.claude/skills/recette-visuelle/scripts/planche.mjs`
- `.claude/skills/recette-visuelle/scripts/sw-update.mjs`
- `.claude/skills/recette-visuelle/scripts/lib/serve-local.mjs` (petit serveur http si besoin
  d'un utilitaire partagé)
- `docs/handoffs/HO-A02-skill-recette-visuelle.md` (ce fichier)
- Lecture seule ailleurs (site/, studio/minijeux/tests) pour vérifier l'existant — aucune
  écriture hors la liste ci-dessus

## Hors perimetre
- Aucune commande git, aucun commit.
- Ne pas toucher `.claude/hooks/`, `.claude/agents/`, `.claude/skills/cloture/` (agents en
  parallèle dessus).
- Ne pas modifier `site/js/gen/sw-version.js` de façon permanente : le scénario `sw-update` doit
  le restaurer après usage, même en cas d'erreur (try/finally).
- Ne pas installer de dépendance npm nouvelle (pas de `sharp` si absent — fallback documenté).

## Travail
1. Vérifier la résolution Playwright depuis le dossier du skill (chemin relatif vers
   `node_modules` racine du repo, ou résolution Node standard en remontant les dossiers).
   Vérifier si `sharp` est disponible (`node -e "require.resolve('sharp')"`) ; documenter le
   résultat dans SKILL.md (fallback Playwright si absent — c'est le cas mesuré ce jour).
2. Écrire `scripts/capture.mjs` :
   - Args : chemin de page (local → servi par un petit serveur http intégré sur un port libre ;
     ou URL `http://`/`https://` prise telle quelle), largeurs (`--width 360x740,320x568` par
     défaut), `--dpr <n>`, `--click <sélecteur>` répétable dans l'ordre, `--lang en` (query
     param ou paramètre applicatif à documenter selon ce que le site attend), `--out <dossier>`.
   - Pour chaque largeur : ouvrir la page, exécuter les clics dans l'ordre, capturer un PNG,
     puis évaluer dans la page `document.documentElement.scrollWidth <= window.innerWidth` et
     `scrollHeight <= innerHeight`, collecter les erreurs console et les réponses réseau ≥ 400
     (listeners `page.on('console')` et `page.on('response')` posés AVANT la navigation).
   - Afficher un résumé lisible par largeur (OK/dépassement, nombre d'erreurs).
3. Écrire `scripts/planche.mjs` : assemble 2 ou 3 images (référence | avant | après, avant/après
   seuls si pas de référence) côte à côte en un seul PNG. Utiliser `sharp` si résolu, sinon une
   page HTML statique + Playwright (screenshot du body) — implémenter le fallback réellement,
   pas un stub.
4. Écrire `scripts/sw-update.mjs` : lit `site/js/gen/sw-version.js`, mémorise le contenu ; visite
   1 (contrôleur enregistré) ; modifie la constante (hash factice) ; visite 2 dans le même
   contexte de navigateur (même `storageState`/profil, pour garder le service worker installé) ;
   vérifie qu'un seul `location.reload()` se produit (écouter `page.on('load')` / navigation) et
   qu'il n'y a qu'un seul cache de coquille actif (`caches.keys()` dans la page) ; restaure le
   fichier original dans un `finally`.
5. Écrire `SKILL.md` : frontmatter avec `description` ENTRE GUILLEMETS (pas de `:` non quoté
   dans la valeur). Sections : quand l'utiliser, les 3 commandes avec leurs options exactes,
   chemin de résolution Playwright/sharp, et la règle L-145 explicite : « ouvrir les images
   produites (Read) et écrire la liste de ce qui DIFFÈRE de la référence, jamais ce qui
   ressemble ; liste non vide = pas fini ».
6. Tester réellement les 3 commandes sur `site/index.html` :
   - `capture` sur `site/index.html` en local (360×740 et 320×568), avec
     `--click ".am-porte"` répété pour ouvrir les deux portes de l'armoire visibles à l'accueil.
   - `planche` avec au moins 2 des captures produites.
   - `sw-update` sur le vrai `site/js/gen/sw-version.js` (restauré après coup — vérifier avec
     `git diff` qu'il est identique à l'original après le test).
   Ouvrir (Read) chaque PNG produit, décrire ce qui apparaît, confirmer que rien n'est cassé
   (pas de scroll horizontal, portes bien ouvertes sur les captures post-clic).

## Portes de verification
```bash
node .claude/skills/recette-visuelle/scripts/capture.mjs site/index.html --click ".am-porte" --click ".am-porte" --out c:/tmp/recette-test
node .claude/skills/recette-visuelle/scripts/planche.mjs --out c:/tmp/recette-test/planche.png <images produites>
node .claude/skills/recette-visuelle/scripts/sw-update.mjs
git diff --stat site/js/gen/sw-version.js   # doit être vide après sw-update.mjs
```

## Rapport attendu
Fichiers créés, résultat des 3 commandes (extraits de sortie), confirmation que les PNG ont été
ouverts et ce qu'ils montrent, confirmation `git diff` vide sur `sw-version.js`, limitations
connues (ex. absence de `sharp`), questions ouvertes.
