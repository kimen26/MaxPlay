# HO-T02 — Fin de partie et cibles tactiles

**Statut :** pret
**Depend de :** —

## Objectif
Tous les mini-jeux listés en tolérance (`LEGACY_FIN_MAISON`, `LEGACY_CIBLES_48`) respectent la règle commune : retour maison en fin de partie, cibles tactiles ≥ 48×48 px.

## Contexte a lire d'abord
- `studio/minijeux/tests/run.mjs` — sets `LEGACY_FIN_MAISON` (11 jeux) et `LEGACY_CIBLES_48`
- `rules/mobile-parents.md` (global, `~/.claude/rules/mobile-parents.md`) — cible tactile 48×48 px, plancher 24×24 avec ≥ 8 px d'espacement

## Fichiers autorises
- Les fichiers `site/mj-*.html` des jeux listés dans `LEGACY_FIN_MAISON` et `LEGACY_CIBLES_48`
- `studio/minijeux/tests/run.mjs` (uniquement ces deux sets)

## Hors perimetre
- Aucune commande git. Ne pas toucher au set `LEGACY_VOIX_CHEVAUCHEMENT` (HO-T01, en parallèle — ne pas se marcher dessus sur `mj-golden.js`).

## Travail
1. `LEGACY_FIN_MAISON` (11 jeux) : vérifier que la fin de partie ramène bien à l'écran maison/accueil ; corriger sinon.
2. `LEGACY_CIBLES_48` : cas connus déjà identifiés —
   - mj-21 : bouton Indice à 94×33 px → passer à ≥ 48×48 px
   - mj-32 : cible(s) sous la norme, à mesurer et corriger
   - mj-38 : bouton Recommencer à 143×44 px → hauteur ≥ 48 px
   - index (accueil) : flèche à 44×44 px → ≥ 48×48 px
3. Pour chaque jeu corrigé, retirer son id du set correspondant.

## Portes de verification
```bash
cd studio/minijeux/tests && node run.mjs
npm test
```

## Rapport attendu
Fichiers modifiés + sortie des portes (les deux sets doivent être vides ou réduits, lister ce qui reste et pourquoi) + captures 360 px / 320 px des jeux touchés.
