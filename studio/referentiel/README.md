# Référentiel unique de contenu

> Outil **transverse** (DINO · JEU · plus tard NARRATION · LUNII). Ne dépend d'aucun pôle,
> n'appartient à aucun. Plan d'ensemble : [`docs/ARCHI-REFERENTIEL-CONTENU.md`](docs/ARCHI-REFERENTIEL-CONTENU.md).

## À quoi ça sert

Un même contenu vit en plusieurs versions indépendantes : le texte **affiché**, le texte
**lu par le navigateur**, le script **ElevenLabs** (réécrit à la main), le **MP3** produit,
le pack **Lunii** qui en hérite, et demain les **langues**. Rien ne reliait ces versions :
quand un fait changeait d'un côté, les autres continuaient à raconter l'ancien.

Cet outil recense chaque contenu, déclare ce qu'on attend de lui, trace ce qui en dérive,
et signale quand un canal ne dit plus la même chose que la source.

## Utilisation

```bash
node studio/referentiel/valider.mjs         # le catalogue respecte-t-il son schéma ?
node studio/referentiel/plan-generation.mjs # QUOI générer — n'appelle RIEN
node studio/referentiel/couverture.mjs      # ce qui n'est PAS encore enrôlé
node studio/referentiel/build.mjs           # registre + tableau de bord + état des dettes
node studio/referentiel/test-detection.mjs  # non-régression du détecteur de dérive
node studio/referentiel/generer/_gen-textes-site.mjs # régénère site/js/textes-jeux.js (table des textes canoniques du site)
node studio/referentiel/acquitter.mjs dino.corythosaurus.regime mp3 --sans-impact "raison"
```

**Les 5 premiers scripts ci-dessus ne modifient aucun contenu et ne contactent aucune API.**
`acquitter.mjs` n'écrit, lui, que dans `empreintes.json` (la base de référence versionnée) —
jamais dans le contenu. Les appels ElevenLabs sont faits par des scripts
séparés (§ « Scripts de génération » plus bas), après relecture du plan — c'est tout l'intérêt
de le produire d'abord.

## Deux moitiés

Le dossier fait deux choses différentes qu'il vaut mieux ne pas confondre :

| | Ce que c'est | Fichiers |
|---|---|---|
| **Constater** | Ce qui existe déjà sur le disque, ses contrats, sa lignée, ses dérives | `build.mjs`, `scan-*.mjs`, `_ETAT-CONTENU.md` |
| **Décider** | Ce qu'on veut : le catalogue de contenu, et le plan pour le produire | `catalogue/`, `valider.mjs`, `plan-generation.mjs` |

La première moitié regarde le passé, la seconde prépare l'avenir. Elles se rejoignent quand
un fichier est généré depuis le catalogue : il devient alors vérifiable au lieu d'être subi.

## Le catalogue

[`catalogue/_SCHEMA.md`](catalogue/_SCHEMA.md) porte le contrat de format. L'essentiel :

- **Cinq types**, cinq formes de contrat — `bruitage` · `humeur` · `replique` · `atome` /
  `gabarit` · `bloc`. Pas de schéma unique : un klaxon n'a pas de texte, un pool
  d'encouragements n'a pas de texte *unique*, un gabarit n'a qu'un patron à trous.
- **La rejouabilité** : tout audio produit garde son texte verbatim (tags compris), sa voix,
  son modèle, ses réglages, son traitement. Sans ça, on ne peut ni régénérer, ni traduire,
  ni vérifier ce que l'enfant entend.
- **`texte_verifie`** : `true` seulement si le texte est *prouvé* identique au MP3. Tout
  l'hérité est à `false` — reconstruit depuis un slug ou un texte de repli, donc plausible
  et non prouvé. Un texte de repli ne dit **rien** de ce que le MP3 contient : il ne se
  déclenche que si le MP3 échoue.
- **La langue est une dimension**, pas une colonne : elle fait partie de la clé. Ajouter une
  langue = ajouter des fichiers, sans toucher au schéma ni aux autres langues.

## Le plan de génération

