# HO-R01 — Minijeux : garbage collection de la doc

**Statut :** fait
**Depend de :** HO-R00
**Vague :** 1 · **Exécutant :** sous-agent Sonnet

## Objectif
Plus aucun document vivant du pôle JEU ne cite un jeu supprimé, un chemin mort ou un compte d'agents faux ; chaque jeu du catalogue a sa figée ; les scripts dino ont quitté le pôle.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P4, § P7
- `site/js/catalog.js` (la liste des 36 jeux vivants fait foi)
- `studio/minijeux/CLAUDE.md`, `INDEX.md`

## Fichiers autorises
- `studio/minijeux/{docs,tools,scripts,inbox}/**`, `studio/minijeux/{INBOX,INDEX,EQUIPE,AGENTS,CLAUDE}.md`
- `studio/dino/scripts/**` (réception de 3 scripts)
- `.claude/agents/game-pmo.md` (uniquement la ligne qui cite `pmo/`)

## Hors perimetre
- `studio/minijeux/memory/**` (HO-R02), `tests/**`, `i18n/**`, tout `site/**`.
- Aucune commande git.

## Travail
1. Figées `mj-46, 48, 49, 51, 53` + `figees/menu.md` : retirer toute référence à un jeu absent de `catalog.js`, bandeau daté « purge refs jeux morts 2026-09-12 ».
2. Écrire les 5 figées manquantes (`mj-28, 30, 35, 40, 42`) depuis le code réel, même gabarit que les existantes, marquées « rétro-documentée ».
3. Refs `pmo/` (20 fichiers) → chemin réel dans `memory/`.
4. `INDEX.md` : 6 liens morts corrigés, date de MAJ ; `EQUIPE.md` : un seul compte d'agents, aligné sur `.claude/agents/` (game-conseiller, game-dev, game-mj-reviewer, game-pmo, game-test-audio, game-test-secu).
5. `docs/handoffs/` : les 8 briefs faits → `docs/handoffs/archives/2026-09-03/`, statut interne aligné sur le registre.
6. `docs/design-explorations/` (54 mockups de pages déjà en prod) et `docs/research/{captures,menus}` : **supprimés**. Les 3 md de research restent.
7. Docs racine `2026-07-*`, `jeux/{CLASSIFICATION,REVUE}-2026-07.md`, `mj-34-35-36-specs.md` → `docs/_archive/2026-07/` avec bandeau. `MECANIQUES.md`, `_PALIERS-DIFFICULTE.md` : jeux morts retirés.
8. `tools/` fusionné dans `scripts/` (`scripts/{audio,avatars,decor,i18n,pages}` + un README). Les 3 scripts dino (`gen-dinos-assets.mjs`, `_check-catalogue-dino-i18n.mjs`, `_check-ombres-dino.mjs`) → `studio/dino/scripts/`, chemins internes corrigés. `gen_avatars_manifest.py` : réécrit en `.mjs` ou supprimé s'il a un équivalent.
9. `inbox/` : PNG GUID de juillet supprimé.

## Portes de verification
```bash
grep -rlE "pmo/" studio/minijeux .claude/agents/game-pmo.md          # vide
node studio/minijeux/scripts/check-liens-md.mjs studio/minijeux      # 0 lien mort (créer le script s'il n'existe pas)
node -e "..."   # pour chaque id de catalog.js, docs/jeux/figees/<id>.md existe → 36/36
node studio/dino/scripts/gen-dinos-assets.mjs --dry-run              # tourne depuis le nouveau chemin
```

## Definition of done
Portes vertes, rapport déposé dans `docs/handoffs/rapports/HO-R01.md`, aucun fichier hors liste touché (`git status` relu par l'orchestrateur).

## Rapport attendu
Fichiers créés / modifiés / supprimés + sortie des portes + questions ouvertes (ex. un doc « périmé » qui contient encore une décision vivante : ne pas supprimer, signaler).
