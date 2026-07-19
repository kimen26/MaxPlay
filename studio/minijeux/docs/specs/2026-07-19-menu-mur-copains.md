# Spec — Menu « Le Mur des Copains » (v0.4, 2026-07-20)

> Direction **validée par Papa Yann le 2026-07-19** : fusion M1 (Le Mur) + M3 (Les copains)
> de l'audit [`../../pmo/audits/2026-07-19-menu-parcours.md`](../../pmo/audits/2026-07-19-menu-parcours.md) §9.
> **v0.4** : politique de fonte **validée** · **mj-14 (Matrices de Raven) repêché** (+ variante
> dino demandée) · échecs/dames → **Para** (proposition, à confirmer) · **titres & vignettes
> challengés** (§7). (v0.3 : partie B des commentaires ; v0.2 : Tritri hôte, Roi T-Rex, traçage captcha.)

---

## 1. Principes

1. **Choix par image** : vignettes-photos reconnaissables, aucun titre à lire.
2. **Peu de choix** : les copains + 2 petits blocs gérés par Tritri. Jamais 42 entrées.
3. **Zéro méta-monde** : pas de véhicule, pas de carte, pas de « jeu dans le jeu ».
4. **Chaque domaine a un visage** : un copain qui parle et donne envie.
5. **Le catalogue complet déménage** dans l'espace parents — **ainsi que mj-pose-tiles et Max Adventure** (décision PY).
6. **Politique de fonte (VALIDÉE PY 2026-07-20)** : consignes en **script/majuscules** · contenu d'apprentissage en **cursive** · bi-alphabet dans les jeux de tri/reconnaissance · bascule possible in game (réglage).

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

- **Tritri, hôte du Mur** : bloc **🔎 Découverte** (3 vignettes en rotation curée : 1 délaissé · 1 nouveau · 1 mise en avant du jour/semaine — 1 jeu OU 1 catégorie) + bloc **❤️ Préférés** (favoris / derniers joués).
- **5 copains-domaines** en grosses vignettes-photo ; chacun se présente en audio au tap.
- Tap → **repaire du copain** : réplique d'accueil + ses jeux en vignettes ★/cadenas (séquence 2★).
- Relique au-dessus des étoiles : **idée consignée, plus tard**.

## 3. Les personnages (validés)

| Personnage | Dino | Rôle | Réplique d'accueil (draft) |
|------------|------|------|---------------------------|
| **Tritri** | Tricératops | 🏠 Hôte du Mur | « Salut ! Regarde ce que j'ai trouvé pour toi aujourd'hui… » |
| **Roi T-Rex** | T-Rex | 🦕 Dinos + encyclo | « Bienvenue dans MON musée ! » |
| **Spino** | Spinosaure | 🔢 Compter | « Tu m'aides à compter mes poissons ? Je me trompe TOUT LE TEMPS. » |
| **Galli** | Gallimimus | 📖 Lire & écrire | « Aujourd'hui, on découvre quoi ? » |
| **Vélo** | Vélociraptor | 🧩 Casse-têtes | « Psst ! Des énigmes trop dures pour moi. T'es partant ? » |
| **Para** | Parasaurolophus | 🎨🌍 Couleurs & monde | « On peint, on écoute, on voyage ! » |

## 4. Les jeux par copain — liste définitive (titres challengés, §7 pour les vignettes)

### 🦕 Roi T-Rex — les dinos

| # | Titre vignette (proposé) | Source | Niveau | Notes PY intégrées |
|---|--------------------------|--------|--------|--------------------|
| 1 | **Le cache-cache des dinos** | mj-24 polir | ★ | Son prout, dino détouré 1er coup, animation finale + applaudissements |
| 2 | **La lampe magique** | mj-28 polir | ★★ | Bruit/objets, lampe plus petite/forte |
| 3 | **La machine à voyager dans le temps** | mj-31 | ★★★ | Variante continents · 🐛 SVG continents à refaire |
| — | **Du plus petit au plus grand** | mj-30 | bonus | Niveau fan |
| — | **L'atelier coloriage** | mj-32 | libre | 🐛 galerie JSON non compressée, quotas 3/5-10 |
| — | **L'encyclopédie du Roi T-Rex** | dev-dinos | libre | Le refuge |

### 🐊 Spino — compter

