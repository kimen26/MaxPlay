# Reprise production images dino paléoart — état 2026-06-19

> ⛔ **ARRÊT : limite de crédits atteinte sur ChatGPT ET sur Grok.** Reprendre quand les crédits reviennent.
> Pilotage de la reprise prévu **depuis Telegram** (mode chatbot). Dire par ex. : « reprends les dinos sur Grok » ou « reprends sur ChatGPT ».

---

## ✅ PIPELINE FINALISÉ (validé visuellement sur Diplodocus)
Skill : **`dino-paleoart`** (déclencheur). Scripts dans `~/.claude/skills/dino-images-lunii/scripts/`.
Prompt structuré en sections : CONTEXTE · RÔLE · OBJECTIF · LE DINOSAURE (specs chiffrées) · L'ENFANT · DÉCOR riche · CAMÉRA · STYLE.
Réglages gravés : zéro Streisand · valeurs chiffrées (hauteur fiche prime) · décor étoffé (flore/sol/faune) · **caméra « voir l'animal en ENTIER même si très grand + nature sur les bords »** · couleur en liberté totale · enfant = repère intégré.

## 🔌 LES 2 CANAUX (toujours viser le PROJET, pas un chat lambda)
| Canal | Cible | Statut |
|------|-------|--------|
| **ChatGPT** | PROJET « Dinosaure » `g-p-6a2c67ebc22c8191971eecf695ec5fec` (PAS le GPTs `g-6a2f05b2…`) | ⛔ crédits épuisés |
| **Grok** | PROJET « Dinosaures » `89187fb9-a866-4373-82c4-cd136bb6905c` | ⛔ crédits épuisés |
- Prérequis : Brave debug lancé (`launch-brave.ps1`, port 9222), logué aux deux.
- Le batch ouvre un **nouveau chat dans le projet** à chaque dino (ChatGPT : `--url projet` ; Grok : `--new`).

## ▶️ COMMANDES DE REPRISE
```bash
cd c:/ProjetsPerso/Claude_Projects/MaxPlay
# ChatGPT (défaut) :
node ~/.claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs <id1> <id2> ...
# Grok :
node ~/.claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs --grok <id1> <id2> ...
# Marins (enfant sur ponton, aquarium au lieu de Paris) :
node ~/.claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs --grok --marin <id> ...
# Vérifier un prompt sans générer :
node ~/.claude/skills/dino-images-lunii/scripts/batch-dino-series.mjs <id> --preview
```
Sortie : `site/img/dinos/_new-xxl/`. Avancement : `_PROGRESS.tsv`. Arrêt propre sur limite = exit 5.

## 📋 ÉTAT (rappel) — les images du 1er batch sont l'ANCIENNE version (GPTs custom, à repasser)
> ⚠️ Les 110 PNG déjà dans ce dossier viennent du **GPTs custom** (pas du projet, pas le nouveau pipeline). On les GARDE mais on **repassera tout** avec le pipeline finalisé (couleur + décor + caméra). Donc à la reprise : **re-générer dans le projet**, ça écrasera proprement.

### À (re)produire avec le pipeline finalisé — ORDRE conseillé
Lots de ~4 terrestres, puis marins en `--marin`. IDs exacts : `dino-fields.mjs --list`.
- Théropodes : tyrannosaurus, spinosaurus, giganotosaurus, carcharodontosaurus, allosaurus, tarbosaurus, albertosaurus, ceratosaurus, dilophosaurus, carnotaurus, cryolophosaurus, baryonyx, therizinosaurus
- Sauropodes : brachiosaurus, diplodocus, apatosaurus, camarasaurus, amargasaurus, plateosaurus, patagotitan
- Thyréophores/cornus/becs : ankylosaurus, euoplocephalus, stegosaurus, kentrosaurus, triceratops, torosaurus, protoceratops, pentaceratops, centrosaurus, parasaurolophus, edmontosaurus, iguanodon, pachycephalosaurus
- Raptors/petits : velociraptor, deinonychus, utahraptor, microraptor, troodon, gallimimus, oviraptor, archaeopteryx
- Volants : pteranodon, quetzalcoatlus
- Avant-dino : dimetrodon
- **Marins (--marin)** : mosasaurus, elasmosaurus, liopleurodon, ophthalmosaurus, archelon, shonisaurus, ichthyosaurus

> Carcharodontosaure + Dilophosaure : avaient été bloqués par la modération (mots crus) — le pipeline narratif/positif actuel devrait passer ; surveiller.

## Après les images couleur
1. Choisir intégration UI (1 vignette ou galerie 5 scènes — Q-DINO-12 ouverte).
2. Version **Lunii fond noir** par dino (skill `dino-images-lunii`, `to-lunii.sh`).
3. MAJ `site/js/dinos-data.js` : torosaurus + pentaceratops `grok/*.jpg` → `Torosaurus.png` / `Pentaceratops.png`.
4. Ranger `_new-xxl/*` → `site/img/dinos/` + commit/push + log dino-pmo.
