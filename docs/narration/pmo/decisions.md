# Décisions de fond — PMO Narration

> **Règle :** Une décision ici est DÉFINITIVE jusqu'à nouvelle décision explicite datée.
> En cas de doute : la dernière décision sur un sujet écrase les précédentes.

---

## 2026-04-24 — Casting V1 "Christ" figé

**Décision :** Les 9 prénoms + Wex sont définitifs.

| Ennéatype | Prénom complet | Surnom (~80%) | Genre |
|-----------|---------------|---------------|-------|
| Hors-système | Wex | Wex | M |
| Type 1 | Melchisédech | Melki | M |
| Type 2 | Marie | Mimi | F |
| Type 3 | Paul | Polo | M |
| Type 4 | Jérémie | Jérem | M |
| Type 5 | Luc | Lulu | M |
| Type 6 | Pierre | Pierrot | M |
| Type 7 | Raphaël | Raph | M |
| Type 8 | Judith | Juju | F |
| Type 9 | Noé | Nono | M |

**Raison :** Lisibilité validée comité de lecture + cohérence culturelle casting "Christ".
**Liens :** `../personnages/INDEX.md` · `../personnages/prénoms-candidats.md`

---

## 2026-04-24 — Règles d'écriture fondamentales

**Décision :**
- Univers **IMPLICITE** — aucun nom de concept prononcé dans les histoires
- Ennéatypes **DILUÉS** — comportements visibles, jamais étiquetés
- Structure **Kishōtenketsu** — 4 actes, sans antagoniste
- Surnoms **~80%** en dialogue, prénoms complets = moments formels/adultes seulement
- Zéro morale explicitée — la leçon émerge de la situation, jamais dite

**Raison :** Retours comité Pont Cassé + volonté publishing cross-country.

---

## 2026-04-26 — Format et paliers d'âge

**Décision :**
- Format **texte-only** prioritaire (1-2 illus max) — quantité > beauté visuelle

| Palier | Âge | Durée | Mots |
|--------|-----|-------|------|
| P1 | 2-3 ans | 2-3 min | ~150-250 |
| P2 | 4-6 ans | 4-6 min | **400-700** |
| P3 | 6-9 ans | roman court | à définir |

**Raison :** Feedback Max 4 ans + pas de dessinateur, IA image instable.

---

## 2026-04-26 — Univers logistique

**Décision :**
- Enfants seuls dehors dès la maternelle — monde sans danger
- **Zéro nom de ville réelle** (pas Villejuif, pas Paris)
- Lieux géographiques réels OK comme décor (mer, montagne, savane)
- Transport : bus moteur classique **NON** — système de transport à inventer
- Repas : 1-2/jour quand faim — repas en famille/harmonie = moment sacré
- Coutumes locales = touche fine, pas folklore déguisé

**Raison :** Cohérence avec jeu MaxPlay + publishing cross-country.

---

## 2026-04-26 — Règles d'écriture (complément)

**Décision :**
- L'objet du titre = centre de gravité (il agit, il manque, il revient)
- Le monde affleure, ne s'explique pas — un détail suffit
- La conclusion la plus simple est souvent la bonne
- Pas de réflexe "ajoute du lore" en réécriture

**Raison :** Rejet V2 "Parapluie oublié" — trop décorative, sujet perdu.

---

## 2026-04-28 — Sensibilités (liste + attribution)

**Décision :** 9 sensibilités fixes par perso (Option A — comme l'ennéatype, cross-country stable).

| Perso | Sensibilité |
|-------|-------------|
| Wex | Vibration (transversal) + Vision causale (power) |
| Melki | Minéraux |
| Mimi | Eau |
| Polo | Forces |
| Jérem | Fréquence |
| Lulu | Quantique |
| Pierrot | Animaux |
| Raph | Cosmos |
| Juju | Plantes |
| Nono | Vibration collective (Harmonie) |

**Raison :** cohérence cross-country, simplicité éditoriale. Sensibilités = ADN du perso comme l'ennéatype.
**Lien :** `../univers/sensibilites.md`

---

## 2026-04-28 — Transport : Jabus validé

**Décision :** Nom du véhicule = **Jabus**. Multi-personnes. Technologie non nommée dans l'univers (normal comme l'électricité). Axes verts = coulées végétales avec Jabus silencieux.
**Lien :** `../univers/transport.md`

---

## 2026-04-28 — Prof d'Histoire : Type 7

**Décision :** Prof d'Histoire = Type 7. Enthousiaste, fait des liens vite (même faux), adore le show. Jamais ridiculisé. Prénom à définir.
**Lien :** `../univers/ecole.md`