`plan-generation.mjs` écrit ce qui *partirait* à ElevenLabs — texte verbatim, tags, rôle de
voix et voice_id résolu, modèle, réglages, post-traitement, destination, coût en caractères —
et **s'arrête là**. On relit, on tranche, on lance ensuite.

Il met aussi en avant ce qui mérite une décision explicite : les fichiers qui seraient
**remplacés par un texte non vérifié** (on changerait ce que l'enfant entend, peut-être en
moins bien), et les langues invitées **non relues par un locuteur natif**.

**Lecture seule sur le contenu.** `build.mjs` ne modifie aucun texte, aucun audio, aucune
page. Il n'écrit que ses deux sorties.

## Ce que ça produit

| Fichier | Rôle | Versionné |
|---|---|---|
| [`_ETAT-CONTENU.md`](_ETAT-CONTENU.md) | **Tableau de bord lisible** — dettes ouvertes en tête, puis dérives, retards, manques, angles morts | oui |
| [`empreintes.json`](empreintes.json) | **Base d'empreintes de référence** (Lot 1) — signature gravée par ligne clé × canal + journal des acquittements | oui |
| `registre.json` | Le registre complet, lisible par machine (clés, contrats, lignée, empreintes) | non |

Les deux premiers ne sont pas tenus à la main : le tableau de bord est **généré** (« où en est
le contenu ? » → on régénère), la base d'empreintes n'est réécrite que par `build.mjs`
(structure : lignes nouvelles/disparues) et `acquitter.mjs` (références, décisions).
Même doctrine que `studio/dino/pmo/_ETAT-DINOS.md`.

`registre.json` est ignoré par git : 853 Ko réécrits intégralement à chaque passage
alourdiraient l'historique sans rien apporter, puisqu'il se reconstruit en deux secondes.
`empreintes.json`, lui, EST versionné : compact (~32 Ko), clés triées, diff-able — c'est
lui qui porte la mémoire de « ce qui était à jour la dernière fois ».

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

