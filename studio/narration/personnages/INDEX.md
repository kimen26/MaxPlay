# Personnages — Index (Pilier 1)

> **Qui sont nos persos + théorie sur l'humain.** Wex + 9 compagnons-ennéatypes. Identité invariante (ennéatype, voix-signature, gestes, sensibilité, relations). Les **variantes culturelles** (prénoms, prononciation, décor local) vivent dans [`../cross-culture/`](../cross-culture/INDEX.md).

---

## Casting V1 — France (Christ) · figé 2026-04-24

> **Règle d'écriture :** dans les histoires et dialogues, on utilise le **diminutif 4/5 du temps**. Le prénom complet sert aux moments solennels.

| Dossier | Type | Prénom complet | **Diminutif** | Essence | Sensibilité | Token |
|---------|------|----------------|---------------|---------|-------------|-------|
| [type-01/](type-01/) | Perfectionniste | Melchisédech | **Melki** | Être bon·ne | Minéraux | `titi_1_fr` |
| [type-02/](type-02/) | Aidant | Marie (F) | **Mimi** | Être aimé·e | Eau | `titi_2_fr` |
| [type-03/](type-03/) | Performeur | David | **Dadou** | Être valorisé·e | Forces | `titi_3_fr` |
| [type-04/](type-04/) | Individualiste | Madeleine (F) | **Madie** | Être soi-même | Fréquence | `titi_4_fr` |
| [type-05/](type-05/) | Observateur | Luc | **Lulu** | Comprendre | Quantique | `titi_5_fr` |
| [type-06/](type-06/) | Loyal | Pierre | **Pierrot** | Avoir du soutien | Animaux | `titi_6_fr` |
| [type-07/](type-07/) | Enthousiaste | Raphaëlle (F) | **Raph** | Être comblé·e | Cosmos | `titi_7_fr` |
| [type-08/](type-08/) | Challenger | Judith (F) | **Juju** | Être fort·e | Plantes | `titi_8_fr` |
| [type-09/](type-09/) | Pacificateur | Noé | **Nono** | La paix | Vibration collective | `titi_9_fr` |
| [wex/](wex/) | Hors-système | **Wex** (invariant) | **Wex** | — | à définir (NARR-003) | `wex` |

**Bilan genre :** 4F (Mimi, Madie, Raph, Juju) / 5M + Wex. **Figé.**

→ Casting attribué FR (prénom, prononciation IPA, origine) dans [`../cross-culture/castings-nationaux/fr/`](../cross-culture/castings-nationaux/fr/).
→ Castings à venir (jp, br, he, sw…) : voir [`../cross-culture/castings-nationaux/INDEX.md`](../cross-culture/castings-nationaux/INDEX.md).

---

## Structure du pilier

```
personnages/
├── INDEX.md                        ← ce fichier
├── lookup.yml                      ← résolveur token → prénom (toutes cultures)
├── notation-types.md               ← convention TypeN/TitiN dans les textes
├── casting-mapping.md              ← pont théorie ↔ casting V1
│
├── type-01..09/                    ← 9 fiches incarnées (INVARIANT)
│   ├── README.md                   ← cartographie des 4 fichiers
│   ├── enneagramme.md              ← profil universel (peur, désir, comportements, santé)
│   ├── personnage.md               ← portrait 360° + relations inter-types
│   ├── alive.md                    ← matière vivante (sensibilité, couleur, planète, tags writer, mémoire histoires)
│   └── voix.md                     ← production audio ElevenLabs (settings, prompts)
│
├── wex/                            ← idem pour Wex
│
├── theorie/                        ← Théorie sur l'humain
│   ├── README.md
│   ├── enneagramme/                ← comprendre les 9 persos (Chabreuil, situations, etc.)
│   └── pedagogie-enfance/          ← comprendre le lecteur Max (4-5 ans)
│
└── archive/                        ← anciens brainstorms / candidats / matrice
```

---

## Gabarit figé — structure 5 fichiers (2026-05-15)

