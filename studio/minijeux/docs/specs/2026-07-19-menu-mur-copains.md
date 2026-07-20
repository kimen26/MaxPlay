# Spec — Menu « Le Mur des Copains » (v0.5, 2026-07-20)

> Direction **validée par Papa Yann le 2026-07-19** : fusion M1 (Le Mur) + M3 (Les copains).
> **v0.5 — VERSION PRODUCT OWNER** : consolidation 42 prod + 29 POC → **24 jeux** (3-5 par
> copain). Chaque jeu est spécifié : mécanique (moteur de [`../MECANIQUES.md`](../MECANIQUES.md)),
> affichage, paliers 0★→3★, pourquoi pédagogique, jeux absorbés.
> **v0.6 (2026-07-20, soir)** : challenge externe adopté — **Spino à 4 jeux** (S5 bocal →
> célébration 3★ de S4) · **G4 sons collés différé** (déclencheur : 2★ sur G3) · **Para V1
> resserrée** (P1 + P2 + memory ; P3 après test réel ; P4/P5 en vague 3) · **build par MOTEUR,
> pas par copain** (durcir un moteur → décliner ses peaux) · **critère de coupe** : un jeu
> réussit si Max le relance seul dans la semaine (télémétrie du bloc Découverte) · vignettes
> copains **animées en CSS, sans génération d'images** · **pas de voix dans les menus** avant
> le GO « stable » de PY · jeux non accessibles **cachés** + phrase d'ouverture dans le repaire.

---

## 1. Principes

1. **Choix par image** : vignettes-photos du contenu réel, aucun titre à lire, pas d'emoji.
2. **Peu de choix** : 3-5 jeux par copain, jamais un annuaire.
3. **Zéro méta-monde** : pas de véhicule, pas de « jeu dans le jeu ».
4. **Un copain par domaine**, qui parle et donne envie.
5. **Catalogue complet + mj-pose-tiles + Max Adventure** → espace parents.
6. **Fontes (validée)** : consignes en script/majuscules · apprentissage en cursive · bi-alphabet dans le tri · bascule in game.
7. **1 mécanique principale par jeu** · difficulté = 2 régimes (golden 3 niveaux / niveaux précalculés) · étoile = partie 100% · jamais de timer ni de pénalité (STANDARD-MJ).

## 2. Le Mur — gardé par Tritri

Bloc **🔎 Découverte** (3 vignettes : 1 délaissé · 1 nouveau · 1 mise en avant du jour/semaine) + bloc **❤️ Préférés**. 5 copains-domaines en dessous, encyclopédie du Roi T-Rex épinglée en bas. Séquence 2★ dans chaque repaire. Relique : plus tard.

**Casting (validé)** : Tritri (hôte) · **Roi T-Rex** (dinos) · **Spino** (compter) · **Galli** (lire & écrire) · **Vélo** (casse-têtes) · **Para** (couleurs & monde, incl. échecs/dames — confirmé PY).

---

## 3. 🐊 SPINO — compter (5 jeux)

> Fil pédagogique : compter juste → reconnaître sans compter → +/- vécues → la dizaine → le sens des grandeurs. CRA partout, base 10 partout (décision PY).

### S1 · Les œufs surprises — *compter de 2 à 20*
- **Mécanique** : compter/subitizing (`mj-compte` : tirage par palier + distracteurs ±1..±3) — peau œufs. Multi-asset possible (œufs, poissons de Spino, passagers).
- **Affichage** : les objets apparaissent ; Max tape chacun → **pastille jaune numérotée** posée dessus (1, 2, 3…) ; le total est dit + affiché en gros ; si c'est juste → **les œufs éclosent** (le fun POC-01).
- **Paliers** : 0★ 2→5 · 1★ 3→10 · 2★ 5→15 · 3★ 5→20 **avec regroupement visuel par 5** au recomptage final (les paquets se forment sous ses yeux).
- **Pourquoi** : correspondance un-à-un + cardinalité (le dernier mot dit = la quantité) — LA fondation, concret avant tout.
- **Absorbe** : POC-01 · POC-02 (la pastille) · mj-04 · mj-26 · mj-45.

