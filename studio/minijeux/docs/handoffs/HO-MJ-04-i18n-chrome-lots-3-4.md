# HO-MJ-04 — EPIC i18n mini-jeux · chrome du panneau règle + lots 3 et 4 en anglais (17 jeux)

> Statut : pret · Ouvert le 2026-09-05 · Exécutant : sous-agent Sonnet · Orchestrateur : session principale.
> Suite de HO-MJ-02 (plomberie + règles des 36 jeux) et HO-MJ-03 (`MJi18n.t()`, 12 jeux). Audit : `docs/i18n/AUDIT-I18N-MJ-2026-09-05.md`.

## Objectif

1. **Chrome du panneau règle** (`site/js/regle-info.js`) : « La règle », « Avis », « Écoute toutes les règles », « J'ai compris ! »,
   l'encadré or « comment gagner les étoiles » et tout autre texte FR généré par `regle-info.js` passent par
   `MJi18n.t('_commun', cle, frFallback)` ; bloc `_commun` dans `studio/minijeux/i18n/{fr,en}/strings.json`.
   Même chose pour les textes FR communs de `site/js/mj-shell.js`, `site/js/intro-splash.js`, `site/js/victory-sounds.js`
   (textes de repli visibles), s'il y en a.
2. **Lot 3 — casse-têtes logiques** (11 jeux) et **Lot 4 — comptage à pièges grammaticaux** (6 jeux) : liste exacte dans
   l'audit § « Découpage en lots ». Toutes les chaînes visibles ou parlées hors panneau règle → `MJi18n.t('mj-XX', cle, fr, params)`,
   FR gardé en repli dans le code, concaténations → templates, pluriels → `MJi18n.plural(n, one, many)` (mj-46/48/49 :
   remplacer les ternaires FR à la main par des templates `{n}` + `plural`, le FR reste identique à l'écran), ordinaux
   mj-48 → tableau par langue dans le pack (`ui.ordinaux: ["first","second",...]`).

## Règles

Identiques à HO-MJ-03 : figée `docs/jeux/figees/mj-XX.md` lue avant chaque jeu, jamais contredire une ligne 🔒, aucun
changement de logique de jeu, registre 4 ans US, charte `studio/dino/content/i18n/_CHARTE-TRADUCTION.md`, noms propres
conservés, `?lang=fr` et sans paramètre strictement inchangés.

## Fichiers autorisés

`site/js/regle-info.js`, `site/js/mj-i18n.js` (si besoin), `site/js/mj-shell.js` / `intro-splash.js` / `victory-sounds.js`
(textes seulement), les 17 `site/mj-XX.html` du périmètre, `studio/minijeux/i18n/{fr,en}/strings.json`, `site/js/i18n/mj-strings.en.js`
(généré), `studio/minijeux/tools/_check-mj-traduction.cjs`, rapport `docs/handoffs/rapports/HO-MJ-04-rapport.md` + captures.

## Hors périmètre

Lots 5 (mj-50/51/52/53 : contenu FR conservé, décision PY) et 6 (mj-20/22/42), consignes MP3, es-es/pt-br, `git`, sous-agents.

## Portes

```
node studio/minijeux/tools/_check-mj-traduction.cjs en     # 0 erreur
node studio/minijeux/tools/_gen-mj-strings-bundle.cjs en
cd studio/minijeux/tests && node audit-gabarit.mjs <chaque jeu du périmètre>
```
Playwright : les 17 jeux en `?lang=en` et sans `?lang` → 0 `pageerror` ; captures de 4 jeux EN (dont mj-48 avec un
pluriel et un ordinal, et le panneau règle avec son chrome en anglais) + 1 FR avant/après ; ouvrir et relire.

## Rapport attendu

Clés `_commun` + `ui` par jeu, fichiers modifiés, portes, pièges (pluriels, ordinaux, concaténations), FR non branché et pourquoi.