> **Règle MILITAIRE** : tout nouveau dossier `type-NN/` ou `wex/` doit copier exactement cette structure. Toute déviation = DÉCISION FORMELLE + note au README.

### Gabarit standard (`type-01/` à `type-09/`)

**5 fichiers obligatoires, dans cet ordre :**

| # | Fichier | Sections attendues |
|----|---------|-------------------|
| 1 | **README.md** | En-tête avec prénom complet, diminutif, casting France<br>Tableau 4 fichiers + Sensibilité + Astre + Type ennéa + note refactor (si applicable) |
| 2 | **enneagramme.md** | Motivation profonde (peur, désir, croyance)<br>Comportements en situations (sain, moyen, malsain)<br>Niveaux de santé détaillés<br>Note auteur (apprentissage, pistes futures) |
| 3 | **personnage.md** | Portrait vivant (essence, description physique, énergie)<br>Phrases typiques (3-5 répliques caractéristiques)<br>Gestes/attitudes/habitudes (5-6 tics physiques)<br>Paires fortes (dyades ennéa pertinentes)<br>Garde-fou (anti-pattern perso)<br>Relations 8×8 (matrices interactions avec 8 autres) |
| 4 | **alive.md** | Sensibilité (description perception spécifique perso)<br>Astre (lien symbolique)<br>Couleur (RGB si précis)<br>Tags writer ElevenLabs (max 8)<br>Langage naturel (tournures verbales 4-6 ans)<br>Onomatopées (son archétypique, 3-4)<br>Mémoire vivante (phrase clé gravée en vous) |
| 5 | **voix.md** | Voice_id ElevenLabs (figé)<br>Signature vocale 4 couches (timbre, tempo, pitch, expressivité)<br>Paramètres TTS (stability, similarity_boost, style)<br>Prompt ElevenLabs (< 1000 car, structuré)<br>Description publique (pour social/promo) |

**Où trouver le casting France (voice_id, prononciation IPA) :**
→ [`../cross-culture/castings-nationaux/fr/type-NN.md`](../cross-culture/castings-nationaux/fr/)

### Variante Wex (hors-système, justifiée — 2026-05-15)

**Dossier `wex/` : même 5 fichiers, VARIANTE sections**

| # | Fichier | Variante |
|----|---------|----------|
| 1 | **README.md** | En-tête : Statut (Héros universel), Token (wex), Sensibilité, **Power** (Vision causale)<br>Tableau 5 fichiers<br>Note : "Hors-système — variante justifiée du gabarit standard. Sections bonus : Cercle d'Harmonie, Vision causale, Arcs S1/S2/S3." |
| 2 | **enneagramme.md** | ✗ **ABSENT** — Wex n'a pas d'ennéatype. Justification : "Hors-système" |
| 3 | **personnage.md** | Même structure de base PLUS 3 sections bonus :<br>- Cercle d'Harmonie (liens symétriques avec les 9)<br>- Vision causale (arcs S2+, interaction systémique)<br>- Arcs (S1 catalyseur minimal, S2 apprentissage, S3+ complexification) |
| 4 | **alive.md** | Même structure, avec note « By design : 7 tics phonétiques gravés dans voice_id » |
| 5 | **voix.md** | Même structure PLUS tableau **7 tics phonétiques** (au lieu de 4 couches) |

**Où trouver l'identité universelle :**
→ [`../cross-culture/castings-nationaux/fr/wex.md`](../cross-culture/castings-nationaux/fr/) — invariant, ne change pas par culture.

### Règle application

**Toute création perso (`type-NN/` nouveau ou Wex remodelage) :**
1. Copier l'intégralité du dossier template (voir lequel : standard ou Wex)
2. Renommer dossier et fichiers
3. Remplir chaque section
4. Si besoin d'une 6e variante (future) : DÉCISION FORMELLE + tracer dans README
5. **Anti-pattern** : ne jamais ajouter un 6e fichier sans validation (ex: `relations-specifiques.md` = à inclure dans `personnage.md`)

