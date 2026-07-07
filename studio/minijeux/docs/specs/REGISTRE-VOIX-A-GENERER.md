# Registre des voix à générer (ElevenLabs) — dès retour du quota (~11/07/2026)

> Consolidé le 2026-07-07 (demande Papa Yann : "note les voix dont on a besoin").
> Process : batch unique à la réouverture du quota, padding 250 ms en tête obligatoire (règle SFX, ffmpeg adelay), rangement `site/sounds/` ou `site/audio/dinos/` selon domaine.

## 1. Pièces d'échecs mj-37 (personnalités — PRIORITÉ, demande explicite "avec les voix et les tags ça peut être rigolo")

Structure déjà branchée dans mj-37.html (`PIECE_VOICELINES`, boutons 🔊 silencieux en attente). Fichiers attendus `site/sounds/pieces/<piece>-intro.mp3` :

| Pièce | Caractère | Ligne d'intro (à affiner avec tags v3) |
|---|---|---|
| fou | espiègle, zigzag | « Moi je file en diagonale, zioup ! » |
| tour | costaud, tout droit | « Moi je fonce tout droit, boum ! » |
| cavalier | bondissant | « Et hop ! Je saute par-dessus tout le monde ! » |
| dame | élégante | « Je vais où je veux, comme je veux ! » |
| roi | pépère | « Moi ? Un petit pas à la fois… » |
| pion | petit courageux | « Je suis petit mais je croque en diagonale ! » |

Voix : puiser dans le casting existant (voix-meta) ou voice design dédié — décision Papa Yann. Tags v3 selon catalogue du skill audio-direction-elevenlabs.

## 2. mj-31 Grand voyage du temps

- ✅ ~~Phrases d'époque~~ : **déjà réglé sans quota** (2026-07-07) — les MP3 `site/audio/dinos/periodes/{trias,jurassique,cretace,cenozoique,pangee}.mp3` existaient, branchés dans `speakEpoquePhrase()`.
- Reste en TTS court (candidats à générer si le TTS déçoit encore) : les **dates** (« il y a 85 millions d'années » — ~26 variantes distinctes dans la data) + la **pépite T-Rex/Stégosaure** (1 phrase). Proposition : générer la pépite seule (1 fichier, gros gain) et garder les dates en TTS.
- ⚠️ Point non résolu de la revue : « texte trop long au début » — introuvable dans le code (aucun splash/modal long). **Question posée à Papa Yann** : quel écran précisément ?

## 3. mj-27 syllabes (en cours d'implémentation TTS)

Si le TTS syllabe par syllabe déçoit → générer les syllabes uniques des noms de dinos (registre exact produit par l'agent mj-27, voir son rendu / le code SYLLABES de mj-27.html). Estimation : ~60-80 syllabes uniques, fichiers courts.

## 4. Boutons (i) règles des jeux (norme en cours)

1 phrase-règle courte par jeu (~40 jeux) à générer quand la norme sera implémentée — voir NORME-i-REGLES.md. À prioriser sur les 9 nouveaux jeux d'abord.

## Historique

- 2026-07-06 : audio 9 mégafaune dinos (récits) — bloqué quota, toujours en attente (pôle DINO).
