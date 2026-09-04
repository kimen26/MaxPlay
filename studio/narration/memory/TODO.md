# TODO — Narration

> **Règle :** 3 tickets actifs maximum en même temps. Tickets fermés → [`archive/backlog-fermes-2026.md`](archive/backlog-fermes-2026.md) (verbatim).
> **Format :** `STATUT | ID | Titre | Priorité | Assigné | Prochaine action` — Statuts : 🟡 En cours · ⚪ À faire · 🔴 Bloqué · ✅ Terminé (déplacer en archive)

---

## En cours

- **GLOSSAIRE** [~] — Vocabulaire unique PARTOUT (`memory/GLOSSAIRE.md`, 2026-09-04) : produit = « Histoires », monde = « WexWorld » (remplace « univers »), Wex = garçon de 4 ans, Narrateur H/F ; « WexWorld » côté JEU (Phaser) à renommer.

| Statut | ID | Titre | Priorité | Assigné | Prochaine action |
|--------|-----|-------|----------|---------|------------------|
| ⏳ | **INGESTION-LECTURE-V6** | **STORY-002 vague 6 — lecture annotée Papa Yann puis ingestion** | **CRITIQUE** | **Papa Yann → Directeur** | `site/lecture.html` chargé (14 versions vague 6 anonymisées, chips v3). Papa Yann annote sur téléphone → colle le JSON → Directeur ingère (memoire-papa-yann + palmarès) → étape 6 sélection vague 6. Panel v2 12 calls lançable en parallèle. |
| 🟡 | ARCHI-006 | Formaliser procédure PMO dans `narration-pmo.md` (agent Haiku) | Normale | narration-pmo | Créer doc agent reflet des décisions 2026-05-08 : classification input (6 catégories), routing, checklist remise main. Cible : PMO auto-guidé sans attendre instructions. |

---

## À faire

