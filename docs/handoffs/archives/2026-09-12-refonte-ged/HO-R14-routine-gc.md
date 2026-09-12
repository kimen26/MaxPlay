# HO-R14 — Routine `npm run gc` : ce qui doit sortir, listé chaque mois

**Statut :** fait
**Depend de :** HO-R08
**Vague :** 5 · **Exécutant :** sous-agent Sonnet

## Objectif
Une commande en lecture seule liste tout ce qui devrait sortir du repo ou descendre en archive ; plus rien ne s'accumule par oubli.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P4
- `memory/DOCTRINE.md`, `docs/handoffs/README.md`, `~/.claude/rules/memoire-projet.md`

## Fichiers autorises
- `scripts/gc.mjs` (nouveau), `package.json` (script `gc`), `memory/DOCTRINE.md` (section rotation), `docs/handoffs/README.md` (section cycle de vie)

## Hors perimetre
- Aucune suppression de contenu par le script. Aucune commande git.

## Travail
Le script liste : handoffs `fait` hors `archives/` et statut interne ≠ registre ; `LESSONS.md`/`TODO.md` > 20 Ko par pôle ; `tests/.artifacts/` > 14 jours ; `inbox/` > 48 h ; liens md cassés (tout le repo) ; images `site/img/**` non référencées (basename) ; audio `site/audio/dinos/**` non couvert par le produit cartésien slug × suffixe × langue depuis `content/dinos/*.json` et le manifeste ; branches git mortes. Sortie markdown datée dans `memory/audits/gc-<date>.md`. Option `--fix` limitée aux déplacements sûrs (`archives/`, purge `.artifacts`).

## Portes de verification
```bash
time npm run gc            # < 60 s, rapport lisible
# vérifier 10 audios signalés à la main : 0 faux positif
```

## Definition of done
Rapport produit, 0 faux positif audio sur l'échantillon, doctrine et README mis à jour, rapport dans `docs/handoffs/rapports/HO-R14.md`.

## Rapport attendu
Premier rapport gc joint, questions.
