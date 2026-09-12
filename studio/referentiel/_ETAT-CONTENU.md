# État du contenu — référentiel unique

> **FICHIER GÉNÉRÉ — ne jamais éditer à la main.**
> Régénérer : `node studio/referentiel/build.mjs`
> Plan d'ensemble : [`memory/ARCHI-REFERENTIEL-CONTENU.md`](../../memory/ARCHI-REFERENTIEL-CONTENU.md) · généré le 2026-09-12

---

## 🔴 Dettes ouvertes — 94

Une dette ne se résout **jamais toute seule** : un humain tranche entre
`node studio/referentiel/acquitter.mjs <clé> <canal> --propage` (canal régénéré)
et `… --sans-impact "raison"` (le changement de source ne remet pas le canal en cause).
Base de référence : [`empreintes.json`](empreintes.json) (versionnée).

- **dino.spinosaurus.funfact** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.spinosaurus.funfact** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.spinosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.giganotosaurus.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.giganotosaurus.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.giganotosaurus.regime** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.giganotosaurus.regime** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.giganotosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.allosaurus.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.allosaurus.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.allosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ceratosaurus.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ceratosaurus.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ceratosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.carnotaurus.funfact** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.carnotaurus.funfact** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.carnotaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.brachiosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.diplodocus.funfact** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.diplodocus.funfact** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.diplodocus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.amargasaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.plateosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ankylosaurus.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ankylosaurus.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ankylosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.euoplocephalus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.edmontonia.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.edmontonia.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.edmontonia.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.scelidosaurus.regime** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.scelidosaurus.regime** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.kentrosaurus.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.kentrosaurus.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.kentrosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.triceratops.funfact** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.triceratops.funfact** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.triceratops.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.protoceratops.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.protoceratops.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence

_… et 54 autres — détail complet dans `registre.json`._

---

## Synthèse

| Indicateur | Nombre |
|---|---|
| Clés recensées | **924** |
| — domaine DINO | 355 |
| — domaine JEU | 569 |
| Lignes suivies par le moteur de dette (clé × canal) | 639 |
| 🔴 Dettes ouvertes | **94** |
| Clés vérifiables automatiquement | 71 |
| 🔴 Dérives de fait confirmées | **1** |
| 🟠 Audio en retard sur son script | **0** |
| 🟡 Canaux manquants au contrat | 0 |
| 🟡 Consignes lues sans voix réelle | 4 |
| ⚪ Voix dont le texte verbatim n'est pas tracé | 167 |

## 🔴 Dérives de fait

Le texte parlé n'énonce plus ce que `dinos-data.js` calcule aujourd'hui.
Détection exacte et rétroactive : le bloc « taille » a un générateur déterministe (`_statsPhrase`).

- **dino.mosasaurus.taille** — repère de hauteur : dit « porte », la donnée dit « voiture »
  <br>script : `studio/dino/content/scripts-audio/fr/V3/json/_seg-mosasaurus-taille.json`

## 🟠 Audio en retard sur son script

Le MP3 a été produit avant la dernière modification réelle de son script.
Comparaison sur les **dates de commit**, pas les dates de fichiers (un déplacement de dossier
réécrit les secondes sans changer le contenu — s'y fier produirait des centaines de faux retards).

_Aucun audio en retard._

## 🟡 Canaux manquants au contrat

_Aucun manque._

## Domaine JEU — état des lieux

Ces textes n'ont **aucun domicile** : ils vivent en dur dans le HTML de chaque page.
Le Lot 0 les recense là où ils sont ; le Lot 3 leur en donnera un.

| Famille | Clés |
|---|---|
| entrepot-vise | 402 |
| voix-produite | 167 |

**4 consignes** sont lues à l'enfant par le moteur du navigateur, sans voix réelle enregistrée.
**167 fichiers de voix** sont documentés dans [`site/sounds/_BANQUE-SONS.md`](../../site/sounds/_BANQUE-SONS.md)
(rôle, voix, méthode de génération), mais le **texte verbatim** envoyé à ElevenLabs — avec ses tags v3 —
n'est stocké nulle part. On ne peut donc ni les régénérer à l'identique, ni les traduire, ni vérifier
ce que l'enfant entend sans les écouter un par un.

Répartition :

| Dossier | Fichiers |
|---|---|
| `site/sounds/voix/phrases/` | 98 |
| `site/sounds/voix/f/` | 23 |
| `site/sounds/voix/h/` | 23 |
| `site/sounds/voix/wex/` | 23 |

---

## Ce que ce rapport ne dit pas (encore)

Les blocs **réécrits à la main** (nom, régime, funfact, récap) n'ont pas de générateur :
on ne peut pas vérifier rétroactivement qu'ils disent encore la vérité de `dinos-data.js`.
Leur **empreinte de référence est posée** dans [`empreintes.json`](empreintes.json) — toute
modification de leurs champs sources lève désormais une dette, visible en tête de ce rapport.
C'est la façon normale d'enrôler un corpus existant : on ne rattrape pas le passé,
on arrête l'hémorragie.

_Généré par `studio/referentiel/build.mjs` — lecture seule, ne modifie aucun contenu._
