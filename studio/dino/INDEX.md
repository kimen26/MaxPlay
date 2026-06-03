# Pôle DINO — INDEX (catalogue navigable)

> Encyclopédie dinosaure + voyage dans le temps pour Max (4 ans). Pôle transverse (jeu + audio narré).
> Règles auto-chargées : [`CLAUDE.md`](CLAUDE.md). Décisions verrouillées : [`figees/encyclopedie.md`](figees/encyclopedie.md).

## 🎮 Le produit (code déployé — dans site/)

| Quoi | Fichier |
|------|---------|
| UI encyclopédie (3 onglets) | [`../site/dev-dinos.html`](../../site/dev-dinos.html) |
| Données 50 dinos + 9 familles + échelle | [`../site/js/dinos-data.js`](../../site/js/dinos-data.js) |
| Audio (8 récits + 4 menus + 2 spéciaux + 22 dinos) | [`../site/audio/dinos/`](../../site/audio/dinos/) |
| Images dino | [`../site/img/dinos/`](../../site/img/dinos/) |
| Galeries images (local + grok) | [`../site/js/dinos-images-local.js`](../../site/js/) · `dinos-images-grok.js` |

## 🗂️ Gouvernance (pmo/)

| Fichier | Rôle |
|---------|------|
| [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) | Chiffres clés (counts, échelle, casting voix, audio) |
| [`pmo/decisions.md`](pmo/decisions.md) | Décisions datées + questions ouvertes |
| [`pmo/sprint-log.md`](pmo/sprint-log.md) | Journal sessions |
| [`pmo/backlog.md`](pmo/backlog.md) | Tickets EP + leçons L |
| [`pmo/audit-trail.md`](pmo/audit-trail.md) | Traces audits |
| [`figees/encyclopedie.md`](figees/encyclopedie.md) | 🔒 Décisions verrouillées (Tritri, audio, UI) |

## 📚 Sources contenu (content/ — ne jamais réinventer)

| Fichier | Contenu |
|---------|---------|
| [`content/_PROCESS-DIALOGUE-PEDAGOGIQUE.md`](content/_PROCESS-DIALOGUE-PEDAGOGIQUE.md) | LA méthode dialogue 4 ans (charte→factcheck→écriture→panel→boucles) |
| [`content/_RECITS-EPOQUES-DIALOGUE.md`](content/_RECITS-EPOQUES-DIALOGUE.md) | Dialogue final des 8 récits d'époque (source audio) |
| [`content/_RECITS-EPOQUES-FOND.md`](content/_RECITS-EPOQUES-FOND.md) · [`-BRUT`](content/_RECITS-EPOQUES-BRUT.md) | Fond factuel + brouillon des récits |
| [`content/_ECHELLE-REFERENTIEL.md`](content/_ECHELLE-REFERENTIEL.md) | Échelle de comparaison honnête (référentiel) |
| [`content/_DINOS-MESURES-CONSOLIDE.md`](content/_DINOS-MESURES-CONSOLIDE.md) | Mesures consolidées (taille/poids cross-checkées) |
| [`content/_ETYMO-COMPLET-60.md`](content/_ETYMO-COMPLET-60.md) · [`-RACINES-50`](content/_ETYMO-RACINES-50.md) | Étymologies grec/latin |
| [`content/_FACTCHECK-9-CERATOPSIENS.md`](content/_FACTCHECK-9-CERATOPSIENS.md) | Table de vérité cératopsiens |
| [`content/_BLOC-B-CANONIQUE.md`](content/_BLOC-B-CANONIQUE.md) | Bloc Taille verbatim (anti-dérive chiffres) |

## 🛠️ Scripts (content/)

| Script | Rôle |
|--------|------|
| [`content/generate-audio-segments.py`](content/generate-audio-segments.py) · `_gen-audio-*.sh` · `_gen-recaps.sh` | Génération audio dino |
| [`content/_md2json*.cjs`](content/) | Scripts md → JSON text-to-dialogue |
| [`content/_gen-grok.cjs`](content/_gen-grok.cjs) · `_gen-prompts-grok.cjs` | Galerie images Grok |
| [`content/_export-fiches.cjs`](content/_export-fiches.cjs) · `_blocB-canonique-50.cjs` | Exports depuis dinos-data |
| [`content/scripts-audio/`](content/scripts-audio/) | Scripts dialogue par groupe + JSON |

## 👥 Équipe (.claude/agents/)

| Agent | Rôle |
|-------|------|
| `dino-pmo` (haiku) | FOND — persistance pmo/, décisions, leçons |
| `dino-archiviste` (haiku) | FORME — structure, refs, gabarit, surveille le code site/ dino |
| `dino-conseiller` (sonnet) | Créatif — péda 4 ans, fact-check Grokipedia, écriture audio, taxo |

## État (2026-06-03)

- **50 dinos**, **9 familles** (noms scientifiques), **4 régimes** alimentaires.
- Audio : 8 récits d'époque + 4 menus (voix réelle) + 2 spéciaux + 22 dinos (5 blocs). Reste = TTS navigateur.
- Voyage : indicateur d'avancement (reset session). Fil rouge Tritri.
