# HO-N03 — Orchestrateur : purge locale des dossiers de travail images, vérifications, commit

**Statut :** fait
**Depend de :** — (vague 1)

## Objectif
Les 8 dossiers `site/img/dinos/_new-*` (25 Mo, gitignorés, tous promus en canon webp/png) sont vidés ; `studio/minijeux/tests/.artifacts/` purgé via `node scripts/gc.mjs --fix` ; le signalement « audio tiers 290 Mo » de l'audit GED est clos (purgé en vague 0 du 2026-09-12, commit 9561efb4, 0 fichier tracké) ; vague 1 commitée.

## Fichiers
- `site/img/dinos/_new-*/**` (disque local, hors git), `studio/minijeux/tests/.artifacts/**`, `memory/TODO.md`, `docs/handoffs/README.md`, commit de vague.

## Travail
Vérifié avant purge : `_new-ombre/Scelidosaurus_ombre.png` (1254 px, source) ≠ `ombres/Scelidosaurus_ombre.png` (600 px, dérivé canon commité le 2026-09-11) : source promue, pas une version plus récente. Diplodocus `_grok-test` : 2 essais A/B, canon `paleoart/Diplodocus.webp` existe → suppression (HO-N02).
