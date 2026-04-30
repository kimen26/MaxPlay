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
**Lien :** `../univers/fondements/sensibilites.md`

---

## 2026-04-28 — Transport : Jabus validé

**Décision :** Nom du véhicule = **Jabus**. Multi-personnes. Technologie non nommée dans l'univers (normal comme l'électricité). Axes verts = coulées végétales avec Jabus silencieux.
**Lien :** `../univers/vie-quotidienne/transport.md`

---

## 2026-04-28 — Prof d'Histoire : Type 7

**Décision :** Prof d'Histoire = Type 7. Enthousiaste, fait des liens vite (même faux), adore le show. Jamais ridiculisé. Prénom à définir.
**Lien :** `../univers/vie-quotidienne/ecole.md`

---

## 2026-04-28 — Structure narrative en saisons

**Décision :**
- **S1 "L'École"** — histoires courtes autonomes P2, 1/semaine, Wex observateur-acteur sans révélation de sa nature
- **S2 "Les Visites"** — Wex chez chacun de ses copains one-on-one, découverte sensibilités

**Lien :** `../univers/fondements/sensibilites.md`

---

## 2026-04-28 — Process éditorial 5 writers + briefs stateless

**Décision :** Workflow en 6 phases (INTAKE → BRIEF → ÉCRITURE × 5 → SYNTHÈSE → RELECTURE → KEEPER → CANON). PMO hub post-phase à chaque étape.

**Briefs injectés aux writers stateless :** 3 fichiers séparés par histoire :
- `equipe/brief-univers.md` — monde, ton, règles (mis à jour par Archiviste toutes les 5 histoires)
- `workshop/<titre>/plan-histoire.md` — sujet, Ki-Sho-Ten-Ketsu, casting, angle, contraintes (remplace brief-personnages + brief-histoire)

**Writers × 4 :** Kimi · DeepSeek · Grok · Claude Libre (stateless). ~~Claude Ancré~~ *(agent historique supprimé le 2026-04-28 — voir ARCHI-005)*.

**Raison :** rodage sur STORY-002 — process validé, GateKeeper PASS au premier essai.

---

## 2026-04-28 — MCP Kimi : headers obligatoires + pas de max_tokens

**Décision :**
- Kimi For Coding nécessite `X-Client-Name: claude-code` + `X-Client-Version: 1.9.0` + `User-Agent: claude-code/1.9.0 (win32; x64)` — sinon `access_terminated_error`
- `max_tokens` supprimé de tous les appels MCP — chaque modèle utilise sa limite native
- Kimi utilise `kimi-for-coding` (reasoning) mais produit du texte narratif de qualité

**Raison :** bug découvert en production STORY-002. Fix appliqué dans `infra/mcp/server.ts`.

---

## 2026-04-29 — Architecture cross-culture du casting

**Décision :** L'univers MaxPlay s'articule autour d'une **structure cross-culture stable** : Wex + 9 ennéatypes invariants, déclinés en plusieurs **castings nationaux**.

### Règle d'architecture

- **Wex** : présent dans **toutes les communautés / toutes les cultures**. **Prénom invariant** (« Wex »). Pas d'ennéatype validé (déjà acté). Wex est un **archetype universel** qui se manifeste partout, avec les gens du pays.
- **Les 9 compagnons** : **mêmes caractéristiques d'ennéatype** dans toutes les versions. Mais :
  - **Vies adaptées au pays / culture** d'incarnation
  - **Légère variance dans l'expression de l'ennéatype** selon culture (le geste change, la structure reste — cf. pattern *même histoire × N cultures*)
  - **9 nouveaux prénoms par culture** — d'où la justification du gros catalogue de prénoms (218 prénoms / 30 cultures dans `personnages/catalogue-prenoms/`)

### Conséquence sur le casting V1

Le casting V1 « Christ » français (Wex + Melki/Mimi/Polo/Jérem/Lulu/Pierrot/Raph/Juju/Nono) **n'est plus le casting unique** : c'est désormais **le casting français**, **un casting parmi N à venir**. Il reste figé dans sa forme française (cf. décision 2026-04-24).

### Conséquence sur le catalogue de prénoms

Les 218 prénoms / 30 cultures du catalogue ne sont plus « matière en réserve » mais **base opérationnelle pour construire les autres castings nationaux**. Chaque culture qualifiée = un casting national potentiel.

