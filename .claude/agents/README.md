# Agents projet MaxPlay

> **Catalogue généré** par `scripts/gen-agents-readme.mjs` depuis les frontmatters de `.claude/agents/*.md`.
> Ne pas éditer la table à la main — elle sera écrasée au prochain run. Régénérer après tout ajout/retrait/renommage d'agent :
> ```bash
> node scripts/gen-agents-readme.mjs
> ```

## ⚠️ Règle critique frontmatter (ne plus jamais oublier)

Le harness Claude Code parse le YAML du frontmatter en mode strict. Dans la valeur `description:` **non quotée**, certains caractères font **rejeter silencieusement l'agent** (il disparaît de la liste sans erreur visible) :

| Interdit | Remplacer par |
|----------|---------------|
| `:` interne (ex: `Foo : bar`) | `-` ou `(parenthèses)` |
| Em-dash `—` (U+2014) | `-` (tiret simple) |
| `×` (U+00D7) | `x` |

**OK :** accents (é è à ç), apostrophes typographiques ('), virgules, points, parenthèses, tirets simples.

**Alternative** si on tient au caractère : quoter la description.
```yaml
description: "Foo : bar — baz"
```

### Symptôme du bug

- Agent présent sur disque, frontmatter visiblement valide
- Pas listé dans les `subagent_type` disponibles
- Aucune erreur dans la sortie Claude Code
- Reboot VSCode ne change rien

### Diagnostic en 30 secondes

```bash
grep -P '[—×]|: .* :' .claude/agents/*.md
```

Si match dans une ligne `description:` → cause probable. Ce script (`gen-agents-readme.mjs`) fait la même détection automatiquement et liste les fichiers suspects ci-dessous si besoin.

### Historique

- **2026-05-02** : 5 agents (narration-pmo, narration-architecte, narration-audio, narration-gatekeeper, pixel-map-simplifier) absents pendant ~1 semaine. Cause identifiée et corrigée. Règle documentée ici.
- **2026-09-03** (HO-G12) : fusion des 3 agents pipeline tile en `game-tile.md` (3 modes) ; fusion `narration-lecteur` + `narration-lecteur-dyade` en `narration-lecteur.md` (2 modes) ; archivage `narration-science` + `narration-sensibilite` (0 usage tracé) ; passage à `memory: project` pour conseillers + PMO + directeur + gatekeeper narration ; `EQUIPE.md` / `ORGANIGRAMME.md` réduits à ce que ce catalogue ne couvre pas.

---

## Catalogue des agents

| Agent | Modèle | Pôle | Mémoire | Skills préchargés | Description |
|-------|--------|------|---------|--------------------|--------------|
| `dino-conseiller` | sonnet | DINO | project | — | Conseiller creatif Pole DINO MaxPlay - binome de l'auteur sur l'encyclopedie dino (contenu, pedagogie 4 ans, taxonomie, fact-check, ecriture audio narree). Challenge les idees, propose, fact-checke sur Grokipedia (1ere source), veille a l'honnetete scientifique et a l'echelle juste. A invoquer pour ecrire/reviser un recit ou une fiche, trancher une taxo, valider un fait, adapter a 4 ans. Sonnet pour jugement nuance. |
| `dino-fiche-writer` | sonnet | DINO | — | ecriture-audio-enfants, audio-direction-elevenlabs | Prepare de bout en bout la fiche audio d un dino (ou un lot) : script V3 corrige (fact-check Grokipedia, echelle honnête EXECUTEE, zero doublon, proies jamais presentees comme dangers) + segments JSON tagues eleven_v3 prets pour generation. Contexte neuf assume : tout le canon est recharge depuis les fichiers listes, rien n est fait de memoire. A invoquer pour toute correction/reecriture de fiche audio dino (retours d ecoute Lunii, audit qualite des 70 fiches, nouveau dino hors playbook). |
| `dino-pmo` | sonnet | DINO | project | — | PMO unifie Pole DINO MaxPlay (fusion PMO + archiviste 2026-07-19) - garant du FOND (INVARIANTS, decisions, sprint-log, backlog, figees) ET de la FORME (structure studio/dino/, refs valides, coherence code deploye site/). Classifie les inputs, grave multi-fichiers, audite, alerte. Invoquer en cloture de session DINO, en mode RECHERCHE pour tout chiffre, et via /dino-pmo-audit. Sonnet pour fiabilite d'ecriture. |
| `game-conseiller` | opus | JEU | project | — | Conseiller Game MaxPlay - binôme créatif de l'auteur sur le pôle JEU (transverse aux 3 sous-domaines - mini-jeux, tile, wexworld). Ta voix, ton miroir, force de proposition. Connaît Max, ses passions, ce qui marche/foire. Challenge les idées, propose des évolutions, fait le lien entre les sous-domaines. Opus pour réflexion produit profonde. |
| `game-dev` | sonnet | JEU | — | — | Agent spécialisé développement jeux MaxPlay - mini-jeux HTML vanilla, Phaser.js, SVG bus, déploiement GitHub Pages. Utilise Sonnet pour le code de qualité production. |
| `game-mj-reviewer` | haiku | JEU | — | — | Sachant validateur des mini-jeux HTML MaxPlay avant livraison. Examine un MJ contre les 30+ règles UX/péda/techniques gravées dans rules.md + stack.md. Checklist hardcodée 5 sections (Bus & couleurs / UX 3.5-4 ans / Audio / Technique / Vocab & péda). Verdict PASS/FAIL avec issues CRITIQUE/HAUTE/MOYENNE/BASSE. Max 5 iter. Haiku pour verdict structuré rapide. |
| `game-pmo` | sonnet | JEU | project | — | PMO unifie Pole JEU MaxPlay (fusion PMO + archiviste + sous-PMO tile/mj 2026-07-19) - garant du FOND (INVARIANTS, decisions, sprint-log, backlog, figeage MJ) ET de la FORME (structure studio/minijeux/, refs, conventions, orphelins) ET des domaines tile/mj (LESSONS, rules, stack, PIPELINE-MEMORY). Classifie, grave multi-fichiers, audite, alerte. Invoquer en cloture de session JEU, en mode RECHERCHE pour tout chiffre, et via /game-pmo-audit. Sonnet pour fiabilite d'ecriture. |
| `game-test-audio` | haiku | JEU | — | — | Auditeur AUDIO des mini-jeux HTML MaxPlay. Vérifie qu'une seule voix joue à la fois (MP3 coupe le TTS et inversement), que la consigne se lance toute seule au bon moment sans se chevaucher, que les MP3 manquants retombent proprement sur le TTS de secours, que les SFX ont le padding 250ms, et que rien ne parle au démarrage brut (EP-033). S'appuie sur des recherches déterministes puis juge le flux. Rend PASS ou FAIL avec findings localisés. Ne corrige pas. Haiku. |
| `game-test-secu` | haiku | JEU | — | — | Auditeur SÉCURITÉ des mini-jeux HTML MaxPlay (XSS, secrets, inputs non validés). Lit un ou plusieurs site/mj-XX.html plus les js partagés qu'ils chargent, traque injection via innerHTML de données non fiables (surnom enfant, saisie, contenu distant), secrets en dur (clés API, tokens Supabase), fetch non validé. Rend un verdict PASS ou FAIL avec findings CRITIQUE HAUTE MOYENNE BASSE et le correctif exact. Ne corrige pas, il signale. Haiku pour audit structuré rapide. |
| `game-tile` | sonnet | JEU | — | maxplay-tiles | Sachant tile MaxPlay unifie (fusion simplifier+designer+reviewer 2026-09-03) - pipeline LimeZu complet en 3 modes. Mode ANALYSE - photo/description/croquis vers ANALYSE structuree. Mode RECETTE - ANALYSE vers recette Python test_<nom>.py + render.py + auto-inspection PNG. Mode REVUE - verdict PASS/FAIL contre les 30+ leçons et regles d'or, max 5 iterations. A invoquer pour toute composition de tiles LimeZu (carrefour, route, quartier). Skill maxplay-tiles preleve au demarrage. |
| `narration` | opus | NARRATION | project | — | Directeur Éditorial MaxPlay - sélectionne la meilleure version parmi les drafts writers, pilote le rewrite, valide la version finale. C'est le trancheur. Owner des étapes 3 (briefs), 6 (sélection), 7 (rewrite si writer top 1 défaillant), 10 (canon) du PROCESS narration. |
| `narration-audio` | sonnet | NARRATION | — | — | Directeur Audio MaxPlay - transforme une histoire canon en MP3 multi-voix via la methode officielle MCP studio_audiobook_from_segments_v2_dialogue. Appele apres canonisation (etape 10). Produit le brief audio + les segments JSON + lance la production. Methode figee DEC-AUDIO-PRODUCTION-001 v3. |
| `narration-audio-writer` | sonnet | NARRATION | — | ecriture-audio-enfants | Writer specialise en narration ORALE pour jeunes enfants (3-6 ans) destinee a etre ECOUTEE (audio, dialogue voix off, recits ElevenLabs). Tue la molesse (phrases plates, fausse voix d enfant, remplissage). Charge la craft jeunesse, delegue le punch a Kimi (meilleur copain pour l oral vivant), polit, s auto-relit a voix haute. Produit un dialogue pret a taguer (Narratrice + Wex). A invoquer pour ecrire ou reecrire tout texte narre enfant. Ne traite PAS le texte ECRIT/UI (autre registre). |
| `narration-conseiller` | opus | NARRATION | project | — | Conseiller Narratif MaxPlay - le vrai binôme de l'auteur. Il ne valide pas, il construit avec. Produit `1-pitch-plan.md` (pitch + plan léger fusionnés depuis 2026-05-12). Il pose les questions que l'auteur n'a pas encore pensé à se poser. Il pull les data, challenge, rebondit, et maintient la carte narrative vivante. Intègre la matière statique de l'ancien Architecte (Kishōtenketsu + boussole 4-5 ans). |
| `narration-gatekeeper` | haiku | NARRATION | project | — | GateKeeper MaxPlay - validation technique finale d'une histoire avant canonisation. Checklist rapide (prénoms, règles univers, longueur, dialogues). Ne réécrit pas. Verdict PASS ou corrections rapides. |
| `narration-lecteur` | sonnet | NARRATION | — | — | Lecteur Temoin MaxPlay unifie (fusion enfant+dyade 2026-09-03) - simule la lecture d'une histoire en 2 modes. Mode ENFANT - reaction d'un enfant seul de 4-6 ans, texte libre instinctif. Mode DYADE - lecture a voix haute par un parent a un enfant de 4-6 ans, deux voix separees (enfant + parent). Owner partiel etape 5 du PROCESS narration. |
| `narration-localisation` | sonnet | NARRATION | — | — | Localisation MaxPlay - adapte les histoires canon pour 8 cultures cibles. Prénoms, lieux, rituels, tonalités. Appelé quand une histoire canon doit être localisée, ou pour auditer la localisabilité d'une nouvelle histoire avant canonisation. |
| `narration-pmo` | sonnet | NARRATION | project | — | PMO unifie Narration MaxPlay (fusion PMO + archiviste 2026-07-19) - garant du FOND (INVARIANTS, decisions, backlog, sprint-log, lecons-vivantes, kanbans, SLA) ET de la FORME (gabarit stories, prefixes etapes, INDEX, lookup.yml, refs). Mode RECHERCHE obligatoire pour tout chiffre (casting writers, voice_ids). Relecture briefs writers (negations gratuites). Invoquer en cloture de session narration et via /narration-pmo-audit. Sonnet pour fiabilite d'ecriture. |
| `narration-writer-claude-libre` | opus | NARRATION | — | — | Writer Claude MaxPlay libre. Recoit brief histoire et brief personnages en message. Produit histoire 350-550 mots et note d intention. Variance par modele et temperature uniquement. |
| `narration-writer-kimi-guide` | sonnet | NARRATION | — | — | Writer Kimi GUIDE MaxPlay - orchestre le writer guide via MCP ask_kimi. Recoit brief-personnages + brief-histoire en message. Compose le prompt system+user, appelle ask_kimi avec les axes 1-6, enregistre la version et rend compte au Directeur. |
| `quick` | haiku | TRANSVERSE | — | — | Agent léger MaxPlay pour questions rapides, status, recherches simples dans le projet. Utilise Haiku pour des réponses immédiates à faible coût. |

---

## Liens

- Pôle JEU — équipe et workflows détaillés : [`../../studio/minijeux/EQUIPE.md`](../../studio/minijeux/EQUIPE.md)
- Pôle NARRATION — chaîne de commandement et cérémonies : [`../../studio/narration/equipe/ORGANIGRAMME.md`](../../studio/narration/equipe/ORGANIGRAMME.md)
- Index équipe narration : [`../../studio/narration/equipe/INDEX.md`](../../studio/narration/equipe/INDEX.md)
- Process militaire narration (11 étapes 0-10) : [`../../studio/narration/equipe/PROCESS.md`](../../studio/narration/equipe/PROCESS.md)
- Mémoires officielles des agents (`memory: project`) : [`../agent-memory/`](../agent-memory/)
