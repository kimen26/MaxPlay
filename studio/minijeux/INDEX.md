# PÔLE JEU — Index

> Point d'entrée du pôle JEU. Lu en premier par tout agent qui touche au code/spec/asset des mini-jeux.
> Refonte 2026-05-13 (harmonisation Game ↔ Narration). **MAJ 2026-06-04** : migration `game/` → `studio/minijeux/` (gouvernance) + `site/` (code déployé). Carte + chemins réalignés.
>
> Équivalent côté Narration : [`../narration/INDEX.md`](../narration/INDEX.md).

## Carte du pôle

```
studio/minijeux/          ← GOUVERNANCE + specs (PAS le code déployé)
├── INDEX.md              ← ce fichier (carte d'entrée)
├── CLAUDE.md             ← règles auto-chargées du pôle (nested)
├── EQUIPE.md             ← organigramme complet équipe
├── INBOX.md · inbox/     ← idées entrantes (bot Telegram + dépôts manuels)
├── docs/
│   ├── jeux/             ← INDEX, CLASSIFICATION, figees/, specs mj, ASSETS, AUDIO_ASSETS, _archive/
│   ├── specs/            ← ARCHI-COMPTES-PROFILS · NORME-i-REGLES · REGISTRE-VOIX-A-GENERER
│   ├── research/         ← benchmark-kids-games · sources-jeux-addictifs-adultes · SYNTHESE
│   ├── MECANIQUES.md · STANDARD-MJ.md (source unique règles MJ) · STACK.md · ratp-colors.json
├── memory/               ← quintette mémoire (convention 2026-09-03, HO-MJ-01)
│   ├── INVARIANTS.md     ← chiffres clés (source de vérité)
│   ├── DECISIONS.md      ← décisions structurantes en vigueur + designs validés
│   ├── TODO.md           ← tickets ouverts (EP-xxx)
│   ├── LESSONS.md        ← leçons L-xxx
│   ├── MEMORY.md         ← état courant + journal des sessions
│   ├── CHANGELOG.md      ← capacités livrées (point de vue utilisateur)
│   ├── audits/           ← audits datés du pôle (norme 2026-07-19 : AAAA-MM-JJ-sujet.md) + retours/
│   └── archive/          ← sprint-log, décisions et backlog historiques (verbatim)
├── tasks/BACKLOG.md      ← stub redirection vers memory/TODO.md
└── tests/                ← harnais Playwright mini-jeux (EP-038)

CODE DÉPLOYÉ (hors pôle, GitHub Pages) :
  site/                   ← mini-jeux HTML (count → memory/INVARIANTS.md) + index.html + js/catalog.js (menu)
```

---

## Équipe agents

| Agent | Modèle | Niveau | Mode | Rôle bref |
|-------|--------|--------|------|-----------|
| `game-pmo` **unifié** | Sonnet | 1 | Clôture · audit · RECHERCHE | FOND + FORME (fusion 2026-07-19, ex archiviste/mj-pmo) |
| `game-conseiller` | Opus | 3 | Manuel | Binôme créatif transverse |
| `game-dev` | Sonnet | 4 | Manuel | Dev HTML vanilla |
| `game-mj-reviewer` | Haiku | 4 | Manuel | Validateur MJ (checklist 5 sections) |

Détails complets : [`EQUIPE.md`](EQUIPE.md).

---

## Source de vérité transverse

- **Profil enfant** : [`../../memory/MAX_PROFILE.md`](../../memory/MAX_PROFILE.md)
- **Vision produit transverse** : [`../../memory/VISION.md`](../../memory/VISION.md)
- **Couleurs IDFM** : [`docs/ratp-colors.json`](docs/ratp-colors.json)

---

## Mémoires process (REX méta-pipeline)

- **Pipeline mini-jeux** : [`site/PIPELINE-MEMORY-MJ.md`](../../site/PIPELINE-MEMORY-MJ.md) — frictions résolues, évolution agents MJ (créé 2026-05-11, leçons EP-021 + EP-022)

---

## Déploiement

- CI : [`../../.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)
- URL : `kimen26.github.io/MaxPlay/`
  - `/` → `site/index.html` (menu par catégories, source `site/js/catalog.js`)
  - `/mj-XX.html` → vanilla

---

## Outils design (hors tiles)

| Outil | Rôle |
|-------|------|
| [`site/tools/index.html`](../../site/tools/index.html) | **Hub Tools** — point d'entrée des outils de design |
| [`site/design-lecture/`](../../site/design-lecture/) | **Chantier UI lecture** (mockups syllabique/phonique, Kimi) — voir `NOTES-DESIGN-LECTURE.md` interne · retours PY triés : [`memory/audits/2026-07-19-triage-poc-design.md`](memory/audits/2026-07-19-triage-poc-design.md) |
| [`site/design-compte/`](../../site/design-compte/) | **Chantier UI compte** (mockups série 4 comptage) — voir `NOTES-DESIGN-COMPTE.md` interne · retours PY triés : même doc triage |
| [`site/design-shared/`](../../site/design-shared/) | Assets partagés des chantiers design (mockup.css/js + fonts) — utilisé par design-lecture ET design-compte |
| [`site/atelier-couleurs.html`](../../site/atelier-couleurs.html) | Atelier prototype recoloration avatars (algo repris dans `avatar-picker.js`) |
| ~~index2/index3~~ | **ABANDONNÉS** (décision Papa Yann 2026-07-19) — `index.html` = LE menu unique. Audit menu + direction **« Mur + copains » VALIDÉE** (v2, from scratch) : [`memory/audits/2026-07-19-menu-parcours.md`](memory/audits/2026-07-19-menu-parcours.md) → spec **« Le Mur des Copains » v0** : [`docs/specs/2026-07-19-menu-mur-copains.md`](docs/specs/2026-07-19-menu-mur-copains.md) |

---

## Pôle voisin

NARRATION : [`../narration/INDEX.md`](../narration/INDEX.md) — univers narratif (post-Phase 4).
DINO (transverse, code dans site/) : [`../dino/INDEX.md`](../dino/INDEX.md).

---

_Créé 2026-04-30 dans la refonte arborescence. Refonte 2026-05-13 : harmonisation Game ↔ Narration. MAJ 2026-06-04 : réalignement post-migration site/+studio/ (carte + labels web/→site/, phaser/→studio/max-adventure/)._
