# INVARIANTS — Pôle DINO

> Source de vérité des **chiffres clés**. MAJ uniquement si un invariant change (par `dino-pmo`).
> **Dernière vérif : 2026-07-18 (audit visuel phase 2 + MEGA nettoyage).**
> Session 2026-07-17/18 : audit visuel 100 % (540 images) → phase 1 (vignettes ombre + purge 18 heros tiers) + phase 2 (42 images régénérées, leçons L-D-38..43). **Gallimimus complété → 60/60 dinos complets (8/8 axes)**. Sprites ingame top 15 (`sprites/`), INDEX-IMAGES créé, legacy racine/paws/scale/variants purgé.
> **Dernière vérif précédente : 2026-07-05 CLÔTURE FINALE (EP-D25 AUDIT COMPLET 60 DINOS VALIDÉES).**
> Session 2026-07-05 : audit visuel massif 100 % (60 dinos, ~408 images), 39 irréprochables, 8 fausses regénérées + validées Grok, L-D21 silhouette maîtresse fondamentale gravée, EP-D25 clôturé.
> Session 2026-07-05 (suite 3) : suppression zones `site/img/dinos/silhouettes/` + `studio/dino/content/assets/silhouettes/` (orphelines, canon = `ombres/` seul). Nouveau `site/js/dinos-audio-manifest.js` généré depuis disque réel (robuste prod). Ticket audio récit-époque créé.
> Session 2026-07-05 (suite 2) : bug prod GITIGNORE fixé (60 ombres + 11 héros promotion vers tracking), L-D22 gravée.
> Session 2026-07-04 : 9 dinos mégafaune + Edmontonia images paléoart livrées, dev-dinos.html SyntaxError fixé, ombres chinoises 100 % (60/60).
> Session 2026-06-19 : production images paléoart XXL (5 scènes/dino) démarrée — ne change pas les counts (état réel data inchangé).

## Counts

