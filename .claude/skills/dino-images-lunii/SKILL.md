---
name: dino-images-lunii
description: Générer des images dino MaxPlay en pilotant le ChatGPT logué dans Brave (Playwright CDP), pour 2 usages — logo Lunii (320x240 16 gris) et fiches de l'application (couleur, via le GPTs Dinosaure XXL). Auto-trigger sur image lunii, image dino, emblème famille dino, fiche dino image, générer image GPT, GPTs Dinosaure, pictogramme dino, image 16 gris, illustration encyclopédie dino, BMP RLE4.
disable-model-invocation: true
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

## Quota et cadence ChatGPT — mesures de la campagne du 2026-09-06/07

> **90 images generees en une session** (et non « ~20/jour » comme l'indiquait la version
> precedente de cette fiche). Ce qui limite n'est pas un plafond journalier bas, mais **deux
> mecanismes distincts** qu'il faut savoir distinguer.

### Les deux blocages, a ne pas confondre

| Blocage | Message | Duree | Reaction |
|---|---|---|---|
| **Cadence** | modal « Trop de requetes — vous envoyez des demandes trop rapidement » | quelques minutes | ralentir, reprendre |
| **Quota image** | « Vous n'avez plus d'images… Reessayez a HH:MM » + « limite de l'offre Plus » | jusqu'a la reinitialisation (heure donnee dans le message) | arreter, rien ne passera avant |

Le second est le seul vrai plafond. Il annonce **l'heure exacte** de reprise : la lire dans la
capture plutot que de retenter (chaque tentative coute 220 s de timeout pour rien).

### Cadence

**90 secondes de pause entre deux generations** (`--pause 90`, valeur par defaut de
`regen-audit.mjs`). Mesure directe : a 25 s, ChatGPT a repondu « demandes trop rapidement » et
restreint l'acces deux fois. A 90 s, trois lots de 10 et un lot de 20 sont passes sans un seul
incident. La generation prend deja ~90 s, la pause double donc l'intervalle reel.

### Grok comme plan B — ce qu'il vaut vraiment

Teste en parallele sur le meme corpus : **il ne remplace pas ChatGPT sur ce travail**.
- Suit un prompt simple (proie portee, coloriage au trait) — 8 reussites sur 10.
- **Decroche sur un prompt complexe** : deux animaux en mouvement, ou un trait qui contredit un
  cliche animalier. Il a redessine deux fois « le Carnotaure qui boit » (le defaut d'origine) et
  rendu un spitz la ou il fallait un loup terrible.
- Rend en **1168x778 contre 1536x1024** chez ChatGPT — sous la norme de la collection
  (moyenne 379 Ko ; ses fichiers tombent a 250-280 Ko apres conversion).
- Quota **hebdomadaire**, pas journalier : une fois epuise, il l'est pour la semaine.

Conclusion : Grok pour les scenes simples quand ChatGPT est en cadence, jamais pour un cas
morphologique difficile.

### Deux navigateurs en parallele

Les generateurs font `bringToFront()` : sur un port partage, deux pilotes se volent l'onglet et
recuperent l'image l'un de l'autre. Il faut **un navigateur par moteur**, port distinct
(`--port 9222` / `--port 9223`, profils `c:/tmp/brave-debug` et `brave-debug2`).

⚠️ **Piege** : Brave partage ses processus entre profils. Un `Stop-Process` filtre sur un
`--user-data-dir` **tue les deux navigateurs**. Constate en session : le lot ChatGPT est mort en
silence, les images suivantes ont echoue en cascade sur `ECONNREFUSED`.

### Signes a lire dans les logs

- Code **5** = quota ou modale de rate limit → arret propre, lire l'heure de reprise.
- Code **3** = timeout 220 s. Trois d'affilee = quota atteint sans modale : **ouvrir la capture
  `<nom>-timeout.png`** ecrite par le script, elle porte le message exact.
- Code **1** = plantage du generateur, typiquement **le navigateur ferme**. `regen-audit.mjs` le
  detecte, le relance et retente une fois.
- Code **2** = pas logue. Code **4** = moderation (reformuler).

## Chaine d'audit et de regeneration (campagne 2026-09)

Outillage ajoute pour corriger en masse des images deja en production. Quatre etapes, chacune
son script — aucune ne se saute.

| Etape | Script | Role |
|---|---|---|
| 1. File | `studio/dino/content/scripts/export/_gen-file-regen.cjs` | Construit `_FILE-REGEN.json` depuis les verdicts d'audit + les blocs de prompt. **Genere**, jamais tenu a la main. |
| 2. Generation | `.claude/skills/dino-images-lunii/scripts/regen-audit.mjs` | Pilote ChatGPT ou Grok, ecrit en staging `site/img/dinos/_new-audit/`. **Ne touche jamais la production.** |
| 3. Jugement | *(humain / agent)* | Ouvrir CHAQUE image, la juger contre les caracteristiques du dino. |
| 4. Substitution | `.claude/skills/dino-images-lunii/scripts/substitue-audit.mjs` | Convertit (Pillow via `png2prod.py`) et **supprime definitivement l'originale**. |

**Options de `regen-audit.mjs`** : `--only <fichiers>` · `--dino <ids>` · `--n <nb>` ·
`--pause 90` · `--port 9222|9223` · `--grok` · `--retry` · `--ref-auto <Fichier.jpg>`.

### Les cinq regles apprises a la dure

1. **Un chat neuf par image.** Partager le contexte entre scenes d'un meme sujet devait aider a
   varier la pose ; le modele **resert l'image precedente** (le `_funfact` du Liopleurodon est
   revenu clone pixel de son `_manger`). La differenciation passe par le prompt, qui nomme deja
   les scenes dont il faut se demarquer.
