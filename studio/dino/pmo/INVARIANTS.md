# INVARIANTS — Pôle DINO

> Source de vérité des **chiffres clés**. MAJ uniquement si un invariant change (par `dino-pmo`).
> **Dernière vérif : 2026-07-05 CLÔTURE FINALE (EP-D25 AUDIT COMPLET 60 DINOS VALIDÉES).**
> Session 2026-07-05 : audit visuel massif 100 % (60 dinos, ~408 images), 39 irréprochables, 8 fausses regénérées + validées Grok, L-D21 silhouette maîtresse fondamentale gravée, EP-D25 clôturé.
> Session 2026-07-05 (suite 3) : suppression zones `site/img/dinos/silhouettes/` + `studio/dino/content/assets/silhouettes/` (orphelines, canon = `ombres/` seul). Nouveau `site/js/dinos-audio-manifest.js` généré depuis disque réel (robuste prod). Ticket audio récit-époque créé.
> Session 2026-07-05 (suite 2) : bug prod GITIGNORE fixé (60 ombres + 11 héros promotion vers tracking), L-D22 gravée.
> Session 2026-07-04 : 9 dinos mégafaune + Edmontonia images paléoart livrées, dev-dinos.html SyntaxError fixé, ombres chinoises 100 % (60/60).
> Session 2026-06-19 : production images paléoart XXL (5 scènes/dino) démarrée — ne change pas les counts (état réel data inchangé).

## Counts

