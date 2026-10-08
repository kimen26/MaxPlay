# HO-T01 — Pop de fin qui chevauche la narration

**Statut :** pret
**Depend de :** —

## Objectif
Le son `pop-apparition.mp3` (étoile/récompense de fin) ne joue plus en même temps qu'une narration encore en cours : une seule voix/son à la fois, comme pour le reste du jeu.

## Contexte a lire d'abord
- `site/js/mj-golden.js` (recherche `pop-apparition` vers la ligne 655, `setTimeout` fixe à 2000 ms ; fonctions `_starFlight`, `_miniStar`, `_discreetStar`)
- `studio/minijeux/tests/run.mjs` — set `LEGACY_VOIX_CHEVAUCHEMENT` (27 jeux listés en tolérance, à vider au fil de la correction)
- Un brouillon de ce correctif a été commencé le 2026-10-01 puis JETÉ (plafond de dépense) : il touchait `_starFlight`, `_miniStar`, `_discreetStar` en plus du timeout fixe. Repartir de zéro sur HEAD, pas de trace du brouillon sur disque.

## Fichiers autorises
- `site/js/mj-golden.js`
- `studio/minijeux/tests/run.mjs` (uniquement le set `LEGACY_VOIX_CHEVAUCHEMENT`)

## Hors perimetre
- Aucune commande git. Aucun fichier hors liste. Ne pas toucher aux autres sets de `run.mjs` (cibles 48 px, fin de maison).

## Travail
1. Remplacer le `setTimeout(2000)` fixe qui déclenche `pop-apparition.mp3` par une attente de la fin réelle de la narration en cours (évènement de fin de lecture TTS/MP3, pas un délai arbitraire).
2. Vérifier `_starFlight`, `_miniStar`, `_discreetStar` : même garde-fou partout où un son/voix peut se superposer à la narration.
3. Pour chacun des 27 jeux de `LEGACY_VOIX_CHEVAUCHEMENT`, rejouer le test ; retirer l'id du set dès qu'il passe sans avertissement de chevauchement.

## Portes de verification
```bash
cd studio/minijeux/tests && node run.mjs
npm test
```

## Rapport attendu
Fichiers modifiés + sortie des portes (le set `LEGACY_VOIX_CHEVAUCHEMENT` doit être vide) + questions ouvertes.
