# Templates — gabarits réutilisables

> **Tous les templates produits par le PROCESS éditorial MaxPlay.**
> Copier le template, remplir, déposer dans `stories/<NNN-slug>/` au bon emplacement (avec préfixe étape).
> Référence du workflow : [`../PROCESS.md`](../PROCESS.md) (10 étapes — refonte 2026-05-12).

---

## Liste des templates (à jour 2026-05-13)

| Template | Étape PROCESS | Owner qui remplit | Cible dans le dossier histoire (préfixé) |
|---|---|---|---|
| [`pitch-plan.template.md`](pitch-plan.template.md) | 1 | Conseiller | `1-pitch-plan.md` (**template fusionné réel créé 2026-05-13** — c'est celui-ci qu'il faut utiliser maintenant) |
| ⚠️ [`pitch.template.md`](pitch.template.md) | ~~1~~ legacy | ~~Conseiller~~ | Ancien template pitch seul (pré-fusion 2026-05-12). Conservé pour traçabilité. Utiliser `pitch-plan.template.md` à la place. |
| ⚠️ [`plan-histoire.template.md`](plan-histoire.template.md) | ~~2~~ deprecated | ~~Architecte~~ | Étape 2 supprimée 2026-05-12 (fusion avec étape 1). Template conservé pour traçabilité. |
| ⚠️ [`brief-univers.template.md`](brief-univers.template.md) | ~~3~~ obsolète | — | Contenu migré dans `_writer-system.md` par arc (2026-05-15 DEC-WRITER-ARCH-001). Ne plus utiliser. |
| [`brief-personnages.template.md`](brief-personnages.template.md) | 3 | Directeur | `3-briefs/brief-personnages.md` |
| [`brief-histoire.template.md`](brief-histoire.template.md) | 3 | Directeur | `3-briefs/brief-histoire.md` |
| [`brief-writer-libre.template.md`](brief-writer-libre.template.md) | 4 | Directeur (orchestre) | Injecté dans le prompt des 9 writers libres (Claude×2, Kimi libre ×3, DeepSeek×2, Grok×2) |
| [`brief-writer-guide.template.md`](brief-writer-guide.template.md) | 4 | Directeur (orchestre) | Injecté dans le prompt du writer Kimi guidé (annexe AXES 1-6) |
| [`selection.template.md`](selection.template.md) | 6 | Directeur | `6-selection.md` |
| [`kanban.template.md`](kanban.template.md) | toutes | owner d'étape | `kanban.md` (sans préfixe — fichier transverse) |
| [`synthese.template.md`](synthese.template.md) | 10 | Directeur | `10-synthese-finale.md` |

### Architecture writers étape 4 (refonte 2026-05-15 DEC-WRITER-ARCH-001)

`brief-univers.md` et `_writer-package.md` sont **obsolètes**. L'étape 3 ne produit plus que 2 fichiers : `brief-personnages.md` + `brief-histoire.md`.

Tous les writers (Claude agents + MCP Kimi/DeepSeek/Grok) reçoivent :
- **system** = contenu de `saisons/saison-X/arc-Y/_writer-system.md` (Couche 1 pérenne, figée par arc)
- **user** = `brief-personnages.md` + `brief-histoire.md` concaténés (Couche 2 per-story)

---

## Convention préfixes (depuis refonte 2026-05-12)

Tout fichier ou dossier dans `stories/<NNN>/` est préfixé par le numéro de l'étape qui le produit :
- `1-pitch-plan.md` (étape 1, fusionnée)
- `3-briefs/` (étape 3)
- `4-versions-writers/` (étape 4)
- `5-lecteurs-temoins/` + `5-synthese-lecteurs.md` (étape 5)
- `6-selection.md` (étape 6)
- `7-rewrite/` (étape 7)
- `8-gatekeeper-verdict.md` (étape 8)
- `9-relecture-rewrite/` (étape 9)
- `10-texte.md` + `10-synthese-finale.md` (étape 10)

**Fichiers transverses sans préfixe** : `README.md`, `kanban.md`.

---

## Règles d'usage

1. **Ne jamais éditer directement le template** — toujours faire une copie dans le dossier histoire avec le préfixe étape correct
2. **Tous les champs obligatoires** doivent être remplis avant de passer à l'étape suivante
3. **Les sections "RÈGLES OBLIGATOIRES" héritées de `pmo/decisions.md` + `pmo/INVARIANTS.md`** sont mises à jour à chaque évolution des décisions — vérifier la date avant utilisation
4. **Mises à jour des templates** — toute modification d'un template = entrée dans `pmo/decisions.md` + log dans `pmo/sprint-log.md` + ping `narration-archiviste` pour propagation gabarit

---

## Mises à jour récentes

**2026-05-13 — Refonte README templates post-refonte 2026-05-12**
- MAJ tableau : nouveaux noms cibles préfixés (`1-pitch-plan.md`, `3-briefs/brief-*.md`, `6-selection.md`, `10-synthese-finale.md`)
- Ajout `brief-writer-libre.template.md` + `brief-writer-guide.template.md` (étape 4, injectés MCP)
- Note deprecation `plan-histoire.template.md` (étape 2 supprimée par fusion)
- Section "Pas de template séparé pour `_writer-package.md`" (stub dans gabarit)
- Section "Convention préfixes" documentée

**2026-05-03 — Nettoyage anti-négations gratuites + liste vocabulaire dur explicite**
- Retiré "pas d'épilogue italique" des briefs writers (règle interne Directeur seul)
- Retiré "détails sensoriels distribués" (au choix du writer)
- Retiré mentions tirets cadratins, passé simple (pas des règles)
- Ajouté liste explicite d'interdits : mort, mourir, crever, clochard, pédocriminel, pistolet, pute, enculer
- Reformulé morale en positif : "leçon vécue par les personnages OK, dite par narrateur = NO"
- Remplacé anti-checklist par "relecture rapide" (6 points clés positifs, pas négatifs)

---

## À créer plus tard (pas encore prioritaire)

- `lecteur-temoin-enfant.template.md` — gabarit pour les retours enfant seul (étape 5)
- `lecteur-temoin-dyade.template.md` — gabarit pour les retours dyade (étape 5)
- `gatekeeper-verdict.template.md` — gabarit verdict GateKeeper (étape 8)
- `note-intention.template.md` — gabarit note d'intention writer (étape 4)
