# Audit « ce qui ne sert à rien » — 2026-09-19

Périmètre : tout le repo (`site/`, `studio/`, racine, `docs/`, `infra/`, `.claude/`, `memory/`).
Méthode : 6 agents lecture seule (orphelins `site/` par script, scripts sans appelant, doublons MD5
studio ↔ site, handoffs/docs, lunii/référentiel/inbox, racine/.claude/infra) + `node scripts/gc.mjs`
+ relecture manuelle du cerveau avant chaque suppression. Rapports détaillés dans le scratchpad de
session (non versionnés) ; script réutilisable : `orphans-site.mjs` (à reprendre si besoin).

## Supprimé (commit `chore(gc)` du 2026-09-20 — 13 fichiers, 0,6 Mo)

| Fichier | Preuve |
|---|---|
| `site/img/decor/{cratere,geyser,palmier,rocher,sapin}.png` | absents du dict `DECORS` de `mj-kit.js`, aucune ref dans `site/` ; seul producteur = `batch-decor-gpt.mjs` |
| `studio/dino/content/scripts/audio/_archive/*` (4 scripts) | ancien pipeline json-top archivé 2026-07-18, canon = V3, aucun appelant ; lignes retirées de `content/scripts/INDEX.md` |
| `studio/narration/scripts/{archive-story,test-graphique-cris,test-wex-advanced}.js` | signalés « concept mort / one-shot » par l'audit narration 2026-07-27, 0 appelant depuis juin |
| `studio/referentiel/_REPRISE-2026-08-10.md` | note de reprise d'un chantier clos (0 dette), orpheline, « brief mort » au sens de `rules/memoire-projet.md` |

Corrigé aussi : `CLAUDE.md`, `AGENTS.md`, `README.md` citaient `_archive/INDEX.md` qui n'existe plus
(sorti vers le vault, D-007) → pointent sur `docs/ARCHIVES.md`.

## NON supprimé — décision Papa Yann requise

### 1. Langues retirées (le gros morceau : ~111 Mo, 1 580 fichiers)

`lang.js` ne sert que `fr`/`en` depuis le 2026-09-13. **D-013 dit explicitement « rien n'est supprimé
du disque, seule la porte se ferme »** — je ne contredis pas une décision de 6 jours sans feu vert.

| Bloc | Fichiers | Poids | Régénérable ? |
|---|---|---|---|
| `site/audio/dinos/pt-br/` | 135 | 51,0 Mo | non (ElevenLabs STS, coût ≈ 2× FR, DEC-AUDIO-I18N-002) |
| `site/audio/dinos/es-es/` | 135 | 37,9 Mo | non (idem) |
| `site/audio/dinos/{ru,ar,zh,ja,de,it,hi,es-mx}/` (noms courts) | 560 | 20,2 Mo | non |
| `site/js/i18n/*.{es-es,pt-br}.js` | 6 | 0,41 Mo | oui (build) |
| `studio/dino/content/scripts-audio/{pt-br,es-es}/` + i18n + lexiques 8 langues | 736 | 1,46 Mo | sources texte |

**Tranché par Papa Yann le 2026-09-20 : on garde** (réutilisation prévue plus tard). D-013 réaffirmé
dans `memory/DECISIONS.md`.

### 2. Autres candidats

| Chemin | Poids | Pourquoi je n'ai pas tranché |
|---|---|---|
| `studio/lunii/assets/audio/{recits-dino,noms-dino}/` | 44,5 Mo | stade intermédiaire régénérable en une commande (`prepare-dino-assets.mjs`) depuis `site/audio/dinos/fr/` — mais peut-être une dérive volontaire entre les deux jeux |
| `studio/dino/docs/handoffs/` captures QA (86 PNG) | 10,2 Mo | handoffs terminés : à descendre en `archives/` ou au vault, pas à supprimer sans regard |
| `studio/dino/content/scripts-audio/_archive/` | 3,9 Mo (122 fichiers) | ancien pipeline + brouillon albertosaurus, déjà auto-archivé par nommage |
| `site/img/dinos/traces/*.png` (15) | 0,94 Mo | empreintes GPT du 2026-07-18 pour un « jeu de piste » jamais écrit, absent de toute TODO |
| `site/dev-sounds-ui.html` | 8 Ko | outil dev documenté (`_BANQUE-SONS.md`), accès URL directe : l'utilises-tu encore ? |
| `page.html` (racine, non suivi) | 605 Ko | page Framer « TypeSafe AI » du 18/09, zéro lien avec MaxPlay — dépôt accidentel ? non versionné donc irrécupérable si supprimé |
| `studio/minijeux/inbox/globe-webapp-animation/` (non suivi) | 17 fichiers | ton dépôt du 15/09, règle 48h dépassée (invisible au GC qui lit git, pas le disque) |
| `studio/narration/inbox/` (7 entrées, 53 à 108 jours) | — | hors périmètre D-011 mais règle 48h |
| MCP `supabase-maxvoyage` | — | connecté au niveau utilisateur, projet étranger ; TODO transverse déjà ouvert |
| `.claude/skills/dino-images-lunii/scripts/batch-*` (3) + 1 image | — | non documentés dans SKILL.md, usage non attesté |
| `.claude/skills/dino-images-lunii/scripts/verifie-deploiement.mjs` | — | cité par SKILL.md mais jamais commité (`??`) |
| Narration : ~94 liens markdown morts (après filtrage gabarits) | — | dont `.claude/agents/narration-architecte.md` et `site/duel.html` — chantier narration, pas un nettoyage |
| `docs/handoffs/README.md` : HO-MJ-11 rapport sans brief ni registre | — | anomalie de registre signalée par le README lui-même depuis le 12/09 |

## Ce qui est propre (vérifié, rien à faire)

- `site/` : 0 HTML orphelin, 0 vidéo orpheline, 0 doublon binaire (3 562 fichiers), 0 orphelin dans
  `sounds/voix/phrases/` (88 MP3 tous référencés), 0 JS/CSS mort hors bundles langues retirées.
- `studio/dino` ↔ `site/` : 0 doublon MD5 (le pôle est du texte, le binaire vit dans `site/`).
- Pôle JEU : 36 `mj-*.html` ↔ 36 figées ↔ 36 specs ↔ 36 entrées catalogue, 0 orpheline ; 3 handoffs
  hors `archives/` ont chacun leur raison écrite (HO-MJ-12/19/20 : recette P30 à faire).
- `.claude/` : 20 agents tous référencés, 6 skills, hooks tous câblés (Claude + Kimi), 9 agent-memory
  rattachés, 0 doublon commands/skills.
- `tests/.artifacts` : non suivi, < 14 jours, rien à purger. `tests/_scratch` : vide.
- Chantier armoire v8 (non commité) : hors jugement.

## Leçon de méthode

Un grep littéral rate les chemins construits (`'js/i18n/' + stem + '.' + lang + '.js'`,
`${id}.spec.mjs`) : deux agents ont dû modéliser le pattern avant de conclure, sinon 20 specs vivantes
et 6 bundles sortaient comme « orphelins ». Le GC officiel (`scripts/gc.mjs`) lit les dates git, pas
le disque : un dépôt non commité dans `inbox/` lui est invisible.
