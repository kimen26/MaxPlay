# PROCESS — Dialogue pédagogique audio pour enfant 4 ans (réutilisable)

> Process forgé sur EP-039 (dino-encyclopédie, 2026-05-17). Qualité validée par Papa Yann.
> **À réutiliser pour TOUT contenu audio/dialogue pédagogique MaxPlay** (autres encyclopédies, histoires éducatives, mini-jeux narrés…).

## ⚓ Le process DINO est UNIQUE (gravé Papa Yann 2026-06-11)

C'est LE process de création de contenu dino — on fait comme ça, pas autrement. Il **emprunte** des outils aux pôles voisins **sans jamais les modifier** ; ce qui doit diverger vit ici, dans `studio/dino/`.

| On EMPRUNTE (lecture seule, jamais modifié pour dino) | On POSSÈDE (vit dans studio/dino/) |
|---|---|
| Skill `ecriture-audio-enfants` (métier écriture orale) | CE process doc |
| Skill `audio-direction-elevenlabs` (tags v3, graphie gras-séparé, ponctuation) | Template 4 blocs (`scripts-audio/_TEMPLATE-4blocs-dialogue.md`) |
| Agent `narration-lecteur` (panel enfants) — ⚠️ **PAS la dyade** | Charte figée dino (`figees/encyclopedie.md`) |
| Agents `game-conseiller` + `narration-conseiller` (double validation) | Banque questions d'enfants (ci-dessous, enrichie à chaque panel) |
| `voice-map.json` + MCP `studio_audiobook_from_segments_v2_dialogue` | Scripts dialogues + tables de vérité |

**Pourquoi pas la dyade** : la dyade simule un parent qui lit à voix haute (pôle narration, histoires). Les dinos = l'enfant **seul sur la tablette, qui réagit à la voix directement** → panel enfants direct (`narration-lecteur`, 2 enfants contrastés), c'est le test du vrai usage.

