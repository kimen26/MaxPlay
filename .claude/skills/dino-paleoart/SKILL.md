---
name: dino-paleoart
description: Générer les séries d'images paléoart réalistes des dinos MaxPlay (échelle enfant 1m, alimentation, écosystème, Paris bus RATP, funfact) en pilotant le PROJET "Dinosaure" de ChatGPT (ou le projet Grok en plan B) via Brave+Playwright. Direction artistique = prompt système paléoart (identité visuelle couleur, échelle prioritaire chiffrée, prédation safe). Auto-trigger sur image dino paléoart, série dino, génère les dinos, batch images dinosaures, scènes dino, reprendre les dinos, dino à l'échelle enfant, dino Paris bus.
disable-model-invocation: true
---

# Skill — Séries d'images paléoart dinos MaxPlay

> Pipeline finalisé 2026-06-19. Pilote au choix le **PROJET ChatGPT « Dinosaure »** ou le **PROJET Grok « Dinosaures »** (`--grok`) via Brave debug + Playwright CDP. Les deux portent la direction artistique ; on bascule quand un quota d'images est épuisé.
> Jumeau du skill [`dino-images-lunii`](../dino-images-lunii/SKILL.md) (qui couvre AUSSI les emblèmes Lunii fond noir 16 gris). Ici = **fiches couleur de l'app**.

## ⭐ Direction artistique = prompt système du PROJET
La charte (échelle = priorité absolue **chiffrée**, identité visuelle couleur par espèce, prédation safe, règle enfant images 1-2, 9 scènes) vit dans le **projet ChatGPT** et est sauvegardée ici :
[`../dino-images-lunii/PALEOART-SYSTEM-PROMPT.md`](../dino-images-lunii/PALEOART-SYSTEM-PROMPT.md)

## 🔌 LES 2 CANAUX (toujours viser le PROJET, jamais un chat lambda)
| Canal | Cible (PROJET) | Script | Sélecteur image | DL image | Quota/session |
|------|----------------|--------|-----------------|----------|---------------|
| **ChatGPT** (défaut) | « Dinosaure » `https://chatgpt.com/g/g-p-6a2c67ebc22c8191971eecf695ec5fec-dinosaure/project` | `gpt-gen-dino.mjs` | `img[src*="backend-api/estuary/content"]` | fetch() page OK | **~15-20 images** (~3-4 dinos) |
| **Grok** (`--grok`) | « Dinosaures » `https://grok.com/project/89187fb9-a866-4373-82c4-cd136bb6905c` | `grok-gen-dino.mjs` | `img[src*="assets.grok.com"][src*="/generated/"]` | `page.request.get()` (fetch=403) | **~10-15 images** (~2-3 dinos) |
- **Toujours le PROJET** (pas le GPTs custom `g-6a2f05b2…` qui n'a pas la direction artistique ; pas un chat libre).
- Nouveau chat par dino : ChatGPT `--url <projet>`, Grok `--new`. Géré auto par `batch-dino-series.mjs`.
- Prérequis : `launch-brave.ps1` (port 9222), logué aux DEUX. Brave reste ouvert d'une session à l'autre.
- Les deux ont un **quota d'images** : à épuisement → exit 5 (arrêt propre) → basculer sur l'autre canal ou attendre.
- **Stratégie optimale** : alterner ChatGPT et Grok quand un canal est en limite. ChatGPT = plus rapide (images HD ~3Mo), Grok = plus stable mais images plus petites (~400Ko).

## ▶️ Commandes (reprise pilotable depuis Telegram)
```bash
cd c:/ProjetsPerso/Claude_Projects/MaxPlay
node .claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs <ids...>            # ChatGPT
node .claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs --grok <ids...>     # Grok
node .claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs --grok --marin <ids...>  # marins
node .claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs <id> --preview      # voir le prompt sans générer
```
État + ordre de reprise + ids : `site/img/dinos/_new-xxl/_REPRISE.md`. Avancement : `_PROGRESS.tsv`.

## 🎯 ÉCHELLE — mesures brutes + enfant = seul repère (leçons 2026-06-19)
- **On donne les MESURES RÉELLES brutes** (longueur, hauteur au garrot, poids) + « l'enfant mesure 1 m ». Le LLM cale le ratio lui-même. C'est automatisé : `scaleSentence` lit la data.
- **NE PAS sur-instruire** (« il arrive au genou », « ×4 fois la tête ») : ça embrouille le modèle ET introduit nos propres erreurs. Le LLM n'est pas débile — les mesures suffisent. (Confirmé Diplodocus : avec mesures seules → ratio enfin correct.)
- **PAS de règle graduée** dans l'image : la barre « 1 m » se dessine à une taille au pif et ment (elle dépassait la tête de l'enfant). **L'enfant d'1 m EST le mètre-étalon**, point. Image propre sans règle ni texte.
- **On pousse NOUS les chiffres** (data MaxPlay + fiches Grokipedia) ; l'outil complète posture/plumage/décor. Sans chiffre → Vélociraptor géant (cliché Jurassic Park).

