# HO-G07 — Hooks + rules amincies + CLAUDE.md racine (post-vague 2)

**Statut :** bloque par vague 2 (HO-MJ-01, HO-DINO-008, HO-NAR-01)
**Depend de :** rapports de vague 2 (listes « pointeurs extérieurs à corriger »), collés en annexe de ce brief par l'orchestrateur avant lancement.

## Objectif
Les hooks, les rules et le CLAUDE.md racine connaissent les nouveaux chemins `memory/` des pôles ; chaque rule path-scopée fait moins de 60 lignes et ne recopie plus ce qu'un skill ou un document source dit déjà ; un hook refuse `git add -A` ; le hook de diagnostic `InstructionsLoaded` a servi et est retiré.

## Contexte a lire d'abord
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 points 1, 7, 15, 18 ; § 4
- Doc officielle : rules path-scopées rechargées à chaque fichier matché (chaque ligne est payée plusieurs fois) ; hooks `command` exit 2 = bloquant ; `PreToolUse` avec `if: "Bash(git add *)"`.
- Modèle de rule courte : `.claude/rules/narration-craft.md` (réécrite par HO-G06)
- `C:/tmp/instructions-loaded.log` (produit par le hook diag posé en HO-G01) : quelles rules se sont chargées, pour quel fichier, pourquoi.
- Annexe (bas de ce fichier) : pointeurs à corriger remontés par les 3 pôles.

