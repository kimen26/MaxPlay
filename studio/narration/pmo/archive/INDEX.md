# Archive PMO — INDEX

> **Rotation semestrielle des logs PMO** (règle tranchée D6, 2026-07-27) : compresser sans perdre.
> Le **vivant** (`../decisions.md`, `../sprint-log.md`, `../audit-trail.md`) ne garde que le semestre en cours ; le passé est versé ici **verbatim**, jamais réécrit, jamais supprimé.

## Contenu

| Fichier | Contenu archivé | Période | Taille | Archivé le |
|---|---|---|---|---|
| [`decisions-2026-H1.md`](decisions-2026-H1.md) | Toutes les décisions de fond antérieures à 2026-07-01 (y compris les décisions fondatrices d'avril-mai : casting V1, règles d'écriture, architecture cross-culture, PROCESS, panel…) | 2026-04-24 → 2026-06-08 | 3094 l. | 2026-07-27 |
| [`sprint-log-2026-H1.md`](sprint-log-2026-H1.md) | Journal des sessions antérieur à 2026-07-01 | 2026-04-24 → 2026-06-14 | 1894 l. | 2026-07-27 |
| [`audit-trail-2026-H1.md`](audit-trail-2026-H1.md) | **Tout** l'historique d'audit (aucun audit ≥ 2026-07-01 au moment de la rotation) — y compris « Analyse cause racine » (pourquoi tant de désynchros) et « Apprentissages structurels » | 2026-05-12 → 2026-05-21 | 935 l. | 2026-07-27 |

## Règle de rotation

1. **À chaque semestre** (début janvier / début juillet) : verser les entrées du semestre écoulé dans un nouveau fichier `*-YYYY-HN.md`, en tête, **verbatim**.
2. Le fichier vivant garde un bandeau pointeur vers la dernière archive.
3. **Conservées dans le vivant quelle que soit leur date** : les sections d'*état* (ex. « Questions ouvertes (à trancher) », « Propositions en cours » de `decisions.md` ; « Prochaine action » de `sprint-log.md`) — ce ne sont pas des logs mais des tableaux de bord.
4. On ne réécrit jamais une archive : on la consulte. Si une vieille décision redevient d'actualité, on la **cite** dans le vivant avec sa date d'origine et un lien vers l'archive.

## Références entrantes notables (relevé 2026-07-27)

Ces fichiers vivants citent des entrées désormais archivées — le lien `pmo/decisions.md` y désigne donc l'**archive** :

- [`../../cross-culture/doctrine.md`](../../cross-culture/doctrine.md) — cite « Décision 2026-04-29 *Architecture cross-culture du casting* » → dans `decisions-2026-H1.md`.
- [`../../cross-culture/prenoms/INDEX.md`](../../cross-culture/prenoms/INDEX.md) — même décision 2026-04-29 → idem.
- [`../../equipe/INDEX.md`](../..//equipe/INDEX.md) — renvoie génériquement à `../pmo/decisions.md` (les décisions anciennes sont en archive).

> Les renvois génériques « voir `pmo/decisions.md` » restent valables : le bandeau du vivant redirige vers l'archive.
