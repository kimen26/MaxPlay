# Brainstorm gamification — playtest 2026-07-25

> Rapport game-conseiller (Opus), commandé par Papa Yann après le playtest du 25/07.
> Observations : navigation pas claire · sortie avant la fin · trop facile · aimant = encyclopédie dino.
> Décisions en attente : Q1/Q2/Q3 en fin de document.

## 1. Diagnostic des 4 observations

### Obs. 1 — « C'est pas clair ce qu'on trouve où »
Le Mur v2 est une **liste de personnages**, pas une **carte de contenus**. Un enfant de 4 ans en phase préopératoire ne fait pas l'inférence « Spino = compter ». Les rangées portent `c-domaine` mais c'est du **texte** (règle gravée : texte jamais seul — toujours icône + audio ; violée sur l'info principale du menu). L'entrée est un **drag exclusif** (choix PY 2026-07-22) : joli mais **cache le contenu jusqu'à ce qu'on soit dedans**. Zéro aperçu = zéro carte mentale.

### Obs. 2 — Il sort avant la fin
Cause structurelle : **la récompense est intégralement à la fin, et elle est binaire** (mj-golden : sans-faute → étoile ; une erreur → rien).
- **Dès la 1ère erreur, la partie est vide de tout enjeu.** Un enfant de 4 ans joue pour ce qui arrive maintenant. La pastille orange lui dit : c'est fichu. Rationnellement, il sort. C'est une **lecture correcte du système d'incitation**, pas un défaut d'attention.
- **Rien n'est perdu en sortant** : aucun état intermédiaire sauvegardé.
- **Niveau 3 = 8 questions** d'affilée sur la même mécanique : haut de la fourchette d'attention dirigée.

Mécanisme profond : « étoile = sans-faute » est une **conditionnalité à seuil** — exactement l'anti-pattern gravé dans rules.md (« Récompenses promises ❌ tue la motivation intrinsèque ; Récompenses surprises ✅ sans promesse »).

### Obs. 3 — Trop facile
Deux mécanismes distincts :
- **(a) Difficulté verrouillée par les étoiles** : `Golden.setup` fait `level = min(2, Stars.get(id))`, or l'étoile n'arrive qu'au sans-faute. Un enfant qui joue bien mais tape à côté une fois reste **indéfiniment au niveau 1**. Combiné à l'obs. 2 (sortie avant la fin → 0 session → 0 étoile) : il est probablement **enfermé au niveau 1 partout**. Explication principale du « trop facile ».
- **(b) Calibrage de base sous le profil** : additions dans les milliers vs niveau 1 ciblant 1-10.

### Obs. 4 — L'aimant dino
L'encyclopédie est le seul contenu **non évaluatif** (rien à réussir), **inépuisable** (62 dinos), **auto-dirigé** (attention auto-initiée = 2-3× l'attention dirigée), **dense en contenu réel** (pas des étoiles abstraites).
**Il vient chercher du contenu, pas de la performance.** Conclusion produit : **brancher la sortie des mini-jeux sur l'entrée de l'encyclopédie. Jouer doit produire du dino.**

## 2. Les 12 idées (impact/effort)

### Tranche A — Correctifs à faire d'abord (effort S, impact structurel)
- **A1. Découpler difficulté et étoiles** : niveau calculé depuis la progression réelle (tracker : parties + taux de réussite, ex. ≥80 % sur 2 parties → +1), l'étoile reste le trophée sans-faute. ZPD : la difficulté suit la compétence, pas la perfection.
- **A2. Sauver la partie en cours** : sortir à la question 5 conserve l'état. Coût doux à l'abandon + sessions fractionnées (micro-épisodes 3-5 min).
- **A3. Récompenser la progression** : fin non-parfaite = acquis réels de la partie + compliment de processus, plus jamais « si tu fais un sans-faute... » (rappel de manque).

