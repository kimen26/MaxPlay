# Architecture cross-culture de l'univers

> **Décision tranchée 2026-04-29.** Voir [`pmo/decisions.md`](../pmo/decisions.md) section *Architecture cross-culture du casting*.
>
> **Direction héritée** : merveilleux discret ([`../univers/fondements/monde.md`](../univers/fondements/monde.md)), univers implicite, ennéatypes dilués (cf. `pmo/decisions.md` 2026-04-24).

---

## Le principe

L'univers MaxPlay n'est pas un monde mono-culturel traduit. C'est un univers **structuré sur des invariants universels**, qui prennent **des incarnations culturelles différentes** selon le pays où l'histoire se passe.

```
                    UNIVERS MaxPlay
                          ↓
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
   Casting fr        Casting jp        Casting br ...
        ↓                 ↓                 ↓
   Wex + 9 fr       Wex + 9 jp        Wex + 9 br
   (Christ)         (Ghibli)          (tupi-orisha)
```

---

## Les invariants (tous pays confondus)

| Invariant | Détail |
|-----------|--------|
| **Wex** | Présent dans toutes les communautés. Prénom **« Wex » invariant**. Rôle : témoin / archetype universel. Pas d'ennéatype. |
| **9 ennéatypes** | Mêmes 9 types (1-Perfectionniste, 2-Aidant, …, 9-Pacificateur), mêmes essences, mêmes sensibilités attribuées (cf. [sensibilites.md](sensibilites.md)). |
| **Structure narrative** | Kishōtenketsu, sans antagoniste, sans morale dite. |
| **Règles d'écriture** | Univers implicite, ennéatypes dilués, surnoms 4/5 du temps en dialogue. |
| **Système monde** | Post-Éveil, Cercles de Paix, Compagnons, Vibration, Soin par les fréquences. |

---

## Les variants (par casting national)

| Variant | Détail |
|---------|--------|
| **Prénoms** | 9 nouveaux prénoms par culture, puisés dans le catalogue (cf. [catalogue-prenoms/](../personnages/catalogue-prenoms/INDEX.md)). |
| **Vies des 9 compagnons** | Adaptées au pays — école, repas, lieux, vêtements, gestes du quotidien. |
| **Expression de l'ennéatype** | **Légère variance culturelle** dans la façon dont l'ennéatype se manifeste. Le **geste** change, la **structure** reste. Exemple (la pluie) : Type 9 sahélien danse sous l'orage / Type 9 tokyoïte s'abrite et observe. Même Pacificateur, même fonction narrative. |
| **Rituels et lieux** | Les pratiques canon (Maisons de Vapeur, Cabanes de Chaleur, Cercles de Paix, Cercle de la Boisson Chaude, Retraites de Lune…) **se manifestent dans la culture concernée** — pas de noms réels imposés au casting français, mais ils existent naturellement dans les castings nigérian, japonais, brésilien, etc. (cf. [soin-bioelectrique.md](soin-bioelectrique.md)). |

---

## Castings nationaux

