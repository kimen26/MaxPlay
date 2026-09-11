# Audit d'architecture GED — `site/` ↔ `studio/` (2026-09-12)

> Périmètre : arborescence complète du repo (site déployé, 5 pôles studio, infra, gouvernance `.claude/`, mémoire, archives, historique git, Supabase).
> Méthode : 5 cartographies parallèles (site, minijeux, dino, narration+lunii+referentiel, infra+gouvernance) + mesures directes (`du`, `git ls-files`, `git cat-file`, MCP Supabase). Chiffres relevés le 2026-09-12, aucune modification faite.
> Posture : critique d'architecte senior, pas d'inventaire flatteur. Ce qui marche est dit en une ligne, ce qui coince est chiffré.

---

## 0. Résumé exécutif

MaxPlay n'a **pas un problème d'architecture, il a un problème de cycle de vie**. Le noyau technique est bon : hub piloté par `catalog.js`, 36 jeux sur un shell commun, CI à deux vitesses, `cloud.js` local-first, référentiel de contenu outillé, discipline documentaire rare pour un projet solo. Mais **rien ne sort jamais** : ni les binaires, ni les archives, ni les handoffs terminés, ni les leçons, ni les agents inutilisés, ni les tables mortes. Tout est ajouté, documenté, et jamais retiré.

Cinq chiffres qui résument :

| Mesure | Valeur | Lecture |
|---|---|---|
| Historique git | **3,82 Go** de pack pour 2,2 Go de working tree | le repo est un entrepôt, pas un dépôt de code |
| Blobs `site/` dans l'historique | **2,1 Go** pour 805 Mo réels | chaque régénération d'asset a empilé une version |
| `_archive/` | **6 142 fichiers trackés = 46 %** du repo | une seule entrée (tiles Max Adventure) = 6 050 fichiers |
| Audio tiers sous droits versionné | **~290 Mo** (12 livres audio commerciaux ×2 + Gérard Philipe) | risque juridique + poids irrécupérable sans réécriture |
| Contexte auto-chargé par pôle | `LESSONS.md` 68-70 Ko + `TODO.md` 39-47 Ko | ~35 000 tokens par tour, premier poste de coût |

Verdict Supabase : **à garder, réduit à 4 tables sur 11**. Il porte les deux seules boucles montantes qui servent (télémétrie `pings`, annotations tablette → atelier). Le vrai risque n'est pas Supabase, c'est le second MCP branché sur un projet étranger.

---

## 1. Ce qu'on a — inventaire chiffré

### 1.1 Volumes

| Zone | Mo | Fichiers | Trackés git | Rôle réel |
|---|---|---|---|---|
| `site/` | 805 | 3 325 | 3 296 | artefact déployé GitHub Pages (branche `master`, `cp -r site/* _site/`) |
| `studio/dino/` | 266 | 2 325 | — | autoring encyclopédie ; code déployé dans `site/` |
| `studio/lunii/` | 894 | 907 | 305 | **684 Mo de `.build-*` gitignorés jamais purgés** ; 210 Mo d'assets trackés |
| `studio/minijeux/` | 40 | 511 | — | gouvernance + tests ; le code vit dans `site/` |
| `studio/narration/` | 18 | 898 | — | usine à texte, 8 stories, 1 canon |
| `studio/referentiel/` | 2 | 43 | — | registre transverse textes/sons |
| `_archive/` | 110 | 6 142 | 6 142 | 13 entrées, toutes documentées dans `INDEX.md` |
| `infra/` | 2 (+106 node_modules) | 153 | 26 | bot Telegram, MCP llm-copains, migrations Supabase |
| `.claude/` | 3 | 83 | 81 | 20 agents, 9 rules, 5 hooks, 6 skills, 3 commandes |
| `memory/` | 1 | 13 | 13 | quintette transverse + GLOSSAIRE, VISION, MAX_PROFILE |

Poids par nature : **mp3 1 233 Mo · png 364 Mo · jpg 225 Mo · md 18 Mo · json 13 Mo · js 4 Mo · html 3 Mo**. Le code représente moins de 1 % du poids.

