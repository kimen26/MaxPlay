# Synthèse lecteurs — STORY-002 « La Libellule impossible » (vague 5)

> **Étape 5 — panel v2 hétérogène (DEC-PANEL-V2).** Consolidation Directeur des fiches lecteurs.
> Input de l'étape 6 (sélection). Alimente `equipe/lecons-vivantes.md` post-canonisation.
> Date : 2026-07-03. Ne PAS lancer l'étape 6 sur cette base sans validation de la reprise.

---

## 0. Périmètre réel du panel (écarts documentés)

**Panel v2 cible** : 4 groupes (Garçon seul · Fille seule · Dyade papa · Dyade maman) × 3 modèles (Sonnet / Kimi / Haiku-ou-DeepSeek) = 12 appels, 2 tranches d'âge chacun.

**Produit réellement : 13 fiches** (12 attendues + 1 bonus). Détail :

| Groupe | Sonnet | Kimi (prévu) | Haiku | DeepSeek |
|---|---|---|---|---|
| Garçon seul | `G-normal-sonnet` | ❌ indispo → substitué | `G-haiku` + `G-extra-haiku`¹ | `G-deepseek`² |
| Fille seule | `F-normal-sonnet` | ❌ indispo → substitué | `F-extra-haiku` | `F-deepseek`² |
| Dyade papa | `DP-sonnet` | ❌ indispo → substitué | `DP-haiku`² | `DP-deepseek` |
| Dyade maman | `DM-sonnet` | ❌ indispo → substitué | `DM-haiku`² | `DM-deepseek` |

¹ `G-extra-haiku` produit par une session concurrente (profil garçon extra-verti) — conservé (matière supplémentaire, pas contradictoire).
² Fiches de **substitution** produites à la reprise : la voix **Kimi était indisponible sur les 4 groupes** (blocage infra socket ~72-97 s sur `ask_kimi` gratuit ET `ask_kimi_payant`, gros prompts uniquement — 4 tentatives, 4 échecs). Le PROCESS panel v2 prévoit « Haiku OU DeepSeek » en 3e colonne : Kimi a donc été remplacé par le 3e modèle hétérogène disponible pour conserver **3 modèles distincts par groupe**. Chaque groupe a bien Sonnet + Haiku + DeepSeek.

**Conséquence méthodo** : l'axe de variance « modèle-lecteur » est préservé (3 modèles hétérogènes partout), mais **Kimi est absent du panel comme voix-lecteur**. Aucun avis Kimi-lecteur cette vague (à noter pour le REX infra). Le corpus **noté par le panel** = **11 versions writers**. Les 3 Kimi-writers étaient absents **au moment du passage des lecteurs**, mais ont été **récupérés depuis** via le CLI `call-llm.mjs` (timeout du transport MCP sur générations longues — **pas** une panne infra Moonshot ; voir ADDENDUM en bas de fichier, qui corrige la mention « même panne infra »). Le classement des §1-§5 porte donc sur **11 versions notées** ; les 3 Kimi sont traités en **addendum Directeur** (évaluation hors panel, non notée par les lecteurs).

---

## 1. Classement consolidé — Tranche A (3-5 ans, prioritaire, cible Max)

Agrégation des 13 classements Tranche A (rang moyen ; 1 = meilleur). Distribution des rangs entre crochets.

