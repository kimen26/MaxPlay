> Archive verbatim — déplacé depuis pmo/regen-audio-taille-56.md le 2026-09-04 (HO-008). Ne pas réécrire.

# EP-DINO-REGEN-TAILLE-56 — Régénération audio des blocs « taille » (paliers poids 2026-08-03)

> **Pourquoi ce doc** : les paliers `_compPoids` ont été refondus le 2026-08-03 (décisions Papa Yann,
> échelle complète dans [`../content/sources/mesures/_ECHELLE-REFERENTIEL.md`](../content/sources/mesures/_ECHELLE-REFERENTIEL.md) § C).
> 56 dinos ont une comparaison de poids différente → **leurs blocs audio `-taille` disent l'ancienne phrase**.
> Ce fichier est LA procédure de remise à jour, avec le périmètre exact.

## Périmètre — ce qui est touché et ce qui ne l'est PAS

| Élément | Touché ? | Détail |
|---------|----------|--------|
| Blocs `-taille` (56 dinos) | ✅ **OUI** | `_seg-{id}-taille.json` → `site/audio/dinos/fr/{id}-taille.mp3` |
| Blocs `-nom` / `-regime` / `-funfact` | ❌ Non | pas de comparaison poids dedans |
| Blocs `-recap` | ❌ Non (vérifié) | 0 mention de poids/comparaison dans les 70 JSON récap |
| Dico racines (100 MP3) | ❌ Non | étymologie, pas de poids |
| Menus / accroches familles | ❌ Non | |
| Répliques **Wex** des blocs taille | ⚠️ **14 à réécrire** | elles citaient l'ancienne comparaison (liste § 3) |
| Pack Lunii dinos | ⚠️ **Ré-emballage** | `recits-dino` = concat des 5 blocs canon, **zéro TTS** (`prepare-dino-assets.mjs`) |

**Réponse courte : non, on ne rejoue pas tout.** 56 blocs taille à ré-enregistrer (Narrateur + Wex),
le reste de la chaîne est intact. Les tags/scripts existent déjà — c'est partiel, pas une refonte.

## Procédure (6 étapes)

1. **Textes Narrateur** : pour chacun des 56 dinos, reconstruire le 1er `inputs[].text` du
   `_seg-{id}-taille.json` depuis le Bloc B canonique
   ([`../content/sources/mesures/_BLOC-B-CANONIQUE.md`](../content/sources/mesures/_BLOC-B-CANONIQUE.md), déjà régénéré)
   — chiffres exacts (certains JSON dérivaient, ex. carnotaurus disait « 2 mille kilos » pour 1,6 t data)
   + nouvelle comparaison. Garder le style de tags existant (`[excited]` en tête).
