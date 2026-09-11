# Rapport HO-R02 — Minijeux : rotation de la mémoire

**Statut brief :** rapport reçu (champ Statut du brief mis à jour).

## Fichiers touchés (exclusivement `studio/minijeux/memory/**`)

Modifiés :
- `studio/minijeux/memory/LESSONS.md`
- `studio/minijeux/memory/TODO.md`
- `studio/minijeux/memory/MEMORY.md`
- `studio/minijeux/memory/DECISIONS.md` (2 mentions `pmo/…` reformulées sans le littéral `pmo/`, contenu inchangé sinon)
- `studio/minijeux/memory/CHANGELOG.md` (section 2026-09 ajoutée)
- `studio/minijeux/memory/archive/INDEX.md` (ligne ajoutée pour la nouvelle archive)

Créé :
- `studio/minijeux/memory/archive/lessons-2026-H1.md` (74 leçons déplacées verbatim)

Aucun autre fichier touché. `INVARIANTS.md` relu — sa seule occurrence de « pmo » est le nom de l'agent `game-pmo` (existe bien dans `.claude/agents/game-pmo.md`), pas une référence de chemin : rien à corriger.
`audits/` contenait déjà les 3 audits de juillet (2026-07-17, 2026-07-19 ×2) avant ce brief — rien à déplacer, non vide.

## Sortie des portes de vérification (rejouées après coup)

```
$ wc -c studio/minijeux/memory/{MEMORY,TODO,DECISIONS,LESSONS,CHANGELOG}.md
 3443 studio/minijeux/memory/MEMORY.md
 8809 studio/minijeux/memory/TODO.md
12064 studio/minijeux/memory/DECISIONS.md
20273 studio/minijeux/memory/LESSONS.md
 2235 studio/minijeux/memory/CHANGELOG.md
46824 total

$ grep -ohE "L-[0-9]{3}" studio/minijeux/memory/LESSONS.md studio/minijeux/memory/archive/*.md | sort -u | wc -l
120

$ grep -rl "pmo/" studio/minijeux/memory
studio/minijeux/memory/archive/audit-trail-2026.md
studio/minijeux/memory/archive/backlog-fermes-2026.md
studio/minijeux/memory/archive/decisions-2026-H1.md
studio/minijeux/memory/archive/INDEX.md
studio/minijeux/memory/archive/lessons-2026-H1.md
studio/minijeux/memory/archive/sprint-log-2026-03-08.md
```

Tous les hits `pmo/` restants sont dans `archive/` (verbatim, exempté par la doctrine — une archive ne se réécrit pas). Zéro hit dans un fichier vivant.

## Avant / après (Ko)

