# Rapport HO-R14 — Routine `npm run gc`

## Fichiers créés / modifiés

- **Créé** `scripts/gc.mjs` — routine de garbage collection en lecture seule (--fix limité aux deux déplacements sûrs autorisés).
- **Modifié** `package.json` — ligne `gc` : `echo … && exit 1` → `node scripts/gc.mjs`. Aucune autre ligne touchée (HO-R13 tourne en parallèle sur `check`, `build` reste intact).
- **Modifié** `memory/DOCTRINE.md` — section normative `## Rotation — npm run gc (HO-R14, 2026-09-12)` ajoutée en fin de fichier. L'addendum 2026-09-03 existant (qui dit que `memory/DOCTRINE.md` n'existe plus) est laissé verbatim — c'est une archive, elle ne se réécrit pas — avec une note explicite que la section gc la rend périmée.
- **Modifié** `docs/handoffs/README.md` — paragraphe ajouté sous « Cycle de vie d'un handoff » expliquant ce que `npm run gc` détecte automatiquement sur ce cycle (la transition finale `fait` → `archives/`) et ce qu'il ne remplace pas.
- **Modifié** `docs/handoffs/HO-R14-routine-gc.md` — champ Statut : `pret` → `rapport reçu`.
- **Produit** `memory/audits/gc-2026-09-12.md` — premier rapport gc (353 lignes), régénéré à chaque exécution.

Aucun autre fichier touché. Aucune commande git en écriture.

## Porte de vérification : `time npm run gc`

```
real  0m3.343s   (run propre, hors les runs de mise au point)
```

< 60 s, largement (le scan complet du repo — ~3600 fichiers texte, 1077 images, 505 audios/langue — tient en 2 à 6 s selon la charge machine).

## Bugs trouvés et corrigés pendant la mise au point

Trois bugs de faux positifs/négatifs ont été trouvés en testant la porte « 0 faux positif », et corrigés avant la version livrée :

1. **Suffixes audio trop permissifs** : la première version dérivait les suffixes attendus en scannant tous les `-xxx.mp3` du disque, ce qui incluait des fragments de noms de dinos coupés au tiret (`dico-acro.mp3`, `dico-brachio.mp3`…) et polluait le produit cartésien avec ~130 « suffixes » bidons. Corrigé : suffixes de fiche fixés à la liste réelle (`-nom`, `-funfact`, `-recap`, `-regime`, `-taille`), et les familles transverses (`menu-`, `recit-`, `ere-`, `dico-`, `special-`) sont désormais comptées à part, pas comme anomalie.
2. **Images `plantes/` et `paleoart/` en faux positif systématique** : ces dossiers sont référencés par pattern dans le code (`p.png.replace(/\.(jpg|png)$/, '_detail.$1')` dans `dev-dinos.html:1295`, `baseName(d.png) + '_coloriage.webp'` dans `mj-32.html`), donc le nom exact du fichier n'apparaît jamais tel quel dans le corpus texte. Corrigé : pour ces deux dossiers, le script reconnaît aussi le radical (nom sans le suffixe `_detail/_coloriage/_ecosysteme/...`) comme preuve de référence.
3. **Corpus de recherche concaténé sans séparateur** entre fichiers : une sous-chaîne cherchée pouvait exister « à cheval » sur la fin d'un fichier et le début du suivant, créant un faux négatif (image comptée comme référencée alors qu'elle ne l'est nulle part). Corrigé avec un séparateur unique entre fichiers.
4. **Auto-référence du rapport** : le scan des `.md` incluait son propre rapport précédent (`memory/audits/gc-<date>.md`), donc un fichier listé comme « non référencé » au run N réapparaissait « référencé » au run N+1 (il était cité dans son propre rapport). Corrigé : le script exclut ses rapports datés du corpus de recherche. Vérifié déterministe sur 5 exécutions consécutives après ce correctif.

## Vérification des 10 images signalées (0 faux positif)

Échantillon : 5× `site/img/dinos/traces/*_trace.png`, 4× `site/img/dinos/_new-*/*`, 1× `site/img/maxplay-icon.svg`.

Pour chacune, `grep` du basename exact sur tout le dépôt (hors le rapport gc lui-même) : **0 occurrence** dans du code ou de la doc vivante.
- `traces/*_trace.png` : seule mention trouvée dans tout le repo est `_audit-fiches-complet.cjs` qui *compte* les fichiers de ce dossier pour un audit — aucun `<img>`, aucun chemin dans `dinos-assets.js`. Cohérent avec P7 de l'audit source (« sons/traces morts », déjà dans le périmètre HO-R07 pour suppression).
- `_new-*/*` : dossiers non trackés par git (confirmés dans `git status` en tête de session) — assets en attente d'intégration, jamais référencés par le site.
- `maxplay-icon.svg` : seules les variantes dimensionnées (`maxplay-icon-180.png`, `-192.png`, `-512.png`, `-maskable-*.png`) sont référencées dans `index.html`, `manifest.json`, `sw.js`. Le SVG source, lui, n'est cité nulle part — probable fichier source resté après génération des PNG.

**0/10 faux positif.**

## Vérification des 10 audios signalés (0 faux positif)

Échantillon : `menu-dico`, `menu-familles`, `recit-cretace`, `ere-ceno`, `dico-a`, `dico-acro`, `special-extinction-a`, `special-extinction-recap`, `menu-ep-cretace`, `recit-glace-mammouth` (tous `site/audio/dinos/fr/*.mp3`).

