---
numero: "002"
slug: libellule-resonance
titre: La Libellule et la Résonance
statut: pitch              # idee / pitch / plan / briefs / versions / lecteurs / selection / rewrite / gatekeeper / re-relecture / canon / abandoned
version_active: null       # v1 / v2 / v3 (post-canon)
date_creation: 2026-05-11
date_validation: null
gatekeeper_passed: false

editorial:
  structure: Kishotenketsu
  antagoniste: false
  mots: 0
  palier: P2               # P1=2-4min / P2=4-6min / P3=6-8min
  duree_lecture: 0min
  patte: B+D+C             # B=Kishōtenketsu noyau · D=tranche de vie voix · C=cycle d'arc

personnages:
  liste: [wex, polo, nono]  # duo agité + observateur calme
  enneatypes: [3, 9]
  enneatype_heros: null    # ex: 6 (jamais nommé dans le texte)

themes:
  principal: resonance-apprentissage-mimetic
  secondaires: [harmonie-collective, observation-active, bienveillance]
  qualites: { polo: curiosite-energique, nono: discernement-vibration, wex: etrangete-catalyseur }

univers:
  magic_level: none        # none / light (max 2 détails discrets en arc 1)
  lieu: etang-amont        # bord d'étang en amont de la rivière du Pont (extension map 001)
  saison: printemps
  meteo: ensoleille
  moment: matinee

arc:
  rattachement: arc-1-objet-decor
  fiche: saisons/saison-1/arc-1-objet-decor/fiche.md

variantes:
  base: christ
  disponibles: [christ]

production:
  writers_planifies: 10    # 2 Claude libres + 3 Kimi libres + 1 Kimi guidé + 2 DeepSeek + 2 Grok (PROCESS 2026-05-08)
  writers_produits: 0
  lecteurs_planifies: 20   # 10 profils × 2 tranches d'âge (panel post-2026-05-08). Note transitoire : histoires <005 peuvent garder le panel 6 (2 enfant + 4 dyade)
  lecteurs_produits: 0
  rewrite_cycles: 0        # 1 max
  re_relecture_lecteurs: 0 # étape 9 (3-4 lecteurs ciblés sur rewrite)
  audio_produit: false     # production TTS ElevenLabs

relations:
  serie: null
  references: []           # autres histoires citées
---

# Titre de l'histoire

> **Statut :** `pitch` — voir [`kanban.md`](kanban.md) pour l'étape précise.
> **Patte :** Kishōtenketsu noyau (B) + voix tranche de vie (D) + cycle d'arc (C).
> **Texte canon :** [`texte.md`](texte.md) *(produit en étape 10)*

---

## Résumé

_(2-3 lignes, pas de spoiler de fin. Rempli par le Directeur à l'étape 10.)_

---

## Pourquoi cette histoire ?

- **Arc rattaché :** *(saisons/saison-1/arc-1-objet-decor / arc-2-parole / arc-3-univers-specifique / arc-4-pouvoirs-wex)*
- **Persos mis en valeur :**
- **Objet titre :**
- **Qualité promue (héritée de l'arc) :**

---

## Carte du dossier

```
NNN-slug/
├── README.md              ← ce fichier (carte vivante)
├── kanban.md              ← état des 11 étapes (source de vérité)
├── pitch.md               ← étape 1 (Conseiller)
├── plan-histoire.md       ← étape 2 (Architecte)
├── briefs/                ← étape 3 (Directeur)
│   ├── brief-univers.md
│   ├── brief-personnages.md
│   └── brief-histoire.md
├── versions-writers/      ← étape 4 (10 versions)
│   ├── claude-1.md · claude-2.md
│   ├── kimi-1.md · kimi-2.md · kimi-3.md · kimi-guide.md
│   ├── deepseek-1.md · deepseek-2.md
│   ├── grok-1.md · grok-2.md
│   └── _notes-intention/
├── lecteurs-temoins/      ← étape 5 (20 retours panel cible — 10 profils × 2 tranches)
│   ├── G-A1.md · G-A2.md · G-A3.md · G-B1.md · G-B2.md · G-B3.md
│   ├── F-A1.md · F-A2.md · F-A3.md · F-B1.md · F-B2.md · F-B3.md
│   ├── DPG-A.md · DPG-B.md · DPF-A.md · DPF-B.md
│   └── DMG-A.md · DMG-B.md · DMF-A.md · DMF-B.md
├── synthese-lecteurs.md   ← étape 5 (consolidation Directeur)
├── selection.md           ← étape 6 (Directeur)
├── rewrite/               ← étape 7 (1 cycle max)
│   └── <llm>-rewrite-v1.md
├── gatekeeper-verdict.md  ← étape 8
├── relecture-rewrite/     ← étape 9 (3-4 lecteurs ciblés sur rewrite)
│   └── <profil>.md × 3-4
├── synthese.md            ← étape 10 (Directeur)
├── relecture.md           ← étape 10 (Directeur)
├── texte.md               ← étape 10 — VERSION CANON
├── assets/                ← illustrations, supports visuels (illustrations, mockups)
├── audio/                 ← production TTS ElevenLabs
│   ├── narrateur-h.mp3     OR  narrateur-f.mp3   (texte narratif)
│   ├── dialogues/<perso>.mp3 (dialogues par perso)
│   └── mix-complet.mp3     (montage final story)
├── variantes-culturelles/ ← multi-culture (post-canon, tokens résolus par casting)
│   ├── fr/                 (casting V1 figé)
│   └── jp/ · br/ · ...     (à venir)
└── _archive/              ← versions abandonnées + anciennes vN
```

---

## Workflow audio (post-canon)

1. **Texte canon validé** (`texte.md` figé après étape 10)
2. **Voice-director extrait les didascalies** FR du texte ([`../../personnages/voix-meta/_CHEATSHEET-WRITERS.md`](../../personnages/voix-meta/_CHEATSHEET-WRITERS.md))
3. **Choix narrateur H ou F** selon ton de l'histoire (voir [`../../personnages/voix-meta/`](../../personnages/voix-meta/README.md))
4. **Génération TTS** via MCP `mcp__llm-copains__tts_elevenlabs` :
   - Voix narrateur pour le texte narratif (hors dialogues)
   - Voix persos pour chaque réplique (prompts depuis [`../../personnages/type-NN/voix.md`](../../personnages/))
5. **Mix final** dans `audio/mix-complet.mp3`
6. **Trace** `production.audio_produit: true` dans le frontmatter de ce README

→ Agent dédié : [`.claude/agents/narration-audio.md`](../../../.claude/agents/narration-audio.md)

---

## Liens process

- Workflow complet (11 étapes) : [`../../equipe/PROCESS.md`](../../equipe/PROCESS.md)
- Templates : [`../../equipe/templates/`](../../equipe/templates/)
- Règles tranchées : [`../../pmo/decisions.md`](../../pmo/decisions.md)
- Patte narrative : [`../../equipe/patte-narrative-maxplay.md`](../../equipe/patte-narrative-maxplay.md)
- Voix méta (narrateurs + cheatsheet) : [`../../personnages/voix-meta/`](../../personnages/voix-meta/README.md)
- Onomatopées cross-culture : [`../../cross-culture/onomatopees/catalogue-onomatopees.md`](../../cross-culture/onomatopees/catalogue-onomatopees.md)
