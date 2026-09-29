# HO-A03 — Agents d'audit TODO/visuel, skill de cloture, CLI GitHub

**Statut :** en cours
**Depend de :** —

## Objectif
Deux nouveaux agents transverses (audit TODO, revue visuelle), une skill `cloture` qui
sequence la fin de session, et la CLI `gh` installee — pour que la cloture de session
(memoire gravee, TODO nettoyee, commit, gate, push) soit reproductible sans que le main
agent la fasse a la main a chaque fois.

## Contexte a lire d'abord
- `memory/LESSONS.md` L-014 (garde PreToolUse ne voit pas un commit+push chaine — jamais de
  commande chainee, `git commit` puis `npm run gate` puis `git push` en 3 commandes separees)
  et L-015 (Opus decide, il ne fait pas le travail — la sequence de cloture doit etre executee
  par un sous-agent Sonnet, pas par le main agent lui-meme)
- `studio/minijeux/memory/LESSONS.md` L-145 (un visuel se juge sur ce qui DIFFERE de la
  cible, jamais sur ce qui ressemble ; verdict FINI seulement si la liste d'ecarts est vide)
  et L-148 (une coquille servie cache-first montre l'ANCIENNE version — a garder en tete pour
  visual-reviewer si un jour il capture des pages avec service worker)
- `.claude/agents/README.md` (catalogue + regle frontmatter : jamais de `:` interne, `—`,
  `×` non quotes dans `description`)
- `.claude/agents/game-test-audio.md` et `.claude/agents/game-mj-reviewer.md` (format agent :
  frontmatter name/description/model/tools, structure 1 goal/1 input/1 output/1 handoff,
  lecture obligatoire, format de sortie, regles PASS/FAIL, mnemonique)
- Agents en parallele sur `.claude/hooks/` et `.claude/skills/recette-visuelle/` (autres
  sessions) — NE PAS toucher a ces chemins

## Fichiers autorises
- `.claude/agents/todo-auditor.md` (creation)
- `.claude/agents/visual-reviewer.md` (creation)
- `.claude/skills/cloture/SKILL.md` (creation)
- `.claude/agents/README.md` (mise a jour catalogue — regenere par script si besoin)
- `scripts/gen-agents-readme.mjs` (lecture seule, pour regenerer la table)

## Hors perimetre
- `.claude/hooks/**` et `.claude/skills/recette-visuelle/**` (agents paralleles dessus)
- Aucune commande git (`add`, `commit`, `push`) — ce handoff n'ecrit pas dans l'index git
- Pas de sous-agent lance par `todo-auditor` (lecture seule stricte)
- `visual-reviewer` ne genere pas lui-meme les captures — il consomme le skill
  `recette-visuelle` (en cours de creation ailleurs), pas de logique de capture dupliquee ici
- Pas de `gh auth login` (interactif — Papa Yann le fera)

## Travail

### 1. `.claude/agents/todo-auditor.md`
- Frontmatter : `name: todo-auditor`, `model: haiku`, `tools: Read, Grep, Glob, Bash`,
  description sans caracteres interdits (relire la regle avant d'ecrire, pas apres).
- Lecture seule stricte, jamais de sous-agent (rappel explicite dans le corps, pas seulement
  dans les tools autorises).
- Entree : un fichier TODO (ex `memory/TODO.md`, `studio/*/memory/TODO.md`) ou une section
  de ce fichier.
- Methode : pour chaque ligne/item avec un ID (ou a defaut la ligne elle-meme) —
  `grep` du mot-cle dans le code/docs concernes, `git log --oneline -- <fichier>` pour voir
  si un commit recent l'a deja traite, comparaison a `site/js/catalog.js` quand l'item parle
  d'un mini-jeu (present au catalogue = probablement livre).
- Sortie : tableau `ID | verdict | preuve`. Verdicts : ENCORE VRAI / DEJA FAIT / PARTIEL /
  OBSOLETE / DOUBLON. Preuve = `fichier:ligne` ou hash de commit court, jamais une affirmation
  sans reference verifiable.
- S'inspirer du format 1 goal/1 input/1 output/1 handoff de `game-test-audio.md`.

### 2. `.claude/agents/visual-reviewer.md`
- Frontmatter : `name: visual-reviewer`, `model: sonnet`, tools en lecture seule (Read, Grep,
  Glob, Bash — pas d'Edit/Write : il n'corrige pas).
- Entree : une image de reference + une ou plusieurs captures a comparer.
- Utilise le skill `recette-visuelle` (`.claude/skills/recette-visuelle/`, en cours de
  creation par une autre session en parallele) pour PRODUIRE les captures — ne pas dupliquer
  cette logique ici ; si le skill n'existe pas encore au moment de la redaction, le referencer
  par son chemin attendu avec une note "verifier qu'il existe avant premier usage".
- Sortie : liste NUMEROTEE des ecarts — ce qui DIFFERE de la reference, jamais ce qui
  ressemble (L-145) — avec severite (CRITIQUE/HAUTE/MOYENNE/BASSE, coherent avec les autres
  agents du repo) et zone (ex "porte gauche", "header", "bas d'ecran a 360px").
- Verdict FINI **seulement** si la liste d'ecarts est vide. Sinon verdict EN COURS + liste.
- Ne corrige jamais, renvoie au sous-agent qui a produit le visuel (a nommer dans le handoff,
  pas dans l'agent lui-meme puisque generique).

### 3. `.claude/skills/cloture/SKILL.md`
- Frontmatter : `name: cloture`, `disable-model-invocation: true` (jamais auto-declenchee,
  seulement invoquee explicitement).
- Sequence, dans cet ordre, executee par un **sous-agent Sonnet delegue** (jamais le main
  agent lui-meme — L-015) :
  1. Entree datee dans `memory/MEMORY.md` (transverse) ET dans le `memory/MEMORY.md` du/des
     pole(s) concerne(s) par la session.
  2. `memory/CHANGELOG.md` (et pole si pertinent) mis a jour en CAPACITES UTILISATEUR (ce que
     la personne voit de plus, jamais "refactor du module X").
  3. `memory/TODO.md` (et pole) nettoyee — items DEJA FAIT/OBSOLETE retires ou coches.
  4. `node studio/minijeux/scripts/check-liens-md.mjs docs` (ou la variante applicable — vérifier
     le script exact dans `package.json` § `check` avant d'ecrire la commande figee).
  5. `git add` avec des chemins EXPLICITES listes un par un — **jamais `-A`** (L-001 : un
     `git add -A` d'une session concurrente peut emporter le staging d'une autre session).
  6. `git commit` seul (message conventionnel).
  7. Commande SEPAREE : `npm run gate`.
  8. Si gate rouge : verifier si le fichier fautif fait partie des fichiers touches par CETTE
     session (`git show HEAD --stat`). Si non → NE PAS pousser, le signaler clairement au
     main agent/utilisateur avec le nom du fichier fautif et pourquoi ce n'est pas cette
     session qui l'a casse.
  9. Si gate vert : commande SEPAREE `git push` (jamais chainee avec le commit — L-014, la
     garde PreToolUse juge une commande sur l'etat AVANT le commit qu'elle contient, donc un
     commit+push dans la meme commande passe un commit jamais controle).
- Rappeler dans le corps de la skill que chaque etape est une commande separee, pas un script
  one-liner avec `&&` — c'est la cause racine de L-014.

### 4. Mise a jour `.claude/agents/README.md`
- Ajouter `todo-auditor` et `visual-reviewer` au tableau du catalogue (colonnes Agent / Modele
  / Pole / Memoire / Skills prechargees / Description).
- Si `scripts/gen-agents-readme.mjs` regenere la table automatiquement depuis les frontmatters,
  le lancer plutot que d'editer la table a la main (le fichier dit explicitement "ne pas
  editer la table a la main").
- Verifier le diagnostic frontmatter (`grep -P '[—×]|: .* :' .claude/agents/*.md`) sur les 2
  nouveaux fichiers avant de considerer l'etape close.

### 5. Installer la CLI GitHub
```
winget install --id GitHub.cli -e --silent --accept-source-agreements --accept-package-agreements
gh --version
```
- Si `gh` n'est pas sur le PATH apres install, essayer `"C:\Program Files\GitHub CLI\gh.exe" --version`.
- **Ne pas lancer `gh auth login`** (interactif). Indiquer dans le rapport la commande exacte
  que Papa Yann devra lancer lui-meme.
- Si l'installation echoue, donner la raison exacte (message d'erreur winget) plutot que de
  reessayer en boucle.

## Portes de verification
```bash
grep -P '[—×]|: .* :' .claude/agents/todo-auditor.md .claude/agents/visual-reviewer.md
node scripts/gen-agents-readme.mjs
cat .claude/agents/README.md | grep -E "todo-auditor|visual-reviewer"
gh --version
```

## Rapport attendu
Fichiers crees/modifies + sortie des portes + statut exact de l'installation `gh` (installe,
version, chemin PATH si non standard, ou raison precise de l'echec) + la commande `gh auth
login` a donner a Papa Yann + questions ouvertes (notamment si `.claude/skills/recette-visuelle/`
n'existait pas encore au moment de la redaction de `visual-reviewer.md`).
