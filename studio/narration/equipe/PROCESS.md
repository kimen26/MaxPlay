# PROCESS éditorial MaxPlay

> **Référence opérationnelle.** Source de vérité du workflow, des owners, des inputs/outputs, des critères PASS et des points de reprise.
> **Pour la cartographie des fichiers et règles de domaine, voir [`cartographie-domaines.md`](cartographie-domaines.md).**
> **Pour l'organigramme et les agents, voir [`ORGANIGRAMME.md`](ORGANIGRAMME.md).**
> **Pour l'index complet de l'équipe, voir [`INDEX.md`](INDEX.md).**
>
> Dernière mise à jour : 2026-05-12 (refonte structurelle — fusion Pitch+Plan, suppression étape 2 Architecte, préfixage fichiers par numéro étape, Archiviste maillon central proactif)

---

## Principes invariants

1. **Auteur a le dernier mot** — sur le pitch (étape 1), sur la sélection (étape 6), sur la version finale (étape 10). Trois points de validation, pas plus.
2. **1 rewrite max** — si le rewrite ne convient pas, retour à la sélection avec une autre version comme base.
3. **GateKeeper ne change pas l'histoire** — il vérifie le respect des règles, point.
4. **Rien n'est effacé** — versions abandonnées → `_archive/`. Histoire abandonnée → `_archive/` racine. Aucun overwrite.
5. **1 dossier = 1 histoire** — `stories/<NNN-slug>/` contient TOUT (briefs, versions, lecteurs, sélection, rewrite, gatekeeper, re-relecture, canon, variantes, archives). Pas de fragmentation `workshop/`.
6. **Le `kanban.md` est la source de vérité** — pour reprendre une histoire après reboot, on lit son kanban.
7. **Agent manquant = STOP + alerte auteur** (règle absolue 2026-05-02) — l'orchestrateur ne se substitue JAMAIS à un agent défini qui n'est pas chargé en session courante. Voir `pmo/decisions.md` (2026-05-02 RÈGLE ABSOLUE).
8. **Le writer du top 1 garde la main au rewrite** (règle 2026-05-08) — quand une version est élue #1 par les lecteurs, c'est son auteur (Kimi, Claude, etc.) qui retouche son propre texte avec sa propre note d'intention. Pas de greffes injectées par d'autres LLM. Les patterns lecteurs alimentent `lecons-vivantes.md` pour les **futures** histoires.
9. **Onomatopées normées** (règle 2026-05-08) — 0 ou 1 par histoire, choisie dans [`../cross-culture/onomatopees/catalogue-onomatopees.md`](../cross-culture/onomatopees/catalogue-onomatopees.md). Test à voix haute obligatoire.

---

## Vue d'ensemble — 11 étapes (0 à 10)

> **Chiffre canonique : 11 étapes, numérotées 0 à 10.** L'étape 2 (Brainstorm) existe depuis 2026-05-15. Source unique du chiffre : [`../pmo/INVARIANTS.md`](../pmo/INVARIANTS.md).

```
0.  Idée                    (Auteur)                   → INBOX.md section datée
1.  Pitch+Plan              (Conseiller)               ✅ valide auteur     → 1-pitch-plan.md
2.  Brainstorm              (2A boss ✅ + 2B équipe Kimi/DeepSeek/Grok)     → kanban + matière briefs
3.  Briefs                  (Directeur)                                    → 3-briefs/
4.  Versions writers        (14 versions — calibration multi-modèles)      → 4-versions-writers/
5.  Lecteurs témoins        (Panel : 20 lecteurs)                          → 5-lecteurs-temoins/
6.  Sélection               (Directeur)                ✅ valide auteur     → 6-selection.md
7.  Rewrite                 (Writer du top 1, 1 cycle max)                 → 7-rewrite/
8.  GateKeeper              (Haiku)                                        → 8-gatekeeper-verdict.md
9.  Re-relecture rewrite    (Panel : 20 lecteurs)                          → 9-relecture-rewrite/
10. Canon                   (Directeur + PMO)          ✅ valide auteur     → 10-texte.md
```

> **Historique étape 2** : l'étape 2 d'origine (Plan, Architecte) a été **fusionnée dans l'étape 1** le 2026-05-12. Le créneau « 2 » a ensuite été **réutilisé pour le Brainstorm** (DEC-PROCESS-002, 2026-05-15). L'Architecte reste supprimé.

**SLA :** 3 jours max sur chaque attente auteur (étapes 1/6/10). Au-delà → `kanban.md` passe en 🔴 BLOQUÉ + log auto dans `pmo/sprint-log.md`.

**Convention préfixe étape (2026-05-12)** : tout fichier ou dossier dans `stories/<NNN>/` est préfixé par le numéro de l'étape qui le produit (`1-pitch-plan.md`, `3-briefs/`, `4-versions-writers/`, etc.). Cela rend l'ordre du PROCESS visible dans le file explorer sans lire le kanban. Les fichiers transverses (`kanban.md`, `README.md`) n'ont pas de préfixe.

---

## PROCESS Audio — 5 étapes (workflow post-étape 10, décision figée 2026-05-16)

> **Méthodologie officielle** : `POST /v1/text-to-dialogue` (ElevenLabs) packetisé < 2000 char. Source : [`../pmo/decisions.md`](../pmo/decisions.md) § DEC-AUDIO-PRODUCTION-001 (figée, jamais régresser). Détail technique complet : [`.claude/rules/audio.md`](./.claude/rules/audio.md) (auto-chargé dès que Claude touche script audio).

### Vue d'ensemble — 5 étapes linéaires

```
(Après étape 10 Canon validé)

0. Voice-director       (Agent VOIX-001)             → texte canon + tags v3 inline
1. Packetisation        (Script production)          → paquets JSON < 2000 char
2. Appels API           (ElevenLabs text-to-dialogue)→ MP3 par paquet
3. Concat + loudnorm    (ffmpeg)                     → 1 MP3 final cohérent
4. Archivage            (Papa Yann + PMO)            → versionning traçabilité
```

