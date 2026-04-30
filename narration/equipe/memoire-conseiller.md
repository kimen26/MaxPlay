# Mémoire — Conseiller Narratif

> Mis à jour par `narration-conseiller` après chaque session de brainstorming ou décision de fond.
> Format : `- YYYY-MM-DD | <type> | <décision/note>`

## Arcs et saisons en cours

- 2026-04-29 | série | **Série 001 "La Parole"** ouverte — fil rouge : *ce qu'on dit (ou ne dit pas) a des conséquences réelles*. 5 histoires (002 canon, 003 workshop, 004/005/006 pitch validé). Source : `archive/inputs-historiques/serie-parole-briefs.md`. Couvre 8/9 compagnons, Wex circule en témoin.
- 2026-04-29 | note | **002 *Le Rire qui reste*** déjà canon (489 mots, GateKeeper PASS) — pitch source aligné, pas de différence notable détectée à ce stade (vérification fine recommandée si questions). Lieu canon : terrain-de-jeu-parc.
- 2026-04-29 | note | **003 *La Confidence*** en workshop (GateKeeper PASS, version finale en attente auteur). Pas de fichier `pitch.md` formalisé dans le workshop — le pitch source du fichier `serie-parole-briefs.md` reste la référence Ki/Sho/Ten/Ketsu. À régulariser si besoin lors de la canonisation.
- 2026-04-29 | règles-série | Règles transversales La Parole : pas d'adulte qui résout · pas de morale dite · pas de réconciliation rapide · Wex jamais sauveur · le geste > le mot.

## Patterns éditoriaux notés (feedback lecteurs)

### Leçon V2→V3 "Parapluie oublié" — passage décoratif → sobre

> Source : `archive/inputs-historiques/2026-04-23-29-echange-telegram.md` (l. 1-105)
> Cas d'école pour writers — à citer en brief si une version vire trop "décorative".

**Le diagnostic du lecteur (Ray) sur la V2 :**
> *« L'histoire est vide. Le truc d'expliquer la pluie et l'arrêt de bus rituel, c'est trop décoratif. On explique tout, c'est lourd. Où est passé le parapluie ? On rentre mouillé, c'est pas grave ? »*

**Ce qui clochait en V2 (à éviter) :**
- Lulu **explique** la pluie ("l'air en haut est plein…") → didactique plaqué
- Le kiosque-rituel **expliqué** (plaque qui s'allume, lignes d'énergie nourries) → décoration d'univers en avant-plan
- Le parapluie **disparaît du récit** une fois la prémisse posée → trahison du titre
- Trop de "crochets univers" à signaler → posture d'auteur visible

