# MENU v2 — Structure navigateur et catégorisation · DÉCISIONS FIGÉES

> ⚠️ FICHIER LOI. Toute ligne marquée 🔒 est NON NÉGOCIABLE.
> Seul Papa Yann peut défiger (décision datée explicite « je défige X »).
> Garant écriture : `game-pmo` (unifié 2026-07-19). Garant vérification : `game-mj-reviewer` (si applicable) ou `game-pmo`.

## Objectif

Menu d'accueil MaxPlay refactorisé selon la logique « rangée persistante + 5 tiroirs thématiques »,
validée par Papa Yann 2026-07-16. Remplace les 10 tiroirs antérieurs.

## 🔒 Architecture générale FIGÉE

- 🔒 **Une RANGÉE persistante en haut** : « ⭐ Tes jeux » (jamais repliée, affichage continu sur toutes les pages du menu).
- 🔒 **5 tiroirs accordéon en dessous**, dans cet ordre strict :
  1. 🦕 **Les dinos** (encyclopédie + mini-jeux dino)
  2. 🎨 **Les couleurs** (mini-jeux couleurs promus niveau 1)
  3. 🔢 **Compter & lire** (fusion compter + lire)
  4. 🧩 **Casse-têtes** (fusion logique + observer + bricoler)
  5. 🌍 **Le monde & libre** (fusion monde + libre)

## 🔒 Rangée « ⭐ Tes jeux » FIGÉE

- 🔒 Affiche **jeux épinglés (pinned)** + une carte **« 🎯 Jeu du jour »** distincte.
- 🔒 **PIN (épinglage)** :
  - Geste : bouton « Mettre en avant » / « Retirer » disponible dans le **panneau règle ❓** du jeu (seul lieu de PIN/UNPIN).
  - Stockage : `localStorage.maxplay_pins` (IDs jeux inchangés, format JSON array).
  - Capacité : **5 jeux max épinglés** (au-delà du 5ème, le + ancien est débordé).
  - Initialisation Papa Yann : première rangée vide (reset/nouvelle tablette) → **auto-remplissage par derniers joués** (jamais affichage vide).

