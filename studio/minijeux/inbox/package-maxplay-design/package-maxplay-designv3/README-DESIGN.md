# MaxPlay — Package Design v1

Refonte validée avec Kimen (juillet 2026). À destination d'un agent Claude
(VS Code) pour intégration dans le site existant (index/index2/index3 + mj-XX.html).

## Fichiers

| Fichier | Rôle |
|---|---|
| `theme.css` | **Source de vérité** : tokens, ambiances, en-tête, tiroirs, piste de questions, boutons |
| `accueil.html` | Menu à tiroirs double niveau + profil/avatar + encyclopédie épinglée |
| `minijeu.html` | Template minijeu v2 : en-tête (← fantôme · titre · savant fou 🧑‍🔬?), piste 4-8, panneau règle+avis |
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
4. **En-tête minijeu v2** : ← fantôme (cercle discret, chevron SVG) ·
   icône+titre · UN SEUL bouton aide = le savant fou 🧑‍🔬 avec bulle « ? ».
   Il ouvre un panneau à 2 onglets :
   - 📖 Règle (couleur = --accent) : bouton unique « 🔊 Écoute toutes les
     règles », étapes numérotées avec 2ᵉ ligne d'explication, encadré or
     « comment gagner les étoiles » (la légende vert/orange/rouge vit LÀ,
     jamais dans l'écran de jeu). S'ouvre seul à la 1ʳᵉ partie.
   - 💬 Avis (couleur = --parent, VIOLET FIXE toutes ambiances) : coin
     parent seul (texte + 🎙️ dicter). RGPD : rien demandé à l'enfant.
   Compteur ⭐ global sur l'accueil seulement, PAS sur l'encyclopédie.
   ⚠ Le CONTENU de chaque minijeu (mécanique, aides 💡, difficulté par
   étoile) demande une réflexion cohérente et complète par jeu — le
   template ne norme que le cadre (en-tête, piste, consigne, panneau).
5. **Piste de questions** (4 à 8 selon le jeu) : le résultat reste
   affiché — vert = 1ᵉʳ coup · orange = après essai · rouge doux = aidé.
   Anneau = question courante. 3 étoiles max par minijeu (jamais 5).
   La consigne audio se lance TOUTE SEULE à chaque question (pas de
   gros bouton 🔊 dans la zone de jeu).
6. **Célébrations** : utiliser le module `celebrations.js` du package
   MaxFX déjà livré (markPoint à chaque bonne réponse, finalStar + belt
   en fin de jeu). Les étoiles gagnées vivent EN HAUT à côté de la piste.

## Règles d'or

- Texte lisible par un lecteur débutant : mots courts, jamais de phrases longues.
- Émojis = langage d'interface (pas de traductions nécessaires).
- Cibles tactiles ≥ 44px. Textes ≥ 12px uniquement pour les légendes parents.
- Un seul tiroir ouvert à la fois ; étoiles visibles à CHAQUE palier.
- Tout son a un déclencheur visible (🔊) ; un son signature par ambiance.