## 🧱 PROMPT STRUCTURÉ EN SECTIONS (méthode officielle, leçon-clé 2026-06-19)
Le meilleur résultat vient d'un prompt **découpé proprement en sections**, pas d'une prose continue ni d'un empilement de contraintes. `batch-dino-series.mjs` génère :
```
CONTEXTE : encyclopédie dino pour enfant de 4 ans.
RÔLE : illustrateur paléoart documentaire réaliste.
OBJECTIF : [but de la scène].
LE DINOSAURE : (liste à puces)
  - identité, régime, époque
  - Taille réelle : X m de long, Y m de hauteur, Z tonnes  ← chiffres TOUJOURS
  - specs morpho factuelles (silhouette, tête, dents, peau, pieds) ← depuis la fiche Grokipedia, avec valeurs
  - Détail le plus reconnaissable
  - Livrée : couleurs propres à l'espèce
L'ENFANT : (scène #1) garçon 4 ans, 1 m, t-shirt+short, intégré au décor, observe.
DÉCOR : [habitat / Paris / aquarium].
CAMÉRA : [profil, vue large / gros plan...].
STYLE : paléoart réaliste, lumière naturelle. Pas de texte ni de chiffre.
```
**Réglages de section qui font la qualité (validés Diplodocus 2026-06-19) :**
- **DÉCOR = 2-3 lignes soignées** (jamais « son habitat naturel ») : lieu+époque, végétation de l'époque à différentes hauteurs (selon ce que le dino mangeait, pioché dans la puce « Mange » de la fiche), sol détaillé + petite faune (insectes, libellules). `sectionDecor`.
- **CAMÉRA — formulation Papa Yann (meilleur résultat, 2026-06-19)** : « comme une photo de safari prise de loin, de profil. Il est **impératif de voir l'animal en ENTIER (même s'il est très grand)**, du museau au bout de la queue, et d'avoir **encore de la largeur (nature sur les bords)** ». Deux leviers : « même s'il est très grand » anticipe et désamorce le réflexe du modèle de zoomer (qui coupait la queue) ; « nature sur les bords » = marge. Bat les % chiffrés et le « téléobjectif/panoramique ». `CAM_LARGE`.
- **COULEUR = liberté totale, formulée en possibilités** : on ne connaît PAS les vraies couleurs → lister ce qu'il PEUT mettre (teintes variées : gris-bleu, vert-olive, brun-sable, ocre, ardoise, roux, ventre clair ; motifs : rayures, bandes, taches, points, ocelles, dégradés, marques faciales) et le laisser choisir (« surprends-moi avec une livrée qui lui va bien »). Ne PAS contraindre (« jamais fluo » = Streisand inutile), ne PAS prétendre « couleurs propres à l'espèce » (faux).

**Règles d'or absolues (gravées après corrections répétées de Papa Yann) :**
- **ZÉRO Streisand** : ne JAMAIS écrire ce qu'on ne veut pas (« pas un tronc épais », « rien de coupé », « sans règle »). Nettoyé automatiquement (`cleanPuce` retire les segments « pas/uniquement/plutôt/probable »).
- **DONNER LES VALEURS** : chiffres réels (longueur, hauteur, queue, cou, griffe…), jamais « très longue queue ». La fiche Grokipedia a souvent les sous-mesures → on les extrait ; la **hauteur de la fiche prime** sur la data (ex. Diplodocus 3 m épaule, pas 4,5 m).
- **Ne pas mélanger** dino / scène / cadrage : chacun sa section.
- « Pas de texte ni de chiffre » (formule simple), jamais « image propre / sans règle » (vocabulaire flou/parasite).
- Vérifier un prompt à sec avec `--preview` avant de générer.

