# Couverture du catalogue

> **FICHIER GÉNÉRÉ** — `node studio/referentiel/couverture.mjs`
> Répond à : « sur tout l’audio du site, qu’est-ce qui reste à faire ? »

| | |
|---|---|
| MP3 sur le disque | **2409** |
| — enrôlés (catalogue, ou registre pour les blocs dino) | **1026** |
| — pas encore enrôlés | **1383** |
| — dont orphelins assumés (hors catalogue par nature) | 0 |
| Entrées du catalogue sans fichier (à générer) | 26 |

**Enrôlé** = son texte verbatim, sa voix, son modèle et ses réglages sont au catalogue
(ou, pour les blocs de fiche dino, au registre tenu par `scan-dino.mjs` — type « bloc »
catalogué par référence), donc il est régénérable à l’identique, traduisible et vérifiable.

## Par famille

| Famille | Pôle | Sur disque | Enrôlés | Reste | Le verbatim est… |
|---|---|---|---|---|---|
| Récits d’époque | DINO | 13 | 12 | **1** | — introuvable |
| Périodes | DINO | 6 | 5 | **1** | — introuvable |
| Consignes de jeu | JEU | 90 | 89 | **1** | — introuvable |
| Blocs de fiche dino *(via registre)* | DINO | 284 | 284 | ✅ | `studio/dino/content/scripts-audio/fr/V3/json/` |
| Récaps dino (concaténés) *(via registre)* | DINO | 71 | 71 | ✅ | `dérivé des 4 blocs (aucun texte propre)` |
| Dico des racines | DINO | 100 | 100 | ✅ | `studio/dino/content/sources/etymo/_DICO-RACINES-AUDIO.md` |
| Noms de dinos seuls | DINO | 71 | 71 | ✅ | `lexique i18n/lexiques-prononciation/fr.md (respellings)` |
| Accroches familles / régimes | DINO | 15 | 15 | ✅ | `studio/dino/content/scripts-audio/_ACCROCHES-MENU-FAMILLES-REGIMES.md` |
| Menus principaux dino | DINO | 3 | 3 | ✅ | `textes de repli relevés dans dev-dinos.html (MENU_VOICE)` |
| Accroches époques | DINO | 8 | 8 | ✅ | — introuvable |
| Extinction (mj-31) | DINO | 6 | 6 | ✅ | — introuvable |
| Réactions (f/h/wex) | JEU | 69 | 69 | ✅ | — introuvable |
| Encouragements langues invitées | JEU | 107 | 107 | ✅ | `studio/referentiel/catalogue/fr/humeur.mjs § HUMEUR_INVITEE` |
| Nombres | JEU | 75 | 75 | ✅ | — introuvable |
| Phonèmes | JEU | 21 | 21 | ✅ | — introuvable |
| Identité sonore du hub | JEU | 10 | 10 | ✅ | `prompt EN` |
| Bruitages | JEU | 80 | 80 | ✅ | `prompt EN` |

## Comment lire la dernière colonne

- **Un chemin** → le texte existe, ailleurs. L’enrôlement est **mécanique** : rattacher,
  pas réécrire. Aucun appel ElevenLabs nécessaire.
- **`— introuvable`** → le texte prononcé n’est écrit nulle part. Deux issues : écouter et
  transcrire, ou réécrire et régénérer. C’est là qu’est la vraie dette.
- ***(via registre)*** → la famille est suivie par `scan-dino.mjs` (clés `dino.<id>.<bloc>`,
  contrats, lignée script → MP3), pas par des entrées de catalogue : le type « bloc » est
  catalogué par référence.

## Non classés (1380)

Fichiers qu’aucune famille ne décrit — famille à ajouter ci-dessus, ou fichiers orphelins.

- `sounds/music/calme-doux-loop.mp3`
- `sounds/music/chansons/ceratopsiens-contre-theropodes.mp3`
- `sounds/music/chansons/dino-dinosaures.mp3`
- `sounds/music/chansons/la-grande-bataille-des-dinosaures.mp3`
- `sounds/music/chansons/les-dinos-dansent-la-samba.mp3`
- `sounds/music/chansons/les-dinos-dansent-le-funk.mp3`
- `sounds/music/victoire-v1.mp3`
- `sounds/music/victoire-v2.mp3`
- `sounds/music/victoire-v3.mp3`
- `sounds/music/victoire-v4.mp3`
- `sounds/voix/fr/titres/mj-06.mp3`
- `sounds/voix/fr/titres/mj-09.mp3`
- `sounds/voix/fr/titres/mj-13a.mp3`
- `sounds/voix/fr/titres/mj-13c.mp3`
- `sounds/voix/fr/titres/mj-14.mp3`
- `sounds/voix/fr/titres/mj-15.mp3`
- `sounds/voix/fr/titres/mj-18.mp3`
- `sounds/voix/fr/titres/mj-19.mp3`
- `sounds/voix/fr/titres/mj-20.mp3`
- `sounds/voix/fr/titres/mj-21.mp3`
- `sounds/voix/fr/titres/mj-22.mp3`
- `sounds/voix/fr/titres/mj-24.mp3`
- `sounds/voix/fr/titres/mj-28.mp3`
- `sounds/voix/fr/titres/mj-30.mp3`
- `sounds/voix/fr/titres/mj-31.mp3`
- `sounds/voix/fr/titres/mj-32.mp3`
- `sounds/voix/fr/titres/mj-34.mp3`
- `sounds/voix/fr/titres/mj-35.mp3`
- `sounds/voix/fr/titres/mj-39.mp3`
- `sounds/voix/fr/titres/mj-46.mp3`

_… et 1350 autres._

---

_Rien ici n’oblige à générer quoi que ce soit. C’est un état, consultable à tout moment :_
_on relance ce qu’on veut, quand on veut, selon le budget. Le plan des appels est dans_
_[`_PLAN-GENERATION.md`](_PLAN-GENERATION.md)._
