// Pilote MJ-01 — Quiz Bus : paliers par type de question (N1 = couleur, 3 choix).
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('#choices .ch', { timeout: 5000 });
  const nch = await page.locator('#choices .ch').count();
  ok('Niveau 1 = 3 choix (couleur)', nch === 3, `choix=${nch}`);

  // 10 bonnes réponses (mode couleur uniquement au N1)
  for (let i = 0; i < 10; i++) {
    await page.waitForSelector('.ch[data-correct="1"]', { timeout: 6000 });
    await page.click('.ch[data-correct="1"]');
    await page.waitForTimeout(1300);
  }

  const stars = await page.evaluate(() => (window.Stars ? Stars.get('mj-01') : -1));
  ok('Stars.get(mj-01) === 1 après 1 manche parfaite', stars === 1, `stars=${stars}`);
}
