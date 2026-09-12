# 🔊 Banque de sons MaxPlay — carte + mode d'emploi

> Source de vérité du système sonore du site. Créé 2026-07-06 (session refonte audio).
> **Avant de générer un son : lire ce fichier.** Avant de coder un son dans un jeu : lire § API.
>
> **Où lire quoi** : ce fichier = inventaire des fichiers + API + process. Les **contrats,
> lignée et dérive** (quel texte alimente quel MP3, quoi régénérer) vivent dans
> [`studio/referentiel/`](../../studio/referentiel/README.md) — tableau de bord :
> `studio/referentiel/_ETAT-CONTENU.md` (généré). Les règles dures auto-chargées :
> [`.claude/rules/sons.md`](../../.claude/rules/sons.md).

---

## 1. Où c'est stocké (444 fichiers MP3 — reconstruit par événement HO-N01, 2026-09-12)

> Après nettoyage HO-N01 : `site/sounds/` ne contient QUE des sons branchés à un
> événement nommé ou explicitement réservés (aucun orphelin sans événement).
> Les tableaux ci-dessous répondent à deux questions : « pour tel ÉVÉNEMENT, quel
> pool/fichier ? » et « pour tel MOT MODULABLE, quelle API ? ».

### 1.a Par ÉVÉNEMENT (`SoundPool.play(theme)` sauf mention contraire)

| Événement | Pool/fichier | Fichiers | Jeux consommateurs |
|---|---|---|---|
| Victoire (≥50%) | `victory` | 10 (4 `music/victoire-v*`, `fx/victoire-grande`, `tada`, `trophee`, `applaudissements`, `trompette-fanfare`, `ui/fanfare-victoire`) | tous les mj-XX (`playEndSound`) |
| Fin douce (<50%) | `end-doux` | 3 (`trombone-oups`, `oups-doux`, `sifflet-glissant`) | tous les mj-XX |
| Bonne réponse en cours de partie | `success` | 6 (`bonne-reponse`, `victoire-petite`, `piece`, `clochette`, `xylophone-monte`, `magie`) | selon jeu |
| Erreur | `error` | 5 (`oups-doux`, `trombone-oups`, `prout-long`, `ui/klaxon`, `boing`) | tous les mj-XX (`playErrorSound`) |
| Apparition élément | `apparition` | 4 (`pop-apparition`, `bulle-pop`, `boing`, `whoosh`) | mini-étoile, etc. |
| Collecte (étoile/pièce/badge) | `collecte` | 4 (`piece`, `pluie-pieces`, `ui/etoile`, `magie`) | — (défini, pas encore consommé) |
| Déblocage (nouveau jeu/dino) | `deblocage` | 3 (`ui/deblocage`, `roulement-tambour`, `waouh`) | — (défini, hub ne le charge pas encore) |
| Pas de dino | `pas` | 8 (`fx/dino/pas-*`) | — (pool prêt, aucun jeu ne le consomme) |
| Grognement/rugissement dino | `grognement` | 12 (8 `fx/dino/gros-*`+`petit-*` + 4 génériques `fx/dino-{raptor,sauropode,trex,tricera}`) | — (pool prêt) |
| Ambiance nature/météo dino | `ambiance-nature` | 13 (6 Parasaurolophus + 7 météo/nature `fx/dino/*`) | — (pool prêt) |
| Rigolo (prout, éclaboussure) | `rigolo` | 3 (`prout-long`, `prout-petit`, `splash`) | — (pool prêt) |
| Petit bruit discret | `petit-bruit` | 3 (`dino-mange`, `photo`, `tic-tac`) | — (pool prêt) |
| Identité bus | `bus` | 3 (`demarrage-bus`, `frein-bus`, `bip-recul`) | — (pool prêt) |
| Indice | `indice` | 1 (`fx/indice`) | — (pool prêt) |
| Œuf casse/éclosion | `oeuf` | 1 (`fx/dino-oeuf-eclot`, legacy) | `nid-ui.js` + mj-46 |
| Blabla / voix filler entre manches | `blabla` (`SoundPool.play('blabla')` ou `phrase(slug)`) | 4 (`a-toi-de-jouer`, `cest-parti`, `encore-une-fois`, `ouvre-bien-les-yeux`) | — (rattachées HO-N01, pas encore appelées) |
| Étoile gagnée (voix) | `SoundPool.voiceLine('etoile-gagnee')` | 3 (f/h/wex) | `mj-golden.js` |
| Cri bébé par famille | `nid-ui.js → playBabyCry` | 11 `fx/cri-bebe-<famille>` | nid (éclosion), repli sur 3 génériques `dino-bebe*` |
| Musique de fond encyclopédie | direct `new Audio()` | 1 (`music/calme-doux-loop.mp3`) | `dev-dinos.html`, bouton 🎵, volume 0,25, jamais autoplay |
| Ouverture jeu (identité hub) | direct | `ui/moteur-bus`, `ui/klaxon`, `ui/porte-bus` | identité sonore hub, branchement non ré-audité ici |
| Ouverture dico/encyclopédie | direct | `ui/voyage-temps.mp3` | onglet Voyage dev-dinos.html |

