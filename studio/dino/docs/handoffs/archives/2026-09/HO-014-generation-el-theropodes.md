# HO-014 — Génération ElevenLabs des 13 théropodes × 4 langues (fr, en, es-es, pt-br)

**Statut :** bloque par HO-012 (fr) et HO-013 (en/es-es/pt-br)
**Depend de :** HO-012, HO-013
**Exécutant :** orchestrateur (la génération engage le budget EL — jamais déléguée sans pilote validé).

## Objectif

`site/audio/dinos/<lang>/<id>-{nom,taille,regime,funfact,recap}.mp3` pour les 13 théropodes dans les 4 langues,
manifest régénéré, fiche jouable dans l'app avec `?lang=<lang>`.

## Pipelines

- **fr** : `bash studio/dino/content/scripts/audio/_gen-audio-v3.sh "<ids>"` (text-to-dialogue eleven_v3, narrateur_h + wex, recap concat loudnorm).
- **en / es-es / pt-br** : nouveau `studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs` (à écrire, calqué sur
  `studio/referentiel/generer/_gen-lot-i18n-noms-v2-sts.mjs`) : par réplique, TTS voix NATIVE Voice Library
  (en=Liam `TX3LPaxmHKxFdv7VOQHJ` · es-es=Gabriel Blanco `LQDLKBDLh2L4weLEgCIE` · pt-br=Kallil Paiva `H6h0eIkmytMwHWAqLwWR`,
  eleven_v3 + language_code + tags) → speech-to-speech `eleven_multilingual_sts_v2` vers `narrateur_h` OU `wex` selon le rôle
  (sim 0.8, stability 0.4) → concat des répliques du bloc avec loudnorm → bloc MP3 ; recap = concat des 4 blocs.
  Ledger `studio/dino/content/i18n/fiches-audio/<lang>.json` (reprise sur échec/quota, jamais regénérer un bloc sain).
- Silence de tête : ~80 ms (fiches narrées, décision 2026-09-04) — pas de padding 250 ms ici.

## Ordre imposé

1. `check_subscription` → noter le solde. Budget estimé : ~57 k caractères TTS (i18n compte double via STS). STOP si solde < 70 k avant de démarrer.
2. **Pilote** : 1 dino (tyrannosaurus) × 4 langues → skill `audio-verif` (durée, loudness, STT diff mot à mot, `--min-silence-ms 50`).
   Diff STT ≥ 95 % de mots corrects et aucun tag lu à voix haute → GO. Sinon : corriger (densité de tags ? respelling ?) et re-piloter. Jamais de batch sans pilote (L-D-28).
3. Batch des 12 autres, langue par langue, `audio-verif` sur 3 fiches au hasard par langue.
4. `node studio/dino/content/scripts/export/_gen-audio-manifest.cjs` puis vérifier que `dev-dinos.html` gate la fiche i18n sur le manifest (pas de 404 pour les 58 dinos sans audio i18n).
5. Playwright `?lang=en` : fiche T-Rex, bouton « Écoute l'histoire » présent, lecture démarre, 0 erreur console. Capture.
6. Commit ciblé audio (`git add site/audio/dinos/<lang>/<id>-*.mp3`) + manifest + ledgers, push.

## Portes de vérification

```bash
for l in fr en es-es pt-br; do ls site/audio/dinos/$l/tyrannosaurus-*.mp3 | wc -l; done   # 5 chacun
ffprobe -v error -show_entries format=duration -of csv=p=0 site/audio/dinos/en/tyrannosaurus-recap.mp3
node studio/dino/content/scripts/export/_gen-audio-manifest.cjs
```

## Rapport attendu

Solde EL avant/après, tableau 13 × 4 (OK/KO + durée), résultats audio-verif du pilote, capture Playwright.
