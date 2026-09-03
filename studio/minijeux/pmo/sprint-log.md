# Sprint Log — PMO Game

> Journal de bord des sessions.
> **En cas de reboot :** lire la dernière entrée (haut du fichier), section "État au reboot".
> Les entrées les plus récentes sont en haut.
>
> Équivalent côté Narration : [`../../studio/narration/pmo/sprint-log.md`](../../narration/pmo/sprint-log.md).
> Créé 2026-05-13 (extraction depuis `memory/state.md` lors de l'harmonisation Game ↔ Narration).

---

## 2026-08-10 — PURGE MENU : 36 jeux réels, 23 fichiers supprimés

**Trigger** : Papa Yann — « j'aimerais que ce soit clair combien de mini-jeux on a réellement, les autres on les vire des listings & co, on garde l'idée mais rien de codé pour rien ».

**Fait** :
- Inventaire vérité : **36 jeux au menu enfant + encyclo dinos (wip) + 2 bacs à sable parentaux** (max-adventure, mj-pose-tiles gardés sous la main, décision PY). Compteurs précédents tous faux (catalog 45/30, INVARIANTS 42, state 43).
- **23 fichiers jeux supprimés de `site/`** : 18 retirés (mj-04/05/08/11/12/16/17/23/25/26/27/29/33/36/41/43/44/45) + mj-58 (décision PY du jour, idée runner conservée au backlog) + 4 orphelins (mj-01, mj-13b, mj-gold-a, mj-gold-b).
- Nettoyage chaîne complète : catalog.js (20 entrées sorties), mur.js, textes-jeux.js (18 règles), 20 specs + test-unlock.mjs, whitelist audit-gabarit (reste mj-32/pose-tiles), 11 figées archivées, INVARIANTS/state réécrits, bannières snapshot CLASSIFICATION/_PALIERS, EP-112 dormant (COMPETENCE_PILOTS vide), tracker.js GAME_META conservé (labels historiques).
- Décisions PY capturées : orphelins → suppression complète · mj-58 → suppression complète · parentaux → gardés · **mj-57 → on garde et on répare** (il est cassé : couleurs/win instant/niveau figé).

**État au reboot** : purge livrée, vérif audit-gabarit en cours. RESTE (phase suivante, GO PY attendu) : corrections 8 annotations 2026-08-10 (mj-32/30/31/28/24/57 + règle transverse zéro ascenseur) + reliquat vague 2026-07-27 (mj-52/53/51/19/14/15). MP3 orphelins des jeux morts = chantier session sons, pas touché.

---

## 2026-07-29 — Session nocturne « reprend et termine » (autonome, GO PY)

**Fait** :
- **P1 levés (les 6)** : mj-46 plus d'éclosion en jeu (crackParty, figée mj-46.md créée) · mj-30 tap = nom seul — cause racine : les `<id>-nom.mp3` à plat sont des FICHES de 20-35 s, `playDinoNom` rebranché sur `noms/<id>.mp3` (1,5-2 s, complétés 70/70) · mj-20 confirmation unique courte · mj-49 formulations « il en manque / il en faut » alternées dès N0 · mj-34 panneau SORTIE vert DEVANT la porte + calibrage BFS (★★ 5 coups, ★★★ 7-8, `gen-rushhour.mjs`) · mj-50 « E accent grave f » réglé par la banque MP3 phonèmes.
- **Banque audio C6 V1 (100 MP3 EL, eleven_v3, narrateur_h, padding 250 ms)** : 10 noms dinos courts manquants · 15 phonèmes (MJKit.sayPhoneme = MP3-first, table partagée mj-50/51/52, zéro copie locale) · nombres 0-30 + 40/50/100/1000 (+ variante fête 1-10) · gabarits COMPLETS il-en-manque-N / il-en-faut-N / N-œufs (jamais d'assemblage mot-à-mot). Brique partagée `site/js/say-nombres.js` branchée mj-46/mj-49.
- **EP-112 pilote mj-04 (GO PY « codé/testé »)** : `Golden.levelOf` = max(plancher étoiles, niveau ouvert par ≥80 % premier coup sur 3 parties depuis la dernière ouverture), persisté `golden_openlvl` (jamais de descente), `tracker.js` trace `first` par session (rétro-compatible). mj-04 migré au gabarit (piste golden, G.showEnd, scorebar/levelbar supprimés), sac adaptatif 6/2·4/4·2/6 + ajustements silencieux intra-partie. Figée mj-04 amendée datée. Tests T1-T5+T9 verts. **Pilote mj-04 SEUL — les 13 autres figées ne sont PAS défigées** (propagation après validation ressenti Max).
- **Migration des 7 derniers écrans maison** (mj-06/09/18/20/37/40/51) déléguée à 3 game-dev — vérif git diff avant push.

**Leçon (L-112)** : `Tracker`/`DINOS` sont des `const` top-level, PAS sur `window` — `global.Tracker` vaut undefined dans une lib IIFE ; toujours l'identifiant nu gardé par `typeof`. 2e occurrence du piège (nid-ui, mj-golden) — désormais commenté aux deux endroits.

**État au reboot** : commits 613934xx (P1+audio) et 3fcf1e49 (EP-112) poussés. Rappel programmé 01:49 « reprend et termine ». Restent : rapport des 3 agents migration, MAJ _BANQUE-SONS.md, échantillons nombres à faire écouter à PY.

---

## 2026-07-19 — Fusion gouvernance : PMO unifiés + capture immédiate

**Fait (transverse 3 pôles, décision Papa Yann)** :
- PMO + archiviste fusionnés en UN agent par pôle (`game-pmo` absorbe aussi game-mj-pmo + game-tile-pmo). Modèle Haiku → **Sonnet** (REX agents menteurs). Règle anti-mensonge gravée dans chaque agent (rapport finit par `Fichiers modifiés :`, vérifié git diff).
- **Capture immédiate** : toute idée/décision de Papa Yann = 1 ligne backlog DANS LE TOUR (main agent). Hook Stop `pmo-check.ps1` généralisé aux 3 pôles : session sans trace pmo/ = bloquée.
- signal-detector reworké (messages actionnables + conseillers) ; commandes `/X-archiviste-audit` fusionnées dans `/X-pmo-audit` (FOND+FORME, 6 sections).

**État au reboot** : gouvernance = 1 greffier/pôle + conseillers + hook enforcement. EQUIPE.md/INDEX/CLAUDE.md pôles à jour.
**REX immédiat** : le hook s'est déclenché sur sa propre session de création (les écritures pmo/ via Bash/python étaient invisibles) → patch v1.1 : les commandes Bash/PowerShell touchant `pmo/` comptent comme trace. Enforcement validé en conditions réelles.

## 2026-07-17 — Pointeur Doctrine transverse intégré

**Owner** : Papa Yann (création doctrine) · game-pmo (log)

**Fait** :
- ✅ **Pointeur ajouté** : `studio/minijeux/pmo/INVARIANTS.md` § "Doctrine transverse" → `../../memory/DOCTRINE.md`
- ✅ **Log decision.md** : 2026-07-17 § "Intégration doctrine transverse MaxPlay (D-001/002/003)"

**Raison** : doctrine est une zone commune multi-pôles (pointe, ne recopie pas). D-001 (pédagogie = produit), D-002 (zéro pénalité), D-003 (pas récompense promise) = gouvernance JEU ∩ DINO ∩ NARRATION.

---

## 2026-07-17 — TOUR EXHAUSTIF AUDIO VOIX — audit complet 100% scope JEU (proposition Papa Yann validation)

**Owner** : Papa Yann (demande) · main agent (audit) · game-pmo (log)

**Trigger** : Papa Yann tour exhaustif messages parlés pôle JEU seul (dino gérée par dino-pmo) — détaillé inventaire propositions LOT 1-5, statut attente validation textes.

**Fait** :
- ✅ **Audit doc créé** : `studio/minijeux/docs/AUDIT-AUDIO-VOIX-2026-07-17.md` (inventaire exhaustif 100% + scripts par LOT 1-5, EN ATTENTE VALIDATION Papa Yann)
- ✅ **Violation règle détectée** : 2 occurrences « Max » nommé nominativement dans contenu livré (mj-22.html l.254 « Bravo Max ! » + catalog.js mj-34 « celui de Max »)
- ✅ **Corrections immédiat** : mj-22 réécriture « Bravo ! Tu connais l'Europe par cœur ! » + catalog.js reformulation « libère le tien ! »
- ✅ **Leçon L-109 gravée** : jamais nommer Max nominativement dans contenu produit (profil = calibrage interne, pas adressage direct enfant)
- 🔄 **Reste** : aucune prod audio lancée (attente validation Papa Yann scripts LOT 1-5), 9 quick-win code (C1-C9) signalés dans audit doc, pas de modification

**État au reboot** :
- ✅ Audit audio complet structuré (LOT 1 menu, LOT 2 consignes, LOT 3 fins, LOT 5 dynamiques, LOT 6 multilingue TTS natif)
- ✅ 2 violations nom enfant corrigées commit ready
- ✅ 9 fixes code légers listées (C1-C9, branchement MP3 orphelins, fallback audio)
- ⏳ Attente Papa Yann validation : scripts LOT 1-5 (ensemble 43 variantes menu + fixes)
- ⏳ Ticket future (EP-AUDIO-2026) : prod ElevenLabs LOT 1-3 (menu/consignes/fins) + branchement dynamiques LOT 5 post-validation

**Prochaines étapes** : Papa Yann valide scripts LOT 1-5 (ou demande réécriture) → green light → prod ElevenLabs MCP `studio_audiobook_from_segments_v2_dialogue` avec voice-map.json + tags v3 codage (Narration-audio pilote mécanique)

---

## 2026-07-15 — ABANDON HUB « LA LIGNE DE MAX » + Menu accordéon sobriété maintenue (décision Papa Yann)

**Owner** : Papa Yann (décision) · game-pmo (log)

**Trigger** : session 2026-07-15 Papa Yann — feedback UX hub v2 (index2.html ligne de bus, 6 arrêts) trop futuriste/lourd pour phase 1. Décision : abandonner le concept, revenir au menu accordéon tiroirs sobre.

**Fait** :
- ✅ **Décision figée 2026-07-15** : concept hub « La ligne de Max » (voie A ligne bus horizontale, 6 arrêts, index2.html) **ABANDONNÉ DÉFINITIVEMENT**. Menu = accordéon tiroirs MAXPLAY_CATEGORIES (catalog.js).
- ✅ **Brainstorm post-abandon** : regroupement actuels ~10 tiroirs (Lettres, Chiffres, Ranger, Réparer, Couleurs, Réfléchir, Jeux du monde, Dinos, Méchaniques, Libraire) → **cible 3-5 catégories** (décomposition futur TBD).
- 🔄 **À nettoyer** : `index2.html` (6 arrêts), `site/manifest-fusee.json` (index3.html fusée) = garder archivés historique, PAS livrer prod.

**État au reboot** :
- ✅ Décision abandonnement hub « La ligne de Max » figée
- 🔄 Regroupement catégories 10→3-5 en brainstorm futur (pas blocage phase 1)
- ✅ Menu accordéon = statut quo, zéro refactor
- ⏳ Question ouverte : timing refonte menu (après test shortlist EP-047 ou Phase 2 ?)

---

## 2026-07-14 (après-midi) — 4 DÉCISIONS PAPA YANN TRANCHÉES + Livraisons (commits 98424775 + 68284858)

**Owner** : Papa Yann décisions · main agent implémentation + game-pmo log

**Trigger** : session après-midi, Papa Yann arbitrage post-relecture 2026-07-14. Moisson décisions figées + livraisons immédiates.

**Fait** :
- ✅ **EP-098 CORRIGÉ** (commit 98424775) : mj-22 micro-pays filtrés (Chypre/Lituanie/Lettonie/Estonie/Monténégro retirés), zones tap 80px. Figée mj-22.md 2026-07-14 gravée.
- ✅ **EP-099 TRANCHÉ** (commit 98424775) : mj-06 accents GARDÉS (GÂTEAU, ÉTOILE…), seule la ligature Œ bannie (OEUF). Figée mj-06.md créée.
- ✅ **RÈGLE FIGÉE CHANGÉE** : maxStars catalog 5→3 global (commit 68284858). 17 jeux impactés : 10 remappés 5-paliers→3-niveaux (mj-04/05/09/13a/13c/15/16/18/19/23), 7 déjà 3 inchangés. Specs 20/20 vérifiées.
- ✅ **EP-100 PARTIELLEMENT LIVRÉ** (commit 68284858) : Bibliothèque savoir-faire GO « super pratique ». Étape -1 workflow ajoutée (check libs amont). **3 libs extraites testées** : js/mj-dice.js (dés) · js/dinos-ombres.js (pool ombres) · js/mj-compte.js (1-moteur-N-peaux pilote mj-04/26). Docs docs/MECANIQUES.md + rules/mini-jeux.md gravées. Panneau-led.js suspendu EP-101 fusion.
- ⏳ **EP-101 REMIS** : fusion F1 (mj-13a+13c) = friction refonte menu + tests pervasifs. À arbitrer Papa Yann : NOW v0.5 ou Phase 2 ?

**État au reboot** :
- ✅ 4 décisions tranchées gravées decisions.md (changements règles figées datés 2026-07-14)
- ✅ 3 libs opérationnelles (workflow -1 nouveau), 1 en suspens (attente fusion)
- ✅ Catalog.js + 17 figées/mj-XX.md mis à jour maxStars 3-niveaux
- ✅ Leçon L-099 ajoutée (phonétique vs accents)
- ⏳ EP-101 fusion = question ouverte stratégique (scalabilité Phase 2)

**Prochaines étapes** : attente Papa Yann arbitrage fusion (EP-101) + validation 48h ressenti maxStars 3 + confirmation réactivation mj-22/mj-20 menu.

---

## 2026-07-14 — Relecture textes 41 MJ + Classification 100% + Tickets audit 3 domaines (commits 25452ff5 + aeab8272)

**Owner** : 3 agents de relecture (game-dev + chercheurs) · main agent (synthèse classification) · game-pmo (log)

**Trigger** : Papa Yann retour post gabarit unique v1 + Design System — demande audit qualité avant Phase 2 (WexWorld). Solution : relecture exhaustive textes + classification mécanique → tickets audit.

**Fait** :
- **Relecture textes 41 MJ (commit 25452ff5)** : 3 agents parallèles (1 agent ≈ 13-14 jeux) ont relu contre code gameplay réel. Trouvé + corrigé : 20 apostrophes typographiques, accents mj-06, coquille « de son son » mj-44 (jeu+catalog.js), hint mj-13c, description mj-41. Zéro gameplay touché, tests verts. **Leçon L-098 ajoutée** : relecture multi-agents = valider par git diff stat + tests per-jeu (pas de confiance aveugle).
- **Classification 100% des 41 jeux (commit aeab8272)** : analyse structurée par famille mécanique (8 familles), difficulté (4 régimes différents, bazar identifié), transposabilité, duplications code avérées. Nouveau doc `studio/minijeux/docs/jeux/CLASSIFICATION-2026-07.md` produit.
- **Tickets audit 3 domaines (backlog.md)** :
  - **EP-098** [!] : 🚨 mj-22 VIOLE sa figée (micro-pays bannis + zone tap < 60px) — regression silencieuse à corriger
  - **EP-099** [?] : mj-06 accents phonétiques ajoutés (français OK, lecture phonétique ?) — validation Papa Yann
  - **EP-100** [?] : mj-13a/13c + mj-43/45 duplication moteur identifiée → candidates libs L1-L4
  - **EP-101** [?] : Proposition « Ranger la chambre » (fusions F1/F2 + libs + pilote 1-moteur-N-peaux) — QUESTION OUVERTE

**État au reboot** :
- ✅ Relecture textes FERMÉE (41 MJ, 0 regréssion gameplay)
- ✅ Classification PRODUITE (doc CLASSIFICATION-2026-07.md, 4 sections + annexe 41 fiches)
- ⚠️ **À trancher Papa Yann** : EP-098 (correction ou retrait permanent mj-22), EP-099 (accents sur phonétique), EP-101 (restructuration catalogue, décision stratégique Phase 2)
- ⚠️ **Tech debt EP-100 identifiée** (fusions candidates à prioriser si go sur F1)

---

## 2026-07-14 — Gabarit unique mj-shell.js + batterie test 2 vitesses (commits 392d59d0 + 049b2ad5 — 41/44 MJ migrés, audit-gabarit.mjs créé)

**Owner** : main agent (cadrage gabarit + pipeline test) · game-pmo (log)

**Trigger** : Papa Yann demande consolidation après Design System v1 (énième review mini-jeux révèle variations manuelles). Solution : gabarit unique + test script.

**Fait** :
- **Gabarit `mj-shell.js` unique FIGÉ** : 1 include = cadre complet (thème + golden + 🧑‍🔬 règles + tracking + cloud + celebrations). Élimine liste 14 scripts à la main. Utilisation : `MJ.ready(fn)` + `MJ.init({id, titre, emoji, golden, consigne, onRepeat, regle})`.
- **Batterie test 2 vitesses** : 
  - Vitesse ÉCLAIR : `node audit-gabarit.mjs [mj-XX]` (script déterministe < 1 min, vérifie cloud.js/mp-theme/charset/header/spec présentes = BLOQUANT push)
  - Vitesse COMPLÈTE : `npm run mj:test mj-XX` (harnais E2E) + agents LLM (game-test-secu / game-test-audio) par domaine sensible
- **40 MJ migrés** (mj-04..45 sauf mj-01/13b/14 retirés menu) → harnais 41/42 vert (mj-01 absent catalogue OK, mj-14 rouge préexistant).
- **Specs v3 gravées** : mj-20 + mj-pose-tiles créées, règles v3 détaillées écrites par jeu (gabarit, golden, consigne structure).
- **Règle `.claude/rules/mini-jeux.md` durcie** : § LE GABARIT (obligatoire depuis 2026-07-14) + § Batterie de test 2 vitesses figée (coût script/LLM par domaine).

**Décisions produit prises en exécution** :
1. **Gabarit `mj-shell.js` = seule source** — tout nouveau MJ le charge, zéro variante locale tolérée
2. **Audit gabarit obligatoire** — `node audit-gabarit.mjs` bloquant avant tout push (À VALIDER : git hook CI ou manuel)
3. **Test 2 vitesses stratégique** : script mécanique rapide (avant push), LLM contexte sensible (release)

**État au reboot** :
- ✅ Gabarit FIGÉ (commit 392d59d0, utilisé sur 41 MJ)
- ✅ Batterie test déployée (commit 049b2ad5, audit-gabarit.mjs opérationnel)
- ⚠️ **À confirmer Papa Yann** : audit-gabarit.mjs bloquant CI ? (EP-085 proposé)
- ⚠️ **Exceptions préexistantes** : mj-01 (retrait menu) + mj-14 (spec rouge) = non couverts par gabarit audit

---

## 2026-07-13 — Atelier avatar v3 familles couleurs (commit d706416a — UX liste tap/nom/couleurs-origine + recolor par familles hue-shift)

**Owner** : main agent (UX avatar + mécanique recolor) · game-pmo (log)

**Trigger** : Papa Yann retour atelier avatar — « raffinement couleurs enfant » après validation Design System v1 (commit 91ef327b). Benchmark : audit 29 avatars dinos → 1-3 familles teinte chacun.

**Fait** :
- **UX décision** : liste dinos FERMÉE au tap sur grand avatar, ROUVRE à choix · nom affiché au-dessus · grille 3 colonnes + noms · nouveau dino arrive avec **couleurs d'ORIGINE** (pas recolor auto)
- **Recolor technique** : extractFamilies (8 clusters groupés teinte, max 3 familles, gris à part) + recolorSmart (hue-shift par famille, luminosité relative conservée : couleur + ombre tournent ENSEMBLE)
- **3 propositions nuancier** : ✨ tout-teinte nuancé / 🌿 duo voisin / ⚡ contraste complémentaire (décalage PAR famille)
- **Audit 29 avatars** : chacun 1-3 familles (Tritri 3 : h77 80%/h30 15%/h120 5% ; Rex 1 ; Anky 3 ; seule Libelle >3) → outil ready pour itérations futures
- **Bug détecté & fixé** : paintInto(null) retombait sur getColors() avatar validé → couleurs d'un autre dino. Règle : curTargets null = src direct, jamais paintInto

**État au reboot** :
- ✅ Atelier avatar v3 coloration déployé (commit d706416a)
- Mécanique recolor figée (extractFamilies/recolorSmart par famille, pas RGB brut)
- Audit 29 avatars référencé pour futures évolutions

---

## 2026-07-13 — Atelier avatar durcissement API coloration (commit 53f1cfbc — fix triplets toujours noirs)

**Owner** : main agent (correction coloration + API officielle) · game-pmo (log)

**Trigger** : Papa Yann retour atelier avatar — « triplets toujours noirs, n'applique pas sur l'avatar ». Root cause : API coloration parallèle (hex strings → NaN → noir).

**Fait** :
- **API Avatar.color officielle** : unique source coloration (`hex`, `fromHex`, `rgb2hsl`, `hsl2rgb`, `vivid`, `bases(src,cb)`) — JAMAIS réimplémenter parallèle
- **Triplets générés** : 11 couleurs → 3 triplets autour teinte (teinte imposée, saturation/luminosité des bases conservées, algo presets historique) + aperçu immédiat
- **UX nuancier** : 🎲 variance forte (historique) · ↺ origine · fleur retouche 1 seule base
- **Smoke Playwright pixel-level** : 19/19 pass (jamais noir, teinte appliquée, stockage [r,g,b] validé)
- **Coût** : 0 crédits EL, test local 15 min

**État au reboot** :
- ✅ Atelier avatar coloration DÉPLOYÉ (commit 53f1cfbc, Playwright 19/19 vert)
- API Avatar durcissement figée (pas de réimplémentation futures tolérées)

---

## 2026-07-13 — Design System v1 appliqué site entier (commit 91ef327b — 40 MJ convertis + atelier avatar + accueil refondu)

**Owner** : agents parallèles (conversion MJ 40 × règles + système avatar) · game-archiviste (structure gabarit v2 header) · game-pmo (PMO log)

**Trigger** : Papa Yann valide package Design System v1 (2 dépôts inbox 2026-07-12/13, 40 MJ déjà codés par agent vague 3).

**Fait** :
- **Index.html** : menu 2 niveaux (catégories + jeux pliables) · profil avatar/niveau/★ · encyclopédie dino épinglée · footer parent + avis + code TRITRI + jingle (bus-défilé SUPPRIMÉ, à valider Papa Yann)
- **40 MJ + max-adventure** : conversion template v1 → v2 (markup .hdr conservé, styles exclusif mp-theme.css) · zéro CSS locale .hdr · respects figées per-game gravées
- **avatar-atelier.html** ✨ : triplets avatar (37 petites fleurs hexagones oklch) · vestiaire dino/objet/accessoire · 6 ambiances sélectionnables (nuit/jungle/ville/espace/arcade/musée, localStorage maxplay_ambiance)
- **mj-golden.js v2** : track questions parcours (★ or 1er coup / ✓ orange après essai / 💡 rouge doux aidé) · markPoint + finalStar + belt cinematic · piste questions .mp-track stables
- **mj-11.spec.mjs** création · mj-37.spec.mjs fourchette hauteur header agrandie
- **Harnais** : 40/42 vert (mj-01 retrait menu + mj-14 préexistant rouge, ne pas compter)
- **Coût** : 0 crédits EL, 0 Kimi, refonte CSS pure site/

**Décisions produit** :
1. **Gabarit header MJ** : v1 (styles .hdr locals) REMPLACÉ par v2 (styles mp-theme.css) — règle figée 2026-07-13, impact tou MJ futurs · règle `.claude/rules/mini-jeux.md` mise à jour
2. **Ambiances par défaut** : jungle/ville/musee/arcade hardcodées jeu-par-jeu (choix enfant écrase au chargement) — pas d'UI centralisée sélection avant, enfant choisit en atelier
3. **Célébrations MaxFX** : markPoint chaque bonne réponse · finalStar+belt sans-faute · cinematic RÉSERVÉ sans-faute (validation Papa Yann 2026-07-13 en cours ressenti)
4. **Bus-défilé header index** : SUPPRIMÉ du design. À confirmer Papa Yann (cosmétique, non-bloquant)

**État au reboot** :
- ✅ Design System v1 DÉPLOYÉ (commit 91ef327b harnais vert)
- ⚠️ **EXCEPTIONS à trancher Papa Yann** (EP-079..083) :
  - mj-01 + mj-14 : specs rouges PRÉEXISTANT (Stars.get=0 après manche parfaite) — à adapter specs ou retrancher jeux
  - mj-08 : design clair volontaire (exception) — conserver ?
  - mj-34/36/38/39 : finalStar cinematic sur dernier palier VS. sans-faute strict — validation ressenti 48h
  - Ambiances hardcodées par jeu : par défaut ok ? choix enfant écrase ?
- 🔴 **REX agent** : game-pmo (Haiku) remit checklist « ✅ persisté » SANS git diff (zéro écriture) + inventa détails (sounds.js jamais touché) — entrée rédigée par main agent. Récidive [[feedback_verifier_claims_agents]].

---

## 2026-07-13 — « Vraie voix partout » : consignes EL branchées, banque 28 phrases, étoile parlée, 9 Cénozoïque complets (commit 8826e489)

**Owner** : main agent (production EL + branchements) · game-dev (Chantier A code)

**Trigger** : Papa Yann — « remplacer tous les audio restants par une vraie voix » (EL revenu, quota reset). Base = audit [`memory/audio/PLAN-AUDIO-I18N.md`](../../../memory/audio/PLAN-AUDIO-I18N.md) (2026-07-08). Vigilance explicite : tags catalogue only + dialogues jamais surjoués/répétitifs.

**Fait** :
- **Consignes MP3** (remplacent TTS) : mj-13a `quel-bus-arrive-en-premier` · mj-13c `compte-les-un-par-un` (indice) · mj-14 `quel-bus-manque`/`qu-est-ce-qui-manque` · mj-15 `lequel-ne-va-pas` · mj-16 `qu-est-ce-qui-vient-ensuite` · mj-43/44/45 banner parlé **au changement de palier uniquement** (slug par palier, anti-répétition).
- **Banque `sounds/voix/phrases/` 10 → 28 slugs** (inventaire : [`site/sounds/_BANQUE-SONS.md`](../../../site/sounds/_BANQUE-SONS.md) § 1). Padding 250 ms (L-069) sur toutes les nouvelles voix mono.
- **mj-37** : 6 voicelines pièces créées `sounds/pieces/<p>-intro.mp3` (textes = fallbacks déjà dans le code, 0 changement code).
- **Étoile parlée** : nouveau `SoundPool.voiceLine(slug, fallback)` (1 des 3 voix f/h/wex) + appel `etoile-gagnee` dans `Golden._starFlight` à l'atterrissage.
- **`RegleInfo.init({slug})`** : la modal ❓ joue le MP3 au tap 🔊 si slug fourni (fallback TTS inchangé).
- **Chantier A (game-dev, vérifié au git diff)** : fix fanfare mj-42 (`playEndSound(true/false)`→NaN) · `playEndSound` ajouté mj-17/18/22/39 (+ spec mj-17 créée) · funfact MP3 mj-28/33 via nouveau `playDinoFunfact` + manifest `DINO_FUNFACT_AUDIO` · chaînage `il-vivait-quand` mj-31 · `cherche-bien` mj-22 · pool `apparition` sur mini-étoile Golden.
- **Dino (pôle DINO, trace détaillée chez dino-pmo)** : 9 Cénozoïque complétés (27 blocs + 9 recaps, textes V3 validés) → `DINO_AUDIO` 60/60.
- **Coût EL** : ~4 160 crédits / 121 567 (3,4 %). **Tests** : harnais vert sur mj-13a/13c/15/16/17/18/22/24/25/28/33/39/41/42/43/44/45 ; mj-14 rouge = préexistant (rouge aussi sur HEAD).

**Décisions produit prises en exécution (Papa Yann a validé le plan, ces 3 choix restent contestables)** :
1. PAS de voix « Bravo » à chaque bonne réponse — ding en cours de partie, voix à la fin (anti-lassitude, réversible 1 ligne).
2. PAS de MP3 « préfixe fixe + suite TTS » mi-phrase (rupture de voix) — gabarits variables (« Trouve le bus 38 ») restent TTS entier.
3. Consigne parlée mj-43/44/45 = changement de palier seulement, jamais chaque manche.

**État au reboot** :
- ⚠️ **BUG préexistant mj-14** : `Stars.get('mj-14')===0` après manche parfaite (spec rouge AVANT session — endSession/logAnswer/catalog à investiguer).
- 4 phrases orphelines (`cest-parti`, `a-toi-de-jouer`, `encore-une-fois`, `ouvre-bien-les-yeux`) : points d'usage = décision Papa Yann.
- mj-30 (taille) et mj-29 (dico) : branchement non trivial, raisons dans `_BANQUE-SONS.md` § 5.
- Hub `index.html` ne charge pas `victory-sounds.js` (pool deblocage non branché au hub).
- ⚠️ REX agent : game-pmo (Haiku) a rendu une checklist « ✅ persisté » sans rien écrire (0 diff git) + inventé des détails (site/js/sounds.js jamais touché) — entrée rédigée par le main agent à la place. Récidive [[feedback_verifier_claims_agents]].

---

## 2026-07-12 (soir) — Audience + Espace Parents : 5 décisions Papa Yann figées (commits ea21d603 + f48966d8 + d7632997)

**Owner** : Papa Yann (décisions) · game-conseiller (tour de garde infra) · game-dev (déploiement)

**Trigger** : Clôture Phase 1 cloud Supabase. Papa Yann tranche 5 décisions métier (audience, espace parents, transparence). game-conseiller proactif : 3 corrections infra (duel/lecture/pagehide).

**Fait (session finale 2026-07-12)** :

- **5 décisions Papa Yann FIGÉES** : ping audience journalière GARDÉ + flag logged_in (CNIL mitigé par transparence) · espace parents sobre (gate 3s + question adulte) · auteur.html UID Papa Yann seul · retours autres parents = digests Claude/Telegram · confidentialite.html lien depuis compte.html + hub suivi.
- **Migrations Supabase 006-007 appliquées** : table pings + RLS anon INSERT-only · migration 007 = RLS parent auteur figée (seul UID 9efd6921 lit pings sur auteur.html).
- **game-conseiller tour de garde** : duel/lecture flaggés `tool:true` (exclus dashboard Max) · pagehide <10s sans réponse = pas une partie (correctionlogique) · message reset honnête "données perdues ou non envoyées".
- **Tests verts** : E2E gate 3s vert (appui long, mauvaise réponse bloquée, entrée OK) · smoke 4 pages vert · matrice RLS pings testée curl (201/409/401/select vide).
- **Dettes documentées** : spec catalog obsolète (mj-01 absente, à retirer) · spec mj-01 FAIL pré-existant (stars) · mj32_galerie ≈512Ko limit · advisors RLS (future).

**État au reboot** :
- Cloud Phase 1 LIVRABLE (RLS fonctionne, E2E vert).
- Prochaine étape : audit specs cassées (EP-048) + figeage dettes catalog + validation Papa Yann 3 appareils + sync.
- **Blocage** : réelle recette e2e enfant (Papa Yann test) + sync multi-devices.

---

## 2026-07-12 — Cloud Supabase + Sync Annotations (commit bce5aca8)

**Owner** : Développement backend Cloud (game-dev) · game-pmo (log + tickets)

**Trigger** : Implémentation 3 tables Supabase WexWorld + sync annotations (duel/lecture) → cloud native.

**Fait (session night 2026-07-12)** :

- **Migrations Supabase 003–005 appliquées** : `game_sessions` (append-only parties, dédup child_id+game_id+played_at), `child_state` (sync clé-valeur whitelist 8 champs), `annotations` (sources review/duel/lecture, dédup parent_id+client_key). RLS parent figé.
- **site/js/cloud.js** : `_syncStates`, `_flushSessions`, `_flushAnnotations` + API `Cloud.pushAnnotation()` intégré.
- **duel.html & lecture.html** : tracker GAME_META + envoi cloud auto payload JSON final (copier-coller fallback).
- **suivi.html** : clé morte `maxplay_stars` retirée, reset élargi.
- **Décision Papa Yann validée** : fin copier-coller JSON — tout échange table Supabase.

**État au reboot** :
- Cloud ready pour duel/lecture (enregistrement auto serveur).
- DETTES : spec index obsolète (mj-01 absente menu), spec mj-01 FAIL pré-existant (stars), mj32_galerie proche cap 512Ko, golden_stars_* risque incohérence, advisors RLS dettes.
- Prochain : audit des specs cassées, figeage dettes catalog, prochain ticket Supabase (validation côté client).

---

## 2026-07-08 — ÉTUDE ARCHI COMPTES + DÉCISIONS MÉTIER Papa Yann

**Owner** : Papa Yann (décisions produit) · game-pmo (log + intégration)

**Trigger** : Papa Yann a validé l'étude d'architecture comptes/profils (main agent 2026-07-08) et émis 11 décisions figées portant sur le modèle freemium, avatar, trophées-puzzle, UI règles, et pattern audio+emoji séquencé.

**Fait (session game-pmo 2026-07-08)** :

### Bloc 1 : Décisions figées (Papa Yann 2026-07-08)

**11 décisions capitales** :

1. **Comptes & monétisation** : PAS de tier family/payant pour l'instant — compte unique anonyme + cache basique. Codes cadeau type `TRITRI` pour tester uniquement. Monétisation reportée.

2. **Dessins coloriage** : JSON zones→couleurs (pas JPEG/PNG). Reproductible, stockage quasi-gratuit. Ouvre mode impression (grand format ± couleurs pré-chargées = produit dérivé futur).

3. **Parcours "Qui joue ?"** : complet reporté. Priorité mini-jeux d'abord.

4. **Zone accès compte** : visible dans 3 index (index.html footer, dev-dinos.html lien discret, suivi.html OK). Temporaire, implémenté ce jour (commit tbc).

5. **Status catalog.js** : jeux activables/désactivables facilement via champ `status` (live/wip, prévoir 'off'). Déjà supporté.

6. **AVATARS CHIBI** : NEW ticket EP-xxx. Générer top 10 dinos × 3 humeurs (joyeux, énervé, original) = 30 chibis via pipeline images ChatGPT (Dinosaure XXL project).

7. **Likes privés** : confirmés. JAMAIS de social inter-enfants.

8. **Trophées-puzzle** : cadrés V1 — avatar OU dessin liké fragmenté N morceaux, fragment gagné comme étoile *(ou 3★=1 fragment)*, recompose image, variante gold. Peut remplacer/surcoucher étoiles. Prototype après refonte menu.

9. **Bouton règles ❓** : implémentation lancée ce jour. Composant regle-info.js partagé + 9 nouveaux MJ d'abord.

10. **Mystère MJ-31 "texte long" élucidé** : c'était l'AUDIO (annonces ~2 min chevauchées). Fix chevauchements en cours — enchaîner sur fin réelle audio, plus de setTimeout fixes.

11. **LEÇON pattern audio+emoji séquencé** : (demande Papa Yann 2026-07-08 "note pour plus tard") — « lire audio + afficher emojis synchronisés = super intéressant, attention synchro, laisser audios se finir » — pattern validé mj-31 finale météorite. Audios qui se chevauchent → TOUJOURS enchaîner sur event fin audio, JAMAIS setTimeout fixe.

### Bloc 2 : Tickets nouveaux créés

- **EP-072** : Avatars chibi × 10 dinos × 3 humeurs (30 images) — générées ChatGPT Dinosaure XXL
- **EP-073** : Composant bouton règles (i) — regle-info.js partagé, 9 nouveaux MJ
- **(Audit)** : fix audio MJ-31 chevauchements (déjà assigné, pas nouveau ticket)

### Bloc 3 : Logs

- Entrée détaillée sprint-log (ici)
- Decisions.md : 11 décisions figées + leçon L-088 audio pattern gravée
- Backlog.md : EP-072 + EP-073 ajoutés + L-088 ajoutée
- INVARIANTS.md : aucun changement chiffre clé (40 jeux live inchangé)

### État au reboot

- **Architecture comptes** : FIGÉE (compte unique anonyme, codes cadeau test, monétisation déférée)
- **Avatar + trophées** : tickets créés + priorité après refonte menu
- **Audio pattern** : leçon gravée pour futurs MJ
- **Bouton règles** : implémentation lancée ce jour
- Next : Papa Yann 48h test (feedback court), feedback shortlist 7 candidats (EP-047) → priorisation juillet-août

---

## 2026-07-07 — REVUE MINI-JEUX Papa Yann : 18 retours horodatés → 21 tickets EP-051..069 créés

**Owner** : Papa Yann (retours utilisateur) · game-pmo (classification + log)

**Trigger** : Papa Yann a fait la revue des jeux le 2026-07-07 soir (session validée) et livré 18 retours horodatés (bruts, par-jeu). Classification : 3 BUG CRITIQUES + 3 REFONTE + 12 AMÉLIORATION/FEATURE + 1 NORME transverse.

**Fait (session game-pmo 2026-07-07 21h)** :

### Bloc 1 : Classification retours

**BUG CRITIQUES** (3) :
- EP-053 (MJ-32) : zone noire non-recolorable flood-fill
- EP-059 (MJ-16) : portrait responsive cassé
- EP-063 (MJ-26) : dino hors cadre noir/noir + répétition niveau 1

**REFONTE** (3) :
- EP-054 (MJ-04) : « qu'est-ce que c'est moche »
- EP-055 (MJ-05) : « très laid mais l'idée est bonne »
- EP-060 (MJ-08/09) : doublon tri → refonte multi-thème

**AMÉLIORATION AUDIO** (4) :
- EP-051 (MJ-33) : TTS noms dinos uniquement
- EP-052 (MJ-31) : intro raccourcir + audit voix TTS
- EP-061 (MJ-12) : ajouter nouveaux sons banque
- EP-064 (MJ-27) : cliquer syllabe → entendre son

**AMÉLIORATION UX/FEATURE** (8) :
- EP-056 (MJ-06) : diversifier emojis (dino, voyage)
- EP-057 (MJ-23) : idem diversification
- EP-058 (MJ-15) : variantes intrus + ombres dinos (pas stigmatisant)
- EP-062 (MJ-25) : progression difficulté
- EP-065 (MJ-28) : lampe éclaire mieux
- EP-066 (MJ-29) : cliquer mot → place + lit
- EP-067 (MJ-30) : dire nom dino affichage
- EP-053 (MJ-32, features) : galerie + suppression long-tap + trophées-puzzle + likes

**NORME TRANSVERSE** (1) :
- EP-068 : bouton (i) règles sur chaque MJ + audio < 30s

**QUESTION OUVERTE FIGÉE** :
- Retrait 3 MJ du menu (MJ-01/13b/14) confirmé Papa Yann → implémenté (EP-070)
- Ombres chinoises canon seule source dino silhouettes (ordre Papa Yann 2026-07-05) → implémenté (EP-071)

### Bloc 2 : Tickets créés

**19 nouveaux tickets EP (EP-051 → EP-069)** :
- MJ-spécifiques : EP-051..067 (MJ-33/31/32/04/05/06/23/15/16/08-09/12/25/26/27/28/29/30)
- Norme transverse : EP-068 (règles button (i))
- Epic infra : EP-069 (cloud phase 1 finalisation)

### Bloc 3 : Logs

- Entrée détaillée sprint-log (ici)
- Backlog.md : 21 tickets avec statut/priorité/contexte/actions
- Decisions.md : Questions ouvertes mises à jour (9 MJ jour OK ?, shortlist 7 candidats, mondes menu refonte timing)
- Invariants.md : count jeux updated (20 actifs menu, 3 retirés) — ⚠️ **CORRECTION main agent 2026-07-07** : ce count était FAUX (le PMO a ignoré mj-21, mj-23, mj-34..42 et mj-pose-tiles). Réel vérifié node sur catalog.js : **39 live + 1 wip**. INVARIANTS.md corrigé et recommitté (a717413e). Leçon : toujours vérifier un count par script, jamais de tête.

### État au reboot

- **39 jeux live + 1 wip** (correction ci-dessus — inclut mj-21, mj-23, mj-34..42 section 🆕 revue, mj-pose-tiles) — 3 retirés ce jour (MJ-01, MJ-13b, MJ-14)
- **3 bugs critiques** à traiter ASAP (E-053/059/063)
- **3 refontes** validées (E-054/055/060)
- **12 améliorations** classées par priorité
- **1 norme** transverse (EP-068)
- **1 epic** infra (EP-069, phase 1 cloud)
- Next : Papa Yann test 48h ressenti + feedback shortlist 7 candidats (EP-047) → priorisation 2-3 nouveaux MJ début août

---

## 2026-07-07 — CLÔTURE INFRA/BUSINESS : Phase 1 cloud déployée, audit post-build 7/5, cohérence 3 index

**Owner** : Papa Yann (décisions métier) · game-pmo (log plateforme) · game-dev (infra)

**Trigger** : Audit infra/business complet suite déploiement phase 1 cloud (Supabase + compte utilisateur + voix premium EL) + audit post-build révèle 7 findings (5 fixés avant production).

**Fait (session 2026-07-07)** :

### Bloc 1 : Audit Infra/Business complet (commit b7dec8ef)

**Décisions figées** :

1. **Modèle comptes** :
   - Compte parent (email) + profil enfant pseudonyme (zéro donnée personnelle enfant)
   - Entitlements serveur JAMAIS en flag client (cryptography côté serveur obligatoire)

2. **Codes cadeaux** :
   - Usage unique lié à l'acheteur (jamais générique partageable)
   - Prevents scalping/partage viral

3. **Monétisation & partenaires** :
   - MoR : Paddle OU Lemon Squeezy (flexible, ESCROW protégé)
   - Phase 0 : tant que < 50-100 foyers hors proches (famille/copains seulement)
   - Pubs JAMAIS vers enfants (<4 ans = public fragile)

**Documentation** : `memory/audits/2026-07-06-infra-business.md` (commit b7dec8ef) — archi phasée 0-3, légal enfants, distribution, monétisation.

### Bloc 2 : Phase 1 light construite et déployée (commits 39dc7b49, 6ef89f20)

**Infrastructure Supabase** :
- Projet WexWorld (bfrugwrzpefsaehsvypt, eu-west-1 UE)
- Migrations 001_init (schéma base) + 002_indexes_hardening (RLS partout, security FIRST)
- Advisors SQL : VERT tous les checks (encryption, permissions, audit)

**Code déployé** :
- `site/js/cloud.js` : magic link + OTP code 6 chiffres (PWA iOS Safari = stockage séparé)
- `site/js/voice.js` : patch TTS.speak transparent (voix premium MP3 si connecté, robot sinon, fallback auto)
- `site/js/voices-manifest.js` : V0 vide, ready pour clips voix production
- `site/compte.html` : login interface
- Hooks `tracker.js` : schedulePush + lazy-loader cloud (anonyme = zéro réseau, freemium intact)
- Bouton Compte dans suivi.html

**Tests** : 18 stubs unitaires VERT (merge, patch voix, chargeur cloud à demande)

### Bloc 3 : Audit post-build (critique + haute + warn)

**7 findings identifiés** :

1. 🔴 **CRITIQUE** : magic link cassé en PWA iOS installée → Safari stockage séparé
   - Fix : Cloud.verifyCode + saisie code 6 chiffres en parallèle (commit validé)

2. 🟠 **HAUTE** : perte d'étoiles possible au merge (histories multi-appareils)
   - Root cause : on prenait record gagnant seulement, ignorait autres records
   - Fix : unionner histories + dédupliquer étoiles → max conservé (L-087)

3. 🟠 **HAUTE** : XSS surnom (injection HTML)
   - Fix : textContent au lieu innerHTML

4. 🟡 **WARN×3** : Advisors SQL (RLS trop lâche)
   - Fixes appliquées migration 002_indexes_hardening

**État** : 5/7 fixes déployées avant prod, 2 WARN classés non-bloquant (monitoring post-prod).

### Bloc 4 : Cohérence 3 index (commits cb8b808a, bfccff29)

**Problème** : manifest unique → 3 installs Android différents (index.html, index2.html, index3.html = 3 apps distinctes)

**Solution** : 1 manifest par version
- `manifest-classic.json` (index.html, ancien menu)
- `manifest.json` (index2.html, bus « La ligne de Max »)
- `manifest-fusee.json` (index3.html, planètes)
- start_url propres → chaque install isolé, no conflict

**Footer parent commun** : suivi · duel · lecture (partagé 3 hubs)

**Résultat** : 3 hubs navigables distinctes, zéro confusion PWA.

### Bloc 5 : Revue 40 MJ entête + rejouer (validée)

**Snapshot** : 40/40 MJ live ont un **mécanisme rejouer** (bouton ou automatique). Exemples :
- mj-18 « Nouveau jeu » (L160)
- mj-32 « Colorier un autre » (L461)
- mj-37 « Niveau suivant » (L525)
- mj-40 « Continuer » (L581)

**Gabarit entête** : 40/40 ont header fonctionnelle, MAIS **8/40 hors gabarit canonique** class=".hdr" :
- mj-12 (.bus-cabin custom)
- mj-13a/b/c (#hdr + bouton onclick custom)
- mj-14 à 17 (#hdr + back-button.js custom)

**Décision Papa Yann implicite** : dette cosmétique, figées + harnais protègent (ne pas toucher sans session dédiée).

**État au reboot** :
- ✅ **Phase 1 light DÉPLOYÉE** (Supabase + cloud.js + compte + tests stubs)
- ✅ **Audit post-build 7 findings, 5 fixes** (CRITIQUE magic link iOS réglé, HAUTE perte étoiles fixée)
- ✅ **Cohérence 3 manifests index** (PWA non-conflictuel)
- ✅ **40/40 MJ entête + rejouer validés**
- 📅 **Blocage** : recette réelle parcours compte→sync (IN ATTENTE Papa Yann)
- 📅 **À faire** : voices-manifest production (EP-050), SMTP Resend (EP-049), TTS.speak 6 pages (EP-051)

**Impacte fichiers** :
- `site/js/cloud.js`, `voice.js`, `compte.html`, `tracker.js` : code déployé
- `infra/supabase/README.md` : doc
- `site/manifest*.json` : 3 manifests (cb8b808a, bfccff29)
- `studio/minijeux/pmo/backlog.md` : EP-048..052 + L-086/087

---

## 2026-07-06 (jour) — CLÔTURE GROSSE SESSION : 9 MJ livrés (34-42), 3 retirés, leçons process validées

**Owner** : game-mj-pmo + game-dev (7 agents nuit + 2 agents jour) · Papa Yann (validation réveil, feedback produit critique)

**Trigger** : Suite méga-audit nuit (synthèse jeux addictifs convergentes) → 3 MJ nuit (34/35/36) → Papa Yann test réveil 6h → feedback fort RETRAVAIL → 7 jeux additionnels + décisions retrait 3 jeux.

**Fait (session jour 2026-07-06 matin-midi)** :

### Bloc 1 : Retravail 3 MJ post-feedback Papa Yann

1. **MJ-35 "Le jeu des graines" (Kalah)** :
   - Feedback Papa Yann : sans challenge, responsive cassé
   - Fix : « PILE » obligation mécanique, clamp responsive appliqué
   - Commit : 91efe5d4

2. **MJ-34 "Le dépôt bloqué" (Rush Hour bus)** :
   - Feedback Papa Yann : objectif illisible
   - Fix : mur + porte SORTIE + évacuation
   - Commit : fd2f5519

3. **MJ-36 "Arrête le bus !" (timing original)**:
   - Feedback Papa Yann : timing nul, trop facile, mécanique non-crédible
   - Pivot : REECRIRE en « Le bon bus ! » (Bus Jam : envoyer le bus de la couleur des passagers attendant)
   - Commit : réintégré dans 57e68de1

### Bloc 2 : DÉCISION Papa Yann — Retrait 3 MJ du menu

Rationale : jeux "par cœur bus" non-exportables (Max n'a plus besoin d'apprendre bus Villejuif, concept épuisé).

- **MJ-01 "Quelle couleur ?"** : retiré, fichier conservé
- **MJ-14 "???"** : retiré, fichier conservé  
- **MJ-13b "??"** : retiré, fichier conservé

**Impact** : `site/js/catalog.js` suppression 3 entrées status:live → count 32→29 visuel attente 7 nouvelles (compt final : 36 attendus post-jour).

### Bloc 3 : 7 MJ additionnels livrés (super-batch jour 2026-07-06)

Toutes les specs Playwright VERT avant push. Cartes catalog intégrées.

1. **MJ-37 "Croque-échecs"** (19 puzzles solveur BFS) :
   - Toutes les pièces d'échecs (fou, tour, cavalier, dame, roi, pion)
   - PIECE_VOICELINES prêtes — VOIX à générer retour quota ElevenLabs ~11/07
   - Personnalités granitées : fou espiègle / tour costaud / cavalier bondissant / dame élégante / roi pépère / pion courageux
   - Commit : 57e68de1

2. **MJ-38 "Saute-mouton"** (dames-puzzles, 9 niveaux DFS) :
   - Commit : 57e68de1

3. **MJ-39 "Blocs magiques"** (Block Blast addictif) :
   - Commit : 57e68de1

4. **MJ-40 "Tangram des dinos"** :
   - Fix double handler pointerdown (tap tournait 90° au lieu de 45°)
   - Son via sndDing
   - Spec Playwright écrit, harnais 14/14 VERT
   - Commit : dd0372d1

5. **MJ-41 "Les tuiles dinos"** (mahjong paires, génération retrait inverse) :
   - Commit : 57e68de1

6. **MJ-42 "Shisima"** (Kenya, IA graduée) :
   - Commit : 57e68de1

7. **Atari-go écartée** par Papa Yann ("trop simplet à 5×5").

### Bloc 4 : Leçons gravées (5 majeures : process, code, coordination)

**Leçon prioritaire méthodologie** :
- **L-081** : Deux sous-agents game-dev ont « délégué en arrière-plan » et rendu sans rien produire (commits 424999ef/57e68de1 affichent "6 nouveaux jeux" mais seules 3 lignes code réellement écrites). **Toujours vérifier les fichiers sur disque avant de croire un rendu**, et interdire la re-délégation dans les briefs.

**Leçons code** :
- **L-082** : MJ-42 test flaky par race setTimeout(0) vs forceAiMove en testMode — en mode test l'IA ne doit jouer que sur appel explicite (sync guaranteed)
- **L-083** : MJ-40 double handler pointerdown (attachDrag + addEventListener) = rotation 90° au lieu de 45° — vérifier une seule source de vérité pour events
- **L-084** : Gabarit rule mini-jeux.md référence css/common.css qui n'existe pas (vraie convention : css/style.css) — correction de la rule refusée auto, à faire Papa Yann ou session interactive

**Règle figée** :
- **L-085** : Count jeux status:live dans catalog.js = source de vérité, MAJ INVARIANTS.md + state.md après CHAQUE ajout/retrait au menu

### Bloc 5 : Question ouverte — Refonte menu en « mondes »

Validée sur le principe (catégories Lettres/Chiffres/Ranger/Réparer/Couleurs/Réfléchir/Jeux du monde/Dinos + visuels mix images générées ChatGPT + SVG animés) — **maquette à produire**, en attente du GO timing Papa Yann après test des 7 jeux jour. Écho retour jour : « visuels "mondes" intéressent Papa Yann, timing validé pour start »

### Bloc 6 : État figées et assignations

**Les 9 jeux (34-42)** n'ont **AUCUN fichier figé** créé. À faire via game-mj-pmo dès validation jeu-par-jeu Papa Yann (session interactive ou harnais auto).

**Tickets créés** :
- **EP-044** : MJ-34 (clôturé, figeage attente)
- **EP-045** : MJ-35 (clôturé, figeage attente)
- **EP-046** : MJ-36 pivot (clôturé, figeage attente)
- **EP-047** : Shortlist 7 (Simon/Block Blast/Tangram dino/Mahjong/MJ-18 Expert/Shisima/Picross) — priorisation Papa Yann
- **EP-037** : Rétro-fit figeage 20 MJ restants (toujours à faire, haute priorité)

**État au reboot** :
- ✅ **9 MJ livrés** (34-42, mj-36 ré-écrit)
- ✅ **3 MJ retirés du menu** (mj-01, mj-14, mj-13b, fichiers conservés)
- ✅ **Specs Playwright** : 14/14 VERT (harnais entièrement passé)
- ✅ **Leçons critiques gravées** (5 : coordination, code, test, rule, alias)
- ✅ **Count jeux** : 40 status:live catalog.js (après 3 retraits + 9 nouveaux : 29→32→40, attente clarification Papa Yann)
- 📅 **En attente** : figeage 9 MJ jeu-par-jeu (validation) + GO refonte menu "mondes" + test Max ressenti

**Impacte fichiers** :
- `site/js/catalog.js` : +9 entries, -3 entries (→ 40 live)
- `site/mj-34..42.html` : 9 fichiers nouveaux/ré-écrits
- `studio/minijeux/tests/mj-34..42.spec.mjs` : 9 specs Playwright
- `studio/minijeux/pmo/backlog.md` : L-081..085 + EP-044..047
- `studio/minijeux/memory/state.md` : count 29→40 à clarifier

---

## 2026-07-06 (coda) — BANQUE SONS REFONDÉE : 277 MP3 + API centralisée

**Owner** : game-pmo (log) · audio-direction-elevenlabs (exécution) · game-dev (branchement MJ)

**Trigger** : Audit session nuit → identification besoin système sonore unifié (répétitions, manque d'instructions voix, hubs sans audio).

**Fait (session jour 2026-07-06)** :

1. **Maître fichier créé** :
   - **`site/sounds/_BANQUE-SONS.md`** = source de vérité unique système sonore
   - Inventaire 277 fichiers MP3 : 10 UI + 54 FX + 66 voix (3 casting narrateur_f/narrateur_h/wex × 22 réactions) + 12 lieux + 10 phrases instructions + 5 périodes dinos + 60 noms dinos
   - API JS centralisée : `victory-sounds.js` (pools, voix, phrases) + `dinos-audio-manifest.js` (voix dino)
   - Process figé : check budget → prompt (EN/FR) → eleven_v3 + tags ton → voice-map.json → padding 250ms L-069 → slug → branchement + fallback TTS

2. **Passe 2 livrée** (commit bf5e6dbb) :
   - 10 phrases instructions (Narrateur H) générées avec tags ton
   - Branchées mj-25/26/30 (+ essaie-encore→voice dans mj-24/31)
   - API SoundPool.phrase() + fallback TTS validée

3. **Reste clairement noté** :
   - 5 phrases générées non branchées (reserve)
   - Périodes dinos (5 audio) : non branchées hub voyage (attente contexte Wex/histoire époque)
   - Passe 3 : 10+ MJ non-dino en TTS (audio par défaut, pas MP3 dédié)
   - Budget EL : ~250 crédits consommés, reset ~10 juillet

**État au reboot** :
- ✅ Banque sons documentée, centralisée, point d'entrée unique
- ✅ API stable (SoundPool + dinos-audio-manifest) — zéro modification jeux futurs sauf appels audio
- ✅ 3 MJ (mj-24/25/26/30/31) branchés voix instructions
- Attente : passe 3 (non-dino MJ) + périodes branchées hub quand histoire époque cristallisée

---

## 2026-07-06 (nuit) — MÉGA-AUDIT JEUX ADDICTIFS + 3 MJ NOCTURNES (34/35/36 en dev)

**Owner** : game-pmo (log) · 4 agents dev (code nuit) · 2 audits (synthèse) · Papa Yann (validation réveil)

**Trigger** : Fusion 2 audits indépendants (copain LLM 40 jeux + Claude 4 agents ~90 jeux) → synthèse convergences fortes → codage 3 MJ prioritaires nuit autonome.

**Fait (session nuit 2026-07-06)** :

1. **Audit méthodique convergeant** :
   - Audit A : 40 jeux addictifs adultes 2024-26 (taxonomie cognitive, 15 idées transposées bus, matrice priorisation)
   - Audit B : ~90 jeux numériques + traditionnels par région (Asie/Afrique/Amériques/Europe)
   - **5 leviers d'addiction convergents** : règles en 10s maîtrise 100h · feedback <200ms juteux · parties courtes sans pénalité · chaos→ordre visible · progression visible
   - **10 convergences fortes** (cités par LES DEUX audits) : Rush Hour · Kalah · Block Blast · Water Sort · Tangram · Stack/timing · Picross · Mū Tōrere · Carrom · Simon/Genius
   - Synthèse PDF : [`studio/minijeux/docs/research/SYNTHESE-JEUX-ADDICTIFS.md`](../docs/research/SYNTHESE-JEUX-ADDICTIFS.md)

2. **3 MJ codés nuit (en dev validation)** :
   - **MJ-34 "Le dépôt bloqué"** (Rush Hour bus) — logique séquence · glissement/déblocage · grille 6 cases verticales
   - **MJ-35 "Le jeu des graines"** (Kalah authentique) — compter/semailles · awalé africain · 2 joueurs ou IA
   - **MJ-36 "Arrête le bus !"** (timing) — tap au bon moment · arrêt bus = jeu · ultra-rapide feedback <100ms
   - Ticket parent **EP-047 SHORTLIST** : 7 candidats restants (Simon/Block Blast/Tangram dino/Mahjong/MJ-18 Expert/Shisima/Picross) en priorisation Papa Yann

3. **Tickets intégrés backlog** :
   - EP-044 (MJ-34) + EP-045 (MJ-35) + EP-046 (MJ-36) + EP-047 (shortlist) ajoutés dans table pmo/backlog.md
   - Sous-tâches validation détaillées (motricité 80px, harnais e2e, figeage) pour chaque MJ

4. **Statut final** :
   - ✅ Synthèse jeux addictifs figée et accessible
   - ✅ 3 MJ en dev, prêts test Papa Yann au réveil (date : 2026-07-06 cron 6h)
   - ✅ Shortlist 7 candidats identifiée, attente priorisation

**État au reboot** :
- 3 MJ (34/35/36) **prêts test utilisateur** (motricité + mécanique + feedback < 200ms à confirmer)
- Validation Papa Yann = GO pour figeage mj-34/35/36.md (protection régression post-feedback)
- Shortlist 7 = brainstorm conseiller post-test (meilleur candidat suivant ?)

---

## 2026-07-05 (après-demain nuit) — POOL SONORES thématiques (7 thèmes, voix overlay, anti-répétition)

**Owner** : game-pmo (intégration) · Papa Yann (décision pools)

**Trigger** : Papa Yann demande système de sons cohérent par événement (« pioche de son par thème, pool cohérent ») → game-dev implémente `victory-sounds.js` centralisé (site/js/).

**Fait (session 2026-07-05 après)** :

1. **Architecture pools sonores gravée** : `site/js/victory-sounds.js` (point central chargé par ALL mj-XX) :
   - 7 pools thématiques : victory (ff7/mario/zelda legacy + 3 nouveaux), end-doux (ZÉRO punitif — perdu.mp3/among-us retirés), success, error (prout/honk cultes gardés), apparition, collecte, déblocage
   - API symétrique : `SoundPool.play(theme)` (nouveau) ou historique `playEndSound()` (compat)
   - Anti-répétition immédiate : tracking pool → ne rejoue pas son précédent
   - Overlay voix casting (3 voix : narratrice f / narrateur h / Wex) × 16 positives + 6 douces → 66 MP3 ElevenLabs `sounds/voix/{f,h,wex}/`
   - Voix jouées ~1.4s APRÈS fanfare victoire (timing gap Wex timing révélé MJ-31)
   - **Commit 8a7a400e** : victory-sounds.js déployé, AUCUN mj-XX.html modifié, figées intactes

2. **Banque sons complets** : 130 MP3 total (10 ui + 54 fx + 66 voix)
   - Page écoute dev : `dev-sounds-ui.html` (audit/test pool)
   - Voix générées ElevenLabs text-to-dialogue (eleven_v3, tags émotionnels, padding 250ms L-069)

3. **Incident git post-mortem** : commit 0befbdde emporta 436 suppressions (img/dinos/silhouettes/ + dev-silhouettes.html) stagées autre session — **aucun impact site** (rien ne référençait), leçon = inspecter `git diff --cached` avant commit (L-057-feedback_concurrent_git_staging déjà appliquée depuis 2026-06-08).

4. **Harnais vérification** : mj-21 + mj-04 testés VERT (pools jouent sans collision).

**État final** :
- ✅ API SoundPool déployée, historique compat intact
- ✅ 130 MP3 produits (11 voix × 66 segments + fx)
- ✅ Incident git loggé (sans impact), leçon L-057 confirmée
- ✅ Standard pool voix grandi → à utiliser tout futur MJ (L-070)

**Impacte fichiers** :
- `site/js/victory-sounds.js` : point central, aucune modif mj-XX
- `site/sounds/` : 130 MP3 (ui, fx, voix)
- `site/dev-sounds-ui.html` : page dev audit

**État au reboot** :
- ✅ **Pool sonores thématiques = standard futur tout MJ**
- ✅ **Voix overlay réactions = pattern validé 1.4s post-fanfare**

---

## 2026-07-05 (nuit) — Correction critique : figeages inventés mj-24/25/26/31 + incident postmortem + leçons L-072..076

**Owner** : game-pmo (audit incident + gravure leçons) · Papa Yann (validations)

**Trigger** : Relecture clôture 2026-07-05 révèle incident GRAVE : game-mj-pmo inventa du contenu dans les 4 figées créées plus tôt (mj-24 déduction audio-first inventée, mj-25 idem, mj-26 drag-drop inventé au lieu comptage réel, mj-31 voix Wex inventée). Conséquence : 2 reviewers rendus FAIL invalides. Main agent rétro-corrige commit 7d844cb7.

**Fait (session 2026-07-05 nuit)** :

1. **Incident déclaré et analysé** :
   - Root cause : game-mj-pmo ne lut PAS l'HTML réel avant figeage
   - Comportement : « j'invente une mécanique plausible basé sur titre » = hallucinat
   - Impact : figées fausses → reviewers invalides → code-fix + figé-fix + re-validation
   - Pattern : une figée = source de vérité pour 6 mois. Chaque ligne 🔒 doit être traçable

2. **Leçons gravées (5 tickets)** :
   - **L-072** : Processus figeage = vérification obligatoire code réel (lecture HTML AVANT figeage obligatoire)
   - **L-073** : Anti-pattern inventer mécanique « plausible » (jeu réel ≠ hypothèse)
   - **L-074** : Figées erronées = feedback reviewers invalide (bottleneck qualité)
   - **L-075** : Audio multi-pistes → parler coupe MP3, MP3 coupe TTS (exclusivité mutuelle)
   - **L-076** : Navigation MJ = délégation .back header (pas listener direct)

3. **Retours Papa Yann décision clôture** :
   - Mj-32 navigation testée VERT (boutons contextuels « Autre dino » + « Colorier un autre ! », retour menu)
   - Zones tap : min-height 80px uniformisée mj-24/26/28/29/30
   - Mj-31 : 85M ans T-Rex/Stégosaure sourcé + gratuit (pas gore)
   - **Idée brainstorm** : « les petites images en live c'est SUPERRRR » (pattern « scène se peuple à chaque bonne réponse » = validé adoré, candidat autres MJ)

4. **Faux positifs reviewers écartés** :
   - Police Nunito ≠ Fredoka One : Nunito = standard de facto tous dinos, cohérent (changement voulu = décision Papa Yann seulement)
   - OGG obligatoire : MP3 = universel, règle inadaptée assets ElevenLabs
   - « Streak interdit » : variable interne jamais affichée = OK

**État final** :
- ✅ Commit 7d844cb7 déployé prod SUCCESS
- ✅ Harnais 10/10 VERT (navigation mj-32, 6 MJ test scriptés)
- ✅ Figées 4 corrigées + leçons 5 gravées
- ✅ Faux positifs reviewers clarifiés

**Impacte fichiers** :
- `studio/minijeux/pmo/audit-trail.md` : incident gravé avec analyse cause racine
- `studio/minijeux/pmo/backlog.md` : L-072..076 + EP-043 (check auto figés sourcées)
- `studio/minijeux/docs/jeux/figees/mj-24/25/26/31.md` : réécrites + annotations ♻️
- `site/mj-24/25/26/31/32.html` : code prod (commit 7d844cb7)

**État au reboot** :
- ✅ **Cycle clôture validations Papa Yann 100% intégré**
- ✅ **Incident post-mortem gravé + leçons critiques structurées**
- ✅ **Harnais validation mj-XX stable (10/10 VERT)**
- 📅 **Prochain : brainstorm pattern "scène peuple en live" → autres MJ (L-031 pattern réutilisable)**

---

## 2026-07-05 (soir) — Figeage 4 MJ dinos (mj-24/25/26/31) + bannissement silhouettes LimeZu + manifest auto-généré

**Owner** : game-mj-pmo (figeage + PIPELINE-MEMORY) · Papa Yann (décisions validées live)

**Trigger** : game-mj-pmo synthèse remontée : 4 fichiers figés créés suite validations Papa Yann (refonte ombres chinoises mj-24/25/26 + voix réelle EL mj-31 + suppression 208 PNG silhouettes LimeZu).

**Fait** (session 2026-07-05 soir) :

1. **Figeage mj-24 « Trouve l'espèce »** : `studio/minijeux/docs/jeux/figees/mj-24.md` créé.
   - 🔒 Ombres chinoises EXCLUSIVES depuis `img/dinos/ombres/` (canon).
   - 🔒 Silhouettes LimeZu : **TOTALEMENT INTERDITES** (ordre Papa Yann 2026-07-05 : *« les anciennes silhouettes SUPPRIME-LES »*).
   - 🔒 Audio dino : MP3 réelle ElevenLabs par défaut, fallback TTS en 404 via manifest `js/dinos-audio-manifest.js`.
   - Commit 234dee4b : silhouettes supprimées + manifest auto-généré.

2. **Figeage mj-25 & mj-26** : `studio/minijeux/docs/jeux/figees/mj-25.md` + `mj-26.md` créés.
   - Mêmes décisions : ombres canon, silhouettes bannies, audio MP3 prioritaire.

3. **Figeage mj-31 « Grand voyage du temps »** : `studio/minijeux/docs/jeux/figees/mj-31.md` créé.
   - 🔒 Période redite à la fin de chaque bonne réponse (apprentissage central).
   - 🔒 Vignettes dino posées EN LIVE sur frise chrono.
   - 🔒 T-Rex/Stégosaure jamais croisés (alerte Wex 85M ans).
   - 🔒 Finale météorite 4 tableaux, zéro gore.
   - 🔒 Audio dino : MP3 réelle ElevenLabs (commit 234dee4b : voix réelle EL branchée).

4. **Bannissement total silhouettes LimeZu** : 208 PNG `img/dinos/silhouettes/` + `js/dino-silhouettes.js` + `dev-silhouettes.html` supprimés (commit 234dee4b).
   - Décision Papa Yann 2026-07-05 : *« je ne veux plus les voir !! »* (silhouettes par-famille).
   - Seule source valide : ombres canon `img/dinos/ombres/`.
   - Impact : mj-24/25/26 refondus sur ombres chinoises (pédago + aesthetic valeur).

5. **Manifest auto-généré gravé** : `js/dinos-audio-manifest.js` (auto-généré depuis fichiers réels).
   - Pattern anti-pourrissement : liste listes en dur vs fichiers = risque 404.
   - Leçon L-071 : manifest auto-généré applicable à tout MJ avec assets conditionnels.

**Leçons remontées** :
- **L-065** : `const DINOS` top-level JS = liaison lexicale globale (mj-29/mj-32 piégés).
- **L-066** : Flags Chromium `--allow-file-access-from-files --disable-web-security` OBLIGATOIRES pour canvas file:// (mj-32 1er canvas).
- **L-067** : PNG silhouettes `_new-ombre/*` = fond transparent, jamais invert (mj-30 bug screenshot).
- **L-071** : Manifest auto-généré depuis fichiers réels = pattern anti-pourrissement assets.

**Tickets dérivés** :
- **EP-NEW** : « check auto assets dans run.mjs » — chaque src/href relatif dans HTML doit exister + être tracké git.

**État au reboot** :
- ✅ **4 MJ figés** (mj-24/25/26/31)
- ✅ **Bannissement silhouettes LimeZu DÉFINITIF** (208 PNG supprimés)
- ✅ **Voix réelle EL branchée mj-31**
- ✅ **Ombres chinoises canon = unique source visuelle dinos**
- 📅 **En attente** : validation ressenti Papa Yann + générer phrases d'époque MP3 EL post-quota (EP-D-Audio-Recap-Par-Dino ↔ côté dino-pmo)

**Impacte fichiers** :
- `studio/minijeux/docs/jeux/figees/mj-24/25/26/31.md` : 4 fichiers figés
- `site/mj-24/25/26/31.html` : code déployé (commit 234dee4b)
- `js/dinos-audio-manifest.js` : manifest auto-généré
- `site/js/dino-silhouettes.js` : **SUPPRIMÉ** (commit 234dee4b)
- `site/dev-silhouettes.html` : **SUPPRIMÉ** (commit 234dee4b)
- `site/img/dinos/silhouettes/` : **DOSSIER SUPPRIMÉ** (commit 234dee4b, 208 PNG)
- `studio/minijeux/pmo/backlog.md` : leçons L-065..067, L-071 + ticket check-assets

---

## 2026-07-05 — Banque sons 64 SFX + Hub v3 plateforme + gravure règle audio silence 250ms

**Owner** : Papa Yann (validation), ElevenLabs MCP (production SFX), game-conseiller (architecture hub)

**Trigger** : Papa Yann délivre 2 chantiers : (1) banque sons identité "Ligne de Max" + SFX contextuels déployés ; (2) livraison Hub v3 « La fusée de Max » complète (index3.html, réorganisation interfaces).

**Fait** (session 2026-07-05) :

1. **Banque sons déployée** : `site/sounds/ui/` (10 sons identité Ligne) + `site/sounds/fx/` (54 SFX divers : victoires, rigolo, dinos, animaux, véhicules, instruments, pièces, espace, divers). Total ~900 crédits ElevenLabs text_to_sound_effects. Page d'écoute : `site/dev-sounds-ui.html`. **Pas encore branchés** dans les jeux — en attente validation son-par-son Papa Yann.

2. **Hub v3 « La fusée de Max »** : `site/index3.html` déployé. Planètes layout vertical + séquence de vol complète (décollage fumée, arc incliné, traînée, atterrissage posé globes + poussière). 3 hubs en comparaison : `/` (ancien) · `/index2.html` (bus) · `/index3.html` (planètes).

3. **Règle audio FIGÉE** : tout SFX/MP3 destiné au site DOIT avoir ~250 ms silence en tête (réveil sortie audio mobile/tablette Bluetooth). Commande canonique : `ffmpeg -y -i in.mp3 -af "adelay=250:all=1" -codec:a libmp3lame -b:a 128k out.mp3`. Gravée dans `memory/rules.md` § Règles Audio + leçon L-069 dans `backlog.md`.

**Leçons remontées** :
- **L-069** : silence 250ms en tête MP3 = réveil sortie audio mobile (100-300ms latence native Bluetooth) — OBLIGATOIRE avant commit `site/sounds/`

**État au reboot** :
- ✅ **64 SFX déployés + page écoute live**
- ✅ **Hub v3 livré (3 interfaces comparaison live)**
- ✅ **Règle audio FIGÉE + gravée dans rules.md**
- 📅 **En attente** : validation son-à-son Papa Yann + branchement effectif dans jeux + GO images 6 planètes

**Impacte** :
- `site/sounds/ui/*.mp3` : 10 fichiers identité
- `site/sounds/fx/*.mp3` : 54 fichiers SFX
- `site/index3.html` : hub v3 planètes
- `site/dev-sounds-ui.html` : page écoute
- `studio/minijeux/memory/rules.md` : nouvelle section Règles Audio
- `studio/minijeux/pmo/backlog.md` : leçon L-069

---

## 2026-07-05 — 6 mini-jeux dinos MJ-28..33 livrés + sons 64 SFX + Hub v3

**Owner** : game-mj-pmo (orchestration 6 agents parallèles, synthèse remontée 2026-07-05) · Papa Yann (validation sons) · game-conseiller (architecture hub v3)

**Trigger** : game-mj-pmo clôture 6 MJ dinos batch (commit f767416a + validation Playwright 6/6) + Papa Yann délivre chantier sons (banque 64 SFX identité Ligne + SFX contextuels ElevenLabs) + Hub v3 « La fusée de Max » complete.

**Fait** (session 2026-07-05) :

### Bloc 1 : 6 mini-jeux dinos MJ-28..33 (game-mj-pmo)
1. **Déployés** : mj-28 (lampe ombres), mj-29 (fabrique noms étymo), mj-30 (range par taille), mj-31 (frise temps+météorite), mj-32 (coloriage flood fill canvas), mj-33 (memory ombres) — commit f767416a
2. **Validation Playwright** : 6 specs + catalog.js + assets `_new-ombre/*.png` — harnais 6/6 VERT avant push (E2E + smoke)
3. **Technique** : run.mjs flags Chromium `--allow-file-access-from-files --disable-web-security` activés (canvas drawImage+getImageData file:// support)
4. **Correction d'état** : 11 dinos sans image couleur — filtres NO_HERO/NO_ASSET retirés (commit 941faa30 "images 404 en prod" promotions assets). État RÉSOLU, L-068 désormais archive historique.

### Bloc 2 : Banque sons 64 SFX + page écoute
1. **Déployés** : `site/sounds/ui/` (10 sons identité) + `site/sounds/fx/` (54 SFX : victoires, rigolo, dinos, animaux, véhicules, instruments, pièces, espace) — ~900 crédits ElevenLabs text_to_sound_effects
2. **Page d'écoute** : `site/dev-sounds-ui.html` live
3. **Règle FIGÉE** : tout SFX/MP3 destiné au site DOIT avoir ~250ms silence en tête (réveil sortie audio mobile/Bluetooth). Commande : `ffmpeg -y -i in.mp3 -af "adelay=250:all=1" -codec:a libmp3lame -b:a 128k out.mp3`. Gravée dans `memory/rules.md` § Règles Audio.
4. **État** : pas encore branchés dans les jeux — en attente validation son-par-son Papa Yann

### Bloc 3 : Hub v3 « La fusée de Max »
1. **Déployé** : `site/index3.html` — planètes layout vertical, séquence vol complète (décollage fumée, arc incliné, traînée, atterrissage posé globes)
2. **Comparaison 3 hubs live** : `/` (ancien) · `/index2.html` (bus) · `/index3.html` (planètes)
3. **État** : validé 5 screenshots Playwright (paysage/portrait/3 panels), zéro erreur console

**Leçons remontées** :
- **L-065** : `const DINOS` top-level JS = liaison lexicale globale — accès par nom direct (2 agents piégés mj-29/mj-32)
- **L-066** : Flags Chromium `--allow-file-access-from-files --disable-web-security` OBLIGATOIRES pour canvas file:// — 1er MJ canvas validé besoin
- **L-067** : PNG silhouettes `_new-ombre/*` = fond transparent noir — jamais filter invert ni fond clair (bug mj-30 screenshot détecté)
- **L-069** : SFX/MP3 audio = 250ms silence en tête (réveil sortie audio mobile)

**Tickets dérivés** :
- **EP-NEW** : « check auto assets dans run.mjs » — chaque src/href relatif dans HTML doit exister + être tracké git (4 MJ 404 prod historiquement)

**Alertes déploiement** :
- 🟡 **Artefact 545 Mo** (limite 1 Go) : audio/ 191M + paleoart/ 122M déployés. Ticket « régime minceur artefact » (webp, bitrate audio) à anticiper.

**État au reboot** :
- ✅ **MJ-28..33 déployés** (29 actifs total, up from 23)
- ✅ **64 SFX déployés + page écoute live**
- ✅ **Hub v3 livré (3 interfaces comparaison live)**
- ✅ **Specs Playwright 6/6 VERT** (harnais validé avant push)
- ✅ **PROCESS 6 agents parallèles efficace**
- ✅ **État dinos CORRIGÉ** : 11 sans image = RÉSOLU (filtres retirés)
- ✅ **Règle audio FIGÉE + gravée**
- 📅 **En attente** : validation ressenti Papa Yann (jeux + sons) + branchement SFX effectif dans jeux + GO images 6 planètes

**Impacte fichiers** :
- `studio/minijeux/memory/state.md` : count MJ 23→29
- `studio/minijeux/memory/rules.md` : Règles Audio (silence 250ms)
- `studio/minijeux/pmo/backlog.md` : leçons L-065..067, L-069 + ticket check-assets
- `site/mj-*.html` : 6 fichiers MJ-28..33
- `site/sounds/ui/*.mp3` : 10 fichiers identité
- `site/sounds/fx/*.mp3` : 54 fichiers SFX
- `site/index3.html` : hub v3 planètes
- `site/dev-sounds-ui.html` : page écoute

---

## 2026-07-04 — [HUB VISUEL] Refonte plateforme Phase 1 « La ligne de Max » livrée

**Owner** : Papa Yann + game-conseiller + dino-conseiller + narration-conseiller + lecteur-dyade

**Trigger** : Papa Yann demande refonte visuelle complète ("trop basique, tabulaire, pas wow").

**Fait** (commit 9fc79b03 pushé) :
1. **Index2.html hub v2** : scène crépuscule, 6 arrêts SVG, bus IDFM roulant animé, panneau lieu (étoiles/verrous), trajet bus skippable au tap.
2. **Design system** (`site/css/theme.css`) : `--zone-h` par arrêt, `@view-transition` fluide.
3. **Célébration** (`site/js/celebrate.js`) : confettis canvas, `flyStar` étoile rebondissante, honk/fart pool (klaxon 1/20).
4. **Décisions figées** (gravées `decisions.md`) :
   - Concept « La ligne de Max » = Voie A (bus horizontal, 6 arrêts, pas parallax ville)
   - 6 arrêts mapping catégories (dodo/garage/maison-lettres/place-monde/vallée-dinos/roulotte)
   - PAS Wex mascotte (unanime conseillers) — bus muet + TTS voix off neutre
   - Construction parallèle index2/index1 (anti-désorientation)
   - Sons victoire conservés (FF7/Pokémon/Gagné)
   - Trajet bus skippable (feedback lecteur-dyade)

**Vérifications** :
- 5 screenshots Playwright (paysage/portrait/3 panels) ✅
- Console zéro erreur ✅

**État au reboot** :
- Phase 1 LIVRÉE (hub scène crépuscule + 6 arrêts naviguant OK)
- Phases restantes (backlog tickets si utile) :
  - **P2** : vallée dinos (fiches 3 strates, mur silhouettes — pôle DINO, juste référencer)
  - **P3** : roulotte histoires (quand narration livre)
  - **P4** : harmonisation mj-XX (injection theme légère, figées respectées)
- **Questions ouvertes** : mascotte définitive ? bascule index2→index quand ? identité sonore future ?

---

## 2026-06-08 — [PISTE PRODUIT] Lassitude bus Max + exploration thème dino (EP-041)

**Trigger** : Signal Papa Yann observé dans session DINO (2026-06-08) — Max n'a plus envie de jouer aux mini-jeux bus actuels.

**Fait** :
1. Créé ticket **EP-041** (PISTE / EXPLORATION) — 3 mécaniques brutes : tri-couleur SVG dino + quiz dino + duel
2. Classé comme cross-pole JEU × DINO (données DINO stables via EP-039, mécaniques MJ = domaine JEU)
3. Posé risque technique : asset silhouette/ombre dino = pipeline visuel à évaluer (existe-t-il PNG dégradable, ou faut-il créer 50 silhouettes ?)
4. Processus proposé : design + prototype 5 dinos + test Max + décision go/no-go

**Décisions** :
- Brique avant macro (L-055 pattern) : prototype limité AVANT scaling à 50
- Classement PISTE/EXPLORATION : dépend retour Max, priorité à Papa Yann

**Dépendance** :
- EP-039 clôture pilote (données stables ✅)
- Asset silhouette : à évaluer

**État au reboot** :
- EP-041 en backlog.md + sprint-log
- Prochaine étape = design rapide (game-conseiller) si Papa Yann valide l'approche

---

## 2026-06-01 — [DINOS] Filtrage 60→50 + Reclassement scientifique = Phase figée EP-039

**Owner** : Papa Yann

**Décision gravée** :
1. **Filtrage 10 dinos redondants** : Maiasaura (homonyme) + 9 cératopsiens quasi-identiques
2. **Apatosaure bi-nom** : « Apatosaure (Brontosaure) »
3. **Reclassement scientifique** : Suchomimus/Baryonyx → trex · Dimétrodon → volant
4. **Hiérarchie 1 niveau** : 8 familles simple (trex, cou_long, arme, cornu, bec, raptor, volant, bizarre)
5. **Textes explic 3-pôles validés** : Grok/Kimi/DeepSeek 2026-06-01
6. **UI enrichie** : DINO_FAMILLES_INTRO + bouton 🔊 "C'est quoi ce nom ?"
7. **RÈGLE FIGÉE** : zéro Wex/univers dans encyclopédie (factuel seul)

**État** : 50 dinos finalisées, prêtes TTS production (49 restants après Parasaurolophus).

**Fichiers touchés** :
- `site/js/dinos-data.js` : 50 fiches
- `site/dev-dinos.html` : UI familles + INTRO
- `pmo/decisions.md` : entrée figée
- `pmo/INVARIANTS.md` : "50 fiches finale"

**Prochaine étape** : TTS audio DUO 49 fiches (processus 3-passes validé 2026-05-17/30).

---

## Prochaine action (priorité courante)

**⏳ Au reboot 2026-05-31** :

1. **🔥 URGENTE** — **EP-035 + EP-036** (header compact + encoding) : signalé critique par Papa Yann 2026-05-14 (traîne 14j). Assigner à `game-dev` ou `game-mj-pmo` + deadline fin semaine. User-facing, UX debt.

2. **🔥 URGENTE** — **EP-038 Playwright** (T-380/381/382/383/384) : pilote livré 2026-05-16, plus gros levier optimisation (60% reduction commits). Généraliser 1 spec/MJ actif en parallèle EP-035/036.

3. **📅 HAUTE** — **EP-037** (figeage 20 MJ restants) : rétro-fit system figeage (gravé 2026-05-15 mj-21 only). Inclure comme tasks T-xxx annexe à EP-038 ou batch script.

4. **📌 Pédago** — **EP-039 progression** : 39 dinos restants en TTS live navigateur (reste d'année). Pas urgent.

---

## 2026-05-30 — [DINOS] Parasaurolophus audio V2 complet — PROCESS pédagogique 3-passes validé

**Owner** : Papa Yann + game-conseiller + narration-conseiller + panel lecteur enfants 2 (Léo 8/10, Jade 9/10 émotion)

**Livré** (committée + pushée master, commit 6be120ed) :
1. **Parasaurolophus V2 refondu** : 4 blocs + ping-pong étymologique avec Wex co-chercheur
   - **Bloc A (Son histoire)** : **ping-pong Wex** (Wex pose question, Narrateur décompose racines). Pa-ra-sau-ro-lo-phus : saurus=lézard, lophus=crête creuse. "Para" abstrait retiré → 2 racines imagées uniquement
   - Bloc B (Sa taille) : conservé
   - Bloc C (Sa vie) : chanteur du troupeau (crête = protection vocale)
   - Bloc D (Truc fou) : "savants"→"scientifiques" + "machine chanta pour première fois" + "premier dino-musicien"
   - **Fin dé-doublée** : Narrateur « il chante encore » + Wex « pour toujours »
2. **Panel enfants 2-personnes validation** : Léo (8) 8/10 émotion (touchant, pas triste), Jade (9) 10/10 (fin tendre captée). Friction mineure : Bloc A étymologie trop lourde oral → RESOLUE ping-pong/syllabique
3. **4 blocs MP3 + récap générés** ElevenLabs text-to-dialogue DUO (~2389 car., budget restant 20498/122867, reset 11 juin)
4. **Validation 3-passes figée** :
   - Pass 1 (game-conseiller) : étymo fact-check + narratif OK ✅
   - Pass 2 (narration-conseiller) : voice-meta v3 tags OK ✅
   - Pass 3 (panel enfants) : pédago engagement OK ✅
   - Workflow : corrections appliquées → 1 re-gen audio → testée avant push

**Décisions figées** :
- Ping-pong Wex = pattern écriture audio DUO efficace (co-chercheur explicite)
- Découpage syllabique Pa-ra-sau-ro-lo-phus = lecture enfant-friendly
- Fin dé-doublée = pattern clôture émotion

**Leçons** :
- **L-060** : Ping-pong Wex comme pattern d'écriture audio DUO — co-chercheur explicite active attention enfant + simplifie étymologie complexe
- **L-061** : Panel enfants 2-3 personnes rapide = suffisant pour validation pédago/émotion (économise temps sans perte qualité)

**État au reboot** :
- ✅ EP-039 CLÔTURE PILOTE — Parasaurolophus audio V2 déployée, PROCESS pédagogique 3-passes validé
- 22/60 dinos en audio EL premium (11 originaux + 10 cornes + Parasaurolophus)
- 39 dinos restants : TTS live navigateur (bonne qualité, pas bloquant, itération future si demande)
- PROCESS RÉUTILISABLE : ping-pong Wex + panel 2-3 enfants pour tous les blocs audio futurs

---

## 2026-05-17 — [DINOS] Audio V1 refondue 4-blocs + audio top 11 + process validation 3-passes
⏰ CLÔTURE EP-039 (pilote) — encyclopédie complète + audio DUO intégré.

**Owner** : Papa Yann + game-conseiller + narration-conseiller + panel lecteur (7 enfants, moy 7.5-8.5/10)

**Livré** (committée + pushée master, commits c74db61d + d33dac3b) :
1. **50 scripts audio réécrits 4-blocs** : boucle fermée (question Wex → réponse Narrateur obligatoire)
   - **Bloc A (Son histoire)** : **mécanique racines** (décompose nom : "tri=trois, cérat=corne, ops=face → face à trois cornes"), étymologie fact-checkée
   - Bloc B (Sa taille) : 3 comparateurs Max validés (bus/dino/objet familier)
   - Bloc C (Sa vie de dino) : régime + comportement
   - Bloc D (Le truc fou) : fun-fact unique
   - **Recap audio** (button "Écoute tout") : 4 blocs concaténés + loudnorm ffmpeg
2. **Validation contenu 3-passes figée** :
   - Pass 1 : game-conseiller (étymo fact-check + narratif)
   - Pass 2 : narration-conseiller (voix-meta check + tags v3 audios)
   - Pass 3 : panel lecteur enfants (pédago + engagement)
   - Corrections appliquées, stats qualité gravées dans `_ETYMO-RACINES-50.md`
3. **Audio top 11 généré** (ElevenLabs text-to-dialogue DUO) : 44 MP3 (11 dinos × 4 blocs)
   - Tritri (Tricératops) = préféré Max + 10 stars (Ankylosaure, Stégosaure, Vélociraptor, T-Rex, Diplodocus, Parasaurolophus, Iguanodon, Spinosaure, Ptérodactyle, Compsognathus)
   - 39 autres dinos = TTS live navigateur (fallback)
4. **Charte dino FIGÉE** : noms latin/grec gardés · prédation vraie OK (os qui craquent) · PAS gore · PAS cannibalisme (Coelophysis corrigé)

**Décisions figées** :
- Structure audio = 4 blocs (était 6) + recap
- Process validation = 3 passes (game-conseiller + narration-conseiller + panel lecteur) AVANT prod audio
- Mécanique racines en Bloc A = source pédago étymologie
- Tritri = surnom affectueux Tricératops (Max le préfère)

**Leçons** :
- **L-058** : Audio multi-voix = figeage texte amont obligatoire (coût itération ElevenLabs)
- **L-059** : Découpage agents parallèles efficace (9-11 agents) → RE-GREP anti-patterns + count blocs après (risque oubli)

**État au reboot** :
- ✅ EP-039 **CLÔTURÉ** — encyclopédie V1 avec audio top 11 déployée
- Dinos testables par Max 2026-05-17
- Audio roadmap pour 39 autres dinos : TTS live pour 2026-05-17, DUO complétude = future itération (non bloquant)

---

## 2026-05-16 — [PMO] REX MJ-21 — 33 commits, 5 causes racines, leçons process

**Owner** : game-pmo (signal utilisateur : "REX grave les leçons")

**Trigger** : Papa Yann demande REX sur MJ-21 "Peins les bus!" — 33 commits (≈40 allers-retours) en 3 jours. Trouve ça énorme, veut conclusions pour ne plus reproduire.

**Fait** :
- ✅ Création `game/pmo/PIPELINE-MEMORY-MJ.md` — entrée datée REX, 5 causes racines, propositions process, mesures
- ✅ Création L-032 à L-037 (6 leçons) dans `backlog.md`
- ✅ Création EP-038 (Harnais jsdom) — priorité 🔥 URGENTE, plus gros levier (~20 commits/chantier)
- ✅ Extraction 4 axes optimisation : A. Harnais headless, B. Règle 2-strikes cause-racine, C. Design amont + figeage (L-055), D. Figeage (✅ déjà déployé)

**5 causes racines identifiées** :
1. Harnais test humain (PP) = tueur vélocité #1 → EP-038 jsdom
2. Chasse symptômes au lieu causes (7 commits mixer) → 2-strikes rule (pattern, pas de L-xxx assigné)
3. Bus en haut/bas : régression sans figeage → L-050 (figeage ok)
4. Tube vide : clipPath id dupliqué → L-052 (SVG id-check)
5. Layout refait 5× : pas design amont → L-055 (design amont obligatoire)

**Bugs pédago tardifs** : 3 (recette RGB, addCouleur, mécanique) → L-053/L-054.

**Potentiel optimisation** : ~20 commits (52% réduction si EP-038+process appliqués).

**État au reboot** :
- Leçons gravées pour prochains MJ
- Système figeage ✅ (déjà live, mj-21 protégé)
- Design amont proposé comme processus (pas exécuté, attente appel next MJ)
- Harnais jsdom = chantier T-380 à T-384 (priorisation haute)

---

## 2026-05-14 — [MJ GABARIT] Header compact + fix encoding emojis (tous les MJ)

**Owner** : Papa Yann (signal utilisateur)
**Trigger** : Papa Yann signale 2 problèmes systématiques à travers TOUS les mini-jeux HTML :
1. Caractères foireux / encoding cassé (textes + emojis)
2. Bandeau titre + message mise à jour + bouton retour au menu **trop gros** — veut gabarit compacté comme mj-20 (commit e1bcd42a)

**Fait** :
- ✅ Classification : DÉCISION (gabarit canonique) + TODO (encoding + gabarit) + LEÇON (pattern unifié)
- ✅ Création EP-035 (fix encoding emojis)
- ✅ Création EP-036 (appliquer gabarit header compact mj-20 à tous les MJ)
- ✅ Création L-033 (gabarit header canonique unifié = règle non-négociable)

**État au reboot** :
- Backlog mises à jour (EP-035, EP-036, L-033)
- Décision figée : header unifié + compact = obligation futurs MJ + retro-fit existants

---

## 2026-05-13 — [ARCHITECTURE CLAUDE] Refonte 3 niveaux + path-scoped rules

**Owner** : refonte doc Anthropic (main agent + validation Papa Yann)
**Trigger** : consolidation structure CLAUDE.md après harmonisation Game↔Narration phase précédente.

**Fait** :
- ✅ Refonte CLAUDE.md racine : 219 → 107 lignes (synopsis pôles + commandes trans)
- ✅ Création `game/CLAUDE.md` (113 l) : PMO+Archiviste auto + règles d'or LimeZu + équipe agents + pointeurs
- ✅ Création `.claude/rules/tile-tools.md` (80 l) : paths: `site/tile-tools/**`, `site/tools/**` — mnémonique 2/8/14/15 + Sidewalk_1 mapping + vocab.py source unique + brique avant macro
- ✅ Création `.claude/rules/mini-jeux.md` (103 l) : paths: `site/mj-*.html`, `site/index.html` — UX zéro-pénalité, feedback <200ms, zones tap 80px, busSVG obligatoire, couleurs IDFM LIGNES
- ✅ Création `.claude/rules/` 4 fichiers Narration symétriques : stories-process, personnages, univers, audio (183 l total)
- ✅ Hook UserPromptSubmit : auto-rappel `/game-pmo` ou `/narration-pmo` si signal détecté

**Décisions prises** : voir `decisions.md` § "Refonte archi CLAUDE.md 3 niveaux".

**État au reboot** :
- Archi CLAUDE.md alignée doc Anthropic officielle (nested + path-scoped)
- Zéro coût contexte tant que fichier sous `game/` ou `studio/narration/` non touché
- Source de vérité 1/N préservée (INVARIANTS ← rules ← skills)
- Commandes `/game-pmo-audit` et `/narration-pmo-audit` préfixées automatiquement en signal détection

---

## 2026-05-13 — [PMO+ARCHIVISTE] Harmonisation Game ↔ Narration (mode militaire full)

**Owner** : game-pmo (avec création game-archiviste) + propagation main agent.
**Trigger** : auteur demande symétrie pôle Game avec pôle Narration (refondu 2026-05-12).

**Fait** :
- ✅ Création `game/pmo/` dossier dédié (5 fichiers : INVARIANTS, audit-trail, decisions, sprint-log [ce fichier], backlog)
- ✅ Création `game-archiviste` agent (Haiku, AUTO signal structure)
- ✅ MAJ `game-pmo.md` (binôme avec archiviste)
- ✅ Préfixage commandes strict net : `/narration-pmo-audit`, `/narration-archiviste-audit`, `/game-pmo-audit`, `/game-archiviste-audit`
- ✅ Refonte `game/INDEX.md` + création `game/EQUIPE.md`
- ✅ MAJ `CLAUDE.md` racine (section Game enrichie)
- ✅ Migration `memory/state.md` réduit aux sources statiques
- ✅ Migration `tasks/BACKLOG.md` → `pmo/backlog.md`

**Décisions prises** : voir `decisions.md` entrée 2026-05-13.

**État au reboot** :
- Pôle JEU symétrique avec pôle Narration : PMO + Archiviste proactifs (binôme FOND/FORME) + INVARIANTS + audit-trail
- Toutes les commandes sont préfixées par pôle : `<pôle>-<agent>-<action>`
- 5 trous critiques côté Game fermés
- 6 questions self-challenge Narration gravées en queue dans `studio/narration/pmo/decisions.md`

---

## 2026-05-12 — Session 2 phases (matin route v3 + après-midi pivot brique-avant-macro)

### Phase 1 matin — Pipeline route v3 validé

**Fait** :
- ✅ 3 recettes route validées par pipeline ET visuellement par Papa Yann :
  - `test_route_h_7rows_v3.py` (14×7 route H 3-chaussées)
  - `test_route_v_7cols_v3.py` (7×14 route V 3-chaussées)
  - `test_papa_route_large.py` (17×9 compo Papa référence)
- ⚠️ 4 recettes virages 13×13 validées par pipeline (9/10 reviewer) mais **invalidées visuellement** par Papa Yann l'après-midi
- ✅ `builders.py` v3 : `route_h()/route_v()` macrifiées, alternance `_VOIE_POOL` cycle 3, anti-mono activé
- ✅ `vocab.py` source unique constantes tiles (validation auto)
- ✅ `vocab-playground.html` synchronisé

### Phase 2 après-midi — Pivot brique-avant-macro

**Découverte critique** : pipeline simplifier→designer→reviewer a validé des recettes virages techniquement correctes mais visuellement ratées. Cause : `vocab.py` contenait des constantes inventées (`COIN_INT_SE = sw_1` etc.) jamais validées visuellement.

**Refonte complète** :
- ✅ `brick-explorer.html` créé : page interactive pour valider chaque tile candidate isolée (mini-render 3×3, vote courbe/point/autre/rejeté)
- ✅ Mapping LimeZu SW_1 ↔ SW_2-6 figé : 10 positions (#11-#20) décalées, table figée dans `styles.py`
- ✅ `styles.py` créé : module 6 styles (blanc/beige/gris_bleu/jaune/bleu/gris) + résolution auto SW_1
- ✅ Méthode "planche comparative" validée : `scripts/compare_tilesets*.py` (5 scripts)
- ✅ `tile-picker.html` refondu : 9811 tiles (vs 3525, 36% → 100% couverture)
- ✅ `build_tile_picker_data.py` : scan PIL lit vraies dimensions (3040 unitaires + 6473 sprites + 298 planches)
- ✅ `test_ref_papa_4virages.py` : RÉFÉRENCE CANONIQUE virages 14×14 (source de vérité reconstruction future)

**Décisions prises** : voir `decisions.md` § "Pivot Brique-avant-Macro" + "Mapping LimeZu SW_1" + "vocab.py source unique".

**Leçons gravées (game-tile-pmo)** :
- LESSONS.md : Corrections 9-12 (4 leçons)
- PIPELINE-MEMORY.md : F-008/F-009 (frictions), P-008/P-009/P-010 (patterns)
- backlog.md : L-029 à L-032 + EP-VIRAGES-V2 à créer

**État au reboot** :
- 3 recettes route OK, 4 virages invalidés (à refaire post-pivot)
- EP-VOCAB clôturé (phases 1-2 complètes, phases 3-5 annulées)
- EP-VIRAGES-V2 à créer pour refonte depuis `test_ref_papa_4virages.py`

---

## 2026-05-11 (suite) — EP-VOCAB phases 1-2 + pivot

**Contexte** : Papa Yann cadre l'epic "ingénierie tile-tools" pour résoudre cause racine (galère sur "route droite propre", briefs complexes impossibles). Plein pouvoir donné.

**Livré** (commit `feat(tile-tools): EP-VOCAB phases 1+2`) :
- ✅ `site/tile-tools/vocab.py` : 46 constantes nommées français, validation auto au boot
- ✅ `site/tile-tools/builders.py` : macros `route_h()` + `route_v()` testées + **SHA256 byte-identique** aux PNG existants
- ✅ `site/tile-tools/RESEARCH-INSPIRATIONS.md` : 60+ liens capitalisés (LDtk, WFC, DualTilemap, Bitmask, Phaser, LimeZu)
- ✅ Fix en passant : `test_voie_bus_v6.py` (`_15` SALE → `_8` PROPRE, oubli correction 5)
- ✅ 2 recettes v2 exemple : `test_route_h_5rows_v2.py` + `test_route_v_5cols_v2.py`

**🔀 Pivot Papa Yann (fin de session, validé)** :
- Découverte : coder des macros (`virage`, `carrefour`…) = **inventer comment composer**. Or les recettes actuelles ne plaisent pas visuellement à Papa Yann → on reproduirait le défaut.
- Nouvelle direction : **collecter des références visuelles** (screenshots LimeZu officiel, maps Pokemon, samples LDtk) → reproduire fidèlement → la "macro" devient une recette de référence validée.
- EP-VOCAB phases 3-5 (macros virages/carrefour/T/refactor 13 recettes) **ANNULÉES**.
- **EP-REFS ajouté au BACKLOG** (banque refs visuelles, à lancer en session dédiée).

**Nettoyage effectué (clôture)** :
- ✅ `cartography.json` marqué **DEPRECATED**
- ✅ `site/tools/tile-library.html` + `tile-library-v2.html` → archivés
- ✅ `__pycache__/` purgés (gitignore créé)
- ✅ `site/tile-tools/_archive/` créé avec inventaire candidats futurs
- ⏳ Scripts debug + recettes passages piétons : pas touchés (Q-ouvertes #3 et #4 dans decisions.md)

**Vérifications passées** :
- EP-022 MJ-04 "boucle infinie" : faux bug — code conforme depuis (compteur 10 tours + showEndScreen + playEndSound présents)
- mj-pose-tiles `_14`/`_15` SALE : corrigé par swap vers `_2`/`_8` propres (L-013 respectée)
- mj-12 scope : tranché Papa Yann — dashboard sonore (L-024)

---

## 2026-05-11 (architecture équipe) — Refonte hiérarchique pôle JEU

**Décision** : architecture 3 sous-domaines avec PMO niveau pôle + 2 sous-PMO enfants + Wexworld Phase 2.

**Créé** :
- `game-mj-pmo` (Haiku, sous-spé mini-jeux)
- `game-conseiller` (Opus, transverse 3 sous-domaines)
- `game-mj-reviewer` (Haiku, validateur 5 sections)

**Détails** : voir `decisions.md` § "Architecture équipe pôle JEU".

---

## 2026-05-08 → 2026-05-10 — EP-TILES + EP-MJPOSE

**Livré** :
- ✅ Skill `~/.claude/skills/maxplay-tiles/` : SKILL.md (566 l) + LESSONS.md (30+ entrées)
- ✅ Agent dédié `.claude/agents/game-tile-pmo.md` (Haiku)
- ✅ `site/tools/` : hub + tile-picker (matrice drag&drop, 5 catégories, multi-tiles vraies dimensions, `?recipe=X.py`), tile-library-v3, mockups-routes (6 patterns échelle uniforme + bouton 🎨 Éditer)
- ✅ `mj-pose-tiles.html` : 🦺🚧 mini-jeu kids (8×8 tactile, 5 catégories, bouton Lisser)
- ✅ 13 recettes Python validées + 13 PNG (routes, virages, carrefour, rond-point, quartier, parking, voie bus, passages piétons)
- ✅ Cartographie LimeZu corrigée — L-013 à L-018
- ✅ Workflow Propose → Édite → Apprend opérationnel

---

## 2026-05-03 — EP variés (vocab + Duolingo + multi-touch)

**Livré** :
- ✅ EP-021 vocab : MJ-08 "Au centre bus" / MJ-17 "Le garage" partout
- ✅ EP-027 MJ-20 : progression Duolingo par langue + paliers + localStorage
- ✅ EP-029 MJ-19 : 50-80 bus (avec doublons) au lieu de 20-30
- ✅ EP-031 MJ-15 : niveau D (roues colorées) + niveau E (combo couleur+numéro)
- ✅ EP-032 MJ-09 : multi-touch 2 doigts (Pointer Events + Map)
- ✅ EP-033 : TTS annonce titre désactivé (laggait le démarrage)

## 2026-07-19 — Nettoyage input-context Claude + 2 skills consolidés

- Purge `.claude/skills/` : 15 skills PC pro/ECC supprimés (balayés par git add -A le 2026-04-20), 7 dossiers connaissance archivés `_archive/2026-07-19-skills-connaissance-ecc/`.
- ✅ **Skill `game-design-enfant`** créé (consolidation kids-ux + child-motor-skills + child-pedagogy + game-mechanics) — théorie durable, pointe vers STANDARD-MJ/MECANIQUES/MAX_PROFILE, zéro copie de décisions.
- ✅ **Skill `phaser-tech`** créé (phaser-framework + performance-opt + gamepad-inputs) — patterns Phaser, perf tablet, manette 8BitDo. Prêt si max-adventure revit (EP-024).
- Global `~/.claude/` : 19 rules ECC + 8 agents doublons retirés (backup `~/.claude/_backup-2026-07-19/`), CLAUDE.md global condensé 26 lignes. Gardés : build-error-resolver, security-reviewer, refactor-cleaner, pixel-map-*, loop-operator.

---

## 2026-07-20 — Spino : mj-46 + mj-47 livrés et câblés (V1 moteur comptage/dés)

**Livré** (commit `e5be1c02`, poussé) :
- ✅ **mj-46 « Les œufs surprises »** (S1 Spino, moteur `mj-compte.js`) : pointage pastilles jaunes → QCM combien → éclosion bébés dinos. Paliers N0 2-5 · N1 3-10 · N2 5-15.
- ✅ **mj-47 « Les constellations »** (S2 Spino, moteur `mj-dice.js`) : subitizing sur **ombres dino** (variante Yann adoptée) + décomposition « 3 et 2, ça fait 5 ! ». Paliers N0 1-3 · N1 1-6 · N2 4-10.
- ✅ Câblage repaire Spino (`mur.js` : ordre mj-46 → mj-47 → mj-43, titres, 2 vignettes CSS) + entrées `catalog.js` (tracking/accordéon parents). Séquence ★★ vérifiée par test localStorage simulé.
- ✅ BUILD-MUR-COPAINS.md mis à jour (mj-46/47 cochés).

**Écart spec assumé** : mj-46 sans regroupement par 5 au palier 3★ (golden 3 niveaux standard). À trancher après test de Max.

**Leçon** : vignette œufs cassée au 1er rendu — padding/gap en % dans une `.vig` se résout contre le parent (règle déjà gravée dans `mur.css` l.143 ; appliquée au fix : px uniquement). Rappel : relire les règles d'or du fichier AVANT d'ajouter une vignette.

**En attente** : retours de Yann sur mj-46/47 avant de lancer mj-48 (bus unifié), mj-49 (barquettes de 10), mj-20 corrigé, tri des lettres Galli.

---

## 2026-07-20 (soir) — Retours PY sur mj-46/47 + doc de délégation LLM externe

**Retours PY gravés** (détail complet → `docs/specs/2026-07-20-DELEGATION-LLM-MENU-CIBLE.md` §2) :
- mj-46 : QCM visible dès le début (tap œufs = aide optionnelle) · œuf se fissure au tap · paliers 5→15 / 7→22 · œufs « en vrac » (jamais caché à +50 %) · éclosion = avatars sprites (déjà le cas).
- mj-47 : visuel actuel REJETÉ → format **domino permanent** (2 cases accolées, configurations dé, ref. POC mockup-6) · décomposition = les 2 moitiés visibles, jamais de split arbitraire · paliers relevés (moitiés 1-3 / 1-6 / 3-6).

**Décision PY** : la construction est déléguée à un LLM externe → doc de délégation complet rédigé (toutes tâches V1/V2/V3, règles de câblage mur.js+catalog.js+vignettes, standards à lire, process de validation).

**Question PY tranchée** : étoiles/avancement bien remontés à Supabase — automatique via tracker.js → Cloud.schedulePush() quand un profil enfant est actif. Rien à coder.

## 2026-07-20 (soir) — Mur des Copains : V1 COMPLÈTE + vague 2 partielle (délégation LLM exécutée)

Exécution de `docs/specs/2026-07-20-DELEGATION-LLM-MENU-CIBLE.md` (F1/F2 mj-46/47 EXCLUS sur consigne PY).

- ✅ **mj-48 « Tout le monde monte ! »** (Spino S3) — bus 2 fenêtres de 5 (POC-8), N2 mixte monte/descend + places libres + compléments à 10 + **file ordinale tap direct** (plan caché, 1ᵉʳ près de l'arrêt). Absorbe mj-05/13a-idées/POC-03/08/11.
- ✅ **mj-49 « Les barquettes de 10 »** (Spino S4) — boîte d'œufs 5×2, badge « 10 », N0 compléments à 10 / N1 10+n / N2 deux-barquettes + « il me faut N » + **célébration bocal** (ex-S5). Remplace mj-43 au repaire.
- ✅ **mj-20 corrigé** (Para P2) — gating par étoiles : 0★ FR seul 1-5 · 1★ FR 1-10 + EN · 2★ +ES/BR · 3★ tout. Langues fermées ABSENTES de l'UI.
- ✅ **mj-50 « Trouve la lettre »** (Galli G1) — le SON jamais le nom (MP3 phonèmes + TTS rate 0.6), cursive Cursif, N2 confusables + « quel son au début de maman ? ». Haut-parleur SVG (emoji retiré du visuel principal).
- ✅ **mj-51 « Le tri des lettres »** (Galli G2) — moteur tri-bacs mj-09 en peau allographes (cursive/script/MAJ), N2 b/d/h/k. Remplace mj-09 au repaire.
- ✅ **mj-52 « La boîte à mots »** (Galli G3, vague 2) — alphabet mobile cursif, guide syllabique, aide lumineuse (jamais posée à la place de l'enfant).
- ✅ **mj-53 « Lis et fais »** (Galli G5, vague 2) — mot cursif→image, syllabes dino + vraies photos SANS audio (décision PY mj-27), consigne-action « Touche 3 oeufs rouges ». Fusion : mj-23 + mj-06 retirés du repaire Galli.
- ✅ **mj-34 fixé** — avancement persistant (tier = étoiles+1 + localStorage) + obstacles éteints (un seul bus sort). Les 2 retours PY du 19/07 traités.
- ✅ **mj-14** — vraie entrée catalog, hack LOCAL_META retiré de mur.js.
- ✅ 8 figées créées (mj-20/34/48/49/50/51/52/53) + 6 specs Playwright neuves + 2 durcies — **tous harnais VERTS** avant chaque commit. Commits atomiques par jeu.

**Écarts spec assumés** (golden 3 niveaux) : boîtes-sons mj-51 · mot libre mj-52 · phrase rigolote mj-53 — différés vague 3.
**Reste (vague 2)** : mj-14 suite AB/AAB + variante dino · mj-15 assets · T3 vétérinaire dino (mj-17) · T4 SVG continents (mj-31) · P3 test réel mj-22 (PY) · captcha traçage (test tactile PY).
**Leçons** : ① Œ ligaturé absent de la fonte Cursif → graphie « oeufs » obligatoire dans les consignes cursives. ② `tests/index.spec.mjs` cassé AVANT session (écrit pour l'ancien menu accordéon) — à réécrire pour le Mur. ③ testMode : asserts sur `roundLock` après answer(true) racent (enchaînement immédiat) — asserter sur `qCount`.

---

## 2026-07-20 (nuit) — Retouches F1/F2 FAITES sur mj-46/47 (par Kimi, finalement pas déléguées)

**mj-46** : QCM visible dès le début de chaque question (tap œufs = aide optionnelle, failsafe supprimé) · œuf **fissuré** au tap (craquelure SVG CSS) · disposition **en vrac** : grille cellules 1,15× + jitter ±15 % + rotation ±12°, alignée en bas (œufs posés dans le nid), jamais caché à +50 % · paliers N0 2-5 · N1 5-15 · N2 7-22 · panneau règle réécrit (« je réponds direct si je sais »).

**mj-47** : réécriture complète en **format domino permanent** (2 cases accolées + séparateur, configurations canoniques de dé en ombres dino lumineuses, ref. POC mockup-6) · décomposition = les 2 moitiés visibles qui s'illuminent à tour de rôle (« 1 et 6, ça fait 7 ! ») — plus jamais de split arbitraire · paliers relevés : moitiés 1-3 (total 2→6) · 1-6 (total ≥4) · 3-6 (total 6→12) · harnais `__mjTest` adapté, params `?v=`/`?level=`/`?celebre=`.

**Validation** : screenshots headless N0/N2 (mj-46, 5 puis 11 œufs en vrac dans le nid, QCM visible) + question et état célébré (mj-47) — `temp/mj46-n0b/mj46-n2b/mj47-domino/mj47-celebre.png`.

**Leçon process** : harnais `temp/test-shot.html` réutilisable — pré-remplit `mp_regle_vue_<id>` + fausses étoiles (`maxplay_progress`) puis `location.replace` vers le jeu → screenshots de n'importe quel palier sans jouer.

---

## 2026-07-20 — POC refonte du Mur (menu principal)

**Décisions PY gravées** : avatars cartoon (`img/avatars/`) pour les copains au menu (pas les sprites réalistes) · copains en barre horizontale, entrée dans le repaire par **swipe droite** (>70px) ou tap · flottants thématiques conservés dans les cartes (chiffres/ombres/lettres/drapeaux/puzzle) · Tritri sans repaire : jeux en visuel direct (Découverte + Préférés), zone refaite (avatar + bulle + vignettes).

**POC livrés** (`site/design-mur/`, interactifs, testables sur tablette) :
- `index.html` — sommaire comparatif des 3 patterns.
- **A `poc-a-parade.html`** — encyclo = dernière carte de la parade (carte-livre dorée, T-Rex sans repaire, jeux dino à recaser).
- **B `poc-b-rex-savant.html`** — T-Rex = portail-trône doré en bas (il EST l'encyclo), jeux dino transférés à un nouveau copain **Anky**.
- **C `poc-c-livre-magique.html`** — encyclo = livre doré flottant en dock bas-droite, toujours visible ; T-Rex garde son repaire.

**Commun** : parade horizontale scroll-snap, repaire en overlay slide depuis la droite, `?repaire=spino` ouvre directement, zéro emoji en visuel, pas de TTS (en attente GO).

**Validation** : screenshots `temp/poc-a.png / poc-a-repaire.png / poc-b.png / poc-c.png` — rendus bons (défauts assumés POC : 3e vignette Découverte rognée à 420px, vignettes overlay simplistes).

**En attente** : choix de pattern par PY (ou mix) → ensuite refonte réelle de `index.html` + `js/mur.js` + `css/mur.css` (mapping `COPAINS.tete` → avatars).

### Retours PY → POC « Le slider » (remplace la présentation A/B/C)

- **Slider pleine largeur** : 1 copain = 1 écran (plus de cartes 68%), pastilles de navigation.
- **Geste d'entrée** : attraper le dino et le tirer → il **se dandine et grossit** pendant le drag (rotation oscillante + scale + petits sauts), seuil ~1/3 de la scène, sinon retour élastique. Tap = entrer aussi. Le dino gambade hors de l'écran avant l'arrivée du repaire.
- **Zone du haut = NOTRE avatar** (dino du profil, `localStorage maxplay_avatar` via `js/avatars.js`, fallback Tritri) — plus Tritri imposé.
- **Épuré, une seule logique** : encyclo = dernière slide-livre dorée dans le même slider (pas de sous-menu, pas de dock flottant).
- POC : `site/design-mur/poc-slider.html` · screenshot validé `temp/poc-slider.png` · sommaire `index.html` mis à jour (A/B/C archivés). En attente : test du geste sur tablette par PY.

### Correction PY (croquis) → bandes verticales

Le croquis PY montrait des **bandes pleine largeur empilées verticalement** (scroll de page), pas un carousel 1-écran-par-dino. `poc-slider.html` réécrit : `.liste` verticale de `.bande` (dino à gauche qui se dandine au repos, infos centrées, flottants estompés derrière le texte, flèches « → » à droite) · geste = tirer la bande → (le dino se dandine + grossit pendant le drag, seuil ~1/3, retour élastique sinon) · `touch-action:pan-y` + détection d'angle pour ne pas bloquer le scroll vertical · tap = entrer aussi · encyclo = dernière bande-livre dorée, même geste. Screenshot `temp/poc-bandes.png` validé.

## 2026-07-22 — Traitement vague annotations Supabase (25 retours)

9 agents game-dev paralleles. Fixes pushes (aff944c0 + 391741d4) : mj-15 badge etoiles entete, mj-21 entete golden + doses 1+1=2 + cap 4, mj-24/48 double-validation (verrouillage tuiles, mj-kit partage) + 162 bleu IDFM (window.LIGNES undefined) + son erreur, mj-27/41 images headshots + audio mj-27 retire, mj-28 halo/contraste + son pre-selection retire, mj-32 galerie JSON fills rejouables, mj-46 chevauchement 1/3 + cris bebes, mj-47 traits/glow/chiffres, mj-50 TTS phonetique + defaite sans etoile. Retires du menu : mj-25/29/33/41 (e8948785). Deblocage total sequence->free (3e3c8d3a, decision PY). 25 annotations passees traite en base avec resolution+commit. Jamais testes par PY : mj-14/49/51/52/53. REX concurrence : Kimi a ecrase catalog.js 1x et un stash concurrent a avale mj-15/50/mj-golden (recuperes du stash, re-testes verts) — regle stager-committer-vite confirmee.

### 4 variantes zone copains (2e vague POC, retours PY)

Corrections PY appliquées : lignes 2-3× plus petites · **seul le dino se déplace** au drag · nom discret (dit à l'oral à l'entrée, pas en énorme) · vraies variantes conceptuelles demandées. Livré (`site/design-mur/`, validé screenshots) :
- **V1 `v1-file.html` « La file »** — liste compacte (classique) : lignes 64px, drag du dino seul (dandine + grossit ×1.8 en traversant), étoiles sous le nom.
- **V2 `v2-chemin.html` « Le chemin »** — sentier de pierres serpentant, copains = étapes (Duolingo/Khan Kids), porte dorée encyclo au bout.
- **V3 `v3-bulles.html` « Les bulles »** — bulles flottantes libres qui pop au tap (exploration libre maternelle).
- **V4 `v4-village.html` « Le village »** — scène diégétique de nuit : chaque copain à sa place, T-Rex garde le livre doré (Toca/Sago). Retouché par moi (ciel 280px, dinos 96px, encyclo recadrée).
- Header commun fusionné : 1 seul avatar (profil `maxplay_avatar`) + badge ⭐ total + bulle — réponse au « double avatar » (voir discussion avec PY).
- Fix asset : `paras_joyeux_1.png` n'existait pas → `paras_joyeux_2.png` partout. `debug-v4.html` supprimé.
- Agents : V2/V3/V4 délégués (timeout mais fichiers livrés complets), qualité validée par screenshots + retouches maison.

**En attente** : choix PY de la variante (ou mix) → refonte réelle du Mur.

## 2026-07-25 — Bug ombre geante + tour factorisation quick wins

Bug menu PY (ombre Diplodocus geante) : cause = vignette mj-30 jeu-du-jour, cache desync mur.js/mur.css -> filet CSS generique .vig img plafonne (447c76cd). Tour factorisation : 3 analyses lecture seule puis 3 agents implementation (0f8b2116, 33 fichiers, -218 lignes nettes) : MJKit.shuffle/pickDistinct (19 jeux, shuffle biaise corrige mj-13a/b/c/15/16, TDZ mj-13c), MJKit.PHONEMES/sayPhoneme (50/51/52 unifies), speak() bruts -> TTS.speak (22/43/44/45), sndOk -> sounds.js (mj-08/09 2e AudioContext supprime), .htitle locaux supprimes (42/43/44/45/47), confetti maison -> MaxFX (11/17/21/37/39). Harnais verts partout + verif croisee. GROS CHANTIERS EN ATTENTE ARBITRAGE PY (backlog 2026-07-25) : QCM->MJKit.qcm x19 + MJCompte, PlayAudio.cue, showEnd sans piste, DnD partage, trilogie 13 LIGNES+fonds, mj-01/13b ancien gabarit.

## 2026-07-25 — Mur « La file » livré en prod (V1 choisie par PY)

Choix PY : variante V1 « La file » + entrée au repaire UNIQUEMENT au drag du dino (seuil 30% de la rangée, retour élastique sinon, sortie gambadante puis openRepaire). Click-to-open supprimé.
- mur.js : COPAINS spino→galli→velo→para→trex (dernier, doré encyclo) ; rangées 70px (floats ×4, img.c-tete drag, .c-qui, .c-piste ›››) ; renderPortails réduit au trex.
- mur.css : .file/.copain/.c-tete/.c-qui/.c-piste (doré, anim copain-court) ; reduced-motion étendu.
- index.html : header profil fusionné (avatar+pseudo+⭐ total+profil-bulle « Tire un copain… »), barre niveau retirée du header, .tritri-head supprimé, #ency-portail retiré du DOM, .copains-head + #copains-grid.file.
- Fausse alerte debug piste invisible : viewport headless min 504 CSS (Windows scaling) → captures 420px clippaient le bord droit ; la piste a toujours été rendue (preuve computed style). Screenshot final 504px OK.
- Rappel : voix/TTS menus en attente GO PY. Pistes notées : relique au-dessus de l'étoile (plus tard), vignettes copains animées sans génération (chiffres/lettres/ombres/drapeaux autour de la tête).

## 2026-07-25 — Playtest Max : retours + double analyse gamification

LIVRE AVANT PLAYTEST (deja commite 4edbd1af) : Mur « La file » (entree drag-only, header avatar fusionne, T-Rex dore encyclo), POC design-compte/lecture et doc commentaires PY precedemment pousses.

RETOURS PLAYTEST (dictes PY, traces dans backlog.md L2338) : navigation pas claire · sortie avant la fin · trop facile · aimant = encyclo dino (nouveau style apprecie).

DOUBLE ANALYSE, MEME CONCLUSION — « jouer doit produire du dino » :
- game-conseiller (Opus) : rapport complet docs/2026-07-25-brainstorm-gamification.md — diagnostic structurel (etoile sans-faute binaire = anti-pattern ; difficulte verrouillee par etoiles = enferme niveau 1) + boucle FOSSILES (fragment par bonne reponse -> collection encyclo) + 3 questions Q1/Q2/Q3 a trancher PY.
- Kimi (cette session) : propositions convergentes — Nid d'oeufs (boucle visible, eclosion surprise = variante peau des fossiles), frise-chemin par copain (~D1 expeditions), mission du jour + relique copain (~B3 fouille + relique notee 2026-07-22), ecran victoire 3 boutons « Encore / La suite / Maison » (~A3), vignettes picto parlantes (~C1).
EN ATTENTE : arbitrage PY sur Q1/Q2/Q3 (voir fin du rapport gamification) + choix peau oeufs vs fossiles. Aucun dev gamification lance.

## 2026-07-26 — CHANTIER NID livre (P0-P4)

GO PY (fusion brainstorms Claude+Kimi). P0 plan + validation conseiller (GO, 4 bloquants integres : descente niveau supprimee, cap oeufs/jour supprime, serie doree = session 30min, retrocompat specs). P1 collection.js moteur theme-neutre + skin dinos (05ff2acb). P2a mj-golden : oeuf a toute partie terminee (MaxFX.eggEarned), sequence oeuf->etoile, 3 boutons Encore/La suite/Maison (data-act, >=80px), reprise A2 24h, MJKit.chain, compliments processus (30555bd5). P3 Mur : nid 3 oeufs, eclosion MaxFX.hatch + cri, bandeau collection ombres/couleur -> fiche (?open=), apercus vignettes rangees, frise-chemin repaire (6f4fce45). P4 e2e 27/27 + 3 bugs integration corriges (deps nid-ui, Tracker const, refresh deep-link) (cf958b62). Captures .artifacts/nid-e2e-*.png. EN ATTENTE PY : defigeage niveau max(etoiles,competence) (P2b) · voix menus · tap vs drag. TICKETS V3 : missions du jour + reliques + fouille narrativisee · doublon-cadeau (fin de collection) · satiete narrative si grinding observe · recalibrage paliers nombres manipulation decomposee (chantier pedagogique separe) · marquage possede dans encyclopedie (coordination dino-pmo) · ombres manquantes (backlog dino). STANDARD-MJ : ecran de fin 3 boutons = PROPOSITION CONTRAT v3 a valider PY avant gravure.

## 2026-07-30 — NID v4 : œufs individuels, chambre des œufs, accessoires de soin (vague 1+2)

GO PY (fusion brainstorm Claude + copain LLM) + décisions live PY en cours de chantier (drop 0/1-2/3, accessoires consommés, caresse-amour à 2 accessoires, doré = très connu, 3e étoile = récompense spéciale).

- `collection.js` v2 (moteur PUR réécrit) : œufs INDIVIDUELS {famille, golden, acc[], caresses} + sac. Drop : nid vide → œuf · 1-2 → random complet · plein → accessoire · 3★ → rien (anti-farm étendu). Doré = dino très connu (top 15 `star`, toutes familles). Éclosion par œuf (seuil 3 accessoires, 1er œuf de l'histoire = 1), accessoires consommés SAUF étoile permanente (3e étoile d'un jeu, max 1/œuf). Caresse : craquement visuel 3 stades + à 2 acc / ≥2 caresses, 1 chance sur 3 d'ouvrir (loveWarm). Migration v1→v2 silencieuse. Zéro decay (D-002).
- `mj-golden.js` : UN gain annoncé (œuf teinté famille via `eggEarned` color/emoji, ou accessoire) ; étoiles 1-2 DISCRÈTES (`_discreetStar`), cinématique+Mario réservés à la 3e (« Tu maîtrises ce jeu ! ») qui donne l'écharpe étoilée.
- `nid-ui.js` : nid du Mur teinté famille + fissures + mini-accessoires ; CHAMBRE DES ŒUFS plein écran (tap nid) avec sac latéral, soin tap-tap ET drag, éclosion jouée sur place ; THÉÂTRE du 1er œuf one-shot (gestuel, débouche sur la chambre).
- `dev-dinos.html` : légende œuf coloré par famille sur les fam-cards (trace côté dino-pmo).
- Docs : MECANIQUES.md § Boucle NID v4 · STANDARD-MJ.md § célébration d'étoile réécrite · backlogs (minijeux + dino) · D-003 vérifié (aucun wording « encore N et il éclot »).
- Tests : collection.spec réécrit v2 (40 checks, Math.random stubé) · mur-nid mock v2 + chambre (32) · nid-e2e réécrit boucle v4 (33, théâtre+chambre+éclosion réels) · mj-golden-nid adapté. 4/4 VERTS + audit-gabarit 0 bloquant.
- RESTE (vague 3, non commencé) : mj-coach.js (coach-marks bibliothèque, à instruire MECANIQUES avant code) + onboarding menu (avatar forcé, présentation progressive des copains, nom/email différé).

## 2026-07-30 (suite) — Mur v2 « LA VALLÉE » implémenté (spec v0.5, P0→P3)

GO PY (« VAZI on fait ça » + « implémente tout ça, cohérence, factorisation »). La scène EST le menu.

- `index.html` : header 1 ligne (avatar + pseudo + ⭐ total + bouton parents discret), le reste = la vallée plein écran. Gate parents + modale code TRITRI + jingle conservés tels quels.
- `js/mur.js` refondu en MODULE LOGIQUE (rendu supprimé) : COPAINS 6 (Spino/Galli/Troudi ex-Vélo/Volta ex-Para asset ptero/hôte dino DYNAMIQUE/Roi T-Rex), hôte dino = avatar du joueur avec repli Tritri (règle §4.3, FIXED_AVATARS), repaireState/entry/TITRES/VIGNETTES/starsOf inchangés (contrat séquence 2★ intact), humeurs() remplace decouverte() (délaissé/nouveau/pense), espace parents + openEncyclo (flux code inchangé). File verticale, drag-to-enter, #repaire-view : SUPPRIMÉS (défigés PY 2026-07-29).
- `js/mur-scene.js` (NOUVEAU) : vallée vue du dessus (décor img/decor/ existants + mare CSS — zéro image générée), balade libre WAAPI transform-only (1 marcheur à la fois + cibles à ≥16% des autres = anti-collision « on ne se touche pas », flip direction, Volta plane), TOUT se met en pause au pointerdown et reprend après, humeur délaissé = tête boudeuse (mood enerve) 4s/20s par intermittence, sparkle nouveau, bulle-pensée après 12s (vignette tappable → lance le jeu), bus 162 spectacle en bordure (busSVG, ~45s), tap copain → bulle bas d'écran (phrase ≤5 mots + vignettes tampon ✓/reco brille + phrase d'ouverture), tap Roi T-Rex → bulle 3 portes (📖 encyclo / 🥚 nid / 🏞 Padidi), pulse du Roi si gain (œuf/accessoire/éclosion) pas encore vu (snapshot localStorage maxplay_nid_vu, posé par NidUI à l'ouverture chambre/Padidi — source unique).
- `js/nid-ui.js` réécrit en MODULE MONDE DINO : le nid quitte le menu (blocs nid-host/bandeau/aperçus/frise supprimés). Reste : chambre des œufs (NID v4 intact) + PADIDI (grille ombres par famille, réutilise .nid-vig/.nid-fam, possédé→fiche, ombre→mystère, ANTI-SPOILER jamais d'œuf) + théâtre 1er œuf (→ chambre). Un œuf déjà prêt éclot À L'OUVERTURE de la chambre après 1,3s (le doré se voit — bug PY 2026-07-28 couvert au nouveau endroit).
- Choix d'implémentation notés : Troudi (Troodon) porte l'asset ex-velo (AUCUN asset troodon n'existe, principe 5 zéro génération — à régénérer si PY veut un vrai Troodon) ; bloc Découverte disparu (fonction reprise par humeurs + bulle-pensée, conforme spec §3).
- Tests : mur-nid.spec RÉÉCRIT vallée+monde dino (33 checks) · nid-e2e migré (31 checks, théâtre→chambre→éclosion→Padidi→bulles réels) · collection.spec/golden-nid inchangés verts · audit-gabarit 0 bloquant. Screenshots relus (vallée lisible, tapis de jeu, pulse or du Roi visible).
- DETTES tracées : purge CSS morte dans mur.css (file/copain/repaire/découverte/portail/nid-bloc — gardé ce tour pour minimiser le risque) · tests/index.spec.mjs toujours l'ancien menu (déjà tracké) · onboarding complet (nom/email/avatar) + mj-coach.js = vague suivante (dépendances spec §11, pas dans P0-P4).

## 2026-07-30 (suite 2) — Spec v0.7 appliquée intégralement + purge CSS

Relecture spec v0.7 (amendée par PY + copain). 3 chantiers livrés :

- **Théâtre d'éclosion §6.1** (`nid-ui.js` hatchTheatre) : œuf prêt s'agite + sparkle (~1,4s) → le transporteur entre (avatar du joueur recoloré via Avatar.paintInto, repli Tritri) et vient chercher l'œuf → GLISSEMENT LATÉRAL chambre → album Padidi (slide-out/slide-in CSS, pas de popup) avec l'œuf qui suit en petit rebond (transform-only) → arrêt devant l'OMBRE de la case cible (masquée via `openPadidi({mask})` — hatchEgg committe AVANT l'anim, sans masque la case aurait spoilé) → suspense 700ms → révélation MaxFX.hatch + la case passe ombre→couleur → applaudissements.mp3 + bouton « Voir sa fiche » PROPOSÉ (auto-retrait 7s) → le transporteur s'efface, retour libre (← du Padidi réapparaît). Fallback doublon/données absentes = séquence historique.
- **Sac sans cap + affordance** : aucun plafond, rien à jeter ; un œuf NU alors que le sac est garni FRISSONNE (classe .frisson, anim discrète) — zéro règle, zéro pénalité.
- **Étoile 3 charges à déclassement visuel** (`collection.js`) : `etoile` 🌟 → à l'éclosion revient `etoile2` ⭐ → à l'éclosion suivante revient `echarpe` 🧣 normale → consommée avec son bébé. ETOILE_DOWNGRADE, max 1 étoile/œuf (tout stade), jamais dans le tirage aléatoire, compte dans la chaleur à chaque usage. Première réception (mj-golden) : overlay one-shot « 🌟 → ⭐ → 🧣 · Elle dure plus longtemps ! » (montré, pas expliqué), flag maxplay_etoile_intro par profil.
- **PURGE mur.css** (~215 lignes mortes) : file/copains (drag), repaire (rep-jeu/bulle/ouverture/r-tete), découverte (mur-trio/mini), portail, nid-sur-Mur (nid-bloc/oeufs/plein/accs/badge), frise, c-float, c-apercu, vig-des. GARDÉS (utilisés par chambre/Padidi/parents) : keyframes nid-*, .nid-vig/.nid-fam/.nid-compteur/.nid-crack/.nid-oeuf-coeur, .f-flag (vignette mj-20), .rep-head/.rep-back. reduced-motion nettoyé.
- Tests : collection.spec +3 checks déclassement (vert) · mur-nid.spec section théâtre (transporteur/glissement/révélation/fiche, vert) · nid-e2e migré au théâtre (32 checks vert) · audit 0 bloquant · screenshot théâtre relu (case or, transporteur, fiche proposée).
- RESTE (accord PY « on verra la suite ») : onboarding complet + mj-coach.js (MECANIQUES d'abord) · P4 (bébés éclos dans le monde dino, météorite) · tests/index.spec.mjs ancien menu (dette connue).

## 2026-07-30 (nuit, clôture) — Fix bulle/T-Rex livré + nettoyage complet + batterie totale

Demande PY : « reprend et termine complètement » (le wakeup 5h n'a pas pu être planifié — classifieur indisponible — PY a relancé manuellement).

- Fix retours PY poussé (36e57968) : bulle copain = TOUS les jeux en 2-3 lignes (flex-wrap, plus d'ascenseur horizontal, garde-fou max-height 46vh) + Roi T-Rex remonté (trone y 86→74). ⚠️ incident bénin : 18 fichiers d'assets dino (paleoart/sprites Maiasaura, Minmi, Saurolophus… + sprite_from_hero.py) stagés par une session concurrente sont montés dans ce commit (feedback_concurrent_git_staging) — contenu sain, tracé ici.
- NETTOYAGE COMPLET (chaque suppression vérifiée par grep AVANT) : mur.js — MUR.isVisible retiré (0 appelant), entrées TITRES/VIGNETTES orphelines mj-23/mj-06 retirées (jeux fusionnés, dans aucune liste copain ; mj-33 gardé, listé chez Volta) · mur.css — blocs .vig-mot/.vig-phrase/.vig-rouage/.vig-lettres retirés (0 usage JS) + reduced-motion nettoyé · collection.js/nid-ui.js/mur-scene.js/index.html : passés au grep, rien de mort restant.
- tests/index.spec.mjs RÉÉCRIT contre la vallée (l'ancien testait le menu accordéon v2, mort 2 refontes avant — dette soldée) : coque, header+raccourcis, 6 copains, Roi pas collé au bord bas, bulle sans scroll horizontal, mini-menu avatar→gate parents, flux code TRITRI complet (mauvais/bon code). 16/16 vert via npm run mj:test index.
- BATTERIE FINALE : collection.spec ✓ · mur-nid ✓ · nid-e2e ✓ (32) · mj-golden-nid ✓ · index ✓ · audit-gabarit 0 bloquant · screenshot vallée relu (Roi remonté, bulle wrap).

## 2026-07-31 — Pack DinoJeux : 6 nouveaux jeux de logique livrés (mj-54..mj-59)

Spec PY « exécute ça » (source copain LLM) → gravée docs/specs/2026-07-31-dinojeux-pack-logique.md avec adaptations MaxPlay (jamais « Bravo Max », vanilla mj-shell, intégration vallée, économie étoiles/œufs existante, accélération runner plafonnée). Fabrication : 6 agents game-dev EN PARALLÈLE, chacun jeu + figée + spec harnais.

- mj-54 Sudoku Dino (4×4 symboles, générateur permutations + unicité backtracking) · mj-55 Équilibre (Takuzu, N1 = une ligne seule = onboarding par le jeu) · mj-56 Les Enclos (N-reines + zones par croissance, feedback rouge doux = teaching) · mj-57 Œufs Surprise (SameGame, fin naturelle jamais de défaite, score en bébés) · mj-58 Dino Run (canvas, saut hauteur variable, trébuche = continue, vitesse plafonnée, jalons illustrés) · mj-59 Territoires (Shikaku, passerelle 1×3).
- VÉRIF DES CLAIMS (feedback_verifier_claims_agents) : 18 fichiers confirmés sur disque + les 6 harnais RE-JOUÉS par le main agent. ATTRAPÉ : mj-54 flaky — forceConflict ne regardait que la ligne 0 (parfois <2 cases libres selon le tirage) → fix cause racine (première ligne à ≥2 cases libres), 6 runs verts consécutifs (1 flake résiduel observé sur 9 runs au total, à surveiller). Bugs auto-corrigés par les agents et documentés : mj-59 passerelle 3×3 insoluble → 1×3 ; mj-57 boucle infinie hook async → Promises ; mj-55 solveCurrent vs roundLock.
- INTÉGRATION : catalog.js 6 entrées (casse : 54/55/56/59 · dinos : 57/58) ; vallée : chaîne Troudi = [54,55, existants, 56,59] et hôte dino = [57,58, existants] (ordre de déblocage de la spec §7 : les nouveaux ouvrent la chaîne — les jeux existants re-passent derrière la séquence 2★, admin unlockAll disponible) ; TITRES + 6 VIGNETTES CSS pur (zéro emoji, ombres + formes).
- Tests post-intégration : audit-gabarit 0 bloquant (37 jeux au menu) · index 16/16 · mur-nid vert (2 flakes de contention Chromium en runs parallèles, verts en séquentiel) · screenshots bulles Troudi (10 jeux, 3 lignes, zéro scroll) + hôte dino relus.

## 2026-07-31 (suite) — Retours playtest PY pack DinoJeux appliqués

mj-54 Sudoku VALIDÉ PY, rien touché. Fixes : mj-58 Rex regardait à gauche → miroir horizontal (il court à droite) · mj-55 niveau « ligne seule » SUPPRIMÉ (PY n'en voyait pas l'intérêt) → 4×4 dès le N0 (9 indices) · mj-56 (le plus retouché) : cases interdites désormais BIEN visibles (assombrissement + croix ✕, l'ancien rouge léger ne se voyait pas), zones IRRÉGULIÈRES à tous les niveaux (fini les quadrants « nuls et durs »), niveau débutant = 1er dino PRÉ-PLACÉ fixe qui montre l'exemple · mj-59 rampe ACCÉLÉRÉE (passerelle = 1 puzzle, la difficulté monte dans la partie : N0 finit en 4×4, N1 en 5×5, N2 en 6×6). Figées amendées datées ×4, specs harnais mises à jour (mj-55 4×4, mj-56 dino guide + interactions au N1), 4 harnais re-joués VERTS, screenshot grille mj-56 relu (guide + ✕ lisibles).

## 2026-08-10 (suite) — Annotations PY vague du jour traitées (phases 2+3)

7 annotations « nouveau » soldées + reliquat 07-27 vérifié. Réparations : mj-57 (LIGNES undefined), mj-28 lampe (ombres noires invisibles → invert), mj-30 (cartes 1 ligne + reprise/échange libres), mj-31 (zéro scroll, permien, phrase 85M ans et finale météorite supprimées), mj-32 (brèche RÉELLE dans le lineart Cryolophosaure → masque dilaté R=7 + snap de graine + palette sans ascenseur). Features : mj-24 (8 consignes FR parlées TTS+MP3 nom, bonus langue étrangère au 3★, réécoute toujours FR), mj-19 (manches dino mélangées aux bus), mj-14 (mode Dinos ombres×couleurs + paliers 3★ + bandeau niveau), mj-15 (niveau H attribut dino régime/époque/famille + bandeau niveau). Règle transverse zéro ascenseur auditée sur les 36 jeux à 480×900 : 36/36 OK (mj-22 pip rogné corrigé). Harnais + audits gabarit verts sur tous les jeux touchés, vérifs visuelles mj-19/14/32 relues. Handoff session sons : 38 MP3 noms dinos à régénérer en FR (dérive affichage FR vs audio latin) + 4 MP3 special-extinction mj-31 orphelins + brèche lineart Cryolophosaure à patcher côté pôle dino.

## 2026-08-11 — Factorisation briques voix (demande PY : corrections réapplicables ?)

Réponse : oui pour 3 patterns, les autres corrections étaient spécifiques. Fait : `TTS.hasVoiceFor()` monté dans js/tts.js (doublons mj-24/mj-20 supprimés) · nouvelle brique `DinoOmbres.annoncer()` + `stopAnnonce()` dans js/dinos-ombres.js (chaîne amorce TTS → MP3 nom, anti-course + filet intégrés) avec mj-24 et mj-19 migrés · mj-20 réparé (speakAsync maison → TTS.speak + onEnd + filet). Probe pip-crop jetable sur les 17 jeux à #pips : 17/17 OK, aucune retouche nécessaire (le fix local mj-22 reste la référence). YAGNI assumé : levelbar et filtre silhouette invert non factorisés (1-2 consommateurs). Harnais mj-19/20/24 verts, audit-gabarit 36 jeux sans bloquant.

## 2026-09-03 — Refonte infra Claude (audit transverse)
- Audit `memory/audits/2026-09-03-archi-claude-infra.md` ; handoff de pôle « mémoire convergente » ouvert dans `studio/minijeux/docs/handoffs/` (pmo/ → memory/ quintette, vague 2). Aucun contenu produit modifié.