**Ce que la V3 fait bien (à garder) :**
- Le parapluie ouvre ET ferme l'histoire (oublié → retrouvé sec, inutile) → centre de gravité
- Le rituel n'est pas expliqué — il est **vécu** (Mimi sort de l'auvent, les autres suivent)
- Le monde affleure par un détail (l'auvent, le banc, la rue qui brille) — **présence > description**
- Les ennéatypes restent dilués dans les gestes, pas dans des explications
- Fin sèche : *« Tant pis pour toi », elle dit au parapluie* — pas de morale

**Règles à appliquer (writers) :**
1. **Sujet du titre = centre de gravité** — il agit, il manque, il revient
2. **Ne pas expliquer le rituel** — le montrer en action, jamais en didactique
3. **Le monde affleure** — un détail concret suffit (un auvent, une plaque, un son)
4. **Présence > description** — Wex présent silencieux > Wex décrit
5. **Pas de réflexe "ajoute du lore"** en réécriture — la conclusion la plus simple est souvent la bonne

### Pattern "même histoire × N cultures" (moat narratif)

> Source : `archive/inputs-historiques/2026-04-23-29-echange-telegram.md` (l. 195-256)
> Pattern réplicable pour la phase de localisation future (S2+).

**L'idée :** une même trame (ennéatypes, structure Ki-Sho-Ten-Ketsu, objet du titre) se transforme selon la culture. **Le geste change, l'ennéatype reste.**

**Exemple de référence — la pluie :**

| Culture | Sens de la pluie | Geste enfant |
|---------|------------------|--------------|
| Sahel (Sénégal, Mali) | Bénédiction attendue | Danse sous l'orage |
| Tokyo / Europe tempérée | Nuisance douce, mélancolie | S'abritent ensemble, observent les flaques |
| São Paulo (tropique) | Élément quotidien, presque invisible | Continue ce qu'on faisait, à peine ralenti |
| Bombay / mousson | Saison entière | Saison de jeux dédiés |
| Désert (Atacama, Sahara) | Événement rare, sacré | On sort exprès, on se tait |

**Ce que ça permet :**
- Une histoire écrite une fois → N variantes culturelles avec changement de geste, pas de structure
- Le moat éditorial (X Creator Subscriptions par culture) repose sur ce pattern
- L'ennéatype reste universel, la culture devient le vêtement

**À cadrer en S2 :**
- Quelles cultures pilotes ? (cf. trou tupi-guarani + brésilien lusophone moderne)
- Lookup.yml prénoms par culture : prêt pour le geste, pas encore pour le filtre culturel
- Pattern à documenter dans `equipe/cartographie-domaines.md` (section éléments cross-culture)

## Personnages — évolution et couverture

## Ce qui a fonctionné

## Ce qui a cloché / écarté

## Questions ouvertes

## Catalogue prénoms — couverture cross-culturelle

### Méta-critique recherche prénoms — 7 angles morts à toujours vérifier

> Source : `archive/inputs-historiques/2026-04-13-20-echange-telegram.md` (l. 1285-1308 — échange Botard/Ray du 20/04)
> À utiliser comme **checklist** avant toute validation d'un prénom dans `personnages/lookup.yml` ou dans le casting.

1. **Test à voix haute des 9 enchaînés** — prononcer la liste complète des 9 compagnons + Wex d'un trait. Cohérence sonore ? Confusion possible (deux prénoms qui sonnent pareil) ? Rythme global ?
2. **Équilibre genre F/M** — sur 9 personnages, l'équilibre filles/garçons/neutres doit être arbitré explicitement, pas subi.
3. **Prononciation francophone** — un enfant français de 4 ans doit pouvoir prononcer **sans entraînement**. Exemples écartés du source : Xochipilli, Taweret, Kjærlighed.
4. **Connotations parasites** — vérifier les rapprochements involontaires en français : `Bes` → "bête" · `Maât` → "mat" · `Haki` → One Piece · `Satya` → yoga commercial.
5. **Recouvrement personnages connus de Max** — éviter les prénoms qui collent à des héros déjà dans son univers : Hiro (Big Hero 6), Moana, Akira, Yuki, etc. Risque de confusion / parasitage de l'attachement.
6. **Charge culturelle** — un orisha vivant, une divinité encore vénérée, un nom sacré dans une tradition active = vigilance. On ne vole pas un nom sacré pour le coller à un compagnon ennéagramme.
7. **Mémorabilité enfant 4-6 ans** — un prénom doit être retenu après 1-2 lectures. Trois syllabes max, voyelles claires, consonnes franches.

**Note narrative associée :** la cohérence onomastique du groupe n'est **pas tranchée** — tous mono-culture ? chacun une culture ? règle implicite du monde post-Éveil sur les noms ? À garder en question ouverte.

### Pistes parking (idées en standby — pas dans le canon V1)

- 2026-04-29 | parking | **Rituel "prénom donné après observation"** (l. 6644-6645 du source 13-20 avril). Pratique amérindienne / ancienne : l'enfant n'a pas de prénom à la naissance, on observe son comportement, sa "vibration", et un prénom-vibration émerge. Application possible : S2, cultures alternatives, ou histoire ponctuelle où un personnage rencontre cette pratique. **Pas d'intégration au canon V1** (le casting Wex + 9 compagnons est figé). Ressortir comme matière narrative ou clin d'œil culturel le moment venu.

- 2026-04-29 | parking | **Comparables prior art cross-culture jeunesse** (matière utile pour l'Architecte / Writers quand ils exploreront la piste cross-culture, suite à la décision *Architecture cross-culture du casting* — voir `pmo/decisions.md` et `univers/architecture-cross-culture.md`) :
  - **StoryWeaver / Pratham Books** (Inde) — 25 000+ histoires en 270+ langues, adaptation visuelle communautaire, licence CC-BY, audio Readalongs intégré. Référence absolue de la localisation hyperlocale jeunesse.
  - **Elisavet Arkolaki** (auteure maltaise) — séries *Cousins Forever*, *Where am I from?*, *Happiness Street* — traduits en 50+ langues. Modèle "même livre × N langues" pour comprendre les limites du format papier statique.
  - **One Globe Kids** (app iOS) — choose-your-own-adventure avec photos d'enfants réels (Haïti, Burundi, Indonésie, NY, Israël). 1,99$/histoire. Production lourde, abandonné ~2015 — utile comme contre-exemple (production photo réelle = piège scaling).
  - **« I See the Sun »** — séries illustrées Népal/Myanmar/Afghanistan/Chine/Russie. Format statique, à étudier pour le ton "découverte culturelle".
  - **Anna Hibiscus** (Atinuke) — héroïne nigérian-canadienne. Modèle de personnage cross-culturel mono-protagoniste.

  **Constat clé** : aucun de ces projets ne combine **archétypes universels (ennéatypes) + adaptation culturelle profonde + univers connecté**. La zone de différenciation MaxPlay reste libre.

---

## Catalogue prénoms — extractions historiques

- 2026-04-29 | extraction | Extraction complète du fichier source `recherche-prenoms-culturel-session-fondatrice.md` (archivé) → 191 prénoms qualifiés sur 28 cultures. INDEX.md du catalogue à jour.
- 2026-04-29 | trou | Type 6 (Loyaliste) sous-couvert (13 occurrences vs 28-36 pour les autres) — la "fidélité/vigilance" est moins universellement nommée. À creuser dans : chinois, slave, kurde, basque, celte, mongol, persan.
- 2026-04-29 | trou | **Tupi-guarani vide** (0 prénom) alors que c'est prioritaire (origines Max). Le fichier source ne contient que du vocabulaire (*kuarahy*, *jasy*, *yvoty*), pas de prénoms attestés. Recherche ethnographique dédiée à lancer.
- 2026-04-29 | trou | **Brésilien lusophone moderne** absent — pourtant aire principale pour Max. À créer.
- 2026-04-29 | trou | Yoruba non couvert (Orishas) — Aborigène australien non couvert.
- 2026-04-29 | décision-ouverte | Sur 28 fiches culturelles, lesquelles promouvoir en **cultures principales V2** (objectif ~20) ? Question à poser à l'auteur.

---

## Sessions 2026-04-30

### Architecture cross-culture — précisions stratégiques

- 2026-04-30 | stratégie | **Bulles + croisements** : Phase 1 = bulles locales (chaque culture pense que le casting lui est propre, pas de signal cross-culture au démarrage). Phase 2 = croisements 6-12 mois après stabilisation. Doc à jour dans `univers/architecture-cross-culture.md`.
- 2026-04-30 | règle | **Pas de gros cliché / légende / religion locale dans les bulles**. Socle universel = bienveillance · éveil · sensibilité. La culture **affleure par les gestes du quotidien**, elle n'est pas le sujet.
- 2026-04-30 | piste | **Wex** : un Wex par culture, prénom invariant « Wex » partout. Confirmation reportée à la première histoire de croisement (S2+).
- 2026-04-30 | piste | **Mémoire entre castings** : probablement OUI (mêmes histoires archétypales rejouées par culture). Tension avec charge éditoriale → ticket UNIVERS-003.
- 2026-04-30 | ticket | **UNIVERS-003** créé : borner invariant vs variant dans l'expression ennéatype par culture. Futur fichier cible : `enneagramme/expression-cross-culture.md`.

### Distillation narratologie cross-culture

- 2026-04-30 | source | `equipe/sources-narratologie.md` créé (étude 28k tokens distillée en pépites actionnables + matière de fond). Référence Architecte/Writers. Liens depuis `narration/INDEX.md`.
- 2026-04-30 | confirmation | **Choix MaxPlay validés narratologiquement** : Kishōtenketsu (modèle japonais), univers implicite (simulation incarnée), ennéatypes dilués (distribution d'ensemble), 400-700 mots P2 (sweet spot industriel + attention span 4-6 ans), Wex témoin pas résolveur (rôle « personnage secondaire » de Propp).
- 2026-04-30 | pépite | **Theory of Mind à 4 ans** : Max peut traiter le ressort *« Wex sait quelque chose que les autres ignorent »*. Levier d'engagement disponible.
- 2026-04-30 | pépite | **Règle 30s / 1 double-page** : toute tension doit être adoucie sous 100-150 mots dans nos formats P2. Cf. *Monstres et Cie* — peur → absurdité immédiate.
- 2026-04-30 | pépite | **Modèle « bon assez parent » (Bluey/Winnicott)** : si on introduit des parents dans MaxPlay, ils peuvent être imparfaits/fatigués/distraits — c'est rassurant, pas inquiétant.
- 2026-04-30 | pépite | **Ensemble vs solitaire** : MaxPlay = ensemble (Wex + 2-3 compagnons par histoire). Atout — plusieurs points d'entrée d'identification (timide → Lulu, extraverti → Raph, etc.).

### Tri input-idees — fin de vague

- 2026-04-30 | bilan | Tri input-idees terminé. Dossier ne contient plus que `README.md`. **Bilan extraction sur la vague (16 fichiers triés)** :
  - Patterns éditoriaux (parapluie, sobriété, info-loss) → mémoire conseiller + decisions
  - Pattern « même histoire × N cultures » → memoire-conseiller (parking)
  - Architecture cross-culture → univers/architecture-cross-culture.md (créé) + pmo/decisions.md
  - Catalogue prénoms 191 prénoms / 28 cultures → personnages/catalogue-prenoms/
  - Comparables prior art cross-culture (StoryWeaver, Arkolaki, etc.) → memoire-conseiller (parking)
  - Rituel prénom-vibration → memoire-conseiller (parking)
  - Étude narratologique cross-culture → equipe/sources-narratologie.md (créé)
  - Concept « contribution joyeuse » Aetheria → ticket UNIVERS-002
  - Voix ElevenLabs → equipe/voix/ (10 fichiers, INPUT-003 ✅)
  - Symbolique ésotérique → enneagramme/symbolique.md (INPUT-002 ✅)
  - Distillation INBOX → univers/transport, sensibilités, école, géographie (INPUT-001 ✅)
- 2026-04-30 | direction | Plus aucune extraction en attente. Les prochaines arrivées dans `INBOX.md` seront traitées dossier par dossier.

## Sessions 2026-04-29 (suite — décisions auteur de fond)

### Décisions tranchées définitivement
- 2026-04-29 | tranché | **D1 Parents** : présents non-présents (confiance, amour, liberté). **S1 = prisme enfant pur** — pas de scène avec parent visible. Réintroduction possible S2+ via modèle « bon assez parent » Bluey/Winnicott.
- 2026-04-29 | tranché | **D2 Compagnons** : forme = **ondes / fluides / vapeurs / éther** (pas d'animaux). Manifestation par **couleurs émotionnelles** ("je t'ai vu devenir rouge"). Apparition progressive milieu/fin S1. Refonte complète de `univers/compagnons.md` faite.
- 2026-04-29 | tranché | **Sensibilité différenciée** (correctif narratologie) : chacun perçoit ce que les autres ne perçoivent pas. **PAS de hiérarchie « savoir caché »**. Wex est un percepteur parmi d'autres. Sa sensibilité reste à définir précisément (NARR-003).
- 2026-04-29 | tranché | **D3 Structure des saisons** : S1 enfance pure → S2 visites Wex chez chaque copain (sensibilités révélées) → S3 vide (NARR-004) → S4 décentrement (un des 9 prend le rôle central, plus d'histoires en volume) → S# voyage cross-culture (joker).

### Concept éditorial nouveau
- 2026-04-29 | concept | **Arc narratif** = suite de 3-5-7 histoires liées par un axe précis. Plusieurs arcs cohabitent par saison. Création de `equipe/arcs-narratifs.md` avec définition + exemple « La Parole » (002-006). Lien avec le pipeline éditorial (Phase 0 Conseiller détecte l'arc, Phase 1 Architecte rappelle les règles transversales, Phase 6 GateKeeper vérifie).

### Tickets ouverts pour discussion future
- NARR-001 (priorité haute) : **D4 Cross-culture micro-structures** — auteur veut creuser, à discuter ensemble avant ouverture du 2e casting national. Cliffhanger à débattre dans cette discussion.
- NARR-002 : Brief writer (verbes action + sensations sensorielles + ratio dialogue **noté en %age dans chaque story** pour rappel relecture, pas de seuil dur).
- NARR-003 : Sensibilités différenciées détaillées — surtout **Wex** (piste : écoute des fausses notes / soin-bioélectrique).
- NARR-004 : Définir S3 (vide).

### Fichiers modifiés cette session
- `pmo/decisions.md` — 4 décisions ajoutées (Parents, Compagnons, Sensibilité différenciée, Structure des saisons), question ouverte #2 marquée tranchée.
- `univers/compagnons.md` — refonte complète (ondes/couleurs).
- `equipe/arcs-narratifs.md` — créé.
- `pmo/roadmap.md` — section Structure des saisons + horizons mis à jour.
- `equipe/cartographie-domaines.md` — invariants 9, 10, 11 ajoutés.
- `personnages/INDEX.md` — section Sensibilités différenciées ajoutée.
- `pmo/backlog.md` — NARR-001 à 004 ajoutés.
- `equipe/sources-narratologie.md` — pépite 1.4 ToM corrigée (sensibilité différenciée vs savoir caché).

### Trous identifiés / à creuser ensemble
- **Sensibilité de Wex** — non définie précisément. Priorité avant S2 (NARR-003). Pistes auteur : écoute des fausses notes, lien soin-bioélectrique.
- **Première apparition canon des compagnons-ondes** — quelle histoire de fin S1 inaugure ? Idéalement perso sensible aux flux (Mimi-eau ou Jérem-fréquence). À pitcher.
- **Logements / chambres de chaque perso** — non définis. Devient critique en S2 (saison des visites). À cadrer avant ouverture S2.
- **Cross-culture micro-structures** — NARR-001, à discuter avec auteur.
