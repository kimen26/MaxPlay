# ElevenLabs v3 Tag Library — Extraction & Classification Complète

## Résumé du travail

- **Source** : https://audio-generation-plugin.com/eleven-v3-tag-library/
- **Total tags extraits** : 1 806
- **Catégories originales** : 15
- **Axes de classification créés** : 7
- **Dimensions par tag** : 12 (tag, description, catégorie originale, thumbs ±, + 7 axes)

---

## 1. Extraction Brute (15 catégories originales)

| Catégorie | Tags | Description |
|-----------|------|-------------|
| Sound Effects | 156 | Sons non-vocaux (applaudissements, alarmes, objets...) |
| Styles | 136 | Manières de parler (académique, assertif, booming...) |
| Introspective | 134 | États intérieurs, pensées, réflexions |
| Emotion | 131 | Émotions pures (joie, colère, peur...) |
| Vocal Effects | 129 | Vocalisations non verbales (toux, rires, soupirs...) |
| Effects | 121 | Effets audio techniques (auto-tune, reverb, bitcrush...) |
| Environment | 120 | Contextes acoustiques (café, plage, aéroport...) |
| Narrative | 120 | Styles de narration (bedtime story, callback...) |
| Humor | 116 | Comique, drôle, absurde |
| Mood | 115 | Atmosphères temporelles (morning, commute, deadline...) |
| Body States | 113 | États physiques (douleur, respiration, sensation...) |
| Dialogue | 112 | Dynamiques de conversation |
| Genre | 111 | Genres narratifs (horreur, aventure, sci-fi...) |
| Accents | 103 | Accents régionaux du monde entier |
| Rhythm | 89 | Cadences et tempos de parole |

---

## 2. Référentiel Multi-Axes (7 axes)

### valence_emotionnelle
Orientation émotionnelle : `positif` | `negatif` | `neutre` | `ambivalent` | `non_applicable`

### intensite
Niveau d'intensité : `subtil` | `modere` | `fort` | `extreme` | `non_applicable`

### type_expression
Nature de l'expression : `emotion` | `etat_physique` | `effet_technique` | `effet_sonore` | `environnement_acoustique` | `style_parole` | `rythme_tempo` | `narration` | `dialogue` | `humour` | `genre_narratif` | `accent_regional` | `humeur_tonale` | `reflexif_interieur` | `vocalisation_non_verbale`

### dimension_temporelle
Référence temporelle : `matin` | `journee` | `soir` | `nuit` | `rapide` | `lent` | `modere` | `non_applicable`

### energie
Niveau d'énergie : `tres_basse` | `basse` | `moyenne` | `haute` | `tres_haute` | `non_applicable`

### physiologie
Implication corporelle : `respiration` | `douleur` | `sensation` | `visage` | `non_applicable`

### tonalite
Qualité vocale : `grave` | `aigue` | `douce` | `dure` | `chaude` | `froide` | `nasale` | `claire` | `non_applicable`

---

## 3. Exemples de recherche multi-critères

### Recherche : "Joyeux, énergique, matin"
```
valence_emotionnelle=positif + energie=haute + dimension_temporelle=matin
→ [bright morning], [brisk morning], [calm morning]...
```

### Recherche : "Essoufflé, fort"
```
physiologie=respiration + intensite=fort
→ [breathless], [panting], [gasping]...
```

### Recherche : "Voix douce, calme"
```
tonalite=douce + energie=basse
→ [soft whisper], [gentle], [calm]...
```

### Recherche : "Horreur, intense"
```
genre_narratif + intensite=extreme
→ [cosmic horror], [body horror], [zombie apocalypse]...
```

---

## 4. Fichiers générés

| Fichier | Contenu | Format |
|---------|---------|--------|
| `1_extraction_brute_complete.json` | Données brutes des 1806 tags | JSON |
| `2_referentiel_classification.json` | Référentiel des 7 axes avec définitions | JSON |
| `3_tags_classifies.json` | 1806 tags avec classification complète | JSON |
| `4_tags_classifies.csv` | Même données en CSV pour import | CSV |
| `5_regles_classification.json` | Règles de classification automatique | JSON |

---

*Généré le 17 juin 2025*
