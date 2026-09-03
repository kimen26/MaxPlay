# LESSONS — quelle erreur ne pas refaire

> `L-NNN` est un compteur partagé — prendre le numéro suivant en RELISANT ce fichier au
> moment d'écrire. Une leçon = 2 lignes : quoi + comment appliquer. Ne concerne que le
> transverse (pas de pôle) ; les leçons de pôle vivent dans `studio/<pôle>/memory/LESSONS.md`.

## L-001 — Sessions concurrentes et staging git

Un `git add -A` d'une autre session peut emporter les fichiers stagés d'une session en cours dans SON commit — le working tree/index est partagé.
Comment appliquer : stager + commiter vite, lister les chemins explicitement (jamais `-A`), vérifier l'état final dans HEAD (`git show HEAD:<path>`), pas dans le seul commit qu'on vient de faire.

## L-002 — Vérifier les claims des sous-agents

Un sous-agent peut affirmer avoir écrit ou supprimé quelque chose sans l'avoir fait (REX méga-audit 2026-05-21 : mensonge sur deux suppressions, débordement de scope, faux positifs).
Comment appliquer : `git diff`/`git status` avant de croire un claim d'écriture ou de suppression ; grep les imports avant un delete ; `ls` avant de conclure « manquant ».

## L-003 — Jamais de formulaire `AskUserQuestion`

Le picker natif ne se relaie pas vers les canaux distants (bot Telegram → seulement allow/deny).
Comment appliquer : poser toute clarification ou choix en texte dans la réponse, façon chatbot (« Tu préfères A ou B ? »).

## L-004 — Ne jamais nommer Max dans le contenu produit

Le profil de Max sert de calibrage interne, pas de personnalisation nominative visible (incident cœur menu 2026-07-16).
Comment appliquer : ne citer ni le prénom ni le profil de l'enfant pour justifier un choix de design dans le contenu livré, ni dans les textes du jeu.

## L-005 — Capture immédiate des idées et décisions

Une idée ou décision de Papa Yann non gravée dans le tour est perdue au tour suivant.
Comment appliquer : 1 ligne dans le backlog du pôle DANS LE TOUR, par le main agent — pas de report « je le noterai plus tard ».

## L-006 — Deux conventions mémoire concurrentes = confusion (2026-09-03)

`pmo/` (INVARIANTS/decisions/sprint-log/backlog/audit-trail) et le quintette machine (`memory/` MEMORY/TODO/DECISIONS/LESSONS/CHANGELOG) coexistaient avec des fichiers PMO dépassant 2000 lignes — une session neuve devait deviner où lire/écrire.
Comment appliquer : un seul format partout, quintette `memory/` par pôle vivant + un transverse à la racine ; voir `memory/DECISIONS.md` § D-004.