### S2 · Les constellations — *reconnaître sans compter (subitizing)*
- **Mécanique** : dés & regroupement (`mj-dice`, solveur anti-deadlock) — peau constellations ; **variante ombres dino** à la place des points (idée PY).
- **Affichage** : une constellation façon dé s'affiche → 3 nombres au choix ; après la réponse, le jeu **rappelle le calcul** : la constellation se décompose sous ses yeux (4 = 2+2).
- **Paliers** : 0★ 1→3 formes canoniques · 1★ 1→6 (dé) · 2★ 4→10 (2 groupes) · 3★ 6→12 + décomposition parlée.
- **Pourquoi** : le subitizing est la base du calcul mental ; la forme géométrique (dé/domino) est un ancrage visuel durable — coup de cœur PY.
- **Absorbe** : POC-06 · POC-18.

### S3 · Tout le monde monte ! — *le bus des passagers (+/− et ordre)*
- **Mécanique** : comptage QCM (`mj-compte`, peau bus) — le jeu bus unifié.
- **Affichage** : le bus 162, **2 fenêtres de 5 places** (jamais le bazar — consigne PY), passagers aux arrêts, **file d'attente** devant le bus.
- **Paliers** : 0★ combien de passagers (≤ 5, une fenêtre) · 1★ qui monte (+1/+2, jusqu'à 10) · 2★ monte **et** descend (10±n), places libres · 3★ compléments à 10 (« il manque combien pour remplir ? ») **+ ordre dans la file** (« fais monter le 2ᵉ Tritri », « le 3ᵉ bleu »).
- **Pourquoi** : l'addition/soustraction vécue (pas symbolique), les compléments à 10 = clé du calcul mental, l'ordinal en contexte réel.
- **Absorbe** : POC-03 (fenêtres de 5) · POC-08 · mj-05 (places libres) · mj-13a/13c (premier/combien avant → la file) · POC-11 (toboggan → la file).

### S4 · Les barquettes de 10 — *la dizaine*
- **Mécanique** : dés & regroupement (`mj-dice` — composition de groupes) — peau barquettes.
- **Affichage** : barquette 5×2 ; les objets arrivent, Max les range ; « 10 et 4, ça fait 14 » dit + affiché ; à 3★, mode « il me faut 14 » (blocs de 10 + unités — le « rendre la monnaie » de PY).
- **Paliers** : 0★ complète la barquette (il en manque 3) · 1★ 10+n (11→19) · 2★ 2 barquettes (jusqu'à 20+n) · 3★ remplis pour atteindre N **+ célébration bocal : les paquets de 10 brillent et descendent en barquettes** (geste clé récupéré de l'ex-S5).
- **Pourquoi** : la dizaine est la clé de voûte du système décimal (décision PY : 10 partout, pas 12) — prépare l'addition posée.
- **Absorbe** : POC-07 · mj-43 · POC-19 (blocs+unités → 3★) · POC-17 (animation du 100 → célébration 3★) · POC-12 (bocal → célébration de vérification 3★ — **S5 coupé, décision v0.6 : estimation de masses hors ZPD à 4 ans, le partage le remplacera plus tard, plus de valeur péda**).

~~### S5 · Le bocal géant~~ **COUPÉ (v0.6)** → son geste clé devient la célébration 3★ de S4. **Spino = 4 jeux qui bouclent le parcours, pas 5.** Le slot reste vide ; « À chacun sa part » (partage = division vécue) le prendra plus tard.

**Consignés plus tard** : À chacun sa part (partage) · Les paniers (×) · Pair ou impair · Les graines (mj-35, refonte en attente).

## 4. 🐔 GALLI — lire & écrire (5 jeux + 1 captcha)

> Fil pédagogique (Montessori/Ehri, sourcé triage §3) : **le son avant le nom · cursive d'abord · écrire avant lire**. Fonte d'apprentissage = cursive.

### G1 · Trouve la lettre — *le son d'abord*
- **Mécanique** : QCM-tap lettres — la consigne audio dit **le son** (/m/, jamais « ème » au début).
- **Affichage** : 4-6 grosses lettres cursives (clavier alphabétique en toile de fond).
- **Paliers** : 0★ sons simples, cursives · 1★ + autres allures (script, majuscules) · 2★ confusables (b/d/p/q) · 3★ le son entendu **dans un mot** (« quel son au début de "maman" ? »).
- **Pourquoi** : graphème↔phonème, la porte d'entrée (Max ne maîtrise peut-être pas toutes ses lettres — PY).
- **Absorbe** : POC-03 · POC-01 lecture (boîte à sons → palier 3).

### G2 · Le tri des lettres — *toutes les allures*
- **Mécanique** : drag&drop tri vers bacs (**moteur générique mj-08/09** — validé PY, multi-asset).
- **Affichage** : un chaos de lettres de toutes allures (cursives, scriptes, majuscules) à ranger dans les boîtes-lettres.
- **Paliers** : 0★ 2 lettres très différentes (a/o), cursives · 1★ cursive + script · 2★ + majuscules, lettres proches (b/d/h/k) · 3★ chaos dense + **boîtes-sons** (trier par son initial).
- **Pourquoi** : discrimination des allographes — « un super moyen d'apprendre à reconnaître ses lettres difficiles » (PY). Le même moteur sert Vélo (objets) et Para (couleurs).
- **Absorbe** : mj-09 (variante prioritaire) · POC-07 · mj-44 · mj-08.

### G3 · La boîte à mots — *écrire avant de lire*
- **Mécanique** : composition (alphabet mobile) — on DIT un mot (ou on montre l'image), Max l'assemble avec des lettres mobiles cursives.
- **Affichage** : la boîte montre le **découpage syllabique** en guide (pa | pa) ; lettres proposées limitées au début.
- **Paliers** : 0★ papa/maman (que les lettres du mot) · 1★ mots CV/CVC · 2★ distracteurs ajoutés · 3★ mot libre (son prénom, ses mots).
- **Pourquoi** : encoder précède décoder (Montessori, validé CNESCO 2016) — l'écriture sans la charge motrice du crayon.
- **Absorbe** : POC-12 · POC-11 (le syllabeur devient le guide intégré).

### G4 · Les sons collés — *on, ou, ch…* (spec gardée, **dev DIFFÉRÉ v0.6**)
- **Déclencheur objectif : Max tient 2★ sur G3 (boîte à mots)** → on ouvre ce chantier. Les graphèmes complexes s'attaquent APRÈS le décodage CVC fluide, pas pendant l'apprentissage des lettres. Seul jeu à code 100% neuf du pôle = coût max, valeur différée. Galli vit à 4 jeux + captcha en attendant.
- **Mécanique** : QCM-tap / assemblage — **code neuf justifié** (notion absente de la bibliothèque).
- **Affichage** : 2 lettres glissent l'une vers l'autre et **« collent » en un seul son** animé (o+n → « on ») ; Max choisit le duo qui fait le son entendu, puis complète un mot (t_ton).
- **Paliers** : 0★ on/ou · 1★ + oi/eu · 2★ + an/in/ch · 3★ dans des mots complets (tonton).
- **Pourquoi** : les graphèmes complexes sont LE mur de la lecture française — l'exemple même de PY (« il va lire o-n »).

### G5 · Lis et fais — *lire pour agir*
- **Mécanique** : lecture mot→image (moteur mj-23/27/06) — une consigne écrite en cursive, aide audio qui s'estompe.
- **Affichage** : paliers 0-1 = mot + images ; paliers 2-3 = la consigne du Chef de Gare au-dessus de la scène.
- **Paliers** : 0★ lis 1 mot → touche l'image · 1★ mot **découpé en syllabes** (vraies photos dino, pas d'audio — PY) · 2★ consigne action + quantité (« Pose 3 œufs rouges ») · 3★ **phrase rigolote** à 2 infos (phrases à impact, PY).
- **Pourquoi** : la lecture devient utile — on ne sait quoi faire QUE si on lit.
- **Absorbe** : mj-23 · mj-27 · POC-13 · POC-17 · POC-16 · mj-06.

### ◌ Le geste magique — *captcha traçage* (transverse, pas d'étoiles)
- Ça s'affiche, **5 secondes**, c'est fini : une lettre cursive, flèches d'ordre des traits, halo guide si immobile.
- ⚠️ **Prérequis avant tout dev : valider la précision du tracé tactile à l'écran** (décision PY).

## 5. 🦊 VÉLO — casse-têtes (5 jeux)

| # | Jeu | Moteur | Paliers 0★→3★ | Pourquoi |
|---|-----|--------|----------------|----------|
| V1 | **L'intrus** | suite/intrus (mj-15) | catégorie franche → attribut (couleur) → catégorie fine (1 herbivore parmi carnivores) → double critère | Catégorisation fine ; assets à monter (PY) |
| V2 | **Les cases mystères** | **Raven (mj-14 repêché)** — variante bus + **dino (PY)** | suite linéaire simple (AB/AAB, reconstruite propre — ex-mj-16) → grille 2×2 → 3×3 une règle → 3×3 deux règles | Logique de règle implicite ; Max adore et y arrive |
| V3 | **Trouve-le !** | cherche l'objet mobile (mj-19) — grand écran | 6 fixes → 12 → ça bouge → mode Charly (ressemblants : rayures/couleurs) | Attention sélective ; multi-assets bus/dinos/**lettres** (pont Galli) ; absorbe l'idée Charly-dino (mj-25) |
| V4 | **Le dépôt bloqué** | puzzle plateau BFS (mj-34) | 3 véhicules → 4-5 → 6 → coups comptés | Planification ; **un seul bus sort** (autres éteints) ; 🐛 avancement cassé à réparer |
| V5 | **Les potions** | water-sort (mj-18) | 3 tubes → 5 → 7 → 9+ | Réflexion pure, adoré (Max déjà à 8-9 tubes → rallonger) |

**Consignés plus tard** : Les blocs magiques (mj-39 — choisir tangram à remplir OU vrai Tetris) · Tangram des dinos (mj-40 — à faire tester) · Le garage (mj-17 → voir T3, version dino).

## 6. 👑 ROI T-REX — les dinos (4 jeux + 2 libres)

| # | Jeu | Moteur | Paliers 0★→3★ | Pourquoi |
|---|-----|--------|----------------|----------|
| T1 | **Le cache-cache des dinos** | ombres dino (`dinos-ombres`, mj-24) | 4 dinos nommés → 6 → 9 + ombres proches → **nom ÉCRIT** (pont lecture) | Discrimination + vocabulaire ; polish PY : son prout, dino détouré, animation finale |
| T2 | **La lampe magique** | révélation cachée (mj-28) | lampe large → **plus petite et plus forte** → + objets/bruits parasites | Attention, partiel→global ; « génial » (PY) |
| T3 | **Le vétérinaire des dinos** | séquençage (mj-17 **adapté dino** — idée PY) | 2 étapes → 3 → 4 ordre imposé → diagnostic (quel soin ?) | Séquençage d'actions ; le garage = préféré de Max, on garde l'âme |
| T4 | **La machine à voyager dans le temps** | tri-ordre (mj-31) | 3 ères → ordre précis → + **continents** (variante PY) → frise complète | Chronologie ; Max a déjà 3★ → la variante rallonge ; 🐛 SVG continents |

Libres : **L'atelier coloriage** (mj-32 — 🐛 galerie JSON non compressée, quotas) · **L'encyclopédie**. Bonus fan : **Du plus petit au plus grand** (mj-30).

## 7. 🎺 PARA — couleurs & monde (5 jeux + 2 libres)

| # | Jeu | Moteur | Paliers 0★→3★ | Pourquoi |
|---|-----|--------|----------------|----------|
| P1 | **L'atelier peinture** | manipulation couleur (mj-21) | couleurs pures → mélanges primaires → palette 2-3 couleurs imposée → **peindre un dino/avatar** (PY) | Couleurs + mélanges ; « génial » (PY) |
| P2 | **Compte avec le monde** | comptage QCM (mj-20 corrigé) | FR jusqu'à 5 → FR 10 + 1 pays ouvert → 2-3 pays → langues au choix | Origines brésiliennes ; **1-2 pays à la fois, pas jusqu'à 10 direct** (PY) |
| P3 | **Où est le pays ?** | QCM-tap carte (mj-22) | 5 pays → 10 → Europe → monde ; victoire = **drapeau + musique** (PY) | **Vague 2 — test réel d'abord** (« jamais marché ») |
| P4 | **Les échecs** | puzzle plateau précalculé (mj-37 **refonte totale**) | une pièce à déplacer (règle expliquée : « le fou va en diagonale ») → 2 pièces → petit mat | **Vague 3** — vraies pièces, plateau entier (spec validée, dev différé) |
| P5 | **Les dames** | puzzle plateau précalculé (mj-38 **refonte totale**) | prise simple → rafle → partie guidée | **Vague 3** — idem |
| P6 | **Le memory** | moteur multi-thèmes (ex-mj-33) | 6 cartes → 8 → 12 → thème au choix | **Promu jeu V1** (v0.6) — thèmes : dinos, véhicules, animaux |

Libres : **Le coin écoute** (mj-12). Plus tard : **La traversée** (mj-42 — mécanique contourner/traverser à trouver) · **Les fiches pays** (idée mj-11).

## 8. Plan de build (v0.6 — par MOTEUR, pas par copain)

> Adopté du challenge externe : durcir un moteur (golden, paliers, multi-peau) → décliner ses
> peaux dans la foulée. S1+S3+P2 = le même moteur habillé 3 fois. Construire copain par copain
> = retoucher chaque moteur 3 fois.

| Vague | Contenu | Jeux visibles |
|-------|---------|---------------|
| **V1 (socle)** | Moteurs comptage QCM + dés/regroupement durcis → Spino complet (S1→S4) · Galli G1/G2 (moteur tri) · Vélo V3/V5 (existent) · T-Rex T1/T2 (existent) · Para P1/P2 + memory (existent) | **14 jeux** dont ~10 existent déjà |
| **Vague 2** | G3 boîte à mots · G5 lis-et-fais · captcha (si test tactile OK) · V1 intrus (assets) · V2 Raven · V4 dépôt (🐛 avancement) · T3 vétérinaire · T4 frise (SVG) · P3 géo (après test) | +9 |
| **Vague 3 (paris)** | P4 échecs · P5 dames · G4 sons collés (déclencheur 2★ G3) · tangram/tetris · partage · traversée · fiches pays | selon tests |

**Critère de coupe continu** : un jeu réussit si **Max le relance seul dans la semaine** — la télémétrie du bloc Découverte (derniers joués, délaissés) le mesure gratuitement.

**Décisions d'implémentation (PY, 2026-07-20 soir)** :
- Vignettes copains : **CSS animées, zéro génération d'images** — chiffres flottant autour de la tête (Spino) · lettres cursives (Galli) · drapeaux (Para) · **ombres de dino** (T-Rex — « c'est drôle ça ») · pièces/cerveau (Vélo). Têtes = assets existants (`site/img/dinos/`).
- **Pas de voix/TTS dans les menus** avant le GO « stable » de PY.
- Jeux non accessibles : **cachés** (pas de cadenas « bientôt ») + phrase en entrant dans le repaire (« Obtiens ★★ sur … pour ouvrir un nouveau jeu ! »).
- **Encyclopédie Roi T-Rex : visibilité SPÉCIALE** (gros portail, pas une vignette parmi les autres) — bas du Mur + tête de repaire T-Rex.

