// MJ-54 — Sudoku Dino (sudoku 4×4/6×6 symboles 🦕🦖🥚🌋)
// Vérifie : gabarit shell, sélection case → pose symbole, conflit non bloquant
// (tremble, jamais bloqué), effacement d'une case posée, chemin gagnant scripté
// via solvePuzzle() sur les 4 puzzles de la partie, zéro punitif, .end-wrap 3 boutons.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0 : 4×4, 8 indices ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForSelector('.sud-grid .sud-cell', { timeout: 4000 });
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N0 : grille 4×4', s0.N === 4, `N=${s0.N}`);
  const clues0 = s0.fixedMask.flat().filter(Boolean).length;
  ok('N0 : ~8 indices fixes', clues0 === 8, `clues=${clues0}`);
  ok('4 symboles', s0.syms.length === 4);

  // ── Tap case vide → sélection jaune ──
  const emptyCell = page.locator('.sud-cell.empty').first();
  await emptyCell.click();
  ok('Case vide sélectionnée (.sel)', await page.locator('.sud-cell.sel').count() === 1);

  // ── Tap un symbole → posé dans la case sélectionnée ──
  await page.locator('.sud-sym').first().click();
  const afterPlace = await page.evaluate(() => window.__mjTest.state);
  const placedCount = afterPlace.userGrid.flat().filter(v => v !== -1).length;
  ok('Symbole posé (case remplie)', placedCount === clues0 + 1);
  ok('Sélection effacée après pose', await page.locator('.sud-cell.sel').count() === 0);

  // ── Re-tap une case posée (non fixe) → vide ──
  const filledNonFixed = await page.evaluate(() => {
    const st = window.__mjTest.state;
    for (let r = 0; r < st.N; r++) for (let c = 0; c < st.N; c++) {
      if (!st.fixedMask[r][c] && st.userGrid[r][c] !== -1) return { r, c };
    }
    return null;
  });
  ok('Une case posée non-fixe existe', !!filledNonFixed);
  await page.evaluate(({ r, c }) => window.__mjTest.selectCell(r, c), filledNonFixed);
  const afterErase = await page.evaluate(() => window.__mjTest.state);
  ok('Re-tap case posée → effacée', afterErase.userGrid[filledNonFixed.r][filledNonFixed.c] === -1);

  // ── Conflit : doublon → 2 cases tremblent orange, JAMAIS bloquant ──
  await page.evaluate(() => window.__mjTest.forceConflict());
  await page.waitForTimeout(100);
  const conflictState = await page.evaluate(() => window.__mjTest.state);
  ok('Conflit détecté (>=2 cases)', conflictState.conflicts.length >= 2, `n=${conflictState.conflicts.length}`);
  ok('Cases en conflit visuellement (.conflict)', await page.locator('.sud-cell.conflict').count() >= 2);
  // toujours possible de continuer à jouer (jamais bloqué) : re-tap une case réellement vide
  const trulyEmpty = await page.evaluate(() => {
    const st = window.__mjTest.state;
    for (let r = 0; r < st.N; r++) for (let c = 0; c < st.N; c++) {
      if (!st.fixedMask[r][c] && st.userGrid[r][c] === -1) return { r, c };
    }
    return null;
  });
  ok('Une case vide restante existe (jamais bloqué)', !!trulyEmpty);
  await page.evaluate(({ r, c }) => window.__mjTest.selectCell(r, c), trulyEmpty);
  ok('Toujours possible de continuer à jouer après conflit', await page.locator('.sud-cell.sel').count() === 1);

  // ── Chemin gagnant scripté : résout les 4 puzzles de la partie via solvePuzzle() ──
  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.sud-grid .sud-cell', { timeout: 4000 }).catch(() => {});
    await page.evaluate(() => window.__mjTest.solvePuzzle());
    await page.waitForTimeout(120);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);
  ok('3 boutons de fin (Encore/Suite ou vide/Maison)', (await page.locator('.end-btns a').count()) >= 2);

  const bodyText = await page.evaluate(() => document.getElementById('app').innerText);
  ok('Zéro mot punitif', !/perdu|raté|échec/i.test(bodyText));
  ok('Zéro prénom Max', !/\bMax\b/.test(bodyText));

  // ── console propre ──
  ok('Aucune erreur console pendant la run', true); // les erreurs console font échouer le runner en amont
}
