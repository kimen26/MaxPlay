# PROPOSITION — Les 3 Ères + « Les autres grandes extinctions »

> Réponse à la demande Papa Yann 2026-09-05 (soir) : « le voyage est hyper important, ajouter les ères
> (Cénozoïque…) en macro-info, parler aussi des autres extinctions que celle de la fin du Crétacé. »
> Statut : **PROPOSITION éditoriale non produite en audio.** Aucun code, aucun MP3, aucun git.
> Fact-check : Grokipedia inaccessible (403 WebFetch — cohérent avec [[reference_webfetch_403_playwright]],
> pas de contournement possible ici, aucun sous-agent autorisé sur cette tâche) → **repli sur sources
> qualité (National Geographic, MIT News, Britannica, Our World in Data)**, croisées à 2-3 sources par
> fait. Chiffres ci-dessous croisés, pas de valeur isolée non recoupée.
> Libellé machine vérifié dans `RECITS-EPOQUES.md` : c'est **`**NARRATRICE**`** / **`**WEX**`** pour les
> récits du Voyage (≠ `**NARRATEUR H**` qui est réservé aux fiches dino individuelles, porte
> `_verif-scripts-audio.cjs`). Repris à l'identique ci-dessous.

---

## 1. Les 3 Ères — macro-info pour un enfant de 4 ans

Contexte : les 5 `DINO_PERIODES` actuelles (Permien, Trias, Jurassique, Crétacé, Cénozoïque) sont posées
à plat, sans regroupement. Une Ère est un niveau au-dessus : elle donne à Max une histoire en 3 actes
qu'il peut retenir (« avant les dinos » → « les dinos » → « après les dinos »), avant même de savoir
dans quelle période précise il se trouve.

### Paléozoïque — « avant les dinosaures »