| # | Titre vignette | Source | Niveau | Notes |
|---|----------------|--------|--------|-------|
| 1 | **Les œufs surprises** | POC-01 | ★ | 1→5, rond de pointage |
| 2 | **Les constellations** | POC-06+18 | ★ | Subitizing ; variante ombres dino |
| 3 | **Remplis la caisse** | mj-43 retravailler | ★ | Lignes de 10 |
| 4 | **Les barquettes de 10** | POC-07 | ★★ | 10+4, 10+7… |
| 5 | **Tout le monde monte !** | POC-08+03 | ★★ | +/−, places libres, fenêtres de 5 |
| 6 | **À qui le tour ?** | POC-11 | ★★ | Ordinaux : « le 2e Tritri » |
| 7 | **Le bocal géant** | POC-12 | ★★★ | 10/50/100 → barquettes |
| 8 | **Les gros paquets** | POC-19 | ★★★ | Blocs + unités |
| 9 | **À chacun sa part** | POC-20 | ★★★ | Partage à égalité |
| + | **Les graines** | mj-35 refonte totale | ? | Règle + animation à revoir |
| + | **Les paniers** | POC-10 | ++ | Groupes égaux |
| + | **Pair ou impair ?** | POC-13 | ++ | Parité |

### 🐔 Galli — lire & écrire

| # | Titre vignette | Source | Niveau | Notes |
|---|----------------|--------|--------|-------|
| 1 | **Trouve la lettre** | POC-03 | ★ | Le SON d'abord, nom au palier 2 |
| 2 | **Le tri des lettres** | mj-09 moteur (+08, 44) | ★ | Cursive/script/majuscules : b/d/h/j/k — **prioritaire** |
| 3 | **La boîte à mots** | POC-12 | ★★ | Alphabet mobile : écrire avant lire |
| 4 | **Syllabo** | POC-11 refondu | ★★ | CV, répétition espacée |
| 5 | **Les sons collés** | À INVENTER (POC-10) | ★★ | o+n → « on » |
| 6 | **Lis le mot** | mj-23 + POC-13 | ★★★ | Initiatique : syllabes simples |
| 7 | **La phrase rigolote** | mj-06 + mj-27 | ★★★ | Dynamique : phrases à impact ; mj-27 sans audio, vraies photos, 🐛 images |
| 8 | **Le Chef de Gare** | POC-17 | ★★★ | Lire pour agir ; 🐛 ligature Œ |
| 9 | **Le bus des phrases** | POC-16 | +++ | Bus ROUGE = image rouge |
| ◌ | **Le geste magique** | POC-05 | captcha | 5 s chrono ; ⚠️ valider précision tactile d'abord |

### 🦊 Vélo — casse-têtes

| # | Titre vignette | Source | Niveau | Notes |
|---|----------------|--------|--------|-------|
| 1 | **L'intrus** | mj-15 | ★ | Intrus discret ; 💄 assets |
| 2 | **La course des bus** | mj-13a + 13c | ★ | Panneau d'affichage ; 2 modes explicites |
| 3 | **Les cases mystères** | **mj-14 REPÊCHÉ** | ★★ | **Matrices de Raven** — Max adore, variante bus OK → **variante dino demandée** (PY) |
| 4 | **Le grand rangement** | moteur tri (mj-08) | ★★ | Même moteur que Galli #2, assets objets |
| 5 | **Trouve-le !** | mj-19 moteur | ★★ | Grand écran : bus/dinos/lettres/mouvant (+ Charly-dino) |
| 6 | **Le garage** | mj-17 | ★★ | Préféré de Max ; options fixes |
| 7 | **Les potions** | mj-18 | ★★★ | Adoré — 8-9 tubes |
| 8 | **Le dépôt bloqué** | mj-34 refondre | ★★★ | Un seul bus sort ; 🐛 avancement cassé |
| 9 | **Les blocs magiques** | mj-39 repenser | ★★★ | Tangram à remplir OU vrai Tetris |
| ? | **Le tangram des dinos** | mj-40 | à tester | Repêché par PY |

### 🎺 Para — couleurs & monde