### 1.b Par MOT MODULABLE

| Famille | Attendu/présent | API | Consommateurs | Manques assumés |
|---|---|---|---|---|
| Chiffres `n-<n>` 0-30+40/50/100/1000 | 35/35 | `SayNombres.say` | mj-46, mj-49 | aucun |
| Chiffres fête `n-<n>-fete` 1-10 | 10/10 | `SayNombres.say({fete:true})` | idem | aucun |
| Gabarits `il-en-manque-<n>`/`il-en-faut-<n>`/`<n>-oeufs` 1-10 | 30/30 | `SayNombres.manque/faut/oeufs` | mj-46, mj-49 | au-delà de 10 : repli TTS assumé |
| Phonèmes (son de lettre) | 21/21 | `MJKit.sayPhoneme` | mj-50, mj-51, mj-52 | aucun |
| Nom de lettre (pas le son) | 0 | — | — | à générer quand un jeu en a besoin |
| Noms de dinos (nom seul) | 70/70 FR | `playDinoNom` | mj-28, mj-30 | aucun en FR |
| Périodes | 5/5 | `playPeriodeVoice` / `PERIODE_MP3` | mj-31, dev-dinos.html | aucun |
| Familles de dinos (nom parlé) | 0 | — | — | à générer quand un jeu en a besoin |
| Régime alimentaire | 0 | — | — | à générer quand un jeu en a besoin |
| Pièces d'échecs (intro) | 6/6 | appel direct fichier (mj-37, pas d'API partagée) | mj-37 | aucun |
| Réactions positives voix H/F/Wex | 16×3=48/48 | `SoundPool.voice('positif')` | tous mj-XX | aucun |
| Réactions douces voix H/F/Wex | 6×3=18/18 | `SoundPool.voice('doux')` | tous mj-XX | aucun |
| Réactions i18n invitées (6 langues×5 mots×3 voix) | 90/90 | `_doublonInvite` (interne à victory-sounds.js) | tous mj-XX (~1 fois sur 2 après une réaction FR) | aucun |
| Phrases-consignes fixes | 88 fichiers réels (`voix/phrases/`) | `SoundPool.phrase(slug, repli)` | selon slug | voir « Règle des deux familles » ci-dessous |
| Voicelines `regle-mj-XX` (aide contextuelle ❓) | 46 fichiers pour 35 jeux existants | `RegleInfo.init({slug})` | tout mj avec panneau règles | les 11 orphelins (mj 04/05/08/11/17/23/25/26/27/29/33, jeux disparus) supprimés HO-N01 |

**Règle des deux familles** (à ne jamais confondre — gravée dans `.claude/rules/sons.md`) :
- `<id>-nom.mp3` (à plat, `site/audio/dinos/`) = segment de FICHE 20-35 s, lu par `playDinoNom` — **interdit** sur un tap en jeu court.
- `noms/<id>.mp3` (`site/audio/dinos/fr/noms/`) = NOM SEUL 1,5-2 s, ton `[excited]`, seul format légitime pour un tap-play dans un mini-jeu.

