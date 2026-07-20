// MJ-50 — Trouve la lettre (Galli G1 — le SON d'abord, cursive, allures, confusables)
// Vérifie : gabarit shell, cursive N0, bonne lettre dans les choix, allures N1,
// confusables/mot N2, retry doux, chemin gagnant complet, zéro punitif.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0 : sons simples, 100 % cursif ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  await page.waitForSelector('.lettre', { timeout: 4000 });
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N0 : 4 lettres proposées, cible incluse', s0.choices.length === 4 && s0.choices.includes(s0.target),
     `target=${s0.target} choices=${s0.choices}`);
  ok('🔒 N0 : toutes les lettres en cursif', s0.allures.every(a => a.trim() === 'cur'), s0.allures.join(','));

  // ── Zones tap ≥ 80px ──
  const box = await page.locator('.lettre').first().boundingBox();
  ok('Tuile lettre ≥ 80px', !!box && box.width >= 80 && box.height >= 80);

  // ── Erreur douce puis réussite ──
  await page.evaluate(() => window.__mjTest.answer(false));
  const afterWrong = await page.evaluate(() => window.__mjTest.state);
  ok('Erreur : la question reste ouverte (retry)', afterWrong.roundLock === false);
  const qBefore = afterWrong.qCount;
  await page.evaluate(() => window.__mjTest.answer(true));
  const afterRight = await page.evaluate(() => window.__mjTest.state);
  ok('Bonne réponse : la manche avance', afterRight.qCount === qBefore + 1);

  // ── N1 : plusieurs allures possibles ──
  await page.evaluate(() => window.__mjTest.setDifficulty(1));
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('N1 : cible présente', s1.choices.includes(s1.target));

  // ── N2 : alternance confusables / « son du début du mot » ──
  await page.evaluate(() => window.__mjTest.setDifficulty(2));
  const subs = [];
  for (let i = 0; i < 3; i++) {
    const st = await page.evaluate(() => window.__mjTest.state);
    subs.push(st.mot ? 'mot' : 'confusables');
    ok(`N2 q${i + 1} : cible dans les choix`, st.choices.includes(st.target));
    await page.evaluate(() => window.__mjTest.answer(true));
  }
  ok('N2 : les deux variantes apparaissent (confusables + mot)',
     subs.includes('mot') && subs.includes('confusables'), subs.join(','));

  // ── Chemin gagnant complet → écran de fin golden ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  for (let i = 0; i < 8; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.evaluate(() => window.__mjTest.answer(true));
    await page.waitForTimeout(100);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);

  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif', punitive === false);
}