- 🔒 **« 🎯 Jeu du jour »** :
  - Carte distincte (emoji 🎯, layout spécifique).
  - Sélection : tiré prioritairement parmi **jeux status:live** avec **0-1 étoile OU pas joués récemment** (remotive vers les délaissés).
  - Invite : **audio** (voix existante MaxPlay, courte — ex : « C'est ton jeu du jour ! »).
  - Rotation : 1× par jour (pas de tirage multi-tap dans la même session).

## 🔒 Catégorisation des mini-jeux FIGÉE

Les **IDs mj-XX ne changent JAMAIS**. Seul le champ `category` de regroupement change → passage d'un tiroir à un autre.

### 🦕 Les dinos
- mj-24, mj-25, mj-26, mj-31, mj-40, mj-41
- Encyclopédie dino (dev-dinos.html)
- Status : live uniquement

### 🎨 Les couleurs
- mj-18 (Peins les bus)
- mj-21 (Peins les bus — ancien)
- mj-09 (Trouve les couleurs)
- **Raison de la promotion niveau 1 : pilier observé du profil Max** (enfant 3.5-4 ans, passionné couleurs IDFM, sensibilité teinte précise).
- Status : live uniquement

### 🔢 Compter & lire
- **Compter** : mj-04, mj-13c, mj-05, mj-35, mj-43, mj-45
- **Lire** : mj-06, mj-23, mj-44
- Status : live uniquement

### 🧩 Casse-têtes
- **Logique** : mj-13a, mj-15, mj-16, mj-34, mj-37, mj-38, mj-39
- **Observer** : mj-19, mj-36
- **Bricoler** : mj-08, mj-17
- **Terminologie figée** : « Casse-têtes » retenu.
  - ❌ 🔒 NE JAMAIS utiliser « Stratégie » (trop abstrait pour 4 ans).
  - ❌ 🔒 NE JAMAIS utiliser « Réfléchir » (trop long/polysyllabique).
  - **Réévaluation permise** vers 6-7 ans si besoin pédagogique validé Papa Yann.
- Status : live uniquement

### 🌍 Le monde & libre
- **Monde** : mj-11 (Drapeaux), mj-22 (Animaux), mj-20 (Villes), mj-42 (Routes)
- **Libre** : mj-12
- Status : live uniquement

## 🔒 Comportement accordéon FIGÉ

- 🔒 Titres tiroirs cliquables → toggle open/close.
- 🔒 État mémoire : `localStorage.maxplay_accordeon` (JSON { categorie: boolean }).
- 🔒 À la première visite / reset : tous les tiroirs fermés sauf le premier (🦕 Les dinos = ouvert par défaut).
- 🔒 Glissade lisse entre open/close (transition CSS < 300ms).

## 🔒 Ancien système SUPPRIMÉ FIGÉ

- ❌ 🔒 **Section « 🆕 Nouveaux »** : SUPPRIMÉE. Chaque jeu retourne dans sa catégorie via `homeCat`.
- ❌ 🔒 NE JAMAIS créer une section « Récents » ou « Suggérés » en parallèle de la rangée ⭐ (confusion UX).

## 🔒 Récompense narrative REJETÉE FIGÉE

- ❌ 🔒 **NE JAMAIS implémenter une récompense narrative PROMISE** (ex : « Débloquer histoire/vidéo après N étoiles »).
  - Raison : contrevient à la règle pédagogique « récompense promise tue la motivation intrinsèque » (gravée `studio/minijeux/memory/rules.md`).
  - Surprise non annoncée : **permise** (ex : déblock bonus aléatoire après 50 pips collectés).

## 🔒 Anti-régressions — NE JAMAIS FAIRE

- ❌ 🔒 NE JAMAIS afficher un menu vide (rangée ⭐ sans contenu).
- ❌ 🔒 NE JAMAIS placer « 🆕 Nouveaux » en section parallèle.
- ❌ 🔒 NE JAMAIS créer > 5 tiroirs accordéon principaux.
- ❌ 🔒 NE JAMAIS changer l'ordre des tiroirs (🦕 → 🎨 → 🔢 → 🧩 → 🌍 = FIXE).
- ❌ 🔒 NE JAMAIS déplacer un ID mj-XX vers une catégorie sans demande Papa Yann explicite + nouvelle décision datée.
- ❌ 🔒 NE JAMAIS promettre une récompense narrative (vidéo, histoire débloquée après N étoiles).
- ❌ 🔒 NE JAMAIS modifier les 5 couleurs/noms des tiroirs sans décision datée Papa Yann.

## Journal des décisions (append-only)

### 2026-07-16 — Figeage MENU v2 après validation Papa Yann

**Décidé par Papa Yann** (message session 2026-07-16) :

Structure MENU v2 remplace les 10 tiroirs antérieurs. Éléments clés :
1. Rangée ⭐ « Tes jeux » persistante en haut (PIN via panneau ❓, jeu du jour audio).
2. 5 tiroirs accordéon : 🦕 Les dinos, 🎨 Les couleurs (promu), 🔢 Compter & lire, 🧩 Casse-têtes, 🌍 Le monde & libre.
3. Terminologie « Casse-têtes » figée.
4. Récompense narrative Promise = INTERDITE (motivation intrinsèque).

Statut : 🔒 FIGÉ. Cet figeage complète la refonte menu initiée session antérieure (fin des 10 tiroirs).

## Zone ouverte (non figée — discutable librement)

- Exact timing du tirage « Jeu du jour » (min-max étoiles, jour = UTC/local, durée TTL).
- Wording exact du bouton PIN/UNPIN dans le panneau ❓.
- Positionnement pixel exact de la rangée ⭐ (hauteur, espacement, scroll interne si besoin).
- Animation visuelle du changement d'accordéon (ease-in-out vs spring vs linear).
- Couleur exact des icônes tiroirs (tant que chaque tiroir garde son emoji).
- Logique de « derniers joués » en cas rangée vide (order by timestamp desc, limit n).
