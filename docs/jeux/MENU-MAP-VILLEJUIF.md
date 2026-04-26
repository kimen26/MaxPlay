# Menu Map Villejuif — plan

> Page d'accueil hybride : carte de Villejuif en haut, grille classique en bas.
> Pas de toggle. Les deux cohabitent. Si Max accroche la map, on réduira la grille plus tard.

## Structure index.html (cible)

```
┌───────────────────────────────┐
│ Header MaxPlay                │
├───────────────────────────────┤
│ 🗺️ Carte de Villejuif         │
│  (tileset LimeZu, emojis      │
│  cliquables géolocalisés)     │
├───────────────────────────────┤
│ 📋 Tous les jeux              │
│  (grille classique actuelle)  │
└───────────────────────────────┘
```

## Vocabulaire Max (renommage cohérent)

| Nom Max | Sens | Jeu |
|---|---|---|
| **Centre bus** | Là où les bus vont dormir (ex: Thiais) — rangement | MJ-08 (ex "Au garage !") |
| **Garage** | Réparation : essence, lavage, pneus | MJ-17 (ex "Village des bus") |
| **Village des bus** | Terminus où plein de bus se rejoignent — réservé future idée | — |

## Emplacements (V1 à valider)

| Jeu | Lieu sur la map | Emoji | Justification |
|---|---|---|---|
| MJ-01 Quiz Bus mix | Arrêt de bus banal | 🚌 | Question rapide à un arrêt |
| MJ-04 Compte passagers | Trottoir bondé sortie école | 👥 | Foule = passagers |
| MJ-05 La bonne place | Intérieur d'un bus | 🪑 | Calcul de places |
| MJ-06 Lis la phrase | Panneau / affiche urbaine | 📖 | Lecture |
| MJ-08 Centre bus (rangement) | Centre bus de Thiais (parking en bas de map) | 🅿️ | Dodo des bus |
| MJ-09 Trie les bus | Dépôt / quai de tri | 🗂️ | Tri par couleur |
| MJ-11 Quel pays ? | Aéroport Orly (coin de map) | 🌍 | Voyages, drapeaux |
| MJ-12 Sons | Tableau de bord d'un bus garé | 🎵 | Sandbox sons |
| MJ-13a Premier bus | Arrêt RATP (panneau LED) | 🥇 | Sujet de l'arrêt |
| MJ-13b Monte dans le bus | Arrêt RATP | 🚌 | Sujet de l'arrêt |
| MJ-13c Combien avant | Arrêt RATP | 🔢 | Sujet de l'arrêt |
| MJ-14 Grille de bus | Mur de tags / fresque ou tableau école | 🔲 | Pattern visuel |
| MJ-15 Intrus | File de bus alignés | 🔍 | Comparer 5 bus |
| MJ-16 Suite | Train de bus sur une avenue | 📈 | Séquence |
| MJ-17 Garage (réparation) | Garage avec pompe à essence | 🔧 | Outils |
| MJ-18 Tubes couleurs | Laboratoire / atelier | 🧪 | Tubes |
| MJ-19 Trouve le bus | Carrefour animé | 🎯 | Bus qui bougent |
| MJ-20 Compte 8 langues | Globe / monument international | 🌐 | Multilingue |
| Max Adventure | Centre de Villejuif (gros emoji étoile) | 🎮 | Hub jeu libre |

## Notes techniques

- Carte = SVG ou canvas tileset LimeZu déjà calé (M1-M5 validés, voir `game-html/map-mockups.html`)
- Emojis = boutons absolute-positioned au-dessus de la map
- Min 60×60 px par hotspot (motricité 3-4 ans)
- Tooltip au tap = nom du jeu
- Grille classique en dessous = fallback si Max ne trouve pas

## TODO avant code

- [ ] Valider la carte de zones avec utilisateur
- [ ] Layout map (dimensions, échelle)
- [ ] Liste finale des emplacements + coordonnées x,y
- [ ] Choix : map illustrée statique vs map interactive (zoom/pan)
