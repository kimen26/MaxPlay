# Narration — Index racine

> **Charger ce fichier en premier.** Lire les sous-fichiers seulement si la tâche le nécessite.
> Architecture en **4 piliers narratifs + opérationnel** (refonte 2026-05-10).

---

## État du projet

| Quoi | Statut |
|------|--------|
| **Doctrine transverse** | ✅ pointeur → [`../../memory/DOCTRINE.md`](../../memory/DOCTRINE.md) (D-001 pédagogie, D-002 zéro pénalité, D-003 récompense bannie) |
| **Casting V1** | ✅ figé 2026-04-24 (4F/5M+Wex) — Wex + Melki/Mimi/Dadou/**Madie**/Lulu/Pierrot/Raph/Juju/Nono |
| **Univers** | post-Éveil, Printemps de l'Éveil — distillé dans `univers/` |
| **Direction narrative** | monde sobre, merveilleux discret (vu à travers l'enfant né dedans) · patte B+D+C (Kishōtenketsu + tranche de vie + cycle) |
| **Histoires** | 001 *Le Pont Cassé* (canon 540 mots, 2026-05-08). Brainstorm arc 1 en cours (002-010). Direction Nono validée. Arc 2 (Parole) en pause. |
| **Nom univers** | non tranché — voir [`univers/meta/nom-candidats.md`](univers/meta/nom-candidats.md) |

---

## Architecture

```
narration/
├── personnages/     ← Pilier 1 : qui sont les persos (+ théorie sur l'humain)
├── univers/         ← Pilier 2 : le monde où ils vivent
├── cross-culture/   ← Pilier 3 : variantes par culture (prénoms, onomatopées, lieux, faune, coutumes, saisons climat)
├── saisons/         ← Pilier 4 : plan éditorial (saison → arc → stories)
├── stories/         ← contenu produit
├── equipe/, pmo/, scripts/, archive/, memory/   ← opérationnel
└── README.md, INBOX.md, INDEX.md
```

---

## Pilier 1 — Personnages

| Fichier | Quand le lire |
|---------|---------------|
| [`personnages/INDEX.md`](personnages/INDEX.md) | **Toujours — avant d'écrire un perso** (casting V1 figé) |
| [`personnages/notation-types.md`](personnages/notation-types.md) | Convention `TypeN/TitiN @origine` dans les textes |
| [`personnages/lookup.yml`](personnages/lookup.yml) | Résolveur token → prénom (toutes cultures) |
| [`personnages/casting-mapping.md`](personnages/casting-mapping.md) | Pont théorie ↔ casting V1 |
| [`personnages/type-NN/`](personnages/) | 9 fiches incarnées (caractere, voix, relations, sensibilite) |
| [`personnages/wex/`](personnages/wex/) | Fiche Wex (hors-système, invariant cross-culture) |
| [`personnages/theorie/enneagramme/`](personnages/theorie/enneagramme/README.md) | Théorie ennéagramme (Chabreuil, guide auteur, interactions 9×9, émotions 9×9) |
| [`personnages/theorie/pedagogie-enfance/`](personnages/theorie/pedagogie-enfance/README.md) | **Boussole pédagogique 4-5 ans** (à consulter avant brainstorm/plan/brief) |

---

## 🎨 Craft narratif (le *comment* écrire)

| Ressource | Quand |
|-----------|-------|
| [`narration-craft`](../../.claude/skills/narration-craft/SKILL.md) — skill **routeur**, 15 masterclasses (structures, voix, sensoriel, comédie, développement, prose…) | Brief (structure+voix) · écriture (sensoriel+comédie) · rewrite (prose+voix). Charge le sous-fichier pertinent à la demande |
| Rule auto-chargée [`.claude/rules/narration-craft.md`](../../.claude/rules/narration-craft.md) | Pointeurs auto dès qu'on touche `stories/`, `equipe/`, `personnages/` (anti-pollution) |

> 🛑 Garde-fou : cliffhanger/open-loop OK au milieu, **jamais à la fin** (patte Kishōtenketsu apaisant). Ennéagramme : vérité = `personnages/theorie/enneagramme/`, le craft ne fait qu'illustrer.

---

## Pilier 2 — Univers

| Fichier | Contenu |
|---------|---------|
| [`univers/INDEX.md`](univers/INDEX.md) | Carte du pilier |
| [`univers/fondements/monde.md`](univers/fondements/monde.md) | Événement fondateur, nature, société, rituels, spiritualité |
| [`univers/fondements/systemes.md`](univers/fondements/systemes.md) | Conscience Créative, Totems Janus, Égregores, Gardiens |
| [`univers/fondements/grand-cycle.md`](univers/fondements/grand-cycle.md) | Cycle 22k ans, Yugas adaptés, Ombre Éternelle |
| [`univers/fondements/vibration.md`](univers/fondements/vibration.md) | Fréquence/amplitude, égrégores, lien Janus |
| [`univers/fondements/sensibilites.md`](univers/fondements/sensibilites.md) | Doctrine des 9 sensibilités |
| [`univers/vie-quotidienne/`](univers/vie-quotidienne/) | Compagnons, école, géographie, transport, soin bioélectrique |
| [`univers/meta/nom-candidats.md`](univers/meta/nom-candidats.md) | 5 finalistes pour nommer le monde |

---

## Pilier 3 — Cross-culture

| Fichier | Contenu |
|---------|---------|
| [`cross-culture/INDEX.md`](cross-culture/INDEX.md) | **Toujours — point d'entrée pilier 3** |
| [`cross-culture/doctrine.md`](cross-culture/doctrine.md) | Doctrine cross-culture (bulles, croisements, anti-cliché) |
| [`cross-culture/prenoms/INDEX.md`](cross-culture/prenoms/INDEX.md) | 218 prénoms qualifiés / 30 cultures (réserve) |
| [`cross-culture/castings-nationaux/`](cross-culture/castings-nationaux/INDEX.md) | Castings attribués (FR figé, jp/br/he/sw… à venir) |
| [`cross-culture/onomatopees/`](cross-culture/onomatopees/INDEX.md) | Catalogue 37 onomatopées validées |
| [`cross-culture/faune-flore/`](cross-culture/faune-flore/INDEX.md) | À peupler (animaux/plantes par culture) |
| [`cross-culture/lieux-locaux/`](cross-culture/lieux-locaux/INDEX.md) | À peupler (équivalents pont/rivière/talus par culture) |
| [`cross-culture/coutumes-jeux-aliments/`](cross-culture/coutumes-jeux-aliments/INDEX.md) | À peupler (gestes culturels du quotidien) |
| [`cross-culture/saisons-climat/`](cross-culture/saisons-climat/INDEX.md) | À peupler (saisons locales) |

---

## Pilier 4 — Saisons (plan éditorial)

| Fichier | Contenu |
|---------|---------|
| [`saisons/INDEX.md`](saisons/INDEX.md) | Roadmap globale (S1 en cours, S2/S3 à venir) |
| [`saisons/saison-1/INDEX.md`](saisons/saison-1/INDEX.md) | Saison 1 — 4 arcs (cadre, fil rouge) |
| [`saisons/saison-1/arc-1-objet-decor/`](saisons/saison-1/arc-1-objet-decor/) | Arc 1 — priorité actuelle (10 épisodes) |
| [`saisons/saison-1/arc-2-parole/`](saisons/saison-1/arc-2-parole/) | Arc 2 — en pause |
| [`saisons/saison-1/arc-3-univers-specifique/`](saisons/saison-1/arc-3-univers-specifique/) | Arc 3 — pas avant |
| [`saisons/saison-1/arc-4-pouvoirs-wex/`](saisons/saison-1/arc-4-pouvoirs-wex/) | Arc 4 — fil rouge de fin de saison |

---

## Contenu produit

| Fichier | Contenu |
|---------|---------|
| [`stories/INDEX.md`](stories/INDEX.md) | **Catalogue** des histoires |
| [`stories/001-le-pont-casse/`](stories/001-le-pont-casse/) | Canon complet (540 mots, 11 étapes PROCESS) |
| [`stories/brainstorm-arc-1.md`](stories/brainstorm-arc-1.md) | Fiche brainstorm arc 1 (002-010) en cours |
| [`stories/axes-histoires-en-stock.md`](stories/axes-histoires-en-stock.md) | Stock d'axes (10 unitaires + 5 transversaux) |
| [`stories/_gabarit/`](stories/_gabarit/) | Dossier modèle à copier pour une nouvelle histoire |

---

## Identité visuelle

| Fichier | Contenu |
|---------|---------|
| [`visual-identity/README.md`](visual-identity/README.md) | **Index maître** — logo saga, couvertures, prompts |
| [`visual-identity/style-guide.md`](visual-identity/style-guide.md) | Palette, grain, traitement Wex, cadre cover — **lire avant de générer** |
| [`visual-identity/logo-saga/`](visual-identity/logo-saga/) | Logo Wex World (versions + prompts-log) |
| [`visual-identity/NNN-titre/`](visual-identity/) | Un dossier par histoire (illustrations + prompts-log) |

> Modèles utilisés : Grok (logo) · ChatGPT DALL-E 3 (covers) · Midjourney recommandé pour cohérence saga.

---

## Duel de goût (créé 2026-07-03)

| Fichier | Contenu |
|---------|---------|
| [`gout/README.md`](gout/README.md) | **Protocole duel de goût** (app `site/duel.html`, règles dures anti-verbatim/anonymat/anti-Frankenstein) |
| [`gout/memoire-papa-yann.md`](gout/memoire-papa-yann.md) | Mémoire de goût auteur — **lecture obligatoire Directeur étapes 3 et 6** (descripteurs craft, jamais de verbatim) |
| [`gout/palmares-writers.md`](gout/palmares-writers.md) | Track record writers + angles pour micro-briefs |

---

## Mémoire & notes opérationnelles

| Fichier | Contenu |
|---------|---------|
| [`memory/state.md`](memory/state.md) | État instantané projet (statuts stories, décisions en cours, SLAs) |
| [`memory/business/`](memory/business/) | Notes métier (monétisation, roadmap long terme) |

---

## Équipe éditoriale (process & agents)

| Fichier | Rôle |
|---------|------|
| [`equipe/INDEX.md`](equipe/INDEX.md) | **Toujours — index équipe, arbre de décision agents** |
| [`equipe/PROCESS.md`](equipe/PROCESS.md) | Workflow militaire 11 étapes 0-10 (étape 2 = Brainstorm) |
| [`equipe/patte-narrative-maxplay.md`](equipe/patte-narrative-maxplay.md) | Patte B+D+C (Kishōtenketsu + tranche de vie + cycle) |
| [`equipe/lecons-vivantes.md`](equipe/lecons-vivantes.md) | Document vivant des patterns confirmés (P1-P10, G1-G6) |
| [`equipe/templates/`](equipe/templates/) | 10 gabarits réutilisables (pitch, plan, briefs, sélection, kanban, synthèse) |
| [`equipe/ORGANIGRAMME.md`](equipe/ORGANIGRAMME.md) | Qui fait quoi |
| [`equipe/cartographie-domaines.md`](equipe/cartographie-domaines.md) | Où va quelle info · qui décide · invariants |
| [`equipe/profils-lecteurs.md`](equipe/profils-lecteurs.md) | Profils lecteurs témoins |
| [`equipe/sources-sciences.md`](equipe/sources-sciences.md) | Refs documentaires sciences |
| [`equipe/sources-sensibilite.md`](equipe/sources-sensibilite.md) | Catalogue topics sensibles / conspirationnistes |
| [`equipe/sources-narratologie.md`](equipe/sources-narratologie.md) | Étude narratologique cross-culture |
| [`personnages/voix-meta/`](personnages/voix-meta/README.md) | **Voix méta** : narrateurs H/F + cheatsheet didascalies + preview-texts + alias-tags catalog + **`_VOICE-IDS-CASTING.md` (source de vérité méthodo v24)** + **`_SESSION-2026-05-11-RETOUR-EXP.md`** + étude vocale 18 prompts + playbook MaxPlay |
| 🎙️ **Skills audio globaux** (auto-triggered) | `~/.claude/skills/elevenlabs-voice-design/` (CRÉATION voix — **MAJ 2026-05-12 avec AP#15/16/17**) · `~/.claude/skills/audio-direction-elevenlabs/` (**PRODUCTION** multi-voix : text-to-dialogue, tags v3, tricks graphie, dicts, voice settings, **17 anti-patterns**, 12 cultures) |
| [`equipe/memoire-*.md`](equipe/) | Mémoires décentralisées par agent |
| [`scripts/check-compteurs.js`](scripts/check-compteurs.js) | **Anti-dérive des chiffres en dur** : recompte les faits sur disque (prénoms, onomatopées, masterclasses craft, stories) et compare aux chiffres déclarés dans les INDEX. Ne réécrit rien, rapporte. `node studio/narration/scripts/check-compteurs.js` — exit 1 si dérive. Filet de la doctrine « zéro chiffre en dur » ([`memory/DOCTRINE.md`](../../memory/DOCTRINE.md)) ; à passer en clôture d'audit PMO. |

---

## Production audio (PROCESS MILITAIRE depuis 2026-05-16)

**Voie officielle** : Outil MCP `studio_audiobook_from_segments_v2_dialogue` (clé ~/.claude.json).

| Ressource | Rôle |
|-----------|------|
| **Outil MCP** | [`studio_audiobook_from_segments_v2_dialogue`](../../infra/mcp/server.ts#L606) — **VOIE PAR DÉFAUT** production multi-voix. Modèle `eleven_v3` forcé. Resolver : `voice-map.json`. Fallback CLI : `scripts/generate-story-dialogue.js`. |
| **Décision figée** | [`pmo/decisions.md`](pmo/decisions.md) § DEC-AUDIO-PRODUCTION-001 — texte-to-dialogue API, packetisation ≤2000 char, ffmpeg loudnorm. **Jamais régresser.** |
| **Process détaillé** | [`equipe/PROCESS.md`](equipe/PROCESS.md) § PROCESS Audio (5 étapes : voice-director markup → packetisation → API calls → concat loudnorm → archivage) |
| **Règles auto-chargées** | [`.claude/rules/audio.md`](../../.claude/rules/audio.md) — **ENFORCED** dès que Claude touche script audio/segments JSON. Voie MCP + eleven_v3 + voice-map.json + 9 règles obligatoires + 10 anti-patterns bannis. |
| **Voice-meta source** | [`personnages/voix-meta/_VOICE-IDS-CASTING.md`](personnages/voix-meta/_VOICE-IDS-CASTING.md) — méthodo v24 figée. Voice IDs + settings (stability/similarity_boost/style) par perso + narrateurs H/F + pronunciation dicts. |
| **Voice resolver** | [`personnages/voix-meta/voice-map.json`](personnages/voix-meta/voice-map.json) — mappe authoritative `role` → `voice_id` (ex: `'wex'` → `'G54e8CyYslC2Y4ZupTlg'`). Source vérité pour outil MCP. |
| **Cheatsheet markup** | [`personnages/voix-meta/_CHEATSHEET-WRITERS.md`](personnages/voix-meta/_CHEATSHEET-WRITERS.md) — catalogue tags v3 + didascalies par perso + preview-texts. À consulter avant voice-director markup. |
| **Skills globaux** | `~/.claude/skills/elevenlabs-voice-design/` (CRÉATION voix) · `~/.claude/skills/audio-direction-elevenlabs/` (**PRODUCTION** multi-voix : API, tags v3, tricks graphie, pronunciation dicts, voice settings, 17+ anti-patterns, 12 cultures). Auto-trigger sur mots-clés audio. |

**Checklist avant lancement** :
- ✅ Outil MCP `studio_audiobook_from_segments_v2_dialogue` déclaré + clé EL_API_KEY dans ~/.claude.json
- ✅ `voice-map.json` rempli (au moins roles : wex, narrateur_h, narrateur_f)
- ✅ `_VOICE-IDS-CASTING.md` à jour (voice_ids + settings gravés)
- ✅ Script fallback `generate-story-dialogue.js` disponible
- ✅ ffmpeg installé (pour loudnorm concat)

---

## PMO (gestion de projet)

| Fichier | Rôle |
|---------|------|
| [`pmo/INDEX.md`](pmo/INDEX.md) | État instantané + règles de reprise après reboot |
| [`pmo/backlog.md`](pmo/backlog.md) | Tickets actifs (max 3 en cours) |
| [`pmo/decisions.md`](pmo/decisions.md) | Décisions définitives + questions ouvertes |
| [`pmo/sprint-log.md`](pmo/sprint-log.md) | Journal de sessions |
| [`pmo/roadmap.md`](pmo/roadmap.md) | Vision moyen terme |

---

## Inputs & archive

| Fichier | Rôle |
|---------|------|
| [`INBOX.md`](INBOX.md) | Zone unique de dump brut — hook commit auto |
| [`archive/`](archive/) | Sessions archivées (rien d'effacé) |
| [`archive/sessions/2026-05-10-restructuration-3-piliers.md`](archive/sessions/2026-05-10-restructuration-3-piliers.md) | Trace de la refonte 2026-05-10 (4 piliers) |

---

> Process complet 11 étapes → [`equipe/PROCESS.md`](equipe/PROCESS.md) · Règles → [`narration/CLAUDE.md`](CLAUDE.md)
