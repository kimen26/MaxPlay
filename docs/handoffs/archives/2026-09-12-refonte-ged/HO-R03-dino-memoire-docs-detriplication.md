# HO-R03 — Dino : rotation mémoire, docs archivés, une seule source par règle

**Statut :** fait
**Depend de :** HO-R00
**Vague :** 1 · **Exécutant :** sous-agent Sonnet

## Objectif
La mémoire dino redevient lisible, les handoffs faits sont archivés, et chaque règle du pôle n'est écrite qu'à un seul endroit (rule = ops, CLAUDE.md = navigation, figées = verrous produit).

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P4, § P5
- `~/.claude/rules/memoire-projet.md`, `memory/DOCTRINE.md`
- `.claude/rules/dino.md`, `studio/dino/CLAUDE.md`, `studio/dino/figees/encyclopedie.md`

## Fichiers autorises
- `studio/dino/{memory,docs,figees,temp}/**`, `studio/dino/{CLAUDE,INDEX,AGENTS}.md`
- `.claude/rules/dino.md`, `.claude/skills/{nouveau-dino,dino-paleoart,dino-images-lunii}/**`
- `studio/dino/content/sources/_PLAYBOOK-DINO-NOUVEAU.md`
- `studio/dino/content/sources/{megafaune,video}/**`, `studio/dino/content/sources/images/variantes-non-retenues/**` (suppression)

## Hors perimetre
- `studio/dino/content/{dinos,scripts-audio,i18n,lunii,data,scripts}/**`, tout `site/**` (HO-R12 plus tard). Aucune commande git.

## Travail
1. Rotation `LESSONS.md` (68 Ko → ≤ 20 Ko) et `TODO.md` (47 Ko → ≤ 8 Ko) comme HO-R02 : verbatim vers `memory/archive/`, L-NNN conservés, lanes fermées → `CHANGELOG.md`.
2. `docs/handoffs/` : HO-003 à HO-023 faits → `docs/handoffs/archives/2026-09/`, rapports de pilotes inclus.
3. Une seule source par règle : `.claude/rules/dino.md` porte les règles opérationnelles (Tritri, échelle honnête, grep-interdits, checklist 8 axes, commit+push) ; `studio/dino/CLAUDE.md` = navigation et gouvernance, renvoie à la rule ; `figees/encyclopedie.md` = verrous produit datés uniquement.
4. `nouveau-dino/SKILL.md` = procédure unique ; `_PLAYBOOK-DINO-NOUVEAU.md` réduit à un pointeur.
5. `dino-images-lunii` ne garde que le 320×240 N&B ; le system prompt paléoart part dans `dino-paleoart`.
6. `temp/audit-fiches.cjs` supprimé (doublon de `export/_audit-fiches-complet.cjs`).
7. `megafaune/_refs-visuelles/` (41 Mo), `variantes-non-retenues/`, `video/` supprimés.
8. Ajouter dans `memory/TODO.md` dino : « `site/img/dinos/_new-*` : intégrer ou jeter, gitignorés par pattern ».

## Portes de verification
```bash
wc -c studio/dino/memory/{MEMORY,TODO,DECISIONS,LESSONS,CHANGELOG}.md
grep -ohE "L-[0-9]{3}" studio/dino/memory/LESSONS.md studio/dino/memory/archive/*.md | sort -u | wc -l   # inchangé
grep -c "Tritri" .claude/rules/dino.md studio/dino/CLAUDE.md studio/dino/figees/encyclopedie.md   # règle détaillée dans la rule seulement
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs   # sortie inchangée
```

## Definition of done
Portes vertes, rapport dans `docs/handoffs/rapports/HO-R03.md`, rien touché hors liste.

## Rapport attendu
Avant/après Ko, L-NNN archivés, tableau « règle → fichier unique », suppressions en Mo, questions.
