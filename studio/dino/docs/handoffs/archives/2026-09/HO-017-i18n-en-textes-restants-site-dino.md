# HO-017 — i18n EN : les textes du site dino encore en français

> Statut : pret · Ouvert le 2026-09-05 · Exécutant : sous-agent Sonnet · Orchestrateur : session principale.
> Demande Papa Yann (2026-09-05) : « pour l'anglais il faut que l'intégralité du site soit traduit ».

## Objectif

Quand `dev-dinos.html?lang=en` est ouvert, plus AUCUN texte français ne doit apparaître à l'écran.
La vague HO-001..007 a traduit les fiches (`strings.json` → `dinos`, `familles`) et le dictionnaire UI (`ui.json`).
Restent en français, constaté le 2026-09-05 :

| Zone | Où vit le texte FR | Comment le brancher |
|---|---|---|
| Dico : `sens` (et `translitteration` si elle change) des 85 racines + 16 noms propres | `site/js/dinos-racines.js` (généré depuis `content/sources/etymo/_ETYMO-RACINES-50.md`) | `strings.json` → clé `racines` (objet `{cle: {sens}}`), déjà fusionné par `dinos-i18n.js` — la clé existe mais est VIDE |
| Périodes : `label`, `desc`, `range` des 5 `DINO_PERIODES` | `site/js/dinos-data.js` L154+ | `strings.json` → clé `periodes` (`{id: {label, desc, range}}`), déjà fusionnée — VIDE |
| Régimes : `label` (+ champs texte) des 4 `DINO_CATEGORIES` | `dinos-data.js` L147+ | `strings.json` → clé `categories` — VIDE |
| Intro familles `DINO_FAMILLES_INTRO` | `dinos-data.js` L49 | nouvelle clé `ui.json` (`menu_famille_intro` existe déjà — vérifier laquelle est affichée) |
| Voyage : `label` + `date` des 8 épisodes `JOURNEY` | inline `site/dev-dinos.html` L945-953 | passer les libellés par `T('journey_ep_<id>_label')` / `T('journey_ep_<id>_date')` → clés dans `ui.json` (FR + EN + es-es + pt-br : les 3 `ui.json` doivent rester complets, `_check-ui.cjs` le vérifie) |
| Pangée : `PANGEE.{titre, soustitre, intro, pourquoi, fun_fact, credit, etapes[].{...}}` | `dinos-data.js` L52-96 | étendre `site/js/dinos-i18n.js` : fusion profonde d'une clé `pangee` (objet, `etapes` indexées par `periode`) |
| Extinction : `EXTINCTION.{titre, soustitre, hypotheses[].{titre, texte, label_certitude}, fun_fact}` | `dinos-data.js` L97-146 | idem, clé `extinction` (`hypotheses` indexées par `id`) |

## Fichiers autorisés

- `studio/dino/content/i18n/en/strings.json` (clés `racines`, `periodes`, `categories`, `pangee`, `extinction`)
- `studio/dino/content/i18n/{en,es-es,pt-br}/ui.json` — UNIQUEMENT pour ajouter les nouvelles clés `journey_ep_*` (es-es et pt-br : traduire ces 16 libellés aussi, c'est court)
- `studio/dino/content/i18n/_corpus/corpus-fr.json` si l'extracteur doit apprendre les nouvelles zones (`_extract-corpus-i18n.cjs`)
- `site/js/dinos-i18n.js` (fusion profonde `pangee` / `extinction`)
- `site/dev-dinos.html` : SEULEMENT le bloc `const JOURNEY = [...]` (libellés → `T()`), rien d'autre
- `site/js/i18n/dinos-strings.en.js`, `site/js/i18n/dino-ui-strings.*.js` (régénérés par les scripts, jamais à la main)
- Rapport : `studio/dino/docs/handoffs/rapports/HO-017-rapport.md`

## Hors périmètre

- Aucun audio, aucun MP3, aucun appel ElevenLabs.
- Pas de traduction es-es / pt-br des racines/périodes/pangée/extinction (ticket futur) — sauf les clés `journey_ep_*` de `ui.json`.
- Pas de `git` (l'orchestrateur commit).
- Pas de sous-agent (L-D-74).

## Règles de traduction

- Charte : `studio/dino/content/i18n/_CHARTE-TRADUCTION.md` (unités impériales en EN, arrondies ; pas de « ! » ajouté ; registre 4 ans US).
- Les chiffres (Ma, °C, km) gardent leur ordre de grandeur ; conversion métrique → impérial obligatoire en EN.
- Les racines : le `sens` est une glose courte (« lézard » → « lizard »). Garder les formes grecques/latines telles quelles.
- Vocabulaire des périodes déjà utilisé dans `strings.json` → `dinos[].epoque` (ex. « Cretaceous ») : rester cohérent.

## Portes de vérification (l'orchestrateur les rejoue)

```
node studio/dino/content/scripts/export/_check-traduction.cjs en      # 0 erreur
node studio/dino/content/scripts/export/_check-ui.cjs                 # 3 langues complètes
node studio/dino/content/scripts/export/_gen-strings-bundle.cjs en
node studio/dino/content/scripts/export/_gen-ui-bundle.cjs en ; idem es-es pt-br
```
Puis contrôle visuel : ouvrir `site/dev-dinos.html?lang=en` (serveur local, Playwright depuis `studio/minijeux/tests/` où le paquet est installé), parcourir les 5 onglets + Pangée + Extinction + une racine du dico, capturer 3 écrans dans `docs/handoffs/rapports/captures/HO-017-*.png`, et grep visuel : zéro mot français.

## Rapport attendu

`rapports/HO-017-rapport.md` : nombre de chaînes traduites par zone, fichiers modifiés (chemins exacts), sorties des portes, captures, et toute zone FR résiduelle que tu n'as PAS pu brancher (dire pourquoi, ne pas contourner).
