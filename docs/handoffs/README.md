# Handoffs — usine d'exécution transverse

> Un handoff = un brief jetable pour une lane de travail : il décrit un résultat observable, les fichiers autorisés, les portes de vérification, la definition of done. Il vit ici tant qu'il est vivant, descend dans `archives/<campagne>/` une fois fait. **L'état des lanes vit dans `memory/TODO.md`**, jamais ici ni dans un fichier de plan parallèle (L-008).
> Les handoffs de PÔLE vivent dans `studio/<pôle>/docs/handoffs/` avec la même convention.
> Modèle : `_template.md`. Protocole complet : `~/.claude/skills/nouveau-projet/references/protocole-handoffs.md`.

## Rôles

- **Orchestrateur** : session principale (Claude Fable). Rédige les briefs, lance les exécutants en arrière-plan, relit les rapports, rejoue les portes lui-même, commite, grave dans `memory/`, archive le handoff, enchaîne. Ne code que les lanes marquées « orchestrateur » (git, destructif, décisions).
- **Exécutants** : sous-agents `general-purpose`, modèle **Sonnet** par défaut, **Haiku** pour le purement mécanique. Un brief chacun, contexte propre, fichiers autorisés stricts, **jamais de commande git**, testent eux-mêmes et collent la sortie des portes dans leur rapport.

## Cycle de vie d'un handoff