| Statut | ID | Titre | Priorité | Assigné | Prochaine action |
|--------|-----|-------|----------|---------|------------------|
| ⚪ | **TEST-PANEL-CALIBRATION** | *(déjà clos, voir archive — doublon corrigé lors de cette convergence : la ligne "À faire" historique restait après clôture réelle)* | — | — | Voir `archive/backlog-fermes-2026.md` § Terminés — ticket réellement clos 2026-07-04. |
| ⚪ | **PROPAGATE-DEC-PANEL** | **Propager DEC-PANEL-V2 + DEC-BRIEF-CURSEUR dans INVARIANTS + PROCESS** | **Haute** | PMO | MAJ INVARIANTS.md § Chiffres clés (panel 20 → 12, structure 4 groupes × 3 modèles). MAJ PROCESS.md étapes 5 et 9 (owner, mécanique lecteurs). Ajouter section « Intention Directeur » dans brief-histoire template. Cible : 2026-07-08. |
| ⚪ | **CRAFT-004** | **Tester intégration CRAFT dans rewrite STORY-002** | **Haute** | Auteur | À tester au rewrite étape 7, dès que STORY-002 sélection validée par Papa Yann (SLA 2026-07-07). |
| ⚪ | **ARCHI-014** | **Implémentation DEC-WRITER-ARCH-001 : system/user unified writers** | **CRITIQUE** | Directeur + PMO | Décision figée 2026-05-15. Créer `equipe/templates/couche-2-brief-histoire-template.md` (Couche 2+3 format). Refondre gabarits brief-histoire.md. Adapter narration-writer-claude-libre + narration-writer-kimi-guide. Mettre à jour PROCESS.md étape 3-4. Archiver brief-univers.md + `_writer-package.md` (obsolètes). **TEST URGENT** : appliquer vague 3 STORY-002 immédiatement. |
| ⚪ | **ARCHI-008** | **Réduire casting writers après 3-5 histoires de calibration** | **Haute** (post-évaluation) | Auteur + PMO | Config 14 writers est test — après évaluation STORY-002/003/004, arbitrer réduction vers 6-8 writers optimaux. Comparer top 1 par modèle. Documenter ratio modèle/température gagnant dans `DECISIONS.md`. À relancer PMO fin STORY-004. |
| ⚪ | **AUDIO-DELTA-D1** | **Audit API : tester si `stability` est l'unique paramètre voice settings text-to-dialogue** | Normale | Auteur + Dev | Delta ouvert DEC-AUDIO-PRODUCTION-001 : doc EL affirme "stability seul paramètre" mais ancien script utilisait aussi `similarity_boost` + `style`. Tester empiriquement. Critère PASS : test réussi sur 1 segment STORY-002, findings documentés. |
| ⚪ | **AUDIO-001** | **Bruitages SFX par histoire** | Normale | Auteur + Audio | API `POST /v1/sound-generation` (EL Sound Effects). Étudier intégration dans le MP3 final (mix ffmpeg en arrière-plan). Skill `audio-direction-elevenlabs` à enrichir avec section SFX. |
| ⚪ | **AUDIO-002** | **Musique de fond par histoire** | Normale | Auteur + Audio | MCP officiel EL `compose_music`. Mix sous-jacent (~ -20 dB sous voix). Tester aussi `Suno` / `Stable Audio` en alternative. |
| ⚪ | **AUDIO-003** | **Logo WexWorld + logos par story** | Normale | Auteur + Design | Logo principal "WexWorld". Variante par histoire. Format SVG/PNG. |
| ⚪ | **AUDIO-004** | **Page HTML avancement/test histoires** | Normale | Auteur + Game-dev | Dans `site/`, page `histoires.html` : MP3 player intégré, texte + tags v3 inline, statut canon/draft, stats lecture, lien retours lecteurs. |
| ⚪ | **ARCHI-007** | **Challenges narration-pmo itération 2** — C-1 checklist hardcodée + C-2 rapport synthétique | Normale | narration-pmo | Checklist `[✅/❌]` hardcodée fin de session + rapport synthétique scannable 5 sec. |
| ⚪ | **ARCHI-010** | **Anti-patterns narration explicites** — `equipe/anti-patterns-narration.md` | Normale | narration-pmo + Directeur | Documenter les anti-patterns connus : briefs avec négations gratuites, rewrite trop gourmands en idées, pitch sans trio d'action, etc. |
| ⚪ | **ARCHI-011** | **Mnémonique 1-ligne narration** — équivalent game-pmo "Toile pas de moraline" | Basse | Auteur | Trouver le mnémonique cohésif de la narration MaxPlay. |
| ⚪ | **ARCHI-012** | **Cartographie multi-fichiers narration-pmo** — tableau Fichier / Rôle / Où noter | Normale | narration-pmo | narration-pmo gère 30+ fichiers sans tableau de référence rapide. |
| ⚪ | **ARCHI-DASH** | **Dashboard HTML narration** — vue agrégée 4 piliers | Normale | (à assigner) | Cartes-persos (10 + Wex) + déroulables prénoms par culture + carte 4 arcs S1 + histoires canon. Backlog post-audio. |
| ⚪ | **CROSS-001** | **Peupler `cross-culture/lieux-locaux/`** au fil des histoires | Normale (continue) | Conseiller + Auteur | Quand une histoire utilise un décor récurrent (pont, talus, mare, lisière…) → créer la fiche `<decor>.md`. |
| ⚪ | **CROSS-002** | **Peupler `cross-culture/faune-flore/`** au fil des histoires | Normale (continue) | Conseiller + Auteur | Quand une histoire utilise un animal/plante → créer la fiche. |
| ⚪ | **CROSS-003** | **Peupler `cross-culture/saisons-climat/`** au fil des histoires | Normale (continue) | Conseiller + Auteur | Quand une histoire convoque une saison/condition climatique comme contexte fort. |
| ⚪ | **CROSS-004** | **Peupler `cross-culture/coutumes-jeux-aliments/`** au fil des histoires | Normale (continue) | Conseiller + Auteur | Quand une histoire convoque un geste culturel. |
| ⚪ | STORY-003 à STORY-010 | Histoires Melki/Mimi/Dadou/Madie/Lulu/Juju/Pierrot/Raph (T1-T8) — brainstorm à lancer | Normale | Auteur + Conseiller | Brainstorm après STORY-002 validé. Chaque perso valorisé 2× (sauf duos). |
| ⚪ | **INPUT-004** | **Cosmos/ordre cosmique — Platon/Stoïciens/Enoch** | **Haute** | Conseiller + Auteur | Brainstorm Conseiller sur 4 Q-ouvertes : distillation 4-ans · saison/arc porteur · lien biorésonance · Wex musicien. Fichier source : `inbox/2026-05-24-cosmos-ordre-platon-stoiciens.md`. Voir aussi `memory/matiere-a-distiller.md` (registre). |
| ⚪ | **INPUT-005** | **Harmonie des Sphères — Pythagore/Platon/Kepler** (compagnon INPUT-004) | **Haute** | Conseiller + Auteur | Piste forte : Wex entend la musique des sphères. Fichier source : `inbox/2026-05-24-harmonie-des-spheres.md`. |
| ⚪ | UNIVERS-001 | Trancher nom de l'univers | Normale | Auteur | **Note 2026-09-03 : possiblement obsolète — DEC-UNIVERS-NOM (2026-07-27, archivée) a déjà tranché WEX WORLD.** À reclasser Terminé après vérification narration-pmo. |
| ⚪ | STORY-004-ARC2 / STORY-005-ARC2 / STORY-006-ARC2 | Cartable-à-trou / Le Mardi / Sept à rien (ARC 2) | Pause arc 2 | — | Pitchs validés, arc 2 Parole en pause depuis 2026-04-30. |
| ⚪ | **UNIVERS-004** | **Peupler `cross-culture/faune-flore/`** — fil des histoires S1 | Normale (continue) | Conseiller + Auteur | STORY-002 (libellule impossible) = premier candidat. |
| ⚪ | **UNIVERS-005** | **Peupler `cross-culture/saisons-climat/` + coutumes-jeux-aliments/** — fil des histoires S1 | Normale (continue) | Conseiller + Auteur | Alimenter au fil de S1. |
| ⚪ | **ARCHI-013** | **Créer `equipe/exemples-canoniques.md`** — ébauche post-Phase D | Normale | Directeur + PMO | Mentionné "à créer post-Phase D" dans `equipe/INDEX.md` — risque oubli. |
| ⚪ | UNIVERS-002 | Définir `univers/societe.md` (Vocation · Pouvoir Intérieur · Mission du jour) | Normale | Auteur · Conseiller | Concept "contribution joyeuse" remonté d'un brainstorm Grok, absent de l'univers actuel. |
| ⚪ | UNIVERS-003 | Borner invariant vs variant dans l'expression ennéatype par culture | Normale | Auteur · Conseiller | Où s'arrête le « même Type N partout » et où commence la variance culturelle légitime ? |
| ⚪ | NARR-001 | Discussion D4 — Cross-culture micro-structures | **Haute** | Auteur · Conseiller | Règles micro-structurelles culturelles à autoriser dans les bulles culturelles, sans cliché. À cadrer avant ouverture du 2e casting national. |
| ⚪ | NARR-003 | Définir les sensibilités différenciées de chaque perso (Wex + 9) | Normale | Auteur · Conseiller | 9 sensibilités déjà figées. Reste à détailler ce que perçoit chacun précisément. Surtout Wex (piste : écoute des fausses notes / soin-bioélectrique). |
| ⚪ | NARR-004 | Définir S3 (saison 3 vide) | Basse | Auteur · Conseiller | À pitcher quand S1 sera plus avancée et S2 cadrée. |
| ⚪ | INFRA-001 | Timeout CLI Claude (180s) vs bot Telegram (.env 600s) | Normale | Infra | Bot Telegram lit bien `CLAUDE_TIMEOUT_MS=600000` mais timeout 180000ms vient de la CLI `claude` elle-même. `infra/bot/index.ts` ~ligne 390. |
| ⚪ | *(à créer)* BUSINESS-001 | Synthèse `memory/business/livre-histoire-multinationaux.md` (50 Ko brut, étude marché distribution multi-pays) | — | — | Non distillé. Cible : `roadmap.md § Horizon long` ou `memory/` transverse business. Voir `matiere-a-distiller.md`. |

---

## Roadmap — Structure des saisons (tranchée 2026-04-29)

> Vision éditoriale, pas un planning ferme. Voir `DECISIONS.md` (Casting V1, patte B+D+C) et `../equipe/arcs-narratifs.md`.

| Saison | Axe | Statut | Personnages-clés |
|--------|-----|--------|------------------|
| **S1 — Enfance pure** | Que enfants. Sensibilités peu/pas présentes, maîtrise découverte en fin de saison. Compagnons (ondes-couleurs) apparaissent progressivement milieu/fin S1. Parents hors-cadre. | 🟡 En cours | Wex + 9 compagnons en ensemble |
| **S2 — Définition Wex + Visites** | Wex comprend sa sensibilité. Visite chacun des 9 en 1-1. Ennéatypes mis en avant. | ⚪ À venir | Wex en focal, 9 visités tour à tour |
| **S3** | À définir plus tard (NARR-004) | ⚪ Vide | — |
| **S4 — Décentrement** | Un des 9 devient personnage central (pas Wex). Beaucoup plus d'histoires en volume. | ⚪ À venir | 9 compagnons en focal tour à tour |
| **S# — Voyage / échange scolaire** | Cross-culture activé. Position non figée dans la chronologie. | ⚪ À venir (joker) | Wex + casting FR + casting d'un autre pays |

### Horizons

- **Court (1-2 mois)** : Pont Cassé V2, La Confidence (canon), Cartable-à-trou (plan), NARR-001/002/003, UNIVERS-001 (vérifier si déjà clos par DEC-UNIVERS-NOM).
- **Moyen (3-6 mois)** : terminer arc « La Parole » (002-006), ouvrir 1-2 arcs S1 supplémentaires, première apparition canon des compagnons-ondes, tester pipeline ElevenLabs TTS sur une histoire complète, définir S3.
- **Long (6-12 mois)** : compléter S1 (9 compagnons en focal au moins une fois), préparer transition S1→S2, décider du premier casting cross-country (Ghibli / Hébreu / Swahili), envisager publication.
- **Très long (12+ mois)** : S2 complète, S4 décentrement, S# voyage (premier croisement cross-culture), Phase 2 cross-culture.

### Ce qu'on ne fait pas (décisions négatives)

- Album illustré prioritaire → non (trop cher, trop lent)
- Écrire avant de trier les axes → non (stock d'abord)
- Nommer l'univers dans les histoires → jamais
- Faire entrer un parent en scène en S1 → jamais (prisme enfant pur)
- Donner forme animale aux compagnons → jamais (forme tranchée : ondes/couleurs)
- Hiérarchie « Wex sait, les autres ignorent » → jamais (sensibilité différenciée, pas savoir caché)

---

## Comment créer un ticket

1. Identifier la source : axe stock, dump INBOX.md, décision à prendre
2. Vérifier qu'il y a < 3 tickets actifs — sinon attendre
3. Ajouter une ligne dans "À faire" avec un ID unique (`STORY-NNN`, `PERSO-NNN`, `UNIVERS-NNN`, `ARCHI-NNN`)
4. Quand démarré : déplacer dans "En cours" + mettre à jour `MEMORY.md § Journal`
5. Quand terminé : déplacer dans `archive/backlog-fermes-2026.md` avec date
