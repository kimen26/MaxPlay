---
titre: Archive templates obsolètes
date_archive: 2026-06-14
---

# Archive — Templates obsolètes (MaxPlay narration)

> Tous les templates de ce dossier sont **obsolètes** et conservés pour **traçabilité historique uniquement**.
> Aucun de ces fichiers ne doit être utilisé dans la fabrication d'une histoire.
> Liens cassés : tous les chemins pointant vers ces fichiers ont été nettoyés dans les INDEX/cartographie/PMO.

---

## Fichiers archivés

| Fichier | Étape (historique) | Raison d'archivage | Remplaçant actuel | Date archivage |
|---------|---|---|---|---|
| `pitch.template.md` | 1 | Fusion avec `plan-histoire.template.md` en `pitch-plan.template.md` (2026-05-12) | `pitch-plan.template.md` | 2026-06-14 |
| `plan-histoire.template.md` | 2 (supprimée) | Étape 2 supprimée par fusion Pitch+Plan (2026-05-12). Contenu fusionné dans `pitch-plan.template.md`. | `pitch-plan.template.md` | 2026-06-14 |
| `brief-univers.template.md` | 3 | Contenu migré dans `saisons/saison-N/arc-N/_writer-system.md` par arc (DEC-WRITER-ARCH-001, 2026-05-15). Ne plus template, mais intégré système contextuel. | `_writer-system.md` par arc | 2026-06-14 |

---

## Nettoyage références (ARCHI-CLEAN-TEMPLATES, 2026-06-14)

**Fichiers purgés** :
- ✅ `equipe/cartographie-domaines.md` — L.133 remise à jour
- ✅ `equipe/INDEX.md` — L.42-44 remise à jour, ajout `pitch-plan.template.md` actif
- ✅ `equipe/templates/README.md` — tableau principal refondé, historique en mises-à-jour
- ✅ `equipe/templates/brief-writer-guide.template.md` — clarification lien `brief-writer-libre.template.md` ACTIF
- ✅ `equipe/leçons-vivantes.md` — annotation refs briefs writers
- ✅ `pmo/sprint-log.md` — ticket marqué FAIT

**Vérification finale** : `brief-writer-libre.template.md` confirmé ACTIF — PAS archivé (injecté dans prompts MCP writers étape 4).

---

## Contexte historique (pour traçabilité)

### Fusion étape 1-2 (2026-05-12)

La refonte 2026-05-12 a fusionné l'étape 1 (Pitch) et l'étape 2 (Plan) en une seule étape, créant `pitch-plan.template.md` pour remplacer les deux anciens templates. L'agent **Architecte** (propriétaire historique de l'étape 2) a été **deprecated** et son rôle intégré au **Conseiller**.

Décision parent : évaluation phases 3-4 (001-004) montrait que séparer pitch et plan introduisait un délai artificiel sans apport créatif mesurable. Fusion validée pour filer direct vers les briefs univers/personnages/histoire (étape 3).

### Archivage contenu `brief-univers` (2026-05-15)

L'étape 3 a été restructurée (DEC-WRITER-ARCH-001, 2026-05-15) : les "règles univers stateless" (ancien template `brief-univers.template.md`) se sont révélées **contexte-dépendant** par arc narratif (pas universel cross-histoires). Solution : créer `_writer-system.md` **par arc** (ex: `saisons/saison-1/arc-1/_writer-system.md`) contenant les règles univers permanentes du contexte, **injectées dans le system prompt de TOUS les writers** (Claude + MCP). Template générique inutile dès lors → archivé.

Historique décision : [`pmo/decisions.md`](../../pmo/decisions.md) 2026-05-15 § DEC-WRITER-ARCH-001.

---

_Archivé 2026-06-14 par narration-archiviste. Aucun lien vivant ne pointe vers ce dossier (grep confirmé)._
