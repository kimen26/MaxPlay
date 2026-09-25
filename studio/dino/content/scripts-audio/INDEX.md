# scripts-audio — carte

> Dialogues audio dino (Narrateur/Narratrice + Wex), source du texte qui part en génération ElevenLabs.
> Canon = FR. Zéro chiffre en dur ici (doctrine GED) : comptes exacts dans `studio/dino/memory/INVARIANTS.md`
> ou `node studio/dino/content/scripts/export/_gen-etat-dinos.cjs`.

## Où est le canon

- **`fr/V3/<id>.md`** — script canon par dino, 4 blocs (A présentation · B taille · C comment il vivait · D le truc fou), en-tête « Chiffres data » régénéré depuis `content/dinos/<id>.json` (jamais à la main). C'est le texte qui part en génération audio FR.
- **`fr/V3/_archive-2026-09-05-lots/`** — anciens découpages par lot, dépassés par le fichier par dino.
- **`en/`, `es-es/`, `pt-br/`** — dérivés langue (fiches + `json/` segments tagués), miroir de la structure `fr/`. Statut par langue : `studio/dino/content/i18n/INDEX.md`.

## Fichiers transverses (racine `scripts-audio/`)

| Fichier | Rôle |
|---|---|
| `_TEMPLATE-4blocs-dialogue.md` | Gabarit vierge des 4 blocs pour une nouvelle fiche |
| `_LEXIQUE-PRONONCIATION.md` | Respellings FR (noms latins difficiles à dire) |
| `_DICO-RACINES-AUDIO.md` | Textes audio de l'onglet Le dico (racines grec/latin) |
| `_ACCROCHES-MENU-FAMILLES-REGIMES.md` | Accroches courtes (2-7 s) des menus/onglets |
| `_PILOTES-V2.md` | Traces des 3 fiches pilotes V2 (avant généralisation V3) |
| `_methode/` | Consignes d'écriture + historique des plans de réécriture V3 (contexte, pas du contenu à générer) |
| `_archive/sessions/` | Sessions de relecture archivées (canon-sans-numéro : jamais supprimé, daté) |

## Outils qui lisent ce dossier

- `scripts/export/_gen-chiffres-data-header.cjs` — régénère l'en-tête « Chiffres data » de chaque `fr/V3/<id>.md` depuis la fiche JSON canon.
- `scripts/export/check-coherence-data-narre.cjs` — compare les chiffres dits en BLOC B au JSON (avertissement `npm run check`).
- `scripts/audio/_md2json-v3.cjs` — convertit un `.md` V3 en segments JSON tagués prêts pour génération (exclut les fichiers de service `_RELECTURE-*`, `_FACTCHECK-*`, `CONSIGNES`, `diagnostic-*`).

_Créé 2026-09-25 (EP-D16), après archivage de la session relecture V3 (EP-ARCH-01)._