**Voix i18n** (2026-08-10, jamais documentées avant HO-N01) : `site/sounds/voix/{en,es,it,ja,pt-br,zh}/{f,h,wex}/` —
90 fichiers = 6 langues × 3 voix × 5 mots d'encouragement propres à chaque culture (PAS des
traductions mot à mot). Consommés par `_doublonInvite` dans `victory-sounds.js` (§ 2), affichage
d'un drapeau ~1,15 s après la réaction FR, une fois sur deux (`CHANCE_DOUBLON`).

### 1.c Dossiers restants (inchangés, propres)

| Dossier | Contenu | Voix | Généré via |
|---|---|---|---|
| `site/sounds/ui/` (10) | identité hub « Ligne de Max » : moteur-bus, klaxon, porte-bus, tap, fanfare-victoire, etoile, deblocage, ambiance-nuit (loop), voyage-temps, veilleuse | SFX | `text_to_sound_effects` |
| `site/sounds/fx/` (33) | catalogue restant après nettoyage HO-N01 : pools victoire/erreur/succès/apparition/collecte/déblocage, rigolo, petit-bruit, bus, indice, dino générique, **cris de bébés par famille `cri-bebe-*` (§ 4 bis)** | SFX | `text_to_sound_effects` |
| `site/sounds/fx/dino/` (29) | bruitages cinématiques dino (pas, grognements, Parasaurolophus, météo/nature) — HO-016 + branchement HO-N01, § 7 | SFX | `text_to_sound_effects` |
| `site/sounds/music/` (5) | 4 `victoire-v*` (pool `victory`) + `calme-doux-loop` (fond encyclopédie) — HO-015 + branchement HO-N01, § 6 | — | `compose_music` (+ `text_to_sound_effects` pour victoire-v1) |
| `site/sounds/voix/f/`, `/h/`, `/wex/` (23 chacun) | réactions — 16 positives + 6 douces + `etoile-gagnee` | narrateur_f / narrateur_h / wex | `text_to_speech` |
| `site/sounds/voix/phrases/` (88) | instructions fixes des jeux + `regle-mj-XX` (voir § 1.b) | narrateur_h | `text_to_speech` |
| `site/sounds/voix/{en,es,it,ja,pt-br,zh}/{f,h,wex}/` (90) | réactions i18n invitées, § 1.b | 3 voix × 6 langues | `text_to_speech` |
| `site/sounds/nombres/` (75) | **Banque C6 V1 (2026-07-29)** : gabarits complets nombres/fête/manque/faut/oeufs — JAMAIS d'assemblage mot-à-mot | narrateur_h | script API (gen-banque.mjs) |
| `site/sounds/phonemes/` (21) | LE SON de chaque lettre (jamais le nom) | narrateur_h | script API |
| `site/sounds/pieces/` (6) | voicelines intro pièces échecs mj-37 | narrateur_h | `text_to_speech` |
| `site/audio/dinos/fr/periodes/` (5) | trias, jurassique, cretace, cenozoique, pangee | narrateur_h | `text_to_speech` |
| `site/audio/dinos/fr/noms/` (70) + `<id>-nom.mp3` (60) | vocal NOM SEUL des dinos — hors périmètre de ce nettoyage (audité par un autre HO) | narrateur_h | `text_to_speech` |

Voix résolues via `studio/narration/personnages/voix-meta/voice-map.json` (jamais hardcoder un voice_id).

**Page d'écoute** : `site/dev-sounds-ui.html` (tous les pools + dossiers, tap = écoute).

---

## 2. Comment on réutilise (API — 2 fichiers JS)