### Tranche B — Le cœur : jouer nourrit la collection dino
- **B1. Les fossiles (M)** : chaque bonne réponse → fragment de fossile (⅓-¼ de dino). Complet → la bête rejoint TA collection dans l'encyclopédie (sprite, nom, cri, fait). Récompense continue, pendant la partie, non conditionnelle. Quitter à la question 5 coûte enfin quelque chose de réel. Réutilise DINO_ASSETS + MaxFX.markPoint. Vigilance : à surveiller au playtest (jouer *pour* les fossiles = signal).
- **B2. Collection visible sur le Mur (S)** : bandeau silhouettes — acquises en couleur, manquantes en ombre, tap → fiche. Doctrine « Garage » de rules.md jamais implémentée. Progression visible (règle d'or n°10).
- **B3. La fouille du jour (S)** : un dino « en cours de fouille » quotidien + les 2-3 jeux qui donnent ses fragments. Raison de revenir demain sans streak (interdit avant 7 ans). Plomberie = pins.gameOfDay + dayIndex, existante.

### Tranche C — Lisibilité du menu
- **C1. Aperçu du contenu dans la rangée (S)** : 3 vignettes miniatures des jeux par rangée copain. Le dict VIGNETTES existe déjà, seulement affiché après entrée. Coût quasi nul.
- **C2. Le tap ouvre aussi le repaire (S)** : garder le drag (geste signature), accepter le tap (acquis à 2 ans ; drag court = geste fragile à 3.5-4 ans, aujourd'hui seule porte du produit). ⚠️ Contredit décision PY 2026-07-22 → Q2.
- **C3. Le copain dit ce qu'il a (S)** : tap tête → phrase (c.phrase existe) + vignettes animées. ⚠️ Bloqué par « aucun audio dans les menus (attente GO parent) » → Q3.

### Tranche D — Storytelling / objectifs (après)
- **D1. Les expéditions (M)** : chemin de 4-5 étapes = 4-5 jeux différents, arrivée = un gros dino. Objectif moyen terme + interleaving. Premier pas vers WexWorld. Réutilise la logique de chaîne d'unlock (désactivée 2026-07-22, code en historique).
- **D2. Le copain accompagne dans le jeu (M)** : le copain du repaire présent pendant la partie, réagit, donne l'indice au 3e essai à la place du 💡 anonyme. Les copains sont aujourd'hui des portes, pas des personnages.
- **D3. Les cartes-surprises (S)** : ~1/6 bonne réponse → carte-dino avec un fait rigolo. Jamais annoncé (seule forme de récompense validée sans réserve par rules.md ; cousin du klaxon prout 1/20).
- **D4. Le carnet du paléontologue (M)** : récit de ses découvertes (dinos trouvés, expéditions, jours de fouille) — du récit, jamais des chiffres/stats. Sert le co-apprentissage (ce qu'il montre le soir).

## 3. Top 3 recommandé — la boucle complète

**A1+A2+A3 → B1+B2+B3 → C1**, dans cet ordre (une seule boucle cohérente).

```
J'arrive sur le Mur
  → bandeau collection : 11 dinos en couleur, 51 en ombre (B2)
  → « Aujourd'hui on fouille le Tricératops ! » + les 2 jeux qui le donnent (B3)
  → je vois les vignettes, je sais où je vais (C1)
Je joue
  → chaque bonne réponse = 1 fragment de fossile (B1)
  → 1 erreur ne casse rien (A3) · niveau = ma compétence (A1) · si je sors, la partie m'attend (A2)
Je finis
  → fossile complet : le dino sort de terre, il crie → « Il est dans ton encyclopédie ! »
  → sans-faute ? étoile en bonus surprise, jamais promise (A3)
Je reviens
  → 51 ombres manquantes · demain un autre dino en fouille · l'encyclopédie que j'aime grossit quand je joue
```

Ce qu'on perd / risques : 2 monnaies (étoiles+fossiles, mitigation = étoile discrète) · le sans-faute perd son statut de moteur (voulu) · B1 touche mj-golden = tous les jeux golden (flag + test sur 2-3 jeux d'abord) · dépendance dino (concevoir le moteur de collection **thématiquement neutre** — fossile aujourd'hui, véhicule demain, cf. project_maxplay_v0_grand_public).

## 4. Les 3 questions à trancher (PY)

- **Q1** — L'étoile sans-faute reste moteur principal, ou rétrogradée en trophée discret (fossile = récompense visible) ?
- **Q2** — Le tap ouvre-t-il le repaire à côté du drag (défiger la décision 2026-07-22) ?
- **Q3** — GO pour une voix dans les menus (tap copain → phrase), ou tout-visuel ?

## Handoff si GO
1. PY tranche Q1/Q2/Q3 → 2. game-pmo grave + tickets → 3. game-dev : A1+A2+A3 (~1 session, playtestable seul — si le « trop facile » disparaît avec A1, diagnostic confirmé avant d'investir dans B) → 4. game-conseiller : spec fossiles (barème, dino↔jeu, neutralité thématique) après playtest A → 5. game-mj-reviewer sur B1 (bibliothèque partagée, CONTRAT v2).

Fichiers leviers : `site/js/mj-golden.js` (setup L42-50, showEnd L137-203) · `site/js/mur.js` (VIGNETTES L120-148, armDrag L366) · `site/js/stars.js` · `site/js/pins.js` (gameOfDay) · `site/js/dinos-assets.js` · `studio/minijeux/memory/rules.md` (tableau gamification, core loop Garage).
