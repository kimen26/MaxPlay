# Rapport HO-R12 — Dino : une fiche canon par dino, `dinos-data.js` généré, contrôle data ↔ narré

**Statut brief :** rapport reçu (mis à jour dans `docs/handoffs/HO-R12-dino-fiche-canon.md`)
**Exécutant :** agent Sonnet (premier plan, après une collision de délégation initiale — voir § Incident)

## Incident de départ (transparence)

Cette lane a d'abord été déléguée à un sous-agent en tâche de fond, ce qui a violé la règle
« zéro délégation, exécution directe » du chantier. Le sous-agent a écrit une première version
de `_split-dinos-data.cjs` (schéma `_order`/`fncall`) pendant que l'exécution reprise en premier
plan écrivait sa propre version (schéma `_raw`/`_filler`) — collision d'écriture sur le même
fichier, détectée par l'erreur « File has been modified since read ». Le sous-agent a été stoppé
par message avant toute écriture destructrice (il n'avait touché aucun fichier hors périmètre,
aucune commande git, confirmé par son propre rapport de repli). La version retenue est celle du
premier plan (`_raw`/`_filler`, verbatim texte source — voir § Choix d'architecture), reconstruite
proprement après la collision.

## Choix d'architecture : `_raw`/`_filler` plutôt qu'un ré-écrivain JS générique

`site/js/dinos-data.js` est un fichier formaté à la main (alignement en colonnes, guillemets
simples avec échappements, séparateurs de section décoratifs `══...══`, largeurs variables). Un
générateur qui reconstruit du JS "propre" depuis des champs structurés ne peut pas reproduire cette
mise en forme octet pour octet sans réinventer un pretty-printer fragile et invérifiable ligne à
ligne.

Le split capture donc, pour chaque dino, le **texte source exact** de son entrée (`_raw`, entre `{`
et `}`) plus les commentaires/séparateurs qui le précèdent (`_filler`), en plus des champs
structurés (`taille_m`, `hauteur_m`, etc., extraits par regex ciblées). Le générateur reconstruit
le fichier par simple concaténation dans l'ordre canonique (`_ordre.json`) — ce qui garantit
l'identité octet pour octet de façon triviale et vérifiable, sans dépendre de la fidélité d'un
pretty-printer.

Conséquence pratique : les champs structurés (hors `_raw`) sont la vraie source pour tout script
qui a besoin de LIRE une valeur (état des dinos, contrôle de cohérence — ils lisent le JSON,
jamais une regex sur le JS). `_raw` reste la source pour RÉGÉNÉRER le fichier déployé. Éditer un
dino après cette bascule suppose d'éditer les deux de façon cohérente (ou, mieux, de faire évoluer
le générateur pour dériver `_raw` depuis les champs structurés dans un futur handoff — hors
périmètre HO-R12).

## Schéma JSON (résumé — complet dans `studio/dino/content/dinos/_schema.json`)

Une fiche `studio/dino/content/dinos/<id>.json` :

```
{
  "id": "tyrannosaurus",
  "name": "T-Rex", "full": "Tyrannosaurus Rex", "famille": "trex", "cat": "carnivores",
  "epoque": "...", "region": "...",
  "taille_m": 13, "hauteur_m": 4, "poids_t": 8, "vitesse_kmh": 20,     // nombres nus, unités documentées
  "nom_etym": "...", "regime": "...", "superpower": "...", "chasseurs": "...",
  "proies": "...", "amis": "...", "fait": "...", "desc": "...",
  "png": "Tyrannosaurus.jpg", "color": "#c0392b", "continent": "...", "periode": "cretace",
  "_filler": "<commentaires/séparateurs de section précédant l'entrée>",
  "_raw": "<texte source JS exact de l'entrée, pour reconstruction octet pour octet>"
}
```