| Quoi | Valeur | Source |
|------|--------|--------|
| Dinos (entrées `DINOS`) | **69** | `site/js/dinos-data.js` (✅ 2026-07-19 : +Corythosaurus, Ornithopodes 3→4 · ✅ 2026-07-20 : +Hatzegopteryx, Ptérosaures 2→3 · ✅ **2026-07-25 : +7** — Minmi + Scutellosaure (Thyréophores 5→7), Maiasaura (Ornithopodes 4→5), Édaphosaure + Gorgonops + Lystrosaure + Moschops (**« Avant les dinosaures » 1→5**). Data + audio faits ; **paléoart à produire pour ces 7**) |
| Familles (`DINO_FAMILLES`) | **11** | idem (✅ 2026-07-03 : +2 familles `mammiferes` + `oiseaux` ; famille `arme` passe 4→5 dinos, puis 5→7 le 2026-07-25) |
| Régimes alimentaires (`DINO_CATEGORIES`) | **4** | idem (inchangé) |
| Périodes (`DINO_PERIODES`) | **5** | ✅ 2026-07-03 : ajout `cenozoique` (66 Ma → aujourd'hui), rejoins les 4 antérieures (Triassic, Jurassic, Crétacé, Autres) |
| Récits d'époque (voyage) | **8** | `audio/dinos/recit-*.mp3` |
| Accroches menu (voix réelle) | **17** | `audio/dinos/menu-*.mp3` (4 onglets + 9 familles `menu-fam-*` + 4 régimes `menu-regime-*`) |
| Spéciaux (Pangée, Extinction) | **2** | `audio/dinos/special-*.mp3` |
| Dinos avec audio complet (recap+4 blocs) | **69** | `DINO_AUDIO` (✅ 2026-07-13 : 9 Cénozoïque complétés. ✅ **2026-07-25 : les 7 nouveaux** — 28 blocs text-to-dialogue + 7 recaps concat ffmpeg loudnorm, eleven_v3, grep-interdits passé. Manifeste régénéré via `_gen-audio-manifest.cjs` : 69 ids. Plus aucun dino en attente d'audio.) |
| Noms vocaux dino (assets bonus) | **60** | `site/audio/dinos/noms/{id}.mp3` (✅ 2026-07-06 : 60 MP3 narrateur_h [excited] jeu, lancés dans mj-24/28/31/33) |
| Langues i18n cibles (audio dino) | **9** | ✅ 2026-07-10 : FR (canon) · EN · PT-BR · ES · IT · AR · RU · ZH · JA **FIGÉE**. Archi déployée (pack préfixe langue, overlay strings, manifest anti-404, studio i18n/ centralisé). Tests ✅ 12 specs Playwright (mj-15/24/25/26/27/28/29/30/32/33/41, mj-31 TOUS). Invariant DEC-I18N-INVARIANT-001 : toute langue = lexique AVANT audio, jamais régresser. |

## 11 familles (nom scientifique = titre)

**Dinosaures (9 familles, 54 dinos)** : Théropodes (13) · Sauropodes (7) · Thyréophores (5) · Cératopsiens (6) · Ornithopodes (4) · Dromæosaures (8) · Ptérosaures (3) · Énaliosaures (7) · Avant les dinosaures (1, Dimétrodon).

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

## 🏛️ Doctrine transverse MaxPlay

> **Principes fondateurs (tous les pôles)** : [`../../memory/DOCTRINE.md`](../../memory/DOCTRINE.md) — D-001 pédagogie = produit, D-002 zéro pénalité, D-003 récompense promise interdite. À consulter avant arbitrer tout design d'apprentissage DINO.

## 🏛️ Doctrine GED (DEC-GED-001, figée 2026-07-03)

> Décision d'architecture. Détail + raison : [`decisions.md`](decisions.md) § DEC-GED-001. Ces règles rendent la GED durable (canonicité + complétude, en plus du rangement).

1. 🔒 **CANON SANS NUMÉRO** — le fichier qui fait foi porte un nom stable sans version (`RECITS-EPOQUES.md`). L'historique descend dans un `_archive/` local daté. On **DÉSIGNE** le canon, on ne **SUPPRIME** jamais.
2. 🔒 **ZÉRO CHIFFRE EN DUR** — aucun INDEX/README/CLAUDE.md/rule ne cite un count (dinos, familles, silhouettes). Ils POINTENT vers la source. ⚠️ **Ce fichier (INVARIANTS) est la SEULE exception légitime** : c'est le tracker des chiffres clés, c'est sa fonction — mais chaque chiffre cite sa source et date sa vérif. **Portée : la GOUVERNANCE uniquement, JAMAIS le contenu narré** — un récit/fiche DOIT dire « il y a 66 millions d'années », « 9 mètres » (règle figée anti-nian-nian). Ne jamais appliquer « zéro chiffre » au contenu que l'enfant entend.
3. 🔒 **FRONTIÈRE AUTORING / PRODUIT** — une feature (mini-jeu, page) ne lit QUE `site/js/dinos-data.js` + assets `site/img/dinos/` référencés, nommés par `id` stable. Jamais elle ne monte lire dans `studio/` (non déployé). Donnée manquante → descend dans dinos-data.js via script d'export.
4. 🔒 **CHECKLIST « DINO COMPLET » (8 axes)** — `hero · 5 scènes paléoart (headshot/manger/paris/ecosysteme/funfact) · coloriage · 5 segments audio (nom/taille/regime/funfact/recap) · silhouette · fiche fact-checkée+relue-péda · étymo · mesures`. (Le récit de voyage est par-époque, PAS par-dino → hors checklist.) Suivi via l'outil généré `_ETAT-DINOS.md` (branché dans dino-pmo unifié, ticket EP-D-GED).

> ⚠️ **Statut paléoart 2026-07-25** : **9 dinos sans paléoart** — Corythosaurus et Hatzegopteryx (data 2026-07-19/20) + les **7 de la vague 2026-07-25**. Canal de génération bloqué ce jour (Brave répond en HTTP sur 9222 mais refuse le pilotage Playwright). Les fiches restent fonctionnelles (texte + audio complets, image par défaut). Détail et durcissements du générateur : `backlog.md` § 2026-07-25 + L-D-54. Régénérer l'état réel : `node studio/dino/content/scripts/export/_gen-etat-dinos.cjs`.

**Statut paléoart (MAJ 2026-07-18 via `_ETAT-DINOS.md` généré — périmé, voir l'alerte ci-dessus)** : **60/60 dinos complets** sur les 7 assets paléoart (hero + headshot/manger/paris/ecosysteme/funfact + coloriage) — gallimimus complété 2026-07-18 (batch série + MORPHO). Paléoart câblé en prod (`dev-dinos.html` lit `img/dinos/paleoart/`). L'ancienne question « déploiement immédiat ou validation ? » du batch 2026-07-10 est **close** (déployé). Régénérer l'état : `node studio/dino/content/scripts/export/_gen-etat-dinos.cjs`.

**Statut du bloc « noms vocaux » (décision 2026-07-06)** : Les 60 MP3 narrateur_h `site/audio/dinos/noms/{id}.mp3` sont un **6ᵉ type d'asset BONUS** hors des 5 blocs fiche standard (nom/taille/régime/funfact/recap). Raison : ton jeu [excited] distinct du ton fiche [neutral], usage exclusif mini-jeux (mj-24, mj-28, mj-31, mj-33), optionnel pour nouvelles fiches audio (EL quota). **Implication gouvernance** : la ligne INVARIANTS « Dinos avec audio complet » est désormais à **60/60** (✅ 2026-07-13, 9 Cénozoïque complétés — voir la ligne du tableau plus haut ; la valeur « 51 » de 2026-07-06 est **périmée**) ; le bloc bonus noms/ reste tracé à part. Homogénéisation possible post-reset (unifier tous noms en ton fiche) — décision différée Papa Yann.

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
