# HO-MJ-07 — EPIC i18n mini-jeux · packs es-es et pt-br (texte seul, zéro crédit ElevenLabs)

> Statut : pret · Ouvert le 2026-09-06 · Exécutants : 2 sous-agents Sonnet en parallèle (un par langue, fichiers disjoints) · Orchestrateur : session principale.
> Suite de HO-MJ-02..06 (plomberie + EN complet). Audit : `docs/i18n/AUDIT-I18N-MJ-2026-09-05.md`.

## Objectif

Produire `studio/minijeux/i18n/<lang>/strings.json` pour `es-es` et `pt-br`, même forme exacte que
`studio/minijeux/i18n/en/strings.json` (jeux, `titre`, `regle`, `ui`, `voix`, bloc `_commun`), traduit
depuis le CANON `studio/minijeux/i18n/fr/strings.json` (l'EN sert de témoin de structure et de registre,
jamais de source de sens). Bundle généré `site/js/i18n/mj-strings.<lang>.js`.

Les 4 jeux mj-50/51/52/53 gardent leur contenu FR (décision PY 2026-09-05) : traduire leur `titre`,
`regle`, `_commun`-like et `ui` comme les autres, mais ne rien inventer pour du contenu phonétique FR
(mots, syllabes, phrases à lire) — laisser ces feuilles identiques au FR.

## Règles

- Charte : `studio/dino/content/i18n/_CHARTE-TRADUCTION.md` — on écrit ce qu'un auteur natif aurait
  écrit pour un enfant de 4 ans (es-es : `tú`, jamais `usted` ; pt-br : `você`, jamais `tu`). Registre parlé,
  phrases courtes, même nombre de « ! » que le FR.
- Unités : es-es et pt-br restent en métrique (chiffres identiques au FR).
- Noms propres conservés (Wex, Tayo, lignes de bus, noms de dinos : forme locale usuelle, ex. Tiranosaurio / Tiranossauro).
- Placeholders `{n}`, `{nom}`, `{val}`… strictement identiques au FR (sinon affichés bruts à l'écran).
- Tableaux (`mj-24.ui.phrase`, `mj-48.ui.ordinaux`…) : même longueur, même ordre.
- `voix.*` : consigne parlée, repli TTS `speechSynthesis` (voix es-ES / pt-BR du navigateur) — texte oral,
  pas de tags ElevenLabs, pas de Markdown.
- Aucun `mj-XX.html` ne se modifie. Aucun fichier de l'autre langue ne se touche. Pas de `git`.

## Portes

```
node studio/minijeux/tools/_check-mj-traduction.cjs <lang>   # 0 erreur ; avertissements lus et justifiés
node studio/minijeux/tools/_gen-mj-strings-bundle.cjs <lang>
```
Playwright (depuis `studio/minijeux/tests/`, package déjà installé, serveur statique node ad hoc sur `site/`) :
mj-13a, mj-30, mj-48 et mj-24 en `?lang=<lang>` → 0 `pageerror`, panneau règle ouvert, capture de chaque,
**ouvrir et relire chaque capture** (zéro mot FR visible, accents rendus). Méthode : voir
`docs/handoffs/rapports/HO-MJ-04-rapport.md` § Playwright.

## Rapport attendu

`docs/handoffs/rapports/HO-MJ-07-<lang>-rapport.md` : fichiers écrits, nombre de jeux / clés, portes
(sortie exacte), avertissements du check et leur justification, captures, choix de traduction notables
(repères culturels adaptés, noms de dinos).
