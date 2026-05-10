# Catalogue de prénoms — Univers Wex

> **Statut depuis 2026-04-29** : ce catalogue n'est **pas une matière en réserve** — c'est la **base opérationnelle** pour construire les **castings nationaux** de l'univers (cf. décision *Architecture cross-culture du casting*, [`../../pmo/decisions.md`](../../pmo/decisions.md)).
>
> **Vue d'ensemble** : ce catalogue rassemble les prénoms qualifiés pour les **9 compagnons d'ennéatype** dans chaque casting national. Le casting V1 « Christ » français (Wex + Melki/Mimi/Polo/Madie/Lulu/Pierrot/Raph/Juju/Nono) est figé — c'est **un casting parmi N**. Les **30 cultures qualifiées** ici = **30 castings potentiels**, à promouvoir progressivement en castings nationaux V2.
>
> **Wex** est invariant : prénom « Wex » dans tous les castings, ne figure pas dans le catalogue.

---

## Pourquoi ce catalogue

L'univers Wex est pensé pour **traverser les cultures** : les **mêmes 9 ennéatypes invariants** (caractère + sensibilité), des **prénoms qui changent par culture** et des **vies adaptées au pays**, avec une **légère variance dans l'expression de l'ennéatype** (cf. [`../doctrine.md`](../doctrine.md)).

Ce catalogue est la **matière opérationnelle** des castings nationaux. Il sert à :
- **Construire** chaque casting national (9 prénoms qualifiés par culture cible)
- **Capitaliser** les prénoms collectés (dumps IA, recherches, propositions auteur)
- **Qualifier** chaque prénom (origine, sens, sonorité, ennéatypes possibles)
- **Croiser** par culture ET par ennéatype pour faciliter la sélection
- **Éviter les doublons** et les prénoms déjà rejetés

---

## Structure

```
cross-culture/prenoms/
├── INDEX.md                       ← ce fichier
├── par-culture/                   ← un fichier par culture/aire linguistique
│   ├── (30 fiches culture)
│   └── ...
└── (à venir) par-ennéatype/       ← vues croisées si besoin
```

Chaque **fichier de culture** liste les prénoms qualifiés en markdown narratif (pas YAML), un par section `##`.

---

## Format d'une fiche prénom

```markdown
## NomPrenom

**Genre** : F / M / mixte
**Origine** : [Culture précise — langue racine]
**Signification** : "[sens]"
**Sonorité** : [doux/fort/chantant] · [N syllabes] · [finale]
**Usage** : [vivant/traditionnel/rare/mythologique]
**Ennéatypes possibles** :
- Type N — *"justification"*
- Type N — *"justification"*
**Statut** : brouillon
**Source** : [dump/session/auteur]
```

### Champs obligatoires
- **Genre** : féminin / masculin / mixte (préciser si variation régionale)
- **Origine** : aire géographique + langue/racine
- **Signification** : sens littéral + nuances
- **Sonorité** : qualifiée subjectivement (doux/dur, syllabes, finale, ressenti)
- **Usage** : vivant / archaïque / cross-culturel / rare
- **Ennéatypes possibles** : 1 à 3 types max, **avec justification** (sens OU sonorité OU les deux)
- **Statut** : `brouillon` · `validé` · `rejeté` · `réservé-V1`
- **Source** : d'où vient la proposition (dump, recherche, auteur)

### Règles
- **Plusieurs ennéatypes** autorisés si justifié (un prénom peut convenir à plusieurs personnalités)
- **Toujours justifier** chaque type proposé : sens direct, sonorité, ou résonance culturelle
- **Marquer rejeté** plutôt que supprimer (mémoire des choix)
- **Pas d'invention** : seulement des prénoms attestés culturellement

---

## Cultures couvertes

