# Audit banque de sons & mots modulables — 2026-09-12

> Lecture seule. Périmètre : `site/sounds/**`, `site/audio/dinos/fr/{noms,periodes}/`, API JS son,
> tous les `site/mj-*.html`, `site/dev-dinos.html`, `site/index.html`, `studio/referentiel/catalogue/**`,
> `.claude/rules/sons.md`. Objectif : cartographier ce qui existe / est joué / manque, identifier les
> sons tiers à supprimer, préparer la reconstruction de la bibliothèque.

**Verdict global en une phrase** : le système est **beaucoup plus sain que redouté** — zéro son tiers
détecté, la doc `_BANQUE-SONS.md` est globalement fiable — mais elle a **dérivé sur 3 points** (compte
de fichiers, i18n non documenté, manifest dino mal nommé) et il reste **~9,6 Mo d'orphelins** dont
41 bruitages dino et 3 musiques d'ambiance jamais branchés, plus **11 voicelines de jeux qui n'existent
plus**, plus **1 appel qui pointe vers un fichier absent**.

---

## 1. Chiffres

| Dossier | Fichiers | Poids |
|---|---|---|
| `site/sounds/` (tout) | 484 | 47 Mo |
| — dont `voix/` (f, h, wex, phrases, + 6 langues invitées) | 262 | 37 Mo |
| — dont `fx/` (racine + `fx/dino/`) | 108 (67 + 41) | 4,4 Mo |
| — dont `music/` | 7 | 2,5 Mo |
| — dont `nombres/` | 75 | 1,9 Mo |
| — dont `ui/` | 10 | 392 Ko |
| — dont `phonemes/` | 21 | 332 Ko |
| — dont `pieces/` | 6 | 236 Ko |
| `site/audio/dinos/fr/noms/` | 70 | (inclus dans 383 Mo `audio/dinos/` tout langues) |
| `site/audio/dinos/fr/periodes/` | 5 | — |

`_BANQUE-SONS.md` annonce **277 fichiers** (2026-07-06) ; la réalité au 2026-09-12 est **484** dans
`site/sounds/` seul. L'écart s'explique : +41 `fx/dino/` (HO-016), +7 `music/` dont 4 réellement neufs
(HO-015), +150 `voix/{en,es,it,ja,pt-br,zh}/` (i18n, 2026-08-10, **jamais consigné dans le tableau du
§1** de la banque alors que le code qui les consomme existe et fonctionne). Le §6 de la banque liste
aussi `generique-v1/2/3.mp3` comme existants : **ces 3 fichiers n'existent pas sur disque** — seuls les
4 `victoire-v*.mp3` et les 3 boucles d'ambiance sont réellement présents dans `music/`.

## 2. Matrice ÉVÉNEMENT × son

