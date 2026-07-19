# Spec — Menu « Le Mur des Copains » (v0.2, 2026-07-20)

> Direction **validée par Papa Yann le 2026-07-19** : fusion M1 (Le Mur) + M3 (Les copains)
> de l'audit [`../../pmo/audits/2026-07-19-menu-parcours.md`](../../pmo/audits/2026-07-19-menu-parcours.md) §9.
> **v0.2** : intègre les arbitrages de Papa Yann (2026-07-20) — Tritri hôte du Mur (blocs
> Découverte + Préférés), **Roi T-Rex** pour les dinos/encyclo, traçage cursive = jeu
> « captcha » 5 s, et les 15 commentaires Supabase des jeux prod
> ([`2026-07-20-commentaires-supabase-mj.md`](2026-07-20-commentaires-supabase-mj.md),
> synthèse : [`../../pmo/audits/2026-07-19-triage-poc-design.md`](../../pmo/audits/2026-07-19-triage-poc-design.md) §6).

---

## 1. Principes (ce que le Mur copie de l'encyclopédie)

1. **Choix par image** : vignettes-photos reconnaissables, aucun titre à lire.
2. **Peu de choix** : les copains + 2 petits blocs gérés par Tritri. Jamais 42 entrées.
3. **Zéro méta-monde** : pas de véhicule, pas de carte, pas de « jeu dans le jeu ».
4. **Chaque domaine a un visage** : un copain qui parle et donne envie (« j'ai besoin de toi pour… »).
5. **Le catalogue complet déménage** dans l'espace parents (tiroirs actuels conservés là-bas — plus rien n'est perdu, Max ne voit que le Mur).

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

- **Tritri est l'hôte du Mur** (décision PY 2026-07-20) — pas un copain de catégorie. Il accueille, commente, et gère **2 blocs** :
  - **🔎 Découverte** : 3 vignettes en rotation curée (1 jeu délaissé = répétition espacée déguisée · 1 nouveau débloqué · 1 **mise en avant du jour ou de la semaine** — un seul jeu OU une catégorie entière, décision PY). Les jeux maîtrisés sortent de la rotation.
  - **❤️ Préférés** : les jeux favoris / derniers joués (reprend la rangée ❤️ actuelle — auto-remplie, pins gérés côté parents).
- **5 copains-domaines** en grosses vignettes (photo/render du dino, pas un emoji). Le copain SE PRÉSENTE en audio au tap.
- **L'encyclopédie reste épinglée en bas** — rebrandée « chez le Roi T-Rex » (décision PY).
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

Répliques d'accueil (drafts — voix du pôle narration à brancher **en temps voulu**, décision PY) :

- **Tritri** : « Salut ! Regarde ce que j'ai trouvé pour toi aujourd'hui… »
- **Roi T-Rex** : « Bienvenue dans MON musée ! Je connais tous les dinos, même les plus bizarres. »
- **Spino** : « Tu peux m'aider à compter mes poissons ? Je me trompe TOUT LE TEMPS. »
- **Galli** : « Bienvenue dans mon coin lecture ! Aujourd'hui, on découvre quoi ? »
- **Vélo** : « Psst ! J'ai des énigmes trop dures pour moi. T'es partant ? »
- **Para** : « Bienvenue dans mon atelier ! On peint, on écoute, on voyage ! »

## 4. Les jeux par copain (ordre d'accès = ordre de la liste, déblocage 2★)

### 🦕 Roi T-Rex — les dinos (intègre commentaires Supabase)

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun / retours PY |
|---|-----|--------|--------|-------------------|------------------|
| 1 | Trouve le dino | mj-24 **polir** | ★ | Discrimination visuelle + vocabulaire (TTS) | Adoré de Max. À ajouter : son d'erreur rigolo (prout), dino détouré en récompense 1er coup, animation finale avec applaudissements, + de cases en palier haut |
| 2 | La lampe du paléontologue | mj-28 **polir** | ★★ | Attention, partiel→global | « Génial » PY : + bruit/objets, lampe plus petite et plus forte |
| 3 | Le grand voyage du temps | mj-31 | ★★★ | Chronologie Trias→Crétacé | Max a ses 3★ ! Variante continents demandée · 🐛 **SVG continents à refaire** |
| — | Range-les par taille | mj-30 | **bonus** | Sériation, mètres réels | Réservé niveau avancé/fan (décision PY) |
| — | Atelier coloriage (libre) | mj-32 | libre | Motricité, expression | « Trop top ». 🐛 galerie : stockage **JSON zones/couleurs non compressé** (redessin propre), quotas 3 gratuit / 5-10 avec compte |
| — | **Encyclopédie** (code TRITRI) | dev-dinos | libre | Référence, autonomie | Son refuge — chez le Roi T-Rex désormais |

