# AUDIT AUDIO VOIX — Tour exhaustif 2026-07-17

> Périmètre : 100 % des messages parlés du site (menu/plateforme, mini-jeux, dino).
> 3 scans exhaustifs (menu+JS partagés · tous les mj-XX · dev-dinos+audio/dinos).
> Scripts rédigés selon skill `ecriture-audio-enfants` (anti-molesse, moteur par réplique, zéro « Max » nommé dans le contenu).
> Statut : **PROPOSITION — en attente validation Papa Yann** (aucune prod ElevenLabs lancée).

---

## A. ÉTAT DES LIEUX (synthèse)

### ✅ Déjà couvert MP3 (rien à produire)
| Zone | Couverture |
|---|---|
| Dino : 60 fiches × 5 blocs (nom/taille/régime/funfact/recap) | 60/60, zéro manquant |
| Dino : récits voyage (8), Pangée, Extinction, dico racines (65) | 100 % |
| Dino : menus (accueil/régime/familles/voyage) + accroches 9 familles + 4 régimes | 100 % |
| Casting encouragements `sounds/voix/{f,h,wex}/` | 22 lignes × 3 voix + `etoile-gagnee` |
| Phrases-consignes `sounds/voix/phrases/` | 28 MP3 |
| Phonèmes (6), lieux bus/fusée (10) | présents |

### ❌ Trous réels (à produire ou brancher)
1. **Le MENU ne parle PAS du tout** : aucun nom de jeu, aucun nom de tiroir, pas de « jeu du jour » vocal, pas d'invitation → chantier neuf (LOT 1).
2. **Consignes de jeux en TTS brut** : `mj-shell.js` lit via `TTS.speak` ; `voices-manifest.js` VIDE → la voix « dame robot » partout (LOTS 2-3).
3. **Dino** : périodes jamais parlées dans l'encyclopédie (5 MP3 existent, orphelins) · géographie jamais en MP3 · 8 accroches `menu-ep-*` produites JAMAIS branchées · zéro encouragement vocal dino.
4. **Dynamiques** (nombres, lignes de bus, pays, racines) : TTS partout (LOT 5).

