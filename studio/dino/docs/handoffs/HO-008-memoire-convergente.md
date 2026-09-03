# HO-008 — Mémoire convergente pôle DINO

**Statut :** pret
**Depend de :** vague 1 commitée (HO-G02 : D-004 racine). Indépendant des HO-001..007 (i18n) : périmètres disjoints (`content/i18n/`, `site/js/` ne sont pas touchés ici).

## Objectif
`studio/dino/memory/` est le quintette du pôle ; `pmo/` n'existe plus ; le CLAUDE.md du pôle tient en 80 lignes ; `_ETAT-DINOS.md` continue d'être généré au bon endroit.

## Contexte a lire d'abord
- `docs/handoffs/HO-POLE-memoire-convergente-COMMUN.md` (socle)
- `memory/DECISIONS.md` racine § D-004
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 points 5-6
- État actuel : `studio/dino/{CLAUDE.md,INDEX.md,AGENTS.md}`, `pmo/{INVARIANTS,decisions,sprint-log,backlog,audit-trail,audit-fiches-complet,regen-audio-taille-56,_ETAT-DINOS}.md`, `pmo/_archive/`, `figees/encyclopedie.md` (ne bouge pas), `content/scripts/export/_gen-etat-dinos.cjs` (génère `pmo/_ETAT-DINOS.md`), `content/sources/_PLAYBOOK-DINO-NOUVEAU.md`, `.claude/skills/nouveau-dino/SKILL.md` (lecture seule : pointe pmo/ ?)

## Fichiers autorises
- `studio/dino/pmo/**` (déplacement, suppression), `studio/dino/memory/**` (création)
- `studio/dino/CLAUDE.md`, `studio/dino/INDEX.md`, `studio/dino/AGENTS.md`
- `studio/dino/content/scripts/export/_gen-etat-dinos.cjs` (chemin de sortie seulement) et tout autre script sous `studio/dino/content/scripts/**` qui écrit/lit `pmo/` (chemin seulement)
- `studio/dino/content/INDEX.md` et `studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md` (lignes pointant `pmo/` seulement)
- `studio/dino/docs/handoffs/README.md` (ligne de registre HO-008)

## Hors perimetre
- `studio/dino/figees/**`, `studio/dino/content/i18n/**`, `studio/dino/content/scripts-audio/**`, `site/**`, `.claude/**` (le skill `nouveau-dino` sera corrigé par HO-G07 : lister ses lignes). Aucune commande git.

## Travail (en plus du socle commun)
1. `pmo/backlog.md` (465 l.) → `memory/TODO.md` (ouvert) + `archive/backlog-fermes-2026.md` + `memory/LESSONS.md` (L-xxx).
2. `pmo/sprint-log.md` (888 l.) → `memory/archive/sprint-log-2026-06-08.md` verbatim ; 3 dernières sessions dans `MEMORY.md § Journal`.
3. `pmo/decisions.md` (491 l.) → `memory/DECISIONS.md` (≥ 2026-08-01) + `archive/decisions-2026-H1.md` ; index des structurantes (DEC-GED-001, Tritri, échelle honnête, Grokipedia 1ʳᵉ source, norme clé d'assets, DEC-I18N-INVARIANT-001…).
4. `pmo/audit-trail.md`, `pmo/audit-fiches-complet.md`, `pmo/regen-audio-taille-56.md` → `memory/archive/` verbatim (bandeau + INDEX). `pmo/_archive/` → `memory/archive/` fusionné.
5. `pmo/_ETAT-DINOS.md` (généré) → `memory/_ETAT-DINOS.md` : modifier le chemin de sortie dans `_gen-etat-dinos.cjs`, relancer le script, vérifier que le fichier est régénéré au nouvel endroit et que l'ancien n'existe plus.
6. `MEMORY.md` : état = pointer `memory/_ETAT-DINOS.md` (jamais recopier un compte de dinos), chantiers en cours (vague i18n HO-001..007 : pointer `docs/handoffs/README.md`), Journal.
7. `CHANGELOG.md` : ce que l'enfant voit (familles, voyage, dico, fiches audio, images paléoart…) par mois, ≤ 40 lignes.
8. `CLAUDE.md` du pôle (93 l.) ≤ 80 lignes : garder principes + doctrine GED en 3 lignes (pointer DECISIONS) + « où vit quoi » + audio en 4 lignes (pointer `.claude/rules/audio.md` + skills) + quintette. Retirer « le produit (rappel) » détaillé → pointer `INDEX.md`.
9. `AGENTS.md`, `INDEX.md`, `content/INDEX.md`, `_PLAYBOOK-DINO-NOUVEAU.md` : chemins `pmo/` → `memory/`.
10. `docs/handoffs/README.md` : ajouter la ligne HO-008 au registre (statut « en cours » puis « fait » est mis par l'orchestrateur).

## Portes de verification
Celles du socle avec `P=studio/dino`, plus :
```bash
ls studio/dino/memory/                     # INVARIANTS DECISIONS TODO LESSONS MEMORY CHANGELOG _ETAT-DINOS.md archive/ audits/
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs && ls -la studio/dino/memory/_ETAT-DINOS.md && test ! -f studio/dino/pmo/_ETAT-DINOS.md
grep -rn "pmo/" studio/dino/content --include=*.{md,cjs,mjs,js,sh} | grep -v _archive   # 0
grep -n "pmo/" .claude/skills/nouveau-dino/SKILL.md .claude/rules/dino.md .claude/agents/dino-*.md   # LISTER (ne pas corriger)
```

## Rapport attendu
Fichiers créés/déplacés/supprimés, scripts modifiés, pointeurs extérieurs à corriger (HO-G07 : skill nouveau-dino, rule dino, agents dino-*, hook pmo-check), sortie des portes (avant/après liens cassés), questions ouvertes.
