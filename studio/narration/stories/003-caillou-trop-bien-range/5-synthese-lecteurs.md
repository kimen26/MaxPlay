# Synthèse Lecteurs — STORY-003 « Le caillou trop bien rangé » (Panel v2, VAGUE 1, corpus 14 versions)

> Panel v2 hétérogène sur les **14 versions** de la vague 1 (2026-07-11).
> **12 appels = 4 groupes de profils × 3 modèles hétérogènes**, chacun a lu les 14 textes (notes d'intention retirées) et rendu 2 tranches d'âge (4 + 7 ans) + classement complet + retours texte libre.
> ⚠️ Cette synthèse mesure l'**acceptable robuste** du panel, **PAS le goût auteur**. L'instrument principal reste la **lecture annotée de Papa Yann (⏳ à venir, en file après STORY-002)**. **Ne PAS lancer l'étape 6 ici.**

---

## 0. Dispositif (Panel v2 hétérogène — DEC-PANEL-V2)

| Groupe | Modèle 1 | Modèle 2 | Modèle 3 |
|--------|----------|----------|----------|
| G1 — Garçon seul | Sonnet 4.6 (agent) | **Kimi K2.7-Code (CLI)** | Haiku 4.5 (agent) |
| G2 — Fille seule | Sonnet 4.6 (agent) | **Kimi K2.7-Code (CLI)** | Haiku 4.5 (agent) |
| G3 — Dyade papa | Sonnet 4.6 (agent) | **Kimi K2.7-Code (CLI)** | DeepSeek V4-Pro (CLI) |
| G4 — Dyade maman | Sonnet 4.6 (agent) | **Kimi K2.7-Code (CLI)** | DeepSeek V4-Pro (CLI) |

**Canal Kimi : ✅ présent sur les 4 groupes** (CLI `call-llm.mjs`, comme les writers). Aucune substitution. 12 fiches produites : `5-lecteurs-temoins/G{1-4}-<profil>-<modèle>.md`.

---

## ⚠️ 0bis. deepseek-reco = HORS CONCOURS (artefact de génération, PAS un jugement de fond)

**La version `deepseek-reco` jugée par le panel était CORROMPUE** — une génération dégénérée (charabia, mots tronqués, syntaxe cassée) livrée à l'étape 4 (deepseek-reco temp 1.5 : instabilité connue et signalée au kanban étape 4). Les 12 fiches la décrivent unanimement comme *« du charabia »*, *« un bug »*, *« le livre est cassé »*, *« à jeter »* et la classent 14/14 partout.

- **Son rang (14.00, dernier absolu unanime) est NUL et n'a aucune valeur de fond.** Il ne mesure que la corruption, pas la qualité d'écriture de DeepSeek.
- **Le fichier propre a été régénéré depuis** (v3, 414 mots, propre sur disque). Cette version propre **n'a jamais été jugée par le panel**.
- **Conséquence étape 6 :** `deepseek-reco` est **exclue du fond de sélection** sur la base de ce panel. Si on veut la mettre en jeu, il faut un **re-jugement ciblé de la version propre** (à décider — pas bloquant, elle n'était pas dans le haut du corpus attendu).

Toutes les moyennes ci-dessous **intègrent** deepseek-reco en dernier uniquement pour transparence ; **elle est écartée de toute lecture Directeur.**

---

## 1. TOP 5 CONSOLIDÉ (rang moyen des 12 fiches — plus bas = meilleur ; deepseek-reco exclue)

| # | Version | Rang moyen | Best / Worst | Top-3 | Fond-3 (≥11) | Lecture |
|---|---------|-----------|--------------|-------|--------------|---------|
| **1** | **claude-sonnet-def** | **4.42** | 1 / 12 | 5/12 | 1/12 | **Le champion de consensus.** Dialogues courts et attribués (tirets cadratins → « on entend les trois voix »), le *« Toc. Il ne bouge plus. »* qui scelle la pose, la **fourmi finale qui grimpe/redescend/s'en va** (fondu de clôture plébiscité). #1 chez 3 fiches, jamais dans le fond sauf une. Reproche isolé : *« un rien dubitatif »* (mot d'adulte). |
| **2** | **claude-sonnet-reco** | 4.50 | 1 / 9 | 4/12 | **0/12** | **Le seul jamais dans le fond.** L'image-pivot star du corpus : *« la main de Wex tourner la pierre, comme un petit soleil qui bascule »* — redemandée deux fois par des enfants, « LE moment important » repéré par les 7 ans. Pose limpide (*« Melki s'arrête de ranger. Dadou s'arrête de compter. »*). Reproches : *« plat contre plat »* jugé un peu abstrait/répété, la fourmi qui « fait trembler la ligne » inquiète 2 petites (peur qu'elle soit écrasée). |
| **3** | **kimi-reco-guide** | 5.25 | 1 / 11 | 4/12 | 1/12 | **La boucle narrative gagnante.** La **fleur blanche qui tremble au vent en ouverture ET fermeture** = cercle que les enfants reconnaissent (*« elle est revenue ! »*, « ça fait comme un cercle »). #1 chez maman-sonnet, très haut chez les dyades. Rythme apaisant, dialogues clairs. Deux réserves : Wex qui donne le caillou **à Dadou d'abord** intrigue (« pourquoi ? »), et la réplique *« Attention, tour ! »* fait croire à une petite que **la tour parle**. |
| **4** | **claude-opus-def** | 5.75 | 1 / 11 | 3/12 | 3/12 | **La belle prose de coucher, plombée par sa longueur.** Fluidité orale saluée (papa-deepseek #1 : *« l'enfant 4 ans n'a pas décroché une seconde, zéro "c'est qui ?" »*), fin soleil-qui-descend + fourmi très apaisante, *« face plate contre face plate »* montre que Dadou a **vraiment appris** (pas juste un caillou). Mais **ouverture descriptive trop longue** (sentier/herbe neuve) → les 4 ans bougent avant l'arrivée de Wex. Clivant : top ET fond. |
| **5** | **kimi-reco** | 5.92 | 1 / 12 | 4/12 | 2/12 | **Le poétique qui prend des risques.** L'image signature : *« plat comme une assiette posée sur le ciel »* (retenue et recitée par des enfants, « c'est beau »). Fin silencieuse réussie (*« Melki ne dit rien. Il souffla juste, du nez. »* → « le 4 ans comprend avec le corps, le 7 ans avec le cœur »), ombres mêlées à la fin. Risques qui coûtent : *« le talus s'ouvrait comme une poche »* pris au sens propre (« c'est sa poche ? »), comptage *« six, sept, huit… Non »* qui trouble. |

