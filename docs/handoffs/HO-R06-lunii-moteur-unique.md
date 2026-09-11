# HO-R06 — Lunii : cohérence après suppression de l'audio tiers, un seul moteur de build

**Statut :** pret
**Depend de :** HO-R00
**Vague :** 1 · **Exécutant :** sous-agent Sonnet

## Objectif
Le pôle Lunii n'a plus de script sans source, construit ses 3 packs MaxPlay avec un seul moteur et une config par pack, et purge son staging après chaque build.

## Contexte a lire d'abord
- `studio/lunii/{CLAUDE,README,LESSONS-MOTEUR}.md`, `packs-manifest.json`, `.claude/rules/lunii.md`
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § B (lunii)

## Fichiers autorises
- `studio/lunii/**`

## Hors perimetre
- `site/**`, `studio/dino/**`. Aucune commande git.

## Travail
1. Supprimer `build-dodo-pack.mjs`, `build-pierre-loup-pack.mjs` (sources supprimées en vague 0). `packs-manifest.json` : dodo et pierre-loup passent en type `library` (déjà déposés dans `~/.studio/library/`).
2. README et LESSONS-MOTEUR : plus d'audio tiers dans le repo, provenance et règle écrites.
3. Un moteur `scripts/build-pack.mjs` + `packs/{dinos,voyage,tritri}.json` remplace les 3 scripts restants. Purge automatique de `.build-<nom>/` après dépôt du zip. `prepare-dino-assets.mjs` conservé (dérivés ffmpeg).
4. Question de conception à trancher et appliquer : l'audio dino Lunii est un dérivé recalculable en < 1 min depuis `site/audio/dinos/fr/`. S'il l'est, il n'est plus stocké dans `assets/audio/` : `build-pack.mjs` le régénère à chaque run.

## Portes de verification
```bash
node studio/lunii/scripts/build-pack.mjs dinos && unzip -l <zip produit> | sort   # même liste de fichiers que le dernier maxplay-dinos-de-max.zip de ~/.studio/library (hors horodatages)
node studio/lunii/scripts/build-pack.mjs voyage ; node studio/lunii/scripts/build-pack.mjs tritri
ls -d studio/lunii/.build-* 2>/dev/null   # vide après build
```

## Definition of done
3 packs reconstruits identiques, staging purgé, manifeste cohérent, rapport dans `docs/handoffs/rapports/HO-R06.md`.

## Rapport attendu
Diff des listes de fichiers zip, décision prise sur l'audio dérivé (stocké ou recalculé, et pourquoi), réponses aux 5 questions (local/BDD, rapidité, réutilisation, i18n, index).
