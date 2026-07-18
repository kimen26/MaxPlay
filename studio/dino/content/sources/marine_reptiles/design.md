# Design Document - Géants des Mers Préhistoriques

## 1. Profile Baseline Declaration

- **Profile selection**: `profiles/education.md` (university/lectures tier)
- **Selection rationale**: Présentation éducative sur la paléontologie, destinée à un public curieux et passionné par les animaux préhistoriques. Niveau de connaissance variable, contenu riche en données scientifiques.
- **Referenced dimensions**: Densité informationnelle medium-high (65-80%), ratio texte/visuel équilibré, taille de police standard, style narratif guidé par la découverte.
- **Deviation notes**: 
  - Le style visuel s'éloigne du classique éducatif pour adopter une esthétique "documentaire nature National Geographic" avec des tons sombres et profonds évoquant les abysses.
  - Les pages de contenu utilisent un fond sombre pour créer une immersion sous-marine, contrairement au profil éducatif qui recommande des fonds clairs.

## 2. Style Baseline Declaration

- **Style anchor**: 
  - National Geographic magazine / BBC Blue Planet documentary aesthetic
  - La esthétique de musées d'histoire naturelle (AMNH, Muséum de Paris)
- **Referenced dimension**: 
  - De National Geographic : la palette de couleurs abyssales (bleus profonds, verts océaniques), l'utilisation d'images à fort impact, la typographie sobre et élégante, la mise en page magazine-like.
  - Des musées : la sobriété scientifique, la clarté de l'information, la hiérarchie visuelle des données.

## 3. Style Details

### Color Design Principles

- **Overall tendency**: Striking & bold — présentation immersive sur la vie marine préhistorique, les tons sombres créent une atmosphère sous-marine mystérieuse
- **Temperature**: Froid — tons abyssaux, océaniques, profondeurs marines
- **Primary**: #1A3A4A — Bleu abyssal profond, couleur dominante évoquant les profondeurs océaniques
- **Secondary**: #5B8C7A — Vert océanique (alguier), ton naturel subaquatique
- **Accent**: #D4A843 — Or nacré (sable fossile), utilisé avec parcimonie pour les données clés et highlights
- **Background**: #0C1E2B — Noir bleuté abyssal, couleur de fond principale
- **Text (light)**: #E8E6E1 — Blanc cassé nacré pour les textes sur fond sombre
- **Text (dark)**: #1C2529 — Noir pour les rares fonds clairs

### Font Usage Principles

- **Title font**: Oranienbaum — Serif élégant avec un caractère classique et scientifique, parfait pour les titres de documentaire nature
- **Body font**: Liter — Sans-serif moderne, excellente lisibilité pour les données scientifiques
- **Font size hierarchy**:
  - Cover title: 52px, uppercase, letter-spacing: 4px
  - Page title: 36px
  - Animal name: 32px, bold
  - Section headers: 20px, uppercase, letter-spacing: 2px
  - Body text: 18px, line-height 1.6
  - Data labels: 16px, uppercase
  - Fun fact text: 18px, italic

### Text Box and Container Styles

