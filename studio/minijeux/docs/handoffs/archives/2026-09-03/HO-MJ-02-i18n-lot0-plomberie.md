# HO-MJ-02 — EPIC i18n mini-jeux · Lot 0 : plomberie + panneaux règle des 36 jeux en anglais

> Statut : pret · Ouvert le 2026-09-05 · Exécutant : sous-agent Sonnet · Orchestrateur : session principale.
> Décision Papa Yann (2026-09-05) : « évidemment tous les mini-jeux devront être traduits, les règles, les menus, les actions ».
> Audit source : `studio/minijeux/docs/i18n/AUDIT-I18N-MJ-2026-09-05.md` (36 jeux, 6 lots, pièges transverses).

## Objectif

Poser la plomberie i18n des mini-jeux, calquée sur celle du pôle dino (éprouvée : `site/js/lang.js` → pack de chaînes
généré depuis `studio/` → surcouche), et l'utiliser tout de suite pour la zone la plus visible et la plus homogène :
le **panneau règle** (`RegleInfo`, le savant fou) des 36 jeux, en anglais. À la fin : `mj-XX.html?lang=en` affiche
la règle en anglais pour les 36 jeux, et `?lang=fr` (ou rien) est strictement inchangé.

## Principe (à respecter, pas à réinventer)

1. **Le FR reste le canon dans le HTML.** On ne vide pas les `regle: {...}` des jeux. La traduction est une
   SURCOUCHE : `RegleInfo.init(cfg)` demande à `MJi18n.regle(gameId, cfg)` une copie fusionnée avant de rendre.
   Si le pack de la langue n'a pas ce jeu, le FR s'affiche (repli assumé, jamais de trou).
2. **Un seul pack par langue** : `studio/minijeux/i18n/<lang>/strings.json` (source, éditée par les traducteurs) →
   `site/js/i18n/mj-strings.<lang>.js` (GÉNÉRÉ, `window.MJ_STRINGS = {...}`, jamais édité à la main) via
   `studio/minijeux/tools/_gen-mj-strings-bundle.cjs <lang>`.
   Structure : `{ "mj-14": { "titre": "...", "regle": { "texte": "...", "etapes": [{"t":"...","d":"..."}], "etoiles": "..." } }, ... }`
   (les clés de `regle` = celles du contrat `RegleInfo.init` documenté en tête de `site/js/regle-info.js`).
3. **Extraction FR mécanique, pas à la main** : `studio/minijeux/tools/_extract-mj-regles.mjs` ouvre chaque
   `site/mj-*.html` avec Playwright (paquet installé dans `studio/minijeux/tests/`), intercepte l'objet passé à
   `RegleInfo.init` (monkey-patch avant le chargement du jeu, ou lecture de `window.__MJ_CFG` si tu l'exposes
   dans `mj-shell.js`) et écrit `studio/minijeux/i18n/fr/strings.json`. Ce fichier FR est la référence du
   checker (comme `corpus-fr.json` côté dino).
4. **Chargement** : `site/js/mj-i18n.js` (nouveau, chargé par `mj-shell.js` ou par la ligne `<script>` commune des
   jeux — trouve le point d'injection le moins invasif, idéalement UN fichier partagé et zéro édition des 36
   HTML ; si une édition des HTML est indispensable, fais-la par script, identique sur les 36, et dis-le).
   `lang.js` doit être chargé avant ; `document.write` synchrone du pack comme dans `dinos-i18n.js`.
5. **Traduction EN** des 36 panneaux règle : registre 4 ans US, charte `studio/dino/content/i18n/_CHARTE-TRADUCTION.md`
   (unités impériales arrondies, pas de « ! » ajouté, noms propres du jeu conservés : Shisima, noms de bus, etc.).
   Titres de jeux (`titre`) : traduits aussi quand ils sont des mots FR, gardés s'ils sont des noms propres.
6. **Checker** : `studio/minijeux/tools/_check-mj-traduction.cjs <lang>` : mêmes clés que le FR, aucune chaîne vide,
   nombre d'étapes identique, chiffres conservés (sauf conversion d'unités), mots FR résiduels.

## Fichiers autorisés

- Nouveaux : `site/js/mj-i18n.js`, `site/js/i18n/mj-strings.en.js` (généré), `studio/minijeux/i18n/{fr,en}/strings.json`,
  `studio/minijeux/tools/_extract-mj-regles.mjs`, `_gen-mj-strings-bundle.cjs`, `_check-mj-traduction.cjs`,
  rapport `studio/minijeux/docs/handoffs/rapports/HO-MJ-02-rapport.md` + captures `.../captures/HO-MJ-02-*.png`.
- Modifiés : `site/js/regle-info.js` (appel de la surcouche), `site/js/mj-shell.js` (chargement, exposition cfg) ;
  les 36 `site/mj-*.html` UNIQUEMENT si un `<script>` commun doit être ajouté (par script, diff identique).
- Docs : `studio/minijeux/docs/STACK.md` (§ i18n : 5 lignes max), `studio/minijeux/tools/README.md` (3 outils).

## Hors périmètre

Consignes parlées (TTS/MP3, `textes-jeux.js`), chaînes de jeu hors panneau règle (toasts, boutons, consignes
dynamiques — lots 2 à 6), es-es / pt-br (structure prête, contenu plus tard), `site/index.html` et le catalogue,
tout appel ElevenLabs, `git`, sous-agents (L-D-74 côté dino : les notifications d'un sous-agent ne te reviennent pas).

## Portes de vérification (l'orchestrateur les rejoue)

```
node studio/minijeux/tools/_extract-mj-regles.mjs            # 36 jeux, 0 manquant
node studio/minijeux/tools/_check-mj-traduction.cjs en        # 0 erreur
node studio/minijeux/tools/_gen-mj-strings-bundle.cjs en
cd studio/minijeux/tests && node audit-gabarit.mjs mj-14 && node audit-gabarit.mjs mj-48   # gabarit intact
```
Playwright : `mj-14.html?lang=en`, `mj-48.html?lang=en`, `mj-22.html?lang=en` → ouvrir le savant fou (#btn-regle),
capturer le panneau, OUVRIR les captures (Read) : règle en anglais, mise en page intacte ; puis `mj-14.html` sans
`?lang` → règle FR identique à avant (capture avant/après). Zéro erreur console sur les 36 jeux en `?lang=en`
(boucle Playwright, compter les `pageerror`).

## Rapport attendu

`rapports/HO-MJ-02-rapport.md` : point d'injection choisi et pourquoi, nombre de chaînes FR extraites / EN traduites,
sorties des portes, liste exacte des fichiers modifiés (diff identique sur les HTML si tu as dû les toucher),
les 36 titres FR → EN, et les pièges rencontrés (noms propres, jeux de mots comme « PILE » de mj-35).
