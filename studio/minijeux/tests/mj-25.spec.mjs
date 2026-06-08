// Pilote MJ-25 — Pareil pas pareil : trouver la silhouette identique à la référence.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('manifest silhouettes chargé', await page.evaluate(() => !!window.DINO_SILHOUETTES));
  ok('démarre au Niveau 1', (((await page.locator('#levelbar').textContent()) || '').includes('Niveau 1')));

  await page.waitForSelector('#refCard img', { timeout: 5000 });
  ok('référence affichée', (await page.locator('#refCard img').count()) === 1);

  await page.waitForSelector('.dino-tile', { timeout: 5000 });
  const n = await page.locator('.dino-tile').count();
  ok('Niveau 1 = 2 choix', n === 2, `tiles=${n}`);
  ok('1 seule bonne réponse', (await page.locator('.dino-tile[data-correct="1"]').count()) === 1);

  // La bonne réponse a la même src que la référence
  const sameSrc = await page.evaluate(() => {
    const ref = document.querySelector('#refCard img').getAttribute('src');
    const good = document.querySelector('.dino-tile[data-correct="1"] img').getAttribute('src');
    return ref === good;
  });
  ok('la bonne tuile = la référence (même image)', sameSrc);

  // Chemin gagnant
  for (let q = 0; q < 3; q++) {
    await page.waitForSelector('.dino-tile[data-correct="1"]', { timeout: 4000 });
    await page.click('.dino-tile[data-correct="1"]').catch(() => {});
    await page.waitForTimeout(1400);
  }
  const score = parseInt((await page.locator('#score').textContent()) || '0', 10);
  ok('3 bonnes réponses → score > 0', score > 0, `score=${score}`);
}
