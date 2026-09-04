# HO-016 — Banque de bruitages dinos (text_to_sound_effects)

**Statut :** fait (2026-09-05, 41/41)
**Depend de :** — (partage le budget EL avec HO-015 : le même exécutant enchaîne HO-015 puis HO-016, coût mesuré)
**Exécutant :** 1 sous-agent Sonnet avec les outils MCP `elevenlabs`.

## Objectif

41 bruitages dinos rangés dans `site/sounds/fx/dino/` (sous-dossier neuf : les `fx/dino-*.mp3` et `fx/cri-bebe-*` existants
restent en place), documentés dans `_BANQUE-SONS.md`. Aucun branchement.

## Liste (nom de fichier · brief · durée)

**Cris — gros / petits, agressifs / défensifs (8)**
`gros-rugissement-attaque-1` `gros-rugissement-attaque-2` (2 timbres) · `gros-rugissement-defense` · `gros-grognement-sourd` ·
`petit-cri-attaque` · `petit-cri-defense` · `petit-cri-curieux` · `petit-sifflement` — 2-4 s.

**Parasaurolophus (6)** — son de crête, type trombone/cor grave : `para-grave-long` (4-5 s) · `para-grave-court` (1-2 s) ·
`para-aigu-long` · `para-aigu-court` · `para-alerte` (appel bref répété ×2-3) · `para-fun` (petit air rigolo, 3 notes).

**Bébés (6)** — `bebe-dino-1` … `bebe-dino-6` : pépiements/couinements variés (curieux, affamé, content, endormi, surpris, appel maman), 1-3 s, jamais effrayant.

**Pas lourds (4)** — `pas-lourd-un` (un seul BOUM, 1 s) · `pas-lourd-marche` (3-4 pas lents, 4-5 s) · `pas-lourd-course` (série rapide, 4-5 s) · `pas-lourd-lointain` (sourd, 5 s).

**Pas courants / lents (4)** — `pas-course-petit` · `pas-course-moyen` · `pas-marche-lente-petit` · `pas-marche-lente-moyen` — 4-5 s, sol de terre/feuilles.

**Météo & nature (7)** — `tonnerre-lointain` · `tonnerre-proche` · `eclair-craquement` (bref) · `pluie-loop` (loop) · `pluie-forte-loop` (loop) ·
`cascade-loop` (loop) · `vent-jungle-loop` (loop) — boucles 5 s avec `loop: true`, les autres 2-5 s.

**Œufs qui éclosent (6)** — `oeuf-eclot-1` … `oeuf-eclot-6` : craquements de coquille, variés (lent, rapide, gros œuf, petit œuf, avec pépiement, avec « pop »), 2-4 s.

Total attendu : 41 fichiers (8+6+6+4+4+7+6 — le « 47 » initial était une erreur d'addition).

## Méthode

1. `check_subscription` avant. Générer 1 fichier → mesurer → extrapoler. **Si > 15 000 crédits projetés : STOP et rapport.**
2. Prompts en ANGLAIS, structure de la banque : « <what>, <character>, <context>, single sound, no music, no voice ».
   Enfant de 4 ans : rien d'effrayant même sur « attaque » (puissant oui, gore non).
3. `text_to_sound_effects` : `duration_seconds` explicite, `loop: true` pour les 4 boucles.
4. Post : padding 250 ms en tête pour tout fichier NON-boucle (`ffmpeg -af "adelay=250:all=1"`). Boucles : aucun padding.
5. `ffprobe` chaque fichier. Nommage exact ci-dessus, `.mp3`.
6. Documenter dans `_BANQUE-SONS.md` (ligne `fx/dino/` dans § 1 + sous-section avec fichier · brief · durée · prompt exact).

## Fichiers autorisés

`site/sounds/fx/dino/**` (créer) · `site/sounds/_BANQUE-SONS.md` (ajouter) · scratchpad.

## Hors périmètre

Branchement dans un jeu, les fichiers `fx/` existants, les voix, `site/sounds/music/` (HO-015).

## Rapport attendu

Solde avant/après, coût moyen par fichier, tableau 47 lignes (fichier · durée · OK/KO), les prompts qui ont dû être refaits.
