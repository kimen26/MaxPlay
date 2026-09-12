# Audit — Audio narré & scripts audio DINO (hors narration, hors banque de sons)

> Auditeur lecture seule, 2026-09-12. Périmètre : `site/audio/dinos/**`, `studio/dino/content/scripts-audio/**`,
> `studio/dino/content/sources/audio-archive/**`, `studio/dino/content/lunii/**`, `studio/lunii/assets/audio/**`,
> `studio/dino/content/i18n/**`, `studio/referentiel/**`, scripts de génération EL. Hors périmètre : `studio/narration/**`,
> `site/sounds/**` (audité ailleurs). Zéro fichier modifié, zéro commande git d'écriture.

---

## 1. Chiffres globaux

| Zone | Fichiers | Poids | Nature |
|---|---|---|---|
| `site/audio/dinos/` | 1 545 mp3 | 383 Mo | déployé, 12 dossiers langue |
| — `fr/` (505 à plat + `noms/` 70 + `periodes/` 5) | 580 | 229 Mo | canon FR, 100 % complet |
| — `en/` `es-es/` `pt-br/` | 65+70(noms) chacune | 43+39+52 Mo | 13/71 fiches seulement (théropodes) |
| — `ar de hi it ja ru zh es-mx` (8 langues) | 0 mp3 fiche | 2-4 Mo chacune (noms seuls) | sélectionnables dans l'UI, sans audio fiche |
| `studio/dino/content/scripts-audio/` | 1 574 (1 232 json + 337 md + 5 mp3) | ~9,3 Mo | source narrative + segments taggés |
| — `fr/V3/` | 74 md (71 fiches + 3 docs méthode) | 2,2 Mo | canon FR |
| — `en/` `es-es/` `pt-br/` | 71 md chacune (+ NOTES.md) | 1,6 Mo chacune | scripts prêts, génération partielle |
| — `_archive/` | 122 fichiers (2 lots) | 3,9 Mo | ancien pipeline + pré-V4 Albertosaurus |
| `studio/dino/content/sources/audio-archive/` | 1 mp3 | 2,0 Mo | `recit-intro-V5-VALIDE.mp3`, référence de validation |
| `studio/dino/content/lunii/` | 45 (images uniquement) | 37 Mo | **0 mp3** — le scope initial le disait audio, c'est faux : PNG familles/voyage |
| `studio/lunii/assets/audio/` | 152 mp3 (70 recits + 70 noms + 12 menus) | 44 Mo | **dérivé** (ffmpeg) de `site/audio/dinos/fr/*`, régénérable |
| `studio/dino/content/i18n/` | 209 fichiers | 1,8 Mo | lexiques prononciation, ledgers, corpus, scripts hors-fiche EN |
| `studio/referentiel/` | ~50 scripts/docs + `registre.json`/`empreintes.json` | 2 Mo | tableau de bord vivant, dernier run 2026-09-12 |
| Scripts génération EL trouvés | 17 (8 `content/scripts/audio/`, 6 `referentiel/generer/`, 3 archivés) | — | inventoriés § 7 |

**Audio tiers sous droits (« histoires-dodo », Pierre et le loup) évoqué par l'audit GED 2026-09-12** : **introuvable** dans ce périmètre au moment du présent audit — ni dans `studio/dino/content/inbox/` (le dossier n'existe plus), ni dans `studio/lunii/assets/audio/`. Soit déjà purgé entre les deux audits (même journée), soit le premier audit visait l'historique git (blobs), pas le working tree. À vérifier : `git log --all --diff-filter=D -- '*histoires-dodo*' '*pierre*loup*'` si confirmation nécessaire — aucune trace vivante en tout cas.

---

## 2. Tableau par dossier / famille

