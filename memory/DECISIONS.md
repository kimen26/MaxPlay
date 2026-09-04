# DECISIONS — pourquoi c'est comme ça

> Une archive ne se réécrit pas : les entrées gardent leur syntaxe et leur vocabulaire
> d'époque. `D-NNN` est un compteur partagé — prendre le numéro suivant en RELISANT ce
> fichier au moment d'écrire, jamais au moment de décider.

## Doctrine (verbatim, ex-fichier doctrine transverse racine, supprimé le 2026-09-03)

> Zone mutualisée : vaut pour TOUS les pôles (jeu, dino, narration, lunii, outils à venir).
> Chaque PMO et chaque INDEX de pôle DOIT pointer vers ce fichier.
> On y note les phrases fondatrices qui serviront au tuto parents, au README, au marketing.
> Ajout = validation Papa Yann. Jamais supprimé, seulement enrichi.

### D-001 — La pédagogie est le produit (2026-07-17)

> **« La pédagogie est le produit ; le thème est un habillage au service de l'envie. »**

- Si c'est plus simple d'apprendre à compter avec des dinos, on compte des dinos. Si c'est avec des bus, des bus — **dans le même jeu**.
- UN moteur pédagogique = UNE entrée au menu. Le thème (formes, bus, dinos, animaux…) se choisit DANS le jeu (sélecteur), jamais en multipliant les cartes du menu.
- L'univers préféré de l'enfant (choisi avec l'avatar) pré-sélectionne le thème des jeux génériques — l'enfant peut toujours changer.
- Preuve vécue : matrices de Raven à onglets formes/bus/dino — l'enfant commençait formes, basculait bus, finissait avec plaisir.
- Usage futur : phrase d'accroche du tuto parents / README / marketing.

### D-002 — Zéro pénalité, l'échec n'existe pas (rappel, gravé depuis l'origine)

> Pas de « perdu », pas de chrono qui stresse, pas de jauge qui descend. On avance, toujours.

### D-003 — La récompense promise est interdite (2026-07-16)

> Une récompense **annoncée d'avance** tue la motivation intrinsèque. Les surprises sont permises, jamais promises.

---

_Créé 2026-07-17 sur demande Papa Yann (session refonte menu v2 / organisation des jeux). Pointeurs à maintenir : `studio/minijeux/pmo/INVARIANTS.md`, `studio/dino/` (INDEX ou INVARIANTS), `studio/narration/` (INDEX). Racine `memory/MEMORY.md` § doctrine._

### Norme audits (gravee 2026-07-19, session nettoyage GED)

- **Audit transverse** (multi-poles, infra, GED) -> `memory/audits/AAAA-MM-JJ-<sujet>.md` (index : ligne dans `memory/MEMORY.md`).
- **Audit de pole** -> `studio/<pole>/pmo/audits/AAAA-MM-JJ-<sujet>.md` (trace dans `pmo/audit-trail.md`).
- Jamais d audit a la racine d un `docs/`, jamais de prefixe `AUDIT-` en vrac : la DATE d abord, le sujet ensuite.
- Retention : audit non cite par une decision et > 7 jours = supprime (recuperable git).

### Convention archive (gravée 2026-07-28, phase 3 cartographie narration)

Une archive se RECONNAÎT, s'INDEXE et ne se RÉÉCRIT jamais :

- **Nommage** : dossier `_archive/` (ou `archive/` au niveau pôle) ; fichier archivé seul = suffixe daté `-PERIME-AAAA-MM-JJ` ou `-OBSOLETE-AAAA-MM-JJ`.
- **Bandeau standard** en tête de tout fichier d'archive : `> ⚠️ ARCHIVE — <période/raison>. Source : <chemin d'origine>. Ne plus alimenter, ne plus citer comme référence courante.`
- **INDEX.md obligatoire** dans tout dossier d'archive : table datée (fichier | période | raison de l'archivage). Modèle : `studio/narration/pmo/archive/INDEX.md`.
- **Verbatim** : une archive n'est jamais réécrite ni « mise à jour » ; si une vieille décision redevient d'actualité, on la CITE avec lien dans la décision nouvelle — on ne la dé-archive pas.
- **Jamais supprimée** sauf sans aucune valeur historique ET validation Papa Yann (récupérable git de toute façon).
- **Rotation** : les logs PMO (sprint-log, decisions) tournent par semestre → `pmo/archive/<fichier>-AAAA-H1.md` ; la règle vivante du pôle narration est dans `studio/narration/pmo/archive/INDEX.md`, à reproduire par pôle.

### Règle compteurs (gravée 2026-07-28)

Un chiffre VOLATIL (nb de prénoms, d'entrées catalogue, de stories, de versions writers…) n'apparaît en dur dans un INDEX que s'il est vérifié par `studio/narration/scripts/check-compteurs.js` (exit 1 sur dérive). Sinon on l'exprime en RELATIF (« voir X/INDEX.md »). Jamais recopié en dur sans filet — la désync est garantie.

## Décisions

### D-004 — Convergence mémoire (2026-09-03)

Un quintette par pôle vivant + un transverse ; `pmo/` → `memory/` (mapping INVARIANTS reste · decisions→DECISIONS · backlog→TODO + LESSONS · sprint-log→MEMORY + archive · audit-trail→archive) ; Kimi conservé (miroir AGENTS.md). Pourquoi : deux conventions concurrentes, 4 couches, fichiers PMO > 2 000 lignes (audit du jour).

### D-005 — Abandon de Max Adventure, du pipeline tiles et de « WexWorld côté JEU » (2026-09-05)

Papa Yann : « ça ne marche pas du tout, on arrête ». Le jeu Phaser Max Adventure, les briques LimeZu pour construire un RPG et le concept « WexWorld Phase 2 » du pôle JEU sortent de MaxPlay, archivés dans `_archive/2026-09-05-max-adventure-tiles/` (jamais supprimés). MaxPlay = Mini-jeux + Encyclopédie + Histoires, rien d'autre. WexWorld ne désigne plus que le monde des Histoires (`memory/GLOSSAIRE.md`). Pourquoi : deux sens pour un même nom, un jeu qui ne convainc pas, 38 Mo d'assets et un pipeline Python entretenus pour rien.

### D-006 — Un seul vocabulaire, partout (2026-09-05)

`memory/GLOSSAIRE.md` est normatif : docs, agents, rules, commits, noms de fichiers et interface emploient les mêmes mots (Mini-jeux, Encyclopédie / Dino de Max, Histoires, WexWorld, Wex, Narrateur H/F, Fiche dino = Texte fiche + Script audio + Audio, Paléoart / Hero / Sprite / Silhouette / Coloriage / Trace / Avatar). Un autre mot pour la même chose est une dérive à corriger. Pourquoi : relevé du 2026-09-04 sur 71 docs — jusqu'à 5 noms pour le Script audio, 3 graphies pour les narrateurs, deux WexWorld.