| Étape | Owner | Inputs | Outputs | Critères PASS |
|-------|-------|--------|---------|---------------|
| **0 Voice-director** | Agent VOIX-001 (futur) | `stories/NNN/10-texte.md` canon validé | Texte canon + tags v3 inline (`[softly]`, `[excited]`, etc.) + markup voice IDs | ✅ Tags cohérents avec [`personnages/voix-meta/_CHEATSHEET-WRITERS.md`](../personnages/voix-meta/_CHEATSHEET-WRITERS.md). Aucun tag inventé. Minimum 1-2 tags par 2000 char bloc. |
| **1 Packetisation** | Script `generate-story-dialogue.js` | Voice-director output + voice_id casting | JSON `_segments-NNN-vN-<llm>.json` documentant paquets (`inputs:[{voice_id, text}]` format text-to-dialogue API) | ✅ Paquets < 2000 char (total, tags inclus). Boundaries logiques (phrases complètes). Voice IDs tablés dans [`../personnages/voix-meta/_VOICE-IDS-CASTING.md`](../personnages/voix-meta/_VOICE-IDS-CASTING.md). |
| **2 Appels API** | Script production (loop packetisation) | JSON segments + EL_API_KEY | MP3 par paquet (0 concat, juste raw API outputs) | ✅ 1 appel `POST /v1/text-to-dialogue` par paquet. Modèle `eleven_v3`. Voice settings appliquées (gravées casting). Max 10 voice_ids/appel respecté. |
| **3 Concat+loudnorm** | ffmpeg via script | 2-3 MP3 issus étape 2 | 1 MP3 final `NNN-story-audio-vN-<method>.mp3` | ✅ ffmpeg concat + `loudnorm -I -23 -TP -1.5 -LRA 11` appliqué. Transitions fluides testées à l'oreille. Volume homogène entre paquets. |
| **4 Archivage** | Papa Yann (validation oreille) + PMO | MP3 final + JSON segments + request_ids | `stories/NNN/assets/audio/NNN-story-audio-vN-<method>.mp3` + metadata README (durée, date, voice_ids, version script) | ✅ MP3 accepté. Metadata complète dans `stories/NNN/assets/audio/_archive-attempts/`. Anciennes générations conservées (jamais supprimées). |

### Pré-requis avant lancement

| Ticket | Statut | Bloquer ? |
|--------|--------|-----------|
| **VOIX-001** — Créer agent voice-director | ⚪ À faire | ✅ **CRITIQUE** — sans voice-director, impossible markup tags v3 fiable |
| **VOIX-002** — Créer voice_ids narrateurs (H+F) | ⚪ À faire | ✅ **CRITIQUE** — narrateurs requis pour toute histoire |
| **VOIX-003** — Créer voice_ids 10 persos | ⚪ À faire | ⚠️ Déblockant différé — étape 1-4 réutilisent casting existant `_VOICE-IDS-CASTING.md` |
| **AUDIO-SCRIPT-V2** — Implémentation script production | ⚪ À faire | ✅ **CRITIQUE** — sans script, étapes 1-3 = manuel infaisable |

**Lancement audio production** : après VOIX-001 + AUDIO-SCRIPT-V2 complétés + test réussi sur STORY-002 ou STORY-003.

### Anti-patterns AUDIO (bannir 100%)

| Anti-pattern | Raison | Substitut |
|--------------|--------|-----------|
| 32+ appels TTS séparés (1 voice_id/appel) | Transitions abruptes, intonations cassées | `POST /v1/text-to-dialogue` avec 2-10 voice_ids par appel |
| Concat ffmpeg `-c copy` de 32 segments | Volumes inégaux, perte d'intonation | Concat 2-3 MP3 text-to-dialogue seulement + loudnorm |
| Voice settings inventés | Dérive sonore perso à perso | Utiliser `_VOICE-IDS-CASTING.md` (source autorité) |
| Tags v3 inventés | Balises non supportées → API rejet/ignoré | Catalogue [`audio-direction-elevenlabs` skill](~/.claude/skills/audio-direction-elevenlabs/) ou `_CHEATSHEET-WRITERS.md` |
| Loudnorm absent | Volumes incohérents inter-histoires | `ffmpeg -i concat.wav -af loudnorm -o final.mp3` obligatoire |
| Pronunciation dict ignorés | Prénoms Max mal prononcés, incohérence cross-culture | Vérifier dicts dans `_VOICE-IDS-CASTING.md` + appliquer `pronunciation_dictionary_locators` API |
| Onomatopée en FR sur perso culture autre | Incoherence culturelle (ex: "Boum" sur Wex brésilien) | Choisir variante cataloguée [`cross-culture/onomatopees/`](../cross-culture/onomatopees/) |

---

## Étape 0 — Idée

| Champ | Valeur |
|---|---|
| **Owner** | Auteur (Papa Yann) |
| **Inputs** | — |
| **Outputs** | Section datée dans `narration/INBOX.md` (`## YYYY-MM-DD — sujet en 5 mots`) |
| **Critères PASS** | Une idée brute écrite (1 phrase suffit) — pas besoin de format |
| **Condition de passage** | Auteur déclenche l'étape 1 explicitement (sinon l'idée reste dormante en INBOX) |
| **Point de reprise** | Aucun à reprendre — c'est le point d'entrée |
| **Modalité v2/v3** | — |

---

## Étape 1 — Pitch + Plan (fusionnés depuis 2026-05-12)

> **Refonte 2026-05-12** : fusion ancien étape 1 (Pitch Conseiller) + ancien étape 2 (Plan Architecte) en une seule étape. Pourquoi : la doctrine "plan léger" (50-80 lignes) a rendu le plan quasi-identique au pitch enrichi. Le Conseiller produit désormais les deux dans un seul fichier. L'Architecte est mis en standby (sa matière statique Kishōtenketsu + boussole 4-5 ans est intégrée à la fiche du Conseiller).

| Champ | Valeur |
|---|---|
| **Owner** | Conseiller (`narration-conseiller`, Opus) |
| **Inputs** | `INBOX.md` section, `equipe/memoire-conseiller.md`, `equipe/patte-narrative-maxplay.md`, `personnages/INDEX.md` (+ fiches type-NN concernées), `personnages/theorie/pedagogie-enfance/` (boussole 4-5 ans **obligatoire**), `personnages/theorie/enneagramme/chabreuil-synthese-complete.md` §8.3 (comportements 4-7 ans par type), `univers/INDEX.md` (+ fiche du lieu), `saisons/saison-1/<arc-slug>/fiche.md`, `pmo/decisions.md`, `pmo/INVARIANTS.md`, `stories/INDEX.md` |
| **Outputs** | `stories/<NNN-slug>/1-pitch-plan.md` rempli depuis `equipe/templates/pitch-plan.template.md` + `stories/<NNN-slug>/kanban.md` (étape 1 ✅) + `stories/<NNN-slug>/README.md` (carte vivante initiale, ~40 lignes max) |
| **Ce que `1-pitch-plan.md` CONTIENT** | <ul><li>**Pitch — 4 cases** : objet titre · trio (2-3 persos du casting V1 + Wex) · lieu · moment d'ouverture optionnel</li><li>**Plan léger** : trio (qui agit, qui sent, qui catalyse), promesse du titre (par quoi elle se tient), recentrage Ten (par quel perso ou objet passe la bascule — sans décrire le geste précis), sensibilités révélées (laquelle/lesquelles, comment), garde-fous structurels (Ten silencieux, Ketsu image, etc.), contraintes dures (longueur 400-700 mots, ≥ 2 répliques/perso, ≥ 1 échange 3+ répliques)</li></ul> |
| **Ce que `1-pitch-plan.md` NE CONTIENT PAS (laissé au writer)** | <ul><li>❌ Le détail phrase par phrase de Ki/Sho/Ten/Ketsu</li><li>❌ Les gestes spécifiques de chaque perso à chaque moment</li><li>❌ Le style, le rythme, les dialogues exacts</li><li>❌ L'ouverture précise (sauf si imposée explicitement par le Directeur via brief)</li><li>❌ La scénarisation du Ten (qui regarde qui, qui pose la main où, etc.)</li></ul> |
| **Critères PASS** | <ul><li>Pitch 4 cases présent (objet titre, trio, lieu, ouverture)</li><li>Plan léger présent (4 temps Kishōtenketsu nommés, recentrage Ten identifié, promesse du titre énoncée)</li><li>Voix tranche de vie + cadre cyclique de l'arc explicités</li><li>Personnages : surnoms 4/5, ennéatypes dilués (jamais étiquetés)</li><li>Contraintes longueur + dialogues présentes</li><li>Pas d'antagoniste · pas de morale dite · pas de parents en scène · compagnons = ondes/couleurs si présents · sensibilité différenciée (pas hiérarchie de savoir)</li><li>**Calibrage 4-5 ans** : max 3 informations à tenir en parallèle, causalité immédiate, sensorialité dominante (textures/sons/lumières > concepts) — ressources péda consultées</li><li>**Volumétrie cible : 80-120 lignes max** (anti-sur-cadrage)</li><li>Aucun élément interdit (parents en scène, morale dite, ennéatype nommé, univers nommé)</li></ul> |
| **Condition de passage** | ✅ **Auteur valide `1-pitch-plan.md`** explicitement |
| **Point de reprise** | Si reboot pendant l'étape : relire `1-pitch-plan.md` (s'il existe en draft) + `kanban.md` |
| **Modalité v2/v3** | Ajustement libre tant que l'auteur n'a pas validé. Versions intermédiaires → `_archive/1-pitch-plan-vN-YYYY-MM-DD.md` |

