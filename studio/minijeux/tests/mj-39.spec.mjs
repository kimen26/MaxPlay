// Pilote EP-038 — MJ-39 "Blocs magiques" (Block Blast-like, 8x8, sans rotation).
// Vérifie : smoke console, placement programmatique via __mjTest.place(),
// complétion d'une ligne -> effacement + compteur de lignes incrémenté,
// jamais de blocage (pieces renouvelées), palier ★ atteint sans "Game Over" punitif.

export async function run({ page, ok }) {
  // ─── Règles v3 : panneau s'ouvre TOUT SEUL à la 1ʳᵉ partie (regle-info.js) ───
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement à la 1ʳᵉ partie', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(250);
  ok('panneau refermé', (await page.locator('#ri-panneau.on').count()) === 0);

  const hasHook = await page.evaluate(() => !!window.__mjTest);
  ok('window.__mjTest exposé', hasHook);
  if (!hasHook) return;

  const st0 = await page.evaluate(() => window.__mjTest.getState());
  ok('Grille 8x8 vide au départ', st0.board.length === 8 && st0.board.every(row => row.length === 8 && row.every(v => v === false)));
  ok('3 pièces proposées au départ', st0.pieces.length === 3 && st0.pieces.every(p => p !== null));
  ok('Compteur de lignes à 0 au départ', st0.lignesEffacees === 0);
  ok('Aucune étoile au départ', st0.starsGiven.every(s => s === false));

  // Force un scénario déterministe : 3 lignes de 8 (shape index 5 = ligne 4 H)
  // pour remplir une ligne complète de la grille en posant 2x la pièce "ligne 4 H".
  await page.evaluate(() => window.__mjTest.forceNextPieces([5, 5, 0]));

  // Pose "ligne 4 H" en (0,0) et (0,4) -> remplit toute la ligne 0
  const placed1 = await page.evaluate(() => window.__mjTest.place(0, 0, 0));
  ok('Placement pièce 0 (ligne 4H) en (0,0) réussi', placed1);
  const placed2 = await page.evaluate(() => window.__mjTest.place(1, 0, 4));
  ok('Placement pièce 1 (ligne 4H) en (0,4) réussi', placed2);

  // Après 320ms l'animation d'effacement a tourné (setTimeout dans checkLines)
  const cleared = await page.waitForFunction(() => window.__mjTest.getState().lignesEffacees >= 1,
    null, { timeout: 2000 }).then(() => true).catch(() => false);
  ok('Ligne complète effacée -> compteur de lignes incrémenté', cleared);

  const st1 = await page.evaluate(() => window.__mjTest.getState());
  ok('Ligne 0 vidée après effacement', st1.board[0].every(v => v === false));

  // Les 3 pièces posées (0,1 placées + la 3e index 2 encore dispo) déclenchent
  // un renouvellement complet une fois toutes posées — ici on vérifie juste
  // qu'il reste toujours au moins une pièce jouable (jamais de blocage silencieux).
  const stillHasPiece = st1.pieces.some(p => p !== null);
  ok('Au moins une pièce restante ou renouvelée après pose (pas de rack vide bloqué)', stillHasPiece);

  // ── Palier ★ (5 lignes) : rejoue le même pattern jusqu'à 5 lignes effacées ──
  let safety = 0;
  while (safety < 20) {
    const s = await page.evaluate(() => window.__mjTest.getState());
    if (s.lignesEffacees >= 5) break;
    await page.evaluate(() => window.__mjTest.forceNextPieces([5, 5, 0]));
    await page.evaluate(() => { window.__mjTest.place(0, 0, 0); window.__mjTest.place(1, 0, 4); });
    await page.waitForTimeout(400);
    safety++;
  }
  const star1 = await page.waitForFunction(() => window.__mjTest.getState().starsGiven[0] === true,
    null, { timeout: 3000 }).then(() => true).catch(() => false);
  ok('Palier ★ (5 lignes) atteint -> étoile attribuée sans écran punitif', star1);

  const st2 = await page.evaluate(() => window.__mjTest.getState());
  ok('Partie continue après palier (pas de Game Over à ce stade)', st2.gameOverShown === false);

  // ─── EP-068 : bouton règles (i) — réouverture manuelle après le 1er auto-open ───
  ok('Bouton règles ❓ présent dans le header', await page.locator('#btn-regle').count() === 1);
  await page.click('#btn-regle');
  ok('Modal règle ouverte au tap', await page.locator('#ri-overlay.show').count() === 1);
  const regleTexte = (await page.locator('.ri-text').textContent() || '').trim();
  ok('Texte de règle correspond', regleTexte === 'Pose les blocs pour remplir des lignes entières !', regleTexte);
  await page.click('#ri-close'); // v3 : fermeture explicite ✕ (panneau bottom-sheet)
  ok('Modal règle fermée au tap', await page.locator('#ri-overlay.show').count() === 0);
}
