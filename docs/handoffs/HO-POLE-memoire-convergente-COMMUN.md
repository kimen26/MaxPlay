# Socle commun des handoffs de pôle « mémoire convergente » (vague 2)

> Lu par HO-MJ-01, HO-DINO-008, HO-NAR-01. Chaque brief de pôle ajoute ses spécificités.
> Convention cible : `~/.claude/rules/memoire-projet.md` (quintette) + décision D-004 de `memory/DECISIONS.md` (racine).

## Cible : `studio/<pôle>/memory/` remplace `pmo/` + l'ancien `memory/`

| Fichier cible | Vient de | Règle de construction |
|---|---|---|
| `memory/INVARIANTS.md` | `pmo/INVARIANTS.md` | déplacé tel quel (normatif, chiffres). Hors quintette mais dans `memory/`. |
| `memory/DECISIONS.md` | `pmo/decisions.md` (+ « designs validés » éventuels) | garde **verbatim** les entrées datées ≥ 2026-08-01 ; le reste part en `memory/archive/decisions-<période>.md` verbatim. En tête : 15 lignes max « Décisions structurantes toujours en vigueur » (ID + titre + lien vers l'archive). Compteur `D-NNN` : si le pôle utilise déjà des IDs (`DEC-…`), on les garde, on ne renumérote jamais. |
| `memory/TODO.md` | `pmo/backlog.md` (tickets ouverts / en cours) | lanes = epics vivants ; un ticket = 1 ligne (ID, titre, statut, date). Tickets fermés → `memory/archive/backlog-fermes-<période>.md` verbatim. |
| `memory/LESSONS.md` | `pmo/backlog.md` § leçons `L-xxx` + leçons dispersées dans decisions/sprint-log | verbatim, numéros conservés, ordre chronologique. Une leçon = quoi + comment appliquer. |
| `memory/MEMORY.md` | `memory/state.md` (si existe) + 3 dernières sessions du `pmo/sprint-log.md` | ≤ 80 lignes : où on en est, chantiers en cours, table « quelle question → quel fichier ». Section `## Journal` = 3 lignes par session récente ; rotation mensuelle vers `archive/journal-AAAA-MM.md`. |
| `memory/CHANGELOG.md` | tickets fermés + figées livrées | nouveau ; ≤ 40 lignes ; point de vue utilisateur (« les photos partent dans la bonne fiche »), groupé par mois. |
| `memory/archive/` | `pmo/sprint-log.md`, `pmo/audit-trail.md`, `pmo/audits/`, `pmo/archive/`, `pmo/_archive/`, tickets fermés, décisions anciennes | verbatim, bandeau standard en tête, `archive/INDEX.md` daté (convention archive de `memory/DECISIONS.md` racine § Doctrine). |
| `memory/audits/` | `pmo/audits/` | déplacé tel quel. |

Ce qui ne bouge PAS : les dossiers `figees/` (dino) et `docs/jeux/figees/` (minijeux) — le hook `figees-injector.ps1` en dépend. `pmo/` est supprimé à la fin (vide).

## Règles

1. **Verbatim** pour tout ce qui est archive (sprint-log, décisions anciennes, tickets fermés, audit-trail). On déplace, on ne réécrit pas, on ne résume pas.
2. **Aucun chiffre volatil** recopié dans MEMORY.md / CLAUDE.md : pointer INVARIANTS ou la source (catalog.js, `_ETAT-DINOS`).
3. **Tous les pointeurs internes au pôle** vers `pmo/…` sont mis à jour (`grep -rn "pmo/" studio/<pôle> --include=*.md`) — SAUF dans les fichiers d'archive. Les pointeurs depuis l'extérieur du pôle (`.claude/`, `CLAUDE.md` racine, autres pôles) sont LISTÉS dans le rapport, pas modifiés (HO-G07 s'en charge).
4. **Scripts** qui lisent/écrivent `pmo/` : `grep -rn "pmo" studio/<pôle> --include=*.{mjs,js,cjs,py,sh,ps1}` → corriger le chemin si le script est dans les fichiers autorisés, sinon lister.
5. **CLAUDE.md du pôle** réécrit ≤ 80 lignes : principes non négociables (inchangés sur le fond) · table « quelle question → quel fichier » (quintette) · « où vit quoi » · pointeurs (INDEX, figees, skills, agents). Supprimer les recopies de process/règles qui vivent ailleurs (pointer). Supprimer « lecture obligatoire du sprint-log » (MEMORY.md suffit). Garder l'avertissement « non re-injecté après /compact ».
6. **AGENTS.md du pôle** (miroir Kimi, ~10 lignes) : mettre à jour les pointeurs `pmo/` → `memory/`.
7. **INDEX.md du pôle** : arbre et chemins mis à jour.
8. `INBOX.md` du pôle : chaque section non distillée est soit distillée (1 ligne TODO / DECISIONS / LESSONS avec `> ✅ Distillé 2026-09-03 → …`), soit archivée verbatim dans `memory/archive/INBOX-<période>.md`. `INBOX.md` ne garde que son en-tête.
9. Le hook Stop `pmo-check` cherche encore une trace dans `pmo/` : ce n'est PAS ton problème (HO-G07), n'écris rien dans `pmo/` pour le satisfaire.

## Portes communes
```bash
P=studio/<pôle>
ls $P/memory/            # INVARIANTS.md DECISIONS.md TODO.md LESSONS.md MEMORY.md CHANGELOG.md archive/ audits/ (+ fichiers propres au pôle listés dans le brief)
test ! -d $P/pmo && echo "pmo/ supprimé"
wc -l $P/memory/MEMORY.md $P/memory/DECISIONS.md $P/memory/TODO.md $P/CLAUDE.md    # MEMORY ≤ 80, DECISIONS ≤ 400, TODO ≤ 150, CLAUDE ≤ 80
grep -rn "pmo/" $P --include=*.md | grep -v "/archive/" | grep -v "_archive/" | grep -v handoffs   # 0
ls $P/memory/archive/INDEX.md
python3 - <<'EOF'
import re,os,glob,sys
P=sys.argv[1] if len(sys.argv)>1 else "studio/<pôle>"
bad=0
for f in glob.glob(P+"/**/*.md",recursive=True):
    if "/archive/" in f or "_archive" in f or "handoffs" in f: continue
    t=open(f,encoding="utf-8",errors="ignore").read()
    for l in re.findall(r'\]\(([^)#\s]+?)(?:#[^)]*)?\)',t):
        if l.startswith("http"): continue
        p=os.path.normpath(os.path.join(os.path.dirname(f),l))
        if not os.path.exists(p): bad+=1; print("CASSE",f,l)
print("cassés:",bad)
EOF
```
Le nombre de liens cassés APRÈS doit être ≤ le nombre AVANT (mesurer les deux, coller les deux).

## Addendum 2026-09-03 (post HO-G02)
- `memory/DOCTRINE.md` racine n'existe plus : son contenu est dans `memory/DECISIONS.md § Doctrine`. Tout pointeur vers `memory/DOCTRINE.md` dans un fichier VIVANT du pôle (INVARIANTS, INDEX, CLAUDE.md, TODO…) est corrigé ; dans une archive, non.
- `memory/ARCHI-REFERENTIEL-CONTENU.md` est désormais `studio/referentiel/docs/ARCHI-REFERENTIEL-CONTENU.md` : même règle.
