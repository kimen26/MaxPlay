# MaxPlay — Package Design v1

Refonte validée avec Kimen (juillet 2026). À destination d'un agent Claude
(VS Code) pour intégration dans le site existant (index/index2/index3 + mj-XX.html).

## Fichiers

| Fichier | Rôle |
|---|---|
| `theme.css` | **Source de vérité** : tokens, ambiances, en-tête, tiroirs, piste de questions, boutons |
| `accueil.html` | Menu à tiroirs double niveau + profil/avatar + encyclopédie épinglée |
| `minijeu.html` | Template de page de minijeu (en-tête normalisé, piste, consigne, zone jeu) |
| `dinos-familles.html` | Encyclopédie : les 6 familles (1 écran, zéro scroll) |
| `dinos-liste.html` | Grille des dinos d'une famille (grille « A » validée) |
| `fiche-dino.html` | Fiche dino : photo plein haut + carrousel vignettes + sections colorées |
| `voyage.html` | Frise verticale des ères (trait discret DERRIÈRE les cercles) |
| `avatar-atelier.html` | Atelier : palettes/triplets, retouche fleur nid d'abeille, onglet Ambiance |

Chaque page est autonome (ouvre-la dans un navigateur) et charge `theme.css`.

## Le système en 30 secondes

1. **4 rôles de couleur** : `--bg` + `--card` (sombres, viennent de l'AMBIANCE),
   `--accent` (clair, = teinte la plus saturée de l'avatar via
   `oklch(0.78 0.12 var(--h-avatar))`), `--gold` (or fixe, étoiles UNIQUEMENT).
2. **Ambiance** = fond du jeu, choisie dans l'atelier (onglet 🌈), 6 disponibles :
   `data-ambiance="nuit|jungle|ville|espace|arcade|musee"` sur `<body>`.
   Jamais de noir-sur-noir : fonds réglés à la main, accent normalisé.
3. **Avatar** : 3 couleurs (triplets curés nommés en émoji 🥝 🐢🌻, ou fleur
   nid d'abeille en retouche). Stocker les 3 hex → déterministe. `--h-avatar`
   = teinte de la plus saturée des 3.
4. **En-tête normalisé** (voir `.mp-header`) : ← retour · icône+titre ·
   ❓ règle · 💬 avis. Compteur ⭐ global sur l'accueil seulement,
   PAS sur les pages encyclopédie.
5. **Piste de questions** (5-8) : le résultat reste affiché —
   ★ or = 1ᵉʳ coup · orange = après essai · rouge doux = avec aide(s).
   Anneau accent = question courante.
6. **Célébrations** : utiliser le module `celebrations.js` du package
   MaxFX déjà livré (markPoint à chaque bonne réponse, finalStar + belt
   en fin de jeu). Les étoiles gagnées vivent EN HAUT à côté de la piste.

## Règles d'or

- Texte lisible par un lecteur débutant : mots courts, jamais de phrases longues.
- Émojis = langage d'interface (pas de traductions nécessaires).
- Cibles tactiles ≥ 44px. Textes ≥ 12px uniquement pour les légendes parents.
- Un seul tiroir ouvert à la fois ; étoiles visibles à CHAQUE palier.
- Tout son a un déclencheur visible (🔊) ; un son signature par ambiance.
