# STANDARD MINI-JEU MAXPLAY — source de vérité

> Gravé 2026-06-09 après validation Papa Yann sur 2 jeux de référence (`site/mj-gold-a.html`, `site/mj-gold-b.html`).
> Tout nouveau mini-jeu copie ce standard. le workflow MJ (`.claude/rules/mini-jeux.md` § Workflow) génère à partir de là.
> Référence visuelle de propreté : voir les golden + le style `css/style.css` partagé.

## 🔒 CONTRAT MJ v2 (décision Papa Yann 2026-07-19) — OBLIGATOIRE pour TOUT jeu

> Fait foi sur les piliers v1 ci-dessous quand ils divergent (billes → piste golden, confetti maison → bibliothèque MaxFX). Enforcement : `tests/audit-gabarit.mjs` (bloquant pre-push + CI) · `game-mj-reviewer` Section 7 · figée par jeu.

| # | Bloc | Implémentation canonique | Vérifié par |
|---|------|--------------------------|-------------|
| 1 | **Entrée catalogue complète** | `site/js/catalog.js` : `titre` court à impact (≤ 4 mots, l'action du jeu) · `category` = aire pédagogique · `emoji` = miniature PARLANTE (représente l'action, pas générique) · `desc` 1 ligne · `maxStars` · `access` · `status` | audit-gabarit (bloquant) + reviewer (impact/parlant) |
| 2 | **Gabarit shell** | `js/mj-shell.js` via `MJ.init({...})` — entête `.hdr` (← retour + emoji + titre), panneau règle 🧑‍🔬 (`regle:{...}`), bulle 💬 commentaires (cloud.js ordonné auto), consigne audio | audit-gabarit + reviewer |
| 3 | **Progression visible** | piste golden `.mp-track` (`mj-golden.js`, 4/6/8 questions) + étoiles ★★★ selon paliers `_PALIERS-DIFFICULTE.md` | reviewer |
| 4 | **Animation de POINT = bibliothèque** | chaque réponse → `MaxFX.randomPoint(fromEl, pipEl, {result})` — tirage aléatoire dans les styles homologués (`MaxFX.markStyles`). **JAMAIS d'animation maison en jeu.** | reviewer + grep anti ad-hoc |
| 5 | **Victoire = bibliothèque** | fin → `shell.G.showEnd` ; **sans-faute** → `MaxFX.randomFinal(container, {belt})` (tirage dans `MaxFX.starStyles`, 18 styles) ; avec fautes → fin sobre standard, jamais punitive | reviewer |
| 6 | **Extension autorisée UNIQUEMENT par la bibliothèque** | nouvelle célébration = l'ajouter dans `celebrations.js` (`MARKS`/`STARS`) → elle entre d'office dans le tirage de TOUS les jeux. Nouvelle mécanique = passer par `MECANIQUES.md` (étape -1 du workflow) | reviewer + PMO |
| 7 | **Anti-régression** | décisions validées → `figees/mj-XX.md` (LOI) + spec Playwright `tests/mj-XX.spec.mjs` verte avant push | hook figees-injector + harnais |

## Les 5 piliers obligatoires (v1 historique — voir CONTRAT v2 pour les points qui divergent)

| # | Pilier | Implémentation canonique |
|---|--------|--------------------------|
| 1 | **Entête** | `.hdr` (flèche ← + emoji + titre court). Jamais de header inventé. |
| 2 | **Bouton retour** | `<a class="back">` → `back-button.js` injecte la flèche sobre. |
| 3 | **Zone de jeu + mini-sons** | feedback immédiat < 200 ms. Son bon = `sndDing`, raté doux = `sndBuzz`. |
| 4 | **Progression en BILLES** | 8 billes (une par question), couleur selon nb d'essais (voir code couleur). PAS de score chiffré. |
| 5 | **Célébration finale** | confettis (`confettiBurst`) OU défilé bus (`busParade`) + son + phrase + Rejouer/Menu. |

## Code couleur des billes (essais) — PÉDAGOGIQUE, validé Papa Yann

Chaque bille = une question. Sa couleur dit comment Max l'a réussie :

| Essais | Couleur bille | Hex |
|--------|---------------|-----|
| **1er coup** | 🟢 vert | `#00c47a` |
| **2e coup** | 🟡 jaune | `#ffe066` |
| **3e coup** | 🟠 orange | `#F58443` |
| **au-delà / révélé** | 🔴 rouge | `#ff4455` |

La bille de la question courante est neutre (grise) tant qu'elle n'est pas répondue.

## Système d'étoiles & niveaux (validé Papa Yann 2026-06-11, remplace « 8 questions fixes »)

