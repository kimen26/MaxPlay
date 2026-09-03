# TODO — Pôle JEU

> Tickets ouverts uniquement, condensés en 1 ligne chacun (détail complet non recopié ici, mais préservé verbatim dans `archive/backlog-fermes-2026.md` pour les tickets qui ont une partie close, et dans l'historique git pour le reste). Extrait le 2026-09-03 (HO-MJ-01) depuis l'ancien `pmo/backlog.md` (supprimé, contenu distillé dans ce fichier + `LESSONS.md` + `archive/backlog-fermes-2026.md`).
> Statuts : `[ ]` à faire · `[~]` en cours · `[!]` bloqué · `[?]` question ouverte.

## Lane — Montée de niveau par compétence (EP-112)

- **EP-112** [~] — Montée de niveau par compétence : PILOTE mj-04 LIVRÉ, propagation aux 13 autres figées attend validation ressenti Max (2026-07-29)
- **T-C6b** [x] — Banque audio nombres/gabarits V1 LIVRÉE (100 MP3) — à faire écouter à Papa Yann (2026-07-29)
- **EP-112 (spec)** [?] — SPEC montée de niveau (défigeage `niveau = Stars+1`) — attend 7 décisions Papa Yann D1..D7, spec dans `../docs/2026-07-28-spec-montee-niveau.md` (2026-07-28)
- **L-XXX** (leçon non classée, pas encore renumérotée L-0xx) — Deux moteurs de vérité = même bug qui revient (unlock.js/mur.js dupliquaient flag admin + seuil ★, refactor commit 48fefc25) (2026-07-23)

## Lane — Design System v1 : validations en attente Papa Yann (EP-079..083)

- **EP-079** [?] — Specs mj-01 & mj-14 rouges PRÉEXISTANT — Stars.get=0 après victoire parfaite (statut à confirmer, dépend EP-070)
- **EP-080** [?] — mj-08 exception design clair volontaire — conserver ?
- **EP-081** [?] — mj-34/36/38/39 finalStar cinematic sur dernier palier — validation 48h (attente jusqu'à 2026-07-15 approx, jamais close explicitement)
- **EP-082** [?] — Ambiances par défaut hardcodées vs. choix enfant UI centralisée
- **EP-083** [?] — Bus-défilé header index supprimé — cosmétique, à valider

## Lane — Gouvernance figées / audit-gabarit (EP-109/110)

- **EP-109** [ ] — 18 jeux du menu SANS figée (mj-08,11,17,20,27,28,29,30,33,34,35,36,37,38,39,40,41,42) — plus gros trou de gouvernance, à planifier avec Papa Yann
- **EP-110** [ ] — Famille « quiz legacy » (mj-01/13a/14/15/16) : victoire score-% vs standard 3★ — modernisation cosmétique non urgente

## Lane — Fusion/bibliothèque savoir-faire (EP-100/101)

- **EP-100** [~] — Bibliothèque savoir-faire 3/4 LIVRÉE (3 libs extraites : mj-dice.js, dinos-ombres.js, mj-compte.js) — reste panneau-led.js suspendu (EP-101)
- **EP-101** [?] — Fusion F1 (mj-13a+mj-13c) REMISE À DÉCISION Papa Yann — friction refonte menu vs gains maintenance x2 long-terme, trancher NOW (v0.5) ou Phase 2

## Lane — MJ-43/44/45 post-création (EP-077 ×2 [collision d'ID] / EP-078)

- **EP-077 (session challenge)** [x] — Session challenge conseiller 2026-07-13 (6h30) — MJ-43/44 durcis + MJ-45 créé — Terminé 2026-07-13, harnais vert mj-43/44, MJ-45 spécifications stables « attente code » (statut à confirmer : MJ-45 lui-même reste non codé d'après ce ticket)
- **EP-077 (validation ressenti)** [~] — MJ-43 + MJ-44 créés 2026-07-13 (maths dominos + phonologie sons) — EN COURS, harnais vert, reste validation ressenti Papa Yann (T-770/771/772 : sessions GitHub Pages, corrections mineures, déploiement définitif + MAJ INVARIANTS) — ⚠️ collision d'ID avec EP-077 "session challenge" ci-dessus, deux tickets distincts dans le fichier source
- **EP-078** [~] — Chaîne de dominos (bout-à-bout même valeur) — priorité BASSE, en attente brainstorm/design amont, pas de code avant retours terrain MJ-43/44/45

## Lane — Audit specs / dettes figeage (EP-074 [harnais], EP-076)

- **EP-074 (harnais)** [!] — Audit specs harnais Playwright (mj-01, index) — specs obsolètes — BLOQUÉ, harnais test permanent FAIL sur mj-01/index, décision Papa Yann attendue (garder/refondre/réinventer mj-01) — ⚠️ collision d'ID avec EP-074 "Composants UI partagés mp-theme.css" (celui-ci FAIT, voir archive)
- **EP-076** [!] — Figeages validées 2026-07-07 (MJ-24/25/26/31) — audit contenu vs code — AUDIT RÉTROACTIF, 4 figées rétro-corrigées, reste : revoir process PMO figeage + checklist mini-audit + appliquer à toutes figées ouvertes (EP-070+)

## Lane — Norme bouton règles (i) + avatars (EP-072/073)

- **EP-073** [~] — Composant bouton règles (i) regle-info.js — implémentation lancée 2026-07-08, reste roll-out sur mj-04..33 (16 MJ rétroactifs)
- **EP-072** [ ] — Avatars chibi dinos × 3 humeurs (30 images) — pipeline ChatGPT Dinosaure XXL, timeline après refonte menu

## Lane — Gouvernance process/qualité (EP-042/043)

- **EP-042** [ ] — Check auto assets dans run.mjs (404 prévention prod, asset gitignoré mais référencé)
- **EP-043** [ ] — Audit automatisé figés : chaque ligne 🔒 sourcée Papa Yann ou code (`check-figees.mjs`)

## Lane — Narration audio dinos (EP-039)

- **EP-039** [~] — Narration audio DUO Narrateur H + Wex sur encyclopédie Dinos — pilote Parasaurolophus V2 clôturé 2026-05-30, 22/60 dinos en audio EL premium, reste généraliser ping-pong Wex à 5 fiches phares + option compléter 39 dinos restants (TTS live navigateur en attendant, non bloquant)

## Lane — Harnais de test (EP-038)

- **EP-038** [~] — Harnais de test headless mini-jeux (Playwright) — pilote livré 2026-05-16 validé Papa Yann, reste généraliser 1 spec/MJ actif (T-382→T-384)

## Lane — Gabarit/encodage rétro-fit (EP-035/036/037)

- **EP-035** [ ] — Fix encoding emojis tous les mini-jeux HTML (charset UTF-8 + vérification, 21 fichiers)
- **EP-036** [ ] — Gabarit header compact unifié tous les MJ (rétro-fit 20 fichiers)
- **EP-037** [ ] — Rétro-fit figeage 20 MJ restants (protection régression)

## Lane — Pipeline tile-tools (EP-REFS, EP-MACRO-VIRAGE, EP-TILES)

- **EP-REFS** [ ] — Banque de références visuelles tile-tools (post-EP-VOCAB) — non démarré, 1ère cible probable = carrefour propre
- **EP-MACRO-VIRAGE** [ ] — Macro `virage(direction, ...)` dans builders.py (DRY consolidation 4 recettes manuelles, basse priorité)
- **EP-TILES** [~] — Pipeline tile-tools LimeZu (cartographie + recettes + mockups-routes + tile-picker + tile-pmo) — reste : intégrer quartier propre 16×12 en scène Phaser, étendre 24×18 puis 32×24, passages piétons, tiles alternatives intersections

## Lane — Renouvellement thématique dino (EP-041, EP-047)

- **EP-041** [?] — Renouvellement mini-jeux — lassitude bus, exploration piste thème dino (tri-couleur/quiz/duel) — piste/exploration signalée 2026-06-08, dépend retour Max sur prototype
- **EP-047** [?] — SHORTLIST jeux addictifs : 7 candidats (Simon, Block Blast, Tangram dino, Mahjong dino, MJ-18 Expert, Shisima, Picross) — priorisation Papa Yann à trancher post-test MJ-34/35/36

## Lane — Recette cloud/compte (EP-048/049/069, EP-075)

- **EP-048** [ ] — Recette réelle parcours compte→sync (Papa Yann e2e test complet : login → partie → sync → récup profil autre appareil) — BLOQUANTE avant usage réel enfants
- **EP-049** [ ] — Resend SMTP + `{{ .Token }}` dans template Magic Link (custom domain MaxPlay)
- **EP-069** [~] — EPIC Système comptes/profils + cloud sync — Phase 1 légère déployée, reste e2e test réel (T-690/691/692) puis Phase 2 (codes cadeaux, voix premium unlock, analytics RGPD)
- **EP-075** [~] — Dettes Supabase — RLS + architecture cloud complète — phase 1 (migrations 003-005) livrée, reste : audit mj32_galerie storage, harmonisation golden_stars_*, RLS dettes tables 001, validation client Supabase

## Lane — Voix/audio production (EP-050, EP-051 [ancien], EP-052 [ancien])

- **EP-050** [ ] — Production premiers clips voix (voices-manifest.js vide, générer 10-12 phrases × 3 voix ElevenLabs)
- **EP-051 (voix/TTS)** [~] — MJ-33 · Noms de dinos uniquement (TTS noms uniquement, pas détail) — VALIDÉ par Papa Yann 2026-07-07, reste implémentation (T-510/511/512) — ⚠️ collision d'ID avec l'EP-051 "Migrer 6 pages TTS.speak" ci-dessous, sources distinctes dans le fichier d'origine
- **EP-052 (voix/TTS)** [~] — MJ-31 · Intro trop long + registre voix TTS — VALIDÉ par Papa Yann 2026-07-07, reste implémentation (T-520/521/522/523) — ⚠️ collision d'ID avec l'EP-052 "Dette gabarit entête 8 MJ" ci-dessous

## Lane — Retours revue Papa Yann 2026-07-07 (batch MJ-04..30, EP-053..068, EP-051/052 gabarit)

- **EP-053** [!] — MJ-32 · BUG CRITIQUE zone noire non-recolorable + features galerie/trophées/likes
- **EP-054** [ ] — MJ-04 · Refonte visuelle (« pas moche ») — (statut à confirmer : très probablement dépassé par EP-112 golden pilote 2026-07-29, jamais explicitement clos)
- **EP-055** [ ] — MJ-05 · Refonte complète mécanique/visuelle (« très laid mais l'idée est bonne »)
- **EP-056** [ ] — MJ-06 · Diversifier emojis (dino, voyage)
- **EP-057** [ ] — MJ-23 · Diversifier emojis (dino, voyage, terre, espace)
- **EP-058** [ ] — MJ-15 · Variantes intrus + ombres dinos colorées (pas stigmatisant)
- **EP-059** [!] — MJ-16 · Portrait responsive (« ne rentre pas en portrait ») — bloquant UX
- **EP-060** [ ] — MJ-08 & MJ-09 · Refonte doublon → tri multi-thème (ombres dinos + emojis)
- **EP-061** [ ] — MJ-12 · Ajouter nouveaux sons (banque audio)
- **EP-062** [ ] — MJ-25 · Créer progression difficulté (« zéro difficulté, but incompris »)
- **EP-063** [!] — MJ-26 · BUG dino hors cadre (noir sur noir) + répétition niveau 1 — bloquant
- **EP-064** [ ] — MJ-27 · Cliquer chaque syllabe et entendre son son (feature audio pédago)
- **EP-065** [ ] — MJ-28 · Lampe éclaire mieux (amélioration visuelle)
- **EP-066** [ ] — MJ-29 · Cliquer mot → place + lit (amélioration interaction)
- **EP-067** [ ] — MJ-30 · Dire nom dino à affichage ou image alternative
- **EP-068** [ ] — NORME : Bouton (i) règles sur chaque MJ + explication audio (21 fichiers)
- **EP-051 (gabarit)** [ ] — Migrer 6 pages en TTS.speak (mj-19, 20, 22, dev-dinos, index2, index3) — ⚠️ collision d'ID, voir lane Voix/audio ci-dessus
- **EP-052 (gabarit)** [ ] — Dette gabarit entête 8 MJ (mj-12, 13a-c, 14-17) — cosmétique, protégée figeage, effort > bénéfice — ⚠️ collision d'ID, voir lane Voix/audio ci-dessus

## Autres tickets isolés

- **EP-005** [ ] — Système de progression (flotte + carte) — table statuts historique, jamais développé plus loin dans le fichier source
- **EP-026** [ ] — TTS ElevenLabs pré-générés (MP3 statiques pour noms de jeux) — infra + agent voice-director + pipeline narration, jamais démarré (reporté, speechSynthesis natif en fallback)
