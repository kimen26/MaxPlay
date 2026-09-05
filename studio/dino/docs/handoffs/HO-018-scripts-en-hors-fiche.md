# HO-018 — Scripts audio EN hors fiches : menus, périodes, récits, spéciaux (lot A) et dico (lot B)

> Statut : pret · Ouvert le 2026-09-05 · Exécutants : 2 sous-agents Sonnet (lot A, lot B) · Orchestrateur : session principale.
> Demande Papa Yann (2026-09-05) : « pour l'anglais il faut que l'intégralité du site soit traduit et passé en audio ».

## Objectif

Tout ce que le site dino fait ENTENDRE en français hors fiches dino doit exister en script EN, prêt à générer
dès que le quota ElevenLabs revient (reset 2026-09-11 03:15). Ce handoff produit les SCRIPTS, pas les MP3.

| Lot | Source FR (canon) | Cibles EN | Fichiers FR joués |
|---|---|---|---|
| A | `content/scripts-audio/_ACCROCHES-MENU-FAMILLES-REGIMES.md` (11 familles + 4 régimes) ; textes des 4 onglets `MENU_VOICE` (accueil, régime, familles, voyage — texte FR dans `dev-dinos.html` `MENU_FALLBACK` L700-712 + `site/js/dino-ui.js`) + les 2 onglets « époques » et « dico » sans MP3 FR ; 8 accroches d'époque `menu-ep-*` et 8 récits `recit-*` (`content/sources/recits/RECITS-EPOQUES.md` + `json/`) ; 6 spéciaux Pangée/Extinction (`site/js/dinos-data.js` PANGEE/EXTINCTION + `scripts/audio/_archive/_md2json-special.cjs` pour la structure) ; 5 périodes `periodes/<id>.mp3` (texte = `label` + `desc` de `DINO_PERIODES`) | `content/i18n/en/scripts-hors-fiche/{menus,periodes,recits,speciaux}.md` | `site/audio/dinos/fr/menu-*.mp3`, `recit-*.mp3`, `special-*.mp3`, `periodes/*.mp3` |
| B | `content/scripts-audio/_DICO-RACINES-AUDIO.md` (100 racines, dialogue narrateur_h + wex, format `narrateur_h:` / `wex:`) + racine `scélido-` (absente de la source, à écrire en FR aussi : voir `site/js/dinos-racines.js` clé `scélido- / skelis`) | `content/i18n/en/scripts-hors-fiche/dico.md` (+ ajout FR `scélido-` dans `_DICO-RACINES-AUDIO.md`) | `site/audio/dinos/fr/dico-*.mp3` |

## Format de sortie (machine, identique aux fiches)

Un bloc par clip, dans l'ordre de la source :

```
### <slug du MP3 sans extension>   ← ex. `menu-fam-trex`, `recit-trias`, `dico-saure`, `periodes/trias`
**NARRATEUR H** [tag] : texte…
**WEX** [tag] : texte…
```

- Locuteurs machine : `**NARRATEUR H**` et `**WEX**` UNIQUEMENT, jamais traduits (L-D-72). Une seule voix pour les accroches et les périodes (Narrateur H seul).
- Tags : liste blanche des 31 tags de `content/scripts/export/_verif-scripts-audio.cjs` (`TAGS_OK`), mêmes règles de densité (Narrateur > 70 car. → ≥ 2 tags dont 1 au milieu ; > 140 → ≥ 3 ; jamais 2 tags adjacents, jamais en fin, jamais avant une ponctuation ; Wex ≥ 1 tag, jamais de « ! », les questions finissent par « ? »).
- Unités impériales arrondies (charte `content/i18n/_CHARTE-TRADUCTION.md`), registre 4 ans US, pas de « ! » en plus qu'en FR.
- Noms de dinos : forme plate du lexique `content/i18n/lexiques-prononciation/en.md` (décision 2026-08-11, voix native → pas de tirets syllabiques).
- Interdits : « Max », « doudou », « regarde », références adultes, « Jurassic Park ».

## Fichiers autorisés

- Lot A : `content/i18n/en/scripts-hors-fiche/{menus,periodes,recits,speciaux}.md`, rapport `docs/handoffs/rapports/HO-018-lot-A.md`
- Lot B : `content/i18n/en/scripts-hors-fiche/dico.md`, `content/scripts-audio/_DICO-RACINES-AUDIO.md` (ajout `scélido-` FR uniquement, en fin de liste, même format que les voisins), rapport `docs/handoffs/rapports/HO-018-lot-B.md`

## Hors périmètre

Aucun MP3, aucun appel ElevenLabs, aucun JSON (l'orchestrateur convertit), pas de `git`, pas de sous-agent (L-D-74), pas d'édition de `site/`.

## Rapport attendu

Nombre de clips par famille de fichiers, total de caractères EN (le coût ElevenLabs en dépend : TTS voix native puis speech-to-speech ≈ ×2), les 3 clips les plus longs, toute ambiguïté de source (texte FR introuvable, MP3 FR sans texte source) listée sans être contournée.