**ÉTOILE = SANS FAUTE** (toutes les questions au 1er coup = toutes les billes vertes). Jouer avec des erreurs ne donne JAMAIS l'étoile (incident : étoile obtenue avec 80 % d'erreurs → corrigé).

| Étoiles acquises | Niveau | Questions | Si sans-faute |
|------------------|--------|-----------|----------------|
| 0 | **Niveau 1** (simple) | **4** | → étoile 1, passe Niveau 2 |
| 1 | **Niveau 2** (plus dur) | **6** | → étoile 2, passe Niveau 3 |
| 2-3 | **Niveau 3** (MAX, on y reste) | **8** | → étoile 3 |

**Implémentation : brique partagée [`site/js/mj-golden.js`](../../../site/js/mj-golden.js)** (`Golden.setup/buildPips/notePip/showEnd`) + styles dans `css/style.css` § STANDARD GOLDEN. Ne PAS dupliquer cette logique dans un jeu.

**Célébration sans-faute** : l'étoile fait un tour d'écran → **bizou à la caméra** (gros plan + 💋 + son pop) → va se ranger dans la **zone de 3 badges** (avancement) → message « Tu as gagné l'étoile niveau N ! Recommence et essaie de gagner la N+1ᵉ ! » + son Mario MP3 réel + confettis/défilé bus.
**Sans étoile** (erreurs) : écran encourageant « Bien joué ! Fais un sans-faute pour gagner l'étoile ! » — jamais punitif.

## Règles d'or NON négociables

- **Questions par niveau : 4/6/8** (pilotées par `Golden.setup`, jamais en dur).
- **ZÉRO score chiffré visible** (règle < 6 ans — `.scorebar` masquée par `style.css`).
- **PAS d'étoile ni d'overlay par bonne réponse** — son discret (`sndDing`) + bille colorée, c'est tout.
- **Zéro pénalité** : `QcmRetry` laisse réessayer, révèle la bonne réponse après 3 erreurs sans punir.
- **Zones tap ≥ 80px** (`var(--min-tap-size)`).
- **100 % local** : aucun CDN de librairie JS (offline-ready pour la PWA). Seule la font Google est tolérée (dégrade gracieusement).
- **Font Nunito + `css/style.css`** partagé.
- **Bus** : toujours `busSVG(color,textColor,num,width)` — JAMAIS d'emoji 🚌 ni de div CSS.

## Ordre canonique des scripts

```
sounds.js · victory-sounds.js · feedback.js · [bus-svg.js si bus] · data.js
· qcm-retry.js · tracker.js · comments.js · back-button.js
```

**`comments.js` est OBLIGATOIRE** (validé Papa Yann 2026-06-11) : injecte la **zone commentaire 💬 dans l'entête** (le parent note en live ce qui marche/bug, dictée vocale incluse). Fait partie du PILIER 1 (entête = flèche ← + 💬 + emoji + titre).

## Célébrations disponibles (PILIER 5)

| Variante | Fonction | Quand |
|----------|----------|-------|
| Confettis denses | `confettiBurst(60)` + `sndBravo()` | défaut doux |
| Défilé de bus | `busParade()` (klaxon inclus) | jeux à thème bus |
| Étoile niveau (Mario) | animation étoile + `sndVictory()` | quand un palier de difficulté est débloqué |

## API briques partagées (ne rien inventer)

- **Sons** : `sndDing` `sndBuzz` `sndBravo` `sndVictory` `sndKlaxon` `sndCount` · `playEndSound(score,max)` `playErrorSound()`
- **Feedback** : `feedback(ok)` (son+overlay) · `confetti()` `confettiBurst(n)` · `busParade(lines,onDone)` · `shakeEl(el)` · `shuffle(a)` `pickRandom(a,n)`
- **QCM** : `QcmRetry.create()` → `QcmRetry.handle(state,ok)` (`outcome`: correct/wrong/reveal/ignored ; `attempts`) → `QcmRetry.revealCorrect(container)`
- **Progression** : `Tracker.logAnswer(ok)` + `Tracker.endSession(correct,total)` (alimente les étoiles)
- **Étoiles** : `Stars.get(id)` `Stars.max(id)` `Stars.isComplete(id)` (lecture seule)
- **Bus** : `busSVG(color,textColor,num,width)` · `LIGNES` (data.js : `{num,color,textColor,name}`)

## Cas particuliers connus

- Un jeu **mj-21 « Peins les bus ! »** existe déjà (catégorie couleurs). Ne pas créer de doublon « peindre le bus » sans le distinguer clairement.