| # | Version | Rang moyen | Meilleur | Pire | Lecture |
|---|---------|-----------|----------|------|---------|
| **1** | **claude-opus-reco** | **3.15** | 1 | 9 | **#1 chez 5 fiches / 13, jamais dernier.** Consensus le plus fort du panel. |
| **2** | **grok-reco** | **4.15** | 1 | 7 | Le plus **stable** : jamais pire que 7e. Champion des dyades (douceur, clarté, fin apaisée). |
| 3 | claude-haiku-reco | 5.46 | 2 | 10 | Solide milieu de tableau, jamais #1 mais rarement détesté. |
| 4 | claude-sonnet-reco | 5.54 | 2 | 8 | Très régulier (jamais < 8e), jamais tête. |
| 5 | deepseek-reco | 6.00 | 2 | 11 | Bon chez les dyades (fluidité orale), fin jugée « philosophique » plutôt qu'apaisée. |
| 6 | claude-sonnet-def | 6.08 | 1 | 11 | Champion des lecteurs qui valorisent la **clarté orale** (DP-sonnet #1). |
| 7 | deepseek-def | 6.23 | 1 | 10 | **#1 chez 3 fiches** (grenouille sans pattes + héron) mais plombé par sa longueur/dispersion ailleurs. |
| 8 | claude-opus-def | 6.38 | 1 | 11 | **#1 chez 2 fiches** (DM-sonnet, DP-deepseek : atmosphère/silence adulte) mais bas ailleurs (confusion géométrique). Très polarisant. |
| 9 | **kimi-k26-instant** | 7.08 | 1 | 11 | **LE plus polarisant** : #1-2 chez 5 fiches, **dernier (#11) chez 7 fiches.** Voir §3. |
| 10 | grok-def | 7.31 | 4 | 11 | Jamais aimé ni détesté à l'extrême ; pénalisé par « libellule sur le genou ». |
| 11 | claude-haiku-def | 8.62 | 2 | 11 | Le plus bas : « posé les armes » incompris, Wex muet, fin sèche. |

> **Note sur `F-extra-haiku`** : cette fiche ne donne explicitement que top-3 + bottom-2 ; les rangs du milieu ont été reconstitués prudemment depuis son texte. Impact marginal sur le consolidé.

---

## 2. Classement consolidé — Tranche B (6-7 ans, signal complémentaire)

Tendance nette (non ré-agrégée finement, lecture qualitative convergente des 13 fiches) :

1. **claude-opus-reco / claude-opus-def** en tête — ce sont les **seules versions où l'enfant de 6-7 ans dit comprendre POURQUOI la libellule vient** (la chaîne calme-de-Nono → contact-Juju → venue). À cet âge, la causalité prime.
2. **grok-reco** et **deepseek-reco** suivent (clarté + fin poétique).
3. **kimi-k26-instant** décroche encore plus qu'en tranche A : l'enfant plus grand réclame une logique claire et une vraie clôture — la fin éclatée le laisse sur sa faim.

**Bascule d'âge notable** : les versions « bruit + images fortes » (kimi, opus-reco) plaisent fort à 3-5 ans ; à 6-7 ans ce sont les versions « causalité lisible + poésie minimaliste » qui montent (opus-def gagne en âge, kimi perd).

---

## 3. Le signal central : kimi-k26-instant divise le panel en deux

C'est **l'enseignement majeur** de cette vague. kimi-k26-instant est :
- **#1 ou #2 chez 5 fiches** — surtout les **enfants seuls / extra** (G-normal-sonnet, F-normal-sonnet, F-extra-haiku, G-extra-haiku, G-haiku). Ce qu'ils adorent : « Niaou-niaou » (le jeu d'avion), les onomatopées jouables (paf, vrr-vrr, bzz-bzz), l'énergie qui ne retombe jamais, Juju qui rit à la fin « pas écrasée par la beauté ».
- **Dernier (#11) chez 7 fiches** — surtout les **dyades** (lecture parent à voix haute) et DeepSeek. Ce qui casse : la **cascade de répliques anonymes en fin** (« Sur ma main ! Presque ! » / « Sur ma main » / « Sur VOTRE main » / « On a ») où **on ne sait plus qui parle** ; la **fin-pirouette éparpillée** (Juju court, Wex regarde le ciel vide) qui **ne clôt pas** et **casse l'apaisement du coucher**.

**Interprétation** : Kimi capte la voix d'enfant la plus vraie du corpus (tous les lecteurs le reconnaissent, même ses détracteurs), mais pèche sur les **deux tueurs du brief §5bis** : clarté du qui-parle, et pas-de-chute-pirouette. La version est **excellente en matière première, défaillante en tenue de fin**.

---

## 4. Patterns convergents (3+ fiches indépendantes)

### 4a. Ce qui MARCHE (à préserver)
- **Onomatopées/sons jouables ancrés dans le corps** : « splotch » entre les orteils (opus-reco), « flic flac » (sonnet-reco), « clac. rien. » (opus-def), « vrr-vrr / niaou-niaou » (kimi). Cités spontanément et « refaisables » — c'est le **moment physique participatif** demandé.
- **Comparaisons de vitesse dans le monde de l'enfant** : « comme un bus qui pile » (opus-reco, plébiscité — univers de Max), « fusée bleue », « voiture de course ». Bien plus efficaces que les images abstraites.
- **Le geste de Nono qui s'arrête sans l'annoncer** : compris et aimé partout quand il est **montré par le corps** (épaules qui tombent, pieds qui se posent) plutôt qu'expliqué.
- **Fin qui apaise sur une image du lieu qui reprend vie** : grok-reco (« un oiseau d'eau fait un petit plongeon, l'herbe bouge »), sonnet-def (le têtard qui repasse) — parfaites pour le coucher.

### 4b. Ce qui CASSE (à éviter au rewrite)
- **« La main qui parle »** (ERREUR DE REGISTRE, signalée par DP-haiku, DM-haiku, DM-sonnet) : « ouvre la main comme s'il disait quelque chose que personne n'entend » (opus-reco), « fait un geste comme pour dire vas-y » (deepseek-def), « ses doigts s'écartent lentement » (grok-def). Métaphore allégorique qui **fait trébucher le parent** et qu'un 4-5 ans ne décode pas.
- **Confusion géométrique au moment-clé** (DP/DM tous modèles) : « le doigt de Juju qui pend contre l'épaule de Nono » (sonnet-def, opus-def) → on ne sait plus qui tient/touche quoi, ni **où** la libellule se pose. À un moment aussi sacré, la clarté spatiale est capitale.
- **« Libellule sur le genou »** (grok-def) : rupture du pattern « sur la main / le doigt » → le lecteur s'arrête (« elle se pose où, là ? »). Incohérence visuelle.
- **Fin-pirouette / fin qui repart** : kimi (grave), et à moindre degré opus-reco (« Tout près ! Tout, tout près ! » = débâcle joyeuse) et sonnet-reco (« repart en éclaboussant » = réveille au lieu d'apaiser). Le brief §5bis interdit la chute maligne : signal confirmé par le terrain.
- **Dispersion descriptive du lieu** (deepseek-def) : héron + bourdon + menthe + fleur jaune → l'essentiel (pourquoi la libellule vient) se noie, la poursuite devient tiède, la fin s'étire.
- **Vocabulaire/tournure d'adulte** : « posé les armes » (haiku-def, jugé hors-sujet), « trois centimètres, peut-être moins » (haiku-reco), « velours / l'espace entre » (haiku-reco) — belles pour le parent, opaques pour l'enfant qui écoute.

---

## 5. Top 4-5 pour l'étape 6 (avec citations)

> Base de sélection recommandée à arbitrer contre la patte ET le goût auteur (`gout/memoire-papa-yann.md`) à l'étape 6.

1. **claude-opus-reco** — **base la plus consensuelle** (rang moyen 3.15, #1 × 5, forte en A ET B).
   - Enfant (G-haiku) : « le BUS qui pile (c'est MAX !), "splotch" qu'on peut imiter, "elle triche" ».
   - Papa (DP-haiku) : « "Elle rentra dans Nono. Épaule contre épaule. Boum, tout doux." — rythme deux-temps naturel. »
   - ⚠️ à corriger au rewrite : la **main qui « dit quelque chose »** + la **fin qui repart** (« Tout, tout près ! »).

2. **grok-reco** — **la plus stable, championne des dyades / du coucher** (rang moyen 4.15, jamais pire que 7e).
   - Maman (DM-haiku) : « quand je lis "il pose un genou et regarde l'eau", mes mains se posent sur mes genoux… à la fin, on s'endort ensemble. »
   - Force : **seule version où la libellule se pose sur le doigt de Juju de façon parfaitement claire**, fin apaisée « oiseau d'eau qui plonge ».
   - ⚠️ nuance de fond : le centre de gravité (calme de Nono) est un peu déplacé vers Juju (DM-sonnet le note) — le verrou causal reste tenu mais moins net que chez opus.

3. **claude-opus-def** — **champion de l'atmosphère et de la causalité lisible** (#1 chez DM-sonnet + DP-deepseek ; top-2 en tranche B).
   - Papa (DP-deepseek) : « celle qu'on relit trois soirs de suite. La fin, c'est pas une formule, c'est l'instant qui se pose. »
   - Maman (DM-sonnet) : « l'atmosphère la plus juste, le silence construit par la matière sonore, fin ouverte parfaite. »
   - ⚠️ à corriger : la **géométrie du poignet/doigts qui serrent** (confusion) + cascade de répliques au début.

4. **claude-sonnet-def** — **le plus limpide à l'oral** (#1 chez DP-sonnet).
   - Papa (DP-sonnet) : « rythme le plus fluide et le plus naturellement oral de toute la vague, qui-parle limpide, fin sobre et bouclée (le têtard). »
   - Trouvaille aimée : le miroir « Ne bouge pas / Je bouge pas » (mimable en dyade).
   - ⚠️ « l'étang quand personne n'y marche » accroche à l'oral pour certains ; fin un peu sèche pour d'autres.

5. **kimi-k26-instant** — **hors-classement mais à ne pas ignorer** : détient la **voix d'enfant la plus vraie** du corpus (reconnu par tous, y compris ses détracteurs). Réservoir de **matière à greffer** (jamais comme base telle quelle vu la fin) : « Niaou-niaou », le débat « c'est pas le bruit des avions / si, c'est mon avion », « vrr-vrr ».
   - ⚠️ inutilisable en l'état : fin éparpillée + cascade anonyme. Si greffe → **réattribuer chaque réplique** et **couper la fin-pirouette**.

---

## 6. Recommandation d'orientation pour l'étape 6 (à trancher par le Directeur + auteur)

- **Deux candidats base sérieux** : **opus-reco** (consensus + énergie + univers-bus de Max) vs **grok-reco** (tenue de coucher + clarté du geste-clé + fin apaisée). Le premier gagne le panel ; le second gagne la lecture parent à voix haute et la fin.
- **Point de vigilance transverse pour le rewrite, quel que soit le choix** : bannir la « main qui parle », clarifier **où** se pose la libellule, **une seule** fin qui apaise (pas de rebond, pas de pirouette).
- **Rappel process** : ne pas lancer l'étape 6 avant décision de la reprise. La sélection s'arbitrera contre `gout/memoire-papa-yann.md` (goût auteur à égalité avec la patte).

---

**Fiches sources** : `5-lecteurs-temoins/` (13 fiches). **Corpus jugé par le panel** : 11 versions writers (`4-versions-writers/`).
**Écarts panel** : Kimi absent en tant que **voix-lecteur** (×4 substitués par DeepSeek/Haiku). En revanche les **3 Kimi-writers ont été récupérés hors panel** — voir addendum ci-dessous.

---

## ADDENDUM VAGUE 5 — 3 writers Kimi hors panel initial

> ⚠️ **Statut honnête** : ces 3 versions **n'ont PAS été notées par le panel des 13 lecteurs.** Elles ont été récupérées **après** le passage des lecteurs, via le CLI `call-llm.mjs` (contournement du timeout du transport MCP sur générations longues 188-396 s — et **non** une panne infra Moonshot : le canal Kimi répond en ~1.9 s). Le §0 ci-dessus disait « même panne infra » pour ces 3 writers : **c'est faux et corrigé ici** — la cause réelle était le timeout du transport MCP, pas une indisponibilité du modèle.
>
> Faute de relancer les 13 lecteurs (ce qui invaliderait le classement établi), je **n'ai pas fabriqué de rangs panel** pour ces 3 versions. À la place, moi (Directeur) je les évalue **contre les mêmes critères de terrain** dégagés par le panel (goût auteur : clarté du qui-parle, économie, dialogues attribués, pas-de-pirouette-finale ; patte B+D+C ; verrou causal). Évaluation Directeur, **pas** notation lecteur.

### Les 3 versions (corps resserré 400-550 ✅)

| Version | Corps | Fin | Verrou causal | Où se pose la libellule |
|---|---|---|---|---|
| `kimi-reco` (libre, 487 mots) | 487 | « On l'a presque **vue** » + cycle (Wex refait la libellule → « Recommence ») | Tenu (Nono « pose sa cuillère », Juju le heurte) | **sur le genou de Juju** ⚠️ |
| `kimi-reco-guide` (guidé axes 1-6, 546 mots) | 546 | « statues magiques / Capitaine du monde et des libellules » + repartent au soleil | Tenu mais calme-de-Nono presque simultané au contact | sur le **roseau** tenu par Juju (clair) |
| `kimi-k26-thinking` (libre payant, 542 mots) | 542 | « D'un gros champignon / On était bien » + l'étang frémit, l'herbe sèche | Tenu, le plus incarné (souffle calme montré) | **manche/entre poignet Juju et main Nono** ⚠️ |

### Lecture critique (mêmes grilles que le panel)

**Ce qui les distingue nettement de `kimi-k26-instant`** (le Kimi polarisant du panel, coulé par la fin) : **les 3 attribuent proprement leurs répliques** (« a dit Juju », « souffla Nono »). Le tueur n°1 du panel (cascade anonyme « on ne sait plus qui parle ») **n'est pas présent** ici. C'est le gain majeur.

**Sur le tueur « pas de pirouette finale » (brief §5bis)** :
- `kimi-k26-thinking` a **la meilleure fin des trois** : elle apaise sur le lieu qui reprend vie (bourdon, étang qui frémit, herbe qui sèche) — exactement le pattern **4a** plébiscité (grok-reco, sonnet-def). Wex clôt sur « On était bien » (constat doux, pas triomphe).
- `kimi-reco` a un **léger rebond d'énergie** en fin (Wex refait la libellule) mais **ancré dans le cycle** (patte C) et clos par « Recommence / Et ils ont recommencé » — pas la débâcle de kimi-instant, mais moins apaisant que thinking.
- `kimi-reco-guide` a la **fin la plus risquée** : Juju triomphe (« Capitaine du monde et des libellules ! ») — proche du défaut « fin qui repart » reproché à opus-reco. La moins alignée coucher.

**Sur le tueur « où se pose la libellule / clarté spatiale »** (pattern 4b) :
- `kimi-reco` reproduit **exactement** le défaut « libellule sur le genou » qui a plombé grok-def (rupture du pattern main/doigt, « elle se pose où, là ? »). Handicap réel.
- `kimi-k26-thinking` : « entre le poignet de Juju et la main de Nono » — belle image (l'espace vide devenu pont) mais **flirte avec la confusion géométrique** signalée pour sonnet-def/opus-def. À clarifier si greffé.
- `kimi-reco-guide` : « sur le roseau tenu par Juju » — **le plus limpide spatialement** des trois.

**Trouvaille aimable à greffer** (comme kimi-instant a été retenu pour sa matière) : le miroir **« Ne bouge pas / Je bouge pas »** de `kimi-reco` — mimable en dyade, du même registre que le « Ne bouge pas / Je bouge pas » de sonnet-def déjà plébiscité (§5, point 4). Et le **« On était bien »** de Wex (thinking) comme clôture douce candidate.

### Est-ce que les 3 Kimi changeraient le top 4-5 ?

**Mon verdict Directeur (à confirmer par le retour du duel de Papa Yann) : non, ils ne délogent pas le top 2 (opus-reco / grok-reco), mais `kimi-k26-thinking` mérite une place dans la zone de discussion, autour des rangs 4-6.**

- Aucun des trois n'a l'**arme décisive du top 2** : ni l'univers-bus de Max + le consensus d'opus-reco, ni la tenue-de-coucher parfaite + la clarté-du-geste de grok-reco.
- `kimi-k26-thinking` est le plus sérieux : verrou causal incarné + **fin apaisée du bon côté** (pattern 4a) + dialogues attribués. Son seul vrai risque (géométrie poignet/main) est **le même** que celui d'opus-def, qui figure au top 3 — donc pas disqualifiant. Il se placerait de façon crédible **entre le rang 4 et 6**, dans le peloton sonnet-def / deepseek-reco. **Il ne bouscule pas la tête, mais il enrichit la matière à greffer** (fin « On était bien » + registre du silence).
- `kimi-reco` : bon rythme, dialogues nets, mais **plombé par la libellule-sur-le-genou** (défaut déjà pénalisé chez grok-def). Zone rang 7-9. Valeur = la greffe « Ne bouge pas / Je bouge pas ».
- `kimi-reco-guide` : correct, spatialement le plus clair, mais **fin triomphale** (défaut coucher) → zone rang 7-9. Pas de greffe distinctive forte.

**Conséquence pour l'étape 6** : le duo de tête reste **opus-reco vs grok-reco**, inchangé. J'ajoute `kimi-k26-thinking` comme **3e-4e candidat de discussion / réservoir de greffe** (fin apaisée + « On était bien »), à arbitrer contre le retour du duel de goût de Papa Yann. **Rien de tout ceci n'est un rang panel — c'est une lecture Directeur explicite.**

---

**Fiches sources** : `5-lecteurs-temoins/` (13 fiches). **Corpus noté par le panel** : 11 versions writers. **Corpus total livré** : 14 versions (les 3 Kimi évalués en addendum Directeur, hors panel).
