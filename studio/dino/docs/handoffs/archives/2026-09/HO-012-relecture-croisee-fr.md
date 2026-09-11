# HO-012 — Relecture croisée des 71 Scripts audio FR

**Statut :** bloque par HO-011
**Depend de :** HO-011
**Exécutants :** orchestrateur (porte mécanique) + 1 sous-agent `dino-conseiller` (œil neuf, péda 4 ans + fact-check) par moitié de corpus.

## Objectif

Aucun script ne part en génération avec un défaut du corpus historique (doublon A/D, proie présentée comme danger,
comparaison fausse, référence adulte, tag plaqué, motif épuisé du registre). Verdict PASS par dino.

## Fichiers autorisés

- `studio/dino/docs/handoffs/rapports/HO-012-relecture-<moitie>.md` (rapport du relecteur)
- Le relecteur NE CORRIGE PAS : il liste. L'orchestrateur renvoie au writer du lot ou corrige lui-même les cas triviaux.

## Méthode

1. Mécanique (orchestrateur) : `node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr` → 71 OK.
   Puis `node studio/dino/content/scripts/audio/_md2json-v3.cjs` → 284 JSON, « Tous les blocs OK ».
2. Relecteur (agent) : lire chaque fiche À VOIX HAUTE mentalement comme un papa sur une Lunii. Grille :
   - le NOM est-il au cœur (prononciation + sens), Wex y participe-t-il ?
   - Wex pose-t-il UNE vraie question d'enfant de 4 ans, et obtient-il sa réponse dans le bloc ?
   - bloc D = 100 % neuf ? (rien redit de A/B/C)
   - proies / prédateurs / cohabitations : cohérence interne + vraisemblance (formation, époque)
   - inquiétude toujours rassurée par du VRAI ; prédation dite, jamais gore
   - tags : chacun change-t-il l'oreille ? un `[laughs]` sans rien de drôle = à retirer ; un `[shouts]` de trop = à retirer
   - motifs du registre `_SCENES-VIGNETTES.md` respectés (aucun « Personne ne l'attaquait », « réfléchissait à deux fois »…)
   - 2 fiches voisines ne se ressemblent pas (même famille = pas même structure de réplique)
3. Rendu par dino : PASS / CORRIGER + la liste courte (bloc · réplique · problème · correction proposée).

## Portes de vérification

```bash
node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr
node studio/dino/content/scripts/audio/_md2json-v3.cjs
grep -rniE "\b(max|doudou|peluche|nounours)\b" studio/dino/content/scripts-audio/fr/V3/json/ | wc -l   # → 0
```

## Rapport attendu

Verdict par dino, top 10 des corrections, motifs répétés détectés entre fiches (mot ou image vu 3+ fois).
