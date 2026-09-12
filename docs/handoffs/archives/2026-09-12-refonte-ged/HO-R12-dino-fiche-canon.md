# HO-R12 — Dino : une fiche canon par dino, `dinos-data.js` généré, contrôle data ↔ narré

**Statut :** fait
**Depend de :** HO-R08, HO-R10 (vague 3 commitée)
**Vague :** 4 · **Exécutant :** sous-agent Sonnet

## Objectif
`studio/dino/content/dinos/<id>.json` est la seule source ; tout le reste en dérive par script ; un nombre du texte narré qui diverge de la fiche fait échouer le contrôle (D-009).

## Contexte a lire d'abord
- `memory/DECISIONS.md` D-009 ; `memory/audits/2026-09-12-archi-ged-site-studio.md` § P3 (dino)
- `site/js/dinos-data.js`, `studio/dino/content/scripts/export/_gen-etat-dinos.cjs`, `scripts/audio/_md2json-v3.cjs`, `.claude/skills/nouveau-dino/SKILL.md`, `.claude/rules/dino.md`

## Fichiers autorises
- `studio/dino/content/dinos/**` (nouveau), `studio/dino/content/scripts/export/**`, `studio/dino/content/scripts/audio/_md2json-v3.cjs`
- `studio/dino/content/scripts-audio/*/V3/*.md` (en-tête « Chiffres data » uniquement, **jamais le corps narré**)
- `site/js/gen/dinos-data.js` (créé), `site/js/dinos-data.js` (supprimé), `site/dev-dinos.html` + `mj-14, 15, 19, 24, 28, 31, 32.html` (ligne de chemin uniquement)
- `studio/dino/memory/{TODO,DECISIONS}.md`, `.claude/skills/nouveau-dino/SKILL.md` (phase 2), `.claude/rules/dino.md` (chemin de la source), `package.json` (script `check` : une ligne)

## Hors perimetre
- Le texte narré, les MP3, l'i18n. Aucune commande git.

## Travail
1. Script one-shot `_split-dinos-data.cjs` : `dinos-data.js` → `content/dinos/<id>.json` (~94) + `_familles.json` + `_schema.json` documenté (champs, unités, FR canon inline, i18n = overlay).
2. Générateur `_gen-dinos-data.cjs` : `dinos/*.json` → `site/js/gen/dinos-data.js` **octet pour octet identique** à l'actuel au premier run. Ensuite le format est libre.
3. `_gen-etat-dinos.cjs` lit les JSON, plus de regex sur du JS.
4. En-tête « Chiffres data » des ~71 × 4 `.md` audio régénéré depuis la fiche.
5. `check-coherence-data-narre.cjs` : extrait les nombres du corps narré FR (mètres, tonnes, km/h), échoue si écart, sortie « dino · bloc · attendu · trouvé ». Ajouté à `npm run check` en **avertissement** ; la bascule en bloquant est décidée par l'orchestrateur sur la liste des écarts. Inclure `aenocyon-taille` (dérive connue).
6. `nouveau-dino` phase 2 = créer le JSON, plus éditer le JS.

## Portes de verification
```bash
diff <(git show HEAD:site/js/dinos-data.js) site/js/gen/dinos-data.js   # vide au premier run
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs              # même compte, même couverture
node studio/dino/content/scripts/export/check-coherence-data-narre.cjs   # liste des écarts existants
npm run check ; node studio/minijeux/tests/run.mjs i18n-dinos
# Playwright : dev-dinos.html, 0 erreur console, capture des 5 onglets d'une fiche
```

## Definition of done
Diff vide au premier run, état dinos inchangé, liste des écarts produite, rapport dans `docs/handoffs/rapports/HO-R12.md`.

## Rapport attendu
Schéma JSON, sorties des portes, liste des écarts data ↔ narré, réponses aux questions de conception (local : JSON → JS statique sans fetch ; i18n : FR canon + overlays, pas de chiffres par langue ; index : `_familles.json` suffit ou `_index.json` nécessaire ?).