**SLA auteur :** 3 jours. Au-delà : kanban 🔴 BLOQUÉ.

---

## Étape 2 — Brainstorm (2 phases séquentielles)

> **Créée 2026-05-15** (DEC-PROCESS-002) : comble le trou entre le pitch validé (étape 1) et les briefs writers (étape 3). Deux phases : Papa Yann + Conseiller en amont, puis l'équipe LLM pour générer la matière des briefs.

### Phase A — Brainstorm boss (Papa Yann + Conseiller)

| Champ | Valeur |
|---|---|
| **Owner** | Papa Yann + `narration-conseiller` |
| **Inputs** | `1-pitch-plan.md` validé |
| **Objectif** | Définir le cadre de l'histoire : lieu précis · objet central · trio exact (2 persos + Wex) · intention émotionnelle |
| **Output** | Décisions boss notées dans `kanban.md` étape 2 — alimente directement la Phase B |
| **Condition de passage** | Papa Yann valide les 4 paramètres (lieu / objet / trio / intention) |

### Phase B — Brainstorm équipe

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (`narration`) orchestre : Kimi + DeepSeek + Grok + Conseiller Claude |
| **Inputs** | Décisions boss (Phase A) + `1-pitch-plan.md` + `pmo/INVARIANTS.md` + fiches persos `type-NN/alive.md` |
| **Objectif** | Générer la matière brute des 2 briefs : portrait vivant des persos dans cette story + trame Ki/Sho/Ten/Ketsu + contraintes |
| **Mécanique** | MCP `ask_kimi` + `ask_deepseek` + `ask_grok` en parallèle (system = `_writer-system.md`, user = pitch + paramètres boss). Conseiller synthétise. |
| **Output** | Matière brute → alimente `3-briefs/brief-personnages.md` + `3-briefs/brief-histoire.md` à l'étape 3 |
| **Condition de passage** | Matière suffisante pour que le Directeur produise les 2 briefs autoporteurs |

---

## Étape 3 — Briefs writers

