# HO-MJ-03 — EPIC i18n mini-jeux · `MJi18n.t()` + lots 1 et 2 en anglais (12 jeux, chaînes hors panneau règle)

> Statut : pret · Ouvert le 2026-09-05 · Exécutant : sous-agent Sonnet · Orchestrateur : session principale.
> Suite de HO-MJ-02 (plomberie + panneaux règle des 36 jeux en anglais, livré). Audit : `docs/i18n/AUDIT-I18N-MJ-2026-09-05.md`.
> Décision Papa Yann : « tous les mini-jeux devront être traduits, les règles, les menus, les actions ».

## Objectif

1. Étendre la surcouche `site/js/mj-i18n.js` d'une fonction générale :
   `MJi18n.t(gameId, cle, frFallback, params)` → chaîne de la langue active si le pack `MJ_STRINGS[gameId].ui[cle]`
   existe, sinon `frFallback` (le FR reste en dur dans le jeu = canon, jamais de trou). `params` = `{n: 3}` → `{n}`
   remplacé. Exposer aussi `MJi18n.plural(n, one, many)` (EN : `n === 1`) pour les pièges de pluriel ; en FR le
   jeu garde sa logique actuelle.
2. Traduire en anglais TOUTES les chaînes visibles ou parlées hors panneau règle des 12 jeux ci-dessous : titre de
   page, boutons, toasts, `shell.setConsigne(...)`, textes de repli des `SoundPool.phrase(slug, texte)`,
   `TTS.speak(...)` en dur, données courtes (noms de couleurs, libellés). Chaque occurrence dans le HTML devient
   `MJi18n.t('mj-XX', 'cle', 'texte FR d\'origine', params)` — le FR d'origine reste visible dans le code.
3. Alimenter `studio/minijeux/i18n/fr/strings.json` (`ui` par jeu, extraction) et `en/strings.json`, régénérer
   `site/js/i18n/mj-strings.en.js` avec `tools/_gen-mj-strings-bundle.cjs en`, étendre `_check-mj-traduction.cjs`
   aux clés `ui` (mêmes clés FR/EN, aucune vide, placeholders identiques).

## Périmètre

- **Lot 1** (déjà i18n dino, léger) : mj-24, mj-28, mj-30, mj-31, mj-32.
- **Lot 2** (bus/couleurs) : mj-06, mj-09, mj-13a, mj-13c, mj-18, mj-21, mj-34.
- Pièges connus à traiter proprement : mj-32 `'Magnifique ! Ton ' + name + ' est superbe !'` → template avec `{nom}` ;
  mj-13c question concaténée → template `{num}` ; mj-34 « SORTIE » (vérifier où il vit : DOM ou canvas) ;
  mj-31 noms d'époques (passer par `DINO_PERIODES[].label`, déjà traduit par `dinos-i18n.js`, pas par un texte en dur).
- Les noms de dinos, faits, tailles viennent de `dinos-data.js` + `dinos-i18n.js` : ne pas les dupliquer.

## Fichiers autorisés

`site/js/mj-i18n.js`, les 12 `site/mj-XX.html` du périmètre (remplacements ciblés, aucun changement de logique de jeu),
`studio/minijeux/i18n/{fr,en}/strings.json`, `site/js/i18n/mj-strings.en.js` (généré), `studio/minijeux/tools/_check-mj-traduction.cjs`,
`studio/minijeux/tools/README.md`, rapport `docs/handoffs/rapports/HO-MJ-03-rapport.md` + captures `.../captures/HO-MJ-03-*.png`.

## Hors périmètre

Les 24 autres jeux (lots 3-6), consignes parlées MP3 (`textes-jeux.js`, crédits ElevenLabs), es-es / pt-br, `regle-info.js`
(déjà fait), `site/index.html`, catalogue, `git`, sous-agents. Ne pas toucher aux figées `docs/jeux/figees/mj-XX.md` :
lire celle de chaque jeu AVANT de l'éditer (hook), ne jamais contredire une ligne 🔒.

## Portes (l'orchestrateur les rejoue)

```
node studio/minijeux/tools/_check-mj-traduction.cjs en          # 0 erreur, clés regle + ui
node studio/minijeux/tools/_gen-mj-strings-bundle.cjs en
cd studio/minijeux/tests && for g in mj-06 mj-09 mj-13a mj-13c mj-18 mj-21 mj-24 mj-28 mj-30 mj-31 mj-32 mj-34; do node audit-gabarit.mjs $g; done
```
Playwright : chaque jeu du périmètre en `?lang=en` et sans `?lang` → 0 `pageerror`, jouer 1-2 actions (tap, consigne),
capturer 4 jeux en EN (dont mj-32 et mj-13c) et 1 en FR avant/après identique ; ouvrir et relire les captures.

## Rapport attendu

Nombre de clés `ui` par jeu, chaînes FR → EN, liste exacte des fichiers modifiés, sorties des portes, pièges rencontrés
(concaténations transformées en templates, pluriels), tout texte FR que tu n'as PAS pu brancher et pourquoi.
