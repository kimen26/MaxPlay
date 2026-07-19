# Design Lecture — Notes de conception & état des lieux

> Dossier de travail des jeux de lecture pour Max (GS, 4 ans).
> Pendant comptage : [`../design-compte/NOTES-DESIGN-COMPTE.md`](../design-compte/NOTES-DESIGN-COMPTE.md).
> Créé 2026-07-19. **Statut : 19 idées proposées, mockups jouables en cours (index.html).**

## Dernier besoin exprimé (point de reprise)

Le parent demande (2026-07-19) : jeux de lecture adaptés au niveau réel de Max —
il lit les syllabes et les mots simples en phonétique (bon niveau, débutant), à l'école
Montessori française **en cursive (lettres attachées)**. Point de friction observé : les
sons complexes lus lettre par lettre (« tonton » → il lit « o-n »). **Ajout parent (même
jour)** : un niveau très basique « révision des lettres pour tout le monde » → jeux 3
(clavier alphabétique « trouve le a ») et 4 (trouve le t → puis le tro…), assumés simples.

**Reste à faire :**
1. Recueillir les retours du parent sur les paliers (§3) et les 19 idées (§4) via les mockups jouables.
2. Police cursive : **Cursif intégrée aux mockups** (§5.1) — reste à trancher la fonte PROD (ABCursive vs DN Manuscript vs Cursif + licence web) et à valider le rendu sur tablette.
3. Transformer les concepts retenus en vrais jeux (moteur `mj-lecture.js` à créer, §5.3).

**Fichiers du dossier :** `index.html` (sommaire des 19 mockups) · `mockup-01-*.html` …
`mockup-19-*.html` (démos jouables, 1 phase prédéfinie chacune) · socle partagé :
[`../design-shared/`](../design-shared/) (CSS+JS communs à tous les mockups, compte inclus).

---

## 1. Où en est Max (terrain)

| Fait | Conséquence design |
|------|-------------------|
| Lit les syllabes et les mots simples, déchiffre en phonétique | On est en phase **alphabétique partielle** (Ehri) : le décodage CV/CVC fonctionne, l'automatisation est en cours |
| École Montessori FR → **cursive minuscule attachée** (« le b = un l avec une boucle en bas ») | Tous les textes du jeu en **cursive minuscule**. Jamais de script/capitale sauf jeu dédié (pont panneaux RATP en capitales) |
| « tonton » lu « o-n » | Les **graphèmes complexes ne sont pas encore vus comme des blocs**. C'est LE chantier pédagogique central : `on`, `ou`, `an`, `oi`, `in`, `ch`… doivent devenir des tuiles insécables |
| Vocabulaire passions : bus, dinos, loup, drapeaux, papa/maman, Tayo | Lexique de jeu = mots de SA vie (motivation + sens immédiat) |
| 4 ans, tablette tactile, pas de lecture silencieuse longue | Tout texte lu à voix haute (règle gravée), micro-sessions 3-5 min |

## 2. Ce que disent les bonnes pratiques (sources 2026-07-19)