| Événement | Son(s) existant(s) | Fichier(s) | API | Jeux qui l'appellent | Verdict |
|---|---|---|---|---|---|
| Victoire (≥50%) | 10 sons en pool (4 `music/victoire-v*`, `fx/victoire-grande`, `tada`, `trophee`, `applaudissements`, `trompette-fanfare`, `ui/fanfare-victoire`) | `SOUND_POOLS.victory` | `SoundPool.play('victory')` via `playEndSound` | tous les mj-XX (via `victory-sounds.js`) | OK |
| Fin douce (<50%) | 3 sons (`trombone-oups`, `oups-doux`, `sifflet-glissant`) | `SOUND_POOLS['end-doux']` | idem | tous les mj-XX | OK |
| Bonne réponse (en cours de partie) | 6 sons (`bonne-reponse`, `victoire-petite`, `piece`, `clochette`, `xylophone-monte`, `magie`) | `SOUND_POOLS.success` | `SoundPool.play('success')` | selon jeu | OK (décision produit : pas de voix à chaque bonne réponse, cf §4 banque) |
| Erreur | 5 sons (`oups-doux`, `trombone-oups`, `prout-long`, `ui/klaxon`, `boing`) | `SOUND_POOLS.error` | `playErrorSound()` / `SoundPool.play('error')` | tous les mj-XX | OK |
| Apparition élément | 4 sons (`pop-apparition`, `bulle-pop`, `boing`, `whoosh`) | `SOUND_POOLS.apparition` | `SoundPool.play('apparition')` | mini-étoile, etc. | OK |
| Collecte (étoile/pièce/badge) | 4 sons (`piece`, `pluie-pieces`, `ui/etoile`, `magie`) | `SOUND_POOLS.collecte` | `SoundPool.play('collecte')` | — | OK défini, pas vu appelé dans un mj (à vérifier au cas par cas) |
| Déblocage | 3 sons (`ui/deblocage`, `roulement-tambour`, `waouh`) | `SOUND_POOLS.deblocage` | `SoundPool.play('deblocage')` | — | **MANQUE de branchement** : `_BANQUE-SONS.md` §5 le dit déjà — `index.html` ne charge pas `victory-sounds.js`, le hub ne joue jamais ce pool |
| Étoile gagnée (voix) | 3 voicelines (f/h/wex) | `voix/{f,h,wex}/etoile-gagnee.mp3` | `SoundPool.voiceLine('etoile-gagnee', …)` | `Golden._starFlight` | OK |
| Tap / navigation UI | `ui/tap.mp3` | — | pas d'API dédiée trouvée, probablement `new Audio()` direct | à vérifier | à confirmer branchement |
| Ouverture "jeu" (hub bus) | `ui/moteur-bus`, `ui/klaxon`, `ui/porte-bus` | — | identité sonore hub « Ligne de Max » | hub `index.html`? | **non confirmé branché** — catalogue les documente comme identité hub mais aucun `new Audio(` direct trouvé dans les JS grep pour `moteur-bus`/`porte-bus` hors doc |
| Ouverture dico/encyclopédie | `ui/voyage-temps.mp3` (onglet Voyage) | — | — | dev-dinos.html (documenté) | OK selon doc, non re-vérifié ligne à ligne |
| Retour (back) | `back-button.js` existe | — | — | — | non audité en détail (hors mots modulables, effort concentré ailleurs) |
| Œuf casse/éclosion | 6 `fx/dino/oeuf-eclot-*` (HO-016) + `fx/dino-oeuf-eclot.mp3` (legacy, actif) | — | `nid-ui.js` | mj-46 + nid | **DOUBLON non nettoyé** : le générique legacy `fx/dino-oeuf-eclot.mp3` est branché et actif, les 6 variantes HO-016 `fx/dino/oeuf-eclot-*` sont orphelines (jamais appelées) |
| Pas | 8 `fx/dino/pas-*` (HO-016) + `fx/dino-pas.mp3` (legacy) | — | — | aucun consommateur trouvé | **ORPHELIN total** (9 fichiers, aucun jeu ne joue de bruit de pas) |
| Grognement / rugissement | 8 `fx/dino/gros-*` + `petit-cri-*` (HO-016) | — | — | aucun | **ORPHELIN** (HO-016 non branché, confirmé par la banque elle-même) |
| Cri bébé par famille | 11 `fx/cri-bebe-<famille>.mp3` | — | `nid-ui.js` → `playBabyCry` | nid (éclosion) | OK, branché avec repli défensif sur 3 génériques `dino-bebe*.mp3` |
| Prout / rigolo | `prout-long` (actif, pool error), `prout-petit` (jamais appelé) | — | pool `error` | tous mj-XX | OK pour `prout-long` ; `prout-petit` **ORPHELIN** |
| Blabla / voix filler | — | — | — | — | **absent** : aucune banque de "blabla" générique trouvée (TTS filler non couvert) |
| Musique de fond | 3 boucles (`menu-jungle`, `calme-doux`, `suspense`) | `music/*-loop.mp3` | aucune | aucun jeu, aucun hub | **ORPHELIN total** (HO-015, la banque le dit : "aucun branchement fait") |
| Ambiance (météo/nature dino) | 7 `fx/dino/{tonnerre,pluie,cascade,vent,eclair}*` (HO-016) | — | — | aucun | **ORPHELIN** |

## 3. Matrice MOTS MODULABLES