---

## 2026-04-28 — Structure narrative en saisons

**Décision :**
- **S1 "L'École"** — histoires courtes autonomes P2, 1/semaine, Wex observateur-acteur sans révélation de sa nature
- **S2 "Les Visites"** — Wex chez chacun de ses copains one-on-one, découverte sensibilités

**Lien :** `../univers/sensibilites.md`

---

## 2026-04-28 — Process éditorial 5 writers + briefs stateless

**Décision :** Workflow en 6 phases (INTAKE → BRIEF → ÉCRITURE × 5 → SYNTHÈSE → RELECTURE → KEEPER → CANON). PMO hub post-phase à chaque étape.

**Briefs injectés aux writers stateless :** 3 fichiers séparés par histoire :
- `equipe/brief-univers.md` — monde, ton, règles (mis à jour par Archiviste toutes les 5 histoires)
- `workshop/<titre>/brief-personnages.md` — casting + traits comportementaux (pas d'ennéatypes)
- `workshop/<titre>/brief-histoire.md` — sujet, Ki-Sho-Ten-Ketsu, angle, contraintes

**Writers × 5 :** Kimi (reasoning, no reasoning en pratique via headers Claude Code) · DeepSeek · Grok · Claude Libre (stateless) · Claude Ancré (avec mémoire inter-histoires).

**Raison :** rodage sur STORY-002 — process validé, Keeper PASS au premier essai.

---

## 2026-04-28 — MCP Kimi : headers obligatoires + pas de max_tokens

**Décision :**
- Kimi For Coding nécessite `X-Client-Name: claude-code` + `X-Client-Version: 1.9.0` + `User-Agent: claude-code/1.9.0 (win32; x64)` — sinon `access_terminated_error`
- `max_tokens` supprimé de tous les appels MCP — chaque modèle utilise sa limite native
- Kimi utilise `kimi-for-coding` (reasoning) mais produit du texte narratif de qualité

**Raison :** bug découvert en production STORY-002. Fix appliqué dans `mcp/server.ts`.

---

## 2026-04-28 — Pas d'épilogue italique à partir de STORY-002

**Décision :** "Le Pont Cassé" avait un épilogue en italique (*Ce qu'on construit à trois…*). À partir de 002, le texte se tient seul — pas d'épilogue. Le Pont Cassé reste tel quel (premier texte, posture de présentation).

**Raison :** retour relecture STORY-002 — l'histoire se termine sur une image, pas besoin de méta-commentaire.

---

## Questions ouvertes (à trancher)

| # | Question | Bloquant ? | Fichier |
|---|----------|-----------|---------|
| 1 | Nom de l'univers — lequel parmi 5 finalistes ? | Non | `../univers/nom-candidats.md` |
| 2 | Compagnons — forme exacte ? Quand apparaissent-ils ? | Non | `../univers/compagnons.md` |
| 3 | Éléments magiques rares — garder ou écarter ? | Non | — |
| 4 | Baron — garder prénom "Trump" ? | Non | `../univers/baron.md` |
| 5 | Ombre Éternelle — concept actif ou standby ? | Non | — |
| 6 | Modèle Janus — référence discrète ou assumée ? | Non | `../input-idees/` (rapports JP Petit) |
| 7 | Nom du prof d'Histoire | Non | `../univers/ecole.md` |
| 8 | Nom des axes verts (Coulées ? Glissières ? Axes vivants ?) | Non | `../univers/transport.md` |
| 9 | Ponaire — mécanique précise + lien voyages culturels | Non | `../univers/transport.md` |
| 10 | Nombre de villes max par pays | Non | `../univers/geographie.md` |
| 11 | Liste des Sensibilités — fermer les sous-types (Fréquence/Son/Schumann) | Non | `../univers/sensibilites.md` |
| 12 | Quand Wex commence à contrôler sa Vision causale ? (S1/S2/S3) | Non | — |
| 13 | Mentor de Wex — qui ? Quel âge ? Quelle sensibilité ? | Non | — |
| 14 | Castings cross-country (Hébreu, Ghibli, Swahili…) — démarrer lequel en premier ? | Oui pour S2 | `../personnages/prénoms-par-origine.md` |
| 15 | Mémoire narrative des lecteurs — les enfants connaîtront les histoires précédentes et feront des liens. Comment en tenir compte dans l'écriture (callbacks implicites, évolution persos, arcs longs) ? À partir de quelle histoire introduire ce niveau de couche ? | Non | — |
