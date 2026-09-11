# HO-R10 — Mini-jeux : dédoublonnage du runtime

**Statut :** pret
**Depend de :** HO-R08
**Vague :** 3 · **Exécutant :** sous-agent Sonnet

## Objectif
Aucun mini-jeu ne réimplémente ce que le shell fournit ; la prononciation passe toujours par `TTS.speak` (respell phonétique).

## Contexte a lire d'abord
- `memory/audits/2026-09-12-archi-ged-site-studio.md` § P6
- `site/js/{mj-shell,tts,celebrations,back-button,mj-kit}.js`, `.claude/rules/mini-jeux.md`

## Fichiers autorises
- `site/mj-*.html` (tous), `site/dev-dinos.html` (appels `speechSynthesis` uniquement), `site/css/mp-theme.css` (`@font-face` Cursif)
- `site/js/avatar-picker.js` (lignes 5 et 16 : commentaires obsolètes)

## Hors perimetre
- `site/js/{mur,catalog}.js`, `site/_template/**` (HO-R09). Aucune commande git.

## Travail
1. 9 `speak()` locaux → `TTS.speak` ; 3 `speechSynthesis` bruts (`dev-dinos` ×2, `mj-20`, `mj-31`) → `TTS.speak`.
2. 5 confettis locaux → `MaxFX.confetti()` / `MaxFX.burst()`.
3. 4 `<a href="index.html">` en dur retirés (`back-button.js` fait le travail).
4. `@font-face` Cursif déclaré une fois dans `mp-theme.css`, retiré des 4 mj.
5. `<script src="js/lang.js">` redondant retiré des 10 mj (le shell le charge).
6. `<style>` inline > 100 lignes : extraire vers `mj-kit.css` uniquement ce qui est identique dans ≥ 3 jeux, sinon laisser.
7. Commentaires obsolètes `mj-46.html:40`, `mj-50.html:90`, `avatar-picker.js:5,16` corrigés.

## Portes de verification
```bash
grep -lE "speechSynthesis|function speak\(|confettiBurst|@font-face" site/mj-*.html site/dev-dinos.html   # vide (hors tts.js)
npm run test:mj -- <chaque mj touché>          # coller la liste et le verdict de chacun
cd studio/minijeux/tests && node audit-gabarit.mjs   # 0 BLOQUANT, dette hex non aggravée
# capture d'un jeu à 360 px avec la police Cursif visible
```

## Definition of done
Chaque mj touché est vert individuellement, portes vertes, rapport dans `docs/handoffs/rapports/HO-R10.md`.

## Rapport attendu
Table mj → modifications → verdict Playwright, capture, questions.