2. **Deux echecs sur le meme trait = joindre une reference** (`--ref-auto`), ne pas reecrire une
   troisieme fois. La carapace d'Archelon a resiste a quatre reformulations et cede a la premiere
   image jointe (L-D32).
3. **Deux echecs sur le meme asset = relire le prompt avant de relancer.** Cinq spitz d'Aenocyon
   et cinq echecs du Liopleurodon venaient de prompts fautifs, pas du modele (L-D34).
4. **Autant d'images jugees que d'images substituees.** La liste passee a `substitue-audit.mjs`
   ne contient que des fichiers dont le verdict a ete formule explicitement (L-D33).
5. **`--ref` et l'image generee partagent le meme selecteur.** La reference uploadee est absente
   du releve fait avant envoi : sans garde-fou, le script la re-telecharge telle quelle
   (checksum identique). Corrige par comparaison d'empreinte.

### Ce que l'audit de 492 images a revele sur les prompts

- `_manger` **42 recalages** et `_funfact` **31** a eux seuls = 76 % des defauts. Schema
  stereotype : le `_funfact` est le hero recadre sans l'enfant (il n'illustre donc jamais le champ
  `fait`), le `_manger` montre la bete qui **boit**, museau dans l'eau, gueule vide.
- **Une ACTION qui pose la proie morte au sol produit une scene de curee**, quels que soient les
  INTERDITS ecrits plus bas : le modele peint l'ACTION. Formuler en **chasse sur proie vivante**
  ou **capture d'une proie entiere portee** (L-D31).
- Une comparaison de taille glissee dans un prompt est lue comme une **consigne d'espece**
  (« de la taille d'un lapin » a produit de vrais lapins au Cretace). Decrire la silhouette.
- Un **alignement d'animaux libres ne fait pas une echelle** : l'oeil ne le lit pas comme une
  mesure. Utiliser le dispositif enfant + objet familier, qui fonctionne dans toute la collection.

## Détails techniques (rappel)

- ChatGPT sert les images générées sur `img[src*="backend-api/estuary/content"]` (plus `oaiusercontent`).
- Connexion Playwright via CDP `http://127.0.0.1:9222` (`chromium.connectOverCDP`). `browser.close()` ne ferme PAS Brave, juste la connexion.
- Playwright réutilisé depuis `studio/minijeux/tests/node_modules` (pas de réinstall).
- Conversion ffmpeg (pas d'ImageMagick sur la machine) : posterisation 16 niveaux via `lutyuv=y='round(val/255*15)*17'`.
