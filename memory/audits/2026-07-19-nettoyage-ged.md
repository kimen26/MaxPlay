# Audit nettoyage GED — 2026-07-19

> **Norme audits transverses (posée ce jour)** : tout audit transverse vit dans `memory/audits/AAAA-MM-JJ-<sujet>.md`.
> Les audits de pôle restent dans `studio/<pôle>/pmo/` (audit-trail). Un audit non rangé ici = anomalie.
> Règle de rétention : audit < 7 jours = gardé + référencé ; plus vieux et non cité par une décision = supprimé.

Méthode : 5 agents Sonnet lecture seule (dino, minijeux/lunii/max-adventure, narration, site/, racine+temp+memory+infra+.claude+_archive). Seuil de date : 2026-07-12. Zone protégée : `site/design-compte/` (non auditée). `.claude/` + `.kimi-code/` = 2 configs d'env, gardées toutes les deux.

## Synthèse

- **Repo globalement sain** : archives narration/dino exemplaires (datées, documentées, canon désigné), hooks/workflows/commands tous valides, memory/ sans orphelin.
- Vrais déchets : ~35 fichiers/lots (temp mp3 doublons, orphelins HTML, backups, logs trackés).
- Plus gros postes disque : `temp/Design to sort` 347 Mo (pack LimeZu payé), staging local `site/img/dinos/_new-*` ≈ 1 Go (gitignoré).

## A — Actions appliquées (2026-07-19, cette session)

| # | Action | Détail | Justif |
|---|--------|--------|--------|
| A1 | SUPPR | `test-timeout.png` (racine, tracké) | screenshot debug ChatGPT, 0 réf, commité par erreur |
| A2 | SUPPR | `.claude/settings.json.bak-2026-06-09-tsc` | backup manuel > 1 mois |
| A3 | SUPPR | `node_modules/` racine (29 Mo, sharp) | aucun package.json racine, 0 import `sharp` dans le repo |
| A4 | SUPPR | `temp/nom-*.mp3` (51), `temp/menu-fam-*.mp3` (9), `temp/test-*.mp3` (4), `temp/narrateur-h-lumi-test-001-extrait-v1.mp3` | doublons 1:1 de `site/audio/dinos/fr/` ou taxonomie familles abandonnée (remplacée par traits visuels) |
| A5 | SUPPR | `temp/Dino/*.jpg` (27 fichiers, mars 2026) | sources anonymes pré-paléoart, 0 réf, > seuil |
| A6 | RELOC | `temp/therizinosaurus-V3-exemple.md`, `temp/diagnostic-plan-fiches-dino.md`, `temp/plan-reecriture-fiches-dino-V3-consolide.md` → `studio/dino/content/scripts-audio/fr/V3/` + MAJ chemins dans `CONSIGNES.md` | therizino = dépendance OBLIGATOIRE de CONSIGNES.md qui vivait dans un dossier gitignoré jetable |
| A7 | RELOC | `temp/dino-image-audit-manifest.json` → `studio/dino/pmo/_archive/2026-07-17-dino-image-audit-manifest.json` | audit < 7j, normalisé |
| A8 | SUPPR | `temp/reecriture-fiches-dino-V3/` (vide) | livrables V3 repointés vers le dossier V3 (A6) |
| A9 | SUPPR | inbox minijeux : `grok.md`, `FICHES-RESTRUCTUREES.md`, `Refonte MaxPlay design système/package-celebrations/`, `package-maxplay-design/` (SAUF sous-dossier `package-maxplay-designv3/` → Q4) | contenu intégré en prod (site/js/celebrations.js, site/css/mp-theme.css, archive dino) ; règle inbox 48h |
| A10 | ARCH | `studio/minijeux/docs/jeux/GAMES_SPECS.md` → `docs/jeux/_archive/` | marqué « périmé » dans INDEX mais jamais déplacé |
| A11 | GIT | `git rm --cached` : `studio/minijeux/tests/.artifacts/**` (60 fichiers, 17 Mo), `infra/bot/bot.log` ; SUPPR `infra/bot/origin)` (0 octet, artefact shell) | gitignorés mais restés trackés |
| A12 | SUPPR | `site/img/dinos/paleoart/_new-xxl/` (vide) | dossier fantôme, doublon de nom du vrai staging racine |
| A13 | SUPPR | `studio/dino/.../_TODO-RATTRAPAGE.txt` | TODO complété (Therizinosaurus_ecosysteme.jpg existe) |
| A14 | ARCH | `studio/dino/content/scripts-audio/_TEMOINS-v2-bouclefermee.md` → `_archive/2026-07-18-ancien-pipeline/` | orphelin de sa cohorte déjà archivée |
| A15 | DOC | `studio/dino/content/INDEX-IMAGES.md` : ajout `_new-traces/` en section STAGING | désync index/réel |
| A16 | SUPPR | `studio/narration/pmo/KANBAN.md`, `studio/narration/equipe/pipeline-realite.md` | orphelins : nomenclature d'histoires fantôme / constat infra 04-28 contredit par l'état actuel |
| A17 | SUPPR | site/ : `avatars-revue.html`, `_familles.html`, `_svg-gallery.html`, `dev-lab.html`, `dev-sounds.html` | 0 référence entrante, < seuil (avatars-revue : 0 réf totale) |
| A18 | DOC | `_archive/INDEX.md` : ajout 3 entrées manquantes (`dino-vires-2026-06-12/`, `grok-3-batch-source-png-2026-07-10/`, `skills-craft-deprecated-2026-06-08/`) | règle d'or de l'INDEX violée (disque > index) |
| A19 | DOC | `README.md` : resync arborescence (studio/, dino, lunii, _archive) | décrivait l'archi d'avant la refonte 2026-04-30 |

