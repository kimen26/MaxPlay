// Pilote MJ-24 — Trouve le dino : reconnaissance famille par nom.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('data dinos chargée', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 50));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

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
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);
}
