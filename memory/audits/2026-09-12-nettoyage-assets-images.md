# Audit nettoyage assets images/vidéos — 2026-09-12

> Auditeur lecture seule. Périmètre : `site/img/**`, `site/video/**`, `studio/dino/content/sources/{images,marine_reptiles,flore,fiches}/**`, `studio/minijeux/**` (images), `studio/lunii/assets/**` (images), `.claude/**` (images), `infra/**` (images). Hors périmètre : `studio/narration/**`, tout ce qui contient "tile"/"LimeZu".

## 1. Chiffres globaux

| Zone | Fichiers | Poids (du) |
|---|---|---|
| `site/img/dinos/` (hors `_new-*`) | ~972 | ~247 Mo |
| `site/img/dinos/_new-*` (8 dossiers, gitignorés) | 29 (dont 8 fichiers `_PROGRESS.tsv`/état) | ~25 Mo |
| `site/img/avatars/` | 88 (87 PNG + manifest via JS) | 14 Mo |
| `site/img/decor/` | 13 | 1.5 Mo |
| `site/img/` racine (icônes PWA) | 6 | ~240 Ko |
| `site/video/dinos/` | 4 | ~15 Mo |
| `studio/dino/content/sources/images/` | 4 fichiers (2 refs-échelle, 2 _grok-test) + notes | 6.2 Mo |
| `studio/dino/content/sources/{marine_reptiles,flore,fiches}/` | 0 image (fichiers `.page`/`.json`/`.md` seulement) | — |
| `studio/minijeux/tests/.artifacts/` | 187 | ~29 Mo (captures Playwright) |
| `studio/minijeux/tests/.artifacts/compat/` | 40 | inclus ci-dessus |
| `studio/minijeux/docs/handoffs/rapports/captures/` | 27 | inclus dans total minijeux |
| `studio/lunii/assets/images/dinos/` | 70 PNG | 242 Ko |
| `.claude/skills/dino-images-lunii/reference/` | 3 PNG | 2.1 Mo |
| `infra/**` | 5 fichiers, tous dans `node_modules/` (playwright-core, zod-to-json-schema) | hors scope réel (dépendance tierce, jamais commitée normalement) |
| `docs/handoffs/rapports/HO-R12-captures/` | 6 PNG | ~800 Ko |

**Total périmètre (hors `node_modules`)** : env. **335 Mo**, ~1500 fichiers.

Le plus gros morceau de loin : `site/img/dinos/paleoart/` seul (504 fichiers, **115 Mo**) — c'est le cœur canon, entièrement GARDER (voir §2).

## 2. Tableau par dossier — verdict et preuve