Tout est récupérable : fichiers trackés → historique git ; fichiers gitignorés supprimés listés ci-dessus (temp mp3/jpg = doublons ou sources abandonnées).

## B2 — Résolution des QUESTIONS (réponses Papa Yann, 2026-07-19 tour 2)

- **Q1 RÉSOLU** : pack LimeZu déplacé → `c:\ProjetsPerso\Assets\LimeZu-Modern-Exteriors\` (vérifié : seul le sous-ensemble extrait 76 Mo vit dans `studio/max-adventure/public/assets/`).
- **Q2 EN COURS** : agent vérifie staging `_new-*` vs collections prod → suppression après vérification. **Règle gravée : temp/, inbox, staging = points d'entrée à VIDER au fur et à mesure.**
- **Q3 RÉSOLU** : sources grok-batch supprimées (finales .jpg toutes déployées dans `paleoart/`) — entrée `_archive/INDEX.md` mise à jour.
- **Q4 RÉSOLU** : designv3 intégré en prod (`mp-theme.css` tagué « packagev3, validé 2026-07-14 ») → purgé.
- **Q5 RÉSOLU** : mj-gold-a/b = jeux de référence du STANDARD-MJ gravé → gardés + référencés dans `site/tools/index.html` (avec dev-fx, dev-sounds-ui, brick-explorer).
- **Q6 REPORTÉ** : décision menus index/index2/index3 pas encore tranchée (noté backlog game).
- **Q7 RÉSOLU** : ONBOARDING.md supprimé (auto-généré, citait des commandes fusionnées depuis).
- **Q8 RÉSOLU** : les 4 « SVG » de 6-8 Mo étaient des PNG base64 déguisés (svgo gain 0 %) → extraits, convertis JPG q3 (30 Mo → 4,4 Mo), manifest `dinos-images-local.js` MAJ, SVG supprimés. Utilisés par les galeries fiches → pas supprimés du produit.
- **Q9 RÉSOLU** : `lunii/assets/images/familles/` + 6 dossiers sons vides max-adventure supprimés (`lunii/assets/images/dinos/` gardé — attendu par build-dinos-pack.mjs).
- **Q10 NOTÉ PMO** : distillation inbox narration = travail à part (backlog narration).
- **Q11 CONFIRMÉ** : shots-serie3/serie4/lecture/cursif = chantier Kimi en cours, non touché.
- **Q12 REPORTÉ** : lecture-data.js — déplacement vers js/ après fin du chantier lecture (Kimi actif dessus).

## B — QUESTION (historique tour 1, voir B2 pour résolutions)

| # | Sujet | Reco |
|---|-------|------|
| Q1 | `temp/Design to sort/` — pack LimeZu payé, 347 Mo, gitignoré | RELOCALISER hors repo (ex. `c:\ProjetsPerso\Assets\LimeZu\`) ou dossier `_vendor/` gitignoré dans le repo. Pas de suppression. |
| Q2 | `site/img/dinos/_new-*` staging local ≈ 1 Go (dont `_new-xxl` 725 Mo) | flush après validation des collections (contenu déjà déployé dans les dossiers définitifs ?) — passage dino-pmo |
| Q3 | `_archive/grok-3-batch-source-png-2026-07-10/` (19 Mo, 0 doc) | probable sources brutes batch Gallimimus corrompu ; faire trancher dino-pmo puis documenter ou supprimer |
| Q4 | `inbox/.../package-maxplay-designv3/` (mtime 07-14) | vérifier si v3 diffère de `site/css/mp-theme.css` actuel avant purge |
| Q5 | Pages dev non liées ≥ seuil : `dev-fx.html`, `dev-sounds-ui.html`, `mj-gold-a.html`, `mj-gold-b.html` | outils ouverts à la main ? garder ou archiver |
| Q6 | 3 variantes menu `index.html` / `index2.html` / `index3.html` + 3 manifests PWA | décider LA version de référence, documenter ou fusionner |
| Q7 | `ONBOARDING.md` racine | rôle flou vs AGENTS/CLAUDE/README — fusionner ou supprimer |
| Q8 | 4 SVG `site/img/dinos/wiki/*.svg` de 6-8 Mo | optimisation svgo (pas suppression) |
| Q9 | `studio/lunii/assets/images/familles/` (vide, 0 réf) + dossiers sons vides max-adventure | vestige ou attente ? |
| Q10 | Inbox narration : INPUT-004/005 jamais exécutés + lot 28-cultures (~900 Ko, mojibake) sans ticket | exécuter distillation ou rattacher à UNIVERS-004/005 (matière narrative — jamais supprimer sans distillation) |
| Q11 | `temp/shots-serie3/` | GARDÉ — référencé par `site/design-compte/NOTES-DESIGN-COMPTE.md` (travail en cours). À purger quand design compte validé. |
| Q12 | `lecture-data.js` à la racine de `site/` au lieu de `js/` | déplacer lors d'une passe de rangement (impacte lien dans lecture.html) |

## C — Constats sains (ne pas re-signaler)

- `_archive/` de narration (stories + equipe + templates) : gouvernance exemplaire (README raison/date/remplaçant). Modèle à suivre.
- `scripts/audio/` vs `scripts-audio/` (dino) : pas un doublon — séparation outils/contenu légitime.
- `js/i18n/` vide : stub i18n attendu par `dinos-i18n.js` (chemin construit dynamiquement). Garder.
- `sounds/`, `audio/dinos/` : couverts par manifests JS centraux, pas d'orphelin détecté.
- `.gitkeep` narration (68) : squelettes de production voulus.
- Hooks, commands, workflows CI : tous pointent vers des fichiers existants.
- `infra/mcp/logs/`, `infra/bot/*.log` (hors bot.log tracké) : gitignorés, comportement voulu.
- `memory/` : 100 % référencé, `PLAN-AUDIO-I18N.md` vivant.
- `.kimi-code/` : miroir Kimi cohérent (3 hooks portés).