| # | Titre vignette | Source | Niveau | Notes |
|---|----------------|--------|--------|-------|
| 1 | **L'atelier peinture** | mj-21 étendre | ★ | Palettes 1/2/3 couleurs, dino atelier/avatar |
| 2 | **Compte avec le monde** | mj-20 corrigé | ★★ | 1-2 pays à la fois, pas jusqu'à 10 direct |
| 3 | **Où est le pays ?** | mj-22 à tester | ★★★ | Victoire = drapeau + musique |
| 4 | **Les échecs** | mj-37 refonte totale | ★★★ | **Vraies pièces + plateau entier + règle expliquée** |
| 5 | **Les dames** | mj-38 refonte totale | ★★★ | **Vrai plateau + règle + indices** |
| — | **Le memory** | moteur ex-mj-33 | libre | Multi-thèmes |
| — | **Le coin écoute** | mj-12 | libre | Sons + dessin + vidéos |
| + | **La traversée** | mj-42 mécanique à trouver | ++ | Contourner/traverser (backgammon-like) |
| + | **Les fiches pays** | idée mj-11 | ++ | Drapeaux, situer, animal du pays — pas V1 |

**Échecs/dames chez Para (proposition à confirmer)** : Vélo est déjà le plus chargé (10 jeux), Para le plus léger ; PY les appelle « jeux du monde » ; Para = copain des cultures du monde, échecs/dames = classiques mondiaux. Veto possible → Vélo.

**Espace parents** : catalogue complet, mj-pose-tiles, Max Adventure, mj-41 (au chaud).

## 5. Bilan chiffré (couverture 41/42 + mj-14)

- **Supprimés (10)** : mj-04, 05, 16, 25, 26, 29, 33, 36, 45 + mj-41 caché V1.
- **Repêchés (4)** : mj-14 (Raven), mj-35, mj-38, mj-40 (à tester).
- **Moteurs génériques (3)** : tri en boîtes · « trouve le X » · « remplir pour atteindre N ».
- **Refontes totales** : mj-35, mj-37, mj-38 · **repenser** : mj-39, mj-42.
- **Cible** : **~34 jeux visibles**, ≤ ~10 par copain, 3 vignettes Découverte sur le Mur.

## 6. Règles des vignettes (§7)

- **Image = contenu réel du jeu** (render dino, bus, œufs, lettres), jamais un emoji ni un pictogramme abstrait — c'est ce qui a fait échouer le menu actuel auprès de Max.
- Pas de texte dans la vignette (le copain dit le titre en audio).
- Style cohérent : rendu cartoon du jeu lui-même, fond sombre unifié (charte design-shared).
- État cadenas = vignette grisée + 🔒 ; étoiles ★ discrètes en coin.

## 7. Idées de vignettes par jeu (à produire au moment de l'implémentation)

- Roi T-Rex : dino détouré parmi silhouettes · œil de dino éclairé dans le noir · météorite + 3 ères · lignée croissante · dino à moitié colorié.
- Spino : œuf qui craque · constellation de 5 ombres · caisse de dés · barquette 5×2 · bus 162 et ses fenêtres · file au toboggan · bocal de billes · blocs+unités · fraises partagées.
- Galli : clavier de lettres cursives · boîtes + lettres de plusieurs allures · lettres mobiles formant « papa » · ma-mi-mu · o+n → « on » · mot + image · phrase à trou · loup chef de gare · bus rouge · « a » qui s'allume.
- Vélo : 4 carnivores + 1 herbivore · panneau de gare · grille 3×3 avec « ? » · bazar + bacs · foule mouvante · bus sur le pont · tubes colorés · bus coincé · blocs qui tombent.
- Para : bus à moitié peint · drapeaux FR/PT/EN · carte + drapeau · plateau d'échecs · damier · cartes memory · casque audio.

## 8. Questions encore ouvertes

1. **Échecs/dames → Para ?** (proposition §4, veto possible vers Vélo)
2. **Précision tactile du traçage** : test tablette avant investissement.
3. Voix des copains (pôle narration, en temps voulu) · relique (plus tard) · police cursive prod (ABCursive vs DN Manuscript vs Cursif + licence).
4. **Dettes techniques** : 🐛 cloud.js non chargé sur 32 MJ · 🐛 avancement mj-34 · 🐛 images mj-27/41 · 🐛 SVG continents mj-31 · 🐛 galerie compressée mj-32.
5. Annotations partie A → `status='traite'` via SQL/MCP ; partie B suivie dans le fichier d'extraction.

_Spec v0.4 — 2026-07-20. Reste à valider : §8.1 (échecs/dames). Implémentation après._
