# content/sources/ — Sources de vérité

> Prose de recherche **fact-checkée**. On ne réinvente JAMAIS un chiffre / nom / étymo : on lit ici.
> La donnée structurée qui en dérive vit dans [`../data/`](../data/). Hub du dossier : [`../INDEX.md`](../INDEX.md).

## 📜 recits/ — 8 récits d'époque (voyage, Narratrice F + Wex)

| Fichier | Rôle |
|---------|------|
| [`recits/RECITS-EPOQUES.md`](recits/RECITS-EPOQUES.md) | 🔒 **CANON** (source audio en prod, lu par `_md2json-recits-v3.cjs`). Ex-V5, renommé canon-sans-numéro 2026-07-03 (DEC-GED-001). |
| [`recits/_METHODE-DIRECTION-AUDIO.md`](recits/_METHODE-DIRECTION-AUDIO.md) | Doc des tags/direction audio (méthode) |
| `recits/_archive/2026-07-03-recits-versionnite/` | Historique (V0 « faux-final », V3, V4, BRUT, FOND) — gardé, jamais supprimé, hors du présent |

## 🦕 fiches/

| Fichier | Rôle |
|---------|------|
| [`fiches/_FICHES-DINOS-GROKIPEDIA.md`](fiches/_FICHES-DINOS-GROKIPEDIA.md) | 50 fiches contexte-prompt image (Grokipédia) + 5 prompts image/dino |
| [`fiches/_DATACHECK-GROKIPEDIA-2026-06.md`](fiches/_DATACHECK-GROKIPEDIA-2026-06.md) | Datacheck data vs Grokipedia |
| [`fiches/_FACTCHECK-9-CERATOPSIENS.md`](fiches/_FACTCHECK-9-CERATOPSIENS.md) | Table de vérité 9 cératopsiens |
| `fiches/_FICHES-CONTENU.md` | _(généré à la demande par `../scripts/export/_export-fiches.cjs`, non tracké)_ |

## 📏 mesures/

| Fichier | Rôle |
|---------|------|
| [`mesures/_DINOS-MESURES-CONSOLIDE.md`](mesures/_DINOS-MESURES-CONSOLIDE.md) | Tailles / poids cross-checkés |
| [`mesures/_ECHELLE-REFERENTIEL.md`](mesures/_ECHELLE-REFERENTIEL.md) | Échelle de comparaison honnête (référentiel) |
| [`mesures/_BLOC-B-CANONIQUE.md`](mesures/_BLOC-B-CANONIQUE.md) | Bloc Taille verbatim (anti-dérive) — ⚠️ **périmé** vs `dinos-data.js`, régénérer via `../scripts/export/_blocB-canonique-50.cjs` |

## 🏛️ etymo/

| Fichier | Rôle |
|---------|------|
| [`etymo/_ETYMO-RACINES-50.md`](etymo/_ETYMO-RACINES-50.md) | Décompo racines → **source ACTIVE de [`../data/racines.json`](../data/racines.json)** (lu par `_etymo2racines.cjs`). ⚠️ **périmé** : ne couvre que 50 dinos, pas les 8 Cénozoïque + Edmontonia. |
| [`etymo/_ETYMO-COMPLET-60.md`](etymo/_ETYMO-COMPLET-60.md) | Étymo au bon scope (60) + bon format oral, mais **pas encore câblé**. ⏳ Bascule canon = ticket EP-D-GED (vérifier couverture 8 mammifères/Titanis avant de repointer le générateur). |

## 🧭 (racine sources/)

| Fichier | Rôle |
|---------|------|
| [`_PROCESS-DIALOGUE-PEDAGOGIQUE.md`](_PROCESS-DIALOGUE-PEDAGOGIQUE.md) | LA méthode dialogue 4 ans (réutilisable, aussi en mémoire globale) |
