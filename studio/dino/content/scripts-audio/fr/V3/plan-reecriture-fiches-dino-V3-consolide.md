# Plan consolidé V3 — réécriture fiches dinosaures audio

## Diagnostic validé par `dino-conseiller` + `narration-conseiller`

### Le problème n'est pas seulement la longueur, c'est le pattern industriel
- **Longueur** : groupe T-Rex estimé à ~91s/dino ; pilotes V2 à ~1600-1850 chars (~37-50s). Trop pour un 4 ans en mode tap-écoute.
- **Blabla** : la structure 4 blocs identiques + la question Wex "...c'est le lézard X ??" + la réponse "EXACTEMENT/BRAVO/OUI" devient mécanique dès la 3e fiche.
- **Silence de Wex** : le Narrateur tient des monologues de 4-5 phrases. Wex n'est pas assez vivant.
- **Redites** : régime, taille, époque répétés ; mêmes comparaisons ; fiches d'une même famille trop similaires.
- **Climax toujours au même endroit** : le "truc fou" perd son effet de surprise.

### Ce qui marche et qu'on garde
- Les 3 pilotes V2 ont des moments forts (bras du T-Rex, griffes/herbivore du Therizinosaurus, Ptéranodon du Mosasaure).
- L'échelle honnête, les vrais noms, l'étymologie expliquée : ce sont des lignes 🔒.
- La boucle fermée (question → réponse dans le même bloc) reste valide, mais Wex n'a pas besoin de questionner à chaque bloc.

## Plan V3 consolidé

### 0. Cible à valider avec Max (Papa Yann tranche)
- **30-40s par fiche** par défaut (~900-1300 chars parlés).
- **45s max** pour les dinos très riches (T-Rex, Brachiosaure, Mosasaure).
- **Pas de 4 blocs imposés** : 3 à 4 *beats narratifs*, selon le dino.
- Wex : **minimum 2 répliques par fiche**, pas forcément une par bloc. Autorisé : observation, fausse piste, silence réactif, bruit/onomatopée.

### 1. Pilote A/B avant toute réécriture de masse
3 dinos, 2 versions chacun :
- **Version courte** : ~25s, 3 beats, Wex 2x.
- **Version moyenne** : ~35s, 4 beats, Wex 2-3x.

Dinos suggérés :
1. **T-Rex** (riche, connu, bras petits = curiosité).
2. **Brachiosaure** (géant, image forte, gastrolithes).
3. **Tricératops / Tritri** (fil rouge, gag Wex).

Tester avec Max : quelle version réécoute-t-il ? Où dit-il "c'est long" ? Quelles questions pose-t-il spontanément ?

### 2. Banque de réactions Wex (à varier, jamais le même pattern)
Remplacer le pattern "...c'est le lézard X ??" par :
1. **Corporel/spatial** : *"Il se piquait pas lui-même, avec toutes ces pointes ?"*
2. **Émotionnel/relationnel** : *"Il avait peur du T-Rex, quand il l'entendait arriver ?"*
3. **Logique enfantine** : *"Il avait pas froid, là-bas, avec juste une crête sur la tête ?"*
4. **Sensoriel/onomatopée** : *"Ça faisait un bruit comme CRACK, quand il croquait un os ?"*
5. **Projection sur soi** : *"Il serait plus grand que ma maison ?"*
6. **Fausse piste** : *"Il mangeait les pierres ?!"*
7. **Silence contemplatif** : *"Attends... il nageait vraiment ?"*

### 3. Architecture type V3 (flexible)

```
BEAT 1 — Accroche (nom + étymo + époque/lieu)
  Narrateur H : 1-2 phrases, une image ou un son.
  WEX : réaction ou question vivante (pas toujours "traduction du nom").

BEAT 2 — Corps (taille + mode de vie, fusionnables)
  Narrateur H : 1-2 phrases courtes.
  WEX : coupe une fois.
  Narrateur H : réponse immédiate, 1-2 phrases.

BEAT 3 — Twist / truc fou
  Narrateur H : 1-2 phrases, fin en image ou onomatopée.
  WEX : réaction finale courte.
```

Règles d'écriture :
- Narrateur : **max 25-30 mots dits par prise de parole** (= une respiration).
- Wex : 1 ligne, pas de `!` final, FR standard, aucun tic écrit.
- Une image/idée ne se dit **qu'une fois** (sauf si Wex rebondit).
- Tout terme savant nouveau est expliqué dans la foulée.

### 4. Checklist anti-régression 🔒 à intégrer au template V3
- [ ] Échelle honnête : comparaisons issues du référentiel figé (`_ECHELLE-REFERENTIEL.md` / `_compLong/_compHaut/_compPoids`).
- [ ] Terme savant expliqué.
- [ ] Grep interdits : `max|doudou|peluche|nounours|\bbus\b` hors échelle.
- [ ] Wex : FR standard, pas de `!` final, pas d'écho, pas de fausse joie.
- [ ] Tritri préservé là où pertinent.
- [ ] Audio = écouter : "écoute", jamais "regarde".

### 5. Workflow de réécriture (par lots, après validation pilote)
1. **Fact-check** : table de vérité depuis `dinos-data.js` + Grokipedia.
2. **Draft** : `narration-audio-writer` + skill `ecriture-audio-enfants`.
3. **Punch oral** : déléguer à Kimi gratuit (`kimi-for-coding`) pour casser la molesse.
4. **Double validation** : `game-conseiller` (attention 4 ans) + `narration-conseiller` (naturel Wex).
5. **Panel enfants** : `narration-lecteur` (2 profils contrastés), note accroche /10.
6. **Grep + ajustements**.
7. **Production audio** : preview phonétique groupe → génération ElevenLabs → loudnorm.
8. **PMO** : `dino-pmo` met à jour `INVARIANTS.md` / `backlog.md`.

### 6. Cohérence avec les 22 audios existants
Si la V3 est validée, il faudra probablement **regénérer les 22 audios déjà produits** pour éviter une rupture de "saison" entre vieux longs et nouveaux courts.

## Questions ouvertes pour Papa Yann

1. **Cible durée + architecture** : 30-40s en 3-4 beats flexibles ? Ou tu préfères imposer 3 blocs fixes ?
2. **Wex** : minimum 2 répliques par fiche, pas forcément une par bloc — OK ?
3. **Pilote A/B** : les 3 dinos proposés te vont ? Tu veux tester toi-même avec Max ou je prépare les versions ?
4. **22 audios existants** : on les regénère aussi si la V3 passe ?

## Action immédiate suggérée
Trancher la question 1, puis réécrire les 3 pilotes V3 (T-Rex, Brachiosaure, Tricératops) pour A/B test avec Max.
