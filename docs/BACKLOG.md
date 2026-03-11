# 🎮 MaxPlay - Backlog MJ-07 Sandbox

## 🎯 Objectif
Créer un bac à sable Phaser immersif où Max peut conduire des bus dans une ville animée avec :
- Tiles 48x48 Modern Exteriors
- Bus animés (4 directions + idle)
- Trafic dynamique
- Interactions (klaxon, passagers)

---

## 📋 Sprint 1 : Foundation (COMMIT + SETUP)
- [x] 1.1 Commit assets 48x48
- [ ] 1.2 Créer PreloadScene (chargement des assets)
- [ ] 1.3 Créer GameScene vide avec tilemap

## 📋 Sprint 2 : Tilemap & World (BUILD)
- [ ] 2.1 Créer tileset JSON depuis les singles 48x48
- [ ] 2.2 Créer carte Tiled de test (ville simple)
- [ ] 2.3 Intégrer la carte dans Phaser
- [ ] 2.4 Ajouter collision avec bâtiments

## 📋 Sprint 3 : Bus Animation (HERO)
- [ ] 3.1 Créer spritesheet bus 48x48 (4 directions)
- [ ] 3.2 Intégrer bus jouable avec flèches/touch
- [ ] 3.3 Animations idle, déplacement, klaxon
- [ ] 3.4 Effet sonore klaxon au clic

## 📋 Sprint 4 : Trafic & Life (WORLD)
- [ ] 4.1 Ajouter voitures NPC (chemins simples)
- [ ] 4.2 Arrêts de bus interactifs
- [ ] 4.3 Passagers qui montent (animation)
- [ ] 4.4 Jour/nuit cycle (optionnel)

## 📋 Sprint 5 : Polish & Challenge (ITERATE)
- [ ] 5.1 Test utilisateur (controls, lisibilité)
- [ ] 5.2 Challenge design : "Est-ce assez fun pour un 4 ans?"
- [ ] 5.3 Itération visuelle (contraste, taille)
- [ ] 5.4 Sons ambiance (ville, moteur)

---

## 🐛 Bug Tracker
| ID | Bug | Status | Priorité |
|----|-----|--------|----------|
| BUG-1 | CORS error en mode file:// | 🔧 Workaround (vite --host) | P1 |
| BUG-2 | Page "Dépôt MaxPlay" s'affiche au lieu du jeu | 🔍 A investiguer | P0 |

---

## 💡 Idées Futures
- [ ] Mini-carte avec lignes de bus
- [ ] Quêtes simples : "Amène les passagers à l'école"
- [ ] Différents bus (162, 380, V6) avec vraies couleurs
- [ ] Garage pour changer de bus
