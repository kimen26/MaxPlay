# Référentiel unique de contenu

> Outil **transverse** (DINO · JEU · plus tard NARRATION · LUNII). Ne dépend d'aucun pôle,
> n'appartient à aucun. Plan d'ensemble : [`memory/ARCHI-REFERENTIEL-CONTENU.md`](../../memory/ARCHI-REFERENTIEL-CONTENU.md).

## À quoi ça sert

Un même contenu vit en plusieurs versions indépendantes : le texte **affiché**, le texte
**lu par le navigateur**, le script **ElevenLabs** (réécrit à la main), le **MP3** produit,
le pack **Lunii** qui en hérite, et demain les **langues**. Rien ne reliait ces versions :
quand un fait changeait d'un côté, les autres continuaient à raconter l'ancien.

Cet outil recense chaque contenu, déclare ce qu'on attend de lui, trace ce qui en dérive,
et signale quand un canal ne dit plus la même chose que la source.

## Utilisation

```bash
node studio/referentiel/build.mjs          # régénère le registre + le tableau de bord
node studio/referentiel/test-detection.mjs # non-régression du détecteur (doit être vert)
```

**Lecture seule sur le contenu.** `build.mjs` ne modifie aucun texte, aucun audio, aucune
page. Il n'écrit que ses deux sorties.

## Ce que ça produit

| Fichier | Rôle | Versionné |
|---|---|---|
| [`_ETAT-CONTENU.md`](_ETAT-CONTENU.md) | **Tableau de bord lisible** — dérives d'abord, puis retards, manques, angles morts | oui |
| `registre.json` | Le registre complet, lisible par machine (clés, contrats, lignée, empreintes) | non |

Les deux sont **générés**. Jamais tenus à la main : « où en est le contenu ? » → on régénère.
Même doctrine que `studio/dino/pmo/_ETAT-DINOS.md`.

`registre.json` est ignoré par git : 853 Ko réécrits intégralement à chaque passage
alourdiraient l'historique sans rien apporter, puisqu'il se reconstruit en deux secondes.
Le Lot 1 introduira à côté une base d'**empreintes** compacte — celle-là sera versionnée,
car c'est elle qui porte la mémoire de « ce qui était à jour la dernière fois ».

## Le modèle

Chaque contenu est une **clé stable** (`dino.tyrannosaurus.taille`, `jeu.mj-49.consigne.2`)
portant quatre choses :

- un **contrat** — quels canaux sont attendus (écran, TTS, ElevenLabs, MP3, Lunii), quelles langues ;
- des **dépendances déclarées** — les champs précis dont ce bloc dérive, et eux seuls ;
- une **lignée** — quel script a produit quel MP3, et quand ;
- une **empreinte** — de quoi détecter, plus tard, que la source a bougé.

Deux rôles selon le domaine, volontairement asymétriques :

| Domaine | Rôle | Pourquoi |
|---|---|---|
| **DINO** | *catalogue* — pointe vers `site/js/dinos-data.js` | Ces textes ont déjà un domicile, imposé par la frontière autoring/produit. Zéro migration. |
| **JEU** | *entrepôt visé* — recense là où ils sont | Ces textes n'ont **aucun** domicile : ils vivent en dur dans chaque page. Le Lot 3 leur en donnera un. |

## Comment la dérive est détectée

Deux mécanismes, qui n'attrapent pas la même chose.

**1. Dérive de fait** — exacte et rétroactive, sur le bloc `taille` qui a un générateur
déterministe (`_statsPhrase`). On compare le **repère** cité, pas la phrase : le texte
ElevenLabs est une réécriture assumée, « comme un grand 4×4 » vaut « aussi long qu'un
grand 4×4 ». Seul un changement de repère — « au nombril » pour « aux fesses »,
« 3 hippopotames » pour « 4 rhinocéros » — change ce que l'enfant entend.

**2. Audio en retard** — le MP3 a été produit avant la dernière modification réelle de son
script. Comparaison sur les **dates de commit**, pas les dates de fichiers : une
réorganisation de dossier a touché 217 scripts d'un coup sans changer leur contenu, et
s'y fier signalerait 217 faux retards.

Les blocs **réécrits à la main** (nom, régime, funfact) n'ont pas de générateur : on ne peut
pas vérifier rétroactivement qu'ils disent encore vrai. Leur empreinte de référence est
posée maintenant, pour que toute modification **future** soit détectée. On ne rattrape pas
le passé, on arrête l'hémorragie.

## Pourquoi un test de détection

Un détecteur se dégrade dans les deux sens, et les deux sont graves : trop strict, il crie
pour des reformulations légitimes et plus personne ne lit le tableau de bord ; trop laxiste,
il ne voit plus rien et rassure à tort. `test-detection.mjs` fige les deux bords avec des
textes réels du dépôt, dont le cas témoin qui a motivé le chantier.

## Fichiers

| Fichier | Rôle |
|---|---|
| `build.mjs` | Orchestrateur — lance les scans, écrit le registre et le rapport |
| `scan-dino.mjs` | Domaine DINO — clés, contrats, lignée, dérives |
| `scan-jeu.mjs` | Domaine JEU — catalogue, consignes, règles, voix sans texte source |
| `lib/socle.mjs` | Chargement de `dinos-data.js` hors navigateur, empreintes, dates de commit |
| `lib/reperes.mjs` | Identification du repère d'une comparaison de taille |
| `test-detection.mjs` | Non-régression du détecteur |

## État

**Lot 0 livré** — instrumentation seule, aucun refactor, aucun contenu déplacé.
Les lots suivants (moteur d'acquittement, fermeture de la boucle dino, domaine jeu,
ouverture des langues) sont décrits dans le plan et **non engagés**.
