# 🎮 MaxPlay MJ-07 - Notes d'Itération

## ✅ Sprint 1-4 Completé (12 Mars - 00h30)

### Ce qui fonctionne :
- [x] Assets 48x48 Modern Exteriors intégrés
- [x] Ville procédurale (routes + trottoirs + herbe)
- [x] Bus contrôlable (flèches/WASD) avec animations 4 directions
- [x] Trafic NPC (voitures qui roulent automatiquement)
- [x] Klaxon (espace) avec effet visuel
- [x] UI avec vitesse et contrôles
- [x] Camera follow fluide

### Testez maintenant :
```bash
cd game
npx vite --host --port 3000
```
Puis ouvrez http://localhost:3000

---

## 🔍 Sprint 5 : Challenge Design - Questions à se poser

### 1. EST-CE ASSEZ FUN POUR UN ENFANT DE 4 ANS ?

**Problèmes potentiels :**
- [ ] Le bus est-il assez gros/clair ? (72x72 actuellement)
- [ ] Les contrôles fléchés sont-ils intuitifs ? (Max sait-il utiliser les flèches ?)
- [ ] Y a-t-il assez de feedback visuel ?
- [ ] La caméra suit-elle bien ? (pas trop serrée ?)

**Tests à faire :**
- Laisser Max jouer 5 minutes sans explication
- Observer : est-ce qu'il trouve les flèches tout seul ?
- Est-ce qu'il klaxonne (découvre l'espace) ?

### 2. CHALLENGES TECHNIQUES

| Problème | Solution potentielle | Priorité |
|----------|---------------------|----------|
| Les tiles individuelles = lourd (3566 fichiers) | Créer des tilesets fusionnés | P2 |
| Pas de son | Ajouter sons moteur/klaxon | P1 |
| Pas d'objectif | Ajouter mini-quêtes | P2 |
| Bus traverse les bâtiments | Ajouter collisions | P1 |

### 3. IDÉES D'AMÉLIORATION

**Immédiates (ce soir) :**
1. Ajouter des arrêts de bus interactifs (s'arrêter = points)
2. Passagers qui montent quand on s'arrête
3. Différents bus (162=bleu, 380=vert, etc.)
4. Mini-carte radar

**À moyen terme :**
- Sélecteur de ligne de bus
- Quête : "Amène les passagers à l'école"
- Feux tricolores
- Passage piétons

### 4. PROBLÈMES CONNUS

- [ ] Les voitures NPC traversent les bâtiments
- [ ] Pas de sons du tout
- [ ] Le bus peut sortir de l'écran
- [ ] Pas de "but" au jeu (bac à sable infini)

---

## 🎯 Prochaine Itération Proposée

### Option A : "Le Collecteur" (simple, addictif)
- Des passagers sur les trottoirs
- S'arrêter près d'eux = ils montent
- Objectif : transporter 5 passagers
- Feedback : compteur "Passagers : 3/5"

### Option B : "La Ligne 162" ( immersif)
- Itinéraire prédéfini (flèches au sol)
- Arrêts obligatoires
- Timer : "Prochain arrêt dans 30s"
- Score basé sur la ponctualité

### Option C : "Garage à Bus" (exploration)
- Plusieurs bus garés dans la ville
- Pouvoir changer de bus
- Chaque bus a une couleur/ligne différente

---

## 📝 Log de Tests

| Date | Testeur | Résultat | Actions |
|------|---------|----------|---------|
| 12/03 | ? | ? | ? |

---

## 💡 Inspiration

Voir : 
- Mini Metro (simplicité)
- GTA 1/2 (vue top-down ville)
- Bus Simulator (mécanique conduite)
- Crossy Road (personnages mignons)