| Famille | Nb | Mo | Voix | Consommateur | Verdict | Preuve |
|---|---|---|---|---|---|---|
| `fr/<id>-{nom,taille,regime,funfact,recap}.mp3` (71×5) | 355 | ~180 | Narrateur H + Wex (duo) | `dev-dinos.html` `_audioSet()` / `DINO_AUDIO` map, fiche complète | **GARDER** | `site/dev-dinos.html:2345-2370`, script `studio/dino/content/scripts-audio/fr/V3/<id>.md` 1:1 pour les 71 |
| `fr/noms/<id>.mp3` (70) | 70 | ~3 | Narrateur H (nom seul, 1,5-2 s) | `playDinoNom()` — tap rapide en jeu/collection | **GARDER** — pas un doublon du flat `-nom.mp3` (20-35 s, fiche complète) : commentaire explicite dans le code interdit de les confondre | `site/js/gen/dinos-audio-manifest.js:1-23` |
| `fr/periodes/<id>.mp3` (5) | 5 | ~0,3 | Narrateur H | voix des périodes dans l'onglet Époques | **GARDER** | `site/dev-dinos.html:723` |
| `fr/dico-*.mp3` (100) | 100 | ~4 | Narrateur H | onglet Dico, racines grec/latin | **GARDER** — SOURCE = `_DICO-RACINES-AUDIO.md` + `data/racines.json` | `site/dev-dinos.html:732` |
| `fr/menu-*.mp3` (28) | 28 | ~2 | Narrateur H/F selon rôle | accroches menus (familles, régimes, époques) | **GARDER** | `_ACCROCHES-MENU-FAMILLES-REGIMES.md` (référentiel : 15 enrôlées, `_COUVERTURE.md`) |
| `fr/recit-*.mp3` (13) | 13 | ~15 | Narratrice F (voyage) | 8 récits + variantes | **GARDER** | source `studio/dino/content/sources/recits/RECITS-EPOQUES.md`, canal `mp3` suivi par `scan-dino.mjs` |
| `fr/special-*.mp3` (6) | 6 | ~3 | mixte | mj-31 (extinction, pangée) | **GARDER** | `_COUVERTURE.md` § « Extinction (mj-31) » 6/6 enrôlé |
| `fr/ere-*.mp3` (3) | 3 | ~0,2 | Narrateur H | ères (Paléo/Méso/Céno) | **GARDER** | `site/dev-dinos.html:1015` |
| `en/es-es/pt-br` 13 fiches × 5 blocs | 195 (65×3) | 134 | voix native → STS voix maison | fiches i18n, gatées par `dinoHasAudio` | **GARDER** (partiel assumé) | ledgers `content/i18n/fiches-audio/{en,es-es,pt-br}.json` |
| `en/es-es/pt-br` `noms/` (70 chacune) | 210 | ~9 | idem STS | `playDinoNom()` par langue | **GARDER** | manifest `dinos-audio-manifest.js` Sets par langue |
| `en/periodes/` (5, EN seul) | 5 | ~0,3 | STS | onglet Époques EN | **GARDER** | même mécanisme que FR |
| Scripts FR/EN/ES/PT non encore audio (58×3 = 174 fiches) | 174 md | ~4,2 | — | **SOURCE prête, pas de MP3** | **SOURCE (à garder)** — planifié HO-019 lot 11/09 puis 11/10 | `docs/handoffs/HO-019-reprise-audio-quota.md` |
| `ar de hi it ja ru zh es-mx` `noms/` (8 langues × ~65-70) | ~500 | ~20 | voix native probable | `DINO_NOM_AUDIO_BY_LANG` Sets non vides | **À TRANCHER (Q3)** — ces 8 langues ont un pack `noms/` généré et un Set JS, mais **aucune fiche audio** (`-nom/-taille/-regime/-funfact.mp3` = 0), et sont pourtant listées `SUPPORTED` dans `lang.js` (sélectionnables au menu) | `site/js/lang.js:5`, `find site/audio/dinos/<lang> -maxdepth 1 -name "*.mp3"` → 0 |
| `_archive/2026-08-19-albertosaurus-avant-v4/` (5 mp3) | 5 | ~2 | ancien Albertosaurus pré-V4 | aucun (superseded) | **GARDER (archive canon)** — doctrine GED « on désigne le canon, on ne supprime jamais » | `.claude/rules/dino.md` § Doctrine GED |
| `_archive/2026-07-18-ancien-pipeline/` (117 md/json) | 117 | 1,9 Mo | — | aucun | **GARDER (archive canon)**, mais poids notable pour du texte pur | idem |
| `sources/audio-archive/recit-intro-V5-VALIDE.mp3` | 1 | 2,0 | Narratrice F | référence de validation, pas jouée en prod | **GARDER (SOURCE de contrôle)** | nom explicite « VALIDE » |
| `studio/lunii/assets/audio/recits-dino/*.mp3` (70) | 70 | ~35 | dérivé (concat 4 blocs + pad 300 ms + loudnorm) | pack Lunii | **GARDER (dérivé régénérable)** — pas un doublon : format Lunii = 1 fichier concaténé, format site = 5 blocs séparés, usages différents | `studio/lunii/scripts/prepare-dino-assets.mjs:2-27`, SRC = `site/audio/dinos/fr` |
| `studio/lunii/assets/audio/noms-dino/*.mp3` (70) | 70 | ~3 | dérivé (extrait du début du bloc nom) | pack Lunii | **GARDER (dérivé régénérable)** | idem |
| `studio/lunii/assets/audio/menus/*.mp3` (12) | 12 | ~1 | Narratrice F (étiquettes) | menus molette Lunii | **GARDER** | HO-019 étape 6 (5 manquantes à générer : voir § 4) |
| `content/i18n/noms-audio/` (17 fichiers) | 17 | 0,4 Mo | — | ledgers/sources noms i18n | **SOURCE** | pipeline `_gen-lot-i18n-noms*.mjs` |
| `content/i18n/lexiques-prononciation/*.md` (13) | 13 | négligeable | — | INVARIANT DEC-I18N-INVARIANT-001 (lexique avant toute génération) | **GARDER (SOURCE obligatoire)** | `.claude/rules/dino.md` |

