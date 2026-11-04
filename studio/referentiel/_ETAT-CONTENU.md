# État du contenu — référentiel unique

> **FICHIER GÉNÉRÉ — ne jamais éditer à la main.**
> Régénérer : `node studio/referentiel/build.mjs`
> Plan d'ensemble : [`memory/ARCHI-REFERENTIEL-CONTENU.md`](../../memory/ARCHI-REFERENTIEL-CONTENU.md) · généré le 2026-11-04

---

## 🔴 Dettes ouvertes — 130

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
- **dino.giganotosaurus.funfact** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.giganotosaurus.funfact** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.giganotosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.allosaurus.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.allosaurus.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.allosaurus.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ceratosaurus.taille** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ceratosaurus.taille** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ceratosaurus.funfact** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.ceratosaurus.funfact** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
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
- **dino.minmi.funfact** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.minmi.funfact** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.minmi.recap** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.scelidosaurus.regime** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.scelidosaurus.regime** · canal `mp3` — champs sources modifiés depuis la dernière empreinte de référence
- **dino.stegosaurus.funfact** · canal `el` — champs sources modifiés depuis la dernière empreinte de référence

_… et 90 autres — détail complet dans `registre.json`._

---

## Synthèse

| Indicateur | Nombre |
|---|---|
| Clés recensées | **872** |
| — domaine DINO | 355 |
| — domaine JEU | 517 |
| Lignes suivies par le moteur de dette (clé × canal) | 639 |
| 🔴 Dettes ouvertes | **130** |
| Clés vérifiables automatiquement | 230 |
| 🔴 Dérives de fait confirmées | **0** |
| 🟠 Audio en retard sur son script | **0** |
| 🟡 Canaux manquants au contrat | 0 |
| 🟡 Consignes lues sans voix réelle | 4 |
| ⚪ Voix dont le texte verbatim n'est pas tracé | 0 |
| 🔴 Voix à refaire (la transcription ne dit pas le bon texte) | 4 |

## 🔴 Dérives de fait

Le texte parlé n'énonce plus ce que `dinos-data.js` calcule aujourd'hui.
Détection exacte et rétroactive : le bloc « taille » a un générateur déterministe (`_statsPhrase`).

_Aucune dérive de fait détectée._

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
| entrepot-vise | 358 |
| voix-produite | 159 |

**4 consignes** sont lues à l'enfant par le moteur du navigateur, sans voix réelle enregistrée.
**0 fichiers de voix** sont documentés dans [`site/sounds/_BANQUE-SONS.md`](../../site/sounds/_BANQUE-SONS.md)
(rôle, voix, méthode de génération), mais le **texte verbatim** envoyé à ElevenLabs — avec ses tags v3 —
n'est stocké nulle part. On ne peut donc ni les régénérer à l'identique, ni les traduire, ni vérifier
ce que l'enfant entend sans les écouter un par un.

**159 fichiers de voix** ont été transcrits (ElevenLabs speech-to-text, [`catalogue/fr/transcriptions.json`](catalogue/fr/transcriptions.json)) : on sait ce que l'enfant entend.
155 disent le texte du catalogue ; 4 sont à refaire :

- `site/sounds/voix/phrases/regle-mj-13c.mp3` — le son dit l'ancienne règle ; à refaire avec REGLES-SIMPLIFIER
- `site/sounds/voix/phrases/regle-mj-19.mp3` — le son dit l'ancienne règle ; à refaire avec REGLES-SIMPLIFIER
- `site/sounds/voix/phrases/regle-mj-34.mp3` — le son dit l'ancienne règle ; à refaire avec REGLES-SIMPLIFIER
- `site/sounds/voix/phrases/regle-mj-39.mp3` — le son dit l'ancienne règle ; à refaire avec REGLES-SIMPLIFIER

---

## Ce que ce rapport ne dit pas (encore)

Les blocs **réécrits à la main** (nom, régime, funfact, récap) n'ont pas de générateur :
on ne peut pas vérifier rétroactivement qu'ils disent encore la vérité de `dinos-data.js`.
Leur **empreinte de référence est posée** dans [`empreintes.json`](empreintes.json) — toute
modification de leurs champs sources lève désormais une dette, visible en tête de ce rapport.
C'est la façon normale d'enrôler un corpus existant : on ne rattrape pas le passé,
on arrête l'hémorragie.

_Généré par `studio/referentiel/build.mjs` — lecture seule, ne modifie aucun contenu._