| Famille | Attendu vs présent | Voix | API | Consommateurs | Manques exacts |
|---|---|---|---|---|---|
| Chiffres `n-<n>` 0-30+40/50/100/1000 | 35/35 présents | narrateur_h | `SayNombres.say` | mj-46, mj-49 | aucun |
| Chiffres fête `n-<n>-fete` 1-10 | 10/10 | narrateur_h | `SayNombres.say({fete:true})` | idem | aucun |
| Gabarits `il-en-manque-<n>` / `il-en-faut-<n>` / `<n>-oeufs` 1-10 | 30/30 (10×3) | narrateur_h | `SayNombres.manque/faut/oeufs` | mj-46, mj-49 | aucun (au-delà de 10 : repli TTS assumé, décision produit) |
| Phonèmes (son de lettre) 21 lettres | 21/21 (c/k/q partagent `son-ke`, h muet = TTS seul) | narrateur_h | `MJKit.sayPhoneme` | mj-50, mj-51, mj-52 | aucun |
| **Nom de lettre** (pas le son) | 0 fichier dédié | — | — | — | **MANQUE** : uniquement le son phonétique existe, pas "cette lettre s'appelle A" |
| Noms de dinos (nom seul, courts) | 70/70 FR | narrateur_h | `playDinoNom` (`js/gen/dinos-audio-manifest.js`) | mj-28, mj-30 | aucun en FR ; autres langues hors périmètre de cet audit |
| Périodes | 5/5 (trias, jurassique, crétacé, cénozoïque, pangée) | narrateur_h | `playPeriodeVoice` / `PERIODE_MP3` | mj-31, dev-dinos.html | aucun |
| Familles de dinos (nom parlé de la famille) | **0 fichier** | — | — | — | **MANQUE** : `DINO_FAMILLES` existe en data (`site/js/gen/dinos-data.js`) mais aucun MP3 "Théropodes", "Sauropodes"… |
| Régime alimentaire (carnivore/herbivore…) | **0 fichier** | — | — | — | **MANQUE** total |
| Couleurs | **0 fichier trouvé** | — | — | — | **MANQUE** (hors périmètre si pas de jeu couleur, à confirmer avec Papa Yann) |
| Pièces d'échecs (intro) | 6/6 (fou/tour/cavalier/dame/roi/pion) | narrateur_h | appel direct fichier en dur dans mj-37 (pas d'API partagée) | mj-37 | aucun fichier manquant, mais **pas d'API dédiée** — `new Audio()` en dur dans le HTML |
| Réactions positives voix H/F/Wex | 16/16 × 3 voix = 48 | 3 voix | `SoundPool.voice('positif')` | tous mj-XX | aucun |
| Réactions douces voix H/F/Wex | 6/6 × 3 voix = 18 | 3 voix | `SoundPool.voice('doux')` | tous mj-XX | aucun |
| Réactions i18n invitées (6 langues × 5 mots × 3 voix) | 90/90 | 3 voix | `_doublonInvite` (interne à `victory-sounds.js`) | tous mj-XX (déclenché aléatoirement après une réaction FR) | aucun — **mais non documenté dans `_BANQUE-SONS.md` §1** |
| Phrases-consignes fixes | 28 slugs documentés, **37 fichiers réels** | narrateur_h | `SoundPool.phrase(slug, repli)` | mj-13a/13c/14/15/16/22/25/26/30 + `RegleInfo.init` (slug auto `regle-mj-<id>`) | voir §5/§6 ci-dessous |
| Voicelines `regle-mj-XX` (aide contextuelle ❓) | 57 fichiers présents, seuls 36 mj-XX existent | narrateur_h | `RegleInfo.init({slug})` (slug par défaut = `'regle-' + gameId()`) | tout mj qui appelle `RegleInfo.init` sans slug explicite | **11 fichiers orphelins** — mj-04/05/08/11/17/23/25/26/27/29/33 n'existent plus (jeux supprimés/jamais livrés), voicelines jamais nettoyées |

## 4. Sons TIERS identifiés (à supprimer sec)

