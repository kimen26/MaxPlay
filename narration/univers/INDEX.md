# Univers — Index

> Carte du monde narratif. **Ne contient pas de canon** — pointeurs uniquement.

---

## Direction (tranchée 2026-04-17)

**Monde sobre, merveilleux discret.** Vu à travers les yeux d'un enfant né après l'Éveil — rien ne l'étonne parce que c'est tout ce qu'il a toujours connu.

Éléments trop spectaculaires (vélo qui vole, maisons qui changent de forme, ponts de lumière) **écartés**. Le merveilleux passe par des détails quasi-invisibles.

---

## Structure (3 sous-dossiers thématiques)

```
univers/
├── INDEX.md (ce fichier)
├── fondements/         ← lois du monde, échelles cosmiques
├── vie-quotidienne/    ← ce que les enfants vivent au jour le jour
└── meta/               ← architecture du dispositif narratif (cross-culture, naming)
```

### Fondements — lois & échelles du monde

| Fichier | Rôle |
|---------|------|
| [fondements/monde.md](fondements/monde.md) | Événement fondateur (l'Éveil), nature, société, rituels, spiritualité |
| [fondements/systemes.md](fondements/systemes.md) | Conscience Créative, Totems Janus, Égrégores, Gardiens de l'Équilibre |
| [fondements/grand-cycle.md](fondements/grand-cycle.md) | Cycle 22k ans, Yugas adaptés, Ombre Éternelle |
| [fondements/vibration.md](fondements/vibration.md) | Fréquence/amplitude, égrégores, modèle Janus |
| [fondements/sensibilites.md](fondements/sensibilites.md) | **9 Sensibilités** — liste, attribution persos, Wex hors-système, Cercle d'Harmonie |

### Vie quotidienne — ce que les enfants voient

| Fichier | Rôle |
|---------|------|
| [vie-quotidienne/transport.md](vie-quotidienne/transport.md) | **Jabus**, axes verts, technologie non nommée, Ponaire |
| [vie-quotidienne/ecole.md](vie-quotidienne/ecole.md) | Programme scolaire, cours d'Histoire comique, prof Type 7 |
| [vie-quotidienne/geographie.md](vie-quotidienne/geographie.md) | Maille monde, habitat, voyages, échanges culturels |
| [vie-quotidienne/compagnons.md](vie-quotidienne/compagnons.md) | Compagnons ondes / couleurs émotionnelles (jamais animaux) |
| [vie-quotidienne/soin-bioelectrique.md](vie-quotidienne/soin-bioelectrique.md) | **Soin par fréquences** — Chant du Miroir, 4 portes, 5 outils naturels |

### Meta — architecture du dispositif

| Fichier | Rôle |
|---------|------|
| [`../cross-culture/doctrine.md`](../cross-culture/doctrine.md) | **Architecture cross-culture** — Wex archetype universel + 9 ennéatypes invariants × N castings nationaux (décision 2026-04-29, déplacé 2026-05-10 dans pilier `cross-culture/`) |
| [meta/nom-candidats.md](meta/nom-candidats.md) | 5 finalistes pour nommer le monde (non tranché) |
| [meta/directions-brainstorm.md](meta/directions-brainstorm.md) | 6 directions non retenues |

---

## Comment les pièces s'emboîtent

```
       GRAND CYCLE (22k ans)                  ← fondements/grand-cycle.md
              ↓
    Hiver des Ombres (passé)
              ↓
    Grande Tempête de Phos
              ↓
        L'ÉVEIL  ───────── racine du présent
              ↓
    Printemps de l'Éveil (maintenant)         ← fondements/monde.md
              ↓
   ┌──────────┼──────────┬──────────────┐
   ↓          ↓          ↓              ↓
 Société   Nature     Rituels      Vibration    ← fondements/monde.md / vibration.md
   ↓          ↓          ↓              ↓
   └──── Gardiens de l'Équilibre ─────┘         ← fondements/systemes.md
              ↓
         Cercles de Paix
              ↓
        Compagnons (ondes/couleurs)             ← vie-quotidienne/compagnons.md
              ↓
         Totems Janus
              ↓
         Conscience Créative                    ← fondements/systemes.md
```

---

## Questions ouvertes

1. **Nom de l'univers** — voir [meta/nom-candidats.md](meta/nom-candidats.md)
2. **Ombre Éternelle** — concept principal ou standby ? (grand-cycle.md l'ancre comme "nom du cauchemar cosmique")
3. **IA fusionnée avec l'éther** — distillé dans monde.md ou besoin d'un fichier dédié `technologie.md` ?
4. **Question fractale** : les persos savent-ils qu'ils sont dans le rêve de... ? (non terminée)
5. **Cohérence cardiaque** : base scientifique pour vélo-résonance (cf. INBOX 2026-04-17)

---

## Règle d'ajout

- Nouvelle grosse idée cohérente → nouveau fichier thématique dans le sous-dossier qui colle (`fondements/`, `vie-quotidienne/`, ou `meta/`)
- Idée isolée → section dans fichier existant
- Idée brute non tranchée → **INBOX.md** (racine narration), jamais directement ici

> _Restructure 2026-04-30 : passé de 15 fichiers à plat à 3 sous-dossiers thématiques. `baron.md` archivé dans `_archive/narration-reference/`._
