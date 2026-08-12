# Couverture du catalogue

> **FICHIER GÉNÉRÉ** — `node studio/referentiel/couverture.mjs`
> Répond à : « sur tout l’audio du site, qu’est-ce qui reste à faire ? »

| | |
|---|---|
| MP3 sur le disque | **1010** |
| — enrôlés (catalogue, ou registre pour les blocs dino) | **990** |
| — pas encore enrôlés | **20** |
| — dont orphelins assumés (hors catalogue par nature) | 20 |
| Entrées du catalogue sans fichier (à générer) | 49 |

**Enrôlé** = son texte verbatim, sa voix, son modèle et ses réglages sont au catalogue
(ou, pour les blocs de fiche dino, au registre tenu par `scan-dino.mjs` — type « bloc »
catalogué par référence), donc il est régénérable à l’identique, traduisible et vérifiable.

## Par famille

| Famille | Pôle | Sur disque | Enrôlés | Reste | Le verbatim est… |
|---|---|---|---|---|---|
| Blocs de fiche dino *(via registre)* | DINO | 280 | 280 | ✅ | `studio/dino/content/scripts-audio/fr/V3/json/` |
| Récaps dino (concaténés) *(via registre)* | DINO | 70 | 70 | ✅ | `dérivé des 4 blocs (aucun texte propre)` |
| Dico des racines | DINO | 100 | 100 | ✅ | `studio/dino/content/sources/etymo/_DICO-RACINES-AUDIO.md` |
| Noms de dinos seuls | DINO | 70 | 70 | ✅ | `lexique i18n/lexiques-prononciation/fr.md (respellings)` |
| Accroches familles / régimes | DINO | 15 | 15 | ✅ | `studio/dino/content/scripts-audio/_ACCROCHES-MENU-FAMILLES-REGIMES.md` |
| Menus principaux dino | DINO | 4 | 4 | ✅ | `textes de repli relevés dans dev-dinos.html (MENU_VOICE)` |
| Accroches époques | DINO | 8 | 8 | ✅ | — introuvable |
| Récits d’époque | DINO | 8 | 8 | ✅ | — introuvable |
| Extinction (mj-31) | DINO | 6 | 6 | ✅ | — introuvable |
| Périodes | DINO | 5 | 5 | ✅ | — introuvable |
| Réactions (f/h/wex) | JEU | 69 | 69 | ✅ | — introuvable |
| Encouragements langues invitées | JEU | 90 | 90 | ✅ | `studio/referentiel/catalogue/fr/humeur.mjs § HUMEUR_INVITEE` |
| Consignes de jeu | JEU | 74 | 74 | ✅ | — introuvable |
| Noms de lieux | JEU | 12 | 12 | ✅ | — introuvable |
| Nombres | JEU | 75 | 75 | ✅ | — introuvable |
| Phonèmes | JEU | 21 | 21 | ✅ | — introuvable |
| Pièces d’échecs (mj-37) | JEU | 6 | 6 | ✅ | — introuvable |
| Identité sonore du hub | JEU | 10 | 10 | ✅ | `prompt EN` |
| Bruitages | JEU | 67 | 67 | ✅ | `prompt EN` |

## Comment lire la dernière colonne

- **Un chemin** → le texte existe, ailleurs. L’enrôlement est **mécanique** : rattacher,
  pas réécrire. Aucun appel ElevenLabs nécessaire.
- **`— introuvable`** → le texte prononcé n’est écrit nulle part. Deux issues : écouter et
  transcrire, ou réécrire et régénérer. C’est là qu’est la vraie dette.
- ***(via registre)*** → la famille est suivie par `scan-dino.mjs` (clés `dino.<id>.<bloc>`,
  contrats, lignée script → MP3), pas par des entrées de catalogue : le type « bloc » est
  catalogué par référence.

## Orphelins assumés (20)

Sons tiers « cultes » conservés tels quels (Mario, Zelda, Pokémon, jingles SNCF/RATP,
freesound…) : ni régénérables via ElevenLabs, ni traduisibles, ni à réécrire. Le catalogue
n’a rien à décider pour eux — **ils n’y entreront pas**, c’est voulu. Certains restent
branchés (pools de `victory-sounds.js`), d’autres dorment.

- `sounds/among-us-role-reveal-sound.mp3`
- `sounds/ff7_victory.mp3`
- `sounds/freesound_community-bus-doors-sound-effect-44034.mp3`
- `sounds/freesound_community-bus-pop-85054.mp3`
- `sounds/Gagné.mp3`
- `sounds/honk-sound.mp3`
- `sounds/mario coin hit.mp3`
- `sounds/maro-jump-sound-effect_1.mp3`
- `sounds/motus-boule-noire_cTY2JG4.mp3`
- `sounds/perdu.mp3`
- `sounds/perfect-fart.mp3`
- `sounds/pew.mp3`
- `sounds/pikachu_mw38Ry2.mp3`
- `sounds/pikachu_scream.mp3`
- `sounds/pokemon lvl up.mp3`
- `sounds/ratp-jingle.mp3`
- `sounds/sncf-france-jingle.mp3`
- `sounds/super-mario-coin-sound.mp3`
- `sounds/victory-mario-series-hq-super-smash-bros.mp3`
- `sounds/zelda-tresor.mp3`

---

_Rien ici n’oblige à générer quoi que ce soit. C’est un état, consultable à tout moment :_
_on relance ce qu’on veut, quand on veut, selon le budget. Le plan des appels est dans_
_[`_PLAN-GENERATION.md`](_PLAN-GENERATION.md)._
