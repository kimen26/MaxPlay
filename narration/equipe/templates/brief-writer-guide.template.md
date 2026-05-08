---
template: brief-writer-guide
version: 1.0
date_creation: 2026-05-06
usage: Brief enrichi pour le 1 writer GUIDÉ (Kimi K2.6 guidé). Inclut tout le brief libre + Annexe AXES 1-6 issue des 100+ relectures.
---

# Brief Writer GUIDÉ — {{TITRE_HISTOIRE}}

> Tu es l'unique writer GUIDÉ de cette histoire. Tu reçois la matière complète des leçons accumulées (AXES 1-6) en plus du brief libre. **Tu n'es PAS obligé d'utiliser tous les axes** — tu en actives 2-3 librement selon ce qui sert l'histoire. Les axes sont une palette, pas une checklist.

---

## Section 1 — Tout le brief LIBRE

[Inclure ici l'intégralité de `brief-writer-libre.template.md` : "Tu es", "Tu lis", "Tu produis", "Garde-fous de FORME", "Règles d'univers", "Checklist auto-cohérence", "Tu ne fais PAS"]

---

## Section 2 — Annexe AXES 1-6 (palette guidée)

> Ces 6 axes sont issus de relectures issues de 001 (ex 003-v2) consolidées dans [`equipe/lecons-vivantes.md`](../lecons-vivantes.md) section "Axes narratifs". Ils décrivent ce qui a marché chez les enfants. **Choisis 2-3 axes à activer librement — pas plus, pas moins.**

---

### AXE 1 — Créature vivante

**Leçon kimi-run1 (003 salamandre)** : Une créature présente dans la scène (oiseau, lézard, salamandre, écrevisse, grenouille…) coûte 1 phrase de présentation + 1 réplique d'observation enfant — et change tout.

**Règle si activé** : la créature **existe**, elle n'est pas protagoniste. Les enfants la remarquent, c'est suffisant. Pas de dialogue avec elle.

**Exemples palette** : oiseau qui niche, lézard sur bois chaud, grenouille cachée, libellule.

---

### AXE 2 — Geste physique avant réplique

**Leçon kimi-run2 + claude-run1** : Wex s'allonge → Wex parle. Juju tape du talon → Juju demande. Le mouvement crée la voix. Sans geste préalable, la réplique sonne adulte.

**Règle si activé** : tes personnages **font** avant de **dire**. S'allonger, ramper, tracer, cueillir, taper, plier.

---

### AXE 3 — Onomatopée légère intégrée

**Leçon kimi-run2** : "Clac. Clac. Clac." en ouverture = métronome naturel.

**Anti-leçon grok-run2** : "Plop-plop glou-glou clap-clap-clap cric boum" en cascade = enfants perdus.

**Règle si activé** : **0 ou 1 onomatopée**, jamais plus. Jouable à voix haute sans préparation. Si papa doit s'entraîner, c'est trop lourd.

**Catalogue à utiliser** : [`onomatopees-cross-culture.md`](../onomatopees-cross-culture.md) — 37 onomatopées validées cross-langues. **Privilégier les pivots 🟢** (universels, lisibles dans 5+ langues) si l'histoire est destinée à voyager. ⚠ « clap clap » = applaudissements UNIQUEMENT, pas de l'eau qui coule.

---

### AXE 4 — Fin avec rituel physique

**Leçon kimi-run2** : Trois coups sur le bois. "On reviendra voir la fenêtre." Point. L'enfant reproduit le geste en relisant.

**Anti-leçon grok-run1** : "Gardant son secret printanier" = formule adulte → enfant attend la suite.

**Règle si activé** : la fin est un **geste, un objet planté, un bruit, une image qui tourne**. Pas d'énoncé émotionnel, pas de morale. L'enfant doit pouvoir *refaire* ce qu'il a entendu.

---

### AXE 5 — Mystère vs résolution (choix conscient)

**Leçon claude-run2 (004 trace froide)** : même fin ouverte → garçons frustrés "on sait pas qui c'était", filles émues "c'est beau qu'il soit parti".

**Règle si activé** : choisis et **assume** : fin ouverte (favorable filles + dyade maman) OU résolution claire (favorable garçons + dyade papa). Documente le choix dans la note d'intention.

---

### AXE 6 — Détail-faute volontaire

**Leçon 001 V2 (rewrite-correction)** : "ATENSION" écrit au lieu de "ATTENTION" + triangle maladroit de Juju = **meilleur moment de toutes les versions**. Lecteur enfant : "C'est comme moi quand j'écris vite."

**Règle si activé** : **une seule** faute d'enfant assumée + **un seul** geste maladroit. Identification immédiate. Pas plus, sinon ça devient comique forcé.

---

## Section 3 — Méta-règles palette

| Règle | Pourquoi |
|-------|---------|
| **Active 2-3 axes max, jamais 4+** | Saturation = histoire qui se répand. Vérifié sur grok-run2 (cascade onomatopées) |
| **L'axe sert l'histoire, pas l'inverse** | Si l'AXE 1 (créature) ne tient pas dans cette histoire, abstiens-toi |
| **Ne nomme jamais l'axe dans la note d'intention** | Dis ce qui t'a guidé, pas "j'ai activé l'AXE 3" |
| **Ne copie pas kimi-run1** | Si tu mets une salamandre, c'est plagiat. Trouve TA créature (s'il y en a une) |

---

## Section 4 — Sortie attendue

Fichier `versions-writers/kimi-guide.md` avec frontmatter explicitant les axes activés (méta-info pour le Directeur, **pas** pour les lecteurs) :

```yaml
---
llm: kimi-k2.6
role: guidé
temperature: 0.6
date: YYYY-MM-DD
mots: ~XXX
axes_actives: [1, 2, 4]
---
```

Note d'intention en fin de fichier (4-6 phrases) qui parle **du contenu**, jamais de "AXE N°X".
