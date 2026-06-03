# Encyclopédie Dinosaure (EP-039) — INDEX

> Point d'entrée du dossier. Jeu : [`game/web/dev-dinos.html`](../../game/web/dev-dinos.html) · Données : [`game/web/js/dinos-data.js`](../../game/web/js/dinos-data.js) (50 dinos).
> Rangé 2026-05-23 (suppression de 5 artefacts one-shot consommés).

## 📐 Process & méthode (à lire en premier)

| Fichier | Rôle |
|---------|------|
| [`_PROCESS-DIALOGUE-PEDAGOGIQUE.md`](_PROCESS-DIALOGUE-PEDAGOGIQUE.md) | **LA méthode** réutilisable : charte → fact-check → écriture // → 2 conseillers → panel lecteur → boucles. Aussi en mémoire globale `reference_process_dialogue_pedagogique`. |

## 📚 Sources de vérité (contenu — ne jamais réinventer)

| Fichier | Contenu |
|---------|---------|
| [`_FACTCHECK-9-CERATOPSIENS.md`](_FACTCHECK-9-CERATOPSIENS.md) | Table de vérité des 9 cératopsiens ajoutés 2026-05-22 (taille/étymo/signature/prédateur/fait). |
| [`_ETYMO-RACINES-50.md`](_ETYMO-RACINES-50.md) | Décomposition des racines grec/latin des noms (mécanique pédagogique « tri=trois, cérat=corne »). |
| [`_BLOC-B-CANONIQUE.md`](_BLOC-B-CANONIQUE.md) | Texte verbatim du bloc Taille (source figée pour l'audio, anti-dérive des chiffres). |
| [`_INBOX-fiches-pdf-distille.txt`](_INBOX-fiches-pdf-distille.txt) | Matière brute distillée du PDF Fiches (vitesse/dents/griffes/empreinte — non encore exploitée). |

## 🎨 Images Grok

| Fichier | Rôle |
|---------|------|
| [`_PROMPTS-GROK.txt`](_PROMPTS-GROK.txt) | Prompts Grok prêts à coller pour les vues manquantes (proportions réelles, batailles forêt/jungle, têtes variées, enfant habillé). |
| [`_gen-prompts-grok.cjs`](_gen-prompts-grok.cjs) | Génère `_PROMPTS-GROK.txt` depuis l'état réel (dinos-data + galerie). Relancer après ajout de dino/image. |
| [`_gen-grok.cjs`](_gen-grok.cjs) | Filtre les images `img/dinos/grok/` (KO exclus) → `js/dinos-images-grok.js` (galerie). Relancer après dépôt d'images. |

## 🔊 Outils audio (génération ElevenLabs)

| Fichier | Rôle |
|---------|------|
| [`generate-audio-segments.py`](generate-audio-segments.py) | Génère les segments audio par dino. |
| [`_md2json.cjs`](_md2json.cjs) · [`_md2json-special.cjs`](_md2json-special.cjs) | Convertissent les scripts md (groupe-*, special-*) → JSON text-to-dialogue. |
| [`_gen-audio-top.sh`](_gen-audio-top.sh) | Boucle curl text-to-dialogue → MP3 (top dinos). |
| [`_export-fiches.cjs`](_export-fiches.cjs) · [`_blocB-canonique-50.cjs`](_blocB-canonique-50.cjs) | Exports/regénérations ponctuelles depuis dinos-data. |

## 📁 Sous-dossiers

| Dossier | Contenu |
|---------|---------|
| [`scripts-audio/`](scripts-audio/) | Scripts dialogue Wex/Narrateur (4 blocs, boucle fermée) : `groupe-*.md` (50 dinos par famille), `special-pangee/extinction.md`, `_TEMPLATE-4blocs-dialogue.md`, `_TEMOINS-v2-bouclefermee.md`, `json-top/` (payloads JSON générés). |
| [`assets/audio/`](assets/audio/) | Segments JSON `_seg-*` + MP3 produits. |

## État

- **50 dinos** dans le jeu (compté autoritatif `DINOS.length` 2026-06-03 ; l'ancien « 60 » comptait des entrées non finalisées).
- ⚠️ Catalogue du **pôle** : voir [`../INDEX.md`](../INDEX.md). Ce fichier-ci décrit le **dossier `content/`** (scripts + sources).
- Audio ElevenLabs : top 11 + Pangée + Extinction. Reste = TTS navigateur (quota EL limité).
- Images : à compléter via `_PROMPTS-GROK.txt`. À regénérer : Torosaure, Einiosaure (anatomie ratée).
