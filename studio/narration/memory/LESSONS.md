# Leçons process — Narration

> Quelle erreur ne pas refaire. Craft narratif (écriture, structure, voix) → `../equipe/lecons-vivantes.md`, pas ici. Détail complet (contexte, findings) de chaque audit → [`archive/audit-trail-2026-H2.md`](archive/audit-trail-2026-H2.md).

## L-001 — Un fichier de vérité unique pour les chiffres clés, sinon dérive garantie

Les chiffres clés (nombre de versions writers, de lecteurs, de voix) doivent vivre dans **un seul fichier source** référencé par tout le reste. Origine : audit 2026-05-12, dérive "10 vs 20 lecteurs" répétée dans plusieurs fichiers. Application : `pmo/INVARIANTS.md` créé comme source unique.

## L-002 — L'INDEX est le point de découverte unique après reboot

Un INDEX désynchronisé fait rater l'histoire active à qui reprend. Le maintenir à jour n'est pas une corvée annexe, c'est la condition de reprise de session.

## L-003 — Un skill global (userSettings) dérive plus vite qu'un skill projet

Il est "loin" du focus de la session courante ; sans mécanisme dédié de rappel, il se désynchronise silencieusement.

## L-004 — Les agents `.claude/agents/*.md` sont des angles morts du PMO

Une refonte structurelle (ex. `workshop/` → `stories/` en 2026-04-30) met à jour INDEX + PROCESS mais oublie les agents qui référencent les anciens chemins. Règle : après toute refonte structurelle, scanner `.claude/agents/narration-*.md` pour références obsolètes.

## L-005 — Les scripts CLI sont aussi des angles morts du PMO

`new-story.js` avait survécu par chance à une refonte de préfixage (dupliquait un gabarit déjà migré) mais ses messages utilisateur étaient obsolètes. Règle : scanner aussi `scripts/*.js` après toute refonte structurelle.

## L-006 — Validation cross-référence obligatoire après un fix de lien cassé

Corriger une référence cassée sans vérifier que la nouvelle cible existe peut introduire un second lien cassé (observé lors d'un fix dans `patte-narrative-maxplay.md`).

## L-007 — L'agent qui surveille la cohérence doit être le premier auto-cohérent

`narration-pmo.md` s'est retrouvé à affirmer "11 vs 10 étapes" dans deux endroits différents. Depuis : sa première action obligatoire est de lire `INVARIANTS.md`.

## L-008 — Trois audits qui couvrent la même forme peuvent tous rater un défaut de fond

Trois audits successifs (2026-05-13) ont bien vérifié la forme (préfixes, gabarit, refs cassées) mais aucun n'a croisé "INDEX dit X ⇄ kanban dit Y, est-ce cohérent ?" — parce qu'aucune commande n'invoquait le PMO en mode AUDIT fond. Le pattern d'audit doit alterner forme/fond, pas s'empiler en forme+forme+forme.

## L-009 — Une décision recréée n'efface pas la trace de sa suppression antérieure

DEC-PROCESS-002 (2026-05-15) a recréé l'étape 2 (supprimée le 2026-05-12) sans que INVARIANTS.md soit basculé, créant une contradiction interne de 6 jours. Règle : toute modification du PROCESS ou d'un chiffre clé implique une propagation immédiate vers INVARIANTS (DEC-PROPAGATION-INVARIANTS, 2026-05-21).

## L-010 — Un ticket "à faire" qui dort doit être reconfronté au disque avant d'être cité comme bloquant

VOIX-002/VOIX-003 sont restés listés "à faire" pendant des mois alors que le travail était déjà livré et vérifiable dans `voice-map.json`. Toujours vérifier sur pièce avant de répéter un statut de mémoire (même motif que EP-D19 côté dino).

## L-011 — Le travail non commité ne tient qu'à un fil (L-INCIDENT-RESTAURATION)

Incident du 2026-08-10 : une restauration externe du working tree (hors git, mécanisme non identifié) a reverté plusieurs phases de travail non commitées, absorbées ensuite par des commits d'autres sessions. Désormais : proposer le commit des traces PMO **en fin de tour**, pas seulement à la demande.

## L-012 — Timeout MCP transport (~250s) n'est pas une panne du fournisseur (LP-KIMI-MCP-TIMEOUT)

Des writers Kimi "échoués" (socket fermée à 72-97s) n'étaient pas une panne Moonshot mais le plafond de transport MCP Claude Code (~250s max, non configurable). Solution : CLI `infra/mcp/call-llm.mjs` (timeout Bash 540s+, hors transport MCP) pour les générations longues. Ne jamais conclure "panne infra" sans avoir écarté ce plafond.
