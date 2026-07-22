// MJ-14 — La grille (Raven) : paliers = types de pattern (N1 = A seulement).
// Migré au gabarit mj-shell (2026-07-22) : panneau règle 🧑‍🔬 auto-ouvert à fermer d'abord.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  await page.waitForSelector('#ri-panneau.on', { timeout: 6000 });
  ok('panneau règle ouvert automatiquement', (await page.locator('#ri-panneau.on').count()) === 1);
  await page.click('#ri-ok');
  await page.waitForTimeout(200);

  ok('piste golden (pips) présente', (await page.locator('#pips .pip').count()) === 8);

  await page.waitForSelector('.choice-btn', { timeout: 5000 });
  ok('choix affichés', (await page.locator('.choice-btn').count()) >= 2);

  // 8 manches parfaites (clique le bon motif en 1ʳᵉ tentative)
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 6000 });
    await page.click('.choice-btn[data-correct="1"]');
    await page.waitForTimeout(1250);
  }

  await page.waitForSelector('.end-wrap', { timeout: 6000 });
  ok('écran de fin golden affiché', (await page.locator('.end-wrap').count()) === 1);

  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-14') : -1));
  ok('Stars.get(mj-14) === 1 après 1 manche parfaite (8/8)', stars === 1, `stars=${stars}`);

  const punitive = await page.evaluate(() => /perdu|raté|échec/i.test(document.getElementById('app').innerText));
  ok('zéro mot punitif', punitive === false);
}