**Sorties (décisions PY)** : mj-25 🗑️ (0 difficulté ; idée « Où est Charly dino » consignée) · mj-26 🗑️ (idée dé/domino à **ombres dino** → réutilisée chez Spino, constellations) · mj-29 🗑️ (doublon, pas fluide) · mj-33 🗑️ (le **memory devient un moteur générique multi-thèmes** à regrouper) · mj-27 → **Galli** · mj-40 → **Vélo** (à tester) · mj-41 → au chaud, **pas affiché en V1**.

### 🔢 Spino — compter

Progression CRA (concret→image→abstrait), base 10 partout (barquette = 10, décision PY) :

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun |
|---|-----|--------|--------|-------------------|-----|
| 1 | L'éclosion | POC compte-01 | ★ | Compter 1→5, un-à-un (rond de pointage intégré, ex-POC-02) | Les œufs éclosent ! |
| 2 | Les constellations | POC 06 (+18) | ★ | **Subitizing** : reconnaître 2-6 par la forme | Variante PY : **ombres dino miniatures à la place des points** (idée mj-26) |
| 3 | Remplis les caisses | mj-43 | ★ | Subitizing→compte (dés, dominos) | Ranger vite |
| 4 | Les barquettes de 10 | POC 07 | ★★ | Dizaine : 10+4, 10+7… | Remplir la barquette |
| 5 | Le bus des passagers | POC 08 (+03, absorbe mj-04/05/45) | ★★ | +/−, places libres, fenêtres-groupes de 5 | Monter/descendre du 162 |
| 6 | Le toboggan ordinal | POC 11 (variante) | ★★ | Ordinaux : « le 2e Tritri », « le 3e bleu » | File au toboggan |
| 7 | Le bocal | POC 12 | ★★★ | Estimation 10/50/100, paquets de 10 → barquettes | Masses impressionnantes |
| 8 | Par paquets | POC 19 | ★★★ | Groupements (blocs + unités), objets variés | Construire par blocs |
| 9 | Le partage | POC 20 reformulé | ★★★ | Partage à égalité (pré-division) | Donner des fraises aux copains |
| + | Les paniers (×) | POC 10 | ++ | Groupes égaux, décomposition 5+5 | Plus tard |
| + | Pair/impair | POC 13 | ++ | Parité | Plus tard |
| + | Le 100 (animation absorbée par #7) | POC 17 | — | Expliquer la centaine | — |

Sorties POC : 05, 14 🗑️ · 15 → outil vérif parent 🕐 · 16 monnaie 🕐 · 02 mécanique absorbée · 04 habillage sous-marin = skin.

### 📖 Galli — lire & écrire

Progression sourcée (triage §3) : **sons avant noms de lettres · cursive d'abord · ÉCRIRE AVANT LIRE**.

| # | Jeu | Source | Niveau | Pourquoi (pédago) | Fun / retours PY |
|---|-----|--------|--------|-------------------|------------------|
| 1 | Trouve la lettre | POC lecture-03 | ★ | Reconnaissance lettres — consigne = **le SON** d'abord | Clavier/ordre alphabétique |
| 2 | Le grand tri des lettres | **mj-09 moteur** (+ POC 07) — **prioritaire** (PY) | ★ | Cursive + script + majuscules : différencier b/d/h/j/k… | « Super moyen d'apprendre » — jeu générique multi-asset |
| 3 | La boîte à sons | mj-44 adaptée (+ POC 01) | ★ | Conscience phonémique (son initial) | Oreille fine |
| 4 | L'alphabet mobile | POC 12 | ★★ | **Composer avant de lire** (Montessori) | Écrire « papa » tout seul |
| 5 | Syllabo | POC 11 refondu UX | ★★ | Décodage syllabique CV, répétition espacée | Rythme des syllabes |
| 6 | Les sons à 2 lettres | **À INVENTER** (POC 10) | ★★ | on/ou/ch/eu — 2 lettres → 1 son | Le « on » de tonton |
| 7 | Lis le mot | moteur POC 13 + mj-23 + **mj-27** | ★★★ | Mot→image, son→mot, **découpage syllabes** | mj-27 : vraies photos dino, **audio retiré** (1ʳᵉ syllabe max), 🐛 images cassées |
| 8 | Le Chef de Gare | POC 17 (fix Œ + mise en page) | ★★★ | **Lire pour agir** | « Pose 3 œufs rouges ! » |
| 9 | Le bus des phrases | POC 16 | +++ | Compréhension de phrase | Bus ROUGE = image rouge |
| ◌ | **Le geste magique** | POC 05 | jeu « captcha » | Traçage cursive | Décision PY : **un jeu, pas un rituel** — format **captcha : ça s'affiche, 5 s max, c'est fini**. ⚠️ Valider la précision du tracé à l'écran tactile avant d'aller plus loin + flèches d'ordre + halo guide |

Sorties : POC 02, 06, 08, 09, 18, 19 🗑️ · POC 14 blending TTS 🕐 · POC 15 drapeaux-mots 🕐.

### 🧩 Vélo — casse-têtes

| # | Jeu | Source | Niveau | Pourquoi | Fun / retours PY |
|---|-----|--------|--------|----------|------------------|
| 1 | L'intrus | mj-15 | ★ | Catégorisation | Trouver le bizarre |
| 2 | Complète la suite | mj-16 | ★ | Patterns | Deviner la suite |
| 3 | Le premier bus | mj-13a (absorbe mj-13c) | ★ | Ordinaux en contexte | La course |
| 4 | Trouve le bus | mj-19 | ★★ | Poursuite visuelle | Il bouge ! |
| 5 | Le grand rangement | mj-08 | ★★ | Tri multicritère | Ranger le bazar (mj-09 devient moteur tri → Galli ; mj-36 → Para) |
| 6 | Le garage | mj-17 | ★★ | Séquençage d'actions | Réparer comme un pro |
| 7 | Tubes de couleurs | mj-18 **polir** | ★★★ | Réflexion/stratégie, dextérité | « Génial, adoré par Max » — jusqu'à 8-9 tubes (PY) |
| 8 | Le dépôt bloqué | mj-34 | ★★★ | Planification (Rush Hour) | Libérer SON bus |
| 9 | Croque-échecs | mj-37 | ★★★ | Déplacements contraints | Croquer les goûters |
| 10 | Blocs magiques | mj-39 | ★★★ | Spatial, lignes | Faire disparaître |
| ? | Tangram des dinos | mj-40 | **à tester** | Géométrie/manipulation | « À faire tester » (PY) — nouvelle corde logique/espace |

Sorties : mj-38 🗑️ · mj-42 🗑️.

### 🎨🌍 Para — couleurs & monde

| # | Jeu | Source | Niveau | Pourquoi | Fun / retours PY |
|---|-----|--------|--------|----------|------------------|
| 1 | Peins les bus | mj-21 **étendre** | ★ | Mélanges de couleurs | « Génial » — variantes : palettes 1/2/3 couleurs, coloriage dino atelier/avatar |
| 2 | Le bon bus | mj-36 | ★ | Couleur→action | Envoie le bon bus |
| 3 | Quel pays ? | mj-11 (🐛 drapeaux → **SVG**) | ★★ | Drapeaux (sa passion) | Le Brésil ! |
| 4 | Trouve le pays | mj-22 adapté | ★★★ | Géographie | Resserré sur ses pays |
| 5 | Compte en langues | mj-20 adapté (FR/PT/EN) | ★★★ | Origines brésiliennes | Compter en portugais |
| — | Nouveaux sons (libre) | mj-12 | libre | Écoute, culture sonore | Sons secrets |
| — | Max Adventure (libre) | Phaser | libre | Conduite, motricité | Conduire le bus |
| — | Pose-tes-tiles (libre) | tiles | libre | Construction libre | Sa ville |
| — | Memory générique | ex-mj-33, **moteur multi-thèmes** | libre | Mémoire visuelle | Thèmes : dinos, véhicules, animaux, fleurs… |

## 5. Bilan chiffré (après arbitrages PY)

- **Prod supprimés** : mj-25, mj-26, mj-29, mj-33, mj-35, mj-38, mj-42 (7) + mj-41 caché V1.
- **Prod fusionnés/absorbés** : mj-13c→13a · mj-04/05/45→bus passagers · mj-27→Galli · mj-09→moteur tri (Galli) · mj-33→memory générique · mj-06→moteur mots.
- **Prod gardés** (~22) dont polissages prioritaires : mj-24, mj-28, mj-21, mj-18, mj-31 (SVG continents), mj-32 (galerie JSON).
- **POC retenus** : ~12 jeux compte/lecture + 1 à inventer (sons 2 lettres).
- Cible : **~35 jeux, jamais plus de ~10 visibles par copain**, 3+? vignettes sur le Mur.

## 6. Questions transverses ouvertes

1. **Politique de fonte globale** (soulevée par PY sur mj-28) : Max est « plus à l'aise en full majuscule/script qu'en cursive » pour LIRE, alors que l'école/Montessori impose la cursive. → Définir la règle partout (proposition : consignes en script/majuscules, contenu d'apprentissage en cursive, bi-alphabet dans le tri) + possibilité de basculer in game ? À trancher.
2. **Extraction Supabase** : seuls les `source='comment'` ont été extraits (15 jeux). Si des notes ont été saisies via l'UI « revue » (❓), elles sont en `source='review'` → extraction complémentaire à demander.
3. **Statut des annotations traitées** : ids 4, 16, 56, 83, 124, 185, 235, 312, 388, 475, 561, 661, 782, 900, 1056 → à passer en `status='traite'` (résolution = cette spec + commit) — nécessite l'accès SQL/MCP.
4. **Précision tactile du traçage** : à valider sur tablette AVANT d'investir (décision PY).
5. Voix des copains (pôle narration, en temps voulu) · relique au-dessus des étoiles (plus tard) · police cursive prod (ABCursive vs DN Manuscript vs Cursif + licence).

_Spec v0.2 — 2026-07-20. Reste à valider : §6. Implémentation après arbitrages finaux._
