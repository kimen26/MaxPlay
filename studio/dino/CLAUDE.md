# PÔLE DINO — Règles auto-chargées

> Pôle **transverse** (UI de jeu + contenu narré/audio) — pair de [`../minijeux/`](../minijeux/CLAUDE.md) et [`../narration/`](../narration/CLAUDE.md).
> Chargé dès qu'un fichier sous `studio/dino/` (gouvernance) est touché. **Le CODE est déployé depuis [`../../site/`](../../site/)** (dev-dinos.html, dinos-data.js, audio/dinos, img/dinos). ⚠️ Éditer le code déployé charge la **rule** [`.claude/rules/dino.md`](../../.claude/rules/dino.md), **pas ce fichier** — la rule porte les règles ops, ce CLAUDE.md = navigation/gouvernance.
> ⚠️ Ce fichier **n'est PAS re-injecté après `/compact`** — il rechargera au prochain contact d'un fichier dino. Le routage racine, lui, survit.

---

## Principes pôle DINO (non négociables)

- **Encyclopédie = VRAI** : on dit les vrais noms (Trias, Théropodes…) et les vraies dates/chiffres. Jamais de nian-nian (« si longtemps qu'on ne peut pas compter » = banni).
- **Échelle honnête** : aucune comparaison de taille qui ment > 10 %. Référentiel figé dans [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md).
- **Grokipedia = 1ʳᵉ source** de fact-check (avant Wikipedia).
- **Tritri** = running gag de Wex (son dino préféré, un Tricératops). 🔒 JAMAIS « Max », « doudou », « peluche ». Voir [`figees/encyclopedie.md`](figees/encyclopedie.md).
- **Zéro bus dans les récits narrés** (le bus reste OK en échelle de taille des fiches, validé).
- **Audio = écouter** : « écoute » jamais « regarde ». Wex en FR standard, aucun tic écrit (la voix les ajoute).

---

## ⚙️ PMO + Archiviste + Conseiller

`dino-pmo` (FOND) et `dino-archiviste` (FORME) sont **invoqués automatiquement** à chaque tour incluant un signal DINO. `dino-conseiller` (créatif) est invoqué pour l'écriture/la péda/la taxo.

| Source de vérité | Fichier |
|------------------|---------|
| Chiffres clés (count dinos/familles, échelle, casting voix, audio) | [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) |
| Décisions figées + questions ouvertes | [`pmo/decisions.md`](pmo/decisions.md) |
| Journal sessions | [`pmo/sprint-log.md`](pmo/sprint-log.md) |
| Tickets EP + leçons L | [`pmo/backlog.md`](pmo/backlog.md) |
| Traces audits | [`pmo/audit-trail.md`](pmo/audit-trail.md) |
| **Décisions VERROUILLÉES** (Tritri, audio, UI) | [`figees/encyclopedie.md`](figees/encyclopedie.md) |

---

## 🗺️ Où vit quoi

| Quoi | Où |
|------|-----|
| **UI / code** (déployé GitHub Pages) | [`../site/dev-dinos.html`](../../site/dev-dinos.html) |
| **Données 50 dinos** | [`../site/js/dinos-data.js`](../../site/js/dinos-data.js) |
| **Audio** (récits, menus, fiches) | [`../site/audio/dinos/`](../../site/audio/dinos/) |
| **Images** | [`../site/img/dinos/`](../../site/img/dinos/) |
| **Sources contenu** (récits, échelle, étymo, factcheck, process) | [`content/`](content/) |
| **Scripts** (gén audio, grok, json) | [`content/`](content/) (chemins absolus ou CWD-racine) |

---

## 🦕 Le produit (rappel)

Encyclopédie dino pour Max (4 ans), 3 onglets :
1. **Les familles** (défaut) — 9 familles, **nom scientifique en titre** (Théropodes…) + surnom + origine grecque dite en entrant.
2. **Ce qu'il mange** — 4 régimes **alimentaires** (carnivores/herbivores/piscivores/omnivores).
3. **Le voyage** — 8 récits d'époque audio (Narratrice F + Wex), fil rouge Tritri trouvé au Crétacé. Indicateur d'avancement (reset session).

Fiches dino : nom_etym (étymo expliquée) + taille (échelle honnête) + régime + funfact + audio si dispo.

---

## 🔊 Audio (PROCESS MILITAIRE — voir figée + skill)

- Voix : **narrateur_h** (menus accueil/régime/familles) · **narrateur_f** (voyage + 8 récits). Résolus via [`../narration/personnages/voix-meta/voice-map.json`](../narration/personnages/voix-meta/voice-map.json).
- Récits multi-voix = MCP `studio_audiobook_from_segments_v2_dialogue` (eleven_v3, stability 0,4). Accroches menu mono = `text_to_speech`. Loudnorm en post.
- **Accroche de menu = 2-7 s.** Récit d'époque = ~10-25 s.
- **AVANT toute génération** : `grep -niE "max|doudou|peluche|bus" <texte>` → si match (hors échelle-bus), STOP. (Process figée.)
- Métier d'écriture orale : skill [`~/.claude/skills/ecriture-audio-enfants/`](C:/Users/kimen/.claude/skills/ecriture-audio-enfants/) + agent [`narration-audio-writer`](../../.claude/agents/narration-audio-writer.md). Kit complet : mémoire `reference_audio_kit_enfant`.

---

## Workflow

```
Plan → TodoWrite → Dev → Verify (screenshot/test) → Commit+Push → PMO grave
```
Papa Yann teste via GitHub Pages → **toujours commit+push** après modif dino.
Après correction utilisateur → leçon dans [`pmo/backlog.md`](pmo/backlog.md) + (si règle) figée.

---

## Pointeurs

- Catalogue navigable : [`INDEX.md`](INDEX.md)
- Décisions verrouillées : [`figees/encyclopedie.md`](figees/encyclopedie.md)
- Pôles voisins : [`../minijeux/CLAUDE.md`](../minijeux/CLAUDE.md) · [`../narration/CLAUDE.md`](../narration/CLAUDE.md)

---

_Créé 2026-06-03 : pôle DINO extrait de game/ (transverse jeu+narration). Code déployé reste dans site/, lié par `.claude/rules/dino.md`. Voir [`pmo/audit-trail.md`](pmo/audit-trail.md)._