## 9. Bilan de la consolidation

| | Avant | Après |
|---|---|---|
| Jeux prod | 42 | **10 supprimés** (mj-04, 05, 16, 25, 26, 29, 33, 36, 45 + 41 caché) · le reste **fusionné ou absorbé** dans 24 jeux |
| POC | 29 | **13 absorbés** dans les jeux ci-dessus · 9 jetés · 6 plus tard · 1 à créer (G4) |
| **Total visible pour Max** | 42 | **24 jeux** (5+5+5+4+5) + 4 libres + 1 captcha |

- **3 moteurs transverses** font le gros du travail : tri-bacs (G2 + rangement) · comptage QCM (S1, S3, P2) · dés/regroupement (S2, S4). Les POC deviennent des **peaux** de ces moteurs, pas des jeux neufs.
- **Répétition espacée** : assurée par le bloc Découverte de Tritri (délaissés qui reviennent), pas par des jeux en plus.

## 9. Questions encore ouvertes

1. Validation de CETTE version (24 jeux) — c'est la proposition à challenger.
2. **Précision tactile du traçage** (captcha) : test tablette avant dev.
3. Voix des copains (narration, en temps voulu) · relique (plus tard) · police cursive prod (licence).
4. **Dettes techniques** : 🐛 cloud.js sur 32 MJ · 🐛 avancement mj-34 · 🐛 images mj-27/41 · 🐛 SVG continents mj-31 · 🐛 galerie compressée mj-32.
5. Annotations partie A → `status='traite'` via SQL/MCP.

_Spec v0.5 — 2026-07-20. Version à valider par Papa Yann avant toute implémentation._
