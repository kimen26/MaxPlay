# HO-G05 — Inventaire nettoyage (lecture seule)

**Statut :** pret
**Depend de :** —

## Objectif
Un rapport qui classe chaque zone « temp / test / sample / outillage / archive » du repo en SUPPRIMER · DÉPLACER (vers où) · GARDER (pourquoi), avec preuve d'usage, pour que l'orchestrateur valide et que HO-G10 exécute. Cible produit : dans `site/` il ne reste que la prod ; dans `studio/` que l'utile.

## Contexte a lire d'abord
- `memory/audits/2026-09-03-archi-claude-infra.md` § 2, § 3 points 13-14, § 5 plan D
- `.github/workflows/deploy.yml` (ce qui part en prod : `cp -r site/* _site/`)
- `.gitignore`

## Fichiers autorises
- `docs/handoffs/rapports/HO-G05-inventaire.md` (création) — RIEN d'autre. Lecture seule partout ailleurs.

## Hors perimetre
- Aucune suppression, aucun déplacement, aucune commande git.

## Travail
Pour CHAQUE entrée ci-dessous : taille (`du -sh`), nb fichiers, versionné ou non (`git ls-files <chemin> | wc -l`), dernier commit (`git log -1 --format=%cs -- <chemin>`), **preuve d'usage** (grep des références depuis `site/*.html`, `site/js/*.js`, `.claude/**`, `studio/**/*.{md,mjs,js,py,sh,cjs}` hors `_archive`), et verdict SUPPRIMER / DÉPLACER→cible / GARDER + une ligne de raison.

Zones à instruire :
1. `temp/` (racine, non versionné) et `studio/temp/` (non versionné) — pour chaque sous-dossier/fichier. Les scripts `_couts.mjs`, `_inventaire-voix.mjs`, `_phrases.mjs`, `_detail.mjs`, `_inspect-plan.mjs`, `_comp-runner-ceratopsiens.cjs` : dire s'ils sont des outils encore utiles (et vers quel `studio/<pôle>/scripts/` les déplacer) ou des jetables.
2. `studio/minijeux/tests/_scratch/` (48 fichiers versionnés), `tests/batch-avatars-*.mjs`, `tests/batch-decor-gpt.mjs`, `tests/test-dinos*.mjs`, `tests/check-dinos-grid.mjs`, `tests/_check-window-soundpool.mjs`, `studio/minijeux/test-results/`, `studio/minijeux/tests/.artifacts/`.
3. `site/` hors prod : `tile-tools/` (2 406 fichiers), `tools/`, `design-compte/`, `design-lecture/`, `design-mur/`, `design-shared/`, `video/`, pages `dev-fx.html`, `dev-sounds-ui.html`, `design-mockups.html`, `map-mockups.html`, `index-v2-archive.html`, `atelier-couleurs.html`, `auteur.html`, `lecture.html`, `compte.html`, `suivi.html`, `avatar-atelier.html`, `mj-pose-tiles.html`, `max-adventure.html`. Preuve = lien depuis `index.html`/`catalog.js`/un autre HTML/`mj-shell.js`. `mj-pose-tiles` et `max-adventure` sont `retire:true` dans le catalog : dire si les fichiers doivent rester déployés.
4. `site/img/` : `dinos/{wiki,grok,sprites,traces,ombres,familles,paleoart}`, `avatars/`, `decor/` — quel JS/HTML les référence (`dinos-images-*.js`, `dinos-assets.js`, `avatars.js`, `decor.js`). `site/audio/`, `site/sounds/` : fichiers non référencés par aucun manifest/JS (échantillon : lister les 20 premiers orphelins et le total).
5. `studio/referentiel/` : séparer « constater » (`build.mjs`, `scan-*.mjs`, `couverture.mjs`, `valider.mjs`, `test-detection.mjs`, `acquitter.mjs`, `_ETAT-CONTENU.md`, `empreintes.json`, `catalogue/`, `lib/`) de « générer » (`_gen-*.mjs`, `_fix-*.mjs`, `_test-phonemes-graphies.mjs`, `_extraire-textes-jeux.mjs`, `_FILE-EL.md`, `_PLAN-GENERATION.md`, `_REPRISE-2026-08-10.md`). Pour chaque `_gen-*`, dire quel pôle il sert (dino / jeu / i18n) → cible `studio/<pôle>/scripts/audio/`.
6. Archives : `_archive/` racine (83 fichiers, `temp-assets-2026-04` 22 fichiers 36 MB ?), `studio/dino/content/scripts-audio/_archive/` (122 fichiers dont MP3), `studio/narration/stories/002-libellule-resonance/_archive/` (212 fichiers), `studio/dino/_archive/`, `studio/narration/archive/`, `studio/minijeux/docs/jeux/_archive/`, `studio/dino/content/scripts-audio/fr/V3/json/_draft-2026-08-17/`, `site/tools/_archive/`. Verdict par dossier : garder (valeur historique citée par une décision) ou supprimer (récupérable git). Poids total récupérable.
7. Dossiers `inbox/` : `studio/minijeux/inbox/` (PNG 2 MB), `studio/narration/inbox/` (PNG 580 KB + culture*.md). Traités ou non.
8. `infra/` : fichiers non versionnés (11), logs, `infra/mcp/logs/`.
9. Doublons évidents : fichiers identiques (même hash) en plusieurs endroits sous `studio/` et `site/` (script : `find … -type f -exec md5sum {} + | sort | uniq -w32 -D | head -60`) hors `node_modules`, `_archive`, MP3.

Format du rapport : une table par zone (`chemin | taille | fichiers | versionné | dernier commit | usage prouvé | verdict | raison`), puis un résumé : Mo récupérables, fichiers à supprimer, déplacements proposés, et les **questions à trancher** (ce que tu n'as pas pu prouver).

## Portes de verification
```bash
test -s docs/handoffs/rapports/HO-G05-inventaire.md && grep -c "^| " docs/handoffs/rapports/HO-G05-inventaire.md   # > 80 lignes de table
git status --porcelain | grep -v "docs/handoffs/rapports/"   # vide : rien d'autre n'a bougé
```

## Rapport attendu
Le fichier `docs/handoffs/rapports/HO-G05-inventaire.md` + dans la réponse : le résumé (Mo, fichiers, questions).