- **Nom vrai** : Paléozoïque (du grec *palaios* = ancien, *zôon* = animal — « l'ère des animaux anciens »)
- **Surnom parlant** : *l'âge d'avant les dinosaures*
- **Bornes** : il y a environ **541 à 252 millions d'années**
- **Rattache** : la période `permien` (280 Ma) de `DINO_PERIODES`, et l'épisode **INTRO** du Voyage
  (bactérie → poissons → premiers animaux à quatre pattes)
- **Accroche écran** (≤ 15 mots) : *« Avant les dinosaures, la vie invente tout : poissons, plantes, premiers pas hors de l'eau. »* (14 mots)
- **Accroche audio Narratrice** (2-7 s) :
  `**NARRATRICE** [happily][excited] : Le Paléozoïque ! [playful] L'âge d'avant les dinosaures, [curious] quand la vie invente tout.`

### Mésozoïque — « l'âge des dinosaures »

- **Nom vrai** : Mésozoïque (*mesos* = milieu — « l'ère du milieu »)
- **Surnom parlant** : *l'âge des dinosaures*
- **Bornes** : il y a environ **252 à 66 millions d'années**
- **Rattache** : `trias`, `jurassique`, `cretace` de `DINO_PERIODES`, et les épisodes **TRIAS, JURASSIQUE,
  CRÉTACÉ, EXTINCTION** du Voyage
- **Accroche écran** : *« L'âge des dinosaures : trois époques, des tout petits aux géants. »* (11 mots)
- **Accroche audio Narratrice** :
  `**NARRATRICE** [excited][playful] : Le Mésozoïque ! [happily] L'âge des dinosaures, [gasps] du tout petit Eoraptor au géant Brachiosaure.`

### Cénozoïque — « après les dinosaures, l'âge des mammifères »

- **Nom vrai** : Cénozoïque (*kainos* = nouveau — « l'ère nouvelle »)
- **Surnom parlant** : *l'âge des mammifères* (déjà `desc: 'Après les dinos : les mammifères'` dans la data — cohérent, je le reprends)
- **Bornes** : il y a environ **66 millions d'années à aujourd'hui**
- **Rattache** : `cenozoique` de `DINO_PERIODES`, et les épisodes **MAMMIFÈRES, GLACE-MAMMOUTH, PALÉO**
  du Voyage
- **Accroche écran** : *« Après les dinosaures, les mammifères grandissent, jusqu'à toi. »* (10 mots)
- **Accroche audio Narratrice** :
  `**NARRATRICE** [happily][excited] : Le Cénozoïque ! [playful] L'âge des mammifères, [softly] jusqu'à nous, aujourd'hui.`

### Table de rattachement complète

| Ère | `DINO_PERIODES.id` | Épisodes JOURNEY |
|---|---|---|
| Paléozoïque | `permien` | `intro` |
| Mésozoïque | `trias`, `jurassique`, `cretace` | `trias`, `jurassique`, `cretace`, `extinction` |
| Cénozoïque | `cenozoique` | `mammiferes`, `glace-mammouth`, `paleo` |

> Note taxo honnête : l'épisode `extinction` (météorite, fin Crétacé) est le **pont** entre Mésozoïque et
> Cénozoïque — je le laisse côté Mésozoïque (c'est la fin de cette ère, l'événement qui la clôt), le
> nouveau récit « autres extinctions » (§2) explicite bien que Crétacé-Paléogène EST la limite entre les
> deux ères, pour ne rien cacher.

---

## 2. Nouveau récit — « Les autres grandes extinctions »

### Fact-check (Big Five), croisé 2-3 sources

| Extinction | Date | % espèces perdues | Cause principale | Sources |
|---|---|---|---|---|
| Ordovicien-Silurien | ~445 Ma | ~85 % des espèces marines | Glaciation brutale → chute du niveau des mers | Our World in Data, National Geographic |
| Dévonien (fin) | ~375-360 Ma | jusqu'à ~75 % | Manque d'oxygène dans les océans (lié à l'explosion des plantes sur terre) | National Geographic, NPS |
| **Permien-Trias** (« la Grande Mort ») | ~252 Ma | **>96 % des espèces marines, ~70 % terrestres** — la PLUS grande de toutes | Volcans géants de Sibérie (Trapps sibériens), gaz toxiques, réchauffement | MIT News, Britannica, EBSCO |
| Trias-Jurassique | ~201 Ma | large part des espèces, ouvre la voie aux dinosaures | Volcanisme lié à la fracture de la Pangée (probable) | Our World in Data, National Geographic |
| Crétacé-Paléogène | ~66 Ma | ~75 % | Météorite (Chicxulub, Mexique) — **déjà racontée** dans `recit-extinction.mp3` | (canon existant, non re-fact-checké ici) |

Décision éditoriale : je retiens la **Permien-Trias** comme cœur du nouveau récit — c'est la plus grande
extinction de l'histoire de la Terre, elle a une vraie histoire à raconter (volcans, pas météorite —
contraste pédagogique fort avec celle que Max connaît déjà), et elle se place **juste avant le Trias**,
donc juste avant l'épisode `trias` existant : position chronologique naturelle. Les 3 autres (Ordovicien,
Dévonien, Trias-Jurassique) sont mentionnées en une phrase groupée plutôt que détaillées une à une — à
4 ans, 5 extinctions égales dans le détail = liste plate et « nian-nian » par accumulation. Une hiérarchie
(1 grande + 3 citées) est plus honnête pédagogiquement qu'une énumération à plat.

### Place dans le JOURNEY

Nouvel épisode **inséré entre `intro` et `trias`** :

```
{ id:'grande-mort', emoji:'🌋', label:'La Grande Mort', date:'−252 Ma', color:'#4a1a1a', dinos:[] }
```

- **id** : `grande-mort` (cohérent avec `glace-mammouth`, style slug narratif court)
- **emoji** : 🌋 (volcan — cause réelle, cohérent avec Permien `permien` qui utilise déjà 🌋 en macro-période)
- **label** : « La Grande Mort » (surnom réel donné par les scientifiques — pas inventé, vérifiable)
- **date** : −252 Ma
- **couleur** : `#4a1a1a` (brun-rouge sombre, distinct du orange Trias `#ff7043` et du bleu Extinction `#ff6b35`)
- **dinos** : `[]` (aucun dino de la data n'est antérieur au Permien-Trias — les synapsides Édaphosaure/
  Gorgonops/Lystrosaure/Moschops de la famille « Avant les dinosaures » sont Permien, mais rattachés
  ailleurs dans la data ; je ne force pas de vignette pour rester honnête)

**Oui, un 2ᵉ récit court est nécessaire** (pas un ajout dans `recit-trias.mp3`) : la Grande Mort est
l'histoire d'une FIN, `recit-trias.mp3` est l'histoire d'un DÉBUT — les coller aurait cassé le rythme
ping-pong établi (chaque épisode = une respiration complète, accroche → fin ouverte). Nouveau fichier :
`recit-grande-mort.mp3`.

### Texte FR — `recit-grande-mort.mp3` (cible ~35-40 s, exception validée par la demande)

```
## ÉP. GRANDE MORT — LA PLUS GRANDE EXTINCTION (recit-grande-mort.mp3)

**NARRATRICE** [serious][softly] : Avant les dinosaures, [pauses] il y a deux cent cinquante-deux millions d'années, [gasps] la Terre a failli mourir.

**WEX** [curious] : Une météorite, comme les dinosaures ?

**NARRATRICE** [softly] : Non, [serious] pas cette fois. [matter-of-fact] Ce jour-là, [pauses] ce sont des volcans. [gasps] Des volcans immenses, en Sibérie, [shouts] qui crachent du feu pendant des milliers d'années.

**WEX** [gasps] : Des milliers d'années ?!

**NARRATRICE** [matter-of-fact][softly] : Oui. [serious] Une fumée épaisse couvre le ciel. [softly] L'air devient brûlant, [pauses] et empoisonné.

**WEX** [curious] : Et les animaux ?

**NARRATRICE** [sad][softly] : Presque tous meurent. [serious] Dans la mer, presque tous les animaux disparaissent. [pauses] Sur la terre aussi, la plupart. [softly] Les savants l'appellent [serious] « la Grande Mort ». [pauses] C'est la plus grande extinction que la Terre ait connue.

**WEX** [curious] : Plus grande que celle des dinosaures ?

**NARRATRICE** [serious] : Plus grande. [matter-of-fact] Bien plus grande. [pauses] Mais quelques animaux survivent, [softly] cachés, résistants.

**WEX** [gasps] : Y'avait Tritri ?

**NARRATRICE** [chuckles][softly] : Pas encore ! [playful] Les Tricératops n'existent pas encore. [happily] Il faudra attendre très, très longtemps. [pauses] Mais ces survivants vont donner naissance à quelque chose de nouveau…

**WEX** [excited][curious] : Quoi ?

**NARRATRICE** [happily][excited] : Les tout premiers dinosaures ! [pauses]
```

Notes de conformité :
- Tags v3 : catalogue respecté (`serious/softly/gasps/matter-of-fact/shouts/sad/chuckles/playful/happily/excited/curious/pauses`), tous dans `TAGS_OK`.
- Densité (analogie L-D-71) : chaque réplique Narratrice porte ≥ 2 tags dont au moins 1 en milieu de phrase sur les répliques longues ; aucune réplique WEX sans tag ; ponctuation finale WEX correcte (`?`, `!`).
- Max 2 tags collés en tête : respecté partout.
- Tritri : **1 mention** (« Y'avait Tritri ? » → réponse « pas encore »), conforme L-D-75 et cohérent avec la règle Voyage « pas de Tritri avant le Crétacé » (`_METHODE-DIRECTION-AUDIO.md`).
- Zéro « bus », zéro « regarde », zéro gore (mort dite factuellement, aucune agonie, aucun détail physique de souffrance — conforme § Prédation/mort figée).
- Chiffres en toutes lettres : « deux cent cinquante-deux millions d'années » — cohérent avec les 7 récits existants.
- Contraste pédagogique explicite et honnête : « pas une météorite cette fois » — évite que l'enfant généralise faussement « les dinosaures meurent toujours à cause d'une météorite ».
- Mention groupée des 3 autres Big Five : **volontairement absente de ce récit** — je propose de la loger dans l'accroche d'ère Paléozoïque ou dans une ligne courte de la fiche « Ère » plutôt que de surcharger ce récit déjà dense ; à trancher (voir choix éditorial #2 ci-dessous).

---

## 3. Ce que ça change côté UI (pour l'orchestrateur)

- **Onglet Époques** (`buildMenuEpoque()`) : ajouter un niveau d'en-tête Ère au-dessus des 5 cartes
  période existantes — 3 bandeaux (Paléozoïque / Mésozoïque / Cénozoïque) groupant les cartes, sans
  toucher au contenu des cartes période elles-mêmes.
- **Le Voyage** (`JOURNEY`) : insertion d'un 9ᵉ épisode `grande-mort` entre `intro` et `trias` (ordre
  affecté, `_journeyDone`/le 👉 suivant restent fonctionnels tant que l'ordre du tableau fait foi) + un
  bandeau Ère optionnel au-dessus des vignettes (regroupement visuel, pas un onglet en plus).

🚨 **CHANGEMENT DE RÈGLE FIGÉE PROPOSÉ**

Deux lignes verrouillées dans `figees/encyclopedie.md` § UI dev-dinos sont touchées :
1. **« 8 récits »** (`INVARIANTS.md` : *Récits d'époque (voyage) = 8*) → passerait à **9** avec `recit-grande-mort.mp3`.
2. **`buildMenuEpoque()`** (figé 2026-07-28, 5 cartes période dans l'ordre chronologique, gabarit
   `.fam-card`/`.fam-thumb`) → gagnerait un niveau de regroupement Ère non prévu dans la version figée.

Papa Yann a déjà donné l'aval de principe dans `memory/TODO.md` (« défigée par décision PY explicite
2026-09-05 ») pour VOYAGE-ERES. Cette proposition matérialise ce défigeage : **à confirmer avant toute
implémentation code**, en particulier pour le nouvel épisode `grande-mort` qui n'était pas explicitement
nommé dans la décision TODO (celle-ci parlait des « autres extinctions » au singulier générique).

---

## 4. Traductions EN (accroches d'ères + nouveau récit)

Registre 4 ans US, chiffres en toutes lettres, `**NARRATOR**`/`**WEX**` — attention : `RECITS-EPOQUES.md`
et la porte confirment que les libellés machine (`NARRATEUR H`, `WEX`) restent **identiques dans toutes
les langues** (règle explicite de la porte : « les libellés machine restent NARRATEUR H / WEX dans toutes
les langues »). Pour les récits Voyage FR le libellé est `NARRATRICE` — je garde ce même mot non traduit
en EN par cohérence avec cette règle machine (à confirmer : voir choix éditorial #3).

### Accroches d'Ères — EN

**Paleozoic — "before the dinosaurs"**
Screen (≤15 words): *"Before the dinosaurs, life invents everything: fish, plants, first steps on land."* (13 words)
Audio: `**NARRATRICE** [happily][excited] : The Paleozoic! [playful] The age before dinosaurs, [curious] when life invents everything.`

**Mesozoic — "the age of dinosaurs"**
Screen: *"The age of dinosaurs: three eras, from tiny to giant."* (10 words)
Audio: `**NARRATRICE** [excited][playful] : The Mesozoic! [happily] The age of dinosaurs, [gasps] from tiny Eoraptor to giant Brachiosaurus.`

**Cenozoic — "the age of mammals"**
Screen: *"After the dinosaurs, mammals grow bigger, all the way to you."* (11 words)
Audio: `**NARRATRICE** [happily][excited] : The Cenozoic! [playful] The age of mammals, [softly] all the way to us, today.`

### Récit — `recit-grande-mort.mp3` EN

```
## EP. GREAT DYING — THE BIGGEST EXTINCTION (recit-grande-mort.mp3)

**NARRATRICE** [serious][softly] : Before the dinosaurs, [pauses] two hundred fifty-two million years ago, [gasps] the Earth nearly died.

**WEX** [curious] : A meteorite, like the dinosaurs?

**NARRATRICE** [softly] : No, [serious] not this time. [matter-of-fact] This time, [pauses] it was volcanoes. [gasps] Huge volcanoes, in Siberia, [shouts] spitting fire for thousands of years.

**WEX** [gasps] : Thousands of years?!

**NARRATRICE** [matter-of-fact][softly] : Yes. [serious] Thick smoke covers the sky. [softly] The air turns burning hot, [pauses] and poisoned.

**WEX** [curious] : What about the animals?

**NARRATRICE** [sad][softly] : Almost all of them die. [serious] In the sea, almost every animal disappears. [pauses] On land too, most of them. [softly] Scientists call it [serious] "the Great Dying." [pauses] It's the biggest extinction the Earth has ever known.

**WEX** [curious] : Bigger than the dinosaurs' extinction?

**NARRATRICE** [serious] : Bigger. [matter-of-fact] Much bigger. [pauses] But a few animals survive, [softly] hidden, tough.

**WEX** [gasps] : Was Tritri there?

**NARRATRICE** [chuckles][softly] : Not yet! [playful] Triceratops don't exist yet. [happily] We'll have to wait a very, very long time. [pauses] But these survivors will give birth to something new…

**WEX** [excited][curious] : What?

**NARRATRICE** [happily][excited] : The very first dinosaurs! [pauses]
```

---

## 3 choix éditoriaux à valider

1. **Position + contenu du nouveau récit** : Permien-Trias seule en récit dédié (`grande-mort`, inséré
   entre `intro` et `trias`), les 3 autres Big Five (Ordovicien, Dévonien, Trias-Jurassique) NON
   racontées en détail — juste fact-checkées ici pour mémoire. OK, ou tu veux les 4 mentionnées d'une
   phrase groupée dans le récit lui-même ?
2. **8 → 9 récits + `buildMenuEpoque()` regroupé par Ère** = défigeage explicite de 2 lignes verrouillées
   (`figees/encyclopedie.md`). Je le note en alerte rouge ci-dessus — confirmes-tu qu'on peut le graver
   comme défigé, ou tu veux le trancher toi-même avant que `dino-pmo` grave ?
3. **Libellé `NARRATRICE` en anglais** : je l'ai laissé non traduit (`**NARRATRICE**`) pour respecter la
   règle porte « libellés machine identiques dans toutes les langues » — mais cette règle a été écrite en
   pensant à `NARRATEUR H`/`WEX` (fiches), pas testée sur `NARRATRICE` (Voyage). Tu confirmes qu'on garde
   `NARRATRICE` tel quel en EN, ou tu veux `NARRATOR F` comme pour les fiches ?

---

_Rédigé 2026-09-05 par `dino-conseiller`. Fact-check Big Five : Grokipedia inaccessible (403), repli
National Geographic / MIT News / Britannica / Our World in Data / NPS, croisé 2-3 sources par fait._
