# HO-015 — Musiques de fond (Eleven Music)

**Statut :** pret
**Depend de :** — (indépendant des fiches ; partage le budget EL → mesurer le coût AVANT de batcher)
**Exécutant :** 1 sous-agent Sonnet avec les outils MCP `elevenlabs` (compose_music, text_to_sound_effects, check_subscription).

## Objectif

Des musiques réutilisables par toute l'app (Encyclopédie + Mini-jeux), rangées dans `site/sounds/music/`, documentées
dans `site/sounds/_BANQUE-SONS.md`. Aucun branchement dans un jeu (ticket séparé).

## Livrables (fichiers MP3, 44.1 kHz 128 kbps)

| Fichier | Brief Papa Yann | Durée |
|---|---|---|
| `menu-jungle-loop.mp3` | ambiance jungle/forêt du temps des dinos (insectes, oiseaux lointains, feuillage) + quelques notes de harpe discrètes, bouclable | 40-60 s, boucle sans couture |
| `calme-doux-loop.mp3` | « un peu style Ghibli » : calme, doux, entraînant — piano/flûte/cordes légères, tempo modéré, tendre, sans référence à une œuvre existante | 40-60 s, boucle |
| `generique-v1.mp3` / `-v2` / `-v3` | générique : court, dynamique, sympa, qui reste en tête — 3 variantes différentes (instrumentation/tempo) | 3-5 s |
| `suspense-loop.mp3` | suspense / peur qui grandit, JAMAIS fort (enfant de 4 ans) : nappe grave, pulsation lente, montée douce | 40-60 s, boucle |
| `victoire-v1..v4.mp3` | musique de victoire : 4 variantes, esprit fanfare de jeu vidéo (jingle joyeux, cuivres/synth 8-bit/orchestre) SANS reproduire une mélodie existante | de 1-2 s à 4-5 s |

Pas de paroles. Pas de nom d'œuvre/franchise dans les prompts (on décrit le style, on ne cite pas Ghibli/FF7/Mario/Zelda
au générateur — mélodies originales uniquement, droits).

## Méthode

1. `check_subscription` → solde avant.
2. Générer UNE musique (la jungle, 45 s) → `check_subscription` → coût mesuré. Extrapoler le total des 11 fichiers.
   **Si total projeté > 35 000 crédits : STOP, rapport à l'orchestrateur avec le chiffre, ne pas continuer.**
3. Sinon générer le reste. Pour les jingles 3-5 s : `compose_music` avec `music_length_ms` (si le minimum de l'API est
   trop haut, replier sur `text_to_sound_effects` avec un prompt musical « short upbeat victory jingle, orchestral, no voice » 3-5 s).
4. Boucles : demander « seamless loop » dans le prompt ; vérifier à l'oreille le raccord fin→début (ffmpeg : concat du fichier
   avec lui-même et écoute du point de jonction). Pas de padding sur les boucles.
5. Jingles/victoires : padding 250 ms en tête (`ffmpeg -af "adelay=250:all=1"`), règle `.claude/rules/sons.md`.
6. Sortie dans le scratchpad puis copie vers `site/sounds/music/`. `ffprobe` sur chaque fichier (durée, débit).
7. Documenter dans `site/sounds/_BANQUE-SONS.md` : nouvelle ligne `site/sounds/music/` dans la table § 1 + une sous-section
   « Musiques » avec fichier · usage prévu · durée · prompt exact utilisé.

## Fichiers autorisés

`site/sounds/music/**` (créer) · `site/sounds/_BANQUE-SONS.md` (ajouter, ne rien supprimer) · scratchpad.

## Hors périmètre

Tout branchement dans un jeu ou dans `dev-dinos.html`, tout autre dossier de sons, les voix.

## Rapport attendu

Solde EL avant/après et coût par fichier, tableau fichier · durée ffprobe · prompt, ce qui n'a pas marché (et pourquoi),
ta recommandation d'écoute pour Papa Yann (quels fichiers écouter en premier).
