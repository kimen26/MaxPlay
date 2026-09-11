# Couverture du catalogue

> **FICHIER GÉNÉRÉ** — `node studio/referentiel/couverture.mjs`
> Répond à : « sur tout l’audio du site, qu’est-ce qui reste à faire ? »

| | |
|---|---|
| MP3 sur le disque | **2029** |
| — enrôlés (catalogue, ou registre pour les blocs dino) | **977** |
| — pas encore enrôlés | **1052** |
| — dont orphelins assumés (hors catalogue par nature) | 0 |
| Entrées du catalogue sans fichier (à générer) | 27 |

**Enrôlé** = son texte verbatim, sa voix, son modèle et ses réglages sont au catalogue
(ou, pour les blocs de fiche dino, au registre tenu par `scan-dino.mjs` — type « bloc »
catalogué par référence), donc il est régénérable à l’identique, traduisible et vérifiable.

## Par famille

| Famille | Pôle | Sur disque | Enrôlés | Reste | Le verbatim est… |
|---|---|---|---|---|---|
| Bruitages | JEU | 108 | 67 | **41** | `prompt EN` |
| Consignes de jeu | JEU | 98 | 80 | **18** | — introuvable |
| Récits d’époque | DINO | 13 | 12 | **1** | — introuvable |
| Blocs de fiche dino *(via registre)* | DINO | 284 | 284 | ✅ | `studio/dino/content/scripts-audio/fr/V3/json/` |
| Récaps dino (concaténés) *(via registre)* | DINO | 71 | 71 | ✅ | `dérivé des 4 blocs (aucun texte propre)` |
| Dico des racines | DINO | 100 | 100 | ✅ | `studio/dino/content/sources/etymo/_DICO-RACINES-AUDIO.md` |
| Noms de dinos seuls | DINO | 70 | 70 | ✅ | `lexique i18n/lexiques-prononciation/fr.md (respellings)` |
| Accroches familles / régimes | DINO | 15 | 15 | ✅ | `studio/dino/content/scripts-audio/_ACCROCHES-MENU-FAMILLES-REGIMES.md` |
| Menus principaux dino | DINO | 3 | 3 | ✅ | `textes de repli relevés dans dev-dinos.html (MENU_VOICE)` |
| Accroches époques | DINO | 8 | 8 | ✅ | — introuvable |
| Extinction (mj-31) | DINO | 6 | 6 | ✅ | — introuvable |
| Périodes | DINO | 5 | 5 | ✅ | — introuvable |
| Réactions (f/h/wex) | JEU | 69 | 69 | ✅ | — introuvable |
| Encouragements langues invitées | JEU | 75 | 75 | ✅ | `studio/referentiel/catalogue/fr/humeur.mjs § HUMEUR_INVITEE` |
| Nombres | JEU | 75 | 75 | ✅ | — introuvable |
| Phonèmes | JEU | 21 | 21 | ✅ | — introuvable |
| Pièces d’échecs (mj-37) | JEU | 6 | 6 | ✅ | — introuvable |
| Identité sonore du hub | JEU | 10 | 10 | ✅ | `prompt EN` |

## Comment lire la dernière colonne

- **Un chemin** → le texte existe, ailleurs. L’enrôlement est **mécanique** : rattacher,
  pas réécrire. Aucun appel ElevenLabs nécessaire.
- **`— introuvable`** → le texte prononcé n’est écrit nulle part. Deux issues : écouter et
  transcrire, ou réécrire et régénérer. C’est là qu’est la vraie dette.
- ***(via registre)*** → la famille est suivie par `scan-dino.mjs` (clés `dino.<id>.<bloc>`,
  contrats, lignée script → MP3), pas par des entrées de catalogue : le type « bloc » est
  catalogué par référence.

## Non classés (992)

Fichiers qu’aucune famille ne décrit — famille à ajouter ci-dessus, ou fichiers orphelins.

- `sounds/music/calme-doux-loop.mp3`
- `sounds/music/menu-jungle-loop.mp3`
- `sounds/music/suspense-loop.mp3`
- `sounds/music/victoire-v1.mp3`
- `sounds/music/victoire-v2.mp3`
- `sounds/music/victoire-v3.mp3`
- `sounds/music/victoire-v4.mp3`
- `sounds/voix/pt-br/f/arrasou.mp3`
- `sounds/voix/pt-br/f/boa.mp3`
- `sounds/voix/pt-br/f/isso-ai.mp3`
- `sounds/voix/pt-br/f/muito-bem.mp3`
- `sounds/voix/pt-br/f/que-legal.mp3`
- `sounds/voix/pt-br/h/arrasou.mp3`
- `sounds/voix/pt-br/h/boa.mp3`
- `sounds/voix/pt-br/h/isso-ai.mp3`
- `sounds/voix/pt-br/h/muito-bem.mp3`
- `sounds/voix/pt-br/h/que-legal.mp3`
- `sounds/voix/pt-br/wex/arrasou.mp3`
- `sounds/voix/pt-br/wex/boa.mp3`
- `sounds/voix/pt-br/wex/isso-ai.mp3`
- `sounds/voix/pt-br/wex/muito-bem.mp3`
- `sounds/voix/pt-br/wex/que-legal.mp3`
- `audio/dinos/ar/noms/aenocyon.mp3`
- `audio/dinos/ar/noms/albertosaurus.mp3`
- `audio/dinos/ar/noms/allosaurus.mp3`
- `audio/dinos/ar/noms/amargasaurus.mp3`
- `audio/dinos/ar/noms/ankylosaurus.mp3`
- `audio/dinos/ar/noms/apatosaurus.mp3`
- `audio/dinos/ar/noms/archaeopteryx.mp3`
- `audio/dinos/ar/noms/archelon.mp3`

_… et 962 autres._

---

_Rien ici n’oblige à générer quoi que ce soit. C’est un état, consultable à tout moment :_
_on relance ce qu’on veut, quand on veut, selon le budget. Le plan des appels est dans_
_[`_PLAN-GENERATION.md`](_PLAN-GENERATION.md)._
