# HO-R11 — Service worker et politique de cache

**Statut :** pret
**Depend de :** HO-R10 (vague 3 commitée)
**Vague :** 4 · **Exécutant :** sous-agent Sonnet

## Objectif
MaxPlay fonctionne hors ligne : la coquille est précachée, les assets déjà vus sont servis depuis le cache, le manifest est lié partout.

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P2 (pas de SW)
- `site/manifest-classic.json`, `site/js/{cloud,mj-shell}.js`, `studio/minijeux/docs/STACK.md`, `~/.claude/rules/mobile-parents.md`

## Fichiers autorises
- `site/sw.js` (nouveau), `site/js/sw-register.js` (nouveau), `site/offline.html` (nouveau)
- Tous `site/*.html` (lignes `<head>` : manifest + enregistrement SW uniquement)
- `site/manifest-classic.json` → `site/manifest.json`
- `studio/minijeux/tests/audit-gabarit.mjs` (règle : manifest + SW présents), `studio/minijeux/docs/STACK.md`, `package.json` (`build` calcule la version du SW)

## Hors perimetre
- Logique des jeux, `cloud.js`. Aucune commande git.

## Travail
1. Precache versionné de la coquille (index, css, js runtime, catalogue, icônes).
2. Cache runtime `stale-while-revalidate` pour `img/`, `audio/`, `sounds/` avec plafond par cache (ex. 300 audios, 500 images) ; `network-first` pour Supabase.
3. Version du SW dérivée d'un hash calculé par `npm run build` (jamais en dur).
4. `offline.html` minimal, manifest lié par les 44 HTML, `audit-gabarit` le vérifie.
5. Stratégie par type d'asset documentée en tête de `sw.js` et dans `STACK.md` (rapidité vs fraîcheur).

## Portes de verification
```bash
# Playwright : charger index.html, context.setOffline(true), recharger : menu affiché (capture) ; ouvrir un mj déjà visité hors ligne (capture)
cd studio/minijeux/tests && node audit-gabarit.mjs    # 0 BLOQUANT, règle manifest+SW active
npm test
```

## Definition of done
Menu et un jeu s'ouvrent hors ligne (captures), audit vert, rapport dans `docs/handoffs/rapports/HO-R11.md`.

## Rapport attendu
Stratégie de cache par type, taille du precache, captures hors ligne, questions.
