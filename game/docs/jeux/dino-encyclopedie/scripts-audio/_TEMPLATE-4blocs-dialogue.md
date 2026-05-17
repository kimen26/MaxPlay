# Template Dialogue 4 Blocs — Dino-Encyclopédie Vague 1

**Structure canonique pour chaque dinosaure audio.**

---

## Structure générale

### Bloc A — Présentation
- Narrateur H : nom du dino, étymologie, lieu/époque (3-4 phrases)
- Wex : 0-1 réplique courte, réaction à la merveille du nom/époque (observation tendre, pas d'écho)

### Bloc B — Sa taille
- Narrateur H : longueur/hauteur/poids + 2-3 comparaisons enfant-friendly (bus, bus, éléphant, girafe, porte, toi) (4-5 phrases)
- Wex : 0-1 réplique courte, questionnement ou détail remarqué (« C'est plus grand que... ? »)

### Bloc C — Comment il vivait
- Narrateur H : régime, chasse/prise, vie sociale, territoire/groupe (4 phrases)
- Wex : 0-1 réplique sur un détail émotionnel ou stratégique (jamais fausse joie)

### Bloc D — Le truc fou !
- Narrateur H : super-pouvoir, chiffre dingue, découverte scientifique (3-4 phrases, climax)
- Wex : 0-1 réplique de surprise/admiration VRAIE, pas plaquée (« Attends... »)

---

## Règles Wex (CRITIQUE — Papa Yann insiste)

### À PROSCRIRE absolument
- ❌ **Fausse joie** — « Waouh super génial !! »
- ❌ **Écho** — répéter la phrase du Narrateur (« Oui, il y a 8 tonnes ! »)
- ❌ **Sur-enhousiasme** — réplique > 1 ligne
- ❌ **Sagesse plaquée** — « On comprend que... »
- ❌ **Exclamation finale** — **WEX NE FINIT JAMAIS PAR DES POINTS D'EXCLAMATION**
  
### À PRIVILÉGIER
- ✅ Observation tendre, détail remarqué (sensoriel, spatial, relationnel)
- ✅ Question naïve de Max (« Mais c'est... ? »)
- ✅ Pause contemplative (« Attends... »)
- ✅ Douceur naturelle (tone of voice, pas force dramatique)
- ✅ Fin neutre ou douce : point, tiret, silence
- ✅ **À peine 1-2 répliques par bloc**, jamais plus

---

## Tags v3 autorisés par réplique Wex

MaxPlay autorise ces tags inline (max 2 par réplique) :
- `[happily]` — joie douce
- `[curious]` — intrigue
- `[softly]` — tendre/discret
- `[gasps]` — surprise vraie
- `[serious]` — concentré
- `[confident]` — assuré
- `[chuckles]` — petit rire complice

**Narrateur H** peut utiliser plus de tags (excitation historienne), pas Wex (sobre).

---

## Format rédigé

```
**NARRATEUR H** [tag optionnel] : [texte bloc A/B/C/D]

**WEX** [tag optionnel] : [1-2 lignes max, pas de !!]
```

---

## Exemple complet (template vide)

```
## DINOSAURE — Nom scientifique

### Bloc A — Présentation

**NARRATEUR H** : [3-4 phrases : nom, étymologie, lieu, époque]

**WEX** [optional tag] : [Réaction tendre à la merveille du nom/époque]

### Bloc B — Sa taille

**NARRATEUR H** : [Longueur/hauteur/poids + 2-3 comparaisons enfant]

**WEX** [optional tag] : [Question naïve ou détail spatial remarqué]

### Bloc C — Comment il vivait

**NARRATEUR H** : [Régime, chasse, vie sociale, territoire]

**WEX** [optional tag] : [Détail émotionnel sur la vie du dino]

### Bloc D — Le truc fou !

**NARRATEUR H** [excited tag] : [Super-pouvoir, chiffre dingue, découverte scientifique]

**WEX** [optional tag] : [Surprise vraie, admiration contrôlée]
```

---

## Notes opérationnelles

1. **Longueur** : Viser 30-45 secondes total par dino (7-8 phrases Narrateur + 1-2 courtes Wex = ~10-12 lignes).
2. **Voix** :
   - **Narrateur H** = `cbRcktt2xvoeFpdvW2wg` (Lumi Playful Theatrical Warm FR)
   - **Wex** = `G54e8CyYslC2Y4ZupTlg` (Lumi Héros — aigu melodic light, singsong flowing)
3. **Modèle ElevenLabs** : `eleven_v3` (supporte tags inline)
4. **Factualité** : Chiffres de référence dans `game/web/js/dinos-data.js` (longueur/poids/taille = source autorité, corriger si divergence Kimi)
5. **Tonalité Narrateur** : enthousiaste mais factuel, professeur du Muséum. Tonalité Wex : curieux, observateur, jamais le maître.

---

## Fichiers sources à consulter

- **Fiches factuelles** : `game/inbox/FICHES-RESTRUCTUREES.md` (bloc A/B/C/D de base, en monologue)
- **Tonalité alternative** : `game/inbox/grok.md` (~13 dinos, tone plus court/fun)
- **Chiffres** : `game/web/js/dinos-data.js` (fonction `_statsPhrase` — source autorité)
- **Perso Wex** : `narration/personnages/wex/personnage.md` (garde-fou principal)

---

_Vague 1 pilote (3 exemplaires). Format de travail : Markdown. À passer au JSON segments + MCP `studio_audiobook_from_segments_v2_dialogue` pour production audio (Étape 2, pas ce tour)._

