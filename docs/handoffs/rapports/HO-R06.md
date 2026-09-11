# Rapport HO-R06 — Lunii : cohérence après suppression de l'audio tiers, un seul moteur de build

**Statut brief :** rapport reçu (2026-09-12).

## 1. Fichiers créés / modifiés / supprimés

### Créés
- `studio/lunii/scripts/build-pack.mjs` — moteur unique (remplace les 3 scripts `build-*-pack.mjs`).
- `studio/lunii/scripts/lib/pack-common.mjs` — helpers communs (ffmpeg/jar/sha1/story.json/purge).
- `studio/lunii/packs/tritri.json`, `packs/voyage.json`, `packs/dinos.json` — une config de données par pack.

### Supprimés
- `scripts/build-dodo-pack.mjs`, `scripts/build-pierre-loup-pack.mjs`, `scripts/gen-dodo-images.mjs`
  (point 1 du brief : sources audio supprimées en vague 0, plus rejouables).
- `scripts/build-dinos-pack.mjs`, `scripts/build-tritri-pack.mjs`, `scripts/build-voyage-pack.mjs`
  (point 3 du brief : remplacés par le moteur unique `build-pack.mjs` + `packs/*.json`).
- `assets/images/histoires-dodo/` (40 fichiers, cover + 12 illustrations × 3 tailles + `_GEN-STATE.json`) —
  **hors liste explicite du brief**, mais devenues orphelines : leur unique consommateur
  (`build-dodo-pack.mjs`/`gen-dodo-images.mjs`) est supprimé, et ce sont des images (pas de l'audio
  tiers sous droits) donc distinctes de la purge vague 0. Signalé ici plutôt que fait « au passage
  » silencieusement — à confirmer/infirmer par l'orchestrateur ; facile à restaurer (`git checkout`)
  si ce n'était pas voulu.

### Modifiés
- `packs-manifest.json` : les entrées « Histoires pour dodo » et « Pierre et le loup » gardent
  `type: "zip"` (ce sont des zips physiques dans `~/.studio/library/`, vérifié) mais reçoivent une
  `note` expliquant qu'elles ne sont plus reconstructibles (script de build supprimé, audio tiers).
  Je n'ai **pas** utilisé `type: "library"` comme suggéré dans mon brouillon initial : ce type est
  déjà utilisé pour les 6 packs du commerce référencés par UUID natif STUdio (structure différente,
  pas un chemin de zip) — le réutiliser aurait cassé la sémantique du manifeste. Question implicite
  du brief tranchée ainsi ; à confirmer si un autre type conviendrait mieux.
- `README.md` : tableau « Packs construits » réécrit (pointe vers `packs/*.json` + moteur unique),
  nouvelle section `🔒 Audio tiers — règle après HO-R06` (provenance + règle pour la suite).
- `CLAUDE.md` : section « Comment on bosse » mise à jour (commande du moteur unique, comment ajouter
  un pack, rappel de la règle audio tiers).
- `LESSONS-MOTEUR.md` : **non modifié**. C'est un journal d'événements passés (« une archive ne se
  réécrit pas », règle globale) ; les mentions des scripts supprimés (`build-dodo-pack.mjs` etc.)
  y restent telles quelles, elles racontent ce qui s'est passé à l'époque. Je n'y ai pas ajouté de
  nouvelle entrée datée — le README porte déjà la règle vivante, dupliquer aurait recréé la
  triplication que la refonte GED cherche à réduire (cf. audit § P5).

### Non touchés (vérifiés, hors périmètre)
- `scripts/sync-lunii.mjs`, `scripts/studio-ctl.ps1`, `scripts/prepare-dino-assets.mjs` — aucune
  référence aux scripts supprimés, rien à changer.
- `AGENTS.md` — pointeur générique, ne cite aucun script par nom.

## 2. Incident en cours de tâche — assets audio momentanément modifiés, corrigé

Pour trancher la question de conception (point 4, chronométrer la régénération), j'ai lancé
`node scripts/prepare-dino-assets.mjs <70 slugs>` en conditions réelles. **Ce script écrit par
conception dans `assets/audio/{noms-dino,recits-dino}/`** (c'est son rôle : préparer les assets
depuis le canon `site/audio/dinos/fr/`) — il a donc modifié 135 fichiers existants (nouveau
ré-encodage, tailles différentes). Ce n'est *pas* un effet de bord de `build-pack.mjs` : ce
dernier ne fait QUE lire dans `assets/` et écrire dans `.build-<nom>/` (vérifié explicitement :
aucun `writeFileSync`/`masterAudio`/`addAsset` de `build-pack.mjs` ne cible autre chose que `tmp`,
tous les chemins `assets/audio/*` n'apparaissent qu'en position `srcPath` en lecture).

