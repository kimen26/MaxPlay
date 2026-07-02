# Backlog PMO Narration

> **Règle :** 3 tickets actifs maximum. Pas plus.
> **Format :** `STATUT | ID | Titre | Priorité | Assigné | Prochaine action`
>
> Statuts : 🟡 En cours · ⚪ À faire · 🔴 Bloqué · ✅ Terminé

---

## En cours

| Statut | ID | Titre | Priorité | Assigné | Prochaine action |
|--------|-----|-------|----------|---------|------------------|
| 🔴 | **STORY-002-SELECTION-REFONTE** | **La Libellule impossible — Étape 6 Refonte complète (vague 4 + duel goût)** | **CRITIQUE** | Directeur + PMO | 6-selection.md périmé (vague 2). Refaire : utiliser synthese-lecteurs vague 4 (2026-05-17), appliquer intention Directeur (DEC-BRIEF-CURSEUR), générer duel-data JSON (12 duels + finale). Attendre résultat Duel de goût. Blocker étape 7. Cible : dès duel-data prêt. |
| 🟡 | ARCHI-006 | Formaliser procédure PMO dans `narration-pmo.md` (agent Haiku) | Normale | narration-pmo | Créer doc agent reflet des décisions 2026-05-08 : classification input (6 catégories), routing, checklist remise main. Cible : PMO auto-guidé sans attendre instructions. |
| 🟡 | **ARCHI-014-TEMPLATE-BOUSSOLE** | **Adapter template brief-histoire.md = BOUSSOLE (DEC-BRIEF-CURSEUR)** | **Haute** | Directeur + PMO | Créer `equipe/templates/brief-histoire-v4-BOUSSOLE.template.md` (intentions + 6 causalités-ESSENCE, zéro phrase publiable). Section « Intention Directeur » obligatoire. Documenter différence BOUSSOLE vs GPS. Repercuter dans STORY-003+ avant étape 3. **Bloqué** si brief STORY-003 écrit sans template. |
| 🟡 | **ARCHI-DUEL-001** | **MVP « Duel de goût » — site/duel.html + site/duel-data.js** | **Haute** | Dev | Créer PWA légère site/duel.html + code JS duel-data.js (12 duels + finale). Génération auto des duels depuis vague 4 STORY-002. Offline capable, export JSON. Intégration MCP script post-étape 5. Cible : 2026-07-10. |

---

## À faire