### 🔧 Quick wins CODE (zéro texte à écrire, zéro prod)
| # | Fix | Fichier |
|---|---|---|
| C1 | Rebrancher `trouve-le-meme-dino.mp3` (mj-25) et `combien-de-dinos.mp3` (mj-26) via `onRepeat`+`SoundPool.phrase` — MP3 déjà en banque | mj-25/26.html |
| C2 | `Essaie encore !` : mj-01/11/28 appellent TTS direct alors que `essaie-encore.mp3` existe → `SoundPool.voice('doux')` | mj-01/11/28 |
| C3 | Ajouter fallback TTS aux encouragements fin de partie (`SoundPool.voice` = silence si MP3 bloqué) | victory-sounds.js |
| C4 | Brancher les 10 `voix/lieux/*.mp3` orphelins (bus/fusée-dodo/garage/lettres/monde/roulotte) | menu/lieux |
| C5 | Brancher `menu-ep-*.mp3` (8 accroches d'époque) dans l'onglet Voyage | dev-dinos.html |
| C6 | Brancher `periodes/*.mp3` (5) sur un 🔊 période dans l'encyclopédie | dev-dinos.html |
| C7 | Encouragements dino : réutiliser `SoundPool.voice` (banque casting, inclut voix wex) | dev-dinos/mj dinos |
| C8 | Badge version : `carnotaurus`/`baryonyx` absents de `DINO_AUDIO_VERSION` (audio existe, badge V1 à tort) | dev-dinos.html |
| C9 | Purge candidats : `audio/dinos/fr/noms/**` (60 doublons non référencés), `sounds/Gagné.mp3`, artefacts `_concat/_preview` | dino-archiviste |

### 🚨 Violations règle « jamais nommer Max dans le contenu »
- `mj-22.html:254` : « **Bravo Max !** Tu as trouvé tous les pays ! » → réécrit LOT 3.
- `catalog.js` desc mj-34 : « libère celui **de Max** » → à reformuler (« libère le tien »).
- (« Max Adventure » = titre de marque, conservé.)

---

## B. SCRIPTS À ENREGISTRER — beaux-textes proposés

> Voix : **voix off neutre chaleureuse** (figée : pas de Wex mascotte menu, zéro Wex menus encyclopédie ; wex reste 1 des 3 voix de la banque encouragements).
> Graphie prod (MAJUSCULES, tags v3) = étape suivante via `audio-direction-elevenlabs`, après validation des textes.

### LOT 1 — MENU (chantier neuf)

**1a. Jeu du jour** (figée : courte) — 3 variantes en rotation :
- « Ton jeu du jour est arrivé ! On l'ouvre ? »
- « Surprise du jour ! C'est celui-là. »
- « Le jeu du jour t'attend… c'est parti ? »

**1b. Tiroirs (au tap, 5)** :
- « Les dinos ! »
- « Les couleurs ! »
- « Compter… et lire ! »
- « Casse-têtes ! »
- « Le monde… et les jeux libres ! »

**1c. Invitations (fixes)** :
- Jeu jamais essayé : « Celui-là, tu ne l'as encore jamais essayé. On tente ? »
- Progression étoiles : « Il te manque une étoile ici… tu la veux ? »
- Déblocage (avec le SFX `deblocage`) : « Nouveau jeu débloqué ! Va voir ! »
- Étoile pleine : « Toutes les étoiles ! Tu as tout gagné ici ! »

**1d. Cartes de jeux (au tap : titre + accroche, 1 MP3/jeu)** :

🦕 Dinos
- encyclo : « L'encyclopédie des dinos ! Ils t'attendent tous. »
- mj-24 : « Trouve le dino ! Écoute son nom… et attrape-le. »
- mj-25 : « Pareil, pas pareil ? Deux dinos se ressemblent… un seul est le bon ! »
- mj-26 : « Compte les dinos ! Un par un, sans en oublier. »
- mj-27 : « Lis le nom du dino… et retrouve-le ! »
- mj-28 : « La lampe du paléontologue… le chercheur de dinos ! Qui se cache dans le noir ? »
- mj-29 : « La fabrique de noms ! Colle les morceaux… fais des noms de dinos ! »
- mj-30 : « Range-les par taille ! Du plus petit… au plus GRAND. »
- mj-31 : « Le grand voyage du temps ! Trias, Jurassique, Crétacé… en route ! »
- mj-33 : « Le memory des ombres ! Chaque ombre cherche son dino… qui va avec qui ? »
- mj-40 : « Le tangram des dinos ! Sept pièces pour une silhouette. »
- mj-41 : « Les tuiles dinos ! Trouve les paires libres. »
- mj-32 : « L'atelier coloriage ! Tes dinos, tes couleurs. »

🎨 Couleurs
- mj-09 : « Trie les bus ! Chacun dans sa famille de couleur. »
- mj-21 : « Peins les bus ! Rouge plus jaune… ça fait quoi ? »
- mj-18 : « Les tubes de couleurs ! Verse, trie… chaque couleur chez elle. »

🔢 Compter & lire
- mj-04 : « Compte les passagers ! Combien en tout ? »
- mj-13c : « Combien avant ? Compte les bus avant le bon ! »
- mj-05 : « La bonne place ! Combien peuvent encore monter ? »
- mj-35 : « Le jeu des graines ! Sème… puis compte au grenier. »
- mj-43 : « Remplis les caisses ! Pile le bon compte. »
- mj-45 : « Le bus qui se remplit ! Ça monte, ça descend… pile au bon compte ! »
- mj-06 : « Lis la phrase ! Un mot a disparu… lequel ? »
- mj-23 : « Lis le mot… et trouve son image ! »
- mj-44 : « La boîte à sons ! Écoute le premier son… et range le mot. »

🧩 Casse-têtes
- mj-13a : « Le premier bus ! Lequel arrive avant les autres ? »
- mj-15 : « L'intrus ! Un seul ne va pas avec les autres. »
- mj-16 : « Complète la suite ! Qu'est-ce qui vient ensuite ? »
- mj-34 : « Les bus sont coincés ! Fais-les glisser… sors le tien ! » *(« dépôt » hors vocab Max — figée vocab : dodo/garage)*
- mj-37 : « Croque-échecs ! Fou, tour, cavalier… croque tous les goûters ! »
- mj-38 : « Saute-mouton ! Saute par-dessus les pions dodo. »
- mj-39 : « Les blocs magiques ! Pose-les bien, fais des lignes. »
- mj-19 : « Trouve le bus ! Il bouge… suis-le bien ! »
- mj-36 : « Le bon bus ! Envoie celui de la bonne couleur. »
- mj-08 : « Le grand rangement ! Tout le bazar dans les bons bacs. »
- mj-17 : « Le garage ! Essence, lavage, pneus… répare les bus ! »

🌍 Monde & libre
- mj-11 : « Un drapeau… mais quel pays ? À toi de trouver ! »
- mj-22 : « Trouve le pays sur la carte ! Toute l'Europe t'attend. »
- mj-20 : « Compte en huit langues ! Un… one… uno ! »
- mj-42 : « Shisima ! Le jeu du point d'eau, venu du Kenya. »
- mj-12 : « Les nouveaux sons ! Bus, musiques… et surprises. »
- max-adventure : « Max Adventure ! Conduis ton bus dans Villejuif. »
- mj-pose-tiles : « Pose tes briques ! Petit ouvrier… construis ta ville ! » *(« tiles » anglicisme, banni à l'oral)*

### LOT 2 — Consignes de jeux fixes (aujourd'hui TTS brut)
- mj-06 : « Oh ! Un mot a disparu de la phrase. Trouve-le ! »
- mj-28 : « Chuuut… un dino se cache dans le noir. Devine qui c'est ! »
- mj-30 taille : « Du plus petit… au plus GRAND ! Range-les. »
- mj-30 poids : « Du plus léger… au plus LOURD ! Range-les. »
- mj-33 : « Chaque ombre a son dino. Retrouve qui va avec qui ! »
- mj-41 : « Deux tuiles, même dino ! Trouve-les deux par deux. »
- mj-01 : « Quelle couleur est ce bus ? » (partie fixe ; le numéro reste dynamique → LOT 5)

### LOT 3 — Fins de partie & moments forts (aujourd'hui TTS brut)
- mj-01 fin : « Quiz terminé ! Tu connais bien tes bus. »
- mj-14 fin : « Grille complète ! Tu as tout trouvé ! »
- mj-15 fin : « Tous les intrus trouvés ! Quel détective ! »
- mj-16 fin : « Toutes les suites complétées ! Rien ne t'arrête. »
- mj-22 fin (remplace « Bravo Max ! ») : « Tous les pays trouvés ! Tu connais l'Europe par cœur ! »
- mj-32 : « Magnifique ! C'est toi qui l'as fait ! » (le nom du dino = MP3 dino existant, enchaîné)
- mj-31 pépite (texte du jeu, gravé tel quel) : « Tu sais quoi ? Le T-Rex n'a JAMAIS rencontré le Stégosaure… 85 millions d'années les séparent ! »
- Option économe : mj-14/15/16 peuvent aussi retomber sur la banque `SoundPool.voice('positif')` (zéro prod) — les lignes ci-dessus = version premium.

### LOT 4 — Dino : périodes & géographie (textes neufs)
- Périodes : 5 MP3 déjà produits (`trias, jurassique, cretace, cenozoique, pangee`) → **brancher** (C6), rien à écrire.
- Géographie (8 MP3, nouveau) — « Il vivait où ? » :
  - « En Amérique du Nord ! »
  - « En Amérique du Sud… comme le Brésil ! »
  - « En Afrique ! »
  - « En Europe… tout près d'ici ! »
  - « En Asie ! »
  - « En Océanie ! »
  - « En Antarctique… tout en bas du monde ! »
  - « Un peu partout sur la Terre ! »
  *(NB : « comme le Brésil » = géographie factuelle, pas de personnalisation nominative.)*

### LOT 5 — Banques dynamiques (segments à assembler)
| Banque | Contenu | Sert à |
|---|---|---|
| Nombres | « zéro » → « vingt » + « trente », « quarante », « cinquante », « cent » (~25 MP3) | mj-04/05/13c/26/43/45 |
| Lignes | « le bus … » + numéros des 26 lignes actives de `data.js` + « le RER A/B », « le métro sept », « le tram sept » | mj-01/09/13b/13c/19/36 |
| Pays | ~30 pays (mj-11 drapeaux + mj-22 Europe) : « la France ! », « le Brésil ! », « la Turquie ! »… | mj-11/22 |
| Racines dino | racines + sens depuis `_ETYMO-RACINES-50.md` (source figée, ne pas réinventer) | mj-29 |
| Mots-cartes | maison, moto, mouton… (liste mj-44) | mj-44 |
| Reco V0 | comparaisons mj-30 (« X est plus grand que Y ») et dates mj-31 = **garder TTS** (combinatoire trop large) | — |

### LOT 6 — Multilingue (mj-11 salutations ~20 langues, mj-20 chiffres ~10 langues)
**Reco : garder le TTS natif du navigateur** (voix par langue déjà correcte, prod ElevenLabs multilingue = coût élevé pour gain faible en V0). Réévaluer en V-finale.

---

## C. PROCESS AVANT PROD (rappel figé)
1. Validation textes Papa Yann (ce document).
2. Passes relecture : conseiller + panel lecteur enfants (3-passes obligatoire côté dino).
3. Prod : MCP `studio_audiobook_from_segments_v2_dialogue`, model `eleven_v3`, voix via `voice-map.json`, loudnorm, **padding 250 ms** en tête (règle SFX mobile/BT).
4. Câblage : quick wins C1-C9 + branchement nouveaux MP3 (`SoundPool.phrase` / manifest).

---

## D. Relecture panel enfant (passe 1, 2026-07-17)

Lecteur témoin 4 ans passé sur LOTS 1-4. Corrections intégrées ci-dessus :
- « n'a plus de secret pour toi » / « rien ne t'échappe » → trop abstraits, remplacés (« Tu as tout gagné ! », « Tu as tout trouvé ! », « par cœur »).
- « paléontologue » gardé mais **avec son sens dans la foulée** (« …le chercheur de dinos ! ») — doctrine mot savant décomposé.
- « dépôt », « tiles », « paires », « œuvre », « assemble/construis » → simplifiés.
- **Gardés volontairement** (doctrine vrais mots) : Trias/Jurassique/Crétacé, Shisima/Kenya, fou/tour/cavalier (contenu d'apprentissage, sauvés par la chute concrète de chaque ligne).

---

_Généré session 2026-07-17. Scans : menu+plateforme, mj-01→45, dino (60 fiches, 476 MP3 vérifiés sur disque). Passe 1 panel lecteur intégrée._