### Pistes narratives ouvertes

- **Rencontres cross-culture** : les Wex de différentes cultures peuvent se croiser dans des histoires de jonction (S2+ probable).
- **Question structurelle non tranchée** : Wex est-il « le même » Wex partout (un seul personnage qui apparaît partout) ou « un Wex par culture » (même nom, même rôle d'archetype, mais incarnations distinctes) ? À creuser.

### Précisions stratégiques (2026-04-30)

**Stratégie de déploiement « bulles + croisements »** :
- **Phase 1 — Bulles locales** : chaque pays/culture pense que le casting lui est **propre**. Pas de signal cross-culture au démarrage. L'enfant lit « son » Wex sans savoir que d'autres existent.
- **Phase 2 — Croisements** : 6-12 mois après stabilisation, les communautés se découvrent. S2+ probable.

**Règle de contenu pour les bulles culturelles** :
- ❌ Pas de gros cliché culturel
- ❌ Pas de légende ou figure mythologique locale réécrite
- ❌ Pas de religion locale (univers post-Éveil hors religions historiques)
- ✅ Socle universel : **bienveillance · éveil · sensibilité** — la culture **affleure par les gestes du quotidien**, elle n'est pas le sujet

**Wex — piste actuelle (à confirmer)** : **un Wex par culture, prénom invariant « Wex » partout**. Si Wex voyage plus tard, ça complexifie le système de prénoms — décision laissée ouverte.

**Mémoire entre castings — piste actuelle (à équilibrer avec faisabilité)** : **probablement OUI**, puisque c'est la même histoire archétypale qui se rejoue. Mais charge éditoriale lourde — à arbitrer (cf. UNIVERS-003).

### Comparables prior art (pour info)

- **StoryWeaver / Pratham Books** (Inde) — 25 000 histoires en 270+ langues, adaptation visuelle communautaire
- **Elisavet Arkolaki** — séries *Cousins Forever*, *Where am I from?*, traduites en 50+ langues
- **One Globe Kids** — choose-your-own-adventure photos enfants (Haïti, Burundi, Indonésie, NY, Israël)
- **« I See the Sun »** — séries illustrées Népal/Myanmar/Afghanistan/Chine/Russie
- **Anna Hibiscus** (Atinuke) — héroïne nigérian-canadienne

Aucun ne combine **archétypes universels (ennéatypes) + adaptation culturelle profonde + univers connecté** — la zone de différenciation reste libre.

**Lien :** `../personnages/INDEX.md` · `../personnages/catalogue-prenoms/INDEX.md` · `../univers/meta/architecture-cross-culture.md` · `../equipe/memoire-conseiller.md`

---

## 2026-04-29 — Parents : présents non-présents (S1 = prisme enfant pur)

**Décision :** Les parents existent dans l'univers — confiance, amour, liberté donnée, à dispo si besoin. **Saison 1 = prisme enfant pur** : on ne voit QUE les enfants, ils ne jouent qu'avec leurs semblables. Les parents existent **hors-cadre**, jamais dans la scène.

**Conséquence éditoriale :**
- Aucune scène avec parent visible en S1
- Pas de dialogue parent ↔ enfant en scène
- Pas d'intervention parentale dans la résolution
- Le foyer/logement peut affleurer (un seuil, une voix au loin) mais le parent n'entre pas dans le cadre

**Réintroduction possible :** S2+ — modèle Bluey « bon assez parent » (Winnicott) si un jour un parent entre en scène : imparfait, fatigué, distrait, bienveillant — pas idéalisé.

**Raison :** filtre enfant pur = identification maximale 4-6 ans, monde-bulle cohérent avec l'autonomie déjà actée (« enfants seuls dehors dès la maternelle » — décision 2026-04-26). Évite le piège du parent-résolveur.

**Lien :** `../equipe/sources-narratologie.md` (pépite 1.6 « Bon assez parent »)

---

## 2026-04-29 — Compagnons : forme tranchée (ondes / fluides / éther)

**Décision :** La forme des compagnons est **définitivement** :

- **Ondes / vague / fluide / flux / vapeur / éther** — **PAS d'animaux**, pas de cristaux figés, pas de mascotte
- **Manifestation par couleurs émotionnelles** — exemples de phrasés cibles :
  - *« je t'ai vu devenir rouge »*
  - *« je t'ai vu tellement détendu dans ce nuage bleuté »*
  - *« il a changé de couleur »*
- **Apparition progressive** : milieu / fin de Saison 1
- **Ne parle pas, ne résout pas** (règles provisoires conservées)
- **Détails à affiner** dans les briefs Architecte et au fil des arcs narratifs

**Raison :** la piste « animal hybride » glisse trop vers compagnon-mascotte (codes Pokémon/Totoro déjà saturés). L'onde-couleur reste cohérente avec `vibration.md` (fréquence/amplitude visible) et avec la doctrine d'univers implicite (le compagnon affleure, ne s'explique pas). La couleur émotionnelle = lecture intuitive 4 ans (rouge=colère, bleu=calme).

**Conséquence sur `univers/vie-quotidienne/compagnons.md` :** refonte complète — les sections « animal hybride » deviennent obsolètes.

**Lien :** `../univers/vie-quotidienne/compagnons.md` · `../univers/fondements/vibration.md`

---

## 2026-04-29 — Sensibilité différenciée (correctif narratologie)

**Décision :** Dans MaxPlay, le ressort narratif **n'est PAS** « Wex sait quelque chose que les autres ignorent » (savoir caché). Le bon cadrage est : **chacun des 10 perçoit ce que les autres ne perçoivent pas — c'est de la sensibilité différenciée**.

- **9 compagnons** : chacun a UNE sensibilité fixe (minéraux · eau · forces · fréquence · quantique · animaux · cosmos · plantes · vibration collective) — cf. décision 2026-04-28
- **Wex** : a sa propre sensibilité (à définir précisément — piste : écoute des fausses notes / lien soin-bioélectrique)
- **Complémentarité** : les 10 sensibilités forment un ensemble qui se complète — aucun n'a le monopole de la perception

**Conséquence éditoriale :**
- Pas de hiérarchie « Wex sait, les autres ignorent »
- Les histoires peuvent jouer le malentendu *« je vois X que tu ne vois pas »* dans les deux sens
- Wex n'est pas le sage caché — il est un percepteur parmi d'autres, avec un rôle de témoin du tout

**Correctif explicite à `equipe/sources-narratologie.md` pépite 1.4 :** la Theory of Mind à 4 ans permet ce ressort, mais **pas configuré « savoir caché »** chez nous → configuré « sensibilité différenciée ».

**Raison :** l'univers MaxPlay n'a pas d'élu — il a des sensibilités complémentaires. C'est cohérent avec l'architecture cross-culture (l'enfant timide s'identifie à Lulu, l'extraverti à Raph) et avec la doctrine ennéatypes dilués (chaque type a son angle, pas de hiérarchie).

**Lien :** `../personnages/INDEX.md` · `../univers/fondements/sensibilites.md` · `../equipe/sources-narratologie.md`

---

## 2026-04-29 — Structure des saisons (architecture par âge / découverte univers)

**Décision :** Les saisons MaxPlay s'articulent autour d'une découverte progressive de l'univers et des personnages :

| Saison | Axe | Statut |
|--------|-----|--------|
| **S1 — Enfance pure** | Que enfants, sensibilité peu/pas présente, maîtrise découverte en fin de saison. **Compagnons (ondes-couleurs) apparaissent progressivement milieu/fin S1.** Parents hors-cadre. | 🟡 En cours — arc « La Parole » actif (002-006) |
| **S2 — Définition Wex + visites** | Wex comprend sa sensibilité. Choix de Wex dans son cours de relation sociale → il visite chacun des 9 en 1-1 (chez eux, leur chambre). On apprend leur sensibilité, mise en avant des ennéatypes. | ⚪ À venir |
| **S3** | À définir plus tard | ⚪ Vide |
| **S4 — Décentrement** | Un des 9 devient personnage central (pas Wex). Wex garde son rôle mais histoires où il est secondaire ou absent. **Beaucoup plus d'histoires en volume**, montée en communauté, faire apprécier persos secondaires. | ⚪ À venir |
| **S# — Voyage / échange scolaire** | Cross-culture activé, on croise les persos d'autres castings nationaux. | ⚪ À venir (saison joker, position non figée) |

**Conséquence éditoriale :**
- S1 = filtre enfant pur (parents hors-cadre)
- S2 = chambre/intimité de chaque perso, on entre dans leur monde
- S4 = brise le « tout passe par Wex », monte en communauté
- S# voyage = passerelle vers l'architecture cross-culture (cf. décision 2026-04-29 castings)

**Lien :** `../pmo/roadmap.md` · `../personnages/INDEX.md` · `../univers/meta/architecture-cross-culture.md`

---

## 2026-04-29 — Wex toujours présent dans les histoires (pour le moment)

**Décision :** Wex est présent dans toutes les histoires de la S1. Pas d'absence ponctuelle, pas de remplacement par un autre observateur.

**Raison :** stabilité du dispositif narratif en phase de rodage. Le "témoin hors-système" est un point d'ancrage utile pour les lecteurs et pour les writers stateless. Le retirer demanderait de re-cadrer le rôle d'observateur ailleurs, prématuré à ce stade.

**À reconsidérer :** plus tard, si une histoire l'exige naturellement (ex. moment où un autre perso prend seul un rôle de témoin, ou histoire centrée sur un duo très intime). Pas d'absence par principe — toujours par besoin narratif documenté.

**Lien :** `../equipe/memoire-conseiller.md`

---

## 2026-04-28 — Pas d'épilogue italique à partir de STORY-002

**Décision :** "Le Pont Cassé" avait un épilogue en italique (*Ce qu'on construit à trois…*). À partir de 002, le texte se tient seul — pas d'épilogue. Le Pont Cassé reste tel quel (premier texte, posture de présentation).

**Raison :** retour relecture STORY-002 — l'histoire se termine sur une image, pas besoin de méta-commentaire.

---

## Questions ouvertes (à trancher)

| # | Question | Bloquant ? | Fichier |
|---|----------|-----------|---------|
| 1 | Nom de l'univers — lequel parmi 5 finalistes ? | Non | `../univers/meta/nom-candidats.md` |
| 2 | ~~Compagnons — forme exacte ? Quand apparaissent-ils ?~~ **TRANCHÉ 2026-04-29** (ondes/couleurs, milieu/fin S1) | — | `../univers/vie-quotidienne/compagnons.md` |
| 3 | Éléments magiques rares — garder ou écarter ? | Non | — |
| 4 | Baron — garder prénom "Trump" ? | Non | `../univers/baron.md` |
| 5 | Ombre Éternelle — concept actif ou standby ? | Non | — |
| 6 | Modèle Janus — référence discrète ou assumée ? | Non | `../INBOX.md` (rapports JP Petit) |
| 7 | Nom du prof d'Histoire | Non | `../univers/vie-quotidienne/ecole.md` |
| 8 | Nom des axes verts (Coulées ? Glissières ? Axes vivants ?) | Non | `../univers/vie-quotidienne/transport.md` |
| 9 | Ponaire — mécanique précise + lien voyages culturels | Non | `../univers/vie-quotidienne/transport.md` |
| 10 | Nombre de villes max par pays | Non | `../univers/vie-quotidienne/geographie.md` |
| 11 | Liste des Sensibilités — fermer les sous-types (Fréquence/Son/Schumann) | Non | `../univers/fondements/sensibilites.md` |
| 12 | Quand Wex commence à contrôler sa Vision causale ? (S1/S2/S3) | Non | — |
| 13 | Mentor de Wex — qui ? Quel âge ? Quelle sensibilité ? | Non | — |
| 14 | Castings cross-country (Hébreu, Ghibli, Swahili…) — démarrer lequel en premier ? | Oui pour S2 | `../personnages/prénoms-par-origine.md` |
| 15 | Mémoire narrative des lecteurs — les enfants connaîtront les histoires précédentes et feront des liens. Comment en tenir compte dans l'écriture (callbacks implicites, évolution persos, arcs longs) ? À partir de quelle histoire introduire ce niveau de couche ? | Non | — |
| 16 | Quartier / communauté — nommé (Clairval, Tissé, Hameau de l'Aube, la Ronde…) ou volontairement anonyme ? Décision 26/04 a écarté les villes réelles, mais n'a pas tranché si on nomme la communauté/quartier. Trade-off : ancrage affectif (B) vs universalité cross-culture (A). | Non | `../univers/vie-quotidienne/geographie.md` |
