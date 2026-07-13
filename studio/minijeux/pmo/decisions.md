# Décisions de fond — PMO Game

> **Règle :** Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée.
> En cas de doute : la dernière décision sur un sujet écrase les précédentes.
>
> Équivalent côté Narration : [`../../studio/narration/pmo/decisions.md`](../../narration/pmo/decisions.md).
> Créé 2026-05-13 (extraction depuis `memory/state.md` lors de l'harmonisation Game ↔ Narration).

---

## 2026-07-13 — Design System v1 adopté site entier — source de vérité site/css/mp-theme.css + site/js/mp-theme.js (commit 91ef327b)

**Contexte** : Papa Yann a validé le package Design System v1 (2 dépôts inbox 2026-07-12/13). Agents vague 3 ont converti 40 MJ en 24h, harnais vert.

**Décision figée** :

Design System v1 devient la **source de vérité couleur/thème/ambiance site entier** (index.html, 40 MJ+max-adventure, atelier avatar, encyclopédie dino, suivi parents, tout ce qui affiche).

**Techniquement** :
- **Fichier central** : `site/css/mp-theme.css` (4 rôles couleur fixe : --bg/--card sombres, --accent teinte avatar variable, --gold or UNIQUEMENT ★)
- **JS companion** : `site/js/mp-theme.js` (charger localStorage ambiance, appliquer --bg/--card/--accent dynamique)
- **Gabarit header MJ** : v1 (CSS .hdr locals) **REMPLACÉ par v2** (markup .hdr conservé, styles via mp-theme.css zéro CSS local)
- **Piste questions** : `.mp-track` classe stables (pas de rehash future) — ★ gold 1er coup / ✓ orange après essai / 💡 rouge doux aidé
- **Ambiances candidats** : nuit/jungle/ville/espace/arcade/musée (6 fixés, UI atelier avatar, localStorage maxplay_ambiance)
- **Célébrations MaxFX** : site/js/celebrations.js markPoint chaque bonne réponse · finalStar+belt cinematic (validation Papa Yann pending ressenti)

**Impact futur** :
- Tout MJ nouveau respectera mp-theme.css obligatoirement (pas d'exception locales tolérées)
- Nouveau jeu = tester avec 3-4 ambiances amont avant livraison
- Refonte design = 1 point d'entrée (mp-theme.css), pas 20 fichiers CSS MJ

**Exceptions documentées** (attente Papa Yann) :
- mj-08 design clair volontaire — exception permise ?
- mj-34/36/38/39 finalStar cinematic sur dernier palier (vs. strict sans-faute) — à trancher retours ressenti 48h

**Raison** : cohérence UX enfant (Max confus par jeux multicolore disparate) + maintenance design future (un seul fichier CSS à modifier pour refonte) + foundation pour monétisation v2 (skins ambiances payantes).

---

## Questions ouvertes (en attente validation Papa Yann)

| Question | Source | Priorité | Notes |
|----------|--------|----------|-------|
| **Avatar chibi top 10 dinos × 3 humeurs priorité ?** | Décision Papa Yann 2026-07-08 | MOYENNE | EP-072 créé. Générer via ChatGPT Dinosaure XXL (joyeux, énervé, original). À intégrer système profil + unlock. Attendre feedback shortlist candidats (EP-047). |
| **Trophées-puzzle v1 timing & conception ?** | Décision Papa Yann 2026-07-08 | MOYENNE | Avatar OU dessin liké fragmenté N morceaux, recompose image, gold variant. Prototype APRÈS refonte menu « La ligne de Max ». Brainstorm game-conseiller post-test 48h. |
| **Retrait 3 MJ du menu validé (01/13b/14) ?** | Revue Papa Yann 2026-07-07 | HAUTE | MJ-01 trop facile, MJ-13b doublon, MJ-14 autre raison. DÉCISION FIGÉE 2026-07-07. Implémentation : EP-070 clôturé (catalog.js status:hidden, 20 jeux actifs). Logs : sprint-log + state.md |
| **9 MJ jour (34-42) + retraits validés ?** | Jour 2026-07-06 | CRITIQUE | 3 MJ nuit retravaillés (34/35/36 feedback Papa Yann) + 6 nouveaux (37-42 batch jour) + 3 retirés menu (01/14/13b) confirmés. Test Papa Yann ressenti 48h ≈ 2026-07-08. Tickets : EP-044/045/046 + EP-047 shortlist. REMIS AU VOTE après test. |
| **Shortlist 7 candidats — lequel prioriser ?** | Audit convergences 2026-07-06 | MOYENNE | Simon/Block Blast/Tangram dino/Mahjong/MJ-18 Expert/Shisima/Picross. Game-conseiller brainstorm post-test feedback. Priorisation TOP 2-3 pour roadmap juillet-août. Attente : retour Papa Yann ressenti enfant ~2026-07-08. |
| **Refonte menu en « mondes » — GO timing ?** | Sprint jour 2026-07-06 | MOYENNE | Catégories visuelles (Lettres/Chiffres/Ranger/Réparer/Couleurs/Réfléchir/Jeux du monde/Dinos) + mix images ChatGPT + SVG animés. Maquette à produire. Papa Yann validé principe, timing attente après test 48h ressenti. Avant GO maquette : feedback si shortlist OK. |
| **Ombres chinoises canon seule source dino silhouettes ?** | Ordre Papa Yann 2026-07-05 | HAUTE | DÉCISION FIGÉE 2026-07-05 : « les anciennes silhouettes SUPPRIME-LES ! ». Bannissement LimeZu par-famille (208 PNG supprimés, commit 234dee4b, EP-071). Ombres chinoises (`img/dinos/ombres/`) = source visuelle UNIQUE dino silhouettes. Gravé 2026-07-05, non-régression. |

---

## 2026-07-12 — Mesure audience + espace parents (commits ea21d603 + f48966d8 + d7632997)

**Contexte** : Papa Yann décisions finales Phase 1 cloud (déploiement 3 migrations Supabase 006-007, RLS parent authoritative, espace auteur figé). Session game-conseiller tour de garde : 3 corrections infra (duel/lecture tool:true, pagehide < 10s, reset honnête).

**Décisions figées** :

1. **Mesure d'audience journalière** : ping anonyme GARDÉ avec flag `logged_in` (assumé malgré zone grise CNIL signalée par game-conseiller — mitigé par transparence). Table `pings`, RLS anon INSERT-only du jour, migration 006 appliquée.

2. **Espace parents** : « assumé mais sobre » — bouton footer index → gate appui 3 s + question adulte (7×4=28) → suivi.html hub parent (duel, lecture, vie privée, auteur). Outils retirés footer public.

3. **Espace auteur** : auteur.html réservé Papa Yann (UID figé + RLS ; migration 007). Stats audience 30 j + annotations filtrables. PAS distribué autres parents.

4. **Retours autres parents** : pas modération live — digests Claude/MCP à la demande (via Telegram bot).

5. **Transparence** : confidentialite.html (FR humain) liée depuis compte.html + hub suivi (affichage clair données récoltées).

**État** : ✅ Phase 1 light COMPLÉTÉE (migrations 006-007 déployées, E2E gate vert, smoke 4 pages vert, RLS pings testée curl). **Blocage** : EP-048 recette réelle e2e (Papa Yann test 3 appareils + sync).

**Raison** : cadre légal transparent (CNIL) + sécurité data enfant maintenue + retours parents isolés = confiance adoptants.

---

## 2026-07-08 — Étude archi comptes + 11 décisions métier Papa Yann

**Contexte** : Papa Yann a validé l'étude d'architecture comptes/profils (main agent 2026-07-08) et émis 11 décisions figées.

**Décisions figées** :

1. **Comptes & monétisation** :
   - Compte unique anonyme (email parent) + profil enfant pseudonyme (zéro donnée perso)
   - Pas de tier family/payant pour l'instant — cache basique suffit
   - Codes cadeaux (type `TRITRI`) uniquement pour test mécanisme
   - Monétisation complète reportée Phase 2

2. **Dessins coloriage** :
   - Stockage JSON zones→couleurs (pas JPEG/PNG)
   - Reproductible, quasi-gratuit, ouvre mode impression futur (grand format ± couleurs)

3. **Parcours "Qui joue ?"** :
   - Complet reporté — mini-jeux prioritaires d'abord

4. **Zone accès compte** :
   - Visible dans 3 index : `index.html` footer, `dev-dinos.html` lien discret, `suivi.html` OK
   - Temporaire, implémenté ce jour

5. **Jeux activables/désactivables** :
   - Via champ `status` catalog.js (live/wip/off) — déjà supporté

6. **Avatars chibi** (NEW) :
   - Générer top 10 dinos × 3 humeurs (joyeux, énervé, original) = 30 images
   - Via pipeline ChatGPT Dinosaure XXL project
   - EP-072 créé

7. **Likes privés** :
   - JAMAIS de social inter-enfants — confirmé

8. **Trophées-puzzle v1** :
   - Avatar OU dessin liké fragmenté N morceaux
   - Fragment = 1 étoile (ou 3★ = 1 fragment)
   - Recompose image, variante gold possible
   - Peut remplacer/surcoucher étoiles au menu
   - Prototype après refonte menu

9. **Bouton règles ❓** (NEW) :
   - Composant regle-info.js partagé (Opus)
   - Implémentation lancée ce jour
   - Déployer sur 9 nouveaux MJ d'abord

10. **Mystère MJ-31 "texte long" → AUDIO chevauchements** :
    - Élucidé : annonces TTS ~2 min se chevauchent
    - Fix : enchaîner sur event de fin audio RÉELLE, jamais setTimeout fixe
    - Assigné, en cours

11. **LEÇON : Pattern audio+emoji séquencé** (Papa Yann demande "note pour plus tard") :
    - « Lire audio + afficher emojis synchronisés = super intéressant »
    - Validé sur mj-31 finale météorite
    - Attention à la synchro, laisser audios se finir avant prochain événement
    - Gravé L-088 dans backlog.md

**État** : ✅ 11 décisions FIGÉES 2026-07-08 (implémentation mixed déjà commencée, suite 48h feedback ressenti).

---

## 2026-07-07 — Décisions infra/business Phase 1 cloud déployée

**Contexte** : Audit infra/business complet suite déploiement Supabase + cloud.js + OTP. Commit b7dec8ef. **Détail complet** : `memory/INFRA-AUDIT-2026-07-06.md` (archi phasée, légal, monétisation, distribution).

**Décisions figées** :

1. **Modèle comptes** :
   - Compte parent (email) + profil enfant pseudonyme **SANS DONNÉE PERSO ENFANT**
   - Entitlements serveur JAMAIS exposés en flag client (cryptography côté serveur obligatoire)
   - Respect RGPD/COPPA enfants < 4 ans (zéro analytics, zéro tracking)

2. **Codes cadeaux** :
   - Usage **unique** lié à l'acheteur (jamais générique partageable)
   - Prévention scalping/viralité commerciale

3. **Monétisation & distribution** :
   - **MoR** (Merchant of Record) : Paddle OU Lemon Squeezy (ESCROW protégé, compliance auto)
   - **Phase 0** : tant que < 50-100 foyers hors proches (famille/copains closed loop)
   - **Phase 1+** : if growth + compliance vérifié
   - **Pubs** : JAMAIS vers enfants < 4 ans (zone sensible)

4. **Security audit post-build** :
   - **7 findings** : 5 fixes déployées (CRITIQUE magic link iOS + HAUTE perte étoiles + XSS surnom + 2× RLS)
   - **2 WARN** : monitoring post-prod (non-bloquant)

5. **Architecture 3 index** :
   - 1 manifest par version (PWA non-conflictuel)
   - Footer parent commun (suivi/duel/lecture partagé)

**État** : ✅ Phase 1 light DÉPLOYÉE (Supabase RLS VERT, tests stubs 18/18 VERT, audit post-build fixes appliquées).

**Blocage** : EP-048 recette réelle e2e (Papa Yann test 3 appareils + sync).

**Raison** : cadre légal clair + sécurité data enfant + monétisation honnête (ESCROW tiers) = confiance parents pour adoption.

---

## 2026-07-04 — Refonte visuelle plateforme Phase 1 livrée (hub « La ligne de Max »)

**Contexte** : Papa Yann demande benchmark + proposition refonte visuelle complète ("trop basique, tabulaire, pas wow"). Process : explore site + benchmark web (Khan Kids/PBS/Toca/Duolingo ABC/Lunii/NN-g) + consultation 3 conseillers (game, dino, narration) + test lecteur-dyade simulé. Plan approuvé Papa Yann.

**Décisions figées** :

1. **Concept « La ligne de Max »** = hub v2 : Voie A (ligne de bus horizontale, 6 arrêts, PAS de ville scrollable parallax qui chevaucherait WexWorld P2). Validé Papa Yann 2026-07-04.

2. **6 arrêts + mapping catégories** :
   - Dodo des bus (compter+logique)
   - Garage de réparation (couleurs+bricoler+libre)
   - Maison des lettres (lire)
   - Place du monde (monde+observer)
   - Vallée des dinos (dinos)
   - Roulotte (histoires, placeholder)
   - **Vocab Max respecté** : "dodo" = Centre bus · "garage" = Réparation · "terminus" JAMAIS utilisé.

3. **PAS Wex mascotte globale** (unanime 3 conseillers) — dilution, réservé WexWorld P2 + Coin histoires. **Défaut retenu** : bus animé muet + voix off TTS neutre (lieux nommés à voix haute au tap). Reversible.

4. **Construction EN PARALLÈLE** : `index2.html` (hub v2), `index.html` INTACT (anti-désorientation, Max connaît menu par cœur).

5. **Sons victoire existants CONSERVÉS** : FF7/Pokémon/Gagné — Max les connaît. Klaxon-prout 1/20 dans `celebrate.js`.

6. **Trajet bus skippable au tap** : feedback lecteur-dyade = friction après 4-5 répétitions.

**État livré** (commit 9fc79b03, pushé) :
- `site/index2.html` : hub scène crépuscule, 6 arrêts SVG, bus IDFM roulant, panneau lieu avec étoiles/verrous via `catalog/stars/unlock`
- `site/css/theme.css` : design system par zone `--zone-h`, `@view-transition`
- `site/js/celebrate.js` : confettis canvas, `flyStar`, honk/fart, pool sons
- Vérification : 5 screenshots Playwright (paysage/portrait/3 panels), zéro erreur console

**Statut** : ✅ acté 2026-07-04. Questions ouvertes pour Papa Yann : mascotte définitive ? bascule `index2→index` quand ? identité sonore future ?

---

## 2026-06-03 — Refonte archi monorepo (site/ + studio/) + Phase 6 DÉFÉRÉE
Migration complète : `game/web` → **`site/`** (déployé), `game/`+`dino/`+`narration/`+`game/phaser` → **`studio/{minijeux,dino,narration,max-adventure}`**. Racine propre. App testée (screenshots), CI à jour, hooks/rules/signal verts. 6 commits.
**Phase 6 (reorg interne `site/` en sous-dossiers `platform/minijeux/dino`) = DÉFÉRÉE** (validé Papa Yann). Raison : gain surtout dev-side/cosmétique, coût = surgery HTML + re-test des 22 jeux. **Pas de reset progression** (gameId = nom de fichier via `tracker.js` `_detectGameId`, folder-indépendant). **À faire au déploiement narration** (3ᵉ domaine dans site/) OU pass dédié « URLs propres + redirections », pas avant.

## 2026-06-01 — Filtrage + Reclassement scientifique encyclopédie dinos (EP-039 phase figée)

**Contexte** : EP-039 audio DUO Narrateur H + Wex lancé 2026-05-17, pilote (Parasaurolophus) validé 2026-05-30. Phase production 50 dinos restants : stratégie figée pour éviter redondance/confusion Max.

**Décisions figées** :

1. **Filtrage 60 → 50** : **10 dinos retirés scientifiquement redondants/inconnus** (validé Papa Yann 2026-06-01) :
   - Maiasaura (sonne trop "Mosasaure", confusion homonyme)
   - 9 cératopsiens quasi-identiques : Kosmocératops, Pachyrhinosaure, Psittacosaure, Diablocératops, Einiosaure, Utahcératops, Anchicératops, Centrosaure, Chasmosaure

2. **Apatosaure bi-nom figé** : renommé « Apatosaure (Brontosaure) » — 2 noms explicités dans fiche pour éviter confusion enfants ("pourquoi 2 noms ?").

3. **Reclassement scientifique** :
   - Suchomimus + Baryonyx : déplacés volant → trex (ce sont des théropodes terrestres, cousins directs Spinosaure)
   - Dimétrodon : déplacé bizarre → volant (groupe "pas vraiment des dinos", bien signalé)

4. **Hiérarchie familles = 1 seul niveau** (pas Saurischien/Ornithischien = trop abstrait 4 ans) :
   - 8 familles : trex, cou_long, arme, cornu, bec, raptor, volant, bizarre
   - Chaque fiche = nom simple + mot savant grec (sous-titre) + explication décomposition racines + "qui est connu + qui mange" (champ explic narrable à voix haute)

5. **Textes explications validés 3-pôles** : Grok/Kimi/DeepSeek panel 2026-06-01, révision finale optionnelle après test TTS (pas re-validation si mineur).

6. **UI enrichie** :
   - DINO_FAMILLES_INTRO = mot d'ouverture écran familles (tease mystère)
   - Bouton 🔊 "C'est quoi ce nom ?" par carte dino = narration étymologie courte

7. **RÈGLE FIGÉE** : **zéro Wex, zéro univers narratif** dans menus encyclopédie. Rester factuel/encyclopédique (Wex + univers = contexte audio narration seulement).

**Impact fichiers** :
- `site/js/dinos-data.js` : 50 fiches
- `site/dev-dinos.html` : 8 familles UI + INTRO + bouton 🔊
- `game/pmo/INVARIANTS.md` L59 : "**50 fiches finale**"

**Raison** : lisibilité enfant (pas surcharge homonymie), validité scientifique rigoureuse, UX encyclopédie sobre (pas dilution narrative).

**Statut** : ✅ acté 2026-06-01, prêt production TTS 49 fiches.

---

## 2026-05-21 — Clôture EP-022 (faux bug MJ-04 archivé) + Processus décisions figées

**Contexte** : audit FOND détecte que EP-022 "MJ-04 boucle infinie" était un **faux bug depuis 2026-05-11**. Trois sous-tâches T-220/221/222 déjà implémentées, mais ticket traîne en backlog sans clôture officielle. **Symptôme plus large** : décisions 2026-05-14 (gabarit header) prise mais EP-035/036 non assignés → traîne 7j sans exécution.

**Décisions figées** :

1. **EP-022 archivé** comme faux bug (code a toujours été conforme).
   - Marquer `[!]` bloqué dans backlog.md (jamais exécuté comme bug, pédago-fantôme).
   - Leçon : audit pmo-challenge doit **vérifier le code** d'un ticket avant de le relayer.

2. **Processus décisions → exécution (MILITAIRE, 2026-05-21+)** :
   - **Toute décision = ticket backlog assigné (EP-xxx) + deadline + owner explicite**.
   - Pas de décision flottante non exécutée (cause EP-035/036 traîne 7j, frotte user).
   - **Format minimal** : `Décision N°X (date) | EP-NNN | Owner: game-dev | Deadline: 2026-05-YY | Raison`.
   - PMO checklist sessions : "Aucune décision > 3j sans ticket assigné ?" — si OUI, alerte rouge ⚠️.

**Impact** : EP-022 clôturé. Q-ouverte #1 **TRANCHÉE**. Process EP-035/036 renforcé (assignation + deadline immédiate).

**Statut** : ✅ acté 2026-05-21.

---

## 2026-05-17 — Charte dino figée (noms, prédation, étymologie, audio 4-blocs)

**Contexte** : EP-039 encyclopédie dinos V1 déployée. Validation par panel lecteur enfants (7, moy 7.5-8.5/10) sur 50 fiches.

**Décisions tranchées** :
1. **Noms latin/grec GARDÉS** — jamais vulgariser (Tricératops = Tri-cérat-ops, pas "Tête à trois cornes"). Pédago étymologie = force du projet.
2. **Prédation VRAIE** (os qui craquent, chasse, régime carné) — Max 3.5-4 ans accepte la vie sauvage. **PAS gore** : pas de sang, pas de viscères, pas de cannibalisme (Coelophysis corrigé).
3. **Bloc A = mécanique racines** (étymologie décomposée) — source de vérité pédago gravée `_ETYMO-RACINES-50.md`.
4. **Structure audio = 4 blocs** (pas 6) : Histoire + Taille + Vie + TrucFou + Recap. Boucle fermée (question Wex → réponse Narrateur obligatoire).
5. **Surnom Tritri** = affectueux pour Tricératops (Max le préfère, auto-validé).

**Raison** : résonance pédagogique + légitimité scientifique + engagement Max mesuré (7.5-8.5/10).

**Statut** : ✅ acté 2026-05-17.

---

## 2026-05-17 — Process validation contenu 3-passes (avant prod audio DUO)

**Contexte** : EP-039 audio DUO Narrateur H + Wex = coût itération ElevenLabs élévé (loudness + timing + clarté entre voix = 2-3 tries min).

**Décision** :
1. Tout texte dino passe **3 passes validation** AVANT envoi ElevenLabs :
   - **Pass 1** : game-conseiller (étymo fact-check, narratif, structure)
   - **Pass 2** : narration-conseiller (voix-meta, tags v3, didascalies)
   - **Pass 3** : panel lecteur enfants (pédago, engagement, clarté)
2. Corrections appliquées, stats gravées (exemple : `_ETYMO-RACINES-50.md`).
3. Validation 1 fiche test (Tricératops) AVANT généraliser (49 autres).

**Raison** : minimiser itérations post-prod audio (coût ElevenLabs + delays).

**Statut** : ✅ acté, procédure validée 2026-05-17 (panel = 7 enfants).

---

## 2026-05-14 — Gabarit header mini-jeux unifié et compact (obligation tous les MJ)

**Contexte** : Papa Yann signale que le bandeau titre + message mise à jour + bouton retour est **trop gros** dans tous les mini-jeux. Le fix mj-20 (commit e1bcd42a "header compact — supprime double-hauteur title+subtitle, aligne sur pattern .hdr standard") montre le pattern attendu.

**Décision** :
1. **Gabarit header `.hdr` canonique** = nouveau standard obligatoire pour tous les mini-jeux (existants + futurs).
2. **Caractéristiques** : header compact (une seule ligne, petite taille) inspiré de mj-20.
3. **Rétro-fit** : tous les MJ existants SAUF mj-20 (qui valide le pattern).
4. **Encoding emojis** : fix systématique UTF-8 + charset meta tag sur tous les MJ.
5. **Impact fichiers** : `site/mj-*.html` (21 fichiers cibles), potentiellement `site/index.html` menu.

**Raison** : uniformité UX + espace pour contenu jeu (max 3-8 min sessions, zéro perte d'espace).

**Statut** : ✅ acté 2026-05-14.

---

## 2026-05-13 — Refonte archi CLAUDE.md à 3 niveaux (doc Anthropic 2025)

**Contexte** : auteur aligne la structure CLAUDE.md sur doc Anthropic officielle (nested CLAUDE.md + path-scoped `.claude/rules/`) pour :
1. Réduire gonflement CLAUDE.md racine (219 → 107 lignes)
2. Charger règles contextualisées on-demand (zéro coût tant que fichier non touché)
3. Maintenir source de vérité 1/N (evite duplication décisions × N fichiers)

**Décisions** :
1. **Niveaux CLAUDE.md** : racine (219 l) → racine allégée (107 l, synopsis pôles + commandes trans) + `game/CLAUDE.md` (113 l, chargé auto si fichier sous game/ touché)
2. **Règles path-scoped** : `.claude/rules/` 6 fichiers, load auto si glob matches
   - `tile-tools.md` (80 l) : paths: `site/tile-tools/**`, `site/tools/**` — mnémonique 2/8/14/15, Sidewalk_1 mapping, vocab.py source unique, brique avant macro
   - `mini-jeux.md` (103 l) : paths: `site/mj-*.html`, `site/index.html` — UX zéro-pénalité, feedback <200ms, zones tap 80px, busSVG obligatoire, couleurs IDFM LIGNES
3. **Pas de duplication** : INVARIANTS.md sommet → rules répètent pour contexte → skills LESSONS.md capitalisent
4. **Hook UserPromptSubmit** : auto-rappel `/game-pmo` ou `/narration-pmo` si signal JEU/NARRATION détecté

**Impact** :
- `CLAUDE.md` racine : sections équipe agents déplacées vers `.claude/agents/game-pmo.md`, pôles compactées
- `game/CLAUDE.md` : PMO + Archiviste + INVARIANTS + équipe agents résumé
- `studio/narration/CLAUDE.md` : symétrique
- `.claude/rules/` : 6 fichiers créés (tile-tools, mini-jeux, stories-process, personnages, univers, audio)

**Réf doc Anthropic** : [claude.com/docs/memory#how-claude-md-files-load](https://code.claude.com/docs/en/memory#how-claude-md-files-load) (nested CLAUDE.md, path-scoped rules, hook timing).

**Statut** : ✅ acté (3 commits 0ec2964f, 10a9df07, e49527e5).

---

## 2026-05-13 — Refonte structure PMO Game (harmonisation Game ↔ Narration)

**Contexte** : pôle Narration refondu 2026-05-12 (PMO proactif + Archiviste + INVARIANTS + audit-trail). Auteur demande la même rigueur côté JEU.

**Décisions tranchées** :
1. **Création `game/pmo/`** comme dossier dédié (équivalent `studio/narration/pmo/`).
2. **Création `game-archiviste`** (Haiku, AUTO chaque signal structure) — équivalent `narration-archiviste`.
3. **Préfixage commandes strict net** : `/challenge-archiviste` → `/narration-archiviste-audit`, `/pmo-audit` → `/narration-pmo-audit`, création `/game-pmo-audit` et `/game-archiviste-audit`.
4. **`game/memory/state.md` réduit** aux sources de vérité statiques (jeux actifs, règles non-négociables, fichiers clés). Sessions migrées vers `sprint-log.md`, décisions vers `decisions.md` (ce fichier).
5. **`game/tasks/BACKLOG.md` déplacé** vers `game/pmo/backlog.md` (cohérence avec studio/narration/pmo/backlog.md).

**Impact** : voir `audit-trail.md` entrée 2026-05-13.

---

## 2026-05-12 — Pivot Brique-avant-Macro (pipeline tile)

**Contexte** : 4 recettes virages 13×13 ont passé le pipeline (9/10 reviewer) mais ont été **visuellement invalidées** par Papa Yann ("Totalement faux, terrible même"). Cause : `vocab.py` contenait des constantes inventées (`COIN_INT_SE = sw_1` etc.) jamais validées visuellement.

**Décisions** :
- **Ne JAMAIS coder de macro/composition sans valider visuellement chaque tile candidate isolée** (L-029).
- Méthode validée : **planche comparative HTML/PNG** (1 image grille = validation famille entière instantanée).
- **`test_ref_papa_4virages.py`** = RÉFÉRENCE CANONIQUE virages (14×14 compo Papa Yann via tile-picker) — source de vérité pour reconstruction future.
- EP-VIRAGES-V2 à créer pour refonte depuis cette référence avec workflow brique-avant-macro.

**Impact fichiers** :
- `~/.claude/skills/maxplay-tiles/LESSONS.md` Corrections 9-12 (4 leçons gravées)
- `site/tile-tools/PIPELINE-MEMORY.md` F-008/F-009 (frictions), P-008/P-009/P-010 (patterns)
- `game/pmo/backlog.md` L-029 à L-032 (4 leçons + EP-VIRAGES-V2)

**Statut** : ✅ acté. EP-VOCAB clôturé. Routes (3 recettes) OK. Virages à refaire.

---

## 2026-05-12 — Mapping LimeZu SW_1 ↔ SW_2-6

**Découverte** : SW_1 a 10 positions (#11-#20) **décalées** vs SW_2-6 sur la même grille tileset.

**Décision** : table de mapping figée dans `site/tile-tools/styles.py` + module 6 styles (blanc/beige/gris_bleu/jaune/bleu/gris) avec résolution auto.

**Source unique** : `styles.py` (créé 2026-05-12).

**Statut** : ✅ acté. L-030 gravée.

---

## 2026-05-12 — `vocab.py` source unique tiles (cartography.json deprecated)

**Décision** : `site/tile-tools/vocab.py` (46 constantes nommées français + validation auto au boot) remplace définitivement `cartography.json`.

**Impact** :
- `cartography.json` marqué **DEPRECATED** (champ `_DEPRECATED` dans le JSON, conservé pour traçabilité).
- Tous les nouveaux scripts/recettes lisent `vocab.py`.

**Statut** : ✅ acté.

---

## 2026-05-11 — Architecture équipe pôle JEU 3-sous-domaines

**Contexte** : pôle JEU s'organise autour de 3 sous-domaines distincts :
- Mini-jeux HTML vanilla (mj-XX)
- Tile-tools LimeZu (recipes Python, cartography, patterns)
- WexWorld Phaser (Phase 2, RPG-like — à venir)

**Décision architecture** :
```
game-pmo (parent Haiku, AUTO chaque signal JEU)
├── game-tile-pmo (sous-spé maps tile, Haiku)        ✅
├── game-mj-pmo (sous-spé mini-jeux HTML, Haiku)     ✅
└── game-wexworld-pmo (sous-spé Phaser, Haiku)        ⏳ Phase 2

Sachants :
- game-conseiller (Opus, transverse — voix produit)   ✅
- game-dev (Sonnet, dev général)                       ✅
- game-mj-reviewer (Haiku, validateur MJ)              ✅
- game-tile-{simplifier, designer, reviewer}           ✅
- game-wexworld-{designer, tester}                     ⏳ Phase 2
```

**Règle hiérarchie** : main → game-pmo → sous-spé. Communication enfant → parent uniquement. Jamais cross-pôle direct (Game ne call pas Narration sans validation).

**Boucle d'apprentissage 3 niveaux par sous-spé** :
- Technique : `LESSONS.md` / `rules.md` / `stack.md`
- Méta-process : `PIPELINE-MEMORY-*.md`
- Transverse : auto-memory + `VISION-LONG-TERME.md`

**Statut** : ✅ acté 2026-05-11. Refonte 2026-05-13 ajoute `game-archiviste` (Haiku AUTO structure) en binôme avec game-pmo.

---

## 2026-05-11 — Convention 2 types de MJ (à reconnaître par reviewer)

**Contexte** : MJ-12 questionné par Papa Yann — verdict "dashboard sonore / découverte libre, pas un jeu à mécanique".

**Décision** : 2 types de MJ acceptés dans le pôle JEU :
1. **Jeux à mécanique** : compteur (souvent 10 tours) + showEndScreen + playEndSound
2. **Dashboards / découvertes libres** : pas de fin, exploration ouverte (mj-12 1er du genre)

**Impact** : `game-mj-reviewer` à enrichir avec reconnaissance du type (proposition : attribut `data-mp-type="dashboard"` dans le HTML).

**Statut** : ✅ tranché (L-024). À implémenter dans game-mj-reviewer.

---

## 2026-05-08 — Vocab Max lieux (ne pas confondre)

**Décisions** :
- **dodo** = Centre bus Villejuif (jamais "centre bus" hors contexte adulte)
- **réparation** = Garage (MJ-17 "Le garage")
- **terminus** = Village des bus (réservé pour futur usage)

**Impact** : MJ-08 "Au centre bus" / MJ-17 "Le garage" — vocab cohérent dans nom + tutoriels.

**Statut** : ✅ acté EP-021.

---

## Règles techniques non-négociables (gravées 2026-04-30 et avant)

| Règle | Détail |
|-------|--------|
| **Bus invariant** | `busSVG()` / `busSVGHiddenNum()` depuis `site/js/bus-svg.js` — JAMAIS emoji 🚌 ni div CSS coloré |
| **Quiz couleurs** | `selectDistinctColors(pool, n, minDist=80)` |
| **UX tap** | Zones min 80×80 px |
| **Feedback** | < 200 ms |
| **Pénalité** | Zéro, jamais |
| **Sessions** | 3-8 min cible |

**Source détaillée** : `memory/rules.md` + `pmo/INVARIANTS.md`.

---

## Questions ouvertes (à trancher)

| # | Question | Statut 2026-05-21 | Fichier |
|---|----------|------------------|---------|
| 1 | EP-022 MJ-04 "boucle infinie" : vérifié faux bug 2026-05-11 (code conforme depuis). À acter clôture définitive ? | ✅ **TRANCHÉ** — archivé faux bug (cf. décision 2026-05-21) | `pmo/backlog.md` |
| 2 | `game-mj-reviewer` à enrichir avec reconnaissance du type MJ (mécanique vs dashboard) — attribut `data-mp-type="dashboard"` ? | 📌 **REPORTE** — low-priority, future itération (nice-to-have) | `.claude/agents/game-mj-reviewer.md` |
| 3 | Recettes passages piétons non-auditées visuellement (depuis 2026-05-11) — vérifier ou archiver ? | 📌 **REPORTE** → **T-NNN** (tâche tile-pmo, explore 2026-06-15) | `site/tile-tools/recipes/` |
| 4 | Scripts debug (`render_debug`, `render_tmj`, `zoom_index`, `build_rondpoint_tmj`, `recolor_house`) — dépendances à vérifier avant archivage ? | 📌 **REPORTE** → **T-NNN** (tâche archiviste, explore 2026-06-01) | `site/tile-tools/scripts/` |
| 5 | EP-REFS (banque refs visuelles LimeZu officiel + Pokemon + LDtk) — quand lancer la session dédiée ? | 📌 **REPORTE** — Phase 1.5, après EP-037/038/035/036 fermés (fin mai) | `pmo/backlog.md` |
| 6 | Phase 2 WexWorld — quand commencer le scoping (agents + design) ? | 📌 **REPORTE** — après Phase 1 complétée + Phase 2 briefing Papa Yann | `memory/VISION-LONG-TERME.md` |
