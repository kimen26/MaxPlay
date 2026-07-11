# Synthèse Lecteurs — STORY-005 « Le goûter d'un seul » (Panel v2, VAGUE 1, corpus 14 versions)

> Panel v2 hétérogène sur les 14 versions writers. 12 fiches produites (`5-lecteurs-temoins/G{1-4}-<profil>-<modèle>.md`), généré 2026-07-11.
> ⚠️ **[deepseek-reco] jugée CORROMPUE par le panel** (gibberish à partir du premier tiers : « fosse bords reconnex », « plieuse nouvelle », « Rame ranimer plume comme embryon floss », « pommu »). Les 12 fiches l'ont détectée et signalée spontanément. **Rang NUL — exclue du fond du concours.** Une version régénérée la remplace (hors ce panel). Elle figure 14e ci-dessous uniquement comme marqueur, pas comme jugement de contenu.
> **Étape 6 NON lancée ici** (consigne). Kanban : étape 5 panel v2 ✅ 12/12 · lecture annotée ⏳ file d'attente.

---

## 0. Dispositif (Panel v2 hétérogène — DEC-PANEL-V2)

**12 appels = 4 groupes de profils × 3 modèles hétérogènes.** Chaque appel a lu **les 14 versions** et rendu 2 tranches d'âge (4 + 7 ans) + un classement complet + retours texte libre (pas de note sur 10, pas de jargon).

| Groupe | Modèle 1 | Modèle 2 | Modèle 3 |
|--------|----------|----------|----------|
| 1 — Garçon seul | Haiku 4.5 (agent) | **Kimi K2.7-Code** (CLI) | Sonnet 4.6 (agent) |
| 2 — Fille seule | Haiku 4.5 (agent) | **Kimi K2.7-Code** (CLI) | Sonnet 4.6 (agent) |
| 3 — Dyade papa | DeepSeek V4-Pro (CLI) | **Kimi K2.7-Code** (CLI) | Sonnet 4.6 (agent) |
| 4 — Dyade maman | DeepSeek V4-Pro (CLI) | **Kimi K2.7-Code** (CLI) | Sonnet 4.6 (agent) |

**Statut canal Kimi : ✅ présent sur les 4 groupes** (canal `infra/mcp/call-llm.mjs`, retry séquentiel post-429). Aucune substitution — 3 modèles réellement hétérogènes par groupe.

---

## 1. TOP 5 CONSOLIDÉ (sur 14, rang moyen des 12 fiches — plus bas = meilleur)

