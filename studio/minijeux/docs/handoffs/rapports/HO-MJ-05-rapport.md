# HO-MJ-05 — Rapport : lot 6, cas particuliers (mj-20, mj-22, mj-42) + titre mj-14

Statut : fait. 0 erreur checker, bundle régénéré, audit-gabarit 4/4 sain (mj-14 a une
dette hex pré-existante, non liée), Playwright 0 pageerror sur 8 runs (4 jeux × `?lang=en`/sans).

## Fichiers modifiés

`site/mj-20.html`, `mj-22.html`, `mj-42.html`, `mj-14.html`, `studio/minijeux/i18n/{fr,en}/strings.json`
(`ui` ajouté à mj-20/mj-22/mj-42), `site/js/i18n/mj-strings.en.js` (régénéré). Captures :
`docs/handoffs/rapports/captures/HO-MJ-05-{mj-22-en,mj-20-en,mj-42-en,mj-14-en-header,mj-14-fr}.png`.

## Clés par jeu

- **mj-22** : `ui.pays.<iso>` (30 noms EN sans article), `trouveLePays`/`bravoCestLePays`
  (templates `{pays}`, FR garde la construction historique article+nom en dur),
  `nonChercheBien`, `suivant`.
- **mj-20** : `ui.langues.<code>` (8 noms de langues), `confirmNumero`/`cEtait` (`{n}`),
  `nouveauNiveauDebloque` (`{lang}`,`{tier}`). TTS confirm/reveal passe par `Lang.bcp47()`
  au lieu de `fr-FR` figé.
- **mj-42** : `jeuDuKenya`, `aToiDeJouer`, `cameleonReflechit`, `bravo`,
  `alignePionsShisima`, `danseCameleon`, `presqueEncoreUne`. "Shisima" jamais traduit.
- **mj-14** : aucune nouvelle clé (le `ui` du panneau existait déjà, HO-MJ-04) — juste
  `cfg.titre` et `document.title` branchés sur `MJi18n.titre(GAME_ID, ...)`.

## Pièges

- **mj-22** : mj-shell/PAYS mélangeait nom+article FR en un seul champ. Séparé : `art`
  reste FR en dur (inchangé à l'écran), le nom EN vit dans le pack sans article, injecté
  via template `{pays}` par langue — jamais de concaténation traduite.
- **mj-14 n'a pas de DOM `.htitle`** : `mj-shell.js` le crée lui-même depuis `cfg.titre`
  (`init()` L142-161) faute de header manuel dans le HTML — donc pas de changement DOM,
  juste `cfg.titre` et `document.title` recâblés (miroir mj-15 de HO-MJ-04).
- mj-42 n'a pas de fichier figée (confirmé, hook signalé à chaque édit) — aucune décision
  produit gravée ici, uniquement i18n.

## FR non branché (et pourquoi)

- mj-22 : `data-country` (attribut DOM interne, jamais affiché), texte de chargement/erreur
  SVG (`Chargement…`, `Erreur carte...`) — hors scope explicite (Cherche bien/toasts).
- Pas d'autre FR laissé en dur dans le périmètre demandé.

## Portes

```
node studio/minijeux/tools/_check-mj-traduction.cjs en   -> 0 erreurs, 3 warn pré-existants (mj-30/mj-49/mj-18)
node studio/minijeux/tools/_gen-mj-strings-bundle.cjs en -> 37 jeux
audit-gabarit.mjs mj-20/mj-22/mj-42/mj-14                -> sain (mj-14 dette hex pré-existante)
Playwright 4 jeux x (?lang=en, sans) file://             -> 0 pageerror / 8 runs
```

Captures ouvertes et relues : mj-22 EN "Find Germany!" (nom sans article), mj-20 EN
sélecteur langue "French", mj-42 EN header "Shisima!" + badge "A game from Kenya" +
"Your turn", mj-14 EN header "Mystery Squares", mj-14 FR pixel-identique à l'avant
(panneau + header + mode-bar inchangés).

Aucun ElevenLabs, git, sous-agent, serveur local (tests `file://`). Fichiers temporaires
de scratch supprimés en fin de tour.
