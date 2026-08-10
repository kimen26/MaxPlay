# État du contenu — référentiel unique

> **FICHIER GÉNÉRÉ — ne jamais éditer à la main.**
> Régénérer : `node studio/referentiel/build.mjs`
> Plan d'ensemble : [`memory/ARCHI-REFERENTIEL-CONTENU.md`](../../memory/ARCHI-REFERENTIEL-CONTENU.md) · généré le 2026-08-10

---

## Synthèse

| Indicateur | Nombre |
|---|---|
| Clés recensées | **1091** |
| — domaine DINO | 350 |
| — domaine JEU | 741 |
| Clés vérifiables automatiquement | 70 |
| 🔴 Dérives de fait confirmées | **0** |
| 🟠 Audio en retard sur son script | **6** |
| 🟡 Canaux manquants au contrat | 0 |
| 🟡 Consignes lues sans voix réelle | 23 |
| ⚪ Voix dont le texte verbatim n'est pas tracé | 109 |

## 🔴 Dérives de fait

Le texte parlé n'énonce plus ce que `dinos-data.js` calcule aujourd'hui.
Détection exacte et rétroactive : le bloc « taille » a un générateur déterministe (`_statsPhrase`).

_Aucune dérive de fait détectée._

## 🟠 Audio en retard sur son script

Le MP3 a été produit avant la dernière modification réelle de son script.
Comparaison sur les **dates de commit**, pas les dates de fichiers (un déplacement de dossier
réécrit les secondes sans changer le contenu — s'y fier produirait des centaines de faux retards).

- **dino.corythosaurus.nom** — script 2026-07-27 · audio 2026-07-20
- **dino.corythosaurus.regime** — script 2026-07-27 · audio 2026-07-20
- **dino.corythosaurus.funfact** — script 2026-07-27 · audio 2026-07-20
- **dino.hatzegopteryx.nom** — script 2026-07-27 · audio 2026-07-20
- **dino.hatzegopteryx.regime** — script 2026-07-27 · audio 2026-07-20
- **dino.hatzegopteryx.funfact** — script 2026-07-27 · audio 2026-07-20

## 🟡 Canaux manquants au contrat

_Aucun manque._

## Domaine JEU — état des lieux

Ces textes n'ont **aucun domicile** : ils vivent en dur dans le HTML de chaque page.
Le Lot 0 les recense là où ils sont ; le Lot 3 leur en donnera un.

| Famille | Clés |
|---|---|
| entrepot-vise | 632 |
| voix-produite | 109 |

**23 consignes** sont lues à l'enfant par le moteur du navigateur, sans voix réelle enregistrée.
**109 fichiers de voix** sont documentés dans [`site/sounds/_BANQUE-SONS.md`](../../site/sounds/_BANQUE-SONS.md)
(rôle, voix, méthode de génération), mais le **texte verbatim** envoyé à ElevenLabs — avec ses tags v3 —
n'est stocké nulle part. On ne peut donc ni les régénérer à l'identique, ni les traduire, ni vérifier
ce que l'enfant entend sans les écouter un par un.

Répartition :

| Dossier | Fichiers |
|---|---|
| `site/sounds/voix/phrases/` | 28 |
| `site/sounds/voix/f/` | 23 |
| `site/sounds/voix/h/` | 23 |
| `site/sounds/voix/wex/` | 23 |
| `site/sounds/voix/lieux/` | 12 |

---

## Ce que ce rapport ne dit pas (encore)

Les blocs **réécrits à la main** (nom, régime, funfact, récap) n'ont pas de générateur :
on ne peut pas vérifier rétroactivement qu'ils disent encore la vérité de `dinos-data.js`.
Leur **empreinte de référence est posée maintenant** dans `registre.json` — à partir de là, toute
modification future de leurs champs sources sera détectée (Lot 1). C'est la façon normale
d'enrôler un corpus existant : on ne rattrape pas le passé, on arrête l'hémorragie.

_Généré par `studio/referentiel/build.mjs` — lecture seule, ne modifie aucun contenu._
