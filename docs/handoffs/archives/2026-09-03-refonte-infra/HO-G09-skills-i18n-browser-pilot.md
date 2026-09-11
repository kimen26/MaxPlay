# HO-G09 — Skills globaux `i18n-contenu` + `browser-pilot`

**Statut :** pret
**Depend de :** —

## Objectif
Deux skills user-level génériques : la méthode de traduction de contenu enfant (texte puis audio, échelle recalculée, relecture native, bundles) telle qu'elle a été apprise sur le dino, et un pilote de navigateur unique (Brave CDP / Playwright) pour tout ce que le repo fait aujourd'hui en trois endroits.

## Contexte a lire d'abord (lecture seule)
- `memory/audits/2026-09-03-archi-claude-infra.md` § 3 points 9, 14 ; § 5 plan C
- i18n : `studio/dino/content/i18n/{INDEX.md,_CHARTE-TRADUCTION.md}`, `lexiques-prononciation/INDEX.md`, `noms-audio/`, `_corpus/`, `studio/dino/docs/handoffs/{README.md,HO-003..007}`, `site/js/lang.js`, `site/js/dinos-i18n.js`, `site/js/i18n/*.js`, `studio/dino/content/scripts/export/{_extract-corpus-i18n.cjs,_gen-strings-bundle.cjs,_gen-ui-bundle.cjs,_check-traduction.cjs}`, `studio/narration/cross-culture/{INDEX.md,doctrine.md}`, `memory/audio/PLAN-AUDIO-I18N.md` (ou son archive), auto-memory `feedback_traduction_remplacement_mot_a_mot.md` (dans `~/.claude/projects/c--ProjetsPerso-Claude-Projects-MaxPlay/memory/`)
- navigateur : `.claude/skills/dino-images-lunii/scripts/{launch-brave.ps1,gpt-gen.mjs,gpt-gen-dino.mjs,grok-gen-dino.mjs,batch-helpers.mjs}`, `.claude/skills/dino-paleoart/SKILL.md` (comment il lance Brave), `studio/minijeux/tests/{run.mjs,compat.mjs}` (Playwright), auto-memory `reference_webfetch_403_playwright.md`, `reference_grok_image_download_button.md`
- Doc skills : `~/.claude/skills/claude-infra/references/checks-skills.md`

## Fichiers autorises
- `C:/Users/kimen/.claude/skills/i18n-contenu/**` (création)
- `C:/Users/kimen/.claude/skills/browser-pilot/**` (création)
- Sorties de test dans `C:/tmp/browser-pilot-test/`

## Hors perimetre
- Aucun fichier du repo MaxPlay modifié (la migration des scripts projet vers `browser-pilot` = table dans le rapport). Aucune commande git. Ne pas lancer de génération d'image ChatGPT/Grok (coût, quota) : le test navigateur se limite à ouvrir une page publique.

## Travail
### `i18n-contenu`
1. `SKILL.md` (≤ 150 lignes, auto-invocable, déclencheurs : traduire, localiser, i18n, version anglaise/espagnole/portugaise, relecture native, bundle de langue, lexique de prononciation, échelle à recalculer). Généraliser sans chemin projet : le skill lit une **config projet** (`i18n.config.json` documentée dans `references/config.md` : langues cibles, dossier corpus, dossier sorties, charte, lexiques, unités de référence pour l'échelle).
2. `references/methode.md` : le process en étapes = extraction du corpus FR canon → traduction native par langue (un exécutant par langue, ownership par dossier) → relecture croisée native → bundles produit → **audio seulement après lexique validé** (invariant appris sur le dino). Reprendre la charte dino en la rendant générique (registre enfant 4 ans, noms latins gardés, échelle recalculée quand le repère est localisé, jamais de remplacement mot-à-mot sans relecture grammaticale : citer les deux incidents en leçons).
3. `references/relecture-native.md` : grille de relecture (grammaire autour des remplacements, accords, repères d'échelle, prononciation des noms propres, registre).
4. `scripts/check-i18n.mjs` : à partir de la config, vérifie couverture (clés FR sans traduction par langue), clés orphelines, placeholders `{…}` conservés, longueur ±60 % vs FR, et produit un tableau. Tester sur le corpus dino (lecture seule) avec une config écrite dans `C:/tmp/`.
5. `references/migration-maxplay.md` : comment le dino (handoffs HO-003..007) et la narration (cross-culture) s'y branchent.

### `browser-pilot`
6. `SKILL.md` (≤ 120 lignes, `disable-model-invocation: true`, déclencheurs : piloter le navigateur, Brave CDP, Playwright, contourner 403, ChatGPT/Grok logué, capture d'écran de page). Un seul point d'entrée : `scripts/pilot.mjs` avec sous-commandes `launch` (Brave avec profil dédié + port CDP, reprend `launch-brave.ps1`), `fetch <url>` (page rendue → markdown/texte, pour Grokipedia et tout 403 anti-bot), `shot <url> <png>`, `attach` (retourne un `page` Playwright connecté au Brave ouvert, utilisable par d'autres scripts via `import`). Dépendance : `playwright` déjà installé dans `studio/minijeux/tests/node_modules` — le skill doit documenter comment le résoudre (`NODE_PATH` ou `npm i -g playwright`), pas le copier.
7. `references/recettes.md` : 403 Cloudflare, bouton Télécharger Grok (pleine qualité vs vignette), projet ChatGPT logué, profil persistant, pièges Windows (chemins, `Start-Process`).
8. Test : `pilot.mjs launch` puis `pilot.mjs fetch https://example.com` et `shot` → fichiers dans `C:/tmp/browser-pilot-test/` ; ouvrir la PNG avec Read pour vérifier qu'elle n'est pas vide.
9. `references/migration-maxplay.md` : table des scripts projet (dino-images-lunii, dino-paleoart, tests/compat) → appel `browser-pilot` équivalent.

## Portes de verification
```bash
ls ~/.claude/skills/i18n-contenu/{SKILL.md,references/methode.md,references/relecture-native.md,references/config.md,scripts/check-i18n.mjs}
ls ~/.claude/skills/browser-pilot/{SKILL.md,scripts/pilot.mjs,references/recettes.md}
grep -rn "MaxPlay\|studio/\|kimen" ~/.claude/skills/i18n-contenu ~/.claude/skills/browser-pilot | grep -v migration-maxplay.md | wc -l   # 0
node ~/.claude/skills/i18n-contenu/scripts/check-i18n.mjs --config C:/tmp/i18n-test.config.json      # tableau de couverture
node ~/.claude/skills/browser-pilot/scripts/pilot.mjs shot https://example.com C:/tmp/browser-pilot-test/example.png && ls -la C:/tmp/browser-pilot-test/
head -5 ~/.claude/skills/browser-pilot/SKILL.md | grep -c "disable-model-invocation: true"   # 1
```

## Rapport attendu
Arborescences, sortie des tests (tableau i18n, PNG ouverte), tables de migration, questions ouvertes.
