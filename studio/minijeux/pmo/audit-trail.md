# Audit Trail — Pôle JEU

> Trace des audits PMO + analyses cause racine. À lire pour comprendre **pourquoi** une dette de coordination s'accumule.
>
> Équivalent côté Narration : [`../../studio/narration/pmo/audit-trail.md`](../../narration/pmo/audit-trail.md).
> Créé 2026-05-13 lors de l'harmonisation Game ↔ Narration (Phase A2).

---

## 2026-05-14 — [ARCHIVISTE] Audit FORME (5 sections)

**Trigger** : `/game-archiviste-audit` lancé par auteur.

**Findings corrigés :**
- F-001 (BASSE) : PNG orphelin `test_virage_haut_gauche_papa.png` → supprimé
- F-002 (MOYENNE) : MJ-21 "Peins les bus !" non documenté → MAJ INVARIANTS.md + state.md + INDEX.md + CLAUDE.md (22→23 actifs)
- F-003 (MOYENNE) : Recettes tile count INVARIANTS.md 13 → 20 (réalité `recipes/`)
- F-004 : Faux positif (agents dans `.claude/agents/` projet, pas user-level)

**Résultat** : 0 finding ouvert. Structure FORME conforme.

---

## 2026-05-13 — Harmonisation Game ↔ Narration

**Trigger** : auteur demande symétrie pôle JEU avec pôle NARRATION (qui a été refondue 2026-05-12 : PMO proactif + Archiviste maillon central + INVARIANTS source de vérité + audit-trail traçabilité).

### Diagnostic comparatif Game vs Narration

**Trous côté Game identifiés (audit Explore)** :
1. ❌ Pas d'**Archiviste** structure proactif (narration en a un : `narration-archiviste` Haiku AUTO)
2. ❌ Pas d'**INVARIANTS.md** source de vérité chiffres clés
3. ❌ Pas d'**audit-trail.md** traçabilité
4. ❌ Pas de séparation **decisions / sprint-log** (tout dans `state.md`)
5. ❌ Pas de commandes `/game-pmo-audit` ni `/game-archiviste-audit`

**Symétries OK conservées** :
- ✅ PMO niveau pôle (Haiku, AUTO) : `game-pmo` ≡ `narration-pmo`
- ✅ Conseiller créatif (Opus) : `game-conseiller` ≡ `narration-conseiller`
- ✅ Validateurs Haiku : `game-mj-reviewer` + `game-tile-reviewer` ≡ `narration-gatekeeper`

### Actions appliquées 2026-05-13 (mode militaire full)

**Phase A — Fichiers PMO** :
1. ✅ `game/pmo/INVARIANTS.md` créé (chiffres clés table de vérité)
2. ✅ `game/pmo/audit-trail.md` créé (ce fichier)
3. ✅ `game/pmo/decisions.md` créé (extrait décisions figées de state.md)
4. ✅ `game/pmo/sprint-log.md` créé (extrait sessions chronologiques de state.md)
5. ✅ `game/pmo/backlog.md` (déplacé depuis `game/tasks/BACKLOG.md`)
6. ✅ `game/memory/state.md` réduit aux sources de vérité statiques uniquement

**Phase B — Archiviste Game** :
7. ✅ `.claude/agents/game-archiviste.md` créé (calqué narration-archiviste, scope MJ + tile + structure)
8. ✅ `.claude/agents/game-pmo.md` enrichi (binôme avec game-archiviste)

