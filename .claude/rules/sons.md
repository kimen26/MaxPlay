---
paths:
  - "site/sounds/**"
  - "site/audio/**"
  - "site/js/victory-sounds.js"
  - "site/js/say-nombres.js"
  - "site/js/sounds.js"
  - "site/js/dinos-audio-manifest.js"
  - "studio/referentiel/**"
---

# Sons du site — règles auto-chargées

> Chargé dès que Claude touche un son du site, un script qui en joue, ou le référentiel de contenu.
> Créé 2026-08-10 : la carte de la banque existait depuis le 2026-07-06 mais **rien ne la rendait
> inratable** — un audit du contenu sonore est passé complètement à côté et a conclu à tort que
> 109 fichiers de voix n'avaient aucune source documentée.
>
> **Où lire quoi** : ce fichier = règles dures · [`site/sounds/_BANQUE-SONS.md`](../../site/sounds/_BANQUE-SONS.md)
> = inventaire + API + process · [`studio/referentiel/`](../../studio/referentiel/README.md) =
> contrats, lignée, dérive, plan EL (architecture) · `_ETAT-CONTENU.md` / `_COUVERTURE.md` /
> `_PLAN-GENERATION.md` = tableaux de bord **générés** (ne pas éditer).

## ⛔ AVANT DE GÉNÉRER, BRANCHER OU AUDITER UN SON — LIRE D'ABORD

**[`site/sounds/_BANQUE-SONS.md`](../../site/sounds/_BANQUE-SONS.md) est la SOURCE DE VÉRITÉ du système sonore.**

Il contient, et c'est le seul endroit où ils vivent ensemble :

- la **carte des dossiers** (`ui/`, `fx/`, `voix/{f,h,wex,lieux,phrases}/`, `nombres/`, `phonemes/`, `pieces/`, `audio/dinos/…`) avec le rôle, la voix et la méthode de génération de chacun ;
- l'**API** à utiliser — `SoundPool.play / voice / phrase / voiceLine`, `playEndSound`, `SayNombres`, `MJKit.sayPhoneme`, `playDinoNom` — et **jamais** un `new Audio()` à la main pour un son qui a déjà son API ;
- le **process de génération en 8 étapes** (budget, prompt EN pour les SFX / texte FR pour les voix, tags v3, résolution de la voix par rôle, **padding 250 ms obligatoire**, nommage par slug stable, branchement avec repli, test) ;
- ce qui est **déjà branché** et ce qui ne l'est pas.

Ne jamais répondre « ce son n'existe pas » ou « ce fichier n'a pas de source » sans l'avoir ouvert.

## Règles dures

- 🔒 **Padding 250 ms en tête de tout MP3 court** (`ffmpeg -af "adelay=250:all=1"`) — sinon l'attaque est coupée sur mobile et en Bluetooth.
- 🔒 **Voix résolue par rôle** via [`voice-map.json`](../../studio/narration/personnages/voix-meta/voice-map.json). Jamais de `voice_id` en dur.
- 🔒 **Repli TTS systématique** : tout appel voix garde un repli navigateur, pour que le jeu parle même si le MP3 manque. ⚠️ Le texte de repli **n'est pas** le texte du MP3 — il ne se déclenche que si le MP3 échoue. Ne jamais s'y fier pour savoir ce que l'enfant entend réellement (incident 2026-08-10 : la 3e étoile passait `'Tu maîtrises ce jeu !'` en repli alors que le MP3 joué dit « Tu as gagné une étoile ! »).
- 🔒 **Jamais d'assemblage mot à mot** d'une phrase à partir de mots isolés (décision Papa Yann 2026-07-28) — on pré-génère des **gabarits complets**. L'i18n durcit la règle : l'ordre des mots et les accords de pluriel changent selon la langue.
- 🔒 **Modèle `eleven_v3`** pour les voix, `stability` 0,4 (dino) / 0,35 (réactions).

## Typologie du contenu sonore (2026-08-10)

Un son n'a pas toujours de texte, ni d'équivalent ElevenLabs, ni de traduction — 5 types (bruitage, réserve d'humeur, réplique fixe, atome composable, bloc narré), chacun sa forme de contrat et de traduction. Détail complet + modèle i18n (~20 langues, la langue est une **dimension** et non une colonne) :
[`studio/referentiel/docs/ARCHI-REFERENTIEL-CONTENU.md`](../../studio/referentiel/docs/ARCHI-REFERENTIEL-CONTENU.md).

## Suivi de la dérive

[`studio/referentiel/`](../../studio/referentiel/README.md) recense les contenus, leurs contrats et leur
lignée, et signale quand un canal ne dit plus la même chose que la source.
Régénérer : `node studio/referentiel/build.mjs` · tableau de bord : `studio/referentiel/_ETAT-CONTENU.md`.

---

_Créé 2026-08-10 après le constat qu'un fichier de référence peut exister depuis un mois et rester invisible : sans rule path-scopée, il n'est lu que par qui le connaît déjà._
