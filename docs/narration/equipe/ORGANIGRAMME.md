# Organigramme — Équipe Éditoriale MaxPlay

> Référence permanente. Mis à jour si l'équipe évolue.
> Dernière mise à jour : 2026-04-26

---

## Vue d'ensemble

```
Auteur (toi)
  ↓ dump brut
input-idees/  (un fichier par session/sujet)
  ↓
DIRECTEUR ÉDITORIAL [narration · Opus]
  ├── Challenge les idées
  ├── Coordonne avec le PMO (`narration-pmo`) sur les tickets
  ├── Simule les lecteurs (profils-lecteurs.md)
  ├── Archive les sessions (archive/)
  ├── Consulte à la demande :
  │     ├── narration-science  [Haiku]
  │     └── narration-sensibilite  [Sonnet]
  └── Produit brief → workshop/<titre>/brief.md
          ↓
  ┌───────┬───────┬───────┐
  ↓       ↓       ↓
Writer A  Writer B  Writer C
[Sonnet] [Sonnet] [Sonnet]
Sobre    Poétique  Dynamique
version-a version-b version-c
  └───────┴───────┴───────┘
          ↓
  DIRECTEUR synthétise → final.md + notes éditoriaux
          ↓
  KEEPER [narration-keeper · Haiku]  (fin de cycle seulement)
  Ennéagramme · Univers · Prénoms → PASS / FAIL
          ↓
  stories/<NNN-titre>/texte.md  (canon)
```

---

## Agents et responsabilités

| Agent | Modèle | Rôle | Mémoire |
|-------|--------|------|---------|
| `narration-pmo` | Haiku | PMO — tickets, decisions, sprint-log, reprise après reboot | — |
| `narration` | Opus | Directeur Éditorial — challenge, briefs, synthèse | `memoire-dir.md` |
| `narration-writer-a` | Sonnet | Writer sobre / Kishōtenketsu classique | `memoire-writer-a.md` |
| `narration-writer-b` | Sonnet | Writer sensoriel / poétique | `memoire-writer-b.md` |
| `narration-writer-c` | Sonnet | Writer dynamique / dialogue | `memoire-writer-c.md` |
| `narration-science` | Haiku | Expert fact-check sciences et biologie | `memoire-science.md` |
| `narration-sensibilite` | Sonnet | Expert sensibilité / topics conspirationnistes | `memoire-sensibilite.md` |
| `narration-keeper` | Haiku | Gardien univers + ennéagramme (fin de cycle) | `memoire-keeper.md` |
| `narration-archiviste` | Haiku | Génère les index `_index/`, structure les dossiers | — |

---

## Fichiers de l'équipe

```
docs/narration/equipe/
├── ORGANIGRAMME.md         ← ce fichier
├── memoire-dir.md          ← décisions Directeur
├── memoire-writer-a.md     ← feedback Writer A
├── memoire-writer-b.md     ← feedback Writer B
├── memoire-writer-c.md     ← feedback Writer C
├── memoire-science.md      ← validations scientifiques
├── memoire-sensibilite.md  ← décisions OUI/NON topics
├── memoire-keeper.md       ← patterns d'erreur détectés
├── sources-sciences.md     ← refs documentaires
├── sources-sensibilite.md  ← catalogue topics sensibles
└── profils-lecteurs.md     ← 4 enfants + 5 adultes + 8 cultures
```

---

## Workflow complet

```
Auteur dumpe → input-idees/YYYY-MM-DD-<sujet>.md
      ↓
PMO scanne → crée tickets dans pmo/backlog.md
      ↓
Auteur choisit un ticket → Directeur challenge, consulte experts si besoin
      ↓
Décision prise → PMO logue dans pmo/decisions.md + pmo/sprint-log.md
      ↓
Directeur crée brief → workshop/<titre>/brief.md
      ↓
Writers A · B · C (indépendants) → 3 versions
      ↓
Directeur synthétise → version finale + notes
      ↓
Keeper valide → PASS → stories/<NNN-titre>/texte.md
      ↓
PMO ferme ticket + session archivée → archive/YYYY-MM-DD-<sujet>.md
```

---

## Règles de la mémoire (non-négociables)

1. Chaque agent **lit sa mémoire en premier** à chaque session
2. Chaque agent **met à jour sa mémoire** après chaque décision importante
3. Les mémoires des writers sont **séparées** — le feedback à A ne s'applique pas à B ou C
4. Les décisions de sensibilité sont **enregistrées avec raison** — jamais juste OUI/NON seul
5. Une session archivée **n'est jamais effacée** — on peut toujours y revenir