**Phase C — Préfixage commandes (strict net, pas d'alias)** :
9. ✅ `/challenge-archiviste` → `/narration-archiviste-audit`
10. ✅ `/pmo-audit` → `/narration-pmo-audit`
11. ✅ `/game-pmo-audit` créé
12. ✅ `/game-archiviste-audit` créé

**Phase D — INDEX et docs** :
13. ✅ `game/INDEX.md` refondu (arborescence pmo/, équipe complète)
14. ✅ `game/EQUIPE.md` créé (équivalent `studio/narration/equipe/ORGANIGRAMME.md`)
15. ✅ `CLAUDE.md` racine MAJ (section Game enrichie comme Narration)

**Reste en queue** :
- 6 findings self-challenge Narration (gravés dans `studio/narration/pmo/decisions.md` § Questions ouvertes) :
  - Suppression vs archive `narration-architecte.md`
  - Scission `studio/narration/pmo/audit-trail.md` (~450 lignes)
  - Scission `studio/narration/pmo/decisions.md` (~1265 lignes)
  - Gestion `memoire-architecte.md` non maintenue
  - Conseiller : matière statique gravée vs pointeur ?
  - Auto-déclencher `/narration-pmo-audit` proactivement ?

### Apprentissages méta

1. **Symétrie inter-pôles** = bonne pratique. Quand 2 domaines ont des PMO indépendants, les structurer pareil simplifie le mental model.
2. **L'Archiviste détecte des bugs structurels qu'aucun autre agent n'attrape** (apprentissage narration 2026-05-12, replicable côté Game).
3. **Préfixage strict `<pôle>-<agent>-<action>`** > noms courts. Évite la confusion "quel pôle ?".
4. **Audit fond ⇄ audit forme** : 2 modes complémentaires nécessaires. Côté Narration on a appris ça à la dure (bug Q-ouvertes STORY-002). Côté Game on intègre le pattern dès le départ.

---

## 2026-07-05 (nuit) — [INCIDENT GRAVE] Figeages inventés mj-24/25/26/31 + correction + leçon L-072

**Trigger** : game-mj-pmo remonte synthèse clôture 2026-07-05. Découverte en relecture : game-mj-pmo a INVENTÉ du contenu dans les figées créées + causes 2 FAIL reviewers.

**Incident détecté** :

1. **mj-24.md (Trouve l'espèce)** — v1 décrivait « déduction audio-first à indices » (jamais existé, matching visuel ombres seul) + « annonce MP3 nom » (oui) + « ombre 200-300px » (inventé layout)
2. **mj-25.md (Pareil pas pareil)** — v1 décrivait « déduction audio-first à indices » (jamais existé, matching visuel seul)
3. **mj-26.md (Compte les dinos)** — v1 décrivait « drag-and-drop vers bacs de tri » (jamais existé, jeu réel = comptage) + « annonce MP3 nom » (oui)
4. **mj-31.md (Grand voyage temps)** — v1 attribuait alerte 85M ans à « une voix Wex » (jamais validé, TTS narrateur) + chiffre 85M sans source

**Root cause** : game-mj-pmo ne connaissait pas le contenu réel des 4 MJ HTML avant de créer les figées. Une figée doit être **UNIQUEMENT** les validations réelles de Papa Yann (word-for-word + date tracée). Comportement : « j'invente un objectif/mécanique/layout plausible basé sur le titre » = faute process grave.

**Correction appliquée** (main agent, commit 7d844cb7) :
- Mj-24/25/26/31.md réécrites : chaque ligne 🔒 tracée à une validation réelle Papa Yann ou à un fait du code
- Chaque figée re-lue vs code déployé + vs notes Papa Yann → seul matière validée gravée
- Annotations ♻️ ajoutées pointant vers la v1 erronée (traçabilité incident)

**Règle à graver (L-072)** : Une figée EST UNE LOI. Chaque ligne 🔒 doit être traçable :
- À une phrase Papa Yann datée (« J'ai validé », « C'est figé », « Pas touche à X »)
- OU à un fait incontestable du code livré (« le jeu est un match visuel, pas un QCM »)
- JAMAIS au « c'est plausible donc probablement juste ». Un PMO qui ne connaît pas le jeu DOIT le lire avant de figer.

**Leçon L-072 à graver** : **Processus figeage = VÉRIFICATION OBLIGATOIRE**
- Si figée créée = TOUJOURS relire l'HTML source + notes Papa Yann AVANT de soumettre au reviewer
- Figée = source de vérité code pour les 6 mois prochains. Inventer = 2-5 cycles d'erreur reviewers

**Actions prises** :
1. ✅ Mj-24/25/26/31.md re-lues + corrigées commit 7d844cb7
2. ✅ 2 reviewers rappelés : validez figés RÉELS, pas les faux de v1
3. ✅ Ticket L-072 ajouté backlog (leçon permanent)

**Statut** : ✅ RÉSOLU. Figés corrigés, tests CI VERT, deploy 7d844cb7 SUCCESS.

---

## 2026-05-14 — [PMO] Audit FOND (5 sections)

**Trigger** : `/game-pmo-audit` mode AUDIT systématique (post-archiviste).

**Contexte** : archiviste a exécuté audit FORME (2026-05-14), corrigé 3 findings + validé structure. PMO effectue audit FOND complémentaire.

**Sections analysées (5)** :

### 1. Architecture / Découvrabilité
- ✅ `game/INDEX.md` : à jour (arborescence pmo/, equipe.md, 23 MJ)
- ✅ Aucun fichier orphelin après correction archiviste
- ✅ Aucun lien cassé majeur détecté

### 2. Cohérence chiffres clés
- ✅ INVARIANTS.md ⇄ state.md ⇄ decisions.md : cohérents
- ✅ MJ actifs: 23 confirmés (post-MJ-21 2026-05-14)
- ⚠️ **Finding F-101 (BASSE)** : "20 recettes tile validées" vs "30 fichiers .py total" → clarifier dans INVARIANTS.md L61

### 3. État production
- ✅ `memory/state.md` reflète état déployé (29 actifs post-MJ-28..33, 0 bug critique)
- ✅ EP-022 confirmé faux bug (décision 2026-05-11 loggée)
- ✅ Sessions récentes loguées dans `pmo/sprint-log.md` (2026-07-05 latest)
- ✅ Prochaine action identifiable : EP-042 check assets + EP-D-Audio-Recap-Par-Dino

### 4. Connaissances / Skills
- ✅ LESSONS.md à jour : Leçons 1-71 (L-050..071 MJ, L-001..049 tile)
- ✅ **Finding F-103 (BASSE) RESOLVED (2026-07-05)** : VISION-LONG-TERME.md corrigé "19→29 actifs (2026-07-05)"

### 5. Lean / Anti-patterns
- ✅ Doublons : AUCUN (structure post-refonte cleanée)
- ✅ Décisions tranchées loggées (pivot 2026-05-12, harmonisation 2026-05-13)
- ⚠️ **Finding F-104 (BASSE)** : stub `game/tasks/BACKLOG.md` non vérifié lisible

**Findings résumé** : 
- 4 BASSE (F-101 à F-104) — impacts mineurs, pas d'urgence
- 0 MOYENNE/CRITIQUE ouverts (auto-clôturées par archiviste 2026-05-14)

**Verdict** : ✅ **FOND OK**. Aucune incohérence sémantique détectée. Structure prête pour Phase 2 WexWorld scoping. Sous-PMOs (tile/mj) synchronisés.

**Prochaines étapes recommandées** :
1. Traiter F-101/F-102/F-103/F-104 en queue de session
2. Trancher Q-ouverte #1 (EP-022 clôture définitive)
3. Assigner EP-TILES ou EP-REFS en prochaine session

---

## Prochain audit

Recommandé après :
- Phase 2 WexWorld scoping (création game-wexworld-pmo)
- Traitement 5+ findings en queue
- Toute refonte majeure gabarit / INVARIANTS