---

## 3. Proposition de suppression (ORPHELIN / DOUBLON / TIERS)

**Aucune suppression identifiée avec certitude dans ce périmètre.** Contrairement à l'hypothèse de départ (« challenger tout ce qui est linké ou pas »), le système est en réalité bien tracé : chaque famille MP3 a un générateur ou un consommateur identifié, `studio/referentiel/_COUVERTURE.md` confirme 100 % d'enrôlement sur les familles dino (blocs, récaps, dico, noms, menus, époques, extinction).

Deux points pèsent mais ne sont **pas des suppressions sèches** :

| Cible | Poids | Pourquoi pas une suppression sèche |
|---|---|---|
| `_archive/2026-07-18-ancien-pipeline/` | 1,9 Mo | Archive canon documentée (doctrine GED) ; à **vérifier une seule fois** que rien n'y est encore lu par un script actif (grep négatif ci-dessous), puis laisser |
| Audio tiers (« histoires-dodo », Pierre et le loup) signalé par l'audit GED du même jour | ~290 Mo (dans l'historique git, pas le working tree) | Hors portée de cet audit lecture-seule du working tree ; c'est un chantier `git filter-repo` (action 14 de l'audit GED), pas un `rm` de fichier vivant |

Grep de contrôle passé sur `_archive/2026-07-18-ancien-pipeline/` : aucun script actif (`_gen-audio-v3.sh`, `_md2json-v3.cjs`, `_verif-scripts-audio.cjs`) ne le référence par chemin — confirmé mort, correctement archivé.

**TIERS au sens strict (son non produit par nous) : zéro trouvé** dans le périmètre audio narré/scripts. Le seul repère "tiers" de l'audit GED (histoires-dodo, Pierre et le loup) n'existe plus dans le working tree.

---

## 4. Manques

| Manque | Détail | Impact |
|---|---|---|
| **EN 58/71 fiches sans MP3** | scripts prêts (`content/scripts-audio/en/*.md`), ledger vide au-delà des 13 théropodes | prévu HO-019, non bloquant mais **le plan HO-019 annonçait un run au reset du 11/09 : aucun fichier EN n'a de date > 2026-09-10** — la reprise post-reset n'a pas encore eu lieu (voir § 6 Q1) |
| **ES-ES / PT-BR 58/71 fiches sans MP3** | idem EN, même retard | idem, second poste HO-019 (report au 11/10 si option B) |
| **8 langues (ar,de,hi,it,ja,ru,zh,es-mx) sans aucune fiche audio** | seul `noms/` existe (courts), 0 bloc de fiche | ces langues sont pourtant `SUPPORTED` dans `lang.js` → sélectionnables au menu langue, la fiche entière retombe en TTS navigateur (pas la voix maison) → **contredit DEC-AUDIO-I18N-002** en silence, sans erreur visible (garde-fou anti-404 volontaire) |
| **5 étiquettes menu Lunii manquantes** | `menu-ep-{naissance-terre,vie-dans-eau,sortie-eau,reptiles-permien,grande-mort}.mp3` — 12 présentes sur 17 attendues (`EPOQUES` passera à 12) | étape 6 HO-019 non faite |
| **Scripts orphelins de mp3 dans `fr/V3/`** | `CONSIGNES.md`, `diagnostic-plan-fiches-dino.md`, `plan-reecriture-fiches-dino-V3-consolide.md` | **normal** — ce sont des docs de méthode, pas des fiches ; à confirmer qu'ils ne doivent pas migrer hors de `fr/V3/` pour ne plus fausser un futur comptage automatique (déjà arrivé avec mon premier grep trop large) |
| **`registre.json` référentiel : 96 dettes ouvertes** | détail § 1 du fichier, essentiellement « script modifié après le dernier MP3 » (drift normal, pas un manque de fichier) | routine, pas une alerte |
| **Aucun mp3 référencé-mais-absent trouvé** | tous les chemins `AUDIO_DINOS + id + '-bloc'.mp3` dans `dev-dinos.html` correspondent 1:1 aux 71 ids FR sur disque | contrôle passé, rien à corriger côté FR |