| Quoi | Valeur | Source |
|------|--------|--------|
| Dinos (entrées `DINOS`) | **60** | `site/js/dinos-data.js` (✅ 2026-07-03 : +8 dinos Cénozoïque Mammuthus/Smilodon/Megatherium/Paraceratherium/Glyptodon/Aenocyon/Coelodonta/Titanis + 1 Crétacé Edmontonia) |
| Familles (`DINO_FAMILLES`) | **11** | idem (✅ 2026-07-03 : +2 familles `mammiferes` + `oiseaux` ; famille `arme` passe 4→5 dinos) |
| Régimes alimentaires (`DINO_CATEGORIES`) | **4** | idem (inchangé) |
| Périodes (`DINO_PERIODES`) | **5** | ✅ 2026-07-03 : ajout `cenozoique` (66 Ma → aujourd'hui), rejoins les 4 antérieures (Triassic, Jurassic, Crétacé, Autres) |
| Récits d'époque (voyage) | **8** | `audio/dinos/recit-*.mp3` |
| Accroches menu (voix réelle) | **17** | `audio/dinos/menu-*.mp3` (4 onglets + 9 familles `menu-fam-*` + 4 régimes `menu-regime-*`) |
| Spéciaux (Pangée, Extinction) | **2** | `audio/dinos/special-*.mp3` |
| Dinos avec audio complet (recap+4 blocs) | **51** | `DINO_AUDIO` (✅ 2026-06-15 suite 3 : production V3 complète — note : 8 dinos Cénozoïque audio EN ATTENTE quota EL reset ~9 juillet) |

## 11 familles (nom scientifique = titre)

**Dinosaures (9 familles, 52 dinos)** : Théropodes (13) · Sauropodes (7) · Thyréophores (5) · Cératopsiens (6) · Ornithopodes (3) · Dromæosaures (8) · Ptérosaures (2) · Énaliosaures (7) · Avant les dinosaures (1, Dimétrodon).

**Mégafaune Cénozoïque (2 familles, 8 dinos, 2026-07-03)** — clés techniques `mammiferes` + `oiseaux` :
- **Mammifères** `mammiferes` (7) : Mammouth (`mammuthus`, *Mammuthus primigenius*) · Smilodon (`smilodon`, *S. fatalis*) · Mégathère (`megatherium`, *Megatherium americanum*) · Paracérathérium (`paraceratherium`) · Glyptodon (`glyptodon`) · Loup terrible (`aenocyon`, *Aenocyon dirus*) · Rhino laineux (`coelodonta`, *Coelodonta antiquitatis*)
- **Oiseaux** `oiseaux` (1) : Titanis (`titanis`, *Titanis walleri*) — oiseau-terreur, seul non-mammifère du lot

> ✅ **Vérif fact-check 2026-07-03** : 7/8 Grokipedia + 1 Wikipedia (Titanis). Chiffres honnêtes, échelle `_compLong/_compHaut/_compPoids` validée. Titanis corrigé 2,5m→1,9m.
> ⚠️ **Taxo assumée** : les *terror birds* (Titanis) sont des OISEAUX, pas des mammifères → famille séparée (décision Papa Yann 2026-07-03, honnêteté taxo L-D03). Loup terrible + Rhino laineux sont bien des **mammifères** (`famille: 'mammiferes'` dans la data — répartition vérifiée `node` : mammiferes=7, oiseaux=1).
> +3 entrées 2026-06-15 (relecture V3) : Patagotitan (Sauropodes 6→7), Centrosaure (Cératopsiens), Ichthyosaurus communis (Énaliosaures 6→7) — fiches audio V3 existaient sans entrée data. Count 48 → **51**. Puis 2026-07-03 : 51 → 59 (8 Cénozoïque) → **60** (Edmontonia, Thyréophores 4→5). Total dinos classiques = 52 + mégafaune 8 = 60.
> ✅ **Réconcilié 2026-07-03 (DEC-GED-001)** : la correspondance libellé ↔ clé technique (`trex`/`cou_long`/`arme`/...) est gravée dans la **Table de réconciliation familles** ci-dessous (§ dédiée). Flag fermé.
> Refonte taxo 2026-06-09 : famille **Énaliosaures** (6 reptiles marins) créée ; « Inclassables » dissoute (Therizinosaurus → Théropodes, Pachycéphalosaure → Cératopsiens) ; « Pas des dinosaures ! » recentrée sur Dimétrodon → « Avant les dinosaures ».
Champs par famille : `sci` (titre scientifique) · `label` (surnom) · `sci_sens` (origine grecque dite en entrant) · `explic` (explication longue 🔊).

## 4 régimes alimentaires

Carnivores (24) · Herbivores (21) · Piscivores (7) · Omnivores (3). **Pas de catégorie morphologique** ici (ex « Volants & Marins » retiré 2026-06-03).

## Échelle de comparaison HONNÊTE (référentiel figé)

> Règle : **aucune arrivée qui ment > 10 %**. Détail : `dino/content/_ECHELLE-REFERENTIEL.md`. Fonctions `_compLong`/`_compHaut`/`_compPoids` dans dinos-data.js.

| Repère | Taille |
|--------|--------|
| Enfant 4 ans | 1 m |
| Papa | 1,8 m |
| But de foot (haut) | 2,44 m |
| Panier de basket | 3,05 m |
| Bus anglais 2 étages (haut) | 4,4 m |
| Girafe (haut) | ~5 m |
| Lampadaire | 6 m |
| Bus RATP (long) | 12 m |
| Bus accordéon (long) | 18 m |

Le **bus est autorisé en échelle de taille** (validé Papa Yann) mais **interdit dans les récits narrés**.

## Casting voix (audio)

| Rôle | voice_id | Usage |
|------|----------|-------|
| `narrateur_h` | `cbRcktt2xvoeFpdvW2wg` | Menus accueil / régime / familles |
| `narrateur_f` | `aHKEGRjW94hqXc6gaItG` | Voyage + les 8 récits d'époque |
| `wex` | `G54e8CyYslC2Y4ZupTlg` | Dialogue des récits (FR standard, sans tic écrit) |

Résolus via `narration/personnages/voix-meta/voice-map.json`. Modèle **eleven_v3**, **stability 0,4** (dialogue), loudnorm en post. Accroche menu **2-7 s**.

## 🏛️ Doctrine GED (DEC-GED-001, figée 2026-07-03)

> Décision d'architecture. Détail + raison : [`decisions.md`](decisions.md) § DEC-GED-001. Ces règles rendent la GED durable (canonicité + complétude, en plus du rangement).

1. 🔒 **CANON SANS NUMÉRO** — le fichier qui fait foi porte un nom stable sans version (`RECITS-EPOQUES.md`). L'historique descend dans un `_archive/` local daté. On **DÉSIGNE** le canon, on ne **SUPPRIME** jamais.
2. 🔒 **ZÉRO CHIFFRE EN DUR** — aucun INDEX/README/CLAUDE.md/rule ne cite un count (dinos, familles, silhouettes). Ils POINTENT vers la source. ⚠️ **Ce fichier (INVARIANTS) est la SEULE exception légitime** : c'est le tracker des chiffres clés, c'est sa fonction — mais chaque chiffre cite sa source et date sa vérif. **Portée : la GOUVERNANCE uniquement, JAMAIS le contenu narré** — un récit/fiche DOIT dire « il y a 66 millions d'années », « 9 mètres » (règle figée anti-nian-nian). Ne jamais appliquer « zéro chiffre » au contenu que l'enfant entend.
3. 🔒 **FRONTIÈRE AUTORING / PRODUIT** — une feature (mini-jeu, page) ne lit QUE `site/js/dinos-data.js` + assets `site/img/dinos/` référencés, nommés par `id` stable. Jamais elle ne monte lire dans `studio/` (non déployé). Donnée manquante → descend dans dinos-data.js via script d'export.
4. 🔒 **CHECKLIST « DINO COMPLET » (8 axes)** — `hero · 5 scènes paléoart (headshot/manger/paris/ecosysteme/funfact) · coloriage · 5 segments audio (nom/taille/regime/funfact/recap) · silhouette · fiche fact-checkée+relue-péda · étymo · mesures`. (Le récit de voyage est par-époque, PAS par-dino → hors checklist.) Suivi via l'outil généré `_ETAT-DINOS.md` (branché dans dino-archiviste, ticket EP-D-GED).

## 🧬 Table de réconciliation familles (clé technique ↔ libellé) — figée 2026-07-03

> Résout le flag « écart libellés/clés ». Clé = `famille` dans dinos-data.js · libellé = titre scientifique UI. Total vérifié `node` : 60. ⚠️ **Comptes indicatifs** — source vivante = `dinos-data.js` (règle #2).

| Clé technique | Libellé scientifique | ~count |
|---------------|----------------------|--------|
| `trex` | Théropodes | 13 |
| `cou_long` | Sauropodes | 7 |
| `arme` | Thyréophores | 5 |
| `cornu` | Cératopsiens | 6 |
| `bec` | Ornithopodes | 3 |
| `raptor` | Dromæosaures | 8 |
| `pterosaures` | Ptérosaures | 2 |
| `enaliosaures` | Énaliosaures | 7 |
| `volant` | Avant les dinosaures (Dimétrodon) | 1 |
| `mammiferes` | Mammifères (Cénozoïque) | 7 |
| `oiseaux` | Oiseaux (Cénozoïque) | 1 |

## Règles verrouillées (voir figees/encyclopedie.md)

- 🔒 Tritri = running gag Wex, JAMAIS Max/doudou/peluche.
- 🔒 4 onglets : Familles (défaut) · Ce qu'il mange · Le voyage · Le dico (racines grec/latin, ajouté 2026-06-08).
- 🔒 Encyclopédie = vrais noms + vraies dates. Terme savant nouveau → expliqué (ex « ptérosaure » → « reptile volant comme le Ptéranodon »).
- 🔒 Voyage : vignettes décoratives (pas de lien), avancement reset session.
- 🔒 Fiche : bouton audio masqué si pas d'audio complet.
- 🔒 **2 règles ajoutées 2026-06-15** (Papa Yann relecture V3) : **PAS de référence culturelle d'adulte** (chanteur/marque/film/onomatopée) → image concrète enfant. **PRÉDATION dite avec vérité, jamais gore** (chasser/manger = normal, on le dit ; images physiques OK sans s'attarder ; 0 sang/torture/agonie). Voir `figees/encyclopedie.md` § PAS de référence... et § PRÉDATION dite avec...
