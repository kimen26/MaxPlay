# HO-A01 — Audio EN : lot B, les 28 fiches dino restantes

**Statut :** pret (BLOQUÉ quota jusqu'au reset du 2026-10-11)
**Depend de :** lot A (30 fiches, généré le 2026-09-12)

## Objectif
Les 71 fiches dino ont leur audio anglais complet dans `site/audio/dinos/en/`, blocs `nom`, `taille`, `regime`, `funfact` et `recap`.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-etat-audio-en-dino.md` (état complet, plan en lots)
- `studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs` (en-tête : pipeline STS, ledger, reprise sur quota)
- `.claude/rules/dino.md` (règles figées), `studio/dino/docs/handoffs/HO-019-reprise-audio-quota.md`

## Décisions figées (Papa Yann, 2026-09-12)
- **Qualité maximale, deux passes** : on garde la méthode STS (TTS voix native Liam, puis speech-to-speech vers la voix maison). Coût double assumé. Ne jamais proposer le TTS direct pour économiser.
- Les fiches dino passent **avant** les 150 clips hors fiche.

## Fichiers autorises
- `site/audio/dinos/en/**` (sortie du générateur)
- `studio/dino/content/i18n/fiches-audio/en.json` (ledger, écrit par le script)
- `site/js/gen/dinos-audio-manifest.js` (régénéré par `_gen-audio-manifest.cjs`)
- `docs/handoffs/rapports/HO-A01.md`

## Hors perimetre
- Aucune commande git. Aucun texte de script modifié. Aucun autre langage que EN.
- Ne PAS lancer `--force` : le ledger doit skipper ce qui est déjà sain.

## Travail
1. Vérifier le solde : `mcp__elevenlabs__check_subscription`. Le lot B coûte ≈ 38 608 caractères TTS, soit ≈ 77 216 crédits.
2. Simulation d'abord, sans `--pour-de-vrai`, et comparer le nombre de blocs annoncé au reste réel.
3. Génération : `node studio/dino/content/scripts/audio/_gen-audio-i18n-sts.mjs --lang=en --ids=<les 28 ids> --pour-de-vrai`
4. Recaps (gratuit, ffmpeg) : `bash studio/dino/content/scripts/audio/_gen-recaps.sh "<les 28 ids>"`
5. Régénérer le manifest : `node studio/dino/content/scripts/export/_gen-audio-manifest.cjs`
6. Écouter 3 fiches au hasard et vérifier la durée, le silence de tête de 250 ms, l'absence de coupure.

## Portes de verification
```bash
ls site/audio/dinos/en/*-nom.mp3 | wc -l        # 71
ls site/audio/dinos/en/*-recap.mp3 | wc -l      # 71
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs
node studio/referentiel/build.mjs
```

## Rapport attendu
`docs/handoffs/rapports/HO-A01.md` : ids générés, coût réel constaté, sortie des portes, anomalies d'écoute.
