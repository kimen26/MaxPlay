// Pilote MJ-16 — Complète la suite : paliers par type de motif (N1 = couleur ABAB) + retry.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.choice-btn', { timeout: 5000 });
  ok('choix affichés', (await page.locator('.choice-btn').count()) >= 2);

  // 5 manches parfaites (clique le bon choix)
  for (let i = 0; i < 5; i++) {
    await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 6000 });
    await page.click('.choice-btn[data-correct="1"]');
    await page.waitForTimeout(1250);
  }

  ok('écran de fin affiché', (await page.locator('#end-screen.visible').count()) === 1);
  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-16') : -1));
  ok('Stars.get(mj-16) === 1 après 1 manche parfaite', stars === 1, `stars=${stars}`);
}
