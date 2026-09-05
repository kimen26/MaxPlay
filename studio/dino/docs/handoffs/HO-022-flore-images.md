# HO-022 — Flore : images hero (plante dans son environnement + enfant 1 m)

**Statut :** pret
**Depend de :** HO-020 (plantes.json : hauteur, environnement, feuille) · Brave debug 9222 logué ChatGPT/Grok (`launch-brave.ps1`).

## Objectif
1 image par plante dans `site/img/dinos/plantes/<Id>.jpg` : la plante ENTIÈRE dans son décor d'époque, un enfant de 4 ans (1 m) à côté comme mètre-étalon, un dino mangeur herbivore possible en arrière-plan (prédation exclue). Paléoart réaliste, méthode du skill `dino-paleoart` (prompt en sections, MESURES brutes, zéro Streisand, zéro texte dans l'image).

## Fichiers autorisés
- `site/img/dinos/plantes/*.jpg` (nouveau dossier) · staging local `site/img/dinos/_new-plantes/` (gitignoré, à vider après rangement)
- script `.claude/skills/dino-images-lunii/scripts/batch-plante-series.mjs` (nouveau, dérivé de `batch-dino-series.mjs`, 1 scène)
- `studio/dino/content/INDEX-IMAGES.md` (nouvelle section `plantes/`)

## Portes de vérification
```bash
ls site/img/dinos/plantes | wc -l   # = nombre d'entrées de plantes.json
# Validation VISUELLE de chaque image (Read) : plante reconnaissable, enfant à l'échelle, pas de texte.
```

## Rapport attendu
Table plante → image OK/KO/manquante (quota), canal utilisé, prompts problématiques.
