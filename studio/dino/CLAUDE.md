# PÔLE DINO — Règles auto-chargées

> Pôle **transverse** (UI de jeu + contenu narré/audio) — pair de [`../minijeux/`](../minijeux/CLAUDE.md) et [`../narration/`](../narration/CLAUDE.md).
> Chargé dès qu'un fichier sous `studio/dino/` (gouvernance) est touché. **Le CODE est déployé depuis [`../../site/`](../../site/)** (dev-dinos.html, dinos-data.js, audio/dinos, img/dinos). ⚠️ Éditer le code déployé charge la **rule** [`.claude/rules/dino.md`](../../.claude/rules/dino.md), **pas ce fichier** — la rule porte les règles ops, ce CLAUDE.md = navigation/gouvernance.
> ⚠️ Ce fichier **n'est PAS re-injecté après `/compact`** — il rechargera au prochain contact d'un fichier dino. Le routage racine, lui, survit.

---

## Principes pôle DINO (non négociables)

- **🏛️ Doctrine GED** — canon sans numéro + zéro chiffre en dur (gouvernance seule, jamais le contenu narré) + frontière autoring/produit + checklist « dino complet » 8 axes. Texte plein : [`.claude/rules/dino.md`](../../.claude/rules/dino.md) § Doctrine GED + [`memory/DECISIONS.md`](memory/DECISIONS.md) § DEC-GED-001. Nouveau dino → [`content/sources/_PLAYBOOK-DINO-NOUVEAU.md`](content/sources/_PLAYBOOK-DINO-NOUVEAU.md).
- **Encyclopédie = VRAI** : on dit les vrais noms (Trias, Théropodes…) et les vraies dates/chiffres. Jamais de nian-nian.
- **Échelle honnête** : aucune comparaison de taille qui ment > 10 %. Référentiel figé dans [`memory/INVARIANTS.md`](memory/INVARIANTS.md).
- **Grokipedia = 1ʳᵉ source** de fact-check (avant Wikipedia).
- **Tritri** = running gag de Wex (son dino préféré, un Tricératops). 🔒 JAMAIS « Max », « doudou », « peluche ». **1 mention max par fiche** (2 pour le Tricératops) : le dino de la fiche est le centre (L-D-75). Voir [`figees/encyclopedie.md`](figees/encyclopedie.md).
- **Zéro bus dans les récits narrés** (le bus reste OK en échelle de taille des fiches, validé).
- **Audio = écouter** : « écoute » jamais « regarde ». Wex en FR standard, aucun tic écrit (la voix les ajoute).

---

## ⚙️ Mémoire (quintette) + PMO + Conseiller

**Capture immédiate (2026-07-19)** : toute idée/décision de Papa Yann dans le tour = 1 ligne dans `memory/TODO.md` DANS LE TOUR (main agent). `dino-pmo` (unifié FOND+FORME, Sonnet) sert en clôture, audit et mode RECHERCHE. `dino-conseiller` (créatif) : écriture/péda/taxo — le consulter d'office sur tout brainstorm contenu. Hook Stop `pmo-check` : trace attendue (voir HO-G07 pour son adaptation au quintette).

| Question | Fichier |
|---|---|
| Chiffres clés (count dinos/familles, échelle, casting voix, audio) | [`memory/INVARIANTS.md`](memory/INVARIANTS.md) |
| Pourquoi c'est comme ça | [`memory/DECISIONS.md`](memory/DECISIONS.md) |
| Quoi ensuite | [`memory/TODO.md`](memory/TODO.md) |
| Quelle erreur ne pas refaire | [`memory/LESSONS.md`](memory/LESSONS.md) |
| Où on en est | [`memory/MEMORY.md`](memory/MEMORY.md) |
| Ce qui est sorti | [`memory/CHANGELOG.md`](memory/CHANGELOG.md) |
| **Décisions VERROUILLÉES** (Tritri, audio, UI) | [`figees/encyclopedie.md`](figees/encyclopedie.md) |

---

## 🗺️ Où vit quoi

| Quoi | Où |
|------|-----|
| **UI / code** (déployé GitHub Pages) | [`../site/dev-dinos.html`](../../site/dev-dinos.html) |
| **Données dinos** (source de vérité) | [`../site/js/dinos-data.js`](../../site/js/dinos-data.js) |
| **Audio** (récits, menus, fiches) | [`../site/audio/dinos/`](../../site/audio/dinos/) |
| **Images** (fiches déployées) | [`../site/img/dinos/`](../../site/img/dinos/) |
| **Images paléoart APP couleur** | PROD = [`../site/img/dinos/paleoart/`](../../site/img/dinos/paleoart/). Complétude → [`memory/_ETAT-DINOS.md`](memory/_ETAT-DINOS.md) généré. |
| **Images Lunii** (emblèmes + couverture) | [`content/lunii/`](content/lunii/INDEX.md) · skill `dino-images-lunii` |
| **Sources contenu** (récits, échelle, étymo, factcheck) | [`content/sources/`](content/sources/) |
| **Données structurées** (racines dico/quiz) | [`content/data/racines.json`](content/data/racines.json) |
| **Scripts** (audio, grok, export/regen) | [`content/scripts/`](content/scripts/) |
| **Carte du dossier content** | [`content/INDEX.md`](content/INDEX.md) |

## 🦕 Le produit

Encyclopédie dino pour Max (4 ans), 4 onglets (Familles · Ce qu'il mange · Le voyage · Le dico). Détail : [`INDEX.md`](INDEX.md) + [`memory/INVARIANTS.md`](memory/INVARIANTS.md).

## 🔊 Audio (PROCESS MILITAIRE)

- Voix : narrateur_h (menus) · narrateur_f (voyage). Récits multi-voix = MCP `studio_audiobook_from_segments_v2_dialogue`. Accroche menu = 2-7 s. **AVANT toute génération** : `grep -niE "max|doudou|peluche|bus" <texte>` → match (hors échelle-bus) = STOP.
- Détail process + skill : [`.claude/rules/dino.md`](../../.claude/rules/dino.md) § Audio + skill `ecriture-audio-enfants` (global) + agent [`narration-audio-writer`](../../.claude/agents/narration-audio-writer.md).

## Workflow

```
Plan → TodoWrite → Dev → Verify (screenshot/test) → Commit+Push → grave dans memory/
```
Papa Yann teste via GitHub Pages → **toujours commit+push** après modif dino.
Après correction utilisateur → leçon dans [`memory/LESSONS.md`](memory/LESSONS.md) + (si règle) figée.

---

## Pointeurs

- Catalogue navigable : [`INDEX.md`](INDEX.md)
- Décisions verrouillées : [`figees/encyclopedie.md`](figees/encyclopedie.md)
- Pôles voisins : [`../minijeux/CLAUDE.md`](../minijeux/CLAUDE.md) · [`../narration/CLAUDE.md`](../narration/CLAUDE.md)

---

_Créé 2026-06-03. Mémoire migrée `pmo/` → `memory/` (quintette) le 2026-09-04, HO-008._
