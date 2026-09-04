# HO-011 — Réécriture des 71 Scripts audio FR, tags v3 riches

**Statut :** bloque par HO-010 (les chiffres doivent être justes AVANT d'écrire)
**Depend de :** HO-010
**Exécutants :** 6 sous-agents `dino-fiche-writer` (Sonnet), 1 par lot. Ownership = les `<id>.md` du lot.

## Objectif

Un fichier `studio/dino/content/scripts-audio/fr/V3/<id>.md` par dino (71), format 4 blocs A/B/C/D,
Narrateur H + Wex, **vivant** : des tags v3 posés PARTOUT où ils servent (au fil des phrases, autour des
mots-clés, rires, inquiétude, chuchotement), sans jamais sortir de la liste autorisée.
La porte `_verif-scripts-audio.cjs` passe à 0 erreur sur tout le lot.

## Ce qui a changé depuis la V3 de juin (à lire d'abord)

- **Canon = 1 fichier par dino** (`<id>.md`, id = clé `dinos-data.js`). Les anciens fichiers par lot sont dans
  `fr/V3/_archive-2026-09-05-lots/` : source d'inspiration pour le fond (étymo, faits, vignettes), PAS un modèle
  pour la forme. Les `json/_seg-*.json` actuels portent la version « allégée » validée par Papa Yann le 2026-09-03
  (phrasé resserré pour l'oral, sans « Il mesurait / Et il pesait ») : **garder ce phrasé**, corriger les chiffres,
  enrichir les tags.
- **Les chiffres data ont été ré-audités (HO-009/010)** : relire l'entrée du dino dans `dinos-data.js` AU MOMENT
  d'écrire, exécuter `_compLong/_compHaut/_compPoids` par node, recopier la sortie EXACTE dans le bloc B
  (le « ! » final peut devenir un point). 32 fiches mentaient sur le poids le 2026-09-03 : c'est fini.
- 5 fiches par-dino existent déjà et sont bonnes sur le fond (`albertosaurus`, `saurolophus`, `corythosaurus`,
  `edmontonia`, `hatzegopteryx`, `scelidosaurus`) : on garde le texte, on **corrige le bloc B** si la porte le
  demande, on **enrichit les tags**.

## Doctrine tags v3 (Papa Yann, 2026-09-05 — « plein, intelligemment ; si tu as un doute, ne va pas plus loin »)

**Liste autorisée (la seule) :**
`[excited] [happily] [cheerfully] [curious] [serious] [playful] [hesitant] [confident] [calm] [warmly] [gently]
[softly] [whispers] [slowly] [quickly] [shouts] [laughs] [chuckles] [giggles] [sighs] [gasps] [exhales]
[amazed] [proud] [delighted] [encouraging] [sad] [scared] [nervous] [mischievously] [pauses]`
Un tag hors liste = erreur bloquante. Aucun tag composé (`[dramatic tone]`, `[laughs harder]`…), aucun tag accent.

**Placement :**
- 1 ou 2 tags collés en tête de réplique (jamais 3). Ensuite, **1 tag isolé** posé juste AVANT le mot ou le membre
  de phrase qu'il colore. Jamais deux tags adjacents au milieu, jamais un tag en toute fin, jamais un tag collé à
  une ponctuation, jamais un tag à l'intérieur d'un nom syllabé (`Ty-ran-no-saure`).
- **Densité cible** : Narrateur 2 à 5 tags par réplique selon sa longueur ; Wex 1 à 3. Le tag est un choix
  d'acteur, pas un remplissage : chaque tag doit changer quelque chose à l'oreille.
- `[pauses]` se place AVANT la phrase qu'on veut faire respirer (jamais après).
- `[shouts]` : Narrateur au plus 1 fois par fiche, sur LE mot du climax. Jamais chez Wex.
- `[laughs]/[chuckles]/[giggles]` seulement si c'est vraiment drôle (un [laughs] plaqué sonne faux).
- L'inquiétude existe : `[nervous]`/`[scared]`/`[hesitant]` chez Wex quand l'enfant de 4 ans aurait peur, TOUJOURS
  suivie d'une réponse `[warmly]`/`[gently]`/`[confident]` du Narrateur qui rassure par le VRAI (pas par un mensonge).
- `[whispers]`/`[softly]` pour le secret, le suspense, la chute douce du bloc D.
- Variété d'une fiche à l'autre : pas le même `[gasps]` de Wex sur la même case ; on change ce qui l'étonne.

**Exemple validé de densité (bloc A, T-Rex) :**
```
**NARRATEUR H** [excited] : Ty-ran-no-saure Rex. [curious] Tu sais ce que ça veut dire, « tyrannos » ? [pauses] Le roi qui commande [serious] tout seul, à qui personne ne dit non.
**WEX** [gasps] Personne ? [nervous] Même pas sa maman ?
**NARRATEUR H** [chuckles] Sa maman, si, quand il était petit. [warmly] Mais une fois grand, c'était lui le roi. Il vivait en Amérique du Nord, [amazed] il y a 66 millions d'années.
```

## Règles d'écriture (inchangées, non négociables)

Tout ce que dit l'agent `dino-fiche-writer` (chargement obligatoire dans l'ordre, échelle exécutée, proies ≠ dangers,
anti-doublon A/B/C/D, fact-check Grokipedia, Wex FR standard sans `!`, registre anti-redite `_SCENES-VIGNETTES.md`,
priorités éditoriales PY 2026-08-17 : le NOM au cœur, Wex sincère, UN fun fact fort, vignette attaque/défense légère).
Bloc B : poids ≥ 1 t dit « X tonnes » (« 2 tonnes 5 »), < 1 t dit « X kilos » ; longueur/hauteur « X mètres » /
« 3 mètres 50 ». Budget ≤ 1900 caractères par fiche, 15-35 s par bloc.
Lieu(x) : citer TOUS les lieux de `region` (un dino trouvé au Canada ET en Mongolie le dit).

## Lots (1 agent chacun)

| Lot | Dinos |
|---|---|
| W1 Théropodes (PRIORITÉ) | tyrannosaurus spinosaurus giganotosaurus carcharodontosaurus allosaurus tarbosaurus albertosaurus ceratosaurus dilophosaurus carnotaurus cryolophosaurus baryonyx therizinosaurus |
| W2 Raptors + Ptérosaures | velociraptor deinonychus utahraptor microraptor troodon gallimimus oviraptor archaeopteryx pteranodon quetzalcoatlus hatzegopteryx |
| W3 Sauropodes + Thyréophores | brachiosaurus diplodocus apatosaurus camarasaurus amargasaurus plateosaurus patagotitan ankylosaurus euoplocephalus edmontonia minmi scutellosaurus scelidosaurus stegosaurus kentrosaurus |
| W4 Cératopsiens + Ornithopodes | triceratops torosaurus protoceratops pentaceratops centrosaurus pachycephalosaurus parasaurolophus corythosaurus maiasaura saurolophus edmontosaurus iguanodon |
| W5 Marins + Avant les dinos | mosasaurus elasmosaurus ophthalmosaurus liopleurodon archelon shonisaurus ichthyosaurus dimetrodon edaphosaurus gorgonops lystrosaurus moschops |
| W6 Mégafaune | mammuthus smilodon megatherium paraceratherium glyptodon aenocyon coelodonta titanis |

## Fichiers autorisés (lot)

- `studio/dino/content/scripts-audio/fr/V3/<id>.md` pour chaque id du lot (créer ou remplacer)
- `studio/dino/content/sources/_SCENES-VIGNETTES.md` : AJOUTER ses lignes en fin de tableau (append seul, jamais réécrire)
- `studio/dino/content/i18n/lexiques-prononciation/fr.md` : AJOUTER un respelling manquant (append seul)

## Hors périmètre

`dinos-data.js` (si un chiffre paraît faux : le SIGNALER dans le rapport, écrire avec le chiffre data quand même),
`json/` (régénéré par l'orchestrateur), tout autre lot, l'i18n, la génération audio.

## Format d'un fichier `<id>.md`

```
# <Nom FR> — Script audio (Narrateur H + Wex)

> <en-tête de traçabilité : famille, époque, lieu(x) · chiffres data + sorties exactes des 3 fonctions (exécutées) · étymo + source · fact-checks (cohabitations, dates) avec source · prononciation · grep-interdits OK>

## <NOM FR> — <Genre espèce>

### BLOC A — Présentation
**NARRATEUR H** [tag] : …
**WEX** [tag] : …
### BLOC B — Taille
### BLOC C — Comment il vivait
### BLOC D — Le truc fou
```
Le 1er mot du latin en minuscules DOIT être l'id (`Tyrannosaurus rex` → `tyrannosaurus`).

## Portes de vérification (à jouer soi-même avant de rendre, sortie brute dans le rapport)

```bash
node studio/dino/content/scripts/export/_verif-scripts-audio.cjs fr <id1> <id2> ...
```
0 KO exigé. Les ⚠ se justifient un par un.

## Rapport attendu

Par dino : chemin, total caractères, nombre de tags par bloc, les 3 faits vérifiés + source, le fun fact retenu,
la vignette ajoutée au registre. Puis : sortie brute de la porte, chiffres data qui te paraissent faux (signalés, non corrigés),
et les 3 endroits où tu as HÉSITÉ sur un tag et choisi de ne pas le poser.