| Fichier | Aire | Prénoms qualifiés | Statut |
|---|---|---:|---|
| [par-culture/afrique-subsaharienne.md](par-culture/afrique-subsaharienne.md) | Zoulou, wolof, amharique, peul, lingala, swahili (Jabari/Amani), lingala (Bibene) | 18 | dense |
| [par-culture/japonais.md](par-culture/japonais.md) | Japon | 14 | dense |
| [par-culture/amerique-sud-autochtone.md](par-culture/amerique-sud-autochtone.md) | Quechua, aymara, mapuche | 14 | dense |
| [par-culture/amazigh-berbere.md](par-culture/amazigh-berbere.md) | Kabyle, chleuh, touareg, rif, chaoui | 13 | dense |
| [par-culture/sanskrit-inde.md](par-culture/sanskrit-inde.md) | Inde, Népal, Sri Lanka | 10 | dense |
| [par-culture/austronesien-indonesie.md](par-culture/austronesien-indonesie.md) | Java, Bali | 9 | en cours |
| [par-culture/arameen-syriaque.md](par-culture/arameen-syriaque.md) | Levant ancien (Syrie, Mésopotamie) | 9 | en cours |
| [par-culture/chinois.md](par-culture/chinois.md) | Chine (caractères, vertus confucéo-taoïstes) | 8 | en cours |
| [par-culture/celte-gaulois.md](par-culture/celte-gaulois.md) | Celtique, irlandais, gaulois | 8 | en cours |
| [par-culture/bresilien-tupi-orisha.md](par-culture/bresilien-tupi-orisha.md) | Brésil indigène (tupi-guarani) + orishas afro-brésiliens | 14 | dense — **prioritaire Max** |
| [par-culture/viking-nordique.md](par-culture/viking-nordique.md) | Scandinavie ancienne | 10 | en cours |
| [par-culture/anges-archanges.md](par-culture/anges-archanges.md) | Catégorie spirituelle transverse (judéo-chrétienne / islamique) | 3 | en cours |
| [par-culture/maya-azteque.md](par-culture/maya-azteque.md) | Mésoamérique | 7 | en cours |
| [par-culture/hebreu.md](par-culture/hebreu.md) | Hébreu biblique et moderne | 6 | en cours |
| [par-culture/maori-polynesien.md](par-culture/maori-polynesien.md) | Polynésie | 6 | en cours |
| [par-culture/tibetain.md](par-culture/tibetain.md) | Tibet | 6 | en cours |
| [par-culture/slave-russe.md](par-culture/slave-russe.md) | Slave / russe ancien | 6 | en cours |
| [par-culture/coreen.md](par-culture/coreen.md) | Corée | 6 | en cours |
| [par-culture/basque.md](par-culture/basque.md) | Pays basque (euskara) | 6 | en cours |
| [par-culture/kurde.md](par-culture/kurde.md) | Kurdistan | 6 | en cours |
| [par-culture/persan.md](par-culture/persan.md) | Iran (persan/farsi) | 5 | en cours |
| [par-culture/latin-occidental.md](par-culture/latin-occidental.md) | Latin / aire occidentale | 5 | en cours |
| [par-culture/inuit.md](par-culture/inuit.md) | Inuit (Groenland, Arctique) | 5 | en cours |
| [par-culture/mongol.md](par-culture/mongol.md) | Mongolie | 4 | en cours |
| [par-culture/grec.md](par-culture/grec.md) | Grec ancien | 4 | en cours |
| [par-culture/arabe.md](par-culture/arabe.md) | Monde arabophone | 4 | en cours |
| [par-culture/egyptien.md](par-culture/egyptien.md) | Égypte antique | 10 | dense |
| [par-culture/swahili-igbo-afrique.md](par-culture/swahili-igbo-afrique.md) | Swahili, igbo (cross-culturel Amara) | 1 | redirigé vers `afrique-subsaharienne.md` |
| [par-culture/turc.md](par-culture/turc.md) | Turquie | 1 | placeholder — recherche dédiée à lancer |
| [par-culture/tupi-guarani.md](par-culture/tupi-guarani.md) | (déprécié — voir `bresilien-tupi-orisha.md`) | 0 | redirigé |

**Total qualifiés à ce jour : 218 prénoms** sur **30 cultures** (29 actives + 1 dépréciée).

