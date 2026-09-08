# HO-MJ-08 — Coloriage dino (mj-32) · halo blanc autour des traits + cacophonie audio de fin

> Statut : pret · Ouvert le 2026-09-08 · Exécutant : 1 sous-agent Sonnet · Orchestrateur : session principale.
> Origine : retour Papa Yann 2026-09-08 après avoir regardé les dessins sauvegardés de Max dans la galerie.

## Les deux problèmes (mots de Papa Yann)

1. « Tu peux supprimer le contour blanc que tu mets autour des contours, c'est horrible. Regarde les dessins
   enregistrés de Max, c'est moche de ouf. »
2. « Quand il sauvegarde, à la victoire, il y a souvent le son de la victoire plus 2 audios dans 2 langues,
   ce n'est absolument pas clair. Soit ils s'enchaînent, soit il n'y en a qu'un, mais pas les deux en même temps. »

## Diagnostic déjà fait (à vérifier, pas à refaire de zéro)

### 1. Halo blanc

Fichier : `site/mj-32.html`, fonction `buildContourMask` (~ligne 273) et `canFill` (~ligne 463).

Le masque de contour est **dilaté de R = 7 px** (correctif du 2026-08-10, annotation #6389 : micro-trous
dans le trait du Cryolophosaure, le remplissage fuyait du fond vers le torse). Le flood fill s'arrête sur ce
masque dilaté, donc la couleur n'atteint jamais le trait : il reste une **bande blanche de ~7 px** de chaque
côté de chaque trait noir. C'est le « contour blanc » que voit Papa Yann. Le halo est visible dans l'atelier,
dans la vignette galerie (`thumb`) et à la réédition (rejeu des fills sur le lineart).

Contrainte à garder : le masque dilaté a été introduit pour boucher les brèches du trait. On ne doit pas
rouvrir la fuite fond → dino (voir `studio/minijeux/memory/LESSONS.md` et le commentaire dans le code).

Piste recommandée (la plus simple qui marche, à valider par l'exécutant) :
- Garder la **détection** de zone avec le masque dilaté (empêche la fuite).
- Ajouter une **passe d'extension** après chaque flood fill : les pixels de la bande de dilatation
  (masque dilaté = 1, mais lineart original clair, lum ≥ 200) adjacents à la zone remplie prennent la couleur,
  jusqu'au vrai trait. Propagation limitée à R itérations depuis la zone remplie, jamais à travers un pixel
  du trait réel (lum < 200 dans `lineartData`).
- Effet de bord accepté : au droit d'une brèche du trait, la couleur peut baver de R px max de l'autre côté.
  C'est une tache de 7 px, pas une fuite de zone entière. Vérifier sur le Cryolophosaure que ça reste discret.
- Alternative si la passe d'extension est trop lente ou moche : abaisser R et patcher les linearts fautifs
  côté pôle dino (durable, mais hors périmètre de ce handoff : le signaler dans le rapport, ne pas le faire).
- Piège : `resumePiece` / `loadLineart` rejouent `floodFill()` dans l'ordre. L'extension doit être dans
  `floodFill` (ou appelée par lui) pour que la réédition d'une œuvre donne le même rendu que l'atelier.
- Piège perf : 800×600 = 480 000 px. Une passe d'extension par fill doit rester < 50 ms sur P30 Pro.
  Ne toucher que les pixels de la bande (pré-calculer la liste des pixels « bande » une fois au chargement).

### 2. Cacophonie audio de fin

Fichier : `site/mj-32.html`, fonction `finishPainting` (~ligne 536) et `site/js/victory-sounds.js`,
fonction `playEndSound` (~ligne 285).

Au « Fini ! », trois sons partent :
- `playEndSound(1, 1)` → fanfare `victory` **plus** une voix MP3 du casting FR (`SoundPool.voice('positif')`,
  décalée de 1400 ms) ;
- `TTS.speak('Magnifique ! Ton {nom} est superbe !')` immédiatement, en `speechSynthesis` navigateur dans la
  langue courante du site (`?lang=`).

Résultat : fanfare + voix MP3 en français + TTS dans la langue du site, tout en même temps. C'est le
« 2 audios dans 2 langues » de Papa Yann.

Règle cible (choix de Papa Yann, pas de troisième voie) : **jamais deux voix en même temps**. Soit une seule
voix, soit un enchaînement strict.

Piste recommandée :
- Une seule voix : garder la fanfare, supprimer la voix MP3 du pool (`playEndSound` a un timer `_voiceTimer` ;
  soit ajouter une option `{voice:false}` à `playEndSound`, soit appeler `SoundPool.play('victory', 0.85)`
  directement dans mj-32), puis lancer la phrase « Magnifique ! Ton {nom} est superbe ! » **après** la
  fanfare (à la fin de l'`Audio`, événement `ended`, avec repli `setTimeout` si `ended` ne vient pas).
- La phrase nominative reste : c'est la seule qui dit le nom du dino. Elle se joue dans la langue du site.
- Vérifier `site/js/i18n/*` : la clé `mj-32.ui.magnifiqueNom` existe en en/es-es/pt-br (sinon repli FR).
- Ne pas casser les autres jeux : `playEndSound` est partagé par les 36 MJ. Toute modification de sa
  signature reste rétro-compatible (paramètre optionnel, défaut = comportement actuel).
- Voir `game-test-audio` (agent) pour la règle « une seule voix à la fois, MP3 coupe le TTS et inversement ».

## Fichiers possédés

- `site/mj-32.html`
- `site/js/victory-sounds.js` (modification minimale, rétro-compatible, seulement si nécessaire)

Rien d'autre. Pas de `git commit` : l'orchestrateur commite.

## Portes

```
cd studio/minijeux/tests && node audit-gabarit.mjs mj-32 && npm run mj:test mj-32
```

Playwright (serveur statique sur `site/`, package déjà installé dans `studio/minijeux/tests/`) :
1. Ouvrir `mj-32.html`, choisir un dino, remplir 3 zones (tête, corps, fond), capture à 360 px de large.
   **Ouvrir la capture** et vérifier à l'œil : la couleur touche le trait noir, zéro bande blanche.
2. Même chose sur le Cryolophosaure (dino à brèche, annotation #6389) : le fond ne remplit pas le torse.
3. Rouvrir l'œuvre depuis la galerie (« Reprendre en copie ») : rendu identique à l'atelier (capture).
4. Instrumenter les appels audio (stub `Audio.prototype.play` et `speechSynthesis.speak`) et prouver qu'au
   « Fini ! » il n'y a **jamais** deux voix simultanées : la phrase TTS démarre après la fin de la fanfare,
   aucune voix MP3 du pool ne part.
5. `?lang=en` : la phrase de fin est en anglais, une seule fois.

## Rapport attendu

`studio/minijeux/docs/handoffs/rapports/HO-MJ-08-rapport.md` : ce qui a changé (diff résumé), les captures
(chemins), les mesures (temps du flood fill + extension sur un dino), les cas limites vus (brèches),
et ce qui reste (patch des linearts côté dino si pertinent).

Leçons à graver par l'orchestrateur en clôture : `studio/minijeux/memory/LESSONS.md` (un correctif qui
bouche une fuite ne doit pas dégrader le rendu ; deux voix jamais en même temps même à la victoire).
