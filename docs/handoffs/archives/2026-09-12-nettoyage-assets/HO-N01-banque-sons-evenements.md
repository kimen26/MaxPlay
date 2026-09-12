# HO-N01 — Banque de sons reconstruite par événement, mots modulables cadrés

**Statut :** fait
**Depend de :** — (vague 1, campagne nettoyage assets 2026-09-12)

## Objectif
`site/sounds/` ne contient plus que des sons branchés ou explicitement réservés à un événement nommé ; `_BANQUE-SONS.md` décrit la bibliothèque PAR ÉVÉNEMENT (victoire, triste/erreur, prout/rigolo, petit bruit, œuf, pas, grognement, navigation, ouverture jeu, ouverture dico, blabla…) et PAR MOT MODULABLE (chiffres, dinos, périodes, familles, lettres, phonèmes, consignes, réactions H/F/Wex) ; le bug `quel-dino-manque.mp3` absent est corrigé ; 0 fichier orphelin sans événement.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-nettoyage-assets-banque-sons.md` (TOUT : matrices, orphelins, Q1..Q7)
- `site/sounds/_BANQUE-SONS.md`, `.claude/rules/sons.md`, `studio/referentiel/catalogue/_bruitages.mjs`, `voix.mjs`
- `site/js/victory-sounds.js` (API unique événements : `SoundPool.*`), `site/js/sounds.js` (chargé par `mj-09.html` seul : dire s'il fusionne dans `victory-sounds.js` ou reste)

## Décisions de l'orchestrateur (déjà tranchées, ne pas rediscuter)
- Q3 : les 11 `voix/phrases/regle-mj-{04,05,08,11,17,23,25,26,27,29,33}.mp3` sont supprimés.
- Q1 : les 12 doublons purs `fx/dino/oeuf-eclot-1..6` et `fx/dino/bebe-dino-1..6` sont supprimés ; les 29 `fx/dino/*` restants (pas, grognements, météo, Parasaurolophus) sont **branchés** dans des pools nommés `pas`, `grognement`, `ambiance-nature` de `SoundPool` (Papa Yann veut ces événements). Aucun mj n'est modifié pour les consommer : le pool existe, prêt.
- Q2 : `music/calme-doux-loop.mp3` est branché en fond de l'encyclopédie (`site/dev-dinos.html`, bouton ou lecture douce au premier tap, volume 0,25, jamais en autoplay bloqué) ; `menu-jungle-loop`, `suspense-loop` supprimés.
- Q4 : les 30 `fx/*` génériques : on GARDE ceux qui servent un événement de la liste de Papa Yann ou l'univers bus/dino de Max (`prout-petit`, `indice`, `tic-tac`, `splash`, `demarrage-bus`, `frein-bus`, `bip-recul`, `dino-pas`, `dino-mange`, `dino-raptor`, `dino-sauropode`, `dino-trex`, `dino-tricera`, `photo`) en les rattachant à un pool nommé (`rigolo`, `petit-bruit`, `bus`, `grognement`, `pas`, `indice`) ; on SUPPRIME les autres (`alien-coucou`, `ambiance-planete`, `canard`, `chat`, `cheval`, `chien`, `cloche-recre`, `decollage-fusee`, `elephant`, `loup`, `oiseau`, `ronflement`, `scanner`, `teleportation`, `vache`, `voiture-vroom`). Chaque suppression retire aussi l'entrée du catalogue référentiel.
- Q5 : oui, documenter les 150 voix i18n dans `_BANQUE-SONS.md` § 1.
- Q6 : retirer `generique-v1/2/3` de la doc.
- Q7 : ne rien générer à l'aveugle SAUF `quel-dino-manque.mp3` (bug réel) : générer via MCP `mcp__elevenlabs__text_to_speech`, voix `narrateur_h` résolue dans `studio/narration/personnages/voix-meta/voice-map.json` (lecture seule), modèle et réglages identiques aux autres `voix/phrases/` (lire le catalogue), padding 250 ms en tête (`reference_sfx_silence_padding`), loudnorm comme les autres, puis ajouter l'entrée catalogue avec `texte_verifie: true`.
- Les 4 phrases dormantes (`a-toi-de-jouer`, `cest-parti`, `encore-une-fois`, `ouvre-bien-les-yeux`) : rattachées au pool `blabla` (voix filler entre deux manches), gardées.

## Fichiers autorises
- `site/sounds/**` (suppressions listées, ajout `voix/phrases/quel-dino-manque.mp3`)
- `site/js/victory-sounds.js`, `site/js/sounds.js` (et `site/mj-09.html` UNIQUEMENT si `sounds.js` est fusionné : ligne de script)
- `site/dev-dinos.html` (fond musical calme-doux, section audio uniquement), `site/dev-sounds-ui.html`
- `studio/referentiel/catalogue/_bruitages.mjs`, `studio/referentiel/catalogue/voix.mjs`, `studio/referentiel/catalogue/fr/**`
- `site/sounds/_BANQUE-SONS.md`, `.claude/rules/sons.md`
- `studio/referentiel/empreintes.json` si `node studio/referentiel/build.mjs` le réécrit

## Hors perimetre
- Aucune commande git. Aucun fichier hors liste. Aucun `site/mj-*.html` (sauf mj-09 ligne script). Aucun `site/audio/**`. Aucune génération EL autre que `quel-dino-manque`.
- Ne PAS créer de 5e API : `SoundPool` pour les événements, `SayNombres` / `MJKit.sayPhoneme` pour les mots modulables.

## Travail
1. Appliquer les suppressions et rattachements ci-dessus ; `victory-sounds.js` expose les pools `pas`, `grognement`, `ambiance-nature`, `rigolo`, `petit-bruit`, `bus`, `indice`, `blabla`, `oeuf` (legacy `dino-oeuf-eclot`), en plus des existants.
2. Générer `quel-dino-manque.mp3`, vérifier à l'oreille (`mcp__elevenlabs__play_audio` ou ffprobe durée 1-3 s) et par STT (`mcp__elevenlabs__speech_to_text`) que le texte est bien « Quel dino manque ? ».
3. Réécrire `_BANQUE-SONS.md` § 1-2 : tableau ÉVÉNEMENT → pool → fichiers → jeux consommateurs ; tableau MOT MODULABLE → famille → attendu/présent → API → consommateurs → manques assumés (nom de lettre, famille, régime : « à générer quand un jeu en a besoin »). Chiffres exacts recomptés. Règle courte `<id>-nom.mp3` (bloc de fiche) ≠ `noms/<id>.mp3` (tap-play) ajoutée dans `.claude/rules/sons.md`.
4. `site/dev-sounds-ui.html` : liste les pools reconstruits (page d'écoute), aucune 404.

## Portes de verification
```bash
node studio/referentiel/valider.mjs
node studio/referentiel/build.mjs
node studio/referentiel/couverture.mjs
cd studio/minijeux/tests && node audit-gabarit.mjs
cd studio/minijeux/tests && node run-all.mjs
# 0 référence vers un fichier supprimé :
grep -rn "regle-mj-\|oeuf-eclot-[1-6]\|bebe-dino-[1-6]\|menu-jungle\|suspense-loop\|generique-v" site/ studio/referentiel/catalogue/ | grep -v "_BANQUE-SONS.md"
# chaque mp3 de site/sounds est cité soit dans site/js soit dans un html soit dans un pool :
node -e "voir script à écrire dans le rapport"
```

## Rapport attendu
`docs/handoffs/rapports/HO-N01.md` : fichiers créés / modifiés / supprimés (liste exacte, poids libéré), sortie des portes collée, capture de `dev-sounds-ui.html` ouverte, questions ouvertes. Réponses aux 5 questions de conception (local/BDD, poids, réutilisable, i18n, manifeste).
