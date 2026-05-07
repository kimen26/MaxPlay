# Décisions de fond — PMO Narration

> **Règle :** Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée.
> En cas de doute : la dernière décision sur un sujet écrase les précédentes.

---

## 2026-05-08 — Étape 9 (re-relecture) : panel complet 20 lecteurs

**Décision** : L'étape 9 du PROCESS militaire (re-relecture du rewrite) se fait avec le **panel complet 20 lecteurs**, pas une sélection ciblée de 3-4.

**Raison** : Papa Yann : *"le 9 relecture je veux bien tout le monde denouveau les 20"* — après le rewrite, valider auprès du panel complet que la version finale tient sur toutes les tranches (3-5 ans tranche A + 6-7 ans tranche B, tous genres + dyades).

**Impact sur `equipe/PROCESS.md`** : étape 9 révisée — output devient 20 fiches (non plus 3-4 + 1 contrôle). Synthèse finale avant étape 10 (canon).

**Statut** : À appliquer à partir de la prochaine histoire réécrite (003-v2 ou 005 selon situation).

---

## 2026-05-08 — Procédure PMO : classification et routing automatiques

**Décision (opérationnelle)** : Le PMO est déclenché **automatiquement et systématiquement** dès que du contenu narration passe en conversation. La procédure suivante s'applique à la fin de chaque salve Directeur/Conseiller :

### Classification (pour chaque input utilisateur)

L'input tombe dans **l'une de ces 6 catégories** :

| Catégorie | Signe | Action PMO |
|-----------|-------|-----------|
| **DÉCISION** | « Je décide que... » / « À partir de maintenant... » / acte volontaire d'arbitrage | → `pmo/decisions.md` + entrée datée + résumé raison + impact fichiers |
| **LEÇON** | Observation du writer / lecteur / test qui révèle un pattern récurrent | → `equipe/lecons-vivantes.md` + section HISTOIRE + ajout pattern/piège/axe |
| **TODO** | Chantier identifié mais non traitée aujourd'hui — dépend d'autre chose ou attend prochaine session | → `pmo/backlog.md` + ticket STORY/PERSO/UNIVERS/ARCHI/INPUT + priorité + assigné |
| **QUESTION OUVERTE** | Arbitrage nécessaire mais pas tranché → reste question, attend réponse explicite | → `pmo/decisions.md` section "Questions ouvertes" + lien fichier source |
| **INFO** | Contexte, état, rapport — rien à décider maintenant | → `pmo/sprint-log.md` section "État au reboot" OU ignored si redondant |
| **TRAITEMENT IMMÉDIAT** | Correction factuelle, refonte opérationnelle, mise à jour structurelle → agir **maintenant** | Agir + documenter action dans `sprint-log.md` |

### Routing (qui fait quoi)

- **DÉCISION** : PMO enregistre. Directeur applique immédiatement ou délègue agent concerné.
- **LEÇON** : PMO enrichit `lecons-vivantes.md`. Conseiller valide la formulation pour futures histoires.
- **TODO** : PMO crée ticket. Auteur décide priorité et assigné à prochaine session.
- **QUESTION** : reste dans backlog § Questions ouvertes jusqu'à Papa Yann tranche.
- **INFO** : PMO note, pas d'action requise.
- **TRAITEMENT** : PMO exécute (edits, créations, mises à jour index), log dans `sprint-log.md`.

### Timing

- **À chaque réponse Directeur/Conseiller** : PMO scanne les outputs narratifs (pitch, plan, briefs, sélection, etc.)
- **Avant de rendre la main à l'auteur** : PMO valide checklist (voir section Remise main ci-dessous)
- **Pas attendre la fin de session** : classification live, mi-session si besoin

### Remise main à l'auteur (checklist PMO avant "fin de session")

Avant de dire "OK on a terminé", le PMO vérifie :

- ✅ Tous les DÉCISIONS de la session → `decisions.md` avec date + raison
- ✅ Tous les LEÇONS → `lecons-vivantes.md` enrichi OU noté dans `sprint-log.md` si trop tôt
- ✅ Tous les TODO → `backlog.md` avec ticket + priorité (jamais plus de 3 actifs)
- ✅ Toutes les QUESTIONS → `decisions.md` § Questions ouvertes OU résolues si Papa Yann a tranché
- ✅ `sprint-log.md` entrée datée avec "État au reboot" (= ce que le prochain agent doit savoir)
- ✅ INDEX.md et cartographie à jour si structure a changé (fichiers créés/supprimés/renommés)
- ✅ Aucun kanban.md désalignés (étapes en cours = correctes vs réalité)
- ✅ Pas de références cassées (fichiers mentionnés dans `decisions.md` ou `PROCESS.md` mais inexistants)

Si un élément manque → flag auteur avant remise main : *"⚠️ PMO — [catégorie] : [ce qui manque] → faire X avant de rendre la main"*.

**Raison** : Papa Yann : *"OK on a livré quoi ? todo à jour les proces équipe blabla index claude tout est bon je te donne la main etc..."* — besoin de checklist systématique, pas de bricolage ad-hoc.

---

## 2026-05-07 — Refonte LLM + casting writers 10 versions (libre + guidé)

**Décisions** :

1. **LLM mis à jour** ([infra/mcp/MODELS.md](../../infra/mcp/MODELS.md)) :
   - Grok : `grok-4-fast-non-reasoning` → `grok-4.3` + `reasoning_effort: "low"` (juste au-dessus de none, évite le thinking long)
   - Kimi : suppression du paramètre `mode` (le mode `story`/moonshot-v1-32k ne marchait plus). Mono-mode `kimi-k2.6` non-thinking sur `api.moonshot.ai`
   - DeepSeek : `deepseek-chat` → `deepseek-v4-pro` non-thinking (défaut), `deepseek-v4-flash` en option. Promo -75% sur V4-Pro **jusqu'au 2026-05-31** (rappel sprint-log)
   - Tous en **non-thinking** : décision John "pas de thinking mode" — réponses one-shot, pas de raisonnement qui lisse la créativité
   - Claude writers : `sonnet` → `claude-opus-4-7` (test du saut de modèle pour décaler le rang Claude qui plafonnait à 3-4)

2. **Casting writers passe de 8 à 10 versions** :
   - 2 Claude (Opus 4.7, libres)
   - **3 Kimi libres** + **1 Kimi guidé** (= 4 Kimi total, justifié par domination Kimi en Tour 2/3)
   - 2 DeepSeek (V4-Pro, libres)
   - 2 Grok (4.3, libres) — "deuxième chance" après bottom unanime, saut de génération majeur