> **Refonte 2026-05-15** : architecture writer **system/user split**. 
> - `equipe/_writer-system.md` = system prompt permanent (tous writers, tous modèles). Mis à jour seulement au changement d'arc ou de saison. **Source de vérité globale : règles IMPLICITE, patte narrative, casting, univers.**
> - Brief writer = briefs modulaires (personnages + histoire) reçus par tous writers en tant que **user prompts**. Chaque writer reçoit : system=`equipe/_writer-system.md` + user=`brief-personnages.md` + `brief-histoire.md`.
> - ⚠️ **OBSOLÈTE depuis 2026-05-15** : `brief-univers.md` (contenu migré dans `equipe/_writer-system.md`) et `_writer-package.md` (remplacé par cette architecture split).
> - **Rationale du changement** : le system est invariant entre histoires d'un arc/saison (règles d'or, patte, univers implicite, casting). Le user change par story (lieu, trio, plan, contraintes). Cela économise les tokens et clarifie les responsabilités.

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (`narration`, Opus) |
| **Inputs** | `1-pitch-plan.md`, `equipe/_writer-system.md` (source de vérité system — lu et validé une fois par arc), `equipe/templates/brief-personnages.template.md`, `equipe/templates/brief-histoire.template.md`, `personnages/theorie/pedagogie-enfance/` (boussole 4-5 ans à intégrer dans brief), `pmo/decisions.md`, `pmo/INVARIANTS.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/3-briefs/brief-personnages.md` (user brief pour tous writers)</li><li>`stories/<NNN-slug>/3-briefs/brief-histoire.md` (user brief pour tous writers)</li><li>`kanban.md` étape 3 ✅</li><li>**SYSTÈME FIGÉ** : `equipe/_writer-system.md` (partagé par tous stories du même arc)</li><li>✅ **OBSOLÈTE** : `brief-univers.md` (contenu gravé en `_writer-system.md`)</li><li>✅ **OBSOLÈTE** : `_writer-package.md` (remplacé par system/user split)</li></ul> |
| **Qui reçoit quoi** | <table><tr><th>Writer</th><th>Type</th><th>System prompt</th><th>User briefs</th></tr><tr><td>Claude libre ×6</td><td>agent local</td><td>Lit `equipe/_writer-system.md` via Read tool</td><td>Lit `brief-personnages.md` + `brief-histoire.md` via Read tool</td></tr><tr><td>Kimi libre ×3</td><td>MCP stateless</td><td>`equipe/_writer-system.md` inliné dans prompt</td><td>`brief-personnages.md` + `brief-histoire.md` inlinés dans prompt</td></tr><tr><td>Kimi guidé ×1</td><td>MCP stateless</td><td>`equipe/_writer-system.md` inliné</td><td>`brief-personnages.md` + `brief-histoire.md` + axes 1-6 inlinés</td></tr><tr><td>DeepSeek ×2</td><td>MCP stateless</td><td>`equipe/_writer-system.md` inliné</td><td>`brief-personnages.md` + `brief-histoire.md` inlinés</td></tr><tr><td>Grok ×2</td><td>MCP stateless</td><td>`equipe/_writer-system.md` inliné</td><td>`brief-personnages.md` + `brief-histoire.md` inlinés</td></tr></table> |
| **Contenu `equipe/_writer-system.md`** | <ul><li>**Section 1 — Patte narrative MaxPlay** : Kishōtenketsu, tranche de vie, micro-Ten, cadre cyclique (figé depuis 2026-04-24)</li><li>**Section 2 — Univers IMPLICITE** : règles d'or (pas de noms systèmes, pas d'ennéatypes étiquetés, univers en touches légères)</li><li>**Section 3 — Casting V1 figé + voix** : Wex (invariant) + Melki/Mimi/Dadou/Madie/Lulu/Pierrot/Raph/Juju/Nono (4F/5M), surnoms 4/5 du temps, prénoms complets réservés formel, voice_ids + tags writer par perso</li><li>**Section 4 — Saison 1 contraintes** : parents jamais en scène, compagnons = ondes/couleurs, sensibilité différenciée, pas d'antagoniste, pas de morale dite</li><li>**Section 5 — Vocabulaire** : interdits durs (mort, crever, clochard, etc.), vocabulaire négatif OK si pertinent</li><li>**Section 6 — Références externes** : pédagogie enfance 4-5 ans, ennéatype de chaque perso + interactions 9×9</li></ul> |
| **Contenu `brief-personnages.md` (user)** | <ul><li>Trio + Wex de cette story (qui sont-ils, ce qu'ils apportent)</li><li>Ennéatypes dilués (jamais nommés) + sensibilités spécifiques à cette histoire</li><li>Langage naturel / tournures par perso extrait de `personnages/type-NN/alive.md`</li><li>Tags writer ElevenLabs (signature vocale) si production audio prévue</li></ul> |
| **Contenu `brief-histoire.md` (user)** | <ul><li>**Pitch** (objet titre, lieu, saison/météo, moment)</li><li>**Plan léger** (Ki/Sho/Ten/Ketsu passant par quel perso, promesse du titre)</li><li>**Contraintes** : longueur 400-700 mots, ≥2 répliques/perso, ≥1 échange 3+ répliques</li><li>**Garde-fous** : pas de parents, pas de morale, univers implicite, ennéatype dilué</li><li>**Leviers variance** (si writer Claude/Kimi → 4 versions angularisées) : angle / POV / ouverture / longueur cible spécifiques à cette histoire</li><li>**Boussole péda 4-5 ans** : cheat-sheet intégrée (max 3 info parallèles, causalité immédiate, sensorialité dominante)</li></ul> |
| **Critères PASS** | <ul><li>2 fichiers user présents et remplis depuis les templates (`brief-personnages.md` + `brief-histoire.md`)</li><li>`equipe/_writer-system.md` est figé et cohérent avec `pmo/INVARIANTS.md` + `pmo/decisions.md`</li><li>Briefs user sont **autoporteurs** : aucune référence `cf fichier X` (writers MCP reçoivent system + user, sans Read filesystem)</li><li>Brief-histoire inclut : pitch, plan Ki/Sho/Ten/Ketsu **niveau plan léger**, contraintes longueur/dialogues, garde-fous, **leviers de variance (4 versions angularisées sur 10)**, **boussole péda 4-5 ans**</li><li>**PMO relit avant lancement étape 4** : passe de relecture mécanique sur cohérence system/user + négations gratuites. Tant qu'il y a des alertes : kanban étape 4 = 🔴 BLOQUÉ</li></ul> |
| **Pas d'autres fichiers dans `briefs/`** | <ul><li>❌ Pas de `README.md` (le kanban + le nom des briefs parlent d'eux-mêmes)</li><li>❌ Pas de `brief-univers.md` (contenu gravé en `equipe/_writer-system.md` depuis 2026-05-15)</li><li>❌ Pas de `_writer-package.md` (remplacé par system/user split depuis 2026-05-15)</li><li>Si trouvés dans une histoire ancienne (002 historique) : **archiver** dans `_archive/` avec note expliquant que le contenu a migré</li></ul> |
| **Condition de passage** | Auto-validé Directeur + verdict PMO sur cohérence system/user + négations |
| **Point de reprise** | Si reboot : relire `equipe/_writer-system.md` (figé) + `briefs/` (les 2 fichiers modulaires pour cette story) |
| **Modalité v2/v3** | <ul><li>**Briefs user** : ajustables jusqu'au lancement étape 4. Après lancement → figés.</li><li>**System `equipe/_writer-system.md`** : figé jusqu'au changement d'arc/saison. Modification en cours d'arc = désynchro rétrospective des histoires précédentes → **INTERDIT sauf votation Directeur+PMO+Auteur**</li></ul> |

---

## Étape 4 — Versions writers (14 versions parallèles, refonte 2026-05-12 v2, architecture système/user 2026-05-15)

