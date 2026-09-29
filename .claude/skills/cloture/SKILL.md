---
name: cloture
description: Sequence de cloture de session MaxPlay - memoire gravee, TODO nettoyee, liens verifies, commit avec chemins explicites, gate en commande separee, push seulement si vert. A invoquer explicitement en fin de session ou de chantier, jamais automatique.
disable-model-invocation: true
---

# Cloture de session

Sequence figee pour fermer une session proprement. **Toujours executee par un sous-agent
Sonnet delegue** (jamais par le main agent lui-meme — `memory/LESSONS.md` L-015 : l'orchestrateur
decide et relit, il ne fait pas le travail d'execution). Le main agent invoque cette skill,
delegue la sequence a un sous-agent, puis relit le rapport.

## Pourquoi chaque etape est une commande separee

`memory/LESSONS.md` L-014 : la garde PreToolUse (`.claude/hooks/pre-tool.ps1`) juge une
commande `git push` en comparant l'etat GREEN au HEAD d'AVANT la commande. Un `git commit &&
npm run gate && git push` enchaine laisse passer un commit jamais controle, parce que la garde
ne voit l'etat post-commit qu'apres coup. **Aucune etape ci-dessous ne se chaine avec `&&` a
une autre qui touche git ou le gate.** Chacune est une invocation d'outil separee.

## Sequence (dans cet ordre, sans sauter d'etape)

### 1. Memoire gravee

- `memory/MEMORY.md` (transverse) : ajouter une entree datee (`YYYY-MM-DD`) resumant ou en est
  la session.
- Pour chaque pole touche par la session (`studio/minijeux/`, `studio/dino/`,
  `studio/narration/`) : meme entree datee dans `studio/<pole>/memory/MEMORY.md`.
- Toute correction humaine recue pendant la session et pas encore gravee devient une leçon
  `L-NNN` dans `memory/LESSONS.md` ou `studio/<pole>/memory/LESSONS.md` — prendre le numero en
  RELISANT le fichier au moment d'ecrire, jamais un numero devine a l'avance.

### 2. CHANGELOG en capacites utilisateur

- `memory/CHANGELOG.md` (et pole si pertinent) : une ligne par capacite livree, du point de
  vue de qui utilise l'app — jamais "refactor du module X", toujours ce que la personne voit
  ou entend de nouveau/different.
- Ne pas ecrire de ligne pour du travail interne sans effet utilisateur visible (tests,
  refactor pur) — ce n'est pas l'objet du CHANGELOG.

### 3. TODO nettoyee

- `memory/TODO.md` (et pole) : retirer ou cocher les items realises pendant la session.
- Si un doute existe sur un item ancien, ne pas le trancher a la main ici — c'est le role de
  l'agent `todo-auditor` (invocable separement) de produire un verdict avec preuve avant de
  toucher a un item qu'on n'a pas soi-meme traite cette session.

### 4. Verification des liens

Commande exacte (verifier dans `package.json` § `check` si elle a change) :
```bash
node studio/minijeux/scripts/check-liens-md.mjs docs
```
Un lien casse trouve ici bloque la suite tant qu'il n'est pas corrige ou justifie.

### 5. `git add` — chemins EXPLICITES

**Jamais `git add -A` ni `git add .`** (`memory/LESSONS.md` L-001 : un `git add -A` lance par
une session concurrente peut emporter le staging d'une autre session, le working tree/index
etant partage). Lister chaque chemin modifie par CETTE session :
```bash
git add memory/MEMORY.md memory/CHANGELOG.md memory/TODO.md <autres fichiers touches un par un>
```

### 6. Commit — commande separee

```bash
git commit -m "<type>: <description>"
```
Type conventionnel (`feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`). Pas
d'attribution automatique sauf celle demandee explicitement par le systeme d'attribution en
vigueur pour la session.

### 7. Gate — commande separee

```bash
npm run gate
```

### 8. Verdict du gate

- **Gate vert** → etape 9.
- **Gate rouge** :
  1. `git show HEAD --stat` pour lister les fichiers touches par le commit de cette session.
  2. Comparer au fichier que le gate signale en echec.
  3. Si le fichier fautif **n'est pas** dans la liste de cette session → **ne pas pousser**.
     Signaler clairement au main agent : quel fichier, pourquoi ce n'est pas cette session qui
     l'a casse, et que le commit local reste en attente (il n'est pas perdu, juste pas pousse).
  4. Si le fichier fautif **est** dans la liste de cette session → corriger, refaire un commit
     (jamais un `--amend` par defaut — nouvelle regle globale), relancer le gate en commande
     separee, recommencer l'etape 8.

### 9. Push — commande separee, seulement si vert

```bash
git push
```
Jamais chaine avec le commit ou le gate qui precede.

## Rapport de fin de sequence

Le sous-agent Sonnet delegue rend : liste des fichiers memoire modifies, verdict du
check-liens, hash du commit cree, verdict du gate (vert/rouge + detail si rouge), et si le push
a eu lieu ou non (et pourquoi, si non).
