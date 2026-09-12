# Diagnostic + plan préliminaire — réécriture fiches dinosaures audio

## Contexte
Papa Yann a réécrit les dialogues fiches dinosaures (Narrateur H + Wex, 4 ans) pour apporter de la vie via les interactions d'enfant. Son fils de 4 ans a trouvé la plupart des fiches "trop longues" et "déjà fait blabla". On demande un avis et un plan.

## Matière lue
- `studio/dino/figees/encyclopedie.md` (règles figées)
- `studio/dino/content/scripts-audio/_TEMPLATE-4blocs-dialogue.md`
- `studio/dino/content/scripts-audio/_PILOTES-V2.md` (3 étalons : T-Rex ~1615 chars, Mosasaure ~1851, Therizinosaurus ~1693)
- `studio/dino/content/scripts-audio/groupe-trex.md` (13 dinos, estimations ~91s/dino)
- `studio/dino/content/scripts-audio/groupe-cou_long.md` (6 dinos)
- `site/js/dinos-data.js` (source de vérité chiffres, échelle)
- `studio/dino/content/sources/_PROCESS-DIALOGUE-PEDAGOGIQUE.md`
- skill `ecriture-audio-enfants`
- agents `dino-conseiller`, `narration-audio-writer`, `narration-conseiller`

## Diagnostic

### 1. Longueur : trop long pour 4 ans
- Pilotes V2 : ~1600-1850 chars parlés → ~37-50s.
- Groupe trex estimé : ~91s par dino (Narrateur + Wex + réponses).
- Un enfant de 4 ans en mode "tap-écoute" perd l'attention au-delà de ~20-30s.

### 2. Structure mécanique = blabla
- Template 4 blocs imposé → chaque fiche a EXACTEMENT la même ossature.
- Wex pose presque toujours une question par bloc, souvent la même : "...c'est 'le lézard X' ??"
- Narrateur répond presque toujours par "OUI / EXACTEMENT / BRAVO" → redite intolérable à la 3e fiche.
- Le narrateur tient des monologues de 4-5 phrases avant que Wex puisse respirer.

### 3. Wex pas assez "vrai"
- Beaucoup de questions sont des échos déguisés ou des reformulations de l'étymologie.
- Manque de réactions corporelles/spatiales : "il passerait par la porte ?", "il me marcherait dessus ?"
- Manque de contestation/logique enfantine : "il mangeait les pierres ?!", "il avait pas froid ?"
- Certaines répliques sonnent "polies" (commentaire) plutôt que "vives" (réaction).

### 4. Redites inter/intra fiches
- Régime, taille, époque répétés plusieurs fois.
- Mêmes comparaisons récurrentes (bus, Papa, hippopotames).
- Fiches de la même famille se ressemblent trop.

### 5. Le "fun fact" n'est pas assez fun
- Souvent une info supplémentaire, pas un climax sonore/pédagogique.
- Manque d'onomatopées, de gestes mimables, de surprises concrètes.

## Plan préliminaire proposé

### Phase 0 — Nouvelle cible (à valider Papa Yann)
- Cible : **20-30s par fiche**, soit ~700-1100 chars parlés (vs 1600-1850 actuels).
- 3 blocs maximum pour la plupart des dinos (A Présentation, B Taille/Vie, C Truc fou) ; garder 4 blocs seulement pour les dinos très riches.
- Narrateur : 1-2 phrases par prise de parole ; Wex peut couper, réagir, ou même ne rien dire dans un bloc.

### Phase 1 — Banque de réactions Wex vivantes
Créer un kit de 6-8 types de réactions Wex, à varier :
1. Recomposition du nom (1 fois sur 3 max).
2. Question corporelle/spatiale ("il passerait sous le pont ?").
3. Question émotionnelle/relations ("il avait peur ?", "il jouait avec qui ?").
4. Comparaison animalière ("comme un crocodile ?").
5. Logique enfantine / contestation ("il mangeait les pierres ?!", "il était tout nu sans plumes ?").
6. Réaction sensorielle/onomatopée ("BOOM ?", "il faisait ce bruit ?").
7. Silence contemplatif + question ("Attends... il nageait vraiment ?").
8. Projection sur soi ("il serait plus grand que ma maison ?").

### Phase 2 — Template V3 "anti-blabla"
- Bloc A : nom + étymo + lieu/époque en 2-3 phrases max. Wex réagit UNE fois (pas toujours une question).
- Bloc B : taille en 1 phrase + comparaison canonique + une touche de vie. Wex coupe si envie.
- Bloc C : régime + mode de vie en 1-2 phrases. Wex pose une vraie question OU réaction.
- Bloc D (optionnel) : truc fou en 2 phrases max, fin en image/onomatopée.

### Phase 3 — Réécriture par lots
- 1 lot = 1 famille (9 familles).
- Déléguer à `narration-audio-writer` + `dino-conseiller` par lot.
- Passer systématiquement par Kimi (gratuit) pour le punch oral.

### Phase 4 — Validation
- `game-conseiller` : attention 4 ans, rythme.
- `narration-conseiller` : naturel Wex, anti-redite.
- `narration-lecteur` : panel 2 enfants contrastés, verdict accroche /10.

### Phase 5 — A/B test avec Max
- Produire 3 versions courtes de 3 dinos (T-Rex, Brachiosaure, Tricératops).
- Tester avec Max : quelle version il réécoute ? où il décroche ?
- Itérer avant production de masse.

### Phase 6 — Production audio
- Grep interdits systématique.
- Preview phonétique groupe.
- Génération ElevenLabs + loudnorm.
- Mise à jour `memory/INVARIANTS.md` (count audio) et `memory/TODO.md` (leçon).

## Questions ouvertes
1. Est-ce que 20-30s est la bonne cible ? (Max a dit "trop long", mais on ne veut pas perdre le contenu.)
2. Est-ce qu'on garde le principe "1 question Wex par bloc" ou on autorise des blocs sans Wex ?
3. Est-ce qu'on réécrit TOUTES les fiches ou on fait d'abord un lot pilote ?
4. Est-ce qu'on conserve les pilotes V2 comme base ou on repart de zéro ?