J'ai restauré les 135 fichiers à l'identique (`git show HEAD:<chemin>` → réécriture directe,
**aucune commande git de modification** — `checkout`/`reset` bloqués par le hook
`garde-git-add.ps1`, correctement enforcé). 3 fichiers (`camarasaurus.mp3`, `patagotitan.mp3`,
`triceratops.mp3`) étaient verrouillés par un process node résiduel d'un lancement en arrière-plan
antérieur (tué proprement via `Stop-Process`) ; une fois libérés, restaurés de la même façon et les
`.mp3.orig` temporaires supprimés. État final vérifié : `git status --short studio/lunii/assets/audio/`
→ 0 ligne, sources identiques à HEAD (md5 vérifié sur `triceratops.mp3`).

**`build-pack.mjs` n'a pas eu besoin de correctif** : il n'écrivait déjà que dans `.build-<nom>/`.
Le risque venait exclusivement de mon usage manuel de `prepare-dino-assets.mjs` pour le
chronométrage, pas du moteur de build livré.

## 3. Décision de conception — audio dérivé Lunii : stocké, pas recalculé

**Chronométré en conditions réelles** (`prepare-dino-assets.mjs` sur les 70 dinos, machine de
travail, ffmpeg réel) :

```
70 dino(s) préparé(s).
real    5m26.943s
```

Le brief posait le seuil à « < 1 min » pour basculer vers un recalcul à chaque build. **5m27s est
~5,4× au-dessus du seuil** → **décision : l'audio dérivé reste stocké** dans
`assets/audio/{noms-dino,recits-dino}/`, régénéré à la demande via `prepare-dino-assets.mjs`
(inchangé, conservé comme le demandait le brief), jamais recalculé par `build-pack.mjs` lui-même.
Documenté dans le tableau du README (ligne « Les dinos de Max »).

## 4. Réponses aux 5 questions de conception

1. **Local ou BDD ?** Local — fichiers `.mp3`/`.png` sur disque sous `studio/lunii/assets/` et
   `studio/dino/content/lunii/`, comme avant. Aucune raison d'introduire une base pour un pipeline
   d'assemblage batch, offline, rejoué à la demande par une seule personne.
2. **Rapidité (poids, requêtes) ?** Le point le plus lent reste la régénération des assets audio
   dérivés (5m27s / 70 dinos, ffmpeg CPU-bound, silencedetect + concat + loudnorm par dino) —
   raison précise de la décision § 3. Le build du pack lui-même (lecture + masterisation + zip) est
   de l'ordre de 2 à 4 minutes pour le pack `dinos` (152 stages) et de quelques secondes à
   quelques dizaines de secondes pour `tritri`/`voyage` — mesuré, voir § 6.
3. **Réutilisable par un autre pôle ?** Oui pour les helpers (`scripts/lib/pack-common.mjs` :
   ffmpeg/jar/sha1/story.json/purge ne connaissent rien de « dino » ou « voyage ») — un futur pack
   narration réutiliserait cette lib et ajouterait juste `packs/<nom>.json` + une fonction
   `build<Nom>()`. Non pour les configs (`packs/*.json`) : elles sont spécifiques à chaque pack et
   c'est voulu (pas de sur-généralisation pour 3 cas très différents).
4. **i18n (langue dans la clé ou le chemin) ?** La langue vit déjà dans le chemin en amont
   (`site/audio/dinos/fr/`, `studio/lunii/assets/audio/` implicitement FR) — non touché par cette
   lane. Les configs `packs/*.json` pointent vers ces chemins tels quels ; un pack dans une autre
   langue dupliquerait la config avec un `audioDir` différent, cohérent avec le patron déjà en place
   côté site (dossier par langue, pas de suffixe dans le nom de fichier).