---

## Lectures par usage

| Tu cherches… | Va lire… |
|--------------|----------|
| Le casting V1 français | Le tableau ci-dessus + [`type-NN/README.md`](type-01/README.md) |
| Le profil ennéatype (peur, désir, comportements) | [`type-NN/enneagramme.md`](type-01/enneagramme.md) |
| Le portrait vivant + relations avec les autres | [`type-NN/personnage.md`](type-01/personnage.md) |
| La sensibilité, couleur, planète, tags writer, mémoire histoires | [`type-NN/alive.md`](type-01/alive.md) |
| La voix ElevenLabs d'un perso (settings, prompts) | [`type-NN/voix.md`](type-01/voix.md) |
| Le voice_id FR + prénom/surnom d'un perso | [`../cross-culture/castings-nationaux/fr/type-NN.md`](../cross-culture/castings-nationaux/fr/) |
| Comment 2 persos interagissent | [`type-NN/personnage.md`](type-01/personnage.md) §Relations ou [`theorie/enneagramme/interactions-9x9.md`](theorie/enneagramme/interactions-9x9.md) |
| Comprendre un ennéatype en profondeur | [`theorie/enneagramme/`](theorie/enneagramme/README.md) (Chabreuil, guide auteur) |
| Comprendre Max le lecteur (4-5 ans) | [`theorie/pedagogie-enfance/`](theorie/pedagogie-enfance/README.md) |
| Le prénom d'un perso dans une autre culture | [`../cross-culture/castings-nationaux/`](../cross-culture/castings-nationaux/INDEX.md) (FR figé, autres à construire) ; catalogue brut : [`../cross-culture/prenoms/INDEX.md`](../cross-culture/prenoms/INDEX.md) — 274 prénoms / 31 fiches au 2026-07-27, vérifié par `../scripts/check-compteurs.js` |
| Des prénoms candidats par culture | [`../cross-culture/prenoms/INDEX.md`](../cross-culture/prenoms/INDEX.md) (218 prénoms / 30 cultures) |

---

## Sensibilités différenciées (tranché 2026-04-29)

> **Règle structurelle** : chaque personnage perçoit ce que les autres ne perçoivent pas. C'est de la **sensibilité différenciée** — **pas du savoir caché**. Aucune hiérarchie « Wex sait, les autres ignorent ».
>
> Voir [`../pmo/decisions.md`](../pmo/decisions.md) (section *Sensibilité différenciée*) et [`../univers/fondements/sensibilites.md`](../univers/fondements/sensibilites.md).

| Perso | Type | Sensibilité | Statut |
|-------|------|-------------|--------|
| **Wex** | hors-système | À définir précisément — piste : écoute des fausses notes / lien soin-bioélectrique | 🟡 NARR-003 |
| Melki | T1 | Minéraux | ✅ figé |
| Mimi | T2 | Eau | ✅ figé |
| Dadou | T3 | Forces | ✅ figé |
| Madie | T4 | Fréquence | ✅ figé |
| Lulu | T5 | Quantique | ✅ figé |
| Pierrot | T6 | Animaux | ✅ figé |
| Raph | T7 | Cosmos | ✅ figé |
| Juju | T8 | Plantes | ✅ figé |
| Nono | T9 | Vibration collective | ✅ figé |

**Révélation progressive** : les sensibilités sont peu/pas présentes en début S1, affleurent en milieu/fin S1, sont **mises en avant en S2** (saison des visites — Wex chez chaque copain).

---

## Liens

- Pilier Univers : [`../univers/INDEX.md`](../univers/INDEX.md)
- Pilier Cross-culture : [`../cross-culture/INDEX.md`](../cross-culture/INDEX.md)
- Plan éditorial saisons : [`../saisons/INDEX.md`](../saisons/INDEX.md)
- Process d'écriture : [`../equipe/PROCESS.md`](../equipe/PROCESS.md)
- Index racine narration : [`../INDEX.md`](../INDEX.md)
