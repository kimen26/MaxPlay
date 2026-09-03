# Décisions — Pôle JEU

> Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée. En cas de doute, la dernière décision sur un sujet écrase les précédentes.

## Décisions structurantes toujours en vigueur

- **Gabarit unique `mj-shell.js`** (2026-07-14, commit 392d59d0) — tout MJ HTML charge UNIQUEMENT mj-shell.js (+ libs spécifiques), zéro variation manuelle tolérée — voir `archive/decisions-2026-H1.md`
- **maxStars catalog 5→3** (2026-07-14, commit 68284858) — système étoiles global recalibré à 3 paliers pour tous les jeux — voir `archive/decisions-2026-H1.md`
- **Système figeage obligatoire** (origine 2026-05-11/2026-05-21, consolidé 2026-05-21 "Processus décisions figées") — `studio/minijeux/docs/jeux/figees/mj-XX.md` = LOI protection régression — voir `archive/decisions-2026-H1.md`
- **`catalog.js` = source unique de vérité menu** (référencé en continu depuis EP-070/2026-07-07, ex. ligne 293 decisions.md « via champ `status` catalog.js ») — voir `archive/decisions-2026-H1.md`
- **Vocab lieux Max** (2026-05-08, équivalent D-021 de l'ancien `pmo/backlog.md`) — dodo = Centre bus · garage = Réparation · terminus = Village des bus (réservé) — voir `archive/decisions-2026-H1.md`
- **Mutualisation UI (composants partagés mp-theme.css)** (2026-07-13/07-18, EP-074) — composants UI communs (.mp-pill, .mp-dots, célébrations, frise) centralisés dans mp-theme.css, zéro variante locale — voir `archive/decisions-2026-H1.md`

---

*Aucune entrée datée ≥ 2026-08-01 dans l'ancien `pmo/decisions.md` à la date de cette migration (2026-09-03) — toutes les décisions du fichier source sont antérieures et vivent dans `archive/decisions-2026-H1.md`.*

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
