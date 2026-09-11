# HO-R07 — Site : assets morts et rips sous droits

**Statut :** pret
**Depend de :** HO-R00
**Vague :** 1 · **Exécutant :** sous-agent Sonnet

## Objectif
`site/` ne livre plus ni son sous droits tiers, ni dossier de test, ni fichier que personne ne référence ; la casse des dossiers de langue est unique.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P2, § P6, § P8
- `site/sounds/_BANQUE-SONS.md`, `.claude/rules/sons.md`

## Fichiers autorises
- `site/sounds/**`, `site/design-shared/mockup.{css,js}`, `site/img/dinos/traces/**`, `site/img/decor/{meteorite_feu,nuage_gris}.png`
- `site/js/{decor,pins,voices-manifest,tracker,victory-sounds,sounds,mj-golden}.js`
- `site/index.html`, `site/mj-13a.html`, `site/mj-13c.html`, `site/mj-48.html` (lignes de chemins de sons uniquement)
- `studio/referentiel/catalogue/**` (entrées sons retirées)

## Hors perimetre
- Tout autre `site/*.html`, `site/js/*` non listé, `site/img/dinos/_new-*`. Aucune commande git.

## Travail
1. 15 rips racine `sounds/` (Pokémon, Mario, FF7, Zelda, SNCF, freesound…) : pour chaque référence (`index.html`, `mj-13a`, `mj-13c`, `mj-48`, `mj-golden.js`, `victory-sounds.js`) remplacer par un son **libre déjà présent** de même fonction dans `sounds/fx/` ou `sounds/music/` ; table de correspondance dans `_BANQUE-SONS.md` ; rips supprimés.
2. `sounds/phonemes-test/` (65 f) supprimé après vérification 0 référence.
3. `music/generique-v1..v3`, `victoire-v1..v4` : ne garder que les versions référencées, renommer sans suffixe de version, refs mises à jour.
4. `design-shared/mockup.*`, `img/dinos/traces/`, `img/decor/{meteorite_feu,nuage_gris}.png` supprimés (0 référence, vérifier).
5. `decor.js`, `pins.js` supprimés (logique déjà dans `mj-kit.js` et `regle-info.js`) ; `voices-manifest.js` supprimé et `tracker.js` ne le charge plus.
6. `sounds/voix/pt-BR` → `pt-br`, refs mises à jour.
7. Proposer dans le rapport (sans l'appliquer) une arborescence `site/sounds/` par usage : `ui/ · feedback/ · voix/<lang>/ · music/ · nombres/<lang>/ · phonemes/<lang>/`, règle « la langue est un dossier, jamais un suffixe ».

## Portes de verification
```bash
grep -rE "ff7_victory|pikachu|victory-mario|zelda-tresor|sncf-france|perfect-fart|freesound_community|bus-closing-door|phonemes-test|decor\.js|pins\.js|voices-manifest|mockup\.|pt-BR|generique-v|victoire-v" site/*.html site/js   # vide
cd studio/minijeux/tests && node audit-gabarit.mjs                 # 0 BLOQUANT
cd studio/minijeux/tests && npm run mj:test mj-13a && npm run mj:test mj-13c && npm run mj:test mj-48 && node run.mjs index
node studio/referentiel/build.mjs                                  # sans erreur
```

## Definition of done
Portes vertes, table de correspondance écrite, proposition d'arborescence dans le rapport, rapport dans `docs/handoffs/rapports/HO-R07.md`.

## Rapport attendu
Suppressions (fichiers, Mo), table rip → remplaçant, sorties Playwright, proposition d'arborescence, questions.