| Statut | ID | Titre | Priorité | Assigné | Prochaine action |
|--------|-----|-------|----------|---------|------------------|
| ⚪ | **TEST-PANEL-CALIBRATION** | **Test calibration panel 12 (one-shot)** | **Haute** | Auteur + Dev | Tester 2 paires benchmarks DEC-PANEL-V2 : paire 1 (écart connu vague 3 kimi vs grok) + paire 2 (quasi-identique). Mesurer reproductibilité. Décisif pour go/no-go full 12 panel STORY-003+. Cible : fin 2026-07-15. |
| ⚪ | **PROPAGATE-DEC-PANEL** | **Propager DEC-PANEL-V2 + DEC-BRIEF-CURSEUR dans INVARIANTS + PROCESS** | **Haute** | PMO | MAJ INVARIANTS.md § Chiffres clés (panel 20 → 12, structure 4 groupes × 3 modèles). MAJ PROCESS.md étapes 5 et 9 (owner, mécanique lecteurs). Ajouter section « Intention Directeur » dans brief-histoire template. Cible : 2026-07-08. |
| ⚪ | **CRAFT-001** | **Créer skill parent `narration-craft/` + sous-structure 16 domaines** | **Critique** | PMO | Router fichier (~200 lignes) + délégation 16 domaines. Chaque domaine = pointeur vers contenu (à extraire depuis deprecated ou existant). **Cible : fin 2026-06-09.** DEC-NARR-CRAFT-RESURRECTION. |
| ⚪ | **CRAFT-002** | **Extraire + remapper 16 skills depuis deprecated** | **Critique** | Directeur + Dev | Lire `~/.claude/skills/99-deprecated/`, extraire 16 files, appliquer remap casting ANCIEN→V1 (accords genre inclus), valider narratif. **Cible : fin 2026-06-10.** Voir INVARIANTS.md casting remap table. |
| ⚪ | **CRAFT-003** | **Implémenter câblage PROCESS : étapes 2B/3/7/10** | **Haute** | PMO | Modifier `equipe/PROCESS.md` : ajouter invoke `narration-craft` par étape. Tester 1 appel sur STORY-002 rewrite. **Cible : 2026-06-11.** |
| ⚪ | **CRAFT-004** | **Tester intégration CRAFT dans rewrite STORY-002** | **Haute** | Auteur | Lancer rewrite étape 7 avec `narration-craft` (`prose` + `micro` + `theatre`). Feedback : util ? Timing ? **Cible : 2026-06-12.** |
| ⚪ | **ARCHI-014** | **Implémentation DEC-WRITER-ARCH-001 : system/user unified writers** | **CRITIQUE** | Directeur + PMO | Décision figée 2026-05-15. Créer `equipe/templates/couche-2-brief-histoire-template.md` (Couche 2+3 format). Refondre gabarits brief-histoire.md. Adapter narration-writer-claude-libre + narration-writer-kimi-guide. Mettre à jour PROCESS.md étape 3-4. Archiver brief-univers.md + _writer-package.md (obsolètes). **TEST URGENT** : appliquer vague 3 STORY-002 immédiatement. |
| ⚪ | **ARCHI-008** | **Réduire casting writers après 3-5 histoires de calibration** | **Haute** (post-évaluation) | Auteur + PMO | Config 14 writers est test — après évaluation STORY-002/003/004, arbitrer réduction vers 6-8 writers optimaux. Comparer top 1 par modèle (Opus/Sonnet/Haiku Claude vs Kimi défaut/thinking/guidé vs DeepSeek vs Grok). Documenter ratio modèle/température gagnant dans `decisions.md`. À relancer PMO fin STORY-004. |
| ⚪ | **VOIX-001** | **Créer agent `voice-director` (EP-026)** — markup émotionnel ElevenLabs | **Haute** | Auteur + Audio | Convertit didascalies FR (`*(doucement)*`) → tags v3 ElevenLabs (`[softly]`). Vocab autorisé dans `personnages/voix-meta/_CHEATSHEET-WRITERS.md`. Couvre jeu + narration. Pré-requis pour passer à l'audio des histoires. |
| ⚪ | **VOIX-002** | **Créer voice_id ElevenLabs des 2 narrateurs (H + F)** | **Haute** | Auteur | Voice Design ElevenLabs depuis prompts `personnages/voix-meta/narrateur-h.md` + `narrateur-f.md`. Stocker voice_id dans frontmatter des fichiers. Pré-requis pour générer l'audio. |
| ⚪ | **VOIX-003** | **Créer voice_id ElevenLabs des 10 persos (4-5 ans)** | Normale (après VOIX-002) | Auteur | Voice Design ElevenLabs depuis prompts `personnages/type-NN/voix.md` + `wex/voix.md`. Stocker voice_id dans frontmatter. F + M variant pour chaque type (sauf Wex M only). **Note 2026-05-12** : décision en cours sur "10 voix dédiées" vs "2-3 voix de base + tags variants" (test Wex v20 neutre en cours). |
| ✅ | **AUDIO-SCRIPT-V2** | **Script production audio (text-to-dialogue packetisé) + MCP wrapper** | **Haute** | Auteur + Dev | ✅ **LIVRÉ + DURCISSEMENT 2026-05-16 14:00** : (1) Script CLI `generate-story-dialogue.js` = fallback debug. (2) MCP `studio_audiobook_from_segments_v2_dialogue` = voie par défaut OBLIGATOIRE (model `eleven_v3`, voice-map.json lookup, concat+loudnorm inline). Durcissements gravés DEC-AUDIO-PRODUCTION-001 v3. Test réussi Dino-Encyclopédie pilot. Prochaine action : test STORY-002 post-étape 10 canon (bloqué VOIX-001 markup + VOIX-002 narrateurs). |
| ⚪ | **AUDIO-DELTA-D1** | **Audit API : tester si `stability` est l'unique paramètre voice settings text-to-dialogue** | Normale | Auteur + Dev | Delta ouvert DEC-AUDIO-PRODUCTION-001 L.52 : doc EL 2026-05-16 affirme "stability seul paramètre" mais ancien script utilisait aussi `similarity_boost` + `style`. Tester empiriquement : POST text-to-dialogue avec trio voice_id + si `similarity_boost`/`style` appliqués → sont-ils ignorés ? Documenter dans `decisions.md` si nécessaire. Critère PASS : test réussi sur 1 segment STORY-002, findings documentés. |
| ⚪ | **AUDIO-001** | **Bruitages SFX par histoire** | Normale | Auteur + Audio | API `POST /v1/sound-generation` (EL Sound Effects). Bruitages : pas Wex, clac de la planche, vent dans les pissenlits, ruisseau, etc. Étudier intégration dans le MP3 final (mix ffmpeg en arrière-plan). Skill `audio-direction-elevenlabs` à enrichir avec section SFX. |
| ⚪ | **AUDIO-002** | **Musique de fond par histoire** | Normale | Auteur + Audio | MCP officiel EL `compose_music` (déjà installé). Musique douce printemps pour 001, mélancolique pour 002, etc. Mix sous-jacent (~ -20 dB sous voix). Tester aussi `Suno` / `Stable Audio` en alternative. |
| ⚪ | **AUDIO-003** | **Logo WexWorld + logos par story** | Normale | Auteur + Design | Logo principal "WexWorld" (univers). Variante par histoire (001 = drapeau-pissenlit ?). Format SVG/PNG. À utiliser dans : page HTML test, future app mobile, splash audio. |
| ⚪ | **AUDIO-004** | **Page HTML avancement/test histoires** | Normale | Auteur + Game-dev | Dans `site/`, page `histoires.html` listant les histoires avec : MP3 player intégré, texte + tags v3 inline, statut canon/draft, stats lecture, lien retours lecteurs. Permettrait à Papa Yann d'écouter + lire en parallèle, partager des liens. |
| ⚪ | **ARCHI-007** | **Challenges narration-pmo itération 2** — C-1 checklist hardcodée + C-2 rapport synthétique | Normale | narration-pmo | Audit game-pmo remonte 6 challenges, 2 seulement applicables direct PMO turbo. ARCHI-007 = checklist `[✅/❌]` hardcodée fin de session + rapport synthétique «  fichiers modifiés / décisions / tickets » scannable 5 sec. Voir sprint-log.md 2026-05-11. |
| ⚪ | **ARCHI-009** | **PIPELINE-MEMORY.md narration** — 3e niveau mémoire meta-process | Normale | narration-pmo | Extraire de `decisions.md` les patterns meta-process (checklist relecture brief, phases A/B/C template story, règles routing agents, SLA étapes). Créer `pmo/PIPELINE-MEMORY.md` structuré. Actuellement dilué sans forme dans decisions.md. |
| ⚪ | **ARCHI-010** | **Anti-patterns narration explicites** — `equipe/anti-patterns-narration.md` | Normale | narration-pmo + Directeur | Documenter les anti-patterns connus : briefs avec négations gratuites, rewrite trop gourmands en idées, pitch sans trio d'action, etc. Créer `equipe/anti-patterns-narration.md`. |
| ⚪ | **ARCHI-011** | **Mnémonique 1-ligne narration** — équivalent game-pmo "Toile pas de moraline" | Basse | Auteur | Trouver le mnémonique cohésif de la narration MaxPlay. Candidats : "Souple pas de saule" ou TBD. Doit tenir en 1 phrase, mémorable, référençable dans les briefs. |
| ⚪ | **ARCHI-012** | **Cartographie multi-fichiers narration-pmo** — tableau Fichier / Rôle / Où noter | Normale | narration-pmo | narration-pmo gère 30+ fichiers sans tableau de référence rapide. Créer `pmo/cartographie-fichiers.md` : tableau Fichier / Rôle / Où tu y notes. Référence pour diagnostiquer incohérences au premier coup d'oeil. |
| ⚪ | **ARCHI-DASH** | **Dashboard HTML narration** — vue agrégée 4 piliers | Normale | (à assigner) | Cartes-persos (10 + Wex) + déroulables prénoms par culture (30) + carte 4 arcs S1 + histoires canon. Lien depuis `site/index.html`. Backlog post-audio. |
| ⚪ | **CROSS-001** | **Peupler `cross-culture/lieux-locaux/`** au fil des histoires | Normale (continue) | Conseiller + Auteur | Quand une histoire utilise un décor récurrent (pont, talus, mare, lisière…) → créer la fiche `<decor>.md` pour préparer le portage cross-culture. |
| ⚪ | **CROSS-002** | **Peupler `cross-culture/faune-flore/`** au fil des histoires | Normale (continue) | Conseiller + Auteur | Quand une histoire utilise un animal/plante (papillon, écureuil, oiseau, plante printanière…) → créer la fiche. |
| ⚪ | **CROSS-003** | **Peupler `cross-culture/saisons-climat/`** au fil des histoires | Normale (continue) | Conseiller + Auteur | Quand une histoire convoque une saison/condition climatique comme contexte fort. |
| ⚪ | **CROSS-004** | **Peupler `cross-culture/coutumes-jeux-aliments/`** au fil des histoires | Normale (continue) | Conseiller + Auteur | Quand une histoire convoque un geste culturel (aliment, jeu, rituel quotidien). |
| ⚪ | STORY-003 | Histoire Melki (T1) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Casting × 2 (Melki valorisé 2×). |
| ⚪ | STORY-004 | Histoire Mimi (T2) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Mimi valorisée 2×. Nota : 004-cartable-a-trou arc 2 en pause. |
| ⚪ | STORY-005 | Histoire Dadou (T3) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Dadou valorisé 2× (sauf si retenu en duo Nono). |
| ⚪ | STORY-006 | Histoire Madie (T4) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Madie ajustée (expression vivante). Valorisée 2×. |
| ⚪ | STORY-007 | Histoire Lulu (T5) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Lulu ajustée (discret observateur). Valorisée 2×. |
| ⚪ | STORY-008 | Histoire Juju (T8) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Juju valorisée 2× (sauf si retenue en duo Nono). |
| ⚪ | STORY-009 | Histoire Pierrot (T6) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Pierrot valorisé 2× (déjà en 001 avec Raph, duo à renouveler). |
| ⚪ | STORY-010 | Histoire Raph (T7) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Raph valorisée 2× (déjà en 001 avec Pierrot, duo à renouveler). |
| ⚪ | ARCHI-006 | Formaliser procédure PMO dans `.claude/agents/narration-pmo.md` | Normale | narration-pmo (Haiku) | Créer doc agent reflet des décisions 2026-05-08 : classification input (6 catégories), routing, checklist remise main. Cible : PMO auto-guidé sans attendre instructions. |
| ⚪ | **INPUT-004** | **Cosmos/ordre cosmique — Platon/Stoïciens/Enoch** | **Haute** | Conseiller + Auteur | Brainstorm Conseiller sur 4 Q-ouvertes : distillation 4-ans · saison/arc porteur · lien biorésonance · Wex musicien. Puis intégration univers/cosmos.md ou univers/logos-stoicien.md. Fichier inbox: 2026-05-24-cosmos-ordre-platon-stoiciens.md |
| ⚪ | **INPUT-005** | **Harmonie des Sphères — Pythagore/Platon/Kepler** (compagnon INPUT-004) | **Haute** | Conseiller + Auteur | Piste forte : Wex entend la musique des sphères (note qui détonne = signal qu'un ami va mal). Lien direct biorésonance. 4 Q-ouvertes : 8 Sirènes vs casting 10 · note de Wex · matérialisation « ça sonne juste » 4 ans · fusion biorésonance/sphères en concept unifié. Fichier inbox: 2026-05-24-harmonie-des-spheres.md |
| ⚪ | UNIVERS-001 | Trancher nom de l'univers | Normale | Auteur | Choisir parmi 21 candidats + pistes "Wex World" / "Wex Bou" (`univers/meta/nom-candidats.md`) |
| ⚪ | STORY-004-ARC2 | Cartable-à-trou — Dadou · Lulu · Mimi · Wex (ARC 2) | Pause arc 2 | — | pitch validé — **arc 2 Parole en pause depuis 2026-04-30** (`stories/004-cartable-a-trou/pitch.md`) |
| ⚪ | STORY-005-ARC2 | Le Mardi — Wex · Pierrot · Melki · graine (ARC 2) | Pause arc 2 | — | pitch validé — **arc 2 Parole en pause** (`stories/005-le-mardi/pitch.md`) |
| ⚪ | STORY-006-ARC2 | Sept à rien — Juju · Mimi · Wex · blocs (ARC 2) | Pause arc 2 | — | pitch validé — **arc 2 Parole en pause** (`stories/006-sept-a-rien/pitch.md`) |
| ⚪ | **UNIVERS-004** | **Peupler `cross-culture/faune-flore/`** — fil des histoires S1 | Normale (continue) | Conseiller + Auteur | STORY-002 (libellule impossible) = premier candidat. Chaque histoire avec animal/plante remarquable → créer fiche `<espece>.md` pour portage cross-culture. Démarrer maintenant que STORY-002 est à l'étape 6. |
| ⚪ | **UNIVERS-005** | **Peupler `cross-culture/saisons-climat/` + coutumes-jeux-aliments/** — fil des histoires S1 | Normale (continue) | Conseiller + Auteur | Quand une histoire convoque une saison ou un rituel culturel fort → créer les fiches. Alimenter au fil de S1. |
| ⚪ | **ARCHI-013** | **Créer `equipe/exemples-canoniques.md`** — ébauche post-Phase D | Normale | Directeur + PMO | `equipe/INDEX.md` lignes 41-43 mentionne ce fichier "à créer post-Phase D". Risque oubli si Phase D s'éloigne. Créer ébauche + tracker timeline Phase D. |
| ⚪ | UNIVERS-002 | Définir `univers/societe.md` (Vocation · Pouvoir Intérieur · Mission du jour) | Normale | Auteur · Conseiller | À définir ensemble — concept "contribution joyeuse" remonté du Grok aetheria, demande explicite auteur, absent de l'univers actuel |
| ⚪ | UNIVERS-003 | Borner invariant vs variant dans l'expression ennéatype par culture | Normale | Auteur · Conseiller | À définir : où s'arrête le « même Type N partout » et où commence la variance culturelle légitime ? Documenter règles d'écriture par ennéatype × culture (futur `cross-culture/doctrine-expression-par-type.md`). Voir `cross-culture/doctrine.md` section dédiée. |
| ⚪ | NARR-001 | Discussion D4 — Cross-culture micro-structures | **Haute** | Auteur · Conseiller | À creuser ensemble : règles micro-structurelles culturelles (call-and-response africain, cycles amérindiens, etc.) à autoriser dans les bulles culturelles, sans tomber dans le cliché. À cadrer avant ouverture du 2e casting national. |
| ✅ | NARR-002 | Définir le brief writer | Normale | Directeur | **Résolu 2026-04-30** : 3 templates produits (`equipe/templates/brief-{univers,personnages,histoire}.template.md`) avec sections obligatoires + règles héritées de `pmo/decisions.md`. Ratio dialogue à noter dans le synthese.md de chaque story pour info, pas seuil dur. |
| ⚪ | NARR-003 | Définir les sensibilités différenciées de chaque perso (Wex + 9) | Normale | Auteur · Conseiller | 9 sensibilités déjà figées (cf. décision 2026-04-28). Reste : **détailler ce que perçoit chacun précisément** (ce que c'est, ce que ce n'est pas, ce qui les active, ce qu'ils en font). Surtout **Wex — à définir** (piste : écoute des fausses notes / soin-bioélectrique). Idéalement en préparation de S2. |
| ⚪ | NARR-004 | Définir S3 (saison 3 vide) | Basse | Auteur · Conseiller | Saison 3 actuellement vide dans la roadmap. À pitcher quand la S1 sera plus avancée et que la S2 sera cadrée. |
| ⚪ | INFRA-001 | Timeout CLI Claude (180s) vs bot Telegram (.env 600s) | Normale | Infra | Bot Telegram lit bien `CLAUDE_TIMEOUT_MS=600000` mais timeout 180000ms vient de la CLI `claude` elle-même (pas du bot). À investiguer : flag CLI `--timeout` ou passage env au `spawn()` dans `infra/bot/index.ts` ~ligne 390. Observation 2026-05-11. |

---

## Terminés

| Statut | ID | Titre | Date |
|--------|-----|-------|------|
| ✅ | ARCHI-009 | Cohabitation stricte MCP Kimi gratuit + payant (résout 3 Q-ouvertes) | 2026-05-12 |
| ✅ | TEST-PROCESS-001 | 001 V2 chemin CORRECTION (test parallèle abandonné) | 2026-05-08 |
| ✅ | TEST-PROCESS-003 | 003-le-pont-casse-v2 — PROCESS 11 étapes complet (canonisé 001) | 2026-05-08 |
| ✅ | STORY-002-V2 | Le Rire qui reste — V2 (en pause arc 2, diffère à S2) | 2026-05-08 |
| ✅ | STORY-002 | Le Rire qui reste — canon (489 mots · GateKeeper PASS) | 2026-04-28 |
| ✅ | ARCHI-004 | Refonte équipe writers — 5 writers + briefs stateless + agents | 2026-04-28 |
| ✅ | ARCHI-005 | Refonte workflow narratif — 4 writers + lecteurs témoins + GateKeeper + Conseiller/Architecte | 2026-04-28 |
| ✅ | STORY-001-V1 | Le Pont Cassé — V1 + comité de lecture | 2026-04-24 |
| ✅ | ARCHI-001 | Restructuration narration (stories/, pmo/, équipe) | 2026-04-27 |
| ✅ | ARCHI-002 | Suppression histoires/ legacy + migration axes-en-stock | 2026-04-27 |
| ✅ | ARCHI-003 | Nettoyage docs/ (dead code, refs orphelines) | 2026-04-27 |
| ✅ | INPUT-001 | Distillation INBOX 2026-04-27 → univers/ (transport, sensibilités, école, géographie) | 2026-04-28 |
| ✅ | INPUT-002 | Symbolique ésotérique → enneagramme/symbolique.md (pierre, astre, couleur) | 2026-04-28 |
| ✅ | INPUT-003 | Voix ElevenLabs → equipe/voix/ (10 fichiers, 4 couches × 9 types + Wex) | 2026-04-28 |
| ✅ | PERSO-001 | Restructuration personnages multi-pays (type-NN/, wex/, lookup.yml, identite.md) | 2026-04-28 |

---

## Comment créer un ticket

1. Identifier la source : axe stock, dump INBOX.md, décision à prendre
2. Vérifier qu'il y a < 3 tickets actifs — sinon attendre
3. Ajouter une ligne dans "À faire" avec un ID unique (`STORY-NNN`, `PERSO-NNN`, `UNIVERS-NNN`, `ARCHI-NNN`)
4. Quand démarré : déplacer dans "En cours" + mettre à jour `sprint-log.md`
5. Quand terminé : déplacer dans "Terminés" avec date
