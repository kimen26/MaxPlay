# HO-022 — Flore : images hero (plante dans son environnement + enfant 1 m)

**Statut :** 15/19 FAIT — 4 restantes (attente redemarrage Brave)
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


---

## ✅ Reprise 2026-09-06 (apres login PY) — 15/19

Les deux canaux etaient bien logues. **ChatGPT etait en limite d'images** (exit 5 des la
premiere scene) → tout est passe par **Grok**, qui a produit **15 images** avant de lacher.

**Rangees en PROD** : `site/img/dinos/plantes/<Id>.jpg`, 900 px, ~290 Ko piece, 4,3 Mo au total.
Staging `_new-plantes/` vide aussitot (regle inbox). Conversion PNG→JPG par canvas headless
(`scratchpad/range-plantes.mjs`) : pas de dependance image native ajoutee au repo.

**Qualite verifiee visuellement** (Araucaria, Mousse, Nenuphar) : plante entiere, enfant a
l'echelle reelle (accroupi pour les plantes basses), herbivore mangeur au second plan, zero
texte incruste. La consigne d'echelle chiffree fait son travail.

**4 manquantes** : `platane`, `palmier`, `herbe`, `wollemia` — les 4 derniers ids du lot.
Grok a expire (TimeoutError) sur chacune, et **le pilotage CDP ne repond plus du tout**
(`connectOverCDP` se connecte au websocket puis expire, Brave a ~4,6 Go de memoire).
Le port 9222 repond encore et les 3 onglets sont sains : c'est le navigateur qui sature,
pas le pipeline.

**Reprise** : fermer et relancer Brave (profil `c:/tmp/brave-debug`), se reloguer si besoin, puis

```bash
node .claude/skills/dino-images-lunii/scripts/batch-plante-series.mjs platane palmier herbe wollemia --grok --only echelle
node <scratchpad>/range-plantes.mjs
```

**Scene `detail`** (gros plan feuille/graines) : jamais lancee, aucune des 19. Le pipeline la
sait faire (`--only detail`), c'est un lot a part entiere a passer quand un canal est frais.
