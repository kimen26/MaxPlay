# Consignes — réécriture V3 des fiches audio dinosaures

## Contexte
Papa Yann valide le style V3 du Thérizinosaure. Il demande de réécrire 100% des fiches audio dinosaures (dialogues Narrateur H + Wex, 4 ans) dans ce style.

## Objectif
Produire pour chaque dino 4 blocs de dialogue audio (nom, taille, régime, funfact) au format V3 :
- **~50-60 s au total** par dino (vs ~2 min actuellement).
- Chaque bloc : ~12-15 s.
- Garder toutes les étapes : nom/étymo, taille, époque, lieu, régime, groupe/solitaire, copains région, proie/prédateur, fait rigolo/spécial.

## Style V3 (à reproduire)

### Structure
```
BLOC A — Nom
  Narrateur H : nom respellé + étymologie grec/latin + explication + époque/lieu
  WEX : redonne le nom en FR + petite remarque
  Narrateur H : valide + précise époque/lieu si pas fait
  WEX : réaction spontanée (copains région, danger, étonnement)
  Narrateur H : répond avec 2-3 copains/prédateurs régionaux

BLOC B — Taille
  Narrateur H : longueur/hauteur/poids + comparaisons canoniques
  WEX : question corporelle/spatiale/surprise
  Narrateur H : réponse courte avec chiffre marquant

BLOC C — Comment il vivait
  Narrateur H : régime + mode de vie + solitaire/groupe + prédateur/proie
  WEX : question émotionnelle/logique enfantine
  Narrateur H : réponse immédiate

BLOC D — Le truc fou
  Narrateur H : fait spécial/climax en 1-2 phrases
  WEX : réaction de surprise/admiration
  Narrateur H : chute douce/image
```

### Règles d'écriture
- **Narrateur H** : 1-3 phrases courtes par prise de parole. Ton enthousiaste mais factuel, professeur du Muséum.
- **Wex** : 1 ligne par réplique. FR standard. Pas de `!` final. Pas d'écho. Pas de fausse joie. Questions/réactions VRAIES d'enfant.
- **Boucle fermée** : toute question de Wex est immédiatement suivie d'une réponse du Narrateur dans le même bloc.
- **Tags v3** : max 2 tags collés au début d'une phrase. On peut en répartir plusieurs dans la phrase. Tags validés : `[excited]`, `[happily]`, `[curious]`, `[gasps]`, `[playful]`, `[serious]`, `[confident]`, `[softly]`, `[chuckles]`, `[quickly]`.
- **Graphie** : MAJUSCULES pour insister sur les mots forts (ex. UN MÈTRE, PLUS LONGUES, GRANDE). Tirets pour syllaber les noms savants (Thé-ri-zi-no-saure). Pas de CAPS sur mots courts < 4 lettres.
- **Prononciation** : respeller les noms savants selon `_LEXIQUE-PRONONCIATION.md`. `Th-` → `Thé-`. `-saurus` → `-saure`. `ch` grec → `k`. `ph` → `f`. `y` grec → `i`.

### Interdits absolus
- `Max`, `doudou`, `peluche`, `nounours`
- `bus` hors comparaisons d'échelle autorisées
- `regarde` (on écoute)
- terme savant sans explication
- fausse comparaison hors référentiel

## Sources obligatoires à consulter
1. `site/js/dinos-data.js` — source de vérité chiffres, comparaisons, étymologie, régime, fait, etc.
2. `studio/dino/content/sources/etymo/_ETYMO-RACINES-50.md` — dictionnaire des racines grec/latin.
3. `studio/dino/content/scripts-audio/_LEXIQUE-PRONONCIATION.md` — prononciation des noms.
4. `studio/dino/content/scripts-audio/_TEMPLATE-4blocs-dialogue.md` — template canonique.
5. `studio/dino/content/scripts-audio/groupe-*.md` — scripts existants à réécrire.
6. `studio/dino/figees/encyclopedie.md` — règles figées.
7. `temp/therizinosaurus-V3-exemple.md` — exemple validé.

## Livrable
Pour chaque dino du lot, produire un bloc de texte formaté :

```markdown
## NOM D'USAGE — Nom scientifique

### BLOC A — Présentation
**NARRATEUR H** [tag] : ...
**WEX** [tag] : ...
...

### BLOC B — Taille
...

### BLOC C — Comment il vivait
...

### BLOC D — Le truc fou
...
```

Ecrire le résultat dans `temp/reecriture-fiches-dino-V3/{famille}-{lot}.md`.

## Vérification avant livraison
- [ ] Chaque dino couvre toutes les étapes demandées.
- [ ] Étymologie conforme au dictionnaire `_ETYMO-RACINES-50.md`.
- [ ] Chiffres de taille/poids conformes à `dinos-data.js`.
- [ ] Grep interdits : `max|doudou|peluche|nounours|\bbus\b` (hors échelle).
- [ ] Tags max 2 au début d'une phrase.
- [ ] Noms savants respellés.