---

## 5. Proposition de rangement cible

L'arborescence actuelle est en réalité **déjà correctement rangée** pour ce périmètre (contrairement à l'inventaire images/audio général de l'audit GED du même jour, qui pointait `site/` en vrac ailleurs). Deux ajustements mineurs suffisent, pas une refonte :

```
site/audio/dinos/
├── fr/                     ← canon complet, INCHANGÉ
│   ├── <id>-{nom,taille,regime,funfact,recap}.mp3   (blocs de fiche, 20-35s)
│   ├── noms/<id>.mp3                                 (nom seul, 1.5-2s, tap-play)
│   ├── periodes/<id>.mp3
│   ├── dico-*.mp3 · menu-*.mp3 · recit-*.mp3 · special-*.mp3 · ere-*.mp3
├── en/ es-es/ pt-br/       ← même structure, complétion en cours (HO-019)
└── {ar,de,hi,it,ja,ru,zh,es-mx}/
    └── noms/               ← SEULE chose qui existe ; NE PAS ajouter de dossier
                                fiche tant que Q3 n'est pas tranchée
```

**Règle de nommage déjà respectée, à documenter explicitement** (elle ne l'est nulle part sous forme de règle courte) :
- `<id>-nom.mp3` / `<id>-taille.mp3` / `<id>-regime.mp3` / `<id>-funfact.mp3` = les 4 blocs de fiche (source : script `fr/V3/<id>.md`, section correspondante).
- `<id>-recap.mp3` = concaténation des 4 blocs (dérivé, pas un texte propre — confirmé par `_COUVERTURE.md`).
- `noms/<id>.mp3` = nom seul, extrait du début du bloc `-nom.mp3`, usage tap-play exclusivement — **jamais** confondu avec le flat.

Suggestion : ajouter ces deux lignes dans `.claude/rules/sons.md` ou `_BANQUE-SONS.md` (pas fait ici, lecture seule), car la distinction `<id>-nom.mp3` vs `noms/<id>.mp3` n'existe aujourd'hui que dans un commentaire de code (`dinos-audio-manifest.js:1-9`) — c'est fragile, un futur agent qui ne lit pas ce fichier précis peut se tromper (c'est très exactement le risque que la rule `sons.md` a été créée pour couvrir le 2026-08-10).

`studio/dino/content/scripts-audio/` : structure déjà correcte (canon `fr/V3/`, langues à plat, `_archive/` daté). Seul geste : sortir les 3 docs de méthode (`CONSIGNES.md`, `diagnostic-plan-fiches-dino.md`, `plan-reecriture-fiches-dino-V3-consolide.md`) de `fr/V3/` vers `fr/` (racine) ou `scripts-audio/_methode/`, pour que `fr/V3/` ne contienne QUE les 71 fiches — cosmétique, casse aucun script (aucun ne les référence par nom).

---

## 6. Questions à trancher

**Q1 — Le run HO-019 post-reset (11/09) a-t-il eu lieu ?** Aucun fichier EN n'a une date de modification postérieure au 2026-09-10, alors que le runbook prévoyait FR 35 fiches + EN 30 fiches le 11/09. FR est à 71/71 (donc son propre lot a dû tourner avant, cf. commit `5e0b95c54` du 2026-09-12 "Scelidosaure a enfin ses images, l'encyclopédie est complete" qui referme un autre chantier). **Recommandation : relancer l'étape 2 de HO-019 (EN 58 fiches) maintenant que le reset est passé**, en `simulation d'abord` comme prévu dans le runbook, avant de committer le crédit.

**Q2 — Les 5 étiquettes menu Lunii (`menu-ep-*.mp3` manquantes) et le passage `EPOQUES` à 12 sont-ils encore d'actualité ?** Le runbook HO-019 les place en étape 6 (après EN). **Recommandation : les traiter avec l'étape 6, pas avant** — pas de raison de les découpler.

