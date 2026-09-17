# Décisions — Pôle JEU

> Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée. En cas de doute, la dernière décision sur un sujet écrase les précédentes.

## Décisions structurantes toujours en vigueur

- **Gabarit unique `mj-shell.js`** (2026-07-14, commit 392d59d0) — tout MJ HTML charge UNIQUEMENT mj-shell.js (+ libs spécifiques), zéro variation manuelle tolérée — voir `archive/decisions-2026-H1.md`
- **maxStars catalog 5→3** (2026-07-14, commit 68284858) — système étoiles global recalibré à 3 paliers pour tous les jeux — voir `archive/decisions-2026-H1.md`
- **Système figeage obligatoire** (origine 2026-05-11/2026-05-21, consolidé 2026-05-21 "Processus décisions figées") — `studio/minijeux/docs/jeux/figees/mj-XX.md` = LOI protection régression — voir `archive/decisions-2026-H1.md`
- **`catalog.js` = source unique de vérité menu** (référencé en continu depuis EP-070/2026-07-07, ex. ligne 293 decisions.md « via champ `status` catalog.js ») — voir `archive/decisions-2026-H1.md`
- **Vocab lieux Max** (2026-05-08, équivalent D-021 de l'ancien dossier pmo, fichier backlog) — dodo = Centre bus · garage = Réparation · terminus = Village des bus (réservé) — voir `archive/decisions-2026-H1.md`
- **Mutualisation UI (composants partagés mp-theme.css)** (2026-07-13/07-18, EP-074) — composants UI communs (.mp-pill, .mp-dots, célébrations, frise) centralisés dans mp-theme.css, zéro variante locale — voir `archive/decisions-2026-H1.md`

---

*Aucune entrée datée ≥ 2026-08-01 dans l'ancien dossier pmo (fichier decisions.md) à la date de cette migration (2026-09-03) — toutes les décisions du fichier source sont antérieures et vivent dans `archive/decisions-2026-H1.md`.*

## Designs validés (déplacés verbatim depuis `memory/rules.md`, daté d'origine indéterminé — antérieur à 2026-07)

> ⚠️ Vision produit ancienne (Hub Ville / École des Chiffres / Core Loop Garage) non appliquée dans le menu actuel (accordéon catégories, `catalog.js`). Conservée comme design validé historique, pas comme état courant — voir `memory/state.md` pour l'état réel du menu.

### Profil Max (3.5-4 ans)

| Domaine | Niveau | Prochaine étape |
|---------|--------|-----------------|
| Maths | **Additions dans les milliers** (confirmé maîtresse) | Problèmes contextuels, patterns grands nombres |
| Lecture | **Phase alphabétique partielle (Ehri)** — lit 2-3 premières lettres + infère | Lettres manquantes milieu/fin, rimes |
| Logique | Avancé (séquences, patterns) | Déduction par élimination (Guess Who style) |
| Langue | Français natif, origines brésiliennes | Bain sonore anglais possible (Numberblocks EN) |

- Tablet tactile uniquement (pas de manette avant 5-6 ans — coordination bilatérale pas développée)
- École Montessori 101, Kremlin-Bicêtre
- Passions : bus Villejuif, dépanneuse "Depann2000", dinosaures, drapeaux, Tayo, Totoro, Stitch
- Réaction forte aux sons inattendus · aime trier · sessions courtes

### Mécaniques de lecture (pour Max)

Phase alphabétique partielle = lit les premières lettres, infère le reste. **Exploiter sans bloquer :**

| Mécanique | Description |
|-----------|-------------|
| **Lettre manquante milieu/fin** | "TR_IN" → force à traiter le mot entier |
| **Mot qui disparaît** | "TRAIN" → cache les lettres de droite une par une → jusqu'où lit-il ? |
| **Son-first** | Taper une lettre = entendre son son (pas son nom — "sss" pas "S") |
| **Rimes** | "Bus" rime avec ___ → étend l'attention aux sons finaux |
| **Mot à compléter** | "BU__" + audio — lettres apparaissent avec leur son |

**Règle pédagogique :** Jamais de quiz formel. Environnement qui invite, Max choisit. Montessori-aligné.
**Phonique française :** son d'abord (phonème → graphème), PAS le nom de la lettre (A, B, C).

### Maths contextuelles (niveau milliers)

Ne jamais présenter les maths comme des maths. Toujours dans le contexte :

| Contexte | Calcul caché |
|----------|-------------|
| "Le bus 21 coûte 2 tickets, le 14 coûte 3 — combien pour les deux ?" | Addition simple |
| "La dépanneuse a remorqué 1200 voitures cette année et 1500 l'an dernier" | Addition milliers |
| "Le train a 1000, __, 3000 passagers — quel est le suivant ?" | Suite numérique |
| "30 passagers montent, 12 descendent — combien reste-t-il ?" | Soustraction contextuelle |

### Core Loop : Le Garage (progression centrale)

- Chaque mini-jeu complété → nouveau véhicule gagné → visible dans le Garage
- Véhicules non-débloqués = **silhouettes vides** → motivation intrinsèque (compléter la collection)
- Tap sur véhicule débloqué → joue son son + affiche info
- **Pas de score, pas de classement, pas de vies** — seulement l'accumulation
- **La Dépanneuse "Depann2000"** = dernier unlock (boss final) → mini-jeu exclusif remorquage

Véhicules cibles : lignes métro 1→14, trams T1→T13, bus iconiques (21, 91, 183...), RER A/B/C

### Architecture cible : La Ville de Max

```
🏙️ Hub Ville (carte scrollable simple)
├── 🚌 Dépôt de Bus       → Tri, Quel bus manque ?, Devine le bus (déduction audio)
├── 🦕 Musée des Dinos     → Mémoire paires, Tri herbivore/carnivore, Galerie
├── 🏁 Mur des Drapeaux    → Montre-moi le drapeau, Tri, Carte du monde
├── 🔢 École des Chiffres  → Train des nombres, Billets de bus, Dépanneuse (milliers)
└── 🔒 Déblocables         → Piscine, Gare, Aéroport...
```

**Règle hub :** 4-6 destinations max. Nouvelles zones = collection débloquée. Pas ouvert total (surcharge) ni purement linéaire (pas d'agentivité).

### Quick Win validé : Trie les Bus

```
6 bus SVG arrivent de gauche en file
3 garages colorés sur la droite
→ Drag chaque bus vers le bon garage
→ Correct : porte s'ouvre + klaxon + animation parking
→ Faux : bus rebondit doucement (pas de son négatif)
→ Tous placés : Dépanneuse bonus arrive !
Variantes : trier par numéro, taille, jour/nuit, ligne RATP
```

### Mécanique déduction audio-first

```
Afficher 3 bus → jouer audio "C'est un bus rouge" → Max élimine
→ jouer audio "Il a le numéro 21" → Max tape le bon
→ Fanfare + bus qui entre au garage
```
Fonctionne identiquement pour drapeaux et dinosaures. Même code, contenu différent.

### 10 Règles d'or pédagogiques

1. **Physique d'abord** — les manipulatifs concrets > abstraction digitale ou symbolique
2. **Son du succès, pas de l'échec** — finir sur une réussite, jamais en pleine frustration
3. **Complimenter le processus** — "Tu as essayé une nouvelle façon !" pas "Tu es tellement fort"
4. **Suivre Max, pas le programme** — la limite = son attention, pas un niveau arbitraire
5. **Narration pour tout** — même la drill la plus ennuyeuse devient engageante avec un cadre narratif
6. **Espacement, pas bachotage** — court + fréquent + varié > long + unique + identique
7. **Co-apprentissage** — présence active de l'adulte = prédicteur d'apprentissage le plus fort
8. **Choix dans la structure** — toujours offrir un choix structuré pour nourrir l'autonomie
9. **Sécurité émotionnelle d'abord** — un enfant dysrégulé n'apprend pas
10. **La progression visible** — Max doit voir sa propre croissance (pas juste qu'on lui dise)

### Gamification : ce qui marche vs ce qui ne marche pas

| Mécanique | ✅/❌ | Raison |
|-----------|------|--------|
| Narration + personnages | ✅ Fort | Augmente le buy-in dès 2 ans |
| Barre de progression visible | ✅ | Max voit sa croissance |
| Récompenses surprises | ✅ | Sans promesse = ne détruit pas la motivation |
| Cadrage coopératif | ✅ | Développement prosocial |
| Étoiles / autocollants | ⚠️ | OK si lié à la narration |
| Streaks | ⚠️ | **Pas avant 7 ans** — anxiété si cassé |
| Classements | ❌ | **Jamais < 6 ans** — provoque pleurs, compétition néfaste |
| Récompenses promises | ❌ | **Danger** — tue la motivation intrinsèque |

### Design validés (bus stop)

- **Fiche bus stop** : voir `memory/design_bus_stop.md`
  - Couleur block haut + bas noir 2/3 cases LED + 1/3 texte "min"
  - 3 cases identiques : bar/bar/digit (1 chiffre) ou bar/digit/digit (2 chiffres)
- **Poteau** : cercle gris #6a6a6a, liseré blanc, bande turquoise #00c5a0, texte "BUS"
- **Style global** : flat cartoon arrondi (Toca Boca / Tayo) — **PAS pixel art**
- **Font** : Fredoka One (Google Fonts, gratuit, arrondie)
- **Palette** : 6-8 couleurs max, contours gras, couleurs saturées (pas de pastel), contraste élevé
- **Personnages** : anthropomorphisés (bus avec yeux = plus engageant pour < 5 ans)

- **D-022** (2026-09-05, HO-MJ-02, décision PY « tous les mini-jeux devront être traduits ») — **Plomberie i18n mini-jeux = miroir du dino** : le FR reste le canon en dur dans chaque `mj-XX.html` ; la traduction est une SURCOUCHE (`site/js/mj-i18n.js`, appliquée dans `RegleInfo.init` sur une copie), pack par langue GÉNÉRÉ depuis `studio/minijeux/i18n/<lang>/strings.json`, chargé par la file `SCRIPTS` de `mj-shell.js` (pas de `document.write` : le shell est asynchrone). Langue sans pack = repli FR, jamais de trou. Registre 4 ans, charte de traduction dino.

- **D-023** (2026-09-09, retour PY « des jeux trop longs pour le modèle 4/6/8 », ticket EP-124) — **Le nombre de manches devient paramétrable par jeu ; 4/6/8 passe de LOI à DÉFAUT.** `QS_PER_LEVEL = [4, 6, 8]` (`mj-golden.js:42`) restait appliqué à tous les jeux Golden quelle que soit la durée d'une manche. Or le nombre de manches est fixe et la durée d'une manche ne l'est pas : sur MJ-28, une manche coûte 10-15 s de recherche à la lampe plus un funfact audio de 15-20 s, soit ~4 min à 8 manches, dont la moitié en écoute passive — « Max sort direct quand il voit ça ». Décision : `Golden.setup(id, { questions: [a,b,c] })` permet à un jeu de déclarer sa propre progression ; sans déclaration le défaut `[4,6,8]` s'applique, donc aucun jeu existant ne bouge. Les jeux à manche longue prennent MOINS de manches et une difficulté qui monte PLUS VITE — l'exigence de PY est « augmenter la difficulté sans faire 8 parties », pas « rendre le jeu plus facile ». Amende la règle du 2026-06-11 (niveau = min(2, étoiles) → 4/6/8) documentée en tête de `mj-golden.js` : la formule de niveau est conservée, seule la table des manches devient locale au jeu. Portée : 3 jeux utilisent Golden (mj-24, mj-28, mj-46). **Point laissé ouvert** : à 3 manches l'étoile sans-faute devient bien plus facile qu'à 8 — arbitrage PY requis avant d'implémenter (accepter, ou réserver l'étoile au niveau max).

- **D-024** (2026-09-09, arbitrage PY « oui accepte », suite de D-023) — **L'étoile reste le SANS-FAUTE, quel que soit le nombre de manches.** D-023 laissait ouvert le fait qu'à 3 manches l'étoile devient mécaniquement plus facile qu'à 8 (moins d'occasions de se tromper). Deux issues étaient possibles : accepter, ou réserver l'étoile au niveau max. **Papa Yann accepte.** La règle « ÉTOILE = toutes les questions réussies du 1er coup » reste donc unique et inchangée pour tous les jeux : `isPerfect()` continue de comparer `_firstTry` à `totalQ`, sans plancher de manches ni condition de niveau. Motif : l'étoile récompense la maîtrise d'une partie, pas l'endurance ; un jeu à manche longue compense déjà par une difficulté qui monte plus vite (D-023), et ajouter une condition de niveau rendrait l'étoile inexplicable à un enfant de 4 ans — il verrait des billes toutes vertes sans étoile. Conséquence assumée : les jeux à peu de manches donnent leur première étoile plus vite, donc montent de niveau plus vite, donc reviennent plus vite vers un nombre de manches supérieur. C'est cohérent avec la boucle voulue.
- **D-025** (2026-09-15, décision PY « VIRE le menu actuel avec les perso qui bougent, ça a toujours été un échec, je ne veux plus le voir ») — **L'accueil enfant est une ARMOIRE immobile, plus une scène animée.** La Vallée (spec Mur v2, copains qui se baladent, bulles, bus qui passe) est abandonnée après six semaines : le mouvement permanent n'a jamais aidé Max à choisir, il parasitait. Forme retenue : fronton (avatar, pseudo, étoiles) / grille de casiers en bois, un objet par casier, une étiquette d'un mot / socle à deux tiroirs (œufs, album). Trois règles qui en découlent : (1) **jamais d'ascenseur** sur ce menu, sur aucun téléphone — la grille est en `1fr`, les casiers rétrécissent, ils ne poussent jamais la page, et le nombre de rangées est calculé pour tenir dans la hauteur (test `armoire.spec.mjs`, 7 viewports) ; (2) **structure en HTML/CSS, images uniquement pour la texture** — les PNG GPT sont découpés en tuiles répétables (fond bois miroir 2×2, montant repeat-y, planche étirée) et objets détourés, 344 Ko pour le dossier entier, 240 Ko chargés au premier affichage à 360 px ; (3) **on ne montre qu'une poignée de jeux** (3×4 sur téléphone, jusqu'à 6×2 sur grand écran), tirés au hasard par objet à chaque ouverture — les 36 restent dans le catalogue et l'espace parents, PY : « je tente absolument pas de tout rentrer ». Ce qui a survécu de la Vallée : `mur.js` (chaîne 2★ `repaireState`, espace parents, `openEncyclo`), les modales, la porte parents, le deep-link `?open=nid`, le contrat `MurScene.refresh/markGainSeen` attendu par `nid-ui.js` (stub dans `armoire.js`). Briefs : `docs/handoffs/HO-MJ-12` (pièces) et `HO-MJ-13` (page).

### D-026 – 2026-09-17 · L'armoire v4 est un kit de 7 sprites + lumière CSS, validée en prototype statique avant intégration
Papa Yann, après recette de la v3 (HO-MJ-15) : « fond + fronton/cadre principal, 1 planche horizontale réutilisable, 1 montant vertical, 1 modèle de porte gauche/droite, 1 tiroir, 1 spot. Les ombres, halos lumineux et petites variations de profondeur en CSS. » Conséquences : (1) les portes ne comptent plus dans la largeur du meuble, elles débordent en `overflow: visible` et peuvent sortir de l'écran sur téléphone, le corps prend ≥ 80 % de la largeur ; (2) une seule porte flat, ouverte par `rotateY` 55-65° en CSS, réutilisée en haut, en bas, à gauche (miroir) ; (3) toutes les pièces passent par la même harmonisation (moyenne/écart-type de luminance et saturation sur un échantillon de bois de la référence) ; (4) le visuel se valide sur un prototype HTML statique (`tools/armoire-proto/`, HO-MJ-17) capturé aux 8 viewports, puis seulement on intègre (HO-MJ-18). La v3 (`carcasse/`, `armoire-compose.py`) reste en ligne jusqu'à validation du prototype.

### D-027 – 2026-09-18 · L'armoire est dessinée une fois dans un repère fixe, puis la scène entière est mise à l'échelle
Consigne du designer, après l'échec des v3 à v5 : « ne cherche plus à fabriquer une armoire responsive, fabrique une armoire parfaite à une taille virtuelle fixe puis fais scaler uniformément cette scène HTML complète ». Le repère est **911 × 1480** (le cadrage de `docs/refs/armoire/ref-ouverte.png`, marges des vantaux ouverts comprises) ; tout y est en pourcentage ; la mise à l'échelle tient en une ligne CSS, `--cab-w: min(100vw - safe-x, (100svh - safe-y - 18px) * 0.61554)`, et **il n'y a plus aucun handler de resize dans `armoire.js`**. Ce qui est interdit par cette décision : recalculer en JS la hauteur d'une planche, l'épaisseur d'un montant, le nombre de rangées ou un ratio d'étirement par bande selon l'écran — c'était le modèle des v2 à v5 (`--u`, `computeGeometry`, `softPx`) et la cause racine des planches d'épaisseurs différentes, des raccords faux et des proportions qui changeaient d'un téléphone à l'autre. Corollaires : (1) **trois sprites** et pas vingt-cinq — la carcasse entière en un seul morceau (arche, côtés, fond, planches, montants, tiroirs, socle, pieds, spots), un vantail haut, un vantail bas, les portes de droite étant le même sprite en miroir ; (2) **toute la lumière en CSS**, le halo des spots est un `radial-gradient`, plus un PNG à bords durs ; (3) **les portes s'ouvrent par `rotateY` 3D**, à 116° mesurés sur la référence (le vantail ouvert y fait 43,5 % de sa largeur fermée), le wrapper tournant et le sprite miroité vivant dedans ; (4) les tailles qui ne peuvent pas être en pourcentage (police, objets, ombres) s'expriment en fraction de `--cab-w`. Le test qui tient la décision : `armoire.spec.mjs` mesure chaque case en fraction de la boîte de l'armoire et compare ces fractions entre 320 px et 1280 px. Amende D-026 (kit de 7 sprites, prototype statique préalable) : le kit est réduit à 3 sprites et le prototype statique séparé est abandonné — on valide directement sur `index.html` capturé aux 8 viewports, un prototype sans objets ni page réelle n'a rien prouvé (HO-MJ-17). Brief : `docs/handoffs/HO-MJ-19-armoire-v6-repere-fixe.md`.