### `site/js/victory-sounds.js` — pools + voix + phrases (chargé par tous les mj-XX)
```js
SoundPool.play(theme, volume)   // theme: victory | end-doux | success | error | apparition |
                                 //   collecte | deblocage | pas | grognement | ambiance-nature |
                                 //   rigolo | petit-bruit | bus | indice | oeuf | blabla
SoundPool.voice(ton, volume)    // ton: 'positif' | 'doux' — pioche voix (f/h/wex) × phrase AU HASARD, anti-répétition
SoundPool.phrase(slug, fallbackText, volume)  // MP3 de sounds/voix/phrases/, fallback TTS si absent
SoundPool.voiceLine(slug, fallbackText, vol)  // ligne nommée × 1 des 3 voix (sounds/voix/{f,h,wex}/<slug>.mp3), ex 'etoile-gagnee'
playEndSound(score, maxScore)   // fanfare de fin + voix aléatoire ~1.4s après (API historique, inchangée)
playErrorSound()                // pool 'error'
```
`SayNombres` (`js/say-nombres.js`) et `MJKit.sayPhoneme` restent séparés (vrais sous-systèmes
combinatoires) — ne PAS les fusionner dans `victory-sounds.js`. **Ne pas créer de 5e API** : tout
nouveau son d'événement passe par un pool `SoundPool`, tout nouveau mot modulable a son propre
petit module comme `say-nombres.js`.

### `site/js/dinos-audio-manifest.js` — nom parlé d'un dino
```js
playDinoNom(id, fallbackName, {then})  // joue audio/dinos/<id>-nom.mp3, fallback TTS, callback then
window.DINO_NOM_AUDIO                    // Set des 60 ids ayant un -nom.mp3
```
Le manifest est **généré** : après tout ajout de `<id>-nom.mp3`, régénérer le Set (voir en-tête du fichier).

### Hubs — nom du lieu parlé
Supprimé le 2026-09-04 : les 12 MP3 `voix/lieux/` (hubs bus/fusée index2/index3, retirés) et leur entrée catalogue `LIEUX` n'avaient plus aucun consommateur. Récupérables dans git si un futur hub parle.

**Règle d'or** : tout appel voix garde un **fallback TTS navigateur** (si le MP3 manque/ne charge pas, le jeu parle quand même).

---

## 3. Process de génération (à SUIVRE pour tout nouveau son)

1. **Vérifier le budget** : `check_subscription` MCP ElevenLabs. ~25 crédits/seconde de son. Reset mensuel (~10 du mois).
2. **Prompt en anglais** pour `text_to_sound_effects` (SFX). **Texte FR** pour `text_to_speech` (voix).
3. **Tags de ton v3** (voix) : modèle `eleven_v3` OBLIGATOIRE, `stability` 0.4 (dino) / 0.35 (réactions). Tags en tête du texte :
   - Positif : `[excited]` `[cheerfully]` `[amazed]` `[proud]` `[delighted]` `[triumphant]` `[laughing]` `[giggles]` `[gasps]`
   - Doux : `[gently]` `[softly]` `[encouraging]` `[sheepish]` `[playful]` `[warmly]` `[curious]` `[whispers]`