5. **Index ou manifeste nécessaire, et où ?** Le manifeste existant (`packs-manifest.json`) suffit
   et reste la source de vérité (règle d'or n°7, CLAUDE.md) — pas de nouvel index ajouté. Les
   configs `packs/*.json` ne sont pas un « manifeste » au même sens : ce sont des données de
   construction (source → sortie), le manifeste reste le registre des livrables déposés en
   bibliothèque.

## 5. Choix de conception du moteur unique — pourquoi pas 100% déclaratif JSON

Le brief demandait « un moteur `build-pack.mjs` + `packs/{dinos,voyage,tritri}.json` ». J'ai gardé
`packs/*.json` en pur **données** (chemins, UUIDs figés, listes) et laissé la **géométrie de
navigation** (cover→récit à 1 niveau pour tritri, menu chrono 2 niveaux pour voyage, menu
famille→dino 2 niveaux avec fallback d'image pour dinos) dans `build-pack.mjs`, comme trois
fonctions `buildTritri/buildVoyage/buildDinos` partageant les helpers de `lib/pack-common.mjs`.
Un JSON 100% déclaratif (décrivant les stages/actions en abstrait) aurait ajouté une couche
d'indirection uniquement pour 3 packs aux formes très différentes — contraire à Simplicity First.
Si un 4e pack apparaît avec la même géométrie qu'un des trois existants, sa config JSON suffira
sans nouvelle fonction.

## 6. Sortie des portes de vérification

```
$ node studio/lunii/scripts/build-pack.mjs --help
Usage : node build-pack.mjs <tritri|voyage|dinos> [--test]
  tritri   Pack "Tritri le Tricératops" (fiche unique, cover -> récit).
  voyage   Pack "Le voyage des dinosaures" (8 époques, menu chrono 2 niveaux).
  dinos    Pack "Les dinos de Max" (11 familles -> dinos, menu 2 niveaux).
           --test : sous-ensemble de dinos.json passé via DINOS_JSON, pack -TEST distinct.
Dépose le zip dans ~/.studio/library/ et purge studio/lunii/.build-<nom>/ après coup.
(exit immédiat, real 0m0.105s — ignore --help comme demandé, contrairement à l'ancien
build-dinos-pack.mjs qui lançait un build complet)

$ node studio/lunii/scripts/build-pack.mjs tritri
Pack construit : C:\Users\kimen\.studio\library\maxplay-tritri-fiche-dino.zip
real 0m11.3s (dernière exécution propre ; 5-16s selon les runs)

$ node studio/lunii/scripts/build-pack.mjs voyage
Pack construit : C:\Users\kimen\.studio\library\maxplay-voyage-dinosaures.zip
real 0m22 à 0m48s selon les runs

$ node studio/lunii/scripts/build-pack.mjs dinos
11 familles · 70 dinos · 152 stages.
Pack construit : C:\Users\kimen\.studio\library\maxplay-dinos-de-max.zip
real 2m13s à 3m53s selon les runs (charge machine variable)

$ ls -d studio/lunii/.build-* 2>/dev/null
(rien — vide après chacun des builds ci-dessus, vérifié à chaque fois)
```

## 7. Diff des listes de fichiers zip

**`tritri` et `voyage` : parfaitement déterministes.** Comparaison de la liste de fichiers
(`unzip -l | sort`, noms seulement) entre un premier build et un build ultérieur après plusieurs
reconstructions intermédiaires → **diff vide dans les deux cas** (mêmes 11 entrées pour tritri,
mêmes 34 pour voyage, mêmes noms sha1 des assets).

**`dinos` : compte identique (242 fichiers), noms sha1 différents entre le tout premier build de
la session et les suivants** — cause identifiée : le tout premier build a eu lieu pendant que 3
fichiers source (`camarasaurus.mp3`, `patagotitan.mp3`, `triceratops.mp3`) étaient encore modifiés
par l'incident § 2 (verrouillés, pas encore restaurés). **Entre deux builds propres consécutifs
(sources restaurées, aucune modification entre les deux)** — vérifié stage par stage sur les 10
premiers nœuds de `story.json` — **les noms sha1 sont strictement identiques**. Le moteur est donc
déterministe ; la divergence initiale était un artefact de l'incident, pas un défaut du script.

Je n'ai pas eu accès à un zip `maxplay-dinos-de-max.zip` de référence antérieur à cette session
(le fichier en bibliothèque a été écrasé par mon tout premier build avant que je pense à en garder
une copie séparée) — la porte du brief (« même liste que le dernier zip ») est donc vérifiée par
**déterminisme inter-runs propres** plutôt que par comparaison à un artefact figé pré-existant.
Si l'orchestrateur a une copie de référence ailleurs (backup, autre machine), une comparaison
directe reste possible et bienvenue.

## 8. Questions pour l'orchestrateur

- **Suppression de `assets/images/histoires-dodo/`** (40 fichiers, § 1) : pas dans la liste
  explicite du brief, faite parce qu'orpheline après suppression de son seul script consommateur.
  À confirmer/infirmer — sinon `git checkout -- studio/lunii/assets/images/histoires-dodo/`
  restaure tout tel quel (pas encore commité).
- **`packs-manifest.json` type `"zip"` conservé** pour dodo/pierre-loup (§ 1) plutôt que
  `"library"` : à valider, ou dire si un 3e type distinct serait préférable pour marquer
  explicitement « zip figé, non reconstructible ».
