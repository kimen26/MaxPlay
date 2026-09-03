# Archive Backlog — Tickets fermés + notes de session (Narration, 2026)

> ⚠️ **Archive verbatim, ne pas réécrire.** Rotation HO-NAR-01 (2026-09-03) : section « Terminés » + « Notes de session » + « Comment créer un ticket » déplacées telles quelles depuis `pmo/backlog.md`. Les tickets ouverts vivent désormais dans `../TODO.md`.

---

## Terminés

| Statut | ID | Titre | Date |
|--------|-----|-------|------|
| ❌ | VOIX-001 | Agent `voice-director` séparé — **ANNULÉ** (décision 2026-07-27, INVARIANTS : pas d'agent dédié, le markup se fait dans la chaîne de production) | 2026-07-27 |
| ✅ | VOIX-002 | voice_id des 2 narrateurs — `narrateur_h` et `narrateur_f` présents dans `voix-meta/voice-map.json` (MAJ 2026-05-16). Clôture déjà décidée le 2026-07-27, perdue dans l'incident de réécriture du backlog ; **revérifiée sur pièce le 2026-08-10** | 2026-05-16 |
| ✅ | VOIX-003 | voice_id des 10 persos + Wex — les 12 rôles résolvent dans `voice-map.json`. Même historique de clôture que VOIX-002, **revérifié sur pièce le 2026-08-10** | 2026-05-16 |
| ✅ | TEST-PANEL-CALIBRATION | Test calibration panel 12 (2 paires benchmarks) — PASS 2/2 | 2026-07-04 |
| ✅ | ARCHI-DUEL-001 | MVP « Duel de goût » — site/duel.html + site/duel-data.js (livré v2 redesign raisons refus) | 2026-07-03 |
| ✅ | ARCHI-LECTURE-001 | Nouvel outil « Lecture annotée » — site/lecture.html (annotation 1re lecture) | 2026-07-03 |
| ✅ | ARCHI-014-TEMPLATE-BOUSSOLE | Adapter template brief-histoire.md = BOUSSOLE (DEC-BRIEF-CURSEUR) | 2026-07-04 |
| ✅ | CRAFT-001 | Créer skill parent `narration-craft/` + sous-structure 16 domaines | 2026-06-03 |
| ✅ | CRAFT-002 | Extraire + remapper 16 skills depuis deprecated | 2026-06-03 |
| ✅ | CRAFT-003 | Implémenter câblage PROCESS : étapes 2B/3/7/10 | 2026-07-04 |
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

## Notes de session

- 2026-08-10 (CORRECTION PY + TICKETS PÉRIMÉS DÉTECTÉS) : PY corrige — **les voix du site sont et restent narrateur_h, narrateur_f et wex**, il n'y a pas d'élargissement du casting à 5+ voix (ma note précédente du même jour était une sur-interprétation, écartée). PY demande aussi de vérifier les voice_id plutôt que de les déclarer manquants : **vérification faite dans `personnages/voix-meta/voice-map.json` (résolveur autoritaire, MAJ 2026-05-16)** — les 12 voice_id existent, `narrateur_h` = cbRc…, `narrateur_f` = aHKE…, `wex` = G54e…, plus les 10 persos du casting V1. **Conséquence PMO : `VOIX-002` (créer les voice_id des 2 narrateurs) et `VOIX-003` (créer ceux des 10 persos) sont PÉRIMÉS — le travail est fait**, ils restent listés « à faire » à tort dans ce backlog. À reclasser en ✅ après contrôle du narration-pmo. Leçon : un ticket « à faire » qui dort pendant des mois doit être re-confronté au disque avant d'être cité comme bloquant (même motif que EP-D19 côté dino, ticket « bloqué quota » alors que le travail était sorti).
- 2026-08-10 (DÉCISION PY — doublon multilingue restreint) : le doublon multilingue des encouragements se fera **sur les POSITIFS UNIQUEMENT** (16 mots), pas sur les 6 mots de consolation — on ne redouble pas un moment de frustration, on le passe vite. Langues invitées : brésilien, anglais, japonais, chinois, italien, espagnol. Toujours la même intention, jamais du mot à mot.

- 2026-08-10 (IDÉE PY — élargir le casting de voix des encouragements, impact NARRATION) : les réactions d'encouragement du site (`site/sounds/voix/{f,h,wex}/`, 22 mots) n'ont aujourd'hui que **3 voix** — narrateur_f, narrateur_h, wex, toutes résolues via `personnages/voix-meta/voice-map.json`. PY veut **5+ voix** pour que ça sonne naturel et humain, mélange assumé du casting. **Impact narration** : il faut décider QUELLES voix ajouter — des persos du casting V1 (Melki, Mimi, Raph…) ou des voix neuves hors-casting ? Si ce sont des persos, cela crée leur **première existence sonore** hors histoire, ce qui n'est pas neutre (un perso qui dit « bravo » dans un mini-jeu sans jamais être apparu dans un récit). Rappel : VOIX-002 (voice_id des 2 narrateurs) et VOIX-003 (voice_id des 10 persos) sont encore **à faire** — donc l'élargissement dépend d'eux. **Second volet PY** : doubler chaque encouragement dans une autre langue (brésilien, anglais, japonais, chinois, italien, espagnol), **même intention, jamais mot à mot**, drapeau affiché — ce qui rejoint la doctrine cross-culture (on ne traduit pas une émotion, on la ré-exprime). Détail + typologie : [`memory/ARCHI-REFERENTIEL-CONTENU.md`](../../../memory/ARCHI-REFERENTIEL-CONTENU.md) · capture jeu : `studio/minijeux/pmo/backlog.md` même date.

---

## Comment créer un ticket

1. Identifier la source : axe stock, dump INBOX.md, décision à prendre
2. Vérifier qu'il y a < 3 tickets actifs — sinon attendre
3. Ajouter une ligne dans "À faire" avec un ID unique (`STORY-NNN`, `PERSO-NNN`, `UNIVERS-NNN`, `ARCHI-NNN`)
4. Quand démarré : déplacer dans "En cours" + mettre à jour `sprint-log.md`
5. Quand terminé : déplacer dans "Terminés" avec date

- 2026-07-19 (session nettoyage GED) : audit narration — 2 orphelins a supprimer apres validation (pmo/KANBAN.md nomenclature fantome, equipe/pipeline-realite.md constat infra perime) ; inbox en derive (regle 48h violee 5-8 sem : INPUT-004/005 jamais executes, lot 28-cultures ~900Ko sans ticket dedie — rattacher a UNIVERS-004/005 ou creer ticket) ; encodage mojibake sur inbox/culture*.md a corriger lors distillation ; _archive stories + equipe = sains, ne pas toucher.

- 2026-07-19 (nettoyage GED, tour 4 atteignabilite) : agents fantomes corriges (equipe/INDEX + ORGANIGRAMME : narration-archiviste -> narration-pmo unifie ; lien memoire-architecte -> _archive/) ; arcs-narratifs.md + brief-univers.md ajoutes a equipe/INDEX. Inbox 28-cultures (Q10) toujours en attente de distillation (INPUT-004/005).

- 2026-07-19 (nettoyage GED, tour 6) : pmo/audits/ cree — test-calibration-panel range en audits/2026-07-04-test-calibration-panel.md (ref sprint-log corrigee), conforme norme DOCTRINE audits.

- 2026-07-19 (nettoyage GED, tour 7 ecosysteme) : fantomes narration-archiviste/architecte purges des docs vivantes (equipe/INDEX arbre de decision, cartographie-domaines, ORGANIGRAMME Sonnet, templates/README, README pole, rules/stories-process) -> narration-pmo unifie Sonnet / narration-conseiller.

- 2026-07-19 (nettoyage GED, tour 8) : INBOX.md lien _inbox corrige -> inbox/ ; sources-narratologie lien architecture-cross-culture -> cross-culture/doctrine.md ; PROCESS.md chemin rules/audio.md corrige.

- 2026-07-19 (regle re-affirmee) : jamais Max ni rapport Bresil dans le contenu narre (deja L-feedback_jamais_nommer_max_contenu) — scan produit en cours cote jeu+narration.

- 2026-07-19 (scan Max/Bresil) : canon stories 10-texte.md + segments JSON = 0 occurrence, narration PROPRE. Rien a corriger cote narration.

- 2026-07-19 (DECISION Papa Yann) : la marque produit reste MaxPlay ; l univers NARRATION dans MaxPlay s appellera WEX WORLD (confirme piste project_wex_world_observateur — Wex observateur quantique). Tenant narration a venir dans site/ sous ce nom.
- 2026-07-25 (retour PY, outil relecture) : le menu parent de relecture des histoires n affiche toujours PAS toutes les histoires a relire avec numero + titre + variances (top 5/10). A corriger + repenser le design UX/UI pour une relecture fluide et intuitive (interactions). Annotation Supabase id 3 (game_id=lecture, story 002-libellule vague 6) toujours en status nouveau — meme outil.
- 2026-07-25 (inventaire 8 stories pour outil relecture) : classements panel dispo partout SAUF anomalies — 002 : versions writers vague 6 ABSENTES du niveau courant (archivees, lecture-data.js seule source des textes top 3 ; _archive/vague-6-writers-full mentionne au kanban mais introuvable) ; kanbans 004 et 008 DESYNCHRONISES (etapes marquees non-faites alors que writers + syntheses existent) ; deepseek-reco corrompue sur 003/004/005 (exclue, versions regenerees jamais re-jugees) ; 006/007/008 corpus ampute versions kimi (quota 2026-07-11) ; seul canon existant = 001 (10-texte.md), tous les autres 10-texte = gabarits vides. Etape 6 lancee nulle part sauf 001 terminee.

- 2026-07-27 (DECISION Papa Yann, session Kimi Code) : autonomie lecture/ecriture TOTALE accordee a l'agent en mode NARRATION, en accord avec le PMO — plus de validation demande par demande. Mise en oeuvre : `~/.kimi-code/config.toml` + 11 regles `[[permission.rules]]` scope=project (allow Read/Write/Edit/Glob/Grep/Bash/TodoList + MCP llm-copains/supabase/elevenlabs, deny `rm -rf`). Mode global deja `yolo`. Backup horodate cree. Exceptions conservees : checkpoints auteur du PROCESS (etapes 1/2/6/10) confirmes en texte, questions en texte (jamais AskUserQuestion), git mutations toujours confirmees. ⚠️ Reconstruite 2026-08-10 (incident restauration).

- 2026-07-27 (AUDIT cartographique complet, session Kimi Code) : méga état des lieux du pôle livré → `pmo/audits/2026-07-27-etat-des-lieux-cartographie.md`. 6 zones auditées (gouvernance/PMO, personnages/univers/memory, cross-culture/saisons, stories/equipe/gout/visuel, outillage rules/skills/agents, archives). Verdict : ossature saine, signalétique en dérive. 7 décisions Papa Yann requises (D1 fork sensibilités T6/T8, D2 graver WEX WORLD, D3 canon 001 chaîne perdue, D4 002 vague-6 refs fantômes, D5 Wex sensibilité, D6 rotation logs PMO, D7 prénoms brésiliens). Plan 3 phases : 1 = ~60 réparations mécaniques, 2 = décisions gravées + canon, 3 = structure durable (compteurs générés, conventions archive, parité Kimi). ⚠️ Reconstruite 2026-08-10.

- 2026-07-27 (phase 1 post-audit, Agent C) : backlog réécrit propre + converti LF (CRLF + CR isolés corrigés). 5 ✅ sortis de « En cours » ; doublons purgés (TEST-PANEL-CALIBRATION, ARCHI-006 ×2, ARCHI-014, CRAFT-001/002/003, CROSS-002/003/004) ; ARCHI-009 PIPELINE-MEMORY renommé ARCHI-009B ; VOIX-001 annulé (INVARIANTS : pas d'agent voice-director séparé) ; VOIX-002/003, UNIVERS-001 (WEX WORLD), PROPAGATE-DEC-PANEL clos ; STORY-003..010 fusionnés en STORY-PIPELINE-S1 ; INPUT-006 créé (lot 28-cultures) ; AUDIO-SCRIPT-V2 + NARR-002 rangés en Terminés (règle du fichier). ⚠️ Reconstruite 2026-08-10 — **effet perdu dans l'incident : le backlog actuel reste l'ancien + notes, la réécriture structurelle n'a PAS été rejouée**.

- 2026-07-27 (PHASE 1 TERMINÉE, ~60 réparations exécutées, session Kimi Code) : **A** decisions canon (DEC-SENSIBILITES-T6-T8 + DEC-UNIVERS-NOM gravées, SUPERSEDED 2026-04-28 annoté, camp A aligné templates/gabarits) · **B** panel 12 calls propagé (PROCESS/ORGANIGRAMME/rules/profils-lecteurs migré panel 12, duel retiré, gout/README pointe retours/) · **C** PMO (backlog réécrit, INVARIANTS état réel, INBOX marqueurs, pmo/INDEX +audits/) · **D** piliers (personnages/INDEX compteurs 274/31 + gabarit alive, voix-meta README 4 entrées, notation-types→archive/, 5 liens soin-bioelectrique réparés, prenoms/INDEX france.md +29 et compteurs réels + bandeau D7 réserve non validée, doublons Ravi/Mariam annotés, doctrine.md 11 liens réparés, onomatopées 20 pivots +#28, saisons état réel 002-008 étape 5 ✅) · **E** stories/equipe (kanbans 003-008 étape 5 ✅ + Panel 12, README statuts lecteurs + slug 005, stories/INDEX prochaine 009 + P1-P13, equipe/INDEX fichiers manquants indexés + conventions 14 writers/10-texte.md, lecons-vivantes NEL purgés + P8-P10 renumérotés P11-P13 collision résolue, brief-univers archivé, visual-identity état honnête) · **F** outillage (archive/README refondu INDEX 17 entrées datées+raisons, narration-reference/INDEX +baron.md, mojibake réparé ×3 — inbox culture faune/flore + jeu/repas via latin-1, échange Telegram via ftfy, CLAUDE.md 5 correctifs) · **G** rotation logs PMO (D6) : decisions 3712→627 l. / sprint-log 2308→422 l. / audit-trail 935→6 l., verbatim versé dans `pmo/archive/*-2026-H1.md` + INDEX + 15 références entrantes annotées. Matière brute repérée consignée dans `pmo/matiere-a-distiller.md`. ⚠️ Reconstruite 2026-08-10 (effets partiellement perdus, cf. note incident).

- 2026-07-28 (PHASES 2+3 cartographie TERMINÉES, session Kimi Code) : **P2 gabarit dépollué** (24 fichiers supprimés dans 003-008 — 3 templates OBSOLETE + christ.patch md5-identiques ×6, 3 purgés du gabarit, `_writer-package-OBSOLETE` déplacé en exemplaire unique dans `equipe/templates/_archive/`, convention `variantes-culturelles/README.md` écrite avec `base: fr`, bandeaux ⚠️ COQUILLE ×14 sur `6-selection.md`/`10-texte.md` + « 14 versions writers + 12 calls ») · **P3 structure durable** (`scripts/check-compteurs.js` — prénoms 274/31, onomatopées 37/20, craft 18, stories — testé 0 dérive, exit 1 branchable ; convention archive + règle compteurs gravées dans `memory/DOCTRINE.md` ; purge 83 permissions + 5 additionalDirectories mortes dans `.claude/settings.json` avec backup horodaté ; parité Kimi `figees-injector.kimi.ps1` étendue aux 5 rules narration, testée 5 cas). ⚠️ Reconstruite 2026-08-10 (effets perdus, rejoués ce tour).

- 2026-08-10 (INCIDENT + RECONSTRUCTION, session Kimi Code) : restauration externe du working tree (hors git, mécanisme non identifié) entre le 28-07 soir et ce jour → modifs texte des phases 1-2-3 revertées, puis ~40 commits dino/mj/vallée/lunii ont gravé le mélange ; fichiers CRÉÉS survivants absorbés par commit 5d01fcd4. Rejoué : sprint-log (5 entrées + rotation, partition vérifiée), decisions (2 DEC + SUPERSEDED), backlog (ces notes), DOCTRINE, hook Kimi, purge settings, phase 2, compteurs INDEX. NON rejoué : réécriture structurelle backlog (note Agent C), rotations decisions/audit-trail (archive intacte, courants restés longs), correctifs fins phase 1 (liens doctrine.md, soin-bioelectrique, références entrantes, mojibake) à re-vérifier. Leçon **L-INCIDENT-RESTAURATION** : proposer le commit des traces PMO EN FIN DE TOUR. Détail : sprint-log entrée 2026-08-10.
