# HO-T04 — Vagues 4 à 6 (architecture transverse)

**Statut :** brouillon — en attente du GO de Papa Yann (coût)
**Depend de :** —

## Objectif
Exécuter les recommandations R14 à R19 de l'audit d'architecture (orchestrateurs sans fichier d'état, agents réécrits, fusion rule/CLAUDE.md, mémoire rationalisée), de bout en bout, une vague à la fois.

## Contexte a lire d'abord
- `docs/research/2026-09-26-archi-recommandations.md` § Vague 4 (R14-R16, lignes ~185-213), § Vague 5 (R17-R19, lignes ~216-242), § Annexe gabarit DoR/DoD (lignes ~243+)

## Fichiers autorises
- À définir par vague au moment du GO — voir la liste « Fichiers » de chaque R14-R19 dans le document source.

## Hors perimetre
- Ne PAS démarrer sans un GO explicite de Papa Yann (coût). Ce brief est un pointeur, pas une autorisation d'exécution.

## Travail
Ne rien faire tant que Papa Yann n'a pas donné le feu vert. Au GO :
1. Découper en 3 sous-chantiers (un par vague : 4, 5, 6 si une vague 6 existe dans une révision ultérieure du document — vérifier qu'il n'y a que 4 et 5 actuellement).
2. Pour chaque R (R14 à R19), suivre le gabarit DoR/DoD de l'annexe du document source.
3. Un commit par vague, portes rejouées par l'orchestrateur.

## Portes de verification
```bash
cd studio/minijeux/tests && node audit-gabarit.mjs
node studio/referentiel/build.mjs
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs
git status --short | grep -v '^??'
```

## Rapport attendu
Sans objet tant que non lancé. Au lancement : suivre le format DoR/DoD du document source.
