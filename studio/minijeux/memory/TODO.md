# TODO — Pôle JEU

> Tickets ouverts uniquement, 1 ligne + DoD par lane. Détail complet et tickets fermés : `archive/backlog-fermes-2026.md` (avant 2026-09-03) et `git log`. Rotation 2026-09-12 (HO-R02) : les tickets clos ont été condensés en capacités livrées dans `CHANGELOG.md`, le fait/l'obsolète (28 mj fantômes purgés le 2026-08-10) a été supprimé.
> Statuts : `[ ]` à faire · `[~]` en cours · `[!]` bloqué · `[?]` question ouverte pour Papa Yann.

## Lane — Coloriage mj-32 : reste ouvert

**DoD** : stickers posables livrés et branchés, recette faite sur le vrai P30 Pro de Max, plus aucune spec instable connue.

- [ ] STICKERS de plantes posables au tap dans le dessin (`{type:'sticker'}` dans l'historique) — idée PY 2026-09-08, jamais commencée
- [ ] Recette sur le VRAI P30 Pro : tout le chantier coloriage n'a été vu qu'en navigateur (360/320 px), jamais sur l'appareil de Max
- [ ] Asset manquant : `site/img/dinos/paleoart/Scelidosaurus_coloriage.webp` — bloqué sur Papa Yann (Chromium dédié port 9225 connecté à un compte tiers)
- [ ] Dette perf : remplissage du fond entier ~400 ms (calcul JS pur) — à traiter si le 1er tap paraît lent sur P30 Pro
- [ ] Patcher les linearts à brèche côté pôle dino (Cryolophosaure #6389) pour pouvoir baisser le rayon anti-fuite
- [ ] Dette assumée (pas de correction spéculative) : `waitForTimeout` fixe dans une boucle de progression, présent dans ~12 specs (mj-09, 30, 31, 48-54, 56) — à corriger au cas par cas si l'un tombe (méthode : L-133 dans LESSONS.md, attendre le fait pas la durée)

## Lane — EPIC i18n mini-jeux (décision PY 2026-09-05 : tout traduire — règles, menus, actions)

**DoD** : 36/36 jeux jouables en fr/en/es-es/pt-br, consignes parlées EN en MP3 (pas seulement repli TTS).

- [!] **VOIX-MJ-EN-AUDIO** — Générer les 81 MP3 anglais des consignes (voix maison STS) dans `site/sounds/voix/en/…`, ≈ 23k crédits EL. Outillage prêt : `node studio/dino/content/scripts/audio/_md2json-hors-fiche.cjs en studio/minijeux/i18n/en/scripts-voix.md --out=studio/minijeux/i18n/en/json`
- [~] **LANG-MINI-JEUX** — Sélecteur de langue global mais seuls 8/36 jeux chargeaient `js/lang.js` à l'origine ; absorbé par l'EPIC i18n (33/36 en anglais aujourd'hui), reste es-es/pt-br des chaînes de jeu (hors panneau règle, déjà livré) et audio es/pt (repli TTS navigateur pour l'instant)
- [ ] Contenu FR conservé par décision PY 2026-09-05 : mj-50/51/52/53 (lecture/phonétique, refonte péda par langue trop lourde pour l'instant)
- [ ] Données FR résiduelles signalées mais non traitées : `PALETTE[].name`, `getLineDisplayName()` de `data.js`

## Lane — Montée de niveau par compétence (EP-112)

**DoD** : les 13 figées restantes propagées OU explicitement abandonnées après ressenti Max sur le pilote mj-04.

- [~] Pilote mj-04 livré (2026-07-29), propagation aux 13 autres figées attend validation ressenti Max
- [?] SPEC montée de niveau (défigeage `niveau = Stars+1`) attend 7 décisions Papa Yann (D1..D7) — détail `../docs/2026-07-28-spec-montee-niveau.md`

## Lane — Design System v1 : validations en attente Papa Yann (EP-079..083)

**DoD** : chaque question tranchée par Papa Yann, ticket fermé ou converti en chantier.

- [?] EP-079/080 — Specs mj-14 rouge préexistant (Stars.get=0) et exception design mj-08 — mj-01/mj-08 supprimés depuis (purge 2026-08-10), probablement caducs, à confirmer
- [?] EP-081/082/083 — finalStar cinematic mj-34/36/38/39, ambiances hardcodées (arbitrage L-094, à confirmer clos), bus-défilé header index — jamais explicitement clos

## Lane — Gouvernance figées / dette (EP-109/110/074/076)

**DoD** : chaque figée sourcée (phrase Papa Yann ou code), zéro figée inventée.

- [ ] EP-109 — 18 jeux du menu sans figée — à revérifier après la purge du 2026-08-10 (liste d'origine à recompter sur `site/js/catalog.js`)
- [ ] EP-110 — Famille « quiz legacy » (mj-13a/14/15/16 — mj-01 supprimé) : victoire score-% vs standard 3★, modernisation non urgente
- [!] EP-074 — Harnais Playwright mj-01/index obsolète : mj-01 supprimé depuis (purge 2026-08-10), ticket probablement caduc — à confirmer et clore
- [!] EP-076 — Revoir le process PMO figeage (checklist mini-audit) + appliquer aux figées ouvertes restantes, suite à l'incident L-072/L-073/L-074 (figées inventées 2026-07-05, déjà corrigées)

## Lane — Fusion bibliothèque savoir-faire (EP-101)

**DoD** : décision Papa Yann tranchée (fusionner mj-13a+mj-13c ou non).

- [?] EP-101 — Fusion F1 (mj-13a+mj-13c) remise à décision Papa Yann — friction refonte menu vs gains maintenance x2 long-terme

## Lane — MJ-45 dominos (EP-078)

**DoD** : brainstorm/design validé avant tout code.

- [ ] EP-078 — Chaîne de dominos (bout-à-bout même valeur) — priorité basse, pas de code avant retours terrain MJ-43/44/45

## Lane — Norme bouton règles + avatars (EP-072/073)

**DoD** : bouton (i) sur tous les MJ vivants, avatars chibi livrés ou abandonnés.

- [~] EP-073 — Composant bouton règles (i) `regle-info.js` — reste roll-out sur les MJ restants (vérifier lesquels après la purge 2026-08-10, plusieurs cibles d'origine ont été supprimées)
- [ ] EP-072 — Avatars chibi dinos × 3 humeurs (30 images) — pipeline ChatGPT Dinosaure XXL, jamais démarré

## Lane — Gouvernance process/qualité (EP-042/043)

**DoD** : script d'audit qui tourne en CI, zéro figée non sourcée.

- [ ] EP-042 — Check auto assets dans `run.mjs` (404 prévention prod, asset gitignoré mais référencé)
- [ ] EP-043 — Audit automatisé figées : chaque ligne 🔒 sourcée Papa Yann ou code (`check-figees.mjs`)

## Lane — Narration audio dinos (EP-039)

**DoD** : les 5 fiches phares en ping-pong Wex livrées, ou décision explicite de rester en TTS live.

- [~] Pilote Parasaurolophus V2 clôturé (2026-05-30), 22/60 dinos en audio EL premium — reste généraliser à 5 fiches phares + option compléter le reste (TTS live navigateur en attendant, non bloquant)

## Lane — Harnais de test (EP-038)

**DoD** : 1 spec Playwright par MJ actif.

- [~] Pilote livré 2026-05-16 validé Papa Yann — reste généraliser aux MJ actifs restants (vérifier la liste après purge 2026-08-10)

## Lane — Gabarit/encodage rétro-fit (EP-035/036/037)

**DoD** : les MJ concernés encore vivants sont conformes ; ceux purgés le 2026-08-10 sont retirés du ticket.

- [ ] EP-035/036/037 — Fix encoding UTF-8, gabarit header compact, figeage — cibles d'origine à recompter contre `site/js/catalog.js` (plusieurs jeux visés ont été supprimés depuis)

## Lane — Renouvellement thématique (EP-041/047)

**DoD** : décision Papa Yann sur la priorisation, dépend du retour Max.

- [?] EP-041 — Piste thème dino (tri-couleur/quiz/duel) pour lutter contre la lassitude bus — dépend retour Max sur prototype
- [?] EP-047 — Shortlist 7 candidats jeux addictifs (Simon, Block Blast, Tangram dino, Mahjong dino, MJ-18 Expert, Shisima, Picross) — priorisation Papa Yann à trancher

## Lane — Cloud/compte (EP-048/049/069/075)

**DoD** : parcours compte→sync recetté par Papa Yann en conditions réelles avant usage enfants.

- [ ] EP-048 — Recette réelle parcours compte→sync (login → partie → sync → récup profil autre appareil) — BLOQUANTE avant usage réel enfants
- [ ] EP-049 — Resend SMTP + `{{ .Token }}` dans template Magic Link (domaine custom)
- [~] EP-069/075 — Phase 1 cloud déployée, reste test e2e réel puis Phase 2 (codes cadeaux, voix premium, RGPD) + dettes Supabase (storage `mj32_galerie`, RLS tables 001, validation client)

## Lane — Voix/audio production (EP-050)

**DoD** : au moins 1 clip produit et validé.

- [ ] EP-050 — Production premiers clips voix (`voices-manifest.js` vide) — jamais démarré

## Lane — Retours Papa Yann 2026-09-08 (nid, œufs, MJ-28) : reste ouvert

**DoD** : EP-123 tranché (bug réel ou non), EP-128 statué.

- [!] EP-123 — Un MJ terminé n'a déclenché ni célébration ni écran de fin (Troodon/Spinosaure signalés) — 18 parties jouées en enquête (L-119), non reproduit, cause non identifiée : throttling CPU réel du P30 Pro et TTS réel jamais testés en headless
- [ ] EP-128 — mj-32 (atelier coloriage) n'appelle aucun `G.showEnd()` — choix assumé pour un atelier libre, mais à trancher explicitement : pas de Tracker, pas de capsule/œuf, pas d'écran replay

## Autres tickets isolés anciens (jamais avancés, statut à confirmer avec Papa Yann)

- [ ] EP-005 — Système de progression (flotte + carte) — jamais développé
- [ ] EP-026 — TTS ElevenLabs pré-générés (MP3 statiques noms de jeux) — reporté, speechSynthesis natif en fallback
