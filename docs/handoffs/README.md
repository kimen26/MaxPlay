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

## Campagne en cours — Audio anglais du pôle dino (ouverte 2026-09-12)

Audit : `memory/audits/2026-09-12-etat-audio-en-dino.md`. État : `studio/dino/memory/TODO.md`
(tickets `AUDIO-EN-INTEGRAL`, `NOMS-COURTS-SCELIDOSAURUS`).

| ID | Titre | Statut |
|----|-------|--------|
| HO-A01 | Fiches dino EN, lot B | fait sans objet — les 71 fiches sont passées en un seul quota le 2026-09-12 (ratio STS réel 1,29 et non 2) |
| HO-A02 | Les 94 clips hors fiche + nom court du Scelidosaure (12 langues) | prêt, BLOQUÉ quota jusqu'au 2026-10-11 |

**Qualité maximale, deux passes** (figé par Papa Yann le 2026-09-12) : TTS voix native puis
speech-to-speech vers la voix maison. Ne jamais proposer le TTS direct pour économiser.

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

- `archives/2026-09-12-audio-en/` — audio anglais, lot des fiches dino (HO-A01, clos sans exécution : livré avec le lot A). La suite vit dans `HO-A02-audio-en-hors-fiche.md`.

- `archives/2026-09-12-nettoyage-assets/` — nettoyage assets images, audio, banque de sons (HO-N01 à HO-N03, 1 vague). Audits : `memory/audits/2026-09-12-nettoyage-assets-{images,audio,banque-sons}.md`. Rapports dans `rapports/HO-N0n.md`.

- `archives/2026-09-12-refonte-ged/` — refonte GED site ↔ studio (HO-R00 à HO-R99, 15 lanes, 6 vagues, un commit par vague). Audit source : `memory/audits/2026-09-12-archi-ged-site-studio.md`, clôture : `memory/audits/2026-09-12-cloture-refonte-ged.md`. Rapports dans `rapports/HO-Rnn.md`.

- `archives/2026-09-03-refonte-infra/` — refonte infra Claude (HO-G01 à HO-G13, HO-MJ-01, HO-NAR-01, HO-DINO-008 côté pôle). Audit source : `memory/audits/2026-09-03-archi-claude-infra.md`. Tous `fait` ; HO-G12 avait un statut interne « bloqué » périmé, corrigé le 2026-09-12. La doctrine commune de ce chantier est devenue `memory/DOCTRINE.md`.