| Dossier | Fichiers | Poids | Verdict | Preuve (qui le lit) |
|---|---|---|---|---|
| `site/img/dinos/paleoart/` | 504 | 115 Mo | **GARDER** | `site/js/gen/dinos-assets.js` référence les 497 fichiers `.jpg`/`.webp` attendus (0 manquant dans le code). Les 7 fichiers non trouvés par mon 1er grep (`Amargasaurus_hypo-*`, `fond_*_coloriage.webp`) sont en fait lus par `site/dev-dinos.html` (objets `{folder:'paleoart',file:...}`) et `site/mj-32.html` (jeu coloriage) — faux positifs, tout est utilisé. |
| `site/img/dinos/sprites/` | 140 | 43 Mo | **GARDER** | `site/mj-46.html` + `site/js/gen/dinos-assets.js` référencent les 140 fichiers, 0 orphelin détecté. |
| `site/img/dinos/grok/` | 118 | 43 Mo | **GARDER** | `site/js/gen/dinos-images-grok.js` (généré) charge le dossier entier, chargé par `site/dev-dinos.html:2559`. Variable `DINO_GROK` consommée en galerie "extras" (dev-dinos.html:1658-1663). Nos propres générations Grok — exactement ce que Papa Yann veut garder. |
| `site/img/dinos/wiki/` | 50 | 20 Mo | **GARDER** | `site/js/dinos-images-local.js` référencé par `site/dev-dinos.html:2558`, variable `DINO_WIKIMEDIA` consommée en galerie "extras". |
| `site/img/dinos/plantes/` | 44 | 8.3 Mo | **GARDER** | `site/js/gen/dinos-plantes.js` (généré depuis `studio/dino/content/scripts/export/_gen-plantes.cjs`), chargé dans `dev-dinos.html`. 44/44 fichiers référencés. |
| `site/img/dinos/ombres/` | 71 | 1.8 Mo | **GARDER** | `site/js/gen/dinos-assets.js`, 0 orphelin. |
| `site/img/dinos/traces/` | 15 | 1 Mo | **GARDER** | Pas de référence dans `site/*.html`/`site/js` (d'où le doute initial) mais bien lu par `studio/dino/content/scripts/export/_audit-fiches-complet.cjs:17` (script hors `site/`) — déjà tranché par HO-R07 (2026-09), qui l'avait signalé et laissé en l'état faute de mandat. Pas d'action ici non plus. |
| `site/img/dinos/familles/` | 11 | 864 Ko | **GARDER** | `site/dev-dinos.html`, 0 orphelin. |
| `site/img/avatars/` | 88 | 14 Mo | **GARDER** | `site/js/gen/avatars.js` (généré) référence les 87 PNG, chargé par `js/avatar-picker.js`. Manifest = code, pas de comptage manuel possible en dérive. |
| `site/img/decor/` | 13 | 1.5 Mo | **GARDER** | `site/mj-46.html`, `mj-48.html`, `mj-53.html`, `site/js/mj-kit.js`, `site/js/mur-scene.js`. Note : `decor.js` (l'ancien consommateur dédié) a été **supprimé** par HO-R07 (2026-09) comme code mort, mais le dossier `img/decor/` reste consommé par d'autres fichiers — pas un doublon de suppression. |
| `site/img/maxplay-icon-*.png/svg` (racine) | 6 | 240 Ko | **GARDER** | 5/6 dans `site/manifest.json`, le 6e (`maxplay-icon-180.png`) dans `site/index.html:9` (`apple-touch-icon`). Aucun lien cassé. |
| `site/video/dinos/*.mp4` (4 fichiers) | 4 | ~15 Mo | **GARDER** | Explicitement demandé par Papa Yann à conserver. |
| `site/img/dinos/_new-audit/` | 2 (`_JOURNAL.tsv`, `_VERDICTS.tsv`) | 16 Ko | **ORPHELIN** (pas des images) | Fichiers TSV de suivi, pas d'image. Gitignorés (`**/_new-*/`), jamais commités. À vider une fois le lot Scelidosaurus clos (voir Q1). |
| `site/img/dinos/_new-coloriage/` | 1 image + 1 tsv | 737 Ko | **GARDER-SOURCE → déjà promu** | `Scelidosaurus_coloriage.png` = source PNG, déjà converti en `site/img/dinos/paleoart/Scelidosaurus_coloriage.webp` (présent, GARDER). Le PNG source est un doublon de travail gitignoré. |
| `site/img/dinos/_new-fonds/` | 5 images + 1 tsv | 5.9 Mo | **GARDER-SOURCE → déjà promu** | Les 5 `fond_*_coloriage.png` ont leur pendant `.webp` déjà dans `paleoart/` (GARDER, référencé par `mj-32.html`). Sources PNG redondantes une fois le webp validé. |
| `site/img/dinos/_new-headshots/` | 1 image + 1 tsv | 2.4 Mo | **GARDER-SOURCE → déjà promu** | `Scelidosaurus_headshot.png` → `paleoart/Scelidosaurus_headshot.webp` existe. |
| `site/img/dinos/_new-ombre/` | 1 image + 2 état | 158 Ko | **GARDER-SOURCE → déjà promu** | `Scelidosaurus_ombre.png` → `site/img/dinos/ombres/Scelidosaurus_ombre.png` existe déjà (même nom, dossier canon). |
| `site/img/dinos/_new-plantes-coloriage/` | 6 images + 1 tsv | 6.9 Mo | **GARDER-SOURCE → déjà promu** | Les 6 `<Plante>_coloriage.png` ont leur `.webp` déjà dans `plantes/` (GARDER). |
| `site/img/dinos/_new-plantes/` | 0 image, 1 tsv | 12 Ko | **ORPHELIN** (pas une image) | Juste un `_PROGRESS.tsv` vide de contenu image. |
| `site/img/dinos/_new-xxl/` | 5 images + 1 tsv | 16 Mo | **GARDER-SOURCE → déjà promu** | Les 5 fichiers `Scelidosaurus*.png` (hero/ecosysteme/funfact/manger/paris) ont chacun leur `.webp` déjà dans `paleoart/`. |
| `studio/dino/content/sources/images/refs-echelle/` | 2 (`trex-enfant.png`, `tri-enfant.png`) | ~qq Ko | **GARDER-SOURCE** | Références de calibrage échelle enfant/dino, utilisées en amont de génération (pas dans le déployé). Pas de lien cassé, matériel de travail légitime. |
| `studio/dino/content/sources/images/_grok-test/` | 2 (`Diplodocus_final.png`, `Diplodocus_livree.png`) | ~qq Mo | **À TRANCHER** (Q2) | Tests de livrée Diplodocus, aucune trace de statut "validé/rejeté" trouvée dans `DECISIONS.md`. |
| `studio/dino/content/sources/{marine_reptiles,flore,fiches}/` | 0 image | — | **N/A** | Ne contiennent que `.page`/`.json`/`.md` — pas dans le périmètre image malgré le nom du dossier. |
| `studio/minijeux/tests/.artifacts/` | 187 | ~29 Mo | **ORPHELIN régénérable** | Captures Playwright (`node run.mjs`, `audit-gabarit.mjs`). 164/187 ont plus de 14 jours — déjà détecté par `scripts/gc.mjs` (rapport `memory/audits/gc-2026-09-12.md`). Non commitées normalement (vérifier `.gitignore`), régénérables à la demande. |
| `studio/minijeux/tests/.artifacts/compat/` | 40 | inclus ci-dessus | **ORPHELIN régénérable** | Même nature, sous-lot compat-shell. |
| `studio/minijeux/docs/handoffs/rapports/captures/` | 27 | — | **GARDER** (archive de preuve) | Captures jointes à des handoffs déjà clos — preuve visuelle d'un livrable passé, pas régénérable à l'identique (état du jour). Différent de `.artifacts/` (scratch de test). |
| `studio/lunii/assets/images/dinos/` | 70 PNG | 242 Ko | **GARDER** | `studio/lunii/packs/dinos.json` référence ces images pour le pack Lunii dino. |
| `.claude/skills/dino-images-lunii/reference/theropode-v3*.png` | 3 | 2.1 Mo | **GARDER** | Images de référence documentaires dans la skill même (`SKILL.md`/`reference/`), matériel pédagogique pour la skill, pas un asset produit. |
| `docs/handoffs/rapports/HO-R12-captures/*.png` | 6 | ~800 Ko | **GARDER** (preuve de handoff clos) | Captures jointes au rapport HO-R12, preuve visuelle citée dans le rapport. |
| `infra/**` (node_modules) | 5 | — | **HORS SCOPE** | Fichiers internes à `playwright-core`/`zod-to-json-schema` dans `node_modules`, jamais un asset produit — à ignorer, normalement non commité (vérifier `.gitignore` couvre `node_modules/`). |

## 3. Liste exacte des chemins ORPHELIN proposés à la suppression

Seuls deux éléments ne sont ni images utiles ni sources en attente — de simples fichiers d'état de pipeline, tous **déjà gitignorés** (`**/_new-*/`), donc **aucun impact sur le repo git** si on les vide :

| Chemin | Nature | Poids |
|---|---|---|
| `site/img/dinos/_new-audit/_JOURNAL.tsv` | log de pipeline | ~8 Ko |
| `site/img/dinos/_new-audit/_VERDICTS.tsv` | log de pipeline | ~8 Ko |
| `site/img/dinos/_new-plantes/_PROGRESS.tsv` | log de pipeline (dossier sinon vide) | 12 Ko |

**Poids total ORPHELIN strict : ~28 Ko** — négligeable en soi, mais nettoyer le dossier de travail `_new-*` en confirmera la clôture (voir Q1).

`studio/minijeux/tests/.artifacts/` (164 fichiers >14j, ~26 Mo estimés au prorata) est un orphelin *régénérable* mais déjà couvert par le processus `gc.mjs` existant — je ne le liste pas en double, voir `memory/audits/gc-2026-09-12.md`.

## 4. DOUBLONS — chemin lu vs chemin à jeter

Tous les doublons trouvés sont du type **PNG source (gitignorée, `_new-*`) → WebP canon (déployé, lu)**. Le PNG n'est jamais lu par le site ; le WebP est le seul chemin actif.

| Chemin lu (canon, GARDER) | Chemin à jeter (source promue, gitignorée) |
|---|---|
| `site/img/dinos/paleoart/Scelidosaurus.webp` | `site/img/dinos/_new-xxl/Scelidosaurus.png` |
| `site/img/dinos/paleoart/Scelidosaurus_ecosysteme.webp` | `site/img/dinos/_new-xxl/Scelidosaurus_ecosysteme.png` |
| `site/img/dinos/paleoart/Scelidosaurus_funfact.webp` | `site/img/dinos/_new-xxl/Scelidosaurus_funfact.png` |
| `site/img/dinos/paleoart/Scelidosaurus_manger.webp` | `site/img/dinos/_new-xxl/Scelidosaurus_manger.png` |
| `site/img/dinos/paleoart/Scelidosaurus_paris.webp` | `site/img/dinos/_new-xxl/Scelidosaurus_paris.png` |
| `site/img/dinos/paleoart/Scelidosaurus_headshot.webp` | `site/img/dinos/_new-headshots/Scelidosaurus_headshot.png` |
| `site/img/dinos/paleoart/Scelidosaurus_coloriage.webp` | `site/img/dinos/_new-coloriage/Scelidosaurus_coloriage.png` |
| `site/img/dinos/ombres/Scelidosaurus_ombre.png` | `site/img/dinos/_new-ombre/Scelidosaurus_ombre.png` (même contenu probable, à diff avant suppression) |
| `site/img/dinos/paleoart/fond_desert_coloriage.webp` (×5, désert/forêt/montagne/neige/volcan) | `site/img/dinos/_new-fonds/fond_*_coloriage.png` (×5) |
| `site/img/dinos/plantes/Araucaria_coloriage.webp` (×6 : Araucaria/Cycas/Fougère/Ginkgo/Palmier/Prêle) | `site/img/dinos/_new-plantes-coloriage/*_coloriage.png` (×6) |

**Poids total DOUBLON (sources PNG déjà promues) : ~25 Mo**, entièrement dans les dossiers `_new-*` gitignorés — impact nul sur le repo si supprimés du disque local, purge de dossiers de travail terminés.

Cas particulier `_new-ombre/Scelidosaurus_ombre.png` vs `ombres/Scelidosaurus_ombre.png` : **mêmes deux fichiers PNG** (pas de conversion webp ici, contrairement aux autres) — à vérifier par `diff` binaire avant suppression pour confirmer qu'il s'agit bien d'un doublon strict et pas d'une version plus récente non encore recopiée (voir Q1).

## 5. Liens cassés

**Aucun lien cassé trouvé.** Vérifications faites :
- `site/js/gen/dinos-assets.js` → 497 chemins `paleoart/*` référencés, 497 présents sur disque (0 manquant).
- `site/img/dinos/{sprites,ombres,familles,plantes}` → 0 orphelin ni manquant vs leurs manifests JS respectifs.
- `site/js/gen/avatars.js` → 87/87 PNG avatars présents.
- `site/manifest.json` + `apple-touch-icon` dans `index.html` → 6/6 icônes présentes.
- `studio/lunii/packs/dinos.json` → référence les 70 PNG de `studio/lunii/assets/images/dinos/`, tous présents.

## 6. Questions À TRANCHER

**Q1 — Clôture du lot Scelidosaurus (`_new-*`).** Les dossiers `_new-xxl`, `_new-headshots`, `_new-coloriage`, `_new-fonds`, `_new-plantes-coloriage`, `_new-ombre`, `_new-audit`, `_new-plantes` contiennent exclusivement des PNG déjà convertis et déployés en `.webp`/`.png` canon (cf. §4), plus 3 fichiers d'état vides d'image. Tout est gitignoré donc sans risque git.
*Recommandation : vider entièrement ces 8 dossiers `_new-*` sous `site/img/dinos/` une fois un `diff` binaire rapide confirmé sur `_new-ombre/Scelidosaurus_ombre.png` (seul cas non-webp, cf. §4) — env. 25 Mo récupérés localement, aucun impact déployé.*

**Q2 — `studio/dino/content/sources/images/_grok-test/Diplodocus_final.png` et `Diplodocus_livree.png`.** Deux essais de livrée Diplodocus, aucune trace de décision (validé/écarté) dans `studio/dino/memory/DECISIONS.md`. Le Diplodocus canon existe déjà dans `paleoart/` (donc une décision de livrée a bien été prise à un moment).
*Recommandation : si le Diplodocus déployé correspond visuellement à l'un des deux tests, l'autre est un rebut de test A/B à supprimer ; sinon garder comme référence de tentative écartée. Je n'ai pas comparé visuellement les 2 tests au Diplodocus canon (hors capacité lecture seule sans rendu d'image) — à trancher par Papa Yann en un coup d'œil.*

**Q3 — `studio/minijeux/tests/.artifacts/` (187 fichiers, ~29 Mo, 164 >14j).** Le script `gc.mjs` les signale déjà mais ne purge pas automatiquement (lecture seule sauf `--fix`).
*Recommandation : lancer `node scripts/gc.mjs --fix` (ou la purge dédiée) plutôt que traiter ça dans ce chantier images — outillage déjà existant, pas la peine de le dupliquer ici.*

**Q4 — `studio/minijeux/tests/.artifacts/` est-il commité dans git ?** Pas vérifié explicitement (`git status` en tête de conversation ne le montre pas modifié, signe probable de `.gitignore`, mais je n'ai pas confirmé la ligne exacte).
*Recommandation : vérifier `.gitignore` contient bien `tests/.artifacts/` ou équivalent ; sinon l'ajouter avant toute purge pour éviter qu'un futur test le recommite.*

## 7. Commandes utilisées (pour rejeu)

```bash
# Inventaire par dossier
find <dir> -type f | wc -l
du -sh <dir>              # poids réel disque (préférer à du -cb en find -exec, qui a sous-compté sur ce repo)

# Détection des dossiers _new-* et leur contenu
find site/img -type d -name "_new-*" -exec find {} -type f \; | sort

# Vérif consommation (grep basename dans le corpus JS/HTML)
grep -rl "dinos/grok/" site/*.html site/js
grep -rl "dinos/wiki/" site/*.html site/js
grep -rn "fond_desert_coloriage" site/*.html site/js/*.js

# Vérif liens cassés paleoart (référencé vs présent sur disque)
node -e "
const fs=require('fs');
const dir='site/img/dinos/paleoart';
const files=new Set(fs.readdirSync(dir));
const js=fs.readFileSync('site/js/gen/dinos-assets.js','utf8');
const re=/paleoart\/([A-Za-z0-9_.\-]+\.(webp|jpg|png))/g;
let m, refs=new Set();
while(m=re.exec(js)) refs.add(m[1]);
const missing=[...refs].filter(r=>!files.has(r));
console.log('refs:',refs.size,'missing:',missing.length, missing);
"

# Docs de référence lus pour ne pas retrancher ce qui l'a déjà été
cat site/img/INDEX.md
cat studio/dino/content/sources/_audit-images-2026-09/_TABLEAU-DE-BORD.md
cat docs/handoffs/rapports/HO-R07.md   # assets morts déjà traités (sounds/, decor.js, pins.js…)
cat memory/audits/gc-2026-09-12.md     # gc.mjs — .artifacts >14j déjà détecté
```
