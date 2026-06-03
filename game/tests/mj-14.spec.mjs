// Pilote MJ-14 — La grille (Raven) : paliers = types de pattern (N1 = A seulement).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.choice-btn', { timeout: 5000 });
  ok('choix affichés', (await page.locator('.choice-btn').count()) >= 2);

  // 8 manches parfaites (clique le bon motif en 1ʳᵉ tentative)
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.choice-btn[data-correct="1"]', { timeout: 6000 });
    await page.click('.choice-btn[data-correct="1"]');
    await page.waitForTimeout(1250);
  }

  ok('écran de fin affiché', (await page.locator('#end-screen.visible').count()) === 1);
  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-14') : -1));
  ok('Stars.get(mj-14) === 1 après 1 manche parfaite', stars === 1, `stars=${stars}`);
}
