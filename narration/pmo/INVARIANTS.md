# Invariants Narration � Source de V�rit� Unique

> **Tout chiffre cl� ou r�gle structurelle vit ICI.** Le reste du projet pointe vers ce fichier.
> Si tu trouves un chiffre divergent ailleurs (ex: "8 versions" dans un kanban) ? ce fichier gagne, l'autre est obsol�te.

---

## Chiffres cl�s PROCESS (refonte 2026-05-08)

| M�trique | Valeur | Notes |
|----------|--------|-------|
| �tapes PROCESS | **10** (0, 1, 3-10 � �tape 2 supprim�e 2026-05-12 par fusion avec �tape 1) | Owner / Inputs / Outputs / Crit�res PASS d�finis par �tape |
| Pr�fixage fichiers stories | **Oui depuis 2026-05-12** | `1-pitch-plan.md`, `3-briefs/`, `4-versions-writers/`, `5-lecteurs-temoins/`, `6-selection.md`, `7-rewrite/`, `8-gatekeeper-verdict.md`, `9-relecture-rewrite/`, `10-texte.md`. Fichiers transverses (kanban, README) sans pr�fixe. |
| Versions writers (�tape 4) | **14** (refonte 2026-05-12 v2 � calibration multi-mod�les) | 6 Claude (2 Opus + 2 Sonnet + 2 Haiku, d�f/**reco**) + 4 Kimi (d�f/reco/thinking/guid�) + 2 DeepSeek (d�f/reco) + 2 Grok (d�f/reco) � d�tail bloc *Casting writers �tape 4* ci-dessous. "reco" = temp�rature recommand�e cr�atif officielle (cf. [`../equipe/references/temperatures-llm.md`](../equipe/references/temperatures-llm.md)) |
| Panel lecteurs (�tape 5) | **20** OBLIGATOIRE (toutes stories d�s STORY-002) |
| Panel re-relecture (�tape 9) | **20** OBLIGATOIRE (toutes stories d�s STORY-002) |
| Validations auteur obligatoires | **3** : �tape 1 (Pitch), �tape 6 (S�lection), �tape 10 (Canon) |
| Plafond rewrite (�tape 7) | **1 cycle max** par histoire |
| SLA "EN ATTENTE AUTEUR" | **3 jours** ? au-del� : kanban ?? BLOQU� |
| Max tickets actifs PMO | **3** simultan�s |
| Fichiers obsol�tes �tape 3 | **brief-univers.md** (contenu ? _writer-system.md), **_writer-package.md** (remplac� brief-histoire.md format Couche 2+3) � depuis 2026-05-15 DEC-WRITER-ARCH-001 |

---

## Casting writers �tape 4 (14 versions � refonte calibration 2026-05-12 + architecture 2026-05-15)

> **Source de v�rit� unique pour "combien de writers / quels mod�les / libre vs guid� / temp�rature"**. D�tail m�canique d'appel : `narration/equipe/PROCESS.md` L.108-140.
> **Refonte 2026-05-12** : passage de 10 � 14 writers pour calibration mod�les+temp�rature sur 3-5 histoires (r�duction � config finale apr�s). Test : Opus/Sonnet/Haiku d�faut vs cr�atif + Kimi thinking vs non-thinking + DeepSeek/Grok �tendus.
> **Architecture system/user 2026-05-15** (DEC-WRITER-ARCH-001) : tous writers re�oivent **system = `equipe/_writer-system.md`** (Couche 1 universelle, fig�e par arc) + **user = `stories/NNN/3-briefs/brief-histoire.md`** (Couche 2 histoire + Couche 3 guid�). Cons�quences : `brief-univers.md` OBSOL�TE (contenu ? system.md), `_writer-package.md` OBSOL�TE (remplac� par split system/user).

| Bloc | # | Identit� | Mod�le | Thinking/Reasoning | Temp�rature | Top-p | Invocation | Brief |
|------|---|----------|--------|--------------------|-------------|-------|------------|-------|
| **Claude** | 1 | claude-opus-def | `claude-opus-4-7` | low | **d�faut Anthropic** (param non envoy�, �1.0) | d�faut | `narration-writer-claude-libre` | LIBRE |
| | 2 | claude-opus-reco | `claude-opus-4-7` | low | **1.0** (plafond Anthropic = reco cr�atif) | d�faut | `narration-writer-claude-libre` | LIBRE |
| | 3 | claude-sonnet-def | `claude-sonnet-4-6` | low | d�faut Anthropic | d�faut | `narration-writer-claude-libre` | LIBRE |
| | 4 | claude-sonnet-reco | `claude-sonnet-4-6` | low | 1.0 | d�faut | `narration-writer-claude-libre` | LIBRE |
| | 5 | claude-haiku-def | `claude-haiku-4-5` | low | d�faut Anthropic | d�faut | `narration-writer-claude-libre` | LIBRE |
| | 6 | claude-haiku-reco | `claude-haiku-4-5` | low | 1.0 | d�faut | `narration-writer-claude-libre` | LIBRE |
| **Kimi** | 7 | kimi-reco | `kimi-for-coding` (endpoint coding) | n/a | **0.6** (reco cr�atif Moonshot Instant) | � (param non expos�) | `ask_kimi` (MCP gratuit) | LIBRE |
| | 8 | kimi-k26-instant | `kimi-k2.6` | **disabled** (forcer Instant) | fixe K2.6 (ignor� API) | 0.95 fixe K2.6 | **`ask_kimi_payant`** (`thinking: "disabled"`) | LIBRE |
| | 9 | kimi-k26-thinking | `kimi-k2.6` | **enabled** (d�faut K2.6) | fixe K2.6 (ignor� API) | 0.95 fixe K2.6 | **`ask_kimi_payant`** (`thinking: "enabled"` ou omis) | LIBRE |
| | 10 | kimi-reco-guide | `kimi-for-coding` (endpoint coding) | n/a | 0.6 (reco cr�atif Instant) | � (param non expos�) | `narration-writer-kimi-guide` ? `ask_kimi` gratuit | **GUID�** (axes 1-6 + le�ons + trame histoire) |
| **DeepSeek** | 11 | deepseek-def | `deepseek-v4-pro` | off | **d�faut DeepSeek** (1.0 API = 0.3 mod�le r�el) | d�faut | `ask_deepseek` (MCP) | LIBRE |
| | 12 | deepseek-reco | `deepseek-v4-pro` | off | **1.5** (reco officielle DeepSeek creative writing) | d�faut | `ask_deepseek` (MCP) | LIBRE |
| **Grok** | 13 | grok-def | `grok-4.3` | low | **d�faut xAI** (�1.0, param non envoy�) | d�faut | `ask_grok` (MCP) | LIBRE |
| | 14 | grok-reco | `grok-4.3` | low | **1.2** (haut reco cr�atif � au-del� 1.5 = incoh�rent) | d�faut | `ask_grok` (MCP) | LIBRE |

> **R�gles "temp�rature"** :
> - `def` = ne PAS envoyer le param. Laisse le fournisseur appliquer son d�faut.
> - `reco` = valeur officielle "creative writing" du fournisseur (cf. [`../equipe/references/temperatures-llm.md`](../equipe/references/temperatures-llm.md) � doc autorit�).
> - R�f�rence Papa Yann 2026-05-12 : "max ? reco" parce que `2.0` Grok/Kimi = incoh�rent narratif.
>
> ? **Cohabitation stricte MCP Kimi (refonte 2026-05-12 � r�sout ARCHI-009)** :
> - **`ask_kimi`** (gratuit, endpoint `kimi.com/coding/v1`, env `MOONSHOT_API_KEY`) ? writers #7 kimi-reco + #10 kimi-reco-guide + tout usage g�n�ral. Mod�le `kimi-for-coding`. Temp 0.6 reco Moonshot Instant.
> - **`ask_kimi_payant`** (officiel, endpoint `api.moonshot.ai/v1`, env `MOONSHOT_PAYANT_API_KEY`) ? STRICTEMENT writers #8 kimi-k26-instant (thinking disabled) + #9 kimi-k26-thinking (thinking enabled). Mod�le `kimi-k2.6`. Temp et top_p fixes par K2.6 (params ignor�s par l'API � seul `thinking` est contr�lable, doc Moonshot).
> - **Diff�renciation K2.6** : sur K2.6, le SEUL levier est `thinking: {"type": "enabled"\|"disabled"}`. Temp et top_p sont fixes c�t� mod�le (doc officielle 2026-05-13 https://platform.kimi.ai/docs/api/models-overview#parameter-comparison).
> - D�tail : [`infra/mcp/MODELS.md`](../../infra/mcp/MODELS.md) � *Cohabitation stricte*.

**Total : 13 writers LIBRES + 1 writer GUID� = 14 versions.**

**Note casting FIGÉ** : Casting 14 writers IMMUABLE. Retrait du writer #9 (kimi-k26-thinking) PROPOSÉ par PMO 2026-05-16, REFUSÉ par Papa Yann 2026-05-17. **CASTING PERMANENT = 14, jamais régresser sans décision auteur explicite datée.** Exclusion de #9 vague 4 STORY-002 UNIQUEMENT = garde-fou test (AP-WRITER-THINKING-001 : mode thinking incompatible briefs causalités BOUSSOLE), pas retrait définitif. Future vague = réévaluer sur nouveau brief ou new writer approach avant exclusion permanente.

**Évaluation** : après 3-5 histoires, arbitrage réduction à config finale (~6-8 writers optimaux). Ticket `ARCHI-NNN` pour suivi (cf. backlog).

### Leviers de variance (imposables par Directeur dans `brief-histoire.md`)

| Levier | Options |
|--------|---------|
| **Temp�rature** | Param MCP par writer (Claude : 0.0�1.0 / Kimi/DeepSeek/Grok : 0.0�2.0). Si non sp�cifi�e ? d�faut mod�le. |
| **Angle narratif** | Sobre � Sensoriel � Dynamique (dialogues) � Instinct (libre) |
| **POV / focal** | Wex t�moin � perso A � perso B � narrateur invisible |
| **Ouverture** | In medias res � ouverture lente � dialogue d'amorce |
| **Longueur cible** | 400 mots � 550 mots � 700 mots |

?? Le bloc `## Les 4 Writers � angles assign�s` de `equipe/ORGANIGRAMME.md` parle de **4 angles narratifs**, pas de 4 writers. C'est un levier de variance, pas une r�partition writers.

### 6 axes du writer GUID� (annexe AXES 1-6 � `narration-writer-kimi-guide`)

1. **Cr�ature vivante** (objet/lieu/�l�ment a une �me)
2. **Geste avant parole** (action physique avant dialogue)
3. **Onomatop�e l�g�re** (ploc, frou, tsing � pas BOUM)
4. **Fin rituel** (cl�ture par geste r�p�t�, pas morale)
5. **Myst�re vs r�solution** (laisser zone d'ombre)
6. **Faute volontaire** (d�tail "imparfait" qui rend humain)

R�gle : le writer guid� active **2-3 axes librement, jamais 4+**. Source vivante : `equipe/lecons-vivantes.md`.

---

## Casting fig� (V1 Christ FR)

10 persos (9 + Wex), fig� 2026-04-24, ajust� 2026-05-05, **rename T3 2026-05-13**.

**Gabarit structure** : chaque perso (`type-NN/` ou `wex/`) suit le gabarit figé 5 fichiers (DEC-GABARIT-PERSO-001, 2026-05-15) : README · enneagramme · personnage · alive · voix. Source détail : [`../personnages/INDEX.md`](../personnages/INDEX.md) § Gabarit figé.

| Type | Pr�nom complet | Diminutif | Sexe |
|------|----------------|-----------|------|
| 0 hors-syst�me | Wex | Wex | invariant cross-culture |
| 1 Perfectionniste | Melchis�dech | Melki | M |
| 2 Aidant | Marie | Mimi | F |
| 3 Performeur | David | Dadou | M |
| 4 Individualiste | Madeleine | Madie | F |
| 5 Observateur | Luc | Lulu | M |
| 6 Loyal | Pierre | Pierrot | M |
| 7 Enthousiaste | Rapha�lle | Raph | F |
| 8 Challenger | Judith | Juju | F |
| 9 Pacificateur | No� | Nono | M |

Bilan : **4F / 5M + Wex**. Source : [`../personnages/INDEX.md`](../personnages/INDEX.md).
**Historique** : Polo (Paul) ? Dadou (David) 2026-05-13 (collision sonore Polo?Nono, voir `decisions.md` DEC-RENAME-POLO-DADOU).

---

## Voice IDs ElevenLabs (�tat 2026-05-13)

| Perso | Voice ID | M�thodo | Naming biblioth�que |
|-------|----------|---------|---------------------|
| Wex | `G54e8CyYslC2Y4ZupTlg` | v24 | Lumi Wex H�ros |
| Dadou | `5wcx0KzRnrP48I5RCVD8` | v2 | Lumi Dadou Fier |
| Melki | `sWfumkYiI1QERQ5INqRQ` | v1 | Lumi Melki Pr�cis |
| Pierrot | `ukIKjXqbiGGkqIz0SW5c` | pr�-v24 | (conserv�) |
| Raph | `Te5RKnm9ebwdEvZ1S5pS` | pr�-v24 (conserv�) | Lumi Raph Vive |
| Lulu | `1XwHANMW4m2pxt7buPmQ` | v1 (filtre cumulatif vaincu) | Lumi Lulu L�ger |
| Nono | `f3w48h8ngnWWnhO9XGb3` | pr�-v24 (conserv�) | Lumi Nono Paisible |
| Juju | `WFNYCPhDQM9w07KAV6Be` | v1 (m�thodo v24 fille) | Lumi Juju Solide |
| Mimi | `aPQfyqve0ovOsJIl7EzX` | v1 (m�thodo v24 fille) | Lumi Mimi Attentive |
| Madie | `9JvOiMFLj8GdHK3Fcydn` | v1 (m�thodo v24 fille) | Lumi Madie Vibrante |

D�tail complet : [`../personnages/voix-meta/_VOICE-IDS-CASTING.md`](../personnages/voix-meta/_VOICE-IDS-CASTING.md).
**Historique** : Polo ? Dadou (2026-05-13, voice_id conserv� `5wcx0KzRnrP48I5RCVD8`, naming ElevenLabs "Lumi Polo Fier" ? "Lumi Dadou Fier" par utilisateur).

---

## Production audio multi-voix (figée 2026-05-16 + 3 durcissements 2026-05-16 14:00)

**Méthode officielle** : MCP `studio_audiobook_from_segments_v2_dialogue` (wrapper text-to-dialogue ElevenLabs API).

| Métrique | Valeur | Notes |
|----------|--------|-------|
| **Voie par défaut OBLIGATOIRE** | **MCP `studio_audiobook_from_segments_v2_dialogue`** (durcissement #1, 2026-05-16) | Ordrestre text-to-dialogue API, concat, loudnorm. Clé API en env MCP. Fallback = script CLI debug seulement. |
| **Modèle ElevenLabs FORCÉ** | **`eleven_v3`** (durcissement #2, 2026-05-16) | Seul modèle supportant audio tags v3 inline (`[softly]`, `[excited]`, etc.). Pas d'autre modèle, pas de fallback, jamais inventer. |
| **Résolveur voice_ids unique** | **`narration/personnages/voix-meta/voice-map.json`** (durcissement #3, 2026-05-16) | Lookup clé `role` → voice_id. Source humaine autorité = `_VOICE-IDS-CASTING.md`. Vieux voice_ids rejetés automatiquement. |
| Endpoint API | `POST /v1/text-to-dialogue` (via MCP wrapper) | Multi-voix natif, cohérence prosodique |
| Plafond caractères par requête | **2000** (total, y.c. tags v3) | Dur. MCP packetise auto. |
| Voice IDs par appel | **Jusqu'à 10** | MaxPlay utilise 10 persos + narrateurs (2 max par appel) |
| Audio tags supportés | Oui, avec `eleven_v3` | Catalogue complet dans skill `audio-direction-elevenlabs` |
| Moteur concat final | ffmpeg `loudnorm` | Concat 2-3 paquets text-to-dialogue SEULEMENT (pas 32 segments) |
| Anti-pattern | ❌ 32+ TTS séparés | Produit transitions abruptes, volumes inégaux, intonations cassées |
| Script legacy | `narration/scripts/generate-story-audio.js` | DÉPRÉCIÉ (implémente anti-pattern). Archivé 2026-05-16. Remplacé par `generate-story-dialogue.js` (CLI fallback). |

**Méthodologie** :
1. Préparer texte canon + tags v3 inline (`[softly]`, `[excited]`, etc.)
2. Créer JSON segments : `[{role: "wex", text: "..."}]`
3. Appeler MCP `studio_audiobook_from_segments_v2_dialogue` (voice-map.json lookup auto)
4. MCP packetise < 2000 char, 1 appel API par paquet, concat + loudnorm inline
5. Sortie : 1 MP3 multi-voix cohérent

**Owner production audio** : MCP outil (orchestré par Papa Yann post-VOIX-001/002/003). Consigne : appeler MCP, point.

**Source de vérité** : `pmo/decisions.md` DEC-AUDIO-PRODUCTION-001 v3 (figée 2026-05-16 14:00, jamais régresser sans décision explicite).

---

## Patte narrative

**B+D+C** : Kishotenketsu + tranche de vie + cycle.

Source : [`../equipe/patte-narrative-maxplay.md`](../equipe/patte-narrative-maxplay.md).

---

## R�gles d'or structurelles

1. **Casting V1 fig�** � ne pas inventer de pr�noms hors casting
2. **Surnoms 4/5 du temps** dans les histoires � pr�nom complet r�serv� au solennel
3. **Enn�atype DILU�** � jamais nomm� explicitement dans le texte
4. **Univers IMPLICITE** � pas d'exposition, montrer en touches l�g�res
5. **Parents hors-sc�ne** � jamais d'adulte sauveur, l'histoire se r�sout entre enfants
6. **Pas de morale** � la promesse du titre se tient, le lecteur inf�re
7. **Onomatop�es 0 ou 1** par histoire, choisie dans `cross-culture/onomatopees/catalogue-onomatopees.md`
8. **Writer du top 1 garde la main au rewrite** (r�gle 2026-05-08) � pas de greffes externes
9. **Conservation mati�re fabrication** � `versions-writers/`, `lecteurs-temoins/`, etc. NE SONT JAMAIS SUPPRIM�S apr�s canonisation
10. **Z�ro n�gation dans Voice Design ElevenLabs** (AP#16)

---

## Histoires (�tat production)

| # | Titre | Statut | Owner courant |
|---|-------|--------|---------------|
| 001 | Le Pont Cass� | ? canon (refonte 2026-05-08) | � |
| 002 | La La Libellule impossible | ?? **�tape 6 s�lection en cours** (�tapes 0-5 ?, Q-ouvertes ? DEC-TENSION-RESONANCE 2026-05-12, casting Wex+Juju+Nono, panel 20 lecteurs ?, top writers identifi�s) | Directeur (arbitrage s�lection) |
| 003+ | � d�marrer | ? � | � |

---

## Comment utiliser ce fichier

**Quand consulter** :
- Avant d'�crire un chiffre cl� dans un kanban / pitch / brief
- Avant de valider une d�cision qui touche au PROCESS
- En cas de doute "c'est 6 ou 20 lecteurs ?"

**Quand mettre � jour** :
- Toute d�cision qui modifie un chiffre cl� ? MAJ ici **avant** de propager ailleurs
- Toute cr�ation d'un voice_id ? ajouter ici **et** dans `_VOICE-IDS-CASTING.md`
- Toute �volution casting ? ici + `personnages/INDEX.md`

**R�gle** : ce fichier est court par design (~100 lignes). Si tu veux ajouter une section longue ? la mettre ailleurs et pointer ici.