4. **Voix** : résoudre par rôle via voice-map.json (narrateur_h menus/dino · narrateur_f voyage/lieux · wex).
5. **Padding 250 ms OBLIGATOIRE en tête** (règle L-069) — sinon attaque coupée sur mobile/Bluetooth :
   ```bash
   ffmpeg -y -i in.mp3 -af "adelay=250:all=1" -codec:a libmp3lame -b:a 128k out.mp3
   ```
   (⚠️ le fichier temporaire doit garder l'extension `.mp3`, ex `out.pad.mp3`, sinon ffmpeg refuse le muxer.)
6. **Nommer par slug/id stable** (frontière autoring/produit dino : les jeux lisent par `id`).
7. **Brancher** via l'API ci-dessus, **garder le fallback TTS**.
8. **Tester** : harnais `npm run mj:test mj-XX` vert avant push. Commit + push (Papa Yann teste via GitHub Pages).

---

## 4. Ce qui est branché (fait)

- **Tous les mj-XX** : fin de partie = `playEndSound` → fanfare pool + voix aléatoire (3 voix × 22). Erreur = pool.
- **Dinos** : mj-24, mj-31 (nom réel + fallback), mj-28 (bouton 🔊), mj-33 (memory : flip + paire).
- **Instructions** : mj-25 (trouve-le-meme + cherche-bien→voice), mj-26 (combien + compte-encore), mj-30 (regardons-ensemble). mj-24/31 : essaie-encore→voice.
- ~~**Hubs** : index2 (6 lieux), index3 (6 planètes) parlent en narratrice~~ **CADUC** — hubs supprimés, MP3 lieux orphelins (§ 2).
- **Session 2026-07-13 (vraie voix partout)** :
  - Consignes MP3 : mj-13a (premier bus), mj-13c (indice comptage), mj-14 (2 variantes grille), mj-15 (intrus), mj-16 (suite), mj-43/44/45 (banner parlé au changement de palier UNIQUEMENT — anti-répétition, slug par palier).
  - `RegleInfo.init({slug})` : le 🔊 de la modal ❓ joue le MP3 si slug fourni (sinon TTS, comme avant).
  - mj-37 : 6 voicelines pièces (`sounds/pieces/`) — les fichiers manquants existent désormais.
  - Étoile parlée : `Golden._starFlight` → `SoundPool.voiceLine('etoile-gagnee')` à l'atterrissage.
  - Fiches dino : 9 Cénozoïque complétés (taille/régime/funfact/recap) → `DINO_AUDIO` 60/60 dans dev-dinos.html.
  - Fins silencieuses corrigées : mj-17, mj-18, mj-22, mj-39 + bug fanfare mj-42. Funfacts MP3 : mj-28, mj-33. Chaînage il-vivait-quand : mj-31. Mini-étoile : pool `apparition`.
  - Décision produit : PAS de voix « Bravo » à chaque bonne réponse (ding en cours de partie, voix à la fin).

## 4 bis. Cris de bébés dinos PAR FAMILLE (2026-07-27)

11 fichiers `site/sounds/fx/cri-bebe-<famille>.mp3` — un par famille de `DINO_FAMILLES` (`site/js/dinos-data.js`).
Générés via `text_to_sound_effects` (1,5-2 s), **paddés 250 ms** (règle L-069), tous **aigus, courts, mignons, non effrayants** (cible 4 ans) : c'est un BÉBÉ qui vient d'éclore, jamais un adulte qui rugit.

| Famille (id) | Groupe | Caractéristique sonore justifiée | Fichier |
|---|---|---|---|
| `trex` | Théropodes | Bipèdes carnivores proches des oiseaux → couinement aigu râpeux, avec juste un soupçon de grognement (le poussin de prédateur, pas le rugissement de film) | `cri-bebe-trex.mp3` |
| `cou_long` | Sauropodes | Masse énorme = résonateur long → grondement grave doux + petite montée finale, façon éléphanteau | `cri-bebe-cou_long.mp3` |
| `arme` | Thyréophores | Corps trapu, museau court, brouteur → bêlement/reniflement grave et court, type chevreau | `cri-bebe-arme.mp3` |
| `cornu` | Cératopsiens | Bec de perroquet, crâne massif → grognement rauque très court finissant en couinement | `cri-bebe-cornu.mp3` |
| `bec` | Ornithopodes (hadrosaures) | Crête creuse = **résonateur nasal** (Parasaurolophus : soufflerie testée par les paléontologues) → petit cor nasal mélodieux, deux notes montantes | `cri-bebe-bec.mp3` |
| `raptor` | Dromæosaures | Les plus proches des oiseaux (plumes) → pépiements aigus rapides, trois de suite, type poussin | `cri-bebe-raptor.mp3` |
| `pterosaures` | Ptérosaures | Cri perçant d'animal volant colonial (analogie oiseaux de mer) → petit couinement strident et fin | `cri-bebe-pterosaures.mp3` |
| `enaliosaures` | Reptiles marins | Vie aquatique → sifflement aigu type dauphin + une bulle d'eau | `cri-bebe-enaliosaures.mp3` |
| `volant` | Synapsides (avant les dinos) | Cousins des animaux à poils → miaulement/plainte douce légèrement râpeuse (pas un cri de reptile) | `cri-bebe-volant.mp3` |
| `mammiferes` | Mammifères (mégafaune) | Trompe/barrissement du mammouth mais version petit → mini-trompette chaude et courte | `cri-bebe-mammiferes.mp3` |
| `oiseaux` | Oiseaux-terreurs | Oisillon à gros bec → deux pépiements + un léger clac de bec | `cri-bebe-oiseaux.mp3` |

**Prompts** : anglais, structure « Cute baby <animal-type> : <caractéristique> , short, adorable, not scary. Single call, no music. » (prompts exacts en commentaire du présent tableau — la caractéristique de la colonne 3 est la traduction fidèle du prompt utilisé).

**Branchement** : `site/js/nid-ui.js` → `playBabyCry(dino)` dans `runHatchSequence` — joue `CRI_FAMILLE[dino.famille]`, **fallback défensif** sur les génériques `dino-bebe{,-2,-3}.mp3` si la famille est inconnue ou le MP3 absent (pas de 404 bruyant, pas d'éclosion muette).
**mj-46** (œufs) reste sur les 3 génériques — inchangé.

## 5. Ce qui reste (TODO — MAJ HO-N01 2026-09-12)

- ~~4 phrases orphelines : cest-parti, a-toi-de-jouer, encore-une-fois, ouvre-bien-les-yeux~~ →
  **FAIT HO-N01** : rattachées au pool `blabla` de `victory-sounds.js` (voix filler entre deux
  manches). Gardées, aucun jeu ne les appelle encore explicitement.
- ~~bug `quel-dino-manque.mp3` absent~~ → **CORRIGÉ HO-N01** : généré (narrateur_h, `eleven_v3`,
  padding 250 ms), vérifié à l'oreille + STT (« Quel dino manque dans la grille » — texte exact du
  point d'appel `mj-14.html`).
- ~~**Périodes (5) pas encore branchées**~~ → **FAIT** : mj-31 les joue depuis 2026-07-07 (`PERIODE_MP3`, permien → `pangee.mp3` assumé) ; grille époque de dev-dinos branchée 2026-08-10 (`playPeriodeVoice`, anti-404 via le Set `DINO_PERIODE_AUDIO` du manifest). Le voyage (dev-dinos) garde ses récits longs `recit-*.mp3` — pas de double annonce « Le Trias ! » devant.
- **Hétérogénéité de ton** : les 9 mégafaune `-nom.mp3` sont en `[excited]` (ton jeu), les 51 autres en ton fiche. Homogénéiser si gênant.
- ~~Phrases à nombre variable : restent en TTS~~ → **CADUC 2026-07-29** : banque `sounds/nombres/` (gabarits complets par nombre, décision PY 2026-07-28). Le principe « pas de Frankenstein MP3+TTS mi-phrase » reste en vigueur : un gabarit = UN MP3 entier.
- **mj-30 taille** : `-taille.mp3` = dialogue 1 dino, le jeu compare N dinos en dynamique — refonte écran révélation nécessaire, pas un branchement.
- **mj-29 dico** : mapping `racine.cle` → fichiers `dico-*.mp3` non fiable sans table dédiée (risque mauvais son dans un jeu phonétique).
- **index.html hub** : ne charge pas victory-sounds.js — pool `deblocage` non branché au hub.

## 6. Musiques de fond (HO-015 2026-09-05, nettoyée HO-N01 2026-09-12)

5 fichiers `site/sounds/music/*.mp3` (generique-v1/2/3 n'avaient jamais existé sur disque malgré la
doc précédente — retirés du tableau ; `menu-jungle-loop` et `suspense-loop` supprimés HO-N01, décision
Q2/Q6 : jamais branchés, poids récupéré). Boucles = padding 0, jingles/victoires = padding 250 ms tête.

| Fichier | Usage | Durée (ffprobe) | Prompt exact |
|---|---|---|---|
| `calme-doux-loop.mp3` | **Branché HO-N01** : fond calme type « Ghibli » de l'encyclopédie (`dev-dinos.html`, bouton 🎵, volume 0,25, jamais autoplay) | 50,0 s, boucle | *Calm, warm, gentle instrumental in a tender storybook animation style: soft piano and light flute melody with airy string pads, moderate tempo, sweet and heartfelt, cozy and soothing, instrumental, no vocals, seamless loop, ends exactly as it begins* |
| `victoire-v1.mp3` | pool `victory` | 2,25 s | *Short upbeat victory jingle, joyful 8-bit chiptune synth arpeggio rising up, classic video game win sound, bright and happy, instrumental, no vocals, no music production ambience, single musical phrase* (repli `text_to_sound_effects`, `compose_music` refuse < 3000 ms) |
| `victoire-v2.mp3` | pool `victory` | 4,3 s | *Short victory jingle, triumphant orchestral brass fanfare with cymbal crash, heroic and joyful game win sound, instrumental, no vocals* |
| `victoire-v3.mp3` | pool `victory` | 3,3 s | *Short victory jingle, playful synth arpeggio with a bouncy marimba melody, cheerful and cute game win sound, instrumental, no vocals* |
| `victoire-v4.mp3` | pool `victory` | 5,3 s | *Short victory jingle, full orchestral fanfare build with strings brass and light choir-like synth pad, grand and celebratory game win sound, instrumental, no vocals* |

Coût mesuré (génération initiale HO-015) : solde EL avant 38 325 caractères, après 40 485 (delta 2 160).

## 7. Bruitages dinos (HO-016 2026-09-05, branchés HO-N01 2026-09-12)

29 fichiers `site/sounds/fx/dino/*.mp3` restants après suppression HO-N01 des 12 doublons purs
(`oeuf-eclot-1..6`, `bebe-dino-1..6` — doublons du legacy `fx/dino-oeuf-eclot.mp3` et des
`fx/cri-bebe-<famille>.mp3` déjà branchés, décision Q1). Padding 250 ms tête sauf les 4 boucles météo.
**Branchés HO-N01** dans 3 pools nommés de `victory-sounds.js` : `pas` (8), `grognement` (8),
`ambiance-nature` (13, Parasaurolophus + météo/nature). Aucun mj ne les consomme encore — le pool
existe, prêt pour un futur jeu/ambiance (Papa Yann veut ces événements, décision Q1).

| Groupe | Fichiers · durée (ffprobe) · pool |
|---|---|
| Cris gros/petits (8) | `gros-rugissement-attaque-1` 3,25s · `gros-rugissement-attaque-2` 3,25s · `gros-rugissement-defense` 3,25s · `gros-grognement-sourd` 3,25s · `petit-cri-attaque` 2,25s · `petit-cri-defense` 2,25s · `petit-cri-curieux` 2,25s · `petit-sifflement` 2,25s — pool `grognement` |
| Parasaurolophus (6) | `para-grave-long` 4,73s · `para-grave-court` 1,73s · `para-aigu-long` 4,73s · `para-aigu-court` 1,73s · `para-alerte` 3,25s · `para-fun` 2,73s — pool `ambiance-nature` |
| Pas lourds (4) | `pas-lourd-un` 1,25s · `pas-lourd-marche` 4,73s · `pas-lourd-course` 4,73s · `pas-lourd-lointain` 5,25s — pool `pas` |
| Pas courants/lents (4) | `pas-course-petit` 4,73s · `pas-course-moyen` 4,73s · `pas-marche-lente-petit` 4,73s · `pas-marche-lente-moyen` 4,73s — pool `pas` |
| Météo & nature (7) | `tonnerre-lointain` 4,25s · `tonnerre-proche` 4,25s · `eclair-craquement` 1,73s · `pluie-loop` 5,0s (boucle) · `pluie-forte-loop` 5,0s (boucle) · `cascade-loop` 5,0s (boucle) · `vent-jungle-loop` 5,0s (boucle) — pool `ambiance-nature` |

**SUPPRIMÉS HO-N01** (doublons, décision Q1) : `bebe-dino-1..6` (doublons de `fx/cri-bebe-<famille>.mp3`,
§ 4 bis) et `oeuf-eclot-1..6` (doublons du legacy `fx/dino-oeuf-eclot.mp3`, pool `oeuf`).

Coût mesuré (génération initiale HO-016) : solde EL avant 40 485, après 41 853 (delta 1 368,
HO-015+016 cumulé 3 528 sur un budget théorique 173 048 — très loin des seuils de stop 35 000/15 000).

---

_Décisions gravées : game-pmo (pools L-077..079, règle 250ms L-069 dans rules.md), dino-pmo (noms bonus hors count fiche). Mémoire transverse : `reference_sfx_silence_padding`._
_HO-015/HO-016 (2026-09-05) : musiques de fond `site/sounds/music/` + banque bruitages dinos `site/sounds/fx/dino/`, rien de branché (tickets séparés)._