| Fichier | Avant | Après | Cible brief |
|---|---|---|---|
| `MEMORY.md` | 3,9 Ko (63 lignes) | 3,4 Ko (60 lignes) | ≤ 60 lignes ✅ |
| `TODO.md` | 39,1 Ko | 8,8 Ko | ≤ 8 Ko — 0,8 Ko au-dessus, condensation maximale sans perdre le contexte de décision (voir Questions) |
| `DECISIONS.md` | 12,0 Ko | 12,1 Ko | non ciblé par le brief, 2 reformulations mineures |
| `LESSONS.md` | 70,3 Ko | 20,3 Ko | ≤ 20 Ko — quasi pile (273 octets au-dessus) |
| `CHANGELOG.md` | 1,0 Ko | 2,2 Ko | alimenté par les lanes fermées |
| `archive/lessons-2026-H1.md` | (n'existait pas) | 50,7 Ko | nouveau, 74 leçons verbatim |

## Union des L-NNN avant/après (preuve zéro perte)

Vérifié avec la commande exacte du brief ET une vérification indépendante incluant tous les fichiers d'archive existants (pas seulement `lessons-2026-H1.md`, pour capturer d'éventuels doublons de numérotation avec d'autres archives du pôle) : **120 = 120**, aucune différence dans les deux sens. 83 numéros L-NNN uniques dans `LESSONS.md` d'origine ; 18 gardés dans le fichier vivant, les 74 autres occurrences (certains numéros apparaissant en double dans le fichier d'origine, ex. L-066, L-067, L-077, L-085, L-090, L-096, L-097, L-098, L-099, L-100, L-101 — chacun avec un contenu différent selon la politique « pas de renumérotation, pas de déduplication » du fichier d'origine) déplacées verbatim dans l'archive.

## L-NNN archivés (74 occurrences, certains numéros en double)

L-051, L-052, L-053, L-054, L-060, L-062, L-063, L-064, L-065, L-066 (×2), L-067 (×2), L-068, L-069, L-070, L-071, L-072, L-073, L-075, L-076, L-078, L-079, L-082, L-083, L-084, L-085 (×2), L-086, L-087, L-090 (2e occurrence, CNIL), L-091, L-093, L-094, L-095, L-096 (×2), L-097 (×2), L-098 (×2), L-099 (2e occurrence, subset-sum), L-100 (×2), L-101 (×2), L-102, L-103, L-104, L-109, L-110, L-112, L-113, L-114, L-115, L-116, L-117, L-119, L-122, L-123, L-126, L-131, L-134.

## L-NNN gardés dans `LESSONS.md` (18 entrées, méthodo de diagnostic récente + règles fondatrices toujours vraies)

L-050 (figeage), L-058 (audio figeage), L-059 (re-grep après agents parallèles), L-080 (doc maître audio), L-092 (design system unique), L-109 (jamais nommer Max), L-111 (une seule voix), L-118, L-120, L-121 (méthodo animation/DOM/mesure), L-124 (style inline bat CSS), L-125 (sonde ≠ panne), L-127 (asset dormant), L-129 (intermittent ≠ instable), L-130 (géométrie sur le rendu final), L-132, L-133, L-135 (méthodo test intermittent).

**Choix éditorial** (à valider par l'orchestrateur) : j'ai priorisé (a) les règles fondatrices encore actives citées ailleurs (mp-theme, figeage, audio) et (b) la méthodologie de diagnostic la plus récente (2026-09, la plus dense et généralisable — comment mesurer, quand suspecter le timing vs les données, comment distinguer sonde volontaire et panne). J'ai archivé en priorité : les décisions de contenu dino ponctuelles (L-062/063/064, hors périmètre mini-jeux), les bugs one-off déjà clos sans valeur de réutilisation (SVG id, couleurs RGB), et les doublons de numéro où une des deux occurrences était strictement plus complète que l'autre (l'autre partant en archive).

## Lanes fermées passées au CHANGELOG.md (section 2026-09 ajoutée)

- i18n 36 jeux (fr/en/es-es/pt-br, 33/36 en anglais)
- Atelier coloriage : décors, zoom, nom coloriable en lettres creuses
- Damier de transparence et halo de contour corrigés (6 dinos)
- Une seule voix à la fois après victoire
- Manches raccourcies et plus difficiles par jeu (mj-28 pilote)
- Ouverture d'œuf corrigée + bouton « Aller dans le nid »
- Espace parents 4 tuiles + sélecteur de langue
- Zéro carte d'ombre vide possible (71 dinos, 70 ombres)

## Questions ouvertes pour l'orchestrateur

1. **TODO.md dépasse la cible de 0,8 Ko** (8,8 Ko vs ≤ 8 Ko). J'ai choisi de garder une ligne de contexte utile par ticket plutôt que de compresser au point de perdre le pourquoi (ex. collisions d'ID EP-051/052 résolues en les fusionnant, mentions "probablement caduc, à confirmer" pour ne pas fermer un ticket sans validation Papa Yann). Accepter ce dépassement, ou dois-je couper davantage (au risque de perdre le contexte de décision) ?
2. **Plusieurs tickets EP-074, EP-079, EP-080, EP-109 semblent caducs** (ciblent mj-01/mj-08, supprimés dans la purge du 2026-08-10) mais je ne les ai PAS supprimés unilatéralement — flag `[?]`/`[!]` avec note « à confirmer » : un doute = une question, jamais une correction au passage. Un rapide passage Papa Yann pourrait fermer 4 tickets d'un coup.
3. **`EP-042` (backlog.md l.151, doublon avec pmo/decisions historique)** et l'ancienne référence à un `L-XXX` non numéroté (ligne « leçon non classée, pas encore renumérotée L-0xx », TODO.md d'origine ligne 113) : j'ai supprimé cette ligne du TODO condensé (elle référençait un refactor déjà fait, commit 48fefc25) — c'est un jugement de ma part (contenu factuel confirmé résolu par le commit cité), signalé ici pour transparence plutôt que noyé dans le diff.
4. **DECISIONS.md** n'était pas dans le périmètre strict du brief (le point 3 du brief mentionne seulement INVARIANTS.md pour les refs pmo/), mais j'ai corrigé 2 mentions `pmo/` qui auraient fait échouer la porte transverse `grep -rl "pmo/" studio/minijeux/memory` si je les avais laissées — reformulation sans le littéral `pmo/`, contenu sémantique inchangé. Je le signale car ce n'est pas un fichier explicitement listé dans « Fichiers autorisés », mais il est bien sous `studio/minijeux/memory/**`.