**Méthode : syllabique/phonique, point.** Le décodage explicite graphème→phonème est la
voie validée pour le début de lecture ; la « globale » ne sert que pour quelques mots
outils irréguliers. À la maison : voyelles d'abord, **le SON de la lettre jamais son nom**
(« sss », pas « esse »), puis syllabes CV, puis mots ([caaly.fr — méthode syllabique](https://caaly.fr/blogs/conseils/methode-syllabique-vs-globale-apprendre-lire-cp)).

**Un geste par son (Borel-Maisonny).** Chaque son est associé à un geste simple — triplé
visuel/auditif/moteur qui ancre la mémoire ; méthode fondée par l'orthophonie française,
toujours référence ([Bien Lire et Aimer Lire](https://esf-scienceshumaines.fr/blog/post/apprentissage-de-la-lecture-la-methode-bien-lire-et-aimer-lire.html)). → Nos jeux peuvent
donner un **mini-geste animé à chaque son** (le dino fait le geste).

**Progression officielle : du régulier au complexe, par fréquence.** Les paramètres :
régularité graphème-phonème, fréquence, structure syllabique (CV → CVC → CCV), et
**l'inséparabilité des graphèmes complexes** — exactement le point « tonton » de Max
([SYNEP — guide lecture/écriture](https://www.synep.org/guide_lecture_ecriture.pdf)).
Ordre des complexes niveau 1 (thèse ESF, progression voyelles rouges / consonnes bleues) :
`ou` → `oi` → `an/am/en/em` → `on/om` → `au/eau` → `in/ain/ein` → `ch` → `é/er/ez`
([thèse — graphèmes complexes niveau 1](https://theses.fr/2021ANTI0644.pdf)).
Confusions classiques à travailler **explicitement** : `on`/`an`, `ou`/`on`, `gn`/`ill`,
inversions de syllabes ([SOS Education — guide manuels syllabiques](https://soseducation.org/docs/ouvrages-et-ressources-pedagogiques/enseigner-la-lecture-au-cp-guide-des-manuels-syllabiques.pdf)).

**Séquence Montessori** (cohérente avec son école) : conscience phonologique **à l'oral
d'abord** (jeux de sons, rimes) → lettres rugueuses (tracer la lettre en disant le son) →
**alphabet mobile** (construire des mots avant de savoir les écrire) → lecture phonétique.
Le tracé au doigt = lettre rugueuse numérique, naturel sur tablette.

**Cursive : tracé par familles de gestes** (Danièle Dumont : lettres rondes, à boucles,
pointues, combinées) — tracé au doigt sur écran, sur la table, dans la semoule
([Apprendre avec Bobo — cursives](https://apprendreavecbobo.fr/video-ecriture-trace-lettres-boucles/)).

**Apps de référence** : Alphablocks (son avant graphème, déjà dans nos refs), Teach Your
Monster to Read (gratuit, récompensé — à tester en famille), Khan Kids ; en FR, Storyplay'r
pour la lecture d'histoires à deux ([teachyourmonster.org](https://www.teachyourmonster.org/)).

**Existant MaxPlay à ne pas réinventer** : mj-23 (mot→image), mj-27 (syllabes),
mj-06 (phrase à trou) — catégorie « Lecture » déjà amorcée, à étendre.

## 3. Échelle de difficulté (paliers gravés — à valider)

Chaque palier = une famille de jeux. Le jeu adapte **dans** le palier (2 régimes de
difficulté, décision gravée), jamais de saut de palier automatique.

| Palier | Contenu | Exemples | Statut Max |
|--------|---------|----------|-----------|
| **P0** | Conscience phonologique — 100% oral, aucune lettre | « ça commence par [mmm] ? », rimes | acquis à entretenir |
| **P1** | Lettres → sons (cursive) + **révision lettres** (clavier, reconnaissance) | voyelles `a i o u e é` → consonnes continues `s l r m f` → le reste | en cours |
| **P2** | Syllabes CV + mots réguliers CVC/CV.CV | `pa mo lu` → **papa**, moto, lit, bus, nid | en cours (son niveau actuel) |
| **P3** | 1 graphème complexe par mot, comme BLOC | maman (`an`), tonton (`on`), poule (`ou`), roi (`oi`), château (`au`), lapin (`in`), chat (`ch`) | **LE chantier** (« o-n ») |
| **P4** | 2 complexes/mot + CCV + lettres muettes finales | bouchon, train, prout 😄, piano, grue | à venir |
| **P5** | Mots outils fréquents (reconnaissance directe, globale assumée) | le, la, un, est, et, oui, non, des | à venir |
| **P6** | Phrases 3-6 mots | « Le bus est rouge. » « Papa lit un livre. » | à venir |
| **P7** | Mini-textes narrés (4-8 phrases, univers Max) | « Le loup monte dans le 185… » | à venir |

Règle de composition des mots : à chaque palier, **n'introduire qu'une nouveauté à la fois**
(le reste du mot est 100% connu). « tonton » n'arrive que quand `ton` seul est lu.

## 4. Les 19 idées de jeux (par famille pédagogique)

### A. Conscience phonologique (P0 — oral, aucune lettre affichée)

1. **La Chasse au Son** — « Tape ce qui commence par [mmm] ! » : 3 images+audio
   (moto, lune, bus). Le son est prononcé par un dino, jamais écrit. Niveau + :
   son de fin (« ça finit par [s] ? »). → QCM-tap, mécanique existante.
2. **Rime Express** — le bus livre les mots aux arrêts : déposer `chat` à l'arrêt
   qui rime (image de rat). 4 ans = l'âge d'or des rimes (et de l'humour
   pipi-caca-prout : réserve de rimes absurdes en easter egg, « les mouches qui se
   douchent dans des couches »).

### B. Lettres & cursive (P1 — dont révision lettres, demande parent 2026-07-19)

3. **Le Clavier de l'Alphabet** ⭐ *(révision pure, niveau entrée)* — un grand clavier
   des 26 lettres cursives dans l'ordre alphabétique ; la voix dit « trouve le a »
   (le SON puis, en niveau +, le NOM de la lettre). Tap = la lettre s'illumine et dit
   son son. Zéro enjeu, 100% révision — le « pour tout le monde » assumé.
4. **L'Escalier des Sons** ⭐ *(progression à tiroirs)* — trouve le `t` → bravo →
   maintenant trouve le `tr` → maintenant le `tro` → et voilà `train` ! Chaque marche
   rallonge la cible d'un phonème jusqu'au mot complet qui s'anime. Même principe :
   `b` → `bo` → `bou` → `bouche`. Pont naturel P1 → P2.
5. **La Lettre Rugueuse** — tracer la lettre cursive au doigt sur du « sable » visuel ;
   le dino prononce le SON pendant le tracé + fait le geste Borel-Maisonny.
   Ordre = familles de gestes Dumont (rondes → boucles → pointues). Zéro notation du
   tracé : c'est du multisensoriel, pas de la dictée. → Bac à sable, `maxStars:0`.
6. **Le Dino qui dit les Sons** — son-first pur : tap sur une lettre cursive = le son
   (« sss »), jamais « esse ». Niveau inverse : entendre [f] → trouver la lettre
   parmi 3 (distracteurs proches : f/s/ch).
7. **Cache-cache des 3 Graphies** — la même lettre en cursive / script / capitale se
   cachent dans le décor, les réunir. Sert le **pont cursive → panneaux RATP en
   capitales** (Max lit les numéros de bus partout, les lettres suivront).

### C. Syllabes & mots — le décodage (P2-P4, cœur du chantier)

8. **Le Bus des Syllabes** — les arrêts annoncent des syllabes ; assembler `pa`+`pa`
   → le passager « papa » (avatar) monte dans le bus, ravi. Le mot réussi = quelqu'un
   qu'on connaît. Évolution directe de mj-27.
9. **La Fabrique de Mots** — tapis roulant de tuiles-syllabes, drag vers la machine ;
   le mot validé se transforme en image/avatar animé (mot → sens, la magie Alphablocks).
10. **Les Tuiles Soudées** ⭐ *(le jeu du « o-n »)* — `on`, `ou`, `an`, `oi`, `in`, `ch`
    sont des **tuiles indissociables d'une autre couleur** : `ton`+`ton` = tonton.
    Une seule fois, le contraste est montré : `t-o-n-t-o-n` qui bégaie vs `ton-ton` qui
    roule — après, la tuile soudée ne se casse JAMAIS. Niveaux = ordre des complexes
    du §2 (ou → oi → an → on → au → in → ch).
11. **Les Confusions Pièges** — paires minimales en images : `an`/`on`, `ou`/`on`,
    `gn`/`ill`, inversions (`pa`/`ap`, `tu`/`ut`). « C'est lequel ? » avec 2 images.
    Travaille exactement les confusions documentées du CP.
12. **L'Alphabet Mobile** — Montessori pur : un mot est dit + montré (image), Max le
    **compose** en glissant les lettres cursives depuis la boîte. Construire avant
    d'écrire ; la vérification ré-épelle le mot lettre par lettre.

### D. Mot → sens (P2-P5)

13. **Mot → Image** (extension de mj-23) — lexique re-sourcé sur les passions de Max et
    paliers graphémiques du §3 dans la banque de mots.
14. **Le Loup Chuchote** 🐺 — moment fort réservé : le loup (sa passion qui fait
    frissonner) **chuchote un mot** ; retrouver son écrit parmi 3 (ou inverse : lire
    le mot pour trouver où se cache le loup). Faible fréquence d'apparition = effet maximal.
15. **Les Drapeaux Noms** — pays écrits en cursif + drapeaux à associer (Brésil en
    premier, évidemment). Lexique passion + première reconnaissance de mots longs
    « photographiés » (amorce P5).

### E. Phrases & lecture fonctionnelle (P5-P6)

16. **La Phrase qui Roule** — 3-6 mots mélangés à remettre en ordre sur les sièges du
    bus ; le bus ne démarre que quand la phrase est lue correctement (lue à voix haute
    mot à mot au tap). Évolution de mj-06.
17. **Le Chef de Gare** — lire une consigne et l'EXÉCUTER : « Pose 3 œufs rouges »,
    « Mets le dino bleu dans le bus ». La lecture fonctionnelle (lire POUR faire) =
    le Graal pédagogique, et ça recycle les assets des jeux de comptage.
18. **Le Panneau du 185** — vrais panneaux de bus : terminus, arrêts, direction.
    Lecture utilitaire en capitales, pont vers sa passion #1. Le plus « vrai monde »
    de tous.

### F. Histoires (P7)

19. **Lecture à Deux Voix** — mini-histoires de l'univers (dinos, bus, le loup) :
    papa lit une phrase, Max lit la suivante. Les phrases de Max n'utilisent que ses
    paliers acquis + mots outils. = la transition vers les livres réels, sans les remplacer.

## 5. Points techniques à trancher

### 5.1 Police cursive (décision parent 2026-07-19 — direction validée)

Le parent a tranché : les polices « handwriting » type Caveat ne sont **pas assez cursives**.
Références qu'il apprécie : **ABCursive** ([TpT, ~12 $, 4 ttf : regular + dashed + guidelines + dashed-guidelines — la version *dashed* est parfaite pour la Lettre Rugueuse](https://www.teacherspayteachers.com/Product/ABCursive-Cursive-Font-Montessori-5797988), conçue pour l'alphabet mobile Montessori) et **DN Manuscript** ([educationalfontware.com](https://www.educationalfontware.com/), gère les accents et lie bien les lettres).

**Intégré aux mockups (fait 2026-07-19)** : **Cursif** (Christophe Beaumale, cursive scolaire FR avec attaches réelles + `Cursifl` = variant avec lignes Seyès pour le tracé), gratuite (« mise à disposition », l'auteur conserve ses droits). Fichiers : `../design-shared/fonts/Cursif*.ttf`, `@font-face` dans `mockup.css`, classe `.cur` = `'Cursif','Caveat',cursive`.
⚠️ **Avant déploiement public** : vérifier la licence d'embarqué web (contacter l'auteur de Cursif, ou acheter ABCursive/DN Manuscript avec licence web/app — les licences TpT/desktop ne couvrent en général PAS l'embarqué dans un site ou une app).
- Fallback lisibilité : **Andika** (SIL, conçue pour apprentis lecteurs, Google Fonts) si la cursive pose problème sur certains jeux.
- À tester sur tablette : rendu des attaches à 28-40 px, bascule cursive ↔ capitales (jeux-ponts 7 et 18), et tracé sur `Cursifl` (lignes Seyès) pour la Lettre Rugueuse.

### 5.2 Audio

- Tout est lu à voix haute (règle gravée). Pour les SONS isolés ([sss], [mmm]) et les
  syllabes, le TTS est risqué → **MP3 ElevenLabs dédiés** (un fichier par son/syllabe,
  pipeline existant `AUDIO_ASSETS.md`), fallback TTS seulement pour les mots entiers.
- 1 son à la fois, SFX paddés 250 ms (contrat transverse).
- **Mockups** : `speechSynthesis` fr-FR via `MK.speak()` (démo uniquement).

### 5.3 Moteur

Viser un `site/js/mj-lecture.js` « 1 moteur, N peaux » autour des **tuiles** (lettre /
syllabe / graphème soudé / mot) : composition, tri, QCM, ordre — les jeux 8-12, 16
partagent 80% de code. Catalog : nouvelle catégorie « Lecture » dans `site/js/catalog.js`
(mj-23, mj-27, mj-06 y basculent).

## 6. Conventions projet (rappel, héritées du design-compte)

- Zones tactiles ≥ 80 px, feedback < 200 ms, zéro pénalité punitive, pas de timer visible.
- Erreur = l'environnement montre, jamais de correction frontale (« Ce mot dit "tonton" ! »
  en rejouant les tuiles, pas « Faux ! »).
- Jamais finir en pleine difficulté : clore sur un succès.
- Récompenses surprises, jamais promises.
- Références : Alphablocks (son avant graphème), Numberblocks (côté compte), Khan Kids.

---

_Créé 2026-07-19 suite à la demande parent (jeux lecture, cursive Montessori, sons complexes).
Ajout même jour : jeux 3-4 (révision lettres, demande parent). Sources web citées au §2._

---

## 🚨 RÈGLE PRODUIT (Papa Yann, 2026-07-19) — à appliquer avant mise au catalogue

- **Jamais « Max » dans ce que l enfant voit/entend** — utiliser le pseudo du compte (`localStorage maxplay_active_child`) ou une formule neutre.
- **Jamais le rapport personnel au Brésil** : `mockup-15-drapeaux.html` dit en TTS « Brésil ! Le pays de mamãe ! 💚 » → À RETIRER (le Brésil reste un pays parmi d autres, traitement neutre). Idem textes « Max lit les dorées » (index + mockup-19) → « l enfant » / pseudo.
