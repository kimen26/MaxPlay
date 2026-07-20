// MJ-53 — Lis et fais (Galli G5 — lire pour agir : mot→image, syllabes dino, consigne-action)
// Vérifie : gabarit, N0 mot + 4 images, N1 syllabes + photos + PAS d'audio,
// N2 consigne-action oeufs colorés, retry doux, fin golden, zéro punitif.

export async function run({ page, ok }) {
  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.__mjTest.setTestMode(true));

  // ── N0 : mot cursif → 4 images, cible incluse ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  const s0 = await page.evaluate(() => window.__mjTest.state);
  ok('N0 : type mot, 4 images avec la cible', s0.type === 'mot' && s0.imgs.length === 4
     && s0.imgs.includes(s0.target), `target=${s0.target}`);
  ok('N0 : aide audio autorisée', s0.audioAllowed === true);

  // ── Zones tap ≥ 80px ──
  const box = await page.locator('.img-card').first().boundingBox();
  ok('Carte image ≥ 80px', !!box && box.width >= 80 && box.height >= 80);

  // ── Erreur douce puis réussite ──
  await page.evaluate(() => window.__mjTest.answer(false));
  const afterWrong = await page.evaluate(() => window.__mjTest.state);
  ok('Erreur : la question reste ouverte', afterWrong.roundLock === false);
  const q0 = afterWrong.qCount;
  await page.evaluate(() => window.__mjTest.answer(true));
  const afterRight = await page.evaluate(() => window.__mjTest.state);
  ok('Bonne réponse : la manche avance', afterRight.qCount === q0 + 1);

  // ── 🔒 N1 : syllabes dino + vraies photos + PAS d'audio ──
  await page.evaluate(() => window.__mjTest.setDifficulty(1));
  const s1 = await page.evaluate(() => window.__mjTest.state);
  ok('N1 : type dino, 4 photos avec la cible', s1.type === 'dino' && s1.imgs.length === 4
     && s1.imgs.includes(s1.target));
  ok('🔒 N1 : pas d’aide audio (décision PY)', s1.audioAllowed === false);
  ok('N1 : syllabes séparées affichées', (await page.locator('.lire-mot .syl').count()) >= 3);
  ok('N1 : vraies photos paleoart', (await page.locator('.img-card img[src*="paleoart"]').count()) === 4);

  // ── N2 : consigne-action « touche N oeufs couleur » ──
  await page.evaluate(() => window.__mjTest.setDifficulty(2));
  const s2 = await page.evaluate(() => window.__mjTest.state);
  ok('N2 : type fais, 2-4 oeufs demandés', s2.type === 'fais' && s2.faisNeed >= 2 && s2.faisNeed <= 4);
  const bons = s2.oeufs.filter(c => c === s2.target).length;
  ok('N2 : exactement N oeufs de la bonne couleur', bons === s2.faisNeed, `bons=${bons} need=${s2.faisNeed}`);
  // mauvais oeuf = erreur douce, rien de validé
  await page.evaluate(() => window.__mjTest.answer(false));
  const sKo = await page.evaluate(() => window.__mjTest.state);
  ok('N2 : mauvaise couleur = erreur douce', sKo.wrongTaps === 1 && sKo.faisGot === 0);
  // toucher les N bons → la manche avance
  for (let i = 0; i < 5; i++) {
    const st = await page.evaluate(() => window.__mjTest.state);
    if (st.roundLock || st.qCount !== sKo.qCount) break;
    await page.evaluate(() => window.__mjTest.answer(true));
  }
  const sN2 = await page.evaluate(() => window.__mjTest.state);
  ok('N2 : consigne exécutée → manche avance', sN2.qCount === sKo.qCount + 1);

  // ── Chemin gagnant complet → fin golden ──
  await page.evaluate(() => window.__mjTest.setDifficulty(0));
  for (let i = 0; i < 10; i++) {
    const done = await page.evaluate(() => !!document.querySelector('.end-wrap'));
    if (done) break;
    await page.evaluate(() => window.__mjTest.answer(true));
    await page.waitForTimeout(60);
  }
  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('Écran de fin golden atteint', (await page.locator('.end-wrap').count()) === 1);

  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('Zéro mot punitif', punitive === false);
}
