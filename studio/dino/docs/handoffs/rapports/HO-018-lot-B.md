# HO-018 lot B — rapport d'exécution

> Exécutant : sous-agent Sonnet (lot B) · Clôture 2026-09-05.

## Livrables

- `studio/dino/content/i18n/en/scripts-hors-fiche/dico.md` : **101 clips** EN (100 racines du dico FR canon
  + 1 nouvelle racine `scelido-`), un bloc `### dico-<slug>` par racine, même ordre que la source FR
  `content/scripts-audio/_DICO-RACINES-AUDIO.md`, slugs alignés sur `DICO_VOICE` (`site/dev-dinos.html` ~L684).
- `studio/dino/content/scripts-audio/_DICO-RACINES-AUDIO.md` : ajout du clip FR `scélido- / skelis`
  (`dico-scelido`), en fin de liste juste avant `## BILAN`, même format que les voisins.

## Chiffres

- Nombre de clips dico.md : **101** (2 répliques chacun, NARRATEUR H + WEX).
- Total caractères EN (texte hors tags, hors libellés de locuteur) : **13 468 car.**
- Coût ElevenLabs estimé (TTS natif puis speech-to-speech ≈ ×2) : ~26 900 « caractères facturés ».

### 3 clips les plus longs (texte NARRATEUR H, hors tags)

1. `dico-mammuth` — 142 car. — étymologie du russe *mamont* (« corne de la terre »), 3 tags (2 tête + 1 milieu), conforme à la règle > 140 → ≥ 3 tags.
2. `dico-scelido` — 128 car. — la nouvelle racine, avec l'anecdote de l'erreur d'Owen.
3. `dico-galli` — 127 car. — nom mixte latin+grec (*galli-* + *-mimus*).

## Vérification mécanique (script maison, mêmes règles que `_verif-scripts-audio.cjs`)

- 101 blocs, 202 répliques (101 NARRATEUR H + 101 WEX), **0 erreur** :
  - tags 100 % dans `TAGS_OK` (31 tags autorisés).
  - densité respectée : > 70 car. → ≥ 2 tags dont 1 au milieu ; > 140 car. → ≥ 3 tags (seul `dico-mammuth` dépasse 140, conforme).
  - jamais 2 tags adjacents, jamais de tag en fin de réplique, jamais de tag suivi de ponctuation.
  - Wex : 0 occurrence de « ! » ; toute réplique se termine par `.` ou `?` (1 seule question, les 100 autres sont des affirmations — cohérent avec le format dico, 2 lignes fixes, pas de dialogue Q/R comme dans les fiches complètes).
  - libellés machine **NARRATEUR H** / **WEX** uniquement, jamais traduits.
  - grep `max|doudou|regarde|jurassic` : 0 match.

## Noms de dinos

Forme plate du lexique `content/i18n/lexiques-prononciation/en.md` (nom scientifique standard, sans tirets
syllabiques ni CAPS de respelling) — ex. `Tyrannosaurus rex`, `T. rex` (convention `NOTES.md` EN), `Brachiosaurus`,
`Scelidosaurus`. Les racines grecques/latines elles-mêmes restent intactes (ex. *-saurus*, *scelido- / skelis*,
*galli-*), seule l'explication du sens est en anglais natif, jamais un calque mot à mot du FR.

## Racine `scélido-` — fact-check

Source : `studio/dino/content/sources/etymo/_ETYMO-RACINES-50.md` § scelidosaurus (vérifié Wikipedia
2026-08-23, erreur Owen documentée Steyskal 1970) : *skelis* (grec) = « côte de bœuf » — Owen visait en
réalité *skelos* (« patte ») en nommant le genre. Sens voulu et retenu pour l'enfant : « lézard à grosses
pattes », avec l'anecdote de la petite erreur du savant traitée sur un ton léger (`[chuckles]`), jamais
moqueur. `site/js/dinos-racines.js` ne porte aujourd'hui aucune entrée `scélido-` dédiée (Scelidosaurus
n'apparaît que sous la racine générique `-saure`) — cohérent avec le brief qui la décrit comme absente.

## Ambiguïtés / écarts constatés (non contournés)

1. **Brief dit « 100 racines », la source en contient en réalité 100 blocs `dico-*` répartis sur 4 vagues
   d'ajout** (61 racines + 8 noms propres dans le corps initial « 69 clips », puis 7 racines « vague 2026-08-03 »,
   puis 24 racines « 2e vague »). Le `## BILAN` en fin de fichier source (« 61 + 8 = 69 total ») est **obsolète**
   depuis les deux vagues d'ajout suivantes — je l'ai laissé tel quel dans `_DICO-RACINES-AUDIO.md` (hors
   périmètre lot B, pas de réécriture de section FR autre que l'ajout scélido) mais le signale ici pour que
   l'orchestrateur ou `dino-pmo` le corrige.
2. **`DICO_VOICE` dans `site/dev-dinos.html` contient exactement 100 clés**, toutes couvertes par un bloc dans
   la source FR (vérifié par recoupement programmatique) — aucun trou constaté en dehors de `scélido-`, qui
   n'était dans aucune des deux listes. Pas d'édition de `site/` effectuée (hors périmètre).
3. Aucun MP3, appel ElevenLabs, JSON, `git` ni sous-agent utilisé — conforme aux contraintes du lot.

---

_Rapport généré 2026-09-05 · HO-018 lot B._
