# Rapport HO-R00 — vague 0 (orchestrateur, 2026-09-12)

## Chemins supprimés
- `_archive/**` (6 142 fichiers, git rm) → vault `C:\ProjetsPerso\MaxPlay-vault\_archive-2026-09-12.zip` (6 152 entrées, 90 Mo) ; index conservé dans `docs/ARCHIVES.md`.
- `studio/lunii/.build-{dinos,dodo,pierre-loup,tritri,voyage}/` (disque, 687 Mo).
- `studio/dino/content/inbox/**` (12 fichiers, 147 Mo), `studio/lunii/assets/audio/histoires-dodo/**` (26), `studio/lunii/assets/audio/pierre-loup/**` (2) — suppression sèche (D-007).
- Branches `reorg/2026-04-30` (locale + distante) et `origin/main`.

## Migration
- `013_drop_dead_tables` appliquée via MCP supabase : `feedback`, `tile_refs` (0 ligne, 0 FK, 0 vue). README Supabase mis à jour.

## Portes
```
git status --short | grep -v '^??'   → seuls M .gitignore, infra/supabase/README.md + 12 fichiers dino d'une autre session (non touchés)
du -sm studio/lunii                  → 66   (< 250)
git ls-files | wc -l                 → 7273 (≈ 7 300)
git branch -a                        → master, remotes/origin/master
node studio/lunii/scripts/build-dinos-pack.mjs --help → le script ignore --help et reconstruit le pack sans erreur (non cassé)
```

## Questions pour la suite
- `build-dodo-pack.mjs`, `build-pierre-loup-pack.mjs`, `gen-dodo-images.mjs` référencent les audios supprimés → à traiter dans HO-R06 (moteur unique) : suppression des scripts.
