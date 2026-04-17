# Narration — Index agent

> **Charger ce fichier en premier.** Lire les sous-fichiers seulement si la tâche le nécessite.
> Taille cible : 1 page. Ne pas allonger.

---

## État du projet

| Quoi | Statut |
|------|--------|
| Personnages | 9 définis (ennéagramme) — ⚠ **prénoms en cours de validation** (seul Wex #7 confirmé) |
| Univers | post-Éveil, Printemps de l'Éveil — distillé dans `univers/` |
| Direction | **monde sobre, merveilleux discret** (vu à travers enfant né dedans) |
| Histoires | "Le Pont Cassé" (Wex + Élia + Sam) — V1 complète, comité de lecture fait |
| Nom univers | **non tranché** → `univers/nom-candidats.md` |

---

## Carte des fichiers

### Racine
| Fichier | Rôle |
|---------|------|
| [README.md](README.md) | Vue projet pour humain |
| [INBOX.md](INBOX.md) | **Dump brut** — hook commit auto sur modification |

### Personnages
| Fichier | Quand le lire |
|---------|--------------|
| [personnages/INDEX.md](personnages/INDEX.md) | **Toujours — avant d'écrire un perso** (prénoms ⚠) |
| [personnages/prénoms-candidats.md](personnages/prénoms-candidats.md) | Shortlists pour validation à froid |
| [Eneagramme/personnages/](Eneagramme/personnages/) | Fiches détaillées par type |
| [Eneagramme/situations/emotions-universelles.md](Eneagramme/situations/emotions-universelles.md) | Pour une réaction émotionnelle précise (9×9) |
| [Eneagramme/ressources/guide-auteur.md](Eneagramme/ressources/guide-auteur.md) | Pour vérifier la cohérence d'une scène |

### Univers
| Fichier | Contenu |
|---------|---------|
| [univers/INDEX.md](univers/INDEX.md) | **Carte — comment les pièces s'emboîtent** |
| [univers/monde.md](univers/monde.md) | Événement fondateur, nature, société, rituels, spiritualité |
| [univers/systemes.md](univers/systemes.md) | Conscience Créative, Totems Janus, Égregores, Gardiens |
| [univers/grand-cycle.md](univers/grand-cycle.md) | Cycle 22k ans, Yugas adaptés, Ombre Éternelle |
| [univers/vibration.md](univers/vibration.md) | Fréquence/amplitude, égrégores, lien Janus |
| [univers/compagnons.md](univers/compagnons.md) | Animaux hybrides liés aux enfants |
| [univers/nom-candidats.md](univers/nom-candidats.md) | 5 finalistes pour nommer le monde |
| [univers/directions-brainstorm.md](univers/directions-brainstorm.md) | 6 directions non retenues |
| [univers/baron.md](univers/baron.md) | ⚠ mis de côté (inspiration écartée) |

### Histoires
| Fichier | Contenu |
|---------|---------|
| [histoires/INDEX.md](histoires/INDEX.md) | **Catalogue + gabarit** |
| [histoires/_gabarit.md](histoires/_gabarit.md) | Structure type nouvelle histoire |
| [histoires/le-pont-casse.md](histoires/le-pont-casse.md) | V1 complète + options d'intégration univers |

### Reference (matière de fond, pas quotidien)
| Fichier | Quand le lire |
|---------|--------------|
| [reference/INDEX.md](reference/INDEX.md) | Pointeurs rapides |
| [reference/](reference/) | Analyses manga/Pokémon + Riso-Hudson 9 niveaux |

---

## Questions ouvertes

1. **Nom de l'univers** — choisir parmi les 5 finalistes
2. **Prénoms des 8 autres personnages** — valider (seul Wex #7 confirmé)
3. **Ombre Éternelle** — concept principal ou laisser en standby ?
4. **Question fractale** (2026-04-16) — les persos savent-ils qu'ils sont dans le rêve de... ?
5. **Compagnons** — dans toutes les histoires ou progressivement ?
6. **Univers explicite ou en fond** dans les histoires ?

---

## Workflow brainstorm → fichiers stables

```
Chatbot / session
      ↓
  INBOX.md  ←  dump daté (hook commit auto)
      ↓  (quand tranché)
  univers/ · personnages/ · histoires/  ←  fichiers stables
      ↓
  INBOX vidé des sections distillées
```

**Règle :** un INDEX ne contient jamais de contenu canon, seulement des pointeurs.
Un fichier stable > 400 lignes → on scinde thématiquement.