**3. Dette et acquittement** (Lot 1) — `build.mjs` compare, pour chaque ligne clé × canal
suivie, la signature courante de détection à la référence gravée dans `empreintes.json`.
Différence → la ligne est **en dette**, listée en tête de `_ETAT-CONTENU.md`. Une dette ne
se résout jamais toute seule : `acquitter.mjs` la clôt, soit `--propage` (canal régénéré,
la nouvelle signature devient la référence), soit `--sans-impact "raison"` (le changement
ne remet pas le canal en cause ; la référence est re-calée sur la valeur courante, avec la
raison et la date — le « défuzzifier » de gettext). La ligne reste close tant que la source
n'a pas rebougé depuis l'acquittement. Sans cette seconde issue, le tableau resterait rouge
à vie. La signature ne contient que les dépendances **déclarées** du bloc : un changement
hors de ces champs ne lève rien (alerter juste, sinon le tableau meurt d'indifférence).

## Pourquoi un test de détection

Un détecteur se dégrade dans les deux sens, et les deux sont graves : trop strict, il crie
pour des reformulations légitimes et plus personne ne lit le tableau de bord ; trop laxiste,
il ne voit plus rien et rassure à tort. `test-detection.mjs` fige les deux bords avec des
textes réels du dépôt, dont le cas témoin qui a motivé le chantier.

## Fichiers

| Fichier | Rôle |
|---|---|
| `build.mjs` | Orchestrateur — lance les scans, écrit le registre, le rapport et l'état des dettes |
| `acquitter.mjs` | Clôt une dette (`--propage` / `--sans-impact "raison"`) — n'écrit que dans `empreintes.json` |
| `empreintes.json` | Base d'empreintes de référence, **versionnée** — mémoire du « à jour », journal des acquittements |
| `scan-dino.mjs` | Domaine DINO — clés, contrats, lignée, dérives |
| `scan-jeu.mjs` | Domaine JEU — catalogue, consignes, règles, voix produites |
| `lib/socle.mjs` | Chargement de `dinos-data.js` hors navigateur, empreintes, dates de commit |
| `lib/dette.mjs` | Moteur de dette — signatures par ligne clé × canal, sync de la base, états |
| `lib/reperes.mjs` | Identification du repère d'une comparaison de taille |
| `lib/regles.mjs` | Reconstruction déterministe du texte parlé d'un panneau de règles (partagée `studio/minijeux/scripts/audio/_gen-regles.mjs` ↔ `catalogue/fr/regles.mjs`) |
| `lib/catalogue.mjs` | Chargement du catalogue, résolution des voix, rendu des gabarits |
| `test-detection.mjs` | Non-régression du détecteur de dérive |
| `valider.mjs` | Contrôles de forme du catalogue (types, voix, tags, viabilité des gabarits) |
| `plan-generation.mjs` | Plan des appels ElevenLabs — **n'en fait aucun** |
| `couverture.mjs` | Ce qui n'est pas encore enrôlé (catalogue, ou registre pour les blocs dino), par famille + orphelins assumés |
| `catalogue/_SCHEMA.md` | Le contrat de format |
| `catalogue/voix.mjs` | Rôles autorisés, réglages par usage, langues invitées |
| `catalogue/_bruitages.mjs` | Sons sans texte (ui + fx, cris de bébés compris) — hors langue |
| `catalogue/fr/*.mjs` | Le contenu français : humeur, répliques (consignes, règles, lieux, pièces), atomes et gabarits, nombres, phonèmes, familles dino (noms, dico, menus, récits, spéciaux) |

## Scripts de génération (⚠️ appellent ElevenLabs)

Ces scripts **modifient du contenu et contactent l'API ElevenLabs** — ils sont préfixés `_`
et exigent `--pour-de-vrai` pour agir (sans le flag, dry-run) :

| Fichier | Rôle |
|---|---|
| `generer/_extraire-textes-jeux.mjs` | Extrait les textes parlés/affichés des pages `site/mj-*.html` → `textes-jeux.json` (pas d'appel API, mais écrit une sortie) |
| `generer/_gen-textes-site.mjs` | Génère `site/js/textes-jeux.js` — table slug → { ecran, tts, mp3 } consommée par les libs du site (pas d'appel API, déterministe ; sans drapeau) |
| `studio/minijeux/scripts/audio/_gen-consignes.mjs` | Génère les MP3 des consignes → `site/sounds/voix/phrases/` |
| `studio/minijeux/scripts/audio/_gen-regles.mjs` | Génère les MP3 `regle-<id>.mp3` des panneaux de règles |
| `generer/_gen-humeur-invitee.mjs` | Génère les doublons multilingues d'encouragements (6 langues invitées) |

Ils appliquent tous le padding 250 ms + loudnorm, et résolvent les voix par rôle via
`voice-map.json`. Avant de les lancer : relire `_PLAN-GENERATION.md`, vérifier le budget
(`check_subscription`).

## Où lire quoi (désambiguïsation des fichiers de suivi)

| Fichier | Rôle | Tenu par |
|---|---|---|
| `site/sounds/_BANQUE-SONS.md` | Inventaire opérationnel des fichiers audio + API + process de génération | la main |
| `.claude/rules/sons.md` | Pointeur auto-chargé vers la banque + règles dures (padding, voice-map, repli TTS) | la main |
| `studio/referentiel/` (ici) | Contrats, lignée, détection de dérive, plan EL — **l'architecture** | catalogue à la main, sorties générées |
| `_ETAT-CONTENU.md` · `_COUVERTURE.md` · `_PLAN-GENERATION.md` | Tableaux de bord | **générés — jamais édités** |
| [`_FILE-EL.md`](_FILE-EL.md) | **File d'attente EL priorisée** (lots A→D, commandes, solde crédits) — quoi régénérer quand on veut | la main, depuis `_PLAN-GENERATION.md` |

## État

**Lot 1 livré** — moteur de dette : base d'empreintes versionnée (`empreintes.json`),
section « Dettes ouvertes » en tête du tableau de bord, acquittement `acquitter.mjs`,
contrôle branché dans `/dino-pmo-audit` et `/game-pmo-audit`.
Les lots suivants (fermeture de la boucle dino, domaine jeu,
ouverture des langues) sont décrits dans le plan et **non engagés**.