- **Content separation**: Fond sombre avec cartes semi-transparentes (#1A3A4A avec opacité 60-80%) pour encadrer les données
- **Cards**: Rounded rectangles avec coins légèrement arrondis (radius 8-12px), sans bordure, fond semi-transparent
- **Decorative elements**: Lignes fines dorées (#D4A843) comme séparateurs, badges de catégorie arrondis

### Image Style

- **Icons**: Solid icons (Font Awesome), couleur or nacré, utilisés pour les catégories (taille, poids, régime, etc.)
- **Tables**: Style minimal avec fond transparent, bordures fines gris-bleu, header row avec fond bleu abyssal
- **Illustrations**: Images de haute qualité d'animaux préhistoriques, style paleo-art réaliste, couleurs naturelles

## 4. Layout System

### Global Layout Characteristics

- **Canvas**: 1280 x 720 (16:9)
- **Page margins**: 60px left/right, 50px top/bottom
- **Unified elements**: 
  - Barre de navigation subtile en haut avec le titre de la présentation (16px, blanc cassé, opacité 50%)
  - Numéro de page en bas à droite
  - Ligne décorative dorée horizontale sous le titre de chaque page

### Special Page Layouts

- **Cover**: Full-bleed image de fond (paysage océanique préhistorique) + gradient mask sombre + titre centré en grand format avec sous-titre
- **Table of contents**: Fond sombre avec grille de 12 mini-cartes (2 rangées de 6 ou 3 rangées de 4) représentant chaque animal avec icône et nom
- **Final page**: Image de fond océanique + mask sombre + texte de conclusion centré

### Content Page Layout Patterns

- **Layout type A (Animal fact sheet)**: 
  - En-tête: Nom de l'animal + nom scientifique en italique
  - Corps: Deux colonnes — gauche: image de l'animal (45% width), droite: données structurées (55% width)
  - Données: Grid 2x2 ou 3x2 avec icônes + labels + valeurs
  - Bas de page: Fun fact dans une carte distinctive avec icône spéciale

## 5. Style Usage Rules

- **textStyles**:
  - `title`: Pour les titres de section et titres de pages
  - `subtitle`: Pour les noms scientifiques et sous-titres
  - `body`: Pour le texte principal et descriptions
  - `label`: Pour les étiquettes de catégories (TAILLE, POIDS, etc.)
  - `data`: Pour les valeurs de données
  - `funfact`: Pour les fun facts

- **colors**:
  - `$primary`: Fond des cartes, éléments de navigation
  - `$secondary`: Accents naturels, éléments secondaires
  - `$accent`: Highlights de données clés, lignes décoratives, icônes importants
  - `$background`: Fond de toutes les pages
  - `$text`: Texte principal sur fond sombre

## 6. Risk Prohibitions

- [ ] **Ne pas utiliser de fond blanc** — maintenir l'immersion abyssale sur toutes les pages
- [ ] **Ne pas utiliser de polices trop petites** — min 16px pour les labels, 18px pour le body
- [ ] **Ne pas surcharger les pages** — une fiche = une page, bien espacée
- [ ] **Ne pas utiliser d'images de basse qualité** — uniquement des illustrations paleo-art de haute qualité
- [ ] **Ne pas utiliser de couleurs vives ou criardes** — maintenir la palette abyssale sobre
- [ ] **Alignement des grilles** — s'assurer que les éléments sont parfaitement alignés en grille

## 7. Theme Definition

```yaml
theme:
  colors:
    primary: "#1A3A4A"
    secondary: "#5B8C7A"
    accent: "#D4A843"
    background: "#0C1E2B"
    text: "#E8E6E1"
    cardBg: "#152B3A"
    muted: "#8BA3B0"
  textStyles:
    title:
      fontSize: 36
      color: "$text"
      fontFamily: "Oranienbaum"
      letterSpacing: 1
    subtitle:
      fontSize: 20
      color: "$secondary"
      fontFamily: "Liter"
      fontStyle: italic
    body:
      fontSize: 18
      color: "$text"
      fontFamily: "Liter"
      lineHeight: 1.6
    label:
      fontSize: 14
      color: "$muted"
      fontFamily: "Liter"
      letterSpacing: 2
    data:
      fontSize: 22
      color: "$accent"
      fontFamily: "Liter"
    funfact:
      fontSize: 18
      color: "$text"
      fontFamily: "Liter"
      fontStyle: italic
      lineHeight: 1.5
  tableStyles:
    default:
      headerFill: "$primary"
      headerColor: "$text"
      headerBold: true
      bodyFill: ["#0C1E2B", "#152B3A"]
      bodyColor: "$text"
      border:
        style: solid
        width: 1
        color: "#2A4A5A"
```
