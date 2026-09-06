# HO-022 — Flore : images hero (plante dans son environnement + enfant 1 m)

**Statut :** BLOQUE (attente action Papa Yann)
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

---

## ⛔ Blocage constaté 2026-09-06 (orchestrateur)

Le pipeline est **pret et teste a sec** (`--preview` OK sur araucaria et williamsonia, nettoyage
zero-Streisand verifie), mais **aucune image ne peut etre generee** : les deux canaux sont
deconnectes dans le profil Brave de debug.

| Constat | Detail |
|---|---|
| Port du profil debug | **9223**, pas 9222 — une session anterieure l'a lance avec `--remote-debugging-port=9223`. `launch-brave.ps1` teste 9222, le trouve occupe par un AUTRE navigateur, et sort en croyant le profil deja actif. |
| ChatGPT | bouton « Se connecter » visible → **non logue** dans ce profil. |
| Grok | boutons « Se connecter / S'inscrire » visibles → **non logue** dans ce profil. |

**Ce qu'il faut de Papa Yann** : dans la fenetre Brave du profil de debug, se loguer a ChatGPT
(et/ou Grok), puis relancer :

```bash
node .claude/skills/dino-images-lunii/scripts/batch-plante-series.mjs --all          # ChatGPT
node .claude/skills/dino-images-lunii/scripts/batch-plante-series.mjs --all --grok   # Grok
```

**A corriger aussi** : `launch-brave.ps1` confond « le port 9222 repond » et « MON profil de debug
tourne ». Il devrait verifier que le navigateur qui repond est bien celui du `--user-data-dir`
attendu, sinon il rate le cas present (un autre Chrome/Brave sur 9222).

En attendant, l'encyclopedie affiche l'**emoji de la plante** en repli : les fiches et la grille
sont pleinement utilisables sans image.