> **Refonte 2026-05-12 v2** : passage de 10 → 14 writers pour calibration multi-modèles (Opus/Sonnet/Haiku + Kimi déf/reco/thinking + DeepSeek déf/reco + Grok déf/reco). Période d'évaluation : 3-5 histoires, puis arbitrage réduction (ticket ARCHI-008 dans backlog).
> **"reco"** = température recommandée créatif officielle par fournisseur (pas "max" — car au-delà = incohérence narrative). Détail [`references/temperatures-llm.md`](references/temperatures-llm.md).
> **Refonte 2026-05-15** : architecture writer **system/user split** → tous les writers reçoivent system=`equipe/_writer-system.md` (permanent, figé par arc) + user=`brief-personnages.md` + `brief-histoire.md` (modulaires par story).
> Source de vérité chiffres + détail : [`../pmo/INVARIANTS.md`](../pmo/INVARIANTS.md) § *Casting writers étape 4*.

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (orchestrateur) — Writers exécutent |
| **Mécanique d'appel (refonte 2026-05-15)** | <table><tr><th>Bloc</th><th>Comment l'invoquer</th><th>System + User prompts</th></tr><tr><td>Claude ×6 (Opus/Sonnet/Haiku × déf/reco)</td><td>Agent tool → `narration-writer-claude-libre` (1 invocation par couple modèle+température)</td><td>System : Lit `equipe/_writer-system.md` via Read tool<br/>User : Lit `brief-personnages.md` + `brief-histoire.md` via Read tool</td></tr><tr><td>Kimi libre ×3 (déf/reco/thinking)</td><td>Directeur appelle directement MCP `ask_kimi` (pas d'agent dédié)</td><td>System : `equipe/_writer-system.md` inliné dans prompt<br/>User : `brief-personnages.md` + `brief-histoire.md` inlinés dans prompt</td></tr><tr><td>Kimi guidé ×1</td><td>Agent tool → `narration-writer-kimi-guide` (qui call MCP `ask_kimi`)</td><td>System : `equipe/_writer-system.md` inliné<br/>User : `brief-personnages.md` + `brief-histoire.md` + axes 1-6 (+ `brief-writer-guide.md` si fourni) inlinés</td></tr><tr><td>DeepSeek ×2 (déf/reco)</td><td>Directeur appelle directement MCP `ask_deepseek`</td><td>System : `equipe/_writer-system.md` inliné<br/>User : `brief-personnages.md` + `brief-histoire.md` inlinés</td></tr><tr><td>Grok ×2 (déf/reco)</td><td>Directeur appelle directement MCP `ask_grok` (`reasoning_effort: low`)</td><td>System : `equipe/_writer-system.md` inliné<br/>User : `brief-personnages.md` + `brief-histoire.md` inlinés</td></tr></table> |
| **Inputs** | <ul><li>**System (figé par arc)** : `equipe/_writer-system.md` (patte, univers, casting, règles Saison 1)</li><li>**User (par story)** : `brief-personnages.md` + `brief-histoire.md` (trio, lieu, plan, contraintes, leviers variance)</li><li>Optionnel (writer guidé) : `3-briefs/brief-writer-guide.md` (trame / axes 1-6)</li><li>Référence vocale (si production audio) : [`../personnages/voix-meta/_CHEATSHEET-WRITERS.md`](../personnages/voix-meta/_CHEATSHEET-WRITERS.md)</li></ul> |
| **Outputs** | <ul><li>13 versions LIBRES : `versions-writers/claude-opus-def.md`, `claude-opus-reco.md`, `claude-sonnet-def.md`, `claude-sonnet-reco.md`, `claude-haiku-def.md`, `claude-haiku-reco.md`, `kimi-reco.md`, `kimi-k26-instant.md`, `kimi-k26-thinking.md`, `deepseek-def.md`, `deepseek-reco.md`, `grok-def.md`, `grok-reco.md`</li><li>1 version GUIDÉE : `versions-writers/kimi-reco-guide.md` (axes 1-6 + trame story si fournie via `brief-writer-guide.md`)</li><li>Notes d'intention en fin de chaque fichier (frontmatter + section finale)</li><li>`kanban.md` étape 4 ✅</li></ul> |
| **Casting writers (14, calibration 2026-05-12 → réduction post-3-5 histoires)** | Détail complet dans [`../pmo/INVARIANTS.md`](../pmo/INVARIANTS.md) § *Casting writers étape 4*. Tableau résumé : <table><tr><th>#</th><th>Slug</th><th>Modèle</th><th>Param distinctif</th></tr><tr><td>1</td><td>claude-opus-def</td><td>`claude-opus-4-7`</td><td>défaut Anthropic</td></tr><tr><td>2</td><td>claude-opus-reco</td><td>`claude-opus-4-7`</td><td>temp 1.0 (plafond)</td></tr><tr><td>3</td><td>claude-sonnet-def</td><td>`claude-sonnet-4-6`</td><td>défaut</td></tr><tr><td>4</td><td>claude-sonnet-reco</td><td>`claude-sonnet-4-6`</td><td>temp 1.0</td></tr><tr><td>5</td><td>claude-haiku-def</td><td>`claude-haiku-4-5`</td><td>défaut</td></tr><tr><td>6</td><td>claude-haiku-reco</td><td>`claude-haiku-4-5`</td><td>temp 1.0</td></tr><tr><td>7</td><td>kimi-reco</td><td>`kimi-for-coding` (gratuit)</td><td>temp 0.6 reco Instant</td></tr><tr><td>8</td><td>kimi-k26-instant</td><td>`kimi-k2.6` (payant)</td><td>thinking: disabled</td></tr><tr><td>9</td><td>kimi-k26-thinking</td><td>`kimi-k2.6` (payant)</td><td>thinking: enabled</td></tr><tr><td>10</td><td>kimi-reco-guide (GUIDÉ)</td><td>`kimi-for-coding` (gratuit)</td><td>temp 0.6 + axes 1-6</td></tr><tr><td>11</td><td>deepseek-def</td><td>`deepseek-v4-pro`</td><td>défaut (1.0 API = 0.3 modèle)</td></tr><tr><td>12</td><td>deepseek-reco</td><td>`deepseek-v4-pro`</td><td>temp 1.5 (creative)</td></tr><tr><td>13</td><td>grok-def</td><td>`grok-4.3`</td><td>défaut xAI</td></tr><tr><td>14</td><td>grok-reco</td><td>`grok-4.3`</td><td>temp 1.2 (au-delà 1.5 incohérent)</td></tr></table> Détails LLM : [`infra/mcp/MODELS.md`](../../../infra/mcp/MODELS.md). Référence températures : [`references/temperatures-llm.md`](references/temperatures-llm.md). |
| **Différence libre vs guidé** | <ul><li>**LIBRE (13 writers)** : reçoit briefs + 5 garde-fous de FORME (ouverture courte, geste avant parole, fin image, longueur, promesse du titre). **Aucune indication de contenu** (pas de "mets une créature", pas d'onomatopée imposée). Variance native préservée.</li><li>**GUIDÉ (1 writer = kimi-guide)** : reçoit briefs + brief libre + **3 couches** : axes 1-6 (gravés INVARIANTS) + retours lecteurs histoires précédentes (via `lecons-vivantes.md`) + **trame spécifique story** si fournie via `3-briefs/brief-writer-guide.md`. Active 2-3 axes librement, jamais 4+.</li></ul> |
| **Leviers de variance disponibles (libres)** | Température et thinking déjà cadrés par le casting (déf vs max). POV, ouverture, longueur cible restent imposables par Directeur dans `brief-histoire.md` au cas par cas. |
| **Checklist auto-cohérence (tous writers)** | Chaque writer fait **une passe factuelle de 30 secondes** avant remise (prénoms casting, cohérence lieux/objets, surnoms 4/5). Pas de réécriture créative — corrige uniquement les bugs. Une 2e passe créative dilue la voix one-shot. |
| **Critères PASS** | <ul><li>14 versions présentes (sauf écart documenté)</li><li>Chaque version : 400-700 mots</li><li>Chaque version : note d'intention en fin</li><li>Aucun writer n'a lu les autres (stateless)</li></ul> |
| **Condition de passage** | Directeur lance étape 5 dès que les 14 versions sont produites |
| **Point de reprise** | Si reboot : compter fichiers présents dans `4-versions-writers/`. Relancer les writers manquants. |
| **Modalité v2/v3** | Aucune itération en étape 4. Si une version est défectueuse (vide, hors-format) → `_archive/` + relance du writer. |

---

## Étape 5 — Lecteurs témoins (panel 20)

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (orchestrateur) — Lecteurs exécutent (agents `narration-lecteur` + `narration-lecteur-dyade`, Sonnet) |
| **Inputs** | Les 14 versions writers + `equipe/profils-lecteurs.md` |
| **Panel cible — 20 lecteurs** | **10 profils × 2 tranches d'âge.** Tranche A 3-5 ans = priorité (cible Max). Tranche B 6-7 ans = info complémentaire (anticipation + détection histoires qui décrochent à 6-7 ans). |
| **Détail panel** | <table><tr><th>#</th><th>Profil</th><th>Tranche A 3-5 ans</th><th>Tranche B 6-7 ans</th></tr><tr><td>1-2</td><td>Garçon normal</td><td>G-A1</td><td>G-B1</td></tr><tr><td>3-4</td><td>Garçon intro/observateur</td><td>G-A2</td><td>G-B2</td></tr><tr><td>5-6</td><td>Garçon extra</td><td>G-A3</td><td>G-B3</td></tr><tr><td>7-8</td><td>Fille normale</td><td>F-A1</td><td>F-B1</td></tr><tr><td>9-10</td><td>Fille intro/observatrice</td><td>F-A2</td><td>F-B2</td></tr><tr><td>11-12</td><td>Fille extra</td><td>F-A3</td><td>F-B3</td></tr><tr><td>13-14</td><td>Dyade papa-Garçon</td><td>DPG-A</td><td>DPG-B</td></tr><tr><td>15-16</td><td>Dyade papa-Fille</td><td>DPF-A</td><td>DPF-B</td></tr><tr><td>17-18</td><td>Dyade maman-Garçon</td><td>DMG-A</td><td>DMG-B</td></tr><tr><td>19-20</td><td>Dyade maman-Fille</td><td>DMF-A</td><td>DMF-B</td></tr></table> |
| **Outputs** | <ul><li>`lecteurs-temoins/<profil>-<tranche>.md` × 20</li><li>`synthese-lecteurs.md` à la racine du dossier histoire (consolidation Directeur : classement + patterns + citations clés). Sert d'input à l'étape 6 ET alimente `equipe/lecons-vivantes.md` post-canonisation.</li><li>`kanban.md` étape 5 ✅</li></ul> |
| **Format fiche** | Texte libre obligatoire (pas de grille, pas de note sur 10). « J'ai aimé… / J'ai pas compris… / Je retiens… » + classement personnel des 10 versions. Pas de jargon technique (pas de "Kishōtenketsu", "ennéatype"). |
| **Critères PASS** | <ul><li>20 fichiers présents (sauf écart documenté)</li><li>Chaque fichier : retour personnel sur les 14 versions</li><li>`synthese-lecteurs.md` produit avec classement consolidé + patterns observés</li><li>Pondération : tranche A pèse plus dans la sélection (cible Max), tranche B en signal complémentaire</li></ul> |
| **Condition de passage** | Directeur déclenche étape 6 dès que `synthese-lecteurs.md` existe |
| **Point de reprise** | Si reboot : compter fichiers présents dans `5-lecteurs-temoins/` + vérifier existence `synthese-lecteurs.md`. Relancer ce qui manque. |
| **Modalité v2/v3** | Aucune itération |
| **Note historique** | Pour l'histoire 001 (Le Pont Cassé), le panel historique à 6 lecteurs (2 enfants + 4 dyades) reste figé pour ne pas re-faire. Panel 20 obligatoire pour TOUTES stories actives à partir de 002. |

---

## Étape 6 — Sélection

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (`narration`, Opus) |
| **Inputs** | Les 14 versions + 20 retours lecteurs (panel 20 OBLIGATOIRE dès STORY-002, décision 2026-05-13) + `equipe/memoire-dir.md` + `equipe/patte-narrative-maxplay.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/6-selection.md` (rempli depuis `equipe/templates/selection.template.md`)</li><li>`kanban.md` étape 6 ✅ + statut "EN ATTENTE AUTEUR"</li></ul> |
| **Format `selection.md`** | <ul><li>**Version base choisie** (laquelle des 10 + pourquoi)</li><li>**Éléments à récupérer** d'autres versions (citations précises)</li><li>**Réactions lecteurs** à prendre en compte (citations + interprétation)</li><li>**Brief de rewrite** : ce qui doit changer, ce qui doit rester intact</li><li>**Tiebreak rule** : si 2 versions sont à égalité, le Directeur choisit celle qui colle le plus à la patte (B+D+C) — pas celle qui plaît le plus au lecteur enfant si elle dérive du Kishōtenketsu</li></ul> |
| **Critères PASS** | <ul><li>`selection.md` rempli toutes sections</li><li>Choix justifié contre la patte narrative et les retours lecteurs</li><li>Brief rewrite actionnable (pas de "améliore globalement")</li></ul> |
| **Condition de passage** | ✅ **Auteur valide la sélection** (peut accepter, ajuster, ou demander un changement de version base) |
| **Point de reprise** | Si reboot : relire `selection.md` + statut kanban |
| **Modalité v2/v3** | Auteur peut demander une nouvelle sélection → Directeur produit `selection.v2.md` (ancien → `_archive/`). Plafond : 2 itérations puis escalade Conseiller. |

**SLA auteur :** 3 jours. Au-delà : kanban 🔴 BLOQUÉ.

---

## Étape 7 — Rewrite

> **Nature de l'étape (refondue 2026-05-08)** : Le rewrite est une **relecture finale par l'auteur du top 1**, pas une consolidation par injection de greffes externes. Logique : la version élue #1 par les lecteurs a gagné **sans avoir vu les autres**. Lui injecter ce qu'on a appris des autres = casser ce qui a fait son succès. L'auteur du top 1 (Kimi, Claude, etc.) **se relit avec sa propre note d'intention**, peaufine SI il sent qu'il y a lieu, sinon laisse tel quel.

> **Les patterns lecteurs ne sont pas perdus** : ils alimentent [`equipe/lecons-vivantes.md`](lecons-vivantes.md) pour les **futures** histoires (Conseiller / Architecte / writers de 005+).

| Champ | Valeur |
|---|---|
| **Owner par défaut** | Writer du top 1 (auteur de la version sélectionnée). Si LLM externe (Kimi/DeepSeek/Grok) → orchestré par le Directeur via MCP. Si Claude → agent `narration-writer-claude-libre`. |
| **Owner de repli** | Si le writer du top 1 dilue trop / sur-réécrit → Directeur (`narration`, Opus) reprend la main avec un rewrite Claude maîtrisé. Si rien ne tient → on canonise la base brute. |
| **Inputs** | `selection.md` + texte de la version base (`versions-writers/<top1>.md`) + sa propre note d'intention. **PAS** : autres versions writers, synthèse lecteurs, retours bruts. (Évite la pollution / cherry-picking.) |
| **Outputs** | <ul><li>`stories/<NNN-slug>/7-rewrite/<llm>-rewrite-v1.md` (ex: `kimi-rewrite-v1.md`, `claude-rewrite-v1.md`)</li><li>Note de relecture en fin de fichier (3-5 phrases : combien de modifs, pourquoi, zones non touchées)</li><li>`kanban.md` étape 7 ✅</li></ul> |
| **Règles dures stylistiques** | <ul><li>**Conserver le temps verbal** de la base (pas de bascule présent↔imparfait par contamination)</li><li>**Conserver l'ouverture** (premières phrases) si elle est sensorielle ou structurante</li><li>**Conserver la spine** : un lecteur de la base reconnaît le texte</li><li>Cible : longueur base ±10% (pas plus de 50 mots ajoutés)</li></ul> |
| **Critères PASS** | <ul><li>Spine identifiable</li><li>Pas de greffes injectées depuis d'autres versions writers (sauf cas exceptionnel documenté)</li><li>Longueur 400-700 mots</li><li>Patte respectée (B+D+C, pas de dérive A/F)</li><li>Garde-fous narratifs (parents hors-scène, pas de morale, ennéatype dilué, etc.)</li><li>Onomatopées : 0 ou 1, choisie dans [`../cross-culture/onomatopees/catalogue-onomatopees.md`](../cross-culture/onomatopees/catalogue-onomatopees.md)</li></ul> |
| **Condition de passage** | Directeur déclenche étape 8 dès que `v1.md` existe |
| **Point de reprise** | Si reboot : relire `rewrite/v1.md` (s'il existe) + `selection.md` + kanban |
| **Modalité v2/v3** | **1 cycle max.** Si v1 ne convient pas après GateKeeper ou auteur → retour étape 6 (nouvelle sélection avec autre version base). Pas de v2 de rewrite. |

---

## Étape 8 — GateKeeper

| Champ | Valeur |
|---|---|
| **Owner** | GateKeeper (`narration-gatekeeper`, Haiku) |
| **Inputs** | Le rewrite (`rewrite/<llm>-rewrite-v1.md`) + `personnages/lookup.yml` + `pmo/decisions.md` + `equipe/memoire-gatekeeper.md` + `equipe/onomatopees-cross-culture.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/8-gatekeeper-verdict.md`</li><li>`kanban.md` étape 8 ✅ ou ❌</li><li>Mise à jour `equipe/memoire-gatekeeper.md` (erreurs récurrentes détectées)</li></ul> |
| **Checklist PASS (toutes binaires)** | <ul><li>☐ Prénoms/surnoms vs `lookup.yml`</li><li>☐ Genres/pronoms cohérents</li><li>☐ Longueur 400-700 mots</li><li>☐ Chaque perso ≥ 2 répliques</li><li>☐ ≥ 1 échange de 3+ répliques</li><li>☐ Pas de morale explicite (« il avait appris que… »)</li><li>☐ Pas d'antagoniste</li><li>☐ Univers pas nommé (Éveil, Totems, Janus — implicites)</li><li>☐ Ennéatypes jamais étiquetés</li><li>☐ Surnoms 4/5 du temps</li><li>☐ Ten pas anxiogène</li><li>☐ Pas d'épilogue italique (post-001)</li><li>☐ Parents jamais en scène (saison 1)</li><li>☐ Compagnons = ondes/couleurs si présents</li><li>☐ Sensibilité différenciée (pas hiérarchie savoir)</li></ul> |
| **Critères PASS** | Tous les items binaires ✅. Si une case ❌ → verdict CORRECTIONS avec liste précise (5 min max). |
| **Condition de passage** | <ul><li>**PASS** → étape 9</li><li>**CORRECTIONS** → Directeur applique correctifs (modifie le rewrite directement, pas de nouvelle version) → re-soumet GateKeeper → PASS</li><li>**REJET STRUCTUREL** (rare, problème majeur narratif) → retour étape 6 avec note Conseiller</li></ul> |
| **Point de reprise** | Si reboot : relire `gatekeeper-verdict.md` (s'il existe) — sinon relancer GateKeeper sur le rewrite |
| **Modalité v2/v3** | Pas d'itération de verdict — un seul verdict par soumission. Si corrections, on re-soumet jusqu'à PASS. |

---

## Étape 9 — Re-relecture du rewrite (NOUVEAU)

> **Pourquoi cette étape** (ajoutée 2026-05-08) : le rewrite est une consolidation textuelle. Sans re-validation lecteurs, on prend le risque qu'une greffe ou une retouche ait abîmé ce qui plaisait. Cette étape **dérisque la canonisation**.

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (orchestrateur) — Lecteurs exécutent (`narration-lecteur` + `narration-lecteur-dyade`, Sonnet) |
| **Inputs** | Le rewrite seul (`rewrite/<llm>-rewrite-v1.md`). **Sans** la version base d'origine, **sans** les autres versions writers — lecture neutre, lecteur reçoit juste le texte candidat à canonisation. |
| **Panel — 20 lecteurs (panel complet)** | **Identique au panel étape 5** : 10 profils × 2 tranches d'âge (3-5 / 6-7). Décision auteur 2026-05-13 : panel 20 obligatoire pour TOUTES stories actives (y compris STORY-002). |
| **Format** | Fiches courtes (plus courtes qu'à l'étape 5 — pas de classement, pas de comparaison entre versions, juste **lecture du texte candidat seul**) : « J'ai aimé / J'ai pas compris / Je retiens / Je relirais oui-non ». Si le lecteur a déjà lu la base à l'étape 5, **on ne lui rappelle pas** — il lit naïf. |
| **Outputs** | <ul><li>`stories/<NNN-slug>/9-relecture-rewrite/<profil>-<tranche>.md` × 20</li><li>`stories/<NNN-slug>/9-relecture-rewrite/synthese.md` (verdict consolidé Directeur)</li><li>`kanban.md` étape 9 ✅</li></ul> |
| **Critères PASS** | <ul><li>20 fiches présentes (sauf écart documenté pour STORY-001 qui conserve panel historique de 6 lecteurs)</li><li>**Aucun retour structurel négatif** convergent (3+ lecteurs signalent la même régression = signal fort)</li><li>Au moins 70% des lecteurs (14/20) répondent positivement à « je relirais »</li><li>Si la version 5 du même panel avait classé la base #1 chez un profil et que ce même profil note maintenant une régression nette → bloquant</li></ul> |
| **Condition de passage** | <ul><li>**PASS** → étape 10</li><li>**CORRECTIONS LÉGÈRES** (1-2 micro-ajustements signalés convergents) → Directeur corrige le rewrite, **pas** de re-relecture supplémentaire (sauf si correction structurelle)</li><li>**RÉGRESSION SIGNIFICATIVE** → retour étape 7 (1 cycle de plus max), ou décision auteur de canoniser la **base brute** si rien ne tient</li></ul> |
| **Point de reprise** | Si reboot : compter fichiers présents dans `relecture-rewrite/`. Relancer ce qui manque. |
| **Modalité v2/v3** | 1 cycle de re-relecture max. Si après corrections étape 7 il y a encore régression → on canonise la base brute (top 1 sans rewrite). |
| **Note historique — STORY-001 seule exception** | STORY-001 (Le Pont Cassé) conserve son panel historique de 6 lecteurs (2 enfants + 4 dyades) — canonisée avant cette décision, ne pas refaire. Panel 20 obligatoire pour TOUTES stories actives à partir de STORY-002. |

---

## Étape 10 — Canonisation

| Champ | Valeur |
|---|---|
| **Owner** | Directeur (rédige) + PMO (canonise) |
| **Inputs** | Rewrite GateKeeper-PASS et re-relecture-PASS + `kanban.md` + `equipe/templates/synthese.template.md` + `equipe/lecons-vivantes.md` |
| **Outputs** | <ul><li>`stories/<NNN-slug>/10-texte.md` ← **CANON** (copie du rewrite validé)</li><li>`stories/<NNN-slug>/10-synthese-finale.md` (compilation des analyses Directeur)</li><li>`stories/<NNN-slug>/README.md` (frontmatter YAML rempli)</li><li>`kanban.md` étape 10 ✅</li><li>Mises à jour mémoires : `memoire-conseiller.md`, `memoire-dir.md`, `memoire-architecte.md`</li><li>**Mise à jour `equipe/lecons-vivantes.md`** : ce qu'on a appris sur cette histoire (patterns confirmés, pièges identifiés, axes nouveaux)</li><li>Régénération `stories/INDEX.md` (script `generate-index.js`)</li><li>Entrée `pmo/sprint-log.md` + ticket clos dans `pmo/backlog.md`</li><li>Entrée `pmo/decisions.md` si décision narrative a émergé</li></ul> |
| **Critères PASS** | <ul><li>`texte.md` existe et identique au rewrite re-relu PASS</li><li>`README.md` YAML valide</li><li>`stories/INDEX.md` régénéré</li><li>3 mémoires mises à jour</li><li>**`lecons-vivantes.md` enrichi** (ce qu'on a appris)</li><li>Ticket fermé dans backlog</li></ul> |
| **Condition de passage** | ✅ **Auteur valide la version finale** |
| **Point de reprise** | Si reboot : `texte.md` présent ? Si oui mais index pas à jour → relancer scripts. Si non → recopier depuis le rewrite après validation auteur. |
| **Modalité v2/v3 (post-canon)** | V2 demandée plus tard → `texte.md` actuel déplacé en `_archive/canon-v1-YYYY-MM-DD.md` + nouveau cycle complet étapes 4-10 (briefs/plan rarement modifiés). Trace dans `README.md` (changelog V1 → V2 → V3). |

**SLA auteur :** 3 jours. Au-delà : kanban 🔴 BLOQUÉ.

### 🚨 RÈGLE DURE — Ne JAMAIS supprimer la matière de fabrication post-canon

**Décision tranchée 2026-05-08 + incident 2026-05-12** :

À la canonisation, la matière de fabrication (`4-versions-writers/`, `5-lecteurs-temoins/`, `rewrite/`, `selection.md`, `synthese-lecteurs.md`, `gatekeeper-verdict.md`, `relecture-rewrite/`) **doit être CONSERVÉE** pour traçabilité.

**Deux options autorisées** :

1. **Tout laisser en place** dans le dossier `stories/<NNN-slug>/` (simple — option par défaut)
2. **Déplacer dans `stories/<NNN-slug>/_archive/fabrication-YYYY-MM-DD/`** si encombrement visuel devient gênant (avec note dans README)

**Option interdite** : `rm -rf` ou `git rm` de cette matière. **Jamais.**

#### Pourquoi cette règle

- Permet à Papa Yann de relire les drafts writers et fiches lecteurs à tout moment (apprentissage continu)
- Préserve les sources vivantes de mémoires actives (`patte-papa-yann.md` cite par exemple `papa-yann-relecture-2026-04-30.md`)
- Permet aux agents futurs (Architecte, Conseiller, Directeur) d'analyser ce qui a marché ou pas
- Évite de reconstruire à partir d'une analyse incomplète ou biaisée (la synthèse finale est forcément lossy)

#### Incident référence 2026-05-12

Le commit `58b491ed` du 2026-05-08 (« canonisation 001 Le Pont Cassé + refonte catalogue (`rm -rf legacy`) ») a supprimé **~80 fichiers** de fabrication (001 actuel + 002 complet + 003-v2 + 004) sans archivage. Restauré via `git checkout 37cda252 --` le 2026-05-12 après détection par Papa Yann (« on a perdu tous les dossiers de writers relecteur du 001 ou je rêve ??? »).

**Cause racine** : l'agent qui a fait la canonisation a interprété la décision 2026-05-08 « nettoyage du commit » comme « suppression » alors que la décision tranchée disait littéralement « **présence en `_archive/` pour traçabilité** » (`pmo/decisions.md` 2026-05-08 Décision C).

**Apprentissage pour les futurs canonisations** :
- L'agent qui canonise doit relire `pmo/decisions.md` 2026-05-08 Décision C **avant** tout `rm`
- Le PMO doit valider toute suppression de matière de fabrication avant qu'elle parte au commit
- Si en doute → laisser en place, demander à Papa Yann

---

## Reprise après reboot

Procédure standard pour tout agent reprenant une histoire :

1. **Lire `stories/<NNN-slug>/kanban.md`** — source de vérité de l'étape en cours
2. **Lire `stories/<NNN-slug>/README.md`** — état + persos + thème
3. **Lire le dernier output produit** :
   - Étape 1 : `pitch.md`
   - Étape 2 : `plan-histoire.md`
   - Étape 3 : `briefs/`
   - Étape 4 : compter `4-versions-writers/` (combien sur 14 — casting v2 dès 2026-05-12, STORY-001 historique = 8)
   - Étape 5 : compter `5-lecteurs-temoins/` (combien sur 20 — panel 20 OBLIGATOIRE dès STORY-002, STORY-001 historique = 6) + `synthese-lecteurs.md`
   - Étape 6 : `selection.md`
   - Étape 7 : `rewrite/<llm>-rewrite-v1.md`
   - Étape 8 : `gatekeeper-verdict.md`
   - Étape 9 : compter `relecture-rewrite/` (combien sur 3-4)
   - Étape 10 : `texte.md`
4. **Lire `pmo/decisions.md`** — règles tranchées récentes
5. Reprendre à l'étape signalée par le kanban

---

## Glossaire (extrait — version complète dans [`INDEX.md`](INDEX.md))

| Terme | Définition |
|---|---|
| **Pitch (MOYEN 4 cases)** | Objet titre · duo+Wex · lieu · moment d'ouverture (optionnel) |
| **Plan d'Histoire** | Squelette Kishōtenketsu : Ki/Sho/Ten/Ketsu, persos, contraintes |
| **Brief writer** | Document stateless lu par chaque writer : univers + personnages + histoire |
| **Version writer** | Texte complet 400-700 mots + note d'intention créative |
| **Note d'intention** | Le pourquoi des choix créatifs du writer (pas technique) |
| **Variance** | Levier appliqué aux 4 versions Claude+Kimi pour multiplier les angles (angle narratif / POV / ouverture / longueur) |
| **Lecteur témoin** | Profil simulé : 2 enfant seul + 2 dyade parent-enfant. Texte libre obligatoire. |
| **Sélection** | Décision Directeur post-lecteurs : version base + éléments à récupérer + brief rewrite |
| **Rewrite** | Réécriture v1 unique post-sélection (1 cycle max) |
| **GateKeeper** | Validation technique binaire (15 critères checklist) |
| **Canon** | `texte.md` GateKeeper-PASS + auteur-validé. Figé sauf V2 explicite. |
| **Kanban** | `stories/<NNN-slug>/kanban.md` — source de vérité de l'étape en cours |

---

## Liens rapides

- [`INDEX.md`](INDEX.md) — index complet de l'équipe
- [`ORGANIGRAMME.md`](ORGANIGRAMME.md) — agents et chaîne de commandement
- [`cartographie-domaines.md`](cartographie-domaines.md) — où va quelle info
- [`patte-narrative-maxplay.md`](patte-narrative-maxplay.md) — patte B+D+C
- [`templates/`](templates/) — 10 gabarits de briefs et docs
- [`lecons-vivantes.md`](lecons-vivantes.md) — patterns confirmés (P1-P10, G1-G6)
- [`../pmo/decisions.md`](../pmo/decisions.md) — décisions tranchées
- [`../stories/_gabarit/`](../stories/_gabarit/) — gabarit de dossier histoire unifié