### 1.2 Ce qui est propre (à ne pas casser)

- **`site/js/catalog.js`** : source de vérité unique du menu, `index.html` n'a aucun `mj-XX` en dur, gouvernance `retire`/`parental`/`refonte` datée. La meilleure pièce du site.
- **`mj-shell.js`** : 36/36 jeux migrés, chargeur séquentiel de 22 modules, `audit-gabarit` à 0 bloquant.
- **CI** : porte bloquante statique pure node dans `deploy.yml`, Playwright séparé dans `test-minijeux.yml` pour ne jamais retenir la publication. Décision juste, argumentée en commentaire.
- **`cloud.js`** : local-first assumé, SDK chargé à la demande, merge anti-perte par union d'historique, whitelist de 8 clés. Le site marche sans compte et sans réseau (pour les données).
- **`studio/referentiel/`** : séparation constater/décider, lecture seule par défaut, un seul script qui écrit (`acquitter.mjs`), langue dans la clé, `texte_verifie` honnête. Vivant (dernier run 2026-09-05), câblé dans les deux audits PMO.
- **Narration** : gabarit à préfixes d'étapes respecté sur 8/8 stories, rules réduites à des pointeurs avec bandeaux de dégraissage datés, abandons purgés sans cadavre.
- **Lunii** : `packs-manifest.json` avec règle de dépôt et sync non destructif (protège les enregistrements de l'enfant), « aucun TTS ici, on emballe du canon » (rebuild sans clé API), dérivés ffmpeg et non copies.
- **Gouvernance** : `_archive/INDEX.md` 13/13, registre handoffs à jour, 9 rules toutes path-scopées, séparation skills locaux/globaux sans un seul doublon, `garde-git-add.ps1` né d'un incident réel.
- **Chaîne i18n mini-jeux** : extraction FR → traduction → check → bundle généré. Source unique, porte de vérification.

### 1.3 Supabase — état réel

Projet **WexWorld** (`bfrugwrzpefsaehsvypt`, eu-west-1). Zéro edge function. Le MCP `supabase-maxvoyage` (`pipubhzrbefehdaquyms`) est un autre projet, sans aucune occurrence dans le repo.

| Table | Lignes | Client | Verdict |
|---|---|---|---|
| `pings` | 397 | `ping.js` (REST direct) | **vivante** — seule table avec du volume |
| `annotations` | 54 | `cloud.js`, `auteur.html` | **vivante** — feedback tablette → atelier, impossible en local |
| `child_profiles` / `progression` / `consents` | 2 / 2 / 2 | `cloud.js` | un seul foyer ; construit, pas utilisé |
| `child_state` / `game_sessions` | 0 / 0 | câblées | jamais écrites en prod |
| `feedback` | 0 | aucun | **morte** (commentaire en base le dit) |
| `tile_refs` | 1 | aucun | **orpheline** (pipeline tiles archivé HO-G13) |
| `reset_events` / `usage_stats_anon` | 0 | via RPC | dormantes |

`cloud.js` (645 lignes) est chargé par 5 pages HTML sur 44. URL + clé publishable dupliquées en dur dans `cloud.js` et `ping.js`.

---

## 2. Diagnostic — les 8 problèmes structurels

### P1 — Le repo est un entrepôt de binaires (CRITIQUE)

- Top 10 des blobs de l'historique = 234 Mo, tous des MP3/PDF de `studio/dino/content/inbox/` et `studio/lunii/assets/audio/`. Deux « Pierre et le loup » de 68 et 37 Mo **déjà supprimés mais toujours dans les packs**.
- **`content/inbox/` est versionné** : une boîte de réception, c'est du transit par définition. 12 MP3, 147 Mo.
- **Audio tiers sous droits** : les 12 mêmes livres audio commerciaux existent en double (`dino/content/inbox/` 147 Mo + `lunii/assets/audio/histoires-dodo/` 120 Mo), plus `pierre-et-le-loup-gerard-philipe.mp3` (droits voisins interprète + producteur toujours courants même si Prokofiev est DP). **Aucune trace de provenance** dans le pôle. Copie privée couvre l'écoute familiale, pas la publication d'un repo.
- `sounds/` racine : 15 rips bruts non renommés (`pikachu_mw38Ry2.mp3`, `victory-mario-series…`, `ff7_victory.mp3`, `sncf-france-jingle.mp3`) **publiés sur GitHub Pages**.
- `_archive/` : 46 % des fichiers trackés, dont 6 050 pour un seul tileset abandonné. `git rm --cached` ne rend aucun octet (blobs dans l'historique) mais divise par deux le temps de tout outil qui parcourt le tree.
- `studio/lunii/.build-*` : 684 Mo gitignorés, triple copie (source + staging SHA-1 + zip), livrable déjà dans `~/.studio/library/`. Suppression sans perte.
- `.gitignore` liste les zones `_new-*` une par une : **4 dossiers de staging (~16 Mo) y échappent** (`_new-fonds`, `_new-plantes-coloriage`, `_new-plantes`, `_new-audit`). Un `git add -A` suffit.
- `infra/bot/*.log` modifiés à chaque session, non ignorés : `git status` sale en permanence.

**Conséquence** : `.git` 3,98 Go, clone impraticable, 9 packs jamais gc, 970 objets prune-packable. Seule une réécriture d'historique (`git filter-repo`) récupère les gigaoctets.

### P2 — `site/` mélange artefact, sources, générés et brouillons (HAUTE)

- **14 fichiers JS portent un marqueur « généré »** mais leurs générateurs vivent dans `studio/` : le dossier déployé ne contient pas sa chaîne de build. Rien ne distingue visuellement `mj-golden.js` (écrit main) de `dinos-assets.js` (généré). Un agent qui édite le mauvais perd son travail à la prochaine régénération.
- Placement incohérent : `lecture-data.js` à la racine, `dinos-data.js` dans `js/`.
- Brouillons livrés en prod : 9 dossiers `img/dinos/_new-*` (~35 Mo), `sounds/phonemes-test/` (65 fichiers à côté de `phonemes/` retenu), `music/generique-v1/v2/v3` + `victoire-v1..v4`, `design-shared/mockup.{css,js}` référencés par personne, `voices-manifest.js` stub vide chargé pour rien, `img/dinos/traces/` (15 fichiers, aucune référence).
- **Aucun service worker.** Manifest PWA lié par 12 HTML sur 44, zéro `navigator.serviceWorker`. 790 Mo d'assets, rien en cache offline : un enfant sans réseau n'a rien. Le local-first de `cloud.js` est vrai pour les données, faux pour les assets.
- Dépendance CDN jsDelivr pour le SDK Supabase, non mirrorée.

### P3 — La source de vérité est éclatée (HAUTE)

**Dino** : le même fait existe en 4 copies sans lien mécanique. Vérifié sur `ankylosaurus` : `dinos-data.js` (7,5 m · 1,8 m · 6 t · 7 km/h) → en-tête recopié à la main dans `scripts-audio/fr/V3/ankylosaurus.md` → corps narré du même .md → `_seg-ankylosaurus-taille.json` → MP3 déployé. ×4 langues. Corriger une taille dans la data ne propage rien ; les vérificateurs contrôlent la forme (mots interdits, quota Tritri), jamais la cohérence data ↔ narré. **`dinos-data.js` (133 Ko) est la source déclarée et le seul maillon non outillé** : lu par 4 scripts, alimenté par aucun, édité par l'agent. `_gen-etat-dinos.cjs` le parse par regex : un reformatage casse le tracker silencieusement.

**Mini-jeux** : livrer un jeu exige de toucher **9 emplacements minimum, 13 avec le Mur, l'audio et la mémoire** (html, catalog, figée, spec, TODO, CHANGELOG, i18n ×4, bundles ×3, référentiel, textes-jeux, mur.js). Aucun script de cohérence. Preuve du coût : **`mj-58` supprimé le 2026-08-10 vit encore dans `site/js/mur.js`** (prod), et **9 jeux vivants (25 % du parc) sont absents du Mur**. `mur.js` référence des mj à 61 endroits en dur alors que `catalog.js` existe.

**Il n'existe pas de gabarit source de mini-jeu.** `mj-gold-a`/`mj-gold-b` ont été supprimés à la purge et remplacés par « le standard est incarné par du JS runtime ». Résultat sur mj-55/57/59 : noyau conforme, mais 3 combinaisons de dépendances différentes, `mj-59` sans `mj-kit`, `mj-55` sans `buildPips`, 344 à 498 lignes. Créer un jeu = copier un existant au jugé.

**Lunii** lit des chemins en dur d'autres pôles (`studio/dino/content/lunii/familles`, `site/img/dinos/paleoart`) et recopie physiquement l'audio (`prepare-dino-assets.mjs`) : régénérer un MP3 de fiche ne met pas à jour le pack.

### P4 — Pas de garbage collection : rien ne sort (HAUTE)

- **Handoffs** : 14 terminés sur 16 encore dans `docs/handoffs/` (racine), 8/8 dans `minijeux/docs/handoffs/`, tous avec `Statut : pret` en interne alors que le registre dit « fait ». `HO-G12` marqué « bloqué par vague 2 » alors que ses deux bloqueurs sont `fait`. Aucun `_done/` nulle part. `HO-G11` n'existe pas.
- **Docs périmées** : 27 md vivants de `minijeux/docs/` citent des jeux supprimés (28 mj fantômes sur 65 cités). **5 figées actives (mj-46, 48, 49, 51, 53) et `figees/menu.md` parlent de jeux morts** — et le hook `figees-injector` les réinjecte comme loi à chaque édition. 5 jeux vivants sans figée (`mj-28, 30, 35, 40, 42`). `INDEX.md` minijeux : 6 liens morts sur 9, dernière MAJ 2026-06-04. `EQUIPE.md` pointe vers `pmo/` supprimé le 2026-09-03 ; **20 fichiers citent encore `pmo/`**, dont l'agent `game-pmo.md` lui-même.
- **Mémoire** : le « quintette » compte 7 fichiers racine par pôle + sous-arbres ; `archive/` et `audits/` des 3 pôles sont **vides** alors que `LESSONS.md` fait 68-70 Ko et `TODO.md` 39-47 Ko. La doctrine de rotation existe et n'a jamais tourné.
- **Inbox** : règle 48 h, un PNG de 2,1 Mo au nom GUID depuis 50 jours (facteur 25).
- **Git** : branches `origin/main` et `reorg/2026-04-30` mortes ; `main` prête à confusion avec `master` qui déploie.
- **Supabase** : 2 tables mortes, 2 jamais écrites, un second MCP sur un projet étranger.
- **Tests** : `.artifacts/` 28 Mo sans TTL, captures de `mj-04` supprimé en août.
- **Narration** : `002-libellule-resonance` = 253 fichiers dont 212 d'archive (6 vagues sans converger : problème de brief, pas d'archivage) ; 12 MP3 `_TEST-*` de direction audio logés dans la story 001 alors qu'ils sont transverses.

### P5 — La gouvernance a dépassé le produit (MOYENNE)

- **20 agents, 10 sans point d'entrée déclaré** (jamais cités par un CLAUDE.md, skill ou commande). **10 agents pour NARRATION qui n'a rien livré** (7 stories sur 8 gelées à l'étape 5 sur un seul goulot humain, zéro texte et zéro audio exposés aux enfants), 5 pour les mini-jeux en production.
- **Hooks** : ~9 lancements de processus par tour typique (7 PowerShell + 2 Python). Chaque `Edit` paie 3 processus (figees-injector + sync-agents-md + hook INBOX) alors que 99 % des éditions ne concernent aucun des trois. Le filtrage se fait dans le script, après le coût de démarrage. `PermissionRequest` dépend en dur de `localhost:3001` (santé du bot).
- **Triplication des verrous dino** : `.claude/rules/dino.md` + `studio/dino/CLAUDE.md` + `figees/encyclopedie.md` répètent Tritri, échelle honnête, 5 onglets, checklist 8 axes. `nouveau-dino` (skill) double `_PLAYBOOK-DINO-NOUVEAU.md`. `dino-images-lunii` embarque le system prompt paléoart qui est l'objet de `dino-paleoart`.
- Rules qui se cumulent : `studio/narration/stories/**` charge 3 rules ; `site/js/dinos-audio-manifest.js` charge `mini-jeux` + `sons` + `dino`.
- 4 `AGENTS.md` de pôle écrits à la main sans détection de dérive (seul le racine est généré) ; 3 hooks `.kimi.ps1` portés à la main. Justifié par l'usage réel (bot en `BACKEND=kimi`), mais fragile.
- `.claude/` est touché dans 3 commits sur 4 des 200 derniers : la méta bouge presque autant que le produit.

### P6 — Duplication du runtime malgré le shell (MOYENNE)

- **13 300 lignes de JS inline** dans les 36 mj (369 par jeu, 1 385 pour `mj-32`). Le shell norme le cadre, jamais le contenu.
- 9 `speak()` locaux ; **3 appels `speechSynthesis` bruts** (`dev-dinos.html` ×2, `mj-20`, `mj-31`) qui court-circuitent le respell phonétique de `lexique-fr.js` : bug latent de prononciation des noms de dinos.
- 5 confettis locaux face à `MaxFX.confetti()` ; 4 boutons retour en dur par-dessus `back-button.js` ; `decor.js` et `pins.js` orphelins parce que recopiés dans `mj-kit.js` et `regle-info.js` ; `@font-face` Cursif recopié dans 4 mj.
- `mur.css` 50 Ko pour une seule page, plus que le thème global.

### P7 — Frontières de pôle poreuses (BASSE)

- 3 scripts DINO dans `studio/minijeux/tools/` et `scripts/` (`gen-dinos-assets.mjs`, `_check-catalogue-dino-i18n`, `_check-ombres-dino`), non documentés dans le README de `tools/`.
- `gen_avatars_manifest.py` : seul Python d'un repo JS. Frontière `tools/` vs `scripts/` définie nulle part.
- `docs/handoffs/` mélange deux séries de numérotation (`HO-G*` transverse, `HO-0xx` dino).
- `temp/audit-fiches.cjs` (gitignoré) quasi-doublon de `export/_audit-fiches-complet.cjs`.
- `tests/` a son propre `package.json` : îlot npm invisible depuis la racine, aucun script racine.

### P8 — Assets non optimisés (BASSE, mais 150-200 Mo)

- 372 PNG à 340 Ko de moyenne (sprites 501 Ko), alors que WebP est déjà utilisé pour 82 coloriages. Sprites + paléoart en WebP q80 ≈ 150-200 Mo récupérés.
- `grok/` + `wiki/` = 63 Mo pour de la galerie secondaire.
- Casse incohérente `pt-BR` (sounds) vs `pt-br` (audio). 12 langues audio, 3 packs de strings.

---

## 3. Supabase — faut-il le garder ?

**Oui, réduit.** Raisonnement :

- Tout localStorage + export JSON couvrirait 100 % de l'usage constaté (un foyer, un appareil)… **mais casserait `annotations` et `pings`**, les deux seules boucles montantes qui marchent. GitHub Pages ne sait pas recevoir.
- Un JSON statique convient au contenu descendant, pas à des flux montants.
- Ce qu'on garde : `pings`, `annotations`, `consents` (traçabilité RGPD, non négociable dès un second foyer), auth magic link (le code à 6 chiffres résout un vrai problème PWA iOS).
- Ce qu'on tranche : `feedback` et `tile_refs` → migration de suppression. `child_state` et `game_sessions` → on branche ou on retire, pas d'entre-deux à 0 ligne.
- `cloud.js` reste tel quel : bien conçu, coût nul tant qu'on n'y touche pas, prêt pour un deuxième foyer.
- **Débrancher le MCP `supabase-maxvoyage`** de ce projet : un risque d'appliquer une migration au mauvais projet, aucune contrepartie.
- Piste non exploitée : Supabase Storage (1 Go gratuit, CDN) pourrait héberger les 790 Mo d'assets et sortir les binaires du repo de code. À évaluer seulement si la voie « filter-repo + gitignore strict » ne suffit pas.

---

## 4. Cible — comment ranger pour retrouver, utiliser, simplifier

Principe directeur : **quatre natures de fichiers, quatre lieux, jamais mélangés**.

| Nature | Où | Règle |
|---|---|---|
| **Source** (texte canon, JSON, md, scripts) | `studio/<pôle>/content/` et `studio/<pôle>/scripts/` | seule chose qu'un humain ou un agent édite |
| **Généré** | `site/js/gen/` | jamais édité à la main, régénéré par `npm run build`, en-tête `// GÉNÉRÉ par <script>` |
| **Artefact déployé** | `site/` | ce que voit GitHub Pages ; contient du généré + du runtime écrit main, jamais de brouillon |
| **Transit / brut / archive** | **hors repo** (`~/MaxPlay-vault/`) | inbox, sources HD, `.build-*`, tiles abandonnées, audio tiers |

### 4.1 Arborescence cible

```
MaxPlay/
├── package.json                 ← UN point d'entrée : build · check · test · deploy
├── CLAUDE.md · AGENTS.md · README.md
├── .gitignore                   ← patterns génériques : **/_new-*/ · **/inbox/*.mp3 · **/.build-*/ · **/*.log
│
├── site/                        ← ARTEFACT déployé
│   ├── index.html · compte.html · suivi.html · auteur.html · confidentialite.html
│   ├── mj-XX.html               ← inchangé (URLs stables), 36 jeux
│   ├── dev-dinos.html · lecture.html · avatar-atelier.html
│   ├── sw.js                    ← NOUVEAU : precache coquille + runtime cache assets
│   ├── manifest.json
│   ├── css/                     ← mp-theme, style, mj-kit, mur (inchangé)
│   ├── js/                      ← runtime ÉCRIT MAIN uniquement
│   │   └── gen/                 ← NOUVEAU : tout le généré (dinos-data, dinos-assets, audio-manifest,
│   │                               textes-jeux, lecture-data, i18n bundles, racines, plantes, avatars)
│   ├── audio/ · img/ · sounds/ · video/   ← binaires déployés, ZÉRO staging, ZÉRO test, WebP par défaut
│   └── _template/mj-template.html          ← NOUVEAU : gabarit source d'un mini-jeu
│
├── studio/
│   ├── _shared/                 ← NOUVEAU : lib commune aux scripts (client ElevenLabs, ffmpeg, i18n, fs)
│   ├── minijeux/
│   │   ├── CLAUDE.md · INDEX.md
│   │   ├── docs/{specs,figees,handoffs/{_done}}   ← mockups et captures SORTENT de docs/
│   │   ├── scripts/             ← fusion tools/+scripts/ ; scripts dino RENDUS au pôle dino
│   │   ├── tests/               ← inchangé, mais exposé par le package.json racine
│   │   ├── i18n/                ← inchangé
│   │   └── memory/              ← 5 + INVARIANTS + archive/ tournante
│   ├── dino/
│   │   ├── content/
│   │   │   ├── dinos/<id>.json  ← NOUVEAU : UNE fiche canon par dino (chiffres, noms, textes FR)
│   │   │   ├── sources/         ← refs textuelles ; refs visuelles lourdes → vault
│   │   │   ├── scripts-audio/   ← .md GÉNÉRÉS depuis dinos/<id>.json (en-tête chiffres), corps narré édité
│   │   │   ├── i18n/ · lunii/ · data/
│   │   │   └── (inbox/ SUPPRIMÉ du repo)
│   │   ├── scripts/             ← export/ audio/ images/ etancheite/ + check-coherence-data-narre.cjs
│   │   ├── docs/{handoffs/{_done}}
│   │   ├── figees/ · memory/
│   ├── narration/               ← inchangé (déjà propre) ; _TEST-*.mp3 → studio/narration/audio-lab/
│   ├── lunii/
│   │   ├── assets/              ← UNIQUEMENT contenu MaxPlay ; audio tiers → vault
│   │   ├── scripts/             ← 1 moteur build-pack.mjs + 5 configs pack-<nom>.json
│   │   └── (.build-*/ purgés après chaque build)
│   └── referentiel/             ← inchangé
│
├── infra/                       ← inchangé ; logs gitignorés ; migration 013 = drop feedback + tile_refs
├── memory/                      ← inchangé
├── docs/handoffs/{_done}        ← 14 HO terminés descendent
└── (_archive/ → vault, zip daté, INDEX.md conservé dans le repo comme pointeur)
```

### 4.2 Les cinq mouvements qui changent la donne

**M1 — Sortir les binaires du repo (une opération planifiée, irréversible pour les clones).**
`git filter-repo` sur : `studio/dino/content/inbox/`, `studio/lunii/assets/audio/{histoires-dodo,pierre-loup}/`, `_archive/2026-09-05-max-adventure-tiles/`, `*.pdf` > 5 Mo, versions mortes de `site/audio/**`. Puis `.gitignore` générique et `git gc --aggressive`. Gain attendu : 3,8 Go → ~1 Go. Prérequis : une seule machine cloneuse (la tienne) + le runner CI qui re-clone de toute façon. Le bot Telegram tourne sur le même working tree, pas concerné.

**M2 — Un `package.json` racine et un dossier `site/js/gen/`.**
`npm run build` régénère tout le généré, `npm run check` lance audit-gabarit + check-mj-coherence + check-liens-md + référentiel, `npm run test` lance Playwright. Le déploiement CI appelle `build` puis `check`. Fin de l'ambiguïté « écrit main ou généré ».

**M3 — Une fiche canon par dino.**
`studio/dino/content/dinos/<id>.json` devient la source unique. Générateurs : `dinos-data.js`, en-tête chiffrée des `.md` audio, corpus i18n. Un `check-coherence-data-narre.cjs` diff les nombres du narré contre la fiche et échoue si écart. C'est le seul moyen de rendre les 4 copies inoffensives.

**M4 — `mur.js` piloté par `catalog.js` + gabarit source + script de cohérence mj.**
`mur.js` cesse de lister des ids : il lit `catalogVisible()` et une table `zone` ajoutée à chaque entrée du catalogue. `site/_template/mj-template.html` fixe la combinaison de dépendances. `check-mj-coherence.mjs` vérifie pour chaque jeu du catalogue : html présent, figée présente, spec présente, 4 strings.json, entrée référentiel. Bloquant en CI.

**M5 — Service worker + WebP.**
`sw.js` : precache de la coquille (html du menu, css, js runtime), cache runtime « stale-while-revalidate » pour audio/img à la première lecture. Script `webp-convert.mjs` sur `sprites/` et `paleoart/` (q80), mise à jour des générateurs de manifests. Impact utilisateur direct (avion, voiture), effort borné.

### 4.3 Garbage collection — la routine qui manque

À câbler une fois, puis mensuel (une commande `npm run gc` qui liste, ne supprime pas) :

- handoffs `fait` → `_done/` ; briefs dont le statut interne ≠ registre → alerte
- `LESSONS.md` > 20 Ko → les leçons de plus de 90 jours descendent dans `memory/archive/lessons-<année>.md` (le numéro L-NNN reste unique, la doctrine d'archive intacte)
- `TODO.md` : lanes fermées → CHANGELOG à la release, pas un mois plus tard
- `tests/.artifacts/` : TTL 14 jours
- `studio/lunii/.build-*` : purge post-build dans le script même
- inbox > 48 h → alerte
- liens `.md` cassés → alerte (script déjà prévu dans les handoffs infra)
- fichiers `site/` non référencés (images par basename, audio par produit cartésien slug × suffixe × langue depuis `dinos-data.js`) → liste

### 4.4 Ce qu'on NE fait PAS (anti sur-ingénierie)

- Pas de bundler, pas de framework, pas de TypeScript côté site : le vanilla HTML tient, le shell fait le travail.
- Pas de monorepo `apps/` + `packages/` : un seul déployable, un seul dev.
- Pas de déplacement des `mj-XX.html` dans un sous-dossier : URLs stables, catalogue, tests et figées y font référence. Le gain est cosmétique, le risque réel.
- Pas de Git LFS : quota GitHub 1 Go partagé stockage + bande passante, et le runner Pages devrait tirer le LFS à chaque déploiement. Pire que le problème.
- Pas de nouveau pôle, pas de nouvel agent. On en retire.

---

## 5. Plan par rendement

| # | Action | Effort | Gain | Risque |
|---|---|---|---|---|
| 1 | `rm -rf studio/lunii/.build-*` ; supprimer 4 `_new-*` non ignorés ou les ignorer par pattern | 10 min | 700 Mo disque, `git add -A` sécurisé | nul |
| 2 | Sortir l'audio tiers du tracking (`git rm --cached`), déplacer vers vault, documenter provenance `histoires-dodo` | 30 min | risque juridique stoppé pour l'avenir | nul |
| 3 | `git rm --cached _archive/`, zip daté dans le vault, garder `INDEX.md` | 15 min | −6 142 fichiers dans le tree, outillage 2× plus rapide | nul |
| 4 | Nettoyer les 5 figées + `menu.md` qui polluent le hook ; purger les 20 refs `pmo/` ; 6 liens morts `INDEX.md` ; `EQUIPE.md` | 1 h | le hook cesse d'injecter de la loi périmée | nul |
| 5 | `mur.js` ← `catalog.js` (mj-58 fantôme, 9 jeux invisibles) | 1-2 h | 25 % du parc réapparaît dans le Mur | faible |
| 6 | `_done/` pour les handoffs ; rotation `LESSONS`/`TODO` des 3 pôles | 1 h | −25 000 tokens par tour | nul |
| 7 | Migration 013 : drop `feedback`, `tile_refs` ; débrancher MCP maxvoyage ; supprimer branches `main`, `reorg/*` | 30 min | surface d'erreur réduite | faible |
| 8 | Hooks : matcher au niveau `settings.json` (glob sur le chemin) avant de lancer PowerShell | 1 h | −2 à 4 s par tour | faible |
| 9 | `package.json` racine + `site/js/gen/` + déplacement des 14 générés | 2-3 h | fin de l'ambiguïté main/généré | moyen (chemins dans les html) |
| 10 | Gabarit `mj-template.html` + `check-mj-coherence.mjs` bloquant en CI | 3 h | livraison mj à 1 script au lieu de 13 gestes | faible |
| 11 | Service worker | 3-4 h | offline réel | moyen (invalidation cache) |
| 12 | WebP sprites + paléoart | 2 h | −150-200 Mo déployés | faible |
| 13 | Fiche canon `dinos/<id>.json` + générateurs + check data ↔ narré | 1-2 jours | source unique dino | moyen |
| 14 | `git filter-repo` + `gc --aggressive` | 1 h + force-push | 3,8 Go → ~1 Go | **élevé** : réécrit tous les SHA, invalide tout clone |
| 15 | Réduire les agents narration sans point d'entrée ; dé-tripler rules/CLAUDE/figées dino | 2 h | contexte plus léger | faible |

Les actions 1 à 8 tiennent en une demi-journée, ne touchent aucun code de jeu, et règlent P1 (sauf l'historique), P4 et une partie de P5. C'est le lot à faire en premier.

---

## 6. Décisions attendues de Papa Yann

1. **Réécriture d'historique (action 14)** : go ou pas ? Irréversible, force-push, tout clone existant devient obsolète. Si la machine de dev et le bot sont le seul clone, le coût est nul.
2. **Audio tiers** : sortie du repo vers un vault local (`~/MaxPlay-vault/`) ou suppression pure ? Les packs Lunii sont déjà dans `~/.studio/library/`.
3. **Fiche canon dino (action 13)** : chantier d'1-2 jours, à ouvrir maintenant ou après la campagne audio du 11/10 ?
4. **Agents narration** : réduire à 4-5 tant que le pipeline ne sort rien, ou garder les 10 en attendant le déblocage de l'étape 5 ?

---

## Erratum de cartographie

Le rapport dino initial signalait `figees/encyclopedie.md` et `memory/LESSONS.md` comme non trackés. Vérification `git ls-files` : ils sont trackés, seulement modifiés dans le working tree. Le point « référentiel critique hors git » est retiré.
