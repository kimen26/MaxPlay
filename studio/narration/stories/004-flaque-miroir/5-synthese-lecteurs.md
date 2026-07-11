# Synthèse Lecteurs — STORY-004 « La flaque-miroir » (Panel v2, VAGUE 1, corpus 14 versions)

> **Panel v2 hétérogène** — 12 appels = 4 groupes de profils × 3 modèles. Chaque appel a lu **les 14 versions**
> et rendu 2 tranches d'âge (4 + 7) + un classement complet + retours texte libre.
> Généré 2026-07-11. NON tranché (étape 6 pas lancée).

---

## 0. Dispositif (Panel v2 hétérogène — DEC-PANEL-V2)

| Groupe | Modèle 1 | Modèle 2 | Modèle 3 |
|--------|----------|----------|----------|
| G1 — Garçon seul | Sonnet 4.6 (agent) | **Kimi K2.7 (CLI)** | Haiku 4.5 (agent) |
| G2 — Fille seule | Sonnet 4.6 (agent) | **Kimi K2.7 (CLI)** | Haiku 4.5 (agent) |
| G3 — Dyade papa | Sonnet 4.6 (agent) | **Kimi K2.7 (CLI)** | DeepSeek (CLI) |
| G4 — Dyade maman | Sonnet 4.6 (agent) | **Kimi K2.7 (CLI)** | DeepSeek (CLI) |

**Statut canal Kimi : ✅ présent sur les 4 groupes** (via `call-llm.mjs`, timeout 540 s, comme prévu par le fallback obligatoire — G3-kimi en retry séquentiel post-429). 12 fiches produites dans `5-lecteurs-temoins/`.

> ⚠️ **[deepseek-reco] jugée CORROMPUE par TOUT le panel** (texte dégradé mots-cassés dès la 2e réplique de Wex : « Nuag Lulle sous bar », « Une extrès être là merise »). **Régénérée depuis.** Classée dernière (14/14) par les 12 fiches, **rang NUL, EXCLUE du fond**. Le classement ci-dessous porte sur les **13 versions lisibles**.

---

## 1. TOP 5 CONSOLIDÉ (sur 13, rang moyen des 12 fiches — plus bas = meilleur)