## Fichiers autorises
- `.claude/hooks/**` (dont création `garde-git-add.ps1`), `.kimi-code/hooks/**` (parité des messages, check 7 du skill env-compat-check)
- `.claude/rules/**`
- `.claude/settings.json` (clé `hooks` seulement : ajout du hook garde-git-add, rien d'autre) et `C:/Users/kimen/.claude/settings.json` (retrait du hook `InstructionsLoaded` seulement)
- `CLAUDE.md` racine
- `.claude/skills/nouveau-dino/SKILL.md`, `.claude/agents/*.md` : **uniquement** les lignes contenant `pmo/` → `memory/` (pas le fond : HO-G12 s'en occupe)

## Hors perimetre
- Les pôles (`studio/**`), `site/**`. Aucune commande git.

## Travail
1. **Hooks** : `pmo-check.ps1` — les motifs `trace` deviennent `studio/<pôle>/memory/` (+ `figees/` inchangé) ; message d'erreur mis à jour (« graver dans `studio/<pôle>/memory/` : TODO.md / DECISIONS.md / LESSONS.md / MEMORY.md § Journal »). `signal-detector.ps1` — `pmo/backlog.md` → `memory/TODO.md`, rappels alignés. `figees-injector.ps1` — inchangé sauf si un chemin `pmo/` subsiste. Porter les mêmes changements dans `.kimi-code/hooks/*.kimi.ps1` (messages identiques).
2. **Nouveau hook** `garde-git-add.ps1` : `PreToolUse` matcher `Bash|PowerShell`, bloque (exit 2 + message) toute commande contenant `git add -A`, `git add .`, `git add --all`, `git commit -a` ; laisse passer le reste. Déclarer dans `.claude/settings.json`. Tester dans les deux sens (commande bloquée, commande légitime passe) avec un JSON d'entrée simulé via stdin.
3. **Diag** : lire `C:/tmp/instructions-loaded.log`, conclure pour `audio.md` et `personnages.md` (chargées au launch = BOM avait cassé le frontmatter, ou au match = OK), l'écrire dans le rapport, puis retirer le hook `InstructionsLoaded` de `~/.claude/settings.json`.
4. **Rules amincies** (chacune < 60 lignes, 0 recopie) :
   - `audio.md` (133) : garder voie MCP impérative, règles MILITAIRES (5-8 lignes), pointeurs skills globaux + `tts-pipeline`/`audio-verif` (nouveaux) + `_VOICE-IDS-CASTING.md`. Supprimer le résumé des « 20+ anti-patterns » et « Multi-culture » (vivent dans le skill).
   - `mini-jeux.md` (235) : garder ⛔ AVANT DE MODIFIER (figées), harnais obligatoire (commandes), bus SVG/couleurs (4 lignes), contrat MJ v2 → pointer `studio/minijeux/docs/STANDARD-MJ.md` (source unique posée par HO-MJ-01) au lieu de le recopier ; gabarit mj-shell → pointer.
   - `personnages.md` (113), `univers.md` (108) : garder les règles dures (casting figé 5 lignes, univers implicite, surnoms, gabarit), pointer `personnages/INDEX.md`, `cross-culture/doctrine.md`, `memory/INVARIANTS.md` narration pour le reste.
   - `tile-tools.md` (88), `stories-process.md` (83), `sons.md` (68), `dino.md` (58), `lunii.md` (31), `narration-craft.md` : vérifier < 60 lignes, chemins `pmo/` → `memory/`, liens valides.
   - Toute matière retirée d'une rule qui n'existe NULLE PART ailleurs (vérifier par grep avant de couper) est déplacée dans le document source correspondant (STANDARD-MJ, skill, INVARIANTS) — jamais perdue. Table dans le rapport : bloc retiré → où il vit désormais.
5. **CLAUDE.md racine** (107) : table de routage inchangée ; ligne « Après correction utilisateur → leçon dans … » : `memory/LESSONS.md` du pôle ; tableau « Fichiers transversaux » déjà refait par HO-G02 (vérifier) ; ajouter une table « Portes de vérification » (5 lignes : harnais MJ `npm run mj:test`, liens `.md`, compteurs narration, `_ETAT-DINOS`, hooks) ; ≤ 100 lignes. Le hook `sync-agents-md.py` régénère `AGENTS.md` : vérifier qu'aucune substitution SUBS n'a cessé de matcher (sinon adapter SUBS dans le hook).
6. **Annexe** : appliquer chaque pointeur listé par les pôles (agents, skill nouveau-dino, rules).

## Portes de verification
```bash
for f in .claude/rules/*.md; do echo "$(wc -l <$f) $f"; done | awk '$1>60{print "TROP LONG",$0} END{print "ok"}'
grep -rn "pmo/" .claude CLAUDE.md --include=*.md --include=*.ps1 --include=*.py | grep -v _archive   # 0
echo '{"tool_name":"Bash","tool_input":{"command":"git add -A"}}' | powershell -NoProfile -File .claude/hooks/garde-git-add.ps1; echo "exit=$?"   # 2
echo '{"tool_name":"Bash","tool_input":{"command":"git add CLAUDE.md"}}' | powershell -NoProfile -File .claude/hooks/garde-git-add.ps1; echo "exit=$?"   # 0
python3 -c "import json;json.load(open('.claude/settings.json'));json.load(open('C:/Users/kimen/.claude/settings.json'));print('json ok')"
grep -c InstructionsLoaded C:/Users/kimen/.claude/settings.json   # 0
wc -l CLAUDE.md   # <= 100
python3 .claude/hooks/sync-agents-md.py <<< '{"tool_input":{"file_path":"c:\\ProjetsPerso\\Claude_Projects\\MaxPlay\\CLAUDE.md"}}'   # « miroir à jour », 0 substitution manquée
python3 - <<'EOF'
import re,os,glob
bad=0
for f in glob.glob(".claude/**/*.md",recursive=True)+["CLAUDE.md"]:
    t=open(f,encoding="utf-8",errors="ignore").read()
    for l in re.findall(r'\]\(([^)#\s]+?)(?:#[^)]*)?\)',t):
        if l.startswith("http"): continue
        p=os.path.normpath(os.path.join(os.path.dirname(f),l))
        if not os.path.exists(p): bad+=1; print("CASSE",f,l)
print("cassés:",bad)   # 0
EOF
```

## Rapport attendu
Conclusion du diag BOM, table bloc retiré → destination, tests du hook, sortie des portes, questions ouvertes.

## Annexe — pointeurs remontés par la vague 2
- `.claude/rules/sons.md` pointe `memory/ARCHI-REFERENTIEL-CONTENU.md` → `studio/referentiel/docs/ARCHI-REFERENTIEL-CONTENU.md`.
- `AGENTS.md` racine : régénéré par le hook après édition de CLAUDE.md (vérifier DOCTRINE.md disparu).
_(suite à compléter par l orchestrateur)_
