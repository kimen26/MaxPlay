# HO-R00 — Vague 0 : purge, suppressions, vault, gitignore, branches, migration 013

**Statut :** fait
**Depend de :** —
**Vague :** 0 · **Exécutant :** orchestrateur (git et destructif : personne d'autre)

## Objectif
Le working tree ne contient plus ni binaire tiers sous droits, ni archive, ni staging Lunii ; le `.gitignore` est générique ; les branches mortes et les tables mortes ont disparu.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P1, § 3
- `memory/DECISIONS.md` D-007, D-010

## Fichiers autorises
- `_archive/**` (suppression), `docs/ARCHIVES.md` (création), `C:\ProjetsPerso\MaxPlay-vault\` (hors repo)
- `studio/lunii/.build-*/` (suppression disque), `studio/dino/content/inbox/**`, `studio/lunii/assets/audio/{histoires-dodo,pierre-loup}/**` (git rm)
- `.gitignore`, `infra/supabase/migrations/013_drop_dead_tables.sql`, `infra/supabase/README.md`
- branches git `reorg/2026-04-30` (locale + distante), `origin/main`

## Hors perimetre
- `site/img/dinos/_new-*` : on les ignore par pattern, on ne les supprime pas (travail dino en cours).
- MCP `supabase-maxvoyage` : vit dans `~/.claude.json` utilisateur, pas dans le projet. Question ouverte à Papa Yann, ne pas toucher.

## Travail
1. `mkdir C:\ProjetsPerso\MaxPlay-vault` ; zip `_archive/` → `MaxPlay-vault/_archive-2026-09-12.zip` ; copier `_archive/INDEX.md` en `docs/ARCHIVES.md` avec bandeau « contenu dans le vault » ; `git rm -r _archive`.
2. `rm -rf studio/lunii/.build-*`.
3. `git rm -r studio/dino/content/inbox studio/lunii/assets/audio/histoires-dodo studio/lunii/assets/audio/pierre-loup` (suppression sèche, décision Papa Yann).
4. `.gitignore` : patterns génériques `**/_new-*/`, `**/inbox/*.mp3`, `**/.build-*/`, `**/*.log`, `**/.artifacts/`, `**/_scratch/`, `temp/` ; retirer les lignes zone par zone devenues inutiles ; conserver les exceptions référentiel.
5. `git branch -D reorg/2026-04-30` ; `git push origin --delete reorg/2026-04-30 main` (HEAD distant = `master`, vérifié le 2026-09-12).
6. Migration `013_drop_dead_tables.sql` : `drop table public.feedback; drop table public.tile_refs;` appliquée via MCP `supabase` (projet `bfrugwrzpefsaehsvypt`). README Supabase : tableau des tables mis à jour, `child_state`/`game_sessions` notées « câblées, non alimentées, conservées ».
7. Commit : `chore(ged): vague 0 — purge binaires, archive hors repo, gitignore generique, branches mortes, migration 013`.

## Portes de verification
```bash
git status --short | grep -v '^??'            # rien d'inattendu
du -sm studio/lunii                            # < 250
git ls-files | wc -l                           # ≈ 7 300
git branch -a                                  # master + origin/master seulement
node studio/lunii/scripts/build-dinos-pack.mjs --help 2>&1 | head -3   # le script dinos n'est pas cassé
```

## Definition of done
Les cinq portes passent, le commit est fait, la ligne HO-R00 de `memory/TODO.md` passe à `fait`, ce fichier descend dans `docs/handoffs/archives/2026-09-12-refonte-ged/`.

## Rapport attendu
Sortie des portes + liste des chemins supprimés + n° de migration appliquée.
