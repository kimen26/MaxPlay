// Pilote MJ-25 — Pareil pas pareil : trouver la silhouette identique à la référence.
export async function run({ page, ok }) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  ok('data dinos chargée', await page.evaluate(() => typeof DINOS !== 'undefined' && DINOS.length >= 50));
  ok('Niveau 1 = 4 billes (standard golden : 4/6/8 selon etoiles)', (await page.locator('.pip').count()) === 4);
  ok('1re bille marquée courante', (await page.locator('.pip.cur').count()) === 1);

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
  const v1 = await page.locator('.pip.v1').count();
  ok('3 bonnes réponses → 3 billes vertes', v1 === 3, `billes vertes=${v1}`);
}
