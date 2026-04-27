# Backlog PMO Narration

> **Règle :** 3 tickets actifs maximum. Pas plus.
> **Format :** `STATUT | ID | Titre | Priorité | Assigné | Prochaine action`
>
> Statuts : 🟡 En cours · ⚪ À faire · 🔴 Bloqué · ✅ Terminé

---

## En cours

| Statut | ID | Titre | Priorité | Assigné | Prochaine action |
|--------|-----|-------|----------|---------|------------------|
| 🟡 | STORY-001-V2 | Le Pont Cassé — V2 | Haute | Auteur | Appliquer 3 modifs comité (voir `stories/001-le-pont-casse/comite-lecture/v1-retours.md`) |

---

## À faire

| Statut | ID | Titre | Priorité | Assigné | Prochaine action |
|--------|-----|-------|----------|---------|------------------|
| ⚪ | ARCHI-004 | Refonte équipe writers — 5 writers + relecteurs externes | Haute | — | Créer agents claude-libre + claude-ancré · prompts templates externes · MCP tools (voir ORGANIGRAMME.md § À implémenter) |
| ⚪ | UNIVERS-001 | Trancher nom de l'univers | Normale | Auteur | Choisir parmi 5 finalistes (`univers/nom-candidats.md`) |
| ⚪ | STORY-002 | H-02 — histoire unitaire Mimi (Titi2) | Normale | — | Valider grille candidature (axes-histoires-en-stock.md) |
| ⚪ | STORY-003 | T-01 — axe transversal "pluie" | Basse | — | Choisir duo/trio + objet |

---

## Terminés

| Statut | ID | Titre | Date |
|--------|-----|-------|------|
| ✅ | STORY-001-V1 | Le Pont Cassé — V1 + comité de lecture | 2026-04-24 |
| ✅ | ARCHI-001 | Restructuration narration (stories/, pmo/, équipe) | 2026-04-27 |
| ✅ | ARCHI-002 | Suppression histoires/ legacy + migration axes-en-stock | 2026-04-27 |
| ✅ | ARCHI-003 | Nettoyage docs/ (dead code, refs orphelines) | 2026-04-27 |
| ✅ | INPUT-001 | Distillation INBOX 2026-04-27 → univers/ (transport, sensibilités, école, géographie) | 2026-04-28 |
| ✅ | INPUT-002 | Symbolique ésotérique → Eneagramme/symbolique.md (pierre, astre, couleur) | 2026-04-28 |
| ✅ | INPUT-003 | Voix ElevenLabs → equipe/voix/ (10 fichiers, 4 couches × 9 types + Wex) | 2026-04-28 |
| ✅ | PERSO-001 | Restructuration personnages multi-pays (type-NN/, wex/, lookup.yml, identite.md) | 2026-04-28 |

---

## Comment créer un ticket

1. Identifier la source : axe stock, dump input-idees/, décision à prendre
2. Vérifier qu'il y a < 3 tickets actifs — sinon attendre
3. Ajouter une ligne dans "À faire" avec un ID unique (`STORY-NNN`, `PERSO-NNN`, `UNIVERS-NNN`, `ARCHI-NNN`)
4. Quand démarré : déplacer dans "En cours" + mettre à jour `sprint-log.md`
5. Quand terminé : déplacer dans "Terminés" avec date
