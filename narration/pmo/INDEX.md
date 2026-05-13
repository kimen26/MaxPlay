# PMO Narration — Index

> **Point d'entrée PMO.** Charger ce fichier pour avoir l'état complet du projet narration.
> Le PMO ne crée pas de contenu narratif — il gère l'avancement, les décisions et la traçabilité.

---

## État instantané

| Axe | Statut |
|-----|--------|
| Histoires canon | 1 — *Le Pont Cassé* (001, refonte 2026-05-08) |
| Histoires en production | 1 — *Libellule Résonance* (002, étape 4 prête à lancer) |
| Axes en stock | 15 (10 unitaires + 5 transversaux) |
| Personnages | 9 + Wex — casting V1 figé (2026-04-24) |
| Voix ElevenLabs | **6/10 figées** — **5 garçons complet** (Wex/Dadou/Melki/Pierrot/Lulu/Nono) + Raph. Reste 3 filles (Mimi/Madie/Juju) |
| Nom univers | ❌ non tranché — 5 finalistes |
| Prochaine action | **Lancer étape 4 STORY-002** (10 writers) — Q-ouvertes tranchées 2026-05-12, étapes 0/1/3 ✅ |

---

## Fichiers PMO

| Fichier | Rôle |
|---------|------|
| [**INVARIANTS.md**](INVARIANTS.md) | 🆕 **Source de vérité chiffres clés** (10 versions / 20 lecteurs / casting / voice_ids / règles d'or) |
| [backlog.md](backlog.md) | Tickets actifs (max 3 en cours) + terminés |
| [decisions.md](decisions.md) | Décisions définitives + questions ouvertes |
| [sprint-log.md](sprint-log.md) | Journal de sessions — fait / à faire / blocages |
| [roadmap.md](roadmap.md) | Vision moyen terme (horizons 3-6-12 mois) |
| [audit-trail.md](audit-trail.md) | 🆕 Traces audits PMO + analyses cause racine |

---

## Règles PMO

1. **Max 3 tickets actifs** en même temps — au-delà, finir avant d'ouvrir
2. **Chaque décision** va dans `decisions.md` avec date + contexte + raison
3. **Chaque session de travail** laisse une trace dans `sprint-log.md` (même courte)
4. **Un blocage** = une ligne dans sprint-log + statut `🔴 BLOQUÉ` dans backlog
5. **Un reboot/reprise** = lire `sprint-log.md` en premier, puis `decisions.md`
6. **Rien n'est effacé** — les tickets terminés restent en bas du backlog

---

## Comment reprendre après une interruption

1. Lire `sprint-log.md` — dernière session : qu'est-ce qui était en cours ?
2. Lire `decisions.md` — quelles décisions sont figées ?
3. Lire `backlog.md` — quel ticket est prioritaire ?
4. Lire `narration/INDEX.md` — état du projet narration complet
5. Reprendre le ticket en cours ou demander au Directeur de challenger le suivant
