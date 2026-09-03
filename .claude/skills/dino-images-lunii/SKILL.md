---
name: dino-images-lunii
description: Générer des images dino MaxPlay en pilotant le ChatGPT logué dans Brave (Playwright CDP), pour 2 usages — logo Lunii (320x240 16 gris) et fiches de l'application (couleur, via le GPTs Dinosaure XXL). Auto-trigger sur image lunii, image dino, emblème famille dino, fiche dino image, générer image GPT, GPTs Dinosaure, pictogramme dino, image 16 gris, illustration encyclopédie dino, BMP RLE4.
---

# Skill — Génération d'images dino via ChatGPT (Brave piloté)

> Pipeline prouvé 2026-06-16/17. **Principe général réutilisable** : aller chercher du ChatGPT (session loguée dans Brave) pour générer des images, récupérer le résultat, le post-traiter. Voir [`EMBLEMES.md`](EMBLEMES.md) pour la charte des 9 familles Lunii.

## 2 presets (même tuyau, sortie différente)

| Preset | Quoi | GPTs | Post-traitement |
|--------|------|------|-----------------|
| **`logo Lunii`** | emblèmes de familles / nœuds de menu boîte Lunii | ChatGPT standard | 320×240, 16 gris, **fond noir natif** (composition pensée sombre), sans alpha |
| **`fiche app`** | illustrations de fiches dans l'**application** dino (web) | **GPTs « Dinosaure XXL — Encyclopédie Illustrée »** (`--url` ci-dessous) | **couleur gardée**, redimensionner selon l'UI ; PAS de posterisation Lunii |

> **GPTs « Dinosaure XXL »** (bon pour les fiches app) :
> `https://chatgpt.com/g/g-6a2f05b2de7881919e856111c53cece2-dinosaure-xxl-encyclopedie-illustree`
> Lancer via `gpt-gen.mjs "<prompt>" out.png --url <cette-url>` (démarre une conv fraîche avec ce GPTs).

## Preset `logo Lunii` — à quoi ça sert

Produire des images que Max verra sur sa **Lunii**. La boîte stocke en **BMP RLE4** (4 bits = **16 niveaux de gris**, **320×240**). STUdio convertit au transfert, mais **on conçoit directement en gris contrasté** pour maîtriser le rendu.

