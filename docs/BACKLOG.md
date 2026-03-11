# 🗂️ MaxPlay - Backlog & Progress

## 📅 Date : 12 Mars 2026

---

## ✅ SPRINTS COMPLÉTÉS

### ✅ Sprint 1 : Foundation (COMMIT + SETUP)
- [x] 1.1 Commit assets 48x48 (3567 fichiers)
- [x] 1.2 Créer PreloadScene avec barre de chargement
- [x] 1.3 Créer GameScene avec tilemap procédurale

### ✅ Sprint 2 : Tilemap & World (BUILD)
- [x] 2.1 Ville procédurale 1600x1200px
- [x] 2.2 Routes principales + secondaires
- [x] 2.3 Trottoirs, herbe, bâtiments
- [x] 2.4 Props urbains (lampadaires, bancs, poubelles)

### ✅ Sprint 3 : Bus Animation (HERO)
- [x] 3.1 Spritesheet bus 48x48 intégré
- [x] 3.2 Animations 4 directions (up/down/left/right)
- [x] 3.3 Bus grand (1.8x) pour enfants
- [x] 3.4 Klaxon avec effet visuel

### ✅ Sprint 4 : Trafic & Life (WORLD)
- [x] 4.1 Voitures NPC avec chemins automatiques
- [x] 4.2 Arrêts de bus interactifs
- [x] 4.3 Passagers animés (sautillement)

### ✅ Sprint 5 : Polish & Challenge (ITERATE)
- [x] 5.1 **Mode TAP par défaut** (plus simple pour 4 ans)
- [x] 5.2 **Objectif clair** : collecter 5 passagers
- [x] 5.3 **Feedback positif** : étoiles, +1, compteur
- [x] 5.4 **Écran de victoire** avec confettis

---

## 🎮 VERSION ACTUELLE : MJ-07 V2

### Contrôles :
| Action | Contrôle |
|--------|----------|
| **Conduire (mode TAP)** | 👆 Clique où tu veux aller |
| **Conduire (mode FLÈCHES)** | ⬆️⬇️⬅️➡️ ou WASD |
| **Klaxon** | ESPACE |
| **Changer mode** | Touche M |

### Objectif :
Collecter les 5 passagers 🧍 sur les trottoirs !

### URL de test :
```
http://localhost:3000
```

---

## 🔮 FUTURS SPRINTS (Propositions)

### Sprint 6 : Sons & Feedback
- [ ] Son klaxon (beep beep!)
- [ ] Son moteur bus
- [ ] Son "ding" quand on collecte
- [ ] Musique ambiance ville

### Sprint 7 : Variété de bus
- [ ] Bus 162 (bleu)
- [ ] Bus 380 (vert)
- [ ] Bus V6 (vert clair)
- [ ] Sélecteur au démarrage

### Sprint 8 : Quêtes guidées
- [ ] Flèches au sol vers prochain passager
- [ ] Mini-carte radar
- [ ] Timer optionnel
- [ ] Score avec étoiles

### Sprint 9 : Multi-bus
- [ ] Garage pour changer de bus
- [ ] Couleurs personnalisables
- [ ] Décalcomanies (stickers)

### Sprint 10 : Environnement dynamique
- [ ] Jour/nuit
- [ ] Feux tricolores
- [ ] Passage piétons
- [ ] Météo (pluie, neige)

---

## 🐛 BUGS CONNUS

| ID | Bug | Sévérité | Solution |
|----|-----|----------|----------|
| BUG-01 | Voitures NPC traversent bâtiments | 🟡 Moyenne | Ajouter collisions |
| BUG-02 | Pas de sons du tout | 🟡 Moyenne | Intégrer Web Audio API |
| BUG-03 | Tiles individuelles = chargement lent | 🟢 Faible | Créer tilesets fusionnés |

---

## 💡 NOTES DE DESIGN

### Ce qui marche pour un enfant de 4 ans :
1. ✅ **Mode TAP** - Pas besoin de coordonner les mains
2. ✅ **Objectif visible** - Compteur passagers 0/5
3. ✅ **Feedback immédiat** - Étoiles, +1, animations
4. ✅ **Victoire célébrée** - Confettis, message "BRAVO"
5. ✅ **Bus gros et coloré** - 1.8x taille normale

### À tester avec Max :
- Comprend-il le mode TAP tout seul ?
- Trouve-t-il le klaxon (espace) ?
- Reste-t-il concentré jusqu'à la victoire ?
- Veut-il rejouer après ?

---

## 📊 STATS

| Métrique | Valeur |
|----------|--------|
| Fichiers assets | 3,567 PNG |
| Résolution | 48x48 pixels |
| Taille monde | 1600x1200 px |
| Bus | 1 jouable + 3 NPC |
| Passagers | 5 à collecter |
| Commits ce soir | 4 |
