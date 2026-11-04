# Pôle CHANSONS — léger, sans PMO

> Écrire des chansons pour un enfant de 4 ans et les produire avec ElevenLabs Music.
> Pôle d'autoring : la source (paroles + prompt) vit ici, le MP3 servi vit dans `site/`.
> Créé le 2026-11-04 (D-017, `memory/DECISIONS.md`). Pas de PMO, pas d'agents dédiés, pas de kanban :
> on promeut en pôle complet seulement si le volume dépasse ~10 chansons et qu'un process propre apparaît.

## Où est quoi

| Quoi | Où |
|---|---|
| Une chanson = un fichier (paroles + prompt exact + coût) | `paroles/<slug>.md` (modèle : `paroles/_modele.md`) |
| Le tableau de toutes les chansons (statut, crédits, publiée) | [`README.md`](README.md) |
| Le MP3 servi | `site/sounds/music/chansons/<slug>.mp3` (même slug que la source) |
| La liste jouée sur le site | `site/musique.html`, tableau `CHANSONS` (case Musique de l'armoire) |

Pas d'ambiance ici : la musique de fond (narration AUDIO-002, dino EP-D18, `site/sounds/music/*.mp3`)
reste dans son pôle. Ici, seulement des chansons avec des paroles.

## Règles d'or des paroles

- 🔒 Jamais « Max », « doudou », « peluche », « nounours » (règle machine, tous pôles).
- 🔒 Personnages : seulement le casting figé (`.claude/rules/personnages.md`), jamais de prénom inventé.
  Wex n'est pas nommé en apostrophe (« Hé Wex ! »), comme dans le dino.
- 🔒 Chanson dino = encyclopédie vraie : vrais noms, vraies époques, échelle honnête (> 10 % d'écart = faux).
  Le Tricératops peut s'appeler Tritri une fois, sans quête.
- 🔒 Bus : interdit seulement dans une chanson dino. Une chanson de bus est bienvenue.
- Pas de refrain « leçon » ni de morale. Pas d'adulte sauveur.
- Mots qu'un enfant de 4 ans comprend, phrases courtes, refrain qui revient et se chante après 2 écoutes.
- Pas de nom d'artiste réel ni de titre existant dans le prompt de style (droits).
- Texte chanté = texte entendu : skill `ecriture-audio-enfants` pour l'écriture.

## Pipeline (une chanson à la fois)

1. **Idée** → 1 ligne dans le tableau du README (statut `idée`).
2. **Paroles** dans `paroles/<slug>.md`, relues contre les règles d'or, puis
   `grep -niE "max|doudou|peluche|nounours" paroles/<slug>.md` → match = STOP.
3. **Plan de composition** : `create_composition_plan` (style, sections, paroles), relu avant de dépenser.
4. **Crédits** : `check_subscription` avant ; GO de Papa Yann obligatoire ; `compose_music` (durée ≥ 3000 ms).
   `check_subscription` après → coût réel noté dans le README.
5. **Vérif** : skill `audio-verif` (transcription des paroles chantées, loudness, silence de tête 250 ms).
6. **Écoute de Papa Yann** → statut `validée`.
7. **Publication** : MP3 dans `site/sounds/music/chansons/`, ligne dans `CHANSONS` de `site/musique.html`,
   commit puis `npm run gate`, puis push.

## Pièges connus

- `compose_music` coûte bien plus qu'une voix parlée : jamais en lot.
- Récupérer un MP3 depuis l'interface ElevenLabs : attention à la boîte « Enregistrer sous » (`memory/LESSONS.md`, incident musiques).
- Les voix de la narration (`voice-map.json`) sont des voix parlées : les faire chanter n'est pas vérifié.
- Lunii réutilise les MP3 tels quels plus tard (`studio/lunii/`).
