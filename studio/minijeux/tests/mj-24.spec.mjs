// Pilote MJ-24 — Trouve le dino : reconnaissance famille par nom.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('manifest silhouettes chargé', await page.evaluate(() => !!window.DINO_SILHOUETTES && Object.keys(window.DINO_SILHOUETTES).length >= 8));
  ok('bandeau Niveau présent', (await page.locator('#levelbar').count()) === 1);
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('.dino-tile', { timeout: 5000 });
  const n = await page.locator('.dino-tile').count();
  ok('Niveau 1 = 3 choix', n === 3, `tiles=${n}`);
  ok('1 seule bonne réponse', (await page.locator('.dino-tile[data-correct="1"]').count()) === 1);
  ok('toutes les silhouettes ont une image', (await page.locator('.dino-tile img.sil').count()) === n);

  // Chemin gagnant : taper la bonne tuile 3 fois de suite → score monte
  let wins = 0;
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 4000 });
    await page.click('.dino-tile[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1500);
    wins++;
  }
  const score = parseInt((await page.locator('#score').textContent()) || '0', 10);
  ok('3 bonnes réponses → score > 0', score > 0, `score=${score}`);
}