| # | Version | Rang moyen | Best / Pire | Top-3 | Fond-3 | Lecture |
|---|---------|-----------|-------------|-------|--------|---------|
| **1** | **claude-sonnet-reco** | **3.6** | 1 / 7 | 6/12 | **0/12** | **Le plus régulier du corpus — jamais dans le fond, meilleur consensus inter-profils.** Trois trouvailles plébiscitées : Wex qui **arrive essoufflé** (« c'est vivant »), la réplique **« Il était juste parti se ranger »** (répétée seule par 3 enfants — « comme mes chaussures ! »), et la **goutte finale qui pend et attend** (« comme si elle avait compris », moment de silence partagé). Verbes de parole clairs → lecture à voix haute la plus fluide (G3-sonnet, G3-papa-deepseek). Reproches légers : quelques phrases longues, attribution du « Non, pour lui, pour personne » floue (G3-kimi), humour un cran trop réveillant au coucher (G4-maman-deepseek). |
| **2** | **kimi-k26-instant** | **3.8** | 1 / 12 | **7/12** | 1/12 | **Le plus aimé en pic (7 top-3, 4 fois #1) mais polarisé sur le coucher.** Le seul **gag partagé à trois voix** (« Elle est plate — Lisse — Comme si on pouvait marcher dessus — On tomberait. Plouf. ») fait rire les 4 ET 7 ans, allège avant la tension. Ouverture par **Wex qui débarque** appréciée. **DEUX réserves** : (a) jugé **« trop excitant avant dodo »** par les 2 dyades-maman (« les enfants rigolent, se réveillent ») — clivage seul/dyade ; (b) l'incise **« Le comment et le beau, côte à côte »** sort du récit et accroche la langue (3 fiches). |
| **3** | **claude-opus-def** | **5.3** | 1 / 13 | 5/12 | 2/12 | **La plus belle image + la meilleure fin cyclique** — « Ploc » isolé qui fait un vrai silence à l'oral, ciel « comme au fond d'un bol », et surtout la **goutte suspendue finale** (« elle va tomber après ? » → histoire qui reste ouverte, plébiscité par les 7 ans et les 2 mamans). Plombée par le **passé simple** (« arriva », « resta » → « livre de grand », G3-papa-deepseek l'a mise 13e pour ça) et **trop de description après la goutte** (perte d'attention milieu/fin). |
| **4** | **claude-haiku-def** | **5.4** | 1 / 12 | 4/12 | 2/12 | **Le champion du coucher** — #1 chez les 2 dyades-maman (« celui qu'elle a redemandé en boucle au lit », « déjà presque endormie »). Minimaliste, berçant, la **triple répétition finale des trois doigts** est très mimable (« Trois doigts ! Comme nous trois ! »). Faiblesses : **phrases nominales sans verbe** (« Ronds qui s'écartent, s'écartent. ») qui hachent la lecture, le mot **« suspendu »** à expliquer, l'accroc **« un drôle de petit drôle de bruit »** (répétition), « le ciel dedans la flaque » (syntaxe cabossée). |
| **5** | **kimi-reco-guide** | **5.4** | 1 / 13 | 6/12 | 1/12 | **Le plus tendre / accessible 4 ans** — #1 chez G4-maman-sonnet, top-3 chez 6 fiches. L'ouverture **« plate comme un doudou qu'on aurait oublié sur le sol »** fait chercher son doudou à 2 petites (geste-coucher parfait), Wex **couché sur le ventre menton dans les mains** est mimable, le reflet **« Une image. Elle est dessous »** explique sans dire « reflet ». Réserves : **jugé trop explicatif** (« on montre pas, on dit » — G1-garcon-haiku, 7 ans « trop expliquée »), l'ouverture-métaphore **décroche avant la goutte** chez 2 dyades, pronom flou « Lui, on le casse pas » (ciel/flaque/doigt ?). |

*Suivent, hors top 5 :* 6. **claude-opus-reco** (6.5 — « Plic » adoré, « respirer doucement pour pas faire de vagues » magnifique à 7 ans, mais « elle se laissait glisser dedans » sème un doute « Madie tombe vraiment ? ») · 7. **kimi-reco** (7.3 — dialogue-énigme « le vrai ciel ou dans l'eau ? / Les deux / En même temps » qui fait réfléchir les grands, fin subtile goutte-sur-feuille, mais **trop conceptuel** pour les 4 ans « Le ciel cache le fond, c'est quoi ? ») · 8. **deepseek-def** (7.75 — **très polarisé : 4 top-3 MAIS 5 fond-3** ; le plus court/simple, « Toc », « galette », zéro accroc de lecture, mais « les enfants parlent comme des grands », « manque de magie/poésie », incohérence orientation du ciel) · 9. **claude-sonnet-def** (8.1 — « Woah » répété avec plaisir, « il tient à l'envers », mais personnages moins distincts, « Woah » casse le ton FR pour 2 filles-7ans) · 10. **grok-def** (8.3 — carré, clair, mimable « Montre, dit-il », mais **plat, manque de chair sensorielle** « on voit pas l'eau ») · 11. **claude-haiku-reco** (9.2 — sensoriel « l'air sent l'herbe mouillée », mais **« concentriques » tue le rythme** partout, « la pierre qui respire » incomprise, « le beau qui se casse » trop adulte) · 12. **kimi-k26-thinking** (9.75 — **8 fond-3** : belle écriture 7 ans « pieds nus, bruit de succion », mais **« un trou dans le chemin qui mène au ciel » perd les 4 ans partout**, « on tomberait dans le ciel » conceptuel, répétitions qui traînent, « mains en porte-voix » trop bruyant au coucher) · 13. **grok-reco** (10.6 — **8 fond-3** : trop compressé, « on dirait un résumé », « fini trop vite », le retour du ciel n'a pas de temps d'arrêt).

---

## 2. PATTERNS TRANSVERSES (convergence inter-modèles = signal robuste)

### PATTERN 1 — Le risque LENTEUR est réel et discriminant : qui a tenu l'enchaînement ?

C'était le garde-fou n°1 du brief. Verdict du panel : **la lenteur tue par le milieu (avant la goutte)**, jamais par la fin. Deux profils de faute distincts :

- **Trop de décor / d'animaux avant la goutte** → « le grand s'impatiente », « l'histoire doit commencer avec Lulu déjà penché, pas avec le sentier qui fume » (G4-maman-deepseek). Coupables cités ≥ 4 fiches : `claude-haiku-reco` (« long avant que ça bouge »), `kimi-k26-thinking` (descriptions empilées + répétitions), `claude-opus-def` (surplus **après** la goutte).
- **Répétition qui tourne en rond** → `kimi-k26-thinking` (« On tomberait… On tomberait… » ralentit), `claude-haiku-def` (« un drôle de petit drôle de bruit »), `kimi-reco` (dialogue-énigme qui traîne pour les petits).

**Ont TENU l'enchaînement sans jamais lasser (les 2 seuls du corpus jamais taxés de lenteur) :**
- **`claude-sonnet-reco`** — « rythme fluide, jamais haché », « capté du début à la fin » (G3-papa-deepseek). L'entrée par Wex-essoufflé remplace le décor par de l'action.
- **`kimi-k26-instant`** — le gag « plate/lisse/marcher dessus » sert de moteur ; « jamais confus » même en étant « presque trop bavard ». Le reproche n'est jamais la lenteur mais l'inverse (**trop d'énergie** au coucher).

À l'opposé, `grok-reco` prouve que **la vitesse pure ne sauve pas** : « trop pressé », « on ne sent pas la magie », « pas de temps d'arrêt pour le retour du ciel » → 8 fond-3. **La bonne longueur n'est pas la plus courte, c'est celle qui laisse respirer le retour du ciel sans planter de décor.**

### PATTERN 2 — Le CONCRET gagne, l'ABSTRAIT perd (confirmation du tueur n°1)

- **Ce qui gagne** (cité positif ≥ 6 fiches) : les **comparaisons du quotidien de l'enfant** — « parti se ranger comme mes chaussures », « plate comme un doudou », « ronde comme une assiette », « comme quand je mets le doigt dans mon bain ». L'enfant **relie à son monde et mime**.
- **Ce qui perd** (cité négatif ≥ 5 fiches) : **« tomber dans le ciel » / « un trou dans le chemin qui mène au ciel »** (kimi-k26-thinking) — « Mais on tombe dans l'eau, pas dans le ciel ! » ; **« la pierre qui respire »**, **« le beau qui se casse »**, **« concentriques »**, **« se laissait glisser dedans »** (doute sécurité : « elle tombe vraiment ? »). La flaque doit **rester une flaque** ; le merveilleux passe par le **geste concret**, pas par la métaphore cosmique.

### PATTERN 3 — Le GESTE des trois doigts suspendus = le cœur universel, muet et mimable

**Cité comme LE moment retenu par les 12 fiches sans exception.** Les enfants (4 et 7 ans) **tendent spontanément le doigt vers la page** dans toutes les versions qui le décrivent bien. « Ce geste muet qui dit *on ne casse pas* est plus fort que n'importe quelle explication » (G4-maman-kimi). Corollaire fort : **le respect se montre par le corps, il ne se dit pas** — d'où le reproche récurrent à `kimi-reco-guide` (« on explique trop ») et à `claude-haiku-reco` (« le narrateur dit *ils comprennent* au lieu de le montrer »).

**Divergence de profil notable — SEUL vs DYADE-COUCHER** : `kimi-k26-instant` est **#1 en lecture solo** (garçon-sonnet, papa-deepseek, papa-sonnet) mais **glisse à 12e chez maman-sonnet** (« trop excitant, risque de réveiller »). Inversement `claude-haiku-def` est **#1 des deux mamans-coucher** mais 11-12e chez les garçons-seuls (« long avant que ça bouge »). **La cible primaire pèse le registre visé** : si l'usage-clé est le rituel du soir, l'apaisement prime ; si c'est la lecture-jeu, l'énergie prime. `claude-sonnet-reco` est le seul à **satisfaire les deux** (rang moyen le plus bas).

---

## 3. CITATIONS CLÉS (mots d'enfant / de parent)

- **claude-sonnet-reco** (G4-maman-sonnet) : *« Il était juste parti se ranger » — une phrase que ma fille a répétée toute seule, rassurante et simple, l'idée que les choses reviennent à leur place.*
- **claude-sonnet-reco** (G3-papa-deepseek) : *la goutte qui pend et ne tombe pas → « un vrai moment de poésie silencieuse… il n'a pas parlé, il a juste regardé le livre, puis le plafond, en retenant son souffle. Ce genre de silence est la réaction la plus forte que puisse avoir un enfant. »*
- **kimi-k26-instant** (G3-papa-deepseek) : *« On tomberait. Plouf. » → mon fils a décroché du livre pour jouer la scène… il a arrêté d'écouter pour répondre. C'est la meilleure preuve d'accroche.* — MAIS (G4-maman-sonnet) *« trop excitant avant dodo, risque de réveiller au lieu d'apaiser. »* Le clivage seul/coucher en une image.
- **claude-haiku-def** (G4-maman-deepseek) : *« celui qu'elle a redemandé en boucle au lit… le rythme des trois souffles retenus l'a apaisée. Fin parfaite — elle était déjà presque endormie. »*
- **kimi-reco-guide** (G4-maman-kimi) : *« C'est une image, elle est dessous — c'est bien expliqué sans dire 'reflet'. »* — MAIS (G1-garcon-haiku) *« Lulu qui explique 'C'est juste le ciel posé là' au lieu de juste regarder. Je préfère quand on montre. »*
- **Contre-goût abstrait, kimi-k26-thinking** (G3-papa-deepseek) : *« on tomberait dans le ciel… on tomberait tout doux » → mon fils : « Mais on tombe dans l'eau, pas dans le ciel ! » Le concept ne fonctionne pas à cet âge.*

---

## 4. DIVERGENCES (là où les profils ne s'accordent pas)

1. **`kimi-k26-instant` — énergie vs coucher** : #1 des lectures solo/jour, ~12e des dyades-maman/soir. Le texte est excellent ; la question est l'**usage**.
2. **`deepseek-def` — extrêmement polarisé** : #2-3 chez les Kimi-lecteurs et papa-deepseek (« ultra-court, parfait pour un 4 ans, zéro accroc »), mais fond-3 chez 5 fiches (« parlent comme des grands », « manque de magie », incohérence du ciel à l'envers). Valeur sûre de **clarté** mais sans le supplément d'âme.
3. **Âge 4 vs 7 sur l'abstrait** : `kimi-k26-thinking` et `kimi-reco` (dialogue-énigme) sont **appréciés des 7 ans** (« comme une énigme, j'aime réfléchir avec eux ») et **perdent les 4 ans**. La cible primaire (4 ans) tranche : ça décroche.
4. **`claude-opus-def` — fin cyclique adorée / passé simple qui plombe** : la goutte suspendue est le plus beau final du lot pour les mamans et les 7 ans, mais le passé simple la fait chuter chez papa-deepseek (13e). Défaut **corrigeable** (présent) sans toucher à la force de la fin.

---

## 5. LECTURE DIRECTEUR (pour préparer l'étape 6 — NON tranchée ici)

- **Base pressentie : `claude-sonnet-reco`.** Le seul jamais dans le fond, meilleur rang moyen (3.6), et **le seul à tenir les deux usages** (jour-jeu ET coucher). Il neutralise les deux tueurs du panel : **lenteur** (entrée par Wex-action, pas par le décor) et **abstrait** (« parti se ranger » = concret du quotidien). Verbes de parole clairs = meilleure lecture à voix haute. À confronter au **goût auteur** en étape 6 (mémoire-papa-yann) — vigilance sur l'humour « se ranger » que 2 fiches trouvent un cran trop léger.
- **Challenger sérieux : `kimi-k26-instant`** si l'usage-cible penche jour/lecture-jeu — mais il faudra **désamorcer l'excitation finale** et **couper l'incise « le comment et le beau »**.
- **Réservoir de greffes** :
  - `claude-opus-def` : la **goutte suspendue finale** (« elle va tomber après ? ») + « comme au fond d'un bol » — la plus belle fin cyclique. **À passer au présent** avant greffe.
  - `claude-haiku-def` : la **triple cadence des trois doigts** (« Trois doigts ! Comme nous trois ! ») pour l'apaisement du coucher — SANS les phrases nominales hachées ni « un drôle de petit drôle de bruit ».
  - `kimi-reco-guide` : l'image d'ouverture **« plate comme un doudou »** + le reflet **« Une image. Elle est dessous »** (explique sans dire « reflet ») — SANS le sur-explicatif.
  - `kimi-k26-instant` : le **gag partagé « plate / lisse / marcher dessus »** comme moteur anti-lenteur (à doser pour ne pas réveiller).
- **Vigilance rewrite** : (a) **commencer avec Lulu déjà penché**, décor en 1-2 touches max ; (b) toute image = **concret mimable**, bannir « tomber dans le ciel », « la pierre qui respire », « concentriques », « se laissait glisser » ; (c) **montrer le respect par le geste**, ne pas le dire ; (d) **laisser respirer le retour du ciel** (ni précipité comme grok-reco, ni sur-décrit comme opus-def) ; (e) attribuer chaque réplique (le tueur « c'est qui qui parle ? » revient sur les scènes à trois voix serrées).

> ⚠️ **Rappel du goût auteur (mémoire-papa-yann)** : l'exigence de l'auteur est **au-dessus du panel**. Le classement ci-dessus mesure l'**acceptable robuste**, pas nécessairement l'**excellent selon Papa Yann**. L'arbitrage étape 6 pèsera ce top contre le goût, **à égalité avec la patte**. **Ne pas lancer l'étape 6 ici.**

---

_Panel v2 hétérogène — 12 fiches, 4 groupes × 3 modèles, Kimi inclus sur les 4 (canal CLI). Corpus 14 versions, 13 évaluées ([deepseek-reco] corrompue → NUL, régénérée). Kanban étape 5 : panel v2 ✅ 12/12 · lecture annotée ⏳ file d'attente._
