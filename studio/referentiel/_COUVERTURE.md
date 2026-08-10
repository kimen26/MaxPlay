# Couverture du catalogue

> **FICHIER GÉNÉRÉ** — `node studio/referentiel/couverture.mjs`
> Répond à : « sur tout l’audio du site, qu’est-ce qui reste à faire ? »

| | |
|---|---|
| MP3 sur le disque | **981** |
| — enrôlés au catalogue | **225** |
| — pas encore enrôlés | **756** |
| Entrées du catalogue sans fichier (à générer) | 24 |

**Enrôlé** = son texte verbatim, sa voix, son modèle et ses réglages sont au catalogue,
donc il est régénérable à l’identique, traduisible et vérifiable.

## Par famille

| Famille | Pôle | Sur disque | Enrôlés | Reste | Le verbatim est… |
|---|---|---|---|---|---|
| Blocs de fiche dino | DINO | 281 | 0 | **281** | `studio/dino/content/scripts-audio/fr/V3/json/` |
| Dico des racines | DINO | 100 | 0 | **100** | `studio/dino/content/sources/etymo/_DICO-RACINES-AUDIO.md` |
| Nombres | JEU | 75 | 0 | **75** | — introuvable |
| Récaps dino (concaténés) | DINO | 70 | 0 | **70** | `dérivé des 4 blocs (aucun texte propre)` |
| Noms de dinos seuls | DINO | 70 | 0 | **70** | `lexique i18n/lexiques-prononciation/fr.md (respellings)` |
| Bruitages | JEU | 67 | 0 | **67** | `prompt EN` |
| Phonèmes | JEU | 21 | 0 | **21** | — introuvable |
| Accroches familles / régimes | DINO | 15 | 0 | **15** | `studio/dino/content/scripts-audio/_ACCROCHES-MENU-FAMILLES-REGIMES.md` |
| Accroches époques | DINO | 8 | 0 | **8** | — introuvable |
| Récits d’époque | DINO | 8 | 0 | **8** | — introuvable |
| Extinction (mj-31) | DINO | 6 | 0 | **6** | — introuvable |
| Pièces d’échecs (mj-37) | JEU | 6 | 0 | **6** | — introuvable |
| Périodes | DINO | 5 | 0 | **5** | — introuvable |
| Réactions (f/h/wex) | JEU | 69 | 69 | ✅ | — introuvable |
| Encouragements langues invitées | JEU | 90 | 90 | ✅ | `studio/referentiel/catalogue/fr/humeur.mjs § HUMEUR_INVITEE` |
| Consignes de jeu | JEU | 44 | 44 | ✅ | — introuvable |
| Noms de lieux | JEU | 12 | 12 | ✅ | — introuvable |
| Identité sonore du hub | JEU | 10 | 10 | ✅ | `prompt EN` |

## Comment lire la dernière colonne

- **Un chemin** → le texte existe, ailleurs. L’enrôlement est **mécanique** : rattacher,
  pas réécrire. Aucun appel ElevenLabs nécessaire.
- **`— introuvable`** → le texte prononcé n’est écrit nulle part. Deux issues : écouter et
  transcrire, ou réécrire et régénérer. C’est là qu’est la vraie dette.

## Non classés (24)

Fichiers qu’aucune famille ne décrit — famille à ajouter ci-dessus, ou fichiers orphelins.

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
- `audio/dinos/fr/menu-accueil.mp3`
- `audio/dinos/fr/menu-familles.mp3`
- `audio/dinos/fr/menu-voyage.mp3`
- `audio/dinos/fr/packets/pkt-00.mp3`

---

_Rien ici n’oblige à générer quoi que ce soit. C’est un état, consultable à tout moment :_
_on relance ce qu’on veut, quand on veut, selon le budget. Le plan des appels est dans_
_[`_PLAN-GENERATION.md`](_PLAN-GENERATION.md)._