### Contrainte technique (NON négociable)
- **320×240** exactement.
- **16 niveaux de gris** (posterisation) — toute couleur deviendra grise, autant la maîtriser.
- **PAS d'alpha** : BMP n'a pas de transparence.
- **FOND NOIR NATIF, sujet BLANC** (figé 2026-06-17) : meilleur rendu sur l'écran Lunii. Les images doivent être **conçues dès la dérivation ChatGPT pour fond noir** (composition pensée sombre). Le sujet blanc/gris clair « brille » naturellement sur noir et le contraste est meilleur. **Pas d'inversion post** (simple inversion n'est pas vraiment belle). Juger toujours sur le PNG final 16 gris, pas le HD.

## CHARTE DE STYLE (figée — théropode V3 = référence)

Réf visuelle : [`reference/theropode-v3.png`](reference/) (et son rendu Lunii `reference/theropode-v3-lunii.png`).

- **Style C** : dessin BD, **contour net blanc/gris** + **ombrage gris simple**. Pas de rendu photo-réaliste (la posterisation 16 gris le rend boueux).
- **Niveaux de gris uniquement** + **fond noir natif** (composition pensée sombre dès la dérivation ChatGPT), sans texte, emblème **centré**. Sujet blanc/gris clair brille sur noir.
- **Emblème-concept, pas un portrait** : on illustre l'IDÉE de la famille (un élément anatomique signature + un indice de contexte), pas un dinosaure identifiable.
- **Griffures (3 traits parallèles diagonaux)** = signature d'énergie **réservée aux prédateurs** (Théropodes, Dromæosaures). **Jamais** sur un herbivore paisible.
- Lisibilité d'abord : peu de micro-détails (ils meurent à 16 gris), silhouette forte.

## Source des spécificités par dino (ne JAMAIS réinventer)

Pour un dino précis, prendre la ⭐ **signature** et le bloc CONTEXTE dans :
[`studio/dino/content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md`](../../../../ProjetsPerso/Claude_Projects/MaxPlay/studio/dino/content/sources/fiches/_FICHES-DINOS-GROKIPEDIA.md)
→ chaque dino y a : silhouette, ⭐ signature, couleur, ce qu'il mange, 5 scènes prêtes à prompter.

## WORKFLOW (brique avant macro)

1. **Lancer Brave en mode debug** (une fois par session) :
   `scripts/launch-brave.ps1` → ouvre Brave (profil dédié `c:/tmp/brave-debug`, port 9222) sur ChatGPT.
   - La session reste loguée d'une fois sur l'autre. Si pas logué → se loguer à la main une fois.
2. **Vérifier la connexion** : `node scripts/gpt-gen.mjs` sans args affiche l'usage ; le 1ᵉʳ appel teste le login.
3. **Générer 1 image** (toujours valider 1 brique avant de batcher) :
   ```
   node scripts/gpt-gen.mjs "<prompt>" <out.png> [--new] [--url <gpts-url>]
   ```
   - `--new` = nouveau chat. Pour une **série cohérente**, rester dans le MÊME chat (sans `--new`) → ChatGPT mémorise le style.
   - `--url <gpts-url>` = cible un **GPTs précis** (ex. **Dinosaure XXL** pour les fiches app). Démarre une conv fraîche avec ce GPTs.
4. **Post-traiter selon le preset** :
   - **`logo Lunii`** → `bash scripts/to-lunii.sh <out.png> <out-lunii.png>` → 320×240 + 16 gris + `<out-lunii-zoom.png>` (×3 inspection).
   - **`fiche app`** → garder la **couleur**, juste redimensionner à la taille UI voulue (ffmpeg `scale`). PAS de posterisation.
5. **Lire le rendu** (`Read`) et le montrer à Papa Yann **avant** de batcher / déployer.

## Conventions

- Une **série** (les 9 familles, ou les N dinos d'un lot) = **un seul chat ChatGPT** pour la cohérence de style.
- Toujours montrer le rendu **16 gris réel** (pas le PNG couleur HD) avant validation.
- Images finales rangées dans `site/img/dinos/` (ou le dossier du pack STUdio cible — demander).

## Anti-patterns

- ❌ Valider sur le PNG couleur HD (il ment : le rendu Lunii est en 16 gris).
- ❌ PNG avec alpha (fond transparent) → fond aléatoire sur la boîte.
- ❌ Style photo-réaliste (boueux en 16 gris) → rester en style C.
- ❌ Griffures sur un herbivore.
- ❌ Réinventer les specs d'un dino → lire `_FICHES-DINOS-GROKIPEDIA.md`.
- ❌ Batcher les 9 sans avoir validé 1 brique.

## Rate Limit ChatGPT — Ce qu'il faut savoir

> ⚠️ **Limite empirique observée : ~20 images par session/jour** par compte ChatGPT (compte Plus/Pro).

### Phases de dégradation
| Phase | Images | Comportement | Stratégie |
|-------|--------|--------------|-----------|
| 1 | 1-12 | Fonctionnement normal | Lots de 3, pause 10s |
| 2 | 13-18 | Rate limit intermittent | Lots de 2, pause 1min |
| 3 | 19-20 | Blocage fréquent | Lot de 1, pause 5min |
| 4 | 20+ | Blocage total | Arrêt, reprendre le lendemain |

### Bonnes pratiques
- **Ne pas redémarrer Brave** — la limite est liée au compte ChatGPT, pas au navigateur
- **Utiliser `--resume`** ou le fichier `_BATCH-STATE.json` pour reprendre un batch interrompu
- **Le script `batch-dino-*.mjs`** gère automatiquement : quota journalier, pause adaptative, reprise après échec
- **Comptes multiples** : si disponible, rotation de comptes pour accélérer

### Signes du rate limit
- Modal "Trop de requêtes" / `modal-conversation-history-rate-limit`
- Timeout sur le textarea (clic bloqué par overlay)
- Code 3 (timeout) ou code 5 (limite) dans les logs

## Détails techniques (rappel)

- ChatGPT sert les images générées sur `img[src*="backend-api/estuary/content"]` (plus `oaiusercontent`).
- Connexion Playwright via CDP `http://127.0.0.1:9222` (`chromium.connectOverCDP`). `browser.close()` ne ferme PAS Brave, juste la connexion.
- Playwright réutilisé depuis `studio/minijeux/tests/node_modules` (pas de réinstall).
- Conversion ffmpeg (pas d'ImageMagick sur la machine) : posterisation 16 niveaux via `lutyuv=y='round(val/255*15)*17'`.