`brouillon` → `pret` → `en cours` (agent lancé) → `rapport reçu` (dans `rapports/HO-xxx.md`) → `fait` (portes rejouées par l'orchestrateur, vague commitée) → déplacé dans `archives/<campagne>/`. La colonne Statut de `memory/TODO.md` est mise à jour à chaque transition ; le champ Statut du fichier aussi (les deux doivent toujours dire la même chose).

`npm run gc` (HO-R14, `scripts/gc.mjs`) signale automatiquement les handoffs `fait` des deux côtés
mais encore hors `archives/` : la dernière transition du cycle (le déplacement) est le seul
oubli que la routine détecte pour ce fichier — elle ne remplace pas la relecture humaine des
statuts intermédiaires. Détail de la routine complète : `memory/DOCTRINE.md § Rotation`.

## Campagne en cours — Refonte GED site ↔ studio (2026-09-12)

Audit : `memory/audits/2026-09-12-archi-ged-site-studio.md`. Décisions : `memory/DECISIONS.md` D-007 à D-012. État : `memory/TODO.md`.

| ID | Titre | Vague | Fichiers possédés (résumé, liste exhaustive dans le brief) |
|----|-------|-------|-------------------|
| HO-R00 | Vague 0 orchestrateur : purge, suppressions, vault, gitignore, branches, migration 013 | 0 | `_archive/**`, `studio/lunii/.build-*`, `studio/dino/content/inbox/**`, `studio/lunii/assets/audio/{histoires-dodo,pierre-loup}/**`, `.gitignore`, `infra/supabase/**`, branches |
| HO-R01 | Minijeux : docs GC | 1 | `studio/minijeux/{docs,tools,scripts,inbox}/**` + fichiers racine du pôle, `studio/dino/scripts/**`, `.claude/agents/game-pmo.md` (1 ligne) |
| HO-R02 | Minijeux : rotation mémoire | 1 | `studio/minijeux/memory/**` |
| HO-R03 | Dino : mémoire, docs, dé-triplication | 1 | `studio/dino/{memory,docs,figees,temp}/**` + fichiers racine du pôle, `.claude/rules/dino.md`, 3 skills dino, `content/sources/{_PLAYBOOK,megafaune,video,images/variantes-non-retenues}` |
| HO-R06 | Lunii : moteur unique | 1 | `studio/lunii/**` |
| HO-R07 | Site : assets morts et rips sous droits | 1 | `site/sounds/**`, `site/design-shared/mockup.*`, `site/img/dinos/traces/**`, 2 png decor, `site/js/{decor,pins,voices-manifest,tracker,victory-sounds,sounds,mj-golden}.js`, 4 html (lignes sons), `studio/referentiel/catalogue/**` |
| HO-R08 | `package.json` racine + `site/js/gen/` | 2 | `package.json`, `site/js/**`, `site/*.html` (script src), générateurs (chemin de sortie), `.github/workflows/*`, `studio/minijeux/tests/{package.json,run*,audit-gabarit}.mjs` |
| HO-R09 | Mur ← catalogue, `check-mj-coherence`, gabarit | 3 | `site/js/{mur,catalog}.js`, `site/css/mur.css`, `site/_template/**`, `tests/check-mj-coherence.mjs`, `tests/{index,mur-nid}.spec.mjs`, `deploy.yml`, `STANDARD-MJ.md`, `minijeux/CLAUDE.md` |
| HO-R10 | Dédoublonnage runtime mj | 3 | `site/mj-*.html`, `site/dev-dinos.html` (speechSynthesis), `site/css/mp-theme.css`, `site/js/avatar-picker.js` (commentaires) |
| HO-R12 | Dino : fiche canon | 4 | `studio/dino/content/dinos/**`, `content/scripts/export/**`, `_md2json-v3.cjs`, en-têtes des `.md` audio, `site/js/gen/dinos-data.js`, 8 html (chemin), `nouveau-dino`, `rules/dino.md` |
| HO-R11 | Service worker | 4 | `site/sw.js`, `site/js/sw-register.js`, `site/offline.html`, `site/*.html` (head), `site/manifest.json`, `audit-gabarit.mjs`, `STACK.md` |
| HO-R04 | Hooks consolidés + agents JEU/DINO | 4 | `.claude/hooks/**`, `.claude/settings.json` (hooks), `.kimi-code/**`, `.claude/agents/{README,game-*,dino-*,quick}.md`, sections agents des CLAUDE.md JEU/DINO |
| HO-R13 | WebP | 5 | `site/img/dinos/{sprites,paleoart}/**`, `site/js/gen/dinos-assets.js`, `studio/dino/scripts/images/**`, `gen-dinos-assets.mjs`, `studio/lunii/scripts/**`, `dino-paleoart` |
| HO-R14 | Routine `npm run gc` | 5 | `scripts/gc.mjs`, `package.json` (gc), `memory/DOCTRINE.md`, ce README |
| HO-R99 | Clôture : `git filter-repo`, force-push, CHANGELOG, audit | 6 | historique git, `memory/{CHANGELOG,MEMORY}.md`, `memory/audits/`, `archives/2026-09-12-refonte-ged/` |

Vagues 0 → 6. Dans une vague, aucun fichier partagé entre lanes. Vague 2 : HO-R08 seul sur `site/`. Les hooks (HO-R04) se changent en vague 4 parce qu'ils tournent pendant le travail des autres lanes.

## Règles non négociables

- **Ownership par fichier.** Deux briefs actifs de la même vague ne partagent jamais un fichier.
- **Zéro git côté exécutant.** L'orchestrateur commite avec `git add <chemins>` explicites (index partagé entre sessions).
- **Une archive ne se réécrit pas** : rotation = déplacement verbatim + bandeau + index daté (`memory/DOCTRINE.md`). Les numéros `D-NNN`/`L-NNN` se prennent en relisant le fichier au moment d'écrire.
- **Kimi Code reste utilisé** : les `AGENTS.md` miroirs restent. Le racine est régénéré par hook ; ceux de pôle se mettent à jour à la main quand le CLAUDE.md du pôle change.
- **Narration hors périmètre** de la campagne 2026-09-12 (D-011) : aucun brief ne touche `studio/narration/**`, les agents `narration-*`, ni `site/lecture*`.
- **Un doute = question dans le rapport**, jamais « je corrige au passage ». L'orchestrateur tranche.
- **Le rapport d'un brief** = sortie des portes collée + liste exacte des fichiers créés/modifiés/supprimés + réponses aux 5 questions de conception quand la lane touche données ou assets : local ou BDD ? rapidité (poids, requêtes) ? réutilisable par un autre pôle ? i18n (langue dans la clé ou le chemin) ? index ou manifeste nécessaire, et où ?
- **Preuve avant livraison** : un log « ok » ne suffit pas. Playwright vert, capture ouverte, `git diff --stat` cohérent avec le brief.

## Portes globales (rejouées par l'orchestrateur à chaque fin de vague)

```bash
cd studio/minijeux/tests && node audit-gabarit.mjs            # 0 BLOQUANT
cd studio/minijeux/tests && node run-all.mjs                  # Playwright complet (en fond)
node studio/referentiel/build.mjs                             # sans erreur
node studio/dino/content/scripts/export/_gen-etat-dinos.cjs   # état dinos inchangé ou meilleur
git status --short | grep -v '^??'                            # rien d'imprévu
```

## Campagnes archivées

- `archives/2026-09-03-refonte-infra/` — refonte infra Claude (HO-G01 à HO-G13, HO-MJ-01, HO-NAR-01, HO-DINO-008 côté pôle). Audit source : `memory/audits/2026-09-03-archi-claude-infra.md`. Tous `fait` ; HO-G12 avait un statut interne « bloqué » périmé, corrigé le 2026-09-12. La doctrine commune de ce chantier est devenue `memory/DOCTRINE.md`.
