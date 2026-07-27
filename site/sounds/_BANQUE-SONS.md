# 🔊 Banque de sons MaxPlay — carte + mode d'emploi

> Source de vérité du système sonore du site. Créé 2026-07-06 (session refonte audio).
> **Avant de générer un son : lire ce fichier.** Avant de coder un son dans un jeu : lire § API.

---

## 1. Où c'est stocké (277 fichiers, tous MP3)

| Dossier | Contenu | Voix | Généré via |
|---|---|---|---|
| `site/sounds/ui/` (10) | identité hub « Ligne de Max » : moteur-bus, klaxon, porte-bus, tap, fanfare-victoire, etoile, deblocage, ambiance-nuit (loop), voyage-temps, veilleuse | SFX | `text_to_sound_effects` |
| `site/sounds/fx/` | catalogue général : victoires, rigolo (prout…), dinos (rugissements), **cris de bébés par famille `cri-bebe-*` (§ 4 bis)**, animaux, véhicules, instruments, pièces, espace, divers | SFX | `text_to_sound_effects` |
| `site/sounds/voix/f/` (22) | réactions Narratrice — 16 positives + 6 douces (super, bravo, oups, presque…) | narrateur_f | `text_to_speech` |
| `site/sounds/voix/h/` (22) | réactions Narrateur — idem | narrateur_h | `text_to_speech` |
| `site/sounds/voix/wex/` (22) | réactions Wex — idem | wex | `text_to_speech` |
| `site/sounds/voix/lieux/` (12) | noms des lieux des 2 hubs : `bus-<zone>.mp3` + `fusee-<zone>.mp3` (dodo, garage, lettres, monde, dinos, roulotte) | narrateur_f | `text_to_speech` |
| `site/sounds/voix/phrases/` (28) | instructions fixes des jeux : trouve-le-meme-dino, combien-de-dinos, compte-encore, regardons-ensemble, il-vivait-quand, cest-parti, a-toi-de-jouer, cherche-bien, encore-une-fois, ouvre-bien-les-yeux + banque consignes 2026-07-13 (quel-bus-arrive-en-premier, qu-est-ce-qui-vient-ensuite, lequel-ne-va-pas, quel-bus-manque, qu-est-ce-qui-manque, compte-les-un-par-un, remplis-chaque-caisse, range-dans-la-bonne-boite, ecoute-le-premier-son, fais-monter-les-passagers, range-les-des, regroupe-les-points, gros-niveau-regroupe, mode-libre-encore-une-caisse, premier-son-l-ou-r, le-son-quon-entend, il-en-faut-beaucoup, terminus-fais-les-descendre) | narrateur_h | `text_to_speech` |
| `site/sounds/pieces/` (6) | voicelines intro pièces échecs mj-37 : fou/tour/cavalier/dame/roi/pion `-intro.mp3` | narrateur_h | `text_to_speech` |
| `site/sounds/voix/{f,h,wex}/etoile-gagnee.mp3` (3) | félicitation d'étoile parlée (« Tu as gagné une étoile ! »), jouée par `SoundPool.voiceLine` à l'atterrissage de l'étoile Golden | 3 voix | `text_to_speech` |
| `site/audio/dinos/periodes/` (5) | trias, jurassique, cretace, cenozoique, pangee | narrateur_h | `text_to_speech` |
| `site/audio/dinos/noms/` (60) | vocal du nom de chaque dino, `<id>.mp3` (ton `[excited]`, usage jeux) | narrateur_h | `text_to_speech` |
| `site/audio/dinos/<id>-nom.mp3` (60) | copies à plat consommées par les MJ via le manifest (voir § API dinos) | narrateur_h | copie de noms/ + segments fiche antérieurs |

Voix résolues via `studio/narration/personnages/voix-meta/voice-map.json` (jamais hardcoder un voice_id).

**Page d'écoute** : `site/dev-sounds-ui.html` (toutes les catégories, tap = écoute).

---

## 2. Comment on réutilise (API — 2 fichiers JS)

### `site/js/victory-sounds.js` — pools + voix + phrases (chargé par tous les mj-XX)
```js
SoundPool.play(theme, volume)   // theme: victory | end-doux | success | error | apparition | collecte | deblocage
SoundPool.voice(ton, volume)    // ton: 'positif' | 'doux' — pioche voix (f/h/wex) × phrase AU HASARD, anti-répétition
SoundPool.phrase(slug, fallbackText, volume)  // MP3 de sounds/voix/phrases/, fallback TTS si absent
SoundPool.voiceLine(slug, fallbackText, vol)  // ligne nommée × 1 des 3 voix (sounds/voix/{f,h,wex}/<slug>.mp3), ex 'etoile-gagnee'
playEndSound(score, maxScore)   // fanfare de fin + voix aléatoire ~1.4s après (API historique, inchangée)
playErrorSound()                // pool 'error'
```

### `site/js/dinos-audio-manifest.js` — nom parlé d'un dino
```js
playDinoNom(id, fallbackName, {then})  // joue audio/dinos/<id>-nom.mp3, fallback TTS, callback then
window.DINO_NOM_AUDIO                    // Set des 60 ids ayant un -nom.mp3
```
Le manifest est **généré** : après tout ajout de `<id>-nom.mp3`, régénérer le Set (voir en-tête du fichier).

### Hubs (index2/index3) — nom du lieu parlé
Fonction locale `speakLieu(zone, txt)` : joue `sounds/voix/lieux/{bus|fusee}-<zone>.mp3`, fallback `speak()` TTS.

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
- **Hubs** : index2 (6 lieux), index3 (6 planètes) parlent en narratrice.
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

## 5. Ce qui reste (TODO — MAJ 2026-07-13 session « vraie voix partout »)

- **4 phrases orphelines restantes** : cest-parti, a-toi-de-jouer, encore-une-fois, ouvre-bien-les-yeux — points d'usage = décision produit Papa Yann (cherche-bien branchée mj-22).
- **Périodes (5) pas encore branchées** dans le voyage/la frise (mj-31 dit le nom du dino, pas encore « Le Jurassique ! ») — assets prêts dans `audio/dinos/periodes/`.
- **Hétérogénéité de ton** : les 9 mégafaune `-nom.mp3` sont en `[excited]` (ton jeu), les 51 autres en ton fiche. Homogénéiser si gênant.
- **Phrases à nombre variable** ("Il y avait 4 dinos") : restent en TTS (non préenregistrables) — assumé. Idem gabarits « Trouve le bus 38 » (pas de Frankenstein MP3+TTS mi-phrase, décision 2026-07-13).
- **mj-30 taille** : `-taille.mp3` = dialogue 1 dino, le jeu compare N dinos en dynamique — refonte écran révélation nécessaire, pas un branchement.
- **mj-29 dico** : mapping `racine.cle` → fichiers `dico-*.mp3` non fiable sans table dédiée (risque mauvais son dans un jeu phonétique).
- **index.html hub** : ne charge pas victory-sounds.js — pool `deblocage` non branché au hub.

---

_Décisions gravées : game-pmo (pools L-077..079, règle 250ms L-069 dans rules.md), dino-pmo (noms bonus hors count fiche). Mémoire transverse : `reference_sfx_silence_padding`._