2. **Répliques Wex** : réécrire les 14 qui citaient l'ancienne comparaison (§ 3) — règles Wex inchangées
   (`_TEMPLATE-4blocs-dialogue.md` : pas d'écho, pas de fausse joie, max 2 tags, jamais « ! » final).
3. **Génération** : MCP `studio_audiobook_from_segments_v2_dialogue` (eleven_v3, voix Narrateur H
   `cbRcktt2xvoeFpdvW2wg` + Wex `G54e8CyYslC2Y4ZupTlg`) — fallback CLI
   `studio/narration/scripts/generate-story-dialogue.js`. Loudnorm. Écrire d'abord en temp, vérifier, PUIS
   copier vers `site/audio/dinos/fr/{id}-taille.mp3` (leçon menu-voyage : jamais d'écriture directe sur le canon).
4. **Vérif** : STT sur un échantillon (au moins les 8 dinos à exceptions-additions + 3 au hasard) —
   la comparaison doit être la nouvelle, aucun tag prononcé.
5. **Lunii** : `node studio/lunii/scripts/prepare-dino-assets.mjs <56 slugs>` (ré-emballage, zéro TTS),
   puis rebuild du pack dinos (`build-dinos-pack.mjs`).
6. **PMO** : passer le ticket à ✅, sprint-log, commit + push.

## Les 56 dinos (ancien → nouveau)

| Dino | Poids | Avant (dit dans le MP3 actuel) | Après (canon) |
|------|-------|--------------------------------|---------------|
| tyrannosaurus | 8 t | 3 hippopotames | 4 rhinocéros |
| spinosaurus | 7 t | 2 hippopotames | un éléphant et un rhinocéros ensemble ⚑ |
| giganotosaurus | 7 t | 2 hippopotames | un éléphant et un rhinocéros ensemble ⚑ |
| carcharodontosaurus | 7 t | 2 hippopotames | un éléphant et un rhinocéros ensemble ⚑ |
| tarbosaurus | 5 t | 2 hippopotames | un éléphant |
| dilophosaurus | 0,35 t | un poney | 2 ânes |
| carnotaurus | 1,6 t | un rhinocéros | une petite voiture et une vache ensemble ⚑ |
| cryolophosaurus | 0,4 t | un poney | 2 lions |
| brachiosaurus | 47 t | 8 éléphants | 9 éléphants |
| diplodocus | 12 t | 2 éléphants | 4 hippopotames |
| apatosaurus | 23 t | 4 éléphants | 8 hippopotames |
| camarasaurus | 18 t | 3 éléphants | 6 hippopotames |
| amargasaurus | 3 t | 2 rhinocéros | un hippopotame |
| ankylosaurus | 6 t | 2 hippopotames | 3 rhinocéros |
| edmontonia | 3 t | 2 rhinocéros | un hippopotame |
| minmi | 0,3 t | un ours brun | 2 ânes |
| stegosaurus | 4 t | un hippopotame | 2 rhinocéros |
| kentrosaurus | 1 t | un cheval de trait | une petite voiture |
| torosaurus | 8 t | 3 hippopotames | 4 rhinocéros |
| pentaceratops | 5 t | 2 hippopotames | un éléphant |
| parasaurolophus | 2,5 t | 2 rhinocéros | 5 chevaux |
| corythosaurus | 4 t | un hippopotame | 2 rhinocéros |
| maiasaura | 2,5 t | 2 rhinocéros | 5 chevaux |
| saurolophus | 3,5 t | 2 rhinocéros | un hippopotame et un cheval ensemble ⚑ |
| edmontosaurus | 4 t | un hippopotame | 2 rhinocéros |
| iguanodon | 3 t | 2 rhinocéros | un hippopotame |
| pachycephalosaurus | 0,45 t | un poney | un cheval |
| utahraptor | 0,5 t | une vache | un cheval |
| troodon | 0,05 t | un grand enfant de 10 ans | un loup |
| gallimimus | 0,44 t | un poney | 2 lions |
| oviraptor | 0,035 t | un gros chien | un grand enfant de 10 ans |
| pteranodon | 0,025 t | un gros chien | un chien |
| quetzalcoatlus | 0,2 t | un gros cochon | un lion |
| hatzegopteryx | 0,22 t | un gros cochon | un lion |
| mosasaurus | 10 t | 3 hippopotames | 2 éléphants |
| baryonyx | 1,7 t | un rhinocéros | une petite voiture et une vache ensemble ⚑ |
| therizinosaurus | 5 t | 2 hippopotames | un éléphant |
| dimetrodon | 0,25 t | un ours brun | un tigre |
| edaphosaurus | 0,12 t | Papa | un cochon |
| gorgonops | 0,1 t | Papa | un cochon |
| moschops | 0,41 t | un poney | 2 lions |
| elasmosaurus | 2,5 t | 2 rhinocéros | 5 chevaux |
| ophthalmosaurus | 0,95 t | un cheval de trait | une petite voiture |
| liopleurodon | 5 t | 2 hippopotames | un éléphant |
| shonisaurus | 25 t | 4 éléphants | 5 éléphants |
| patagotitan | 70 t | 12 éléphants | 14 éléphants |
| centrosaurus | 2,5 t | 2 rhinocéros | 5 chevaux |
| ichthyosaurus | 0,15 t | un gros cochon | un âne |
| mammuthus | 5 t | 2 hippopotames | un éléphant |
| smilodon | 0,25 t | un ours brun | un tigre |
| megatherium | 4 t | un hippopotame | 2 rhinocéros |
| paraceratherium | 17 t | 3 éléphants | 6 hippopotames |
| glyptodon | 1 t | un cheval de trait | une petite voiture |
| aenocyon | 0,07 t | Papa | un kangourou |
| coelodonta | 2,5 t | 2 rhinocéros | 5 chevaux |
| titanis | 0,3 t | un ours brun | 2 ânes |

⚑ = exceptions-additions (validées PY). Liste régénérable : `node ../content/scripts/export/_verif-comppoids.cjs`.

## § 3 — Répliques Wex à réécrire (citaient l'ancienne comparaison)

| Dino | Réplique actuelle | Piste de réécriture |
|------|-------------------|---------------------|
| ankylosaurus | « Aussi lourd que deux hippopotames ? Et il était tout bas ? » | « Trois rhinocéros ? Et il était tout bas ? » |
| edmontonia | « Deux rhinocéros. » | « Un hippopotame entier. » |
| minmi | « Un ours brun, mais avec une armure ? » | « Deux ânes, mais avec une armure ? » |
| pentaceratops | « Deux hippopotames. » | « Un éléphant. » |
| parasaurolophus ×2 | « Deux rhinocéros, tout ça dans un seul dino ? » / « Oui. Deux rhinocéros. … » | « Cinq chevaux ? » / « Oui. Cinq chevaux. … » |
| maiasaura | « Deux rhinocéros, pour une maman ? » | « Cinq chevaux, pour une maman ? » |
| edaphosaurus | « Aussi lourd que Papa ? » | « Aussi lourd qu'un cochon ? » |
| moschops | « Aussi lourd qu'un poney. » | « Aussi lourd que deux lions. » |
| patagotitan | « 12 éléphants. » | « 14 éléphants. » |
| mammuthus | « Deux hippopotames. » | « Un éléphant. » |
| megatherium | « Un paresseux aussi lourd qu'un hippopotame. » | « Un paresseux aussi lourd que deux rhinocéros. » |
| paraceratherium | « Trois éléphants. » | « Six hippopotames. » |
| aenocyon | « Aussi lourd que Papa. » | « Aussi lourd qu'un kangourou. » |
| coelodonta | « Deux rhinocéros à lui tout seul. » | « Cinq chevaux à lui tout seul. » |

Répliques vérifiées OK (mention générique « lourd », chiffre encore vrai, ou hauteur Papa) :
tarbosaurus, apatosaurus ×2, kentrosaurus, iguanodon, pachycephalosaurus, utahraptor, gallimimus ×2,
oviraptor ×2, centrosaurus, smilodon, megatherium répl. 3 (« grand comme un éléphant » = taille, inchangé).

## Repères techniques (rappels)

- Voix : Narrateur H `cbRcktt2xvoeFpdvW2wg` · Wex `G54e8CyYslC2Y4ZupTlg` (résolution via `voice-map.json`).
- Modèle **eleven_v3 forcé** (tags inline). Format `mp3_44100_128`, `apply_text_normalization: auto`.
- Tags autorisés : `_TEMPLATE-4blocs-dialogue.md` + règle « max 2 tags collés ».
- ffmpeg : pad 300 ms de tête PUIS loudnorm (`studio/lunii/LESSONS-MOTEUR.md`).
- Corps JSON EL : `--data-binary @fichier` (curl -d casse l'UTF-8 en Git Bash).
- Grep interdits avant tout texte audio : `max|doudou|peluche|bus` (hors comparaisons canon : bus RATP/accordéon/anglais sont dans `_compLong`, OK).

_Créé 2026-08-03 — chantier paliers poids (EP-DINO-PALIERS-COMPPOIDS ✅). Ticket de suivi : EP-DINO-REGEN-TAILLE-56 dans `backlog.md`._