Pour chacun : le slug avant le premier tiret significatif (`menu`, `recit`, `ere`, `dico`, `special`) n'est **pas** un id de `studio/dino/content/dinos/*.json` (vérifié contre les 71 fiches), donc aucun ne peut appartenir au produit cartésien fiche × suffixe × langue — ce sont des audios transverses (menus UI, récits d'époque, dictionnaire de prononciation, spéciaux extinction/Pangée), une catégorie différente et légitime, pas une anomalie. Le rapport les compte séparément (150 fichiers) sans les lister comme problème.

**0/10 faux positif** — et 0 anomalie réelle détectée sur l'audio dino cette exécution (le produit cartésien fiche × suffixe × langue est intégralement couvert).

## Résumé chiffré du premier rapport gc (2026-09-12)

| Rubrique | Résultat |
|---|---|
| Handoffs `fait` hors `archives/` | 0 |
| `LESSONS.md`/`TODO.md` > 20 Ko | 0 (le plus gros, `studio/minijeux/memory/LESSONS.md`, fait 20273 octets = 19,8 KiB, juste sous le seuil de 20 Ko = 20480 octets — à surveiller au prochain ajout) |
| `.artifacts/` > 14 jours | 164 fichiers (captures Playwright, un seul dossier `studio/minijeux/tests/.artifacts`) |
| `inbox/` > 48h | 7 fichiers, tous dans `studio/narration/inbox/` (hors périmètre campagne, D-011) — `studio/minijeux/inbox/` ne contient que son README |
| Liens markdown cassés | ~130 (essentiellement dans des archives narration/dino/minijeux et 3 gabarits ; quelques-uns dans du vivant : `studio/dino/CLAUDE.md`, `studio/dino/INDEX.md`, `studio/dino/figees/encyclopedie.md` → tous vers `../../site/js/dinos-data.js`, qui a été renommé/déplacé par HO-R12 en cours) |
| Images non référencées | 34 (15 `traces/`, 18 `_new-*`, 1 icône SVG) |
| Audio hors produit cartésien | 0 anomalie ; 150 fichiers transverses comptés à part |
| `ORPHELINS_ASSUMES` obsolètes | 20/20 (voir Questions) |
| Branches git mortes | 0 (seule `master`/`origin/master` existent) |

## Questions

1. **Liens cassés vers `site/js/dinos-data.js`** (`studio/dino/CLAUDE.md`, `INDEX.md`, `figees/encyclopedie.md`) : probablement un effet de bord de HO-R12 (fiche canon dino) en cours dans une autre vague/lane — signalé, non corrigé (hors fichiers autorisés de ce brief).
2. **`studio/minijeux/memory/LESSONS.md` à 19,8 KiB**, à 0,2 KiB du seuil de 20 Ko : rien à corriger maintenant, mais le prochain ajout le fera probablement basculer — signalé pour anticipation, pas une anomalie de cette exécution.
3. **Héritage HO-R07 — `ORPHELINS_ASSUMES`** : les 20 entrées de `studio/referentiel/couverture.mjs` (sons Mario/Pikachu/Zelda/etc.) pointent toutes vers des fichiers qui n'existent plus sur le disque. `couverture.mjs` n'a pas été modifié (hors fichiers autorisés de ce brief) — la liste devrait être vidée ou ces entrées supprimées par la lane qui possède ce fichier.
4. **`site/img/dinos/sprites/` et `paleoart/`** : HO-R13 tournant en parallèle dessus (conversion webp), le script les traite en catégorie séparée « en mouvement, ne pas conclure » — cette exécution n'a rien signalé dans ces deux dossiers (tout y est référencé au moment du scan), donc rien à trancher ici pour l'instant.
5. **Rotation des rapports `gc-<date>.md` eux-mêmes** : pas de mécanisme de purge prévu (un rapport par jour d'exécution, potentiellement redondant si `gc` tourne souvent). Noté dans `memory/DOCTRINE.md` comme point à revoir si le nombre de rapports devient gênant, mais pas de décision prise ici.

## Résumé (10 lignes)

`scripts/gc.mjs` est livré, lecture seule, < 4 s d'exécution, rapport dans `memory/audits/gc-2026-09-12.md`.
`package.json` : ligne `gc` seule modifiée, `node scripts/gc.mjs`.
`memory/DOCTRINE.md` et `docs/handoffs/README.md` mis à jour avec la doctrine et le lien au cycle de vie.
Trois bugs de faux positifs/négatifs trouvés et corrigés pendant la mise au point (suffixes audio, images à pattern, corpus sans séparateur, auto-référence du rapport).
10 images et 10 audios vérifiés à la main : 0 faux positif des deux côtés.
Premier rapport : 164 fichiers `.artifacts` obsolètes, 7 fichiers `inbox` narration (hors périmètre), ~130 liens cassés (surtout archives), 34 images orphelines, 0 anomalie audio dino, 20 entrées `ORPHELINS_ASSUMES` obsolètes (hérité HO-R07, non corrigé).
Aucune suppression, aucune commande git.
5 questions posées à l'orchestrateur, notamment sur `dinos-data.js` (probable effet HO-R12) et le sort de `ORPHELINS_ASSUMES`.
Statut du brief passé à « rapport reçu ».
