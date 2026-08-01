// MJ-38 — Saute-mouton ! (dames solo, capture par saut, précalculé)
// Rejoue la solution NIVEAU 1 (générée+vérifiée par solveur BFS jetable) :
// max=[3,3] dodos=[[3,2],[2,2]]
//   saut 1 : (3,3) -> over (3,2) -> (3,1)
//   saut 2 : (3,1) -> over (2,2) -> (1,3)
// Vérifie : victoire niveau 1 détectée, bouton Recommencer toujours visible,
// aucun texte "perdu/game over/raté" nulle part dans le DOM.

export async function run({ page, ok }) {
  // ─── Règles v3 : panneau s'ouvre TOUT SEUL à la 1ʳᵉ partie (regle-info.js) ───
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  // Bouton Recommencer visible dès le chargement (avant toute action)
  const restartVisibleAtStart = await page.locator('#btn-restart').isVisible();
  ok('Bouton Recommencer visible dès le chargement', restartVisibleAtStart);

  // Aucun texte punitif nulle part au chargement
  const bodyText0 = (await page.locator('body').innerText()).toLowerCase();
  const hasNegative0 = /perdu|game over|raté|rate\b/.test(bodyText0);
  ok('Aucun texte punitif au chargement', !hasNegative0, bodyText0.slice(0, 200));

  // Niveau 1 affiché
  const lvlLabel = (await page.locator('#lvl-label').textContent() || '').trim();
  ok('Niveau 1 affiché au départ', lvlLabel.includes('1'), lvlLabel);

  // ─── EP-068 : bouton règles (i) — réouverture manuelle après le 1er auto-open ───
  // Testé avant la victoire : #win-overlay plein écran bloquerait le clic après.
  ok('Bouton règles ❓ présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Modal règle ouverte au tap', await page.locator('#ri-overlay.show').count() === 1);
  const regleTexteEarly = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexteEarly === 'Saute par-dessus les pions dodo pour les faire disparaître !', regleTexteEarly);
  await page.click('#ri-close'); // v3 : fermeture explicite ✕ (panneau bottom-sheet)
  ok('Modal règle fermée au tap', await page.locator('#ri-overlay.show').count() === 0);

  // Saut 1 : tap Max (3,3) → tap case atterrissage (3,1)
  await page.click('#cell-3-3 .piece.max');
  await page.click('#cell-3-1');
  await page.waitForTimeout(550);

  // Le dodo (3,2) doit avoir disparu
  const dodoGone1 = await page.locator('#cell-3-2 .piece.dodo').count();
  ok('Dodo (3,2) capturé après saut 1', dodoGone1 === 0);

  // Max doit être en (3,1)
  const maxAt31 = await page.locator('#cell-3-1 .piece.max').count();
  ok('Max a atterri en (3,1) après saut 1', maxAt31 === 1);

  // Saut 2 (combo) : tap Max (3,1) → tap case atterrissage (1,3)
  await page.click('#cell-3-1 .piece.max');
  await page.click('#cell-1-3');
  await page.waitForTimeout(550);

  // Victoire niveau 1 : plus d'overlay maison — écran de fin mutualisé
  // (MaxFX.finalStar) puis enchaînement AUTO vers le niveau 2, aucun bouton
  // "Continuer" local (directive Papa Yann mutualisation UI, 2026-08-01).
  ok('#win-overlay supprimé du DOM (mutualisation UI)', (await page.locator('#win-overlay').count()) === 0);

  const lvl2Loaded = await page.waitForFunction(
    () => (document.getElementById('lvl-label')?.textContent || '').includes('2'),
    null, { timeout: 5000 }
  ).then(() => true).catch(() => false);
  ok('Niveau 2 chargé automatiquement après victoire niveau 1 (sans bouton local)', lvl2Loaded);

  // Bouton Recommencer toujours visible pendant/après la partie
  const restartVisibleAfter = await page.locator('#btn-restart').isVisible();
  ok('Bouton Recommencer toujours visible après victoire', restartVisibleAfter);

  // Aucun texte punitif nulle part à aucun moment du parcours testé
  const bodyText1 = (await page.locator('body').innerText()).toLowerCase();
  const hasNegative1 = /perdu|game over|raté|rate\b/.test(bodyText1);
  ok('Aucun texte punitif après la partie', !hasNegative1, bodyText1.slice(0, 200));
}