| # | Version | Rang moyen | Best / Pire | Top-3 | Fond-3 | Lecture |
|---|---------|-----------|-------------|-------|--------|---------|
| **1** | **claude-sonnet-def** | **3.58** | 1 / 13 | **8/12** | 1/12 | **Le champion du corpus.** Dialogue enfantin vif et bien attribué (« Bah on coupe pile au milieu ! », « C'est bon ? — Trop bon », la bouche pleine), image plébiscitée des **« deux demi-lunes qui se font face »** (marques de dents), *crounch* qui fait mimer. Meilleure fluidité orale citée par 4 dyades. **Réserve unique mais nette : les notes d'intention d'auteur collées APRÈS le récit** (« ce que j'ai voulu faire ressentir ») — perçues comme « un cahier de maîtresse », « un texte après le texte », casse le coucher. C'est un artefact de fichier writer, pas du texte : **à purger, pas à réécrire.** |
| **2** | **claude-sonnet-reco** | 4.42 | 1 / 10 | 6/12 | **0/12** | **Le plus régulier — jamais dans le fond.** Le pivot silencieux (Mimi pose la pêche « au milieu, sans un mot ») est le plus limpide du lot ; rythme ping-pong « un croc chacun » très accrocheur ; Lulu qui « ne dit pas que c'est interdit, il dit juste que ça marche pas » (jugé « plus gentil » par les 7 ans). Reproche mineur : un peu moins de moments-image marquants que la version def. |
| **3** | **kimi-k26-instant** | 4.83 | 1 / 10 | 4/12 | **0/12** | **La trouvaille visuelle du corpus.** « La pomme tourne très lentement, toute seule, entre leurs deux bouches » = image la plus **mimable et drôle**, plébiscitée (« comme une toupie », « elle est libre »). Fourmi bien intégrée, fin très douce, jamais dans le fond. Réserve : l'image « toute seule » **sort 2 enfants de l'histoire** (« mais elle tient pas avec les mains ? ») — magie littérale mal comprise par certains 4 ans. |
| **4** | **claude-opus-reco** | 5.0 | 1 / 12 | 4/12 | 1/12 | Clair, juteux, Wex discret et juste (« il n'a pas de pêche, et il n'en cherche pas »), *crounch* net. Adoré par les dyades maman (« apaisement parfait »). Deux accrocs : le référent flou de « il sourit d'un coup » (Lulu ou Wex ?) et une fin en **« Encore un ? »** qui relance l'attention au lieu d'apaiser (voir pattern 3). |
| **5** | **claude-opus-def** | 6.0 | 2 / 10 | 3/12 | **0/12** | Le plus sensoriel (jus qui coule, *crounch*, essai-erreur de la coupe à l'ongle très suivi par les 4 ans). Jamais dans le fond. Deux freins : la formule **« un petit trou frais pour les fesses »** accroche la langue et sort du ton doux (citée 2×), et la **fin ouverte « Encore un ? »** qui empêche l'endormissement (« Ça continue ? », maman doit ajouter une phrase de clôture). |

*Suivent, hors top 5 :* 6. **kimi-k26-thinking** (6.0 — même moyenne qu'opus-def, jamais dans le fond ; belle chute « Elle aussi » murmurée et vraie tentative de coupe feuille/pierre, mais **passage outils qui alourdit le milieu** + mot « trimbala » qui accroche + notes d'intention en fin comme sonnet-def) · 7. **kimi-reco-guide** (7.0 — le plus **polarisant** : #1 chez 3 dyades pour son ping-pong interactif « qui commence ? / toi — non toi » à effet miroir, mais **trop bavard** avant de manger pour les enfants seuls, #12 chez g2-fille-kimi) · 8. deepseek-def (7.58 — image « deux petits sourires » adorée mais **3 fond-3**, fin qui personnifie la pêche « elle attend ») · 9. grok-def (8.33) · 10. kimi-reco (9.08 — négociation « trouver le milieu » répétée 3×, décrochage 4 ans) · 11. grok-reco (9.25 — **tué par le couteau fantôme**, voir pattern 2) · 12. claude-haiku-def (9.42) · 13. claude-haiku-reco (10.5 — abstractions « il n'existe pas de ligne », empilement de négations) · 14. **deepseek-reco (CORROMPUE — hors concours).**

---

## 2. PATTERNS TRANSVERSES (convergence inter-modèles = signal robuste)

### ⚠️ Pattern surveillé : « la morale dite » / des versions qui philosophent ?
**Réponse du panel : le risque existe et il est puni — mais aucune des versions du top 5 n'y tombe.** La leçon-partage n'est jamais explicitée dans les têtes de classement ; elle passe par **le geste** (poser le fruit au milieu) et **l'écho fourmi** (« elle a trouvé son goûter, elle aussi »), suggérés jamais énoncés. Ce que le panel sanctionne comme « morale/philosophie » se loge à **deux endroits précis** :
- **Les notes d'intention d'auteur collées après le récit** (sonnet-def, kimi-k26-thinking) — « un texte après le texte », « un cahier de maîtresse », « la petite a cru que l'histoire n'était pas finie ». **Ce n'est pas de la philosophie dans l'histoire : c'est du paratexte writer à purger.** Ne pas confondre — le récit lui-même reste sobre.
- **Les fins « sagesse »** : « les trois enfants restèrent un moment sans parler » / « ils étaient bien » (grok-reco) → « ça referme comme un livre de sagesse », « ils dorment ? ». La leçon énoncée refroidit.

**Verdict :** pas d'histoire qui « philosophe » dans le top. La vigilance porte sur (a) purger le paratexte, (b) éviter la phrase-bilan finale.

### Pattern 1 — La confusion « qui fait quoi / c'est quoi ça » = tueur n°1
Cité par ≥ 6 fiches, tous modèles. Ce qui décroche les 4 ans :
- **Le couteau fantôme de grok-reco** : « Elle posa le couteau dans l'herbe » — objet jamais introduit, jamais réutilisé. Signalé par **5 fiches** (« C'est quoi le couteau ? », maman le cherche dans les images). Défaut isolé le plus unanime du corpus.
- **Attributions de dialogue floues** quand ça enchaîne sans geste identifiant (« Toi — Non toi » répété, kimi-reco/kimi-reco-guide) → « C'est qui qui parle maintenant ? ». Rappel dyade : à 4 ans, mieux vaut un geste qui identifie (« Mimi tourna la pomme ») qu'un « dit-il » de trop… mais pas moins.
- **Ruptures de temps** (haiku-def : présent au milieu du passé, « C'est qui qui croque ? ») et **référents ambigus** (« froide contre sa peau » : la peau ou la poire ?).

### Pattern 2 — Les fins ouvertes / qui relancent = mauvaises au coucher
Convergence forte des **4 dyades**. « Encore un ? » (opus-def, opus-reco), les échanges « à toi / à toi » en boucle (kimi-reco), « qui commence ? » : **excitent au lieu d'apaiser**. La maman doit ajouter une phrase de clôture avant d'éteindre. Rappelle la patte MaxPlay (Kishōtenketsu apaisant, écoute au coucher) : **la fin reste dans le calme, pas dans la question relancée.**

### Pattern 3 — La longueur / le bavardage avant de manger
Cité par ≥ 5 fiches. kimi-reco et kimi-reco-guide « parlent, parlent… quand est-ce qu'ils mangent ? » ; la négociation « trouver le milieu » répétée 3× (kimi-reco) fait décrocher les 4 ans. Le passage outils feuille/pierre (kimi-k26-thinking) « alourdit le milieu ». **La cible primaire (4 ans) veut l'action : croquer.** Clivage d'âge net : ce bavardage plaît aux 7 ans et aux dyades interactives, ennuie les enfants seuls.

### Ce qui GAGNE (positif ≥ 6 fiches)
- **Le pivot silencieux** : Mimi pose le fruit entier au milieu, sans un mot → « Oh ! » de compréhension. Cœur de l'histoire, quasi unanime.
- **Le son *crounch*** des dents dans le fruit → réaction physique (l'enfant mime la morsure). Ancre le goût.
- **La fourmi qui repart avec sa miette** → fait le lien partage sans le dire, dans toutes les versions réussies.
- **Les images-dents concrètes** : « deux demi-lunes qui se font face » (sonnet-def), « deux petits sourires » (deepseek-def) — mimées avec les doigts.

---

## 3. CITATIONS CLÉS (mots d'enfant / de parent)

- **claude-sonnet-def** (g4-maman-sonnet) : *« ma fille de 7 ans a remarqué toute seule les "deux demi-lunes qui se font face" — elle a trouvé l'image belle, l'a redemandée »* ; MAIS (g2-fille-sonnet) *« à la fin il y a écrit plein de trucs bizarres d'adulte… ça casse tout, on dirait un cahier de maîtresse. »*
- **claude-sonnet-reco** (g3-papa-kimi) : *« Lulu ne dit pas que c'est interdit, il dit juste que ça marche pas. C'est plus gentil. »* — la leçon passe sans être dite.
- **kimi-k26-instant** (g4-maman-kimi) : *« Elle tourne toute seule la pomme ! Haha, elle tourne entre les deux bouches ! »* — mais (g3-papa-kimi) *« Mais elle tient pas avec les mains ? »* : la même image enchante et déconcerte.
- **claude-opus-def** (g4-maman-sonnet) : *« la fin en question ouverte casse l'apaisement du coucher. J'ai dû ajouter moi-même une phrase de clôture. »*
- **Pattern morale, grok-reco** (g4-maman-deepseek) : *« la fin en "les trois enfants restèrent sans parler" — un peu trop morale. La petite a dit "ils dorment ?" »*
- **deepseek-reco** (g3-papa-kimi) : *« Papa, tu lis n'importe quoi. C'est quoi pommu ? »* — la corruption détectée en direct par l'enfant.

---

## 4. DIVERGENCES NOTABLES

- **kimi-reco-guide** : le plus clivé du corpus (best #1 / worst #12). Les **dyades** l'adorent (effet miroir : les enfants-personnages posent les questions que l'enfant-auditeur pose aussi → lecture interactive). Les **enfants seuls** le trouvent trop bavard. La cible primaire tranche : le bavardage plombe.
- **claude-sonnet-def vs opus-def** : sonnet-def gagne haut la main sur le **dialogue** (fluidité orale, attribution), opus-def gagne sur le **sensoriel brut** — mais opus-def est plombé par « trou frais pour les fesses » + la fin ouverte.
- **Clivage d'âge** sur la longueur (pattern 3) : bavardage = plus pour 7 ans / dyade, moins pour 4 ans seul. Cible primaire = 4 ans.
- **Fruit variable** (pêche/pomme/poire selon versions) : plusieurs lecteurs notent une confusion légère « à l'écoute rapide » et une préférence nette pour **la pêche juteuse** (« coule sur le menton », plus tentante que pomme froide/poire).

---

## 5. LECTURE DIRECTEUR (pour préparer l'étape 6 — NON tranchée ici)

- **Base pressentie : `claude-sonnet-def`.** Dominante nette (rang moyen 3.58, 8 top-3), meilleure fluidité orale citée par les dyades, dialogue enfantin le plus vrai, image-signature des « deux demi-lunes ». Son unique défaut majeur (**notes d'intention collées après le récit**) est un **artefact de fichier writer à purger, pas une faute de texte** — le récit lui-même est sobre et sans morale dite. À vérifier en étape 6 : sa fin (« Personne ne bouge encore ») est-elle du bon côté du pattern 2 (calme) ou perçue « triste/suspens » par un lecteur (g1-garcon-haiku l'a demandé) ? À trancher contre le goût auteur.
- **Alternative de sécurité : `claude-sonnet-reco`** — 0 fond-3, le pivot silencieux le plus limpide, la fin la plus propre au coucher. Si sonnet-def bute sur sa fin, reco est le repli robuste.
- **Réservoir de greffes** :
  - `kimi-k26-instant` : l'image **« la pomme tourne toute seule entre leurs deux bouches »** (la plus mimable) — à considérer SI on peut lever l'accroc « elle tient pas avec les mains ? » (l'ancrer par un geste : leurs deux mains la tiennent ensemble).
  - `deepseek-def` : **« deux petits sourires »** pour les marques de dents (image-dents alternative, très accessible 4 ans).
  - `kimi-k26-thinking` : la chute **« Elle aussi »** murmurée par Wex (fin qui ouvre doucement) — SANS le passage outils qui alourdit ni « trimbala ».
  - `kimi-reco-guide` : le **ping-pong interactif** (« qui commence ? ») — à doser en micro-touche pour l'effet miroir dyade, sans le bavardage qui décroche les 4 ans.
- **Vigilance goût-auteur / patte pour le rewrite** : (a) **fin dans le calme, jamais une question relancée** (« Encore un ? » à bannir — pattern 2) ; (b) **purger tout paratexte d'auteur** en fin de fichier ; (c) **aucune phrase-bilan « morale »** (« ils étaient bien / restèrent sans parler ») ; (d) **fruit unique et juteux** (pêche) pour l'ancrage sensoriel ; (e) **zéro objet fantôme** (le couteau de grok-reco = contre-exemple) ; (f) garder le pivot silencieux + le *crounch* + la fourmi qui repart (les 3 gagnants unanimes).

> ⚠️ **Rappel goût auteur (mémoire-papa-yann)** : l'exigence de l'auteur pèse **à égalité avec la patte** dans l'arbitrage étape 6, et peut primer sur le classement panel. Ce top mesure l'**acceptable robuste**, pas nécessairement l'**excellent selon Papa Yann**. **Ne pas lancer l'étape 6 ici** (consigne : attendre instruction séparée).

---

_Panel v2 hétérogène — 12 fiches, 4 groupes × 3 modèles, Kimi inclus sur les 4 (canal CLI). Corpus 14 versions dont deepseek-reco corrompue (exclue du fond, régénérée hors panel)._
