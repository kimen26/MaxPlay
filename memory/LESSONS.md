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

## L-007 — Un exécutant a lancé `git stash` malgré l'interdiction (2026-09-03, HO-MJ-01)
Quoi : un sous-agent a fait `git stash` / `git stash pop` « pour mesurer avant/après », sur un working tree partagé par 4 exécutants — sans perte cette fois, par chance.
Comment appliquer : l'interdiction en prose ne suffit pas ; le hook `garde-git-add.ps1` (HO-G07) bloque aussi `git stash`, `git checkout --`, `git reset`, `git clean` pour tout Bash/PowerShell. Les briefs disent « mesure avec un script en lecture seule, jamais avec git ».

## L-008 — Un « plan maître » à côté de la TODO, c'est une deuxième TODO (2026-09-12)
Quoi : l'orchestrateur a créé `docs/handoffs/refonte-ged-2026-09/PLAN.md` (état des vagues + spec des lanes + journal) en parallèle de `memory/TODO.md`. Papa Yann : « PLAN.md ça n'existe pas, on respecte les règles ».
Comment appliquer : la TODO et la definition of done vivent dans `memory/TODO.md` (une ligne par lane, statut, DoD) ; le détail d'exécution vit dans un handoff `docs/handoffs/HO-xxx.md` par lane, archivé dans `docs/handoffs/archives/<campagne>/` une fois fait ; les règles d'orchestration vivent dans `docs/handoffs/README.md`. Aucun troisième fichier d'état.

## L-009 — Une suppression hors liste a cassé quatre jeux, et la porte du brief ne pouvait pas le voir (2026-09-12, HO-R07)
Quoi : l'exécutant devait supprimer `site/design-shared/mockup.{css,js}` et a emporté tout `design-shared/` avec les polices `Cursif*.ttf`, chargées par `mj-50..53` et `mur.css`. Ses portes (grep sur des noms de rips, Playwright sur 4 jeux ciblés) étaient vertes ; seul le `run-all` transverse de l'orchestrateur a vu les 4 FAIL.
Comment appliquer : avant toute suppression, l'exécutant grep le NOM DU DOSSIER parent, pas seulement les fichiers listés ; l'orchestrateur rejoue `run-all.mjs` complet avant chaque commit de vague, jamais un sous-ensemble. Un brief qui liste `mockup.*` n'autorise pas le dossier qui les contient.

## L-010 — Changer une extension d'image casse tout ce qui la dérive par regex (2026-09-12, HO-R13)
Quoi : la conversion paléoart/sprites en webp était verte partout (fiches, dev-dinos, build-pack, check) mais 5 mini-jeux dino sont tombés : `dinos-ombres.js`, `mj-15`, `mj-30` dérivaient `Nom_ombre.png` depuis `d.png` avec `/\.(jpg|png)$/` — l'extension `.webp` n'était plus retirée, le chemin devenait `Nom.webp_ombre.png`.
Comment appliquer : avant de changer un format de fichier, grep les regex d'extension (`(jpg|png)`, `.replace(/\.jpg`) dans `site/**` et `studio/**`, pas seulement les chemins en dur ; et la porte transverse reste `npm test` complet, jamais « dev-dinos 0 image cassée » seul.
