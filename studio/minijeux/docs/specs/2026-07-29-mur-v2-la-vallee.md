# Spec — Mur v2 « La Vallée » (v0.7, 2026-07-30)

> **Statut : VALIDÉE par Papa Yann (2026-07-29, « VAZI on fait ça »), amendée v0.6 le
> 2026-07-30 (défigement PY : raccourcis 🥚/🦕 dans le header, scène toujours pure) et
> v0.7 le 2026-07-30 (décisions PY : théâtre d'éclosion complet, pas de cap au sac —
> affordance « l'œuf nu frissonne », étoile 3★ = accessoire du sac, réutilisable).** Consolide 6 tours
> de discussion : onboarding + NID v4 accessoires · allègement accueil · header unique ·
> album Padidi · copains vivants · PIVOT scène=menu · corrections v0.3 · arbitrages finaux
> v0.4 (Tritri hérite des jeux dino — séparation encyclo/jeux confirmée).
> Remplace la direction de [`2026-07-19-menu-mur-copains.md`](2026-07-19-menu-mur-copains.md)
> (v0.6) pour la forme du menu ; ses contenus (jeux, paliers, moteurs) restent la référence.
>
> **Décisions PY défigées par PY lui-même (2026-07-29)** : la file verticale (POC v1-file,
> 2026-07-22) · le drag-to-enter (choix PY 2026-07-22) · le principe « zéro méta-monde »
> de la spec v0.5 (la scène n'est pas un méta-monde : elle EST le menu).
>
> **Historique** : v0.1 consolidation · v0.2 ajout du POURQUOI · v0.3 corrections PY (œufs
> hors du menu, jeux dino sortis de l'encyclo, vue du dessus, Troudi, Padidi simplifié) ·
> **v0.4 : arbitrages finaux tranchés — spec de référence pour le dev.**

---

## 1. Vision

**Ce qu'on construit n'est pas un menu. C'est le lieu où vivent ses copains.**

Un enfant de 3,5-4 ans ne « navigue » pas : il **va quelque part** et **retrouve
quelqu'un**. Les menus précédents étaient des **listes** — un pattern d'adulte, qui
suppose de lire, scanner et comparer. Une liste dit : « voici des options ». Un lieu dit :
« tu es chez toi ».

Trois convictions, chacune rattachée à ce qu'on sait de Max et de cet âge :

1. **On reconnaît un copain, on ne lit pas une étiquette.** Avant de lire « Spino —
   compter », un enfant sait à quoi il ressemble et où il aime être. Le menu parle par
   visages, mouvements et lieux — pas par texte.
2. **L'émotion guide mieux que l'information.** Un pavé « Rejoue avec lui ! » est du bruit
   pour un non-lecteur ; un copain qui fait la tête se **voit** de loin et se **comprend**
   sans un mot.
3. **Un seul registre par espace.** La vallée = **jouer**. Le monde dino (derrière le
   Roi T-Rex) = **collectionner** (encyclo, nid, Padidi). *Décision PY : « les œufs ne vont
   pas dans le menu, ça ne va pas du tout »* — mélanger la quête de collection avec le
   terrain de jeu brouillait les deux. Et à l'intérieur du monde dino, même règle :
   **l'encyclopédie = un livre, les jeux dino = un copain** — on ne joue pas DANS un livre,
   et le Roi T-Rex ne porte pas deux registres à la fois (§4.3, arbitrage v0.4).

**Conséquence** : le menu est minimal — un header d'identité, une vallée, des copains.
Tout le méta est rangé là où il a du sens : chez les dinos.

## 2. Principes

1. **Une page.** Header 1 ligne + la vallée. Chaque écran supplémentaire est une porte où
   l'enfant se perd.
2. **Tap unique, jamais de geste technique.** À 4 ans, la motricité fine se dépense DANS
   les jeux, jamais pour les atteindre. Le drag était un péage gestuel.
3. **Vivant mais calme.** Balade libre, pauses longues ; **tout s'arrête dès qu'un doigt
   touche** — la vie est un fond, jamais un obstacle.
4. **Zéro texte pour l'enfant, phrases ≤ 5 mots.** Il ne lit pas couramment ; le sens passe
   par humeurs, vignettes, couleurs et lieux.
5. **Réutiliser ce qui existe.** Assets avatars (`site/img/avatars/`), vignettes CSS, objets
   déjà générés. Aucune nouvelle génération d'images pour le menu.
6. **Zéro pénalité, zéro decay, zéro corvée** (doctrine D-002) — valable partout, nid inclus.
7. **Les assets avatars sont des images fixes** : jamais d'animation qui suppose de modifier
   le dessin (lever la tête, etc.). La vie vient du **déplacement**, pas de la déformation.

## 3. Layout général

```
┌──────────────────────────────────────────────────┐
│ HEADER : [avatar] pseudo ⭐n      🥚(badge)   🦕   │  ← 1 ligne
├──────────────────────────────────────────────────┤
│                                                  │
│          LA VALLÉE — vue du dessus               │
│     (fausse 3D, façon tapis de jeu)              │
│                                                  │
│   volcan    arbre    mare   grotte   fougères    │
│   Volta     Galli   Spino   Troudi   Tritri      │
│                                                  │
│   Roi T-Rex (avec son livre) → LE MONDE DINO     │
│                                                  │
└──────────────────────────────────────────────────┘
```

- **Header** : avatar + pseudo (≤12 caractères, sous l'avatar) + ⭐ total + **2 raccourcis
  collection** (v0.6, défigé PY 2026-07-30) : **🥚 → page Nid** (avec badge du nombre
  d'œufs) · **🦕 → album Padidi**. Les ⭐ restent le registre « maîtrise », lisible par
  l'adulte. Tap avatar = mini-menu « 🎨 Habiller mon dino / 👨‍👩‍👦 Espace parents ».
- **Nuance clé (v0.6)** : « les œufs ne vont pas dans le menu » (PY) visait la **SCÈNE** —
  la vallée reste pure jeu, aucun nid/œuf/accessoire ne s'y affiche. Mais le **header**
  porte les raccourcis de la quête de collection (idée PY « header unique »). Le Roi
  T-Rex garde ses 3 portes : **l'entête = le raccourci, le T-Rex = l'entrée narrative**.
- **Signal de gain sans encombrer** : quand un œuf ou un accessoire vient d'être gagné, le
  Roi T-Rex **pulse** discrètement au retour dans la vallée + badge 🥚 incrémenté +
  l'overlay de gain au retour de jeu le dit déjà.

## 4. La Vallée

### 4.1 Vue : dessus, façon tapis de jeu

- **Vue du dessus simple, fausse 3D** : la carte est vue d'en haut (légère perspective
  tolérée), les personnages restent debout dessus avec leurs assets existants.
  Réutilisation d'objets/images déjà générés pour le décor quand ils existent.
  - *Pourquoi* : c'est le **tapis de jeu** que tout enfant connaît (le tapis de voitures
    du salon) — un espace qu'on lit d'un coup d'œil entier, où l'on déplace des personnages
    debout. La convention « personnage de profil posé sur une carte vue de dessus » est
    universelle (tapis, jeux de société) : aucun enfant ne la questionne.

### 4.2 Déplacement : balade libre, jamais de contact

- Les copains **se balladent librement** dans la vallée — pas de rangées, pas de cases.
- **Anti-collision stricte (règle PY)** : deux copains ne se rentrent JAMAIS dedans.
  Implémentation simple : zone d'évitement mutuelle ; quand deux trajectoires se croisent,
  l'un ralentit ou contourne. Pas de physique, pas de rebond — « on ne se touche pas ».
- Transform-only, pauses longues, arrêt net au `pointerdown`.
- *Trade-off assumé* : la balade libre affaiblit la navigation par mémoire spatiale fixe.
  Compensation : **reconnaissance visuelle** (6 silhouettes très distinctes, dont une qui
  vole) + **coins de prédilection** (chaque copain revient souvent flâner près de son
  décor, sans y être enchaîné). À vérifier au playtest ; si Max peine à retrouver un
  copain, on resserre les prédilections.

### 4.3 Casting (VALIDÉ v0.5)

| Copain | Dino | Domaine | Coin de prédilection | Phrase bulle (≤5 mots) |
|---|---|---|---|---|
| **Spino** | Spinosaure | compter | la mare (dino-pêcheur) | « Ici, on compte ! » |
| **Galli** | Gallimimus | lire | l'arbre | « Ici, on lit ! » |
| **Troudi** *(ex-Vélo)* | **Troodon** | casse-têtes | la grotte/rocher | « Ici, on réfléchit ! » |
| **Volta** *(ex-Para)* | **Ptéranodon** | couleurs & monde | le volcan (il vole) | « Ici, on voyage ! » |
| **Ton avatar** *(repli : Tritri)* | le dino choisi à l'onboarding | **les jeux dino** | les fougères | « Viens voir les dinos ! » |
| **Roi T-Rex** | T-Rex | **le monde dino** (encyclo + nid + Padidi) | immobile avec son livre | « Je te raconte les dinos ! » |

**Arbitrage v0.5 — l'hôte des jeux dino = l'avatar du joueur** (décision PY). La règle :

- Le copain des jeux dino est **le dino-avatar choisi par l'enfant** à l'onboarding —
  « ton dino a un rôle dans la vallée », pont direct avec le choix d'avatar (moment
  d'agency §8). Il utilise l'asset et le nom de l'avatar, au coin des fougères.
- **Repli : Tritri le Triceratops** — si l'avatar choisi EST déjà l'un des copains fixes
  (Spino, Galli, Troudi, Volta ou le Roi T-Rex : on ne clone pas un habitant), c'est
  Tritri qui héberge les jeux dino (ex-hôte du Mur, assets prêts, connu de Max).
  Exception dans l'exception : si l'avatar EST Tritri, il héberge lui-même, pas de repli.
- Si l'enfant change d'avatar plus tard, l'hôte change avec lui — accepté (changement
  rare et volontaire, et « mon dino » qui prend son rôle reste lisible).

**Rappel de l'arbitrage v0.4 — encyclo seule chez T-Rex.** La question posée était :
« encyclopédie OU mini-jeux dino dans le T-Rex ? » Réponse : **encyclo seule**, pour trois
raisons :

1. **Un copain = un registre.** T-Rex est le lecteur immobile, la porte du livre et de la
   collection. Lui coller aussi les jeux, c'est recréer la confusion « on joue dans
   l'encyclo » que PY voulait sortir. L'hôte des jeux dino = jouer avec les dinos ;
   T-Rex = apprendre sur les dinos. L'enfant n'a jamais à se demander « là je joue ou je
   regarde ? ».
2. **L'hôte coûte zéro.** Avatar de l'enfant (déjà choisi, déjà aimé) ou repli Tritri
   (assets prêts, connu de Max) : on ne crée pas un inconnu, on réinstalle un ami.
3. **Le monde dino reste pur.** Encyclo + nid + Padidi = 3 facettes d'une même quête
   (le livre, les œufs, l'album). Les jeux n'y ont rien à faire : ils sont dans la vallée,
   avec les autres jeux.

- L'hôte des jeux dino (avatar du joueur, ou Tritri en repli) porte : mj-24 (cache-cache),
  mj-28 (lampe magique), mj-31 (machine à voyager), mj-30 (du plus petit au plus grand),
  mj-32 (atelier coloriage).
- Les jeux non-dino des autres copains sont inchangés (spec v0.6 §3-7).

### 4.4 Humeurs & signaux

- **Délaissé** : tête triste **par intermittence** — une invitation, jamais une
  culpabilisation (D-002 s'applique aussi aux émotions).
- **Nouveau jeu** : sparkle discret sur le copain.
- **Bulle-pensée après ~12s d'inactivité (mécanique validée PY : « c'est top ça »)** :
  au-dessus du copain délaissé, **une de ses vignettes de jeu pop dans une bulle** —
  zéro texte, « il pense à CE jeu ». La vignette est **tappable → lance le jeu
  directement** : le chemin le plus court entre « je m'ennuie » et « je rejoue », avec une
  raison émotionnelle (faire plaisir au copain). Réponse directe au diagnostic du playtest
  25/07 (sorties avant la fin, jeux délaissés).
- **Bébés éclos** : vivent dans **le monde dino** (la collection reste chez les dinos) —
  P4.

### 4.5 Décor

- Éléments : volcan (fumerolle), arbre, mare, grotte/rocher, fougères.
- **Bus 162** : passe de temps en temps en bordure de carte (via `busSVG()`), pur spectacle
  — la passion n°1 de Max, une joie sans enjeu.
- **Météorite** : option P4 — trait de lumière dans le ciel, **sans** réaction des persos
  (assets fixes) ; au plus une pause collective d'une seconde, sinon on coupe.
- Décor non-tappable assumé : ce qui te regarde et bouge = tappable ; ce qui passe au loin
  = spectacle. Ça apprend à **regarder**, pas seulement à tripoter.
- **Cabane dans l'arbre : supprimée** (arbitrage v0.4 — elle était la porte du nid ; le nid
  vit chez T-Rex désormais, l'arbre reste un arbre).

## 5. Interaction : tap → bulle de jeux

- Tap sur un copain → réaction joyeuse < 200ms → **bulle** : phrase courte + vignettes de
  ses jeux (composant `VIGNETTES` réutilisé).
- Logique `repaireState()` **inchangée** : séquence 2★, jeux verrouillés cachés + phrase
  d'ouverture, jeux libres visibles. Cette spec change la forme, pas le contrat.
- Tampons ✓ et « prochain qui brille » sur les vignettes (la frise-chemin meurt avec la
  page repaire, sa fonction survit).

## 6. Le monde dino (derrière le Roi T-Rex)

**Forme de la porte (arbitrage v0.4)** : tap sur le Roi T-Rex → **sa bulle s'ouvre comme
celle des autres copains**, mais avec 3 grandes vignettes au lieu de jeux :

1. **📖 L'encyclopédie** — telle qu'elle existe (`dev-dinos.html?v=7`, code TRITRI via
   unlock.js inchangé). Validée dans son état (playtest 25/07). On ne la refait pas.
2. **🥚 Le nid** — chantier NID v4 (contrat inchangé) : œufs couleur-famille, fissures de
   caresse, accessoires drag-gables, chaleur 1-3 → éclosion individuelle, zéro decay,
   « nid pas plein → œuf, nid plein → accessoire », anti-farm 3★, jamais d'ouverture
   manuelle, éclosion = théâtre (§6.1). Les bébés éclos vivent ici (P4).
   **Sac sans cap (v0.7, décision PY — option A)** : aucune limite de slots, aucun jeté,
   rien à jeter ou donner. La thésaurisation est traitée par **affordance** : un œuf nu
   alors que le sac contient des accessoires **frissonne** (« il a froid ») — zéro règle,
   zéro pénalité, la suggestion fait le travail. À réévaluer au playtest.

### 6.1 Théâtre d'éclosion (v0.7, séquence VALIDÉE PY)

1. **Fissures au nid** (caresses + chaleur) → l'œuf est prêt : il s'agite, sparkle —
   signal « il va éclore ! » (≤ 3 mots ou pur visuel).
2. **L'avatar du joueur sort de sa zone** et va dans le nid (transform-only ; si l'avatar
   EST un copain fixe, c'est ce copain qui assure le transport — pas de clone).
3. **Transition nid → album Padidi** : l'écran glisse latéralement, l'avatar et l'œuf
   traversent avec lui (l'œuf suit en petit rebond, transform-only — les assets fixes ne
   peuvent pas « porter »). Transition retenue pour répondre au « je ne sais pas comment »
   de PY : pas de popup, un glissement de page.
4. **L'avatar se place devant l'ombre** de la case correspondante : le court instant face à
   la silhouette crée le **suspense** (« c'est celle-là ? »), pas un spoil — la révélation
   suit immédiatement. L'anti-spoiler reste gravé : hors de ce rituel, aucun œuf n'apparaît
   jamais dans l'album.
5. **Révélation** : l'œuf s'ouvre, le sprite du dino apparaît et prend sa place — la case
   se remplit.
6. **Fin de l'action** : vignette « Voir sa fiche » **proposée, jamais forcée** +
   micro-célébration (applaudissements). Puis retour libre. Le bébé rejoint le monde dino
   (P4, acté).
3. **🏞 Padidi** — **simple point d'entrée vers les fiches de l'encyclo** : grille légère
   d'ombres par famille ; tap sur un possédé → sa fiche dans l'encyclo ; tap sur une ombre
   → réaction mystère. Anti-spoiler gravé : aucun œuf à la place d'un dino non révélé.

*Pourquoi une bulle à 3 entrées et pas 3 portes séparées* : un seul geste, un seul copain,
une seule phrase — cohérent avec le pattern des autres copains (le monde dino est « le jeu
du Roi T-Rex », en 3 salles). *Pourquoi le nid est chez T-Rex* : le menu reste un terrain
de jeu pur, et narrativement les œufs de dinosaures sont gardés par le roi des dinosaures.

## 7. Étoiles

Grosse célébration uniquement à la 3e (« Tu maîtrises ce jeu ! »), 1re/2e discrètes — une
grande fête qui se répète s'use, la rareté garde l'événement. La 3e étoile offre
l'**accessoire étoile** (v0.7, décision PY) : il vit **dans le sac à dos, point** — pas de
vitrine, pas de place spéciale dans le Padidi. Il est **réutilisable — 3 charges, à
déclassement visuel** (décision PY) :

1. **1er usage** : super star brillante (étoile pin's/badge avec couronne) ;
2. **2e usage** : étoile jaune simple — le badge/couronne s'est estompé ;
3. **3e usage** : plus d'étoile du tout — les couleurs de l'accessoire restent, mais le
   pin's a disparu : c'est devenu un **accessoire normal**, consommé à cette éclosion
   comme tous les autres (il part avec le bébé).

Elle compte dans la chaleur (1-3) à chaque usage, revient dans le sac entre deux, et se
pose **au choix**, jamais automatiquement. Une seule règle pour tout le jeu : « tout
accessoire finit par partir avec son bébé » — celle-là a juste 3 vies, et l'enfant la
**voit** déchoir (zéro chiffre, zéro compteur). **Première réception** : on montre les
3 étapes côte à côte (super star → jaune → estompée) et on dit qu'elle dure plus
longtemps — montré, pas expliqué (principe §8).

## 8. Onboarding

Nom (≤12 car.) + email parent (Supabase Phase 1) → avatar vide, choix obligatoire (premier
moment d'agency) → arrivée dans la vallée. Présentation **progressive** des copains (une
bulle one-shot chacun, jamais en rafale — charge cognitive : une chose à la fois).
Théâtre du 1er œuf : première victoire → direction le monde dino, le nid s'ouvre avec la
démo animée (la première occurrence de chaque mécanique est **montrée**, jamais expliquée).
Coach-marks : bibliothèque `mj-coach.js`, instruite dans `MECANIQUES.md` AVANT code —
geste forcé uniquement là où le geste EST le jeu, toujours skippable.

## 9. Notes techniques

- Refonte `site/js/mur.js` → module scène (`js/mur-scene.js`) ; `repaireState`, `VIGNETTES`,
  `starsOf`, `decouverte` (→ humeurs), `entry` réutilisés. `#repaire-view` supprimé.
  `COPAINS` passe à 6 entrées ; l'hôte des jeux dino est **résolu dynamiquement** au rendu
  (avatar du profil actif si ce n'est pas un copain fixe, sinon `tritri` — règle §4.3) ;
  T-Rex `ency:true` devient la porte monde dino à 3 vignettes.
- `nid-ui.js` : quitte le Mur — ses pages (nid, Padidi) déménagent dans le monde dino ;
  `collection.js` inchangé côté état (HATCH_COST=3 saute avec NID v4).
- Anti-collision : évitement mutuel simple (ralentir/contourner), aucune lib physique.
- Invariants : tap ≥ 80px · feedback < 200ms · transform-only · chargement défensif ·
  `busSVG()` · couleurs via `LIGNES` · aucune voix/TTS dans les menus avant GO PY ·
  réutilisation d'assets existants, aucune nouvelle génération d'images pour le menu.
- Harnais : `index.spec.mjs` à réécrire contre la vallée ; `mur-nid.spec.mjs` à migrer.

## 10. Phasage

| Phase | Contenu | Pourquoi cet ordre |
|---|---|---|
| **P0** | Mockup de la vallée vue du dessus (fond + 6 personnages, assets existants) | Valider le ressenti avant toute logique — 10x moins cher à jeter. |
| **P1** | Scène + tap → bulle (repaireState existant) + porte monde dino à 3 entrées | Le cœur fonctionnel d'abord. |
| **P2** | Balade libre + anti-collision, humeurs, bulle-pensée tappable, bus | L'émotion sur une base qui marche. |
| **P3** | Monde dino : Padidi simplifié + nid (fusionné avec NID v4 accessoires) | Une seule refonte de nid-ui.js. |
| **P4** | Bébés éclos (monde dino), météorite, polish | Le liant final. |

## 11. Reste à surveiller (plus de question bloquante)

- **Playtest** : la balade libre (retrouve-t-il ses copains ?) · la bulle-pensée
  (comprise ?) · la porte monde dino à 3 entrées (trouvée ?).
- **Dépendances inter-chantiers** : NID v4 accessoires (P3) · onboarding complet
  (nom/email/avatar) · coach-marks (`mj-coach.js`) · GO voix menus (phrases bulles à dire).

---

_v0.1 2026-07-29 : consolidation des 4 tours. v0.2 : ajout du POURQUOI. v0.3 : corrections
PY — œufs hors du menu, jeux dino sortis de l'encyclo, vue du dessus fausse 3D, anti-
collision, Troudi, T-Rex = encyclo existante, Padidi simplifié, « dinos qui lèvent la tête »
abandonné (assets fixes). v0.4 : VALIDÉE PY — encyclo seule chez T-Rex, porte monde dino =
bulle à 3 vignettes, cabane supprimée, bulle-pensée tappable validée. **v0.5 : hôte des
jeux dino = avatar du joueur, repli Tritri si l'avatar est déjà un copain fixe (décision
PY).** Spec de référence pour le dev (P0 mockup = prochaine étape). v0.6 : raccourcis
🥚/🦕 dans le header (défigement PY — la scène reste pure). **v0.7 : théâtre d'éclosion
complet §6.1 (avatar transporte l'œuf jusqu'à l'ombre dans le Padidi, révélation, fiche
proposée) · sac sans cap ni jeté (affordance « l'œuf nu frissonne », option A) · étoile 3★
= accessoire du sac, 3 charges à déclassement visuel (super star → jaune → estompée =
accessoire normal consommé, décision PY) · première réception : les 3 étapes montrées.**
Mode collaboration acté ce jour : PY propose → Claude challenge/conseille → PY tranche →
on grave._