**Boucle interactions** : les vraies questions relevées par le panel deviennent les répliques de Wex des prochains dialogues (l'enfant du panel demande « il avait peur ? » → Wex posera cette question → le Narrateur répond). C'est la demande Papa Yann « leurs vraies questions → des interactions ».

## Pourquoi ce process

Un texte « correct » n'est pas un texte qui **accroche un enfant de 4 ans** et qui est **factuellement juste**. Il faut 3 regards complémentaires + des boucles de correction. C'est ce qui a fait passer les dinos de « bâclé » à « super quali ».

---

## La chaîne (ordre strict)

### 0. Charte FIGÉE d'abord
Avant d'écrire, figer les règles non-négociables (ce qui est voulu, ce qui est banni). Ex dino : noms latin/grec gardés, prédation vraie sans gore, cannibalisme bébé refusé, boucle fermée, surnoms affectueux (Tritri). Les conseillers/lecteurs **ne resignalent jamais** ce qui est figé.

### 1. Fact-check amont (si contenu factuel)
Agent spécialiste dédié → table de vérité **verbatim** (chiffres, étymologie, science). Ex : `_ETYMO-RACINES-50.md`, `_BLOC-B-CANONIQUE.md`. Les agents d'écriture recopient cette table, **interdiction de réinventer un fait**.

### 2. Écriture (découpage massif en agents parallèles)
1 agent par lot (groupe), template + charte + table de vérité en entrée. Réflexe Papa Yann : **« découpe et délègue en masse »** (9-11 agents //). Structure dialogue = **boucle fermée** : question → réponse TOUJOURS dans le même bloc, jamais de question en l'air.

### 3. Double validation conseillers (les 2, en //)
- **game-conseiller** : angle JEU / enfant 4 ans / Max → compréhensible ? rythme audio ? trop abstrait ? fautes TTS ? gore réel ? cohérence factuelle ?
- **narration-conseiller** : angle NARRATION / canon Wex / naturel → Wex fidèle ? questions fabriquées vs curiosité d'enfant ? ton Narrateur ? tic répété ? boucle bancale ?
→ Corrections **convergentes** appliquées (arbitrer les divergences avec Papa Yann).

### 4. Panel lecteur enfants (narration-lecteur)
Simuler **2 enfants 4 ans contrastés** (G vif / F calme-sensible). Réaction **instinctive phrase par phrase** : ce qu'ils comprennent/pas, questions spontanées, décrochages, moments WOW, ce qui fait peur. Verdict accroche /10 par fiche. C'est le test ultime du *ressenti*.

### 5. Corrections post-panel + re-vérif
Appliquer les corrections critiques. **TOUJOURS re-grep les anti-patterns + recompter** (un agent oublie/dérape — ex Gallimimus oublié, Coelophysis pas écrasé au bon endroit). Ne jamais faire confiance au rapport d'agent sans vérif machine.

### 5.5 — 🚧 CHECKLIST GARDE-FOU PRÉ-EL (barrière obligatoire avant toute génération)

> Codée depuis les retours d'écoute Papa Yann (REX pilotes 2026-06-11). **Chaque ligne se vérifie sur le texte AVANT de l'envoyer à ElevenLabs.** Une génération coûte des crédits — on ne paie pas pour réentendre une erreur déjà connue.

**A. PRONONCIATION** (→ détail : [`scripts-audio/_LEXIQUE-PRONONCIATION.md`](../scripts-audio/_LEXIQUE-PRONONCIATION.md))
- [ ] Tout nom savant est **respellé** selon le lexique (« Mo-sa-saure » pas « Mosasaurus », « Thé- » pas « The- »).
- [ ] **Aucune CAPITALE sur un mot court** (< 4 lettres) — « ROI » se lit « roui ». Emphase par la ponctuation.
- [ ] Décomposition syllabique sur la **forme française** (jamais « -sau-rus »).

**B. ÉTYMOLOGIE — toujours le sens**
- [ ] Quand on décompose un nom, **chaque morceau reçoit son sens** dans la foulée. Jamais lâcher « Tyranno… » sans dire « = le tyran ». (Un mot savant sans son sens = l'enfant décroche — cf L-D01.)

**C. PAS DE REDITE**
- [ ] Aucune image/idée n'est répétée d'un bloc à l'autre (ex : la branche sèche ET le bras = on tourne en rond). Une chose est dite **une fois**. Exception : si c'est **l'enfant (Wex) qui rebondit** dessus — là c'est voulu.

**D. COMPARAISONS DE TAILLE — 🔒 TABLE VALIDÉE, MESURES STRICTES** (Papa Yann 2026-06-11)
- [ ] ⚠️ **On N'INVENTE JAMAIS une comparaison.** Le système est **déjà codé** : `_compLong` / `_compHaut` / `_compPoids` dans `site/js/dinos-data.js` donnent **LA** comparaison validée de CHAQUE dino (garantie « ne ment pas > 10 % »). Le bloc Taille de l'audio **reprend MOT POUR MOT** la sortie de ces fonctions (long + haut + poids du dino).
- [ ] Pour obtenir les 3 phrases d'un dino : faire calculer `_compLong(taille_m)`, `_compHaut(hauteur_m)`, `_compPoids(poids_t)` (ou lire `_statsPhrase`). **Aucune comparaison hors de cette sortie.**
- [ ] Bannis ABSOLUS (mensonges déjà commis) : « aux chevilles » pour 2,5 m (faux : c'est « aussi haut qu'un but de foot »), « 2 piscines », « 2× Papa bras levés », « plus long que toi bébé », toute comparaison avec **« peut-être »** (si on ne sait pas, on ne le dit pas).
- [ ] Repères du référentiel (rappel) : enfant **1 m** · Papa **1,8 m** · but de foot **2,44 m** · panier basket **3,05 m** · bus 2 étages **4,4 m** · girafe **5 m** · lampadaire **6 m** · bus RATP **12 m** · bus accordéon **18 m**. Poids : chat 4 kg · enfant 16 kg · Papa 80 kg · vache 0,7 t · rhino 1,5 t · hippo 3 t · éléphant 6 t.

**E. MÉTAPHORES**
- [ ] Concrètes et **fluides**, jamais obscures. « Un éclair » → décrire l'action réelle (« il bondissait hors de l'eau et HOP »).

**F. CE QUI MARCHE (à garder)**
- [ ] Une solitude/un comportement étrange est **expliqué par du physique** (« territoire immense, il lui fallait trop de viande pour partager ») — l'enfant sensible reste sinon suspendu.

> ✅ Tout coché → on peut envoyer à EL. ❌ Une case vide → on corrige le **texte**, pas l'audio.

### 6. Hand-back Papa Yann → validation finale → prod audio
Audio (ElevenLabs text-to-dialogue) **seulement après** texte figé (chaque modif = re-génération payante).
**Réflexe préventif** : pour un nouveau lot, faire d'abord le **preview phonétique groupé** (1 clip qui dit tous les noms à risque, Papa Yann valide d'un coup) avant de produire les dialogues complets — cf `_LEXIQUE-PRONONCIATION.md` §4.

---

## Banque "inspiration questions/remarques" (issue des panels & conseillers)

Réutiliser ces **patterns de réaction enfant** pour écrire les dialogues Wex / questions pédagogiques :

**Questions d'enfant qui marchent (curiosité sensorielle, pas scolaire)** :
- « mais pour se défendre de qui ? » · « et il avait peur ? » · « à quoi ça servait, ses petits bras ? »
- « il jouait avec personne alors ? » · « ils étaient tout seuls sans les autres ? »
- recomposition de mot : « ...donc ça veut dire "face à trois cornes" ?! »
- ancrage corps/quotidien : « il m'arrivait au nombril ?! » · « aussi lourd que MOI ? » · « comme Minou (mon chat) ? »
- casser un mythe : « le film ne dit pas la vérité ? »
- *(panel pilotes V2, 2026-06-11)* : « il vivait tout seul ? il avait pas de famille ? » · « comment il voyait ce qui volait au-dessus, il regardait vers le haut sous l'eau ? » · « il était triste d'être tout le temps dans l'eau ? » · « c'est le champion des griffes ? » · « mais pourquoi la nature fait des surprises ? »

**À BANNIR (détecté par les conseillers)** :
- fausse question évidente (« il avait des pattes ? »)
- fausse joie plaquée (« WAOUH SUPER GÉNIAL !! »)
- constat « Wex-le-sage » grave (« rien que pour manger », « il était vraiment seul »)
- écho (Wex répète la phrase du Narrateur)
- question scolaire/comparative-analytique (« pourquoi un petit groupe et pas un grand troupeau comme les autres ? »)
- abstraction empilée (« arrière-arrière-arrière-petits-enfants », gros nombre nu pour le temps)
- méta-explication adulte (« c'est son surnom affectueux, pour les gens qui l'aimaient »)
- mot savant non posé / lâché dans le vide
- > 2 racines décomposées à l'oreille (le 3e morceau se perd)

**Leviers d'accroche enfant (à privilégier)** :
- comparaison physique immédiate (bus de Paris, Papa, éléphant, "comme toi")
- onomatopée à imiter (CRACK, BOOM, HONK)
- surnom affectueux personnel (Tritri)
- l'enfant DEVINE avant le perso (recomposition de nom → fierté)
- finir le bloc sur émerveillement, jamais sur du grave

---

## Outils techniques associés
- Conversion script md → JSON text-to-dialogue : `_md2json.cjs`
- Génération audio : `_gen-audio-top.sh` (curl text-to-dialogue, délai 8s anti rate-limit, --max-time 180)
- Recap = ffmpeg concat des blocs + silence 0.5s (coût API zéro)
- Voix figées : Narrateur H `cbRcktt2xvoeFpdvW2wg`, Wex `G54e8CyYslC2Y4ZupTlg` (v24)

_Référence : EP-039. Auteur process : session 2026-05-17, validé Papa Yann « super quali »._
