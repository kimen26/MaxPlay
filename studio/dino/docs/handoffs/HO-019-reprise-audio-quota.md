# HO-019 — Reprise de la génération audio au retour du quota ElevenLabs (FR 35 fiches + EN intégral)

> Statut : bloque (quota) · Ouvert le 2026-09-05 · Exécutant : session principale (orchestrateur) · Décision Papa Yann requise avant le 2026-09-11.
> Demande Papa Yann (2026-09-05) : « lance les générations audio FR (si besoin) et EN. Pour l'anglais il faut que l'intégralité du site soit traduit et passé en audio. »

## Situation au 2026-09-05

| Poste | Quantité | Caractères (estimation) | Crédits EL (STS ≈ ×2) |
|---|---|---|---|
| FR — 35 Fiches dino non régénérées (sauropodes 7, thyréophores 8, marins 7, avant-dinos 5, mégafaune 8) | 35 × 4 blocs | ≈ 53 000 | ≈ 53 000 |
| EN — 58 Fiches dino restantes (les 13 théropodes sont faits) | 58 × 4 blocs | ≈ 81 000 | ≈ 162 000 |
| EN — hors fiches : 5 accroches d'onglet, 11 familles, 4 régimes, 8 récits, 8 spéciaux, 5 périodes, 101 clips dico (scripts HO-018, JSON prêts) | 142 clips | 26 814 (mesuré) | ≈ 54 000 |
| **Total** | | | **≈ 270 000** |

Mise à jour 2026-09-05 (nuit) : les 12 récits FR du Voyage V2 (dont Grande Mort, Grande Extinction V2) et les 3 accroches d ères sont DÉJÀ générés ; le solde est tombé à ≈ 3,7 k. Le poste FR restant = les 35 fiches. Les récits EN (12) sont dans les 150 clips hors fiches.

Palier actuel : Creator, 173 048 caractères / mois, reset le **2026-09-11 à 03:15** (Europe/Paris). Solde au 2026-09-05 après les régénérations du jour : ≈ 15 000.
Les scripts sont prêts : fiches 71 × 4 langues (porte 0 KO) et 142 clips EN hors fiches (HO-018, JSON dans `content/i18n/en/scripts-hors-fiche/json/`).

## Options (à trancher par Papa Yann)

| Option | Ce que ça donne | Coût | Quand tout est audible |
|---|---|---|---|
| **A — Pro pendant un mois** (500 000 car.) | FR 35 + EN intégral en une passe au 11/09, puis retour Creator | ≈ 99 $ le mois (au lieu de 22 $) | 12-13 septembre |
| **B — rester Creator, étaler** | 11/09 : FR 35 (53 k) + EN 30 fiches ≈ 120 k ; 11/10 : EN 28 fiches + hors fiches | 0 € de plus | mi-octobre |
| **C — EN en voix native sans speech-to-speech** | tout EN ÷ 2 (≈ 108 k) : FR 35 + EN intégral (≈ 161 k) tiennent dans un mois Creator | 0 € de plus, mais la voix EN n'est plus la voix maison (narrateur_h / Wex) — revient sur DEC-AUDIO-I18N-002 | 12-13 septembre (reste ≈ 6 k à reporter) |

Recommandation : **A** si le budget est acceptable (une seule passe, une seule vérification audio-verif, la voix maison partout). Sinon **B**.

## Ordre d'exécution au reset (quel que soit le choix)

Toutes les commandes se lancent depuis la racine du repo, dans cet ordre, en vérifiant `check_subscription` entre chaque lot.

1. FR 35 fiches : `bash studio/dino/content/scripts/audio/_gen-audio-v3.sh "<ids sauropodes thyréophores marins avant-dinos mégafaune>"` (la liste exacte = ids de `dinos-data.js` dont le MP3 `<id>-nom.mp3` date d'avant le 2026-09-05 : `find site/audio/dinos/fr -name '*-nom.mp3' ! -newermt 2026-09-05`).
2. EN 58 fiches : `node studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs --lang=en --ids=<liste> --pour-de-vrai` (simulation d'abord sans `--pour-de-vrai` pour lire le coût ; le script s'arrête proprement au quota et garde un ledger dans `content/i18n/fiches-audio/en.json`).
3. EN hors fiches : `node studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs --lang=en --hors-fiche --pour-de-vrai` (JSON déjà produits par `_md2json-hors-fiche.cjs en` ; sortie miroir `site/audio/dinos/en/<slug>.mp3`, ledger `content/i18n/fiches-audio/en-hors-fiche.json`).
4. `node studio/dino/content/scripts/export/_gen-audio-manifest.cjs` puis Playwright `dev-dinos.html?lang=en` : chaque zone qui a un MP3 FR doit avoir son MP3 EN, sinon le repli TTS navigateur reste en place (pas de 404).
5. `audio-verif` (skill globale) sur un échantillon de 5 fiches FR + 5 EN + 3 récits EN, rapport dans `docs/handoffs/rapports/HO-019-*.md`.
6. Mettre à jour `memory/INVARIANTS.md` (audio complet FR 71/71, audio EN 71/71 + hors fiches), `memory/TODO.md` (fermer AUDIO-FR-35 et AUDIO-EN-INTEGRAL), commit + push.

## Hors périmètre

es-es et pt-br hors fiches (pas demandé), mini-jeux (i18n séparée, pôle JEU).
