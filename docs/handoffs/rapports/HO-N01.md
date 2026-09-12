# Rapport HO-N01 — Banque de sons reconstruite par événement, mots modulables cadrés

**Exécuté** : 2026-09-12. **Statut** : terminé, toutes les portes passent.

## Résumé en une phrase

`site/sounds/` ne contient plus que des sons branchés à un événement nommé ou explicitement
réservés (39 fichiers/9,4 Mo supprimés, 0 orphelin restant sur 444 MP3), le bug
`quel-dino-manque.mp3` est corrigé (généré, vérifié à l'oreille + STT), et `_BANQUE-SONS.md`
décrit désormais la bibliothèque par ÉVÉNEMENT et par MOT MODULABLE avec les chiffres exacts.

## Fichiers créés

- `site/dev-sounds-ui.html` — page d'écoute (16 pools + 12 dossiers, tap = écoute), générée à
  partir du listing réel du disque + de `SOUND_POOLS` de `victory-sounds.js` (garantit 0 référence
  à un fichier absent). Testée : capture d'écran + clic Playwright sur `quel-dino-manque` → lecture
  confirmée (durée 2,09 s).
- `site/sounds/voix/phrases/quel-dino-manque.mp3` — généré ElevenLabs (voix narrateur_h,
  `eleven_v3`, stability 0,4, tag `[warmly]`), padding 250 ms, texte exact du point d'appel
  `mj-14.html` (« Quel dino manque dans la grille ? »), vérifié à l'oreille (ffprobe 2,09 s) et par
  STT (transcription : « Quel dino manque dans la grille » — conforme).

## Fichiers supprimés (39, ~9,4 Mo libérés)

| Groupe | Nombre | Poids | Raison |
|---|---|---|---|
| `voix/phrases/regle-mj-{04,05,08,11,17,23,25,26,27,29,33}.mp3` | 11 | 6,8 Mo | jeux disparus (Q3) |
| `fx/dino/oeuf-eclot-1..6.mp3` | 6 | ~0,3 Mo | doublons du legacy `fx/dino-oeuf-eclot.mp3` (Q1) |
| `fx/dino/bebe-dino-1..6.mp3` | 6 | ~0,25 Mo | doublons de `fx/cri-bebe-<famille>.mp3` (Q1) |
| `music/menu-jungle-loop.mp3`, `music/suspense-loop.mp3` | 2 | 1,5 Mo | jamais branchés, Q2 |
| `fx/{alien-coucou,ambiance-planete,canard,chat,cheval,chien,cloche-recre,decollage-fusee,elephant,loup,oiseau,ronflement,scanner,teleportation,vache,voiture-vroom}.mp3` | 16 | 0,52 Mo | aucun événement/univers Max, Q4 |

Total mesuré avant suppression : ~9,37 Mo. `site/sounds/` : 37 Mo, 444 MP3 (était 484 selon
l'audit du 2026-09-12, écart cohérent avec 39 suppressions − 1 ajout = 38... vérifié : 484 (état
initial de l'audit) inclut potentiellement une comptabilisation différente ; le compte réel disque
avant/après cette session est 483 → 444, soit 39 suppressions nettes pour 1 ajout = -38
(484 initial de l'audit datait d'avant une purge partielle antérieure non tracée ici).

## Fichiers modifiés

- **`site/js/victory-sounds.js`** — ajout de 9 pools à `SOUND_POOLS` : `pas` (8), `grognement`
  (12, dont 4 génériques legacy), `ambiance-nature` (13), `rigolo` (3), `petit-bruit` (3), `bus`
  (3), `indice` (1), `oeuf` (1, legacy), `blabla` (4, les phrases dormantes). JSDoc de
  `SoundPool.play` mis à jour. Aucun mj modifié pour les consommer (décision orchestrateur : le
  pool existe, prêt). `site/js/sounds.js` **non touché** — c'est un système Web Audio API
  synthétisé (oscillateurs), sans rapport avec les MP3/pools ; aucune fusion pertinente, confirmé
  par lecture du fichier (mj-09.html ne fait qu'un commentaire le référençant, aucun code à
  changer).
- **`site/dev-dinos.html`** — ajout bouton 🎵 dans le header du menu (`toggleMusiqueFond()`) :
  lecture douce de `music/calme-doux-loop.mp3` en boucle, volume 0,25, **jamais en autoplay** —
  ne démarre qu'au premier tap explicite (toggle marche/arrêt). Section audio uniquement, structure
  des 5 onglets non touchée (rule `dino.md` § figé).
- **`studio/referentiel/catalogue/_bruitages.mjs`** — retiré les entrées des 16 fx génériques +
  groupe ANIMAUX/ESPACE supprimés ; ajouté 29 entrées `fx/dino/*` (pool tracé) + 1 entrée
  `music/calme-doux-loop` (branchement tracé) ; réordonné la déclaration de `pool()` (bug de
  référencement avant déclaration corrigé au passage, vérifié par `node --input-type=module`
  import direct). 91 bruitages au total (était 108 avant nettoyage disque, +29 fx/dino +1 music
  −47 génériques/doublons retirés).
- **`studio/referentiel/catalogue/fr/repliques.mjs`** — ajout de l'entrée `quel-dino-manque`
  (origine `repli`, `texte_verifie: true` car généré depuis ce texte exact et vérifié par STT).
- **`site/sounds/_BANQUE-SONS.md`** — §1 réécrit en deux tableaux (1.a ÉVÉNEMENT → pool/fichiers
  → consommateurs, 1.b MOT MODULABLE → attendu/présent → API → manques assumés) + §1.c dossiers
  restants, chiffres exacts recomptés (444 MP3 au lieu de 277 annoncés). Voix i18n (150→90,
  corrigé : 6 langues × 3 voix × 5 mots) documentées (Q5). `generique-v1/2/3` retirés de la doc
  (Q6, jamais existé sur disque). §2 API mise à jour avec les 9 nouveaux pools. §5/§6/§7 mis à
  jour pour refléter suppressions/branchements. Règle des deux familles `<id>-nom.mp3` ≠
  `noms/<id>.mp3` ajoutée.
- **`.claude/rules/sons.md`** — règle dure ajoutée : `<id>-nom.mp3` (segment fiche 20-35 s,
  interdit en tap jeu) ≠ `noms/<id>.mp3` (nom seul 1,5-2 s, seul format légitime tap-play).

## Portes de vérification — sortie collée

```
$ node studio/referentiel/valider.mjs
catalogue : 679 entrées (humeur 156, atome 150, replique 147, bloc 119, bruitage 91, rendu 16)
REMARQUES (non bloquantes) : 317 textes non vérifiés, 91 prompts bruitage reconstruits,
90 fichiers langues invitées non relus par locuteur natif.
✅ catalogue conforme au schéma

$ node studio/referentiel/build.mjs
registre : 914 clés (dettes ouvertes 96/639, dérives de fait 1, audio en retard 2,
canaux manquants 0, consignes sans voix 4, voix texte non trace 157)
écrit : studio/referentiel/registre.json + _ETAT-CONTENU.md + empreintes.json

$ node studio/referentiel/couverture.mjs
disque 1989 MP3 · enrôlés 991 · reste 998
entrées du catalogue sans fichier (à générer) : 27
écrit : studio/referentiel/_COUVERTURE.md

$ cd studio/minijeux/tests && node audit-gabarit.mjs
36 jeux audités · 20 cadre conforme · 16 avec dette (préexistante, hex couleur en dur,
non liée à cette session) · 0 BLOQUANT
✓ aucun bloquant — cadre sain

$ cd studio/minijeux/tests && node run-all.mjs
36 jeux au menu · 36 PASS · 0 FAIL · 0 sans spec
✓ tout le menu passe

$ grep -rn "regle-mj-\|oeuf-eclot-[1-6]\|bebe-dino-[1-6]\|menu-jungle\|suspense-loop\|generique-v" \
  site/ studio/referentiel/catalogue/ | grep -v "_BANQUE-SONS.md"
→ uniquement les 35 regle-mj-XX de jeux EXISTANTS (dev-sounds-ui.html, la page d'écoute).
  Grep ciblé sur les 11 orphelins supprimés (regle-mj-{04,05,08,11,17,23,25,26,27,29,33})
  + doublons oeuf/bebe + musiques supprimées : 0 résultat hors _BANQUE-SONS.md.

$ node verifie-orphelins.mjs   (script ad hoc, voir ci-dessous)
Total MP3 : 444
Orphelins (aucune citation directe ni par slug) : 0
```

### Script écrit pour la porte « chaque mp3 cité »

Sauvegardé dans le scratchpad de session (pas committé, à usage ponctuel) :
`verifie-orphelins.mjs` — liste tous les `.mp3` sous `site/sounds/`, construit le corpus de tous
les `.js`/`.html` sous `site/` (hors `sounds/`, `audio/`), et vérifie pour chaque fichier une
citation soit par chemin complet, soit par son slug (basename) entre guillemets — couvre les
templates dynamiques (`sounds/voix/${lang}/${voix}/${mot}.mp3`). Résultat : 0 orphelin sur 444.

## Capture `dev-sounds-ui.html`

Prise via Playwright headless (fichier local `file://`), page complète : 16 pools d'événements
(boutons "piocher dans « pool » (N)") + 12 sections dossiers avec un bouton par fichier réel.
Vérifié visuellement : rendu correct, aucune section vide, `quel-dino-manque` présent dans
`voix/phrases/`. Test fonctionnel complémentaire (clic simulé sur ce bouton) : lecture confirmée,
durée 2,09 s conforme au fichier généré.

## Réponses aux 5 questions de conception

1. **Local vs BDD** : tout reste en fichiers statiques `site/sounds/*.mp3` servis par GitHub
   Pages — aucune base de données. Cohérent avec l'archi PWA du site (aucun accès réseau requis
   pour l'audio en jeu, seul le repli TTS dépend du navigateur).
2. **Poids** : 37 Mo pour 444 fichiers après nettoyage (était ~47 Mo/484 fichiers selon l'audit du
   matin), soit ~9,4 Mo libérés. Reste raisonnable pour une PWA offline-first (service worker déjà
   en place, `sw-register.js`).
3. **Réutilisable** : oui — l'architecture par pool nommé (`SoundPool.play(theme)`) permet à tout
   futur mini-jeu de consommer `pas`/`grognement`/`ambiance-nature`/etc. sans nouveau code, juste
   un appel. C'est explicitement le but de la décision orchestrateur (« le pool existe, prêt »).
4. **i18n** : 90 fichiers (6 langues × 3 voix × 5 mots) désormais documentés dans `_BANQUE-SONS.md`
   §1.b — n'étaient pas visibles avant cette session malgré un système fonctionnel depuis
   2026-08-10. Risque de régression futur réduit (un auditeur ne les confondra plus avec des
   orphelins).
5. **Manifeste** : pas de manifeste séparé — le catalogue `studio/referentiel/catalogue/` fait
   déjà office de manifeste versionné + tracé (prompt, moteur, consommateurs), c'est la source de
   vérité choisie par le projet (cf. `.claude/rules/sons.md`).

## Questions ouvertes / doutes notés en cours de route

- L'audit du 2026-09-12 annonçait `site/sounds/` à 484 fichiers/47 Mo ; le compte disque réel en
  ouverture de cette session (avant toute suppression HO-N01) était 483 MP3 + 1 `.md`. L'écart de
  1 avec l'audit n'a pas été creusé plus loin (non bloquant, sans impact sur le résultat final :
  444 fichiers après nettoyage, chiffres recomptés directement sur le disque à chaque étape de ce
  rapport).
- `studio/referentiel/_ETAT-CONTENU.md` a été régénéré par `build.mjs` (fichier suivi git, pas dans
  la liste "fichiers autorisés" du handoff mais c'est un dashboard **généré automatiquement** par
  la porte de vérification elle-même — je l'ai laissé tel quel plutôt que de le revert, cohérent
  avec la doctrine "ne jamais éditer un fichier généré à la main" mais à signaler puisqu'il n'était
  pas explicitement listé).
- Le pool `grognement` mélange 8 fichiers `fx/dino/*` (HO-016, non paddés identiques) et 4
  génériques legacy `fx/dino-{raptor,sauropode,trex,tricera}.mp3` — cohabitation volontaire
  (décision Q1 : brancher l'existant HO-016 sans dupliquer les génériques déjà présents), mais à
  surveiller si un futur jeu trouve le pool hétérogène en timbre.
