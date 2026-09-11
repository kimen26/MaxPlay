# HO-R99 — Clôture : `git filter-repo`, force-push, CHANGELOG, audit de clôture

**Statut :** pret
**Depend de :** toutes les lanes HO-R00 à HO-R14 `fait`
**Vague :** 6 · **Exécutant :** orchestrateur

## Objectif
L'historique git ne porte plus les binaires supprimés ; le repo se clone en moins d'une minute ; la campagne est documentée avant/après.

## Contexte a lire d'abord
- `memory/DECISIONS.md` D-007 ; `memory/audits/2026-09-12-archi-ged-site-studio.md` § P1

## Fichiers autorises
- Historique git complet (réécriture), `memory/{CHANGELOG,MEMORY}.md`, `memory/audits/<date>-cloture-refonte-ged.md`, `docs/handoffs/README.md`, `docs/handoffs/archives/2026-09-12-refonte-ged/`

## Travail
1. `pip install git-filter-repo` (wheel 2.47.0 disponible). Sauvegarde : `git bundle create C:\ProjetsPerso\MaxPlay-vault\pre-filter-2026-09.bundle --all`.
2. `git filter-repo --invert-paths --path studio/dino/content/inbox --path studio/lunii/assets/audio/histoires-dodo --path studio/lunii/assets/audio/pierre-loup --path _archive --path-glob 'studio/dino/content/sources/megafaune/*' --path-glob '*.pdf'` puis `--strip-blobs-bigger-than 20M` hors `site/`.
3. `git remote add origin https://github.com/kimen26/MaxPlay.git` (filter-repo retire le remote) ; `git push --force origin master` ; vérifier que le workflow Pages repasse vert.
4. Vérifier `infra/bot/bot.run.log` : le bot tourne sur ce working tree, pas de clone séparé.
5. `memory/CHANGELOG.md` : lanes livrées en capacités visibles ; `memory/MEMORY.md` : état ; audit de clôture avant/après chiffré (poids pack, fichiers trackés, tokens de contexte par pôle, jeux visibles au Mur, tables Supabase).
6. Tous les HO-R → `docs/handoffs/archives/2026-09-12-refonte-ged/` ; registre README mis à jour ; supprimer les crons de relance (`CronList` puis `CronDelete`).

## Portes de verification
```bash
git count-objects -vH        # size-pack < 1,2 Go
git ls-files | wc -l
# workflow GitHub Pages vert après le force-push
```

## Definition of done
Pack < 1,2 Go, Pages vert, CHANGELOG et audit de clôture écrits, handoffs archivés, crons supprimés, ligne HO-R99 de `memory/TODO.md` à `fait` et chantier fermé.

## Rapport attendu
Audit de clôture.