**Q3 — Les 8 langues sans fiche audio (`ar de hi it ja ru zh es-mx`) doivent-elles rester sélectionnables dans le menu langue du site ?** Elles ont un pack `noms/` (tap-play marche) mais zéro fiche : un enfant qui choisit "日本語" entend le TTS navigateur brut sur toute la fiche, pas la voix maison — silencieusement, sans erreur (garde-fou anti-404 volontaire, donc "ça marche" mais pas comme prévu). **Recommandation : soit les retirer de `SUPPORTED` dans `lang.js` tant qu'aucune fiche n'existe (évite une fausse promesse au menu), soit documenter explicitement "langues nom-seul" comme un niveau de service assumé distinct du niveau "fiche complète" (fr/en/es-es/pt-br).** Décision produit, pas technique — je ne tranche pas à la place de Papa Yann.

**Q4 — L'archive `2026-07-18-ancien-pipeline` (117 fichiers, 1,9 Mo, scripts texte morts) mérite-t-elle de sortir du repo git vers le vault, comme le préconise l'audit GED (action 14, `git filter-repo`) ?** Ce sont des `.md`/`.json`, pas des mp3 lourds — le gain poids est marginal (1,9 Mo). **Recommandation : laisser en l'état**, le vrai gain de l'audit GED est sur les blobs mp3/png historiques, pas sur ce dossier précis.

**Q5 — Le signalement "audio tiers sous droits versionné" (~290 Mo) de l'audit GED du même jour ne correspond à rien de trouvable dans le working tree actuel.** Est-ce (a) déjà purgé par une session antérieure le même jour, (b) une confusion avec des blobs d'historique git uniquement, ou (c) un chemin qui a bougé entre les deux audits ? **Recommandation : lancer un `git log --diff-filter=D --all -- '*histoires-dodo*'` en session d'écriture pour confirmer avant de clore ce point dans le TODO** — je ne peux pas le faire moi-même (lecture seule).

---

## 7. Commandes exactes utilisées

```bash
# Cartographie volumes
find site/audio/dinos -type f | wc -l ; du -sh site/audio/dinos
find site/audio/dinos/fr -maxdepth 1 -name "*.mp3" | wc -l
find studio/dino/content/scripts-audio -type f | wc -l

# Consommateurs
grep -rln "audio/dinos" site/*.html site/js/*.js site/js/gen/*.js
grep -n "'-nom.mp3'\|-taille.mp3\|-regime.mp3\|-recap.mp3" site/dev-dinos.html
sed -n '1,60p' site/js/gen/dinos-audio-manifest.js
sed -n '1,45p' site/js/lang.js

# Comparaison MP3 ↔ scripts (ids dino uniquement, hors dico/menu/recit/special)
find site/audio/dinos/fr -maxdepth 1 -name "*-nom.mp3" -o -name "*-taille.mp3" \
  -o -name "*-regime.mp3" -o -name "*-funfact.mp3" -o -name "*-recap.mp3" \
  | grep -v "special-\|menu-" | sed 's#.*/##; s/-\(nom\|taille\|regime\|funfact\|recap\)\.mp3$//' \
  | sort -u > /tmp/fr_ids2.txt
find studio/dino/content/scripts-audio/fr/V3 -maxdepth 1 -name "*.md" ! -name "_*" \
  | sed 's#.*/##; s/\.md$//' | sort -u > /tmp/fr_scripts2.txt
comm -23 /tmp/fr_ids2.txt /tmp/fr_scripts2.txt   # mp3 sans script
comm -13 /tmp/fr_ids2.txt /tmp/fr_scripts2.txt   # script sans mp3

# Lunii dérivé
grep -n "recits-dino\|noms-dino\|site/audio/dinos" studio/lunii/scripts/*.mjs

# Référentiel (déjà généré, réutilisé sans relancer)
sed -n '1,80p' studio/referentiel/_ETAT-CONTENU.md
sed -n '1,50p' studio/referentiel/_COUVERTURE.md
sed -n '1,50p' studio/referentiel/_PLAN-GENERATION.md

# Recherche tiers
find studio -iname "*.mp3" | grep -iv "dino\|voyage\|recit\|menu\|nom\|taille\|regime\|funfact\|recap\|special\|dico\|ere-"
find . -iname "*histoires-dodo*" -o -iname "*pierre*loup*"
```

---

_Audit produit en lecture seule le 2026-09-12. Aucun fichier du repo modifié, aucune commande git d'écriture exécutée._
