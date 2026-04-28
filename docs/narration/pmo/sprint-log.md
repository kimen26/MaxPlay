# Sprint Log — PMO Narration

> Journal de bord des sessions.
> **En cas de reboot :** lire la dernière entrée (haut du fichier), section "État au reboot".
> Les entrées les plus récentes sont en haut.

---

## 2026-04-28 — Process complet · Série Parole · STORY-002

**Objectif :** Rodage du workflow éditorial complet. Écriture et canonisation de l'histoire 002.

**Fait :**
- [x] Création agents `narration-writer-claude-libre` + `narration-writer-claude-ancre` + `memoire-writer-ancre.md`
- [x] Création briefs stateless : `equipe/brief-univers.md` · `brief-personnages-template.md` · `brief-histoire-template.md`
- [x] ARCHI-004 soldé (nouveau process 5 writers opérationnel)
- [x] Tickets STORY-002 à 006 ouverts (série "La Parole")
- [x] STORY-002 "Le Rire qui reste" — process complet : briefs → 5 writers → synthèse → relecture → Keeper PASS → canon
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
- [x] Création `docs/jeux/INDEX.md` (agent-ready)
- [x] Suppression `TODO-EDITORIAL.md` (doublon) + `atelier/` (doublon de `workshop/`)
- [x] Création `docs/narration/pmo/` (INDEX, backlog, decisions, sprint-log, roadmap)
- [x] Création agent `narration-pmo`
- [x] Mise à jour `narration/INDEX.md` + `README.md` + `ORGANIGRAMME.md`
- [x] Agent `narration.md` mis à jour (chemins corrigés)

**À faire (prochaine session) :**
- [ ] INPUT-001 : distiller les 7 fichiers input-idees — trier par thème (ennéagramme symbolique / JP Petit)
- [ ] STORY-001-V2 : appliquer 3 modifs comité sur Pont Cassé
- [ ] Tester workflow PMO → Dir → Writer A/B/C → Keeper sur un vrai brief

**État au reboot :**
- PMO opérationnel, structure propre
- 7 fichiers input-idees non distillés — contenu riche (ennéatypes, JP Petit, voix ElevenLabs)
- STORY-001 V2 en attente depuis 2026-04-24

---

## 2026-04-26 — Restructuration narration

**Objectif :** Migrer vers `stories/`, activer pipeline éditorial complet.

**Fait :**
- [x] Structure `stories/`, `workshop/`, `editorial-board/`, `_index/`
- [x] Template `_gabarit/`
- [x] Migration *Le Pont Cassé* → `stories/001-le-pont-casse/`
- [x] Scripts `new-story.js`, `archive-story.js`, `generate-index.js`
- [x] Mémoires writers A/B/C + agent `narration-archiviste`
- [x] Premiers index `_index/` générés

**État au reboot :**
- Pipeline actif mais jamais testé end-to-end
- Writers A/B/C, Keeper : jamais utilisés sur vrai brief

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