*Suivent, hors top 5 :* 6. **claude-haiku-def** (6.67 — fin olfactive *« le printemps souffle, l'air sent bon »* adorée au coucher, mais le mot fantôme **« vérifiantes »** — inexistant — accroche toutes les langues) · 7. **kimi-k26-instant** (6.75 — bien tenu mais **faute de frappe « Reviint » signalée par 4 fiches** qui casse net, + Dadou qui compte « Dix » sans base, + Wex qui « reprend le caillou » → « il » confus) · 8. **grok-def** (6.83 — *« les herbes chatouillent les chevilles »* accroche tous les petits, très doux au coucher, mais « un peu plat/simple », Wex trop muet) · 9. **claude-opus-reco** (7.00 — *« comme un petit pied »* fait tilt, mais **incohérence de comptage 5→8** relevée par les 7 ans + confusion avec l'autre opus + « je sais déjà la fin ») · 10. **kimi-k26-thinking** (8.00 — chute *« Personne n'avait gagné »* qui divise fort : sublime pour les grandes/mamans-sonnet, mais **inquiète les 4 ans** — « ils sont fâchés ? » — + métaphores dures « centime de poche », « le talus tremblait ») · 11. grok-reco (9.75 — redondant avec grok-def, compte-jusqu'à-dix excitant au coucher) · 12. claude-haiku-reco (10.08 — « exhale » trop littéraire, fourmi intrusive) · 12ex. deepseek-def (10.08 — clair mais sec, « alignement » précieux, fin abrupte).

> **~~14. deepseek-reco (14.00, dernier unanime) — HORS CONCOURS, corrompue, cf. §0bis. Rang NUL.~~**

---

## 2. PATTERNS TRANSVERSES (convergence inter-modèles = signal robuste)