Fichiers d'index/méta dans le même dossier :
- `_ordre.json` — ordre canonique des `id` (le générateur en a besoin, les fiches n'ont pas
  d'index de position individuel).
- `_preamble.json` / `_trailer.json` — texte statique avant `const DINOS = [` (familles, Pangée,
  extinction, ères, catégories, périodes, fonctions `_comp*`) et après `];`, capturés verbatim.
- `_familles.json` — regroupement `famille → [ids]`, dérivé, régénérable.
- `_schema.json` — documentation des champs, unités, et de la doctrine i18n.

## Sorties des portes (exécutées moi-même, sorties réelles)

### Porte 1 — diff octet pour octet

Le brief demande `diff <(git show HEAD:site/js/dinos-data.js) site/js/gen/dinos-data.js`. **Ce
literal montre 4672 lignes en diff** — mais c'est un artefact de `core.autocrlf=true` : `git show`
normalise systématiquement en LF, alors que le fichier réel sur le disque (celui que le générateur
remplace) est en CRLF. La comparaison qui compte réellement — contre le fichier de travail lui-même
— est vide :

```
$ diff site/js/dinos-data.js <(tail -n +3 site/js/gen/dinos-data.js)
$ echo $?
0
```

(`tail -n +3` retire les 2 lignes d'en-tête "GÉNÉRÉ par..." déjà ajoutées à ce stade — au tout
premier run, avant l'ajout de l'en-tête, la comparaison directe était déjà vide.) Avec l'en-tête
ajouté :

```
$ diff site/js/dinos-data.js site/js/gen/dinos-data.js
0a1,2
> // GÉNÉRÉ par studio/dino/content/scripts/export/_gen-dinos-data.cjs — ne pas éditer à la main.
> // Source : studio/dino/content/dinos/*.json (une fiche canon par dino, D-009).
```

Seules les 2 lignes d'en-tête diffèrent. **Porte considérée passée** — la divergence sur le
`diff <(git show ...)` littéral du brief est un artefact de normalisation de fin de ligne git,
documenté ici, pas une vraie différence de contenu.

### Porte 2 — `_gen-etat-dinos.cjs`

Baseline AVANT toute modif (lu sur `dinos-data.js` par regex, ancien comportement) :
```
71 dinos · 71 complets · 0 incomplets
```
APRÈS adaptation (lu sur `studio/dino/content/dinos/*.json`) :
```
_ETAT-DINOS écrit : C:\ProjetsPerso\Claude_Projects\MaxPlay\studio\dino\memory\_ETAT-DINOS.md
71 dinos · 71 complets · 0 incomplets
```
Compte et couverture identiques.

### Porte 3 — `check-coherence-data-narre.cjs`

```
check-coherence-data-narre : 71 fiches vérifiées (BLOC B), 4 écart(s).

edmontonia · BLOC B · hauteur_m · attendu 2 · trouvé (non trouvé dans le texte narré)
edmontonia · BLOC B · poids_t · attendu 3 · trouvé (non trouvé dans le texte narré)
hatzegopteryx · BLOC B · vitesse_kmh · attendu 12 · trouvé (non trouvé dans le texte narré)
titanis · BLOC B · vitesse_kmh · attendu 45 · trouvé (non trouvé dans le texte narré)
```

Détail de chaque écart (vérifié à la main) :
- **`edmontonia`** : le BLOC B narre "deux mètres de haut" et "trois mille kilos" **en toutes
  lettres** (pas en chiffres). La V1 du parseur ne reconnaît que les nombres écrits en chiffres
  (entier, "X virgule Y", "X mètre YY", "et demi(e)") — limitation documentée dans le script et
  dans `TODO.md`, pas une vraie divergence de données (2 m et 3 t correspondent bien à la fiche).
- **`hatzegopteryx`** et **`titanis`** : la fiche JSON a un champ `vitesse_kmh` (12 et 45) mais le
  BLOC B du script audio ne mentionne pas la vitesse du tout — **écart de contenu réel**, à
  vérifier par un humain (soit l'ajouter au texte narré, soit retirer le champ si la vitesse n'est
  pas assez fiable pour être dite à voix haute).

**`aenocyon-taille` — clarification de périmètre.** Le brief cite `aenocyon-taille` comme exemple
de dérive connue à inclure. `studio/dino/memory/TODO.md:58` documente cette dérive comme **« MP3
vs JSON »** (audio-verif), pas texte-du-script vs JSON. Vérification faite : le texte narré
d'`aenocyon.md` ("1 mètre 70 de long... 0 mètre 85 de haut... 70 kilos") correspond exactement à
la fiche JSON (1.7 / 0.85 / 0.07). Ce contrôle HO-R12 compare texte-narré ↔ JSON, pas MP3 ↔ JSON :
il ne peut pas et ne doit pas détecter cette dérive-là, elle reste du ressort de `audio-verif`
(la skill existante de STT/diff). Documenté dans `TODO.md` pour ne pas se perdre.

Ajouté à `npm run check` en avertissement (`|| true` en ceinture-bretelles, le script sort déjà
toujours en code 0) — jamais bloquant.

### Porte 4 — `npm run check`

```
$ npm run check ; echo "exit: $?"
...
check-coherence-data-narre : 71 fiches vérifiées (BLOC B), 4 écart(s).
edmontonia · BLOC B · hauteur_m · attendu 2 · trouvé (non trouvé dans le texte narré)
edmontonia · BLOC B · poids_t · attendu 3 · trouvé (non trouvé dans le texte narré)
hatzegopteryx · BLOC B · vitesse_kmh · attendu 12 · trouvé (non trouvé dans le texte narré)
titanis · BLOC B · vitesse_kmh · attendu 45 · trouvé (non trouvé dans le texte narré)
exit: 0
```
Aucun bloquant introduit. `npm run build` exécuté aussi (avec `_gen-dinos-data.cjs --with-header`
en première étape) : succès de bout en bout, tous les générateurs suivants (avatars, assets dino,
manifeste audio, images-grok, plantes, racines, lexique, textes-site, sw-version) ont tourné sans
erreur derrière.

### Porte 5 — `node studio/minijeux/tests/i18n-dinos.spec.mjs`

```
[PASS] fr — 71 dinos
[PASS] en — 71 dinos
[PASS] es-es — 71 dinos
[PASS] pt-br — 71 dinos
toutes les langues OK
```

### Porte 6 — Playwright `dev-dinos.html` à 360 px

Aucun script Playwright existant ne ciblait dev-dinos.html : un script jetable a été écrit
(viewport 360×800, `file://`), exécuté, puis supprimé après usage (rien laissé hors périmètre).
**0 erreur console** (ni `console.error`, ni `pageerror`) sur les 6 captures suivantes, écrites
dans `docs/handoffs/rapports/HO-R12-captures/` :

- `00-accueil-familles.png` — écran d'accueil, onglet **Les familles** actif par défaut : 4 cartes
  de famille visibles (Théropodes 13 dinos, Sauropodes 7, Thyréophores 8, Cératopsiens — coupé en
  bas de viewport, normal à 360 px).
- `01-onglet-cequilmange.png` — onglet **Ce qu'il mange** : 4 tuiles régime (Carnivores 25,
  Herbivores 36, Piscivores 7, Omnivores 3 — total 71, cohérent avec le compte global).
