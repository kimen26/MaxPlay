# PÔLE DINO — Règles auto-chargées

> Pôle **transverse** (UI de jeu + contenu narré/audio) — pair de [`../minijeux/`](../minijeux/CLAUDE.md) et [`../narration/`](../narration/CLAUDE.md).
> Chargé dès qu'un fichier sous `studio/dino/` (gouvernance) est touché. **Le CODE est déployé depuis [`../../site/`](../../site/)** (dev-dinos.html, dinos-data.js, audio/dinos, img/dinos). ⚠️ Éditer le code déployé charge la **rule** [`.claude/rules/dino.md`](../../.claude/rules/dino.md), **pas ce fichier** — la rule porte les règles ops, ce CLAUDE.md = navigation/gouvernance.
> ⚠️ Ce fichier **n'est PAS re-injecté après `/compact`** — il rechargera au prochain contact d'un fichier dino. Le routage racine, lui, survit.

---

## Principes pôle DINO (non négociables)

- **🏛️ Doctrine GED (DEC-GED-001)** — la GED du pôle repose sur 3 axes : rangement + **canonicité** (canon sans numéro, historique dans `_archive/` daté) + **complétude** (checklist « dino complet » 8 axes, outil `_ETAT-DINOS`). Règles dures : **zéro chiffre en dur** dans la gouvernance (pointer INVARIANTS, JAMAIS dans le contenu narré qui doit dire les vrais chiffres) · **frontière autoring/produit** (une feature ne lit que `site/js/dinos-data.js`). Détail : [`pmo/decisions.md`](pmo/decisions.md) § DEC-GED-001 + [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md) § Doctrine. Nouveau dino → [`content/sources/_PLAYBOOK-DINO-NOUVEAU.md`](content/sources/_PLAYBOOK-DINO-NOUVEAU.md).
- **Encyclopédie = VRAI** : on dit les vrais noms (Trias, Théropodes…) et les vraies dates/chiffres. Jamais de nian-nian (« si longtemps qu'on ne peut pas compter » = banni).
- **Échelle honnête** : aucune comparaison de taille qui ment > 10 %. Référentiel figé dans [`pmo/INVARIANTS.md`](pmo/INVARIANTS.md).
- **Grokipedia = 1ʳᵉ source** de fact-check (avant Wikipedia).
- **Tritri** = running gag de Wex (son dino préféré, un Tricératops). 🔒 JAMAIS « Max », « doudou », « peluche ». Voir [`figees/encyclopedie.md`](figees/encyclopedie.md).
- **Zéro bus dans les récits narrés** (le bus reste OK en échelle de taille des fiches, validé).
- **Audio = écouter** : « écoute » jamais « regarde ». Wex en FR standard, aucun tic écrit (la voix les ajoute).

---

## ⚙️ PMO + Archiviste + Conseiller

**Capture immédiate (2026-07-19)** : toute idée/décision de Papa Yann dans le tour = 1 ligne dans `pmo/backlog.md` DANS LE TOUR (main agent). `dino-pmo` (unifié FOND+FORME, Sonnet) sert en clôture, audit et mode RECHERCHE. `dino-conseiller` (créatif) : écriture/péda/taxo — le consulter d'office sur tout brainstorm contenu. Hook Stop `pmo-check` : session dino sans trace pmo/ = bloquée.

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
| **Données dinos** (source de vérité) | [`../site/js/dinos-data.js`](../../site/js/dinos-data.js) |
| **Audio** (récits, menus, fiches) | [`../site/audio/dinos/`](../../site/audio/dinos/) |
| **Images** (fiches déployées) | [`../site/img/dinos/`](../../site/img/dinos/) |
| **Images paléoart APP couleur** (7 assets/dino : hero · headshot · manger · écosystème · Paris bus · funfact · coloriage) | **PROD** = [`../site/img/dinos/paleoart/`](../../site/img/dinos/paleoart/) (câblé, lu par `dev-dinos.html`). État complétude → [`pmo/_ETAT-DINOS.md`](pmo/_ETAT-DINOS.md) généré. Staging brut Grok = `_new-xxl/` (à valider→ranger, skill `dino-paleoart`). |
| **Images Lunii** (emblèmes familles + couverture, fond noir natif — source interne, non déployée) | [`content/lunii/`](content/lunii/INDEX.md) · skill `dino-images-lunii` · assemblées par [`../lunii/`](../lunii/CLAUDE.md) |
| **Sources contenu** (récits, échelle, étymo, factcheck, process) | [`content/sources/`](content/sources/) (recits · fiches · mesures · etymo) |
| **Données structurées** (racines dico/quiz) | [`content/data/racines.json`](content/data/racines.json) |
| **Scripts** (audio, grok, export/regen) | [`content/scripts/`](content/scripts/) (audio · images-grok · export) |
| **Carte du dossier content** | [`content/INDEX.md`](content/INDEX.md) (hub + sous-INDEX) |

---

## 🦕 Le produit (rappel)

Encyclopédie dino pour Max (4 ans), 4 onglets :
1. **Les familles** (défaut) — **nom scientifique en titre** (Théropodes…) + surnom + origine grecque dite en entrant. (Compte familles → INVARIANTS, table clé↔libellé incluse.)
2. **Ce qu'il mange** — 4 régimes **alimentaires** (carnivores/herbivores/piscivores/omnivores).
3. **Le voyage** — 8 récits d'époque audio (Narratrice F + Wex), fil rouge Tritri trouvé au Crétacé. Indicateur d'avancement (reset session).
4. **Le dico** — racines grec/latin récurrentes (69 racines, tap = écoute). Source `js/dinos-racines.js` (généré depuis `content/sources/etymo/`). [ajouté 2026-06-08]

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
