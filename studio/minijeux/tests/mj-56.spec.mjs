// MJ-56 — Les Enclos (Queens/N-reines enfant, spec 2026-07-31)
// Vérifie : gabarit shell, grille 4x4 N1, pose/retire, feedback rouge doux (attaqué),
// conflit orange entre deux dinos adjacents (même diagonale), chemin gagnant scripté
// via la solution générée, écran de fin golden, zéro mot punitif.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N1 : grille 4x4 ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForSelector('.cell', { timeout: 4000 });
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N1 : grille 4x4', s0.size === 4);
  ok('N1 : 16 cases rendues', await page.locator('.cell').count() === 16);
  ok('N1 : solution valide (4 colonnes distinctes)', new Set(s0.solution).size === 4);

  // ── Zones tap ≥ 80px ──
  const box = await page.locator('.cell').first().boundingBox();
  ok('Case ≥ 80px', !!box && box.width >= 80 && box.height >= 80);

  // ── Amendement PY 2026-07-31 : au niveau débutant, le 1er dino est PRÉ-POSÉ
  //    (fixe, non tappable) et ses cases interdites se voient tout de suite ──
  ok('Dino guide pré-posé (ligne 0)', s0.placed[0] !== -1, `placed=${JSON.stringify(s0.placed)}`);
  ok('Ses cases interdites sont visibles dès le départ', s0.attacked.length > 0);
  const guideCol = s0.placed[0];
  await page.evaluate((gc) => window.__mjTest.tap(0, (gc + 2) % 4), guideCol);
  const afterGuideTap = await page.evaluate(() => window.__mjTest.state);
  ok('Le dino guide ne bouge pas (tap ligne 0 ignoré)', afterGuideTap.placed[0] === guideCol);

  // ── Interactions testées au N1 (5×5, pas de dino guide) ──
  await page.evaluate(() => window.__mjTest.setDifficulty(1));
  await page.waitForSelector('.cell', { timeout: 4000 });
  await page.evaluate(() => window.__mjTest.tap(0, 0));
  const afterPose = await page.evaluate(() => window.__mjTest.state);
  ok('Pose : dino en (0,0)', afterPose.placed[0] === 0);
  ok('Pose : cases attaquées illuminées (ligne+colonne+voisines)', afterPose.attacked.length > 0);
  ok('Pose : (0,1) attaquée (voisine diagonale/adjacente)', afterPose.attacked.includes('0,1'));

  // ── Re-tap retire toujours le dino ──
  await page.evaluate(() => window.__mjTest.tap(0, 0));
  const afterRetire = await page.evaluate(() => window.__mjTest.state);
  ok('Retrait toujours possible (re-tap)', afterRetire.placed[0] === -1);
  ok('Plus de dino → plus de case attaquée', afterRetire.attacked.length === 0);

  // ── Conflit : deux dinos adjacents (même diagonale) tremblent orange ──
  await page.evaluate(() => { window.__mjTest.tap(0, 0); window.__mjTest.tap(1, 1); });
  const conflictState = await page.evaluate(() => window.__mjTest.state);
  ok('Conflit diagonal détecté', conflictState.conflicts.includes('0,0') && conflictState.conflicts.includes('1,1'));
  ok('hadConflict mémorisé (pour le compte des essais)', conflictState.hadConflict === true);

  // Nettoyage du conflit avant de résoudre proprement
  await page.evaluate(() => { window.__mjTest.tap(0, 0); window.__mjTest.tap(1, 1); });

  // ── Chemin gagnant scripté : résoudre via la solution générée ──
  await page.evaluate(() => window.__mjTest.solve());
  await page.waitForTimeout(150);
  const solved = await page.evaluate(() => window.__mjTest.state);
  ok('Puzzle résolu : qCount avance', solved.qCount === 2 || solved.puzzleLock === false);

  // ── Boucle jusqu'à l'écran de fin golden (4 puzzles) ──
  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.cell', { timeout: 4000 }).catch(() => {});
    await page.evaluate(() => window.__mjTest.solve());
    await page.waitForTimeout(150);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);

  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif', punitive === false);
}
