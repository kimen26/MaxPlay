# Spec — Menu « Le Mur des Copains » (v0.3, 2026-07-20)

> Direction **validée par Papa Yann le 2026-07-19** : fusion M1 (Le Mur) + M3 (Les copains)
> de l'audit [`../../pmo/audits/2026-07-19-menu-parcours.md`](../../pmo/audits/2026-07-19-menu-parcours.md) §9.
> **v0.3** : intègre la **partie B** des commentaires (26 jeux, localStorage — cf.
> [`2026-07-20-commentaires-supabase-mj.md`](2026-07-20-commentaires-supabase-mj.md) ;
> synthèse : [`../../pmo/audits/2026-07-19-triage-poc-design.md`](../../pmo/audits/2026-07-19-triage-poc-design.md) §7).
> Changements majeurs : mj-16/mj-36 supprimés · mj-35/mj-38 repêchés · échecs & dames « sérieux »
> · mj-pose-tiles + Max Adventure hors menu principal · 3 moteurs génériques confirmés.
> (v0.2 : Tritri hôte du Mur, Roi T-Rex dinos, traçage « captcha », partie A des commentaires.)

---

## 1. Principes (ce que le Mur copie de l'encyclopédie)

1. **Choix par image** : vignettes-photos reconnaissables, aucun titre à lire.
2. **Peu de choix** : les copains + 2 petits blocs gérés par Tritri. Jamais 42 entrées.
3. **Zéro méta-monde** : pas de véhicule, pas de carte, pas de « jeu dans le jeu ».
4. **Chaque domaine a un visage** : un copain qui parle et donne envie (« j'ai besoin de toi pour… »).
5. **Le catalogue complet déménage** dans l'espace parents — **ainsi que mj-pose-tiles et Max Adventure** (décision PY partie B : hors menu principal, écran parental / mot de passe).

## 2. Le Mur — écran d'accueil, gardé par Tritri

```
┌─────────────────────────────────────────────┐
│  [avatar]  ★ 12                             │
│                                             │
│  🦕 TRITRI (accueil, parle)                 │
│  ┌─ 🔎 Découverte ──────┐ ┌─ ❤️ Préférés ──┐│
│  │ [jeu] [jeu] [jeu]    │ │ [jeu] [jeu] …  ││
│  └──────────────────────┘ └────────────────┘│
│                                             │
│   👑 ROI T-REX   🐊 SPINO    🐔 GALLI       │
│   « les dinos »  « compter » « lire »       │
│                                             │
│   🦊 VÉLO            🎺 PARA                │
│   « casse-têtes »    « couleurs & monde »   │
│                                             │
│  📖 L'encyclopédie du Roi T-Rex (en bas)    │
└─────────────────────────────────────────────┘
```

- **Tritri est l'hôte du Mur** (décision PY 2026-07-20) — pas un copain de catégorie. Il accueille et gère **2 blocs** :
  - **🔎 Découverte** : 3 vignettes en rotation curée (1 jeu délaissé = répétition espacée déguisée · 1 nouveau débloqué · 1 **mise en avant du jour ou de la semaine** — un seul jeu OU une catégorie entière, décision PY). Les jeux maîtrisés sortent de la rotation.
  - **❤️ Préférés** : favoris / derniers joués (reprend la rangée ❤️ actuelle — auto-remplie, pins gérés côté parents).
- **5 copains-domaines** en grosses vignettes (photo/render du dino, pas un emoji). Le copain SE PRÉSENTE en audio au tap.
- **L'encyclopédie reste épinglée en bas** — « chez le Roi T-Rex ».
- Tap sur un copain → **son repaire** : il parle (réplique d'accueil), puis SES jeux en vignettes avec ★ et cadenas (séquence 2★ conservée).
- Relique du copain au-dessus des étoiles : **idée consignée, plus tard** (décision PY).

## 3. Les personnages (validés PY 2026-07-20)

| Personnage | Dino | Rôle | Personnalité |
|------------|------|------|--------------|
| **Tritri** | Tricératops | 🏠 Hôte du Mur (Découverte + Préférés) | Le dino-racine de MaxPlay (code TRITRI). Doux, rassurant, le grand frère qui guide. |
| **Roi T-Rex** | T-Rex | 🦕 Les dinos + encyclopédie | LE famous. Majestueux mais bon copain — le gardien du musée. |
| **Spino** | Spinosaure | 🔢 Compter | Le plus grand prédateur… qui se trompe TOUT LE TEMPS en comptant ses poissons. |
| **Galli** | Gallimimus | 📖 Lire & écrire | Jeu de mots « Galli lit ». Rapide, curieuse, dévore les histoires. |
| **Vélo** | Vélociraptor | 🧩 Casse-têtes | Le plus malin. Énigmes et pièges « trop durs pour lui ». |
| **Para** | Parasaurolophus | 🎨🌍 Couleurs & monde | Sa crête = trompette → l'artiste/musicien : couleurs, sons, drapeaux, langues. |

Répliques d'accueil (drafts — voix du pôle narration à brancher **en temps voulu**) :

- **Tritri** : « Salut ! Regarde ce que j'ai trouvé pour toi aujourd'hui… »
- **Roi T-Rex** : « Bienvenue dans MON musée ! Je connais tous les dinos, même les plus bizarres. »
- **Spino** : « Tu peux m'aider à compter mes poissons ? Je me trompe TOUT LE TEMPS. »
- **Galli** : « Bienvenue dans mon coin lecture ! Aujourd'hui, on découvre quoi ? »
- **Vélo** : « Psst ! J'ai des énigmes trop dures pour moi. T'es partant ? »
- **Para** : « Bienvenue dans mon atelier ! On peint, on écoute, on voyage ! »

## 4. Les jeux par copain (ordre d'accès = ordre de la liste, déblocage 2★)

### 🦕 Roi T-Rex — les dinos

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun / retours PY |
|---|-----|--------|--------|-------------------|------------------|
| 1 | Trouve le dino | mj-24 **polir** | ★ | Discrimination visuelle + vocabulaire (TTS) | Adoré de Max. Son d'erreur rigolo (prout), dino détouré en récompense 1er coup, animation finale + applaudissements, + de cases |
| 2 | La lampe du paléontologue | mj-28 **polir** | ★★ | Attention, partiel→global | « Génial » : + bruit/objets, lampe plus petite et plus forte |
| 3 | Le grand voyage du temps | mj-31 | ★★★ | Chronologie Trias→Crétacé | Max a ses 3★ ! Variante continents · 🐛 **SVG continents à refaire** |
| — | Range-les par taille | mj-30 | **bonus** | Sériation, mètres réels | Réservé niveau avancé/fan |
| — | Atelier coloriage (libre) | mj-32 | libre | Motricité, expression | « Trop top ». 🐛 galerie **JSON zones/couleurs non compressé**, quotas 3 gratuit / 5-10 compte |
| — | **Encyclopédie** (code TRITRI) | dev-dinos | libre | Référence, autonomie | Son refuge |

**Sorties** : mj-25 🗑️ (idée « Où est Charly dino » consignée → moteur « trouve le X » de Vélo) · mj-26 🗑️ (idée **ombres dino sur dés** → constellations Spino) · mj-29 🗑️ · mj-33 🗑️ (memory → moteur générique multi-thèmes, cf. Para) · mj-27 → **Galli** · mj-40 → **Vélo** (à tester) · mj-41 → au chaud, pas affiché V1.

### 🔢 Spino — compter

Progression CRA, base 10 partout (barquette = 10 ; lignes de 10 confirmées PY sur mj-43) :

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun / retours PY |
|---|-----|--------|--------|-------------------|------------------|
| 1 | L'éclosion | POC compte-01 | ★ | Compter 1→5, un-à-un (rond de pointage intégré) | Les œufs éclosent ! |
| 2 | Les constellations | POC 06 (+18) | ★ | **Subitizing** par la forme | Variante PY : **ombres dino à la place des points** |
| 3 | Remplis les caisses | mj-43 **retravailler** | ★ | « Remplir pour atteindre N » ≈ rendre la monnaie | **Lignes de 10** (aligné barquettes) |
| 4 | Les barquettes de 10 | POC 07 | ★★ | Dizaine : 10+4, 10+7… | Remplir la barquette |
| 5 | Le bus des passagers | POC 08 (+03) | ★★ | +/−, places libres, fenêtres-groupes de 5 | Absorbe les idées mj-04/05/45 (supprimés) |
| 6 | Le toboggan ordinal | POC 11 (variante) | ★★ | Ordinaux : « le 2e Tritri », « le 3e bleu » | File au toboggan |
| 7 | Le bocal | POC 12 | ★★★ | Estimation 10/50/100, paquets de 10 → barquettes | Masses impressionnantes |
| 8 | Par paquets | POC 19 | ★★★ | Groupements (blocs + unités) | Construire par blocs |
| 9 | Le partage | POC 20 reformulé | ★★★ | Partage à égalité | Donner des fraises aux copains |
| + | Les graines | mj-35 **refonte totale** | ? | Règle + animation + pots à revoir entièrement | Repêché par PY |
| + | Les paniers (×) | POC 10 | ++ | Groupes égaux, décomposition | Plus tard |
| + | Pair/impair | POC 13 | ++ | Parité | Plus tard |

**Sorties** : mj-04 🗑️ · mj-05 🗑️ (idée → bus) · mj-45 🗑️ (doublon mj-43) · POC 05, 14 🗑️ · POC 15 → outil parent 🕐 · POC 16 monnaie 🕐.

### 📖 Galli — lire & écrire

Progression : **sons avant noms de lettres · cursive d'abord · ÉCRIRE AVANT LIRE** (cursive demandée par PY sur mj-06, 09, 23, 27).

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun / retours PY |
|---|-----|--------|--------|-------------------|------------------|
| 1 | Trouve la lettre | POC lecture-03 | ★ | Reconnaissance lettres — **le SON** d'abord | Clavier/ordre alphabétique |
| 2 | Le grand tri des lettres | **mj-09 moteur tri** (+ mj-08, mj-44, POC 07) — **prioritaire** | ★ | Cursive + script + majuscules : b/d/h/j/k | « Super moyen d'apprendre » ; boîte = lettre/son/couleur, multi-asset |
| 3 | L'alphabet mobile | POC 12 | ★★ | **Composer avant de lire** (Montessori) | Écrire « papa » tout seul |
| 4 | Syllabo | POC 11 refondu UX | ★★ | Décodage CV, répétition espacée | Rythme des syllabes |
| 5 | Les sons à 2 lettres | **À INVENTER** (POC 10) | ★★ | on/ou/ch/eu | Le « on » de tonton |
| 6 | Lis le mot (initiatique) | mj-23 **refondu** + POC 13 | ★★★ | Syllabes simples, cursive + majuscule, mot→image | 1 jeu initiatique… |
| 7 | Lis la phrase (dynamique) | mj-06 enrichi + **mj-27** | ★★★ | Mot manquant, découpage syllabes dino | …+ 1 dynamique : **phrases à impact** (rire) ; mj-27 : vraies photos, audio retiré (1ʳᵉ syllabe max), 🐛 images cassées |
| 8 | Le Chef de Gare | POC 17 (fix Œ + mise en page) | ★★★ | **Lire pour agir** | « Pose 3 œufs rouges ! » |
| 9 | Le bus des phrases | POC 16 | +++ | Compréhension de phrase | Bus ROUGE = image rouge |
| ◌ | **Le geste magique** | POC 05 | jeu « captcha » | Traçage cursive | **Ça s'affiche, 5 s max, c'est fini.** ⚠️ Valider la précision tactile AVANT d'investir + flèches d'ordre + halo guide |

**Sorties** : POC 02, 06, 08, 09, 18, 19 🗑️ · POC 14 blending TTS 🕐 · POC 15 drapeaux-mots 🕐.

### 🧩 Vélo — casse-têtes

| # | Jeu | Source | Niveau | Pourquoi | Fun / retours PY |
|---|-----|--------|--------|----------|------------------|
| 1 | L'intrus | mj-15 | ★ | Catégorisation fine | Intrus discret validé ; 💄 monter les assets |
| 2 | Le premier bus | mj-13a + **mj-13c regroupés** | ★ | Ordinaux | Redesign panneau ; difficulté 0 à revoir ; **2 modes explicites** (ou niveaux) |
| 3 | Le grand rangement | moteur tri (mj-08) | ★★ | Tri multicritère | Même moteur que Galli #2, assets objets |
| 4 | Trouve le X | **mj-19 moteur** — grand écran | ★★ | Poursuite visuelle, attention | « Très bien » : déclinaisons bus/dinos/**lettres**/mouvant (+ idée Charly-dino de mj-25) |
| 5 | Le garage | mj-17 | ★★ | Séquençage d'actions | **Un des préférés de Max** ; options fixes ; adaptation dino possible |
| 6 | Tubes de couleurs | mj-18 **polir** | ★★★ | Réflexion/stratégie | « Génial, adoré » — 8-9 tubes atteints |
| 7 | Le dépôt bloqué | mj-34 **refondre UX** | ★★★ | Planification | Un seul bus sort (éteindre les autres) ; 🐛 **suivi d'avancement cassé** |
| 8 | Croque-échecs | mj-37 **revoir totalement** | ★★★ | Vraies règles d'échecs | **Vraies pièces + plateau entier + règle expliquée** (« le fou va en diagonale ») — pas de bonhomme-pommes, pas de déguisement |
| 9 | Les dames | mj-38 **revoir totalement** | ★★★ | Vraies règles de dames | Idem : vrai plateau, règle + indices |
| 10 | Blocs magiques | mj-39 **repenser** | ★★★ | Spatial | Choisir : tangram à remplir (niv 1) OU vrai Tetris qui descend |
| ? | Tangram des dinos | mj-40 | **à tester** | Géométrie | Repêché par PY — à faire tester à Max |

**Sorties** : mj-16 🗑️ (ligne illogique) · mj-36 🗑️ (pas de choix possible ; idée gardée).
⚠️ Placement échecs/dames : PY dit « jeu du monde » ; pédagogiquement c'est de la stratégie pure → **chez Vélo**, sauf si PY préfère Para. À trancher (§6).

### 🎨🌍 Para — couleurs & monde

| # | Jeu | Source | Niveau | Pourquoi | Fun / retours PY |
|---|-----|--------|--------|----------|------------------|
| 1 | Peins les bus | mj-21 **étendre** | ★ | Mélanges de couleurs | « Génial » — palettes 1/2/3 couleurs, coloriage dino atelier/avatar |
| 2 | Compte en langues | mj-20 **corrigé** | ★★ | Origines brésiliennes | **1-2 pays ouverts à la fois**, pas compter jusqu'à 10 direct ; autres langues plus tard |
| 3 | Trouve le pays | mj-22 **à tester** | ★★★ | Géographie | « Jamais marché donc jamais joué » ; victoire = drapeau + musique |
| — | Memory générique | ex-mj-33, moteur multi-thèmes | libre | Mémoire visuelle | Thèmes : dinos, véhicules, animaux, fleurs… |
| — | Coin écoute | mj-12, **jeu libre** | libre | Écoute | Sons + dessin + vidéos, juste pour écouter |
| + | Shisima / traversée | mj-42 **mécanique à trouver** | ++ | Stratégie | Milieu = win immédiat ; idée **contourner/traverser** (backgammon-like) |
| + | Fiches pays | idée mj-11 | ++ | Culture | Drapeaux multiples, situer, animal du pays — **pas V1** |

**Sorties** : mj-11 écarté (idée fiches pays 🕐) · mj-36 🗑️ · **mj-pose-tiles + Max Adventure → espace parents** (hors menu, décision PY).

## 5. Bilan chiffré (après parties A + B — couverture 41/42 jeux)

- **Prod supprimés (10)** : mj-04, mj-05, mj-16, mj-25, mj-26, mj-29, mj-33, mj-36, mj-45 + mj-41 caché V1.
- **Moteurs génériques (3, confirmés PY)** : tri en boîtes (mj-09+08+44) · « trouve le X » (mj-19) · « remplir pour atteindre N » (mj-43, lignes de 10).
- **Refontes totales** : mj-35, mj-37 (échecs), mj-38 (dames) · **repenser** : mj-39, mj-42.
- **Polissages** : mj-24, mj-28, mj-21, mj-18, mj-31 (SVG continents), mj-32 (galerie JSON), mj-34 (UX + avancement), mj-13a/13c (regroupés), mj-15 (assets), mj-23, mj-06, mj-20, mj-43.
- **Hors menu principal** : mj-pose-tiles, Max Adventure → espace parents.
- **POC retenus** : ~12 jeux + 1 à inventer (sons 2 lettres).
- Cible : **~33 jeux visibles**, jamais plus de ~10 par copain, 3 vignettes Découverte sur le Mur.

## 6. Questions transverses ouvertes

1. **Politique de fonte globale** (mj-28 + partie B : cursive demandée sur mj-06/09/23/27) : Max lit mieux en majuscule/script, l'école impose la cursive. Proposition : consignes en script, apprentissage en cursive, bi-alphabet dans le tri, bascule in game ? **À trancher.**
2. **Placement échecs/dames** (mj-37/38) : Vélo (stratégie) ou Para (« jeu du monde ») ?
3. **Précision tactile du traçage** : test tablette avant investissement (décision PY).
4. Voix des copains (pôle narration, en temps voulu) · relique (plus tard) · police cursive prod (ABCursive vs DN Manuscript vs Cursif + licence).
5. **Dettes techniques remontées** : 🐛 cloud.js non chargé sur 32 MJ (commentaires perdus) · 🐛 avancement mj-34 · 🐛 images cassées mj-27/41 · 🐛 SVG continents mj-31 · 🐛 galerie compressée mj-32.
6. Statut des annotations partie A → `status='traite'` (résolution = spec v0.3 + commit) via accès SQL/MCP ; partie B suivie dans le fichier d'extraction.

_Spec v0.3 — 2026-07-20. Reste à valider : §6. Implémentation après arbitrages finaux._
