# Sprint Log — PMO Narration

> Journal de bord des sessions.
> **En cas de reboot :** lire la dernière entrée (haut du fichier), section "État au reboot".
> Les entrées les plus récentes sont en haut.

---

## 2026-04-28 — STORY-003 "La Confidence" — Pipeline complet 8 writers

**Objectif :** Lancer STORY-003 avec le nouveau workflow 8 writers + angles assignés.

**Fait :**
- [x] 3 briefs produits (univers + personnages + histoire) dans `workshop/003-la-confidence/`
- [x] 8 versions écrites parallèlement (Kimi 1/2 · DeepSeek 1/2 · Grok · Claude Libre · Claude Dialogue · Claude Ancré)
- [x] Synthèse Directeur : analyse comparative des 8 versions
- [x] version-finale.md rédigée (~520 mots · Wex · Jérem · Raph)
- [x] Relecture simulée (Kimi + Claude) — 5 remarques prioritaires
- [x] Keeper PASS — 8/8 critères validés
- [x] Longueur : ~520 mots (fourchette 400-700 ✅)
- [x] Dialogues : Jérem 6 répliques, Wex 7, Raph 2 ✅

**À faire :**
- [ ] Canonisation (texte.md + README.md + orchestration.md)
- [ ] Comité de lecture (optionnel — 3ème histoire de la série, pas de nouveau perso principal)
- [ ] Mémoires à mettre à jour (conseiller + architecte + dir + gatekeeper)
- [ ] Index à régénérer

**Notes process :**
- Premier test du workflow 8 writers — fonctionnel
- Claude Dialogue très courte (157 mots) mais pertinente comme variant
- Kimi MCP toujours non testé — versions Kimi simulées par le Directeur
- Pattern "objet porteur" confirmé (dessin plié en quatre)
- Pattern "son qui porte" : zip cliqueta, papier craqua

**État au reboot :**
- STORY-003 en attente de canonisation
- 8 versions disponibles dans `workshop/003-la-confidence/`
- version-finale.md prête pour comité ou canon direct

---

## 2026-04-28 — Process complet · Série Parole · STORY-002

**Objectif :** Rodage du workflow éditorial complet. Écriture et canonisation de l'histoire 002.

**Fait :**
- [x] Création agents `narration-writer-claude-libre` + `narration-writer-claude-ancre` + `memoire-writer-ancre.md` *(anciens agents supprimés le 2026-04-28 — voir ARCHI-005)*
- [x] Création briefs stateless : `equipe/brief-univers.md` · `brief-personnages-template.md` · `brief-histoire-template.md` *(remplacés par `workshop/_gabarit/plan-histoire.md` le 2026-04-28 — voir ARCHI-005)*
- [x] ARCHI-004 soldé (process 5 writers — remplacé par ARCHI-005 à 4 writers)
- [x] Tickets STORY-002 à 006 ouverts (série "La Parole")
- [x] STORY-002 "Le Rire qui reste" — process complet : briefs → 5 writers → synthèse → relecture → GateKeeper PASS → canon
- [x] stories/002-le-rire-qui-reste/texte.md canonisé (489 mots · Wex · Nono · Polo)
- [x] STORY-003 "La Confidence" ouvert en cours

**À faire :**
- [ ] STORY-003 La Confidence (Wex · Jérem · Raph) — prochain cycle
- [ ] STORY-004 à 006 en file
- [ ] STORY-001-V2 en attente auteur

**Notes process :**
- Kimi MCP non fonctionnel (2 appels = vide) — à investiguer
- Décision éditoriale : pas d'épilogue italique à partir de 002 (Le Pont Cassé seul avec cette structure)

---

## 2026-04-27 — Architecture + setup PMO

**Objectif :** Nettoyer la structure docs/, créer le rôle PMO, trier les inputs.

**Fait :**
- [x] Pull git — 7 fichiers input-idees reçus (~2000 lignes : ennéatypes symboliques + JP Petit)
- [x] Suppression `histoires/` legacy → `axes-histoires-en-stock.md` migré dans `stories/`
- [x] Archive `UNIVERS-NOTES-BRUTES.md` → `archive/2026-04-13-univers-notes-brutes.md`
- [x] Suppression `docs/univers/` (dossier vide après archivage)
- [x] Création `game/docs/jeux/INDEX.md` (agent-ready)
- [x] Suppression `TODO-EDITORIAL.md` (doublon) + `atelier/` (doublon de `workshop/`)
- [x] Création `narration/pmo/` (INDEX, backlog, decisions, sprint-log, roadmap)
- [x] Création agent `narration-pmo`
- [x] Mise à jour `narration/INDEX.md` + `README.md` + `ORGANIGRAMME.md`
- [x] Agent `narration.md` mis à jour (chemins corrigés)

**À faire (prochaine session) :**
- [ ] INPUT-001 : distiller les 7 fichiers input-idees — trier par thème (ennéagramme symbolique / JP Petit)
- [ ] STORY-001-V2 : appliquer 3 modifs comité sur Pont Cassé
- [ ] Tester workflow PMO → Dir → 4 writers → GateKeeper sur un vrai brief

**État au reboot :**
- PMO opérationnel, structure propre
- 7 fichiers input-idees non distillés — contenu riche (ennéatypes, JP Petit, voix ElevenLabs)
- STORY-001 V2 en attente depuis 2026-04-24

---

## 2026-04-26 — Restructuration narration

**Objectif :** Migrer vers `stories/`, activer pipeline éditorial complet.

**Fait :**
- [x] Structure `stories/`, `workshop/`, `editorial-board/` *(supprimé le 2026-04-28, remplacé par `pmo/`)*, `_index/`
- [x] Template `_gabarit/`
- [x] Migration *Le Pont Cassé* → `stories/001-le-pont-casse/`
- [x] Scripts `new-story.js`, `archive-story.js`, `generate-index.js`
- [x] Mémoires writers + agent `narration-archiviste`
- [x] Premiers index `_index/` générés

**État au reboot :**
- Pipeline actif mais jamais testé end-to-end
- Writers externes + GateKeeper : jamais utilisés sur vrai brief avant le 2026-04-28

---

## 2026-04-24 — Casting V1 + comité Pont Cassé

**Objectif :** Figer casting, valider V1.

**Fait :**
- [x] Casting "Christ" validé (Wex + 9 Titi, prénoms bibliques)
- [x] Comité de lecture V1 — 3 modifs identifiées
- [x] Décision univers implicite + ennéatypes dilués

**État au reboot :**
- Casting figé (voir `decisions.md`)
- STORY-001-V2 ouvert