**Ce qui gagne** (cité positif par ≥6 fiches, tous modèles) :
- **LE geste-pivot de Wex qui retourne le caillou lentement dans sa paume** → *le* point d'ancrage de tout le corpus, unanime dans les « ce que je retiens ». Les 4 ans le **miment** (tournent la main), les 7 ans le **commentent**. Plus il est **silencieux et court** (« L'autre face », un pouce qui montre), plus il frappe. *« Le silence de Wex intrigue l'enfant bien plus que des paroles. »*
- **Le petit bruit sec qui scelle la pose** (*Toc / Clac / Floc*) → reproduit avec la bouche, « fait exister le caillou », marqueur sonore de résolution.
- **La double réussite non-compétitive à la fin** : la ligne de Melki ET la tour de Dadou côte à côte, personne ne gagne, personne ne perd → *« ma fille s'est blottie contre moi »*. C'est la patte D+C qui prend.
- **La clôture douce paysagère** (fourmi qui s'en va, printemps qui souffle, fleur qui tremble) → « on referme le livre dessus ».

**Ce qui perd** (cité négatif par ≥5 fiches) :
1. **Les mots d'adulte / littéraires qui font buter la lecture à voix haute** — tueur n°1 confirmé : **« vérifiantes »** (mot inexistant, haiku-def), **« exhale »** (haiku-reco), **« dubitatif »** (sonnet-def), **« alignement »** (deepseek-def), **« centime de poche »** (thinking). Le parent ralentit ou reformule, l'enfant fait « beurk » et décroche.
2. **Les incohérences de comptage** : Dadou qui saute (5→8, ou « Neuf/Dix » sans base) → **les 7 ans qui comptent relèvent et décrochent**. Signalé sur opus-reco, sonnet-def, grok-reco, kimi-instant. La logique numérique doit tenir (cible qui compte jusqu'aux milliers).
3. **La faute de frappe « Reviint »** (kimi-k26-instant) → 4 fiches la relèvent, casse net la lecture.
4. **L'ouverture trop descriptive** (sentier/herbe/talus) avant l'arrivée des garçons et de Wex → les 4 ans bougent. Frappe surtout les deux **opus** et **kimi-k26-thinking**.
5. **Les métaphores prises au sens propre par les 4 ans** : « le talus s'ouvrait comme une poche » (« c'est sa poche ? »), « le talus tremblait » (tremblement de terre ?), « Attention, tour ! » (la tour parle ?), fourmi qui « fait trembler la ligne » (peur qu'elle soit écrasée). La cible primaire n'a pas encore l'abstraction.
6. **Le mot « talus » non explicité** → question récurrente « c'est quoi un talus ? » (à assumer ou ancrer).

**Divergence de groupes notable — la chute de kimi-k26-thinking (« Personne n'avait gagné ») :**
- **Grandes (7 ans) + maman-sonnet** : sublime, « ça fait réfléchir », « ma préférée pour la clôture ».
- **Petites (4 ans) + maman-deepseek/kimi** : **inquiète** — *« ils sont fâchés ? »*, le « de biais, le menton rentré » lit une **tension non résolue** au coucher. « Pas l'effet recherché. »
→ **La cible primaire (4 ans, coucher) tranche : la formulation actuelle rate l'apaisement.** L'idée (pas de gagnant) est bonne — c'est le *« menton rentré »* + le mot « gagné » qui crispent.

**Divergence de contexte — comptine finale montante :** compter « Huit ! Neuf ! Dix ! » doigt pointé (kimi-instant, grok-reco) **excite** au coucher (*« elle s'est redressée dans le lit »*) alors que ça plaît en lecture-jeu. Contexte coucher = descendre, pas monter.

---

## 3. CITATIONS CLÉS (mots d'enfant / de parent)

- **claude-sonnet-reco** (papa-kimi) : *« Melki s'arrête de ranger. Dadou s'arrête de compter. Tous les deux regardent la main de Wex tourner la pierre, comme un petit soleil qui bascule. Le silence autour du geste est plus fort que n'importe quelle explication. »*
- **claude-sonnet-def** (papa-sonnet) : *« Le passage "L'autre face. Elle est plate. Lisse." fait une pause naturelle, presque un climax silencieux — j'ai ralenti tout seul. »*
- **kimi-reco** (papa-kimi) : *« "Melki ne dit rien. Il souffla juste, du nez." Une réussite silencieuse que le 4 ans comprend avec le corps et le 7 ans avec le cœur. »*
- **claude-opus-def** (papa-deepseek, #1) : *« L'enfant a suivi du début à la fin sans une seule demande "c'est qui ?". Le mot "talus" a été répété sans gêne. »*
- **kimi-reco-guide** (maman-sonnet) : *« La fleur blanche revient à la fin — ça aide la petite à sentir que "c'est fini", ça referme l'histoire comme un cercle. »*
- **Contre-signal, kimi-k26-thinking** (maman-deepseek) : *« Ma fille de 4 ans a senti le malaise et a demandé "ils sont fâchés ?". Pas l'effet recherché pour un coucher. »*
- **Contre-signal, deepseek-reco** (papa-sonnet) : *« illisible à voix haute, texte cassé, l'enfant a cru que j'avais fait exprès une blague. »* (artefact, cf. §0bis)

---

## 4. LECTURE DIRECTEUR (préparation étape 6 — NON tranchée ici)

- **Base pressentie côté panel : `claude-sonnet-def` ou `claude-sonnet-reco`** (ex-æquo en tête, 4.42 / 4.50). Le premier gagne par la **fluidité orale + dialogues attribués + fourmi-fondu** (zéro faute, jamais dans le fond) ; le second porte **l'image-pivot la plus mémorable du corpus** (« petit soleil qui bascule ») et n'est **jamais** dans le fond (0/12). Un rewrite pourrait **greffer l'image-soleil de reco sur la charpente sobre de def**.
- **Réservoir de greffes** (candidats étape 6, sous réserve du goût auteur) :
  - `claude-sonnet-reco` → **« comme un petit soleil qui bascule »** (l'image du geste-pivot) + la pose *« Melki s'arrête de ranger. Dadou s'arrête de compter. »*
  - `kimi-reco-guide` → **la boucle fleur blanche ouverture/fermeture** (sentiment de clôture « c'est fini » chez les petits) — SANS l'ambiguïté « Attention, tour ! » ni l'ordre Wex→Dadou déroutant.
  - `claude-sonnet-def` → la **fourmi-fondu finale** (grimpe/redescend/s'en va) + le *« Toc. Il ne bouge plus. »*.
  - `kimi-reco` → **« plat comme une assiette posée sur le ciel »** + la fin silencieuse *« il souffla juste, du nez »* (à peser contre le goût auteur).
  - `claude-opus-def` → le *« face plate contre face plate »* qui prouve l'**apprentissage transféré** de Dadou.
  - Idée de fond de `kimi-k26-thinking` : la **non-compétition explicite** — à récupérer **sans** le « menton rentré » (tension) ni le mot « gagné » qui inquiètent les 4 ans.
- **Vigilance goût-auteur / rewrite** : (a) **garder le geste-pivot Wex court et silencieux** (jamais sur-expliqué) ; (b) **zéro mot d'adulte** — bannir vérifiantes/exhale/dubitatif/alignement + relire chaque métaphore au 1er degré d'un 4 ans ; (c) **cohérence de comptage stricte** (les 7 ans vérifient) ; (d) **ouverture courte** avant les garçons ; (e) **fin descendante** (paysage apaisé, pas comptine montante ni tension) ; (f) trancher le mot « talus » (ancrer ou remplacer).

> ⚠️ **Rappel goût auteur (mémoire-papa-yann)** : l'exigence de Papa Yann est **au-dessus du panel** (sur STORY-002, les champions du panel ont été rejetés). Ce classement = l'**acceptable robuste**, pas l'**excellent selon l'auteur**. La **lecture annotée de Papa Yann (⏳ file d'attente après 002)** reste l'instrument principal ; l'arbitrage étape 6 pèsera ce top contre le goût, à égalité avec la patte B+D+C. **Ne pas lancer l'étape 6 ici.**

---

_Panel v2 hétérogène — 12 fiches, 4 groupes × 3 modèles, Kimi inclus sur les 4 (canal CLI). Corpus 14 versions. `deepseek-reco` corrompue → hors concours (§0bis), version propre régénérée non jugée. En attente : lecture annotée Papa Yann._