**Sources** :
- `session-fondatrice-2026` (volets 1-3 de la recherche IA externe d'avril 2026, désormais archivée dans `narration/archive/inputs-historiques/recherche-prenoms-culturel-session-fondatrice.md`)
- `dump IA Kimi 2026-04-29` (premier brouillon)
- `deepseek proposition prénom personnage.md` (2026-04-29) → +27 prénoms : 14 brésiliens (tupi + orisha), 7 égyptiens, 3 anges, 3 nordiques

---

## Couverture par ennéatype × culture

Comptage des **occurrences** de chaque type dans les fiches (un prénom peut être affecté à 1-3 types) :

| Type | Compagnon V1 | Occurrences catalogue | Cultures les plus représentées |
|---|---|---:|---|
| 1 — Perfectionniste | Melki | 29 | sanskrit, japonais, hébreu, arabe, latin, amazigh, persan |
| 2 — Altruiste | Mimi | 26 | sanskrit, japonais, arabe, maori, peul, swahili (Amara) |
| 3 — Performeur | Polo | 27 | sanskrit, japonais, latin, mongol, persan, amharique |
| 4 — Romantique | Madie | 28 | hébreu, japonais, araméen, mapuche, javanais |
| 5 — Observateur | Lulu | 20 | sanskrit, japonais, grec, latin, araméen, inuit, égyptien |
| 6 — Loyaliste | Pierrot | 19 | latin, japonais, araméen, javanais, viking, swahili, **brésilien (Boitatá/Boto/Curupira)**, **égyptien (Bès)**, **anges (Sariel/Barachiel)** |
| 7 — Épicurien | Raph | 34 | toutes — type le plus couvert (Wex est aussi #7, donc richesse alternatives) |
| 8 — Chef | Juju | 28 | sanskrit, égyptien, japonais, persan, mapuche, mongol, lingala |
| 9 — Pacificateur | Nono | 36 | sanskrit, japonais, araméen, latin, arabe, mongol, lingala — type le plus couvert |

### Lecture rapide
- **Bien couverts** : types 7 (34) et 9 (36) — beaucoup de prénoms de "joie" et de "paix" dans toutes les cultures
- **Solides** : types 1, 2, 3, 4, 8 (entre 26 et 29 occurrences)
- **Encore le moins couvert** : type 6 — Loyaliste (19, en hausse depuis 13 grâce au dump deepseek 2026-04-29) → la "fidélité/vigilance" reste sous-représentée
- **Moyen** : type 5 — Observateur (~24, en hausse avec Seshat/Curupira/Jurupari) → la "sagesse contemplative" est présente mais moins déclinée

→ **Action** : prochaine recherche, prioriser les prénoms type 6 dans les cultures encore sous-couvertes (chinois, slave, kurde, basque, celte, mongol, persan).

---

## Cultures couvertes vs cibles long terme

L'objectif long terme reste ~20 cultures **vivantes** pour le casting cross-culturel. Le catalogue actuel couvre **28 cultures qualifiées** — surcouverture volontaire pour pouvoir choisir.

Cultures **principales** envisagées (à arbitrer avec l'auteur) :
- Sanskrit/Inde, Japonais, Hébreu, Grec, Latin, Arabe — **fondations**
- Brésilien lusophone + tupi-guarani — **prioritaire (origines Max)** ← à creuser
- Maya-aztèque, maori, viking, slave, chinois, coréen — **diversité monde**
- Amazigh, persan, tibétain, celte — **richesse spirituelle**
- Inuit, basque, kurde, mongol — **traditions périphériques**
- Afrique subsaharienne (zoulou/wolof/amharique/peul/lingala) + swahili — **diaspora**
- Araméen-syriaque — **antique**

→ **Question ouverte pour l'auteur** : sur les 28 fiches existantes, lesquelles **promouvoir en cultures principales V2** et lesquelles laisser en réserve ?

---

## Casting V1 — couverture par ennéatype

| Type | Compagnon V1 | Variantes culturelles disponibles (échantillon) |
|---|---|---|
| 1 — Perfectionniste | Melki ← Melchisédech | Satya (sk), Makoto/Tadashi (jp), Adil (ar), Mariam (he/ar), Lunga (zoulou), Jom (wolof), Yanqha (aymara) |
| 2 — Altruiste | Mimi ← Marie | Daya (sk), Kokoro (jp), Rahma (ar), Aroha (maori), Mano (touareg), Tabitha (araméen), Thandiwe (zoulou), Oumou (peul), Munay (quechua) |
| 3 — Performeur | Polo ← Paul | Kiran/Ravi/Jaya (sk), Hikari/Taiga (jp), Apollon (gr), Victor (lat), Inti (quechua), Naran/Altan (mongol), Tsehaye (amharique) |
| 4 — Romantique | Madie ← Madeleine | Lior/Uriel/Ézéchiel (he), Shizuku/Miyu (jp), Psykhe (gr), Talitha/Lyana (araméen), Berhane (amharique), Cahaya/Senja (java), Kallfü (mapuche) |
| 5 — Observateur | Lulu ← Luc | Bodhi/Viveka (sk), Chie/Ken (jp), Sophia (gr), Sage (lat), Thot (égyptien), Maron (araméen), Isuma (inuit) |
| 6 — Loyaliste | Pierrot ← Pierre/Kepha | Fidelis (lat), Mamoru (jp), Anubis (égyptien), Shamir/Kepha (araméen), Setia (java), Varðr (viking) |
| 7 — Épicurien | Raph ← Raphaël | Yuki (jp), Farah (ar), Miriam (he), Maui (maori), Citlali (azt), Skratt (viking), Alaia (basque), Dechen (tibétain), Ayelén (mapuche), Kusi (quechua), Bahagia (java), Sibusiso (zoulou), Sadio (wolof), Addis (amharique), Aissata (peul), Elikia (lingala), Anaï (touareg), Bunjerir (chaoui), Massi (kabyle) |
| 8 — Chef | Juju ← Judith | Indra (sk), Sekhmet (égyptien), Kenji/Isamu (jp), Rostam (persan), Lautaro (mapuche), Illimani (aymara), Baatar (mongol), Azrur (amazigh), Coumba (wolof), Bibene (lingala), Tin-Hinan (touareg), Dorje (tibétain) |
| 9 — Pacificateur | Nono ← Noé | Shanti (sk), Yasu (jp), Pax (lat), Salam (ar), Shalom (araméen), Irène (gr), Amani (swahili), Damai/Nyoman/Tirta (java), Pacha/Püllü (Q/M), Pula (peul), Kimia/Malembe (lingala), Solvi (viking), Enkh (mongol), Taqurmi (touareg), Afelahl (chleuh) |

---

## Ce qui manque encore

### Cultures à créer/enrichir
- **Tupi-guarani + orishas** : ✅ enrichi 2026-04-29 (`bresilien-tupi-orisha.md`, 14 prénoms — Iara, Jaci, Guaraci, Iracema, Jurema utilisables direct ; Yemanjá/Oxum à manier avec sensitivity check)
- **Turc** : 1 seul prénom (Zeki). Recherche dédiée à lancer.
- **Brésilien lusophone moderne** : pas encore de fichier — **prioritaire** (prénoms vivants type Lucas, Sofia, João — distinct des racines tupi/orisha).
- **Yoruba pur (Nigeria/Bénin)** : partiellement couvert via les orishas afro-brésiliens — fiche yoruba dédiée serait utile pour les prénoms vivants (Adebayo, Folake, etc.).
- **Espagnol/hispanique** : pas encore de fichier (si culture cible).
- **Aborigène australien** : non couvert (mentionné en piste dans le fichier source, jamais creusé).
- **Anges mineurs** : `anges-archanges.md` couvre 3 archanges — Hagiel, Anael, Cassiel, Raziel pourraient enrichir si intérêt.

### Trous par ennéatype
- **Type 6** sous-couvert dans : chinois, slave, kurde, basque, celte, mongol, persan
- **Type 5** sous-couvert dans : afrique subsaharienne, mongol, kurde

### Décisions ouvertes
1. **Quelles 20 cultures retenir comme principales** pour les versions narratives V2 ?
2. **Tupi-guarani** : recherche dédiée à lancer (ethno brésilienne)
3. **Brésilien lusophone moderne** : créer la fiche
4. **Statuts à passer de `brouillon` à `validé`** : aucun pour l'instant — l'auteur doit valider par culture cible

---

## Liens

- [`../INDEX.md`](../INDEX.md) — index cross-culture global
- [`../castings-nationaux/INDEX.md`](../castings-nationaux/INDEX.md) — castings attribués (FR figé, autres à construire)
- [`../doctrine.md`](../doctrine.md) — doctrine cross-culture
- [`../../personnages/INDEX.md`](../../personnages/INDEX.md) — pilier personnages (invariant)
- [`../../personnages/lookup.yml`](../../personnages/lookup.yml) — résolveur token→prénom
- [`../../personnages/archive/`](../../personnages/archive/) — anciens brainstorms / candidats / matrice plate
- [`../../archive/inputs-historiques/recherche-prenoms-culturel-session-fondatrice.md`](../../archive/inputs-historiques/recherche-prenoms-culturel-session-fondatrice.md) — **source d'extraction** (volets 1-3 de la recherche IA externe)