**Aucun trouvé.** `studio/referentiel/catalogue/_bruitages.mjs` et `voix.mjs` tracent systématiquement
`moteur: 'text_to_sound_effects' | 'text_to_speech' | 'compose_music'` pour chaque fichier de
`site/sounds/`. `.claude/rules/sons.md` et `_BANQUE-SONS.md` ne mentionnent aucune source externe, aucune
licence, aucun stock audio. Les prompts de génération sont documentés (parfois `prompt_verifie: false`
car reconstruits a posteriori, mais l'origine ElevenLabs elle-même n'est jamais en doute).
Décision figée "sons tiers → suppression" : **rien à appliquer, le périmètre `site/sounds/` est propre.**
Non vérifié : `site/audio/dinos/` hors `fr/noms` et `fr/periodes` (hors périmètre de ce ticket, traité
par l'autre agent audio) et d'éventuels sons ailleurs dans `site/` (hors périmètre demandé).

## 5. ORPHELINS exacts (aucun appel)

| Fichier(s) | Nombre | Poids | Raison |
|---|---|---|---|
| `fx/dino/*` (cris gros/petits, Parasaurolophus, pas, météo — hors bébés et œufs) | 29 | ~1,6 Mo | HO-016 jamais branché (la banque l'admet elle-même) |
| `fx/dino/oeuf-eclot-1..6.mp3` | 6 | ~700 Ko | doublon du legacy `fx/dino-oeuf-eclot.mp3` déjà branché, jamais basculé |
| `fx/dino/bebe-dino-1..6.mp3` | 6 | ~500 Ko | doublon des `fx/cri-bebe-<famille>.mp3` (déjà branchés) et des génériques `fx/dino-bebe*.mp3` (repli actif) |
| `music/menu-jungle-loop.mp3`, `calme-doux-loop.mp3`, `suspense-loop.mp3` | 3 | ~2,3 Mo | HO-015 jamais branché |
| `fx/{alien-coucou,ambiance-planete,bip-recul,canard,chat,cheval,chien,cloche-recre,decollage-fusee,demarrage-bus,dino-mange,dino-pas,dino-raptor,dino-sauropode,dino-trex,dino-tricera,elephant,frein-bus,indice,loup,oiseau,photo,prout-petit,ronflement,scanner,splash,teleportation,tic-tac,vache,voiture-vroom}.mp3` | 30 | ~880 Ko | banque générale ancienne (animaux/véhicules/divers), jamais reliée à un pool ni un jeu |
| `voix/phrases/regle-mj-{04,05,08,11,17,23,25,26,27,29,33}.mp3` | 11 | ~1,3 Mo (6,8 Mo mesurés incluent des doublons de calcul, à re-vérifier au ffprobe) | jeux mj-XX correspondants n'existent plus dans `site/` |
| `voix/phrases/{a-toi-de-jouer,cest-parti,encore-une-fois,ouvre-bien-les-yeux}.mp3` | 4 | — | admis dans `_BANQUE-SONS.md` §5 comme orphelins en attente de décision produit |

**Total orphelins ≈ 89 fichiers, ~9,6 Mo** (dino fx/music HO-015/016 = 44 fichiers/4,6 Mo ; legacy fx
générique = 30 fichiers/0,9 Mo ; regle-mj morts = 11 fichiers ; phrases sans jeu = 4 fichiers).

## 6. Appels vers fichiers absents (repli TTS silencieux)

| Appel | Fichier attendu | Existe ? | Où |
|---|---|---|---|
| `SoundPool.phrase('quel-dino-manque', …)` | `sounds/voix/phrases/quel-dino-manque.mp3` | **NON** | grille dino (mj concerné, cf grep `T('consigneDinoGrille'…)`) — repli TTS silencieux à chaque partie |
| `music/generique-v1/2/3.mp3` (documentés §6 de la banque) | `sounds/music/generique-v*.mp3` | **NON**, jamais générés malgré la doc | doc uniquement, aucun appel code trouvé donc pas de crash, juste doc fausse |

Un seul vrai bug fonctionnel : **`quel-dino-manque.mp3` manque**, le jeu retombe sur la voix robot du
navigateur à chaque partie sans que personne s'en aperçoive (le piège même que `.claude/rules/sons.md`
signale comme incident passé, § repli TTS).

## 7. Bibliothèque cible — proposition

**Arborescence** (garder la structure actuelle, elle est saine) :
```
site/sounds/
  ui/            identité hub (garder, brancher enfin le hub)
  fx/            bruitages généraux courts
  fx/dino/       SUPPRIMER après décision Q1 (branchement ou suppression, voir §8)
  music/         musiques de fond — SUPPRIMER les 3 boucles ou les brancher (Q2)
  voix/{f,h,wex}/         réactions courtes
  voix/phrases/           consignes de jeu — NETTOYER les 11 regle-mj-XX morts + décider des 4 phrases dormantes
  voix/{en,es,it,ja,pt-br,zh}/{f,h,wex}/   i18n — DOCUMENTER dans _BANQUE-SONS.md §1 (absent alors que fonctionnel)
  nombres/, phonemes/, pieces/            mots modulables, propres, rien à toucher
```

**Convention de nommage** : celle en place est bonne (slug kebab-case stable, `<categorie>/<slug>.mp3`),
la garder telle quelle. Seul point à durcir : les fichiers `fx/dino/*` et `fx/*legacy*` se recoupent
sémantiquement (`oeuf-eclot` en double, `bebe-dino` en double d'un côté et `dino-bebe`/`cri-bebe-<famille>`
de l'autre) — un audit de nommage devra choisir UNE famille de noms avant la prochaine génération.

**API à garder** : `site/js/victory-sounds.js` (`SoundPool.*`, `playEndSound`, `playErrorSound`) reste
l'API unique pour événements + réactions + i18n — c'est la plus complète et déjà partout. `SayNombres`
et `MJKit.sayPhoneme` restent séparés car ce sont de vrais sous-systèmes (gabarits combinatoires, pas de
pool aléatoire) — ne PAS les fusionner dans `victory-sounds.js`, la séparation actuelle est saine.
`mj-kit.js` reste l'utilitaire jeu générique (pas un système sonore en soi). **Ne pas créer de 5e API** :
tout nouveau son d'événement doit passer par un pool `SoundPool`, tout nouveau mot modulable doit avoir
son propre petit module comme `say-nombres.js` (pattern à copier, pas à fusionner).

**Sons à GÉNÉRER pour combler les manques** :

| Événement/mot | Prompt court | Voix/SFX |
|---|---|---|
| `quel-dino-manque` (bug réel) | "Quel dino manque dans la grille ?" | voix narrateur_h, `text_to_speech`, tag `[curious]` |
| Nom de lettre (26, si un jeu en a besoin) | "A", "Bé", "Cé"… ton neutre chaleureux | narrateur_h |
| Nom de famille de dino (6-7 familles) | "Les Théropodes", "Les Sauropodes"… `[excited]` | narrateur_h, cohérent avec noms/périodes |
| Régime alimentaire (carnivore/herbivore/omnivore) | "Il est carnivore !" ton pédagogique | narrateur_h ou wex |
| Tap UI générique confirmé branché partout | déjà `ui/tap.mp3` — juste vérifier le branchement réel | — |

## 8. Questions À TRANCHER

**Q1 — `fx/dino/*` (44 fichiers HO-016, 2,3 Mo) : brancher ou supprimer ?**
Recommandation : **supprimer les 15 doublons purs** (`oeuf-eclot-1..6`, `bebe-dino-1..6`, 3 légers
recoupements) qui font double emploi avec des fichiers déjà branchés ; **garder et brancher** les 29
restants (pas/grognements/météo) dans un futur mini-jeu ou l'ambiance de l'encyclopédie — ce sont les
seuls bruitages dino "cinématiques" de la banque, les supprimer serait jeter un travail payé et de
qualité. Décision Papa Yann nécessaire avant toute suppression irréversible.

**Q2 — `music/{menu-jungle,calme-doux,suspense}-loop.mp3` (3 fichiers, 2,3 Mo) : brancher au hub/encyclopédie ou supprimer ?**
Recommandation : **brancher** `calme-doux-loop` en fond de l'encyclopédie (dev-dinos.html) — c'est
l'usage prévu documenté et le fichier est de qualité ("Ghibli-like"). Les 2 autres (`menu-jungle`,
`suspense`) : garder en réserve encore une session, sinon supprimer si aucun hub prévu sous 1 mois.

**Q3 — 11 `regle-mj-XX.mp3` orphelins de jeux disparus : supprimer maintenant ?**
Recommandation : **oui, suppression immédiate**, aucune ambiguïté — les mj-04/05/08/11/17/23/25/26/27/29/33
n'existent nulle part dans `site/`, ce ne sont pas des orphelins "en attente" mais des cadavres de jeux
retirés. ~1,3 Mo récupérés, zéro risque.

**Q4 — 30 `fx/*` génériques (animaux/véhicules, banque ancienne pré-refonte, 0,9 Mo) : supprimer ou garder en réserve ?**
Recommandation : **garder** — poids négligeable, catalogués (traçabilité ElevenLabs propre dans
`_bruitages.mjs`... **à vérifier**, certains comme `canard`/`chat`/`vache` ne sont PAS dans le catalogue
`_bruitages.mjs` malgré leur présence disque — à ajouter au catalogue avant toute décision de suppression,
sinon on perd la trace de génération sans même les avoir utilisés une fois.

**Q5 — Voix i18n (150 fichiers, 6 langues × 3 voix × 5 mots) non documentées dans `_BANQUE-SONS.md` §1 : corriger la doc ?**
Recommandation : **oui, immédiat** — le système fonctionne (`_doublonInvite`, code vérifié), c'est un
vrai trou de documentation qui pourrait faire croire à un futur auditeur que ces 150 fichiers sont des
orphelins tiers. Ajouter une ligne au tableau §1 de `_BANQUE-SONS.md`.

**Q6 — `music/generique-v1/2/3.mp3` documentés mais absents du disque : régénérer ou retirer de la doc ?**
Recommandation : **retirer de la doc** — aucun code ne les appelle, ils n'ont visiblement jamais été
livrés malgré la mention "généré" du §6. Corriger `_BANQUE-SONS.md` pour ne pas induire en erreur.

**Q7 — Manques modulables (nom de lettre, famille de dino, régime) : les générer maintenant ou attendre un jeu qui en a besoin ?**
Recommandation : **attendre** — générer à l'aveugle sans jeu consommateur reproduit exactement le
problème HO-015/HO-016 (44 fichiers jamais branchés). Router la décision de génération par un besoin
produit concret (nouveau mj- qui en a besoin), pas par complétude théorique de la bibliothèque.

## 9. Commandes utilisées

```bash
find site/sounds -type f | sort
du -sh site/sounds/*
find site/audio/dinos -maxdepth 1 -type d
grep -orhE "sounds/[a-zA-Z0-9_/.-]+\.mp3|SoundPool\.[a-zA-Z]+\([^)]*\)|..." site/js/*.js site/*.html
grep -orh "fx/dino/[a-z0-9-]*\.mp3" site/js/*.js site/*.html | sort -u
comm -23 <(find site/sounds/fx -maxdepth 1 -name "*.mp3" -exec basename {} \; | sort) <(grep -oh "sounds/fx/[a-zA-Z0-9_-]*\.mp3" studio/referentiel/catalogue/_bruitages.mjs | xargs -n1 basename | sort -u)
git log --diff-filter=A --format=%ad --date=short -1 -- site/sounds/voix/ja/f/sugoi.mp3
ls site/sounds/voix/phrases/regle-mj-*.mp3 | sed -E 's/.*regle-mj-([0-9a-z]+)\.mp3/\1/' | sort -n
ls site/mj-*.html | sed -E 's/.*mj-([0-9a-z]+)\.html/\1/' | sort -n
grep -in "tiers|third.party|freesound|zapsplat|licence|copyright" studio/referentiel/catalogue/*.mjs .claude/rules/sons.md site/sounds/_BANQUE-SONS.md
```

Aucune commande destructive exécutée. Aucun fichier modifié hors ce rapport.