## 🦴 SIGNATURE MORPHOLOGIQUE martelée (leçon 2026-06-19)
Les mesures génériques ne suffisent pas : il faut **marteler la silhouette reconnaissable** en tête de prompt (proportions caractéristiques). Ex. Diplodocus : queue en **fouet FIN** qui s'effile (pas un tronc épais), **cou immense**, **petite tête fine**. Auto : `ficheSignature` extrait la ⭐ signature des fiches Grokipedia (50 dinos en ont), sinon table manuelle `MORPHO` (8 sans fiche : marins + Patagotitan + Centrosaurus). Sans ça, le modèle fait une silhouette passe-partout et on perd ce qui rend l'animal unique.

## 🖼️ CADRAGE — animal ENTIER, queue comprise (leçon 2026-06-19)
« Corps complet » ne suffit pas : le modèle **coupe la queue** (vu sur 3 Diplodocus). Exiger explicitement « du museau au bout de la queue, la queue COMPLÈTE dans le cadre, rien de coupé » + « recule beaucoup la caméra pour que l'enfant ET tout l'animal queue comprise tiennent ». Crucial pour les sauropodes/longues queues (c'est justement leur spécificité de longueur).

## 🎨 IDENTITÉ VISUELLE — OSER (leçon 2026-06-19)
« Colorée plausible » est trop timide → le modèle fait du brun-gris fade. Demander une livrée **ORIGINALE et marquante**, plutôt colorée mais crédible (inspiration vivant réel : faisan, casoar, varan, okapi, oiseaux de paradis). Couleur principale affirmée + ventre clair + secondaire de contraste + motifs nets (bandes, taches, ocelles, marques faciales) + **couleurs de parade nuptiale / signal social** (gorge, contour des yeux, crête). Naturel, jamais fluo/néon cartoon. Ex. validé Diplodocus : dos bleu ardoise à ocelles dorées + masque oculaire rouge. Auto-injecté par `scaleSentence`→`livree` dans `batch-dino-series.mjs`, cohérent sur les 5 scènes.

## Les 5 scènes (noyau MaxPlay) par dino
| Fichier | Scène |
|---|---|
| `<Nom>.png` | #1 échelle enfant 1 m (habillé, terre ferme) |
| `<Nom>_manger.png` | #3 alimentation non graphique |
| `<Nom>_ecosysteme.png` | #6 interaction écologique |
| `<Nom>_paris.png` | #7 Paris bus RATP (ou aquarium/port pour marins) |
| `<Nom>_funfact.png` | scène dérivée du `fait:` de la data |
> Mapping complet 9 scènes ↔ 5 dans PALEOART-SYSTEM-PROMPT.md.

## WORKFLOW

1. **Brave debug** : `.claude/skills/dino-images-lunii/scripts/launch-brave.ps1` (port 9222, logué ChatGPT **et** Grok).
2. **Vérifier l'accès** sans coût : sonde la page projet (login + zone de saisie).
3. **Brique d'abord** : 1 dino test (set 5) → lire les PNG → montrer à Papa Yann avant de batcher.
4. **Batch** par lots de ~4 dinos :
   ```
   node .claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs <id1> <id2> ...
   node .claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs --marin <id_marin> ...
   ```
   - ids = ceux de `site/js/dinos-data.js` (cf. `dino-fields.mjs --list`).
   - Sortie : `site/img/dinos/_new-xxl/`. Avancement : `_PROGRESS.tsv`. État reprise : `_REPRISE.md`.
5. **Arrêt propre sur limite** : le script sort en **exit 5** quand ChatGPT signale la limite d'images → reprendre plus tard, ou basculer Grok (`grok-gen-dino.mjs`).
6. **Valider visuellement** chaque lot (`Read` les PNG) — surtout l'échelle (#1) et l'anatomie.

## Canaux
- **ChatGPT projet** (défaut) : `gpt-gen-dino.mjs` (via `batch-dino-series.mjs`).
- **Grok projet** (plan B limite) : `grok-gen-dino.mjs` — projet « Dinosaures » `89187fb9-…`.

## Scripts (dans `dino-images-lunii/scripts/`)
- `batch-dino-series.mjs` — orchestrateur 5 scènes/dino (cible le PROJET, échelle chiffrée auto).
- `gpt-gen-dino.mjs` — 1 image ChatGPT (détecte modération exit 4 / limite exit 5 / timeout exit 3).
- `grok-gen-dino.mjs` — 1 image Grok (plan B).
- `dino-fields.mjs` — extrait les champs d'un dino (`<id>` ou `--list`).
- `launch-brave.ps1`, `to-lunii.sh` (post-traitement Lunii fond noir).

## Règles de prompt (leçons 2026-06-19)
- **Formuler en POSITIF, jamais de consigne Streisand.** Dire « ne mets pas de trait horizontal » → le modèle en met. Décrire seulement ce qu'on VEUT : « une fine flèche verticale graduée collée contre l'enfant, marquée 1 m, du sol au sommet de la tête ; image propre sans autre texte ». Idem : « scène calme et paisible, uniquement des animaux préhistoriques » au lieu de « aucun humain / pas de gore / pas de panique ».
- **Repère d'échelle = règle VERTICALE contre l'enfant** (du sol à la tête), jamais de barre horizontale au sol ni légende posée en bas (moche, cf. 1er Diplodocus).
- **Échelle TOUJOURS chiffrée** (hauteur réelle + où l'animal arrive sur l'enfant) — auto via `scaleSentence`. Sinon raptor géant.
- **Pas de recherche web quand on a la fiche interne** : « n'effectue aucune recherche, illustre seulement » → économise tokens/quota + fiabilité. Recherche tolérée seulement pour les ~8 dinos sans fiche (marins).

## Canaux — Grok pleinement opérationnel (test Diplodocus 2026-06-19)
- Grok rend très bien (couleur, échelle, paléoart). Dispo quand ChatGPT est en limite.
- ⚠️ Récupération image Grok : `assets.grok.com/.../generated/...` renvoie **403 sur fetch() page** → utiliser `page.request.get()` (porte les cookies). Sélecteur : `img[src*="assets.grok.com"][src*="/generated/"]` (≠ profile-picture). Corrigé dans `grok-gen-dino.mjs`.

## Anti-patterns
- ❌ Cibler le GPTs custom au lieu du projet (perte de la direction artistique).
- ❌ Prompt d'échelle sans chiffre → animal géant (bug Vélociraptor).
- ❌ Consigne Streisand (nommer ce qu'on refuse) → le modèle le produit.
- ❌ Barre/légende de mesure horizontale au sol → règle verticale contre l'enfant.
- ❌ Déléguer l'échelle (ou la doc anatomique) à la recherche de l'outil quand on a la donnée.
- ❌ Batcher sans valider 1 brique.
- ❌ Scènes marines avec enfant dans l'eau → ponton/berge, pieds au sec.
- ❌ **Faux positif limite ChatGPT** : le script `gpt-gen-dino.mjs` lisait `document.body.innerText` qui incluait la sidebar avec l'historique des chats (contenant "Limite de génération d'image" — titre d'un ancien chat). **Corrigé** : cibler uniquement la zone de contenu principale (`main` ou `[data-testid="conversation-turn-3"]`), pas tout le body.

## État au 2026-06-28 (session marathon)
**35 dinos complets sur 51** (187 images / 255 = 73%). Canal ChatGPT = principal (22 dinos), Grok = plan B (13 dinos).

| Canal | Dinos complets | Images/session | Stratégie |
|-------|---------------|----------------|-----------|
| ChatGPT | 22 | ~15-20 | Lots de 3-4 dinos |
| Grok | 13 | ~10-15 | Lots de 2-3 dinos |

**Déployés** : `site/img/dinos/paleoart/` (187 images PNG).

**Reste à faire** (16 dinos = 80 images) :
- Ophthalmosaurus, Oviraptor, Pentaceratops, Shonisaurus, Spinosaurus, Stegosaurus, Tarbosaurus, Therizinosaurus, Torosaurus, Triceratops, Troodon, Tyrannosaurus, Utahraptor, Velociraptor
- + Ichthyosaurus funfact, Mosasaurus paris+funfact

**Bug corrigé** : faux positif limite ChatGPT (lecture sidebar historique). Script `gpt-gen-dino.mjs` corrigé pour cibler zone contenu uniquement.
