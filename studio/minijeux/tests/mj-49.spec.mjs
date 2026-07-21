// MJ-49 — Les barquettes de 10 (Spino S4 — la dizaine : compléments à 10, 10+n, 20+n, atteindre N)
// Vérifie : gabarit shell, barquette 5×2, badge « 10 » sur barquette pleine,
// bonne réponse dans le QCM à chaque sous-type, aide tap-compte, chemin gagnant, zéro punitif.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0 : compléments à 10 sur barquette à trous ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForSelector('.mjk-choices:not(.hidden) .mjk-choice', { timeout: 4000 });
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N0 : sous-type manque, réponse 1-5', s0.sub === 'manque' && s0.correctAnswer >= 1 && s0.correctAnswer <= 5,
     `answer=${s0.correctAnswer}`);
  ok('Barquette 5×2 : 10 cellules', await page.locator('.barquette .cell').count() === 10);
  const holes = await page.locator('.barquette .cell:not(.plein)').count();
  ok('N0 : trous = réponse attendue', holes === s0.correctAnswer, `trous=${holes}`);
  ok('QCM 3 choix avec la bonne réponse', s0.choices.length === 3 && s0.choices.includes(String(s0.correctAnswer)));

  // ── Aide tap-compte : tapoter un trou pose une pastille ──
  await page.locator('.barquette .cell:not(.plein)').first().click();
  ok('Tap sur un trou → pastille numérotée', await page.locator('.mjk-pastille').count() === 1);

  // ── Erreur douce puis réussite ──
  await page.evaluate(() => window.__mjTest.answer(false));
  const afterWrong = await page.evaluate(() => window.__mjTest.state);
  ok('Erreur : la question reste ouverte (retry)', afterWrong.roundLock === false);
  const qBefore = afterWrong.qCount;
  await page.evaluate(() => window.__mjTest.answer(true));
  const afterRight = await page.evaluate(() => window.__mjTest.state);
  ok('Bonne réponse : la manche avance', afterRight.qCount === qBefore + 1);

  // ── N1 : 10 + n — barquette pleine (badge 10) + vrac ──
  await page.evaluate(() => window.__mjTest.setDifficulty(1));
  await page.waitForSelector('.mjk-choices:not(.hidden) .mjk-choice', { timeout: 4000 });
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('N1 : 10+n (11→19)', s1.sub === 'dix-plus' && s1.correctAnswer >= 11 && s1.correctAnswer <= 19);
  await page.waitForTimeout(400); // fin de l'anim dixPop (scale 0 → 1)
  ok('N1 : barquette pleine avec badge 10', s1.pleines === 1
     && await page.locator('.barquette.pleine .b-dix').isVisible());
  ok('N1 : vrac = n', s1.loose === s1.correctAnswer - 10);

  // ── N2 : deux barquettes (20+n) ──
  await page.evaluate(() => { window.__mjTest.forceSub('deux-barquettes'); window.__mjTest.setDifficulty(2); });
  await page.waitForSelector('.mjk-choices:not(.hidden) .mjk-choice', { timeout: 4000 });
  const s2 = await page.evaluate(() => window.__mjTest.state);
  ok('N2 : 2 barquettes pleines, total 20+n', s2.sub === 'deux-barquettes' && s2.pleines === 2
     && s2.correctAnswer >= 20 && s2.correctAnswer <= 25, `answer=${s2.correctAnswer}`);

  // ── N2 : atteindre N (rendre la monnaie) ──
  await page.evaluate(() => { window.__mjTest.forceSub('atteindre'); window.__mjTest.next(); });
  await page.waitForSelector('.mjk-choices:not(.hidden) .mjk-choice', { timeout: 4000 });
  const s3 = await page.evaluate(() => window.__mjTest.state);
  ok('N2 : atteindre N → réponse = N-10 (1-9)', s3.sub === 'atteindre' && s3.correctAnswer >= 1 && s3.correctAnswer <= 9);
  ok('N2 : cible affichée', (await page.locator('#target-line b').count()) === 1);

  // ── Zones tap ≥ 80px ──
  const box = await page.locator('.mjk-choice').first().boundingBox();
  ok('Bouton QCM ≥ 80px', !!box && box.width >= 80 && box.height >= 80);

  // ── Chemin gagnant complet → écran de fin golden ──
  await page.evaluate(() => { window.__mjTest.forceSub(''); window.__mjTest.setDifficulty(0); });
  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.waitForSelector('.mjk-choices:not(.hidden) .mjk-choice', { timeout: 4000 }).catch(() => {});
    await page.evaluate(() => window.__mjTest.answer(true));
    await page.waitForTimeout(120);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);

  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif', punitive === false);
}
