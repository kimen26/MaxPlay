# HO-R13 — Images : WebP pour sprites et paléoart

**Statut :** pret
**Depend de :** HO-R12 (vague 4 commitée)
**Vague :** 5 · **Exécutant :** sous-agent Sonnet

## Objectif
`site/img/dinos/` perd 150 Mo sans perte visible ; plus aucun PNG ou JPG lourd n'entre dans `site/`.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P8
- `studio/dino/scripts/gen-dinos-assets.mjs`, `.claude/skills/dino-paleoart/SKILL.md`, `studio/lunii/scripts/build-pack.mjs`

## Fichiers autorises
- `site/img/dinos/{sprites,paleoart}/**`, `site/js/gen/dinos-assets.js`, `site/dev-dinos.html` (extensions si en dur)
- `studio/dino/scripts/images/webp-convert.mjs` (nouveau), `studio/dino/scripts/gen-dinos-assets.mjs`
- `studio/lunii/scripts/**` (lecture paléoart : accepter webp), `.claude/skills/dino-paleoart/SKILL.md`, `package.json` (`check` : règle poids)

## Hors perimetre
- `site/img/dinos/_new-*`, `grok/`, `wiki/` (décision séparée). Aucune commande git.

## Travail
1. Conversion `ffmpeg -c:v libwebp -quality 80` (même outil et qualité que les 82 webp existants) ; sprites à fond transparent en webp lossless ou q90 alpha.
2. Validation visuelle : capture côte à côte de 5 échantillons, ouverte et lue. Sources PNG/JPG supprimées ensuite.
3. Manifeste régénéré ; règle écrite dans `dino-paleoart` : « livrable = webp, jamais de png > 300 Ko dans `site/` » ; `npm run check` refuse un png/jpg > 300 Ko dans `site/img/`.

## Portes de verification
```bash
du -sm site/img/dinos          # avant/après, cible −150 Mo
# Playwright dev-dinos.html : 0 image cassée (compter img.naturalWidth === 0), captures de 3 fiches
node studio/lunii/scripts/build-pack.mjs dinos   # toujours vert
npm run check
```

## Definition of done
Gain mesuré, 0 image cassée, règle de poids active, rapport dans `docs/handoffs/rapports/HO-R13.md`.

## Rapport attendu
Mo avant/après par dossier, captures, questions.
