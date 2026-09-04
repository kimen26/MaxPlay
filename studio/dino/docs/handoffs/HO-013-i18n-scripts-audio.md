# HO-013 — i18n des Scripts audio (en, es-es, pt-br) + relecture native des lexiques

**Statut :** bloque par HO-012 (FR validé + tags validés = condition posée par Papa Yann)
**Depend de :** HO-012
**Exécutants :** 3 sous-agents Sonnet, 1 par langue (ownership = le dossier de la langue). Jamais deux langues dans la même main.
Priorité d'exécution : les 13 théropodes d'abord (ils partent en génération HO-014), puis le reste.

## Objectif

Pour chaque dino, un `studio/dino/content/scripts-audio/<lang>/<id>.md` au même format que le FR (4 blocs, Narrateur H + Wex,
tags v3 anglais inchangés), écrit comme un auteur NATIF l'aurait écrit pour un enfant de 4 ans de son pays — pas une traduction.
Plus : le lexique de prononciation de la langue relu en natif (les entrées « à relire natif » tranchées).

## Fichiers autorisés (langue L)

- `studio/dino/content/scripts-audio/<L>/<id>.md` (71 fichiers, créer)
- `studio/dino/content/scripts-audio/<L>/NOTES.md` (choix non évidents)
- `studio/dino/content/i18n/lexiques-prononciation/<L>.md` (relecture native : corriger/valider, retirer la mention « à relire natif » quand tranché)

## Hors périmètre

Le FR (`fr/V3/**`), `dinos-data.js`, `strings.json` des langues (déjà validés HO-006 — s'y CONFORMER), les autres langues, toute génération audio.

## Méthode

1. Charger le skill `i18n-contenu` + `studio/dino/content/i18n/_CHARTE-TRADUCTION.md` en entier.
2. Source par dino : `fr/V3/<id>.md` (canon) + `i18n/<L>/strings.json` (les champs déjà traduits et relus : `name`, `region`,
   `comp_taille/comp_hauteur/comp_poids`, `nom_etym`, `fait`… — les comparaisons d'échelle du bloc B REPRENNENT
   `comp_*` de strings.json mot pour mot ; c'est là que vit l'échelle localisée validée). Unités : suivre strings.json
   (EN = impérial converti et validé ; es/pt = métrique).
3. Noms de dinos dans le texte parlé : **forme plate** (arbitrage PY 2026-08-11 : pas de tirets syllabants pour une voix native ;
   EN = nom scientifique brut ; es/pt = forme du lexique dé-tirettée). Le bloc A explique quand même le nom syllabe par syllabe
   à l'oral (« Ti… ra… no… saurio ») — c'est la seule place où les syllabes se détachent, avec des points de suspension, pas des tirets.
4. Tags : même position et même intention que le FR, réajustés si la langue déplace le mot pivot. Liste autorisée identique
   (voir HO-011). Wex : registre enfant natif, pas de `!`.
5. « Papa » → repère natif (Dad / Papá / Papai). « Tritri » reste « Tritri ».
6. Relecture native du lexique : pour chaque entrée flaggée, trancher et justifier en 1 ligne dans NOTES.md.
7. Se relire à voix haute par lot de 10 : une phrase qui « sent la traduction » se réécrit.

## Portes de vérification

```bash
node studio/dino/content/scripts/export/_verif-scripts-audio.cjs <L>            # format, tags, greps, budget (pas de check d'échelle hors FR)
grep -ciE "à relire natif" studio/dino/content/i18n/lexiques-prononciation/<L>.md   # → 0 après relecture
```

## Rapport attendu

Sortie brute des portes, count de fichiers, 5 choix de localisation les plus discutables, endroits où le FR canon semble
fautif (signalés, non corrigés), entrées du lexique modifiées.