3. **Séparation libre / guidé** :
   - **9 writers LIBRES** : reçoivent uniquement règles de FORME (ouverture courte, geste avant parole, fin image, longueur, promesse du titre). **Aucune indication de contenu** (pas d'animal, d'onomatopée, d'objet imposé). Variance native préservée. Template : [`brief-writer-libre.template.md`](../equipe/templates/brief-writer-libre.template.md)
   - **1 writer GUIDÉ** : reçoit en plus l'**Annexe AXES 1-6** issue des 100+ relectures (créature vivante, geste avant parole, onomatopée légère, fin rituel, mystère vs résolution, faute volontaire). Active 2-3 axes max, jamais 4+. Template : [`brief-writer-guide.template.md`](../equipe/templates/brief-writer-guide.template.md). Agent : [`narration-writer-kimi-guide`](../../.claude/agents/narration-writer-kimi-guide.md)

4. **Checklist auto-cohérence en fin de brief (tous writers)** : passe factuelle 30s avant remise (prénoms, lieux, objets cohérents). Pas de réécriture créative — corrige uniquement les bugs. Une 2e passe créative dilue la voix one-shot.

5. **Étape 7 Rewrite formalisée comme consolidation** : pas une réécriture from-scratch — base + 2-3 greffes d'ingrédients gagnants identifiés en sélection. Spine de la base intacte. Pas de Frankenstein. ([`PROCESS.md`](../equipe/PROCESS.md) §7)

6. **Lecteurs témoins** : passe de 4 (2 enfants + 2 dyades) à **6** (2 enfants G+F + 4 dyades papa-G/papa-F/maman-G/maman-F). Reflète le protocole utilisé en Tour 2/3 et la richesse des retours par genre/parent.

**Raison** : Verdict consolidé Tour 2/3 (003-v2 + 004) = Kimi domine (kimi-run1 #1 chez 5/6 lecteurs sur 004), Grok bottom unanime, Claude plafonne 3-4. Le test température réelle (004) a confirmé que la formule structure prime sur l'angle. On exploite cette connaissance via le writer guidé sans casser la créativité des libres.

**À surveiller** :
- Coût DeepSeek-V4-Pro après 2026-05-31 (fin promo) → bascule possible vers V4-Flash
- Kimi K2 series discontinued 2026-05-25 (K2.6 reste OK mais surveiller release notes)
- Si les 4 Kimi convergent trop, perte de variance inter-LLM → à mesurer après 3-5 histoires

**Impact fichiers** :
- Modifié : [`infra/mcp/server.ts`](../../infra/mcp/server.ts), [`PROCESS.md`](../equipe/PROCESS.md), [`narration-writer-claude-libre.md`](../../.claude/agents/narration-writer-claude-libre.md)
- Créé : [`MODELS.md`](../../infra/mcp/MODELS.md), [`narration-writer-kimi-guide.md`](../../.claude/agents/narration-writer-kimi-guide.md), [`brief-writer-libre.template.md`](../equipe/templates/brief-writer-libre.template.md), [`brief-writer-guide.template.md`](../equipe/templates/brief-writer-guide.template.md)
- Mémoire MaxPlay : `feedback_kimi_mode_code.md` mise à jour (mode unique désormais)

---

## 2026-05-05 — Switch casting V1 : Type 4 Jérémie/M → Madeleine/F

**Décision** : Type 4 (Individualiste / Fréquence) passe de **Jérémie (M, diminutif Jérem)** à **Madeleine (F, diminutif Madie)** pour rééquilibrer le casting V1 français de **3F/6M vers 4F/6M**.

**Raison** : Parité plus saine pour identification fillettes + meilleure répartition des profils vocaux TTS multilingues. Archétype féminin Marie-Madeleine (Évangile) cohérent avec lignée "casting Christ" V1.

**Impact** :
- Tous les fiches perso type-04/ : réécriture prénom + pronoms (M→F)
- Fiches type-01 à 09 et Wex : mise à jour pronoms dans relations.md et caractere.md
- Ennéagramme : casting-mapping.md, README.md, guide-auteur.md, situations/emotions-universelles.md, situations/interactions.md
- Univers : sensibilites.md, compagnons.md
- Voix : renommage type-04-jerem.md → type-04-madie.md, README.md, _CHEATSHEET-WRITERS.md
- Token `titi_4_fr` : inchangé

**Phonétique vérifiée** : Madie distinct de tous autres diminutifs (Wex/Melki/Mimi/Polo/Lulu/Pierrot/Raph/Juju/Nono).

---

## 2026-05-04 — Refonte 003-v2 Tour 2 : trio + variance + lecteurs

**Décisions** :
- Trio 003-v2 = **Wex + Raph (T7, fille) + Pierrot (T6, garçon)**. Raph remplace Melki (deux calmes 1+6 ne créaient pas assez de friction lisible en arc 1).
- **Variance writers** abandonnée (Sobre/Sensoriel/Dynamique/Instinct n'ont pas apporté de valeur). Nouveau schéma : **8 runs natifs** = 4 LLM × 2 runs avec températures légèrement différentes. Brief strictement identique pour les 8 runs.
- **Lecteurs étendus à 6** : 2 enfants seuls (garçon + fille) + 4 dyades (papa+garçon, papa+fille, maman+garçon, maman+fille). Objectif secondaire : observer si la narration colle mieux voix féminine ou masculine pour TTS futur.
- **Patte MaxPlay enrichie** : règle « **promesse du titre** » sous pilier B. Le Ten transforme la promesse, le Ketsu la résout — il ne l'élude jamais.
- **Sons-bouche** (floc-floc, glou-glou, tss-tss, tac-tac…) → mémoire Conseiller (pattern sélection), **pas brief writer** (risque fabrication forcée).
- **Brief personnages enrichi** avec exemples concrets de réaction par perso dans une situation-type non-pont (pas de chorégraphie de l'histoire — juste illustration du moteur sans le nommer).

**Pourquoi** : leçons Tour 1 003-v2 (8 versions writers + 4 lecteurs témoins, supprimées). Voir `equipe/memoire-conseiller.md` section *Patterns sélection — observations Tour 1 003-v2*.

---

## 2026-05-03 — PMO devient relecteur des briefs writers (anti-négation gratuite)

**Décision** : avant qu'un brief writer parte aux runs étape 4, le PMO fait une passe mécanique de relecture (grep négations + test règle F : un writer naïf évoquerait-il spontanément le sujet ?). Si non → alerte le Directeur. Tant que des négations gratuites restent, kanban étape 4 = 🔴 BLOQUÉ.

**Pourquoi** : sur 003-v2, plusieurs négations gratuites ont été détectées par Papa Yann lui-même au 3e tour de relecture ("pas de pouvoirs", "pas de bloc séparé", etc.). Ce travail mécanique n'est ni technique ni stratégique → Haiku PMO suffit, soulage Papa Yann, fluidifie le PROCESS.

**Comment** : voir `.claude/agents/narration-pmo.md` section "Relecteur des briefs writers".

---

## 2026-05-03 — Critères patte Papa Yann retirés du brief writer

**Décisions** :
- **Critère 9 (distribution sensorielle)** : retiré du brief writer. **Au choix du writer**, parfois un gros moment sensoriel concentré sert mieux que la distribution. Pas une règle.
- **Critère 13 (épilogue italique / "texte finit là où il finit")** : retiré du brief writer. Négation gratuite (un writer naïf n'y penserait pas). Reste règle de relecture Directeur si jamais un writer en met un.

**Pourquoi** : appliqué règle F sur le writer-package — si un writer naïf n'évoquerait pas spontanément le sujet, on ne le mentionne pas dans le brief.

---

## 2026-05-03 — Patte Papa Yann : refonte critères 6, 7, 13, 14, 15 + suppression mention passé simple et tirets cadratins

**Décisions** :
- Mots forts/sombres : liste explicite d'interdits durs (mort/crever/clochard/pédocriminel/pistolet/pute/enculer + famille) ; tout autre vocabulaire dur passe s'il a un sens.
- Passé simple : pas de règle pour ou contre, affaire de style writer.
- Tirets cadratins : sortis du brief writer (Papa Yann ne les utilise jamais, GateKeeper attrape les usages ambigus).
- Épilogue italique : reformulé en positif ("le texte finit là où il finit").
- Morale : leçon vécue par les personnages OK, leçon dite par narrateur ou explicitée à la fin = NO.
- Critère 15 (négations gratuites) : reste règle interne Architecte/Directeur/notes, pas writer.

**Pourquoi** : un brief writer doit donner des règles digérées et positives. Les exemples de bugs 001/002 polluent le brief sans aider le writer naïf. Application immédiate sur 003-le-pont-casse-v2.

---

## 2026-05-03 — Briefs writers autoporteurs (writer-package)

**Décision :** Pour chaque histoire, le Directeur produit un fichier `briefs/_writer-package.md` **autoporteur, identique pour les 8 runs**. Contenu inliné (pas de "cf fichier X") car Kimi/DeepSeek/Grok via MCP n'ont pas accès au filesystem.

Pour les 4 runs angularisés (2 Claude + 2 Kimi), on envoie le **même** writer-package + 1 ligne d'angle ajoutée à la fin. Aucune autre différence.

**Pourquoi :** équité de traitement entre les 8 runs, comparabilité du test PROCESS, garantie que tous les writers ont la même information de base.

---

## 2026-05-03 — Saison printemps par défaut sur tout arc 1

**Décision :** Tout l'arc 1 (objet/décor bienveillant) se passe au **printemps** par défaut. Décision facilitante.

**Lien :** `arcs/arc-1-objet-decor/fiche.md` (section Cadre cyclique).

---

## 2026-05-03 — Règle Directeur : relire decisions.md avant tout brief

**Décision :** Avant tout brief / livrable / décision proposée, le Directeur relit `pmo/decisions.md`. Si une question a déjà été tranchée, il l'applique — ne la repose pas.

**Pourquoi :** sur le brief 003-v2, le Directeur a reposé la question "Option A vs B variance writers" alors qu'elle était tranchée le 2026-04-30 (8 versions = 4 base + 2 Claude angularisés + 2 Kimi angularisés). Perte de temps + confusion auteur.

---

## 2026-04-30 — Saison 1 : 4 axes narratifs

**Décision :** La saison 1 s'articule autour de **4 axes** (et non 3) :

1. **Arc 1 — histoires-objet / élément de décor** : bienveillantes, simples, fluides. On apprend à connaître les voix des personnages. Que du gentil. **Priorité actuelle.**
2. **Arc 2 — la Parole** : poids des mots, "je veux plus être ton copain", "si c'est comme ça je joue plus avec toi". Résonance directe avec ce que Max vit en ce moment IRL.
3. **Arc 3 — original-dans-le-naturel** : objet ou lieu **spécifique à notre univers** (bus à techno, immeubles raréfiés, plantes/eau au fonctionnement différent, bioélectricité contre allergies, etc.).
4. **Arc 4 (fil rouge transversal) — pouvoirs de Wex** : il prend conscience progressivement qu'il peut voir quand ça ne va pas, projeter le futur proche en semi-transparence sans altérer le présent, revivre/ajuster son comportement et comprendre les conséquences.

**Raison :** Recadrage Papa Yann 2026-04-30 — la "Série La Parole" préexistante est rangée dans l'arc 2. L'arc 1 doit rester ultra-simple/bienveillant pour faire connaître les persos avant tout reste.
**Liens :** `archive/sessions/2026-04-30-brainstorm-arcs-style-gabarit.md`

---

## 2026-04-30 — Arc 1 : format duos

**Décision :** Pour l'arc 1, chaque histoire = **1 objet (titre) + 2 ou 3 persos + Wex présent**.

**Raison :** L'amitié se montre mieux à plusieurs (un perso seul s'explique, à 2 il existe par contraste). Couvre le casting plus vite. Les ennéatypes se révèlent par friction douce, jamais nommée.
**Wex en arc 1 :** présent en témoin silencieux, **pouvoirs PAS encore activés** (l'arc 4 viendra plus tard dans la saison).

---

## 2026-04-30 — STORY-003 à 006 en pause (pas supprimés)

**Décision :** Les histoires 003 *La Confidence* (workshop), 004 *Cartable-à-trou* (pitch), 005 *Le Mardi* (pitch), 006 *Sept à rien* (pitch) sont **mises en pause**, à reprendre quand l'arc 1 sera bouclé. Elles relèvent toutes de l'**arc 2 (Parole)**.

**Raison :** Papa Yann veut prioriser l'arc 1 (rencontre des persos via objet/décor bienveillant) avant de revenir à la tension de la Parole. Aucune suppression — la matière est conservée intacte dans `stories/003-la-confidence/`, `stories/004-cartable-a-trou/`, `stories/005-le-mardi/`, `stories/006-sept-a-rien/` (post-migration workshop→stories du 2026-04-30).

---

## 2026-04-30 — Mode archivage live des sessions brainstorm

**Décision :** Pendant les sessions de brainstorm, l'orchestrateur (Claude principal) tient à jour **en continu** :
- `INBOX.md` : ce qui est en cours, en cours d'arbitrage
- `pmo/decisions.md` : dès qu'un point est tranché par Papa Yann, il y est migré immédiatement
- `archive/sessions/<date>-<sujet>.md` : trace brute complète de la session (toutes les positions et leur évolution)

**Pas attendre la fin** d'une session pour archiver. Toutes les 2-3 réponses, mise à jour.
**Raison :** Papa Yann : *"si on note à la fin on va tout perdre"*.

---

## 2026-04-30 — Patte narrative MaxPlay : B noyau + D voix + C cadre + outils ponctuels

**Décision (chantier 1 — style narration tranché) :**

La patte narrative MaxPlay s'écrit sur 3 piliers, complétés par 2 outils ponctuels et 1 outil reporté :

### Piliers (présents dans toute histoire)

1. **B — Kishōtenketsu (noyau structurel)** : Ki / Sho / Ten / Ketsu. Pas d'antagoniste. Bascule de perception, pas combat. Confirmé pilier absolu.
2. **D — Tranche de vie (voix d'écriture)** : précision sensorielle, gestes ordinaires, dialogues qui sonnent vrai, pas de grandiloquence. Avec **micro-Ten** ajouté pour Max 3.5 ans (le camion qui passe, la lumière qui change) — D pur sans accroche est risqué à cet âge.
   - *Référence interne :* mini-scénario *Le verre de Mimi* (archive 2026-04-30)
3. **C — Cycle (cadre d'arc)** : un même cadre revient sur plusieurs histoires d'un même arc (lieu, moment, type d'objet) pour que la reconnaissance soit du plaisir. Comme Tayo (rituel dépôt→mission→dépôt).

### Outils ponctuels (utilisés à la demande, pas en pilier)

4. **E — Trickster** : un perso fait un truc inattendu, **sans méchanceté ni dégradation**. Raph (T7) = porteur naturel mais n'importe qui peut le porter ponctuellement.
   - **Dosage : avec parcimonie** (Papa Yann : "je suis 7 donc ça m'attire, avec parcimonie")
   - Garde-fou : ne blesse personne, ne dégrade rien
   - *Référence interne :* mini-scénario *Raph et le banc* (archive 2026-04-30)

5. **A doux — Conflit émotionnel (réservé arc Parole)** : pas de violence physique, mais **tristesse / conséquence émotionnelle visible**.
   - À utiliser dans l'arc 2 (Parole), pas dans l'arc 1
   - **PAS** une famille F (morale dite) — c'est un **B avec un Ten lourd = conséquence concrète non commentée**. Le récit montre, ne dit pas. Aucun adulte qui tire la leçon, aucun enfant qui s'excuse vite.
   - *Référence interne :* mini-scénario *Le mot dit* (archive 2026-04-30)

### Outil reporté

6. **Coloration de voix culturelle** : quand un casting culturel autre (BR, JP, etc.) sera ouvert, la **voix narrative** (rythme, structure de phrase, références sensorielles) s'adaptera, mais le **sens du texte reste invariant**. Aujourd'hui casting France seul → aucune décision à prendre maintenant. Décor/biome (mer, montagne, pluie, saison) reste un paramètre libre du brief de chaque histoire.

### Familles écartées

- **F (morale explicite dite)** : écartée définitivement. Aucun narrateur ne tire la leçon, aucun perso ne dit "j'ai compris". Le lecteur (parent qui lit) commente s'il veut.

### Brief writers en 1 phrase

> *"Kishōtenketsu noyau (B) + voix tranche de vie (D) + cadre cyclique de la série (C). Pour l'arc 2 Parole : Ten = conséquence visible jamais commentée."*

**Raison :** Max nourri par Tayo (C+A soft) + Ghibli (B pur) + Stitch (A doux) — sa réceptivité au B est déjà installée. À 3.5 ans, la causalité "parce que" s'installe → le Ten du Kishōtenketsu devient lisible. Mono-fil obligatoire (B-plot impossible avant 6-7 ans).

**Liens :**
- `archive/sessions/2026-04-30-brainstorm-arcs-style-gabarit.md` (matière brute + 5 mini-scénarios castés)
- `equipe/sources-narratologie.md` (panorama 6 familles narratives mondiales + tableau ToM par âge)

---

## 2026-04-30 — Gabarit d'épisode : MOYEN (4 cases) avec qualité/problématique au niveau arc

**Décision (chantier 2 tranché) :**

### Gabarit pitch standard = MOYEN (4 cases)

```
- Objet titre : <le centre de gravité>
- Duo + Wex : <2-3 persos> · Wex présent
- Lieu : <puisé dans univers/, déjà connu>
- Moment d'ouverture (1 phrase, OPTIONNEL si l'objet est fort)
```

### Qualité humaine + problématique implicite = NIVEAU ARC

Ces deux dimensions ne sont **plus dupliquées dans chaque pitch d'histoire**. Elles sont préparées **une fois par arc**, dans la fiche de l'arc, et partagées entre toutes les histoires de l'arc.
- Arc 1 (objet/décor bienveillant) : qualité d'arc à définir (probablement *"présence"* ou *"voir l'autre"* — à trancher quand on prépare l'arc)
- Arc 2 (Parole) : qualité = *"les mots qui blessent ont des conséquences réelles, jamais commentées"* (déjà acté)
- Arc 3 (univers spécifique) : qualité à définir
- Arc 4 (pouvoirs Wex) : qualité à définir

### Statut des pitches existants

- **003 *La Confidence*, 004 *Cartable-à-trou*, 005 *Le Mardi*, 006 *Sept à rien*** : pitches COMPLETS conservés tels quels (sunk cost utile, sont en pause arc 2)
- **Stock `axes-histoires-en-stock.md`** (15 axes H-XX + T-XX) : à convertir au format MOYEN. Colonnes "Qualité humaine" et "Problématique implicite" remontent au niveau arc.

### Règle de révision

Après 5-6 histoires écrites en gabarit MOYEN : point de revue. Si writers tapent à côté trop souvent → ajout du Ten visé. Si ça vole → maintien MOYEN, voire test MINIMAL ponctuel.

**Raison :**
- Le moment d'ouverture en 1 phrase est le vrai filtre éditorial — il dit si une histoire vaut le coup
- COMPLET trahit la patte (D voix tranche de vie demande au writer de trouver le détail vrai dans l'instant, pas d'exécuter un Ten pré-spécifié — leçon V2 *Parapluie oublié*)
- Coût de paramétrage compatible avec la fatigue Papa Yann (5 pitches en 15 min vs 2h en COMPLET)
- Garde-fous délégués aux fiches stables (perso → ennéatype, univers → lieu, arc → motif)

**Liens :** `archive/sessions/2026-04-30-brainstorm-arcs-style-gabarit.md` (mini-scénario comparé *La pierre tiède*)

---

## 2026-04-30 — Cascade documentaire post-décisions (chantiers 1 + 2)

**Décision :** Les décisions stratégiques (`pmo/decisions.md`) doivent **descendre** dans les fichiers opérationnels lus par les agents exécutants (writers, architecte, gatekeeper). Sinon décisions "mortes" en PMO.

### Cascade à appliquer

| Décision | Atterrit dans | Lu par |
|---|---|---|
| Patte B+D+C + brief writers en 1 phrase | `equipe/voix-maxplay.md` *(à créer)* | Writers, Architecte, Dir |
| Outils E (parcimonie) + A doux (Ten lourd arc Parole) + F écartée | `equipe/sources-narratologie.md` (MAJ section "patte MaxPlay") | Conseiller, Architecte |
| 3 mini-scénarios canon (*Verre Mimi*, *Raph banc*, *Mot dit*) | `equipe/exemples-canoniques.md` *(à créer)* | Writers (référence concrète) |
| Décor/biome paramètre libre | `equipe/templates/pitch.template.md` + `stories/_gabarit/pitch.md` (champ optionnel) | Tout pipeline |
| Voix culturelle reportée à 2e casting | `personnages/prénoms-par-origine.md` (note bas) | Future ouverture casting |
| Gabarit MOYEN 4 cases | Réécrire `axes-histoires-en-stock.md` + MAJ `equipe/templates/pitch.template.md` + `stories/_gabarit/pitch.md` | Conseiller, Architecte |
| Qualité/problématique niveau arc | Nouveau dossier `arcs/` (1 fiche par arc) | Conseiller, Architecte |

**Statut :** À exécuter après que Papa Yann aura validé la cascade et le chantier 3 (lecture critique des histoires existantes).

---

## 2026-04-30 — Chantier 3 reformulé : lecture critique avant écriture

**Décision (reformulation chantier 3) :**

Papa Yann n'a **lu aucune des 3 histoires existantes** (001 Pont Cassé canon, 002 Rire qui reste canon, 003 La Confidence workshop). Avant d'écrire toute nouvelle histoire, il veut :
1. Lire les 3 textes existants
2. Critiquer librement (style, voix, dialogues, sensibilité, sobriété, etc.)
3. Nourrir `memoire-conseiller.md` + `memoire-dir.md` avec ses remarques
4. Décider garder / affiner / jeter chacune

**Raison :** Papa Yann : *"je n'ai lu AUCUNE des histoires jusque-là, justement je veux me pencher là-dessus. Si on a déjà des existantes je ferai mes remarques dessus, ça sera toujours utile et précieux. Si c'est nul on repartira de 0, si c'est bien ou presque on affinera sur l'existant."*

→ Plus rigoureux que la proposition initiale d'écrire *La pierre tiède* sans avoir évalué les canon existants.

---

## 2026-04-30 — Renommage John → Papa Yann (auteur principal)

**Décision :** L'auteur principal du projet MaxPlay s'appelle **Papa Yann** (pas "John" comme erronément écrit dans plusieurs fichiers depuis le début du chantier process militaire). Renommé partout dans `narration/**/*.md` (sauf 2 archives historiques où la trace reste).

**Raison :** Erreur de l'orchestrateur (probable projection automatique). L'auteur s'est manifesté : *"Je ne m'appelle pas John c'est Papa Yann remplace everywhere."*

---

## 2026-04-30 — Patte Papa Yann (auteur) : 7 reproches récurrents + checklist GateKeeper renforcée

**Décision :** Création d'un fichier dédié [`equipe/patte-papa-yann.md`](../equipe/patte-papa-yann.md) qui distille la sensibilité personnelle de l'auteur après ses 3 relectures critiques (001, 002, 003) le 2026-04-30.

### 7 reproches récurrents identifiés
1. **Narration jugeante** (anti-superlatif, anti-jugement) — *"comme toujours", "le plus rapide", "trop fort", "inutile"*
2. **Prose qui fait littérature** — passé simple, métaphores doubles, comparaisons obscures
3. **Cohérence narrative de fer** — physique, numérique, référentielle
4. **Univers IMPLICITE strict** — aucun élément non attesté dans `univers/` (ex 003 « Maison Commune » → invention writer rejetée)
5. **Lexique sombre interdit** — pas de "mort", pas de mots adultes abstraits ("communal")
6. **Lecture orale fluide** — pas saccadée, pas de tirets cadratins ambigus, pas d'expression inventée
7. **Distribution sensorielle** — saupoudrée, pas concentrée en bloc

### Règles ajoutées
- **Casting phonétique** : éviter les surnoms phonétiquement proches dans une même histoire (Nono+Polo = bug confirmé sur 002)
- **Âge des persos secondaires** : si les héros ont 3.5-4-5 ans, les "plus petits" qui apparaissent ont 2-3 ans (pas 6)

### Renforcement GateKeeper
La checklist GateKeeper passe de **15 critères techniques** à **15 + 11 = 26 critères** (techniques + patte Papa Yann). Une histoire qui passe la checklist technique mais échoue sur la patte = NON PASS. Voir [`equipe/memoire-gatekeeper.md`](../equipe/memoire-gatekeeper.md).

**Raison :** **003 La Confidence a passé 8/8 critères techniques mais reste mauvaise** selon Papa Yann → preuve que la checklist d'origine ne suffit pas. La patte Papa Yann + cohérence stricte sont nécessaires.

---

## 2026-04-30 — STORY-001 V2 nécessaire (refonte intégrale)

**Décision :** L'histoire 001 *Le Pont Cassé* (canon V1 depuis 2026-04-24) nécessite une **refonte intégrale** via le nouveau PROCESS militaire 9 étapes.

**Raisons :**
- Adulte en scène (Monsieur Ferretti) — viole règle saison 1 actée le 2026-04-29 (postérieure à la canonisation)
- Possible confusion ennéatype Juju/Melki (à vérifier)
- Épilogue italique (règle anti-épilogue actée le 2026-04-28)
- 4 patterns Papa Yann détectés (jugement, lexique adulte, incohérences, lexique sombre)

**Action :** lancer le PROCESS standard. La V1 reste en `_archive/v1-2026-04-24.md`. Idées Papa Yann pour la V2 dans `stories/001-le-pont-casse/lecteurs-temoins/papa-yann-relecture-2026-04-30.md`.

---

## 2026-04-30 — STORY-002 V2 nécessaire

**Décision :** L'histoire 002 *Le Rire qui reste* (canon V1 depuis 2026-04-28) nécessite une **V2** via le nouveau PROCESS.

**Raisons critiques :**
- Casting phonétique Nono+Polo = confusion → **un des deux à changer** (celui qui tombe reste garçon)
- Incohérence physique (ballon "chaud du bois du banc" sur les genoux)
- Pronom ambigu (qui lance vers Polo ?)
- Expression inventée ("jouer avec une dent en moins")
- Style trop saccadé pour lecture orale parent
- Détails sensoriels concentrés en bloc (au lieu de distribués)
- Reste rattachée à arc-2 Parole (en pause)

**Action :** la V1 reste canon (la V2 sera traitée à la reprise de l'arc 2). Détails dans `stories/002-le-rire-qui-reste/lecteurs-temoins/papa-yann-relecture-2026-04-30.md`.

---

## 2026-05-02 — RÈGLE ABSOLUE : agent manquant = STOP + alerte auteur

**Décision Papa Yann (non-négociable) :**

> *« Quand un truc est manquant ou non fonctionnel dans notre process militaire, tu sors et tu me demandes. TOUJOURS. »*

**Application stricte :**

- L'orchestrateur (Claude principal) ou tout agent **NE DOIT JAMAIS** se substituer à un autre agent indisponible
- Si un agent défini dans `.claude/agents/` n'est pas chargé en session courante → **STOP immédiat**, alerter Papa Yann, proposer redémarrage de session
- Pas de "mode dégradé manuel" sur les rôles process (PMO, Architecte, GateKeeper, Conseiller, Directeur, Writers, Lecteurs, Archiviste, Science, Sensibilité, Localisation, Audio)
- Ce qui peut rester orchestrateur : navigation fichiers, archivage live, exécution scripts, mises à jour techniques (renommages, suppressions validées) — **PAS** le travail créatif/éditorial des agents dédiés

**Raison :** la patte/qualité d'un agent dédié (modèle adapté, prompt système spécifique, mémoire propre) ne peut pas être imitée correctement par l'orchestrateur. Une histoire écrite par "Claude qui imite le Directeur" ne sera pas une histoire MaxPlay validée.

**Cas concret 2026-05-02 :** session courante avait `narration-pmo`, `narration-architecte`, `narration-gatekeeper` non chargés. → Décision Papa Yann : redémarrer la session plutôt que de me laisser faire à leur place.

**Action standard quand un agent manque :**
1. STOP — ne pas tenter de substitution
2. Identifier précisément quel(s) agent(s) manque(nt)
3. Alerter Papa Yann avec le nom exact des agents indisponibles
4. Proposer redémarrage de session (les `.md` étant déjà sur disque)
5. Reprendre où on s'était arrêté à la prochaine session

---

## 2026-05-02 — Suppression définitive STORY-003 / 004 / 005 / 006

**Décision Papa Yann :** suppression **pure et dure** des 4 dossiers d'histoires :
- `stories/003-la-confidence/` (déjà abandonnée le 2026-04-30)
- `stories/004-cartable-a-trou/` (pitch en pause arc 2)
- `stories/005-le-mardi/` (pitch en pause arc 2)
- `stories/006-sept-a-rien/` (pitch en pause arc 2)

**Raison :** *« j'ai lu que 1 et 2, la 3 était terrible, je la supprime pure et dure. Seul 1 et 2 existent pour le moment, rien d'autre niveau story tu peux virer (on a toujours pas validé le style d'une seule histoire, donc en avoir 12 non lues est contre-productif). »*

**Conséquences :**
- **Aucune sauvegarde** des pitches/briefs Kishōtenketsu de 004/005/006 (aucun n'avait été validé par Papa Yann — la matière était présente mais non-canon)
- **Une seule idée conservée** (de la défunte 003) : *concours de dessins en lieu public bienveillant* → noté dans `axes-histoires-en-stock.md` comme matière exploitable pour arc 3
- Le **slot 003 redevient libre** et sera utilisé pour la version *from-scratch* de la 001 (test du nouveau PROCESS militaire)
- La série La Parole (`stories/series/001-la-parole.md`) est désormais réduite à la seule 002 — gardée pour la reprise future de l'arc 2

**État final des stories après suppression :**
- 001 *Le Pont Cassé* (canon V1 — V2 nécessaire)
- 002 *Le Rire qui reste* (canon V1 — V2 nécessaire, en pause arc 2)

---

## 2026-04-30 — STORY-003 ABANDONNÉE

**Décision :** L'histoire 003 *La Confidence* est **abandonnée**. Ne sera pas canonisée.

**Verdict Papa Yann :** *"cette histoire est pas bonne… on va retravailler ça différemment."*

**Raisons :**
- Élément d'univers non attesté ("Maison Commune") = invention writer rejetée
- Métaphores adultes abstraites ("montagnes blanches, vallées d'encre")
- Passé simple littéraire ("naquit au coin")
- Comparaison qui ne marche pas ("blanc comme un doigt")
- Détails techniques non ancrés ("papier kraft")
- Références orphelines ("la maison aux fenêtres" jamais posée)
- Fin opaque ("on dit pas blabla puis ça va")

**Action :**
- Statut `abandoned` dans frontmatter README
- Tous les fichiers de fabrication restent dans le dossier (règle PROCESS : rien n'est effacé)
- Ticket STORY-003 fermé
- **Idées à conserver** pour de futures histoires :
  - Concept "concours de dessins dans un lieu de passage public" (matière potentielle pour arc 3 ou autre)
  - Lieu d'exposition extérieur bienveillant → décision univers à prendre avec Conseiller (à formaliser dans `univers/vie-quotidienne/` à terme)

---

## 2026-04-30 — Comportement Conseiller : 1 sujet à la fois

**Décision :** L'agent `narration-conseiller` doit traiter **un seul chantier à la fois**, poser **une seule question** par salve, ne **pas servir de menu** de solutions. Ouvrir les autres angles seulement après réaction de Papa Yann.

**Implémentation :** Bloc "Règle de conduite brainstorm (NON-NÉGOCIABLE)" ajouté dans `.claude/agents/narration-conseiller.md`.
**Raison :** Papa Yann saturé par les réponses-menu : *"tu me donnes des solutions sur 3 axes et je suis débordé".*

---

## 2026-04-24 — Casting V1 "Christ" figé

**Décision :** Les 9 prénoms + Wex sont définitifs.

| Ennéatype | Prénom complet | Surnom (~80%) | Genre |
|-----------|---------------|---------------|-------|
| Hors-système | Wex | Wex | M |
| Type 1 | Melchisédech | Melki | M |
| Type 2 | Marie | Mimi | F |
| Type 3 | Paul | Polo | M |
| Type 4 | Jérémie | Jérem | M |
| Type 5 | Luc | Lulu | M |
| Type 6 | Pierre | Pierrot | M |
| Type 7 | Raphaël | Raph | M |
| Type 8 | Judith | Juju | F |
| Type 9 | Noé | Nono | M |

**Raison :** Lisibilité validée comité de lecture + cohérence culturelle casting "Christ".
**Liens :** `../personnages/INDEX.md` · `../personnages/prénoms-candidats.md`

---

## 2026-04-24 — Règles d'écriture fondamentales

**Décision :**
- Univers **IMPLICITE** — aucun nom de concept prononcé dans les histoires
- Ennéatypes **DILUÉS** — comportements visibles, jamais étiquetés
- Structure **Kishōtenketsu** — 4 actes, sans antagoniste
- Surnoms **~80%** en dialogue, prénoms complets = moments formels/adultes seulement
- Zéro morale explicitée — la leçon émerge de la situation, jamais dite

**Raison :** Retours comité Pont Cassé + volonté publishing cross-country.

---

## 2026-04-26 — Format et paliers d'âge

**Décision :**
- Format **texte-only** prioritaire (1-2 illus max) — quantité > beauté visuelle

| Palier | Âge | Durée | Mots |
|--------|-----|-------|------|
| P1 | 2-3 ans | 2-3 min | ~150-250 |
| P2 | 4-6 ans | 4-6 min | **400-700** |
| P3 | 6-9 ans | roman court | à définir |

**Raison :** Feedback Max 4 ans + pas de dessinateur, IA image instable.

---

## 2026-04-26 — Univers logistique

**Décision :**
- Enfants seuls dehors dès la maternelle — monde sans danger
- **Zéro nom de ville réelle** (pas Villejuif, pas Paris)
- Lieux géographiques réels OK comme décor (mer, montagne, savane)
- Transport : bus moteur classique **NON** — système de transport à inventer
- Repas : 1-2/jour quand faim — repas en famille/harmonie = moment sacré
- Coutumes locales = touche fine, pas folklore déguisé

**Raison :** Cohérence avec jeu MaxPlay + publishing cross-country.

---

## 2026-04-26 — Règles d'écriture (complément)

**Décision :**
- L'objet du titre = centre de gravité (il agit, il manque, il revient)
- Le monde affleure, ne s'explique pas — un détail suffit
- La conclusion la plus simple est souvent la bonne
- Pas de réflexe "ajoute du lore" en réécriture

**Raison :** Rejet V2 "Parapluie oublié" — trop décorative, sujet perdu.

---

## 2026-04-28 — Sensibilités (liste + attribution)

**Décision :** 9 sensibilités fixes par perso (Option A — comme l'ennéatype, cross-country stable).

| Perso | Sensibilité |
|-------|-------------|
| Wex | Vibration (transversal) + Vision causale (power) |
| Melki | Minéraux |
| Mimi | Eau |
| Polo | Forces |
| Jérem | Fréquence |
| Lulu | Quantique |
| Pierrot | Animaux |
| Raph | Cosmos |
| Juju | Plantes |
| Nono | Vibration collective (Harmonie) |

**Raison :** cohérence cross-country, simplicité éditoriale. Sensibilités = ADN du perso comme l'ennéatype.
**Lien :** `../univers/fondements/sensibilites.md`

---

## 2026-04-28 — Transport : Jabus validé

**Décision :** Nom du véhicule = **Jabus**. Multi-personnes. Technologie non nommée dans l'univers (normal comme l'électricité). Axes verts = coulées végétales avec Jabus silencieux.
**Lien :** `../univers/vie-quotidienne/transport.md`

---

## 2026-04-28 — Prof d'Histoire : Type 7

**Décision :** Prof d'Histoire = Type 7. Enthousiaste, fait des liens vite (même faux), adore le show. Jamais ridiculisé. Prénom à définir.
**Lien :** `../univers/vie-quotidienne/ecole.md`

---

## 2026-04-28 — Structure narrative en saisons

**Décision :**
- **S1 "L'École"** — histoires courtes autonomes P2, 1/semaine, Wex observateur-acteur sans révélation de sa nature
- **S2 "Les Visites"** — Wex chez chacun de ses copains one-on-one, découverte sensibilités

**Lien :** `../univers/fondements/sensibilites.md`

---

## 2026-04-28 — Process éditorial 5 writers + briefs stateless

**Décision :** Workflow en 6 phases (INTAKE → BRIEF → ÉCRITURE × 5 → SYNTHÈSE → RELECTURE → KEEPER → CANON). PMO hub post-phase à chaque étape.

**Briefs injectés aux writers stateless :** *(Surchargé par décision 2026-04-30 PROCESS militaire — voir templates `equipe/templates/brief-{univers,personnages,histoire}.template.md` et étape 3 du PROCESS)*
- ~~`equipe/brief-univers.md` — monde, ton, règles~~
- ~~`workshop/<titre>/plan-histoire.md`~~

**Writers × 4 :** Kimi · DeepSeek · Grok · Claude Libre (stateless). ~~Claude Ancré~~ *(agent historique supprimé le 2026-04-28 — voir ARCHI-005)*.

**Raison :** rodage sur STORY-002 — process validé, GateKeeper PASS au premier essai.

---

## 2026-04-28 — MCP Kimi : headers obligatoires + pas de max_tokens

**Décision :**
- Kimi For Coding nécessite `X-Client-Name: claude-code` + `X-Client-Version: 1.9.0` + `User-Agent: claude-code/1.9.0 (win32; x64)` — sinon `access_terminated_error`
- `max_tokens` supprimé de tous les appels MCP — chaque modèle utilise sa limite native
- Kimi utilise `kimi-for-coding` (reasoning) mais produit du texte narratif de qualité

**Raison :** bug découvert en production STORY-002. Fix appliqué dans `infra/mcp/server.ts`.

---

## 2026-04-29 — Architecture cross-culture du casting

**Décision :** L'univers MaxPlay s'articule autour d'une **structure cross-culture stable** : Wex + 9 ennéatypes invariants, déclinés en plusieurs **castings nationaux**.

### Règle d'architecture

- **Wex** : présent dans **toutes les communautés / toutes les cultures**. **Prénom invariant** (« Wex »). Pas d'ennéatype validé (déjà acté). Wex est un **archetype universel** qui se manifeste partout, avec les gens du pays.
- **Les 9 compagnons** : **mêmes caractéristiques d'ennéatype** dans toutes les versions. Mais :
  - **Vies adaptées au pays / culture** d'incarnation
  - **Légère variance dans l'expression de l'ennéatype** selon culture (le geste change, la structure reste — cf. pattern *même histoire × N cultures*)
  - **9 nouveaux prénoms par culture** — d'où la justification du gros catalogue de prénoms (218 prénoms / 30 cultures dans `personnages/catalogue-prenoms/`)

### Conséquence sur le casting V1

Le casting V1 « Christ » français (Wex + Melki/Mimi/Polo/Jérem/Lulu/Pierrot/Raph/Juju/Nono) **n'est plus le casting unique** : c'est désormais **le casting français**, **un casting parmi N à venir**. Il reste figé dans sa forme française (cf. décision 2026-04-24).

### Conséquence sur le catalogue de prénoms

Les 218 prénoms / 30 cultures du catalogue ne sont plus « matière en réserve » mais **base opérationnelle pour construire les autres castings nationaux**. Chaque culture qualifiée = un casting national potentiel.

### Pistes narratives ouvertes

- **Rencontres cross-culture** : les Wex de différentes cultures peuvent se croiser dans des histoires de jonction (S2+ probable).
- **Question structurelle non tranchée** : Wex est-il « le même » Wex partout (un seul personnage qui apparaît partout) ou « un Wex par culture » (même nom, même rôle d'archetype, mais incarnations distinctes) ? À creuser.

### Précisions stratégiques (2026-04-30)

**Stratégie de déploiement « bulles + croisements »** :
- **Phase 1 — Bulles locales** : chaque pays/culture pense que le casting lui est **propre**. Pas de signal cross-culture au démarrage. L'enfant lit « son » Wex sans savoir que d'autres existent.
- **Phase 2 — Croisements** : 6-12 mois après stabilisation, les communautés se découvrent. S2+ probable.

**Règle de contenu pour les bulles culturelles** :
- ❌ Pas de gros cliché culturel
- ❌ Pas de légende ou figure mythologique locale réécrite
- ❌ Pas de religion locale (univers post-Éveil hors religions historiques)
- ✅ Socle universel : **bienveillance · éveil · sensibilité** — la culture **affleure par les gestes du quotidien**, elle n'est pas le sujet

**Wex — piste actuelle (à confirmer)** : **un Wex par culture, prénom invariant « Wex » partout**. Si Wex voyage plus tard, ça complexifie le système de prénoms — décision laissée ouverte.

**Mémoire entre castings — piste actuelle (à équilibrer avec faisabilité)** : **probablement OUI**, puisque c'est la même histoire archétypale qui se rejoue. Mais charge éditoriale lourde — à arbitrer (cf. UNIVERS-003).

### Comparables prior art (pour info)

- **StoryWeaver / Pratham Books** (Inde) — 25 000 histoires en 270+ langues, adaptation visuelle communautaire
- **Elisavet Arkolaki** — séries *Cousins Forever*, *Where am I from?*, traduites en 50+ langues
- **One Globe Kids** — choose-your-own-adventure photos enfants (Haïti, Burundi, Indonésie, NY, Israël)
- **« I See the Sun »** — séries illustrées Népal/Myanmar/Afghanistan/Chine/Russie
- **Anna Hibiscus** (Atinuke) — héroïne nigérian-canadienne

Aucun ne combine **archétypes universels (ennéatypes) + adaptation culturelle profonde + univers connecté** — la zone de différenciation reste libre.

**Lien :** `../personnages/INDEX.md` · `../personnages/catalogue-prenoms/INDEX.md` · `../univers/meta/architecture-cross-culture.md` · `../equipe/memoire-conseiller.md`

---

## 2026-04-29 — Parents : présents non-présents (S1 = prisme enfant pur)

**Décision :** Les parents existent dans l'univers — confiance, amour, liberté donnée, à dispo si besoin. **Saison 1 = prisme enfant pur** : on ne voit QUE les enfants, ils ne jouent qu'avec leurs semblables. Les parents existent **hors-cadre**, jamais dans la scène.

**Conséquence éditoriale :**
- Aucune scène avec parent visible en S1
- Pas de dialogue parent ↔ enfant en scène
- Pas d'intervention parentale dans la résolution
- Le foyer/logement peut affleurer (un seuil, une voix au loin) mais le parent n'entre pas dans le cadre

**Réintroduction possible :** S2+ — modèle Bluey « bon assez parent » (Winnicott) si un jour un parent entre en scène : imparfait, fatigué, distrait, bienveillant — pas idéalisé.

**Raison :** filtre enfant pur = identification maximale 4-6 ans, monde-bulle cohérent avec l'autonomie déjà actée (« enfants seuls dehors dès la maternelle » — décision 2026-04-26). Évite le piège du parent-résolveur.

**Lien :** `../equipe/sources-narratologie.md` (pépite 1.6 « Bon assez parent »)

---

## 2026-04-29 — Compagnons : forme tranchée (ondes / fluides / éther)

**Décision :** La forme des compagnons est **définitivement** :

- **Ondes / vague / fluide / flux / vapeur / éther** — **PAS d'animaux**, pas de cristaux figés, pas de mascotte
- **Manifestation par couleurs émotionnelles** — exemples de phrasés cibles :
  - *« je t'ai vu devenir rouge »*
  - *« je t'ai vu tellement détendu dans ce nuage bleuté »*
  - *« il a changé de couleur »*
- **Apparition progressive** : milieu / fin de Saison 1
- **Ne parle pas, ne résout pas** (règles provisoires conservées)
- **Détails à affiner** dans les briefs Architecte et au fil des arcs narratifs

**Raison :** la piste « animal hybride » glisse trop vers compagnon-mascotte (codes Pokémon/Totoro déjà saturés). L'onde-couleur reste cohérente avec `vibration.md` (fréquence/amplitude visible) et avec la doctrine d'univers implicite (le compagnon affleure, ne s'explique pas). La couleur émotionnelle = lecture intuitive 4 ans (rouge=colère, bleu=calme).

**Conséquence sur `univers/vie-quotidienne/compagnons.md` :** refonte complète — les sections « animal hybride » deviennent obsolètes.

**Lien :** `../univers/vie-quotidienne/compagnons.md` · `../univers/fondements/vibration.md`

---

## 2026-04-29 — Sensibilité différenciée (correctif narratologie)

**Décision :** Dans MaxPlay, le ressort narratif **n'est PAS** « Wex sait quelque chose que les autres ignorent » (savoir caché). Le bon cadrage est : **chacun des 10 perçoit ce que les autres ne perçoivent pas — c'est de la sensibilité différenciée**.

- **9 compagnons** : chacun a UNE sensibilité fixe (minéraux · eau · forces · fréquence · quantique · animaux · cosmos · plantes · vibration collective) — cf. décision 2026-04-28
- **Wex** : a sa propre sensibilité (à définir précisément — piste : écoute des fausses notes / lien soin-bioélectrique)
- **Complémentarité** : les 10 sensibilités forment un ensemble qui se complète — aucun n'a le monopole de la perception

**Conséquence éditoriale :**
- Pas de hiérarchie « Wex sait, les autres ignorent »
- Les histoires peuvent jouer le malentendu *« je vois X que tu ne vois pas »* dans les deux sens
- Wex n'est pas le sage caché — il est un percepteur parmi d'autres, avec un rôle de témoin du tout

**Correctif explicite à `equipe/sources-narratologie.md` pépite 1.4 :** la Theory of Mind à 4 ans permet ce ressort, mais **pas configuré « savoir caché »** chez nous → configuré « sensibilité différenciée ».

**Raison :** l'univers MaxPlay n'a pas d'élu — il a des sensibilités complémentaires. C'est cohérent avec l'architecture cross-culture (l'enfant timide s'identifie à Lulu, l'extraverti à Raph) et avec la doctrine ennéatypes dilués (chaque type a son angle, pas de hiérarchie).

**Lien :** `../personnages/INDEX.md` · `../univers/fondements/sensibilites.md` · `../equipe/sources-narratologie.md`

---

## 2026-04-29 — Structure des saisons (architecture par âge / découverte univers)

**Décision :** Les saisons MaxPlay s'articulent autour d'une découverte progressive de l'univers et des personnages :

| Saison | Axe | Statut |
|--------|-----|--------|
| **S1 — Enfance pure** | Que enfants, sensibilité peu/pas présente, maîtrise découverte en fin de saison. **Compagnons (ondes-couleurs) apparaissent progressivement milieu/fin S1.** Parents hors-cadre. | 🟡 En cours — arc « La Parole » actif (002-006) |
| **S2 — Définition Wex + visites** | Wex comprend sa sensibilité. Choix de Wex dans son cours de relation sociale → il visite chacun des 9 en 1-1 (chez eux, leur chambre). On apprend leur sensibilité, mise en avant des ennéatypes. | ⚪ À venir |
| **S3** | À définir plus tard | ⚪ Vide |
| **S4 — Décentrement** | Un des 9 devient personnage central (pas Wex). Wex garde son rôle mais histoires où il est secondaire ou absent. **Beaucoup plus d'histoires en volume**, montée en communauté, faire apprécier persos secondaires. | ⚪ À venir |
| **S# — Voyage / échange scolaire** | Cross-culture activé, on croise les persos d'autres castings nationaux. | ⚪ À venir (saison joker, position non figée) |

**Conséquence éditoriale :**
- S1 = filtre enfant pur (parents hors-cadre)
- S2 = chambre/intimité de chaque perso, on entre dans leur monde
- S4 = brise le « tout passe par Wex », monte en communauté
- S# voyage = passerelle vers l'architecture cross-culture (cf. décision 2026-04-29 castings)

**Lien :** `../pmo/roadmap.md` · `../personnages/INDEX.md` · `../univers/meta/architecture-cross-culture.md`

---

## 2026-04-29 — Wex toujours présent dans les histoires (pour le moment)

**Décision :** Wex est présent dans toutes les histoires de la S1. Pas d'absence ponctuelle, pas de remplacement par un autre observateur.

**Raison :** stabilité du dispositif narratif en phase de rodage. Le "témoin hors-système" est un point d'ancrage utile pour les lecteurs et pour les writers stateless. Le retirer demanderait de re-cadrer le rôle d'observateur ailleurs, prématuré à ce stade.

**À reconsidérer :** plus tard, si une histoire l'exige naturellement (ex. moment où un autre perso prend seul un rôle de témoin, ou histoire centrée sur un duo très intime). Pas d'absence par principe — toujours par besoin narratif documenté.

**Lien :** `../equipe/memoire-conseiller.md`

---

## 2026-04-28 — Pas d'épilogue italique à partir de STORY-002

**Décision :** "Le Pont Cassé" avait un épilogue en italique (*Ce qu'on construit à trois…*). À partir de 002, le texte se tient seul — pas d'épilogue. Le Pont Cassé reste tel quel (premier texte, posture de présentation).

**Raison :** retour relecture STORY-002 — l'histoire se termine sur une image, pas besoin de méta-commentaire.

---

## Questions ouvertes (à trancher)

| # | Question | Bloquant ? | Fichier |
|---|----------|-----------|---------|
| 1 | Nom de l'univers — lequel parmi 5 finalistes ? | Non | `../univers/meta/nom-candidats.md` |
| 2 | ~~Compagnons — forme exacte ? Quand apparaissent-ils ?~~ **TRANCHÉ 2026-04-29** (ondes/couleurs, milieu/fin S1) | — | `../univers/vie-quotidienne/compagnons.md` |
| 3 | Éléments magiques rares — garder ou écarter ? | Non | — |
| 4 | Baron — garder prénom "Trump" ? | Non | `../univers/baron.md` |
| 5 | Ombre Éternelle — concept actif ou standby ? | Non | — |
| 6 | Modèle Janus — référence discrète ou assumée ? | Non | `../INBOX.md` (rapports JP Petit) |
| 7 | Nom du prof d'Histoire | Non | `../univers/vie-quotidienne/ecole.md` |
| 8 | Nom des axes verts (Coulées ? Glissières ? Axes vivants ?) | Non | `../univers/vie-quotidienne/transport.md` |
| 9 | Ponaire — mécanique précise + lien voyages culturels | Non | `../univers/vie-quotidienne/transport.md` |
| 10 | Nombre de villes max par pays | Non | `../univers/vie-quotidienne/geographie.md` |
| 11 | Liste des Sensibilités — fermer les sous-types (Fréquence/Son/Schumann) | Non | `../univers/fondements/sensibilites.md` |
| 12 | Quand Wex commence à contrôler sa Vision causale ? (S1/S2/S3) | Non | — |
| 13 | Mentor de Wex — qui ? Quel âge ? Quelle sensibilité ? | Non | — |
| 14 | Castings cross-country (Hébreu, Ghibli, Swahili…) — démarrer lequel en premier ? | Oui pour S2 | `../personnages/prénoms-par-origine.md` |
| 15 | Mémoire narrative des lecteurs — les enfants connaîtront les histoires précédentes et feront des liens. Comment en tenir compte dans l'écriture (callbacks implicites, évolution persos, arcs longs) ? À partir de quelle histoire introduire ce niveau de couche ? | Non | — |
| 16 | Quartier / communauté — nommé (Clairval, Tissé, Hameau de l'Aube, la Ronde…) ou volontairement anonyme ? Décision 26/04 a écarté les villes réelles, mais n'a pas tranché si on nomme la communauté/quartier. Trade-off : ancrage affectif (B) vs universalité cross-culture (A). | Non | `../univers/vie-quotidienne/geographie.md` |