| Code pays | Famille | Statut | Source prénoms |
|-----------|---------|--------|----------------|
| `fr` | Christ | ✅ V1 figé (2026-04-24) | Casting V1 — `personnages/INDEX.md` |
| `jp` | Ghibli | ⚪ à créer | `catalogue-prenoms/par-culture/japonais.md` (31 prénoms) |
| `he` | AT / hébreu | ⚪ à créer | `catalogue-prenoms/par-culture/hebreu.md` (6 prénoms) |
| `sw` | Swahili / Afrique de l'Est | ⚪ à créer | `catalogue-prenoms/par-culture/afrique-subsaharienne.md` (18 prénoms) |
| `br` | Tupi-Orisha (origines Max) | ⚪ prioritaire à créer | `catalogue-prenoms/par-culture/bresilien-tupi-orisha.md` (24 prénoms) |
| `…` | (jusqu'à 30 castings potentiels) | — | `catalogue-prenoms/INDEX.md` |

L'objectif long terme reste **~20 cultures vivantes** comme castings principaux V2. La surcouverture du catalogue (30 cultures qualifiées) sert à **pouvoir choisir**.

---

## Stratégie de déploiement : « bulles » culturelles + croisements ultérieurs

> **Précisé 2026-04-30.**

### Phase 1 — Bulles locales (S1 par culture)

Chaque pays/culture **pense que le casting lui est propre**. L'histoire est entièrement adaptée à sa culture, ses prénoms, ses lieux, ses gestes du quotidien. **Pas de signal de croisement** au démarrage. L'enfant brésilien lit « son » Wex, l'enfant japonais lit « son » Wex — chacun sans savoir que l'autre existe.

L'objectif : **construire la bulle locale d'abord**, ancrer l'attachement parasocial avec son casting national, avant toute hybridation.

### Phase 2 — Croisements (S2+)

Après stabilisation des bulles principales (probablement 6-12 mois après lancement par culture), les communautés se croisent et **découvrent l'autre** : l'enfant français découvre qu'il existe un Wex japonais ; le casting de chaque pays peut faire l'expérience d'une rencontre.

Formes à creuser pour S2+ :
- Voyage d'un compagnon dans une autre culture (rencontre « Wex local »)
- Histoire en miroir : même Ki-Sho-Ten-Ketsu, deux castings nationaux, lecture en parallèle
- Cercle de Paix réunissant des compagnons de plusieurs cultures (occasion rare, événement)

### Règle de contenu pour les bulles

Pour éviter d'aliéner les lecteurs locaux et de tomber dans l'exotisation :

- **❌ Pas de gros cliché culturel** (le Japonais qui salue en s'inclinant, le Brésilien qui danse la samba dans toutes les histoires)
- **❌ Pas de légende locale réécrite** (pas d'Anansi, pas de Yamata-no-Orochi, pas de tupi récupéré comme « setting »)
- **❌ Pas de religion locale** (pas de catholicisme brésilien, pas de shintoïsme, pas d'islam) — l'univers MaxPlay est post-Éveil, hors religions historiques
- **✅ Socle universel** : **bienveillance · éveil · sensibilité** — ces invariants se manifestent à travers les gestes du quotidien d'une culture, sans que la culture devienne la matière du récit

> Une histoire dans le casting *jp* peut se passer pendant les pluies de juin, mentionner un bento, montrer un enfant qui enlève ses chaussures avant d'entrer — **sans jamais convoquer le folklore religieux ou les figures mythologiques traditionnelles**. La culture **affleure** par les gestes, elle n'est pas le sujet.

---

## Question structurelle : Wex unique ou N Wex ?

> **Piste actuelle (2026-04-30, à confirmer)** : **un Wex par culture, prénom invariant « Wex » partout**.

### Pourquoi cette piste

- Cohérent avec la stratégie « bulles » — chaque culture a son propre Wex, sans que ça force le voyage de Wex à travers les cultures
- Préserve l'idée d'archetype universel : « Wex » = fonction qui se réincarne partout
- N'oblige pas Wex à avoir un prénom par culture (le prénom invariant est un *signal cross-culture* pour le lecteur attentif)

### Tension à arbitrer plus tard

Si Wex **voyage** entre cultures (option A historique), il faudrait soit :
- Lui donner un prénom par culture (alourdit le système de prénoms)
- Garder « Wex » partout — mais alors qu'est-ce qui le distingue d'un Wex local ?

> **Décision laissée ouverte tant que S2 (croisements) n'a pas commencé.** La réponse émergera probablement de la première histoire de croisement. Voir question ouverte n°14 dans `pmo/decisions.md`.

---

## Mémoire entre castings (mêmes histoires archétypales)

> **Piste actuelle (2026-04-30, à équilibrer avec faisabilité)** : **probablement OUI — mémoire conservée**.

### Pourquoi

L'univers MaxPlay rejoue **la même histoire archétypale** dans chaque culture : si Dadou (FR Type 3) apprend X dans son casting, le Type 3 brésilien apprend probablement la même chose dans la version locale. **L'arc de chaque ennéatype est invariant** ; seuls le geste et le contexte changent.

### Implication

Si l'auteur écrit STORY-007 « Dadou perd son cahier » (FR), la version *br* devrait être **la même histoire archétypale** (Type 3 brésilien perd son objet d'identité), avec :
- Mêmes structure Kishōtenketsu
- Même résolution archétypale
- Variants : prénom, lieu, objet local, gestes culturels

### Tension à arbitrer

C'est lourd à maintenir techniquement (chaque histoire devient un *template archétypal* + N variantes). Trade-off entre :
- **Cohérence archétypale forte** (mêmes leçons traversent les cultures = puissance de l'univers)
- **Charge éditoriale** (chaque histoire à écrire 5-20 fois)

→ Cf. ticket PMO **UNIVERS-003** (à créer) et roadmap S2+.

---

## Borner invariant vs variant dans l'expression de l'ennéatype

> **À creuser (ticket PMO UNIVERS-003)**.

Question : où s'arrête le « même Type 3 partout » et où commence la « variance culturelle légitime » ?

Exemples à arbitrer :
- Type 3 français = **performance scolaire**. Type 3 brésilien = **performance physique / sport** ? Toujours Type 3 = même structure d'âme, geste différent ?
- Type 5 sahélien = **observateur silencieux à l'ombre**. Type 5 tokyoïte = **observateur silencieux derrière sa fenêtre** ? Mêmes essences, contextes spatiaux différents ?
- Type 8 brésilienne (Juju) = **leader de capoeira**. Type 8 japonaise = **leader silencieux mais ferme** ? Le « registre d'expression » de la force change-t-il avec la culture ?

→ À documenter sous forme de **règles d'écriture par ennéatype × culture**, dans une future fiche `enneagramme/expression-cross-culture.md`.

---

## Comparables prior art

- **StoryWeaver / Pratham Books** (Inde) — 25 000+ histoires en 270+ langues, adaptation visuelle communautaire
- **Elisavet Arkolaki** — *Cousins Forever*, *Where am I from?*, *Happiness Street* — traduits en 50+ langues
- **One Globe Kids** — choose-your-own-adventure photos enfants réels (Haïti, Burundi, Indonésie, NY, Israël)
- **« I See the Sun »** — séries illustrées Népal/Myanmar/Afghanistan/Chine/Russie
- **Anna Hibiscus** (Atinuke) — héroïne nigérian-canadienne

Aucun de ces projets ne combine **archétypes universels (ennéatypes) + adaptation culturelle profonde + univers connecté**. La zone de différenciation reste libre.

---

## Liens

- [`../pmo/decisions.md`](../pmo/decisions.md) — Décision 2026-04-29 *Architecture cross-culture du casting*
- [`../personnages/INDEX.md`](../personnages/INDEX.md) — Casting V1 français + structure multi-pays
- [`../personnages/catalogue-prenoms/INDEX.md`](../personnages/catalogue-prenoms/INDEX.md) — 218 prénoms / 30 cultures
- [`../equipe/memoire-conseiller.md`](../equipe/memoire-conseiller.md) — patterns *même histoire × N cultures*
- [`soin-bioelectrique.md`](soin-bioelectrique.md) — pratiques culturelles camouflées (FR) / explicites (autres castings)