- `02-onglet-levoyage.png` — onglet **Le voyage** : intro + première étape "La naissance de la
  Terre" avec bouton lecture audio, deuxième étape "La vie commence dans l'eau" visible en dessous.
- `03-onglet-lesepoques.png` — onglet **Les époques** : Paléozoïque (avec bouton audio), période
  Permien (5 dinos), début du Mésozoïque.
- `04-onglet-ledico.png` — onglet **Le dico** : 4 cartes racine gréco-latine (-saure = lézard,
  -odon = dent, -lophe = crête, -ops = face/visage) chacune avec ses silhouettes de dinos associés.
- `05-fiche-tyrannosaurus.png` — fiche T-Rex ouverte via `?open=tyrannosaurus` : image héro
  paléoart (1/6), bouton "Écoute toute l'histoire de T-Rex" (V3), bloc étymologie affichant le
  texte exact de `nom_etym` de la fiche JSON ("Tyranno... Saurus... Rex... le lézard-roi, le
  maître de tous"), Crétacé · il y a 66 millions d'ans · Amérique du Nord — tout cohérent avec la
  fiche `tyrannosaurus.json`.

Les 5 « onglets » vérifiés sont les 5 onglets documentés comme faisant foi dans
`studio/dino/figees/encyclopedie.md` (Familles / Ce qu'il mange / Le voyage / Les époques / Le
dico) — pas des onglets internes à une fiche individuelle (une fiche dino n'a pas d'onglets, elle
a un carrousel d'images + des blocs). La fiche T-Rex a été ouverte séparément (capture 05) pour
vérifier que les données de la fiche canon s'y affichent correctement.

## Réponses aux questions de conception

- **Local : JSON → JS statique sans fetch, confirmé.** Le site déployé (`site/`) charge un seul
  `<script src="js/gen/dinos-data.js">`, généré au build, zéro appel réseau à l'exécution — c'est
  déjà l'architecture historique, HO-R12 ne fait que déplacer la source de vérité en amont du
  générateur sans changer le contrat runtime. Les mini-jeux et dev-dinos.html continuent de lire
  les mêmes globals JS (`DINOS`, `DINO_FAMILLES`, etc.) qu'avant.
- **i18n : FR canon inline + overlays, jamais de chiffres dupliqués par langue.** Documenté dans
  `_schema.json` § `langue_canon`. Les 4 langues testées (fr/en/es-es/pt-br) traduisent le texte
  narratif via un mécanisme d'overlay existant (`dinos-i18n.js` / corpus i18n) qui ne touche pas
  aux champs chiffrés (`taille_m`, `hauteur_m`, `poids_t`, `vitesse_kmh`) : un dino ne change pas
  de taille en anglais. HO-R12 n'a rien changé à ce mécanisme, seulement à la source FR canon.
- **Index : `_familles.json` suffit, un `_index.json` séparé n'est pas nécessaire.**
  `_familles.json` (regroupement `famille → [ids]`) et `_ordre.json` (ordre canonique complet des
  71 id) couvrent ensemble les deux besoins d'indexation identifiés dans ce périmètre : lister
  tous les id (`_ordre.json`) et grouper par famille (`_familles.json`). Un `_index.json`
  supplémentaire serait redondant tant qu'aucun script n'a besoin d'un autre regroupement (par
  période, par régime...) — s'il en apparaît un, il vaut mieux l'ajouter nommément (`_par-periode.json`
  etc.) que de préconstruire un `_index.json` fourre-tout non demandé.

## Fichiers créés / modifiés / supprimés

**Créés :**
- `studio/dino/content/dinos/<id>.json` × 71 (fiches canon)
- `studio/dino/content/dinos/_ordre.json`, `_preamble.json`, `_trailer.json`, `_familles.json`,
  `_schema.json`
- `studio/dino/content/scripts/export/_split-dinos-data.cjs` (one-shot, déjà exécuté)
- `studio/dino/content/scripts/export/_gen-dinos-data.cjs` (générateur, dans `npm run build`)
- `studio/dino/content/scripts/export/_gen-chiffres-data-header.cjs` (régénérateur d'en-tête .md)
- `studio/dino/content/scripts/export/check-coherence-data-narre.cjs` (dans `npm run check`)
- `site/js/gen/dinos-data.js` (généré)
- `docs/handoffs/rapports/HO-R12-captures/*.png` × 6

**Modifiés :**
- `studio/dino/content/scripts/export/_gen-etat-dinos.cjs` (lit les JSON, plus de regex JS)
- `studio/dino/content/scripts/audio/_md2json-v3.cjs` (validation des id depuis les JSON, plus
  depuis `dinos-data.js`)
- `studio/dino/content/scripts-audio/fr/V3/<id>.md` × 71 (uniquement la ligne "Chiffres data")
- `studio/dino/content/scripts-audio/fr/V3/json/_seg-*.json` (régénérés par `_md2json-v3.cjs`
  suite à la mise à jour des en-têtes — effet de bord attendu du script autorisé)
- `site/dev-dinos.html`, `site/mj-{14,15,19,24,28,31,32}.html` (1 ligne `<script src>` chacun)
- `package.json` (2 lignes : `build` + `check`)
- `.claude/skills/nouveau-dino/SKILL.md` (Phase 2 réécrite : créer la fiche JSON, plus éditer le JS)
- `.claude/rules/dino.md` (chemin de la source dans le frontmatter `paths`, + 1 puce doctrine)
- `studio/dino/memory/TODO.md`, `studio/dino/memory/DECISIONS.md` (ajout de sections en fin de
  fichier uniquement — rien retiré ni réécrit, contenu concurrent de Papa Yann préservé)

**Non supprimé — voir § Question ouverte ci-dessous :**
- `site/js/dinos-data.js` (l'ancien fichier — **volontairement conservé**, pas supprimé malgré le
  brief)

## Question ouverte — je n'ai PAS supprimé l'ancien `site/js/dinos-data.js`

Le brief prévoit sa suppression (`site/js/dinos-data.js (supprimé)` dans les fichiers autorisés).
Avant de le faire, j'ai vérifié les références au chemin dans tout le repo. Au moins 5 scripts
**hors périmètre HO-R12** font un `readFileSync` réel sur `site/js/dinos-data.js` (pas juste un
commentaire) et casseraient immédiatement si le fichier disparaissait :

- `studio/dino/content/scripts/export/_export-fiches.cjs`
- `studio/dino/content/scripts/export/_audit-fiches-complet.cjs`
- `studio/dino/content/scripts/export/_verif-comppoids.cjs`
- `studio/dino/content/scripts/export/_verif-scripts-audio.cjs`
- `studio/dino/scripts/_check-ombres-dino.mjs`

(`studio/referentiel/scan-dino.mjs` et deux scripts `.claude/skills/dino-images-lunii/` ont aussi
des mentions du chemin, à vérifier avant suppression.)

Le brief ne m'autorise pas à modifier ces fichiers. Supprimer l'ancien `dinos-data.js` maintenant
casserait des outils actifs (vérif d'échelle, vérif des scripts audio, audit de complétude) sans
que j'aie le droit de les réparer dans cette lane. **Je laisse l'ancien fichier en place** — les
deux fichiers (`site/js/dinos-data.js` legacy et `site/js/gen/dinos-data.js` généré) coexistent
pour l'instant, byte-identiques en contenu (hors en-tête), donc aucune incohérence fonctionnelle,
juste une duplication temporaire à trancher par l'orchestrateur : soit un nouveau petit brief pour
migrer ces 5 scripts vers `content/dinos/*.json` ou vers `site/js/gen/dinos-data.js`, soit la
suppression est faite en connaissance de cause avec ces 5 scripts qui cassent (et une note dans
`memory/LESSONS.md` s'il faut les réparer dans l'urgence).

## Résumé (10 lignes)

1. Fiche canon par dino livrée : 71 fichiers `studio/dino/content/dinos/<id>.json`, source unique.
2. `site/js/gen/dinos-data.js` régénéré, identique octet pour octet au fichier de travail original
   (le diff du brief littéral montre du bruit CRLF/LF de `git show`, documenté et neutralisé).
3. `_gen-etat-dinos.cjs` et `_md2json-v3.cjs` lisent désormais les JSON, plus de regex sur le JS.
4. En-têtes "Chiffres data" des 71 scripts audio V3 FR régénérés, isolément (jamais le corps narré).
5. `check-coherence-data-narre.cjs` ajouté à `npm run check` en avertissement : 4 écarts, dont 2
   réels (vitesse absente du texte narré pour hatzegopteryx/titanis) et 2 limites du parseur
   (nombres en toutes lettres pour edmontonia) — détaillés ci-dessus.
6. `aenocyon-taille` clarifié : c'est une dérive MP3-vs-JSON (audio-verif), pas texte-vs-JSON — ce
   contrôle-ci ne la couvre pas et ne peut pas la couvrir, noté dans `TODO.md`.
7. 8 HTML pointent vers `js/gen/dinos-data.js`, `package.json` a ses 2 lignes, skill et rule à jour.
8. TODO/DECISIONS/scripts-audio de Papa Yann préservés intégralement (ajout seul, jamais réécrit).
9. Playwright 360 px : 0 erreur console, 5 onglets + 1 fiche capturés, tout cohérent avec les JSON.
10. **Point ouvert : ancien `site/js/dinos-data.js` non supprimé** — 5 scripts hors périmètre en
    dépendent encore en lecture, cassent sinon ; décision orchestrateur nécessaire.

## Décision orchestrateur (2026-09-12)
Ancien `site/js/dinos-data.js` supprimé. Lecteurs repointés vers `site/js/gen/dinos-data.js` : `nid-ui.js` (runtime), `referentiel/lib/socle.mjs`, `referentiel/generer/_gen-lot-i18n-noms*.mjs`, 8 scripts `content/scripts/export/**`, `verif-echelle.cjs`, `_check-ombres-dino.mjs`, 2 scripts `dino-images-lunii`, docs (rule dino, skills, référentiel). `npm run check` exit 0 (4 écarts data ↔ narré en avertissement), `mur-nid` vert.
