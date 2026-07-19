# Pôle DINO — INDEX (catalogue navigable)

> Encyclopédie dinosaure + voyage dans le temps pour Max (4 ans). Pôle transverse (jeu + audio narré).
> Règles auto-chargées : [`CLAUDE.md`](CLAUDE.md). Décisions verrouillées : [`figees/encyclopedie.md`](figees/encyclopedie.md).

## 🎮 Le produit (code déployé — dans site/)

| Quoi | Fichier |
|------|---------|
| UI encyclopédie (4 onglets) | [`../site/dev-dinos.html`](../../site/dev-dinos.html) |
| Données dinos + familles + échelle (source de vérité) | [`../site/js/dinos-data.js`](../../site/js/dinos-data.js) |
| Racines dico (généré, onglet Le dico) | [`../site/js/dinos-racines.js`](../../site/js/dinos-racines.js) |
| Audio (récits + menus + spéciaux + fiches dino) | [`../site/audio/dinos/`](../../site/audio/dinos/) |
| Images dino | [`../site/img/dinos/`](../../site/img/dinos/) |
| Galeries images (local + grok) | [`../site/js/dinos-images-local.js`](../../site/js/) · `dinos-images-grok.js` |
| 🎒 Images Lunii (emblèmes familles + couverture, fond noir natif) | [`content/lunii/`](content/lunii/INDEX.md) → assemblées par [`../lunii/`](../lunii/CLAUDE.md) |

## 🗂️ Gouvernance (pmo/)

| Fichier | Rôle |
|---------|------|
| [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) | Chiffres clés (counts, échelle, casting voix, audio) |
| [`pmo/decisions.md`](pmo/decisions.md) | Décisions datées + questions ouvertes |
| [`pmo/sprint-log.md`](pmo/sprint-log.md) | Journal sessions |
| [`pmo/backlog.md`](pmo/backlog.md) | Tickets EP + leçons L |
| [`pmo/audit-trail.md`](pmo/audit-trail.md) | Traces audits |
| [`figees/encyclopedie.md`](figees/encyclopedie.md) | 🔒 Décisions verrouillées (Tritri, audio, UI) |

## 📚 Sources contenu (`content/` — ne jamais réinventer)

> Cartographie détaillée : [`content/INDEX.md`](content/INDEX.md) (hub) + 1 INDEX par sous-dossier.

| Dossier | Contenu |
|---------|---------|
| [`content/sources/recits/`](content/sources/recits/) | 8 récits d'époque : FOND (factuel) · BRUT (brouillon) · DIALOGUE (final, source audio) |
| [`content/sources/fiches/`](content/sources/fiches/) | 50 fiches Grokipédia (contexte-prompt image) · datacheck 2026-06 · factcheck 9 cératopsiens |
| [`content/sources/mesures/`](content/sources/mesures/) | Mesures consolidées · échelle référentiel · Bloc B canonique (taille verbatim, anti-dérive) |
| [`content/sources/etymo/`](content/sources/etymo/) | Étymologies grec/latin (racines-50, complet-60) |
| [`content/sources/_PROCESS-DIALOGUE-PEDAGOGIQUE.md`](content/sources/_PROCESS-DIALOGUE-PEDAGOGIQUE.md) | LA méthode dialogue 4 ans (charte→factcheck→écriture→panel→boucles) |
| [`content/inbox/`](content/inbox/) | Matière brute non exploitée (PDF Fiches distillé) |

## 🎯 Données structurées (`content/data/` — nourrit les features)

| Fichier | Rôle |
|---------|------|
| [`content/data/racines.json`](content/data/racines.json) | Dictionnaire racines grec/latin (69 racines) + décompo par dino. Source de la future page **Dico**, du **Quiz** et des fiches. Régénéré par [`scripts/export/_etymo2racines.cjs`](content/scripts/export/_etymo2racines.cjs). |

## 🛠️ Scripts (`content/scripts/`)

| Dossier | Rôle |
|---------|------|
| [`content/scripts/audio/`](content/scripts/audio/) | `_md2json*.cjs` (md → JSON text-to-dialogue) · `_gen-audio-*.sh` (curl → MP3) · `_gen-recaps.sh` |
| [`content/scripts/images-grok/`](content/scripts/images-grok/) | `_gen-grok.cjs` (galerie img → js) · `_gen-prompts-grok.cjs` (prompts Grok) |
| [`content/scripts/export/`](content/scripts/export/) | `_blocB-canonique-50.cjs` · `_export-fiches.cjs` · `_etymo2racines.cjs` (regénèrent depuis dinos-data / source) |
| [`content/scripts-audio/`](content/scripts-audio/) | Scripts dialogue Wex/Narrateur : `groupe-*.md`, `special-*.md`, template, témoins, `json-top/` (cache JSON) |

## 👥 Équipe (.claude/agents/)

| Agent | Rôle |
|-------|------|
| `dino-pmo` (sonnet) | FOND — persistance pmo/, décisions, leçons |
| `dino-conseiller` (sonnet) | Créatif — péda 4 ans, fact-check Grokipedia, écriture audio, taxo |

## État

> **DEC-GED-001** : cet INDEX ne cite aucun count en dur (un chiffre recopié ment). Chiffres → [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) (tracker) · source produit → [`../../site/js/dinos-data.js`](../../site/js/dinos-data.js). État de complétude par dino → outil `_ETAT-DINOS.md` (généré, `/dino-pmo-audit`).

- **Compte dinos · familles · régimes** → [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md).
- Familles : titres = noms scientifiques (table clé↔libellé dans INVARIANTS). 4 régimes alimentaires.
- Audio : récits d'époque + menus (voix réelle) + spéciaux + fiches dino (5 blocs). Reste = TTS navigateur. Cénozoïque ✅ livré (9 blocs complétés 2026-07-13). ⚠️ 2 accroches familles Cénozoïque (`menu-fam-mammiferes`, `menu-fam-oiseaux`) manquent → TTS navigateur (voir backlog).
- Voyage : indicateur d'avancement (reset session). Fil rouge Tritri.
